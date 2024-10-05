import { SanityImage } from '../lib/types.ts';
import { urlFor } from '../lib/sanity.ts';
import { IoIosArrowForward } from 'react-icons/io';
import { IoIosArrowBack } from 'react-icons/io';
import { MutableRefObject, useRef, useState } from 'react';
import ImageModal from './ImageModal.tsx';

const ImageGallery = ({ images }: { images: SanityImage[] }) => {
    const scrollToRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
    const [chosenImg, setChosenImg] = useState<SanityImage | undefined>(
        undefined
    );

    const handleScroll = (scrollLeft: boolean) => {
        const currScrollRef = scrollToRef.current;
        if (currScrollRef) {
            currScrollRef.scrollLeft +=
                Math.ceil(currScrollRef.getBoundingClientRect().width + 64) *
                (scrollLeft ? 1 : -1);
        }
    };

    return (
        <>
            <div className="flex flex-row items-center my-8">
                <button
                    className="hidden md:block mr-4 h-[40px] w-[40px]"
                    onClick={() => handleScroll(false)}
                >
                    <IoIosArrowBack />
                </button>
                <div
                    style={{
                        scrollBehavior: 'smooth'
                    }}
                    ref={scrollToRef}
                    className="snap-x snap-mandatory flex flex-row overflow-x-scroll items-center no-scrollbar"
                >
                    {images.map((image, index) => (
                        <img
                            key={'img-gallery-' + index}
                            onClick={() => setChosenImg(image)}
                            className="cursor-pointer snap-start md:max-w-[50%] max-h-[20%] mr-4 last-of-type:mr-0 "
                            src={urlFor(image.image).width(800).url()}
                            alt={image.altText}
                        />
                    ))}
                </div>
                <button
                    className="hidden md:block ml-4 h-[40px] w-[40px]"
                    onClick={() => handleScroll(true)}
                >
                    <IoIosArrowForward />
                </button>
            </div>
            {chosenImg && (
                <ImageModal chosenImg={chosenImg} setChosenImg={setChosenImg} />
            )}
        </>
    );
};

export default ImageGallery;
