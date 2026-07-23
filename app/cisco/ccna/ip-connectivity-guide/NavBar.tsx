'use client';

import { useEffect, useState } from 'react';
import { TOC_ITEMS } from './constants';

/**
 * Renders a sidebar table of contents for the IP Connectivity study guide and highlights the visible section.
 */
export function NavBar() {
    const [activeId, setActiveId] = useState<string>('overview');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                        break;
                    }
                }
            },
            { rootMargin: '-100px 0px -60% 0px', threshold: 0.1 }
        );

        TOC_ITEMS.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <aside className="sidebar">
            <div className="sidebar-title">CCNA 200-301 STUDY GUIDE</div>
            <div className="sidebar-subtitle">3.0 IP Connectivity（IP接続性）</div>
            <nav aria-label="Table of Contents">
                <ul>
                    {TOC_ITEMS.map((item) => (
                        <li key={item.id}>
                            <a
                                href={`#${item.id}`}
                                className={`nav-link ${activeId === item.id ? 'active' : ''}`}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
