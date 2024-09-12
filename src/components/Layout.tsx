import { ReactNode } from 'react';
import Header from './Header.tsx';

const Layout = ({ children }: { children?: ReactNode }) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
};

export default Layout;
