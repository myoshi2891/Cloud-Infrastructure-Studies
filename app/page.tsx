import type { Metadata } from 'next';
import Link from 'next/link';
import './home.css';
import { EXAMS, STATS, type Exam, type Stat } from './constants';

export const metadata: Metadata = {
    title: 'Cloud Infrastructure Studies | ホーム',
    description:
        'Google Cloud 認定試験対策の総合学習ガイド。Associate Cloud Engineer、Generative AI Leader、Cloud Digital Leader の試験対策コンテンツを提供します。',
};

function Hero() {
    return (
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
    );
}

function ExamCards({ exams }: { exams: Exam[] }) {
    return (
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
    );
}

function Stats({ stats }: { stats: Stat[] }) {
    return (
        <section className="home-stats-section">
            <div className="home-stats-inner">
                {stats.map((s) => (
                    <div key={s.label} className="home-stat">
                        <span className="home-stat-value">{s.value}</span>
                        <span className="home-stat-label">{s.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default function Home() {
    return (
        <main className="home-page">
            <Hero />
            <ExamCards exams={EXAMS} />
            <Stats stats={STATS} />
        </main>
    );
}
