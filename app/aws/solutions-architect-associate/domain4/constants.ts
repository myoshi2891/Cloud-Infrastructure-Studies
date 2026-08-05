export const DIAGRAMS: Record<string, string> = {
    'mermaid-src-00': `pie showData
    "ドメイン1: セキュアなアーキテクチャの設計 (30%)" : 30
    "ドメイン2: 回復力のあるアーキテクチャの設計 (26%)" : 26
    "ドメイン3: 高性能アーキテクチャの設計 (24%)" : 24
    "ドメイン4: コスト最適化アーキテクチャの設計 (20%)" : 20`,

    'mermaid-src-01': `flowchart LR
    D4["ドメイン4<br/>コスト最適化<br/>アーキテクチャの設計"]
    T1["Task 4.1<br/>ストレージ"]
    T2["Task 4.2<br/>コンピューティング"]
    T3["Task 4.3<br/>データベース"]
    T4["Task 4.4<br/>ネットワーク"]

    D4 --> T1
    D4 --> T2
    D4 --> T3
    D4 --> T4`,

    'mermaid-src-02': `flowchart TB
    subgraph Org["AWS Organizations(管理アカウント)"]
        CB["連結請求<br/>Consolidated Billing"]
    end

    subgraph Accounts["メンバーアカウント群"]
        A1["アカウントA"]
        A2["アカウントB"]
        A3["アカウントC"]
    end

    Tags["コスト配分タグ<br/>Cost Allocation Tags"]
    CUR["Cost and Usage Report<br/>詳細な使用量・料金明細"]
    CE["Cost Explorer<br/>可視化・分析・予測"]
    Budgets["AWS Budgets<br/>予算設定とアラート"]

    A1 --> CB
    A2 --> CB
    A3 --> CB
    CB --> CUR
    Tags -.付与.-> A1
    Tags -.付与.-> A2
    Tags -.付与.-> A3
    CUR --> CE
    CUR --> Budgets
    CE -->|コスト超過を検知| Budgets
    Budgets -->|通知| Notify["SNS通知 / Chatbot"]`,

    'mermaid-src-03': `flowchart TD
    Start["ワークロードの<br/>アクセス方式は?"]
    Start -->|HTTP/APIでオブジェクト単位| Obj["オブジェクトストレージ<br/>Amazon S3"]
    Start -->|OSのファイルシステムとして<br/>複数インスタンスから共有| File["ファイルストレージ<br/>Amazon EFS / Amazon FSx"]
    Start -->|単一インスタンスに<br/>ディスクとしてアタッチ| Block["ブロックストレージ<br/>Amazon EBS / インスタンスストア"]

    File -->|Linux向け・NFS| EFS["Amazon EFS"]
    File -->|Windows向け・SMB<br/>または高性能ワークロード| FSx["Amazon FSx<br/>(Windows File Server /<br/>Lustre / NetApp ONTAP)"]`,

    'mermaid-src-04': `flowchart LR
    Upload["オブジェクトを<br/>アップロード"] --> Standard["S3 Standard<br/>(頻繁にアクセス)"]

    Standard -->|30日後<br/>ライフサイクルルール| IA["S3 Standard-IA<br/>(低頻度アクセス)"]
    Standard -->|アクセス頻度が<br/>不明・変動する場合| IT["S3 Intelligent-Tiering<br/>(自動階層化)"]
    IA -->|60日後| GIR["S3 Glacier<br/>Instant Retrieval<br/>(即時取り出し)"]
    GIR -->|90日後| GFR["S3 Glacier<br/>Flexible Retrieval<br/>(分〜時間で取り出し)"]
    GFR -->|180日後| DA["S3 Glacier<br/>Deep Archive<br/>(最安・12時間以内)"]
    DA -->|保持期間満了| Expire["オブジェクトの<br/>自動削除"]`,

    'mermaid-src-05': `sequenceDiagram
    participant User as リクエスト元ユーザー
    participant Bucket as S3バケット<br/>(Requester Pays有効)
    participant Owner as バケット所有者

    Owner->>Bucket: Requester Pays を有効化
    User->>Bucket: GETリクエスト<br/>(x-amz-request-payerヘッダー必須)
    Bucket-->>User: オブジェクトを返却
    Note over User,Bucket: データ転送料金・リクエスト料金は<br/>「User(リクエスト元)」に課金される
    Note over Owner,Bucket: ストレージ保存料金は<br/>引き続き所有者が負担`,

    'mermaid-src-06': `flowchart TD
    Q1["ワークロードの<br/>IOPS要件は?"]
    Q1 -->|汎用的・バランス型<br/>ほとんどのワークロード| GP3["gp3(SSD)<br/>ベースライン3,000 IOPS<br/>IOPSとスループットを個別課金"]
    Q1 -->|ミッションクリティカルな<br/>高IOPS・DB等| IOTier["io2 Block Express(SSD)<br/>最大256,000 IOPS<br/>高耐久性"]
    Q1 -->|大容量シーケンシャル<br/>アクセス・ビッグデータ| ST1["st1(HDDスループット最適化)<br/>ログ処理・ビッグデータに最適<br/>gp3より安価"]
    Q1 -->|アクセス頻度が低い<br/>コールドデータ| SC1["sc1(HDDコールド)<br/>最安価格帯<br/>アーカイブ的用途"]

    GP3 -.コスト効率が良く<br/>ほぼ全ての用途に置き換え可能.-> Note1["gp2からgp3への<br/>移行でコスト削減"]`,

    'mermaid-src-07': `flowchart TD
    Start["オンプレミスから<br/>AWSへのデータ移行/連携"]

    Start -->|継続的な同期<br/>定期的なバッチ転送| DataSync["AWS DataSync<br/>NFS/SMB/オブジェクトを<br/>S3・EFS・FSxへ自動転送"]
    Start -->|SFTP/FTPS/FTPによる<br/>ファイル転送を維持したい| Transfer["AWS Transfer Family<br/>既存のFTP系ワークフローを<br/>そのままS3/EFSへ"]
    Start -->|オンプレミスアプリから<br/>低レイテンシーで<br/>継続的にアクセス| Gateway["AWS Storage Gateway<br/>(File/Volume/Tape Gateway)"]
    Start -->|数十TB〜PB級の<br/>一括大量データ移行<br/>ネットワーク帯域が不足| Snow["AWS Snow Family<br/>(Snowball Edge等)<br/>物理デバイスで輸送"]

    Gateway --> FileGW["File Gateway<br/>NFS/SMB経由でS3を<br/>ファイル共有として利用"]
    Gateway --> VolGW["Volume Gateway<br/>iSCSIブロックボリューム<br/>+ S3へのバックアップ"]
    Gateway --> TapeGW["Tape Gateway<br/>仮想テープライブラリで<br/>バックアップアーカイブ"]`,

    'mermaid-src-08': `flowchart TD
    RPO["RPO/RTO要件を確認"] --> Plan["バックアッププランを設計"]
    Plan --> Backup["AWS Backup<br/>(EBS/RDS/EFS/DynamoDBなどを<br/>一元的にバックアップ)"]
    Backup --> Tier1["直近: 頻繁にリストア可能な<br/>ストレージ層に保持"]
    Backup --> Tier2["長期: コールドストレージ<br/>(S3 Glacier Deep Archive等)へ<br/>ライフサイクル移行"]
    Tier2 --> VaultLock["Vault Lock<br/>コンプライアンス要件による<br/>改ざん防止・削除不可設定"]`,

    'mermaid-src-09': `flowchart TD
    Q["ワークロードの特性は?"]
    Q -->|短期・予測不可・<br/>柔軟に起動/停止したい| OnDemand["On-Demand Instances<br/>秒単位課金、コミットメントなし<br/>(最も割高)"]
    Q -->|1〜3年の長期利用が<br/>確定している| RI["Reserved Instances /<br/>Savings Plans<br/>最大72%割引"]
    Q -->|中断されても問題ない<br/>バッチ/ステートレス処理| Spot["Spot Instances<br/>最大90%割引<br/>2分前中断通知あり"]
    Q -->|使用量が変動し<br/>柔軟なコミットが良い| SP["Compute Savings Plans<br/>インスタンスファミリー/リージョン/OSを<br/>問わず割引適用"]

    RI --> RIType["Standard RI<br/>(割引大・変更不可)"]
    RI --> RIType2["Convertible RI<br/>(割引やや小・<br/>インスタンスタイプ変更可)"]`,

    'mermaid-src-10': `flowchart LR
    Load["負荷が増加"] --> Type{"スケーリング方式"}
    Type -->|インスタンス数を増やす| Horizontal["水平スケーリング<br/>(Auto Scaling)<br/>可用性が高く、コスト調整も柔軟"]
    Type -->|インスタンスサイズを<br/>大きくする| Vertical["垂直スケーリング<br/>(インスタンスタイプ変更)<br/>単一障害点になりやすい<br/>再起動が必要な場合あり"]
    Horizontal --> Pref["一般的にAWSでは<br/>水平スケーリングが推奨"]`,

    'mermaid-src-11': `flowchart TD
    Start["ワークロードの<br/>実行パターンは?"]
    Start -->|常時稼働・<br/>OSレベルの制御が必要| EC2["Amazon EC2<br/>(必要ならRI/Savings Plansで割引)"]
    Start -->|イベント駆動・<br/>短時間実行・最大15分| Lambda["AWS Lambda<br/>実行時間とリクエスト数のみ課金<br/>アイドル時は無課金"]
    Start -->|コンテナだが<br/>サーバー管理をしたくない| Fargate["AWS Fargate<br/>(ECS/EKS上で稼働)<br/>vCPU・メモリ単位で課金"]
    Start -->|大量データの<br/>バッチジョブ実行| Batch["AWS Batch<br/>Spotと組み合わせて<br/>コストを最小化しやすい"]
    Start -->|自前でクラスタ管理・<br/>柔軟なスケジューリング| ECSEC2["ECS/EKS on EC2<br/>(Spot併用でさらに削減)"]`,

    'mermaid-src-12': `flowchart TD
    Idle["インスタンスが<br/>一時的に不要になった"]
    Idle -->|完全に不要・データ保持不要| Terminate["終了(Terminate)<br/>ストレージ課金もゼロに"]
    Idle -->|再開時に高速に<br/>メモリ状態を復元したい| Hibernate["休止(Hibernate)<br/>RAM内容をEBSに保存<br/>停止中はEBS/EIP課金のみ"]
    Idle -->|単純に一時停止したい| Stop["停止(Stop)<br/>EC2課金は止まるが<br/>EBS/EIP課金は継続"]`,

    'mermaid-src-13': `flowchart TD
    Q["トラフィックの種類は?"]
    Q -->|HTTP/HTTPS<br/>レイヤー7・パスベースルーティング| ALB["Application Load Balancer<br/>(ALB)"]
    Q -->|TCP/UDP<br/>超低レイテンシー・高スループット| NLB["Network Load Balancer<br/>(NLB)"]
    Q -->|サードパーティ製<br/>仮想アプライアンス<br/>IDS/IPS/FWなどを経由| GWLB["Gateway Load Balancer<br/>(GWLB)"]`,

    'mermaid-src-14': `flowchart TD
    Need["低レイテンシー・<br/>データ主権要件"]
    Need -->|完全にオンプレミス施設で<br/>AWSと同じAPIを使いたい| Outposts["AWS Outposts<br/>(物理ラックをオンプレミスに設置)"]
    Need -->|主要リージョンに近い<br/>大都市圏での低レイテンシー| LocalZones["AWS Local Zones"]
    Need -->|5Gネットワークエッジでの<br/>超低レイテンシー| Wavelength["AWS Wavelength"]
    Need -->|IoTデバイス側で<br/>処理を完結したい| Edge["エッジ処理<br/>(AWS IoT Greengrass等)"]`,

    'mermaid-src-15': `flowchart TD
    Start["データモデルと<br/>アクセスパターンは?"]
    Start -->|複雑なJOIN・トランザクション<br/>整合性が重要| Relational["リレーショナル<br/>(RDS / Aurora)"]
    Start -->|キーバリュー・大規模スケール<br/>ミリ秒単位のレイテンシー| NoSQL["非リレーショナル<br/>(DynamoDB)"]

    Relational -->|MySQL/PostgreSQL<br/>互換性重視・移行元と同一エンジン| RDS["Amazon RDS<br/>(マネージドMySQL/PostgreSQL/<br/>MariaDB/Oracle/SQL Server)"]
    Relational -->|クラウドネイティブな<br/>高可用性・自動スケール| Aurora["Amazon Aurora<br/>(MySQL/PostgreSQL互換)<br/>ストレージ自動拡張・従量課金"]

    NoSQL -->|予測可能な負荷| Provisioned["DynamoDB<br/>プロビジョンドキャパシティ"]
    NoSQL -->|不規則・スパイクする負荷| OnDemandDB["DynamoDB<br/>オンデマンドキャパシティ"]`,

    'mermaid-src-16': `flowchart LR
    subgraph DynamoDB["DynamoDB キャパシティモード"]
        Prov["プロビジョンド<br/>(RCU/WCUを事前設定)"]
        OnDemand["オンデマンド<br/>(リクエスト数課金)"]
    end
    Prov -->|Auto Scalingで<br/>需要に応じ調整| AutoScale["DynamoDB Auto Scaling"]
    Prov -.予測可能な安定負荷なら<br/>オンデマンドより割安.-> Cheaper["コスト最適"]
    OnDemand -.スパイク・新規/不明な<br/>トラフィックパターン.-> Flex["運用が容易"]`,

    'mermaid-src-17': `flowchart LR
    Lambda1["Lambda<br/>実行環境1"] --> Proxy["RDS Proxy<br/>コネクションプーリング"]
    Lambda2["Lambda<br/>実行環境2"] --> Proxy
    Lambda3["Lambda<br/>実行環境N<br/>(大量の同時実行)"] --> Proxy
    Proxy -->|少数の安定した<br/>DB接続に集約| RDS["Amazon RDS /<br/>Aurora"]`,

    'mermaid-src-18': `flowchart TD
    App["アプリケーション"]
    App -->|書き込み| Primary["プライマリDB<br/>(RDS/Aurora)"]
    App -->|読み取り| RR1["読み取りレプリカ1"]
    App -->|読み取り| RR2["読み取りレプリカ2"]
    Primary -.非同期レプリケーション.-> RR1
    Primary -.非同期レプリケーション.-> RR2
    RR2 -.クロスリージョン<br/>(DR/近接ユーザー向け).-> RegionB["別リージョンの<br/>読み取りレプリカ"]`,

    'mermaid-src-19': `flowchart LR
    App["アプリケーション"] -->|まずキャッシュを確認| Cache{"キャッシュヒット?"}
    Cache -->|Yes: 高速・低コスト| Return["キャッシュから応答"]
    Cache -->|No| DB["データベースへ問い合わせ"]
    DB --> Store["結果をキャッシュに格納"]
    Store --> Return

    subgraph Options["キャッシュサービスの選択"]
        Redis["Amazon ElastiCache<br/>(Redis/Valkey)<br/>汎用キャッシュ・セッション管理"]
        DAX["Amazon DynamoDB<br/>Accelerator (DAX)<br/>DynamoDB専用インメモリキャッシュ"]
    end`,

    'mermaid-src-20': `flowchart TD
    Req["データ保持要件<br/>(法規制/RPO)を確認"]
    Req --> Auto["自動バックアップ<br/>(RDS: 1〜35日保持)"]
    Req --> Manual["手動スナップショット<br/>(削除するまで保持・課金継続)"]
    Manual -->|不要になったら<br/>削除を徹底| Cleanup["定期的な棚卸しで<br/>コスト削減"]
    Auto -->|ポイントインタイム<br/>リカバリが必要| PITR["トランザクションログの保持"]`,

    'mermaid-src-21': `flowchart TD
    Migrate["データベース移行"]
    Migrate -->|同一エンジン間<br/>例: MySQL→MySQL| Homo["同種移行(Homogeneous)<br/>AWS DMSのみで完結"]
    Migrate -->|異なるエンジン間<br/>例: Oracle→Aurora PostgreSQL| Hetero["異種移行(Heterogeneous)<br/>AWS SCTでスキーマ変換<br/>+ AWS DMSでデータ移行"]`,

    'mermaid-src-22': `flowchart TD
    Design["NAT配置設計"]
    Design -->|コスト最優先<br/>可用性の一部妥協可| Single["シングル共有NAT Gateway<br/>1つのAZに配置<br/>他AZからはAZ間データ転送料が発生"]
    Design -->|可用性最優先<br/>本番ワークロード| PerAZ["AZごとにNAT Gateway<br/>AZ障害の影響を局所化<br/>AZ間転送料は発生しない"]
    Design -->|開発/テスト環境で<br/>コスト最小化| NATInstance["NATインスタンス(EC2)<br/>EC2時間料金+EBS/IPv4/転送料が発生<br/>自己管理・スケーリングが必要"]`,

    'mermaid-src-23': `flowchart TD
    Q["オンプレミス〜AWS間の<br/>接続要件は?"]
    Q -->|一時的・低コストで<br/>すぐに開始したい| VPN["AWS Site-to-Site VPN<br/>インターネット経由の暗号化トンネル<br/>時間課金+データ転送料"]
    Q -->|安定した帯域幅・低レイテンシーが<br/>継続的に必要| DX["AWS Direct Connect<br/>専用線接続<br/>ポート時間課金(帯域幅により変動)"]
    Q -->|DXの導入までの<br/>暫定的な暗号化経路| DXVPN["Direct Connect + VPN<br/>(DX上でVPNを併用)"]

    DX -->|帯域幅選択| Speed["50Mbps〜100Gbpsまで<br/>必要な帯域幅を選択<br/>(過剰な帯域は無駄なコスト)"]`,

    'mermaid-src-24': `flowchart TD
    subgraph Naive["非効率な構成"]
        VPCA1["VPC A"] <--> VPCB1["VPC B"]
        VPCA1 <--> VPCC1["VPC C"]
        VPCB1 <--> VPCC1
        Note1["VPC数が増えるほど<br/>ピアリング数が指数的に増加<br/>(N×(N-1)/2)"]
    end

    subgraph Optimized["Transit Gatewayによる集約"]
        TGW["AWS Transit Gateway"]
        VPCA2["VPC A"] --> TGW
        VPCB2["VPC B"] --> TGW
        VPCC2["VPC C"] --> TGW
        TGW --> OnPrem["オンプレミス<br/>(Direct Connect経由)"]
    end`,

    'mermaid-src-25': `flowchart LR
    subgraph Before["VPCエンドポイントなし"]
        EC2A["EC2<br/>(プライベートサブネット)"] --> NATA["NAT Gateway<br/>(データ処理料金が発生)"]
        NATA --> IGWA["インターネットゲートウェイ"]
        IGWA --> S3A["Amazon S3"]
    end

    subgraph After["Gateway VPCエンドポイント使用"]
        EC2B["EC2<br/>(プライベートサブネット)"] --> EndpointB["S3 Gateway Endpoint<br/>(無料・AWS内部経路)"]
        EndpointB --> S3B["Amazon S3"]
    end`,

    'mermaid-src-26': `flowchart TD
    Traffic["データ転送の種類"]
    Traffic -->|同一AZ内<br/>プライベートIP経由| Free1["無料"]
    Traffic -->|同一リージョン<br/>AZ間| Cost1["有料(比較的安価)<br/>設計でAZ間通信を最小化"]
    Traffic -->|リージョン間| Cost2["有料(より高価)<br/>本当に必要な場合のみ<br/>クロスリージョン通信を設計"]
    Traffic -->|インターネットへの<br/>アウトバウンド| Cost3["最も高価<br/>CloudFront経由で<br/>キャッシュ・削減可能"]
    Traffic -->|AWSサービス間<br/>S3等・エンドポイント経由| Free2["Gatewayエンドポイント経由なら無料"]`,

    'mermaid-src-27': `flowchart LR
    User["世界中のユーザー"] --> Edge["Amazon CloudFront<br/>エッジロケーション<br/>(キャッシュ)"]
    Edge -->|キャッシュヒット| User
    Edge -->|キャッシュミスのみ<br/>オリジンへ| Origin["オリジン<br/>(S3 / ALB / EC2)"]
    User2["リアルタイム性が<br/>重要なアプリ"] --> GA["AWS Global Accelerator<br/>(AWSグローバルネットワーク経由で<br/>最寄りのエンドポイントへルーティング)"]
    GA --> App["アプリケーションエンドポイント"]`,

    'mermaid-src-28': `flowchart TD
    Client["クライアント"] --> APIGW["Amazon API Gateway"]
    APIGW -->|レート制限内| Backend["バックエンド<br/>(Lambda等)"]
    APIGW -->|レート制限超過| Throttle["429 Too Many Requests<br/>リクエストを拒否"]
    Throttle -.バックエンドの過剰な<br/>スケールアウトを防止.-> CostSave["コスト超過の防止"]`,
};
