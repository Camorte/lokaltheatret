import { useEffect, useState } from 'react';
import { getPlays, urlFor } from '../lib/sanity.ts';
import { PlaysList } from '../lib/types.ts';
import { parseToDate } from '../lib/helpers.ts';
import LoadingSpinner from '../components/LoadingSpinner.tsx';
import { useNavigate } from 'react-router-dom';

const Plays = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [playsList, setPlaysList] = useState<PlaysList>([]);
    const [hoverIndex, setHoverIndex] = useState<number | undefined>(undefined);

    useEffect(() => {
        getPlays()
            .then((response: PlaysList) => {
                setPlaysList(response);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading) {
        return <LoadingSpinner colorBlack />;
    }

    return (
        <div className="flex flex-col w-full">
            {playsList.map((play, index) => (
                <div
                    key={`play-list-${index}`}
                    className={`flex ${index % 2 !== 0 ? 'flex-row-reverse' : 'flex-row'} w-full hover:cursor-pointer group h-[400px]`}
                    style={{ backgroundColor: play.playColor }}
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(undefined)}
                    onClick={() => navigate('/forestillinger' + play.slug)}
                >
                    <img
                        className={`object-cover w-1/2 md:w-2/3 md:group-hover:w-1/3 md:transition-filter-width md:ease-in-out md:duration-300 ${hoverIndex !== undefined && hoverIndex !== index ? 'md:filter md:grayscale' : ''}`}
                        src={urlFor(play.bannerImg.image).width(1200).url()}
                        alt={play.bannerImg.altText}
                    />
                    <div
                        className="p-8 md:p-4 w-full flex flex-col items-center justify-center"
                        style={{ color: play.textColor }}
                    >
                        {play.logoImg?.image && (
                            <img
                                className="w-[150px] md:w-[200px]"
                                src={urlFor(play.logoImg.image)
                                    .width(300)
                                    .url()}
                                alt={play.logoImg.altText}
                            />
                        )}
                        {!play.logoImg?.image && play.playTitle && (
                            <h2 className="text-2xl m-0 text-center">
                                {play.playTitle}
                            </h2>
                        )}
                        <p className="md:text-lg font-bold text-center">
                            {play.active && 'Billetter tilgjengelig nå'}
                        </p>
                        <p className="text-lg mb-8 text-center">
                            Lokasjon: {play.location}
                        </p>
                        <p className="flex flex-col text-center">
                            {play.playDates
                                ? play.playDates.map((date, index) => (
                                      <span
                                          key={`play-list-date-${index}`}
                                          className="m-0"
                                      >
                                          {parseToDate(date).toLocaleDateString(
                                              'nb',
                                              {
                                                  month: 'long',
                                                  day: 'numeric'
                                              }
                                          )}
                                      </span>
                                  ))
                                : play.playPeriod}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Plays;
