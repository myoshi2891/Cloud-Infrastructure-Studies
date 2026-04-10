# Section 5: Google Cloud における信頼とセキュリティ

## (Trust and Security with Google Cloud)

## 完全攻略ガイド（初学者向け・ステップバイステップ解説）

> **対象読者**: クラウド初学者・セキュリティ担当者・ビジネスリーダー
> **試験配点**: Section 5 は全体の約 **17%** を占める重要セクション
> **学習目標**: Google Cloud のセキュリティ設計・IAM・コンプライアンス・暗号化・データ保護を理解する

---

## 📋 目次

1. [Section 5 の出題範囲と学習ポイント](#1-section-5-の出題範囲と学習ポイント)
2. [クラウドセキュリティの基礎概念](#2-クラウドセキュリティの基礎概念)
3. [Google Cloud のセキュリティ設計思想](#3-google-cloud-のセキュリティ設計思想)
4. [IAM（Identity and Access Management）](#4-iamidentity-and-access-management)
5. [データの保護と暗号化](#5-データの保護と暗号化)
6. [ネットワークセキュリティ](#6-ネットワークセキュリティ)
7. [脅威検出とセキュリティ監視](#7-脅威検出とセキュリティ監視)
8. [コンプライアンスと規制対応](#8-コンプライアンスと規制対応)
9. [データプライバシーと個人情報保護](#9-データプライバシーと個人情報保護)
10. [セキュリティのベストプラクティス実践](#10-セキュリティのベストプラクティス実践)
11. [Google Workspace のセキュリティ](#11-google-workspace-のセキュリティ)
12. [Section 5 総まとめ・頻出問題パターン](#12-section-5-総まとめ頻出問題パターン)
13. [公式参照リソース一覧](#13-公式参照リソース一覧)

---

## 1. Section 5 の出題範囲と学習ポイント

### 1.1 試験における Section 5 の位置づけ

Google Cloud Digital Leader（CDL）試験の Section 5 は
「**Google Cloud における信頼とセキュリティ**」がテーマです。

```text
Section 5 で問われる主なこと:
┌─────────────────────────────────────────────────────────────────────┐
│ ① クラウドにおける責任共有モデル（お互いの責任範囲）                   │
│ ② Google Cloud のセキュリティ設計（ゼロトラスト・多層防御）           │
│ ③ IAM の仕組み（誰が・何に・何ができるか）と最小権限の原則             │
│ ④ 暗号化の種類（転送中・保存中・使用中）と鍵管理（KMS・CMEK）         │
│ ⑤ ネットワークセキュリティ（VPC SC・Cloud Armor・IAP）               │
│ ⑥ セキュリティ監視ツール（Security Command Center・Cloud Logging）   │
│ ⑦ コンプライアンス（GDPR・HIPAA・PCI DSS 等）と Google の認証        │
│ ⑧ データプライバシー保護（匿名化・仮名化・DLP）                       │
└─────────────────────────────────────────────────────────────────────┘
```

### 1.2 Section 5 のサブトピック一覧

| #   | サブトピック                                    | 重要度 |
| --- | ----------------------------------------------- | ------ |
| 1   | 責任共有モデル（Shared Responsibility Model）   | ★★★    |
| 2   | Google のゼロトラストセキュリティ（BeyondCorp） | ★★★    |
| 3   | IAM の構成要素とロールの種類                    | ★★★    |
| 4   | 暗号化（転送中・保存中・CMEK）と Cloud KMS      | ★★★    |
| 5   | VPC Service Controls・Cloud Armor               | ★★★    |
| 6   | Cloud Identity-Aware Proxy（IAP）               | ★★★    |
| 7   | Security Command Center                         | ★★★    |
| 8   | Sensitive Data Protection（旧 Cloud DLP）       | ★★★    |
| 9   | コンプライアンス規制と Google の認証            | ★★★    |
| 10  | 監査ログ（Audit Logs）の種類                    | ★★★    |

---

## 2. クラウドセキュリティの基礎概念

### 2.1 なぜクラウドセキュリティが重要か

```text
クラウド移行後のセキュリティリスク:

① データ漏洩（Data Breach）:

   - クラウドに保存した機密データへの不正アクセス
   - 設定ミス（公開バケット等）による意図しない公開
   - 例: 設定ミスで S3 バケットが全公開 → 数百万件の個人情報漏洩

② 権限の過剰付与（Excessive Permissions）:

   - 「とりあえず管理者権限」を与えてしまう
   - 退職者のアカウントが削除されずに残る
   - → 内部不正・外部攻撃の入口になる

③ 設定ミス（Misconfiguration）:

   - クラウドの誤設定は人的ミスで最も多い侵害原因
   - ファイアウォールの設定漏れ・バケットの公開設定
   - → Security Command Center が自動検出

④ 認証情報の窃取（Credential Theft）:

   - API キー・パスワードがコードに含まれてしまう
   - フィッシング攻撃でアカウント情報が盗まれる
   - → Secret Manager・MFA・ゼロトラストで対策

⑤ ランサムウェア・マルウェア:

   - クラウド環境への侵入後にデータを暗号化
   - → バックアップ・最小権限・監視で対策

```

### 2.2 責任共有モデル（Shared Responsibility Model）

**責任共有モデル**は、クラウドのセキュリティ責任を
**Google とユーザーがどう分担するか**を定義した概念です。

```text
責任共有モデルの図解:

                   SaaS         PaaS         IaaS
                ────────────────────────────────────

データ         │  [ユーザー]  │  [ユーザー]  │  [ユーザー]  │
                │             │             │             │
ユーザー管理   │  [ユーザー]  │  [ユーザー]  │  [ユーザー]  │
                │             │             │             │
アプリ          │  [Google]   │  [ユーザー]  │  [ユーザー]  │
                │             │             │             │
OS              │  [Google]   │  [Google]   │  [ユーザー]  │
                │             │             │             │
仮想化          │  [Google]   │  [Google]   │  [Google]   │
                │             │             │             │
ネットワーク    │  [Google]   │  [Google]   │  [Google]   │
                │             │             │             │
ハードウェア    │  [Google]   │  [Google]   │  [Google]   │
                │             │             │             │
データセンター  │  [Google]   │  [Google]   │  [Google]   │

Google の責任: 物理インフラ・ハードウェア・ネットワーク
              データセンターの物理セキュリティ

ユーザーの責任: データ・ユーザー管理・アクセス設定
              アプリケーションのセキュリティ
```

#### 重要なポイント

```text
試験頻出の考え方:

「Google Cloud はセキュアだから何もしなくていい」→ 誤り！

Google が守るもの:
  ✅ データセンターへの物理的な侵入
  ✅ ハードウェアの故障・改ざん
  ✅ ネットワークインフラへの攻撃
  ✅ ハイパーバイザーの脆弱性
  ✅ Google Cloud サービス自体の可用性

ユーザーが守るもの:
  ✅ 誰がデータにアクセスできるか（IAM 設定）
  ✅ データの分類と適切な保護
  ✅ アプリケーションのセキュリティ
  ✅ OS・ミドルウェアのパッチ適用（IaaS の場合）
  ✅ エンドユーザーの認証・認可設定
  ✅ データのバックアップと復元
```

### 2.3 多層防御（Defense in Depth）

```text
多層防御とは:
  単一のセキュリティ対策に頼らず、複数の防御層を重ね合わせる考え方
  1 つの層が突破されても、次の層が防御する

Google Cloud のセキュリティ層:

Layer 8: データ
  暗号化（保存中・転送中・使用中）
  DLP・鍵管理（KMS）・アクセス制御

Layer 7: アイデンティティ
  IAM・MFA・Cloud Identity・BeyondCorp
  サービスアカウント管理

Layer 6: アプリケーション
  脆弱性スキャン・Web Security Scanner
  Binary Authorization（信頼できるコンテナのみ実行）

Layer 5: エンドポイント
  Chrome Enterprise・BeyondCorp
  デバイス管理・Endpoint Verification

Layer 4: ネットワーク
  VPC・ファイアウォール・Cloud Armor（WAF/DDoS）
  VPC Service Controls・Cloud NAT・Private Google Access

Layer 3: インフラ
  Shielded VM・Confidential VM
  OS ログイン・VM Manager（パッチ管理）

Layer 2: ストレージ
  保存データの暗号化（デフォルト AES-256）
  CMEK・Cloud HSM

Layer 1: ハードウェア / データセンター
  Titan チップ（改ざん防止）
  物理セキュリティ（24/7 監視）
  Google の独自設計チップ・ラック

→ どこかの層が突破されても、他の層が守る
```

> 📎 **参照**:
> https://cloud.google.com/security/overview
> https://cloud.google.com/security/infrastructure/design

---

## 3. Google Cloud のセキュリティ設計思想

### 3.1 Google のセキュリティの特徴

```text
Google がセキュリティで優れている理由:

① Google 自身が世界最大の攻撃標的:
   → 毎日数十億件のサイバー攻撃を受けている
   → その経験で培ったセキュリティ技術を顧客に提供

② 独自設計のセキュリティチップ「Titan」:
   → すべてのサーバーに Titan チップを搭載
   → BIOS・ブートローダー・OS カーネルの完全性を検証
   → ハードウェアレベルの改ざんを防止

③ Shielded VM（シールドされた VM）:
   → Titan チップを活用したセキュアブート
   → UEFI・仮想 TPM・整合性監視
   → ルートキット・ブートキット攻撃を防止

④ Confidential Computing（機密コンピューティング）:
   → 処理中（メモリ上）のデータも暗号化
   → 従来: 保存中・転送中は暗号化できたが処理中は平文
   → Confidential VM でメモリ上のデータも保護

⑤ 世界最大のセキュリティチーム:
   → Project Zero（脆弱性研究チーム）
   → Mandiant（サイバーセキュリティ企業を買収）
   → 24/7 の脅威インテリジェンス収集・分析
```

### 3.2 ゼロトラストセキュリティ（Zero Trust）

```text
ゼロトラストとは:
  「何も信頼しない（Never Trust, Always Verify）」という
  セキュリティアーキテクチャの考え方

従来のセキュリティ（境界型セキュリティ / Castle-and-Moat）:
  ┌─────────────────────────────────────┐
  │           社内ネットワーク（「城」）     │
  │  信頼できる人だけが入れる              │
  │  中に入れば何でも自由にできる          │
  └──────────┬──────────────────────────┘
              │ ファイアウォール（「お堀」）
              │
  外部（信頼しない）

  問題点:
  ❌ 一度内部に侵入されると自由に動き回れる（横方向の移動）
  ❌ テレワーク・クラウド時代には「社内」という概念が崩壊
  ❌ 内部犯行・認証情報の窃取に無防備

ゼロトラスト（BeyondCorp モデル）:

  - 「社内ネットワークにいるから安全」という前提を捨てる
  - アクセスのたびに「誰が・どのデバイスで・どこから」を検証
  - ネットワークの場所に関係なく、すべてのアクセスを認証・認可

BeyondCorp の 4 つの原則:
  ① デバイスの信頼性を確認: 管理されたデバイスのみアクセス許可
  ② ユーザーの本人確認: 多要素認証（MFA）で本人確認
  ③ アクセスポリシーの適用: リソースごとに最小限のアクセス権
  ④ すべてのアクセスをログ記録: 監査証跡の確保

Google Cloud での BeyondCorp 実装:
  → Cloud Identity-Aware Proxy（IAP）
  → BeyondCorp Enterprise
  → Context-Aware Access（コンテキストアウェアアクセス）
```

### 3.3 Google Cloud インフラのセキュリティレイヤー

```text
ハードウェアインフラセキュリティ:

  Titan チップ（ハードウェア信頼の基点）:

    - 全サーバーのマザーボードに搭載
    - 起動シーケンスの整合性を検証（改ざん防止）
    - 暗号化キーの安全な保管

  物理データセンターセキュリティ:

    - 場所は公開されていない
    - 生体認証・24/7 の警備員
    - 複数の物理バリア
    - 廃棄ドライブの物理的な破壊

ソフトウェアインフラセキュリティ:

  Google の内部 RPC（Remote Procedure Call）:

    - Google サービス間の通信はすべて暗号化
    - 一般のインターネットを経由しない専用ネットワーク

  Application Layer Transport Security（ALTS）:

    - 内部サービス間の相互 TLS 認証と暗号化
    - TLS と類似した仕組みを Google 内部向けに最適化

```

> 📎 **参照**:
> https://cloud.google.com/security/infrastructure/design
> https://cloud.google.com/docs/security/infrastructure/design
> https://cloud.google.com/beyondcorp

---

## 4. IAM（Identity and Access Management）

### 4.1 IAM の基本概念

**IAM（Identity and Access Management）**は、
「**誰が（Who）・何に（Resource）・何ができるか（Permission）**」を
制御する Google Cloud の権限管理システムです。

```text
IAM の 3 つの構成要素:

  Principal（プリンシパル / 誰が）
       ↓
  Role（ロール / 何ができるか）
       ↓
  Resource（リソース / 何に対して）

例:
  「田中太郎さん」が「BigQuery データ閲覧者ロール」を
  「プロジェクト A の全 BigQuery テーブル」に持つ

  → 田中さんはプロジェクト A の BigQuery データを読めるが
    書き込み・削除はできない
```

### 4.2 Principal（プリンシパル）の種類

```text
プリンシパル（IAM でアクセス権を付与できる対象）:

① Google アカウント（Individual User）:

   - 個人の Google アカウント（example@gmail.com 等）
   - 特定の人間ユーザー
   - 例: developer@example.com

② Google グループ（Google Group）:

   - 複数のユーザーをまとめたグループ
   - グループにロールを付与 → グループ内の全員に適用
   - 例: developers@example.com グループ

   ✅ 推奨: 個人ではなくグループにロールを付与（管理効率化）

③ サービスアカウント（Service Account）:

   - 人間ではなく「アプリケーション・VM・サービス」のためのアカウント
   - プログラムが GCP リソースにアクセスする際に使用
   - 例: my-app-service-account@my-project.iam.gserviceaccount.com

   重要: サービスアカウントキー（JSON ファイル）の管理に注意
   ✅ 可能な限りキーファイルを使わず Workload Identity を使用

④ Cloud Identity ドメイン:

   - 組織全体のドメイン（example.com 等）
   - Google Workspace と統合

⑤ allUsers（全ユーザー）:
   ❌ 認証なしでアクセス可能（パブリックアクセス）
   → 公開 Web サイト・静的コンテンツ以外では使用禁止

⑥ allAuthenticatedUsers（認証済み全ユーザー）:
   ❌ Google アカウントを持つ全員がアクセス可能
   → 基本的に使用しない（意図しない公開になる）
```

### 4.3 ロール（Role）の種類

```text
IAM ロールの 3 つの種類:

┌──────────────────────────────────────────────────────────────────┐
│  種類          │ 説明                        │ 推奨度         │
├──────────────────────────────────────────────────────────────────┤
│  基本ロール    │ Owner・Editor・Viewer         │               │
│  (Basic Roles) │ プロジェクト全体に適用        │ ❌ 本番非推奨  │
│                │ 非常に広い権限               │               │
├──────────────────────────────────────────────────────────────────┤
│  事前定義ロール │ roles/bigquery.dataViewer    │               │
│  (Predefined)  │ 特定サービスに最適化          │ ✅ 推奨       │
│                │ Google が定義・管理           │               │
├──────────────────────────────────────────────────────────────────┤
│  カスタムロール │ 必要な権限だけを組み合わせ    │               │
│  (Custom)      │ ユーザーが独自に定義          │ ✅ 最小権限   │
│                │ 最小権限の原則を厳密に実現    │ ✅ の徹底に   │
└──────────────────────────────────────────────────────────────────┘
```

#### 基本ロールの危険性

```text
基本ロールを使ってはいけない理由:

Owner（オーナー）:
  → プロジェクト内の全リソースへの全権限
  → 請求・IAM・削除も可能
  ❌ 誤って全データを削除できる
  ❌ 悪意ある操作・内部犯行のリスク

Editor（編集者）:
  → ほぼ全てのリソースを作成・更新・削除できる
  ❌ 不要なリソースを作成されてコスト増
  ❌ 機密データの変更・削除リスク

Viewer（閲覧者）:
  → 全リソースの読み取りが可能
  ❌ 機密データも全て閲覧できてしまう

正しいアプローチ:
  ✅ 事前定義ロールで必要なサービスの必要な操作のみ付与
  ✅ カスタムロールで最小限の権限を自分で定義
  ✅ 「まず基本ロールを付けてから絞る」ではなく
    「最初から最小権限で設計する」
```

### 4.4 IAM ポリシーの継承

```text
リソース階層とポリシーの継承:

組織（Organization）
  │  ← ここでポリシーを設定すると
  ↓     ↓ ↓ ↓ すべての子リソースに継承される
フォルダ（Folder）
  │  ← フォルダのポリシーも継承
  ↓
プロジェクト（Project）
  │  ← プロジェクトのポリシーも継承
  ↓
リソース（VM・BigQuery・Storage 等）

重要なルール:

  1. ポリシーは上位から下位へ継承（上書き不可）
  2. ポリシーは「加算」される（権限の剥奪は IAM Deny で）
  3. 上位で付与した権限は下位で取り消せない

     （取り消したい場合は Deny Policy を使用）

実例:
  組織レベルで roles/viewer を付与
    → フォルダ・プロジェクト・リソース全てで閲覧権限を持つ
    → プロジェクトレベルで取り消そうとしても継承のため残る
    → ⚠️ 組織レベルの権限付与は慎重に！
```

### 4.5 最小権限の原則（Principle of Least Privilege）

```text
最小権限の原則とは:
  「タスクを実行するために必要な最小限の権限のみを付与する」
  セキュリティの基本原則

なぜ最小権限が重要か:
  侵害範囲の最小化:
    アカウントが乗っ取られても、そのアカウントの権限内でしか被害が出ない

  内部犯行の防止:
    必要以上の権限がなければ、意図的な悪用も限定される

  誤操作の防止:
    不必要な削除・変更権限がなければ、操作ミスによる被害を防ぐ

実践的な適用例:

  ❌ 悪い例:
    開発者全員に roles/editor を付与
    「困ったら管理者権限」で解決

  ✅ 良い例:
    フロントエンド開発者:
      roles/compute.instanceAdmin（VM の管理）
      roles/storage.objectCreator（GCS への書き込み）

    データアナリスト:
      roles/bigquery.dataViewer（BigQuery の読み取りのみ）
      roles/bigquery.jobUser（クエリの実行）

    CI/CD パイプライン（サービスアカウント）:
      roles/container.developer（GKE へのデプロイ）
      roles/artifactregistry.writer（イメージの push）
```

### 4.6 サービスアカウントのセキュリティ

```text
サービスアカウントとは:
  人間ではなくアプリケーションや VM のためのアカウント
  アプリが GCP リソースにアクセスする際のアイデンティティ

サービスアカウントキー（JSON ファイル）の危険性:

  - キーファイルを作成すると有効期限なしの認証情報が生成される
  - コードリポジトリに誤ってコミットしてしまうリスク
  - 漏洩すると攻撃者が任意の時間・場所から GCP にアクセス可能

サービスアカウントキーを使わない代替手段:

  ① Application Default Credentials（ADC）:

     - VM・GKE ノード・Cloud Run はデフォルトで ADC を利用
     - アプリはキーファイルなしで自動認証される
     - 最も推奨される方法

  ② Workload Identity（GKE）:

     - GKE の Pod に Google Cloud のサービスアカウントを直接紐付け
     - キーファイル不要でコンテナが GCP リソースにアクセス

  ③ Workload Identity Federation（外部クラウド・オンプレ）:

     - AWS・Azure・GitHub Actions のアイデンティティと GCP を連携
     - 永続的なキーなしで短期トークンを取得

サービスアカウントのベストプラクティス:
  ✅ サービスアカウントキーの作成を組織ポリシーで禁止
     (constraints/iam.disableServiceAccountKeyCreation)
  ✅ 1 アプリ = 1 専用サービスアカウント（共用しない）
  ✅ キーが必要な場合: 90 日以内のローテーション・Secret Manager で保管
  ✅ 使われていないサービスアカウントを定期削除
```

### 4.7 Cloud Identity（統合 ID 管理）

```text
Cloud Identity とは:

  - Google のアイデンティティ管理サービス
  - ユーザーアカウント・グループを一元管理
  - Google Workspace と統合（または独立して使用）

主な機能:
  ① ユーザー管理:

     - 社員の Google アカウントを一元管理
     - オンボーディング・オフボーディングを簡素化

  ② SSO（シングルサインオン）:

     - SAML 2.0 対応の外部 IdP（Okta・Active Directory 等）と連携
     - 既存の社内認証基盤と Google Cloud を統合

  ③ MFA（多要素認証）:

     - パスワードだけでなく追加の認証要素を要求
     - FIDO2 セキュリティキー・TOTP・SMS 等

  ④ 条件付きアクセス（Context-Aware Access）:

     - 場所・デバイス・時間帯に応じてアクセスを制御
     - 「管理されたデバイスからのみ本番にアクセス可」等

Google Workspace との連携:

  - Google Workspace のユーザーは自動的に Cloud Identity を利用
  - Gmail・Calendar・Drive のアカウントと GCP が統合
  - 退職者の Google Workspace アカウント無効化 → GCP も即座にアクセス不可

```

#### ✅ ベストプラクティス: IAM

```yaml
権限管理:
  - 基本ロール（Owner/Editor/Viewer）は本番環境で使用しない
  - 個人ではなくグループにロールを付与する
  - 最小権限の原則: タスクに必要な最小限のロールのみ
  - 定期的な権限棚卸し（不要な権限を削除）
  - IAM Recommender で過剰権限を自動検出・削除

サービスアカウント:
  - サービスアカウントキーの作成を禁止（組織ポリシー）
  - Workload Identity を使用（GKE）
  - ADC を使用（Compute Engine・Cloud Run）

モニタリング:
  - Admin Activity 監査ログで権限変更を監視
  - 特権的な操作（IAM 変更・SA キー作成）にアラートを設定
  - Policy Analyzer で誰が何にアクセスできるか定期確認
```

> 📎 **参照**:
> https://cloud.google.com/iam/docs/overview
> https://cloud.google.com/iam/docs/best-practices
> https://cloud.google.com/iam/docs/service-account-overview

---

## 5. データの保護と暗号化

### 5.1 暗号化の 3 つの状態

```text
データは常に「3 つの状態」のどれかにある:

① 保存中（Data at Rest）:

   - ストレージ（ディスク・データベース）に保存された状態
   - 例: Cloud Storage のファイル・BigQuery のテーブル・Persistent Disk

② 転送中（Data in Transit）:

   - ネットワークを通じて移動している状態
   - 例: ブラウザから Cloud Storage へのアップロード

         サービス間の API 通信

③ 使用中（Data in Use）:

   - メモリ（RAM）上で処理されている状態
   - 例: CPU が計算している最中のデータ

Google Cloud の暗号化サポート:
  保存中: ✅ デフォルトで AES-256 暗号化（全サービス）
  転送中: ✅ TLS 1.2 以上で暗号化（全通信）
  使用中: ✅ Confidential VM・Confidential GKE Nodes で対応

ポイント:
  「Google Cloud は保存中・転送中のデータを自動的に暗号化する」
  → 追加設定なしでデフォルト暗号化が有効
```

### 5.2 保存中のデータ暗号化

```text
Google のデフォルト暗号化:

  - 全サービスのデータが AES-256 で自動暗号化
  - 追加費用・追加設定なし
  - 鍵は Google が管理（Google-Managed Encryption Keys）

暗号化の仕組み（エンベロープ暗号化）:
  ┌────────────────────────────────────────────────────────────┐
  │ データ暗号化鍵（DEK）でデータを暗号化                       │
  │ 鍵暗号化鍵（KEK）で DEK を暗号化                          │
  │ KEK は Cloud KMS で管理                                    │
  │                                                            │
  │ 暗号化済みデータ + 暗号化済み DEK = 安全に保管             │
  └────────────────────────────────────────────────────────────┘
```

### 5.3 Cloud Key Management Service（Cloud KMS）

```text
Cloud KMS とは:

  - 暗号化鍵を一元管理・作成・ローテーションするサービス
  - ソフトウェア KMS とハードウェア KMS（Cloud HSM）の 2 種類

暗号化鍵の管理方式（3 段階）:

  ① Google-Managed Keys（デフォルト）:

     - Google が鍵を自動的に作成・管理・ローテーション
     - 追加費用なし・設定不要
     - 一般的なワークロードに最適
     - ユーザーは鍵の制御不可

  ② Customer-Managed Encryption Keys（CMEK）:

     - ユーザーが Cloud KMS で鍵を作成・管理
     - Google Cloud サービスが CMEK を使ってデータを暗号化
     - 鍵のローテーション・無効化・削除はユーザーが制御
     - 「鍵を無効化 = データへのアクセス不可」
     - コンプライアンス要件のある企業に推奨

     ユースケース:
     ✅ 規制業界（金融・医療・政府）
     ✅ データ主権が必要な場合（EU データを EU 鍵で管理）
     ✅ Google も含めた全てのアクセスを制御したい場合

  ③ Customer-Supplied Encryption Keys（CSEK）:

     - ユーザーが Google Cloud 外で鍵を管理
     - リクエストのたびにユーザーが鍵を提供
     - 鍵は Google に保管されない（最高レベルの制御）
     - 最も複雑・管理コストが高い

選択基準:
  一般ワークロード → Google-Managed（デフォルト）
  コンプライアンス必須 → CMEK（Cloud KMS）
  鍵を Google に渡したくない → CSEK
```

### 5.4 Cloud HSM（Hardware Security Module）

```text
Cloud HSM とは:

  - FIPS 140-2 Level 3 認証を受けたハードウェアセキュリティモジュール
  - 物理的に改ざん困難なハードウェアで暗号化鍵を保護
  - Cloud KMS の一部として提供

HSM が必要な場合:
  ✅ 規制（PCI DSS・HIPAA 等）でハードウェア保護の鍵が必要
  ✅ 鍵のエクスポートを物理的に不可能にしたい
  ✅ 金融機関・政府機関・医療機関のセキュリティ要件

ソフトウェア KMS vs Cloud HSM:
  ソフトウェア KMS: コスト低・十分なセキュリティ（一般用途）
  Cloud HSM: コスト高・最高レベルのセキュリティ（規制対応）
```

### 5.5 Confidential Computing（機密コンピューティング）

```text
Confidential Computing とは:
  使用中（メモリ上）のデータを暗号化する技術

従来の問題:
  保存中: 暗号化 ✅
  転送中: 暗号化 ✅
  使用中: 平文 ❌ ← メモリ上のデータは暗号化されていなかった

Confidential Computing が解決:
  使用中: 暗号化 ✅ ← AMD SEV・Intel TDX で実現

Google Cloud での実装:

  Confidential VM:

    - AMD SEV（Secure Encrypted Virtualization）対応の VM
    - メモリが自動的に暗号化される
    - Google（ハイパーバイザー）もメモリを読めない

  Confidential GKE Nodes:

    - GKE のノードを Confidential VM で実行
    - コンテナの処理中データも保護

  Confidential Dataflow・Confidential Dataproc:

    - データ処理中も暗号化された状態

ユースケース:
  ✅ 規制要件で処理中データの保護が必要
  ✅ 機密性の高い計算（医療・金融・政府）
  ✅ マルチパーティ計算（複数企業がデータを持ち寄って計算）
```

> 📎 **参照**:
> https://cloud.google.com/security/encryption/default-encryption
> https://cloud.google.com/kms/docs
> https://cloud.google.com/confidential-computing/confidential-vm/docs

---

## 6. ネットワークセキュリティ

### 6.1 VPC ファイアウォールルール

```text
ファイアウォールルールとは:
  VPC に入出力するネットワークトラフィックを制御するルール
  L4（IP・ポート・プロトコル）レベルでの制御

ファイアウォールルールの構成要素:

  - 方向（Direction）: INGRESS（入力）または EGRESS（出力）
  - アクション（Action）: ALLOW または DENY
  - 優先度（Priority）: 0〜65535（低い数値が高優先度）
  - 対象（Target）: タグ・サービスアカウント・すべての VM
  - 送信元/送信先（Source/Destination）: IP 範囲・タグ
  - プロトコル/ポート: TCP/UDP/ICMP と ポート番号

デフォルトのファイアウォールルール:

  - default-allow-internal: 同じ VPC 内の通信を許可
  - default-allow-ssh: ポート 22（SSH）を許可
  - default-allow-rdp: ポート 3389（RDP）を許可
  - default-deny-all: その他は全て拒否（最低優先度）

  ⚠️ デフォルトルールを変更してセキュリティを強化:
     SSH・RDP は特定の IP からのみ許可
     または IAP（Identity-Aware Proxy）経由のみに限定

タグベースのファイアウォールの例:
  「web-server」タグの VM に HTTP/HTTPS（80/443）を許可
  「db-server」タグの VM への接続は「app-server」タグのみ許可
  → アプリサーバー以外からDBへの直接アクセスを防止
```

### 6.2 Cloud Armor（DDoS 防御・WAF）

```text
Cloud Armor とは:

  - Google Cloud の DDoS 保護・WAF（Web Application Firewall）サービス
  - Google のグローバルネットワーク（Anycast IP）でトラフィックを吸収

主な機能:

  ① DDoS（分散型サービス妨害）攻撃の防御:

     - レイヤー 3/4 の DDoS を自動的に検知・緩和
     - Google のネットワークの「端」で攻撃トラフィックを遮断
     - Google は世界最大の DDoS 攻撃を経験・対策済み

     → 世界最大規模の DDoS も防御可能

  ② WAF（Web Application Firewall）:

     - OWASP Top 10 の脆弱性を自動的にブロック
     - SQLインジェクション・XSS・CSRF 等
     - 事前設定ルール（ワンクリックで有効化）
     - カスタムルールの作成も可能

  ③ IP・地域ベースのアクセス制御:

     - 特定の IP アドレス・レンジをブロック・許可
     - 特定の国・地域からのアクセスをブロック（地理的制限）
     - ゼロデイ攻撃への迅速な対応

  ④ レート制限:

     - 同じ IP からの異常な大量リクエストを制限
     - ブルートフォース攻撃・スクレイピング対策

  ⑤ アダプティブプロテクション:

     - ML でトラフィックを分析し、攻撃パターンを自動検出
     - 緩和ルールを自動生成・提案

Cloud Armor の適用:

  - グローバル外部 HTTP(S) ロードバランサーに適用
  - ロードバランサーの手前でトラフィックをフィルタリング

```

### 6.3 Cloud Identity-Aware Proxy（IAP）

```text
Cloud IAP とは:

  - VPN なしで社内アプリ・GCP リソースへのセキュアなアクセスを実現
  - BeyondCorp ゼロトラストの中心的なサービス
  - アクセスの「検問所」として機能

従来の VPN vs Cloud IAP の比較:

  VPN（従来）:
    ユーザー → VPN クライアント → VPN サーバー → 社内ネットワーク全体
    問題: 一度 VPN に入ると社内全体にアクセス可能
         VPN サーバー自体が攻撃対象になる

  Cloud IAP（ゼロトラスト）:
    ユーザー → Cloud IAP（認証・認可） → 特定のアプリのみ
    ✅ VPN 不要（ブラウザだけでアクセス）
    ✅ アプリ単位で細かくアクセス制御
    ✅ ユーザー・デバイスの状態を検証してからアクセス許可
    ✅ 全アクセスがログ記録される

IAP の動作フロー:
  ① ユーザーがアプリの URL にアクセス
  ② IAP が Google 認証画面にリダイレクト
  ③ ユーザーが Google アカウントでログイン（MFA も実施）
  ④ IAP が IAM ポリシーを確認（このユーザーはアクセス許可されているか？）
  ⑤ 許可されていれば → アプリにアクセス許可
     拒否されていれば → 403 エラー

Context-Aware Access（コンテキストアウェアアクセス）:
  IAP + 追加の条件チェック:

  - デバイスが管理されているか
  - デバイスのセキュリティポリシーに準拠しているか
  - アクセス元の IP アドレス
  - アクセス時間帯

  → より細かいアクセスポリシーを実装可能

ユースケース:
  ✅ 社内ダッシュボード・管理ツールへの安全なアクセス
  ✅ テレワーク環境での社内システムアクセス
  ✅ SSH・RDP への VPN 不要のセキュアアクセス（TCP トンネリング）
  ✅ GKE・App Engine・Cloud Run アプリの認証
```

### 6.4 VPC Service Controls（VPC SC）

```text
VPC Service Controls とは:

  - GCP サービス（BigQuery・Cloud Storage 等）の周りに

    「仮想的なセキュリティ境界」を作るサービス

  - データの外部流出（Data Exfiltration）を防止

なぜ VPC SC が必要か:

  問題: 攻撃者が認証情報を入手して GCP にアクセスした場合
        BigQuery のデータを自分のプロジェクトにエクスポートできてしまう

  VPC SC で解決:
    「このデータは指定されたプロジェクト・VPC からしかアクセスできない」
    境界の外 = たとえ認証情報を持っていてもアクセス不可

VPC SC の仕組み:
  ┌─────────────────────────────────────────────────────────────┐
  │  セキュリティ境界（Perimeter）                              │
  │                                                             │
  │  プロジェクト A  │  プロジェクト B                         │
  │  （BigQuery）   │  （Cloud Storage）                       │
  │                                                             │
  │  境界内からはお互いにアクセス可能                           │
  └────────────────────────────────┬────────────────────────────┘
                                   │ 境界の外からのアクセスはブロック
                                   ↓
                        ❌ 境界外のプロジェクト（攻撃者）
                           ← アクセス不可

VPC SC のアクセスレベル:

  - 特定の IP アドレスからのアクセスを例外として許可
  - 特定のデバイス・ユーザーからのアクセスを例外として許可
  - Access Context Manager でポリシーを細かく定義

ユースケース:
  ✅ 機密データ（個人情報・金融データ）を含むプロジェクトの保護
  ✅ データの内部流出防止（悪意ある従業員・侵害されたアカウント）
  ✅ 規制対応（HIPAA・PCI DSS）
```

### 6.5 Private Google Access

```text
Private Google Access とは:

  - 外部 IP アドレスを持たない VM が Google Cloud の

    API・サービスにプライベートにアクセスできる機能

なぜ必要か:
  VM に外部 IP なし（セキュリティ向上）
    BUT BigQuery や Cloud Storage にアクセスしたい
    → インターネット経由なしで Google のサービスにアクセスしたい
    → Private Google Access を有効化

  有効化後の通信経路:
  VM（外部IPなし）→ Google のプライベートネットワーク → GCP サービス
  インターネットを経由しない！

Private Service Connect（PSC）:

  - GCP サービスをプライベート IP でアクセスするより高度な機能
  - サードパーティのサービスにもプライベートアクセス可能

```

---

## 7. 脅威検出とセキュリティ監視

### 7.1 Security Command Center（SCC）

```text
Security Command Center とは:

  - Google Cloud の統合セキュリティ管理・リスク可視化ダッシュボード
  - 組織全体のセキュリティ状況を一元可視化
  - 脅威・脆弱性・コンプライアンス違反を自動検出

SCC の 2 つのティア:

  Standard（無料）:

    - 基本的なセキュリティ健全性スキャン
    - IAM の設定ミス検出
    - インターネット公開リソースの検出
    - 機密データの場所の検出

  Premium（有料）:

    - 脅威インテリジェンス統合
    - Event Threat Detection（イベント脅威検出）
    - Virtual Machine Threat Detection（VM 内の脅威検出）
    - Container Threat Detection（コンテナの脅威検出）
    - コンプライアンスレポート（PCI DSS・HIPAA 等）
    - 継続的なコンプライアンス監視

SCC が検出できる主要な脅威・脆弱性:

  設定ミス（Misconfiguration）:

    - 公開されている Cloud Storage バケット
    - 外部 IP が付いた不適切な VM
    - 弱いファイアウォールルール
    - MFA が設定されていない特権ユーザー

  アクティブな脅威（Active Threats）:

    - マルウェアの実行を検出
    - 異常な API コール（クリプトマイニング等）
    - 侵害された認証情報の利用検出
    - データ流出の試み

  脆弱性（Vulnerabilities）:

    - 脆弱なソフトウェアバージョン
    - CVE（既知の脆弱性）の検出
    - コンテナイメージの脆弱性

```

### 7.2 Cloud Logging と監査ログ

```text
Cloud Logging とは:

  - Google Cloud の全サービスからのログを一元収集・保存・分析
  - セキュリティ監査・トラブルシューティング・コンプライアンスに必須

監査ログ（Audit Logs）の 4 種類:

  ① Admin Activity 監査ログ:

     - 「誰がいつ何の設定を変えたか」を記録
     - リソースの作成・変更・削除
     - IAM ポリシーの変更
     - 常に有効（無効化不可）・無料
     - 保持期間: デフォルト 400 日

     例: 「田中さんが 14:35 に BigQuery テーブルを削除した」

  ② Data Access 監査ログ:

     - 「誰がいつデータを読み書きしたか」を記録
     - ストレージへの読み取り・データ操作
     - デフォルト無効（有効化が必要）
     - 有効化するとログ量が増えコスト増
     - 機密データを扱う場合は必ず有効化

     例: 「鈴木さんが 10:15 に Cloud SQL の顧客テーブルを参照した」

  ③ System Event 監査ログ:

     - Google システムによる自動操作を記録
     - ライブマイグレーション・自動スケーリング等
     - 常に有効・無料

  ④ Policy Denied 監査ログ:

     - VPC Service Controls でブロックされたアクセスを記録
     - 有効化が必要
     - 「誰が何にアクセスしようとしてブロックされたか」を追跡

監査ログのベストプラクティス:
  ✅ Data Access 監査ログを機密サービスで必ず有効化
  ✅ ログシンクで BigQuery へエクスポートして長期分析
  ✅ ログベースのアラート設定（不正アクセス試行を即座に通知）
  ✅ 組織レベルでのログの集約（全プロジェクトのログを一元管理）
  ✅ ログ保持期間をコンプライアンス要件に合わせて設定
```

### 7.3 Cloud IDS（Intrusion Detection System）

```text
Cloud IDS とは:

  - Google Cloud のマネージドな侵入検知システム
  - ネットワークトラフィックを分析して脅威を検知
  - Palo Alto Networks の脅威インテリジェンスを活用

検出できる脅威:

  - マルウェアの通信パターン
  - コマンド&コントロール（C2）サーバーへの通信
  - エクスプロイト（脆弱性攻撃）の試み
  - スパイウェア・アドウェアの通信

Cloud Armor との違い:
  Cloud Armor: トラフィックを「ブロック」（WAF・DDoS 防御）
  Cloud IDS: トラフィックを「監視・検知」（アラートのみ）
  → 両方を組み合わせて多層防御
```

### 7.4 Chronicle（SIEM / SOAR）

```text
Chronicle とは:

  - Google の Google-scale なセキュリティ運用プラットフォーム
  - SIEM（Security Information and Event Management）と SOAR 機能
  - Google のインフラで大量のセキュリティログを超高速分析

特徴:

  - Google 検索技術を使ったログ検索（数ペタバイトを秒単位）
  - VirusTotal（Google 傘下）の脅威インテリジェンスと統合
  - YARA-L 言語でカスタム検出ルールを記述
  - 1 年分のセキュリティデータを定額で保持

ユースケース:
  ✅ 大規模な侵害調査（大量ログの横断検索）
  ✅ 脅威ハンティング（攻撃者の痕跡を能動的に探索）
  ✅ コンプライアンスレポートの自動生成
```

> 📎 **参照**:
> https://cloud.google.com/security-command-center/docs
> https://cloud.google.com/logging/docs/audit
> https://cloud.google.com/intrusion-detection-system/docs

---

## 8. コンプライアンスと規制対応

### 8.1 Google Cloud のコンプライアンス認証

Google Cloud は世界主要規制への対応認証を取得しています。

```text
主要なコンプライアンス認証:

  国際標準:
  ┌──────────────────────────────────────────────────────────────┐
  │ ISO 27001: 情報セキュリティ管理の国際規格                    │
  │ ISO 27017: クラウドセキュリティ                              │
  │ ISO 27018: クラウドにおける個人情報保護                      │
  │ SOC 1 / SOC 2 / SOC 3: 内部統制の監査報告                  │
  └──────────────────────────────────────────────────────────────┘

  業界別規制:
  ┌──────────────────────────────────────────────────────────────┐
  │ PCI DSS:   クレジットカード情報保護（決済・金融）             │
  │ HIPAA:     医療情報の保護（米国の医療機関）                  │
  │ FedRAMP:   米国連邦政府のクラウド利用基準                    │
  │ SOX:       財務報告の内部統制（上場企業）                    │
  └──────────────────────────────────────────────────────────────┘

  地域別規制:
  ┌──────────────────────────────────────────────────────────────┐
  │ GDPR:      EU の個人データ保護規則                          │
  │ 個人情報保護法: 日本の個人情報保護                          │
  │ LGPD:      ブラジルの個人データ保護法                       │
  └──────────────────────────────────────────────────────────────┘
```

### 8.2 主要なコンプライアンス規制の詳細

#### GDPR（EU 一般データ保護規則）

```text
GDPR とは:

  - 2018 年施行のEU の個人データ保護規則
  - EU 居住者のデータを扱う全企業に適用（EU 外の企業も対象！）

主な要件:
  ① データ主体の権利:

     - 削除権（忘れられる権利）
     - アクセス権（自分のデータを入手する権利）
     - ポータビリティ権（データを別サービスへ移す権利）

  ② データ処理の原則:

     - 目的の限定（収集目的以外に使用不可）
     - データ最小化（必要最小限のデータのみ収集）
     - 保存期間の制限（必要な期間のみ保存）

  ③ 違反時の制裁金:

     - 最大 2,000 万ユーロ または 年間売上高の 4% の高い方

Google Cloud の GDPR 対応:
  ✅ データ処理補遺条項（DPA）を全顧客に提供
  ✅ EU リージョン（europe-west シリーズ）を使えばデータを EU 内に保管
  ✅ 顧客データをモデル学習に使用しない
  ✅ Sensitive Data Protection で PII を自動検出・保護

GDPR 対応のベストプラクティス:
  ✅ EU ユーザーのデータは EU リージョンのみに保管
  ✅ 組織ポリシーで特定リージョン以外へのデータ移動を禁止
  ✅ Sensitive Data Protection でPII を自動特定
  ✅ Data Catalog でデータの系譜を管理（どこに何があるか）
  ✅ ユーザーからの削除依頼に対応できるプロセスを整備
```

#### PCI DSS（クレジットカード業界のセキュリティ基準）

```text
PCI DSS とは:

  - Payment Card Industry Data Security Standard
  - クレジットカード情報を扱う全企業に適用
  - Visa・Mastercard 等のカードブランドが共同で策定

主な要件:

  - カードデータを安全なネットワークで保護
  - カードデータの保護（暗号化）
  - 脆弱性管理プログラムの維持
  - アクセス制御の実装
  - 監視・テストの実施
  - 情報セキュリティポリシーの維持

Google Cloud の PCI DSS 対応:
  ✅ Google Cloud の多くのサービスが PCI DSS Level 1 認定
  ✅ カード情報を GCP に保存する場合のガイダンスを提供
  ✅ Compliance Reports Manager でコンプライアンス文書を管理
```

#### HIPAA（米国医療情報保護法）

```text
HIPAA とは:

  - Health Insurance Portability and Accountability Act
  - 医療情報（PHI: Protected Health Information）の保護を義務付ける米国の法律
  - 医療機関・保険会社・関連ビジネスアソシエイトに適用

Google Cloud の HIPAA 対応:
  ✅ Business Associate Agreement（BAA）を提供（HIPAA の要件）
  ✅ HIPAA 対応サービスのリストを公開
  ✅ 医療データ向け Cloud Healthcare API を提供
  ✅ 暗号化・アクセス制御・監査ログが HIPAA 要件に対応
```

### 8.3 Compliance Reports Manager

```text
Compliance Reports Manager とは:

  - Google Cloud のコンプライアンス認証文書を管理・ダウンロードするツール
  - 監査担当者・規制機関への証拠提出に活用
  - SOC レポート・ISO 認証書等をセルフサービスでダウンロード

活用シナリオ:
  監査時:
    「Google Cloud は PCI DSS に準拠していますか？」
    → Compliance Reports Manager から認定書を即座に取得・提出
    → 数日かかっていた手続きが数分で完了
```

### 8.4 データ主権とリージョン選択

```text
データ主権（Data Sovereignty）とは:
  データがどの国・地域の法律に従うかという概念
  「データはその国の法律の支配下に置かれる」

リージョン選択でデータ主権を確保:
  EU のデータは EU リージョンのみ:
    → europe-west1（ベルギー）
    → europe-west4（オランダ）
    → europe-north1（フィンランド）

日本のデータは日本リージョン:
    → asia-northeast1（東京）
    → asia-northeast2（大阪）

組織ポリシーでリージョンを強制:
  constraints/gcp.resourceLocations を設定
  → 指定リージョン以外でのリソース作成を禁止
  → 誤って EU データを US リージョンに保存するミスを防止
```

> 📎 **参照**:
> https://cloud.google.com/security/compliance
> https://cloud.google.com/privacy/gdpr
> https://cloud.google.com/security/compliance/pci-dss

---

## 9. データプライバシーと個人情報保護

### 9.1 Sensitive Data Protection（旧 Cloud DLP）

```text
Sensitive Data Protection とは:

  - テキスト・画像・構造化データ内の機密情報を自動検出・分類・保護
  - 150 以上の組み込み情報タイプ（infoType）を持つ
  - BigQuery・Cloud Storage・Datastore を対象にスキャン可能

検出できる情報の例:
  個人識別情報（PII）:

    - 氏名・住所・電話番号・メールアドレス
    - 生年月日・マイナンバー・パスポート番号
    - クレジットカード番号・銀行口座番号
    - IPアドレス・Cookie

  機密情報:

    - 医療情報（診断・薬・手術）
    - 認証情報（パスワード・API キー・SSH 鍵）
    - 金融情報（税番号・財務データ）

  国別の固有識別子:

    - 日本: マイナンバー・運転免許証番号・パスポート番号
    - US: SSN・EIN
    - EU: 各国の ID 番号

```

### 9.2 Sensitive Data Protection の保護手法

```text
保護の手法（重要！試験頻出）:

① 検出（Inspection）:
   どこに機密データがあるかを発見するだけ
   例: BigQuery の全テーブルをスキャンして PII を含む列を特定

② マスキング（Masking）:
   一部を「*」や「X」で置き換える
   例: 「090-1234-5678」→「***-****-5678」（末尾のみ表示）

③ 仮名化（Pseudonymization）:
   識別子を仮の識別子に置換（変換テーブルで元に戻せる）
   例: 「田中太郎」→「UID-a7f3k」
   → 再識別可能・GDPR の保護措置として認められる

④ 匿名化（De-identification）:
   識別情報を完全に除去（元に戻せない）
   例: 「田中太郎・東京都渋谷区」→「30代男性・東京都内」
   → 再識別不可能・GDPR 規制対象外になる

⑤ トークン化（Tokenization）:
   値をランダムなトークンに置換
   例: 「4111-1111-1111-1111」→「TOKEN-ab3f8x」
   → トークンは元の値と同じ形式・長さを保つことも可能

⑥ 暗号化（Encryption）:
   暗号化キーで暗号化（鍵があれば復号可能）
   例: 「090-1234-5678」→「3f8a…9d2c」（暗号化済み）
   → 鍵管理が重要

⑦ 日付シフト（Date Shifting）:
   日付をランダムにずらす（統計的特性を保ちつつ）
   例: 「2024-01-15（診察日）」→「2024-03-27（±数ヶ月でランダムシフト）」
   医療・研究データの匿名化に活用

どれを使うべきか:
  開発・テスト環境（本番データを使いたい場合）→ 仮名化
  データ公開・共有 → 匿名化
  PCI DSS のカードデータ → トークン化
  一般的なログのマスク → マスキング
```

### 9.3 プライバシー by デザイン

```text
プライバシー by デザイン（Privacy by Design）とは:
  システム設計の最初からプライバシー保護を組み込む考え方
  「後から対応」ではなく「最初から設計に組み込む」

7 つの原則:

  1. プロアクティブ: 問題が起きてからではなく事前に対処
  2. デフォルトでのプライバシー: デフォルト設定が最もプライバシーを保護
  3. 設計に組み込む: システム設計の核心にプライバシーを組み込む
  4. 全員が利益を得る: セキュリティとプライバシーはトレードオフでない
  5. 完全なライフサイクル: データの収集から削除まで保護
  6. 可視性と透明性: 何を・なぜ集めているかを明示
  7. ユーザー中心: ユーザーのプライバシーを最優先

Google Cloud での実践:
  ✅ データ収集: Sensitive Data Protection で PII を自動検出
  ✅ データ保存: 最小限のデータのみ保存・ライフサイクルで自動削除
  ✅ データアクセス: IAM で最小権限・VPC SC でデータ流出防止
  ✅ データ削除: GDPR 削除権に対応した削除プロセスの実装
```

> 📎 **参照**:
> https://cloud.google.com/sensitive-data-protection/docs
> https://cloud.google.com/sensitive-data-protection/docs/pseudonymization
> https://cloud.google.com/privacy

---

## 10. セキュリティのベストプラクティス実践

### 10.1 Google Cloud セキュリティのベースライン

```text
すべての Google Cloud 環境に適用すべき基本設定:

組織レベルの設定:
  ① ドメインの制限:
     constraints/iam.allowedPolicyMemberDomains
     → 自社ドメインのユーザーのみ IAM ロール付与を許可
     → 個人 Gmail アカウント（@gmail.com）へのアクセス付与を禁止

  ② サービスアカウントキーの無効化:
     constraints/iam.disableServiceAccountKeyCreation
     → サービスアカウントキー（JSON）の作成を全プロジェクトで禁止

  ③ リソースの場所制限:
     constraints/gcp.resourceLocations
     → 特定のリージョン以外でリソース作成を禁止

  ④ 公開ストレージバケットの禁止:
     constraints/storage.uniformBucketLevelAccess
     constraints/iam.restrictPublicIpAccess
     → 誤ってデータを公開バケットにアップロードすることを防止

プロジェクトレベルの設定:
  ① 必ずバジェットアラートを設定（異常なコスト増を検知）
  ② VPC フローログを有効化（ネットワーク通信の監視）
  ③ Cloud Audit Logs（特に Data Access）を有効化
  ④ Security Command Center を有効化して自動スキャン

VM・コンピューティングの設定:
  ① VM に外部 IP を付けない（Cloud NAT・IAP を使用）
  ② Shielded VM を有効化
  ③ OS Login を有効化（SSH 鍵の IAM による管理）
  ④ VM Manager でパッチ適用状況を管理
```

### 10.2 シークレット管理

```text
Secret Manager とは:

  - API キー・パスワード・証明書などの機密情報を安全に管理
  - アプリケーションのコードに直接シークレットを書かない

Secret Manager の機能:
  ① バージョン管理:

     - シークレットのバージョンを管理
     - ローテーション後も古いバージョンへのアクセスが可能
     - 使用中のバージョンを即座に無効化可能

  ② アクセス制御:

     - IAM でシークレットへのアクセスを細かく制御
     - 「このサービスアカウントはこのシークレットのみ閲覧可能」

  ③ 監査ログ:

     - 誰がいつシークレットにアクセスしたかを記録
     - コンプライアンス・調査に活用

  ④ 自動ローテーション:

     - Cloud Functions と連携してシークレットを自動更新
     - ローテーション時に Cloud Pub/Sub で通知

シークレットの安全な使い方:
  ❌ 悪い例:
     api_key = "sk-abc123xyz789..."  # コードに直書き！
     → Git リポジトリに含まれてしまう

  ✅ 良い例（Python）:
     from google.cloud import secretmanager
     client = secretmanager.SecretManagerServiceClient()
     name = f"projects/{PROJECT_ID}/secrets/api-key/versions/latest"
     response = client.access_secret_version(request={"name": name})
     api_key = response.payload.data.decode("UTF-8")
```

### 10.3 セキュリティの自動化

```text
セキュリティの自動化が重要な理由:
  手動対応では:

    - 設定ミスの発見が遅れる
    - 脅威の対応に時間がかかる
    - ヒューマンエラーが入る
    - スケールしない（リソースが増えるにつれて管理が困難）

Security Command Center + Event Threat Detection の自動化:

  検出 → アラート → 対応 の自動化:
    SCC が脅威を検出
      ↓
    Cloud Pub/Sub にイベントを発行
      ↓
    Cloud Functions が自動的に対応を実行
      例:

        - 侵害されたアカウントの自動無効化
        - 公開バケットの自動非公開化
        - 不審な VM の自動停止
        - Slack・メールへの即座の通知

Policy Controller（Anthos Config Management）:

  - Kubernetes クラスタに対してセキュリティポリシーを自動適用
  - 「root で動くコンテナは拒否」等のルールを強制
  - OPA（Open Policy Agent）ベース

Binary Authorization:

  - GKE で実行できるコンテナイメージを制限
  - 「承認済みのコンテナイメージのみデプロイ可能」
  - Artifact Registry でスキャン済みのイメージのみ許可

```

### 10.4 インシデント対応

```text
セキュリティインシデント対応の流れ（NIST フレームワーク）:

  ① 準備（Prepare）:

     - インシデント対応計画の策定
     - SCC・Cloud Logging のアラート設定
     - Runbook（対応手順書）の整備

  ② 検出（Detect）:

     - SCC でリアルタイムの脅威検出
     - Cloud Logging の異常アラート
     - Cloud IDS によるネットワーク脅威検出

  ③ 分析（Analyze）:

     - Cloud Logging・Chronicle でログを分析
     - 攻撃の範囲・影響を特定
     - タイムラインの再構築

  ④ 封じ込め（Contain）:

     - 侵害された VM・アカウントを隔離
     - ファイアウォールルールで通信をブロック
     - 侵害されたアカウントの無効化

  ⑤ 根絶（Eradicate）:

     - マルウェアの除去
     - 脆弱性のパッチ適用
     - バックアップからのクリーンな状態への復元

  ⑥ 復旧（Recover）:

     - サービスの正常化
     - 再発防止策の実施

  ⑦ 教訓（Lessons Learned）:

     - インシデントの振り返り
     - セキュリティ対策の改善

```

---

## 11. Google Workspace のセキュリティ

### 11.1 Google Workspace のセキュリティ機能

```text
Google Workspace のセキュリティ概要:

組み込みのセキュリティ:
  ✅ TLS によるメール暗号化（転送中）
  ✅ Gmail のフィッシング・スパム自動検出（99.9% 以上の精度）
  ✅ Drive のマルウェアスキャン
  ✅ Meet のエンドツーエンド暗号化（オプション）

管理者向けセキュリティ機能:
  ① Google 管理コンソール:

     - デバイス管理・ユーザー管理
     - セキュリティポリシーの一元設定
     - アクセスレポートの確認

  ② データ損失防止（DLP）:

     - Gmail・Drive・Chat でのDLP ポリシー適用
     - 機密情報の外部送信を自動検出・ブロック

  ③ Vault（法的保全・eDiscovery）:

     - メール・Drive・Chat の保全
     - 訴訟・調査対応のための長期保存
     - 特定期間のデータを検索・エクスポート

  ④ 端末管理（Device Management）:

     - BYOD デバイスの管理・ポリシー適用
     - 紛失・盗難時のリモートワイプ
     - Endpoint Verification との連携

```

### 11.2 Gmail のセキュリティ

```text
Gmail の高度なセキュリティ機能:

① Advanced Phishing and Malware Protection:

   - 添付ファイルのサンドボックス分析
   - 怪しいリンクの自動警告
   - なりすましドメインの検出
   - 異常なパターンの自動隔離

② S/MIME 暗号化:

   - メールのエンドツーエンド暗号化
   - 送信者のデジタル署名で真正性を確認

③ メール送受信のセキュリティ標準:

   - SPF（送信元IPの認証）
   - DKIM（電子署名）
   - DMARC（SPF・DKIMの適用ポリシー）

   → フィッシングメールの防止

④ 機密モード（Confidential Mode）:

   - メールに有効期限を設定
   - 転送・印刷・コピーを制限
   - SMS による確認コードでアクセス制限

```

---

## 12. Section 5 総まとめ・頻出問題パターン

### 12.1 最重要用語の一問一答

```text
Q: 責任共有モデルにおいてユーザーが必ず責任を持つものは？
A: データ・ユーザー管理・アクセス設定（IAM）・アプリのセキュリティ
   Google が管理するのはデータセンター・ハードウェア・ネットワーク

Q: ゼロトラストセキュリティの核心は？
A: 「ネットワーク内にいるから信頼できる」という前提を捨て、
   全てのアクセスを「誰が・どのデバイスで・何に」の観点で検証する

Q: Cloud IAP の役割は？
A: VPN なしで BeyondCorp ゼロトラストを実現するサービス。
   アクセスのたびに認証・認可を行い、アプリ単位でアクセス制御

Q: CMEK と Google-Managed Keys の違いは？
A: Google-Managed: Google が鍵を管理（デフォルト・無料）
   CMEK: ユーザーが Cloud KMS で鍵を作成・管理（コンプライアンス用）

Q: VPC Service Controls の目的は？
A: GCP サービスの周りにセキュリティ境界を作り、
   たとえ認証情報を盗まれても境界外からのアクセスを防ぐ

Q: 監査ログの Admin Activity と Data Access の違いは？
A: Admin Activity: 設定変更（常に有効・無料）
   Data Access: データの読み書き（デフォルト無効・有効化が必要）

Q: 匿名化と仮名化の違いは？
A: 匿名化: 再識別不可能（GDPR 対象外）
   仮名化: 変換テーブルで再識別可能（GDPR 引き続き適用）

Q: Cloud Armor の役割は？
A: DDoS 攻撃の防御と WAF（OWASP Top 10 への対策）
   グローバルロードバランサーの手前でトラフィックをフィルタリング

Q: Security Command Center の役割は？
A: GCP 全体のセキュリティ脅威・設定ミス・脆弱性を一元可視化するダッシュボード

Q: Confidential VM の特徴は？
A: 保存中・転送中だけでなく、処理中（メモリ上）のデータも暗号化する VM
   AMD SEV 技術を使用
```

### 12.2 よく出る問題パターンと解法

#### パターン 1: 責任共有モデルの問題

```text
問題: 「企業が Cloud SQL を使用している。
        顧客の個人情報が漏洩した場合、
        Google と企業はそれぞれ何に責任を持つか？」

解法:
  PaaS（Cloud SQL）での責任分担:

  - Google の責任: データベースエンジンのパッチ・インフラの物理セキュリティ
  - 企業の責任: データへのアクセス制御（IAM）・データの暗号化設定・

               アプリケーションのセキュリティ・ユーザー管理

答え: 個人情報漏洩に対しては企業が責任を持つ
     Google はインフラセキュリティに責任を持つが、データの内容・アクセス管理は企業の責任
```

#### パターン 2: 暗号化鍵の選択

```text
問題: 「金融機関が GCP に顧客データを保存する。
        規制要件で『鍵は自社が管理しなければならない』と
        定められている場合、どの暗号化方式を使うべきか？」

解法:

  - 「自社が鍵を管理」→ Google-Managed Keys ではない
  - Cloud KMS でユーザーが鍵を管理 → CMEK が適切
  - CSEK は複雑で管理コストが高い
  - CMEK なら Cloud KMS で鍵の作成・ローテーション・無効化を自社で管理

答え: CMEK（Customer-Managed Encryption Keys）+ Cloud KMS
```

#### パターン 3: IAM の最小権限

```text
問題: 「データアナリストが BigQuery でクエリを実行する必要がある。
        データの変更・削除は不要。
        必要最小限の権限を付与するには？」

解法:

  - BigQuery の読み取りのみ必要
  - クエリの実行も必要
  - 変更・削除は不要

  roles/bigquery.dataViewer: データの読み取り
  roles/bigquery.jobUser: クエリ（ジョブ）の実行

答え: roles/bigquery.dataViewer + roles/bigquery.jobUser
     ※ roles/bigquery.admin や roles/editor は付与しない
```

#### パターン 4: VPC SC の活用

```text
問題: 「企業が BigQuery に機密データを保存している。
        社員のアカウントが侵害された場合でも、
        データを外部の別プロジェクトにエクスポートできないよう
        にしたい。どのサービスを使うべきか？」

解法:

  - 認証情報が盗まれても境界外へのデータ移動を防ぎたい
  - ファイアウォールルールや IAM だけでは防げない
  - VPC Service Controls がデータの外部流出を境界で防止

答え: VPC Service Controls（VPC SC）
     BigQuery をセキュリティ境界内に置き、境界外からのアクセスをブロック
```

#### パターン 5: 個人情報の保護手法

```text
問題: 「医療研究機関が患者データを研究に使用したい。
        患者を特定できないようにデータを保護しつつ、
        統計的な分析はできるようにしたい。
        GDPR の規制対象外にしたい。
        どの保護手法が最適か？」

解法:

  - 患者を特定できないようにする → 識別情報の除去
  - GDPR 対象外にしたい → 匿名化（再識別不可能）
  - 統計分析は可能に保つ → 完全削除ではなく匿名化
  - 仮名化では GDPR 対象のまま

答え: 匿名化（Anonymization / De-identification）
     Sensitive Data Protection の de-identification 機能を使用
```

### 12.3 混同しやすいポイントの整理

| 混同パターン                            | 正しい理解                                                                                |
| --------------------------------------- | ----------------------------------------------------------------------------------------- |
| Cloud Armor = Cloud IAP                 | Cloud Armor は DDoS/WAF（外部攻撃防御）、IAP は認証アクセス制御（ゼロトラスト）           |
| CMEK = CSEK                             | CMEK は Cloud KMS に鍵を保管（ユーザー管理）、CSEK は GCP 外で鍵を管理（提供型）          |
| 匿名化 = 仮名化                         | 匿名化は再識別不可（GDPR対象外）、仮名化は再識別可能（GDPR対象）                          |
| Admin Activity = Data Access ログ       | Admin Activity は設定変更（常時有効）、Data Access はデータの読み書き（要有効化）         |
| VPC SC = ファイアウォール               | ファイアウォールは通信制御（L4）、VPC SC は API アクセスの境界制御（認証後も制限）        |
| Security Command Center = Cloud Logging | SCC は脅威・設定ミスの可視化、Cloud Logging はログの収集・保存・分析                      |
| Google-Managed Keys = CMEK              | Google-Managed はGoogle が管理（デフォルト）、CMEK はユーザーが管理（コンプライアンス用） |
| IAP = VPN                               | IAP は VPN 不要のアプリ単位の認証アクセス制御、VPN はネットワークレベルの接続             |

### 12.4 Section 5 チェックリスト

```text
試験前の最終確認:

□ 責任共有モデルで Google とユーザーがそれぞれ何に責任を持つか説明できる
□ ゼロトラスト・BeyondCorp の考え方を説明できる
□ IAM の 3 つのロール種別（基本・事前定義・カスタム）と推奨を説明できる
□ 最小権限の原則とその重要性を説明できる
□ サービスアカウントキーのリスクと代替手段（ADC・Workload Identity）を説明できる
□ 暗号化の 3 つの状態（保存中・転送中・使用中）を説明できる
□ Google-Managed Keys・CMEK・CSEK の違いと選択基準を説明できる
□ Cloud KMS と Cloud HSM の違いを説明できる
□ Confidential VM が何を解決するか説明できる
□ Cloud Armor・Cloud IAP・VPC Service Controls の役割の違いを説明できる
□ Admin Activity と Data Access 監査ログの違いを説明できる
□ Security Command Center の役割を説明できる
□ Sensitive Data Protection の主要な保護手法（匿名化・仮名化・トークン化）を説明できる
□ 匿名化と仮名化の違い（再識別可否・GDPR 適用）を説明できる
□ 主要なコンプライアンス規制（GDPR・HIPAA・PCI DSS）の概要を説明できる
```

---

## 13. 公式参照リソース一覧

| カテゴリ                   | リソース                        | URL                                                                                |
| -------------------------- | ------------------------------- | ---------------------------------------------------------------------------------- |
| **試験情報**               | CDL 試験概要ページ              | https://cloud.google.com/learn/certification/cloud-digital-leader                  |
| **試験情報**               | 試験ガイド PDF                  | https://services.google.com/fh/files/misc/cdl_exam_guide_english.pdf               |
| **セキュリティ概要**       | Google Cloud セキュリティ概要   | https://cloud.google.com/security/overview                                         |
| **インフラセキュリティ**   | Google インフラセキュリティ設計 | https://cloud.google.com/security/infrastructure/design                            |
| **ゼロトラスト**           | BeyondCorp Enterprise           | https://cloud.google.com/beyondcorp                                                |
| **ゼロトラスト**           | BeyondCorp の詳細               | https://cloud.google.com/beyondcorp/resources/whitepaper                           |
| **IAM**                    | IAM 概要                        | https://cloud.google.com/iam/docs/overview                                         |
| **IAM**                    | IAM ベストプラクティス          | https://cloud.google.com/iam/docs/best-practices                                   |
| **IAM**                    | サービスアカウント概要          | https://cloud.google.com/iam/docs/service-account-overview                         |
| **IAM**                    | Workload Identity Federation    | https://cloud.google.com/iam/docs/workload-identity-federation                     |
| **Cloud Identity**         | Cloud Identity 概要             | https://cloud.google.com/identity/docs/overview                                    |
| **暗号化**                 | デフォルト暗号化                | https://cloud.google.com/security/encryption/default-encryption                    |
| **暗号化**                 | Cloud KMS                       | https://cloud.google.com/kms/docs                                                  |
| **暗号化**                 | CMEK                            | https://cloud.google.com/docs/security/encryption/customer-managed-encryption-keys |
| **機密コンピューティング** | Confidential VM                 | https://cloud.google.com/confidential-computing/confidential-vm/docs               |
| **ネットワーク**           | VPC Service Controls            | https://cloud.google.com/vpc-service-controls/docs                                 |
| **ネットワーク**           | Cloud Armor                     | https://cloud.google.com/armor/docs                                                |
| **ネットワーク**           | Cloud IAP                       | https://cloud.google.com/iap/docs                                                  |
| **セキュリティ監視**       | Security Command Center         | https://cloud.google.com/security-command-center/docs                              |
| **セキュリティ監視**       | Cloud Logging 監査ログ          | https://cloud.google.com/logging/docs/audit                                        |
| **セキュリティ監視**       | Cloud IDS                       | https://cloud.google.com/intrusion-detection-system/docs                           |
| **セキュリティ監視**       | Chronicle                       | https://cloud.google.com/chronicle/docs                                            |
| **データ保護**             | Sensitive Data Protection       | https://cloud.google.com/sensitive-data-protection/docs                            |
| **データ保護**             | データの仮名化                  | https://cloud.google.com/sensitive-data-protection/docs/pseudonymization           |
| **Secret Manager**         | Secret Manager                  | https://cloud.google.com/secret-manager/docs                                       |
| **Binary Authorization**   | Binary Authorization            | https://cloud.google.com/binary-authorization/docs                                 |
| **コンプライアンス**       | コンプライアンス一覧            | https://cloud.google.com/security/compliance                                       |
| **コンプライアンス**       | GDPR 対応                       | https://cloud.google.com/privacy/gdpr                                              |
| **コンプライアンス**       | PCI DSS                         | https://cloud.google.com/security/compliance/pci-dss                               |
| **コンプライアンス**       | Compliance Reports Manager      | https://cloud.google.com/compliance-reports-manager                                |
| **プライバシー**           | Google Cloud プライバシー       | https://cloud.google.com/privacy                                                   |
| **Workspace セキュリティ** | Google Workspace セキュリティ   | https://workspace.google.com/security                                              |
| **SRE セキュリティ**       | Google セキュリティブログ       | https://cloud.google.com/blog/topics/security                                      |

---

_本ガイドは Google Cloud Digital Leader（CDL）試験の Section 5 に特化した学習資料です。_
_試験の最新情報は必ず公式サイト（https://cloud.google.com/learn/certification/cloud-digital-leader）でご確認ください。_
_作成日: 2026年4月_
