# Maintenance Manual: Long-term Operations & Standards

This document describes standard maintenance procedures, dependency policies, and performance verification standards for the static portfolio.

---

## 1. Technical Stack & Dependency Policy

To ensure maximum performance and longevity, the portfolio implements a **Zero-Framework Dependency Policy**.

### Allowed Dependencies
External resources are loaded via reliable CDNs. Avoid bundling heavy libraries:
1. **Fonts**: Google Fonts (`JetBrains Mono`, `Syne`, `Inter`). Loaded via CSS `@import`.
2. **Icons**: Devicons CSS library. Loaded via `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css`.
3. **Scripts**: Pure ES6 Vanilla JavaScript. **Do not introduce jQuery, React, Vue, or angular** unless a complex web application is explicitly demanded.

---

## 2. Browser Compatibility Verification

The JavaScript engine relies on modern web API standards. Regularly verify compatibility:
* **CSS Custom Properties (Variables)**: Used for color schemes and margins. Supported by 99.5%+ of active browsers.
* **IntersectionObserver**: Highlights sidebar nav sections and lazy loads images. If compatibility with legacy browsers (pre-2017) is required, load the official W3C IntersectionObserver polyfill in `index.html`.
* **Async/Await / Fetch API**: Used to load JSON files. Falls back automatically if blocked by CORS or offline restrictions.

---

## 3. Performance & Asset Optimization

To maintain a Lighthouse score above 95 across all metrics, enforce the following asset guidelines during updates:

### Image Assets (e.g. `avatar.jpg`)
* **Format**: Use Next-Gen formats like `.webp` or `.avif`. If `.jpg` is used, ensure it is compressed.
* **Dimensions**: Maintain matching dimensions. An avatar image should not exceed 800px width/height.
* **Compression**: Run all images through utilities like [TinyJPG](https://tinyjpg.com) or `imagemin` command-line tools before committing.

### Stylesheets & Scripts
* **Minification**: For production deployment, you can minify JavaScript and CSS.
* **Render Blocking**: Keep JavaScript at the bottom of the body or load it asynchronously using the `defer` attribute to prevent blocking page paint.

---

## 4. Operational Monitoring & Security

### Security Audits
Since there is no server execution, security checks focus on:
1. **Third-party links**: Periodically scan `projects.json` and `certificates.json` for broken URLs or link rot.
2. **CDN integrity**: Ensure CDN links for icons are loaded via HTTPS.

### Form Verification
Formspree alerts you if your form endpoint is down or rate-limited. Periodically test the contact form to verify emails arrive immediately.
