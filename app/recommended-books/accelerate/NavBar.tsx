'use client';

import { useEffect, useState, type FC, type MouseEvent } from 'react';
import { scrollBehavior } from '@/lib/motion';
import { NAV_ITEMS } from './constants';

interface NavBarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

/**
 * Accelerate ガイド用のサイドバーナビゲーションコンポーネント。
 * 目次リンクの表示、IntersectionObserver によるスクロールスパイ、キーボードアクセシビリティを提供します。
 */
export const NavBar: FC<NavBarProps> = ({ isOpen = false, onClose }) => {
    const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0]?.id ?? '');

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
            rootMargin: '-20% 0px -70% 0px',
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
        <nav
            className={`sidebar${isOpen ? ' open' : ''}`}
            id="sidebar"
            aria-label="目次"
        >
            <div className="sidebar-brand">
                <svg
                    className="seal"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <circle cx="20" cy="20" r="18" stroke="#B8802A" strokeWidth="1.4" />
                    <circle cx="20" cy="20" r="13" stroke="#B8802A" strokeWidth="1" />
                    <path
                        d="M14 20.5L18 24.5L26 15.5"
                        stroke="#2E3F72"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <div className="brand-text">
                    <div className="brand-title">Accelerate 完全ガイド</div>
                    <div className="brand-subtitle">Lean と DevOps の科学</div>
                </div>
            </div>

            <ul className="sidebar-nav">
                {NAV_ITEMS.map((item) => {
                    const isActive = activeId === item.id;
                    return (
                        <li key={item.id}>
                            <a
                                href={`#${item.id}`}
                                className={isActive ? 'active' : ''}
                                onClick={(e) => handleLinkClick(e, item.id)}
                            >
                                <i className={item.icon} aria-hidden="true" />
                                {item.label}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};
