'use client';

import { useEffect, useState } from 'react';

const TOC_ITEMS = [
    { id: 'sec1', label: '1. CCNAとは何か' },
    { id: 'sec2', label: '2. CCNA認定の全体像' },
    { id: 'sec3', label: '3. 200-301試験の基本情報' },
    { id: 'sec4', label: '4. 出題範囲（6ドメイン）' },
    { id: 'sec5', label: '5. 各ドメインの学習内容' },
    { id: 'sec6', label: '6. 出題形式' },
    { id: 'sec7', label: '7. 学習ロードマップ' },
    { id: 'sec8', label: '8. 試験当日の流れ' },
    { id: 'sec9', label: '9. 2027年の試験改定' },
    { id: 'sec10', label: '10. つまずきやすい点' },
    { id: 'sec11', label: '11. よくある質問' },
    { id: 'sec12', label: '12. 参考情報源' },
];

/**
 * Displays a table-of-contents navigation bar that tracks the active section as the page is scrolled.
 */
export function NavBar() {
    const [activeId, setActiveId] = useState<string>('sec1');

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        const sectionEls = TOC_ITEMS.map((item) => document.getElementById(item.id)).filter(
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
            { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
        );

        sectionEls.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <nav className="sidebar" aria-label="Table of Contents">
            <span className="sidebar-brand">Cisco Certification Guide</span>
            <p className="sidebar-title">
                CCNA試験
                <br />
                完全ガイド
            </p>
            <ul className="toc">
                {TOC_ITEMS.map((item) => (
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
    );
}
