// Builds the Library pages (library.html) from VarXec's Publish: the vault's Site/public.json, which holds only what he made public
// (the public text, the builds he ticked, the pictures he starred). Nothing else of the vault is read, except those pictures.
//
//   node tools/build-library.mjs            build once
//   node tools/build-library.mjs --no-play  skip fetching the web builds
//
// Writes:
//   assets/js/library-data.js        window.LIBRARY (the text already turned into HTML)
//   assets/library/<id>/<file>       the starred pictures and each build's first picture, copied from the vault
//   play/lib/<id>/<tag>/             each ticked build's web export, from its GitHub Release (-web.zip), fetched once
// The Lab's player is behind his login, so the site hosts its own copies of the builds it shows.

import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const config = JSON.parse(fs.readFileSync(path.join(ROOT, 'content.config.json'), 'utf8'));
const VAULT = process.env.LIBRARY_VAULT || config.vault;            // the VarXel folder
const SRC = path.join(VAULT, 'Site', 'public.json');
const GH = fs.existsSync(config.gh || '') ? config.gh : 'gh';
// Windows' own tar reads zips and C:\ paths (Git's tar takes "C:" for a host).
const TAR = process.platform === 'win32' && fs.existsSync(path.join(process.env.SystemRoot || 'C:/Windows', 'System32', 'tar.exe')) ? path.join(process.env.SystemRoot || 'C:/Windows', 'System32', 'tar.exe') : 'tar';

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
function inline(s) {
  return esc(s)
    .replace(/!\[\[[^\]]*\]\]/g, '')
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2').replace(/\[\[([^\]]+)\]\]/g, '$1')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(video:([^)]+)\)/g, '$1')
    .replace(/\[([^\]]+)\]\((https?:[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
    .replace(/(^|[^*\w])\*([^*\n]+)\*/g, '$1<i>$2</i>');
}
function blocks(md) {
  return String(md || '').replace(/\r\n/g, '\n').split(/\n{2,}/).map((b) => b.trim()).filter(Boolean).map((b) => {
    const h = /^(#{3,4})[ \t]+(.+)$/.exec(b.split('\n')[0]);
    if (h) return `<h3>${inline(h[2])}</h3>${b.includes('\n') ? blocks(b.slice(b.indexOf('\n') + 1)) : ''}`;
    if (/^> /.test(b)) return `<blockquote>${inline(b.replace(/^> ?/gm, '').replace(/\n/g, ' '))}</blockquote>`;
    if (/^\d+\. /.test(b)) return `<ol>${b.split('\n').map((l) => `<li>${inline(l.replace(/^\d+\. /, ''))}</li>`).join('')}</ol>`;
    if (/^[-*] /.test(b)) return `<ul>${b.split('\n').map((l) => `<li>${inline(l.replace(/^[-*] /, ''))}</li>`).join('')}</ul>`;
    if (/^\|/.test(b)) return '';                                         // tables stay in the vault for now
    return `<p>${inline(b.replace(/\n/g, ' '))}</p>`;
  }).join('');
}

// A picture from the vault into assets/library/<id>/ (copied again only when it changed).
function picture(id, shot) {
  if (!shot) return '';
  const from = path.join(VAULT, shot.path);
  if (!fs.existsSync(from)) { console.warn(`  ! missing picture ${shot.path}`); return ''; }
  const dir = path.join(ROOT, 'assets', 'library', id);
  fs.mkdirSync(dir, { recursive: true });
  const to = path.join(dir, shot.name);
  if (!fs.existsSync(to) || fs.statSync(to).size !== fs.statSync(from).size) fs.copyFileSync(from, to);
  return `./assets/library/${encodeURIComponent(id)}/${encodeURIComponent(shot.name)}`;
}

// A build's web export from its GitHub Release, unpacked into play/lib/<id>/<tag>/ once.
function webBuild(id, b) {
  if (!b.repo || !b.web || process.argv.includes('--no-play')) return '';
  const dir = path.join(ROOT, 'play', 'lib', id, b.key);
  const url = `./play/lib/${encodeURIComponent(id)}/${encodeURIComponent(b.key)}/index.html`;
  if (fs.existsSync(path.join(dir, 'index.html'))) return url;
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'library-'));
  try {
    execFileSync(GH, ['release', 'download', b.key, '-R', b.repo, '-p', '*-web.zip', '-D', tmp], { stdio: 'ignore' });
    const zip = fs.readdirSync(tmp).find((f) => f.endsWith('-web.zip'));
    if (!zip) return '';
    fs.mkdirSync(dir, { recursive: true });
    execFileSync(TAR, ['-xf', path.join(tmp, zip), '-C', dir]);
    // A zip that holds one folder: lift its files up so index.html sits in dir.
    if (!fs.existsSync(path.join(dir, 'index.html'))) {
      const one = fs.readdirSync(dir);
      if (one.length === 1 && fs.statSync(path.join(dir, one[0])).isDirectory()) { for (const f of fs.readdirSync(path.join(dir, one[0]))) fs.renameSync(path.join(dir, one[0], f), path.join(dir, f)); fs.rmdirSync(path.join(dir, one[0])); }
    }
    console.log(`  + ${id} ${b.key} (web build)`);
    return fs.existsSync(path.join(dir, 'index.html')) ? url : '';
  } catch (e) { fs.rmSync(dir, { recursive: true, force: true }); console.warn(`  ! ${id} ${b.key}: no web build (${e.message.split('\n')[0]})`); return ''; }
  finally { fs.rmSync(tmp, { recursive: true, force: true }); }
}

if (!fs.existsSync(SRC)) { console.error(`No ${SRC}: press Publish in VarXec first.`); process.exit(1); }
const pub = JSON.parse(fs.readFileSync(SRC, 'utf8'));
const projects = pub.projects.map((p) => ({
  id: p.id, title: p.title, kind: p.kind, stage: p.stage, category: p.category, year: p.year, role: p.role, context: p.context,
  engine: p.engine, tools: p.tools, disciplines: p.disciplines,
  image: p.image ? `./assets/images/${encodeURIComponent(p.image)}` : '',
  intro: blocks(p.intro), short: String(p.intro || '').split(/\n{2,}/)[0].replace(/[*_`#>]/g, '').replace(/\[\[(?:[^\]|]*\|)?([^\]]*)\]\]/g, '$1').trim(),
  sections: Object.entries(p.sections || {}).map(([title, md]) => ({ title, html: blocks(md) })),
  shots: p.shots.map((s) => picture(p.id, s)).filter(Boolean),
  builds: p.builds.map((b) => ({ key: b.key, title: b.title, date: b.date, parent: b.parent, shot: picture(p.id, b.shot), play: webBuild(p.id, b) })),
}));
fs.writeFileSync(path.join(ROOT, 'assets', 'js', 'library-data.js'),
  `/* GENERATED by tools/build-library.mjs from the vault's Site/public.json (VarXec, Publish). Do not edit. */\nwindow.LIBRARY = ${JSON.stringify({ published: pub.published, projects }, null, 1).replace(/</g, '\\u003c')};\n`);
console.log(`library: ${projects.length} projects, ${projects.reduce((n, p) => n + p.builds.length, 0)} builds, published ${pub.published}`);
