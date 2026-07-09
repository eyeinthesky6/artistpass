# One-Click ArtistPass Setup

ArtistPass can be used in two ways:

- **DIY setup:** click the Vercel deploy button and make your own copy.
- **Assisted setup:** ask someone technical to deploy it once, then use the Admin panel yourself.

## Who This Is For

ArtistPass is positioned around the words artists and website makers already use:

- Actors: actor portfolio website, acting portfolio, actor profile, casting profile, showreel, demo reel, headshots, actor resume/CV and casting card.
- Singers and performers: artist portfolio website, singer portfolio, musician website, music portfolio, EPK, electronic press kit, press kit and media kit.
- Website makers: portfolio website template, personal portfolio website, creator website, no-code admin, self-managed website and Vercel template.

## DIY Setup

Click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Feyeinthesky6%2Fartistpass&project-name=artistpass&repository-name=artistpass&env=ADMIN_PUBLISH_PASSWORD&envDescription=Choose+a+private+Admin+password.+This+password+unlocks+Publish+live+and+uploads+in+your+ArtistPass+admin+panel.&envLink=https%3A%2F%2Fgithub.com%2Feyeinthesky6%2Fartistpass%23admin-flow&demo-title=ArtistPass+-+Actor+Portfolio+Website+%26+Artist+EPK&demo-description=Self-managed+actor+portfolio+website+with+showreel%2C+headshots%2C+casting+card%2C+resume+and+browser+Admin+publishing.&demo-url=https%3A%2F%2Fartistpass.vercel.app&demo-image=https%3A%2F%2Fartistpass.vercel.app%2Fdocs%2Fscreenshots%2Fartistpass-home.png&stores=%5B%7B%22type%22%3A%22blob%22%2C%22access%22%3A%22public%22%7D%5D)

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

For the official public demo, set `ARTISTPASS_DEMO_READONLY=true` in Vercel. That blocks Admin publish/upload on the demo while keeping **Make it yours** clones editable with their own Admin password.

Official references:

- [Vercel Deploy Button](https://vercel.com/docs/deploy-button)
- [Vercel Templates](https://vercel.com/templates)
- [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)
