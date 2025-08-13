'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// OLD Testimonials modal (if still used elsewhere, keep)
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
const selectValue = document.querySelector("[data-selecct-value]");

// Portfolio filter variables
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const portfolioGridContainer = document.getElementById('portfolio-grid-container');

// NEW: Containers for About page sections
const professionalWorkUl = document.querySelector('.professional-work-list');
const techDesignWorkUl = document.querySelector('.tech-design-list');


// SVG icons
const fortniteIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.86 6.71l-1.72 1.72c-.19-.25-.43-.46-.72-.62l.98-2.35c.13-.32.02-.69-.27-.84s-.69-.02-.84.27l-.98 2.35c-.3-.09-.61-.13-.93-.13s-.63.04-.93.13l-.98-2.35c-.13-.32-.51-.45-.84-.27s-.45.51-.27.84l.98 2.35c-.29.16-.53.37-.72.62l-1.72-1.72c-.26-.26-.71-.23-.94.03s-.23.71.03.94l1.72 1.72c-.16.29-.27.6-.31.93H5.5c-.39 0-.7.31-.7.7s.31.7.7.7h2.35c.04.33.15.64.31.93l-1.72 1.72c-.26.26-.29.71-.03.94s.71.29.94.03l1.72-1.72c.25.19.54.33.85.42V17.5c0 .39.31.7.7.7s.7-.31.7-.7v-2.35c.3-.09.59-.23.85-.42l1.72 1.72c.26.26.71.23.94-.03s-.23-.71-.03-.94l-1.72-1.72c.16-.29.27.6.31-.93h2.35c.39 0 .7-.31-.7-.7s-.31-.7-.7-.7H14.8c-.04-.33-.15-.64-.31-.93l1.72-1.72c.26-.26.29-.71.03-.94s-.71-.29-.94-.03zM12 13.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>`; 
const verseIconSVG = `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9V7h2v10zm4 0h-2V7h2v10z"/></svg>`; 
const unrealEngineIconSVG = `<svg viewBox="0 0 210.4 210.4" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M105.2 5c55.3 0 100.2 45 100.2 100.2s-45 100.2-100.2 100.2S5 160.5 5 105.2 50 5 105.2 5m0-5C47.1 0 0 47.1 0 105.2s47.1 105.2 105.2 105.2 105.2-47.1 105.2-105.2S163.4 0 105.2 0z"/><path d="M97.9 42.2s-23.7 6.7-45 29.3-24 38.7-24 50.7c4.7-8 33.7-52.1 40.5-31.1v50.2s-.4 6.8-10.8 4.1c3.1 5.8 19.1 20.1 48 23 6.6-6.6 15.2-16.1 15.2-16.1l14.4 12.2s25.9-16.8 36.1-41.2c-9.5 6.2-21 20.6-27 10.5V72.7s15.4-23.1 17.8-24.2c-6.1 1.1-27.6 8.2-38.9 22.8-3.2-3.5-12.1-3.6-12.1-3.6s7 5.8 7.1 11.1 0 49.5 0 54.6c-4.8 4.9-9.9 7.5-13.2 7.5-7.7 0-9.9-2.7-12-5.4V71.3s-3.8 3.2-6.8-2S84.1 54 97.9 42.2z"/></svg>`;
const unityIconSVG = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="1em" height="1em"><path d="M12.012 2.5a.708.708 0 00-.702.714v17.572a.71.71 0 00.702.714.715.715 0 00.708-.714V3.214a.71.71 0 00-.708-.714zm6.445 3.174l-5.07 2.927v8.788l5.07 2.937a.71.71 0 001.058-.616V6.29a.71.71 0 00-1.058-.616zm-12.896 0a.71.71 0 00-1.058.616v11.422a.71.71 0 001.058.616l5.07-2.937V8.601l-5.07-2.927zM11.304.002A.71.71 0 0010.59.61L3.41 4.66a.71.71 0 00-.352.617V18.72a.71.71 0 00.352.616L10.59 23.39a.714.714 0 00.708 0l7.18-4.056a.71.71 0 00.352-.616V5.277a.71.71 0 00-.352-.617L11.304 0z"/></svg>`; 
const codeIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`;


