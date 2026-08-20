'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { NAV_ITEMS, type NavItem } from './constants';

/**
 * サイドバーナビゲーションコンポーネント (Client Component)
 *
 * IntersectionObserver による ScrollSpy と、キーボード操作に対応したハッシュ・フォーカス更新を提供します。
 */
export function NavBar() {
    const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0]?.id ?? 'overview');
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        const ids = NAV_ITEMS.map((item) => item.id);
        const elements = ids
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null);

        if (elements.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-20% 0px -70% 0px' },
        );

        elements.forEach((element) => observer.observe(element));

        return () => {
            observer.disconnect();
        };
    }, []);

    const handleNavClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
            e.preventDefault();
            setActiveId(id);
            setMobileOpen(false);

            const target = document.getElementById(id);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, '', `#${id}`);
                target.focus();
            }
        },
        [],
    );

    return (
        <>
            <button
                type="button"
                className="mobile-nav-toggle"
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-expanded={mobileOpen}
                aria-controls="guide-sidebar"
                aria-label="目次ナビゲーションを開閉"
            >
                <i className={`ti ${mobileOpen ? 'ti-x' : 'ti-menu-2'}`}></i>
                <span>目次</span>
            </button>
            <aside
                id="guide-sidebar"
                className={`sidebar ${mobileOpen ? 'open' : ''}`}
                aria-label="サイドバー目次"
            >
                <div className="sidebar-title">
                    <i className="ti ti-network"></i>
                    目次
                </div>
                {' '}
                <nav aria-label="ページ内目次">
                    {NAV_ITEMS.map((item: NavItem) => (
                        <React.Fragment key={item.id}>
                            {item.sectionLabel && (
                                <>
                                    <span className="section-label">{item.sectionLabel}</span>
                                    {' '}
                                </>
                            )}
                            <a
                                href={`#${item.id}`}
                                className={activeId === item.id ? 'active' : ''}
                                aria-current={activeId === item.id ? 'location' : undefined}
                                onClick={(e) => handleNavClick(e, item.id)}
                            >
                                <i className={item.icon}></i>
                                {item.title}
                            </a>
                            {' '}
                        </React.Fragment>
                    ))}
                </nav>
            </aside>
        </>
    );
}
