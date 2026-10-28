// Puts the files of the portfolio preview (frames-library.html) into preview-dist/ for preview/worker.js.
//   node tools/build-preview.mjs        then: npx wrangler deploy -c wrangler.preview.jsonc   (npm run preview-deploy does both)
// Files over 25 MB (the Workers limit) stay out; the worker sends the videos to the public site.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'preview-dist');
const FILES = ['frames-library.html', 'cv.html', 'assets/css/frames-site.css', 'assets/css/frames-library.css',
  'assets/js/content.js', 'assets/js/docs.js', 'assets/js/frames-library.js'];
const DIRS = ['assets/images', 'assets/shots'];
fs.rmSync(OUT, { recursive: true, force: true });
const copy = (rel) => { const from = path.join(ROOT, rel); if (!fs.existsSync(from) || fs.statSync(from).size > 25 * 1024 * 1024) return; fs.mkdirSync(path.dirname(path.join(OUT, rel)), { recursive: true }); fs.copyFileSync(from, path.join(OUT, rel)); };
const walk = (rel) => { for (const e of fs.readdirSync(path.join(ROOT, rel), { withFileTypes: true })) { const r = `${rel}/${e.name}`; if (e.isDirectory()) walk(r); else copy(r); } };
FILES.forEach(copy);
DIRS.filter((d) => fs.existsSync(path.join(ROOT, d))).forEach(walk);
console.log(`preview-dist: ${fs.readdirSync(OUT, { recursive: true }).length} entries`);