const projectDetails = {
    "ProjectCadence": {
        id: "ProjectCadence",
        title: "Project: Cadence (Music-Driven Event System)",
        category: "personal work",
        published: true,
        isFeatured: true,
        duration: "1 month, currently WIP",
        year: 2025,
        role: "Sole Systems Architect & Technical Designer",
        image: "./assets/images/work-5.jpg", 
        video: "#", 
        
        short: "A high-performance C++ event system for Unreal Engine that uses a music-driven timeline to trigger complex, designer-scripted gameplay in Blueprints.",

        long: "Project: Cadence is a powerful framework for creating gameplay synchronized to a music track. The system uses Metasound to drive a high-precision timeline, which is populated with thousands of event timestamps imported directly from external sources like osu! beatmaps. These timestamps are then used to trigger unique, designer-created gameplay events. The entire architecture is built to be a reusable engine plugin and a foundation for an in-editor visual mapping tool.",

        tools: [ 
            { name: "Unreal Engine", icon: unrealEngineIconSVG }, 
            { name: "C++", icon: codeIconSVG },
            { name: "Metasound", icon: codeIconSVG } 
        ],
        cardEngineName: "Unreal Engine",

        myContribution: [
            // 1. Core Functionality
            "<b>Data-Driven & Modular by Design:</b> The system's core is a C++ timeline driven by Metasound. It can instantly translate external rhythm data from sources like osu! into a timeline of precise timestamps, each ready to trigger a custom gameplay event. The entire framework is built to be a self-contained, reusable Engine Plugin.",
            
            // 2. Performance
            "<br><br><b>Architected for High Performance:</b> To handle thousands of concurrent events without performance loss, the framework uses lightweight UObjects to manage note states, avoiding the significant overhead of spawning an Actor for every event. Each note instance manages its own lifecycle and is cleanly garbage collected. The architecture is explicitly designed to support a future object pooling system to completely eliminate runtime allocation.",
            
            // 3. Designer Workflow
            "<br><br><b>Empowering for Designers:</b> The entire system is built for designers to create unique gameplay without touching C++. At each timestamp, a custom Blueprint 'Brain' (`UMusicActionInstance`) runs its own unique logic. This 'Brain' can then execute a library of simple, reusable 'Actions' (`UMusicAction`) to make things happen in the world—from moving a platform to spawning a wave of enemies, all within a single note.",
            
            // 4. Versatility
            "<br><br><b>Versatile and Scalable:</b> Because the framework is a fundamental time-based event scheduler, it is incredibly flexible. It can be used as the foundation for a wide variety of game genres, such as:",
            "<ul>"+
            "<li style='margin-left: 20px; margin-top: 5px;'>A <b>rhythm FPS</b> where enemy attacks and behaviors are synchronized to the song's notes.</li>"+
            "<li style='margin-left: 20px; margin-top: 5px;'>A <b>fast-paced parkour game</b> where platforms and obstacles appear in sequence with the music, creating rhythmic traversal challenges.</li>"+
            "<li style='margin-left: 20px; margin-top: 5px;'>A <b>top-down twin-stick shooter</b> where enemy waves and boss patterns are choreographed to the beat.</li>"+
            "</ul>",
            
            // 5. Future Plans
            "<br><br><b>Future Plans:</b> The immediate next step is to heavily playtest and refine the framework. The ultimate goal is to package the system as a public-facing Unreal Engine plugin available on my GitHub and to use it as the foundation for my own rhythm-action game."
        ].join('')
    },
    "FullCppMechGame": {
        id: "FullCppMechGame",
        title: "Full C++ Mech Game",
        category: "personal work",
        published: false,
        isFeatured: true,
        year: 2024,
        role: "Sole Creator & Technical Game Designer",
        image: "./assets/images/work-5.jpg",
        short: "A prototype for a fast-paced mech combat game, built entirely in C++ to explore advanced topics like component-based architecture and custom physics.",
        long: "This project is a love letter to the 2001 classic 'Aliens Versus Predator 2,' aiming to recreate the feeling of being a stealthy and powerful Facehugger. The core design goal was to explore and prototype a set of interconnected mechanics—movement, possession, and environmental interaction—that create emergent, dynamic gameplay scenarios, transforming the player from a vulnerable creature into a formidable predator.",
        tools: [ { name: "Unreal Engine", icon: unrealEngineIconSVG }, { name: "C++", icon: codeIconSVG } ],
        cardEngineName: "Unreal Engine",
        myContribution: "Designed and implemented the mech's movement component, weapon firing systems, and a custom damage model, all within a C++ framework.",
    },
    "TheLibrary": {
        id: "TheLibrary",
        title: "The Library",
        category: "personal work",
        published: false,
        isFeatured: true,
        year: 2023,
        role: "Sole Creator & Technical Game Designer",
        image: "./assets/images/work-5.jpg",
        short: "An atmospheric puzzle game prototype where players manipulate time to solve environmental puzzles and uncover a branching narrative.",
        long: "This project is a love letter to the 2001 classic 'Aliens Versus Predator 2,' aiming to recreate the feeling of being a stealthy and powerful Facehugger. The core design goal was to explore and prototype a set of interconnected mechanics—movement, possession, and environmental interaction—that create emergent, dynamic gameplay scenarios, transforming the player from a vulnerable creature into a formidable predator.",
        tools: [ { name: "Unreal Engine", icon: unrealEngineIconSVG } ],
        cardEngineName: "Unreal Engine",
        myContribution: "Developed the core time-manipulation mechanic using Blueprints and designed a flexible, data-driven system for scripting narrative events and puzzle logic.",
    },
    // --- Existing Projects ---
    "PoliceSimulator": {
        id: "PoliceSimulator",
        title: "Police Simulator: Patrol Officers (Nintendo Switch Port)",
        category: "professional work",
        published: true,
        isFeatured: true,
        year: 2024,
        role: "Game Programmer & Technical Designer",
        context: "Untold Games (for Aesir Interactive & Turn Me Up Games)",
        duration: "Approx. 6 months",
        video: "https://www.youtube.com/watch?v=fL2SOhYZ6k8",
        learnMoreLink: null,
        image: "./assets/images/PoliceSimulator.png",
        short: "Contributed to the Nintendo Switch port, developing a comprehensive ImGui-based debug menu and creating extensive technical design documentation.",
        long: "As part of the Untold Games team, I tackled the port of this complex Unreal Engine 4.27 title. The role blended programming with technical design, requiring me to not only fix bugs but also to deeply analyze, document, and create tools for the game's intricate systems. A key challenge was navigating the instability of World Partition, which demanded creative and unconventional debugging strategies.",
        tools: [
            { name: "Unreal Engine", icon: unrealEngineIconSVG },
            { name: "C++", icon: codeIconSVG },
            { name: "ImGui", icon: codeIconSVG }
        ],
        cardEngineName: "Unreal Engine",
        projectTags: ['Porting: Switch'],
        myContribution: [
            "<b>Tool Development:</b> Designed and implemented a full-featured debug cheat menu from scratch using ImGui, providing the QA and development team with crucial tools for testing.",
            "<b>Technical Design & Documentation:</b> Authored an exhaustive technical document detailing every game mechanic, system, and item. Became the go-to resource for system interactions and design implications.",
            "<b>Systems Analysis & Problem-Solving:</b> Investigated and solved complex issues related to the experimental World Partition system. Devised a workaround to modify Data Assets at runtime for debugging NPC population, a feature not natively supported.",
            "<b>Core Gameplay & Bug-Fixing:</b> Overhauled the Switch input system, fixed critical bugs that blocked the use of the main development test map, and resolved a wide array of other gameplay-related issues."
        ].join('<br><br>'),
    },
    "HighOnLife": {
        id: "HighOnLife",
        title: "High on Life (Nintendo Switch Port)",
        category: "professional work",
        published: true,
        isFeatured: true,
        year: 2025,
        role: "Game Programmer & Tech Game Designer",
        context: "Untold Games (for Squanch Games & Turn Me Up Games)",
        duration: "Approx. 8 months (2024-2025)",
        video: "https://www.youtube.com/watch?v=EvhUMyenR9c&ab_channel=NintendoofAmerica",
        learnMoreLink: "https://savory-dietician-b97.notion.site/High-On-Life-20753eb8bf2d803ba572f7ae3def0061",
        image: "./assets/images/HighOnLife.png",
        short: "Contributed to the Nintendo Switch port responsible for tackling deep-level bugs, fixing core gameplay systems, and developing essential tools for the team.",
        long: "I worked with Untold Games on the complex technical challenge of porting 'High on Life' to the Switch. My role quickly evolved beyond general programming to become a go-to resource for the project's most difficult issues, requiring a deep understanding of Unreal Engine's architecture to diagnose and fix problems that manifested uniquely on the target hardware.",
        tools: [
            { name: "Unreal Engine", icon: unrealEngineIconSVG },
            { name: "C++", icon: codeIconSVG },
            { name: "Blueprints", icon: codeIconSVG }
        ],
        cardEngineName: "Unreal Engine",
        projectTags: ['Porting: Switch'],
        myContribution: [
            "<b>As a key game programmer and Tech Designer on the porting team, I was responsible for deep-level debugging, problem-solving, and bugfixing for the Nintendo Switch",
            "<b>Debugging:</b> Investigated and resolved critical bugs, including a C++ division-by-zero error that disabled the entire collision system and a persistent memory leak in the Game Instance caused by a latent Ubergraph reference.",
            "<b>Systems & Gameplay Stabilization:</b> Overhauled the logic for fast-moving actors (dashes, projectiles) using sphere traces to prevent them from passing through objects. Reworked flawed UE4 Remote Event implementations to create a stable, hardcoded alternative that prevented race conditions during level streaming.",
            "<b>Tool & Utility Development:</b> Extended the existing cheat manager and its UI to add essential performance stats. Designed and implemented a multi-iteration lighting tool for a technical artist, enabling rapid, in-editor changes to level lighting configurations."
        ].join('<br><br>'),
    },
    "UEFN: Battleship": {
        id: "UEFN: Battleship",
        title: "UEFN: Battleship",
        category: "professional work",
        published: true,
        year: 2023,
        role: "Lead Creator & Verse Developer",
        context: "Game Developer (me)",
        duration: "1 months (Concept to Launch)",
        video: "https://www.fortnite.com/@untoldgames/1028-2740-2494",
        learnMoreLink: null,
        image: "./assets/images/Battleship.jpeg",
        short: "As the lead creator, I designed and developed this fast-paced strategy game from concept to launch on the Fortnite platform, using Verse for all custom core mechanics.",
        long: "This project involved the complete creation of a multiplayer strategy game from the ground up. I spearheaded the game design, level layout, and player experience, with the challenge of creating the entire battleship custom system within Verse.",
        tools: [
            { name: "UEFN", icon: fortniteIconSVG },
            { name: "Verse", icon: codeIconSVG }
        ],
        cardEngineName: "UEFN",
        myContribution: [
            "<b>Game Design & Vision:</b> Led the complete game design process, defining the core ruleset, win/loss conditions, player progression, and overall gameplay loop.",
            "<b>Core Gameplay Programming (Verse):</b> Developed all primary gameplay systems using Verse, including the interactive combat grid, ship placement logic, and real-time player feedback systems.",
            "<b>Multiplayer & Optimization:</b> Iterated on game balance based on extensive playtesting feedback."
        ].join('<br><br>'),
    },
    "PulseParty": {
        id: "PulseParty",
        title: "PulseParty",
        category: "professional work",
        published: true,
        year: 2023,
        role: "Technical Game Designer & Lead Systems Programmer",
        context: "Untold Games (Team of 3)",
        duration: "1 month",
        video: "https://www.youtube.com/watch?v=CzMTSNYmdYI",
        learnMoreLink: "https://www.fortnite.com/@untoldgames/8369-2685-8749", 
        image: "./assets/images/PulsePartyThumbnail.png", 
        short: "A chaotic party game where the knock-out deathmatch mechanic from PulseMatch was evolved into 8 unique minigames.",
        long: "As a larger scope follow-up to PulseMatch, PulseParty expands the core concept into a full party game experience. Players face off in a series of 8 different competitions, including races, deathmatches, and king of the hill modes. The primary goal remains the same: push your enemies out of the map!",
        tools: [
            { name: "UEFN", icon: fortniteIconSVG, class: "fortnite" }, 
            { name: "Verse", icon: codeIconSVG } 
        ],
        cardEngineName: "UEFN",
        myContribution: [
            "<b>Lead Systems Programmer (Verse):</b> Built the entire party game framework from the ground up, including the expanded hub, the map-switching logic for a sequence of 8 minigames, and a robust game state manager to handle the unique rules for each mode.",
            "<b>Technical Design & Tooling:</b> Supported the other two designers on the team by creating flexible and powerful tools in Verse. This enabled them to rapidly prototype, implement, and balance gameplay mechanics without needing direct programming support.",
            "<b>Playtesting & Iteration:</b> Worked closely with the team to extensively playtest the game, taking direct feedback to refine and stabilize the core systems for the final release."
        ].join('<br><br>'),
    },
    "PulseMatch": {
        id: "PulseMatch",
        title: "PulseMatch",
        category: "professional work",
        published: true,
        year: 2023, 
        role: "Technical Game Designer",
        context: "Untold Games (Team of 3)",
        duration: "1 month",
        video: "https://www.fortnite.com/@untoldgames/9111-6971-7741", 
        isDirectLink: true, 
        learnMoreLink: "https://www.fortnite.com/@untoldgames/9111-6971-7741", 
        image: "./assets/images/PulseMatch.jpeg",
        short: "A competitive deathmatch game based on knock-out mechanics across multiple randomized maps.",
        long: "This project was focused on creating a replayable deathmatch experience where the core gameplay loop is to eliminate opponents by launching them off the stage. My role was a hybrid of level design and systems programming.",
        tools: [
            { name: "UEFN", icon: fortniteIconSVG, class: "fortnite" },
            { name: "Verse", icon: codeIconSVG }
        ],
        cardEngineName: "UEFN",
        myContribution: [
            "<b>Systems Architecture (Verse):</b> Architected and implemented the foundational systems for the game loop, including a robust map-switching framework that moved players between a central hub and randomized combat arenas.",
            "<br><br><b>Level Design & Creation:</b> Designed and built several of the combat arenas, focusing on creating varied layouts that encouraged different player strategies and engagement.",
            "<br><br><b>Core Gameplay (Verse):</b> Developed the hub world logic, allowing players to choose and vote on the next map, ensuring a dynamic and replayable experience."
        ].join('')
    },
    "Alien": {
        id: "Alien",
        title: "Alien (Game Prototype)",
        category: "personal work",
        published: true,
        isFeatured: true,
        year: 2022,
        role: "Sole Creator & Technical Game Designer",
        context: "Personal TGD Prototyping Series",
        duration: "Approx. 2 months",
        video: "https://open.substack.com/pub/giuseppeluigialfieri/p/game-prototypes-alien?r=3ko0h9&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true",
        learnMoreLink: "https://open.substack.com/pub/giuseppeluigialfieri/p/game-prototypes-alien?r=3ko0h9&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true",
        image: "./assets/images/work-5.jpg",
        short: "A reverse-horror prototype inspired by AVP2, focusing on unique movement and possession mechanics designed to empower the player.",
        long: "This project is a love letter to the 2001 classic 'Aliens Versus Predator 2,' aiming to recreate the feeling of being a stealthy and powerful Facehugger. The core design goal was to explore and prototype a set of interconnected mechanics—movement, possession, and environmental interaction—that create emergent, dynamic gameplay scenarios, transforming the player from a vulnerable creature into a formidable predator.",
        tools: [ { name: "Unreal Engine", icon: unrealEngineIconSVG } ],
        cardEngineName: "Unreal Engine",
        myContribution: [
            "<b>System Design - Movement:</b> Designed and implemented a multi-layered movement system. This included a standard jump, a forward-dashing double jump for aggressive repositioning, and a physics-based tentacle grapple. The grapple allows the player to attach to any surface and launch themselves, creating a high-skill-ceiling traversal tool.",
            "<br><br><b>System Design - Possession:</b> Developed the core 'Possession' mechanic from concept to implementation. The player can target enemies with the tentacle and launch into them to take full control of their body, weapons, and abilities. This system was designed to be the central gameplay loop.",
            "<br><br><b>System Design - Emergent Mechanics:</b> Engineered systems that allow for creative gameplay combinations. While possessing a host, the player can still use the alien's tentacles to interact with the world. This allows for emergent strategies like grabbing environmental objects for cover or snatching a second weapon from a fallen enemy to dual-wield.",
            "<br><br><b>Prototyping & Iteration:</b> Rapidly prototyped a sonar/detection system to support stealth gameplay and assembled a test level using free assets to validate the fun and functionality of the combined mechanics in a practical scenario."
        ].join(''),
    },
    "Cycle": {
        id: "Cycle",
        title: "Cycle (Award-Winning)",
        category: "university work",
        published: true,
        isFeatured: true,
        year: 2022,
        role: "Game Director & Lead Systems Designer",
        context: "Award-winning 3rd-year university project (Falmouth University). Selected to represent Falmouth at the G7 Summit 2021.",
        duration: "8 months (Oct 2020 - May 2021)",
        video: "https://youtu.be/Cuwhx4b7tYo", // Trailer
        learnMoreLink: "https://wrong-world-studios.itch.io/cycle", // Itch.io page
        image: "./assets/images/Cycle.png",
        short: "Directed a team of three to create an award-winning surrealist puzzle game. I was solely responsible for all technical implementation, system design, and project management from concept to release.",
        long: "Cycle is a surrealist puzzle-adventure game that won 'Best 3rd Year Videogame' at Falmouth University (2021) and was chosen to represent the university at the G7 Summit. As the game director and only programmer/designer on a team of three, I led the project's vision and was responsible for building every gameplay system from scratch in Unreal Engine, an engine I learned specifically for this project.",
        tools: [ { name: "Unreal Engine", icon: unrealEngineIconSVG } ],
        cardEngineName: "Unreal Engine",
        myContribution: [
            "<b>Game Direction & Project Management:</b> Led the project from pre-production to publishing on Itch.io, managing deadlines, maintaining the core vision, and guiding a team of two artists. My leadership was crucial in navigating production challenges and delivering a polished, award-winning final product.",
            "<br><br><b>Core Systems Architecture:</b> As the sole developer, I designed and implemented all of the game's foundational systems, including:",
            "<ul>"+
            "<li style='margin-left: 20px; margin-top: 5px;'>A central <b>hub-world system</b> that changes dynamically based on player progression.</li>"+
            "<li style='margin-left: 20px; margin-top: 5px;'>A <b>seamless world transition</b> mechanic that teleports the player between levels without loading screens, contributing to the game's surreal feeling.</li>"+
            "<li style='margin-left: 20px; margin-top: 5px;'>A comprehensive <b>progression and collectibles system</b> that tracks player progress and unlocks a final cinematic.</li>"+
            "<li style='margin-left: 20px; margin-top: 5px;'>A dynamic <b>day/night cycle</b> tied directly to the game's narrative phases.</li>"+
            "</ul>",
            "<b>Puzzle & Level Design Implementation:</b> Designed, scripted, and playtested all in-game puzzle mechanics. I was responsible for the technical implementation of all levels, including the intricate 'Coliseum' puzzle and the hub world, translating design concepts into interactive spaces.",
            "<br><br><b>Team & Acknowledgment:</b> This project's success was built on the immense trust and talent of my teammates, Anastasia Petrovitch and Oliver Stone. Their artistic vision was instrumental in creating the game's unique and beautiful atmosphere."
        ].join(''),
    },
    "CardsWeaver": {
        id: "CardsWeaver",
        title: "Card's Weaver",
        category: "university work",
        published: true,
        year: 2023, 
        role: "Lead Game Designer",
        teamSize: "Verona University",
        image: "./assets/images/Card's Weaver.png",
        video: "https://batraf.itch.io/cards-weaver",
        isDirectLink: true,
        learnMoreLink: "https://batraf.itch.io/cards-weaver",
        short: "Card-based game developed at university using Unreal Engine.",
        long: "A university project focusing on card game mechanics and design principles, implemented in Unreal Engine.",
        tools: [ { name: "Unreal Engine", icon: unrealEngineIconSVG } ],
        cardEngineName: "Unreal Engine",
        myContribution: "Led the conceptualization of core game rules and card interactions. Designed the UI/UX for card play and resource management using UMG. Balanced card abilities for engaging gameplay.",
    },
    "SoulDriven": {
        id: "SoulDriven",
        title: "Soul Driven",
        category: "university work",
        published: true,
        year: 2023, 
        role: "Game Developer",
        teamSize: "Verona University",
        image: "./assets/images/work-6.jpg",
        video: "https://fraffer.itch.io/soul-driven",
        isDirectLink: true,
        learnMoreLink: "https://fraffer.itch.io/soul-driven",
        short: "Action game developed as a university project.",
        long: "A university project exploring action game development concepts.",
        tools: [ { name: "Unity", icon: unityIconSVG } ], // Keeping Unity as per original, user did not specify to change this one
        cardEngineName: "Unity",
        myContribution: "Implemented player character controls and combat mechanics. Developed enemy AI patterns and attack sequences. Created particle effects for abilities and impacts.",
    },
    "Covid19Training": {
        id: "Covid19Training",
        title: "Covid 19 Training",
        category: "professional work",
        published: true,
        year: 2021, 
        role: "Game Programmer",
        teamSize: "Cineon Training",
        image: "./assets/images/work-2.jpg",
        video: "https://cineon.training/covid-19-personal-protective-equipment-ppe-training/",
        isDirectLink: true,
        learnMoreLink: "https://cineon.training/covid-19-personal-protective-equipment-ppe-training/",
        short: "VR Training simulation for PPE.",
        long: "Developed PPE training scenarios using VR technology in Unreal Engine.",
        tools: [ { name: "Unreal Engine", icon: unrealEngineIconSVG } ],
        cardEngineName: "Unreal Engine",
        myContribution: "Scripted interaction logic for VR controllers and training objects. Implemented a scenario progression system with feedback mechanisms. Optimized performance for smooth VR experience.",
    },
    "UnrealEngineCourse": {
        id: "UnrealEngineCourse",
        title: "Unreal Engine Course",
        category: "professional work",
        published: true,
        year: 2022, 
        role: "Unreal Engine Tutor",
        teamSize: "Creativity Unleashed",
        image: "./assets/images/work-1.jpg",
        video: "https://www.udemy.com/course/complete-unreal-engine-megacourse-beginner-to-expert/",
        isDirectLink: true,
        learnMoreLink: "https://www.udemy.com/course/complete-unreal-engine-megacourse-beginner-to-expert/",
        short: "Online course for Unreal Engine.",
        long: "A 16-hour course introducing Unreal Engine Blueprints and programming structures.",
        tools: [ { name: "Unreal Engine", icon: unrealEngineIconSVG } ],
        cardEngineName: "Unreal Engine",
        myContribution: "Designed and recorded course modules covering Unreal Engine fundamentals, Blueprints, and common game programming patterns. Created example projects and exercises for students.",
    },
    "MonkHomebrew": {
        id: "MonkHomebrew",
        title: "Monk Homebrew",
        category: "personal work",
        published: true,
        year: 2023, 
        role: "Game Designer",
        teamSize: "Personal Project",
        image: "./assets/images/Monk.png",
        video: "https://drive.google.com/file/d/1cyUGRzfhP4CjVwDljmbiXhwORSPAUSpp/view?usp=sharing",
        isDirectLink: true,
        learnMoreLink: "https://drive.google.com/file/d/1cyUGRzfhP4CjVwDljmbiXhwORSPAUSpp/view?usp=sharing",
        short: "D&D Homebrew content for the Monk class.",
        long: "Personal game design project creating new options for D&D.",
        tools: [],
        cardEngineName: "Tabletop", 
        myContribution: "Designed new subclasses and abilities for the D&D Monk class, focusing on thematic cohesion and mechanical balance. Formatted content for community sharing.",
    },
    "SyovaraHomebrew": {
        id: "SyovaraHomebrew",
        title: "Syovara Homebrew",
        category: "personal work",
        published: true,
        year: 2023, 
        role: "Game Designer",
        teamSize: "Personal Project",
        image: "./assets/images/Syovara.jpg",
        video: "https://aminoapps.com/c/officialdd/page/item/syovara/eYNM_3qQT6IK3r02BM0LpLXwL0x51XeEbEb",
        isDirectLink: true,
        learnMoreLink: "https://aminoapps.com/c/officialdd/page/item/syovara/eYNM_3qQT6IK3r02BM0LpLXwL0x51XeEbEb",
        short: "D&D Homebrew setting/content.",
        long: "A personal world-building and game design project for D&D.",
        tools: [],
        cardEngineName: "Tabletop",
        myContribution: "Developed lore, cultures, and unique mechanics for a custom D&D setting. Created new player options and monster stat blocks tailored to the world.",
    },
    "MaGiTeProject": {
        id: "MaGiTeProject",
        title: "MaGiTe Project",
        category: "professional work",
        published: false,
        year: 2025, 
        role: "Game Developer",
        teamSize: "Umeå University",
        image: "./assets/images/Umeå_University_Resized.png",
        video: "#", 
        learnMoreLink: null,
        short: "Research project collaboration using Unreal Engine.",
        long: "Contributed to the MaGiTe research project, focusing on gameplay prototyping for educational modules within Unreal Engine.",
        tools: [{ name: "Unreal Engine", icon: unrealEngineIconSVG }], 
        cardEngineName: "Unreal Engine", 
        myContribution: "Developed interactive prototypes and simulations for educational content using Unreal Engine Blueprints and C++.",
    },
    "ProjectCenturion": {
        id: "ProjectCenturion",
        title: "Project Centurion",
        category: "university work",
        published: true,
        year: 2020, 
        role: "Game Designer & Developer",
        teamSize: "University Project",
        image: "./assets/images/work-4.jpg",
        video: "https://drive.google.com/file/d/1kqrXXSPwxUrCUG9qNnqnNzSuWa9S9QJv/view?usp=sharing",
        isDirectLink: true,
        learnMoreLink: "https://drive.google.com/file/d/1kqrXXSPwxUrCUG9qNnqnNzSuWa9S9QJv/view?usp=sharing",
        short: "University game project with a historical theme.",
        long: "A game developed as part of university studies, focusing on design and development.",
        tools: [ { name: "Unity", icon: unityIconSVG } ],
        cardEngineName: "Unity",
        myContribution: "Co-designed core gameplay loop and level structure. Implemented player movement and interaction systems using Unity and C#.",
    },
    "FallingFusion": {
        id: "FallingFusion",
        title: "Falling Fusion",
        category: "game jams",
        published: true,
        year: 2022, 
        role: "Game Designer & Developer",
        teamSize: "Game Jam Team",
        image: "./assets/images/work-8.jpg",
        video: "https://jonny5959.itch.io/falling-fusion",
        isDirectLink: true,
        learnMoreLink: "https://jonny5959.itch.io/falling-fusion",
        short: "Game Jam entry with a fusion mechanic, developed in Unreal Engine.",
        long: "A rapidly developed game for a game jam, focusing on core mechanics using Unreal Engine.",
        tools: [ { name: "Unreal Engine", icon: unrealEngineIconSVG } ],
        cardEngineName: "Unreal Engine",
        myContribution: "Designed the core 'fusion' mechanic and implemented it in Unreal Engine using Blueprints. Created procedurally generated level segments for replayability during the jam.",
    },
     "NickelNinja": {
        id: "NickelNinja",
        title: "Nickel Ninja",
        category: "game jams",
        published: true,
        year: 2023, 
        role: "Game Designer & Developer",
        teamSize: "Game Jam Team",
        image: "./assets/images/work-7.jpg",
        video: "https://v3.globalgamejam.org/2022/games/nickel-ninja-3",
        isDirectLink: true,
        learnMoreLink: "https://v3.globalgamejam.org/2022/games/nickel-ninja-3",
        short: "Global Game Jam 2022 entry.",
        long: "A game created during the Global Game Jam 2022.",
        tools: [ { name: "Unity", icon: unityIconSVG } ],
        cardEngineName: "Unity",
        myContribution: "Contributed to level design and character ability scripting. Collaborated on art asset integration and bug fixing under tight deadlines.",
    }
};

