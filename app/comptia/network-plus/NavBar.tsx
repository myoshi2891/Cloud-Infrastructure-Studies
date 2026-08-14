'use client';

import { Fragment, useEffect, useState } from 'react';

const NAV_ITEMS = [
    { id: 'overview', label: '1. Network+とは何か', iconClass: 'ti ti-network' },
    { id: 'target-audience', label: '2. 対象者', iconClass: 'ti ti-users' },
    { id: 'exam-info', label: '3. 試験の基本情報', iconClass: 'ti ti-info-circle' },
    { id: 'domains', label: '4. 出題範囲と配点', iconClass: 'ti ti-chart-pie' },
    { id: 'domain-details', label: '5. ドメイン詳細解説', iconClass: 'ti ti-list-details' },
    { id: 'osi', label: '6. OSI参照モデル', iconClass: 'ti ti-stack-2' },
    { id: 'roadmap', label: '7. 学習ロードマップ', iconClass: 'ti ti-route' },
    { id: 'materials', label: '8. 学習教材の選び方', iconClass: 'ti ti-books' },
    { id: 'exam-day', label: '9. 試験当日の流れ', iconClass: 'ti ti-calendar-event' },
    { id: 'study-time', label: '10. 学習時間の目安', iconClass: 'ti ti-clock-hour-4' },
    { id: 'faq', label: '11. よくある質問', iconClass: 'ti ti-help-circle' },
    { id: 'summary', label: '12. まとめ', iconClass: 'ti ti-checklist' },
    { id: 'references', label: '13. 参考文献・出典', iconClass: 'ti ti-link' },
];

export default function NavBar() {
    const [activeId, setActiveId] = useState<string>('overview');

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                        break;
                    }
                }
            },
            {
                rootMargin: '-80px 0px -60% 0px',
                threshold: 0.1,
            },
        );

        NAV_ITEMS.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <aside className="sidebar" aria-label="ガイド内ナビゲーション">
            <div className="sidebar-brand">
                <div className="sidebar-brand-icon">
                    <i className="ti ti-certificate" aria-hidden="true" />
                </div>
                <div>
                    <div className="sidebar-brand-text">Network+ ガイド</div>
                    {' '}
                    <div className="sidebar-brand-sub">N10-009 / V9</div>
                </div>
            </div>
            {' '}
            <div className="sidebar-title">目次</div>
            {' '}
            <nav id="side-nav">
                {NAV_ITEMS.map((item) => (
                    <Fragment key={item.id}>
                        <a
                            href={`#${item.id}`}
                            className={activeId === item.id ? 'active' : ''}
                        >
                            <i className={item.iconClass} aria-hidden="true" />
                            {item.label}
                        </a>
                        {' '}
                    </Fragment>
                ))}
            </nav>
        </aside>
    );
}
