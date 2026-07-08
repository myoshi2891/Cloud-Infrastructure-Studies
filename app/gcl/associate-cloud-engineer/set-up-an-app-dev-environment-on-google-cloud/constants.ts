export const DIAGRAMS = {
    'diag-learning-path': `flowchart LR
    A["① Cloud Storage<br/>バケット作成・オブジェクト操作"] --> B["② Cloud IAM<br/>権限の確認・付与・削除"]
    B --> C["③ Cloud Functions<br/>イベント駆動関数のデプロイ"]
    C --> D["④ Pub/Sub<br/>トピック・サブスクリプション"]
    D --> E["⑤ Challenge Lab<br/>GSP315: 統合演習"]
    style A fill:#4285F4,color:#fff,stroke:#4285F4
    style B fill:#EA4335,color:#fff,stroke:#EA4335
    style C fill:#34A853,color:#fff,stroke:#34A853
    style D fill:#FBBC05,color:#000,stroke:#FBBC05
    style E fill:#673AB7,color:#fff,stroke:#673AB7`,

    'diag-storage-flow': `sequenceDiagram
    participant U as 利用者
    participant C as Cloud Console
    participant S as Cloud Storage
    U->>C: バケット名を入力（グローバルで一意）
    U->>C: リージョンを選択
    C->>S: バケットを作成
    U->>S: オブジェクト（画像など）をアップロード
    S-->>U: オブジェクトURLを返却`,

    'diag-iam-relation': `flowchart LR
    P["Principal<br/>ユーザー / SA / グループ"] -->|付与される| R["Role<br/>ロール"]
    R -->|含む| Perm["Permission<br/>storage.objects.get など"]
    R -->|適用先| Res["Resource<br/>プロジェクト / バケット / 関数"]
    style P fill:#4285F4,color:#fff,stroke:#4285F4
    style R fill:#FBBC05,color:#000,stroke:#FBBC05
    style Perm fill:#34A853,color:#fff,stroke:#34A853
    style Res fill:#EA4335,color:#fff,stroke:#EA4335`,

    'diag-iam-revoke': `sequenceDiagram
    participant Owner as あなた(Owner)
    participant IAM as IAM ポリシー
    participant Prev as 前任エンジニア(Viewer)
    Owner->>IAM: 現在のプリンシパル一覧を確認
    IAM-->>Owner: Owner:あなた / Viewer:前任エンジニア
    Owner->>IAM: 前任エンジニアの roles/viewer を削除
    IAM-->>Prev: アクセス権が失効`,

    'diag-func-pipeline': `flowchart LR
    S["Cloud Storage<br/>ファイルアップロード"] -->|finalized イベント| EA["Eventarc<br/>トリガー"]
    EA --> CF["Cloud Run function<br/>(Gen2)"]
    CF -->|加工結果を保存| S
    CF -->|完了通知を発行| PS["Pub/Sub トピック"]
    style S fill:#4285F4,color:#fff,stroke:#4285F4
    style EA fill:#FBBC05,color:#000,stroke:#FBBC05
    style CF fill:#34A853,color:#fff,stroke:#34A853
    style PS fill:#EA4335,color:#fff,stroke:#EA4335`,

    'diag-pubsub-fanout': `flowchart LR
    Pub["Publisher<br/>Cloud Function など"] -->|publish| T["Topic"]
    T -->|配信| Sub1["Subscription A"]
    T -->|配信| Sub2["Subscription B"]
    Sub1 --> C1["Subscriber 1"]
    Sub2 --> C2["Subscriber 2"]
    style Pub fill:#4285F4,color:#fff,stroke:#4285F4
    style T fill:#FBBC05,color:#000,stroke:#FBBC05
    style Sub1 fill:#34A853,color:#fff,stroke:#34A853
    style Sub2 fill:#34A853,color:#fff,stroke:#34A853`,

    'diag-gsp315-arch': `flowchart TD
    subgraph T1["Task 1: Storage"]
        B["Cloud Storage バケット"]
    end
    subgraph T2["Task 2: Messaging"]
        T["Pub/Sub トピック"]
    end
    subgraph T3["Task 3: Compute"]
        F["Cloud Run function<br/>Gen2 / memories-thumbnail"]
    end
    subgraph T4["Task 4-5: IAM"]
        I["IAMポリシーの検証と是正"]
    end
    U["利用者"] -->|map.jpg をアップロード| B
    B -->|finalized イベント| F
    F -->|64x64サムネイルを書き込み| B
    F -->|完了メッセージ| T
    I -.->|前任エンジニアのアクセスを削除| B
    style B fill:#4285F4,color:#fff,stroke:#4285F4
    style T fill:#EA4335,color:#fff,stroke:#EA4335
    style F fill:#34A853,color:#fff,stroke:#34A853
    style I fill:#FBBC05,color:#000,stroke:#FBBC05`,
} as const;
