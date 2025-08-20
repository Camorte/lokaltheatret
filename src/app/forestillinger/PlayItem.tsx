'use client';

import SanityImage from '@/components/SanityImage';
import { parseToDate } from '@/lib/helpers';
import { PlaysListItem } from '@/lib/types';
import Link from 'next/link';
import { useState } from 'react';

type Props = {
    play: PlaysListItem;
    index: number;
};

const PlayItem = ({ play, index }: Props) => {
    const [hoverIndex, setHoverIndex] = useState<number | undefined>(undefined);

    if (!play) {
        return null;
    }

    return (
        <Link
            href={'/forestillinger' + play.slug}
            className={`flex ${index % 2 !== 0 ? 'flex-row-reverse' : 'flex-row'} w-full hover:cursor-pointer group h-[400px]`}
            style={{ backgroundColor: play.playColor }}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(undefined)}
        >
            <SanityImage
                src={play.bannerImg.image}
                alt={play.bannerImg.altText}
                className={`h-full object-cover w-1/2 md:w-2/3 md:group-hover:w-1/2 md:transition-filter-width md:ease-in-out md:duration-300 ${hoverIndex !== index ? 'md:filter md:grayscale' : ''}`}
                width={3000}
                height={3000}
                lqip={play.bannerImg.lqip}
                priority
            />
            <div
                className="p-8 md:p-4 w-full flex flex-col items-center justify-center"
                style={{ color: play.textColor }}
            >
                {play.logoImg?.image && (
                    <SanityImage
                        className="w-[150px] md:w-[200px]"
                        src={play.logoImg.image}
                        alt={play.logoImg.altText}
                        width={play.logoImg.width}
                        height={play.logoImg.height}
                        lqip={play.logoImg.lqip}
                    />
                )}
                {!play.logoImg?.image && play.playTitle && (
                    <h2 className="text-2xl m-0 text-center">
                        {play.playTitle}
                    </h2>
                )}
                <p className="md:text-lg font-bold text-center">
                    {play.active &&
                        `${play.soldOut ? 'Billetter utsolgt' : 'Billetter tilgjengelig nå'}`}
                </p>
                <p className="text-lg mb-8 text-center">
                    Lokasjon: {play.location}
                </p>
                <p className="flex flex-col text-center">
                    {play.playDates
                        ? play.playDates.map((date, index) => (
                              <span
                                  key={`play-list-date-${index}`}
                                  className="m-0"
                              >
                                  {parseToDate(
                                      date.playDate
                                  ).toLocaleDateString('nb', {
                                      month: 'long',
                                      day: 'numeric'
                                  })}{' '}
                                  {date.soldOut ? ' – Utsolgt' : ''}
                              </span>
                          ))
                        : play.playPeriod}
                </p>
            </div>
        </Link>
    );
};

export default PlayItem;
