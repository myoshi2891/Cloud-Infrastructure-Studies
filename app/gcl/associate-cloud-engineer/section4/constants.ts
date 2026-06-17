/**
 * GCP ACE Section 4 constants.
 */
export const REVISION_DATE = '2025年6月版';

export interface NavItem {
    id: string;
    label: string;
    type: 'title' | 'link';
    colorClass?: string;
}

export const NAV_ITEMS: NavItem[] = [
    { id: 'sec-principles', label: '基礎', type: 'title' },
    { id: 'principles', label: 'セキュリティ設計原則', type: 'link', colorClass: 'icon-wif' },

    { id: 'sec-4.1', label: '4.1 — IAMの管理', type: 'title' },
    { id: 's41-policy', label: 'IAMポリシーの表示と作成', type: 'link', colorClass: 'icon-iam' },
    { id: 's41-hierarchy', label: '組織階層とロール継承', type: 'link', colorClass: 'icon-iam' },
    { id: 's41-roles', label: 'ロール種別とカスタムロール', type: 'link', colorClass: 'icon-iam' },

    { id: 'sec-4.2', label: '4.2 — SAの管理', type: 'title' },
    { id: 's42-create', label: 'SAの作成', type: 'link', colorClass: 'icon-sa' },
    { id: 's42-leastpriv', label: '最小権限でのIAM利用', type: 'link', colorClass: 'icon-sa' },
    { id: 's42-attach', label: 'リソースへのSA割り当て', type: 'link', colorClass: 'icon-sa' },
    { id: 's42-iam', label: 'SAのIAM権限管理', type: 'link', colorClass: 'icon-sa' },
    { id: 's42-impersonation', label: 'SA権限借用の管理', type: 'link', colorClass: 'icon-sa' },
    { id: 's42-shortlived', label: '短期クレデンシャル', type: 'link', colorClass: 'icon-sa' },
    { id: 's42-gke', label: 'GKEでのSA利用', type: 'link', colorClass: 'icon-sa' },
    { id: 's42-wif', label: 'Workload Identity Federation', type: 'link', colorClass: 'icon-wif' },

    { id: 'sec-exam', label: '試験対策', type: 'title' },
    { id: 'exam-patterns', label: '頻出パターン解法', type: 'link', colorClass: 'icon-exam' },
    { id: 'traps', label: '引っかけ問題パターン', type: 'link', colorClass: 'icon-exam' },
    { id: 'checklist', label: '直前チェックリスト', type: 'link', colorClass: 'icon-check' },
    { id: 'refs', label: '参考リソース一覧', type: 'link', colorClass: 'icon-check' }
];

