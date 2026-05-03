import { Section0 } from './components/sections/Section0';
import { Section1 } from './components/sections/Section1';
import { Section2 } from './components/sections/Section2';
import { Section3 } from './components/sections/Section3';
import { Section4 } from './components/sections/Section4';

/**
 * Renders the "§5 Security" page layout, including a hero header, a sticky in-page navigation bar, and the section content blocks.
 *
 * @returns A JSX element representing the complete Section 5 Security page layout
 */
export default function Section5Page() {
    return (
        <main style={{ background: 'var(--color-bg-primary, #fff)', color: 'var(--color-text-primary, #1a1a1a)', minHeight: '100vh', paddingBottom: '4rem' }}>
            {/* HERO */}
            <div style={{ textAlign: 'center', padding: '6rem 2rem 4rem', backgroundColor: 'var(--color-bg-tertiary, #ede9e0)' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                    <span style={{ color: 'var(--color-accent-terracotta, #c4593a)' }}>Trust &</span> Security<br />with Google Cloud
                </h1>
                <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary, #4a4541)', maxWidth: '600px', margin: '0 auto' }}>
                    責任共有モデル・ゼロトラスト・IAM・暗号化・ネットワークセキュリティ・コンプライアンス・データプライバシーまで、セキュリティの全体像を初学者向けに詳解します。
                </p>
            </div>

            {/* NAV */}
            <nav aria-label="セクションナビゲーション" style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(8px)', borderBottom: '1px solid var(--color-border-light, #e0dbd2)', padding: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <span style={{ fontWeight: 'bold', color: 'var(--color-accent-terracotta, #c4593a)' }}>§5 Security</span>
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
