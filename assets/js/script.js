'use strict';

/* ============================================================
   STRATA // ARCHITECT  ::  portfolio engine
   Style: prototype21 (operator-HUD / blueprint-terminal).
   Content: real dataset, neutral/technical voice.
   ============================================================ */

/* ---------- CONTENT ----------
   Generated into assets/js/content.js from the Obsidian notes (tools/build-content.mjs).
   Edit the notes, not this file. */
const { profile: PROFILE, disciplines: roleDefinitions, projects: projectDetails } = window.PORTFOLIO;

/* each discipline owns a muted signal colour, so the eye can tell them apart */
const roleColors = {
  "Game Designer":           "#4fb8d4",  // blue (core)
  "Technical Game Designer": "#e0a23b",  // amber
  "Leadership":              "#b48ad6",  // lavender
  "Game Programmer":         "#5fbf9f"   // mint
};
const roleColor = r => roleColors[r] || "#4fb8d4";
const ROLE_ORDER = ["Game Designer", "Technical Game Designer", "Leadership", "Game Programmer"];
const sortRoles = (roles) => {
  if (!roles) return [];
  return [...roles].sort((a, b) => {
    const ia = ROLE_ORDER.indexOf(a), ib = ROLE_ORDER.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });
};

/* ---------- CATEGORY GROUPS ---------- */
const CATS = [
  { key: "PROFESSIONAL", label: "Professional", match: "professional work" },
  { key: "PERSONAL",     label: "Personal",     match: "personal work" },
  { key: "UNIVERSITY",   label: "University",   match: "university work" },
  { key: "JAM",          label: "Game Jam",     match: "game jams" }
];
const TIER_ORDER = { hero: 0, supporting: 1, listed: 2 };

/* Published projects, grouped + ordered per category (hero -> supporting -> listed, then year desc) */
function projectsForCat(catMatch) {
  return Object.values(projectDetails)
    .filter(p => p.published && p.category === catMatch)
    .sort((a, b) => {
      const ta = TIER_ORDER[a.tier] ?? 9, tb = TIER_ORDER[b.tier] ?? 9;
      if (ta !== tb) return ta - tb;
      return (b.year || 0) - (a.year || 0);
    });
}

/* Flat ordered list of published ids (matches DOM order) */
let ORDERED_IDS = [];
function buildOrderedIds() {
  ORDERED_IDS = [];
  CATS.forEach(c => projectsForCat(c.match).forEach(p => ORDERED_IDS.push(p.id)));
}

/* Published projects that carry a given discipline, in archive order */
function projectsForRole(role) {
  buildOrderedIds();
  return ORDERED_IDS
    .map(id => projectDetails[id])
    .filter(p => (p.roles || []).includes(role));
}

/* ---------- DOM REFS ---------- */
const navBtns = document.querySelectorAll('#main-nav button');
const listContainer = document.getElementById('proj-list');
const terminalPane = document.querySelector('.pane-terminal');
const filterBtns = document.querySelectorAll('#arc-filters button');
const disciplineChips = document.querySelectorAll('.disc-link[data-role]');

let currentState = 'overview';
let activeProjectId = null;
let activeDiscipline = null;

/* ---------- STATE MACHINE ---------- */
function setState(state) {
  currentState = state;
  navBtns.forEach(btn => btn.classList.toggle('on', btn.dataset.state === state));
  document.body.className = `state-${state}`;
  warpSpike();
  if (state !== 'discipline') { const w = $('disc-wires'); if (w) w.innerHTML = ''; }
}
/* stacked mobile shows every pane at once, so the nav scrolls to a section instead */
const MOBILE_TARGETS = { overview: null, archive: '.pane-terminal', records: '.pane-records' };
navBtns.forEach(btn => btn.addEventListener('click', () => {
  if (btn.dataset.state === 'discipline') openDiscipline(activeDiscipline || 'Game Designer');
  else setState(btn.dataset.state);
  if (window.matchMedia('(max-width:860px)').matches && btn.dataset.state in MOBILE_TARGETS) {
    const sel = MOBILE_TARGETS[btn.dataset.state];
    const bar = document.querySelector('.topbar').offsetHeight;
    window.scrollTo({ top: sel ? document.querySelector(sel).getBoundingClientRect().top + scrollY - bar - 12 : 0 });
  }
}));

