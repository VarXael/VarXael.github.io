// Copies ONLY a public site into a git-ignored folder. Publishing pushes that folder, never the working repo,
// so mockups, tools, notes, editor files and git history stay private (they live in the private repo VarXael/Portfolio-Source).
// Anything not on a list below does not go online. To publish a new page or folder, add it to its target.
//
//   node tools/build-site.mjs              -> site-dist/       the lab (varxael.github.io/VarXel-Lab/), npm run publish
//   node tools/build-site.mjs portfolio    -> site-portfolio/  the portfolio (varxael.github.io), npm run publish-portfolio
//
// The portfolio target has no Lab and no VarXel catalogue, so nothing there leads to other projects.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FOG = ['assets/css/fog.css', 'assets/js/content.js', 'assets/js/docs.js', 'assets/js/fog.js'];
const MEDIA = [
  ['assets/images', { deep: false }],              // top-level images only: Template/ and Unresized Old Images/ stay private
  ['assets/videos', { deep: false }],
  ['assets/shots', { deep: true }],                // version pictures chosen by build-docs (public versions only)
  ['play', { deep: true, skip: ['_private'] }],    // private builds never ship
];
const TARGETS = {
  lab: {
    out: 'site-dist',
    files: ['index.html', 'lab.html', 'portfolio.html', 'process.html', 'cv.html', 'assets/css/style.css', 'assets/js/script.js', 'assets/js/varxel.js', ...FOG],
    folders: [...MEDIA, ['work', { deep: true }]],
  },
  portfolio: {
    out: 'site-portfolio',
    files: ['portfolio.html', 'process.html', 'cv.html', 'business_card.html', 'business-card-single.html', ...FOG],
    folders: [...MEDIA, ['work', { deep: true }]],
    alias: { 'index.html': 'portfolio.html' },     // varxael.github.io opens on the portfolio home
  },
};
const name = process.argv[2] || 'lab';
const T = TARGETS[name];
if (!T) { console.error(`Unknown target "${name}". Use: ${Object.keys(TARGETS).join(', ')}`); process.exit(1); }
const OUT = path.join(ROOT, T.out);

fs.rmSync(OUT, { recursive: true, force: true });
let count = 0;
const copy = (rel, to = rel) => {
  const dest = path.join(OUT, to);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(path.join(ROOT, rel), dest);
  count++;
};
for (const f of T.files) {
  if (!fs.existsSync(path.join(ROOT, f))) throw new Error(`missing ${f}`);
  copy(f);
}
for (const [to, from] of Object.entries(T.alias ?? {})) copy(from, to);
for (const [dir, { deep, skip = [] }] of T.folders) {
  const walk = rel => {
    for (const e of fs.readdirSync(path.join(ROOT, rel), { withFileTypes: true })) {
      if (e.name.startsWith('.') || skip.includes(e.name)) continue;
      const r = `${rel}/${e.name}`;
      if (e.isDirectory()) { if (deep) walk(r); } else copy(r);
    }
  };
  if (fs.existsSync(path.join(ROOT, dir))) walk(dir);
}
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');

/* every relative link in every page, and every picture or video named in the data, must exist in the output */
const missing = [];
const htmls = [];
const walkHtml = d => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) walkHtml(p); else if (e.name.endsWith('.html')) htmls.push(p); } };
walkHtml(OUT);
for (const file of htmls) {
  if (file.includes(`${path.sep}play${path.sep}`)) continue;     // exported game builds manage their own files
  const text = fs.readFileSync(file, 'utf8');
  for (const m of text.matchAll(/(?:src|href)="([^"#?$]+)"/g)) {
    const u = m[1];
    if (/^(https?:|mailto:|data:|\/\/|javascript:)/.test(u) || u.includes('${')) continue;
    const p = path.resolve(path.dirname(file), decodeURIComponent(u));
    if (!fs.existsSync(p) && !fs.existsSync(path.join(p, 'index.html'))) missing.push(`${path.relative(OUT, file)} -> ${u}`);
  }
}
for (const data of ['assets/js/content.js', 'assets/js/docs.js']) {
  const text = fs.readFileSync(path.join(OUT, data), 'utf8');
  for (const m of text.matchAll(/"(?:\.\/)?(assets\/(?:images|videos|shots)\/[^"]+|play\/[^"]+)"/g))
    if (!fs.existsSync(path.join(OUT, m[1]))) missing.push(`${data} -> ${m[1]}`);
}
if (fs.existsSync(path.join(OUT, 'assets/js/docs.private.js')) || fs.existsSync(path.join(OUT, 'assets/shots-private'))) missing.push('PRIVATE preview data leaked into the output');
if (missing.length) { console.error('Problems in the public site:\n  ' + [...new Set(missing)].join('\n  ')); process.exit(1); }
console.log(`${T.out}: ${count} files, every link checked`);
