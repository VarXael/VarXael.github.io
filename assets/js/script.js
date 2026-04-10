'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// OLD Testimonials modal
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const oldModalCloseBtn = document.querySelector("[data-modal-close-btn]"); 
const overlay = document.querySelector("[data-overlay]");
const oldModalImg = document.querySelector("[data-modal-img]");
const oldModalTitle = document.querySelector("[data-modal-title]");
const oldModalText = document.querySelector("[data-modal-text]");

const oldTestimonialsModalFunc = function () {
  if (modalContainer && overlay) {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }
}
if (testimonialsItem.length > 0 && oldModalImg && oldModalTitle && oldModalText) {
  testimonialsItem.forEach(item => {
    item.addEventListener("click", function () {
      oldModalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      oldModalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      oldModalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      oldModalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
      oldTestimonialsModalFunc();
    });
  });
}
if (oldModalCloseBtn) oldModalCloseBtn.addEventListener("click", oldTestimonialsModalFunc);
if (overlay) overlay.addEventListener("click", oldTestimonialsModalFunc);

// Custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");

// Portfolio filter variables
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const portfolioGridContainer = document.getElementById('portfolio-grid-container');

// Containers for About page sections
const professionalWorkUl = document.querySelector('.professional-work-list');
const techDesignWorkUl = document.querySelector('.tech-design-list');

