// Turn every ticked line in the candidate lists (VarXel/Site) into a private Catalogue entry.
//
//   npm run promote            (add --dry to only show what would be created)
//
// A ticked line looks like:  - [x] Mirror Boss "the quoted idea…" · [[source|name]] · 2018-2020
// The name typed after the box becomes the entry's title; without one, the first words of the idea are used.
// Never edits the candidate lists and never overwrites an entry.
import fs from 'node:fs';
import path from 'node:path';
import { SITE, CATALOGUE, today } from './lib.mjs';

const dry = process.argv.includes('--dry');
const files = fs.readdirSync(SITE).filter(f => /^Candidates.*\.md$/.test(f));
let made = 0, skipped = 0;
for (const f of files) {
  for (const line of fs.readFileSync(path.join(SITE, f), 'utf8').replace(/\r\n/g, '\n').split('\n')) {
    const m = line.match(/^- \[[xX]\]\s*(.*?)\s*"(.+)" · (\[\[[^\]]+\]\])(?: · (.+))?$/);
    if (!m) continue;
    const [, typed, text, source, when = ''] = m;
    const title = (typed || text.replace(/[…'"]/g, '').split(/\s+/).slice(0, 6).join(' ')).replace(/[\\/:*?"<>|#^[\]]/g, '').trim();
    const file = path.join(CATALOGUE, `${title}.md`);
    if (fs.existsSync(file)) { skipped++; continue; }
    const year = (when.match(/\d{4}/) || [''])[0];
    const body = ['---', 'kind: idea', `started: ${year}`, `updated: ${today()}`, 'family: ', 'from: []', 'became: []',
      'sources:', `  - "${source}"`, 'repo: ""', 'card: ""', 'public: false', '---', '',
      `%% Promoted from ${f.replace(/\.md$/, '')} on ${today()}. %%`, '', 'From the notes:', '', `> ${text}`, ''].join('\n');
    if (!dry) fs.writeFileSync(file, body);
    console.log(`${dry ? 'would create' : 'created'}: ${title}`);
    made++;
  }
}
console.log(`${made} new entr${made === 1 ? 'y' : 'ies'}${skipped ? `, ${skipped} already existed` : ''}.`);
