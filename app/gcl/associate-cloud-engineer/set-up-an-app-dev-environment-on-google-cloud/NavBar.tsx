'use client';

import { useState, useEffect } from 'react';

const NAV_ITEMS = [
    { id: 'overview', label: '概要' },
    { id: 'architecture', label: '全体像' },
    { id: 'storage', label: 'Storage' },
    { id: 'iam', label: 'IAM' },
    { id: 'monitoring', label: 'Monitoring' },
    { id: 'functions', label: 'Functions' },
    { id: 'pubsub', label: 'Pub/Sub' },
    { id: 'challenge', label: 'Challenge Lab' },
    { id: 'practices', label: '早見表' },
    { id: 'troubleshoot', label: 'トラブル対応' },
    { id: 'refs', label: '参考ソース' },
];

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
