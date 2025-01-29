'use client';

import { RxHamburgerMenu } from 'react-icons/rx';
import { IoMdClose } from 'react-icons/io';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import router from 'next/router';

const NavLinks = [
    { name: 'Forestillinger', path: '/forestillinger' },
    { name: 'Om oss', path: '/om-oss' },
    { name: 'Bli med!', path: '/bli-med' }
];

const NavbarLinks = ({
    currentRoute,
    setShowMenu
}: {
    currentRoute: string | null;
    setShowMenu?: (show: boolean) => void;
}) => (
    <>
        {NavLinks.map((nav) => (
            <li className="group w-fit block" key={`navlink-${nav.name}`}>
                <Link
                    onClick={() => {
                        if (setShowMenu) setShowMenu(false);
                    }}
                    href={nav.path}
                >
                    <p
                        className={`group-hover:underline py-2 px-2 md:text-xl ${currentRoute?.includes(nav.path) ? 'underline' : ''}`}
                    >
                        {nav.name}
                    </p>
                </Link>
            </li>
        ))}
    </>
);

const Header = () => {
    const pathname = usePathname();
    const [showMenu, setShowMenu] = useState<boolean>(false);

    const divRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // Function to handle click events
        const handleClickOutside = (event: MouseEvent) => {
            if (
                divRef.current &&
                !divRef.current.contains(event.target as Node)
            ) {
                setShowMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [divRef]);

    return (
        <div className="flex shadow-md px-2 py-2 md:px-4 items-center border-b border-black justify-between">
            <Link href={'/'}>
                <img
                    src="/assets/lokaltheatret-black-logo-white-bg.png"
                    alt="Lokaltheatret logo"
                    className="w-[150px] md:w-[200px]"
                />
            </Link>
            <div className="flex items-center">
                <ul className="hidden md:flex-row md:gap-x-8 md:flex">
                    <NavbarLinks currentRoute={pathname} />
                </ul>
                <button
                    className="mb-0 px-4 md:hidden"
                    onClick={() => setShowMenu(!showMenu)}
                >
                    <RxHamburgerMenu size={35} />
                </button>
            </div>
            {showMenu && (
                <div className="fixed top-0 right-0 w-full h-full animate-slideIn z-10">
                    <div
                        ref={divRef}
                        className="absolute flex flex-col w-2/3 h-full bg-white shadow-lg right-0"
                    >
                        <button
                            className="self-end mr-4 my-2"
                            onClick={() => setShowMenu(false)}
                        >
                            <IoMdClose />
                        </button>
                        <ul className="flex flex-col pl-4 items-center  ">
                            <NavbarLinks
                                setShowMenu={setShowMenu}
                                currentRoute={pathname}
                            />
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
