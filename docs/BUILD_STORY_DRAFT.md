# Build Story Draft

Use this as the first LinkedIn/Dev.to post. Keep it plain and outcome-led.

## Title Options

- I built a self-managed actor portfolio website template
- From scattered artist links to one share-ready profile
- ArtistPass: an open-source portfolio website for actors and performers

## Short Post

I built ArtistPass, a self-managed actor and artist portfolio website template.

The idea is simple: most performers do not need a heavy CMS. They need one polished link that contains the material people actually ask for:

- headshots;
- showreel/reel links;
- resume/CV;
- casting card or EPK card;
- contact and share buttons;
- a simple way to update it later.

So I built it as a static/Vercel site with a browser Admin panel. The artist or manager can update text, links, images, PDFs and favicon, preview locally, then publish live.

The technical choice was deliberate: no complex CMS, no database, no dashboard maze. Vercel handles hosting and Blob storage. Videos stay link-based through YouTube, Google Drive, Vimeo or another host.

It is now open source as a template, and I am testing a small assisted setup offer for artists who do not want to touch GitHub or Vercel.

Live demo: https://artistpass.vercel.app  
Repo: https://github.com/eyeinthesky6/artistpass

If you work with actors, singers, models, anchors, performers or creators, I would love feedback on what is missing.

## Dev.to Outline

1. The problem: artists share scattered links.
2. The decision: one-page public profile plus simple Admin.
3. Why not a full CMS.
4. Architecture:
   - static HTML;
   - Vercel Functions;
   - Vercel Blob;
   - config-driven content;
   - link-based video hosting.
5. What the Admin can update.
6. What the template deliberately does not do yet.
7. Business experiment:
   - open-source template;
   - paid assisted setup;
   - partner distribution.
8. Links and invitation for feedback.
