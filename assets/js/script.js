document.getElementById('theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    if(document.body.classList.contains('dark-mode')) {
        this.textContent = '[ INITIATE LIGHT_MODE ]';
    } else {
        this.textContent = '[ INITIATE DARK_MODE ]';
    }
});

// Generative Sparse Geometry Canvas
const canvas = document.getElementById('generative-canvas');
const ctx = canvas.getContext('2d');
let width, height;

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}
window.addEventListener('resize', resize);
resize();

class BlueprintNode {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.type = Math.floor(Math.random() * 3);
        this.radius = Math.random() * 120 + 20;
        this.targetRadius = this.radius;
        this.morphTimer = Math.random() * 300;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < -300 || this.x > width + 300) this.vx *= -1;
        if (this.y < -300 || this.y > height + 300) this.vy *= -1;
        this.morphTimer++;
        if (this.morphTimer > 500) {
            this.morphTimer = 0;
            if (Math.random() > 0.5) this.type = Math.floor(Math.random() * 3);
            this.targetRadius = Math.random() * 180 + 20;
        }
        this.radius += (this.targetRadius - this.radius) * 0.005;
    }
    draw(ctx, isDark, baseAlpha) {
        ctx.strokeStyle = isDark ? `rgba(255,255,255,${baseAlpha})` : `rgba(17,17,17,${baseAlpha})`;
        ctx.lineWidth = 1;
        if (this.type === 1) { 
            ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.stroke();
            ctx.fillStyle = ctx.strokeStyle;
            ctx.beginPath(); ctx.arc(this.x, this.y, 2, 0, Math.PI * 2); ctx.fill();
        } else if (this.type === 2) { 
            ctx.beginPath();
            ctx.moveTo(this.x - this.radius, this.y); ctx.lineTo(this.x + this.radius, this.y);
            ctx.moveTo(this.x, this.y - this.radius); ctx.lineTo(this.x, this.y + this.radius);
            ctx.stroke();
            ctx.setLineDash([2, 6]);
            ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.stroke();
            ctx.setLineDash([]);
        } else {
            ctx.fillStyle = ctx.strokeStyle;
            ctx.beginPath(); ctx.arc(this.x, this.y, 4, 0, Math.PI * 2); ctx.fill();
        }
    }
}

const numNodes = 10;
const nodes = [];
for(let i=0; i<numNodes; i++) nodes.push(new BlueprintNode());

