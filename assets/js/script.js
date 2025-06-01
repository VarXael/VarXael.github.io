'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// REMOVED: sidebar variables and toggle functionality
// const sidebar = document.querySelector("[data-sidebar]");
// const sidebarBtn = document.querySelector("[data-sidebar-btn]");
// sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// testimonials variables (for old testimonials modal)
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable (for old testimonials modal)
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function (for old testimonials modal)
const testimonialsModalFunc = function () {
  if (modalContainer && overlay) { // Check if elements exist
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }
}

// add click event to all modal items (for old testimonials modal)
if (testimonialsItem.length > 0 && modalImg && modalTitle && modalText) {
  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
      testimonialsModalFunc();
    });
  }
}

// add click event to modal close button (for old testimonials modal)
if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
if (overlay) overlay.addEventListener("click", testimonialsModalFunc);


// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// add event in all select items
if (selectItems.length > 0 && selectValue && select) {
    for (let i = 0; i < selectItems.length; i++) {
      selectItems[i].addEventListener("click", function () {
        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);
      });
    }
}


// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn.length > 0 ? filterBtn[0] : null;

if (lastClickedBtn) { // Ensure lastClickedBtn is not null
    for (let i = 0; i < filterBtn.length; i++) {
      filterBtn[i].addEventListener("click", function () {
        let selectedValue = this.innerText.toLowerCase();
        if (selectValue) selectValue.innerText = this.innerText; // Check if selectValue exists
        filterFunc(selectedValue);

        if (lastClickedBtn) lastClickedBtn.classList.remove("active"); // Check if lastClickedBtn exists
        this.classList.add("active");
        lastClickedBtn = this;
      });
    }
}


// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
if (form && formInputs.length > 0 && formBtn) { // Check if elements exist
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      // check form validation
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }
}


// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
if (navigationLinks.length > 0 && pages.length > 0) { // Check if elements exist
  for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", function () {
      for (let j = 0; j < pages.length; j++) { 
        if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
          pages[j].classList.add("active");
          window.scrollTo(0, 0);
        } else {
          pages[j].classList.remove("active");
        }
      }
      for (let k = 0; k < navigationLinks.length; k++) {
        if (navigationLinks[k] === this) {
            navigationLinks[k].classList.add("active");
        } else {
            navigationLinks[k].classList.remove("active");
        }
      }
    });
  }
}


// ── PROJECT MODAL ──

const projectLinks = document.querySelectorAll('.open-modal');
const projectModal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

// SVG icons for Fortnite and Verse
const fortniteIcon = `
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM12 6c-2.21 0-4 1.79-4 4 0 1.5.83 2.81 2 3.5V16h4v-2.5c1.17-.69 2-2 2-3.5 0-2.21-1.79-4-4-4zM12 8c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"/>
    </svg>
`; 
const verseIcon = `
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9V7h2v10zm4 0h-2V7h2v10z"/>
    </svg>
`; 

