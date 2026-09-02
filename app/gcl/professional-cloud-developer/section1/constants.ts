export interface NavItem {
    id: string;
    label: string;
    lvl3?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
    {
        id: '11-高性能なアプリケーションと-api-の設計',
        label: '1.1 高性能なアプリケーションと API の設計',
    },
    {
        id: '111-コンピューティングプラットフォームの選定compute-engine--gke--cloud-run',
        label: '1.1.1 コンピューティングプラットフォームの選定（Compute Engine / GKE / Cloud Run）',
        lvl3: true,
    },
    {
        id: '112-アプリケーションコンテナのビルド改修デプロイcloud-run--gke',
        label: '1.1.2 アプリケーションコンテナのビルド・改修・デプロイ（Cloud Run / GKE）',
        lvl3: true,
    },
    {
        id: '113-google-cloud-の地理的分散の理解',
        label: '1.1.3 Google Cloud の地理的分散の理解',
        lvl3: true,
    },
    {
        id: '114-ロードバランサーのユースケース',
        label: '1.1.4 ロードバランサーのユースケース',
        lvl3: true,
    },
    {
        id: '115-セッションアフィニティの有効化',
        label: '1.1.5 セッションアフィニティの有効化',
        lvl3: true,
    },
    {
        id: '116-キャッシュソリューションの実装memorystore',
        label: '1.1.6 キャッシュソリューションの実装（Memorystore）',
        lvl3: true,
    },
    {
        id: '117-api-の作成とデプロイrest--grpc',
        label: '1.1.7 API の作成とデプロイ（REST / gRPC）',
        lvl3: true,
    },
    {
        id: '118-レート制限認証オブザーバビリティapigee--api-gateway',
        label: '1.1.8 レート制限・認証・オブザーバビリティ（Apigee / API Gateway）',
        lvl3: true,
    },
    {
        id: '119-非同期イベント駆動統合eventarc--pubsub',
        label: '1.1.9 非同期・イベント駆動統合（Eventarc / Pub/Sub）',
        lvl3: true,
    },
    {
        id: '1110-ワークロードのリソース要件定義',
        label: '1.1.10 ワークロードのリソース要件定義',
        lvl3: true,
    },
    {
        id: '1111-コストとリソース使用量の最適化',
        label: '1.1.11 コストとリソース使用量の最適化',
        lvl3: true,
    },
    {
        id: '1112-データレプリケーションとゾーンリージョンフェイルオーバー',
        label: '1.1.12 データレプリケーションとゾーン/リージョンフェイルオーバー',
        lvl3: true,
    },
    {
        id: '1113-トラフィック分割戦略段階的ロールアウトロールバックabテスト',
        label: '1.1.13 トラフィック分割戦略（段階的ロールアウト・ロールバック・A/Bテスト）',
        lvl3: true,
    },
    {
        id: '1114-workflowseventarccloud-taskscloud-scheduler-によるオーケストレーション',
        label: '1.1.14 Workflows・Eventarc・Cloud Tasks・Cloud Scheduler によるオーケストレーション',
        lvl3: true,
    },
    {
        id: '12-セキュアなアプリケーションの設計',
        label: '1.2 セキュアなアプリケーションの設計',
    },
    {
        id: '121-データ保持整理ポリシーの実装',
        label: '1.2.1 データ保持・整理ポリシーの実装',
        lvl3: true,
    },
    {
        id: '122-脆弱性を識別保護するセキュリティ機構iapweb-security-scanner',
        label: '1.2.2 脆弱性を識別・保護するセキュリティ機構（IAP・Web Security Scanner）',
        lvl3: true,
    },
    {
        id: '123-脆弱性への対応と解決artifact-analysissecurity-command-center',
        label: '1.2.3 脆弱性への対応と解決（Artifact Analysis・Security Command Center）',
        lvl3: true,
    },
    {
        id: '124-シークレット認証情報暗号鍵の管理',
        label: '1.2.4 シークレット・認証情報・暗号鍵の管理',
        lvl3: true,
    },
    {
        id: '125-google-cloud-サービスへの認証',
        label: '1.2.5 Google Cloud サービスへの認証',
        lvl3: true,
    },
    {
        id: '126-サービスアカウントの-iam-ロールによるリソース保護',
        label: '1.2.6 サービスアカウントの IAM ロールによるリソース保護',
        lvl3: true,
    },
    {
        id: '127-セキュアなサービス間通信',
        label: '1.2.7 セキュアなサービス間通信',
        lvl3: true,
    },
    {
        id: '128-最小権限でのサービス実行',
        label: '1.2.8 最小権限でのサービス実行',
        lvl3: true,
    },
    {
        id: '129-binary-authorization-によるアプリケーションアーティファクトの保護',
        label: '1.2.9 Binary Authorization によるアプリケーションアーティファクトの保護',
        lvl3: true,
    },
    {
        id: '13-データの保存とアクセス',
        label: '1.3 データの保存とアクセス',
    },
    {
        id: '131-適切なストレージシステムの選択',
        label: '1.3.1 適切なストレージシステムの選択',
        lvl3: true,
    },
    {
        id: '132-構造化非構造化データベースのスキーマ設計',
        label: '1.3.2 構造化/非構造化データベースのスキーマ設計',
        lvl3: true,
    },
    {
        id: '133-レプリケーションの整合性モデルの理解',
        label: '1.3.3 レプリケーションの整合性モデルの理解',
        lvl3: true,
    },
    {
        id: '134-署名付き-url-による-cloud-storage-オブジェクトへのアクセス許可',
        label: '1.3.4 署名付き URL による Cloud Storage オブジェクトへのアクセス許可',
        lvl3: true,
    },
    {
        id: '135-分析aiml-ワークロード向け-bigquery-へのデータ書き込み',
        label: '1.3.5 分析・AI/ML ワークロード向け BigQuery へのデータ書き込み',
        lvl3: true,
    },
    {
        id: '試験対策チェックリスト',
        label: '試験対策チェックリスト',
    },
    {
        id: '参考文献',
        label: '参考文献',
    },
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
    | 'diag-17'
    | 'diag-18'
    | 'diag-19';

export const DIAGRAMS: Record<DiagramId, string> = {
    'diag-1': `flowchart TB
    Start(["ワークロードの<br/>コンピューティング選定"]) --> Q1{"コンテナ化<br/>できるか？"}
    Q1 -->|"できない<br/>(レガシー/特殊OS/ライセンス)"| CE["Compute Engine<br/>VM で実行"]
    Q1 -->|"できる"| Q2{"Kubernetes固有機能<br/>(StatefulSet, CRD,<br/>サービスメッシュ等)<br/>が必要か？"}
    Q2 -->|"必要"| Q3{"ノード/クラスタの<br/>運用を自分で<br/>管理したいか？"}
    Q3 -->|"はい"| GKEStd["GKE Standard"]
    Q3 -->|"いいえ<br/>(Podのみ管理)"| GKEAuto["GKE Autopilot"]
    Q2 -->|"不要<br/>(ステートレスHTTP/gRPC/イベント駆動)"| Q4{"WebSocket/gRPC<br/>ストリーミング等が<br/>必要か？"}
    Q4 -->|"はい"| CloudRun["Cloud Run<br/>(サービス/ジョブ/ワーカープール)"]
    Q4 -->|"シンプルなHTTPのみ"| CloudRun

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    classDef successFill fill:#1a4a2a,stroke:#4ad97a,color:#ffffff;
    class Q1,Q2,Q3,Q4 highlightFill
    class CE,GKEStd,GKEAuto,CloudRun successFill`,

    'diag-2': `flowchart LR
    Src["ソースコード<br/>(Git リポジトリ)"] --> Build["Cloud Build<br/>(Buildpacks / Dockerfile)"]
    Build --> AR["Artifact Registry<br/>(コンテナイメージ保存)"]
    AR --> Deploy1["Cloud Run<br/>(gcloud run deploy)"]
    AR --> Deploy2["GKE<br/>(kubectl apply / Skaffold)"]
    Src -.->|"ソースから直接デプロイ"| Deploy1

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class AR highlightFill`,

    'diag-3': `flowchart TB
    subgraph Region["リージョン (例: asia-northeast1)"]
        direction LR
        ZoneA["ゾーン a"]
        ZoneB["ゾーン b"]
        ZoneC["ゾーン c"]
    end
    User["ユーザー"] -->|"最も近いリージョンへ<br/>Anycast IP経由で到達"| Region
    Region -.->|"リージョン内レプリケーション<br/>(低レイテンシ)"| Region

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class ZoneA,ZoneB,ZoneC highlightFill`,

    'diag-4': `flowchart TB
    Internet(["インターネット<br/>ユーザー"]) --> ExtALB["外部 Application<br/>Load Balancer<br/>(グローバル/リージョン)"]
    ExtALB --> WebTier["Web 層<br/>(Cloud Run / GKE)"]
    WebTier --> IntALB["内部 Application<br/>Load Balancer"]
    IntALB --> AppTier["アプリケーション層<br/>(GKE / Compute Engine)"]
    AppTier --> IntNLB["内部パススルー<br/>Network Load Balancer"]
    IntNLB --> DBTier["データベース層"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class ExtALB,IntALB,IntNLB highlightFill`,

    'diag-5': `sequenceDiagram
    participant App as アプリケーション<br/>(Cloud Run/GKE)
    participant Cache as Memorystore<br/>(Redis/Valkey)
    participant DB as プライマリ<br/>データベース

    App->>Cache: 1. キャッシュキーを問い合わせ
    alt キャッシュヒット
        Cache-->>App: 2a. キャッシュ済みデータを返却
    else キャッシュミス
        Cache-->>App: 2b. データなし
        App->>DB: 3. データベースへクエリ
        DB-->>App: 4. 結果を返却
        App->>Cache: 5. 結果をキャッシュに書き込み
    end`,

    'diag-6': `flowchart LR
    Client["クライアント<br/>アプリケーション"] --> Gateway["API Gateway /<br/>Apigee プロキシ"]
    Gateway --> Auth{"認証<br/>(API Key / OAuth2.0)"}
    Auth -->|"NG"| Reject["401/403<br/>拒否"]
    Auth -->|"OK"| Quota{"Quota /<br/>SpikeArrest<br/>チェック"}
    Quota -->|"超過"| RateLimited["429<br/>Too Many Requests"]
    Quota -->|"OK"| Backend["バックエンド<br/>(Cloud Run/GKE)"]
    Gateway -.->|"テレメトリ収集"| Observability["Cloud Monitoring/Logging<br/>(オブザーバビリティ)"]

    classDef dangerFill fill:#5c1a1a,stroke:#d94a4a,color:#ffffff;
    class Reject,RateLimited dangerFill`,

    'diag-7': `flowchart LR
    subgraph Producers["イベントプロデューサー"]
        GCS["Cloud Storage<br/>(オブジェクト変更)"]
        PubSubTopic["Pub/Sub トピック"]
        AuditLog["Cloud Audit Logs"]
    end
    Producers --> Eventarc["Eventarc<br/>(Standard/Advanced)"]
    Eventarc --> Consumer1["Cloud Run"]
    Eventarc --> Consumer2["Cloud Run functions"]
    Eventarc --> Consumer3["GKE<br/>(Knative Serving)"]
    Eventarc --> Consumer4["Workflows"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class Eventarc highlightFill`,

    'diag-8': `flowchart TB
    subgraph Normal["通常時"]
        VM1["Compute Engine VM<br/>(ゾーン a)"] --> RPD["リージョン永続ディスク<br/>(同期レプリケーション)"]
        RPD --> ReplicaA["レプリカ<br/>(ゾーン a)"]
        RPD --> ReplicaB["レプリカ<br/>(ゾーン b)"]
    end
    Normal -.->|"ゾーンa 障害発生"| Failover
    subgraph Failover["フェイルオーバー時"]
        VM2["新しい VM<br/>(ゾーン b)"] -->|"force-attach"| ReplicaB2["レプリカ<br/>(ゾーン b, 健全)"]
    end

    classDef successFill fill:#1a4a2a,stroke:#4ad97a,color:#ffffff;
    classDef dangerFill fill:#5c1a1a,stroke:#d94a4a,color:#ffffff;
    class ReplicaA,ReplicaB,ReplicaB2 successFill`,

    'diag-9': `flowchart LR
    subgraph Stage1["ステージ1: 5%"]
        Old1["旧リビジョン<br/>(95%)"]
        New1["新リビジョン<br/>(5%)"]
    end
    Stage1 -->|"監視: エラー率/レイテンシ<br/>問題なければ次段階へ"| Stage2

    subgraph Stage2["ステージ2: 50%"]
        Old2["旧リビジョン<br/>(50%)"]
        New2["新リビジョン<br/>(50%)"]
    end
    Stage2 -->|"監視OK"| Stage3

    subgraph Stage3["ステージ3: 100%"]
        New3["新リビジョン<br/>(100%)"]
    end

    Stage2 -.->|"問題検出時<br/>即時ロールバック"| Rollback["旧リビジョンに<br/>100%戻す"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    classDef dangerFill fill:#5c1a1a,stroke:#d94a4a,color:#ffffff;
    class New1,New2,New3 highlightFill
    class Rollback dangerFill`,

    'diag-10': `flowchart TB
    Scheduler["Cloud Scheduler<br/>(cron: 毎朝9時等)"] -->|"トリガー"| Workflow["Workflows<br/>(オーケストレーション)"]
    Workflow --> Step1["ステップ1:<br/>Cloud Run サービスA呼び出し"]
    Step1 --> Step2["ステップ2:<br/>BigQuery ジョブ実行"]
    Step2 --> Step3["ステップ3:<br/>結果をCloud Tasksへ<br/>キューイング"]
    Step3 --> Tasks["Cloud Tasks<br/>(タスクキュー)"]
    Tasks -->|"レート制御されたディスパッチ"| Worker["ワーカーサービス<br/>(Cloud Run)"]

    Event["イベント発生<br/>(Cloud Storage更新等)"] --> Eventarc["Eventarc<br/>(コレオグラフィー)"]
    Eventarc --> Consumer["独立したイベント<br/>コンシューマー群"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    classDef warnFill fill:#5c3a1a,stroke:#d9904a,color:#ffffff;
    class Workflow,Step1,Step2,Step3,Tasks,Worker highlightFill
    class Eventarc,Consumer warnFill`,

    'diag-11': `flowchart LR
    Push["イメージを<br/>Artifact Registry へ push"] --> AutoScan["自動脆弱性スキャン<br/>(Artifact Analysis)"]
    AutoScan --> SCC["Security Command Center<br/>(検出結果の集約)"]
    SCC --> Gate{"重大な脆弱性<br/>あり？"}
    Gate -->|"あり"| Block["Artifact Guard により<br/>デプロイをブロック"]
    Gate -->|"なし"| Deploy["Cloud Run / GKE へ<br/>デプロイ許可"]
    SCC -.->|"継続的な監視"| Runtime["実行時スキャン<br/>(ランタイム脆弱性検出)"]

    classDef dangerFill fill:#5c1a1a,stroke:#d94a4a,color:#ffffff;
    class Block dangerFill`,

    'diag-12': `flowchart TB
    subgraph External["Google Cloud 外部<br/>(オンプレ/他クラウド/GitHub Actions等)"]
        Workload["ワークロード"]
    end
    Workload -->|"OIDC/SAMLトークン提示"| WIF["Workload Identity<br/>Federation プール"]
    WIF -->|"検証・トークン交換"| SA["サービスアカウント<br/>(なりすまし) または<br/>直接アクセス"]
    SA --> SM["Secret Manager<br/>(シークレット取得)"]
    SA --> KMS["Cloud KMS<br/>(CMEK による暗号化)"]
    SM -.->|"CMEK保護"| KMS

    subgraph GKECluster["GKE クラスタ"]
        Pod["Pod<br/>(Kubernetes SA)"]
    end
    Pod -->|"Workload Identity<br/>Federation for GKE"| SM

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class WIF,SA,SM,KMS highlightFill`,

    'diag-13': `flowchart TB
    Start(["Google Cloud APIへの<br/>認証方式を選ぶ"]) --> Q1{"アプリケーションが<br/>Google Cloud上で<br/>実行されているか？"}
    Q1 -->|"はい<br/>(Cloud Run/GKE/GCE)"| ADC1["ADC:<br/>アタッチされたサービス<br/>アカウントを自動使用"]
    Q1 -->|"いいえ<br/>(オンプレ/他クラウド)"| Q2{"既存のIdP<br/>(AWS/Azure/GitHub等)<br/>を持っているか？"}
    Q2 -->|"はい"| WIF2["Workload Identity<br/>Federation を使用"]
    Q2 -->|"いいえ"| Q3{"ローカル開発<br/>環境か？"}
    Q3 -->|"はい"| ADCLogin["gcloud auth<br/>application-default login"]
    Q3 -->|"いいえ<br/>(やむを得ない場合)"| Key["サービスアカウントキー<br/>(非推奨・最終手段)"]

    Start2(["データベースへの<br/>接続認証"]) --> DBType{"Cloud SQL /<br/>AlloyDB か？"}
    DBType -->|"はい"| AuthProxy["Auth Proxy<br/>(IAMベース認証・mTLS)"]

    Start3(["エンドユーザー<br/>向け認証"]) --> CIAM["Identity Platform<br/>(顧客ID管理)"]

    classDef successFill fill:#1a4a2a,stroke:#4ad97a,color:#ffffff;
    classDef dangerFill fill:#5c1a1a,stroke:#d94a4a,color:#ffffff;
    class ADC1,WIF2,ADCLogin,AuthProxy,CIAM successFill
    class Key dangerFill`,

    'diag-14': `flowchart TB
    Start(["サービス間通信の<br/>セキュリティ層を選ぶ"]) --> Q1{"通信範囲は？"}
    Q1 -->|"GKE Pod間<br/>(クラスタ内)"| NP["Kubernetes<br/>Network Policies<br/>(L4, 名前空間スコープ)"]
    Q1 -->|"VPC内 VM/サービス間"| FW["VPC ファイアウォール<br/>ルール (L4)"]
    Q1 -->|"サービスメッシュ内<br/>(mTLS/認可ポリシー要)"| CSM["Cloud Service Mesh<br/>(L7, mTLS)"]
    Q1 -->|"Cloud Run/Functions<br/>→ VPC内リソース"| DVE["Direct VPC egress"]
    Q1 -->|"Googleマネージド<br/>サービスへの<br/>プライベート接続"| PSC["Private Service<br/>Connect"]
    Q1 -->|"メッシュ外への<br/>アウトバウンド制御"| EGW["Cloud Service Mesh<br/>Egress Gateway"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class NP,FW,CSM,DVE,PSC,EGW highlightFill`,

    'diag-15': `flowchart TB
    Code["ソースコードが<br/>ソースリポジトリへpush"] --> CI["Cloud Build<br/>(CIパイプライン)<br/>ビルド・テスト"]
    CI --> Sign["署名者(Signer)が<br/>イメージ記述子に署名<br/>= アテステーション作成"]
    Sign --> AR2["Artifact Registry<br/>へイメージ格納"]
    AR2 --> Deploy["デプロイリクエスト<br/>(GKE/Cloud Run)"]
    Deploy --> BinAuthz["Binary Authorization<br/>ポリシー評価"]
    BinAuthz --> Verify{"アテスターが<br/>公開鍵で<br/>アテステーション<br/>を検証"}
    Verify -->|"検証成功"| Allow["デプロイ許可"]
    Verify -->|"検証失敗/<br/>アテステーションなし"| DenyDeploy["デプロイ拒否"]

    classDef successFill fill:#1a4a2a,stroke:#4ad97a,color:#ffffff;
    classDef dangerFill fill:#5c1a1a,stroke:#d94a4a,color:#ffffff;
    class Allow successFill
    class DenyDeploy dangerFill`,

    'diag-16': `flowchart TB
    Start(["データストレージの選定"]) --> Q1{"バイナリラージ<br/>オブジェクト<br/>(画像/動画/バックアップ等)か？"}
    Q1 -->|"はい"| GCS["Cloud Storage"]
    Q1 -->|"いいえ"| Q2{"分析/ウェアハウス<br/>用途か？"}
    Q2 -->|"はい"| BQ["BigQuery"]
    Q2 -->|"いいえ"| Q3{"キャッシュ/<br/>セッションストア<br/>(サブミリ秒)か？"}
    Q3 -->|"はい"| MS["Memorystore"]
    Q3 -->|"いいえ"| Q4{"固定スキーマ・<br/>トランザクション<br/>整合性が必要か？"}
    Q4 -->|"はい"| Q5{"グローバル分散/<br/>無制限スケールが<br/>必要か？"}
    Q5 -->|"はい"| Spanner["Spanner"]
    Q5 -->|"いいえ<br/>(リージョン内で十分)"| Q6{"高度な<br/>トランザクション<br/>性能が必要か？"}
    Q6 -->|"はい"| AlloyDB["AlloyDB"]
    Q6 -->|"標準的なOLTP"| CloudSQL["Cloud SQL"]
    Q4 -->|"いいえ<br/>(柔軟なスキーマ)"| Q7{"超高スループット/<br/>時系列/IoTデータか？"}
    Q7 -->|"はい"| Bigtable["Bigtable"]
    Q7 -->|"いいえ<br/>(ドキュメント指向/モバイル同期)"| Firestore["Firestore"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class GCS,BQ,MS,Spanner,AlloyDB,CloudSQL,Bigtable,Firestore highlightFill`,

    'diag-17': `flowchart LR
    subgraph Strong["強整合性志向"]
        Spanner2["Spanner<br/>(行・リージョン・大陸間で強整合性)"]
        GCSWrite["Cloud Storage<br/>書き込み操作<br/>(強い全体整合性)"]
    end
    subgraph Mixed["ハイブリッド"]
        AlloyDB2["AlloyDB<br/>(プライマリ:強整合性<br/>読み取りプール:低遅延の結果整合性)"]
        CloudSQL2["Cloud SQL<br/>(プライマリ:強整合性<br/>読み取りレプリカ:結果整合性)"]
    end
    subgraph RowLevel["行/ドキュメント単位で強整合性"]
        Bigtable2["Bigtable<br/>(単一行内でアトミック)"]
        Firestore2["Firestore<br/>(ドキュメント単位)"]
    end

    classDef successFill fill:#1a4a2a,stroke:#4ad97a,color:#ffffff;
    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class Spanner2,GCSWrite successFill
    class AlloyDB2,CloudSQL2,Bigtable2,Firestore2 highlightFill`,

    'diag-18': `sequenceDiagram
    participant User as エンドユーザー<br/>(アカウントなし)
    participant App as バックエンド<br/>アプリケーション
    participant IAM as IAM<br/>(signBlob)
    participant GCS as Cloud Storage

    User->>App: 1. アップロード/ダウンロード<br/>リクエスト
    App->>App: 2. アプリケーション固有の<br/>認可ロジックで検証
    App->>IAM: 3. 署名リクエスト<br/>(V4署名プロセス)
    IAM-->>App: 4. 署名付きURLを生成<br/>(有効期限付き)
    App-->>User: 5. 署名付きURLを返却
    User->>GCS: 6. 署名付きURLで<br/>直接アクセス (GET/PUT)
    GCS-->>User: 7. オブジェクトの<br/>読み書き結果`,

    'diag-19': `flowchart TB
    subgraph Sources["データソース"]
        App2["アプリケーション<br/>(リアルタイムイベント)"]
        Pipeline["Dataflow パイプライン<br/>(Pub/Sub等から変換)"]
        Batch["バッチ処理<br/>(定期集計等)"]
    end

    App2 -->|"低レイテンシ<br/>ストリーミング"| DefaultStream["デフォルトストリーム<br/>(at-least-once, committed)"]
    Pipeline -->|"BigQueryIO<br/>コネクタ"| DefaultStream
    Batch -->|"アトミックな<br/>一括コミット"| PendingStream["保留型ストリーム<br/>(pending type)"]

    DefaultStream --> BQTable["BigQuery テーブル<br/>(即座にクエリ可能)"]
    PendingStream -->|"ストリームをコミット"| BQTable
    BQTable --> Analytics["分析クエリ /<br/>AI・MLモデル学習"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class DefaultStream,PendingStream highlightFill`,
};
