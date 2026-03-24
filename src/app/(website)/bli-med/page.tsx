import { PortableText } from '@portabletext/react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import PortableTextComponent from '@/components/PortableTextComponent';
import SanityImage from '@/components/SanityImage';
import { getJoinPage } from '@/lib/sanity/fetch';
import { JoinPage } from '@/lib/types';

import Form from './form';

export const metadata: Metadata = {
  title: 'Bli med! | Lokaltheatret',
  description:
    'Har du lyst til å bli med i Lokaltheatret? Fyll ut skjemaet på denne siden for å melde din interesse',
};

const Page = async () => {
  const joinPage: JoinPage = await getJoinPage();

  if (!joinPage) {
    return notFound();
  }

  return (
    <main className="mb-16 flex flex-col items-center justify-center">
      <>
        <div className="relative h-1/6 w-full">
          <div
            className="absolute top-[50%] left-[32px] z-[2] w-fit p-2 md:left-[10vw] md:p-8"
            style={{
              backgroundColor: joinPage.bannerColor,
            }}
          >
            <h1 className="max-w-[200px] text-2xl font-bold md:max-w-[300px] md:text-4xl">
              {joinPage.title}
            </h1>
          </div>
          {joinPage.joinPageBannerImg && (
            <SanityImage
              className="relative h-full w-full"
              src={joinPage.joinPageBannerImg.image}
              alt={joinPage.joinPageBannerImg.altText}
              width={joinPage.joinPageBannerImg.width}
              height={joinPage.joinPageBannerImg.height}
              lqip={joinPage.joinPageBannerImg.lqip}
              priority
            />
          )}
        </div>

        <section className="mt-16 w-4/5 md:w-2/4">
          <PortableText value={joinPage.content} components={PortableTextComponent()} />

          <Form />
        </section>
      </>
    </main>
  );
};

export default Page;
