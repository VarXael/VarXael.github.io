// Publish the portfolio to varxael.github.io (public repo VarXael/VarXael.github.io, branch main).
// Rebuilds from the vault, builds ONLY the portfolio (tools/build-site.mjs portfolio -> site-portfolio/),
// and commits that folder as the whole content of main, on top of main's history.
// Undo the last publish: in a clone of main, `git revert HEAD` and push (or ask an AI to do it).
//
//   npm run publish-portfolio                 (or: node tools/publish-portfolio.mjs "optional message")

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = path.join(ROOT, 'site-portfolio');
const WT = path.join(os.tmpdir(), 'varxael-main-publish');
const run = (cmd, cwd = ROOT) => execSync(cmd, { cwd, stdio: 'inherit' });
const out = (cmd, cwd = ROOT) => execSync(cmd, { cwd }).toString().trim();

run('node tools/build-content.mjs');
run('node tools/build-site.mjs portfolio');

run('git fetch origin main');
if (fs.existsSync(WT)) { try { run(`git worktree remove --force "${WT}"`); } catch { fs.rmSync(WT, { recursive: true, force: true }); run('git worktree prune'); } }
run(`git worktree add --detach "${WT}" origin/main`);
try {
  for (const e of fs.readdirSync(WT)) if (e !== '.git') fs.rmSync(path.join(WT, e), { recursive: true, force: true });
  fs.cpSync(SITE, WT, { recursive: true });
  run('git add -A', WT);
  if (!out('git status --porcelain', WT)) console.log('The portfolio on main is already up to date.');
  else {
    const stamp = new Date().toISOString().slice(0, 16).replace('T', ' ');
    const msg = process.argv[2] || `PUBLISH: portfolio (${stamp})`;
    execSync(`git commit -q -m ${JSON.stringify(msg)}`, { cwd: WT, stdio: 'inherit' });
    run('git push origin HEAD:main', WT);
    console.log(`Published ${out('git rev-parse --short HEAD', WT)} to https://varxael.github.io/ . GitHub Pages usually updates within a minute or two.`);
  }
} finally {
  run(`git worktree remove --force "${WT}"`);
}
