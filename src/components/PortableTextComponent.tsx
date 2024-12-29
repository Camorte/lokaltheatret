import { PortableTextComponents } from '@portabletext/react';
import { SanityAsset } from '@sanity/image-url/lib/types/types';
import { Link } from 'react-router-dom';
import { urlFor } from '../lib/sanity';

const PortableTextComponent: PortableTextComponents = {
    types: {
        image: ({
            value
        }: {
            value: {
                _type: string;
                asset: SanityAsset;
                imageCaption?: string;
                imageAlt: string;
            };
        }) => {
            return (
                <div className="flex justify-center my-14 relative w-full">
                    <div className="relative">
                        <img
                            className="max-w-[250px] md:max-w-[400px]"
                            src={urlFor(value.asset).url() || ''}
                            alt={value.imageAlt}
                        />
                        {value.imageCaption && (
                            <div className="absolute bg-white px-4 bottom-[-20px] right-[-6px] max-w-[200px] md:right-[-12px] md:max-w-[250px] drop-shadow-md">
                                <p className="italic">{value.imageCaption}</p>
                            </div>
                        )}
                    </div>
                </div>
            );
        }
    },
    marks: {
        link: ({ children, value }) => {
            return (
                <Link className="underline" to={value.href}>
                    {children}
                </Link>
            );
        }
    },
    list: {
        bullet: ({ children }) => (
            <ul className="list-disc ml-6 list-inside">{children}</ul>
        )
    },
    block: {
        normal: ({ children }) => <p className="mb-4 mt-0">{children}</p>,
        blockquote: ({ children }) => (
            <div className="ml-8 border-l-2 border-gray-400 pl-4 mb-4">
                <p className="italic m-0">{children}</p>
            </div>
        )
    }
};

export default PortableTextComponent;
