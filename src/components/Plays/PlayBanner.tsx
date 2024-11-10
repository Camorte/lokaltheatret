import { urlFor } from '../../lib/sanity.ts';
import { SanityImage } from '../../lib/types.ts';
import { parseToDate } from '../../lib/helpers.ts';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const PlayBanner = ({
    bannerImg,
    playDates,
    playPeriod,
    textColor,
    playColor,
    playTitle,
    logoImg
}: {
    bannerImg: SanityImage;
    logoImg: SanityImage | undefined;
    playPeriod: string | undefined;
    playDates: string[] | undefined;
    textColor: string;
    playColor: string;
    playTitle: string;
}) => {
    const navigate = useNavigate();
    return (
        <div className="relative">
            <button
                className="absolute top-6 left-6 z-[3] flex text-white text-xl items-center gap-x-2 hover:border-b"
                onClick={() => navigate('/forestillinger')}
            >
                <FaArrowLeftLong /> Forestillinger
            </button>
            <div
                className="absolute w-fit p-2 z-[2] top-[40%] left-[32px] md:left-[10vw] md:p-8"
                style={{ backgroundColor: playColor }}
            >
                {logoImg?.image ? (
                    <img
                        src={urlFor(logoImg.image).width(300).url()}
                        className="max-w-[30vw] md:max-w-[30vw]"
                        alt={logoImg.altText}
                    />
                ) : (
                    <p
                        className="font-bold text-2xl max-w-[200px] md:text-4xl md:max-w-[300px]"
                        style={{ color: textColor }}
                    >
                        {playTitle.toLocaleUpperCase()}
                    </p>
                )}
                <p
                    className="text-sm m-0 md:text-3xl"
                    style={{ color: textColor }}
                >
                    {playDates &&
                        `${parseToDate(playDates[0]).toLocaleDateString(
                            'nb'
                        )} - ${parseToDate(
                            playDates[playDates.length - 1]
                        ).toLocaleDateString('nb')}`}
                    {(!playDates || playDates.length > 0) &&
                        playPeriod &&
                        playPeriod}
                </p>
            </div>
            <img
                className="relative w-full h-full max-h-[80vh] object-cover"
                src={urlFor(bannerImg.image).width(1600).url()}
                alt={bannerImg.altText}
            />
        </div>
    );
};

export default PlayBanner;
