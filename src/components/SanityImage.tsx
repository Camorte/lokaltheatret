'use client';

import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import Image, { ImageProps } from 'next/image';
import { urlFor } from '@/lib/sanity';

type Props = Omit<ImageProps, 'src'> & {
    src: SanityImageSource;
};

export default function SanityImage({ src, alt, ...props }: Props) {
    return (
        <Image
            src={urlFor(src).url()}
            alt={alt}
            loader={({ width, quality = 100 }) =>
                urlFor(src).width(width).quality(quality).url()
            }
            placeholder="blur"
            blurDataURL={urlFor(src).blur(100).url()}
            {...props}
        />
    );
}
