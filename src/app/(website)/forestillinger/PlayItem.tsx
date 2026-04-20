'use client';

import Link from 'next/link';
import { useState } from 'react';

import SanityImage from '@/components/SanityImage';
import { parseToDate } from '@/lib/helpers';
import { PlaysListItem } from '@/lib/types';

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
      className={`flex ${index % 2 !== 0 ? 'flex-row-reverse' : 'flex-row'} group h-[400px] w-full hover:cursor-pointer`}
      style={{ backgroundColor: play.playColor }}
      onMouseEnter={() => setHoverIndex(index)}
      onMouseLeave={() => setHoverIndex(undefined)}
    >
      <div
        className={`h-full w-1/2 flex-shrink-0 overflow-hidden md:w-2/3 md:transition-[width] md:duration-300 md:ease-in-out md:group-hover:w-1/2`}
      >
        <SanityImage
          src={play.bannerImg.image}
          alt={play.bannerImg.altText}
          className={`h-full w-full object-cover md:transition-[filter] md:duration-300 md:ease-in-out ${hoverIndex !== index ? 'md:grayscale md:filter' : ''}`}
          width={3000}
          height={3000}
          lqip={play.bannerImg.lqip}
          priority
        />
      </div>
      <div
        className="flex min-w-0 flex-1 flex-col items-center justify-center p-8 md:p-4"
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
          <h2 className="m-0 text-center text-2xl">{play.playTitle}</h2>
        )}
        <p className="text-center font-bold md:text-lg">
          {play.active && `${play.soldOut ? 'Billetter utsolgt' : 'Billetter tilgjengelig nå'}`}
        </p>
        <p className="mb-8 text-center text-lg">Lokasjon: {play.location}</p>
        <p className="flex flex-col text-center">
          {play.playDates
            ? play.playDates.map((date, index) => (
                <span key={`play-list-date-${index}`} className="m-0">
                  {parseToDate(date.playDate).toLocaleDateString('nb', {
                    month: 'long',
                    day: 'numeric',
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
