import type { Metadata } from 'next';
import './section1.css';
import { SectionHero, SectionNav } from './components';
import {
    Section0, Section1, Section2, Section3, Section4,
    Section5, Section6, Section7, Section8, Section9,
    Section10, Section11, Section12, Section13, Section14
} from './components/sections';

export const metadata: Metadata = {
    title: 'Section 1: デジタルトランスフォーメーションと Google Cloud | Cloud Digital Leader',
    description: 'Cloud Digital Leader 試験 Section 1 完全解説 — デジタルトランスフォーメーションの本質と Google Cloud の強み',
};

const HERO_BADGES = [
    { label: '出題比率 約17%', color: 'blue' as const },
    { label: '最重要セクション', color: 'red' as const },
    { label: 'ビジネス視点の理解', color: 'green' as const },
];

const NAV_LINKS = [
    { id: 's0', num: '00', label: 'ガイド' },
    { id: 's1', num: '01', label: '出題範囲' },
    { id: 's2', num: '02', label: 'DX本質' },
    { id: 's3', num: '03', label: '基礎概念' },
    { id: 's4', num: '04', label: 'モデル' },
    { id: 's5', num: '05', label: 'デプロイ' },
    { id: 's6', num: '06', label: '財務' },
    { id: 's7', num: '07', label: '移行戦略' },
    { id: 's8', num: '08', label: '強み' },
    { id: 's9', num: '09', label: 'インフラ' },
    { id: 's10', num: '10', label: '階層' },
    { id: 's11', num: '11', label: 'DXソリュ' },
    { id: 's12', num: '12', label: 'まとめ' },
    { id: 's13', num: '13', label: 'レポート' },
    { id: 's14', num: '14', label: 'リソース' },
];

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
