'use client';

import { useEffect, useState } from 'react';

const NAV_ITEMS = [
    { id: 'intro', label: 'はじめに' },
    { id: 'overview', label: '試験全体像とドメインの位置づけ' },
    { id: 'map', label: 'ドメイン全体マップ' },
    { id: 's31', label: '3.1 SDKとPythonスクリプト' },
    { id: 'platforms', label: '3.2〜3.5 プラットフォーム全体像' },
    { id: 's36', label: '3.6 デバイスレベルAPI' },
    { id: 's37', label: '3.7 DevNetリソースの選択' },
    { id: 's38', label: '3.8 モデル駆動型プログラマビリティ' },
    { id: 's39', label: '3.9 実践コード構築' },
    { id: 'roadmap', label: '学習ロードマップ' },
    { id: 'tips', label: '試験対策のポイント' },
    { id: 'summary', label: 'まとめ' },
    { id: 'references', label: '参考文献・出典一覧' },
];

export function NavBar() {
    const [activeId, setActiveId] = useState<string>('intro');

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
            { rootMargin: '-20% 0px -70% 0px' }
        );

        const sections = document.querySelectorAll('.ccna-platforms-dev-page section[id], .ccna-platforms-dev-page footer[id]');
        sections.forEach((sec) => observer.observe(sec));

        return () => observer.disconnect();
    }, []);

    return (
        <aside className="sidebar">
            <span className="brand">CCNA Automation 解説</span>
            <span className="brand-sub">3.0 Cisco Platforms and Development</span>
            <nav aria-label="目次ナビゲーション">
                <ul>
                    {NAV_ITEMS.map((item) => (
                        <li key={item.id}>
                            <a
                                href={`#${item.id}`}
                                className={activeId === item.id ? 'active' : ''}
                                onClick={() => setActiveId(item.id)}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
