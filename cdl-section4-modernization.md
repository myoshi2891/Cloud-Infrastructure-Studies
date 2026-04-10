# Section 4: Google Cloud によるインフラとアプリケーションのモダナイゼーション

## (Modernize Infrastructure and Applications with Google Cloud)

## 完全攻略ガイド（初学者向け・ステップバイステップ解説）

> **対象読者**: クラウド初学者・インフラ担当者・アプリケーション開発者
> **試験配点**: Section 4 は全体の約 **17%** を占める重要セクション
> **学習目標**: コンピューティング・コンテナ・サーバーレス・DevOps・ハイブリッドの概念とサービスを理解する

---

## 📋 目次

1. [Section 4 の出題範囲と学習ポイント](#1-section-4-の出題範囲と学習ポイント)
2. [インフラ・アプリのモダナイゼーションとは](#2-インフラアプリのモダナイゼーションとは)
3. [コンピューティングサービスの選択](#3-コンピューティングサービスの選択)
4. [コンテナと Kubernetes（GKE）](#4-コンテナと-kubernetesgke)
5. [サーバーレスコンピューティング](#5-サーバーレスコンピューティング)
6. [ネットワークサービスとハイブリッド接続](#6-ネットワークサービスとハイブリッド接続)
7. [ハイブリッドクラウドとマルチクラウド管理](#7-ハイブリッドクラウドとマルチクラウド管理)
8. [DevOps と CI/CD パイプライン](#8-devops-と-cicd-パイプライン)
9. [アプリケーションのモダナイゼーションパターン](#9-アプリケーションのモダナイゼーションパターン)
10. [API 管理と統合サービス](#10-api-管理と統合サービス)
11. [コスト最適化の実践](#11-コスト最適化の実践)
12. [Section 4 総まとめ・頻出問題パターン](#12-section-4-総まとめ頻出問題パターン)
13. [公式参照リソース一覧](#13-公式参照リソース一覧)

---

## 1. Section 4 の出題範囲と学習ポイント

### 1.1 試験における Section 4 の位置づけ

Google Cloud Digital Leader（CDL）試験の Section 4 は
「**Google Cloud によるインフラとアプリケーションのモダナイゼーション**」がテーマです。

```text
Section 4 で問われる主なこと:
┌────────────────────────────────────────────────────────────────────┐
│ ① コンピューティングサービス（VM・コンテナ・サーバーレス）の使い分け  │
│ ② コンテナと Kubernetes（GKE）の仕組みとメリット                    │
│ ③ Cloud Run・Cloud Functions のサーバーレスの特徴                   │
│ ④ VPC・ロードバランサー・CDN・オンプレ接続の役割                    │
│ ⑤ Anthos によるハイブリッド・マルチクラウド管理                     │
│ ⑥ CI/CD・DevOps・SRE の考え方と Google Cloud でのツール            │
│ ⑦ マイクロサービス・API 管理の概念と Cloud Endpoints               │
└────────────────────────────────────────────────────────────────────┘
```

### 1.2 Section 4 のサブトピック一覧

| # | サブトピック | 重要度 |
| --- | --- | --- |
| 1 | モダナイゼーションの必要性と手順 | ★★★ |
| 2 | Compute Engine（IaaS VM） | ★★★ |
| 3 | GKE（コンテナ/Kubernetes） | ★★★ |
| 4 | Cloud Run（サーバーレスコンテナ） | ★★★ |
| 5 | Cloud Run Functions（FaaS） | ★★★ |
| 6 | VPC・ファイアウォール・ロードバランサー | ★★★ |
| 7 | Cloud VPN・Cloud Interconnect | ★★★ |
| 8 | Anthos（ハイブリッド/マルチクラウド） | ★★★ |
| 9 | Cloud Build・Cloud Deploy（CI/CD） | ★★☆ |
| 10 | マイクロサービスと API 管理 | ★★☆ |

---

## 2. インフラ・アプリのモダナイゼーションとは

### 2.1 なぜモダナイゼーションが必要か

**モダナイゼーション（近代化）**とは、
古い技術・アーキテクチャを現代的なクラウドネイティブな手法に移行することです。

```text
レガシーシステムが抱える課題:
┌─────────────────────────────────────────────────────────────────┐
│ 課題 1: 俊敏性の欠如                                             │
│  → 新機能リリースに数ヶ月かかる（ビジネスチャンスを逃す）           │
│  → テスト・デプロイが手動で時間がかかる                            │
│                                                                  │
│ 課題 2: スケーラビリティの限界                                    │
│  → トラフィック増加に対応できずサービス停止                        │
│  → ハードウェアを増強するのに調達期間が必要                        │
│                                                                  │
│ 課題 3: 高い運用コスト                                            │
│  → 老朽化したインフラのメンテナンスに多大なリソース                 │
│  → 使っていないサーバーの維持費も固定でかかる                       │
│                                                                  │
│ 課題 4: 技術的負債の蓄積                                          │
│  → 古い言語・フレームワークを維持するエンジニアが不足               │
│  → セキュリティパッチが当たらない脆弱なシステム                     │
│                                                                  │
│ 課題 5: イノベーションの阻害                                       │
│  → 新技術（AI/ML・コンテナ等）の活用が困難                         │
│  → 変更が怖くて改善できない（「触るな危険」状態）                   │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 モダナイゼーションの 3 段階

```text
モダナイゼーションは一気に行わず、段階的に進めるのがベストプラクティス

Stage 1: リフト＆シフト（Lift & Shift）
  → オンプレの VM をそのままクラウドへ移行
  → 最速・最低リスク・クラウドの恩恵は最小
  → Compute Engine（IaaS VM）を活用

Stage 2: クラウド最適化（Cloud-Optimized）
  → マネージドサービス（Cloud SQL・GKE 等）を活用
  → コンテナ化・オートスケーリング・マネージド DB
  → 運用負荷削減・スケーラビリティ向上

Stage 3: クラウドネイティブ（Cloud-Native）
  → マイクロサービスアーキテクチャ
  → サーバーレス・コンテナ・DevOps・CI/CD
  → クラウドのメリットを最大限に活用
  → 最もコストと時間がかかるが、長期的に最大の価値

どこから始めるべきか:
  ✅ まず Stage 1 で素早くクラウドへ移行（Quick Win）
  ✅ 運用しながら Stage 2, 3 へ段階的に移行
  ✅ ビジネス価値の高いシステムから優先的に Stage 3 へ
```

### 2.3 モダナイゼーションのビジネス価値

| 課題 | モダナイゼーション後の効果 |
| --- | --- |
| 機能リリースが遅い | CI/CD で 1 日複数回のリリースが可能に |
| スケーリングできない | オートスケーリングで需要に自動対応 |
| 運用コストが高い | マネージドサービス・サーバーレスでインフラ管理を削減 |
| 障害対応が大変 | マイクロサービスで障害の影響を局所化 |
| 新技術の活用が困難 | クラウドネイティブで AI/ML・生成 AI を即座に活用 |

> 📎 **参照**:
> <https://cloud.google.com/architecture/framework/system-design/workload-management>
> <https://cloud.google.com/solutions/application-modernization>

---

## 3. コンピューティングサービスの選択

### 3.1 Google Cloud のコンピューティングサービス全体像

```text
コンピューティングサービスの比較軸:

           管理の複雑さ（高 → 低）
    ←─────────────────────────────────────→

    Compute   GKE       Cloud    Cloud Run  App
    Engine    Standard  Run      Functions  Engine
    (VM)      (K8s)     (コンテナ (FaaS)   (PaaS)
                        SLS)

    ↑                                        ↑
  最大の柔軟性                           最大の抽象化
  OS まで制御                          コードだけ書く
  管理負荷大                           管理負荷最小
```

### 3.2 Compute Engine（仮想マシン / IaaS）

#### Compute Engine とは

**Compute Engine** は Google Cloud の IaaS サービスで、
仮想マシン（VM）を提供します。OS からアプリまで自分で管理します。

```text
Compute Engine の特徴:

  - 100 以上のマシンタイプ（vCPU 1〜416、メモリ最大 11.7 TB）
  - カスタムマシンタイプ（必要な CPU・メモリを自由に指定）
  - 60 秒単位の課金（最初の 1 分以降）
  - 自動再起動・ライブマイグレーション（メンテナンス時も無停止）
  - Shielded VM（改ざん防止・セキュアブート）
  - Confidential VM（処理中のデータも暗号化）

```

#### マシンタイプの種類と選択基準

| シリーズ | 特徴 | 最適なワークロード |
| --- | --- | --- |
| **E2** | コスト最安・汎用 | 開発・テスト環境・小規模 Web |
| **N2 / N4** | 汎用バランス | 幅広い本番ワークロード |
| **C3 / C4** | 高 CPU パフォーマンス | ゲームサーバー・HPC・科学計算 |
| **M3** | 超大容量メモリ | SAP HANA・大規模インメモリ DB |
| **A2 / A3** | NVIDIA GPU 搭載 | AI/ML 学習・グラフィックス |
| **T2D / T2A** | ARM ベース（コスト効率） | Web サーバー・コンテナ |

#### Compute Engine のコスト最適化オプション

```text
① Spot VM（旧 Preemptible VM）:

   - 通常価格の最大 91% 安
   - Google のインフラ余剰リソースを使用
   - 最大 24 時間で Google が中断する場合がある
   - 中断されても問題ないバッチ処理・ML 学習・レンダリングに最適
   - 例: 夜間のデータ処理ジョブを Spot VM で実行 → コスト 90% 削減

② Committed Use Discount（CUD）:

   - 1 年または 3 年のコミットメントで最大 57% 割引
   - 安定したワークロードに最適
   - Resource-based（vCPU・メモリ単位）
   - Spend-based（金額ベースのコミット）

③ Sustained Use Discount（SUD）:

   - 追加設定なしで自動適用
   - 月の 25% 以上稼働で割引開始、最大 30% 割引
   - 最も簡単なコスト削減方法（何もしなくても適用）

コスト最適化の優先順位:

  1. まず Sustained Use Discount を確認（自動適用）
  2. 安定稼働する VM に Committed Use Discount を適用
  3. バッチ処理には Spot VM を活用
  4. Recommender でサイジング見直しを確認

```

#### Managed Instance Group（MIG）

```text
Managed Instance Group とは:

  - 同一設定の VM を複数まとめて管理するグループ
  - インスタンステンプレートから自動的に VM を作成・管理

主な機能:
  ① オートスケーリング:
     CPU 使用率・リクエスト数・カスタムメトリクスに応じて VM を自動増減
     例: トラフィック増加時に VM を 3 台 → 10 台に自動増設

  ② 自動ヒーリング（Autohealing）:
     VM が異常になった場合、自動的に削除・再作成
     ヘルスチェックで異常を検知

  ③ リージョナル MIG:
     複数ゾーンに VM を分散配置
     1 ゾーンが障害になっても他ゾーンで継続

  ④ ローリングアップデート:
     新バージョンへの更新を一気にではなく順次実施
     サービスを停止せずにアップデート可能

高可用性のベストプラクティス:
  ✅ リージョナル MIG を使用して複数ゾーンに分散
  ✅ ヘルスチェックを設定して異常 VM を自動修復
  ✅ ロードバランサーと組み合わせて均等にトラフィックを分散
```

#### ✅ ベストプラクティス: Compute Engine

```yaml
セキュリティ:

  - OS Login を使用して SSH 鍵を IAM で管理
  - 外部 IP アドレスは最小限に（Cloud NAT・IAP を活用）
  - Shielded VM を有効化してハードウェアレベルの改ざん防止
  - Confidential VM で機密処理ワークロードを保護

コスト最適化:

  - 開発環境の VM は業務時間外に自動停止（Instance Schedules を利用）
  - 右サイズ化: Recommender の推奨を定期確認
  - 安定ワークロードには CUD を適用
  - バッチ処理には Spot VM を活用

高可用性:

  - 本番 VM はリージョナル MIG で複数ゾーンに配置
  - ヘルスチェックとオートヒーリングを必ず設定
  - スナップショットを定期的に取得（バックアップ）

```

> 📎 **参照**:
> <https://cloud.google.com/compute/docs>
> <https://cloud.google.com/compute/docs/machine-resource>
> <https://cloud.google.com/compute/docs/instances/spot>

---

## 4. コンテナと Kubernetes（GKE）

### 4.1 コンテナとは何か

```text
コンテナとは:

  - アプリとその実行に必要な「すべての依存関係」をパッケージ化した軽量な実行環境
  - Docker コンテナが現在の標準

VM とコンテナの違い（重要！）:

  ┌──────────────────────────┐    ┌──────────────────────────┐
  │         VM               │    │      コンテナ             │
  │                          │    │                          │
  │  App A  │  App B         │    │  App A  │  App B         │
  │  Libs   │  Libs          │    │  Libs   │  Libs          │
  │  Guest OS│  Guest OS     │    │  ─────────────────────   │
  │  ────────────────────    │    │  コンテナランタイム        │
  │  Hypervisor              │    │  ─────────────────────   │
  │  Host OS                 │    │  ホスト OS               │
  │  Hardware                │    │  Hardware                │
  └──────────────────────────┘    └──────────────────────────┘

  VM:
    ❌ 起動に数分かかる
    ❌ 数 GB のサイズ
    ❌ Guest OS 分の余分なリソース消費
    ✅ 完全な分離（より強固なセキュリティ）

  コンテナ:
    ✅ 起動が数秒
    ✅ 数 MB〜数百 MB のサイズ
    ✅ OS を共有するため軽量・高密度
    ✅ 環境の一貫性（「自分の PC では動くのに...」を解消）
    ❌ VM ほど完全な分離ではない
```

#### コンテナのビジネス価値

```text
コンテナが解決するビジネス上の課題:

課題: 「開発環境では動くのに本番で動かない」
解決: コンテナはアプリ + 全依存関係をパッケージ化
      → どこで実行しても同じ動作を保証

課題: 「環境構築に何日もかかる」
解決: コンテナイメージを pull して起動するだけ（数分）

課題: 「サーバーのリソースが無駄になっている」
解決: コンテナは軽量なので 1 台のサーバーに多数を詰め込める
      → リソース使用効率が大幅向上

課題: 「デプロイが怖い・手動で時間がかかる」
解決: コンテナ + CI/CD で自動デプロイ・即座のロールバック
```

### 4.2 Kubernetes とは

```text
Kubernetes とは:

  - コンテナを大量に管理・自動化するオーケストレーションシステム
  - Google が内部で使用していたシステムを 2014 年に OSS として公開
  - 現在は CNCF（Cloud Native Computing Foundation）が管理

コンテナが増えると起きる問題:
  コンテナ 1 台なら手動管理でもOK
  コンテナ 100 台になったら？
  コンテナ 1000 台になったら？
  → どのサーバーで動かすか
  → 障害が起きたときに自動で再起動するか
  → トラフィックをどう分散するか
  → 新バージョンにどう更新するか
  → 全部手動では無理！→ Kubernetes が自動管理

Kubernetes が自動化すること:
  ✅ スケジューリング: コンテナをどのサーバーで動かすか自動決定
  ✅ 自己修復: 落ちたコンテナを自動再起動
  ✅ スケーリング: 負荷に応じてコンテナ数を自動調整
  ✅ ローリングアップデート: 無停止でアプリを更新
  ✅ ロードバランシング: コンテナ間でトラフィックを分散
  ✅ サービスディスカバリ: コンテナがお互いを自動で見つける
```

### 4.3 Google Kubernetes Engine（GKE）

```text
GKE とは:

  - Google Cloud のマネージド Kubernetes サービス
  - Kubernetes の複雑なインフラ管理を Google が代わりに実施
  - Google 自身が Kubernetes を開発したため、最高品質の実装

GKE がマネージドにしてくれること:
  ✅ コントロールプレーン（Kubernetes の管理サーバー）の管理
  ✅ ノード（実際にコンテナが動く VM）の OS パッチ自動適用
  ✅ Kubernetes バージョンの自動アップグレード
  ✅ モニタリング・ログ収集との自動統合
  ✅ 組み込みのセキュリティ（Workload Identity 等）
```

#### GKE の 2 つのモード

```text
GKE Standard（標準モード）:

  - ユーザーがノード（VM）プールを管理
  - ノードの OS・設定を細かく制御できる
  - GPU ノード・特定の OS が必要な場合
  - 課金: ノード VM の費用

  適用場面:
    ✅ GPU を使った AI/ML ワークロード
    ✅ 特定のノード設定が必要な特殊ワークロード
    ✅ ノードをきめ細かく制御したいチーム

GKE Autopilot（自動操縦モード）:

  - Google がノードを完全管理（ユーザーはノードを意識しない）
  - セキュリティ・スケーリングが最適化済み
  - Workload Identity・Shielded Nodes が自動有効化
  - 課金: Pod（コンテナ）の使用リソース単位

  適用場面:
    ✅ Kubernetes を使いたいがインフラ管理したくない
    ✅ 少人数チーム・スタートアップ
    ✅ 運用負荷を最小化したい場合
    ✅ Google 推奨のベストプラクティスに従いたい場合

選択基準:
  運用負荷を最小化 → Autopilot
  細かいノード制御・GPU が必要 → Standard
```

#### GKE の重要な概念

```text
Pod（ポッド）:

  - Kubernetes の最小デプロイ単位
  - 1つ以上のコンテナを含む
  - 同じ Pod 内のコンテナはネットワーク・ストレージを共有

  例: Web アプリ Pod = [メインアプリコンテナ + ログ収集コンテナ]

Deployment（デプロイメント）:

  - Pod の望ましい状態（何台起動するか）を宣言的に定義
  - 「常に 3 台の Pod が動いている状態」を維持する

Service（サービス）:

  - Pod へのネットワークアクセスを安定した IP で提供
  - Pod が再起動して IP が変わっても、Service の IP は変わらない

Namespace（名前空間）:

  - クラスタ内でリソースを論理的に分離する仕組み
  - 例: 開発環境と本番環境を同じクラスタで分離

Horizontal Pod Autoscaler（HPA）:

  - CPU・メモリ使用率に応じて Pod 数を自動増減
  - 例: CPU 70% 超えで Pod を 3 台 → 6 台に自動増加

Cluster Autoscaler:

  - Pod が増えてノードのリソースが足りなくなったら、自動でノードを追加
  - Pod が減ってノードが余ったら、自動でノードを削除

```

#### ✅ ベストプラクティス: GKE

```yaml
コスト最適化:

  - Autopilot では未使用リソースへの課金がないのでコスト効率が高い
  - Spot ノードプールを Non-Critical ワークロードに活用（最大 60% 削減）
  - Cluster Autoscaler を有効化して不要ノードを自動削除
  - Resource requests/limits を適切に設定して過剰プロビジョニングを防ぐ

セキュリティ:

  - Workload Identity を使用（サービスアカウントキーをコンテナに入れない）
  - Private Cluster（プライベートクラスタ）でノードに外部 IP を付与しない
  - Network Policies でポッド間の通信を最小権限で制御
  - Container Registry / Artifact Registry の脆弱性スキャンを有効化

高可用性:

  - リージョナルクラスタ（3 ゾーンに分散）で耐障害性を確保
  - PodDisruptionBudget で更新時の最小稼働 Pod 数を保証
  - Liveness/Readiness Probe を必ず設定（異常 Pod の自動検知）

```

> 📎 **参照**:
> <https://cloud.google.com/kubernetes-engine/docs>
> <https://cloud.google.com/kubernetes-engine/docs/concepts/autopilot-overview>
> <https://cloud.google.com/kubernetes-engine/docs/best-practices>

---

## 5. サーバーレスコンピューティング

### 5.1 サーバーレスとは何か

```text
サーバーレスとは:
  「サーバーが存在しない」わけではなく
  「サーバーの存在を意識する必要がない」ということ

  開発者の観点:

    - サーバーのプロビジョニング不要
    - OS パッチ・スケーリング設定不要
    - コードを書いてデプロイするだけ
    - アイドル時のコストゼロ（使ったときだけ課金）

  Google が代わりにやってくれること:

    - インフラの調達・設定
    - OS・ランタイムのパッチ適用
    - 負荷に応じた自動スケーリング（0 → N → 0）
    - 高可用性の確保

サーバーレスのビジネス価値:
  ✅ 開発者がビジネスロジックに集中できる
  ✅ アクセスがない間のコストがゼロ
  ✅ 急激なトラフィック増にも自動対応
  ✅ 運用チームが不要（インフラ管理工数削減）
```

### 5.2 Cloud Run（サーバーレスコンテナ）

```text
Cloud Run とは:

  - コンテナをサーバーレスで実行するフルマネージドサービス
  - HTTP/gRPC リクエストを受け付けるコンテナを「そのまま」デプロイ
  - リクエストがない時: インスタンス 0（コストゼロ）
  - リクエストが来たとき: 自動でインスタンスを起動して処理

特徴:

  - どんな言語でも実行可能（コンテナのため言語・フレームワーク不問）
  - 最小インスタンス数を 0 に設定可能（コスト最小化）
  - 最大 1000 インスタンスまで自動スケール
  - Cold Start（初回起動時の遅延）はある（最小インスタンスを 1 以上に設定で解消）
  - トラフィック分割で複数リビジョン間のカナリアデプロイが可能

Cloud Run の課金:

  - リクエスト処理中の CPU・メモリ時間のみ課金
  - アイドル時間は課金なし（最小インスタンス 0 の場合）

  例:
    EC サイトのバックエンド API
    → 普段は 2 インスタンス（安定稼働）
    → セール時は自動で 100 インスタンスに拡張
    → セール後は再び 2 インスタンスに縮小
    → 手動でスケーリング設定は不要！
```

#### Cloud Run のユースケース

| ユースケース | 説明 |
| --- | --- |
| **Web API・REST API** | マイクロサービスのバックエンド、モバイルアプリの API |
| **Web アプリ** | Next.js・Flask・Spring Boot などの Web アプリ |
| **イベント処理** | Pub/Sub トリガーでのイベント駆動処理 |
| **バッチ処理** | Cloud Run Jobs（リクエストなしで実行するバッチ） |
| **AI/ML 推論** | ML モデルをコンテナに入れて推論 API として公開 |

#### Cloud Run の重要機能

```text
① Traffic Splitting（トラフィック分割）:

   - 複数のリビジョン（バージョン）にトラフィックを %で分割
   - カナリアデプロイ・A/B テストに活用

   例:
     リビジョン v2（新バージョン）: 10%
     リビジョン v1（旧バージョン）: 90%
     → 問題なければ v2 を 100% に切り替え

② Cloud Run Jobs:

   - HTTP リクエストなしで実行するバッチ処理向け
   - スケジュール実行（毎日深夜など）
   - 並列実行で大量タスクを高速処理

③ Cloud Run for Anthos（GKE 上で実行）:

   - オンプレミスや GKE クラスタ上でも Cloud Run を実行
   - ハイブリッド環境でのサーバーレス

```

### 5.3 Cloud Run Functions（旧 Cloud Functions / FaaS）

```text
Cloud Run Functions とは:

  - イベント駆動のサーバーレス関数（Function as a Service）
  - 特定のイベント発生時のみ実行される小さな関数
  - 完全サーバーレス（インフラ管理ゼロ）

Cloud Run と Cloud Run Functions の違い:
  Cloud Run:
    → コンテナ全体をデプロイ
    → HTTP/gRPC リクエストで実行
    → 常時起動も可能
    → 複雑なアプリ・API 向き

  Cloud Run Functions:
    → 関数（コード片）をデプロイ
    → 多様なイベントでトリガー
    → 完全にオンデマンド（ゼロスケール）
    → 軽量な処理・イベント処理向き

トリガーの種類:
  ┌────────────────────────────────────────────────────┐
  │ HTTP トリガー:                                     │
  │   URL へのリクエストで関数を実行                    │
  │   例: ボタンを押したら AI 分析を実行               │
  │                                                    │
  │ Cloud Storage トリガー:                            │
  │   ファイルのアップロード・削除で自動実行            │
  │   例: 画像アップロード → 自動でサムネイル生成       │
  │                                                    │
  │ Pub/Sub トリガー:                                  │
  │   メッセージを受信したら自動実行                   │
  │   例: 注文データを受信 → 在庫DB を更新             │
  │                                                    │
  │ Firebase / Firestore トリガー:                     │
  │   DB の変更で自動実行                              │
  │   例: 新ユーザー登録 → ウェルカムメール送信         │
  │                                                    │
  │ Eventarc（Cloud Audit Logs 等のイベント）:         │
  │   様々な GCP サービスのイベントで実行              │
  └────────────────────────────────────────────────────┘

ユースケース:
  ✅ Webhook（GitHub push → CI/CD 起動）
  ✅ 画像処理（アップロード → リサイズ → Cloud SQL に保存）
  ✅ 通知送信（注文完了 → メール・Slack 通知）
  ✅ データ変換（受信データの形式変換・検証）
  ✅ スケジュールタスク（毎日 0 時にレポート生成）
```

### 5.4 App Engine（PaaS Web アプリ）

```text
App Engine とは:

  - コードをアップロードするだけで Web アプリを実行できる PaaS
  - インフラ管理不要・自動スケーリング
  - 特定の言語ランタイムに対応

2 つの環境:
  Standard 環境:

    - 特定バージョンの言語ランタイム（Python 3.x・Node.js・Java・Go 等）
    - 超高速スケーリング（数秒以内に 0 → N）
    - 完全マネージド・ゼロスケール可能
    - Cloud Storage・Cloud SQL・Datastore との統合

  Flexible 環境:

    - Docker コンテナで任意のランタイムを使用可能
    - Compute Engine VM 上で動作
    - より多くのカスタマイズが可能
    - 最小 1 インスタンス（ゼロスケールなし）

現在の傾向:
  新規開発では Cloud Run が推奨されることが多い
  既存の App Engine アプリの維持・運用には引き続き有効
```

### 5.5 コンピューティングサービス選択の完全ガイド

```text
選択フロー:

                 コードを実行したい
                        ↓
              OS・ミドルウェアの制御が必要？
                   /         \
                 Yes           No
                  ↓             ↓
          Compute Engine   コンテナ化されている？
          （VM・IaaS）         /        \
                            Yes          No
                             ↓            ↓
                   長時間・ステートフル？  イベント駆動・
                       /       \          軽量処理？
                     Yes        No         ↓
                      ↓          ↓    Cloud Run Functions
                     GKE      Cloud Run    （FaaS）
                  （Kubernetes）（サーバーレスコンテナ）
```

| サービス | 管理負荷 | スケーリング | コスト | 主な用途 |
| --- | --- | --- | --- | --- |
| **Compute Engine** | 高（OS 管理必要） | 手動 + オートスケーリング | VM 稼働時間課金 | レガシー移行・GPU・特殊 OS |
| **GKE Standard** | 中（ノード管理） | 自動（K8s） | ノード VM 課金 | マイクロサービス・ステートフル |
| **GKE Autopilot** | 低（Google が管理） | 自動（K8s） | Pod リソース課金 | K8s を楽に使いたい |
| **Cloud Run** | 最低（コンテナのみ） | 自動（0〜N） | リクエスト時のみ | HTTP API・Web アプリ |
| **Cloud Run Functions** | 最低（コードのみ） | 自動（0〜N） | 実行時のみ | イベント処理・Webhook |
| **App Engine** | 低（コードのみ） | 自動 | インスタンス課金 | 既存 Web アプリ |

#### ✅ ベストプラクティス: サーバーレス

```yaml
Cloud Run:

  - 最小インスタンス数を 0 に設定してコストを最小化（Cold Start 許容の場合）
  - Cold Start が問題な場合は最小インスタンス 1 以上に設定
  - トラフィック分割でカナリアデプロイを実践
  - Cloud Run Jobs でスケジュールバッチを実装（Compute Engine VM 不要）

Cloud Run Functions:

  - 関数は単一責務の原則（1 関数 = 1 タスク）
  - 実行時間の上限はトリガー種別により異なる（HTTP: 最大 60 分、スケジュール/タスクキュー: 最大 30 分、イベント駆動: 最大 9 分）を考慮したアーキテクチャ設計
  - Secrets Manager でシークレットを管理（コードに API キーを書かない）
  - エラーハンドリングと再試行ロジックを必ず実装

```

> 📎 **参照**:
> <https://cloud.google.com/run/docs>
> <https://cloud.google.com/functions/docs>
> <https://cloud.google.com/appengine/docs>

---

## 6. ネットワークサービスとハイブリッド接続

### 6.1 Virtual Private Cloud（VPC）

```text
VPC（Virtual Private Cloud）とは:

  - Google Cloud 上でプライベートなネットワーク環境を構築するサービス
  - ソフトウェアで定義された仮想ネットワーク
  - 物理ネットワーク機器なしにネットワークを設計

Google Cloud VPC の特徴:
  ① グローバル VPC:
     1 つの VPC が複数リージョンにまたがる（AWS・Azure とは異なる）
     東京リージョンの VM と大阪リージョンの VM が同じ VPC 内でプライベート通信可能

  ② サブネット:
     VPC 内を CIDR で分割した IP アドレス範囲
     例: 本番サブネット（10.0.1.0/24）、開発サブネット（10.0.2.0/24）

  ③ ファイアウォールルール:
     送受信トラフィックを細かく制御
     「タグ」「サービスアカウント」「IP 範囲」でルールを定義
     デフォルト: 外部からの全トラフィックを拒否（最小権限）

VPC のベストプラクティス:
  ✅ カスタムモードの VPC を使用（自動モードは本番非推奨）
  ✅ プロジェクトごとに VPC を分離（本番・開発・テストの分離）
  ✅ Private Google Access を有効化（VM に外部 IP なしで GCP サービスにアクセス）
  ✅ VPC Flow Logs でネットワークトラフィックを記録（セキュリティ監査）
```

#### Shared VPC（共有 VPC）

```text
Shared VPC とは:

  - ホストプロジェクトの VPC を複数のサービスプロジェクトで共有する仕組み
  - ネットワーク管理を中央集権化しつつ、各チームがプロジェクトを独立管理

構成例:
  ┌─────────────────────────────────────────┐
  │ ホストプロジェクト（ネットワーク管理チーム） │
  │  VPC: 10.0.0.0/8                         │
  │  サブネット A: 10.1.0.0/24（本番）        │
  │  サブネット B: 10.2.0.0/24（開発）        │
  └────────────────┬────────────────────────┘
                   │ 共有
        ┌──────────┼──────────┐
        ↓          ↓          ↓
  チームAプロジェクト チームBプロジェクト チームCプロジェクト
  （サブネット A を使用）（サブネット B を使用）

メリット:
  ✅ VPC 管理を中央集権化（ファイアウォールルールの統一）
  ✅ チームごとの自由な開発を保ちながらネットワークを統制
  ✅ ネットワーク設定のセキュリティポリシーを一元管理
```

### 6.2 Cloud Load Balancing（ロードバランサー）

```text
ロードバランサーとは:

  - 複数のバックエンド（VM・コンテナ等）にトラフィックを分散するサービス
  - 単一障害点を排除し、高可用性を実現

Google Cloud ロードバランサーの種類:

  ① グローバル外部 HTTP(S) ロードバランサー（Premium Tier）:

     - 世界中のユーザーへの最低レイテンシ配信
     - Google のプレミアムネットワークを使用
     - SSL/TLS 終端・URL マッピング・Cloud Armor 統合
     - 用途: グローバルな Web アプリ・API

  ② リージョナル外部 HTTP(S) ロードバランサー（Standard Tier）:

     - 特定リージョン内でのトラフィック分散
     - コスト最適化（Premium Tier より安価）
     - 用途: リージョン限定のアプリ

  ③ 外部 TCP/UDP 内部パススルー NLB（Network Load Balancer）:

     - L4（TCP/UDP）での高性能ロードバランシング
     - HTTP 以外のプロトコル（ゲームサーバー等）
     - 超低レイテンシが必要な場合

  ④ 内部 HTTP(S) ロードバランサー:

     - VPC 内部のトラフィック分散（外部から見えない）
     - マイクロサービス間通信の負荷分散

  ⑤ 内部 TCP/UDP ロードバランサー:

     - VPC 内部の L4 負荷分散

試験ポイント:

  - Web アプリ・API のグローバル配信 → グローバル外部 HTTP(S) LB
  - マイクロサービス間通信 → 内部 HTTP(S) LB
  - 非 HTTP（ゲームサーバー等） → TCP/UDP LB

```

### 6.3 Cloud CDN（コンテンツ配信ネットワーク）

```text
Cloud CDN とは:

  - Google のグローバルエッジロケーション（100 以上）でコンテンツをキャッシュ
  - ユーザーの近くからコンテンツを配信 → 低レイテンシ・高速化
  - グローバル HTTP(S) ロードバランサーと統合

効果:
  従来:
    東京のユーザー → 米国のオリジンサーバーへ往復（200ms）
  CDN 使用後:
    東京のユーザー → 東京近くのエッジからキャッシュ配信（10ms）
  → レイテンシを 95% 削減、オリジンサーバーの負荷も大幅削減

キャッシュできるもの:
  ✅ 画像・動画・CSS・JavaScript
  ✅ 静的 HTML
  ✅ API レスポンス（適切なキャッシュヘッダーを設定した場合）

Cloud CDN のベストプラクティス:
  ✅ Cache-Control ヘッダーを適切に設定（キャッシュ有効期限）
  ✅ 動的コンテンツと静的コンテンツで CDN 設定を分ける
  ✅ Cache invalidation（キャッシュ無効化）の仕組みを設計
  ✅ Cloud Armor と組み合わせて DDoS 防御を実装
```

### 6.4 オンプレミスとの接続

#### Cloud VPN

```text
Cloud VPN とは:

  - インターネット経由で IPsec 暗号化トンネルを作成
  - オンプレミスと Google Cloud を安全に接続

HA VPN（高可用性 VPN）:

  - 2 つの冗長トンネルで SLA 99.99% を実現
  - 自動フェイルオーバー
  - 最大 3 Gbps / トンネル

Classic VPN:

  - シングルトンネル
  - SLA 99.9%

用途と特徴:
  ✅ 低コスト（物理専用線不要）
  ✅ 迅速な設定（数時間で接続可能）
  ✅ インターネット経由なのでレイテンシが高い可能性
  ❌ 帯域保証がない（インターネット品質に依存）
  → 小規模・テスト・非クリティカルなハイブリッド接続に最適
```

#### Cloud Interconnect

```text
Cloud Interconnect とは:

  - オンプレと Google Cloud を物理的な専用線で接続
  - インターネットを経由しない → 低レイテンシ・高帯域・安定

Dedicated Interconnect（直接接続）:

  - Google のコロケーション施設に自社回線を直接接続
  - 帯域: 10 Gbps または 100 Gbps の倍数
  - SLA: 99.9%（1 接続）〜 99.99%（2 接続）
  - 最大転送コスト削減（アウトバウンドデータ転送が安価に）

Partner Interconnect（パートナー経由）:

  - 通信キャリア（NTT・KDDI 等）のパートナー経由で接続
  - 帯域: 50 Mbps 〜 50 Gbps（柔軟）
  - Dedicated Interconnect ほどの大容量が不要な場合

選択基準:
  接続方法の選択:
  小規模・低コスト・非クリティカル → Cloud VPN
  大容量・安定・ミッションクリティカル → Dedicated Interconnect
  中規模・柔軟・通信キャリア経由 → Partner Interconnect
```

#### Cloud NAT（ネットワーク アドレス変換）

```text
Cloud NAT とは:

  - 外部 IP アドレスを持たない VM やコンテナが

    インターネットへのアウトバウンド通信を行うための NAT ゲートウェイ

  - インバウンド（外部 → 内部）は通さない

なぜ Cloud NAT が必要か:
  セキュリティのベストプラクティス:
    VM に外部 IP を付けない（攻撃対象を減らす）
    BUT アップデート・ライブラリのダウンロードは必要
    → Cloud NAT がアウトバウンド接続を仲介する

  ┌──────────────────────────────────────────────┐
  │ プライベート VM（外部 IP なし）                │
  │    ↓ アウトバウンド（インターネットへ）        │
  │ Cloud NAT（外部 IP を持つ）                   │
  │    ↓ インターネット接続                        │
  │ インターネット（例: apt update, pip install） │
  └──────────────────────────────────────────────┘
```

> 📎 **参照**:
> <https://cloud.google.com/vpc/docs>
> <https://cloud.google.com/load-balancing/docs>
> <https://cloud.google.com/interconnect/docs>
> <https://cloud.google.com/vpn/docs>

---

## 7. ハイブリッドクラウドとマルチクラウド管理

### 7.1 ハイブリッド・マルチクラウドの現実

```text
多くの企業の実情:

  - 100% クラウド移行は一夜にして実現しない
  - 規制・データ主権・技術的制約でオンプレに残すシステムがある
  - 複数のクラウドを既に使っている（AWS + GCP 等）

課題:
  環境がバラバラだと:
  ❌ 管理ツールがバラバラで運用コストが高い
  ❌ セキュリティポリシーの統一が難しい
  ❌ 開発・デプロイの方法が環境ごとに異なる
  ❌ モニタリング・ログが散在して全体像が把握できない

→ Anthos がこれらを統合的に解決
```

### 7.2 Anthos（ハイブリッド・マルチクラウド管理プラットフォーム）

```text
Anthos とは:

  - オンプレミス・Google Cloud・他社クラウド（AWS・Azure）を

    「一つのプラットフォーム」として統合管理するサービス

  - Kubernetes をベースにした統一された開発・運用環境を提供

Anthos が提供するもの:

  ① 統一されたコントロールプレーン:

     - どこで動いているコンテナも GCP コンソールから一元管理
     - AWS の EKS クラスタも、オンプレの GKE クラスタも同じ画面で管理

  ② 一貫したセキュリティポリシー:

     - Policy Controller で全クラスタに同じポリシーを適用
     - Config Management で設定を Git で一元管理（GitOps）

  ③ Anthos Service Mesh（Traffic 管理）:

     - Istio ベースのサービスメッシュ
     - マイクロサービス間の通信を可視化・制御
     - mTLS で全通信を自動暗号化

  ④ Anthos Config Management:

     - Git リポジトリから全クラスタへの設定を自動同期
     - 設定の一貫性を保証（GitOps の実現）

Anthos の活用シナリオ:

  シナリオ 1: 段階的なクラウド移行
    オンプレ（Anthos on-prem）→ GCP（GKE）へ段階移行
    同じ Kubernetes API で開発・デプロイ方法が変わらない

  シナリオ 2: 規制対応のハイブリッド
    個人情報: オンプレ（コンプライアンス対応）
    分析処理: Google Cloud（スケーラビリティ）
    → Anthos で統一管理

  シナリオ 3: マルチクラウド
    既存 AWS → Anthos で管理
    新規 GCP → Anthos で管理
    → 一つのプラットフォームで両方を管理
```

### 7.3 Google Distributed Cloud（旧 Anthos on-prem）

```text
Google Distributed Cloud とは:

  - Google のインフラ・ソフトウェアをそのまま自社データセンターに設置
  - オンプレミスで Google Cloud のサービスを実行できる
  - 超低レイテンシ・データ主権・規制対応が必要な場合に最適

ユースケース:
  ✅ 工場・病院・銀行など、データをオンプレに置く必要がある場所
  ✅ 通信が不安定な場所（エッジコンピューティング）
  ✅ データ主権の法規制（データを国外に出せない）
  ✅ 超低レイテンシが必要（自動運転・リアルタイム制御）
```

---

## 8. DevOps と CI/CD パイプライン

### 8.1 DevOps とは

```text
DevOps とは:
  開発（Development）と運用（Operations）を統合した文化・プラクティス・ツールの集合体

従来の問題（Dev と Ops の分断）:
  開発チーム: 「早く新機能をリリースしたい」
  運用チーム: 「安定性を維持したい・変更はリスク」
  → 対立が生まれてリリースが遅くなる

DevOps の解決策:

  - 開発・テスト・デプロイ・監視を自動化
  - 小さな変更を頻繁にリリース（大きなリリースより安全）
  - 失敗を素早く検知・修正できる仕組みを作る
  - 「One Team」として開発・運用が協力する文化

DevOps の主要指標（DORA Metrics）:
  ① デプロイ頻度: 本番へのデプロイ回数（高いほど良い）
  ② 変更リードタイム: コードコミットから本番まで（短いほど良い）
  ③ 変更失敗率: デプロイが失敗する割合（低いほど良い）
  ④ 平均復旧時間（MTTR）: 障害から回復までの時間（短いほど良い）
```

### 8.2 CI/CD（継続的インテグレーション / 継続的デリバリー）

```text
CI（Continuous Integration / 継続的インテグレーション）:

  - コードの変更を頻繁に共有リポジトリにマージ
  - マージのたびに自動でビルド・テストを実行
  - 問題を早期発見（「統合地獄」を防ぐ）

CD（Continuous Delivery / 継続的デリバリー）:

  - テストを通過したコードをいつでも本番にデプロイできる状態に保つ
  - デプロイは手動で承認（Continuous Delivery）
  - または完全自動（Continuous Deployment）

CI/CD パイプラインの流れ:

  コードをコミット（Git）
       ↓
  Secure Source Manager（ソースコード管理）
       ↓
  Cloud Build（自動ビルド・テスト）

    - コードのコンパイル
    - ユニットテスト・統合テスト
    - セキュリティスキャン
    - コンテナイメージのビルド

       ↓
  Artifact Registry（コンテナイメージの保管）

    - 脆弱性スキャン
    - イメージのバージョン管理

       ↓
  Cloud Deploy（デプロイ自動化）

    - ステージング環境へデプロイ
    - 承認後に本番環境へデプロイ
    - カナリアデプロイ・ローリング更新

       ↓
  本番環境（GKE・Cloud Run 等）
       ↓
  Cloud Monitoring / Logging（監視）

メリット:
  ✅ 人的ミスの削減（自動化）
  ✅ リリースサイクルの高速化（手動作業ゼロ）
  ✅ 問題の早期発見（毎コミットでテスト実行）
  ✅ 即座のロールバック（問題発生時）
```

### 8.3 Google Cloud の CI/CD サービス詳細

#### Secure Source Manager

```text
Secure Source Manager（SSM）とは:

  - Google Cloud のマネージドソースコード管理サービス（旧 Cloud Source Repositories の後継）
  - GitHub 互換の Git リポジトリ（GitHub・Bitbucket と連携可能）
  - IAM でアクセス制御（GCP 権限と統合）
  - Cloud Build と緊密に統合
  - VPC Service Controls・組織ポリシーによる高度なセキュリティ管理

```

#### Cloud Build

```text
Cloud Build とは:

  - フルマネージドの CI/CD プラットフォーム（ビルド・テスト・デプロイ）
  - YAML で定義したビルドステップを自動実行
  - コンテナ・VM・App Engine など様々なターゲットに対応
  - サーバーレス（自前のビルドサーバー不要）

cloudbuild.yaml の例:
  steps:
    # ステップ 1: ユニットテスト実行

    - name: 'python:3.11'

      entrypoint: pip
      args: ['install', '-r', 'requirements.txt']

    - name: 'python:3.11'

      entrypoint: pytest
      args: ['tests/']

    # ステップ 2: Docker イメージのビルド

    - name: 'gcr.io/cloud-builders/docker'

      args: ['build', '-t', 'gcr.io/$PROJECT_ID/myapp:$COMMIT_SHA', '.']

    # ステップ 3: Artifact Registry へ push

    - name: 'gcr.io/cloud-builders/docker'

      args: ['push', 'gcr.io/$PROJECT_ID/myapp:$COMMIT_SHA']

トリガー:

  - Git へのプッシュ・プルリクエストで自動起動
  - スケジュール実行
  - 手動実行
  - Pub/Sub メッセージでのトリガー

```

#### Artifact Registry

```text
Artifact Registry とは:

  - コンテナイメージ・言語パッケージ（npm・PyPI・Maven 等）を

    安全に保管・管理するリポジトリサービス

  - 旧 Container Registry の後継（推奨）

主な機能:

  - コンテナイメージの脆弱性スキャン（自動）
  - イメージの署名・検証（Binary Authorization）
  - リージョン別の保管（データ主権・近接性）
  - IAM でアクセス制御（誰がどのイメージをプッシュ・プルできるか）
  - マルチフォーマット対応（Docker・Helm・npm・pip・Maven 等）

ベストプラクティス:
  ✅ 脆弱性スキャンを有効化（本番デプロイ前に自動チェック）
  ✅ Binary Authorization で検証済みイメージのみデプロイを許可
  ✅ イメージに commit SHA タグを付与して追跡可能に
```

#### Cloud Deploy

```text
Cloud Deploy とは:

  - マネージドの継続的デリバリーサービス
  - デプロイパイプライン（dev → staging → production）を管理
  - 各環境へのプロモーション・承認ワークフロー

デプロイパイプラインの例:
  dev（開発環境） → staging（ステージング） → production（本番）
  ↑ 自動デプロイ       ↑ 自動デプロイ          ↑ 承認後デプロイ

主な機能:

  - カナリアデプロイ（新バージョンを段階的に展開）
  - 自動ロールバック（失敗時に前バージョンへ戻す）
  - デプロイの承認ワークフロー（本番前に人間が確認）
  - デプロイ履歴・監査ログ
  - GKE・Cloud Run・Anthos に対応

```

### 8.4 SRE（Site Reliability Engineering）

```text
SRE とは:

  - Google が開発した「ソフトウェアエンジニアリングの手法で運用を自動化する」アプローチ
  - DevOps の具体的な実践方法の一つ

SRE の重要な概念:

① SLA（Service Level Agreement）: サービスレベル契約

   - サービス提供者がユーザーに約束する品質水準
   - 例: 「月間 99.9% 以上の可用性を保証する」

② SLO（Service Level Objective）: サービスレベル目標

   - 組織内部の目標（SLA より高い基準に設定）
   - 例: 「内部目標は 99.95% 可用性」（SLA の 99.9% より高く設定）

③ SLI（Service Level Indicator）: サービスレベル指標

   - 実際に測定するメトリクス
   - 例: 実際の可用性・エラー率・レイテンシ

④ エラーバジェット（Error Budget）:

   - 「許容できるサービス停止量」
   - SLO を 99.9% とすると、月に 0.1% = 約 43 分まで停止が許容される
   - エラーバジェットが残っていれば → 新機能のデプロイを積極的に
   - エラーバジェットを使い果たしそうなら → デプロイを抑制・安定化優先

→ エラーバジェットによって「リリース速度」と「安定性」のバランスを科学的に管理
```

#### ✅ ベストプラクティス: DevOps / CI/CD

```yaml
CI のベストプラクティス:

  - すべてのコード変更でテストを自動実行
  - テストが通らないとマージ不可のルールを設定
  - テストは高速に（10 分以内が理想）
  - コードレビュー（Pull Request）を必須化
  - セキュリティスキャン（SAST・依存関係スキャン）を CI に組み込む

CD のベストプラクティス:

  - 本番デプロイは必ずカナリアまたはローリングアップデートで
  - ロールバック手順を事前にテスト・文書化
  - 本番デプロイに人間の承認ステップを設ける（Cloud Deploy）
  - デプロイ後のモニタリング自動化（異常検知でアラート）

インフラの管理:

  - Infrastructure as Code（Terraform）でインフラをコード化
  - GitOps（Anthos Config Management）で設定変更を Git で管理
  - イミュータブルインフラ（サーバーを更新せず新しいものと置き換え）

```

> 📎 **参照**:
> <https://cloud.google.com/build/docs>
> <https://cloud.google.com/deploy/docs>
> <https://cloud.google.com/artifact-registry/docs>
> <https://sre.google/sre-book/table-of-contents/>

---

## 9. アプリケーションのモダナイゼーションパターン

### 9.1 モノリスからマイクロサービスへ

```text
モノリスアーキテクチャ:
  ┌───────────────────────────────────────────────────┐
  │             単一の大きなアプリケーション            │
  │  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐         │
  │  │ユーザー│  │注文  │  │在庫  │  │決済  │  ...    │
  │  │管理  │  │管理  │  │管理  │  │管理  │         │
  │  └──────┘  └──────┘  └──────┘  └──────┘         │
  └───────────────────────────────────────────────────┘

  問題点:
  ❌ 1か所の変更が全体に影響する（テストが大変）
  ❌ 1か所の障害が全体を停止させる
  ❌ 部分的なスケーリングができない
  ❌ チームが大きくなるとコードの競合が増える
  ❌ 技術スタックの変更が全体に影響する

マイクロサービスアーキテクチャ:
  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
  │ユーザーサービス│  │注文サービス│  │在庫サービス│  │決済サービス│
  │   (GKE)  │  │ (Cloud Run)│  │  (GKE)  │  │ (Cloud Run)│
  └──────────┘  └──────────┘  └──────────┘  └──────────┘
        │              │              │              │
        └──────────────┴──────────────┴──────────────┘
                          API / Pub/Sub

  利点:
  ✅ 各サービスを独立してデプロイ・スケール可能
  ✅ 1つのサービスの障害が他に影響しにくい
  ✅ サービスごとに最適な技術スタックを選択できる
  ✅ 小さなチームが独立して開発できる
  ✅ 部分的なスケーリングが可能（決済だけ大量にスケール等）
```

### 9.2 12-Factor App（クラウドネイティブアプリの設計原則）

```text
12-Factor App とは:
  クラウドネイティブなアプリを設計・開発するための 12 の原則
  Heroku が提唱し、Google Cloud も推奨するベストプラクティス

重要な原則（試験に関連するもの）:

① コードベース（Codebase）:

   - 1 つのアプリ = 1 つの Git リポジトリ
   - 複数環境（dev/stg/prod）は同じコードから

② 依存関係（Dependencies）:

   - 依存ライブラリを明示的に宣言（requirements.txt・package.json）
   - コンテナがこれを実現する

③ 設定（Config）:

   - 環境依存の設定は環境変数として外部化
   - コードに API キー・DB パスワードを書かない
   - Secret Manager で管理

④ バックエンドサービス（Backing Services）:

   - DB・キャッシュ・メッセージキューは「アタッチされたリソース」として扱う
   - コードを変えずにスワップできる（本番 DB を変更しても）

⑤ ポート割り当て（Port Binding）:

   - アプリは自分でポートをリッスン（Web サーバーを内包）
   - コンテナがこれを自然に実現

⑥ 廃棄容易性（Disposability）:

   - 起動が高速・停止シグナルで即座にシャットダウン
   - コンテナの設計思想と一致

```

### 9.3 Cloud Pub/Sub でのイベント駆動アーキテクチャ

```text
イベント駆動アーキテクチャ（EDA）とは:

  - システム間の通信を「イベント（出来事）」の発行・購読で行う設計
  - 直接呼び出しではなくメッセージングを介した疎結合

Pub/Sub を使ったマイクロサービス連携:

  注文サービス ──→ Pub/Sub（order.created トピック）
                          ├─── 在庫サービス（在庫減算）
                          ├─── 通知サービス（確認メール）
                          └─── 分析サービス（データ蓄積）

  ✅ 注文サービスは他サービスを知らなくていい（疎結合）
  ✅ 在庫サービスが落ちても注文は失敗しない（メッセージはキュー保持）
  ✅ 新しいサービスを追加しても注文サービスを変更不要

Cloud Tasks:

  - タスクキューサービス
  - HTTP リクエストの非同期実行・スケジューリング
  - 重複実行防止・リトライ管理
  - Pub/Sub との使い分け:

    Pub/Sub: 1 対多の配信・ストリーミング
    Cloud Tasks: 1 対 1 の非同期タスク・遅延実行
```

---

## 10. API 管理と統合サービス

### 10.1 API ファーストの考え方

```text
API ファーストとは:

  - システムの機能を API として設計・公開することを優先する考え方
  - 内部システム・外部システム・モバイルアプリが同じ API を使用

API の重要性:
  ┌──────────────────────────────────────────────────────┐
  │                   API Layer                          │
  │  ┌──────────┐  ┌──────────┐  ┌──────────┐         │
  │  │  Web     │  │ モバイル │  │サードパーティ│        │
  │  │  App     │  │  App     │  │  Partner │         │
  │  └──────────┘  └──────────┘  └──────────┘         │
  └──────────────────────────────────────────────────────┘
            ↕ REST / gRPC API
  ┌──────────────────────────────────────────────────────┐
  │              Backend Services                        │
  │  ┌──────────┐  ┌──────────┐  ┌──────────┐         │
  │  │ 商品 DB  │  │ 注文 DB  │  │決済システム│        │
  │  └──────────┘  └──────────┘  └──────────┘         │
  └──────────────────────────────────────────────────────┘
```

### 10.2 Cloud Endpoints

```text
Cloud Endpoints とは:

  - API の管理・モニタリング・認証を行うサービス
  - OpenAPI（Swagger）または gRPC の仕様書を元に動作

主な機能:
  ✅ 認証（API キー・JWT・Firebase Auth・Google ID）
  ✅ レート制限（1 秒あたりのリクエスト数制限）
  ✅ モニタリング（レイテンシ・エラー率の可視化）
  ✅ ログ記録（誰が・いつ・どの API を呼んだか）
  ✅ トランスコーディング（HTTP/JSON ↔ gRPC の変換）

対応環境:

  - Compute Engine
  - GKE
  - App Engine
  - Cloud Run

```

### 10.3 Apigee（API プラットフォーム）

```text
Apigee とは:

  - エンタープライズグレードの API 管理プラットフォーム
  - Google Cloud に買収された API マネジメントのリーダー

Cloud Endpoints vs Apigee:
  Cloud Endpoints:

    - GCP サービス向けの基本的な API 管理
    - コスト低
    - GCP エコシステム内での使用に最適

  Apigee:

    - 大企業向けの本格的な API プラットフォーム
    - API マーケットプレイス・開発者ポータル
    - 高度な分析・セキュリティポリシー
    - マルチクラウド・オンプレ対応
    - コスト高（エンタープライズ向け）

選択基準:
  GCP 内の API 管理 → Cloud Endpoints
  エンタープライズ API プログラム → Apigee
```

### 10.4 Eventarc（イベント統合サービス）

```text
Eventarc とは:

  - Google Cloud サービスのイベントを統一的に処理するサービス
  - 100 以上の Google Cloud サービスのイベントを Cloud Run・GKE 等に配信

活用例:

  - BigQuery クエリ完了 → Cloud Run でレポート生成
  - Cloud Storage ファイルアップロード → Cloud Run で処理
  - Firebase ユーザー作成 → Cloud Run でウェルカムメール送信
  - Cloud Audit Log のイベント → セキュリティ監視システムへ

Pub/Sub との違い:
  Pub/Sub: カスタムメッセージの送受信
  Eventarc: GCP サービスの標準イベントの受信
```

---

## 11. コスト最適化の実践

### 11.1 コスト最適化の 4 つの柱

```text
コスト最適化フレームワーク:

① 適切なサービスの選択（Right Service）:

   - IaaS（VM）より PaaS・サーバーレスでインフラ管理コストを削減
   - 適切なマシンタイプを選択（過剰スペックを避ける）

② 適切なサイジング（Right Sizing）:

   - 実際の使用量に合わせてリソースをサイズ調整
   - Recommender が自動的に最適化提案を表示

③ 需要に合わせたスケーリング（Right Scaling）:

   - オートスケーリングで使用量に応じて増減
   - 開発環境は夜間・週末に自動停止

④ 価格モデルの最適化（Right Pricing）:

   - CUD・Spot VM・SUD など適切な割引を適用
   - Preemptible VM でバッチ処理コストを削減

```

### 11.2 Google Cloud の主要なコスト最適化ツール

```text
① Cloud Billing レポート:

   - プロジェクト・サービス・ラベル別のコスト可視化
   - コストの傾向・予測
   - BigQuery へのエクスポートで詳細分析

② Cost Recommendations（Recommender）:

   - 未使用リソースの削除提案
   - 過剰プロビジョニングの VM のサイズ削減提案
   - 自動的に AI が分析して提案

③ 予算とアラート（Budget Alerts）:

   - 月次予算を設定
   - 50%・90%・100% 到達時にメール通知
   - Pub/Sub への通知で自動アクション（リソース停止等）

④ Cloud Monitoring のコストメトリクス:

   - 各サービスの使用量をリアルタイムで監視

コスト削減の実践例:
  ① VM の右サイズ化:

     - Recommender が「このVMは30%しか使ってない」と提案
     - n2-standard-8 → n2-standard-4 に変更で 50% コスト削減

  ② 開発環境の自動停止:

     - 平日 9-18 時以外は VM を自動停止
     - 1ヶ月 168 時間運用 → 45 時間に削減（73% 削減）

  ③ Spot VM の活用:

     - 夜間バッチ処理を Spot VM に移行
     - オンデマンド比 90% コスト削減

  ④ Cloud Storage のライフサイクル:

     - 30 日後に Standard → Nearline 自動移行
     - 365 日後に Archive 自動移行
     - 3 年後に自動削除

```

### 11.3 FinOps（クラウドコスト管理文化）

```text
FinOps とは:

  - Finance + DevOps の造語
  - クラウドコストを技術・財務・ビジネスチームが共同で管理する文化

FinOps の 3 つのフェーズ:

  1. 把握（Inform）: コストを可視化・理解する
  2. 最適化（Optimize）: 無駄を排除・効率化
  3. 運用（Operate）: 継続的な改善サイクル

ラベル（Label）によるコスト配分:

  - すべての GCP リソースにラベルを付与

  例:
    env: production
    team: backend
    project: checkout-service
    cost-center: engineering-001

  → BigQuery にエクスポートしたコストデータとラベルを結合
  → 「チーム別・プロジェクト別・環境別」のコストを正確に把握
  → 各チームが自分たちのクラウドコストに責任を持てる
```

---

## 12. Section 4 総まとめ・頻出問題パターン

### 12.1 最重要用語の一問一答

```text
Q: VM とコンテナの最大の違いは？
A: VM はゲスト OS を含む（重い・起動遅い）
   コンテナはホスト OS を共有（軽い・起動速い・環境の一貫性）

Q: GKE Autopilot と Standard の違いは？
A: Autopilot はノード（VM）を Google が完全管理・Pod 単位課金
   Standard はユーザーがノードを管理・VM 課金

Q: Cloud Run と Cloud Functions の使い分けは？
A: Cloud Run: コンテナ化された HTTP アプリ・API・Web アプリ
   Cloud Functions: イベント駆動の小さな関数（Webhook・ファイル処理等）

Q: Cloud VPN と Cloud Interconnect の違いは？
A: Cloud VPN: インターネット経由の暗号化トンネル（安価・低帯域）
   Cloud Interconnect: 物理専用線（高コスト・高帯域・低レイテンシ）

Q: Anthos の役割は？
A: オンプレ・GCP・他社クラウドのコンテナワークロードを
   一つのプラットフォームで統合管理する

Q: CI と CD の違いは？
A: CI（継続的インテグレーション）= 自動ビルド・テスト
   CD（継続的デリバリー）= テスト済みコードを本番にデプロイする仕組み

Q: SLO・SLA・SLI の違いは？
A: SLI: 実際に測定する指標（エラー率・レイテンシ）
   SLO: 組織内目標（99.95% 可用性）
   SLA: ユーザーへの約束（99.9% 可用性）

Q: Shared VPC の目的は？
A: ホストプロジェクトの VPC を複数プロジェクトで共有
   ネットワーク管理を中央集権化しつつ各チームは独立した開発

Q: Cloud CDN の効果は？
A: ユーザーに近いエッジロケーションでコンテンツをキャッシュ
   レイテンシ削減・オリジンサーバー負荷軽減

Q: マイクロサービスのメリットは？
A: 独立デプロイ・部分スケーリング・障害の局所化・チームの独立性向上
```

### 12.2 よく出る問題パターンと解法

#### パターン 1: コンピューティングサービスの選択

```text
問題: 「急激なトラフィックの増減があるモバイルアプリの
        API バックエンドを構築したい。
        インフラ管理の工数を最小化したい。
        Node.js で開発されたコンテナを使用。」

解法:

  - Node.js コンテナ → コンテナサービスを使用
  - インフラ管理を最小化 → サーバーレス
  - HTTP API → Cloud Run が適切
  - 急激なトラフィック増減 → Cloud Run の 0〜N スケーリングが最適

答え: Cloud Run
理由: コンテナ・HTTP API・サーバーレス・自動スケーリングの組み合わせ
```

#### パターン 2: ハイブリッド接続の選択

```text
問題: 「金融機関が基幹システム（オンプレ）と
        Google Cloud の分析基盤を接続したい。
        1日に数十 TB のデータを転送する予定。
        低レイテンシ・高帯域・安定性が必要。」

解法:

  - 大量データ（数十 TB）→ 高帯域が必要
  - 低レイテンシ・安定性 → インターネット経由は不適切
  - 物理専用線 → Dedicated Interconnect

答え: Dedicated Interconnect
理由: 大量データ・低レイテンシ・安定性の要件はインターネット VPN では達成困難
```

#### パターン 3: DevOps パイプラインの問題

```text
問題: 「開発チームが新機能を本番環境にデプロイするたびに
        手動でのビルド・テスト・デプロイが発生している。
        人的ミスも多い。
        自動化したいが、本番前に人間のレビューも必要。」

解法:

  - 自動ビルド・テスト → Cloud Build
  - コンテナイメージの保管 → Artifact Registry
  - 本番前承認ありのデプロイ → Cloud Deploy（承認ワークフロー）

答え: Cloud Build（CI）+ Cloud Deploy（CD・承認フロー）
理由: CI/CD パイプラインの自動化 + 承認ワークフローで人間のレビューも確保
```

#### パターン 4: GKE モードの選択

```text
問題: 「機械学習エンジニアのチームが
        GPU を使ったモデル学習ジョブを GKE で実行したい。
        GPU ノードプールの設定を細かく制御する必要がある。」

解法:

  - GPU ノードが必要 → 特殊なノード設定が必要
  - 細かいノード制御 → Autopilot ではなく Standard が適切
  - Autopilot は一般的なワークロード向け（GPU は限定的）

答え: GKE Standard
理由: GPU ノードの詳細設定・カスタムノードプール管理には Standard が必要
```

### 12.3 混同しやすいポイントの整理

| 混同パターン | 正しい理解 |
| --- | --- |
| Cloud Run = Cloud Functions | Cloud Run はコンテナ、Cloud Functions は関数（コード片）。用途が異なる |
| GKE Autopilot = サーバーレス | Autopilot はノード管理を Google に委任するが、コンテナは常時稼働できる |
| Cloud VPN = Cloud Interconnect | VPN はインターネット経由（安価）、Interconnect は専用線（高コスト・高品質） |
| Shared VPC = VPC Peering | Shared VPC: ホストの VPC を共有、Peering: 別々の VPC を接続（推移的ルーティングなし） |
| CI = CD | CI: 自動ビルド・テスト、CD: テスト済みコードのデプロイ自動化 |
| SLO = SLA | SLO: 組織内目標（高い）、SLA: ユーザーへの契約（SLO より低く設定） |
| Anthos = GKE | GKE は Google Cloud の K8s サービス、Anthos はオンプレ・他クラウドも含む統合管理 |
| マイクロサービス = コンテナ | コンテナはマイクロサービスの実装手段の一つ。モノリスをコンテナで動かすこともある |

### 12.4 Section 4 チェックリスト

```text
試験前の最終確認:

□ Compute Engine の主なマシンタイプと Spot VM のユースケースを説明できる
□ VM とコンテナの違いをビジネス価値を含めて説明できる
□ GKE Autopilot と Standard の使い分けを判断できる
□ Cloud Run と Cloud Functions の違いと使い分けを説明できる
□ VPC・サブネット・ファイアウォールの基本概念を説明できる
□ Shared VPC と VPC Peering の違いを説明できる
□ グローバル・リージョナル・内部ロードバランサーの使い分けを理解している
□ Cloud VPN と Cloud Interconnect の使い分けを判断できる
□ Cloud NAT が必要な理由を説明できる
□ Anthos の役割（ハイブリッド・マルチクラウド統合管理）を説明できる
□ CI/CD パイプライン（Cloud Build → Artifact Registry → Cloud Deploy）を説明できる
□ SLI・SLO・SLA・エラーバジェットの違いを説明できる
□ マイクロサービスアーキテクチャのメリットとトレードオフを説明できる
□ コスト最適化の 4 つの柱とツールを説明できる
```

---

## 13. 公式参照リソース一覧

| カテゴリ | リソース | URL |
| --- | --- | --- |
| **試験情報** | CDL 試験概要ページ | <https://cloud.google.com/learn/certification/cloud-digital-leader> |
| **試験情報** | 試験ガイド PDF | <https://services.google.com/fh/files/misc/cdl_exam_guide_english.pdf> |
| **モダナイゼーション** | アプリのモダナイゼーション | <https://cloud.google.com/solutions/application-modernization> |
| **Compute Engine** | Compute Engine 概要 | <https://cloud.google.com/compute/docs> |
| **Compute Engine** | マシンタイプ | <https://cloud.google.com/compute/docs/machine-resource> |
| **Compute Engine** | Spot VM | <https://cloud.google.com/compute/docs/instances/spot> |
| **Compute Engine** | Committed Use Discount | <https://cloud.google.com/compute/docs/instances/signing-up-committed-use-discounts> |
| **GKE** | GKE 概要 | <https://cloud.google.com/kubernetes-engine/docs> |
| **GKE** | Autopilot 概要 | <https://cloud.google.com/kubernetes-engine/docs/concepts/autopilot-overview> |
| **GKE** | GKE ベストプラクティス | <https://cloud.google.com/kubernetes-engine/docs/best-practices> |
| **Cloud Run** | Cloud Run 概要 | <https://cloud.google.com/run/docs> |
| **Cloud Run** | Cloud Run Jobs | <https://cloud.google.com/run/docs/create-jobs> |
| **Cloud Functions** | Cloud Functions 概要 | <https://cloud.google.com/functions/docs> |
| **App Engine** | App Engine 概要 | <https://cloud.google.com/appengine/docs> |
| **VPC** | VPC 概要 | <https://cloud.google.com/vpc/docs> |
| **VPC** | Shared VPC | <https://cloud.google.com/vpc/docs/shared-vpc> |
| **ロードバランサー** | Cloud Load Balancing | <https://cloud.google.com/load-balancing/docs> |
| **CDN** | Cloud CDN | <https://cloud.google.com/cdn/docs> |
| **接続** | Cloud VPN | <https://cloud.google.com/vpn/docs> |
| **接続** | Cloud Interconnect | <https://cloud.google.com/interconnect/docs> |
| **接続** | Cloud NAT | <https://cloud.google.com/nat/docs> |
| **Anthos** | Anthos 概要 | <https://cloud.google.com/anthos/docs> |
| **Anthos** | Google Distributed Cloud | <https://cloud.google.com/distributed-cloud/docs> |
| **DevOps** | Cloud Build | <https://cloud.google.com/build/docs> |
| **DevOps** | Cloud Deploy | <https://cloud.google.com/deploy/docs> |
| **DevOps** | Artifact Registry | <https://cloud.google.com/artifact-registry/docs> |
| **SRE** | Google SRE ブック | <https://sre.google/sre-book/table-of-contents/> |
| **API 管理** | Cloud Endpoints | <https://cloud.google.com/endpoints/docs> |
| **API 管理** | Apigee | <https://cloud.google.com/apigee/docs> |
| **メッセージング** | Eventarc | <https://cloud.google.com/eventarc/docs> |
| **コスト** | コスト最適化 | <https://cloud.google.com/cost-management/docs/best-practices> |
| **コスト** | Recommender | <https://cloud.google.com/recommender/docs> |

---

*本ガイドは Google Cloud Digital Leader（CDL）試験の Section 4 に特化した学習資料です。*
*試験の最新情報は必ず公式サイト（<https://cloud.google.com/learn/certification/cloud-digital-leader）でご確認ください。>*
*作成日: 2026年4月*
