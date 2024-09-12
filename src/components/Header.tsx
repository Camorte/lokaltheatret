import { Link, useLocation } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import { IoMdClose } from 'react-icons/io';
import { useEffect, useRef, useState } from 'react';

const NavLinks = [
    { name: 'Forestillinger', path: '/forestillinger' },
    { name: 'Om oss', path: '/om-oss' },
    { name: 'Bli med!', path: '/bli-med' }
];

const NavbarLinks = ({ currentRoute }: { currentRoute: string }) => (
    <>
        {NavLinks.map((nav) => (
            <li className="group w-fit block" key={`navlink-${nav.name}`}>
                <Link to={nav.path}>
                    <p
                        className={`group-hover:border-b-2 group-hover:border-[lightyellow] py-2 px-2 md:text-xl ${currentRoute.includes(nav.path) ? 'border-b-2 border-[#D2B069]' : ''}`}
                    >
                        {nav.name}
                    </p>
                </Link>
            </li>
        ))}
    </>
);

const Header = () => {
    const location = useLocation();
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
        <div className="flex shadow-md px-2 py-4 md:px-4 items-center border-b border-black justify-between">
            <Link to={'/'}>
                <img
                    src="/assets/lokaltheatret-black-logo-white-bg.png"
                    alt="Lokaltheatret logo"
                    className="w-1/2 md:w-[300px]"
                />
            </Link>
            <div className="flex items-center">
                <ul className="hidden md:flex-row md:gap-x-8 md:flex">
                    <NavbarLinks currentRoute={location.pathname} />
                </ul>
                <button
                    className="mb-0 px-4 md:hidden"
                    onClick={() => setShowMenu(!showMenu)}
                >
                    <RxHamburgerMenu size={35} />
                </button>
            </div>
            {showMenu && (
                <div className="fixed top-0 right-0 w-full h-full animate-slideIn">
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
                            <NavbarLinks currentRoute={location.pathname} />
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
