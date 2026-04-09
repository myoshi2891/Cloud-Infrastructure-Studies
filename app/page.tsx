import type { Metadata } from 'next';
import Link from 'next/link';
import './home.css';

export const metadata: Metadata = {
    title: 'Cloud Infrastructure Studies | ホーム',
    description:
        'Google Cloud 認定試験対策の総合学習ガイド。Associate Cloud Engineer、Generative AI Leader、Cloud Digital Leader の試験対策コンテンツを提供します。',
};

const exams = [
    {
        id: 'ace',
        label: 'Associate Cloud Engineer',
        abbr: 'ACE',
        level: 'Associate',
        score: '~100問 / 120分',
        color: 'card-ace',
        accentVar: '--home-ace',
        href: '/gcl/associate-cloud-engineer',
        description:
            'Google Cloud 上でのアプリのデプロイ・管理・監視能力を認定。コンピュート・ストレージ・ネットワーク・IAM など幅広い領域を網羅。',
        domains: [
            { label: 'Domain 1: 環境設定', href: '/gcl/associate-cloud-engineer/domain1', pct: '17.5%' },
            { label: 'Domain 2: 計画と実装', href: '/gcl/associate-cloud-engineer/domain2', pct: '21%' },
            { label: 'Domain 3: 運用管理', href: '/gcl/associate-cloud-engineer/domain3', pct: '22%' },
            { label: 'Domain 4: アクセスとセキュリティ', href: '/gcl/associate-cloud-engineer/domain4', pct: '20%' },
        ],
        badge: '実践向け',
        icon: '⚙️',
    },
    {
        id: 'genai',
        label: 'Generative AI Leader',
        abbr: 'GenAI',
        level: 'Foundational',
        score: '~60問 / 90分',
        color: 'card-genai',
        accentVar: '--home-genai',
        href: '/gcl/genai-leader',
        description:
            'Google Cloud の生成 AI サービスとビジネス戦略を認定。Vertex AI・LLM・RAG・プロンプトエンジニアリングの基礎知識が問われる。',
        domains: [
            { label: 'Section 1: Gen AI 基礎', href: '/gcl/genai-leader/section1', pct: '25%' },
            { label: 'Section 2: Google Cloud Gen AI', href: '/gcl/genai-leader/section2', pct: '30%' },
            { label: 'Section 3: モデル出力改善', href: '/gcl/genai-leader/section3', pct: '25%' },
            { label: 'Section 4: ビジネス戦略', href: '/gcl/genai-leader/section4', pct: '20%' },
        ],
        badge: 'AI特化',
        icon: '✨',
    },
    {
        id: 'cdl',
        label: 'Cloud Digital Leader',
        abbr: 'CDL',
        level: 'Foundational',
        score: '~60問 / 90分',
        color: 'card-cdl',
        accentVar: '--home-cdl',
        href: '/gcl/cloud-digital-leader',
        description:
            'クラウドテクノロジーとビジネス変革の知識を認定。IT 非専門職向けの入門資格で、Google Cloud の主要サービスを幅広くカバー。',
        domains: [
            { label: 'クラウドとデジタル変革', href: '/gcl/cloud-digital-leader', pct: '25%' },
            { label: 'Google Cloud ソリューション', href: '/gcl/cloud-digital-leader', pct: '35%' },
            { label: 'クラウド移行とリスク', href: '/gcl/cloud-digital-leader', pct: '20%' },
            { label: 'ビジネスインパクト', href: '/gcl/cloud-digital-leader', pct: '20%' },
        ],
        badge: '入門向け',
        icon: '🌐',
    },
];

export default function Home() {
    return (
        <main className="home-page">
            {/* Hero */}
            <section className="home-hero">
                <div className="home-hero-inner">
                    <p className="home-eyebrow">Google Cloud 認定試験 学習ガイド</p>
                    <h1 className="home-title">
                        Cloud Infrastructure<br />
                        <span className="home-title-accent">Studies</span>
                    </h1>
                    <p className="home-sub">
                        現場で通用するクラウドエンジニアを目指す方のための<br />
                        体系的な試験対策コンテンツ集
                    </p>
                    <div className="home-hero-badges">
                        <span className="home-hbadge">📚 3試験対応</span>
                        <span className="home-hbadge">🇯🇵 日本語解説</span>
                        <span className="home-hbadge">🔄 定期更新</span>
                    </div>
                </div>
                <div className="home-hero-glow" aria-hidden />
            </section>

            {/* Exam Cards */}
            <section className="home-cards-section">
                <div className="home-cards-inner">
                    <h2 className="home-section-title">対応試験一覧</h2>
                    <div className="home-cards">
                        {exams.map((exam) => (
                            <article key={exam.id} className={`home-card ${exam.color}`}>
                                <div className="home-card-header">
                                    <div className="home-card-top">
                                        <span className="home-card-icon">{exam.icon}</span>
                                        <div className="home-card-labels">
                                            <span className="home-card-level">{exam.level}</span>
                                            <span className="home-card-badge">{exam.badge}</span>
                                        </div>
                                    </div>
                                    <h3 className="home-card-title">{exam.label}</h3>
                                    <p className="home-card-abbr">{exam.abbr}</p>
                                    <p className="home-card-score">🕐 {exam.score}</p>
                                    <p className="home-card-desc">{exam.description}</p>
                                </div>

                                <div className="home-card-domains">
                                    <p className="home-domains-label">学習コンテンツ</p>
                                    <ul className="home-domains-list">
                                        {exam.domains.map((d) => (
                                            <li key={d.href + d.label}>
                                                <Link href={d.href} className="home-domain-link">
                                                    <span className="home-domain-name">{d.label}</span>
                                                    <span className="home-domain-pct">{d.pct}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="home-card-footer">
                                    <Link href={exam.href} className="home-card-cta">
                                        学習を始める →
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats / Info row */}
            <section className="home-stats-section">
                <div className="home-stats-inner">
                    {[
                        { value: '3', label: '対応試験数' },
                        { value: '50+', label: '学習チャプター' },
                        { value: '600+', label: 'コードブロック' },
                        { value: '100%', label: '日本語解説' },
                    ].map((s) => (
                        <div key={s.label} className="home-stat">
                            <span className="home-stat-value">{s.value}</span>
                            <span className="home-stat-label">{s.label}</span>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
