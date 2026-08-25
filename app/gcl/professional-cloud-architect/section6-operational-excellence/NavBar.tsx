'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { NAV_ITEMS, type NavItem } from './constants';

interface NavBarProps {
    isOpen?: boolean;
    onToggle?: () => void;
}

/**
 * PCA Section 6 サイドバーナビゲーションコンポーネント
 */
export function NavBar({ isOpen, onToggle }: NavBarProps) {
    const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0]?.id ?? '');
    const intersectingRef = useRef<Set<string>>(new Set());

    const handleLinkClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
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
        },
        [isOpen, onToggle],
    );

    useEffect(() => {
        if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
            return;
        }

        const headings = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
            Boolean,
        ) as HTMLElement[];

        if (headings.length === 0) return;

        const intersecting = intersectingRef.current;

        const observer = new IntersectionObserver(
            (entries) => {
                // entries には「交差状態が変化した見出し」しか含まれないため、
                // 交差中の見出し集合を Set で保持し続ける（Section 3 と同じ方式）。
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        intersecting.add(entry.target.id);
                    } else {
                        intersecting.delete(entry.target.id);
                    }
                }

                // NAV_ITEMS の並び順で最初に交差している見出しを採用する。
                // 交差中の見出しが無い場合は直前の activeId を維持する。
                const topMost = NAV_ITEMS.find((item) => intersecting.has(item.id));
                if (topMost) setActiveId(topMost.id);
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
                <h2>Section 6: ソリューションと運用の卓越性の確保</h2>
            </div>{" "}
            <nav id="sidebarNav" className="sidebar-nav" aria-label="セクションナビゲーション">
                {NAV_ITEMS.map((item: NavItem) => {
                    const isActive = activeId === item.id;
                    const levelClass = item.level === 3 ? 'lvl3 nav-h3' : 'nav-h2';
                    return (
                        <span key={item.id}>
                            <a
                                href={`#${item.id}`}
                                className={`nav-link ${levelClass} ${isActive ? 'active' : ''}`}
                                onClick={(e) => handleLinkClick(e, item.id)}
                                aria-current={isActive ? 'true' : undefined}
                            >
                                {item.label}
                            </a>
                            {'\n'}
                        </span>
                    );
                })}
            </nav>
        </aside>
    );
}
