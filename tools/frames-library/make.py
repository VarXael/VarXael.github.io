# Builds assets/js/frames-library.js from assets/js/frames.js: the same Frames, its content from VarXec's public side.
import re
# Run from anywhere: python tools/frames-library/make.py (the repo is two folders up).
import os
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
s = open(os.path.join(ROOT, 'assets', 'js', 'frames.js'), encoding='utf8').read()

def rep(a, b):
    global s
    assert s.count(a) == 1, a[:80]
    s = s.replace(a, b)

HEAD = r"""/* Portfolio Frames, Library version (Wiki 02, 2026-10-28): frames.js with its content from VarXec's public side, the vault's
   Site/public.json. His words: "library is a private version ... Then there is a switch of some kind that has the content from
   library picked up and published, with a polished page". frames.js stays as it is.
   - On portfolio.varxel.dev (the preview, behind his OS login) the data is read live from /api/library, so a Preview in VarXec
     shows here at once. On the public site it comes from assets/js/library-data.js (tools/build-library.mjs, Go live).
   - Every build opens with his note and its date, then the build, then one credits line (his ask: "the note + the date of it as
     a base then whats being built with AI").
   Everything else (windows, rects, phases, keys) is frames.js unchanged: keep the two in step when frames.js changes. */
"""

MERGE = r"""
/* ---------- VarXec's public side into the shape frames.js reads (window.PORTFOLIO.projects) ---------- */
function libraryMerge(PF, LIB) {
  const escL = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const inl = s => escL(s).replace(/!\[\[[^\]]*\]\]/g, '').replace(/\[\[(?:[^\]|]*\|)?([^\]]*)\]\]/g, '$1').replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(video:([^)]+)\)/g, '$1').replace(/\[([^\]]+)\]\((https?:[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/(^|[^*\w])\*([^*\n]+)\*/g, '$1<i>$2</i>');
  const md = t => String(t || '').replace(/\r\n/g, '\n').split(/\n{2,}/).map(b => b.trim()).filter(Boolean).map(b => {
    const h = /^#{3,4}[ \t]+(.+)$/.exec(b.split('\n')[0]);
    if (h) return `<h3 class="sub">${inl(h[1])}</h3>${b.includes('\n') ? md(b.slice(b.indexOf('\n') + 1)) : ''}`;
    if (/^> /.test(b)) return `<blockquote>${inl(b.replace(/^> ?/gm, '').replace(/\n/g, ' '))}</blockquote>`;
    if (/^[-*] /.test(b)) return `<ul>${b.split('\n').map(l => `<li>${inl(l.replace(/^[-*] /, ''))}</li>`).join('')}</ul>`;
    if (/^\d+\. /.test(b)) return `<ol>${b.split('\n').map(l => `<li>${inl(l.replace(/^\d+\. /, ''))}</li>`).join('')}</ol>`;
    if (/^\|/.test(b)) return '';
    return `<p>${inl(b.replace(/\n/g, ' '))}</p>`;
  }).join('');
  const plain = t => String(t || '').split(/\n{2,}/)[0].replace(/\[\[(?:[^\]|]*\|)?([^\]]*)\]\]/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_`#>]/g, '').trim();
  const CAT = { professional: 'professional work', personal: 'personal work', university: 'university work', jam: 'game jams' };
  const pair = s => { const i = String(s).lastIndexOf('|'); return i < 0 ? [String(s).trim(), String(s).trim()] : [s.slice(0, i).trim(), s.slice(i + 1).trim()]; };
  const projects = {};
  for (const lp of LIB.projects) {
    const old = PF.projects[lp.id] || {};
    const shots = lp.shots.map(x => LIB.src(x)).filter(Boolean);
    const builds = lp.builds.map(b => Object.assign({}, b, { shot: b.shot ? LIB.src(b.shot) : '', play: LIB.play(b) }));
    const disciplines = lp.disciplines.length ? lp.disciplines : (old.roles || []);
    const rc = {}; for (const d of disciplines) if (lp.sections[d]) rc[d] = md(lp.sections[d]);
    projects[lp.id] = Object.assign({}, old, {
      id: lp.id, title: lp.title, category: CAT[lp.category] || old.category || 'personal work', year: lp.year || old.year || '', role: lp.role || old.role || '',
      context: lp.context || old.context || '', engine: lp.engine || old.engine || '', tier: lp.tier || old.tier || 'listed',
      // the cover: his first starred picture, else a build's, else the card's image (an SVG card image only when nothing else)
      image: shots[0] || builds.find(b => b.shot)?.shot || (lp.image ? `./assets/images/${lp.image}` : '') || old.image || '',
      roles: disciplines, roleContributions: Object.keys(rc).length ? rc : (old.roleContributions || {}),
      short: plain(lp.intro) || old.short || '', story: lp.sections['The story'] ? md(lp.sections['The story']) : (old.story || ''),
      video: lp.video || old.video || null,
      videos: lp.videos.length ? lp.videos.map(v => { const [label, f] = pair(v); return { label, file: `./assets/videos/${f}` }; }) : (old.videos || []),
      links: lp.links.length ? lp.links.map(l => { const [label, url] = pair(l); return { label, url }; }) : (old.links || []),
      lib: { stage: lp.stage, builds, shots, credits: lp.credits },
    });
  }
  return Object.assign({}, PF, { projects });
}
"""

