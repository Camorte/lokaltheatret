import { createImageUrlBuilder } from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url';
import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-07-24',
  useCdn: true,
  stega: {
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL,
  },
});

const urlBuilderFactory = createImageUrlBuilder(client);

export function urlFor(image: SanityImageSource) {
  return urlBuilderFactory.image(image);
}
