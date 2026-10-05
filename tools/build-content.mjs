// Builds the site's content from the Obsidian notes.
//
//   node tools/build-content.mjs           build once
//   node tools/build-content.mjs --watch   rebuild whenever a note changes
//
// Source folder: content.config.json ("source"), or the PORTFOLIO_SOURCE env var.
// Writes:
//   assets/js/content.js        projects + disciplines (window.PORTFOLIO)
//   portfolio.html              hero + experience, between <!-- content:x --> markers
//   assets/js/varxel.js         VarXel: the public entries (varxel.private.js: all of them, git-ignored, local only)
//   assets/images/<file>        any image the notes reference that lives in the vault's Assets/ folder
//   play/<id>/index.html        the play page of every published card that has builds (see tools/workshop)
// Notes with `published: false` never leave the vault.
// Cards: Cards/*.md (portfolio projects) and Lab/*.md (mechanic specimens). Mechanics Catalogue.md feeds the Lab's backlog.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { entries as varxelEntries, PORTFOLIO_LIST } from './varxel/lib.mjs';   // builds live on VarXel entries (project cards)

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const config = JSON.parse(fs.readFileSync(path.join(ROOT, 'content.config.json'), 'utf8'));
const SRC = process.env.PORTFOLIO_SOURCE || config.source;

/* ============================================================
   PARSING
   ============================================================ */

/* Obsidian properties: the YAML subset Obsidian itself writes (scalars and string lists). */
function parseNote(text) {
  text = text.replace(/\r\n/g, '\n').replace(/%%[\s\S]*?%%/g, '');   // %% private comments %% never ship
  const m = text.match(/^---\n([\s\S]*?)\n---\n?/);
  const props = {};
  if (m) {
    let key = null;
    for (const line of m[1].split('\n')) {
      const item = line.match(/^\s+-\s*(.*)$/);
      if (item && key) { (props[key] ||= []).push(scalar(item[1])); continue; }
      const kv = line.match(/^([\w-]+):\s*(.*)$/);
      if (!kv) continue;
      key = kv[1];
      const v = kv[2].trim();
      if (v === '') props[key] = [];
      else if (v.startsWith('[') && v.endsWith(']')) props[key] = v.slice(1, -1).split(',').map(s => scalar(s.trim())).filter(s => s !== '');
      else props[key] = scalar(v);
    }
  }
  const body = m ? text.slice(m[0].length) : text;
  /* split the body into: intro (before the first ##) and named ## sections */
  const parts = body.split(/^##[ \t]+(.+)$/m);
  const sections = {};
  for (let i = 1; i < parts.length; i += 2) sections[parts[i].trim()] = parts[i + 1].trim();
  return { props, intro: parts[0].replace(/^#[ \t].*$/m, '').trim(), sections };
}
function scalar(s) {
  if (/^".*"$/.test(s)) return JSON.parse(s);
  if (/^'.*'$/.test(s)) return s.slice(1, -1).replace(/''/g, "'");
  if (s === 'true' || s === 'false') return s === 'true';
  if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s);
  if (s === 'null' || s === '~') return null;
  return s;
}

/* Markdown -> HTML, covering what portfolio copy needs. Raw HTML passes through. */
function inline(s) {
  return s
    .replace(/!\[\[[^\]]*\]\]/g, '')                                         // obsidian embeds: vault-only
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2').replace(/\[\[([^\]]+)\]\]/g, '$1') // wiki-links -> text
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(video:([^)]+)\)/g, (_, t, f) => `<span class='magic-link' data-src='./assets/videos/${f.trim()}'>${t}</span>`)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
    .replace(/(^|[^*\w])\*([^*\n]+)\*/g, '$1<i>$2</i>').replace(/(^|\W)_([^_\n]+)_/g, '$1<i>$2</i>');
}
function blocks(md) {
  return md.split(/\n{2,}/).map(b => b.trim()).filter(Boolean).map(b => {
    const h = b.match(/^(#{3,4})[ \t]+(.+)$/m);
    if (h && b.indexOf(h[0]) === 0) {                                       // ### subheading (+ any text right under it)
      const rest = b.slice(h[0].length).trim();
      return `<h${h[1].length + 1} class="sub">${inline(h[2])}</h${h[1].length + 1}>` + (rest ? blocks(rest) : '');
    }
    if (/^\|.*\|$/m.test(b) && b.split('\n').every(l => /^\s*\|/.test(l))) {   // | markdown | table |
      const rows = b.split('\n').filter(l => !/^\s*\|[\s:|-]+\|\s*$/.test(l))
        .map(l => l.trim().replace(/^\||\|$/g, '').split('|').map(c => inline(c.trim())));
      const [head, ...body] = rows;
      return `<div class="md-table"><table><thead><tr>${head.map(c => `<th>${c}</th>`).join('')}</tr></thead><tbody>` +
        body.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('') + '</tbody></table></div>';
    }
    if (/^> /.test(b)) return `<blockquote>${inline(b.replace(/^> ?/gm, '').replace(/\n/g, ' '))}</blockquote>`;
    if (/^\d+\. /.test(b)) return '<ol>' + b.split('\n').map(l => `<li>${inline(l.replace(/^\d+\. /, ''))}</li>`).join('') + '</ol>';
    if (/^[-*] /.test(b)) return '<ul>' + b.split('\n').map(l => `<li>${inline(l.replace(/^[-*] /, ''))}</li>`).join('') + '</ul>';
    return `<p>${inline(b.replace(/\n/g, ' '))}</p>`;
  }).join('');
}
const plain = md => md.replace(/\n+/g, ' ').replace(/\*\*|__|\*|_/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\[\[(?:[^\]|]+\|)?([^\]]+)\]\]/g, '$1').trim();
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const pair = s => { const i = String(s).lastIndexOf('|'); return i < 0 ? [String(s).trim(), String(s).trim()] : [s.slice(0, i).trim(), s.slice(i + 1).trim()]; };

