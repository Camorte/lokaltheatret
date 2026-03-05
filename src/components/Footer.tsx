'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CiFacebook } from 'react-icons/ci';
import { CiTwitter } from 'react-icons/ci';
import { CiInstagram } from 'react-icons/ci';

import { getFooter } from '@/lib/sanity/fetch';
import type { Footer } from '@/lib/types';

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
        <div className="flex items-center justify-between border-t border-black px-4 py-8 md:px-16">
          <Link className="group" href="/">
            <Image
              src="/assets/lokaltheatret-logo-black-white.png"
              alt="Lokaltheatret logo"
              className="h-auto w-[100px]"
              width={100}
              height={100}
            />
            <p className="text-sm group-hover:underline">{footer.slogan}</p>
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
              <a className="text-sm hover:underline" href={'mailto:' + footer.contactEmail}>
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
