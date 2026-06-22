'use strict';

/* ============================================================
   STRATA // ARCHITECT  ::  portfolio engine
   Style: prototype21 (operator-HUD / blueprint-terminal).
   Content: real dataset, neutral/technical voice.
   ============================================================ */

/* ---------- ENGINE / TOOL ICONS ---------- */
const fortniteIconSVG = `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.86 6.71l-1.72 1.72c-.19-.25-.43-.46-.72-.62l.98-2.35c.13-.32.02-.69-.27-.84s-.69-.02-.84.27l-.98 2.35c-.3-.09-.61-.13-.93-.13s-.63.04-.93.13l-.98-2.35c-.13-.32-.51-.45-.84-.27s-.45.51-.27.84l.98 2.35c-.29.16-.53.37-.72.62l-1.72-1.72c-.26-.26-.71-.23-.94.03s-.23.71.03.94l1.72 1.72c-.16.29-.27.6-.31.93H5.5c-.39 0-.7.31-.7.7s.31.7.7.7h2.35c.04.33.15.64.31.93l-1.72 1.72c-.26.26-.29.71-.03.94s.71.29.94.03l1.72-1.72c.25.19.54.33.85.42V17.5c0 .39.31.7.7.7s.7-.31.7-.7v-2.35c.3-.09.59-.23.85-.42l1.72 1.72c.26.26.71.23.94-.03s.23-.71-.03-.94l-1.72-1.72c.16-.29.27-.6.31-.93h2.35c.39 0 .7-.31.7-.7s-.31-.7-.7-.7H14.8c-.04-.33-.15-.64-.31-.93l1.72-1.72c.26-.26.29-.71.03-.94s-.71-.29-.94-.03z"/></svg>`;
const unrealEngineIconSVG = `<svg viewBox="0 0 210.4 210.4" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M105.2 5c55.3 0 100.2 45 100.2 100.2s-45 100.2-100.2 100.2S5 160.5 5 105.2 50 5 105.2 5m0-5C47.1 0 0 47.1 0 105.2s47.1 105.2 105.2 105.2 105.2-47.1 105.2-105.2S163.4 0 105.2 0z"/><path d="M97.9 42.2s-23.7 6.7-45 29.3-24 38.7-24 50.7c4.7-8 33.7-52.1 40.5-31.1v50.2s-.4 6.8-10.8 4.1c3.1 5.8 19.1 20.1 48 23 6.6-6.6 15.2-16.1 15.2-16.1l14.4 12.2s25.9-16.8 36.1-41.2c-9.5 6.2-21 20.6-27 10.5V72.7s15.4-23.1 17.8-24.2c-6.1 1.1-27.6 8.2-38.9 22.8-3.2-3.5-12.1-3.6-12.1-3.6s7 5.8 7.1 11.1 0 49.5 0 54.6c-4.8 4.9-9.9 7.5-13.2 7.5-7.7 0-9.9-2.7-12-5.4V71.3s-3.8 3.2-6.8-2S84.1 54 97.9 42.2z"/></svg>`;
const unityIconSVG = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M12.012 2.5a.708.708 0 00-.702.714v17.572a.71.71 0 00.702.714.715.715 0 00.708-.714V3.214a.71.71 0 00-.708-.714zm6.445 3.174l-5.07 2.927v8.788l5.07 2.937a.71.71 0 001.058-.616V6.29a.71.71 0 00-1.058-.616zm-12.896 0a.71.71 0 00-1.058.616v11.422a.71.71 0 001.058.616l5.07-2.937V8.601l-5.07-2.927zM11.304.002A.71.71 0 0010.59.61L3.41 4.66a.71.71 0 00-.352.617V18.72a.71.71 0 00.352.616L10.59 23.39a.714.714 0 00.708 0l7.18-4.056a.71.71 0 00.352-.616V5.277a.71.71 0 00-.352-.617L11.304 0z"/></svg>`;
const codeIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`;
const diceIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1" fill="currentColor"/><circle cx="15.5" cy="8.5" r="1" fill="currentColor"/><circle cx="15.5" cy="15.5" r="1" fill="currentColor"/><circle cx="8.5" cy="15.5" r="1" fill="currentColor"/></svg>`;

/* ---------- ROLE DEFINITIONS (disciplines) ---------- */
const roleDefinitions = {
  "Game Designer":            { title: "Game Designer",            description: "I think in systems. I design interconnected mechanics where every piece has a reason to exist and every decision creates a consequence." },
  "Technical Game Designer":  { title: "Technical Game Designer",  description: "Everything I design, I also build. When a project carries this tag, I wrote the design and implemented it in the engine myself." },
  "Leadership":               { title: "Leadership",               description: "I bring teams together and carry a vision from concept to ship. On these projects I was the person people looked to for direction." },
  "Game Programmer":          { title: "Game Programmer",          description: "I write production code: C++, Blueprints, Verse. On these projects I implemented systems inside an existing design or codebase." }
};
const ROLE_ORDER = ["Game Designer", "Technical Game Designer", "Leadership", "Game Programmer"];
const sortRoles = (roles) => {
  if (!roles) return [];
  return [...roles].sort((a, b) => {
    const ia = ROLE_ORDER.indexOf(a), ib = ROLE_ORDER.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });
};

