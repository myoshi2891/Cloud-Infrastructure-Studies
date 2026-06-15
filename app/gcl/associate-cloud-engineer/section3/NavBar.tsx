'use client';

import { useEffect, useState } from 'react';
import { NAV_ITEMS } from './constants';
import styles from './page.module.css';

/**
 * ACE Section 3 ページ専用のサイドバーナビゲーションコンポーネント。
 * IntersectionObserver によるスクロールスパイをサポート。
 */
export default function NavBar() {
    const [activeId, setActiveId] = useState<string>('');

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
        <nav className={styles.sidebar} aria-label="Section 3 ガイドナビゲーション">
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
                    >
                        <span
                            className={`${styles['nav-dot']} ${item.colorClass ? styles[item.colorClass] : ''}`}
                        />
                        {item.label}
                    </a>
                );
            })}
        </nav>
    );
}
