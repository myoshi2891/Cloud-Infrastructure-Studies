'use client';

import { useEffect, useState, type FC, type MouseEvent } from 'react';
import { scrollBehavior } from '@/lib/motion';
import { NAV_ITEMS } from './constants';

interface NavBarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

/**
 * Release It! 完全ガイド用のサイドバーナビゲーションコンポーネント。
 * 目次リンクの表示、IntersectionObserver によるスクロールスパイ、キーボードアクセシビリティを提供します。
 */
export const NavBar: FC<NavBarProps> = ({ isOpen = false, onClose }) => {
    const [activeId, setActiveId] = useState<string>(
        NAV_ITEMS[0]?.id ?? '1-はじめになぜ機能が完成しただけでは足りないのか',
    );

    useEffect(() => {
        if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
            return;
        }

        const handleIntersect: IntersectionObserverCallback = (entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id);
                }
            }
        };

        const observer = new IntersectionObserver(handleIntersect, {
            rootMargin: '-15% 0px -75% 0px',
            threshold: 0,
        });

        NAV_ITEMS.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) {
                observer.observe(el);
            }
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const target = document.getElementById(id);
        if (target) {
            target.scrollIntoView({ behavior: scrollBehavior() });
            window.history.pushState(null, '', `#${id}`);
            target.focus();
        }
        if (onClose) {
            onClose();
        }
    };

    return (
        <aside className={`sidebar${isOpen ? ' open' : ''}`} id="sidebar">
            <div className="sidebar-header">
                <div className="kicker">Release It! ガイド</div>{' '}
                <h2>本番対応ソフトウェア設計・デプロイ入門</h2>
            </div>{' '}
            <nav id="sidebarNav" aria-label="目次">
                {NAV_ITEMS.map((item) => {
                    const isActive = activeId === item.id;
                    const className = `${isActive ? 'active' : ''}${item.isLvl3 ? ' lvl3' : ''}`.trim();
                    return (
                        <span key={item.id}>
                            <a
                                href={`#${item.id}`}
                                className={className}
                                onClick={(e) => handleLinkClick(e, item.id)}
                            >
                                {item.label}
                            </a>{' '}
                        </span>
                    );
                })}
            </nav>
        </aside>
    );
};
