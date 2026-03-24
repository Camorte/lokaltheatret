import { defineEnableDraftMode } from 'next-sanity/draft-mode';

import { client } from '@/lib/sanity/client';

export const GET = async (req: Request) => {
  const token = process.env.SANITY_VIEWER_TOKEN;

  if (!token) {
    return new Response('Token is undefined', { status: 500 });
  }

  const { GET } = defineEnableDraftMode({
    client: client.withConfig({ token }),
  });

  return GET(req);
};
