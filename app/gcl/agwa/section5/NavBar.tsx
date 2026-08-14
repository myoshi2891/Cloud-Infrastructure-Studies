'use client';

import { useEffect, useState } from 'react';

const NAV_ITEMS = [
    { href: '#section-5の全体像', label: 'Section 5の全体像', level: 2 },
    { href: '#51-モバイルデバイスの管理', label: '5.1 モバイルデバイスの管理', level: 2 },
    {
        href: '#511-基本高度サードパーティ管理ソリューションの使い分け',
        label: '5.1.1 基本・高度・サードパーティ管理ソリューションの使い分け',
        level: 3,
    },
    {
        href: '#512-google基本モバイル管理によるセキュリティポリシーの適用',
        label: '5.1.2 Google基本モバイル管理によるセキュリティポリシーの適用',
        level: 3,
    },
    {
        href: '#513-登録済みデバイスの可視性と制御の維持会社所有byod',
        label: '5.1.3 登録済みデバイスの可視性と制御の維持（会社所有・BYOD）',
        level: 3,
    },
    {
        href: '#514-退職者のモバイルデバイスのオフボーディング',
        label: '5.1.4 退職者のモバイルデバイスのオフボーディング',
        level: 3,
    },
    { href: '#52-chromeブラウザの管理', label: '5.2 Chromeブラウザの管理', level: 2 },
    {
        href: '#521-chromeブラウザポリシーの適用オフラインアクセス更新ポリシー',
        label: '5.2.1 Chromeブラウザポリシーの適用（オフラインアクセス・更新ポリシー）',
        level: 3,
    },
    {
        href: '#522-ブラウザの登録とポリシーの適用',
        label: '5.2.2 ブラウザの登録とポリシーの適用',
        level: 3,
    },
    {
        href: '#523-拡張機能とアプリの管理',
        label: '5.2.3 拡張機能とアプリの管理',
        level: 3,
    },
    { href: '#学習チェックリスト', label: '学習チェックリスト', level: 2 },
    { href: '#参考文献', label: '参考文献', level: 2 },
    { href: '#google公式認定試験ガイド', label: 'Google公式（認定・試験ガイド）', level: 3 },
    {
        href: '#モバイルデバイス管理google-workspace-help--knowledgeworkspacegooglecom',
        label: 'モバイルデバイス管理（Google Workspace Help / knowledge.workspace.google.com）',
        level: 3,
    },
    {
        href: '#chromeブラウザ管理chrome-enterprise-and-education-help',
        label: 'Chromeブラウザ管理（Chrome Enterprise and Education Help）',
        level: 3,
    },
    { href: '#オフラインアクセスdrive--docs', label: 'オフラインアクセス（Drive & Docs）', level: 3 },
];

export default function NavBar() {
    const [activeHref, setActiveHref] = useState<string>('');

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        const navLinks = Array.from(document.querySelectorAll('.sidebar nav a'));
        if (navLinks.length === 0) return;

        const headingToHref = new Map<Element, string>();
        navLinks.forEach((a) => {
            const href = a.getAttribute('href');
            if (href) {
                const id = decodeURIComponent(href.slice(1));
                const el = document.getElementById(id);
                if (el) headingToHref.set(el, href);
            }
        });

        const targets = Array.from(headingToHref.keys());
        if (targets.length === 0) return;

        const spyObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const href = headingToHref.get(entry.target);
                        if (href) setActiveHref(href);
                    }
                });
            },
            { root: null, rootMargin: '-15% 0px -75% 0px', threshold: 0 }
        );

        targets.forEach((t) => spyObserver.observe(t));

        return () => spyObserver.disconnect();
    }, []);

    return (
        <div className="sidebar" id="sidebar">
            <div className="sidebar-brand">AGWA 試験対策ガイド</div>
            <div className="sidebar-title">Section 5: ブラウザとエンドポイントの管理</div>
            <nav>
                <ul>
                    {NAV_ITEMS.map((item) => (
                        <li key={item.href}>
                            <a
                                href={item.href}
                                className={`${item.level === 3 ? 'level-3' : ''} ${
                                    activeHref === item.href ? 'active' : ''
                                }`}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}
