// Rebuild from the vault, commit the generated content, push the branch to origin and to the lab (VarXael/VarXel-Lab, main),
// which GitHub Pages serves at varxael.github.io/VarXel-Lab/. The portfolio (origin/main) is not touched.
//
//   npm run publish                 (or: node tools/publish.mjs "optional message")

import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const run = cmd => execSync(cmd, { cwd: ROOT, stdio: 'inherit' });
const out = cmd => execSync(cmd, { cwd: ROOT }).toString().trim();

run('node tools/build-content.mjs');
run('git add assets/js/content.js assets/js/varxel.js portfolio.html assets/images play');   // varxel.private.js is git-ignored: it never ships
if (!out('git diff --cached --name-only')) { console.log('Nothing changed in the vault since the last publish.'); process.exit(0); }
const msg = process.argv[2] || `CONTENT: update from vault (${new Date().toISOString().slice(0, 16).replace('T', ' ')})`;
execSync(`git commit -m ${JSON.stringify(msg)}`, { cwd: ROOT, stdio: 'inherit' });
run(`git push origin ${out('git branch --show-current')}`);
run('git push lab HEAD:main');
console.log('Published to https://varxael.github.io/VarXel-Lab/ . GitHub Pages usually updates within a minute.');