/* ---------- PROJECT DATA ---------- */
const projectDetails = {
  "ProjectCadence": {
    id: "ProjectCadence", title: "Project Cadence", category: "personal work",
    published: true, tier: "hero", roles: ["Technical Game Designer", "Game Designer"],
    year: 2025, role: "Sole Systems Architect", context: "Personal · 1 month, in progress",
    image: "./assets/images/ProjectCadence.png", engine: "Unreal Engine / C++ / Metasound",
    video: "https://www.youtube.com/watch?v=GeYIX1rnFPA",
    short: "A C++ Unreal Engine plugin that turns music into gameplay. It parses a beatmap, maps each timestamp to an action, and fires those actions in-game on the beat. Built as a reusable framework, not a single game.",
    story: "I was on a bus listening to osu beatmaps and had a thought: could you parse a beatmap file, extract the note timestamps, and use them to make things happen in a game at exactly those moments? Not theoretically. Literally, as a buildable system. I went home and started finding out.\n\nThat became Project Cadence. A C++ plugin that uses Metasound to drive a timeline of notes. Each timestamp gets mapped to a gameplay action: move a platform, spawn an enemy, trigger an effect. The design separates timing data from behavior completely, so the same beatmap can power a completely different game depending on what behaviors you attach to each note.\n\nThe osu integration came from using osu as a mapping tool. A Python parser extracts the note timestamps from a beatmap file and builds a data table. That data table is what the system reads. The plan is to replace it with an in-editor tool eventually, but osu proved the concept immediately, because the mapping tooling already existed and the community had thousands of beatmaps ready to use.\n\nPerformance was a constraint from the start. Thousands of events can fire per track. The solution was lightweight UObjects instead of Actors for note state management: no spawn cost, no overhead, clean lifecycle. The architecture explicitly leaves room for object pooling as the next step.\n\nProject Circle was the first real test of whether the framework could hold up under a different genre entirely. It did, mostly. What it exposed was where the architecture needed extending.",
    tools: [{ name: "Unreal Engine", icon: unrealEngineIconSVG }, { name: "C++", icon: codeIconSVG }, { name: "Metasound", icon: codeIconSVG }],
    cardEngineName: "Unreal Engine",
    roleContributions: {
      "Game Designer": "<p><b>Design philosophy:</b> the system is built around one rule. Music should drive gameplay, not just accompany it. Timing data and behavior are separated entirely, so a designer can build different genres from the same beatmap without touching the framework.</p><p><b>Versatility by design:</b> the same architecture supports a rhythm FPS, a parkour game, or a twin-stick shooter. Every decision favored flexibility over specificity.</p>",
      "Technical Game Designer": "<p><b>Core architecture:</b> a C++ timeline driven by Metasound. A Python parser turns osu beatmap data into DataTables. The whole thing is a self-contained, reusable engine plugin.</p><p><b>Performance:</b> lightweight UObjects manage note state instead of Actors, so thousands of concurrent events carry no spawn overhead. Each instance owns its lifecycle and is built for a future object-pooling pass.</p><p><b>Designer-first:</b> two Blueprint-derivable classes do everything. One manages <i>when</i>, the other manages <i>what</i>. Designers build gameplay without writing C++.</p>"
    }
  },
  "ProjectSasha": {
    id: "ProjectSasha", title: "Project Sasha", category: "personal work",
    published: true, tier: "hero", roles: ["Game Designer", "Technical Game Designer"],
    year: 2025, role: "Sole Creator / Designer & Programmer", context: "Personal · In development",
    image: "./assets/images/ProjectSasha.svg", engine: "Unreal Engine / C++",
    videos: [
      { label: "Scanning V.1", file: "./assets/videos/Sasha SonarVersion 0.3.mp4" },
      { label: "Memory Economy", file: "./assets/videos/Sasha Memory system 0.1.mp4" }
    ],
    short: "A top-down exploration game where scanning is the entire game. Knowledge is the resource, memory is the currency, and every mechanic asks the same question: what is worth remembering?",
    story: "Sasha is the game I keep coming back to. The whole thing is built on one mechanic, scanning, and one rule: the world doesn't exist until you scan it into memory.\n\nYou pilot an android through a brutalist megastructure. There's no inventory in the normal sense. Everything you carry, know, or use is data, and data takes up a finite memory budget I call the Megabyte economy. Scanning something cheap and volatile (a Ghost Scan) lets you push further into the dark for free, but it doesn't last. Scanning something permanently (a Full Scan) solidifies it into the world but costs real memory you can't spend elsewhere. So every act of looking is also an act of budgeting.\n\nThe visual language is procedural. Scanned objects resolve as a dot-cloud generated from their bounding box and data weight, and a single material tint tells you the exact state of a thing without any UI: grey, then ice blue, then amber. The look comes straight from BLAME! and NieR: Automata. Sparse, functional, data-first.\n\nIt took a month of heavy iteration to get exploration, combat, and progression to all sit under that one budget cleanly. That's the part I'm proud of. Not the individual mechanics, but the fact that they are all the same mechanic seen from different angles.",
    tools: [{ name: "Unreal Engine", icon: unrealEngineIconSVG }, { name: "C++", icon: codeIconSVG }],
    cardEngineName: "Unreal Engine",
    roleContributions: {
      "Game Designer": "<p><b>Systemic narrative:</b> a cohesive economy where knowledge is the resource. A month of iteration unified exploration, combat, and progression under one 'Megabyte' budget, where every mechanical decision is a memory decision.</p><p><b>Player choice and tension:</b> a risk-and-reward loop close to managing torches in Minecraft. The Ghost Scan is volatile and free, for pushing into the dark. The Full Scan is permanent and costly, for solidifying the world. A constant trade between knowing more and keeping the capacity to act.</p><p><b>World design:</b> 'Digital Gnosticism'. The world is unformatted Biometal until you scan it into physical existence.</p>",
      "Technical Game Designer": "<p><b>Scanning algorithms:</b> the core scan runs on <span class='magic-link' data-src='./assets/videos/Sasha SonarVersion 0.3.mp4'>BFS waves</span> constrained by radius. An organic flood-fill, not a cheap instant reveal.</p><p><b>Procedural visual language:</b> a procedural mesh system generates a dot-cloud from each object's bounding box and data weight. Material tints (grey, then ice blue, then amber) tell the player the exact game state with no UI at all.</p><p><b>Memory architecture:</b> the <span class='magic-link' data-src='./assets/videos/Sasha Memory system 0.1.mp4'>Megabyte framework</span>. Volatile allocation, hard budgets, and an overflow guard that flashes red and blocks scans when you hit the limit.</p>"
    }
  },
  "ProjectCircle": {
    id: "ProjectCircle", title: "Project Circle", category: "personal work",
    published: true, tier: "hero", roles: ["Technical Game Designer"],
    year: 2025, role: "Sole Creator / Technical Game Designer", context: "Prototype / design experiment",
    image: "./assets/images/ProjectCircle.svg", engine: "Unreal Engine / C++", video: null,
    short: "A rhythm bullet-hell FPS built on the Cadence plugin. You run inside a hollow sphere while a giant boss fires at you in time with the music. One song per planet, one boss per sphere, community-authored. It proved Cadence could drive combat, and showed where the framework still needed work.",
    story: "The idea came directly from Cadence. I had a framework for making gameplay happen in sync with music, and I wanted to know if it could handle something chaotic: a bullet hell where the chaos itself is rhythmically authored.\n\nThe spherical gravity came from an older design obsession. The player is inside the planet, walking on the interior surface. The visual result is that the world curves upward around you in every direction, which changes how you read incoming projectile patterns and how movement feels at speed. It fits a bullet hell well, because your situational awareness has to work differently.\n\nThe design had community songs as a core pillar. Each planet corresponds to one track. The boss patterns for that planet are mapped to that song's beats. A community member who creates a beatmap is also authoring the boss fight. The system was already designed to support this, because of how Cadence separates timing data from behavior: you map timestamps to actions, and different mappers would map different actions to the same beats.\n\nWhat the prototype proved: Cadence could drive complex combat choreography across multiple simultaneous enemy behaviors. What it exposed: the framework needed extension to handle the density of events a bullet hell requires, without the timing system becoming a bottleneck.\n\nI have a new design direction for it now that I want to develop properly.",
    tools: [{ name: "Unreal Engine", icon: unrealEngineIconSVG }, { name: "C++", icon: codeIconSVG }],
    cardEngineName: "Unreal Engine",
    roleContributions: {
      "Technical Game Designer": "<p><b>Framework validation:</b> a fully working 3D bullet-hell prototype on the Cadence C++ framework, syncing complex attack patterns and projectile spawns entirely to Metasound data. It validated cross-genre capability and identified where the architecture needed extension for high-density events.</p><p><b>Spherical world design:</b> player gravity inverted to the interior surface of a hollow sphere. A readable but disorienting space that changes how bullet patterns are authored and dodged.</p>"
    }
  },
  "HighOnLife": {
    id: "HighOnLife", title: "High on Life", category: "professional work",
    published: true, tier: "hero", roles: ["Game Programmer", "Technical Game Designer"],
    year: 2025, role: "Game Programmer & Technical Designer", context: "Untold Games (for Squanch Games)",
    image: "./assets/images/HighOnLife.png", engine: "Unreal Engine / C++",
    video: "https://www.youtube.com/watch?v=qk2y4clYe9o",
    links: [{ label: "Available on request", icon: "request", url: "request" }],
    short: "Nintendo Switch port of High on Life. Over eight months I became the team's go-to reference for how the game actually worked: deep C++ and Blueprint debugging, internal tooling from scratch, and critical subsystems rewritten for Switch stability.",
    story: "A few months in I was genuinely having fun. The game's humor would catch me off guard constantly, and there was always something that would make me burst out laughing mid-debugging session.\n\nThe Lasagna Technique: there was a boss fight where one specific attack would break every collision in the entire game. Player, enemies, everything would fall through the floor indefinitely. To debug it I built stacked collision floors in their own sublevels, one on top of the other, to see which one the player would still land on when falling. I called it the Lasagna Technique. The actual cause was a division by zero inside the boss attack code. The Switch compiler handled that edge case differently from PC and killed the entire collision matrix. One code change fixed it. I was a very happy person for a few days.\n\nThe Bink Situation: every video in the game would go black if the player inserted an SD card. After a week of digging I found that the Unreal Engine source code for Switch had the read path and the write path pointing to the same location. It was looking for videos to read inside the write folder, finding nothing, and defaulting to black. I hardcoded the video path directly into the Bink media player CPP. Hacky, but it worked. I still have no idea how that bug had never surfaced in any other project.\n\nThe Ubergraph Crash: random crashes happening seemingly anywhere in the game. I traced it to a Blueprint event in the Game Instance that had two output execution pins connected to nothing. From earlier study of Unreal's Ubergraph, the compiled low-level version of Blueprints, I knew unused pins could create memory leaks. The Game Instance is the only object that persists across every level load in Unreal Engine. Those loose references were preventing the world from being properly destroyed during map transitions. I rewrote the event in C++, removed the pins, fixed.\n\nThe Lighting Tool: a technical artist needed to switch between different lighting setups per area for performance reasons. Simple idea: box colliders throughout the levels, each holding a lighting configuration, player entering triggers the switch. It took nine iterations to get it working correctly. The grapple hook disabled all player collisions including ours, so we had to create a separate attached actor. That actor caused a different issue where spawning inside a collider wouldn't register, so we added a forced collision check every 0.5 seconds for 60 seconds. Each fix introduced a new edge case. Nine iterations. It worked perfectly in the end.",
    tools: [{ name: "Unreal Engine", icon: unrealEngineIconSVG }, { name: "C++", icon: codeIconSVG }],
    cardEngineName: "Unreal Engine",
    roleContributions: {
      "Game Programmer": "<p><b>Deep-level debugging:</b> fixed critical C++ and Blueprint bugs. A division by zero killing the collision matrix, Ubergraph memory leaks in the Game Instance, the Bink video player reading from the wrong path, Remote Events firing on unloaded levels, and collision-frequency changes creating pass-through bugs for fast actors.</p><p><b>Switch-specific systems:</b> rewrote input identification for Joy-Con and Pro Controller detection, standardized how the settings menu handled controller switching, and traced platform-specific compiler differences.</p>",
      "Technical Game Designer": "<p><b>Tool development:</b> extended the cheat manager with Switch performance stats, and built a lighting-configuration system for a technical artist. A nine-iteration process, working around grapple-hook collision conflicts, spawn-inside-volume edge cases, and runtime actor attachment.</p><p><b>System documentation:</b> became the team's primary reference for how High on Life's systems interconnected (level streaming, enemy AI behavior trees, the custom input system) and made sure others could follow them too.</p>"
    }
  },
  "PoliceSimulator": {
    id: "PoliceSimulator", title: "Police Simulator: Patrol Officers", category: "professional work",
    published: true, tier: "supporting", roles: ["Game Programmer", "Technical Game Designer"],
    year: 2024, role: "Game Programmer & Technical Designer", context: "Untold Games (for Aesir Interactive)",
    image: "./assets/images/PoliceSimulator.png", engine: "Unreal Engine / C++",
    video: "https://www.youtube.com/watch?v=fL2SOhYZ6k8",
    short: "Nintendo Switch port. I took on deep-level bugs and built the debug tooling the team needed to test the game.",
    tools: [{ name: "Unreal Engine", icon: unrealEngineIconSVG }, { name: "C++", icon: codeIconSVG }],
    cardEngineName: "Unreal Engine",
    roleContributions: {
      "Game Programmer": "<p><b>Bug-fixing and stabilization:</b> overhauled the Switch input system, fixed critical level-loading and stability bugs, and resolved a wide range of gameplay issues inside a large codebase.</p>",
      "Technical Game Designer": "<p><b>Tool development:</b> designed and built a full debug cheat menu from scratch with ImGui, giving QA and the dev team the tools they needed to test and validate.</p>"
    }
  },
  "Battleship": {
    id: "Battleship", title: "UEFN: Battleship", category: "professional work",
    published: true, tier: "listed", roles: ["Technical Game Designer", "Game Designer"],
    year: 2023, role: "Lead Creator & Verse Developer", context: "Untold Games · Fortnite",
    image: "./assets/images/Battleship.jpeg", engine: "UEFN / Verse", video: null,
    links: [{ label: "Play on Fortnite", icon: "game", url: "https://www.fortnite.com/@untoldgames/1028-2740-2494" }],
    short: "A fast strategy game taken from concept to launch on Fortnite. I designed the rules and built the entire custom battleship system in Verse.",
    tools: [{ name: "UEFN", icon: fortniteIconSVG }, { name: "Verse", icon: codeIconSVG }],
    cardEngineName: "UEFN",
    roleContributions: {
      "Technical Game Designer": "<p><b>Core gameplay (Verse):</b> built all primary systems in Verse. The interactive combat grid, the ship-placement logic, and real-time player feedback.</p>",
      "Game Designer": "<p><b>Game design and vision:</b> led the whole design process, from the core ruleset to launch on the Fortnite platform.</p>"
    }
  },
  "PulseParty": {
    id: "PulseParty", title: "PulseParty", category: "professional work",
    published: true, tier: "listed", roles: ["Technical Game Designer", "Game Designer"],
    year: 2023, role: "Lead Systems Programmer", context: "Untold Games · Fortnite",
    image: "./assets/images/PulsePartyThumbnail.png", engine: "UEFN / Verse",
    video: "https://www.youtube.com/watch?v=CzMTSNYmdYI",
    links: [{ label: "Play on Fortnite", icon: "game", url: "https://www.fortnite.com/@untoldgames/8369-2685-8749" }],
    short: "A chaotic party game. Eight distinct minigames (races, deathmatches, king of the hill) strung together in one framework, all built in Verse.",
    tools: [{ name: "UEFN", icon: fortniteIconSVG }, { name: "Verse", icon: codeIconSVG }],
    cardEngineName: "UEFN",
    roleContributions: {
      "Technical Game Designer": "<p><b>Lead systems programmer:</b> built the entire party-game framework from scratch in Verse. The hub, the map-switching logic for eight minigames, and a state manager that handled each mode's rules.</p>",
      "Game Designer": "<p><b>Game design:</b> co-designed the expansion from a single deathmatch concept into eight distinct minigame modes.</p>"
    }
  },
  "Alien": {
    id: "Alien", title: "Alien (Prototype)", category: "personal work",
    published: true, tier: "supporting", roles: ["Technical Game Designer", "Game Designer"],
    year: 2022, role: "Sole Creator", context: "Personal prototype",
    image: "./assets/images/work-5.jpg", engine: "Unreal Engine", video: null,
    links: [{ label: "Read on Substack", icon: "doc", url: "https://open.substack.com/pub/giuseppeluigialfieri/p/game-prototypes-alien?r=3ko0h9&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true" }],
    short: "A reverse-horror prototype and a love letter to Aliens vs. Predator 2, built around the feeling of being a stealthy, powerful Facehugger. Movement and possession are the whole experiment.",
    tools: [{ name: "Unreal Engine", icon: unrealEngineIconSVG }],
    cardEngineName: "Unreal Engine",
    roleContributions: {
      "Technical Game Designer": "<p><b>Movement system:</b> a powerful movement kit. A standard jump, a forward-dashing double jump for aggressive repositioning, and a tentacle grapple.</p><p><b>Possession mechanic:</b> the core possession system, from concept to implementation. You target an enemy with tentacles and launch into them to take full control of their body, weapons, and abilities.</p>",
      "Game Designer": "<p><b>Design vision:</b> conceived the whole prototype as a love letter to AVP2's Facehugger campaign. Interconnected mechanics designed to create emergent scenarios.</p>"
    }
  },
  "FullCppMechGame": {
    id: "FullCppMechGame", title: "Turn-Based Tactics (The C++ Bet)", category: "personal work",
    published: false, tier: "listed", roles: ["Technical Game Designer", "Game Programmer"],
    year: 2024, role: "Sole Creator", context: "Personal · 1 month", image: "./assets/images/work-5.jpg",
    engine: "Unreal Engine / C++", video: null,
    links: [{ label: "View on GitHub", icon: "github", url: "https://github.com/VarXael/MechaTopDown" }],
    short: "A 1v1 turn-based tactics game, built strictly in C++ to prove a point to a skeptical Computer Science professor. Zero Blueprints, one month, full-time job on the side.",
    tools: [{ name: "Unreal Engine", icon: unrealEngineIconSVG }, { name: "C++", icon: codeIconSVG }],
    cardEngineName: "Unreal Engine", roleContributions: {}
  },
  "TheLibrary": {
    id: "TheLibrary", title: "The Library (12-Hour Sprint)", category: "personal work",
    published: false, tier: "listed", roles: ["Technical Game Designer"],
    year: 2023, role: "Sole Programmer & Systems Designer", context: "Personal · 12-hour build",
    image: "./assets/images/work-5.jpg", engine: "Unreal Engine / Blueprints", video: null,
    links: [{ label: "View on GitHub", icon: "github", url: "https://github.com/VarXael/LibraryProject" }],
    short: "A 'Papers, Please meets Overcooked' prototype: a magical shop where customers ask for strange books.",
    tools: [{ name: "Unreal Engine", icon: unrealEngineIconSVG }, { name: "Blueprints", icon: codeIconSVG }],
    cardEngineName: "Unreal Engine", roleContributions: {}
  },
  "MonkHomebrew": {
    id: "MonkHomebrew", title: "Monk Homebrew (D&D 5e)", category: "personal work",
    published: true, tier: "listed", roles: ["Game Designer"],
    year: 2023, role: "Game Designer", context: "Personal · Tabletop",
    image: "./assets/images/Monk.png", engine: "Tabletop", video: null,
    links: [{ label: "Download PDF", icon: "doc", url: "https://drive.google.com/file/d/1cyUGRzfhP4CjVwDljmbiXhwORSPAUSpp/view?usp=sharing" }],
    short: "A ground-up rebuild of the D&D Monk around a new core mechanic, the Vessels of Ki: spectral objects that hold memories, emotions, and ideas, used to attack, defend, and pay for abilities. The redesign was tight enough that the existing subclasses slotted in without major reworks.",
    story: "The PHB Monk has a mechanical identity problem. Its features are useful but disconnected: ki points, Stunning Strike, Deflect Missiles, Unarmored Defense. There's no through-line. Subclasses then try to bolt something thematic on top of a chassis that doesn't have a clear idea of what it is.\n\nThe redesign started from a single question: what if ki was something you could hold, shape, and lose? The answer became Vessels: spectral floating objects orbiting the monk, imbued with memories, emotions, or ideas. You create them, fill them, and sacrifice them. Attacking with them, defending with them, empowering abilities with them. The resource is physical and present at the table.\n\nThe proof that the system worked came from the subclasses. Way of Shadow empties vessels to cast its spells, so thematically you are sacrificing something to disappear. Way of Mercy sacrifices a vessel to bring someone back from death, so the vessel becomes the price of resurrection. Deflect Attack now destroys a vessel to reduce incoming damage, mechanically identical to before but now it costs something you can see. Every existing subclass feature had a more natural home in the new framework than it had originally.\n\nThe base class changed enough that some subclasses needed tweaks. None needed a full rebuild. That's the test.",
    tools: [{ name: "Tabletop", icon: diceIconSVG }],
    cardEngineName: "Tabletop",
    roleContributions: {
      "Game Designer": "<p><b>Core mechanic design:</b> the Vessels of Ki system from scratch. Creation, filling, bonding, and sacrifice, plus the two action categories (Ki Absorptions and Ki Strikes) that replaced the old ki-point model. The resource is finite, physical, and carries flavor: vessels hold memories and emotions that shape how they interact with enemies and allies.</p><p><b>Subclass integration:</b> rewrote eight existing subclasses to use vessels natively. The test for each: does using a vessel here feel like a natural extension of the subclass, or a tax? Every one passed, and several became more coherent than they were originally.</p>"
    }
  },
  "Cycle": {
    id: "Cycle", title: "Cycle", category: "university work",
    published: true, tier: "hero", roles: ["Leadership", "Game Designer", "Game Programmer"],
    year: 2021, role: "Director, Sole Programmer, Designer", context: "Falmouth University · Team of 3",
    image: "./assets/images/Cycle.png", engine: "Unreal Engine",
    video: "https://youtu.be/Cuwhx4b7tYo",
    links: [
      { label: "Play on itch.io", icon: "game", url: "https://wrong-world-studios.itch.io/cycle" },
      { label: "View on The Rookies", icon: "trophy", url: "https://www.therookies.co/entries/13406" },
      { label: "View on GitHub", icon: "github", url: "https://github.com/VarXael/Cycle" }
    ],
    short: "Best 3rd-Year Videogame at Falmouth 2021, and chosen to represent the university at the G7 Summit in Cornwall. A surrealist puzzle-adventure built by two artists and me. I had never used Unreal before this. I spent August learning it, then we made the game.",
    story: "Oliver approached me after our second year and said he wanted to make something together. I knew him well but we had never actually worked on the same project. He was genuinely talented so I said yes immediately. I also knew Anastasia had to be part of it. I had worked with her the year before and was floored by her concept art. The three of us formed Wrong World Studios.\n\nI had never used Unreal Engine before this project. I spent the entire month of August learning it. We started development in October.\n\nThe first phase was world building. We wanted something that felt truly different. I had this elaborate concept called Pillar World: giant beams of primordial flame, a darkness below, creatures built from solidified light. It was too complex for what three people could build in eight months. Anastasia was the one who shifted our direction. She opened my eyes to surrealism: you do not need to explain a world for it to feel real. You just need it to feel strange and somehow safe at the same time.\n\nThat became Cycle. A world stuck in a single moment, waiting for someone to bring the phases of the day back. The feeling we were after was something like: I know you feel lost, but I am here, and I will guide you through this.\n\nI wore every hat on the project. There were decisions the team disagreed with. I made them anyway, and in most cases they turned out to be right. That responsibility was uncomfortable and it taught me more about directing than anything else I have done.\n\nThe seamless teleports are probably my favourite technical detail. You get moved around the world without ever knowing it happened. Nobody who played the game ever noticed, but people consistently reported feeling slightly disoriented in a way they could not explain. That was exactly the feeling we wanted.\n\nThe G7 Summit preparation was less dramatic than it sounds. They mainly wanted a timer added and the menus adjusted for easy playtesting by delegates.\n\nWe won Best 3rd Year Videogame at Falmouth University 2021. The university still shows Cycle at their expos, years after I left. That means a lot.\n\nBoth Anastasia and Oliver have since left the games industry. That gives me a stronger reason to keep going. To one day make something as strange and beautiful as what we built together, and show it to them.",
    tools: [{ name: "Unreal Engine", icon: unrealEngineIconSVG }],
    cardEngineName: "Unreal Engine",
    roleContributions: {
      "Leadership": "<p><b>Project direction:</b> led a team of three from pre-production to publishing on itch.io and The Rookies. Held creative direction through disagreements, managed milestones, and kept scope to what three people could actually ship. Prepared the game for the G7 Summit demonstration in Cornwall.</p><p><b>Team formation:</b> assembled the team around each person's specific strengths. Both teammates poured enormous trust into the project and delivered exceptional work throughout.</p>",
      "Game Designer": "<p><b>Systems design:</b> designed the hub world that changes as the player retrieves each phase of the day, and the day/night cycle tied directly to progression. Designed and iterated the puzzles across every level, playtesting each one personally.</p><p><b>Level design:</b> my first time designing levels seriously. The frog level, the coliseum puzzle, the clock level, and the final sun sequence. The clock level was designed and working in a week. The coliseum took a lot longer.</p>",
      "Game Programmer": "<p><b>Sole programmer:</b> built every system in Unreal Engine 4 from scratch on an engine I had never used. Hub progression, seamless transitions, the collectibles system with a final cutscene, day/night cycle, respawn, and all the puzzle logic.</p><p><b>Seamless transitions:</b> players are teleported between areas without ever noticing. Nobody caught the teleport. Everybody felt subtly disoriented in a way they couldn't explain. Exactly the feeling we wanted.</p>"
    }
  },
  "CardsWeaver": {
    id: "CardsWeaver", title: "Card's Weaver", category: "university work",
    published: true, tier: "supporting", roles: ["Leadership", "Game Designer"],
    year: 2023, role: "Lead Game Designer", context: "University · Team of 4",
    image: "./assets/images/Card's Weaver.png", engine: "Unreal Engine", video: null,
    links: [{ label: "Play on itch.io", icon: "game", url: "https://batraf.itch.io/cards-weaver" }],
    short: "A card game built at university in Unreal Engine. I led a small design team and owned the core rules, the central resource mechanic, and the gameplay loop.",
    tools: [{ name: "Unreal Engine", icon: unrealEngineIconSVG }],
    cardEngineName: "Unreal Engine",
    roleContributions: {
      "Leadership": "<p><b>Lead designer:</b> guided a team of four designers from concept to a fully playable prototype, managing direction and resolving creative disagreements.</p>",
      "Game Designer": "<p><b>Core systems design:</b> designed the card abilities, the central resource mechanic, and the overall gameplay loop.</p>"
    }
  },
  "SoulDriven": {
    id: "SoulDriven", title: "Soul Driven", category: "university work",
    published: true, tier: "listed", roles: ["Game Programmer", "Technical Game Designer"],
    year: 2023, role: "Systems Programmer", context: "University of Verona · Mobile game class",
    image: "./assets/images/work-6.jpg", engine: "Unity", video: null,
    links: [
      { label: "Play on itch.io", icon: "game", url: "https://fraffer.itch.io/soul-driven" },
      { label: "View on GitLab", icon: "gitlab", url: "https://gitlab.com/Pietro92/soul-driven-project" }
    ],
    short: "An action game where I owned the character architecture: a runtime class-switching system built on the Strategy pattern, documented well enough that any teammate could add a new class without touching my code.",
    story: "It was a university project for a mobile game class, a team of a few people. I was responsible for the player character systems.\n\nThe core problem: the game had multiple playable classes (Warrior, Mage, Ranger) and the player needed to be able to switch between them at runtime. The naive solution is a big switch statement somewhere. The right solution is the Strategy pattern.\n\nI built ISoulInterface, which defines the contract every Soul class has to fulfil. Each Soul (Warrior, Mage, Ranger) derives from a Souls base class that implements LoadStats(), pulling from its own ScriptableObject stat table. The Player holds a reference to the current Soul via the interface and swaps it at runtime. Weapons run in a parallel hierarchy via IWeaponInterface, also swapped independently.\n\nThe part I am most proud of is the documentation. I drew out the full class diagram in Miro and wrote a step-by-step guide: how to name your script, which folder it goes in, which interface to implement, how to create and register the ScriptableObject, how to link it to the stat manager. Adding a class became an independent, documented process that anyone on the team could follow without touching the systems I had built.\n\nThe architecture held. Adding classes didn't break anything.",
    tools: [{ name: "Unity", icon: unityIconSVG }],
    cardEngineName: "Unity",
    roleContributions: {
      "Technical Game Designer": "<p><b>System architecture:</b> designed the class-switching system around the Strategy pattern, so Soul classes were hot-swappable at runtime with no conditional logic in the Player. Each Soul owns its stats, weapons, and animations independently.</p><p><b>Documentation:</b> produced a full class diagram and an onboarding flowchart for adding new Soul classes, so anyone could add one by following the guide.</p>",
      "Game Programmer": "<p><b>Strategy pattern implementation:</b> built ISoulInterface and IWeaponInterface, the base classes, and the ScriptableObject stat system. The Player swaps interface references at runtime. Stat loading, weapon assignment, and animation override all flow through the interface without the Player knowing which Soul is active.</p>"
    }
  },
  "ProjectCenturion": {
    id: "ProjectCenturion", title: "Project Centurion", category: "university work",
    published: true, tier: "listed", roles: ["Game Designer", "Game Programmer"],
    year: 2020, role: "Game Designer & Developer", context: "University project",
    image: "./assets/images/work-4.jpg", engine: "Unity", video: null,
    links: [{ label: "View document", icon: "doc", url: "https://drive.google.com/file/d/1kqrXXSPwxUrCUG9qNnqnNzSuWa9S9QJv/view?usp=sharing" }],
    short: "An early university game with a historical theme. I co-designed the core loop and level structure and built player movement and interaction in Unity.",
    tools: [{ name: "Unity", icon: unityIconSVG }],
    cardEngineName: "Unity",
    roleContributions: {
      "Game Designer": "<p>Co-designed the core gameplay loop and level structure.</p>",
      "Game Programmer": "<p>Implemented player movement and interaction systems in Unity and C#.</p>"
    }
  },
  "UnrealEngineCourse": {
    id: "UnrealEngineCourse", title: "Unreal Engine Course", category: "professional work",
    published: true, tier: "listed", roles: ["Game Programmer", "Technical Game Designer"],
    year: 2022, role: "Unreal Engine Tutor", context: "Creativity Unleashed · Udemy",
    image: "./assets/images/work-1.jpg", engine: "Unreal Engine", video: null,
    links: [{ label: "View on Udemy", icon: "school", url: "https://www.udemy.com/course/complete-unreal-engine-megacourse-beginner-to-expert/" }],
    short: "A 16-hour Unreal Engine course, published on Udemy. It introduces Blueprints and the common programming patterns behind them, from the ground up.",
    tools: [{ name: "Unreal Engine", icon: unrealEngineIconSVG }],
    cardEngineName: "Unreal Engine",
    roleContributions: {
      "Technical Game Designer": "<p>Designed and recorded course modules covering Unreal Engine fundamentals, Blueprints, and common game programming patterns, with example projects and exercises for students.</p>"
    }
  },
  "CRTexe": {
    id: "CRTexe", title: "CRT.exe", category: "game jams",
    published: true, tier: "supporting", roles: ["Leadership", "Game Designer"],
    year: 2026, role: "Project Lead & SFX Designer", context: "Brackeys Game Jam 2026.1 · Team of 8",
    image: "./assets/images/CRTexe.svg", engine: "Godot", video: null,
    links: [{ label: "Play on itch.io", icon: "game", url: "https://gianluca-iacchini.itch.io/crt-exe" }],
    short: "Led a team of eight through a game jam by designing the game around how the team could actually function. Each area owned by one person, one mechanic, one hidden code. No dependencies, no bottlenecks.",
    story: "Every team has a different dynamic. This one had strong, independent personalities, which is great for creativity and harder for cohesion. The question was not how to get everyone to agree on everything, but what structure would let each person contribute without depending on anyone else to make progress.\n\nThe theme was strange places. The idea I pitched was simple: there is a TV, it asks for a code, you find the code somewhere in the current area, you input it, and now you are somewhere new. That is the whole loop.\n\nThe reason it worked for the team was structural. Anyone who wanted to could claim an area, design whatever mechanic they felt like for it, hide a code somewhere inside, and own that piece completely from start to finish. No coordination required. No one blocking anyone else. You could make progress on your area without a single conversation with the rest of the group.\n\nThe design solved the team problem. They were the same solution.\n\nI went in planning to just make sound effects and not stress too much about it. I ended up leading the whole group to a finished submission. The game was rough. But I left knowing exactly how I would run the next one.",
    tools: [{ name: "Godot", icon: codeIconSVG }],
    cardEngineName: "Godot",
    roleContributions: {
      "Leadership": "<p><b>Team structure:</b> diagnosed what would make this specific team functional and built the production around it. Each person owned one area completely: their mechanic, their level, their hidden code. No bottlenecks, no blocking, and the team reached a finished submission.</p>",
      "Game Designer": "<p><b>Systems design:</b> the structure of the game was also the structure of the team. The TV-and-code loop made every area self-contained by design, which is exactly what made parallel, independent development possible.</p>"
    }
  },
  /* ---- UNPUBLISHED (kept in data, hidden from the site) ---- */
  "Covid19Training": {
    id: "Covid19Training", title: "Covid-19 PPE Training", category: "professional work",
    published: false, tier: "listed", roles: ["Game Programmer"], year: 2021,
    role: "Game Programmer", context: "Cineon Training", image: "./assets/images/work-2.jpg",
    engine: "Unreal Engine", video: null, short: "A VR PPE training simulation built in Unreal Engine.",
    tools: [{ name: "Unreal Engine", icon: unrealEngineIconSVG }], cardEngineName: "Unreal Engine",
    roleContributions: {}
  },
  "SyovaraHomebrew": {
    id: "SyovaraHomebrew", title: "Syovara Homebrew", category: "personal work",
    published: false, tier: "listed", roles: ["Game Designer"], year: 2023,
    role: "Game Designer", context: "Personal · Tabletop", image: "./assets/images/Syovara.jpg",
    engine: "Tabletop", video: null, short: "A custom D&D setting: lore, cultures, and unique mechanics.",
    tools: [{ name: "Tabletop", icon: diceIconSVG }], cardEngineName: "Tabletop", roleContributions: {}
  },
  "MaGiTeProject": {
    id: "MaGiTeProject", title: "MaGiTe Project", category: "professional work",
    published: false, tier: "listed", roles: ["Game Programmer"], year: 2025,
    role: "Game Developer", context: "Umeå University", image: "./assets/images/Umeå_University_Resized.png",
    engine: "Unreal Engine", video: null, short: "A research collaboration prototyping educational modules in Unreal Engine.",
    tools: [{ name: "Unreal Engine", icon: unrealEngineIconSVG }], cardEngineName: "Unreal Engine",
    roleContributions: {}
  },
  "FallingFusion": {
    id: "FallingFusion", title: "Falling Fusion", category: "game jams",
    published: false, tier: "listed", roles: ["Game Designer"], year: 2022,
    role: "Game Designer & Developer", context: "Game Jam", image: "./assets/images/work-8.jpg",
    engine: "Unreal Engine", video: null, short: "A game-jam entry built around a fusion mechanic in Unreal Engine.",
    tools: [{ name: "Unreal Engine", icon: unrealEngineIconSVG }], cardEngineName: "Unreal Engine",
    roleContributions: {}
  },
  "NickelNinja": {
    id: "NickelNinja", title: "Nickel Ninja", category: "game jams",
    published: false, tier: "listed", roles: ["Game Designer"], year: 2022,
    role: "Game Designer & Developer", context: "Global Game Jam 2022", image: "./assets/images/work-7.jpg",
    engine: "Unity", video: null, short: "A Global Game Jam 2022 entry.",
    tools: [{ name: "Unity", icon: unityIconSVG }], cardEngineName: "Unity", roleContributions: {}
  }
};