LOADER = r"""
/* Where the data comes from: the preview reads the vault live; the public site reads the file Go live wrote. */
(function () {
  const preview = /(^|\.)portfolio\.varxel\.dev$/.test(location.hostname) || /[?&]preview\b/.test(location.search);
  if (!preview && window.LIBRARY_RAW) {
    const R = window.LIBRARY_RAW;
    framesStart({ projects: R.projects, src: x => R.files[x.path] || '', play: b => R.play[`${b.repo}@${b.key}`] || '' });
    return;
  }
  fetch('/api/library', { cache: 'no-store' }).then(r => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
    .then(pub => framesStart({ projects: pub.projects, src: x => `/vault?path=${encodeURIComponent(x.path)}`, play: b => b.play || '' }))
    .catch(() => framesStart({ projects: Object.values(window.PORTFOLIO.projects).map(p => ({ id: p.id, title: p.title, category: '', disciplines: [], sections: {}, shots: [], builds: [], intro: '', videos: [], links: [] })), src: () => '', play: () => '' }));
})();
"""

rep("(function () {\n  const W = window.PORTFOLIO, PR = W.profile, DOCS = window.DOCS || { versions: {} };",
    "function framesStart(LIB) {\n  const W = libraryMerge(window.PORTFOLIO, LIB), PR = W.profile, DOCS = window.DOCS || { versions: {} };")
assert s.rstrip().endswith('})();')
s = s.rstrip()[:-len('})();')] + '}\n'
# the project carries its Library part
rep("eng: p.engine, ctx: p.context, tier: p.tier, story: p.story, videos: p.videos || [], versions };",
    "eng: p.engine, ctx: p.context, tier: p.tier, story: p.story, videos: p.videos || [], versions, lib: p.lib || null };")
# status: his stage first
rep("const status = w => { const m = w.ctx.match(",
    "const status = w => { if (w.lib && /^working on$/i.test(w.lib.stage || '')) return 'In development'; const m = w.ctx.match(")
# the document: the Library part (how it got here, the builds with his notes and the credits); the old Versions and Play when there is none
rep("const V2 = w.versions, latest = [...V2].reverse().find(v => v.builds.length), play = latest && latest.builds[0];",
    "const V2 = w.lib && w.lib.builds.length ? [] : w.versions, latest = [...V2].reverse().find(v => v.builds.length), play = latest && latest.builds[0];")
rep("if (w.lib && /^working on$/i.test", "if (w.lib && /^working on$/i.test")  # sanity
rep("        ${blocks.join('')}\n",
    "        ${libDoc(w)}\n        ${blocks.join('')}\n")
rep("const props = [['Role', w.role || '—'], ['Category', CATN[w.cat]], ['Year', w.y ? String(w.y) : '—'], ['Engine', w.eng], ['Context', w.ctx]];",
    "const props = [['Role', w.role || '—'], ['Category', CATN[w.cat]], ['Year', w.y ? String(w.y) : '—'], ['Engine', w.eng], ['Context', w.ctx]].concat(w.lib && /^working on$/i.test(w.lib.stage || '') ? [['Status', 'In development']] : []);")

