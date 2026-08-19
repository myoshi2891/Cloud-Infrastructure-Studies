/**
 * CompTIA Network+ Network Operations ガイドの定数定義
 */

export interface NavItem {
    id: string;
    title: string;
    icon: string;
    sectionLabel?: string;
}

export const NAV_ITEMS: NavItem[] = [
    {
        id: 'overview',
        title: '試験の全体像',
        icon: 'ti ti-list-check',
    },
    {
        id: 'domain-structure',
        title: 'ドメインの構成',
        icon: 'ti ti-sitemap',
    },
    {
        id: 'documentation',
        title: 'ドキュメンテーション',
        icon: 'ti ti-file-text',
        sectionLabel: 'ネットワークの運用',
    },
    {
        id: 'lifecycle',
        title: 'ライフサイクル管理',
        icon: 'ti ti-recycle',
    },
    {
        id: 'change-management',
        title: '変更管理',
        icon: 'ti ti-git-pull-request',
    },
    {
        id: 'config-management',
        title: '構成管理',
        icon: 'ti ti-settings',
    },
    {
        id: 'monitoring',
        title: 'ネットワーク監視',
        icon: 'ti ti-activity',
    },
    {
        id: 'disaster-recovery',
        title: '災害復旧',
        icon: 'ti ti-shield-check',
    },
    {
        id: 'network-services',
        title: 'ネットワークサービス',
        icon: 'ti ti-server-2',
    },
    {
        id: 'access-management',
        title: 'アクセスと管理',
        icon: 'ti ti-key',
    },
    {
        id: 'summary',
        title: '学習の進め方',
        icon: 'ti ti-checklist',
        sectionLabel: 'まとめ',
    },
    {
        id: 'references',
        title: '参考文献・出典',
        icon: 'ti ti-link',
    },
];

export type DiagramId =
    | 'diag-pie-domain'
    | 'diag-lifecycle'
    | 'diag-change-mgmt'
    | 'diag-config-mgmt'
    | 'diag-monitoring'
    | 'diag-dr'
    | 'diag-site-strategy'
    | 'diag-dhcp-dora'
    | 'diag-dns-resolve'
    | 'diag-access-mgmt';

