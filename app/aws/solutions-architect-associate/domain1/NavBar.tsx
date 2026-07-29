'use client';

import { useEffect, useState } from 'react';

interface NavBarProps {
    activeId: string;
}

/**
 * Renders a toggleable sidebar navigation menu for the guide.
 *
 * @param activeId - The identifier of the currently active navigation section.
 */
export function NavBar({ activeId }: NavBarProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <>
            <button
                type="button"
                id="sidebar-toggle"
                aria-label="目次を開閉する"
                aria-expanded={isOpen}
                onClick={toggleSidebar}
            >
                {isOpen ? '✕' : '☰'}
            </button>

            <aside id="sidebar" className={isOpen ? 'open' : ''}>
                <div className="sidebar-eyebrow">AWS Certified Solutions Architect — Associate</div>
                <div className="sidebar-title">SAA-C03 完全ガイド</div>
                <div className="sidebar-subtitle">
                    ドメイン1: セキュアなアーキテクチャの設計(配点30%)
                </div>

                <nav aria-label="目次">
                    <ul>
                        <li className="nav-domain">
                            <a
                                href="#overview"
                                className={activeId === 'overview' || activeId.startsWith('overview-') ? 'active' : ''}
                                onClick={handleLinkClick}
                            >
                                1. ドメイン1の全体像
                            </a>
                            <ul className="nav-sub">
                                <li>
                                    <a
                                        href="#overview-weight"
                                        className={activeId === 'overview-weight' ? 'active' : ''}
                                        onClick={handleLinkClick}
                                    >
                                        1.1 試験における位置づけ
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#overview-tasks"
                                        className={activeId === 'overview-tasks' ? 'active' : ''}
                                        onClick={handleLinkClick}
                                    >
                                        1.2 3つのタスクの関係
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-domain">
                            <a
                                href="#task1"
                                className={activeId === 'task1' || activeId.startsWith('t1-') ? 'active' : ''}
                                onClick={handleLinkClick}
                            >
                                2. タスク1.1: 安全なアクセス設計
                            </a>
                            <ul className="nav-sub">
                                <li>
                                    <a
                                        href="#t1-shared"
                                        className={activeId === 't1-shared' ? 'active' : ''}
                                        onClick={handleLinkClick}
                                    >
                                        2.1 共有責任モデル
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#t1-iam"
                                        className={activeId === 't1-iam' ? 'active' : ''}
                                        onClick={handleLinkClick}
                                    >
                                        2.2 IAMの基本構成要素
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#t1-least"
                                        className={activeId === 't1-least' ? 'active' : ''}
                                        onClick={handleLinkClick}
                                    >
                                        2.3 最小権限とポリシー評価
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#t1-root"
                                        className={activeId === 't1-root' ? 'active' : ''}
                                        onClick={handleLinkClick}
                                    >
                                        2.4 ルートユーザーの保護
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#t1-idc"
                                        className={activeId === 't1-idc' ? 'active' : ''}
                                        onClick={handleLinkClick}
                                    >
                                        2.5 Identity Centerとフェデレーション
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#t1-sts"
                                        className={activeId === 't1-sts' ? 'active' : ''}
                                        onClick={handleLinkClick}
                                    >
                                        2.6 STSとクロスアカウント
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#t1-org"
                                        className={activeId === 't1-org' ? 'active' : ''}
                                        onClick={handleLinkClick}
                                    >
                                        2.7 マルチアカウント戦略
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#t1-resource"
                                        className={activeId === 't1-resource' ? 'active' : ''}
                                        onClick={handleLinkClick}
                                    >
                                        2.8 リソースベースポリシー
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#t1-bp"
                                        className={activeId === 't1-bp' ? 'active' : ''}
                                        onClick={handleLinkClick}
                                    >
                                        2.9 タスク1.1 ベストプラクティス
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-domain">
                            <a
                                href="#task2"
                                className={activeId === 'task2' || activeId.startsWith('t2-') ? 'active' : ''}
                                onClick={handleLinkClick}
                            >
                                3. タスク1.2: 安全なワークロード
                            </a>
                            <ul className="nav-sub">
                                <li>
                                    <a
                                        href="#t2-vpc"
                                        className={activeId === 't2-vpc' ? 'active' : ''}
                                        onClick={handleLinkClick}
                                    >
                                        3.1 VPCの基本アーキテクチャ
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#t2-sgnacl"
                                        className={activeId === 't2-sgnacl' ? 'active' : ''}
                                        onClick={handleLinkClick}
                                    >
                                        3.2 SG vs NACL
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#t2-defense"
                                        className={activeId === 't2-defense' ? 'active' : ''}
                                        onClick={handleLinkClick}
                                    >
                                        3.3 多層防御
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#t2-waf"
                                        className={activeId === 't2-waf' ? 'active' : ''}
                                        onClick={handleLinkClick}
                                    >
                                        3.4 WAFとShield
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#t2-services"
                                        className={activeId === 't2-services' ? 'active' : ''}
                                        onClick={handleLinkClick}
                                    >
                                        3.5 GuardDuty/Macie/Cognito
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#t2-secrets"
                                        className={activeId === 't2-secrets' ? 'active' : ''}
                                        onClick={handleLinkClick}
                                    >
                                        3.6 Secrets Manager
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#t2-hybrid"
                                        className={activeId === 't2-hybrid' ? 'active' : ''}
                                        onClick={handleLinkClick}
                                    >
                                        3.7 VPN/Direct Connect
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#t2-bp"
                                        className={activeId === 't2-bp' ? 'active' : ''}
                                        onClick={handleLinkClick}
                                    >
                                        3.8 タスク1.2 ベストプラクティス
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-domain">
                            <a
                                href="#task3"
                                className={activeId === 'task3' || activeId.startsWith('t3-') ? 'active' : ''}
                                onClick={handleLinkClick}
                            >
                                4. タスク1.3: データセキュリティ
                            </a>
                            <ul className="nav-sub">
                                <li>
                                    <a
                                        href="#t3-basics"
                                        className={activeId === 't3-basics' ? 'active' : ''}
                                        onClick={handleLinkClick}
                                    >
                                        4.1 暗号化の基本
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#t3-kms"
                                        className={activeId === 't3-kms' ? 'active' : ''}
                                        onClick={handleLinkClick}
                                    >
                                        4.2 KMSとエンベロープ暗号化
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#t3-rotation"
                                        className={activeId === 't3-rotation' ? 'active' : ''}
                                        onClick={handleLinkClick}
                                    >
                                        4.3 キーローテーション
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#t3-acm"
                                        className={activeId === 't3-acm' ? 'active' : ''}
                                        onClick={handleLinkClick}
                                    >
                                        4.4 ACMとTLS
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#t3-classify"
                                        className={activeId === 't3-classify' ? 'active' : ''}
                                        onClick={handleLinkClick}
                                    >
                                        4.5 データ分類とガバナンス
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#t3-backup"
                                        className={activeId === 't3-backup' ? 'active' : ''}
                                        onClick={handleLinkClick}
                                    >
                                        4.6 バックアップとDR
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#t3-bp"
                                        className={activeId === 't3-bp' ? 'active' : ''}
                                        onClick={handleLinkClick}
                                    >
                                        4.7 タスク1.3 ベストプラクティス
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-domain">
                            <a
                                href="#exam-prep"
                                className={activeId === 'exam-prep' || activeId.startsWith('exam-') ? 'active' : ''}
                                onClick={handleLinkClick}
                            >
                                5. 試験対策シナリオ問題
                            </a>
                            <ul className="nav-sub">
                                <li>
                                    <a
                                        href="#exam-scenarios"
                                        className={activeId === 'exam-scenarios' ? 'active' : ''}
                                        onClick={handleLinkClick}
                                    >
                                        5.1 シナリオ型演習
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#exam-traps"
                                        className={activeId === 'exam-traps' ? 'active' : ''}
                                        onClick={handleLinkClick}
                                    >
                                        5.2 引っかけパターンと注意点
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#exam-summary"
                                        className={activeId === 'exam-summary' ? 'active' : ''}
                                        onClick={handleLinkClick}
                                    >
                                        5.3 直前チェックリスト
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </aside>
        </>
    );
}
