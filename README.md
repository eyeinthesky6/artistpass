# ArtistPass Demo - Casting EPK Template

A single-page cinematic casting EPK demo using a fictional actor profile,
Ananya Rao. Static site, no build step. Just serve `index.html`.

Local demo URL: `http://127.0.0.1:4177/`
Production demo URL: `https://artistpass-epk-demo.vercel.app`

## Files
- `index.html` - the whole site and admin interface.
- `support.js` - runtime dependency, keep next to `index.html`.
- `artist-config.js` - optional published content overrides exported from Admin.
- `image-slot.js` - drag-and-drop image helper.
- `portfolio/demo-ananya/` - fictional demo images and short MP4 clips.
- `robots.txt`, `sitemap.xml`, `favicon.svg` - SEO/AEO basics.
- `vercel.json` - zero-config hosting settings.

## Why this base is useful
This is a deliberately simple architecture for non-technical users:

- No heavy CMS.
- No database required for the default version.
- Admin edits follow the visible page order.
- Preview is local, Publish live can push `artist-config.js` to GitHub through a
  Vercel API route.
- A future agent/skill can set up deployment, collect media links, write the
  config, and guide domain setup with only a Vercel account.

This makes the project a useful base for actor portfolios, singer EPKs,
creator press kits, founder pages, character dossiers, or book/movie pitch
pages where the user mostly needs text, images, reels, share cards and contact
links.

## Editing
- Open the site and scroll to the footer, then click **Admin**.
- Password: **demo2026**. Change this in `index.html` before any public launch.
- Admin follows the page order: Hero, Story, Casting dossier, Reel, Casting
  facts, Selected work, Headshots, Pass it on, Footer/contact, then Advanced.
- In **Pass it on / casting card**, edit the share image and the profile,
  role-fit, and clip share message templates.
- In **Footer/contact links**, edit phone, email, social links and the direct
  contact draft shown to visitors.
- **Preview locally** updates only the current browser and downloads a backup
  `artist-config.js`.
- **Publish live** asks for the publish password, then saves `artist-config.js`
  to GitHub through the Vercel API route. GitHub/Vercel then deploys the change
  so everyone sees the same update.

## Deploy to Vercel
Framework preset: **Other**. No build command. Output/root = the repo root.
Vercel serves `index.html` at the root.

If you use the Admin publish route, configure these Vercel environment variables:

- `ADMIN_PUBLISH_PASSWORD` - server-side publish password.
- `GITHUB_TOKEN` - GitHub token with contents read/write access to this repo.
- `GITHUB_REPO` - optional, defaults to `eyeinthesky6/artistpass-epk-demo`.
- `GITHUB_BRANCH` - optional, defaults to `main`.
- `GITHUB_COMMITTER_NAME` / `GITHUB_COMMITTER_EMAIL` - optional commit identity.

## Media Guidance
Admin is a link/path editor, not a full media uploader.

- Public reels: YouTube unlisted is easiest for playback and sharing.
- Private clips: Google Drive links are simple and less searchable, but anyone
  with the link can forward them.
- More controlled sharing: DocSend-style tools add passcodes, expiry, viewer
  verification, download controls and analytics, but they add process overhead.
- Images/headshots: committed files in `portfolio/` are simplest. For repeated
  client use, prefer Cloudinary or Vercel Blob with server-side upload handling.
- Future direct uploads: use Vercel Blob or Cloudinary with authentication,
  size limits and optimization. Do not bolt raw file uploads onto the static
  page without that backend.

## Template Directions
The current site can stay close to its present layout for actor/artist EPKs.
For other use cases, keep the same base stack and swap templates:

- Actor/artist EPK: current layout, reels, role fits, share card.
- Singer/musician EPK: audio/video reel, set list, genres, performance clips,
  booking CTA.
- Founder/expert profile: proof, talks, press, advisory fit, lead capture.
- Fictional character profile: character dossier, world lore, image/video
  gallery, teaser clips, future game hooks.

For a young adult fantasy/book direction, do not force reuse if the objective
becomes story discovery or gameplay. The current substrate is good for a single
shareable profile or small character dossier. Multiple characters would need a
character index, reusable config per character, and clearer navigation before it
becomes a proper story/game companion.
