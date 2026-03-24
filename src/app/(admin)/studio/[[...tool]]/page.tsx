'use client';

import { NextStudio } from 'next-sanity/studio';

import config from '../../../../../sanity.config';

export default function StudioPage() {
  // The NextStudio component takes your root sanity.config.ts
  // and renders the entire CMS interface.
  return <NextStudio config={config} />;
}
