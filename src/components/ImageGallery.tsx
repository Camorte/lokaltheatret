import { SanityImage } from '../lib/types.ts';
import { urlFor } from '../lib/sanity.ts';
import { IoIosArrowForward } from 'react-icons/io';
import { IoIosArrowBack } from 'react-icons/io';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import ImageModal from './ImageModal.tsx';

const ImageGallery = ({ images }: { images: SanityImage[] }) => {
    const scrollToRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
    const [chosenImg, setChosenImg] = useState<SanityImage | undefined>(
        undefined
    );

    const [maxScrollRight, setMaxScrollRight] = useState(true);
    const [maxScrollLeft, setMaxScrollLeft] = useState(true);

    const updateScrollMax = () => {
        const currScrollRef = scrollToRef.current;
        if (currScrollRef) {
            setMaxScrollRight(currScrollRef.scrollLeft === 0);

            setMaxScrollLeft(
                currScrollRef.scrollLeft + currScrollRef.clientWidth >=
                    currScrollRef.scrollWidth
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

    useEffect(() => {
        updateScrollMax();
        const currScrollRef = scrollToRef.current;

        if (currScrollRef) {
            setMaxScrollLeft(
                currScrollRef.scrollWidth <= currScrollRef.clientWidth
            );
        }
    }, []);

    useEffect(() => {
        const currScrollRef = scrollToRef.current;

        window.addEventListener('resize', updateScrollMax);

        if (currScrollRef) {
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
        <>
            <div className="flex flex-row items-center my-8">
                <div className="hidden md:block mr-4 h-[40px] w-[40px]">
                    {!maxScrollRight && (
                        <button onClick={() => handleScroll(false)}>
                            <IoIosArrowBack />
                        </button>
                    )}
                </div>
                <div
                    style={{
                        scrollBehavior: 'smooth'
                    }}
                    ref={scrollToRef}
                    className="snap-x snap-mandatory flex flex-row overflow-x-scroll items-center no-scrollbar w-full"
                >
                    {images.map((image, index) => (
                        <div
                            key={'img-gallery-' + index}
                            onClick={() => setChosenImg(image)}
                            className="cursor-pointer shrink-0 snap-start h-full w-[350px] p-4"
                        >
                            <img
                                className="w-full h-full"
                                src={urlFor(image.image).width(450).url()}
                                alt={image.altText}
                            />
                        </div>
                    ))}
                </div>
                <div className="hidden md:block ml-4 h-[40px] w-[40px]">
                    {!maxScrollLeft && (
                        <button onClick={() => handleScroll(true)}>
                            <IoIosArrowForward />
                        </button>
                    )}
                </div>
            </div>
            {chosenImg && (
                <ImageModal chosenImg={chosenImg} setChosenImg={setChosenImg} />
            )}
        </>
    );
};

export default ImageGallery;
