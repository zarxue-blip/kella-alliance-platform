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

## Noticeboard direction — September 6
Revised the local Home to follow the playful pinned-paper navigation of Teka Teki Studios, using the supplied Nikko scene unchanged and existing Kella icons/logo. Six pinned links open the real Events, Wiki, Members, Attendance, Research and Training routes. Rankings remain accessible from the alliance sign and below the board. Desktop navigation is now a compact top bar; phone navigation retains the bottom bar and drawer. Phone notes are enlarged beneath the scene. Shared workspace colors now use forest green and warm gold.

Removed the desktop side column and replaced the plain Home introduction with the illustrated entrance. No features, records, permissions or integrations were removed. Officer/account routes remain intact; authenticated officer actions still need a safe authenticated test environment. The local preview continues to block sign-in and writes.

Validation: backend build and full existing regression suite passed; pinned Event and Training links tested; calculator input 1 to 2 days changes highest result 227K to 454K; desktop, 768px tablet and 390px phone visually checked. Live baseline comparison confirms production unchanged. Added scene is 2.54 MB; this revision makes no new measured performance improvement claim. Previous cached frontend assets remain in place.
