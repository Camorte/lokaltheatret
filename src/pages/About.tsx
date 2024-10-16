import { useEffect, useState } from 'react';
import { getAboutPage } from '../lib/sanity';
import { AboutPage } from '../lib/types';
import { PortableText } from '@portabletext/react';
import PortableTextComponent from '../components/PortableTextComponent';

const About = () => {
    const [aboutPage, setAboutPage] = useState<AboutPage>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAboutPage()
            .then((response: AboutPage) => {
                console.log(response);
                setAboutPage(response);
            })
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <main className="flex flex-col justify-center items-center my-16">
            {!isLoading && aboutPage && (
                <>
                    <h1>{aboutPage.title}</h1>
                    <div className="mx-0 my-auto w-3/4">
                        <PortableText
                            value={aboutPage.content}
                            components={PortableTextComponent}
                        />
                    </div>
                </>
            )}
        </main>
    );
};

export default About;
