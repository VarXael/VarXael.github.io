// Start a project (or a mechanic specimen inside one) so it is wired into Project VarXel, git and GitHub.
//
//   npm run new-project -- "A Race for the Sun" --from "Circle FPS"
//       new Godot project: its Project VarXel entry, a workspace (handout + devlog), a local repo from the
//       template, and a private GitHub repo
//   npm run new-project -- "Project Pulse" --repo Project_Circle --existing --branch godot-prototype
//       a Godot prototype on its own branch of an existing repo (how Sasha's prototypes live)
//   npm run new-project -- "Gestation" --repo Project_Alien --existing --branch godot-prototype --from-folder "C:/Users/User/Desktop/Gestation_Prototype"
//       adopt a project that already exists in a local folder
//   npm run new-project -- "Size decides the path" --specimen-of "Gestation" --mechanic D2
//       a Lab specimen: one mechanic, built inside its game's repo under specimens/
//
// Options: --engine godot|unreal|none (default godot)  --kind game|prototype|mod|tool|...  --from "Entry A, Entry B"
//          --local <folder>  --dir <Godot folder inside the repo>  --dry (show the plan only)
// The entry is created if missing. If it exists, only its empty fields are filled (repo, local, godot_dir, kind, status).
// No portfolio card is created: a card is written only when the project goes into the portfolio.
import fs from 'node:fs';
import path from 'node:path';
import { CONFIG, VAULT, TEMPLATES, args, run, gh, ghReady, idOf, slugOf, repoOf, today, fill, copyTemplate, findCard, setProp } from './lib.mjs';
import { ENTRIES, WORKSPACES, findEntry, entryLink, fileName } from '../varxel/lib.mjs';

const a = args();
const title = a._[0];
if (!title) { console.log('usage: npm run new-project -- "<Title>" [--repo Name] [--existing] [--branch b] [--from-folder folder] [--from "Entry"] [--specimen-of "<Parent>" --mechanic ID]'); process.exit(1); }
const engine = a.engine || 'godot';
const dry = !!a.dry;
const git = (cwd, ...rest) => run('git', rest, { cwd });
const fwd = p => p.replace(/\\/g, '/');
const plan = [];
const step = (msg, fn) => { plan.push(msg); if (!dry) fn(); };
const fromFolder = a['from-folder'] || (a.from && fs.existsSync(a.from) ? a.from : null);    // old spelling: --from <folder>
const fromEntries = a.from && !fromFolder ? String(a.from).split(',').map(s => s.trim()).filter(Boolean) : [];

function writeIfMissing(file, text) {
  if (fs.existsSync(file)) { plan.push(`  keep ${path.basename(file)} (exists)`); return; }
  step(`  write ${path.relative(path.dirname(VAULT), file)}`, () => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, text); });
}
const tpl = name => fs.readFileSync(path.join(TEMPLATES, 'vault', name), 'utf8');

/* the Project VarXel entry: create it, or fill only what is empty */
function linkEntry(vars) {
  const e = findEntry(title);
  if (!e) {
    const from = fromEntries.length ? '\n' + fromEntries.map(t => `  - "${entryLink(t)}"`).join('\n') : ' []';
    writeIfMissing(path.join(ENTRIES, `${fileName(title)}.md`), fill(tpl('entry.md'), { ...vars, FROM: from, KIND: a.kind || 'game' }));
    return;
  }
  const fills = { repo: vars.REPO, local: vars.LOCAL, godot_dir: vars.GODOT_DIR, kind: a.kind || '', status: 'exploring' };
  const empty = Object.entries(fills).filter(([k, v]) => v && !e[k]);
  plan.push(`  entry exists: ${e.title}${empty.length ? ` (filling empty: ${empty.map(([k]) => k).join(', ')})` : ' (nothing to fill)'}`);
  if (!dry) for (const [k, v] of empty) setProp(e.file, k, v);
}

