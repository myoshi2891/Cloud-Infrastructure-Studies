# Section 2: Google Cloud によるデータ トランスフォーメーションの探求

## 完全攻略ガイド（初学者向け・ステップバイステップ解説）

> **対象読者**: クラウド初学者・データ活用を目指すビジネスパーソン  
> **試験配点**: Section 2 は全体の約 **16%** を占める重要セクション  
> **学習目標**: データの価値・Google Cloud のデータサービス・分析基盤・AI 活用を理解する

---

## 📋 目次

1. [Section 2 の出題範囲と学習ポイント](#1-section-2-の出題範囲と学習ポイント)
2. [データとは何か？ビジネスにおけるデータの価値](#2-データとは何かビジネスにおけるデータの価値)
3. [データの種類と特性](#3-データの種類と特性)
4. [データのライフサイクルとパイプライン](#4-データのライフサイクルとパイプライン)
5. [Google Cloud のデータストレージサービス](#5-google-cloud-のデータストレージサービス)
6. [Google Cloud のデータベースサービス](#6-google-cloud-のデータベースサービス)
7. [データ分析・BI サービス](#7-データ分析bi-サービス)
8. [データパイプラインとデータ統合](#8-データパイプラインとデータ統合)
9. [スマートアナリティクスの全体アーキテクチャ](#9-スマートアナリティクスの全体アーキテクチャ)
10. [Google Cloud のデータガバナンスとセキュリティ](#10-google-cloud-のデータガバナンスとセキュリティ)
11. [ビジネスユースケース別 データ活用パターン](#11-ビジネスユースケース別-データ活用パターン)
12. [Section 2 総まとめ・頻出問題パターン](#12-section-2-総まとめ頻出問題パターン)
13. [公式参照リソース一覧](#13-公式参照リソース一覧)

---

## 1. Section 2 の出題範囲と学習ポイント

### 1.1 試験における Section 2 の位置づけ

Google Cloud Digital Leader（CDL）試験の Section 2 は
「**Google Cloud によるデータ トランスフォーメーションの探求**」がテーマです。

```
Section 2 で問われる主なこと:
┌─────────────────────────────────────────────────────────────┐
│ ① データの種類（構造化・非構造化）とビジネス価値の違い         │
│ ② データのライフサイクル（収集→保存→処理→分析→活用）         │
│ ③ 適切なストレージ・データベースサービスの選択                 │
│ ④ BigQuery によるデータ分析の仕組みとメリット                 │
│ ⑤ Looker / Looker Studio による BI・可視化の違い             │
│ ⑥ データパイプライン（Dataflow・Pub/Sub・Dataproc）の役割     │
│ ⑦ データガバナンスとプライバシー保護の考え方                   │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Section 2 のサブトピック一覧

| # | サブトピック | 重要度 |
| --- | --- | --- |
| 1 | データのビジネス価値（4種類の分析） | ★★★ |
| 2 | 構造化・非構造化・半構造化データ | ★★★ |
| 3 | Cloud Storage のストレージクラス | ★★★ |
| 4 | データベース選択（RDB vs NoSQL） | ★★★ |
| 5 | BigQuery の特徴とユースケース | ★★★ |
| 6 | Looker と Looker Studio の違い | ★★★ |
| 7 | Pub/Sub・Dataflow・Dataproc の役割 | ★★★ |
| 8 | Dataplex・Data Catalog | ★★☆ |
| 9 | データのプライバシー・ガバナンス | ★★★ |
| 10 | ビジネスユースケース別のデータ活用 | ★★☆ |

---

## 2. データとは何か？ビジネスにおけるデータの価値

### 2.1 「データ」の本質的な意味

**データ**とは、事実・数値・文字・画像・音声など、
何らかの情報を記録したものです。
単体では価値が低くても、**分析・組み合わせ・活用**することで
ビジネス上の洞察（インサイト）と価値を生み出します。

```
データ → 情報 → 知識 → 知恵 → 意思決定

例:
  データ:  「23°C」「15:30」「3,847件」
  情報:    「今日の午後3時半に気温23°Cで3,847件の注文があった」
  知識:    「気温が20°C以上の晴れた午後は注文件数が増える傾向がある」
  知恵:    「暑い日の午後に向けて在庫と人員を事前に増やすべき」
  意思決定: 「天気予報に連動した自動在庫調整システムを導入する」
```

### 2.2 データドリブン経営とは

**データドリブン経営**とは、経験・勘・感覚ではなく、
**データと分析に基づいて意思決定**を行う経営スタイルです。

#### 従来型経営 vs データドリブン経営の比較

| 比較項目 | 従来型（経験・勘） | データドリブン |
| --- | --- | --- |
| **意思決定の根拠** | ベテランの経験則 | データと統計的分析 |
| **スピード** | 会議・議論に時間がかかる | リアルタイムで判断可能 |
| **精度** | 個人の能力に依存 | 再現性・客観性が高い |
| **スケール** | 個人の限界がある | AIで大量データを処理 |
| **リスク** | バイアスが入りやすい | データに基づくため客観的 |

### 2.3 データが生み出す 4 種類のビジネス価値

データ分析には4つのレベルがあります。
上位レベルほど高い価値を生み出しますが、より高度な技術が必要です。

```
        価値
         ↑
    高   │  ④ 処方的分析（Prescriptive Analytics）
         │     「次に何をすべきか？」
         │     例: AI が最適な在庫発注量を自動で提案する
         │
         │  ③ 予測的分析（Predictive Analytics）
         │     「次に何が起きるか？」
         │     例: 来月の売上を予測する・顧客離脱を予測する
         │
         │  ② 診断的分析（Diagnostic Analytics）
         │     「なぜそれが起きたのか？」
         │     例: 先月売上が下がった原因を特定する
         │
    低   │  ① 記述的分析（Descriptive Analytics）
         │     「何が起きたか？」
         │     例: 先月の売上・ユーザー数を集計する
         └──────────────────────────────→ 複雑さ
              低                          高
```

#### 各分析レベルの具体例（EC サイトの場合）

| レベル | 問い | 分析の例 | 使うツール |
| --- | --- | --- | --- |
| ① 記述的 | 先月何個売れたか？ | 月次売上レポート | Looker Studio |
| ② 診断的 | なぜ売上が下がったか？ | 顧客行動の深掘り分析 | BigQuery + Looker |
| ③ 予測的 | 来月何個売れるか？ | 需要予測モデル | Vertex AI + BigQuery |
| ④ 処方的 | 何個仕入れるべきか？ | 自動発注 AI | Vertex AI Agent |

> 📎 **参照**: Google Cloud データ分析ソリューション  
> https://cloud.google.com/solutions/smart-analytics  
> https://cloud.google.com/bigquery/docs/introduction

---

## 3. データの種類と特性

### 3.1 3 種類のデータ形式

データは形式によって 3 種類に分類されます。
試験では「どのデータ形式にどのサービスが適切か」が問われます。

```
世界中のデータの内訳（概算）:
  構造化データ:    約 10〜20%
  半構造化データ:  約 10〜15%
  非構造化データ:  約 70〜80%   ← 最も多い！
```

### 3.2 構造化データ（Structured Data）

#### 定義と特徴

```
構造化データとは:
  - 行と列（表形式）で整理されたデータ
  - スキーマ（型定義）が明確に定まっている
  - SQL などで簡単に検索・集計できる
  - 全データの約 10〜20% を占める

特徴:
  ✅ 検索・集計・結合が簡単
  ✅ データ品質の管理がしやすい
  ❌ 非構造化データのような柔軟な表現は難しい
```

#### 構造化データの具体例

| データ種別 | 具体例 | 格納先（GCP） |
| --- | --- | --- |
| 売上データ | 日付・商品ID・金額・数量 | Cloud SQL / BigQuery |
| 顧客マスタ | 顧客ID・氏名・住所・年齢 | Cloud SQL / Spanner |
| 在庫データ | SKU・倉庫・在庫数・入出庫日 | Cloud SQL / Spanner |
| 気象データ | 日時・気温・湿度・降水量 | BigQuery / Bigtable |
| 株価データ | 銘柄・日時・始値・終値・出来高 | BigQuery / Bigtable |

### 3.3 非構造化データ（Unstructured Data）

#### 定義と特徴

```
非構造化データとは:
  - 特定のフォーマット・スキーマがないデータ
  - テキスト・画像・動画・音声などの形式
  - 全データの約 70〜80% を占める大多数
  - 従来は分析が困難 → AI/ML で活用が進む

特徴:
  ✅ 豊富な情報を含む（感情・ニュアンス・視覚情報など）
  ✅ リアルワールドのデータの多くがこの形式
  ❌ 直接 SQL で集計・検索できない
  ❌ 分析にはAI/ML が必要
```

#### 非構造化データの具体例

| データ種別 | 具体例 | 格納先（GCP） | 分析方法 |
| --- | --- | --- | --- |
| テキスト | メール・SNS 投稿・レビュー | Cloud Storage | Natural Language API |
| 画像 | 商品写真・医療画像・衛星写真 | Cloud Storage | Vision API |
| 動画 | 監視カメラ・広告・教育動画 | Cloud Storage | Video Intelligence API |
| 音声 | コールセンター録音・ポッドキャスト | Cloud Storage | Speech-to-Text API |
| PDF | 契約書・請求書・レポート | Cloud Storage | Document AI |
| ログ | Webサーバーログ・アプリログ | Cloud Logging / GCS | BigQuery |

### 3.4 半構造化データ（Semi-Structured Data）

#### 定義と特徴

```
半構造化データとは:
  - 完全な表形式ではないが、一定の構造を持つデータ
  - JSON・XML・CSV・YAML などの形式
  - Web API のレスポンスや IoT センサーデータに多い

例（JSON 形式）:
  {
    "user_id": "U-12345",
    "name": "田中太郎",
    "purchases": [
      {"item": "シャツ", "price": 3000, "date": "2024-01-15"},
      {"item": "ズボン", "price": 5000, "date": "2024-01-20"}
    ],
    "tags": ["VIP", "リピーター"]
  }

特徴:
  ✅ JSON・XML など標準フォーマットで交換しやすい
  ✅ スキーマが柔軟（フィールドの追加・変更が容易）
  ✅ BigQuery や Firestore で直接扱える
```

### 3.5 データ形式の比較まとめ

| 比較項目 | 構造化 | 半構造化 | 非構造化 |
| --- | --- | --- | --- |
| **例** | CSV・RDB テーブル | JSON・XML・CSV | 画像・動画・音声・PDF |
| **スキーマ** | 固定・厳格 | 柔軟 | なし |
| **検索方法** | SQL | JSONPath・SQL | AI/ML・全文検索 |
| **GCP ストレージ** | Cloud SQL・BigQuery | Firestore・BigQuery | Cloud Storage |
| **全データ中の割合** | ~10-20% | ~10-15% | ~70-80% |
| **分析の難易度** | 低（容易） | 中 | 高（AI/ML 必要） |

> 📎 **参照**:  
> https://cloud.google.com/learn/what-is-structured-data  
> https://cloud.google.com/blog/topics/developers-practitioners/what-is-unstructured-data

---

## 4. データのライフサイクルとパイプライン

### 4.1 データライフサイクルの全体像

データは「生まれてから消えるまで」に複数のステージを経ます。
各ステージに適切な Google Cloud サービスを対応させることが重要です。

```
データライフサイクル:

[収集・取り込み]  →  [処理・変換]  →  [保存・格納]  →  [分析・クエリ]  →  [可視化・活用]
   Ingest              Process           Store              Analyze            Visualize

  Pub/Sub           Dataflow           BigQuery           BigQuery           Looker
  Transfer          Dataproc           Cloud SQL          Vertex AI          Looker Studio
  Service           Cloud Run          Cloud Storage      BigQuery ML        Gemini
  Storage           Cloud Functions    Bigtable           Looker
  Transfer          Datastream         Firestore          Data Studio
  Appliance
```

### 4.2 バッチ処理 vs ストリーミング処理

データの処理方式には主に 2 種類あります。
どちらを選ぶかはビジネス要件によって決まります。

```
バッチ処理（Batch Processing）:
  定義: データをある程度溜めてから、まとめて一括処理する
  
  例:
    - 毎晩深夜に前日の全取引データを集計する
    - 月末に請求書を一括生成する
    - 週次で顧客行動レポートを生成する
  
  特徴:
    ✅ 大量データを効率的に処理できる
    ✅ コストを最適化できる（深夜にまとめて処理）
    ❌ リアルタイム性がない（数時間〜1日の遅延）
  
  GCP サービス: BigQuery・Dataproc・Cloud Run Jobs

ストリーミング処理（Streaming Processing）:
  定義: データが発生したその瞬間に即座に処理する
  
  例:
    - クレジットカード不正検知（取引直後に判定）
    - 株式取引の価格更新（ミリ秒単位）
    - IoT センサーの異常値をリアルタイムで検知
    - SNS のトレンド分析（今この瞬間の話題）
  
  特徴:
    ✅ リアルタイムで結果を取得できる
    ✅ 問題を即座に検知・対応できる
    ❌ バッチより複雑・コストが高い
  
  GCP サービス: Pub/Sub + Dataflow
```

#### ✅ ベストプラクティス: 処理方式の選択

```yaml
バッチ処理を選ぶ場合:
  - データの鮮度が数時間〜1日遅れても許容できる
  - コストを最小化したい
  - 大量の履歴データを分析したい
  例: 月次売上レポート・DWH へのデータ投入

ストリーミングを選ぶ場合:
  - 数秒以内のリアルタイム性が必要
  - 異常・不正をすぐに検知する必要がある
  - 顧客体験がリアルタイム性に依存している
  例: 不正検知・IoT 監視・リアルタイムダッシュボード

ハイブリッド（Lambda/Kappa アーキテクチャ）:
  - 両方が必要な場合（過去の分析+リアルタイム監視）
  - Dataflow は同一コードでバッチ・ストリーミング両対応
```

---

## 5. Google Cloud のデータストレージサービス

### 5.1 Cloud Storage（オブジェクトストレージ）

#### Cloud Storage とは

**Cloud Storage** は、あらゆる種類のファイル（オブジェクト）を
インターネット経由で保存・取得できるストレージサービスです。

```
Cloud Storage の特徴:
  - ファイルサイズ制限なし（最大 5TB/オブジェクト）
  - グローバルにアクセス可能
  - 99.999999999%（イレブン・ナイン）の耐久性
  - 構造化・非構造化どちらのデータも保存可能
  - バケット（Bucket）という単位でデータを管理

主な用途:
  - 画像・動画・音声ファイルの保存・配信
  - 機械学習の学習データセットの格納
  - バックアップ・アーカイブ
  - ウェブサイトの静的コンテンツ配信
  - データレイクの基盤
```

#### Cloud Storage の 4 つのストレージクラス

ストレージクラスは「アクセス頻度」と「コスト」のバランスで選択します。

```
コスト構造の考え方:
  - 保存コスト: 少ないほどよい（使わないデータをStandardに置くのは無駄）
  - 取得コスト: アクセスするたびに課金される
  - 最小保存期間: 設定期間より早く削除しても課金される

                 アクセス頻度
                      ↓ 低くなる
              ┌─────────────────────────────────┐
              │ Standard  Nearline  Coldline  Archive │
 保存コスト   │ 高い  →  低い   →  さらに低い  → 最安 │
 取得コスト   │ 無料  →  課金   →  課金大きめ → 最高 │
 最小保存期間 │ なし  → 30日   →  90日      → 365日 │
              └─────────────────────────────────┘
```

| クラス | 月次保存コスト | 取得コスト | 最小保存期間 | 適したユースケース |
| --- | --- | --- | --- | --- |
| **Standard** | 高（$0.020/GB） | 無料 | なし | 頻繁にアクセスするデータ・Web コンテンツ・ML 学習データ |
| **Nearline** | 中（$0.010/GB） | あり（小） | 30日 | 月1回程度のアクセス・バックアップ・月次レポート |
| **Coldline** | 低（$0.004/GB） | あり（中） | 90日 | 四半期に1回程度のアクセス・DR バックアップ |
| **Archive** | 最安（$0.0012/GB） | あり（大） | 365日 | 年1回未満のアクセス・法令遵守のための長期保管 |

#### Cloud Storage のライフサイクル管理

```yaml
ライフサイクルポリシーの例（コスト自動最適化）:
  - ルール 1: 作成から 30 日後に Standard → Nearline へ移行
  - ルール 2: 作成から 90 日後に Nearline → Coldline へ移行
  - ルール 3: 作成から 365 日後に Coldline → Archive へ移行
  - ルール 4: 作成から 7 年後に自動削除（法的保管期限後）

効果: 手動管理なしでストレージコストを大幅に最適化
```

#### ✅ ベストプラクティス: Cloud Storage

```yaml
バケット設計:
  - リージョン選択: データのユーザーに近いリージョンを選ぶ
  - バージョニング: 重要なデータは誤削除・上書き防止のため有効化
  - ライフサイクル: 全バケットにライフサイクルポリシーを設定する

セキュリティ:
  - 均一バケットレベルアクセス（Uniform Bucket Access）を使用する
  - 公開バケットは最小限に（必要な場合のみ）
  - Cloud Audit Logs でアクセスを記録する
  - CMEK（顧客管理暗号化キー）で機密データを保護

コスト最適化:
  - ライフサイクルポリシーでデータを自動的に低コストクラスへ移行
  - リージョン間のデータ転送コストを意識してアーキテクチャを設計
  - Recommender の提案を定期的に確認する
```

> 📎 **参照**:  
> https://cloud.google.com/storage/docs/storage-classes  
> https://cloud.google.com/storage/docs/lifecycle  
> https://cloud.google.com/storage/docs/best-practices

---

## 6. Google Cloud のデータベースサービス

### 6.1 データベース選択の全体像

Google Cloud には多種多様なデータベースサービスがあります。
適切なサービスを選ぶことが試験の重要なポイントです。

```
データベース選択フロー:

                   RDB が必要？
                   /          \
                Yes            No（NoSQL）
                /                 \
    グローバル展開？           データの形式は？
       /       \              /     |      \
      Yes       No      ドキュメント 時系列  キャッシュ
      ↓         ↓        ↓        ↓       ↓
   Spanner   Cloud SQL  Firestore Bigtable Memorystore
                        
                   分析・DWH 用途？
                        ↓
                     BigQuery
```

### 6.2 Cloud SQL（マネージドリレーショナルDB）

```
Cloud SQL とは:
  - MySQL・PostgreSQL・SQL Server のフルマネージドサービス
  - OS パッチ・バックアップ・フェイルオーバーを Google が自動管理
  - 最大 64 vCPU・500 GB メモリ・64 TB ストレージ

ユースケース:
  ✅ 既存のオンプレ MySQL/PostgreSQL をクラウドへ移行
  ✅ Web アプリのバックエンド DB
  ✅ 中規模のトランザクション処理（OLTP）
  ✅ WordPress・Drupal などの CMS

制限・注意点:
  ❌ 単一リージョンのみ（グローバル展開は Spanner が必要）
  ❌ 垂直スケール主体（水平スケールは Cloud Spanner）
  ❌ 数十 TB を超える大規模分析には BigQuery が適切
```

#### Cloud SQL の高可用性（HA）構成

```
HA 構成なし（シングルゾーン）:
  ┌─────────────┐
  │  DB インスタンス │  ← ゾーン障害で停止
  │  (us-central1-a) │
  └─────────────┘
  SLA: 99.95%

HA 構成あり（マルチゾーン）:
  ┌─────────────┐     ┌─────────────┐
  │ プライマリ DB  │────►│ スタンバイ DB │
  │ (us-central1-a)│     │ (us-central1-b)│
  └─────────────┘     └─────────────┘
  ゾーン障害時に自動フェイルオーバー（60秒以内）
  SLA: 99.99%
  
本番環境では必ず HA 構成を使用すること！
```

### 6.3 Cloud Spanner（グローバル分散 RDBMS）

```
Cloud Spanner とは:
  - 世界唯一のグローバルに分散した、強一貫性を持つリレーショナル DB
  - SQL インターフェースを提供しながら、グローバルに水平スケール
  - SLA: 99.999%（月間ダウンタイム約 26 秒！）
  - 数百万 QPS（毎秒クエリ数）に対応可能

ユースケース:
  ✅ 金融システム（グローバルな取引処理）
  ✅ ゲームの世界規模のランキングシステム
  ✅ グローバル EC の在庫管理（瞬時の一貫性が必要）
  ✅ 通信会社の課金システム

費用:
  ❌ 非常に高コスト（Cloud SQL の数倍〜十数倍）
  → 本当にグローバル分散が必要な場合のみ選択
```

#### Cloud SQL vs Cloud Spanner の比較

| 比較項目 | Cloud SQL | Cloud Spanner |
| --- | --- | --- |
| **スケール** | 垂直（単一サーバー強化） | 水平（ノード追加で無限拡張） |
| **リージョン** | 単一リージョン | マルチリージョン対応 |
| **SLA** | 99.99%（HA 構成時） | 99.999% |
| **最大規模** | 64 TB | ペタバイト規模 |
| **コスト** | 比較的安価 | 非常に高価 |
| **互換性** | MySQL/PG/SQL Server | Cloud Spanner 独自 SQL |
| **選ぶ場面** | リージョン内の中規模 OLTP | グローバル展開・超大規模 OLTP |

### 6.4 Firestore（NoSQL ドキュメント DB）

```
Firestore とは:
  - サーバーレスの NoSQL ドキュメントデータベース
  - データを「ドキュメント（JSON 的な形式）」と「コレクション」で管理
  - Firebase と深く統合（モバイル/Web アプリ開発に最適）
  - リアルタイム同期機能（クライアントが自動更新を受け取る）

データモデル例:
  コレクション: users
    ドキュメント: user-12345
      - name: "田中太郎"
      - email: "tanaka@example.com"
      - created_at: 2024-01-01
      - orders: [サブコレクション...]

ユースケース:
  ✅ スマートフォンアプリのバックエンド
  ✅ リアルタイムチャットアプリ
  ✅ ゲームのユーザープロファイル・スコア管理
  ✅ ウェブアプリの設定・セッション管理

特徴:
  ✅ スキーマレス（フィールドを自由に追加できる）
  ✅ オフライン対応（接続が切れても動作し、復帰時に同期）
  ✅ 自動スケーリング
  ❌ 大規模な JOIN クエリや集計分析は得意でない
```

### 6.5 Bigtable（NoSQL ワイドカラム DB）

```
Bigtable とは:
  - Google が内部で Gmail・Google Maps・YouTube に使用してきた DB
  - 非常に大量のデータを超低レイテンシで読み書きできる
  - 単一行キーでアクセス（SQL の JOIN はなし）
  - ペタバイト規模のデータに対応

ユースケース:
  ✅ 時系列データ（IoT センサー・株価・気象データ）
  ✅ 広告データのリアルタイム処理
  ✅ 機械学習の特徴量ストア
  ✅ ユーザー行動ログの大量書き込み

特徴:
  ✅ 1秒あたり数百万の読み書き操作に対応
  ✅ ミリ秒以下の低レイテンシ
  ❌ SQL の JOIN・GROUP BY などは使えない
  ❌ 小規模データには向かない（最低 1 TB 程度から真価を発揮）

Cloud SQL との違い:
  Bigtable: 超大量データの超高速な読み書き（分析ではなく処理）
  Cloud SQL: 標準的な RDB 操作（JOIN・集計・トランザクション）
```

### 6.6 BigQuery（データウェアハウス）

```
BigQuery とは:
  - Google Cloud のサーバーレスなデータウェアハウス
  - ペタバイト規模のデータを数秒で SQL 分析できる
  - インフラ管理不要（サーバーレス）
  - 使用した分だけ課金（スキャンしたデータ量 or スロット時間）

BigQuery の革命的な点:
  従来のオンプレ DWH: 100GB のデータ分析に数時間
  BigQuery: 1TB のデータ分析が数秒〜数十秒で完了

ユースケース:
  ✅ BI・ダッシュボードのバックエンド（Looker・Looker Studio）
  ✅ アドホッククエリ（思いついたときにその場で分析）
  ✅ 機械学習モデルのトレーニングデータ管理
  ✅ ログ分析・監査
  ✅ データレイクの分析エンジン
  ✅ BigQuery ML（SQL でMLモデルを構築）

コスト最適化のポイント:
  - クエリの SELECT * を避ける（必要な列だけ指定）
  - パーティション分割テーブルを使用（フィルタで読み込み量を削減）
  - クラスタリングを活用（よく使うカラムでソート）
  - 予約スロット（定額課金）とオンデマンド課金の使い分け
```

#### BigQuery の独自機能

| 機能 | 説明 | ユースケース |
| --- | --- | --- |
| **BigQuery ML** | SQL でML モデルを構築・実行 | データアナリストが Python なしで予測モデル作成 |
| **BigQuery BI Engine** | インメモリ分析で高速レスポンス | Looker Studio との連携で秒単位の応答 |
| **BigQuery Omni** | AWS・Azure のデータも BigQuery で分析 | マルチクラウド環境のデータ分析 |
| **Gemini in BigQuery** | 自然言語でクエリ・コード生成 | SQL の知識がなくても分析可能 |
| **BigQuery DataFrames** | Python Pandas ライクに BigQuery を操作 | データサイエンティスト向け |

### 6.7 Memorystore（インメモリ DB）

```
Memorystore とは:
  - マネージドな Redis / Memcached
  - データをメモリ上に保持するため、ミリ秒以下の超低レイテンシ
  - DB の読み込み負荷を大幅に軽減するキャッシュレイヤー

ユースケース:
  ✅ セッション管理（ユーザーのログイン状態保持）
  ✅ ゲームのリーダーボード（Redis の Sorted Set を活用）
  ✅ API レスポンスのキャッシュ（同じクエリ結果を再利用）
  ✅ リアルタイムカウンター（ページビュー・いいね数）

Redis vs Memcached の選択:
  Redis:     データ構造が豊富（リスト・セット・ハッシュ）、永続化可能
  Memcached: シンプルなキー・バリュー、水平スケールに強い
  → 通常は Redis を選択することが多い
```

### 6.8 AlloyDB（PostgreSQL 互換高性能 DB）

```
AlloyDB とは:
  - Google が独自設計した PostgreSQL 互換のフルマネージド DB
  - Cloud SQL PostgreSQL より分析クエリが最大 4 倍高速
  - HTAP（Hybrid Transactional/Analytical Processing）対応
  - 完全 PostgreSQL 互換（既存のコード・ツールがそのまま動く）

Cloud SQL PostgreSQL との違い:
  - AlloyDB: トランザクション処理 AND 分析クエリ両方高速（HTAP）
  - Cloud SQL: 主にトランザクション処理（OLTP）

ユースケース:
  ✅ 高性能な PostgreSQL が必要な場合
  ✅ 同じ DB でリアルタイム分析も実行したい場合
  ✅ PostgreSQL アプリをほぼ変更なしに高性能化したい場合
```

### 6.9 全データベースサービスの比較まとめ

| サービス | タイプ | 規模 | 主な用途 | キーワード |
| --- | --- | --- | --- | --- |
| **Cloud SQL** | RDB（マネージド） | 中規模 | Web アプリ・既存 DB 移行 | MySQL・PG・SQL Server |
| **Cloud Spanner** | グローバル RDB | 超大規模 | 金融・グローバル EC | グローバル・強一貫性・99.999% |
| **AlloyDB** | PG 互換高性能 DB | 大規模 | 高性能 PG・HTAP | PostgreSQL 互換・4倍高速 |
| **Firestore** | NoSQL ドキュメント | 中〜大規模 | モバイル・Web アプリ | リアルタイム同期・サーバーレス |
| **Bigtable** | NoSQL ワイドカラム | ペタバイト | IoT・時系列・広告 | 超高スループット・低レイテンシ |
| **BigQuery** | データウェアハウス | ペタバイト | BI・分析・ML | サーバーレス・SQL 分析 |
| **Memorystore** | インメモリ | 小〜中規模 | キャッシュ・セッション | Redis・低レイテンシ |

> 📎 **参照**:  
> https://cloud.google.com/sql/docs  
> https://cloud.google.com/spanner/docs  
> https://cloud.google.com/bigquery/docs  
> https://cloud.google.com/firestore/docs  
> https://cloud.google.com/bigtable/docs  
> https://cloud.google.com/memorystore/docs  
> https://cloud.google.com/alloydb/docs

---

## 7. データ分析・BI サービス

### 7.1 Looker（エンタープライズ BI プラットフォーム）

#### Looker とは

**Looker** は、Google Cloud のエンタープライズ向け
ビジネスインテリジェンス（BI）プラットフォームです。

```
Looker の核心的な考え方: 「真実の唯一の情報源（Single Source of Truth）」

問題: 各部門が独自に Excel でデータを集計 → 数字が合わない！
  営業部門: 「今月の売上は 3,000 万円」
  経理部門: 「今月の売上は 2,850 万円」
  → どちらが正しい？ → 会議が混乱

Looker の解決策:
  - LookML という言語でデータの定義・計算ロジックを一元管理
  - 全員が同じ定義（ビジネスロジック）でデータを参照
  - 「売上の定義」は LookML に 1 つだけ存在する
  → 誰が見ても同じ数字、信頼できるデータ
```

#### LookML とは

```
LookML（Looker Modeling Language）:
  - SQL に似たメタデータ言語
  - データモデルの定義・計算ロジック・関係性を記述する
  - バージョン管理（Git）に対応

例（売上の定義を LookML で表現）:
  measure: total_revenue {
    type: sum
    sql: ${order_items.sale_price} ;;
    value_format: "¥#,###"
    label: "総売上（税抜）"
  }
  
→ この定義が変わると、全てのダッシュボードに自動反映される
```

#### Looker の主な機能

| 機能 | 説明 | ビジネス価値 |
| --- | --- | --- |
| **ダッシュボード** | 複数の可視化をまとめた画面 | 経営状況の一覧把握 |
| **Explore** | ノーコードでデータを探索 | エンジニアなしで深掘り分析 |
| **Looks** | 保存した可視化レポート | 定期レポートの自動化 |
| **Alerts** | データ変化時の通知 | 異常値・目標達成を即座に把握 |
| **Looker API** | 外部システムとの統合 | アプリへのデータ埋め込み |
| **Looker Blocks** | 業界別の分析テンプレート | 分析環境の素早い構築 |

### 7.2 Looker Studio（無料セルフサービス BI）

#### Looker Studio とは

**Looker Studio**（旧 Google Data Studio）は、
無料で使えるセルフサービスのダッシュボード作成ツールです。

```
Looker Studio の特徴:
  - 完全無料（Google アカウントがあれば誰でも使える）
  - コードなしでドラッグ&ドロップで作成
  - 30 以上のデータソースと接続可能
  - 共有・コメント機能（Google ドキュメントと同じ感覚）
  - URL で共有・埋め込み表示が可能

接続できるデータソース（主要なもの）:
  - Google Analytics（Web アクセス分析）
  - Google Ads（広告データ）
  - BigQuery（大規模データ）
  - Google Sheets（スプレッドシート）
  - Cloud SQL / MySQL / PostgreSQL
  - YouTube Analytics
  - + サードパーティコネクタ多数
```

### 7.3 Looker vs Looker Studio の比較

```
試験で最もよく問われる比較ポイント!
```

| 比較項目 | Looker | Looker Studio |
| --- | --- | --- |
| **費用** | 有料（エンタープライズライセンス） | 無料 |
| **対象ユーザー** | データチーム・大企業 | 個人・中小企業・マーケター |
| **データモデル** | LookML で厳密に定義 | 柔軟だが各人が独自定義 |
| **真実の唯一性** | ◎ 保証できる | △ 担保が難しい |
| **スケール** | 大規模な組織向け | 小〜中規模 |
| **主な用途** | 全社的な BI 基盤 | アドホックな可視化・個人レポート |
| **API** | あり（外部連携可能） | 限定的 |
| **Git 統合** | あり（バージョン管理） | なし |

#### ✅ ベストプラクティス: BI ツール選択

```yaml
Looker を選ぶ場合:
  - 大企業で部門横断の統一されたデータ文化を作りたい
  - データ定義のガバナンスが必要
  - 100人以上がデータを参照する環境
  - アプリに分析を埋め込みたい（Looker API 活用）

Looker Studio を選ぶ場合:
  - 個人・チームレベルの可視化
  - 素早くダッシュボードを作りたい
  - コストをかけられない
  - Google Analytics・広告データの可視化
```

> 📎 **参照**:  
> https://cloud.google.com/looker/docs  
> https://lookerstudio.google.com/  
> https://cloud.google.com/bigquery/docs/bi-engine-intro

---

## 8. データパイプラインとデータ統合

### 8.1 Google Cloud Pub/Sub（メッセージング）

#### Pub/Sub とは

**Pub/Sub**（パブリッシュ・サブスクライブ）は、
システム間でメッセージを非同期に送受信するためのサービスです。

```
Pub/Sub の仕組み（郵便に例えると）:

パブリッシャー（送信者）  →  Pub/Sub トピック（郵便局）  →  サブスクライバー（受信者）
   IoT センサー                  events-topic              データウェアハウス（BigQuery）
   Web サーバー                                            アラートシステム（Cloud Run）
   注文システム                                            在庫管理システム
```

#### Pub/Sub を使う理由

```
Pub/Sub なし（直接連携）の問題:
  注文システム → 在庫DB を直接更新
             → 顧客通知を直接送信
             → 分析 DB を直接更新
  
  問題1: 受信側が 1 つでも落ちると、注文処理全体が止まる
  問題2: 受信側が増えるたびに注文システムを変更する必要がある
  問題3: 受信側の処理が遅いと注文システムも遅くなる

Pub/Sub ありの解決策:
  注文システム → Pub/Sub トピック（ここまでが注文システムの責務）
                   ├─ 在庫サービス（在庫を減らす）
                   ├─ 通知サービス（メール送信）
                   └─ 分析サービス（データ蓄積）
  
  ✅ 注文システムは Pub/Sub に投稿するだけ → 他が落ちても影響なし
  ✅ 受信側を増やしても注文システムは変更不要
  ✅ 各サービスが独立して動作（疎結合）
```

#### Pub/Sub のユースケース

| ユースケース | 説明 |
| --- | --- |
| **IoT データ収集** | センサーデータをリアルタイムで収集・配信 |
| **イベント駆動アーキテクチャ** | マイクロサービス間の非同期メッセージング |
| **ストリーミングデータ分析** | Dataflow へデータを流して分析 |
| **ログ集約** | 複数サービスのログを一箇所に集める |
| **リアルタイム通知** | 特定イベント発生時の即座の通知 |

### 8.2 Cloud Dataflow（データパイプライン）

#### Dataflow とは

**Dataflow** は、バッチ処理とストリーミング処理の両方に対応した
フルマネージドのデータ処理パイプラインサービスです。

```
Dataflow の特徴:
  - Apache Beam の実行エンジン（Beam コードを実行）
  - バッチ処理とストリーミング処理を同一コードで記述できる
  - サーバーレス（インフラ管理不要・自動スケーリング）
  - 処理量に応じて自動的にワーカーを増減
  - データ変換の視覚的なパイプライン表示

典型的な処理フロー:
  [データソース]      [変換・処理（Dataflow）]      [出力先]
  
  Pub/Sub    →   フィルタリング           →   BigQuery
  GCS        →   集計・結合              →   Cloud SQL
  BigQuery   →   機密データのマスキング   →   Cloud Storage
  Cloud SQL  →   フォーマット変換        →   Pub/Sub
```

#### Dataflow のユースケース

| ユースケース | バッチ/ストリーミング | 説明 |
| --- | --- | --- |
| **ETL パイプライン** | バッチ | 複数ソースのデータを BigQuery へ投入 |
| **ログ分析** | ストリーミング | Webログをリアルタイムで集計・分析 |
| **不正検知** | ストリーミング | 取引データをリアルタイムで分析 |
| **データ品質チェック** | バッチ | データのクレンジング・バリデーション |
| **ファイル変換** | バッチ | CSV → JSON、Avro への変換 |

### 8.3 Cloud Dataproc（マネージド Hadoop/Spark）

#### Dataproc とは

**Dataproc** は、Apache Hadoop・Apache Spark クラスタを
クラウド上で迅速に立ち上げ・管理できるサービスです。

```
Dataproc を選ぶ主な理由:
  1. 既存の Hadoop/Spark ジョブをそのままクラウドへ移行したい
  2. Spark ML（機械学習）を使ったパイプラインを実行したい
  3. オープンソースエコシステム（Hive・Presto等）を使いたい

Dataproc vs Dataflow の違い:
  Dataproc:
    - Hadoop/Spark の既存コードを再利用できる
    - より細かいクラスタ設定が可能
    - オープンソース互換性を重視
    - バッチ処理が主な用途
  
  Dataflow:
    - Apache Beam の統一 API でバッチ・ストリーミング両対応
    - フルサーバーレス（クラスタ管理不要）
    - Google Cloud との統合がより深い
    - ストリーミングもバッチも同じコード

選択基準:
  既存 Hadoop/Spark コードがある → Dataproc
  新規パイプライン設計（特にストリーミング） → Dataflow
```

### 8.4 Database Migration Service（データ移行）

```
Database Migration Service とは:
  - オンプレのデータベースを Google Cloud へ移行するためのサービス
  - 最小限のダウンタイムでデータを移行（継続的なレプリケーション）
  - MySQL・PostgreSQL・Oracle・SQL Server に対応

移行の流れ:
  オンプレ DB ─── 継続レプリケーション ──► Cloud SQL / AlloyDB
  （稼働中）    （差分をリアルタイム同期）   （新環境）
  
  → 移行が完了したらトラフィックを切り替え
  → ダウンタイムを最小化できる
```

### 8.5 Datastream（変更データキャプチャ）

```
Datastream とは:
  - CDC（Change Data Capture）サービス
  - DB の変更をリアルタイムでストリーミングする
  - Oracle・MySQL・PostgreSQL の変更を BigQuery や GCS へ配信

ユースケース:
  ✅ オンプレ DB の変更をリアルタイムで BigQuery に反映
  ✅ マイクロサービス間のデータ同期
  ✅ 分析 DB のリアルタイム更新

例:
  ECサイトの注文DB（Oracle）
    └─ 注文が入るたびに変更を Datastream がキャプチャ
         └─ BigQuery のリアルタイム分析テーブルへ自動反映
              └─ Looker でリアルタイムの売上ダッシュボードを表示
```

> 📎 **参照**:  
> https://cloud.google.com/pubsub/docs  
> https://cloud.google.com/dataflow/docs  
> https://cloud.google.com/dataproc/docs  
> https://cloud.google.com/database-migration/docs

---

## 9. スマートアナリティクスの全体アーキテクチャ

### 9.1 データアーキテクチャの全体像

#### データレイクとデータウェアハウス

```
データレイク（Data Lake）:
  - あらゆる形式の生データを大量に保管する場所
  - スキーマ定義なし（スキーマオンリード）
  - Cloud Storage が中心
  - 将来の使い方を決めていないデータも保存できる
  - 例: 全ログ・全画像・全音声ファイルをとりあえず保存

データウェアハウス（Data Warehouse）:
  - 分析のために構造化・整理されたデータを格納する場所
  - スキーマ定義あり（スキーマオンライト）
  - BigQuery が中心
  - BI・レポート・分析に最適化されている
  - 例: 売上・顧客・在庫データを分析用に整形して保存

データレイクハウス（Data Lakehouse）:
  - データレイクの柔軟性 + データウェアハウスの分析性能を兼ね備える
  - BigQuery のストレージに生データも分析データも保存
  - Google Cloud ではこのアーキテクチャを推奨
```

### 9.2 代表的なデータパイプラインアーキテクチャ

#### パターン A: バッチ分析パイプライン

```
[データソース]          [転送・変換]         [分析・可視化]
                                           
業務DB（Cloud SQL）  ──► Dataflow     ──► BigQuery ──► Looker
ファイル（GCS）      ──► (日次バッチ)  ──►           ──► Looker Studio
外部データ           ──►              ──►

特徴:
  - 毎晩深夜に前日分のデータを一括処理
  - コストを最適化できる
  - リアルタイム性は不要な分析に最適
```

#### パターン B: リアルタイムストリーミングパイプライン

```
[イベント発生]        [ストリーミング]       [リアルタイム分析]

IoT デバイス    ──► Pub/Sub ──► Dataflow ──► BigQuery ──► Looker
Web クリック    ──►           ──►           ──►
注文・決済      ──►           ──►           ──►

特徴:
  - データが発生した瞬間から分析に反映
  - 不正検知・IoT監視・リアルタイムダッシュボードに最適
  - バッチより複雑でコストも高い
```

#### パターン C: ハイブリッドパイプライン（最も一般的）

```
リアルタイム:
IoT/ログ → Pub/Sub → Dataflow → BigQuery（ホットデータ）
                                      ↓
                               統合分析テーブル ──► Looker
                                      ↑
バッチ:
Cloud SQL → Dataflow → BigQuery（コールドデータ）
GCS       → Dataproc →
```

### 9.3 データメッシュ（Data Mesh）の考え方

```
データメッシュとは:
  - データを各ビジネスドメイン（部門）が所有・管理する考え方
  - 中央集権的なデータチームに頼らず、各部門がデータを提供・消費する
  - Dataplex がデータメッシュ実装を支援する Google Cloud のサービス

従来（中央集権型）:
  各部門 → データエンジニアリングチーム（ボトルネック！）→ 全社分析

データメッシュ型:
  営業部門 ──→ 自部門のデータを公開
  製造部門 ──→ 自部門のデータを公開  → Dataplex で統一管理 → 全社分析
  財務部門 ──→ 自部門のデータを公開
```

> 📎 **参照**:  
> https://cloud.google.com/architecture/data-lifecycle-cloud-best-practices  
> https://cloud.google.com/solutions/smart-analytics

---

## 10. Google Cloud のデータガバナンスとセキュリティ

### 10.1 データガバナンスとは

**データガバナンス**とは、組織のデータを
正確・安全・効率的に管理するための仕組み・プロセス・ポリシーです。

```
なぜデータガバナンスが必要か:

問題 1: データの品質が悪い
  → 意思決定の根拠となるデータが間違っていたら？
  → 分析結果への信頼が失われる

問題 2: データの所在がわからない
  → 「顧客データはどこにある？」「誰が持っている？」
  → 監査時に説明できない

問題 3: 個人情報が漏洩する
  → GDPR・個人情報保護法違反で多額の制裁金

問題 4: 不正アクセス
  → 権限のない人が機密データを参照・変更

データガバナンスで解決できること:
  ✅ データカタログで「どこに何があるか」を一覧化
  ✅ データ系譜（データリネージ）で「どこからきたか」を追跡
  ✅ アクセス制御で「誰がアクセスできるか」を管理
  ✅ データ品質ルールで「正しいデータか」を自動チェック
```

### 10.2 Dataplex（データ管理・ガバナンス基盤）

```
Dataplex とは:
  - Google Cloud の統合データ管理・ガバナンスプラットフォーム
  - BigQuery・Cloud Storage・Cloud SQL など複数サービスを横断して管理
  - データレイクのデータを自動的に分類・タグ付け・品質チェック

主な機能:
  1. データレイク管理
     - Cloud Storage と BigQuery を論理的に統合管理
     - データゾーン（生データ・キュレーション済みデータ）の管理

  2. データ品質（Data Quality）
     - データ品質ルールを定義して自動チェック
     - 例: 「顧客IDは必ず存在する」「年齢は 0〜150 の間」

  3. データ系譜（Data Lineage）
     - 「このデータはどのパイプラインを経て作られたか」を追跡
     - コンプライアンス対応・トラブルシューティングに活用

  4. セキュリティポリシーの一元管理
     - 複数サービスへのアクセス制御を一箇所で管理
```

### 10.3 Dataplex Universal Catalog（BigQuery Universal Catalog）

```
Dataplex Universal Catalog / BigQuery Universal Catalog とは:
  - 旧 Data Catalog の後継として統合されたメタデータ管理サービス
  - 組織内の全データアセット（テーブル・ファイル・BI レポート等）を
    検索・発見・管理するためのユニバーサルカタログ
  - Dataplex による自動メタデータ検出でデータアセットを自動登録
  - BigQuery 上でユニバーサルデータセット探索が可能
  - Dataplex / Policy Controller によるグロッサリー・タグ管理
  - IAM およびアクセスポリシーと統合したアクセス制御

使用例:
  「顧客の購買履歴データが欲しい」
    → Dataplex Universal Catalog で "購買" を検索
    → BigQuery の "purchase_history" テーブルが見つかる
    → テーブルの説明・オーナー・使用例を確認
    → IAM ポリシーを通じて適切なアクセス権を申請

機能:
  - Dataplex によるメタデータの自動収集・検出（BigQuery・GCS・Pub/Sub 等）
  - タグテンプレートによるカスタムメタデータの付与
  - ビジネス用語集（Glossary）の管理（Dataplex / BigQuery 統合）
  - IAM と連携したデータアクセスポリシーの一元管理
```

### 10.4 Sensitive Data Protection（機密データ保護）

```
Sensitive Data Protection（旧 Cloud DLP）とは:
  - テキスト・画像・構造化データ内の機密情報を自動検出・保護するサービス
  - 150 以上の組み込み検出器（氏名・メールアドレス・クレジットカード番号等）
  - BigQuery・Cloud Storage・Datastore に格納されたデータをスキャン

保護の手法:
  1. 検出（Inspection）: どこに個人情報があるか発見する
  2. 仮名化（Pseudonymization）: 識別子を別の識別子に置換
  3. 匿名化（De-identification）: 識別情報を完全に除去
  4. マスキング（Masking）: 「田中 太郎」→ 「*** ***」
  5. トークン化（Tokenization）: 「090-1234-5678」→ 「TOKEN-XYZ」

ユースケース:
  ✅ GDPR・個人情報保護法コンプライアンスの自動対応
  ✅ ML 学習データの個人情報を自動除去
  ✅ ログデータ中のクレジットカード番号を自動マスク
  ✅ 本番データを開発環境で使う際に個人情報を除去
```

### 10.5 データのプライバシー保護技術（試験頻出）

試験でよく問われる 3 つのプライバシー保護手法の違いを理解することが重要です。

```
┌──────────────────────────────────────────────────────────────────┐
│ 元データ: 「田中太郎、090-1234-5678、tanaka@example.com」        │
├──────────────────────────────────────────────────────────────────┤
│                                                                    │
│ ① 匿名化（Anonymization）                                        │
│    「30代男性、東京都内、メール利用者」                            │
│    → 個人を特定する情報を完全除去                                  │
│    → 再識別は（理論上）不可能                                     │
│    → GDPR の規制対象外となる                                     │
│                                                                    │
│ ② 仮名化（Pseudonymization）                                     │
│    「UID-a7f3k、080-XXXX-XXXX、user_X@example.com」              │
│    → 識別子を別の識別子（仮名）に置換                              │
│    → 変換テーブルがあれば再識別可能                               │
│    → GDPR は引き続き適用される                                   │
│                                                                    │
│ ③ 差分プライバシー（Differential Privacy）                       │
│    → 統計的なノイズを加えて個人の情報を保護する数学的手法         │
│    → 集団全体の傾向は分析できるが、個人の情報は漏れない           │
│    → Google・Apple が大規模に活用                                │
│                                                                    │
└──────────────────────────────────────────────────────────────────┘
```

| 手法 | 再識別の可能性 | GDPR 対象 | 主な用途 |
| --- | --- | --- | --- |
| **匿名化** | 不可能（理論上） | 対象外 | データの公開・共有 |
| **仮名化** | 可能（変換テーブル必要） | 対象 | 開発・テスト環境 |
| **差分プライバシー** | 困難 | 状況による | 統計分析・ML 学習 |

### 10.6 データのアクセス制御

```
BigQuery のアクセス制御レベル:

組織レベル:
  Organization Admin → 全データセットへのアクセス権を管理

プロジェクトレベル:
  bigquery.admin    → プロジェクト内の全データを管理
  bigquery.dataOwner → データセットを所有・管理
  bigquery.dataViewer → データの読み取り専用

データセットレベル:
  特定のデータセットに対してアクセス権を付与
  例: 財務チームは finance_dataset のみ参照可能

テーブルレベル（行・列レベルセキュリティ）:
  行レベルセキュリティ:
    → 田中（東京支社）は東京の売上データのみ見える
    → 鈴木（大阪支社）は大阪の売上データのみ見える
  
  列レベルセキュリティ（ポリシータグ）:
    → 一般社員は顧客名・購買額まで見える
    → 管理職は追加でクレジットカード番号も見える
```

> 📎 **参照**:  
> https://cloud.google.com/dataplex/docs  
> https://cloud.google.com/dlp/docs  
> https://cloud.google.com/bigquery/docs/column-level-security-intro  
> https://cloud.google.com/data-catalog/docs

---

## 11. ビジネスユースケース別 データ活用パターン

### 11.1 小売・EC 業界でのデータ活用

```
課題: 売上を伸ばしたい・在庫ロスを減らしたい

データ活用の全体像:

[データ収集]           [分析・AI]              [ビジネス効果]

POS データ       →  BigQuery      →  Looker      → 売上ダッシュボード
Web 行動ログ     →  Vertex AI     →            → パーソナライズ推薦
在庫データ       →  BigQuery ML   →            → 需要予測・自動発注
顧客レビュー     →  NL API        →            → 品質改善施策
画像（商品）     →  Vision API    →            → 不良品自動検出
```

#### 具体的な活用例

| 課題 | データ | GCP サービス | 効果 |
| --- | --- | --- | --- |
| 顧客離脱を予測したい | 購買履歴・行動ログ | BigQuery ML + Vertex AI | 離脱 3 週間前に介入できる |
| 在庫を最適化したい | POS・天気・カレンダー | BigQuery + Vertex AI | 欠品率 30% 削減 |
| レコメンドを改善したい | 閲覧・購買履歴 | Recommendations AI | CV率 15% 向上 |
| レビューを分析したい | 顧客レビューテキスト | Natural Language API | 製品改善サイクル短縮 |

### 11.2 製造業でのデータ活用

```
課題: 品質不良を減らしたい・設備ダウンタイムを削減したい

IoT センサーデータ（温度・振動・圧力）
    ↓
Pub/Sub（リアルタイム取り込み）
    ↓
Dataflow（異常値フィルタリング・集計）
    ↓
BigQuery（履歴データ蓄積） → Vertex AI（予兆検知モデル）
    ↓
アラート発報 → 設備保全チームへ通知

効果:
  ✅ 設備の故障を 2 週間前に予測
  ✅ 計画外停止を 40% 削減
  ✅ 保全コストの最適化
```

### 11.3 金融業でのデータ活用

```
課題: 不正取引を即座に検知したい

取引データ（毎秒数万件）
    ↓
Pub/Sub（ストリーミング取り込み）
    ↓
Dataflow（リアルタイム特徴量計算）
    ↓
Vertex AI（不正検知モデル・1ミリ秒以内に判定）
    ↓
✅ 正常 → 決済承認
❌ 不正 → 取引停止・アラート

BigQuery に全データを蓄積 → モデルの継続的な改善

効果:
  ✅ 不正検知率が大幅向上
  ✅ 正常取引の誤検知を削減
  ✅ リアルタイム（1秒以内）の判定
```

### 11.4 医療業界でのデータ活用

```
課題: 診断精度を上げたい・業務効率化

医療画像（レントゲン・CT・MRI）
    ↓
Cloud Storage（HIPAA 準拠ストレージ）
    ↓
Cloud Healthcare API（HL7 FHIR 対応）
    ↓
Vertex AI（医療画像 AI / Medical Imaging）
    ↓
診断支援・所見の自動生成

注意事項:
  - 医療データは HIPAA（米国）・個人情報保護法の対象
  - Google Cloud は HIPAA BAA（事業提携契約）に対応
  - データ暗号化・アクセスログが必須
```

---

## 12. Section 2 総まとめ・頻出問題パターン

### 12.1 最重要用語の一問一答

```
Q: 構造化・半構造化・非構造化データの例を各1つ挙げよ
A: 構造化=売上テーブル（CSV）、半構造化=API レスポンス（JSON）、
   非構造化=カスタマーレビューのテキスト・商品画像

Q: BigQuery を一言で表すと？
A: サーバーレスでペタバイト規模のデータを SQL で分析できるデータウェアハウス

Q: Looker と Looker Studio の最大の違いは？
A: Looker は有料のエンタープライズ BI（LookML でデータ定義を一元管理）、
   Looker Studio は無料のセルフサービス BI

Q: Pub/Sub の役割は？
A: サービス間のメッセージを非同期に配信するメッセージングサービス（疎結合化）

Q: Dataflow vs Dataproc の違いは？
A: Dataflow は Beam ベースのサーバーレスパイプライン（バッチ+ストリーミング）、
   Dataproc はマネージド Hadoop/Spark（既存コードの移行に向く）

Q: Cloud Storage のストレージクラスを安い順に並べよ
A: Archive（最安）< Coldline < Nearline < Standard（最高）

Q: 匿名化と仮名化の違いは？
A: 匿名化=再識別不可能（GDPR 対象外）、仮名化=変換テーブルで再識別可能（GDPR 対象）

Q: リアルタイム分析に必要な GCP サービスは？
A: Pub/Sub（取り込み）→ Dataflow（処理）→ BigQuery（保存・分析）

Q: IoT センサーデータの格納に最適な DB は？
A: Bigtable（時系列の超大量データを超低レイテンシで読み書き）

Q: データガバナンスのツールは？
A: Dataplex（総合管理）・Data Catalog（メタデータ検索）・
   Sensitive Data Protection（個人情報保護）
```

### 12.2 よく出る問題パターンと解法

#### パターン 1: データベース選択

```
問題: 「世界中のユーザーが同時に在庫を更新するグローバル EC を
        構築したい。どの DB が最適か？」

解法のステップ:
  1. RDB が必要か？ → はい（在庫の整合性が必要）
  2. グローバル展開が必要か？ → はい（世界中のユーザー）
  3. 強一貫性が必要か？ → はい（二重販売を防ぐ）
  
  → Cloud Spanner が正解

答え: Cloud Spanner
理由: グローバル展開・強一貫性・99.999% SLA・水平スケール
```

#### パターン 2: ストレージクラス選択

```
問題: 「規制上 7 年間保持が必要な財務レポートがある。
        年に 1 回の監査時にのみアクセスする。
        最もコストを最適化するにはどのクラスを使うべきか？」

解法:
  - アクセス頻度: 年 1 回 → 非常に低い
  - 保存期間: 7 年 → Archive の最小保存期間（365日）を超える
  - 目的: コスト最適化

答え: Archive
理由: 最安コスト・年 1 回以下のアクセス・7年保存に適合
```

#### パターン 3: データパイプライン選択

```
問題: 「クレジットカードの不正取引を取引直後に検知したい。
        どのアーキテクチャが最適か？」

解法:
  - リアルタイム性: 取引直後 → ストリーミング処理
  - データ収集: Pub/Sub（大量の取引データを受け取る）
  - リアルタイム処理: Dataflow（特徴量計算・モデル呼び出し）
  - 判定: Vertex AI（不正検知モデル）

答え: Pub/Sub → Dataflow → Vertex AI（+ BigQuery への保存）
```

#### パターン 4: BI ツール選択

```
問題: 「大企業全社で統一されたデータ定義に基づく
        ダッシュボードを構築したい。
        どのツールが最適か？」

解法:
  - 「全社統一」「データ定義の一元管理」→ LookML が必要
  - 「大企業・エンタープライズ」→ Looker（有料）
  - Looker Studio は無料だが LookML 管理機能がない

答え: Looker
理由: LookML による「真実の唯一の情報源」の実現
```

### 12.3 混同しやすいポイントの整理

| 混同パターン | 正しい理解 |
| --- | --- |
| BigQuery = データベース | BigQuery はデータウェアハウス（DWH）。OLTP には向かない |
| Dataflow = Dataproc | Dataflow は Beam ベース（サーバーレス）、Dataproc は Hadoop/Spark |
| Looker = Looker Studio | Looker は有料エンタープライズ BI、Looker Studio は無料セルフサービス |
| 匿名化 = 仮名化 | 匿名化は再識別不可、仮名化は再識別可能（変換テーブル必要） |
| Cloud SQL = BigQuery | Cloud SQL は OLTP（RDB）、BigQuery は OLAP（DWH・分析） |
| Bigtable = BigQuery | Bigtable は NoSQL 時系列 DB、BigQuery は SQL 分析 DWH |
| Pub/Sub = Dataflow | Pub/Sub はメッセージング（配信）、Dataflow はデータ処理（変換） |

### 12.4 Section 2 チェックリスト

```
試験前の最終確認:

□ 構造化・半構造化・非構造化データの違いと例を説明できる
□ データ分析の4レベル（記述・診断・予測・処方）を説明できる
□ Cloud Storage の 4 ストレージクラスと使い分けを説明できる
□ ライフサイクルポリシーの目的と設定方法を理解している
□ データベース選択フロー（RDB vs NoSQL・規模・用途）を理解している
□ BigQuery の特徴（サーバーレス・SQL 分析・DWH）を説明できる
□ Looker と Looker Studio の違いを明確に説明できる
□ Pub/Sub・Dataflow・Dataproc の役割の違いを説明できる
□ バッチ処理とストリーミング処理の使い分けを理解している
□ 匿名化・仮名化・差分プライバシーの違いを説明できる
□ Dataplex・Data Catalog・Sensitive Data Protection の役割を説明できる
□ データガバナンスとはなにか、なぜ重要かを説明できる
```

---

## 13. 公式参照リソース一覧

| カテゴリ | リソース | URL |
| --- | --- | --- |
| **試験情報** | CDL 試験概要ページ | https://cloud.google.com/learn/certification/cloud-digital-leader |
| **試験情報** | 試験ガイド PDF | https://services.google.com/fh/files/misc/cdl_exam_guide_english.pdf |
| **データ概念** | スマートアナリティクス概要 | https://cloud.google.com/solutions/smart-analytics |
| **データ概念** | データライフサイクル管理 | https://cloud.google.com/architecture/data-lifecycle-cloud-best-practices |
| **Cloud Storage** | ストレージクラス | https://cloud.google.com/storage/docs/storage-classes |
| **Cloud Storage** | ライフサイクル管理 | https://cloud.google.com/storage/docs/lifecycle |
| **Cloud Storage** | ベストプラクティス | https://cloud.google.com/storage/docs/best-practices |
| **Cloud SQL** | 概要ドキュメント | https://cloud.google.com/sql/docs |
| **Cloud SQL** | 高可用性構成 | https://cloud.google.com/sql/docs/mysql/high-availability |
| **Cloud Spanner** | 概要ドキュメント | https://cloud.google.com/spanner/docs |
| **Firestore** | 概要ドキュメント | https://cloud.google.com/firestore/docs |
| **Bigtable** | 概要ドキュメント | https://cloud.google.com/bigtable/docs |
| **BigQuery** | 概要ドキュメント | https://cloud.google.com/bigquery/docs |
| **BigQuery** | BigQuery ML | https://cloud.google.com/bigquery/docs/bqml-introduction |
| **BigQuery** | コスト最適化 | https://cloud.google.com/bigquery/docs/best-practices-costs |
| **AlloyDB** | 概要ドキュメント | https://cloud.google.com/alloydb/docs |
| **Memorystore** | 概要ドキュメント | https://cloud.google.com/memorystore/docs |
| **Looker** | 概要ドキュメント | https://cloud.google.com/looker/docs |
| **Looker Studio** | 概要ドキュメント | https://lookerstudio.google.com/ |
| **Pub/Sub** | 概要ドキュメント | https://cloud.google.com/pubsub/docs |
| **Dataflow** | 概要ドキュメント | https://cloud.google.com/dataflow/docs |
| **Dataproc** | 概要ドキュメント | https://cloud.google.com/dataproc/docs |
| **Datastream** | 概要ドキュメント | https://cloud.google.com/datastream/docs |
| **Dataplex** | 概要ドキュメント | https://cloud.google.com/dataplex/docs |
| **Data Catalog** | 概要ドキュメント | https://cloud.google.com/data-catalog/docs |
| **Sensitive Data Protection** | 概要ドキュメント | https://cloud.google.com/dlp/docs |
| **BigQuery セキュリティ** | 列レベルセキュリティ | https://cloud.google.com/bigquery/docs/column-level-security-intro |
| **Database Migration** | 概要ドキュメント | https://cloud.google.com/database-migration/docs |

---

*本ガイドは Google Cloud Digital Leader（CDL）試験の Section 2 に特化した学習資料です。*  
*試験の最新情報は必ず公式サイト（https://cloud.google.com/learn/certification/cloud-digital-leader）でご確認ください。*  
*作成日: 2026年4月*
