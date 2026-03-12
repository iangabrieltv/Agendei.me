# Agendei.me

A Brazilian scheduling/appointment management landing page and app built with React, TypeScript, Vite, and Tailwind CSS.

## Architecture

- **Frontend**: React 19 + TypeScript + Tailwind CSS v4 + Framer Motion (motion/react)
- **Dev Server**: Express + Vite middleware (server.ts) — runs on port 5000
- **Build**: Vite bundles to `dist/`
- **Icons**: lucide-react

## Project Structure

```
/
├── server.ts          # Express + Vite dev server (port 5000)
├── vite.config.ts     # Vite config with Tailwind, host/allowedHosts settings
├── src/
│   ├── App.tsx        # Main app component (landing page + dashboard UI)
│   ├── main.tsx       # React entry point
│   └── index.css      # Global styles
├── index.html         # HTML entry point
└── package.json       # Dependencies and scripts
```

## Scripts

- `npm run dev` — Start dev server (port 5000)
- `npm run build` — Build for production
- `npm run lint` — TypeScript type check

## Environment Variables

- `GEMINI_API_KEY` — Google Gemini API key (optional, for AI features)
- `DISABLE_HMR` — Set to "true" to disable hot module reloading

## Deployment

- Target: autoscale
- Build: `npm run build`
- Run: `node --import tsx server.ts`
