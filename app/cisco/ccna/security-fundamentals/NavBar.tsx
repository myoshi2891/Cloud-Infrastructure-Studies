'use client';

import { useEffect, useState } from 'react';
import { NAV_ITEMS } from './constants';

/**
 * Renders a sidebar table of contents for the CCNA Security Fundamentals guide.
 */
export function NavBar() {
    const [activeId, setActiveId] = useState<string>('overview');

    useEffect(() => {
        if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-15% 0px -75% 0px' }
        );

        NAV_ITEMS.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <aside className="sidebar" id="sidebar">
            <div className="sidebar-brand">
                CCNA 200-301<span> Security</span>
            </div>
            <p className="sidebar-sub">
                5.0 Security Fundamentals
                <br />
                セキュリティの基礎 徹底解説
            </p>
            <nav className="sidebar-nav" aria-label="目次ナビゲーション">
                {NAV_ITEMS.map((item) => (
                    <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={activeId === item.id ? 'active' : ''}
                        onClick={(e) => {
                            e.preventDefault();
                            const target = document.getElementById(item.id);
                            if (target) {
                                target.scrollIntoView({ behavior: 'smooth' });
                                setActiveId(item.id);
                            }
                        }}
                    >
                        {item.number} {item.label}
                    </a>
                ))}
            </nav>
            <div className="sidebar-footer">
                非公式の学習補助資料です。
                <br />
                最新情報は Cisco 公式ページをご確認ください。
            </div>
        </aside>
    );
}
