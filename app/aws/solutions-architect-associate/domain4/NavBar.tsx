'use client';

import { useEffect, useState } from 'react';

const NAV_ITEMS = [
    { id: 'intro', title: 'はじめに' },
    { id: 'common-tools', title: '0. コスト管理ツール共通知識' },
    { id: 'task-4-1', title: 'Task 4.1 ストレージ' },
    { id: 'task-4-2', title: 'Task 4.2 コンピューティング' },
    { id: 'task-4-3', title: 'Task 4.3 データベース' },
    { id: 'task-4-4', title: 'Task 4.4 ネットワーク' },
    { id: 'references', title: '参考文献' },
];

/**
 * AWS SAA ドメイン4 のサイドバーナビゲーションコンポーネント。
 * 各セクションへのスクロール移動、IntersectionObserver によるアクティブ項目の追跡責務を持ちます。
 */
export function NavBar() {
    const [activeId, setActiveId] = useState<string>('intro');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        const elements = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
            Boolean
        ) as HTMLElement[];

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <button
                className="sidebar-toggle"
                aria-expanded={isOpen}
                aria-controls="sidebar"
                aria-label={isOpen ? 'ナビゲーションを閉じる' : 'ナビゲーションを開く'}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                ☰
            </button>
            {isOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                />
            )}
            <aside className={`sidebar ${isOpen ? 'open' : ''}`} id="sidebar">
                <div className="sidebar-brand">
                    <div className="eyebrow">AWS CERTIFIED SOLUTIONS ARCHITECT - ASSOCIATE</div>
                    <h2>
                        ドメイン4
                        <br />
                        コスト最適化アーキテクチャの設計
                    </h2>
                    <span className="weight-badge">出題比率 20%</span>
                </div>
                <nav>
                    <ul>
                        {NAV_ITEMS.map((item) => (
                            <li key={item.id}>
                                <a
                                    href={`#${item.id}`}
                                    className={`nav-link ${activeId === item.id ? 'active' : ''}`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="sidebar-footer">
                    SAA-C03 試験ガイド準拠
                    <br />
                    全4タスク / Mermaid図29点
                </div>
            </aside>
        </>
    );
}
