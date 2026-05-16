import type { Metadata } from 'next';
import { Fraunces, Azeret_Mono } from 'next/font/google';
import './section1.css';
import Section11 from './components/Section11';
import Section11b from './components/Section11b';
import Section11c from './components/Section11c';
import Section12 from './components/Section12';
import Section13 from './components/Section13';
import Section14 from './components/Section14';

const fraunces = Fraunces({
    subsets: ['latin'],
    axes: ['opsz'],
    variable: '--font-fraunces',
    display: 'swap',
});

const azeretMono = Azeret_Mono({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600'],
    variable: '--font-azeret-mono',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Section 1: Gen AI 基礎知識 | Generative AI Leader',
    description:
        'Generative AI Leader 試験 Section 1 完全解説 — AI・ML・生成AIの核心概念、データの本質、Gen AI ランドスケープ、Google基盤モデル',
};

/**
 * Render the Section 1 study page for the Generative AI Leader exam.
 *
 * The page includes a hero header with section summary and badges, a subsection
 * navigation bar, the main content composed of imported subsection components
 * (Section11, Section11b, Section11c, Section12, Section13, Section14), and a
 * footer with references and metadata.
 *
 * @returns The JSX element representing the complete Section 1 page layout.
 */
export default function Section1Page() {
    const fontClasses = `${fraunces.variable} ${azeretMono.variable}`;

    return (
        <div className={`s1-page ${fontClasses}`}>
            {/* HERO */}
            <header className="hero">
                <div className="hero-label">Generative AI Leader 試験対策 — Section 1 深掘り</div>
                <h1>
                    <span className="s1">Gen AI 基礎知識</span>
                    <span className="s2">完全攻略ガイド</span>
                </h1>
                <p className="hero-desc">
                    試験配点 <strong style={{ color: 'var(--aurora3)' }}>~30%</strong> の Section 1 を完全制覇。
                    AI・ML・生成 AI の核心概念からデータの本質・モデル選定基準・Google の基盤モデルまで、
                    初学者でも「なぜそうなるか」まで理解できるよう体系化。
                </p>
                <div className="hero-badge">
                    <div className="pct">~30%</div>
                    <div className="info">
                        <strong>Section 1: Fundamentals of Generative AI</strong>
                        <span>4 subsections · AI 技術の本質的理解が問われる基礎セクション</span>
                    </div>
                </div>
                <div className="ss-row">
                    <div className="ssc ssc-1">1.1 Gen AI 核心概念とユースケース</div>
                    <div className="ssc ssc-2">1.2 データの種類とビジネス的意味</div>
                    <div className="ssc ssc-3">1.3 Gen AI ランドスケープ 5 層</div>
                    <div className="ssc ssc-4">1.4 Google 基盤モデル 完全解説</div>
                </div>
            </header>

            {/* NAV */}
            <nav className="snav">
                <a href="#s11" className="na na-a"><span className="nch nca">1.1</span>核心概念・用語</a>
                <a href="#s11b" className="na na-a"><span className="nch nca">1.1+</span>ML アプローチ</a>
                <a href="#s11c" className="na na-a"><span className="nch nca">1.1+</span>ML ライフサイクル</a>
                <a href="#s12" className="na na-b"><span className="nch ncb">1.2</span>データの種類</a>
                <a href="#s13" className="na na-c"><span className="nch ncc">1.3</span>ランドスケープ</a>
                <a href="#s14" className="na na-d"><span className="nch ncd">1.4</span>基盤モデル</a>
            </nav>

            {/* MAIN */}
            <main className="wrap">
                <Section11 />
                <div className="sdiv" />
                <Section11b />
                <div className="sdiv" />
                <Section11c />
                <div className="sdiv" />
                <Section12 />
                <div className="sdiv" />
                <Section13 />
                <div className="sdiv" />
                <Section14 />
            </main>

            {/* FOOTER */}
            <footer>
                <strong>Google Cloud Generative AI Leader — Section 1 基礎知識 完全解説ガイド</strong>
                <br /><br />
                参考：
                <a href="https://cloud.google.com/learn/certification/generative-ai-leader" target="_blank" rel="noopener noreferrer">
                    Google Cloud 公式試験ページ
                </a>
                {' '}｜ 作成日：2026年3月<br /><br />
                <span style={{ fontSize: '11px', opacity: 0.4 }}>
                    ※ 本ガイドは学習目的で作成。最新情報は必ず公式サイトでご確認ください。
                </span>
            </footer>
        </div>
    );
}
