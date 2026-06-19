'use client';

import { useEffect, useState } from 'react';
import { NAV_ITEMS } from './constants';
import styles from './page.module.css';

/**
 * Renders a responsive sidebar navigation that tracks and highlights the currently visible section.
 *
 * On mobile and tablet devices, the sidebar functions as a collapsible drawer menu that toggles open and closed. Links automatically close the drawer when clicked.
 */
export default function NavBar() {
    const [activeId, setActiveId] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-20% 0px -70% 0px',
            }
        );

        // id 属性を持つ要素を監視
        NAV_ITEMS.forEach((item) => {
            if (item.type === 'link' && item.id) {
                const el = document.getElementById(item.id);
                if (el) observer.observe(el);
            }
        });

        return () => observer.disconnect();
    }, []);

    return (
        <>
            {/* モバイル用フローティングトグルボタン */}
            <button
                type="button"
                className={styles['menu-toggle']}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="ページ内目次を開く"
                aria-expanded={isOpen}
            >
                {isOpen ? '✕' : '📋 目次'}
            </button>

            {/* モバイル用背景オーバーレイ */}
            {isOpen && (
                <div
                    className={styles.overlay}
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                />
            )}

            <nav
                className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}
                aria-label="Section 4 ガイドナビゲーション"
            >
                {/* モバイル用ドロワーヘッダー */}
                <div className={styles['drawer-header']}>
                    <span className={styles['drawer-title']}>セクション目次</span>
                    <button
                        type="button"
                        className={styles['close-btn']}
                        onClick={() => setIsOpen(false)}
                        aria-label="目次を閉じる"
                    >
                        ✕
                    </button>
                </div>

                {NAV_ITEMS.map((item) => {
                    if (item.type === 'title') {
                        return (
                            <div key={item.id} className={styles['nav-section-title']}>
                                {item.label}
                            </div>
                        );
                    }

                    const isActive = activeId === item.id;
                    return (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={`${styles['nav-item']} ${isActive ? styles.active : ''}`}
                            onClick={() => setIsOpen(false)}
                        >
                            <span
                                className={`${styles['nav-dot']} ${item.colorClass ? styles[item.colorClass] : ''}`}
                            />
                            {item.label}
                        </a>
                    );
                })}
            </nav>
        </>
    );
}
