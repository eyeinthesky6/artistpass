# Why I Built ArtistPass for Scattered Artist Portfolios

Actors and performers rarely have a shortage of material. The problem is that the material lives everywhere.

A headshot might be in Google Drive. A reel might be on YouTube. A resume is attached to an old email. Instagram carries recent work, while a casting card sits in another folder. When someone asks for a profile, the artist has to assemble the same collection again.

ArtistPass started with a simple question:

> What if an artist could send one polished link containing the material people already ask for?

The first version is built around an actor portfolio because the structure is clear. It includes:

- a strong first screen;
- role and casting context;
- showreel links;
- headshots and stills;
- a resume and casting card;
- contact and sharing tools;
- a simple Admin area for later updates.

The current public profile uses a fictional sample artist. It demonstrates the complete experience without relying on a real person's identity or private material.

## Why Not Use a General Website Builder?

General website builders are powerful, but that power creates choices: pages, widgets, plugins, blocks, themes and settings. Many performers do not want to become website designers. They want to replace a photo, add a reel, update a credit and share the result.

ArtistPass deliberately narrows the job.

The public site is already designed. The artist or manager opens Admin, edits the relevant section, previews the change and publishes it. Videos stay on services such as YouTube, Vimeo or Google Drive. Images and PDFs can be uploaded to Vercel Blob.

This is not a full CMS, social network or casting platform. It does not promise auditions, followers or bookings. It is a clean presentation and handoff tool.

## Two Ways to Use It

ArtistPass has two honest paths.

Developers and website makers can use the open-source template, deploy it through Vercel and adapt the code.

Non-technical artists can ask for assisted setup. Someone technical handles the deployment, initial content and domain. After handoff, the artist uses the browser Admin for routine changes.

That split matters. A Vercel deployment is reasonable for a developer, but it is not friendly onboarding for someone who does not use GitHub. Renaming the technical action to **Developer** made that boundary explicit.

## What I Learned

The visual design was not the hardest part. The hard part was deciding what the product should refuse to become.

Every extra feature creates another decision for the artist and another maintenance promise for the maker. Keeping the product focused made the experience clearer:

1. Present the artist well.
2. Keep the useful materials together.
3. Make updates possible without editing code.
4. Let the artist own the deployed site.

ArtistPass is public and working. Whether it becomes a wider product, a collection of category-specific templates or simply a useful open-source experiment should be decided by real usage—not by adding more features in advance.

Live demo: https://artistpass.vercel.app  
Source: https://github.com/eyeinthesky6/artistpass

