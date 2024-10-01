import { SanityImage } from '../lib/types.ts';
import { urlFor } from '../lib/sanity.ts';
import { IoIosArrowForward } from 'react-icons/io';
import { IoIosArrowBack } from 'react-icons/io';
import { MutableRefObject, useRef } from 'react';

const ImageGallery = ({ images }: { images: SanityImage[] }) => {
    const scrollToRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

    const handleScroll = (scrollLeft: boolean) => {
        const currScrollRef = scrollToRef.current;
        if (currScrollRef) {
            currScrollRef.scrollLeft +=
                currScrollRef.clientWidth * (scrollLeft ? 1 : -1);
        }
    };

    return (
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
                className="snap-x flex flex-row overflow-x-scroll gap-x-4 items-center"
            >
                {images.map((image) => (
                    <img
                        className="snap-start md:max-w-[50%] max-h-[20%]"
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
    );
};

export default ImageGallery;
