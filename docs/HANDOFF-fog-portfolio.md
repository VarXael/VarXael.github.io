# Handoff: Fog portfolio (branch `fog-portfolio`)

Last updated 2026-10-13. Read this first if you are an AI picking the work up.

## What Giuseppe decided
- Style: **dark Fog** (pale-catalogue look, dark by default, light toggle). Fonts Bodoni Moda / Hanken Grotesk / Martian Mono. Accent #e0796e.
- The portfolio **documents** projects, it does not sell them. Own page per project. Every version has its own page: summary, big gallery (full-screen viewer), what changed, Play in browser + Windows per build.
- "Writing" is framed as **Process** (media-first notes that link to builds).
- No design "open questions" on public pages. Big, easy-to-see images.
- Wiki (private, whole vault) and portfolio (public, allowlist only) stay separate.
- Mockups he liked are in `Prototypes/` (untracked): `mockup-docs-sasha.html` is the target design for project/version pages; `mockup-catalogue-current.html` / `portfolio-fog.html` for the home.

## Done
1. **Leak fix** (committed on `content-pipeline`, b8bab3d): `npm run publish` builds only an allowlist (`tools/build-site.mjs` -> `site-dist/`) and force-pushes it as one fresh commit to the public lab repo `VarXael/VarXel-Lab`. Source is backed up to the PRIVATE repo `VarXael/Portfolio-Source` (remote `source`, all 9 branches). Lab repo already replaced and verified live.
   - Still open: the public repo `VarXael/VarXael.github.io` still has branch `content-pipeline` (source visible). Deleting it was refused by the safety filter; Giuseppe has not decided. It is backed up in `source`.
2. **Wiki** (`D:/Game Development Projects/VarXel-Wiki`): restyled in dark Fog and DEPLOYED. Download fix for private-repo Windows builds is in code (Worker `/download/` route) but needs Giuseppe to run `npx wrangler secret put GITHUB_TOKEN` (fine-grained token, Contents read-only; see its HANDBOOK). Wiki changes are NOT committed.
3. **This branch `fog-portfolio`** (from content-pipeline):
   - `tools/build-docs.mjs`: reads `assets/js/content.js`, vault `Projects/<Title>/logs/` (versions = logs titled vN), `shots/` (images matched by "vN" in the file name, or `shotAliases` in `content.config.json`), public web builds (`play/<id>/<slug>/`) and private releases from the wiki cache (`VarXel-Wiki/.cache/wiki.json`, linked to the wiki). Writes `assets/js/docs.js` (public: only logs with `public: true`, using `summary:` + `## Made`; plus builds already online), `assets/js/docs.private.js` + `assets/shots-private/` (git-ignored preview, everything, marked "not published"), `assets/shots/` (public images), and page shells: `portfolio.html` (home), `work/<slug>/index.html` (project; versions at `#v3` etc.), `process.html`.
   - `tools/build-content.mjs` now runs build-docs at the end; `inject()` no longer throws when portfolio.html has no markers.
   - `assets/css/fog.css` (base + Fog tokens + page styles) and `assets/js/fog.js` (renders home / project / version / process; loads docs.private.js only on localhost).
   - `.gitignore`: docs.private.js, assets/shots-private/, site-dist/, Prototypes/md-shots/.

## Next steps (in order)
1. Open it locally: start the "static" preview (python http.server 8731 in the repo root) and visit `http://localhost:8731/portfolio.html`, `/work/project-sasha/`, `/work/project-sasha/#v7`, `/process.html`. Check for console errors, broken images, layout at phone width. Fix what is broken.
2. `tools/build-site.mjs` allowlist does NOT yet include the new files: add `process.html`, `work/` (deep), `assets/css/fog.css`, `assets/js/fog.js`, `assets/js/docs.js`, `assets/shots/` (deep). Never add docs.private.js or shots-private.
3. Show Giuseppe; iterate on the look. Do not publish/merge this branch until he says so (it would replace the lab's portfolio.html; the main site varxael.github.io is the separate `main` branch and is untouched).
4. Later: he decides which logs become public (add `public: true` + `summary:` in the vault log). Session logs quote conversations: never publish them whole.

## Rules to remember
- Vault: AI only edits AI-made files; his notes are read-only. Roadmap is `D:/Vaults/Obsidian_MainVault/VarXel/Roadmap.md`.
- Writing voice: no em dashes, plain and clear. He is tired of long messages: keep replies short.
- Commit messages: "ADD:/FIX:/UPDATE: ..." and end with the Co-Authored-By line.
