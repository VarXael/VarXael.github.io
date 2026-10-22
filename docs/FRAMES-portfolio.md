# Frames portfolio (parallel entry: `frames.html`)

Started 2026-10-22 (chat Portfolio 00). `frames.html` is a port of Giuseppe's Claude Design file `Portfolio Frames v22.dc.html` (handoff folder: `C:/Users/User/Downloads/handoff-v22`, read its `HANDOFF.md`) to plain HTML, CSS and JS, with the content coming from the vault instead of the constants in the mockup. Nothing of the Fog site is removed; `portfolio.html` and `work/` keep working. Giuseppe decides later whether `frames.html` becomes `index.html`.

The first attempt of the day was built from `frames-kit` alone (a reduced extraction) and was wrong: wrong layout, missing animations. It was replaced by this port in the same session.

## His feedback, 2026-10-22 evening, and what changed

- "The design, tech design... feel very hard to navigate mentally, like another workspace": the four role pages are gone. Pages are now Home, Work, Lab, About. Roles are a filter inside Work, as on the old portfolio: the 2x2 grid in the name window, the By role rows on Home and About, the By role group in the tree and the chips on a project all open Work filtered by that role. The filtered cards show what he did in that role (the per-discipline text of the card). Deep link: `#role/<role>`.
- "Lab as a card of its own in Work that shows my other projects": a wide dark Lab card heads All work and Personal, with the three Lab projects. The Lab projects (Sasha, Circle, Cadence) are no longer repeated in the Work categories, only in the Lab and in the role filters. Home has a Lab tile next to the selected work.
- "Too much empty space, projects missing pictures": SVG covers fill their frame; Sasha uses its version screenshots as cover; every project document shows its YouTube video (click to play) and a picture strip with a full-screen viewer; the Lab hero shows extra shots. Projects with one picture still have one picture: more need adding to the cards (`image`) or as public version logs with shots.
- Deep links: `#work`, `#work/<prof|uni|jam|personal>`, `#role/<role>`, `#p/<id>`, `#lab`, `#lab/<id>`, `#about`.

## What is ported, one to one (before the feedback; the role pages were removed since)

- Eight pages in a line: four role pages (0 to 3), Home (4), Work (5), Lab (6), About (7). Arrows and Q/E move along the line, Esc closes a project then goes Home, up/down step through projects in a document, Enter opens the selected Lab project.
- Ten persistent windows (`L A B N W Lb Ls Ab Ar X`) with the reference's rect maps (`rects()` in `frames.js` is `renderVals()`): Home has the intro window and the selected-work window; the other pages have the name window (168px, 158 under 600px tall) and the tree under it, the rail on the right for role pages and on the left for Work, Lab and About; content windows of earlier pages collapse to the left edge, later ones to the right edge; `X` is the open document, it grows from the clicked card and shrinks back into it on "All cards".
- Transition phases and timings: `out` (fade plus 14px slide against the travel direction), after 120ms `move` (or `grow` then `move` 40ms later), after 640ms `in`; rect morph 0.48s `cubic-bezier(.7,0,.2,1)`; content in: opacity 0.3s delayed 0.04s, transform 0.4s; same window, same kind, new key: recalibrate (10px inset, accent outline and corners, 160ms); first load: the four edges scale in from opposite corners (0.55s, 80ms stagger per window), then `drawn`; watchdog forces `in` after 1.1s. `S.speed` multiplies every timing (the reference's Snappy/Calm select).
- Themes: paper everywhere, dark on the Lab page (`#pf.dk`); background and window fills crossfade in 0.45s; the switch card in the name window is dark on paper and light in the Lab. Scanlines on over everything.
- The template's inline styles are kept; the palette became custom properties on `#pf`, hover styles became classes (`frames-site.css`).

## Where the content comes from

| Reference constant | Now | Source |
| --- | --- | --- |
| `WK`, `P`, `ENG` | the 15 projects of `Site/Portfolio.md`: title, category, year, role, engine, context, image, disciplines, per-discipline breakdown (HTML), story, links, videos, documented versions | `assets/js/content.js`, `assets/js/docs.js` |
| `RF`, `RN`, `DD` | the four disciplines and their descriptions | `Site/Disciplines.md` |
| `LP`, `lpOrder` | the Lab: personal projects with tier `hero` (Sasha, Circle, Cadence); status read from the context line; facts (role, engine, started, disciplines); Iterations from the card's videos; Systems from the breakdown paragraphs; Notes from the story; Versions (images and Play) from the public logs | cards and logs |
| `SM2` | Smaller things: the Mechanics Catalogue entries (family, name) | `Site/Mechanics Catalogue.md` |
| `REC` | the Records column on About | `Site/Experience.md` |
| intro, About | name, title, headline, bio, email, GitHub, CV, portrait | `Site/Profile.md` |
| `SEL` | the four hero-tier projects | tier property |

Added to the project document on top of the reference: the Versions list with Play buttons, the videos, and the story as a toggle. The "Languages / Engines / Tools" and "Experience with" rows on About are still the reference's fixed text.

## Files

- `frames.html`: the shell (chrome: tabs, side arrows, crumbs, hint, the box).
- `assets/css/frames-site.css`: fonts, palette, chrome, window primitives, card and row styles.
- `assets/js/frames.js`: data mapping, state, `nav()`, `rects()`, the twelve window renderers, `update()` (applies rects, phases, recalibrate and re-renders a window when its content signature changes), keys.
- `tools/build-site.mjs`: the three files are in both publish allowlists, so `npm run publish-portfolio` ships them next to the Fog pages.

## Run

Launch config `static` (python http.server on 8731), open http://localhost:8731/frames.html. Rebuild content with `npm run build` when the vault changes.

## Open (his call)

- Which entry is the site: `frames.html` or `portfolio.html`.
- Phone width: like the reference, the desk has a 700px minimum and scrolls sideways on a phone. A phone layout is not designed yet.
- Business cards and CV pages keep the old look.
