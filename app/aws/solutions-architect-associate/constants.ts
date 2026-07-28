export const DIAGRAMS: Record<string, string> = {
    'mermaid-target-1': `pie showData
    title SAA-C03 出題ドメイン配点
    "ドメイン1: セキュアなアーキテクチャの設計 (30%)" : 30
    "ドメイン2: 回復力のあるアーキテクチャの設計 (26%)" : 26
    "ドメイン3: 高性能アーキテクチャの設計 (24%)" : 24
    "ドメイン4: コスト最適化アーキテクチャの設計 (20%)" : 20`,

    'mermaid-target-2': `flowchart TB
    subgraph AWS["AWSの責任範囲：クラウドのセキュリティ"]
        A1[リージョン・AZ・エッジロケーションの物理セキュリティ]
        A2[ハードウェア・ネットワークインフラ]
        A3[仮想化基盤・ホストOS]
        A4[マネージドサービス自体の可用性・パッチ適用]
    end
    subgraph CUSTOMER["顧客の責任範囲：クラウド内のセキュリティ"]
        C1[ゲストOSのパッチ適用・設定]
        C2[IAMユーザー・ロール・権限管理]
        C3[セキュリティグループ・NACL設定]
        C4[データの暗号化設定]
        C5[アプリケーションレベルのセキュリティ]
    end
    AWS -.基盤を提供.-> CUSTOMER`,

    'mermaid-target-3': `flowchart TD
    Start([リクエスト発生]) --> Explicit{明示的な<br/>Denyが存在する?}
    Explicit -->|はい| Deny1[アクセス拒否<br/>常に最優先]
    Explicit -->|いいえ| SCP{SCP・境界で<br/>許可されている?}
    SCP -->|いいえ| Deny2[アクセス拒否]
    SCP -->|はい| Identity{IDベース or<br/>リソースベースポリシーで<br/>明示的Allowがある?}
    Identity -->|いいえ| Deny3[デフォルト拒否<br/>暗黙のDeny]
    Identity -->|はい| Allow[アクセス許可]`,

    'mermaid-target-4': `flowchart TB
    subgraph ORG["AWS Organizations（管理アカウント）"]
        MGMT[管理アカウント<br/>請求の一元化・SCP管理]
    end
    subgraph OU1["本番用 OU"]
        P1[本番アカウント1]
        P2[本番アカウント2]
    end
    subgraph OU2["開発・検証用 OU"]
        D1[開発アカウント]
        D2[検証アカウント]
    end
    subgraph OU3["セキュリティ・監査用 OU"]
        S1[ログアーカイブアカウント]
        S2[セキュリティ監査アカウント]
    end
    MGMT --> OU1
    MGMT --> OU2
    MGMT --> OU3
    MGMT -.SCPで制限.-> OU1
    MGMT -.SCPで制限.-> OU2`,

    'mermaid-target-5': `flowchart TB
    IGW["インターネットゲートウェイ (IGW)"]
    subgraph VPC["VPC (10.0.0.0/16)"]
        subgraph PublicSub["パブリックサブネット (10.0.1.0/24)"]
            ALB[Application Load Balancer]
            NAT["NATゲートウェイ"]
        end
        subgraph PrivateSub1["プライベートサブネット AZ-a (10.0.2.0/24)"]
            APP1[アプリケーションサーバー]
        end
        subgraph PrivateSub2["プライベートサブネット AZ-c (10.0.3.0/24)"]
            APP2[アプリケーションサーバー]
        end
        subgraph DataSub["データ層プライベートサブネット"]
            RDS[(RDSデータベース)]
        end
    end
    Internet((インターネット)) <--> IGW
    IGW <--> ALB
    ALB --> APP1
    ALB --> APP2
    APP1 --> NAT
    APP2 --> NAT
    NAT --> IGW
    APP1 --> RDS
    APP2 --> RDS`,

    'mermaid-target-6': `flowchart LR
    subgraph Transit["転送時の暗号化 (Encryption in Transit)"]
        T1[クライアント] -->|TLS/HTTPS| T2[ALB/CloudFront]
        T2 -->|ACM証明書で終端| T3[バックエンド]
    end
    subgraph Rest["保管時の暗号化 (Encryption at Rest)"]
        R1[EBS/S3/RDS/DynamoDB] -->|データキーで暗号化| R2["AWS KMS<br/>（カスタマーマスターキー: CMK）"]
        R2 -->|キーポリシー・IAMで<br/>アクセス制御| R3[権限を持つ<br/>プリンシパルのみ復号可]
    end`,

    'mermaid-target-7': `flowchart LR
    subgraph Sync["密結合（悪い例）: 同期呼び出し"]
        A1[サービスA] -->|直接HTTP呼び出し| A2[サービスB]
        A2 -.障害・遅延が直接伝播.-> A1
    end
    subgraph Async["疎結合（良い例）: 非同期メッセージング"]
        B1[サービスA] -->|メッセージ送信| Q[Amazon SQS<br/>キュー]
        Q -->|ポーリングで取得| B2[サービスB]
        B2 -.障害時もキューに蓄積<br/>Aは影響を受けない.-> Q
    end`,

    'mermaid-target-8': `flowchart TB
    Producer[イベント発生元] --> SNS["Amazon SNS<br/>(Pub/Sub トピック)"]
    SNS --> SQS1[SQSキュー1<br/>注文処理サービス]
    SNS --> SQS2[SQSキュー2<br/>通知サービス]
    SNS --> Lambda1[Lambda<br/>分析用データ集計]
    SQS1 --> Consumer1[注文処理ワーカー]
    SQS2 --> Consumer2[メール/SMS送信ワーカー]`,

    'mermaid-target-9': `flowchart TB
    R53["Amazon Route 53<br/>(DNSフェイルオーバー/加重ルーティング)"]
    subgraph Region["AWSリージョン"]
        subgraph AZa["Availability Zone A"]
            ALB1[ALB]
            APP1[アプリケーション]
            DB1[(RDSプライマリ)]
        end
        subgraph AZc["Availability Zone C"]
            APP2[アプリケーション]
            DB2[(RDSスタンバイ<br/>同期レプリケーション)]
        end
    end
    R53 --> ALB1
    ALB1 --> APP1
    ALB1 --> APP2
    DB1 -.Multi-AZ同期レプリケーション.-> DB2
    DB1 -.障害時は自動フェイルオーバー.-> DB2`,

    'mermaid-target-10': `flowchart LR
    A["Backup & Restore<br/>RTO: 数時間〜<br/>RPO: 数時間〜<br/>コスト: 最小"] --> B["Pilot Light<br/>RTO: 数十分<br/>RPO: 数分<br/>コスト: 低"]
    B --> C["Warm Standby<br/>RTO: 数分<br/>RPO: 秒〜分<br/>コスト: 中"]
    C --> D["Active-Active（マルチサイト）<br/>RTO: ほぼゼロ<br/>RPO: ほぼゼロ<br/>コスト: 最大"]`,

    'mermaid-target-11': `flowchart TD
    Start([ストレージ要件を確認]) --> Q1{複数インスタンスから<br/>同時アクセスするか？}
    Q1 -->|いいえ・単一インスタンス専有| Q2{超低レイテンシの<br/>ブロックストレージが必要?}
    Q1 -->|はい・共有アクセス| Q3{POSIX互換の<br/>ファイルシステムが必要?}
    Q2 -->|はい| EBS["Amazon EBS<br/>(ブロックストレージ)"]
    Q2 -->|いいえ・一時利用でよい| InstanceStore["インスタンスストア<br/>(一時的な高速ローカルディスク)"]
    Q3 -->|はい・Linux/Windows| Q4{OSの種類は?}
    Q3 -->|いいえ・オブジェクト単位でよい| S3["Amazon S3<br/>(オブジェクトストレージ)"]
    Q4 -->|Linux| EFS["Amazon EFS<br/>(NFS共有ファイルストレージ)"]
    Q4 -->|Windows| FSxW["Amazon FSx for Windows<br/>File Server (SMB)"]
    Q3 -->|高性能計算・機械学習向け| FSxLustre["Amazon FSx for Lustre<br/>(HPC向け並列ファイルシステム)"]`,

    'mermaid-target-12': `flowchart LR
    CW[Amazon CloudWatch<br/>メトリクス監視] -->|CPU使用率等が<br/>閾値超過| Policy[スケーリングポリシー]
    Policy --> ASG["Auto Scaling グループ"]
    ASG -->|スケールアウト| New[新しいインスタンスを起動]
    ASG -->|スケールイン| Remove[不要インスタンスを終了]
    New --> HealthCheck{ヘルスチェック}
    HealthCheck -->|異常| Replace[自動的に置き換え]
    HealthCheck -->|正常| InService[サービスイン]`,

    'mermaid-target-13': `flowchart TD
    Start([データの性質を確認]) --> Q1{構造化データで<br/>複雑なJOIN/トランザクションが必要?}
    Q1 -->|はい| Q2{MySQL/PostgreSQL互換で<br/>高いスケーラビリティが必要?}
    Q1 -->|いいえ・KVS/ドキュメント志向| Q3{ミリ秒未満の<br/>超低レイテンシが必要?}
    Q2 -->|はい| Aurora["Amazon Aurora<br/>(クラウドネイティブRDBMS)"]
    Q2 -->|いいえ・標準的な要件| RDS["Amazon RDS<br/>(MySQL/PostgreSQL/Oracle/SQL Server/MariaDB)"]
    Q3 -->|はい・大規模スケール| DynamoDB["Amazon DynamoDB<br/>(サーバーレスNoSQL)"]
    Q3 -->|インメモリキャッシュ| ElastiCache["Amazon ElastiCache<br/>(Redis/Memcached)"]`,

    'mermaid-target-14': `flowchart LR
    App[アプリケーション] -->|書き込み| Primary[(プライマリDB)]
    Primary -->|非同期レプリケーション| Replica1[(リードレプリカ1)]
    Primary -->|非同期レプリケーション| Replica2[(リードレプリカ2)]
    App -->|読み取りクエリを分散| Replica1
    App -->|読み取りクエリを分散| Replica2
    App -->|頻繁に読むデータは<br/>まずキャッシュを確認| Cache["ElastiCache<br/>(Redis/Memcached)"]
    Cache -.キャッシュミス時のみ.-> Primary`,

    'mermaid-target-15': `flowchart TB
    User[世界中のユーザー] --> CF["Amazon CloudFront<br/>(CDN: 静的コンテンツ配信・キャッシュ)"]
    User --> GA["AWS Global Accelerator<br/>(動的コンテンツ・TCP/UDPの高速化)"]
    CF --> Origin[オリジン: S3/ALB/カスタムオリジン]
    GA --> ALB1[ALB - リージョンA]
    GA --> ALB2[ALB - リージョンB]`,

    'mermaid-target-16': `flowchart TB
    subgraph TGW["AWS Transit Gateway（ハブ）"]
    end
    VPC1[VPC A] --- TGW
    VPC2[VPC B] --- TGW
    VPC3[VPC C] --- TGW
    OnPrem[オンプレミス拠点] -->|Direct Connect/VPN| TGW`,

    'mermaid-target-17': `flowchart LR
    subgraph Ingest["取り込み"]
        Kinesis["Amazon Kinesis<br/>Data Streams/Firehose"]
        DataSync["AWS DataSync"]
        SGW["AWS Storage Gateway"]
    end
    subgraph Transform["変換"]
        Glue["AWS Glue<br/>(ETL・データカタログ)"]
        EMR2["Amazon EMR<br/>(Hadoop/Spark)"]
    end
    subgraph Store["データレイク"]
        S3DL[("Amazon S3<br/>データレイク")]
    end
    subgraph Analyze["分析・可視化"]
        Athena["Amazon Athena<br/>(サーバーレスSQLクエリ)"]
        LakeFormation["AWS Lake Formation<br/>(データレイク権限管理)"]
        QuickSight["Amazon QuickSight<br/>(BI・可視化)"]
    end
    Kinesis --> S3DL
    DataSync --> S3DL
    SGW --> S3DL
    S3DL --> Glue
    Glue --> S3DL
    S3DL --> EMR2
    LakeFormation -.アクセス許可を統制.-> S3DL
    S3DL --> Athena
    Athena --> QuickSight`,

    'mermaid-target-18': `flowchart LR
    Std["S3 Standard<br/>(頻繁アクセス)"] -->|30日後| IA["S3 Standard-IA<br/>(低頻度アクセス)"]
    IA -->|60日後| Glacier["S3 Glacier<br/>Flexible Retrieval<br/>(アーカイブ・数分〜数時間で復元)"]
    Glacier -->|180日後| DeepArchive["S3 Glacier<br/>Deep Archive<br/>(最安・復元に12時間以上)"]
    Std -.アクセスパターンが不明.-> IntelligentTiering["S3 Intelligent-Tiering<br/>(自動的に最適な階層へ移動)"]`,

    'mermaid-target-19': `flowchart TD
    Start([ワークロードの性質は?]) --> Q1{中断されても<br/>問題ないバッチ処理か?}
    Q1 -->|はい| Spot["Spotインスタンス<br/>最大90%割引・中断の可能性あり"]
    Q1 -->|いいえ| Q2{1〜3年の<br/>長期利用が確定しているか?}
    Q2 -->|はい・特定インスタンスタイプ固定でよい| RI["Reserved Instances<br/>最大72%割引"]
    Q2 -->|はい・柔軟性も欲しい| SP["Savings Plans<br/>最大72%割引・インスタンスファミリー変更可"]
    Q2 -->|いいえ・短期/不定期| OnDemand["On-Demandインスタンス<br/>割引なし・柔軟性最大"]`,

    'mermaid-target-20': `flowchart TB
    subgraph Cheap["転送コストが低い・無料に近い"]
        A["同一AZ内の通信"]
        B["VPCエンドポイント経由の<br/>AWSサービスへのアクセス"]
    end
    subgraph Costly["転送コストが高くなりやすい"]
        C["AZをまたぐ通信"]
        D["リージョンをまたぐ通信"]
        E["インターネットへのアウトバウンド通信<br/>(NAT Gateway経由含む)"]
    end
    Cheap -.-> Costly`,

    'mermaid-target-21': `flowchart TB
    subgraph WAF["AWS Well-Architected Framework"]
        P1["運用上の優秀性<br/>Operational Excellence"]
        P2["セキュリティ<br/>Security<br/>(≒ ドメイン1)"]
        P3["信頼性<br/>Reliability<br/>(≒ ドメイン2)"]
        P4["パフォーマンス効率<br/>Performance Efficiency<br/>(≒ ドメイン3)"]
        P5["コスト最適化<br/>Cost Optimization<br/>(≒ ドメイン4)"]
        P6["持続可能性<br/>Sustainability"]
    end`,
};
