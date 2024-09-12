import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
    projectId: 'c99u49i1',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2023-05-03'
});

export async function getArticles() {
    return await client.fetch(
        '*[_type == "article"]{articleTitle, articleSlug, articleDescription, "articleImage": content[_type == "image"][0]{...}}'
    );
}

export async function getArticle(articleSlug: string) {
    return client.fetch(
        `*[_type=="article" && articleSlug.current=="${articleSlug}"][0]{articleTitle, articleSlug, content}`
    );
}

export async function getAbout() {
    return client.fetch(`*[_type=="about"][0]{title, content}`);
}

export async function getMainBanner() {
    return client.fetch(
        `*[_type=="mainBanner"][0]{title, image, "caption": image.caption}`
    );
}

const urlBuilderFactory = imageUrlBuilder(client);

export function urlFor(image: SanityImageSource) {
    return urlBuilderFactory.image(image);
}
