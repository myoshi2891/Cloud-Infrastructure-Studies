'use client';

import { useEffect, useState } from 'react';
import { NAVBAR_ITEMS } from './constants';

export function NavBar() {
    const [activeId, setActiveId] = useState<string>('chapter1');

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 120;

            for (const item of NAVBAR_ITEMS) {
                const element = document.getElementById(item.id);
                if (element) {
                    const top = element.offsetTop;
                    const height = element.offsetHeight;

                    if (scrollPosition >= top && scrollPosition < top + height) {
                        setActiveId(item.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <aside className="sidebar">
            <nav className="toc-nav" aria-label="目次ナビゲーション">
                <div className="toc-title">目次</div>
                <ul className="toc-list">
                    {NAVBAR_ITEMS.map((item) => (
                        <li key={item.id} className="toc-item">
                            <a
                                href={`#${item.id}`}
                                className={`toc-link ${activeId === item.id ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    const target = document.getElementById(item.id);
                                    if (target) {
                                        window.history.pushState(null, '', `#${item.id}`);
                                        target.scrollIntoView({ behavior: 'smooth' });
                                        setActiveId(item.id);
                                    }
                                }}
                            >
                                {item.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
