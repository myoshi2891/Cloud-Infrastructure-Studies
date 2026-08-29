/**
 * Accelerate ガイド用の定数定義
 * Mermaidダイアグラム、ナビゲーション項目、統計情報など
 */

export type DiagramId =
    | 'causalChain'
    | 'doraMetrics'
    | 'capabilitiesOverview'
    | 'ciCdPipeline'
    | 'roadmapPhases'
    | 'aiAmplifier';

export interface NavItem {
    id: string;
    label: string;
    icon: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
    { id: 'what-is-accelerate', label: '1. Accelerateとは何か', icon: 'ti ti-certificate' },
    { id: 'why-lean', label: '2. なぜLeanなのか', icon: 'ti ti-building-bank' },
    { id: 'dora-metrics', label: '3. DORAメトリクス', icon: 'ti ti-chart-pie' },
    { id: 'capabilities-24', label: '4. 24の能力', icon: 'ti ti-list-check' },
    { id: 'westrum-culture', label: '5. Westrumモデル', icon: 'ti ti-users' },
    { id: 'step-by-step-guide', label: '6. 実践ステップガイド', icon: 'ti ti-route' },
    { id: 'ai-era-update-2026', label: '7. AI時代のアップデート', icon: 'ti ti-refresh' },
    { id: 'anti-patterns', label: '8. アンチパターン', icon: 'ti ti-alert-triangle' },
    { id: 'summary-checklist', label: '9. まとめ', icon: 'ti ti-flag-3' },
    { id: 'references', label: '10. 参考文献', icon: 'ti ti-link' },
] as const;

export interface StatItem {
    number: string;
    label: string;
}

export const STAT_ITEMS: readonly StatItem[] = [
    { number: '2018年', label: 'Accelerate 出版年' },
    { number: '24', label: '検証済みの能力 Capabilities' },
    { number: '5指標', label: '現行の DORA メトリクス' },
    { number: '90%', label: 'AI導入率 (2025年DORA調査)' },
] as const;

export const DIAGRAMS: Record<DiagramId, string> = {
    causalChain: `flowchart TB
    A["Lean生産方式とアジャイルの原則"] --> B["24の能力 Capabilities"]
    B --> C["ソフトウェアデリバリのパフォーマンス"]
    C --> D["DORA 5指標で計測"]
    D --> E["組織パフォーマンス"]
    D --> F["従業員の燃え尽き低下"]
    E --> G["収益性 市場シェア 顧客満足度"]

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A hub;
    class B,C,D,E,F box;
    class G done;`,

    doraMetrics: `flowchart TB
    subgraph TP["スループット指標"]
        direction TB
        A["デプロイ頻度"]
        B["変更のリードタイム"]
        D["失敗したデプロイの復旧時間"]
    end
    subgraph ST["不安定性指標"]
        direction TB
        C["変更失敗率"]
        E["デプロイのリワーク率"]
    end
    TP ~~~ ST
    TP --> F["ソフトウェアデリバリのパフォーマンス"]
    ST --> F

    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    class A,B,C,D,E box;
    class F hub;`,

    capabilitiesOverview: `flowchart TB
    A["24の能力 Capabilities"] --> B["継続的デリバリ 8項目"]
    A --> C["アーキテクチャ 2項目"]
    A --> D["プロダクトとプロセス 4項目"]
    A --> E["リーン管理とモニタリング 5項目"]
    A --> F["組織文化 5項目"]
    B ~~~ C
    C ~~~ D
    D ~~~ E
    E ~~~ F

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    class A hub;
    class B,C,D,E,F box;`,

    ciCdPipeline: `flowchart TB
    A["小さく頻繁にトランクへコミット"] --> B["継続的インテグレーション 自動ビルドとテスト"]
    B --> C{"テストは成功したか"}
    C -->|はい| D["デプロイ可能な成果物"]
    C -->|いいえ| E["直ちに修正する"]
    E --> A
    D --> F["継続的デリバリパイプライン"]
    F --> G["自動デプロイ 本番環境"]
    G --> H["モニタリングとフィードバック"]
    H --> A

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A hub;
    class B,C,E,F,G,H box;
    class D done;`,

    roadmapPhases: `flowchart TB
    P1["フェーズ1 基盤整備 バージョン管理とテスト自動化"] --> P2["フェーズ2 技術プラクティス CI トランクベース開発 デプロイ自動化"]
    P2 --> P3["フェーズ3 疎結合アーキテクチャとチームの自律性"]
    P3 --> P4["フェーズ4 小さなバッチと顧客フィードバック"]
    P4 --> P5["フェーズ5 リーン管理 WIP制限と作業の可視化"]
    P5 --> P6["フェーズ6 生成的な組織文化の醸成"]
    P6 -.->|"継続的な計測と学習"| P1

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class P1 hub;
    class P2,P3,P4,P5 box;
    class P6 done;`,

    aiAmplifier: `flowchart TB
    A["AIコーディング支援の導入"] --> B{"組織の技術的基盤とプラットフォーム品質"}
    B -->|強い基盤 高成熟度| C["スループットと質がさらに向上する"]
    B -->|弱い基盤 機能不全| D["不安定性と手戻りが増幅される"]
    C --> E["AIは増幅器として働く"]
    D --> E

    classDef hub fill:#FAF1DF,stroke:#B8802A,color:#161B26,stroke-width:1px;
    classDef box fill:#EEF1F8,stroke:#2E3F72,color:#161B26,stroke-width:1px;
    classDef done fill:#EAF4EC,stroke:#2F6B3D,color:#161B26,stroke-width:1px;
    class A hub;
    class B,D,E box;
    class C done;`,
};
