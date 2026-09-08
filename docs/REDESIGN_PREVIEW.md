# Kella redesign: deployment record

The owner explicitly approved pushing and production deployment on September 7, 2026: "okay push and deploy". The earlier preview notes below are historical; no additional deployment approval is required for this reviewed release.

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

## Full-screen board revision — September 6
- Home now fills the viewport with the illustrated environment. Navigation is inside the board; the external Home navigation bars and sticky-note surfaces are removed. Existing icons have shadows and short labels.
- Supplied Kella character replaces Nikko as a separate animated layer. Gentle sway has a pause control and respects reduced-motion preferences.
- Generated wider and portrait boards keep the interface on the parchment on desktop and phones.
- Board heading uses a real event scheduled today (UTC), otherwise the next future event. No upcoming event is shown when there is none. Rankings and member totals are removed from Home; rankings remain a separate page.
- Realm-buff scheduling and Roots registration/reports/attendance are removed from website navigation, calendar, officer controls, page handlers, dashboard controllers and public website routes. Regular event attendance remains. Stored records are not deleted. Separate Discord bot code remains outside this website revision.
- Home no longer fetches the member ranking list, summary or realm-buff schedule. Removed application code reduces the main JavaScript from about 559 KB to 524 KB before compression. New backgrounds are about 2.4 MB landscape and 2.2 MB portrait; the browser selects one for its screen size.
- Backend build and regression suite pass, including current-event selection and removed-route GET/POST/PUT/DELETE 404 checks. Desktop 1440px, tablet 768px and phone 390/360px checked. Animation pause, Events/day details and Training navigation checked. Authenticated officer save flows remain unavailable in this protected local preview.
- No push or deployment. Production baseline remains unchanged.

## Transparent character video — September 7
Replaced the static Kella image and synthetic sway with the supplied coin-toss video. Background removed locally using frame segmentation, with additional cleanup near the feet and retention of the separate airborne coin. Export: transparent VP9 WebM, 480 x 672, 24 fps, 6.875-second loop, 787,721 bytes. Audio is omitted for the decorative loop. A transparent still from the clip is the poster.

The actual video pauses and plays through the existing motion control. Reduced-motion preferences start it paused. Verified transparent playback and pause/play in the in-app browser, plus 390px mobile playback with no horizontal overflow. Backend build and regression suite passed. Localhost preview restarted after the session ended; no deployment or production changes.

## Shared parchment style and board interactions — September 7
Home: removed the event-title scrollbar and the upper-right Account control. Profile now sits in the paper's top-right corner. The calendar/current-event block has a gold inset frame. Board icons and Profile spin and enlarge toward the screen before navigating, with immediate navigation for reduced-motion users and preserved modifier-click behavior.

Other pages: shared scenic background, framed parchment workspace, gold controls, warm tables and forms, matching navigation, calendar cells, Wiki library, rankings/member cards, training panels, profile and officer surfaces. Wiki-authored canvas content remains independently styled. Fixed the medium-width calendar so all seven weekday columns stay aligned, and contained long Wiki excerpts.

Checks: backend build and regression suite passed; Home, Events, Wiki, Training and Profile visually checked; board transitions and new Profile placement navigate correctly. Mobile 390px checks show no horizontal overflow, and the training calculator still changes 227K to 454K when days changes from 1 to 2. Authenticated officer/save views remain pending an isolated login environment. Production remains unchanged; work saved on the development branch only.

## Original project integration — September 7
Applied the complete redesign to the requested June 18 repository on `codex/kella-noticeboard-migration`, preserving its Migration submission, review, OAuth, role assignment, confirmation and member recovery changes. Migration has its existing gold icon on Home and an officer review link. Kella now pauses/resumes by clicking the character body, with keyboard access and no visible motion button. Reduced-motion behavior is preserved.

Localhost port 4173 now serves this repository. Migration fields are provided locally for preview; sign-in, submissions and all writes remain blocked. Fixed asset extraction to preserve embedded Migration styles inside application JavaScript. Build, Migration tests, cached asset/syntax checks, navigation, ranking and attendance access tests passed. Visual checks cover Home, character playback and Migration. Authenticated officer use still requires an isolated sign-in environment. Existing uncommitted frontend and test files were left untouched. No push or deployment.

## Approved release validation — September 7
Shared, backend, and Discord bot production builds passed, along with the complete backend regression suite. Local frontend output and unrelated uncommitted files are excluded. Public production smoke checks follow the push; authenticated browser checks still require the owner’s session.

## Desktop, export and mobile revision — September 8 (not deployed)
Live audit found Research constrained the entire shell to 1540px and left-aligned it, with a dark research canvas over a second decorative board. The local revision uses full-width navigation, centered parchment workspaces and a quiet forest background on interior pages. Research panels match the palette, start at readable size, and offer Fit tree / Readable view controls. Wiki excerpts and actions are aligned.

Migration review now has Download all applications (CSV). The server exports all pages/statuses within the authorized admin's alliance, including historical/custom answer fields. CSV uses UTF-8 and protects spreadsheet formulas and long identifiers. Password-admin and session-admin download methods are supported. No production applicants have been downloaded, changed or deleted during this task. Tests cover authorization, alliance scope, more than 30 records, preserved records, field completeness and CSV escaping.

Mobile and Safari use a continuously looping transparent animated WebP generated from the existing 165 cutout frames, avoiding WebM alpha-decoder differences. Desktop Chromium keeps the smaller video. Verified transparent animation at 390px with no horizontal overflow; an actual iPhone hardware check remains for the owner. Desktop Research, Wiki and Training visually checked; build and backend suite passed. Local preview remains on port 4173, with authentication and production writes blocked. These new revisions await deployment approval.

## Champions board and castle scenery — September 8 (not deployed)
Home now includes a left-hand Top 10 board with Power, Merits and Kills selection. Rows show rank, portrait, name and power, plus the selected score. The first three portraits have distinct crowned gold, silver and bronze frames. Existing ranking APIs supply real data; stale responses cannot replace a newer selection. Mobile boards stack with no horizontal overflow at 390px. Kella is smaller, lower right, mirrored left, continuously animated and transparent.

Admins now have an Upload stats link directly on Members, opening the existing dated JSON/CSV/XLSX roster upload workspace. Authentication restrictions are preserved; the read-only local preview does not expose admin upload or saving. Interior pages use a new fantasy castle scenery plate behind their centered parchment workspaces.

Validation: backend build and full test suite passed; Power, Merits and Kills lists each displayed ten live results; crowned frames and mobile stacking visually checked; Members desktop checked at 1440px. Preview restored on localhost:4173. No production changes or applicant mutations.

Generated asset: backend/public/castle-scenery.png, created with built-in image generation. Prompt: Create a wide 16:9 scenic background for the Kella fantasy alliance website. Bright cheerful polished 3D fantasy game illustration: majestic white elven castle with elegant tall blue and gold spires on the LEFT, sunny blue sky fluffy clouds, distant snowy mountains, pine forest, lush flower meadow foreground, gentle river winding through valley. Sunlit leaves frame upper right. Similar cheerful fantasy world to a wooden noticeboard in a sunny meadow. This is ONLY the environment plate: NO boards, NO paper, NO people, NO characters, NO text, NO UI. Keep center calm and open for a parchment interface overlay. Rich detail but cohesive lighting.
