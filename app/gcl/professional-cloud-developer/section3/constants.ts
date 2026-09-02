export interface NavItem {
    id: string;
    label: string;
    lvl3?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
    {
        id: 'section-3-の全体像',
        label: 'Section 3 の全体像',
    },
    {
        id: '31-cloud-runへのアプリケーションのデプロイ',
        label: '3.1 Cloud Runへのアプリケーションのデプロイ',
    },
    {
        id: '311-ソースコードからのアプリケーションのデプロイ',
        label: '3.1.1 ソースコードからのアプリケーションのデプロイ',
        lvl3: true,
    },
    {
        id: '312-トリガーを使ったcloud-runサービスの呼び出しeventarcpubsub',
        label: '3.1.2 トリガーを使ったCloud Runサービスの呼び出し（Eventarc、Pub/Sub）',
        lvl3: true,
    },
    {
        id: '313-イベントレシーバーの構成eventarcpubsub',
        label: '3.1.3 イベントレシーバーの構成（Eventarc、Pub/Sub）',
        lvl3: true,
    },
    {
        id: '314-アプリケーションにおけるapiのバージョニング公開セキュリティ確保apigee',
        label: '3.1.4 アプリケーションにおけるAPIのバージョニング・公開・セキュリティ確保（Apigee）',
        lvl3: true,
    },
    {
        id: '32-gkeへのコンテナのデプロイ',
        label: '3.2 GKEへのコンテナのデプロイ',
    },
    {
        id: '321-コンテナ化されたアプリケーションのデプロイ',
        label: '3.2.1 コンテナ化されたアプリケーションのデプロイ',
        lvl3: true,
    },
    {
        id: '322-アプリケーションの可用性を高めるkubernetesヘルスチェックの実装',
        label: '3.2.2 アプリケーションの可用性を高めるKubernetesヘルスチェックの実装',
        lvl3: true,
    },
    {
        id: '323-horizontal-pod-autoscaler属性スケーリングメトリクスの組み込み',
        label: '3.2.3 Horizontal Pod Autoscaler属性（スケーリング、メトリクス）の組み込み',
        lvl3: true,
    },
    {
        id: 'section-3-ベストプラクティス-チェックリスト',
        label: 'Section 3 ベストプラクティス チェックリスト',
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
    | 'diag-8';

export const DIAGRAMS: Record<DiagramId, string> = {
    'diag-1': `flowchart TB
    ROOT["Section 3: デプロイのための<br/>クラウドネイティブアプリケーション構成<br/>（試験配点 約24%）"]

    ROOT --> S31["3.1 Cloud Runへの<br/>アプリケーションのデプロイ"]
    ROOT --> S32["3.2 GKEへの<br/>コンテナのデプロイ"]

    S31 --> I311["3.1.1 ソースコードからの<br/>デプロイ"]
    S31 --> I312["3.1.2 トリガーによる呼び出し<br/>（Eventarc / Pub/Sub）"]
    S31 --> I313["3.1.3 イベントレシーバーの構成<br/>（Eventarc / Pub/Sub）"]
    S31 --> I314["3.1.4 APIのバージョニング・<br/>公開・セキュリティ確保（Apigee）"]

    S32 --> I321["3.2.1 コンテナ化された<br/>アプリケーションのデプロイ"]
    S32 --> I322["3.2.2 Kubernetesヘルスチェック<br/>の実装"]
    S32 --> I323["3.2.3 Horizontal Pod<br/>Autoscaler属性の組み込み"]`,

    'diag-2': `flowchart LR
    A["ソースコード<br/>（Dockerfileは任意）"] --> B{"Dockerfileが<br/>存在するか？"}
    B -->|"あり"| C["Dockerfileを使用して<br/>コンテナイメージをビルド"]
    B -->|"なし"| D["Buildpacksが言語を自動検出<br/>（Go / Node.js / Python /<br/>Java / .NET / Ruby など）"]
    C --> E["Cloud Buildが<br/>コンテナイメージを構築"]
    D --> E
    E --> F["Artifact Registryへpush<br/>（既定リポジトリ名:<br/>cloud-run-source-deploy）"]
    F --> G["Cloud Runへ<br/>新しいリビジョンとして<br/>デプロイ"]`,

    'diag-3': `sequenceDiagram
    participant Pub as パブリッシャー<br/>（アプリケーション）
    participant Topic as Pub/Subトピック
    participant EA as Eventarcトリガー
    participant Run as Cloud Runサービス

    Pub->>Topic: メッセージを発行
    Topic->>EA: メッセージを配信
    EA->>EA: CloudEvents形式に変換
    EA->>Run: HTTP POSTリクエストとして送信<br/>（IAM認証付き）
    Run-->>EA: 200 OK（正常受信）
    alt 処理失敗またはタイムアウト
        Run-->>EA: エラー応答
        EA->>Run: リトライ設定が有効な場合、再送
    end`,

    'diag-4': `flowchart TD
    START["Cloud Runサービスで<br/>イベントを受信したい"] --> Q1{"複数のGoogle Cloud<br/>イベントソースに対応<br/>したいか？"}

    Q1 -->|"はい（Cloud Storage,<br/>Firestoreなども含む）"| EA["Eventarcトリガーを使用<br/>（CloudEventsに統一）"]
    Q1 -->|"いいえ（Pub/Subのみで<br/>十分）"| Q2{"1つのHTTP関数で<br/>複数トピックを<br/>購読したいか？"}

    Q2 -->|"はい"| PUSH["Pub/Subプッシュ<br/>サブスクリプションを<br/>直接構成"]
    Q2 -->|"いいえ（単一トピック<br/>で十分）"| EA

    EA --> AUTH1["Eventarcトリガーの<br/>サービスアカウントに<br/>run.invokerロールを付与"]
    PUSH --> AUTH2["プッシュサブスクリプションの<br/>認証設定でOIDCトークンを<br/>使用するよう構成"]

    AUTH1 --> DLQ["デッドレタートピックを<br/>設定し、配信不能<br/>メッセージを退避"]
    AUTH2 --> DLQ`,

    'diag-5': `flowchart TB
    CLIENT["クライアント<br/>アプリケーション"] --> LB["外部Application<br/>Load Balancer"]
    LB --> APIGEE["Apigee<br/>APIプロキシ層"]

    subgraph APIGEE_POLICIES["Apigeeが適用するポリシー"]
        direction TB
        P1["APIバージョニング<br/>（URIパス or ヘッダー）"]
        P2["OAuth 2.0 / APIキー<br/>認証"]
        P3["Quota / Spike Arrest<br/>（レート制限）"]
        P4["脅威保護・<br/>入力値検証"]
    end

    APIGEE --> APIGEE_POLICIES
    APIGEE_POLICIES --> EPATTACH["Apigee<br/>エンドポイントアタッチメント"]
    EPATTACH --> PSCSA["PSC<br/>サービスアタッチメント"]
    PSCSA --> ILB["内部Application<br/>Load Balancer"]
    ILB --> SNEG["サーバーレスNEG"]
    SNEG --> RUN["Cloud Runサービス<br/>（バックエンドAPI）"]

    RUN -->|"roles/run.invokerで<br/>許可されたSAのみ呼び出し可能"| APIGEE`,

    'diag-6': `flowchart TB
    SRC["アプリケーションの<br/>ソースコード + Dockerfile"] --> BUILD["Cloud Buildなどで<br/>コンテナイメージをビルド"]
    BUILD --> AR["Artifact Registryへ<br/>イメージをpush"]
    AR --> MANIFEST["Deploymentマニフェスト<br/>（YAML）を作成<br/>イメージはダイジェスト指定"]
    MANIFEST --> APPLY["kubectl apply -f deployment.yaml<br/>でクラスタへ適用"]

    APPLY --> DEPLOY["Deployment<br/>（望ましい状態を宣言）"]
    DEPLOY --> RS["ReplicaSet<br/>（指定レプリカ数を維持）"]
    RS --> POD1["Pod #1"]
    RS --> POD2["Pod #2"]
    RS --> POD3["Pod #3"]

    SVC["Service<br/>（ClusterIP / NodePort /<br/>LoadBalancer）"] --> POD1
    SVC --> POD2
    SVC --> POD3`,

    'diag-7': `stateDiagram-v2
    [*] --> コンテナ起動
    コンテナ起動 --> Startupチェック中: startupProbeが設定されている場合

    state Startupチェック中 {
        [*] --> 定期的にチェック
        定期的にチェック --> 定期的にチェック: 失敗（failureThreshold未満）
    }

    Startupチェック中 --> 起動失敗によるコンテナ再起動: failureThreshold回連続失敗
    起動失敗によるコンテナ再起動 --> コンテナ起動

    Startupチェック中 --> Liveness_Readiness並行稼働: 成功（1回でOK）
    コンテナ起動 --> Liveness_Readiness並行稼働: startupProbe未設定の場合

    state Liveness_Readiness並行稼働 {
        state "Livenessプローブ" as Live {
            [*] --> 生存チェック中
            生存チェック中 --> 生存チェック中: 成功
        }
        state "Readinessプローブ" as Ready {
            [*] --> 準備状態チェック中
            準備状態チェック中 --> トラフィック受信中: 成功
            トラフィック受信中 --> トラフィック除外中: 失敗
            トラフィック除外中 --> トラフィック受信中: 再度成功
        }
    }

    Liveness_Readiness並行稼働 --> コンテナ再起動: LivenessがfailureThreshold回連続失敗
    コンテナ再起動 --> コンテナ起動`,

    'diag-8': `flowchart TB
    subgraph METRICS["メトリクスソース"]
        M1["Resourceメトリクス<br/>（CPU / メモリ使用率）"]
        M2["Podsメトリクス<br/>（カスタムメトリクス、<br/>Pod単位の平均値）"]
        M3["Objectメトリクス<br/>（Kubernetesオブジェクト<br/>由来のメトリクス）"]
        M4["Externalメトリクス<br/>（Cloud Monitoringなど<br/>クラスタ外部由来）"]
    end

    METRICS --> HPA["HPAコントローラ<br/>（約15秒間隔で評価）"]

    HPA --> DECIDE{"現在のメトリクス値は<br/>目標値と比べてどうか？"}

    DECIDE -->|"目標を上回る"| SCALEUP["scaleUpポリシーを適用<br/>（例: stabilizationWindow<br/>なしで即座に増加）"]
    DECIDE -->|"目標を下回る"| SCALEDOWN["scaleDownポリシーを適用<br/>（例: 5分間の<br/>stabilizationWindowで<br/>安定を確認してから減少）"]
    DECIDE -->|"目標付近で安定"| KEEP["レプリカ数を維持"]

    SCALEUP --> DEPLOY["Deploymentの<br/>レプリカ数を更新"]
    SCALEDOWN --> DEPLOY`,
};
