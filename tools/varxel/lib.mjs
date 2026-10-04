// Shared helpers for Project VarXel (the catalogue of everything): reading entries.
import fs from 'node:fs';
import path from 'node:path';
import { CONFIG } from '../workshop/lib.mjs';

export const ROOT_VAULT = path.resolve(CONFIG.source, '../..');                // .../Obsidian_MainVault
export const VARXEL = path.join(ROOT_VAULT, 'Projects_Vault/Project VarXel');
export const ENTRIES = path.join(VARXEL, 'Entries');
export const UNION = path.join(ROOT_VAULT, 'The Union');
export const rel = f => path.relative(ROOT_VAULT, f).replace(/\\/g, '/');
export const today = () => new Date().toISOString().slice(0, 10);

/* [[path|Alias]] -> { path, alias } */
export const link = s => { const m = String(s).match(/^\[\[([^\]|]+)(?:\|([^\]]+))?\]\]$/); return m ? { path: m[1], alias: m[2] || path.basename(m[1]) } : { path: s, alias: s }; };

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
    p[key] = v === '' || v === '[]' ? (['from', 'became', 'sources'].includes(key) ? [] : '') : unq(v);
  }
  return { props: p, body: m ? text.slice(m[0].length) : text };
}
const unq = s => (/^".*"$/.test(s) ? JSON.parse(s) : s);

/* every entry, normalised */
export function entries() {
  if (!fs.existsSync(ENTRIES)) return [];
  return fs.readdirSync(ENTRIES).filter(f => f.endsWith('.md')).map(f => {
    const file = path.join(ENTRIES, f);
    const { props: p, body } = parse(file);
    const clean = body.replace(/%%[\s\S]*?%%/g, '').trim();
    const [head, tl = ''] = clean.split(/^## Timeline\s*$/m);
    return {
      file, title: f.slice(0, -3), kind: p.kind || '', status: p.status || '', started: String(p.started || ''), updated: String(p.updated || ''),
      family: p.family || '', from: (p.from || []).map(s => link(s).alias), became: (p.became || []).map(s => link(s).alias),
      sources: (p.sources || []).map(s => link(s).path), repo: p.repo || '', card: p.card ? link(p.card).alias : '',
      public: String(p.public) === 'true',
      quote: head.split('\n').filter(l => l.startsWith('> ')).map(l => l.slice(2)).join(' '),
      desc: head.split(/\n{2,}/).filter(x => x && !x.startsWith('>') && !x.startsWith('From the notes')).join('\n\n'),
      timeline: tl.split('\n').filter(l => l.startsWith('- ')).map(l => l.slice(2).trim()),
    };
  });
}
