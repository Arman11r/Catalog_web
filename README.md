# CafeCanvas

CafeCanvas is a modern, full‑stack web application that helps restaurants showcase their brand, price digital solutions, and capture leads through a streamlined contact experience.

Live site: https://cafecanvas.vercel.app/

- Fast, responsive React UI built with Vite and Tailwind CSS
- Pricing calculator to estimate solution costs
- Feature showcase and marketing sections
- Contact form to capture inquiries
- Typed shared schema and API built with Express + Drizzle ORM

Language composition:
- TypeScript ~89.5%
- HTML ~6.4%
- CSS ~4.1%

## Tech stack

- Frontend
  - React (Vite, TypeScript)
  - Wouter (client-side routing)
  - Tailwind CSS + PostCSS
  - Radix UI primitives and shadcn-styled components
  - TanStack Query (data fetching + caching)
- Backend
  - Node.js + Express
  - Drizzle ORM (PostgreSQL)
  - Neon serverless Postgres (driver)
  - esbuild for server bundling
- Deployment
  - Vercel

Key files:
- [package.json](https://github.com/Arman11r/Catalog_web/blob/cba1d3e781e6323c5d17faf4e412625e393450b7/package.json)
- [vite.config.ts](https://github.com/Arman11r/Catalog_web/blob/cba1d3e781e6323c5d17faf4e412625e393450b7/vite.config.ts)
- [server/index.ts](https://github.com/Arman11r/Catalog_web/blob/cba1d3e781e6323c5d17faf4e412625e393450b7/server/index.ts)
- [tsconfig.json](https://github.com/Arman11r/Catalog_web/blob/cba1d3e781e6323c5d17faf4e412625e393450b7/tsconfig.json)
- [tailwind.config.ts](https://github.com/Arman11r/Catalog_web/blob/cba1d3e781e6323c5d17faf4e412625e393450b7/tailwind.config.ts)
- [postcss.config.js](https://github.com/Arman11r/Catalog_web/blob/cba1d3e781e6323c5d17faf4e412625e393450b7/postcss.config.js)
- [shared/schema.ts](https://github.com/Arman11r/Catalog_web/blob/cba1d3e781e6323c5d17faf4e412625e393450b7/shared/schema.ts)
- [client/src/App.tsx](https://github.com/Arman11r/Catalog_web/blob/cba1d3e781e6323c5d17faf4e412625e393450b7/client/src/App.tsx)

## Project structure

```
.
├─ client/                 # Vite React app (UI, routes, components)
│  ├─ src/
│  │  ├─ pages/            # Home, 404, etc.
│  │  ├─ components/       # UI components (Radix/shadcn styled)
│  │  ├─ lib/              # query client, utils, hooks
│  │  └─ index.css         # Tailwind layers + CSS variables
├─ server/                 # Express server and API
│  └─ index.ts
├─ shared/                 # Shared TypeScript domain models
│  └─ schema.ts            # Drizzle schema (users, contactInquiries, proposals)
├─ migrations/             # Drizzle migrations (output)
├─ vite.config.ts          # Vite config with path aliases (@, @shared, @assets)
├─ tsconfig.json
├─ tailwind.config.ts
└─ postcss.config.js
```

Path aliases (see [vite.config.ts](https://github.com/Arman11r/Catalog_web/blob/cba1d3e781e6323c5d17faf4e412625e393450b7/vite.config.ts)):
- `@` -> `client/src`
- `@shared` -> `shared`
- `@assets` -> `attached_assets`

## Features

- Hero + Navigation + Feature showcase
- Interactive pricing calculator
- Contact form to collect leads
- Typed backend entities:
  - Users
  - Contact inquiries
  - Proposals with selected features and totals
- Ready for PostgreSQL via Drizzle ORM

See:
- UI routing in [client/src/App.tsx](https://github.com/Arman11r/Catalog_web/blob/cba1d3e781e6323c5d17faf4e412625e393450b7/client/src/App.tsx)
- Home sections in [client/src/pages/Home.tsx](https://github.com/Arman11r/Catalog_web/blob/cba1d3e781e6323c5d17faf4e412625e393450b7/client/src/pages/Home.tsx)
- Schema in [shared/schema.ts](https://github.com/Arman11r/Catalog_web/blob/cba1d3e781e6323c5d17faf4e412625e393450b7/shared/schema.ts)

## Getting started

Prerequisites:
- Node.js 18+ and npm
- A PostgreSQL database connection string (for features that require persistence)

1) Clone and install
```
git clone https://github.com/Arman11r/Catalog_web.git
cd Catalog_web
npm install
```

2) Configure environment
- Set `DATABASE_URL` in your environment to a valid PostgreSQL connection string (required for Drizzle and any API persistence).
- Optionally set `PORT` (defaults to `5000`).

3) Initialize database (optional but recommended)
```
# Push the Drizzle schema to your database
npm run db:push
```

4) Run in development
```
npm run dev
```

This starts the Express server which mounts the Vite dev server in development, serving both API and client. By default it listens on http://localhost:5000.

5) Type-check
```
npm run check
```

## Build and run

Build client and server bundles:
```
npm run build
```

Start production server:
```
npm start
```

By default the server serves the built client from `dist/public` and listens on `PORT` (or 5000).

## Configuration details

- Vite configuration with React plugin, dev tooling, and aliases:
  - [vite.config.ts](https://github.com/Arman11r/Catalog_web/blob/cba1d3e781e6323c5d17faf4e412625e393450b7/vite.config.ts)
- Tailwind CSS setup:
  - [tailwind.config.ts](https://github.com/Arman11r/Catalog_web/blob/cba1d3e781e6323c5d17faf4e412625e393450b7/tailwind.config.ts)
  - [postcss.config.js](https://github.com/Arman11r/Catalog_web/blob/cba1d3e781e6323c5d17faf4e412625e393450b7/postcss.config.js)
  - Theme tokens and CSS variables in [client/src/index.css](https://github.com/Arman11r/Catalog_web/blob/cba1d3e781e6323c5d17faf4e412625e393450b7/client/src/index.css)
- API entrypoint and server wiring:
  - [server/index.ts](https://github.com/Arman11r/Catalog_web/blob/cba1d3e781e6323c5d17faf4e412625e393450b7/server/index.ts)
- Shared domain model (Drizzle):
  - [shared/schema.ts](https://github.com/Arman11r/Catalog_web/blob/cba1d3e781e6323c5d17faf4e412625e393450b7/shared/schema.ts)
  - Drizzle config: [drizzle.config.ts](https://github.com/Arman11r/Catalog_web/blob/cba1d3e781e6323c5d17faf4e412625e393450b7/drizzle.config.ts)

## Scripts

Defined in [package.json](https://github.com/Arman11r/Catalog_web/blob/cba1d3e781e6323c5d17faf4e412625e393450b7/package.json):

- `dev` — run Express server in development (mounts Vite dev server)
- `build` — build client via Vite and bundle server via esbuild
- `start` — run production server from `dist`
- `check` — TypeScript type checking
- `db:push` — sync Drizzle schema to the database

## Deployment

The site is hosted on Vercel at https://cafecanvas.vercel.app/.

Notes:
- The development server serves the SPA and API on a single port (default 5000).
- For production, the client is output to `dist/public` and the server bundle to `dist`, started via `npm start`.

## License

MIT. See [package.json](https://github.com/Arman11r/Catalog_web/blob/cba1d3e781e6323c5d17faf4e412625e393450b7/package.json) for the license field.
