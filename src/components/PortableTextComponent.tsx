import { PortableTextComponents } from '@portabletext/react';
import { SanityAsset } from '@sanity/image-url';
import Link from 'next/link';

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
