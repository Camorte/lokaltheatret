import { cacheLife, cacheTag } from 'next/cache';
import { draftMode } from 'next/headers';
import { defineQuery } from 'next-sanity';

import { client } from './client';
import { sanityFetch as liveFetch } from './live';

async function fetchSanityData(query: string): Promise<any> {
  'use cache';
  cacheLife('hours');
  cacheTag('sanity');

  const { isEnabled } = await draftMode();

  if (isEnabled) {
    return liveFetch({ query }).then((r) => r.data);
  }

  return client.fetch(query);
}

export const getFooter = async () => {
  const footerQuery = defineQuery("*[_type=='footer'][0]{...}");

  return fetchSanityData(footerQuery);
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

  return fetchSanityData(playsQuery);
};

export const getPlayMetadata = async (slug: string) => {
  const playMetadataQuery = defineQuery(`*[_type=="play" && slug.current=="${slug}"][0]{
        playTitle, location,
        "bannerImg": {"image": playBannerImg, "altText": playBannerImg.alt}
    }`);

  return fetchSanityData(playMetadataQuery);
};

export const getHighlightedPlayDescription = async (playTitle: string) => {
  const highlightedPlayQuery = defineQuery(`*[_type=="landingPage"][0]{
        highlightedPlays[title == "${playTitle}"][0]{
            description
        }
    }`);

  const data = await fetchSanityData(highlightedPlayQuery);
  return data?.highlightedPlays?.description;
};

export const getPlay = async (slug: string) => {
  const playQuery = defineQuery(`*[_type=="play" && slug.current=="${slug}"][0]{
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
            },
            _type == "fullWidthImage" => {
                ...,
                "image": image{..., "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height, "lqip": asset->metadata.lqip}
            },
            _type == "twoImages" => {
                ...,
                "imageLeft": imageLeft{..., "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height, "lqip": asset->metadata.lqip},
                "imageRight": imageRight{..., "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height, "lqip": asset->metadata.lqip}
            },
            _type == "imageGalleryBlock" => {
                ...,
                "images": images[]{"image": media.asset, "altText": media.altText, "caption": media.imageCaption, "width": media.asset->metadata.dimensions.width, "height": media.asset->metadata.dimensions.height, "lqip": media.asset->metadata.lqip}
            },
            _type == "articleReference" => {
                ...,
                "articleTitle": article->title,
                "articleSlug": article->slug.current
            }
        },
        playPeriod, ticketInfo, active, soldOut,
        imageGallery[]{"image": media.asset, "altText": media.altText, "caption": media.imageCaption, "width": media.asset->metadata.dimensions.width, "height": media.asset->metadata.dimensions.height, "lqip": media.asset->metadata.lqip},
        contributors{"actors": actors[]{role, "image": image.asset, "altText": image.altText, "width": image.asset->metadata.dimensions.width, "height": image.asset->metadata.dimensions.height, names[], "lqip": image.asset->metadata.lqip}, "artisticTeam": aristicTeam[]{role, names[]},
          "productionTeam": productionTeam[]{role, names[]}
        }
    }`);

  return fetchSanityData(playQuery);
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

  return fetchSanityData(mainBannerQuery);
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
            },
            _type == "fullWidthImage" => {
                ...,
                "image": image{..., "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height, "lqip": asset->metadata.lqip}
            },
            _type == "twoImages" => {
                ...,
                "imageLeft": imageLeft{..., "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height, "lqip": asset->metadata.lqip},
                "imageRight": imageRight{..., "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height, "lqip": asset->metadata.lqip}
            },
            _type == "imageGalleryBlock" => {
                ...,
                "images": images[]{"image": media.asset, "altText": media.altText, "caption": media.imageCaption, "width": media.asset->metadata.dimensions.width, "height": media.asset->metadata.dimensions.height, "lqip": media.asset->metadata.lqip}
            },
            _type == "articleReference" => {
                ...,
                "articleTitle": article->title,
                "articleSlug": article->slug.current
            }
        },
        foundersContent[]{
            ...,
            _type == "image" => {
                ...,
                "width": asset->metadata.dimensions.width,
                "height": asset->metadata.dimensions.height,
                "lqip": asset->metadata.lqip
            },
            _type == "fullWidthImage" => {
                ...,
                "image": image{..., "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height, "lqip": asset->metadata.lqip}
            },
            _type == "twoImages" => {
                ...,
                "imageLeft": imageLeft{..., "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height, "lqip": asset->metadata.lqip},
                "imageRight": imageRight{..., "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height, "lqip": asset->metadata.lqip}
            },
            _type == "imageGalleryBlock" => {
                ...,
                "images": images[]{"image": media.asset, "altText": media.altText, "caption": media.imageCaption, "width": media.asset->metadata.dimensions.width, "height": media.asset->metadata.dimensions.height, "lqip": media.asset->metadata.lqip}
            },
            _type == "articleReference" => {
                ...,
                "articleTitle": article->title,
                "articleSlug": article->slug.current
            }
        },
        foundersList[]{name, role, "image": {"image": image, "width": image.asset->metadata.dimensions.width, "height": image.asset->metadata.dimensions.height, "lqip": image.asset->metadata.lqip}}
    }`);

  return fetchSanityData(aboutQuery);
};

export const getArticles = async () => {
  const articlesQuery = defineQuery(`
    *[_type=="article"] | order(_createdAt desc){
      title,
      "slug": slug.current,
      author,
      _createdAt,
      ingress,
      "bannerImg": {"image": bannerImg, "altText": bannerImg.alt, "width": bannerImg.asset->metadata.dimensions.width, "height": bannerImg.asset->metadata.dimensions.height, "lqip": bannerImg.asset->metadata.lqip},
      "backgroundColor": backgroundColor.hex,
      "textColor": textColor.hex
    }
  `);

  return fetchSanityData(articlesQuery);
};

export const getArticle = async (slug: string) => {
  const articleQuery = defineQuery(`*[_type=="article" && slug.current=="${slug}"][0]{
    title,
    author,
    _createdAt,
    _updatedAt,
    "bannerImg": {"image": bannerImg, "altText": bannerImg.alt, "width": bannerImg.asset->metadata.dimensions.width, "height": bannerImg.asset->metadata.dimensions.height, "lqip": bannerImg.asset->metadata.lqip},
    ingress,
    content[]{
      ...,
      _type == "image" => {
        ...,
        "width": asset->metadata.dimensions.width,
        "height": asset->metadata.dimensions.height,
        "lqip": asset->metadata.lqip
      },
      _type == "fullWidthImage" => {
        ...,
        "image": image{..., "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height, "lqip": asset->metadata.lqip}
      },
      _type == "twoImages" => {
        ...,
        "imageLeft": imageLeft{..., "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height, "lqip": asset->metadata.lqip},
        "imageRight": imageRight{..., "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height, "lqip": asset->metadata.lqip}
      },
      _type == "imageGalleryBlock" => {
        ...,
        "images": images[]{"image": media.asset, "altText": media.altText, "caption": media.imageCaption, "width": media.asset->metadata.dimensions.width, "height": media.asset->metadata.dimensions.height, "lqip": media.asset->metadata.lqip}
      },
      _type == "articleReference" => {
        ...,
        "articleTitle": article->title,
        "articleSlug": article->slug.current
      }
    },
    "backgroundColor": backgroundColor.hex,
    "textColor": textColor.hex
  }`);

  return fetchSanityData(articleQuery);
};
