# Domain 3: クラウドソリューションの正常なオペレーションの確保

## Google Cloud ACE 試験対策 — 完全詳細解説ガイド

> **対象読者**: Google Cloud 初学者〜中級者  
> **試験配点**: 全体の約 **27%**（Standard Exam: 50〜60問中 約14〜16問）  
> **公式ページ**: https://cloud.google.com/learn/certification/cloud-engineer?hl=en  
> **試験ガイド**: https://services.google.com/fh/files/misc/associate_cloud_engineer_exam_guide_english.pdf

---

## 📋 Domain 3 の全体マップ

```
Domain 3: クラウドソリューションの正常なオペレーションの確保（≈ 27%）
│
├── 3-A. コンピュートリソースの管理と維持
│   ├── Compute Engine のライフサイクル管理
│   ├── ディスクスナップショットの管理
│   ├── Managed Instance Group (MIG) の操作
│   ├── GKE クラスタ・ノードの管理
│   └── Cloud Run / Cloud Functions の管理
│
├── 3-B. ストレージとデータベースの管理
│   ├── Cloud Storage のデータ保護・管理
│   ├── Cloud SQL / Spanner のバックアップと復元
│   └── BigQuery データ管理
│
├── 3-C. オブザーバビリティ（可観測性）の確立
│   ├── Cloud Monitoring
│   │   ├── Ops Agent（メトリクス・ログ収集）
│   │   ├── カスタムダッシュボード
│   │   ├── アラートポリシーの設定
│   │   └── SLO（サービスレベル目標）の設定
│   ├── Cloud Logging
│   │   ├── 監査ログの種類と管理
│   │   ├── ログの検索・フィルタリング
│   │   ├── Log Router（シンク設定）
│   │   └── BigQuery / Cloud Storage へのエクスポート
│   ├── Cloud Trace / Cloud Profiler
│   └── Error Reporting
│
└── 3-D. AI 駆動の運用最適化
    ├── Gemini Cloud Assist
    └── Cloud Asset Inventory
```

---

## 📚 目次

