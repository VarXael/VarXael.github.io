// Builds the site's content from the Obsidian notes.
//
//   node tools/build-content.mjs           build once
//   node tools/build-content.mjs --watch   rebuild whenever a note changes
//
// Source folder: content.config.json ("source"), or the PORTFOLIO_SOURCE env var.
// Writes:
//   assets/js/content.js        projects + disciplines (window.PORTFOLIO)
//   index.html                  hero + experience, between <!-- content:x --> markers
//   assets/images/<file>        any image the notes reference that lives in the vault's Assets/ folder
// Notes with `published: false` never leave the vault.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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
  Object.keys(sections).filter(s => s !== 'The story' && !disciplines.includes(s))
    .forEach(s => problems.push(`section "## ${s}" is not in disciplines, so it is not shown`));
  if (problems.length) console.warn(`  ! ${path.basename(file)}: ${problems.join('; ')}`);
  return {
    id, title: p.title, category: CATEGORY[p.category] || p.category, published: p.published === true,
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

function build() {
  const t0 = Date.now();
  images.clear();
  const dir = path.join(SRC, 'Projects');
  if (!fs.existsSync(dir)) throw new Error(`No Projects folder in ${SRC}`);
  const all = fs.readdirSync(dir).filter(f => f.endsWith('.md')).map(f => project(path.join(dir, f)));
  const projects = Object.fromEntries(all.filter(p => p.published).map(p => [p.id, p]));

  const disc = read('Disciplines.md');
  const disciplines = Object.fromEntries(Object.entries(disc ? disc.sections : {}).map(([k, v]) => [k, { title: k, description: plain(v) }]));

  const prof = read('Profile.md') || { props: {}, sections: {} };
  const profile = { ...prof.props };
  if (profile.portrait) images.add(profile.portrait);

  fs.writeFileSync(path.join(ROOT, 'assets/js/content.js'),
    '/* GENERATED by tools/build-content.mjs from the Obsidian vault. Do not edit; edit the notes. */\n' +
    `window.PORTFOLIO = ${JSON.stringify({ profile: { email: profile.email, github: profile.github }, disciplines, projects }, null, 1)};\n`);

  /* ---- index.html: hero + experience ---- */
  const htmlFile = path.join(ROOT, 'index.html');
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
  console.log(`built ${Object.keys(projects).length} projects (${all.length - Object.keys(projects).length} unpublished kept private), ${copied} image(s) copied, ${Date.now() - t0}ms`);
}
const plainLines = md => (md || '').replace(/\s*\n\s*/g, ' ').trim();
function inject(html, name, content) {
  const re = new RegExp(`(<!-- content:${name} -->)[\\s\\S]*?(<!-- /content:${name} -->)`);
  if (!re.test(html)) throw new Error(`index.html is missing the <!-- content:${name} --> markers`);
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
