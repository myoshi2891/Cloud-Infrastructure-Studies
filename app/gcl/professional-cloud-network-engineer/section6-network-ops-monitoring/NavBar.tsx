'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { NAV_ITEMS, type NavItem } from './constants';

interface NavTreeNode extends NavItem {
    children: NavItem[];
}

/**
 * NAV_ITEMS（isH3 フラグ付きのフラット配列）を h2 / h3 の階層構造へ畳み込む。
 * 目次の正本は NAV_ITEMS 側に一本化し、マークアップ側で見出しを二重管理しない。
 */
const NAV_TREE: NavTreeNode[] = NAV_ITEMS.reduce<NavTreeNode[]>((tree, item) => {
    const parent = tree.at(-1);
    if (item.isH3 && parent) {
        parent.children.push(item);
        return tree;
    }
    tree.push({ ...item, children: [] });
    return tree;
}, []);

interface NavBarProps {
    isOpen: boolean;
    onToggle: () => void;
    onClose: () => void;
}

/**
 * PCNE Section 6 サイドバーナビゲーションコンポーネント
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
                aria-label="目次を開く"
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
                <div className="sidebar-brand">
                    <span className="tag">PCNE 試験対策</span>
                    <div className="title">S6: ネットワーク操作と監視</div>
                </div>
                <ul className="nav-list">
                    {NAV_TREE.map((item) => (
                        <li key={item.id}>
                            <a
                                href={`#${item.id}`}
                                data-target={item.id}
                                className={`nav-h2 ${activeId === item.id ? 'active' : ''}`.trim()}
                                onClick={handleNavClick(item.id)}
                            >
                                {item.label}
                            </a>
                            {item.children.length > 0 && (
                                <ul className="nav-sublist">
                                    {item.children.map((child) => (
                                        <li key={child.id}>
                                            <a
                                                href={`#${child.id}`}
                                                data-target={child.id}
                                                className={`nav-h3 ${activeId === child.id ? 'active' : ''}`.trim()}
                                                onClick={handleNavClick(child.id)}
                                            >
                                                {child.label}
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
