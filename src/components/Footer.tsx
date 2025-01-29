'use client';

import { CiFacebook } from 'react-icons/ci';
import { CiTwitter } from 'react-icons/ci';
import { CiInstagram } from 'react-icons/ci';
import { useEffect, useState } from 'react';
import { getFooter } from '@/lib/sanity';
import type { Footer } from '@/lib/types';
import Link from 'next/link';

const Footer = () => {
    const [footer, setFooter] = useState<Footer>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getFooter()
            .then((response: Footer) => setFooter(response))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <>
            {!isLoading && footer && (
                <div className="flex py-8 px-4 md:px-16 items-center justify-between border-t border-black">
                    <Link className="group" href="/">
                        <img
                            src="/assets/lokaltheatret-logo-black-white.png"
                            alt="Lokaltheatret logo"
                            className="w-[100px]"
                        />
                        <p className="group-hover:underline text-sm">
                            {footer.slogan}
                        </p>
                    </Link>
                    <div className="flex flex-col gap-y-4">
                        <div className="flex flex-row">
                            {footer.facebook && (
                                <a href={footer.facebook} target="_blank">
                                    <CiFacebook />
                                </a>
                            )}
                            {footer.twitter && (
                                <a href={footer.twitter} target="_blank">
                                    <CiTwitter />
                                </a>
                            )}
                            {footer.instagram && (
                                <a href={footer.instagram} target="_blank">
                                    <CiInstagram />
                                </a>
                            )}
                        </div>
                        <div>
                            <p className="m-0 text-sm">Har du noen spørsmål?</p>
                            <p className="m-0 text-sm">Ta kontakt med oss</p>
                            <a
                                className="text-sm hover:underline"
                                href={'mailto:' + footer.contactEmail}
                            >
                                {footer.contactEmail}
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Footer;
