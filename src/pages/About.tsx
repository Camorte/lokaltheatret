import { useEffect, useState } from 'react';
import { getAboutPage, urlFor } from '../lib/sanity';
import { AboutPage } from '../lib/types';
import { PortableText } from '@portabletext/react';
import PortableTextComponent from '../components/PortableTextComponent';

const About = () => {
    const [aboutPage, setAboutPage] = useState<AboutPage>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAboutPage()
            .then((response: AboutPage) => {
                setAboutPage(response);
            })
            .finally(() => setIsLoading(false));
    }, []);

    // About page
    // banner image
    // title
    // content

    return (
        <main className="flex flex-col justify-center items-center mb-16">
            {!isLoading && aboutPage && (
                <>
                    <div className="relative">
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
                        <div className="relative w-full h-full max-h-[80vh] object-cover">
                            {aboutPage.aboutPageBannerImg && (
                                <img
                                    src={urlFor(
                                        aboutPage.aboutPageBannerImg
                                    ).url()}
                                    alt={aboutPage.aboutPageBannerImg.altText}
                                />
                            )}
                        </div>
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
                                                    <img
                                                        className="rounded-full"
                                                        src={urlFor(
                                                            founder.image
                                                        ).url()}
                                                        alt={
                                                            founder.image
                                                                .altText
                                                        }
                                                        width={'200px'}
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
            )}
        </main>
    );
};

export default About;
