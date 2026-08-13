'use client';

import React, { useEffect, useState } from 'react';

export function NavBar() {
    const [activeId, setActiveId] = useState('');

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const updateActiveId = () => {
            const headingElements = Array.from(document.querySelectorAll('h2[id], h3[id]'));
            if (headingElements.length === 0) return;

            const scrollPosition = window.scrollY + 140;

            let currentId = headingElements[0]?.id ?? '';

            for (const el of headingElements) {
                const htmlEl = el as HTMLElement;
                if (htmlEl.offsetTop <= scrollPosition) {
                    currentId = htmlEl.id;
                } else {
                    break;
                }
            }

            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
                currentId = headingElements[headingElements.length - 1]?.id ?? currentId;
            }

            setActiveId(currentId);
        };

        updateActiveId();
        window.addEventListener('scroll', updateActiveId, { passive: true });

        let observer: IntersectionObserver | null = null;
        if (typeof IntersectionObserver !== 'undefined') {
            observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting && entry.target.id) {
                            setActiveId(entry.target.id);
                        }
                    });
                },
                { rootMargin: '-15% 0px -70% 0px' }
            );

            const headings = document.querySelectorAll('h2[id], h3[id]');
            headings.forEach((h) => observer?.observe(h));
        }

        return () => {
            window.removeEventListener('scroll', updateActiveId);
            observer?.disconnect();
        };
    }, []);

    const links = [
        { href: '#この章について', target: 'この章について', text: 'この章について' },
        { href: '#試験全体における本セクションの位置づけ', target: '試験全体における本セクションの位置づけ', text: '試験全体における本セクションの位置づけ' },
        { href: '#11-全体的なネットワークアーキテクチャの設計', target: '11-全体的なネットワークアーキテクチャの設計', text: '1.1 全体的なネットワークアーキテクチャの設計' },
        { href: '#12-vpcネットワークの設計', target: '12-vpcネットワークの設計', text: '1.2 VPCネットワークの設計' },
        { href: '#13-耐障害性高性能なハイブリッドマルチクラウドネットワークの設計', target: '13-耐障害性高性能なハイブリッドマルチクラウドネットワークの設計', text: '1.3 耐障害性・高性能なハイブリッド/マルチクラウドネットワークの設計' },
        { href: '#14-gke向けの設計', target: '14-gke向けの設計', text: '1.4 GKE向けの設計' },
        { href: '#設計チェックリスト', target: '設計チェックリスト', text: '設計チェックリスト' },
        { href: '#まとめ', target: 'まとめ', text: 'まとめ' },
        { href: '#参考文献出典', target: '参考文献出典', text: '参考文献・出典' },
    ];

    return (
        <aside className="sidebar">
            <div className="brand">Google Cloud PCNE</div>
            {' '}
            <div className="brand-sub">
                Section 1: Designing and planning a Google Cloud VPC network
            </div>
            {' '}
            <nav>
                <ul>
                    {links.map((link) => (
                        <React.Fragment key={link.href}>
                            <li>
                                <a
                                    href={link.href}
                                    className={activeId === link.target ? 'active' : ''}
                                >
                                    {link.text}
                                </a>
                            </li>
                            {' '}
                        </React.Fragment>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
