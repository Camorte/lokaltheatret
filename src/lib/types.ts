import { SanityImageAssetDocument } from '@sanity/client';

export type MainBanner = {
    title?: string;
    image: SanityImageAssetDocument;
    caption: string;
};
