'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// OLD Testimonials modal (if still used elsewhere, keep; otherwise, can be removed if only new project modal is used)
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const oldModalCloseBtn = document.querySelector("[data-modal-close-btn]"); // Renamed to avoid conflict
const overlay = document.querySelector("[data-overlay]");
const oldModalImg = document.querySelector("[data-modal-img]"); // Renamed
const oldModalTitle = document.querySelector("[data-modal-title]"); // Renamed
const oldModalText = document.querySelector("[data-modal-text]"); // Renamed

const oldTestimonialsModalFunc = function () {
  if (modalContainer && overlay) {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }
}
if (testimonialsItem.length > 0 && oldModalImg && oldModalTitle && oldModalText) {
  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
      oldModalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      oldModalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      oldModalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      oldModalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
      oldTestimonialsModalFunc();
    });
  }
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

// SVG icons
const fortniteIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.86 6.71l-1.72 1.72c-.19-.25-.43-.46-.72-.62l.98-2.35c.13-.32.02-.69-.27-.84s-.69-.02-.84.27l-.98 2.35c-.3-.09-.61-.13-.93-.13s-.63.04-.93.13l-.98-2.35c-.13-.32-.51-.45-.84-.27s-.45.51-.27.84l.98 2.35c-.29.16-.53.37-.72.62l-1.72-1.72c-.26-.26-.71-.23-.94.03s-.23.71.03.94l1.72 1.72c-.16.29-.27.6-.31.93H5.5c-.39 0-.7.31-.7.7s.31.7.7.7h2.35c.04.33.15.64.31.93l-1.72 1.72c-.26.26-.29.71-.03.94s.71.29.94.03l1.72-1.72c.25.19.54.33.85.42V17.5c0 .39.31.7.7.7s.7-.31.7-.7v-2.35c.3-.09.59-.23.85-.42l1.72 1.72c.26.26.71.23.94-.03s-.23-.71-.03-.94l-1.72-1.72c.16-.29.27.6.31-.93h2.35c.39 0 .7-.31-.7-.7s-.31-.7-.7-.7H14.8c-.04-.33-.15-.64-.31-.93l1.72-1.72c.26-.26.29-.71.03-.94s-.71-.29-.94-.03zM12 13.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>`; 
const verseIconSVG = `<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9V7h2v10zm4 0h-2V7h2v10z"/></svg>`; 

