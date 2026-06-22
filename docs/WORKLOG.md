# WORKLOG — Portfolio Rebuild (Architect / SCHEMATIC version)

> Running journal so a fresh chat can resume in minimal tokens.
> **Start here, then read `docs/DESIGN_LANGUAGE.md`.** Append a dated entry every session.
> Branch: `Architect-Version`. Repo: `VarXael.github.io`.

---

## CURRENT STATE (as of 2026-06-21)

Rebuilding Giuseppe's portfolio in an "architectural / blueprint-terminal" aesthetic
(codename **SCHEMATIC**, see `docs/DESIGN_LANGUAGE.md`). Three files matter:

- **`index.html`** — the NEW build (real content, architectural style). Work happens here.
- **`assets/css/style.css`** — external stylesheet powering `index.html`.
- **`assets/js/script.js`** — data (`projectDetails`) + all rendering/interaction logic.

Reference-only files:
- **`theme-handout.html`** — original self-contained mockup (John Doe placeholder, uses a
  project *modal*). The style seed. Don't ship it; mine it.
- **`OLD PORTFOLIO/`** — the current LIVE vCard-style site (separate `.git`). Source of truth
  for real content + features we still need to port.

It is a static site: open `index.html` in a browser, no build step.

### How `index.html` works (architecture)
- One page, JS-swapped sections (`.sys-section`): `overview` (about), `archive` (projects),
  `logs` (resume), `project-view` (the morph spec sheet). Nav tabs toggle `.active`.
- `script.js` holds `projectDetails` (every project as a data object: title, category,
  `tier` hero/supporting/listed, `published`, `roles`, `image`, `video(s)`, `links`, `short`,
  `long`, `story`, `roleContributions`, tools). `renderGrid()` builds project cards;
  `renderFeaturedProjects()` builds the overview featured grid; `openModal()` is (despite the
  name) the **morph** project-view renderer; `triggerWarp()` does the background warp.
- Background: `BlueprintNode` generative canvas + viewport frame + corner nodes.

---

## KNOWN BUGS / GAPS (the "make it actually work" list)

Layout / clarity:
- [ ] Overview is a cramped 3-col single screen; profile + bio columns overflow on short
      viewports → clipping. Core complaint = "can't notice the projects / hard to see things."
- [ ] Contrast too low (`--ink-dim` .4, `--ink-faint` .15, client logos opacity .6). RAISED in
      design doc to .55/.22 — apply to CSS.
- [ ] Featured project thumbnails are tiny (100px) grayscale, low in hierarchy.
- [ ] SVG project images (Sasha, Circle, CRT.exe) break under `object-fit:cover`+grayscale.
- [ ] Mobile (`max-width:900px`): `center-cell` not repositioned in media query → phantom column.

Functional:
- [ ] `renderGrid()` shows `published:false` projects (Covid19, Syovara, MaGiTe, FallingFusion,
      NickelNinja). Must respect `published`.
- [ ] No **Game Jams** filter button, but projects use `category:"game jams"` (CRT.exe,
      FallingFusion, NickelNinja) → only visible under "All". Add the filter.
- [ ] `magic-link` video spans in Sasha's text have NO click handler → dead.

Features to PORT from OLD PORTFOLIO (Giuseppe confirmed all 4):
- [ ] CV link (`cv.html`) in nav/links.
- [ ] Clickable client logos (Untold→untoldgames.com, Creativity Unleashed→Udemy,
      Umeå→umu.se, Cineon→cineon.training).
- [ ] Copy-email button (click-to-copy w/ feedback) instead of plain mailto.
- [ ] Working video links (wire the `magic-link` spans / video buttons).

Nice-to-have from OLD (not yet requested): "What I Do" roles grid, mobile filter dropdown,
favicon, fuller resume detail (months/locations/"Online Tutoring").

---

## DECISIONS

