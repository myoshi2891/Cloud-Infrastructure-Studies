'use client';

import { useEffect, useState } from 'react';

interface NavItem {
    id: string;
    label: string;
}

const NAV_ITEMS: NavItem[] = [
    { id: 'sec-1', label: '1. この記事について' },
    { id: 'sec-2', label: '2. CCNA Automation 試験の全体像' },
    { id: 'sec-3', label: '3. 学習ロードマップ' },
    { id: 'sec-4', label: '4. Step 0: APIとは何か' },
    { id: 'sec-5', label: '5. Step 1: API方式の比較' },
    { id: 'sec-6', label: '6. Step 2: REST APIリクエスト構築' },
    { id: 'sec-7', label: '7. Step 3: HTTPレスポンス解釈' },
    { id: 'sec-8', label: '8. Step 4: HTTPステータスコード' },
    { id: 'sec-9', label: '9. Step 5: API認証方式' },
    { id: 'sec-10', label: '10. Step 6: APIの制約' },
    { id: 'sec-11', label: '11. Step 7: Webhook活用' },
    { id: 'sec-12', label: '12. Step 8: トラブルシューティング' },
    { id: 'sec-13', label: '13. Step 9: Python requests実装' },
    { id: 'sec-14', label: '14. まとめ: 対応表' },
    { id: 'sec-15', label: '15. さらに学ぶために' },
    { id: 'sec-16', label: '16. 出典・参考資料' },
];

/**
 * Renders a sidebar table of contents for the CCNA Automation API guide.
 */
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
        <aside className="sidebar" id="sidebar">
            <div className="sidebar-brand">
                CCNA AUTOMATION<span>学習ガイド</span>
            </div>
            <p className="sidebar-sub">
                200-901 CCNAAUTO
                <br />
                2.0 Understanding and Using APIs
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
