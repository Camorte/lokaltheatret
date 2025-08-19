import { getAboutPage } from '@/lib/sanity/fetch';
import { AboutPage } from '@/lib/types';
import { PortableText } from '@portabletext/react';
import PortableTextComponent from '@/components/PortableTextComponent';
import SanityImage from '@/components/SanityImage';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Om oss | Lokaltheatret',
    description: 'Her finner du informasjon om oss i Lokaltheatret.'
};

const Page = async () => {
    const aboutPage: AboutPage = await getAboutPage();

    if (!aboutPage) {
        return notFound();
    }

    return (
        <main className="flex flex-col justify-center items-center mb-16">
            <>
                <div className="relative w-full h-1/6">
                    <div
                        className="absolute w-fit p-2 z-[2] top-[50%] left-[32px] md:left-[10vw] md:p-8"
                        style={{
                            backgroundColor: aboutPage.bannerColor
                        }}
                    >
                        <h1 className="font-bold text-2xl max-w-[200px] md:text-4xl md:max-w-[300px]">
                            {aboutPage.title}
                        </h1>
                    </div>
                    {aboutPage.aboutPageBannerImg && (
                        <SanityImage
                            src={aboutPage.aboutPageBannerImg.image}
                            alt={aboutPage.aboutPageBannerImg.altText}
                            className="relative w-full h-full"
                            width={aboutPage.aboutPageBannerImg.width}
                            height={aboutPage.aboutPageBannerImg.height}
                            lqip={aboutPage.aboutPageBannerImg.lqip}
                            priority
                        />
                    )}
                </div>

                <div className="w-3/4">
                    <div className="mx-0 my-auto mt-16">
                        <PortableText
                            value={aboutPage.content}
                            components={PortableTextComponent}
                        />
                    </div>

                    <div className="grid grid-flow-row md:grid-flow-col md:grid-cols-2 lg:grid-cols-3 gap-8 ">
                        <div className="lg:col-span-2">
                            <h2>Våre grunnleggere</h2>
                            <PortableText
                                value={aboutPage.foundersContent}
                                components={PortableTextComponent}
                            />
                        </div>
                        <div
                            className="grid p-2 items-center"
                            style={{
                                backgroundColor: aboutPage.bannerColor
                            }}
                        >
                            {aboutPage.foundersList?.map((founder, i) => {
                                return (
                                    <div
                                        className="p-4 relative h-full flex items-center"
                                        key={i}
                                    >
                                        <div className="">
                                            {founder.image && (
                                                <SanityImage
                                                    className="rounded-full"
                                                    src={founder.image.image}
                                                    alt={
                                                        'Bilde av ' +
                                                        founder.name
                                                    }
                                                    width={founder.image.width}
                                                    height={
                                                        founder.image.height
                                                    }
                                                    lqip={founder.image.lqip}
                                                />
                                            )}
                                        </div>
                                        <div className="p-2 rounded-md bg-white absolute bottom-0 right-1 w-2/3">
                                            <p className="text-sm font-bold">
                                                {founder.name}
                                            </p>
                                            <p className="text-sm">
                                                {founder.role}
                                            </p>
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
