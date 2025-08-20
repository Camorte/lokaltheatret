'use client';

import { LandingPage } from '@/lib/types';
import SanityImage from './SanityImage';
import { useState } from 'react';

type Props = {
    data: LandingPage;
};

const Hero = ({ data }: Props) => {
    const [videoEnded, setVideoEnded] = useState(false);

    return (
        <div className="relative">
            <div className="absolute z-[4] shadow-inner-lg h-full w-full" />
            <div className="bg-black absolute h-full w-full z-0 opacity-100" />
            {data.videoUrl && (
                <div
                    className={`absolute z-[4] h-[50vh] w-full md:h-full max-h-[70vh] ease-in transition-opacity duration-300 ${videoEnded ? 'opacity-0' : 'opacity-1'}`}
                >
                    <video
                        preload="auto"
                        playsInline
                        autoPlay
                        muted
                        loop={false}
                        className="w-full h-full"
                        style={{
                            objectFit: 'cover'
                        }}
                        onEnded={() => setVideoEnded(true)}
                    >
                        <source
                            src={data.videoUrl}
                            type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
                        />
                        <source src={data.videoUrl} type="video/mp4" />
                        Sorry, your browser doesn´t support embedded videos.
                    </video>
                </div>
            )}

            <SanityImage
                className="relative z-[2] w-full object-cover h-[50vh] md:h-full max-h-[70vh] ease-in transition-opacity duration-300 opacity-100 md:group-hover:opacity-[0.8]"
                src={data.image}
                alt={data.bannerAltText}
                width={1500}
                height={700}
            />

            <SanityImage
                className="absolute bottom-10 right-5 md:right-10 max-w-[250px] md:max-w-[500px] ease-in duration-300 z-[3] md:group-hover:scale-110"
                src={data.logo}
                alt={data.logoAltText}
                width={700}
                height={700}
            />
        </div>
    );
};

export default Hero;
