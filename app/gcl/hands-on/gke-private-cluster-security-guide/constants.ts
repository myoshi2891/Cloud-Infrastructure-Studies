/**
 * GKE プライベートクラスタ セキュリティ実装ガイド
 * Mermaid 図解定数（正本）
 */

export const DIAGRAMS: Record<string, string> = {
    'mermaid-1': `flowchart TB
    subgraph INTERNET["公開インターネット"]
        PUB["外部クライアント"]
    end

    subgraph MGMTVPC["Orca Management VPC"]
        subgraph MGMTSUB["orca-mgmt-subnet"]
            JUMP["orca-jumphost（管理踏み台）"]
        end
    end

    subgraph BUILDVPC["Orca Build VPC"]
        subgraph BUILDSUB["orca-build-subnet"]
            CP["GKEコントロールプレーン（内部エンドポイントのみ）"]
            NODE["ワーカーノード（プライベートIPのみ）"]
        end
    end

    subgraph IAMLAYER["IAM"]
        SA["専用サービスアカウント"]
    end

    PUB -.->|"アクセス不可: 公開エンドポイント無効"| CP
    JUMP -->|"内部IP + 承認済みネットワーク(/32)"| CP
    CP --- NODE
    NODE --> SA

    classDef blocked fill:#3a1220,stroke:#f87171,color:#fecaca,stroke-width:1px;
    classDef allowed fill:#0f2e22,stroke:#4ade80,color:#bbf7d0,stroke-width:1px;
    class PUB blocked;
    class JUMP allowed;`,

    'mermaid-2': `flowchart TD
    T1["Task 1<br/>カスタムIAMロール作成"] --> T2["Task 2<br/>サービスアカウント作成"]
    T2 --> T3["Task 3<br/>ロールのバインド"]
    T3 --> T4["Task 4<br/>プライベートクラスタ作成"]
    T4 --> T5["Task 5<br/>アプリのデプロイと検証"]`,

    'mermaid-3': `flowchart LR
    SA["orca-service-account"]
    R1["roles/monitoring.viewer"]
    R2["roles/monitoring.metricWriter"]
    R3["roles/logging.logWriter"]
    R4["orca_custom_security_role(カスタム)"]
    MON["Cloud Monitoring"]
    LOG["Cloud Logging"]
    GCS["Cloud Storage バケット"]

    SA --> R1 --> MON
    SA --> R2 --> MON
    SA --> R3 --> LOG
    SA --> R4 --> GCS

    classDef sa fill:#12233a,stroke:#7c9eff,color:#dbe6ff,stroke-width:1px;
    classDef custom fill:#241a3a,stroke:#b699ff,color:#e6dcff,stroke-width:1px;
    class SA sa;
    class R4 custom;`,

    'mermaid-4': `flowchart TD
    S1["gke-gcloud-auth-pluginをインストール"] --> S2["環境変数USE_GKE_GCLOUD_AUTH_PLUGIN=Trueを設定"]
    S2 --> S3["get-credentialsを--internal-ipで実行"]
    S3 --> S4["kubectlでDeploymentを作成"]
    S4 --> S5["kubectl get pods/deploymentsで確認"]`,
};