function animate() {
    ctx.clearRect(0, 0, width, height);
    const isDark = document.body.classList.contains('dark-mode');
    const baseAlpha = 0.15;
    nodes.forEach(n => n.update());
    ctx.strokeStyle = isDark ? `rgba(255,255,255,${baseAlpha * 0.6})` : `rgba(17,17,17,${baseAlpha * 0.6})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(nodes[0].x, nodes[0].y);
    for (let i = 1; i < nodes.length; i++) ctx.lineTo(nodes[i].x, nodes[i].y);
    ctx.closePath(); ctx.stroke();
    ctx.fillStyle = isDark ? `rgba(255,255,255,0.02)` : `rgba(17,17,17,0.02)`;
    ctx.fill();
    ctx.beginPath();
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x; const dy = nodes[i].y - nodes[j].y;
            if (Math.sqrt(dx*dx + dy*dy) < 450) {
                ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y);
            }
        }
    }
    ctx.stroke();
    ctx.strokeStyle = isDark ? `rgba(255,255,255,${baseAlpha * 0.4})` : `rgba(17,17,17,${baseAlpha * 0.4})`;
    ctx.setLineDash([4, 12]);
    ctx.beginPath();
    for (let i = 0; i < 3; i++) {
        ctx.moveTo(0, nodes[i].y); ctx.lineTo(width, nodes[i].y);
        ctx.moveTo(nodes[i].x, 0); ctx.lineTo(nodes[i].x, height);
    }
    ctx.stroke();
    ctx.setLineDash([]);
    nodes.forEach(n => n.draw(ctx, isDark, baseAlpha));
    requestAnimationFrame(animate);
}
animate();

// --- PORTFOLIO LOGIC ---

// Data
const projectDetails = {
    "ProjectCadence": {
        id: "ProjectCadence",
        title: "Project: Cadence",
        category: "personal work",
        roles:["Technical Game Designer", "Game Designer"],
        year: 2025,
        image: "./assets/images/ProjectCadence.png",
        short: "A C++ Unreal Engine plugin that uses Metasound to drive rhythm-based gameplay events.",
        long: "Project Cadence started from a question on a bus: could osu beatmap timestamps actually drive gameplay events in Unreal Engine? The answer is the plugin. A C++ timeline driven by Metasound, separating timing data from behavior so the same beatmap can power completely different game genres.",
        roleContributions: {
            "Game Designer": "<p><b>Design Philosophy:</b> Designed the system around one principle: music should drive gameplay, not accompany it.</p>",
            "Technical Game Designer": "<p><b>Core Architecture:</b> C++ timeline driven by Metasound. Python parser extracts osu beatmap data into DataTables.</p>"
        }
    },
    "ProjectSasha": {
        id: "ProjectSasha",
        title: "Project: Sasha",
        category: "personal work",
        roles: ["Game Designer", "Technical Game Designer"],
        year: 2025,
        image: "./assets/images/ProjectSasha.svg",
        short: "A top-down exploration game where scanning IS the entire game.",
        long: "Project Sasha is built around a single mechanic—scanning—that drives exploration, combat, and progression. You control an android navigating a brutalist megastructure.",
        roleContributions: {
            "Game Designer": "<p><b>Systemic Narrative:</b> Designed a cohesive economy where knowledge is the resource.</p>",
            "Technical Game Designer": "<p><b>Scanning Algorithms:</b> Built the core scanning mechanic using BFS Waves constrained by radius.</p>"
        }
    },
    "CRTexe": {
        id: "CRTexe",
        title: "CRT.exe (Game Jam)",
        category: "game jams",
        roles: ["Leadership", "Game Designer"],
        year: 2026,
        image: "./assets/images/CRTexe.svg",
        short: "Led a team of 8 through a game jam by designing the game around how the team could actually function.",
        long: "CRT.exe is a puzzle-exploration game built during Brackeys Game Jam 2026.1. On a team of 8 with strong independent personalities, I designed the game structure specifically to give each person full ownership of one piece.",
        roleContributions: {
            "Leadership": "<p><b>Team Structure:</b> Diagnosed what would make this specific team functional and built the production structure around it.</p>",
            "Game Designer": "<p><b>Systems Design:</b> Designed a gameplay loop where the structure of the game was also the structure of the team.</p>"
        }
    },
    "HighOnLife": {
        id: "HighOnLife",
        title: "High on Life (Port)",
        category: "professional work",
        roles:["Game Programmer", "Technical Game Designer"],
        year: 2025,
        image: "./assets/images/HighOnLife.png",
        short: "Nintendo Switch port of High on Life. Deep C++ and Blueprint debugging.",
        long: "Porting a game as large and technically complex as High on Life to the Switch meant wearing a lot of hats. The role evolved from programmer to de facto system archaeologist.",
        roleContributions: {
            "Game Programmer": "<p><b>Deep-Level Debugging:</b> Fixed critical C++ and Blueprint bugs.</p>",
            "Technical Game Designer": "<p><b>Tool Development:</b> Extended the cheat manager UI with Switch performance monitoring stats.</p>"
        }
    },
    "Cycle": {
        id: "Cycle",
        title: "Cycle",
        category: "university work",
        roles: ["Leadership", "Game Designer", "Game Programmer"],
        year: 2021,
        image: "./assets/images/Cycle.png",
        short: "Best 3rd Year Videogame at Falmouth University 2021.",
        long: "Cycle is a surrealist puzzle-adventure about retrieving the phases of a day and returning them to a world stuck in a single moment.",
        roleContributions: {
            "Game Programmer": "<p><b>Sole Programmer:</b> Built every system in Unreal Engine 4 from scratch on an engine I had never used before.</p>"
        }
    }
};

// Tabs Logic
const navTabs = document.querySelectorAll('.nav-tab');
const sections = document.querySelectorAll('.sys-section');

navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        navTabs.forEach(t => t.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.target).classList.add('active');
    });
});

// Render Portfolio Grid
const gridContainer = document.getElementById('portfolio-grid-container');
const filterBtns = document.querySelectorAll('.filter-btn');

function renderGrid(filter = 'all') {
    gridContainer.innerHTML = '';
    Object.values(projectDetails).forEach(proj => {
        if (filter !== 'all' && proj.category !== filter) return;
        
        const card = document.createElement('div');
        card.className = 'data-module';
        card.innerHTML = `
            <div class="module-img-box">
                <img src="${proj.image}" alt="${proj.title}">
            </div>
            <div class="module-category">[ ${proj.category} ]</div>
            <h3 class="module-title">${proj.title}</h3>
            <div class="module-roles">
                ${proj.roles.map(r => `<span class="module-role">${r}</span>`).join('')}
            </div>
        `;
        card.addEventListener('click', () => openModal(proj));
        gridContainer.appendChild(card);
    });
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderGrid(btn.dataset.filter);
    });
});

renderGrid();

// Modal Logic
const modal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');

function openModal(proj) {
    let rolesHtml = Object.entries(proj.roleContributions || {}).map(([role, text]) => `
        <div class="wf-roles-box">
            <h3>> ROLE: ${role}</h3>
            ${text}
        </div>
    `).join('');

    modalBody.innerHTML = `
        <div class="wf-modal-header">
            <h2 class="wf-modal-title">${proj.title}</h2>
            <div class="wf-modal-meta">[ YEAR: ${proj.year} ] // [ CATEGORY: ${proj.category.toUpperCase()} ]</div>
        </div>
        <div class="wf-modal-body">
            <div class="wf-media-container">
                <img src="${proj.image}" alt="${proj.title}">
            </div>
            <div class="wf-text-content">
                <h4>// SYNOPSIS</h4>
                <p>${proj.long}</p>
                <br>
                ${rolesHtml}
            </div>
        </div>
    `;
    modal.classList.add('active');
}

modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
});