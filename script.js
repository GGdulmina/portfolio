/* ============================================================
   DULMINA HASITH — Portfolio Script
   Sections: Theme Accent Switcher → Spotlight Cards →
             Skills & Projects Filters → Terminal Shell →
             Typed Title → Scroll Reveal → Mobile Nav → Contact Form
   ============================================================ */

'use strict';

// ── Spotlight Cards (Performance Optimized with RAF) ──────────
const spotlightCards = document.querySelectorAll('.spotlight-card');
spotlightCards.forEach((card) => {
  let ticking = false;
  card.addEventListener('mousemove', (e) => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
        ticking = false;
      });
      ticking = true;
    }
  });
});


// ── Skills & Projects Filters ───────────────────────────────
const skillFilterBtns = document.querySelectorAll('[data-filter]');
const skillGroups = document.querySelectorAll('.skill-group');

skillFilterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    skillFilterBtns.forEach((b) => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    const category = btn.dataset.filter;

    skillGroups.forEach((group) => {
      group.classList.remove('fade-in-el');
      if (category === 'all' || group.dataset.category === category) {
        group.classList.remove('filtered-out');
        void group.offsetWidth; // Trigger reflow for animations
        group.classList.add('fade-in-el');
      } else {
        group.classList.add('filtered-out');
      }
    });
  });
});

const projFilterBtns = document.querySelectorAll('[data-filter-proj]');
const projCards = document.querySelectorAll('.project-card');

projFilterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    projFilterBtns.forEach((b) => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    const status = btn.dataset.filterProj;

    projCards.forEach((card) => {
      card.classList.remove('fade-in-el');
      if (status === 'all' || card.dataset.projStatus === status) {
        card.classList.remove('filtered-out');
        void card.offsetWidth; // Trigger reflow for animations
        card.classList.add('fade-in-el');
      } else {
        card.classList.add('filtered-out');
      }
    });
  });
});


// ── Interactive Terminal Shell Widget ─────────────────────────
const COMMANDS = {
  help: () => `Available commands:
  about      - Learn more about who I am
  skills     - See my technical skillset
  projects   - Browse my key projects
  contact    - Get in touch with me
  neofetch   - Display system summary
  clear      - Clear the terminal screen
  sudo [cmd] - Run administrative command`,

  about: () => `Dulmina Hasith — Aspiring Cybersecurity Engineer
Focused on penetration testing, CTF exploitation, and security automation.
I build hands-on scripts and writeups through labs, wargames, and real-world projects.`,

  skills: () => `[ Systems & Linux ]
  → Linux CLI & System Operations
  → SSH & Remote System Management
  → System Troubleshooting & Bash Scripting
[ Cybersecurity ]
  → CTF / Wargame Problem Solving
  → Security Monitoring & Log Analysis
  → Enumeration & Network Forensics
[ Tools & Platforms ]
  → Git/GitHub, Nmap, Wireshark
  → Wazuh, Fail2Ban, TryHackMe, Hack The Box
[ Programming & Dev ]
  → Python for Security Automation
  → Flask APIs, Regex, Log Parsing`,

  projects: () => `* SentinelX (In-Progress)
  Linux-based real-time intrusion detection and log monitoring GUI tool.
  Tech: Python, Linux, Systemd, Bash, Regex
* Retro Chess Engine (Active)
  Browser chess with minimax AI & alpha-beta pruning.
  Tech: JavaScript, HTML/CSS
* CTF Exploit Scripts (Active)
  Scripts for OverTheWire Bandit and wargame writeups.
  Tech: Bash, Python
* GenAI-Inventory (Completed)
  Full-stack smart inventory system with Python Flask AI microservice.
  Tech: Java (JSP/Servlets), Python, Flask, MySQL`,

  contact: () => `Connect with me:
  Email    : dulminahasith43@gmail.com
  GitHub   : https://github.com/GGdulmina
  LinkedIn : https://www.linkedin.com/in/dulmina-hasith-346b28357/
  WhatsApp : +94 701 540 194
  Location : Badulla, Sri Lanka (Remote OK)`,

neofetch: () => `
██████╗ ██╗  ██╗██████╗         
██╔══██╗██║  ██║╚════██╗        
██║  ██║███████║ █████╔╝        
██║  ██║╚════██║ ╚═══██╗        
██████╔╝     ██║██████╔╝        
╚═════╝      ╚═╝╚═════╝         
id43@SuicideLinux ~ bashsrc
────────────────────────────
OS: SuicideLinux v4.3
Location: Badulla, Sri Lanka · Remote OK
Projects  : NexusCore-SLIATE
Uptime: Always learning. Never compromised.
`};

