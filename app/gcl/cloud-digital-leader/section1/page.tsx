import type { Metadata } from 'next';
import './section1.css';
import { SECTION1_REFERENCES } from './constants';

export const metadata: Metadata = {
    title: 'Section 1: デジタルトランスフォーメーションと Google Cloud | Cloud Digital Leader',
    description: 'Cloud Digital Leader 試験 Section 1 完全解説 — デジタルトランスフォーメーションの本質と Google Cloud の強み',
};

export default function Section1Page() {
    return (
        <div className="s1-page">
            <header className="page-header">
                <h1>Section 1: デジタルトランスフォーメーションと Google Cloud</h1>
                <p>Google Cloud Digital Leader 試験対策</p>
            </header>

            <nav className="snav">
                {/* サブナビゲーション */}
            </nav>

            <main className="page-main">
                {/* コンテンツ */}
            </main>
        </div>
    );
}
