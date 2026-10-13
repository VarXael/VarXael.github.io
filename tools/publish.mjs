// Rebuild from the vault, commit the generated content, back the source up to the PRIVATE repo
// (VarXael/Portfolio-Source, remote "source"), then publish ONLY the built site (tools/build-site.mjs -> site-dist/)
// to the lab (VarXael/VarXel-Lab, main), which GitHub Pages serves at varxael.github.io/VarXel-Lab/.
// The lab gets a single fresh commit each time, so the public repo has no history to dig through.
// The portfolio (origin/main) is not touched.
//
//   npm run publish                 (or: node tools/publish.mjs "optional message")

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = path.join(ROOT, 'site-dist');
const LAB = 'https://github.com/VarXael/VarXel-Lab.git';
const run = (cmd, cwd = ROOT) => execSync(cmd, { cwd, stdio: 'inherit' });
const out = cmd => execSync(cmd, { cwd: ROOT }).toString().trim();

run('node tools/build-content.mjs');
run('git add assets/js/content.js assets/js/varxel.js portfolio.html assets/images play');   // varxel.private.js is git-ignored: it never ships
const stamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
if (out('git diff --cached --name-only')) {
  const msg = process.argv[2] || `CONTENT: update from vault (${stamp})`;
  execSync(`git commit -m ${JSON.stringify(msg)}`, { cwd: ROOT, stdio: 'inherit' });
} else console.log('Nothing changed in the vault since the last publish.');
run(`git push source ${out('git branch --show-current')}`);   // private backup of the source

run('node tools/build-site.mjs');
fs.rmSync(path.join(SITE, '.git'), { recursive: true, force: true });
run('git init -q -b main', SITE);
run('git add -A', SITE);
run(`git -c user.name=VarXel -c user.email=noreply@varxael.github.io commit -q -m ${JSON.stringify(`Site (${stamp})`)}`, SITE);
run(`git push --force ${LAB} main`, SITE);
console.log('Published to https://varxael.github.io/VarXel-Lab/ . GitHub Pages usually updates within a minute.');
