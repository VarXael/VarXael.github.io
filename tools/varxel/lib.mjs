// Shared helpers for VarXel (the catalogue of everything): reading and finding entries.
// An entry is a project card (VarXel/Projects/<Title>/<Title>.md, it has a GitHub repository) or a
// Catalogue entry (VarXel/Catalogue/<Title>.md: ideas, mods, stories, work).
import fs from 'node:fs';
import path from 'node:path';
import { CONFIG } from '../workshop/lib.mjs';

export const VARXEL = CONFIG.vault || path.resolve(CONFIG.source, '..');      // .../Obsidian_MainVault/VarXel
export const ROOT_VAULT = VARXEL;                                              // wiki-links are written from here
export const PROJECTS = path.join(VARXEL, 'Projects');
export const CATALOGUE = path.join(VARXEL, 'Catalogue');
export const SITE = path.join(VARXEL, 'Site');                                 // Portfolio.md and the Candidates lists
export const PORTFOLIO_LIST = path.join(SITE, 'Portfolio.md');
export const UNION = VARXEL;                                                   // Giuseppe's notes: Games/, Not games/
export const rel = f => path.relative(VARXEL, f).replace(/\\/g, '/');
export const today = () => new Date().toISOString().slice(0, 10);
export const idOf = title => title.replace(/[^\w]/g, '');                      // same rule as the site build
export const fileName = title => title.replace(/[\\/:*?"<>|#^[\]]/g, '').trim();

/* [[path|Alias]] -> { path, alias } */
export const link = s => { const m = String(s).match(/^\[\[([^\]|]+)(?:\|([^\]]+))?\]\]$/); return m ? { path: m[1], alias: m[2] || path.basename(m[1]) } : { path: s, alias: s }; };
export const cardFile = title => path.join(PROJECTS, fileName(title), `${fileName(title)}.md`);
export const entryFile = title => fs.existsSync(cardFile(title)) ? cardFile(title) : path.join(CATALOGUE, `${fileName(title)}.md`);
export const entryLink = title => `[[${rel(entryFile(title)).replace(/\.md$/, '')}|${title}]]`;

export function parse(file) {
  const text = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const m = text.match(/^---\n([\s\S]*?)\n---\n?/);
  const p = {};
  let key = null;
  for (const line of (m ? m[1] : '').split('\n')) {
    const item = line.match(/^\s+-\s*(.*)$/);
    if (item && key) { (p[key] = Array.isArray(p[key]) ? p[key] : []).push(unq(item[1])); continue; }
    const kv = line.match(/^([\w-]+):\s*(.*)$/);
    if (!kv) continue;
    key = kv[1];
    const v = kv[2].trim();
    p[key] = v === '' || v === '[]' ? (LISTS.includes(key) ? [] : '') : unq(v);
  }
  return { props: p, body: m ? text.slice(m[0].length) : text };
}
const LISTS = ['from', 'became', 'sources', 'builds', 'downloads', 'repos', 'play', 'folders'];
const unq = s => (/^".*"$/.test(s) ? JSON.parse(s) : s);
const pair = s => { const i = String(s).lastIndexOf('|'); return i < 0 ? [String(s).trim(), String(s).trim()] : [s.slice(0, i).trim(), s.slice(i + 1).trim()]; };

/* one entry, normalised */
export function readEntry(file) {
  const { props: p, body } = parse(file);
  const clean = body.replace(/%%[\s\S]*?%%/g, '').trim();
  const sections = clean.split(/^## (.+)$/m);
  const head = sections[0];
  const sec = name => { const i = sections.indexOf(name); return i > 0 ? sections[i + 1].trim() : ''; };
  const title = path.basename(file, '.md');
  return {
    file, title, id: idOf(title), kind: p.kind || '', project: file.startsWith(PROJECTS), started: String(p.started || ''), updated: String(p.updated || ''),
    family: p.family || '', from: (p.from || []).map(s => link(s).alias), became: (p.became || []).map(s => link(s).alias),
    sources: (p.sources || []).map(s => link(s).path), repo: (p.repos || [])[0] || p.repo || '', local: p.local || '', godot_dir: p.godot_dir || '',
    card: p.card ? link(p.card).alias : '', public: String(p.public) === 'true',
    builds: (p.builds || []).map(b => { const [label, slug] = pair(b); return { label, slug }; }),
    downloads: (p.downloads || []).map(d => { const [label, url] = pair(d); return { label, url }; }),
    quote: head.split('\n').filter(l => l.startsWith('> ')).map(l => l.slice(2)).join(' '),
    desc: head.split(/\n{2,}/).filter(x => x && !x.startsWith('>') && !x.startsWith('From the notes')).join('\n\n'),
    timeline: sec('Timeline').split('\n').filter(l => l.startsWith('- ')).map(l => l.slice(2).trim()),
    play: sec('Play'),
  };
}

export function entries() {
  const cards = fs.existsSync(PROJECTS) ? fs.readdirSync(PROJECTS).map(d => path.join(PROJECTS, d, `${d}.md`)).filter(f => fs.existsSync(f)) : [];
  const cat = fs.existsSync(CATALOGUE) ? fs.readdirSync(CATALOGUE).filter(f => f.endsWith('.md')).map(f => path.join(CATALOGUE, f)) : [];
  return [...cards, ...cat].map(readEntry);
}

export function findEntry(title) {
  const exact = entryFile(title);
  if (fs.existsSync(exact)) return readEntry(exact);
  return entries().find(e => e.title.toLowerCase() === title.toLowerCase() || e.id === idOf(title)) || null;
}

/* the portfolio = the cards linked in VarXel/Site/Portfolio.md, in order */
export function portfolioList() {
  const listed = new Map();
  if (fs.existsSync(PORTFOLIO_LIST))
    for (const m of fs.readFileSync(PORTFOLIO_LIST, 'utf8').matchAll(/^- \[\[([^\]|]+)(?:\|[^\]]*)?\]\]/gm)) listed.set(path.basename(m[1]), listed.size);
  return listed;
}

/* a build is online when its entry is public, or when the project is in the portfolio (which is public) */
export const isOnline = e => e.public || (!!e.card && portfolioList().has(e.card));