/* ---------- RENDER PROJECT LIST (terminal pane) ---------- */
function renderList() {
  buildOrderedIds();
  listContainer.innerHTML = '';

  CATS.forEach(cat => {
    const items = projectsForCat(cat.match);
    if (items.length === 0) return;

    const divi = document.createElement('div');
    divi.className = 'list-divider';
    divi.id = 'cat-' + cat.key;
    divi.dataset.cat = cat.key;
    divi.textContent = cat.label;
    listContainer.appendChild(divi);

    items.forEach(p => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'list-item';
      item.dataset.id = p.id;
      item.innerHTML = `
        <div class="li-thumb"><img src="${p.image}" alt="${p.title}" loading="lazy"></div>
        <div class="li-text">
          <div class="li-meta">${p.year || ''} · ${p.role || ''}</div>
          <div class="li-title">${p.title}</div>
        </div>`;
      item.addEventListener('click', () => {
        setPreview(p.id);
        if (currentState !== 'archive') setState('archive');
        // stacked mobile: the details live far below the list, so jump there (clearing the sticky topbar)
        if (window.matchMedia('(max-width:860px)').matches) {
          const bar = document.querySelector('.topbar').offsetHeight;
          window.scrollTo({ top: $('preview-pane').getBoundingClientRect().top + scrollY - bar - 12 });
        }
      });
      listContainer.appendChild(item);
    });
  });

  if (!activeProjectId) setPreview(ORDERED_IDS[0]);
}

/* ---------- YOUTUBE HELPER ---------- */
function getYouTubeId(url) {
  if (!url) return null;
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  return m ? m[1] : null;
}

const LINK_FALLBACK = {
  game: 'Open', github: 'GitHub', gitlab: 'GitLab', doc: 'Document', school: 'Course',
  trophy: 'Award', request: 'Contact', link: 'Link'
};

/* ---------- PREVIEW PANE ---------- */
const $ = id => document.getElementById(id);

function buildContribHTML(p) {
  if (p.roleContributions && Object.keys(p.roleContributions).length) {
    return sortRoles(Object.keys(p.roleContributions)).map((r, i) => {
      const idx = String(i + 1).padStart(2, '0');
      return `<div class="role-box" style="--rc:${roleColor(r)}"><h4 class="role-head"><span class="role-idx">${idx}</span>${r}</h4>${p.roleContributions[r]}</div>`;
    }).join('');
  }
  return '';
}

function setPreview(id) {
  const p = projectDetails[id];
  if (!p) return;
  activeProjectId = id;

  listContainer.querySelectorAll('.list-item').forEach(el =>
    el.classList.toggle('active', el.dataset.id === id));

  // Media
  const media = $('prev-media');
  const ytId = getYouTubeId(p.video);
  if (p.videos && p.videos.length) {
    const list = p.videos.map((v, i) =>
      `<button class="vid-btn ${i === 0 ? 'on' : ''}" data-src="${v.file}">${v.label}</button>`).join('');
    media.innerHTML = `
      <div class="media-stage has-video" id="media-stage">
        <video id="prev-video" src="${p.videos[0].file}" poster="${p.image}" controls muted loop playsinline preload="metadata" controlsList="nodownload noremoteplayback"></video>
        <button class="media-expand" id="media-expand" title="Expand / collapse">&#x2922;</button>
      </div>
      <div class="vid-playlist">${list}</div>`;
  } else if (ytId) {
    media.innerHTML = `
      <a class="media-stage yt" href="https://www.youtube.com/watch?v=${ytId}" target="_blank" rel="noopener">
        <img src="https://img.youtube.com/vi/${ytId}/maxresdefault.jpg" alt="${p.title}"
             onerror="this.onerror=null;this.src='https://img.youtube.com/vi/${ytId}/hqdefault.jpg'">
        <span class="yt-play">&#9658; Watch video</span>
      </a>`;
  } else {
    media.innerHTML = `
      <div class="media-stage">
        <img src="${p.image}" alt="${p.title}">
      </div>`;
  }
  wireMedia();

  // Header + fields
  $('prev-cmd').textContent = p.context || '';
  $('prev-title').textContent = p.title;
  $('prev-cat').textContent = (CATS.find(c => c.match === p.category) || {}).label || p.category;
  $('prev-yr').textContent = p.year || '·';
  $('prev-eng').textContent = p.engine || p.cardEngineName || '·';
  $('prev-role').textContent = p.role || '·';

  // Synopsis + context
  $('prev-syn').textContent = p.short || '';
  $('prev-context').style.display = 'none';

  // Tools
  $('prev-tools').innerHTML = (p.tools && p.tools.length)
    ? p.tools.map(t => `<span class="tool-chip">${t.name}</span>`).join('') : '';

  // Story tab availability
  const hasStory = !!(p.story && p.story.trim());
  $('prev-tabs').innerHTML = `<button class="prev-tab on" data-tab="overview">Overview</button>` +
    (hasStory ? `<button class="prev-tab" data-tab="story">The story</button>` : '');

  // Contributions (all disciplines)
  $('prev-contrib').innerHTML = buildContribHTML(p);

  // Story content
  $('prev-story').innerHTML = p.story || '';

  // Reset tab view to overview
  $('prev-overview').style.display = '';
  $('prev-story').style.display = 'none';
  wireTabs();

  // Links
  $('prev-links').innerHTML = (p.links || []).map(l => {
    const label = l.label || LINK_FALLBACK[l.icon] || 'Open';
    if (l.url === 'request') return `<a class="btn-action" href="mailto:${PROFILE.email}">${label}</a>`;
    return `<a class="btn-action" href="${l.url}" target="_blank" rel="noopener">${label}</a>`;
  }).join('');

  // scroll preview to top on change
  const pane = document.querySelector('.pane-preview');
  if (pane) pane.scrollTop = 0;
}

