# Kella fantasy portal — local review

Preview: http://127.0.0.1:4174/

Branch: `codex/fantasy-portal-preview`. Deployment approved by the user on September 13, 2026.

## Changes

- Replaced the wooden home noticeboard with a cinematic entrance using Kella's existing character and castle scenery.
- Added an indigo atmosphere, restrained gold borders, metallic floating coins, and a new animated header logo made from the supplied four-second clip. Its pink background is transparent; the optimized animation is about 549 KB and has no audio.
- Added a Kella wordmark, shared compact navigation, account menu, and desktop UTC clock. Mobile uses a menu and larger touch controls.
- Added feature cards, current event, real member/check-in counts, upcoming events when scheduled, and an Alliance Chronicle drawn from existing events. Missing optional data is hidden rather than fabricated.
- Preserved the top-ten Power/Merits/Kills selector and existing circular gold, silver, and bronze champion frames.
- Restyled Wiki, members, calendar, attendance, Research, Training, Migration, profile, and officer tools. Authored Wiki canvases retain their content styles.
- Corrected inherited low-contrast Wiki/profile text and removed parchment backgrounds from the shared workspace.
- Kept member uploads, Migration exports/applications, optional chat images, and officer tools on their existing routes with existing authorization.

## Simplification and removals

The decorative wooden board and paper workspace are replaced by consistent portal sections. No production records, APIs, Discord commands, or working tools were removed. Previously retired Realm Buff/Roots of War systems remain retired. Calendar integration remains paused. The bot persona was not edited.

## Motion and performance

Coins animate transforms rather than layout. Mobile displays fewer coins. Reduced-motion preferences disable coin motion and select still character/logo assets. Tab visibility pauses ambient effects; the hero animation stops when it leaves the viewport. Existing hashed script/style caching remains intact, and feature artwork loads lazily.

Character placement controls are at the top of `backend/public/fantasy-portal.css`: scale, X/Y offset, maximum height, and crop. The original animation's transparent margins are compensated in its composition.

## Validation and limits

- Backend TypeScript build and complete backend test suite passed, including template syntax, ranking order, delayed navigation, member/editor/officer authorization, migration preservation/export, attendance, and chat attachments.
- Visually inspected desktop Home, Wiki, Members, Training, Migration, and profile; mobile Home, navigation, Calendar, Research, Officer, and Chat at 390px. Calendar/Research/Home had no page-level horizontal overflow. Ranking selection returned ten entries after switching to Merits.
- Preview uses read-only public live data with local role fixtures and a clearly labeled sample profile. Real sign-in, database saving, private applications, and Discord sending are deliberately unavailable locally. Live OAuth and message delivery were not exercised during this design review.
- Header animation transparency was checked in the browser. The supplied source video stays outside the repository; only optimized website assets are included.

Use the Member / Wiki Editor / Admin links in the local preview banner to inspect each role. Approve deployment explicitly only after reviewing the design.

## Final refinements

- Kella / Alliance Platform branding, corrected header character, and new transparent seven-second toss animation (about 1.44 MB).
- 2,000 uniform small header coins with mouse attraction and fading gold trails; reduced opacity and lighter mobile count. Main scenery coins bounce with reduced-motion support.
- Calendar previous/next month and Today controls, UTC labels, desktop event cells, and readable mobile agenda.
- Local role fixtures and sample profile remain preview-only; no production data or bot persona changes.