/* ============================================================
   BUILD
   ============================================================ */
const CATEGORY = { professional: 'professional work', personal: 'personal work', university: 'university work', jam: 'game jams' };
const read = rel => { const f = path.join(SRC, rel); return fs.existsSync(f) ? parseNote(fs.readFileSync(f, 'utf8')) : null; };
const images = new Set();

function project(file) {
  const { props: p, intro, sections } = parseNote(fs.readFileSync(file, 'utf8'));
  const id = p.id || path.basename(file, '.md').replace(/[^\w]/g, '');
  const disciplines = p.disciplines || [];
  const contrib = {};
  for (const d of disciplines) if (sections[d]) contrib[d] = blocks(sections[d]);
  if (p.image) images.add(p.image);
  const problems = [];
  if (!p.title) problems.push('no title');
  if (!CATEGORY[p.category]) problems.push(`category "${p.category}" (use ${Object.keys(CATEGORY).join(' / ')})`);
  Object.keys(sections).filter(s => s !== 'The story' && s !== 'Play' && !disciplines.includes(s))
    .forEach(s => problems.push(`section "## ${s}" is not in disciplines, so it is not shown`));
  if (problems.length) console.warn(`  ! ${path.basename(file)}: ${problems.join('; ')}`);
  const play = null;                                   // set from the project's VarXel entry in build()
  return {
    id, card: path.basename(file, '.md'), playNotes: sections.Play ? blocks(sections.Play) : '', title: p.title, category: CATEGORY[p.category] || p.category, published: p.published === true, play, mechanics: p.mechanics || [],
    tier: p.tier || 'listed', year: p.year, role: p.role, context: p.context, engine: p.engine,
    image: p.image ? `./assets/images/${p.image}` : '', video: p.video || null,
    videos: (p.videos || []).map(v => { const [label, f] = pair(v); return { label, file: `./assets/videos/${f}` }; }),
    tools: (p.tools || []).map(name => ({ name })),
    roles: disciplines, roleContributions: contrib,
    links: (p.links || []).map(l => { const [label, url] = pair(l); return { label, url }; }),
    short: plain(intro),
    story: sections['The story'] ? blocks(sections['The story']) : ''
  };
}