/* ---------- CATEGORY GROUPS ---------- */
const CATS = [
  { key: "PROFESSIONAL", label: "PROFESSIONAL", match: "professional work" },
  { key: "PERSONAL",     label: "PERSONAL",     match: "personal work" },
  { key: "UNIVERSITY",   label: "UNIVERSITY",   match: "university work" },
  { key: "JAM",          label: "GAME JAM",     match: "game jams" }
];
const TIER_ORDER = { hero: 0, supporting: 1, listed: 2 };

/* Published projects, grouped + ordered per category (hero -> supporting -> listed, then year desc) */
function projectsForCat(catMatch) {
  return Object.values(projectDetails)
    .filter(p => p.published && p.category === catMatch)
    .sort((a, b) => {
      const ta = TIER_ORDER[a.tier] ?? 9, tb = TIER_ORDER[b.tier] ?? 9;
      if (ta !== tb) return ta - tb;
      return (b.year || 0) - (a.year || 0);
    });
}

/* Flat ordered list of published ids (matches DOM order) */
let ORDERED_IDS = [];
function buildOrderedIds() {
  ORDERED_IDS = [];
  CATS.forEach(c => projectsForCat(c.match).forEach(p => ORDERED_IDS.push(p.id)));
}

/* Published projects that carry a given discipline, in archive order */
function projectsForRole(role) {
  buildOrderedIds();
  return ORDERED_IDS
    .map(id => projectDetails[id])
    .filter(p => (p.roles || []).includes(role));
}

