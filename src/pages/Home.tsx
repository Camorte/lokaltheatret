import Layout from '../components/Layout.tsx';
import { useEffect, useState } from 'react';
import { getMainBanner, urlFor } from '../lib/sanity.ts';
import { MainBanner } from '../lib/types.ts';

const Home = () => {
    const [mainBanner, setMainBanner] = useState<MainBanner>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getMainBanner()
            .then((response: MainBanner) => {
                setMainBanner(response);
            })
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <Layout>
            {!isLoading && mainBanner && (
                <div className="relative group hover:cursor-pointer">
                    <div className="absolute z-[4] shadow-inner-lg h-full w-full" />
                    <div className="bg-black absolute h-full w-full z-0 opacity-0 group-hover:opacity-100 " />
                    <img
                        className="w-full object-cover h-[50vh] md:h-full max-h-[70vh] group-hover:opacity-[0.8]"
                        src={urlFor(mainBanner.image).url()}
                        alt={mainBanner.caption}
                    />
                    <img
                        className="absolute bottom-10 right-0 max-w-[250px] md:max-w-[500px] ease-in duration-300 group-hover:scale-110"
                        src={urlFor(mainBanner.logo).url()}
                        alt={mainBanner.logoCaption}
                    />
                </div>
            )}
        </Layout>
    );
};

export default Home;
