# CLAUDE.md

Website for Lokaltheatret (https://lokaltheatret.no), a theatre in Oslo. Next.js 16 (App Router) site with an embedded Sanity v6 Studio as CMS. Hosted on Netlify (`@netlify/plugin-nextjs`). The site content and the Studio UI are in Norwegian (bokmål); code and identifiers are in English.

## Checks

There is no test suite. Before finishing a change, run `typecheck`, `lint` and `format`. The GitHub Actions workflow `.github/workflows/checks.yml` runs the same three on every PR.

Node version is `24.14.0`, pinned in `.nvmrc` (read by Netlify and CI) and in the `volta` field of `package.json`. Keep the two in sync.

All three checks pass with no errors or warnings. Keep it that way.

- **Why `typecheck` calls `node node_modules/typescript/bin/tsc`:** `sanity` → `@sanity/cli` → `@sanity/workflow-cli` installs TypeScript 6 as `@typescript/old`, and its `tsc` takes over `node_modules/.bin/tsc`. Calling the binary by path makes sure the project's own TypeScript (5.9) is used. Don't change it back to plain `tsc`.

## Dependencies

- Environment variables are read from `.env` (gitignored). Do not read or print secret values.
- `.npmrc` sets `legacy-peer-deps=true` (added right after the Sanity v6 upgrade). Keep it unless `npm install` works without it.
- npm skips install scripts that aren't approved. If ESLint has trouble resolving imports, approve `unrs-resolver` with `npm install-scripts approve unrs-resolver`.

## Data fetching and caching

- `cacheComponents: true` is on in `next.config.js`. All Sanity reads go through `fetchSanityData()` in `fetch.ts`, which uses `'use cache'`, `cacheLife('hours')` and a single `cacheTag('sanity')`.
- Any publish in Sanity triggers the webhook, which calls `revalidateTag('sanity')` and revalidates the whole site. This is intentional at the current scale.
- `src/lib/types.ts`: TypeScript types for query results (hand-written, not generated; keep in sync with the queries in `fetch.ts`)
- When you add a new query, add it in `fetch.ts` through `fetchSanityData()`. Do not call `client.fetch` directly from pages, or you bypass caching and draft mode.
- Pass user input (slugs, titles) as GROQ params: `fetchSanityData(query, { slug })` with `$slug` in the query. Never interpolate values into the query string.
- Image fields in queries project `width`, `height` and `lqip` from `asset->metadata` so `SanityImage` can render blur placeholders and avoid layout shift. Follow the same pattern for new image fields.

## Adding content types

When you add a new Sanity schema or block type:

1. Create it in `src/lib/sanity/schemas/` and register it in `schemas/index.ts`.
2. Add it to `structure.ts` if it needs its own desk entry.
3. Add the query projection in `fetch.ts` and the type in `types.ts`.
4. For a new rich-text block, add the projection to every `content[]` query that should support it, and a renderer in `PortableTextComponent.tsx`.
5. For a new page route, add it to `resolve.ts` so the Presentation tool can find it.

## Third-party content and CSP

The CSP in `src/proxy.ts` is strict. If you add a new external script, image host, iframe or media source (for example a new video provider), update the matching directive there, or the browser will block it in production.

## Code style

- Use the `@/` alias for imports from `src/`.
- Styling uses Tailwind CSS v4 (config lives in `src/app/globals.css`). `styled-components` is never imported in `src/`, but Sanity Studio needs it. Don't remove it, and don't use it for site styling.
- Commit messages follow Conventional Commits (`feat:`, `fix:`, `perf:`, `chore:`).
