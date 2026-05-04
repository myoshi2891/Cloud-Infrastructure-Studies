import type { Metadata } from 'next';
import { Section0 } from './components/sections/Section0';
import { Section1 } from './components/sections/Section1';
import { Section2 } from './components/sections/Section2';
import { Section3 } from './components/sections/Section3';
import { Section4 } from './components/sections/Section4';
import styles from './section5.module.css';

export const metadata: Metadata = {
    title: 'Section 5: Trust & Security with Google Cloud | Cloud Digital Leader',
    description: 'Cloud Digital Leader 試験 Section 5 完全解説 — Trust and Security with Google Cloud',
};

/**
 * Renders the "§5 Security" page layout, including a hero header, a sticky in-page navigation bar, and the section content blocks.
 *
 * @returns A JSX element representing the complete Section 5 Security page layout
 */
export default function Section5Page() {
    return (
        <main className={styles.section5Main}>
            {/* HERO */}
            <div className={styles.hero}>
                <h1 className={styles.heroTitle}>
                    <span className={styles.heroAccent}>Trust &</span> Security<br />with Google Cloud
                </h1>
                <p className={styles.heroDesc}>
                    責任共有モデル・ゼロトラスト・IAM・暗号化・ネットワークセキュリティ・コンプライアンス・データプライバシーまで、セキュリティの全体像を初学者向けに詳解します。
                </p>
            </div>

            {/* NAV */}
            <nav aria-label="セクションナビゲーション" className={styles.navSticky}>
                <span className={styles.navLabel}>§5 Security</span>
                <a href="#overview">概要</a>
                <a href="#shared">責任共有</a>
                <a href="#zerotrust">ゼロトラスト</a>
                <a href="#iam">IAM</a>
                <a href="#encryption">暗号化</a>
                <a href="#network">ネットワーク</a>
                <a href="#monitoring">監視・検出</a>
                <a href="#compliance">コンプライアンス</a>
                <a href="#dlp">データ保護</a>
                <a href="#checklist">試験対策</a>
            </nav>

            {/* SECTIONS */}
            <Section0 />
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
        </main>
    );
}
