// Export a project's Godot build and make it playable in VarXel.
//
//   npm run publish-build -- "A Race for the Sun"
//   npm run publish-build -- "Project Sasha" --build v2 --label "v2 · Master Design Document" --dir v2-master-doc
//
// Where the build goes depends on the project's entry:
//   private entry          web -> play/_private/<id>/<build>/ (git-ignored: playable on this computer only, in the local
//                          VarXel view); Windows zip -> the project's own export/ folder
//   public entry, or a     web -> play/<id>/<build>/ (the site serves it); Windows zip -> a GitHub Release of the site repo
//   project in Portfolio.md
// The builds are recorded on the entry (builds / downloads), then the site content is rebuilt.
// Setting public: true later and running this again puts the build online.
// Then `npm run publish` pushes the site.
//
// Options: --build <slug> (default "main")  --label "<text>"  --dir <Godot folder inside the repo>
//          --no-windows  --no-web  --private (force the private destination)  --no-record (do not touch the entry)
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { ROOT, CONFIG, TEMPLATES, args, run, gh, ghReady, today, fill, findCard, setProp, upsertPair } from './lib.mjs';
import { findEntry, isOnline } from '../varxel/lib.mjs';

const a = args();
const title = a._[0];
if (!title) { console.log('usage: npm run publish-build -- "<Title>" [--build slug] [--label text] [--dir folder] [--no-windows] [--no-web] [--private]'); process.exit(1); }
const e = findEntry(title);
if (!e) throw new Error(`No VarXel project card for "${title}". Run new-project first, or start the project in the hub.`);
const legacy = findCard(title)?.props || {};                     // cards made before 2026-10-04 kept the code location
const clone = e.repo ? path.join(CONFIG.projectsRoot, e.repo.split('/').pop()) : '';          // where a clone usually is
const local = e.local || legacy.local || (clone && fs.existsSync(path.join(clone, '.git')) ? clone : '');
if (!local || !local.length) throw new Error(`"${e.title}" has no code folder on this PC. Clone its repository (the hub can), or fill local: on the card.`);
const build = a.build || 'main';
const label = a.label || (build === 'main' ? e.title : build);
const dir = path.join(local, a.dir || e.godot_dir || legacy.godot_dir || '');
if (!fs.existsSync(path.join(dir, 'project.godot'))) throw new Error(`No Godot project in ${dir}`);
const online = !a.private && isOnline(e);
const godot = CONFIG.godot;
console.log(`  ${e.title}: ${online ? 'ONLINE (public entry or in the portfolio)' : 'PRIVATE (this computer only)'}`);

// export presets: add the standard ones if the project has none
const presets = path.join(dir, 'export_presets.cfg');
if (!fs.existsSync(presets)) {
  fs.writeFileSync(presets, fill(fs.readFileSync(path.join(TEMPLATES, 'godot/export_presets.cfg'), 'utf8'), { TITLE: e.title }));
  console.log('  added export_presets.cfg (Web + Windows) to the project; commit it there');
}
console.log(`  importing ${dir}`);
run(godot, ['--headless', '--path', dir, '--import'], { check: false });

const exportTo = (preset, out) => {
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const r = run(godot, ['--headless', '--path', dir, '--export-release', preset, out], { check: false });
  if (!fs.existsSync(out)) throw new Error(`${preset} export failed:\n${(r.stdout + r.stderr).split('\n').filter(l => /error/i.test(l)).slice(0, 12).join('\n')}`);
};

let builds = e.builds.map(b => `${b.label} | ${b.slug}`);
let downloads = e.downloads.map(d => `${d.label} | ${d.url}`);

if (!a['no-web']) {
  const base = online ? path.join(ROOT, 'play', e.id) : path.join(ROOT, 'play', '_private', e.id);
  const webDir = path.join(base, build);
  fs.rmSync(webDir, { recursive: true, force: true });
  exportTo('Web', path.join(webDir, 'index.html'));
  if (online) fs.rmSync(path.join(ROOT, 'play', '_private', e.id, build), { recursive: true, force: true });   // promoted: drop the private copy
  builds = upsertPair(builds, label, build);
  console.log(`  web build -> ${path.relative(ROOT, webDir).replace(/\\/g, '/')}/`);
}

if (!a['no-windows']) {
  const tmp = path.join(os.tmpdir(), `publish-${e.id}-${build}`);
  fs.rmSync(tmp, { recursive: true, force: true });
  const exe = path.join(tmp, `${e.title}${build === 'main' ? '' : ' ' + build}.exe`);
  exportTo('Windows', exe);
  const zipName = `${e.id}_${build}_windows.zip`;
  if (online && ghReady()) {
    const zip = path.join(tmp, zipName);
    run('powershell', ['-NoProfile', '-Command', `Compress-Archive -Force -Path '${exe}' -DestinationPath '${zip}'`]);
    const tag = `build-${e.id}-${build}`.toLowerCase();
    const exists = gh(['release', 'view', tag, '--repo', CONFIG.siteRepo], { check: false }).status === 0;
    if (exists) gh(['release', 'upload', tag, zip, '--clobber', '--repo', CONFIG.siteRepo]);
    else gh(['release', 'create', tag, zip, '--repo', CONFIG.siteRepo, '--title', `${e.title} · ${label} (Windows)`,
      '--notes', `Windows build of ${e.title} (${label}), published ${today()}. Unzip and run the .exe.`]);
    const url = `https://github.com/${CONFIG.siteRepo}/releases/download/${tag}/${zipName}`;
    downloads = upsertPair(downloads, `${label} · Windows`, url);
    console.log(`  Windows build -> ${url}`);
  } else {
    const keep = path.join(local, 'export', 'windows', zipName);                  // export/ is git-ignored in the template
    fs.mkdirSync(path.dirname(keep), { recursive: true });
    run('powershell', ['-NoProfile', '-Command', `Compress-Archive -Force -Path '${exe}' -DestinationPath '${keep}'`]);
    console.log(`  Windows build (kept on this computer) -> ${keep}${online ? '  (log in with "gh auth login" to upload it)' : ''}`);
  }
}

if (!a['no-record']) {
  setProp(e.file, 'builds', builds);
  setProp(e.file, 'downloads', downloads);
  setProp(e.file, 'updated', today());
  console.log(`  entry updated: ${path.basename(e.file)}`);
}
run(process.execPath, [path.join(ROOT, 'tools/build-content.mjs')], { stdio: 'inherit' });
console.log(online ? 'Next: npm run dev to look at it, npm run publish to put it online.'
  : 'Next: npm run dev, then open http://localhost:8731 and the entry: its Play button runs the private build.');
