'use client';

import { useRouter } from 'next/navigation';
import { FaArrowLeftLong } from 'react-icons/fa6';

import { parseToDate } from '@/lib/helpers';
import { PlayDate, SanityImage as SanityImageType } from '@/lib/types';

import SanityImage from '../SanityImage';

const PlayBanner = ({
  bannerImg,
  playDates,
  playPeriod,
  textColor,
  playColor,
  playTitle,
  playActive,
  logoImg,
}: {
  bannerImg: SanityImageType;
  logoImg: SanityImageType | undefined;
  playPeriod: string | undefined;
  playDates: PlayDate[] | undefined;
  playActive: boolean;
  textColor: string;
  playColor: string;
  playTitle: string;
}) => {
  const route = useRouter();
  return (
    <div className="relative h-[80vh] w-full">
      <button
        className="absolute top-4 left-4 z-[3] flex cursor-pointer items-center gap-x-2 p-4 text-base font-bold transition-opacity hover:opacity-80 md:top-6 md:left-6"
        style={{ backgroundColor: playColor, color: textColor }}
        onClick={() => route.push('/forestillinger')}
      >
        <FaArrowLeftLong /> <p className="hidden md:block">Forestillinger</p>
      </button>
      <div
        className="absolute top-[50%] left-[32px] z-[2] w-fit p-2 md:left-[10vw] md:p-8"
        style={{ backgroundColor: playColor }}
      >
        {logoImg?.image ? (
          <SanityImage
            src={logoImg.image}
            className="max-w-[30vw] md:max-w-[30vw]"
            alt={logoImg.altText}
            width={logoImg.width || 300}
            height={logoImg.height || 300}
            lqip={logoImg.lqip}
          />
        ) : (
          <p
            className="max-w-[200px] text-2xl font-bold md:max-w-[300px] md:text-4xl"
            style={{ color: textColor }}
          >
            {playTitle.toLocaleUpperCase()}
          </p>
        )}
        <p className="m-0 text-sm md:text-3xl" style={{ color: textColor }}>
          {playDates &&
            playActive &&
            `${parseToDate(playDates[0].playDate).toLocaleDateString('nb')}  ${
              playDates.length > 1
                ? `- ${parseToDate(playDates[playDates.length - 1].playDate).toLocaleDateString(
                    'nb',
                  )}`
                : ''
            }`}
          {(!playDates || playDates.length === 0) && playPeriod && playPeriod}
        </p>
      </div>
      <SanityImage
        className="relative top-0 h-full max-h-[80vh] w-full object-cover"
        src={bannerImg.image}
        alt={bannerImg.altText}
        width={Math.min(bannerImg.width || 1600, 1600)}
        height={Math.min(bannerImg.height || 900, 900)}
        lqip={bannerImg.lqip}
        sizes="100vw"
        priority
        quality={90}
      />
    </div>
  );
};

export default PlayBanner;
