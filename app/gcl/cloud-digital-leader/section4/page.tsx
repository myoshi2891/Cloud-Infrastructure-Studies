import type { Metadata } from 'next';
import { SectionHero, SectionNav } from './components';
import { Section0, Section1, Section2, Section3, Section4 } from './components/sections';
import { HERO_BADGES, NAV_LINKS } from './constants';
import styles from './section4.module.css';

export const metadata: Metadata = {
    title: 'Section 4: インフラ＆アプリのモダナイゼーション 完全攻略ガイド | Cloud Digital Leader',
    description: 'Cloud Digital Leader 試験 Section 4 完全解説 — Modernize Infrastructure and Applications with Google Cloud',
};

/**
 * Renders the Section 4 page for the Cloud Digital Leader guide.
 *
 * @returns A JSX element representing the complete Section 4 page layout
 */
export default function Section4Page() {
    return (
        <div className="cdl-page">
            
            <SectionHero
                eyebrow="Cloud Digital Leader · Section 4"
                title={<><em>モダナイゼーション</em>で<br/><span className={styles.section4Highlight}>ビジネスを進化させる</span></>}
                subtitle="Section 4「Modernize Infrastructure and Applications with Google Cloud」の完全攻略ガイド。移行戦略・コンテナ・サーバーレス・DevOps・ハイブリッドクラウドまで初学者向けに詳解します。"
                badges={HERO_BADGES}
            />

            <SectionNav links={NAV_LINKS} />

            <div className="wrapper">
                <main className="page-main sgap">
                    <Section0 />
                    <Section1 />
                    <Section2 />
                    <Section3 />
                    <Section4 />
                </main>
            </div>
            
            <footer className="page-footer">
                <p>Cloud Digital Leader 認定試験 Section 4 完全攻略ガイド — 2026 Edition</p>
            </footer>
        </div>
    );
}
