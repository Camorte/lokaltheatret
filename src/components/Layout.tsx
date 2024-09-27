import { ReactNode } from 'react';
import Header from './Header.tsx';
import Footer from './Footer.tsx';

const Layout = ({ children }: { children?: ReactNode }) => {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default Layout;
