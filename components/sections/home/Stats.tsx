import type { Stat } from '@/app/constants';
import styles from '@/app/page.module.css';

/** Renders the site-wide statistics supplied for the landing page. */
export function Stats({ stats }: { stats: Stat[] }) {
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
