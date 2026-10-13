# SCHEMATIC — Design Language

> Working codename: **SCHEMATIC** (rename freely). A "blueprint-terminal" visual system:
> a drafting-table crossed with a command line. This document is **portable** — it
> describes the aesthetic on its own terms so it can be applied to the portfolio *and*
> to the larger project Giuseppe is building. If you are an AI reading this to apply the
> look to a new surface, read sections 1–4 and 10 first.

> ⚑ **v1.5 — LOCKED DIRECTION (2026-06-22). This supersedes everything below.** After ~21
> prototypes Giuseppe locked in **`prototype21.html`**: the operator-HUD / blueprint-terminal look
> with the **Sasha Blue (`#4fb8d4`) + Amber (`#e0a23b`)** accents UN-retired, on near-black
> `#0a0b0d` bone-white `#e8e6e0`. Type = **Space Mono** (labels) + **Inter** (prose) + **Cormorant
> Garamond** (italic epigraphs). Layout = a single-page **state machine** (OVERVIEW / ARCHIVE /
> RECORDS) whose panes morph between states over the animated "nervous system" canvas. The bone+gold
> / Cinzel / Sephirot-constellation experiment (v0.4 below) was **NOT** chosen — read it as history.
> This is now realised for real in `index.html` + `assets/css/style.css` + `assets/js/script.js`,
> carrying the full ported dataset and all OLD features. CV + business cards re-skinned to match.

Status of this doc: **v0.4 — RECALIBRATED toward "alien / timeless / inhuman."** Direction =
ground-up rebuild keeping the data; project showcase = **Sephirot constellation**; dark-only.
The Sasha Blue/Amber accent is **RETIRED** (too project-specific, too "tech product"). New accent
= bone-on-void + a single faint **sacred gold** (light as colour). Voice moves from CLI/terminal
toward **monumental/inscriptional**. Reference realisation: **`prototype2.html`** (supersedes the
techy `prototype.html`, which is kept for contrast). Anything `[PROPOSED]` is not yet ratified.

> ⚠️ History: v0.2–0.3 proposed a Sasha Blue/Amber palette + Armored-Core operator HUD + terminal
> bracket voice (see `prototype.html`). Giuseppe found that too tied to one project and too
> technological. v0.4 corrects course. Where older sections below still describe blue/amber or
> heavy `[ // bracket ]` CLI voice, read them through the v0.4 lens: **bone + gold, monumental
> type, less terminal punctuation.** The structural kit, principles, type-pairing logic, and
> motion concepts still hold.

### Reference DNA (the actual mood — read this)
The world is **not a literal terminal**. It is **a vast, sacred machine you move through as a small
operator** — "biological but technological," esoteric, cyber-organic. Four sources:
- **BLAME! (Tsutomu Nihei)** — monumental brutalist megastructure, oppressive scale, sparse humans
  dwarfed by infinite architecture, hard black-and-white chiaroscuro, cyber-organic fusion.
- **Angelarium / angelarium.net** — sacred geometry, sigils, the sephirot (nodes joined by paths),
  divine forms as cosmic diagrams. The esoteric/ritual layer.
- **NieR: Automata** — sterile, melancholy beauty; restraint; meaning in emptiness; serif accents.
- **Armored Core / mech UI** — operator HUD, telemetry readouts, targeting reticles, the feeling of
  *piloting/operating* the machine.
Synthesis (working concept **"STRATA // ARCHITECT"**): you are an operator descending through the
strata of a sacred machine, reading its schematics. The background is the machine's *nervous system*,
not decoration. See `prototype.html` for the first realisation.

---

## 1. The World (read this first)

The interface is not "a website about a person." It is an **engineering inspection
environment** — a viewport/terminal through which a *system* is examined. The person
(Giuseppe, a self-described **Systems Architect**) is presented the way an architect
presents a building or a machine: as a set of **modules, schematics, and specifications**
you pull up and inspect.

**The medium is the message.** Giuseppe designs games "where the systems tell the story"
and "architects interconnected mechanics." So the portfolio itself must *be* a system you
explore — not a brochure. Every screen should feel like you are reading a technical drawing
or querying a database, never like you are scrolling marketing copy.

One sentence to hold in your head while designing anything in this language:

> **"You are inspecting a system through a drafting viewport. Show structure, label
> everything like a blueprint, and let motion read as computation."**

---

## 2. Principles

1. **Structure over decoration.** Lines, frames, registration marks, crosshairs, grids.
   No drop shadows, no gradients-as-decoration, no rounded "app" cards. If a divider can
   be a dashed construction line instead of a solid bar, make it one.