// Project details object
const projectDetails = {
    // REMOVED: "UEFN Battleship Temp Clone"
    "UEFN: Battleship": {
        title: "UEFN: Battleship",
        role: "Game Creator - Untold Games",
        duration: "6 months",
        teamSize: "2 (1 Designer, 1 Programmer)", 
        video: "https://www.fortnite.com/@untoldgames/1028-2740-2494",
        image: "./assets/images/Battleship.jpeg",
        short: "Fast-paced team strategy game built in UEFN. Inspired by the classic Battleship board game.",
        long: "This project was developed using Unreal Editor for Fortnite, with extensive use of Verse scripting for match logic and grid system management. Designed for replayability and rapid iteration in a live environment.",
        tools: [
            { name: "Fortnite (UEFN)", icon: fortniteIcon, class: "fortnite" },
            { name: "Verse Scripting", icon: verseIcon, class: "verse" }
        ],
        challengesSolutions: "Implementing a robust grid-based combat system with real-time feedback was challenging. We overcame this by modularizing Verse scripts for each grid cell and optimizing network replication for projectile hits and explosions.",
        projectSuccess: "The game achieved over 100,000 unique players within the first month of release and received positive community feedback for its unique blend of strategy and arcade action."
    },
    "PulseParty": {
        title: "PulseParty",
        role: "Technical Game Designer - Untold Games",
        duration: "3 months",
        teamSize: "3 (1 Designer, 1 Programmer, 1 Artist)", 
        video: "https://www.fortnite.com/@untoldgames/8369-2685-8749", 
        image: "./assets/images/PulsePartyThumbnail.png", 
        short: "A rhythm-based multiplayer game using custom Verse logic and dynamic lighting.",
        long: "My responsibilities included game mechanics prototyping, optimization of network performance and dynamic tempo sync with music tracks.",
        tools: [
            { name: "Verse Scripting", icon: verseIcon, class: "verse" },
            { name: "Fortnite (UEFN)", icon: fortniteIcon, class: "fortnite" } 
        ],
        challengesSolutions: "Synchronizing dynamic lighting and visual effects precisely with music tempo across multiple clients presented a significant hurdle. We developed a custom audio analysis system in Verse to extract beat data and drive visual cues, ensuring a seamless experience for all players.",
        projectSuccess: "PulseParty was featured in a community spotlight, praised for its innovative rhythm mechanics and immersive atmosphere. It fostered a small but dedicated player base."
    },
    "Cycle": { 
        title: "Cycle",
        role: "Game Creator - Falmouth University",
        duration: "University Project (Approx. 4 months)",
        teamSize: "Solo Project",
        video: "#", 
        image: "./assets/images/Cycle.png",
        short: "A narrative-driven puzzle game exploring themes of repetition and memory.",
        long: "Developed as part of my university coursework, Cycle focuses on environmental storytelling and intricate puzzle design. The game challenges players to uncover a hidden story by interacting with a dynamically changing environment.",
        tools: [
            { name: "Unity", icon: '<i class="fab fa-unity"></i>', class: "unity" }, 
            { name: "C#", icon: '<i class="fas fa-code"></i>', class: "csharp" } 
        ],
        challengesSolutions: "Creating puzzles that were both challenging and intuitive, while seamlessly integrating them with the narrative, was a key focus. Iterative design and playtesting were crucial to achieving this balance.",
        projectSuccess: "Received positive feedback for its atmospheric design and thought-provoking narrative during university showcases."
    }
};

// Event listener setup for project links
if (projectLinks.length > 0 && projectModal && modalBody && modalClose) {
    projectLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();

            const title = link.dataset.project;
            const data = projectDetails[title];
            if (!data) {
                console.error("Project data not found for:", title);
                modalBody.innerHTML = `<p>Details for this project are not available.</p>`;
                projectModal.classList.add('active');
                document.body.classList.add('no-scroll');
                return;
            }

            let mediaContentHtml = '';

            // SIMPLIFIED MEDIA LOGIC: Always link image if video URL exists, otherwise just show image.
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
                mediaContentHtml = `<p><a href="${data.video}" target="_blank" rel="noopener noreferrer">Watch Video</a> (Preview image not available)</p>`;
            } else {
                mediaContentHtml = `<p>No media available for this project.</p>`;
            }


            const toolIconsHtml = data.tools && data.tools.length > 0 ? data.tools.map(tool => {
                return `
                    <span class="tool-icon ${tool.class || ''}" title="${tool.name}">
                        ${tool.icon || tool.name}
                    </span>
                `;
            }).join('') : '<p>N/A</p>';


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
                            <h4>Project Duration:</h4>
                            <p>${data.duration || 'N/A'}</p>
                        </div>
                        <div class="detail-item">
                            <h4>Team Size:</h4>
                            <p>${data.teamSize || 'N/A'}</p>
                        </div>
                        <div class="tools-section detail-item">
                            <h4>Tools:</h4>
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
                        <h4>Project Success:</h4>
                        <p>${data.projectSuccess || 'Details not available.'}</p>
                    </div>
                </div>
            `;

            projectModal.classList.add('active');
            document.body.classList.add('no-scroll'); 
        });
    });

    modalClose.addEventListener('click', () => {
        projectModal.classList.remove('active');
        document.body.classList.remove('no-scroll'); 
        modalBody.innerHTML = ''; 
    });

    projectModal.addEventListener('click', e => {
        if (e.target === projectModal) { 
            projectModal.classList.remove('active');
            document.body.classList.remove('no-scroll'); 
            modalBody.innerHTML = ''; 
        }
    });
}