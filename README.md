<p align="center">
  <img src="docs/readme-logo.svg" alt="ArtistPass logo" width="820">
</p>

<p align="center">
  <strong>A cinematic artist EPK template with simple browser admin, share cards, reels, headshots and Vercel publishing.</strong>
</p>

<p align="center">
  <a href="https://artistpass.vercel.app"><strong>Live Site</strong></a>
  ·
  <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Feyeinthesky6%2Fartistpass-epk-demo&project-name=artistpass&repository-name=artistpass&env=ADMIN_PUBLISH_PASSWORD&envDescription=Choose+the+password+that+unlocks+the+website+Admin+panel+and+Publish+live+button.&stores=%5B%7B%22type%22%3A%22blob%22%2C%22access%22%3A%22public%22%7D%5D"><strong>Make It Yours</strong></a>
  ·
  <a href="#screenshots"><strong>Screenshots</strong></a>
  ·
  <a href="#admin-flow"><strong>Admin Flow</strong></a>
  ·
  <a href="#deploy"><strong>Deploy</strong></a>
</p>

<p align="center">
  <img alt="Static site" src="https://img.shields.io/badge/static-site-16120F?style=for-the-badge">
  <img alt="No CMS" src="https://img.shields.io/badge/no-heavy_CMS-C99B45?style=for-the-badge&labelColor=16120F">
  <img alt="Vercel" src="https://img.shields.io/badge/Vercel-ready-000000?style=for-the-badge&logo=vercel">
  <img alt="Admin publisher" src="https://img.shields.io/badge/admin-publish_live-C99B45?style=for-the-badge&labelColor=16120F">
</p>

## What It Is

ArtistPass is a share-ready profile website for actors, singers, creators and performers who need a polished portfolio without a heavy CMS. It gives them a cinematic public page, a simple admin panel, downloadable materials, and share flows that work for casting and production conversations.

The current profile is a sample fictional artist. Swap the config, images and reel links to make a new artist site.

## Screenshots

<p align="center">
  <img src="docs/screenshots/artistpass-home.png" alt="ArtistPass home screenshot" width="780">
</p>

<p align="center">
  <img src="docs/screenshots/artistpass-admin.png" alt="ArtistPass admin panel screenshot" width="390">
  <img src="docs/screenshots/artistpass-mobile.png" alt="ArtistPass mobile screenshot" width="210">
</p>

## Why This Base Works

| Need | ArtistPass approach |
| --- | --- |
| Fast launch | Static `index.html`, no build pipeline required. |
| Non-technical edits | Admin panel follows the page order and writes a config file. |
| Shared live updates | `Publish live` writes the live config to Vercel Blob, with GitHub fallback for older installs. |
| Casting workflow | Role-fit cards, reel section, headshots, resume, casting card image/PDF and share messages. |
| Low maintenance | No database and no heavy CMS. Media can live in the repo, YouTube, Google Drive, Cloudinary or Vercel Blob. |

## Features

- Cinematic first screen with profile CTA buttons.
- Role-fit dossier for casting context.
- Reel carousel with matching clips.
- Headshot gallery with one-click image downloads.
- Casting card image and PDF export.
- Resume PDF download.
- Native share flows with editable message templates.
- Browser admin panel with local preview and live publishing.
- SEO/AEO basics: canonical URL, social preview image, JSON-LD, sitemap and robots file.

## Admin Flow

```mermaid
flowchart LR
  A["Open site"] --> B["Footer Admin"]
  B --> C["Edit sections in page order"]
  C --> D["Preview locally"]
  D --> E{"Looks right?"}
  E -- "No" --> C
  E -- "Yes" --> F["Publish live"]
  F --> G["artist-config.js in Vercel Blob"]
  G --> H["Live site reads /api/config"]
  H --> I["Everyone sees the update after refresh"]
```

Admin is deliberately simple:

- **Preview locally** changes only your current browser.
- **Publish live** pushes the config to Vercel Blob. The live site reads the latest config on refresh.
- Images and videos are link/path based. For full uploads, add Cloudinary or Vercel Blob behind authentication.

## Project Structure

```text
.
├── api/config.js               # Runtime config loader
├── api/publish-config.js       # Admin publisher: Blob first, GitHub fallback
├── artist-config.js            # Published content override
├── downloads/                  # Resume and generated static downloads
├── docs/                       # README logo and screenshots
├── portfolio/demo-ananya/      # Sample profile images and short clips
├── index.html                  # Site, admin panel and runtime logic
├── support.js                  # Runtime dependency
├── robots.txt
├── sitemap.xml
└── vercel.json
```

## Local Use

Serve the folder with any static server:

```bash
python -m http.server 4177
```

Then open:

```text
http://127.0.0.1:4177/
```

## Deploy

Fastest setup:

<p>
  <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Feyeinthesky6%2Fartistpass-epk-demo&project-name=artistpass&repository-name=artistpass&env=ADMIN_PUBLISH_PASSWORD&envDescription=Choose+the+password+that+unlocks+the+website+Admin+panel+and+Publish+live+button.&stores=%5B%7B%22type%22%3A%22blob%22%2C%22access%22%3A%22public%22%7D%5D">
    <img src="https://vercel.com/button" alt="Deploy with Vercel">
  </a>
</p>

The button clones the template, creates a Vercel project, asks for the Admin password, and connects a public Blob store for live config.

Vercel settings:

- Framework preset: **Other**
- Build command: none
- Output/root: repo root

If you set up manually, add these Vercel environment variables.
The website loads `/api/config` at runtime, so Admin updates can appear on refresh without waiting for a full Vercel redeploy.

| Variable | Purpose |
| --- | --- |
| `ADMIN_PUBLISH_PASSWORD` | Server-side publish password. |
| `BLOB_READ_WRITE_TOKEN` | Preferred. Added automatically when a Vercel Blob store is connected. |
| `GITHUB_TOKEN` | Optional fallback. GitHub token with contents read/write access to this repo. |
| `GITHUB_REPO` | Optional fallback repo. Defaults to `eyeinthesky6/artistpass-epk-demo`. |
| `GITHUB_BRANCH` | Optional fallback branch. Defaults to `main`. |
| `GITHUB_COMMITTER_NAME` | Optional fallback commit identity. |
| `GITHUB_COMMITTER_EMAIL` | Optional fallback commit email. |

## Media Guidance

ArtistPass is a link/path editor by default, not a full media storage backend.

- Public reels: YouTube unlisted is the easiest playback option.
- Private/restricted clips: Google Drive links are simple and less publicly searchable, but anyone with the link can forward them.
- Controlled sharing: DocSend-style tools add passcodes, expiry, viewer verification, download controls and analytics.
- Images/headshots: committed files in `portfolio/` are simplest.
- Future direct uploads: use Cloudinary or Vercel Blob with authentication, size limits and optimization.

## Template Directions

This base can support more than one vertical:

- Actor/artist EPK: current layout, reels, role fits, share card.
- Singer/musician EPK: audio/video reel, genres, set list, booking CTA.
- Founder/expert profile: proof, talks, press, advisory fit, lead capture.
- Fictional character profile: character dossier, lore gallery, teaser clips and future game hooks.

## License Note

The sample profile, images and clips are placeholder/demo materials for showing the template flow. Replace them before using the template for a real artist or public client project.
