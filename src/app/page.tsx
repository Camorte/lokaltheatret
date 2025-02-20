import { getMainBanner } from '@/lib/sanity';
import PlayCard from '@/components/Plays/PlayCard';
import Link from 'next/link';
import { LandingPage } from '@/lib/types';
import Hero from '@/components/Hero';
import { notFound } from 'next/navigation';

const Page = async () => {
    const landingPage: LandingPage = await getMainBanner();

    if (!landingPage) {
        return notFound();
    }

    return (
        <main>
            <Link
                href={'/forestillinger' + landingPage.bannerUrl}
                className="relative group hover:cursor-pointer w-full h-[50vh] md:h-full max-h-[70vh]"
            >
                <Hero data={landingPage} />
            </Link>
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
                                imageAlt={play.image.alt}
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
        </main>
    );
};

export default Page;
