import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPlay } from '../lib/sanity.ts';
import { Play } from '../lib/types.ts';
import { PortableText } from '@portabletext/react';
import PortableTextComponent from '../components/PortableTextComponent.tsx';
import { parseToDate } from '../lib/helpers.ts';
import PlayBanner from '../components/Plays/PlayBanner.tsx';
import ImageGallery from '../components/ImageGallery.tsx';
import ContributorsSection from '../components/Plays/ContributorsSection.tsx';
import LoadingSpinner from '../components/LoadingSpinner.tsx';

const PlayPage = () => {
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [play, setPlay] = useState<Play>();

    useEffect(() => {
        if (params.slug) {
            getPlay(params.slug)
                .then((response: Play) => {
                    setPlay(response);
                })
                .finally(() => setIsLoading(false));
        }
    }, []);

    return (
        <>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    {play && (
                        <div className="flex flex-col">
                            <PlayBanner
                                bannerImg={play.bannerImg}
                                logoImg={play.logoImg}
                                playPeriod={play.playPeriod}
                                playDates={play.playDates}
                                textColor={play.textColor}
                                playColor={play.playColor}
                                playTitle={play.playTitle}
                            />
                            <div
                                className="grid grid-cols-1 justify-between md:grid-cols-3 gap-4 px-[32px] md:px-[10vw] py-8"
                                style={{ backgroundColor: play.playColor }}
                            >
                                <div
                                    className="flex flex-col items-center"
                                    style={{ color: play.textColor }}
                                >
                                    <p className="font-bold">
                                        Forestillingsperiode:
                                    </p>
                                    {play.playDates &&
                                    play.active &&
                                    play.playDates.length > 0 ? (
                                        play.playDates.map((date, index) => {
                                            const dateNow = new Date();

                                            const currDate = parseToDate(
                                                date.playDate
                                            );

                                            const currDateCopy = parseToDate(
                                                date.playDate
                                            );

                                            const dateText =
                                                currDate.toLocaleDateString(
                                                    'nb',
                                                    {
                                                        month: 'long',
                                                        day: 'numeric'
                                                    }
                                                );
                                            console.log(date.fewTickets);

                                            return (
                                                <p
                                                    key={`play-date-${index}`}
                                                    className={`${dateNow.setHours(0, 0, 0, 0) > currDateCopy.setHours(0, 0, 0, 0) ? 'line-through' : ''}`}
                                                >
                                                    {dateText},{' '}
                                                    {currDate.toLocaleTimeString(
                                                        'default',
                                                        {
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        }
                                                    )}{' '}
                                                    {date.soldOut
                                                        ? ' – Utsolgt'
                                                        : `${!(dateNow.setHours(0, 0, 0, 0) > currDateCopy.setHours(0, 0, 0, 0)) && date.fewTickets ? ' – Få billetter igjen' : ''}`}
                                                </p>
                                            );
                                        })
                                    ) : (
                                        <p>{play.playPeriod}</p>
                                    )}
                                </div>
                                <div style={{ color: play.textColor }}>
                                    {play.duration && play.active && (
                                        <div className="flex flex-col items-center">
                                            <p className="font-bold">
                                                Varighet:
                                            </p>
                                            <p>{play.duration}</p>
                                        </div>
                                    )}
                                </div>
                                <div
                                    className="flex flex-col items-center"
                                    style={{ color: play.textColor }}
                                >
                                    <p className="font-bold">Lokasjon:</p>
                                    <p>{play.location}</p>
                                </div>
                            </div>
                            <div>
                                <div className="page-container">
                                    {play.active && (
                                        <button
                                            className="hidden md:block w-full my-4 p-4 font-bold text-center"
                                            style={{
                                                backgroundColor: play.textColor,
                                                color: play.playColor
                                            }}
                                            onClick={() =>
                                                (window.location.href =
                                                    play.ticketsPage)
                                            }
                                            disabled={play.soldOut}
                                        >
                                            {play.soldOut
                                                ? 'UTSOLGT'
                                                : 'KJØP BILLETTER'}
                                        </button>
                                    )}

                                    <PortableText
                                        value={play.content}
                                        components={PortableTextComponent}
                                    />
                                    {play.imageGallery &&
                                        play.imageGallery.length > 0 && (
                                            <ImageGallery
                                                images={play.imageGallery}
                                            />
                                        )}
                                    {play.contributors && (
                                        <ContributorsSection
                                            buttonBgColor={play.playColor}
                                            buttonTextColor={play.textColor}
                                            contributors={play.contributors}
                                        />
                                    )}
                                </div>

                                {play.active && (
                                    <button
                                        className="sticky md:hidden bottom-0 w-full p-4 font-bold text-center"
                                        style={{
                                            backgroundColor: play.textColor,
                                            color: play.playColor
                                        }}
                                        onClick={() =>
                                            (window.location.href =
                                                play.ticketsPage)
                                        }
                                        role="link"
                                        disabled={play.soldOut}
                                    >
                                        {play.soldOut
                                            ? 'UTSOLGT'
                                            : 'KJØP BILLETTER'}
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default PlayPage;
