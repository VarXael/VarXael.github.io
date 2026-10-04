// Start a project (or a mechanic specimen inside one) so it is wired into the vault, git, GitHub and the portfolio.
//
//   npm run new-project -- "A Race for the Sun"
//       new Godot project: vault card + workspace, local repo from the template, private GitHub repo
//   npm run new-project -- "Project Pulse" --repo Project_Circle --existing --branch godot-prototype
//       a Godot prototype on its own branch of an existing repo (how Sasha's prototypes live)
//   npm run new-project -- "Gestation" --repo Project_Alien --existing --branch godot-prototype --from "C:/Users/User/Desktop/Gestation_Prototype"
//       adopt a project that already exists in a local folder
//   npm run new-project -- "Size decides the path" --specimen-of "Gestation" --mechanic D2
//       a Lab specimen: one mechanic, built inside its game's repo under specimens/
//
// Options: --engine godot|unreal|none (default godot)  --local <folder>  --dry (show the plan only)
import fs from 'node:fs';
import path from 'node:path';
import { CONFIG, VAULT, TEMPLATES, args, run, gh, ghReady, idOf, slugOf, repoOf, today, fill, copyTemplate, findCard, setProp } from './lib.mjs';

const a = args();
const title = a._[0];
if (!title) { console.log('usage: npm run new-project -- "<Title>" [--repo Name] [--existing] [--branch b] [--from folder] [--specimen-of "<Parent>" --mechanic ID]'); process.exit(1); }
const engine = a.engine || 'godot';
const dry = !!a.dry;
const git = (cwd, ...rest) => run('git', rest, { cwd });
const fwd = p => p.replace(/\\/g, '/');
const plan = [];
const step = (msg, fn) => { plan.push(msg); if (!dry) fn(); };

function writeIfMissing(file, text) {
  if (fs.existsSync(file)) { plan.push(`  keep ${path.basename(file)} (exists)`); return; }
  step(`  write ${path.relative(VAULT, file)}`, () => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, text); });
}
const tpl = name => fs.readFileSync(path.join(TEMPLATES, 'vault', name), 'utf8');

