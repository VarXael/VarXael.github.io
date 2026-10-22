/* Portfolio Frames: port of "Portfolio Frames v22.dc.html" (Claude Design, React) to plain JS.
   Same windows, rect maps, transition phases and timings; the content comes from the vault
   through window.PORTFOLIO (content.js) and window.DOCS (docs.js).
   Changes from v22 (2026-10-22, his feedback): the four role pages are gone, roles are a filter inside Work
   (as on the old portfolio); the Lab is a card of its own in Work and on Home; pictures fill their frames.
   Pages in a line: Home (0) · Work (1) · Lab (2) · About (3). Windows: A B N W Lb Ls Ab Ar X. */
(function () {
  const W = window.PORTFOLIO, PR = W.profile, DOCS = window.DOCS || { versions: {} };
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const src = u => encodeURI(String(u || '').replace(/^\.\//, './'));
  const pad2 = x => String(x).padStart(2, '0');
  const slug = t => String(t).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const text = h => String(h || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const paras = h => (String(h || '').match(/<p>[\s\S]*?<\/p>/g) || (h ? [`<p>${h}</p>`] : []));
  const ytId = u => (String(u || '').match(/(?:v=|youtu\.be\/)([\w-]{11})/) || [])[1] || '';

  /* ---------- data, from the vault ---------- */
  const CL = ['oklch(0.55 0.1 220)', 'oklch(0.6 0.13 70)', 'oklch(0.5 0.12 305)', 'oklch(0.55 0.1 165)'];
  const ORDER = ['Game Designer', 'Technical Game Designer', 'Leadership', 'Game Programmer'];
  const RF = ORDER.filter(r => W.disciplines[r]).concat(Object.keys(W.disciplines).filter(r => !ORDER.includes(r))).slice(0, 4);
  const RNM = { 'Game Designer': 'Design', 'Technical Game Designer': 'Tech Design', 'Leadership': 'Leadership', 'Game Programmer': 'Programming' };
  const RN = RF.map(r => RNM[r] || r);
  const DD = RF.map(r => W.disciplines[r].description);
  const CATS = [['all', 'All work'], ['prof', 'Professional'], ['uni', 'University'], ['jam', 'Game jams'], ['personal', 'Personal']];
  const CATK = { 'professional work': 'prof', 'university work': 'uni', 'game jams': 'jam', 'personal work': 'personal' };
  const CATN = {}; CATS.forEach(([k, n]) => { CATN[k] = n; });
  const TIER = { hero: 0, supporting: 1, listed: 2 };
  const WK = Object.values(W.projects).sort((a, b) => TIER[a.tier] - TIER[b.tier] || b.year - a.year).map(p => {
    const rc = {}; Object.entries(p.roleContributions || {}).forEach(([r, h]) => { const i = RF.indexOf(r); if (i >= 0) rc[i] = h; });
    const versions = DOCS.versions[p.id] || [];
    const gallery = [...versions].reverse().flatMap(v => v.images.map(im => ({ src: './' + im.src, cap: `${v.id} · ${v.name} · ${im.caption}` })));
    const svg = /\.svg$/i.test(p.image || '');
    return { k: p.id, t: p.title, cat: CATK[p.category] || 'personal', y: p.year, role: p.role, roles: p.roles.map(r => RF.indexOf(r)).filter(i => i >= 0),
      img: svg && gallery.length ? gallery[0].src : p.image, cover: p.image, gallery, yt: ytId(p.video),
      short: p.short, rc, links: p.links.filter(l => l.url && !/^\.\/play\//.test(l.url)).map(l => [l.label, l.url === 'request' ? `mailto:${PR.email}?subject=${encodeURIComponent('Portfolio request')}` : l.url]),
      eng: p.engine, ctx: p.context, tier: p.tier, story: p.story, videos: p.videos || [], versions };
  });
  const WM = {}; WK.forEach(w => { WM[w.k] = w; });
  const ENG = {}; WK.forEach(w => { ENG[w.k] = w.eng.split(' / ')[0]; });
  const status = w => { const m = w.ctx.match(/in development|in progress|prototype|plugin/i); return m ? m[0][0].toUpperCase() + m[0].slice(1).toLowerCase() : w.ctx.split('·').pop().trim(); };
  const lpOrder = WK.filter(w => w.cat === 'personal' && w.tier === 'hero').map(w => w.k);        /* the Lab: the personal projects in progress */
  const isLab = k => lpOrder.includes(k);
  const LP = {}; lpOrder.forEach(k => { const w = WM[k]; LP[k] = Object.assign({ st: status(w),
    facts: [['Role', w.role], ['Engine', w.eng], ['Started', String(w.y)], ['Disciplines', w.roles.map(r => RN[r]).join(' · ')]],
    iters: w.videos.map((v, j) => ({ log: `LOG_${j + 1}`, v: (v.file.match(/(\d+\.\d+)/) || ['', ''])[1], name: v.label, video: src(v.file) })),
    systems: Object.entries(w.rc).flatMap(([r, h]) => paras(h).map(p => { const m = p.match(/<b>([^<]*?):?<\/b>\s*([\s\S]*)<\/p>/); return { name: m ? m[1] : RF[r], text: m ? text(m[2]) : text(p), seen: RF[r] }; })),
    notes: paras(w.story).map(p => ({ text: text(p) })) }, w); });
  const SM2 = (Array.isArray(W.catalogue) ? W.catalogue : Object.values(W.catalogue || {})).map(c => [c.family || 'Mechanic', c.name]);
  const REC = (W.experience || []).flatMap(g => g.items.map(i => [i.when.replace(/ to /g, ' › '), `${i.title} // ${i.org}`, text(i.desc)]));
  const SEL = WK.filter(w => !isLab(w.k)).slice(0, 3).map(w => w.k);
  const PAGES = [{ k: 'home', name: 'Home' }, { k: 'work', name: 'Work' }, { k: 'lab', name: 'Lab' }, { k: 'about', name: 'About' }];
  const HOME = 0, WORK = 1, LAB = 2, ABOUT = 3;
  const roleProj = r => WK.filter(w => w.roles.includes(r));
  const catProj = ck => WK.filter(w => !isLab(w.k) && (ck === 'all' || w.cat === ck));
  const V = PR.cv.replace(/^\.\//, './');
  const labShots = lpOrder.map(k => ({ k, t: LP[k].t.replace('Project ', ''), st: LP[k].st, img: LP[k].img }));

  /* ---------- state ---------- */
  const S = { pi: HOME, mode: 'list', proj: null, lproj: null, wcat: 'all', wrole: null, wview: 'gallery', lsel: 0, open: {}, phase: 'boot', drawn: false, rc: {}, origin: null, dir: 1, copied: false, W: 1180, H: 700, speed: 1 };
  const $ = id => document.getElementById(id);
  const pf = $('pf'), box = $('box');
  const IDS = ['A', 'B', 'N', 'W', 'Lb', 'Ls', 'Ab', 'Ar', 'X'];
  const els = {}; IDS.forEach(id => { const s = document.createElement('section'); s.className = 'fw'; s.dataset.id = id;
    s.innerHTML = '<div class="bg"></div><span class="e e1"></span><span class="e e2"></span><span class="e e3"></span><span class="e e4"></span><span class="c c1"></span><span class="c c2"></span><span class="c c3"></span><span class="c c4"></span><div class="body"></div>';
    box.appendChild(s); els[id] = s; });
  const T = {}; const timer = (n, fn, ms) => { clearTimeout(T[n]); T[n] = setTimeout(fn, ms); };
  const sp = () => S.speed;
  const lk = s => PAGES[s.pi].k + ':' + s.mode;
  const ctxList = s => { const pg = PAGES[s.pi]; if (pg.k === 'lab') return lpOrder.slice(); if (s.wrole !== null) return roleProj(s.wrole).map(w => w.k);
    const list = CATS.slice(1).reduce((a, [ck]) => a.concat(catProj(ck).map(w => w.k)), []); return list.includes(s.proj) ? list : list.concat([s.proj]).filter(Boolean); };
  let prevCks = null, cks = [];

  function set(p) { Object.assign(S, p); update(); }
  function nav(next) {
    const cur = Object.assign({}, S), nx = Object.assign({}, cur, next), dir = nx.pi !== cur.pi ? (nx.pi > cur.pi ? 1 : -1) : (nx.mode === 'proj' ? 1 : -1);
    if (lk(cur) === lk(nx)) { set(Object.assign({ dir }, next)); return; }
    ['t1', 't2', 't3'].forEach(n => clearTimeout(T[n])); const K = sp();
    set({ phase: 'out', rc: {}, dir });
    timer('t1', () => { if (next.origin) { set(Object.assign({ phase: 'grow', open: {} }, next)); timer('t3', () => set({ phase: 'move' }), 40); } else set(Object.assign({ phase: 'move', open: {} }, next)); }, Math.round(120 * K));
    timer('t2', () => set({ phase: 'in' }), Math.round((160 + 480) * K));
  }
  const page = j => () => nav({ pi: j, mode: 'list', origin: null });
  const openAt = (extra, el) => { let o = null; if (el && el.getBoundingClientRect) { const r = el.getBoundingClientRect(), q = box.getBoundingClientRect(); o = [r.left - q.left, r.top - q.top, r.width, r.height]; } nav(Object.assign({ mode: 'proj', origin: o }, extra)); };
  const minAt = key => { let o2 = null; const el = box.querySelector(`[data-card="${key}"]`); if (el) { const r = el.getBoundingClientRect(), q = box.getBoundingClientRect(); if (r.width > 0) o2 = [r.left - q.left, r.top - q.top, r.width, r.height]; } nav({ mode: 'list', origin: o2 }); };
  const copyEmail = () => { navigator.clipboard?.writeText(PR.email).catch(() => {}); set({ copied: true }); timer('t7', () => set({ copied: false }), 1600); };

  /* ---------- image viewer ---------- */
  let LB = { list: [], k: 0 };
  const drawLB = () => { const im = LB.list[LB.k]; $('lbImg').src = im.src; $('lbCap').textContent = im.cap || ''; $('lbCount').textContent = `${LB.k + 1} / ${LB.list.length}`; };
  const openLB = (list, k) => { if (!list.length) return; LB = { list, k }; $('lb').hidden = false; drawLB(); };
  const stepLB = d => { LB.k = (LB.k + d + LB.list.length) % LB.list.length; drawLB(); };
  $('lbClose').onclick = () => { $('lb').hidden = true; }; $('lbPrev').onclick = () => stepLB(-1); $('lbNext').onclick = () => stepLB(1);
  $('lb').onclick = e => { if (e.target === $('lb') || e.target.tagName === 'FIGURE') $('lb').hidden = true; };
  const mediaOf = w => (w.gallery.length ? w.gallery : []).concat(w.cover && !/\.svg$/i.test(w.cover) ? [{ src: src(w.cover), cap: w.t }] : []);

  /* ---------- actions by data attributes ---------- */
  const ACT = {
    page: a => page(+a)(), home: () => page(HOME)(), work: () => nav({ pi: WORK, mode: 'list', origin: null, wcat: 'all', wrole: null }), lab: () => page(LAB)(), about: () => page(ABOUT)(),
    list: () => nav({ mode: 'list' }), wcat: a => nav({ pi: WORK, mode: 'list', wcat: a, wrole: null }), wview: a => nav({ wview: a }),
    wrole: a => { const r = +a, on = S.pi === WORK && S.mode === 'list' && S.wrole === r; nav({ pi: WORK, mode: 'list', origin: null, wcat: 'all', wrole: on ? null : r }); },
    noroles: () => nav({ wrole: null }),
    proj: a => nav({ proj: a }), lproj: a => nav({ lproj: a }), open: (a, el) => openAt({ proj: a }, el), openw: (a, el) => openAt({ pi: WORK, proj: a }, el),
    openl: (a, el) => { const j = lpOrder.indexOf(a); openAt({ pi: LAB, lproj: a, lsel: j }, el); }, lsel: a => { if (S.lsel !== +a) set({ lsel: +a }); },
    min: a => minAt(a), copy: () => copyEmail(), toggle: a => set({ open: Object.assign({}, S.open, { [a]: !S.open[a] }) }),
    sw: () => (PAGES[S.pi].k === 'lab' ? page(HOME) : page(LAB))(),
    yt: (a, el) => { el.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${esc(a)}?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen title="Video"></iframe>`; el.removeAttribute('data-a'); },
    lb: a => { const [k, i] = a.split('@'); openLB(mediaOf(WM[k]), +i || 0); },
  };
  pf.addEventListener('click', e => { const t = e.target.closest('[data-a]'); if (!t || !pf.contains(t)) return; const [n, ...rest] = t.dataset.a.split(':'); if (ACT[n]) { e.stopPropagation(); ACT[n](rest.join(':'), t); } });
  pf.addEventListener('mouseover', e => { const t = e.target.closest('[data-hover-lsel]'); if (t) ACT.lsel(t.dataset.hoverLsel); });
  const A = (n, a) => `data-a="${n}${a !== undefined ? ':' + esc(a) : ''}"`;

  /* ---------- pieces ---------- */
  const pic = (o, style = '') => `<img class="pic" src="${o.img ? src(o.img) : ''}" alt="" loading="lazy"${style ? ` style="${style}"` : ''}>`;
  const sqs = roles => roles.map(r => `<span title="${esc(RF[r])}" style="width:6px;height:6px;background:${CL[r]};display:inline-block;"></span>`).join('');
  const meta = w => [CATN[w.cat], w.y].filter(Boolean).join(' · ');
  const dk = () => PAGES[S.pi].k === 'lab';
  const sw = (small) => { const d = dk(); return `<div class="sw" ${A('sw')} style="padding:${small ? '9px 12px' : '12px 14px'};"><div class="tx"><span class="l">${d ? 'Portfolio' : 'The Lab'}</span><span class="m" style="display:${small ? 'none' : 'block'};">${d ? 'Back to the work' : `${lpOrder.length} projects · ${SM2.length} smaller things`}</span></div><span class="k"><i></i></span></div>`; };
  const roleOn = r => PAGES[S.pi].k === 'work' && S.mode === 'list' && S.wrole === r;
  const roles4 = () => RN.map((nm, r) => { const on = roleOn(r);
    return `<div class="rolerow ${on ? 'on' : ''}" ${A('wrole', r)}><div class="r"><span class="sq" style="background:${CL[r]};"></span><span class="nm">${esc(RF[r])}</span><span class="cnt" style="${on ? 'color:inherit;opacity:.7' : ''}">${pad2(roleProj(r).length)}</span></div></div>`; }).join('');
  const navItem = (label, on, act, op = {}) => `<div class="navi ${on ? 'on' : ''}" ${act} style="padding-left:${op.ind || '8px'};"><span class="ic ${op.acc ? 'acc' : ''}" ${op.mcol ? `style="color:${op.mcol}"` : ''}>${op.icon || ''}</span><span class="lb ${op.serif ? 'serif' : ''} ${op.bold ? 'b' : ''}">${esc(label)}</span><span class="mt">${op.meta || ''}</span></div>`;
  const bar = (path, prevA, nextA, minA) => `<div style="position:sticky;top:0;z-index:3;display:flex;align-items:center;gap:8px;padding:7px 10px 7px 14px;background:var(--panel);border-bottom:1px solid var(--rule);font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.05em;text-transform:uppercase;">
    <span style="flex:1;min-width:0;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${esc(path)}</span><span class="arr" ${prevA}>←</span><span class="arr" ${nextA}>→</span><span class="minb" ${minA}>▭ All cards</span></div>`;
  const yt = id => id ? `<div class="yt" ${A('yt', id)}><img class="pic" src="https://i.ytimg.com/vi/${esc(id)}/hqdefault.jpg" alt="" loading="lazy"><span class="play">▶ Play</span></div>` : '';
  const gal = w => { const m = mediaOf(w); return m.length > 1 ? `<div class="gal">${m.map((im, j) => `<span ${A('lb', w.k + '@' + j)}><img class="pic" src="${im.src}" alt="" loading="lazy"></span>`).join('')}</div>` : ''; };
  const labCard = () => `<div class="labcard" ${A('lab')}><div class="edge"><div class="in">
      <div class="tx"><span class="jost" style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#c23a2b;">The Lab</span>
        <span class="jost" style="font-size:22px;font-weight:300;letter-spacing:.28em;text-transform:uppercase;line-height:1.1;">Other projects</span>
        <span class="mono" style="font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:#8a837b;">${pad2(lpOrder.length)} projects · ${SM2.length} smaller things</span>
        <span class="go">Enter_lab →</span></div>
      <div class="shots">${labShots.map(s => `<div class="shot">${pic(s)}<span>${esc(s.t)}<small>${esc(s.st)}</small></span></div>`).join('')}</div></div></div><span class="br br1"></span><span class="br br2"></span></div>`;

  /* ---------- window contents ---------- */
  const R = {
    intro() { const ihc = S.H < 600; return `<div style="height:100%;padding:${ihc ? '14px 18px 14px' : '24px 24px 18px'};display:flex;flex-direction:column;gap:${ihc ? '10px' : '16px'};overflow:hidden;">
      <div style="display:flex;gap:16px;align-items:flex-start;"><div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:10px;">
        <span class="mono" style="font-size:10px;letter-spacing:.06em;text-transform:uppercase;color:var(--accent);">⌂ Portfolio · Home</span>
        <h1 style="margin:0;font-weight:300;font-size:${ihc ? '34px' : 'clamp(42px,4.4vw,62px)'};line-height:.92;letter-spacing:-.035em;">${esc(PR.name).replace(' ', '<br>')}</h1>
        <span class="jost" style="font-size:13px;color:var(--soft);">${esc(PR.title)} · Untold Games</span></div>
        <div style="width:96px;height:118px;flex:0 0 auto;background:var(--plate);overflow:hidden;position:relative;"><img class="pic" src="${src(PR.portrait)}" alt="" style="filter:grayscale(1);"></div></div>
      <p style="display:${ihc ? 'none' : 'block'};margin:0;font-size:15px;line-height:1.5;max-width:400px;color:var(--soft);text-wrap:pretty;">${PR.headline}</p>
      <div style="flex:0 0 auto;display:flex;flex-wrap:wrap;gap:8px;"><span class="btn" ${A('copy')}>${S.copied ? 'Copied' : 'Copy email'}</span><a class="btn" href="${V}" target="_blank" rel="noopener">CV ↗</a><a class="btn" href="${esc(PR.github)}" target="_blank" rel="noopener">GitHub ↗</a></div>
      <div style="display:flex;flex-direction:column;"><div style="display:flex;justify-content:space-between;align-items:baseline;padding:4px 6px 6px;"><span class="lbl">By role</span><span class="cnt">04</span></div>${roles4()}</div>
      <div style="margin-top:auto;display:flex;flex-direction:column;">${sw(false)}</div></div>`; },

    idhead() { const d = dk(), shortRail = S.H < 600;
      return `<div style="height:100%;display:flex;flex-direction:column;overflow:hidden;font-family:'Inter',sans-serif;">
      <div class="hv-bg" ${d ? A('list') : A('home')} style="cursor:pointer;flex:0 0 auto;padding:${shortRail ? '8px 12px 6px' : '12px 14px 10px'};display:flex;gap:10px;align-items:center;transition:background .15s;">
        <span class="mono" style="width:34px;height:34px;flex:0 0 auto;display:flex;align-items:center;justify-content:center;border:1px solid var(--ink);font-size:11px;letter-spacing:.04em;">${esc(PR.name.split(' ').map(x => x[0]).join(''))}</span>
        <div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:4px;"><div class="mono" style="display:flex;justify-content:space-between;font-size:9px;letter-spacing:.06em;text-transform:uppercase;color:var(--accent);"><span>${d ? 'The Lab · index' : '← Home'}</span><span style="color:var(--muted);">⌂</span></div>
        <span class="display" style="font-size:19px;font-weight:300;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${esc(PR.name)}</span></div></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--rule);border-top:1px solid var(--rule);border-bottom:1px solid var(--rule);margin:0 0 8px;">
        ${RN.map((nm, r) => { const on = roleOn(r); return `<div class="mono ${on ? '' : 'hv-bg'}" ${A('wrole', r)} title="${esc(RF[r])}" style="cursor:pointer;display:flex;align-items:center;gap:7px;padding:7px 10px;background:${on ? 'var(--ink)' : 'var(--panel)'};color:${on ? 'var(--bg)' : 'var(--ink)'};font-size:9px;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap;transition:background .15s,color .15s;"><span style="width:6px;height:6px;background:${CL[r]};flex:0 0 auto;"></span><span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;">${esc(nm)}</span></div>`; }).join('')}</div>
      <div style="margin-top:auto;flex:0 0 auto;padding:0 8px 8px;">${sw(true)}</div></div>`; },

    navl() { const pk = PAGES[S.pi].k, md = S.mode, shortRail = S.H < 600, projK = WM[S.proj] ? S.proj : WK[0].k, lprojK = LP[S.lproj] ? S.lproj : lpOrder[S.lsel] || lpOrder[0];
      let G = [];
      if (pk === 'work') { G = [{ name: 'Work', items: [] }];
        CATS.forEach(([ck, cn]) => { const list = catProj(ck);
          G[0].items.push(navItem(cn, md !== 'proj' && S.wrole === null && S.wcat === ck, A('wcat', ck), { meta: pad2(list.length), icon: ck === 'all' ? '▦' : '▾', bold: 1 }));
          if (ck !== 'all') list.forEach(x => G[0].items.push(navItem(x.t, md === 'proj' && x.k === projK, md === 'proj' ? A('proj', x.k) : A('open', x.k), { serif: 1, ind: '24px', icon: '·', acc: md !== 'proj' && S.wrole === null && S.wcat === ck }))); });
        G[0].items.push(navItem('The Lab', false, A('lab'), { icon: '→', bold: 1, meta: pad2(lpOrder.length) }));
        G.push({ name: 'By role', items: RF.map((nm, r) => navItem(nm, md !== 'proj' && S.wrole === r, A('wrole', r), { icon: '■', mcol: CL[r], meta: pad2(roleProj(r).length) })) });
        G.push({ name: '', items: [navItem('About', false, A('about'), { icon: '→' })] }); }
      else if (pk === 'about') G = [{ name: 'Pages', items: [navItem('Work', false, A('work'), { icon: '←', meta: pad2(WK.length) }), navItem('About', true, '', { icon: '·' })] },
        { name: 'Contact', items: [navItem(S.copied ? 'Copied' : 'Copy email', false, A('copy'), { icon: '⧉', serif: 1 }), `<a class="navi" href="${V}" target="_blank" rel="noopener"><span class="ic">↗</span><span class="lb serif">CV</span><span class="mt"></span></a>`, `<a class="navi" href="${esc(PR.github)}" target="_blank" rel="noopener"><span class="ic">↗</span><span class="lb serif">GitHub</span><span class="mt"></span></a>`] }];
      else if (pk === 'lab') G = [{ name: 'Projects', items: lpOrder.map((k, j) => navItem(LP[k].t.replace('Project ', ''), md === 'proj' ? k === lprojK : j === S.lsel, md === 'proj' ? A('lproj', k) : A('openl', k), { serif: 1, icon: LP[k].st === 'In development' ? '●' : '○', mcol: LP[k].st === 'In development' ? '#c23a2b' : undefined })) },
        { name: '', items: [navItem('Work', false, A('work'), { icon: '←', meta: pad2(WK.length) })] }];
      return `<div style="height:100%;display:flex;flex-direction:column;font-family:'Inter',sans-serif;"><div style="flex:1;min-height:0;overflow-y:auto;overflow-x:hidden;scrollbar-width:thin;scrollbar-color:var(--line) transparent;padding:${shortRail ? '4px 8px' : '8px 8px'};display:flex;flex-direction:column;gap:${shortRail ? '2px' : '10px'};">
        ${G.map(gr => `<div style="display:flex;flex-direction:column;gap:1px;">${gr.name && !shortRail ? `<span style="padding:2px 8px 5px;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);">${esc(gr.name)}</span>` : ''}${gr.items.join('')}</div>`).join('')}</div></div>`; },

    wprev() { const hx = WM[SEL[0]], more = SEL.slice(1, 3).map(k => WM[k]);
      return `<div style="height:100%;padding:12px 14px 14px;display:flex;flex-direction:column;gap:10px;">
      <div ${A('work')} style="cursor:pointer;display:flex;justify-content:space-between;align-items:baseline;"><span class="lbl">Selected work</span><span class="mono hv-ink" style="font-size:10px;letter-spacing:.04em;text-transform:uppercase;color:var(--muted);">All work · ${pad2(WK.length)} →</span></div>
      <div class="tile" ${A('openw', hx.k)} style="flex:1.5 1 0;min-height:0;">${pic(hx)}<div style="position:absolute;left:12px;bottom:12px;max-width:calc(100% - 24px);background:var(--panel);padding:12px 16px;display:flex;flex-direction:column;gap:5px;">
        <span class="jost" style="font-size:clamp(18px,2vw,26px);font-weight:400;letter-spacing:.06em;text-transform:uppercase;line-height:1;">${esc(hx.t)}</span><span class="mono" style="font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);">${esc(CATN[hx.cat])} // ${esc(ENG[hx.k])} · ${hx.y}</span>
        <p style="margin:0;font-size:14px;line-height:1.5;color:var(--soft);max-width:460px;">${esc(hx.short)}</p></div></div>
      <div style="flex:1 1 0;min-height:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;">${more.map(k => `<div class="tile" ${A('openw', k.k)}>${pic(k)}<div style="position:absolute;left:8px;bottom:8px;max-width:calc(100% - 16px);background:var(--panel);padding:5px 9px;display:flex;flex-direction:column;gap:2px;"><span class="jost" style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${esc(k.t)}</span><span class="mono" style="font-size:9px;letter-spacing:.08em;text-transform:uppercase;color:var(--accent);">${esc(ENG[k.k])} · ${k.y}</span></div></div>`).join('')}
        <div class="tile labtile" ${A('lab')}><div class="shots3">${labShots.map(s => `<span>${pic(s)}</span>`).join('')}</div><div style="position:absolute;left:8px;bottom:8px;max-width:calc(100% - 16px);background:#0d0c0c;padding:5px 9px;display:flex;flex-direction:column;gap:2px;"><span class="jost" style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;">The Lab →</span><span class="mono" style="font-size:9px;letter-spacing:.08em;text-transform:uppercase;color:#c23a2b;">${pad2(lpOrder.length)} projects · ${SM2.length} smaller</span></div></div></div></div>`; },

    wdb() { const role = S.wrole, list = (role !== null ? roleProj(role) : catProj(S.wcat)).slice().sort((a, b) => (b.y || 0) - (a.y || 0));
      const showLab = role === null && (S.wcat === 'all' || S.wcat === 'personal');
      const title = role !== null ? `<span class="rolef"><span style="width:9px;height:9px;background:${CL[role]};"></span><span class="display" style="font-size:24px;font-weight:300;">${esc(RF[role])}</span><span class="x" ${A('noroles')}>× All work</span></span>` : `<span class="display" style="font-size:24px;font-weight:300;">${esc(CATN[S.wcat])}</span>`;
      const desc = w => role !== null && w.rc[role] ? text(w.rc[role]) : w.short;
      return `<div style="padding:12px 18px 30px;display:flex;flex-direction:column;gap:14px;">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;padding-bottom:10px;border-bottom:1px solid var(--rule);"><div style="display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;">${title}<span class="cnt">${pad2(list.length)} projects</span></div>
        <div class="jost" style="display:flex;gap:4px;font-size:12px;">${[['gallery', 'Gallery', '▦'], ['table', 'Table', '☰']].map(([k, n, ic]) => `<span class="hv-bg" ${A('wview', k)} style="cursor:pointer;display:flex;gap:6px;align-items:center;padding:4px 9px;border-radius:3px;background:${S.wview === k ? 'var(--hover)' : 'transparent'};font-weight:${S.wview === k ? 500 : 400};"><span class="mono" style="font-size:11px;color:var(--muted);">${ic}</span>${n}</span>`).join('')}</div></div>
      ${role !== null ? `<p style="margin:0;font-size:15px;line-height:1.55;color:var(--soft);max-width:640px;">${esc(DD[role])}</p>` : ''}
      <div style="display:${S.wview === 'gallery' ? 'grid' : 'none'};grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:18px;padding:4px;">${showLab ? labCard() : ''}${list.map(w => `<div class="card" data-card="${w.k}" ${A('open', w.k)}><div class="edge"><div class="in"><div class="im">${pic(w)}</div>
        <div style="flex:1;padding:14px 16px 16px;display:flex;flex-direction:column;gap:9px;"><span class="jost" style="font-size:17px;font-weight:400;letter-spacing:.06em;text-transform:uppercase;line-height:1.05;">${esc(w.t)}</span>
        <div class="mono" style="display:flex;align-items:center;gap:8px;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);"><span style="white-space:nowrap;">${esc(CATN[w.cat].replace(' work', ''))} // ${esc(ENG[w.k] || 'System')}</span><span style="flex:1;height:1px;background:var(--rule);"></span></div>
        <p style="margin:0;flex:1;font-size:13px;line-height:1.55;color:var(--soft);display:-webkit-box;-webkit-line-clamp:${role !== null ? 5 : 3};-webkit-box-orient:vertical;overflow:hidden;">${esc(desc(w))}</p><div style="display:flex;align-items:center;gap:8px;"><span class="ex">Examine_record</span><span class="sqs">${sqs(w.roles)}</span></div></div></div></div><span class="br br1"></span><span class="br br2"></span></div>`).join('')}</div>
      <div style="display:${S.wview === 'table' ? 'flex' : 'none'};flex-direction:column;"><div class="jost" style="display:grid;grid-template-columns:minmax(0,2fr) minmax(0,1.5fr) minmax(0,1fr) 44px;gap:12px;padding:6px;border-bottom:1px solid var(--rule);font-size:11px;color:var(--muted);"><span>Name</span><span>Role</span><span>Category</span><span>Year</span></div>
        ${list.map(w => `<div class="trow" ${A('open', w.k)}><span style="display:flex;align-items:center;gap:10px;min-width:0;"><span style="position:relative;width:34px;height:22px;flex:0 0 auto;background:var(--plate);overflow:hidden;">${pic(w)}</span><span style="font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${esc(w.t)}</span></span><span class="jost" style="font-size:13px;color:var(--soft);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${esc(w.role || '—')}</span><span class="jost" style="font-size:13px;color:var(--soft);">${esc(CATN[w.cat])}</span><span class="mono" style="font-size:10px;">${w.y || '—'}</span></div>`).join('')}
        ${showLab ? `<div class="trow" ${A('lab')}><span style="display:flex;align-items:center;gap:10px;"><span style="width:34px;height:22px;background:#121110;"></span><span style="font-size:15px;">The Lab →</span></span><span class="jost" style="font-size:13px;color:var(--soft);">${pad2(lpOrder.length)} projects · ${SM2.length} smaller things</span><span></span><span></span></div>` : ''}</div></div>`; },

    doc() { const projK = WM[S.proj] ? S.proj : WK[0].k, w = WM[projK], CL2 = ctxList(S), ci = Math.max(0, CL2.indexOf(projK)), nk = CL2[(ci + 1) % CL2.length], pk2 = CL2[(ci - 1 + CL2.length) % CL2.length];
      const props = [['Role', w.role || '—'], ['Category', CATN[w.cat]], ['Year', w.y ? String(w.y) : '—'], ['Engine', w.eng], ['Context', w.ctx]];
      const V2 = w.versions, latest = [...V2].reverse().find(v => v.builds.length), play = latest && latest.builds[0];
      const blocks = [];
      if (V2.length) blocks.push(`<div style="display:flex;flex-direction:column;gap:8px;"><h2 style="margin:10px 0 0;font-weight:400;font-size:20px;">Versions</h2>${[...V2].reverse().map(v => `<div class="vrow"><span class="th">${v.images[0] ? `<img class="pic" src="./${v.images[0].src}" alt="" loading="lazy">` : ''}</span><span style="flex:1;min-width:0;display:flex;flex-direction:column;gap:3px;"><span style="font-size:15px;">${esc(v.id)} · ${esc(v.name)}</span><span class="cnt">${v.images.length} images${v.summary ? ' · ' + esc(v.summary) : ''}</span></span>${v.builds.map(b => `<a class="btn" href="${b.play.startsWith('http') ? b.play : './' + b.play}" target="_blank" rel="noopener" style="padding:7px 10px;">Play ↗</a>`).join('')}</div>`).join('')}</div>`);
      if (w.videos.length) blocks.push(`<div style="display:flex;flex-direction:column;gap:8px;"><h2 style="margin:10px 0 0;font-weight:400;font-size:20px;">Videos</h2>${w.videos.map(v => `<div style="border:1px solid var(--rule);"><video src="${src(v.file)}" controls muted playsinline preload="metadata" style="width:100%;aspect-ratio:16/9;object-fit:cover;display:block;background:#000;"></video><div class="mono" style="padding:8px 10px;font-size:10px;text-transform:uppercase;">${esc(v.label)}</div></div>`).join('')}</div>`);
      if (w.story) { const kk = projK + 'story', op = S.open[kk]; blocks.push(`<div style="display:flex;flex-direction:column;"><span class="tog" ${A('toggle', kk)}><span style="font-size:11px;padding-top:4px;color:var(--muted);">${op ? '▾' : '▸'}</span>The story</span><div class="prose" style="display:${op ? 'block' : 'none'};padding:4px 4px 8px 26px;font-size:15px;line-height:1.65;">${w.story}</div></div>`); }
      const path = (S.wrole !== null && PAGES[S.pi].k === 'work' ? 'work/' + slug(RF[S.wrole]) : 'work/' + w.cat) + '/' + slug(w.t);
      return bar(path, A('proj', pk2), A('proj', nk), A('min', projK)) +
      `<div class="${mediaOf(w).length ? 'zoom' : ''}" ${mediaOf(w).length ? A('lb', projK + '@0') : ''} style="position:relative;aspect-ratio:21/8;max-height:280px;width:100%;background:var(--plate);overflow:hidden;">${pic(w)}<div class="scan-in"></div></div>
      <article style="max-width:760px;margin:0 auto;padding:22px clamp(18px,3vw,36px) 56px;display:flex;flex-direction:column;gap:14px;">
        <h1 style="margin:0;font-weight:300;font-size:clamp(30px,3vw,42px);line-height:1;letter-spacing:-.02em;">${esc(w.t)}</h1>
        <div class="mono" style="display:flex;flex-wrap:wrap;gap:6px;font-size:10px;letter-spacing:.03em;text-transform:uppercase;">${props.map(([k, v]) => `<span class="prop"><b>${esc(k)}</b> ${esc(v)}</span>`).join('')}</div>
        <div style="display:flex;flex-wrap:wrap;gap:5px;">${w.roles.map(r => `<span class="chip" ${A('wrole', r)}><span style="width:6px;height:6px;background:${CL[r]};"></span>${esc(RF[r])} ←</span>`).join('')}</div>
        <p style="margin:0;font-size:17px;line-height:1.6;text-wrap:pretty;">${esc(w.short)}</p>
        ${play || w.links.length ? `<div class="mono" style="display:flex;flex-wrap:wrap;gap:6px;font-size:10px;letter-spacing:.04em;text-transform:uppercase;">${play ? `<a class="btn" href="${play.play.startsWith('http') ? play.play : './' + play.play}" target="_blank" rel="noopener" style="background:var(--ink);color:var(--bg);">Play ${esc(latest.id)} ↗</a>` : ''}${w.links.map(([l, u]) => `<a class="btn" href="${esc(u)}" target="_blank" rel="noopener">${esc(l)} ↗</a>`).join('')}</div>` : ''}
        ${yt(w.yt)}
        ${gal(w)}
        ${Object.keys(w.rc).length ? `<div style="display:flex;flex-direction:column;padding-top:6px;"><span class="lbl">By role</span>${w.roles.filter(r => w.rc[r]).map(r => `<div style="display:grid;grid-template-columns:170px minmax(0,1fr);gap:14px;padding:10px 0;border-bottom:1px solid var(--rule);"><span class="jost" style="display:flex;gap:8px;align-items:baseline;font-size:11px;letter-spacing:.12em;text-transform:uppercase;padding-top:3px;"><span style="width:7px;height:7px;background:${CL[r]};flex:0 0 auto;"></span>${esc(RF[r])}</span><div class="prose" style="font-size:15px;line-height:1.6;">${w.rc[r]}</div></div>`).join('')}</div>` : ''}
        ${blocks.join('')}
        <div class="jost" style="display:flex;justify-content:space-between;gap:12px;margin-top:12px;padding-top:12px;border-top:1px solid var(--rule);font-size:13px;"><span class="hv-acc" ${A('proj', pk2)} style="cursor:pointer;">← ${esc(WM[pk2].t)}</span><span class="hv-acc" ${A('proj', nk)} style="cursor:pointer;text-align:right;">${esc(WM[nk].t)} →</span></div></article>`; },

    lband() { return `<div style="height:100%;padding:14px 16px;display:flex;gap:28px;font-family:'Inter',sans-serif;">
      <div style="flex:0 0 300px;display:flex;flex-direction:column;gap:2px;"><div style="display:flex;justify-content:space-between;align-items:baseline;padding:0 8px 8px;"><span class="lbl">The Lab</span><span class="cnt">${pad2(lpOrder.length)}</span></div>
        ${lpOrder.map((k, j) => `<div class="labi ${j === S.lsel ? 'on' : ''}" data-hover-lsel="${j}" ${A('openl', k)}><span class="sq"></span><span style="flex:1;font-size:12px;letter-spacing:.12em;text-transform:uppercase;">${esc(LP[k].t.replace('Project ', ''))}</span><span class="mono" style="font-size:9px;opacity:.7;">${esc(LP[k].st)}</span></div>`).join('')}</div>
      <div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:6px;overflow-y:auto;scrollbar-width:thin;scrollbar-color:var(--line) transparent;"><span style="font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);">Smaller things · ${SM2.length}</span>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:0 18px;">${SM2.map(s => `<div style="display:flex;flex-direction:column;gap:2px;padding:6px 0;border-top:1px solid var(--rule);"><span style="font-size:9px;letter-spacing:.28em;text-transform:uppercase;color:#c23a2b;">${esc(s[0])}</span><span class="serif" style="font-size:14px;">${esc(s[1])}</span></div>`).join('')}</div></div></div>`; },

    lprev() { const k = lpOrder[S.lsel] || lpOrder[0], lo = LP[k], sc = lo.st === 'In development' ? '#c23a2b' : '#8a837b', g = lo.gallery.slice(1, 4);
      return `<div ${A('openl', k)} data-card="${k}" style="cursor:pointer;position:relative;height:100%;background:#141211;overflow:hidden;">${pic(lo)}<div class="scan-in"></div>
      <span class="mono" style="position:absolute;top:14px;left:16px;font-size:10px;letter-spacing:.06em;text-transform:uppercase;background:var(--bg);padding:3px 7px;">${pad2(S.lsel + 1)} / ${pad2(lpOrder.length)}</span>
      ${g.length ? `<div style="position:absolute;top:14px;right:16px;display:flex;gap:6px;">${g.map(im => `<span style="position:relative;width:110px;aspect-ratio:16/10;overflow:hidden;border:1px solid #4a4340;"><img class="pic" src="${im.src}" alt=""></span>`).join('')}</div>` : ''}
      <div style="position:absolute;left:16px;right:16px;bottom:16px;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:14px;"><div style="background:var(--bg);padding:12px 16px;display:flex;flex-direction:column;gap:6px;max-width:520px;"><span class="jost" style="font-size:clamp(22px,2.4vw,34px);font-weight:300;letter-spacing:.4em;text-transform:uppercase;line-height:1.1;">${esc(lo.t.replace('Project ', ''))}</span><span class="jost" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:${sc};">${esc(lo.st)}</span><span style="font-size:14px;line-height:1.5;color:var(--soft);">${esc(lo.short)}</span></div>
        <span class="jost" style="background:var(--ink);color:var(--bg);padding:10px 14px;font-size:11px;letter-spacing:.12em;text-transform:uppercase;">Open →</span></div></div>`; },

    ldoc() { const k = LP[S.lproj] ? S.lproj : lpOrder[S.lsel] || lpOrder[0], oo = LP[k], i = lpOrder.indexOf(k), nk = lpOrder[(i + 1) % lpOrder.length], pk2 = lpOrder[(i - 1 + lpOrder.length) % lpOrder.length], sc = oo.st === 'In development' ? '#c23a2b' : '#8a837b';
      const V2 = oo.versions;
      return bar('lab/' + slug(oo.t), A('lproj', pk2), A('lproj', nk), A('min', k)) +
      `<div style="position:relative;height:44%;min-height:240px;background:#141211;overflow:hidden;border-bottom:1px solid #3a3533;">${pic(oo, 'opacity:.45;')}
        <div style="position:absolute;left:26px;right:26px;bottom:22px;display:flex;flex-direction:column;gap:10px;max-width:640px;"><span class="jost" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:${sc};">${esc(oo.st)}</span><span class="jost" style="font-size:clamp(26px,3.2vw,46px);font-weight:300;letter-spacing:.5em;text-transform:uppercase;line-height:1.1;">${esc(oo.t.replace('Project ', ''))}</span><span style="font-size:16px;line-height:1.5;color:#a8a29a;">${esc(oo.short)}</span></div></div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));border-bottom:1px solid #3a3533;">${oo.facts.map(([a, b]) => `<div class="mono" style="padding:12px 18px;border-right:1px solid #2a2625;display:flex;flex-direction:column;gap:4px;font-size:10px;letter-spacing:.05em;text-transform:uppercase;"><span style="color:#8a837b;">${esc(a)}</span><span>${esc(b)}</span></div>`).join('')}</div>
      <div style="padding:22px 26px 48px;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:26px;">
        <div style="display:flex;flex-direction:column;gap:14px;">
          ${V2.length ? `<span class="jost" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#c23a2b;">Versions</span>${[...V2].reverse().map(v => `<div style="border:1px solid #3a3533;display:flex;flex-direction:column;"><div style="aspect-ratio:16/9;background:#141211;overflow:hidden;position:relative;">${v.images[0] ? `<img class="pic" src="./${v.images[0].src}" alt="" loading="lazy">` : ''}</div>
            <div class="mono" style="padding:8px 10px;display:flex;justify-content:space-between;align-items:center;gap:8px;font-size:10px;text-transform:uppercase;"><span>${esc(v.id)} · ${esc(v.name)}</span><span style="display:flex;gap:6px;align-items:center;"><span style="color:#8a837b;">${v.images.length} images</span>${v.builds.map(b => `<a href="${b.play.startsWith('http') ? b.play : './' + b.play}" target="_blank" rel="noopener" style="border:1px solid #d9d4cc;padding:4px 8px;">Play ↗</a>`).join('')}</span></div></div>`).join('')}` : ''}
          ${oo.iters.length ? `<span class="jost" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#c23a2b;">Iterations</span>${oo.iters.map(it => `<div style="border:1px solid #3a3533;display:flex;flex-direction:column;"><div style="aspect-ratio:16/9;background:#141211;overflow:hidden;"><video src="${it.video}" muted loop playsinline controls preload="metadata" style="width:100%;height:100%;object-fit:cover;display:block;"></video></div><div class="mono" style="padding:8px 10px;display:flex;justify-content:space-between;font-size:10px;text-transform:uppercase;"><span>${esc(it.log)} · ${esc(it.name)}</span><span style="color:#8a837b;">${it.v ? 'v' + esc(it.v) : ''}</span></div></div>`).join('')}` : ''}
          ${oo.yt ? `<span class="jost" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#c23a2b;">Video</span>${yt(oo.yt)}` : ''}
          ${oo.systems.length ? `<span class="jost" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#c23a2b;">Systems</span>${oo.systems.map(s => `<div style="padding:14px;border:1px solid #2a2625;display:flex;flex-direction:column;gap:6px;"><span style="font-size:19px;">${esc(s.name)}</span><span style="font-size:15px;line-height:1.55;color:#bdb6ac;">${esc(s.text)}</span><span class="mono" style="font-size:9px;letter-spacing:.06em;text-transform:uppercase;color:#8a837b;">${esc(s.seen)}</span></div>`).join('')}` : ''}</div>
        <div style="display:flex;flex-direction:column;gap:10px;">
          ${mediaOf(oo).length > 1 ? `<span class="jost" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#c23a2b;">Pictures</span>${gal(oo)}` : ''}
          <span class="jost" style="font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#c23a2b;">Notes</span>${oo.notes.map(n => `<div style="display:flex;flex-direction:column;gap:4px;padding:10px 0;border-top:1px solid #2a2625;"><span style="font-size:15px;line-height:1.55;">${esc(n.text)}</span></div>`).join('')}
          ${oo.links.length ? `<div class="mono" style="display:flex;flex-wrap:wrap;gap:6px;font-size:10px;letter-spacing:.04em;text-transform:uppercase;padding-top:10px;">${oo.links.map(([l, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener" style="border:1px solid #d9d4cc;padding:7px 10px;">${esc(l)} ↗</a>`).join('')}</div>` : ''}</div></div>`; },

    aprof() { return `<div style="padding:24px clamp(18px,2.6vw,32px) 40px;display:flex;flex-direction:column;gap:18px;">
      <div style="display:flex;gap:18px;align-items:flex-end;"><div style="width:120px;height:148px;flex:0 0 auto;position:relative;overflow:hidden;background:var(--plate);"><img class="pic" src="${src(PR.portrait)}" alt="" style="filter:grayscale(1);"></div>
        <div style="display:flex;flex-direction:column;gap:10px;"><span class="jost" style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);">About</span><span class="display" style="font-size:clamp(30px,3.4vw,44px);font-weight:300;line-height:1;letter-spacing:-.02em;">${esc(PR.name)}</span><span class="jost" style="font-size:13px;color:var(--soft);">${esc(PR.title)}</span></div></div>
      <p style="margin:0;font-size:20px;line-height:1.4;font-weight:300;text-wrap:pretty;">${esc(PR.quote)}</p>
      <p style="margin:0;font-size:16px;line-height:1.7;text-wrap:pretty;max-width:680px;">${PR.bio}</p>
      <div style="display:flex;flex-wrap:wrap;gap:8px;"><span class="btn" ${A('copy')}>${S.copied ? 'Copied' : 'Copy email'}</span><a class="btn" href="${V}" target="_blank" rel="noopener">CV ↗</a><a class="btn" href="${esc(PR.github)}" target="_blank" rel="noopener">GitHub ↗</a></div>
      <div class="mono" style="display:grid;grid-template-columns:auto minmax(0,1fr);gap:8px 16px;font-size:10px;letter-spacing:.04em;text-transform:uppercase;padding:12px 0;border-top:1px solid var(--rule);border-bottom:1px solid var(--rule);"><span style="color:var(--muted);">Languages</span><span>[ C++ ] [ C# ] [ Verse ] [ Blueprints ]</span><span style="color:var(--muted);">Engines</span><span>[ Unreal Engine ] [ Unity ] [ UEFN ] [ Godot ]</span><span style="color:var(--muted);">Tools</span><span>[ Git ] [ Plastic SCM ] [ Rider ]</span></div>
      <div style="display:flex;flex-direction:column;gap:8px;"><span class="lbl">By role</span><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px;">${RF.map((nm, r) => `<div class="hv-bg" ${A('wrole', r)} style="cursor:pointer;display:flex;flex-direction:column;gap:6px;padding:12px;border:1px solid var(--rule);"><span style="display:flex;align-items:center;gap:8px;"><span style="width:7px;height:7px;background:${CL[r]};"></span><span class="jost" style="flex:1;font-size:11px;letter-spacing:.14em;text-transform:uppercase;">${esc(nm)}</span><span class="cnt">${pad2(roleProj(r).length)}</span></span><span style="font-size:14px;line-height:1.5;color:var(--soft);">${esc(DD[r])}</span></div>`).join('')}</div></div>
      <div style="display:flex;flex-direction:column;gap:8px;"><span class="mono" style="font-size:10px;letter-spacing:.04em;text-transform:uppercase;color:var(--muted);">Experience with</span><div style="display:flex;flex-wrap:wrap;gap:8px;">${[['https://untoldgames.com/', 'untold_games_cover.png', 'Untold Games'], ['https://www.udemy.com/user/creativity-unleashed/', 'CreativityUnleashed.png', 'Creativity Unleashed'], ['https://www.umu.se/en/', 'Umeå_University.png', 'Umeå University'], ['https://cineon.training/', 'Cineon_Training.png', 'Cineon Training']].map(([u, f, n]) => `<a href="${u}" target="_blank" rel="noopener" style="height:38px;padding:6px 9px;border:1px solid var(--rule);display:flex;align-items:center;"><img src="${src('./assets/images/' + f)}" alt="${n}" style="height:100%;"></a>`).join('')}</div></div></div>`; },

    arecs() { return `<div style="padding:12px 16px 24px;display:flex;flex-direction:column;"><span style="padding-bottom:8px;"><span class="lbl">Records</span></span>
      ${REC.map(r => `<div style="display:grid;grid-template-columns:110px minmax(0,1fr);gap:12px;padding:10px 0;border-top:1px solid var(--rule);"><span class="cnt" style="padding-top:3px;">${esc(r[0])}</span><div style="display:flex;flex-direction:column;gap:3px;"><span style="font-size:15px;line-height:1.25;">${esc(r[1])}</span><span style="font-size:13px;line-height:1.55;color:var(--soft);">${esc(r[2])}</span></div></div>`).join('')}</div>`; },
  };

  /* ---------- rects (renderVals) ---------- */
  function rects() {
    const st = S, pg = PAGES[st.pi], pk = pg.k, md = st.mode, T0 = Math.max(700, st.W), H = Math.max(440, st.H), g = 12, cl = (a, b, x) => Math.max(a, Math.min(x, b)), d = pk === 'lab';
    const projK = WM[st.proj] ? st.proj : WK[0].k, lselK = lpOrder[st.lsel] || lpOrder[0], lprojK = LP[st.lproj] ? st.lproj : lselK;
    const rw = Math.round(cl(220, T0 * .2, 260)), side = pk === 'home' ? 'H' : 'R';
    const cx = rw + g, cw = T0 - rw - g, cur = { work: 0, lab: 1, about: 2 }[pk], RR = {};
    if (side === 'H') { const lw = Math.round(cl(340, T0 * .36, 460)), x2 = lw + g, w2 = T0 - x2;
      RR.B = [0, 0, lw, H, 'intro', 'h']; RR.A = [0, 0, lw, H, 'none', '']; RR.W = [x2, 0, w2, H, 'wprev', 'h']; RR.N = [0, H, lw, 0, 'none', '']; RR.Lb = [x2, H, w2, 0, 'none', ''];
      RR.Ls = [x2, H, w2, 0, 'none', '']; RR.Ab = [T0, 0, 0, H, 'none', '']; RR.Ar = [T0, 0, 0, H, 'none', '']; }
    else {
      const ihH = H < 600 ? 158 : 168; RR.B = [0, 0, rw, ihH, 'idhead', 'R']; RR.N = [0, ihH + g, rw, H - ihH - g, 'navl', 'n']; RR.A = [0, 0, rw, ihH, 'none', ''];
      const lo = [cx, 0, 0, H], hi = [T0, 0, 0, H];
      const put = (id, order, rect, kind, key) => { RR[id] = order === cur ? rect.concat([kind, key]) : (order < cur ? lo : hi).concat(['none', '']); };
      put('W', 0, [cx, 0, cw, H], 'wdb', st.wcat + '.' + st.wrole + '.' + st.wview);
      const bh2 = Math.round(cl(220, H * .38, 300)); put('Lb', 1, [cx, 0, cw, H - bh2 - g], 'lprev', lselK); put('Ls', 1, [cx, H - bh2, cw, bh2], 'lband', 'l');
      const aw = Math.round(cw * .6); put('Ab', 2, [cx, 0, aw, H], 'aprof', 'a'); put('Ar', 2, [cx + aw + g, 0, cw - aw - g, H], 'arecs', 'a');
    }
    const o = st.origin, area = side === 'H' ? [T0 / 2, H / 2, 0, 0] : [cx, 0, cw, H];
    if (md === 'proj' && side !== 'H') RR.X = area.concat([d ? 'ldoc' : 'doc', d ? lprojK : projK]);
    else RR.X = (o ? [o[0], o[1], o[2], o[3]] : [area[0] + area[2] / 2, H / 2, 0, 0]).concat(['none', '']);
    if (st.phase === 'grow' && o && md === 'proj') RR.X = [o[0], o[1], o[2], o[3], RR.X[4], RR.X[5]];
    return IDS.map(id => RR[id]);
  }

  /* ---------- apply state to the DOM ---------- */
  const sig = () => [S.pi, S.mode, S.proj, S.lproj, S.wcat, S.wrole, S.wview, S.lsel, JSON.stringify(S.open), S.copied, S.H < 600].join('|');
  const lastSig = {};
  let update = function () {
    const st = S, pg = PAGES[st.pi], pk = pg.k, md = st.mode, K = sp(), E = 'cubic-bezier(.7,0,.2,1)', d = pk === 'lab', ph = st.phase;
    pf.classList.toggle('dk', d); pf.classList.toggle('narrow', Math.max(700, st.W) < 1100);
    const F = rects(), mv = (0.48 * K).toFixed(2) + 's', fa = (0.15 * K).toFixed(2) + 's', props4 = t => ['left', 'top', 'width', 'height'].map(p => p + ' ' + t + ' ' + E).join(', ');
    cks = F.map(([, , , , kind, key]) => kind + '|' + key);
    const sg = sig();
    F.forEach(([x, y, w, h, kind], i) => {
      const id = IDS[i], el = els[id], rc = !!st.rc[i] && ph === 'in', ins = rc ? 10 : 0, grow = ph === 'grow' && id === 'X', dl = st.drawn ? 0 : Math.min(i, 4) * .08 * K;
      el.style.zIndex = id === 'X' ? 4 : (id === 'A' || id === 'B' || id === 'N') ? 3 : 1;
      el.style.left = (x + ins) + 'px'; el.style.top = (y + ins) + 'px'; el.style.width = Math.max(0, w - 2 * ins) + 'px'; el.style.height = Math.max(0, h - 2 * ins) + 'px';
      const vis = kind !== 'none' && w > 0 && h > 0;
      el.style.opacity = vis ? 1 : 0; el.style.pointerEvents = vis ? '' : 'none';
      el.style.transition = grow ? 'none' : rc ? props4(fa) : props4(mv) + ', opacity .25s';
      el.classList.toggle('rc', rc);
      const s = ph === 'boot' || rc ? .06 : 1, lt = (st.drawn ? .18 : .55 * K).toFixed(2) + 's', d1 = dl.toFixed(2) + 's', d2 = (dl + (st.drawn ? 0 : .12)).toFixed(2) + 's';
      [['e1', 'scaleX', d1], ['e2', 'scaleX', d2], ['e3', 'scaleY', d2], ['e4', 'scaleY', d1]].forEach(([c, fn, dd]) => { const e = el.querySelector('.' + c); e.style.transform = `${fn}(${s})`; e.style.transition = `transform ${lt} ${E} ${dd}, background .3s`; });
      const body = el.lastElementChild;
      body.style.opacity = ph === 'in' && !rc ? 1 : 0;
      body.style.transform = ph === 'in' ? 'none' : 'translateX(' + (ph === 'out' ? -st.dir * 14 : st.dir * 14) + 'px)';
      body.style.transition = ph === 'in' && !rc ? `opacity ${(.3 * K).toFixed(2)}s ${(.04 * K).toFixed(2)}s, transform ${(.4 * K).toFixed(2)}s ${E}` : 'opacity .1s, transform .1s';
      if (kind === 'none') { lastSig[id] = ''; return; }
      const full = cks[i] + '#' + sg;
      if (lastSig[id] !== full) { const ckChanged = (lastSig[id] || '').split('#')[0] !== cks[i]; body.innerHTML = R[kind] ? R[kind]() : ''; if (ckChanged) body.scrollTop = 0; lastSig[id] = full; }
    });
    /* chrome: tabs, side arrows, crumbs, hint */
    $('tabs').querySelectorAll('.tab').forEach(t => t.classList.toggle('on', +t.dataset.j === st.pi));
    const sideOf = (j, el) => { if (j >= 0 && j < PAGES.length) { el.hidden = false; el.querySelector('.nm').textContent = PAGES[j].name; el.dataset.a = 'page:' + j; } else el.hidden = true; };
    sideOf(st.pi - 1, $('sideL')); sideOf(st.pi + 1, $('sideR'));
    const w = WM[WM[st.proj] ? st.proj : WK[0].k], lprojK = LP[st.lproj] ? st.lproj : lpOrder[st.lsel] || lpOrder[0];
    const cr = [['Home', A('home')]];
    if (pk === 'work') { cr.push(['Work', A('work')]); if (st.wrole !== null) cr.push([RF[st.wrole], A('list')]); else if (st.wcat !== 'all') cr.push([CATN[st.wcat], A('list')]); }
    if (pk === 'lab') cr.push(['The Lab', A('list')]); if (pk === 'about') cr.push(['About', '']);
    if (md === 'proj' && pk !== 'home' && pk !== 'about') cr.push([d ? LP[lprojK].t.replace('Project ', '') : w.t, '']);
    $('crumbs').innerHTML = cr.map(([t, a], i) => `<span>${i ? '<span class="s">/</span>' : ''}<span class="t ${i === cr.length - 1 ? 'on' : ''}" ${a}>${esc(t)}</span></span>`).join('');
    $('hint').textContent = md === 'proj' ? '↑ ↓ next · esc back · ← → pages' : '← → pages · esc home';
    /* recalibrate: same window, same kind, new key */
    if (ph !== 'in') { prevCks = null; if (!T.tw && ph !== 'boot') T.tw = setTimeout(() => { T.tw = null; if (S.phase !== 'in') set({ phase: 'in' }); }, Math.round(1100 * K)); return; }
    if (T.tw) { clearTimeout(T.tw); T.tw = null; }
    const prev = prevCks; prevCks = cks; if (!prev) return; const rcN = {}; let any = false;
    cks.forEach((k, j) => { const p = prev[j]; if (k && p && k !== p && k.split('|')[0] === p.split('|')[0] && k.split('|')[0] !== 'none') { rcN[j] = 1; any = true; } });
    if (any) { clearTimeout(T.t8); set({ rc: rcN }); timer('t8', () => set({ rc: {} }), Math.round(160 * K)); }
  };

  /* ---------- chrome ---------- */
  const tab = j => `<span class="tab" data-j="${j}" ${A('page', j)}>${esc(PAGES[j].name)}<i></i></span>`;
  $('tabs').innerHTML = `<span ${A('home')} style="cursor:pointer;">${esc(PR.name.split(' ').map((x, i, a) => i < a.length - 1 ? x[0] + '.' : x).join(''))}</span>
    <div class="mid"><div class="grp">${tab(HOME)}</div><span class="sep"></span><div class="grp">${[WORK, LAB, ABOUT].map(tab).join('')}</div></div>
    <a class="cv" href="${V}" target="_blank" rel="noopener">CV ↗</a>`;

  /* ---------- size, keys, boot ---------- */
  const onR = () => { if (box.clientWidth && (box.clientWidth !== S.W || box.clientHeight !== S.H)) set({ W: box.clientWidth, H: box.clientHeight }); };
  new ResizeObserver(onR).observe(box); addEventListener('resize', onR);
  addEventListener('keydown', e => { const k = e.key, s = S, tn = e.target && e.target.tagName; if (tn === 'INPUT' || tn === 'TEXTAREA') return;
    if (!$('lb').hidden) { if (k === 'Escape') $('lb').hidden = true; if (k === 'ArrowLeft') stepLB(-1); if (k === 'ArrowRight') stepLB(1); e.preventDefault(); return; }
    if (k === 'Escape') { if (s.mode === 'proj') nav({ mode: 'list' }); else if (s.pi !== HOME) nav({ pi: HOME, mode: 'list', origin: null }); return; }
    if (k === 'ArrowLeft' || k === 'ArrowRight' || k === 'q' || k === 'Q' || k === 'e' || k === 'E') { const dd = (k === 'ArrowRight' || k === 'e' || k === 'E') ? 1 : -1, j = s.pi + dd; e.preventDefault(); if (j >= 0 && j < PAGES.length) nav({ pi: j, mode: 'list', origin: null }); return; }
    if (k === 'ArrowDown' || k === 'ArrowUp') { const dd = k === 'ArrowDown' ? 1 : -1;
      if (s.mode === 'proj') { e.preventDefault(); const L = ctxList(s), lab = s.pi === LAB, cur = lab ? s.lproj : s.proj, i = Math.max(0, L.indexOf(cur)), nk = L[(i + dd + L.length) % L.length]; nav(lab ? { lproj: nk } : { proj: nk }); }
      else if (s.pi === LAB) { e.preventDefault(); const n = lpOrder.length; set({ lsel: (s.lsel + dd + n) % n }); } }
    if (k === 'Enter' && s.pi === LAB && s.mode === 'list') nav({ mode: 'proj', lproj: lpOrder[s.lsel] }); });
  /* deep links: #work, #work/<category>, #role/<role>, #lab, #lab/<id>, #about, #p/<id> */
  const toHash = () => { const pk = PAGES[S.pi].k; let h = pk === "home" ? "" : pk;
    if (pk === "work" && S.mode === "proj" && WM[S.proj]) h = "p/" + S.proj;
    else if (pk === "work" && S.wrole !== null) h = "role/" + slug(RF[S.wrole]);
    else if (pk === "work" && S.wcat !== "all") h = "work/" + S.wcat;
    else if (pk === "lab" && S.mode === "proj" && LP[S.lproj]) h = "lab/" + S.lproj;
    return h ? "#" + h : location.pathname + location.search; };
  const fromHash = () => { const [a, b] = location.hash.replace(/^#/, "").split("/").map(decodeURIComponent), st = { mode: "list", wcat: "all", wrole: null };
    if (a === "work") Object.assign(st, { pi: WORK, wcat: CATN[b] ? b : "all" });
    else if (a === "role") { const r = RF.findIndex(x => slug(x) === b); Object.assign(st, { pi: WORK, wrole: r >= 0 ? r : null }); }
    else if (a === "p" && WM[b]) Object.assign(st, { pi: WORK, mode: "proj", proj: b });
    else if (a === "lab") Object.assign(st, { pi: LAB }, LP[b] ? { mode: "proj", lproj: b, lsel: lpOrder.indexOf(b) } : {});
    else if (a === "about") st.pi = ABOUT; else st.pi = HOME;
    return st; };
  let hashLock = false;
  const _update = update; update = function () { _update(); const h = toHash(); if (!hashLock && (location.hash || "") !== (h.startsWith("#") ? h : "")) history.replaceState(null, "", h); };
  addEventListener("hashchange", () => { hashLock = true; nav(Object.assign({ origin: null }, fromHash())); setTimeout(() => { hashLock = false; }, 50); });
  Object.assign(S, fromHash());
  S.W = box.clientWidth || S.W; S.H = box.clientHeight || S.H;
  update();
  setTimeout(() => set({ phase: 'in' }), 150);
  setTimeout(() => set({ drawn: true }), 1400);
  window.PF = { S, set, nav };
})();
