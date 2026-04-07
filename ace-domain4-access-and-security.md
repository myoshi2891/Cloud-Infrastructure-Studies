# Domain 4: アクセスとセキュリティの構成

## Google Cloud ACE 試験対策 — 完全詳細解説ガイド

> **対象読者**: Google Cloud 初学者〜中級者  
> **試験配点**: 全体の約 **20%**（Standard Exam: 50〜60問中 約10〜12問）  
> **公式ページ**: https://cloud.google.com/learn/certification/cloud-engineer?hl=en  
> **試験ガイド**: https://services.google.com/fh/files/misc/associate_cloud_engineer_exam_guide_english.pdf

---

## 📋 Domain 4 の全体マップ

```
Domain 4: アクセスとセキュリティの構成（≈ 20%）
│
├── 4-A. IAM（Identity and Access Management）の設定
│   ├── IAM の基本概念（主体・ロール・ポリシー）
│   ├── 基本ロール / 事前定義ロール / カスタムロール
│   ├── IAM ポリシーの設定と管理
│   ├── 条件付きロールバインディング
│   └── IAM 推奨事項（Policy Recommender）
│
├── 4-B. サービスアカウントの管理
│   ├── サービスアカウントとは何か
│   ├── サービスアカウントキー（JSON）の問題点
│   ├── Workload Identity Federation
│   ├── Application Default Credentials (ADC)
│   ├── 権限借用（Impersonation）
│   └── Privileged Access Manager (PAM)
│
├── 4-C. シークレットとデータ保護
│   ├── Secret Manager
│   ├── Cloud KMS（鍵管理サービス）
│   └── VPC Service Controls
│
├── 4-D. ネットワークセキュリティ
│   ├── ファイアウォールルールの設計
│   ├── Cloud Armor（DDoS / WAF）
│   ├── Identity-Aware Proxy (IAP)
│   └── Private Service Connect
│
└── 4-E. セキュリティの可視化とコンプライアンス
    ├── Security Command Center (SCC)
    ├── Cloud Asset Inventory
    └── Binary Authorization
```

---

## 📚 目次

