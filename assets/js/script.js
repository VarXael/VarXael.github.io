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
const highlightProjectsContainer = document.querySelector('.highlight-projects-container');


// SVG icons
const fortniteIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.86 6.71l-1.72 1.72c-.19-.25-.43-.46-.72-.62l.98-2.35c.13-.32.02-.69-.27-.84s-.69-.02-.84.27l-.98 2.35c-.3-.09-.61-.13-.93-.13s-.63.04-.93.13l-.98-2.35c-.13-.32-.51-.45-.84-.27s-.45.51-.27.84l.98 2.35c-.29.16-.53.37-.72.62l-1.72-1.72c-.26-.26-.71-.23-.94.03s-.23.71.03.94l1.72 1.72c-.16.29-.27.6-.31.93H5.5c-.39 0-.7.31-.7.7s.31.7.7.7h2.35c.04.33.15.64.31.93l-1.72 1.72c-.26.26-.29.71-.03.94s.71.29.94.03l1.72-1.72c.25.19.54.33.85.42V17.5c0 .39.31.7.7.7s.7-.31.7-.7v-2.35c.3-.09.59-.23.85-.42l1.72 1.72c.26.26.71.23.94-.03s-.23-.71-.03-.94l-1.72-1.72c.16-.29.27.6.31-.93h2.35c.39 0 .7-.31-.7-.7s-.31-.7-.7-.7H14.8c-.04-.33-.15-.64-.31-.93l1.72-1.72c.26-.26.29-.71.03-.94s-.71-.29-.94-.03zM12 13.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>`; 
const verseIconSVG = `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9V7h2v10zm4 0h-2V7h2v10z"/></svg>`; 

