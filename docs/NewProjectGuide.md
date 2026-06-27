# New Project Guide: Adding Projects to the Dynamic Grid

This guide describes how to publish new projects in the portfolio's dynamic project card list.

---

## 1. Edit the Project Data Store
All projects are loaded dynamically from `portfolio/data/projects.json`.

### Project Object Schema
Every project object must follow this structure:
```json
{
  "id": 5,
  "title": "Project Name",
  "description": "Short explanation of features, functionality, and why you built it.",
  "techStack": "Comma, Separated, Stack, List",
  "githubUrl": "https://github.com/...",
  "liveUrl": "https://...",
  "featured": true | false,
  "certificateName": "Associated Credential",
  "certificateUrl": "https://..."
}
```

### Field Definitions
* **id**: Unique identifier (integer). Incremented from the last project ID.
* **title**: Display name of the project.
* **description**: Safe plain text (HTML characters are auto-escaped by the JS engine to prevent XSS).
* **techStack**: Comma-separated list of technologies. The rendering engine splits these into individual badges automatically.
* **githubUrl**: (Optional) Link to GitHub repository. Left empty if private.
* **liveUrl**: (Optional) Link to interactive application or demo site.
* **featured**: (Boolean) Set `true` to display this project on the Home landing page as well as the Projects page.
* **certificateName** / **certificateUrl**: (Optional) Links a specific credential earned as part of this project.

---

## 2. Sync Offline Fallback (Critical)
To preserve the CORS-safe offline mode, update the copy inside `portfolio/assets/js/main.js`:

1. Open `portfolio/assets/js/main.js`.
2. Locate the `FALLBACK_DATA` object at the top of the file.
3. Find the `projects: [...]` array.
4. Copy the new project JSON object you added to `projects.json` and paste it into the array.
5. Save the file.

---

## 3. Local Verification Process
Before committing and deploying:

1. Launch a local web server (e.g. VS Code Live Server or `npx serve portfolio`).
2. Open the **Projects** page.
3. Test features:
   * **Search**: Type in the search input box (e.g. typing your new project title or stack tag). Ensure the card filters correctly.
   * **Sort**: Toggle the sorting selector to "Title: A to Z" and check the layout order.
   * **Filter**: Select "Featured Only" to verify the featured flag behaves correctly.
4. Open the **Home** landing page. Ensure the card appears in the "Featured Projects" section (if marked `featured: true`).
5. Open `index.html` directly via the `file://` protocol. Confirm that the dynamic cards load using the local fallback data.
