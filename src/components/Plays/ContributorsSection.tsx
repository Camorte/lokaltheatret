import { Contributor, Contributors } from '../../lib/types.ts';
import { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { IoIosArrowForward } from 'react-icons/io';
import { urlFor } from '../../lib/sanity.ts';

const ContributorList = ({
    title,
    contributorList
}: {
    title?: string;
    contributorList: Contributor[] | undefined;
}) => {
    return (
        <>
            {contributorList && contributorList.length > 0 && (
                <div>
                    {title && (
                        <h2 className="text-2xl md:text-4xl m-0">{title}</h2>
                    )}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 w-full border-t border-black pt-4">
                        {contributorList.map((contributor, index) => (
                            <div key={`contributor-${title}-${index}`}>
                                {contributor.image && (
                                    <img
                                        className="w-[200px] max-h-[300px] object-cover"
                                        src={urlFor(contributor.image)
                                            .width(400)
                                            .url()}
                                        alt={contributor.altText}
                                    />
                                )}
                                <p className="font-bold text-lg m-0">
                                    {contributor.role}
                                </p>
                                {contributor.names &&
                                    contributor.names.map((name, index) => (
                                        <p
                                            key={`contributor-name-${title}-${index}`}
                                            className="m-0"
                                        >
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
    contributors
}: {
    contributors: Contributors;
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div
                className={`flex flex-col border border-black p-8 overflow-hidden ${isOpen ? 'w-full' : 'w-fit'}`}
            >
                {isOpen ? (
                    <div className="flex flex-row items-center justify-between">
                        <h2 className="text-2xl md:text-4xl m-0">
                            MEDVIRKENDE
                        </h2>
                        <button
                            className="p-2"
                            onClick={() => setIsOpen(false)}
                        >
                            <RxCross2 />
                        </button>
                    </div>
                ) : (
                    <button
                        className="text-2xl md:text-4xl flex flex-row items-center w-fit"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <p className="text-2xl md:text-4xl font-bold">
                            MEDVIRKENDE
                        </p>
                        <IoIosArrowForward />
                    </button>
                )}
                <div
                    className={`flex flex-col gap-y-8 md:gap-y-16 transition-height-width-opacity-display ease-in-out delay-200 ${isOpen ? 'w-full h-full opacity-1' : 'w-0 h-0 opacity-0'}`}
                >
                    <ContributorList contributorList={contributors.actors} />
                    <ContributorList
                        title="KUNSTNERISK LAG"
                        contributorList={contributors.artisticTeam}
                    />
                    <ContributorList
                        title="PRODUKSJONSLAG"
                        contributorList={contributors.productionTeam}
                    />
                </div>
            </div>
        </>
    );
};

export default ContributorsSection;
