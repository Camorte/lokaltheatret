import { getMainBanner, getPlay } from '@/lib/sanity/fetch';
import { Play } from '@/lib/types';
import { PortableText } from '@portabletext/react';
import PortableTextComponent from '@/components/PortableTextComponent';
import { parseToDate } from '@/lib/helpers';
import PlayBanner from '@/components/Plays/PlayBanner';
import ImageGallery from '@/components/ImageGallery';
import ContributorsSection from '@/components/Plays/ContributorsSection';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { urlFor } from '@/lib/sanity/client';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const slug = (await params).slug;

    const play: Play = await getPlay(slug);
    const landingPage = await getMainBanner();

    const highlightedPlay = landingPage.highlightedPlays.find(
        (highlightedPlay) => highlightedPlay.title === play.playTitle
    );

    const title = play.playTitle + ' | Lokaltheatret';
    const description = highlightedPlay?.description;
    const url = 'https://lokaltheatret.no/forestillinger/' + slug;
    const image = urlFor(play.bannerImg.image).width(1200).format('jpg').url();
    const alt = play.bannerImg.altText;

    return {
        title: title,
        description: description,

        keywords: [
            'Lokaltheatret',
            'Teater',
            'Oslo',
            'Forestilling',
            play.playTitle,
            play.location
        ],
        openGraph: {
            type: 'website',
            url: url,
            title: title,
            description: description,
            images: [
                {
                    url: image,
                    alt: alt
                }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title: title,
            description: description,
            images: [
                {
                    url: image,
                    alt: alt
                }
            ]
        }
    };
}

const Page = async ({ params }: Props) => {
    const { slug } = await params;
    const play: Play = await getPlay(slug);

    if (!play) {
        return notFound();
    }

    return (
        <div className="flex flex-col">
            <PlayBanner
                playActive={play.active}
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
                    <p className="font-bold">Forestillingsperiode:</p>
                    {play.playDates &&
                    play.active &&
                    play.playDates.length > 0 ? (
                        play.playDates.map((date, index) => {
                            const dateNow = new Date();

                            const currDate = parseToDate(date.playDate);

                            const currDateCopy = parseToDate(date.playDate);

                            const dateText = currDate.toLocaleDateString('nb', {
                                month: 'long',
                                day: 'numeric'
                            });

                            return (
                                <p
                                    key={`play-date-${index}`}
                                    className={`${dateNow.setHours(0, 0, 0, 0) > currDateCopy.setHours(0, 0, 0, 0) ? 'line-through' : ''}`}
                                >
                                    {dateText},{' '}
                                    {currDate.toLocaleTimeString('default', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}{' '}
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
                            <p className="font-bold">Varighet:</p>
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
                                (window.location.href = play.ticketsPage)
                            }
                            disabled={play.soldOut}
                        >
                            {play.soldOut ? 'UTSOLGT' : 'KJØP BILLETTER'}
                        </button>
                    )}

                    <PortableText
                        value={play.content}
                        components={PortableTextComponent(
                            play.textColor,
                            play.playColor
                        )}
                    />
                    {play.imageGallery && play.imageGallery.length > 0 && (
                        <ImageGallery images={play.imageGallery} />
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
                            (window.location.href = play.ticketsPage)
                        }
                        role="link"
                        disabled={play.soldOut}
                    >
                        {play.soldOut ? 'UTSOLGT' : 'KJØP BILLETTER'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Page;
