'use client';

import { useEffect, useState } from 'react';
import { NAV_ITEMS } from './constants';

export default function NavBar() {
    const [activeHref, setActiveHref] = useState<string>('');

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        const navLinks = Array.from(document.querySelectorAll('.sidebar-nav a'));
        if (navLinks.length === 0) return;

        const headingToHref = new Map<Element, string>();
        navLinks.forEach((a) => {
            const href = a.getAttribute('href');
            if (href) {
                const id = decodeURIComponent(href.slice(1));
                const el = document.getElementById(id);
                if (el) headingToHref.set(el, href);
            }
        });

        const targets = Array.from(headingToHref.keys());
        if (targets.length === 0) return;

        const spyObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const href = headingToHref.get(entry.target);
                        if (href) setActiveHref(href);
                    }
                });
            },
            { root: null, rootMargin: '-15% 0px -75% 0px', threshold: 0 }
        );

        targets.forEach((t) => spyObserver.observe(t));

        return () => spyObserver.disconnect();
    }, []);

    return (
        <aside className="sidebar" id="sidebar">
            <span className="sidebar-brand">AGWA 試験対策ガイド</span>
            <span className="sidebar-subtitle">Section 6: 監視とトラブルシューティング</span>
            <nav className="sidebar-nav">
                {NAV_ITEMS.map((item) => (
                    <a
                        key={item.href}
                        href={item.href}
                        className={`${item.level === 2 ? 'level-2' : 'level-3'} ${
                            activeHref === item.href ? 'active' : ''
                        }`}
                    >
                        {item.label}
                    </a>
                ))}
            </nav>
        </aside>
    );
}
