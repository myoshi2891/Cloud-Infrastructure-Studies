import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Cloud Infrastructure Studies',
    description: 'Google Cloud 認定試験学習ガイド',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <body>{children}</body>
        </html>
    );
}
