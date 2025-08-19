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
            "bannerImg": {"image": playBannerImg, "altText": playBannerImg.alt, "width": playBannerImg.asset->metadata.dimensions.width, "height": playBannerImg.asset->metadata.dimensions.height, "lqip": playBannerImg.asset->metadata.lqip}, 
            "logoImg": {"image":playLogoImg, "altText": playLogoImg.alt, "width": playLogoImg.asset->metadata.dimensions.width, "height": playLogoImg.asset->metadata.dimensions.height, "lqip": playLogoImg.asset->metadata.lqip}, 
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
        "bannerImg": {"image": playBannerImg, "altText": playBannerImg.alt, "width": playBannerImg.asset->metadata.dimensions.width, "height": playBannerImg.asset->metadata.dimensions.height, "lqip": playBannerImg.asset->metadata.lqip}, 
        "logoImg": {"image":playLogoImg, "altText": playLogoImg.alt, "width": playLogoImg.asset->metadata.dimensions.width, "height": playLogoImg.asset->metadata.dimensions.height, "lqip": playLogoImg.asset->metadata.lqip}, 
        playTitle, playDates[]{playDate, soldOut, fewTickets}, duration, location, 
        content[]{
            ...,
            _type == "image" => {
                ...,
                "width": asset->metadata.dimensions.width,
                "height": asset->metadata.dimensions.height,
                "lqip": asset->metadata.lqip
            }
        }, 
        playPeriod, ticketsPage, active, soldOut,
        imageGallery[]{"image": media.asset, "altText": media.altText, "caption": media.imageCaption, "width": media.asset->metadata.dimensions.width, "height": media.asset->metadata.dimensions.height, "lqip": media.asset->metadata.lqip},
        contributors{"actors": actors[]{role, "image": image.asset, "altText": image.altText, "width": image.asset->metadata.dimensions.width, "height": image.asset->metadata.dimensions.height, names[], "lqip": image.asset->metadata.lqip}, "artisticTeam": aristicTeam[]{role, names[]},
          "productionTeam": productionTeam[]{role, names[]}
        }
    }`);

    return sanityFetch({ query: playQuery }).then((result) => result.data);
};

export const getMainBanner = async () => {
    const mainBannerQuery = defineQuery(`*[_type=="landingPage"][0]{
    "image": image{"asset": asset, "alt": alt, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height, "lqip": asset->metadata.lqip}, 
    "logo": logo{"asset": asset, "alt": alt, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height, "lqip": asset->metadata.lqip}, 
    "bannerAltText": image.alt, "logoAltText": logo.alt, 
   "bannerUrl":bannerReference->{"urlRef":"/"+slug.current}.urlRef, "videoUrl": video.asset->url,
    highlightedPlays[]{
        title, "image": image{"asset": asset, "alt": alt, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height, "lqip":asset->metadata.lqip}, "imageAlt": imgage.alt, description, 
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
        "aboutPageBannerImg": {"image":aboutPageBannerImg, "altText": aboutPageBannerImg.alt, "width": aboutPageBannerImg.asset->metadata.dimensions.width, "height": aboutPageBannerImg.asset->metadata.dimensions.height, "lqip": aboutPageBannerImg.asset->metadata.lqip},
        "bannerColor":bannerColor.hex,
        title, 
        content[]{
            ...,
            _type == "image" => {
                ...,
                "width": asset->metadata.dimensions.width,
                "height": asset->metadata.dimensions.height,
                "lqip": asset->metadata.lqip
            }
        }, 
        foundersContent[]{
            ...,
            _type == "image" => {
                ...,
                "width": asset->metadata.dimensions.width,
                "height": asset->metadata.dimensions.height,
                "lqip": asset->metadata.lqip
            }
        }, 
        foundersList[]{name, role, "image": {"image": image, "width": image.asset->metadata.dimensions.width, "height": image.asset->metadata.dimensions.height, "lqip": image.asset->metadata.lqip}}
    }`);

    return sanityFetch({ query: aboutQuery }).then((result) => result.data);
};

export const getJoinPage = async () => {
    const joinQuery = defineQuery(`*[_type=="join"][0]{
        "joinPageBannerImg": {"image":joinPageBannerImg, "altText": joinPageBannerImg.alt, "width": joinPageBannerImg.asset->metadata.dimensions.width, "height": joinPageBannerImg.asset->metadata.dimensions.height, "lqip": joinPageBannerImg.asset->metadata.lqip},
        "bannerColor": bannerColor.hex,
        title, 
        content[]{
            ...,
            _type == "image" => {
                ...,
                "width": asset->metadata.dimensions.width,
                "height": asset->metadata.dimensions.height,
                "lqip": asset->metadata.lqip
            }
        }
    }`);

    return sanityFetch({ query: joinQuery }).then((result) => result.data);
};
