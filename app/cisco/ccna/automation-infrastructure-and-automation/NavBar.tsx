'use client';

import { useEffect, useState } from 'react';

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('overview');

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        const sectionIds = [
            'overview',
            's5-1',
            's5-2',
            's5-3',
            's5-4',
            's5-5',
            's5-6',
            's5-7',
            's5-8',
            's5-9',
            's5-10',
            's5-11',
            's5-12',
            's5-13',
            's5-14',
            'summary',
            'sources',
        ];

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
        );

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const navLinks = [
        { group: 'はじめに' },
        { id: 'overview', num: '―', label: 'この記事について' },
        { group: '出題項目 5.1–5.14' },
        { id: 's5-1', num: '5.1', label: 'モデル駆動プログラマビリティ' },
        { id: 's5-2', num: '5.2', label: 'コントローラー vs デバイス' },
        { id: 's5-3', num: '5.3', label: 'シミュレーション・テスト' },
        { id: 's5-4', num: '5.4', label: 'CI/CDパイプライン' },
        { id: 's5-5', num: '5.5', label: 'Infrastructure as Code' },
        { id: 's5-6', num: '5.6', label: '自動化ツール' },
        { id: 's5-7', num: '5.7', label: 'Pythonスクリプトの解釈' },
        { id: 's5-8', num: '5.8', label: 'Ansible Playbookの解釈' },
        { id: 's5-9', num: '5.9', label: 'Bashスクリプトの解釈' },
        { id: 's5-10', num: '5.10', label: 'RESTCONF/NETCONF' },
        { id: 's5-11', num: '5.11', label: 'YANGモデル' },
        { id: 's5-12', num: '5.12', label: 'Unified Diff' },
        { id: 's5-13', num: '5.13', label: 'コードレビュー' },
        { id: 's5-14', num: '5.14', label: 'シーケンス図' },
        { group: '総括' },
        { id: 'summary', num: '―', label: 'まとめ・学習の進め方' },
        { id: 'sources', num: '―', label: '参考文献・出典' },
    ];

    return (
        <>
            <button
                type="button"
                className="menu-toggle"
                aria-label={isOpen ? '目次を閉じる' : '目次を開く'}
                aria-expanded={isOpen}
                onClick={() => setIsOpen(!isOpen)}
            >
                ☰
            </button>

            <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="brand">
                    <span className="brand-badge">5.0</span> CCNA Automation
                </div>
                <div className="brand-sub">Infrastructure and Automation ガイド</div>

                {navLinks.map((item, index) => {
                    if (item.group) {
                        return (
                            <div key={`group-${index}`} className="nav-group-label">
                                {item.group}
                            </div>
                        );
                    }
                    const isActive = activeSection === item.id;
                    return (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={`nav-link ${isActive ? 'active' : ''}`}
                            onClick={() => setIsOpen(false)}
                        >
                            <span className="nav-num">{item.num}</span>
                            <span>{item.label}</span>
                        </a>
                    );
                })}
            </nav>
        </>
    );
}
