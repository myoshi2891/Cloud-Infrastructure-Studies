'use client';

import { useEffect, useState } from 'react';
import { NAV_ITEMS } from './constants';

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const headingElements: Element[] = [];
        NAV_ITEMS.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) headingElements.push(el);
            item.subItems?.forEach((sub) => {
                const subEl = document.getElementById(sub.id);
                if (subEl) headingElements.push(subEl);
            });
        });

        if (!headingElements.length || typeof IntersectionObserver === 'undefined') return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { root: null, rootMargin: '-15% 0px -70% 0px', threshold: 0 }
        );

        headingElements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const toggleSidebar = () => setIsOpen((prev) => !prev);
    const closeSidebar = () => setIsOpen(false);

    return (
        <>
            <button
                type="button"
                aria-label="メニューを開く"
                className="sidebar-toggle"
                onClick={toggleSidebar}
            >
                ☰
            </button>

            <nav className={`sidebar ${isOpen ? 'open' : ''}`} id="sidebar">
                <div className="brand">
                    <div className="brand-badge">IAP</div>
                    <div className="brand-text">
                        <strong>TCP フォワーディング</strong>ベストプラクティスガイド
                    </div>
                </div>

                <ul className="nav-list">
                    {NAV_ITEMS.map((item) => {
                        const isMainActive = activeId === item.id;
                        return (
                            <li key={item.id} className="nav-item">
                                <a
                                    href={`#${item.id}`}
                                    className={`nav-link ${isMainActive ? 'active' : ''}`}
                                    onClick={closeSidebar}
                                >
                                    {item.label}
                                </a>
                                {item.subItems && (
                                    <ul className="nav-sublist">
                                        {item.subItems.map((sub) => {
                                            const isSubActive = activeId === sub.id;
                                            return (
                                                <li key={sub.id} className="nav-subitem">
                                                    <a
                                                        href={`#${sub.id}`}
                                                        className={`nav-link nav-sublink ${
                                                            isSubActive ? 'active' : ''
                                                        }`}
                                                        onClick={closeSidebar}
                                                    >
                                                        {sub.label}
                                                    </a>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </>
    );
}
