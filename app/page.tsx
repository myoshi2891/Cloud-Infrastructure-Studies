import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';
import { EXAMS, STATS, type Exam, type Stat, type ColorKey, type Provider } from './constants';
import { ProviderMark } from '@/components/ProviderMark';

export const metadata: Metadata = {
    title: 'Cloud Infrastructure Studies | ホーム',
    description:
        'Google Cloud、AWS、Ciscoの認定試験を横断して学べる日本語学習ガイド。クラウド、ネットワーク、自動化の体系的な試験対策コンテンツを提供します。',
};

const cardColorMap: Record<ColorKey, string> = {
    'card-ace': `card-ace ${styles.cardAce}`,
    'card-genai': `card-genai ${styles.cardGenai}`,
    'card-cdl': `card-cdl ${styles.cardCdl}`,
    'card-agwa': `card-agwa ${styles.cardAgwa}`,
    'card-pcne': `card-pcne ${styles.cardPcne}`,
    'card-ccna': `card-ccna ${styles.cardCisco}`,
    'card-aws-saa': `card-aws-saa ${styles.cardAws}`,
};

const providerMeta: Record<Provider, { label: string; kicker: string; description: string }> = {
    GCP: {
        label: 'Google Cloud',
        kicker: 'Cloud & AI',
        description: 'クラウド基盤、生成AI、Workspaceまでを体系的に学ぶ',
    },
    AWS: {
        label: 'Amazon Web Services',
        kicker: 'Cloud Architecture',
        description: '可用性・セキュリティ・コストを意識した設計力を磨く',
    },
    Cisco: {
        label: 'Cisco',
        kicker: 'Network & Automation',
        description: 'ネットワーク基礎から設計、自動化、DevNetまでを深掘りする',
    },
};

const providerOrder: Provider[] = ['GCP', 'AWS', 'Cisco'];

/** Counts unique exam and domain guide URLs displayed in the hero summary. */
export function countUniqueGuideUrls(exams: Exam[]) {
    return new Set(exams.flatMap((exam) => [exam.href, ...exam.domains.map((domain) => domain.href)])).size;
}

