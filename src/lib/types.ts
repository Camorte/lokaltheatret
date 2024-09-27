import { SanityImageAssetDocument } from '@sanity/client';

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
        playStartDate: string;
        playEndDate: string;
        urlRef: string;
        playColor: string;
    };
};
