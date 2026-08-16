'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { NAV_ITEMS } from './constants';

interface NavBarProps {
    isOpen: boolean;
    onToggle: () => void;
    onClose: () => void;
}

/**
 * PCNE Section 5 サイドバーナビゲーションコンポーネント
 */
export function NavBar({ isOpen, onToggle, onClose }: NavBarProps) {
    const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0]?.id ?? '');

    const allNavIds = React.useMemo(() => {
        const ids: string[] = [];
        for (const item of NAV_ITEMS) {
            ids.push(item.id);
            for (const sub of item.subItems) {
                ids.push(sub.id);
            }
        }
        return ids;
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;

        const handleIntersection: IntersectionObserverCallback = (entries) => {
            const intersecting = entries.filter((e) => e.isIntersecting);
            if (intersecting.length > 0) {
                const best = intersecting.reduce((prev, current) =>
                    current.intersectionRatio > prev.intersectionRatio ? current : prev,
                );
                setActiveId(best.target.id);
            }
        };

        const observer = new IntersectionObserver(handleIntersection, {
            rootMargin: '-15% 0px -70% 0px',
            threshold: [0, 0.25, 0.5, 0.75, 1],
        });

        allNavIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [allNavIds]);

    const handleNavClick = useCallback(
        (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            setActiveId(id);
            onClose();

            const target = document.getElementById(id);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                // 見出し要素は既定でフォーカス不可のため、-1 を付与して
                // スクリーンリーダーのフォーカスを移動させる（Tab 順には入れない）
                target.tabIndex = -1;
                // 既定の focus() は同期スクロールを伴い smooth スクロールを打ち消す
                target.focus({ preventScroll: true });
                window.history.pushState(null, '', `#${id}`);
            }
        },
        [onClose],
    );

    return (
        <>
            <button
                type="button"
                className="sidebar-toggle"
                id="sidebarToggle"
                aria-label="メニューを開閉"
                aria-expanded={isOpen}
                aria-controls="sidebar"
                onClick={onToggle}
            >
                ☰
            </button>
            <nav className={`sidebar ${isOpen ? 'open' : ''}`} id="sidebar" aria-label="セクション目次">
                <div className="sidebar-brand">
                    <span className="kicker">GOOGLE CLOUD PCNE</span>
                    <span className="title">S5: ネットワークセキュリティの設計と実装</span>
                </div>
                <ul className="nav-list">
                    {NAV_ITEMS.map((item) => (
                        <li key={item.id} className="nav-h2">
                            <a
                                href={`#${item.id}`}
                                data-nav={item.id}
                                className={activeId === item.id ? 'active' : ''}
                                onClick={handleNavClick(item.id)}
                            >
                                {item.title}
                            </a>
                            {item.subItems.length > 0 && (
                                <ul className="nav-sub">
                                    {item.subItems.map((sub) => (
                                        <li key={sub.id}>
                                            <a
                                                href={`#${sub.id}`}
                                                data-nav={sub.id}
                                                className={activeId === sub.id ? 'active' : ''}
                                                onClick={handleNavClick(sub.id)}
                                            >
                                                {sub.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}