const terminalWindow = document.getElementById('terminal-window');
const terminalHistory = document.getElementById('terminal-history');
const terminalInput = document.getElementById('terminal-hidden-input');
const terminalInputDisplay = document.getElementById('terminal-input-display');

let cmdHistory = [];
let cmdHistoryIndex = -1;

if (terminalWindow && terminalInput) {
  // Focus hidden input on terminal click
  terminalWindow.addEventListener('click', () => {
    terminalInput.focus();
  });

  // Track keypresses
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const rawCmd = terminalInput.value;
      const cmd = rawCmd.trim().toLowerCase();

      // Add to command history if not empty
      if (rawCmd.trim() !== '') {
        cmdHistory.push(rawCmd);
        cmdHistoryIndex = cmdHistory.length;
      }

      // Process command
      executeCommand(rawCmd, cmd);
      terminalInput.value = '';
      terminalInputDisplay.textContent = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0 && cmdHistoryIndex > 0) {
        cmdHistoryIndex--;
        terminalInput.value = cmdHistory[cmdHistoryIndex];
        terminalInputDisplay.textContent = cmdHistory[cmdHistoryIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cmdHistoryIndex < cmdHistory.length - 1) {
        cmdHistoryIndex++;
        terminalInput.value = cmdHistory[cmdHistoryIndex];
        terminalInputDisplay.textContent = cmdHistory[cmdHistoryIndex];
      } else {
        cmdHistoryIndex = cmdHistory.length;
        terminalInput.value = '';
        terminalInputDisplay.textContent = '';
      }
    }
  });

  terminalInput.addEventListener('input', () => {
    terminalInputDisplay.textContent = terminalInput.value;
  });
}

function executeCommand(rawCmd, cmd) {
  // Append current prompt line to history
  const promptLine = document.createElement('div');
  promptLine.className = 't-line';
  promptLine.innerHTML = `<span class="t-prompt">guest@d43.deb:~$</span> <span class="t-cmd"></span>`;
  promptLine.querySelector('.t-cmd').textContent = rawCmd;
  terminalHistory.appendChild(promptLine);

  let outputText = '';
  if (cmd === '') {
    scrollToBottom();
    return;
  }

  if (cmd === 'clear') {
    terminalHistory.innerHTML = '';
    scrollToBottom();
    return;
  }

  if (cmd.startsWith('sudo ')) {
    outputText = `Access Denied. Nice try!\nguest is not in the sudoers file. This incident will be reported.`;
  } else if (COMMANDS[cmd]) {
    outputText = COMMANDS[cmd]();
  } else {
    outputText = `bash: command not found: ${rawCmd}\nType 'help' to see list of available commands.`;
  }

  if (outputText) {
    const outputLine = document.createElement('div');
    outputLine.className = 't-line t-out';
    outputLine.textContent = outputText;
    terminalHistory.appendChild(outputLine);
  }

  // Add spacing line
  const blankLine = document.createElement('div');
  blankLine.className = 't-line t-blank';
  terminalHistory.appendChild(blankLine);

  scrollToBottom();
}

function scrollToBottom() {
  if (terminalHistory) {
    terminalHistory.scrollTop = terminalHistory.scrollHeight;
  }
}


// ── Typed Title ───────────────────────────────────────────────
const ROLES = [
  'CYBERSECURITY SPECIALIST',
  'PENETRATION TESTER',
  'CTF ENTHUSIAST',
  'TRYHACKME LAB PRACTITIONER',
  'HACK THE BOX LAB SPECIALIST',
  'NETWORK ANALYST',
  'LINUX POWER USER'
];

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
