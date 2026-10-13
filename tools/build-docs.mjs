// Project documentation for the Fog portfolio: versions, their pictures and their builds, plus the page shells.
// Runs after build-content.mjs (which it reads through assets/js/content.js).
//
// Where a version comes from:
//   - each session log in VarXel/Projects/<Title>/logs/ whose title starts with a version (v3, v11 ...)
//   - each public web build of the project (play/<id>/<slug>/) that has no log, like Sasha v1 and v2
// What is public (allowlist): a log ships only with `public: true` in its properties, and then only its
// `summary:` property and its `## Made` section. Builds already online ship. Nothing else does.
// Everything else goes to the git-ignored preview files (docs.private.js, assets/shots-private/), which the
// pages load only on localhost and mark "not published".
//
//   node tools/build-docs.mjs      (build-content.mjs runs it for you)

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const config = JSON.parse(fs.readFileSync(path.join(ROOT, 'content.config.json'), 'utf8'));
const VAULT = process.env.VARXEL_VAULT || config.vault;
const WIKI_DIR = config.wikiRepo || 'D:/Game Development Projects/VarXel-Wiki';
const WIKI_URL = config.wikiUrl || 'https://varxel-wiki.varxel.workers.dev';

const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'assets/js/content.js'), 'utf8'), sandbox);
const P = sandbox.window.PORTFOLIO;
const wiki = fs.existsSync(path.join(WIKI_DIR, '.cache/wiki.json')) ? JSON.parse(fs.readFileSync(path.join(WIKI_DIR, '.cache/wiki.json'), 'utf8')) : null;

