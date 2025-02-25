import { createClient, QueryParams } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
    projectId: 'c99u49i1',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2023-05-03'
});

export async function sanityFetch<const QueryString extends string>({
    query,
    params = {},
    revalidate = 60 // default revalidation time in seconds
}: {
    query: QueryString;
    params?: QueryParams;
    revalidate?: number | false;
}) {
    return client.fetch(query, params, {
        next: {
            revalidate: revalidate
        }
    });
}

export const getFooter = async () => {
    return sanityFetch({ query: "*[_type=='footer'][0]{...}" });
};

export const getPlays = async () => {
    return sanityFetch({
        query: `
        *[_type=="play"] | order(orderRank){
            "playColor":playColor.hex, "textColor": textColor.hex,
            "bannerImg": {"image": playBannerImg, "altText": playBannerImg.alt}, 
            "logoImg": {"image":playLogoImg, "altText": playLogoImg.alt}, 
            playTitle, playDates[]{playDate, soldOut}, location, playPeriod, active,  soldOut,
            "slug":"/"+slug.current
        }
    `
    });
};

export const getPlay = async (slug: string) => {
    return sanityFetch({
        query: `*[_type=="play" && slug.current=="${slug}"][0]{
        "playColor":playColor.hex, "textColor": textColor.hex,
        "bannerImg": {"image": playBannerImg, "altText": playBannerImg.alt}, 
        "logoImg": {"image":playLogoImg, "altText": playLogoImg.alt}, 
        playTitle, playDates[]{playDate, soldOut, fewTickets}, duration, location, content, playPeriod, ticketsPage, active, soldOut,
        imageGallery[]{"image": media.asset, "altText": media.altText, "caption": media.imageCaption},
        contributors{"actors": actors[]{role, "image": image.asset, "altText": image.altText,names[]}, "artisticTeam": aristicTeam[]{role, names[]},
          "productionTeam": productionTeam[]{role, names[]}
        }
    }`
    });
};

export const getMainBanner = async () => {
    return sanityFetch({
        query: `*[_type=="landingPage"][0]{
    image, logo, "bannerAltText": image.alt, "logoAltText": logo.alt, 
   "bannerUrl":bannerReference->{"urlRef":"/"+slug.current}.urlRef, "videoUrl": video.asset->url,
    highlightedPlays[]{
        title, image, "imageAlt": imgage.alt, description, 
        playReference->{"urlRef":"/"+slug.current, 
            "playStartDate": playDates[0].playDate, "playEndDate": playDates[-1].playDate, 
            "playColor": playColor.hex, "textColor": textColor.hex, playPeriod, active
        }
    }
}`
    });
};

export const getAboutPage = async () => {
    return sanityFetch({
        query: `*[_type=="about"][0]{
        "aboutPageBannerImg": {"image":aboutPageBannerImg, "altText": aboutPageBannerImg.alt},
        "bannerColor":bannerColor.hex,
        title, content, foundersContent, foundersList
    }`
    });
};

export const getJoinPage = async () => {
    return sanityFetch({
        query: `*[_type=="join"][0]{
        "joinPageBannerImg": {"image":joinPageBannerImg, "altText": joinPageBannerImg.alt},
        "bannerColor": bannerColor.hex,
        title, content
    }`
    });
};

const urlBuilderFactory = imageUrlBuilder(client);

export function urlFor(image: SanityImageSource) {
    return urlBuilderFactory.image(image);
}
