import type { Metadata } from 'next';
import { Sora, IBM_Plex_Mono } from 'next/font/google';
import './section2.css';
import Section21 from './components/Section21';
import Section22 from './components/Section22';
import Section23 from './components/Section23';
import Section24 from './components/Section24';
import Section25 from './components/Section25';
import SummarySection from './components/SummarySection';

const sora = Sora({
    subsets: ['latin'],
    weight: ['300', '400', '600', '700', '800'],
    variable: '--font-sora',
    display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
    subsets: ['latin'],
    weight: ['400', '600'],
    variable: '--font-ibm-plex-mono',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Section 2: Google Cloud の Gen AI サービス | Generative AI Leader',
    description:
        'Generative AI Leader 試験 Section 2 — Google Cloud の Gen AI プロダクト群完全解説。Vertex AI・Gemini Workspace・CES・エージェントツーリング',
};

/**
 * Renders the Section 2 page for the Generative AI Leader guide, composing the hero, top navigation, main content subsections, and footer.
 *
 * The component applies site font variables and arranges page sections: a hero area with title and weight indicator, a navigation bar linking to subsections, the main content that mounts Section21–Section25 and a summary, and a footer with references and notes.
 *
 * @returns The JSX element for the Section 2 page layout
 */
export default function Section2Page() {
    const fontClasses = `${sora.variable} ${ibmPlexMono.variable}`;

    return (
        <div className={`s2-page ${fontClasses}`}>
            {/* HERO */}
            <header className="hero">
                <div className="orb orb-1" />
                <div className="orb orb-2" />
                <div className="orb orb-3" />

                <div className="hero-tag">Generative AI Leader 試験対策 — 深掘りシリーズ</div>
                <h1>
                    <span className="g1">Section 2</span>
                    <span className="g2">Google Cloud の Gen AI サービス完全解説</span>
                </h1>
                <p className="hero-sub">
                    試験最高配点 <strong style={{ color: 'var(--aqua)' }}>~35%</strong> を占める Section 2 を完全攻略。
                    Google Cloud の Gen AI プロダクト群を「なぜ存在するか」「誰が使うか」「どのビジネス価値があるか」の視点で徹底解説。
                </p>

                <div className="s2-weight">
                    <div className="pct">~35%</div>
                    <div className="desc">
                        <strong>Section 2: Google Cloud&apos;s Gen AI Offerings</strong>
                        <span>試験全体の最高配点セクション • 5つのサブセクション構成</span>
                    </div>
                </div>

                <div className="subsec-pills">
                    <div className="sp sp-1">2.1 Google Cloud の強み</div>
                    <div className="sp sp-2">2.2 プリビルト Gen AI サービス</div>
                    <div className="sp sp-3">2.3 顧客体験向上ソリューション</div>
                    <div className="sp sp-4">2.4 開発者向け AI 基盤</div>
                    <div className="sp sp-5">2.5 AI エージェント ツーリング</div>
                </div>
            </header>

            {/* NAV */}
            <nav className="topnav" aria-label="Section 2 サブセクションナビゲーション">
                <a href="#s21" className="n1"><span className="ni">2.1</span>Google Cloud の強み</a>
                <a href="#s22" className="n2"><span className="ni">2.2</span>プリビルト Gen AI</a>
                <a href="#s23" className="n3"><span className="ni">2.3</span>顧客体験 CES</a>
                <a href="#s24" className="n4"><span className="ni">2.4</span>開発者向け Vertex AI</a>
                <a href="#s25" className="n5"><span className="ni">2.5</span>エージェントツール</a>
            </nav>

            {/* MAIN */}
            <main className="wrap">
                <Section21 />
                <hr className="sdiv" />
                <Section22 />
                <hr className="sdiv" />
                <Section23 />
                <hr className="sdiv" />
                <Section24 />
                <hr className="sdiv" />
                <Section25 />
                <hr className="sdiv" />
                <SummarySection />
            </main>

            {/* PAGE FOOTER (contentinfo の重複を避けるため section 要素に変更) */}
            <section className="page-footer" aria-label="ページ末尾の参考情報">
                <strong>Google Cloud Generative AI Leader — Section 2 Gen AI サービス完全解説ガイド</strong>
                <br /><br />
                参考：
                <a href="https://cloud.google.com/learn/certification/generative-ai-leader" target="_blank" rel="noopener noreferrer" aria-label="Google Cloud 公式試験ページ（新しいタブで開く）">
                    Google Cloud 公式試験ページ
                </a>
                {' '}｜ 作成日：2026年3月<br /><br />
                <span style={{ fontSize: '11px', opacity: 0.4 }}>
                    ※ 本ガイドは学習目的で作成。最新情報は必ず公式サイトでご確認ください。
                </span>
            </section>
        </div>
    );
}
