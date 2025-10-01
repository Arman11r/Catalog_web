# Vercel deployment (CafeCanvas)

## Install deps

zsh
npm i
npm remove puppeteer
npm i puppeteer-core @sparticuz/chromium serverless-http -D @vercel/node

## Files added/changed
- api/index.ts (serverless Express handler)
- server/routes.ts (puppeteer-core + @sparticuz/chromium)
- vercel.json (functions + rewrites)
- .vercelignore
- tsconfig.json (include api and @vercel/node types)
- package.json (deps updated)

## Local test (optional)
- You can run the express server locally with `npm run dev` but PDF uses local Chrome when not on Vercel.

## Deploy
- `vercel` (or push to GitHub + import).
- Ensure project root is repository root.
- Vercel will detect the function in `api/index.ts` and serve the frontend from `dist/public` after running `npm run build`.

## Notes
- PDF generation uses puppeteer-core with Chromium binary managed by @sparticuz/chromium on Vercel.
- Frontend assets are built via Vite to `dist/public`.
