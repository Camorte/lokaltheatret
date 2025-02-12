'use client';

import { urlFor } from '@/lib/sanity';
import { SanityImage } from '@/lib/types';
import { useEffect, useRef, useState } from 'react';
import { assertIsNode } from '@/lib/helpers';
import LoadingSpinner from './LoadingSpinner';
import { RxCross2 } from 'react-icons/rx';

const ImageModal = ({
    chosenImg,
    setChosenImg
}: {
    chosenImg: SanityImage;
    setChosenImg: (img: SanityImage | undefined) => void;
}) => {
    const refElement = useRef<HTMLImageElement | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const { target } = event;
            assertIsNode(target);
            if (
                refElement.current &&
                !refElement.current.contains(target as Node)
            ) {
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
            className="fixed top-0 z-10 left-0 h-full w-full"
            style={{
                backgroundColor: 'rgba(0,0,0,0.8)'
            }}
        >
            <div className="flex items-center justify-center h-full w-full gap-x-4 p-2 md:p-10">
                <div
                    ref={refElement}
                    className="relative max-w-full max-h-full"
                >
                    {!isLoading && (
                        <button
                            className="absolute top-5 right-5 bg-black rounded-full p-2"
                            onClick={() => setChosenImg(undefined)}
                        >
                            <RxCross2 color="white" />
                        </button>
                    )}
                    <img
                        loading={'lazy'}
                        className="object-contain max-h-[90vh] max-w-[90vw]"
                        src={urlFor(chosenImg.image).url()}
                        onLoad={() => {
                            setIsLoading(false);
                        }}
                        alt={chosenImg.altText}
                    />
                    {chosenImg.caption && !isLoading && (
                        <p
                            className="absolute bottom-5 left-0 right-0 mx-auto text-white m-0 max-w-[300px] p-2 md:max-w-[500px]"
                            style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
                        >
                            {chosenImg.caption}
                        </p>
                    )}
                </div>
                {isLoading && <LoadingSpinner />}
            </div>
        </div>
    );
};
export default ImageModal;
