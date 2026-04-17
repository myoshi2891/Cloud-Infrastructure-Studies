import React from 'react';
import { HeroBadge } from '../constants';
import styles from './SectionHero.module.css';

/**
 * セクションヒーローコンポーネント
 * 
 * ページ上部でタイトル、サブタイトル、バッジなどを表示します。
 * 
 * @param eyebrow - タイトル上の小さなラベル
 * @param title - メインタイトル
 * @param subtitle - サブタイトル
 * @param badges - 表示するバッジの配列
 * @returns ヒーローセクションのReact要素
 */
interface SectionHeroProps {
    eyebrow: string;
    title: React.ReactNode;
    subtitle: string;
    badges: readonly HeroBadge[];
}

export const SectionHero: React.FC<SectionHeroProps> = ({ eyebrow, title, subtitle, badges }) => {
    return (
        <section className={styles.hero}>
            <div className={styles.heroEyebrow}>{eyebrow}</div>
            <h1>{title}</h1>
            <p className={styles.heroSub}>{subtitle}</p>
            <div className={styles.heroMeta}>
                {badges.map((badge) => (
                    <span key={badge.label} className={styles.heroBadge}>
                        <span className={`${styles.dot} ${styles[`dot${badge.color.charAt(0).toUpperCase() + badge.color.slice(1)}`]}`} aria-hidden="true" />
                        {badge.label}
                    </span>
                ))}
            </div>
        </section>
    );
};
