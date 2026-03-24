import { defineLive } from 'next-sanity/live';

import { client } from '@/lib/sanity/client';

const token = process.env.SANITY_VIEWER_TOKEN;

if (!token) {
  throw new Error('Missing SANITY_VIEWER_TOKEN');
}

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
});
