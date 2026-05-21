import '../globals.css';

import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import Script from 'next/script';
import { VisualEditing } from 'next-sanity/visual-editing';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { SanityLive } from '@/lib/sanity/live';

const title = 'Lokaltheatret';
const description = 'Teater i hjerte av Oslo';
const url = 'https://www.lokaltheatret.no';

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: title,
  description: description,
  keywords: ['teater', 'Oslo', 'Lokaltheatret'],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/assets/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    url: url,
    title: title,
    description: description,
    images: [
      {
        url: '/assets/lokaltheatret-black-logo-white-bg.png',
        alt: title,
        width: 2250,
        height: 945,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: title,
    description: description,
    images: [
      {
        url: '/assets/lokaltheatret-black-logo-white-bg.png',
        alt: title,
      },
    ],
  },
};

export default async function WebsiteLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="nb">
      <body>
        <Header />
        {children}
        {isDraftMode && (
          <>
            <SanityLive />
            <VisualEditing />
          </>
        )}
        <Footer />

        <Script
          src="https://scripts.simpleanalyticscdn.com/latest.js"
          strategy="lazyOnload"
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://queue.simpleanalyticscdn.com/noscript.gif"
            alt=""
            referrerPolicy="no-referrer-when-downgrade"
          />
        </noscript>
      </body>
    </html>
  );
}