/** Renders the landing hero and its guide/provider summary for the supplied exams. */
function Hero({ exams }: { exams: Exam[] }) {
    const guideCount = countUniqueGuideUrls(exams);

    return (
        <section className={styles.hero}>
            <div className={styles.heroGrid}>
                <div className={styles.heroCopy}>
                    <p className={styles.eyebrow}>
                        <span aria-hidden /> Multi-vendor learning hub
                    </p>
                    <h1 className={styles.title}>
                        インフラの知識を、
                        <br />
                        <span>確かな実力へ。</span>
                    </h1>
                    <p className={styles.sub}>
                        Google Cloud・AWS・Ciscoを横断。資格取得だけで終わらない、
                        現場につながる日本語学習ガイドを集約しています。
                    </p>
                    <div className={styles.heroActions}>
                        <a href="#catalog" className={styles.primaryAction}>
                            学習ガイドを探す <span aria-hidden>↓</span>
                        </a>
                        <span className={styles.updateNote}>
                            <span aria-hidden>●</span> 継続アップデート中
                        </span>
                    </div>
                </div>

                <div className={styles.heroPanel} aria-label="収録コンテンツ概要">
                    <div className={styles.panelTopline}>
                        <span>LEARNING INDEX</span>
                        <span>2026 / UPDATED</span>
                    </div>
                    <div className={styles.panelNumber}>{guideCount}</div>
                    <p className={styles.panelLabel}>GUIDES &amp; LEARNING PATHS</p>
                    <div className={styles.providerRail}>
                        {providerOrder.map((provider) => {
                            const count = exams.filter((exam) => exam.provider === provider).length;
                            return (
                                <a key={provider} href={`#provider-${provider.toLowerCase()}`}>
                                    <ProviderMark provider={provider} compact />
                                    <span>{providerMeta[provider].label}</span>
                                    <strong>{String(count).padStart(2, '0')}</strong>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className={styles.heroGridLines} aria-hidden />
        </section>
    );
}

/** Renders one exam and its associated study-guide links. */
function ExamCard({ exam }: { exam: Exam }) {
    return (
        <article className={`home-card ${styles.card} ${cardColorMap[exam.color]}`}>
            <div className={styles.cardTopline}>
                <span className={styles.cardIcon} aria-hidden>
                    {exam.icon}
                </span>
                <span className={styles.cardLevel}>{exam.level}</span>
            </div>
            <div className={styles.cardBody}>
                <p className={styles.cardAbbr}>{exam.abbr}</p>
                <h3 className={styles.cardTitle}>{exam.label}</h3>
                <p className={styles.cardDesc}>{exam.description}</p>
                <div className={styles.cardMeta}>
                    <span>{exam.score}</span>
                    <span>{exam.badge}</span>
                </div>
            </div>

            <details className={styles.cardDomains}>
                <summary>
                    <span>学習コンテンツ</span>
                    <span>{exam.domains.length} guides</span>
                </summary>
                <ul className={styles.domainsList}>
                    {exam.domains.map((domain) => (
                        <li key={domain.href + domain.label}>
                            <Link
                                href={domain.href}
                                className={`home-domain-link ${styles.domainLink}`}
                            >
                                <span className={styles.domainName}>{domain.label}</span>
                                <span className={styles.domainPct}>{domain.pct}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </details>

            <Link href={exam.href} className={`home-card-cta ${styles.ctaBtn}`}>
                <span>この試験を学ぶ</span>
                <span aria-hidden>↗</span>
            </Link>
        </article>
    );
}

/** Groups the supplied exams into provider-specific catalog sections. */
function ExamCatalog({ exams }: { exams: Exam[] }) {
    return (
        <section id="catalog" className={styles.catalog}>
            <div className={styles.catalogIntro}>
                <p>Certification catalog</p>
                <h2>学びたい領域から選ぶ</h2>
                <span>ベンダーごとに整理された学習パスから、次の一歩を選択できます。</span>
            </div>

            {providerOrder.map((provider, index) => {
                const providerExams = exams.filter((exam) => exam.provider === provider);
                if (providerExams.length === 0) return null;
                const meta = providerMeta[provider];
                return (
                    <section
                        key={provider}
                        id={`provider-${provider.toLowerCase()}`}
                        className={styles.providerSection}
                        data-provider={provider.toLowerCase()}
                        aria-labelledby={`provider-heading-${provider}`}
                    >
                        <header className={styles.providerHeader}>
                            <span className={styles.providerIndex}>0{index + 1}</span>
                            <ProviderMark provider={provider} />
                            <div className={styles.providerTitle}>
                                <p>{meta.kicker}</p>
                                <h2 id={`provider-heading-${provider}`}>{meta.label}</h2>
                            </div>
                            <p className={styles.providerDescription}>{meta.description}</p>
                            <span className={styles.providerCount}>{providerExams.length} exams</span>
                        </header>
                        <div className={styles.cards}>
                            {providerExams.map((exam) => (
                                <ExamCard key={exam.id} exam={exam} />
                            ))}
                        </div>
                    </section>
                );
            })}
        </section>
    );
}

/** Renders the site-wide statistics supplied for the landing page. */
function Stats({ stats }: { stats: Stat[] }) {
    return (
        <section className={`home-stats-section ${styles.statsSection}`} aria-label="サイト統計">
            <div className={styles.statsHeading}>
                <p>Built for continuous learning</p>
                <h2>学び続けるための、実践的なナレッジベース。</h2>
            </div>
            <div className={styles.statsInner}>
                {stats.map((stat) => (
                    <div key={stat.label} className={styles.stat}>
                        <span className={styles.statValue}>{stat.value}</span>
                        <span className={styles.statLabel}>{stat.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}

/** Composes the public home page from visible exams and site statistics. */
export default function Home() {
    const visibleExams = EXAMS.filter((exam) => exam.status !== 'coming-soon');
    return (
        <main className={styles.page}>
            <Hero exams={visibleExams} />
            <ExamCatalog exams={visibleExams} />
            <Stats stats={STATS} />
        </main>
    );
}
