import Link from 'next/link';
import type { Exam } from '@/app/constants';
import styles from '@/app/page.module.css';
import { cardColorMap } from './config';

/** Renders one exam and its associated study-guide links. */
export function ExamCard({ exam }: { exam: Exam }) {
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
