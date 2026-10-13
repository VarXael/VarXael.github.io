// Copies ONLY the public site into site-dist/ (git-ignored). Publishing pushes that folder, never the working repo,
// so mockups, tools, notes, editor files and git history stay private (they live in the private repo VarXael/Portfolio-Source).
// Anything not on this list does not go online. To publish a new page or folder, add it here.
//
//   node tools/build-site.mjs        (npm run publish runs it for you)

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'site-dist');

const PAGES = ['index.html', 'lab.html', 'portfolio.html', 'cv.html'];
const FILES = ['assets/css/style.css', 'assets/js/content.js', 'assets/js/script.js', 'assets/js/varxel.js'];
const FOLDERS = [
  ['assets/images', { deep: false }],              // top-level images only: Template/ and Unresized Old Images/ stay private
  ['assets/videos', { deep: false }],
  ['play', { deep: true, skip: ['_private'] }],    // private builds never ship
];

fs.rmSync(OUT, { recursive: true, force: true });
let count = 0;
const copy = rel => {
  const from = path.join(ROOT, rel), to = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(to), { recursive: true });
  fs.copyFileSync(from, to);
  count++;
};
for (const f of [...PAGES, ...FILES]) {
  if (!fs.existsSync(path.join(ROOT, f))) throw new Error(`missing ${f}`);
  copy(f);
}
for (const [dir, { deep, skip = [] }] of FOLDERS) {
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

/* every local link in the pages and scripts must exist in the output, or the build stops */
const missing = [];
for (const f of [...PAGES, 'assets/js/script.js']) {
  const text = fs.readFileSync(path.join(OUT, f), 'utf8');
  for (const m of text.matchAll(/(?:src|href)="\.\/([^"#?$]+)"/g)) {
    const target = decodeURIComponent(m[1]);
    const p = path.join(OUT, target);
    if (!fs.existsSync(p) && !fs.existsSync(path.join(p, 'index.html'))) missing.push(`${f} -> ${target}`);
  }
}
const content = fs.readFileSync(path.join(OUT, 'assets/js/content.js'), 'utf8');
for (const m of content.matchAll(/"\.\/(assets\/(?:images|videos)\/[^"]+)"/g))
  if (!fs.existsSync(path.join(OUT, m[1]))) missing.push(`content.js -> ${m[1]}`);
if (missing.length) { console.error('Missing from the public site:\n  ' + [...new Set(missing)].join('\n  ')); process.exit(1); }
console.log(`site-dist: ${count} files, every local link checked`);
