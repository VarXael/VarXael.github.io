# fl0w portfolio — HANDOFF (build this)

Read this, then **build it**. Everything you need is here + in git.

## TL;DR
The deep-sea **aesthetic is perfect and locked** (palette, fonts, canvas creatures, glow, the
project-detail "bloom" modal, animations). The **DESCENT interaction model is rejected**: projects
rendered as drifting creatures are impossible to scan, and the trait filter that hides everything
else is confusing. **Revert to the previous PANE layout (better info presentation) and dress it in
this aesthetic.** Then refine the panes to feel more fl0w without ever hurting legibility.

## The single most important fact
Git commit **`bc81108`** ("fl0w / deep-sea theme reskin", on branch `Fl0w-Version`) **already is the
target's foundation**: the pane layout + the deep-sea aesthetic + all the text/feature work. The
current HEAD **`aea0f03`** ("THE DESCENT") is the loved look on the wrong layout.

### Git anchors
- Branch: **`Fl0w-Version`** (work here).
- **`bc81108`** = pane layout + deep-sea reskin = **START FROM THIS.** Restore with:
  `git checkout bc81108 -- index.html assets/css/style.css assets/js/script.js`
  then remove the now-unused engine: `git rm assets/js/descent.js`
  (bc81108's index.html only loads script.js, so descent.js is not referenced.)
- **`aea0f03`** = THE DESCENT (current). Mine it for the aesthetic upgrades to port (below):
  `git show aea0f03:assets/js/descent.js` and `git diff bc81108 aea0f03 -- assets/css/style.css`
- Branch **`Architect-Version`** (commit `95de618`) = the ORIGINAL pre-fl0w SCHEMATIC pane layout,
  for layout reference only. NOTE: all the good content work (text pass, lens, hidden projects,
  video controls) was committed only on Fl0w-Version, so `bc81108` is richer than Architect-Version.

## What `bc81108` (the layout to restore) already gives you
- **Pane-morph navigation** (the part the user liked — "feels like swimming through a sea"):
  top nav tabs + left/right sliding panes.
- **ORGANISM** (overview): bio + featured project grid + discipline launchers.
- **DEPTHS** (archive): a readable terminal-style **list** of all projects, filter by category
  (PRO / PERSONAL / UNI / JAM), with a **preview pane** on the right. Projects shown as legible rows
  with thumbnail + title + meta — THIS is the scannability the user wants back.
- **TRAITS** (discipline lens): a page listing the projects that carry a trait, each with its
  role-specific contribution text. Centered trait rail, **no connector wires** (already removed),
  slick per-trait coloured labels.
- **LINEAGE** (records): the résumé.
- Deep-sea aesthetic: abyss palette, Syncopate + Work Sans, the "living sea" canvas (radiolaria hero
  that moves per state + plankton + godrays + drifting creatures), glow markers, video scrubbing.

## Aesthetic upgrades to PORT from THE DESCENT (`aea0f03`) onto the restored layout
These are the things the user fell in love with in the DESCENT that bc81108 does NOT yet have:
1. **Cursor-creature with a bioluminescent wake** (canvas). See `cursorCreature()` + `trail[]` in
   descent.js. Add it to bc81108's canvas loop. (Optional: `cursor:none` on desktop so the creature
   IS the pointer — but keep native cursor on touch/mobile.)
2. **The project-detail "bloom" modal look** — the user explicitly loves it. Decide one:
   - (Recommended) Keep the list/grid to BROWSE, and on click open the detail as the centered
     **bloom membrane modal** (see `.bloom` / `.bloom-membrane` CSS + `openBloom()`/`closeBloom()` in
     aea0f03). Best of both: scannable browse + the loved modal to read. `setPreview(id)` already
     fills the detail content; just house it in the membrane instead of the side pane.
   - OR keep the side preview pane but restyle it with the membrane's glow/rounded treatment.
3. **Depth-fog + godray fade** with state/scroll (the background darkening as you go "deeper") — a
   `.depth-fog` overlay whose opacity rises; godrays fade with depth. Subtle, optional but nice.
4. Any palette/glow refinements from the diff (`git diff bc81108 aea0f03 -- assets/css/style.css`).

## Then: refine the panes to feel MORE fl0w (without losing legibility)
Ideas, your call — legibility wins every time:
- List rows / cards get a small drifting **radiolaria glyph** as an accent next to the thumbnail
  (creature as flavour, NOT as the whole representation).
- Filters/traits should **dim + desaturate** non-matches (a lens), never hide them — the user must
  still see every project and read its title at a glance.
- Liquid transitions on the pane morph (ease like water), bioluminescent hover states, gentle sway.
- Keep the depth gauge / biolum HUD readouts.

## Hard constraints (do not violate)
- **No em dashes ever.** Writing voice = neutral, direct, scientific; clarity > aesthetic for all
  text. (See memory `feedback-writing-voice`.)
- **Keep every feature**: overview(bio + featured + disciplines), browse-all + category filter,
  trait/discipline view with role contributions, résumé, **scrubbable video controls**, and hidden
  projects stay hidden (`Turn-Based Tactics` and `The Library` are `published:false` in the data).
- **Project data + the `setPreview` detail builder live in `assets/js/script.js`.** Do NOT rewrite
  the dataset. (In the DESCENT split, script.js became the content core; bc81108's script.js is the
  full pane engine — restoring bc81108 brings back the working version.)
- Vocabulary already in use (keep or gently refine): **ORGANISM** (overview), **TRAITS**
  (disciplines), **DEPTHS** (archive), **LINEAGE** (records); project = **SPECIMEN**, inspect =
  **OBSERVE**. Depth gauge + BIOLUM in the HUD.
- Per-trait bioluminescent colours: Game Designer `#7fe3ff` (cyan), Technical Game Designer
  `#ffd27a` (amber), Leadership `#e6a8ff` (violet), Game Programmer `#7dffd0` (aqua).

## Verification gotchas in this environment (will save you hours)
- The **Claude Preview screenshot tool was wedged all last session** — it timed out even on static
  pages. Treat it as possibly broken; do not block on it.
- The preview often renders the page **hidden and tiny (e.g. 2px wide)**, which (a) pauses
  `requestAnimationFrame` and (b) breaks any width-dependent layout/measurement. **First thing:**
  `preview_resize` to a real size (e.g. 1440x900). Know `document.hidden === true` pauses rAF — the
  DESCENT loop added a `setTimeout` fallback for this; keep a similar guard if you rely on rAF.
- Verify via **eval** (DOM presence, `getComputedStyle`, canvas `getImageData` pixel sampling,
  dispatched `wheel`/`click` events) rather than screenshots.
- Server: `.claude/launch.json` has a `static` config (python http.server :8731).
  `preview_start({name:"static"})`, then navigate to `http://localhost:8731/index.html`.

## Suggested order of work
1. `git checkout bc81108 -- index.html assets/css/style.css assets/js/script.js` ; `git rm assets/js/descent.js`. Verify the pane layout works and looks good.
2. Port the cursor-creature + wake into the canvas.
3. Convert the project detail into the bloom membrane modal (or restyle the preview pane to match).
4. Add depth-fog/godray polish + any palette tweaks from the diff.
5. Refine panes to feel more fl0w (creature accents, dim-don't-hide filters, liquid transitions),
   guarding legibility. Verify with eval at 1440x900.
6. Commit on `Fl0w-Version`.
