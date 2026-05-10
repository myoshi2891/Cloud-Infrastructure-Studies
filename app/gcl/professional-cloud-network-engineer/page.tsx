import { HERO_BADGES, NAV_LINKS } from './constants';
import styles from './pcne.module.css';

/**
 * Renders the "Professional Cloud Network Engineer" page layout,
 * including a hero header, a sticky in-page navigation bar, and the section content blocks.
 *
 * @returns A JSX element representing the complete PCNE page layout
 */
export default function PcnePage() {
    return (
        <div className="pcne-page">
            <main className={styles.pcneMain}>
                {/* HERO */}
                <div className={styles.hero} id="overview">
                    <div className={styles.heroBadge}>Professional Cloud Network Engineer</div>
                    <h1 className={styles.heroTitle}>
                        Professional Cloud<br />
                        <span className={styles.heroAccent}>Network Engineer</span><br />
                        完全試験対策ガイド
                    </h1>
                    <p className={styles.heroDesc}>
                        ネットワーク初学者から中級者まで対応。VPC設計からハイブリッド接続、ロードバランシング、セキュリティ、監視まで、試験に出るすべての技術領域をステップバイステップで解説します。
                    </p>

                    <div className={styles.heroStats}>
                        <span className={styles.heroStat}><span className={styles.heroStatDot}>◆</span> 試験時間: 120分</span>
                        <span className={styles.heroStat}><span className={styles.heroStatDot}>◆</span> 問題数: 50〜60問</span>
                        <span className={styles.heroStat}><span className={styles.heroStatDot}>◆</span> 受験料: $200</span>
                        <span className={styles.heroStat}><span className={styles.heroStatDot}>◆</span> 推奨経験: 3年以上</span>
                        <span className={styles.heroStat}><span className={styles.heroStatDot}>◆</span> 更新: 2年ごと</span>
                    </div>

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
                    <span className={styles.navLabel}>PCNE</span>
                    {NAV_LINKS.map((link) => (
                        <a key={link.id} href={`#${link.id}`}>
                            {link.num} {link.label}
                        </a>
                    ))}
                </nav>

                {/* SECTIONS */}
                {/* Sections will be added here step by step */}
            </main>
        </div>
    );
}
