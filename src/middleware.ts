import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const isDraftMode = request.cookies.has('__prerender_bypass');

  if (isDraftMode) {
    return NextResponse.next();
  }

  const cspHeader = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://scripts.simpleanalyticscdn.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://cdn.sanity.io https://queue.simpleanalyticscdn.com",
    "font-src 'self'",
    "connect-src 'self' https://*.sanity.io https://*.apicdn.sanity.io https://queue.simpleanalyticscdn.com https://simpleanalyticscdn.com",
    "media-src 'self' https://*.sanity.io https://*.mux.com",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');

  const response = NextResponse.next();
  response.headers.set('Content-Security-Policy', cspHeader);

  return response;
}

export const config = {
  matcher: [
    { source: '/((?!studio|api|_next/static|_next/image|favicon\\.ico|assets/).*)', missing: [{ type: 'header', key: 'next-router-prefetch' }] },
  ],
};
