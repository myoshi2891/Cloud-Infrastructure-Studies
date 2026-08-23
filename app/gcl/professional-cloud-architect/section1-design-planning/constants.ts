/**
 * Google Cloud Professional Cloud Architect (PCA) Section 1 定数定義
 */

export interface NavItem {
    id: string;
    label: string;
    level: 2 | 3;
}

export const NAV_ITEMS: NavItem[] = [
    { id: '1-このセクションの全体像', label: '1. このセクションの全体像', level: 2 },
    { id: '2-前提知識google-cloud-well-architected-framework', label: '2. 前提知識：Google Cloud Well-Architected Framework', level: 2 },
    { id: '3-11-ビジネス要件を満たすクラウドソリューションインフラの設計', label: '3. 1.1 ビジネス要件を満たすクラウドソリューションインフラの設計', level: 2 },
    { id: '31-ビジネスユースケースと製品戦略', label: '3.1 ビジネスユースケースと製品戦略', level: 3 },
    { id: '32-機能要件と非機能要件の特定', label: '3.2 機能要件と非機能要件の特定', level: 3 },
    { id: '33-事業継続計画business-continuity-plan', label: '3.3 事業継続計画（Business Continuity Plan）', level: 3 },
    { id: '34-コスト最適化', label: '3.4 コスト最適化', level: 3 },
    { id: '35-アプリケーション設計のサポート', label: '3.5 アプリケーション設計のサポート', level: 3 },
    { id: '36-外部システムとの統合パターン', label: '3.6 外部システムとの統合パターン', level: 3 },
    { id: '37-データの移動', label: '3.7 データの移動', level: 3 },
    { id: '38-設計判断のトレードオフ', label: '3.8 設計判断のトレードオフ', level: 3 },
    { id: '39-ワークロード対応戦略build--buy--modify--deprecate', label: '3.9 ワークロード対応戦略（Build / Buy / Modify / Deprecate）', level: 3 },
    { id: '310-成功指標kpiroiメトリクス', label: '3.10 成功指標（KPI・ROI・メトリクス）', level: 3 },
    { id: '311-セキュリティとコンプライアンス', label: '3.11 セキュリティとコンプライアンス', level: 3 },
    { id: '312-オブザーバビリティ', label: '3.12 オブザーバビリティ', level: 3 },
    { id: '4-12-技術要件を満たすクラウドソリューションインフラの設計', label: '4. 1.2 技術要件を満たすクラウドソリューションインフラの設計', level: 2 },
    { id: '41-google-cloud-well-architected-framework-への習熟', label: '4.1 Google Cloud Well-Architected Framework への習熟', level: 3 },
    { id: '42-高可用性とフェイルオーバー設計', label: '4.2 高可用性とフェイルオーバー設計', level: 3 },
    { id: '43-クラウドリソースの柔軟性', label: '4.3 クラウドリソースの柔軟性', level: 3 },
    { id: '44-成長要件を満たすスケーラビリティ', label: '4.4 成長要件を満たすスケーラビリティ', level: 3 },
    { id: '45-パフォーマンスとレイテンシ', label: '4.5 パフォーマンスとレイテンシ', level: 3 },
    { id: '46-gemini-cloud-assist', label: '4.6 Gemini Cloud Assist', level: 3 },
    { id: '47-バックアップとリカバリ', label: '4.7 バックアップとリカバリ', level: 3 },
    { id: '5-13-ネットワークストレージコンピュートリソースの設計', label: '5. 1.3 ネットワーク・ストレージ・コンピュートリソースの設計', level: 2 },
    { id: '51-オンプレミスマルチクラウド環境との統合', label: '5.1 オンプレミス／マルチクラウド環境との統合', level: 3 },
    { id: '52-google-cloud-ai機械学習ソリューション', label: '5.2 Google Cloud AI/機械学習ソリューション', level: 3 },
    { id: '53-クラウドネイティブネットワーキングvpc設計', label: '5.3 クラウドネイティブネットワーキング（VPC設計）', level: 3 },
    { id: '54-データ処理ソリューションの選択', label: '5.4 データ処理ソリューションの選択', level: 3 },
    { id: '55-適切なストレージタイプの選択', label: '5.5 適切なストレージタイプの選択', level: 3 },
    { id: '56-コンピュートニーズのプラットフォーム製品へのマッピング', label: '5.6 コンピュートニーズのプラットフォーム製品へのマッピング', level: 3 },
    { id: '57-コンピュートリソースの選択spot-vmカスタムマシンタイプ等', label: '5.7 コンピュートリソースの選択（Spot VM・カスタムマシンタイプ等）', level: 3 },
    { id: '6-14-移行計画マイグレーションプランの作成', label: '6. 1.4 移行計画（マイグレーションプラン）の作成', level: 2 },
    { id: '61-既存システムとの統合', label: '6.1 既存システムとの統合', level: 3 },
    { id: '62-システムデータの評価と移行migration-center', label: '6.2 システム・データの評価と移行（Migration Center）', level: 3 },
    { id: '63-移行手法ワークロードテストネットワーク計画依存関係計画', label: '6.3 移行手法、ワークロードテスト、ネットワーク計画、依存関係計画', level: 3 },
    { id: '64-ソフトウェアライセンスと財務影響の判断', label: '6.4 ソフトウェアライセンスと財務影響の判断', level: 3 },
    { id: '7-15-将来のソリューション改善の構想', label: '7. 1.5 将来のソリューション改善の構想', level: 2 },
    { id: '71-クラウドと技術の改善', label: '7.1 クラウドと技術の改善', level: 3 },
    { id: '72-ビジネスニーズの進化', label: '7.2 ビジネスニーズの進化', level: 3 },
    { id: '73-クラウドファーストの設計アプローチ', label: '7.3 クラウドファーストの設計アプローチ', level: 3 },
    { id: '8-公式ケーススタディとセクション1の関係', label: '8. 公式ケーススタディとセクション1の関係', level: 2 },
    { id: '9-学習チェックリスト', label: '9. 学習チェックリスト', level: 2 },
    { id: '10-参考文献一覧', label: '10. 参考文献一覧', level: 2 },
];

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

