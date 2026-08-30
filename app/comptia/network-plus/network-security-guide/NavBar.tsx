'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { NAV_ITEMS, type NavItem } from './constants';

const SECTION_IDS: readonly string[] = NAV_ITEMS.map((item) => item.id);
const DEFAULT_ACTIVE_ID = NAV_ITEMS[0]?.id ?? 'overview';

/**
 * Resolves the current URL hash to a valid navigation section ID.
 *
 * Returns `null` during server-side rendering, for unknown section IDs, or for malformed percent escapes.
 *
 * @returns The matching section ID, or `null` when the hash does not identify a valid section.
 */
function readHashSectionId(): string | null {
    if (typeof window === 'undefined') return null;
    const raw = window.location.hash.replace(/^#/, '');
    let id: string;
    try {
        id = decodeURIComponent(raw);
    } catch (error) {
        if (error instanceof URIError) return null;
        throw error;
    }
    return SECTION_IDS.includes(id) ? id : null;
}

/**
 * Domain 4.0 ネットワークセキュリティガイドのサイドバーナビゲーションを表示します。
 *
 * スクロール位置、URLハッシュ、リンク操作に応じてアクティブなセクションを更新し、
 * モバイル表示ではサイドバーの開閉を管理します。
 */
export function NavBar() {
    const [activeId, setActiveId] = useState<string>(DEFAULT_ACTIVE_ID);
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);

    useEffect(() => {
        const syncFromHash = () => {
            const id = readHashSectionId();
            if (id !== null) setActiveId(id);
        };

        syncFromHash();
        window.addEventListener('hashchange', syncFromHash);
        window.addEventListener('popstate', syncFromHash);

        return () => {
            window.removeEventListener('hashchange', syncFromHash);
            window.removeEventListener('popstate', syncFromHash);
        };
    }, []);

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        const elements = SECTION_IDS
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null);

        if (elements.length === 0) return;

        const intersectingTops = new Map<string, number>();

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        intersectingTops.set(entry.target.id, entry.boundingClientRect.top);
                        continue;
                    }
                    intersectingTops.delete(entry.target.id);
                }

                let topmostId: string | null = null;
                let topmostTop = Number.POSITIVE_INFINITY;
                for (const [id, top] of intersectingTops) {
                    if (top >= topmostTop) continue;
                    topmostId = id;
                    topmostTop = top;
                }
                if (topmostId !== null) setActiveId(topmostId);
            },
            { rootMargin: '-20% 0px -70% 0px' },
        );

        elements.forEach((element) => observer.observe(element));

        return () => {
            observer.disconnect();
        };
    }, []);

    const handleNavClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
            if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

            e.preventDefault();
            setActiveId(id);
            setMobileOpen(false);

            const target = document.getElementById(id);
            if (target) {
                target.scrollIntoView?.({ behavior: 'smooth' });
                window.history.pushState(null, '', `#${id}`);
                target.focus();
            }
        },
        [],
    );

    return (
        <>
            <button
                type="button"
                className="mobile-nav-toggle"
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-expanded={mobileOpen}
                aria-controls="guide-sidebar"
                aria-label="目次ナビゲーションを開閉"
            >
                <i className={`ti ${mobileOpen ? 'ti-x' : 'ti-menu-2'}`}></i>
                <span>目次</span>
            </button>
            <nav
                id="guide-sidebar"
                className={`sidebar ${mobileOpen ? 'open' : ''}`}
                aria-label="サイドバー目次"
            >
                <div className="sidebar-title">
                    Domain 4.0 Network Security
                </div>
                <div className="sidebar-nav">
                    {NAV_ITEMS.map((item: NavItem) => (
                        <React.Fragment key={item.id}>
                            <a
                                href={`#${item.id}`}
                                className={activeId === item.id ? 'active' : ''}
                                aria-current={activeId === item.id ? 'location' : undefined}
                                onClick={(e) => handleNavClick(e, item.id)}
                            >
                                <i className={item.icon}></i>
                                {item.title}
                            </a>
                        </React.Fragment>
                    ))}
                </div>
            </nav>
        </>
    );
}
