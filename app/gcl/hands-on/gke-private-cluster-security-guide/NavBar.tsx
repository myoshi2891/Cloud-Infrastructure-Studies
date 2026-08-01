'use client';

import React from 'react';

interface NavBarProps {
    activeId?: string;
}

export const NavBar: React.FC<NavBarProps> = ({ activeId }) => {
    const navItems = [
        { id: 'overview', icon: 'ti-sitemap', label: '全体像' },
        { id: 'task1', icon: 'ti-shield-lock', label: 'Task 1 カスタムロール' },
        { id: 'task2', icon: 'ti-user-square-rounded', label: 'Task 2 サービスアカウント' },
        { id: 'task3', icon: 'ti-link', label: 'Task 3 ロールバインド' },
        { id: 'task4', icon: 'ti-lock', label: 'Task 4 プライベートクラスタ' },
        { id: 'task5', icon: 'ti-rocket', label: 'Task 5 デプロイと検証' },
        { id: 'troubleshooting', icon: 'ti-alert-triangle', label: 'よくあるつまずき' },
        { id: 'summary', icon: 'ti-checklist', label: 'まとめ' },
        { id: 'references', icon: 'ti-books', label: '参考文献' },
    ];

    return (
        <nav className="sidebar" aria-label="ページ内目次">
            <p className="sidebar-title">Challenge lab guide</p>
            <p className="sidebar-subtitle">Implement Cloud Security Fundamentals</p>
            <ul className="nav-list">
                {navItems.map((item) => {
                    const isActive = activeId === item.id;
                    return (
                        <li key={item.id}>
                            <a
                                href={`#${item.id}`}
                                className={isActive ? 'active' : ''}
                            >
                                <i className={`ti ${item.icon}`} />
                                {item.label}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};
