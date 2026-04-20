'use client';

import { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';

import { Contributor, Contributors } from '@/lib/types';

import SanityImage from '../SanityImage';

const ContributorList = ({
  title,
  contributorList,
}: {
  title?: string;
  contributorList: Contributor[] | undefined;
}) => {
  return (
    <>
      {contributorList && contributorList.length > 0 && (
        <div>
          {title && <h2 className="m-0 text-2xl md:text-4xl">{title}</h2>}
          <div className="grid w-full grid-cols-1 gap-4 border-t border-black pt-4 md:grid-cols-3">
            {contributorList.map((contributor, index) => (
              <div key={`contributor-${title}-${index}`}>
                {contributor.image && (
                  <SanityImage
                    className="max-h-[300px] w-[200px] object-cover"
                    src={contributor.image}
                    alt={contributor.altText || ''}
                    width={400}
                    height={400}
                  />
                )}
                <p className="m-0 text-lg font-bold">{contributor.role}</p>
                {contributor.names &&
                  contributor.names.map((name, index) => (
                    <p key={`contributor-name-${title}-${index}`} className="m-0">
                      {name}
                    </p>
                  ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const ContributorsSection = ({
  contributors,
  buttonBgColor,
  buttonTextColor,
}: {
  contributors: Contributors;
  buttonBgColor?: string;
  buttonTextColor?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!contributors.actors && !contributors.artisticTeam && !contributors.productionTeam) {
    return null;
  }

  return (
    <>
      <div
        className={`flex flex-col ${buttonBgColor ? '' : 'border border-black'} overflow-hidden p-8 ${isOpen ? 'w-full' : 'w-fit'}`}
        style={{
          color: buttonTextColor ? buttonTextColor : 'black',
          backgroundColor: buttonBgColor ? buttonBgColor : 'white',
        }}
      >
        {isOpen ? (
          <div className="flex flex-row items-center justify-between">
            <h2 className="m-0 text-2xl md:text-4xl">MEDVIRKENDE</h2>
            <button className="p-2" onClick={() => setIsOpen(false)}>
              <RxCross2 />
            </button>
          </div>
        ) : (
          <button
            className="flex w-fit flex-row items-center text-2xl md:text-4xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            <p className="text-2xl font-bold md:text-4xl">MEDVIRKENDE</p>
            <IoIosArrowForward />
          </button>
        )}
        <div
          className={`flex flex-col gap-y-8 transition-height-width-opacity-display delay-200 ease-in-out md:gap-y-16 ${isOpen ? 'h-full w-full opacity-100' : 'h-0 w-0 opacity-0'}`}
        >
          <ContributorList contributorList={contributors.actors} />
          <ContributorList title="KUNSTNERISK LAG" contributorList={contributors.artisticTeam} />
          <ContributorList title="PRODUKSJONSLAG" contributorList={contributors.productionTeam} />
        </div>
      </div>
    </>
  );
};

export default ContributorsSection;