/* builds / downloads are written by tools/workshop/publish-build.mjs */
function playInfo(id, p, intro, sections) {
  const builds = (p.builds || []).map(b => { const [label, slug] = pair(b); return { label, slug }; });
  if (!builds.length) return null;
  return { id, builds, downloads: (p.downloads || []).map(d => { const [label, url] = pair(d); return { label, url }; }),
    notes: sections.Play ? blocks(sections.Play) : '', short: plain(intro) };
}

/* Lab/*.md: one mechanic, built inside the game it belongs to */
function specimen(file) {
  const { props: p, intro, sections } = parseNote(fs.readFileSync(file, 'utf8'));
  const id = p.id || path.basename(file, '.md').replace(/[^\w]/g, '');
  const parent = String(p.project || '').replace(/^\[\[|\]\]$/g, '').split('|')[0];
  return { id, title: p.title, mechanic: p.mechanic || '', project: parent, law: p.law || '', year: p.year,
    published: p.published === true, short: plain(intro), play: playInfo(id, p, intro, sections), url: '' };
}

/* the catalogue tables: | ID | Mechanic | The rule | First written | ... | under "## X. Family: ..." */
function catalogue() {
  const f = path.join(SRC, 'Mechanics Catalogue.md');
  if (!fs.existsSync(f)) return [];
  const out = [];
  let family = '';
  for (const line of fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n').split('\n')) {
    const h = line.match(/^##\s+[A-Z]\.\s+(.+)$/);
    if (h) { family = h[1].split(':')[0].trim(); continue; }
    const r = line.match(/^\|\s*([A-Z]\d+)\s*\|([^|]*)\|([^|]*)\|([^|]*)\|/);
    if (r) out.push({ id: r[1], name: r[2].trim(), rule: r[3].trim(), first: r[4].trim(), family });
  }
  return out;
}

/* online pages go to play/<id>/; private ones to play/_private/<id>/ (git-ignored, local view only) */
function writePlayPage(card, ctx, priv = false) {
  const tpl = fs.readFileSync(path.join(ROOT, 'tools/workshop/templates/play.html'), 'utf8');
  const data = { title: card.title, context: ctx, short: card.play.short, notes: card.play.notes, builds: card.play.builds, downloads: card.play.downloads };
  const dir = priv ? path.join(ROOT, 'play', '_private', card.id) : path.join(ROOT, 'play', card.id);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), tpl.replace('{{TITLE}}', esc(card.title)).replace(/\{\{ROOT\}\}/g, priv ? '../../../' : '../../')
    .replace('{{DATA}}', () => JSON.stringify(data).replace(/</g, '\\u003c')));
}

