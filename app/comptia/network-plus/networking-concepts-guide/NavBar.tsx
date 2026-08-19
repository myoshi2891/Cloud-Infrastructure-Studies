'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { NAV_ITEMS } from './constants';

/**
 * CompTIA Network+ Networking Concepts ガイドのサイドバーナビゲーションコンポーネント。
 * ScrollSpy によるアクティブ見出しのハイライトと、キーボードアクセシビリティを提供します。
 */
export function NavBar() {
    const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0]?.id ?? 'intro');

    useEffect(() => {
        if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                }
            },
            {
                rootMargin: '-80px 0px -60% 0px',
                threshold: 0,
            },
        );

        NAV_ITEMS.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) {
                observer.observe(el);
            }
        });

        return () => observer.disconnect();
    }, []);

    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
            e.preventDefault();
            const target = document.getElementById(id);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                window.history.pushState(null, '', `#${id}`);
                target.focus({ preventScroll: true });
                setActiveId(id);
            }
        },
        [],
    );

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <span className="badge">Domain 1.0 · 23%</span>
                {' '}
                <h1>Networking Concepts</h1>
                {' '}
                <p>CompTIA Network+ (N10-009)</p>
            </div>
            {' '}
            <nav aria-label="目次ナビゲーション">
                <a
                    href="#intro"
                    className={activeId === 'intro' ? 'active' : ''}
                    onClick={(e) => handleClick(e, 'intro')}
                >
                    <i className="ti ti-info-circle"></i>
                    {' '}
                    はじめに
                </a>
                {' '}
                <div className="nav-group-label">Step by step</div>
                {' '}
                <a
                    href="#step1"
                    className={activeId === 'step1' ? 'active' : ''}
                    onClick={(e) => handleClick(e, 'step1')}
                >
                    <i className="ti ti-layers-intersect"></i>
                    {' '}
                    1. OSI参照モデル
                </a>
                {' '}
                <a
                    href="#step2"
                    className={activeId === 'step2' ? 'active' : ''}
                    onClick={(e) => handleClick(e, 'step2')}
                >
                    <i className="ti ti-router"></i>
                    {' '}
                    2. ネットワーク機器
                </a>
                {' '}
                <a
                    href="#step3"
                    className={activeId === 'step3' ? 'active' : ''}
                    onClick={(e) => handleClick(e, 'step3')}
                >
                    <i className="ti ti-cloud"></i>
                    {' '}
                    3. クラウドの概念
                </a>
                {' '}
                <a
                    href="#step4"
                    className={activeId === 'step4' ? 'active' : ''}
                    onClick={(e) => handleClick(e, 'step4')}
                >
                    <i className="ti ti-plug-connected"></i>
                    {' '}
                    4. ポート/プロトコル
                </a>
                {' '}
                <a
                    href="#step5"
                    className={activeId === 'step5' ? 'active' : ''}
                    onClick={(e) => handleClick(e, 'step5')}
                >
                    <i className="ti ti-cable"></i>
                    {' '}
                    5. 伝送メディア
                </a>
                {' '}
                <a
                    href="#step6"
                    className={activeId === 'step6' ? 'active' : ''}
                    onClick={(e) => handleClick(e, 'step6')}
                >
                    <i className="ti ti-topology-star-3"></i>
                    {' '}
                    6. トポロジー
                </a>
                {' '}
                <a
                    href="#step7"
                    className={activeId === 'step7' ? 'active' : ''}
                    onClick={(e) => handleClick(e, 'step7')}
                >
                    <i className="ti ti-binary"></i>
                    {' '}
                    7. IPv4アドレッシング
                </a>
                {' '}
                <a
                    href="#step8"
                    className={activeId === 'step8' ? 'active' : ''}
                    onClick={(e) => handleClick(e, 'step8')}
                >
                    <i className="ti ti-rocket"></i>
                    {' '}
                    8. 進化する環境
                </a>
                {' '}
                <div className="nav-group-label">Wrap up</div>
                {' '}
                <a
                    href="#summary"
                    className={activeId === 'summary' ? 'active' : ''}
                    onClick={(e) => handleClick(e, 'summary')}
                >
                    <i className="ti ti-checklist"></i>
                    {' '}
                    まとめ
                </a>
                {' '}
                <a
                    href="#references"
                    className={activeId === 'references' ? 'active' : ''}
                    onClick={(e) => handleClick(e, 'references')}
                >
                    <i className="ti ti-books"></i>
                    {' '}
                    参考文献・出典
                </a>
            </nav>
        </aside>
    );
}