/* ---------- DOM REFS ---------- */
const navBtns = document.querySelectorAll('#main-nav button');
const listContainer = document.getElementById('proj-list');
const terminalPane = document.querySelector('.pane-terminal');
const filterBtns = document.querySelectorAll('#arc-filters button');
const disciplineChips = document.querySelectorAll('.chip[data-role]');

let currentState = 'overview';
let activeProjectId = null;
let activeDiscipline = null;

/* ---------- STATE MACHINE ---------- */
function setState(state) {
  currentState = state;
  navBtns.forEach(btn => btn.classList.toggle('on', btn.dataset.state === state));
  document.body.className = `state-${state}`;
  warpSpike();
}
navBtns.forEach(btn => btn.addEventListener('click', () => setState(btn.dataset.state)));

/* ---------- RENDER PROJECT LIST (terminal pane) ---------- */
function renderList() {
  buildOrderedIds();
  listContainer.innerHTML = '';

  CATS.forEach(cat => {
    const items = projectsForCat(cat.match);
    if (items.length === 0) return;

    const divi = document.createElement('div');
    divi.className = 'list-divider';
    divi.id = 'cat-' + cat.key;
    divi.dataset.cat = cat.key;
    divi.textContent = `// ${cat.label}`;
    listContainer.appendChild(divi);

    items.forEach(p => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'list-item';
      item.dataset.id = p.id;
      const idxLabel = `MOD_${String(ORDERED_IDS.indexOf(p.id) + 1).padStart(2, '0')}`;
      item.innerHTML = `
        <div class="li-thumb"><img src="${p.image}" alt="${p.title}" loading="lazy"></div>
        <div class="li-text">
          <div class="li-meta">${idxLabel} · ${p.year || ''}</div>
          <div class="li-title">${p.title}</div>
        </div>`;
      item.addEventListener('click', () => {
        setPreview(p.id);
        if (currentState !== 'archive') setState('archive');
      });
      listContainer.appendChild(item);
    });
  });

  if (!activeProjectId) setPreview(ORDERED_IDS[0]);
}

