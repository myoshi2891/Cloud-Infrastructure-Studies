/**
 * Google Cloud Professional Cloud Developer（PCD）認定試験 学習ガイド
 * Mermaid ダイアグラム DSL・ナビゲーション項目・定数定義
 */

export type DiagramId =
    | 'diag-exam-scope'
    | 'diag-compute-choice'
    | 'diag-async-event'
    | 'diag-traffic-split'
    | 'diag-secret-wif'
    | 'diag-secure-comm'
    | 'diag-binary-auth'
    | 'diag-storage-choice'
    | 'diag-build-pipeline'
    | 'diag-cloud-run-trigger'
    | 'diag-k8s-probes'
    | 'diag-api-retry'
    | 'diag-observability';

export const DIAGRAMS: Record<DiagramId, string> = {
    'diag-exam-scope': `flowchart TD
    A[Professional Cloud Developer 試験] --> B["セクション1<br/>高可用性・セキュア・信頼性の高い<br/>クラウドネイティブアプリケーションの設計（約33%）"]
    A --> C["セクション2<br/>アプリケーションのビルドとテスト（約26%）"]
    A --> D["セクション3<br/>デプロイのための<br/>クラウドネイティブアプリケーション構成（約19%）"]
    A --> E["セクション4<br/>Google Cloudサービスとの<br/>アプリケーション統合（約22%）"]`,

    'diag-compute-choice': `flowchart TD
    Start["ワークロードの<br/>要件を確認"] --> Q1{"OSカーネル・ライセンス・<br/>特定ハードウェアへの<br/>直接アクセスが必要？"}
    Q1 -- はい --> CE["Compute Engine<br/>（VM、フルコントロール）"]
    Q1 -- いいえ --> Q2{"Kubernetes固有機能<br/>（StatefulSet・DaemonSet・<br/>CRD・サービスメッシュ）<br/>が必要？"}
    Q2 -- はい --> GKE["Google Kubernetes Engine<br/>（コンテナオーケストレーション）"]
    Q2 -- いいえ --> Q3{"HTTP/S・WebSocket・gRPCの<br/>ステートレスなコンテナ<br/>ワークロードか？"}
    Q3 -- はい --> CR["Cloud Run<br/>（フルマネージドサーバーレス）"]
    Q3 -- いいえ --> GKE

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class CE,GKE,CR highlightFill`,

    'diag-async-event': `flowchart LR
    Pub["Publisher<br/>（アプリ／Cloud Storage等）"] --> Topic["Pub/Sub トピック"]
    Topic --> Eventarc["Eventarc<br/>（130以上のイベントソースを正規化）"]
    Eventarc --> Run["Cloud Run<br/>サービス／ジョブ"]
    Eventarc --> Func["Cloud Run functions"]
    Eventarc --> WF["Workflows"]

    Sched["Cloud Scheduler<br/>（cron）"] --> WF
    WF --> Tasks["Cloud Tasks<br/>（非同期タスクキュー）"]
    Tasks --> Run`,

    'diag-traffic-split': `flowchart LR
    subgraph Before["デプロイ前"]
        R1a["リビジョンA（安定版）<br/>トラフィック 100%"]
    end
    subgraph Canary["カナリア段階"]
        R1b["リビジョンA<br/>90%"]
        R2b["リビジョンB（新版）<br/>10%"]
    end
    subgraph Full["段階的拡大後"]
        R2c["リビジョンB<br/>100%"]
    end
    Before --> Canary --> Full`,

    'diag-secret-wif': `flowchart TD
    subgraph OnPrem["外部環境（他クラウド・オンプレミス）"]
        IdP["既存のIDプロバイダ<br/>（AWS/Azure/OIDC等）"]
    end
    IdP -- "外部トークンを発行" --> STS["Security Token Service<br/>（トークン交換）"]
    STS -- "Google短命トークンに交換" --> SA["サービスアカウントの<br/>権限を借用（Impersonate）"]
    SA --> GCPRes["Google Cloud リソース<br/>（Secret Manager等）"]`,

    'diag-secure-comm': `flowchart TD
    App["アプリケーション<br/>（Cloud Run / GKE）"] --> Q{"通信先は？"}
    Q -- "同一VPC内のプライベートリソース" --> DVE["Direct VPC egress<br/>（Cloud RunのIPをVPCサブネットに直接割当）"]
    Q -- "別VPC/別組織のマネージドサービス" --> PSC["Private Service Connect<br/>（内部IPでプロデューサーに接続）"]
    Q -- "GKE内のPod間通信を制御" --> NP["Kubernetes Network Policies"]
    Q -- "サービスメッシュ全体の<br/>mTLS・トラフィック管理" --> CSM["Cloud Service Mesh<br/>（Envoy/Istioベース）"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class DVE,PSC,NP,CSM highlightFill`,

    'diag-binary-auth': `flowchart LR
    Src["ソースコード"] --> Build["Cloud Build"]
    Build -- "ビルド来歴を生成" --> Prov["SLSA Provenance"]
    Build --> Sign["署名者が検証・アテステーション作成"]
    Sign --> AR["Artifact Registry<br/>（イメージ + アテステーション）"]
    AR --> Deploy{"デプロイ時に<br/>Binary Authorization<br/>が検証"}
    Deploy -- "アテステーションが<br/>ポリシーを満たす" --> OK["GKE / Cloud Run に<br/>デプロイ許可"]
    Deploy -- "満たさない" --> Deny["デプロイ拒否"]

    classDef successFill fill:#1a4a2a,stroke:#4ad97a,color:#ffffff;
    classDef dangerFill fill:#5c1a1a,stroke:#d94a4a,color:#ffffff;
    class OK successFill
    class Deny dangerFill`,

    'diag-storage-choice': `flowchart TD
    Start2["データの性質は？"] --> Q1{"リレーショナル<br/>（スキーマ・JOIN・トランザクション）？"}
    Q1 -- はい --> Q2{"グローバル分散・<br/>無制限の水平スケールが必要？"}
    Q2 -- はい --> Spanner["Spanner"]
    Q2 -- いいえ --> Q3{"高負荷なOLTP+分析を<br/>同一DBで行いたい？"}
    Q3 -- はい --> AlloyDB["AlloyDB for PostgreSQL"]
    Q3 -- いいえ --> CloudSQL["Cloud SQL<br/>（MySQL/PostgreSQL/SQL Server）"]

    Q1 -- いいえ --> Q4{"ドキュメント指向・<br/>リアルタイム同期が必要？"}
    Q4 -- はい --> Firestore["Firestore"]
    Q4 -- いいえ --> Q5{"膨大な書き込み・低レイテンシの<br/>ワイドカラム/時系列データ？"}
    Q5 -- はい --> Bigtable["Bigtable"]
    Q5 -- いいえ --> Q6{"大規模分析・レポーティング用？"}
    Q6 -- はい --> BQ["BigQuery"]
    Q6 -- いいえ --> Memstore["Memorystore<br/>（キャッシュ・セッション）"]`,

    'diag-build-pipeline': `flowchart LR
    Repo["ソースリポジトリ<br/>（GitHub/Cloud Source Repositories）"] -- "トリガー" --> CB["Cloud Build"]
    CB -- "コンテナイメージをビルド" --> Img["コンテナイメージ"]
    CB -- "SLSA Provenanceを生成" --> Prov2["ビルド来歴（Provenance）"]
    Img --> AR2["Artifact Registry"]
    Prov2 --> AR2
    AR2 -- "Binary Authorization用の<br/>アテステーション対象" --> BA["Binary Authorization"]`,

    'diag-cloud-run-trigger': `sequenceDiagram
    participant GCS as Cloud Storage
    participant PS as Pub/Sub
    participant EA as Eventarc
    participant CR as Cloud Run サービス

    GCS->>PS: オブジェクト作成イベントを発行
    PS->>EA: メッセージをEventarcトリガーへ配信
    EA->>CR: CloudEvents形式のHTTPリクエストを送信
    CR-->>EA: 2xxで受信確認
    Note over CR: 受信IDでイベントを冪等に処理`,

    'diag-k8s-probes': `flowchart TD
    Start3["Pod起動"] --> SP{"Startup Probe"}
    SP -- "失敗が続く" --> Restart1["コンテナを再起動"]
    SP -- "成功" --> Running["liveness/readinessの監視を開始"]
    Running --> LP{"Liveness Probe"}
    Running --> RP{"Readiness Probe"}
    LP -- "失敗" --> Restart2["コンテナを再起動<br/>（デッドロック等から回復）"]
    LP -- "成功" --> Running
    RP -- "失敗" --> Remove["Serviceのエンドポイントから除外<br/>（トラフィックを送らない）"]
    RP -- "成功" --> Serve["トラフィックを受信"]

    classDef dangerFill fill:#5c1a1a,stroke:#d94a4a,color:#ffffff;
    classDef warnFill fill:#5c3a1a,stroke:#d9904a,color:#ffffff;
    classDef successFill fill:#1a4a2a,stroke:#4ad97a,color:#ffffff;
    class Restart1,Restart2 dangerFill
    class Remove warnFill
    class Serve successFill`,

    'diag-api-retry': `flowchart TD
    Call["APIを呼び出す"] --> Result{"レスポンス"}
    Result -- "成功" --> Done["完了"]
    Result -- "429 / 5xx" --> Backoff["指数バックオフ＋ジッターで待機"]
    Backoff --> Retry{"最大リトライ回数<br/>に達したか"}
    Retry -- "いいえ" --> Call
    Retry -- "はい" --> Fail["エラーとして記録・報告"]
    Result -- "4xx（429以外）" --> Fail

    classDef successFill fill:#1a4a2a,stroke:#4ad97a,color:#ffffff;
    classDef dangerFill fill:#5c1a1a,stroke:#d94a4a,color:#ffffff;
    classDef warnFill fill:#5c3a1a,stroke:#d9904a,color:#ffffff;
    class Done successFill
    class Fail dangerFill
    class Backoff warnFill`,

    'diag-observability': `flowchart TD
    App2["アプリケーション"] -- "構造化ログを出力" --> Log["Cloud Logging"]
    App2 -- "メトリクスを送出" --> Mon["Cloud Monitoring"]
    App2 -- "スパンを計装" --> Trace["Cloud Trace"]
    Log --> ER["Error Reporting<br/>（ログからエラーを自動グルーピング）"]
    Log -.-> Trace
    Mon --> Alert["アラートポリシー"]
    Trace -- "トレースIDでスパンを相関" --> MultiSvc["複数サービスをまたぐ<br/>リクエストの追跡"]`,
};

