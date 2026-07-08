import { PortableText } from '@portabletext/react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import PortableTextComponent from '@/components/PortableTextComponent';
import SanityImage from '@/components/SanityImage';
import { urlFor } from '@/lib/sanity/client';
import { getArticle } from '@/lib/sanity/fetch';
import { Article } from '@/lib/types';

import ArticleBackButton from '../ArticleBackButton';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;
  const article: Article = await getArticle(slug);

  if (!article) {
    return {};
  }

  const title = article.title + ' | Lokaltheatret';
  const description = article.ingress;
  const url = 'https://lokaltheatret.no/artikler/' + slug;
  const image = article.bannerImg?.image
    ? urlFor(article.bannerImg.image).width(1200).format('jpg').url()
    : '';
  const alt = article.bannerImg?.altText ?? article.title;

  return {
    title,
    description,
    keywords: ['Lokaltheatret', 'Artikkel', article.title],
    openGraph: {
      type: 'article',
      url,
      title,
      description,
      ...(image && {
        images: [{ url: image, alt, width: 1200, height: 630 }],
      }),
    },
    metadataBase: new URL('https://lokaltheatret.no'),
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(image && {
        images: [{ url: image, alt }],
      }),
    },
  };
}

const Page = ({ params }: Props) => (
  <Suspense fallback={null}>
    <ArticleContent params={params} />
  </Suspense>
);

const ArticleContent = async ({ params }: Props) => {
  const { slug } = await params;
  const article: Article = await getArticle(slug);

  if (!article) {
    return notFound();
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const publishedDate = new Date(article._createdAt).toLocaleDateString('nb', dateOptions);

  const createdDay = new Date(article._createdAt).toDateString();
  const updatedDay = new Date(article._updatedAt).toDateString();
  const wasUpdated = createdDay !== updatedDay;
  const updatedDate = wasUpdated
    ? new Date(article._updatedAt).toLocaleDateString('nb', dateOptions)
    : null;

  return (
    <div className="flex flex-col">
      {article.bannerImg?.image ? (
        <div className="relative h-[300px] w-full md:h-[500px]">
          <ArticleBackButton
            backgroundColor={article.backgroundColor}
            textColor={article.textColor}
          />
          <SanityImage
            src={article.bannerImg.image}
            alt={article.bannerImg.altText}
            className="h-full w-full object-cover"
            width={3000}
            height={3000}
            lqip={article.bannerImg.lqip}
            priority
          />
        </div>
      ) : (
        <div className="relative">
          <ArticleBackButton
            backgroundColor={article.backgroundColor}
            textColor={article.textColor}
          />
        </div>
      )}
      <div className="page-container" style={{ color: article.textColor }}>
        <h1 className="mt-8 text-3xl md:text-5xl">{article.title}</h1>
        <p className="mt-2 text-sm">
          {article.author} &middot; {publishedDate}
          {updatedDate && <> &middot; Oppdatert {updatedDate}</>}
        </p>
        <p className="mt-6 text-lg font-bold leading-relaxed">{article.ingress}</p>
        <div className="mt-8">
          <PortableText
            value={article.content}
            components={PortableTextComponent(article.textColor, article.backgroundColor)}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