// Project details object - THIS IS THE SINGLE SOURCE OF TRUTH FOR THE DYNAMIC PORTFOLIO
// Ensure each project has: id, title, category, year, role, image, techStack.
// 'video' is for modal link or direct link. 'isDirectLink: true' for non-modal links.
// 'tools' is for the modal's tool list. 'techStack' is for the card's icons.
const projectDetails = {
    "PoliceSimulator": {
        id: "PoliceSimulator",
        title: "Police Simulator: Patrol Officers",
        category: "professional work",
        year: 2024, 
        role: "Simulation Game",
        teamSize: "Aesir Interactive",
        duration: "Released Sep 2022",
        video: "#", // Replace with actual video link for modal image click
        image: "./assets/images/PoliceSimulator.png",
        short: "Experience the daily life of a U.S. police officer.",
        long: "Police Simulator: Patrol Officers lets players join the police force of a fictional American city, Brighton. From citing parking violations to investigating traffic accidents and pursuing suspects, the game offers a wide range of typical police duties.",
        tools: [ { name: "Unreal Engine", icon: '<i class="fab fa-unrealengine"></i>' } ],
        techStack: [ { iconHTML: '<i class="fab fa-unrealengine" title="Unreal Engine"></i>' } ],
        challengesSolutions: "N/A", projectSuccess: "Popular simulation game."
    },
    "HighOnLife": {
        id: "HighOnLife",
        title: "High on Life",
        category: "professional work", 
        year: 2025,
        role: "First-Person Shooter",
        teamSize: "Squanch Games",
        duration: "Released Dec 2022",
        video: "https://www.youtube.com/watch?v=EvhUMyenR9c&ab_channel=NintendoofAmerica",
        image: "./assets/images/HighOnLife.png",
        short: "A comedic sci-fi shooter where guns are alive!",
        long: "High On Life is a first-person shooter with a heavy emphasis on comedy, created by Justin Roiland. Players wield charismatic, talking guns to take down an alien cartel.",
        tools: [ { name: "Unreal Engine", icon: '<i class="fab fa-unrealengine"></i>' } ],
        techStack: [ { iconHTML: '<i class="fab fa-unrealengine" title="Unreal Engine"></i>' } ],
        challengesSolutions: "N/A", projectSuccess: "Hit for its unique humor and art style."
    },
    "UEFN: Battleship": {
        id: "UEFN: Battleship",
        title: "UEFN: Battleship",
        category: "professional work",
        year: 2023,
        role: "Game Creator",
        teamSize: "Untold Games",
        duration: "6 months",
        video: "https://www.fortnite.com/@untoldgames/1028-2740-2494",
        image: "./assets/images/Battleship.jpeg",
        short: "Fast-paced team strategy game in UEFN.",
        long: "Developed using Unreal Editor for Fortnite, with extensive Verse scripting for match logic and grid system management.",
        tools: [
            { name: "Fortnite (UEFN)", icon: fortniteIconSVG, class: "fortnite" },
            { name: "Verse Scripting", icon: verseIconSVG, class: "verse" }
        ],
        techStack: [
            { iconHTML: `<span class="tech-icon-fortnite" title="UEFN">${fortniteIconSVG}</span>` },
            { iconHTML: `<span class="tech-icon-verse" title="Verse">${verseIconSVG}</span>` }
        ],
        challengesSolutions: "Robust grid-based combat with real-time feedback.", projectSuccess: "Over 100,000 unique players in first month."
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
        image: "./assets/images/PulsePartyThumbnail.png", 
        short: "Rhythm-based multiplayer UEFN game.",
        long: "Responsibilities included game mechanics prototyping, network optimization, and dynamic tempo sync with music.",
        tools: [
            { name: "Verse Scripting", icon: verseIconSVG, class: "verse" },
            { name: "Fortnite (UEFN)", icon: fortniteIconSVG, class: "fortnite" } 
        ],
        techStack: [
            { iconHTML: `<span class="tech-icon-fortnite" title="UEFN">${fortniteIconSVG}</span>` },
            { iconHTML: `<span class="tech-icon-verse" title="Verse">${verseIconSVG}</span>` }
        ],
        challengesSolutions: "Synchronizing lighting and FX with music tempo.", projectSuccess: "Featured in community spotlight."
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
        image: "./assets/images/PulseMatch.jpeg",
        short: "UEFN game experience focused on matchmaking concepts.",
        long: "A project exploring matchmaking and social features within the UEFN platform.",
        tools: [
            { name: "Fortnite (UEFN)", icon: fortniteIconSVG, class: "fortnite" },
            { name: "Verse Scripting", icon: verseIconSVG, class: "verse" }
        ],
        techStack: [
             { iconHTML: `<span class="tech-icon-fortnite" title="UEFN">${fortniteIconSVG}</span>` },
             { iconHTML: `<span class="tech-icon-verse" title="Verse">${verseIconSVG}</span>` }
        ],
        challengesSolutions: "N/A", projectSuccess: "N/A"
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
        image: "./assets/images/work-5.jpg",
        short: "Personal prototype inspired by the Alien franchise.",
        long: "Focused on prototyping mechanics and atmosphere. More details on Substack.",
        tools: [ { name: "Unreal Engine", icon: '<i class="fab fa-unrealengine"></i>' } ],
        techStack: [ { iconHTML: '<i class="fab fa-unrealengine" title="Unreal Engine"></i>' } ],
        challengesSolutions: "Rapid prototyping of core gameplay.", projectSuccess: "Platform for experimentation."
    },
    "Cycle": { 
        id: "Cycle",
        title: "Cycle",
        category: "university work",
        year: 2021,
        role: "Game Creator",
        teamSize: "Falmouth University",
        duration: "Approx. 4 months",
        video: "#", // No external link for modal, will just show image
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
        challengesSolutions: "Balancing puzzle difficulty and narrative integration.", projectSuccess: "Positive feedback on atmosphere and narrative."
    },
    "CardsWeaver": {
        id: "CardsWeaver",
        title: "Card's Weaver",
        category: "university work",
        year: 2023, // Adjust if different
        role: "Lead Game Designer",
        teamSize: "Verona University",
        image: "./assets/images/Card's Weaver.png",
        video: "https://batraf.itch.io/cards-weaver",
        isDirectLink: true,
        short: "Card-based game developed at university.",
        long: "A university project focusing on card game mechanics and design principles.",
        techStack: [{ iconHTML: '<i class="fab fa-unity" title="Unity"></i>' }]
    },
    "SoulDriven": {
        id: "SoulDriven",
        title: "Soul Driven",
        category: "university work",
        year: 2023, // Adjust if different
        role: "Game Developer",
        teamSize: "Verona University",
        image: "./assets/images/work-6.jpg",
        video: "https://fraffer.itch.io/soul-driven",
        isDirectLink: true,
        short: "Action game developed as a university project.",
        long: "A university project exploring action game development concepts.",
        techStack: [{ iconHTML: '<i class="fab fa-unity" title="Unity"></i>' }]
    },
    "Covid19Training": {
        id: "Covid19Training",
        title: "Covid 19 Training",
        category: "professional work",
        year: 2020,
        role: "Game Programmer",
        teamSize: "Cineon Training",
        image: "./assets/images/work-2.jpg",
        video: "https://cineon.training/covid-19-personal-protective-equipment-ppe-training/",
        isDirectLink: true,
        short: "VR Training simulation for PPE.",
        long: "Developed PPE training scenarios using VR technology.",
        techStack: [{ iconHTML: '<i class="fab fa-unrealengine" title="Unreal Engine"></i>' }]
    },
    "UnrealEngineCourse": {
        id: "UnrealEngineCourse",
        title: "Unreal Engine Course",
        category: "professional work",
        year: 2021,
        role: "Unreal Engine Tutor",
        teamSize: "Creativity Unleashed",
        image: "./assets/images/work-1.jpg",
        video: "https://www.udemy.com/course/complete-unreal-engine-megacourse-beginner-to-expert/",
        isDirectLink: true,
        short: "Online course for Unreal Engine.",
        long: "A 16-hour course introducing Unreal Engine Blueprints and programming structures.",
        techStack: [{ iconHTML: '<i class="fab fa-unrealengine" title="Unreal Engine"></i>' }]
    },
    "MonkHomebrew": {
        id: "MonkHomebrew",
        title: "Monk Homebrew",
        category: "personal work",
        year: 2020, 
        role: "Game Designer",
        image: "./assets/images/Monk.png",
        video: "https://drive.google.com/file/d/1cyUGRzfhP4CjVwDljmbiXhwORSPAUSpp/view?usp=sharing",
        isDirectLink: true,
        short: "D&D Homebrew content for the Monk class.",
        long: "Personal game design project creating new options for D&D.",
        techStack: [] 
    },
    "SyovaraHomebrew": {
        id: "SyovaraHomebrew",
        title: "Syovara Homebrew",
        category: "personal work",
        year: 2020, // Example, adjust
        role: "Game Designer",
        image: "./assets/images/Syovara.jpg",
        video: "https://aminoapps.com/c/officialdd/page/item/syovara/eYNM_3qQT6IK3r02BM0LpLXwL0x51XeEbEb",
        isDirectLink: true,
        short: "D&D Homebrew setting/content.",
        long: "A personal world-building and game design project for D&D.",
        techStack: []
    },
    "MaGiTeProject": {
        id: "MaGiTeProject",
        title: "MaGiTe Project",
        category: "professional work", // Or university, adjust as needed
        year: 2021, 
        role: "Game Developer",
        image: "./assets/images/Umeå_University_Resized.png",
        video: "#", 
        short: "Research project collaboration.",
        long: "Contributed to the MaGiTe research project.",
        techStack: [] 
    },
    "ProjectCenturion": {
        id: "ProjectCenturion",
        title: "Project Centurion",
        category: "university work",
        year: 2020, 
        role: "Game Designer & Developer",
        image: "./assets/images/work-4.jpg",
        video: "https://drive.google.com/file/d/1kqrXXSPwxUrCUG9qNnqnNzSuWa9S9QJv/view?usp=sharing",
        isDirectLink: true,
        short: "University game project with a historical theme.",
        long: "A game developed as part of university studies, focusing on design and development.",
        techStack: [{ iconHTML: '<i class="fab fa-unity" title="Unity"></i>'}]
    },
    "FallingFusion": {
        id: "FallingFusion",
        title: "Falling Fusion",
        category: "game jams",
        year: 2021, 
        role: "Game Designer & Developer",
        image: "./assets/images/work-8.jpg",
        video: "https://jonny5959.itch.io/falling-fusion",
        isDirectLink: true,
        short: "Game Jam entry with a fusion mechanic.",
        long: "A rapidly developed game for a game jam, focusing on core mechanics.",
        techStack: [{ iconHTML: '<i class="fab fa-unity" title="Unity"></i>'}]
    },
     "NickelNinja": {
        id: "NickelNinja",
        title: "Nickel Ninja",
        category: "game jams",
        year: 2022, 
        role: "Game Designer & Developer",
        image: "./assets/images/work-7.jpg",
        video: "https://v3.globalgamejam.org/2022/games/nickel-ninja-3",
        isDirectLink: true,
        short: "Global Game Jam 2022 entry.",
        long: "A game created during the Global Game Jam 2022.",
        techStack: [{ iconHTML: '<i class="fab fa-unity" title="Unity"></i>'}]
    }
};