/* ---------- small markdown helpers ---------- */
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const inline = s => esc(s)
  .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/(^|[^*])\*(?!\s)(.+?)\*/g, '$1<em>$2</em>')
  .replace(/`([^`]+)`/g, '<code>$1</code>')
  .replace(/\[\[(?:[^\]|]+\|)?([^\]]+)\]\]/g, '$1')                      // wiki links never become URLs
  .replace(/\[([^\]]+)\]\((https?:[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
function blocks(md) {
  const out = []; let list = null;
  for (const raw of md.replace(/%%[\s\S]*?%%/g, '').split('\n')) {
    const line = raw.replace(/\s+$/, '');
    const li = line.match(/^(\s*)[-*]\s+(.*)$/);
    if (li) { if (!list) { list = []; out.push(list); } (li[1].length ? list[list.length - 1].sub ??= [] : list).push(li[1].length ? li[2] : { t: li[2] }); continue; }
    if (/^!\[\[/.test(line)) continue;
    list = null;
    if (line.trim()) out.push(line.startsWith('### ') ? { h: line.slice(4) } : { p: line });
  }
  return out.map(b => Array.isArray(b)
    ? `<ul>${b.map(i => `<li>${inline(i.t)}${i.sub ? `<ul>${i.sub.map(s => `<li>${inline(s)}</li>`).join('')}</ul>` : ''}</li>`).join('')}</ul>`
    : b.h ? `<h4>${inline(b.h)}</h4>` : `<p>${inline(b.p)}</p>`).join('');
}
function parseNote(text) {
  const fm = {}; let body = text;
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (m) {
    body = text.slice(m[0].length);
    for (const l of m[1].split(/\r?\n/)) { const kv = l.match(/^([\w-]+):\s*(.*)$/); if (kv) fm[kv[1]] = kv[2].replace(/^["']|["']$/g, ''); }
  }
  const sections = {}; let cur = '_intro';
  for (const l of body.split(/\r?\n/)) {
    const h = l.match(/^##\s+(.+)$/);
    if (h) { cur = h[1].trim(); sections[cur] = ''; continue; }
    sections[cur] = (sections[cur] ?? '') + l + '\n';
  }
  return { fm, sections };
}
const slug = s => String(s).toLowerCase().normalize('NFKD').replace(/[^\w\s.-]/g, '').trim().replace(/[\s_.]+/g, '-');
const vnum = s => { const m = String(s).match(/^v(\d+)(?:\.(\d+))?/i); return m ? { major: +m[1], id: `v${m[1]}` } : null; };
const cap = s => s.replace(/^the\b/i, 'The').replace(/^./, c => c.toUpperCase());

/* ---------- build ---------- */
const OUT_PUB = path.join(ROOT, 'assets/shots'), OUT_PRIV = path.join(ROOT, 'assets/shots-private');
fs.rmSync(OUT_PUB, { recursive: true, force: true }); fs.rmSync(OUT_PRIV, { recursive: true, force: true });
const pub = {}, priv = {};
let shipped = 0, held = 0;

for (const p of Object.values(P.projects)) {
  const folder = [p.title, p.card].map(t => path.join(VAULT, 'Projects', t)).find(f => fs.existsSync(f));
  const versions = new Map();
  /* logs */
  const logDir = folder && path.join(folder, 'logs');
  if (logDir && fs.existsSync(logDir)) {
    for (const f of fs.readdirSync(logDir).filter(f => f.endsWith('.md')).sort()) {
      const { fm, sections } = parseNote(fs.readFileSync(path.join(logDir, f), 'utf8'));
      const title = fm.title || f.replace(/^\d{4}-\d\d-\d\d\s+/, '').replace(/\.md$/, '');
      const v = vnum(title); if (!v) continue;
      const made = Object.entries(sections).find(([k]) => /^made\b/i.test(k));
      versions.set(v.id, {
        id: v.id, major: v.major, name: cap(title.replace(/^v[\d.]+[,:]?\s*/i, '') || v.id), date: fm.date || f.slice(0, 10),
        public: fm.public === 'true', summary: fm.summary || '', made: made ? blocks(made[1]) : '', images: [], builds: []
      });
    }
  }
  /* public web builds without a log (Sasha v1, v2) */
  for (const b of p.play?.builds ?? []) {
    const v = vnum(b.slug) || vnum(b.label); if (!v) continue;
    const name = (b.label.split('·')[1] || b.label).trim();
    if (!versions.has(v.id)) versions.set(v.id, { id: v.id, major: v.major, name, date: '', public: true, summary: '', made: '', images: [], builds: [] });
    versions.get(v.id).builds.push({ label: b.label, play: `play/${p.id}/${b.slug}/`, public: true });
  }
  if (!versions.size) continue;
  /* screenshots whose file name carries the version: "Sasha v7a lattice.jpg" */
  const shotDir = folder && path.join(folder, 'shots');
  const shots = shotDir && fs.existsSync(shotDir) ? fs.readdirSync(shotDir).filter(f => /\.(png|jpe?g|webp|gif)$/i.test(f)) : [];
  const alias = config.shotAliases?.[p.id] ?? {};   // file names that do not carry the version, e.g. Sasha v1 = "proto"
  for (const v of versions.values()) {
    const re = alias[v.id] ? new RegExp(`(^|\\s)${alias[v.id]}(\\s|$)`, 'i') : new RegExp(`(^|\\s)v${v.major}[a-z]?(\\s|\\.|$)`, 'i');
    v.images = shots.filter(f => re.test(f)).map(f => ({ file: f,
      caption: f.replace(/\.\w+$/, '').replace(/^\S+\s+(v\d+[a-z]?|\w+)\s*/i, '').replace(/^[\w]{1,3}\d+[_ ]/, '').replace(/_/g, ' ') || v.name }));
  }
  /* private releases from the wiki's cache: preview only, linked to the password-protected wiki */
  const repos = folder && fs.existsSync(path.join(folder, `${path.basename(folder)}.md`))
    ? [...fs.readFileSync(path.join(folder, `${path.basename(folder)}.md`), 'utf8').matchAll(/^\s*-\s*["']?(VarXael\/[\w.-]+)["']?\s*$/gm)].map(m => m[1]) : [];
  for (const repo of repos) for (const r of wiki?.github?.[repo]?.releases ?? []) {
    const v = vnum(r.tag); if (!v || !versions.has(v.id)) continue;
    const win = r.assets.find(a => /windows/i.test(a.name));
    versions.get(v.id).builds.push({ label: r.name, play: `${WIKI_URL}/play/${repo.split('/')[1]}/${r.tag}/index.html`,
      windows: win ? (win.url.startsWith('/') ? WIKI_URL + win.url : win.url) : '', size: win?.size || 0, date: r.date, public: false });
  }
  /* split into public and preview */
  const list = [...versions.values()].sort((a, b) => a.major - b.major);
  const shape = (v, isPub) => {
    const dir = isPub ? OUT_PUB : OUT_PRIV, base = isPub ? 'assets/shots' : 'assets/shots-private';
    const images = v.images.map(im => {
      const name = slug(im.file.replace(/\.\w+$/, '')) + path.extname(im.file).toLowerCase();
      fs.mkdirSync(path.join(dir, p.id), { recursive: true });
      fs.copyFileSync(path.join(shotDir, im.file), path.join(dir, p.id, name));
      return { src: `${base}/${p.id}/${name}`, caption: im.caption };
    });
    return { id: v.id, name: v.name, date: v.date, public: isPub,
      summary: isPub ? v.summary : (v.summary || ''), made: isPub ? (v.public ? v.made : '') : v.made,
      images, builds: v.builds.filter(b => isPub ? b.public : true) };
  };
  pub[p.id] = list.filter(v => v.public).map(v => shape(v, true));
  priv[p.id] = list.map(v => shape(v, v.public));
  shipped += pub[p.id].length; held += list.length - pub[p.id].length;
}

const head = '/* GENERATED by tools/build-docs.mjs from the vault. Do not edit. */\n';
fs.writeFileSync(path.join(ROOT, 'assets/js/docs.js'), `${head}window.DOCS = ${JSON.stringify({ versions: pub }, null, 1)};\n`);
fs.writeFileSync(path.join(ROOT, 'assets/js/docs.private.js'), `${head}window.DOCS = ${JSON.stringify({ versions: priv, preview: true }, null, 1)};\n`);

/* ---------- page shells: one per project, plus Process ---------- */
const shell = (title, page, root, extra = '') => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<link rel="icon" href="${root}assets/images/about.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400&family=Hanken+Grotesk:wght@300;400;500&family=Martian+Mono:wght@300;400&display=swap">
<link rel="stylesheet" href="${root}assets/css/fog.css">
<script>try{if(localStorage.getItem('look')==='light')document.documentElement.dataset.look='light'}catch(e){}</script>
</head>
<body data-page="${page}" data-root="${root}"${extra}>
<noscript>This page needs JavaScript.</noscript>
<script src="${root}assets/js/content.js"></script>
<script src="${root}assets/js/docs.js"></script>
<script src="${root}assets/js/fog.js"></script>
</body>
</html>
`;
fs.rmSync(path.join(ROOT, 'work'), { recursive: true, force: true });
for (const p of Object.values(P.projects)) {
  const dir = path.join(ROOT, 'work', slug(p.title));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), shell(`${p.title} | Giuseppe Alfieri`, 'project', '../../', ` data-id="${esc(p.id)}"`));
}
fs.writeFileSync(path.join(ROOT, 'process.html'), shell('Process | Giuseppe Alfieri', 'process', './'));
fs.writeFileSync(path.join(ROOT, 'portfolio.html'), shell('Giuseppe Alfieri | Technical Game Designer', 'home', './'));
console.log(`docs: ${Object.keys(P.projects).length} project pages, ${shipped} public version(s), ${held} preview-only version(s)${wiki ? '' : ' (no wiki cache: private builds skipped)'}`);
