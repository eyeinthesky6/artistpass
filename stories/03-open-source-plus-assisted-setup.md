# Why ArtistPass Is Open Source with an Assisted Setup Path

ArtistPass is an experiment in separating software ownership from service convenience.

The code is open source under the MIT License. A developer can inspect it, adapt it and deploy a copy. At the same time, a non-technical artist can pay someone to set it up, organize the initial material and hand over a working website.

Those two paths do not have to compete.

## The Developer Path

For someone comfortable with GitHub and Vercel, ArtistPass is a reusable template.

The developer can:

- create a copy of the repository;
- deploy it to Vercel;
- connect Blob storage;
- choose an Admin publishing password;
- change the design or content model;
- hand the finished site to an artist or client.

The public website now labels this route **Developer**. That wording is intentionally plain. The underlying flow includes Git-provider selection, account permissions, environment variables and storage setup. Calling it effortless onboarding for every artist would be misleading.

## The Assisted Path

The assisted route removes that technical setup from the artist's experience.

The service can include:

- collecting approved headshots, biography, reels and documents;
- preparing the first version of the portfolio;
- deploying the site in the client's account;
- connecting a domain when needed;
- explaining the privacy limits of public media;
- handing over the website link, Admin entry and publishing password.

After that, routine edits can happen through the browser Admin. The service is valuable because it saves time and reduces setup friction—not because the code is hidden.

## Why Open Source Helps

Open source gives the project a useful trust layer.

Developers can see what the Admin sends, where the content is stored and which parts are intentionally simple. Agencies and freelancers can reuse the base rather than starting from an empty page. Artists are not locked into a proprietary editor that disappears when a subscription ends.

It also creates a clear standard for claims. ArtistPass is a portfolio and publishing tool. It does not guarantee auditions, casting decisions, followers, leads or career outcomes.

## The Honest State of the Experiment

The website works. The repository is public. The developer deployment and assisted contact paths have been tested. Basic analytics are enabled.

Market validation is still early.

That distinction matters. A finished product page is not proof of demand. A polished README is not a customer. The next useful evidence is much smaller and more concrete: a developer who completes a deployment, an artist who asks for setup, a partner who replies, or someone who is willing to pay for the handoff.

So the plan is intentionally light:

1. Leave the open-source project available.
2. Publish the build story in a few relevant places.
3. Make a small number of thoughtful partner approaches.
4. Watch real visits, completed deployments and assisted enquiries.
5. Add major categories or a builder only if usage earns that investment.

This is a comfortable stopping point. The product can remain useful even if it never becomes a large SaaS business.

Live demo: https://artistpass.vercel.app  
Source: https://github.com/eyeinthesky6/artistpass

