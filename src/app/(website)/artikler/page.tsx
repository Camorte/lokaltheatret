import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getArticles } from '@/lib/sanity/fetch';
import { ArticleListItem } from '@/lib/types';

import ArticleCard from './ArticleCard';

export const metadata: Metadata = {
  title: 'Artikler | Lokaltheatret',
  description: 'Oversikt over alle artikler fra Lokaltheatret',
};

const Page = async () => {
  const articles: ArticleListItem[] = await getArticles();

  if (!articles) {
    return notFound();
  }

  if (articles.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-6 px-4 py-24">
        <Image
          src="/assets/lokaltheatret-logo-black-white.png"
          alt="Lokaltheatret logo"
          className="h-auto w-[120px] opacity-60"
          width={120}
          height={120}
        />
        <p className="max-w-md text-center text-lg text-gray-500">
          Ser ut som denne siden er tomt akkurat nå! Kom tilbake igjen en annen gang.
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center px-4 py-8 md:px-8">
      <div className="grid w-full max-w-[1500px] grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <ArticleCard article={article} key={`article-card-${index}`} />
        ))}
      </div>
    </div>
  );
};

export default Page;
