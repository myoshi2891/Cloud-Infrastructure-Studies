/**
 * Google Cloud Professional Cloud Architect（PCA）認定試験 完全対策ガイド
 * 定数定義 (Mermaid diagrams & Navigation items)
 */

export type DiagramId =
    | 'diag-1'
    | 'diag-2'
    | 'diag-3'
    | 'diag-4'
    | 'diag-5'
    | 'diag-6'
    | 'diag-7'
    | 'diag-8'
    | 'diag-9'
    | 'diag-10'
    | 'diag-11'
    | 'diag-12'
    | 'diag-13'
    | 'diag-14'
    | 'diag-15'
    | 'diag-16'
    | 'diag-17';

export const DIAGRAMS: Record<DiagramId, string> = {
    'diag-1': `flowchart LR
    Exam["PCA試験<br/>50-60問 / 2時間"]
    S1["Section 1<br/>設計と計画<br/>約25%"]
    S2["Section 2<br/>管理と<br/>プロビジョニング<br/>約17.5%"]
    S3["Section 3<br/>セキュリティ<br/>と<br/>コンプライアンス<br/>約17.5%"]
    S4["Section 4<br/>プロセス分析<br/>と最適化<br/>約15%"]
    S5["Section 5<br/>実装の管理<br/>約12.5%"]
    S6["Section 6<br/>運用の卓越性<br/>約12.5%"]
    Exam --> S1
    Exam --> S2
    Exam --> S3
    Exam --> S4
    Exam --> S5
    Exam --> S6`,

    'diag-2': `flowchart TD
    A["ビジネス要求のヒアリング"] --> B["機能要件の定義"]
    A --> C["非機能要件の定義<br/>(可用性/性能/コスト)"]
    B --> D["統合パターンの検討<br/>(同期/非同期/バッチ)"]
    C --> D
    D --> E["ワークロード処遇戦略の決定<br/>(Build/Buy/Modify/Deprecate)"]
    E --> F["設計トレードオフの評価"]
    F --> G["KPI/ROIによる成功指標の合意"]
    G --> H["セキュリティ・コンプライアンス要件の統合"]
    H --> I["Observability設計への反映"]`,

    'diag-3': `flowchart LR
    A["障害発生"] --> B{"RPO要件は?"}
    B -->|"数分以内"| C["同期レプリケーション<br/>(Spanner マルチリージョン等)"]
    B -->|"数時間許容"| D["定期バックアップ<br/>+ ポイントインタイムリカバリ"]
    A --> E{"RTO要件は?"}
    E -->|"秒〜分単位"| F["ホットスタンバイ<br/>+ 自動フェイルオーバー"]
    E -->|"時間単位で許容"| G["IaCによる<br/>コールドスタンバイ再構築"]`,

    'diag-4': `flowchart TB
    Org["Organization"]
    HostVPC["ホストプロジェクト<br/>Shared VPC"]
    SvcA["サービスプロジェクトA"]
    SvcB["サービスプロジェクトB"]
    PSC["Private Service Connect"]
    ExtSvc["外部/マネージドサービス"]
    Org --> HostVPC
    HostVPC --> SvcA
    HostVPC --> SvcB
    SvcA -->|"プライベート接続"| PSC
    PSC --> ExtSvc`,

    'diag-5': `flowchart TD
    Start["ワークロードの特性は？"] --> Q1{"コンテナ化されているか？"}
    Q1 -->|"いいえ（VM前提）"| CE["Compute Engine<br/>(カスタムマシンタイプ/Spot VM)"]
    Q1 -->|"はい"| Q2{"きめ細かい<br/>クラスタ制御が必要か？"}
    Q2 -->|"はい<br/>(高度なオーケストレーション)"| GKE["Google Kubernetes<br/>Engine (GKE)"]
    Q2 -->|"いいえ<br/>(運用負荷を最小化したい)"| Q3{"リクエスト駆動の<br/>ステートレス処理か？"}
    Q3 -->|"はい"| CR["Cloud Run"]
    Q3 -->|"軽量な単一関数<br/>イベント処理"| CF["Cloud Run functions"]`,

    'diag-6': `flowchart LR
    A["Assess<br/>評価"] --> B["Plan<br/>計画"]
    B --> C["Deploy<br/>デプロイ"]
    C --> D["Optimize<br/>最適化"]
    A -.->|"Migration Center<br/>でインベントリ化"| A
    D -.->|"継続的な<br/>コスト/性能改善"| D`,

    'diag-7': `flowchart TB
    OnPrem["オンプレミス<br/>データセンター"]
    OtherCloud["他クラウド<br/>プロバイダ"]
    NCC["Network Connectivity<br/>Center (ハブ)"]
    VPC1["VPC A<br/>(スポーク)"]
    VPC2["VPC B<br/>(スポーク)"]
    OnPrem -->|"Dedicated/Partner<br/>Interconnect"| NCC
    OtherCloud -->|"Cross-Cloud<br/>Interconnect"| NCC
    NCC --> VPC1
    NCC --> VPC2`,

    'diag-8': `flowchart LR
    Code["IaCコード<br/>(Terraform等)"] --> Review["コードレビュー/<br/>Plan確認"]
    Review --> Apply["Apply<br/>(リソースのプロビジョニング)"]
    Apply --> Patch["OS Config Managementで<br/>パッチ適用を自動化"]
    Patch --> Monitor["構成ドリフトの検知"]
    Monitor -->|"ドリフト検出時"| Code`,

    'diag-9': `flowchart LR
    Data["データ準備・統合"] --> Train["モデル学習<br/>(AI Hypercomputer:<br/>GPU/TPU)"]
    Train --> Pipeline["Agent Platform<br/>Pipelinesで<br/>オーケストレーション"]
    Pipeline --> Deploy["モデルのデプロイ<br/>(オンライン/バッチ推論)"]
    Deploy --> Monitor["モデル監視・<br/>再学習トリガー"]
    Monitor --> Data`,

    'diag-10': `flowchart TD
    Org["Organization"]
    Folder1["Folder: 本番環境"]
    Folder2["Folder: 開発環境"]
    Proj1["Project: prod-app"]
    Proj2["Project: prod-data"]
    Proj3["Project: dev-app"]
    Org --> Folder1
    Org --> Folder2
    Folder1 --> Proj1
    Folder1 --> Proj2
    Folder2 --> Proj3`,

    'diag-11': `flowchart LR
    User["ユーザー"] --> IAP["Identity-Aware Proxy"]
    IAP --> CAA{"Context-Aware Access<br/>デバイス/場所/IDを検証"}
    CAA -->|"条件を満たす"| Resource["保護対象リソース<br/>(VM/アプリ)"]
    CAA -->|"条件を満たさない"| Deny["アクセス拒否"]`,

    'diag-12': `flowchart LR
    Commit["コードコミット"] --> Build["Cloud Buildで<br/>ビルド"]
    Build --> Test["自動テスト<br/>(単体/統合)"]
    Test --> Registry["Artifact Registryへ<br/>コンテナ格納"]
    Registry --> Deploy["Cloud Deployで<br/>段階的デプロイ"]
    Deploy --> Prod["本番環境"]
    Test -->|"失敗"| Commit`,

    'diag-13': `flowchart LR
    Write["Terraformコードを記述<br/>(.tf)"] --> Init["terraform init"]
    Init --> Plan["terraform plan<br/>(変更内容の確認)"]
    Plan --> Review["レビュー/承認"]
    Review --> Apply["terraform apply<br/>(リソース適用)"]
    Apply --> State["State管理<br/>(Cloud Storageバックエンド等)"]`,

    'diag-14': `flowchart TB
    App["アプリケーション"] --> Log["Cloud Logging"]
    App --> Metric["Cloud Monitoring"]
    App --> Trace["Cloud Trace"]
    Log --> Alert["アラートポリシー"]
    Metric --> Alert
    Alert -->|"しきい値超過"| Notify["通知<br/>(PagerDuty/Slack/Email)"]
    Log --> Export["BigQuery/Cloud Storage<br/>へエクスポート(長期保存)"]`,

    'diag-15': `flowchart LR
    subgraph BlueGreen["Blue/Greenデプロイ"]
        B1["新バージョン(Green)を<br/>並行環境に全量デプロイ"] --> B2["トラフィックを<br/>一括切替"]
    end`,

    'diag-16': `flowchart LR
    subgraph Canary["カナリアリリース"]
        C1["新バージョンへ<br/>トラフィックの一部(例:5%)を割当"] --> C2["メトリクス監視"]
        C2 -->|"問題なし"| C3["段階的にトラフィック比率を拡大"]
        C2 -->|"異常検知"| C4["自動ロールバック"]
    end`,

    'diag-17': `flowchart LR
    A["信頼性の検証"] --> B["負荷テスト<br/>(限界点の特定)"]
    A --> C["カオスエンジニアリング<br/>(障害注入による耐性検証)"]
    A --> D["ペネトレーションテスト<br/>(セキュリティ耐性検証)"]
    B --> E["改善アクションの<br/>継続的な実施"]
    C --> E
    D --> E`,
};