2. **Everything is labeled.** Like a parts diagram or CLI output. Indices (`[ MOD_07 ]`),
   keys (`YEAR:`, `ENGINE:`), prompts (`>`), comments (`//`). Labels are part of the art.
3. **Monochrome ink, one signal.** Black/white ink on paper/phosphor. Color is *information*,
   not flavour — it marks what is alive, selected, or important. Never tint for prettiness.
4. **Motion = computation.** Transitions should read as the system *recalculating* or the
   *viewport refocusing*, not as UI flourish. The background warp is the canonical example.
5. **The data drives the hierarchy.** Project importance is encoded in data (`tier`,
   `isFeatured`, `published`) — the layout must *express* that, not flatten it.
6. **Legibility is non-negotiable.** This world loves faintness; resist it. Body text and
   anything a visitor must read hits real contrast. Faintness is reserved for *structure*
   (frames, the generative canvas), never for *content*.

---

## 3. Voice & Copy conventions

The copy is part of the visual system. Rules:

- **Section/nav labels** wrap in brackets with a comment slash: `[ // ABOUT ]`, `[ // PROJECTS ]`.
- **Tags / chips / tech** wrap in plain brackets: `[ C++ ]`, `[ UNREAL ENGINE ]`, `[ ALL ]`.
- **Prompts / system lines** start with `>`: `> QUERY: EXPERIENCE`, `> SELECT A DISCIPLINE`,
  `> INSPECT MODULE :: CADENCE`.
- **Field keys** are UPPERCASE with a colon: `YEAR:`, `CATEGORY:`, `ROLE:`, `TECH_STACK:`.
- **Buttons** read like commands: `[ INITIATE LIGHT_MODE ]`, `[ < RETURN ]`, `[ VIEW VIDEO_LOG ]`.
- Use `_` for compound machine tokens (`LIGHT_MODE`, `ROLE_DEF`, `TECH_STACK`).
- Prose *inside* a spec (the actual project writeups, bio) stays human and warm — the
  machine voice is the *frame*, the human voice is the *content*. Don't roboticise Giuseppe's
  actual writing.

---

## 4. Color Tokens

### v0.4 — CURRENT (alien / timeless) — use this
```css
:root{
  --void:#070709;                       /* near-black, faint cool */
  --bone:#e9e4d7;                       /* warm bone-white ink (ancient, not sterile) */
  --dim:rgba(233,228,215,.42);
  --faint:rgba(233,228,215,.10);        /* structure only */
  --hair:rgba(233,228,215,.05);
  --gold:#c9a96e;                       /* THE accent — sacred/divine/alive. Used as light, sparingly */
  --gold-soft:rgba(201,169,110,.55);
}
```
Single accent only. Gold = "alive / sacred / selected" — a glow, a hairline, a single node of light,
never a fill, never on large areas. Everything else is bone-on-void. No second signal colour.
Dark-only (no light mode for now — this world is inherently dark/BLAME!).

### v0.2 — SUPERSEDED (kept for reference; the "tech terminal" palette)

Defined as CSS custom properties. Light = "blueprint on drafting paper." Dark = "phosphor
on black." Base ink/bg is LOCKED. The two signals are `[PROPOSED]`.

```css
:root {
  /* BASE — locked */
  --bg:        #ffffff;                 /* light: paper            */
  --ink:       #111111;                 /* light: drafting ink     */
  --ink-faint: rgba(17,17,17,0.22);     /* structure lines only    */
  --ink-dim:   rgba(17,17,17,0.55);     /* secondary text (was .4 — too faint) */

  /* SIGNALS — [PROPOSED], borrowed from Project Sasha's own design language
     (Sasha communicates state as Grey -> Ice Blue -> Amber; we reuse that logic,
     which ties the whole UI to Giuseppe's flagship project). */
  --signal-blue:  #4FB8D4;  /* ACTIVE / SELECTED / "scanned/known" / links / live connections */
  --signal-amber: #E0A23B;  /* FEATURED / AWARD / ALERT / priority emphasis                   */
}

body.dark-mode {
  --bg:        #0e0e10;
  --ink:       #f2f2f2;
  --ink-faint: rgba(255,255,255,0.22);
  --ink-dim:   rgba(255,255,255,0.55);
  /* signals stay the same hue in both modes */
}
```

**Signal usage rules (strict — this is what keeps it tasteful):**
- Blue = *state*: the active nav tab, a selected discipline, focused module border,
  hyperlinks, and the live lines in the background canvas. "This is on / selected / known."
