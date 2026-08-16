'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { NAV_ITEMS } from './constants';

interface NavBarProps {
    isOpen: boolean;
    onToggle: () => void;
    onClose: () => void;
}

/**
 * PCNE Section 3 サイドバーナビゲーションコンポーネント
 */
export function NavBar({ isOpen, onToggle, onClose }: NavBarProps) {
    const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0]?.id ?? '');

    const allNavIds = React.useMemo(() => {
        return NAV_ITEMS.map((item) => item.id);
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
            rootMargin: '-15% 0px -75% 0px',
            threshold: [0, 0.25, 0.5, 0.75, 1],
        });

        allNavIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [allNavIds]);

    // モバイルのオーバーレイ表示中は Escape で閉じられるようにする
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

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
                className="menu-toggle"
                id="menuToggle"
                aria-label={isOpen ? '目次を閉じる' : '目次を開く'}
                aria-expanded={isOpen}
                aria-controls="sidebar"
                onClick={onToggle}
            >
                ☰
            </button>
            <div
                className={`nav-backdrop ${isOpen ? 'open' : ''}`}
                id="navBackdrop"
                onClick={onClose}
                aria-hidden="true"
            />
            <nav
                className={`sidebar ${isOpen ? 'open' : ''}`}
                id="sidebar"
                aria-label="目次"
            >
                <div className="side-nav-brand">
                    S3<span>ロードバランシングと<br />トラフィック管理</span>
                </div>
                <ul className="nav-list">
                    {NAV_ITEMS.map((item) => (
                        <li
                            key={item.id}
                            className={item.level === 2 ? 'nav-h2' : 'nav-h3'}
                        >
                            <a
                                href={`#${item.id}`}
                                data-target={item.id}
                                className={activeId === item.id ? 'active' : ''}
                                onClick={handleNavClick(item.id)}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}