// NEW: Define which projects go into which "About" page section
const professionalWorkIds = ["HighOnLife", "PoliceSimulator"];
const techDesignWorkIds = [
    "ProjectCadence",
    "FullCppMechGame",
    "TheLibrary",
    "Alien",
    "Cycle"
];


// Helper function to create a project list item
const createProjectListItem = (project) => {
    const listItem = document.createElement('li');
    // Add the "featured" class if the project is marked as such
    const itemClass = project.isFeatured ? 'project-item project-item-featured active' : 'project-item active';
    listItem.className = itemClass;
    listItem.dataset.category = project.category;

    const link = document.createElement('a');
    link.dataset.project = project.id;

    if (project.isDirectLink) {
        link.href = project.video || "#";
        link.target = "_blank";
        link.rel = "noopener noreferrer";
    } else {
        link.href = "#";
        link.classList.add('open-modal');
    }

    const figure = document.createElement('figure');
    figure.className = 'project-img';

    if (project.category) {
        const categoryTagContainer = document.createElement('div');
        categoryTagContainer.className = 'project-category-tag-container';
        const categoryTag = document.createElement('div');
        const categoryClassName = project.category.toLowerCase().replace(/\s+/g, '-'); 
        let categoryText = project.category.replace(' work', '').replace(' jams', ' Jam');
        categoryText = categoryText.charAt(0).toUpperCase() + categoryText.slice(1);
        const fullCategoryTitle = project.category.replace(/\b\w/g, l => l.toUpperCase());
        categoryTag.className = `project-card-tag category-badge ${categoryClassName}-badge`;
        categoryTag.textContent = categoryText;
        categoryTag.title = fullCategoryTitle;
        categoryTagContainer.appendChild(categoryTag);
        figure.appendChild(categoryTagContainer);
    }
    
    if (!project.isDirectLink) {
        const iconBox = document.createElement('div');
        iconBox.className = 'project-item-icon-box';
        const ionIcon = document.createElement('ion-icon');
        ionIcon.name = 'eye-outline';
        iconBox.appendChild(ionIcon);
        figure.appendChild(iconBox);
    }

    const img = document.createElement('img');
    img.src = project.image || './assets/images/placeholder.png';
    img.alt = project.title;
    img.loading = 'lazy';
    figure.appendChild(img);

    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'project-tags-container';
    if (project.cardEngineName && project.cardEngineName !== "N/A") {
        const engineBadge = document.createElement('div');
        let badgeText = project.cardEngineName;
        let badgeClass = '';
        const cardEngineLower = project.cardEngineName.toLowerCase();

        if (cardEngineLower.includes("unreal")) { badgeText = "Unreal"; badgeClass = "unreal-engine-badge"; } 
        else if (cardEngineLower.includes("unity")) { badgeText = "Unity"; badgeClass = "unity-engine-badge"; } 
        else if (cardEngineLower.includes("uefn")) { badgeText = "UEFN"; badgeClass = "uefn-badge"; } 
        else if (cardEngineLower === "tabletop") { badgeText = "Game Design"; badgeClass = "game-design-badge"; }
        
        if (badgeClass) {
            engineBadge.className = `project-card-tag ${badgeClass}`;
            engineBadge.textContent = badgeText;
            engineBadge.title = project.cardEngineName;
            tagsContainer.appendChild(engineBadge);
        }
    }
    if (project.projectTags && Array.isArray(project.projectTags)) {
        project.projectTags.forEach(tagText => {
            const tagElement = document.createElement('div');
            tagElement.className = 'project-card-tag';
            tagElement.textContent = tagText;
            tagsContainer.appendChild(tagElement);
        });
    }
    if (tagsContainer.hasChildNodes()) {
        figure.appendChild(tagsContainer);
    }
    link.appendChild(figure);

    // Create a container for text content to handle featured layout
    const textContentDiv = document.createElement('div');
    textContentDiv.className = 'project-text-content';

    const titleH3 = document.createElement('h3');
    titleH3.className = 'project-title';
    titleH3.textContent = project.title;
    textContentDiv.appendChild(titleH3);

    const categoryP = document.createElement('p');
    categoryP.className = 'project-category';
    // For featured cards, show the short description instead of the role
    categoryP.textContent = project.isFeatured ? project.short : (project.role || 'N/A');
    textContentDiv.appendChild(categoryP);
    
    link.appendChild(textContentDiv);
    listItem.appendChild(link);
    return listItem;
};

