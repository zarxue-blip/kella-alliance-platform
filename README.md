# Call of Dragons Alliance Management Platform

An enterprise-style Alliance Command Center for Call of Dragons communities. The platform combines a Next.js dashboard, Express REST API, MongoDB data layer, and Discord.js v14 bot. It is designed to replace scattered Discord channels, spreadsheets, sign-up forms, task boards, and war planning documents.

## Architecture

- `frontend/` - Next.js 15 dashboard with TailwindCSS, shadcn-style components, Recharts, realtime notifications, and mobile/desktop layouts.
- `backend/` - Express TypeScript API with MongoDB/Mongoose schemas, Discord OAuth2 authentication, permissions, REST controllers, and Socket.IO events.
- `discord-bot/` - Discord.js v14 bot with slash commands, buttons, select menus, modals, and API synchronization.
- `shared/` - Cross-app roles, permissions, constants, event names, DTO types, and domain vocabulary.
- `docker/` - Docker Compose and deployment-ready service definitions.

## Quick Start

1. Copy `.env.example` to `.env` and fill the Discord OAuth2, bot, JWT, and MongoDB settings.
2. Install dependencies with `npm install`.
3. Start MongoDB and the services with `docker compose -f docker/docker-compose.yml up --build`.
4. Open the dashboard at `http://localhost:3000`.

## Production Notes

- Use a managed MongoDB cluster with backups and point-in-time recovery.
- Put the backend behind HTTPS and configure `FRONTEND_ORIGIN` precisely.
- Rotate `JWT_SECRET` and `BOT_API_TOKEN`; do not share them with the frontend.
- Register Discord slash commands during release with `npm run deploy:commands --workspace discord-bot`.
- Scale realtime connections with sticky sessions or a Socket.IO Redis adapter when running multiple API instances.

## Kella Bot

The Discord bot is branded as Kella. It includes `/roots-of-war register` and `/roots-of-war check-in` with 14:00 UTC and 20:00 UTC slot choices, plus the existing alliance management commands.