export interface NavItem {
    id: string;
    label: string;
    level: 2 | 3;
}

export const NAV_ITEMS: NavItem[] = [
    { id: 'この試験について', label: 'この試験について', level: 2 },
    { id: '試験の基本情報', label: '試験の基本情報', level: 3 },
    { id: '出題セクションと配点', label: '出題セクションと配点', level: 3 },
    {
        id: 'google-cloud-well-architected-frameworkwafを理解することが合格の鍵',
        label: 'Google Cloud Well-Architected Framework（WAF）を理解することが合格の鍵',
        level: 3,
    },
    { id: 'ケーススタディの扱い方', label: 'ケーススタディの扱い方', level: 3 },
    {
        id: 'section-1-クラウドソリューションアーキテクチャの設計と計画約25',
        label: 'Section 1: クラウドソリューションアーキテクチャの設計と計画（約25%）',
        level: 2,
    },
    {
        id: '11-ビジネス要件を満たすクラウドソリューションインフラの設計',
        label: '1.1 ビジネス要件を満たすクラウドソリューションインフラの設計',
        level: 3,
    },
    {
        id: '12-技術要件を満たすクラウドソリューションインフラの設計',
        label: '1.2 技術要件を満たすクラウドソリューションインフラの設計',
        level: 3,
    },
    {
        id: '13-ネットワークストレージコンピューティングリソースの設計',
        label: '1.3 ネットワーク・ストレージ・コンピューティングリソースの設計',
        level: 3,
    },
    { id: '14-移行計画の作成', label: '1.4 移行計画の作成', level: 3 },
    { id: '15-将来の解決策の改善を見据える', label: '1.5 将来の解決策の改善を見据える', level: 3 },
    {
        id: 'section-2-クラウドソリューションインフラの管理とプロビジョニング約175',
        label: 'Section 2: クラウドソリューションインフラの管理とプロビジョニング（約17.5%）',
        level: 2,
    },
    { id: '21-ネットワークトポロジの構成', label: '2.1 ネットワークトポロジの構成', level: 3 },
    { id: '22-個別ストレージシステムの構成', label: '2.2 個別ストレージシステムの構成', level: 3 },
    { id: '23-コンピュートシステムの構成', label: '2.3 コンピュートシステムの構成', level: 3 },
    {
        id: '24-gemini-enterprise-agent-platformを活用したエンドツーエンドmlワークフロー',
        label: '2.4 Gemini Enterprise Agent Platformを活用したエンドツーエンドMLワークフロー',
        level: 3,
    },
    {
        id: '25-agent-platformでの事前構築ソリューションapiの構成',
        label: '2.5 Agent Platformでの事前構築ソリューション・APIの構成',
        level: 3,
    },
    {
        id: 'section-3-セキュリティとコンプライアンスの設計約175',
        label: 'Section 3: セキュリティとコンプライアンスの設計（約17.5%）',
        level: 2,
    },
    { id: '31-セキュリティの設計', label: '3.1 セキュリティの設計', level: 3 },
    { id: '32-コンプライアンスの設計', label: '3.2 コンプライアンスの設計', level: 3 },
    {
        id: 'section-4-技術ビジネスプロセスの分析と最適化約15',
        label: 'Section 4: 技術・ビジネスプロセスの分析と最適化（約15%）',
        level: 2,
    },
    { id: '41-技術プロセスの分析と定義', label: '4.1 技術プロセスの分析と定義', level: 3 },
    { id: '42-ビジネスプロセスの分析と定義', label: '4.2 ビジネスプロセスの分析と定義', level: 3 },
    { id: 'section-5-実装の管理約125', label: 'Section 5: 実装の管理（約12.5%）', level: 2 },
    {
        id: '51-開発運用チームへのアドバイスによるソリューションの確実なデプロイ',
        label: '5.1 開発・運用チームへのアドバイスによるソリューションの確実なデプロイ',
        level: 3,
    },
    {
        id: '52-google-cloudとのプログラム的なやり取り',
        label: '5.2 Google Cloudとのプログラム的なやり取り',
        level: 3,
    },
    {
        id: 'section-6-ソリューションと運用の卓越性の確保約125',
        label: 'Section 6: ソリューションと運用の卓越性の確保（約12.5%）',
        level: 2,
    },
    {
        id: '61-well-architected-frameworkの運用の卓越性の柱',
        label: '6.1 Well-Architected Frameworkの運用の卓越性の柱',
        level: 3,
    },
    {
        id: '62-google-cloud-observabilityソリューションへの精通',
        label: '6.2 Google Cloud Observabilityソリューションへの精通',
        level: 3,
    },
    { id: '63-デプロイとリリース管理', label: '6.3 デプロイとリリース管理', level: 3 },
    {
        id: '64-デプロイ済みソリューションのサポート支援',
        label: '6.4 デプロイ済みソリューションのサポート支援',
        level: 3,
    },
    { id: '65-品質管理措置の評価', label: '6.5 品質管理措置の評価', level: 3 },
    {
        id: '66-本番環境における信頼性の確保',
        label: '6.6 本番環境における信頼性の確保',
        level: 3,
    },
    { id: '学習チェックリスト', label: '学習チェックリスト', level: 2 },
    { id: 'まとめ-合格のための5つの原則', label: 'まとめ: 合格のための5つの原則', level: 2 },
    { id: '参考文献', label: '参考文献', level: 2 },
];
