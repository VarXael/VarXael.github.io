'use strict';
/* ============================================================
   fl0w // THE DESCENT  ::  interaction engine
   You are a specimen. You sink through the depth column; the work
   lives down there, drifting, and lights up when you observe it.
   Content + detail-building come from script.js (loaded first).
   ============================================================ */
(function () {
  const D = id => document.getElementById(id);
  const SLUG = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  buildOrderedIds();
  const world = D('world');
  const zoneEls = [...world.querySelectorAll('.zone')];

  /* ---------------- specimen creatures ---------------- */
  function creatureSVG(spikes, rings) {
    const cx = 60, cy = 60; let s = '';
    for (let i = 0; i < rings; i++) {
      const r = 16 + i * 12, dash = i === 1 ? 'stroke-dasharray="3 7"' : '';
      s += `<circle cx="${cx}" cy="${cy}" r="${r}" class="cr-ring" ${dash}/>`;
    }
    for (let i = 0; i < spikes; i++) {
      const a = i / spikes * Math.PI * 2 - Math.PI / 2, r1 = 13, r2 = 52;
      s += `<line x1="${(cx + Math.cos(a) * r1).toFixed(1)}" y1="${(cy + Math.sin(a) * r1).toFixed(1)}" x2="${(cx + Math.cos(a) * r2).toFixed(1)}" y2="${(cy + Math.sin(a) * r2).toFixed(1)}" class="cr-spike"/>`;
      s += `<circle cx="${(cx + Math.cos(a) * r2).toFixed(1)}" cy="${(cy + Math.sin(a) * r2).toFixed(1)}" r="1.8" class="cr-node"/>`;
    }
    s += `<circle cx="${cx}" cy="${cy}" r="4.5" class="cr-core"/>`;
    return `<svg class="creature" viewBox="0 0 120 120" aria-hidden="true">${s}</svg>`;
  }

  CATS.forEach(cat => {
    const field = world.querySelector(`.bloom-field[data-cat="${cat.key}"]`);
    if (!field) return;
    field.innerHTML = projectsForCat(cat.match).map(p => {
      const roles = (p.roles || []).map(SLUG).join(' ');
      const hue = roleColor((p.roles || [])[0] || 'Game Designer');
      const spikes = clamp((p.roles || []).length * 2 + 3, 5, 11);
      const rings = p.tier === 'hero' ? 4 : p.tier === 'supporting' ? 3 : 2;
      const size = p.tier === 'hero' ? 1 : p.tier === 'supporting' ? 0.85 : 0.72;
      return `<button class="specimen" data-id="${p.id}" data-roles="${roles}"
        style="--rc:${hue};--sz:${size};--d:${(Math.random() * 4).toFixed(2)}s;--dur:${(7 + Math.random() * 5).toFixed(2)}s">
        <span class="sp-creature">${creatureSVG(spikes, rings)}</span>
        <span class="sp-label"><span class="sp-name">${p.title}</span><span class="sp-meta">${p.year || ''}</span></span>
      </button>`;
    }).join('');
  });

  /* ---------------- sonar depth map ---------------- */
  const sonar = D('sonar');
  sonar.innerHTML = zoneEls.map((z, i) =>
    `<button class="sonar-node" data-i="${i}" title="${z.dataset.label}"><span class="sn-label">${z.dataset.label}</span><span class="sn-tick"></span></button>`
  ).join('') + `<span class="sonar-line"></span><span class="sonar-marker" id="sonar-marker"></span>`;
  sonar.querySelectorAll('.sonar-node').forEach(n => n.addEventListener('click', () => glideToZone(+n.dataset.i)));

  /* ---------------- trait spectrum (illuminate by trait) ---------------- */
  const spectrum = D('spectrum');
  spectrum.innerHTML = ROLE_ORDER.map(r =>
    `<button class="spec-light" data-role="${r}" data-slug="${SLUG(r)}" style="--rc:${roleColor(r)}"><span class="sl-dot"></span><span class="sl-name">${roleDefinitions[r].title}</span><span class="sl-n">${projectsForRole(r).length}</span></button>`
  ).join('');
  const LIT_CLASSES = ROLE_ORDER.map(r => 'lit-' + SLUG(r));
  let activeTrait = null;
  spectrum.querySelectorAll('.spec-light').forEach(b => b.addEventListener('click', () => {
    const slug = b.dataset.slug;
    activeTrait = (activeTrait === slug) ? null : slug;
    document.body.classList.remove(...LIT_CLASSES);
    spectrum.querySelectorAll('.spec-light').forEach(x => x.classList.toggle('on', x.dataset.slug === activeTrait));
    const hint = D('spectrum-hint');
    if (activeTrait) {
      document.body.classList.add('lit-' + activeTrait);
      const role = b.dataset.role;
      hint.innerHTML = `<b>ILLUMINATING</b> ${roleDefinitions[role].title} &middot; ${projectsForRole(role).length} fluoresce`;
      hint.classList.add('on');
    } else hint.classList.remove('on');
  }));

  /* ---------------- bloom (observation) ---------------- */
  const bloom = D('bloom');
  function openBloom(id) {
    setPreview(id);
    bloom.classList.add('open');
    bloom.setAttribute('aria-hidden', 'false');
    flash();
    if (activeTrait) requestAnimationFrame(() => {
      bloom.querySelectorAll('.role-box').forEach(rb => rb.classList.remove('keyed'));
      const head = [...bloom.querySelectorAll('.role-box .role-head')]
        .find(h => SLUG(h.textContent.replace(/^\s*\d+/, '').trim()) === activeTrait);
      if (head) { head.closest('.role-box').classList.add('keyed'); head.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    });
  }
  function closeBloom() {
    bloom.classList.remove('open');
    bloom.setAttribute('aria-hidden', 'true');
    const v = D('prev-video'); if (v) v.pause();
  }
  document.addEventListener('click', e => {
    const sp = e.target.closest('.specimen');
    if (sp) openBloom(sp.dataset.id);
  });
  D('bloom-close').addEventListener('click', closeBloom);
  D('bloom-scrim').addEventListener('click', closeBloom);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeBloom(); });

  /* ---------------- copy email ---------------- */
  const copyBtn = D('copy-email');
  if (copyBtn) copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('giuseppeluigi.alfieri@gmail.com').then(() => {
      const m = D('copymsg'); m.style.opacity = 1; setTimeout(() => m.style.opacity = 0, 2000);
    }).catch(() => {});
  });

  /* ============================================================
     SWIM CAMERA — sink through the depth column
     ============================================================ */
  let camY = 0, targetCam = 0, viewH = innerHeight, maxCam = 1, depth01 = 0;

  function layout() {
    viewH = innerHeight;
    maxCam = Math.max(1, world.scrollHeight - viewH);
    targetCam = clamp(targetCam, 0, maxCam);
  }
  function zoneTarget(i) {
    const z = zoneEls[i];
    return clamp(z.offsetTop + z.offsetHeight / 2 - viewH / 2, 0, maxCam);
  }
  function glideToZone(i) { targetCam = zoneTarget(i); }
  const bloomOpen = () => bloom.classList.contains('open');

  addEventListener('wheel', e => { if (bloomOpen()) return; targetCam = clamp(targetCam + e.deltaY * 0.85, 0, maxCam); }, { passive: true });

  let dragging = false, lastY = 0;
  addEventListener('pointerdown', e => {
    if (bloomOpen() || e.target.closest('.specimen,.sonar,.spectrum,.bloom,button,a,video,input')) return;
    dragging = true; lastY = e.clientY; document.body.classList.add('grabbing');
  });
  addEventListener('pointermove', e => {
    if (!dragging) return;
    targetCam = clamp(targetCam - (e.clientY - lastY) * 1.5, 0, maxCam); lastY = e.clientY;
  });
  addEventListener('pointerup', () => { dragging = false; document.body.classList.remove('grabbing'); });
  addEventListener('keydown', e => {
    if (bloomOpen()) return;
    if (['ArrowDown', 'PageDown', ' '].includes(e.key)) { targetCam = clamp(targetCam + viewH * 0.6, 0, maxCam); e.preventDefault(); }
    else if (['ArrowUp', 'PageUp'].includes(e.key)) { targetCam = clamp(targetCam - viewH * 0.6, 0, maxCam); e.preventDefault(); }
    else if (e.key === 'Home') targetCam = 0;
    else if (e.key === 'End') targetCam = maxCam;
  });

  function updateCamera() {
    camY += (targetCam - camY) * 0.085;
    if (Math.abs(targetCam - camY) < 0.4) camY = targetCam;
    world.style.transform = `translate3d(0, ${(-camY).toFixed(2)}px, 0)`;
    depth01 = camY / maxCam;
    const dm = D('depth'); if (dm) dm.textContent = Math.round(depth01 * 2400) + 'M';
    const mk = D('sonar-marker'); if (mk) mk.style.top = (6 + depth01 * 88) + '%';
    D('depth-fog').style.opacity = (0.12 + depth01 * 0.62).toFixed(3);
    let best = 0, bestD = 1e9;
    zoneEls.forEach((z, i) => { const d = Math.abs((z.offsetTop + z.offsetHeight / 2) - (camY + viewH / 2)); if (d < bestD) { bestD = d; best = i; } });
    sonar.querySelectorAll('.sonar-node').forEach((n, i) => n.classList.toggle('on', i === best));
    document.body.classList.toggle('descended', camY > 40);
  }

  /* ============================================================
     THE SEA — ambient canvas + your cursor-creature
     ============================================================ */
  const cv = D('bg'), g = cv.getContext('2d');
  let W, H, t = 0, flashv = 0;
  let mx = innerWidth / 2, my = innerHeight / 2, cax = mx, cay = my, pmx = 0.5, pmy = 0.5;
  const trail = [], plankton = [], drifters = [], pulses = [];
  const LUM = a => `rgba(180,230,255,${a})`;
  const HUES = [[255, 210, 122], [230, 168, 255], [125, 255, 208]];
  const pColor = (hv, a) => hv > 0.85 ? `rgba(${HUES[Math.floor(hv * 53) % 3].join(',')},${a})` : LUM(a);

  function seed() {
    plankton.length = 0; drifters.length = 0;
    const N = Math.min(160, Math.round((W * H) / 20000));
    for (let i = 0; i < N; i++) plankton.push({ x: Math.random() * W, y: Math.random() * H, z: Math.random(), r: 0.5 + Math.random() * 1.8, ph: Math.random() * 6.28, vx: -0.05 + Math.random() * 0.1, vy: -0.05 - Math.random() * 0.18, hue: Math.random() });
    for (let i = 0; i < 5; i++) drifters.push({ x: Math.random() * W, y: Math.random() * H, s: 0.14 + Math.random() * 0.3, rot: Math.random() * 6.28, spin: (-1 + Math.random() * 2) * 0.0005, vx: -0.04 + Math.random() * 0.08, vy: -0.03 - Math.random() * 0.05, spikes: 6 + Math.floor(Math.random() * 5), seed: Math.random() * 99 });
  }
  function resize() { W = cv.width = innerWidth; H = cv.height = innerHeight; seed(); layout(); }
  addEventListener('resize', resize);
  addEventListener('load', () => setTimeout(layout, 60));
  addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; const r = D('ret'); if (r) { r.style.left = mx + 'px'; r.style.top = my + 'px'; } });

  function flash() { flashv = 1; const tl = D('tlink'); if (tl) { tl.textContent = 'PULSE'; setTimeout(() => tl.textContent = 'ACTIVE', 800); } pulses.push({ x: cax, y: cay, r: 6, life: 1 }); }

  function radiolaria(cx, cy, rad, rot, op) {
    [1, 0.74, 0.5, 0.28].forEach((rk, i) => { g.lineWidth = i === 1 ? 1.1 : 0.7; if (i === 1) g.setLineDash([3, 8]); else g.setLineDash([]); g.strokeStyle = LUM(op * (0.16 + 0.08 * (i === 1 ? 1 : 0.5))); g.beginPath(); g.arc(cx, cy, rad * rk, 0, 6.2832); g.stroke(); });
    g.setLineDash([]);
    for (let i = 0; i < 12; i++) {
      const a = rot + i / 12 * 6.2832, x1 = cx + Math.cos(a) * rad * 0.28, y1 = cy + Math.sin(a) * rad * 0.28, x2 = cx + Math.cos(a) * rad * 1.14, y2 = cy + Math.sin(a) * rad * 1.14;
      const gr = g.createLinearGradient(x1, y1, x2, y2); gr.addColorStop(0, LUM(0)); gr.addColorStop(.5, LUM(op * 0.2)); gr.addColorStop(1, LUM(0));
      g.strokeStyle = gr; g.lineWidth = 0.8; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke();
      const pul = 0.5 + 0.5 * Math.sin(t * 0.04 + i); g.fillStyle = LUM(op * (0.25 + 0.4 * pul)); g.beginPath(); g.arc(cx + Math.cos(a) * rad, cy + Math.sin(a) * rad, 1.3, 0, 6.2832); g.fill();
    }
    const cg = g.createRadialGradient(cx, cy, 0, cx, cy, rad * 0.55); cg.addColorStop(0, LUM(op * 0.3)); cg.addColorStop(1, LUM(0)); g.fillStyle = cg; g.beginPath(); g.arc(cx, cy, rad * 0.55, 0, 6.2832); g.fill();
    g.fillStyle = LUM(op * 0.8); g.beginPath(); g.arc(cx, cy, 2.2, 0, 6.2832); g.fill();
  }
  function drifterDraw(cx, cy, rad, rot, op, N) {
    g.lineWidth = 0.7; g.strokeStyle = LUM(op * 0.12); g.beginPath(); g.arc(cx, cy, rad, 0, 6.2832); g.stroke(); g.beginPath(); g.arc(cx, cy, rad * 0.58, 0, 6.2832); g.stroke();
    for (let i = 0; i < N; i++) { const a = rot + i / N * 6.2832; g.strokeStyle = LUM(op * 0.1); g.beginPath(); g.moveTo(cx + Math.cos(a) * rad * 0.3, cy + Math.sin(a) * rad * 0.3); g.lineTo(cx + Math.cos(a) * rad * 1.05, cy + Math.sin(a) * rad * 1.05); g.stroke(); }
    g.fillStyle = LUM(op * 0.3); g.beginPath(); g.arc(cx, cy, 1.2, 0, 6.2832); g.fill();
  }
  function godrays(px, fade) {
    if (fade <= 0.02) return;
    for (let i = 0; i < 3; i++) {
      const sway = Math.sin(t * 0.004 + i * 2.1) * 36, x = W * (0.4 + i * 0.22) + sway + px * 0.4;
      const gr = g.createLinearGradient(x, 0, x - 160, H); gr.addColorStop(0, LUM(0.05 * fade)); gr.addColorStop(1, LUM(0)); g.fillStyle = gr;
      g.beginPath(); g.moveTo(x - 40, 0); g.lineTo(x + 55, 0); g.lineTo(x - 130, H); g.lineTo(x - 225, H); g.closePath(); g.fill();
    }
  }
  function cursorCreature() {
    cax += (mx - cax) * 0.14; cay += (my - cay) * 0.14;
    trail.push({ x: cax, y: cay }); if (trail.length > 20) trail.shift();
    g.lineWidth = 1.4;
    for (let i = 1; i < trail.length; i++) { const a = i / trail.length; g.strokeStyle = LUM(a * 0.22); g.beginPath(); g.moveTo(trail[i - 1].x, trail[i - 1].y); g.lineTo(trail[i].x, trail[i].y); g.stroke(); }
    const gl = g.createRadialGradient(cax, cay, 0, cax, cay, 80); gl.addColorStop(0, LUM(0.06)); gl.addColorStop(1, LUM(0)); g.fillStyle = gl; g.beginPath(); g.arc(cax, cay, 80, 0, 6.2832); g.fill();
    radiolaria(cax, cay, 11, t * 0.02, 0.9);
  }

  function frame() {
    if (W !== innerWidth || H !== innerHeight) resize();
    t++; flashv *= 0.94;
    updateCamera();

    pmx += (mx / W - pmx) * 0.04; pmy += (my / H - pmy) * 0.04;
    const px = (pmx - 0.5) * 40, py = (pmy - 0.5) * 40;
    const surfaceFade = Math.max(0, 1 - depth01 * 1.6);

    g.clearRect(0, 0, W, H);
    g.globalCompositeOperation = 'lighter';

    godrays(px, surfaceFade);

    for (const p of plankton) {
      p.x += p.vx * (0.4 + p.z); p.y += p.vy * (0.4 + p.z);
      if (p.y < -12) { p.y = H + 12; p.x = Math.random() * W; } if (p.x < -12) p.x = W + 12; else if (p.x > W + 12) p.x = -12;
      const par = p.z - 0.5, x = p.x + px * par * 1.6, y = p.y + py * par * 1.6, tw = 0.4 + 0.6 * Math.sin(t * 0.03 + p.ph);
      g.fillStyle = pColor(p.hue, (0.1 + 0.45 * p.z) * tw); g.beginPath(); g.arc(x, y, p.r * (0.6 + p.z), 0, 6.2832); g.fill();
    }
    const baseR = Math.min(W, H) * 0.32;
    for (const d of drifters) {
      d.x += d.vx; d.y += d.vy; d.rot += d.spin;
      if (d.y < -260) d.y = H + 260; if (d.x < -260) d.x = W + 260; else if (d.x > W + 260) d.x = -260;
      drifterDraw(d.x + px * 0.5, d.y + py * 0.5 + Math.sin(t * 0.01 + d.seed) * 8, baseR * d.s, d.rot, 0.5, d.spikes);
    }
    if (surfaceFade > 0.02) radiolaria(W * 0.78 + px, H * 0.46 + py + Math.sin(t * 0.012) * 12, baseR * (1.2 - depth01 * 0.4), t * 0.0009, surfaceFade * (1 + flashv * 0.5));

    cursorCreature();

    for (let k = pulses.length - 1; k >= 0; k--) { const pp = pulses[k]; pp.r += 2.6; pp.life -= 0.012; if (pp.life <= 0) { pulses.splice(k, 1); continue; } g.strokeStyle = LUM(pp.life * 0.4); g.lineWidth = 1; g.beginPath(); g.arc(pp.x, pp.y, pp.r, 0, 6.2832); g.stroke(); }

    g.globalCompositeOperation = 'source-over';
    schedule();
  }
  // rAF when visible (smooth); a slow timer when hidden so the scene never freezes.
  function schedule() { document.hidden ? setTimeout(frame, 250) : requestAnimationFrame(frame); }

  resize();
  layout();
  frame();
})();