// Function to render portfolio items
const renderPortfolio = (filterCategory) => {
    if (!portfolioGridContainer) {
        console.error("Portfolio grid container not found!");
        return;
    }
    portfolioGridContainer.innerHTML = ''; // Clear existing items

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
        if (!acc[year]) {
            acc[year] = [];
        }
        acc[year].push(project);
        return acc;
    }, {});

    const sortedYears = Object.keys(projectsByYear).sort((a, b) => {
        if (a === "Uncategorized") return 1; // Push "Uncategorized" to the end
        if (b === "Uncategorized") return -1;
        return b - a; // Sort numerically descending
    });

    sortedYears.forEach(year => {
        const yearHeading = document.createElement('h3');
        yearHeading.className = 'year-heading';
        yearHeading.textContent = year;
        portfolioGridContainer.appendChild(yearHeading);

        const projectListUl = document.createElement('ul');
        projectListUl.className = 'project-list grid-columns-2';
        
        projectsByYear[year].forEach(project => {
            const listItem = document.createElement('li');
            listItem.className = 'project-item active';
            listItem.dataset.category = project.category; // For potential future use, though filtering is by JS now

            const link = document.createElement('a');
            link.dataset.project = project.id; // Use unique ID for modal lookup

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
            img.src = project.image || './assets/images/placeholder.png'; // Fallback image
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
            categoryP.textContent = `${project.role || ''}${project.teamSize ? ` - ${project.teamSize}` : ''}`;
            link.appendChild(categoryP);

            const techIconsDiv = document.createElement('div');
            techIconsDiv.className = 'project-tech-icons';
            if (project.techStack && project.techStack.length > 0) {
                project.techStack.forEach(tech => {
                    const tempContainer = document.createElement('div'); // Create a temporary container
                    tempContainer.innerHTML = tech.iconHTML.trim(); // Set its innerHTML
                    techIconsDiv.appendChild(tempContainer.firstChild); // Append the actual icon element
                });
            }
            link.appendChild(techIconsDiv);
            
            listItem.appendChild(link);
            projectListUl.appendChild(listItem);
        });
        portfolioGridContainer.appendChild(projectListUl);
    });
};


