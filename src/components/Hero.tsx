'use client';

import { useState } from 'react';

import { LandingPage } from '@/lib/types';

import SanityImage from './SanityImage';

type Props = {
  data: LandingPage;
};

const Hero = ({ data }: Props) => {
  const [videoEnded, setVideoEnded] = useState(false);

  return (
    <div className="relative">
      <div className="shadow-inner-lg absolute z-4 h-full w-full" />
      <div className="absolute z-0 h-full w-full bg-black opacity-100" />
      {data.videoUrl && (
        <div
          className={`absolute z-4 h-[50vh] max-h-[70vh] w-full transition-opacity duration-300 ease-in md:h-full ${videoEnded ? 'opacity-0' : 'opacity-1'}`}
        >
          <video
            preload="auto"
            playsInline
            autoPlay
            muted
            loop={false}
            className="h-full w-full"
            style={{
              objectFit: 'cover',
            }}
            onEnded={() => setVideoEnded(true)}
          >
            <source src={data.videoUrl} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
            <source src={data.videoUrl} type="video/mp4" />
            Sorry, your browser doesn´t support embedded videos.
          </video>
        </div>
      )}

      <SanityImage
        className="relative z-2 h-[50vh] max-h-[70vh] w-full object-cover opacity-100 transition-opacity duration-300 ease-in md:h-full md:group-hover:opacity-[0.8]"
        src={data.image}
        alt={data.bannerAltText}
        width={1500}
        height={700}
      />

      <SanityImage
        className="absolute right-5 bottom-10 z-3 max-w-250px duration-300 ease-in md:right-10 md:max-w-500px md:group-hover:scale-110"
        src={data.logo}
        alt={data.logoAltText}
        width={700}
        height={700}
      />
    </div>
  );
};

export default Hero;
