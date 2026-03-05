import { PortableText } from '@portabletext/react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import PortableTextComponent from '@/components/PortableTextComponent';
import SanityImage from '@/components/SanityImage';
import { getAboutPage } from '@/lib/sanity/fetch';
import { AboutPage } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Om oss | Lokaltheatret',
  description: 'Her finner du informasjon om oss i Lokaltheatret.',
};

const Page = async () => {
  const aboutPage: AboutPage = await getAboutPage();

  if (!aboutPage) {
    return notFound();
  }

  return (
    <main className="mb-16 flex flex-col items-center justify-center">
      <>
        <div className="relative h-1/6 w-full">
          <div
            className="left-32px top-50% md:left-10vw absolute z-2 w-fit p-2 md:p-8"
            style={{
              backgroundColor: aboutPage.bannerColor,
            }}
          >
            <h1 className="max-w-[200px] text-2xl font-bold md:max-w-[300px] md:text-4xl">
              {aboutPage.title}
            </h1>
          </div>
          {aboutPage.aboutPageBannerImg && (
            <SanityImage
              src={aboutPage.aboutPageBannerImg.image}
              alt={aboutPage.aboutPageBannerImg.altText}
              className="relative h-full w-full"
              width={aboutPage.aboutPageBannerImg.width}
              height={aboutPage.aboutPageBannerImg.height}
              lqip={aboutPage.aboutPageBannerImg.lqip}
              priority
            />
          )}
        </div>

        <div className="w-3/4">
          <div className="mx-0 my-auto mt-16">
            <PortableText value={aboutPage.content} components={PortableTextComponent()} />
          </div>

          <div className="grid grid-flow-row gap-8 md:grid-flow-col md:grid-cols-2 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2>Våre grunnleggere</h2>
              <PortableText
                value={aboutPage.foundersContent}
                components={PortableTextComponent()}
              />
            </div>
            <div
              className="grid items-center p-2"
              style={{
                backgroundColor: aboutPage.bannerColor,
              }}
            >
              {aboutPage.foundersList?.map((founder, i) => {
                return (
                  <div className="relative flex h-full items-center p-4" key={i}>
                    <div className="">
                      {founder.image && (
                        <SanityImage
                          className="rounded-full"
                          src={founder.image.image}
                          alt={'Bilde av ' + founder.name}
                          width={founder.image.width}
                          height={founder.image.height}
                          lqip={founder.image.lqip}
                        />
                      )}
                    </div>
                    <div className="absolute right-1 bottom-0 w-2/3 rounded-md bg-white p-2">
                      <p className="text-sm font-bold">{founder.name}</p>
                      <p className="text-sm">{founder.role}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    </main>
  );
};

export default Page;
