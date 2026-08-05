'use client';

import { useEffect, useState } from 'react';
import { SECTION_DEFINITIONS } from './constants';

/**
 * NavBar - CCDE ガイド内の各セクション要素 (DOM) の画面表示・交差状況を IntersectionObserver で監視対象とし、
 * アクティブなセクション ID を追跡して状態更新 (setActiveId) およびナビゲーションのハイライト表示を行う責務を担うコンポーネント。
 */
export default function NavBar() {
    const [activeId, setActiveId] = useState<string>('what-is-ccde');

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
            { rootMargin: '-20% 0px -60% 0px', threshold: 0.1 }
        );

        SECTION_DEFINITIONS.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <nav
            aria-label="ページ内目次"
            style={{
                position: 'sticky',
                top: 'calc(var(--header-h, 60px) + var(--disclaimer-height, 0px))',
                zIndex: 30,
                background: '#0a2e4d',
                borderBottom: '1px solid #123a57',
                padding: '8px 16px',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
                scrollbarWidth: 'none',
            }}
        >
            <div
                style={{
                    maxWidth: '1000px',
                    margin: '0 auto',
                    display: 'flex',
                    gap: '16px',
                    fontSize: '13px',
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                }}
            >
                {SECTION_DEFINITIONS.map((item) => (
                    <a
                        key={item.id}
                        href={`#${item.id}`}
                        style={{
                            color: activeId === item.id ? '#e8a33d' : '#cfe1ee',
                            textDecoration: 'none',
                            fontWeight: activeId === item.id ? '700' : '400',
                            borderBottom: activeId === item.id ? '2px solid #e8a33d' : 'none',
                            paddingBottom: '2px',
                            transition: 'color 0.2s ease',
                        }}
                    >
                        {item.shortLabel}
                    </a>
                ))}
            </div>
        </nav>
    );
}
