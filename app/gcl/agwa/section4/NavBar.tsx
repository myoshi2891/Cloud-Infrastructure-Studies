'use client';

import { useEffect, useState } from 'react';

const NAV_ITEMS = [
    { id: 'この章について', text: 'この章について', level: 'h2' },
    { id: '41-ユーザーアクセスの保護', text: '4.1 ユーザーアクセスの保護', level: 'h2' },
    { id: '411-強力なパスワードポリシーと2svルールの適用', text: '4.1.1 強力なパスワードポリシーと2SVルールの適用', level: 'h3' },
    { id: '412-パスワードポリシーと復旧オプションの設定', text: '4.1.2 パスワードポリシーと復旧オプションの設定', level: 'h3' },
    { id: '413-2sv方式の設定', text: '4.1.3 2SV方式の設定', level: 'h3' },
    { id: '414-コンテキストアウェアアクセスの使用場面', text: '4.1.4 コンテキストアウェアアクセスの使用場面', level: 'h3' },
    { id: '415-ユーザーとグループへのセキュリティポリシー適用', text: '4.1.5 ユーザーとグループへのセキュリティポリシー適用', level: 'h3' },
    { id: '416-管理者ロールの割り当てとタスクの委任', text: '4.1.6 管理者ロールの割り当てとタスクの委任', level: 'h3' },
    { id: '417-google-session-controlによるユーザーサインアウト設定', text: '4.1.7 Google Session Controlによるユーザーサインアウト設定', level: 'h3' },
    { id: '42-セキュリティリスクとイベントのレポート監査調査', text: '4.2 セキュリティリスクとイベントのレポート・監査・調査', level: 'h2' },
    { id: '421-監査と調査ツールによるログの調査分析', text: '4.2.1 監査と調査ツールによるログの調査分析', level: 'h3' },
    { id: '422-セキュリティセンターによるリスク脅威の特定', text: '4.2.2 セキュリティセンターによるリスク・脅威の特定', level: 'h3' },
    { id: '423-セキュリティ健全性ページによる設定ギャップの特定', text: '4.2.3 セキュリティ健全性ページによる設定ギャップの特定', level: 'h3' },
    { id: '424-アクティビティルールとアラートの作成', text: '4.2.4 アクティビティルールとアラートの作成', level: 'h3' },
    { id: '43-追加のgoogleおよびサードパーティアプリケーションの有効化', text: '4.3 追加のGoogleおよびサードパーティアプリケーションの有効化', level: 'h2' },
    { id: '431-marketplaceアローリストの管理', text: '4.3.1 Marketplaceアローリストの管理', level: 'h3' },
    { id: '432-marketplaceとplayストアアプリのデプロイと制限', text: '4.3.2 MarketplaceとPlayストアアプリのデプロイと制限', level: 'h3' },
    { id: '433-サードパーティアプリケーションでのsso設定', text: '4.3.3 サードパーティアプリケーションでのSSO設定', level: 'h3' },
    { id: '434-特定ユーザーへの追加googleサービスのアクセス管理', text: '4.3.4 特定ユーザーへの追加Googleサービスのアクセス管理', level: 'h3' },
    { id: '435-接続済みアプリケーションとサイトの削除', text: '4.3.5 接続済みアプリケーションとサイトの削除', level: 'h3' },
    { id: '試験対策チェックリスト', text: '試験対策チェックリスト', level: 'h2' },
    { id: '参考文献', text: '参考文献', level: 'h2' },
] as const;

const NAV_LEVEL_CLASSES: Record<(typeof NAV_ITEMS)[number]['level'], string> = {
    h2: 'nav-h2',
    h3: 'nav-h3',
};

/**
 * Section 4 の目次を提供し、現在位置を示す activeId とモバイル表示の isOpen を管理する。
 */
export function NavBar() {
    const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0].id);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        const activateLastItemAtBottom = () => {
            const isBottom = window.innerHeight + window.scrollY
                >= document.documentElement.scrollHeight - 100;
            const lastItem = NAV_ITEMS.at(-1);
            if (isBottom && lastItem) {
                setActiveId(lastItem.id);
                return true;
            }

            return false;
        };

        const observer = new IntersectionObserver(
            (entries) => {
                if (activateLastItemAtBottom()) return;

                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-15% 0px -75% 0px', threshold: 0 }
        );

        NAV_ITEMS.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        });

        window.addEventListener('scroll', activateLastItemAtBottom, { passive: true });

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', activateLastItemAtBottom);
        };
    }, []);

    const handleClick = (id: string) => {
        setIsOpen(false);
        const el = document.getElementById(id);
        if (el) {
            setActiveId(id);
            el.scrollIntoView({ behavior: 'smooth' });
            el.focus({ preventScroll: true });
            window.history.pushState(null, '', `#${id}`);
        }
    };

    return (
        <>
            <button
                type="button"
                className="sidebar-toggle"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="目次メニュー切替"
                aria-expanded={isOpen}
                aria-controls="sidebar"
            >
                ☰
            </button>
            <aside className={`sidebar ${isOpen ? 'open' : ''}`} id="sidebar">
                <div className="sidebar-brand">Associate Google Workspace Administrator</div>
                <div className="sidebar-title">Section 4: セキュリティポリシーとアクセス制御</div>
                <nav className="toc" id="tocNav" aria-label="AGWA Section 4の目次">
                    <ul className="toc-list">
                        {NAV_ITEMS.map((item) => (
                            <li key={item.id}>
                            <a
                                href={`#${item.id}`}
                                className={`nav-link ${NAV_LEVEL_CLASSES[item.level]} ${activeId === item.id ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleClick(item.id);
                                }}
                            >
                                {item.text}
                            </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    );
}
