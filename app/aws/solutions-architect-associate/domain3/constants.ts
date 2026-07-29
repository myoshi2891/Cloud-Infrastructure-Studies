export const DIAGRAMS: Record<string, string> = {
  'mermaid-0': `flowchart TD
D3["ドメイン3<br/>高性能アーキテクチャの設計（24%）"]
D3 --> T1["Task 3.1<br/>ストレージ"]
D3 --> T2["Task 3.2<br/>コンピューティング"]
D3 --> T3["Task 3.3<br/>データベース"]
D3 --> T4["Task 3.4<br/>ネットワーク"]
D3 --> T5["Task 3.5<br/>データ取り込み・変換"]

T1 --> T1a["S3 / EBS / EFS<br/>ハイブリッドストレージ"]
T2 --> T2a["EC2 / Lambda / Fargate<br/>ECS・EKS / Auto Scaling"]
T3 --> T3a["RDS / Aurora / DynamoDB<br/>ElastiCache / 読み取りレプリカ"]
T4 --> T4a["VPC設計 / ELB<br/>CloudFront / Global Accelerator"]
T5 --> T5a["Kinesis / Glue<br/>Lake Formation / Athena"]

style D3 fill:#2c5480,stroke:#7c9eff,stroke-width:2px,color:#eef4ff
style T1 fill:#1a2f4a,stroke:#7c9eff,color:#eef4ff
style T2 fill:#1a2f4a,stroke:#7c9eff,color:#eef4ff
style T3 fill:#1a2f4a,stroke:#7c9eff,color:#eef4ff
style T4 fill:#1a2f4a,stroke:#7c9eff,color:#eef4ff
style T5 fill:#1a2f4a,stroke:#7c9eff,color:#eef4ff`,

  'mermaid-1': `flowchart TD
Start["ストレージが必要"] --> Q1{"複数のインスタンス/<br/>クライアントから同時に<br/>読み書きするか?"}
Q1 -- はい --> Q2{"アクセスプロトコルは?"}
Q1 -- いいえ<br/>(単一インスタンス専有) --> EBS["Amazon EBS<br/>(ブロックストレージ)"]

Q2 -- "HTTP(S) API<br/>大量の非構造化データ" --> S3["Amazon S3<br/>(オブジェクトストレージ)"]
Q2 -- "NFS (Linux)" --> EFS["Amazon EFS<br/>(ファイルストレージ)"]
Q2 -- "SMB (Windows) /<br/>高性能HPC/NetApp互換" --> FSx["Amazon FSx<br/>(Windows File Server /<br/>Lustre / NetApp ONTAP / OpenZFS)"]

EBS --> Q3{"最高レベルの<br/>IOPS/スループットが必要か?<br/>(例: 大規模DB)"}
Q3 -- はい --> io2["io2 Block Express"]
Q3 -- いいえ,汎用 --> gp3["gp3(汎用SSD)"]

style S3 fill:#2c5480,stroke:#7c9eff,color:#eef4ff
style EFS fill:#2c5480,stroke:#7c9eff,color:#eef4ff
style FSx fill:#2c5480,stroke:#7c9eff,color:#eef4ff
style EBS fill:#2c5480,stroke:#7c9eff,color:#eef4ff`,

  'mermaid-2': `flowchart LR
Upload["オブジェクトを<br/>アップロード"] --> Standard["S3 Standard<br/>(0〜29日)"]
Standard -- "30日経過<br/>(ライフサイクルルール)" --> IA["S3 Standard-IA<br/>(30〜89日)"]
IA -- "90日経過" --> GIR["S3 Glacier<br/>Instant Retrieval"]
GIR -- "180日経過" --> DeepArchive["S3 Glacier<br/>Deep Archive<br/>(長期保管)"]

Standard -. "アクセスパターンが<br/>不明・変動する場合" .-> IT["S3 Intelligent-Tiering<br/>(自動で階層を最適化)"]

style Standard fill:#2c5480,stroke:#7c9eff,color:#eef4ff
style IA fill:#1a2f4a,stroke:#7c9eff,color:#eef4ff
style GIR fill:#1a2f4a,stroke:#7c9eff,color:#eef4ff
style DeepArchive fill:#1a2f4a,stroke:#7c9eff,color:#eef4ff
style IT fill:#2c5480,stroke:#5fd4a8,color:#eef4ff`,

  'mermaid-3': `flowchart TD
Q1{"ワークロードの<br/>I/Oパターンは?"}
Q1 -- "ランダムI/O<br/>(トランザクション処理・DB)" --> Q2{"必要なIOPSは<br/>16,000を超えるか?"}
Q1 -- "シーケンシャルI/O<br/>(大容量読み書き)" --> Q3{"アクセス頻度は?"}

Q2 -- "はい(超高性能DB)" --> io2["io2 Block Express"]
Q2 -- "いいえ(汎用)" --> gp3["gp3(汎用SSD)"]

Q3 -- "頻繁(ログ処理/DWH)" --> st1["st1(スループット最適化HDD)"]
Q3 -- "低頻度(コールドデータ)" --> sc1["sc1(コールドHDD)"]

style gp3 fill:#2c5480,stroke:#7c9eff,color:#eef4ff
style io2 fill:#2c5480,stroke:#e2716f,color:#eef4ff
style st1 fill:#1a2f4a,stroke:#7c9eff,color:#eef4ff
style sc1 fill:#1a2f4a,stroke:#7c9eff,color:#eef4ff`,

  'mermaid-4': `flowchart TD
subgraph AZ1["Availability Zone A"]
EC2a["EC2インスタンス"]
end
subgraph AZ2["Availability Zone B"]
EC2b["EC2インスタンス"]
end
subgraph AZ3["Availability Zone C"]
EC2c["EC2インスタンス"]
end

EC2a -- "NFSマウント" --> EFS["Amazon EFS<br/>(リージョン全体で<br/>複数AZにまたがる<br/>共有ファイルシステム)"]
EC2b -- "NFSマウント" --> EFS
EC2c -- "NFSマウント" --> EFS

EFS -. "アクセス頻度に応じて<br/>ライフサイクル管理" .-> EFSIA["EFS Standard-IA<br/>(低頻度アクセス層)"]

style EFS fill:#2c5480,stroke:#7c9eff,color:#eef4ff
style EFSIA fill:#1a2f4a,stroke:#7c9eff,color:#eef4ff`,

  'mermaid-5': `flowchart LR
OnPrem["オンプレミス<br/>アプリケーション/サーバー"]

OnPrem -- "NFS/SMB" --> FileGW["S3 File Gateway"]
OnPrem -- "iSCSI" --> VolGW["Volume Gateway"]
OnPrem -- "仮想テープ装置(VTL)" --> TapeGW["Tape Gateway"]

FileGW --> S3["Amazon S3<br/>(オブジェクトとして保存)"]
VolGW --> S3B["Amazon S3<br/>(EBSスナップショット形式)"]
TapeGW --> Glacier["S3 Glacier<br/>(仮想テープアーカイブ)"]

style FileGW fill:#2c5480,stroke:#7c9eff,color:#eef4ff
style VolGW fill:#2c5480,stroke:#7c9eff,color:#eef4ff
style TapeGW fill:#2c5480,stroke:#7c9eff,color:#eef4ff`,

  'mermaid-6': `flowchart TD
Start["ワークロードの<br/>特性は?"]

Start --> Q1{"サーバー管理を<br/>自分で行うか?"}
Q1 -- "はい(OSレベルの制御が必要)" --> EC2["Amazon EC2<br/>+ EC2 Auto Scaling"]
Q1 -- "いいえ(サーバーレス)" --> Q2{"実行時間の目安は?"}

Q2 -- "短時間(最大15分)<br/>イベント駆動" --> Lambda["AWS Lambda"]
Q2 -- "コンテナ化された<br/>長時間実行" --> Q3{"オーケストレーションの<br/>好みは?"}

Q3 -- "AWSネイティブでシンプル" --> ECS["Amazon ECS<br/>(on Fargate または EC2)"]
Q3 -- "Kubernetes標準/<br/>マルチクラウド互換" --> EKS["Amazon EKS<br/>(on Fargate または EC2)"]

Start --> Q4{"大規模バッチ処理・<br/>ジョブスケジューリングか?"}
Q4 -- "はい(数百〜数千の並列ジョブ)" --> Batch["AWS Batch"]

Start --> Q5{"ビッグデータ処理<br/>(Spark/Hadoop/Hive)か?"}
Q5 -- "はい" --> EMR["Amazon EMR"]

style EC2 fill:#1a2f4a,stroke:#7c9eff,color:#eef4ff
style Lambda fill:#2c5480,stroke:#5fd4a8,color:#eef4ff
style ECS fill:#2c5480,stroke:#7c9eff,color:#eef4ff
style EKS fill:#2c5480,stroke:#7c9eff,color:#eef4ff
style Batch fill:#1a2f4a,stroke:#7c9eff,color:#eef4ff
style EMR fill:#1a2f4a,stroke:#7c9eff,color:#eef4ff`,

  'mermaid-7': `flowchart TD
Users["ユーザーからの<br/>トラフィック"] --> ALB["Application<br/>Load Balancer"]
ALB --> ASG["Auto Scalingグループ<br/>(複数AZにまたがる)"]

subgraph AZ_A["AZ-A"]
EC2_1["EC2インスタンス"]
end
subgraph AZ_B["AZ-B"]
EC2_2["EC2インスタンス"]
end

ASG --> EC2_1
ASG --> EC2_2

CW["Amazon CloudWatch<br/>(CPU使用率などを監視)"] -- "しきい値超過を検知" --> ASG
ASG -- "スケールアウト/イン" --> LaunchTemplate["起動テンプレートに基づき<br/>インスタンスを増減"]

style ALB fill:#2c5480,stroke:#7c9eff,color:#eef4ff
style ASG fill:#2c5480,stroke:#7c9eff,color:#eef4ff
style CW fill:#1a2f4a,stroke:#5fd4a8,color:#eef4ff`,

  'mermaid-8': `flowchart LR
subgraph Orchestrator["オーケストレーター(コントロールプレーン)"]
ECS_o["Amazon ECS<br/>(AWS独自)"]
EKS_o["Amazon EKS<br/>(マネージドKubernetes)"]
end

subgraph LaunchType["起動タイプ(実行基盤)"]
EC2_l["EC2起動タイプ<br/>(自分でEC2を管理)"]
Fargate_l["Fargate起動タイプ<br/>(サーバーレス)"]
end

ECS_o --> EC2_l
ECS_o --> Fargate_l
EKS_o --> EC2_l
EKS_o --> Fargate_l

style ECS_o fill:#2c5480,stroke:#7c9eff,color:#eef4ff
style EKS_o fill:#2c5480,stroke:#7c9eff,color:#eef4ff
style Fargate_l fill:#2c5480,stroke:#5fd4a8,color:#eef4ff
style EC2_l fill:#1a2f4a,stroke:#7c9eff,color:#eef4ff`,

  'mermaid-9': `flowchart LR
subgraph PubSub["パブリッシュ/サブスクライブ(ファンアウト)"]
Producer["注文サービス"] -- "発行(Publish)" --> SNS["Amazon SNS<br/>(トピック)"]
SNS -- "配信" --> Sub1["請求処理<br/>(SQSキュー)"]
SNS -- "配信" --> Sub2["在庫更新<br/>(SQSキュー)"]
SNS -- "配信" --> Sub3["通知メール送信<br/>(Lambda)"]
end

style SNS fill:#2c5480,stroke:#7c9eff,color:#eef4ff`,

  'mermaid-10': `sequenceDiagram
participant Producer as メッセージ送信側
participant SQS as Amazon SQSキュー
participant Consumer as ワーカー(EC2/Lambda/ECS)

Producer->>SQS: メッセージを送信
Note over SQS: メッセージは処理されるまで<br/>キューに保持される
Consumer->>SQS: メッセージをポーリングして取得
SQS-->>Consumer: メッセージを返す(可視性タイムアウト開始)
Consumer->>Consumer: メッセージを処理
Consumer->>SQS: 処理完了後にメッセージを削除`,

  'mermaid-11': `flowchart TD
Start["データの構造・<br/>アクセスパターンは?"]

Start --> Q1{"厳密なスキーマ・<br/>複雑なJOIN・<br/>トランザクション整合性が必要?"}
Q1 -- はい --> Q2{"クラウドネイティブな<br/>可用性・スケーラビリティ<br/>重視か?"}
Q2 -- はい --> Aurora["Amazon Aurora<br/>(MySQL/PostgreSQL互換)"]
Q2 -- "いいえ(オンプレミスDBの<br/>そのまま移行など)" --> RDS["Amazon RDS<br/>(MySQL/PostgreSQL/<br/>MariaDB/Oracle/SQL Server)"]

Q1 -- "いいえ(柔軟なスキーマ・<br/>キーバリュー中心)" --> Q3{"超低レイテンシ・<br/>大規模スケールが必要?"}
Q3 -- はい --> DynamoDB["Amazon DynamoDB<br/>(サーバーレスNoSQL)"]
Q3 -- "いいえ(ドキュメント/グラフ等)" --> Other["Amazon DocumentDB /<br/>Amazon Neptune 等"]

Start --> Q4{"インメモリの<br/>超高速アクセスが目的?"}
Q4 -- はい --> ElastiCache["Amazon ElastiCache<br/>(キャッシュ/インメモリDB)"]

style Aurora fill:#2c5480,stroke:#7c9eff,color:#eef4ff
style RDS fill:#1a2f4a,stroke:#7c9eff,color:#eef4ff
style DynamoDB fill:#2c5480,stroke:#5fd4a8,color:#eef4ff
style ElastiCache fill:#2c5480,stroke:#e2716f,color:#eef4ff`,

  'mermaid-12': `flowchart TD
App["アプリケーション"]

subgraph Primary_AZ["AZ-A(プライマリ)"]
Primary[("RDSプライマリ<br/>(読み書き両方)")]
end
subgraph Standby_AZ["AZ-B(スタンバイ)"]
Standby[("RDSスタンバイ<br/>(同期レプリケーション)<br/>※通常は直接読み取り不可")]
end
subgraph ReadReplica_Region["同一/別リージョン"]
RR1[("読み取りレプリカ1<br/>(非同期レプリケーション)")]
RR2[("読み取りレプリカ2")]
end

App -- "書き込み" --> Primary
Primary == "同期レプリケーション<br/>(自動フェイルオーバー用)" ==> Standby
Primary -. "非同期レプリケーション" .-> RR1
Primary -. "非同期レプリケーション" .-> RR2
App -- "読み取り専用クエリを分散" --> RR1
App -- "読み取り専用クエリを分散" --> RR2

style Primary fill:#2c5480,stroke:#7c9eff,color:#eef4ff
style Standby fill:#1a2f4a,stroke:#7c9eff,color:#eef4ff
style RR1 fill:#1a2f4a,stroke:#5fd4a8,color:#eef4ff
style RR2 fill:#1a2f4a,stroke:#5fd4a8,color:#eef4ff`,

  'mermaid-13': `flowchart TD
Writer["Auroraライター<br/>インスタンス"]
Reader1["Auroraリーダー<br/>インスタンス1"]
Reader2["Auroraリーダー<br/>インスタンス2"]

subgraph Storage["Auroraストレージ層（6コピー）"]
S1[("コピーAZ-A #1")]
S2[("コピーAZ-A #2")]
S3[("コピーAZ-B #1")]
S4[("コピーAZ-B #2")]
S5[("コピーAZ-C #1")]
S6[("コピーAZ-C #2")]
end

Writer --> Storage
Reader1 --> Storage
Reader2 --> Storage

style Writer fill:#2c5480,stroke:#7c9eff,color:#eef4ff
style Reader1 fill:#1a2f4a,stroke:#5fd4a8,color:#eef4ff
style Reader2 fill:#1a2f4a,stroke:#5fd4a8,color:#eef4ff
style Storage fill:#1a2f4a,stroke:#7c9eff,color:#eef4ff`,

  'mermaid-14': `sequenceDiagram
participant App as アプリケーション
participant Cache as ElastiCache
participant DB as データベース

Note over App,DB: 遅延読み込み(Lazy Loading)パターン
App->>Cache: データを問い合わせ
alt キャッシュヒット
Cache-->>App: キャッシュされたデータを返す
else キャッシュミス
Cache-->>App: データなし
App->>DB: データベースに問い合わせ
DB-->>App: データを返す
App->>Cache: 取得したデータをキャッシュに書き込む
end`,

  'mermaid-15': `sequenceDiagram
participant App as アプリケーション
participant Cache as ElastiCache
participant DB as データベース

Note over App,DB: ライトスルー(Write-Through)パターン
App->>DB: データを書き込む
App->>Cache: 同時にキャッシュにも書き込む
Note over Cache: 常に最新データが<br/>キャッシュに存在する`,

  'mermaid-16': `flowchart LR
subgraph Clients["大量の短命なクライアント"]
L1["Lambda呼び出し1"]
L2["Lambda呼び出し2"]
L3["Lambda呼び出し...N"]
end

L1 --> Proxy["Amazon RDS Proxy<br/>(コネクションプーリング)"]
L2 --> Proxy
L3 --> Proxy

Proxy -- "少数のプールされた<br/>永続的コネクション" --> DB[("Amazon RDS /<br/>Aurora")]

style Proxy fill:#2c5480,stroke:#7c9eff,color:#eef4ff
style DB fill:#1a2f4a,stroke:#7c9eff,color:#eef4ff`,

  'mermaid-17': `flowchart TD
IGW["Internet Gateway"]

subgraph VPC["VPC (例: 10.0.0.0/16)"]
subgraph AZ_A["Availability Zone A"]
PubA["パブリックサブネット<br/>10.0.1.0/24<br/>(ALB, NATゲートウェイ)"]
AppA["プライベートサブネット(アプリ層)<br/>10.0.11.0/24<br/>(EC2/ECS)"]
DataA["プライベートサブネット(データ層)<br/>10.0.21.0/24<br/>(RDS)"]
end
subgraph AZ_B["Availability Zone B"]
PubB["パブリックサブネット<br/>10.0.2.0/24<br/>(ALB, NATゲートウェイ)"]
AppB["プライベートサブネット(アプリ層)<br/>10.0.12.0/24<br/>(EC2/ECS)"]
DataB["プライベートサブネット(データ層)<br/>10.0.22.0/24<br/>(RDS)"]
end
end

IGW --> PubA
IGW --> PubB
PubA --> AppA
PubB --> AppB
AppA --> DataA
AppB --> DataB

style PubA fill:#1a2f4a,stroke:#7c9eff,color:#eef4ff
style PubB fill:#1a2f4a,stroke:#7c9eff,color:#eef4ff
style AppA fill:#2c5480,stroke:#7c9eff,color:#eef4ff
style AppB fill:#2c5480,stroke:#7c9eff,color:#eef4ff
style DataA fill:#1a2f4a,stroke:#e2716f,color:#eef4ff
style DataB fill:#1a2f4a,stroke:#e2716f,color:#eef4ff`,

  'mermaid-18': `flowchart TD
Start["どのレイヤーで<br/>ロードバランシングするか?"]

Start --> Q1{"HTTP/HTTPSの<br/>コンテンツに基づく<br/>高度なルーティングが必要か?<br/>(パスベース/ホストベース)"}
Q1 -- はい --> ALB["Application Load Balancer<br/>(レイヤー7)"]

Start --> Q2{"超低レイテンシ・<br/>大量のTCP/UDP接続<br/>(数百万リクエスト/秒)が必要か?<br/>静的IPが必要か?"}
Q2 -- はい --> NLB["Network Load Balancer<br/>(レイヤー4)"]

Start --> Q3{"サードパーティの<br/>仮想アプライアンス<br/>(ファイアウォール/IDS/IPS)を<br/>透過的に経由させたいか?"}
Q3 -- はい --> GWLB["Gateway Load Balancer<br/>(レイヤー3/4)"]

style ALB fill:#2c5480,stroke:#7c9eff,color:#eef4ff
style NLB fill:#2c5480,stroke:#5fd4a8,color:#eef4ff
style GWLB fill:#2c5480,stroke:#e2716f,color:#eef4ff`,

  'mermaid-19': `flowchart LR
Client["クライアント"] --> ALB["Application<br/>Load Balancer"]

ALB -- "/api/* へのリクエスト" --> TG1["ターゲットグループ1<br/>(APIサービス)"]
ALB -- "/images/* へのリクエスト" --> TG2["ターゲットグループ2<br/>(画像配信サービス)"]
ALB -- "shop.example.com<br/>(ホストベース)" --> TG3["ターゲットグループ3<br/>(ECサイト)"]

style ALB fill:#2c5480,stroke:#7c9eff,color:#eef4ff`,

  'mermaid-20': `flowchart TD
User["世界中のユーザー"]

User -- "コンテンツをキャッシュして配信" --> CF["Amazon CloudFront<br/>(CDN)"]
CF --> Origin["オリジン<br/>(S3 / ALB / EC2)"]

User -- "AWSのバックボーン経由で<br/>最適経路にルーティング<br/>(キャッシュなし)" --> GA["AWS Global Accelerator"]
GA --> RegionA["リージョンA<br/>のエンドポイント"]
GA --> RegionB["リージョンB<br/>のエンドポイント<br/>(フェイルオーバー先)"]

style CF fill:#2c5480,stroke:#7c9eff,color:#eef4ff
style GA fill:#2c5480,stroke:#5fd4a8,color:#eef4ff`,

  'mermaid-21': `flowchart TD
Start["オンプレミスと<br/>AWSをどう接続するか?"]

Start --> Q1{"迅速に接続したい・<br/>予算重視か?"}
Q1 -- はい --> VPN["AWS Site-to-Site VPN<br/>(インターネット経由の暗号化トンネル)"]

Start --> Q2{"専用線による安定した<br/>帯域・低レイテンシが必要か?<br/>(大容量データ転送)"}
Q2 -- はい --> DX["AWS Direct Connect<br/>(専用線接続)"]

Start --> Q3{"特定のAWSサービス/<br/>他社VPC内サービスへ<br/>プライベート接続したいだけか？<br/>(VPCピアリング不要)"}
Q3 -- はい --> PL["AWS PrivateLink<br/>(サービス単位のプライベート接続)"]

style VPN fill:#1a2f4a,stroke:#7c9eff,color:#eef4ff
style DX fill:#2c5480,stroke:#7c9eff,color:#eef4ff
style PL fill:#2c5480,stroke:#5fd4a8,color:#eef4ff`,

  'mermaid-22': `flowchart TD
subgraph Sources["データソース"]
DB["業務データベース"]
Logs["アプリケーションログ"]
Stream["リアルタイムイベント"]
OnPrem["オンプレミスファイル"]
end

subgraph Ingestion["取り込み層"]
DMS_i["AWS DMS"]
Kinesis_i["Amazon Kinesis"]
DataSync_i["AWS DataSync"]
end

subgraph Lake["データレイク"]
S3_dl[("Amazon S3<br/>(データレイク本体)")]
LF["AWS Lake Formation<br/>(アクセス権限・ガバナンス)"]
Glue_Catalog["AWS Glueデータカタログ<br/>(メタデータ管理)"]
end

subgraph Processing["処理・変換層"]
Glue_ETL["AWS Glue ETL"]
EMR_p["Amazon EMR"]
end

subgraph Consumption["分析・可視化層"]
Athena_c["Amazon Athena<br/>(SQLクエリ)"]
Redshift_c["Amazon Redshift<br/>(DWH)"]
Quick_c["Amazon Quick Suite<br/>(BI/可視化)"]
end

DB --> DMS_i --> S3_dl
Logs --> Kinesis_i --> S3_dl
Stream --> Kinesis_i
OnPrem --> DataSync_i --> S3_dl

S3_dl <--> LF
S3_dl <--> Glue_Catalog
S3_dl --> Glue_ETL --> S3_dl
S3_dl --> EMR_p --> S3_dl

S3_dl --> Athena_c --> Quick_c
S3_dl --> Redshift_c --> Quick_c

style S3_dl fill:#2c5480,stroke:#7c9eff,color:#eef4ff
style LF fill:#1a2f4a,stroke:#5fd4a8,color:#eef4ff
style Glue_Catalog fill:#1a2f4a,stroke:#5fd4a8,color:#eef4ff`,

  'mermaid-23': `flowchart LR
Producer["データ生成元<br/>(IoTデバイス/<br/>アプリログ/<br/>クリックストリーム)"]

Producer --> KDS["Kinesis Data Streams<br/>(リアルタイム取り込み<br/>シャード単位でスケール)"]

KDS --> Firehose["Amazon Data Firehose<br/>(旧Kinesis Data Firehose)<br/>(配信・変換をマネージド化)"]
KDS --> KDA["Managed Service for<br/>Apache Flink<br/>(旧Kinesis Data Analytics)<br/>(ストリーム上でリアルタイム分析)"]

Firehose --> S3_f[("Amazon S3")]
Firehose --> Redshift_f[("Amazon Redshift")]
Firehose --> OpenSearch_f[("Amazon OpenSearch<br/>Service")]

KDA --> Dashboard["リアルタイム<br/>ダッシュボード/アラート"]

style KDS fill:#2c5480,stroke:#7c9eff,color:#eef4ff
style Firehose fill:#2c5480,stroke:#5fd4a8,color:#eef4ff
style KDA fill:#1a2f4a,stroke:#7c9eff,color:#eef4ff`,

  'mermaid-24': `flowchart TD
Start["データ取り込みの<br/>頻度要件は?"]

Start --> Q1{"リアルタイム性が<br/>必要か?<br/>(秒〜分単位の遅延許容度)"}
Q1 -- "はい" --> Streaming["ストリーミング取り込み<br/>Kinesis Data Streams /<br/>Amazon MSK"]
Q1 -- "いいえ(時間〜日単位で十分)" --> Batch["バッチ取り込み<br/>AWS Glueジョブ /<br/>Amazon EMR / DataSync"]

style Streaming fill:#2c5480,stroke:#5fd4a8,color:#eef4ff
style Batch fill:#1a2f4a,stroke:#7c9eff,color:#eef4ff`,

  'mermaid-25': `flowchart LR
S3_raw[("Amazon S3<br/>(生データ: CSV/JSON)")]
Crawler["AWS Glueクローラ<br/>(スキーマを自動検出)"]
Catalog["AWS Glueデータカタログ<br/>(テーブル定義を登録)"]
ETL["AWS Glue ETLジョブ<br/>(Apache Spark)"]
S3_processed[("Amazon S3<br/>(変換後: Parquet等)")]

S3_raw --> Crawler --> Catalog --> ETL
S3_raw --> ETL
ETL -- "CSV → Parquet<br/>(列指向・圧縮フォーマットへ変換)" --> S3_processed

style Crawler fill:#1a2f4a,stroke:#7c9eff,color:#eef4ff
style Catalog fill:#1a2f4a,stroke:#7c9eff,color:#eef4ff
style ETL fill:#2c5480,stroke:#7c9eff,color:#eef4ff`,

  'mermaid-26': `flowchart TD
Start["オンプレミスから<br/>AWSへのデータ転送要件は?"]

Start --> Q1{"継続的な同期・<br/>大量ファイルの<br/>高速なワンタイム/定期転送か?"}
Q1 -- はい --> DataSync["AWS DataSync<br/>(ネットワーク経由の高速転送)"]

Start --> Q2{"オンプレミスアプリから<br/>継続的にファイル/ブロックとして<br/>アクセスし続けたいか?"}
Q2 -- はい --> SGW["AWS Storage Gateway<br/>(常時アクセス可能なハイブリッドストレージ)"]

Start --> Q3{"ペタバイト級の<br/>一括移行で、<br/>ネットワーク帯域が不足か?"}
Q3 -- はい --> Snow["AWS Snow Family<br/>(物理デバイスによるオフライン転送)"]

style DataSync fill:#2c5480,stroke:#7c9eff,color:#eef4ff
style SGW fill:#2c5480,stroke:#5fd4a8,color:#eef4ff
style Snow fill:#1a2f4a,stroke:#e2716f,color:#eef4ff`,

};
