'use client';

import { useState, useEffect } from 'react';
import { NAV_ITEMS } from './constants';

export default function NavBar() {
    const [activeId, setActiveId] = useState<string>('overview');

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-20% 0px -60% 0px',
                threshold: 0,
            }
        );

        NAV_ITEMS.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <nav className="sub-navbar" aria-label="セクションナビゲーション">
            <div className="nav-inner">
                <span className="nav-brand">GCP // App Dev Guide</span>
                <div className="nav-links">
                    {NAV_ITEMS.map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={activeId === item.id ? 'active' : ''}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
}