LIBDOC = r"""
  /* ---------- the Library part of a project document ---------- */
  function libDoc(w) {
    const L = w.lib; if (!L || !L.builds.length) return '';
    const credit = L.credits || `Design: ${PR.name} · Built with Claude Code`;
    const steps = [];
    for (const b of L.builds) { if (b.note && b.note.date) steps.push({ k: 'n', d: b.note.date, t: b.note.from === 'In my words' ? 'note' : b.note.from }); steps.push({ k: 'b', d: b.date, t: b.title }); }
    steps.sort((a, b) => String(a.d).localeCompare(String(b.d)) || (a.k === 'n' ? -1 : 1));
    const line = `<div class="lbline">${steps.map((x, i) => `${i ? '<hr>' : ''}<div class="st ${x.k}"><i></i><span>${esc(x.t)}</span><em>${esc(String(x.d).slice(5) || x.d)}</em></div>`).join('')}</div>`;
    const builds = L.builds.map(b => `<div class="lbb"><span class="th">${b.shot ? `<img class="pic" src="${esc(b.shot)}" alt="" loading="lazy">` : `<span class="cnt">${esc(b.key)}</span>`}</span><div class="bd">
      ${b.note && b.note.quote ? `<div class="nt"><span class="w">${esc([b.note.from === 'In my words' ? 'In my words' : `From my notes · ${b.note.from}`, b.note.date].filter(Boolean).join(' · '))}</span><q>${esc(b.note.quote)}</q></div>` : ''}
      <div class="tt"><span>${esc(b.title)}</span>${b.play ? `<a class="btn" href="${esc(b.play)}" target="_blank" rel="noopener" style="background:var(--ink);color:var(--bg);">Play ↗</a>` : ''}<span class="cnt" style="margin-left:auto;">${esc(b.date)}</span></div>
      <span class="cr">${esc(credit)}</span></div></div>`).join('');
    return `<div style="display:flex;flex-direction:column;gap:8px;"><span class="lbl">How it got here</span>${line}<span class="cnt">◆ notes · ● builds</span></div>
      <div style="display:flex;flex-direction:column;gap:10px;"><h2 style="margin:10px 0 0;font-weight:400;font-size:20px;">Builds</h2>${builds}</div>`;
  }
"""
rep("  /* ---------- pieces ---------- */", LIBDOC + "\n  /* ---------- pieces ---------- */")


# ---------- 2026-10-28, after the audit (Projects/Project Library/Portfolio audit 2026-10-28.md) and his split (Private / Lab / Work) ----------
# The Lab is the public projects he put in Lab; Work is the ones he put in Work; no project in both.
rep("const lpOrder = WK.filter(w => w.cat === 'personal' && w.tier === 'hero').map(w => w.k);",
    "const lpOrder = WK.filter(w => (w.lib && w.lib.place ? w.lib.place === 'lab' : w.cat === 'personal' && w.tier === 'hero')).map(w => w.k);")
# tools and play notes travel with the project
rep("eng: p.engine, ctx: p.context, tier: p.tier, story: p.story, videos: p.videos || [], versions, lib: p.lib || null };",
    "eng: p.engine, ctx: p.context, tier: p.tier, story: p.story, videos: p.videos || [], versions, lib: p.lib || null, tools: (p.tools || []).map(t => t.name || t), pn: p.playNotes || '' };")
# records: Experience and Education apart, with the place
rep("const REC = (W.experience || []).flatMap(g => g.items.map(i => [i.when.replace(/ to /g, ' › '), `${i.title} // ${i.org}`, text(i.desc)]));",
    "const REC = (W.experience || []).flatMap(g => g.items.map(i => [i.when.replace(/ to /g, ' › '), `${i.title} // ${i.org}`, text(i.desc)]));\n  const RECG = (W.experience || []).map(g => ({ g: g.group, items: g.items.map(i => [i.when.replace(/ to /g, ' › '), `${i.title} // ${i.org}`, text(i.desc), i.where || '']) }));")
rep("arecs() { return `<div style=\"padding:12px 16px 24px;display:flex;flex-direction:column;\"><span style=\"padding-bottom:8px;\"><span class=\"lbl\">Records</span></span>\n      ${REC.map(r => `",
    "arecs() { return `<div style=\"padding:12px 16px 24px;display:flex;flex-direction:column;\">${RECG.map(G => `<span style=\"padding:${G === RECG[0] ? 0 : 18}px 0 8px;\"><span class=\"lbl\">${esc(G.g)}</span></span>\n      ${G.items.map(r => `")
rep("<span style=\"font-size:15px;line-height:1.25;\">${esc(r[1])}</span>",
    "<span style=\"font-size:15px;line-height:1.25;\">${esc(r[1])}</span>${r[3] ? `<span class=\"cnt\">${esc(r[3])}</span>` : ''}")
