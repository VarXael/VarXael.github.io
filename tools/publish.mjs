// Rebuild from the vault, commit the generated content, and push the current branch.
//
//   npm run publish                 (or: node tools/publish.mjs "optional message")

import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const run = cmd => execSync(cmd, { cwd: ROOT, stdio: 'inherit' });
const out = cmd => execSync(cmd, { cwd: ROOT }).toString().trim();

run('node tools/build-content.mjs');
run('git add assets/js/content.js index.html assets/images');
if (!out('git diff --cached --name-only')) { console.log('Nothing changed in the vault since the last publish.'); process.exit(0); }
const msg = process.argv[2] || `CONTENT: update from vault (${new Date().toISOString().slice(0, 16).replace('T', ' ')})`;
execSync(`git commit -m ${JSON.stringify(msg)}`, { cwd: ROOT, stdio: 'inherit' });
run(`git push origin ${out('git branch --show-current')}`);
console.log('Published. GitHub Pages usually updates within a minute.');
