# ArtistPass Distribution Plan

ArtistPass is now past "can we build it?" and into "how do people find it, trust it and use it?" Vercel is useful, but it should not be the only gate.

## Positioning

Primary promise:

> A share-ready actor portfolio website template with showreel, headshots, casting card, resume and simple browser Admin publishing.

Secondary promise:

> A lightweight artist EPK and creator website base for performers who need a polished profile without a heavy CMS.

Use both. Actors search for portfolio, profile, showreel, headshots, resume and casting card. Musicians and singers understand EPK, press kit and media kit.

## Distribution Channels

| Channel | Role | Status | Action |
| --- | --- | --- | --- |
| GitHub template repo | Developer and maker discovery | Ready | Keep README strong, use topics, releases and screenshots. |
| Live demo | Trust and conversion | Ready | Keep `https://artistpass.vercel.app` polished and fictional/sample-only. |
| Vercel deploy button | Fast setup path | Ready | Keep as the main "Make It Yours" action. |
| Vercel Templates | Optional template gallery | Prepared | Submit if easy, but do not wait on it. |
| Product Hunt | Maker audience launch | Not launched | Launch as a product when copy, screenshots and demo video are ready. |
| Dev.to / Hashnode / Indie Hackers | Story and builder audience | Not launched | Publish the build story and technical lesson: no heavy CMS, browser Admin, Vercel Blob. |
| LinkedIn / X | Founder and service audience | Not launched | Position as a public build plus paid assisted setup. |
| Artist/casting communities | End-user audience | Not launched | Lead with outcome: showreel, headshots, contact card and shareable casting profile. |
| Paid setup offer | Monetisation | Not launched | Offer "we set it up for you" for artists who do not want GitHub/Vercel. |
| Static-only Netlify edition | Wider deploy button support | Later | Only worth doing if we remove Vercel Blob/Admin publish or add a Netlify-compatible backend. |

## Why Vercel Is Still Useful

Vercel is the current best fit because ArtistPass uses Vercel Functions and Vercel Blob for Admin publish and uploads. The deploy button can clone a public Git repo, ask for environment variables and connect storage, which matches the product.

Use Vercel as the recommended hosting path. Do not force Vercel Templates as the only discovery path.

Official reference points:

- Vercel Deploy Button: https://vercel.com/docs/deploy-button
- Vercel Templates: https://vercel.com/templates
- GitHub template repositories: https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository

## What About Netlify And Other Hosts?

Netlify also has a deploy button, but ArtistPass currently depends on Vercel Functions and Vercel Blob. A Netlify button would be misleading unless we build one of these:

- a static-only edition where Admin exports config and the user replaces a file;
- a Netlify Functions edition with Netlify-compatible storage;
- a "view-only demo" that does not promise live browser publishing.

So Netlify is a good future distribution branch, not today's main path.

Official reference:

- Netlify deploy button: https://docs.netlify.com/deploy/create-deploys/#deploy-to-netlify-button

## Product Hunt Angle

Product Hunt is not a template host. It is a launch surface for makers and early adopters. Use it for the story:

- "I built a self-managed actor portfolio website template with no heavy CMS."
- "Actors can update headshots, resumes and casting cards from the browser."
- "Makers can fork it, deploy it or sell assisted setup."

Official reference:

- Product Hunt launch guide: https://www.producthunt.com/launch

## Monetisation Paths

| Offer | Buyer | Price shape | Why it works |
| --- | --- | --- | --- |
| Free open-source template | Developers, makers | Free | Builds trust, backlinks and forks. |
| Assisted setup | Actors, singers, creators | Fixed setup fee | They do not want GitHub or Vercel complexity. |
| Done-for-you portfolio | Artists and managers | Higher service fee | We handle copy, assets, domain and launch. |
| Agency starter kit | Website makers | Paid support or customization | They can reuse the base for many artist sites. |
| Vertical templates | Singers, dancers, speakers, authors | Template pack or service package | Same architecture, different content structure. |

For the detailed revenue model, package pricing and 90-day execution plan, see [BUSINESS_PLAN.md](BUSINESS_PLAN.md).

## Launch Sequence

1. Keep the live demo stable and fictional/sample-only.
2. Finish one full fresh-account deploy-button test.
3. Add a short demo video/GIF to the README.
4. Publish one build story: problem, architecture, Admin flow, lessons.
5. Share the GitHub repo and live demo on LinkedIn/X.
6. Post to dev communities with the technical angle.
7. Post to creator/artist communities with the outcome angle.
8. Launch on Product Hunt when the first story and demo video are ready.
9. Offer paid assisted setup from the README and live site.
10. Decide later whether to build Netlify/static and singer/musician variants.

## What Not To Do

- Do not claim "no account needed" for self-serve deployment. Vercel still needs an account.
- Do not promise private video hosting yet. Videos are link-based.
- Do not bend the codebase for every directory listing.
- Do not depend on one template gallery approving us.
- Do not use real artist identity/assets without explicit permission.
