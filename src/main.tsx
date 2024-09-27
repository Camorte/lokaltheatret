import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage.tsx';
import Home from './pages/Home.tsx';
import Plays from './pages/Plays.tsx';
import About from './pages/About.tsx';
import Join from './pages/Join.tsx';
import Layout from './components/Layout.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            { path: '', element: <Home /> },
            { path: '/forestillinger', element: <Plays /> },
            { path: '/om-oss', element: <About /> },
            { path: '/bli-med', element: <Join /> }
        ]
    }
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