1. [セキュリティの基本概念と設計原則](#chapter-1-セキュリティの基本概念と設計原則)
2. [IAM の基本アーキテクチャ](#chapter-2-iam-の基本アーキテクチャ)
3. [ロールの 3 種類：基本 / 事前定義 / カスタム](#chapter-3-ロールの-3-種類基本--事前定義--カスタム)
4. [IAM ポリシーの設定と管理](#chapter-4-iam-ポリシーの設定と管理)
5. [条件付きロールバインディング（IAM Conditions）](#chapter-5-条件付きロールバインディングiam-conditions)
6. [サービスアカウントの基本概念と種類](#chapter-6-サービスアカウントの基本概念と種類)
7. [サービスアカウントキーのリスクと代替手法](#chapter-7-サービスアカウントキーのリスクと代替手法)
8. [Workload Identity Federation](#chapter-8-workload-identity-federation)
9. [Application Default Credentials (ADC)](#chapter-9-application-default-credentials-adc)
10. [権限借用（Impersonation）と PAM](#chapter-10-権限借用impersonationと-pam)
11. [Secret Manager（シークレット管理）](#chapter-11-secret-managerシークレット管理)
12. [Cloud KMS（鍵管理サービス）](#chapter-12-cloud-kms鍵管理サービス)
13. [VPC Service Controls](#chapter-13-vpc-service-controls)
14. [Identity-Aware Proxy (IAP)](#chapter-14-identity-aware-proxy-iap)
15. [Cloud Armor（DDoS 防御 / WAF）](#chapter-15-cloud-armorddos-防御--waf)
16. [Security Command Center (SCC)](#chapter-16-security-command-center-scc)
17. [Domain 4 試験対策まとめ](#chapter-17-domain-4-試験対策まとめ)

---

## Chapter 1: セキュリティの基本概念と設計原則

### 1.1 Google Cloud セキュリティの 3 つの基本原則

#### 原則①: 最小特権の原則（Principle of Least Privilege）

```
【最小特権とは？】

必要な権限だけを、必要な人・サービスにだけ、
必要な期間だけ付与する

悪い例（過剰な権限）:
  「とりあえず Editor を全員に付与する」
    → 誰でも VM を削除できる
    → 誰でも DB を変更できる
    → 侵害時の被害が最大化

良い例（最小権限）:
  「フロントエンドエンジニアには Cloud Run の
   デプロイ権限だけを付与する」
   → 必要な操作だけできる
   → 侵害されても他のリソースへの影響を最小化
```

#### 原則②: 職務分掌（Separation of Duties）

```
【職務分掌とは？】

同一人物がすべての操作を単独で実行できないようにする

例:
  コードを書く人（Developer）
      ↓ PR を作成
  コードをレビューする人（Reviewer）
      ↓ 承認
  本番にデプロイする人（Ops）または CI/CD が自動実行

→ 一人のエンジニアが「コードを書いてそのまま本番にデプロイ」
  できない仕組みを作る
```

#### 原則③: 深層防御（Defense in Depth）

```
【深層防御とは？】

複数のセキュリティ層を重ねて、
1 つの層が破られても他の層で防御する

Google Cloud での深層防御:

外側: Cloud Armor（DDoS / WAF）
  ↓
ネットワーク: ファイアウォールルール / VPC Service Controls
  ↓
認証: IAM / Identity-Aware Proxy
  ↓
データ: 暗号化（Cloud KMS）/ Secret Manager
  ↓
監視: Security Command Center / Cloud Logging
```

---

### 1.2 Google の共有責任モデル（Shared Responsibility Model）

```
【誰が何を守るか？】

Google の責任:
  ├── 物理インフラのセキュリティ（データセンター）
  ├── ハードウェアとソフトウェアの脆弱性対応
  ├── ネットワークの基盤セキュリティ
  └── マネージドサービスのセキュリティ（GKE Autopilot など）

顧客（あなた）の責任:
  ├── IAM 設定（誰がアクセスできるか）
  ├── データの暗号化設定
  ├── アプリケーションのセキュリティ
  ├── ファイアウォールルールの設定
  └── シークレット・認証情報の管理

【責任の境界はサービスによって異なる】
  IaaS（Compute Engine）: 顧客の責任範囲が広い
  PaaS（Cloud Run）: Google の責任範囲が広い
  SaaS（Google Workspace）: ほぼ Google が管理
```

---

## Chapter 2: IAM の基本アーキテクチャ

### 2.1 IAM の 3 つの要素

IAM（Identity and Access Management）は、Google Cloud のすべてのアクセス制御の基盤です。

```
【IAM の 3 要素】

① 主体（Principal / Who）
   └── 誰がアクセスするか？

② ロール（Role / Can do what）
   └── 何ができるか？

③ リソース（Resource / On which resource）
   └── どのリソースに対して？

IAM ポリシー = 主体 + ロール + リソース の組み合わせ
```

---

### 2.2 主体（Principal）の種類

| 主体の種類 | 説明 | 例 |
| ----------- | ------ | ----- |
| **Google アカウント** | 個人ユーザー | `user:alice@example.com` |
| **サービスアカウント** | アプリ・プログラムのアカウント | `serviceAccount:my-app@project.iam.gserviceaccount.com` |
| **Google グループ** | ユーザーのグループ（推奨） | `group:dev-team@example.com` |
| **Google Workspace ドメイン** | ドメイン全体のユーザー | `domain:example.com` |
| **Cloud Identity ドメイン** | Cloud Identity のユーザー全員 | `domain:example.com` |
| **allUsers** | インターネット上の誰でも | 公開バケットなど |
| **allAuthenticatedUsers** | Google アカウントを持つ誰でも | ほぼ使用しない |

> ⚠️ **試験頻出**: `allUsers` と `allAuthenticatedUsers` は**公開設定**になるため、機密リソースには絶対に使用しないこと！

---

### 2.3 権限（Permission）の命名規則

```
権限の命名規則: service.resource.verb

例:
  compute.instances.create    → VM インスタンスの作成
  storage.objects.get         → Storage オブジェクトの取得
  bigquery.tables.create      → BigQuery テーブルの作成
  iam.serviceAccounts.actAs   → サービスアカウントとして動作

【service の例】
  compute    → Compute Engine
  storage    → Cloud Storage
  bigquery   → BigQuery
  iam        → IAM
  container  → GKE
  run        → Cloud Run
  cloudsql   → Cloud SQL
```

---

### 2.4 IAM ポリシーの構造

```json
{
  "bindings": [
    {
      "role": "roles/storage.objectViewer",
      "members": [
        "user:alice@example.com",
        "group:dev-team@example.com",
        "serviceAccount:my-app@project.iam.gserviceaccount.com"
      ]
    },
    {
      "role": "roles/compute.instanceAdmin.v1",
      "members": [
        "user:bob@example.com"
      ],
      "condition": {
        "title": "Production Hours Only",
        "expression": "request.time.getHours('Asia/Tokyo') >= 9 && request.time.getHours('Asia/Tokyo') < 18"
      }
    }
  ],
  "version": 3
}
```

---

## Chapter 3: ロールの 3 種類：基本 / 事前定義 / カスタム

### 3.1 基本ロール（Basic Roles / Primitive Roles）

```
【3 つの基本ロール】

roles/viewer（閲覧者）
  └── すべてのリソースを閲覧のみ（変更不可）

roles/editor（編集者）
  └── ほぼすべてのリソースを作成・更新・削除
      ※ IAM の変更・請求設定は不可

roles/owner（オーナー）
  └── すべての権限（IAM 変更・請求設定も含む）
```

#### ⚠️ 基本ロールを使ってはいけない理由

```
【なぜ本番環境で基本ロールを使ってはいけないのか？】

roles/editor を付与した場合:
  ✅ やりたいこと: Cloud Run へのデプロイ
  ❌ 意図しない権限:
      ・Cloud SQL の DB を削除できる
      ・Cloud Storage バケットを削除できる
      ・Cloud Spanner のデータを変更できる
      ・Compute Engine の VM を削除できる
      ・Secret Manager のシークレットを読める

→ 必要以上の権限が付与されてしまう
→ アカウントが侵害された場合の被害が甚大

【例外的に使用可能なケース】
  ├── 開発環境での個人プロジェクト（学習目的）
  ├── 小規模チームの初期フェーズ（一時的）
  └── 組織ポリシーで後から制限することを前提に
```

---

### 3.2 事前定義ロール（Predefined Roles）

Google が各サービスに対してキュレーションした細かいロールです。

#### 主要な事前定義ロール一覧

**Compute Engine**

| ロール | 権限の概要 |
| -------- | ---------- |
| `roles/compute.admin` | Compute Engine の完全管理 |
| `roles/compute.instanceAdmin.v1` | VM インスタンスの作成・管理（ネットワーク変更不可） |
| `roles/compute.networkAdmin` | ネットワークリソースの管理 |
| `roles/compute.osLogin` | OS Login での SSH 接続 |
| `roles/compute.osAdminLogin` | OS Login での SSH 接続（sudo 権限付き） |
| `roles/compute.viewer` | 閲覧のみ |

**Cloud Storage**

| ロール | 権限の概要 |
| -------- | ---------- |
| `roles/storage.admin` | バケット・オブジェクトの完全管理 |
| `roles/storage.objectAdmin` | オブジェクトの完全管理（バケット設定変更不可） |
| `roles/storage.objectCreator` | オブジェクトのアップロードのみ |
| `roles/storage.objectViewer` | オブジェクトの閲覧のみ |

**IAM & Service Accounts**

| ロール | 権限の概要 |
| -------- | ---------- |
| `roles/iam.securityAdmin` | IAM ポリシーの表示・設定 |
| `roles/iam.roleAdmin` | カスタムロールの作成・管理 |
| `roles/iam.serviceAccountAdmin` | サービスアカウントの作成・管理 |
| `roles/iam.serviceAccountUser` | SA を VM 等にアタッチする権限 |
| `roles/iam.serviceAccountTokenCreator` | SA の短期トークンを生成（権限借用） |
| `roles/iam.workloadIdentityUser` | Workload Identity を通じた SA へのアクセス |

**GKE**

| ロール | 権限の概要 |
| -------- | ---------- |
| `roles/container.admin` | GKE クラスタの完全管理 |
| `roles/container.developer` | GKE のワークロード管理（クラスタ設定変更不可） |
| `roles/container.clusterViewer` | クラスタ情報の閲覧のみ |

**Cloud Run**

| ロール | 権限の概要 |
| -------- | ---------- |
| `roles/run.admin` | Cloud Run の完全管理 |
| `roles/run.developer` | デプロイ・設定変更 |
| `roles/run.invoker` | Cloud Run サービスへのリクエスト送信 |

**BigQuery**

| ロール | 権限の概要 |
| -------- | ---------- |
| `roles/bigquery.admin` | BigQuery の完全管理 |
| `roles/bigquery.dataEditor` | データセット・テーブルの編集 |
| `roles/bigquery.dataViewer` | データの閲覧のみ |
| `roles/bigquery.jobUser` | クエリの実行（データへのアクセス権は別途必要） |

---

### 3.3 カスタムロール（Custom Roles）

```
【カスタムロールを作成すべきケース】

事前定義ロールでは:
  ├── 権限が多すぎる（オーバースコープ）
  │   例: roles/storage.admin はバケット削除もできてしまう
  │       「オブジェクトのアップロードと読み取りだけ」のロールが欲しい
  │
  └── 複数のサービスにまたがる特定の組み合わせが必要
      例: Cloud Run のデプロイ権限 + Artifact Registry の読み取り権限

【カスタムロールの注意点】
  ├── 管理コストが増える（権限の追加・削除の追跡が必要）
  ├── Google が新しいサービスを追加しても自動更新されない
  └── 使いすぎると管理が複雑になる → 最小限にとどめる
```

カスタムロールの作成:

```bash
# YAML ファイルでカスタムロールを定義
cat > custom-deployer-role.yaml <<EOF
title: "Cloud Run Deployer"
description: "Cloud Run へのデプロイと Artifact Registry の読み取りのみ"
stage: "GA"
includedPermissions:
  - run.services.create
  - run.services.update
  - run.services.get
  - run.services.list
  - artifactregistry.repositories.get
  - artifactregistry.tags.get
  - artifactregistry.tags.list
  - storage.objects.get
  - storage.objects.list
EOF

# プロジェクトレベルでカスタムロールを作成
gcloud iam roles create cloudRunDeployer \
  --project=PROJECT_ID \
  --file=custom-deployer-role.yaml

# カスタムロールの一覧確認
gcloud iam roles list --project=PROJECT_ID --filter="name~customRoles"

# カスタムロールの詳細確認
gcloud iam roles describe cloudRunDeployer \
  --project=PROJECT_ID

# カスタムロールの更新（権限を追加）
gcloud iam roles update cloudRunDeployer \
  --project=PROJECT_ID \
  --add-permissions=run.routes.get
```

---

### 3.4 ロール選択の意思決定フロー

```
権限を付与したい
    ↓
事前定義ロールで要件を満たせるか？
    ├── YES → 事前定義ロールを使用（推奨）
    │
    └── NO  → 事前定義ロールが広すぎる or 複数ロールの組み合わせが必要
              ↓
          カスタムロールを作成（最小限の権限で）

※ 基本ロール（Viewer/Editor/Owner）は最終手段
  → 本番環境では原則使用しない
```

#### ✅ ベストプラクティス: ロール管理

| # | ベストプラクティス | 理由 |
| --- | ------------------- | ------ |
| 1 | **本番環境での基本ロール（Editor/Owner）使用を禁止** | 過剰権限によるリスク |
| 2 | **ユーザーではなくグループにロールを付与** | メンバー変更時の管理コスト削減 |
| 3 | **リソースレベルではなくプロジェクト/フォルダレベルで付与** | 一元管理・継承の活用 |
| 4 | **定期的に Policy Recommender で不要な権限を削除** | クリープ（権限の肥大化）防止 |
| 5 | **カスタムロールは組織レベルで管理** | 再利用・一元管理 |

> 🔗 **参考**: https://cloud.google.com/blog/products/identity-security/iam-best-practice-guides-available-now  
> 🔗 **参考**: https://cloudoptimo.com/blog/google-cloud-iam-role-hierarchies-explained/

---

## Chapter 4: IAM ポリシーの設定と管理

### 4.1 IAM ポリシーの設定コマンド

```bash
# ===== プロジェクトレベルの IAM 操作 =====

# 現在の IAM ポリシーを確認
gcloud projects get-iam-policy PROJECT_ID

# ユーザーにロールを付与
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:alice@example.com" \
  --role="roles/run.developer"

# グループにロールを付与（推奨）
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="group:backend-team@example.com" \
  --role="roles/compute.instanceAdmin.v1"

# ロールを削除
gcloud projects remove-iam-policy-binding PROJECT_ID \
  --member="user:alice@example.com" \
  --role="roles/run.developer"

# ===== リソースレベルの IAM 操作 =====

# Cloud Storage バケットへの権限付与
gcloud storage buckets add-iam-policy-binding gs://my-bucket \
  --member="serviceAccount:my-app@PROJECT.iam.gserviceaccount.com" \
  --role="roles/storage.objectViewer"

# Cloud Run サービスへの Invoker 権限付与
gcloud run services add-iam-policy-binding my-service \
  --region=asia-northeast1 \
  --member="serviceAccount:caller-sa@PROJECT.iam.gserviceaccount.com" \
  --role="roles/run.invoker"

# BigQuery データセットへの権限付与
bq add-iam-policy-binding \
  --project=PROJECT_ID \
  --dataset=my_dataset \
  --member="group:data-team@example.com" \
  --role="roles/bigquery.dataViewer"
```

---

### 4.2 IAM ポリシーの一括更新（Policy ファイルを使った管理）

```bash
# 現在のポリシーをファイルに書き出す
gcloud projects get-iam-policy PROJECT_ID \
  --format=json > current-policy.json

# ポリシーファイルを編集して一括更新
# （current-policy.json を編集後）
gcloud projects set-iam-policy PROJECT_ID current-policy.json
```

> ⚠️ **`set-iam-policy` は完全上書き**です！現在のポリシーを取得してから編集して適用してください。

---

### 4.3 Policy Recommender（IAM 推奨事項）

Policy Recommender は、実際の使用状況を分析して、**過剰な権限を検出**し、より適切なロールを推奨する AI 搭載ツールです。

```
【Policy Recommender の仕組み】

90 日間のアクティビティを分析
    ↓
「このユーザーは Editor 権限を持っているが、
 実際に使ったのは Cloud Run の操作だけ」を検出
    ↓
推奨事項:
  「roles/editor → roles/run.developer に変更することを推奨
   これにより 150 の不要な権限が削除されます」
```

```bash
# プロジェクトの IAM 推奨事項を確認
gcloud recommender recommendations list \
  --project=PROJECT_ID \
  --location=global \
  --recommender=google.iam.policy.Recommender

# 推奨事項を適用（権限を縮小）
gcloud recommender recommendations apply RECOMMENDATION_ID \
  --project=PROJECT_ID \
  --location=global \
  --recommender=google.iam.policy.Recommender \
  --etag=ETAG
```

---

## Chapter 5: 条件付きロールバインディング（IAM Conditions）

### 5.1 IAM Conditions とは？

IAM Conditions は、ロールバインディングに「条件」を追加して、**特定の状況でのみ権限を有効にする**機能です。

```
【通常のロールバインディング】
  alice に roles/storage.objectAdmin を付与
  → いつでも、どこからでもアクセス可能

【条件付きロールバインディング】
  alice に roles/storage.objectAdmin を付与
  ただし、以下の条件を満たす場合のみ:
    ├── 特定の時間帯のみ（例: 平日 9:00-18:00）
    ├── 特定のリソースのみ（例: 本番バケット以外）
    └── 特定のリクエスト元のみ
```

---

### 5.2 条件式の書き方（CEL: Common Expression Language）

```
【よく使う条件の種類】

① 時間ベースの条件
request.time.getHours('Asia/Tokyo') >= 9 &&
request.time.getHours('Asia/Tokyo') < 18

② 特定リソースへのアクセス制限
resource.name.startsWith("projects/my-project/datasets/staging")

③ リソースタイプによる制限
resource.type == "storage.googleapis.com/Object"

④ タグベースのアクセス制御
resource.matchTagId("tagValues/123456789")
```

#### 実践的な使用例

```bash
# 例1: 業務時間内（JST 9:00-18:00）のみ権限を有効化
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:contractor@partner.com" \
  --role="roles/compute.instanceAdmin.v1" \
  --condition='
    title=BusinessHoursOnly,
    description=Only during business hours JST,
    expression=request.time.getHours("Asia/Tokyo") >= 9 && request.time.getHours("Asia/Tokyo") < 18'

# 例2: 有効期限付きの権限付与（一時的なアクセス）
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="user:temp-worker@example.com" \
  --role="roles/viewer" \
  --condition='
    title=TemporaryAccess,
    description=Valid until 2024-03-31,
    expression=request.time < timestamp("2024-03-31T23:59:59Z")'

# 例3: 特定の Cloud Storage パスのみアクセス許可
gcloud storage buckets add-iam-policy-binding gs://my-bucket \
  --member="serviceAccount:external-app@PROJECT.iam.gserviceaccount.com" \
  --role="roles/storage.objectViewer" \
  --condition='
    title=DevOnlyAccess,
    description=Access to dev prefix only,
    expression=resource.name.startsWith("projects/_/buckets/my-bucket/objects/dev/")'
```

---

### 5.3 グループ vs 個人へのロール付与

```
【個人（ユーザー）に直接ロールを付与する問題】

社員 A、B、C が同じ権限を必要としている場合:
  ユーザーごとに add-iam-policy-binding を 3 回実行
    ↓
社員 D が追加されたら また 1 回実行
社員 A が退職したら remove-iam-policy-binding を実行
    ↓
管理が煩雑・設定漏れのリスク

【グループにロールを付与する利点（推奨）】

Google グループ: backend-team@example.com に権限付与
    ↓
グループにメンバーを追加するだけで権限が自動付与
グループからメンバーを削除するだけで権限が自動剥奪
IAM ポリシーを変更する必要なし！

設定例:
  gcloud projects add-iam-policy-binding PROJECT_ID \
    --member="group:backend-team@example.com" \
    --role="roles/run.developer"
```

#### ✅ ベストプラクティス: IAM ポリシー管理

| # | ベストプラクティス | 理由 |
| --- | ------------------- | ------ |
| 1 | **個人ではなくグループにロールを付与** | メンバー変更時の管理を自動化 |
| 2 | **最もスコープの小さいレベルで権限を付与** | 影響範囲の最小化 |
| 3 | **定期的な権限レビュー（90 日ごと）** | 不要な権限の蓄積（クリープ）を防止 |
| 4 | **IAM Conditions で一時的な権限を付与** | 永続権限のリスクを排除 |
| 5 | **`set-iam-policy` より `add/remove-iam-policy-binding` を使用** | 他の権限を誤って上書きするリスクを防止 |

> 🔗 **参考**: https://docs.cloud.google.com/iam/docs/resource-hierarchy-access-control

---

## Chapter 6: サービスアカウントの基本概念と種類

### 6.1 サービスアカウントとは？

```
【人間のアカウント vs サービスアカウント】

人間のアカウント（User Account）:
  └── alice@example.com でログインするのは「人間」

サービスアカウント（Service Account）:
  └── my-app@project.iam.gserviceaccount.com
      これは「アプリケーション・プログラム」のアカウント

【サービスアカウントの二重の役割】

役割①: 主体（Principal）としてのサービスアカウント
  → 他のリソースにアクセスする「誰か」として機能
  例: VM 上のアプリが Cloud Storage を読み取る
      （VM に SA をアタッチ → SA の権限でアクセス）

役割②: リソース（Resource）としてのサービスアカウント
  → 「誰かが SA を使う権限を管理する対象」
  例: alice が特定の SA を使う権限を持つかどうか
      （SA へのアクセス自体を IAM で制御）
```

---

### 6.2 サービスアカウントの種類

| 種類 | 作成者 | 用途 |
| ------ | -------- | ------ |
| **ユーザー管理 SA** | ユーザーが作成 | アプリ・CI/CD・GKE Pod など |
| **デフォルト SA** | Google が自動作成 | App Engine、Compute Engine のデフォルト |
| **Google 管理 SA** | Google が内部で使用 | Google サービスの内部通信 |

> ⚠️ **デフォルト SA の危険性**: Compute Engine のデフォルト SA は `roles/editor` に近い権限を持っているため、そのまま使用は危険です。専用の最小権限 SA を作成してアタッチしてください。

---

### 6.3 サービスアカウントの作成と管理

```bash
# サービスアカウントの作成
gcloud iam service-accounts create my-app-sa \
  --display-name="My Application Service Account" \
  --description="SA for the production web application"

# SA の一覧確認
gcloud iam service-accounts list

# SA の詳細確認
gcloud iam service-accounts describe \
  my-app-sa@PROJECT_ID.iam.gserviceaccount.com

# SA に IAM ロールを付与（SA が Cloud Storage を読み取る権限）
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="serviceAccount:my-app-sa@PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/storage.objectViewer"

# SA を VM にアタッチ（VM 作成時）
gcloud compute instances create my-vm \
  --service-account=my-app-sa@PROJECT_ID.iam.gserviceaccount.com \
  --scopes=cloud-platform \
  --zone=asia-northeast1-a

# 既存 VM の SA を変更
gcloud compute instances set-service-account my-vm \
  --service-account=new-sa@PROJECT_ID.iam.gserviceaccount.com \
  --scopes=cloud-platform \
  --zone=asia-northeast1-a

# SA の無効化（削除せずに一時停止）
gcloud iam service-accounts disable \
  my-app-sa@PROJECT_ID.iam.gserviceaccount.com

# SA の削除
gcloud iam service-accounts delete \
  my-app-sa@PROJECT_ID.iam.gserviceaccount.com
```

---

### 6.4 `iam.serviceAccounts.actAs` 権限の重要性

```
【actAs 権限とは？】

「サービスアカウントを VM にアタッチする」操作は
roles/iam.serviceAccountUser（含む actAs 権限）が必要

なぜ重要か？
  privileged-sa には Cloud SQL Admin 権限がある
  → この SA を誰でも VM にアタッチできると
    誰でも privileged-sa の権限を利用できてしまう！

→ actAs 権限を持つ人だけが、その SA を使えるリソースを作成できる

gcloud iam service-accounts add-iam-policy-binding \
  privileged-sa@PROJECT.iam.gserviceaccount.com \
  --member="user:alice@example.com" \
  --role="roles/iam.serviceAccountUser"
```

---

## Chapter 7: サービスアカウントキーのリスクと代替手法

### 7.1 SA キー（JSON キー）の問題点

```
【サービスアカウントキーの生成から漏洩まで】

Step 1: エンジニアが SA キーを生成
  gcloud iam service-accounts keys create key.json \
    --iam-account=my-sa@PROJECT.iam.gserviceaccount.com

Step 2: key.json を CI/CD に設定 or ローカルに保存

Step 3: 誤って GitHub にコミット or ラップトップを紛失

Step 4: 攻撃者がキーを発見

Step 5: 攻撃者が GCP API を呼び出す
  gcloud auth activate-service-account --key-file=stolen-key.json

Step 6: 莫大な被害が発生！

【SA キーの管理コスト】
  ├── 定期的なローテーションが必要（90日ごと推奨）
  ├── 有効期限の管理
  ├── 誰がどのキーを持っているかの追跡
  └── 組織全体で数百〜数千のキーを管理する地獄
```

> ⚠️ **ACE 試験最重要**: SA JSON キーの使用はセキュリティ上の重大なアンチパターン。代替手法を必ず覚えること。

---

### 7.2 SA キーを使わない認証方法の選択

```
【シナリオ別の推奨認証方法】

シナリオ A: GCE/GKE/Cloud Run 上のアプリ
  → VM または Pod に SA をアタッチ
  → メタデータサーバーから自動的にトークンを取得
  → キー不要！

シナリオ B: 開発者のローカル PC
  → gcloud auth application-default login
  → ADC（Application Default Credentials）を使用
  → キー不要！

シナリオ C: GitHub Actions / GitLab CI / Jenkins
  → Workload Identity Federation を設定
  → CI/CD が動的にトークンを交換
  → キー不要！

シナリオ D: AWS / Azure / オンプレミスのシステム
  → Workload Identity Federation を設定
  → 外部 IdP のトークンを GCP トークンに交換
  → キー不要！

シナリオ E: 権限が必要な一時的な管理作業
  → SA Impersonation（権限借用）を使用
  → 短期トークンのみを生成
  → キー不要！

⚠️ SA JSON キーを使うべきシナリオ: ほぼなし
   どうしても必要な場合は組織ポリシーで管理し、
   有効期限を設定して定期ローテーションする
```

---

## Chapter 8: Workload Identity Federation

### 8.1 Workload Identity Federation とは？

外部システム（AWS、GitHub Actions など）から **SA キーなし**で Google Cloud API にアクセスするための仕組みです。

```
【Workload Identity Federation の仕組み】

従来（SA キー使用）:
  GitHub Actions → key.json を秘密として保存 → GCP API 呼び出し

Workload Identity Federation（推奨）:
  GitHub Actions
      ↓ OIDC トークン（GitHub が発行）を提示
  Google Cloud Security Token Service (STS)
      ↓ OIDC トークンを検証
      ↓ 短期有効な Google Cloud アクセストークンを発行
  GCP API を呼び出す
      ↓ 完了後トークンは自動失効

【メリット】
  ✓ SA キーをどこにも保存しない
  ✓ トークンは短期間で自動失効
  ✓ 監査ログで誰が何時アクセスしたか追跡可能
```

---

### 8.2 GitHub Actions との Workload Identity Federation 設定

```bash
# Step 1: Workload Identity Pool の作成
gcloud iam workload-identity-pools create github-pool \
  --location=global \
  --description="GitHub Actions Workload Identity Pool" \
  --display-name="GitHub Actions Pool"

# Step 2: GitHub の OIDC プロバイダーを登録
gcloud iam workload-identity-pools providers create-oidc github-provider \
  --location=global \
  --workload-identity-pool=github-pool \
  --display-name="GitHub OIDC Provider" \
  --issuer-uri="https://token.actions.githubusercontent.com" \
  --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository,attribute.actor=assertion.actor,attribute.aud=assertion.aud" \
  --attribute-condition="assertion.repository_owner == 'my-org'"  # 組織を限定

# Step 3: SA を作成（CI/CD 用の最小権限 SA）
gcloud iam service-accounts create github-deploy-sa \
  --display-name="GitHub Actions Deploy SA"

gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="serviceAccount:github-deploy-sa@PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/run.developer"  # 必要な権限のみ

# Step 4: Workload Identity Pool に SA への権限借用を許可
WORKLOAD_IDENTITY_POOL_ID=$(gcloud iam workload-identity-pools describe github-pool \
  --location=global \
  --format="value(name)")

gcloud iam service-accounts add-iam-policy-binding \
  github-deploy-sa@PROJECT_ID.iam.gserviceaccount.com \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/${WORKLOAD_IDENTITY_POOL_ID}/attribute.repository/my-org/my-repo"
```

#### GitHub Actions ワークフローの設定

```yaml
# .github/workflows/deploy.yml
name: Deploy to Cloud Run

on:
  push:
    branches: [main]

permissions:
  contents: read
  id-token: write  # OIDC トークンの生成を許可

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      # Workload Identity Federation で認証（SA キー不要！）
      - id: auth
        uses: google-github-actions/auth@v2
        with:
          workload_identity_provider: 'projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/github-pool/providers/github-provider'
          service_account: 'github-deploy-sa@PROJECT_ID.iam.gserviceaccount.com'

      # gcloud が自動的に上記で取得したトークンを使用
      - name: Deploy to Cloud Run
        run: |
          gcloud run deploy my-service \
            --image=gcr.io/PROJECT/my-app:${{ github.sha }} \
            --region=asia-northeast1
```

---

### 8.3 GKE での Workload Identity

GKE 環境では、Pod が Google Cloud API にアクセスする際に Workload Identity を使用します。

```bash
# Step 1: GKE クラスタで Workload Identity を有効化
gcloud container clusters update my-cluster \
  --workload-pool=PROJECT_ID.svc.id.goog \
  --region=asia-northeast1

# Step 2: Google Cloud SA を作成
gcloud iam service-accounts create gke-app-sa \
  --display-name="GKE Application SA"

# Step 3: SA に必要な権限を付与
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="serviceAccount:gke-app-sa@PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"  # Secret Manager へのアクセス

# Step 4: Kubernetes SA と Google Cloud SA を紐付け
gcloud iam service-accounts add-iam-policy-binding \
  gke-app-sa@PROJECT_ID.iam.gserviceaccount.com \
  --role=roles/iam.workloadIdentityUser \
  --member="serviceAccount:PROJECT_ID.svc.id.goog[my-namespace/my-ksa]"
```

```yaml
# Kubernetes Service Account の設定
apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-ksa
  namespace: my-namespace
  annotations:
    # Google Cloud SA に紐付け
    iam.gke.io/gcp-service-account: gke-app-sa@PROJECT_ID.iam.gserviceaccount.com
```

> 🔗 **参考**: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/autopilot-security

---

## Chapter 9: Application Default Credentials (ADC)

### 9.1 ADC とは？

ADC は、コードを変更せずに認証情報を切り替えられる仕組みです。

```
【ADC の検索順序（コードが認証情報を探す順番）】

1. GOOGLE_APPLICATION_CREDENTIALS 環境変数
   └── 指定されたキーファイルを使用

2. gcloud auth application-default login で設定した認証情報
   └── ローカル開発環境での標準

3. GCE / GKE / Cloud Run などの実行環境
   └── メタデータサーバーからトークンを自動取得（キー不要）

4. Cloud Shell
   └── 自動的に認証済み

【コードは認証情報を意識しない】

# コードでは認証情報を指定しない
from google.cloud import storage
client = storage.Client()  # ADC が自動的に認証情報を解決
```

---

### 9.2 ローカル開発での ADC 設定

```bash
# 方法1: ユーザーアカウントで認証（最も一般的）
gcloud auth application-default login
# ブラウザが開いて Google アカウントでログイン
# 認証情報が ~/.config/gcloud/application_default_credentials.json に保存

# 方法2: SA を権限借用して ADC を設定
gcloud auth application-default login \
  --impersonate-service-account=my-sa@PROJECT.iam.gserviceaccount.com
# SA の権限でローカル開発が可能

# 方法3: 環境変数で SA キーを指定（非推奨）
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json
# ※ 緊急時以外は使用しない

# ADC の設定を確認
gcloud auth application-default print-access-token

# ADC の設定を削除
gcloud auth application-default revoke
```

---

## Chapter 10: 権限借用（Impersonation）と PAM

### 10.1 SA Impersonation（権限借用）

```
【権限借用の仕組み】

alice（通常の権限を持つエンジニア）
    ↓ roles/iam.serviceAccountTokenCreator を持つ
privileged-sa（管理者権限を持つ SA）
    ↓ 短期トークンを生成（1時間以内に自動失効）
管理タスクを実行
    ↓ 完了

【通常の権限付与との違い】

通常の権限付与:
  alice に直接 roles/storage.admin を付与
  → alice は永続的に全バケットを管理できる
  → alice のアカウントが侵害されると大問題

権限借用:
  alice は自分の権限ではなく SA を借用して作業
  → 短期トークンで操作（1時間で失効）
  → 「alice が privileged-sa を使って何時にどの操作をしたか」
    が監査ログに詳細記録される
  → alice 自身の権限は小さいまま
```

設定手順:

```bash
# Step 1: privileged-sa の作成
gcloud iam service-accounts create privileged-sa \
  --display-name="Privileged Operations SA"

# Step 2: privileged-sa に管理権限を付与
gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="serviceAccount:privileged-sa@PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/storage.admin"

# Step 3: alice に SA の TokenCreator 権限を付与
gcloud iam service-accounts add-iam-policy-binding \
  privileged-sa@PROJECT_ID.iam.gserviceaccount.com \
  --member="user:alice@example.com" \
  --role="roles/iam.serviceAccountTokenCreator"

# Step 4: alice が権限借用を使って操作
gcloud storage buckets list \
  --impersonate-service-account=privileged-sa@PROJECT_ID.iam.gserviceaccount.com

# または短期トークンを生成して使用
gcloud auth print-access-token \
  --impersonate-service-account=privileged-sa@PROJECT_ID.iam.gserviceaccount.com
```

---

### 10.2 Privileged Access Manager (PAM)

PAM は承認ワークフロー付きで一時的な特権アクセスを管理するエンタープライズ機能です。

```
【PAM のワークフロー】

Step 1: alice が特権アクセスをリクエスト
  「prod の Cloud SQL を修正するために DB Admin が必要（理由: インシデント対応）」

Step 2: 承認者（上長・セキュリティチーム）がリクエストを確認
  → Slack / Email で通知
  → 理由・期間を確認して承認 or 却下

Step 3: 承認されたら自動的にロールを付与
  → 指定期間（例: 2時間）だけ有効

Step 4: 期間終了後、自動的にロールを剥奪
  → 誰の操作も不要

Step 5: 全操作が監査ログに詳細記録
```

```bash
# PAM の設定（エンタイトルメントの作成）
gcloud pam entitlements create prod-db-admin-access \
  --location=global \
  --project=PROJECT_ID \
  --privileged-access='iamAccess={iamPolicies=[{resource=//cloudresourcemanager.googleapis.com/projects/PROJECT_ID,roleBindings=[{role=roles/cloudsql.admin}]}]}' \
  --max-request-duration=7200s \  # 最大 2 時間
  --approval-workflow='manualApprovals={steps=[{approvalsNeeded=1,approvers={principals=[user:manager@example.com]}}]}'
```

#### ✅ ベストプラクティス: SA と認証管理

| # | ベストプラクティス | 理由 |
| --- | ------------------- | ------ |
| 1 | **SA JSON キーの生成を組織ポリシーで禁止** | 漏洩リスクの根本排除 |
| 2 | **GCE/GKE は SA を VM/Pod にアタッチ**（キー不要） | メタデータサーバーで自動認証 |
| 3 | **CI/CD は Workload Identity Federation を設定** | キー不要・自動失効 |
| 4 | **ローカル開発は ADC**（gcloud auth application-default login） | キー不要・ユーザー権限のまま |
| 5 | **特権操作は SA Impersonation または PAM** | 監査ログ + 自動失効 |
| 6 | **1 SA = 1 アプリケーション / 1 目的** | 最小権限・追跡可能性の確保 |

> 🔗 **参考**: https://cloud.google.com/blog/products/identity-security/iam-best-practice-guides-available-now

---

## Chapter 11: Secret Manager（シークレット管理）

### 11.1 Secret Manager とは？

```
【なぜ Secret Manager が必要か？】

❌ 絶対にやってはいけないこと:
  ├── コードにパスワードをハードコード
  │   DB_PASSWORD = "my-secret-password"
  ├── 環境変数に平文でシークレットを設定
  │   ENV DB_PASSWORD="my-secret-password"
  └── 設定ファイルをそのまま Git にコミット
      database.conf に password=... が含まれている

✅ Secret Manager を使う理由:
  ├── シークレットを安全に暗号化して保存
  ├── アクセス制御（IAM で誰が読めるかを制御）
  ├── バージョン管理（前のバージョンにロールバック可能）
  ├── 自動ローテーション（パスワードを定期更新）
  └── 監査ログ（誰がいつシークレットを読んだか記録）
```

---

### 11.2 Secret Manager の基本操作

```bash
# ===== シークレットの作成 =====

# テキストでシークレットを作成
echo -n "my-database-password" | \
  gcloud secrets create db-password \
    --replication-policy=automatic \
    --data-file=-

# ファイルからシークレットを作成
gcloud secrets create api-key \
  --replication-policy=automatic \
  --data-file=./api-key.txt

# ===== シークレットのバージョン管理 =====

# 新しいバージョンを追加（ローテーション）
echo -n "new-password-v2" | \
  gcloud secrets versions add db-password \
    --data-file=-

# バージョン一覧の確認
gcloud secrets versions list db-password

# ===== シークレットへのアクセス =====

# 最新バージョンにアクセス
gcloud secrets versions access latest --secret=db-password

# 特定バージョンにアクセス
gcloud secrets versions access 2 --secret=db-password

# ===== シークレットの管理 =====

# シークレット一覧
gcloud secrets list

# シークレットの詳細
gcloud secrets describe db-password

# 古いバージョンを無効化
gcloud secrets versions disable 1 --secret=db-password

# バージョンを削除（永久削除・復元不可）
gcloud secrets versions destroy 1 --secret=db-password

# シークレット自体を削除
gcloud secrets delete db-password
```

---

### 11.3 アプリケーションからのシークレットアクセス

#### Python からのアクセス

```python
from google.cloud import secretmanager

def access_secret(project_id: str, secret_id: str, version_id: str = "latest") -> str:
    """Secret Manager からシークレットを取得"""
    client = secretmanager.SecretManagerServiceClient()
    
    # シークレットのリソース名を構築
    name = f"projects/{project_id}/secrets/{secret_id}/versions/{version_id}"
    
    # シークレットにアクセス
    response = client.access_secret_version(request={"name": name})
    
    return response.payload.data.decode("UTF-8")

# 使用例
db_password = access_secret("my-project", "db-password")
# → "my-database-password"
```

#### Cloud Run での環境変数注入

```bash
# Cloud Run デプロイ時に Secret Manager のシークレットを環境変数として注入
gcloud run deploy my-service \
  --image=gcr.io/PROJECT/my-app:latest \
  --region=asia-northeast1 \
  --set-secrets="DB_PASSWORD=db-password:latest,API_KEY=api-key:v2"
  # 環境変数名=シークレット名:バージョン
```

#### Kubernetes（GKE）でのシークレットの使用

```yaml
# Secret Store CSI Driver を使用して Pod に直接マウント
apiVersion: secrets-store.csi.x-k8s.io/v1
kind: SecretProviderClass
metadata:
  name: my-app-secrets
spec:
  provider: gcp
  parameters:
    secrets: |
      - resourceName: "projects/PROJECT/secrets/db-password/versions/latest"
        fileName: "db-password"
---
apiVersion: v1
kind: Pod
spec:
  volumes:
  - name: secrets-vol
    csi:
      driver: secrets-store.csi.k8s.io
      readOnly: true
      volumeAttributes:
        secretProviderClass: my-app-secrets
  containers:
  - name: app
    volumeMounts:
    - name: secrets-vol
      mountPath: /run/secrets
      readOnly: true
```

---

### 11.4 Secret Manager の IAM 設定

```bash
# SA にシークレットへのアクセス権を付与
gcloud secrets add-iam-policy-binding db-password \
  --member="serviceAccount:my-app-sa@PROJECT.iam.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"

# 開発チームにシークレットの管理権限を付与
gcloud secrets add-iam-policy-binding db-password \
  --member="group:backend-team@example.com" \
  --role="roles/secretmanager.secretVersionManager"
```

| ロール | 権限 |
| -------- | ------ |
| `roles/secretmanager.admin` | シークレットの完全管理 |
| `roles/secretmanager.secretAccessor` | シークレットの値を読み取る |
| `roles/secretmanager.secretVersionManager` | バージョンの作成・無効化（値の読み取りは不可） |
| `roles/secretmanager.viewer` | シークレットのメタデータのみ閲覧 |

#### ✅ ベストプラクティス: Secret Manager

| # | ベストプラクティス |
| --- | ------------------- |
| 1 | **コードへのハードコードを根絶**（コードレビューで CI/CD が検出） |
| 2 | **最小権限**: アプリは `secretAccessor` のみ（管理権限は不要） |
| 3 | **Secret ローテーション**: 90 日ごとにパスワードを自動更新 |
| 4 | **アクセスログを Cloud Logging で監視**（誰がいつ読んだか） |
| 5 | **リージョンを指定**して規制コンプライアンスに対応 |

> 🔗 **参考**: https://cloud.google.com/secret-manager/docs/overview

---

## Chapter 12: Cloud KMS（鍵管理サービス）

### 12.1 Cloud KMS とは？

```
【Cloud KMS でできること】

暗号化キーの管理:
  ├── 暗号化キーを Cloud KMS で一元管理
  ├── キーのローテーション（定期的に新しいキーに切り替え）
  ├── キーへのアクセスを IAM で制御
  └── FIPS 140-2 準拠のハードウェアで保護

データの暗号化・復号化:
  └── Cloud KMS キーを使ってデータを暗号化・復号化
      （CMEK: Customer Managed Encryption Keys）

【デフォルト暗号化 vs CMEK】

デフォルト:
  Google が管理するキーでデータを暗号化
  → 自動・コストなし
  → キーの管理は Google が担当

CMEK（顧客管理暗号化キー）:
  自分で作成・管理するキーでデータを暗号化
  → コストあり
  → キーの削除でデータへのアクセスを完全遮断可能
  → コンプライアンス要件（自社でキーを管理する義務）に対応
```

---

### 12.2 Cloud KMS の基本操作

```bash
# ===== キーリングとキーの作成 =====

# キーリングを作成（キーをグループ化するコンテナ）
gcloud kms keyrings create my-keyring \
  --location=asia-northeast1

# 対称暗号化キーを作成（データの暗号化・復号化）
gcloud kms keys create my-symmetric-key \
  --keyring=my-keyring \
  --location=asia-northeast1 \
  --purpose=encryption \
  --rotation-period=90d \         # 90日ごとに自動ローテーション
  --next-rotation-time=2024-04-01T00:00:00Z

# 非対称署名キーを作成（コード署名・JWT 署名など）
gcloud kms keys create my-asymmetric-key \
  --keyring=my-keyring \
  --location=asia-northeast1 \
  --purpose=asymmetric-signing \
  --default-algorithm=ec-sign-p256-sha256

# ===== 暗号化・復号化 =====

# ファイルを暗号化
gcloud kms encrypt \
  --keyring=my-keyring \
  --key=my-symmetric-key \
  --location=asia-northeast1 \
  --plaintext-file=sensitive-data.txt \
  --ciphertext-file=sensitive-data.enc

# ファイルを復号化
gcloud kms decrypt \
  --keyring=my-keyring \
  --key=my-symmetric-key \
  --location=asia-northeast1 \
  --ciphertext-file=sensitive-data.enc \
  --plaintext-file=decrypted-data.txt

# ===== キーバージョン管理 =====

# キーの全バージョン一覧
gcloud kms keys versions list \
  --key=my-symmetric-key \
  --keyring=my-keyring \
  --location=asia-northeast1

# 古いキーバージョンを無効化（既存データへのアクセスは可能）
gcloud kms keys versions disable 1 \
  --key=my-symmetric-key \
  --keyring=my-keyring \
  --location=asia-northeast1
```

---

### 12.3 CMEK による Cloud Storage の暗号化

```bash
# Cloud Storage バケットに CMEK を設定
gcloud storage buckets update gs://my-sensitive-bucket \
  --default-kms-key=projects/PROJECT/locations/asia-northeast1/keyRings/my-keyring/cryptoKeys/my-symmetric-key

# SA に Cloud Storage バケットがキーを使う権限を付与
gcloud kms keys add-iam-policy-binding my-symmetric-key \
  --keyring=my-keyring \
  --location=asia-northeast1 \
  --member="serviceAccount:service-PROJECT_NUMBER@gs-project-accounts.iam.gserviceaccount.com" \
  --role="roles/cloudkms.cryptoKeyEncrypterDecrypter"
```

| KMS ロール | 権限 |
| ----------- | ------ |
| `roles/cloudkms.admin` | キーの完全管理 |
| `roles/cloudkms.cryptoKeyEncrypterDecrypter` | 暗号化と復号化の両方 |
| `roles/cloudkms.cryptoKeyEncrypter` | 暗号化のみ |
| `roles/cloudkms.cryptoKeyDecrypter` | 復号化のみ |
| `roles/cloudkms.viewer` | キーのメタデータ閲覧のみ |

> 🔗 **参考**: https://cloud.google.com/kms/docs/overview

---

## Chapter 13: VPC Service Controls

### 13.1 VPC Service Controls とは？

```
【VPC Service Controls の目的】

通常の IAM:
  「誰が何のリソースにアクセスできるか」を制御

VPC Service Controls:
  「どこから」アクセスできるかを制御
  （IAM と組み合わせてより強固なセキュリティを実現）

【防御できる脅威】

脅威1: データの持ち出し（Data Exfiltration）
  攻撃者が会社の BigQuery データを
  自分の Google Cloud プロジェクトにコピーしようとする
  → VPC Service Controls でブロック！

脅威2: 認証情報の盗難後のアクセス
  盗まれた SA キーで外部から Cloud Storage にアクセスしようとする
  → VPC Service Controls で許可された場所からのみアクセス！

脅威3: フィッシング後の不正アクセス
  社員が騙されてフィッシングサイトで認証情報を入力
  → 特定の IP / VPC からのみアクセスを許可しているためブロック！
```

---

### 13.2 VPC Service Controls の設計

```
【サービス境界（Service Perimeter）の構造】

サービス境界（Service Perimeter）:
  ├── 保護対象プロジェクト: project-A, project-B
  ├── 保護対象 API: BigQuery, Cloud Storage, Cloud SQL
  │
  ├── アクセスポリシー（誰がアクセスできるか）:
  │   ├── VPC Network: my-corp-vpc（社内ネットワークから）
  │   ├── IP アドレス範囲: 203.0.113.0/24（会社の外部 IP）
  │   └── SA: trusted-sa@project.iam.gserviceaccount.com
  │
  └── アクセスレベル（Access Level）:
      └── 上記の組み合わせで定義

境界外からのアクセス → PERMISSION DENIED
境界内からのアクセス → IAM で判断
```

```bash
# アクセスポリシーの作成
gcloud access-context-manager policies create \
  --organization=ORG_ID \
  --title="My Corp Access Policy"

# アクセスレベルの作成（会社の VPC + IP 範囲を許可）
gcloud access-context-manager levels create corp-network \
  --policy=POLICY_ID \
  --title="Corporate Network Access" \
  --basic-level-spec=access-level-spec.yaml

# サービス境界の作成
gcloud access-context-manager perimeters create my-perimeter \
  --policy=POLICY_ID \
  --title="Data Protection Perimeter" \
  --resources=projects/PROJECT_NUMBER \
  --restricted-services=bigquery.googleapis.com,storage.googleapis.com \
  --access-levels=accessPolicies/POLICY_ID/accessLevels/corp-network
```

> 🔗 **参考**: https://cloud.google.com/vpc-service-controls/docs/overview

---

## Chapter 14: Identity-Aware Proxy (IAP)

### 14.1 IAP とは？

```
【IAP がない場合（従来の方法）】

ユーザー → インターネット → VPN → 社内システム
または
ユーザー → インターネット → Bastion Host → 社内システム

問題点:
  ├── VPN のセットアップが面倒
  ├── Bastion Host の管理コスト
  └── VPN が侵害されると内部に全アクセス

【IAP がある場合（ゼロトラストアクセス）】

ユーザー → インターネット → IAP → Google 内部ネットワーク → アプリ
              ↑
         認証・認可をここで実施
         ・Google アカウントで認証
         ・IAM で認可（どのユーザーがアクセス可能か）
         ・デバイスのセキュリティ状態を確認
         ・VPN 不要！
```

---

### 14.2 IAP の設定

```bash
# Cloud Run サービスに IAP を有効化
# （先にロードバランサを設定し、IAP はバックエンドサービスに適用）

# バックエンドサービスに IAP を有効化
gcloud compute backend-services update my-backend-service \
  --iap=enabled \
  --oauth2-client-id=CLIENT_ID \
  --oauth2-client-secret=CLIENT_SECRET \
  --global

# ユーザーにアクセスを許可
gcloud iap web add-iam-policy-binding \
  --resource-type=backend-services \
  --service=my-backend-service \
  --member="user:alice@example.com" \
  --role="roles/iap.httpsResourceAccessor"

# グループにアクセスを許可（推奨）
gcloud iap web add-iam-policy-binding \
  --resource-type=backend-services \
  --service=my-backend-service \
  --member="group:internal-users@example.com" \
  --role="roles/iap.httpsResourceAccessor"
```

---

### 14.3 IAP による SSH / TCP トンネリング

VPN なしで VM や GKE ノードに安全に接続できます。

```bash
# IAP トンネル経由で VM に SSH 接続
gcloud compute ssh VM_NAME \
  --zone=asia-northeast1-a \
  --tunnel-through-iap
# → 外部 IP なし・ファイアウォールで SSH を開放していない VM にも接続可能！

# IAP トンネル経由でローカルポートフォワーディング
# 例: Cloud SQL に直接接続（Auth Proxy の代替）
gcloud compute start-iap-tunnel VM_NAME 3306 \
  --local-host-port=localhost:3307 \
  --zone=asia-northeast1-a
# → localhost:3307 → IAP → VM の 3306 にトンネル
```

#### ✅ ベストプラクティス: IAP

| # | ベストプラクティス |
| --- | ------------------- |
| 1 | **VPN の代わりに IAP** でゼロトラストアクセスを実現 |
| 2 | **VM の外部 IP を削除**し、IAP トンネル経由でのみ SSH を許可 |
| 3 | **グループで IAP アクセスを管理**（個人への付与は避ける） |
| 4 | **IAP + OS Login の組み合わせ**で多層防御 |

> 🔗 **参考**: https://cloud.google.com/iap/docs/concepts-overview

---

## Chapter 15: Cloud Armor（DDoS 防御 / WAF）

### 15.1 Cloud Armor の役割

```
【Cloud Armor が保護するレイヤ】

インターネット → Cloud Armor → Cloud Load Balancer → バックエンド
     ↑
  DDoS 攻撃・悪意のあるリクエストをここでブロック

【Cloud Armor でできること】

① L3/L4 DDoS 防御（自動）
   → ネットワーク層の大規模 DDoS を自動的に軽減

② L7 WAF（Web Application Firewall）
   → SQL インジェクション、XSS などの攻撃を検出・ブロック

③ IP ベースのアクセス制御
   → 特定の IP アドレスをブロック or 許可リスト

④ 地理情報ベースのアクセス制御
   → 特定の国からのアクセスをブロック

⑤ レート制限
   → 1つの IP からの大量リクエストを制限
```

---

### 15.2 Cloud Armor のセキュリティポリシー設定

```bash
# セキュリティポリシーを作成
gcloud compute security-policies create my-waf-policy \
  --description="WAF and DDoS protection for production"

# ===== WAF ルール（OWASP ルールセット）=====

# SQL インジェクション対策ルールを追加
gcloud compute security-policies rules create 1000 \
  --security-policy=my-waf-policy \
  --expression="evaluatePreconfiguredExpr('sqli-v33-stable')" \
  --action=deny-403 \
  --description="Block SQL injection attempts"

# XSS（クロスサイトスクリプティング）対策
gcloud compute security-policies rules create 1001 \
  --security-policy=my-waf-policy \
  --expression="evaluatePreconfiguredExpr('xss-v33-stable')" \
  --action=deny-403 \
  --description="Block XSS attempts"

# ===== IP ベースのルール =====

# 特定 IP をブロック
gcloud compute security-policies rules create 2000 \
  --security-policy=my-waf-policy \
  --src-ip-ranges=203.0.113.100/32 \
  --action=deny-403 \
  --description="Block known malicious IP"

# 特定の国からのアクセスをブロック
gcloud compute security-policies rules create 3000 \
  --security-policy=my-waf-policy \
  --expression="origin.region_code == 'XX'" \
  --action=deny-403 \
  --description="Block traffic from country XX"

# ===== レート制限 =====

# 1 IP あたり 100 リクエスト/60 秒に制限
gcloud compute security-policies rules create 4000 \
  --security-policy=my-waf-policy \
  --expression="true" \
  --action=rate-based-ban \
  --rate-limit-threshold-count=100 \
  --rate-limit-threshold-interval-sec=60 \
  --ban-duration-sec=600 \
  --conform-action=allow \
  --exceed-action=deny-429 \
  --description="Rate limiting per IP"

# ===== ポリシーを LB バックエンドサービスに適用 =====
gcloud compute backend-services update my-backend-service \
  --security-policy=my-waf-policy \
  --global
```

---

### 15.3 Cloud Armor のアダプティブ保護（Adaptive Protection）

```
【Adaptive Protection とは？】

Google の ML モデルがトラフィックを分析:
  ├── 通常のトラフィックパターンを学習
  ├── 異常なトラフィック（DDoS の可能性）を検出
  ├── ブロックルールを自動提案
  └── ワンクリックで適用可能

設定方法:
  gcloud compute security-policies update my-waf-policy \
    --enable-layer7-ddos-defense

→ 大規模 DDoS 攻撃時に自動的に保護ルールを適用
```

#### ✅ ベストプラクティス: Cloud Armor

| # | ベストプラクティス |
| --- | ------------------- |
| 1 | **すべての本番 ALB に Cloud Armor を設定** |
| 2 | **OWASP Top 10 対策ルールを有効化**（WAF ルールセット） |
| 3 | **レート制限で DDoS によるコスト暴走を防止** |
| 4 | **Adaptive Protection を有効化**して ML ベースの自動保護 |
| 5 | **プリコンフィグ済みルールはまず `preview` モードで確認** |

> 🔗 **参考**: https://cloud.google.com/armor/docs/overview

---

## Chapter 16: Security Command Center (SCC)

### 16.1 Security Command Center とは？

```
【SCC の目的と位置づけ】

Security Command Center = Google Cloud のセキュリティ管理センター

機能:
  ├── 脆弱性の自動検出（VM の設定ミス、公開バケットなど）
  ├── 脅威の検出（不審な操作、マルウェアなど）
  ├── コンプライアンス状況の可視化（CIS Benchmark など）
  └── セキュリティスコアの提供

【SCC のサービス階層】

Standard（無料）:
  ├── Security Health Analytics（設定ミスの検出）
  ├── Web Security Scanner（基本）
  └── Cloud Asset Inventory との統合

Premium（有料）:
  ├── Event Threat Detection（リアルタイム脅威検出）
  ├── Container Threat Detection（GKE の脅威）
  ├── Virtual Machine Threat Detection（VM のマルウェア）
  └── Web Security Scanner（高度）
```

---

### 16.2 Security Health Analytics（設定ミスの検出）

SCC は以下のような設定ミスを自動的に検出してアラートを出します。

| 検出カテゴリ | 具体的な検出内容 |
| ------------ | ---------------- |
| **IAM の問題** | プロジェクトオーナーが複数いる、allUsers への権限付与 |
| **ネットワーク設定** | 0.0.0.0/0 からの SSH/RDP 許可、パブリックアクセス |
| **Cloud Storage** | パブリックバケット、暗号化なし |
| **Compute Engine** | シールドド VM 無効、OS Login 無効、外部 IP |
| **GKE** | 認証の弱い設定、特権コンテナ、古いバージョン |
| **ログ関連** | 監査ログ無効、ログ取り込み設定なし |
| **SQL** | 公開 IP、SSL 無効、バックアップなし |

---

### 16.3 SCC の所見（Findings）の確認

```bash
# SCC の所見一覧を確認
gcloud scc findings list ORGANIZATION_ID \
  --source=ALL \
  --filter="state=ACTIVE AND severity=HIGH" \
  --format="table(name,category,severity,state)"

# 特定のプロジェクトの所見
gcloud scc findings list ORGANIZATION_ID \
  --source=ALL \
  --filter="resourceName:projects/my-project AND state=ACTIVE"

# 所見を解消済みとしてマーク
gcloud scc findings update FINDING_NAME \
  --source=SOURCE_ID \
  --organization=ORG_ID \
  --state=INACTIVE
```

---

### 16.4 Binary Authorization（コンテナの完全性保証）

#### Binary Authorization とは？

```
【Binary Authorization の目的】

問題:
  「誰でもどんなコンテナイメージでも GKE にデプロイできる」
  → サプライチェーン攻撃に弱い
  → テストしていないイメージが本番に入るリスク

解決策: Binary Authorization

CI/CD パイプライン:
  コードビルド → テスト合格 → 承認済み署名をイメージに付与

GKE デプロイ時:
  Binary Authorization がポリシーを確認
    ├── 有効な署名あり → デプロイ許可 ✅
    └── 署名なし / 無効な署名 → デプロイ拒否 ❌ + アラート

【防げる攻撃】
  ├── 承認されていないイメージの誤デプロイ
  ├── サプライチェーン攻撃（npm パッケージへの悪意のあるコード）
  └── 開発者による手動デプロイ（CI/CD をバイパス）
```

#### Binary Authorization の設定

```bash
# Binary Authorization を GKE クラスタで有効化
gcloud container clusters update my-cluster \
  --binauthz-evaluation-mode=PROJECT_SINGLETON_POLICY_ENFORCE \
  --region=asia-northeast1

# 証明者（Attestor）の作成
# 証明者 = 「このイメージを承認できる人/サービス」の定義
gcloud container binauthz attestors create my-attestor \
  --attestation-authority-note=projects/PROJECT/notes/my-note \
  --attestation-authority-note-project=PROJECT

# ポリシーの設定（すべてのイメージに署名を要求）
cat > policy.yaml <<EOF
defaultAdmissionRule:
  evaluationMode: REQUIRE_ATTESTATION
  enforcementMode: ENFORCED_BLOCK_AND_AUDIT_LOG
  requireAttestationsBy:
    - projects/PROJECT/attestors/my-attestor
globalPolicyEvaluationMode: ENABLE
EOF

gcloud container binauthz policy import policy.yaml
```

---

### 16.5 ファイアウォールルールのセキュリティ設計

#### ファイアウォール設計の原則

```
【デフォルト拒否（Default Deny）の原則】

ネットワークのデフォルト状態:
  すべてのトラフィックを拒否
    ↓ 明示的に許可したもののみ通過

GCP のデフォルトファイアウォール:
  ├── INGRESS: すべて拒否（デフォルト）
  └── EGRESS: すべて許可（デフォルト）
      ↑ 本番環境では Egress も制限することを検討
```

#### 安全なファイアウォール設計パターン

```bash
# ===== 推奨パターン: タグベースのルール =====

# Web サーバーへの HTTP/HTTPS のみ許可
gcloud compute firewall-rules create allow-http-https-to-web \
  --network=prod-vpc \
  --direction=INGRESS \
  --priority=1000 \
  --action=ALLOW \
  --rules=tcp:80,tcp:443 \
  --target-tags=web-server \        # web-server タグを持つ VM のみ
  --source-ranges=0.0.0.0/0 \
  --description="Allow HTTP/HTTPS traffic to web servers"

# App サーバーへはロードバランサからのみ許可
gcloud compute firewall-rules create allow-app-from-lb \
  --network=prod-vpc \
  --direction=INGRESS \
  --priority=1000 \
  --action=ALLOW \
  --rules=tcp:8080 \
  --target-tags=app-server \
  --source-tags=web-server          # web-server タグからのみ

# DB サーバーへはアプリサーバーからのみ許可
gcloud compute firewall-rules create allow-db-from-app \
  --network=prod-vpc \
  --direction=INGRESS \
  --priority=1000 \
  --action=ALLOW \
  --rules=tcp:5432 \
  --target-tags=db-server \
  --source-tags=app-server          # app-server タグからのみ

# SSH は IAP からのみ許可（外部からの直接 SSH を完全ブロック）
gcloud compute firewall-rules create allow-ssh-iap \
  --network=prod-vpc \
  --direction=INGRESS \
  --priority=1000 \
  --action=ALLOW \
  --rules=tcp:22 \
  --target-tags=ssh-allowed \
  --source-ranges=35.235.240.0/20   # IAP の IP レンジ
```

#### ❌ やってはいけないファイアウォール設定

```bash
# ❌ 危険: SSH を全世界に公開
gcloud compute firewall-rules create bad-ssh-rule \
  --action=ALLOW \
  --rules=tcp:22 \
  --source-ranges=0.0.0.0/0   # すべての IP から SSH 接続可能！

# ❌ 危険: タグなし（全 VM に適用）
gcloud compute firewall-rules create bad-rule \
  --action=ALLOW \
  --rules=tcp:3389 \           # RDP を全 VM に公開
  --source-ranges=0.0.0.0/0

# ✅ 修正: IAP からの SSH のみ許可、特定タグの VM のみ
gcloud compute firewall-rules create good-ssh-rule \
  --action=ALLOW \
  --rules=tcp:22 \
  --source-ranges=35.235.240.0/20 \  # IAP の IP レンジ
  --target-tags=bastion-only          # 限定された VM のみ
```

---

### 16.6 OS Login と多層防御（再確認）

Domain 4 として改めて OS Login の重要性を整理します。

```
【OS Login の多層防御効果】

層1: IAM（誰が SSH できるか）
  roles/compute.osLogin        → SSH 接続（sudo なし）
  roles/compute.osAdminLogin   → SSH 接続（sudo あり）
  → IAM で制御されるため、退職者は即時アクセス不可

層2: OS Login 自体の設定
  enable-oslogin=TRUE          → OS Login 有効化
  enable-oslogin-2fa=TRUE      → 2 要素認証必須

層3: ファイアウォールルール
  SSH は IAP からのみ許可（35.235.240.0/20）
  → 外部 IP からの直接アクセスを完全ブロック

層4: 組織ポリシー（強制適用）
  constraints/compute.requireOsLogin
  → 全 VM で OS Login を強制（設定し忘れ防止）

→ この 4 層すべてを通過しないと VM にアクセスできない！
```

---

## Chapter 17: Domain 4 試験対策まとめ

### 17.1 試験頻出パターン

#### パターン①: IAM ロールの選択問題

```
【問題文の例】
「フロントエンドエンジニアは Cloud Run へのデプロイと
 Artifact Registry からのイメージプルができる必要がある。
 最小権限のロールはどれか？」

考え方:
  Step 1: 必要な操作を特定
    ├── Cloud Run のデプロイ → roles/run.developer
    └── Artifact Registry の読み取り → roles/artifactregistry.reader

  Step 2: 基本ロールは選ばない
    ❌ roles/editor（過剰権限）
    ✅ roles/run.developer + roles/artifactregistry.reader

【よくある誤答パターン】
  ❌ roles/owner（問題外の過剰権限）
  ❌ roles/editor（多くの不要な権限が含まれる）
  ✅ 事前定義ロールの組み合わせ または カスタムロール
```

#### パターン②: SA キーの代替手法の問題

```
【問題文の例】
「GitHub Actions から GCP のリソースを操作したい。
 最もセキュアな方法はどれか？」

正解: Workload Identity Federation
  → GitHub OIDC トークンを GCP トークンに交換
  → SA キーを GitHub に保存しない

よくある誤答:
  ❌ SA キーを GitHub Secrets に保存
     → キーが保存されるため漏洩リスクがある
     → 定期ローテーションが必要
  ✅ Workload Identity Federation
     → キー不要・自動失効
```

#### パターン③: シークレット管理の問題

```
【問題文の例】
「Cloud Run アプリがデータベースのパスワードを必要とする。
 最もセキュアな管理方法はどれか？」

正解:
  Secret Manager にパスワードを保存
  Cloud Run の --set-secrets フラグで環境変数として注入
  SA に roles/secretmanager.secretAccessor を付与

よくある誤答:
  ❌ 環境変数に平文で設定（gcloud run deploy --set-env-vars=DB_PASS=xxx）
     → 設定値が露出するリスク
  ❌ コード内にハードコード
     → Git 履歴に残る
  ✅ Secret Manager を使用
```

#### パターン④: ネットワークセキュリティの問題

```
【問題文の例】
「本番環境の VM への SSH アクセスをセキュアにしたい。
 外部 IP を持たない VM にも接続できるようにしたい。」

正解: IAP トンネル + OS Login

設定:
  1. VM の外部 IP を削除
  2. OS Login を有効化（enable-oslogin=TRUE）
  3. SSH ファイアウォールルールを IAP IP（35.235.240.0/20）のみに変更
  4. gcloud compute ssh --tunnel-through-iap で接続

よくある誤答:
  ❌ Bastion Host を経由する（管理コストが増える）
  ❌ SSH を 0.0.0.0/0 に公開（セキュリティリスク）
  ✅ IAP トンネル（VPN 不要・外部 IP 不要・IAM で制御）
```

---

### 17.2 セキュリティサービスの役割マップ

```
【攻撃経路別のセキュリティサービス】

① 認証・アクセス制御
   IAM: 誰が何をできるか
   OS Login: VM への SSH アクセス
   IAP: VPN 不要のゼロトラストアクセス
   Binary Authorization: 承認済みコンテナのみデプロイ

② シークレット・データ保護
   Secret Manager: パスワード・APIキーの安全な管理
   Cloud KMS: 暗号化キーの管理・CMEK

③ ネットワーク防御
   Cloud Armor: DDoS・WAF（外部からの攻撃）
   VPC Firewall: ネットワーク層のアクセス制御
   VPC Service Controls: データ持ち出し防止

④ 可視化・検出
   Security Command Center: 設定ミス・脅威の検出
   Cloud Audit Logs: 誰が何をしたかの記録
   Cloud Asset Inventory: リソース・IAM の全体把握
```

---

### 17.3 Domain 4 重要用語チェックリスト

#### IAM 基礎

- [ ] **基本ロール（Editor/Owner）は本番環境で使用しない**理由を説明できる
- [ ] 事前定義ロール・カスタムロールの使い分けを説明できる
- [ ] **グループにロールを付与する**利点を説明できる
- [ ] **IAM Conditions** で時間制限・リソース制限付き権限を付与できる
- [ ] **Policy Recommender** で不要な権限を検出・削除できることを知っている
- [ ] `allUsers` と `allAuthenticatedUsers` は公開設定であることを知っている

#### サービスアカウント

- [ ] SA キーの **漏洩リスクとアンチパターン** を説明できる
- [ ] **Workload Identity Federation** の仕組みを説明できる（キー不要）
- [ ] **ADC**（`gcloud auth application-default login`）の目的を説明できる
- [ ] **SA Impersonation** の利点（短期トークン・監査ログ）を説明できる
- [ ] **PAM** が承認ワークフロー付きの特権アクセスを提供することを知っている
- [ ] `roles/iam.serviceAccountTokenCreator` が権限借用に必要だと知っている
- [ ] `roles/iam.serviceAccountUser` が SA を VM にアタッチするのに必要だと知っている

#### セキュリティサービス

- [ ] **Secret Manager** でシークレットを安全に管理する方法を知っている
- [ ] **Cloud KMS** と CMEK の違いを説明できる
- [ ] **VPC Service Controls** がデータ持ち出しを防ぐことを知っている
- [ ] **IAP** が VPN なしでゼロトラストアクセスを実現することを知っている
- [ ] **Cloud Armor** が DDoS/WAF として ALB を保護することを知っている
- [ ] **SCC** が設定ミスと脅威を自動検出することを知っている
- [ ] **Binary Authorization** が未承認コンテナのデプロイをブロックすることを知っている

#### OS Login とネットワークセキュリティ

- [ ] **OS Login** が IAM ベースの SSH 管理を提供することを知っている
- [ ] **OS Login 2FA** の設定方法を知っている
- [ ] **IAP SSH トンネル** で外部 IP なし VM に接続できることを知っている
- [ ] **IAP の IP レンジ**（35.235.240.0/20）を SSH ファイアウォールルールで許可する設定を知っている

---

### 17.4 Domain 4 全体のベストプラクティス一覧

| カテゴリ | ベストプラクティス |
| --------- | ----------------- |
| **IAM 一般** | 最小権限の原則を徹底（事前定義ロール優先） |
| **IAM 一般** | グループにロールを付与（個人への直接付与は避ける） |
| **IAM 一般** | 定期的な権限レビュー（Policy Recommender 活用） |
| **SA 管理** | SA JSON キーの生成を組織ポリシーで禁止 |
| **SA 管理** | CI/CD は Workload Identity Federation を使用 |
| **SA 管理** | ローカル開発は ADC（`gcloud auth application-default login`） |
| **SA 管理** | 特権操作は SA Impersonation または PAM |
| **シークレット** | Secret Manager でシークレットを一元管理 |
| **シークレット** | コード・設定ファイルへのハードコードを根絶 |
| **暗号化** | 規制データには CMEK（Cloud KMS）を適用 |
| **ネットワーク** | VM の外部 IP を削除し IAP 経由でアクセス |
| **ネットワーク** | OS Login + 2FA を組織ポリシーで強制 |
| **ネットワーク** | すべての本番 ALB に Cloud Armor を設定 |
| **コンテナ** | Binary Authorization で承認済みイメージのみデプロイ |
| **可視化** | SCC で設定ミスを定期確認・修正 |
| **可視化** | データアクセス監査ログを有効化（機密データ） |

---

### 17.5 推奨学習リソース（Domain 4）

| リソース | URL |
| ---------- | ----- |
| **ACE 試験公式ページ** | https://cloud.google.com/learn/certification/cloud-engineer?hl=en |
| **IAM ベストプラクティス** | https://cloud.google.com/blog/products/identity-security/iam-best-practice-guides-available-now |
| **IAM ロール階層の解説** | https://cloudoptimo.com/blog/google-cloud-iam-role-hierarchies-explained/ |
| **IAM リソース階層とアクセス制御** | https://docs.cloud.google.com/iam/docs/resource-hierarchy-access-control |
| **GKE Autopilot セキュリティ** | https://docs.cloud.google.com/kubernetes-engine/docs/concepts/autopilot-security |
| **OS Login の設定** | https://docs.cloud.google.com/compute/docs/oslogin/set-up-oslogin |
| **SSH ベストプラクティス** | https://docs.cloud.google.com/compute/docs/connect/ssh-best-practices/login-access |
| **Artifact Registry IAM** | https://docs.cloud.google.com/artifact-registry/docs/access-control |
| **Secret Manager ドキュメント** | https://cloud.google.com/secret-manager/docs/overview |
| **Cloud KMS ドキュメント** | https://cloud.google.com/kms/docs/overview |
| **VPC Service Controls** | https://cloud.google.com/vpc-service-controls/docs/overview |
| **IAP ドキュメント** | https://cloud.google.com/iap/docs/concepts-overview |
| **Cloud Armor ドキュメント** | https://cloud.google.com/armor/docs/overview |
| **SCC ドキュメント** | https://cloud.google.com/security-command-center/docs/overview |
| **Workload Identity Federation** | https://cloud.google.com/iam/docs/workload-identity-federation |
| **Binary Authorization** | https://cloud.google.com/binary-authorization/docs/overview |
| **PAM（Privileged Access Manager）** | https://cloud.google.com/iam/docs/pam-overview |

---

> 📝 **Domain 4 学習の最終アドバイス**
>
> Domain 4 はセキュリティ専門のドメインですが、配点は約 20% です。
> 他のドメインとの関連が深く、Domain 2（デプロイ）や Domain 3（運用）の中でも
> セキュリティの視点が問われます。
>
> **必ず押さえるべき 5 つの核心**:
>
> **① SA JSON キーは使わない → Workload Identity / ADC / Impersonation**  
> **② 基本ロール（Editor/Owner）は本番禁止 → 事前定義ロールを使う**  
> **③ Secret Manager でシークレットを管理（ハードコード・平文禁止）**  
> **④ IAP + OS Login で VM への SSH を多層防御（外部 IP 不要）**  
> **⑤ Cloud Armor ですべての本番 ALB を DDoS/WAF から保護**
>
> これら 5 点を「なぜそうするのか？」という理由とセットで説明できるようになれば、
> Domain 4 の問題の大半に正解できます。
>
> セキュリティは「アンチパターン（やってはいけないこと）」を
> 覚えることが理解の近道です。試験合格を応援しています！ 🚀
