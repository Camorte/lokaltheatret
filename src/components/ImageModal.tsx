'use client';

import { useEffect, useRef } from 'react';
import { RxCross2 } from 'react-icons/rx';

import { assertIsNode } from '@/lib/helpers';
import { SanityImage as SanityImageType } from '@/lib/types';

import SanityImage from './SanityImage';

const ImageModal = ({
  chosenImg,
  setChosenImg,
}: {
  chosenImg: SanityImageType;
  setChosenImg: (img: SanityImageType | undefined) => void;
}) => {
  const refElement = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const { target } = event;
      assertIsNode(target);
      if (refElement.current && !refElement.current.contains(target as Node)) {
        setChosenImg(undefined);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Cleanup: remove event listener on unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [refElement, setChosenImg]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 z-10 h-full w-full"
      style={{
        backgroundColor: 'rgba(0,0,0,0.8)',
      }}
    >
      <div className="flex h-full w-full items-center justify-center gap-x-4 p-2 md:p-10">
        <button
          className="absolute top-5 right-5 rounded-full bg-black p-2"
          onClick={() => setChosenImg(undefined)}
        >
          <RxCross2 color="white" />
        </button>

        <div ref={refElement} className="relative max-h-full max-w-full">
          <SanityImage
            className="max-h-[90vh] max-w-[90vw] object-contain"
            src={chosenImg.image}
            alt={chosenImg.altText}
            width={1200}
            height={800}
            lqip={chosenImg.lqip}
            sizes="90vw"
          />

          {chosenImg.caption && (
            <p
              className="absolute right-0 bottom-5 left-0 m-0 mx-auto max-w-[300px] p-2 text-white md:max-w-[500px]"
              style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
            >
              {chosenImg.caption}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default ImageModal;