function wireTabs() {
  document.querySelectorAll('.prev-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.prev-tab').forEach(t => t.classList.remove('on'));
      tab.classList.add('on');
      const story = tab.dataset.tab === 'story';
      $('prev-overview').style.display = story ? 'none' : '';
      $('prev-story').style.display = story ? '' : 'none';
    });
  });
}

function wireMedia() {
  const stage = $('media-stage');
  const video = $('prev-video');
  if (!stage || !video) return;

  // Autoplay on hover, but let the player keep its own state once the user takes over.
  stage.addEventListener('mouseenter', () => { if (video.paused) video.play().catch(() => {}); });

  const exp = $('media-expand');
  if (exp) exp.addEventListener('click', e => {
    e.stopPropagation();
    stage.classList.toggle('expanded');
    if (stage.classList.contains('expanded')) video.play().catch(() => {});
  });

  document.querySelectorAll('.vid-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.vid-btn').forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
      video.src = btn.dataset.src; video.load(); video.play().catch(() => {});
    });
  });
}

/* Magic-links inside contribution text (Sasha) switch + play the inline video */
document.addEventListener('click', e => {
  const ml = e.target.closest('.magic-link');
  if (!ml) return;
  e.preventDefault();
  const src = ml.getAttribute('data-src');
  const video = $('prev-video');
  const stage = $('media-stage');
  if (video && src) {
    document.querySelectorAll('.vid-btn').forEach(b => b.classList.toggle('on', b.dataset.src === src));
    video.src = src; video.load(); video.play().catch(() => {});
    if (stage) { stage.classList.add('expanded'); stage.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
  }
});

/* ---------- ARCHIVE CATEGORY FILTERS (scroll-to + scroll-spy) ---------- */
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const el = document.getElementById('cat-' + btn.dataset.cat);
    if (el) terminalPane.scrollTo({ top: el.offsetTop - 60, behavior: 'smooth' });
  });
});
terminalPane.addEventListener('scroll', () => {
  if (currentState !== 'archive') return;
  const dividers = [...document.querySelectorAll('.list-divider')];
  let current = dividers[0];
  for (const d of dividers) if (d.offsetTop - terminalPane.scrollTop <= 160) current = d;
  if (current) filterBtns.forEach(b => b.classList.toggle('on', b.dataset.cat === current.dataset.cat));
});

/* ============================================================
   DISCIPLINE LENS (left-morph page)
   ============================================================ */
const discRail = $('disc-rail');
const discProjects = $('disc-projects');
const discFeedWrap = $('disc-feed-wrap');
const discWires = $('disc-wires');

