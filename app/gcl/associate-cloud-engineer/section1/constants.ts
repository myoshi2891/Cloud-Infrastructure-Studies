/**
 * GCP ACE Section 1「Setting up a Cloud Solution Environment」Mermaid 図定義。
 *
 * 正本は Ace-section1-complete-guide.html 末尾 <script> の DIAGRAMS。
 * - 配点表記は 2026年6月30日版 試験ガイド（PDF: 063026...）に合わせ ~23% に補正。
 * - `diag-quota-request`（旧 diag-6）は元データが `__STR0__` プレースホルダと
 *   重複エッジで Mermaid v10 構文が壊れていたため、線形フローに書き直した。
 */
export const DIAGRAMS: Record<string, string> = {
    // diag-0: Section 1 全体マップ
    'diag-overview': `graph LR
S1["Section 1 Cloud Solution Environment Setup ~23%"]
S1A["1.1 クラウドプロジェクト & アカウント設定"]
S1B["1.2 請求設定の管理"]
S1A1["リソース階層の構築"]
S1A2["組織ポリシーの適用"]
S1A3["IAMロールの付与"]
S1A4["Cloud Identity管理"]
S1A5["APIの有効化"]
S1A6["Observabilityの設定"]
S1A7["クォータ管理"]
S1A8["スタンドアロン組織"]
S1A9["ネットワーキング設定"]
S1A10["地理的可用性確認"]
S1A11["Cloud Asset Inventory & Gemini Cloud Assist"]
S1A12["Workforce Identity Federation"]
S1B1["請求アカウント作成"]
S1B2["プロジェクトとのリンク"]
S1B3["予算とアラート"]
S1B4["請求エクスポート"]
S1 --> S1A
S1 --> S1B
S1A --> S1A1
S1A --> S1A2
S1A --> S1A3
S1A --> S1A4
S1A --> S1A5
S1A --> S1A6
S1A --> S1A7
S1A --> S1A8
S1A --> S1A9
S1A --> S1A10
S1A --> S1A11
S1A --> S1A12
S1B --> S1B1
S1B --> S1B2
S1B --> S1B3
S1B --> S1B4
style S1 fill:#4285F4,color:#fff
style S1A fill:#34A853,color:#fff
style S1B fill:#34A853,color:#fff`,

    // diag-1: IAM ポリシーの継承メカニズム
    'diag-iam-inheritance': `flowchart TD
ORG["Organization Level<br />roles/viewer を alice に付与"]
FOLDER["Folder Level<br />継承: alice は viewer"]
PROJECT["Project Level<br />継承: alice は viewer"]
RESOURCE["Resource Level<br />継承: alice は viewer"]
ORG -->|"自動継承 ↓"| FOLDER
FOLDER -->|"自動継承 ↓"| PROJECT
PROJECT -->|"自動継承 ↓"| RESOURCE
NOTE["⚠ 重要: 下位レベルで上位の許可を取り消せない<br />権限は和集合で評価される"]
style ORG fill:#4285F4,color:#fff
style FOLDER fill:#34A853,color:#fff
style PROJECT fill:#FBBC04,color:#000
style RESOURCE fill:#EA4335,color:#fff
style NOTE fill:#2d1f1f,color:#f28b82,stroke:#EA4335`,

    // diag-2: IAM と Org Policy の評価フロー
    'diag-iam-orgpolicy-flow': `flowchart LR
USER["ユーザー / SA"]
IAM{"IAM チェック<br />誰が何をできるか"}
ORGPOL{"Org Policy チェック<br />リソース設定の制限"}
RESOURCE["✅ リソース操作"]
DENY["❌ 拒否"]
USER --> IAM
IAM -->|"権限あり"| ORGPOL
IAM -->|"権限なし"| DENY
ORGPOL -->|"制約内"| RESOURCE
ORGPOL -->|"制約違反"| DENY
style DENY fill:#EA4335,color:#fff
style RESOURCE fill:#34A853,color:#fff
style USER fill:#4285F4,color:#fff`,

    // diag-3: 組織ポリシーの継承と上書き
    'diag-orgpolicy-inheritance': `flowchart TD
ORG["Organization<br />disableExternalIpAddresses = enforce:true"]
FA["Folder: 本番環境<br />継承: 外部IP禁止"]
FB["Folder: 開発環境<br />restore_default: 外部IP許可に上書き"]
PA["Project: prod-app<br />外部IP禁止 継承"]
PB["Project: dev-app<br />外部IP許可 上書き済み"]
ORG --> FA
ORG --> FB
FA --> PA
FB --> PB
style ORG fill:#4285F4,color:#fff
style FA fill:#EA4335,color:#fff
style FB fill:#34A853,color:#fff
style PA fill:#EA4335,color:#fff
style PB fill:#34A853,color:#fff`,

    // diag-4: IAM の3要素
    'diag-iam-three-elements': `graph LR
WHO["👤 Principal（誰が）<br />user: alice@example.com<br />group: dev-team@example.com<br />serviceAccount: app@project.iam..."]
WHAT["🔑 Role（何ができるか）<br />roles/compute.instanceAdmin.v1<br />roles/storage.objectViewer<br />カスタムロール"]
WHERE["🏷 Resource（どこで）<br />Organization / Folder<br />Project / 個別リソース"]
WHO -->|"バインディング"| WHAT
WHAT -->|"対象"| WHERE
style WHO fill:#4285F4,color:#fff
style WHAT fill:#34A853,color:#fff
style WHERE fill:#FBBC04,color:#000`,

    // diag-5: GCDS / SCIM 自動プロビジョニング
    'diag-gcds-provisioning': `flowchart LR
LDAP["社内 LDAP / AD<br />（Active Directory等）"]
SYNC["Google Cloud Directory Sync<br />GCDS または SCIM"]
CI["Cloud Identity<br />ユーザー / グループ同期"]
IAM["Google Cloud IAM<br />グループへのロール付与"]
LDAP -->|"定期同期"| SYNC
SYNC -->|"プロビジョニング"| CI
CI -->|"継承"| IAM
style LDAP fill:#F9AB00,color:#000
style CI fill:#34A853,color:#fff
style IAM fill:#4285F4,color:#fff`,

    // diag-6（修正版）: クォータ増加申請フロー
    'diag-quota-request': `flowchart LR
A["IAM と管理 → クォータ"] --> B["対象クォータを選択"]
B --> C["上限を編集をクリック"]
C --> D["必要な上限値を入力・理由を記述"]
D --> E["申請送信"]
E --> F["Google が審査（数日〜数週間）"]
style A fill:#4285F4,color:#fff
style F fill:#34A853,color:#fff`,

    // diag-7: Organization ノード取得フロー
    'diag-org-node': `flowchart LR
A["Google Workspace または Cloud Identity を取得"]
B["ドメイン所有権を確認 DNS レコードで認証"]
C["Organization ノードが 自動生成される"]
D["Organization Admin が フォルダ・ポリシーを設定"]
A --> B --> C --> D
style C fill:#34A853,color:#fff
style D fill:#4285F4,color:#fff`,

    // diag-8: セキュアなネットワーク初期設計フロー
    'diag-network-design': `flowchart TD
A["カスタムモード VPC の作成 デフォルト VPC を削除"]
B["サブネット設計 用途別・リージョン別に IP レンジを計画"]
C["ファイアウォールルール設計 デフォルト拒否 + 必要なポートのみ許可"]
D["VM に外部 IP を付与しない プライベート IP のみ構成"]
E["Cloud NAT を設定 外部 IP なし VM のアウトバウンド通信を確保"]
F["IAP を設定 VPN レスの安全な SSH アクセス"]
A --> B --> C --> D --> E --> F
style A fill:#4285F4,color:#fff
style C fill:#EA4335,color:#fff
style F fill:#34A853,color:#fff`,

    // diag-9: グローバル / リージョン / ゾーン階層
    'diag-geo-hierarchy': `graph TD
GLOBAL["グローバルリソース<br />IAM / Cloud DNS / GCS マルチリージョン等"]
REGION["リージョン<br />asia-northeast1（東京） / asia-northeast2（大阪）"]
ZONE["ゾーン（可用性ドメイン）<br />asia-northeast1-a / -b / -c"]
GLOBAL --> REGION
REGION --> ZONE
style GLOBAL fill:#4285F4,color:#fff
style REGION fill:#34A853,color:#fff
style ZONE fill:#FBBC04,color:#000`,

    // diag-10: Cloud Asset Inventory の機能
    'diag-asset-inventory': `flowchart LR
CI["Cloud Asset Inventory"]
A["リソースの検索<br />searchAllResources"]
B["IAMポリシーの分析<br />analyzeIamPolicy"]
C["変更履歴の追跡<br />exportAssets"]
D["リアルタイムフィード<br />feeds.create"]
CI --> A
CI --> B
CI --> C
CI --> D
style CI fill:#4285F4,color:#fff`,

    // diag-11: Workforce Identity Federation 設定フロー
    'diag-workforce-federation': `flowchart TD
A["外部 IdP<br />（Okta / Azure AD / ADFS 等）"]
B["Workforce Identity Pool の作成<br />（組織レベル）"]
C["IdP Provider の登録<br />（OIDC or SAML）"]
D["属性マッピングの設定<br />google.subject = assertion.sub"]
E["IAM バインディング<br />principalSet:// でグループに権限付与"]
F["外部ユーザーが<br />gcloud / Console にアクセス"]
A --> B --> C --> D --> E --> F
style A fill:#F9AB00,color:#000
style F fill:#34A853,color:#fff`,

    // diag-12: 請求の基本構造
    'diag-billing-structure': `graph TD
PP["支払いプロファイル<br />Payment Profile<br />（クレカ・銀行口座情報）"]
BA1["請求先アカウント A"]
BA2["請求先アカウント B"]
P1["Project 1"]
P2["Project 2"]
P3["Project 3"]
P4["Project 4"]
PP --> BA1
PP --> BA2
BA1 --> P1
BA1 --> P2
BA2 --> P3
BA2 --> P4
style PP fill:#4285F4,color:#fff
style BA1 fill:#34A853,color:#fff
style BA2 fill:#34A853,color:#fff`,

    // diag-13: 自動コスト制御アーキテクチャ
    'diag-cost-control': `flowchart LR
BUDGET["予算アラート<br />100% 閾値到達"]
PUBSUB["Pub/Sub トピック<br />にメッセージを発行"]
CF["Cloud Functions<br />トリガー起動"]
API["Compute Engine API<br />または Billing API"]
ACTION["VM を停止<br />または課金リンク解除"]
BUDGET --> PUBSUB --> CF --> API --> ACTION
style BUDGET fill:#EA4335,color:#fff
style ACTION fill:#34A853,color:#fff
style PUBSUB fill:#4285F4,color:#fff`,

    // diag-14: 請求エクスポート → BigQuery → 分析
    'diag-billing-export': `flowchart LR
BILLING["Cloud Billing<br />（請求データ）"]
EXPORT["BigQuery エクスポート<br />（継続的に自動書き込み）"]
BQ["BigQuery データセット<br />billing_export"]
ANALYSIS["SQL クエリ<br />によるコスト分析"]
VIZ["Looker Studio<br />ダッシュボード"]
BILLING --> EXPORT --> BQ --> ANALYSIS
BQ --> VIZ
style BILLING fill:#4285F4,color:#fff
style BQ fill:#34A853,color:#fff
style VIZ fill:#FBBC04,color:#000`,
};
