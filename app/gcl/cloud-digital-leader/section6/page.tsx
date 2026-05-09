import { HERO_BADGES, NAV_LINKS } from './constants';
import styles from './section6.module.css';
import { Section1 } from './components/Section1';
import { Section2 } from './components/Section2';
import { Section3 } from './components/Section3';
import { Section4 } from './components/Section4';

/**
 * Renders the "Section 6: Scaling with Google Cloud Operations" page layout,
 * including a hero header, a sticky in-page navigation bar, and the section content blocks.
 *
 * @returns A JSX element representing the complete Section 6 page layout
 */
export default function Section6Page() {
    return (
        <div className="cdl-page">
            <main className={styles.section6Main}>
                {/* HERO */}
                <div className={styles.hero}>
                    <div className={styles.heroBadge}>Cloud Digital Leader — 試験対策ガイド</div>
                    <h1 className={styles.heroTitle}>
                        Section 6<br />
                        <span className={styles.heroAccent}>Scaling with Google<br />Cloud Operations</span>
                    </h1>
                    <p className={styles.heroDesc}>
                        財務ガバナンス・SRE・モニタリング・ロギング・信頼性・サステナビリティを網羅した初学者向け完全解説
                    </p>
                    <div className={styles.heroTags}>
                        {HERO_BADGES.map((badge) => (
                            <span key={badge.label} className={styles.heroTag}>
                                {badge.label}
                            </span>
                        ))}
                    </div>
                </div>

                {/* NAV */}
                <nav aria-label="Quick navigation" className={styles.navSticky}>
                    <span className={styles.navLabel}>§6 Operations</span>
                    {NAV_LINKS.map((link) => (
                        <a key={link.id} href={`#${link.id}`}>
                            {link.num} {link.label}
                        </a>
                    ))}
                </nav>

                {/* SECTIONS */}
                <Section1 />
                <Section2 />
                <Section3 />
                <Section4 />
            </main>
        </div>
    );
}
