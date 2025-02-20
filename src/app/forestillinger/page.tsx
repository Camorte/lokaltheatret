import { getPlays } from '@/lib/sanity';
import { PlaysList } from '@/lib/types';
import PlayItem from './PlayItem';
import { notFound } from 'next/navigation';

const Page = async () => {
    const playsList: PlaysList = await getPlays();

    if (!playsList) {
        return notFound();
    }

    return (
        <div className="flex flex-col items-center w-full">
            <div className="flex flex-col w-full gap-y-4 max-w-[1500px]">
                {playsList.map((play, index) => (
                    <PlayItem
                        play={play}
                        index={index}
                        key={`play-list-${index}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Page;
