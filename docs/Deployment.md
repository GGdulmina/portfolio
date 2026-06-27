# Deployment Guide: GitHub Pages & CI/CD Pipeline

This guide outlines how to deploy the static portfolio directory (`portfolio/`) to GitHub Pages using the pre-configured GitHub Actions workflow.

---

## 1. GitHub Repository Setup

To host the portfolio, push the workspace contents to a GitHub repository:

1. Create a public repository on GitHub (e.g., `portfolio`).
2. In your local repository:
   ```bash
   git init
   git add portfolio/
   git commit -m "feat: migrate project to static architecture"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

---

## 2. CI/CD Deployment with GitHub Actions

The portfolio includes `.github/workflows/deploy.yml` which triggers automated deployments on push to the `main` or `master` branches.

### Enabling GitHub Actions Deployment
1. Go to your repository on GitHub.
2. Navigate to **Settings** > **Pages** (in the sidebar).
3. Under **Build and deployment**, select:
   * **Source**: `GitHub Actions` (instead of *Deploy from a branch*).
4. Push a commit to your branch. GitHub Actions will build and deploy the `portfolio` subdirectory automatically.

---

## 3. Custom Domain Setup & DNS Configuration

If you wish to configure a custom domain (e.g. `portfolio.dulminahasith.com` or `dulminahasith.com`):

### Step 1: Add CNAME file in the root
Create a file named `CNAME` directly inside your `portfolio/` directory (or configure it in GitHub Settings):
```text
portfolio.dulminahasith.com
```

### Step 2: Configure DNS Records (at your DNS Registrar)
Depending on your domain type:

#### For an Apex Domain (e.g., `dulminahasith.com`)
Create four **A Records** pointing to GitHub Pages IP addresses:
* `185.199.108.153`
* `185.199.109.153`
* `185.199.110.153`
* `185.199.111.153`

#### For a Subdomain (e.g., `portfolio.dulminahasith.com`)
Create a **CNAME Record** pointing to your default GitHub Pages URL:
* **Host/Name**: `portfolio`
* **Target/Value**: `GGdulmina.github.io`
* **TTL**: `3600` (or default)

### Step 3: Enforce HTTPS
1. In your GitHub Repository, go to **Settings** > **Pages**.
2. Check the box **Enforce HTTPS** (it may take a few minutes for GitHub to issue the SSL certificate after DNS propagates).

---

## 4. Cache Invalidation Strategy

GitHub Pages sets caching headers for static resources (typically 10 minutes to 1 hour). If you push updates and don't see them:

1. **Hard Refresh**: Press `Ctrl + F5` (Windows/Linux) or `Cmd + Shift + R` (Mac) to bypass local browser cache.
2. **Asset Versioning**: For critical style or script modifications, append a query parameter or update the filename (e.g., `assets/css/style.css?v=1.1.0`).
3. **Service Workers**: This architecture does not implement Service Workers, preventing permanent caching lockouts.

---

## 5. Deployment Verification Checklist

Verify the following before declaring the release complete:

- [ ] **Console check**: Open Chrome DevTools (`F12`), visit the live site, and verify there are no red console errors.
- [ ] **Routing verification**: Click through Home, Projects, About, and Contact. Make sure navigation links do not trigger 404s.
- [ ] **Responsive check**: Toggle mobile view in DevTools and confirm the navigation bar folds into a functioning hamburger menu.
- [ ] **Dynamic load verification**: Confirm projects and certifications render in their grids.
- [ ] **Forms test**: Fill out the contact form and submit. Verify it directs to Formspree, displays a success indicator, and lands in your inbox.
- [ ] **SEO audit**: Run a Lighthouse audit on the live URL. Ensure SEO and Accessibility scores are > 95.
