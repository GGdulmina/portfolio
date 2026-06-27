# Content Update Guide: Modifying Skills, Experience, and Certifications

This guide provides instructions on how to update content in your static portfolio. All core dynamic sections are driven by clean, isolated JSON files located in `portfolio/data/`.

---

## 1. Changing Profile Information
Basic information (such as your availability, location, and social links) is embedded directly in the HTML pages for SEO indexing.

To update:
1. Open `index.html`, `about.html`, `projects.html`, and `contact.html`.
2. Locate the corresponding text (e.g., search for `Badulla, Sri Lanka` or `Open to work`).
3. Modify the value and save.

*Note: In `main.js`, there is a `FALLBACK_DATA` block. Make sure to update the static links and location there too to keep offline mode consistent.*

---

## 2. Modifying Technical Skills
Skills are loaded from `portfolio/data/skills.json`.

### Schema Format
```json
{
  "id": 1,
  "name": "Skill Name",
  "category": "CATEGORY_NAME",
  "iconClass": "devicon-iconname-plain"
}
```
* **Category Options**: Make sure they match the groups in your profile (`LINUX & SYSTEMS`, `CYBERSECURITY`, `TOOLS & PLATFORMS`, `PROGRAMMING & AUTOMATION`).
* **Icon Classes**: Find appropriate CSS class names in the [Devicon Library](https://devicon.dev/).

### Example: Adding a new skill
Add a new item to the array in `skills.json`:
```json
  {
    "id": 17,
    "name": "Docker Containerization",
    "category": "TOOLS & PLATFORMS",
    "iconClass": "devicon-docker-plain"
  }
```

---

## 3. Modifying Work Experience
Experience is loaded from `portfolio/data/experience.json`.

### Schema Format
```json
{
  "id": 1,
  "role": "Role Title",
  "company": "Company Name",
  "duration": "Year - Year",
  "description": "Short explanation of duties and accomplishments."
}
```

### Example: Adding an entry
```json
  {
    "id": 3,
    "role": "Junior Security Analyst",
    "company": "CyberShield Ltd",
    "duration": "2026 – Present",
    "description": "Configured Wazuh SIEM rulesets, responded to security alerts, and drafted vulnerability audit briefs."
  }
```

---

## 4. Modifying Certifications
Certifications are loaded from `portfolio/data/certificates.json`.

### Schema Format
```json
{
  "id": 1,
  "title": "Certificate Title",
  "issuer": "Issuing Organization",
  "status": "AQUIRED" | "PENDING",
  "verificationUrl": "URL_TO_VERIFY"
}
```

### Example: Updating a pending certificate
When you acquire a certificate, edit its status and verification URL in `certificates.json`:
```json
  {
    "id": 3,
    "title": "Certified Ethical Hacker (CEH)",
    "issuer": "EC-Council",
    "status": "AQUIRED",
    "verificationUrl": "https://www.eccouncil.org/verify"
  }
```

---

## 5. Modifying Lab Platforms
Lab platform profiles are loaded from `portfolio/data/labplatforms.json`.

### Schema Format
```json
{
  "id": 1,
  "name": "Platform Name",
  "profileUrl": "Link to profile",
  "progress": "Detailed description of rank or rooms completed",
  "iconClass": "devicon-platformname-plain"
}
```
Update these when you level up on TryHackMe or HackTheBox!
