# Command center review — September 9, 2026

Status: local development only. Production deployment requires approval.

## Interface
- One compact navigation bar with alliance identity, UTC clock and account menu.
- Mobile navigation expands below the same header; less-used destinations remain in More.
- Officer tools are grouped icon cards for Events & War, Members & Alliance, Content / Wiki, Discord and Settings.
- Interior pages reuse the existing castle scenery and parchment styling; reduced-motion preferences are respected.

## Access
- Existing Discord roles and dashboard password remain the sources of access.
- Stored passwords must pass the server access check before revealing administrative UI.
- Member and wiki-editor accounts cannot open officer pages or invoke administrative mutations. Wiki editors retain their editing tools.
- Legacy event creation and attendance management now require administrator access; members cannot RSVP/check in another player's profile.
- Officer notes are excluded from the public roster and personal profile; the management endpoint requires admin access.
- Page requests receive an access-denied shell when authorization is missing. Each protected data endpoint enforces authorization separately.

## Discord cleanup
- Removed /roots, /rowlist, their date menus, registration actions, bot API endpoints, publishing helper and Roots-specific presence text.
- Old Roots buttons return a retirement notice without changing records.
- Realm Buff publishing was already disconnected; no active bot command or scheduler remains.
- Removed duplicate /suggest; use /complain with type Suggestion. Removed the duplicate Wiki Admin button pointing to the public reader.
- Retained announcements, check-in/absence, Summit, polls and role voting, war/shield alerts, embeds, migration, /sum and mention replies.
- Historical database models and data remain intact. Old Discord posts are not deleted. Command removal takes effect on the next approved bot deployment/command registration.

## Translation
- Server-side Groq translation uses the existing GROQ_API_KEY and openai/gpt-oss-20b with low reasoning effort, an 8-second timeout, and the existing Google/MyMemory fallback.
- Protected placeholders retain Discord mentions/IDs, URLs, coordinates, game names, code and emoji; malformed results fail safely.
- Translation replies use gold embeds, suppress pings, paginate within Discord limits, and deduplicate repeated flag reactions for 60 seconds.
- No new dependencies or client-side keys. No live Discord messages were sent during testing.
- Model reference: https://console.groq.com/docs/model/openai/gpt-oss-20b

## Review preview
Run npm run preview:safe, then open http://127.0.0.1:4173/officer?__role=admin .
The banner switches Member, Wiki Editor and Admin UI fixtures. This is a loopback-only preview, not a login bypass in the production app. Public pages read public live data; private lists use empty fixtures. All writes are blocked. Real Discord login and production credentials must be verified after approval.

## Validation
Backend and bot builds; existing backend regression suite; focused member/editor/officer/owner/disabled-account permissions and forged-password tests; cross-member registration denial; mocked translation preservation, rate-limit fallback, embed, ping suppression, deduplication and command-list tests. Browser checks cover desktop officer layout, mobile navigation and wiki editing visibility.
