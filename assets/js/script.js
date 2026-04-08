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

// --- DATA OBJECT FOR ROLE DEFINITIONS ---
const roleDefinitions = {
    "Game Designer": {
        title: "Game Designer",
        tagClass: "role-tag--game-designer",
        description: "I think in systems. I design interconnected mechanics where every piece has a reason to exist and every decision creates consequence."
    },
    "Technical Game Designer": {
        title: "Technical Game Designer",
        tagClass: "role-tag--technical-game-designer",
        description: "Everything I design, I also implement. If this tag is on a project, I created the design AND built it in engine."
    },
    "Leadership": {
        title: "Leadership",
        tagClass: "role-tag--leadership",
        description: "I bring teams together and drive the vision from concept to ship. On these projects, I was the person people looked to for direction."
    },
    "Game Programmer": {
        title: "Game Programmer",
        tagClass: "role-tag--game-programmer",
        description: "I write production code — C++, Blueprints, Verse. On these projects, I implemented systems within an existing design or codebase."
    }
};

// DYNAMICALLY GENERATE ABOUT ROLES GRID
const aboutRolesGrid = document.getElementById('about-roles-grid');
if (aboutRolesGrid) {
    aboutRolesGrid.innerHTML = Object.keys(roleDefinitions).map(role => {
        const def = roleDefinitions[role];
        return `
            <div class="about-role-item" data-role-target="${role}">
                <span class="role-tag ${def.tagClass}">${def.title}</span>
                <p>${def.description}</p>
                <div class="role-click-hint">View Evidence <ion-icon name="arrow-forward-outline"></ion-icon></div>
            </div>
        `;
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
        short: "A C++ Framework that uses Metasound to drive Rhythm-based gameplay!",
        long: "Project: Cadence is a powerful framework for creating gameplay synchronized to a music track. The system uses Metasound to drive a timeline of notes, which can be mapped by either the player or imported directly from external sources like osu! beatmaps. These timestamps are then used to trigger unique gameplay events. The entire architecture is built to be a reusable engine plugin and a foundation for an in-editor visual mapping tool.",
        tools:[ { name: "Unreal Engine", icon: unrealEngineIconSVG }, { name: "C++", icon: codeIconSVG }, { name: "Metasound", icon: codeIconSVG } ],
        cardEngineName: "Unreal Engine",
        myContribution:[
            "<b>Data-Driven & Modular by Design:</b> The system's core is a C++ timeline driven by Metasound. The system uses a python script as a parser to extract information from an osu beatmap, and map a data table with timestamps of each note. That data is then used to associate behaviour and events to that specific note to make something happen in the game. Osu is currently used as a mapping tool placeholder. It will be replaced with an in-editor tool that a designer, or the final user, can use to create their own custom beatmaps. The entire framework is built to be a self-contained, reusable Engine Plugin.",
            "<b>Architected for High Performance:</b> To handle thousands of concurrent events without performance loss, the framework uses lightweight UObjects to manage note states, avoiding the significant overhead of spawning an Actor for every event. Each note instance manages its own lifecycle and is cleanly garbage collected. The architecture is explicitly designed to support a future object pooling system to completely eliminate runtime allocation.",
            "<b>Empowering for Designers:</b> The entire system is built for designers to create unique gameplay without touching C++. The system revolves around 2 main blueprints that the designer can derive from: MusicActionInstance and MusicAction. A timestamp is associated with them, and they are used to trigger custom actions on that specific timestamp. The music action instance acts as the manager for the MusicActions, and tells them 'When' to execute. Meanwhile, the MusicAction is the actual behaviour we want to execute (Move Platform, Make Enemy shoot, Make enemy spawn etc..).",
            "<b>Versatile and Scalable:</b> Because the framework is a fundamental time-based event scheduler, it is incredibly flexible. It can be used as the foundation for a wide variety of game genres, such as:",
            "<ul><li>A <b>rhythm FPS</b> where enemy attacks and behaviors are synchronized to the song's notes.</li><li>A <b>fast-paced parkour game</b> where platforms and obstacles appear in sequence with the music, creating rhythmic traversal challenges.</li><li>A <b>top-down twin-stick shooter</b> where enemy waves and boss patterns are choreographed to the beat.</li></ul>",
            "<b>Future Plans:</b> The immediate next step is to heavily playtest and refine the framework. The ultimate goal is to package the system as a public-facing Unreal Engine plugin available on my GitHub and to use it as the foundation for my own rhythm-action game."
        ].join('</p><p>'), // Changed generic joins to ensure paragraph breaks
        roleContributions: {
            "Game Designer": "<p><b>Design Philosophy:</b> Designed the entire system around a core principle: music should drive gameplay, not accompany it. The framework separates timing data from behavior, so designers can create entirely different game genres from the same musical source.</p><p><b>Versatility by Design:</b> Architected the system to support rhythm FPS, parkour games, twin-stick shooters, and more — all from one framework. Every design decision prioritized flexibility over specificity.</p>",
            "Technical Game Designer": "<p><b>Core Architecture:</b> Built a C++ timeline driven by Metasound. Uses a Python parser to extract osu! beatmap data into DataTables, mapping timestamps to gameplay events. The entire framework is built as a self-contained, reusable Engine Plugin.</p><p><b>Performance Architecture:</b> Uses lightweight UObjects instead of Actors to handle thousands of concurrent events without performance loss. Each note instance manages its own lifecycle and is designed for future object pooling.</p><p><b>Designer Empowerment:</b> Built two core Blueprint-derivable classes (MusicActionInstance and MusicAction) so designers can create unique gameplay without touching C++. The instance manages 'when,' the action manages 'what.'</p>"
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
        role: "Sole Creator — Designer, Programmer, World Builder",
        image: "./assets/images/ProjectSasha.svg",
        video: null,
        short: "A top-down action-exploration game where scanning IS the entire game. Knowledge is the resource, memory is the currency, and every mechanic maps to a single philosophical question: what is worth remembering?",
        long: "Project Sasha is built around a single mechanic — scanning — that drives every other system: exploration, combat, progression, and narrative. The player controls an android navigating a brutalist megastructure. There is no traditional inventory — only data stored in a finite memory budget. The tension of every moment is the tension between knowing more and having the capacity to act. The game draws from BLAME!, NieR: Automata, and Armored Core 6 aesthetically and structurally.",
        tools:[ { name: "Unreal Engine", icon: unrealEngineIconSVG }, { name: "C++", icon: codeIconSVG } ],
        cardEngineName: "Unreal Engine",
        myContribution:[
            "<b>Core Design Philosophy:</b> Designed the entire game around four pillars: knowledge as resource, the world is dark until earned, commitment creates consequence, and the terminal is the exhale. Every mechanic maps to a memory decision — ghost scanning (volatile, reversible) vs full scanning (permanent, costly).",
            "<b>Scanning System Architecture:</b> Designed a two-tier scanning system with a unique dot-cloud visual language. Objects progress from invisible → dot cloud (passive awareness) → ghost scan (volatile data, ice blue) → full scan (permanent, amber → solid mesh). Ghost scans are spatially constrained — players must physically traverse large objects, painting them with attention.",
            "<b>Memory Architecture:</b> Designed a finite memory budget system where everything costs megabytes — scanned objects, weapons, programs. Weapons must be transferred to the OS chip to be executable, permanently reducing scan capacity. Every weapon is a tradeoff. Map chips are discrete data containers found in the world, not purchased.",
            "<b>World & Lore Design:</b> Created a complete fictional framework ('Digital Gnosticism') where the metaphor and the mechanic are the same thing. The world is unformatted Biometal (Vantablack) until scanned into existence (Grey Concrete). Combat requires scanning enemies to force them into a solid state before they can be destroyed.",
            "<b>Current Status:</b> Scanning mechanic prototype complete. Character movement and further systems in active development."
        ].join('</p><p>'),
        roleContributions: {
            "Game Designer": "<p><b>Core Design Pillars:</b> Built the entire game around four pillars: knowledge as resource, the world is dark until earned, commitment creates consequence, and the terminal is the exhale. Every mechanic maps to a memory decision.</p><p><b>Memory Architecture:</b> Designed a finite memory budget where everything costs megabytes — scans, weapons, programs. Weapons must transfer to the OS chip to be usable, permanently reducing scan capacity. Every weapon is a tradeoff.</p><p><b>World & Lore:</b> Created 'Digital Gnosticism' — a framework where the world is unformatted Biometal (Vantablack) until scanned into existence (Grey Concrete). The metaphor and the mechanic are the same thing.</p>",
            "Technical Game Designer": "<p><b>Two-Tier Scanning System:</b> Designed and implemented a scanning system with a unique dot-cloud visual language. Objects progress through states: invisible → dot cloud → ghost scan (volatile, ice blue) → full scan (permanent, amber → solid mesh).</p><p><b>Spatial Scanning:</b> Ghost scans are spatially constrained — players must physically traverse large objects, painting them with attention by moving alongside them. Scan speed uses an exponential fill curve modeling resistance.</p>"
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
        short: "A rhythm-based bullet hell FPS built on top of Project: Cadence, stress-testing the framework's ability to drive an entirely different genre of gameplay.",
        long: "Project Circle is a design experiment that pushes the Cadence music-driven event system into FPS territory. Enemy attacks, bullet patterns, and spawns are all synchronized to the beat. The project served as a real-world stress test of the Cadence framework's flexibility and exposed the boundaries of the system's current architecture.",
        tools:[ { name: "Unreal Engine", icon: unrealEngineIconSVG }, { name: "C++", icon: codeIconSVG } ],
        cardEngineName: "Unreal Engine",
        myContribution:[
            "<b>Framework Stress Test:</b> Used Project Cadence as the foundation and built a first-person bullet hell prototype on top of it, proving the framework could drive combat-oriented gameplay, not just rhythm-action.",
            "<b>Design Iteration:</b> Explored the design space of rhythm-synchronized enemy behavior — choreographing attack patterns, spawn waves, and bullet trajectories to the beat. Identified where the Cadence system excelled and where its architecture needed extension."
        ].join('</p><p>'),
        roleContributions: {
            "Technical Game Designer": "<p><b>Framework Stress Test:</b> Built a fully functional 3D bullet hell prototype directly on top of the Cadence C++ framework to validate its cross-genre capabilities. Synced complex enemy attack patterns and projectile spawns entirely to Metasound data.</p>"
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
        video: null, // Fixed: Moved itch link to learnMore
        learnMoreLink: "https://gianluca-iacchini.itch.io/crt-exe",
        image: "./assets/images/CRTexe.svg",
        short: "Led a team of 8 through conceptualization, system design, and production in a game jam environment.",
        long: "CRT.exe is a puzzle-exploration game built in Godot during the Brackeys Game Jam 2026.1. On a team of 8 people with varied skill sets and experience levels, I naturally stepped into the leadership role — defining the game's core concept, designing the system behind the idea, and managing the production pipeline to bring it to submission. My hands-on contribution was all sound effects.",
        tools:[ { name: "Godot", icon: codeIconSVG } ],
        cardEngineName: "Godot",
        myContribution:[
            "<b>Project Leadership:</b> Led conceptualization and production for a team of 8. Defined the game's core concept, structured the development pipeline, and ensured the team stayed aligned from idea to submission.",
            "<b>System Design:</b> Designed the underlying system and puzzle logic that the rest of the team implemented. Communicated the design vision clearly enough that 7 other people could build it without ambiguity.",
            "<b>SFX Design:</b> Created all sound effects for the game, contributing to the atmospheric and unsettling tone."
        ].join('</p><p>'),
        roleContributions: {
            "Leadership": "<p><b>Project Leadership:</b> Led conceptualization and production for a team of 8 with varied skill sets and experience levels. Defined the core concept, structured the development pipeline, and ensured the team stayed aligned from idea to submission.</p>",
            "Game Designer": "<p><b>Core Puzzle Logic:</b> Designed the underlying systemic puzzle logic that the engineering team implemented. Communicated the design vision clearly enough that 7 other people could build it without ambiguity.</p>"
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
        image: "./assets/images/HighOnLife.png",
        short: "Nintendo Switch port tackling deep-level architecture bugs and system stability.",
        long: "I worked with Untold Games on the complex technical challenge of porting 'High on Life' to the Switch. My role quickly evolved beyond general programming to become a go-to resource for the project's most difficult issues.",
        tools:[ { name: "Unreal Engine", icon: unrealEngineIconSVG }, { name: "C++", icon: codeIconSVG } ],
        cardEngineName: "Unreal Engine",
        myContribution:[
            "<b>Debugging:</b> Investigated and resolved critical bugs in C++ and blueprints, related to the core game mechanics gameplay systems and more.", 
            "<b>Systems & Gameplay Stabilization:</b> Rewrote logic of different system to ensure stability on the Nintendo Switch. Solved a lot of different issues related to level streaming and race conditions."
        ].join('</p><p>'),
        roleContributions: {
            "Game Programmer": "<p><b>Deep-Level Debugging:</b> Investigated and resolved critical bugs in C++ and Blueprints related to core gameplay systems. Rewrote logic of different systems to ensure stability on the Nintendo Switch.</p>",
            "Technical Game Designer": "<p><b>Tool Development:</b> Extended the cheat manager UI with essential performance stats. Designed and implemented a multi-iteration lighting tool for a technical artist, enabling rapid in-editor changes to level lighting.</p>"
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
        video: null, // Fixed: Moved fortnite link to learnMore
        learnMoreLink: "https://www.fortnite.com/@untoldgames/1028-2740-2494",
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
        video: null, // Fixed
        learnMoreLink: "https://open.substack.com/pub/giuseppeluigialfieri/p/game-prototypes-alien?r=3ko0h9&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true",
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
        title: "Cycle (Award-Winning)",
        category: "university work",
        published: true,
        tier: "hero",
        roles: ["Leadership", "Game Designer", "Game Programmer"],
        isFeatured: true,
        year: 2022,
        role: "Game Director & Lead Systems Designer",
        video: "https://youtu.be/Cuwhx4b7tYo",
        learnMoreLink: "https://wrong-world-studios.itch.io/cycle",
        image: "./assets/images/Cycle.png",
        short: "Award-winning surrealist puzzle game. Best 3rd Year Videogame at Falmouth University.",
        long: "Cycle is a surrealist puzzle-adventure game that won 'Best 3rd Year Videogame' at Falmouth University (2021) and was chosen to represent the university at the G7 Summit. On a team of three, I was responsible for leading the project's vision while also acting as the sole programmer and designer.",
        tools:[ { name: "Unreal Engine", icon: unrealEngineIconSVG } ],
        cardEngineName: "Unreal Engine",
        myContribution: "<p>Led a team of three (myself and two artists) from pre-production to publishing on Itch.io. Designed and implemented all foundational systems: a dynamic hub-world that changes based on progression, seamless world transitions without loading screens, and a day/night cycle.</p>",
        roleContributions: {
            "Leadership": "<p><b>Project Direction:</b> Led a team of three (myself and two artists) from pre-production to publishing on Itch.io. Managed deadlines, maintained the core vision.</p>",
            "Game Designer": "<p><b>Systems Architecture:</b> Designed all foundational systems: a dynamic hub-world that changes based on progression, seamless world transitions without loading screens.</p>",
            "Game Programmer": "<p><b>Sole Programmer:</b> As the project's only programmer, I built the entire game in Unreal Engine from scratch.</p>"
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
        video: null, // Fixed: Moved itch link to learnMore
        learnMoreLink: "https://batraf.itch.io/cards-weaver",
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
        roles: ["Game Programmer"],
        year: 2023, 
        role: "Game Developer",
        teamSize: "Verona University",
        image: "./assets/images/work-6.jpg",
        video: null, // Fixed
        learnMoreLink: "https://fraffer.itch.io/soul-driven",
        short: "Action game developed as a university project.",
        long: "A university project exploring action game development concepts.",
        tools:[ { name: "Unity", icon: unityIconSVG } ],
        cardEngineName: "Unity",
        myContribution: "<p>Implemented player character controls and combat mechanics. Developed enemy AI patterns and attack sequences. Created particle effects for abilities and impacts.</p>",
        roleContributions: {} // Placeholder pending your input
    },
    "Covid19Training": {
        id: "Covid19Training",
        title: "Covid 19 Training",
        category: "professional work",
        published: true,
        tier: "listed",
        roles:["Game Programmer"],
        year: 2021, 
        role: "Game Programmer",
        teamSize: "Cineon Training",
        image: "./assets/images/work-2.jpg",
        video: null, // Fixed
        learnMoreLink: "https://cineon.training/covid-19-personal-protective-equipment-ppe-training/",
        short: "VR Training simulation for PPE in Unreal Engine.",
        long: "Developed PPE training scenarios using VR technology in Unreal Engine.",
        tools:[ { name: "Unreal Engine", icon: unrealEngineIconSVG } ],
        cardEngineName: "Unreal Engine",
        myContribution: "<p>Scripted interaction logic for VR controllers and training objects. Implemented a scenario progression system with feedback mechanisms. Optimized performance for smooth VR experience.</p>",
        roleContributions: {} // Placeholder pending your input
    },
    "UnrealEngineCourse": {
        id: "UnrealEngineCourse",
        title: "Unreal Engine Course",
        category: "professional work",
        published: true,
        tier: "listed",
        roles: ["Game Programmer", "Technical Game Designer"], // Fixed: empty roles break the gallery logic
        year: 2022, 
        role: "Unreal Engine Tutor",
        teamSize: "Creativity Unleashed",
        image: "./assets/images/work-1.jpg",
        video: null,
        learnMoreLink: "https://www.udemy.com/course/complete-unreal-engine-megacourse-beginner-to-expert/",
        short: "Online course for Unreal Engine.",
        long: "A 16-hour course introducing Unreal Engine Blueprints and programming structures.",
        tools:[ { name: "Unreal Engine", icon: unrealEngineIconSVG } ],
        cardEngineName: "Unreal Engine",
        myContribution: "<p>Designed and recorded course modules covering Unreal Engine fundamentals, Blueprints, and common game programming patterns. Created example projects and exercises for students.</p>",
        roleContributions: {} // Placeholder pending your input
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
        short: "D&D Homebrew content for the Monk class.",
        long: "Personal game design project creating new options for D&D.",
        tools:[], // Fixed format
        cardEngineName: "Tabletop", 
        myContribution: "<p>Designed new subclasses and abilities for the D&D Monk class, focusing on thematic cohesion and mechanical balance. Formatted content for community sharing.</p>",
        roleContributions: {} 
    },
    "SyovaraHomebrew": {
        id: "SyovaraHomebrew",
        title: "Syovara Homebrew",
        category: "personal work",
        published: true,
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
        published: true,
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
        video: null, // Fixed
        learnMoreLink: "https://drive.google.com/file/d/1kqrXXSPwxUrCUG9qNnqnNzSuWa9S9QJv/view?usp=sharing",
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
        published: true,
        tier: "listed",
        roles:["Game Designer"],
        year: 2022, 
        role: "Game Designer & Developer",
        teamSize: "Game Jam Team",
        image: "./assets/images/work-8.jpg",
        video: null, // Fixed
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
        published: true,
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
        title: "Turn-Based Tactics (100% C++ Challenge)",
        category: "personal work",
        published: true,
        isFeatured: true,
        tier: "listed",
        roles:["Technical Game Designer", "Game Programmer"],
        year: 2024,
        role: "Sole Creator",
        image: "./assets/images/work-5.jpg", 
        video: null,
        learnMoreLink: null, // We will put the GitHub link here later!
        short: "A 1v1 turn-based strategy game built strictly in C++, taken from a Computer Science exam prompt to test my limits.",
        long: "A colleague (who is also a Computer Science professor) playfully teased me about my non-traditional programming background. In response, I asked for his toughest 'build a videogame' exam prompt and built it in my free time to prove a point—and to help him playtest his own academic design. I set a strict rule: 100% C++, zero Blueprints. In one month, while working full-time, I built the entire turn-based grid game from scratch, mastering C++ architecture along the way.",
        tools:[ { name: "Unreal Engine", icon: unrealEngineIconSVG }, { name: "C++", icon: codeIconSVG } ],
        cardEngineName: "Unreal Engine",
        myContribution: "<p>Translated a rigid academic design document into a fully functional game, building a custom grid system, pathfinding algorithms, and a robust turn-state manager entirely in C++.</p>",
        roleContributions: {
            "Technical Game Designer": "<p><b>System Translation:</b> Took a rigid academic Game Design Document (specifying exact grid sizes, obstacle logic, HP pools, and combat RNG) and architected a flexible system that respected those constraints.</p><p><b>Class Design:</b> Implemented the logic for asymmetric units (Sniper vs. Brawler), ensuring ranges, movement penalties, and combat mechanics functioned flawlessly on a 25x25 grid.</p>",
            "Game Programmer": "<p><b>100% C++ Architecture:</b> Built the entire project without Blueprints to force my own learning. This required mastering Unreal's C++ framework, memory management, and class hierarchy in record time.</p><p><b>Algorithmic Implementation:</b> Engineered the grid-based movement and pathfinding (implementing DFS algorithms) to handle movement range calculations and obstacle avoidance.</p><p><b>Turn State Management:</b> Programmed the core game loop, including the coin-toss setup phase, alternating unit placement, and the strict phase-based combat turns.</p>"
        }
    },
    "TheLibrary": {
        id: "TheLibrary",
        title: "The Library (System Architecture Sprint)",
        category: "personal work",
        published: true, 
        isFeatured: true,
        tier: "listed",
        roles:["Technical Game Designer"],
        year: 2023,
        role: "Sole Programmer & Systems Designer",
        image: "./assets/images/work-5.jpg",
        video: null,
        learnMoreLink: null,
        short: "A technical design prototype featuring a dynamic spline-based inventory spawner and a modular customer queue system.",
        long: "This was a technical design sprint for a management game concept where a librarian retrieves specific books for a constant flow of customers. I architected two major systems: a spline-based shelf spawner that reads item dimensions to perfectly pack physical books, and a robust customer queue manager. The personal challenge? I coded the entire modular queue system in Blueprints for 12 hours straight without pressing 'Play' once to test it. When I finally compiled and hit play, it ran flawlessly on the first try with zero bugs.",
        tools:[ { name: "Unreal Engine", icon: unrealEngineIconSVG }, { name: "Blueprints", icon: codeIconSVG } ],
        cardEngineName: "Unreal Engine",
        myContribution: "<p>Engineered the dynamic object spawner and the customer state machine entirely in Blueprints, proving my structural understanding of visual scripting.</p>",
        roleContributions: {
            "Technical Game Designer": "<p><b>Spline-Based Inventory Spawner:</b> Built a dynamic spawner that reads book dimensions (sizes 5, 10, 20, etc.) from Data Tables and uses math to perfectly pack them along a defined spline path inside bookshelf geometry.</p><p><b>State Machine & Queue Management:</b> Architected a modular customer queue system involving spawn doors, dynamic line nodes, and counter interactions. The system smoothly handles AI pathing and state transitions as customers wait, order, and leave.</p><p><b>Blind Implementation Sprint:</b> Proved my structural understanding of Blueprint architecture by coding the entire queue logic in a 12-hour blind sprint. Because the architecture was completely modular and avoided spaghetti-code, it compiled and ran perfectly on the very first test.</p>"
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

    const projectsByYear = {};
    filteredProjects.forEach(p => {
        const year = p.year || "Other";
        if (!projectsByYear[year]) projectsByYear[year] =[];
        projectsByYear[year].push(p);
    });

    const sortedYears = Object.keys(projectsByYear).sort((a, b) => {
        if (a === "Other") return 1;
        if (b === "Other") return -1;
        return b - a;
    });

    sortedYears.forEach(year => {
        const yearHeading = document.createElement('h3');
        yearHeading.className = 'year-heading';
        yearHeading.textContent = year;
        portfolioGridContainer.appendChild(yearHeading);

        const projectListUl = document.createElement('ul');
        projectListUl.className = 'project-list';
        projectsByYear[year].forEach(project => {
            projectListUl.appendChild(createProjectListItem(project, true));
        });
        portfolioGridContainer.appendChild(projectListUl);
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

function openProjectModal(projectId) {
    const data = projectDetails[projectId];
    if (!data) return;
    
    const modalShortText = data.short || data.myContribution || "Details provided below.";
    const modalLongText = (data.long && data.long !== data.short) ? data.long : '';

    const hasVideo = data.video && data.video !== "#" && (data.video.startsWith("http://") || data.video.startsWith("https://"));
    let mediaContentHtml = '';
    if (data.image) {
        if (hasVideo) mediaContentHtml = `<a href="${data.video}" target="_blank"><img src="${data.image}" alt="${data.title}"></a>`; 
        else mediaContentHtml = `<img src="${data.image}" alt="${data.title}">`;
    }
    const toolIconsHtml = data.tools && data.tools.length > 0 ? data.tools.map(tool => {
        return `<span class="tool-item" title="${tool.name || ''}">${tool.icon ? `<span class="tool-icon ${tool.class || ''}">${tool.icon}</span>` : ''}<span class="tool-name">${tool.name || ''}</span></span>`;
    }).join('') : '<p>N/A</p>';
    
    let learnMoreButtonHTML = '';
    if (data.learnMoreLink && data.learnMoreLink !== "#") {
        if (data.learnMoreLink === "request") {
            learnMoreButtonHTML = `<div class="modal-learn-more-request"><p>Detailed technical breakdown available upon request.</p></div>`;
        } else {
            learnMoreButtonHTML = `<div class="modal-learn-more"><a href="${data.learnMoreLink}" target="_blank" class="form-btn"><ion-icon name="link-outline"></ion-icon><span>Learn More</span></a></div>`;
        }
    }
    if(modalBody) {
        const roleTagsHtml = data.roles && data.roles.length > 0
            ? data.roles.map(r => `<span class="role-tag role-tag--${r.toLowerCase().replace(/\s+/g, '-')}">${r}</span>`).join('') : '';

        let sidebarImageHtml = '';
        if (data.image && hasVideo) {
            sidebarImageHtml = `<a href="${data.video}" target="_blank" class="modal-hero-img-wrap modal-hero-img-wrap--video"><img src="${data.image}" alt="${data.title}" class="modal-hero-img"><div class="modal-hero-play">▶</div></a>`;
        } else if (data.image) {
            sidebarImageHtml = `<div class="modal-hero-img-wrap"><img src="${data.image}" alt="${data.title}" class="modal-hero-img"></div>`;
        }

        modalBody.innerHTML = `
            <div class="modal-two-zone">
                <div class="modal-sidebar">
                    ${sidebarImageHtml}
                    <div class="modal-sidebar-meta">
                        ${roleTagsHtml ? `<div class="modal-role-tags">${roleTagsHtml}</div>` : ''}
                        <div class="modal-meta-list">
                            <div class="modal-meta-item"><span class="modal-meta-label">Role</span><span class="modal-meta-value">${data.role || 'N/A'}</span></div>
                            ${data.context ? `<div class="modal-meta-item"><span class="modal-meta-label">Context</span><span class="modal-meta-value">${data.context}</span></div>` : ''}
                            ${data.duration ? `<div class="modal-meta-item"><span class="modal-meta-label">Duration</span><span class="modal-meta-value">${data.duration}</span></div>` : ''}
                            <div class="modal-meta-item"><span class="modal-meta-label">Tools</span><div class="tool-list">${toolIconsHtml}</div></div>
                        </div>
                        ${learnMoreButtonHTML}
                    </div>
                </div>
                <div class="modal-main">
                    <h3 class="modal-project-title">${data.title}</h3>
                    <div class="modal-overview">
                        <p class="modal-short">${modalShortText}</p>
                        ${modalLongText ? `<p class="modal-long">${modalLongText}</p>` : ''}
                    </div>
                    <div class="modal-contributions">${buildContributionHTML(data)}</div>
                </div>
            </div>`;
    }
    if (projectModal) projectModal.classList.add('active');
    document.body.classList.add('no-scroll');
}

// --- NEW ROLE MODAL LOGIC ---
const roleModal = document.getElementById('roleModal');
const roleModalBody = document.getElementById('roleModalBody');
const roleModalClose = document.getElementById('roleModalClose');

function getGalleryCta(project) {
    const link = project.learnMoreLink || project.video;
    if (link && link !== '#' && link !== 'request') {
        let label = 'Open Project', icon = 'link-outline';
        if (link.includes('notion'))            { label = 'Read GDD';        icon = 'document-text-outline'; }
        else if (link.includes('itch.io'))      { label = 'Play on itch.io'; icon = 'game-controller-outline'; }
        else if (link.includes('drive.google')) { label = 'View Document';   icon = 'document-outline'; }
        else if (link.includes('youtube') || link.includes('youtu.be') || link.includes('fortnite')) { label = 'Watch Video'; icon = 'play-circle-outline'; }
        else if (link.includes('github'))       { label = 'View on GitHub';  icon = 'logo-github'; }
        return { label, icon, url: link, external: true };
    }
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

        const ctaHtml = cta.external
            ? `<a href="${cta.url}" target="_blank" rel="noopener noreferrer" class="rpc-cta-btn"><ion-icon name="${cta.icon}"></ion-icon>${cta.label}</a>`
            : `<button class="rpc-cta-btn rpc-cta-btn--modal" data-project="${p.id}"><ion-icon name="${cta.icon}"></ion-icon>${cta.label}</button>`;

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

document.body.addEventListener('click', function(e) {
    const clickedProjectLink = e.target.closest('a.open-modal');
    if (clickedProjectLink && !clickedProjectLink.hasAttribute('target')) { 
        e.preventDefault();
        openProjectModal(clickedProjectLink.dataset.project);
    }

    const clickedRoleTrigger = e.target.closest('.about-role-item, .sidebar-role-btn');
    if (clickedRoleTrigger) {
        openRoleModal(clickedRoleTrigger.dataset.roleTarget);
    }
});

if (modalClose) {
    modalClose.addEventListener('click', () => {
        if (projectModal) projectModal.classList.remove('active');
        if (roleModal && !roleModal.classList.contains('active')) {
            document.body.classList.remove('no-scroll'); 
        }
        if (modalBody) modalBody.innerHTML = ''; 
    });
}
if (projectModal) {
    projectModal.addEventListener('click', e => {
        if (e.target === projectModal) { 
            projectModal.classList.remove('active');
            if (roleModal && !roleModal.classList.contains('active')) {
                document.body.classList.remove('no-scroll'); 
            }
            if (modalBody) modalBody.innerHTML = ''; 
        }
    });
}

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