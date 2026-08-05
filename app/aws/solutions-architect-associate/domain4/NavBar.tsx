'use client';

import { useEffect, useState } from 'react';

const NAV_ITEMS = [
    {
        id: 'intro',
        title: 'はじめに',
        sub: [
            { id: 'このドメインの4つのタスク', title: '4つのタスク' }
        ]
    },
    {
        id: 'common-tools',
        title: '0. 全タスク共通: コスト管理',
        sub: [
            { id: '01-コスト管理ツールの全体像', title: '0.1 ツールの全体像' },
            { id: '02-各ツール機能の役割', title: '0.2 各ツールの役割' },
            { id: '03-ベストプラクティス共通', title: '0.3 ベストプラクティス' }
        ]
    },
    {
        id: 'task-4-1',
        title: 'Task 4.1: ストレージ',
        sub: [
            { id: '411-ストレージタイプの理解object--file--block', title: '4.1.1 ストレージタイプ' },
            { id: '412-s3ストレージクラスとライフサイクル管理ストレージ階層化', title: '4.1.2 S3階層化・ライフサイクル' },
            { id: '413-アクセスオプション-requester-pays', title: '4.1.3 Requester Pays' },
            { id: '414-ブロックストレージオプションebsボリュームタイプ', title: '4.1.4 EBSボリュームタイプ' },
            { id: '415-ハイブリッドストレージオプションオンプレミスとの連携', title: '4.1.5 ハイブリッドストレージ' },
            { id: '416-バックアップ戦略とデータライフサイクル', title: '4.1.6 バックアップ戦略' },
            { id: '417-task-41-ベストプラクティスまとめ', title: '4.1.7 まとめ' }
        ]
    },
    {
        id: 'task-4-2',
        title: 'Task 4.2: コンピューティング',
        sub: [
            { id: '421-ec2購入オプション', title: '4.2.1 購入オプション' },
            { id: '422-コンピューティングサービスの選択ec2--lambda--fargate', title: '4.2.2 サービス選択' },
            { id: '423-スケーリング戦略とec2-hibernate', title: '4.2.3 スケーリング・Hibernate' },
            { id: '424-ロードバランシング戦略', title: '4.2.4 ロードバランシング' },
            { id: '425-ハイブリッド分散コンピューティング', title: '4.2.5 エッジ/ハイブリッド' },
            { id: '426-task-42-ベストプラクティスまとめ', title: '4.2.6 まとめ' }
        ]
    },
    {
        id: 'task-4-3',
        title: 'Task 4.3: データベース',
        sub: [
            { id: '431-データベースタイプとサービスの選択', title: '4.3.1 DB選択' },
            { id: '432-データベースキャパシティプランニング', title: '4.3.2 キャパシティ' },
            { id: '433-データベース接続とプロキシ', title: '4.3.3 RDS Proxy' },
            { id: '434-データベースレプリケーション読み取りレプリカ', title: '4.3.4 レプリケーション' },
            { id: '435-キャッシング戦略', title: '4.3.5 キャッシング' },
            { id: '436-バックアップと保持ポリシー', title: '4.3.6 バックアップ' },
            { id: '437-データベース移行homogeneous--heterogeneous', title: '4.3.7 データベース移行' },
            { id: '438-task-43-ベストプラクティスまとめ', title: '4.3.8 まとめ' }
        ]
    },
    {
        id: 'task-4-4',
        title: 'Task 4.4: ネットワーク',
        sub: [
            { id: '441-natゲートウェイの配置戦略', title: '4.4.1 NAT配置' },
            { id: '442-ネットワーク接続オプションdirect-connect--vpn--インターネット', title: '4.4.2 接続オプション' },
            { id: '443-ネットワークルーティングトポロジーピアリング', title: '4.4.3 ルーティング' },
            { id: '444-データ転送コストの最小化', title: '4.4.4 データ転送コスト' },
            { id: '445-cdnエッジキャッシングの活用', title: '4.4.5 CloudFront/エッジ' },
            { id: '446-スロットリング戦略', title: '4.4.6 スロットリング' },
            { id: '447-task-44-ベストプラクティスまとめ', title: '4.4.7 まとめ' }
        ]
    },
    {
        id: 'matrix',
        title: '概念比較マトリクス'
    },
    {
        id: 'scenarios',
        title: '認定試験対策 シナリオ集'
    },
    {
        id: 'checklist',
        title: '自己診断チェックリスト'
    }
];

export function NavBar() {
    const [activeId, setActiveId] = useState<string>('intro');

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        const allIds = NAV_ITEMS.flatMap(item => [item.id, ...(item.sub?.map(s => s.id) || [])]);
        const elements = allIds.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <aside className="sidebar">
            <div className="brand">
                <span className="tag">AWS SAA-C03</span>
                <span className="title">ドメイン 4: コスト最適化</span>
            </div>
            <nav className="nav-tree">
                <ul>
                    {NAV_ITEMS.map((item) => (
                        <li key={item.id}>
                            <a
                                href={`#${item.id}`}
                                className={`nav-l2 ${activeId === item.id ? 'active' : ''}`}
                            >
                                {item.title}
                            </a>
                            {item.sub && (
                                <ul className="nav-sub">
                                    {item.sub.map((sub) => (
                                        <li key={sub.id}>
                                            <a
                                                href={`#${sub.id}`}
                                                className={`nav-l3 ${activeId === sub.id ? 'active' : ''}`}
                                            >
                                                {sub.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}
