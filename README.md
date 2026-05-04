# FCMB Career Portal

Responsive React implementation of the supplied FCMB registration and users UI.

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

- `src/api` contains typed ReqRes API functions.
- `src/components` contains reusable UI blocks.
- `src/pages` contains route-level screens.
- `src/styles` contains the global responsive stylesheet.
