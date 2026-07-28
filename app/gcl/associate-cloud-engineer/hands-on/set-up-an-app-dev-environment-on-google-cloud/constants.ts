/**
 * Google Cloud アプリ開発環境構築 完全ガイドの Mermaid 図定義集
 */
export const DIAGRAMS: Record<string, string> = {
    'diag-arch-path': `flowchart TD
    A[Cloud Storage<br />データの置き場所] --> E[IAM<br />誰が何にアクセスできるか]
    E --> B[Cloud Monitoring<br />システムの状態を見る]
    B --> C[Cloud Run functions<br />イベントに反応する処理]
    C --> D[Pub/Sub<br />非同期メッセージ連携]
    D --> F[Challenge Lab<br />GSP315: Memories]
    A -.オブジェクト追加イベント.-> C
    C -.メッセージ発行.-> D
    E -.アクセス制御を全レイヤーに適用.-> A
    E -.アクセス制御を全レイヤーに適用.-> C
    E -.アクセス制御を全レイヤーに適用.-> D
    style A fill:#4285F4,color:#fff,stroke:#4285F4
    style E fill:#f87171,color:#1a0505,stroke:#f87171
    style B fill:#fbbf24,color:#1a1204,stroke:#fbbf24
    style C fill:#00ffa3,color:#04180f,stroke:#00ffa3
    style D fill:#a78bfa,color:#12081f,stroke:#a78bfa
    style F fill:#22d3ee,color:#04141a,stroke:#22d3ee`,

    'diag-storage-console': `flowchart LR
    A[Navigation Menu] --> B["Cloud Storage > Buckets"]
    B --> C["+ Create"]
    C --> D[バケット名を入力]
    D --> E["Location Type: Region を選択"]
    E --> F["Storage Class: Standard"]
    F --> G["Access Control: Uniform"]
    G --> H["Enforce public access prevention を解除"]
    H --> I[Create]
    style A fill:#0f172a,color:#e6edf3,stroke:#4285F4
    style I fill:#00ffa3,color:#04180f,stroke:#00ffa3`,

    'diag-storage-public': `flowchart TD
    A[バケット作成] --> B{公開する必要があるか?}
    B -->|Yes| C["Uniform access + IAM で allUsers に<br />Storage Object Viewer のみ付与"]
    B -->|No| D[Enforce public access prevention を有効化]
    C --> E[公開範囲を最小オブジェクト単位に限定]
    D --> F[プロジェクト内の権限のあるユーザーのみアクセス]
    style B fill:#0f172a,color:#e6edf3,stroke:#fbbf24
    style C fill:#00ffa3,color:#04180f,stroke:#00ffa3
    style D fill:#22d3ee,color:#04141a,stroke:#22d3ee`,

    'diag-iam-basic': `graph TD
    Owner["Owner<br />(課金設定・権限管理も可能)"] --> Editor["Editor<br />(リソースの変更が可能)"]
    Editor --> Viewer["Viewer<br />(読み取り専用)"]
    style Owner fill:#f87171,color:#1a0505,stroke:#f87171
    style Editor fill:#fbbf24,color:#1a1204,stroke:#fbbf24
    style Viewer fill:#00ffa3,color:#04180f,stroke:#00ffa3`,

    'diag-iam-sequence': `sequenceDiagram
    participant Admin as 管理者(Owner)
    participant IAMPolicy as IAMポリシーストア
    participant User as 対象ユーザー
    participant Resource as Cloud Storage
    Admin->>IAMPolicy: ロールを付与/剥奪
    IAMPolicy-->>IAMPolicy: グローバルに伝播(最大80秒程度)
    User->>Resource: リソースへアクセス試行
    Resource-->>User: 伝播完了後に反映された権限で応答`,

    'diag-iam-flow': `flowchart TD
    A[必要なタスクを洗い出す] --> B[基本ロールを候補から除外]
    B --> C[サービスエージェント専用ロールを除外]
    C --> D[タスクに対応する事前定義ロールを検索]
    D --> E{要件を満たす<br />事前定義ロールがあるか?}
    E -->|Yes| F[そのロールを付与]
    E -->|No| G[カスタムロールを作成]
    style E fill:#0f172a,color:#e6edf3,stroke:#fbbf24
    style F fill:#00ffa3,color:#04180f,stroke:#00ffa3
    style G fill:#a78bfa,color:#12081f,stroke:#a78bfa`,

    'diag-monitoring-agent': `flowchart LR
    VM[Compute Engine VM] -->|システムメトリクス<br />ハイパーバイザー経由・エージェント不要| CM[Cloud Monitoring]
    VM -->|Ops Agent導入| OA[Ops Agent]
    OA -->|詳細メトリクス| CM
    OA -->|アプリケーションログ| CL[Cloud Logging]
    CM --> DB[ダッシュボード]
    CM --> AL[アラートポリシー]
    CM --> UC[アップタイムチェック]
    AL -->|通知| EM["メール / Slack / PagerDuty"]
    style VM fill:#0f172a,color:#e6edf3,stroke:#4285F4
    style CM fill:#fbbf24,color:#1a1204,stroke:#fbbf24
    style CL fill:#22d3ee,color:#04141a,stroke:#22d3ee`,

    'diag-monitoring-alert': `flowchart TD
    A[Uptime Check作成] --> B[Protocol: HTTP選択]
    B --> C[対象VMの外部IPを指定]
    C --> D[Check Frequency設定]
    D --> E[Response Validationのデフォルト確認]
    E --> F[通知チャンネル設定]
    F --> G[Alerting Policy作成]
    G --> H[しきい値/Retest windowを設定]
    H --> I[運用開始・ダッシュボードで可視化]
    style I fill:#00ffa3,color:#04180f,stroke:#00ffa3`,

    'diag-functions-triggers': `flowchart TD
    Trigger{トリガー種別} -->|HTTPトリガー| HTTP["HTTP(S)リクエスト<br />run.app URL に直接アクセス"]
    Trigger -->|イベント駆動トリガー| Eventarc[Eventarc経由]
    Eventarc --> GCS["Cloud Storageイベント<br />object.finalized 等"]
    Eventarc --> PubSub[Pub/Subメッセージ受信]
    Eventarc --> Firestore[Firestoreドキュメント変更]
    HTTP --> Func[Cloud Run function 実行]
    GCS --> Func
    PubSub --> Func
    Firestore --> Func
    style Eventarc fill:#a78bfa,color:#12081f,stroke:#a78bfa
    style Func fill:#00ffa3,color:#04180f,stroke:#00ffa3`,

    'diag-functions-deploy': `flowchart LR
    A["Cloud Run > Services"] --> B["WRITE A FUNCTION"]
    B --> C[サービス名・リージョン設定]
    C --> D["認証: Allow public access または要認証を選択"]
    D --> E["Execution Environment: 第2世代 を選択"]
    E --> F[Revision Scaling設定]
    F --> G[ソースコード編集]
    G --> H["SAVE and REDEPLOY"]
    H --> I["TESTでイベントを模擬送信"]
    I --> J["Observability > Logs で確認"]
    style H fill:#00ffa3,color:#04180f,stroke:#00ffa3`,

    'diag-functions-sa': `flowchart LR
    GCS["Cloud Storage<br />サービスエージェント"] -->|roles/pubsub.publisher| PS[内部Pub/Subトピック]
    PS --> EA[Eventarc]
    EA -->|roles/run.invoker| CRF[Cloud Run function]
    EA -->|roles/eventarc.eventReceiver| SA[実行用サービスアカウント]
    style EA fill:#a78bfa,color:#12081f,stroke:#a78bfa`,

    'diag-pubsub-basic': `flowchart LR
    Pub1[Publisher A] -->|メッセージ発行| Topic["Topic<br />共有された名前付きチャンネル"]
    Pub2[Publisher B] -->|メッセージ発行| Topic
    Topic --> Sub1[Subscription 1]
    Topic --> Sub2[Subscription 2]
    Sub1 --> Con1[Subscriberアプリ1]
    Sub2 --> Con2[Subscriberアプリ2]
    style Topic fill:#a78bfa,color:#12081f,stroke:#a78bfa`,

    'diag-pubsub-timing': `flowchart TD
    A[トピック作成] --> B{サブスクリプションは接続済みか?}
    B -->|No| C["メッセージ発行しても<br />後から作成したSubscriptionには届かない"]
    B -->|Yes| D["発行したメッセージが<br />正しく保持・配信される"]
    C --> E[先にサブスクリプションを作成]
    E --> D
    style C fill:#f87171,color:#1a0505,stroke:#f87171
    style D fill:#00ffa3,color:#04180f,stroke:#00ffa3`,

    'diag-challenge-arch': `flowchart TD
    User[ユーザー] -->|画像アップロード| Bucket["Cloud Storage<br />Bucket Name"]
    Bucket -->|object.finalizedイベント| Eventarc["Eventarc<br />Cloud Storageトリガー"]
    Eventarc --> Func["Cloud Run function<br />Node.js 22 / 第2世代"]
    Func -->|sharpでリサイズ| Thumb[64x64サムネイルを生成]
    Thumb -->|同一バケットに保存| Bucket
    Func -->|完了通知| Topic["Pub/Sub Topic<br />Topic Name"]
    IAM[IAM] -.アクセス制御.-> Bucket
    IAM -.アクセス制御.-> Func
    IAM -.アクセス制御.-> Topic
    style Bucket fill:#4285F4,color:#fff,stroke:#4285F4
    style Func fill:#00ffa3,color:#04180f,stroke:#00ffa3
    style Topic fill:#a78bfa,color:#12081f,stroke:#a78bfa
    style IAM fill:#f87171,color:#1a0505,stroke:#f87171`,
};
