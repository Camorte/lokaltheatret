import { useSpring, a } from '@react-spring/web';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SanityImageAssetDocument } from '@sanity/client';
import { urlFor } from '../lib/sanity.ts';

const PlayCard = ({
    title,
    color,
    image,
    imageAlt,
    playStartDate,
    playEndDate,
    description,
    href
}: {
    title: string;
    color: string;
    image: SanityImageAssetDocument;
    imageAlt: string;
    playStartDate: Date;
    playEndDate: Date;
    description: string;
    href: string;
}) => {
    const navigate = useNavigate();

    const [flipped, setFlipped] = useState(false);
    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 }
    });

    return (
        <div
            className="flex w-full md:w-[380px] h-[500px] relative transition ease-in-out duration-300 hover:scale-105"
            onClick={() => setFlipped(true)}
        >
            <a.div
                className="play-card-contents"
                style={{
                    backgroundColor: color,
                    opacity: opacity.to((o) => 1 - o),
                    transform
                }}
            >
                <img
                    className="w-full bg-black h-[330px] object-cover"
                    src={urlFor(image).url()}
                    alt={imageAlt}
                />
                <div className="p-4 flex flex-col items-center justify-center">
                    <p className="text-4xl font-bold text-center">
                        {title.toLocaleUpperCase()}
                    </p>
                    <p>
                        {playStartDate.toLocaleDateString('nb')} -{' '}
                        {playEndDate.toLocaleDateString('nb')}
                    </p>
                </div>
            </a.div>
            <a.div
                onClick={() => {
                    if (flipped) {
                        navigate(href);
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
                    <div className="relative z-[2] p-4 text-white">
                        <p className="text-2xl font-bold">
                            {title.toLocaleUpperCase()}
                        </p>
                        <p>
                            {playStartDate.toLocaleDateString('nb')} -{' '}
                            {playEndDate.toLocaleDateString('nb')}
                        </p>
                        <p>{description}</p>
                    </div>
                    <div
                        className="absolute w-full h-full z-[1] opacity-[0.75] top-0"
                        style={{ backgroundColor: color }}
                    />
                    <img
                        className="absolute h-full w-full object-cover z-0 top-0"
                        src={urlFor(image).url()}
                        alt={imageAlt}
                    />
                </div>
            </a.div>
        </div>
    );
};

export default PlayCard;