export const DIAGRAMS: Record<DiagramId, string> = {
    'diag-pie-domain': `pie title CompTIA Network+ (N10-009) 出題ドメイン比率
    "ネットワークの概念 23%" : 23
    "ネットワークの実装 20%" : 20
    "ネットワークの運用 19%" : 19
    "ネットワークセキュリティ 14%" : 14
    "トラブルシューティング 24%" : 24`,

    'diag-lifecycle': `flowchart LR
    A["計画・調達"] --> B["導入・展開"]
    B --> C["運用・保守"]
    C --> D["EOL 新規販売終了"]
    D --> E["EOS サポート終了"]
    E --> F["廃棄・除却 Decommissioning"]
    classDef purple fill:#5b21b6,stroke:#ddd6fe,color:#ede9fe,stroke-width:1px;
    classDef coral fill:#9a3412,stroke:#fed7aa,color:#ffedd5,stroke-width:1px;
    classDef teal fill:#115e59,stroke:#99f6e4,color:#ccfbf1,stroke-width:1px;
    class A,B,C purple
    class D,E coral
    class F teal`,

    'diag-change-mgmt': `flowchart TD
    A["変更要求の起票"] --> B["影響範囲の評価"]
    B --> C["変更諮問委員会 CAB による審査"]
    C -->|承認| D["実施スケジュールの決定"]
    C -->|却下・差し戻し| A
    D --> E["ロールバック手順の準備"]
    E --> F["変更の実施"]
    F --> G["動作検証"]
    G --> H["結果の文書化"]
    classDef purple fill:#5b21b6,stroke:#ddd6fe,color:#ede9fe,stroke-width:1px;
    classDef coral fill:#9a3412,stroke:#fed7aa,color:#ffedd5,stroke-width:1px;
    classDef teal fill:#115e59,stroke:#99f6e4,color:#ccfbf1,stroke-width:1px;
    class A,B,D,E,F,G purple
    class C coral
    class H teal`,

    'diag-config-mgmt': `flowchart LR
    A["ベースライン構成 あるべき標準設定"] --> B["本番構成 Production Config"]
    B -. 差分を検知 .-> A
    B --> C["バックアップ構成 Backup Config"]
    C -->|障害・誤設定時に復元| B
    classDef purple fill:#5b21b6,stroke:#ddd6fe,color:#ede9fe,stroke-width:1px;
    classDef teal fill:#115e59,stroke:#99f6e4,color:#ccfbf1,stroke-width:1px;
    class A,C purple
    class B teal`,

    'diag-monitoring': `flowchart LR
    A["ネットワーク機器"] -->|SNMPポーリング| D["収集基盤 Collector"]
    A -->|フローデータ NetFlow/sFlow| D
    A -->|ポートミラーリング| E["パケットキャプチャ"]
    E --> D
    D --> F["ログ集約 Log Aggregation"]
    F --> G["API連携・ダッシュボード"]
    G --> H["ベースライン比較とアラート発報"]
    classDef purple fill:#5b21b6,stroke:#ddd6fe,color:#ede9fe,stroke-width:1px;
    classDef coral fill:#9a3412,stroke:#fed7aa,color:#ffedd5,stroke-width:1px;
    classDef teal fill:#115e59,stroke:#99f6e4,color:#ccfbf1,stroke-width:1px;
    class A,D,F,G purple
    class E coral
    class H teal`,

    'diag-dr': `flowchart LR
    A["直近のバックアップ取得"] -->|RPO 許容できるデータ損失期間| B["障害発生"]
    B -->|RTO 許容できる復旧時間の目標| C["サービス復旧完了"]
    C -->|MTTR 実際にかかった平均修復時間| D["通常運用へ復帰"]
    classDef purple fill:#5b21b6,stroke:#ddd6fe,color:#ede9fe,stroke-width:1px;
    classDef coral fill:#9a3412,stroke:#fed7aa,color:#ffedd5,stroke-width:1px;
    classDef teal fill:#115e59,stroke:#99f6e4,color:#ccfbf1,stroke-width:1px;
    class A purple
    class B coral
    class C,D teal`,

    'diag-site-strategy': `flowchart LR
    subgraph AA["アクティブ-アクティブ構成"]
    S1["サイトA 稼働中"] --- S2["サイトB 稼働中"]
    end
    subgraph AP["アクティブ-パッシブ構成"]
    S3["サイトA 稼働中"] --> S4["サイトB 待機系"]
    end
    classDef purple fill:#5b21b6,stroke:#ddd6fe,color:#ede9fe,stroke-width:1px;
    classDef teal fill:#115e59,stroke:#99f6e4,color:#ccfbf1,stroke-width:1px;
    classDef coral fill:#9a3412,stroke:#fed7aa,color:#ffedd5,stroke-width:1px;
    class S1,S2 purple
    class S3 teal
    class S4 coral`,

    'diag-dhcp-dora': `sequenceDiagram
    participant C as クライアント
    participant S as DHCPサーバー
    C->>S: DHCP Discover ブロードキャストで探索
    S->>C: DHCP Offer 利用可能なIPを提示
    C->>S: DHCP Request 提示されたIPの使用を要求
    S->>C: DHCP Ack 割り当てを確定`,

    'diag-dns-resolve': `sequenceDiagram
    participant Client as クライアント
    participant Resolver as キャッシュDNSサーバー
    participant Root as ルートサーバー
    participant TLD as TLDサーバー
    participant Auth as 権威DNSサーバー
    Client->>Resolver: 名前解決を問い合わせ
    Resolver->>Root: 問い合わせ
    Root-->>Resolver: TLDサーバーの案内
    Resolver->>TLD: 問い合わせ
    TLD-->>Resolver: 権威サーバーの案内
    Resolver->>Auth: 問い合わせ
    Auth-->>Resolver: IPアドレスを回答
    Resolver-->>Client: 結果をキャッシュして返却`,

    'diag-access-mgmt': `flowchart TD
    A["管理者"] -->|SSH 暗号化されたCLI接続| D["ネットワーク機器"]
    A -->|コンソール接続 帯域外管理| D
    A -->|GUI Webブラウザ管理画面| D
    A -->|API 自動化・スクリプト連携| D
    A -->|VPN経由でリモートアクセス| B["社内ネットワーク"]
    B --> D
    classDef purple fill:#5b21b6,stroke:#ddd6fe,color:#ede9fe,stroke-width:1px;
    classDef teal fill:#115e59,stroke:#99f6e4,color:#ccfbf1,stroke-width:1px;
    class A,D purple
    class B teal`,
};
