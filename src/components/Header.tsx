'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { RxHamburgerMenu } from 'react-icons/rx';

const NavLinks = [
  { name: 'Forestillinger', path: '/forestillinger' },
  { name: 'Om oss', path: '/om-oss' },
  { name: 'Bli med!', path: '/bli-med' },
];

const NavbarLinks = ({
  currentRoute,
  setShowMenu,
}: {
  currentRoute: string | null;
  setShowMenu?: (show: boolean) => void;
}) => (
  <>
    {NavLinks.map((nav) => (
      <li className="group block w-fit" key={`navlink-${nav.name}`}>
        <Link
          onClick={() => {
            if (setShowMenu) setShowMenu(false);
          }}
          href={nav.path}
        >
          <p
            className={`px-2 py-2 group-hover:underline md:text-xl ${currentRoute?.includes(nav.path) ? 'underline' : ''}`}
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
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [divRef]);

  return (
    <div className="flex items-center justify-between border-b border-black px-2 py-2 shadow-md md:px-4">
      <Link href={'/'}>
        <Image
          src="/assets/lokaltheatret-black-logo-white-bg.png"
          alt="Lokaltheatret logo"
          className="h-full w-[150px] md:w-[200px]"
          width={200}
          height={200}
          sizes="(max-width: 767px) 150px, 200px"
        />
      </Link>
      <div className="flex items-center">
        <ul className="hidden md:flex md:flex-row md:gap-x-8">
          <NavbarLinks currentRoute={pathname} />
        </ul>
        <button className="mb-0 px-4 md:hidden" onClick={() => setShowMenu(!showMenu)}>
          <RxHamburgerMenu size={35} />
        </button>
      </div>
      {showMenu && (
        <div className="fixed top-0 right-0 z-10 h-full w-full animate-slide-in">
          <div
            ref={divRef}
            className="absolute right-0 flex h-full w-2/3 flex-col bg-white shadow-lg"
          >
            <button className="my-2 mr-4 self-end" onClick={() => setShowMenu(false)}>
              <IoMdClose />
            </button>
            <ul className="flex flex-col items-center pl-4">
              <NavbarLinks setShowMenu={setShowMenu} currentRoute={pathname} />
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
