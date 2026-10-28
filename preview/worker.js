// The portfolio preview: https://portfolio.varxel.dev, behind his OS login (Wiki 02, 2026-10-28; his rule: "i need everything
// online, always"). It serves frames-library.html and its files (tools/build-preview.mjs puts them in preview-dist/), and reads
// VarXec's public side live from the vault through the OS, so a Preview in VarXec shows here at once. Nothing here is public:
// going live is a step of its own (tools/build-library.mjs, then the site's publish).
// No secrets of its own: login and the vault go through the OS (service binding OS), like Salvage and Island.
const OS = 'https://os.varxel.dev';
const HOST = 'https://portfolio.varxel.dev/';
const sessionOf = (request) => (request.headers.get('Cookie') || '').match(/(?:^|;\s*)varxel_session=([^;]+)/)?.[1] || '';

const seen = new Map();
async function loggedIn(request, env) {
  const value = sessionOf(request);
  if (!value) return false;
  const hit = seen.get(value);
  if (hit && hit > Date.now()) return true;
  const res = await env.OS.fetch(new Request(`${OS}/api/apps`, { headers: { Cookie: `varxel_session=${value}`, Accept: 'application/json' } }));
  if (res.status !== 200) return false;
  seen.set(value, Date.now() + 5 * 60 * 1000);
  return true;
}
async function login(request, env) {
  if (request.method === 'POST') {
    const res = await env.OS.fetch(new Request(`${OS}/login`, { method: 'POST', headers: { 'Content-Type': request.headers.get('Content-Type') || 'application/x-www-form-urlencoded' }, body: await request.text() }));
    const h = new Headers(res.headers);
    if (res.status === 303) h.set('Location', '/');
    return new Response(res.body, { status: res.status, headers: h });
  }
  const res = await env.OS.fetch(new Request(`${OS}/login?next=/`, { headers: { Accept: 'text/html' } }));
  const page = (await res.text()).replace(/href="\/auth\/github\/start[^"]*"/g, `href="${OS}/auth/github/start?next=${encodeURIComponent(HOST)}"`);
  return new Response(page, { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } });
}
const raw = (env, request, path) => env.OS.fetch(new Request(`${OS}/api/vault/raw?path=${encodeURIComponent(path)}`, { headers: { Cookie: `varxel_session=${sessionOf(request)}` } }));

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/login') return login(request, env);
    if (!(await loggedIn(request, env))) return login(request, env);
    // VarXec's public side, as it is in the vault now.
    if (url.pathname === '/api/library') {
      const res = await raw(env, request, 'Site/public.json');
      if (!res.ok) return new Response(JSON.stringify({ projects: [] }), { status: res.status === 404 ? 200 : 502, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
      return new Response(await res.text(), { headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' } });
    }
    // The pictures the public side names: only project shots.
    if (url.pathname === '/vault') {
      const path = url.searchParams.get('path') || '';
      if (!/^Projects\/[^/]+\/shots\/[^/]+$/.test(path) || path.includes('..')) return new Response('not found', { status: 404 });
      const res = await raw(env, request, path);
      const h = new Headers(res.headers); h.set('Cache-Control', 'private, max-age=300');
      return new Response(res.body, { status: res.status, headers: h });
    }
    // The two Sasha videos are over the Workers file limit: the public site has them.
    if (url.pathname.startsWith('/assets/videos/')) return Response.redirect(`https://varxael.github.io${url.pathname}`, 302);
    if (url.pathname === '/' || url.pathname === '/index.html') return env.ASSETS.fetch(new Request(new URL('/frames-library.html', url), request));
    return env.ASSETS.fetch(request);
  },
};
