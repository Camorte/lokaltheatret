import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getPlays } from '@/lib/sanity/fetch';
import { PlaysList } from '@/lib/types';

import PlayItem from './PlayItem';

export const metadata: Metadata = {
  title: 'Forestillinger | Lokaltheatret',
  description: 'Oversikt over alle våre forestillinger på Lokaltheatret',
};

const Page = async () => {
  const playsList: PlaysList = await getPlays();

  if (!playsList) {
    return notFound();
  }

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full max-w-[1500px] flex-col gap-y-4">
        {playsList.map((play, index) => (
          <PlayItem play={play} index={index} key={`play-list-${index}`} />
        ))}
      </div>
    </div>
  );
};

export default Page;
