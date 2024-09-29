import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPlay, urlFor } from '../lib/sanity.ts';
import { Play } from '../lib/types.ts';
import { PortableText } from '@portabletext/react';
import PortableTextComponent from '../components/PortableTextComponent.tsx';

const PlayPage = () => {
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [play, setPlay] = useState<Play>();

    useEffect(() => {
        if (params.slug) {
            getPlay(params.slug)
                .then((response) => {
                    setPlay(response);
                })
                .finally(() => setIsLoading(false));
        }
    }, []);

    const parseToDate = (date: string) => new Date(date);

    return (
        <>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {play && (
                        <div className="flex flex-col">
                            <div className="relative">
                                <div
                                    className="absolute w-fit z-[2] top-[50%] left-[32px] md:left-[10vw] md:p-8"
                                    style={{ backgroundColor: play.playColor }}
                                >
                                    <img
                                        src={urlFor(play.logoImg.image).url()}
                                        className="max-w-[40vw]"
                                        alt={play.logoImg.altText}
                                    />
                                    <p className="text-lg m-0 md:text-4xl">
                                        {parseToDate(
                                            play.playDates[0]
                                        ).toLocaleDateString('nb')}{' '}
                                        -{' '}
                                        {parseToDate(
                                            play.playDates[
                                                play.playDates.length - 1
                                            ]
                                        ).toLocaleDateString('nb')}
                                    </p>
                                </div>
                                <img
                                    className="relative w-full h-full max-h-[80vh] object-cover"
                                    src={urlFor(play.bannerImg.image)
                                        .width(1900)
                                        .url()}
                                    alt={play.bannerImg.altText}
                                />
                            </div>
                            <div
                                className="grid grid-cols-1 md:grid-cols-3 gap-4 px-[32px] md:px-[10vw] py-8"
                                style={{ backgroundColor: play.playColor }}
                            >
                                <div className="flex flex-col items-center">
                                    <p className="font-bold">
                                        Forestillingsdatoer:{' '}
                                    </p>
                                    <p className="text-center">
                                        {play.playDates.reduce(
                                            (acc, curr, index) => {
                                                const currDate = parseToDate(
                                                    curr
                                                ).toLocaleDateString('nb', {
                                                    month: 'long',
                                                    day: 'numeric'
                                                });
                                                if (
                                                    index !==
                                                    play.playDates.length - 1
                                                ) {
                                                    return (
                                                        acc + currDate + ', '
                                                    );
                                                }

                                                return acc + currDate;
                                            },
                                            ''
                                        )}
                                    </p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <p className="font-bold">Varighet:</p>
                                    <p>{play.duration}</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <p className="font-bold">Lokasjon:</p>
                                    <p>{play.location}</p>
                                </div>
                            </div>
                            <div className="page-container">
                                <PortableText
                                    value={play.content}
                                    components={PortableTextComponent}
                                />
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default PlayPage;
