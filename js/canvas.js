// ====================================
// CANVAS ANIMATIONS
// ====================================

// Hero Canvas Animation
function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;
    
    // Set canvas size
    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        
        // Limit DPR for better performance
        const maxDPR = 2;
        const effectiveDPR = Math.min(dpr, maxDPR);
        
        canvas.width = rect.width * effectiveDPR;
        canvas.height = rect.height * effectiveDPR;
        ctx.scale(effectiveDPR, effectiveDPR);
        
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';
    }
    
    resizeCanvas();
    
    // Debounced resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resizeCanvas();
            initParticles();
        }, 250);
    });
    
    // Particle class
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Wrap around edges
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.5})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Initialize particles with optimized count
    function initParticles() {
        particles = [];
        // Reduced particle count for better performance
        const particleCount = Math.floor((canvas.width * canvas.height) / 20000);
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    // Draw connections between nearby particles - optimized
    function drawConnections() {
        const maxDistance = 120; // Reduced from 150
        
        // Limit connection checks for performance
        for (let i = 0; i < particles.length; i++) {
            let connectionCount = 0;
            const maxConnections = 3; // Limit connections per particle
            
            for (let j = i + 1; j < particles.length; j++) {
                if (connectionCount >= maxConnections) break;
                
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    const opacity = (1 - distance / maxDistance) * 0.08;
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    connectionCount++;
                }
            }
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        drawConnections();
        
        animationFrameId = requestAnimationFrame(animate);
    }
    
    initParticles();
    animate();
    
    // Mouse interaction - throttled for performance
    let mouseX = 0;
    let mouseY = 0;
    let lastMouseUpdate = 0;
    const mouseThrottle = 50; // Update every 50ms
    
    canvas.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastMouseUpdate < mouseThrottle) return;
        lastMouseUpdate = now;
        
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        
        // Attract nearby particles - reduced effect
        particles.forEach(particle => {
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 80) {
                particle.speedX += dx * 0.00005;
                particle.speedY += dy * 0.00005;
            }
        });
    });
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    });
}

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroCanvas);
} else {
    initHeroCanvas();
}

// ====================================
// GRADIENT ANIMATION
// ====================================
function initGradientAnimation() {
    const gradientElements = document.querySelectorAll('.animated-gradient-bg');
    
    gradientElements.forEach(element => {
        let hue = 0;
        
        function updateGradient() {
            hue = (hue + 0.5) % 360;
            element.style.background = `
                linear-gradient(
                    ${hue}deg,
                    rgba(192, 192, 192, 0.1) 0%,
                    rgba(168, 168, 168, 0.05) 50%,
                    rgba(192, 192, 192, 0.1) 100%
                )
            `;
            requestAnimationFrame(updateGradient);
        }
        
        updateGradient();
    });
}

// ====================================
// FLOATING SHAPES BACKGROUND
// ====================================
function initFloatingShapes() {
    const containers = document.querySelectorAll('[data-floating-shapes]');
    
    containers.forEach(container => {
        const shapeCount = 5;
        
        for (let i = 0; i < shapeCount; i++) {
            const shape = document.createElement('div');
            shape.className = 'floating-shape';
            shape.style.cssText = `
                position: absolute;
                width: ${Math.random() * 300 + 100}px;
                height: ${Math.random() * 300 + 100}px;
                border-radius: ${Math.random() * 50}%;
                background: radial-gradient(circle, rgba(192, 192, 192, 0.05) 0%, transparent 70%);
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 10 + 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
                pointer-events: none;
                z-index: 0;
            `;
            container.appendChild(shape);
        }
    });
}

// Initialize if data attribute exists
if (document.querySelector('[data-floating-shapes]')) {
    initFloatingShapes();
}
