'use client';

import { useEffect, useState } from 'react';
import { NAV_ITEMS } from './constants';
import styles from './page.module.css';

/**
 * Section 6 の目次を表示し、スクロール位置に対応するリンクを有効化する。
 * モバイル幅ではサイドバーを閉じた状態で開始し、トグルボタンで開閉する。
 * 目次リンクを選択した時点で自動的に閉じ、本文へスクロールできるようにする。
 *
 * activeHref は NAV_ITEMS の先頭で初期化する。IntersectionObserver 非対応環境では
 * 監視が動かないため、空文字のままだとどのリンクもアクティブにならない。
 * また、ページ最下部（残りスクロール 100px 以内）では最後の見出しが
 * 判定バンドに入りきらず前のリンクが残るため、最終項目を優先してアクティブにする。
 */
export default function NavBar() {
    const [activeHref, setActiveHref] = useState<string>(NAV_ITEMS[0]?.href ?? '');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        const activateLastItemAtBottom = (): boolean => {
            const isBottom = window.innerHeight + window.scrollY
                >= document.documentElement.scrollHeight - 100;
            const lastItem = NAV_ITEMS.at(-1);
            if (isBottom && lastItem) {
                setActiveHref(lastItem.href);
                return true;
            }

            return false;
        };

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
                if (activateLastItemAtBottom()) return;

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

        window.addEventListener('scroll', activateLastItemAtBottom, { passive: true });

        return () => {
            spyObserver.disconnect();
            window.removeEventListener('scroll', activateLastItemAtBottom);
        };
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
                    <ul>
                        {NAV_ITEMS.map((item) => (
                            <li key={item.href}>
                                <a
                                    href={item.href}
                                    aria-current={activeHref === item.href ? 'location' : undefined}
                                    className={`${item.level === 2 ? styles["level-2"] : styles["level-3"]} ${
                                        activeHref === item.href ? styles.active : ''
                                    }`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    );
}
