export const DIAGRAMS: Record<string, string> = {
    'diag-1': `flowchart TD
A[ワークロードの要件確認] --> B{コンテナ化されているか？}
B -->|No VM が必要| C{"OS の完全制御が必要か？"}
B -->|Yes| D{Kubernetes が必要か？}
C -->|Yes| E[Compute Engine GCE]
C -->|No AI エージェント| F[Agent Runtime]
D -->|Yes| G{ノード管理を自前で行うか？}
D -->|No HTTP ベース| H[Cloud Run]
D -->|No 軽量イベント| I[Cloud Run Functions]
G -->|No マネージドで良い| J[GKE Autopilot 推奨]
G -->|Yes 特権コンテナなど| K[GKE Standard]
E --> L{コスト削減優先か？}
L -->|Yes 停止許容| M[Spot VM + MIG]
L -->|No 常時稼働| N[通常 VM]`,

    'diag-2': `flowchart TD
A[ストレージ選択] --> B{データ永続性が必要か？}
B -->|No 一時データのみ| C["Local SSD<br/>最高 IOPS スループット<br/>VM停止でデータ消失"]
B -->|Yes 永続ストレージ| D{性能の独立制御が必要か？}
D -->|Yes 新世代推奨| E[Google Cloud Hyperdisk]
D -->|No 従来型で十分| F[Persistent Disk]
E --> G{用途}
G -->|汎用ワークロード| H["Hyperdisk Balanced 推奨<br/>IOPS 最大 160,000<br/>スループット 最大 2,400 MiB/s"]
G -->|OLTP 高 IOPS DB| I["Hyperdisk Extreme<br/>IOPS 最大 350,000"]
G -->|大規模分析| J["Hyperdisk Throughput<br/>低コスト"]
G -->|"AI/ML モデル配信"| K["Hyperdisk ML<br/>読み取り専用共有"]
F --> L{用途}
L -->|汎用| M[Balanced PD]
L -->|高性能| N[SSD PD]
L -->|低コスト| O[Standard PD]`,

    'diag-3': `flowchart LR
T["インスタンステンプレート(設計図)<br/>マシンタイプ / OS / ディスク / スクリプト"] -->|MIG が参照| M
M["MIG<br/>Managed Instance Group"] --> V1[VM1 ゾーン A]
M --> V2[VM2 ゾーン B]
M --> V3[VM3 ゾーン C]
M --> AUTO["自動機能<br/>オートスケーリング<br/>自動ヒーリング<br/>ローリングアップデート"]`,

    'diag-4': `flowchart LR
User["エンジニア<br/>alice@example.com"] -->|SSH 接続試行| OSL["OS Login<br/>IAM リアルタイム照会"]
OSL -->|"roles/compute.osLogin 確認"| IAM[Cloud IAM]
IAM -->|権限あり| VM["VM 接続成功<br/>Linux アカウントを自動生成"]
IAM -->|権限なし削除済み| DENY["接続拒否<br/>退職時は即時失効"]`,

    'diag-5': `flowchart TD
SV[Spot VM] --> ADV["最大 91% 割引<br/>通常 VM より大幅に安価"]
SV --> RISK["プリエンプトリスク<br/>30秒前通知で停止される可能性"]
RISK --> DESIGN[フォールトトレラント設計が必須]
DESIGN --> CP["チェックポイント機能<br/>Cloud Storage に定期保存"]
DESIGN --> SS["シャットダウンスクリプト<br/>終了時のクリーンアップ"]
DESIGN --> MIG_COMBO["MIG との組み合わせ<br/>プリエンプト後に自動再作成"]
DESIGN --> TA["終了アクション<br/>STOP: データ保持+再起動<br/>DELETE: 最小コスト"]`,

    'diag-6': `flowchart TD
Start[GKE クラスタの要件確認] --> Q1{特権コンテナが必要か？}
Q1 -->|Yes| S[GKE Standard モード]
Q1 -->|No| Q2{カーネルパラメータの変更が必要か？}
Q2 -->|Yes| S
Q2 -->|No| Q3{DaemonSet でカスタムエージェントを実行するか？}
Q3 -->|Yes| S
Q3 -->|No| Q4{"GPU/TPU ノードプールをカスタム設定するか？"}
Q4 -->|Yes| S
Q4 -->|No| A["GKE Autopilot 推奨<br/>課金: Pod リソース単位<br/>セキュリティ: Baseline 強制<br/>Workload Identity: 自動有効"]
S["GKE Standard<br/>課金: ノード単位<br/>完全なノード管理"]`,

    'diag-7': `flowchart LR
Internet["インターネット HTTPS"] -->|HTTPS| CR["Cloud Run 第2世代"]
CR -->|Direct VPC Egress 推奨| VPC[VPC 内部リソース]
VPC --> SQL[Cloud SQL プライベート IP]
VPC --> MEM[Memorystore Redis]
PUBSUB["Pub/Sub"] -->|Eventarc| CR
GCS[Cloud Storage 変更] -->|Eventarc| CR`,

    'diag-8': `flowchart TD
A["AI/ML ワークロード"] --> B{ワークロードの種類}
B -->|"汎用 ML 推論 レンダリング"| C[GPU を選択]
B -->|大規模 LLM トレーニング| D{使用フレームワーク}
D -->|"TensorFlow JAX 最適化"| E[TPU を選択]
D -->|"PyTorch 汎用"| C
C --> F{GPU の種類}
F -->|推論コスト効率重視| G["NVIDIA L4 G2 ファミリー<br/>コスパ最高"]
F -->|大規模トレーニング| H["NVIDIA A100 A2<br/>HBM メモリ搭載"]
F -->|最先端 LLM| I["NVIDIA H100 A3<br/>最高性能"]
E --> J["Cloud TPU v4/v5<br/>専用 Pod"]`,

    'diag-9': `flowchart LR
Dev["開発者<br/>Python フレームワーク<br/>LangChain ADK 等"] -->|デプロイ| AR["Agent Runtime<br/>Gemini Enterprise Agent Platform"]
AR --> M["マネージドランタイム<br/>コンテナ化の自動処理<br/>自動スケーリング"]
AR --> OBS["オブザーバビリティ<br/>Cloud Logging<br/>Cloud Trace"]
AR --> SEC["エンタープライズセキュリティ<br/>CMEK 対応<br/>VPC Service Controls"]
AR --> FEAT["高度な機能<br/>Sessions 会話履歴<br/>Memory Bank 長期記憶"]`,

    'diag-10': `flowchart TD
A[データベースの要件] --> B{データは構造化か？}
B -->|Yes スキーマ固定| C{SQL ACID が必要か？}
B -->|No 半構造化| D{リアルタイム同期が必要か？}
B -->|分析 DWH| K["BigQuery<br/>サーバーレス DWH<br/>ペタバイト分析 ML"]
C -->|Yes| E{"グローバル分散と 99.999% SLA が必要か？"}
C -->|No NoSQL で良い| D
E -->|Yes| F["Cloud Spanner<br/>グローバル分散<br/>水平スケール<br/>99.999% SLA"]
E -->|No PG 互換で高性能| G["AlloyDB<br/>PostgreSQL 互換<br/>標準比 4倍の OLTP<br/>pgvector ベクトル検索"]
E -->|No 標準的な RDB| H["Cloud SQL<br/>MySQL/PG/SQL Server<br/>フルマネージド"]
D -->|Yes モバイル IoT| I["Firestore<br/>サーバーレスドキュメント DB<br/>リアルタイム同期"]
D -->|No 大規模時系列| J["Cloud Bigtable<br/>ワイドカラム型<br/>ペタバイト ミリ秒以下"]
D -->|キャッシュ| L["Memorystore<br/>Redis Memcached<br/>マイクロ秒レスポンス"]`,

    'diag-11': `flowchart LR
A["オブジェクトの<br/>アクセス頻度"] --> B{どのくらいの頻度？}
B -->|頻繁 日次以上| C["Standard<br/>最小保存期間: なし<br/>アクセスコスト: 無料"]
B -->|月 1 回程度| D["Nearline<br/>最小保存期間: 30 日<br/>アクセスコストあり"]
B -->|年 4 回未満| E["Coldline<br/>最小保存期間: 90 日<br/>アクセスコスト高め"]
B -->|年 1 回未満| F["Archive<br/>最小保存期間: 365 日<br/>法規制上の長期保管"]`,

    'diag-12': `flowchart TD
F[ファイルストレージの選択] --> P{要件}
P -->|"標準的な NFS 共有ストレージ"| FS["Filestore<br/>Basic 最大 64TiB<br/>Regional 最大 100TiB"]
P -->|"HPC AI/ML 並列アクセス"| ML["Managed Lustre<br/>Lustre 並列ファイルシステム<br/>ペタバイト規模"]
P -->|"エンタープライズ NFS SMB iSCSI"| NV["NetApp Volumes<br/>ONTAP データ管理機能<br/>スナップショット レプリケーション内蔵"]`,

    'diag-13': `flowchart TD
R[冗長性の要件] --> D{SLA RTO RPO の要件}
D -->|"単一リージョン内で十分<br/>コスト最適化"| SR["Single Region<br/>Cloud SQL HA ゾーン冗長<br/>Regional Persistent Disk"]
D -->|"2 リージョン間<br/>バランス型"| DR["Dual Region<br/>Cloud Storage Dual-Region<br/>Cloud SQL クロスリージョンレプリカ"]
D -->|"グローバル分散<br/>最高の可用性"| MR["Multi Region<br/>Cloud Storage Multi-Region<br/>Cloud Spanner グローバル<br/>Firestore マルチリージョン"]`,

    'diag-14': `flowchart TB
subgraph SVPC ["Shared VPC 組織内 - 推奨"]
HP["ホストプロジェクト<br/>ネットワーク集中管理"] --> SA[サービスプロジェクト A Web チーム]
HP --> SB[サービスプロジェクト B API チーム]
HP --> SC[サービスプロジェクト C DB チーム]
end
subgraph PEER ["VPC Network Peering 異組織間"]
VA["VPC A Project 1"] <-->|内部 IP で通信| VB["VPC B Project 2"]
VB <-->|Peering| VC["VPC C Project 3"]
VA -.->|"A から C は直接通信不可 推移的でない"| VC
end`,

    'diag-15': `flowchart TB
subgraph OLD ["従来の VPC ファイアウォールルール"]
VFR["VPC ファイアウォールルール<br/>ネットワークタグで対象を指定<br/>プロジェクトレベルで管理"]
end
subgraph NEW ["Cloud NGFW 次世代ファイアウォール"]
subgraph TIER_E ["Essentials 基本"]
FP["ネットワークファイアウォールポリシー<br/>階層的ポリシー(組織/フォルダ/プロジェクト)<br/>IAM 管理のセキュアタグ"]
end
subgraph TIER_S ["Standard 高度"]
FQDN["FQDN フィルタリング<br/>Google Threat Intelligence<br/>地理情報ベースのフィルタリング"]
end
subgraph TIER_ENT ["Enterprise 最高レベル"]
IPS["IDS/IPS 侵入検知防御<br/>URL フィルタリング<br/>TLS インスペクション"]
end
end
OLD --> NEW`,

    'diag-16': `flowchart LR
OnPrem["オンプレミス 他クラウド"] --> OPT{接続方式の選択}
OPT --> VPN["Cloud VPN<br/>インターネット経由<br/>IPsec 暗号化<br/>帯域 最大 3Gbps/トンネル<br/>HA VPN 99.99% SLA"]
OPT --> IC["Cloud Interconnect<br/>専用線(物理接続)<br/>Dedicated 10G or 100Gbps<br/>Partner 50Mbps-10Gbps<br/>99.99% SLA 冗長構成時"]
OPT --> PEER["VPC Network Peering<br/>同じ Google ネットワーク内<br/>内部 IP で通信"]`,

    'diag-17': `flowchart TD
A[ロードバランサの要件] --> B{トラフィックの種類}
B -->|HTTP HTTPS L7| C[Application Load Balancer]
B -->|TCP UDP その他 L4| D[Network Load Balancer]
C --> E{スコープ}
E -->|"グローバル分散<br/>Anycast IP が必要"| F["Global External ALB<br/>Premium Tier 必須<br/>Cloud Armor 統合"]
E -->|"特定リージョン内<br/>コンプライアンス要件"| G["Regional External ALB<br/>データ主権要件に対応<br/>TLS 終端が特定リージョン"]
E -->|VPC 内部のみ| H["Internal ALB<br/>内部 IP アドレス<br/>マイクロサービス間"]
D --> I{処理方式}
I -->|"SSL オフロードが必要"| J["Proxy Network LB<br/>TCP 接続を終端<br/>送信元 IP は失われる"]
I -->|"送信元 IP 保持<br/>UDP が必要"| K["Passthrough Network LB<br/>DSR Direct Server Return<br/>送信元 IP をそのまま転送"]
I -->|VPC 内部のみ| L["Internal Passthrough NLB<br/>内部 IP east-west トラフィック"]`,

    'diag-18': `flowchart LR
User[エンドユーザー] -->|Premium Tier| GNET["Google グローバルバックボーン<br/>高速・低レイテンシ<br/>エッジで受信"] --> GCE["GCE VM LB"]
User -->|Standard Tier| Internet["インターネット<br/>通常のルーティング<br/>コスト低い"] --> GCE`,

    'diag-19': `flowchart LR
DEV[開発者がコードを変更] --> PR[Pull Request 作成]
PR --> PLAN["terraform plan -out=tfplan<br/>変更内容のレビュー"]
PLAN --> REVIEW[人によるレビュー・承認]
REVIEW --> APPLY["terraform apply tfplan<br/>本番適用"]
APPLY --> STATE["State ファイル更新<br/>GCS リモートバックエンド"]
STATE --> AUDIT["変更履歴は Git で管理<br/>完全な監査証跡"]`,

    'diag-20': `flowchart LR
S0["Stage 0: Bootstrap<br/>Terraform の実行基盤<br/>State バケット<br/>CI/CD プロジェクト"] --> S1["Stage 1: Organization<br/>フォルダ階層<br/>組織ポリシー<br/>ロギング"]
S1 --> S2["Stage 2: Networking<br/>Shared VPC<br/>Hub-and-Spoke<br/>DNS 設計"]
S2 --> S3["Stage 3: Projects<br/>プロジェクトファクトリ<br/>YAML ベースの宣言"]`,

    'diag-21': `flowchart LR
GCA[Gemini Cloud Assist] --> ARCH["アーキテクチャ図の自動生成<br/>自然言語プロンプトから生成<br/>Terraform テンプレートの提案"]
GCA --> TROUBLE["トラブルシューティング<br/>ログ横断分析<br/>根本原因分析 RCA"]
GCA --> COST["FinOps 支援<br/>コスト最適化の提案<br/>無駄なリソースの検出"]
GCA --> MON["Cloud Monitoring 統合<br/>自然言語でアラートを作成"]`,
};
