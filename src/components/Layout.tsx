import { ReactNode } from 'react';
import Header from './Header.tsx';
import Footer from './Footer.tsx';
import { Outlet } from 'react-router-dom';

const Layout = ({ children }: { children?: ReactNode }) => {
    return (
        <div>
            <Header />
            {children ?? <Outlet />}
            <Footer />
        </div>
    );
};

export default Layout;
