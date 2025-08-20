'use client';

import { motion } from 'motion/react';
import { useState } from 'react';
import { SanityImageAssetDocument } from '@sanity/client';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import SanityImage from '../SanityImage';

const PlayCard = ({
    title,
    bgColor,
    textColor,
    image,
    imageAlt,
    imageLqip,
    playPeriod,
    description,
    href
}: {
    title: string;
    bgColor: string;
    textColor: string;
    image: SanityImageAssetDocument;
    imageAlt: string;
    imageLqip?: string;
    playPeriod: string;
    description: string;
    href: string;
}) => {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="cursor-pointer flex w-full h-[400px] md:max-w-[380px] lg:max-w-[500px] md:h-[450px] lg:h-[560px] relative md:transition md:ease-in-out md:duration-300 md:hover:scale-105"
            onMouseOver={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                className="play-card-contents"
                initial={{ opacity: 1 }}
                animate={{
                    opacity: isHovered ? 0 : 1
                }}
            >
                <div className="relative w-full h-full">
                    <SanityImage
                        className="w-full h-full object-cover z-0 top-0"
                        src={image}
                        alt={imageAlt}
                        width={320}
                        height={380}
                        lqip={imageLqip}
                        loading="lazy"
                        quality={70}
                    />
                    <div
                        className="absolute w-full bottom-0 p-4 flex flex-col items-center justify-between min-h-[40%]"
                        style={{ color: textColor, backgroundColor: bgColor }}
                    >
                        <p className="text-lg md:text-xl lg:text-2xl font-bold text-center align-middle">
                            {title.toLocaleUpperCase()}
                        </p>
                        <p className="text-center">{playPeriod}</p>
                    </div>
                </div>
            </motion.div>
            <motion.div
                onClick={() => {
                    if (isHovered) {
                        router.push('/forestillinger' + href);
                    }
                }}
                initial={{ opacity: 0 }}
                animate={{
                    opacity: isHovered ? 1 : 0
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
                        className="absolute w-full h-full z-[1] opacity-[0.5] top-0"
                        style={{ backgroundColor: bgColor }}
                    />
                    <SanityImage
                        className="absolute w-full h-full object-cover grayscale z-0 top-0"
                        src={image}
                        alt={imageAlt}
                        width={320}
                        height={380}
                        lqip={imageLqip}
                        loading="lazy"
                        quality={70}
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default PlayCard;
