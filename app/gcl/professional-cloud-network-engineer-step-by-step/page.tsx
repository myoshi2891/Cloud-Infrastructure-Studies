import { HERO_BADGES, NAV_LINKS } from './constants';
import styles from './pcne-step.module.css';
import { Section1 } from './components/Section1';
import { Section2 } from './components/Section2';
import { Section3 } from './components/Section3';
import { Section4 } from './components/Section4';
import { Section5 } from './components/Section5';

/**
 * Renders the "Professional Cloud Network Engineer" Step-by-Step guide layout,
 * including a hero header, a sticky in-page navigation bar, and the section content blocks.
 *
 * @returns A JSX element representing the complete PCNE step-by-step page layout
 */
export default function PcneStepByStepPage() {
    return (
        <div className="pcne-step-page">
            <main className={styles.pcneMain}>
                {/* HERO */}
                <div className={styles.hero} id="hero-overview">
                    <div className={styles.heroBadge}>Certification Exam Guide</div>
                    <h1 className={styles.heroTitle}>
                        Google Cloud<br />
                        <span className={styles.heroAccent}>PCNE</span><br />
                        完全攻略ガイド
                    </h1>
                    <p className={styles.heroDesc}>
                        Professional Cloud Network Engineer 認定試験の全出題範囲を、初学者でもわかるようにステップバイステップで解説。各項目の技術的背景、ベストプラクティス、および参照URLを完全網羅。
                    </p>

                    <div className={styles.heroStats}>
                        <span className={styles.heroStat}><span className={styles.heroStatDot}>◆</span> 出題セクション: 6</span>
                        <span className={styles.heroStat}><span className={styles.heroStatDot}>◆</span> 試験問題数: 50〜60</span>
                        <span className={styles.heroStat}><span className={styles.heroStatDot}>◆</span> 試験時間: 2h</span>
                        <span className={styles.heroStat}><span className={styles.heroStatDot}>◆</span> 受験料: $200</span>
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
                <Section1 />
                <Section2 />
                <Section3 />
                <Section4 />
                <Section5 />
                {/* <Section6 /> */}
            </main>
        </div>
    );
}
