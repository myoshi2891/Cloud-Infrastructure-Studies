'use client';

import { useEffect, useState } from 'react';

export function NavBar() {
    const [activeId, setActiveId] = useState<string>('sec-0');

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-100px 0px -60% 0px',
                threshold: 0.1,
            }
        );

        const sectionIds = [
            'sec-0', 'sec-0-1', 'sec-0-2',
            'sec-1', 'sec-1-1', 'sec-1-2', 'sec-1-3', 'sec-1-4', 'sec-1-5', 'sec-1-6', 'sec-1-7', 'sec-1-8', 'sec-1-9', 'sec-1-10', 'sec-1-11', 'sec-1-12',
            'sec-2', 'sec-2-1', 'sec-2-2', 'sec-2-3', 'sec-2-4', 'sec-2-5', 'sec-2-6', 'sec-2-7', 'sec-2-8', 'sec-2-9',
            'sec-3', 'sec-4',
        ];

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <nav className="sidebar" id="sidebar">
            <div className="brand">
                <span className="tag">AWS SAA-C03</span>
                <span className="title">
                    ドメイン2: 回復力のある
                    <br />
                    アーキテクチャの設計
                </span>
            </div>
            <ul className="nav-tree">
                <li>
                    <a
                        href="#sec-0"
                        className={`nav-l2 ${activeId.startsWith('sec-0') ? 'active' : ''}`}
                    >
                        0. このガイドについて
                    </a>
                    <ul className="nav-sub">
                        <li>
                            <a
                                href="#sec-0-1"
                                className={`nav-l3 ${activeId === 'sec-0-1' ? 'active' : ''}`}
                            >
                                SAA-C03 試験全体における位置づけ
                            </a>
                        </li>
                        <li>
                            <a
                                href="#sec-0-2"
                                className={`nav-l3 ${activeId === 'sec-0-2' ? 'active' : ''}`}
                            >
                                ドメイン2の2つのタスク
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a
                        href="#sec-1"
                        className={`nav-l2 ${activeId.startsWith('sec-1') ? 'active' : ''}`}
                    >
                        1. タスク2.1: スケーラブルで疎結合なアーキテクチャの設計
                    </a>
                    <ul className="nav-sub">
                        <li>
                            <a
                                href="#sec-1-1"
                                className={`nav-l3 ${activeId === 'sec-1-1' ? 'active' : ''}`}
                            >
                                マルチティア（多層）アーキテクチャの基本
                            </a>
                        </li>
                        <li>
                            <a
                                href="#sec-1-2"
                                className={`nav-l3 ${activeId === 'sec-1-2' ? 'active' : ''}`}
                            >
                                疎結合アーキテクチャとメッセージング（SQS / SNS / EventBridge）
                            </a>
                        </li>
                        <li>
                            <a
                                href="#sec-1-3"
                                className={`nav-l3 ${activeId === 'sec-1-3' ? 'active' : ''}`}
                            >
                                API の作成・公開・管理（Amazon API Gateway）
                            </a>
                        </li>
                        <li>
                            <a
                                href="#sec-1-4"
                                className={`nav-l3 ${activeId === 'sec-1-4' ? 'active' : ''}`}
                            >
                                水平スケーリングと垂直スケーリング（EC2 Auto Scaling）
                            </a>
                        </li>
                        <li>
                            <a
                                href="#sec-1-5"
                                className={`nav-l3 ${activeId === 'sec-1-5' ? 'active' : ''}`}
                            >
                                ロードバランシングの概念（ALB / NLB / GWLB）
                            </a>
                        </li>
                        <li>
                            <a
                                href="#sec-1-6"
                                className={`nav-l3 ${activeId === 'sec-1-6' ? 'active' : ''}`}
                            >
                                キャッシング戦略（CloudFront / ElastiCache / DAX）
                            </a>
                        </li>
                        <li>
                            <a
                                href="#sec-1-7"
                                className={`nav-l3 ${activeId === 'sec-1-7' ? 'active' : ''}`}
                            >
                                サーバーレス技術とコンピューティングの選択
                            </a>
                        </li>
                        <li>
                            <a
                                href="#sec-1-8"
                                className={`nav-l3 ${activeId === 'sec-1-8' ? 'active' : ''}`}
                            >
                                コンテナの移行とオーケストレーション（ECS / EKS）
                            </a>
                        </li>
                        <li>
                            <a
                                href="#sec-1-9"
                                className={`nav-l3 ${activeId === 'sec-1-9' ? 'active' : ''}`}
                            >
                                マイクロサービス設計原則：ステートレス vs ステートフル
                            </a>
                        </li>
                        <li>
                            <a
                                href="#sec-1-10"
                                className={`nav-l3 ${activeId === 'sec-1-10' ? 'active' : ''}`}
                            >
                                イベント駆動とワークフロー（AWS Step Functions）
                            </a>
                        </li>
                        <li>
                            <a
                                href="#sec-1-11"
                                className={`nav-l3 ${activeId === 'sec-1-11' ? 'active' : ''}`}
                            >
                                ストレージタイプの選択（S3 / EBS / EFS）
                            </a>
                        </li>
                        <li>
                            <a
                                href="#sec-1-12"
                                className={`nav-l3 ${activeId === 'sec-1-12' ? 'active' : ''}`}
                            >
                                リードレプリカによる読み取りスケーリング
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a
                        href="#sec-2"
                        className={`nav-l2 ${activeId.startsWith('sec-2') ? 'active' : ''}`}
                    >
                        2. タスク2.2: 高可用性・フォールトトレラントなアーキテクチャの設計
                    </a>
                    <ul className="nav-sub">
                        <li>
                            <a
                                href="#sec-2-1"
                                className={`nav-l3 ${activeId === 'sec-2-1' ? 'active' : ''}`}
                            >
                                AWSグローバルインフラストラクチャ
                            </a>
                        </li>
                        <li>
                            <a
                                href="#sec-2-2"
                                className={`nav-l3 ${activeId === 'sec-2-2' ? 'active' : ''}`}
                            >
                                障害復旧（ディザスタリカバリ）戦略と RPO / RTO
                            </a>
                        </li>
                        <li>
                            <a
                                href="#sec-2-3"
                                className={`nav-l3 ${activeId === 'sec-2-3' ? 'active' : ''}`}
                            >
                                フェイルオーバー戦略（Route 53 ルーティング）
                            </a>
                        </li>
                        <li>
                            <a
                                href="#sec-2-4"
                                className={`nav-l3 ${activeId === 'sec-2-4' ? 'active' : ''}`}
                            >
                                分散設計パターンとイミュータブルインフラ
                            </a>
                        </li>
                        <li>
                            <a
                                href="#sec-2-5"
                                className={`nav-l3 ${activeId === 'sec-2-5' ? 'active' : ''}`}
                            >
                                データベース回復性の向上（Amazon RDS Proxy）
                            </a>
                        </li>
                        <li>
                            <a
                                href="#sec-2-6"
                                className={`nav-l3 ${activeId === 'sec-2-6' ? 'active' : ''}`}
                            >
                                ストレージの耐久性とレプリケーション設計
                            </a>
                        </li>
                        <li>
                            <a
                                href="#sec-2-7"
                                className={`nav-l3 ${activeId === 'sec-2-7' ? 'active' : ''}`}
                            >
                                サービスクォータとスロットリング
                            </a>
                        </li>
                        <li>
                            <a
                                href="#sec-2-8"
                                className={`nav-l3 ${activeId === 'sec-2-8' ? 'active' : ''}`}
                            >
                                ワークロードの可視性（AWS X-Ray）
                            </a>
                        </li>
                        <li>
                            <a
                                href="#sec-2-9"
                                className={`nav-l3 ${activeId === 'sec-2-9' ? 'active' : ''}`}
                            >
                                レガシー・クラウド非対応アプリの信頼性向上
                            </a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a
                        href="#sec-3"
                        className={`nav-l2 ${activeId === 'sec-3' ? 'active' : ''}`}
                    >
                        3. 出題頻出ポイント チェックリスト
                    </a>
                </li>
                <li>
                    <a
                        href="#sec-4"
                        className={`nav-l2 ${activeId === 'sec-4' ? 'active' : ''}`}
                    >
                        4. 参考文献・出典一覧
                    </a>
                </li>
            </ul>
        </nav>
    );
}
