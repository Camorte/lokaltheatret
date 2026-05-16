'use client';

import Link from 'next/link';
import { useState } from 'react';

import SanityImage from '@/components/SanityImage';
import { ArticleListItem } from '@/lib/types';

type Props = {
  article: ArticleListItem;
  index: number;
};

const ArticleItem = ({ article, index }: Props) => {
  const [hoverIndex, setHoverIndex] = useState<number | undefined>(undefined);

  if (!article) {
    return null;
  }

  const publishedDate = new Date(article.publishedDate).toLocaleDateString('nb', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (!article.bannerImg?.image) {
    return (
      <Link
        href={`/artikler/${article.slug}`}
        className="group flex w-full hover:cursor-pointer"
        style={{ backgroundColor: article.backgroundColor }}
      >
        <div
          className="flex w-full flex-col justify-center p-8 md:p-12"
          style={{ color: article.textColor }}
        >
          <h2 className="m-0 text-2xl md:text-3xl">{article.title}</h2>
          <p className="mt-2 text-sm">
            {article.author} &middot; {publishedDate}
          </p>
          <p className="mt-4 line-clamp-3">{article.ingress}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/artikler/${article.slug}`}
      className={`flex ${index % 2 !== 0 ? 'flex-row-reverse' : 'flex-row'} group h-[400px] w-full hover:cursor-pointer`}
      style={{ backgroundColor: article.backgroundColor }}
      onMouseEnter={() => setHoverIndex(index)}
      onMouseLeave={() => setHoverIndex(undefined)}
    >
      <div
        className={`h-full w-1/2 flex-shrink-0 overflow-hidden md:w-2/3 md:transition-[width] md:duration-300 md:ease-in-out md:group-hover:w-1/2`}
      >
        <SanityImage
          src={article.bannerImg.image}
          alt={article.bannerImg.altText}
          className={`h-full w-full object-cover md:transition-[filter] md:duration-300 md:ease-in-out ${hoverIndex !== index ? 'md:grayscale md:filter' : ''}`}
          width={3000}
          height={3000}
          lqip={article.bannerImg.lqip}
          priority
        />
      </div>
      <div
        className="flex min-w-0 flex-1 flex-col items-center justify-center p-8 md:p-4"
        style={{ color: article.textColor }}
      >
        <h2 className="m-0 text-center text-2xl">{article.title}</h2>
        <p className="mt-2 text-center text-sm">
          {article.author} &middot; {publishedDate}
        </p>
        <p className="mt-4 line-clamp-3 text-center">{article.ingress}</p>
      </div>
    </Link>
  );
};

export default ArticleItem;
