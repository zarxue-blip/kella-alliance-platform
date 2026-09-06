# Migration and member recovery

- Migration: `/migration`; admin review: `/migration/admin` via **View Applications**.
- Application answers and field definitions are persisted in MongoDB `migrations`, with status, requester identity (when authenticated), delivery state and Discord message IDs. Visitor Discord names are self-reported.
- Discord channel: `1541258653875830814`. Grouped embeds split long answers without truncation. No score is invented: the reference form exposes no scoring formula.
- Admin table has status filters, pagination, a fixed player column and selected-row highlighting with complete answers below. All read/status/retry endpoints require existing dashboard admin authorization.
- API: GET `/api/migration/fields`; POST `/api/migration`; admin GET `/api/migration`, PATCH `/api/migration/:id`, POST `/api/migration/:id/retry`.
- Reference: user-provided Google Form `1FAIpQLSdC554ntQJoFxhzjGKyZEkUdei2pUIWwfGlb7aqjRijL5sBkA`; options retrieved 2026-09-06. Gold icon: `backend/public/migration-gold.png`.

## Toxic

The verified missing main is Lord ID `24055137`, not the visible Non Toxic (`24603190`) or New Semi Toxic (`26213312`) records. The August 14 rank export parses the missing main correctly. A residual import path could delete an existing uploaded game record to adopt a loosely related Discord shell; this is removed. UID matches always win, and only a unique normalized exact match can adopt an empty profile. Regression tests exercise real Toxic IDs.

An insert-only startup recovery uses the verified August 14 row (45,552,739 power), anchored to the known existing Kella record. It preserves the historical date, never replaces an existing main/farm, and records a one-time recovery marker. A fresh rank import is needed for current statistics. The exact historical sequence that dropped Toxic cannot be reconstructed from available logs.

The old August export also contains other IDs absent from today's roster (44 KoG rows before recovery, including HypoToxic). Historical absence alone cannot establish a sync defect or current membership, so those accounts are not automatically restored.

## Retired website features

Removed Roots and Buff Schedule navigation, page routes, dashboard controllers/APIs, calendar controls, modules and obsolete frontend Roots pages/cards. Shared database models, historical data, game research/training modifiers, and Discord bot response handlers are retained. Polls, roles, Best Online Time, Attendance and Wiki remain covered by checks.

## Validation

Backend/bot/frontend typechecks and builds; radar, identity, Poll and dashboard syntax regressions; actual Toxic UID import/recovery tests; Migration validation and HTTP save/post/retry/permission tests. HTTP tests mock MongoDB and Discord. Browser checked form, View Applications, and selected-row details with local fixtures. Live delivery needs production credentials/a real application; failures remain saved for admin retry.

## Applicant roles and confirmation

After saving an application, Kella assigns Discord roles `1546170085704605839` and `1546179090300534785` to the verified applicant. Role delivery and partial successes are persisted separately from embed delivery; admin retry assigns only missing roles. Applicants must be in the configured Discord server and the bot must be able to manage these roles.

The Migration-only **Connect Discord** flow verifies identity without granting a member/admin session. Visitors can connect before submission (the draft survives the redirect), or attach a verified identity afterward using their saved unguessable receipt. An existing linked identity cannot be replaced. Self-reported Discord names never authorize role assignment.

Successful submission opens a thank-you dialog with the actual role result. Select fields use the ASCII placeholder **Select an option**. Tests cover the exact role IDs, partial failure and retry, scoped OAuth, receipt ownership, and the rendered confirmation dialog. Live role assignment awaits a verified applicant; Discord requests are mocked in automated tests.
