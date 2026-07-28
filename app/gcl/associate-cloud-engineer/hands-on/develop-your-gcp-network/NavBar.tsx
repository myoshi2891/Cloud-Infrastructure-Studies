'use client';

/**
 * Develop Your Google Cloud Network ページ専用サイドレール NavBar。
 * traceroute スタイルの hop リンクと IntersectionObserver による scroll-spy を提供する。
 */

import { useEffect, useRef } from 'react';

/** サイドレールの hop リスト */
const HOPS = [
    { id: 'part1', no: 'hop 01 · 10.0.1.0/24', name: 'SQL & BigQuery' },
    { id: 'part2', no: 'hop 02 · 10.0.2.0/24', name: 'Cloud SQL へ移行' },
    { id: 'part3', no: 'hop 03 · 10.0.3.0/24', name: 'VPC ネットワーク設計' },
    { id: 'part4', no: 'hop 04 · 10.0.4.0/24', name: 'Cloud Monitoring' },
    { id: 'part5', no: 'hop 05 · 10.0.5.0/24', name: 'Kubernetes デプロイ戦略' },
    { id: 'part6', no: 'hop 06 · 10.0.6.0/24', name: '総合チャレンジラボ' },
    { id: 'best', no: '★ · summary', name: 'ベストプラクティス総括' },
    { id: 'refs', no: '∞ · sources', name: '参考リソース / 出典' },
] as const;

/**
 * Renders the page's side navigation and highlights the section currently in view.
 *
 * The navigation links are generated from the predefined hop list and update their active
 * state as the matching section enters the viewport.
 */
export default function NavBar() {
    const hopRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        const sections = HOPS.map((h) => document.getElementById(h.id)).filter(Boolean) as HTMLElement[];
        const hops = hopRefs.current;

        const activate = (id: string) => {
            hops.forEach((el) => {
                el.classList.remove('active');
                el.removeAttribute('aria-current');
            });
            const target = hops.get(id);
            if (target) {
                target.classList.add('active');
                target.setAttribute('aria-current', 'location');
            }
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

        sections.forEach((s) => obs.observe(s));

        return () => {
            obs.disconnect();
        };
    }, []);

    return (
        <aside className="rail-wrap">
            <nav className="rail" aria-label="セクションナビゲーション">
                <p className="rail-title">Route · 6 hops</p>
                {HOPS.map((hop) => (
                    <a
                        key={hop.id}
                        href={`#${hop.id}`}
                        className="hop"
                        ref={(el) => {
                            if (el) hopRefs.current.set(hop.id, el);
                            else hopRefs.current.delete(hop.id);
                        }}
                    >
                        <span className="h-no">{hop.no}</span>
                        <span className="h-name">{hop.name}</span>
                    </a>
                ))}
            </nav>
        </aside>
    );
}