function renderDiscipline(role) {
  activeDiscipline = role;
  const def = roleDefinitions[role];
  if (!def) return;

  // keep the overview chips in sync for continuity
  disciplineChips.forEach(c => c.classList.toggle('on', c.dataset.role === role));

  const rc = roleColor(role);
  if (discWires) discWires.style.setProperty('--rc', rc);

  // rail (vertical selector, vertically centred on the right)
  discRail.innerHTML = ROLE_ORDER.map(r => {
    const n = projectsForRole(r).length;
    return `<button class="disc-tab ${r === role ? 'on' : ''}" data-role="${r}" style="--rc:${roleColor(r)}">
      <span class="dt-dot"></span><span class="dt-name">${roleDefinitions[r].title}</span><span class="dt-n">${String(n).padStart(2, '0')}</span>
    </button>`;
  }).join('');
  discRail.querySelectorAll('.disc-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      if (tab.dataset.role === activeDiscipline) { setState('overview'); return; }
      renderDiscipline(tab.dataset.role);
    });
  });

  $('disc-title').textContent = def.title;
  $('disc-desc').textContent = def.description;

  const list = projectsForRole(role);
  $('disc-count').textContent = `${list.length} project${list.length === 1 ? '' : 's'}`;

  discProjects.innerHTML = list.map((p, i) => {
    const contrib = (p.roleContributions && p.roleContributions[role]) || '';
    const catLabel = (CATS.find(c => c.match === p.category) || {}).label || p.category;
    const tools = (p.tools || []).map(t => `<span class="dp-tool">${t.name}</span>`).join('');
    return `
      <div class="disc-card" style="--i:${i};--rc:${rc}">
        <span class="dp-port" aria-hidden="true"></span>
        <div class="dp-head">
          <div class="dp-thumb"><img src="${p.image}" alt="${p.title}" loading="lazy"></div>
          <div class="dp-id">
            <div class="dp-meta">${catLabel} · ${p.year || ''}</div>
            <h3 class="dp-title">${p.title}</h3>
            <div class="dp-role">${p.role || ''}</div>
          </div>
        </div>
        <div class="dp-tag">${def.title}</div>
        <div class="dp-body">${contrib || '<p class="dp-empty">Implementation details available on request.</p>'}</div>
        <div class="dp-foot">
          <div class="dp-tools">${tools}</div>
          <button class="dp-open" data-id="${p.id}">Open project &#x2192;</button>
        </div>
      </div>`;
  }).join('');

  discProjects.querySelectorAll('.dp-open').forEach(btn => {
    btn.addEventListener('click', () => {
      setPreview(btn.dataset.id);
      setState('archive');
    });
  });

  if (discFeedWrap) discFeedWrap.scrollTop = 0;
  syncWires(950);
}

/* keep the amber emitter aligned with the active discipline in the rail */
function positionEmitter() {
  const side = document.querySelector('.disc-side');
  const emitter = $('disc-emitter');
  const active = discRail.querySelector('.disc-tab.on');
  if (!side || !emitter || !active) return;
  const sr = side.getBoundingClientRect(), ar = active.getBoundingClientRect();
  emitter.style.top = (ar.top - sr.top + ar.height / 2) + 'px';
}

/* ---- live connector traces: emitter (right) fans out to each module port (left) ---- */
function drawWires() {
  const pane = document.querySelector('.pane-discipline');
  const emitter = $('disc-emitter');
  if (!pane || !discWires || !emitter) return;
  if (currentState !== 'discipline') { discWires.innerHTML = ''; return; }
  positionEmitter();

  const pr = pane.getBoundingClientRect();
  if (pr.width < 4) return;
  discWires.setAttribute('viewBox', `0 0 ${pr.width} ${pr.height}`);

  const er = emitter.getBoundingClientRect();
  const sx = er.left - pr.left + er.width / 2;
  const sy = er.top - pr.top + er.height / 2;

  const topClip = 64, botClip = pr.height - 16;
  let inner = '';
  discProjects.querySelectorAll('.dp-port').forEach(port => {
    const rr = port.getBoundingClientRect();
    const tx = rr.left - pr.left + rr.width / 2;
    const ty = rr.top - pr.top + rr.height / 2;
    const live = ty > topClip && ty < botClip;
    port.classList.toggle('live', live);
    if (!live) return;
    const dx = Math.abs(sx - tx);
    const c1 = sx - dx * 0.5, c2 = tx + dx * 0.5;
    inner += `<path class="wire" d="M ${sx} ${sy} C ${c1} ${sy}, ${c2} ${ty}, ${tx} ${ty}"/>`;
    inner += `<circle class="wend" cx="${tx}" cy="${ty}" r="2.6"/>`;
  });
  inner += `<circle class="wsrc-glow" cx="${sx}" cy="${sy}" r="11"/><circle class="wsrc" cx="${sx}" cy="${sy}" r="4.5"/>`;
  discWires.innerHTML = inner;
}

