'use client';

import { useEffect, useState } from 'react';

interface NavItem {
    id: string;
    label: string;
}

const NAV_ITEMS: NavItem[] = [
    { id: 'sec-1', label: '1. この認定と試験について' },
    { id: 'sec-2', label: '2. 試験全体のドメイン構成' },
    { id: 'sec-3', label: '3. データフォーマットの比較' },
    { id: 'sec-4', label: '4. データのパース' },
    { id: 'sec-5', label: '5. テスト駆動開発 (TDD)' },
    { id: 'sec-6', label: '6. 開発手法の比較' },
    { id: 'sec-7', label: '7. コードの構造化' },
    { id: 'sec-8', label: '8. デザインパターン' },
    { id: 'sec-9', label: '9. バージョン管理の利点' },
    { id: 'sec-10', label: '10. Gitの基本操作' },
    { id: 'sec-11', label: '11. 実践シナリオ' },
    { id: 'sec-12', label: '12. チェックリスト・クイズ' },
    { id: 'sec-13', label: '13. 参考ソース' },
];

export function NavBar() {
    const [activeId, setActiveId] = useState<string>('sec-1');

    useEffect(() => {
        if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-20% 0px -65% 0px' }
        );

        NAV_ITEMS.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <aside class="sidebar" className="sidebar" id="sidebar">
            <div className="sidebar-brand">
                CCNA AUTOMATION<span>学習ガイド</span>
            </div>
            <p className="sidebar-sub">
                200-901 CCNAAUTO
                <br />
                1.0 ソフトウェア開発と設計
            </p>
            <nav className="sidebar-nav" aria-label="目次ナビゲーション">
                {NAV_ITEMS.map((item) => (
                    <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={activeId === item.id ? 'active' : ''}
                        onClick={(e) => {
                            e.preventDefault();
                            const target = document.getElementById(item.id);
                            if (target) {
                                target.scrollIntoView({ behavior: 'smooth' });
                                setActiveId(item.id);
                            }
                        }}
                    >
                        {item.label}
                    </a>
                ))}
            </nav>
            <div className="sidebar-footer">
                非公式の学習補助資料です。
                <br />
                公式情報は{' '}
                <a
                    href="https://www.cisco.com/site/us/en/learn/training-certifications/certifications/automation/ccna-automation/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Cisco公式ページ
                </a>
                をご確認ください。
            </div>
        </aside>
    );
}
