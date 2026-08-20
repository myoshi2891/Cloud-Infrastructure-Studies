'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { NAV_ITEMS, type NavItem } from './constants';

/**
 * CompTIA Network+ Networking Concepts ガイドのサイドバーナビゲーションコンポーネント。
 * ScrollSpy によるアクティブ見出しのハイライトと、キーボードアクセシビリティを提供します。
 */
export function NavBar() {
    const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0]?.id ?? 'intro');

    useEffect(() => {
        if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                }
            },
            {
                rootMargin: '-80px 0px -60% 0px',
                threshold: 0,
            },
        );

        NAV_ITEMS.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) {
                observer.observe(el);
            }
        });

        return () => observer.disconnect();
    }, []);

    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
            e.preventDefault();
            const target = document.getElementById(id);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, '', `#${id}`);
                target.focus({ preventScroll: true });
                setActiveId(id);
            }
        },
        [],
    );

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <span className="badge">Domain 1.0 · 23%</span>
                {' '}
                <h1>Networking Concepts</h1>
                {' '}
                <p>CompTIA Network+ (N10-009)</p>
            </div>
            {' '}
            <nav aria-label="目次ナビゲーション">
                {NAV_ITEMS.map((item: NavItem, index: number) => (
                    <React.Fragment key={item.id}>
                        {item.group && item.group !== NAV_ITEMS[index - 1]?.group && (
                            <>
                                <div className="nav-group-label">{item.group}</div>
                                {' '}
                            </>
                        )}
                        <a
                            href={`#${item.id}`}
                            className={activeId === item.id ? 'active' : ''}
                            onClick={(e) => handleClick(e, item.id)}
                        >
                            <i className={item.icon}></i>
                            {' '}
                            {item.label}
                        </a>
                        {' '}
                    </React.Fragment>
                ))}
            </nav>
        </aside>
    );
}
