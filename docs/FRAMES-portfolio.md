# Frames portfolio (parallel entry: `frames.html`)

Started 2026-10-22 (chat Portfolio 00). The Frames kit (`C:/Users/User/Downloads/frames-kit`, copy in `VarXel-OS/design/frames-kit`) applied to the portfolio. Nothing of the Fog site is removed; `portfolio.html` and `work/` keep working. Giuseppe decides later whether `frames.html` becomes `index.html`.

The kit's named reference, `Portfolio Frames v22.dc.html`, is not on this PC (not in Downloads, Desktop, this repo, the VarXel-OS copy or any Claude Code chat; it lives in Claude Design, which needs a sign-in). The kit's README, CSS and JS were used as the reference.

## What the portfolio shows (from the current site and the vault)

Data already generated from the vault by `tools/build-content.mjs` and `tools/build-docs.mjs`:

| Source note | Data | Shown as |
| --- | --- | --- |
| `Site/Profile.md` | name, title, headline, quote, bio, email, GitHub, CV | identity window |
| `Site/Portfolio.md` + `Site/Cards/*.md` | 15 projects: category, tier, year, role, context, engine, image, disciplines, per-discipline breakdown, story, links, videos | work tree, record cards, project document |
| `Site/Disciplines.md` | 4 disciplines with a line each | lenses in the tree, about page |
| `Site/Experience.md` | experience and education entries | about page |
| `Projects/<Title>/logs/` (public ones) + `shots/` + builds | documented versions with images and playable builds (Sasha v1, v2) | version document, facts window |

## Frames model

Windows (persist across pages, morph between rects):

| Window | Home | Work / Process / About | Project | Version |
| --- | --- | --- | --- | --- |
| `id` (identity) | full left column: name, title, headline, bio, buttons, switch card | small top-left: name, Home, switch card | same | same |
| `tree` | hidden | left column: Work by category (counts), Lenses (disciplines), Pages | same, the project's category opened with its projects as leaves | same |
| `main` | featured records (hero tier) | record cards of the chosen filter / Process feed / About document | project document with path bar `work/<category>/<slug>`, arrows to prev and next | version document `work/<slug>/<vN>`, arrows between versions |
| `side` | hidden | hidden | facts: cover, role, disciplines, engine, year, context, links, versions | builds of the version, the other versions |

Pages are rect maps in `assets/js/frames.js` (`pages`), routed by hash: `#/`, `#/work`, `#/work/<category>`, `#/lens/<discipline>`, `#/p/<id>`, `#/p/<id>/<vN>`, `#/process`, `#/about`.

Phone (desk narrower than 760px): `id` becomes a short strip with the page buttons and the switch, `tree` and `side` stay hidden, their content folds into `main` (filter chips on top of the cards, facts inside the document). Everything scrolls inside the main window.

Themes: paper by default, `.fr-dark` on `body` for the dark one, remembered in `localStorage` (`fr-theme`). The switch card sits in the identity window on every page and inverts its own colours (kit rule 3).

## Files

- `frames.html`: the shell (loads content.js, docs.js, the engine, the app).
- `assets/css/frames.css`: the kit's tokens and primitives, unchanged.
- `assets/css/frames-site.css`: the portfolio's own styles on top of the kit.
- `assets/js/frames-engine.js`: the kit's `frames.js`, unchanged.
- `assets/js/frames.js`: the portfolio app (pages, render, routing, theme, image viewer).
- `tools/build-site.mjs`: the five files are in both publish allowlists, so `npm run publish-portfolio` ships them next to the Fog pages.

## Run

Launch config `static` (python http.server on 8731), open http://localhost:8731/frames.html. Rebuild content with `npm run build` when the vault changes.

## Open (his call)

- Which entry is the site: `frames.html` or `portfolio.html`.
- Business cards and CV pages keep the old look.
