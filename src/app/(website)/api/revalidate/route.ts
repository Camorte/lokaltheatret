import { revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

// ponytail: one tag for the whole site — any publish revalidates everything.
// Fine at this scale; switch to per-_type tags only if rebuilds get expensive.
export const POST = async (req: NextRequest) => {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    return new Response('Missing SANITY_REVALIDATE_SECRET', { status: 500 });
  }

  const { isValidSignature, body } = await parseBody<{ _type: string }>(req, secret);

  if (!isValidSignature) {
    return new Response('Invalid signature', { status: 401 });
  }

  if (!body?._type) {
    return new Response('Bad request', { status: 400 });
  }

  revalidateTag('sanity', 'max');

  return Response.json({ revalidated: true, now: Date.now() });
};
