// Export a project's Godot build and put it on the portfolio.
//
//   npm run publish-build -- "A Race for the Sun"
//   npm run publish-build -- "Project Sasha" --build v2 --label "v2 · Master Design Document" --dir v2-master-doc
//
// What it does:
//   web      -> play/<id>/<build>/ in this repo (the site serves it; play/<id>/index.html is generated from the card)
//   Windows  -> zipped and uploaded to a GitHub Release of the site repo (public download link)
//   card     -> builds / downloads updated, then the site content is rebuilt
// Then `npm run publish` pushes the site.
//
// Options: --build <slug> (default "main")  --label "<text>"  --dir <godot project folder inside the repo>
//          --no-windows  --no-web
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { ROOT, CONFIG, TEMPLATES, args, run, gh, ghReady, idOf, today, fill, findCard, setProp, upsertPair, readProps } from './lib.mjs';

const a = args();
const title = a._[0];
if (!title) { console.log('usage: npm run publish-build -- "<Title>" [--build slug] [--label text] [--dir folder] [--no-windows] [--no-web]'); process.exit(1); }
const card = findCard(title);
if (!card) throw new Error(`No card for "${title}" in Portfolio/Projects or Portfolio/Lab.`);
const p = card.props;
if (!p.local || !p.local.length) throw new Error(`The card for "${title}" has no "local" folder. Run new-project first.`);
const id = p.id || idOf(title);
const build = a.build || 'main';
const label = a.label || (build === 'main' ? (p.title || title) : build);
const dir = path.join(p.local, a.dir || p.godot_dir || '');
if (!fs.existsSync(path.join(dir, 'project.godot'))) throw new Error(`No Godot project in ${dir}`);
const godot = CONFIG.godot;

// export presets: add the standard ones if the project has none
const presets = path.join(dir, 'export_presets.cfg');
if (!fs.existsSync(presets)) {
  fs.writeFileSync(presets, fill(fs.readFileSync(path.join(TEMPLATES, 'godot/export_presets.cfg'), 'utf8'), { TITLE: p.title || title }));
  console.log('  added export_presets.cfg (Web + Windows) to the project; commit it there');
}
console.log(`  importing ${dir}`);
run(godot, ['--headless', '--path', dir, '--import'], { check: false });

const exportTo = (preset, out) => {
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const r = run(godot, ['--headless', '--path', dir, '--export-release', preset, out], { check: false });
  if (!fs.existsSync(out)) throw new Error(`${preset} export failed:\n${(r.stdout + r.stderr).split('\n').filter(l => /error/i.test(l)).slice(0, 12).join('\n')}`);
};

let builds = p.builds || [];
let downloads = p.downloads || [];

if (!a['no-web']) {
  const webDir = path.join(ROOT, 'play', id, build);
  fs.rmSync(webDir, { recursive: true, force: true });
  exportTo('Web', path.join(webDir, 'index.html'));
  builds = upsertPair(builds, label, build);
  console.log(`  web build -> play/${id}/${build}/`);
}

if (!a['no-windows']) {
  if (!ghReady()) console.log('  ! Windows build skipped: log in once with "gh auth login" so it can be uploaded to GitHub Releases.');
  else {
    const tmp = path.join(os.tmpdir(), `publish-${id}-${build}`);
    fs.rmSync(tmp, { recursive: true, force: true });
    const exe = path.join(tmp, `${p.title || title}${build === 'main' ? '' : ' ' + build}.exe`);
    exportTo('Windows', exe);
    const zip = path.join(tmp, `${id}_${build}_windows.zip`);
    run('powershell', ['-NoProfile', '-Command', `Compress-Archive -Force -Path '${exe}' -DestinationPath '${zip}'`]);
    const tag = `build-${id}-${build}`.toLowerCase();
    const exists = gh(['release', 'view', tag, '--repo', CONFIG.siteRepo], { check: false }).status === 0;
    if (exists) gh(['release', 'upload', tag, zip, '--clobber', '--repo', CONFIG.siteRepo]);
    else gh(['release', 'create', tag, zip, '--repo', CONFIG.siteRepo, '--title', `${p.title || title} · ${label} (Windows)`,
      '--notes', `Windows build of ${p.title || title} (${label}), published ${today()}. Unzip and run the .exe.`]);
    const url = `https://github.com/${CONFIG.siteRepo}/releases/download/${tag}/${path.basename(zip)}`;
    downloads = upsertPair(downloads, `${label} · Windows`, url);
    console.log(`  Windows build -> ${url}`);
  }
}

setProp(card.file, 'builds', builds);
setProp(card.file, 'downloads', downloads);
console.log(`  card updated: ${path.basename(card.file)}`);
run(process.execPath, [path.join(ROOT, 'tools/build-content.mjs')], { stdio: 'inherit' });
if (String(readProps(fs.readFileSync(card.file, 'utf8')).published) !== 'true')
  console.log(`  note: the card is published: false, so the play page is only built once you publish it.`);
console.log('Next: npm run dev to look at it, npm run publish to put it online.');
