// Shared helpers for the workshop commands (new-project, publish-build).
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const CONFIG = JSON.parse(fs.readFileSync(path.join(ROOT, 'content.config.json'), 'utf8'));
export const VAULT = CONFIG.source;                       // .../VarXel/Site
export const TEMPLATES = path.join(ROOT, 'tools/workshop/templates');

/* ---------- command line ---------- */
export function args(argv = process.argv.slice(2)) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next === undefined || next.startsWith('--')) out[key] = true;
      else { out[key] = next; i++; }
    } else out._.push(a);
  }
  return out;
}

export function run(cmd, cmdArgs, opts = {}) {
  const r = spawnSync(cmd, cmdArgs, { encoding: 'utf8', ...opts });
  if (opts.check !== false && r.status !== 0) {
    throw new Error(`${path.basename(cmd)} ${cmdArgs.join(' ')} failed:\n${r.stderr || r.stdout}`);
  }
  return r;
}

/* ---------- GitHub CLI ---------- */
export function gh(cmdArgs, opts = {}) { return run(CONFIG.gh, cmdArgs, opts); }
export function ghReady() {
  if (!fs.existsSync(CONFIG.gh)) return false;
  return run(CONFIG.gh, ['auth', 'status'], { check: false }).status === 0;
}

/* ---------- names ---------- */
export const idOf = title => title.replace(/[^\w]/g, '');                         // same rule as the site build
export const slugOf = s => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const repoOf = title => title.replace(/[^\w ]/g, '').trim().split(/\s+/).map(w => w[0].toUpperCase() + w.slice(1)).join('_');
export const today = () => new Date().toISOString().slice(0, 10);

/* ---------- templates ---------- */
export function fill(text, vars) {
  return text.replace(/\{\{(\w+)\}\}/g, (_, k) => (vars[k] ?? ''));
}
export function copyTemplate(dir, dest, vars) {
  fs.mkdirSync(dest, { recursive: true });
  for (const f of fs.readdirSync(dir)) {
    const from = path.join(dir, f);
    const to = path.join(dest, fill(f, vars));
    if (fs.statSync(from).isDirectory()) { copyTemplate(from, to, vars); continue; }
    if (fs.existsSync(to)) continue;                                              // never overwrite work
    fs.writeFileSync(to, fill(fs.readFileSync(from, 'utf8'), vars));
  }
}

/* ---------- cards ---------- */
// A card is a note in Site/Cards (a portfolio project) or Site/Lab (a specimen).
export function findCard(title) {
  for (const sub of ['Cards', 'Lab']) {                                            // an exact file name wins
    const file = path.join(VAULT, sub, `${title}.md`);
    if (fs.existsSync(file)) return { file, props: readProps(fs.readFileSync(file, 'utf8')), kind: sub };
  }
  for (const sub of ['Cards', 'Lab']) {
    const dir = path.join(VAULT, sub);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) {
      if (!f.endsWith('.md')) continue;
      const file = path.join(dir, f);
      const props = readProps(fs.readFileSync(file, 'utf8'));
      const name = f.slice(0, -3);
      if (props.title === title || name === title || props.id === title || props.id === idOf(title)) return { file, props, kind: sub };
    }
  }
  return null;
}

export function readProps(text) {
  text = text.replace(/\r\n/g, '\n');
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  const props = {};
  if (!m) return props;
  let key = null;
  for (const line of m[1].split('\n')) {
    const item = line.match(/^\s+-\s*(.*)$/);
    if (item && key) { (props[key] ||= []).push(unq(item[1])); continue; }
    const kv = line.match(/^([\w-]+):\s*(.*)$/);
    if (!kv) continue;
    key = kv[1];
    const v = kv[2].trim();
    if (v === '' || v === '[]') props[key] = [];
    else props[key] = unq(v);
  }
  return props;
}
const unq = s => (/^".*"$/.test(s) ? JSON.parse(s) : /^'.*'$/.test(s) ? s.slice(1, -1) : s);
const yamlStr = s => JSON.stringify(String(s));

/** Set one frontmatter property (string or list of strings), keeping everything else in the note as it is. */
export function setProp(file, key, value) {
  let text = fs.readFileSync(file, 'utf8');
  const crlf = text.includes('\r\n');
  text = text.replace(/\r\n/g, '\n');
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) throw new Error(`${file} has no properties block`);
  const lines = m[1].split('\n');
  const out = [];
  let i = 0, done = false;
  const render = () => Array.isArray(value)
    ? (value.length ? [`${key}:`, ...value.map(v => `  - ${yamlStr(v)}`)] : [`${key}: []`])
    : [`${key}: ${yamlStr(value)}`];
  while (i < lines.length) {
    if (lines[i].match(new RegExp(`^${key}:`))) {
      out.push(...render()); done = true; i++;
      while (i < lines.length && /^\s+-/.test(lines[i])) i++;
      continue;
    }
    out.push(lines[i]); i++;
  }
  if (!done) out.push(...render());
  text = text.replace(m[0], `---\n${out.join('\n')}\n---`);
  fs.writeFileSync(file, crlf ? text.replace(/\n/g, '\r\n') : text);
}

/** "Label | value" list entries: replace the one with the same label, or append. */
export function upsertPair(list, label, value) {
  const rest = (list || []).filter(e => String(e).split('|')[0].trim() !== label);
  return [...rest, `${label} | ${value}`];
}