/** 全 Mermaid 図で共有する classDef 定義（図ごとの重複を避けるため 1 箇所に集約） */
const CLASS_DEFS = `classDef gcls1 fill:#1a73e8,color:#ffffff,stroke:#174ea6,stroke-width:1.5px
classDef gcls2 fill:#e8f0fe,color:#0b1220,stroke:#1a73e8,stroke-width:1.5px
classDef gcls3 fill:#fef7e0,color:#0b1220,stroke:#f9ab00,stroke-width:1.5px
classDef gcls4 fill:#fce8e6,color:#0b1220,stroke:#d93025,stroke-width:1.5px
classDef gcls5 fill:#e6f4ea,color:#0b1220,stroke:#188038,stroke-width:1.5px
classDef gcls6 fill:#f3e8fd,color:#0b1220,stroke:#a142f4,stroke-width:1.5px
classDef gcls7 fill:#e0f7fa,color:#0b1220,stroke:#00838f,stroke-width:1.5px
classDef gcls8 fill:#f1f3f4,color:#0b1220,stroke:#5f6368,stroke-width:1.5px
classDef gclust1 fill:#0d1a2b,color:#dbe4f3,stroke:#f9ab00,stroke-width:2px
classDef gclust2 fill:#0d1a2b,color:#dbe4f3,stroke:#1a73e8,stroke-width:2px`;

