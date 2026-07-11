# Building a Browser Admin with Static HTML and Vercel Blob

ArtistPass looks like a designed actor portfolio, but its more interesting feature is hidden in the footer: a small browser Admin that can update the live site.

The goal was not to build another general-purpose CMS. The goal was to keep a static portfolio easy to host while letting a non-technical owner change the content later.

## The Small Architecture

The project uses a deliberately compact stack:

- `index.html` contains the public site, Admin interface and page behavior;
- `artist-config.js` provides the editable content shape;
- Vercel Functions load, publish and upload content;
- Vercel Blob stores the live configuration, images and PDFs;
- GitHub publishing remains an optional fallback for older installations.

There is no database and no user-account system. Each deployed site has a private Admin publishing password configured in Vercel.

## Loading the Live Configuration

The page loads `/api/config` at runtime.

That function first checks Vercel Blob for `config/artist-config.js`. If it finds valid configuration, it serves it as JavaScript with caching disabled. If Blob is unavailable, it can fall back to the configured GitHub repository and branch. If neither source contains usable configuration, the page falls back safely to its bundled sample content.

This means a content update can appear on refresh without waiting for a new Vercel build.

## Publishing from the Browser

Admin edits are held in the browser until the owner chooses **Publish live**.

The publish function checks:

1. the request uses `POST`;
2. the official demo is not in read-only mode;
3. the supplied password matches the server-side environment value;
4. the submitted configuration is an object and stays under the size limit.

The configuration is serialized into the same `window.ARTIST_CONFIG` shape the page already understands. Vercel Blob is the preferred destination. When an older deployment has a configured GitHub token instead, the function can update `artist-config.js` through GitHub's contents API.

## Uploading Images and PDFs

Uploads use Vercel Blob's client-upload flow. Before issuing an upload token, the server checks the Admin password, restricts paths to `uploads/`, allows only known image or PDF content types and applies file-size limits.

The page stores the returned Blob URL in the matching Admin field. Videos are intentionally different: the site accepts links rather than uploading or transcoding video files.

## What This Design Trades Away

The Admin password is a lightweight publish key, not a complete authentication system. It is appropriate for this small template, but it is not the right model for a multi-user SaaS product with roles, billing and audit history.

Public Blob storage also means the template should not be used for private audition media or confidential documents. Link-based services with their own access controls are a better fit for restricted material.

These limits are features of the design decision, not details to hide.

## Why This Was Enough

The architecture matches the actual job:

- the public page stays fast and portable;
- the artist avoids a large CMS dashboard;
- developers can understand and fork the project;
- routine content changes do not require a rebuild;
- the deployment can remain under the artist's control.

The lesson was simple: a small publishing path can be more useful than a large editing platform when the content structure is already known.

Live demo: https://artistpass.vercel.app  
Source: https://github.com/eyeinthesky6/artistpass

