'use strict';

// ==========================================
// 1. THE MASSIVE PROJECT DATABASE (All 22 Projects Restored)
// ==========================================
const fortniteIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.86 6.71l-1.72 1.72c-.19-.25-.43-.46-.72-.62l.98-2.35c.13-.32.02-.69-.27-.84s-.69-.02-.84.27l-.98 2.35c-.3-.09-.61-.13-.93-.13s-.63.04-.93.13l-.98-2.35c-.13-.32-.51-.45-.84-.27s-.45.51-.27.84l.98 2.35c-.29.16-.53.37-.72.62l-1.72-1.72c-.26-.26-.71-.23-.94.03s-.23.71.03.94l1.72 1.72c-.16.29-.27.6-.31.93H5.5c-.39 0-.7.31-.7.7s.31.7.7.7h2.35c.04.33.15.64.31.93l-1.72 1.72c-.26.26-.29.71-.03.94s.71.29.94.03l1.72-1.72c.25.19.54.33.85.42V17.5c0 .39.31.7.7.7s.7-.31.7-.7v-2.35c.3-.09.59-.23.85-.42l1.72 1.72c.26.26.71.23.94-.03s-.23-.71-.03-.94l-1.72-1.72c.16-.29.27.6.31-.93h2.35c.39 0 .7-.31-.7-.7s-.31-.7-.7-.7H14.8c-.04-.33-.15-.64-.31-.93l1.72-1.72c.26-.26.29-.71.03-.94s-.71-.29-.94-.03zM12 13.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>`; 
const verseIconSVG = `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9V7h2v10zm4 0h-2V7h2v10z"/></svg>`; 
const unrealEngineIconSVG = `<svg viewBox="0 0 210.4 210.4" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M105.2 5c55.3 0 100.2 45 100.2 100.2s-45 100.2-100.2 100.2S5 160.5 5 105.2 50 5 105.2 5m0-5C47.1 0 0 47.1 0 105.2s47.1 105.2 105.2 105.2 105.2-47.1 105.2-105.2S163.4 0 105.2 0z"/><path d="M97.9 42.2s-23.7 6.7-45 29.3-24 38.7-24 50.7c4.7-8 33.7-52.1 40.5-31.1v50.2s-.4 6.8-10.8 4.1c3.1 5.8 19.1 20.1 48 23 6.6-6.6 15.2-16.1 15.2-16.1l14.4 12.2s25.9-16.8 36.1-41.2c-9.5 6.2-21 20.6-27 10.5V72.7s15.4-23.1 17.8-24.2c-6.1 1.1-27.6 8.2-38.9 22.8-3.2-3.5-12.1-3.6-12.1-3.6s7 5.8 7.1 11.1 0 49.5 0 54.6c-4.8 4.9-9.9 7.5-13.2 7.5-7.7 0-9.9-2.7-12-5.4V71.3s-3.8 3.2-6.8-2S84.1 54 97.9 42.2z"/></svg>`;
const unityIconSVG = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M12.012 2.5a.708.708 0 00-.702.714v17.572a.71.71 0 00.702.714.715.715 0 00.708-.714V3.214a.71.71 0 00-.708-.714zm6.445 3.174l-5.07 2.927v8.788l5.07 2.937a.71.71 0 001.058-.616V6.29a.71.71 0 00-1.058-.616zm-12.896 0a.71.71 0 00-1.058.616v11.422a.71.71 0 001.058.616l5.07-2.937V8.601l-5.07-2.927zM11.304.002A.71.71 0 0010.59.61L3.41 4.66a.71.71 0 00-.352.617V18.72a.71.71 0 00.352.616L10.59 23.39a.714.714 0 00.708 0l7.18-4.056a.71.71 0 00.352-.616V5.277a.71.71 0 00-.352-.617L11.304 0z"/></svg>`; 
const codeIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`;

const projectDetails = {
    "ProjectCadence": {
        id: "ProjectCadence",
        title: "Project: Cadence",
        category: "personal work",
        published: true,
        roles:["Technical Game Designer", "Game Designer"],
        year: 2025,
        role: "Sole Systems Architect",
        image: "./assets/images/ProjectCadence.png",
        video: "https://www.youtube.com/watch?v=GeYIX1rnFPA",
        short: "A C++ Unreal Engine plugin that uses Metasound to drive rhythm-based gameplay events.",
        long: "Project Cadence started from a question on a bus: could osu beatmap timestamps actually drive gameplay events in Unreal Engine? The answer is the plugin. A C++ timeline driven by Metasound, separating timing data from behavior so the same beatmap can power completely different game genres.",
        tools:[ { name: "Unreal Engine", icon: unrealEngineIconSVG }, { name: "C++", icon: codeIconSVG }, { name: "Metasound", icon: codeIconSVG } ],
        cardEngineName: "Unreal Engine",
        roleContributions: {
            "Game Designer": "<p><b>Design Philosophy:</b> Designed the system around one principle: music should drive gameplay, not accompany it. Timing data and behavior are separated entirely.</p>",
            "Technical Game Designer": "<p><b>Core Architecture:</b> C++ timeline driven by Metasound. Python parser extracts osu beatmap data into DataTables. Lightweight UObjects manage note states instead of Actors, avoiding spawn overhead for thousands of concurrent events.</p>"
        }
    },
    "ProjectSasha": {
        id: "ProjectSasha",
        title: "Project: Sasha",
        category: "personal work",
        published: true,
        roles: ["Game Designer", "Technical Game Designer"],
        year: 2025,
        role: "Sole Creator",
        image: "./assets/images/ProjectSasha.svg",
        videos: [
            { label: "SCAN.LOG_1", file: "./assets/videos/Sasha SonarVersion 0.3.mp4" },
            { label: "MEM.LOG_1", file: "./assets/videos/Sasha Memory system 0.1.mp4" }
        ],
        short: "A top-down exploration game where scanning IS the entire game. Knowledge is the resource, memory is the currency.",
        long: "Project Sasha is built around a single mechanic—scanning—that drives exploration, combat, and progression. You control an android navigating a brutalist megastructure. There is no traditional inventory; everything you carry, know, or use is data stored in a finite memory budget.",
        tools:[ { name: "Unreal Engine", icon: unrealEngineIconSVG }, { name: "C++", icon: codeIconSVG } ],
        cardEngineName: "Unreal Engine",
        roleContributions: {
            "Game Designer": "<p><b>Systemic Narrative:</b> Designed a cohesive economy where knowledge is the resource. It took a month of heavy iteration to unify exploration, combat, and progression under a single 'Megabyte' budget.</p>",
            "Technical Game Designer": "<p><b>Scanning Algorithms:</b> Built the core scanning mechanic using BFS Waves constrained by radius, creating an organic flood-fill effect rather than a cheap, instant radial reveal.</p>"
        }
    },
    "ProjectCircle": {
        id: "ProjectCircle",
        title: "Project: Circle",
        category: "personal work",
        published: true,
        roles:["Technical Game Designer"],
        year: 2025,
        role: "Technical Game Designer",
        image: "./assets/images/ProjectCircle.svg",
        short: "A rhythm bullet hell FPS built on the Cadence plugin. You race inside a hollow sphere while a giant boss shoots at you in sync with the music.",
        tools:[ { name: "Unreal Engine", icon: unrealEngineIconSVG }, { name: "C++", icon: codeIconSVG } ],
        cardEngineName: "Unreal Engine",
        roleContributions: {
            "Technical Game Designer": "<p><b>Framework Validation:</b> Built a fully functional 3D bullet hell prototype on the Cadence C++ framework, syncing complex enemy attack patterns and projectile spawns entirely to Metasound data.</p>"
        }
    },
    "CRTexe": {
        id: "CRTexe",
        title: "CRT.exe",
        category: "game jams",
        published: true,
        roles: ["Leadership", "Game Designer"],
        year: 2026,
        role: "Project Lead",
        image: "./assets/images/CRTexe.svg",
        short: "Led a team of 8 through a game jam by designing the game around how the team could actually function. One person, one area, no dependencies.",
        links: [{"label":"Play on itch.io","icon":"fas fa-gamepad","url":"https://gianluca-iacchini.itch.io/crt-exe"}],
        tools:[ { name: "Godot", icon: codeIconSVG } ],
        cardEngineName: "Godot",
        roleContributions: {
            "Leadership": "<p><b>Team Structure:</b> Diagnosed what would make this specific team functional and built the production structure around it. Each person owned one area completely.</p>"
        }
    },
    "PoliceSimulator": {
        id: "PoliceSimulator",
        title: "Police Simulator",
        category: "professional work",
        published: true,
        roles:["Game Programmer", "Technical Game Designer"],
        year: 2024,
        role: "Game Programmer",
        video: "https://www.youtube.com/watch?v=fL2SOhYZ6k8",
        image: "./assets/images/PoliceSimulator.png",
        short: "Nintendo Switch port responsible for tackling deep-level bugs and developing tools.",
        tools:[ { name: "Unreal Engine", icon: unrealEngineIconSVG }, { name: "C++", icon: codeIconSVG } ],
        cardEngineName: "Unreal Engine",
        roleContributions: {
            "Game Programmer": "<p>Overhauled the Switch input system, fixed critical bugs related to level loading and stability.</p>",
            "Technical Game Designer": "<p>Designed and implemented a full-featured debug cheat menu from scratch using ImGui.</p>"
        }
    },
    "HighOnLife": {
        id: "HighOnLife",
        title: "High on Life",
        category: "professional work",
        published: true,
        roles:["Game Programmer", "Technical Game Designer"],
        year: 2025,
        role: "Game Programmer",
        video: "https://www.youtube.com/watch?v=qk2y4clYe9o",
        image: "./assets/images/HighOnLife.png",
        short: "Nintendo Switch port of High on Life. Deep C++ and Blueprint debugging, internal tooling built from scratch.",
        links: [{"label":"Classified / Request Access","icon":"fas fa-lock","url":"request"}],
        tools:[ { name: "Unreal Engine", icon: unrealEngineIconSVG }, { name: "C++", icon: codeIconSVG } ],
        cardEngineName: "Unreal Engine",
        roleContributions: {
            "Game Programmer": "<p>Fixed critical C++ and Blueprint bugs — division by zero killing the collision matrix, Ubergraph memory leaks in the Game Instance.</p>",
            "Technical Game Designer": "<p>Extended the cheat manager UI with Switch performance monitoring stats. Designed a complex lighting configuration system for tech artists.</p>"
        }
    },
    "UEFNBattleship": {
        id: "UEFNBattleship",
        title: "UEFN: Battleship",
        category: "professional work",
        published: true,
        roles: ["Technical Game Designer", "Game Designer"],
        year: 2023,
        role: "Lead Creator & Verse Developer",
        image: "./assets/images/Battleship.jpeg",
        short: "Fast-paced strategy game from concept to launch on Fortnite.",
        links: [{"label":"Play on Fortnite","icon":"fas fa-gamepad","url":"https://www.fortnite.com/@untoldgames/1028-2740-2494"}],
        tools:[ { name: "UEFN", icon: fortniteIconSVG }, { name: "Verse", icon: verseIconSVG } ],
        cardEngineName: "UEFN",
        roleContributions: {
            "Technical Game Designer": "<p>Developed all primary gameplay systems using Verse — interactive combat grid, ship placement logic, and real-time player feedback systems.</p>"
        }
    },
    "PulseParty": {
        id: "PulseParty",
        title: "PulseParty",
        category: "professional work",
        published: true,
        roles: ["Technical Game Designer", "Game Designer"],
        year: 2023,
        video: "https://www.youtube.com/watch?v=CzMTSNYmdYI",
        image: "./assets/images/PulsePartyThumbnail.png", 
        short: "A chaotic party game with 8 unique minigames built in Verse.",
        links: [{"label":"Play on Fortnite","icon":"fas fa-gamepad","url":"https://www.fortnite.com/@untoldgames/8369-2685-8749"}],
        tools:[ { name: "UEFN", icon: fortniteIconSVG }, { name: "Verse", icon: verseIconSVG } ],
        cardEngineName: "UEFN",
        roleContributions: {
            "Technical Game Designer": "<p>Built the entire party game framework from the ground up in Verse — hub system, map-switching logic for 8 minigames, and a robust game state manager.</p>"
        }
    },
    "Cycle": {
        id: "Cycle",
        title: "Cycle",
        category: "university work",
        published: true,
        roles: ["Leadership", "Game Designer", "Game Programmer"],
        year: 2021,
        role: "Game Director, Sole Programmer",
        video: "https://youtu.be/Cuwhx4b7tYo",
        image: "./assets/images/Cycle.png",
        short: "Best 3rd Year Videogame at Falmouth University 2021. Built by a team of 3. I had never used Unreal Engine before this project.",
        links: [
            {"label":"Play on itch.io","icon":"fas fa-gamepad","url":"https://wrong-world-studios.itch.io/cycle"},
            {"label":"View on The Rookies","icon":"fas fa-trophy","url":"https://www.therookies.co/entries/13406"},
            {"label":"View on GitHub","icon":"fab fa-github","url":"https://github.com/VarXael/Cycle"}
        ],
        tools:[ { name: "Unreal Engine", icon: unrealEngineIconSVG } ],
        cardEngineName: "Unreal Engine",
        roleContributions: {
            "Game Programmer": "<p>Built every system in Unreal Engine 4 from scratch. Hub world progression, seamless level transitions the player never consciously notices.</p>"
        }
    },
    "Alien": {
        id: "Alien",
        title: "Alien (Prototype)",
        category: "personal work",
        published: true,
        roles: ["Technical Game Designer", "Game Designer"],
        year: 2022,
        image: "./assets/images/work-5.jpg",
        short: "A reverse-horror prototype focusing on unique movement and possession mechanics.",
        links: [{"label":"Read on Substack","icon":"fas fa-file-alt","url":"https://open.substack.com/pub/giuseppeluigialfieri/p/game-prototypes-alien?r=3ko0h9&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true"}],
        tools: [ { name: "Unreal Engine", icon: unrealEngineIconSVG } ],
        cardEngineName: "Unreal Engine",
        roleContributions: {
            "Technical Game Designer": "<p>Designed and implemented a powerful movement system including a standard jump, forward-dashing double jump, and a tentacle grapple ability.</p>"
        }
    },
    "CardsWeaver": {
        id: "CardsWeaver",
        title: "Card's Weaver",
        category: "university work",
        published: true,
        roles:["Leadership", "Game Designer"],
        year: 2023, 
        image: "./assets/images/Card's Weaver.png",
        short: "Card-based game developed at university using Unreal Engine.",
        links: [{"label":"Play on itch.io","icon":"fas fa-gamepad","url":"https://batraf.itch.io/cards-weaver"}],
        tools:[ { name: "Unreal Engine", icon: unrealEngineIconSVG } ],
        cardEngineName: "Unreal Engine",
        roleContributions: {
            "Game Designer": "<p>Designed the game's core systems including card abilities, the central resource mechanic, and the overall gameplay loop.</p>"
        }
    },
    "SoulDriven": {
        id: "SoulDriven",
        title: "Soul Driven",
        category: "university work",
        published: true,
        roles: ["Game Programmer", "Technical Game Designer"],
        year: 2023,
        role: "Systems Programmer",
        image: "./assets/images/work-6.jpg",
        short: "Built the entire character class-switching system using the Strategy design pattern.",
        links: [
            {"label":"Play on itch.io","icon":"fas fa-gamepad","url":"https://fraffer.itch.io/soul-driven"},
            {"label":"View on GitLab","icon":"fab fa-gitlab","url":"https://gitlab.com/Pietro92/soul-driven-project"}
        ],
        tools:[ { name: "Unity", icon: unityIconSVG } ],
        cardEngineName: "Unity",
        roleContributions: {
            "Technical Game Designer": "<p>Designed the class-switching system around the Strategy pattern so Soul classes were hot-swappable at runtime without conditional logic.</p>"
        }
    },
    "Covid19Training": {
        id: "Covid19Training",
        title: "Covid 19 VR Training",
        category: "professional work",
        published: true,
        roles:["Game Programmer"],
        year: 2021, 
        image: "./assets/images/work-2.jpg",
        short: "VR Training simulation for PPE in Unreal Engine.",
        links: [{"label":"View Project","icon":"fas fa-link","url":"https://cineon.training/covid-19-personal-protective-equipment-ppe-training/"}],
        tools:[ { name: "Unreal Engine", icon: unrealEngineIconSVG } ],
        cardEngineName: "Unreal Engine",
        roleContributions: {
            "Game Programmer": "<p>Scripted interaction logic for VR controllers and training objects. Implemented a scenario progression system with feedback mechanisms.</p>"
        }
    },
    "UnrealEngineCourse": {
        id: "UnrealEngineCourse",
        title: "Unreal Engine Course",
        category: "professional work",
        published: true,
        roles: ["Game Programmer", "Technical Game Designer"], 
        year: 2022, 
        image: "./assets/images/work-1.jpg",
        short: "A 16-hour course introducing Unreal Engine Blueprints and programming structures.",
        links: [{"label":"View on Udemy","icon":"fas fa-graduation-cap","url":"https://www.udemy.com/course/complete-unreal-engine-megacourse-beginner-to-expert/"}],
        tools:[ { name: "Unreal Engine", icon: unrealEngineIconSVG } ],
        cardEngineName: "Unreal Engine",
        roleContributions: {
            "Technical Game Designer": "<p>Designed and recorded course modules covering Unreal Engine fundamentals, Blueprints, and common game programming patterns.</p>"
        }
    },
    "MonkHomebrew": {
        id: "MonkHomebrew",
        title: "Monk Homebrew",
        category: "personal work",
        published: true,
        roles: ["Game Designer"],
        year: 2023,
        image: "./assets/images/Monk.png",
        short: "Rebuilt the D&D Monk class from scratch around a new core mechanic: Vessels of Ki.",
        links: [{"label":"Download PDF","icon":"fas fa-file-pdf","url":"https://drive.google.com/file/d/1cyUGRzfhP4CjVwDljmbiXhwORSPAUSpp/view?usp=sharing"}],
        tools:[],
        cardEngineName: "Tabletop",
        roleContributions: {
            "Game Designer": "<p>Designed the Vessels of Ki system from scratch — creation, filling, bonding, sacrifice mechanics, replacing the original ki point usage model.</p>"
        }
    },
    "FullCppMechGame": {
        id: "FullCppMechGame",
        title: "Mecha Grid",
        category: "personal work",
        published: true,
        roles:["Technical Game Designer", "Game Programmer"],
        year: 2024,
        role: "Sole Creator",
        image: "./assets/images/work-5.jpg", 
        short: "A 1v1 turn-based strategy game built strictly in C++ to prove a point.",
        links: [{"label":"View on GitHub","icon":"fab fa-github","url":"https://github.com/VarXael/MechaTopDown"}],
        tools:[ { name: "Unreal Engine", icon: unrealEngineIconSVG }, { name: "C++", icon: codeIconSVG } ],
        cardEngineName: "Unreal Engine",
        roleContributions: {
            "Game Programmer": "<p>Built the entire project without Blueprints. Engineered the grid-based movement and pathfinding (implementing DFS algorithms).</p>"
        }
    },
    "TheLibrary": {
        id: "TheLibrary",
        title: "The Library",
        category: "personal work",
        published: true, 
        roles:["Technical Game Designer"],
        year: 2023,
        image: "./assets/images/work-5.jpg",
        short: "A prototype for a Papers, Please-style management game, blind-coded in a 12-hour sprint.",
        links: [{"label":"View on GitHub","icon":"fab fa-github","url":"https://github.com/VarXael/LibraryProject"}],
        tools:[ { name: "Unreal Engine", icon: unrealEngineIconSVG }, { name: "Blueprints", icon: codeIconSVG } ],
        cardEngineName: "Unreal Engine",
        roleContributions: {
            "Technical Game Designer": "<p>Built a dynamic spawner that reads book dimensions from Data Tables and uses math to perfectly pack them along a defined spline path.</p>"
        }
    }
};

const professionalWorkIds = ["HighOnLife", "PoliceSimulator"];
const techDesignWorkIds = ["ProjectSasha", "ProjectCadence", "ProjectCircle", "Alien", "Cycle"];

const ROLE_ORDER =["Game Designer", "Technical Game Designer", "Leadership", "Game Programmer"];
const sortRoles = (roles) => {
    if (!roles) return[];
    return [...roles].sort((a, b) => {
        const ia = ROLE_ORDER.indexOf(a);
        const ib = ROLE_ORDER.indexOf(b);
        return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    });
};

const roleDefinitions = {
    "Game Designer": { title: "Game Designer", tagClass: "role-tag", description: "I think in systems. I design interconnected mechanics where every piece has a reason to exist and every decision creates consequence." },
    "Technical Game Designer": { title: "Technical Game Designer", tagClass: "role-tag", description: "Everything I design, I also implement. If this tag is on a project, I created the design AND built it in engine." },
    "Leadership": { title: "Leadership", tagClass: "role-tag", description: "I bring teams together and drive the vision from concept to ship. On these projects, I was the person people looked to for direction." },
    "Game Programmer": { title: "Game Programmer", tagClass: "role-tag", description: "I write production code — C++, Blueprints, Verse. On these projects, I implemented systems within an existing design or codebase." }
};


// ==========================================
// 2. THE ONE-WAY GATE LOGIC (INTRO) & THEME TOGGLE
// ==========================================
document.addEventListener('DOMContentLoaded', () => {

    const gate = document.getElementById('welcome-gate');
    const portfolio = document.getElementById('portfolio-content');
    let gateUnlocked = false;

    function unlockGate() {
        if (gateUnlocked) return;
        gateUnlocked = true;
        
        window.scrollTo(0, 0);

        if (gate) {
            gate.style.opacity = '0';
            gate.style.transform = 'scale(1.05)';
        }
        
        if (portfolio) {
            portfolio.style.display = 'grid'; 
            setTimeout(() => {
                portfolio.style.opacity = '1';
                document.documentElement.classList.remove('locked');
                document.body.classList.remove('locked');
            }, 50);
        }

        setTimeout(() => { 
            if (gate) gate.style.display = 'none'; 
        }, 1500);
    }

    if (gate) {
        window.addEventListener('wheel', unlockGate, { once: true });
        window.addEventListener('click', unlockGate, { once: true });
        window.addEventListener('touchstart', unlockGate, { once: true });
    }

    // THEME TOGGLE (Abyss <-> YorHa)
    const themeBtn = document.getElementById('themeToggle');
    const themeLabel = document.getElementById('themeLabel');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isYorha = document.body.classList.contains('theme-yorha');
            if (isYorha) {
                document.body.classList.remove('theme-yorha');
                themeLabel.innerText = "ABYSS";
            } else {
                document.body.classList.add('theme-yorha');
                themeLabel.innerText = "YORHA";
            }
        });
    }

    // TABS SYSTEM (Overview vs Archives)
    const navLinks = document.querySelectorAll('.nav-link');
    const pageTabs = document.querySelectorAll('.page-tab');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Remove active from all links and tabs
            navLinks.forEach(n => n.classList.remove('active'));
            pageTabs.forEach(t => t.classList.remove('active'));
            
            // Add active to clicked link
            link.classList.add('active');
            
            // Show corresponding tab
            const targetId = link.getAttribute('data-tab-target');
            document.getElementById('tab-' + targetId).classList.add('active');
            window.scrollTo(0, 0);
        });
    });


    // ==========================================
    // 3. DYNAMIC CARD GENERATOR & FILTERS
    // ==========================================

    const aboutRolesGrid = document.getElementById('about-roles-grid');
    if (aboutRolesGrid) {
        aboutRolesGrid.innerHTML = Object.keys(roleDefinitions).map(role => {
            const def = roleDefinitions[role];
            return `<div class="about-role-item open-role-modal" data-role-target="${role}"><span class="role-tag">${def.title}</span><p>${def.description}</p></div>`;
        }).join('');
    }

    const createProjectListItem = (project) => {
        const article = document.createElement('article');
        article.className = 'project-card open-modal';
        article.dataset.project = project.id;

        const brackets = document.createElement('div');
        brackets.className = 'card-brackets';
        article.appendChild(brackets);

        const visual = document.createElement('div');
        visual.className = 'card-visual';
        
        const seal = document.createElement('div');
        seal.className = 'card-seal';
        seal.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="45"/><rect x="18" y="18" width="64" height="64" transform="rotate(45 50 50)"/></svg>`;
        
        const img = document.createElement('img');
        img.src = project.image || 'https://images.unsplash.com/photo-1518349619113-03114f06ac3a?q=80&w=1000&auto=format&fit=crop';
        img.alt = project.title;

        visual.appendChild(seal);
        visual.appendChild(img);
        article.appendChild(visual);

        const body = document.createElement('div');
        body.className = 'card-body';
        
        const title = document.createElement('h3');
        title.className = 'card-title';
        title.textContent = project.title;

        const meta = document.createElement('div');
        meta.className = 'card-meta';
        let engineName = project.cardEngineName || "SYSTEM";
        let catName = project.category ? project.category.replace(' work', '').replace(' jams', ' Jam').toUpperCase() : '';
        meta.innerHTML = `${catName} // ${engineName}`;

        const desc = document.createElement('p');
        desc.className = 'card-desc';
        desc.textContent = project.short;

        const btn = document.createElement('button');
        btn.className = 'card-btn';
        btn.textContent = 'EXAMINE_RECORD';

        body.appendChild(title);
        body.appendChild(meta);
        body.appendChild(desc);
        body.appendChild(btn);

        article.appendChild(body);
        return article;
    };

    const renderProjectList = (containerId, projectIds) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = '';
        projectIds.forEach(projectId => {
            const project = projectDetails[projectId];
            if (project && project.published) {
                container.appendChild(createProjectListItem(project));
            }
        });
    };

    const renderPortfolio = (filterCategory) => {
        const container = document.getElementById('portfolio-grid-container');
        if (!container) return;
        container.innerHTML = '';
        
        const projectsArray = Object.values(projectDetails).filter(p => p.published);
        const filteredProjects = projectsArray.filter(project => {
            if (filterCategory === 'all') return true;
            if (!project.category) return false;
            return project.category.toLowerCase() === filterCategory.toLowerCase();
        });

        if (filteredProjects.length === 0) {
            container.innerHTML = `<p class="no-projects-message">NO RECORDS FOUND IN THIS DIRECTORY.</p>`;
            return;
        }

        filteredProjects.sort((a, b) => (b.year || 0) - (a.year || 0)).forEach(project => {
            container.appendChild(createProjectListItem(project));
        });
    };

    const filterBtns = document.querySelectorAll(".filter-btn");
    filterBtns.forEach(btn => {
        btn.addEventListener("click", function () {
            filterBtns.forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            let cat = this.getAttribute("data-filter");
            renderPortfolio(cat);
        });
    });


    // ==========================================
    // 4. THE ESOTERIC MODAL LOGIC
    // ==========================================
    function getYouTubeId(url) {
        if (!url) return null;
        const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
        return match ? match[1] : null;
    }

    function buildContributionHTML(data) {
        if (data.roleContributions && Object.keys(data.roleContributions).length > 0) {
            const sortedRoles = sortRoles(Object.keys(data.roleContributions));
            return sortedRoles.map(role => {
                const content = data.roleContributions[role];
                return `<div class="role-contribution">
                    <h4 class="pm-meta-label">${role}</h4>
                    <div>${content}</div>
                </div>`;
            }).join('');
        }
        if (data.myContribution) return `<div class="role-contribution"><h4 class="pm-meta-label">EXECUTION_DATA</h4><div>${data.myContribution}</div></div>`;
        return `<div class="role-contribution"><p>NO DATA.</p></div>`;
    }

    function openProjectModal(projectId) {
        const data = projectDetails[projectId];
        if (!data) return;

        const modalBody = document.getElementById('modalBody');
        const projectModal = document.getElementById('projectModal');

        const modalShortText = data.short || "Details provided below.";
        const modalLongText = (data.long && data.long !== data.short) ? data.long : '';
        const youtubeId = getYouTubeId(data.video);
        const hasClips = data.videos && data.videos.length > 0;
        const hasAnyMedia = hasClips || youtubeId || data.image;

        const toolIconsHtml = data.tools && data.tools.length > 0 ? data.tools.map(tool =>
            `<span class="pm-tool-item" title="${tool.name || ''}">${tool.icon ? `<span class="pm-tool-icon">${tool.icon}</span>` : ''}<span class="pm-tool-name">${tool.name || ''}</span></span>`
        ).join('') : '<p>N/A</p>';

        let linksHTML = '';
        if (data.links && data.links.length > 0) {
            linksHTML = '<div class="pm-links">' + data.links.map(l => {
                if (l.url === 'request') return `<div class="pm-link-item pm-link-item--request"><i class="fas fa-lock"></i><span>Classified / Request Access</span></div>`;
                return `<a href="${l.url}" target="_blank" rel="noopener" class="pm-link-item"><i class="${l.icon || 'fas fa-link'}"></i><span>${l.label}</span></a>`;
            }).join('') + '</div>';
        } else if (data.learnMoreLink && data.learnMoreLink !== '#') {
            linksHTML = `<div class="pm-links"><a href="${data.learnMoreLink}" target="_blank" rel="noopener" class="pm-link-item"><i class="fas fa-link"></i><span>Access External Record</span></a></div>`;
        }

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
                playlistHtml = `<div class="pm-playlist-minimal">` +
                    data.videos.map((vid, idx) => `
                        <button class="playlist-btn-min ${idx === 0 ? 'active' : ''}" data-vid-src="${vid.file}">
                            ${vid.label}
                        </button>
                    `).join('') + `</div>`;
            }
        } else if (youtubeId) {
            mediaHtml = `
                <a href="https://www.youtube.com/watch?v=${youtubeId}" target="_blank" class="yt-fallback">
                    <img src="https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg" onerror="this.src='https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg'">
                    <div class="yt-fallback-btn">VERIFY_FEED</div>
                </a>
            `;
        } else if (data.image) {
            mediaHtml = `<img class="pm-poster" src="${data.image}" style="opacity:1;">`;
        }

        const roleTagsHtml = data.roles && data.roles.length > 0
            ? data.roles.map(r => `<span class="role-tag">${r}</span>`).join('') : '';

        modalBody.innerHTML = `
            <div class="pm-wrapper" id="pmWrapper">
                ${hasAnyMedia ? `
                <div class="pm-left-panel" id="pmLeftPanel">
                    <div class="pm-media-player" id="pmMediaPlayer">${mediaHtml}</div>
                    <div class="pm-meta-stage">
                        ${playlistHtml}
                        ${roleTagsHtml ? `<div class="pm-role-tags">${roleTagsHtml}</div>` : ''}
                        <div class="pm-meta-grid">
                            <div class="pm-meta-item"><span class="pm-meta-label">ROLE</span><span class="pm-meta-value">${data.role || 'N/A'}</span></div>
                            ${data.year ? `<div class="pm-meta-item"><span class="pm-meta-label">YEAR</span><span class="pm-meta-value">${data.year}</span></div>` : ''}
                        </div>
                        ${data.tools && data.tools.length > 0 ? `<div class="pm-tool-list">${toolIconsHtml}</div>` : ''}
                        ${linksHTML}
                    </div>
                </div>
                ` : ''}

                <div class="pm-right-panel" id="pmRightPanel" style="${!hasAnyMedia ? 'border-radius: 0;' : ''}">
                    <h3 class="pm-title">${data.title}</h3>
                    <div class="pm-tabs">
                        <button class="pm-tab active">OVERVIEW</button>
                    </div>
                    <div class="pm-overview">
                        <p class="pm-short">${modalShortText}</p>
                        ${modalLongText ? `<p class="pm-long">${modalLongText}</p>` : ''}
                    </div>
                    <div class="pm-contributions">${buildContributionHTML(data)}</div>
                </div>
            </div>`;

        const wrapper = modalBody.querySelector('#pmWrapper');
        const leftPanel = modalBody.querySelector('#pmLeftPanel');
        const rightPanel = modalBody.querySelector('#pmRightPanel');
        const mediaPlayer = modalBody.querySelector('#pmMediaPlayer');
        const videoElement = modalBody.querySelector('.main-video-player');
        const clickOverlay = modalBody.querySelector('.pm-click-overlay');
        let isMegaMode = false;

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

        if (mediaPlayer && videoElement) {
            mediaPlayer.addEventListener('mouseenter', () => {
                if (!isMegaMode) {
                    leftPanel.classList.add('is-peeking');
                    leftPanel.classList.add('is-playing');
                    videoElement.play().catch(()=>{});
                }
            });
            mediaPlayer.addEventListener('mouseleave', () => {
                if (!isMegaMode) {
                    leftPanel.classList.remove('is-peeking');
                    leftPanel.classList.remove('is-playing');
                    videoElement.pause();
                }
            });
        }

        if (rightPanel) {
            rightPanel.addEventListener('click', (e) => {
                if(e.target.closest('button') || e.target.closest('a')) return;
                if (isMegaMode) setMegaMode(false);
            });
        }

        const playBtns = modalBody.querySelectorAll('.playlist-btn-min');
        let currentActiveSrc = null;
        
        const switchVideo = (src) => {
            if (!videoElement || currentActiveSrc === src) return;
            videoElement.src = src;
            videoElement.load();
            currentActiveSrc = src;
            playBtns.forEach(b => b.classList.toggle('active', b.dataset.vidSrc === src));
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

        projectModal.classList.add('active');
        document.documentElement.classList.add('locked');
        document.body.classList.add('locked');
    }

    // ==========================================
    // 5. THE ROLE GALLERY MODAL LOGIC
    // ==========================================
    window.openRoleModal = function(roleName) {
        const roleModal = document.getElementById('roleModal');
        const roleModalBody = document.getElementById('roleModalBody');
        const roleDef = roleDefinitions[roleName];
        if (!roleDef) return;

        const projectsWithRole = Object.values(projectDetails).filter(p => p.published && p.roles && p.roles.includes(roleName));
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
            const contributionText = p.roleContributions && p.roleContributions[roleName] ? p.roleContributions[roleName] : (typeof p.myContribution === 'string' ? p.myContribution : '<p>No specific details provided.</p>');
            let categoryLabel = (p.category || '').replace(' work', '').replace(' jams', ' Jam').toUpperCase();

            return `
                <div class="rpc-card open-modal" data-project="${p.id}" style="cursor: pointer;">
                    <div class="rpc-card-header">
                        <img src="${p.image}" alt="${p.title}" class="rpc-card-img" loading="lazy">
                        <div class="rpc-card-info">
                            <h4>${p.title}</h4>
                            <span>${categoryLabel}</span>
                        </div>
                    </div>
                    <div class="rpc-text-body">${contributionText}</div>
                </div>`;
        }).join('');

        if (roleModalBody) {
            roleModalBody.innerHTML = `
                ${tabsHtml}
                <div class="role-modal-header">
                    <span class="pm-meta-label">${roleDef.title}</span>
                    <p class="role-modal-desc">${roleDef.description}</p>
                </div>
                <div class="role-modal-projects">
                    ${cardsHtml || '<p style="color: var(--gold-dim);">No archives found for this parameter.</p>'}
                </div>`;
        }

        if (roleModal && !roleModal.classList.contains('active')) {
            roleModal.classList.add('active');
            document.documentElement.classList.add('locked');
            document.body.classList.add('locked');
        }
    }


    // ==========================================
    // 6. GLOBAL EVENT LISTENERS & CLEANUP
    // ==========================================
    function cleanupAndCloseModal() {
        const pModal = document.getElementById('projectModal');
        const rModal = document.getElementById('roleModal');
        
        if (pModal) pModal.classList.remove('active');
        if (rModal) rModal.classList.remove('active');
        
        if (gateUnlocked) {
            document.documentElement.classList.remove('locked');
            document.body.classList.remove('locked');
        }
        
        if (pModal) {
            const videoPlayers = pModal.querySelectorAll('video');
            videoPlayers.forEach(vid => vid.pause());
        }
    }

    document.body.addEventListener('click', function(e) {
        const clickedProject = e.target.closest('.open-modal');
        if (clickedProject) { 
            e.preventDefault();
            const rModal = document.getElementById('roleModal');
            if (rModal && rModal.classList.contains('active')) {
                rModal.classList.remove('active'); // Close role modal before opening project modal
            }
            openProjectModal(clickedProject.dataset.project);
        }

        const clickedRoleTrigger = e.target.closest('.sidebar-role-btn, .open-role-modal');
        if (clickedRoleTrigger) {
            e.preventDefault();
            openRoleModal(clickedRoleTrigger.dataset.roleTarget);
        }
        
        if (e.target.id === 'projectModal' || e.target.closest('.pm-close-btn') || e.target.id === 'roleModal') {
            cleanupAndCloseModal();
        }
    });

    // ==========================================
    // 7. ASH PARTICLE SYSTEM INIT
    // ==========================================
    const canvas = document.getElementById('ash-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, particles = [];

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        for(let i = 0; i < 150; i++) {
            particles.push({
                x: Math.random() * width, y: Math.random() * height,
                radius: Math.random() * 1.5 + 0.5,
                vx: (Math.random() - 0.5) * 0.5, vy: Math.random() * 0.5 + 0.2
            });
        }

        function animateAsh() {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = 'rgba(212, 175, 55, 0.4)'; 
            particles.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.y > height) { p.y = -10; p.x = Math.random() * width; }
                if (p.x > width) p.x = 0;
                if (p.x < 0) p.x = width;
                ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fill();
            });
            requestAnimationFrame(animateAsh);
        }
        animateAsh();
    }

    // Initial Render
    renderProjectList('professional-work-list', professionalWorkIds);
    renderProjectList('tech-design-list', techDesignWorkIds);
    renderPortfolio('all');
});