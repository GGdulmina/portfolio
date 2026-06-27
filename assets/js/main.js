/**
 * main.js — Client-Side Application Controller
 *
 * MENTOR ARCHITECTURE LESSON:
 * In a static website, we replace server-side rendering (Spring + Thymeleaf)
 * with client-side rendering (CSR). This script acts as our router and
 * controller. It fetches JSON data and updates the DOM using templates.
 *
 * BROWSER SECURITY & OFFLINE-FIRST EXCELLENCE:
 * Standard fetch() operations fail when opening static pages via the 'file://'
 * protocol due to the browser's Same-Origin Policy (CORS). To ensure recruiters
 * can double-click index.html locally and see all your data, we implement a
 * dual-mode system: we try to fetch JSON, and fallback to pre-baked local data
 * if the fetch fails.
 */

// =========================================================================
// LOCAL STATIC FALLBACK DATA (For file:// local viewing)
// =========================================================================
const FALLBACK_DATA = {
  projects: [
    {
      "id": 1,
      "title": "SentinelX",
      "description": "A real-time Linux host intrusion detection system and security log auditor. Monitors authentication logs (/var/log/auth.log) for brute-force attacks, scans, and privilege escalation indicators, displaying events on an active dashboard with automatic alerting.",
      "techStack": "Python, Tkinter, Regular Expressions, Linux Security, Multi-threading",
      "githubUrl": "https://github.com/GGdulmina/SentinelX",
      "liveUrl": "",
      "featured": true,
      "certificateName": "",
      "certificateUrl": ""
    },
    {
      "id": 2,
      "title": "CTF Exploit Scripts & Writeups",
      "description": "Complete solutions, analysis, and custom automated bash tools for OverTheWire Bandit wargame levels 1 to 34. Showcases practical skills in file filtering, base64/hex transcoding, SSH key manipulation, process listening, and privilege escalation.",
      "techStack": "Bash, Python, Linux Administration, Cryptography, SSH",
      "githubUrl": "https://github.com/GGdulmina/OTW-Bandit-Solutions",
      "liveUrl": "https://overthewire.org/wargames/bandit/",
      "featured": true,
      "certificateName": "OverTheWire Bandit Completed",
      "certificateUrl": ""
    },
    {
      "id": 3,
      "title": "Retro Chess Engine",
      "description": "Browser-based chess game featuring a minimax AI with alpha-beta pruning. Supports three difficulty levels. Built with a custom flying-piece animation system and a retro aesthetic — fully playable in the browser with no dependencies.",
      "techStack": "JavaScript, HTML/CSS, Minimax AI,  Minimax AI",
      "githubUrl": "https://github.com/GGdulmina/retro_chess",
      "liveUrl": "https://ggdulmina.github.io/retro_chess/",
      "featured": false,
      "certificateName": "",
      "certificateUrl": ""
    },
    {
      "id": 4,
      "title": "GenAI-Inventory",
      "description": "A full-stack smart inventory management system built using Java JSP/Servlets with a Python Flask AI microservice and MySQL backend. The system handles authentication, inventory tracking, sales management, and reporting, while the AI layer provides restocking recommendations and sales trend analysis through REST APIs.",
      "techStack": "Java (JSP/Servlets), Python+(Flask API), MySQL",
      "githubUrl": "https://github.com/GGdulmina/GenAI-Inventory",
      "liveUrl": "",  
      "featured": true,
      "certificateName": "",
      "certificateUrl": ""
    }
  ],
  skills: [
    {
      "id": 1,
      "name": "Frontend Development (HTML/CSS/JavaScript)",
      "category": "WEB DEVELOPMENT",
      "iconClass": "devicon-html5-plain"
    },
    {
      "id": 2,
      "name": "React Frontend Development",
      "category": "WEB DEVELOPMENT",
      "iconClass": "devicon-react-original"
    },
    {
      "id": 3,
      "name": "Backend Development (Java / Spring Boot)",
      "category": "BACKEND ENGINEERING",
      "iconClass": "devicon-java-plain"
    },
    {
      "id": 4,
      "name": "Backend Development (C#)",
      "category": "BACKEND ENGINEERING",
      "iconClass": "devicon-csharp-plain"
    },
    {
      "id": 5,
      "name": "Python Programming & Automation",
      "category": "PROGRAMMING",
      "iconClass": "devicon-python-plain"
    },
    {
      "id": 6,
      "name": "Database Design & Management (MySQL / MongoDB)",
      "category": "DATABASES",
      "iconClass": "devicon-mysql-plain"
    },
    {
      "id": 7,
      "name": "REST API Development & Integration",
      "category": "BACKEND ENGINEERING",
      "iconClass": "devicon-nodejs-plain"
    },
    {
      "id": 8,
      "name": "Git Version Control & Collaboration",
      "category": "DEVELOPER TOOLS",
      "iconClass": "devicon-git-plain"
    },
    {
      "id": 9,
      "name": "Linux Command Line & System Operations",
      "category": "SYSTEMS ENGINEERING",
      "iconClass": "devicon-linux-plain"
    },
    {
      "id": 10,
      "name": "Docker Containerization",
      "category": "DEVOPS",
      "iconClass": "devicon-docker-plain"
    },
    {
      "id": 11,
      "name": "Secure Network Analysis (Nmap / Wireshark)",
      "category": "CYBERSECURITY",
      "iconClass": "devicon-kalilinux-plain"
    },
    {
      "id": 12,
      "name": "Web Application Security Fundamentals",
      "category": "CYBERSECURITY",
      "iconClass": "devicon-shield-plain"
    }
  ],
  experience: [
    {
      "id": 1,
      "role": "IT Lab Assistant",
      "company": "B/Dharmapala Maha Vidyalaya/Bandarawela",
      "duration": "2019 — 2022",
      "description": "Supported daily ICT lab operations including system setup, maintenance, and student assistance during practical sessions. Assisted in troubleshooting basic hardware and software issues and ensured smooth lab functionality during academic use."
    },
    {
      "id": 2,
      "role": "IT Lab Assistant",
      "company": "Sri Lanka Institute of Advanced Technological Education (SLAITE)/Badulla",
      "duration": "2024 — Present",
      "description": "Responsible for maintaining and supporting over 30+ computer systems in a structured academic lab environment. Ensured system availability, troubleshooting hardware/software issues, and assisting users with technical operations. Gained hands-on experience in system stability, diagnostics, and basic network support."
    },
    {
      "id": 3,
      "role": "Cybersecurity Trainee",
      "company": "TryHackMe & Hack The Box (Self-directed)",
      "duration": "2025 — Present",
      "description": " Engaging in structured hands-on labs covering penetration testing, vulnerability assessment, privilege escalation, and digital forensics. Automating reconnaissance workflows using Python and Bash. Completed OverTheWire Bandit wargame series."
    },
    {
      "id": 4,
      "role": "Security Projects Developer",
      "company": "Personal & GitHub Projects",
      "duration": "2026 — Present",
      "description": "Developing SentinelX, a Linux-based real-time intrusion detection and log monitoring tool. The system uses automated log parsing and anomaly detection to surface suspicious activity and present it through a clean GUI interface."
    }
  ],
  certificates: [
  /*  {
      "id": 1,
      "title": "Junior Penetration Tester",
      "issuer": "TryHackMe",
      "status": "ACQUIRED",
      "verificationUrl": "https://tryhackme.com/p/GGdulmina"
    },*/
  ],
  labplatforms: [
    {
      "id": 1,
      "name": "TryHackMe",
      "profileUrl": "https://tryhackme.com/p/dulmina3343",
      "progress": "Rank Top 65% [APPRENTICE]",
      "iconClass": "devicon-googlecloud-plain"
    },
    {
      "id": 2,
      "name": "HackTheBox",
      "profileUrl": "https://profile.hackthebox.com/profile/019eb5dd-c783-721a-acbf-fd4cd3803db5",
      "progress": "Rank: Beginner · 3 Active Machines Solved",
      "iconClass": "devicon-kalilinux-original"
    },
    {
      "id": 3,
      "name": "OverTheWire",
      "profileUrl": "https://github.com/GGdulmina/ctf-exploit-scripts-writeups",
      "progress": "Bandit Level 25 completed",
      "iconClass": "devicon-ssh-original"
    }
  ],
  academic: [
    {
      "id": 1,
      "title": "Exploring Research Trends and Innovations in Explainable Artificial Intelligence (XAI) for Oncology Medical Imaging",
      "description": "A systematic literature review analysing six high-impact studies on XAI in cancer diagnostics. Covers Vision Mamba architectures, Knowledge Distillation, SHAP-based explainability, and multimodal prognostic modelling.",
      "institution": "SLIATE",
      "year": "2024",
      "field": "Artificial Intelligence",
      "type": "Research Paper",
      "tags": "XAI, Deep Learning, Medical Imaging, Literature Review",
      "link": "https://drive.google.com/file/d/1YvdVs6-kiWfzJdpDk3RUKuTLSV9aVV7G/view?usp=drive_link"
    },
    {
      "id": 2,
      "title": "ATI-Badulla Web Portal (Java JSP/Servlet-Based CMS System)",
      "description": "Full-stack academic web application using Java Servlets and JSP with MySQL integration. Public-facing institutional website and secure admin dashboard with dynamic notices, image gallery management, course publishing, student results, and session-based authentication.",
      "institution": "SLIATE",
      "year": "2026",
      "field": "Full-Stack Java Web Development",
      "type": "Academic Project",
      "tags": "Java Servlets, JSP, MySQL, JDBC, Apache Tomcat, Bootstrap 5, MVC Architecture",
      "link": "https://github.com/GGdulmina/ATI-Badulla-Portal"
    }
  ]
};

