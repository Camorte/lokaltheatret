import { SanityImageAssetDocument } from '@sanity/client';
import { PortableTextBlock } from '@portabletext/react';

export type SanityImage = {
    image: SanityImageAssetDocument;
    caption?: string;
    altText: string;
};

export type LandingPage = {
    title?: string;
    logo: SanityImageAssetDocument;
    image: SanityImageAssetDocument;
    logoAltText: string;
    bannerAltText: string;
    bannerUrl: string;
    highlightedPlays: HighlightedPlay[];
};

export type HighlightedPlay = {
    title: string;
    image: SanityImageAssetDocument;
    imageAlt: string;
    description: string;
    playReference: {
        active: boolean;
        playStartDate?: string;
        playEndDate?: string;
        playPeriod?: string;
        urlRef: string;
        playColor: string;
        textColor: string;
    };
};

export type Play = {
    playTitle: string;
    bannerImg: SanityImage;
    logoImg?: SanityImage;
    playDates?: string[];
    playColor: string;
    textColor: string;
    duration?: string;
    location: string;
    playPeriod?: string;
    ticketsPage: string;
    active: boolean;
    imageGallery?: SanityImage[];
    content: PortableTextBlock;
};

export type Footer = {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    slogan?: string;
    contactEmail: string;
};
