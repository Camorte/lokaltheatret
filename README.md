# Lokaltheatret

Website for [Lokaltheatret](https://lokaltheatret.no), a theatre in Oslo. Built with Next.js and an embedded [Sanity](https://www.sanity.io) Studio for content. Hosted on Netlify.

## Getting started

Requirements: Node 24.14.0 (see `.nvmrc`).

```bash
npm install
npm run dev
```

- Website: http://localhost:3000
- Sanity Studio: http://localhost:3000/studio

### Environment variables

Create a `.env` file in the project root with:

| Variable                        | Description                                           |
| ------------------------------- | ----------------------------------------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID                                     |
| `NEXT_PUBLIC_SANITY_DATASET`    | Sanity dataset                                        |
| `NEXT_PUBLIC_SANITY_STUDIO_URL` | Studio URL, used for links in visual editing          |
| `SANITY_VIEWER_TOKEN`           | Sanity read token for drafts and live preview         |
| `SANITY_REVALIDATE_SECRET`      | Secret for the Sanity webhook that refreshes the site |

Ask a project maintainer for the values.

## Scripts

| Command             | What it does                             |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | Start the dev server                     |
| `npm run build`     | Build for production                     |
| `npm run start`     | Run the production build                 |
| `npm run typecheck` | Check types                              |
| `npm run lint`      | Lint (`lint:fix` to fix)                 |
| `npm run format`    | Check formatting (`format:write` to fix) |

## Publishing content

Content is edited in Sanity Studio. When a document is published, a Sanity webhook calls `/api/revalidate` and the site is refreshed within seconds. Editors can preview drafts live with the Presentation tool in the Studio.
