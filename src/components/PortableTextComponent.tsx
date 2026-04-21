import { PortableTextComponents } from '@portabletext/react';
import { SanityAsset } from '@sanity/image-url';
import Link from 'next/link';

import type { SanityImage as SanityImageType } from '@/lib/types';

import ImageGallery from './ImageGallery';
import SanityImage from './SanityImage';

const PortableTextComponent = (textColor?: string, playColor?: string): PortableTextComponents => ({
  types: {
    image: ({
      value,
    }: {
      value: {
        _type: string;
        asset: SanityAsset;
        imageCaption?: string;
        imageAlt: string;
        width?: number;
        height?: number;
        lqip?: string;
      };
    }) => {
      return (
        <div className="relative my-14 flex w-full justify-center">
          <div className="relative">
            <SanityImage
              className="h-auto w-full max-w-[400px] md:max-w-[800px]"
              src={value.asset || ''}
              alt={value.imageAlt}
              width={Math.min(value.width || 600, 600)}
              height={Math.min(value.height || 450, 450)}
              lqip={value.lqip}
              loading="lazy"
              quality={75}
            />
            {value.imageCaption && (
              <div
                className="absolute right-[-6px] bottom-[-45px] max-w-[200px] px-4 drop-shadow-md md:right-[-12px] md:max-w-[250px]"
                style={{
                  backgroundColor: playColor ?? '#ffffff',
                }}
              >
                <p className="italic" style={{ color: textColor ?? 'black' }}>
                  {value.imageCaption}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    },
    fullWidthImage: ({
      value,
    }: {
      value: {
        image: SanityAsset;
        imageCaption?: string;
        imageAlt: string;
        width?: number;
        height?: number;
        lqip?: string;
      };
    }) => {
      return (
        <div className="relative my-14">
          <SanityImage
            className="h-auto w-full"
            src={value.image || ''}
            alt={value.imageAlt}
            width={value.width || 1200}
            height={value.height || 800}
            lqip={value.lqip}
            loading="lazy"
            quality={75}
          />
          {value.imageCaption && (
            <div
              className="mt-2 max-w-[250px] px-4 drop-shadow-md"
              style={{
                backgroundColor: playColor ?? '#ffffff',
              }}
            >
              <p className="italic" style={{ color: textColor ?? 'black' }}>
                {value.imageCaption}
              </p>
            </div>
          )}
        </div>
      );
    },
    twoImages: ({
      value,
    }: {
      value: {
        imageLeft: SanityAsset & {
          imageCaption?: string;
          imageAlt: string;
          width?: number;
          height?: number;
          lqip?: string;
        };
        imageRight: SanityAsset & {
          imageCaption?: string;
          imageAlt: string;
          width?: number;
          height?: number;
          lqip?: string;
        };
      };
    }) => {
      return (
        <div className="my-14 flex flex-col gap-4 md:flex-row">
          <div className="relative md:w-1/2">
            <SanityImage
              className="h-auto w-full"
              src={value.imageLeft || ''}
              alt={value.imageLeft?.imageAlt || ''}
              width={value.imageLeft?.width || 600}
              height={value.imageLeft?.height || 450}
              lqip={value.imageLeft?.lqip}
              loading="lazy"
              quality={75}
            />
            {value.imageLeft?.imageCaption && (
              <div
                className="mt-2 max-w-[200px] px-4 drop-shadow-md"
                style={{
                  backgroundColor: playColor ?? '#ffffff',
                }}
              >
                <p className="italic" style={{ color: textColor ?? 'black' }}>
                  {value.imageLeft.imageCaption}
                </p>
              </div>
            )}
          </div>
          <div className="relative md:w-1/2">
            <SanityImage
              className="h-auto w-full"
              src={value.imageRight || ''}
              alt={value.imageRight?.imageAlt || ''}
              width={value.imageRight?.width || 600}
              height={value.imageRight?.height || 450}
              lqip={value.imageRight?.lqip}
              loading="lazy"
              quality={75}
            />
            {value.imageRight?.imageCaption && (
              <div
                className="mt-2 max-w-[200px] px-4 drop-shadow-md"
                style={{
                  backgroundColor: playColor ?? '#ffffff',
                }}
              >
                <p className="italic" style={{ color: textColor ?? 'black' }}>
                  {value.imageRight.imageCaption}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    },
    imageGalleryBlock: ({
      value,
    }: {
      value: {
        images: SanityImageType[];
      };
    }) => {
      return (
        <div className="my-14">
          <ImageGallery images={value.images} />
        </div>
      );
    },
  },
  marks: {
    link: ({ children, value }) => {
      return (
        <Link className="underline" href={value.href}>
          {children}
        </Link>
      );
    },
  },
  list: {
    bullet: ({ children }) => <ul className="ml-6 list-inside list-disc">{children}</ul>,
  },
  block: {
    normal: ({ children }) => <p className="mt-0 mb-4">{children}</p>,
    blockquote: ({ children }) => (
      <div className="mb-4 ml-8 border-l-2 border-gray-400 pl-4">
        <p className="m-0 italic">{children}</p>
      </div>
    ),
  },
});

export default PortableTextComponent;
