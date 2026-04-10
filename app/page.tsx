import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';
import { EXAMS, STATS, type Exam, type Stat, type ColorKey } from './constants';

export const metadata: Metadata = {
    title: 'Cloud Infrastructure Studies | ホーム',
    description:
        'Google Cloud 認定試験対策の総合学習ガイド。Associate Cloud Engineer、Generative AI Leader、Cloud Digital Leader の試験対策コンテンツを提供します。',
};

const cardColorMap: Record<ColorKey, string> = {
    'card-ace': `card-ace ${styles.cardAce}`,
    'card-genai': `card-genai ${styles.cardGenai}`,
    'card-cdl': `card-cdl ${styles.cardCdl}`,
};

function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.heroInner}>
                <p className={styles.eyebrow}>
                    Google Cloud 認定試験 学習ガイド
                </p>
                <h1 className={styles.title}>
                    Cloud Infrastructure<br />
                    <span className={styles.titleAccent}>Studies</span>
                </h1>
                <p className={styles.sub}>
                    現場で通用するクラウドエンジニアを目指す方のための<br />
                    体系的な試験対策コンテンツ集
                </p>
                <div className={styles.heroBadges}>
                    <span className={styles.hbadge}>📚 3試験対応</span>
                    <span className={styles.hbadge}>🇯🇵 日本語解説</span>
                    <span className={styles.hbadge}>🔄 定期更新</span>
                </div>
            </div>
            <div className={styles.heroGlow} aria-hidden />
        </section>
    );
}

function ExamCards({ exams }: { exams: Exam[] }) {
    return (
        <section className={styles.cardsSection}>
            <div className={styles.cardsInner}>
                <h2 className={styles.sectionTitle}>対応試験一覧</h2>
                <div className={styles.cards}>
                    {exams.map((exam) => (
                        <article key={exam.id} className={`home-card ${styles.card} ${cardColorMap[exam.color] || ''}`}>
                            <div className={styles.cardHeader}>
                                <div className={styles.cardTop}>
                                    <span className={styles.cardIcon}>{exam.icon}</span>
                                    <div className={styles.cardLabels}>
                                        <span className={styles.cardLevel}>{exam.level}</span>
                                        <span className={styles.cardBadge}>{exam.badge}</span>
                                    </div>
                                </div>
                                <h3 className={styles.cardTitle}>{exam.label}</h3>
                                <p className={styles.cardAbbr}>{exam.abbr}</p>
                                <p className={styles.cardScore}>🕐 {exam.score}</p>
                                <p className={styles.cardDesc}>{exam.description}</p>
                            </div>

                            <div className={styles.cardDomains}>
                                <p className={styles.domainsLabel}>学習コンテンツ</p>
                                <ul className={styles.domainsList}>
                                    {exam.domains.map((d) => (
                                        <li key={d.href + d.label}>
                                            <Link href={d.href} className={`home-domain-link ${styles.domainLink}`}>
                                                <span className={styles.domainName}>{d.label}</span>
                                                <span className={styles.domainPct}>{d.pct}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className={styles.cardFooter}>
                                <Link href={exam.href} className={`home-card-cta ${styles.ctaBtn}`}>
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
        <section className={`home-stats-section ${styles.statsSection}`}>
            <div className={styles.statsInner}>
                {stats.map((s) => (
                    <div key={s.label} className={styles.stat}>
                        <span className={styles.statValue}>{s.value}</span>
                        <span className={styles.statLabel}>{s.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default function Home() {
    return (
        <main className={styles.page}>
            <Hero />
            <ExamCards exams={EXAMS} />
            <Stats stats={STATS} />
        </main>
    );
}