# the role view shows what he did in full
rep("-webkit-line-clamp:${role !== null ? 5 : 3};", "-webkit-line-clamp:${role !== null ? 'none' : 3};")
# every project gets the full page, in Work and in the Lab
rep("    doc() { const projK = WM[S.proj] ? S.proj : WK[0].k,", "    doc(kk) { const cur = kk || S.proj, PA = PAGES[S.pi].k === 'lab' ? 'lproj' : 'proj', projK = WM[cur] ? cur : WK[0].k,")
rep("    ldoc() { const k = LP[S.lproj] ?", "    ldoc() { return R.doc(LP[S.lproj] ? S.lproj : lpOrder[S.lsel] || lpOrder[0]); },\n    ldocOld() { const k = LP[S.lproj] ?")
rep("return bar(path, A('proj', pk2), A('proj', nk), A('min', projK)) +", "return bar(path, A(PA, pk2), A(PA, nk), A('min', projK)) +")
rep("<span class=\"hv-acc\" ${A('proj', pk2)} style=\"cursor:pointer;\">← ${esc(WM[pk2].t)}</span><span class=\"hv-acc\" ${A('proj', nk)} style=\"cursor:pointer;text-align:right;\">${esc(WM[nk].t)} →</span>",
    "<span class=\"hv-acc\" ${A(PA, pk2)} style=\"cursor:pointer;\">← ${esc(WM[pk2].t)}</span><span class=\"hv-acc\" ${A(PA, nk)} style=\"cursor:pointer;text-align:right;\">${esc(WM[nk].t)} →</span>")
# the video stage replaces the stacked videos; the story is a tab; the role boxes are numbered; tools as chips; play notes shown
rep("      if (w.videos.length) blocks.push(", "      if (false) blocks.push(")
rep("      if (w.story) { const kk = projK + 'story', op = S.open[kk];", "      if (false) { const kk = projK + 'story', op = S.open[kk];")
rep("        <p style=\"margin:0;font-size:17px;line-height:1.6;text-wrap:pretty;\">${esc(w.short)}</p>",
    "        ${w.tools.length ? `<div class=\"tchips\">${w.tools.map(t => `<span>${esc(t)}</span>`).join('')}</div>` : ''}\n        ${w.story ? `<div class=\"dtabs\"><span class=\"${S.open[projK + 'st'] ? '' : 'on'}\" ${A('dtab', projK + '|')}>Overview</span><span class=\"${S.open[projK + 'st'] ? 'on' : ''}\" ${A('dtab', projK + '|st')}>The story</span></div>` : ''}\n        ${S.open[projK + 'st'] && w.story ? `<div class=\"prose\" style=\"font-size:16px;line-height:1.7;\">${w.story}</div></article>` : `\n        <p style=\"margin:0;font-size:17px;line-height:1.6;text-wrap:pretty;\">${esc(w.short)}</p>")
rep("        ${yt(w.yt)}\n        ${gal(w)}", "        ${vstage(w)}\n        ${yt(w.yt)}\n        ${gal(w)}")
rep("${Object.keys(w.rc).length ? `<div style=\"display:flex;flex-direction:column;padding-top:6px;\"><span class=\"lbl\">By role</span>${w.roles.filter(r => w.rc[r]).map(r => `<div style=\"display:grid;grid-template-columns:170px minmax(0,1fr);gap:14px;padding:10px 0;border-bottom:1px solid var(--rule);\"><span class=\"jost\" style=\"display:flex;gap:8px;align-items:baseline;font-size:11px;letter-spacing:.12em;text-transform:uppercase;padding-top:3px;\"><span style=\"width:7px;height:7px;background:${CL[r]};flex:0 0 auto;\"></span>${esc(RF[r])}</span><div class=\"prose\" style=\"font-size:15px;line-height:1.6;\">${w.rc[r]}</div></div>`).join('')}</div>` : ''}",
    "${Object.keys(w.rc).length ? `<div class=\"rboxes\">${w.roles.filter(r => w.rc[r]).map((r, i) => `<div class=\"rbox\" style=\"--c:${CL[r]};\"><div class=\"rh\"><span class=\"n\">${pad2(i + 1)}</span><span class=\"sq\"></span><span>${esc(RF[r])}</span></div><div class=\"prose\" style=\"font-size:15px;line-height:1.6;\">${w.rc[r]}</div></div>`).join('')}</div>` : ''}")
rep("        ${libDoc(w)}\n        ${blocks.join('')}\n",
    "        ${libDoc(w)}\n        ${w.pn ? `<div style=\"display:flex;flex-direction:column;gap:8px;\"><h2 style=\"margin:10px 0 0;font-weight:400;font-size:20px;\">How to play</h2><div class=\"prose pn\" style=\"font-size:15px;line-height:1.6;\">${w.pn}</div></div>` : ''}\n        ${blocks.join('')}\n")
