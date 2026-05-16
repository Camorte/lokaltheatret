'use client';

import { useEffect, useRef } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';

import { assertIsNode } from '@/lib/helpers';
import { SanityImage as SanityImageType } from '@/lib/types';

import SanityImage from './SanityImage';

const ImageModal = ({
  images,
  currentIndex,
  onChangeIndex,
  onClose,
}: {
  images: SanityImageType[];
  currentIndex: number;
  onChangeIndex: (index: number) => void;
  onClose: () => void;
}) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const chosenImg = images[currentIndex];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const { target } = event;
      assertIsNode(target);
      if (contentRef.current && !contentRef.current.contains(target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowRight' && currentIndex < images.length - 1) {
        onChangeIndex(currentIndex + 1);
      } else if (event.key === 'ArrowLeft' && currentIndex > 0) {
        onChangeIndex(currentIndex - 1);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, images.length, onChangeIndex, onClose]);

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
          onClick={onClose}
        >
          <RxCross2 color="white" />
        </button>

        <div ref={contentRef} className="relative flex items-center">
          <div className="relative max-h-full max-w-full">
            <SanityImage
              className="max-h-[90vh] max-w-[90vw] object-contain md:max-w-[80vw]"
              src={chosenImg.image}
              alt={chosenImg.altText}
              width={1200}
              height={800}
              lqip={chosenImg.lqip}
              sizes="(max-width: 768px) 90vw, 80vw"
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

          {currentIndex > 0 && (
            <button
              className="absolute left-1 rounded-full bg-black/60 p-2 md:left-[-50px] md:bg-black"
              onClick={() => onChangeIndex(currentIndex - 1)}
            >
              <IoIosArrowBack color="white" size={20} />
            </button>
          )}

          {currentIndex < images.length - 1 && (
            <button
              className="absolute right-1 rounded-full bg-black/60 p-2 md:right-[-50px] md:bg-black"
              onClick={() => onChangeIndex(currentIndex + 1)}
            >
              <IoIosArrowForward color="white" size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default ImageModal;
