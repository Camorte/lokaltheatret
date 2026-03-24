'use client';

import { useEffect, useRef, useState } from 'react';
import { FaCircle } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import { IoIosArrowBack } from 'react-icons/io';

import type { SanityImage as SanityImageType } from '@/lib/types';

import ImageModal from './ImageModal';
import SanityImage from './SanityImage';

const ImageGallery = ({ images }: { images: SanityImageType[] }) => {
  const scrollToRef = useRef<HTMLDivElement | null>(null);
  const [chosenImg, setChosenImg] = useState<SanityImageType | undefined>(undefined);

  const [numberOfPages, setNumberOfPages] = useState<number | undefined>();
  const [maxScrollRight, setMaxScrollRight] = useState(true);
  const [maxScrollLeft, setMaxScrollLeft] = useState(true);
  const [scrollIndex, setScrollIndex] = useState(0);

  const updateScrollMax = () => {
    const currScrollRef = scrollToRef.current;
    if (currScrollRef) {
      setMaxScrollRight(currScrollRef.scrollLeft === 0);
      setMaxScrollLeft(
        currScrollRef.scrollLeft + currScrollRef.clientWidth >= currScrollRef.scrollWidth,
      );
    }
  };

  const scrollOnFocus = () => {
    if (document.activeElement) {
      document.activeElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScroll = (scrollLeft: boolean) => {
    const currScrollRef = scrollToRef.current;
    if (currScrollRef) {
      currScrollRef.scrollLeft += 700 * (scrollLeft ? 1 : -1);
    }
  };

  const updateScrollIndex = () => {
    const currScrollRef = scrollToRef.current;

    if (!currScrollRef) return;
    if (numberOfPages !== undefined) {
      const scrollPercentage = currScrollRef.scrollLeft / currScrollRef.scrollWidth;

      const newIndex = Math.round(scrollPercentage * numberOfPages);
      if (newIndex >= numberOfPages) {
        setScrollIndex(numberOfPages - 1);
      } else {
        setScrollIndex(newIndex);
      }
    }
  };

  useEffect(() => {
    const currScrollRef = scrollToRef.current;
    if (currScrollRef) {
      currScrollRef.addEventListener('scroll', updateScrollIndex);

      return () => {
        currScrollRef.removeEventListener('scroll', updateScrollIndex);
      };
    }
  }, [numberOfPages]);

  useEffect(() => {
    updateScrollMax();
    const currScrollRef = scrollToRef.current;

    if (currScrollRef) {
      setMaxScrollLeft(currScrollRef.scrollWidth <= currScrollRef.clientWidth);

      const pages = Math.round(currScrollRef.scrollWidth / currScrollRef.clientWidth);

      if (pages > 4) {
        setNumberOfPages(4);
      } else if (pages > 1) {
        setNumberOfPages(pages);
      }
    }
  }, []);

  useEffect(() => {
    const currScrollRef = scrollToRef.current;

    window.addEventListener('resize', updateScrollMax);

    if (currScrollRef) {
      const pages = Math.round(currScrollRef.scrollWidth / currScrollRef.clientWidth);

      if (pages > 4) {
        setNumberOfPages(4);
      } else if (pages > 1) {
        setNumberOfPages(pages);
      }

      currScrollRef.addEventListener('scroll', updateScrollMax);
      currScrollRef.addEventListener('focus', scrollOnFocus);
    }

    return () => {
      if (currScrollRef) {
        currScrollRef.removeEventListener('scroll', updateScrollMax);
        currScrollRef.removeEventListener('focus', scrollOnFocus);
      }
      window.removeEventListener('resize', updateScrollMax);
    };
  }, [scrollToRef]);

  return (
    <div className="my-8">
      <div className="flex flex-row items-center">
        <div className="mr-4 hidden h-[40px] w-[40px] md:block">
          {!maxScrollRight && (
            <button onClick={() => handleScroll(false)}>
              <IoIosArrowBack />
            </button>
          )}
        </div>
        <div
          style={{
            scrollBehavior: 'smooth',
          }}
          ref={scrollToRef}
          className="no-scrollbar flex h-[500px] w-full snap-x snap-mandatory flex-row items-center overflow-x-scroll"
        >
          {images.map((image, index) => (
            <div
              key={'img-gallery-' + index}
              onClick={() => setChosenImg(image)}
              className="max-h-[500px] w-[350px] shrink-0 cursor-pointer snap-start p-4"
            >
              <SanityImage
                className="h-full w-full object-cover"
                src={image.image}
                alt={image.altText}
                width={image.width || 350}
                height={image.height || 400}
                lqip={image.lqip}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <div className="ml-4 hidden h-[40px] w-[40px] md:block">
          {!maxScrollLeft && (
            <button onClick={() => handleScroll(true)}>
              <IoIosArrowForward />
            </button>
          )}
        </div>
      </div>
      <div className="flex w-full flex-row items-center justify-center gap-x-2">
        {numberOfPages &&
          Array.from({ length: numberOfPages }, (_, i) => (
            <FaCircle
              key={'image-gallery-circle-' + i}
              size={10}
              color={`${i == scrollIndex ? 'black' : 'lightgrey'}`}
            />
          ))}
      </div>
      {chosenImg && <ImageModal chosenImg={chosenImg} setChosenImg={setChosenImg} />}
    </div>
  );
};

export default ImageGallery;