// Minified SVG icons
const fortniteIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.86 6.71l-1.72 1.72c-.19-.25-.43-.46-.72-.62l.98-2.35c.13-.32.02-.69-.27-.84s-.69-.02-.84.27l-.98 2.35c-.3-.09-.61-.13-.93-.13s-.63.04-.93.13l-.98-2.35c-.13-.32-.51-.45-.84-.27s-.45.51-.27.84l.98 2.35c-.29.16-.53.37-.72.62l-1.72-1.72c-.26-.26-.71-.23-.94.03s-.23.71.03.94l1.72 1.72c-.16.29-.27.6-.31.93H5.5c-.39 0-.7.31-.7.7s.31.7.7.7h2.35c.04.33.15.64.31.93l-1.72 1.72c-.26.26-.29.71-.03.94s.71.29.94.03l1.72-1.72c.25.19.54.33.85.42V17.5c0 .39.31.7.7.7s.7-.31.7-.7v-2.35c.3-.09.59-.23.85-.42l1.72 1.72c.26.26.71.23.94-.03s-.23-.71-.03-.94l-1.72-1.72c.16-.29.27.6.31-.93h2.35c.39 0 .7-.31-.7-.7s-.31-.7-.7-.7H14.8c-.04-.33-.15-.64-.31-.93l1.72-1.72c.26-.26.29-.71.03-.94s-.71-.29-.94-.03zM12 13.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>`; 
const verseIconSVG = `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9V7h2v10zm4 0h-2V7h2v10z"/></svg>`; 
const unrealEngineIconSVG = `<svg viewBox="0 0 210.4 210.4" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M105.2 5c55.3 0 100.2 45 100.2 100.2s-45 100.2-100.2 100.2S5 160.5 5 105.2 50 5 105.2 5m0-5C47.1 0 0 47.1 0 105.2s47.1 105.2 105.2 105.2 105.2-47.1 105.2-105.2S163.4 0 105.2 0z"/><path d="M97.9 42.2s-23.7 6.7-45 29.3-24 38.7-24 50.7c4.7-8 33.7-52.1 40.5-31.1v50.2s-.4 6.8-10.8 4.1c3.1 5.8 19.1 20.1 48 23 6.6-6.6 15.2-16.1 15.2-16.1l14.4 12.2s25.9-16.8 36.1-41.2c-9.5 6.2-21 20.6-27 10.5V72.7s15.4-23.1 17.8-24.2c-6.1 1.1-27.6 8.2-38.9 22.8-3.2-3.5-12.1-3.6-12.1-3.6s7 5.8 7.1 11.1 0 49.5 0 54.6c-4.8 4.9-9.9 7.5-13.2 7.5-7.7 0-9.9-2.7-12-5.4V71.3s-3.8 3.2-6.8-2S84.1 54 97.9 42.2z"/></svg>`;
const unityIconSVG = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M12.012 2.5a.708.708 0 00-.702.714v17.572a.71.71 0 00.702.714.715.715 0 00.708-.714V3.214a.71.71 0 00-.708-.714zm6.445 3.174l-5.07 2.927v8.788l5.07 2.937a.71.71 0 001.058-.616V6.29a.71.71 0 00-1.058-.616zm-12.896 0a.71.71 0 00-1.058.616v11.422a.71.71 0 001.058.616l5.07-2.937V8.601l-5.07-2.927zM11.304.002A.71.71 0 0010.59.61L3.41 4.66a.71.71 0 00-.352.617V18.72a.71.71 0 00.352.616L10.59 23.39a.714.714 0 00.708 0l7.18-4.056a.71.71 0 00.352-.616V5.277a.71.71 0 00-.352-.617L11.304 0z"/></svg>`; 
const codeIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`;

const roleDefinitions = {
    "Game Designer": { title: "Game Designer", tagClass: "role-tag--game-designer", description: "I think in systems. I design interconnected mechanics where every piece has a reason to exist and every decision creates consequence." },
    "Technical Game Designer": { title: "Technical Game Designer", tagClass: "role-tag--technical-game-designer", description: "Everything I design, I also implement. If this tag is on a project, I created the design AND built it in engine." },
    "Leadership": { title: "Leadership", tagClass: "role-tag--leadership", description: "I bring teams together and drive the vision from concept to ship. On these projects, I was the person people looked to for direction." },
    "Game Programmer": { title: "Game Programmer", tagClass: "role-tag--game-programmer", description: "I write production code — C++, Blueprints, Verse. On these projects, I implemented systems within an existing design or codebase." }
};

const aboutRolesGrid = document.getElementById('about-roles-grid');
if (aboutRolesGrid) {
    aboutRolesGrid.innerHTML = Object.keys(roleDefinitions).map(role => {
        const def = roleDefinitions[role];
        return `<div class="about-role-item" data-role-target="${role}"><span class="role-tag ${def.tagClass}">${def.title}</span><p>${def.description}</p><div class="role-click-hint">View Evidence <ion-icon name="arrow-forward-outline"></ion-icon></div></div>`;
    }).join('');
}

// FULL PROJECT DETAILS OBJECT
const projectDetails = {
    "ProjectCadence": {
        id: "ProjectCadence",
        title: "Project: Cadence (Music-Driven Event System)",
        category: "personal work",
        published: true,
        isFeatured: true,
        tier: "hero",
        roles:["Technical Game Designer", "Game Designer"],
        duration: "1 month, currently WIP",
        year: 2025,
        role: "Sole Systems Architect & Technical Designer",
        image: "./assets/images/ProjectCadence.png",
        video: "https://www.youtube.com/watch?v=GeYIX1rnFPA",
        short: "A C++ Unreal Engine plugin that uses Metasound to drive rhythm-based gameplay events. Parse an osu beatmap, map timestamps to actions, make things happen in-game at exactly those moments. Built as a reusable framework for any rhythm game genre.",
        long: "Project Cadence started from a question on a bus: could osu beatmap timestamps actually drive gameplay events in Unreal Engine? The answer is the plugin. A C++ timeline driven by Metasound, separating timing data from behavior so the same beatmap can power completely different game genres.",
        story: "I was on a bus listening to osu beatmaps and had a thought: could you parse a beatmap file, extract the note timestamps, and use them to make things happen in a game at exactly those moments? Not theoretically. Literally, as a buildable system. I went home and started finding out.\n\nThat became Project Cadence. A C++ plugin that uses Metasound to drive a timeline of notes. Each timestamp gets mapped to a gameplay action — move a platform, spawn an enemy, trigger an effect. The design separates timing data from behavior completely, so the same beatmap can power a completely different game depending on what behaviors you attach to each note.\n\nThe osu integration came from using osu as a mapping tool. A Python parser extracts the note timestamps from a beatmap file and builds a data table. That data table is what the system reads. The plan is to replace it with an in-editor tool eventually, but osu proved the concept immediately because the mapping tooling already existed and the community had thousands of beatmaps ready to use.\n\nPerformance was a constraint from the start. Thousands of events potentially firing per track. The solution was lightweight UObjects instead of Actors for note state management — no spawn cost, no overhead, clean lifecycle. The architecture explicitly leaves room for object pooling as the next step.\n\nProject Circle was the first real test of whether the framework could hold up under a different genre entirely. It did, mostly. What it exposed was where the architecture needed extending.",
        tools:[ { name: "Unreal Engine", icon: unrealEngineIconSVG }, { name: "C++", icon: codeIconSVG }, { name: "Metasound", icon: codeIconSVG } ],
        cardEngineName: "Unreal Engine",
        myContribution:[
            "<b>Data-Driven & Modular by Design:</b> The system's core is a C++ timeline driven by Metasound. A Python script parses osu beatmap data into a data table mapping timestamps to note events. Each note is then associated with a gameplay behavior that fires at that exact moment. The entire framework is built as a self-contained, reusable Engine Plugin.",
            "<b>Architected for High Performance:</b> Lightweight UObjects manage note states instead of Actors, avoiding spawn overhead for thousands of concurrent events. Each instance manages its own lifecycle and is designed for a future object pooling system.",
            "<b>Designer-First:</b> Two Blueprint-derivable classes handle everything. MusicActionInstance manages timing. MusicAction defines what happens. Designers create gameplay without touching C++.",
            "<b>Future Plans:</b> Package as a public Unreal Engine plugin. Replace the osu parser with an in-editor mapping tool. Use as the foundation for an original rhythm-action game."
        ].join('</p><p>'),
        roleContributions: {
            "Game Designer": "<p><b>Design Philosophy:</b> Designed the system around one principle: music should drive gameplay, not accompany it. Timing data and behavior are separated entirely, so designers can produce different genres from the same beatmap without touching the framework.</p><p><b>Versatility by Design:</b> The framework supports rhythm FPS, parkour, twin-stick shooters, and more from one architecture. Every design decision prioritized flexibility over specificity.</p>",
            "Technical Game Designer": "<p><b>Core Architecture:</b> C++ timeline driven by Metasound. Python parser extracts osu beatmap data into DataTables. Entire framework is a self-contained, reusable Engine Plugin.</p><p><b>Performance Architecture:</b> Lightweight UObjects instead of Actors for note state management. Each instance manages its own lifecycle. Designed explicitly for future object pooling.</p><p><b>Designer Empowerment:</b> MusicActionInstance manages when. MusicAction manages what. Designers derive from both to create unique gameplay without C++.</p>"
        }
    },
    "ProjectSasha": {
        id: "ProjectSasha",
        title: "Project: Sasha (Top-Down Action-Exploration)",
        category: "personal work",
        published: true,
        isFeatured: true,
        tier: "hero",
        roles: ["Game Designer", "Technical Game Designer"],
        duration: "In Development",
        year: 2025,
        role: "Sole Creator — Designer, Programmer",
        image: "./assets/images/ProjectSasha.svg",
        video: null,
        videos: [
            { label: "Scanning V.1", file: "./assets/videos/Sasha SonarVersion 0.3.mp4" },
            { label: "Memory Economy", file: "./assets/videos/Sasha Memory system 0.1.mp4" }
        ],
        short: "A top-down exploration game where scanning IS the entire game. Knowledge is the resource, memory is the currency, and every mechanic asks: what is worth remembering?",
        long: "Project Sasha is built around a single mechanic—scanning—that drives exploration, combat, and progression. You control an android navigating a brutalist megastructure. There is no traditional inventory; everything you carry, know, or use is data stored in a finite memory budget. The game draws from BLAME! and NieR: Automata—functional, sparse, and data-first.",
        tools:[ { name: "Unreal Engine", icon: unrealEngineIconSVG }, { name: "C++", icon: codeIconSVG } ],
        cardEngineName: "Unreal Engine",
        myContribution: "<p>Architected the entire 'Megabyte' economy and engineered the underlying scanning mechanics, prioritizing procedural data-states and memory allocation over standard character controllers.</p>",
        roleContributions: {
            "Game Designer": "<p><b>Systemic Narrative:</b> Designed a cohesive economy where knowledge is the resource. It took a month of heavy iteration to unify exploration, combat, and progression under a single 'Megabyte' budget where every mechanical decision is a memory decision.</p><p><b>Player Choice & Tension:</b> Created a risk/reward exploration loop similar to managing torches in Minecraft. Players can 'Ghost Scan' (volatile, free) to push further into the dark, or 'Full Scan' (permanent, costly) to solidify the world, forcing a constant tradeoff between knowing more and having the capacity to act.</p><p><b>World Design:</b> Developed 'Digital Gnosticism'—a framework where the world is unformatted Biometal until scanned into physical existence.</p>",
            "Technical Game Designer": "<p><b>Scanning Algorithms:</b> Built the core scanning mechanic using <span class='magic-link' data-src='./assets/videos/Sasha SonarVersion 0.3.mp4'>BFS Waves</span> constrained by radius, creating an organic flood-fill effect rather than a cheap, instant radial reveal.</p><p><b>Procedural Visual Language:</b> Engineered a procedural mesh system that generates a dynamic dot-cloud based on an object's bounding box and data weight. The material tints (Grey → Ice Blue → Amber) communicate exact game states to the player entirely without UI.</p><p><b>Memory Architecture:</b> Programmed the <span class='magic-link' data-src='./assets/videos/Sasha Memory system 0.1.mp4'>Megabyte Framework</span>, including volatile memory allocation, hardcoded budgets, and an overflow protection system that flashes red and blocks scans if memory limits are exceeded.</p>"
        }
    },
    "ProjectCircle": {
        id: "ProjectCircle",
        title: "Project: Circle (Rhythm Bullet Hell FPS)",
        category: "personal work",
        published: true,
        isFeatured: true,
        tier: "hero",
        roles:["Technical Game Designer"],
        duration: "Prototype / Design Experiment",
        year: 2025,
        role: "Sole Creator — Technical Game Designer",
        image: "./assets/images/ProjectCircle.svg",
        video: null,
        short: "A rhythm bullet hell FPS built on the Cadence plugin. You race inside a hollow sphere while a giant boss shoots at you in sync with the music. Community-made songs, one song per planet, one boss per sphere. Proved the Cadence framework could drive combat. Exposed where the architecture needed extending.",
        long: "Project Circle started as a stress test for Cadence and became its own design territory. The core: you move inside a hollow sphere (gravity pulls you to the inner surface), a boss occupies the same space, all its attacks and patterns are synchronized to the current song. The community picks the songs. Each planet has a different track and a different authored challenge.",
        story: "The idea came directly from Cadence. I had a framework for making gameplay happen in sync with music and I wanted to know if it could handle something chaotic — a bullet hell where the chaos itself is rhythmically authored.\n\nThe spherical gravity came from an older design obsession. The player is inside the planet, walking on the interior surface. The visual result is that the world curves upward around you in every direction, which changes how you read incoming projectile patterns and how movement feels at speed. It fits a bullet hell well because your situational awareness has to work differently.\n\nThe design had community songs as a core pillar. Each planet corresponds to one track. The boss patterns for that planet are mapped to that song's beats. A community member who creates a beatmap is also authoring the boss fight. The system was already designed to support this because of how Cadence separates timing data from behavior — you map timestamps to actions, and different mappers would map different actions to the same beats.\n\nWhat the prototype proved: Cadence could drive complex combat choreography across multiple simultaneous enemy behaviors. What it exposed: the framework needed extension to handle the density of events a bullet hell requires without the timing system becoming a bottleneck.\n\nI have a new design direction for it now that I want to develop properly.",
        tools:[ { name: "Unreal Engine", icon: unrealEngineIconSVG }, { name: "C++", icon: codeIconSVG } ],
        cardEngineName: "Unreal Engine",
        myContribution:[
            "<b>Framework Stress Test:</b> Used Project Cadence as the foundation and built a first-person bullet hell prototype on top of it, proving the framework could drive complex combat choreography across simultaneous enemy behaviors.",
            "<b>Spherical Gravity System:</b> Implemented custom gravity pulling the player to the interior surface of a hollow sphere. Player walks on the inside of the planet, world curves upward in every direction, changing how movement and projectile reading works.",
            "<b>Community-Driven Design:</b> Designed the beatmap-to-boss-pattern pipeline so community mappers could author fight choreography by creating beatmaps. Different mappers, different authored experiences on the same planet."
        ].join('</p><p>'),
        roleContributions: {
            "Technical Game Designer": "<p><b>Framework Validation:</b> Built a fully functional 3D bullet hell prototype on the Cadence C++ framework, syncing complex enemy attack patterns and projectile spawns entirely to Metasound data. Validated cross-genre capability. Identified where the architecture needed extension for high-density event scenarios.</p><p><b>Spherical World Design:</b> Designed and implemented the interior-sphere movement model. Player gravity inverted to interior surface, creating a readable but disorienting play space that changes how bullet patterns are authored and dodged.</p>"
        }
    },
    "CRTexe": {
        id: "CRTexe",
        title: "CRT.exe (Brackeys Game Jam 2026.1)",
        category: "game jams",
        published: true,
        tier: "supporting",
        roles: ["Leadership", "Game Designer"],
        year: 2026,
        role: "Project Lead & SFX Designer",
        context: "Brackeys Game Jam — Team of 8",
        duration: "Game Jam",
        video: null,
        learnMoreLink: "https://gianluca-iacchini.itch.io/crt-exe",
        links: [
        {"label":"Play on itch.io","icon":"game-controller-outline","url":"https://gianluca-iacchini.itch.io/crt-exe"}
        ],
        image: "./assets/images/CRTexe.svg",
        short: "Led a team of 8 through a game jam by designing the game around how the team could actually function. Each area owned by one person, one mechanic, one hidden code. No dependencies, no bottlenecks.",
        long: "CRT.exe is a puzzle-exploration game built during Brackeys Game Jam 2026.1. On a team of 8 with strong independent personalities, I designed the game structure specifically to give each person full ownership of one piece. The design and the team philosophy were the same thing.",
        story: "Every team has a different dynamic. This one had strong, independent personalities, which is great for creativity and harder for cohesion. The question was not how to get everyone to agree on everything, but what structure would let each person contribute without depending on anyone else to make progress.\n\nThe theme was strange places. The idea I pitched was simple: there is a TV, it asks for a code, you find the code somewhere in the current area, you input it, and now you are somewhere new. That is the whole loop.\n\nThe reason it worked for the team was structural. Anyone who wanted to could claim an area, design whatever mechanic they felt like for it, hide a code somewhere inside, and own that piece completely from start to finish. No coordination required. No one blocking anyone else. You could make progress on your area without a single conversation with the rest of the group.\n\nThe design solved the team problem. They were the same solution.\n\nI went in planning to just make sound effects and not stress too much about it. I ended up leading the whole group to a finished submission. The game was rough. But I left knowing exactly how I would run the next one.",
        tools:[ { name: "Godot", icon: codeIconSVG } ],
        cardEngineName: "Godot",
        myContribution: "<p>Led conceptualization and production for a team of 8. Designed a game structure that gave each team member full ownership of one area with no cross-dependencies. Created all sound effects. Ended up leading the full group despite planning a minimal role.</p>",
        roleContributions: {
            "Leadership": "<p><b>Team Structure:</b> Diagnosed what would make this specific team functional and built the production structure around it. Each person owned one area completely: their mechanic, their level, their hidden code. No bottlenecks, no blocking. Team reached a finished submission.</p>",
            "Game Designer": "<p><b>Systems Design:</b> Designed a gameplay loop where the structure of the game was also the structure of the team. The TV-and-code loop meant each area was self-contained by design, which is what made parallel independent development possible.</p>"
        }
    },
    "PoliceSimulator": {
        id: "PoliceSimulator",
        title: "Police Simulator: Patrol Officers",
        category: "professional work",
        published: true,
        tier: "supporting",
        roles:["Game Programmer", "Technical Game Designer"],
        isFeatured: true,
        year: 2024,
        role: "Game Programmer & Technical Designer",
        context: "Untold Games (for Aesir Interactive)",
        video: "https://www.youtube.com/watch?v=fL2SOhYZ6k8",
        learnMoreLink: null,
        image: "./assets/images/PoliceSimulator.png",
        short: "Nintendo Switch port responsible for tackling deep-level bugs and developing tools.",
        long: "As part of the Untold Games team, I tackled the port of this complex Unreal Engine title. The role blended programming with technical design, requiring me to not only fix bugs but also to deeply analyze and document the game's intricate systems.",
        tools:[ { name: "Unreal Engine", icon: unrealEngineIconSVG }, { name: "C++", icon: codeIconSVG } ],
        cardEngineName: "Unreal Engine",
        myContribution:[
            "<b>Tool Development:</b> Designed and implemented a full-featured debug cheat menu from scratch using ImGui, providing the QA and development team with crucial tools for testing and validation.",
            "<b>Core Gameplay & Bug-Fixing:</b> Overhauled the Switch input system, fixed critical bugs related to level loading and stability, and resolved a wide array of other gameplay-related issues."
        ].join('</p><p>'),
        roleContributions: {
            "Game Programmer": "<p><b>Bug-Fixing & Stabilization:</b> Overhauled the Switch input system, fixed critical bugs related to level loading and stability, and resolved a wide array of gameplay-related issues within a large-scale codebase.</p>",
            "Technical Game Designer": "<p><b>Tool Development:</b> Designed and implemented a full-featured debug cheat menu from scratch using ImGui, providing the QA and development team with crucial tools for testing and validation.</p>"
        }
    },
    "HighOnLife": {
        id: "HighOnLife",
        title: "High on Life",
        category: "professional work",
        published: true,
        tier: "hero",
        roles:["Game Programmer", "Technical Game Designer"],
        isFeatured: true,
        year: 2025,
        role: "Game Programmer & Tech Game Designer",
        context: "Untold Games (for Squanch Games)",
        video: "https://www.youtube.com/watch?v=qk2y4clYe9o",
        learnMoreLink: "request",
        links: [{"label":"Available on Request","icon":"mail-outline","url":"request"}
        ],
        image: "./assets/images/HighOnLife.png",
        short: "Nintendo Switch port of High on Life. Over 8 months became the team's primary reference for the game's systems. Deep C++ and Blueprint debugging, internal tooling built from scratch, critical subsystems rewritten for Switch stability.",
        long: "Porting a game as large and technically complex as High on Life to the Switch meant wearing a lot of hats. Beyond fixing bugs, I ended up being the person the team came to when they needed to understand how any system in the game worked — input, level streaming, enemy AI, UI, you name it. The role evolved from programmer to de facto system archaeologist.",
        story: "A few months in I was genuinely having fun. The game's humor would catch me off guard constantly, and there was always something that would make me burst out laughing mid-debugging session.\n\nThe Lasagna Technique: There was a boss fight where one specific attack would break every collision in the entire game. Player, enemies, everything would fall through the floor indefinitely. To debug it I built stacked collision floors in their own sublevels, one on top of the other, to see which one the player would still land on when falling. I called it the Lasagna Technique. The actual cause was a division by zero inside the boss attack code. The Switch compiler handled that edge case differently from PC and killed the entire collision matrix. One code change fixed it. I was a very happy person for a few days.\n\nThe Bink Situation: Every video in the game would go black if the player inserted an SD card. After a week of digging I found that the Unreal Engine source code for Switch had the read path and write path pointing to the same location. It was looking for videos to read inside the write folder, finding nothing, and defaulting to black. I hardcoded the video path directly into the Bink media player CPP. Hacky, but it worked. I still have no idea how that bug had never surfaced in any other project.\n\nThe Ubergraph Crash: Random crashes happening seemingly anywhere in the game. Traced it to a Blueprint event in the Game Instance that had two output execution pins connected to nothing. From prior study of Unreal's Ubergraph — the compiled, low-level version of Blueprints — I knew unused pins could create memory leaks. The Game Instance is the only object that persists across every level load in Unreal Engine. Those loose references were preventing the world from being properly destroyed during map transitions. Rewrote the event in C++, removed the pins, fixed.\n\nThe Lighting Tool: A technical artist needed to switch between different lighting setups per area for performance reasons. Simple idea: box colliders throughout levels, each holding a lighting configuration, player entering triggers the switch. It took nine iterations to get it working correctly. Grapple hook disabled all player collisions including ours, so we had to create a separate attached actor. That actor caused a different issue where spawning inside a collider wouldn't register, so we added a forced collision check every 0.5 seconds for 60 seconds. Each fix introduced a new edge case. Nine iterations. It worked perfectly in the end.",
        tools:[ { name: "Unreal Engine", icon: unrealEngineIconSVG }, { name: "C++", icon: codeIconSVG } ],
        cardEngineName: "Unreal Engine",
        myContribution:[
            "<b>Deep Bug Fixing:</b> Investigated and resolved critical bugs across C++ and Blueprints. Division-by-zero killing the entire collision matrix. Blueprint memory leaks in the Game Instance causing random crashes on level transitions. Race conditions from misused Delay nodes. Remote Events firing on levels that hadn't finished streaming in.",
            "<b>Internal Tooling:</b> Extended the cheat manager with Switch performance stats. Built a multi-iteration lighting configuration tool for a technical artist, handling edge cases across grapple hook collision conflicts, spawn-inside-volume detection, and dynamic attachment at runtime.",
            "<b>Systems Knowledge:</b> Became the team's primary reference for how the game worked. Input system, level streaming, enemy AI behavior trees, UI architecture — if you needed to understand something, I was the first person the team came to."
        ].join('</p><p>'),
        roleContributions: {
            "Game Programmer": "<p><b>Deep-Level Debugging:</b> Fixed critical C++ and Blueprint bugs — division by zero killing the collision matrix, Ubergraph memory leaks in the Game Instance, Bink video player reading from the wrong path, Remote Events firing on unloaded levels, collision frequency performance changes creating pass-through bugs for fast-moving actors.</p><p><b>Switch-Specific Systems:</b> Rewrote the input identification system for Joy-Con and Pro Controller detection. Standardized how the settings menu handled controller type switching. Traced and fixed platform-specific compiler behavior differences.</p>",
            "Technical Game Designer": "<p><b>Tool Development:</b> Extended the cheat manager UI with Switch performance monitoring stats. Designed and implemented a lighting configuration system for a technical artist — a nine-iteration process working around grapple hook collision conflicts, spawn-inside-volume edge cases, and dynamic actor attachment at runtime.</p><p><b>System Documentation:</b> Became the team's primary knowledge source for how High on Life's systems interconnected. Level streaming architecture, enemy AI behavior trees, the custom input system Squanch Games had built — I understood it and made sure others could too.</p>"
        }
    },
    "UEFN: Battleship": {
        id: "UEFN: Battleship",
        title: "UEFN: Battleship",
        category: "professional work",
        published: true,
        tier: "listed",
        roles: ["Technical Game Designer", "Game Designer"],
        year: 2023,
        role: "Lead Creator & Verse Developer",
        context: "Game Developer (me)",
        video: null, 
        learnMoreLink: "https://www.fortnite.com/@untoldgames/1028-2740-2494",
        links: [
        {"label":"Play on Fortnite","icon":"game-controller-outline","url":"https://www.fortnite.com/@untoldgames/1028-2740-2494"}
        ],
        image: "./assets/images/Battleship.jpeg",
        short: "Fast-paced strategy game from concept to launch on Fortnite.",
        long: "This project involved the complete creation of a multiplayer strategy game from the ground up. I spearheaded the game design, level layout, and player experience, with the challenge of creating the entire battleship custom system within Verse.",
        tools:[ { name: "UEFN", icon: fortniteIconSVG }, { name: "Verse", icon: codeIconSVG } ],
        cardEngineName: "UEFN",
        myContribution: "<p>Led the complete game design process, defining the core ruleset, win/loss conditions, player progression, and overall gameplay loop. Developed all primary gameplay systems using Verse.</p>",
        roleContributions: {
            "Technical Game Designer": "<p><b>Core Gameplay (Verse):</b> Developed all primary gameplay systems using Verse — interactive combat grid, ship placement logic, and real-time player feedback systems.</p>",
            "Game Designer": "<p><b>Game Design & Vision:</b> Led the complete game design process from concept to launch on the Fortnite platform.</p>"
        }
    },
    "PulseParty": {
        id: "PulseParty",
        title: "PulseParty",
        category: "professional work",
        published: true,
        tier: "listed",
        roles: ["Technical Game Designer", "Game Designer"],
        year: 2023,
        role: "Lead Systems Programmer",
        video: "https://www.youtube.com/watch?v=CzMTSNYmdYI",
        learnMoreLink: "https://www.fortnite.com/@untoldgames/8369-2685-8749",
        links: [
        {"label":"Play on Fortnite","icon":"game-controller-outline","url":"https://www.fortnite.com/@untoldgames/8369-2685-8749"}
        ],
        image: "./assets/images/PulsePartyThumbnail.png", 
        short: "A chaotic party game with 8 unique minigames built in Verse.",
        long: "As a larger scope follow-up to PulseMatch, PulseParty expands the core concept into a full party game experience. Players face off in a series of 8 different competitions, including races, deathmatches, and king of the hill modes.",
        tools:[ { name: "UEFN", icon: fortniteIconSVG }, { name: "Verse", icon: codeIconSVG } ],
        cardEngineName: "UEFN",
        myContribution: "<p>Built the entire party game framework from the ground up, including the expanded hub, the map-switching logic for a sequence of 8 minigames, and a robust game state manager to handle the unique rules for each mode.</p>",
        roleContributions: {
            "Technical Game Designer": "<p><b>Lead Systems Programmer:</b> Built the entire party game framework from the ground up in Verse — hub system, map-switching logic for 8 minigames, and a robust game state manager.</p>",
            "Game Designer": "<p><b>Game Design:</b> Co-designed the expansion from a single deathmatch concept into 8 distinct minigame modes including races, deathmatches, and king of the hill.</p>"
        }
    },
    "Alien": {
        id: "Alien",
        title: "Alien (Game Prototype)",
        category: "personal work",
        published: true,
        tier: "supporting",
        roles: ["Technical Game Designer", "Game Designer"],
        isFeatured: true,
        year: 2022,
        role: "Sole Creator",
        image: "./assets/images/work-5.jpg",
        video: null, 
        learnMoreLink: "https://open.substack.com/pub/giuseppeluigialfieri/p/game-prototypes-alien?r=3ko0h9&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true",
        links: [
        {"label":"Read on Substack","icon":"document-text-outline","url":"https://open.substack.com/pub/giuseppeluigialfieri/p/game-prototypes-alien?r=3ko0h9&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true"}
        ],
        short: "A reverse-horror prototype focusing on unique movement and possession mechanics.",
        long: "This project is a love letter to the 2001 classic 'Aliens Versus Predator 2,' aiming to recreate the feeling of being a stealthy but powerful Facehugger. The core design goal was to explore and prototype a set of interconnected mechanics: movement, possession, and environmental interaction.",
        tools: [ { name: "Unreal Engine", icon: unrealEngineIconSVG } ],
        cardEngineName: "Unreal Engine",
        myContribution: "<p>Designed and implemented a powerful movement system including a standard jump, a forward-dashing double jump for aggressive repositioning, and a tentacle grapple movement ability. Developed the core 'Possession' mechanic from concept to implementation.</p>",
        roleContributions: {
            "Technical Game Designer": "<p><b>Movement System:</b> Designed and implemented a powerful movement system including a standard jump, forward-dashing double jump, and a tentacle grapple ability.</p><p><b>Possession Mechanic:</b> Developed the core possession system from concept to implementation. The player targets enemies with tentacles and launches into them to take full control of body, weapons, and abilities.</p>",
            "Game Designer": "<p><b>Design Vision:</b> Conceived the entire game as a love letter to AVP2's Facehugger campaign — designing interconnected mechanics to create emergent scenarios.</p>"
        }
    },
    "Cycle": {
        id: "Cycle",
        title: "Cycle",
        category: "university work",
        published: true,
        tier: "hero",
        roles: ["Leadership", "Game Designer", "Game Programmer"],
        isFeatured: true,
        year: 2021,
        role: "Game Director, Sole Programmer, Designer",
        context: "Falmouth University — Team of 3",
        video: "https://youtu.be/Cuwhx4b7tYo",
        learnMoreLink: "https://wrong-world-studios.itch.io/cycle",
        links: [
        {"label":"Play on itch.io","icon":"game-controller-outline","url":"https://wrong-world-studios.itch.io/cycle"}
        ,{"label":"View on The Rookies","icon":"trophy-outline","url":"https://www.therookies.co/entries/13406"}
        ,{"label":"View on GitHub","icon":"logo-github","url":"https://github.com/VarXael/Cycle"}
        ],
        image: "./assets/images/Cycle.png",
        short: "Best 3rd Year Videogame at Falmouth University 2021. Chosen to represent Falmouth at the G7 Summit in Cornwall. Built by a team of 3: two artists and me. I had never used Unreal Engine before this project. I spent August learning it, then we made the game.",
        long: "Cycle is a surrealist puzzle-adventure about retrieving the phases of a day and returning them to a world stuck in a single moment. Built over 8 months by two artists and one programmer. I was the programmer, director, producer, level designer, puzzle designer, and playtester. Everything that ran in the engine, I built.",
        story: "Oliver approached me after our second year and said he wanted to make something together. I knew him well but we had never actually worked on the same project. He was genuinely talented so I said yes immediately. I also knew Anastasia had to be part of it — I had worked with her the year before and was floored by her concept art. The three of us formed Wrong World Studios.\n\nI had never used Unreal Engine before this project. I spent the entire month of August learning it. We started development in October.\n\nThe first phase was world building. We wanted something that felt truly different. I had this elaborate concept called Pillar World — giant beams of primordial flame, a darkness below, creatures built from solidified light. It was too complex for what three people could build in eight months. Anastasia was the one who shifted our direction. She opened my eyes to surrealism: you do not need to explain a world for it to feel real. You just need it to feel strange and somehow safe at the same time.\n\nThat became Cycle. A world stuck in a single moment, waiting for someone to bring the phases of the day back. The feeling we were after was something like: I know you feel lost, but I am here, and I will guide you through this.\n\nI wore every hat on the project. There were decisions the team disagreed with. I made them anyway, and in most cases they turned out to be right. That responsibility was uncomfortable and it taught me more about directing than anything else I have done.\n\nThe seamless teleports are probably my favourite technical detail. You get moved around the world without ever knowing it happened. Nobody who played the game ever noticed — but people consistently reported feeling slightly disoriented in a way they could not explain. That was exactly the feeling we wanted.\n\nThe G7 Summit preparation was less dramatic than it sounds. They mainly wanted a timer added and the menus adjusted for easy playtesting by delegates.\n\nWe won Best 3rd Year Videogame at Falmouth University 2021. The university still shows Cycle at their expos, years after I left. That means a lot.\n\nBoth Anastasia and Oliver have since left the games industry. That gives me a stronger reason to keep going — to one day make something as strange and beautiful as what we built together, and show it to them.",
        tools:[ { name: "Unreal Engine", icon: unrealEngineIconSVG } ],
        cardEngineName: "Unreal Engine",
        myContribution: "<p>Sole programmer on a team of three. Designed and built every system in the engine from scratch, while also directing the project, managing production, and designing levels and puzzles. Learned Unreal Engine in August, started the project in October.</p>",
        roleContributions: {
            "Leadership": "<p><b>Project Direction:</b> Led a team of three from pre-production through publishing on Itch.io and The Rookies. Set and held creative direction through disagreements. Managed milestones, kept the project scoped to what three people could actually ship. Prepared the game for the G7 Summit demonstration in Cornwall.</p><p><b>Team Formation:</b> Assembled the team, recognising the specific strengths each person brought. Both teammates poured enormous trust into the project from the start and delivered exceptional work throughout.</p>",
            "Game Designer": "<p><b>Systems Design:</b> Designed the hub world that changes dynamically as the player retrieves each phase of the day. Designed the day/night cycle system tied directly to game progression. Designed and iterated the puzzle systems across all levels, playtesting each one personally to verify they worked.</p><p><b>Level Design:</b> First time designing levels seriously. Built and iterated the frog level, the coliseum puzzle, the clock level, and the final sun sequence. The clock level was designed and working in a week. The coliseum took considerably longer.</p>",
            "Game Programmer": "<p><b>Sole Programmer:</b> Built every system in Unreal Engine 4 from scratch on an engine I had never used before. Hub world progression, seamless level transitions the player never consciously notices, collectibles system with a final cutscene, day/night cycle, respawn system, puzzle logic across all levels.</p><p><b>Seamless Transitions:</b> Players are teleported between areas without awareness of the transition. Consistently produced a subtle feeling of disorientation without players identifying the cause. Nobody noticed the teleport. Everybody felt something.</p>"
        }
    },
    "CardsWeaver": {
        id: "CardsWeaver",
        title: "Card's Weaver",
        category: "university work",
        published: true,
        tier: "supporting",
        roles:["Leadership", "Game Designer"],
        year: 2023, 
        role: "Lead Game Designer",
        image: "./assets/images/Card's Weaver.png",
        video: null, 
        learnMoreLink: "https://batraf.itch.io/cards-weaver",
        links: [
        {"label":"Play on itch.io","icon":"game-controller-outline","url":"https://batraf.itch.io/cards-weaver"}
        ],
        short: "Card-based game developed at university using Unreal Engine.",
        long: "A university project focusing on card game mechanics and design principles, implemented in Unreal Engine.",
        tools:[ { name: "Unreal Engine", icon: unrealEngineIconSVG } ],
        cardEngineName: "Unreal Engine",
        myContribution: "<p>Led the conceptualization of core game rules and card interactions. Designed the UI/UX for card play and resource management using UMG. Balanced card abilities for engaging gameplay.</p>",
        roleContributions: {
            "Leadership": "<p><b>Lead Designer:</b> Guided a team of three other designers from initial concept to a fully playable prototype. Managed design direction, resolved creative disagreements.</p>",
            "Game Designer": "<p><b>Core Systems Design:</b> Designed the game's core systems including card abilities, the central resource mechanic, and the overall gameplay loop.</p>"
        }
    },
    "SoulDriven": {
        id: "SoulDriven",
        title: "Soul Driven",
        category: "university work",
        published: true,
        tier: "listed",
        roles: ["Game Programmer", "Technical Game Designer"],
        year: 2023,
        role: "Systems Programmer",
        teamSize: "Verona University",
        image: "./assets/images/work-6.jpg",
        video: null,
        learnMoreLink: "https://gitlab.com/Pietro92/soul-driven-project",
        links: [
        {"label":"Play on itch.io","icon":"game-controller-outline","url":"https://fraffer.itch.io/soul-driven"}
        ,{"label":"View on GitLab","icon":"logo-gitlab","url":"https://gitlab.com/Pietro92/soul-driven-project"}
        ],
        short: "University project for a mobile game class. Built the entire character class-switching system using the Strategy design pattern — ISoulInterface, swappable Soul classes, parallel weapon hierarchy, and a step-by-step onboarding doc so any team member could add a new class without touching core systems.",
        long: "Soul Driven is an action game built at the University of Verona. My contribution was the character architecture: a runtime class-switching system built around the Strategy pattern, with full documentation so the system could grow without me.",
        story: "It was a university project for a mobile game class, team of a few people. I was responsible for the player character systems.\n\nThe core problem: the game had multiple playable classes (Warrior, Mage, Ranger) and the player needed to be able to switch between them at runtime. The naive solution is a big switch statement somewhere. The right solution is the Strategy pattern.\n\nI built ISoulInterface, which defines the contract every Soul class has to fulfil. Each Soul (Warrior, Mage, Ranger) derives from a Souls base class that implements LoadStats(), pulling from its own ScriptableObject stat table. The Player holds a reference to the current Soul via the interface and swaps it at runtime. Weapons run in a parallel hierarchy via IWeaponInterface, also swapped independently.\n\nThe part I'm most proud of is the documentation. I drew out the full class diagram in Miro and wrote a step-by-step guide: how to name your script, which folder it goes in, which interface to implement, how to create and register the ScriptableObject, how to link it to the stat manager. A new class was an independent, documented process that anyone on the team could follow without touching the systems I'd built.\n\nThe architecture held. Adding classes didn't break anything.",
        tools:[ { name: "Unity", icon: unityIconSVG } ],
        cardEngineName: "Unity",
        myContribution: "<p>Designed and implemented the entire character class system using the Strategy design pattern. ISoulInterface defines the class contract. Each Soul class derives from a Souls base and loads its own stat table from a ScriptableObject. Player holds a runtime-swappable Soul reference. Parallel weapon hierarchy via IWeaponInterface. Wrote a full Miro documentation board — class diagrams and a step-by-step guide for adding new Soul classes without touching core systems.</p>",
        roleContributions: {
            "Technical Game Designer": "<p><b>System Architecture:</b> Designed the class-switching system around the Strategy pattern so Soul classes were hot-swappable at runtime without conditional logic in the Player. Each Soul owns its stats, its weapons, and its animations independently.</p><p><b>Documentation:</b> Produced a full class diagram and an onboarding flowchart for adding new Soul classes. Anyone on the team could add a class following the guide without needing to understand the underlying architecture.</p>",
            "Game Programmer": "<p><b>Strategy Pattern Implementation:</b> Built ISoulInterface and IWeaponInterface, the Souls and Weapon base classes, and the ScriptableObject stat table system. Player swaps ISoulInterface references at runtime. Stat loading, weapon assignment, and animation override all happen through the interface without Player knowing which Soul is active.</p>"
        }
    },
    "Covid19Training": {
        id: "Covid19Training",
        title: "Covid 19 Training",
        category: "professional work",
        published: false,
        tier: "listed",
        roles:["Game Programmer"],
        year: 2021, 
        role: "Game Programmer",
        teamSize: "Cineon Training",
        image: "./assets/images/work-2.jpg",
        video: null,
        learnMoreLink: "https://cineon.training/covid-19-personal-protective-equipment-ppe-training/",
        links: [
        {"label":"View Project","icon":"link-outline","url":"https://cineon.training/covid-19-personal-protective-equipment-ppe-training/"}
        ],
        short: "VR Training simulation for PPE in Unreal Engine.",
        long: "Developed PPE training scenarios using VR technology in Unreal Engine.",
        tools:[ { name: "Unreal Engine", icon: unrealEngineIconSVG } ],
        cardEngineName: "Unreal Engine",
        myContribution: "<p>Scripted interaction logic for VR controllers and training objects. Implemented a scenario progression system with feedback mechanisms. Optimized performance for smooth VR experience.</p>",
        roleContributions: {} 
    },
    "UnrealEngineCourse": {
        id: "UnrealEngineCourse",
        title: "Unreal Engine Course",
        category: "professional work",
        published: true,
        tier: "listed",
        roles: ["Game Programmer", "Technical Game Designer"], 
        year: 2022, 
        role: "Unreal Engine Tutor",
        teamSize: "Creativity Unleashed",
        image: "./assets/images/work-1.jpg",
        video: null,
        learnMoreLink: "https://www.udemy.com/course/complete-unreal-engine-megacourse-beginner-to-expert/",
        links: [
        {"label":"View on Udemy","icon":"school-outline","url":"https://www.udemy.com/course/complete-unreal-engine-megacourse-beginner-to-expert/"}
        ],
        short: "Online course for Unreal Engine.",
        long: "A 16-hour course introducing Unreal Engine Blueprints and programming structures.",
        tools:[ { name: "Unreal Engine", icon: unrealEngineIconSVG } ],
        cardEngineName: "Unreal Engine",
        myContribution: "<p>Designed and recorded course modules covering Unreal Engine fundamentals, Blueprints, and common game programming patterns. Created example projects and exercises for students.</p>",
        roleContributions: {} 
    },
    "MonkHomebrew": {
        id: "MonkHomebrew",
        title: "Monk Homebrew",
        category: "personal work",
        published: true,
        tier: "listed",
        roles: ["Game Designer"],
        year: 2023,
        role: "Game Designer",
        teamSize: "Personal Project",
        image: "./assets/images/Monk.png",
        video: null,
        learnMoreLink: "https://drive.google.com/file/d/1cyUGRzfhP4CjVwDljmbiXhwORSPAUSpp/view?usp=sharing",
        links: [
        {"label":"Download PDF","icon":"document-outline","url":"https://drive.google.com/file/d/1cyUGRzfhP4CjVwDljmbiXhwORSPAUSpp/view?usp=sharing"}
        ],
        short: "Rebuilt the D&D Monk class from scratch around a new core mechanic: Vessels of Ki. Spectral floating objects that store memories, emotions and ideas, used for attacking, defending, and resource management. The base class redesign was tight enough that existing subclasses slotted into the new identity without major reworks — several became more purposeful within it.",
        long: "The design challenge wasn't making the Monk more powerful. It was giving it a coherent identity that its subclasses could amplify rather than contradict. The Vessels of Ki system replaced the existing ki point economy with something tactile and thematic, while remaining mechanically compatible with the existing subclass structure.",
        story: "The PHB Monk has a mechanical identity problem. Its features are useful but disconnected — ki points, Stunning Strike, Deflect Missiles, Unarmored Defense. There's no through-line. Subclasses then try to bolt something thematic on top of a chassis that doesn't have a clear idea of what it is.\n\nThe redesign started from a single question: what if ki was something you could hold, shape, and lose? The answer became Vessels — spectral floating objects orbiting the monk, imbued with memories, emotions, or ideas. You create them, fill them, and sacrifice them. Attacking with them, defending with them, empowering abilities with them. The resource is physical and present at the table.\n\nThe proof that the system worked came from the subclasses. Way of Shadow empties vessels to cast its spells — thematically, you're sacrificing something to disappear. Way of Mercy sacrifices a vessel to bring someone back from death — the vessel becomes the price of resurrection. Deflect Attack now destroys a vessel to reduce incoming damage — mechanically identical to before, but now it costs something you can see. Every existing subclass feature had a more natural home in the new framework than it had originally.\n\nThe base class was changed enough that some subclasses needed tweaks. None needed a full rebuild. That's the test.",
        tools:[],
        cardEngineName: "Tabletop",
        myContribution: "<p>Rebuilt the D&D 5e Monk class around a new core mechanic — Vessels of Ki — replacing the existing ki point economy with a resource that is tactile, visible, and thematically loaded. Designed Ki Absorptions and Ki Strikes as the primary action economy, rewrote class features at every level to interface with the vessel system, and adapted eight existing subclasses (Shadow, Mercy, Open Hand, Ascendant Dragon, Astral Self, Drunken Master, Sun Soul, Long Death) to use vessels natively.</p>",
        roleContributions: {
            "Game Designer": "<p><b>Core Mechanic Design:</b> Designed the Vessels of Ki system from scratch — creation, filling, bonding, sacrifice mechanics, and the two-action categories (Ki Absorptions and Ki Strikes) that replaced the original ki point usage model. The resource is finite, physical, and carries flavor: vessels contain memories and emotions that affect how they interact with enemies and allies.</p><p><b>Subclass Integration:</b> Rewrote eight existing subclasses to interface natively with the vessel system. The test for each: does using a vessel here feel like a natural extension of the subclass identity, or a tax? Every subclass passed. Several became more thematically coherent within the new framework than they were originally.</p>"
        }
    },
    "SyovaraHomebrew": {
        id: "SyovaraHomebrew",
        title: "Syovara Homebrew",
        category: "personal work",
        published: false,
        tier: "listed",
        roles: ["Game Designer"],
        year: 2023, 
        role: "Game Designer",
        teamSize: "Personal Project",
        image: "./assets/images/Syovara.jpg",
        video: null,
        learnMoreLink: "https://aminoapps.com/c/officialdd/page/item/syovara/eYNM_3qQT6IK3r02BM0LpLXwL0x51XeEbEb",
        short: "D&D Homebrew setting/content.",
        long: "A personal world-building and game design project for D&D.",
        tools:[],
        cardEngineName: "Tabletop",
        myContribution: "<p>Developed lore, cultures, and unique mechanics for a custom D&D setting. Created new player options and monster stat blocks tailored to the world.</p>",
        roleContributions: {} 
    },
    "MaGiTeProject": {
        id: "MaGiTeProject",
        title: "MaGiTe Project",
        category: "professional work",
        published: false,
        tier: "listed",
        roles:["Game Programmer"],
        year: 2025, 
        role: "Game Developer",
        teamSize: "Umeå University",
        image: "./assets/images/Umeå_University_Resized.png",
        video: null, 
        learnMoreLink: null,
        short: "Research project collaboration using Unreal Engine.",
        long: "Contributed to the MaGiTe research project, focusing on gameplay prototyping for educational modules within Unreal Engine.",
        tools:[{ name: "Unreal Engine", icon: unrealEngineIconSVG }], 
        cardEngineName: "Unreal Engine", 
        myContribution: "<p>Developed interactive prototypes and simulations for educational content using Unreal Engine Blueprints and C++.</p>",
        roleContributions: {} 
    },
    "ProjectCenturion": {
        id: "ProjectCenturion",
        title: "Project Centurion",
        category: "university work",
        published: true,
        tier: "listed",
        roles:["Game Designer", "Game Programmer"],
        year: 2020, 
        role: "Game Designer & Developer",
        teamSize: "University Project",
        image: "./assets/images/work-4.jpg",
        video: null, 
        learnMoreLink: "https://drive.google.com/file/d/1kqrXXSPwxUrCUG9qNnqnNzSuWa9S9QJv/view?usp=sharing",
        links: [
        {"label":"View Document","icon":"document-outline","url":"https://drive.google.com/file/d/1kqrXXSPwxUrCUG9qNnqnNzSuWa9S9QJv/view?usp=sharing"}
        ],
        short: "University game project with a historical theme.",
        long: "A game developed as part of university studies, focusing on design and development.",
        tools:[ { name: "Unity", icon: unityIconSVG } ],
        cardEngineName: "Unity",
        myContribution: "<p>Co-designed core gameplay loop and level structure. Implemented player movement and interaction systems using Unity and C#.</p>",
        roleContributions: {} 
    },
    "FallingFusion": {
        id: "FallingFusion",
        title: "Falling Fusion",
        category: "game jams",
        published: false,
        tier: "listed",
        roles:["Game Designer"],
        year: 2022, 
        role: "Game Designer & Developer",
        teamSize: "Game Jam Team",
        image: "./assets/images/work-8.jpg",
        video: null, 
        learnMoreLink: "https://jonny5959.itch.io/falling-fusion",
        short: "Game Jam entry with a fusion mechanic, developed in Unreal Engine.",
        long: "A rapidly developed game for a game jam, focusing on core mechanics using Unreal Engine.",
        tools:[ { name: "Unreal Engine", icon: unrealEngineIconSVG } ],
        cardEngineName: "Unreal Engine",
        myContribution: "<p>Designed the core 'fusion' mechanic and implemented it in Unreal Engine using Blueprints. Created procedurally generated level segments for replayability during the jam.</p>",
        roleContributions: {} 
    },
     "NickelNinja": {
        id: "NickelNinja",
        title: "Nickel Ninja",
        category: "game jams",
        published: false,
        tier: "listed",
        roles: ["Game Designer"],
        year: 2023, 
        role: "Game Designer & Developer",
        teamSize: "Game Jam Team",
        image: "./assets/images/work-7.jpg",
        video: null,
        learnMoreLink: "https://v3.globalgamejam.org/2022/games/nickel-ninja-3",
        short: "Global Game Jam 2022 entry.",
        long: "A game created during the Global Game Jam 2022.",
        tools:[ { name: "Unity", icon: unityIconSVG } ],
        cardEngineName: "Unity",
        myContribution: "<p>Contributed to level design and character ability scripting. Collaborated on art asset integration and bug fixing under tight deadlines.</p>",
        roleContributions: {} 
    },
    "FullCppMechGame": {
        id: "FullCppMechGame",
        title: "Turn-Based Tactics (The C++ Bet)",
        category: "personal work",
        published: true,
        isFeatured: true,
        tier: "listed",
        roles:["Technical Game Designer", "Game Programmer"],
        year: 2024,
        role: "Sole Creator",
        image: "./assets/images/work-5.jpg", 
        video: null,
        learnMoreLink: "https://github.com/VarXael/MechaTopDown",
        links: [
        {"label":"View on GitHub","icon":"logo-github","url":"https://github.com/VarXael/MechaTopDown"}
        ],
        short: "A 1v1 turn-based strategy game built strictly in C++ to prove a point to a skeptical Computer Science professor.",
        long: "A colleague of mine—who happens to be a University Computer Science professor—was jokingly taking the piss out of my non-traditional programming background. I asked for his toughest 'build a videogame' exam prompt and built it in my free time just to flex on him (and to help him playtest his own missing edge cases). I set one strict rule: 100% C++, zero Blueprints. A month later, while working full-time, I had a fully functional grid-based tactics game and a newfound mastery of Unreal's C++ framework.",
        tools:[ { name: "Unreal Engine", icon: unrealEngineIconSVG }, { name: "C++", icon: codeIconSVG } ],
        cardEngineName: "Unreal Engine",
        myContribution: "<p>Took a rigid academic design document and turned it into a fully functional game, building a custom grid system, pathfinding algorithms, and a robust turn-state manager entirely in C++.</p>",
        roleContributions: {
            "Game Programmer": "<p><b>100% C++ Architecture:</b> Built the entire project without Blueprints. I had to learn Unreal's C++ framework, memory management, and class hierarchy on the fly.</p><p><b>Algorithmic Implementation:</b> Engineered the grid-based movement and pathfinding (implementing DFS algorithms) to handle movement range calculations and obstacle avoidance.</p>",
            "Technical Game Designer": "<p><b>System Translation:</b> Took the professor's strict academic document (specifying grid sizes, obstacle logic, HP pools, and combat RNG) and architected a playable system that respected those exact constraints.</p><p><b>Class Design:</b> Implemented the logic for asymmetric units (Sniper vs. Brawler), ensuring ranges, movement penalties, and combat mechanics functioned flawlessly on a 25x25 grid.</p>"
        }
    },
    "TheLibrary": {
        id: "TheLibrary",
        title: "The Library (12-Hour Blueprint Sprint)",
        category: "personal work",
        published: true, 
        isFeatured: true,
        tier: "listed",
        roles:["Technical Game Designer"],
        year: 2023,
        role: "Sole Programmer & Systems Designer",
        image: "./assets/images/work-5.jpg",
        video: null,
        learnMoreLink: "https://github.com/VarXael/LibraryProject",
        links: [
        {"label":"View on GitHub","icon":"logo-github","url":"https://github.com/VarXael/LibraryProject"}
        ],
        short: "A prototype for a Papers, Please-style management game, where I blind-coded the entire customer queue system in a 12-hour sprint.",
        long: "The concept was a magical shop where customers ask for weird, narrative-triggering books—think 'Papers, Please' meets 'Overcooked'. As the sole programmer, I architected the shelf-spawning and customer queue logic. I opened Unreal, started connecting Blueprints, and entered a fugue state for 12 hours straight without pressing 'Play' to test it once. When I finally compiled and hit play... nothing moved. I realized movement speed was set to 0. I changed it to 400, pressed play again, and BAM. The entire system ran flawlessly on the first try. Zero spaghetti, zero bugs. Just pure, modular logic.",
        tools:[ { name: "Unreal Engine", icon: unrealEngineIconSVG }, { name: "Blueprints", icon: codeIconSVG } ],
        cardEngineName: "Unreal Engine",
        myContribution: "<p>Built a dynamic object spawner and a highly modular customer state machine, proving that visual scripting doesn't have to equal spaghetti code.</p>",
        roleContributions: {
            "Technical Game Designer": "<p><b>Spline-Based Inventory Spawner:</b> Built a dynamic spawner that reads book dimensions (sizes 5, 10, 20, etc.) from Data Tables and uses math to perfectly pack them along a defined spline path inside bookshelf geometry.</p><p><b>The 12-Hour Blind Sprint:</b> Architected a modular customer queue system (spawn doors, dynamic line nodes, counter interactions) by coding for 12 hours straight without pressing play. Because the logic was completely modular and well-planned in my head, it compiled and ran perfectly on the very first test (once I fixed the speed variable!).</p>"
        }
    }
};

const professionalWorkIds =["HighOnLife", "PoliceSimulator"];
const techDesignWorkIds =["ProjectSasha", "ProjectCadence", "ProjectCircle", "Alien", "Cycle"];

const ROLE_ORDER =["Game Designer", "Technical Game Designer", "Leadership", "Game Programmer"];
const sortRoles = (roles) => {
    if (!roles) return[];
    return [...roles].sort((a, b) => {
        const ia = ROLE_ORDER.indexOf(a);
        const ib = ROLE_ORDER.indexOf(b);
        return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    });
};

// Helper function to create a project list item
const createProjectListItem = (project, isStrictGrid = false) => {
    const listItem = document.createElement('li');
    const itemClass = (project.isFeatured && !isStrictGrid) ? 'project-item project-item-featured active' : 'project-item active';
    listItem.className = itemClass;
    listItem.dataset.category = project.category;

    const link = document.createElement('a');
    link.dataset.project = project.id;
    link.href = "#";
    link.classList.add('open-modal');

    const figure = document.createElement('figure');
    figure.className = 'project-img';

    const iconBox = document.createElement('div');
    iconBox.className = 'project-item-icon-box';
    const ionIcon = document.createElement('ion-icon');
    ionIcon.name = 'eye-outline';
    iconBox.appendChild(ionIcon);
    figure.appendChild(iconBox);

    const img = document.createElement('img');
    img.src = project.image || './assets/images/placeholder.png';
    img.alt = project.title;
    img.loading = 'lazy';
    figure.appendChild(img);

    // Video badge
    if (project.videos && project.videos.length > 0) {
        const vbadge = document.createElement('div');
        vbadge.className = 'card-video-badge';
        vbadge.innerHTML = '<ion-icon name="play-circle-outline"></ion-icon>';
        figure.appendChild(vbadge);
    } else if (project.video) {
        const vbadge = document.createElement('div');
        vbadge.className = 'card-video-badge';
        vbadge.innerHTML = '<ion-icon name="play-circle-outline"></ion-icon>';
        figure.appendChild(vbadge);
    }

    link.appendChild(figure);

    const textContentDiv = document.createElement('div');
    textContentDiv.className = 'project-text-content';
    
    // DATA BAR (Engine + Category)
    const metaBar = document.createElement('div');
    metaBar.className = 'project-meta-bar';
    let engineHtml = '';
    if (project.cardEngineName && project.cardEngineName !== "N/A") {
        let badgeHtml = '';
        const n = project.cardEngineName.toLowerCase();
        if (n.includes("unreal")) badgeHtml = unrealEngineIconSVG;
        else if (n.includes("unity")) badgeHtml = unityIconSVG;
        else if (n.includes("uefn")) badgeHtml = fortniteIconSVG;
        else if (n === "tabletop") badgeHtml = '<ion-icon name="dice-outline"></ion-icon>';
        else if (n.includes("godot")) badgeHtml = codeIconSVG;
        
        let readableEngineName = n.includes('unreal') ? 'Unreal' : n.includes('uefn') ? 'UEFN' : n.includes('unity') ? 'Unity' : n === 'tabletop' ? 'Tabletop' : n.includes('godot') ? 'Godot' : project.cardEngineName;
        
        engineHtml = `<div class="meta-engine"><span class="meta-icon">${badgeHtml}</span><span>${readableEngineName}</span></div><span class="meta-dot">•</span>`;
    }
    
    let categoryText = project.category ? project.category.replace(' work', '').replace(' jams', ' Jam') : '';
    categoryText = categoryText.charAt(0).toUpperCase() + categoryText.slice(1);
    metaBar.innerHTML = `${engineHtml}<span class="meta-category">${categoryText}</span>`;
    textContentDiv.appendChild(metaBar);

    const titleH3 = document.createElement('h3');
    titleH3.className = 'project-title';
    titleH3.textContent = project.title;
    textContentDiv.appendChild(titleH3);

    const sortedRoles = sortRoles(project.roles);
    if (sortedRoles.length > 0) {
        const rolesDiv = document.createElement('div');
        rolesDiv.className = 'project-role-tags';
        sortedRoles.forEach(role => {
            const roleTag = document.createElement('span');
            const roleSlug = role.toLowerCase().replace(/\s+/g, '-');
            roleTag.className = `role-tag role-tag--${roleSlug}`;
            roleTag.textContent = role;
            rolesDiv.appendChild(roleTag);
        });
        textContentDiv.appendChild(rolesDiv);
    }

    if (project.isFeatured && project.short && !isStrictGrid) {
        const categoryP = document.createElement('p');
        categoryP.className = 'project-category';
        categoryP.textContent = project.short;
        textContentDiv.appendChild(categoryP);
    }

    link.appendChild(textContentDiv);
    listItem.appendChild(link);
    return listItem;
};

const renderProjectList = (targetElement, projectIds) => {
    if (!targetElement) return;
    targetElement.innerHTML = '';
    projectIds.forEach(projectId => {
        const project = projectDetails[projectId];
        if (project && project.published) {
            targetElement.appendChild(createProjectListItem(project, false));
        }
    });
};

const renderPortfolio = (filterCategory) => {
    if (!portfolioGridContainer) return;
    portfolioGridContainer.innerHTML = '';
    const projectsArray = Object.values(projectDetails);
    const publishedProjects = projectsArray.filter(p => p.published);

    const filteredProjects = publishedProjects.filter(project =>
        filterCategory === 'all' || (project.category && project.category.toLowerCase() === filterCategory.toLowerCase())
    );

    if (filteredProjects.length === 0) {
        portfolioGridContainer.innerHTML = `<p class="no-projects-message">No projects found.</p>`;
        return;
    }

    // Sort all projects by year descending
    const sorted = [...filteredProjects].sort((a, b) => {
        const ya = a.year || 0, yb = b.year || 0;
        return yb - ya;
    });

    // Build continuous timeline: thin year marker, then projects in grid rows
    const projectsByYear = {};
    sorted.forEach(p => {
        const y = p.year || 'Other';
        if (!projectsByYear[y]) projectsByYear[y] = [];
        projectsByYear[y].push(p);
    });

    const sortedYears = Object.keys(projectsByYear).sort((a, b) => {
        if (a === 'Other') return 1;
        if (b === 'Other') return -1;
        return b - a;
    });

    sortedYears.forEach((year, yi) => {
        // Thin year separator
        const sep = document.createElement('div');
        sep.className = 'timeline-sep' + (yi === 0 ? ' timeline-sep--first' : '');
        sep.innerHTML = `<span class="timeline-sep__year">${year}</span><span class="timeline-sep__line"></span>`;
        portfolioGridContainer.appendChild(sep);

        // Cards in a wrapping grid
        const row = document.createElement('div');
        row.className = 'timeline-row';
        projectsByYear[year].forEach(project => {
            row.appendChild(createProjectListItem(project, true));
        });
        portfolioGridContainer.appendChild(row);
    });
};

const projectModal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

function buildContributionHTML(data) {
    if (data.roleContributions && Object.keys(data.roleContributions).length > 0) {
        const sortedRoles = sortRoles(Object.keys(data.roleContributions));
        return sortedRoles.map(role => {
            const slug = role.toLowerCase().replace(/\s+/g, '-');
            const content = data.roleContributions[role];
            return `<div class="detail-item role-contribution">
                <h4 class="role-contribution-header role-contribution-header--${slug}">
                    <span class="role-tag role-tag--${slug}">${role}</span>
                </h4>
                <div>${content}</div>
            </div>`;
        }).join('');
    }
    if (data.myContribution) return `<div class="detail-item role-contribution"><h4>Project Details:</h4><div>${data.myContribution}</div></div>`;
    return `<div class="detail-item"><p>Details not specified.</p></div>`;
}

function getYouTubeId(url) {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    return match ? match[1] : null;
}

function openProjectModal(projectId) {
    const data = projectDetails[projectId];
    if (!data) return;

    const modalBody = document.getElementById('modalBody');
    const projectModal = document.getElementById('projectModal');

    const modalShortText = data.short || data.myContribution || "Details provided below.";
    const modalLongText = (data.long && data.long !== data.short) ? data.long : '';
    const youtubeId = getYouTubeId(data.video);
    const hasClips = data.videos && data.videos.length > 0;
    
    const hasAnyMedia = hasClips || youtubeId || data.image;

    // Tools & Links
    const toolIconsHtml = data.tools && data.tools.length > 0 ? data.tools.map(tool =>
        `<span class="pm-tool-item" title="${tool.name || ''}">${tool.icon ? `<span class="pm-tool-icon">${tool.icon}</span>` : ''}<span class="pm-tool-name">${tool.name || ''}</span></span>`
    ).join('') : '<p>N/A</p>';

    let linksHTML = '';
    if (data.links && data.links.length > 0) {
        linksHTML = '<div class="pm-links">' + data.links.map(l => {
            if (l.url === 'request') return `<div class="pm-link-item pm-link-item--request"><ion-icon name="mail-outline"></ion-icon><span>Available on request</span></div>`;
            return `<a href="${l.url}" target="_blank" rel="noopener" class="pm-link-item"><ion-icon name="${l.icon}"></ion-icon><span>${l.label}</span></a>`;
        }).join('') + '</div>';
    } else if (data.learnMoreLink && data.learnMoreLink !== '#') {
        linksHTML = `<div class="pm-links"><a href="${data.learnMoreLink}" target="_blank" rel="noopener" class="pm-link-item"><ion-icon name="link-outline"></ion-icon><span>Learn More</span></a></div>`;
    }

    // Tabs
    const hasStory = data.story && data.story.trim().length > 0;
    let storyHtml = hasStory ? (data.story.includes('<p>') ? data.story : data.story.split('\n\n').map(p => `<p>${p.trim()}</p>`).join('')) : '';
    const tabsHtml = hasStory ? `
        <div class="pm-tabs">
            <button class="pm-tab active" data-tab="overview">Overview</button>
            <button class="pm-tab" data-tab="story">The Story</button>
        </div>` : '';

    // Media HTML Generation
    let mediaHtml = '';
    let playlistHtml = '';
    const fallbackImgSrc = data.image || './assets/images/placeholder.png';

    if (hasClips) {
        mediaHtml = `
            <img class="pm-poster" src="${fallbackImgSrc}" alt="${data.title}">
            <video class="pm-video main-video-player" src="${data.videos[0].file}" muted loop playsinline controls></video>
            <div class="pm-click-overlay" title="Click to Expand"></div>
        `;
        if (data.videos.length > 1) {
            playlistHtml = `<div class="pm-playlist-container"><div class="pm-playlist-minimal">` +
                data.videos.map((vid, idx) => `
                    <button class="playlist-btn-min ${idx === 0 ? 'active' : ''}" data-vid-src="${vid.file}">
                        <ion-icon name="play"></ion-icon> ${vid.label}
                    </button>
                `).join('') + `</div></div>`;
        }
    } else if (youtubeId) {
        mediaHtml = `
            <a href="https://www.youtube.com/watch?v=${youtubeId}" target="_blank" class="yt-fallback">
                <img src="https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg" alt="YouTube Thumbnail" onerror="this.src='https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg'">
                <div class="yt-fallback-btn"><ion-icon name="logo-youtube"></ion-icon> Watch Trailer</div>
            </a>
        `;
    } else if (data.image) {
        mediaHtml = `<img class="pm-poster" src="${data.image}" alt="${data.title}" style="opacity:1;">`;
    }

    const roleTagsHtml = data.roles && data.roles.length > 0
        ? data.roles.map(r => `<span class="role-tag role-tag--${r.toLowerCase().replace(/\s+/g, '-')}">${r}</span>`).join('') : '';

    if (modalBody) {
        modalBody.innerHTML = `
            <div class="pm-wrapper" id="pmWrapper">
                
                <!-- LEFT PANEL: MEDIA (32%) -->
                ${hasAnyMedia ? `
                <div class="pm-left-panel" id="pmLeftPanel">
                    <div class="pm-media-player" id="pmMediaPlayer">
                        ${mediaHtml}
                    </div>
                    ${playlistHtml}
                    <div class="pm-meta-stage">
                        ${roleTagsHtml ? `<div class="pm-role-tags">${roleTagsHtml}</div>` : ''}
                        <div class="pm-meta-grid">
                            <div class="pm-meta-item"><span class="pm-meta-label">Role</span><span class="pm-meta-value">${data.role || 'N/A'}</span></div>
                            ${data.context ? `<div class="pm-meta-item"><span class="pm-meta-label">Context</span><span class="pm-meta-value">${data.context}</span></div>` : ''}
                            ${data.duration ? `<div class="pm-meta-item"><span class="pm-meta-label">Duration</span><span class="pm-meta-value">${data.duration}</span></div>` : ''}
                        </div>
                        ${data.tools && data.tools.length > 0 ? `<div class="pm-tool-list">${toolIconsHtml}</div>` : ''}
                        ${linksHTML}
                    </div>
                </div>
                ` : ''}

                <!-- RIGHT PANEL: TEXT (68%) -->
                <div class="pm-right-panel" id="pmRightPanel" style="${!hasAnyMedia ? 'border-radius: 16px;' : ''}">
                    <button class="pm-close-btn" id="pmCloseBtn"><ion-icon name="close-outline"></ion-icon></button>
                    
                    <h3 class="pm-title">${data.title}</h3>
                    
                    ${tabsHtml}
                    
                    <div class="pm-tab-content" data-tab-content="overview">
                        <div class="pm-overview">
                            <p class="pm-short">${modalShortText}</p>
                            ${modalLongText ? `<p class="pm-long">${modalLongText}</p>` : ''}
                        </div>
                        <div class="pm-contributions">${buildContributionHTML(data)}</div>
                    </div>
                    
                    ${hasStory ? `<div class="pm-tab-content pm-tab-content--hidden" data-tab-content="story"><div class="pm-story">${storyHtml}</div></div>` : ''}
                </div>
            </div>`;

        // ── PEEK AND COMMIT LOGIC ── //
        const wrapper = modalBody.querySelector('#pmWrapper');
        const leftPanel = modalBody.querySelector('#pmLeftPanel');
        const rightPanel = modalBody.querySelector('#pmRightPanel');
        const mediaPlayer = modalBody.querySelector('#pmMediaPlayer');
        const innerClose = modalBody.querySelector('#pmCloseBtn');
        const videoElement = modalBody.querySelector('.main-video-player');
        
        let isMegaMode = false;
        let defaultVideoSrc = videoElement ? videoElement.src : null;
        let currentActiveSrc = defaultVideoSrc;

        if(innerClose) innerClose.addEventListener('click', cleanupAndCloseModal);

        // Enter/Exit Mega Mode
        const setMegaMode = (state) => {
            if (!hasAnyMedia) return;
            isMegaMode = state;
            if (isMegaMode) {
                wrapper.classList.add('is-mega');
                if (leftPanel) leftPanel.classList.remove('is-peeking'); 
            } else {
                wrapper.classList.remove('is-mega');
                if (videoElement && leftPanel) {
                    videoElement.pause();
                    leftPanel.classList.remove('is-playing');
                }
            }
        };

        // Click overlay -> Enter Mega Mode
        const clickOverlay = modalBody.querySelector('.pm-click-overlay');
        if (clickOverlay && videoElement) {
            clickOverlay.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!isMegaMode) {
                    setMegaMode(true);
                    leftPanel.classList.add('is-playing');
                    videoElement.play().catch(()=>{});
                }
            });
        }

        // Hover Image -> Peek
        if (mediaPlayer && videoElement) {
            mediaPlayer.addEventListener('mouseenter', () => {
                if (!isMegaMode && leftPanel) {
                    leftPanel.classList.add('is-peeking');
                    leftPanel.classList.add('is-playing');
                    videoElement.play().catch(()=>{});
                }
            });

            mediaPlayer.addEventListener('mouseleave', () => {
                if (!isMegaMode && leftPanel) {
                    leftPanel.classList.remove('is-peeking');
                    leftPanel.classList.remove('is-playing');
                    videoElement.pause();
                }
            });
        }

        // Click Text -> Revert to Sleek Mode
        if (rightPanel) {
            rightPanel.addEventListener('click', (e) => {
                if(e.target.closest('button') || e.target.closest('a') || e.target.closest('.magic-link')) return;
                if (isMegaMode) setMegaMode(false);
            });
        }

        // ── VIDEO PLAYLIST (Underneath Video) ──
        const playBtns = modalBody.querySelectorAll('.playlist-btn-min');

        const switchVideo = (src) => {
            if (!videoElement || currentActiveSrc === src) return;
            videoElement.src = src;
            videoElement.load();
            currentActiveSrc = src;

            playBtns.forEach(b => {
                b.classList.toggle('active', b.dataset.vidSrc === src);
            });
        };

        if (playBtns.length > 0) {
            playBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation(); 
                    switchVideo(btn.dataset.vidSrc);
                    if(videoElement) videoElement.play().catch(()=>{});
                    if(leftPanel) leftPanel.classList.add('is-playing');
                });
            });
        }

        // ── SLEEK MAGIC LINKS LOGIC ──
        const magicLinks = modalBody.querySelectorAll('.magic-link');
        magicLinks.forEach(link => {
            // Hover: Peek
            link.addEventListener('mouseenter', () => {
                if (!isMegaMode && leftPanel && videoElement) {
                    const targetSrc = link.getAttribute('data-src');
                    if (targetSrc) {
                        switchVideo(targetSrc);
                        leftPanel.classList.add('is-peeking');
                        leftPanel.classList.add('is-playing');
                        videoElement.play().catch(()=>{});
                    }
                }
            });

            // Leave: Un-peek & reset
            link.addEventListener('mouseleave', () => {
                if (!isMegaMode && leftPanel && videoElement) {
                    leftPanel.classList.remove('is-peeking');
                    leftPanel.classList.remove('is-playing');
                    videoElement.pause();
                    switchVideo(defaultVideoSrc); // Reverts back so poster matches
                }
            });

            // Click: Double-click to close, Single to open/switch
            link.addEventListener('click', (e) => {
                e.stopPropagation(); 
                const targetSrc = link.getAttribute('data-src');
                if (targetSrc && videoElement) {
                    
                    // If already massive and watching this video, close it.
                    if (isMegaMode && currentActiveSrc === targetSrc) {
                        setMegaMode(false);
                        return;
                    }

                    switchVideo(targetSrc);
                    setMegaMode(true);
                    leftPanel.classList.add('is-playing');
                    videoElement.play().catch(()=>{});
                    
                    // Visual pulse feedback
                    if(mediaPlayer) {
                        mediaPlayer.classList.remove('pulse-glow');
                        void mediaPlayer.offsetWidth; // reflow
                        mediaPlayer.classList.add('pulse-glow');
                    }
                }
            });
        });

        // Tab switching
        if (hasStory) {
            modalBody.querySelectorAll('.pm-tab').forEach(tab => {
                tab.addEventListener('click', () => {
                    modalBody.querySelectorAll('.pm-tab').forEach(t => t.classList.remove('active'));
                    modalBody.querySelectorAll('.pm-tab-content').forEach(c => c.classList.add('pm-tab-content--hidden'));
                    tab.classList.add('active');
                    
                    const target = modalBody.querySelector(`[data-tab-content="${tab.dataset.tab}"]`);
                    if (target) target.classList.remove('pm-tab-content--hidden');

                    if (tab.dataset.tab === 'story' && isMegaMode) setMegaMode(false);
                });
            });
        }
    }

    if (projectModal) projectModal.classList.add('active');
    document.body.classList.add('no-scroll');
}

// --- NEW ROLE MODAL LOGIC ---
const roleModal = document.getElementById('roleModal');
const roleModalBody = document.getElementById('roleModalBody');
const roleModalClose = document.getElementById('roleModalClose');

function getGalleryCta(project) {
    // ALWAYS open the project modal. No external link jumping anymore!
    return { label: 'Project Details', icon: 'information-circle-outline', url: null, external: false };
}

window.openRoleModal = function(roleName) {
    const roleDef = roleDefinitions[roleName];
    if (!roleDef) return;

    const projectsWithRole = Object.values(projectDetails).filter(p =>
        p.published && p.roles && p.roles.includes(roleName)
    );
    const roleSlug = roleName.toLowerCase().replace(/\s+/g, '-');

    const allRoles = Object.keys(roleDefinitions);
    const tabsHtml = `
        <div class="role-modal-tabs">
            ${allRoles.map(r => `
                <button class="role-tab-btn ${r === roleName ? 'active' : ''}" onclick="openRoleModal('${r}')">
                    ${roleDefinitions[r].title}
                </button>
            `).join('')}
        </div>
    `;

    const cardsHtml = projectsWithRole.map(p => {
        const contributionText = p.roleContributions && p.roleContributions[roleName]
            ? p.roleContributions[roleName]
            : (typeof p.myContribution === 'string' ? p.myContribution : '<p>No specific details provided.</p>');

        const cta = getGalleryCta(p);
        let categoryLabel = (p.category || '').replace(' work', '').replace(' jams', ' Jam');
        categoryLabel = categoryLabel.charAt(0).toUpperCase() + categoryLabel.slice(1);

        const toolPillsHtml = p.tools && p.tools.length > 0
            ? p.tools.map(t => `<span class="rpc-tool-pill">${t.name}</span>`).join('')
            : '<span class="rpc-tool-pill rpc-tool-pill--na">N/A</span>';
        const contextLine = p.context || p.duration || null;

        // Guaranteed to open modal because of the fixed getGalleryCta
        const ctaHtml = `<button class="rpc-cta-btn rpc-cta-btn--modal" data-project="${p.id}"><ion-icon name="${cta.icon}"></ion-icon>${cta.label}</button>`;

        return `
            <div class="rpc-card" data-project-id="${p.id}">
                <div class="rpc-card-header">
                    <figure class="rpc-card-figure">
                        <img src="${p.image}" alt="${p.title}" class="rpc-card-img" loading="lazy">
                        <div class="rpc-expand-icon"><ion-icon name="chevron-down-outline"></ion-icon></div>
                    </figure>
                    <div class="rpc-card-info">
                        <h4 class="rpc-card-title">${p.title}</h4>
                        <span class="rpc-card-category">${categoryLabel}</span>
                    </div>
                </div>
                <div class="rpc-expanded-content">
                    <div class="rpc-expanded-inner">
                        <div class="rpc-meta-zone">
                            <div class="rpc-role-badge"><span class="role-tag role-tag--${roleSlug}">${roleName}</span></div>
                            ${p.year      ? `<div class="rpc-meta-row"><span class="rpc-meta-label">Year</span><span class="rpc-meta-value">${p.year}</span></div>` : ''}
                            ${contextLine ? `<div class="rpc-meta-row"><span class="rpc-meta-label">Context</span><span class="rpc-meta-value">${contextLine}</span></div>` : ''}
                            <div class="rpc-meta-row rpc-meta-row--tools">
                                <span class="rpc-meta-label">Tools</span>
                                <div class="rpc-tool-pills">${toolPillsHtml}</div>
                            </div>
                            <div class="rpc-meta-cta">${ctaHtml}</div>
                        </div>
                        <div class="rpc-text-zone">
                            <div class="rpc-text-body">${contributionText}</div>
                        </div>
                    </div>
                </div>
            </div>`;
    }).join('');

    if (roleModalBody) {
        roleModalBody.innerHTML = `
            ${tabsHtml}
            <div class="role-modal-header">
                <span class="role-tag ${roleDef.tagClass}">${roleDef.title}</span>
                <p class="role-modal-desc">${roleDef.description}</p>
            </div>
            <div class="role-modal-projects">
                ${cardsHtml || '<p style="color: var(--light-gray);">No projects found for this role.</p>'}
            </div>`;

        roleModalBody.querySelectorAll('.rpc-card-header').forEach(header => {
            header.addEventListener('click', () => {
                const card = header.closest('.rpc-card');
                const wasExpanded = card.classList.contains('expanded');
                roleModalBody.querySelectorAll('.rpc-card.expanded').forEach(c => c.classList.remove('expanded'));
                if (!wasExpanded) {
                    card.classList.add('expanded');
                    setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
                }
            });
        });

        roleModalBody.querySelectorAll('.rpc-cta-btn--modal').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                roleModal.classList.remove('active');
                openProjectModal(btn.dataset.project);
            });
        });
    }

    if (roleModal && !roleModal.classList.contains('active')) {
        roleModal.classList.add('active');
        document.body.classList.add('no-scroll');
    }
}

if (roleModalClose) {
    roleModalClose.addEventListener('click', () => {
        if (roleModal) roleModal.classList.remove('active');
        if (projectModal && !projectModal.classList.contains('active')) {
            document.body.classList.remove('no-scroll');
        }
    });
}
if (roleModal) {
    roleModal.addEventListener('click', e => {
        if (e.target === roleModal) {
            roleModal.classList.remove('active');
            if (projectModal && !projectModal.classList.contains('active')) {
                document.body.classList.remove('no-scroll');
            }
        }
    });
}

// Global cleanup function
function cleanupAndCloseModal() {
    const pModal = document.getElementById('projectModal');
    if (pModal) pModal.classList.remove('active');
    
    // Only remove no-scroll if role gallery isn't open
    const rModal = document.getElementById('roleModal');
    if (!rModal || !rModal.classList.contains('active')) {
        document.body.classList.remove('no-scroll');
    }

    const mc = pModal && pModal.querySelector('.pm-wrapper');
    if (mc) {
        const videoPlayers = mc.querySelectorAll('video');
        videoPlayers.forEach(vid => vid.pause());
        const iframes = mc.querySelectorAll('iframe');
        iframes.forEach(iframe => iframe.src = '');
    }
    const mBody = document.getElementById('modalBody');
    if (mBody) mBody.innerHTML = '';
}

// ── GLOBAL EVENT LISTENER ──
document.body.addEventListener('click', function(e) {
    // 1. Standard Project Links
    const clickedProjectLink = e.target.closest('a.open-modal');
    if (clickedProjectLink && !clickedProjectLink.hasAttribute('target')) { 
        e.preventDefault();
        openProjectModal(clickedProjectLink.dataset.project);
    }

    // 2. Role Gallery Triggers
    const clickedRoleTrigger = e.target.closest('.about-role-item, .sidebar-role-btn');
    if (clickedRoleTrigger) {
        openRoleModal(clickedRoleTrigger.dataset.roleTarget);
    }

    // 3. Close Modal by clicking the dark overlay outside the wrapper
    if (e.target.id === 'projectModal' || e.target.id === 'modalBody') {
        cleanupAndCloseModal();
    }

    // 4. MAGIC LINKS INSIDE ROLE GALLERY
    const clickedMagicLink = e.target.closest('.magic-link');
    if (clickedMagicLink && clickedMagicLink.closest('#roleModal')) {
        e.preventDefault();
        const targetSrc = clickedMagicLink.getAttribute('data-src');
        if (!targetSrc) return;

        const rpcCard = clickedMagicLink.closest('.rpc-card');
        if (rpcCard) {
            const projectId = rpcCard.getAttribute('data-project-id');
            // Close Role Modal
            document.getElementById('roleModal').classList.remove('active');
            // Open Main Modal
            openProjectModal(projectId);
            
            // Wait for DOM then play & force Mega Mode
            setTimeout(() => {
                const videoPlayer = document.querySelector('#projectModal .main-video-player');
                const wrapper = document.querySelector('#projectModal .pm-wrapper');
                const leftPanel = document.querySelector('#projectModal .pm-left-panel');
                
                if (videoPlayer) {
                    videoPlayer.src = targetSrc;
                    videoPlayer.load();
                    videoPlayer.play().catch(()=>{});
                    
                    if(wrapper) wrapper.classList.add('is-mega');
                    if(leftPanel) leftPanel.classList.add('is-playing');

                    const playBtns = document.querySelectorAll('#projectModal .playlist-btn-min');
                    playBtns.forEach(b => {
                        b.classList.toggle('active', b.dataset.vidSrc === targetSrc);
                    });
                }
            }, 50);
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    renderProjectList(professionalWorkUl, professionalWorkIds);
    renderProjectList(techDesignWorkUl, techDesignWorkIds);
    renderPortfolio('all');

    if (filterBtns.length > 0 && filterBtns[0]) filterBtns[0].classList.add('active');
    if(selectValue) selectValue.innerText = "All";

    let lastClickedFilterBtn = filterBtns.length > 0 ? filterBtns[0] : null;
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener("click", function () {
                const selectedCategory = this.innerText.toLowerCase();
                if(selectValue) selectValue.innerText = this.innerText;
                renderPortfolio(selectedCategory);
                if (lastClickedFilterBtn) lastClickedFilterBtn.classList.remove("active");
                this.classList.add("active");
                lastClickedFilterBtn = this;
            });
        });
    }
    if (select) {
      select.addEventListener("click", function () { elementToggleFunc(this); });
    }
    if (selectItems.length > 0 && selectValue && select) {
        selectItems.forEach(item => {
          item.addEventListener("click", function () {
            let selectedCategory = this.innerText.toLowerCase();
            selectValue.innerText = this.innerText;
            elementToggleFunc(select);
            renderPortfolio(selectedCategory);
            filterBtns.forEach(fBtn => {
                if (fBtn.innerText.toLowerCase() === selectedCategory) {
                    if(lastClickedFilterBtn) lastClickedFilterBtn.classList.remove('active');
                    fBtn.classList.add('active');
                    lastClickedFilterBtn = fBtn;
                } else {
                    fBtn.classList.remove('active');
                }
            });
          });
        });
    }
});

const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

if (navigationLinks.length > 0 && pages.length > 0) {
  navigationLinks.forEach(link => {
    link.addEventListener("click", function () {
      let targetPage = this.innerHTML.toLowerCase();
      pages.forEach(page => {
        if (page.dataset.page === targetPage) {
          page.classList.add("active");
          if (targetPage === 'about') {
            renderProjectList(professionalWorkUl, professionalWorkIds);
            renderProjectList(techDesignWorkUl, techDesignWorkIds);
          }
          if (targetPage === 'portfolio') {
            renderPortfolio(selectValue ? selectValue.innerText.toLowerCase() : 'all');
          }
          window.scrollTo(0, 0);
        } else {
          page.classList.remove("active");
        }
      });
      navigationLinks.forEach(navLink => navLink.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

const copyEmailBtns = document.querySelectorAll('.copy-email-btn');

copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault(); 
        
        const email = this.getAttribute('data-email');
        const textSpan = this.querySelector('.email-text');
        const originalText = textSpan.innerText;

        navigator.clipboard.writeText(email).then(() => {
            textSpan.innerText = "Copied to clipboard!";
            textSpan.style.color = "var(--emerald-green-light)"; 
            
            setTimeout(() => {
                textSpan.innerText = originalText;
                textSpan.style.color = ""; 
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    });
});