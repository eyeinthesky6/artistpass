# Fresh-Account Deploy Test

This test verifies whether a stranger can use the **Make It Yours** flow without our local setup.

## What Is Already Verified

- Public GitHub clone works.
- `npm ci` works.
- `npm exec -- vercel build --prod --yes` works.
- Main repo is public and marked as a GitHub template.
- The deploy button is present in README and live footer.

## What Still Needs A Separate Account

Use a browser/profile that is not logged into the repo owner's GitHub/Vercel account.

1. Open the deploy button URL from the README.
2. Sign in or create a Vercel account.
3. Connect a Git provider if Vercel asks.
4. Confirm it creates a new project from `eyeinthesky6/artistpass`.
5. Enter a private `ADMIN_PUBLISH_PASSWORD`.
6. Confirm Vercel Blob store is requested/created.
7. Deploy.
8. Open the new deployment URL.
9. Open footer **Admin**.
10. Enter the same password.
11. Make a tiny harmless text change.
12. Click **Preview locally**.
13. Confirm only the local browser changes.
14. Click **Publish live**.
15. Refresh in a second browser/incognito window.
16. Confirm the public site shows the change.
17. Revert the tiny text change and publish again.

## Pass Criteria

- The user does not need to manually clone the repo.
- The user can choose a password during setup.
- Admin upload/publish works on the copied project.
- The live site updates for everyone after refresh.

## Fail Criteria

- Blob is not provisioned.
- Admin publish says password is wrong when the password is correct.
- The copied project still writes back to the original GitHub repo.
- The user cannot deploy without repo-owner permissions.

## Notes

This cannot be fully proven from the repo owner's existing logged-in environment. It needs a genuine fresh-account run.
