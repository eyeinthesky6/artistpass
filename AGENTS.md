# ArtistPass Agent Guide

ArtistPass is an open-source actor and artist portfolio template. Keep the supported path small: one share-ready website, a browser Admin, Vercel deployment, Vercel Blob for shared updates, and hosted video links.

## Read First

1. `README.md`
2. `docs/ONE_CLICK_DEPLOY.md`
3. `docs/DISCOVERY.md`
4. `SECURITY.md` and `CONTRIBUTING.md`

## Supported Commands

```bash
npm ci
npm run validate
python -m http.server 4177
```

For a production build, use a Vercel-linked checkout:

```bash
npm exec -- vercel build --prod --yes
```

## Architecture

- `index.html`: public site, Admin interface and browser behavior.
- `artist-config.js`: static content override and exported Admin backup format.
- `api/config.js`: reads live configuration from Vercel Blob, then GitHub/static fallback.
- `api/publish-config.js`: password-protected live configuration publisher.
- `api/upload.js`: password-protected image and PDF uploads to Vercel Blob.
- `support.js`: existing page renderer. Reuse it; do not introduce a new frontend framework casually.

## Change Rules

- Use fictional or explicitly approved public identities and media only.
- Never commit passwords, tokens, `.env*` files, private artist material or campaign operations.
- Do not edit environment variables, billing, domains or credentials without explicit owner permission.
- Keep Admin labels and fields in the same order as the public page sections they edit.
- Edit shared profile data once and let existing derived uses update from that source.
- Keep videos link-based unless a new hosting/privacy design has been explicitly approved.
- Preserve the official demo's read-only Admin behavior.
- Do not promise auditions, bookings, leads, rankings, followers or career outcomes.
- Keep public claims aligned across README, website metadata, deploy-button copy, `llms.txt` and `docs/DISCOVERY.md`.

## Verification

- Run `npm run validate` for every change.
- For UI changes, check desktop and 390x844 mobile views.
- For Admin changes, verify local preview and the read-only official demo state.
- For deployment changes, verify the Vercel preview, `/api/config`, `robots.txt`, `sitemap.xml`, `llms.txt` and the deploy-button URL.
- Before public release or promotion, run a full-history secret scan and review generated/release assets.

## Codex Coordinator

- This repository is Codex Coordinator-enabled.
- Project identity is in `.codex/coordination/project.yaml`; current coordination state is in `.codex/coordination/CURRENT.md`.
- Load the globally installed `codex-coordinator` skill before substantial, overlapping, parallel, or cross-thread work.
- Respect the project ID and assigned task boundary; reject missing or mismatched cross-thread project bindings.
- Treat Coordinator internals as protected; only an explicitly user-authorised `COORDINATOR_MAINTAINER` may modify them.