export const DIAGRAMS: Record<string, string> = {
    'diag-1': `flowchart LR
    WHO["👤 Principal（誰が）\\nUser / Group / SA / Federated Identity"]
    WHAT["🔑 Role（何ができるか）\\nBasic / Predefined / Custom"]
    WHERE["🏷️ Resource（どこで）\\nOrg / Folder / Project / Resource"]
    HOW["📜 Policy（どう紐付けるか）\\nAllow Policy / Deny Policy"]
    WHO -->|バインディング| HOW
    WHAT -->|バインディング| HOW
    HOW -->|対象| WHERE`,

    'diag-2': `flowchart TD
    ORG["🏢 Organization\\nroles/logging.admin を付与"]
    F1["📁 Folder: 開発部門\\n追加のロールを付与可能"]
    F2["📁 Folder: 本番部門\\n追加のロールを付与可能"]
    P1["🗂️ Project: dev-app\\nOrg + Folder + Project のロールの和集合"]
    P2["🗂️ Project: prod-api\\nOrg + Folder + Project のロールの和集合"]
    R1["⚙️ Resource\\n上位すべてのロールが有効"]
    ORG -->|"自動継承 ↓"| F1
    ORG -->|"自動継承 ↓"| F2
    F1 -->|"自動継承 ↓"| P1
    F2 -->|"自動継承 ↓"| P2
    P1 -->|"自動継承 ↓"| R1
    NOTE["⚠️ 下位で上位の許可を\\n取り消すことはできない\\n（Deny Policy を除く）"]
    style ORG fill:#4285F4,color:#fff
    style F1 fill:#34A853,color:#fff
    style F2 fill:#34A853,color:#fff
    style P1 fill:#FBBC04,color:#000
    style P2 fill:#FBBC04,color:#000
    style R1 fill:#EA4335,color:#fff
    style NOTE fill:#2d1010,color:#ef5350`,

    'diag-3': `flowchart TD
    NEED["権限を付与したい"] --> Q1{"事前定義ロールで\\n要件を満たせるか？"}
    Q1 -->|"Yes"| PRED["事前定義ロールを使用 ✅\\nroles/storage.objectViewer 等"]
    Q1 -->|"No 過剰権限"| CUSTOM["カスタムロールを作成\\n最小限の権限だけ含める"]
    Q1 -->|"No 複数の組み合わせが必要"| MULTI["複数のロールを組み合わせる"]
    BASIC["❌ 基本ロール\\nroles/viewer / editor / owner\\n本番環境では原則禁止"]
    style PRED fill:#34A853,color:#fff
    style BASIC fill:#EA4335,color:#fff
    style CUSTOM fill:#FBBC04,color:#000
    style MULTI fill:#4285F4,color:#fff`,

    'diag-4': `stateDiagram-v2
    [*] --> ALPHA: "作成（stage: ALPHA）"
    ALPHA --> BETA: "昇格（stage: BETA）"
    BETA --> GA: "昇格（stage: GA）"
    GA --> DISABLED: "無効化（stage: DISABLED）"
    DISABLED --> GA: "再有効化"
    DISABLED --> DELETED: "削除"
    ALPHA --> DELETED: "削除"
    BETA --> DELETED: "削除"
    GA --> DELETED: "削除"`,

    'diag-5': `flowchart TB
    SA["サービスアカウント\\nmy-app@project.iam.gserviceaccount.com"]
    R1["役割 1: 主体（Principal）として\\n他のリソースにアクセスする「誰か」"]
    R2["役割 2: リソース（Resource）として\\n誰がこの SA を使えるかをIAMで制御"]
    SA --> R1
    SA --> R2
    R1 --> EX1["例: VM上のアプリが Cloud Storage を読み取る\\n→ SA の権限でアクセス"]
    R2 --> EX2["例: alice が SA を使う権限を持つか\\n→ roles/iam.serviceAccountUser が必要"]
    style SA fill:#4285F4,color:#fff
    style R1 fill:#34A853,color:#fff
    style R2 fill:#FBBC04,color:#000`,

    'diag-6': `flowchart TD
    START["SA に権限を付与したい"] --> Q1{"事前定義ロールで\\n要件を満たせるか？"}
    Q1 -->|"Yes"| USE["事前定義ロールを使用\\nroles/storage.objectViewer 等"]
    Q1 -->|"No: 過剰権限"| CUSTOM["カスタムロールを作成\\n必要な権限だけを含める"]
    Q1 -->|"No: 組み合わせが必要"| MULTI["複数のロールを組み合わせる"]
    AVOID["❌ 避けるべき\\nroles/editor / roles/owner を SA に付与"]
    style USE fill:#34A853,color:#fff
    style AVOID fill:#EA4335,color:#fff
    style CUSTOM fill:#FBBC04,color:#000
    style MULTI fill:#4285F4,color:#fff`,

    'diag-7': `flowchart LR
    ALICE["alice\\n（エンジニア）"]
    SA["privileged-sa\\n（特権 SA）"]
    VM["VM インスタンス"]
    GCP["GCP リソース"]
    ALICE -->|"roles/iam.serviceAccountUser\\nが必要（actAs 権限を含む）"| SA
    SA -->|"アタッチ"| VM
    VM -->|"SA の権限でアクセス"| GCP
    DANGER["⚠️ privileged-sa に Cloud SQL Admin 権限がある場合\\nactAs 権限を誰でも持てると\\n誰でもその権限を悪用できる！"]
    style DANGER fill:#2d1010,color:#ef5350
    style SA fill:#FBBC04,color:#000`,

    'diag-8': `sequenceDiagram
    participant A as alice（通常権限のエンジニア）
    participant IAM as GCP IAM
    participant PSA as privileged-sa（特権SA）
    participant API as GCP API

    A->>IAM: SA の TokenCreator 権限を使って<br/>トークンをリクエスト
    IAM->>IAM: alice が tokenCreator 権限を持つか確認
    IAM-->>A: 短期アクセストークン（最大1時間）を発行
    A->>API: トークンで privileged-sa の権限で操作
    API-->>A: 結果を返す
    Note over IAM: 監査ログに「alice が privileged-sa を<br/>使って何時に何の操作をしたか」が記録される
    Note over A: 1時間後にトークンが自動失効`,

    'diag-9': `flowchart LR
    APP["アプリケーション\\nSA-1 の権限を持つ"]
    SA1["SA-1\\n（中間 SA）"]
    SA2["SA-2\\n（中間 SA）"]
    SA3["SA-3\\n（特権 SA）"]
    GCP["GCP リソース"]
    APP -->|"SA-1 のトークンで\\nSA-2 のトークンを要求"| SA2
    SA1 -->|"TokenCreator on SA-2"| SA2
    SA2 -->|"TokenCreator on SA-3"| SA3
    APP -->|"SA-2 のトークンで\\nSA-3 のトークンを要求"| SA3
    APP -->|"SA-3 のトークンで\\nリソースにアクセス"| GCP
    style SA3 fill:#EA4335,color:#fff
    style APP fill:#4285F4,color:#fff
    style GCP fill:#34A853,color:#fff`,

    'diag-10': `flowchart TB
    subgraph Kubernetes
        POD["Pod\\n（アプリケーション）"]
        KSA["Kubernetes Service Account\\n（KSA）\\niam.gke.io/gcp-service-account アノテーション付き"]
    end
    subgraph GCP
        GSA["Google Cloud IAM SA\\n（GSA）\\nwlifgke-api-backend@project.iam.gserviceaccount.com"]
        GCS["Cloud Storage\\n（目的のリソース）"]
        IAM["IAM\\nroles/iam.workloadIdentityUser"]
    end
    POD -->|"KSA を使用"| KSA
    KSA -->|"Workload Identity Federation で紐付け"| IAM
    IAM -->|"GSA の権限を付与"| GSA
    GSA -->|"IAM ロールで許可された操作"| GCS
    style POD fill:#4285F4,color:#fff
    style GCS fill:#34A853,color:#fff
    style KSA fill:#0d1929,stroke:#00bcd4`,

    'diag-11': `flowchart LR
    subgraph 外部環境
        EXT["外部ワークロード\\nGitHub Actions / AWS EC2\\nAzure VM / オンプレミス"]
        OIDC["OIDC/SAML トークン\\n（外部 IdP が発行）"]
    end
    subgraph Google Cloud
        WIP["Workload Identity Pool"]
        PROV["Pool Provider\\n（特定IdPとの信頼関係）"]
        STS["Google STS\\n（Security Token Service）"]
        SA["IAM Service Account\\n（オプション）"]
        GCP["GCP リソース"]
    end
    EXT --> OIDC
    OIDC -->|"トークンを提示"| STS
    STS -->|"WIP + Provider で検証"| WIP
    WIP --> PROV
    STS -->|"短期 GCP トークンを発行"| EXT
    EXT -->|"直接アクセス OR 権限借用"| SA
    SA -->|"SA の権限でアクセス"| GCP
    EXT -->|"直接アクセス"| GCP
    style EXT fill:#FBBC04,color:#000
    style STS fill:#4285F4,color:#fff
    style GCP fill:#34A853,color:#fff`
};
