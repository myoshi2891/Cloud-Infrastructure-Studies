export const DIAGRAMS: Record<string, string> = {
    d01: `%%{init: {'theme': 'dark', 'themeVariables': { 'pie1': '#7c9eff', 'pie2': '#f0b86e', 'pie3': '#7fd9a8', 'pie4': '#a9c1ff', 'pieTitleTextSize': '18px', 'pieSectionTextSize': '14px', 'pieLegendTextSize': '14px' }}}%%
pie showData
    title AWS SAA-C03 試験ドメイン別配点比率
    "ドメイン1: セキュアなアーキテクチャの設計 (30%)" : 30
    "ドメイン2: 回復力のあるアーキテクチャの設計 (26%)" : 26
    "ドメイン3: 高性能アーキテクチャの設計 (24%)" : 24
    "ドメイン4: コスト最適化アーキテクチャの設計 (20%)" : 20`,

    d02: `flowchart TD
    D1["ドメイン1: セキュアなアーキテクチャの設計<br/>(試験全体の30%)"]
    T11["タスク1.1<br/>AWSリソースへの<br/>安全なアクセス設計"]
    T12["タスク1.2<br/>安全なワークロードと<br/>アプリケーションの設計"]
    T13["タスク1.3<br/>適切なデータセキュリティ<br/>コントロールの決定"]

    T11A["IAM ユーザー/グループ/ロール/ポリシー"]
    T11B["AWS Organizations・SCP・Control Tower"]
    T11C["IAM Identity Center・フェデレーション・STS"]

    T12A["VPC・セキュリティグループ・NACL"]
    T12B["WAF・Shield・GuardDuty・Macie・Cognito"]
    T12C["VPN・Direct Connect"]

    T13A["KMS による暗号化(保管時)"]
    T13B["ACM/TLS による暗号化(転送時)"]
    T13C["バックアップ・データ分類・ライフサイクル"]

    D1 --> T11
    D1 --> T12
    D1 --> T13
    T11 --> T11A
    T11 --> T11B
    T11 --> T11C
    T12 --> T12A
    T12 --> T12B
    T12 --> T12C
    T13 --> T13A
    T13 --> T13B
    T13 --> T13C`,

    d03: `flowchart TB
    Root["ルートユーザー<br/>(アカウント作成時のみ使用・MFA必須)"]

    subgraph IAM["AWS IAM"]
        direction TB
        Users["IAMユーザー<br/>(人が使う長期的な認証情報)"]
        Groups["IAMグループ<br/>(ユーザーの集合)"]
        Roles["IAMロール<br/>(一時的な認証情報を発行)"]
        Policies["IAMポリシー<br/>(JSON形式の許可/拒否ルール)"]
    end

    Root -. "日常業務には使用しない" .-> IAM
    Users --> Groups
    Groups --> Policies
    Users --> Policies
    Roles --> Policies

    Apps["アプリケーション/EC2/Lambda"] --> Roles
    Federated["フェデレーションユーザー<br/>(IAM Identity Center / SAML / OIDC)"] --> Roles`,

    d04: `flowchart TD
    Start(["リクエスト受信"]) --> CheckDeny{"明示的な Deny が<br/>ポリシーに存在するか?"}
    CheckDeny -- "はい" --> Deny(["拒否(常に最優先)"])
    CheckDeny -- "いいえ" --> CheckSCP{"SCP / 境界の<br/>許可範囲内か?"}
    CheckSCP -- "範囲外" --> Deny
    CheckSCP -- "範囲内" --> CheckAllow{"明示的な Allow が<br/>存在するか?"}
    CheckAllow -- "はい" --> Allow(["許可"])
    CheckAllow -- "いいえ" --> ImplicitDeny(["暗黙的な拒否<br/>(デフォルトは常にDeny)"])`,

    d05: `sequenceDiagram
    participant User as ユーザー/アプリ(Account A)
    participant STS as AWS STS
    participant Role as IAMロール(Account B)
    participant Resource as AWSリソース(Account B)

    User->>STS: sts:AssumeRole を呼び出す
    STS->>Role: 信頼ポリシーを確認
    Role-->>STS: Account Aからの引き受けを許可
    STS-->>User: 一時的な認証情報を返却<br/>(AccessKey/SecretKey/SessionToken)
    User->>Resource: 一時的認証情報でAPIを呼び出す
    Resource-->>User: 許可されたAPI操作の結果
    Note over STS,Resource: CloudTrailはAssumeRole呼び出しを<br/>Account B側にも記録する`,

    d06: `flowchart TD
    Mgmt["管理アカウント<br/>(AWS Organizations)"]
    SecurityOU["Security OU"]
    InfraOU["Infrastructure OU"]
    WorkloadsOU["Workloads OU"]

    LogArchive["Log Archive アカウント"]
    SecurityTooling["Security Tooling アカウント<br/>(GuardDuty/Macie 委任管理者)"]

    Prod["本番ワークロードアカウント"]
    Dev["開発ワークロードアカウント"]

    Mgmt -->|SCPを適用| SecurityOU
    Mgmt -->|SCPを適用| InfraOU
    Mgmt -->|SCPを適用| WorkloadsOU

    SecurityOU --> LogArchive
    SecurityOU --> SecurityTooling
    WorkloadsOU --> Prod
    WorkloadsOU --> Dev

    IdentityCenter["AWS IAM Identity Center<br/>(SSOと権限セットを一元管理)"] -.->|フェデレーションアクセス| Mgmt`,

    d07: `flowchart TB
    IGW["インターネットゲートウェイ"]

    subgraph VPC["VPC (10.0.0.0/16)"]
        direction TB
        subgraph PublicSubnet["パブリックサブネット"]
            ALB["Application Load Balancer"]
            NAT["NATゲートウェイ"]
        end
        subgraph PrivateSubnet["プライベートサブネット"]
            App["アプリケーションサーバー(EC2)"]
        end
        subgraph DataSubnet["プライベートサブネット(データ層)"]
            DB[("RDSデータベース")]
        end
        RouteTablePublic["ルートテーブル(パブリック)<br/>0.0.0.0/0 → IGW"]
        RouteTablePrivate["ルートテーブル(プライベート)<br/>0.0.0.0/0 → NATゲートウェイ"]
    end

    Internet(["インターネット利用者"]) --> IGW
    IGW --> ALB
    ALB --> App
    App --> DB
    App -.->|外部への更新取得等| NAT
    NAT --> IGW`,

    d08: `flowchart LR
    Client(["インターネット利用者"])
    Shield["AWS Shield<br/>(DDoS対策・L3/L4)"]
    WAF["AWS WAF<br/>(Webアプリ攻撃対策・L7)"]
    ALBSG["セキュリティグループ<br/>(ステートフル・リソース/ENI単位)"]
    NACL["ネットワークACL<br/>(ステートレス・サブネット単位)"]
    Subnet["プライベートサブネット"]
    App["アプリケーション<br/>(最小権限のIAMロール)"]

    Client --> Shield --> WAF --> NACL --> Subnet --> ALBSG --> App`,

    d09: `flowchart TD
    Q1{"制御したい対象は?"}
    Q1 -->|"インスタンス/ENI単位で細かく制御したい"| SG["セキュリティグループを使用<br/>・ステートフル(戻り通信は自動許可)<br/>・Allowルールのみ"]
    Q1 -->|"サブネット単位で一括制御したい"| NACL["ネットワークACLを使用<br/>・ステートレス(戻り通信も明示が必要)<br/>・AllowとDenyの両方が可能"]
    SG --> Combine["通常はSGを主要な制御に使い<br/>NACLを追加の防御層として併用する"]
    NACL --> Combine`,

    d10: `sequenceDiagram
    participant App as アプリケーション
    participant SM as AWS Secrets Manager
    participant Lambda as ローテーション用Lambda
    participant DB as データベース

    App->>SM: GetSecretValue で認証情報を取得
    SM-->>App: 暗号化された認証情報を返却
    App->>DB: 取得した認証情報で接続

    Note over SM,Lambda: 設定した周期で自動ローテーション
    SM->>Lambda: ローテーションをトリガー
    Lambda->>DB: 新しいパスワードを設定
    Lambda->>SM: 新しいシークレット値を保存`,

    d11: `flowchart LR
    Data["平文データ"]
    subgraph KMS["AWS KMS"]
        CMK["カスタマー管理キー(CMK)"]
        DataKey["データキー(エンベロープ暗号化)"]
    end
    Encrypted["暗号化されたデータ"]

    Data --> DataKey
    CMK -->|データキーを生成・暗号化| DataKey
    DataKey -->|データを暗号化| Encrypted

    Encrypted --> S3[("Amazon S3(SSE-KMS)")]
    Encrypted --> EBS[("Amazon EBSボリューム")]
    Encrypted --> RDS[("Amazon RDS")]`,

    d12: `flowchart LR
    Client(["クライアント"])
    ACM["AWS Certificate Manager<br/>(TLS証明書を発行・自動更新)"]
    CloudFront["Amazon CloudFront"]
    ALB["Application Load Balancer"]
    Backend["バックエンドサービス"]

    ACM -->|証明書をデプロイ| CloudFront
    ACM -->|証明書をデプロイ| ALB
    Client -->|HTTPS/TLS| CloudFront --> ALB -->|TLS| Backend`,

    d13: `flowchart TD
    Create["KMSキーを作成<br/>(キーマテリアルはAWSが生成)"]
    Enable["自動ローテーションを有効化"]
    Wait["1年間経過"]
    Rotate["新しいキーマテリアルを生成<br/>(キーIDとARNは変わらない)"]
    Keep["古いキーマテリアルは<br/>復号のために保持され続ける"]

    Create --> Enable --> Wait --> Rotate --> Keep --> Wait`,

    d14: `flowchart TB
    Policy["AWS Backup バックアップポリシー<br/>(バックアッププラン)"]

    subgraph Sources["バックアップ対象"]
        EC2["EC2 / EBS"]
        RDSs["RDS"]
        DynamoDBs["DynamoDB"]
        EFSs["EFS"]
    end

    Vault["バックアップボールト<br/>(暗号化・アクセス制御)"]
    CrossRegion["クロスリージョン<br/>コピー先ボールト"]

    Policy --> Sources
    Sources --> Vault
    Vault -->|災害復旧のため複製| CrossRegion`,
};
