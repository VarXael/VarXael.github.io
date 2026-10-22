// FRAMES layout engine — a page is a map of window id -> rect. Switching pages morphs every window to its new rect.
// Rects: [x, y, w, h] in px relative to the desk, or null to hide (window collapses toward `collapseTo`).
// Usage:
//   const fr = Frames(document.querySelector('.fr-desk'), { pages, render });
//   fr.go('work');
// `pages[name](W, H)` returns { winId: { rect, kind, key } }. `render(winId, kind, key, bodyEl)` fills the window.
// When a window's kind|key changes it fades its content out, morphs, then renders + fades in ("swap").
// When only the key changes inside the same kind, the window does a quick outline pulse ("recal").
function Frames(desk, { pages, render, gap = 12 }) {
  const wins = {}, ck = {};
  let current = null;
  const make = id => {
    const el = document.createElement('section');
    el.className = 'fr-win is-hidden';
    el.innerHTML = '<span class="fr-c"></span><span class="fr-c"></span><span class="fr-c"></span><span class="fr-c"></span><div class="fr-body"></div>';
    desk.appendChild(el); return (wins[id] = el);
  };
  const place = (el, r) => { el.style.left = r[0] + 'px'; el.style.top = r[1] + 'px'; el.style.width = Math.max(0, r[2]) + 'px'; el.style.height = Math.max(0, r[3]) + 'px'; };
  const ms = v => parseFloat(getComputedStyle(document.documentElement).getPropertyValue(v)) * 1000 || 300;

  function layout(name, animate = true) {
    const W = desk.clientWidth, H = desk.clientHeight, spec = pages[name](W, H, gap);
    Object.keys(wins).concat(Object.keys(spec)).forEach(id => {
      const el = wins[id] || make(id), s = spec[id], body = el.lastElementChild;
      if (!s || !s.rect) { el.classList.add('is-hidden'); ck[id] = null; return; }
      const next = s.kind + '|' + (s.key || ''), prev = ck[id];
      el.classList.remove('is-hidden'); place(el, s.rect);
      if (prev === next) return;
      ck[id] = next;
      if (!animate || !prev) { render(id, s.kind, s.key, body); return; }
      if (prev.split('|')[0] === s.kind) { // same kind, new key: recalibrate
        el.classList.add('is-recal'); render(id, s.kind, s.key, body);
        setTimeout(() => el.classList.remove('is-recal'), 160); return;
      }
      el.classList.add('is-swapping');
      setTimeout(() => { render(id, s.kind, s.key, body); el.classList.remove('is-swapping'); }, ms('--fr-fade') + ms('--fr-move') * .5);
    });
    current = name;
  }
  new ResizeObserver(() => current && layout(current, false)).observe(desk);
  return { go: name => layout(name), get page() { return current; } };
}
if (typeof module !== 'undefined') module.exports = { Frames };
