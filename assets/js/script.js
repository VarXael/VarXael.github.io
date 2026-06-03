'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. THE ONE-WAY GATE LOGIC ---
    const gate = document.getElementById('welcome-gate');
    let gateUnlocked = false;

    function unlockGate() {
        if (gateUnlocked) return;
        gateUnlocked = true;
        
        // Lock to top immediately so there is no weird jumping
        window.scrollTo(0, 0);

        // Cinematic fade and scale
        gate.style.opacity = '0';
        gate.style.transform = 'scale(1.05)';
        
        // Unlock the body scrolling
        document.body.style.overflowY = 'auto';

        // Destroy the gate node so the user cannot scroll back "up" to it
        setTimeout(() => {
            gate.style.display = 'none';
        }, 1000);
    }

    // Trigger on any intent to proceed
    window.addEventListener('wheel', unlockGate, { once: true });
    window.addEventListener('click', unlockGate, { once: true });
    window.addEventListener('touchstart', unlockGate, { once: true });


    // --- 2. THE DUST / ASH PARTICLE SYSTEM ---
    const canvas = document.getElementById('ash-canvas');
    if(canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        for(let i = 0; i < 150; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.5 + 0.5,
                vx: (Math.random() - 0.5) * 0.5,
                vy: Math.random() * 0.5 + 0.2
            });
        }

        function animateAsh() {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = 'rgba(212, 175, 55, 0.4)'; // Gold-tinted ash

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.y > height) { p.y = -10; p.x = Math.random() * width; }
                if (p.x > width) p.x = 0;
                if (p.x < 0) p.x = width;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();
            });
            requestAnimationFrame(animateAsh);
        }
        animateAsh();
    }
});