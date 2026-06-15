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

// Complex Morphing Architectural Geometry
class BlueprintNode {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.3; // Very slow drift
        this.vy = (Math.random() - 0.5) * 0.3;
        this.type = Math.floor(Math.random() * 3); // 0: dot, 1: circle, 2: crosshair
        this.radius = Math.random() * 120 + 20;
        
        // Morphing targets
        this.targetRadius = this.radius;
        this.morphTimer = Math.random() * 300;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Gently bounce off edges with a wide margin to allow partial off-screen drift
        if (this.x < -300 || this.x > width + 300) this.vx *= -1;
        if (this.y < -300 || this.y > height + 300) this.vy *= -1;
        
        // Morphing logic
        this.morphTimer++;
        if (this.morphTimer > 500) { // Roughly every 8 seconds
            this.morphTimer = 0;
            // Random chance to change type (dot, circle, or blueprint crosshair)
            if (Math.random() > 0.5) {
                this.type = Math.floor(Math.random() * 3);
            }
            // Pick a new size to morph into
            this.targetRadius = Math.random() * 180 + 20;
        }
        
        // Smoothly interpolate radius (this makes circles and crosshairs grow/shrink dynamically)
        this.radius += (this.targetRadius - this.radius) * 0.005;
    }

    draw(ctx, isDark, baseAlpha) {
        ctx.strokeStyle = isDark ? `rgba(255,255,255,${baseAlpha})` : `rgba(17,17,17,${baseAlpha})`;
        ctx.lineWidth = 1;
        
        if (this.type === 1) { 
            // Morphing Circle
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.stroke();
            
            // Center focal point
            ctx.fillStyle = ctx.strokeStyle;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fill();
        } else if (this.type === 2) { 
            // Architectural Crosshair
            ctx.beginPath();
            ctx.moveTo(this.x - this.radius, this.y);
            ctx.lineTo(this.x + this.radius, this.y);
            ctx.moveTo(this.x, this.y - this.radius);
            ctx.lineTo(this.x, this.y + this.radius);
            ctx.stroke();
            
            // Faint outer bounds
            ctx.setLineDash([2, 6]);
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);
        } else {
            // Minimal Point
            ctx.fillStyle = ctx.strokeStyle;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

// Instantiate the drafting network
const numNodes = 10;
const nodes = [];
for(let i=0; i<numNodes; i++) {
    nodes.push(new BlueprintNode());
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    const isDark = document.body.classList.contains('dark-mode');
    const baseAlpha = 0.15; // Visibility
    
    // 1. Update all nodes
    nodes.forEach(n => n.update());
    
    // 2. Draw the primary morphing macro-structure (A continuous polygon connecting all nodes)
    ctx.strokeStyle = isDark ? `rgba(255,255,255,${baseAlpha * 0.6})` : `rgba(17,17,17,${baseAlpha * 0.6})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(nodes[0].x, nodes[0].y);
    for (let i = 1; i < nodes.length; i++) {
        ctx.lineTo(nodes[i].x, nodes[i].y);
    }
    ctx.closePath();
    ctx.stroke();

    // Fill the massive polygon with a nearly invisible tint to give a "glass pane" overlapping feel
    ctx.fillStyle = isDark ? `rgba(255,255,255,0.02)` : `rgba(17,17,17,0.02)`;
    ctx.fill();
    
    // 3. Draw dynamic secondary struts (interconnecting lines when nodes drift close)
    ctx.beginPath();
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            if (dist < 450) { // Connect if drifting into proximity
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
            }
        }
    }
    ctx.stroke();
    
    // 4. Draw architectural laser drafting lines extending to infinity from a few key nodes
    ctx.strokeStyle = isDark ? `rgba(255,255,255,${baseAlpha * 0.4})` : `rgba(17,17,17,${baseAlpha * 0.4})`;
    ctx.setLineDash([4, 12]); // Dotted drafting style
    ctx.beginPath();
    for (let i = 0; i < 3; i++) { // Only from the first 3 nodes so it's not overwhelming
        ctx.moveTo(0, nodes[i].y);
        ctx.lineTo(width, nodes[i].y);
        ctx.moveTo(nodes[i].x, 0);
        ctx.lineTo(nodes[i].x, height);
    }
    ctx.stroke();
    ctx.setLineDash([]); // Reset dashes
    
    // 5. Finally, draw the morphing nodes themselves on top
    nodes.forEach(n => n.draw(ctx, isDark, baseAlpha));
    
    requestAnimationFrame(animate);
}

animate();