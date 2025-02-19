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

    return (
        <div
            className="cursor-pointer flex w-full h-[400px] md:max-w-[380px] lg:max-w-[500px] md:h-[450px] lg:h-[560px] relative md:transition md:ease-in-out md:duration-300 md:hover:scale-105"
            onClick={() => setFlipped(true)}
        >
            <motion.div
                className="play-card-contents"
                style={{
                    backgroundColor: bgColor
                }}
                initial={{ opacity: 1 }}
                animate={{
                    opacity: flipped ? 0 : 1,
                    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`
                }}
            >
                <SanityImage
                    className="w-full bg-black h-[280px] md:h-[280px] lg:h-[400px] object-cover"
                    src={image}
                    alt={imageAlt}
                    width={480}
                    height={480}
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
            </motion.div>
            <motion.div
                onClick={() => {
                    if (flipped) {
                        router.push('/forestillinger' + href);
                    }
                }}
                className="play-card-content"
                initial={{ opacity: 0, rotateX: '180deg' }}
                animate={{
                    opacity: flipped ? 1 : 0,
                    transform: `perspective(600px) rotateX(${flipped ? 360 : 180}deg)`
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
                    <SanityImage
                        className="absolute h-full w-full object-cover z-0 top-0 grayscale"
                        src={image}
                        alt={imageAlt}
                        width={350}
                        height={350}
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default PlayCard;
