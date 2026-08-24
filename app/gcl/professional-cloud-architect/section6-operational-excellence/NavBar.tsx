'use client';

import { useEffect, useState, useCallback } from 'react';
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

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries.filter((entry) => entry.isIntersecting);
                if (visibleEntries.length > 0 && visibleEntries[0]?.target.id) {
                    setActiveId(visibleEntries[0].target.id);
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