// NEW: Function to render specific project lists into a target element
const renderProjectList = (targetElement, projectIds) => {
    if (!targetElement) {
        // Silently fail if the element isn't on the current page
        return;
    }
    targetElement.innerHTML = '';
    projectIds.forEach(projectId => {
        const project = projectDetails[projectId];
        // MODIFIED: Only render if project exists AND is published
        if (project && project.published) {
            const listItem = createProjectListItem(project);
            targetElement.appendChild(listItem);
        } else if (!project) {
            console.warn(`Project details not found for project ID: ${projectId}`);
        }
    });
};

const renderPortfolio = (filterCategory) => {
    if (!portfolioGridContainer) return;
    portfolioGridContainer.innerHTML = ''; 
    const projectsArray = Object.values(projectDetails);

    // MODIFIED: Filter out unpublished projects first
    const publishedProjects = projectsArray.filter(project => project.published);

    const filteredProjects = publishedProjects.filter(project => 
        filterCategory === 'all' || (project.category && project.category.toLowerCase() === filterCategory.toLowerCase())
    );
    if (filteredProjects.length === 0) {
        portfolioGridContainer.innerHTML = `<p class="no-projects-message">No projects found for the "${filterCategory.replace(/\b\w/g, l => l.toUpperCase())}" category.</p>`;
        return;
    }
    const projectsByYear = filteredProjects.reduce((acc, project) => {
        const year = project.year || "Uncategorized"; 
        if (!acc[year]) acc[year] = [];
        acc[year].push(project);
        return acc;
    }, {});
    const sortedYears = Object.keys(projectsByYear).sort((a, b) => {
        if (a === "Uncategorized") return 1; 
        if (b === "Uncategorized") return -1;
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
            const listItem = createProjectListItem(project);
            projectListUl.appendChild(listItem);
        });
        portfolioGridContainer.appendChild(projectListUl);
    });
};

