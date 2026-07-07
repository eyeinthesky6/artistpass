# One-Click ArtistPass Setup

ArtistPass can be used in two ways:

- **DIY setup:** click the Vercel deploy button and make your own copy.
- **Assisted setup:** ask someone technical to deploy it once, then use the Admin panel yourself.

## DIY Setup

Click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Feyeinthesky6%2Fartistpass&project-name=artistpass&repository-name=artistpass&env=ADMIN_PUBLISH_PASSWORD&envDescription=Choose+a+private+Admin+password.+This+password+unlocks+Publish+live+and+uploads+in+your+ArtistPass+admin+panel.&envLink=https%3A%2F%2Fgithub.com%2Feyeinthesky6%2Fartistpass%23admin-flow&demo-title=ArtistPass+EPK+Template&demo-description=Cinematic+artist+profile+with+simple+admin%2C+share+cards%2C+reels+and+Vercel+Blob+publishing.&demo-url=https%3A%2F%2Fartistpass.vercel.app&demo-image=https%3A%2F%2Fartistpass.vercel.app%2Fdocs%2Fscreenshots%2Fartistpass-home.png&stores=%5B%7B%22type%22%3A%22blob%22%2C%22access%22%3A%22public%22%7D%5D)

Vercel will:

1. Clone the public ArtistPass repo.
2. Create a new Vercel project.
3. Ask for `ADMIN_PUBLISH_PASSWORD`.
4. Create a public Vercel Blob store.
5. Deploy the website.

## First Edit

After deployment:

1. Open your new Vercel URL.
2. Scroll to the footer and click **Admin**.
3. Enter the same Admin password you set on Vercel.
4. Edit **Hero** first: name, headline, photo and favicon.
5. Edit **Pass it on / casting card** next: headshot, share message, resume and casting card.
6. Edit **Footer & contact links**: phone, email and socials.
7. Use **Preview locally** to check your browser.
8. Use **Publish live** when the page is ready for everyone.

## Media Rules

- Upload images and PDFs from Admin.
- Paste video links from YouTube, Google Drive, Vimeo or another host.
- Keep private audition clips on link-based services if you do not want them publicly searchable.
- Replace all sample profile content before using the site for a real artist.

## Custom Domain

Start with the free `vercel.app` URL.

When the site is ready:

1. Open the Vercel project.
2. Go to **Settings > Domains**.
3. Add an existing domain or buy one.
4. Set it as the production domain.
5. Update website text/share messages in Admin if they mention the old URL.

## Important

The Admin password is not a full CMS account system. It is a simple publish key for this lightweight template. Keep it private. If it leaks, rotate `ADMIN_PUBLISH_PASSWORD` in Vercel.

Official references:

- [Vercel Deploy Button](https://vercel.com/docs/deploy-button)
- [Vercel Templates](https://vercel.com/templates)
- [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)