// =========================================================================
// DATA FETCH HELPER
// =========================================================================
async function loadData(endpoint, fallbackKey) {
  try {
    const response = await fetch(`data/${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.warn(`Fetch failed for 'data/${endpoint}' (possibly file:// protocol or offline). Falling back to static data.`, error);
    return FALLBACK_DATA[fallbackKey];
  }
}

// =========================================================================
// APPLICATION INITIALIZATION
// =========================================================================
document.addEventListener('DOMContentLoaded', async () => {

  // 1. MOBILE NAV TOGGLE
  initMobileNav();

  // 2. CONTACT FORM SUCCESS REDIRECT CHECKER
  checkContactSuccessParam();

  // 3. COPY EMAIL TO CLIPBOARD
  initEmailClipboard();

  // 4. CONTACT FORM VALIDATION
  initContactFormValidation();

  // 5. LOAD & RENDER SECTION DATA
  await renderPageData();
});

// =========================================================================
// UI CONTROLLERS
// =========================================================================

/**
 * Mobile Navigation Menu Toggler
 */
function initMobileNav() {
  const navToggle = document.getElementById('nav-toggle');
  const navLinks  = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen.toString());
    });

    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

/**
 * Checks URL parameter '?success=true' and shows the success alert
 */
function checkContactSuccessParam() {
  const urlParams = new URLSearchParams(window.location.search);
  const successAlert = document.getElementById('success-alert');
  if (successAlert && urlParams.get('success') === 'true') {
    successAlert.style.display = 'block';
    // Clear URL query parameter without reloading
    window.history.replaceState({}, document.title, window.location.pathname);
  }
}