/* ---------- YOUTUBE HELPER ---------- */
function getYouTubeId(url) {
  if (!url) return null;
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  return m ? m[1] : null;
}

const LINK_FALLBACK = {
  game: 'OPEN', github: 'GITHUB', gitlab: 'GITLAB', doc: 'DOCUMENT', school: 'COURSE',
  trophy: 'AWARD', request: 'CONTACT', link: 'LINK'
};

/* ---------- PREVIEW PANE ---------- */
const $ = id => document.getElementById(id);

function buildContribHTML(p) {
  if (p.roleContributions && Object.keys(p.roleContributions).length) {
    return sortRoles(Object.keys(p.roleContributions)).map((r, i) => {
      const idx = String(i + 1).padStart(2, '0');
      return `<div class="role-box"><h4 class="role-head"><span class="role-idx">${idx}</span>${r}</h4>${p.roleContributions[r]}</div>`;
    }).join('');
  }
  return '';
}

function setPreview(id) {
  const p = projectDetails[id];
  if (!p) return;
  activeProjectId = id;

  listContainer.querySelectorAll('.list-item').forEach(el =>
    el.classList.toggle('active', el.dataset.id === id));

  // Media
  const media = $('prev-media');
  const ytId = getYouTubeId(p.video);
  if (p.videos && p.videos.length) {
    const list = p.videos.map((v, i) =>
      `<button class="vid-btn ${i === 0 ? 'on' : ''}" data-src="${v.file}">${v.label}</button>`).join('');
    media.innerHTML = `
      <div class="media-stage has-video" id="media-stage">
        <video id="prev-video" src="${p.videos[0].file}" poster="${p.image}" controls muted loop playsinline preload="metadata" controlsList="nodownload noremoteplayback"></video>
        <svg class="reticle-lock" viewBox="0 0 60 60"><circle cx="30" cy="30" r="16"/><path d="M30 4v10M30 46v10M4 30h10M46 30h10"/></svg>
        <button class="media-expand" id="media-expand" title="Expand / collapse">&#x2922;</button>
      </div>
      <div class="vid-playlist">${list}</div>`;
  } else if (ytId) {
    media.innerHTML = `
      <a class="media-stage yt" href="https://www.youtube.com/watch?v=${ytId}" target="_blank" rel="noopener">
        <img src="https://img.youtube.com/vi/${ytId}/maxresdefault.jpg" alt="${p.title}"
             onerror="this.onerror=null;this.src='https://img.youtube.com/vi/${ytId}/hqdefault.jpg'">
        <svg class="reticle-lock" viewBox="0 0 60 60"><circle cx="30" cy="30" r="16"/><path d="M30 4v10M30 46v10M4 30h10M46 30h10"/></svg>
        <span class="yt-play">&#9658; WATCH VIDEO_LOG</span>
      </a>`;
  } else {
    media.innerHTML = `
      <div class="media-stage">
        <img src="${p.image}" alt="${p.title}">
        <svg class="reticle-lock" viewBox="0 0 60 60"><circle cx="30" cy="30" r="16"/><path d="M30 4v10M30 46v10M4 30h10M46 30h10"/></svg>
      </div>`;
  }
  wireMedia();

  // Header + fields
  $('prev-cmd').textContent = `> INSPECT MODULE :: ${p.title.toUpperCase()}`;
  $('prev-title').textContent = p.title;
  $('prev-cat').textContent = (CATS.find(c => c.match === p.category) || {}).label || p.category;
  $('prev-yr').textContent = p.year || '·';
  $('prev-eng').textContent = p.engine || p.cardEngineName || '·';
  $('prev-role').textContent = p.role || '·';

  // Synopsis + context
  $('prev-syn').textContent = p.short || '';
  const ctx = $('prev-context');
  ctx.textContent = p.context || '';
  ctx.style.display = p.context ? '' : 'none';

  // Tools
  $('prev-tools').innerHTML = (p.tools && p.tools.length)
    ? p.tools.map(t => `<span class="tool-chip">${t.name}</span>`).join('') : '';

  // Story tab availability
  const hasStory = !!(p.story && p.story.trim());
  $('prev-tabs').innerHTML = `<button class="prev-tab on" data-tab="overview">OVERVIEW</button>` +
    (hasStory ? `<button class="prev-tab" data-tab="story">THE STORY</button>` : '');

  // Contributions (all disciplines)
  $('prev-contrib').innerHTML = buildContribHTML(p);

  // Story content
  $('prev-story').innerHTML = hasStory
    ? p.story.split('\n\n').map(par => `<p>${par.trim()}</p>`).join('') : '';

  // Reset tab view to overview
  $('prev-overview').style.display = '';
  $('prev-story').style.display = 'none';
  wireTabs();

  // Links
  $('prev-links').innerHTML = (p.links || []).map(l => {
    const label = (l.label || LINK_FALLBACK[l.icon] || 'OPEN').toUpperCase();
    if (l.url === 'request') return `<a class="btn-action" href="mailto:giuseppeluigi.alfieri@gmail.com">${label}</a>`;
    return `<a class="btn-action" href="${l.url}" target="_blank" rel="noopener">${label}</a>`;
  }).join('');

  // scroll preview to top on change
  const pane = document.querySelector('.pane-preview');
  if (pane) pane.scrollTop = 0;
}

