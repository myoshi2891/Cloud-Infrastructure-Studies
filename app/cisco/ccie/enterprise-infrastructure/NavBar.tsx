'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { NAV_ITEMS } from './constants';

/**
 * Renders a collapsible table of contents for the CCIE EI Blueprint Guide.
 */
export default function NavBar() {
    const [activeId, setActiveId] = useState<string>('overview');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-15% 0px -65% 0px', threshold: 0.1 }
        );

        NAV_ITEMS.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <div className={styles.topbar}>
                <div className={styles.topbarTitle}>
                    <span className={styles.topbarDot} />
                    <span>CCIE EI Blueprint Guide</span>
                </div>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                    aria-controls="tocNav"
                    aria-label="目次を開閉する"
                    className={styles.topbarButton}
                >
                    {isOpen ? '✕ 閉じる' : '≡ 目次'}
                </button>
            </div>

            <nav
                id="tocNav"
                aria-label="目次"
                className={styles.tocNav}
                style={{ display: isOpen ? 'block' : 'none' }}
            >
                <ol className={styles.tocList}>
                    {NAV_ITEMS.map((item) => {
                        const isActive = activeId === item.id;
                        return (
                            <li key={item.id}>
                                <a
                                    href={`#${item.id}`}
                                    onClick={() => setIsOpen(false)}
                                    className={isActive ? styles.tocLinkActive : styles.tocLink}
                                    aria-current={isActive ? 'location' : undefined}
                                >
                                    <span className={styles.tocIdx}>{item.sectionIdx}</span>
                                    <span>{item.label}</span>
                                </a>
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </>
    );
}
