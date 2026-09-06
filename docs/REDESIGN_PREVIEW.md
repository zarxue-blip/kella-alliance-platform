# Kella redesign: development only

Production deployment is NOT approved. Do not push or merge this branch to a production deployment branch, publish it to Kella.online, change production services, or run the production bot/database from this checkout.

The owner requires a complete interactive preview, member and officer verification, and feedback revisions before explicitly authorizing deployment. “Continue”, “proceed”, and “looks good” are not deployment authorization.

## Source verification

The HTML produced by `backend/src/views/kellaDashboard.ts` at `cb9214355b4273e3816f83602edc3cd1650ba19c` exactly matched the live HTML on September 6, 2026. That is the frontend being refined. The separate Next.js frontend was not redesigned.

## Local development

Run `npm run preview:safe` from the repository. It listens only on `127.0.0.1:4173`, serves the actual application template and assets, and reads an allowlist of public production APIs without forwarding credentials. Writes and authentication are blocked. No production database or Discord bot is started.

The owner has requested localhost for preview and can review this local interface. It is not yet the complete authenticated preview. It cannot validate saves, real role transitions, private officer data, OAuth, or Discord actions. Do not add a fake admin switch or pass production credentials to this server.

The production API still has the old ranking limit behavior. The local read adapter trims real records and uses the same ranking helper; selected non-Power metrics require the existing full member endpoint until an isolated backend runs the modified API. Therefore local upstream payload size is not evidence of the new API's performance.

## Validation

Build the shared package before building the backend. `npm test` includes existing identity, polls, radar, and template checks plus ranking order/limits, cached assets, and route access regression tests. The backend builds and the Discord bot passes type checking.

Member pages were checked at 360, 390, 430, 768, 1366, and 1920 pixels. Browser interactions checked include ranking search/selection, member modal, Wiki search/read, calendar details, mobile More navigation, and training result updates.

## Remaining work before preview handoff

- Obtain an isolated staging backend/database and test Discord/OAuth configuration.
- Test real member and officer sessions, permissions, all save/delete feedback, Wiki image dragging during scroll, Roots management, polls/roles, buffs, imports, and Discord integrations there.
- Complete any fixes found in those tests. Officer interface changes have not received authenticated browser verification.
- A new session-protected personal attendance endpoint matches the signed-in Discord ID within the member’s alliance. Status selection and rejection of invalid/missing sessions are tested. Verify real authenticated data before treating this feature as fully accepted.
- Validate authenticated announcements on Home.
- Review performance with the modified API running, including database query costs; compact ranking responses still use the existing bounded roster query internally.
- Give the owner the completed interactive preview and change summary. Do not request deployment approval before that point.

The local preview now labels its sign-in/save limitations and intercepts sign-in attempts with a readable notice. Asynchronous page renderers are guarded against responses arriving after navigation; a delayed Wiki response regression test covers this failure.