/**
 * Clipboard email copying feedback
 */
function initEmailClipboard() {
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (navigator.clipboard) {
        e.preventDefault();
        const email = link.href.replace('mailto:', '');

        navigator.clipboard.writeText(email).then(() => {
          const original = link.innerHTML;
          link.innerHTML = 'Copied!';
          link.style.color = 'var(--success)';

          setTimeout(() => {
            link.innerHTML = original;
            link.style.color = '';
          }, 1800);
        }).catch(() => {
          window.location.href = link.href;
        });
      }
    });
  });
}

/**
 * Handles client-side validation for the contact email form.
 * Displays error states using preexisting styling classes.
 */
function initContactFormValidation() {
  const form = document.getElementById('contact-email-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    let isValid = true;
    
    // Clear previous error styles and message elements
    form.querySelectorAll('.field-error').forEach(el => el.remove());
    form.querySelectorAll('.form-input').forEach(el => el.classList.remove('error'));

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');

    // Name Validation
    if (name && !name.value.trim()) {
      showError(name, 'Full Name is required');
      isValid = false;
    }

    // Email Validation
    if (email) {
      const emailValue = email.value.trim();
      if (!emailValue) {
        showError(email, 'Email address is required');
        isValid = false;
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
          showError(email, 'Please enter a valid email address');
          isValid = false;
        }
      }
    }

    // Subject Validation
    if (subject && !subject.value.trim()) {
      showError(subject, 'Subject is required');
      isValid = false;
    }

    // Message Validation
    if (message && !message.value.trim()) {
      showError(message, 'Message is required');
      isValid = false;
    }

    if (!isValid) {
      e.preventDefault(); // Stop form submission
    }
  });

  function showError(inputElement, errorMessage) {
    inputElement.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = errorMessage;
    inputElement.parentNode.appendChild(errorDiv);
  }
}

