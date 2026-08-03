// ====================================
// MAIN JAVASCRIPT - SPEEDIFY TECH X
// ====================================
'use strict';

/* ─── Google Apps Script URL ─── */
// Updated Google Apps Script URL - Connected to SpeedifyTechX Spreadsheet
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyr8ZSYTZoxJlwyzmyusGIQhU29PFExBhXpjchvE7QdFdwiP2c9x-DtgpOA-X1cnec3/exec';

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    initializeNavigation();
    initializeScrollProgress();
    initializeForms();
    initializeLazyLoading();
    initScrollFadeIn();
    
    // Ensure page is visible (fix for back button)
    document.body.style.opacity = '1';
    document.body.style.overflow = '';
});

// Handle page visibility on back/forward navigation
window.addEventListener('pageshow', (event) => {
    // Force page to be visible
    document.body.style.opacity = '1';
    document.body.style.overflow = '';
    
    // Remove any active transitions
    const pageTransition = document.querySelector('.page-transition');
    if (pageTransition) {
        pageTransition.classList.remove('active');
    }
});

/* ─── 1. SCROLL FADE-IN ─── */
function initScrollFadeIn() {
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    
    document.querySelectorAll('.fade-in').forEach((el) => fadeObserver.observe(el));
}


// ====================================
// NAVIGATION
// ====================================
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navLinkItems = navLinks.querySelectorAll('.nav-link');
    
    // Scroll behavior with enhanced effects
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class with shadow
        if (currentScroll > 60) {
            navbar.classList.add('scrolled');
            navbar.style.boxShadow = '0 4px 32px rgba(192, 192, 192, 0.08)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
        highlightActiveNavLink();
    });
    
    // Highlight active nav link based on scroll position
    function highlightActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY + 100;
        
        sections.forEach((sec) => {
            const id = sec.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${id}"]`);
            if (link) {
                if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
                    link.style.color = 'var(--primary-silver)';
                } else {
                    link.style.color = '';
                }
            }
        });
    }
    
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', navLinks.classList.contains('active'));
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu on link click
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinkItems.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const top = target.getBoundingClientRect().top + window.scrollY - (navbar ? navbar.offsetHeight : 72);
                window.scrollTo({ top, behavior: 'smooth' });
                
                // Close mobile menu if open
                if (hamburger) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            }
        });
    });
}

// ====================================
// SCROLL PROGRESS
// ====================================
function initializeScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        });
    }
}

// ====================================
// FORMS - ENHANCED WITH GOOGLE APPS SCRIPT
// ====================================
function initializeForms() {
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            // Simulate API call
            setTimeout(() => {
                alert('Thank you for subscribing!');
                newsletterForm.reset();
            }, 500);
        });
    }
    
    // Contact form with Google Apps Script integration
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    
    if (contactForm && submitBtn) {
        // Create response message element
        let responseMessage = document.getElementById('responseMessage');
        if (!responseMessage) {
            responseMessage = document.createElement('div');
            responseMessage.id = 'responseMessage';
            responseMessage.style.cssText = 'display:none;margin-top:16px;font-family:var(--font-primary);font-size:14px;font-weight:600;padding:12px 16px;border-radius:10px;text-align:center';
            contactForm.appendChild(responseMessage);
        }
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name')?.value.trim() || '';
            const email = document.getElementById('email')?.value.trim() || '';
            const phone = document.getElementById('phone')?.value.trim() || '';
            const subject = document.getElementById('subject')?.value.trim() || '';
            const message = document.getElementById('message')?.value.trim() || '';
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                responseMessage.style.display = 'block';
                responseMessage.style.color = '#FF4D6A';
                responseMessage.style.background = 'rgba(255,77,106,0.1)';
                responseMessage.style.border = '1px solid rgba(255,77,106,0.25)';
                responseMessage.innerHTML = '&#x274C; Please fill in all required fields.';
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                responseMessage.style.display = 'block';
                responseMessage.style.color = '#FF4D6A';
                responseMessage.style.background = 'rgba(255,77,106,0.1)';
                responseMessage.style.border = '1px solid rgba(255,77,106,0.25)';
                responseMessage.innerHTML = '&#x274C; Please enter a valid email address.';
                return;
            }
            
            // Loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending...';
            
            // Use hidden iframe method to bypass CORS
            const iframe = document.createElement('iframe');
            iframe.name = 'hidden_iframe';
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
            
            const hiddenForm = document.createElement('form');
            hiddenForm.method = 'POST';
            hiddenForm.action = SCRIPT_URL;
            hiddenForm.target = 'hidden_iframe';
            hiddenForm.style.display = 'none';
            
            const fields = {
                name: name,
                email: email,
                phone: phone,
                subject: subject,
                message: message,
                timestamp: new Date().toLocaleString()
            };
            
            Object.entries(fields).forEach(([key, val]) => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = val;
                hiddenForm.appendChild(input);
            });
            
            document.body.appendChild(hiddenForm);
            
            // Show success after 2s
            setTimeout(() => {
                responseMessage.style.display = 'block';
                responseMessage.style.color = '#00B974';
                responseMessage.style.background = 'rgba(0,185,116,0.1)';
                responseMessage.style.border = '1px solid rgba(0,185,116,0.25)';
                responseMessage.innerHTML = '&#x2705; Message sent successfully! We\'ll get back to you soon.';
                
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Message <i data-lucide="send"></i>';
                
                // Reinitialize Lucide icons for the button
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
                
                // Cleanup
                document.body.removeChild(hiddenForm);
                document.body.removeChild(iframe);
                
                // Hide message after 5s
                setTimeout(() => {
                    responseMessage.style.display = 'none';
                }, 5000);
            }, 2000);
            
            hiddenForm.submit();
        });
    }
}

// ====================================
// LAZY LOADING
// ====================================
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}



// ====================================
// UTILITY FUNCTIONS
// ====================================

// Smooth scroll to element
function smoothScrollTo(target, duration = 1000) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;
    
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}


// ====================================
// LIGHTBOX FUNCTIONALITY
// ====================================
function openLightbox(imageSrc, caption = '') {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    
    if (lightbox && lightboxImg) {
        lightboxImg.src = imageSrc;
        lightboxCaption.textContent = caption;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Fade in animation
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    
    if (lightbox) {
        lightbox.style.opacity = '0';
        document.body.style.overflow = '';
        
        // Wait for fade out animation
        setTimeout(() => {
            lightbox.style.display = 'none';
        }, 300);
    }
}

// Close lightbox on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// ====================================
// FINAL INITIALIZATION
// ====================================
// Ensure icons are loaded when page is fully ready
window.addEventListener('load', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});