const projectDetails = {
    "PoliceSimulator": {
        id: "PoliceSimulator", 
        title: "Police Simulator: Patrol Officers",
        category: "professional work",
        year: 2024, 
        role: "Simulation Game",
        teamSize: "Aesir Interactive",
        duration: "Released Sep 2022",
        video: "#",
        learnMoreLink: "https://www.aessirinteractive.com/police-simulator-patrol-officers", 
        image: "./assets/images/PoliceSimulator.png",
        short: "Experience the daily life of a U.S. police officer.",
        long: "Police Simulator: Patrol Officers lets players join the police force of a fictional American city, Brighton. From citing parking violations to investigating traffic accidents and pursuing suspects, the game offers a wide range of typical police duties.",
        tools: [ { name: "Unreal Engine", icon: '<i class="fab fa-unrealengine"></i>' } ], 
        techStack: [ { iconHTML: '<i class="fab fa-unrealengine" title="Unreal Engine"></i>' } ],
        myContribution: "Contributed to AI behavior for traffic simulations and pedestrian interactions. Optimized rendering performance for dense city environments.", 
    },
    "HighOnLife": {
        id: "HighOnLife",
        title: "High on Life (Nintendo Switch Port)",
        category: "professional work", 
        year: 2024, 
        role: "Game Programmer (Porting Team)",
        teamSize: "Untold Games Team",
        duration: "Sept 2023 - April 2024 (approx. 8 months)",
        video: "https://www.youtube.com/watch?v=EvhUMyenR9c&ab_channel=NintendoofAmerica", 
        learnMoreLink: "https://shrub-raptorex-ec1.notion.site/High-On-Life-20753eb8bf2d803ba572f7ae3def0061", 
        image: "./assets/images/HighOnLife.png",
        short: "Spearheaded the Nintendo Switch port of Squanch Games' acclaimed FPS, High on Life, focusing on optimization, bug resolution, and feature parity.",
        long: "As part of the Untold Games team, we undertook the complex challenge of porting the visually rich and technically demanding 'High on Life' to the Nintendo Switch. This collaborative effort involved close coordination with Turn Me Up Games and Squanch Games to adapt the Unreal Engine project for the Switch hardware, ensuring a stable, performant, and feature-complete experience for players on the new platform.",
        myContribution: "Key contributor to the Nintendo Switch port, specializing in extensive bug-fixing across AI, gameplay mechanics (collisions, abilities), UI, and audio. Developed vital debugging tools and artist utilities. Refactored and optimized C++ & Blueprint code for critical systems, ensuring stability and performance on the Switch. Became a go-to resource for deep system knowledge and complex troubleshooting.",
        tools: [ 
            { name: "Unreal Engine", icon: '<i class="fab fa-unrealengine"></i>' },
            { name: "C++", icon: '<i class="fas fa-file-code"></i>' }, 
            { name: "Blueprints", icon: '<i class="fas fa-project-diagram"></i>' },
            { name: "Nintendo Switch SDK", icon: '<ion-icon name="logo-nintendo"></ion-icon>'}
        ],
        techStack: [ 
            { iconHTML: '<i class="fab fa-unrealengine" title="Unreal Engine"></i>' },
            { iconHTML: '<i class="fas fa-cogs" title="Porting & Optimization"></i>'},
            { iconHTML: '<i class="fas fa-bug" title="Bug Fixing"></i>'}
        ]
    },
    "UEFN: Battleship": {
        id: "UEFN: Battleship",
        title: "UEFN: Battleship",
        category: "professional work",
        year: 2023,
        role: "Lead Game Creator & Verse Developer", 
        teamSize: "Untold Games (Small Team)", 
        duration: "6 months (Concept to Launch)",
        video: "https://www.fortnite.com/@untoldgames/1028-2740-2494",
        learnMoreLink: "YOUR_NOTION_OR_SUBSTACK_LINK_FOR_BATTLESHIP", 
        image: "./assets/images/Battleship.jpeg",
        short: "Designed and developed a fast-paced, team-based strategy game within UEFN, inspired by the classic Battleship, utilizing Verse for core mechanics.",
        long: "This project involved the complete creation of a multiplayer strategy game, 'UEFN: Battleship,' from initial concept to public release on the Fortnite platform. As the lead creator, I spearheaded the design of game mechanics, level layout, and player experience, with a heavy focus on implementing core logic using Verse scripting and UEFN's device system.",
        myContribution: "Led the overall game design, including ruleset, win/loss conditions, and player progression. Developed the primary gameplay systems using Verse, including the combat grid, ship placement logic, and real-time feedback for player actions. Optimized network replication for responsive multiplayer gameplay and iterated on design based on playtesting feedback.",
        tools: [
            { name: "UEFN", icon: fortniteIconSVG, class: "fortnite" },
            { name: "Verse", icon: verseIconSVG, class: "verse" }
        ],
        techStack: [
            { iconHTML: `<span class="tech-icon-fortnite" title="UEFN">${fortniteIconSVG}</span>` },
            { iconHTML: `<span class="tech-icon-verse" title="Verse Programming">${verseIconSVG}</span>` }
        ]
    },
    "PulseParty": {
        id: "PulseParty",
        title: "PulseParty",
        category: "professional work",
        year: 2023,
        role: "Technical Game Designer",
        teamSize: "Untold Games",
        duration: "3 months",
        video: "https://www.fortnite.com/@untoldgames/8369-2685-8749", 
        learnMoreLink: "https://www.fortnite.com/@untoldgames/8369-2685-8749", 
        image: "./assets/images/PulsePartyThumbnail.png", 
        short: "Rhythm-based multiplayer UEFN game.",
        long: "Responsibilities included game mechanics prototyping, network optimization, and dynamic tempo sync with music.",
        tools: [
            { name: "UEFN", icon: fortniteIconSVG, class: "fortnite" }, 
            { name: "Verse", icon: verseIconSVG, class: "verse" } 
        ],
        techStack: [
            { iconHTML: `<span class="tech-icon-fortnite" title="UEFN">${fortniteIconSVG}</span>` },
            { iconHTML: `<span class="tech-icon-verse" title="Verse Programming">${verseIconSVG}</span>` }
        ],
        myContribution: "Prototyped core rhythm mechanics in Verse. Developed custom audio analysis system for beat synchronization. Optimized network performance for smooth multiplayer experience.",
    },
    "PulseMatch": {
        id: "PulseMatch",
        title: "PulseMatch",
        category: "professional work",
        year: 2023, 
        role: "Technical Game Designer",
        teamSize: "Untold Games",
        duration: "N/A",
        video: "https://www.fortnite.com/@untoldgames/9111-6971-7741", 
        isDirectLink: true, 
        learnMoreLink: "https://www.fortnite.com/@untoldgames/9111-6971-7741", 
        image: "./assets/images/PulseMatch.jpeg",
        short: "UEFN game experience focused on matchmaking concepts.",
        long: "A project exploring matchmaking and social features within the UEFN platform.",
        tools: [
            { name: "UEFN", icon: fortniteIconSVG, class: "fortnite" },
            { name: "Verse", icon: verseIconSVG, class: "verse" }
        ],
        techStack: [
             { iconHTML: `<span class="tech-icon-fortnite" title="UEFN">${fortniteIconSVG}</span>` },
             { iconHTML: `<span class="tech-icon-verse" title="Verse Programming">${verseIconSVG}</span>` }
        ],
        myContribution: "Designed and implemented Verse logic for experimental matchmaking algorithms and player queuing systems.",
    },
    "Alien": {
        id: "Alien",
        title: "Alien (Game Prototype)",
        category: "personal work",
        year: 2022, 
        role: "Game Creator",
        teamSize: "Solo Project",
        duration: "Prototype Phase",
        video: "https://open.substack.com/pub/giuseppeluigialfieri/p/game-prototypes-alien?r=3ko0h9&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true", 
        learnMoreLink: "https://open.substack.com/pub/giuseppeluigialfieri/p/game-prototypes-alien?r=3ko0h9&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true",
        image: "./assets/images/work-5.jpg",
        short: "Personal prototype inspired by the Alien franchise.",
        long: "Focused on prototyping mechanics and atmosphere. More details on Substack.",
        tools: [ { name: "Unreal Engine 4", icon: '<i class="fab fa-unrealengine"></i>' } ], 
        techStack: [ { iconHTML: '<i class="fab fa-unrealengine" title="Unreal Engine 4"></i>' } ],
        myContribution: "Developed AI for stealth-based enemy encounters. Prototyped environmental interaction systems. Explored lighting and atmospheric effects to capture the 'Alien' mood.",
    },
    "Cycle": { 
        id: "Cycle",
        title: "Cycle",
        category: "university work",
        year: 2022, 
        role: "Game Creator",
        teamSize: "Falmouth University",
        duration: "Approx. 4 months",
        video: "#", 
        learnMoreLink: null, 
        image: "./assets/images/Cycle.png",
        short: "Narrative-driven puzzle game.",
        long: "University coursework focusing on environmental storytelling and puzzle design.",
        tools: [
            { name: "Unity", icon: '<i class="fab fa-unity"></i>' }, 
            { name: "C#", icon: '<i class="fas fa-code"></i>' } 
        ],
        techStack: [
            { iconHTML: '<i class="fab fa-unity" title="Unity"></i>' },
            { iconHTML: '<i class="fas fa-code" title="C#"></i>' }
        ],
        myContribution: "Designed and scripted all puzzle mechanics. Wrote the narrative and integrated it with gameplay progression. Created all 2D art assets and level layouts.",
    },
    "CardsWeaver": {
        id: "CardsWeaver",
        title: "Card's Weaver",
        category: "university work",
        year: 2023, 
        role: "Lead Game Designer",
        teamSize: "Verona University",
        image: "./assets/images/Card's Weaver.png",
        video: "https://batraf.itch.io/cards-weaver",
        isDirectLink: true,
        learnMoreLink: "https://batraf.itch.io/cards-weaver",
        short: "Card-based game developed at university.",
        long: "A university project focusing on card game mechanics and design principles.",
        techStack: [{ iconHTML: '<i class="fab fa-unity" title="Unity"></i>' }],
        myContribution: "Led the conceptualization of core game rules and card interactions. Designed the UI/UX for card play and resource management. Balanced card abilities for engaging gameplay.",
    },
    "SoulDriven": {
        id: "SoulDriven",
        title: "Soul Driven",
        category: "university work",
        year: 2023, 
        role: "Game Developer",
        teamSize: "Verona University",
        image: "./assets/images/work-6.jpg",
        video: "https://fraffer.itch.io/soul-driven",
        isDirectLink: true,
        learnMoreLink: "https://fraffer.itch.io/soul-driven",
        short: "Action game developed as a university project.",
        long: "A university project exploring action game development concepts.",
        techStack: [{ iconHTML: '<i class="fab fa-unity" title="Unity"></i>' }],
        myContribution: "Implemented player character controls and combat mechanics. Developed enemy AI patterns and attack sequences. Created particle effects for abilities and impacts.",
    },
    "Covid19Training": {
        id: "Covid19Training",
        title: "Covid 19 Training",
        category: "professional work",
        year: 2021, 
        role: "Game Programmer",
        teamSize: "Cineon Training",
        image: "./assets/images/work-2.jpg",
        video: "https://cineon.training/covid-19-personal-protective-equipment-ppe-training/",
        isDirectLink: true,
        learnMoreLink: "https://cineon.training/covid-19-personal-protective-equipment-ppe-training/",
        short: "VR Training simulation for PPE.",
        long: "Developed PPE training scenarios using VR technology.",
        techStack: [{ iconHTML: '<i class="fab fa-unrealengine" title="Unreal Engine"></i>' }],
        myContribution: "Scripted interaction logic for VR controllers and training objects. Implemented a scenario progression system with feedback mechanisms. Optimized performance for smooth VR experience.",
    },
    "UnrealEngineCourse": {
        id: "UnrealEngineCourse",
        title: "Unreal Engine Course",
        category: "professional work",
        year: 2022, 
        role: "Unreal Engine Tutor",
        teamSize: "Creativity Unleashed",
        image: "./assets/images/work-1.jpg",
        video: "https://www.udemy.com/course/complete-unreal-engine-megacourse-beginner-to-expert/",
        isDirectLink: true,
        learnMoreLink: "https://www.udemy.com/course/complete-unreal-engine-megacourse-beginner-to-expert/",
        short: "Online course for Unreal Engine.",
        long: "A 16-hour course introducing Unreal Engine Blueprints and programming structures.",
        techStack: [{ iconHTML: '<i class="fab fa-unrealengine" title="Unreal Engine"></i>' }],
        myContribution: "Designed and recorded course modules covering Unreal Engine fundamentals, Blueprints, and common game programming patterns. Created example projects and exercises for students.",
    },
    "MonkHomebrew": {
        id: "MonkHomebrew",
        title: "Monk Homebrew",
        category: "personal work",
        year: 2023, 
        role: "Game Designer",
        teamSize: "Personal Project",
        image: "./assets/images/Monk.png",
        video: "https://drive.google.com/file/d/1cyUGRzfhP4CjVwDljmbiXhwORSPAUSpp/view?usp=sharing",
        isDirectLink: true,
        learnMoreLink: "https://drive.google.com/file/d/1cyUGRzfhP4CjVwDljmbiXhwORSPAUSpp/view?usp=sharing",
        short: "D&D Homebrew content for the Monk class.",
        long: "Personal game design project creating new options for D&D.",
        techStack: [],
        myContribution: "Designed new subclasses and abilities for the D&D Monk class, focusing on thematic cohesion and mechanical balance. Formatted content for community sharing.",
    },
    "SyovaraHomebrew": {
        id: "SyovaraHomebrew",
        title: "Syovara Homebrew",
        category: "personal work",
        year: 2023, 
        role: "Game Designer",
        teamSize: "Personal Project",
        image: "./assets/images/Syovara.jpg",
        video: "https://aminoapps.com/c/officialdd/page/item/syovara/eYNM_3qQT6IK3r02BM0LpLXwL0x51XeEbEb",
        isDirectLink: true,
        learnMoreLink: "https://aminoapps.com/c/officialdd/page/item/syovara/eYNM_3qQT6IK3r02BM0LpLXwL0x51XeEbEb",
        short: "D&D Homebrew setting/content.",
        long: "A personal world-building and game design project for D&D.",
        techStack: [],
        myContribution: "Developed lore, cultures, and unique mechanics for a custom D&D setting. Created new player options and monster stat blocks tailored to the world.",
    },
    "MaGiTeProject": {
        id: "MaGiTeProject",
        title: "MaGiTe Project",
        category: "professional work", 
        year: 2025, 
        role: "Game Developer",
        teamSize: "Umeå University",
        image: "./assets/images/Umeå_University_Resized.png",
        video: "#", 
        learnMoreLink: null,
        short: "Research project collaboration.",
        long: "Contributed to the MaGiTe research project, focusing on [Your specific area of contribution, e.g., 'gameplay prototyping for educational modules'].",
        techStack: [], 
        myContribution: "[Detail your specific contributions here if applicable.]",
    },
    "ProjectCenturion": {
        id: "ProjectCenturion",
        title: "Project Centurion",
        category: "university work",
        year: 2020, 
        role: "Game Designer & Developer",
        teamSize: "University Project",
        image: "./assets/images/work-4.jpg",
        video: "https://drive.google.com/file/d/1kqrXXSPwxUrCUG9qNnqnNzSuWa9S9QJv/view?usp=sharing",
        isDirectLink: true,
        learnMoreLink: "https://drive.google.com/file/d/1kqrXXSPwxUrCUG9qNnqnNzSuWa9S9QJv/view?usp=sharing",
        short: "University game project with a historical theme.",
        long: "A game developed as part of university studies, focusing on design and development.",
        techStack: [{ iconHTML: '<i class="fab fa-unity" title="Unity"></i>'}],
        myContribution: "Co-designed core gameplay loop and level structure. Implemented player movement and interaction systems using Unity and C#.",
    },
    "FallingFusion": {
        id: "FallingFusion",
        title: "Falling Fusion",
        category: "game jams",
        year: 2022, 
        role: "Game Designer & Developer",
        teamSize: "Game Jam Team",
        image: "./assets/images/work-8.jpg",
        video: "https://jonny5959.itch.io/falling-fusion",
        isDirectLink: true,
        learnMoreLink: "https://jonny5959.itch.io/falling-fusion",
        short: "Game Jam entry with a fusion mechanic.",
        long: "A rapidly developed game for a game jam, focusing on core mechanics.",
        techStack: [{ iconHTML: '<i class="fab fa-unity" title="Unity"></i>'}],
        myContribution: "Designed the core 'fusion' mechanic and implemented it in Unity. Created procedurally generated level segments for replayability during the jam.",
    },
     "NickelNinja": {
        id: "NickelNinja",
        title: "Nickel Ninja",
        category: "game jams",
        year: 2023, 
        role: "Game Designer & Developer",
        teamSize: "Game Jam Team",
        image: "./assets/images/work-7.jpg",
        video: "https://v3.globalgamejam.org/2022/games/nickel-ninja-3",
        isDirectLink: true,
        learnMoreLink: "https://v3.globalgamejam.org/2022/games/nickel-ninja-3",
        short: "Global Game Jam 2022 entry.",
        long: "A game created during the Global Game Jam 2022.",
        techStack: [{ iconHTML: '<i class="fab fa-unity" title="Unity"></i>'}],
        myContribution: "Contributed to level design and character ability scripting. Collaborated on art asset integration and bug fixing under tight deadlines.",
    }
};

