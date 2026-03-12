# Agendei.me

A Brazilian scheduling/appointment management SaaS for barbers and service professionals, built with React, TypeScript, Vite, Tailwind CSS, and PostgreSQL.

## Architecture

- **Frontend**: React 19 + TypeScript + Tailwind CSS v4 + Framer Motion (motion/react)
- **Backend**: Express.js REST API (`server.ts`) — runs on port 5000
- **Database**: PostgreSQL (Replit built-in) via `pg` driver
- **Auth**: JWT tokens stored in localStorage (`agendei_token`)
- **Dev Server**: Vite middleware integrated into Express

## Subscription Logic

- **Trial (`teste`)**: 7 days from registration, max 2 services, no access to transactions/team
- **Expired (`expirado`)**: Trial ended — dashboard blocked with upgrade screen
- **Pro (`pago`)**: Full access including transactions, team management

## Database Schema

| Table | Purpose |
|---|---|
| `usuarios` | Barber accounts (auth, subscription, profile) |
| `servicos` | Services offered (limited to 2 on trial) |
| `agendamentos` | Appointments (from dashboard or public link) |
| `clientes` | Client contact list |
| `horarios_funcionamento` | Weekly schedule (open/closed per day + hours) |
| `transacoes` | Financial transactions (Pro only) |
| `equipe` | Team members (Pro only) |

## API Endpoints

- `POST /api/auth/register` — Create account
- `POST /api/auth/login` — Login, returns JWT
- `GET /api/auth/me` — Get current user (checks trial expiry)
- `GET/PUT /api/perfil` — Profile management
- `POST /api/onboarding` — Complete onboarding (profile + services + schedule)
- `PUT /api/horarios` — Update weekly schedule
- `GET/POST/PUT/DELETE /api/servicos` — Services CRUD (max 2 on trial)
- `GET/POST/PUT/DELETE /api/agendamentos` — Appointments CRUD
- `GET/POST/PUT/DELETE /api/clientes` — Client management
- `GET /api/dashboard/stats` — Dashboard KPIs
- `GET /api/transacoes` — Transactions (Pro only)
- `GET /api/equipe` — Team (Pro only)
- `GET /api/public/:userId` — Public booking page data
- `GET /api/public/:userId/horarios/:data` — Available time slots
- `POST /api/public/:userId/agendar` — Book appointment (public)

## Project Structure

```
/
├── server.ts          # Express API + Vite dev middleware
├── vite.config.ts     # Vite config with Tailwind, host settings
├── src/
│   ├── App.tsx        # Entire frontend (landing + dashboard + onboarding + public link)
│   ├── lib/api.ts     # API client (all fetch calls)
│   ├── main.tsx       # React entry point
│   └── index.css      # Global styles (Tailwind v4)
├── index.html
└── package.json
```

## Scripts

- `npm run dev` — Start dev server (port 5000)
- `npm run build` — Build for production
- `npm run lint` — TypeScript type check

## Environment Variables

- `DATABASE_URL` — PostgreSQL connection string (auto-set by Replit)
- `JWT_SECRET` — Token signing secret
- `GEMINI_API_KEY` — Google Gemini API key (optional, for AI features)

## Deployment

- Build: `npm run build`
- Run: `node --import tsx server.ts`
