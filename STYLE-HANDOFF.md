# STYLE SEARCH — HANDOFF (read this, then continue)

You are picking up a **style search** for The Architect (Giuseppe Luigi Alfieri — address him as **The Architect**).
Two parallel goals: (1) find the visual style for his portfolio AND the whole VarXel OS, and (2) turn the chosen
style into a real, reusable **component "database"** every module is built from. He has **more mockups to show**;
your job is to look at them, then converge.

This file is self-contained, but the deeper context lives in the files listed under "Read these next".

---

## 0. The two big things he wants
1. **Find one style we love** and use it as the base for everything (portfolio + every OS module). Right now each
   AI builds modules with a different look (e.g. `synapse` doesn't match), which he hates.
2. **Build a real design-system "database"** — buttons, panels, every component, with the real styles attached,
   that anything can be built from. He explicitly said the prose "art bible" **"sucks big time"** for this. He
   wants the actual thing you import, plus he needs **technical help deciding the best setup** (he's unsure if
   it's even a good idea / how to architect it). **This is the most important open question — see §5.**

---

## 1. Where things physically are (TWO git repos)
- **Portfolio repo** (this folder): `D:\Game Development Projects\auto-job\VarXael.github.io` — all the style
  mockups, the real portfolio (`index.html` etc.), the dataset. GitHub Pages deploys from here. Branch:
  `Fl0w-Version`.
- **The OS / life-OS repo** (parent): `D:\Game Development Projects\auto-job` — "Project Forget-Me-Not", the
  governed life-OS. The design system lives here as the `fl0w` module. **If you touch this repo, you MUST first
  read its boot chain** (it has laws): `AGENTS.md` → `VarXel_Core/CONSTITUTION.md` → `VarXel_Core/KERNEL.md` →
  `Forget_Me_Not_Factory/STATE.md`. A second AI ("the buddy", GLM 5.2) is actively working in that repo — stay in
  your lane, commit only your own files. Editing CONSTITUTION/KERNEL = propose-only, he signs. New module = needs
  permission + the `playbooks/new_module.md` + `python tools/guardian.py` must exit 0.

## 2. How to run the mockups
`.claude/launch.json` has a `static` server config (python http.server on :8731). Start it
(`preview_start({name:"static"})`), then open **http://localhost:8731/styles.html** — the chooser. Verify changes
with **eval**, not screenshots (the Claude Preview screenshot tool is wedged in this environment; it times out).
Canvas animation pauses when the browser tab is backgrounded (`document.hidden`); a `setTimeout` fallback keeps it
alive — keep that guard in any canvas you write.

## 3. The mockups so far (all in the portfolio repo, linked from `styles.html`)
**Bioluminescence round (latest, the strongest — grounded in research):**
- `style-bio-abyss-gold.html` — depth-black + GOLD hairline trims, cyan bioluminescent content, SSS jelly. Most shippable.
- `style-bio-subsurface.html` — immersive: god rays, caustics, a school that follows your cursor, glowing wake. Most jaw-dropping.
- `style-bio-haeckel.html` — radiolaria × flOw editorial; translucent GLASS radiolaria (SSS, Fresnel rim, iridescent edges).
- `style-bio-sonar.html` — the UI as a topographic sonar scope (from *In Other Waters*). Best for OS DATA tools.
- `style-bio-particles.html` — teamLab water-as-particles; 1500 particles assemble into the name / a radiolaria.
- `style-flow-medusa.html`, `style-flow-radiolaria.html` — earlier bio attempts.
**Earlier rounds (mostly rejected, kept for reference):** `mock-*.html` (descent/observatory/archive/lumen/swarm/
living-map/etc.) and `style-flow-organism.html`, `style-flow-membrane.html`, `style-radiolaria*.html`.

## 4. The Architect's taste (what we've learned — use this as the rubric)
- **Loves:** bioluminescence, water, depth, "flowy", **translucency** (color that glows from within / is
  "see-through" like a jellyfish), openness. The flOw GAME feel. The opening hero (name on dark water) feels right.
- **Hates:** flat colors (a flat-filled circle is a NO — must be SSS/glow-from-within); navigation gimmicks that
  hurt legibility (rejected: projects-as-drifting-creatures, stacked Z-layers that overlap, the janky node "Living
  Map"); anything that DIVIDES the portfolio into separate pages — he wants it to "flow" and feel interconnected/
  diegetic, "the deep-sea theme's version of the terminal".
- **Open to / suggested:** GOLD trims ("depth-black, gold trims" — and the research agrees: warm = the rare
  "doesn't belong" accent, so gold works as TRIM only). Mixing pieces of different mockups is fine.
- **Hard rule from the research:** translucency is the medium not a coating; bloom only on emissive elements; cyan
  is primary (the wavelength seawater transmits). See the research file below.

## 5. The DATABASE question (the key technical decision — he needs your help here)
Recommended architecture is already written up in `D:\...\auto-job\Forget_Me_Not_Factory\blueprints\fl0w\
design-system-architecture.md` (status: proposed). Short version: once a style is locked, grow the `fl0w` module
from one theme file into a real library — **`tokens.css` (the values) + `components.css` (canonical
`.fl0w-btn`/`.fl0w-card`/... classes) + a shared `sea.js`** — and rebuild the `/fl0w` page into a **living gallery
that renders every component WITH its copy-paste snippet** (that gallery IS the "database" he wants: visual +
code). Every module imports it and ships nothing of its own; the Guardian enforces "no module invents its own
look" (checks already queued). Stronger option for Flask/OS modules: also ship Jinja macros (`{{ fl0w.card() }}`).
Portfolio (separate Pages repo) consumes a synced generated copy of the CSS.
**Open decisions to settle WITH him:** (a) which style family; (b) CSS-classes-only vs also Jinja macros now;
(c) split the fl0w static folder into tokens/components/sea or keep one growing theme.css (recommend split);
(d) is a hand-built CSS library the right call, or does he want something more dynamic (a JSON token file + a
build step, a tool like Style Dictionary, or a Storybook-style gallery generator)? — discuss the tradeoffs with him.

## 6. Read these next (the real context)
- `D:\...\auto-job\Forget_Me_Not_Factory\blueprints\fl0w\RESEARCH-aesthetic-lineage.md` — GLM's research paper:
  the color science, media lineage, and a "visual steals" index. The bio mockups are built from it.
- `...\blueprints\fl0w\design-system-architecture.md` — the database/component-library proposal (§5 above).
- `...\blueprints\fl0w\MOCKUPS-STYLE-DECISION.md` and `...\spec.md` — prior style notes.
- `...\decisions\ADR-003..ADR-007` — the fl0w/portfolio/governance decisions already made.

## 7. Hard constraints (don't violate)
- **No em dashes ever** in any user-facing copy; neutral/scientific writing voice, clarity over flourish.
- Don't use **Project Sasha** as a base/subject for mockups (the fake dataset in `mock-data.js` already swapped it
  for Monk Homebrew). Keep the dataset; don't rewrite it.
- Keep every portfolio feature when you eventually build the real thing (overview, all-work + category filters,
  trait/discipline view with role contributions, résumé, scrubbable video, hidden projects stay hidden).

## 8. Next steps
1. Run the server, open `styles.html`, look at the bio round.
2. The Architect will **show more mockups** — review them against the rubric in §4.
3. Converge on ONE style (or a documented mix).
4. Then the real work: build it into the `fl0w` component library + gallery per §5, settling the open technical
   decisions with him first.

Recent portfolio-repo commits are the autobiography of this search (`git log --oneline`). Good luck.