export const DIAGRAMS: Record<DiagramId, string> = {
    'diag-1': `flowchart TD
${CLASS_DEFS}
S1["セクション1<br/>クラウドソリューションアーキテクチャの<br/>設計と計画（約25%）"]
S1 --> T11["1.1 ビジネス要件を満たす<br/>インフラの設計"]
S1 --> T12["1.2 技術要件を満たす<br/>インフラの設計"]
S1 --> T13["1.3 ネットワーク・ストレージ・<br/>コンピュートリソースの設計"]
S1 --> T14["1.4 移行計画の作成"]
S1 --> T15["1.5 将来のソリューション<br/>改善の構想"]
class S1 gcls1
class T11,T12,T13,T14,T15 gcls2`,

    'diag-2': `flowchart LR
${CLASS_DEFS}
WAF["Google Cloud<br/>Well-Architected Framework"]
WAF --> P1["運用の卓越性<br/>Operational Excellence"]
WAF --> P2["セキュリティ・プライバシー・<br/>コンプライアンス"]
WAF --> P3["信頼性<br/>Reliability"]
WAF --> P4["パフォーマンス最適化<br/>Performance Optimization"]
WAF --> P5["コスト最適化<br/>Cost Optimization"]
WAF --> P6["持続可能性<br/>Sustainability"]
class WAF gcls1
class P1 gcls3
class P2 gcls4
class P3 gcls5
class P4 gcls2
class P5 gcls6
class P6 gcls7`,

    'diag-3': `flowchart LR
${CLASS_DEFS}
Root(("1.1<br/>ビジネス要件"))
Root --> A1["ビジネスユースケースと<br/>製品戦略"]
Root --> A2["機能要件・非機能要件の<br/>特定"]
Root --> A3["事業継続計画(BCP)"]
Root --> A4["コスト最適化"]
Root --> A5["アプリケーション設計の<br/>支援"]
Root --> A6["外部システムとの<br/>統合パターン"]
Root --> A7["データの移動"]
Root --> A8["設計判断のトレードオフ"]
Root --> A9["ワークロード対応戦略"]
Root --> A10["成功指標<br/>(KPI/ROI/メトリクス)"]
Root --> A11["セキュリティと<br/>コンプライアンス"]
Root --> A12["オブザーバビリティ"]
class Root gcls1
class A1,A2,A3,A4,A5,A6,A7,A8,A9,A10,A11,A12 gcls2`,

    'diag-4': `flowchart LR
${CLASS_DEFS}
subgraph BCP["事業継続計画 (BCP)"]
direction LR
A["リスク評価"] --> B["業務影響分析<br/>(BIA)"]
B --> C["DR戦略の策定<br/>(RTO/RPO定義)"]
C --> D["DR計画の実装<br/>(Google Cloudでの<br/>バックアップ/フェイルオーバー)"]
D --> E["テストと訓練"]
E --> F["継続的な見直し"]
F -.フィードバック.-> A
end
class BCP gclust1`,

    'diag-5': `flowchart TD
${CLASS_DEFS}
Ext["外部システム / 他マイクロサービス"]
Ext -->|"同期呼び出し<br/>(REST/gRPC)"| API["API Gateway /<br/>Apigee"]
API --> Svc["Cloud Run / GKE 上の<br/>バックエンドサービス"]

Ext -->|"非同期イベント発行"| PS["Pub/Sub"]
PS --> EA["Eventarc"]
EA --> Fn["Cloud Run functions"]
PS --> WF["Workflows"]
class Ext gcls8
class API gcls2
class PS,EA gcls5`,

    'diag-6': `flowchart LR
${CLASS_DEFS}
Cost["コスト"] <--> Reliability["信頼性/可用性"]
Reliability <--> Complexity["運用の複雑さ"]
Complexity <--> Speed["開発速度"]
Speed <--> Control["制御の自由度"]
Control <--> Cost
class Cost gcls6
class Reliability gcls5
class Complexity gcls4
class Speed gcls2
class Control gcls3`,

    'diag-7': `flowchart TB
${CLASS_DEFS}
subgraph Region["リージョン (例: asia-northeast1)"]
direction LR
subgraph ZoneA["ゾーン A"]
VM1["VMインスタンス"]
end
subgraph ZoneB["ゾーン B"]
VM2["VMインスタンス"]
end
subgraph ZoneC["ゾーン C"]
VM3["VMインスタンス"]
end
end

LB["リージョンロードバランサ<br/>(Cloud Load Balancing)"] --> ZoneA
LB --> ZoneB
LB --> ZoneC
User["ユーザー"] --> LB
class LB gcls1
class Region gclust2`,

    'diag-8': `flowchart LR
${CLASS_DEFS}
Metric["メトリクス収集<br/>(CPU使用率/リクエスト数/<br/>カスタム指標)"] --> Policy["オートスケーリング<br/>ポリシー評価"]
Policy -->|"負荷増"| ScaleOut["スケールアウト<br/>(インスタンス追加)"]
Policy -->|"負荷減"| ScaleIn["スケールイン<br/>(インスタンス削減)"]
ScaleOut --> Metric
ScaleIn --> Metric
class Metric gcls2
class Policy gcls3
class ScaleOut gcls5
class ScaleIn gcls4`,

    'diag-9': `flowchart LR
${CLASS_DEFS}
OnPrem["オンプレミス<br/>データセンター"]
OnPrem -->|"専用線<br/>(高帯域/低レイテンシ)"| DI["Dedicated<br/>Interconnect"]
OnPrem -->|"パートナー経由"| PI["Partner<br/>Interconnect"]
OnPrem -->|"インターネット経由<br/>IPsec VPN"| HA["HA VPN"]

DI --> VPC["Google Cloud VPC"]
PI --> VPC
HA --> VPC

OtherCloud["他クラウド<br/>(AWS/Azure等)"] -->|"Cross-Cloud<br/>Interconnect"| VPC
class OnPrem,OtherCloud gcls8
class VPC gcls2`,

    'diag-10': `flowchart TD
${CLASS_DEFS}
Platform["Gemini Enterprise<br/>Agent Platform"]
Platform --> MG["Model Garden<br/>(200以上のモデル:<br/>Gemini/Claude/Llama等)"]
Platform --> AB["Agent Development Kit /<br/>Agent Studio<br/>(エージェント構築)"]
Platform --> AH["AI Hypercomputer<br/>(GPU/TPUによる<br/>大規模学習基盤)"]
Platform --> RAG["RAG Engine /<br/>Vector Search<br/>(独自データの活用)"]
class Platform gcls1
class MG gcls2
class AB gcls5
class AH gcls3
class RAG gcls6`,

    'diag-11': `flowchart TD
${CLASS_DEFS}
Org["組織"]
Org --> HostProj["ホストプロジェクト<br/>(Shared VPC)"]
HostProj --> VPCNet["VPCネットワーク"]
VPCNet --> SubA["サブネット A<br/>(サービスプロジェクト1が利用)"]
VPCNet --> SubB["サブネット B<br/>(サービスプロジェクト2が利用)"]
Org --> SvcProj1["サービスプロジェクト1"]
Org --> SvcProj2["サービスプロジェクト2"]
SvcProj1 -.ネットワークユーザー<br/>ロールで接続.-> SubA
SvcProj2 -.ネットワークユーザー<br/>ロールで接続.-> SubB
class Org gcls8
class HostProj gcls1
class VPCNet gcls2`,

    'diag-12': `flowchart TD
${CLASS_DEFS}
Data["データ処理ニーズ"]
Data -->|"バッチ処理<br/>大規模ETL"| DF["Dataflow"]
Data -->|"リアルタイム<br/>ストリーム分析"| DFStream["Dataflow<br/>(ストリーミングモード)"]
Data -->|"SQLベースの<br/>分析・DWH"| BQ["BigQuery"]
Data -->|"ワークフロー<br/>オーケストレーション"| Composer["Cloud Composer<br/>(Apache Airflow)"]
Data -->|"イベント取り込み"| PubSub["Pub/Sub"]
class Data gcls8
class DF gcls2
class BQ gcls5`,

    'diag-13': `flowchart TD
${CLASS_DEFS}
Start(("データの種類・<br/>アクセスパターンは？"))
Start -->|"非構造化データ<br/>(画像/動画/バックアップ)"| Obj["オブジェクトストレージ<br/>Cloud Storage"]
Start -->|"VM/DBが必要とする<br/>低レイテンシブロックデバイス"| Blk["ブロックストレージ<br/>Persistent Disk / Hyperdisk /<br/>Local SSD"]
Start -->|"複数インスタンスからの<br/>同時ファイルアクセス(POSIX)"| File["ファイルストレージ<br/>Filestore"]
Start -->|"構造化データ・<br/>トランザクション処理"| DB{"データベースの種類は？"}
DB -->|"リレーショナル<br/>(汎用)"| CloudSQL["Cloud SQL"]
DB -->|"リレーショナル<br/>(グローバル/大規模)"| Spanner["Spanner"]
DB -->|"NoSQLドキュメント<br/>(モバイル/Web)"| Firestore["Firestore"]
DB -->|"NoSQLワイドカラム<br/>(低レイテンシ/大規模)"| Bigtable["Bigtable"]
class Start gcls1
class Obj gcls2
class Blk gcls5
class File gcls3
class DB gcls6`,

    'diag-14': `flowchart TD
${CLASS_DEFS}
Q1(("ワークロードは<br/>コンテナ化されているか？"))
Q1 -->|"いいえ<br/>(OS/カーネルへの<br/>低レベルアクセスが必要)"| CE["Compute Engine<br/>(VM)"]
Q1 -->|"はい"| Q2(("Kubernetesの高度な<br/>機能が必要か？<br/>(カスタムスケジューリング/<br/>複雑なネットワークポリシー等)"))
Q2 -->|"はい"| GKE["Google Kubernetes<br/>Engine (GKE)"]
Q2 -->|"いいえ<br/>(ステートレスな<br/>HTTPサービス)"| CR["Cloud Run"]
Q1 -->|"イベント駆動の<br/>単一機能"| CRF["Cloud Run functions"]
class Q1,Q2 gcls1
class CE gcls4
class GKE gcls5
class CR gcls2
class CRF gcls3`,

    'diag-15': `flowchart LR
${CLASS_DEFS}
Discover["1. 検出<br/>(Discovery Client等で<br/>資産をスキャン)"]
Discover --> Assess["2. アセスメント<br/>(TCOレポート/<br/>技術適合性の評価)"]
Assess --> Plan["3. 計画<br/>(移行ウェーブの<br/>グルーピング)"]
Plan --> Migrate["4. 移行実行<br/>(Migrate to VMs/<br/>Containers等)"]
Migrate --> Optimize["5. 最適化<br/>(モダナイゼーション)"]
class Discover gcls2
class Assess gcls3
class Plan gcls6
class Migrate gcls5
class Optimize gcls4`,

    'diag-16': `flowchart LR
${CLASS_DEFS}
R1["Rehost<br/>(リホスト)<br/>リフト&シフト"]
R2["Replatform<br/>(リプラットフォーム)<br/>軽微な最適化を伴う移行"]
R3["Refactor / Re-architect<br/>(リファクター/再設計)<br/>クラウドネイティブへ再構築"]
R4["Replace<br/>(置き換え)<br/>SaaS等への切り替え"]
R5["Retire<br/>(廃止)<br/>不要なシステムの廃止"]
R6["Retain<br/>(保持)<br/>当面オンプレミスに残す"]
class R1 gcls2
class R2 gcls5
class R3 gcls3
class R4 gcls6
class R5 gcls4
class R6 gcls8`,

    'diag-17': `flowchart LR
${CLASS_DEFS}
Now["現在のアーキテクチャ"] --> Loop{"継続的改善サイクル"}
Loop --> Tech["クラウド/技術の<br/>進化を評価"]
Loop --> Biz["ビジネスニーズの<br/>変化を評価"]
Tech --> Decide["改善計画の<br/>優先順位付け"]
Biz --> Decide
Decide --> Implement["クラウドファーストで<br/>設計・実装"]
Implement --> Now
class Loop gcls1
class Now gcls2
class Implement gcls5`,
};