if (a['specimen-of']) {
  /* ---------------- a mechanic specimen inside its game ---------------- */
  const parent = findEntry(a['specimen-of']) || findCard(a['specimen-of'])?.props;
  if (!parent) throw new Error(`No entry for "${a['specimen-of']}". Create the parent project first.`);
  if (!parent.local) throw new Error(`"${a['specimen-of']}" has no local folder on its entry yet.`);
  const mech = a.mechanic || '';
  const slug = slugOf(`${mech} ${title}`);
  const gdir = `specimens/${slug}`;
  const code = path.join(parent.local, gdir);
  const parentTitle = parent.title || a['specimen-of'];
  const vars = { TITLE: title, ID: idOf(`${mech}${title}`), MECHANIC: mech, PARENT: parentTitle, YEAR: new Date().getFullYear(), DATE: today(),
    LOCAL: fwd(parent.local), GODOT_DIR: gdir, REPO: parent.repo || '', SUMMARY: `A Lab specimen of ${parentTitle}: ${mech} ${title}.` };
  writeIfMissing(path.join(VAULT, 'Lab', `${mech ? mech + ' ' : ''}${title}.md`), fill(tpl('specimen.md'), vars));
  if (fs.existsSync(code)) plan.push(`  keep ${code} (exists)`);
  else step(`  code ${code} (Godot template)`, () => copyTemplate(path.join(TEMPLATES, 'godot'), code, vars));
  step(`  commit in ${parent.local}`, () => {
    git(parent.local, 'add', gdir);
    git(parent.local, 'commit', '-q', '-m', `ADD: specimen ${mech} ${title}`);
    if (run('git', ['remote'], { cwd: parent.local }).stdout.trim()) git(parent.local, 'push', '-q');
  });
} else {
  /* ---------------- a project ---------------- */
  const repo = a.repo || repoOf(title);
  const full = repo.includes('/') ? repo : `${CONFIG.githubUser}/${repo}`;
  const local = a.local || path.join(CONFIG.projectsRoot, full.split('/')[1]);
  const branch = a.branch && a.branch !== true ? a.branch : null;
  const vars = { TITLE: title, ID: idOf(title), YEAR: new Date().getFullYear(), DATE: today(),
    REPO: full, LOCAL: fwd(local), GODOT_DIR: a.dir || '', SUMMARY: `Code for ${title}.` };

  // 1. the code
  const isRepo = fs.existsSync(path.join(local, '.git'));
  let fresh = !a.existing;                         // only a new repo or a new branch gets the template
  if (a.existing) {
    if (!isRepo) step(`  clone ${full} -> ${local}`, () => run('git', ['clone', '-q', '--filter=blob:none', ...(branch ? ['--no-checkout'] : []), `https://github.com/${full}.git`, local]));
    if (branch) step(`  branch ${branch}`, () => {
      run('git', ['fetch', '-q', 'origin'], { cwd: local });
      const remoteHas = run('git', ['ls-remote', '--heads', 'origin', branch], { cwd: local }).stdout.trim();
      if (remoteHas) git(local, 'checkout', '-q', branch);
      else {
        fresh = true;
        git(local, 'checkout', '-q', '--orphan', branch);
        run('git', ['rm', '-rq', '--cached', '.'], { cwd: local, check: false });
        for (const f of fs.readdirSync(local)) if (f !== '.git') fs.rmSync(path.join(local, f), { recursive: true, force: true });
      }
    });
  } else if (!isRepo) {
    if (fs.existsSync(local) && fs.readdirSync(local).length && !fromFolder) throw new Error(`${local} exists and is not empty. Use --local or --from-folder.`);
    step(`  git init ${local}`, () => { fs.mkdirSync(local, { recursive: true }); git(local, 'init', '-q', '-b', 'main'); });
  }
  if (fromFolder) {
    step(`  copy ${fromFolder} -> ${local}`, () => fs.cpSync(fromFolder, local, { recursive: true, force: false, errorOnExist: false,
      filter: s => !/[\\/](\.godot|export|\.git)([\\/]|$)/.test(s.slice(fromFolder.length)) }));
    if (engine === 'godot') step('  add missing template files (export presets, .gitignore, launchers)', () => copyTemplate(path.join(TEMPLATES, 'godot'), local, vars));
  } else if (engine === 'godot') {
    step('  Godot template (new repo or branch only)', () => { if (fresh) copyTemplate(path.join(TEMPLATES, 'godot'), local, vars); });
  } else {
    step('  README', () => { if (!fs.existsSync(path.join(local, 'README.md'))) fs.writeFileSync(path.join(local, 'README.md'), fill(fs.readFileSync(path.join(TEMPLATES, 'godot/README.md'), 'utf8'), vars)); });
  }
  step('  commit', () => {
    git(local, 'add', '-A');
    if (run('git', ['status', '--porcelain'], { cwd: local }).stdout.trim())
      git(local, 'commit', '-q', '-m', fromFolder ? `ADD: ${title}, imported from ${path.basename(fromFolder)}` : `ADD: ${title}, created with new-project`);
  });

  // 2. GitHub
  if (a.existing) step(`  push ${branch || 'current branch'}`, () => git(local, 'push', '-q', '-u', 'origin', branch || 'HEAD'));
  else if (ghReady()) step(`  create private GitHub repo ${full} and push`, () => gh(['repo', 'create', full, '--private', '--source', local, '--push']));
  else plan.push(`  ! GitHub CLI is not logged in. Later: gh repo create ${full} --private --source "${local}" --push`);

  // 3. Project VarXel: the entry + a workspace
  linkEntry(vars);
  const legacyWs = path.join(VAULT, title);                       // workspaces made before 2026-10-04 live in Portfolio/<Title>/
  const ws = fs.existsSync(path.join(legacyWs, `${title} Handout.md`)) ? legacyWs : path.join(WORKSPACES, title);
  writeIfMissing(path.join(ws, `${title} Handout.md`), fill(tpl('handout.md'), vars));
  writeIfMissing(path.join(ws, `${title} Devlog.md`), fill(tpl('devlog.md'), vars));
}

console.log(`${dry ? 'PLAN (dry run)' : 'DONE'}: ${title}\n${plan.join('\n')}`);