/* redraw across the morph transition so the cables track the moving layout */
function syncWires(ms) {
  const end = performance.now() + (ms || 0);
  const tick = () => {
    if (currentState !== 'discipline') return;
    drawWires();
    if (performance.now() < end) setTimeout(tick, 40);
  };
  tick();
}

if (discFeedWrap) discFeedWrap.addEventListener('scroll', drawWires, { passive: true });
addEventListener('resize', () => { if (currentState === 'discipline') drawWires(); });

function openDiscipline(role) {
  // On stacked mobile the lens page is hidden; keep the chips inert there.
  if (window.matchMedia('(max-width:860px)').matches) return;
  setState('discipline');   // flip currentState first so the wire loop runs
  renderDiscipline(role);   // builds the DOM and kicks off syncWires()
}
disciplineChips.forEach(chip => chip.addEventListener('click', () => openDiscipline(chip.dataset.role)));

const discBack = $('disc-back');
if (discBack) discBack.addEventListener('click', () => {
  disciplineChips.forEach(c => c.classList.remove('on'));
  setState('overview');
});

/* ---------- COPY EMAIL ---------- */
const copyBtn = $('copy-email');
if (copyBtn) copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(PROFILE.email).then(() => {
    const msg = $('copymsg');
    msg.style.opacity = 1;
    setTimeout(() => msg.style.opacity = 0, 2000);
  }).catch(() => {});
});

/* ---------- INIT ---------- */
renderList();

/* ============================================================
   BACKGROUND CANVAS :: the nervous system (cleaned from p21)
   ============================================================ */
const cv = $('bg'), g = cv.getContext('2d');
let W, H, CY, R, t = 0, warp = 0;
let mx = 0.5, my = 0.5, pmx = 0.5, pmy = 0.5;
const pulses = [];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let targetCX = 0, animCX = 0, animRMult = 1.0;

function resize() {
  W = cv.width = innerWidth; H = cv.height = innerHeight;
  CY = H * 0.52; R = Math.min(W, H) * 0.34;
  if (!animCX) animCX = W / 2;
}
addEventListener('resize', resize); resize();

addEventListener('mousemove', e => {
  mx = e.clientX / W; my = e.clientY / H;
  if (reduceMotion) return;
});

function warpSpike() {
  warp = 1.2;
}
function spawnPulse() { pulses.push({ r: R * 0.18, life: 1 }); }

const RINGS = [0.42, 0.66, 0.85, 1.0];
const SPOKES = 12;
function poly(n, rad, rot, ox, oy) {
  g.beginPath();
  for (let i = 0; i <= n; i++) {
    const a = rot + i / n * Math.PI * 2;
    g.lineTo(animCX + ox + Math.cos(a) * rad, CY + oy + Math.sin(a) * rad);
  }
  g.stroke();
}

/* Derive the archive-state canvas centre from the actual terminal pane width
   instead of a hard-coded fraction. */
function archiveTargetCX() {
  if (!terminalPane) return W * 0.62;
  const rect = terminalPane.getBoundingClientRect();
  const previewLeft = rect.right + 40;
  return previewLeft + (W - previewLeft) / 2;
}