function wireTabs() {
  document.querySelectorAll('.prev-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.prev-tab').forEach(t => t.classList.remove('on'));
      tab.classList.add('on');
      const story = tab.dataset.tab === 'story';
      $('prev-overview').style.display = story ? 'none' : '';
      $('prev-story').style.display = story ? '' : 'none';
    });
  });
}

function wireMedia() {
  const stage = $('media-stage');
  const video = $('prev-video');
  if (!stage || !video) return;

  // Autoplay on hover, but let the player keep its own state once the user takes over.
  stage.addEventListener('mouseenter', () => { if (video.paused) video.play().catch(() => {}); });

  const exp = $('media-expand');
  if (exp) exp.addEventListener('click', e => {
    e.stopPropagation();
    stage.classList.toggle('expanded');
    if (stage.classList.contains('expanded')) video.play().catch(() => {});
  });

  document.querySelectorAll('.vid-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.vid-btn').forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
      video.src = btn.dataset.src; video.load(); video.play().catch(() => {});
    });
  });
}

/* Magic-links inside contribution text (Sasha) switch + play the inline video */
document.addEventListener('click', e => {
  const ml = e.target.closest('.magic-link');
  if (!ml) return;
  e.preventDefault();
  const src = ml.getAttribute('data-src');
  const video = $('prev-video');
  const stage = $('media-stage');
  if (video && src) {
    document.querySelectorAll('.vid-btn').forEach(b => b.classList.toggle('on', b.dataset.src === src));
    video.src = src; video.load(); video.play().catch(() => {});
    if (stage) { stage.classList.add('expanded'); stage.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
  }
});

/* ---------- ARCHIVE CATEGORY FILTERS (scroll-to + scroll-spy) ---------- */
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const el = document.getElementById('cat-' + btn.dataset.cat);
    if (el) terminalPane.scrollTo({ top: el.offsetTop - 60, behavior: 'smooth' });
  });
});
terminalPane.addEventListener('scroll', () => {
  if (currentState !== 'archive') return;
  const dividers = [...document.querySelectorAll('.list-divider')];
  let current = dividers[0];
  for (const d of dividers) if (d.offsetTop - terminalPane.scrollTop <= 160) current = d;
  if (current) filterBtns.forEach(b => b.classList.toggle('on', b.dataset.cat === current.dataset.cat));
});

