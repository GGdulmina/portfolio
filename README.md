# Cybersecurity Portfolio — Static GitHub Pages Edition

see portfolio - https://ggdulmina.github.io/portfolio/

Welcome to the static, serverless edition of my professional cybersecurity portfolio. This project was migrated from a Spring Boot + Thymeleaf web application to a fully client-side rendered, highly performant static application optimized for deployment on GitHub Pages.

Designed for recruiters, hiring managers, and security professionals, this portfolio showcases my technical skills, offensive and defensive projects, academic publications, and certifications.

##  Key Features

* **Serverless Architecture**: 100% static HTML, CSS, and Vanilla JavaScript. Runs directly in any modern browser without an application server or database.
* **CORS-Safe Dynamic Loading**: Fetches portfolio data dynamically from standalone JSON stores (`projects.json`, `skills.json`, etc.). Implements a robust local fallback mechanism so it works offline and directly via the `file://` protocol.
* **Recruiter-Centric UX**: Features client-side search, filtering (featured vs. all projects), and alphabetical sorting.
* **Formspree Contact Integration**: Completely serverless contact form with advanced spam validation (Akismet/hCaptcha).
* **SEO Optimized**: Implements unique meta tags for every page, Open Graph properties, Twitter cards, a dynamic success URL flow, and Google Structured Data (JSON-LD).
* **High Performance**: Achieves Lighthouse scores > 95 across all pillars (Performance, Accessibility, Best Practices, SEO) due to zero layout shifts, zero heavy frameworks, and deferred/lazy resource loading.

---

## 📂 Target Project Directory Structure

```text
portfolio/
├── index.html                  # Landing page (formerly home.html)
├── about.html                  # Profile story, values, skills, certificates & labs
├── projects.html               # Searchable projects, papers, experience, & marquee
├── contact.html                # Formspree contact form and direct links
├── robots.txt                  # Crawl settings for search engine optimization
├── sitemap.xml                 # Sitemap index of pages
├── assets/
│   ├── css/
│   │   └── style.css           # Custom stylesheets
│   ├── js/
│   │   └── main.js            # App controller, dynamic render engine, controls
│   ├── images/
│   │   └── avatar.jpg          # Profile avatar
│   └── files/
│       └── Dulmina_Hasith_CV.pdf # Professional CV download
├── data/
│   ├── projects.json           # Project records data store
│   ├── skills.json             # Grouped technical skills data store
│   ├── experience.json         # Professional timeline data store
│   ├── certificates.json       # Certification records data store
│   ├── academic.json           # Research paper and academic project store
│   └── labplatforms.json       # Learning lab profile progress store
├── docs/
│   ├── Architecture.md         # System design and architecture migration review
│   ├── Deployment.md           # Step-by-step GitHub Pages deploy guide
│   ├── Maintenance.md          # Content management and operational guidelines
│   ├── ContentUpdateGuide.md   # How to update skills, certs, and details
│   └── NewProjectGuide.md      # Detailed walkthrough to add new projects
└── .github/
    └── workflows/
        └── deploy.yml          # GitHub Actions CI/CD deployment pipeline
```

---

##  Documentation Directory

To understand how this portfolio operates and how to manage it, read the following guides in the `docs/` folder:

1. **[Architecture Guide](docs/Architecture.md)**: Deep dive into the Spring Boot to static HTML/JS migration process, architectural tradeoffs, and performance considerations.
2. **[Deployment Guide](docs/Deployment.md)**: Steps to publish the project to GitHub Pages, DNS configuration, and GitHub Actions settings.
3. **[Maintenance Manual](docs/Maintenance.md)**: Operations, dependency policies, browser compatibility, and performance monitoring.
4. **[Content Update Guide](docs/ContentUpdateGuide.md)**: Instructions on changing personal information, updating technical skills, certificates, and lab profiles.
5. **[New Project Guide](docs/NewProjectGuide.md)**: Step-by-step walkthrough to add projects to the dynamic search grid.

---

## Running the Project Locally

Because the portfolio uses `fetch()` to load JSON data under production conditions, it is best viewed via a local web server to satisfy CORS policies.

### Option A: Using Visual Studio Code Live Server (Recommended)
1. Open the `portfolio` directory in VS Code.
2. Click **Go Live** in the status bar (requires the "Live Server" extension).
3. The browser will open the portfolio at `http://127.0.0.1:5500/index.html`.

### Option B: Using Node.js (npx)
Open a terminal in the root directory and run:
```bash
npx serve portfolio
```

### Option C: Direct file double-click (Offline Fallback)
You can double-click `index.html` to open the site directly using the `file://` protocol. The application will detect the environment, log a warning, and fall back to local static copies of the data, maintaining 100% functionality!
	
