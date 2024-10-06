import { urlFor } from '../../lib/sanity.ts';
import { SanityImage } from '../../lib/types.ts';
import { parseToDate } from '../../lib/helpers.ts';

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
    return (
        <div className="relative">
            <div
                className="absolute w-fit p-2 z-[2] top-[50%] left-[32px] md:left-[10vw] md:p-8"
                style={{ backgroundColor: playColor }}
            >
                {logoImg?.image ? (
                    <img
                        src={urlFor(logoImg.image).url()}
                        className="max-w-[40vw] md:max-w-[30vw]"
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
                    className="text-lg m-0 md:text-3xl"
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
                src={urlFor(bannerImg.image).width(1900).url()}
                alt={bannerImg.altText}
            />
        </div>
    );
};

export default PlayBanner;
