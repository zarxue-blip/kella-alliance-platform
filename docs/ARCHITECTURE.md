# Architecture

Dragon Command is split into four deployable units that share one TypeScript contract package.

## Runtime Flow

1. Users authenticate with Discord OAuth2 through the backend.
2. The backend creates a signed session cookie and exposes role-aware REST endpoints.
3. The dashboard calls REST endpoints and subscribes to Socket.IO events for live updates.
4. The Discord bot executes slash commands and interaction responses by calling service-authenticated API routes.
5. MongoDB remains the source of truth for every module.

## Scale Model

- MongoDB indexes are defined around `allianceId`, high-volume status fields, dates, Discord IDs, and player UIDs.
- The API is stateless except for Socket.IO connections, so it can scale horizontally behind sticky sessions.
- For multi-instance realtime, add a Socket.IO Redis adapter and keep the same event names from `shared/src/events.ts`.
- Discord bot state is intentionally thin. It can restart safely because commands sync through the API.

## Permission Model

Roles and module permissions live in `shared/src/permissions.ts` and are enforced in the API before controller logic runs. The same role vocabulary is used in the frontend and bot.

## Production Hardening Checklist

- Add Redis for Socket.IO fanout and rate-limit storage.
- Add object storage for task attachments and generated exports.
- Add background workers for scheduled announcements, reminders, shield alerts, and analytics snapshots.
- Add Sentry or OpenTelemetry for cross-service traces.
- Enable MongoDB backups, TLS, and least-privilege database users.
