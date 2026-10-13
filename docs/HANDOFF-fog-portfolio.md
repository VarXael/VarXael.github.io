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

## Work log (2026-10-13, day session: Giuseppe said finish, review, publish the portfolio to main, deploy the wiki to Cloudflare; he checks in the afternoon)
- [x] Local review of the Fog pages (home, 15 project pages, Sasha versions, Process, phone width): no broken images, no overflow.
- [x] `tools/build-site.mjs` now has two targets: `lab` (site-dist/, unchanged role) and `portfolio` (site-portfolio/: portfolio.html + index.html alias, process, cv, business cards, work/, Fog assets, images, videos, shots, public play builds; NO lab.html, NO VarXel catalogue). Checks every relative link and fails if preview data leaks.
- [x] Public-mode test of site-portfolio: Sasha shows only v1 and v2, no wiki links, no "not published".
- [x] `tools/publish-portfolio.mjs` + `npm run publish-portfolio`: builds, then commits site-portfolio as the whole content of `main` (one normal commit on top of main's history, so `git revert` undoes it) and pushes.
- [x] Published to main: commit a5a554f on VarXael/VarXael.github.io (previous main was 95de618, the old portfolio). Verified live: all pages 200, Sasha renders with v1/v2, no preview data, lab.html/Prototypes/docs.private.js 404. UNDO: revert a5a554f on main (or push 95de618 back).
- [x] Wiki reviewed end to end with `wrangler dev` (login, wrong password, all page types, search, Sasha v11.2 game boots in the browser, download route answers 503 until GITHUB_TOKEN is set). Committed 16c476f, pushed to VarXael/VarXel-Wiki, deployed to Cloudflare (version 366d67e8).
- [x] Public game build checked live: https://varxael.github.io/play/ProjectSasha/v2/ boots.
- [x] `content-pipeline` fast-forwarded to `fog-portfolio` (same commits). Work continues on `content-pipeline`.
- [!] ACCIDENT: a shell command with backticks ran `npm run publish-portfolio` and `npm run publish` by mistake. main was unchanged (nothing new). The LAB (VarXael/VarXel-Lab) was republished as 9b01e74: its portfolio.html is now the Fog portfolio, plus process.html and work/. Nothing private shipped (same allowlist checks). Tell Giuseppe; revert only if he wants (rebuild lab from commit b8bab3d's files and force-push).

## Status: DONE for this session. What is left is his call
- Windows downloads on the wiki: he must create a fine-grained GitHub token (Contents read-only) and run `npx wrangler secret put GITHUB_TOKEN` in VarXel-Wiki. See its HANDBOOK.
- Optional: delete branch `content-pipeline` from the PUBLIC repo VarXael/VarXael.github.io (backed up in VarXael/Portfolio-Source). The safety filter refused to do it without his explicit OK.
- Choose which Sasha logs become public (add `public: true` + `summary:` to the log in the vault); then `npm run publish-portfolio`. Session logs quote conversations: never publish them whole.
- Feedback on the live look, then iterate.

## Commands
- Local preview with everything (marked "not published"): launch config "static", open http://localhost:8731/portfolio.html
- Publish the portfolio (varxael.github.io): `npm run publish-portfolio`
- Publish the lab (varxael.github.io/VarXel-Lab): `npm run publish`
- Undo the portfolio publish: revert a5a554f on main.
- Shell gotcha: never put backticks inside a double-quoted `node -e "..."` in bash; they run as commands. Use the Edit tool or a heredoc with a quoted delimiter.

## Rules to remember
- Vault: AI only edits AI-made files; his notes are read-only. Roadmap is `D:/Vaults/Obsidian_MainVault/VarXel/Roadmap.md`.
- Writing voice: no em dashes, plain and clear. He is tired of long messages: keep replies short.
- Commit messages: "ADD:/FIX:/UPDATE: ..." and end with the Co-Authored-By line.