function draw() {
  if (W !== innerWidth || H !== innerHeight) resize();
  t += 1; warp *= 0.92;

  let targetRMult = 1.0, targetCamX = 0;
  if (currentState === 'overview')        { targetCX = W * -0.05; targetRMult = 2.4; targetCamX = 0; }
  else if (currentState === 'discipline') { targetCX = W * 0.8;   targetRMult = 1.7; targetCamX = -0.15; }
  else if (currentState === 'archive')    { targetCX = archiveTargetCX(); targetRMult = 1.0; targetCamX = 0.2; }
  else                                    { targetCX = W * 0.5; targetRMult = 1.0; targetCamX = 0.4; }

  // the lens page keeps a calm heartbeat: an occasional pulse, no spin boost
  if (currentState === 'discipline' && t % 150 === 0 && pulses.length < 3) spawnPulse();

  animCX += (targetCX - animCX) * 0.03;
  animRMult += (targetRMult - animRMult) * 0.03;
  const currentR = R * animRMult;

  const px = (mx - 0.5 - targetCamX) * 40;
  pmx += (mx - pmx) * 0.04; pmy += (my - pmy) * 0.04;
  const py = (pmy - 0.5) * 40;
  const breath = Math.sin(t * 0.012) * 0.5 + 0.5;
  g.clearRect(0, 0, W, H);

  const ink = a => `rgba(232,230,224,${a})`;
  const blue = a => `rgba(79,184,212,${a})`;

  g.lineWidth = 1;
  for (let i = 0; i < 5; i++) {
    const yy = CY + (i - 2) * 140 - py * 2.2;
    g.strokeStyle = ink(0.03 + 0.015 * Math.sin(t * 0.008 + i));
    g.beginPath(); g.moveTo(0, yy + (i % 2 ? 40 : -40)); g.lineTo(W, yy); g.stroke();
  }
  for (let i = -3; i <= 3; i++) {
    g.strokeStyle = ink(0.025); g.beginPath();
    g.moveTo((W / 2) + i * 200 - px * 1.6, 0); g.lineTo((W / 2) + i * 60 - px * 1.6, H); g.stroke();
  }

  const rot = t * 0.0016 * (1 + warp * 6);
  RINGS.forEach((rk, i) => {
    const rad = currentR * rk * (1 + breath * 0.012 * (i + 1));
    g.strokeStyle = ink(0.07 + 0.05 * (i === 1 ? 1 : 0.4) + warp * 0.15);
    g.beginPath(); g.arc(animCX + px, CY + py, rad, 0, Math.PI * 2); g.stroke();
  });

  g.save(); g.setLineDash([2, 10]); g.strokeStyle = ink(0.06 + warp * 0.1);
  for (let i = 0; i < SPOKES; i++) {
    const a = rot + i / SPOKES * Math.PI * 2;
    g.beginPath();
    g.moveTo(animCX + px + Math.cos(a) * currentR * 0.42, CY + py + Math.sin(a) * currentR * 0.42);
    g.lineTo(animCX + px + Math.cos(a) * currentR, CY + py + Math.sin(a) * currentR); g.stroke();
  }
  g.restore();

  g.strokeStyle = ink(0.08 + warp * 0.12); g.lineWidth = 1;
  poly(3, currentR * 0.66, -rot * 1.4, px, py);
  poly(3, currentR * 0.66, -rot * 1.4 + Math.PI, px, py);
  g.strokeStyle = blue(0.10 + warp * 0.3);
  poly(SPOKES, currentR * 0.85, rot * 0.8, px, py);

  for (let i = 0; i < SPOKES; i++) {
    const a = rot + i / SPOKES * Math.PI * 2;
    const lit = i % 3 === 0; const rr = currentR * (lit ? 0.85 : 0.66);
    const x = animCX + px + Math.cos(a) * rr, y = CY + py + Math.sin(a) * rr;
    const pul = 0.5 + 0.5 * Math.sin(t * 0.05 + i);
    g.fillStyle = lit ? blue(0.5 + pul * 0.4) : ink(0.18 + pul * 0.15);
    g.beginPath(); g.arc(x, y, lit ? 2.4 : 1.4, 0, Math.PI * 2); g.fill();
  }

  g.fillStyle = blue(0.4 + breath * 0.4 + warp * 0.4);
  g.beginPath(); g.arc(animCX + px, CY + py, 2.6 + breath * 1.5, 0, Math.PI * 2); g.fill();

  for (let k = pulses.length - 1; k >= 0; k--) {
    const pp = pulses[k]; pp.r += 6; pp.life -= 0.012;
    if (pp.life <= 0) { pulses.splice(k, 1); continue; }
    g.strokeStyle = blue(pp.life * 0.6); g.lineWidth = 1.5;
    g.beginPath(); g.arc(animCX + px, CY + py, pp.r, 0, Math.PI * 2); g.stroke();
  }
  requestAnimationFrame(draw);
}
draw();
setInterval(() => { if (pulses.length < 3) spawnPulse(); }, 4200);
