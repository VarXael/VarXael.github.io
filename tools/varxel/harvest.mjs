// Find every idea in The Union that is not an entry yet, and list it as a candidate for Giuseppe to tick.
//
//   npm run harvest
//
// Writes Project VarXel/Candidates.md the first time. Later runs never touch an existing file: they write
// "Candidates (new YYYY-MM-DD).md" with only the ideas not listed before. Ticked lines become entries with
// `npm run promote`.
import fs from 'node:fs';
import path from 'node:path';
import { VARXEL, UNION, ROOT_VAULT, entries, rel, today } from './lib.mjs';

const C = 140;                                   // snippet length
const clip = s => { s = s.replace(/\s+/g, ' ').trim(); return s.length > C ? s.slice(0, C).replace(/\s+\S*$/, '') + '…' : s; };
const wl = file => `[[${rel(file).replace(/\.md$/, '')}|${path.basename(file, '.md')}]]`;
const read = f => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n').replace(/^---\n[\s\S]*?\n---\n?/, '');
const props = f => { const m = fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---/); return m ? m[1] : ''; };
const list = (dir, deep = true) => !fs.existsSync(dir) ? [] : fs.readdirSync(dir, { withFileTypes: true }).flatMap(d =>
  d.isDirectory() ? (deep ? list(path.join(dir, d.name)) : []) : d.name.endsWith('.md') ? [path.join(dir, d.name)] : []);

/* notes that already belong to an entry (except the notebooks, whose single ideas are candidates) */
const covered = new Set();
for (const e of entries()) {
  if (e.title === 'Idee videogiochi notebooks') continue;
  for (const s of e.sources) covered.add(s.toLowerCase());
}
const isCovered = f => covered.has(rel(f).replace(/\.md$/, '').toLowerCase());

function firstLine(f) {
  const lines = read(f).split('\n').map(l => l.replace(/^#+\s*|^[-*]\s+(\[.\]\s*)?/g, '').trim()).filter(l => l && !/^!\[|^\[\[file|^>\s*\[\[file/.test(l));
  return clip(lines.slice(0, 3).join(' · '));
}
function yearOf(f) {
  const p = props(f);
  const a = p.match(/added:\s*(\d{4})/); if (a) return a[1];
  const n = path.basename(f).match(/^(\d{4})-\d\d-\d\d/); if (n) return n[1];
  return '';
}

const groups = [];
const add = (name, why, items) => { if (items.length) groups.push({ name, why, items }); };
const G = path.join(UNION, 'Games'), NG = path.join(UNION, 'Not games');

/* 1. the notebooks: one candidate per idea (each bullet) */
const nb = [];
for (const f of list(path.join(G, 'Notebooks (Idee videogiochi, 2018-2020)'))) {
  const bullets = read(f).split('\n').filter(l => /^\s{0,2}-\s*-?\s*\S/.test(l)).map(l => l.replace(/^\s*-\s*-?\s*-?\s*/, ''));
  if (bullets.length >= 2) bullets.forEach(b => b.length > 12 && nb.push({ text: clip(b), src: f, year: '2018-2020' }));
  else nb.push({ text: firstLine(f), src: f, year: '2018-2020' });
}
add('Idea notebooks (2018 to 2020)', 'Every bullet in the "Idee videogiochi" notebooks and the 2019 notes is one idea.', nb);

/* 2. single-idea notes, by where they were written */
for (const sub of ['Todoist', 'Desktop notes', 'Obsidian', 'Notion', 'Sticky Notes']) {
  const items = list(path.join(G, 'Ideas (single notes)', sub)).filter(f => !isCovered(f)).map(f => ({ text: firstLine(f), src: f, year: yearOf(f) }));
  add(`Single ideas: ${sub}`, '', items);
}

/* 3. not games */
for (const sub of ['Apps, tools and devices', 'Business ideas', 'Stories and worlds', 'Writing on game design', 'D&D characters and campaigns']) {
  const items = list(path.join(NG, sub)).filter(f => !isCovered(f)).map(f => ({ text: firstLine(f), src: f, year: yearOf(f) }));
  add(sub, sub.startsWith('D&D') ? 'Characters, sessions and campaign notes; one line each.' : '', items);
}

/* 4. ideas with no notes at all, only a title somewhere */
const blog = path.join(ROOT_VAULT, 'Main Vault/Blog Overview');
const titles = ['Game Design - Fizz Rework.md', 'Game Design - LoL Champion VarXel.md'].map(f => path.join(blog, f)).filter(fs.existsSync)
  .map(f => ({ text: `${path.basename(f, '.md')} (an empty note: only the title exists)`, src: f, year: '2024' }));
add('Titles without notes', 'Write a sentence from memory and they become entries.', titles);

/* write, never overwriting */
// --refresh rewrites Candidates.md, but only while nothing in it has been ticked yet
const main = path.join(VARXEL, 'Candidates.md');
const refresh = process.argv.includes('--refresh') && fs.existsSync(main) && !/^- \[x\]/mi.test(fs.readFileSync(main, 'utf8'));
const seen = new Set();
for (const f of fs.readdirSync(VARXEL).filter(f => /^Candidates.*\.md$/.test(f) && !(refresh && f === 'Candidates.md')))
  for (const l of fs.readFileSync(path.join(VARXEL, f), 'utf8').split('\n')) { const m = l.match(/^- \[.\] .*?"(.+)" · /); if (m) seen.add(m[1]); }
let total = 0;
const out = [];
for (const g of groups) {
  const items = g.items.filter(i => i.text && !seen.has(i.text) && (seen.add(i.text), true));
  if (!items.length) continue;
  total += items.length;
  out.push(`## ${g.name} (${items.length})`, '', ...(g.why ? [g.why, ''] : []),
    ...items.map(i => `- [ ] "${i.text.replace(/"/g, "'")}" · ${wl(i.src)}${i.year ? ` · ${i.year}` : ''}`), '');
}
if (!total) { console.log('No new candidates.'); process.exit(0); }
const first = refresh || !fs.existsSync(main);
const file = path.join(VARXEL, first ? 'Candidates.md' : `Candidates (new ${today()}).md`);
const head = [`---`, `created: ${today()}`, `---`, `# Candidates${first ? '' : ` (new ${today()})`}`, '',
  `Ideas found in The Union that are not entries yet: ${total}. Each line quotes the notes word for word, with a link to the source.`, '',
  '**To keep one:** tick it. To give it a name, type the name right after the box: `- [x] Mirror Boss "…"`. Then run `npm run promote` in the website repo; every ticked line becomes a private entry. Lines you leave unticked stay here, nothing is lost.', ''];
fs.writeFileSync(file, [...head, ...out].join('\n'));
console.log(`${total} candidates -> ${path.relative(ROOT_VAULT, file)}`);
