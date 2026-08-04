// ====================================
// GSAP ANIMATIONS - SCROLL ANIMATIONS DISABLED
// ====================================

// Wait for GSAP to load
window.addEventListener('load', () => {
    if (typeof gsap !== 'undefined') {
        initGSAPAnimations();
    }
});

function initGSAPAnimations() {
    // Register ScrollTrigger plugin
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
    
    // ===== NO SCROLL REVEAL ANIMATIONS =====
    // All content is visible immediately
    // Only hero sections animate on page load
    
    // Animate hero content on page load only
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } });
        timeline
            .fromTo('.hero-title', 
                { opacity: 0, y: 30 }, 
                { opacity: 1, y: 0, duration: 0.8 }, 0.2)
            .fromTo('.hero-subtitle', 
                { opacity: 0, y: 20 }, 
                { opacity: 1, y: 0, duration: 0.8 }, 0.4)
            .fromTo('.hero-actions', 
                { opacity: 0, y: 20 }, 
                { opacity: 1, y: 0, duration: 0.8 }, 0.6);
    }
    
    // Animate hero visual on page load only
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        gsap.fromTo(heroVisual,
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 1, delay: 0.4, ease: 'power2.out' }
        );
    }

    // Parallax effect for hero background
    const heroCanvas = document.getElementById('heroCanvas');
    if (heroCanvas) {
        gsap.to(heroCanvas, {
            y: '20%',
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });
    }
    
    // Animate page hero on page load only (inner pages)
    const pageHeroContent = document.querySelector('.page-hero-content');
    if (pageHeroContent) {
        const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } });
        timeline
            .fromTo('.breadcrumb', 
                { opacity: 0, x: -20 }, 
                { opacity: 1, x: 0, duration: 0.5 }, 0.1)
            .fromTo('.page-hero-icon', 
                { opacity: 0, scale: 0 }, 
                { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' }, 0.2)
            .fromTo('.page-hero h1', 
                { opacity: 0, y: 30 }, 
                { opacity: 1, y: 0, duration: 0.7 }, 0.3)
            .fromTo('.page-hero p', 
                { opacity: 0, y: 20 }, 
                { opacity: 1, y: 0, duration: 0.7 }, 0.4);
    }
    
    const pageHeroMascot = document.querySelector('.page-hero-mascot');
    if (pageHeroMascot) {
        gsap.fromTo(pageHeroMascot,
            { opacity: 0, x: 50 },
            { opacity: 1, x: 0, duration: 0.8, delay: 0.4, ease: 'power2.out' }
        );
    }
    
    // Animate stats counters
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent.trim();
        
        // Skip values that can't be simply animated (24/7, text-only values)
        if (finalValue.includes('/') || isNaN(parseInt(finalValue.replace(/\D/g, '')))) return;
        
        const isPercentage = finalValue.includes('%');
        const isMs = finalValue.includes('ms');
        const hasPlus = finalValue.includes('+');
        const numericValue = parseInt(finalValue.replace(/\D/g, ''));
        
        if (!numericValue) return;
        
        gsap.fromTo(stat,
            { textContent: 0 },
            {
                textContent: numericValue,
                duration: 1.5,
                ease: 'power2.out',
                snap: { textContent: 1 },
                scrollTrigger: {
                    trigger: stat,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                onUpdate: function() {
                    const current = Math.floor(this.targets()[0].textContent);
                    if (isPercentage) stat.textContent = current + '%';
                    else if (isMs)   stat.textContent = current + 'ms';
                    else if (hasPlus) stat.textContent = current + '+';
                    else              stat.textContent = current;
                },
                onComplete: function() {
                    // Restore exact original value to avoid rounding issues
                    stat.textContent = finalValue;
                }
            }
        );
    });
}
