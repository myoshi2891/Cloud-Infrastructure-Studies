'use client';

import { useCallback, useEffect, useState } from 'react';
import { type NavItem, NAV_ITEMS } from './constants';

const sanitizeHash = (hash: string): string => {
    try {
        return decodeURIComponent(hash.replace(/^#/, ''));
    } catch {
        return '';
    }
};

/**
 * Professional Cloud Developer Section 3 サイドバーナビゲーション
 */
export function NavBar() {
    const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0]?.id ?? '');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const updateFromHash = () => {
            const id = sanitizeHash(window.location.hash);
            if (id && NAV_ITEMS.some((item) => item.id === id)) {
                setActiveId(id);
            }
        };

        updateFromHash();
        window.addEventListener('hashchange', updateFromHash);
        window.addEventListener('popstate', updateFromHash);

        return () => {
            window.removeEventListener('hashchange', updateFromHash);
            window.removeEventListener('popstate', updateFromHash);
        };
    }, []);

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        const visibleMap = new Map<string, number>();

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    const id = entry.target.id;
                    if (entry.isIntersecting) {
                        visibleMap.set(id, entry.boundingClientRect.top);
                    } else {
                        visibleMap.delete(id);
                    }
                }

                if (visibleMap.size === 0) return;

                let topId = '';
                let minTop = Infinity;

                for (const item of NAV_ITEMS) {
                    const top = visibleMap.get(item.id);
                    if (top !== undefined && top < minTop) {
                        minTop = top;
                        topId = item.id;
                    }
                }

                if (topId) {
                    setActiveId(topId);
                }
            },
            {
                rootMargin: '-80px 0px -60% 0px',
                threshold: [0, 0.25, 0.5, 0.75, 1],
            },
        );

        for (const item of NAV_ITEMS) {
            const element = document.getElementById(item.id);
            if (element) {
                observer.observe(element);
            }
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    const handleLinkClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
            if (
                e.metaKey ||
                e.ctrlKey ||
                e.shiftKey ||
                e.altKey ||
                e.button !== 0
            ) {
                return;
            }

            e.preventDefault();
            const target = document.getElementById(id);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, '', `#${id}`);
                target.focus();
                setActiveId(id);
            }
            setIsOpen(false);
        },
        [],
    );

    return (
        <>
            <button
                type="button"
                className="sidebar-toggle"
                id="sidebarToggle"
                aria-label="メニュー"
                aria-controls="sidebar"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                ☰
            </button>
            <aside
                className={`sidebar ${isOpen ? 'open' : ''}`}
                id="sidebar"
                aria-label="サイドバー目次"
            >
                {' '}
                <div className="sidebar-header">
                    {' '}
                    <div className="kicker">Google Cloud PCD</div>
                    {' '}
                    <h2>Section 3: デプロイのためのクラウドネイティブアプリケーション構成</h2>
                    {' '}
                </div>
                {' '}
                <nav id="sidebarNav" aria-label="目次">
                    {NAV_ITEMS.map((item: NavItem) => {
                        const isActive = activeId === item.id;
                        return (
                            <span key={item.id}>
                                {' '}
                                <a
                                    href={`#${item.id}`}
                                    className={`${item.lvl3 ? 'lvl3' : ''} ${
                                        isActive ? 'active' : ''
                                    }`}
                                    aria-current={
                                        isActive ? 'location' : undefined
                                    }
                                    onClick={(e) => handleLinkClick(e, item.id)}
                                >
                                    {item.label}
                                </a>
                            </span>
                        );
                    })}
                </nav>
                {' '}
            </aside>
        </>
    );
}
