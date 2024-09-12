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
                <div className="shadow-inner">
                    <img
                        className="w-full max-h-[50vh] object-cover "
                        src={urlFor(mainBanner.image).url()}
                        alt={mainBanner.caption}
                    />
                </div>
            )}
        </Layout>
    );
};

export default Home;
