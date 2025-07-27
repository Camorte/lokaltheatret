'use server';

import { defineQuery } from 'next-sanity';
import { sanityFetch } from './live';

export const getFooter = async () => {
    const footerQuery = defineQuery("*[_type=='footer'][0]{...}");

    return sanityFetch({ query: footerQuery }).then((result) => result.data);
};

export const getPlays = async () => {
    const playsQuery = defineQuery(`
        *[_type=="play"] | order(orderRank){
            "playColor":playColor.hex, "textColor": textColor.hex,
            "bannerImg": {"image": playBannerImg, "altText": playBannerImg.alt}, 
            "logoImg": {"image":playLogoImg, "altText": playLogoImg.alt}, 
            playTitle, playDates[]{playDate, soldOut}, location, playPeriod, active,  soldOut,
            "slug":"/"+slug.current
        }
    `);

    return sanityFetch({ query: playsQuery }).then((result) => result.data);
};

export const getPlay = async (slug: string) => {
    const playQuery =
        defineQuery(`*[_type=="play" && slug.current=="${slug}"][0]{
        "playColor":playColor.hex, "textColor": textColor.hex,
        "bannerImg": {"image": playBannerImg, "altText": playBannerImg.alt}, 
        "logoImg": {"image":playLogoImg, "altText": playLogoImg.alt}, 
        playTitle, playDates[]{playDate, soldOut, fewTickets}, duration, location, content, playPeriod, ticketsPage, active, soldOut,
        imageGallery[]{"image": media.asset, "altText": media.altText, "caption": media.imageCaption},
        contributors{"actors": actors[]{role, "image": image.asset, "altText": image.altText,names[]}, "artisticTeam": aristicTeam[]{role, names[]},
          "productionTeam": productionTeam[]{role, names[]}
        }
    }`);

    return sanityFetch({ query: playQuery }).then((result) => result.data);
};

export const getMainBanner = async () => {
    const mainBannerQuery = defineQuery(`*[_type=="landingPage"][0]{
    image, logo, "bannerAltText": image.alt, "logoAltText": logo.alt, 
   "bannerUrl":bannerReference->{"urlRef":"/"+slug.current}.urlRef, "videoUrl": video.asset->url,
    highlightedPlays[]{
        title, image, "imageAlt": imgage.alt, description, 
        playReference->{"urlRef":"/"+slug.current, 
            "playStartDate": playDates[0].playDate, "playEndDate": playDates[-1].playDate, 
            "playColor": playColor.hex, "textColor": textColor.hex, playPeriod, active
        }
    }
}`);

    return sanityFetch({ query: mainBannerQuery }).then(
        (result) => result.data
    );
};

export const getAboutPage = async () => {
    const aboutQuery = defineQuery(`*[_type=="about"][0]{
        "aboutPageBannerImg": {"image":aboutPageBannerImg, "altText": aboutPageBannerImg.alt},
        "bannerColor":bannerColor.hex,
        title, content, foundersContent, foundersList
    }`);

    return sanityFetch({ query: aboutQuery }).then((result) => result.data);
};

export const getJoinPage = async () => {
    const joinQuery = defineQuery(`*[_type=="join"][0]{
        "joinPageBannerImg": {"image":joinPageBannerImg, "altText": joinPageBannerImg.alt},
        "bannerColor": bannerColor.hex,
        title, content
    }`);

    return sanityFetch({ query: joinQuery }).then((result) => result.data);
};
