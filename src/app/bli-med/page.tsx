import { getJoinPage } from '@/lib/sanity';
import { JoinPage } from '@/lib/types';
import { PortableText } from '@portabletext/react';
import PortableTextComponent from '@/components/PortableTextComponent';
import SanityImage from '@/components/SanityImage';
import Form from './form';

const Page = async () => {
    const joinPage: JoinPage = await getJoinPage();

    return (
        <main className="flex flex-col justify-center items-center mb-16">
            <>
                <div className="relative w-full h-1/6">
                    <div
                        className="absolute w-fit p-2 z-[2] top-[50%] left-[32px] md:left-[10vw] md:p-8"
                        style={{
                            backgroundColor: joinPage.bannerColor
                        }}
                    >
                        <h1 className="font-bold text-2xl max-w-[200px] md:text-4xl md:max-w-[300px]">
                            {joinPage.title}
                        </h1>
                    </div>
                    {joinPage.joinPageBannerImg && (
                        <SanityImage
                            className="relative w-full h-full"
                            src={joinPage.joinPageBannerImg.image}
                            alt={joinPage.joinPageBannerImg.altText}
                            width={800}
                            height={800}
                            priority
                        />
                    )}
                </div>

                <section className="w-4/5 md:w-2/4 mt-16">
                    <PortableText
                        value={joinPage.content}
                        components={PortableTextComponent}
                    />

                    <Form />
                </section>
            </>
        </main>
    );
};

export default Page;
