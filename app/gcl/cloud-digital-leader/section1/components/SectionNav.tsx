import React from 'react';
import { NavLink } from '../constants';
import styles from './SectionNav.module.css';

/**
 * ページ内リンク用のナビゲーションコンポーネント
 * 
 * Sticky配置され、各セクションへのアンカーリンクを提供します。
 * 
 * @param links - 表示するナビゲーションリンクの配列（id, num, labelを含む）
 * @returns ナビゲーションのReact要素
 */
interface SectionNavProps {
    links: readonly NavLink[];
}

export const SectionNav: React.FC<SectionNavProps> = ({ links }) => {
    return (
        <nav className={styles.snav} aria-label="セクションナビゲーション">
            <div className={styles.snavInner}>
                {links.map((link) => (
                    <a key={link.id} href={`#${link.id}`} className={styles.snavLink}>
                        <span className={styles.snavNum}>{link.num}</span>
                        {link.label}
                    </a>
                ))}
            </div>
        </nav>
    );
};
