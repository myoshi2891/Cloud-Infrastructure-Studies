import type { Metadata } from 'next';
import { SectionHero, SectionNav } from './components';
import { Section0, Section1, Section2, Section3 } from './components/sections';
import { HERO_BADGES, NAV_LINKS } from './constants';

export const metadata: Metadata = {
    title: 'Section 3: AI によるイノベーション 完全攻略ガイド | Cloud Digital Leader',
    description: 'Cloud Digital Leader 試験 Section 3 完全解説 — Innovating with Google Cloud Artificial Intelligence',
};

/**
 * Renders the Section 3 page for the Cloud Digital Leader guide.
 *
 * @returns A JSX element representing the complete Section 3 page layout
 */
export default function Section3Page() {
    return (
        <div className="cdl-page">
            
            <SectionHero
                eyebrow="Cloud Digital Leader · Section 3"
                title={<>Innovating with Google Cloud <br/><span className="highlight">Artificial Intelligence</span></>}
                subtitle="Cloud Digital Leader（CDL）試験 Section 3 の完全攻略ガイド。AI/ML の基礎から Google Cloud のサービス選定まで、初学者でもわかりやすく解説します。"
                badges={HERO_BADGES}
            />

            <SectionNav links={NAV_LINKS} />

            <div className="wrapper">
                <main className="page-main sgap">
                    <Section0 />
                    <Section1 />
                    <Section2 />
                    <Section3 />
                </main>
            </div>
            
            <footer className="page-footer">
                <p>Cloud Digital Leader 認定試験 Section 3 完全攻略ガイド — 2026 Edition</p>
            </footer>
        </div>
    );
}