export interface NavItem {
    id: string;
    label: string;
    lvl3?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
    { id: '0-試験の概要', label: '0. 試験の概要' },
    { id: '出題範囲4セクション', label: '出題範囲（4セクション）', lvl3: true },
    {
        id: 'section1',
        label: '1. セクション1: 高可用性、セキュア、信頼性の高いクラウドネイティブアプリケーションの設計（約33%）',
    },
    { id: '11-高性能アプリケーションとapiの設計', label: '1.1 高性能アプリケーションとAPIの設計', lvl3: true },
    { id: '12-セキュアなアプリケーションの設計', label: '1.2 セキュアなアプリケーションの設計', lvl3: true },
    { id: '13-データの保存とアクセス', label: '1.3 データの保存とアクセス', lvl3: true },
    {
        id: 'section2',
        label: '2. セクション2: アプリケーションのビルドとテスト（約26%）',
    },
    { id: '21-開発環境のセットアップ', label: '2.1 開発環境のセットアップ', lvl3: true },
    { id: '22-ビルド', label: '2.2 ビルド', lvl3: true },
    { id: '23-テスト', label: '2.3 テスト', lvl3: true },
    {
        id: 'section3',
        label: '3. セクション3: デプロイのためのクラウドネイティブアプリケーション構成（約19%）',
    },
    { id: '31-cloud-runへのアプリケーションデプロイ', label: '3.1 Cloud Runへのアプリケーションデプロイ', lvl3: true },
    { id: '32-gkeへのコンテナデプロイ', label: '3.2 GKEへのコンテナデプロイ', lvl3: true },
    {
        id: 'section4',
        label: '4. セクション4: Google Cloudサービスとのアプリケーション統合（約22%）',
    },
    { id: '41-データストレージサービスとの統合', label: '4.1 データ・ストレージサービスとの統合', lvl3: true },
    { id: '42-google-cloud-apiの利用', label: '4.2 Google Cloud APIの利用', lvl3: true },
    { id: '43-トラブルシューティングとオブザーバビリティ', label: '4.3 トラブルシューティングとオブザーバビリティ', lvl3: true },
    { id: 'checklist', label: '5. 学習チェックリスト' },
    { id: 'references', label: '6. 参考文献' },
    { id: '公式試験情報', label: '公式試験情報', lvl3: true },
    { id: 'コンピューティングプラットフォーム', label: 'コンピューティングプラットフォーム', lvl3: true },
    { id: 'api設計api管理', label: 'API設計・API管理', lvl3: true },
    { id: 'イベント駆動オーケストレーション', label: 'イベント駆動・オーケストレーション', lvl3: true },
    { id: 'セキュリティ', label: 'セキュリティ', lvl3: true },
    { id: 'ネットワーキング', label: 'ネットワーキング', lvl3: true },
    { id: 'データベースストレージ', label: 'データベース・ストレージ', lvl3: true },
    { id: '開発環境ビルドテスト', label: '開発環境・ビルド・テスト', lvl3: true },
    { id: 'デプロイgke', label: 'デプロイ・GKE', lvl3: true },
    { id: 'api呼び出しオブザーバビリティ', label: 'API呼び出し・オブザーバビリティ', lvl3: true },
];
