/* =============================================================
   Speedify Tech X — script.js
   ============================================================= */

'use strict';

/* ─── Google Apps Script URL ─── */
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzUUvZPzBj4A3n3MQjDeefiY4C6wYuSMpjFJZ3uUZSV4RKsrCuMH66zH5LHEBLDoBDc0Q/exec';


/* ─── 1. SCROLL FADE-IN ─── */
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('.fade-in').forEach((el) => fadeObserver.observe(el));


/* ─── 2. NAVBAR ─── */
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.boxShadow = '0 4px 32px rgba(30,144,255,0.08)';
    nav.classList.add('scrolled');
  } else {
    nav.style.boxShadow = 'none';
    nav.classList.remove('scrolled');
  }
  highlightActiveNavLink();
});

function highlightActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 100;
  sections.forEach((sec) => {
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-menu a[href="#${id}"]`);
    if (link) {
      link.style.color = (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight)
        ? 'var(--blue)' : '';
    }
  });
}


/* ─── 3. SMOOTH SCROLL ─── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - (nav ? nav.offsetHeight : 72);
      window.scrollTo({ top, behavior: 'smooth' });
      closeMobileMenu();
    }
  });
});


/* ─── 4. MOBILE HAMBURGER MENU ─── */
function injectMobileNav() {
  if (document.getElementById('hamburger')) return;

  const hamburger = document.createElement('button');
  hamburger.id = 'hamburger';
  hamburger.setAttribute('aria-label', 'Toggle navigation');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.innerHTML = '<span></span><span></span><span></span>';
  hamburger.addEventListener('click', toggleMobileMenu);
  nav.appendChild(hamburger);

  const style = document.createElement('style');
  style.id = 'mobile-nav-styles';
  style.textContent = `
    #hamburger {
      display: none;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
      width: 40px; height: 40px;
      background: transparent;
      border: 1.5px solid rgba(30,144,255,0.25);
      border-radius: 10px;
      cursor: pointer;
      padding: 8px;
      z-index: 1001;
    }
    #hamburger span {
      display: block; width: 100%; height: 2px;
      background: var(--blue); border-radius: 2px;
      transition: all 0.3s; transform-origin: center;
    }
    #hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    #hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
    #hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

    @media (max-width: 900px) {
      #hamburger { display: flex; }
      .nav-menu {
        position: fixed; top: 72px; left: 0; right: 0;
        background: rgba(255,255,255,0.97);
        backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
        flex-direction: column; gap: 0; padding: 16px 0 24px;
        border-bottom: 1px solid rgba(30,144,255,0.1);
        box-shadow: 0 12px 40px rgba(30,144,255,0.08);
        transform: translateY(-110%); opacity: 0; pointer-events: none;
        transition: transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.3s;
        z-index: 998;
      }
      .nav-menu.mobile-open { transform: translateY(0); opacity: 1; pointer-events: all; }
      .nav-menu li { width: 100%; }
      .nav-menu a { display: block; padding: 14px 5%; font-size: 15px; border-bottom: 1px solid rgba(30,144,255,0.06); }
    }

    @media (max-width: 559px) {
      .nav-menu { top: 64px; }
      .nav-menu a { font-size: 14px; padding: 12px 4%; }
    }
  `;
  document.head.appendChild(style);
}

function toggleMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const menu = document.querySelector('.nav-menu');
  const isOpen = menu.classList.toggle('mobile-open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
}

function closeMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const menu = document.querySelector('.nav-menu');
  if (menu) menu.classList.remove('mobile-open');
  if (hamburger) { hamburger.classList.remove('open'); hamburger.setAttribute('aria-expanded', 'false'); }
}

injectMobileNav();


/* ─── 5. CONTACT FORM → GOOGLE APPS SCRIPT ─── */
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');

if (contactForm && submitBtn) {
  const responseMessage = document.createElement('div');
  responseMessage.id = 'responseMessage';
  responseMessage.style.cssText = 'display:none;margin-top:16px;font-family:var(--font);font-size:14px;font-weight:600;padding:12px 16px;border-radius:10px;text-align:center';
  contactForm.appendChild(responseMessage);

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !message) {
      responseMessage.style.display    = 'block';
      responseMessage.style.color      = '#FF4D6A';
      responseMessage.style.background = 'rgba(255,77,106,0.1)';
      responseMessage.style.border     = '1px solid rgba(255,77,106,0.25)';
      responseMessage.innerHTML        = '&#x274C; Please fill in all required fields.';
      return;
    }

    // Loading state
    submitBtn.disabled    = true;
    submitBtn.textContent = 'Sending...';

    // Build URL with query params — most reliable method for Google Apps Script
    const params = new URLSearchParams({
      name:      name,
      email:     email,
      service:   service,
      message:   message,
      timestamp: new Date().toLocaleString(),
    });

    const fullURL = SCRIPT_URL + '?' + params.toString();

    // Use a hidden iframe to POST — bypasses CORS entirely
    const iframe = document.createElement('iframe');
    iframe.name  = 'hidden_iframe';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    const hiddenForm = document.createElement('form');
    hiddenForm.method  = 'POST';
    hiddenForm.action  = SCRIPT_URL;
    hiddenForm.target  = 'hidden_iframe';
    hiddenForm.style.display = 'none';

    const fields = { name, email, service, message, timestamp: new Date().toLocaleString() };
    Object.entries(fields).forEach(([key, val]) => {
      const input = document.createElement('input');
      input.type  = 'hidden';
      input.name  = key;
      input.value = val;
      hiddenForm.appendChild(input);
    });

    document.body.appendChild(hiddenForm);

    // Show success after 2s (iframe POST is fire-and-forget)
    setTimeout(() => {
      responseMessage.style.display    = 'block';
      responseMessage.style.color      = '#00B974';
      responseMessage.style.background = 'rgba(0,185,116,0.1)';
      responseMessage.style.border     = '1px solid rgba(0,185,116,0.25)';
      responseMessage.innerHTML        = '&#x2705; Message sent successfully! We\'ll get back to you soon.';
      contactForm.reset();
      submitBtn.disabled    = false;
      submitBtn.textContent = 'Send Message \u2192';
      document.body.removeChild(hiddenForm);
      document.body.removeChild(iframe);
      setTimeout(() => { responseMessage.style.display = 'none'; }, 5000);
    }, 2000);

    hiddenForm.submit();
  });
}


/* ─── 6. PROJECT MODALS ─── */
function openProjectModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

function closeModalOnBackdrop(e, id) {
  if (e.target === document.getElementById(id) || e.target.classList.contains('proj-modal-backdrop')) {
    closeProjectModal(id);
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.proj-modal-overlay.open').forEach((m) => m.classList.remove('open'));
    document.body.style.overflow = '';
  }
});

window.openProjectModal     = openProjectModal;
window.closeProjectModal    = closeProjectModal;
window.closeModalOnBackdrop = closeModalOnBackdrop;


/* ─── 7. SKILL & DASH BAR ANIMATION ─── */
function animateBars() {
  const bars = document.querySelectorAll('.skill-bar-fill, .dash-bar-fill');
  bars.forEach((bar) => { bar.dataset.target = bar.style.width; bar.style.width = '0'; });

  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          bar.style.transition = 'width 1s cubic-bezier(0.4,0,0.2,1)';
          bar.style.width = bar.dataset.target;
          barObserver.unobserve(bar);
        }
      });
    },
    { threshold: 0.3 }
  );
  bars.forEach((bar) => barObserver.observe(bar));
}
animateBars();


/* ─── 8. COUNTER ANIMATION ─── */
function animateCounter(el, target, suffix, duration = 1600) {
  let start = 0;
  const step = (ts) => {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const raw = el.dataset.count;
        if (raw) animateCounter(el, parseInt(raw, 10), el.dataset.suffix || '');
        counterObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('.astat-val').forEach((el) => {
  const match = el.textContent.trim().match(/^(\d+)(.*)$/);
  if (match) {
    el.dataset.count = match[1];
    el.dataset.suffix = match[2];
    el.textContent = '0' + match[2];
    counterObserver.observe(el);
  }
});


/* ─── 9. HERO CANVAS ─── */
(function initHeroCanvas() {
  const canvas = document.querySelector('.hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, nodes;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    const count = Math.floor((W * H) / 18000);
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    nodes.forEach((n) => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(30,144,255,${0.15 * (1 - dist / 120)})`;
          ctx.lineWidth = 1;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
      ctx.beginPath();
      ctx.arc(nodes[i].x, nodes[i].y, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(30,144,255,0.25)';
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
})();


/* ─── LIGHTBOX ─── */
function openLightbox(src, label) {
  const lb    = document.getElementById('lightbox');
  const img   = document.getElementById('lightbox-img');
  const lbl   = document.getElementById('lightbox-label');
  img.src     = src;
  img.alt     = label;
  lbl.textContent = label;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(e) {
  if (e && e.target !== document.getElementById('lightbox') &&
           e.target !== document.querySelector('.lightbox-backdrop') &&
           !e.target.classList.contains('lightbox-close')) return;
  const lb = document.getElementById('lightbox');
  lb.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

window.openLightbox  = openLightbox;
window.closeLightbox = closeLightbox;
