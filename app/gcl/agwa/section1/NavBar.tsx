'use client';

import { useEffect, useState } from 'react';

export default function NavBar() {
    const [activeId, setActiveId] = useState<string>('この章の位置づけ');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        const navTargets = [
            'この章の位置づけ',
            '11-ユーザーライフサイクルの管理',
            '111-移行戦略とツールの選定',
            '112-手動でのユーザーアカウント作成',
            '113-プロビジョニングデプロビジョニングの自動化',
            '114-サードパーティidプロバイダによるプロビジョニングと認可',
            '115-基本的なsaml-ssoの設定',
            '116-ファーストパーティ同期ツールのユースケース',
            '117-ユーザー属性の変更',
            '118-削除保留復元アーカイブ',
            '119-driveデータの所有権移転',
            '1110-ライセンス管理',
            '1111-パスワード管理',
            '12-組織部門ouの設計と作成',
            '121-ouとドメイングループの違い',
            '122-ou設計のベストプラクティス',
            '123-ouの作成と管理',
            '13-グループの管理',
            '131-グループ構造の設計',
            '132-配布リストの作成と管理',
            '133-collaborative-inbox共同トレイの作成と管理',
            '134-ダイナミックグループの作成と管理',
            '135-セキュリティグループの作成管理適用',
            '136-グループ種別の比較まとめ',
            '14-ドメインの管理',
            '141-プライマリドメインとセカンダリドメインの追加検証',
            '142-ドメインエイリアスの管理',
            '15-建物とリソースの管理',
            '151-建物と部屋の一括作成',
            '152-新規リソースの作成管理',
            '153-リソース予約権限の設定',
            '154-リソースの詳細機能featuresの作成',
            'まとめ実装チェックリスト',
            '参考文献',
        ];

        const elements = navTargets
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-15% 0px -75% 0px', threshold: 0 }
        );

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <button
                className="sidebar-toggle"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="メニュー"
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
                    <li>
                        <a
                            href="#この章の位置づけ"
                            className={`nav-h2 ${activeId === 'この章の位置づけ' ? 'active' : ''}`}
                        >
                            この章の位置づけ
                        </a>
                    </li>
                    <li>
                        <a
                            href="#11-ユーザーライフサイクルの管理"
                            className={`nav-h2 ${activeId === '11-ユーザーライフサイクルの管理' ? 'active' : ''}`}
                        >
                            1.1 ユーザーライフサイクルの管理
                        </a>
                        <ul className="nav-sublist">
                            <li>
                                <a
                                    href="#111-移行戦略とツールの選定"
                                    className={`nav-h3 ${activeId === '111-移行戦略とツールの選定' ? 'active' : ''}`}
                                >
                                    1.1.1 移行戦略とツールの選定
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#112-手動でのユーザーアカウント作成"
                                    className={`nav-h3 ${activeId === '112-手動でのユーザーアカウント作成' ? 'active' : ''}`}
                                >
                                    1.1.2 手動でのユーザーアカウント作成
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#113-プロビジョニングデプロビジョニングの自動化"
                                    className={`nav-h3 ${activeId === '113-プロビジョニングデプロビジョニングの自動化' ? 'active' : ''}`}
                                >
                                    1.1.3 プロビジョニング・デプロビジョニングの自動化
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#114-サードパーティidプロバイダによるプロビジョニングと認可"
                                    className={`nav-h3 ${activeId === '114-サードパーティidプロバイダによるプロビジョニングと認可' ? 'active' : ''}`}
                                >
                                    1.1.4 サードパーティIDプロバイダによるプロビジョニングと認可
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#115-基本的なsaml-ssoの設定"
                                    className={`nav-h3 ${activeId === '115-基本的なsaml-ssoの設定' ? 'active' : ''}`}
                                >
                                    1.1.5 基本的なSAML SSOの設定
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#116-ファーストパーティ同期ツールのユースケース"
                                    className={`nav-h3 ${activeId === '116-ファーストパーティ同期ツールのユースケース' ? 'active' : ''}`}
                                >
                                    1.1.6 ファーストパーティ同期ツールのユースケース
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#117-ユーザー属性の変更"
                                    className={`nav-h3 ${activeId === '117-ユーザー属性の変更' ? 'active' : ''}`}
                                >
                                    1.1.7 ユーザー属性の変更
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#118-削除保留復元アーカイブ"
                                    className={`nav-h3 ${activeId === '118-削除保留復元アーカイブ' ? 'active' : ''}`}
                                >
                                    1.1.8 削除・保留・復元・アーカイブ
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#119-driveデータの所有権移転"
                                    className={`nav-h3 ${activeId === '119-driveデータの所有権移転' ? 'active' : ''}`}
                                >
                                    1.1.9 Driveデータの所有権移転
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#1110-ライセンス管理"
                                    className={`nav-h3 ${activeId === '1110-ライセンス管理' ? 'active' : ''}`}
                                >
                                    1.1.10 ライセンス管理
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#1111-パスワード管理"
                                    className={`nav-h3 ${activeId === '1111-パスワード管理' ? 'active' : ''}`}
                                >
                                    1.1.11 パスワード管理
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a
                            href="#12-組織部門ouの設計と作成"
                            className={`nav-h2 ${activeId === '12-組織部門ouの設計と作成' ? 'active' : ''}`}
                        >
                            1.2 組織部門(OU)の設計と作成
                        </a>
                        <ul className="nav-sublist">
                            <li>
                                <a
                                    href="#121-ouとドメイングループの違い"
                                    className={`nav-h3 ${activeId === '121-ouとドメイングループの違い' ? 'active' : ''}`}
                                >
                                    1.2.1 OUとドメイン・グループの違い
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#122-ou設計のベストプラクティス"
                                    className={`nav-h3 ${activeId === '122-ou設計のベストプラクティス' ? 'active' : ''}`}
                                >
                                    1.2.2 OU設計のベストプラクティス
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#123-ouの作成と管理"
                                    className={`nav-h3 ${activeId === '123-ouの作成と管理' ? 'active' : ''}`}
                                >
                                    1.2.3 OUの作成と管理
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a
                            href="#13-グループの管理"
                            className={`nav-h2 ${activeId === '13-グループの管理' ? 'active' : ''}`}
                        >
                            1.3 グループの管理
                        </a>
                        <ul className="nav-sublist">
                            <li>
                                <a
                                    href="#131-グループ構造の設計"
                                    className={`nav-h3 ${activeId === '131-グループ構造の設計' ? 'active' : ''}`}
                                >
                                    1.3.1 グループ構造の設計
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#132-配布リストの作成と管理"
                                    className={`nav-h3 ${activeId === '132-配布リストの作成と管理' ? 'active' : ''}`}
                                >
                                    1.3.2 配布リストの作成と管理
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#133-collaborative-inbox共同トレイの作成と管理"
                                    className={`nav-h3 ${activeId === '133-collaborative-inbox共同トレイの作成と管理' ? 'active' : ''}`}
                                >
                                    1.3.3 Collaborative Inbox(共同トレイ)の作成と管理
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#134-ダイナミックグループの作成と管理"
                                    className={`nav-h3 ${activeId === '134-ダイナミックグループの作成と管理' ? 'active' : ''}`}
                                >
                                    1.3.4 ダイナミックグループの作成と管理
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#135-セキュリティグループの作成管理適用"
                                    className={`nav-h3 ${activeId === '135-セキュリティグループの作成管理適用' ? 'active' : ''}`}
                                >
                                    1.3.5 セキュリティグループの作成・管理・適用
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#136-グループ種別の比較まとめ"
                                    className={`nav-h3 ${activeId === '136-グループ種別の比較まとめ' ? 'active' : ''}`}
                                >
                                    1.3.6 グループ種別の比較まとめ
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a
                            href="#14-ドメインの管理"
                            className={`nav-h2 ${activeId === '14-ドメインの管理' ? 'active' : ''}`}
                        >
                            1.4 ドメインの管理
                        </a>
                        <ul className="nav-sublist">
                            <li>
                                <a
                                    href="#141-プライマリドメインとセカンダリドメインの追加検証"
                                    className={`nav-h3 ${activeId === '141-プライマリドメインとセカンダリドメインの追加検証' ? 'active' : ''}`}
                                >
                                    1.4.1 プライマリドメインとセカンダリドメインの追加・検証
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#142-ドメインエイリアスの管理"
                                    className={`nav-h3 ${activeId === '142-ドメインエイリアスの管理' ? 'active' : ''}`}
                                >
                                    1.4.2 ドメインエイリアスの管理
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a
                            href="#15-建物とリソースの管理"
                            className={`nav-h2 ${activeId === '15-建物とリソースの管理' ? 'active' : ''}`}
                        >
                            1.5 建物とリソースの管理
                        </a>
                        <ul className="nav-sublist">
                            <li>
                                <a
                                    href="#151-建物と部屋の一括作成"
                                    className={`nav-h3 ${activeId === '151-建物と部屋の一括作成' ? 'active' : ''}`}
                                >
                                    1.5.1 建物と部屋の一括作成
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#152-新規リソースの作成管理"
                                    className={`nav-h3 ${activeId === '152-新規リソースの作成管理' ? 'active' : ''}`}
                                >
                                    1.5.2 新規リソースの作成・管理
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#153-リソース予約権限の設定"
                                    className={`nav-h3 ${activeId === '153-リソース予約権限の設定' ? 'active' : ''}`}
                                >
                                    1.5.3 リソース予約権限の設定
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#154-リソースの詳細機能featuresの作成"
                                    className={`nav-h3 ${activeId === '154-リソースの詳細機能featuresの作成' ? 'active' : ''}`}
                                >
                                    1.5.4 リソースの詳細機能(Features)の作成
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a
                            href="#まとめ実装チェックリスト"
                            className={`nav-h2 ${activeId === 'まとめ実装チェックリスト' ? 'active' : ''}`}
                        >
                            まとめ:実装チェックリスト
                        </a>
                    </li>
                    <li>
                        <a
                            href="#参考文献"
                            className={`nav-h2 ${activeId === '参考文献' ? 'active' : ''}`}
                        >
                            参考文献
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    );
}