if (a['specimen-of']) {
  /* ---------------- a mechanic specimen inside its game ---------------- */
  const parent = findCard(a['specimen-of']);
  if (!parent) throw new Error(`No card for "${a['specimen-of']}". Create the parent project first.`);
  if (!parent.props.local) throw new Error(`"${a['specimen-of']}" has no local folder on its card yet.`);
  const mech = a.mechanic || '';
  const slug = slugOf(`${mech} ${title}`);
  const gdir = `specimens/${slug}`;
  const code = path.join(parent.props.local, gdir);
  const parentTitle = parent.props.title || path.basename(parent.file, '.md');
  const vars = { TITLE: title, ID: idOf(`${mech}${title}`), MECHANIC: mech, PARENT: parentTitle, YEAR: new Date().getFullYear(), DATE: today(),
    LOCAL: fwd(parent.props.local), GODOT_DIR: gdir, CARD: `Lab/${mech} ${title}.md`, REPO: parent.props.repo || '',
    SUMMARY: `A Lab specimen of ${parentTitle}: ${mech} ${title}.` };
  writeIfMissing(path.join(VAULT, 'Lab', `${mech ? mech + ' ' : ''}${title}.md`), fill(tpl('specimen.md'), vars));
  if (fs.existsSync(code)) plan.push(`  keep ${code} (exists)`);
  else step(`  code ${code} (Godot template)`, () => copyTemplate(path.join(TEMPLATES, 'godot'), code, vars));
  step(`  commit in ${parent.props.local}`, () => {
    git(parent.props.local, 'add', gdir);
    git(parent.props.local, 'commit', '-q', '-m', `ADD: specimen ${mech} ${title}`);
    if (run('git', ['remote'], { cwd: parent.props.local }).stdout.trim()) git(parent.props.local, 'push', '-q');
  });
} else {
  /* ---------------- a project ---------------- */
  const repo = a.repo || repoOf(title);
  const full = repo.includes('/') ? repo : `${CONFIG.githubUser}/${repo}`;
  const local = a.local || path.join(CONFIG.projectsRoot, full.split('/')[1]);
  const branch = a.branch && a.branch !== true ? a.branch : null;
  const card = findCard(title);
  const vars = { TITLE: title, ID: idOf(title), YEAR: new Date().getFullYear(), DATE: today(), STATUS: 'In development',
    ENGINE: engine === 'godot' ? 'Godot 4.7' : engine === 'unreal' ? 'Unreal Engine' : '', REPO: full, LOCAL: fwd(local),
    GODOT_DIR: '', CARD: card ? path.relative(VAULT, card.file).replace(/\\/g, '/') : `Projects/${title}.md`,
    SUMMARY: `Code for ${title}.` };

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
    if (fs.existsSync(local) && fs.readdirSync(local).length && !a.from) throw new Error(`${local} exists and is not empty. Use --local or --from.`);
    step(`  git init ${local}`, () => { fs.mkdirSync(local, { recursive: true }); git(local, 'init', '-q', '-b', 'main'); });
  }
  if (a.from) {
    step(`  copy ${a.from} -> ${local}`, () => fs.cpSync(a.from, local, { recursive: true, force: false, errorOnExist: false,
      filter: s => !/[\\/](\.godot|export|\.git)([\\/]|$)/.test(s.slice(a.from.length)) }));
    if (engine === 'godot') step('  add missing template files (export presets, .gitignore, launchers)', () => copyTemplate(path.join(TEMPLATES, 'godot'), local, vars));
  } else if (engine === 'godot') {
    step('  Godot template (new repo or branch only)', () => { if (fresh) copyTemplate(path.join(TEMPLATES, 'godot'), local, vars); });
  } else {
    step('  README', () => { if (!fs.existsSync(path.join(local, 'README.md'))) fs.writeFileSync(path.join(local, 'README.md'), fill(fs.readFileSync(path.join(TEMPLATES, 'godot/README.md'), 'utf8'), vars)); });
  }
  step('  commit', () => {
    git(local, 'add', '-A');
    if (run('git', ['status', '--porcelain'], { cwd: local }).stdout.trim())
      git(local, 'commit', '-q', '-m', a.from ? `ADD: ${title}, imported from ${path.basename(a.from)}` : `ADD: ${title}, created with new-project`);
  });

  // 2. GitHub
  if (a.existing) step(`  push ${branch || 'current branch'}`, () => git(local, 'push', '-q', '-u', 'origin', branch || 'HEAD'));
  else if (ghReady()) step(`  create private GitHub repo ${full} and push`, () => gh(['repo', 'create', full, '--private', '--source', local, '--push']));
  else plan.push(`  ! GitHub CLI is not logged in. Later: gh repo create ${full} --private --source "${local}" --push`);

  // 3. the vault: card + workspace
  if (card) {
    plan.push(`  card exists: ${path.relative(VAULT, card.file)} (adding repo / local only if missing)`);
    if (!dry) {
      if (!card.props.repo) setProp(card.file, 'repo', full);
      if (!card.props.local || !card.props.local.length) setProp(card.file, 'local', fwd(local));
      if (card.props.godot_dir === undefined) setProp(card.file, 'godot_dir', '');
    }
  } else writeIfMissing(path.join(VAULT, 'Projects', `${title}.md`), fill(tpl('card.md'), vars));
  writeIfMissing(path.join(VAULT, title, `${title} Handout.md`), fill(tpl('handout.md'), vars));
  writeIfMissing(path.join(VAULT, title, `${title} Devlog.md`), fill(tpl('devlog.md'), vars));
}

console.log(`${dry ? 'PLAN (dry run)' : 'DONE'}: ${title}\n${plan.join('\n')}`);
