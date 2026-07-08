# OzBiz Properties

Australian commercial real estate platform for discovering office, retail, warehouse, and industrial properties.

## Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, TypeScript, Vite 6 |
| Routing | React Router 7 |
| Data fetching | TanStack Query 5 |
| Client state | Zustand 5 |
| Backend | Express 5, TypeScript |
| Database | SQLite (better-sqlite3) |
| Styling | CSS (custom design system) |

## Features

- Browse and filter 12+ commercial property listings across Australia
- Featured properties, stats dashboard, and detailed property pages
- Property enquiry and contact forms persisted to SQLite
- Responsive design with mobile navigation
- Dev proxy — frontend talks to API via `/api`

## Getting Started

### Prerequisites

- Node.js 20+ (22 recommended)
- npm 10+

### Install

```bash
git clone <repo-url>
cd ozbiz-properties
npm install
```

### Development

Runs the Vite dev server (port 5173) and Express API (port 3001) concurrently:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

The database is created and seeded automatically on first API start.

### Production Build

```bash
npm run build
npm start          # API server (serves from server/dist)
npm run preview    # Preview built frontend (port 4173)
```

For production, serve the `dist/` folder with any static host and point `VITE_API_URL` to your API.

### Database

```bash
npm run db:seed    # Reset and reseed the SQLite database
```

Database file: `server/data/ozbiz.db` (gitignored).

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/properties` | List properties (supports query filters) |
| GET | `/api/properties/stats` | Listing statistics |
| GET | `/api/properties/:id` | Single property |
| POST | `/api/enquiries` | Submit property enquiry |
| POST | `/api/contacts` | Submit contact form |

### Query Filters

`query`, `state`, `type`, `listingType`, `minArea`, `maxPrice`, `featured`

Example: `/api/properties?state=NSW&type=office&listingType=lease`

## Project Structure

```
ozbiz-properties/
├── src/                  # React frontend
│   ├── api/              # API client
│   ├── components/       # UI components
│   ├── constants/        # Property type labels
│   ├── hooks/            # TanStack Query hooks
│   ├── pages/            # Route pages
│   ├── stores/           # Zustand stores
│   └── types/            # TypeScript types
├── server/               # Express API
│   ├── src/
│   │   ├── routes/       # API route handlers
│   │   ├── seed/         # Seed data
│   │   ├── db.ts         # SQLite database layer
│   │   └── index.ts      # Server entry
│   └── data/             # SQLite database (generated)
├── public/               # Static assets
├── LICENSE               # MIT License
└── README.md
```

## Environment Variables

Copy `.env.example` to `.env` and adjust as needed:

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3001` | API server port |
| `VITE_API_URL` | `/api` | Frontend API base URL |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend + API |
| `npm run dev:client` | Frontend only |
| `npm run dev:server` | API only |
| `npm run build` | Build frontend + API |
| `npm start` | Run production API |
| `npm run db:seed` | Reseed database |
| `npm run lint` | Run ESLint |

## License

[MIT](LICENSE) © 2026 OzBiz Properties

## Multi-platform (web · iOS · Android · Windows · Mac · Linux)

This app is a **Progressive Web App (PWA)** — installable from the browser on phones and desktops.

| Platform | How |
|----------|-----|
| **Web** | Any modern browser |
| **iOS** | Safari → Share → **Add to Home Screen** |
| **Android** | Chrome → **Install app** / Add to Home screen |
| **Windows / Mac / Linux** | Chrome or Edge → Install from address bar |

```bash
npm start
# → http://localhost:3482
# Use the Network URL on a phone (same Wi‑Fi)
```

Serve over **HTTPS** (or localhost) for install + offline. Core files are cached by `sw.js`.

