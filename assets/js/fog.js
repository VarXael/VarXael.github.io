/* Fog portfolio: renders the home page, project pages (with their versions) and Process from
   window.PORTFOLIO (content.js) and window.DOCS (docs.js). Both are generated from the vault.
   On localhost it also loads docs.private.js: everything that exists, with what is not published marked. */
(function () {
  const B = document.body, ROOT = B.dataset.root || './', PAGE = B.dataset.page;
  const LOCAL = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  if (LOCAL && !window.DOCS?.preview) {
    const s = document.createElement('script');
    s.src = ROOT + 'assets/js/docs.private.js';
    s.onload = s.onerror = start;
    document.head.appendChild(s);
  } else start();

  function start() {
  const W = window.PORTFOLIO, PR = W.profile, DOCS = window.DOCS || { versions: {} }, PREVIEW = !!DOCS.preview;
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const src = u => encodeURI(String(u || '').replace(/^\.\//, ROOT));
  const TIER = { hero: 0, supporting: 1, listed: 2 };
  const P = Object.values(W.projects).sort((a, b) => TIER[a.tier] - TIER[b.tier]);
  const DISC = Object.values(W.disciplines);
  const CATS = [['professional work', 'Professional'], ['personal work', 'Personal'], ['university work', 'University'], ['game jams', 'Game jam']];
  const catLabel = c => (CATS.find(x => x[0] === c) || [c, c])[1];
  const STATUS = p => (p.context.match(/in (development|progress)/i) || [''])[0];
  const roleCount = r => P.filter(p => p.roles.includes(r)).length;
  const slug = s => String(s).toLowerCase().normalize('NFKD').replace(/[^\w\s.-]/g, '').trim().replace(/[\s_.]+/g, '-');
  const page = p => `${ROOT}work/${slug(p.title)}/`;
  const versionsOf = p => DOCS.versions[p.id] || [];
  const linkHref = l => l.url === 'request' ? `mailto:${PR.email}?subject=${encodeURIComponent('Portfolio request')}` : l.url.replace(/^\.\//, ROOT);
  const mb = n => n ? `${Math.round(n / 1e6)} MB` : '';
  const tag = v => !v.public && PREVIEW ? ' <span class="preview">not published</span>' : '';

  /* ---- frame: preview bar, header, closing band, viewer ---- */
  const nav = [['home', 'Work', ROOT + 'portfolio.html'], ['process', 'Process', ROOT + 'process.html'], ['cv', 'CV', PR.cv.replace(/^\.\//, ROOT)]];
  document.body.insertAdjacentHTML('afterbegin', `${PREVIEW ? '<div class="preview-bar">Local preview: parts marked "not published" are only visible on this PC</div>' : ''}
  <header class="top"><div class="wrap">
    <a class="who" href="${ROOT}portfolio.html"><img src="${src(PR.portrait)}" alt="" width="36" height="36"><span><b>${esc(PR.name)}</b><span class="mono dim">${esc(PR.title)}</span></span></a>
    <nav class="mono" aria-label="Site">${nav.map(([k, l, h]) => `<a href="${h}" class="${k === PAGE || (k === 'home' && PAGE === 'project') ? 'on' : ''}">${l}</a>`).join('')}
      <a href="#contact" class="hs">Contact</a><button class="look" id="look" type="button"><i></i><span id="lookLabel">Light</span></button></nav>
  </div></header>
  <main class="wrap" id="view"></main>
  <section class="band" id="contact"><div class="wrap">
    <div><h2>Let's <em>talk.</em></h2><p>Open to systems design, technical design and gameplay programming roles. Email is the fastest way to reach me.</p></div>
    <div>
      <div class="row"><span class="k mono">Email</span><span class="v" id="mail">${esc(PR.email)}</span><button class="mini" id="copy" type="button">Copy</button></div>
      <div class="row"><span class="k mono">GitHub</span><span class="v">${esc(PR.github.replace(/^https?:\/\//, ''))}</span><a class="mini" href="${esc(PR.github)}" target="_blank" rel="noopener">Open</a></div>
      <div class="row"><span class="k mono">CV</span><span class="v">cv.html</span><a class="mini" href="${esc(PR.cv.replace(/^\.\//, ROOT))}" target="_blank" rel="noopener">Open</a></div>
    </div>
    <footer class="mono"><span>${esc(PR.name)}</span><span>${new Date().getFullYear()}</span></footer>
  </div></section>
  <div class="lb" id="lb" hidden role="dialog" aria-modal="true" aria-label="Image viewer">
    <div class="lbt"><span id="lbCount"></span><button type="button" id="lbClose">Close (Esc)</button></div>
    <figure><img id="lbImg" alt=""></figure>
    <div class="lbn"><button type="button" id="lbPrev" aria-label="Previous">&larr;</button><p id="lbCap"></p><button type="button" id="lbNext" aria-label="Next">&rarr;</button></div>
  </div>`);
  const $ = id => document.getElementById(id), view = $('view');
  const root = document.documentElement;
  const setLook = l => { if (l === 'light') root.dataset.look = 'light'; else delete root.dataset.look; $('lookLabel').textContent = l === 'light' ? 'Dark' : 'Light'; try { localStorage.setItem('look', l); } catch {} };
  setLook(root.dataset.look === 'light' ? 'light' : 'dark');
  $('look').onclick = () => setLook(root.dataset.look === 'light' ? 'dark' : 'light');
  $('copy').onclick = async e => { const b = e.currentTarget; try { await navigator.clipboard.writeText(PR.email); b.textContent = 'Copied'; } catch { b.textContent = PR.email; } setTimeout(() => b.textContent = 'Copy', 1800); };

  let LB = [], LBi = 0;
  const showLB = () => { const im = LB[LBi]; $('lbImg').src = im.src; $('lbImg').alt = im.caption; $('lbCap').textContent = im.caption; $('lbCount').textContent = `${LBi + 1} / ${LB.length}`; };
  const openLB = (list, i) => { LB = list; LBi = i; $('lb').hidden = false; showLB(); $('lbClose').focus(); };
  const stepLB = d => { LBi = (LBi + d + LB.length) % LB.length; showLB(); };
  $('lbClose').onclick = () => $('lb').hidden = true; $('lbPrev').onclick = () => stepLB(-1); $('lbNext').onclick = () => stepLB(1);
  $('lb').onclick = e => { if (e.target.id === 'lb' || e.target.tagName === 'FIGURE') $('lb').hidden = true; };
  document.addEventListener('keydown', e => { if ($('lb').hidden) return; if (e.key === 'Escape') $('lb').hidden = true; if (e.key === 'ArrowRight') stepLB(1); if (e.key === 'ArrowLeft') stepLB(-1); });
  const media = (list, i, cls = '') => `<button type="button" class="media ${cls}" data-lb="${i}" aria-label="Open ${esc(list[i].caption)} full screen"><img src="${list[i].src}" alt="${esc(list[i].caption)}" loading="lazy"><span class="cap">${esc(list[i].caption)}</span></button>`;
  const bindLB = (el, list) => el.querySelectorAll('[data-lb]').forEach(b => b.onclick = e => { e.preventDefault(); openLB(list, +b.dataset.lb); });
  const shots = v => v.images.map(im => ({ src: ROOT + im.src, caption: im.caption }));

  /* ---- home ---- */
  function home() {
    const feat = P.filter(p => p.tier === 'hero');
    const q = PR.quote.replace(/<[^>]+>/g, '').replace(/\.$/, ''), cut = q.search(/ where | that | because /);
    view.innerHTML = `<section class="hero"><span class="mono dim">${esc(PR.title)}</span>
      <h1>${cut > 0 ? `${esc(q.slice(0, cut))} <em>${esc(q.slice(cut + 1))}.</em>` : `<em>${esc(q)}.</em>`}</h1>
      <div class="under"><div><p class="credits">${PR.headline}</p><p class="bio">${PR.bio}</p></div>
        <div class="btns"><a class="btn solid" href="mailto:${esc(PR.email)}">Email me</a><a class="btn" href="${esc(PR.cv.replace(/^\.\//, ROOT))}" target="_blank" rel="noopener">CV</a><a class="btn" href="${esc(PR.github)}" target="_blank" rel="noopener">GitHub</a></div></div>
      <div class="strip">${feat.slice(0, 3).map(p => `<a href="${page(p)}"><div class="img"><img src="${src(p.image)}" alt="${esc(p.title)}"></div><span class="mono">${esc(p.title)}</span></a>`).join('')}</div></section>
    <div class="sh"><h2>Featured <em>work</em></h2><span class="mono dim">${feat.length} of ${P.length}</span></div>
    <div class="cards">${feat.map(p => `<a class="c hov" href="${page(p)}"><div class="img"><img src="${src(p.image)}" alt="" loading="lazy">${STATUS(p) ? `<span class="tag mono">${esc(STATUS(p))}</span>` : ''}</div>
      <div class="tx"><div class="k mono dim"><span>${esc(p.context)}</span><span>${p.year}</span></div><h3>${esc(p.title)}</h3><span class="role">${esc(p.role)}</span><p>${esc(p.short)}</p>
      <span class="go">${versionsOf(p).length ? `${versionsOf(p).length} versions documented` : 'Open project'}</span></div></a>`).join('')}</div>
    <div class="sh" id="all"><h2>All <em>projects</em></h2><span class="mono dim">Click a column to sort</span></div>
    <div class="tools"><div class="filters" id="cats"></div><div class="filters" id="lens"></div></div>
    <div class="index"><table><thead id="ihead"><tr><th><button type="button" data-k="year">Year</button></th><th><button type="button" data-k="title">Project</button></th><th><button type="button" data-k="role">Role</button></th><th><button type="button" data-k="engine">Engine</button></th><th><button type="button" data-k="category">Type</button></th></tr></thead><tbody id="ibody"></tbody></table></div>
    <div class="sh"><h2>Disciplines</h2><span class="mono dim">Projects per discipline</span></div>
    <div class="disc" id="disc">${DISC.map(d => `<button type="button" data-r="${esc(d.title)}"><b>${roleCount(d.title)}</b><h3>${esc(d.title)}</h3><p>${esc(d.description)}</p><span class="mono">See projects</span></button>`).join('')}</div>
    <div class="stack"><div><span class="mono dim">Languages</span><p>C++, C#, Verse, Blueprints</p></div><div><span class="mono dim">Engines</span><p>Unreal Engine, Unity, UEFN</p></div><div><span class="mono dim">Tools</span><p>Git, Plastic SCM, Rider</p></div></div>
    <div class="sh" id="experience"><h2><em>Experience</em></h2><span class="mono dim">And education</span></div>
    <div class="cv">${(W.experience || []).map(g => `<div><h3>${esc(g.group)}</h3><ol>${g.items.map(i => `<li><div class="when">${esc(i.when)}${i.where ? `<span>${esc(i.where)}</span>` : ''}</div><div><b>${esc(i.title)}</b>${i.org ? `<span class="org">${esc(i.org)}</span>` : ''}<p>${i.desc}</p></div></li>`).join('')}</ol></div>`).join('')}</div>
    <div class="sh"><h2>Worked <em>with</em></h2></div>
    <div class="logos">${[['https://untoldgames.com/', 'untold_games_cover.png', 'Untold Games'], ['https://www.udemy.com/user/creativity-unleashed/', 'CreativityUnleashed.png', 'Creativity Unleashed'], ['https://www.umu.se/en/', 'Umeå_University.png', 'Umeå University'], ['https://cineon.training/', 'Cineon_Training.png', 'Cineon Training']]
      .map(([u, f, n]) => `<a href="${u}" target="_blank" rel="noopener" title="${n}"><img src="${src('./assets/images/' + f)}" alt="${n}"></a>`).join('')}</div>`;
    let sortK = 'year', dir = -1, cat = null, lens = null;
    $('cats').innerHTML = `<button type="button" data-c="">All</button>` + CATS.map(([k, l]) => `<button type="button" data-c="${k}">${l} <span>${P.filter(p => p.category === k).length}</span></button>`).join('');
    $('lens').innerHTML = `<button type="button" data-r="">Any discipline</button>` + DISC.map(d => `<button type="button" data-r="${esc(d.title)}">${esc(d.title)}</button>`).join('');
    const draw = () => {
      const rows = P.filter(p => (!cat || p.category === cat) && (!lens || p.roles.includes(lens))).sort((a, b) => { const x = a[sortK], y = b[sortK]; return (x > y ? 1 : x < y ? -1 : 0) * dir || b.year - a.year; });
      $('ibody').innerHTML = rows.map(p => `<tr class="r" data-href="${page(p)}"><td>${p.year}</td><td class="t"><a href="${page(p)}" style="text-decoration:none">${esc(p.title)}</a></td><td>${esc(p.role)}</td><td class="mono">${esc(p.engine)}</td><td class="mono">${STATUS(p) ? `<span class="acc">${esc(STATUS(p))}</span>` : catLabel(p.category)}</td></tr>`).join('') || `<tr><td colspan="5" class="dim">No projects match these filters.</td></tr>`;
      $('ihead').querySelectorAll('button').forEach(b => b.dataset.k === sortK ? b.setAttribute('aria-sort', dir > 0 ? 'ascending' : 'descending') : b.removeAttribute('aria-sort'));
      [...$('cats').children].forEach(b => b.setAttribute('aria-pressed', (b.dataset.c || null) === cat));
      [...$('lens').children].forEach(b => b.setAttribute('aria-pressed', (b.dataset.r || null) === lens));
      [...$('disc').children].forEach(b => b.setAttribute('aria-pressed', b.dataset.r === lens));
    };
    $('cats').onclick = e => { const b = e.target.closest('button'); if (b) { cat = b.dataset.c || null; draw(); } };
    $('lens').onclick = e => { const b = e.target.closest('button'); if (b) { lens = b.dataset.r || null; draw(); } };
    $('disc').onclick = e => { const b = e.target.closest('button'); if (b) { lens = b.dataset.r; cat = null; draw(); $('all').scrollIntoView({ behavior: 'smooth' }); } };
    $('ihead').onclick = e => { const b = e.target.closest('button'); if (!b) return; if (sortK === b.dataset.k) dir = -dir; else { sortK = b.dataset.k; dir = sortK === 'year' ? -1 : 1; } draw(); };
    $('ibody').onclick = e => { const tr = e.target.closest('tr.r'); if (tr && !e.target.closest('a')) location.href = tr.dataset.href; };
    draw();
  }

  /* ---- project (and its versions, at #v3, #v11 ...) ---- */
  function project() {
    const p = W.projects[B.dataset.id]; if (!p) { view.innerHTML = '<p>Project not found.</p>'; return; }
    const V = versionsOf(p), i = P.indexOf(p), prev = P[(i - 1 + P.length) % P.length], next = P[(i + 1) % P.length];
    document.title = `${p.title} | ${PR.name}`;
    const route = () => { const v = V.find(x => '#' + x.id === location.hash); v ? version(p, V, v) : overview(p, V, prev, next); };
    addEventListener('hashchange', route); route();
  }
  function overview(p, V, prev, next) {
    const latest = [...V].reverse().find(v => v.builds.length);
    const lb = latest?.builds[0];
    const cover = [{ src: src(p.image), caption: p.title }];
    view.innerHTML = `<div class="crumb mono"><a href="${ROOT}portfolio.html">Work</a><span class="dim">/</span><b>${esc(p.title)}</b></div>
    <section class="p-hero"><div><span class="mono acc">${esc(catLabel(p.category))} · ${esc(p.context)}</span><h1>${esc(p.title)}</h1><p class="lede">${esc(p.short)}</p>
      <div class="btns">${lb ? `<a class="btn play" href="${lb.play.startsWith('http') ? lb.play : ROOT + lb.play}" target="_blank" rel="noopener">Play ${esc(latest.id)}<small>browser</small></a>` : ''}
        ${lb?.windows ? `<a class="btn" href="${lb.windows}">Windows<small>${mb(lb.size)}</small></a>` : ''}
        ${V.length ? `<a class="btn" href="#versions">All ${V.length} versions</a>` : ''}
        ${p.links.filter(l => l.url && !/^\.\/play\//.test(l.url)).map(l => `<a class="btn" href="${esc(linkHref(l))}"${l.url === 'request' ? '' : ' target="_blank" rel="noopener"'}>${esc(l.label)}</a>`).join('')}</div></div>
      <div class="cover">${media(cover, 0)}</div></section>
    <dl class="facts"><div><dt>Role</dt><dd>${esc(p.role)}</dd></div><div><dt>Disciplines</dt><dd>${esc(p.roles.join(', '))}</dd></div><div><dt>Engine</dt><dd>${esc(p.engine)}</dd></div><div><dt>Year</dt><dd>${p.year}</dd></div><div><dt>Context</dt><dd>${esc(p.context)}</dd></div></dl>
    ${Object.keys(p.roleContributions).length ? `<div class="sh"><h2>What I <em>did</em></h2></div><div class="did">${Object.entries(p.roleContributions).map(([r, h]) => `<div><h3>${esc(r)}</h3>${h}</div>`).join('')}</div>` : ''}
    ${V.length ? `<div class="sh" id="versions"><h2>Versions</h2><span class="mono dim">Newest first · each one has its own page</span></div>
      <div class="vgrid">${[...V].reverse().map((v, k) => `<a class="vcard${k === 0 && V.length > 2 ? ' latest' : ''}" href="#${v.id}">
        <span class="thumb">${v.images[0] ? `<img src="${ROOT + v.images[0].src}" alt="" loading="lazy">` : `<span class="none">${esc(v.id)}</span>`}</span>
        <span class="k mono dim"><span>${esc(v.id)}${v.date ? ' · ' + esc(v.date) : ''}</span><span>${v.images.length} images · ${v.builds.length} build${v.builds.length === 1 ? '' : 's'}</span></span>
        <h3>${esc(v.id)} <span>${esc(v.name)}</span>${tag(v)}</h3>${v.summary ? `<p>${esc(v.summary)}</p>` : ''}</a>`).join('')}</div>` : ''}
    ${p.videos.length ? `<div class="sh"><h2>Videos</h2></div><div class="vids">${p.videos.map(v => `<figure style="margin:0"><video src="${src(v.file)}" poster="${src(p.image)}" controls muted playsinline preload="none"></video><figcaption class="mono dim">${esc(v.label)}</figcaption></figure>`).join('')}</div>` : ''}
    ${p.story ? `<div class="sh"><h2>The <em>story</em></h2><span class="mono dim">From production</span></div><div class="story">${p.story}</div>` : ''}
    <nav class="next-proj"><a href="${page(prev)}"><span class="mono dim">Previous</span><b>${esc(prev.title)}</b></a><a href="${page(next)}"><span class="mono dim">Next</span><b>${esc(next.title)}</b></a></nav>`;
    bindLB(view.querySelector('.cover'), cover);
    view.querySelectorAll('.did a[href^="video:"]').forEach(a => a.onclick = e => { e.preventDefault(); const vid = view.querySelector('.vids video'); if (vid) { vid.src = src('./assets/videos/' + a.getAttribute('href').slice(6)); vid.scrollIntoView({ block: 'center' }); vid.play().catch(() => {}); } });
    if (location.hash === '#versions') document.getElementById('versions')?.scrollIntoView(); else scrollTo(0, 0);
  }
  function version(p, V, v) {
    const k = V.indexOf(v), prev = V[k - 1], next = V[k + 1], list = shots(v);
    view.innerHTML = `<div class="crumb mono"><a href="${ROOT}portfolio.html">Work</a><span class="dim">/</span><a href="#">${esc(p.title)}</a><span class="dim">/</span><a href="#versions">Versions</a><span class="dim">/</span><b>${esc(v.id)}</b></div>
    <div class="v-head"><div><span class="mono dim">${esc(p.title)} · ${esc(v.id)}${v.date ? ' · ' + esc(v.date) : ''}</span><h1>${esc(v.id)} <span>${esc(v.name)}</span>${tag(v)}</h1>${v.summary ? `<p class="sum">${esc(v.summary)}</p>` : ''}</div>
      <div class="v-nav"><a href="#${prev ? prev.id : ''}" aria-disabled="${!prev}">&larr; ${prev ? esc(prev.id) : ''}</a><a href="#versions">All</a><a href="#${next ? next.id : ''}" aria-disabled="${!next}">${next ? esc(next.id) : ''} &rarr;</a></div></div>
    ${list.length ? `<section class="stage"><div class="main" id="main"></div><div class="capline mono dim"><span id="mcap"></span><span>${list.length} images · click to enlarge, arrows to browse</span></div>
      <div class="thumbs" id="thumbs">${list.map((im, j) => `<button type="button" data-k="${j}" aria-label="${esc(im.caption)}"><img src="${im.src}" alt="" loading="lazy"></button>`).join('')}</div></section>` : ''}
    <div class="v-body"><div>${v.made ? `<h2>What was made</h2>${v.made}` : `<h2>About this version</h2><p class="dim">${v.summary ? esc(v.summary) : 'Play it to see it.'}</p>`}</div>
      <aside><h2>Builds</h2><div class="builds">${v.builds.length ? v.builds.map((b, j) => `<div class="build"><div class="k"><b>${esc(b.label)}</b><span class="mono dim">${j === 0 && v.builds.length > 1 ? 'latest' : ''}${!b.public && PREVIEW ? ' · on the wiki' : ''}</span></div>
        <div class="btns"><a class="btn play" href="${b.play.startsWith('http') ? b.play : ROOT + b.play}" target="_blank" rel="noopener">Play in browser</a>${b.windows ? `<a class="btn" href="${b.windows}">Windows<small>${mb(b.size)}</small></a>` : ''}</div></div>`).join('') : '<p class="dim">No build for this version.</p>'}</div>
      ${PREVIEW && !v.public ? '<p class="note">Not published. To publish this version, add <code>public: true</code> and a one-line <code>summary:</code> to its log in the vault; only the summary and the Made section go online.</p>' : ''}</aside></div>`;
    if (list.length) {
      const show = j => { $('main').innerHTML = media(list, j, 'fit'); bindLB($('main'), list); $('mcap').textContent = list[j].caption; $('thumbs').querySelectorAll('button').forEach((b, x) => b.setAttribute('aria-current', x === j)); };
      $('thumbs').onclick = e => { const b = e.target.closest('button'); if (b) show(+b.dataset.k); };
      show(0);
    }
    scrollTo(0, 0);
  }

  /* ---- process: production stories and documented version histories ---- */
  function process() {
    const E = [];
    for (const p of P) {
      const V = versionsOf(p).filter(v => v.images.length);
      if (V.length) E.push({ t: `${esc(p.title)}: <em>${V.length + (versionsOf(p).length - V.length)} versions</em>`, k: 'Version history', d: `Every build, what it tried and what it changed, with its pictures and a playable build.`, imgs: V.slice(-3).reverse().map(v => ({ src: ROOT + v.images[0].src, caption: `${v.id} ${v.name}` })), href: page(p) + '#versions' });
      if (p.story) E.push({ t: `${esc(p.title)}: <em>the story</em>`, k: 'From production', d: p.story.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(/(?<=\.)\s/).slice(0, 2).join(' '), imgs: [{ src: src(p.image), caption: p.title }], href: page(p) });
    }
    view.innerHTML = `<div class="pr-head"><h1>Process</h1><p>Notes written while making things: what was tried, what changed, and why. Each one leads to the project, and to its builds when there are any.</p></div>
    <div class="feed">${E.map((e, k) => `<article class="entry"><div class="mw"><div class="mgrid${e.imgs.length === 1 ? ' one' : ''}" data-e="${k}">${e.imgs.map((im, j) => media(e.imgs, j)).join('')}</div></div>
      <div><span class="mono dim">${esc(e.k)}</span><h2>${e.t}</h2><p>${esc(e.d)}</p><div class="btns"><a class="btn" href="${e.href}">Read</a></div></div></article>`).join('')}</div>`;
    view.querySelectorAll('[data-e]').forEach(g => bindLB(g, E[+g.dataset.e].imgs));
  }

  ({ home, project, process })[PAGE]?.();
  }
})();
