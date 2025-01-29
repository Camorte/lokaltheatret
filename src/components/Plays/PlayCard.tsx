'use client';

import { useSpring, a } from '@react-spring/web';
import { useState } from 'react';
import { SanityImageAssetDocument } from '@sanity/client';
import { urlFor } from '../../lib/sanity';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

const PlayCard = ({
    title,
    bgColor,
    textColor,
    image,
    imageAlt,
    playPeriod,
    description,
    href
}: {
    title: string;
    bgColor: string;
    textColor: string;
    image: SanityImageAssetDocument;
    imageAlt: string;
    playPeriod: string;
    description: string;
    href: string;
}) => {
    const router = useRouter();
    const [flipped, setFlipped] = useState(false);
    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 }
    });

    return (
        <div
            className="cursor-pointer flex w-full h-[400px] md:max-w-[380px] lg:max-w-[500px] md:h-[450px] lg:h-[560px] relative md:transition md:ease-in-out md:duration-300 md:hover:scale-105"
            onClick={() => setFlipped(true)}
        >
            <a.div
                className="play-card-contents"
                style={{
                    backgroundColor: bgColor,
                    opacity: opacity.to((o) => 1 - o),
                    transform
                }}
            >
                <img
                    className="w-full bg-black h-[280px] md:h-[280px] lg:h-[400px] object-cover"
                    src={urlFor(image).width(480).url()}
                    alt={imageAlt}
                />
                <div
                    className="p-4 flex flex-col items-center justify-between"
                    style={{ color: textColor }}
                >
                    <p className="text-lg md:text-xl lg:text-2xl font-bold text-center">
                        {title.toLocaleUpperCase()}
                    </p>
                    <p className="text-center">{playPeriod}</p>
                </div>
            </a.div>
            <a.div
                onClick={() => {
                    if (flipped) {
                        router.push('/forestillinger' + href);
                    }
                }}
                className="play-card-content"
                style={{
                    opacity,
                    transform,
                    rotateX: '180deg'
                }}
            >
                <div className="w-full h-full relative">
                    <div
                        className="relative z-[2] p-[10px] lg:p-4 flex flex-col h-full justify-between"
                        style={{ color: textColor }}
                    >
                        <div>
                            <p className="md:text-base lg:text-2xl font-bold">
                                {title.toLocaleUpperCase()}
                            </p>
                            <p className="m-0">{playPeriod}</p>
                            <p>{description}</p>
                        </div>
                        <FaArrowRightLong className="self-end" />
                    </div>
                    <div
                        className="absolute w-full h-full z-[1] opacity-[0.85] top-0"
                        style={{ backgroundColor: bgColor }}
                    />
                    <img
                        className="absolute h-full w-full object-cover z-0 top-0 grayscale"
                        src={urlFor(image).width(350).url()}
                        alt={imageAlt}
                    />
                </div>
            </a.div>
        </div>
    );
};

export default PlayCard;