// NEW PROJECT MODAL variables and functions
const projectModal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

// Event Delegation for Project Modals
if (portfolioGridContainer) {
    portfolioGridContainer.addEventListener('click', function(e) {
        const clickedLink = e.target.closest('a.open-modal');
        if (clickedLink) {
            e.preventDefault(); // Prevent default only if it's a modal link
            
            const projectId = clickedLink.dataset.project;
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
                    mediaContentHtml = `
                        <a href="${data.video}" target="_blank" rel="noopener noreferrer">
                            <img src="${data.image}" alt="${data.title}">
                        </a>`;
                } else { 
                    mediaContentHtml = `<img src="${data.image}" alt="${data.title}">`;
                }
            } else if (data.video && data.video !== "#" && (data.video.startsWith("http://") || data.video.startsWith("https://"))) {
                mediaContentHtml = `<p><a href="${data.video}" target="_blank" rel="noopener noreferrer">Watch Video / More Info</a> (Preview image not available)</p>`;
            } else {
                mediaContentHtml = `<p>No media available for this project.</p>`;
            }

            const toolIconsHtml = data.tools && data.tools.length > 0 ? data.tools.map(tool => {
                // Ensure SVGs are rendered correctly if they are part of 'icon'
                let iconContent = tool.icon || tool.name;
                if (typeof tool.icon === 'string' && tool.icon.trim().startsWith('<svg')) {
                     // Directly use the SVG string
                } else if (tool.icon) { // Assumes FontAwesome class or similar if not direct SVG
                    iconContent = tool.icon;
                }
                return `
                    <span class="tool-icon ${tool.class || ''}" title="${tool.name}">
                        ${iconContent} 
                    </span>`;
            }).join('') : '<p>N/A</p>';

            if(modalBody) {
                modalBody.innerHTML = `
                    <div class="modal-header">
                        <h3>${data.title}</h3>
                    </div>
                    <div class="modal-grid">
                        <div class="modal-media">
                            ${mediaContentHtml}
                        </div>
                        <div class="modal-details">
                            <div class="detail-item">
                                <h4>Role:</h4>
                                <p>${data.role || 'N/A'}</p>
                            </div>
                            <div class="detail-item">
                                <h4>Project Duration/Release:</h4>
                                <p>${data.duration || 'N/A'}</p>
                            </div>
                            <div class="detail-item">
                                <h4>Team/Developer:</h4>
                                <p>${data.teamSize || 'N/A'}</p>
                            </div>
                            <div class="tools-section detail-item">
                                <h4>Key Technologies:</h4>
                                <div class="tool-icons">
                                    ${toolIconsHtml}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-fulltext">
                        <div class="detail-item">
                            <h4>Project Description:</h4>
                            <p>${data.short || 'No short description available.'}</p>
                            <p>${data.long || 'No detailed description available.'}</p>
                        </div>
                        <div class="detail-item">
                            <h4>Challenges and Solutions:</h4>
                            <p>${data.challengesSolutions || 'Details not available.'}</p>
                        </div>
                        <div class="detail-item">
                            <h4>Project Success/Notes:</h4>
                            <p>${data.projectSuccess || 'Details not available.'}</p>
                        </div>
                    </div>
                `;
            }
            if (projectModal) projectModal.classList.add('active');
            document.body.classList.add('no-scroll');
        }
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
        selectItems.forEach(item => { // Changed to forEach for clarity
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

// Contact form variables and logic
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formInputs.length > 0 && formBtn) { 
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }
}

// Page navigation variables and logic
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

if (navigationLinks.length > 0 && pages.length > 0) { 
  for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", function () {
      for (let j = 0; j < pages.length; j++) { 
        if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
          pages[j].classList.add("active");
          if (pages[j].dataset.page === 'portfolio') { // Re-render portfolio when navigating to it
            renderPortfolio(selectValue ? selectValue.innerText.toLowerCase() : 'all');
          }
          window.scrollTo(0, 0);
        } else {
          pages[j].classList.remove("active");
        }
      }
      navigationLinks.forEach(link => link.classList.remove('active')); // Clear all active
      this.classList.add('active'); // Set current clicked link active
    });
  }
}