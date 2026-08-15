'use client';

import { useEffect, useState } from 'react';
import { NAV_ITEMS } from './constants';
import styles from './page.module.css';

/**
 * Section 6 の目次を表示し、スクロール位置に対応するリンクを有効化する。
 * モバイル幅ではサイドバーを閉じた状態で開始し、トグルボタンで開閉する。
 * 目次リンクを選択した時点で自動的に閉じ、本文へスクロールできるようにする。
 */
export default function NavBar() {
    const [activeHref, setActiveHref] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        const headingToHref = new Map<Element, string>();
        NAV_ITEMS.forEach(({ href }) => {
            const id = decodeURIComponent(href.slice(1));
            const element = document.getElementById(id);
            if (element) headingToHref.set(element, href);
        });

        const targets = Array.from(headingToHref.keys());
        if (targets.length === 0) return;

        const spyObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const href = headingToHref.get(entry.target);
                        if (href) setActiveHref(href);
                    }
                });
            },
            { root: null, rootMargin: '-15% 0px -75% 0px', threshold: 0 }
        );

        targets.forEach((t) => spyObserver.observe(t));

        return () => spyObserver.disconnect();
    }, []);

    return (
        <>
            <button
                type="button"
                className={styles["sidebar-toggle"]}
                aria-label="Section 6の目次メニューを切り替える"
                aria-expanded={isOpen}
                aria-controls="sidebar"
                onClick={() => setIsOpen((open) => !open)}
            >
                ☰
            </button>
            <aside
                className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}
                id="sidebar"
            >
                <span className={styles["sidebar-brand"]}>AGWA 試験対策ガイド</span>
                <span className={styles["sidebar-subtitle"]}>Section 6: 監視とトラブルシューティング</span>
                <nav className={styles["sidebar-nav"]} aria-label="AGWA Section 6の目次">
                    {NAV_ITEMS.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            aria-current={activeHref === item.href ? 'location' : undefined}
                            className={`${item.level === 2 ? styles["level-2"] : styles["level-3"]} ${
                                activeHref === item.href ? styles.active : ''
                            }`}
                            onClick={() => setIsOpen(false)}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>
            </aside>
        </>
    );
}
