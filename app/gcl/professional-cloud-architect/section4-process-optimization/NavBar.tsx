'use client';

import { Fragment, useCallback, useEffect, useState } from 'react';
import { NAV_ITEMS, type NavItem } from './constants';

interface NavBarProps {
    isOpen?: boolean;
    onToggle?: () => void;
}

/**
 * PCA Section 4 サイドバーナビゲーションコンポーネント
 */
export function NavBar({ isOpen, onToggle }: NavBarProps) {
    const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0]?.id ?? '');

    const handleLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        setActiveId(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            element.setAttribute('tabindex', '-1');
            element.focus({ preventScroll: true });
            window.history.pushState(null, '', `#${encodeURIComponent(id)}`);
        }
        if (onToggle && isOpen) {
            onToggle();
        }
    }, [isOpen, onToggle]);

    useEffect(() => {
        if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
            return;
        }

        const headings = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
            Boolean,
        ) as HTMLElement[];

        if (headings.length === 0) return;

        // IntersectionObserver は「交差状態が変化した」ターゲットのみを通知するため、
        // 現在可視の見出し ID をコールバック横断で保持し、NAV_ITEMS の並び順（＝文書順）で
        // 先頭のものをアクティブとする。
        const visibleIds = new Set<string>();

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        visibleIds.add(entry.target.id);
                    } else {
                        visibleIds.delete(entry.target.id);
                    }
                });

                const firstVisible = NAV_ITEMS.find((item) => visibleIds.has(item.id));
                if (firstVisible) {
                    setActiveId(firstVisible.id);
                }
            },
            {
                rootMargin: '-15% 0px -75% 0px',
                threshold: 0,
            },
        );

        headings.forEach((heading) => observer.observe(heading));

        const handleScroll = () => {
            const scrollBottom =
                window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
            if (scrollBottom && NAV_ITEMS.length > 0) {
                const lastItem = NAV_ITEMS[NAV_ITEMS.length - 1];
                if (lastItem) {
                    setActiveId(lastItem.id);
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <aside
            id="sidebar"
            className={`sidebar ${isOpen ? 'open' : ''}`}
            aria-label="セクション目次"
        >
            <div className="sidebar-brand sidebar-header">
                <div className="kicker">Google Cloud PCA</div>{" "}
                <h2>Section 4: プロセス分析と最適化</h2>
            </div>{" "}
            <nav id="sidebarNav" className="sidebar-nav" aria-label="セクションナビゲーション">
                {NAV_ITEMS.map((item: NavItem) => {
                    const isActive = activeId === item.id;
                    const levelClass = item.level === 3 ? 'lvl3 nav-h3' : 'nav-h2';
                    return (
                        <Fragment key={item.id}>
                            <a
                                href={`#${item.id}`}
                                className={`nav-link ${levelClass} ${isActive ? 'active' : ''}`}
                                onClick={(e) => handleLinkClick(e, item.id)}
                                aria-current={isActive ? 'true' : undefined}
                            >
                                {item.label}
                            </a>
                            {/* サイドバー全文の textContent を移行元と一致させるための区切り。
                                削除すると目次ラベルが連結され、全量移行検証が失敗する。 */}
                            {"\n"}
                        </Fragment>
                    );
                })}
            </nav>
        </aside>
    );
}