const projectModal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

function openProjectModal(projectId) {
    const data = projectDetails[projectId];
    if (!data) {
        console.error("Project data not found for:", projectId);
        if (modalBody) modalBody.innerHTML = `<p>Details for this project are not available.</p>`;
        if (projectModal) projectModal.classList.add('active');
        document.body.classList.add('no-scroll');
        return;
    }
    const hasVideo = data.video && data.video !== "#" && (data.video.startsWith("http://") || data.video.startsWith("https://"));
    const mediaClass = hasVideo ? 'modal-media media-with-video' : 'modal-media';
    let mediaContentHtml = '';
    if (data.image) {
        if (hasVideo) { mediaContentHtml = `<a href="${data.video}" target="_blank" rel="noopener noreferrer"><img src="${data.image}" alt="${data.title}"></a>`; } 
        else { mediaContentHtml = `<img src="${data.image}" alt="${data.title}">`; }
    } else if (hasVideo) {
        mediaContentHtml = `<p><a href="${data.video}" target="_blank" rel="noopener noreferrer">Watch Video / More Info</a> (Preview image not available)</p>`;
    } else {
        mediaContentHtml = `<p>No media available for this project.</p>`;
    }
    const toolIconsHtml = data.tools && data.tools.length > 0 ? data.tools.map(tool => {
        let iconHtml = '';
        if (tool.icon) { iconHtml = tool.icon; }
        return `<span class="tool-item" title="${tool.name || ''}">
                    ${iconHtml ? `<span class="tool-icon ${tool.class || ''}">${iconHtml}</span>` : ''}
                    <span class="tool-name">${tool.name || ''}</span>
                </span>`;
    }).join('') : '<p>N/A</p>';
    let learnMoreButtonHTML = '';
    if (data.learnMoreLink && data.learnMoreLink !== "#") {
        learnMoreButtonHTML = `
            <div class="modal-learn-more">
                <a href="${data.learnMoreLink}" target="_blank" rel="noopener noreferrer" class="form-btn">
                    <ion-icon name="link-outline"></ion-icon>
                    <span>Learn More</span>
                </a>
            </div>`;
    }
    if(modalBody) {
    modalBody.innerHTML = `
        <div class="modal-header"><h3>${data.title}</h3></div>
        <div class="modal-grid">
            <div class="${mediaClass}">${mediaContentHtml}</div>
            <div class="modal-details">
                <div class="detail-item"><h4>Role:</h4><p>${data.role || 'N/A'}</p></div>
                ${data.context ? `<div class="detail-item"><h4>Context:</h4><p>${data.context}</p></div>` : ''}
                ${data.duration ? `<div class="detail-item"><h4>Duration:</h4><p>${data.duration}</p></div>` : ''}
                <div class="tools-section detail-item"><h4>Key Technologies:</h4>
                    <div class="tool-list"> 
                        ${toolIconsHtml}
                    </div>
                </div>
                ${learnMoreButtonHTML}
            </div>
        </div>
        <div class="modal-fulltext">
            <div class="detail-item">
                <h4>Project Overview:</h4>
                <p>${data.short || 'No overview available.'}</p>
                ${data.long && data.long !== data.short ? `<p style="margin-top: 0.5em;">${data.long}</p>` : ''}
            </div>
            <div class="detail-item">
                <h4>My Key Contributions:</h4>
                <div>${data.myContribution || 'Details not specified.'}</div>
            </div>
        </div>
    `;
}
    if (projectModal) projectModal.classList.add('active');
    document.body.classList.add('no-scroll');
}

