import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const isDraftMode = request.cookies.has('__prerender_bypass');

  if (isDraftMode) {
    return NextResponse.next();
  }

  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

  const cspHeader = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://scripts.simpleanalyticscdn.com`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://cdn.sanity.io https://queue.simpleanalyticscdn.com",
    "font-src 'self'",
    "connect-src 'self' https://*.sanity.io https://*.apicdn.sanity.io https://simpleanalyticscdn.com",
    "media-src 'self' https://*.sanity.io https://*.mux.com",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set('Content-Security-Policy', cspHeader);

  return response;
}

export const config = {
  matcher: [
    { source: '/((?!studio|api|_next/static|_next/image|favicon\\.ico|assets/).*)', missing: [{ type: 'header', key: 'next-router-prefetch' }] },
  ],
};
