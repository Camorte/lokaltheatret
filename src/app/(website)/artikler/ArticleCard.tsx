import Link from 'next/link';
import { FaArrowRightLong } from 'react-icons/fa6';

import SanityImage from '@/components/SanityImage';
import { ArticleListItem } from '@/lib/types';

type Props = {
  article: ArticleListItem;
};

const ArticleCard = ({ article }: Props) => {
  const publishedDate = new Date(article._createdAt).toLocaleDateString('nb', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link
      href={`/artikler/${article.slug}`}
      className="group flex w-full max-w-[500px] cursor-pointer flex-col overflow-hidden transition-opacity hover:opacity-90"
      style={{ backgroundColor: article.backgroundColor, color: article.textColor }}
    >
      {article.bannerImg?.image && (
        <div className="aspect-4/3 w-full overflow-hidden">
          <SanityImage
            className="h-full w-full object-cover"
            src={article.bannerImg.image}
            alt={article.bannerImg.altText}
            width={500}
            height={375}
            lqip={article.bannerImg.lqip}
            loading="lazy"
            quality={70}
          />
        </div>
      )}
      <div className="flex flex-col p-6">
        <h2 className="text-xl font-bold md:text-2xl">{article.title}</h2>
        <p className="mt-2 text-sm">
          {article.author} &middot; {publishedDate}
        </p>
        <p className="mt-4 line-clamp-3">{article.ingress}</p>
        <FaArrowRightLong className="mt-4 self-end transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
};

export default ArticleCard;
