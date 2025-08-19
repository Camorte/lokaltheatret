import { SanityImageAssetDocument } from '@sanity/client';
import { PortableTextBlock } from '@portabletext/react';

export type SanityImage = {
    image: SanityImageAssetDocument;
    caption?: string;
    altText: string;
    width?: number;
    height?: number;
    lqip?: string;
};

export type LandingPage = {
    title?: string;
    logo: SanityImageAssetDocument;
    image: SanityImageAssetDocument;
    logoAltText: string;
    bannerAltText: string;
    bannerUrl: string;
    highlightedPlays: HighlightedPlay[];
    videoUrl: string;
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

export type PlayDate = {
    playDate: string;
    soldOut: boolean;
    fewTickets: boolean;
};

export type PlaysListItem = {
    playTitle: string;
    bannerImg: SanityImage;
    logoImg?: SanityImage;
    playDates?: PlayDate[];
    playColor: string;
    textColor: string;
    location: string;
    playPeriod?: string;
    active: boolean;
    soldOut?: boolean;
    slug: string;
};

export type PlaysList = PlaysListItem[];

export type Play = {
    playTitle: string;
    bannerImg: SanityImage;
    logoImg?: SanityImage;
    playDates?: PlayDate[];
    soldOut?: boolean;
    playColor: string;
    textColor: string;
    duration?: string;
    location: string;
    playPeriod?: string;
    ticketsPage: string;
    active: boolean;
    imageGallery?: SanityImage[];
    content: PortableTextBlock;
    contributors: Contributors;
};

export type Footer = {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    slogan?: string;
    contactEmail: string;
};

export type Contributor = {
    role: string;
    names: string[];
} & Partial<SanityImage>;

export type Contributors = {
    actors?: Contributor[];
    artisticTeam?: Contributor[];
    productionTeam?: Contributor[];
};

export type AboutPage = {
    aboutPageBannerImg: SanityImage;
    title?: string;
    content: PortableTextBlock;
    bannerColor: string;
    foundersContent: PortableTextBlock;
    foundersList: {
        name: string;
        role: string;
        image: SanityImage;
    }[];
};

export type JoinPage = {
    joinPageBannerImg: SanityImage;
    title: string;
    bannerColor: string;
    content: PortableTextBlock;
};