/**
 * Main Controller for Loading and Rendering Page Components
 */
async function renderPageData() {
  // --- Global elements ---
  const totalProjectsStat = document.getElementById('total-projects-stat');
  const projectsTotalCount = document.getElementById('projects-total-count');

  // Load repositories
  const projects = await loadData('projects.json', 'projects');
  const skills = await loadData('skills.json', 'skills');
  const experience = await loadData('experience.json', 'experience');
  const certificates = await loadData('certificates.json', 'certificates');
  const labPlatforms = await loadData('labplatforms.json', 'labplatforms');
  const academic = await loadData('academic.json', 'academic');

  // Display total project counts globally if element is present
  if (totalProjectsStat) totalProjectsStat.textContent = projects.length;
  if (projectsTotalCount) projectsTotalCount.textContent = projects.length;

  // --- Home Page (index.html) Render ---
  const featuredGrid = document.getElementById('featured-projects-grid');
  if (featuredGrid) {
    const featuredProjects = projects.filter(p => p.featured);
    renderProjects(featuredProjects, featuredGrid);
  }

  const expTimeline = document.getElementById('experience-timeline');
  if (expTimeline) {
    renderExperience(experience, expTimeline);
  }

  // --- Projects Page (projects.html) Render ---
  const projectsListContainer = document.getElementById('projects-list-container');
  const countBadge = document.getElementById('projects-list-count-badge');
  if (projectsListContainer) {
    if (countBadge) countBadge.textContent = `${projects.length} total`;
    
    // Set up search, filter, and sort listeners
    const searchInput = document.getElementById('project-search');
    const filterFeatured = document.getElementById('project-filter-featured');
    const sortSelect = document.getElementById('project-sort');

    const updateProjectsUI = () => {
      let filtered = [...projects];

      // 1. Search Query
      if (searchInput && searchInput.value.trim() !== "") {
        const query = searchInput.value.toLowerCase().trim();
        filtered = filtered.filter(p => 
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.techStack.toLowerCase().includes(query)
        );
      }

      // 2. Featured Filter
      if (filterFeatured && filterFeatured.value === "featured") {
        filtered = filtered.filter(p => p.featured);
      }

      // 3. Sorting
      if (sortSelect) {
        const sortBy = sortSelect.value;
        if (sortBy === "title-az") {
          filtered.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === "title-za") {
          filtered.sort((a, b) => b.title.localeCompare(a.title));
        } else {
          // Default sorting (id ascending)
          filtered.sort((a, b) => a.id - b.id);
        }
      }

      // Render cards
      renderProjects(filtered, projectsListContainer);
      if (countBadge) countBadge.textContent = `${filtered.length} total`;
    };

    if (searchInput) searchInput.addEventListener('input', updateProjectsUI);
    if (filterFeatured) filterFeatured.addEventListener('change', updateProjectsUI);
    if (sortSelect) sortSelect.addEventListener('change', updateProjectsUI);

    // Initial render
    updateProjectsUI();
  }

  const academicContainer = document.getElementById('academic-list-container');
  if (academicContainer) {
    renderAcademic(academic, academicContainer);
  }

  const marqueeTrack = document.getElementById('skills-marquee-track');
  if (marqueeTrack) {
    renderSkillsMarquee(skills, marqueeTrack);
  }

  // --- About Page (about.html) Render ---
  const groupedSkillsContainer = document.getElementById('grouped-skills-container');
  if (groupedSkillsContainer) {
    renderGroupedSkills(skills, groupedSkillsContainer);
  }

  const certContainer = document.getElementById('cert-grid-container');
  if (certContainer) {
    renderCertificates(certificates, certContainer);
  }

  const labContainer = document.getElementById('lab-grid-container');
  if (labContainer) {
    renderLabs(labPlatforms, labContainer);
  }

  // Scroll active section highlighter (Projects page sidebars)
  initScrollSpy();
}

