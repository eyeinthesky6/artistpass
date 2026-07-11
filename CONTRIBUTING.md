# Contributing To ArtistPass

Thanks for helping improve ArtistPass.

The goal is simple: a polished actor/artist portfolio website that a non-technical person can update from the browser without a heavy CMS.

By participating, you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md). Use [SUPPORT.md](SUPPORT.md) for help and [SECURITY.md](SECURITY.md) for private vulnerability reports.

## Ground Rules

- Use fictional/sample profiles only. Do not commit a real person's private photos, videos, phone number or email.
- Keep the setup easy to explain to an artist, manager or small agency.
- Prefer existing files and patterns before adding new frameworks or services.
- Keep Admin labels clear and close to the public page section they edit.
- Do not add a database or full CMS unless there is a clear product reason.

## Good Contributions

- New performer templates: actor, singer, dancer, model, voice artist, musician.
- Better share flows for WhatsApp, email, native share and casting links.
- Smaller media files and better image/gallery handling.
- Admin improvements that reduce confusion.
- Better documentation for Vercel deploy, custom domains and assisted setup.

## Local Check

Serve the folder:

```bash
python -m http.server 4177
```

Then open:

```text
http://127.0.0.1:4177/
```

For production checks:

```bash
npm exec -- vercel build --prod --yes
```

## Pull Request Checklist

- The site still works locally.
- Production build passes.
- README and docs are updated if the user flow changed.
- Sample profile remains fictional.
- No secrets, real private contact details or private media are committed.
