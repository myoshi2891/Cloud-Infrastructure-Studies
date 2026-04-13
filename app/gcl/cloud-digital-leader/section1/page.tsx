import type { Metadata } from 'next';
import { SectionHero, SectionNav } from './components';
import {
    Section0, Section1, Section2, Section3, Section4,
    Section5, Section6, Section7, Section8, Section9,
    Section10, Section11, Section12, Section13, Section14
} from './components/sections';
import { HERO_BADGES, NAV_LINKS } from './constants';

export const metadata: Metadata = {
    title: 'Section 1: デジタルトランスフォーメーションと Google Cloud | Cloud Digital Leader',
    description: 'Cloud Digital Leader 試験 Section 1 完全解説 — デジタルトランスフォーメーションの本質と Google Cloud の強み',
};

export default function Section1Page() {
    return (
        <div className="cdl-page">
            
            <SectionHero
                eyebrow="Cloud Digital Leader · Section 1"
                title={<>デジタルトランスフォーメーションと <span>Google Cloud</span></>}
                subtitle="クラウドの本質的概念・DX の意味・Google Cloud の強みを体系的に理解する"
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
                    <Section5 />
                    <Section6 />
                    <Section7 />
                    <Section8 />
                    <Section9 />
                    <Section10 />
                    <Section11 />
                    <Section12 />
                    <Section13 />
                    <Section14 />
                </main>
            </div>
            
            <footer className="page-footer">
                <p>Cloud Digital Leader 認定試験 Section 1 完全解説 — 2026 Edition</p>
            </footer>
        </div>
    );
}
