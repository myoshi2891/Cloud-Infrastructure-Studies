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
        if (typeof IntersectionObserver === 'undefined') return;

        const targetElements = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
            (el): el is HTMLElement => el !== null,
        );

        if (targetElements.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-15% 0px -75% 0px',
                threshold: 0,
            },
        );

        targetElements.forEach((el) => observer.observe(el));

        return () => {
            observer.disconnect();
        };
    }, []);

    const handleNavClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
            e.preventDefault();
            const target = document.getElementById(id);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, '', `#${id}`);
                target.focus();
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
                    <div className="brand-title">Google Cloud<br />Professional Cloud Architect</div>
                    {' '}
                    <div className="brand-sub">認定試験 完全対策ガイド</div>
                </div>
                {' '}
                <nav className="sidebar-nav" id="sidebarNav">
                    {NAV_ITEMS.map((item: NavItem) => (
                        <span key={item.id}>
                            <a
                                href={`#${item.id}`}
                                data-target={item.id}
                                className={`${item.level === 2 ? 'nav-l2' : 'nav-l3'} ${activeId === item.id ? 'active' : ''}`}
                                aria-current={activeId === item.id ? 'location' : undefined}
                                onClick={(e) => handleNavClick(e, item.id)}
                            >
                                {item.label}
                            </a>
                            {' '}
                        </span>
                    ))}
                </nav>
            </aside>
        </>
    );
}
