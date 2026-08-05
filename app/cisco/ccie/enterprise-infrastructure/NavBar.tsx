'use client';

import { useEffect, useState } from 'react';
import { NAV_ITEMS } from './constants';

export default function NavBar() {
    const [activeId, setActiveId] = useState<string>('overview');
    const [isOpen, setIsOpen] = useState<boolean>(false);

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
            { rootMargin: '-15% 0px -65% 0px', threshold: 0.1 }
        );

        NAV_ITEMS.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <div className="topbar" style={{
                position: 'sticky',
                top: 'var(--header-height, 0px)',
                zIndex: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                padding: '12px 20px',
                background: 'rgba(10, 46, 77, 0.95)',
                backdropFilter: 'blur(8px)',
                borderBottom: '1px solid var(--line-cyan-dim, #3e6e8c)',
            }}>
                <div style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: '13px',
                    letterSpacing: '0.08em',
                    color: 'var(--paper-dim, #afc7db)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                }}>
                    <span style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: 'var(--accent-amber, #ffb238)',
                        boxShadow: '0 0 8px var(--accent-amber, #ffb238)',
                        flex: 'none',
                    }} />
                    <span>CCIE EI Blueprint Guide</span>
                </div>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                    aria-controls="tocNav"
                    aria-label="目次を開閉する"
                    style={{
                        background: 'transparent',
                        border: '1px solid var(--line-cyan-dim, #3e6e8c)',
                        color: 'var(--paper, #eaf2f8)',
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: '13px',
                        padding: '6px 12px',
                        cursor: 'pointer',
                        borderRadius: '4px',
                    }}
                >
                    {isOpen ? '✕ 閉じる' : '≡ 目次'}
                </button>
            </div>

            <nav
                id="tocNav"
                aria-label="目次"
                style={{
                    position: 'sticky',
                    top: 'calc(var(--header-height, 0px) + 48px)',
                    zIndex: 35,
                    display: isOpen ? 'block' : 'none',
                    maxHeight: 'calc(80vh - 60px)',
                    overflowY: 'auto',
                    padding: '16px 20px',
                    background: 'var(--bg-panel, #0f3d63)',
                    borderBottom: '2px solid var(--accent-amber, #ffb238)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                }}
            >
                <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {NAV_ITEMS.map((item) => (
                        <li key={item.id}>
                            <a
                                href={`#${item.id}`}
                                onClick={() => setIsOpen(false)}
                                style={{
                                    display: 'flex',
                                    gap: '10px',
                                    alignItems: 'baseline',
                                    padding: '6px 10px',
                                    color: activeId === item.id ? 'var(--accent-amber, #ffb238)' : 'var(--paper-dim, #afc7db)',
                                    textDecoration: 'none',
                                    fontSize: '13.5px',
                                    fontWeight: activeId === item.id ? '700' : '400',
                                    borderRadius: '4px',
                                    background: activeId === item.id ? 'rgba(255, 178, 56, 0.12)' : 'transparent',
                                }}
                            >
                                <span style={{ fontFamily: 'monospace', fontSize: '12px', opacity: 0.8 }}>{item.sectionIdx}</span>
                                <span>{item.label}</span>
                            </a>
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    );
}