1. [オペレーション管理の考え方（SRE 的アプローチ）](#ch1)
2. [Compute Engine のライフサイクル管理](#ch2)
3. [ディスクスナップショットの管理](#ch3)
4. [Managed Instance Group (MIG) の運用管理](#ch4)
5. [GKE クラスタの運用管理](#ch5)
6. [Cloud Run / Cloud Functions の管理](#ch6)
7. [Cloud Storage のデータ管理と保護](#ch7)
8. [Cloud SQL / Spanner のバックアップと復元](#ch8)
9. [Cloud Monitoring — メトリクスと可視化](#ch9)
10. [Ops Agent の導入と設定](#ch10)
11. [アラートポリシーと SLO の設定](#ch11)
12. [Cloud Logging — ログ管理の基本](#ch12)
13. [監査ログ（Audit Logs）の完全解説](#ch13)
14. [Log Router（ログのルーティングとエクスポート）](#ch14)
15. [Cloud Trace / Profiler / Error Reporting](#ch15)
16. [Gemini Cloud Assist と Cloud Asset Inventory](#ch16)
17. [Domain 3 試験対策まとめ](#ch17)

---

<div id="ch1"></div>

## Chapter 1: オペレーション管理の考え方（SRE 的アプローチ）

### 1.1 「正常なオペレーション」とは？

Domain 3 が求めるのは、システムを**デプロイした後に継続的に安全・健全に運用し続ける能力**です。

```
【クラウド運用の 3 つの柱】

①  信頼性（Reliability）
   └── システムが期待通りに動き続けること
       ・スナップショットによるバックアップ
       ・MIG の自動ヒーリング
       ・SLO による目標の定義と監視

②  可観測性（Observability）
   └── システムの「今何が起きているか」を把握できること
       ・Cloud Monitoring でメトリクスを収集
       ・Cloud Logging でログを集約・分析
       ・Cloud Trace で処理の遅延を特定

③  運用効率（Operational Efficiency）
   └── 手作業を減らし、問題を自動で検知・解決すること
       ・アラートで異常を自動通知
       ・Gemini Cloud Assist で障害の根本原因を AI が分析
       ・IaC でインフラをコードで管理
```

---

### 1.2 SRE（Site Reliability Engineering）の基本概念

Google が生み出した SRE の原則が ACE 試験に反映されています。

```
【SRE の核心概念】

SLI（Service Level Indicator）= 測定値
  例: 「過去 30 日間のリクエスト成功率は 99.95% だった」

SLO（Service Level Objective）= 目標
  例: 「リクエスト成功率を 99.9% 以上に保つ」

SLA（Service Level Agreement）= 契約
  例: 「99.9% を下回った場合、料金を返金する」

エラーバジェット（Error Budget）= 許容できる失敗量
  例: SLO が 99.9% なら
      エラーバジェット = 0.1% = 月間約 43.8 分のダウンタイム許容
```

---

<div id="ch2"></div>

## Chapter 2: Compute Engine のライフサイクル管理

### 2.1 VM のライフサイクルと状態管理

```
【VM のライフサイクル】

PROVISIONING（プロビジョニング中）
    ↓ リソース割り当て完了
STAGING（起動準備中）
    ↓ ブート完了
RUNNING（実行中）← 通常の稼働状態
    │
    ├── gcloud compute instances stop → STOPPING → TERMINATED（停止）
    │   ※ TERMINATED でもディスクのデータは保持される
    │   ※ TERMINATED 中も静的 IP・永続ディスクには課金が継続
    │
    ├── gcloud compute instances suspend → SUSPENDED（サスペンド）
    │   ※ メモリ状態を保持したまま停止（Hibernation）
    │   ※ 停止より再起動が速い
    │
    └── gcloud compute instances delete → STOPPING → DELETED
        ※ ディスクの削除設定に依存
```

---

### 2.2 VM の基本操作コマンド

```bash
# ===== VM の起動・停止・再起動 =====

# VM を停止（ディスクデータ保持・課金一部停止）
gcloud compute instances stop VM_NAME \
  --zone=asia-northeast1-a

# VM を起動
gcloud compute instances start VM_NAME \
  --zone=asia-northeast1-a

# VM を再起動
gcloud compute instances reset VM_NAME \
  --zone=asia-northeast1-a

# VM を一時停止（メモリ状態保持）
gcloud compute instances suspend VM_NAME \
  --zone=asia-northeast1-a

# ===== VM の情報確認 =====

# VM の一覧表示
gcloud compute instances list

# 特定プロジェクトの全リージョンの VM を表示
gcloud compute instances list --project=PROJECT_ID

# VM の詳細情報
gcloud compute instances describe VM_NAME \
  --zone=asia-northeast1-a \
  --format=json

# ===== VM の設定変更 =====

# VM のマシンタイプを変更（停止中のみ可能）
gcloud compute instances set-machine-type VM_NAME \
  --machine-type=n2-standard-8 \
  --zone=asia-northeast1-a

# VM にラベルを追加
gcloud compute instances add-labels VM_NAME \
  --labels=env=production,team=backend \
  --zone=asia-northeast1-a

# VM のメタデータを更新
gcloud compute instances add-metadata VM_NAME \
  --metadata=startup-script-url=gs://my-bucket/startup.sh \
  --zone=asia-northeast1-a
```

---

### 2.3 スタートアップスクリプトとシャットダウンスクリプト

```bash
# スタートアップスクリプト（VM 起動時に実行）
#!/bin/bash
# startup.sh
apt-get update -y
apt-get install -y nginx
systemctl start nginx
systemctl enable nginx
echo "Startup complete: $(date)" >> /var/log/startup.log

# スタートアップスクリプトを VM に設定
gcloud compute instances create VM_NAME \
  --metadata-from-file startup-script=startup.sh \
  --zone=asia-northeast1-a

# GCS からスタートアップスクリプトを読み込む
gcloud compute instances create VM_NAME \
  --metadata=startup-script-url=gs://my-bucket/startup.sh \
  --zone=asia-northeast1-a
```

```bash
# シャットダウンスクリプト（VM 停止前に実行、最大 90 秒）
#!/bin/bash
# shutdown.sh
echo "Shutdown initiated: $(date)" >> /var/log/shutdown.log

# 処理中のデータをバックアップ
gsutil cp /var/app/data/*.json gs://my-backup-bucket/$(date +%Y%m%d%H%M%S)/

# アプリを graceful に停止
systemctl stop my-app
echo "Shutdown complete: $(date)" >> /var/log/shutdown.log
```

---

### 2.4 VM の Serial Console（シリアルコンソール）デバッグ

SSH でアクセスできない障害時のデバッグ手段です。

```bash
# シリアルコンソールへのアクセスを有効化
gcloud compute instances add-metadata VM_NAME \
  --metadata=serial-port-enable=TRUE \
  --zone=asia-northeast1-a

# シリアルコンソールに接続
gcloud compute connect-to-serial-port VM_NAME \
  --zone=asia-northeast1-a

# シリアルポートのログを確認（最後の 100 行）
gcloud compute instances get-serial-port-output VM_NAME \
  --zone=asia-northeast1-a \
  --port=1 \
  --start=0 | tail -100
```

#### ✅ ベストプラクティス: Compute Engine ライフサイクル管理

| # | ベストプラクティス | 理由 |
| --- | ------------------- | ------ |
| 1 | **停止・起動の自動化**（Cloud Scheduler + Cloud Functions）で開発 VM を夜間停止 | コスト削減 |
| 2 | **ラベルを必ず付けて**管理（env, team, cost-center） | 棚卸し・コスト分析の基盤 |
| 3 | **シリアルコンソールは必要時だけ有効化**（通常は無効） | 不正アクセスのリスク低減 |
| 4 | **停止前にスナップショットを自動取得**（スナップショットスケジュール） | データ保護 |

> 🔗 **参考**: https://cloud.google.com/blog/products/compute/top-compute-engine-documentation-pages/

---

<div id="ch3"></div>

## Chapter 3: ディスクスナップショットの管理

### 3.1 スナップショットとは？

スナップショットは Persistent Disk（永続ディスク）の**ポイントインタイムコピー**です。

```
【スナップショットの仕組み】

時刻 T1: スナップショット A（完全バックアップ）
    ↓ 差分データだけ保存
時刻 T2: スナップショット B（増分バックアップ）
    ↓ さらに差分データだけ保存
時刻 T3: スナップショット C（増分バックアップ）

【増分バックアップの特徴】
  ✓ 初回以降は差分のみ → ストレージコストが少ない
  ✓ どのスナップショットからでも完全復元が可能
  ✓ 古いスナップショットを削除しても
    依存する新しいスナップショットは引き続き有効
```

---

### 3.2 スナップショットの整合性レベル

これは ACE 試験で頻繁に問われる重要な概念です。

#### クラッシュ整合性スナップショット（Crash-Consistent）

```
【仕組み】
アプリを停止せず、そのままスナップショットを取得

【メリット】
  ✓ アプリを停止する必要がない（無停止で取得）
  ✓ 取得が素早い

【デメリット】
  ✗ メモリ上のデータ（未書き込みバッファ）はキャプチャされない
  ✗ 復元後、OS がクラッシュ後の起動と同じプロセスを実行する

【適切なユースケース】
  ├── OS ディスク（Linux / Windows ともに対応）
  └── ステートレスなアプリのディスク
```

#### アプリケーション整合性スナップショット（Application-Consistent）

```
【仕組み】
1. アプリに「書き込みを一時停止して」と指示（Freeze）
2. メモリ上のデータをディスクにフラッシュ
3. スナップショットを取得
4. アプリの書き込みを再開（Thaw）

【メリット】
  ✓ メモリ上のデータも含めた完全な整合性
  ✓ 復元後のデータ整合性が保証される

【デメリット】
  ✗ アプリ側のサポートが必要（VSS、fsfreeze など）
  ✗ 取得中に書き込み I/O が一時停止される

【適切なユースケース】
  ├── データベース（MySQL、PostgreSQL など）
  └── トランザクション処理をしているアプリ
```

---

### 3.3 スナップショットの取得方法

#### 手動スナップショット

```bash
# 基本的なスナップショット取得
gcloud compute disks snapshot DISK_NAME \
  --snapshot-names=my-snapshot-$(date +%Y%m%d%H%M%S) \
  --zone=asia-northeast1-a \
  --description="Manual backup before maintenance"

# 別リージョンに保存（DR 対策）
gcloud compute disks snapshot DISK_NAME \
  --snapshot-names=my-snapshot-cross-region \
  --zone=asia-northeast1-a \
  --storage-location=us-central1  # 別リージョンに保存

# 複数ディスクを同時にスナップショット
gcloud compute disks snapshot DISK1 DISK2 DISK3 \
  --zone=asia-northeast1-a
```

#### スナップショットスケジュール（定期自動取得）

```bash
# 1時間ごとのスナップショットスケジュールを作成
gcloud compute resource-policies create snapshot-schedule hourly-backup \
  --region=asia-northeast1 \
  --max-retention-days=7 \           # 7日間保持
  --start-time=00:00 \               # UTC 00:00 から開始
  --hourly-schedule=1 \              # 1時間ごと
  --on-source-disk-delete=keep-auto-snapshots  # ディスク削除後も保持

# ディスクにスケジュールを適用
gcloud compute disks add-resource-policies DISK_NAME \
  --resource-policies=hourly-backup \
  --zone=asia-northeast1-a
```

```bash
# 毎日深夜 2 時にスナップショットを取得（日次バックアップ）
gcloud compute resource-policies create snapshot-schedule daily-backup \
  --region=asia-northeast1 \
  --max-retention-days=30 \          # 30日間保持
  --start-time=17:00 \               # UTC 17:00 = JST 02:00
  --daily-schedule                   # 毎日実行
```

---

### 3.4 Linux でのスナップショット最適化

#### fstrim によるスナップショットの高速化

```bash
# スナップショット取得前に fstrim を実行
# 効果: スナップショットのサイズ削減 + 作成速度向上

# fstrim の実行（未使用ブロックを OS がファイルシステムに通知）
sudo fstrim -v /
# 出力例: /: 50 GiB (53687091200 bytes) trimmed

# マウントオプションで定期的に discard を有効化
# /etc/fstab:
# /dev/sdb /data ext4 defaults,discard 0 0
#                              ↑ これで自動的に TRIM が実行される
```

#### アプリケーション整合性スナップショットの取得（Linux）

```bash
# 方法1: fsfreeze を使ってファイルシステムを凍結
# ステップ1: ファイルシステムをフリーズ（書き込み停止）
sudo fsfreeze --freeze /data

# ステップ2: スナップショット取得
gcloud compute disks snapshot DISK_NAME \
  --zone=asia-northeast1-a \
  --snapshot-names=app-consistent-snap

# ステップ3: フリーズ解除（必ず実行！忘れると書き込み不可になる）
sudo fsfreeze --unfreeze /data

# 方法2: MySQL でのアプリケーション整合性スナップショット
mysql -u root -e "FLUSH TABLES WITH READ LOCK;"
gcloud compute disks snapshot DISK_NAME --zone=asia-northeast1-a
mysql -u root -e "UNLOCK TABLES;"
```

---

### 3.5 スナップショットからの復元

```bash
# スナップショットの一覧確認
gcloud compute snapshots list

# スナップショットの詳細確認
gcloud compute snapshots describe SNAPSHOT_NAME

# スナップショットから新しいディスクを作成
gcloud compute disks create new-disk-from-snapshot \
  --source-snapshot=SNAPSHOT_NAME \
  --zone=asia-northeast1-a \
  --size=100GB \
  --type=pd-balanced

# 作成したディスクを VM にアタッチ
gcloud compute instances attach-disk VM_NAME \
  --disk=new-disk-from-snapshot \
  --zone=asia-northeast1-a
```

---

### 3.6 スナップショットのコスト管理

```
【スナップショットの料金】
  ストレージ料金: $0.026/GB/月（マルチリージョン）
                 $0.020/GB/月（リージョン）

【コスト最適化】
  ├── 増分スナップショット活用（初回以降は差分のみ）
  ├── 保持期間を適切に設定（古いスナップショットを自動削除）
  ├── fstrim でスナップショットサイズを削減
  └── DR 要件がなければ同一リージョン内に保存
```

#### ✅ ベストプラクティス: スナップショット管理

| # | ベストプラクティス | 根拠 |
| --- | ------------------- | ------ |
| 1 | **スナップショットスケジュールで 1 時間ごとに自動取得** | RPO（目標復旧時点）を最大 1 時間以内に |
| 2 | **本番 DB は必ずアプリケーション整合性スナップショット** | データ整合性を保証 |
| 3 | **Linux では fstrim を事前実行**（または `discard` マウントオプション） | スナップショットサイズ削減 |
| 4 | **別リージョンに DR コピー**（`--storage-location` 指定） | リージョン障害からの復旧 |
| 5 | **`--max-retention-days` で古いスナップショットを自動削除** | ストレージコストの最適化 |

> 🔗 **参考**: https://docs.cloud.google.com/compute/docs/disks/snapshot-best-practices

---

<div id="ch4"></div>

## Chapter 4: Managed Instance Group (MIG) の運用管理

### 4.1 MIG のアップデート戦略

本番環境でのアップデートは、ダウンタイムゼロを目指した計画が必要です。

#### ローリングアップデート

```
【ローリングアップデートの流れ】

現在の状態: [v1][v1][v1][v1][v1][v1] (6台)

Step 1: 1台を v2 に更新
        [v2][v1][v1][v1][v1][v1]
        ↓ ヘルスチェック通過を確認

Step 2: さらに 1 台を更新
        [v2][v2][v1][v1][v1][v1]
        ↓ ...

Step N: 全台更新完了
        [v2][v2][v2][v2][v2][v2]

キーパラメータ:
  --max-surge=2      → 同時に追加できる新バージョンの台数
  --max-unavailable=0 → 同時に停止できる台数（0 = ゼロダウンタイム）
```

```bash
# インスタンステンプレートを v2 に更新（ローリング）
gcloud compute instance-groups managed rolling-action start-update my-mig \
  --version=template=my-template-v2 \
  --max-surge=1 \
  --max-unavailable=0 \
  --region=asia-northeast1

# アップデートの進捗を確認
gcloud compute instance-groups managed describe my-mig \
  --region=asia-northeast1

# アップデートをキャンセル（進行中の場合）
gcloud compute instance-groups managed rolling-action stop-proactive-update my-mig \
  --region=asia-northeast1
```

#### カナリアデプロイ（段階的ロールアウト）

```bash
# v2 を 10% のインスタンスだけに適用
gcloud compute instance-groups managed rolling-action start-update my-mig \
  --version=template=my-template-v1,name=stable \
  --canary-version=template=my-template-v2,target-size=10%,name=canary \
  --region=asia-northeast1

# 問題なければ v2 を 100% に拡大
gcloud compute instance-groups managed rolling-action start-update my-mig \
  --version=template=my-template-v2 \
  --region=asia-northeast1

# 問題があれば v1 にロールバック
gcloud compute instance-groups managed rolling-action start-update my-mig \
  --version=template=my-template-v1 \
  --region=asia-northeast1
```

---

### 4.2 MIG の手動スケーリングと緊急操作

```bash
# MIG のサイズを手動で変更
gcloud compute instance-groups managed resize my-mig \
  --size=10 \
  --region=asia-northeast1

# 特定のインスタンスを再作成（問題のある VM をリフレッシュ）
gcloud compute instance-groups managed recreate-instances my-mig \
  --instances=my-mig-abc1,my-mig-def2 \
  --region=asia-northeast1

# 特定のインスタンスを MIG から削除（スケールイン）
gcloud compute instance-groups managed delete-instances my-mig \
  --instances=my-mig-abc1 \
  --region=asia-northeast1

# オートスケーリングの一時無効化（メンテナンス時）
gcloud compute instance-groups managed set-autoscaling my-mig \
  --mode=off \
  --region=asia-northeast1

# オートスケーリングを再有効化
gcloud compute instance-groups managed set-autoscaling my-mig \
  --mode=on \
  --region=asia-northeast1
```

---

### 4.3 MIG のヘルスチェックと自動ヒーリング

```bash
# HTTP ヘルスチェックの作成
gcloud compute health-checks create http my-health-check \
  --port=8080 \
  --request-path=/healthz \
  --check-interval=30s \
  --timeout=10s \
  --healthy-threshold=1 \    # 1回成功でヘルシーに
  --unhealthy-threshold=3    # 3回失敗でアンヘルシーに

# MIG に自動ヒーリングを設定
gcloud compute instance-groups managed set-autohealing my-mig \
  --health-check=my-health-check \
  --initial-delay=300s \     # 起動後 300 秒はヒーリングしない（起動時間を確保）
  --region=asia-northeast1

# ヘルスチェックの状態を確認
gcloud compute backend-services get-health my-backend-service \
  --global
```

---

<div id="ch5"></div>

## Chapter 5: GKE クラスタの運用管理

### 5.1 GKE クラスタのバージョン管理とアップグレード

#### Kubernetes バージョンの理解

```
GKE のバージョン形式: MAJOR.MINOR.PATCH-gke.N
例: 1.29.3-gke.1200

サポートポリシー:
  ├── GKE は常に 3 つのマイナーバージョンをサポート
  │   例: 1.27, 1.28, 1.29
  ├── サポート終了バージョンは自動アップグレードされる
  └── リリースチャンネルで自動アップグレードを管理

リリースチャンネル:
  ├── Rapid: 最新版（プレビュー機能あり）→ テスト環境向け
  ├── Regular: バランス型 → 本番推奨
  └── Stable: 安定版（遅め）→ ミッションクリティカル向け
```

```bash
# クラスタのバージョンを確認
gcloud container clusters describe my-cluster \
  --region=asia-northeast1 \
  --format="value(currentMasterVersion,currentNodeVersion)"

# クラスタのコントロールプレーンをアップグレード
gcloud container clusters upgrade my-cluster \
  --master \
  --cluster-version=1.29 \
  --region=asia-northeast1

# ノードプールをアップグレード
gcloud container clusters upgrade my-cluster \
  --node-pool=default-pool \
  --cluster-version=1.29 \
  --region=asia-northeast1
```

---

### 5.2 GKE のノード管理

```bash
# ノードプールの一覧確認
gcloud container node-pools list \
  --cluster=my-cluster \
  --region=asia-northeast1

# ノードプールのサイズ変更（手動スケーリング）
gcloud container clusters resize my-cluster \
  --node-pool=default-pool \
  --num-nodes=5 \
  --region=asia-northeast1

# ノードのコードレイン（安全に Pod を退避してからメンテナンス）
kubectl drain NODE_NAME \
  --ignore-daemonsets \
  --delete-emptydir-data

# メンテナンス後にノードを再稼働
kubectl uncordon NODE_NAME
```

---

### 5.3 kubectl による Pod・Deployment の管理

```bash
# ===== Pod の管理 =====

# Pod の一覧確認
kubectl get pods -n my-namespace -o wide

# Pod の詳細確認（障害調査）
kubectl describe pod POD_NAME -n my-namespace

# Pod のログ確認
kubectl logs POD_NAME -n my-namespace
kubectl logs POD_NAME -n my-namespace -c CONTAINER_NAME  # 複数コンテナ時
kubectl logs POD_NAME -n my-namespace --previous          # 前回クラッシュのログ

# Pod 内でコマンド実行（デバッグ）
kubectl exec -it POD_NAME -n my-namespace -- /bin/bash

# Pod の強制削除（Terminating で止まった場合）
kubectl delete pod POD_NAME -n my-namespace --grace-period=0 --force

# ===== Deployment の管理 =====

# Deployment の状況確認
kubectl get deployments -n my-namespace
kubectl rollout status deployment/my-app -n my-namespace

# Deployment のスケーリング
kubectl scale deployment/my-app --replicas=5 -n my-namespace

# Deployment のイメージ更新（ローリングアップデート）
kubectl set image deployment/my-app \
  my-container=gcr.io/PROJECT/my-app:v2 \
  -n my-namespace

# アップデートのロールバック
kubectl rollout undo deployment/my-app -n my-namespace

# 特定バージョンにロールバック
kubectl rollout undo deployment/my-app \
  --to-revision=2 \
  -n my-namespace

# ロールアウト履歴の確認
kubectl rollout history deployment/my-app -n my-namespace
```

---

### 5.4 GKE の Workload 診断

```bash
# クラスタ全体のリソース使用状況
kubectl top nodes
kubectl top pods -n my-namespace

# イベントの確認（障害の手がかり）
kubectl get events -n my-namespace --sort-by=.lastTimestamp

# Pod の再起動回数を確認（クラッシュループの検出）
kubectl get pods -n my-namespace \
  -o jsonpath='{range .items[*]}{.metadata.name}{"\t"}{.status.containerStatuses[0].restartCount}{"\n"}{end}'
```

#### ✅ ベストプラクティス: GKE 運用管理

| # | ベストプラクティス |
| --- | ------------------- |
| 1 | **リリースチャンネルを設定**して Kubernetes バージョンを自動管理 |
| 2 | **`kubectl rollout undo`** ですぐにロールバックできる体制を整える |
| 3 | **`kubectl drain`** でノードをメンテナンスモードにしてから作業 |
| 4 | **Managed Service for Prometheus** で GKE メトリクスを収集 |
| 5 | **Pod の `restartCount` を監視**してクラッシュループを早期検知 |

---

<div id="ch6"></div>

## Chapter 6: Cloud Run / Cloud Functions の管理

### 6.1 Cloud Run の運用管理

```bash
# Cloud Run サービスの一覧確認
gcloud run services list --region=asia-northeast1

# サービスの詳細確認
gcloud run services describe my-service \
  --region=asia-northeast1

# サービスのリビジョン（バージョン）一覧
gcloud run revisions list \
  --service=my-service \
  --region=asia-northeast1

# トラフィック分割の確認・変更
gcloud run services describe my-service \
  --region=asia-northeast1 \
  --format="value(status.traffic)"

# リビジョン v2 に 100% 切り替え
gcloud run services update-traffic my-service \
  --to-revisions=my-service-v2=100 \
  --region=asia-northeast1

# 前のリビジョンにロールバック
gcloud run services update-traffic my-service \
  --to-latest \
  --region=asia-northeast1
```

---

### 6.2 Cloud Run のスケーリング設定

```bash
# 最小・最大インスタンス数の設定
gcloud run services update my-service \
  --min-instances=1 \    # コールドスタートを防ぐ（常に 1 インスタンス待機）
  --max-instances=100 \  # コスト暴走防止の上限
  --region=asia-northeast1

# 同時実行数の設定（1インスタンスあたりの最大リクエスト数）
gcloud run services update my-service \
  --concurrency=80 \     # デフォルト 80（最大 1000）
  --region=asia-northeast1

# タイムアウトの設定
gcloud run services update my-service \
  --timeout=300s \       # 最大 3600s（60分）
  --region=asia-northeast1
```

---

### 6.3 Cloud Functions の管理

```bash
# Cloud Functions の一覧確認
gcloud functions list --region=asia-northeast1

# 関数のデプロイ
gcloud functions deploy my-function \
  --runtime=python311 \
  --trigger-http \
  --entry-point=main \
  --region=asia-northeast1 \
  --memory=256MB \
  --timeout=60s \
  --set-env-vars=ENV=production

# 関数のログ確認
gcloud functions logs read my-function \
  --region=asia-northeast1 \
  --limit=50

# 関数の削除
gcloud functions delete my-function \
  --region=asia-northeast1
```

---

<div id="ch7"></div>

## Chapter 7: Cloud Storage のデータ管理と保護

### 7.1 Cloud Storage の運用操作

```bash
# ===== オブジェクト操作 =====

# バケットの一覧
gcloud storage buckets list

# オブジェクトのコピー
gcloud storage cp local-file.txt gs://my-bucket/path/

# ディレクトリ全体をコピー（再帰的）
gcloud storage cp -r ./local-dir/ gs://my-bucket/backup/

# オブジェクトの移動（別バケットへ）
gcloud storage mv gs://source-bucket/file.txt gs://dest-bucket/file.txt

# オブジェクトの削除
gcloud storage rm gs://my-bucket/old-file.txt

# バケット内全オブジェクトの削除
gcloud storage rm -r gs://my-bucket/**

# オブジェクトのメタデータ確認
gcloud storage objects describe gs://my-bucket/file.txt

# ===== アクセス制御 =====

# バケットの IAM ポリシー確認
gcloud storage buckets get-iam-policy gs://my-bucket

# ユーザーに読み取り権限を付与
gcloud storage buckets add-iam-policy-binding gs://my-bucket \
  --member="user:alice@example.com" \
  --role="roles/storage.objectViewer"
```

---

### 7.2 Cloud Storage のデータ保護機能

#### バケットロック（Bucket Lock）と保持ポリシー

```
【保持ポリシーとは？】

例: 金融規制により「7年間はログを削除・変更禁止」

バケットにポリシーを設定:
  gcloud storage buckets update gs://my-compliance-bucket \
    --retention-period=7y

効果:
  ├── バケット内のすべてのオブジェクトが
  │   7 年間（設定日から）削除・上書き不可になる
  └── 新しくアップロードしたオブジェクトも
      アップロード時点から 7 年間保護される

【バケットロック（取り消し不可！）】
  保持ポリシーを永久に変更できないようにロック
  
  gcloud storage buckets lock \
    gs://my-compliance-bucket
  
  ⚠️ バケットロックは一度かけると絶対に解除できません！
     本当に必要な場合のみ実行してください。
```

#### オブジェクト保持ロック（Object Retention Lock）

```bash
# オブジェクト単位での保持ロック設定
gcloud storage objects update gs://my-bucket/important-file.txt \
  --retain-until=2031-12-31T23:59:59Z \
  --retention-mode=LOCKED  # LOCKED=変更不可 / UNLOCKED=変更可能
```

#### バージョニングとライフサイクル管理

```bash
# バージョニングの有効化
gcloud storage buckets update gs://my-bucket --versioning

# 非最新バージョンの一覧確認
gcloud storage objects list gs://my-bucket --all-versions

# 特定バージョンを最新バージョンとして復元
# (元のオブジェクトをコピーして上書き)
gcloud storage cp gs://my-bucket/file.txt#GENERATION \
  gs://my-bucket/file.txt

# ライフサイクルポリシーを適用
gcloud storage buckets update gs://my-bucket \
  --lifecycle-file=lifecycle.json
```

---

<div id="ch8"></div>

## Chapter 8: Cloud SQL / Spanner のバックアップと復元

### 8.1 Cloud SQL のバックアップ

#### 自動バックアップ

```bash
# 自動バックアップの有効化（新規インスタンス作成時）
gcloud sql instances create my-postgres \
  --database-version=POSTGRES_15 \
  --tier=db-n1-standard-4 \
  --region=asia-northeast1 \
  --backup-start-time=02:00 \          # JST 11:00 = UTC 02:00
  --backup-location=asia-northeast1 \
  --retained-backups-count=14 \        # 14 日分保持
  --retained-transaction-log-days=7    # トランザクションログ 7 日保持

# 既存インスタンスの自動バックアップを更新
gcloud sql instances patch my-postgres \
  --backup-start-time=02:00 \
  --retained-backups-count=30
```

#### 手動バックアップ（オンデマンドバックアップ）

```bash
# 手動バックアップを即時作成
gcloud sql backups create \
  --instance=my-postgres \
  --description="Pre-maintenance backup $(date +%Y%m%d)"

# バックアップ一覧の確認
gcloud sql backups list --instance=my-postgres

# バックアップの詳細確認
gcloud sql backups describe BACKUP_ID \
  --instance=my-postgres
```

#### Cloud SQL の復元

```bash
# バックアップから同じインスタンスに復元
gcloud sql backups restore BACKUP_ID \
  --restore-instance=my-postgres

# バックアップから別インスタンスに復元（本番データを壊さずテスト）
gcloud sql backups restore BACKUP_ID \
  --restore-instance=my-postgres-restore-test

# PITR（ポイントインタイムリカバリ）
# 特定の時刻の状態に復元（トランザクションログを使用）
gcloud sql instances clone my-postgres my-postgres-pitr \
  --point-in-time=2024-01-15T10:30:00Z
```

---

### 8.2 Cloud SQL のリードレプリカ管理

```bash
# リードレプリカの作成
gcloud sql instances create my-postgres-replica \
  --master-instance-name=my-postgres \
  --region=us-central1 \               # 別リージョンに配置可能（クロスリージョンレプリカ）
  --tier=db-n1-standard-4

# リードレプリカのプロモート（プライマリに昇格）
# 障害時や計画的な移行時に使用
gcloud sql instances promote-replica my-postgres-replica

# レプリカのラグ（遅延）確認
gcloud sql instances describe my-postgres-replica \
  --format="value(replicaConfiguration.mysqlReplicaConfiguration.masterHeartbeatPeriod)"
```

---

### 8.3 Cloud Spanner のバックアップ

```bash
# Spanner のバックアップ作成
gcloud spanner backups create my-backup \
  --instance=my-spanner-instance \
  --database=my-database \
  --expiration-date=2024-04-01T00:00:00Z  # 有効期限を設定

# バックアップ一覧確認
gcloud spanner backups list \
  --instance=my-spanner-instance

# バックアップから復元
gcloud spanner databases restore \
  --destination-instance=my-spanner-instance \
  --destination-database=my-database-restored \
  --source-backup=projects/PROJECT/instances/my-spanner-instance/backups/my-backup
```

#### ✅ ベストプラクティス: ストレージとDB管理

| # | ベストプラクティス |
| --- | ------------------- |
| 1 | **Cloud SQL の自動バックアップ + PITR を有効化**（最低 7 日間のトランザクションログ保持） |
| 2 | **本番環境は Cloud SQL HA 構成**（リージョナル可用性タイプを選択） |
| 3 | **定期的にバックアップからの復元テストを実施**（復元できることを確認） |
| 4 | **Spanner バックアップは有効期限を設定**（コスト管理） |
| 5 | **規制データには Cloud Storage の保持ポリシー + バケットロック** |

> 🔗 **参考**: https://docs.cloud.google.com/sql/docs/postgres/backup-recovery/backing-up

---

<div id="ch9"></div>

## Chapter 9: Cloud Monitoring — メトリクスと可視化

### 9.1 Cloud Monitoring の全体像

```
【Cloud Monitoring でできること】

メトリクスの収集:
  ├── GCP サービスのメトリクス（自動収集）
  │   例: CPU 使用率、ネットワーク I/O、HTTP リクエスト数
  ├── VM 内部のメトリクス（Ops Agent が必要）
  │   例: メモリ使用量、ディスク使用率、プロセス数
  └── カスタムメトリクス（アプリが送信）
      例: キューの長さ、ビジネスKPI

可視化:
  └── カスタムダッシュボードでグラフを作成

アラート:
  └── 閾値超過時に Email / PagerDuty / Slack / Pub/Sub に通知

SLO モニタリング:
  └── サービスレベル目標の達成状況を可視化・管理
```

---

### 9.2 重要なメトリクスの種類

#### GCP サービスが自動で収集するメトリクス（エージェント不要）

| リソース | メトリクス名 | 説明 |
| --------- | ------------ | ------ |
| Compute Engine | `compute.googleapis.com/instance/cpu/utilization` | CPU 使用率（0〜1.0） |
| Compute Engine | `compute.googleapis.com/instance/network/sent_bytes_count` | 送信バイト数 |
| Cloud SQL | `cloudsql.googleapis.com/database/cpu/utilization` | DB の CPU 使用率 |
| Cloud SQL | `cloudsql.googleapis.com/database/disk/bytes_used` | ディスク使用量 |
| GKE | `container.googleapis.com/container/cpu/usage_time` | コンテナ CPU 使用量 |
| Cloud Run | `run.googleapis.com/request_count` | リクエスト数 |
| Cloud Load Balancing | `loadbalancing.googleapis.com/https/request_count` | LB へのリクエスト数 |

> ⚠️ **試験頻出**: **メモリ使用量**は Ops Agent を別途インストールしないと取得できません！  
> `compute.googleapis.com/instance/cpu/utilization` はエージェントなしで取得可能ですが、  
> `agent.googleapis.com/memory/percent_used` は **Ops Agent が必要** です。

---

### 9.3 カスタムダッシュボードの作成

```bash
# gcloud でダッシュボードを作成（JSON定義）
gcloud monitoring dashboards create \
  --config-from-file=dashboard.json

# ダッシュボードの一覧確認
gcloud monitoring dashboards list

# ダッシュボードの詳細確認
gcloud monitoring dashboards describe DASHBOARD_ID
```

#### ダッシュボードの JSON 定義例

```json
{
  "displayName": "My Application Dashboard",
  "gridLayout": {
    "columns": "2",
    "widgets": [
      {
        "title": "CPU Utilization",
        "xyChart": {
          "dataSets": [
            {
              "timeSeriesQuery": {
                "timeSeriesFilter": {
                  "filter": "metric.type=\"compute.googleapis.com/instance/cpu/utilization\" resource.type=\"gce_instance\"",
                  "aggregation": {
                    "alignmentPeriod": "60s",
                    "perSeriesAligner": "ALIGN_MEAN"
                  }
                }
              }
            }
          ]
        }
      }
    ]
  }
}
```

---

### 9.4 MQL（Monitoring Query Language）の基本

MQL は Cloud Monitoring でメトリクスを柔軟に集計・分析するためのクエリ言語です。

```
# 基本構文
fetch リソースタイプ
| metric 'メトリクス名'
| filter フィルタ条件
| align アライメント
| every 集計間隔
| group_by グループキー, 集計関数

# 例1: プロジェクト内の全 VM の平均 CPU 使用率
fetch gce_instance
| metric 'compute.googleapis.com/instance/cpu/utilization'
| align mean_aligner()
| every 1m
| group_by [], mean(val())

# 例2: Cloud NAT のポート使用量を監視
fetch nat_gateway
| metric 'compute.googleapis.com/nat/port_usage'
| align mean_aligner()
| every 1m

# 例3: HTTP 5xx エラー率
fetch https_lb_rule
| metric 'loadbalancing.googleapis.com/https/request_count'
| filter (metric.labels.response_code_class == '500')
| align rate(1m)
| every 1m

# 例4: GKE ノードのメモリ使用率（Ops Agent 経由）
fetch k8s_node
| metric 'kubernetes.io/node/memory/used_bytes'
| align mean_aligner()
| every 1m
```

---

<div id="ch10"></div>

## Chapter 10: Ops Agent の導入と設定

### 10.1 Ops Agent とは？

Ops Agent は、Compute Engine VM 上でのメトリクス収集とログ収集を担う統合エージェントです。

```
【Ops Agent の内部構成】

Ops Agent
├── Fluent Bit（ログ収集コンポーネント）
│   └── ログを Cloud Logging に転送
└── OpenTelemetry Collector（メトリクス収集コンポーネント）
    └── メトリクスを Cloud Monitoring に転送

【Ops Agent が収集するもの（旧エージェントとの違い）】

従来の Stackdriver エージェント:
  └── メモリ・ディスクなどの基本システムメトリクス

Ops Agent（現在の推奨）:
  ├── メモリ使用量（%）
  ├── ディスク使用率（%）
  ├── ネットワーク接続数
  ├── プロセスごとの CPU・メモリ
  ├── アプリケーションログ（nginx, mysql, apache など）
  └── カスタムログファイル
```

---

### 10.2 Ops Agent のインストール

```bash
# ===== 方法 1: VM にSSHして手動インストール =====

# インストールスクリプトをダウンロードして実行
curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
sudo bash add-google-cloud-ops-agent-repo.sh --also-install

# インストール確認
sudo systemctl status google-cloud-ops-agent

# ===== 方法 2: gcloud でリモートインストール =====
# （VM への SSH 不要）

# 単一 VM にインストール
gcloud compute instances ops-agents policies create my-ops-agent-policy \
  --agent-rules="type=ops-agent,version=current-major,package-state=installed,enable-autoupgrade=true" \
  --os-types=short-name=debian,version=11 \
  --instances=zones/asia-northeast1-a/instances/my-vm

# ===== 方法 3: VM 作成時にスタートアップスクリプトでインストール =====

# startup.sh
#!/bin/bash
curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
sudo bash add-google-cloud-ops-agent-repo.sh --also-install
```

---

### 10.3 Ops Agent の設定カスタマイズ

設定ファイル: `/etc/google-cloud-ops-agent/config.yaml`

```yaml
# Ops Agent の設定例
# /etc/google-cloud-ops-agent/config.yaml

logging:
  receivers:
    # nginx アクセスログを収集
    nginx_access_log:
      type: files
      include_paths:
        - /var/log/nginx/access.log
    # nginx エラーログを収集
    nginx_error_log:
      type: files
      include_paths:
        - /var/log/nginx/error.log
    # アプリケーション独自ログを収集
    my_app_log:
      type: files
      include_paths:
        - /var/log/my-app/*.log

  processors:
    # JSON 形式のログをパース
    parse_json:
      type: parse_json
      field: message
      time_key: timestamp
      time_format: '%Y-%m-%dT%H:%M:%S.%L%Z'

  exporters:
    google:
      type: google_cloud_logging

  service:
    pipelines:
      nginx_pipeline:
        receivers: [nginx_access_log, nginx_error_log]
        exporters: [google]
      app_pipeline:
        receivers: [my_app_log]
        processors: [parse_json]
        exporters: [google]

metrics:
  receivers:
    # ホストメトリクス（デフォルト）
    hostmetrics:
      type: hostmetrics
      collection_interval: 60s
    # MySQL メトリクスを収集
    mysql:
      type: mysql
      endpoint: localhost:3306
      username: monitoring_user
      password: ${MYSQL_MONITORING_PASSWORD}

  exporters:
    google:
      type: google_cloud_monitoring

  service:
    pipelines:
      host_pipeline:
        receivers: [hostmetrics]
        exporters: [google]
      mysql_pipeline:
        receivers: [mysql]
        exporters: [google]
```

設定を反映:

```bash
# 設定ファイルの検証
sudo google-cloud-ops-agent \
  --config=/etc/google-cloud-ops-agent/config.yaml \
  --check

# Ops Agent を再起動して設定を反映
sudo systemctl restart google-cloud-ops-agent

# ログで動作確認
sudo journalctl -u google-cloud-ops-agent -n 50
```

---

### 10.4 Kubernetes / GKE での Prometheus 監視

GKE 環境では Ops Agent ではなく **Managed Service for Prometheus** を使用します。

```
【なぜ Managed Service for Prometheus？】

通常の Prometheus:
  ├── Prometheus サーバーを自分でデプロイ・管理
  ├── ストレージの管理が必要
  └── スケーリングを手動で対応

Google Cloud Managed Service for Prometheus:
  ├── Prometheus 互換の API（既存の設定を流用可能）
  ├── ストレージは Cloud Monitoring が管理
  ├── 自動スケーリング
  └── PodMonitoring / ClusterPodMonitoring CRD で設定
```

```yaml
# PodMonitoring - 特定の Pod のメトリクスを収集
apiVersion: monitoring.googleapis.com/v1
kind: PodMonitoring
metadata:
  name: my-app-monitoring
  namespace: my-app
spec:
  selector:
    matchLabels:
      app: my-app
  endpoints:
  - port: metrics       # Prometheus メトリクスのポート番号
    interval: 30s       # スクレイプ間隔
    path: /metrics      # メトリクスエンドポイントのパス
```

```bash
# Managed Service for Prometheus を有効化
gcloud container clusters update my-cluster \
  --enable-managed-prometheus \
  --region=asia-northeast1
```

---

<div id="ch11"></div>

## Chapter 11: アラートポリシーと SLO の設定

### 11.1 アラートポリシーの設計

```
【良いアラートの条件】

1. 重要なものだけアラートにする
   → アラートが多すぎると「アラート疲れ」になり
     本当に重要な通知を見逃す

2. ユーザーへの影響を基準にする
   → CPU 90% より「エラーレート 1% 超過」の方が重要

3. アクションできるアラートだけにする
   → 通知を受けたエンジニアが何か対応できるものだけ
```

---

### 11.2 アラートポリシーの設定

```bash
# CLI でアラートポリシーを作成（JSON/YAML 定義）
gcloud alpha monitoring policies create \
  --policy-from-file=alert-policy.yaml

# アラートポリシーの一覧確認
gcloud alpha monitoring policies list

# アラートポリシーの有効化/無効化
gcloud alpha monitoring policies update POLICY_ID \
  --enabled     # 有効化
  # または
  --no-enabled  # 無効化（メンテナンス時に一時停止）
```

#### アラートポリシーの YAML 定義例

```yaml
# alert-policy.yaml

# ===== 例1: CPU 使用率アラート =====
displayName: "High CPU Utilization - Compute Engine"
conditions:
  - displayName: "CPU utilization over 80%"
    conditionThreshold:
      filter: >
        metric.type="compute.googleapis.com/instance/cpu/utilization"
        AND resource.type="gce_instance"
      comparison: COMPARISON_GT
      thresholdValue: 0.8       # 80%
      duration: 300s            # 5分間継続した場合にアラート
      aggregations:
        - alignmentPeriod: 60s
          perSeriesAligner: ALIGN_MEAN
alertStrategy:
  notificationRateLimit:
    period: 3600s               # 同じアラートは 1 時間に 1 回のみ通知
notificationChannels:
  - projects/PROJECT_ID/notificationChannels/CHANNEL_ID
documentation:
  content: "CPU使用率が80%を超えています。スケールアップまたはオートスケール設定を確認してください。"
  mimeType: text/markdown
```

```yaml
# ===== 例2: エラーレートアラート（HTTP 5xx）=====
displayName: "High HTTP Error Rate - Load Balancer"
conditions:
  - displayName: "HTTP 5xx error rate > 1%"
    conditionThreshold:
      filter: >
        metric.type="loadbalancing.googleapis.com/https/request_count"
        AND metric.labels.response_code_class="500"
      comparison: COMPARISON_GT
      thresholdValue: 0.01      # 1%
      duration: 60s
alertStrategy:
  autoClose: 1800s              # 30分後に自動クローズ
notificationChannels:
  - projects/PROJECT_ID/notificationChannels/CHANNEL_ID
```

---

### 11.3 通知チャネルの設定

```bash
# メール通知チャネルの作成
gcloud alpha monitoring channels create \
  --display-name="Ops Team Email" \
  --type=email \
  --channel-labels=email_address=ops-team@example.com

# Slack 通知チャネルの作成
gcloud alpha monitoring channels create \
  --display-name="#alerts Slack Channel" \
  --type=slack \
  --channel-labels=channel_name=#alerts,url=https://hooks.slack.com/...

# PagerDuty 通知チャネルの作成
gcloud alpha monitoring channels create \
  --display-name="PagerDuty On-call" \
  --type=pagerduty \
  --channel-labels=service_key=YOUR_PAGERDUTY_SERVICE_KEY

# 通知チャネルの確認
gcloud alpha monitoring channels list
```

---

### 11.4 SLO（サービスレベル目標）の設定

#### SLO の設計プロセス

```
Step 1: SLI（測定指標）を定義
  何を測るか？
  └── リクエスト成功率（エラー率）
  └── レイテンシ（p99 が 200ms 以内）
  └── 可用性（ヘルスチェックの成功率）

Step 2: SLO（目標値）を設定
  どのくらいを目指すか？
  └── 99.9% のリクエストが成功する
  └── 99% のリクエストが 200ms 以内に応答

Step 3: エラーバジェットを計算
  月間の許容ダウン時間 = (1 - SLO) × 月間時間
  └── 99.9% SLO = 43.8 分/月

Step 4: Cloud Monitoring に SLO を設定して監視
```

```bash
# SLO の設定（Console での設定が推奨）
# メニュー: Cloud Monitoring → SLO → カスタムサービスを作成
```

```yaml
# SLO の定義例（Cloud Monitoring API）
{
  "displayName": "99.9% Availability SLO",
  "goal": 0.999,           # 99.9% が目標
  "rollingPeriod": "2592000s",  # 30 日のローリングウィンドウ
  "requestBased": {
    "goodTotalRatio": {
      "goodServiceFilter": "metric.type=\"loadbalancing.googleapis.com/https/request_count\" AND metric.labels.response_code_class!=\"500\"",
      "totalServiceFilter": "metric.type=\"loadbalancing.googleapis.com/https/request_count\""
    }
  }
}
```

#### SLO アラートの設定

```
【SLO アラートの種類】

バーンレートアラート（Burn Rate Alert）:
  エラーバジェットの消費速度を監視
  
  例: バーンレート = 1.0 → エラーバジェットを通常速度で消費中
      バーンレート = 2.0 → 2倍の速度でエラーバジェットを消費中
                            → このままでは SLO を達成できない！
  
  推奨アラート設定:
    Fast Burn（高速消費）: バーンレート > 14.4、1時間
    Slow Burn（低速消費）: バーンレート > 1.0、6時間
```

#### ✅ ベストプラクティス: モニタリングと SLO

| # | ベストプラクティス | 理由 |
| --- | ------------------- | ------ |
| 1 | **VM のメモリ監視には Ops Agent を必ずインストール** | デフォルトではメモリ取得不可 |
| 2 | **GKE には Managed Service for Prometheus を使用** | Prometheus 互換・運用負荷ゼロ |
| 3 | **SLO ベースのアラートを優先**（CPU アラートより重要） | ユーザー体験に直結する指標を監視 |
| 4 | **アラートには runbook（対応手順）のリンクを含める** | 受け取った人が迷わず対応できる |
| 5 | **ダッシュボードは用途別に整理**（サービス別・チーム別） | 障害時の素早い状況把握 |

> 🔗 **参考**: https://cloud.google.com/monitoring  
> 🔗 **参考**: https://docs.cloud.google.com/monitoring/agent/ops-agent

---

<div id="ch12"></div>

## Chapter 12: Cloud Logging — ログ管理の基本

### 12.1 Cloud Logging の全体像

```
【Cloud Logging のデータフロー】

ログの発生源:
  ├── GCP サービス（自動収集）
  │   例: GKE、Cloud SQL、Cloud Run、Load Balancer
  ├── Compute Engine VM（Ops Agent 経由）
  │   例: syslog、アプリケーションログ
  └── アプリケーション（Cloud Logging API / ライブラリ）
      例: Python の google-cloud-logging ライブラリ
         ↓
Cloud Logging（受信・保存・インデックス作成）
         ↓
Log Router（ルーティング）
  ├── Cloud Logging バケット（デフォルト 30 日保持）
  ├── BigQuery（長期保存・SQL 分析）
  ├── Cloud Storage（アーカイブ保存）
  └── Pub/Sub（リアルタイムストリーミング）
```

---

### 12.2 Cloud Logging のデフォルト保持期間

| ログバケット | デフォルト保持期間 | 変更可否 |
| ------------ | ------------------ | ---------- |
| `_Required`（必須バケット） | **400 日**（変更不可） | ❌ |
| `_Default`（デフォルトバケット） | **30 日** | ✅（最大 3650 日） |
| カスタムバケット | 設定値 | ✅ |

> ⚠️ **重要**: `_Required` バケットには管理アクティビティ監査ログと Data Access 監査ログが含まれ、削除・変更不可。

---

### 12.3 ログの検索（Log Explorer）

#### ログフィルタの書き方

```
# ===== Cloud Logging のクエリ言語（ログフィルタ） =====

# 基本構文
resource.type = "リソースタイプ"
resource.labels.instance_id = "VM_ID"
severity >= ERROR
textPayload: "エラーメッセージ"
timestamp >= "2024-01-01T00:00:00Z"
timestamp < "2024-01-02T00:00:00Z"

# 例1: 特定 VM の ERROR 以上のログ
resource.type = "gce_instance"
AND resource.labels.zone = "asia-northeast1-a"
AND severity >= ERROR

# 例2: Cloud SQL の接続エラー
resource.type = "cloudsql_database"
AND severity = ERROR
AND textPayload =~ "connection"  # 正規表現マッチ

# 例3: HTTP 5xx エラーのアクセスログ
resource.type = "http_load_balancer"
AND httpRequest.status >= 500

# 例4: GKE の特定 Pod のログ
resource.type = "k8s_container"
AND resource.labels.namespace_name = "production"
AND resource.labels.pod_name =~ "my-app-.*"
AND severity = ERROR

# 例5: 特定の期間に IAM 権限変更が行われたログ（管理者調査用）
resource.type = "project"
AND proto_payload.method_name = "SetIamPolicy"
AND timestamp >= "2024-01-01T00:00:00Z"
```

---

### 12.4 アプリケーションからのログ出力

#### Python でのログ出力

```python
import google.cloud.logging
from google.cloud.logging import CRITICAL, ERROR, WARNING, INFO, DEBUG
import logging

# Cloud Logging クライアントの初期化
client = google.cloud.logging.Client()

# Python の標準 logging と統合（推奨）
client.setup_logging()

# 使用例
logger = logging.getLogger(__name__)
logger.info("Application started")
logger.warning("Low memory: %d MB remaining", free_memory)
logger.error("Database connection failed", extra={
    "json_fields": {
        "database": "production-db",
        "error_code": "CONNECTION_TIMEOUT",
        "retry_count": 3
    }
})
```

#### 構造化ログ（JSON ログ）の活用

```python
# 構造化ログ（JSON）で出力すると Cloud Logging で検索・集計が容易
import json
import sys

def log_structured(severity, message, **fields):
    entry = {
        "severity": severity,
        "message": message,
        **fields
    }
    print(json.dumps(entry), file=sys.stdout)

# 使用例
log_structured(
    "INFO",
    "Order processed",
    order_id="ORD-12345",
    user_id="USER-67890",
    amount=15000,
    payment_method="credit_card"
)

# 出力（Cloud Logging で jsonPayload として自動パース）:
# {
#   "severity": "INFO",
#   "message": "Order processed",
#   "order_id": "ORD-12345",
#   "user_id": "USER-67890",
#   "amount": 15000,
#   "payment_method": "credit_card"
# }
```

---

<div id="ch13"></div>

## Chapter 13: 監査ログ（Audit Logs）の完全解説

### 13.1 監査ログの 3 種類

監査ログは GCP 上で「誰が何をしたか」を記録する最重要のセキュリティログです。

#### 種類①: 管理アクティビティ監査ログ（Admin Activity）

```
【内容】リソースの設定・メタデータを変更する操作
  例:
  ├── VM インスタンスの作成・削除
  ├── IAM ポリシーの変更（誰かにロールを付与）
  ├── Cloud Storage バケットの作成・削除
  ├── ファイアウォールルールの変更
  └── サービスアカウントの作成

【特徴】
  ├── デフォルトで有効（無効化不可！）
  ├── 料金: 無料
  └── 保持期間: 400 日（_Required バケット）
```

#### 種類②: データアクセス監査ログ（Data Access）

```
【内容】データの読み書き、リソースの設定読み取り
  例:
  ├── Cloud Storage バケットのオブジェクト読み取り
  ├── BigQuery テーブルへのクエリ
  ├── Cloud SQL へのクエリ
  └── Secret Manager でシークレットを読み取り

【特徴】
  ├── デフォルトで無効（膨大なログが発生するため）
  ├── 手動で有効化が必要
  ├── 料金: 有料（ログの量に応じて課金）
  └── 保持期間: デフォルト 30 日

【有効化が推奨されるケース】
  ├── 機密データへのアクセスを監査したい
  ├── コンプライアンス要件（SOC2, PCI-DSS など）
  └── セキュリティインシデント調査
```

データアクセス監査ログの有効化:

```bash
# 組織レベルで BigQuery のデータアクセスログを有効化
cat > policy.json <<EOF
{
  "auditConfigs": [
    {
      "service": "bigquery.googleapis.com",
      "auditLogConfigs": [
        {"logType": "DATA_READ"},
        {"logType": "DATA_WRITE"},
        {"logType": "ADMIN_READ"}
      ]
    }
  ]
}
EOF

gcloud organizations set-iam-policy ORG_ID policy.json
```

#### 種類③: システムイベント監査ログ（System Event）

```
【内容】Google のシステムによる操作
  例:
  ├── ライブマイグレーション（VM を別ホストに自動移行）
  ├── 自動スケーリングイベント
  └── Google による定期メンテナンス

【特徴】
  ├── デフォルトで有効（無効化不可）
  ├── 料金: 無料
  └── ユーザーの操作によらない自動操作が記録される
```

#### ポリシー拒否監査ログ（Policy Denied）※補足

```
【内容】セキュリティポリシーによってリソースへのアクセスが拒否された操作
  例: IAM 権限がないためアクセスが拒否されたケース

【特徴】
  ├── デフォルトで有効
  └── セキュリティ違反の検出に活用
```

---

### 13.2 監査ログの活用例

```
【セキュリティインシデント調査】

「昨夜 AM 2 時頃、Cloud Storage バケットが削除された。誰がやったか？」

→ 管理アクティビティ監査ログで調査:

resource.type = "gcs_bucket"
AND proto_payload.method_name = "storage.buckets.delete"
AND timestamp >= "2024-01-15T17:00:00Z"  # UTC 17:00 = JST 02:00
AND timestamp < "2024-01-15T18:00:00Z"

→ principal_email: "malicious-user@example.com" が記録されている！
→ このユーザーの操作履歴を追跡できる
```

---

### 13.3 GKE の監査ログ

```
【GKE の特別なルール】

GKE の監査ログは無効化できません！
  → セキュリティ上の強制仕様

Container-Optimized OS (COS) での auditd:
  GKE の COS ノードでは Linux auditd を有効化することで
  ・バイナリの実行履歴
  ・ファイルシステムへのアクセス
  ・ネットワーク接続の詳細
  などを記録できる

有効化方法:
  GKE Standard クラスタのノードプールで設定
  → セキュリティインシデントの詳細調査に不可欠
```

---

<div id="ch14"></div>

## Chapter 14: Log Router（ログのルーティングとエクスポート）

### 14.1 Log Router（ログシンク）とは？

Log Router は、受信したログを各送信先に転送する仕組みです。

```
【Log Router の仕組み】

すべてのログが Cloud Logging に到達
         ↓
Log Router（シンクのフィルタで振り分け）
    │
    ├── _Default バケット（デフォルト 30 日保持）
    │   └── フィルタに一致しないすべてのログ
    │
    ├── BigQuery データセット
    │   └── フィルタ: 長期保存・SQL 分析が必要なログ
    │
    ├── Cloud Storage バケット
    │   └── フィルタ: アーカイブ保存が必要なログ
    │
    └── Pub/Sub トピック
        └── フィルタ: リアルタイム処理が必要なログ
                        └── SIEM ツール、Cloud Functions など
```

---

### 14.2 ログシンクの設定

```bash
# ===== BigQuery へのシンクを作成 =====

# 1. BigQuery データセットを作成
bq mk --location=asia-northeast1 --dataset PROJECT_ID:logging_archive

# 2. BigQuery シンクを作成（監査ログのみエクスポート）
gcloud logging sinks create bigquery-audit-sink \
  bigquery.googleapis.com/projects/PROJECT_ID/datasets/logging_archive \
  --log-filter='protoPayload.@type="type.googleapis.com/google.cloud.audit.AuditLog"' \
  --description="Export audit logs to BigQuery for analysis"

# 3. シンクのサービスアカウントに BigQuery への書き込み権限を付与
SINK_SA=$(gcloud logging sinks describe bigquery-audit-sink \
  --format="value(writerIdentity)")

bq add-iam-policy-binding \
  --project=PROJECT_ID \
  --dataset=logging_archive \
  --member="$SINK_SA" \
  --role="roles/bigquery.dataEditor"
```

```bash
# ===== Cloud Storage へのシンクを作成（長期アーカイブ） =====

# 1. ログアーカイブ用バケットを作成
gcloud storage buckets create gs://my-log-archive-bucket \
  --location=asia-northeast1 \
  --storage-class=coldline  # 低コストなコールドラインストレージ

# 2. Cloud Storage シンクを作成
gcloud logging sinks create storage-long-term-sink \
  storage.googleapis.com/my-log-archive-bucket \
  --log-filter='severity >= WARNING' \
  --description="Archive WARNING+ logs to Cold Storage for 7 years"

# 3. シンクのサービスアカウントに書き込み権限を付与
SINK_SA=$(gcloud logging sinks describe storage-long-term-sink \
  --format="value(writerIdentity)")

gcloud storage buckets add-iam-policy-binding gs://my-log-archive-bucket \
  --member="$SINK_SA" \
  --role="roles/storage.objectCreator"
```

```bash
# ===== Pub/Sub へのシンクを作成（SIEM 連携・リアルタイム処理） =====

# 1. Pub/Sub トピックを作成
gcloud pubsub topics create security-events-topic

# 2. Pub/Sub シンクを作成（セキュリティ関連ログのみ）
gcloud logging sinks create pubsub-security-sink \
  pubsub.googleapis.com/projects/PROJECT_ID/topics/security-events-topic \
  --log-filter='protoPayload.@type="type.googleapis.com/google.cloud.audit.AuditLog" AND severity >= WARNING' \
  --description="Stream security events to SIEM"

# 3. 権限付与
SINK_SA=$(gcloud logging sinks describe pubsub-security-sink \
  --format="value(writerIdentity)")

gcloud pubsub topics add-iam-policy-binding security-events-topic \
  --member="$SINK_SA" \
  --role="roles/pubsub.publisher"
```

---

### 14.3 シンクの確認と管理

```bash
# シンクの一覧確認
gcloud logging sinks list

# シンクの詳細確認
gcloud logging sinks describe SINK_NAME

# シンクの更新（フィルタを変更）
gcloud logging sinks update SINK_NAME \
  --log-filter='severity >= ERROR'

# シンクの削除
gcloud logging sinks delete SINK_NAME
```

---

### 14.4 BigQuery でのログ分析クエリ例

```sql
-- 過去 7 日間の管理アクティビティ上位 10 操作
SELECT
  proto_payload.auth_info[0].principal AS user_email,
  proto_payload.method_name AS operation,
  COUNT(*) AS operation_count
FROM
  `my_project.logging_archive.cloudaudit_googleapis_com_activity_*`
WHERE
  _TABLE_SUFFIX >= FORMAT_DATE('%Y%m%d', DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY))
GROUP BY
  user_email, operation
ORDER BY
  operation_count DESC
LIMIT 10;

-- 特定ユーザーの操作履歴（セキュリティ調査）
SELECT
  timestamp,
  proto_payload.auth_info[0].principal AS user_email,
  proto_payload.method_name AS operation,
  proto_payload.resource_name AS resource
FROM
  `my_project.logging_archive.cloudaudit_googleapis_com_activity_*`
WHERE
  _TABLE_SUFFIX >= '20240101'
  AND proto_payload.auth_info[0].principal = 'suspicious@example.com'
ORDER BY
  timestamp DESC;

-- HTTP 5xx エラーの時系列分析
SELECT
  TIMESTAMP_TRUNC(timestamp, HOUR) AS hour,
  COUNT(*) AS error_count,
  http_request.request_url AS url
FROM
  `my_project.logging_archive.requests_*`
WHERE
  _TABLE_SUFFIX >= FORMAT_DATE('%Y%m%d', DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY))
  AND http_request.status >= 500
GROUP BY
  hour, url
ORDER BY
  hour, error_count DESC;
```

#### ✅ ベストプラクティス: Cloud Logging

| # | ベストプラクティス | 理由 |
| --- | ------------------- | ------ |
| 1 | **管理アクティビティ監査ログを BigQuery にエクスポート** | 長期保存・詳細分析・監査証跡 |
| 2 | **機密データを扱う API はデータアクセス監査ログを有効化** | コンプライアンス・インシデント対応 |
| 3 | **GKE の auditd ログを有効化**（COS ノード） | バイナリ実行履歴の追跡 |
| 4 | **Cloud Storage の Coldline にアーカイブシンクを設定** | 低コストで長期保管 |
| 5 | **ログにラベルや構造化フィールドを付ける** | 検索・集計の効率化 |
| 6 | **`_Default` バケットの保持期間を要件に合わせて延長** | デフォルト 30 日では監査に不十分な場合 |

> 🔗 **参考**: https://cloud.google.com/blog/products/devops-sre/cloud-logging-cost-management-best-practices

---

<div id="ch15"></div>

## Chapter 15: Cloud Trace / Profiler / Error Reporting

### 15.1 Cloud Trace（分散トレーシング）

```
【Cloud Trace の目的】

マイクロサービス環境での問題:
  ユーザーのリクエストが遅い！でもどのサービスが原因？

  User → API Gateway → Service A → Service B → Database
  
  → 全体で 3 秒かかっているが、どのステップが遅いか不明

Cloud Trace の効果:
  User → API Gateway(50ms) → Service A(200ms) → Service B(2500ms!) → Database(150ms)
  
  → Service B に問題があることを特定！
```

```python
# Python での Cloud Trace 設定
from opentelemetry import trace
from opentelemetry.exporter.cloud_trace import CloudTraceSpanExporter
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor

# Trace プロバイダーの設定
provider = TracerProvider()
cloud_trace_exporter = CloudTraceSpanExporter()
provider.add_span_processor(BatchSpanProcessor(cloud_trace_exporter))
trace.set_tracer_provider(provider)

tracer = trace.get_tracer(__name__)

# スパン（処理区間）を計測
with tracer.start_as_current_span("process-order"):
    with tracer.start_as_current_span("validate-payment"):
        validate_payment(order)
    with tracer.start_as_current_span("save-to-database"):
        save_order(order)
```

---

### 15.2 Cloud Profiler（継続的プロファイリング）

```
【Cloud Profiler の目的】

「どのコードがCPU/メモリを消費しているか？」を
本番環境で継続的に測定する

特徴:
  ├── 本番環境に影響を与えずに継続プロファイリング
  ├── CPU 時間・ヒープメモリ・スレッド使用量を可視化
  ├── フレームグラフ（Flame Graph）で視覚化
  └── Go, Java, Python, Node.js に対応

典型的な発見:
  ├── 不要なデータベースクエリがループ内で実行されている
  ├── JSON シリアライズが想定外に重い
  └── メモリリークの原因関数を特定
```

```python
# Python での Cloud Profiler 設定
import googlecloudprofiler

# アプリ起動時に初期化するだけで自動プロファイリング開始
googlecloudprofiler.start(
    service='my-service',
    service_version='1.0.0',
    verbose=3,
)
```

---

### 15.3 Error Reporting（エラー追跡）

```
【Error Reporting の目的】

アプリケーションで発生した例外・エラーを
自動集計して重要なものを通知する

機能:
  ├── Cloud Logging に記録された例外・エラーを自動検出
  ├── 同じエラーをグループ化（重複を排除）
  ├── 新しいエラーが出たら即時通知
  ├── エラーの発生頻度・傾向を表示
  └── スタックトレースで原因箇所を特定
```

設定方法:

```python
# Python アプリでエラーを Error Reporting に送信
from google.cloud import error_reporting

client = error_reporting.Client()

try:
    # 問題のある処理
    result = process_order(order_id)
except Exception as e:
    # エラーを Error Reporting に送信（スタックトレース付き）
    client.report_exception()
    raise
```

```
【Error Reporting が Cloud Logging と連携する仕組み】

1. アプリが例外を Cloud Logging に出力
2. Error Reporting が Cloud Logging を自動スキャン
3. エラーを自動グループ化・集計
4. 新しいエラーパターンを検出したら通知

→ 特別な設定なしに Cloud Logging に例外ログを出すだけで機能！
```

---

### 15.4 オブザーバビリティの全体像（まとめ）

```
【4 つのオブザーバビリティシグナル】

Metrics（メトリクス）→ Cloud Monitoring
  「何が」起きているか（定量的）
  例: CPU 80%、エラーレート 0.5%、レイテンシ 200ms

Logs（ログ）→ Cloud Logging
  「何が」起きたか（イベントの記録）
  例: "Error: Database connection refused at 10:30:45"

Traces（トレース）→ Cloud Trace
  「どこで」遅延が発生しているか（リクエストの経路）
  例: Service B が 2.5 秒かかっている

Profiles（プロファイル）→ Cloud Profiler
  「なぜ」遅いか（コードレベルの原因）
  例: `process_large_array()` が CPU の 60% を消費
```

> 🔗 **参考**: https://cloud.google.com/products/observability

---

<div id="ch16"></div>

## Chapter 16: Gemini Cloud Assist と Cloud Asset Inventory

### 16.1 Gemini Cloud Assist

ACE 試験の最新出題範囲として、Gemini Cloud Assist が含まれています。

```
【Gemini Cloud Assist とは？】

Google Cloud の AI アシスタント
  → Cloud Console の右上「?」ボタンから利用

できること:
  ├── 自然言語で GCP の操作をサポート
  ├── アーキテクチャ図を自動生成
  ├── Terraform テンプレートを自動生成
  ├── 障害の根本原因（RCA）分析
  └── コスト最適化の提案
```

---

### 16.2 Gemini Cloud Assist の主要機能

#### 機能①: 根本原因分析（Root Cause Analysis）

```
【Gemini によるトラブルシューティング例】

エンジニアが入力:
  「us-central1 の Cloud Run サービスが今朝 9 時から
   503 エラーを返しています。原因を調べてください。」

Gemini が自動分析:
  ┌── Cloud Logging のエラーログを横断分析
  ├── Cloud Monitoring のメトリクスを確認
  │   （CPU 急上昇、メモリ不足など）
  ├── Cloud Asset Inventory の設定変更履歴を確認
  │   （デプロイ・設定変更がなかったか）
  └── 分析結果を自然言語で提示:

Gemini の回答例:
  「8:55 AM に新しいリビジョンがデプロイされました。
   そのリビジョンから OOMKilled（メモリ不足）が多発しています。
   メモリ上限を 256MB から 512MB に増やすことを推奨します。
   以下のコマンドで修正できます: [コマンド提示]」
```

#### 機能②: IaC テンプレートの自動生成

```
エンジニアが入力:
  「東京リージョンに 2 ゾーン構成の GKE Autopilot クラスタを
   プライベートネットワークで作成する Terraform を書いてください」

Gemini が生成:
  module "gke" {
    source  = "terraform-google-modules/kubernetes-engine/google//modules/beta-autopilot-private-cluster"
    version = "~> 31.0"
    
    project_id = var.project_id
    name       = "my-autopilot-cluster"
    region     = "asia-northeast1"
    
    network    = module.vpc.network_name
    subnetwork = module.vpc.subnets_names[0]
    
    enable_private_nodes    = true
    master_ipv4_cidr_block  = "172.16.0.0/28"
    ...
  }
```

#### 機能③: FinOps（コスト最適化）提案

```
Gemini が自動分析して提案:
  ├── 「この VM は過去 30 日間 CPU 使用率が 5% 以下でした。
  │    n2-standard-8 → n2-standard-2 にダウングレードで
  │    月 $120 の節約が見込めます」
  │
  ├── 「この Cloud Storage バケットのオブジェクトの 70% は
  │    90 日以上アクセスされていません。
  │    Coldline に移行で月 $45 の節約が見込めます」
  │
  └── 「これらの Idle な GPU VM を停止することで
       週末の $500 のコストを削減できます」
```

> 🔗 **参考**: https://cloud.google.com/products/gemini/cloud-assist  
> 🔗 **参考**: https://docs.cloud.google.com/cloud-assist/overview

---

### 16.3 Cloud Asset Inventory

```
【Cloud Asset Inventory の目的】

「組織全体に何があるか、誰がアクセスできるか」を一元的に把握

機能:
  ├── 全リソースの検索・エクスポート
  │   例: 「全プロジェクトの GKE クラスタを一覧表示」
  │
  ├── IAM ポリシーの変更履歴
  │   例: 「昨日から今日にかけて変更された IAM ポリシー」
  │
  ├── リソースへのアクセス権分析
  │   例: 「このバケットにアクセスできる全ユーザーを表示」
  │
  └── 組織ポリシーとの整合性確認
      例: 「外部 IP を持つ VM が存在しないか確認」
```

```bash
# 組織内の全 GKE クラスタを検索
gcloud asset search-all-resources \
  --asset-types='container.googleapis.com/Cluster' \
  --scope='organizations/ORG_ID' \
  --format="table(name,location,displayName)"

# 外部 IP を持つ VM を検索（セキュリティ監査）
gcloud asset search-all-resources \
  --asset-types='compute.googleapis.com/Instance' \
  --scope='organizations/ORG_ID' \
  --query='networkInterfaces.accessConfigs.natIP:*'

# IAM ポリシーの変更履歴を確認
gcloud asset list \
  --organization=ORG_ID \
  --asset-types='iam.googleapis.com/Policy' \
  --content-type=iam-policy \
  --snapshot-time=$(date -d '1 day ago' -u +%Y-%m-%dT%H:%M:%SZ)

# 特定のリソースにアクセスできる全 Identity を分析
gcloud asset analyze-iam-policy \
  --organization=ORG_ID \
  --full-resource-name='//storage.googleapis.com/projects/_/buckets/my-sensitive-bucket'
```

---

<div id="ch17"></div>

## Chapter 17: Domain 3 試験対策まとめ

### 17.1 試験頻出パターン

#### パターン①: メモリメトリクスに関する問題

```
【問題文の例】
「Compute Engine VM のメモリ使用量を監視したい。
 どうすればよいか？」

【正解】
Ops Agent をインストールして設定する

【よくある不正解】
「Cloud Monitoring コンソールで自動的に確認できる」
→ ❌ メモリ使用量はデフォルトでは取得されない
   CPU/ネットワーク I/O は自動取得だが、メモリは Ops Agent が必要
```

#### パターン②: スナップショットの整合性に関する問題

```
【問題文の例】
「MySQL データベースが動作している VM のディスクの
 完全な整合性を保ったバックアップを取得したい。」

【正解】
アプリケーション整合性スナップショット
  → MySQL で FLUSH TABLES WITH READ LOCK を実行してから
    スナップショットを取得

【クラッシュ整合性との違い】
  クラッシュ整合性: アプリ無停止、メモリのフラッシュなし
  アプリケーション整合性: 書き込みを停止してからスナップショット
```

#### パターン③: 監査ログの種類に関する問題

```
【問題文の例 1】
「IAM ポリシーの変更を記録したい。どのログを使うか？」
→ 管理アクティビティ監査ログ（常に有効）

【問題文の例 2】
「Cloud Storage バケットのオブジェクト読み取りを
 監査したい。どうすればよいか？」
→ データアクセス監査ログを有効化（デフォルトは無効）

【3 種類の使い分け】
  管理アクティビティ: リソースの作成・変更・削除（常に有効・無料）
  データアクセス:     データの読み書き（手動で有効化・有料）
  システムイベント:   Google の自動操作（常に有効・無料）
```

#### パターン④: ログのエクスポート先に関する問題

```
【問題文の例】
「ログを 7 年間保持してコンプライアンス要件を満たしたい。
 コストを最小化する方法は？」

【正解】
Cloud Storage の Coldline ストレージへのシンクを設定
  → 低コストな長期アーカイブ

【各エクスポート先の使い分け】
  BigQuery: 長期保存 + SQL で柔軟な分析
  Cloud Storage: 純粋なアーカイブ（コスト最安）
  Pub/Sub: リアルタイムで SIEM や外部システムに連携
```

---

### 17.2 Domain 3 重要用語チェックリスト

#### コンピュートリソースの管理

- [ ] スナップショットスケジュールで **1時間ごとに自動取得**できることを知っている
- [ ] **クラッシュ整合性 vs アプリケーション整合性**の違いを説明できる
- [ ] Linux では **fstrim** でスナップショットを最適化できることを知っている
- [ ] MIG のローリングアップデートで `--max-unavailable=0` がゼロダウンタイムを意味することを知っている
- [ ] `kubectl rollout undo` でDeploymentをロールバックできることを知っている

#### Cloud Monitoring

- [ ] **メモリ使用量には Ops Agent が必要**（デフォルトでは取得不可）
- [ ] **Ops Agent = Fluent Bit（ログ）+ OpenTelemetry（メトリクス）**の統合エージェント
- [ ] **GKE の Prometheus 監視は Managed Service for Prometheus** を使用
- [ ] **SLO = 目標値、SLI = 測定値、エラーバジェット = 許容失敗量**を説明できる
- [ ] **バーンレートアラート**でエラーバジェットの消費速度を監視できることを知っている

#### Cloud Logging

- [ ] 監査ログの **3種類**（管理アクティビティ・データアクセス・システムイベント）を説明できる
- [ ] **データアクセス監査ログはデフォルトで無効**（手動で有効化が必要）
- [ ] **管理アクティビティ監査ログは無効化不可・無料**
- [ ] **_Required バケットは 400 日保持・変更不可**
- [ ] **Log Router シンク**で BigQuery/Cloud Storage/Pub/Sub にログをエクスポートできる
- [ ] **GKE の監査ログは無効化できない**

#### Gemini Cloud Assist

- [ ] **根本原因分析**（ログ + メトリクス + 設定変更履歴を横断分析）ができることを知っている
- [ ] **Cloud Asset Inventory** で組織全体のリソースを一元検索できることを知っている

---

### 17.3 推奨学習リソース（Domain 3）

| リソース | URL |
| ---------- | ----- |
| **ACE 試験公式ページ** | https://cloud.google.com/learn/certification/cloud-engineer?hl=en |
| **スナップショットベストプラクティス** | https://docs.cloud.google.com/compute/docs/disks/snapshot-best-practices |
| **Ops Agent の概要** | https://docs.cloud.google.com/monitoring/agent/ops-agent |
| **Cloud Monitoring ドキュメント** | https://cloud.google.com/monitoring |
| **オブザーバビリティ概要** | https://cloud.google.com/products/observability |
| **Cloud Logging コスト管理** | https://cloud.google.com/blog/products/devops-sre/cloud-logging-cost-management-best-practices |
| **Gemini Cloud Assist** | https://cloud.google.com/products/gemini/cloud-assist |
| **Gemini Cloud Assist: RCA** | https://cloud.google.com/blog/products/management-tools/gemini-cloud-assist-investigations-performs-root-cause-analysis |
| **Cloud Asset Inventory** | https://cloud.google.com/asset-inventory/docs/overview |
| **Cloud SQL バックアップと復元** | https://docs.cloud.google.com/sql/docs/postgres/backup-recovery/backing-up |
| **Managed Service for Prometheus** | https://cloud.google.com/stackdriver/docs/managed-prometheus |
| **Error Reporting** | https://cloud.google.com/error-reporting/docs |
| **Cloud Trace** | https://cloud.google.com/trace/docs |

---

> 📝 **Domain 3 学習の最終アドバイス**
>
> Domain 3 は「デプロイ後の運用・監視」がテーマです。
>
> **最頻出トピック TOP 5**（必ず押さえること）:
>
> **① Ops Agent → メモリ・ディスク使用率の取得**  
> **② 監査ログの 3 種類（管理アクティビティ / データアクセス / システムイベント）**  
> **③ スナップショット整合性（クラッシュ整合性 vs アプリケーション整合性）**  
> **④ Log Router シンクのエクスポート先の使い分け（BigQuery / GCS / Pub/Sub）**  
> **⑤ SLO / SLI / エラーバジェットの概念**
>
> Cloud Console での実際のハンズオン（Cloud Monitoring でダッシュボードを作る、  
> Log Explorer でログを検索する）が理解を深める最短ルートです。🚀