- Amber = *weight*: a `hero`/featured project's priority marker, award callouts
  ("Best 3rd Year Videogame"), the one thing on a screen that must be seen first.
- **Never** use both signals on the same element. **Never** fill a large area with a signal —
  they are hairlines, dots, single words, 1px borders. The page stays ink-on-paper; the
  signals are sparks.

Grayscale imagery: default `filter: grayscale(1) contrast(1.05)`; on hover/focus animate to
full colour. (Photos "develop" when inspected.) **Exception:** SVG logos/diagrams that are
already line-art must NOT be `object-fit: cover`-cropped or grayscaled into mud — render them
`contain` on a framed plate.

---

## 5. Typography

**v0.4 — CURRENT (timeless/monumental):**
- **Display — `Cinzel`** (Roman monumental capitals, carved-inscription feel) for titles, the name,
  section headers, node labels, field keys. Wide tracking (`.2em`+). Fallback: `Georgia, serif`.
- **Prose — `EB Garamond`** (manuscript serif, incl. italic) for body, synopses, epigraphs, lineage
  lines. This is the warm/human voice inside the monument.
- **Space Mono is dropped** from the timeless direction (reads as "code/terminal"). Keep tiny mono
  only if a genuine coordinate/astronomical-chart feel is wanted, never for prose.
- Rule: **inscription (Cinzel caps) for labels, manuscript (Garamond) for sentences.**

**v0.2 (superseded):** Space Mono labels + Inter prose. ↓ (400/700): all labels, headings, nav, tags, field keys, buttons,
  the name. This is the system's "drawing" typeface.
- **Sans — `Inter`** (300/400/600): long-form prose only — bio, project writeups, descriptions.
  This is the "human" typeface that lives inside the frames.
- Headings: uppercase, wide tracking (`letter-spacing: 2px`+). Bigger headings track tighter.
- Body: `line-height: 1.7–1.8`, never uppercase, never tracked.
- Rule of thumb: **if it's a label, it's mono+uppercase; if it's a sentence, it's Inter.**

---

## 6. Structural Motifs (the "blueprint" kit)

These recurring elements are the signature. Reuse them on any new surface.

- **Viewport frame** — a 1px `--ink` border inset ~25px from the screen edge. The whole UI
  lives "inside the drawing."
- **Corner nodes** — SVG registration marks (concentric circles + crosshair) in all four
  corners. Like alignment targets on a printed plate / a camera viewfinder.
- **Dashed construction lines** — `1px dashed var(--ink)` for dividers, card borders,
  timeline spines. Solid borders are for *emphasis/active*, dashed for *default*.
- **Dimension/registration ticks** — `repeating-linear-gradient` dashes for section underlines
  (`▪ ▪ ▪ ▪`), little tick marks before list items.
- **The Nervous System** (background canvas) — **NOT** a random particle web (that was the old
  Antigravity build; it reads as cliché and is retired). The background is a composed, living
  schematic of the machine, in three layers, drawn each frame on a full-screen `<canvas>`:
  1. **Megastructure rails** — sparse, very faint long lines (horizontal girders + vanishing
     verticals) implying vast BLAME! depth; strong parallax to the mouse.
  2. **Sigil-mandala (the core)** — a central composition of concentric rings + dashed radial
     spokes + counter-rotating inscribed polygons (a hexagram), with lit **nodes** at
     ring/spoke intersections (the sephirot). It *rotates slowly* and *breathes* (a slow `sin`
     modulates alpha/scale ≈ the biological pulse). Nodes pulse organically out of phase.
  3. **Energy pulses** — on interaction (open project / navigate) a `--signal-blue` ring
     propagates outward along the geometry, like a signal through veins/circuits. An idle ambient
     pulse keeps it alive. The whole field reacts to the WARP (spins up + brightens).
  Alpha stays low (ink ~0.03–0.12, blue ~0.1–0.5 on lit accents) so it never competes with
  content. Reference implementation: `prototype.html` (`draw()` / `RINGS` / `pulses`). This
  replaces `assets/js/script.js` `BlueprintNode` in the rebuild.
- **Bracketed everything** — see §3.

---

## 7. Components

