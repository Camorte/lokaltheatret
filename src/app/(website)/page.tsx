import Link from 'next/link';
import { notFound } from 'next/navigation';

import Hero from '@/components/Hero';
import PlayCard from '@/components/Plays/PlayCard';
import { getMainBanner } from '@/lib/sanity/fetch';
import { LandingPage } from '@/lib/types';

const Page = async () => {
  const landingPage: LandingPage = await getMainBanner();

  if (!landingPage) {
    return notFound();
  }

  return (
    <main>
      <Link
        href={'/forestillinger' + landingPage.bannerUrl}
        className="group relative h-[50vh] max-h-[70vh] w-full hover:cursor-pointer md:h-full"
      >
        <Hero data={landingPage} />
      </Link>
      <div className="page-container">
        <div className="grid w-full grid-cols-1 content-start justify-center justify-items-center gap-x-2 gap-y-8 md:grid-cols-2 lg:gap-x-4 xl:grid-cols-3">
          {landingPage.highlightedPlays.map((play, index) => {
            let playPeriod = '';
            if (
              play.playReference &&
              play.playReference.playStartDate &&
              play.playReference.playEndDate &&
              play.playReference.active
            ) {
              const startDate = new Date(play.playReference.playStartDate);
              const endDate = new Date(play.playReference.playEndDate);

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