// Event Delegation for MAIN PORTFOLIO and NEW ABOUT sections
document.body.addEventListener('click', function(e) {
    const clickedLink = e.target.closest('a.open-modal');
    if (clickedLink && !clickedLink.hasAttribute('target')) { 
        e.preventDefault();
        const projectId = clickedLink.dataset.project;
        openProjectModal(projectId);
    }
});

if (modalClose) {
    modalClose.addEventListener('click', () => {
        if (projectModal) projectModal.classList.remove('active');
        document.body.classList.remove('no-scroll'); 
        if (modalBody) modalBody.innerHTML = ''; 
    });
}
if (projectModal) {
    projectModal.addEventListener('click', e => {
        if (e.target === projectModal) { 
            projectModal.classList.remove('active');
            document.body.classList.remove('no-scroll'); 
            if (modalBody) modalBody.innerHTML = ''; 
        }
    });
}

// Renders content on initial page load
document.addEventListener('DOMContentLoaded', () => {
    // Render the new "About" page sections
    renderProjectList(professionalWorkUl, professionalWorkIds);
    renderProjectList(techDesignWorkUl, techDesignWorkIds);
    
    // Initial render for portfolio page
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
          // If navigating to 'about', ensure the sections are rendered
          if (targetPage === 'about') {
            renderProjectList(professionalWorkUl, professionalWorkIds);
            renderProjectList(techDesignWorkUl, techDesignWorkIds);
          }
          // If navigating to portfolio, ensure it renders correctly
          if (targetPage === 'portfolio') { 
            const currentFilter = selectValue ? selectValue.innerText.toLowerCase() : 'all';
            renderPortfolio(currentFilter);
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