| Component        | Spec |
|------------------|------|
| **Nav (`sys-nav`)** | Fixed top bar, dashed bottom border. Left: logo (`G. ALFIERI`). Center: bracket tabs. Right: theme command button. Active tab = `--ink` bold + `[PROPOSED]` blue underline tick. |
| **Module tile** (project card) | A blueprint tile, not an app card. Header row = `[ MOD_xx ]` index + category tag + year. Framed "viewport render" image (registration frame + crosshair on hover). Title in mono uppercase. Role tags as bracket chips. **Size by `tier`**: `hero` = large/featured plate, `supporting` = medium, `listed` = compact row. Featured = amber priority marker. |
| **Spec sheet** (open project) | Full-screen "focused" view (see §8). Hero render left, fielded info right: title, `YEAR: / CATEGORY:`, `> TECH_STACK:`, synopsis (Inter), optional long `story` behind a dashed left rule, per-role contribution boxes, media/link command buttons. |
| **Tag / chip** | `1px solid var(--ink-dim)` box, mono uppercase, `[ ... ]` optional. Selected = blue border. |
| **Command button** (`theme-btn`) | `1px solid var(--ink)`, transparent fill, hover inverts to `--ink` bg / `--bg` text. Used for theme toggle, return, external links, video logs. |
| **Timeline** (resume) | Vertical dashed spine, tick before each entry, `[ YEAR ]` meta in a fixed-width column (`--ink-dim`), mono title, Inter description. |
| **Discipline selector** | List of roles; clicking one filters featured projects and prints a `> ROLE_DEF: [...]` definition. Active role highlighted (bold + blue). |

---

## 8. Motion & Transitions

Three named motions. The page-open transition is the one Giuseppe is choosing between
(§ "Open decisions" in WORKLOG).

- **WARP** *(exists)* — on any major navigation, the background canvas nodes accelerate
  (`window.warpSpeed` spikes to ~15 then decays). Reads as the system jumping to a new state.
  Reuse for every section/project transition. It is the connective tissue of the whole site.
- **VIEWPORT FOCUS** `[PROPOSED, recommended]` — opening a project: the clicked module appears
  to *zoom*; it scales up to fill the viewport while the surrounding grid blurs/recedes past
  (warp underneath). You "fly into" the component. This is a **morph** (the page content is
  replaced), not a modal (no overlay on top). Best fit for the world: you *travel into* the module.
- **TERMINAL DECODE** `[PROPOSED, optional layer]` — the spec text "renders" line by line with
  a fast scramble-to-text decode (~300–500ms total, skippable), prefixed by a
  `> INSPECT MODULE :: NAME` command line. Satisfies the "terminal" instinct without a slow
  full-typed screen. Can be layered on top of Viewport Focus.

Morph vs modal, plainly:
- **Modal** = a window pops up *over* the page; old content sits dimmed behind it; closing
  returns you exactly where you were. Feels like "a panel opened."
- **Morph** = the page itself *becomes* the project; the grid is gone, the project owns the
  whole screen. Feels like "I went somewhere." **This world wants morph.**

Timing: transitions 0.3–0.5s, `ease`. Hovers 0.2–0.3s. Nothing slower than 0.6s except the
ambient canvas (which is effectively infinite/slow).

---

## 9. Layout

- Everything sits inside the viewport frame (§6), padded generously (~50px desktop).
- Grids are explicit and visible in spirit — align to a clear column structure.
- **Contrast budget:** on any screen, exactly one element should be "loudest" (often an amber
  marker or the name). Structure recedes (faint), content is solid, signals are rare.
- Responsive: collapse multi-column to single column under ~900px; **every** cell must have an
  explicit single-column placement in the media query (the current `center-cell` bug is that it
  doesn't — see WORKLOG).

---

## 10. Applying SCHEMATIC to a NEW surface (checklist for an AI)

When asked to build something new in this language:

1. Wrap the surface in the **viewport frame + corner nodes**. Drop in the **generative canvas**
   at low alpha behind content.
2. Set the **color tokens** (§4). Mono for labels, Inter for prose (§5).
3. Name everything in **machine voice** (§3): bracket labels, `>` prompts, `KEY:` fields.
4. Build dividers/borders from **dashed construction lines**; reserve solid borders for active.
5. Use the **two signals as sparks only** — blue = state, amber = weight. Never fill, never both.
6. Make **motion read as computation** — reuse WARP for transitions.
7. Let the **data drive hierarchy** — size/emphasis from importance fields, not uniform cards.
8. Keep **content legible** — faintness is for structure, never for what must be read.

If you do those eight things, it will look like it belongs.

---

## 11. Do / Don't

**Do:** dashed construction lines · bracketed labels · framed grayscale renders that develop on
hover · amber for the single most important mark · blue for active/selected/links · generous
negative space · uppercase mono labels + warm Inter prose.

**Don't:** drop shadows · gradients for decoration · rounded "app card" chrome · low-contrast
body text · signal colours as fills or on big areas · both signals on one element · cropping
SVG line-art with `cover` · typing animations longer than ~0.5s · roboticising Giuseppe's actual
human writing.
