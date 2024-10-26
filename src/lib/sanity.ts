import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
    projectId: 'c99u49i1',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2023-05-03'
});

export const getFooter = async () => {
    return client.fetch("*[_type=='footer'][0]{...}");
};

export const getPlays = async () => {
    return client.fetch(`
        *[_type=="play"]{
            "playColor":playColor.hex, "textColor": textColor.hex,
            "bannerImg": {"image": playBannerImg, "altText": playBannerImg.alt}, 
            "logoImg": {"image":playLogoImg, "altText": playLogoImg.alt}, 
            playTitle, playDates, location, playPeriod, active,
            "slug":"/"+slug.current
        }
    `);
};

export const getPlay = async (slug: string) => {
    return client.fetch(
        `*[_type=="play" && slug.current=="${slug}"][0]{
            "playColor":playColor.hex, "textColor": textColor.hex,
            "bannerImg": {"image": playBannerImg, "altText": playBannerImg.alt}, 
            "logoImg": {"image":playLogoImg, "altText": playLogoImg.alt}, 
            playTitle, playDates, duration, location, content, playPeriod, ticketsPage, active,
            imageGallery[]{"image": media.asset, "altText": media.altText, "caption": media.imageCaption},
            contributors{"actors": actors[]{role, names[]}, "artisticTeam": aristicTeam[]{role, names[]},
              "productionTeam": productionTeam[]{role, names[]}
            }
        }`
    );
};

export const getMainBanner = async () => {
    return client.fetch(
        `*[_type=="landingPage"][0]{
            image, logo, "bannerAltText": image.alt, "logoAltText": logo.alt, 
           "bannerUrl":bannerReference->{"urlRef":"/"+slug.current}.urlRef, "videoUrl": video.asset->url,
            highlightedPlays[]{
                title, image, "imageAlt": imgage.alt, description, 
                playReference->{"urlRef":"/"+slug.current, 
                    "playStartDate": playDates[0], "playEndDate": playDates[-1], 
                    "playColor": playColor.hex, "textColor": textColor.hex, playPeriod, active
                }
            }
        }`
    );
};

export const getAboutPage = async () => {
    return client.fetch(
        `*[_type=="about"][0]{
            aboutPageBannerImg, "bannerColor":bannerColor.hex, title, content, foundersContent, foundersList
        }`
    );
};

export const getJoinPage = async () => {
    return client.fetch(
        `*[_type=="join"][0]{
            joinPageBannerImg, "bannerColor":bannerColor.hex, title, content
        }`
    );
};

const urlBuilderFactory = imageUrlBuilder(client);

export function urlFor(image: SanityImageSource) {
    return urlBuilderFactory.image(image);
}
