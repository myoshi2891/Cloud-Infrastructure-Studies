'use client';

import { useEffect, useState } from 'react';

const NAV_ITEMS = [
    { href: '#overview', label: 'このドメインの全体像' },
    { href: '#sec61', label: '6.1 自動化の影響' },
    { href: '#sec62', label: '6.2 従来型 vs コントローラベース' },
    { href: '#sec63', label: '6.3 SDNアーキテクチャ' },
    { href: '#sec64', label: '6.4 AIと機械学習' },
    { href: '#sec65', label: '6.5 REST APIの特徴' },
    { href: '#sec66', label: '6.6 構成管理メカニズム' },
    { href: '#sec67', label: '6.7 JSONの構成要素' },
    { href: '#summary', label: 'まとめと学習のポイント' },
    { href: '#sources', label: '出典・参考資料' },
];

export default function NavBar({ activeId: initialActiveId }: { activeId?: string }) {
    const [activeId, setActiveId] = useState<string>(initialActiveId || 'overview');

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        const sections = NAV_ITEMS.map((item) => document.querySelector(item.href)).filter(Boolean);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id');
                        if (id) {
                            setActiveId(id);
                        }
                    }
                });
            },
            { rootMargin: '-15% 0px -75% 0px', threshold: 0 }
        );

        sections.forEach((sec) => {
            if (sec) observer.observe(sec);
        });

        return () => observer.disconnect();
    }, []);

    const currentActive = initialActiveId || activeId;

    return (
        <nav
            className="sidebar"
            aria-label="Automation and Programmability サイドバー"
        >
            <span className="brand">CCNA 200-301</span>
            <span className="brand-sub">v1.1 ブループリント学習ガイド</span>
            <span className="nav-badge">DOMAIN 6.0 &middot; 10%</span>
            <nav className="toc" aria-label="Automation and Programmability 目次">
                {NAV_ITEMS.map((item) => {
                    const id = item.href.replace('#', '');
                    const isActive = currentActive === id;
                    return (
                        <a
                            key={item.href}
                            href={item.href}
                            className={isActive ? 'active' : ''}
                        >
                            {item.label}
                        </a>
                    );
                })}
            </nav>
        </nav>
    );
}
