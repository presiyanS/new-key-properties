# New Key Properties (newkey.bg)

Bulgarian real-estate marketing site: Next.js App Router, Sanity CMS, Vercel.

## Stack

- **Next.js 16** (`app/`), React 19, TypeScript, Tailwind
- **Sanity 5** — schemas in `sanity/schemaTypes/`, Studio at `/studio` (prod) and `/studio-staging`
- **Deploy** — Vercel; cron jobs in `vercel.json` (`/api/cron/market-post`, `/api/cron/notify-searches`)

## Commands

```bash
npm run dev      # local dev (http://localhost:3000)
npm run build    # production build
npm run lint     # ESLint
npx tsc --noEmit # typecheck
```

## Layout

| Area | Purpose |
|------|---------|
| `app/` | Routes, API routes, layouts |
| `components/` | UI (Header, PropertyCard, forms, animations) |
| `lib/sanity.ts` | Sanity clients, GROQ helpers, `SanityListing` type |
| `sanity/` | Studio config, custom inputs, schema types |
| `scripts/` | One-off Node scripts (seed, upload listings to Sanity prod/staging) |
| `data/` | Static fallbacks (`listings.ts`, `blog.ts`, `team.ts`) |

## Sanity

- Project ID default: `9gz26s06` (override via `NEXT_PUBLIC_SANITY_PROJECT_ID`)
- Dataset: `NEXT_PUBLIC_SANITY_DATASET` (`production` or staging)
- Tokens: `SANITY_API_READ_TOKEN`, `SANITY_API_WRITE_TOKEN`, `SANITY_API_READ_TOKEN` — never commit; use `.env.local`
- Listings use orderable document list (`orderRank`); images may be Sanity assets or `externalImageUrls`

## Auth / protected routes (`middleware.ts`)

- `/studio` — `studio_auth` cookie (login via `/nkp-admin`)
- `/studio-staging` — `studio_staging_auth`
- `/post-generator` — `pg_auth` (except `/post-generator/login`)

## Content & uploads

- Bulk listing uploads: `scripts/upload-*-production.mjs` / `*-staging.mjs` (require `SANITY_TOKEN` or write token in env)
- Seeds: `scripts/seed-*.mjs`
- AI blog posts: `app/api/generate-post/route.ts` (Anthropic + Gemini env keys)

## Conventions

- UI copy is **Bulgarian** unless the task says otherwise
- Prefer editing Sanity-backed pages over hardcoding in `data/` when CMS fields exist
- Keep changes minimal; match existing component and GROQ patterns
- Do not commit `.env`, `.env.local`, or `.claude/settings.local.json`
- Only commit when the user explicitly asks

## Git / deploy

- `git push`, `vercel deploy`, `vercel --prod` are normal workflows for this repo
- Production site: newkey.bg (and Vercel preview URLs)