rep("<span class=\"hv-acc\" ${A(PA, nk)} style=\"cursor:pointer;text-align:right;\">${esc(WM[nk].t)} →</span></div></article>`; },",
    "<span class=\"hv-acc\" ${A(PA, nk)} style=\"cursor:pointer;text-align:right;\">${esc(WM[nk].t)} →</span></div></article>`}`; },")
rep("    min: a => minAt(a),", "    dtab: a => { const [k, t] = a.split('|'); set({ open: Object.assign({}, S.open, { [k + 'st']: t === 'st' }) }); },\n    min: a => minAt(a),")
rep("  /* ---------- the Library part of a project document ---------- */",
    r"""  /* ---------- the video stage (as on the live site): one player, the project's videos as a list; links in the text switch it ---------- */
  const vstage = w => w.videos.length ? `<div class="vstage"><video src="${src(w.videos[0].file)}" controls muted playsinline preload="none" style="width:100%;aspect-ratio:16/9;object-fit:cover;display:block;background:#000;"></video>${w.videos.length > 1 ? `<div class="vlist">${w.videos.map((v, j) => `<span class="vit${j ? '' : ' on'}" data-v="${src(v.file)}">${esc(v.label)}</span>`).join('')}</div>` : `<div class="vlist"><span class="vit on" data-v="${src(w.videos[0].file)}">${esc(w.videos[0].label)}</span></div>`}</div>` : '';
  pf.addEventListener('click', e => {
    const m = e.target.closest('.magic-link, .vit'); if (!m) return;
    const art = m.closest('.body') || document; const st = art.querySelector('.vstage'); if (!st) return;
    const want = m.dataset.v || encodeURI(String(m.dataset.src || '').replace(/^\.\//, './'));
    const v = st.querySelector('video'); const name = decodeURIComponent(want.split('/').pop());
    v.src = want; v.play().catch(() => {});
    st.querySelectorAll('.vit').forEach(x => x.classList.toggle('on', decodeURIComponent(String(x.dataset.v).split('/').pop()) === name));
    if (m.classList.contains('magic-link')) st.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  /* ---------- the Library part of a project document ---------- */""")
# the library text keeps its video links, tables and play notes
def repm(a, b):
    global MERGE
    assert MERGE.count(a) == 1, a[:80]
    MERGE = MERGE.replace(a, b)
repm(".replace(/\\[([^\\]]+)\\]\\(video:([^)]+)\\)/g, '$1')", ".replace(/\\[([^\\]]+)\\]\\(video:([^)]+)\\)/g, (_, t, f) => `<span class='magic-link' data-src='./assets/videos/${f.trim()}'>${t}</span>`)")
repm("    if (/^\\|/.test(b)) return '';\n    return `<p>${inl(b.replace(/\\n/g, ' '))}</p>`;\n  }).join('');\n  const plain",
    "    if (/^\\|/.test(b)) { const rows = b.split('\\n').filter(l => !/^\\s*\\|[\\s:|-]+\\|\\s*$/.test(l)).map(l => l.trim().replace(/^\\||\\|$/g, '').split('|').map(c => inl(c.trim()))); const [h, ...body] = rows; return `<div class=\"md-table\"><table><thead><tr>${h.map(c => `<th>${c}</th>`).join('')}</tr></thead><tbody>${body.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`; }\n    return `<p>${inl(b.replace(/\\n/g, ' '))}</p>`;\n  }).join('');\n  const plain")
repm("      lib: { stage: lp.stage, builds, shots, credits: lp.credits },",
    "      tools: lp.tools && lp.tools.length ? lp.tools.map(name => ({ name })) : (old.tools || []),\n      playNotes: lp.sections.Play ? md(lp.sections.Play) : (old.playNotes || ''),\n      lib: { stage: lp.stage, place: lp.place || '', builds, shots, credits: lp.credits },")

rep("${esc(r[2])}</span></div></div>`).join('')}</div>`; },", "${esc(r[2])}</span></div></div>`).join('')}`).join('')}</div>`; },")
# the two Sasha videos are 40 and 68 MB: nothing is fetched until Play
rep('controls muted playsinline preload="metadata"', 'controls muted playsinline preload="none"')
out = HEAD + s
out = out + MERGE + LOADER
open(os.path.join(ROOT, 'assets', 'js', 'frames-library.js'), 'w', encoding='utf8').write(out)
print('written', len(out))
