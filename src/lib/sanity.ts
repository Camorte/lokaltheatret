import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
    projectId: 'c99u49i1',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2023-05-03'
});

export async function getMainBanner() {
    return client.fetch(
        `*[_type=="landingPage"][0]{
            image, logo, "bannerAltText": image.alt, "logoAltText": logo.alt, 
           "bannerUrl":bannerReference->{"urlRef":"/"+slug.current}.urlRef,
            highlightedPlays[]{
                title, image, "imageAlt": imgage.alt, description, 
                playReference->{"urlRef":"/"+slug.current, playStartDate, playEndDate, "playColor": playColor.hex}
            }
        }`
    );
}

const urlBuilderFactory = imageUrlBuilder(client);

export function urlFor(image: SanityImageSource) {
    return urlBuilderFactory.image(image);
}
