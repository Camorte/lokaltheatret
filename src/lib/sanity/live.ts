import { defineLive } from 'next-sanity/live';

import { client } from '@/lib/sanity/client';

const token = process.env.SANITY_VIEWER_TOKEN;

if (!token) {
  throw new Error('Missing SANITY_VIEWER_TOKEN');
}

// stega lives here (draft/visual-editing only) so public visitors don't pay for it.
export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    stega: { studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL },
  }),
  serverToken: token,
  browserToken: token,
});
