'use client';

/**
 * Build a Secure Google Cloud Network ページ専用サイドレール NavBar。
 * セクションリンクと IntersectionObserver による scroll-spy を提供する。
 */

import { useEffect, useRef } from 'react';

/** サイドレールセクションリスト */
const SECTIONS = [
    { id: 's1', name: '全体像' },
    { id: 's2', name: 'VPC の基礎' },
    { id: 's3', name: 'ファイアウォール設計' },
    { id: 's4', name: 'IAM と最小権限' },
    { id: 's5', name: 'IAP でゼロトラスト' },
    { id: 's6', name: '外部 LB と Cloud Armor' },
    { id: 's7', name: '内部 LB (ILB)' },
    { id: 's8', name: '総合演習' },
    { id: 's9', name: 'チェックリスト' },
    { id: 's10', name: '参考ソース' },
] as const;

/**
 * Renders the page's side navigation and highlights the section currently in view.
 */
export default function NavBar() {
    const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        const observerTargets = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
        const links = linkRefs.current;

        const activate = (id: string) => {
            links.forEach((el) => el.classList.remove('active'));
            const target = links.get(id);
            if (target) target.classList.add('active');
        };

        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        activate(e.target.id);
                    }
                });
            },
            { rootMargin: '-15% 0px -75% 0px', threshold: 0 },
        );

        observerTargets.forEach((s) => obs.observe(s));

        return () => {
            obs.disconnect();
        };
    }, []);

    return (
        <aside className="rail-wrap">
            <nav className="rail" aria-label="セクションナビゲーション">
                <p className="rail-title">Contents</p>
                {SECTIONS.map((sec) => (
                    <a
                        key={sec.id}
                        href={`#${sec.id}`}
                        className="hop"
                        ref={(el) => {
                            if (el) linkRefs.current.set(sec.id, el);
                            else linkRefs.current.delete(sec.id);
                        }}
                    >
                        <span className="h-name">{sec.name}</span>
                    </a>
                ))}
            </nav>
        </aside>
    );
}
