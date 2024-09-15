import { SanityImageAssetDocument } from '@sanity/client';

export type MainBanner = {
    title?: string;
    logo: SanityImageAssetDocument;
    image: SanityImageAssetDocument;
    logoCaption: string;
    caption: string;
};
