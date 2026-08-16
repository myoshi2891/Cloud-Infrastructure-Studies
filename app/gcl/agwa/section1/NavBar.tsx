'use client';

import { useEffect, useState } from 'react';

const NAV_ITEMS = [
    { id: 'この章の位置づけ', text: 'この章の位置づけ', level: 'h2' },
    { id: '11-ユーザーライフサイクルの管理', text: '1.1 ユーザーライフサイクルの管理', level: 'h2' },
    { id: '111-移行戦略とツールの選定', text: '1.1.1 移行戦略とツールの選定', level: 'h3' },
    { id: '112-手動でのユーザーアカウント作成', text: '1.1.2 手動でのユーザーアカウント作成', level: 'h3' },
    { id: '113-プロビジョニングデプロビジョニングの自動化', text: '1.1.3 プロビジョニング・デプロビジョニングの自動化', level: 'h3' },
    { id: '114-サードパーティidプロバイダによるプロビジョニングと認可', text: '1.1.4 サードパーティIDプロバイダによるプロビジョニングと認可', level: 'h3' },
    { id: '115-基本的なsaml-ssoの設定', text: '1.1.5 基本的なSAML SSOの設定', level: 'h3' },
    { id: '116-ファーストパーティ同期ツールのユースケース', text: '1.1.6 ファーストパーティ同期ツールのユースケース', level: 'h3' },
    { id: '117-ユーザー属性の変更', text: '1.1.7 ユーザー属性の変更', level: 'h3' },
    { id: '118-削除保留復元アーカイブ', text: '1.1.8 削除・保留・復元・アーカイブ', level: 'h3' },
    { id: '119-driveデータの所有権移転', text: '1.1.9 Driveデータの所有権移転', level: 'h3' },
    { id: '1110-ライセンス管理', text: '1.1.10 ライセンス管理', level: 'h3' },
    { id: '1111-パスワード管理', text: '1.1.11 パスワード管理', level: 'h3' },
    { id: '12-組織部門ouの設計と作成', text: '1.2 組織部門(OU)の設計と作成', level: 'h2' },
    { id: '121-ouとドメイングループの違い', text: '1.2.1 OUとドメイン・グループの違い', level: 'h3' },
    { id: '122-ou設計のベストプラクティス', text: '1.2.2 OU設計のベストプラクティス', level: 'h3' },
    { id: '123-ouの作成と管理', text: '1.2.3 OUの作成と管理', level: 'h3' },
    { id: '13-グループの管理', text: '1.3 グループの管理', level: 'h2' },
    { id: '131-グループ構造の設計', text: '1.3.1 グループ構造の設計', level: 'h3' },
    { id: '132-配布リストの作成と管理', text: '1.3.2 配布リストの作成と管理', level: 'h3' },
    { id: '133-collaborative-inbox共同トレイの作成と管理', text: '1.3.3 Collaborative Inbox(共同トレイ)の作成と管理', level: 'h3' },
    { id: '134-ダイナミックグループの作成と管理', text: '1.3.4 ダイナミックグループの作成と管理', level: 'h3' },
    { id: '135-セキュリティグループの作成管理適用', text: '1.3.5 セキュリティグループの作成・管理・適用', level: 'h3' },
    { id: '136-グループ種別の比較まとめ', text: '1.3.6 グループ種別の比較まとめ', level: 'h3' },
    { id: '14-ドメインの管理', text: '1.4 ドメインの管理', level: 'h2' },
    { id: '141-プライマリドメインとセカンダリドメインの追加検証', text: '1.4.1 プライマリドメインとセカンダリドメインの追加・検証', level: 'h3' },
    { id: '142-ドメインエイリアスの管理', text: '1.4.2 ドメインエイリアスの管理', level: 'h3' },
    { id: '15-建物とリソースの管理', text: '1.5 建物とリソースの管理', level: 'h2' },
    { id: '151-建物と部屋の一括作成', text: '1.5.1 建物と部屋の一括作成', level: 'h3' },
    { id: '152-新規リソースの作成管理', text: '1.5.2 新規リソースの作成・管理', level: 'h3' },
    { id: '153-リソース予約権限の設定', text: '1.5.3 リソース予約権限の設定', level: 'h3' },
    { id: '154-リソースの詳細機能featuresの作成', text: '1.5.4 リソースの詳細機能(Features)の作成', level: 'h3' },
    { id: 'まとめ実装チェックリスト', text: 'まとめ:実装チェックリスト', level: 'h2' },
    { id: '参考文献', text: '参考文献', level: 'h2' },
] as const;

export default function NavBar() {
    const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0].id);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveId(entry.target.id);
                });
            },
            { rootMargin: '-15% 0px -75% 0px', threshold: 0 },
        );

        NAV_ITEMS.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const sections = NAV_ITEMS.filter((item) => item.level === 'h2').map((item) => ({
        ...item,
        children: NAV_ITEMS.slice(
            NAV_ITEMS.indexOf(item) + 1,
            NAV_ITEMS.findIndex(
                (candidate, index) => index > NAV_ITEMS.indexOf(item) && candidate.level === 'h2',
            ) === -1
                ? NAV_ITEMS.length
                : NAV_ITEMS.findIndex(
                    (candidate, index) => index > NAV_ITEMS.indexOf(item) && candidate.level === 'h2',
                ),
        ).filter((candidate) => candidate.level === 'h3'),
    }));

    return (
        <>
            <button
                type="button"
                className="sidebar-toggle"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="目次メニュー切替"
            >
                &#9776;
            </button>
            <nav className={`sidebar ${isOpen ? 'open' : ''}`} id="sidebar">
                <div className="sidebar-brand">
                    Associate Google Workspace
                    <br />
                    Administrator
                </div>
                <div className="sidebar-sub">Section 1: ユーザー・ドメイン・ディレクトリ</div>
                <ul className="nav-list">
                    {sections.map((item) => (
                        <li key={item.id}>
                            <a
                                href={`#${item.id}`}
                                className={`nav-${item.level} ${activeId === item.id ? 'active' : ''}`}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.text}
                            </a>
                            {item.children.length > 0 && (
                                <ul className="nav-sublist">
                                    {item.children.map((child) => (
                                        <li key={child.id}>
                                            <a
                                                href={`#${child.id}`}
                                                className={`nav-${child.level} ${activeId === child.id ? 'active' : ''}`}
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {child.text}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
}