function build() {
  const t0 = Date.now();
  images.clear();
  const dir = path.join(SRC, 'Cards');
  if (!fs.existsSync(dir)) throw new Error(`No Cards folder in ${SRC}`);
  const all = fs.readdirSync(dir).filter(f => f.endsWith('.md')).map(f => project(path.join(dir, f)));
  /* Site/Portfolio.md is the portfolio: exactly the cards it links, in its order. Without it, `published` decides. */
  const listFile = PORTFOLIO_LIST;
  const listed = new Map();
  if (fs.existsSync(listFile))
    for (const m of fs.readFileSync(listFile, 'utf8').matchAll(/^- \[\[([^\]|]+)(?:\|[^\]]*)?\]\]/gm)) listed.set(path.basename(m[1]), listed.size);
  for (const p of all) if (listed.size) p.published = listed.has(p.card);
  const projects = Object.fromEntries(all.filter(p => p.published).sort((a, b) => (listed.get(a.card) ?? 0) - (listed.get(b.card) ?? 0)).map(p => [p.id, p]));
  const labDir = path.join(SRC, 'Lab');
  const lab = fs.existsSync(labDir) ? fs.readdirSync(labDir).filter(f => f.endsWith('.md')).map(f => specimen(path.join(labDir, f))).filter(s => s.published) : [];
  let pages = 0;
  for (const s of lab) if (s.play) { writePlayPage(s, [s.mechanic, s.project, s.year].filter(Boolean).join(' · ')); s.url = `./play/${s.id}/`; pages++; }

  /* ---- VarXel: every entry. Public ones ship; all of them go to a git-ignored file for the local view ---- */
  const cards = Object.fromEntries(all.map(p => [p.card, p]));
  const ents = varxelEntries();
  /* every entry with builds gets a play page: online if the entry is public or its card is in the portfolio */
  for (const e of ents) {
    if (!e.builds.length) continue;
    e.online = e.public || (!!e.card && listed.has(e.card));
    e.playInfo = { id: e.id, builds: e.builds, downloads: e.downloads, notes: e.play ? blocks(e.play) : (cards[e.card]?.playNotes || ''), short: plain(e.desc.split(/\n{2,}/)[0] || e.quote || '') };
    writePlayPage({ id: e.id, title: e.title, play: e.playInfo }, [e.kind, e.family, e.started].filter(Boolean).join(' · '), !e.online);
    pages++;
    const c = cards[e.card];
    if (c && c.published && e.online) { c.play = e.playInfo; c.links.push({ label: 'Play in the browser', url: `./play/${e.id}/` }); }
  }
  /* an entry ships when it is public or its card is in the portfolio list (same rule as builds) */
  const shown = e => e.public || (!!e.card && listed.has(e.card));
  const shape = (e, keep) => {
    const c = cards[e.card];
    /* no status is kept by hand any more: what an entry has says where it stands */
    const status = e.builds.length ? 'playable' : e.repo ? 'has code' : 'idea';
    return { title: e.title, kind: e.kind, status, started: e.started, family: e.family,
      from: e.from.filter(keep), became: e.became.filter(keep), desc: e.desc, quote: e.quote, timeline: e.timeline,
      sources: e.sources.length, repo: e.repo, public: shown(e), portfolio: !!(c && c.published),
      play: e.builds.length ? (e.online ? `./play/${e.id}/` : `./play/_private/${e.id}/`) : '' };
  };
  const pub = new Set(ents.filter(shown).map(e => e.title));
  const vx = (list, keep) => `/* GENERATED by tools/build-content.mjs from VarXel. Do not edit; edit the entries. */
window.VARXEL = ${JSON.stringify(list.map(e => shape(e, keep)), null, 1)};
`;
  fs.writeFileSync(path.join(ROOT, 'assets/js/varxel.js'), vx(ents.filter(shown), t => pub.has(t)));
  fs.writeFileSync(path.join(ROOT, 'assets/js/varxel.private.js'), vx(ents, () => true));

  const disc = read('Disciplines.md');
  const disciplines = Object.fromEntries(Object.entries(disc ? disc.sections : {}).map(([k, v]) => [k, { title: k, description: plain(v) }]));

  const prof = read('Profile.md') || { props: {}, sections: {} };
  const profile = { ...prof.props };
  if (profile.portrait) images.add(profile.portrait);

  fs.writeFileSync(path.join(ROOT, 'assets/js/content.js'),
    '/* GENERATED by tools/build-content.mjs from the Obsidian vault. Do not edit; edit the notes. */\n' +
    `window.PORTFOLIO = ${JSON.stringify({ profile: { email: profile.email, github: profile.github }, disciplines, projects, lab, catalogue: catalogue() }, null, 1)};\n`);

  /* ---- portfolio.html: hero + experience ---- */
  const htmlFile = path.join(ROOT, 'portfolio.html');
  let html = fs.readFileSync(htmlFile, 'utf8');
  const s = prof.sections;
  const hero = `
      <div class="hero-id">
        <img class="portrait" src="./assets/images/${esc(profile.portrait || 'about.png')}" alt="${esc(profile.name)}" width="72" height="72">
        <div>
          <div class="eyebrow">${esc(profile.title)}</div>
          <h1 class="name">${esc(profile.name)}</h1>
        </div>
      </div>
      <p class="credits">${inline(plainLines(s.Headline))}</p>
      <div class="hero-contact">
        <a href="mailto:${esc(profile.email)}" class="btn btn--solid">Email me</a>
        <button class="btn" id="copy-email" title="${esc(profile.email)}">Copy email</button>
        <a href="${esc(profile.cv || './cv.html')}" target="_blank" rel="noopener" class="btn">CV</a>
        <a href="${esc(profile.github)}" target="_blank" rel="noopener" class="btn">GitHub</a>
        <span id="copymsg">Copied</span>
      </div>
      <p class="epigraph">"${inline(plainLines(s.Quote))}"</p>
      <p class="bio">${inline(plainLines(s.Bio))}</p>
      `;
  html = inject(html, 'hero', hero);

  const exp = read('Experience.md');
  if (exp) {
    const out = Object.entries(exp.sections).map(([group, body]) => {
      const items = body.split(/^###[ \t]+(.+)$/m);
      let h = `\n      <div class="log-block">\n        <h3 class="log-header">${esc(group)}</h3>\n`;
      for (let i = 1; i < items.length; i += 2) {
        const lines = items[i + 1].trim().split(/\n{2,}/);
        const metaLine = /^[*_].*[*_]$/.test(lines[0]) ? lines.shift().slice(1, -1) : '';
        const [when, where] = metaLine.split('·').map(x => x.trim());
        h += `
        <div class="log-item">
          <div class="log-meta">${esc(when || '')}${where ? `<span>${esc(where)}</span>` : ''}</div>
          <div class="log-body">
            <div class="log-title">${inline(esc(items[i].trim()))}</div>
            <div class="log-desc">${inline(lines.join(' ').replace(/\n/g, ' '))}</div>
          </div>
        </div>\n`;
      }
      return h + '      </div>\n';
    }).join('');
    html = inject(html, 'experience', out + '    ');
  }
  if (profile.email) html = html.replace(/mailto:[^"]+"/g, `mailto:${profile.email}"`);
  fs.writeFileSync(htmlFile, html);

  /* ---- images that live in the vault ---- */
  let copied = 0;
  for (const img of images) {
    const from = path.join(SRC, 'Assets', img), to = path.join(ROOT, 'assets/images', img);
    if (fs.existsSync(from) && (!fs.existsSync(to) || fs.statSync(from).mtimeMs > fs.statSync(to).mtimeMs)) { fs.copyFileSync(from, to); copied++; }
    else if (!fs.existsSync(to)) console.warn(`  ! missing image "${img}": put it in ${path.join(SRC, 'Assets')}`);
  }
  console.log(`built ${Object.keys(projects).length} projects (${all.length - Object.keys(projects).length} unpublished kept private), ${pub.size}/${ents.length} entries online, ${lab.length} lab specimen(s), ${pages} play page(s), ${copied} image(s) copied, ${Date.now() - t0}ms`);
}
const plainLines = md => (md || '').replace(/\s*\n\s*/g, ' ').trim();
function inject(html, name, content) {
  const re = new RegExp(`(<!-- content:${name} -->)[\\s\\S]*?(<!-- /content:${name} -->)`);
  if (!re.test(html)) throw new Error(`portfolio.html is missing the <!-- content:${name} --> markers`);
  return html.replace(re, (_, a, b) => a + content + b);
}

build();
if (process.argv.includes('--serve')) {
  const http = await import('node:http');
  const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml',
    '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.mp4': 'video/mp4', '.pdf': 'application/pdf' };
  const PORT = 8731;
  http.createServer((req, res) => {
    let file = path.join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
    if (!file.startsWith(ROOT)) { res.writeHead(403).end(); return; }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file)) { res.writeHead(404).end('not found'); return; }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    fs.createReadStream(file).pipe(res);
  }).listen(PORT, () => console.log(`preview: http://localhost:${PORT}  (refresh after editing a note)`));
}
if (process.argv.includes('--watch')) {
  console.log(`watching ${SRC}`);
  let timer;
  fs.watch(SRC, { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(() => { try { build(); } catch (e) { console.error('  ! ' + e.message); } }, 250);
  });
}
