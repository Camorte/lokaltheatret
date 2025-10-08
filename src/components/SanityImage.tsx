'use client';

import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import Image, { ImageProps } from 'next/image';
import { urlFor } from '@/lib/sanity/client';

type Props = Omit<ImageProps, 'src'> & {
    src: SanityImageSource;
    width?: number;
    height?: number;
    lqip?: string;
};

export default function SanityImage({ src, alt, lqip, ...props }: Props) {
    return (
        <>
            {src && (
                <Image
                    src={urlFor(src).url()}
                    alt={alt}
                    loader={({ width, quality = 75 }) => {
                        let targetWidth: number;
                        if (props.priority) {
                            targetWidth = Math.min(width, 1200);
                        } else {
                            if (width <= 200) targetWidth = width;
                            else if (width <= 400)
                                targetWidth = Math.min(width * 1.2, 480);
                            else if (width <= 600)
                                targetWidth = Math.min(width * 1.1, 720);
                            else targetWidth = Math.min(width, 1000);
                        }

                        targetWidth = Math.round(targetWidth);

                        return urlFor(src)
                            .width(targetWidth)
                            .quality(quality)
                            .auto('format')
                            .url();
                    }}
                    placeholder="blur"
                    blurDataURL={
                        lqip || urlFor(src).width(20).quality(20).blur(50).url()
                    }
                    {...props}
                />
            )}
        </>
    );
}
