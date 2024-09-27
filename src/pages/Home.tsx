import Layout from '../components/Layout.tsx';
import { useEffect, useState } from 'react';
import { getMainBanner, urlFor } from '../lib/sanity.ts';
import { LandingPage } from '../lib/types.ts';
import PlayCard from '../components/PlayCard.tsx';

const Home = () => {
    const [landingPage, setLandingPage] = useState<LandingPage>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getMainBanner()
            .then((response: LandingPage) => {
                setLandingPage(response);
            })
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <main>
            <Layout>
                {!isLoading && landingPage && (
                    <>
                        <div className="relative group hover:cursor-pointer">
                            <div className="absolute z-[4] shadow-inner-lg h-full w-full" />
                            <div className="bg-black absolute h-full w-full z-0 opacity-100" />
                            <img
                                className="relative z-[2] w-full object-cover h-[50vh] md:h-full max-h-[70vh] ease-in transition-opacity duration-300 opacity-100 group-hover:opacity-[0.8]"
                                src={urlFor(landingPage.image).url()}
                                alt={landingPage.bannerAltText}
                            />
                            <img
                                className="absolute bottom-10 right-0 max-w-[250px] md:max-w-[500px] ease-in duration-300 z-[3] group-hover:scale-110"
                                src={urlFor(landingPage.logo).url()}
                                alt={landingPage.logoAltText}
                            />
                        </div>
                        <div className="page-container">
                            <div className="grid grid-cols-1 w-full md:grid-cols-3 justify-center gap-x-4 gap-y-8 content-start justify-items-center">
                                {landingPage.highlightedPlays.map(
                                    (play, index) => {
                                        const startDate = new Date(
                                            play.playReference.playStartDate
                                        );
                                        const endDate = new Date(
                                            play.playReference.playEndDate
                                        );
                                        return (
                                            <PlayCard
                                                key={'play-card-' + index}
                                                title={play.title}
                                                image={play.image}
                                                imageAlt={play.imageAlt}
                                                playStartDate={startDate}
                                                playEndDate={endDate}
                                                description={play.description}
                                                color={
                                                    play.playReference.playColor
                                                }
                                                href={play.playReference.urlRef}
                                            />
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    </>
                )}
            </Layout>
        </main>
    );
};

export default Home;
