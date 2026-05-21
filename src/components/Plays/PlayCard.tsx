'use client';

import { SanityImageAssetDocument } from '@sanity/client';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FaArrowRightLong } from 'react-icons/fa6';

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
  href,
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
  const [isHovered, setIsHovered] = useState(false);
  const isTouchRef = useRef(false);
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleTouchStart = useCallback(() => {
    isTouchRef.current = true;
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (!isTouchRef.current) return;
      isTouchRef.current = false;

      if (!isHovered) {
        e.preventDefault();
        setIsHovered(true);
      }
    },
    [isHovered],
  );

  useEffect(() => {
    if (!isHovered) return;

    const handleOutsideTap = (e: TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setIsHovered(false);
      }
    };

    document.addEventListener('touchstart', handleOutsideTap);
    return () => document.removeEventListener('touchstart', handleOutsideTap);
  }, [isHovered]);

  return (
    <Link
      ref={cardRef}
      href={'/forestillinger' + href}
      className="sm:max-w-450px lg:max-w-500px relative flex aspect-9/10 w-full cursor-pointer md:aspect-4/7 md:transition md:duration-300 md:ease-in-out md:hover:scale-105"
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onClick={handleClick}
    >
      <div
        className="play-card-contents transition-opacity duration-300"
        style={{ opacity: isHovered ? 0 : 1 }}
      >
        <div className="relative h-full w-full">
          <SanityImage
            className="top-0 z-0 h-full w-full object-cover"
            src={image}
            alt={imageAlt}
            width={320}
            height={380}
            lqip={imageLqip}
            loading="lazy"
            quality={70}
          />
          <div
            className="absolute bottom-0 flex min-h-[40%] w-full flex-col items-center justify-between p-4"
            style={{ color: textColor, backgroundColor: bgColor }}
          >
            <p className="text-center align-middle text-lg font-bold md:text-xl lg:text-2xl">
              {title.toLocaleUpperCase()}
            </p>
            <p className="text-center">{playPeriod}</p>
          </div>
        </div>
      </div>
      <div
        className="play-card-contents transition-opacity duration-300"
        style={{ opacity: isHovered ? 1 : 0 }}
      >
        <div className="relative h-full w-full">
          <div
            className="relative z-2 flex h-full flex-col justify-between p-2.5 lg:p-4"
            style={{ color: textColor }}
          >
            <div className="px-2">
              <p className="font-bold md:text-base lg:text-2xl">{title.toLocaleUpperCase()}</p>
              <p className="m-0">{playPeriod}</p>
              <p>{description}</p>
            </div>
            <FaArrowRightLong className="self-end" />
          </div>
          <div
            className="absolute top-0 z-1 h-full w-full opacity-80"
            style={{ backgroundColor: bgColor }}
          />
          <SanityImage
            className="absolute top-0 z-0 h-full w-full object-cover grayscale"
            src={image}
            alt={imageAlt}
            width={320}
            height={380}
            lqip={imageLqip}
            loading="lazy"
            quality={70}
          />
        </div>
      </div>
    </Link>
  );
};

export default PlayCard;
