'use client';

import React, { useEffect, useRef, useState } from 'react';

export function NavBar() {
    const [activeId, setActiveId] = useState('この章について');
    const [isOpen, setIsOpen] = useState(false);
    const toggleRef = useRef<HTMLButtonElement>(null);
    const sidebarRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const updateActiveId = () => {
            const headingElements = Array.from(
                document.querySelectorAll('h2[id], h3[id]')
            ) as HTMLElement[];

            if (headingElements.length === 0) return;

            // ビューポート上部からの判定閾値（Header + Disclaimer オフセットの直下付近）
            const triggerTop = 180;

            let currentId = headingElements[0]?.id ?? '';

            for (const el of headingElements) {
                const rect = el.getBoundingClientRect();
                if (rect.top <= triggerTop) {
                    currentId = el.id;
                } else {
                    break;
                }
            }

            // ページ最下部付近にスクロールしている場合は、最後の見出し（例: 参考文献・出典）を強制的にアクティブに
            const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
            if (isBottom) {
                currentId = headingElements[headingElements.length - 1]?.id ?? currentId;
            }

            if (currentId) {
                setActiveId(currentId);
            }
        };

        // 初回実行
        updateActiveId();

        // scroll と resize イベントで更新
        window.addEventListener('scroll', updateActiveId, { passive: true });
        window.addEventListener('resize', updateActiveId, { passive: true });

        // IntersectionObserver による高精度バックアップ
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
                { rootMargin: '-10% 0px -70% 0px' }
            );

            const headings = document.querySelectorAll('h2[id], h3[id]');
            headings.forEach((h) => observer?.observe(h));
        }

        return () => {
            window.removeEventListener('scroll', updateActiveId);
            window.removeEventListener('resize', updateActiveId);
            observer?.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!isOpen) return;

        sidebarRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
                toggleRef.current?.focus();
            }
        };
        document.addEventListener('keydown', closeOnEscape);
        return () => document.removeEventListener('keydown', closeOnEscape);
    }, [isOpen]);

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
        <>
            <button
                ref={toggleRef}
                type="button"
                className="sidebar-toggle"
                aria-label={isOpen ? '目次を閉じる' : '目次を開く'}
                aria-expanded={isOpen}
                aria-controls="pcne-section1-sidebar"
                onClick={() => setIsOpen((open) => !open)}
            >
                ☰
            </button>
            <aside
                ref={sidebarRef}
                id="pcne-section1-sidebar"
                className={`sidebar ${isOpen ? 'open' : ''}`}
            >
            <div className="brand">Google Cloud PCNE</div>
            {' '}
            <div className="brand-sub">
                Section 1: Designing and planning a Google Cloud VPC network
            </div>
            {' '}
            <nav aria-label="Section 1 ガイド内ナビゲーション">
                <ul>
                    {links.map((link) => {
                        const isSelected = activeId === link.target;
                        return (
                            <React.Fragment key={link.href}>
                                <li>
                                    <a
                                        href={link.href}
                                        className={isSelected ? 'active' : ''}
                                        aria-current={isSelected ? 'location' : undefined}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.text}
                                    </a>
                                </li>
                                {' '}
                            </React.Fragment>
                        );
                    })}
                </ul>
            </nav>
            </aside>
        </>
    );
}
