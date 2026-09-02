'use client';

import { useCallback, useEffect, useState, type MouseEvent } from 'react';
import { NAV_ITEMS, type NavItem } from './constants';

export function NavBar() {
    const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0]?.id ?? '');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    const closeSidebar = useCallback(() => {
        setIsOpen(false);
    }, []);

    // 初期表示時 & ハッシュ変更時の同期
    useEffect(() => {
        const syncHash = () => {
            try {
                const hash = window.location.hash.slice(1);
                const decoded = decodeURIComponent(hash);
                if (decoded && NAV_ITEMS.some((item) => item.id === decoded)) {
                    setActiveId(decoded);
                }
            } catch {
                // 不正なパーセントエスケープ等は無視
            }
        };

        syncHash();
        window.addEventListener('hashchange', syncHash);
        window.addEventListener('popstate', syncHash);

        return () => {
            window.removeEventListener('hashchange', syncHash);
            window.removeEventListener('popstate', syncHash);
        };
    }, []);

    // IntersectionObserver による ScrollSpy
    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        const visibleEntries = new Map<string, number>();

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        visibleEntries.set(entry.target.id, entry.boundingClientRect.top);
                    } else {
                        visibleEntries.delete(entry.target.id);
                    }
                }

                if (visibleEntries.size > 0) {
                    let topId = '';
                    let minTop = Infinity;
                    for (const [id, top] of visibleEntries.entries()) {
                        if (top < minTop) {
                            minTop = top;
                            topId = id;
                        }
                    }
                    if (topId) {
                        setActiveId(topId);
                    }
                }
            },
            {
                rootMargin: '-10% 0px -70% 0px',
                threshold: 0,
            },
        );

        for (const item of NAV_ITEMS) {
            const el = document.getElementById(item.id);
            if (el) {
                observer.observe(el);
            }
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
            return;
        }
        e.preventDefault();
        closeSidebar();
        setActiveId(id);

        const target = document.getElementById(id);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            window.history.pushState(null, '', `#${id}`);
            target.focus();
        }
    };

    return (
        <>
            <button
                type="button"
                className="sidebar-toggle"
                id="sidebarToggle"
                aria-label="メニュー"
                aria-controls="sidebar"
                aria-expanded={isOpen}
                onClick={toggleOpen}
            >
                ☰
            </button>
            <aside className={`sidebar ${isOpen ? 'open' : ''}`} id="sidebar" aria-label="サイドバー目次">
                <div className="sidebar-header">
                    <div className="kicker">Google Cloud PCD</div>
                    {' '}
                    <h2>Professional Cloud Developer 学習ガイド</h2>
                </div>
                {' '}
                <nav id="sidebarNav" aria-label="目次">
                    {NAV_ITEMS.map((item: NavItem, index: number) => {
                        const isActive = activeId === item.id;
                        return (
                            <span key={item.id}>
                                {index > 0 && ' '}
                                <a
                                    href={`#${item.id}`}
                                    className={`${item.lvl3 ? 'lvl3' : ''} ${isActive ? 'active' : ''}`}
                                    aria-current={isActive ? 'location' : undefined}
                                    onClick={(e) => handleLinkClick(e, item.id)}
                                >
                                    {item.label}
                                </a>
                            </span>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}
