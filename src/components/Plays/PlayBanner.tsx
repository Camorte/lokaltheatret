'use client';

import { PlayDate, SanityImage as SanityImageType } from '@/lib/types';
import { parseToDate } from '@/lib/helpers';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import SanityImage from '../SanityImage';

const PlayBanner = ({
    bannerImg,
    playDates,
    playPeriod,
    textColor,
    playColor,
    playTitle,
    playActive,
    logoImg
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
        <div className="relative w-full h-[80vh]">
            <button
                className="absolute top-4 left-4 md:top-6 md:left-6 z-[3] flex text-base font-bold items-center gap-x-2 p-4"
                style={{ backgroundColor: playColor, color: textColor }}
                onClick={() => route.push('/forestillinger')}
            >
                <FaArrowLeftLong />{' '}
                <p className="hidden md:block">Forestillinger</p>
            </button>
            <div
                className="absolute w-fit p-2 z-[2] top-[50%] left-[32px] md:left-[10vw] md:p-8"
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
                        className="font-bold text-2xl max-w-[200px] md:text-4xl md:max-w-[300px]"
                        style={{ color: textColor }}
                    >
                        {playTitle.toLocaleUpperCase()}
                    </p>
                )}
                <p
                    className="text-sm m-0 md:text-3xl"
                    style={{ color: textColor }}
                >
                    {playDates &&
                        playActive &&
                        `${parseToDate(
                            playDates[0].playDate
                        ).toLocaleDateString('nb')}  ${
                            playDates.length > 1
                                ? `- ${parseToDate(
                                      playDates[playDates.length - 1].playDate
                                  ).toLocaleDateString('nb')}`
                                : ''
                        }`}
                    {(!playDates || playDates.length === 0) &&
                        playPeriod &&
                        playPeriod}
                </p>
            </div>
            <SanityImage
                className="relative w-full h-full max-h-[80vh] object-cover top-0"
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
