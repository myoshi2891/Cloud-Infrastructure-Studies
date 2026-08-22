'use client';

import { useEffect, useState, useCallback } from 'react';
import { NAV_ITEMS, type NavItem } from './constants';

interface NavBarProps {
    isOpen: boolean;
    onToggle: () => void;
    onClose: () => void;
}

export function NavBar({ isOpen, onToggle, onClose }: NavBarProps) {
    const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0]?.id ?? '');

    useEffect(() => {
        const navLevel2Items = NAV_ITEMS.filter((item) => item.level === 2);
        const targetElements = navLevel2Items
            .map((item) => document.getElementById(item.id))
            .filter((el): el is HTMLElement => el !== null);

        if (targetElements.length === 0) return;
        if (typeof IntersectionObserver === 'undefined') return;

        const observer = new IntersectionObserver(
            (entries) => {
                // 同一バッチ内で複数の見出しが交差する場合、ビューポート最上部に
                // 最も近い（boundingClientRect.top が最小の）見出しだけを採用する
                const topMost = entries
                    .filter((entry) => entry.isIntersecting)
                    .reduce<IntersectionObserverEntry | null>(
                        (best, entry) =>
                            best === null || entry.boundingClientRect.top < best.boundingClientRect.top
                                ? entry
                                : best,
                        null,
                    );
                if (topMost) setActiveId(topMost.target.id);
            },
            {
                rootMargin: '-15% 0px -75% 0px',
                threshold: 0,
            },
        );

        targetElements.forEach((el) => observer.observe(el));

        const handleScroll = () => {
            const scrollY = window.scrollY || window.pageYOffset;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
            if (scrollY + windowHeight >= docHeight - 40) {
                const lastItem = navLevel2Items[navLevel2Items.length - 1];
                if (lastItem) setActiveId(lastItem.id);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // 初期表示時点で既にページ末尾にいる場合も最終項目をアクティブにする
        handleScroll();

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (!activeId) return;
        const activeLink = document.querySelector(`.sidebar nav a[href="#${activeId}"]`);
        if (activeLink && typeof activeLink.scrollIntoView === 'function') {
            activeLink.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    }, [activeId]);

    const handleNavClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
            e.preventDefault();
            const target = document.getElementById(id);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, '', `#${id}`);
                // smooth スクロールを focus のデフォルトスクロールで中断させない
                target.focus({ preventScroll: true });
                setActiveId(id);
                onClose();
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
                aria-label="目次を開閉"
                aria-expanded={isOpen}
                aria-controls="sidebar"
                onClick={onToggle}
            >
                &#9776;
            </button>
            <aside className={`sidebar ${isOpen ? 'open' : ''}`} id="sidebar">
                <div className="sidebar-brand">
                    <span className="dot"></span>
                    {' '}
                    <span>PCA セクション1ガイド</span>
                </div>
                {' '}
                <nav id="sideNav" aria-label="セクション目次">
                    <ul>
                        {NAV_ITEMS.filter((item) => item.level === 2).map((item: NavItem) => (
                            <li key={item.id}>
                                <a
                                    href={`#${item.id}`}
                                    className={activeId === item.id ? 'active' : ''}
                                    aria-current={activeId === item.id ? 'location' : undefined}
                                    onClick={(e) => handleNavClick(e, item.id)}
                                >
                                    {item.label}
                                </a>
                                {' '}
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    );
}
