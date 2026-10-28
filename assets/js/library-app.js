// The Library pages: the portfolio built from VarXec's public side (window.LIBRARY, tools/build-library.mjs) and the profile
// (window.PORTFOLIO, tools/build-content.mjs). #/ is the work; #/<id> is one project: its text, its builds on a line, Play, its pictures.
(() => {
  const L = window.LIBRARY || { projects: [] };
  const P = (window.PORTFOLIO || {}).profile || {};
  const app = document.getElementById('app');
  const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const GROUPS = [['professional', 'Studio work'], ['personal', 'Own projects'], ['university', 'University'], ['jam', 'Game jams'], ['', 'Other']];
  const cover = (p) => p.shots[0] || p.builds.find((b) => b.shot)?.shot || p.image || '';
  const live = (p) => /^working on$/i.test(p.stage || '');
  if (P.email) document.getElementById('mail').href = `mailto:${P.email}`;

  function home() {
    document.title = `${P.name || 'Portfolio'} | ${P.title || ''}`;
    const groups = GROUPS.map(([k, label]) => [label, L.projects.filter((p) => (GROUPS.some(([x]) => x === p.category) ? p.category : '') === k)]).filter(([, l]) => l.length);
    app.innerHTML = `
      <section class="hero"><div>
        <div class="eyebrow">${esc(P.title || '')}</div><h1>${esc(P.name || '')}</h1>
        <p class="head">${P.headline || ''}</p>${P.quote ? `<p class="quote">${esc(P.quote)}</p>` : ''}
      </div>${P.portrait ? `<img src="${esc(P.portrait)}" alt="">` : ''}</section>
      ${groups.map(([label, list]) => `<section class="group"><h2>${esc(label)} <span>${list.length}</span></h2><div class="grid">${list.map((p) => `
        <a class="card" href="#/${encodeURIComponent(p.id)}">
          <div class="cv">${cover(p) ? `<img src="${esc(cover(p))}" alt="" loading="lazy">` : `<span class="nopic">${esc(p.title)}</span>`}${live(p) ? '<span class="live">In development</span>' : ''}</div>
          <div class="bd"><h3>${esc(p.title)}</h3><div class="ctx">${esc(p.context || [p.year, p.role].filter(Boolean).join(' · '))}</div>
          ${p.short ? `<p>${esc(p.short)}</p>` : ''}${p.builds.length ? `<div class="nb">${p.builds.length} build${p.builds.length > 1 ? 's' : ''}${p.builds.some((b) => b.play) ? ' · playable' : ''}</div>` : ''}</div>
        </a>`).join('')}</div></section>`).join('')}`;
  }

  function project(p) {
    document.title = `${p.title} | ${P.name || ''}`;
    const builds = p.builds;
    app.innerHTML = `<article class="page">
      <a class="back" href="#/">‹ Work</a>
      <div class="eyebrow">${esc(p.context || [p.category, p.year].filter(Boolean).join(' · '))}${live(p) ? ' · In development' : ''}</div>
      <h1>${esc(p.title)}</h1>
      ${p.role ? `<div class="role">${esc(p.role)}</div>` : ''}
      ${p.tools.length ? `<div class="tools">${p.tools.map((t) => `<span>${esc(t)}</span>`).join('')}</div>` : ''}
      ${cover(p) ? `<div class="cover"><img src="${esc(cover(p))}" alt=""></div>` : ''}
      <div class="text">${p.intro}${p.sections.map((s) => `<h2>${esc(s.title)}</h2>${s.html}`).join('')}</div>
      ${builds.length ? `<div class="eyebrow">Builds</div>
        <div class="line">${[...builds].reverse().map((b, i) => `${i ? '<hr>' : ''}<div class="dot" data-k="${esc(b.key)}"><i></i>${esc(b.title)}<span>${esc(b.date)}</span></div>`).join('')}</div>
        <div class="builds">${builds.map((b) => `<div class="bd2" id="b-${esc(b.key)}"><div class="t">${b.shot ? `<img src="${esc(b.shot)}" alt="" loading="lazy">` : esc(b.key)}</div>
          <div class="n">${esc(b.title)}${b.play ? `<button type="button" class="btn" data-play="${esc(b.key)}">Play</button>` : ''}<span>${esc(b.date)}</span></div></div>`).join('')}</div>` : ''}
      ${p.shots.length > 1 ? `<div class="eyebrow">Pictures</div><div class="pics">${p.shots.slice(1).map((s) => `<img src="${esc(s)}" alt="" loading="lazy">`).join('')}</div>` : ''}
    </article>`;
    app.querySelectorAll('[data-play]').forEach((btn) => btn.addEventListener('click', () => play(p, builds.find((b) => b.key === btn.dataset.play))));
    app.querySelectorAll('.line .dot').forEach((d) => d.addEventListener('click', () => document.getElementById(`b-${d.dataset.k}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })));
    app.querySelectorAll('.cover img, .pics img').forEach((img) => img.addEventListener('click', () => view(img.src)));
  }

  const player = document.getElementById('player'), frame = document.getElementById('playerFrame');
  function play(p, b) {
    document.getElementById('playerName').textContent = `${p.title} · ${b.title}`;
    document.getElementById('playerTab').href = b.play;
    frame.src = b.play; player.hidden = false;
  }
  document.getElementById('playerClose').addEventListener('click', () => { player.hidden = true; frame.src = 'about:blank'; });
  const viewer = document.getElementById('viewer');
  const view = (src) => { document.getElementById('viewerImg').src = src; viewer.hidden = false; };
  viewer.addEventListener('click', () => { viewer.hidden = true; });
  addEventListener('keydown', (e) => { if (e.key === 'Escape') { viewer.hidden = true; if (!player.hidden) document.getElementById('playerClose').click(); } });

  function route() {
    const id = decodeURIComponent(location.hash.replace(/^#\/?/, ''));
    const p = id && L.projects.find((x) => x.id === id);
    if (p) project(p); else home();
    scrollTo(0, 0);
  }
  addEventListener('hashchange', route);
  route();
})();
