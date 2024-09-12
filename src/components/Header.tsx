import { RxHamburgerMenu } from 'react-icons/rx';

const Header = () => {
    return (
        <div className="shadow-md px-2 py-4  items-center border-b border-black">
            <div className="md:hidden flex flex-row justify-between">
                <img
                    src="/assets/lokaltheatret-black-logo-white-bg.png"
                    alt="Lokaltheatret logo"
                    className="w-1/2"
                />
                <button className="p-4 mx-2">
                    <RxHamburgerMenu size={40} />
                </button>
            </div>
            <div className="md:flex md:flex-row hidden">
                <img
                    src="/assets/lokaltheatret-black-logo-white-bg.png"
                    alt="Lokaltheatret logo"
                    className="w-[300px]"
                />
            </div>
        </div>
    );
};

export default Header;
