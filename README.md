# FCMB Career Portal

Responsive React + TypeScript implementation of the supplied FCMB registration and users UI, styled with Tailwind CSS.

## Setup

```bash
npm install
npm run dev
```

ReqRes currently requires an API key for live requests. Add one to `.env`:

```bash
VITE_REQRES_API_KEY=your_reqres_key_here
```

The app still includes safe demo fallback data so the UI remains reviewable if the public API rejects unauthenticated requests.

## Scripts

- `npm run dev` starts the local Vite server.
- `npm run build` type-checks and creates a production build.
- `npm run lint` runs ESLint.

## Structure

- `src/api` contains ReqRes API functions.
- `src/components` contains reusable UI blocks.
- `src/enums` contains shared route and account enums.
- `src/pages` contains route-level screens.
- `src/types` contains shared TypeScript contracts.
- `src/styles` contains Tailwind and global base styles.
