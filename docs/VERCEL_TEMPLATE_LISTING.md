# Vercel Template Listing Packet

Use this when submitting ArtistPass to the Vercel template gallery. This is an optional distribution channel, not the launch gate.

## Template Basics

- **Name:** ArtistPass
- **Slug:** artistpass-actor-portfolio
- **Repository:** `https://github.com/eyeinthesky6/artistpass`
- **Demo URL:** `https://artistpass.vercel.app`
- **Framework:** Other / Static HTML with Vercel Functions
- **Category:** Portfolio, Marketing, Creator Tools
- **Storage:** Vercel Blob
- **Required env var:** `ADMIN_PUBLISH_PASSWORD`

## Short Description

Self-managed actor portfolio website with showreel, headshots, casting card, resume and browser Admin publishing.

## Long Description

ArtistPass is a lightweight actor portfolio website and artist EPK template for actors, singers, creators, models, dancers, musicians and performers. It ships with a cinematic profile page, role-fit cards, showreel/reel links, headshot gallery, casting card image/PDF export, resume/CV download, editable share messages and browser Admin publishing.

The template avoids a heavy CMS. Vercel Blob stores live Admin updates and uploaded images/PDFs, while videos remain link-based through YouTube, Google Drive, Vimeo or another host.

## Deploy Button

```md
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Feyeinthesky6%2Fartistpass&project-name=artistpass&repository-name=artistpass&env=ADMIN_PUBLISH_PASSWORD&envDescription=Choose+a+private+Admin+password.+This+password+unlocks+Publish+live+and+uploads+in+your+ArtistPass+admin+panel.&envLink=https%3A%2F%2Fgithub.com%2Feyeinthesky6%2Fartistpass%23admin-flow&demo-title=ArtistPass+-+Actor+Portfolio+Website+%26+Artist+EPK&demo-description=Self-managed+actor+portfolio+website+with+showreel%2C+headshots%2C+casting+card%2C+resume+and+browser+Admin+publishing.&demo-url=https%3A%2F%2Fartistpass.vercel.app&demo-image=https%3A%2F%2Fartistpass.vercel.app%2Fdocs%2Fscreenshots%2Fartistpass-home.png&stores=%5B%7B%22type%22%3A%22blob%22%2C%22access%22%3A%22public%22%7D%5D)
```

## Tags

`actor-portfolio`, `artist-portfolio`, `portfolio-website`, `website-template`, `creator-website`, `actor-website`, `showreel`, `headshots`, `casting-profile`, `casting-card`, `actor-resume`, `artist-epk`, `electronic-press-kit`, `media-kit`, `music-portfolio`, `personal-website`, `vercel-template`, `vercel-blob`, `static-site`, `no-code-admin`

## Publish Recommendation

Submit ArtistPass to Vercel Templates if the submission path is available and the deploy flow stays stable. Do not wait on Vercel review before distributing the project elsewhere.

Why it is worth doing:

- Vercel Templates are a natural discovery surface for developers and makers looking for deployable starting points.
- ArtistPass already has a deploy button, sample data, MIT license, screenshots and Vercel Blob setup.
- The template story is specific: actor portfolio website / artist EPK with browser admin and no heavy CMS.

Why not rush it:

- Vercel template visitors expect the deploy button to work smoothly.
- The sample profile must remain fictional and rights-safe.
- The README must be clear enough that a stranger understands the setup without us explaining it in chat.

Recommended path:

1. Keep the GitHub repo public and marked as a template.
2. Let a fresh browser or second account run through the deploy button once.
3. Confirm Blob-backed Admin publish works on the copied project.
4. Submit with the listing copy above.
5. Use GitHub, the live demo, Product Hunt, creator communities and assisted setup offers first; treat Vercel Templates as an additional channel, not the only launch.

## Submission Status

Current status: **ready if we choose to submit through a logged-in Vercel account**.

What is done:

- Public GitHub repo is live and marked as a template.
- Live demo is live at `https://artistpass.vercel.app`.
- Deploy button is present in README and footer.
- Listing title, description, tags and deploy URL are prepared above.
- Fresh public clone smoke test passed on 2026-07-07:
  - cloned `https://github.com/eyeinthesky6/artistpass.git`;
  - checked commit `e0a0a1f`;
  - ran `npm ci`;
  - ran `npm exec -- vercel build --prod --yes`;
  - build completed successfully.

What still needs a logged-in human click if we submit:

- Open `https://vercel.com/templates/submit`.
- Sign in to the Vercel account that should submit the template.
- Paste the listing fields from this file.
- Submit for Vercel review.

Note: the submission page is behind Vercel login. A local CLI build can verify the template package, but final gallery submission is a dashboard/form action. If Vercel does not accept or prioritize the template, keep distributing through the broader plan in [DISTRIBUTION_PLAN.md](DISTRIBUTION_PLAN.md).

## Submission Checklist

- [ ] Public repo is clean and fictional/sample only.
- [ ] README has screenshots and deploy button.
- [ ] Live demo is working.
- [ ] Admin publish works with Vercel Blob.
- [ ] Sample assets are clearly labelled as sample/demo.
- [ ] License is present.
- [ ] Template copy does not promise no-account deployment.
- [x] Fresh public clone build test completed.
- [ ] Fresh-account deploy-button test completed.
- [ ] GitHub topics and repo description match the template listing.
- [ ] Logged-in Vercel submission form completed.