/* ============================================================
   DISCIPLINE LENS (left-morph page)
   ============================================================ */
const discRail = $('disc-rail');
const discProjects = $('disc-projects');

function renderDiscipline(role) {
  activeDiscipline = role;
  const def = roleDefinitions[role];
  if (!def) return;

  // rail tabs (all four disciplines)
  discRail.innerHTML = ROLE_ORDER.map(r =>
    `<button class="disc-tab ${r === role ? 'on' : ''}" data-role="${r}">${roleDefinitions[r].title}</button>`).join('');
  discRail.querySelectorAll('.disc-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      if (tab.dataset.role === activeDiscipline) { setState('overview'); return; }
      renderDiscipline(tab.dataset.role);
    });
  });

  $('disc-title').textContent = def.title;
  $('disc-desc').textContent = def.description;

  const list = projectsForRole(role);
  $('disc-count').textContent = `${String(list.length).padStart(2, '0')} MODULE${list.length === 1 ? '' : 'S'} CARRY THIS TAG`;

  discProjects.innerHTML = list.map(p => {
    const contrib = (p.roleContributions && p.roleContributions[role]) || '';
    const catLabel = (CATS.find(c => c.match === p.category) || {}).label || p.category;
    const tools = (p.tools || []).map(t => `<span class="dp-tool">${t.name}</span>`).join('');
    return `
      <div class="disc-card">
        <div class="dp-head">
          <div class="dp-thumb"><img src="${p.image}" alt="${p.title}" loading="lazy"></div>
          <div class="dp-id">
            <div class="dp-meta">${catLabel} · ${p.year || ''}</div>
            <h3 class="dp-title">${p.title}</h3>
            <div class="dp-role">${p.role || ''}</div>
          </div>
        </div>
        <div class="dp-body">${contrib || '<p class="dp-empty">Implementation details available on request.</p>'}</div>
        <div class="dp-foot">
          <div class="dp-tools">${tools}</div>
          <button class="dp-open" data-id="${p.id}">INSPECT FULL MODULE &#x2192;</button>
        </div>
      </div>`;
  }).join('');

  discProjects.querySelectorAll('.dp-open').forEach(btn => {
    btn.addEventListener('click', () => {
      setPreview(btn.dataset.id);
      setState('archive');
    });
  });

  const inner = document.querySelector('.disc-inner');
  if (inner) inner.scrollTop = 0;
}

