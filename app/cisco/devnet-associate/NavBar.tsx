'use client';

import { useEffect, useState } from 'react';

const NAV_ITEMS = [
    { id: 's1', label: '1. 名称変更のお知らせ' },
    { id: 's2', label: '2. DevNet Associateとは' },
    { id: 's3', label: '3. 資格体系の位置づけ' },
    { id: 's4', label: '4. 試験の基本情報' },
    { id: 's5', label: '5. 出題範囲と配分' },
    { id: 's6', label: '6. 各ドメイン詳細解説' },
    { id: 's7', label: '7. 前提条件・推奨スキル' },
    { id: 's8', label: '8. 出題形式' },
    { id: 's9', label: '9. 学習ロードマップ' },
    { id: 's10', label: '10. 再認定' },
    { id: 's11', label: '11. まとめ' },
    { id: 's12', label: '12. 参考文献・ソース' },
];

export default function NavBar() {
    const [activeId, setActiveId] = useState<string>('s1');

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
            (el): el is HTMLElement => el !== null
        );

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

        sections.forEach((section) => observer.observe(section));

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <nav className="sidebar" id="sidebar">
            <div className="brand">CISCO CERT GUIDE</div>
            <div className="brand-sub">DevNet Associate / CCNA Automation</div>
            <h2>目次</h2>
            {NAV_ITEMS.map((item) => (
                <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={activeId === item.id ? 'active' : ''}
                    onClick={() => setActiveId(item.id)}
                >
                    {item.label}
                </a>
            ))}
        </nav>
    );
}
