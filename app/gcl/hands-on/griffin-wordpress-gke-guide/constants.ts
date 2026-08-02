export interface NavItem {
    id: string;
    icon: string;
    label: string;
    group?: string;
}

export const NAV_ITEMS: NavItem[] = [
    { id: 'overview', icon: 'ti-book', label: 'このガイドについて' },
    { id: 'architecture', icon: 'ti-sitemap', label: '全体アーキテクチャ' },
    { id: 'task-flow', icon: 'ti-git-branch', label: 'タスクの全体フロー' },
    { id: 'standards', icon: 'ti-list-check', label: '事前準備・標準' },
    { id: 'task-1', icon: 'ti-network', label: 'Task1 開発VPC', group: 'タスク別解説' },
    { id: 'task-2', icon: 'ti-network', label: 'Task2 本番VPC', group: 'タスク別解説' },
    { id: 'task-3', icon: 'ti-server-2', label: 'Task3 踏み台ホスト', group: 'タスク別解説' },
    { id: 'task-4', icon: 'ti-database', label: 'Task4 Cloud SQL', group: 'タスク別解説' },
    { id: 'task-5', icon: 'ti-brand-kubernetes', label: 'Task5 GKEクラスタ', group: 'タスク別解説' },
    { id: 'task-6', icon: 'ti-lock', label: 'Task6 クラスタ準備', group: 'タスク別解説' },
    { id: 'task-7', icon: 'ti-brand-wordpress', label: 'Task7 WordPress', group: 'タスク別解説' },
    { id: 'task-8', icon: 'ti-activity', label: 'Task8 モニタリング', group: 'タスク別解説' },
    { id: 'task-9', icon: 'ti-users', label: 'Task9 IAM権限付与', group: 'タスク別解説' },
    { id: 'summary', icon: 'ti-table', label: 'まとめ表', group: 'まとめ' },
    { id: 'references', icon: 'ti-link', label: '参考文献一覧', group: 'まとめ' },
    { id: 'conclusion', icon: 'ti-flag-3', label: '総括', group: 'まとめ' },
];

export const DIAGRAMS: Record<string, string> = {
    'mermaid-architecture': `flowchart TB
    USER["利用者のブラウザ"]

    subgraph PROD["griffin-prod-vpc / 本番用VPC"]
        PRODMGMT["griffin-prod-mgmt<br/>192.168.64.0/20"]
        PRODWP["griffin-prod-wp<br/>192.168.48.0/20"]
    end

    subgraph DEV["griffin-dev-vpc / 開発用VPC"]
        DEVMGMT["griffin-dev-mgmt<br/>192.168.32.0/20"]
        DEVWP["griffin-dev-wp<br/>192.168.16.0/20"]
        GKE["GKEクラスタ griffin-dev<br/>e2-standard-4 x 2ノード"]
        SQL[("Cloud SQL<br/>griffin-dev-db / MySQL")]
    end

    BASTION["踏み台ホスト griffin-bastion<br/>NIC 2枚 / 外部IPなし推奨"]
    LB(["外部ロードバランサ<br/>Service type LoadBalancer"])

    BASTION --- DEVMGMT
    BASTION --- PRODMGMT
    DEVWP --- GKE
    GKE -- "Cloud SQL Auth Proxy サイドカー" --- SQL
    USER --> LB --> GKE`,

    'mermaid-taskflow': `flowchart LR
    T1["Task1<br/>開発VPC作成"] --> T2["Task2<br/>本番VPC作成"]
    T2 --> T3["Task3<br/>踏み台ホスト作成"]
    T3 --> T4["Task4<br/>Cloud SQL作成"]
    T4 --> T5["Task5<br/>GKEクラスタ作成"]
    T5 --> T6["Task6<br/>クラスタ準備<br/>Secret / Volume"]
    T6 --> T7["Task7<br/>WordPressデプロイ"]
    T7 --> T8["Task8<br/>死活監視設定"]
    T8 --> T9["Task9<br/>追加エンジニア権限付与"]`,

    'mermaid-task6': `flowchart TB
    subgraph POD["Pod (Deployment: wordpress)"]
        WP["wordpressコンテナ"]
        PROXY["cloud-sql-proxyコンテナ（サイドカー）"]
        VOL[("Persistent Volume<br/>wp-pv-claim")]
    end

    SEC1[["Secret: cloudsql<br/>username / password"]]
    SEC2[["Secret: cloudsql-instance-credentials<br/>key.json"]]
    SQL[("Cloud SQL<br/>griffin-dev-db")]

    SEC1 -. 環境変数として注入 .-> WP
    SEC2 -. マウント .-> PROXY
    WP -- "localhost:3306" --> PROXY
    PROXY -- 暗号化コネクション --> SQL
    WP --- VOL`,
};
