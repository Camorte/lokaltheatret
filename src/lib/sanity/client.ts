import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2025-07-27',
    useCdn: true,
    stega: {
        studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL
    }
});

const urlBuilderFactory = imageUrlBuilder(client);

export function urlFor(image: SanityImageSource) {
    return urlBuilderFactory.image(image);
}
