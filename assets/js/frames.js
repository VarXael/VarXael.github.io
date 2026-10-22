/* Frames portfolio: the Frames kit (frames.css + frames-engine.js) applied to the portfolio.
   Data: window.PORTFOLIO (content.js) and window.DOCS (docs.js), both generated from the vault.
   Pages are rect maps (windows: id, tree, main, side); the engine morphs the windows between them.
   Routes: #/  #/work  #/work/<category>  #/lens/<discipline>  #/p/<id>  #/p/<id>/<vN>  #/process  #/about */
(function () {
  const W = window.PORTFOLIO, PR = W.profile, DOCS = window.DOCS || { versions: {} };
  const ROOT = './';
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const src = u => encodeURI(String(u || '').replace(/^\.\//, ROOT));
  const TIER = { hero: 0, supporting: 1, listed: 2 };
  const P = Object.values(W.projects).sort((a, b) => TIER[a.tier] - TIER[b.tier] || b.year - a.year);
  const DISC = Object.values(W.disciplines);
  const CATS = [['professional work', 'professional', 'Professional'], ['personal work', 'personal', 'Personal'], ['university work', 'university', 'University'], ['game jams', 'jam', 'Game jam']];
  const catOf = p => CATS.find(c => c[0] === p.category) || [p.category, slug(p.category), p.category];
  const slug = s => String(s).toLowerCase().normalize('NFKD').replace(/[^\w\s.-]/g, '').trim().replace(/[\s_.]+/g, '-');
  const versionsOf = p => DOCS.versions[p.id] || [];
  const isSvg = u => /\.svg$/i.test(u || '');
  const roleIx = r => DISC.findIndex(d => d.title === r) + 1;
  const linkHref = l => l.url === 'request' ? `mailto:${PR.email}?subject=${encodeURIComponent('Portfolio request')}` : l.url.replace(/^\.\//, ROOT);
  const ext = u => /^https?:/.test(u) ? ' target="_blank" rel="noopener"' : '';
  const PHONE = () => desk.clientWidth < 760;

  /* ---------- route ---------- */
  const S = { page: 'home', cat: null, lens: null, id: null, v: null };
  const HASH = {
    home: () => '#/', work: () => S.lens ? `#/lens/${slug(S.lens)}` : S.cat ? `#/work/${S.cat[1]}` : '#/work',
    project: () => `#/p/${S.id}`, version: () => `#/p/${S.id}/${S.v}`, process: () => '#/process', about: () => '#/about',
  };
  const go = (page, patch = {}) => { Object.assign(S, patch); S.page = page; location.hash = HASH[page](); };
  function parse() {
    const h = location.hash.replace(/^#\/?/, '').split('/').map(decodeURIComponent);
    S.v = null;
    if (h[0] === 'work') { S.page = 'work'; S.lens = null; S.cat = CATS.find(c => c[1] === h[1]) || null; }
    else if (h[0] === 'lens') { S.page = 'work'; S.cat = null; S.lens = (DISC.find(d => slug(d.title) === h[1]) || {}).title || null; }
    else if (h[0] === 'p' && W.projects[h[1]]) { S.id = h[1]; const p = W.projects[h[1]]; S.cat = catOf(p); S.lens = null; S.v = h[2] && versionsOf(p).find(v => v.id === h[2]) ? h[2] : null; S.page = S.v ? 'version' : 'project'; }
    else if (h[0] === 'process' || h[0] === 'about') S.page = h[0];
    else S.page = 'home';
  }
  const current = () => W.projects[S.id];
  const filtered = () => P.filter(p => (!S.cat || p.category === S.cat[0]) && (!S.lens || p.roles.includes(S.lens)));

  /* ---------- pages: window -> rect ---------- */
  const SW = 250, IH = 168, RW = 300;
  const mode = () => PHONE() ? 'm' : 'd';
  const small = (W, H, g, main, side) => {
    if (PHONE()) { const ih = 112; return { id: { rect: [0, 0, W, ih], kind: 'idsmall', key: 'm' }, tree: null, side: null, main: { ...main, rect: [0, ih + g, W, H - ih - g] } }; }
    const mw = side ? W - SW - g - RW - g : W - SW - g;
    return {
      id: { rect: [0, 0, SW, IH], kind: 'idsmall', key: 'd' },
      tree: { rect: [0, IH + g, SW, H - IH - g], kind: 'tree', key: `${S.page}|${S.cat?.[1] || ''}|${S.lens || ''}|${S.id || ''}` },
      main: { ...main, rect: [SW + g, 0, mw, H] },
      side: side ? { ...side, rect: [W - RW, 0, RW, H] } : null,
    };
  };
  const pages = {
    home: (W, H, g) => {
      if (PHONE()) { const ih = Math.min(Math.round(H * .56), 420); return { id: { rect: [0, 0, W, ih], kind: 'intro', key: 'm' }, main: { rect: [0, ih + g, W, H - ih - g], kind: 'featured', key: 'm' }, tree: null, side: null }; }
      const lw = Math.max(320, Math.min(440, Math.round(W * .36)));
      return { id: { rect: [0, 0, lw, H], kind: 'intro', key: 'd' }, main: { rect: [lw + g, 0, W - lw - g, H], kind: 'featured', key: 'd' }, tree: null, side: null };
    },
    work: (W, H, g) => small(W, H, g, { kind: 'cards', key: `${S.cat?.[1] || ''}|${S.lens || ''}|${mode()}` }),
    project: (W, H, g) => small(W, H, g, { kind: 'doc', key: `${S.id}|${mode()}` }, { kind: 'facts', key: `${S.id}|` }),
    version: (W, H, g) => small(W, H, g, { kind: 'version', key: `${S.id}|${S.v}|${mode()}` }, { kind: 'facts', key: `${S.id}|${S.v}` }),
    process: (W, H, g) => small(W, H, g, { kind: 'process', key: mode() }),
    about: (W, H, g) => small(W, H, g, { kind: 'about', key: mode() }),
  };

  /* ---------- pieces ---------- */
  const sw = () => `<div class="fr-switch" data-act="theme">${document.documentElement.classList.contains('fr-dark') ? 'Paper' : 'Dark'}<span class="fr-switch__knob"></span></div>`;
  const btn = (label, href, cls = '') => `<a class="fr-btn ${cls}" href="${esc(href)}"${ext(href)}>${esc(label)}</a>`;
  const act = (label, a, cls = '') => `<button type="button" class="fr-btn ${cls}" data-go="${a}">${esc(label)}</button>`;
  const squares = p => `<span class="fr-card__sq">${p.roles.map(r => `<i class="r${roleIx(r)}" title="${esc(r)}"></i>`).join('')}</span>`;
  const card = p => `<a class="fr-card" href="#/p/${p.id}"><div class="fr-card__edge"><div class="fr-card__in">
    <div class="fr-card__img"><img class="${isSvg(p.image) ? 'svg' : ''}" src="${src(p.image)}" alt="" loading="lazy"></div>
    <div class="fr-card__body"><span class="fr-card__title">${esc(p.title)}</span>
      <span class="fr-meta acc">${p.year} // ${esc(p.engine)}</span>
      <p class="fr-p fr-p--s">${esc(p.short)}</p>
      <div class="row"><span class="fr-btn fr-btn--cut">Open</span>${squares(p)}<span class="fr-meta grow" style="text-align:right">${esc(catOf(p)[2])}</span></div></div></div></div></a>`;
  const bar = (path, left = '', right = '') => `<div class="fr-bar">${left}<span class="fr-bar__path">${path}</span>${right}</div>`;
  const facts = p => `<dl class="facts"><dt>Role</dt><dd>${esc(p.role)}</dd><dt>Disciplines</dt><dd>${esc(p.roles.join(', '))}</dd><dt>Engine</dt><dd>${esc(p.engine)}</dd><dt>Year</dt><dd>${p.year}</dd><dt>Context</dt><dd>${esc(p.context)}</dd></dl>`;
  const links = p => { const V = versionsOf(p), latest = [...V].reverse().find(v => v.builds.length), b = latest?.builds[0];
    return [b ? btn(`Play ${latest.id}`, b.play.startsWith('http') ? b.play : ROOT + b.play, 'fr-btn--cut') : '', ...p.links.filter(l => l.url && !/^\.\/play\//.test(l.url)).map(l => btn(l.label, linkHref(l)))].join(''); };
  const vlist = (p, V, on) => V.length ? `<div class="vlist">${[...V].reverse().map(v => `<a class="${v.id === on ? 'is-on' : ''}" href="#/p/${p.id}/${v.id}"><span class="th">${v.images[0] ? `<img src="${ROOT + v.images[0].src}" alt="" loading="lazy">` : ''}</span><span class="t">${esc(v.name)}<small>${esc(v.id)} · ${v.images.length} images · ${v.builds.length} build${v.builds.length === 1 ? '' : 's'}</small></span></a>`).join('')}</div>` : '';
  const cover = (p, cls = 'cover') => `<div class="${cls} ${isSvg(p.image) ? 'svg' : ''}" data-lb="${src(p.image)}" data-cap="${esc(p.title)}"><img src="${src(p.image)}" alt=""></div>`;
  const treeItem = (label, href, on, meta = '', leaf = false) => `<a class="fr-tree__i ${leaf ? 'fr-tree__i--leaf' : ''} ${on ? 'is-on' : ''}" href="${href}">${leaf ? '' : '<span class="sq"></span>'}${esc(label)}${meta !== '' ? `<span class="fr-meta">${meta}</span>` : ''}</a>`;
  const pad2 = n => String(n).padStart(2, '0');

  /* ---------- render ---------- */
  function render(id, kind, key, el) {
    const p = current(), onWork = S.page === 'work';
    if (kind === 'intro') el.innerHTML = `<div class="id-big">
      <span class="fr-label">${esc(PR.title)}</span>
      <h1 class="fr-h1">${esc(PR.name).replace(' ', '<br>')}</h1>
      <p class="fr-p">${PR.headline}</p>
      ${PHONE() ? '' : `<p class="fr-p fr-p--s">${PR.bio}</p>`}
      <div class="row">${act('Work', '#/work', 'fr-btn--cut')}${act('Process', '#/process')}${act('About', '#/about')}${btn('CV', PR.cv)}${btn('GitHub', PR.github)}</div>
      <div class="grow"></div>
      <span class="fr-meta">${esc(PR.email)} // <a href="${esc(PR.github)}" target="_blank" rel="noopener">${esc(PR.github.replace(/^https?:\/\//, ''))}</a></span>
      ${sw()}</div>`;

    if (kind === 'idsmall') el.innerHTML = `<div class="id-small">
      <div class="id-small__top" data-go="#/"><span class="fr-meta acc">&larr; Home</span><div class="fr-h2 fr-h2--s">${esc(PR.name)}</div><span class="fr-meta">${esc(PR.title)}</span></div>
      ${PHONE() ? `<div class="id-nav">${act('Work', '#/work', onWork || S.page === 'project' || S.page === 'version' ? 'is-on' : '')}${act('Process', '#/process', S.page === 'process' ? 'is-on' : '')}${act('About', '#/about', S.page === 'about' ? 'is-on' : '')}<span class="grow"></span>${sw()}</div>` : sw()}</div>`;

    if (kind === 'tree') {
      const onDoc = S.page === 'project' || S.page === 'version', inWork = onWork || onDoc;
      el.innerHTML = `<div class="fr-tree tree-pad">
        <span class="fr-tree__h">Work</span>
        ${treeItem('All projects', '#/work', onWork && !S.cat && !S.lens, pad2(P.length))}
        ${CATS.map(c => { const list = P.filter(x => x.category === c[0]); const open = inWork && S.cat?.[1] === c[1];
          return treeItem(c[2], `#/work/${c[1]}`, onWork && open && !S.lens, pad2(list.length)) + (open && onDoc && p ? list.map(x => treeItem(x.title, `#/p/${x.id}`, x.id === p.id, '', true)).join('') : ''); }).join('')}
        <span class="fr-tree__h">Lenses</span>
        ${DISC.map(d => treeItem(d.title, `#/lens/${slug(d.title)}`, onWork && S.lens === d.title, pad2(P.filter(x => x.roles.includes(d.title)).length))).join('')}
        <span class="fr-tree__h">Pages</span>
        ${treeItem('Process', '#/process', S.page === 'process')}
        ${treeItem('About', '#/about', S.page === 'about')}
        ${treeItem('CV', PR.cv, false)}</div>`;
    }

    if (kind === 'featured') {
      const feat = P.filter(x => x.tier === 'hero');
      el.innerHTML = bar(`work/featured`, '', `<span class="fr-meta">${pad2(feat.length)} of ${pad2(P.length)}</span>${act('All', '#/work')}`) + `<div class="cards">${feat.map(card).join('')}</div>`;
    }

    if (kind === 'cards') {
      const list = filtered(), path = S.lens ? `lens/${slug(S.lens)}` : `work/${S.cat ? S.cat[1] : 'all'}`;
      el.innerHTML = bar(path, '', `<span class="fr-meta">${pad2(list.length)}</span>`) +
        (PHONE() ? `<div class="chips">${act('All', '#/work', !S.cat && !S.lens ? 'is-on' : '')}${CATS.map(c => act(c[2], `#/work/${c[1]}`, S.cat?.[1] === c[1] ? 'is-on' : '')).join('')}${DISC.map(d => act(d.title, `#/lens/${slug(d.title)}`, S.lens === d.title ? 'is-on fr-btn--ghost' : 'fr-btn--ghost')).join('')}</div>` : '') +
        (list.length ? `<div class="cards">${list.map(card).join('')}</div>` : `<p class="fr-p empty">No records.</p>`);
    }

    if (kind === 'doc' && p) {
      const V = versionsOf(p), i = P.indexOf(p), prev = P[(i - 1 + P.length) % P.length], next = P[(i + 1) % P.length];
      el.innerHTML = bar(`work/${catOf(p)[1]}/${slug(p.title)}`, act('⌂', '#/work'), act('←', `#/p/${prev.id}`) + act('→', `#/p/${next.id}`)) + `<div class="doc">
        <div class="doc__head"><span class="fr-label">${esc(p.context.toLowerCase().includes(catOf(p)[2].toLowerCase()) ? p.context : `${catOf(p)[2]} · ${p.context}`)}</span><h2 class="fr-h2">${esc(p.title)}</h2><p class="fr-p doc__lede">${esc(p.short)}</p>
          <div class="row">${links(p)}</div></div>
        ${PHONE() ? cover(p) + `<div class="doc__sec">${facts(p)}</div>` : ''}
        ${Object.entries(p.roleContributions).map(([r, h]) => `<div class="doc__sec"><h3>${esc(r)}</h3><div class="fr-p">${h}</div></div>`).join('')}
        ${V.length ? `<div class="doc__sec"><h3>Versions</h3>${vlist(p, V)}</div>` : ''}
        ${p.videos.length ? `<div class="doc__sec"><h3>Videos</h3><div class="vids">${p.videos.map(v => `<figure><video src="${src(v.file)}" poster="${isSvg(p.image) ? '' : src(p.image)}" controls muted playsinline preload="none"></video><figcaption class="fr-meta">${esc(v.label)}</figcaption></figure>`).join('')}</div></div>` : ''}
        ${p.story ? `<div class="doc__sec"><h3>Story</h3><div class="fr-p story">${p.story}</div></div>` : ''}
        <div class="doc__sec row"><span class="fr-meta grow">${esc(prev.title)} &larr; // &rarr; ${esc(next.title)}</span>${act(`← ${prev.title}`, `#/p/${prev.id}`)}${act(`${next.title} →`, `#/p/${next.id}`)}</div></div>`;
      el.querySelectorAll('a[href^="video:"], .magic-link').forEach(a => a.onclick = e => { e.preventDefault(); const f = a.dataset.src || (ROOT + 'assets/videos/' + a.getAttribute('href').slice(6)); const vid = el.querySelector('.vids video'); if (vid) { vid.src = encodeURI(f); vid.scrollIntoView({ block: 'center', behavior: 'smooth' }); vid.play().catch(() => {}); } });
    }

    if (kind === 'facts' && p) {
      const V = versionsOf(p);
      el.innerHTML = `<div class="side">${cover(p)}<span class="fr-label">Record</span>${facts(p)}
        ${V.length ? `<span class="fr-tree__h">Versions</span>${vlist(p, V, S.v)}` : ''}
        ${p.links.length || V.length ? `<span class="fr-tree__h">Links</span><div class="row">${links(p)}</div>` : ''}</div>`;
    }

    if (kind === 'version' && p) {
      const V = versionsOf(p), v = V.find(x => x.id === S.v), k = V.indexOf(v), prev = V[k - 1], next = V[k + 1];
      const list = v.images.map(im => ({ src: ROOT + im.src, cap: `${v.id} · ${im.caption}` }));
      el.innerHTML = bar(`work/${slug(p.title)}/${esc(v.id)}`, act('⌂', `#/p/${p.id}`), `<button type="button" class="fr-btn" data-go="${prev ? `#/p/${p.id}/${prev.id}` : ''}" aria-disabled="${!prev}">←</button><button type="button" class="fr-btn" data-go="${next ? `#/p/${p.id}/${next.id}` : ''}" aria-disabled="${!next}">→</button>`) + `<div class="doc">
        <div class="doc__head"><span class="fr-label">${esc(p.title)} · ${esc(v.id)}${v.date ? ' · ' + esc(v.date) : ''}</span><h2 class="fr-h2">${esc(v.name)}</h2>${v.summary ? `<p class="fr-p doc__lede">${esc(v.summary)}</p>` : ''}
          <div class="row">${v.builds.map(b => btn(`Play ${b.label.split(' · ')[0]}`, b.play.startsWith('http') ? b.play : ROOT + b.play, 'fr-btn--cut') + (b.windows ? btn('Windows', b.windows) : '')).join('')}</div></div>
        ${list.length ? `<div class="stage" id="stage"></div><span class="fr-meta" id="scap"></span><div class="thumbs" id="thumbs">${list.map((im, j) => `<button type="button" data-k="${j}" aria-label="${esc(im.cap)}"><img src="${im.src}" alt="" loading="lazy"></button>`).join('')}</div>` : ''}
        ${v.made ? `<div class="doc__sec"><h3>Made</h3><div class="fr-p">${v.made}</div></div>` : ''}
        ${PHONE() ? `<div class="doc__sec"><h3>Versions</h3>${vlist(p, V, v.id)}</div>` : ''}</div>`;
      if (list.length) {
        const stage = el.querySelector('#stage'), cap = el.querySelector('#scap'), th = el.querySelector('#thumbs');
        const show = j => { stage.innerHTML = `<img src="${list[j].src}" alt="">`; stage.dataset.lb = list[j].src; stage.dataset.cap = list[j].cap; stage.dataset.set = j; cap.textContent = list[j].cap; th.querySelectorAll('button').forEach((b, x) => b.setAttribute('aria-current', x === j)); };
        th.onclick = e => { const b = e.target.closest('button'); if (b) show(+b.dataset.k); };
        stage.onclick = () => openLB(list, +stage.dataset.set);
        show(0);
      }
    }

    if (kind === 'process') {
      const E = [];
      for (const x of P) {
        const V = versionsOf(x);
        if (V.length) E.push({ href: `#/p/${x.id}/${V[V.length - 1].id}`, k: 'Version history', t: `${x.title}: ${V.length} versions`, d: V.map(v => `${v.id} ${v.name}`).join(' · '), imgs: V.filter(v => v.images.length).slice(-3).reverse().map(v => ROOT + v.images[0].src) });
        if (x.story) E.push({ href: `#/p/${x.id}`, k: 'Story', t: x.title, d: x.story.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(/(?<=\.)\s/).slice(0, 2).join(' '), imgs: [src(x.image)] });
      }
      el.innerHTML = bar('process', '', `<span class="fr-meta">${pad2(E.length)}</span>`) + `<div class="feed">${E.map(e => `<a href="${e.href}"><span class="mg ${e.imgs.length === 1 ? 'one' : ''}">${e.imgs.map(u => `<span><img src="${u}" alt="" loading="lazy"></span>`).join('')}</span>
        <span class="tx"><span class="fr-label">${esc(e.k)}</span><span class="fr-h2 fr-h2--s">${esc(e.t)}</span><span class="fr-p fr-p--s">${esc(e.d)}</span></span></a>`).join('')}</div>`;
    }

    if (kind === 'about') {
      el.innerHTML = bar('about', '', `${btn('CV', PR.cv)}`) + `<div class="doc">
        <div class="doc__head row" style="gap:16px"><img class="portrait" src="${src(PR.portrait)}" alt=""><div><span class="fr-label">${esc(PR.title)}</span><h2 class="fr-h2">${esc(PR.name)}</h2></div></div>
        <p class="fr-p doc__lede">${PR.quote.replace(/\.$/, '')}.</p>
        <div class="fr-p">${PR.bio}</div>
        <div class="doc__sec"><h3>Contact</h3><div class="contact"><span class="fr-meta">Email</span><span class="v">${esc(PR.email)}</span><button type="button" class="fr-btn" data-copy="${esc(PR.email)}">Copy</button>
          <span class="fr-meta">GitHub</span><span class="v">${esc(PR.github.replace(/^https?:\/\//, ''))}</span>${btn('Open', PR.github)}
          <span class="fr-meta">CV</span><span class="v">cv.html</span>${btn('Open', PR.cv)}</div></div>
        <div class="doc__sec"><h3>Disciplines</h3><div class="disc">${DISC.map(d => `<button type="button" data-go="#/lens/${slug(d.title)}"><b>${pad2(P.filter(x => x.roles.includes(d.title)).length)}</b><h3>${esc(d.title)}</h3><span class="fr-p fr-p--s">${esc(d.description)}</span></button>`).join('')}</div></div>
        ${(W.experience || []).map(g => `<div class="doc__sec exp"><h3>${esc(g.group)}</h3><ol>${g.items.map(i => `<li><span class="when"><span class="fr-meta">${esc(i.when)}</span>${i.where ? `<span class="fr-meta">${esc(i.where)}</span>` : ''}</span><span><b>${esc(i.title)}</b>${i.org ? `<span class="fr-meta org">${esc(i.org)}</span>` : ''}<span class="fr-p fr-p--s">${i.desc}</span></span></li>`).join('')}</ol></div>`).join('')}
        <div class="doc__sec"><h3>Worked with</h3><div class="row">${[['https://untoldgames.com/', 'Untold Games'], ['https://www.udemy.com/user/creativity-unleashed/', 'Creativity Unleashed'], ['https://www.umu.se/en/', 'Umeå University'], ['https://cineon.training/', 'Cineon Training']].map(([u, n]) => btn(n, u, 'fr-btn--ghost')).join('')}</div></div></div>`;
    }
  }

  /* ---------- image viewer ---------- */
  const $ = i => document.getElementById(i);
  let LB = { list: [], k: 0 };
  function openLB(list, k) { LB = { list, k }; $('lb').hidden = false; drawLB(); }
  function drawLB() { const im = LB.list[LB.k]; $('lbImg').src = im.src; $('lbCap').textContent = im.cap; $('lbCount').textContent = `${LB.k + 1} / ${LB.list.length}`; }
  const stepLB = d => { LB.k = (LB.k + d + LB.list.length) % LB.list.length; drawLB(); };
  $('lbClose').onclick = () => $('lb').hidden = true;
  $('lbPrev').onclick = () => stepLB(-1); $('lbNext').onclick = () => stepLB(1);
  $('lb').onclick = e => { if (e.target === $('lb') || e.target.tagName === 'FIGURE') $('lb').hidden = true; };
  addEventListener('keydown', e => { if ($('lb').hidden) return; if (e.key === 'Escape') $('lb').hidden = true; if (e.key === 'ArrowLeft') stepLB(-1); if (e.key === 'ArrowRight') stepLB(1); });

  /* ---------- desk ---------- */
  const desk = $('desk');
  const fr = Frames(desk, { pages, render });
  desk.addEventListener('click', e => {
    const t = e.target.closest('[data-act="theme"], [data-go], [data-copy], [data-lb]');
    if (!t) return;
    if (t.dataset.act === 'theme') { setTheme(!document.documentElement.classList.contains('fr-dark')); return; }
    if (t.dataset.go !== undefined) { if (t.dataset.go) location.hash = t.dataset.go; return; }
    if (t.dataset.copy) { navigator.clipboard?.writeText(t.dataset.copy).then(() => { t.textContent = 'Copied'; setTimeout(() => t.textContent = 'Copy', 1600); }); return; }
    if (t.dataset.lb && !t.onclick) openLB([{ src: t.dataset.lb, cap: t.dataset.cap }], 0);
  });
  function setTheme(dark) {
    document.documentElement.classList.toggle('fr-dark', dark);
    try { localStorage.setItem('fr-theme', dark ? 'dark' : 'paper'); } catch {}
    desk.querySelectorAll('.fr-switch').forEach(s => s.firstChild.textContent = dark ? 'Paper' : 'Dark');
  }
  function route() {
    parse();
    document.title = (S.page === 'project' || S.page === 'version') && current() ? `${current().title} | ${PR.name}` : `${PR.name} | ${PR.title}`;
    fr.go(S.page);
    desk.querySelectorAll('.fr-win > .fr-body').forEach(b => { if (S.page !== 'home') b.scrollTop = 0; });
  }
  addEventListener('hashchange', route);
  route();
  setTimeout(() => desk.classList.remove('is-boot'), 700);
})();
