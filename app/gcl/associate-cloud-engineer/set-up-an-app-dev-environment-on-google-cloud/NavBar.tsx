'use client';

/**
 * Set Up an App Dev Environment ページ専用サイドレール NavBar。
 * セクションリンクと IntersectionObserver による scroll-spy を提供する。
 */

import { useEffect, useRef } from 'react';

/** サイドレールセクションリスト */
const SECTIONS = [
    { id: 's1', name: 'このガイドについて' },
    { id: 's2', name: '全体像とパス' },
    { id: 's3', name: 'Cloud Storage' },
    { id: 's4', name: 'Cloud IAM' },
    { id: 's5', name: 'Cloud Functions' },
    { id: 's6', name: 'Pub/Sub' },
    { id: 's7', name: 'Challenge Lab' },
    { id: 's8', name: 'ベストプラクティス' },
    { id: 's9', name: 'トラブルシューティング' },
    { id: 's10', name: '参考ソース一覧' },
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