**2026-06-21**
- Aesthetic = "blueprint-terminal" inspection environment, codenamed **SCHEMATIC**. The site
  *is* a system you inspect (mirrors Giuseppe's systems-design identity). Documented in
  `docs/DESIGN_LANGUAGE.md`.
- Design language must be **portable/reusable** — Giuseppe is building a larger project and
  wants this UI/UX system applied there too. Doc written to be AI-readable for that purpose.
- Restore all 4 OLD features (CV, client links, copy-email, working videos). Fix
  unpublished-projects + Game-Jams-filter bugs regardless.
- Project open behaviour = **morph** (travel into the module), not modal. Refine into a
  "VIEWPORT FOCUS" zoom transition.
- `[PROPOSED]` Accent palette = Project Sasha's own Ice-Blue / Amber state logic, used as rare
  signals only (blue=active/selected/link, amber=featured/award). Pending Giuseppe confirm.
- `[PROPOSED]` Use the data's `tier` field to size project tiles (hero/supporting/listed) so the
  grid expresses importance. Pending confirm.

---

## OPEN DECISIONS (awaiting Giuseppe)

RESOLVED 2026-06-21: Accent = Sasha Blue/Amber (YES). Direction = **ground-up rebuild, keep the
`projectDetails` data**. Open transition = **Blueprint Unfold** (Giuseppe loved it). Aesthetic
expanded to BLAME!/Angelarium/NieR/Armored Core (see design doc "Reference DNA").

RECALIBRATED 2026-06-21 (c) after Giuseppe's reaction to `prototype.html`: it was "too Sasha"
(blue/amber = one project) and "too technological" (Armored-Core HUD/telemetry). Target is now
**alien / timeless / inhuman from humanity**. Decisions:
- Accent = bone-on-void + single **sacred gold** (RETIRE Sasha blue/amber).
- Type = **Cinzel** (monumental inscription) + **EB Garamond** (manuscript). Drop Space Mono;
  dial back `[ // bracket ]` CLI voice toward monumental/inscriptional.
- Project showcase = **Sephirot constellation** (Giuseppe loved it) — projects as nodes of light on
  a Tree-of-Life, joined by real lineage; hover one → dim the rest + light its connections; click →
  unfold dossier. Solves the "cluttered/chaotic board" complaint.
- **Dark-only** confirmed. Keep the Blueprint-Unfold dossier (loved).
- Built **`prototype2.html`** realising all of the above (kept `prototype.html` for contrast).

Still open — gather from Giuseppe's reaction to `prototype2.html`:
1. Does the constellation + bone/gold + monumental type land the "alien/timeless" world now?
2. Constellation layout/curation — node positions + which projects appear + which lineage paths
   (currently 10 curated nodes, 10 links). Tree shape tuning.
3. How the rest of the site (About / Resume / the full ~17-project archive) fits this world —
   is the constellation the whole archive, or an overview that links to a fuller index?

---

## NEXT ACTIONS (when implementing)

1. Apply contrast + token updates to `style.css` (§4 of design doc).
2. Fix `renderGrid()` to skip `published:false`; add Game Jams filter.
3. Rebuild project archive as tier-sized **module tiles** (§7).
4. Implement chosen open-project transition (§8).
5. Port the 4 OLD features.
6. Fix mobile single-column placement for every overview cell.
7. Wire `magic-link` handler for inline videos.

---

## CHANGELOG (append per session)

- **2026-06-21 (a)** — Reviewed new build vs OLD vs handout. Diagnosed layout/contrast/functional
  issues. Authored `docs/DESIGN_LANGUAGE.md` (SCHEMATIC v0.2) + this worklog. Created memory
  files. Awaited Giuseppe's choices.
- **2026-06-21 (b)** — Giuseppe confirmed Sasha accent + revealed the real mood (BLAME!,
  Angelarium, NieR, Armored Core) and handed me the call on rebuild-vs-iterate. Decision: **rebuild
  front-end ground-up, keep the data.** Expanded design doc to v0.3 (Reference DNA + new "Nervous
  System" background spec, replacing the retired particle web). Built **`prototype.html`** — a
  self-contained vertical slice of "STRATA // ARCHITECT": operator HUD frame, sacred-geometry
  breathing/parallax/pulsing canvas, tier-sized module board (5 real projects), Blueprint-Unfold
  dossier with self-drawing construction lines. Verified in preview (5 modules, correct tiers,
  images incl. SVG load, canvas animates 1280×720, unfold opens correctly, no console errors).
  Added a self-heal resize guard. Static server config at `.claude/launch.json` (name "static",
  port 8731). **Next: get Giuseppe's reaction, then port the full dataset + sections into the
  rebuild and migrate the confirmed OLD features/bugfixes.**
- **2026-06-21 (c)** — Giuseppe: prototype.html too Sasha-specific + too technological. Recalibrated
  to "alien/timeless" (bone+gold, Cinzel+EB Garamond, monumental voice, dark-only). Built
  **`prototype2.html`**: minimal monument frame, slower inhuman sacred-geometry canvas (gold core,
  cosmic dust, resonance rings — no telemetry/energy-pulse), and the **Sephirot constellation**
  (10 curated project-nodes + 10 lineage paths; hover dims the field and lights connections; click →
  restyled Blueprint-Unfold dossier). Verified: 10 nodes/10 paths, tiers 4/4/2, Cinzel applied,
  canvas animates, focus + dossier work, no console errors. Updated DESIGN_LANGUAGE.md to v0.4.
  **Next: Giuseppe reacts to prototype2; then tune the tree + extend the world to About/Resume/full
  archive, then implement for real + migrate OLD features/bugfixes.**
- **2026-06-21 (d)** — Giuseppe: prototype2 is great art but not a *usable* portfolio; keep pushing
  BLAME!/Angelarium but make it navigable (low on budget — keep lean). Built **`prototype3.html`**:
  the usable production-shaped version — fixed nav, hero w/ CTAs, **filterable readable Works grid**
  (respects categories incl. Game Jams), About (bio/tech/clickable clients), Path (resume), Contact
  (copy-email + GitHub + CV), dossier w/ external links. Same skin (bone/void/gold, Cinzel+EB
  Garamond) but cheap static rotating SVG sigil instead of canvas. This is the recommended base to
  turn into the real `index.html`. Verified: 6 cards, 5 filters, all sections, dossier opens.
  **THREE prototypes now exist: p1=tech/HUD, p2=constellation/art, p3=usable. p3 is the build base;
  p2's constellation can become a hero flourish. Next (new budget): wire full dataset into p3 shape +
  fix unpublished/Game-Jams + finish OLD-feature port.**
- **2026-06-21 (e)** — Giuseppe wanted a bolder, completely different layout (cards too small/
  unmemorable, too much text). Built **`prototype4.html` — "THE SCAN"**: no grid. The void + giant
  Cinzel work-names; hovering a work floods its full-bleed image behind + draws a per-project
  procedural sacred **sigil** + surfaces its data, dimming all others (embodies Giuseppe's ethos
  "the world doesn't exist until you scan it"). Click = full-screen reveal. Scanline grain + vignette
  for BLAME! mood. Still has nav/contact/copy-email/CV/GitHub. FOUR prototypes now: p1 HUD board,
  p2 constellation, p3 conventional-usable, p4 scan-index (boldest). Awaiting Giuseppe's pick/blend.**
