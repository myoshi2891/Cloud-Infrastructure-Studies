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
            let decoded: string;
            try {
                decoded = decodeURIComponent(window.location.hash.slice(1));
            } catch {
                // 不正なパーセントエスケープ等は無視し、active を据え置く
                return;
            }
            // ハッシュ無しの URL へ戻った場合は先頭項目へリセットする
            if (decoded === '') {
                setActiveId(NAV_ITEMS[0]?.id ?? '');
                return;
            }
            if (NAV_ITEMS.some((item) => item.id === decoded)) {
                setActiveId(decoded);
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
            target.focus({ preventScroll: true });
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
                {' '}
                <div className="sidebar-header">
                    {' '}
                    <div className="kicker">Google Cloud PCD</div>
                    {' '}
                    <h2>
                        Section 1: 高可用性・セキュア・信頼性の高いクラウドネイティブアプリケーションの設計
                    </h2>
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
                {' '}
            </aside>
        </>
    );
}
