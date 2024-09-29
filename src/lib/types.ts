import { SanityImageAssetDocument } from '@sanity/client';
import { PortableTextBlock } from '@portabletext/react';

type Image = {
    image: SanityImageAssetDocument;
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
        playStartDate?: string;
        playEndDate?: string;
        playPeriod?: string;
        urlRef: string;
        playColor: string;
    };
};

export type Play = {
    playTitle: string;
    bannerImg: Image;
    logoImg?: Image;
    playDates?: string[];
    playColor: string;
    duration?: string;
    location: string;
    playPeriod?: string;
    content: PortableTextBlock;
};

export type Footer = {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    slogan?: string;
    contactEmail: string;
};