const renderPortfolio = (filterCategory) => {
    if (!portfolioGridContainer) {
        console.error("Portfolio grid container not found!");
        return;
    }
    portfolioGridContainer.innerHTML = ''; 

    const projectsArray = Object.values(projectDetails);

    const filteredProjects = projectsArray.filter(project => 
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
            const listItem = document.createElement('li');
            listItem.className = 'project-item active';
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
            link.appendChild(figure);

            const titleH3 = document.createElement('h3');
            titleH3.className = 'project-title';
            titleH3.textContent = project.title;
            link.appendChild(titleH3);

            const categoryP = document.createElement('p');
            categoryP.className = 'project-category';
            let categoryText = project.role || '';
            if (project.teamSize && project.teamSize.toLowerCase() !== 'n/a' && project.teamSize.toLowerCase() !== (project.role || '').toLowerCase() && project.teamSize !== project.role) {
                categoryText += ` - ${project.teamSize}`;
            }
            categoryP.textContent = categoryText || 'N/A';
            link.appendChild(categoryP);

            const techIconsDiv = document.createElement('div');
            techIconsDiv.className = 'project-tech-icons';
            if (project.techStack && project.techStack.length > 0) {
                project.techStack.forEach(tech => {
                    const tempContainer = document.createElement('div'); 
                    tempContainer.innerHTML = tech.iconHTML.trim(); 
                    if(tempContainer.firstChild) { 
                        techIconsDiv.appendChild(tempContainer.firstChild); 
                    }
                });
            }
            link.appendChild(techIconsDiv);
            
            listItem.appendChild(link);
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

    let mediaContentHtml = '';
    if (data.image) {
        if (data.video && data.video !== "#" && (data.video.startsWith("http://") || data.video.startsWith("https://"))) {
            mediaContentHtml = `<a href="${data.video}" target="_blank" rel="noopener noreferrer"><img src="${data.image}" alt="${data.title}"></a>`;
        } else { 
            mediaContentHtml = `<img src="${data.image}" alt="${data.title}">`;
        }
    } else if (data.video && data.video !== "#" && (data.video.startsWith("http://") || data.video.startsWith("https://"))) {
        mediaContentHtml = `<p><a href="${data.video}" target="_blank" rel="noopener noreferrer">Watch Video / More Info</a> (Preview image not available)</p>`;
    } else {
        mediaContentHtml = `<p>No media available for this project.</p>`;
    }

    const toolIconsHtml = data.tools && data.tools.length > 0 ? data.tools.map(tool => {
        let iconHtml = '';
        if (tool.icon) {
            iconHtml = tool.icon; 
        }
        return `<span class="tool-item" title="${tool.name}">
                    ${iconHtml ? `<span class="tool-icon ${tool.class || ''}">${iconHtml}</span>` : ''}
                    <span class="tool-name">${tool.name}</span>
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
                <div class="modal-media">${mediaContentHtml}</div>
                <div class="modal-details">
                    <div class="detail-item"><h4>Role:</h4><p>${data.role || 'N/A'}</p></div>
                    <div class="detail-item"><h4>Project Duration/Release:</h4><p>${data.duration || 'N/A'}</p></div>
                    <div class="detail-item"><h4>Team/Developer:</h4><p>${data.teamSize || 'N/A'}</p></div>
                    <div class="tools-section detail-item"><h4>Key Technologies:</h4>
                        <div class="tool-list"> 
                            ${toolIconsHtml}
                        </div>
                    </div>
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
                    <p>${data.myContribution || 'Details not specified.'}</p>
                </div>
            </div>
            ${learnMoreButtonHTML} 
        `;
    }
    if (projectModal) projectModal.classList.add('active');
    document.body.classList.add('no-scroll');
}

// Event Delegation for dynamically created .open-modal links in MAIN PORTFOLIO
if (portfolioGridContainer) {
    portfolioGridContainer.addEventListener('click', function(e) {
        const clickedLink = e.target.closest('a.open-modal');
        if (clickedLink && !clickedLink.hasAttribute('target')) { 
            e.preventDefault();
            const projectId = clickedLink.dataset.project;
            openProjectModal(projectId);
        }
    });
}

// Event Listener for statically defined Highlight items
if (highlightProjectsContainer) {
    const highlightLinks = highlightProjectsContainer.querySelectorAll('a.open-modal');
    highlightLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.dataset.project;
            openProjectModal(projectId); 
        });
    });
}


// Modal Close Listeners
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

// Initial Render and Filter Setup on Page Load
document.addEventListener('DOMContentLoaded', () => {
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


// Page navigation variables and logic
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

if (navigationLinks.length > 0 && pages.length > 0) { 
  navigationLinks.forEach(link => {
    link.addEventListener("click", function () {
      let targetPage = this.innerHTML.toLowerCase();
      
      pages.forEach(page => {
        if (page.dataset.page === targetPage) {
          page.classList.add("active");
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