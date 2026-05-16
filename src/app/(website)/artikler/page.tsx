import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getArticles } from '@/lib/sanity/fetch';
import { ArticleListItem } from '@/lib/types';

import ArticleItem from './ArticleItem';

export const metadata: Metadata = {
  title: 'Artikler | Lokaltheatret',
  description: 'Oversikt over alle artikler fra Lokaltheatret',
};

const Page = async () => {
  const articles: ArticleListItem[] = await getArticles();

  if (!articles) {
    return notFound();
  }

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full max-w-[1500px] flex-col gap-y-4">
        {articles.map((article, index) => (
          <ArticleItem article={article} index={index} key={`article-list-${index}`} />
        ))}
      </div>
    </div>
  );
};

export default Page;
