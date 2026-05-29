/* ============================================================
   DULMINA HASITH — Portfolio Script
   Sections: Typed Title → Nav Active → Scroll Reveal →
             Nav Scroll → Mobile Nav → Contact Form
   ============================================================ */

'use strict';

// ── Typed Title ───────────────────────────────────────────────
const ROLES = ['CYBERSECURITY SPECIALIST','PENETRATION TESTER','CTF ENTHUSIAST','TRYHACKME LAB PRACTITIONER','HACK THE BOX LAB SPECIALIST','NETWORK ANALYST','LINUX POWER USER'];

let roleIndex  = 0;
let charIndex  = 0;
let isDeleting = false;

const typedEl = document.getElementById('typed');

function typeRole() {
  if (!typedEl) return;

  const current = ROLES[roleIndex];

  if (!isDeleting) {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeRole, 2000);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % ROLES.length;
    }
  }

  const delay = isDeleting ? 40 : 70;
  setTimeout(typeRole, delay);
}

// Start after a brief pause so the hero content reveals first
setTimeout(typeRole, 600);


// ── Scroll Reveal ─────────────────────────────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal-up, .reveal-right').forEach((el) =>
  revealObserver.observe(el)
);


// ── Active Nav Link on Scroll ──────────────────────────────────
const sections   = document.querySelectorAll('section[id]');
const navLinks   = document.querySelectorAll('.nav-link');
const navbar     = document.getElementById('navbar');
const NAV_HEIGHT = 70;

function updateActiveNav() {
  let current = '';
  sections.forEach((section) => {
    const top = section.offsetTop - NAV_HEIGHT - 60;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });

  // Add scrolled class to navbar for subtle style change
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav(); // run on load


// ── Mobile Navigation ──────────────────────────────────────────
const hamburger  = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');

function toggleNav(forceClose = false) {
  const isOpen = navLinksEl.classList.contains('open');
  if (forceClose || isOpen) {
    navLinksEl.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  } else {
    navLinksEl.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
}

if (hamburger) {
  hamburger.addEventListener('click', () => toggleNav());
}

// Close on nav link click
navLinksEl.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => toggleNav(true));
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinksEl.classList.contains('open')) {
    toggleNav(true);
  }
});

// Close on backdrop click (outside menu)
document.addEventListener('click', (e) => {
  if (
    navLinksEl.classList.contains('open') &&
    !navLinksEl.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    toggleNav(true);
  }
});


// ── Contact Form ───────────────────────────────────────────────
const submitBtn  = document.getElementById('submit-btn');
const formStatus = document.getElementById('form-status');

function showStatus(msg, type) {
  if (!formStatus) return;
  formStatus.textContent = msg;
  formStatus.className   = `form-status ${type}`;
  formStatus.hidden      = false;

  if (type === 'success') {
    setTimeout(() => { formStatus.hidden = true; }, 6000);
  }
}

function getFieldValue(id) {
  return (document.getElementById(id)?.value || '').trim();
}

function clearForm() {
  ['cf-name', 'cf-email', 'cf-subject', 'cf-message'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

function validateForm(data) {
  if (!data.name)    return 'Please enter your name.';
  if (!data.email)   return 'Please enter your email address.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
                     return 'Please enter a valid email address.';
  if (!data.message) return 'Please enter a message.';
  return null;
}

if (submitBtn) {
  submitBtn.addEventListener('click', async () => {
    const data = {
      name:    getFieldValue('cf-name'),
      email:   getFieldValue('cf-email'),
      subject: getFieldValue('cf-subject') || '(No subject)',
      message: getFieldValue('cf-message'),
    };

    const error = validateForm(data);
    if (error) {
      showStatus(error, 'error');
      return;
    }

    submitBtn.textContent = 'Sending…';
    submitBtn.disabled    = true;

    try {
      const res = await fetch('https://formspree.io/f/xrerezva', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        showStatus('Message sent — I\'ll get back to you soon.', 'success');
        clearForm();
        submitBtn.textContent = 'Send Message';
      } else {
        throw new Error('Server responded with an error.');
      }
    } catch {
      showStatus('Failed to send. Please email me directly.', 'error');
      submitBtn.textContent = 'Send Message';
    } finally {
      submitBtn.disabled = false;
    }
  });
}