function openDiscipline(role) {
  // On stacked mobile the lens page is hidden; keep the chips inert there.
  if (window.matchMedia('(max-width:860px)').matches) return;
  renderDiscipline(role);
  setState('discipline');
}
disciplineChips.forEach(chip => chip.addEventListener('click', () => openDiscipline(chip.dataset.role)));

const discBack = $('disc-back');
if (discBack) discBack.addEventListener('click', () => setState('overview'));

/* ---------- COPY EMAIL ---------- */
const copyBtn = $('copy-email');
if (copyBtn) copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText('giuseppeluigi.alfieri@gmail.com').then(() => {
    const msg = $('copymsg');
    msg.style.opacity = 1;
    setTimeout(() => msg.style.opacity = 0, 2000);
  }).catch(() => {});
});

/* ---------- INIT ---------- */
renderList();

/* ============================================================
   BACKGROUND CANVAS :: the nervous system (cleaned from p21)
   ============================================================ */
const cv = $('bg'), g = cv.getContext('2d');
let W, H, CY, R, t = 0, warp = 0;
let mx = 0.5, my = 0.5, pmx = 0.5, pmy = 0.5;
const pulses = [];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let targetCX = 0, animCX = 0, animRMult = 1.0;

function resize() {
  W = cv.width = innerWidth; H = cv.height = innerHeight;
  CY = H * 0.52; R = Math.min(W, H) * 0.34;
  if (!animCX) animCX = W / 2;
}
addEventListener('resize', resize); resize();

addEventListener('mousemove', e => {
  mx = e.clientX / W; my = e.clientY / H;
  if (reduceMotion) return;
  const r = $('ret');
  if (r) { r.style.left = e.clientX + 'px'; r.style.top = e.clientY + 'px'; }
});

function warpSpike() {
  warp = 1.2;
  const tl = $('tlink');
  if (tl) { tl.textContent = 'SYNC'; setTimeout(() => tl.textContent = 'STABLE', 900); }
}
function spawnPulse() { pulses.push({ r: R * 0.18, life: 1 }); }

const RINGS = [0.42, 0.66, 0.85, 1.0];
const SPOKES = 12;
function poly(n, rad, rot, ox, oy) {
  g.beginPath();
  for (let i = 0; i <= n; i++) {
    const a = rot + i / n * Math.PI * 2;
    g.lineTo(animCX + ox + Math.cos(a) * rad, CY + oy + Math.sin(a) * rad);
  }
  g.stroke();
}

/* Derive the archive-state canvas centre from the actual terminal pane width
   instead of a hard-coded fraction. */
function archiveTargetCX() {
  if (!terminalPane) return W * 0.62;
  const rect = terminalPane.getBoundingClientRect();
  const previewLeft = rect.right + 40;
  return previewLeft + (W - previewLeft) / 2;
}

function draw() {
  if (W !== innerWidth || H !== innerHeight) resize();
  t += 1; warp *= 0.92;

  let targetRMult = 1.0, targetCamX = 0;
  if (currentState === 'overview')        { targetCX = W * -0.05; targetRMult = 2.4; targetCamX = 0; }
  else if (currentState === 'discipline') { targetCX = W * 1.05;  targetRMult = 2.4; targetCamX = -0.2; }
  else if (currentState === 'archive')    { targetCX = archiveTargetCX(); targetRMult = 1.0; targetCamX = 0.2; }
  else                                    { targetCX = W * 0.5; targetRMult = 1.0; targetCamX = 0.4; }

  animCX += (targetCX - animCX) * 0.03;
  animRMult += (targetRMult - animRMult) * 0.03;
  const currentR = R * animRMult;

  const px = (mx - 0.5 - targetCamX) * 40;
  pmx += (mx - pmx) * 0.04; pmy += (my - pmy) * 0.04;
  const py = (pmy - 0.5) * 40;
  const breath = Math.sin(t * 0.012) * 0.5 + 0.5;
  g.clearRect(0, 0, W, H);

  const ink = a => `rgba(232,230,224,${a})`;
  const blue = a => `rgba(79,184,212,${a})`;

  g.lineWidth = 1;
  for (let i = 0; i < 5; i++) {
    const yy = CY + (i - 2) * 140 - py * 2.2;
    g.strokeStyle = ink(0.03 + 0.015 * Math.sin(t * 0.008 + i));
    g.beginPath(); g.moveTo(0, yy + (i % 2 ? 40 : -40)); g.lineTo(W, yy); g.stroke();
  }
  for (let i = -3; i <= 3; i++) {
    g.strokeStyle = ink(0.025); g.beginPath();
    g.moveTo((W / 2) + i * 200 - px * 1.6, 0); g.lineTo((W / 2) + i * 60 - px * 1.6, H); g.stroke();
  }

  const rot = t * 0.0016 * (1 + warp * 6);
  RINGS.forEach((rk, i) => {
    const rad = currentR * rk * (1 + breath * 0.012 * (i + 1));
    g.strokeStyle = ink(0.07 + 0.05 * (i === 1 ? 1 : 0.4) + warp * 0.15);
    g.beginPath(); g.arc(animCX + px, CY + py, rad, 0, Math.PI * 2); g.stroke();
  });

  g.save(); g.setLineDash([2, 10]); g.strokeStyle = ink(0.06 + warp * 0.1);
  for (let i = 0; i < SPOKES; i++) {
    const a = rot + i / SPOKES * Math.PI * 2;
    g.beginPath();
    g.moveTo(animCX + px + Math.cos(a) * currentR * 0.42, CY + py + Math.sin(a) * currentR * 0.42);
    g.lineTo(animCX + px + Math.cos(a) * currentR, CY + py + Math.sin(a) * currentR); g.stroke();
  }
  g.restore();

  g.strokeStyle = ink(0.08 + warp * 0.12); g.lineWidth = 1;
  poly(3, currentR * 0.66, -rot * 1.4, px, py);
  poly(3, currentR * 0.66, -rot * 1.4 + Math.PI, px, py);
  g.strokeStyle = blue(0.10 + warp * 0.3);
  poly(SPOKES, currentR * 0.85, rot * 0.8, px, py);

  for (let i = 0; i < SPOKES; i++) {
    const a = rot + i / SPOKES * Math.PI * 2;
    const lit = i % 3 === 0; const rr = currentR * (lit ? 0.85 : 0.66);
    const x = animCX + px + Math.cos(a) * rr, y = CY + py + Math.sin(a) * rr;
    const pul = 0.5 + 0.5 * Math.sin(t * 0.05 + i);
    g.fillStyle = lit ? blue(0.5 + pul * 0.4) : ink(0.18 + pul * 0.15);
    g.beginPath(); g.arc(x, y, lit ? 2.4 : 1.4, 0, Math.PI * 2); g.fill();
  }

  g.fillStyle = blue(0.4 + breath * 0.4 + warp * 0.4);
  g.beginPath(); g.arc(animCX + px, CY + py, 2.6 + breath * 1.5, 0, Math.PI * 2); g.fill();

  for (let k = pulses.length - 1; k >= 0; k--) {
    const pp = pulses[k]; pp.r += 6; pp.life -= 0.012;
    if (pp.life <= 0) { pulses.splice(k, 1); continue; }
    g.strokeStyle = blue(pp.life * 0.6); g.lineWidth = 1.5;
    g.beginPath(); g.arc(animCX + px, CY + py, pp.r, 0, Math.PI * 2); g.stroke();
  }
  requestAnimationFrame(draw);
}
draw();
setInterval(() => { if (pulses.length < 3) spawnPulse(); }, 4200);