// =========================================================================
// HTML BUILDERS & DOM REPLACEMENTS
// =========================================================================

/**
 * Renders Projects Card Grid
 */
function renderProjects(projectsList, container) {
  if (projectsList.length === 0) {
    container.innerHTML = `
      <div class="card-body text-muted" style="text-align: center; padding: 40px; grid-column: 1 / -1;">
        <p style="font-size: 0.85rem; margin: 0;">No projects found matching the filter.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = projectsList.map((project, index) => {
    // Split tech stack string into tags
    const tagsHTML = project.techStack
      ? project.techStack.split(',').map(tag => `<span class="project-tag">${tag.trim()}</span>`).join('')
      : '';

    // Links rendering
    const githubLink = project.githubUrl 
      ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link">GitHub &nearr;</a>`
      : '';
    const liveLink = project.liveUrl 
      ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-link">Live &nearr;</a>`
      : '';
    const certLink = project.certificateUrl
      ? `<a href="${project.certificateUrl}" target="_blank" rel="noopener noreferrer" class="project-link" title="${project.certificateName}">
           <span>${project.certificateName || 'Certificate'}</span> &nearr;
         </a>`
      : '';

    const featuredBadge = project.featured 
      ? `<span class="label label-glow" style="font-size: 0.6rem;">Featured</span>`
      : '';

    return `
      <div class="project-item fade-in" style="animation-delay: ${index * 60}ms;">
        <div>
          <div class="flex items-center gap-sm mb-md" style="margin-bottom: 6px;">
            <span class="text-dim" style="font-size: 0.65rem; letter-spacing: 0.1em;">#${index + 1}</span>
            ${featuredBadge}
          </div>
          <h3 class="project-name">${escapeHTML(project.title)}</h3>
          <p class="project-desc">${escapeHTML(project.description)}</p>
          <div class="project-tags">
            ${tagsHTML}
          </div>
        </div>
        <div class="project-links">
          ${githubLink}
          ${liveLink}
          ${certLink}
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Renders Experience Timeline
 */
function renderExperience(experienceList, container) {
  if (experienceList.length === 0) {
    container.innerHTML = `<div class="card-body text-muted" style="text-align: center;">No experience entries available.</div>`;
    return;
  }

  container.innerHTML = experienceList.map(exp => `
    <div class="timeline-item">
      <div class="timeline-dot">
        <div class="timeline-dot-circle"></div>
        <div class="timeline-dot-line"></div>
      </div>
      <div class="timeline-body">
        <h3 class="timeline-role" style="margin: 0; font-size: 1.1rem; color: var(--accent);">${escapeHTML(exp.role)}</h3>
        <p class="timeline-company" style="margin: 4px 0 2px; font-weight: 500;">${escapeHTML(exp.company)}</p>
        <p class="timeline-date" style="margin: 0 0 8px; font-size: 0.75rem; color: var(--text-dim);">${escapeHTML(exp.duration)}</p>
        <p class="timeline-desc" style="margin: 0; line-height: 1.6; font-size: 0.85rem;">${escapeHTML(exp.description)}</p>
      </div>
    </div>
  `).join('');
}

/**
 * Renders Grouped Skills (about.html)
 */
function renderGroupedSkills(skillsList, container) {
  if (skillsList.length === 0) {
    container.innerHTML = `<div class="card-body text-muted" style="text-align: center;">No technical skills available.</div>`;
    return;
  }

  // Group skills by category
  const grouped = {};
  skillsList.forEach(skill => {
    if (!grouped[skill.category]) {
      grouped[skill.category] = [];
    }
    grouped[skill.category].push(skill);
  });

  let html = '';
  for (const category in grouped) {
    const badges = grouped[category].map(s => `<span class="skill-tag">${escapeHTML(s.name)}</span>`).join('');
    html += `
      <div class="skill-group" style="margin-bottom: var(--sp-md);">
        <h3 class="skill-group-title" style="font-size: 0.9rem; letter-spacing: 0.1em; color: var(--accent); text-transform: uppercase; margin-bottom: 8px;">${escapeHTML(category)}</h3>
        <div class="skill-tags">
          ${badges}
        </div>
      </div>
    `;
  }
  container.innerHTML = html;
}

/**
 * Renders Skills Marquee (projects.html)
 */
function renderSkillsMarquee(skillsList, track) {
  if (skillsList.length === 0) {
    track.innerHTML = `<span class="text-muted">No skills available.</span>`;
    return;
  }

  // Generate badge list
  const badges = skillsList.map(skill => {
    const icon = skill.iconClass ? `<i class="${skill.iconClass}" aria-hidden="true" style="margin-right: 6px;"></i>` : '';
    return `
      <div class="skill-badge">
        ${icon}
        <span>${escapeHTML(skill.name)}</span>
      </div>
    `;
  }).join('');

  // Duplicate badge list for continuous scrolling loop
  track.innerHTML = badges + badges;
}

/**
 * Renders Academic cards (projects.html)
 */
function renderAcademic(academicList, container) {
  if (academicList.length === 0) {
    container.innerHTML = `
      <div class="card" style="text-align: center; padding: 20px;">
        <p class="text-muted">No academic entries found.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = academicList.map(item => {
    const tagBadges = item.tags
      ? item.tags.split(',').map(t => `<span class="project-tag">${t.trim()}</span>`).join('')
      : '';
    const linkHTML = item.link 
      ? `<a href="${item.link}" target="_blank" rel="noopener noreferrer" class="project-link">Read / View ↗</a>`
      : '';

    return `
      <div class="card" style="margin-bottom: 16px;">
        <div class="card-body">
          <p style="font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-dim); margin: 0 0 6px 0;">
            ${escapeHTML(item.type)} · ${escapeHTML(item.institution)} · ${escapeHTML(item.year)} · ${escapeHTML(item.field)}
          </p>
          <h3 style="font-family: var(--font-display); font-size: 1.1rem; margin: 8px 0; color: var(--text-light); line-height: 1.4;">
            ${escapeHTML(item.title)}
          </h3>
          <p class="text-muted" style="font-size: 0.85rem; line-height: 1.7; margin: 0 0 12px 0;">
            ${escapeHTML(item.description)}
          </p>
          <div class="flex flex-wrap gap-sm" style="margin-bottom: 12px;">
            ${tagBadges}
          </div>
          ${linkHTML}
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Renders Certificates (about.html)
 */
function renderCertificates(certsList, container) {
  if (certsList.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="color: var(--text-muted); text-align: center; padding: var(--sp-md); border: 1px dashed var(--border); border-radius: var(--radius-md); grid-column: 1 / -1;">
        No certificates available.
      </div>
    `;
    return;
  }

  container.innerHTML = certsList.map(cert => {
    const badgeLabel = cert.status === 'ACQUIRED' ? 'Acquired (Verified)' : 'Pending (In Progress)';
    const statusClass = cert.status === 'ACQUIRED' ? 'status-acquired' : 'status-pending';

    if (cert.verificationUrl) {
      return `
        <div class="cert-card-wrapper">
          <a href="${cert.verificationUrl}" target="_blank" rel="noopener noreferrer" class="cert-card clickable ${statusClass}">
            <div class="cert-header">
              <span class="cert-issuer">${escapeHTML(cert.issuer)}</span>
              <span class="cert-badge">${badgeLabel}</span>
            </div>
            <h3 class="cert-title">${escapeHTML(cert.title)}</h3>
            <div class="cert-verify-label">
              Verify Credential <span class="arrow">→</span>
            </div>
          </a>
        </div>
      `;
    } else {
      return `
        <div class="cert-card-wrapper">
          <div class="cert-card ${statusClass}">
            <div class="cert-header">
              <span class="cert-issuer">${escapeHTML(cert.issuer)}</span>
              <span class="cert-badge">${badgeLabel}</span>
            </div>
            <h3 class="cert-title">${escapeHTML(cert.title)}</h3>
          </div>
        </div>
      `;
    }
  }).join('');
}

/**
 * Renders Lab Platforms (about.html)
 */
function renderLabs(labsList, container) {
  if (labsList.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="color: var(--text-muted); text-align: center; padding: var(--sp-md); border: 1px dashed var(--border); border-radius: var(--radius-md); grid-column: 1 / -1;">
        No learning labs available.
      </div>
    `;
    return;
  }

  container.innerHTML = labsList.map(lab => {
    const iconClass = lab.iconClass || 'devicon-kalilinux-original colored';
    return `
      <div class="lab-card-wrapper">
        <a href="${lab.profileUrl}" target="_blank" rel="noopener noreferrer" class="lab-card clickable">
          <div class="lab-header">
            <div class="lab-platform-info">
              <i class="${iconClass} lab-icon" aria-hidden="true"></i>
              <span class="lab-name">${escapeHTML(lab.name)}</span>
            </div>
            <span class="lab-badge">Active Profile</span>
          </div>
          <div class="lab-progress-section">
            <div class="lab-progress-label">PROGRESS / STATUS</div>
            <div class="lab-progress-value">${escapeHTML(lab.progress)}</div>
          </div>
          <div class="lab-profile-label">
            View Public Profile <span class="arrow">→</span>
          </div>
        </a>
      </div>
    `;
  }).join('');
}

// =========================================================================
// DOM HELPER UTILITIES
// =========================================================================

/**
 * Simple HTML Escaper for Security (XSS Prevention)
 */
function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

/**
 * Intersection Observer scroll highlighting for sidebars
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const sidebarLinks = document.querySelectorAll('.sidebar-nav-link[href^="#"]');

  if (sections.length > 0 && sidebarLinks.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            sidebarLinks.forEach(link => {
              link.classList.toggle(
                'active',
                link.getAttribute('href') === `#${id}`
              );
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '-60px 0px 0px 0px' // accounts for sticky navigation header
      }
    );

    sections.forEach(section => observer.observe(section));
  }
}
