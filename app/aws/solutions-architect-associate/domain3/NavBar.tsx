'use client';

import { useEffect, useState } from 'react';

const NAV_ITEMS = [
    {
        id: '_1',
        title: 'この章で学ぶこと',
        subs: [{ id: '3', title: 'ドメイン3の全体像' }],
    },
    {
        id: 'task-31',
        title: 'Task 3.1: 高性能・スケーラブルなストレージ',
        subs: [
            { id: '_3', title: '出題される知識・スキル項目（公式）' },
            { id: '311-3', title: '3.1.1 ストレージ3種類の基本特性' },
            { id: '_4', title: 'ストレージ選定の判断フロー' },
            { id: '312-amazon-s3', title: '3.1.2 Amazon S3: ストレージクラスとライフサイクル管理' },
            { id: 's3', title: 'S3ライフサイクルポリシーによる自動階層化' },
            { id: '313-amazon-ebs', title: '3.1.3 Amazon EBS: ボリュームタイプの選択' },
            { id: '314-amazon-efs', title: '3.1.4 Amazon EFS: 弾力性のある共有ファイルストレージ' },
            { id: '315-aws-storage-gateway', title: '3.1.5 ハイブリッドストレージ: AWS Storage Gateway' },
        ],
    },
    {
        id: 'task-32',
        title: 'Task 3.2: 高性能で弾力性のあるコンピューティング',
        subs: [
            { id: '_5', title: '出題される知識・スキル項目（公式）' },
            { id: '321', title: '3.2.1 コンピューティングサービスの全体マップ' },
            { id: '322-ec2-auto-scaling', title: '3.2.2 EC2 Auto Scalingによる弾力性の実現' },
            { id: '323-aws-lambda', title: '3.2.3 サーバーレスコンピューティング: AWS Lambda' },
            { id: '324-ecs-vs-eks-vs-fargate', title: '3.2.4 コンテナオーケストレーション: ECS vs EKS vs Fargate' },
            { id: '325', title: '3.2.5 ワークロードの疎結合化: キューイングとパブリッシュ/サブスクライブ' },
        ],
    },
    {
        id: 'task-33',
        title: 'Task 3.3: 高性能なデータベースソリューション',
        subs: [
            { id: '_6', title: '出題される知識・スキル項目（公式）' },
            { id: '331', title: '3.3.1 データベースタイプの選択フロー' },
            { id: '332-amazon-rds-az', title: '3.3.2 Amazon RDS: マルチAZ配置と読み取りレプリカ' },
            { id: '333-amazon-aurora', title: '3.3.3 Amazon Aurora: クラウドネイティブなストレージアーキテクチャ' },
            { id: '334-vs', title: '3.3.4 データベースエンジンの移行: 同種間 vs 異種間' },
            { id: '335-amazon-dynamodb', title: '3.3.5 Amazon DynamoDB: キャパシティモードとアクセスパターン' },
            { id: '336-amazon-elasticache', title: '3.3.6 キャッシング戦略: Amazon ElastiCache' },
            { id: '337-amazon-rds-proxy', title: '3.3.7 データベース接続とプロキシ: Amazon RDS Proxy' },
        ],
    },
    {
        id: 'task-34',
        title: 'Task 3.4: 高性能・スケーラブルなネットワーク',
        subs: [
            { id: '_7', title: '出題される知識・スキル項目（公式）' },
            { id: '341-vpc', title: '3.4.1 VPCのマルチティア・サブネット設計' },
            { id: '342', title: '3.4.2 ロードバランシング戦略の選択' },
            { id: 'alb', title: 'ALBによるパスベース/ホストベースルーティング' },
            { id: '343-cloudfront-global-accelerator', title: '3.4.3 エッジネットワーキング: CloudFront と Global Accelerator' },
            { id: '344-vpndirect-connectprivatelink', title: '3.4.4 ハイブリッド接続: VPN・Direct Connect・PrivateLink' },
        ],
    },
    {
        id: 'task-35',
        title: 'Task 3.5: 高性能なデータ取り込み・変換',
        subs: [
            { id: '_8', title: '出題される知識・スキル項目（公式）' },
            { id: '351', title: '3.5.1 データレイクアーキテクチャの全体像' },
            { id: '352-amazon-kinesis', title: '3.5.2 ストリーミングデータの取り込み: Amazon Kinesis' },
            { id: '353-vs', title: '3.5.3 バッチ vs ストリーミング: 取り込み頻度の設計' },
            { id: '354-aws-glue-etl', title: '3.5.4 データ変換: AWS Glue ETLとフォーマット変換' },
            { id: '355-datasync-storage-gateway', title: '3.5.5 データ転送: DataSync と Storage Gateway の使い分け' },
        ],
    },
    {
        id: '_9',
        title: '参考文献',
        subs: [
            { id: '_10', title: '試験ガイド（公式）' },
            { id: 'task-31_1', title: 'Task 3.1: ストレージ関連' },
            { id: 'task-32_1', title: 'Task 3.2: コンピューティング関連' },
            { id: 'task-33_1', title: 'Task 3.3: データベース関連' },
            { id: 'task-34_1', title: 'Task 3.4: ネットワーク関連' },
            { id: 'task-35_1', title: 'Task 3.5: データ分析・取り込み関連' },
        ],
    },
];

export function NavBar() {
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        const allIds = NAV_ITEMS.flatMap((item) => [
            item.id,
            ...item.subs.map((s) => s.id),
        ]);

        const elements = allIds
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null);

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
                rootMargin: '-100px 0px -65% 0px',
                threshold: 0.1,
            }
        );

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <nav className="sidebar" aria-label="ページ内目次">
            <div className="brand">
                <span className="tag">AWS SAA-C03</span>
                <span className="title">ドメイン3: 高性能なアーキテクチャの設計</span>
            </div>
            <ul className="nav-tree">
                {NAV_ITEMS.map((item) => (
                    <li key={item.id}>
                        <a
                            href={`#${item.id}`}
                            className={`nav-l2 ${activeId === item.id ? 'active' : ''}`}
                        >
                            {item.title}
                        </a>
                        {item.subs.length > 0 && (
                            <ul className="nav-sub">
                                {item.subs.map((sub) => (
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
    );
}
