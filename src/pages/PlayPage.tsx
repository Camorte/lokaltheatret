import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPlay } from '../lib/sanity.ts';
import { Play } from '../lib/types.ts';
import { PortableText } from '@portabletext/react';
import PortableTextComponent from '../components/PortableTextComponent.tsx';
import { parseToDate } from '../lib/helpers.ts';
import PlayBanner from '../components/PlayBanner.tsx';
import ImageGallery from '../components/ImageGallery.tsx';

const PlayPage = () => {
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [play, setPlay] = useState<Play>();

    useEffect(() => {
        if (params.slug) {
            getPlay(params.slug)
                .then((response) => {
                    console.log(response);
                    setPlay(response);
                })
                .finally(() => setIsLoading(false));
        }
    }, []);

    return (
        <>
            {isLoading ? (
                <p>Loading...</p>
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
                                        {play.playDates &&
                                        play.active &&
                                        play.playDates.length > 0
                                            ? 'Forestillingsdatoer'
                                            : 'Forestilling spilt'}
                                        :
                                    </p>
                                    <p className="text-center">
                                        {play.playDates &&
                                        play.active &&
                                        play.playDates.length > 0
                                            ? play.playDates.reduce(
                                                  (acc, curr, index) => {
                                                      const currDate =
                                                          parseToDate(
                                                              curr
                                                          ).toLocaleDateString(
                                                              'nb',
                                                              {
                                                                  month: 'long',
                                                                  day: 'numeric'
                                                              }
                                                          );
                                                      if (
                                                          play.playDates &&
                                                          index !==
                                                              play.playDates
                                                                  .length -
                                                                  1
                                                      ) {
                                                          return (
                                                              acc +
                                                              currDate +
                                                              ', '
                                                          );
                                                      }

                                                      return acc + currDate;
                                                  },
                                                  ''
                                              )
                                            : play.playPeriod}
                                    </p>
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
                                        <a
                                            className="hidden md:block w-full my-4 p-4 font-bold text-center"
                                            style={{
                                                color: play.textColor,
                                                backgroundColor: play.playColor
                                            }}
                                            href={play.ticketsPage}
                                        >
                                            KJØP BILLETTER
                                        </a>
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
                                </div>
                                {play.active && (
                                    <button
                                        className="sticky md:hidden bottom-0 w-full p-4 font-bold text-center"
                                        style={{
                                            color: play.textColor,
                                            backgroundColor: play.playColor
                                        }}
                                        onClick={() =>
                                            (window.location.href =
                                                play.ticketsPage)
                                        }
                                        role="link"
                                    >
                                        KJØP BILLETTER
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
