import type { Metadata } from 'next';
// フォントは @fontsource で自己ホストする（ビルド時に Google Fonts へ取得しない）。
// ファミリ名は globals.css の @theme の --font-* トークン側で解決する。
import '@fontsource-variable/noto-sans-jp/index.css';
import '@fontsource-variable/jetbrains-mono/index.css';
import '@fontsource-variable/dm-sans/index.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { DisclaimerBanner } from '@/components/DisclaimerBanner';
import { RecentPageRecorder } from '@/components/RecentPageRecorder';
import './globals.css';

export const metadata: Metadata = {
    title: {
        default: 'Cloud Infrastructure Studies',
        template: '%s | Cloud Infrastructure Studies',
    },
    description: 'Google Cloud 認定試験学習ガイド',
};

/**
 * Root layout component that loads the self-hosted fonts and composes site chrome around page content.
 *
 * This layout renders the document root (<html lang="ja">) and a body containing the Header, DisclaimerBanner, RecentPageRecorder, the provided page `children`, and the Footer.
 *
 * @param children - The page content to render within the layout
 * @returns A React element representing the HTML root with the site's header, banners, content, and footer
 */
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <body>
                <Header />
                <DisclaimerBanner />
                <RecentPageRecorder />
                {children}
                <Footer />
            </body>
        </html>
    );
}
