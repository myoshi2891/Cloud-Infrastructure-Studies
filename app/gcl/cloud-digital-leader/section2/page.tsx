import type { Metadata } from 'next';
import { SectionHero, SectionNav } from './components';
import {
    Section1, Section2, Section3, Section4,
    Section5, Section6, Section7, Section8,
    Section9, Section10, Section11, Section12, Section13
} from './components/sections';
import { HERO_BADGES, NAV_LINKS } from './constants';

export const metadata: Metadata = {
    title: 'Section 2: データ トランスフォーメーションの探求 | Cloud Digital Leader',
    description: 'Cloud Digital Leader 試験 Section 2 完全解説 — データの価値とデータパイプライン、分析基盤の構築',
};

/**
 * Renders the Section 2 page for the Cloud Digital Leader guide.
 *
 * Composes the page layout including the hero banner with badges, intra-page navigation, the ordered Section1–Section13 content blocks, and a footer.
 *
 * @returns A JSX element representing the complete Section 2 page layout
 */
export default function Section2Page() {
    return (
        <div className="cdl-page">
            
            <SectionHero
                eyebrow="Cloud Digital Leader · Section 2"
                title={<>データ トランスフォーメーションの<span>探求</span></>}
                subtitle="データのビジネス価値、ストレージとデータベースの選択、分析とガバナンス"
                badges={HERO_BADGES}
            />

            <SectionNav links={NAV_LINKS} />

            <div className="wrapper">
                <main className="page-main sgap">
                    <Section1 />
                    <Section2 />
                    <Section3 />
                    <Section4 />
                    <Section5 />
                    <Section6 />
                    <Section7 />
                    <Section8 />
                    <Section9 />
                    <Section10 />
                    <Section11 />
                    <Section12 />
                    <Section13 />
                </main>
            </div>
            
            <footer className="page-footer">
                <p>Cloud Digital Leader 認定試験 Section 2 完全解説 — 2026 Edition</p>
            </footer>
        </div>
    );
}
