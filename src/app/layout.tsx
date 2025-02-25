import { Metadata } from 'next';
import './global.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

const title = 'Lokaltheatret';
const description = 'Teater i hjerte av Oslo';
const url = 'https://www.lokaltheatret.no';
const image = 'https://www.lokaltheatret.no/assets/favicon.png';

export const metadata: Metadata = {
    title: title,
    description: description,
    keywords: ['teater', 'Oslo', 'Lokaltheatret'],
    openGraph: {
        type: 'website',
        url: url,
        title: title,
        description: description,
        images: [
            {
                url: image,
                alt: title
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: title,
        description: description,
        images: [
            {
                url: image,
                alt: title
            }
        ]
    }
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="nb">
            <body>
                <div id="root">
                    <Header />
                    {children}
                    <Footer />
                </div>

                <script
                    async
                    defer
                    src="https://scripts.simpleanalyticscdn.com/latest.js"
                ></script>
                <noscript>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="https://queue.simpleanalyticscdn.com/noscript.gif"
                        alt=""
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </noscript>
            </body>
        </html>
    );
};

export default RootLayout;
