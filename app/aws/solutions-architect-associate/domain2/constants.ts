export const DIAGRAMS: Record<string, string> = {
    m1: `%%{init: {'theme': 'dark', 'themeVariables': { 'pie1': '#7c9eff', 'pie2': '#f0b86e', 'pie3': '#7fd9a8', 'pie4': '#a9c1ff', 'pieTitleTextSize': '18px', 'pieSectionTextSize': '14px', 'pieLegendTextSize': '14px' }}}%%
pie showData
    title SAA-C03 出題ドメイン別の比率
    "ドメイン1: セキュアなアーキテクチャの設計 (30%)" : 30
    "ドメイン2: 回復力のあるアーキテクチャの設計 (26%)" : 26
    "ドメイン3: 高性能アーキテクチャの設計 (24%)" : 24
    "ドメイン4: コスト最適化アーキテクチャの設計 (20%)" : 20`,

    m2: `flowchart TD
    D2["ドメイン2<br/>回復力のあるアーキテクチャの設計 (26%)"]
    D2 --> T21["タスク2.1<br/>スケーラブルで疎結合な<br/>アーキテクチャの設計"]
    D2 --> T22["タスク2.2<br/>高可用性および/または<br/>フォールトトレラントな<br/>アーキテクチャの設計"]

    T21 --> T21a["マルチティア設計"]
    T21 --> T21b["疎結合・メッセージング"]
    T21 --> T21c["スケーリング設計"]
    T21 --> T21d["サーバーレス/コンテナ"]

    T22 --> T22a["高可用性設計"]
    T22 --> T22b["障害復旧(DR)戦略"]
    T22 --> T22c["フォールトトレランス"]
    T22 --> T22d["可視性・監視"]

    style D2 fill:#1f3a5f,color:#fff
    style T21 fill:#2c5480,color:#fff
    style T22 fill:#2c5480,color:#fff`,

    m3: `flowchart LR
    User(("ユーザー")) --> DNS["Amazon Route 53<br/>(DNS)"]
    DNS --> CF["Amazon CloudFront<br/>(CDN/エッジ層)"]
    CF --> WebALB["Application Load Balancer<br/>(Webティア入口)"]

    subgraph WebTier["Webティア（プレゼンテーション層）"]
        Web1["EC2 / Fargate"]
        Web2["EC2 / Fargate"]
    end
    WebALB --> Web1
    WebALB --> Web2

    subgraph AppTier["アプリケーションティア（ロジック層）"]
        App1["EC2 / ECS / Lambda"]
        App2["EC2 / ECS / Lambda"]
    end
    Web1 --> InternalALB["内部ロードバランサー"]
    Web2 --> InternalALB
    InternalALB --> App1
    InternalALB --> App2

    subgraph DataTier["データティア（永続化層）"]
        Primary[("Amazon RDS<br/>プライマリ")]
        Replica[("読み取り<br/>レプリカ")]
        Cache[("Amazon ElastiCache")]
    end
    App1 --> Primary
    App2 --> Primary
    App1 --> Cache
    Primary -. "非同期レプリケーション" .-> Replica

    style WebTier fill:#1f3a5f,color:#fff
    style AppTier fill:#1f3a5f,color:#fff
    style DataTier fill:#1f3a5f,color:#fff`,

    m4: `flowchart TD
    Producer["注文サービス<br/>(Producer)"] -->|1. イベント発行| SNS["Amazon SNS<br/>トピック"]
    SNS -->|2a. ファンアウト| SQS1["SQS キュー<br/>(在庫サービス用)"]
    SNS -->|2b. ファンアウト| SQS2["SQS キュー<br/>(通知サービス用)"]
    SNS -->|2c. ファンアウト| SQS3["SQS キュー<br/>(請求サービス用)"]

    SQS1 --> C1["在庫更新 Lambda"]
    SQS2 --> C2["メール通知 Lambda"]
    SQS3 --> C3["請求処理 Lambda"]

    SQS1 -. "失敗を規定回数超過" .-> DLQ1["デッドレターキュー(DLQ)"]

    style SNS fill:#2c5480,color:#fff
    style SQS1 fill:#1f3a5f,color:#fff
    style SQS2 fill:#1f3a5f,color:#fff
    style SQS3 fill:#1f3a5f,color:#fff
    style DLQ1 fill:#7a2e2e,color:#fff`,

    m5: `sequenceDiagram
    participant C as クライアント
    participant AG as Amazon API Gateway
    participant Auth as Lambdaオーソライザー・Cognito
    participant L as AWS Lambda
    participant DB as DynamoDB・RDS

    C->>AG: HTTPSリクエスト
    AG->>Auth: トークン検証を依頼
    Auth-->>AG: 認可結果(許可/拒否)
    alt 認可OK
        AG->>L: バックエンド統合呼び出し
        L->>DB: データ読み書き
        DB-->>L: 結果
        L-->>AG: レスポンス
        AG-->>C: HTTPSレスポンス
    else 認可NG
        AG-->>C: 401・403エラー
    end`,

    m6: `flowchart TD
    CW["Amazon CloudWatch<br/>メトリクス監視 (CPU使用率等)"] -->|しきい値超過| Alarm["CloudWatch アラーム"]
    Alarm -->|スケールアウト指示| ASG["EC2 Auto Scaling グループ"]
    ASG -->|新規インスタンス起動| LT["起動テンプレート<br/>(AMI, インスタンスタイプ等)"]
    LT --> NewInst["新しいEC2インスタンス"]
    NewInst --> ALB["Application Load Balancer<br/>ヘルスチェック合格後に登録"]

    Alarm2["CloudWatch アラーム<br/>(負荷低下を検知)"] -->|スケールイン指示| ASG
    ASG -->|インスタンス終了| Term["需要に応じて<br/>インスタンスを終了"]

    style ASG fill:#2c5480,color:#fff
    style CW fill:#1f3a5f,color:#fff`,

    m7: `flowchart TD
    Start["どのロードバランサーを選ぶか？"] --> Q1{"レイヤー7(HTTP/HTTPS)の<br/>高度なルーティングが必要？"}
    Q1 -->|はい| ALB["Application Load Balancer (ALB)<br/>パスベース/ホストベースルーティング<br/>WebSocket, gRPC対応"]
    Q1 -->|いいえ| Q2{"超低レイテンシ・<br/>高スループット・固定IPが必要？"}
    Q2 -->|はい| NLB["Network Load Balancer (NLB)<br/>レイヤー4(TCP/UDP)<br/>数百万req/秒、静的IP対応"]
    Q2 -->|いいえ| Q3{"サードパーティの仮想アプライアンス<br/>(IDS/IPS,FW等)を<br/>透過的に経由させたい？"}
    Q3 -->|はい| GWLB["Gateway Load Balancer (GWLB)<br/>GENEVEプロトコルで<br/>トラフィックを検査アプライアンスへ透過的に転送"]
    Q3 -->|いいえ| ALB

    style ALB fill:#2c5480,color:#fff
    style NLB fill:#2c5480,color:#fff
    style GWLB fill:#2c5480,color:#fff`,

    m8: `flowchart TD
    User(("ユーザー")) --> Edge["Amazon CloudFront<br/>エッジロケーション<br/>(静的/動的コンテンツをキャッシュ)"]
    Edge -->|キャッシュミス時のみ| Origin["オリジン<br/>(ALB / S3 / API Gateway)"]
    Origin --> App["アプリケーション層"]
    App -->|クエリ結果をキャッシュ<br/>ヒット時は数ミリ秒で応答| EC["Amazon ElastiCache<br/>(Redis/Memcached)"]
    App -->|DynamoDB専用キャッシュ<br/>ヒット時はマイクロ秒で応答| DAX["DynamoDB Accelerator (DAX)"]
    App --> DB[("データベース<br/>RDS / DynamoDB")]

    style Edge fill:#2c5480,color:#fff
    style EC fill:#1f3a5f,color:#fff
    style DAX fill:#1f3a5f,color:#fff`,

    m9: `flowchart LR
    subgraph Spectrum["管理責任の範囲（左：自分で管理 → 右：AWSが管理）"]
        direction LR
        EC2b["Amazon EC2<br/>(OS・スケーリングを自分で管理)"] --> ECSEC2["Amazon ECS on EC2<br/>(コンテナ管理はAWS、<br/>ホストは自分で管理)"]
        ECSEC2 --> Fargate["AWS Fargate<br/>(ECS/EKS用サーバーレスコンピューティング<br/>ホスト管理不要)"]
        Fargate --> Lambda["AWS Lambda<br/>(関数単位の完全サーバーレス<br/>イベント駆動・自動スケール)"]
    end

    style Fargate fill:#2c5480,color:#fff
    style Lambda fill:#2c5480,color:#fff`,

    m10: `flowchart TD
    Start["コンテナオーケストレーションの選択"] --> Q1{"すでにKubernetesの<br/>知識・エコシステムに<br/>投資している、または<br/>マルチクラウド前提か？"}
    Q1 -->|はい| EKS["Amazon EKS<br/>(マネージドKubernetes)"]
    Q1 -->|いいえ| ECS["Amazon ECS<br/>(AWSネイティブなオーケストレーション<br/>シンプルで学習コストが低い)"]

    ECS --> Q2{"インフラ管理を<br/>完全に排除したい？"}
    EKS --> Q2
    Q2 -->|はい| Fargate2["起動タイプ: AWS Fargate<br/>(サーバーレス)"]
    Q2 -->|いいえ、コスト最適化や<br/>特殊なインスタンス要件がある| EC2Type["起動タイプ: EC2<br/>(自己管理のホスト)"]

    style ECS fill:#2c5480,color:#fff
    style EKS fill:#2c5480,color:#fff
    style Fargate2 fill:#1f3a5f,color:#fff`,

    m11: `flowchart LR
    subgraph Stateful["❌ ステートフル設計（回復性が低い）"]
        U1(("ユーザー")) -->|常に同じサーバーに固定| S1["サーバーA<br/>(セッションをメモリ保持)"]
    end

    subgraph Stateless["✅ ステートレス設計（回復性が高い）"]
        U2(("ユーザー")) --> LB2["ロードバランサー"]
        LB2 --> S2a["サーバーA"]
        LB2 --> S2b["サーバーB"]
        LB2 --> S2c["サーバーC (新規追加)"]
        S2a --> Shared[("共有ストア<br/>ElastiCache / DynamoDB<br/>セッション情報")]
        S2b --> Shared
        S2c --> Shared
    end

    style Stateful fill:#7a2e2e,color:#fff
    style Stateless fill:#1f3a5f,color:#fff`,

    m12: `stateDiagram-v2
    [*] --> 注文受付
    注文受付 --> 在庫確認
    在庫確認 --> 決済処理: 在庫あり
    在庫確認 --> 注文キャンセル: 在庫なし
    決済処理 --> 出荷手配: 決済成功
    決済処理 --> 決済リトライ: 決済失敗
    決済リトライ --> 決済処理: 再試行
    決済リトライ --> 注文キャンセル: 規定回数失敗
    出荷手配 --> [*]
    注文キャンセル --> [*]`,

    m13: `flowchart TD
    Start["どのストレージを選ぶか？"] --> Q1{"OSのファイルシステムから<br/>複数インスタンスで<br/>同時共有アクセスしたい？"}
    Q1 -->|はい| EFS["Amazon EFS<br/>(ファイルストレージ)<br/>NFSプロトコル、複数AZで自動レプリケーション"]
    Q1 -->|いいえ| Q2{"単一のEC2インスタンスに<br/>接続する低レイテンシ・<br/>高IOPSなディスクが必要？"}
    Q2 -->|はい| EBS["Amazon EBS<br/>(ブロックストレージ)<br/>単一AZ内、DBやOS用ボリューム"]
    Q2 -->|いいえ| S3["Amazon S3<br/>(オブジェクトストレージ)<br/>API経由、ほぼ無制限にスケール<br/>11 9's の耐久性"]

    style EFS fill:#2c5480,color:#fff
    style EBS fill:#2c5480,color:#fff
    style S3 fill:#2c5480,color:#fff`,

    m14: `flowchart TD
    App["アプリケーション"] -->|書き込み| Primary[("RDS プライマリ<br/>(読み書き両方)")]
    App -->|読み取り| R1[("リードレプリカ1<br/>(同一リージョン)")]
    App -->|読み取り| R2[("リードレプリカ2<br/>(クロスリージョン)")]
    Primary -. "非同期レプリケーション" .-> R1
    Primary -. "非同期レプリケーション" .-> R2

    style Primary fill:#2c5480,color:#fff
    style R1 fill:#1f3a5f,color:#fff
    style R2 fill:#1f3a5f,color:#fff`,

    m15: `flowchart TD
    Global["AWSグローバルインフラストラクチャ"] --> R1["リージョン A<br/>(例: ap-northeast-1 東京)"]
    Global --> R2["リージョン B<br/>(例: us-east-1 バージニア北部)"]

    R1 --> AZ1["アベイラビリティゾーン 1a<br/>(独立したデータセンター群)"]
    R1 --> AZ2["アベイラビリティゾーン 1c"]
    R1 --> AZ3["アベイラビリティゾーン 1d"]

    AZ1 --- Net["低レイテンシ・高帯域の<br/>専用ファイバーで相互接続"]
    AZ2 --- Net
    AZ3 --- Net

    Global --> Edge["エッジロケーション<br/>(CloudFront/Route 53用)"]

    style R1 fill:#2c5480,color:#fff
    style R2 fill:#2c5480,color:#fff
    style AZ1 fill:#1f3a5f,color:#fff
    style AZ2 fill:#1f3a5f,color:#fff
    style AZ3 fill:#1f3a5f,color:#fff`,

    m16: `flowchart LR
    subgraph Spectrum["コスト・複雑さが低い　←　　　　　　→　高い（RTO/RPOも短くなる）"]
        direction LR
        BR["1. Backup & Restore<br/>(バックアップと復元)<br/>RTO:数時間以上 / RPO:数時間以上"] --> PL["2. Pilot Light<br/>(パイロットライト)<br/>RTO:数十分以上 / RPO:数分以上"]
        PL --> WS["3. Warm Standby<br/>(ウォームスタンバイ)<br/>RTO:数分 / RPO:秒から数分"]
        WS --> MA["4. Multi-Site Active-Active<br/>(マルチサイト active-active)<br/>RTO:ほぼ0 / RPO:ほぼ0"]
    end

    style BR fill:#1f3a5f,color:#fff
    style PL fill:#2c5480,color:#fff
    style WS fill:#2c5480,color:#fff
    style MA fill:#7c9eff,color:#000`,

    m17: `flowchart TD
    subgraph PilotLight["Pilot Light 構成例"]
        direction TB
        PrimaryRegion["プライマリリージョン<br/>(フル稼働・全トラフィック処理)"]
        SecondaryRegion["セカンダリリージョン<br/>(DBレプリカのみ常時稼働、<br/>アプリ層はAMI/起動テンプレートを準備済みで停止中)"]
        PrimaryRegion -. "継続的なDBレプリケーション" .-> SecondaryRegion
        SecondaryRegion -. "障害発生時: Auto Scalingでアプリ層を起動しRoute53を切替" .-> Activate["フル本番環境に昇格"]
    end
    style PrimaryRegion fill:#2c5480,color:#fff
    style SecondaryRegion fill:#7a2e2e,color:#fff`,

    m18: `flowchart TD
    subgraph WarmStandby["Warm Standby 構成例"]
        direction TB
        PrimaryRegion2["プライマリリージョン<br/>(フル規模で全トラフィック処理)"]
        SecondaryRegion2["セカンダリリージョン<br/>(縮小規模ながら全ティアが常時稼働)"]
        PrimaryRegion2 -. "継続的なレプリケーション" .-> SecondaryRegion2
        SecondaryRegion2 -. "障害発生時: Auto Scalingでフル規模にスケールしRoute53を切替" .-> Activate2["フル本番環境にスケールアップ"]
    end
    style PrimaryRegion2 fill:#2c5480,color:#fff
    style SecondaryRegion2 fill:#7a2e2e,color:#fff`,

    m19: `flowchart TD
    subgraph ActiveActive["Multi-Site Active-Active 構成例"]
        direction TB
        Route53Global["Amazon Route 53<br/>(レイテンシベース/地理ルーティング)"]
        Route53Global --> RegionA["リージョン A<br/>(本番規模・トラフィック処理)"]
        Route53Global --> RegionB["リージョン B<br/>(本番規模・トラフィック処理)"]
        RegionA <==>|DynamoDB グローバルテーブル / Aurora グローバルデータベース| RegionB
    end
    style RegionA fill:#2c5480,color:#fff
    style RegionB fill:#2c5480,color:#fff`,

    m20: `flowchart TD
    UserReq(("ユーザー")) --> R53["Amazon Route 53"]
    R53 -->|ヘルスチェック正常| PrimaryIP["プライマリ環境 (ALB / IP)<br/>通常トラフィック処理"]
    R53 -. "ヘルスチェック異常検知(障害)" .-> SecondaryIP["セカンダリ環境 (ALB / IP)<br/>自動切り替え"]

    HC["Route 53 ヘルスチェック<br/>(30秒間隔でエンドポイント監視)"] -. "監視" .-> PrimaryIP
    HC -. "状態変更を通知" .-> R53

    style PrimaryIP fill:#2c5480,color:#fff
    style SecondaryIP fill:#7a2e2e,color:#fff`,

    m21: `flowchart TD
    Start["新バージョンのデプロイが必要"] --> Build["新しいAMI/コンテナイメージを<br/>ビルド(Blue環境とは別に)"]
    Build --> Green["Green環境<br/>(新バージョン)を<br/>新しいAuto Scalingグループで起動"]
    Green --> Test["Green環境をテスト・検証"]
    Test -->|問題なし| Switch["Route 53 の加重ルーティングまたは<br/>ELBの向き先を切り替え<br/>トラフィックをGreenへ"]
    Test -->|問題あり| Rollback["Blue環境のまま維持<br/>(Greenは破棄)"]
    Switch --> Monitor["監視: 問題があれば<br/>即座にBlueへロールバック"]
    Monitor --> Decommission["問題なければ<br/>旧Blue環境を終了"]

    style Green fill:#2c5480,color:#fff
    style Switch fill:#7c9eff,color:#000`,

    m22: `flowchart LR
    subgraph Clients["大量の同時クライアント"]
        L1["Lambda 実行環境 x 100+"]
    end
    Clients -->|多数の短命な接続| Proxy["Amazon RDS Proxy<br/>(コネクションプーリング)"]
    Proxy -->|少数の安定した接続| DB[("RDS / Aurora<br/>プライマリ")]
    DB -. "フェイルオーバー発生" .-> Standby[("スタンバイ<br/>インスタンス")]
    Proxy -. "フェイルオーバーを自動検知し透過的に新プライマリへ再接続" .-> Standby

    style Proxy fill:#2c5480,color:#fff`,

    m23: `flowchart TD
    S3Obj["S3オブジェクト<br/>アップロード"] --> AZ1s["AZ 1に複製"]
    S3Obj --> AZ2s["AZ 2に複製"]
    S3Obj --> AZ3s["AZ 3に複製"]
    AZ1s --> Result["99.999999999% (イレブンナイン) の年間耐久性<br/>= 1000万個のオブジェクトを1万年保管して平均1個を失う程度"]
    AZ2s --> Result
    AZ3s --> Result

    style Result fill:#2c5480,color:#fff`,

    m24: `flowchart TD
    Design["アーキテクチャ設計"] --> Check["主要サービスの<br/>デフォルトクォータを事前に確認"]
    Check --> DR["DR用セカンダリリージョンの<br/>クォータも同様に確認・引き上げ申請"]
    DR --> Monitor["AWS Service Quotas /<br/>Trusted Advisor でクォータ使用率を監視"]
    Monitor --> Alarm["CloudWatchアラームで<br/>80%到達時に通知"]
    Alarm --> Increase["必要に応じて<br/>事前にクォータ引き上げをリクエスト"]

    style Check fill:#2c5480,color:#fff
    style Monitor fill:#1f3a5f,color:#fff`,

    m25: `flowchart LR
    Req["1つのユーザーリクエスト"] --> AG2["API Gateway"]
    AG2 --> L2["Lambda"]
    L2 --> DDB["DynamoDB"]
    L2 --> S3b["S3"]
    L2 --> Ext["外部API"]

    AG2 -. "トレースセグメント送信" .-> XRay["AWS X-Ray"]
    L2 -. "トレースセグメント送信" .-> XRay
    DDB -. "トレースセグメント送信" .-> XRay
    XRay --> Map["サービスマップとして可視化<br/>(遅延・エラー発生箇所が一目瞭然)"]

    style XRay fill:#2c5480,color:#fff
    style Map fill:#7c9eff,color:#000`,
};
