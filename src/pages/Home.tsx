import { useEffect, useState } from 'react';
import { getMainBanner, urlFor } from '../lib/sanity.ts';
import { LandingPage } from '../lib/types.ts';
import PlayCard from '../components/Plays/PlayCard.tsx';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const [landingPage, setLandingPage] = useState<LandingPage>();
    const [isLoading, setIsLoading] = useState(true);
    const [videoEnded, setVideoEnded] = useState(false);

    useEffect(() => {
        getMainBanner()
            .then((response: LandingPage) => {
                setLandingPage(response);
            })
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <main>
            {!isLoading && landingPage && (
                <>
                    <div
                        onClick={() =>
                            navigate('/forestillinger' + landingPage.bannerUrl)
                        }
                        className="relative group hover:cursor-pointer w-full h-[50vh] md:h-full max-h-[70vh]"
                    >
                        <div className="absolute z-[4] shadow-inner-lg h-full w-full" />
                        <div className="bg-black absolute h-full w-full z-0 opacity-100" />
                        {landingPage.videoUrl && (
                            <div
                                className={`absolute z-[4] h-[50vh] w-full md:h-full max-h-[70vh] ease-in transition-opacity duration-300 ${videoEnded ? 'opacity-0' : 'opacity-1'}`}
                            >
                                <video
                                    preload="auto"
                                    playsInline
                                    autoPlay
                                    muted
                                    loop={false}
                                    className="w-full h-full"
                                    style={{
                                        objectFit: 'cover'
                                    }}
                                    onEnded={() => setVideoEnded(true)}
                                >
                                    <source
                                        src={landingPage.videoUrl}
                                        type="video/mp4"
                                    />
                                    Sorry, your browser doesn't support embedded
                                    videos.
                                </video>
                            </div>
                        )}

                        <img
                            className="relative z-[2] w-full object-cover h-[50vh] md:h-full max-h-[70vh] ease-in transition-opacity duration-300 opacity-100 md:group-hover:opacity-[0.8]"
                            src={urlFor(landingPage.image).width(1500).url()}
                            alt={landingPage.bannerAltText}
                        />

                        <img
                            className="absolute bottom-10 right-5 md:right-10 max-w-[250px] md:max-w-[500px] ease-in duration-300 z-[3] md:group-hover:scale-110"
                            src={urlFor(landingPage.logo).url()}
                            alt={landingPage.logoAltText}
                        />
                    </div>
                    <div className="page-container">
                        <div className="grid grid-cols-1 w-full md:grid-cols-3 justify-center gap-x-2 lg:gap-x-4 gap-y-8 content-start justify-items-center">
                            {landingPage.highlightedPlays.map((play, index) => {
                                let playPeriod = '';
                                if (
                                    play.playReference.playStartDate &&
                                    play.playReference.playEndDate &&
                                    play.playReference.active
                                ) {
                                    const startDate = new Date(
                                        play.playReference.playStartDate
                                    );
                                    const endDate = new Date(
                                        play.playReference.playEndDate
                                    );

                                    playPeriod = `${startDate.toLocaleDateString('nb')} - ${endDate.toLocaleDateString('nb')}`;
                                } else if (play.playReference.playPeriod) {
                                    playPeriod = play.playReference.playPeriod;
                                }

                                return (
                                    <PlayCard
                                        key={'play-card-' + index}
                                        title={play.title}
                                        image={play.image}
                                        imageAlt={play.imageAlt}
                                        playPeriod={playPeriod}
                                        description={play.description}
                                        bgColor={play.playReference.playColor}
                                        textColor={play.playReference.textColor}
                                        href={play.playReference.urlRef}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </main>
    );
};

export default Home;
