import type { Metadata } from 'next';
import { Noto_Sans_JP, JetBrains_Mono, DM_Sans } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import './globals.css';

const notoSansJP = Noto_Sans_JP({
    subsets: ['latin'],
    weight: ['300', '400', '500', '700', '900'],
    variable: '--font-body',
    display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-mono',
    display: 'swap',
});

const dmSans = DM_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    variable: '--font-display',
    display: 'swap',
});

export const metadata: Metadata = {
    title: {
        default: 'Cloud Infrastructure Studies',
        template: '%s | Cloud Infrastructure Studies',
    },
    description: 'Google Cloud 認定試験学習ガイド',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja" className={`${notoSansJP.variable} ${jetBrainsMono.variable} ${dmSans.variable}`}>
            <body>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
