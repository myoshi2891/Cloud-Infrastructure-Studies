import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Domain 3: Ensuring Successful Operation of a Cloud Solution',
    description:
        'Google Cloud ACE Domain 3 包括的解説。SRE・監視・ロギング・バックアップ・障害対応の運用管理を詳解。',
};

function SectionIntro() {
    return (
        <div id="ch0" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn0">00</div>
                <div className="sec-head-txt">
                    <h2>Domain 3 全体マップ</h2>
                    <p>クラウドソリューションの正常なオペレーションの確保（≈ 22%）</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">3.0</span>Domain 3 の構造</div>
                <pre className="codeblock">{`Domain 3: クラウドソリューションの正常なオペレーションの確保（≈ 22%）
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
    └── Cloud Asset Inventory`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">3.0</span>SRE の三本柱</div>
                <div className="tgrid">
                    <div className="titem"><div className="tname">信頼性（Reliability）</div><div className="tdef">スナップショット・MIG自動ヒーリング・SLOによるバックアップと自動復旧体制</div></div>
                    <div className="titem"><div className="tname">可観測性（Observability）</div><div className="tdef">Cloud Monitoring・Cloud Logging・Cloud Traceによるシステム状態の把握</div></div>
                    <div className="titem"><div className="tname">運用効率（Operational Efficiency）</div><div className="tdef">アラート自動通知・Gemini Cloud Assist・IaCでの運用負荷削減</div></div>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">3.0</span>目次（全17章）</div>
                <div className="ctable">
                    <div className="ctable-head">
                        <span>章</span><span>タイトル</span><span>カテゴリ</span>
                    </div>
                    <div className="ctable-row"><span>Ch1</span><span>SRE 的アプローチ</span><span>概念</span></div>
                    <div className="ctable-row"><span>Ch2</span><span>Compute Engine ライフサイクル管理</span><span>3-A コンピュート</span></div>
                    <div className="ctable-row"><span>Ch3</span><span>ディスクスナップショット</span><span>3-A コンピュート</span></div>
                    <div className="ctable-row"><span>Ch4</span><span>MIG 運用管理</span><span>3-A コンピュート</span></div>
                    <div className="ctable-row"><span>Ch5</span><span>GKE クラスタ運用</span><span>3-A コンピュート</span></div>
                    <div className="ctable-row"><span>Ch6</span><span>Cloud Run / Cloud Functions 管理</span><span>3-A コンピュート</span></div>
                    <div className="ctable-row"><span>Ch7</span><span>Cloud Storage データ管理</span><span>3-B ストレージ</span></div>
                    <div className="ctable-row"><span>Ch8</span><span>Cloud SQL / Spanner バックアップ</span><span>3-B ストレージ</span></div>
                    <div className="ctable-row"><span>Ch9</span><span>Cloud Monitoring</span><span>3-C 可観測性</span></div>
                    <div className="ctable-row"><span>Ch10</span><span>Ops Agent 導入と設定</span><span>3-C 可観測性</span></div>
                    <div className="ctable-row"><span>Ch11</span><span>アラートポリシーと SLO</span><span>3-C 可観測性</span></div>
                    <div className="ctable-row"><span>Ch12</span><span>Cloud Logging</span><span>3-C 可観測性</span></div>
                    <div className="ctable-row"><span>Ch13</span><span>監査ログ（Audit Logs）</span><span>3-C 可観測性</span></div>
                    <div className="ctable-row"><span>Ch14</span><span>Log Router</span><span>3-C 可観測性</span></div>
                    <div className="ctable-row"><span>Ch15</span><span>Cloud Trace / Profiler / Error Reporting</span><span>3-C 可観測性</span></div>
                    <div className="ctable-row"><span>Ch16</span><span>Gemini Cloud Assist + Cloud Asset Inventory</span><span>3-D AI 運用</span></div>
                    <div className="ctable-row"><span>Ch17</span><span>試験対策まとめ</span><span>試験対策</span></div>
                </div>
            </div>
        </div>
    );
}

function Chapter1() {
    return (
        <div id="ch1" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn1">01</div>
                <div className="sec-head-txt">
                    <h2>SRE 的アプローチ — オペレーション管理の考え方</h2>
                    <p>Site Reliability Engineering の基本概念と SLI/SLO/SLA の関係</p>
                </div>
                <div className="pct-badge pb1">~22%</div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">1.1</span>「正常なオペレーション」とは？</div>
                <pre className="codeblock">{`【クラウド運用の 3 つの柱】

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
       ・IaC でインフラをコードで管理`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">1.2</span>SRE（Site Reliability Engineering）の基本概念</div>
                <pre className="codeblock">{`【SRE の核心概念】

SLI（Service Level Indicator）= 測定値
  例: 「過去 30 日間のリクエスト成功率は 99.95% だった」

SLO（Service Level Objective）= 目標
  例: 「リクエスト成功率を 99.9% 以上に保つ」

SLA（Service Level Agreement）= 契約
  例: 「99.9% を下回った場合、料金を返金する」

エラーバジェット（Error Budget）= 許容できる失敗量
  例: SLO が 99.9% なら
      エラーバジェット = 0.1% = 月間約 43.8 分のダウンタイム許容`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">1.2</span>SRE vs DevOps — ACE 試験の観点</div>
                <div className="ctable">
                    <div className="ctable-head">
                        <span>項目</span><span>SRE</span><span>DevOps</span>
                    </div>
                    <div className="ctable-row"><span>発祥</span><span>Google（2003年〜）</span><span>業界全体の運動</span></div>
                    <div className="ctable-row"><span>焦点</span><span>信頼性の定量化（SLO・エラーバジェット）</span><span>開発と運用の文化的統合</span></div>
                    <div className="ctable-row"><span>ツール</span><span>Cloud Monitoring・SLO・エラーバジェット</span><span>CI/CD パイプライン・IaC</span></div>
                    <div className="ctable-row"><span>スケーリング</span><span>信頼性のスケール（自動化でトイルを排除）</span><span>デプロイ速度のスケール</span></div>
                </div>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: SRE の原則</div>
                    <ul>
                        <li>エラーバジェットを使い切らない限り新機能リリースを優先する</li>
                        <li>エラーバジェットを使い切ったら信頼性向上作業を最優先にする</li>
                        <li>ポストモーテム（障害レビュー）を blame-free（非難なし）で実施する</li>
                        <li>トイル（手動・反復作業）を自動化して排除する</li>
                    </ul>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">1.3</span>4 つのゴールデンシグナル（Four Golden Signals）</div>
                <div className="ctable">
                    <div className="ctable-head">
                        <span>シグナル</span><span>説明</span><span>GCP での収集手段</span>
                    </div>
                    <div className="ctable-row"><span>レイテンシ（Latency）</span><span>リクエストの応答時間（成功 vs 失敗を区別）</span><span>Cloud Trace・LB メトリクス</span></div>
                    <div className="ctable-row"><span>トラフィック（Traffic）</span><span>システムへの需要量（RPS・帯域幅など）</span><span>Cloud Monitoring メトリクス</span></div>
                    <div className="ctable-row"><span>エラー（Errors）</span><span>失敗したリクエストの割合</span><span>Error Reporting・LB メトリクス</span></div>
                    <div className="ctable-row"><span>飽和度（Saturation）</span><span>リソースの利用率（CPU・メモリ・ディスク）</span><span>Ops Agent・Cloud Monitoring</span></div>
                </div>
            </div>
        </div>
    );
}

function Chapter2() {
    return (
        <div id="ch2" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn2">02</div>
                <div className="sec-head-txt">
                    <h2>Compute Engine のライフサイクル管理</h2>
                    <p>VM の状態管理・基本操作・スタートアップスクリプト・デバッグ</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">2.1</span>VM のライフサイクルと状態管理</div>
                <pre className="codeblock">{`【VM のライフサイクル】

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
        ※ ディスクの削除設定に依存`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">2.2</span>VM の基本操作コマンド</div>
                <pre className="codeblock">{`# ===== VM の起動・停止・再起動 =====

# VM を停止（ディスクデータ保持・課金一部停止）
gcloud compute instances stop VM_NAME \\
  --zone=asia-northeast1-a

# VM を起動
gcloud compute instances start VM_NAME \\
  --zone=asia-northeast1-a

# VM を再起動
gcloud compute instances reset VM_NAME \\
  --zone=asia-northeast1-a

# VM を一時停止（メモリ状態保持）
gcloud compute instances suspend VM_NAME \\
  --zone=asia-northeast1-a

# ===== VM の情報確認 =====

# VM の一覧表示
gcloud compute instances list

# 特定プロジェクトの全リージョンの VM を表示
gcloud compute instances list --project=PROJECT_ID

# VM の詳細情報
gcloud compute instances describe VM_NAME \\
  --zone=asia-northeast1-a \\
  --format=json

# ===== VM の設定変更 =====

# VM のマシンタイプを変更（停止中のみ可能）
gcloud compute instances set-machine-type VM_NAME \\
  --machine-type=n2-standard-8 \\
  --zone=asia-northeast1-a

# VM にラベルを追加
gcloud compute instances add-labels VM_NAME \\
  --labels=env=production,team=backend \\
  --zone=asia-northeast1-a

# VM のメタデータを更新
gcloud compute instances add-metadata VM_NAME \\
  --metadata=startup-script-url=gs://my-bucket/startup.sh \\
  --zone=asia-northeast1-a`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">2.3</span>スタートアップスクリプトとシャットダウンスクリプト</div>
                <pre className="codeblock">{`# スタートアップスクリプト（VM 起動時に実行）
#!/bin/bash
# startup.sh
apt-get update -y
apt-get install -y nginx
systemctl start nginx
systemctl enable nginx
echo "Startup complete: $(date)" >> /var/log/startup.log

# スタートアップスクリプトを VM に設定
gcloud compute instances create VM_NAME \\
  --metadata-from-file startup-script=startup.sh \\
  --zone=asia-northeast1-a

# GCS からスタートアップスクリプトを読み込む
gcloud compute instances create VM_NAME \\
  --metadata=startup-script-url=gs://my-bucket/startup.sh \\
  --zone=asia-northeast1-a`}</pre>
                <pre className="codeblock">{`# シャットダウンスクリプト（VM 停止前に実行、最大 90 秒）
#!/bin/bash
# shutdown.sh
echo "Shutdown initiated: $(date)" >> /var/log/shutdown.log

# 処理中のデータをバックアップ
gsutil cp /var/app/data/*.json gs://my-backup-bucket/$(date +%Y%m%d%H%M%S)/

# アプリを graceful に停止
systemctl stop my-app
echo "Shutdown complete: $(date)" >> /var/log/shutdown.log`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">2.4</span>Serial Console（シリアルコンソール）デバッグ</div>
                <p className="tcard-desc">SSH でアクセスできない障害時のデバッグ手段。OS ブート中の問題やネットワーク障害時に活用します。</p>
                <pre className="codeblock">{`# シリアルコンソールへのアクセスを有効化
gcloud compute instances add-metadata VM_NAME \\
  --metadata=serial-port-enable=TRUE \\
  --zone=asia-northeast1-a

# シリアルコンソールに接続
gcloud compute connect-to-serial-port VM_NAME \\
  --zone=asia-northeast1-a

# シリアルポートのログを確認（最後の 100 行）
gcloud compute instances get-serial-port-output VM_NAME \\
  --zone=asia-northeast1-a \\
  --port=1 \\
  --start=0 | tail -100`}</pre>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: Compute Engine ライフサイクル管理</div>
                    <ul>
                        <li><strong>停止・起動の自動化</strong>（Cloud Scheduler + Cloud Functions）で開発 VM を夜間停止 → コスト削減</li>
                        <li><strong>ラベルを必ず付けて</strong>管理（env, team, cost-center）→ 棚卸し・コスト分析の基盤</li>
                        <li><strong>シリアルコンソールは必要時だけ有効化</strong>（通常は無効）→ 不正アクセスのリスク低減</li>
                        <li><strong>停止前にスナップショットを自動取得</strong>（スナップショットスケジュール）→ データ保護</li>
                    </ul>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">補足</span>IAP（Identity-Aware Proxy）による安全な SSH 接続</div>
                <p className="tcard-desc">パブリック IP を持たない VM へのセキュアなアクセス手段。IAM 権限（roles/iap.tunnelResourceAccessor）を確認してトンネルを構築します。</p>
                <pre className="codeblock">{`# IAP トンネル経由で SSH（VM にパブリック IP 不要）
gcloud compute ssh VM_NAME \\
  --tunnel-through-iap \\
  --zone=asia-northeast1-a

# IAP トンネルの権限を付与
gcloud projects add-iam-policy-binding PROJECT_ID \\
  --member="user:alice@example.com" \\
  --role="roles/iap.tunnelResourceAccessor"`}</pre>
            </div>
        </div>
    );
}

function Chapter3() {
    return (
        <div id="ch3" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn3">03</div>
                <div className="sec-head-txt">
                    <h2>ディスクスナップショットの管理</h2>
                    <p>増分バックアップ・整合性レベル・スケジュール・復元・コスト管理</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">3.1</span>スナップショットとは？（増分バックアップの仕組み）</div>
                <pre className="codeblock">{`【スナップショットの仕組み】

時刻 T1: スナップショット A（完全バックアップ）
    ↓ 差分データだけ保存
時刻 T2: スナップショット B（増分バックアップ）
    ↓ さらに差分データだけ保存
時刻 T3: スナップショット C（増分バックアップ）

【増分バックアップの特徴】
  ✓ 初回以降は差分のみ → ストレージコストが少ない
  ✓ どのスナップショットからでも完全復元が可能
  ✓ 古いスナップショットを削除しても
    依存する新しいスナップショットは引き続き有効`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">3.2</span>スナップショットの整合性レベル（試験頻出）</div>
                <pre className="codeblock">{`【クラッシュ整合性スナップショット（Crash-Consistent）】
アプリを停止せず、そのままスナップショットを取得

メリット:
  ✓ アプリを停止する必要がない（無停止で取得）
  ✓ 取得が素早い

デメリット:
  ✗ メモリ上のデータ（未書き込みバッファ）はキャプチャされない
  ✗ 復元後、OS がクラッシュ後の起動と同じプロセスを実行する

適切なユースケース:
  ├── OS ディスク（Linux / Windows ともに対応）
  └── ステートレスなアプリのディスク`}</pre>
                <pre className="codeblock">{`【アプリケーション整合性スナップショット（Application-Consistent）】
1. アプリに「書き込みを一時停止して」と指示（Freeze）
2. メモリ上のデータをディスクにフラッシュ
3. スナップショットを取得
4. アプリの書き込みを再開（Thaw）

メリット:
  ✓ メモリ上のデータも含めた完全な整合性
  ✓ 復元後のデータ整合性が保証される

デメリット:
  ✗ アプリ側のサポートが必要（VSS、fsfreeze など）
  ✗ 取得中に書き込み I/O が一時停止される

適切なユースケース:
  ├── データベース（MySQL、PostgreSQL など）
  └── トランザクション処理をしているアプリ`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">3.3</span>スナップショットの取得方法</div>
                <pre className="codeblock">{`# 基本的なスナップショット取得（手動）
gcloud compute disks snapshot DISK_NAME \\
  --snapshot-names=my-snapshot-$(date +%Y%m%d%H%M%S) \\
  --zone=asia-northeast1-a \\
  --description="Manual backup before maintenance"

# 別リージョンに保存（DR 対策）
gcloud compute disks snapshot DISK_NAME \\
  --snapshot-names=my-snapshot-cross-region \\
  --zone=asia-northeast1-a \\
  --storage-location=us-central1

# 複数ディスクを同時にスナップショット
gcloud compute disks snapshot DISK1 DISK2 DISK3 \\
  --zone=asia-northeast1-a`}</pre>
                <pre className="codeblock">{`# ===== スナップショットスケジュール（定期自動取得）=====

# 1時間ごとのスナップショットスケジュールを作成
gcloud compute resource-policies create snapshot-schedule hourly-backup \\
  --region=asia-northeast1 \\
  --max-retention-days=7 \\
  --start-time=00:00 \\
  --hourly-schedule=1 \\
  --on-source-disk-delete=keep-auto-snapshots

# ディスクにスケジュールを適用
gcloud compute disks add-resource-policies DISK_NAME \\
  --resource-policies=hourly-backup \\
  --zone=asia-northeast1-a`}</pre>
                <pre className="codeblock">{`# 毎日深夜 2 時にスナップショットを取得（日次バックアップ）
gcloud compute resource-policies create snapshot-schedule daily-backup \\
  --region=asia-northeast1 \\
  --max-retention-days=30 \\
  --start-time=17:00 \\
  --daily-schedule`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">3.4</span>Linux でのスナップショット最適化（fstrim + fsfreeze）</div>
                <pre className="codeblock">{`# スナップショット取得前に fstrim を実行
# 効果: スナップショットのサイズ削減 + 作成速度向上
sudo fstrim -v /
# 出力例: /: 50 GiB (53687091200 bytes) trimmed

# マウントオプションで定期的に discard を有効化
# /etc/fstab:
# /dev/sdb /data ext4 defaults,discard 0 0`}</pre>
                <pre className="codeblock">{`# アプリケーション整合性スナップショット（Linux / fsfreeze）
# ステップ1: ファイルシステムをフリーズ（書き込み停止）
sudo fsfreeze --freeze /data

# ステップ2: スナップショット取得
gcloud compute disks snapshot DISK_NAME \\
  --zone=asia-northeast1-a \\
  --snapshot-names=app-consistent-snap

# ステップ3: フリーズ解除（必ず実行！忘れると書き込み不可になる）
sudo fsfreeze --unfreeze /data

# MySQL でのアプリケーション整合性スナップショット
mysql -u root -e "FLUSH TABLES WITH READ LOCK;"
gcloud compute disks snapshot DISK_NAME --zone=asia-northeast1-a
mysql -u root -e "UNLOCK TABLES;"`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">3.5</span>スナップショットからの復元</div>
                <pre className="codeblock">{`# スナップショットの一覧確認
gcloud compute snapshots list

# スナップショットの詳細確認
gcloud compute snapshots describe SNAPSHOT_NAME

# スナップショットから新しいディスクを作成
gcloud compute disks create new-disk-from-snapshot \\
  --source-snapshot=SNAPSHOT_NAME \\
  --zone=asia-northeast1-a \\
  --size=100GB \\
  --type=pd-balanced

# 作成したディスクを VM にアタッチ
gcloud compute instances attach-disk VM_NAME \\
  --disk=new-disk-from-snapshot \\
  --zone=asia-northeast1-a`}</pre>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: スナップショット管理</div>
                    <ul>
                        <li><strong>スナップショットスケジュールで 1 時間ごとに自動取得</strong> → RPO（目標復旧時点）を最大 1 時間以内に</li>
                        <li><strong>本番 DB は必ずアプリケーション整合性スナップショット</strong> → データ整合性を保証</li>
                        <li><strong>Linux では fstrim を事前実行</strong>（または discard マウントオプション）→ スナップショットサイズ削減</li>
                        <li><strong>別リージョンに DR コピー</strong>（--storage-location 指定）→ リージョン障害からの復旧</li>
                        <li><strong>--max-retention-days で古いスナップショットを自動削除</strong> → ストレージコストの最適化</li>
                    </ul>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">3.6</span>スナップショットのコスト管理</div>
                <pre className="codeblock">{`【スナップショットの料金】
  ストレージ料金: $0.026/GB/月（マルチリージョン）
                 $0.020/GB/月（リージョン）

【コスト最適化】
  ├── 増分スナップショット活用（初回以降は差分のみ）
  ├── 保持期間を適切に設定（古いスナップショットを自動削除）
  ├── fstrim でスナップショットサイズを削減
  └── DR 要件がなければ同一リージョン内に保存`}</pre>
            </div>
        </div>
    );
}

function Chapter4() {
    return (
        <div id="ch4" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn4">04</div>
                <div className="sec-head-txt">
                    <h2>Managed Instance Group (MIG) の運用管理</h2>
                    <p>ローリングアップデート・カナリアデプロイ・自動ヒーリング・スケーリング</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">4.1</span>MIG のアップデート戦略 — ローリングアップデート</div>
                <pre className="codeblock">{`【ローリングアップデートの流れ】

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
  --max-surge=2       → 同時に追加できる新バージョンの台数
  --max-unavailable=0 → 同時に停止できる台数（0 = ゼロダウンタイム）`}</pre>
                <pre className="codeblock">{`# インスタンステンプレートを v2 に更新（ローリング）
gcloud compute instance-groups managed rolling-action start-update my-mig \\
  --version=template=my-template-v2 \\
  --max-surge=1 \\
  --max-unavailable=0 \\
  --region=asia-northeast1

# アップデートの進捗を確認
gcloud compute instance-groups managed describe my-mig \\
  --region=asia-northeast1

# アップデートをキャンセル（進行中の場合）
gcloud compute instance-groups managed rolling-action stop-proactive-update my-mig \\
  --region=asia-northeast1`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">4.1</span>カナリアデプロイ（段階的ロールアウト）</div>
                <pre className="codeblock">{`# v2 を 10% のインスタンスだけに適用
gcloud compute instance-groups managed rolling-action start-update my-mig \\
  --version=template=my-template-v1,name=stable \\
  --canary-version=template=my-template-v2,target-size=10%,name=canary \\
  --region=asia-northeast1

# 問題なければ v2 を 100% に拡大
gcloud compute instance-groups managed rolling-action start-update my-mig \\
  --version=template=my-template-v2 \\
  --region=asia-northeast1

# 問題があれば v1 にロールバック
gcloud compute instance-groups managed rolling-action start-update my-mig \\
  --version=template=my-template-v1 \\
  --region=asia-northeast1`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">4.2</span>MIG の手動スケーリングと緊急操作</div>
                <pre className="codeblock">{`# MIG のサイズを手動で変更
gcloud compute instance-groups managed resize my-mig \\
  --size=10 \\
  --region=asia-northeast1

# 特定のインスタンスを再作成（問題のある VM をリフレッシュ）
gcloud compute instance-groups managed recreate-instances my-mig \\
  --instances=my-mig-abc1,my-mig-def2 \\
  --region=asia-northeast1

# 特定のインスタンスを MIG から削除（スケールイン）
gcloud compute instance-groups managed delete-instances my-mig \\
  --instances=my-mig-abc1 \\
  --region=asia-northeast1

# オートスケーリングの一時無効化（メンテナンス時）
gcloud compute instance-groups managed set-autoscaling my-mig \\
  --mode=off \\
  --region=asia-northeast1

# オートスケーリングを再有効化
gcloud compute instance-groups managed set-autoscaling my-mig \\
  --mode=on \\
  --region=asia-northeast1`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">4.3</span>MIG のヘルスチェックと自動ヒーリング</div>
                <pre className="codeblock">{`# HTTP ヘルスチェックの作成
gcloud compute health-checks create http my-health-check \\
  --port=8080 \\
  --request-path=/healthz \\
  --check-interval=30s \\
  --timeout=10s \\
  --healthy-threshold=1 \\
  --unhealthy-threshold=3

# MIG に自動ヒーリングを設定
gcloud compute instance-groups managed set-autohealing my-mig \\
  --health-check=my-health-check \\
  --initial-delay=300s \\
  --region=asia-northeast1

# ヘルスチェックの状態を確認
gcloud compute backend-services get-health my-backend-service \\
  --global`}</pre>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: MIG 運用</div>
                    <ul>
                        <li><strong>--max-unavailable=0 でゼロダウンタイムアップデート</strong>を実現する</li>
                        <li><strong>カナリアデプロイで段階的ロールアウト</strong>し、問題検出時にすぐロールバックできる体制を整える</li>
                        <li><strong>--initial-delay を適切に設定</strong>（起動時間 + アプリ初期化時間）し、起動中の VM が誤ってヒーリングされないようにする</li>
                        <li><strong>リージョナル MIG を使用</strong>して複数ゾーンに分散させ、ゾーン障害に対応する</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

function Chapter5() {
    return (
        <div id="ch5" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn5">05</div>
                <div className="sec-head-txt">
                    <h2>GKE クラスタの運用管理</h2>
                    <p>バージョン管理・ノード管理・kubectl 操作・オートスケーリング</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">5.1</span>GKE クラスタのバージョン管理とアップグレード</div>
                <pre className="codeblock">{`GKE のバージョン形式: MAJOR.MINOR.PATCH-gke.N
例: 1.29.3-gke.1200

サポートポリシー:
  ├── GKE は常に 3 つのマイナーバージョンをサポート
  │   例: 1.27, 1.28, 1.29
  ├── サポート終了バージョンは自動アップグレードされる
  └── リリースチャンネルで自動アップグレードを管理

リリースチャンネル:
  ├── Rapid: 最新版（プレビュー機能あり）→ テスト環境向け
  ├── Regular: バランス型 → 本番推奨
  └── Stable: 安定版（遅め）→ ミッションクリティカル向け`}</pre>
                <pre className="codeblock">{`# クラスタのバージョンを確認
gcloud container clusters describe my-cluster \\
  --region=asia-northeast1 \\
  --format="value(currentMasterVersion,currentNodeVersion)"

# クラスタのコントロールプレーンをアップグレード
gcloud container clusters upgrade my-cluster \\
  --master \\
  --cluster-version=1.29 \\
  --region=asia-northeast1

# ノードプールをアップグレード
gcloud container clusters upgrade my-cluster \\
  --node-pool=default-pool \\
  --cluster-version=1.29 \\
  --region=asia-northeast1`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">5.2</span>GKE のノード管理</div>
                <pre className="codeblock">{`# ノードプールの一覧確認
gcloud container node-pools list \\
  --cluster=my-cluster \\
  --region=asia-northeast1

# ノードプールのサイズ変更（手動スケーリング）
gcloud container clusters resize my-cluster \\
  --node-pool=default-pool \\
  --num-nodes=5 \\
  --region=asia-northeast1

# ノードのドレイン（安全に Pod を退避してからメンテナンス）
kubectl drain NODE_NAME \\
  --ignore-daemonsets \\
  --delete-emptydir-data

# メンテナンス後にノードを再稼働
kubectl uncordon NODE_NAME`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">5.3</span>kubectl による Pod・Deployment の管理</div>
                <pre className="codeblock">{`# ===== Pod の管理 =====
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
kubectl set image deployment/my-app \\
  my-container=gcr.io/PROJECT/my-app:v2 \\
  -n my-namespace

# アップデートのロールバック
kubectl rollout undo deployment/my-app -n my-namespace

# 特定バージョンにロールバック
kubectl rollout undo deployment/my-app \\
  --to-revision=2 \\
  -n my-namespace

# ロールアウト履歴の確認
kubectl rollout history deployment/my-app -n my-namespace`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">5.4</span>GKE の Workload 診断</div>
                <pre className="codeblock">{`# クラスタ全体のリソース使用状況
kubectl top nodes
kubectl top pods -n my-namespace

# イベントの確認（障害の手がかり）
kubectl get events -n my-namespace --sort-by=.lastTimestamp

# Pod の再起動回数を確認（クラッシュループの検出）
kubectl get pods -n my-namespace \\
  -o jsonpath='{range .items[*]}{.metadata.name}{"\t"}{.status.containerStatuses[0].restartCount}{"\n"}{end}'`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">補足</span>GKE のオートスケーリング 3 層構造</div>
                <div className="ctable">
                    <div className="ctable-head">
                        <span>機能</span><span>略称</span><span>対象</span><span>動作</span>
                    </div>
                    <div className="ctable-row"><span>Horizontal Pod Autoscaler</span><span>HPA</span><span>Pod の数</span><span>CPU・カスタムメトリクスでレプリカ数を増減</span></div>
                    <div className="ctable-row"><span>Vertical Pod Autoscaler</span><span>VPA</span><span>Pod のリソース</span><span>Requests/Limits を実使用量に合わせて自動最適化</span></div>
                    <div className="ctable-row"><span>Cluster Autoscaler</span><span>CA</span><span>ノード数</span><span>Pending Pod があればノード追加、余剰があれば削除</span></div>
                </div>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: GKE 運用管理</div>
                    <ul>
                        <li><strong>リリースチャンネルを設定</strong>して Kubernetes バージョンを自動管理</li>
                        <li><strong>kubectl rollout undo</strong> ですぐにロールバックできる体制を整える</li>
                        <li><strong>kubectl drain</strong> でノードをメンテナンスモードにしてから作業</li>
                        <li><strong>Managed Service for Prometheus</strong> で GKE メトリクスを収集</li>
                        <li><strong>Pod の restartCount を監視</strong>してクラッシュループを早期検知</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

function Chapter6() {
    return (
        <div id="ch6" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn6">06</div>
                <div className="sec-head-txt">
                    <h2>Cloud Run / Cloud Functions の管理</h2>
                    <p>リビジョン管理・トラフィック分割・スケーリング設定・カナリアリリース</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">6.1</span>Cloud Run の運用管理</div>
                <pre className="codeblock">{`# Cloud Run サービスの一覧確認
gcloud run services list --region=asia-northeast1

# サービスの詳細確認
gcloud run services describe my-service \\
  --region=asia-northeast1

# サービスのリビジョン（バージョン）一覧
gcloud run revisions list \\
  --service=my-service \\
  --region=asia-northeast1

# トラフィック分割の確認・変更
gcloud run services describe my-service \\
  --region=asia-northeast1 \\
  --format="value(status.traffic)"

# リビジョン v2 に 100% 切り替え
gcloud run services update-traffic my-service \\
  --to-revisions=my-service-v2=100 \\
  --region=asia-northeast1

# 前のリビジョンにロールバック
gcloud run services update-traffic my-service \\
  --to-latest \\
  --region=asia-northeast1`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">6.2</span>Cloud Run のスケーリング設定</div>
                <pre className="codeblock">{`# 最小・最大インスタンス数の設定
gcloud run services update my-service \\
  --min-instances=1 \\
  --max-instances=100 \\
  --region=asia-northeast1

# 同時実行数の設定（1インスタンスあたりの最大リクエスト数）
gcloud run services update my-service \\
  --concurrency=80 \\
  --region=asia-northeast1

# タイムアウトの設定
gcloud run services update my-service \\
  --timeout=300s \\
  --region=asia-northeast1`}</pre>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: Cloud Run</div>
                    <ul>
                        <li><strong>--max-instances でコスト上限を設定</strong> → バズや攻撃による予期せぬ高額請求を防ぐ</li>
                        <li><strong>--min-instances=1 でコールドスタートを防ぐ</strong> → レイテンシ要件が厳しい場合</li>
                        <li><strong>--no-traffic でカナリアリリース</strong> → 新リビジョンをトラフィックなしでデプロイし段階的に切り替え</li>
                        <li><strong>concurrency を最適化</strong> → インスタンス数を削減してコストを最適化</li>
                    </ul>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">6.3</span>Cloud Functions の管理</div>
                <pre className="codeblock">{`# Cloud Functions の一覧確認
gcloud functions list --region=asia-northeast1

# 関数のデプロイ
gcloud functions deploy my-function \\
  --runtime=python311 \\
  --trigger-http \\
  --entry-point=main \\
  --region=asia-northeast1 \\
  --memory=256MB \\
  --timeout=60s \\
  --set-env-vars=ENV=production

# 関数のログ確認
gcloud functions logs read my-function \\
  --region=asia-northeast1 \\
  --limit=50

# 関数の削除
gcloud functions delete my-function \\
  --region=asia-northeast1`}</pre>
            </div>
        </div>
    );
}

function Chapter7() {
    return (
        <div id="ch7" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn7">07</div>
                <div className="sec-head-txt">
                    <h2>Cloud Storage のデータ管理と保護</h2>
                    <p>オブジェクト操作・バケットロック・バージョニング・OLM・署名付きURL</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">7.1</span>Cloud Storage の基本操作</div>
                <pre className="codeblock">{`# ===== オブジェクト操作 =====

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
gcloud storage buckets add-iam-policy-binding gs://my-bucket \\
  --member="user:alice@example.com" \\
  --role="roles/storage.objectViewer"`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">7.2</span>バケットロックと保持ポリシー（コンプライアンス）</div>
                <pre className="codeblock">{`【保持ポリシーとは？】

例: 金融規制により「7年間はログを削除・変更禁止」

バケットにポリシーを設定:
  gcloud storage buckets update gs://my-compliance-bucket \\
    --retention-period=7y

効果:
  ├── バケット内のすべてのオブジェクトが
  │   7 年間（設定日から）削除・上書き不可になる
  └── 新しくアップロードしたオブジェクトも
      アップロード時点から 7 年間保護される

【バケットロック（取り消し不可！）】
  保持ポリシーを永久に変更できないようにロック

  gcloud storage buckets lock gs://my-compliance-bucket

  ⚠️ バケットロックは一度かけると絶対に解除できません！
     本当に必要な場合のみ実行してください。`}</pre>
                <pre className="codeblock">{`# オブジェクト単位での保持ロック設定
gcloud storage objects update gs://my-bucket/important-file.txt \\
  --retain-until=2031-12-31T23:59:59Z \\
  --retention-mode=LOCKED`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">7.3</span>バージョニングとライフサイクル管理（OLM）</div>
                <pre className="codeblock">{`# バージョニングの有効化
gcloud storage buckets update gs://my-bucket --versioning

# 非最新バージョンの一覧確認
gcloud storage objects list gs://my-bucket --all-versions

# 特定バージョンを最新バージョンとして復元
gcloud storage cp gs://my-bucket/file.txt#GENERATION \\
  gs://my-bucket/file.txt

# ライフサイクルポリシーを適用
gcloud storage buckets update gs://my-bucket \\
  --lifecycle-file=lifecycle.json`}</pre>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: Cloud Storage データ管理</div>
                    <ul>
                        <li><strong>コンプライアンスデータには保持ポリシー + バケットロック</strong>を設定（規制要件の確実な遵守）</li>
                        <li><strong>バケット名に機密情報や推測可能な名前を使わない</strong>（ランダムな文字列を推奨）</li>
                        <li><strong>一時アクセスは署名付きURL</strong>で有効期限・操作を厳密に制限する</li>
                        <li><strong>OLMルールの優先順位を理解する</strong>（Delete {`>`} SetStorageClass、より安価なクラスが優先）</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

function Chapter8() {
    return (
        <div id="ch8" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn8">08</div>
                <div className="sec-head-txt">
                    <h2>Cloud SQL / Spanner のバックアップと復元</h2>
                    <p>自動バックアップ・PITR・リードレプリカ・Spannerバックアップ</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">8.1</span>Cloud SQL の自動バックアップ</div>
                <pre className="codeblock">{`# 自動バックアップの有効化（新規インスタンス作成時）
gcloud sql instances create my-postgres \\
  --database-version=POSTGRES_15 \\
  --tier=db-n1-standard-4 \\
  --region=asia-northeast1 \\
  --backup-start-time=02:00 \\
  --backup-location=asia-northeast1 \\
  --retained-backups-count=14 \\
  --retained-transaction-log-days=7

# 既存インスタンスの自動バックアップを更新
gcloud sql instances patch my-postgres \\
  --backup-start-time=02:00 \\
  --retained-backups-count=30`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">8.1</span>Cloud SQL の手動バックアップと復元</div>
                <pre className="codeblock">{`# 手動バックアップを即時作成
gcloud sql backups create \\
  --instance=my-postgres \\
  --description="Pre-maintenance backup $(date +%Y%m%d)"

# バックアップ一覧の確認
gcloud sql backups list --instance=my-postgres

# バックアップから同じインスタンスに復元
gcloud sql backups restore BACKUP_ID \\
  --restore-instance=my-postgres

# バックアップから別インスタンスに復元（本番データを壊さずテスト）
gcloud sql backups restore BACKUP_ID \\
  --restore-instance=my-postgres-restore-test

# PITR（ポイントインタイムリカバリ）
gcloud sql instances clone my-postgres my-postgres-pitr \\
  --point-in-time=2024-01-15T10:30:00Z`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">8.2</span>Cloud SQL のリードレプリカ管理</div>
                <pre className="codeblock">{`# リードレプリカの作成
gcloud sql instances create my-postgres-replica \\
  --master-instance-name=my-postgres \\
  --region=us-central1 \\
  --tier=db-n1-standard-4

# リードレプリカのプロモート（プライマリに昇格）
# 障害時や計画的な移行時に使用
gcloud sql instances promote-replica my-postgres-replica

# レプリカのラグ（遅延）確認
gcloud sql instances describe my-postgres-replica \\
  --format="value(replicaConfiguration.mysqlReplicaConfiguration.masterHeartbeatPeriod)"`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">8.3</span>Cloud Spanner のバックアップ</div>
                <pre className="codeblock">{`# Spanner のバックアップ作成
gcloud spanner backups create my-backup \\
  --instance=my-spanner-instance \\
  --database=my-database \\
  --expiration-date=2024-04-01T00:00:00Z

# バックアップ一覧確認
gcloud spanner backups list \\
  --instance=my-spanner-instance

# バックアップから復元
gcloud spanner databases restore \\
  --destination-instance=my-spanner-instance \\
  --destination-database=my-database-restored \\
  --source-backup=projects/PROJECT/instances/my-spanner-instance/backups/my-backup`}</pre>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: ストレージとDB管理</div>
                    <ul>
                        <li><strong>Cloud SQL の自動バックアップ + PITR を有効化</strong>（最低 7 日間のトランザクションログ保持）</li>
                        <li><strong>本番環境は Cloud SQL HA 構成</strong>（リージョナル可用性タイプを選択）</li>
                        <li><strong>定期的にバックアップからの復元テストを実施</strong>（復元できることを確認）</li>
                        <li><strong>Spanner バックアップは有効期限を設定</strong>（コスト管理）</li>
                        <li><strong>規制データには Cloud Storage の保持ポリシー + バケットロック</strong></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

function Chapter9() {
    return (
        <div id="ch9" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn9">09</div>
                <div className="sec-head-txt">
                    <h2>Cloud Monitoring — メトリクスと可視化</h2>
                    <p>自動収集メトリクス・カスタムダッシュボード・MQL・Ops Agent との違い</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">9.1</span>Cloud Monitoring の全体像</div>
                <pre className="codeblock">{`【Cloud Monitoring でできること】

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
  └── サービスレベル目標の達成状況を可視化・管理`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">9.2</span>GCP サービスが自動収集するメトリクス（試験頻出）</div>
                <div className="ctable">
                    <div className="ctable-head">
                        <span>リソース</span><span>メトリクス名</span><span>説明</span>
                    </div>
                    <div className="ctable-row"><span>Compute Engine</span><span>compute.googleapis.com/instance/cpu/utilization</span><span>CPU 使用率（0〜1.0）</span></div>
                    <div className="ctable-row"><span>Compute Engine</span><span>compute.googleapis.com/instance/network/sent_bytes_count</span><span>送信バイト数</span></div>
                    <div className="ctable-row"><span>Cloud SQL</span><span>cloudsql.googleapis.com/database/cpu/utilization</span><span>DB の CPU 使用率</span></div>
                    <div className="ctable-row"><span>Cloud SQL</span><span>cloudsql.googleapis.com/database/disk/bytes_used</span><span>ディスク使用量</span></div>
                    <div className="ctable-row"><span>GKE</span><span>container.googleapis.com/container/cpu/usage_time</span><span>コンテナ CPU 使用量</span></div>
                    <div className="ctable-row"><span>Cloud Run</span><span>run.googleapis.com/request_count</span><span>リクエスト数</span></div>
                    <div className="ctable-row"><span>Cloud Load Balancing</span><span>loadbalancing.googleapis.com/https/request_count</span><span>LB へのリクエスト数</span></div>
                </div>
                <div className="wb">
                    <div className="wbt">⚠️ 試験頻出: メモリ使用量は Ops Agent が必要</div>
                    <p>compute.googleapis.com/instance/cpu/utilization はエージェントなしで取得可能ですが、
                    agent.googleapis.com/memory/percent_used は Ops Agent が必要です。</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">9.3</span>カスタムダッシュボードの作成</div>
                <pre className="codeblock">{`# gcloud でダッシュボードを作成（JSON定義）
gcloud monitoring dashboards create \\
  --config-from-file=dashboard.json

# ダッシュボードの一覧確認
gcloud monitoring dashboards list`}</pre>
                <pre className="codeblock">{`// ダッシュボードの JSON 定義例
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
                  "filter": "metric.type=\\"compute.googleapis.com/instance/cpu/utilization\\" resource.type=\\"gce_instance\\"",
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
}`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">9.4</span>MQL（Monitoring Query Language）の基本</div>
                <pre className="codeblock">{`# 基本構文
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

# 例2: HTTP 5xx エラー率
fetch https_lb_rule
| metric 'loadbalancing.googleapis.com/https/request_count'
| filter (metric.labels.response_code_class == '500')
| align rate(1m)
| every 1m

# 例3: GKE ノードのメモリ使用率（Ops Agent 経由）
fetch k8s_node
| metric 'kubernetes.io/node/memory/used_bytes'
| align mean_aligner()
| every 1m`}</pre>
            </div>
        </div>
    );
}

function Chapter10() {
    return (
        <div id="ch10" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn10">10</div>
                <div className="sec-head-txt">
                    <h2>Ops Agent の導入と設定</h2>
                    <p>インストール方法・config.yaml・PodMonitoring・Managed Prometheus</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">10.1</span>Ops Agent とは？</div>
                <pre className="codeblock">{`【Ops Agent の内部構成】

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
  └── カスタムログファイル`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">10.2</span>Ops Agent のインストール</div>
                <pre className="codeblock">{`# ===== 方法 1: VM に SSH して手動インストール =====

# インストールスクリプトをダウンロードして実行
curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
sudo bash add-google-cloud-ops-agent-repo.sh --also-install

# インストール確認
sudo systemctl status google-cloud-ops-agent`}</pre>
                <pre className="codeblock">{`# ===== 方法 2: gcloud でリモートインストール（SSH 不要）=====

gcloud compute instances ops-agents policies create my-ops-agent-policy \\
  --agent-rules="type=ops-agent,version=current-major,package-state=installed,enable-autoupgrade=true" \\
  --os-types=short-name=debian,version=11 \\
  --instances=zones/asia-northeast1-a/instances/my-vm`}</pre>
                <pre className="codeblock">{`# ===== 方法 3: VM 作成時にスタートアップスクリプトでインストール =====

#!/bin/bash
# startup.sh
curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh
sudo bash add-google-cloud-ops-agent-repo.sh --also-install`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">10.3</span>Ops Agent の設定カスタマイズ（config.yaml）</div>
                <pre className="codeblock">{`# /etc/google-cloud-ops-agent/config.yaml

logging:
  receivers:
    nginx_access_log:
      type: files
      include_paths:
        - /var/log/nginx/access.log
    nginx_error_log:
      type: files
      include_paths:
        - /var/log/nginx/error.log
    my_app_log:
      type: files
      include_paths:
        - /var/log/my-app/*.log

  processors:
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
    hostmetrics:
      type: hostmetrics
      collection_interval: 60s
    mysql:
      type: mysql
      endpoint: localhost:3306
      username: monitoring_user
      password: \${MYSQL_MONITORING_PASSWORD}

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
        exporters: [google]`}</pre>
                <pre className="codeblock">{`# 設定ファイルの検証
sudo google-cloud-ops-agent \\
  --config=/etc/google-cloud-ops-agent/config.yaml \\
  --check

# Ops Agent を再起動して設定を反映
sudo systemctl restart google-cloud-ops-agent

# ログで動作確認
sudo journalctl -u google-cloud-ops-agent -n 50`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">10.4</span>Kubernetes / GKE での Prometheus 監視</div>
                <pre className="codeblock">{`【なぜ Managed Service for Prometheus？】

通常の Prometheus:
  ├── Prometheus サーバーを自分でデプロイ・管理
  ├── ストレージの管理が必要
  └── スケーリングを手動で対応

Google Cloud Managed Service for Prometheus:
  ├── Prometheus 互換の API（既存の設定を流用可能）
  ├── ストレージは Cloud Monitoring が管理
  ├── 自動スケーリング
  └── PodMonitoring / ClusterPodMonitoring CRD で設定`}</pre>
                <pre className="codeblock">{`# PodMonitoring - 特定の Pod のメトリクスを収集
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
  - port: metrics
    interval: 30s
    path: /metrics`}</pre>
                <pre className="codeblock">{`# Managed Service for Prometheus を有効化
gcloud container clusters update my-cluster \\
  --enable-managed-prometheus \\
  --region=asia-northeast1`}</pre>
            </div>
        </div>
    );
}

function Chapter11() {
    return (
        <div id="ch11" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn11">11</div>
                <div className="sec-head-txt">
                    <h2>アラートポリシーと SLO の設定</h2>
                    <p>アラート設計・通知チャネル・SLO 定義・バーンレートアラート</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">11.1</span>良いアラートの条件</div>
                <pre className="codeblock">{`【良いアラートの条件】

1. 重要なものだけアラートにする
   → アラートが多すぎると「アラート疲れ」になり
     本当に重要な通知を見逃す

2. ユーザーへの影響を基準にする
   → CPU 90% より「エラーレート 1% 超過」の方が重要

3. アクションできるアラートだけにする
   → 通知を受けたエンジニアが何か対応できるものだけ`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">11.2</span>アラートポリシーの設定（YAML 定義）</div>
                <pre className="codeblock">{`# alert-policy.yaml（CPU 使用率アラート）
displayName: "High CPU Utilization - Compute Engine"
conditions:
  - displayName: "CPU utilization over 80%"
    conditionThreshold:
      filter: >
        metric.type="compute.googleapis.com/instance/cpu/utilization"
        AND resource.type="gce_instance"
      comparison: COMPARISON_GT
      thresholdValue: 0.8
      duration: 300s
      aggregations:
        - alignmentPeriod: 60s
          perSeriesAligner: ALIGN_MEAN
alertStrategy:
  notificationRateLimit:
    period: 3600s
notificationChannels:
  - projects/PROJECT_ID/notificationChannels/CHANNEL_ID
documentation:
  content: "CPU使用率が80%を超えています。スケールアップまたはオートスケール設定を確認してください。"
  mimeType: text/markdown`}</pre>
                <pre className="codeblock">{`# HTTP 5xx エラーレートアラート
displayName: "High HTTP Error Rate - Load Balancer"
conditions:
  - displayName: "HTTP 5xx error rate > 1%"
    conditionThreshold:
      filter: >
        metric.type="loadbalancing.googleapis.com/https/request_count"
        AND metric.labels.response_code_class="500"
      comparison: COMPARISON_GT
      thresholdValue: 0.01
      duration: 60s
alertStrategy:
  autoClose: 1800s
notificationChannels:
  - projects/PROJECT_ID/notificationChannels/CHANNEL_ID`}</pre>
                <pre className="codeblock">{`# CLI でアラートポリシーを作成
gcloud alpha monitoring policies create \\
  --policy-from-file=alert-policy.yaml

# アラートポリシーの一覧確認
gcloud alpha monitoring policies list

# メンテナンス時に一時無効化
gcloud alpha monitoring policies update POLICY_ID --no-enabled`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">11.3</span>通知チャネルの設定</div>
                <pre className="codeblock">{`# メール通知チャネルの作成
gcloud alpha monitoring channels create \\
  --display-name="Ops Team Email" \\
  --type=email \\
  --channel-labels=email_address=ops-team@example.com

# Slack 通知チャネルの作成
gcloud alpha monitoring channels create \\
  --display-name="#alerts Slack Channel" \\
  --type=slack \\
  --channel-labels=channel_name=#alerts,url=https://hooks.slack.com/...

# PagerDuty 通知チャネルの作成
gcloud alpha monitoring channels create \\
  --display-name="PagerDuty On-call" \\
  --type=pagerduty \\
  --channel-labels=service_key=YOUR_PAGERDUTY_SERVICE_KEY

# 通知チャネルの確認
gcloud alpha monitoring channels list`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">11.4</span>SLO（サービスレベル目標）の設定</div>
                <pre className="codeblock">{`SLO の設計プロセス:

Step 1: SLI（測定指標）を定義
  └── リクエスト成功率、レイテンシ p99、可用性

Step 2: SLO（目標値）を設定
  └── 99.9% のリクエストが成功する

Step 3: エラーバジェットを計算
  月間の許容ダウン時間 = (1 - SLO) × 月間時間
  └── 99.9% SLO = 43.8 分/月

Step 4: Cloud Monitoring に SLO を設定して監視`}</pre>
                <pre className="codeblock">{`// SLO の定義例（Cloud Monitoring API）
{
  "displayName": "99.9% Availability SLO",
  "goal": 0.999,
  "rollingPeriod": "2592000s",
  "requestBased": {
    "goodTotalRatio": {
      "goodServiceFilter": "metric.type=\\"loadbalancing.googleapis.com/https/request_count\\" AND metric.labels.response_code_class!=\\"500\\"",
      "totalServiceFilter": "metric.type=\\"loadbalancing.googleapis.com/https/request_count\\""
    }
  }
}`}</pre>
                <pre className="codeblock">{`【SLO バーンレートアラートの種類】

バーンレートアラート（Burn Rate Alert）:
  エラーバジェットの消費速度を監視

  バーンレート = 1.0 → エラーバジェットを通常速度で消費中
  バーンレート = 2.0 → 2倍の速度でエラーバジェットを消費中
                        → このままでは SLO を達成できない！

推奨アラート設定:
  Fast Burn（高速消費）: バーンレート > 14.4、1時間
  Slow Burn（低速消費）: バーンレート > 1.0、6時間`}</pre>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: モニタリングと SLO</div>
                    <ul>
                        <li><strong>VM のメモリ監視には Ops Agent を必ずインストール</strong>（デフォルトではメモリ取得不可）</li>
                        <li><strong>GKE には Managed Service for Prometheus を使用</strong>（Prometheus 互換・運用負荷ゼロ）</li>
                        <li><strong>SLO ベースのアラートを優先</strong>（CPU アラートより重要 — ユーザー体験に直結）</li>
                        <li><strong>アラートには runbook のリンクを含める</strong>（受け取った人が迷わず対応できる）</li>
                        <li><strong>ダッシュボードは用途別に整理</strong>（サービス別・チーム別 — 障害時の素早い状況把握）</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

function Chapter12() {
    return (
        <div id="ch12" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn12">12</div>
                <div className="sec-head-txt">
                    <h2>Cloud Logging — ログ管理の基本</h2>
                    <p>データフロー・保持期間・ログクエリ・構造化ログ・アプリケーションから送信</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">12.1</span>Cloud Logging の全体像</div>
                <pre className="codeblock">{`【Cloud Logging のデータフロー】

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
  └── Pub/Sub（リアルタイムストリーミング）`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">12.2</span>Cloud Logging のデフォルト保持期間</div>
                <div className="ctable">
                    <div className="ctable-head">
                        <span>ログバケット</span><span>デフォルト保持期間</span><span>変更可否</span>
                    </div>
                    <div className="ctable-row"><span>_Required（必須バケット）</span><span>400 日（変更不可）</span><span>❌</span></div>
                    <div className="ctable-row"><span>_Default（デフォルトバケット）</span><span>30 日</span><span>✅（最大 3650 日）</span></div>
                    <div className="ctable-row"><span>カスタムバケット</span><span>設定値</span><span>✅</span></div>
                </div>
                <div className="wb">
                    <div className="wbt">⚠️ 重要</div>
                    <p>_Required バケットには管理アクティビティ監査ログと Data Access 監査ログが含まれ、削除・変更不可。</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">12.3</span>ログの検索（ログクエリ言語）</div>
                <pre className="codeblock">{`# 基本構文
resource.type = "リソースタイプ"
resource.labels.instance_id = "VM_ID"
severity >= ERROR
textPayload: "エラーメッセージ"
timestamp >= "2024-01-01T00:00:00Z"

# 例1: 特定 VM の ERROR 以上のログ
resource.type = "gce_instance"
AND resource.labels.zone = "asia-northeast1-a"
AND severity >= ERROR

# 例2: Cloud SQL の接続エラー
resource.type = "cloudsql_database"
AND severity = ERROR
AND textPayload =~ "connection"

# 例3: HTTP 5xx エラーのアクセスログ
resource.type = "http_load_balancer"
AND httpRequest.status >= 500

# 例4: GKE の特定 Pod のログ
resource.type = "k8s_container"
AND resource.labels.namespace_name = "production"
AND resource.labels.pod_name =~ "my-app-.*"
AND severity = ERROR

# 例5: IAM 権限変更が行われたログ（管理者調査用）
resource.type = "project"
AND proto_payload.method_name = "SetIamPolicy"
AND timestamp >= "2024-01-01T00:00:00Z"`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">12.4</span>Python でのログ出力（Cloud Logging ライブラリ）</div>
                <pre className="codeblock">{`import google.cloud.logging
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
})`}</pre>
                <pre className="codeblock">{`# 構造化ログ（JSON ログ）の活用
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
# → Cloud Logging で jsonPayload として自動パース`}</pre>
            </div>
        </div>
    );
}

function Chapter13() {
    return (
        <div id="ch13" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn13">13</div>
                <div className="sec-head-txt">
                    <h2>監査ログ（Audit Logs）の完全解説</h2>
                    <p>3 種類の監査ログ・データアクセス有効化・セキュリティ調査・GKE 監査ログ</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">13.1</span>監査ログの 3 種類（試験最頻出）</div>
                <div className="ctable">
                    <div className="ctable-head">
                        <span>種類</span><span>内容の例</span><span>デフォルト</span><span>料金</span><span>保持期間</span>
                    </div>
                    <div className="ctable-row">
                        <span>管理アクティビティ（Admin Activity）</span>
                        <span>VM 作成・削除、IAM 変更、バケット操作、FW ルール変更</span>
                        <span>有効（無効化不可）</span>
                        <span>無料</span>
                        <span>400 日（_Required）</span>
                    </div>
                    <div className="ctable-row">
                        <span>データアクセス（Data Access）</span>
                        <span>GCS オブジェクト読取、BigQuery クエリ、Cloud SQL クエリ、Secret 読取</span>
                        <span>無効（手動で有効化）</span>
                        <span>有料</span>
                        <span>デフォルト 30 日</span>
                    </div>
                    <div className="ctable-row">
                        <span>システムイベント（System Event）</span>
                        <span>ライブマイグレーション、自動スケーリング、Google 定期メンテナンス</span>
                        <span>有効（無効化不可）</span>
                        <span>無料</span>
                        <span>400 日（_Required）</span>
                    </div>
                    <div className="ctable-row">
                        <span>ポリシー拒否（Policy Denied）</span>
                        <span>IAM 権限不足でアクセスが拒否されたケース</span>
                        <span>有効</span>
                        <span>有料</span>
                        <span>30 日</span>
                    </div>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">13.1</span>データアクセス監査ログの有効化</div>
                <pre className="codeblock">{`# 組織レベルで BigQuery のデータアクセスログを有効化
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

gcloud organizations set-iam-policy ORG_ID policy.json`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">13.2</span>監査ログの活用例（セキュリティインシデント調査）</div>
                <pre className="codeblock">{`【セキュリティインシデント調査】

「昨夜 AM 2 時頃、Cloud Storage バケットが削除された。誰がやったか？」

→ 管理アクティビティ監査ログで調査:

resource.type = "gcs_bucket"
AND proto_payload.method_name = "storage.buckets.delete"
AND timestamp >= "2024-01-15T17:00:00Z"  # UTC 17:00 = JST 02:00
AND timestamp < "2024-01-15T18:00:00Z"

→ principal_email: "malicious-user@example.com" が記録されている！
→ このユーザーの操作履歴を追跡できる`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">13.3</span>GKE の監査ログ</div>
                <pre className="codeblock">{`【GKE の特別なルール】

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
  → セキュリティインシデントの詳細調査に不可欠`}</pre>
            </div>
        </div>
    );
}

function Chapter14() {
    return (
        <div id="ch14" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn14">14</div>
                <div className="sec-head-txt">
                    <h2>Log Router（ログのルーティングとエクスポート）</h2>
                    <p>シンク設定・BigQuery/Cloud Storage/Pub/Sub へのエクスポート・BigQuery ログ分析</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">14.1</span>Log Router（ログシンク）の仕組み</div>
                <pre className="codeblock">{`【Log Router の仕組み】

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
                        └── SIEM ツール、Cloud Functions など`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">14.2</span>BigQuery へのシンクを作成</div>
                <pre className="codeblock">{`# 1. BigQuery データセットを作成
bq mk --location=asia-northeast1 --dataset PROJECT_ID:logging_archive

# 2. BigQuery シンクを作成（監査ログのみエクスポート）
gcloud logging sinks create bigquery-audit-sink \\
  bigquery.googleapis.com/projects/PROJECT_ID/datasets/logging_archive \\
  --log-filter='protoPayload.@type="type.googleapis.com/google.cloud.audit.AuditLog"' \\
  --description="Export audit logs to BigQuery for analysis"

# 3. シンクのサービスアカウントに BigQuery への書き込み権限を付与
SINK_SA=$(gcloud logging sinks describe bigquery-audit-sink \\
  --format="value(writerIdentity)")

bq add-iam-policy-binding \\
  --project=PROJECT_ID \\
  --dataset=logging_archive \\
  --member="$SINK_SA" \\
  --role="roles/bigquery.dataEditor"`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">14.2</span>Cloud Storage へのシンク（長期アーカイブ）</div>
                <pre className="codeblock">{`# 1. ログアーカイブ用バケットを作成
gcloud storage buckets create gs://my-log-archive-bucket \\
  --location=asia-northeast1 \\
  --storage-class=coldline

# 2. Cloud Storage シンクを作成
gcloud logging sinks create storage-long-term-sink \\
  storage.googleapis.com/my-log-archive-bucket \\
  --log-filter='severity >= WARNING' \\
  --description="Archive WARNING+ logs to Cold Storage for 7 years"

# 3. シンクのサービスアカウントに書き込み権限を付与
SINK_SA=$(gcloud logging sinks describe storage-long-term-sink \\
  --format="value(writerIdentity)")

gcloud storage buckets add-iam-policy-binding gs://my-log-archive-bucket \\
  --member="$SINK_SA" \\
  --role="roles/storage.objectCreator"`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">14.2</span>Pub/Sub へのシンク（SIEM 連携・リアルタイム処理）</div>
                <pre className="codeblock">{`# 1. Pub/Sub トピックを作成
gcloud pubsub topics create security-events-topic

# 2. Pub/Sub シンクを作成（セキュリティ関連ログのみ）
gcloud logging sinks create pubsub-security-sink \\
  pubsub.googleapis.com/projects/PROJECT_ID/topics/security-events-topic \\
  --log-filter='protoPayload.@type="type.googleapis.com/google.cloud.audit.AuditLog" AND severity >= WARNING' \\
  --description="Stream security events to SIEM"

# 3. 権限付与
SINK_SA=$(gcloud logging sinks describe pubsub-security-sink \\
  --format="value(writerIdentity)")

gcloud pubsub topics add-iam-policy-binding security-events-topic \\
  --member="$SINK_SA" \\
  --role="roles/pubsub.publisher"`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">14.3</span>シンクの確認と管理</div>
                <pre className="codeblock">{`# シンクの一覧確認
gcloud logging sinks list

# シンクの詳細確認
gcloud logging sinks describe SINK_NAME

# シンクの更新（フィルタを変更）
gcloud logging sinks update SINK_NAME \\
  --log-filter='severity >= ERROR'

# シンクの削除
gcloud logging sinks delete SINK_NAME`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">14.4</span>BigQuery でのログ分析クエリ例</div>
                <pre className="codeblock">{`-- 過去 7 日間の管理アクティビティ上位 10 操作
SELECT
  proto_payload.auth_info[0].principal AS user_email,
  proto_payload.method_name AS operation,
  COUNT(*) AS operation_count
FROM
  \`my_project.logging_archive.cloudaudit_googleapis_com_activity_*\`
WHERE
  _TABLE_SUFFIX >= FORMAT_DATE('%Y%m%d', DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY))
GROUP BY
  user_email, operation
ORDER BY
  operation_count DESC
LIMIT 10;`}</pre>
                <pre className="codeblock">{`-- 特定ユーザーの操作履歴（セキュリティ調査）
SELECT
  timestamp,
  proto_payload.auth_info[0].principal AS user_email,
  proto_payload.method_name AS operation,
  proto_payload.resource_name AS resource
FROM
  \`my_project.logging_archive.cloudaudit_googleapis_com_activity_*\`
WHERE
  _TABLE_SUFFIX >= '20240101'
  AND proto_payload.auth_info[0].principal = 'suspicious@example.com'
ORDER BY
  timestamp DESC;`}</pre>
                <pre className="codeblock">{`-- HTTP 5xx エラーの時系列分析
SELECT
  TIMESTAMP_TRUNC(timestamp, HOUR) AS hour,
  COUNT(*) AS error_count,
  http_request.request_url AS url
FROM
  \`my_project.logging_archive.requests_*\`
WHERE
  _TABLE_SUFFIX >= FORMAT_DATE('%Y%m%d', DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY))
  AND http_request.status >= 500
GROUP BY
  hour, url
ORDER BY
  hour, error_count DESC;`}</pre>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: Cloud Logging</div>
                    <ul>
                        <li><strong>管理アクティビティ監査ログを BigQuery にエクスポート</strong>（長期保存・詳細分析・監査証跡）</li>
                        <li><strong>機密データを扱う API はデータアクセス監査ログを有効化</strong>（コンプライアンス・インシデント対応）</li>
                        <li><strong>GKE の auditd ログを有効化</strong>（COS ノード — バイナリ実行履歴の追跡）</li>
                        <li><strong>Cloud Storage の Coldline にアーカイブシンクを設定</strong>（低コストで長期保管）</li>
                        <li><strong>_Default バケットの保持期間を要件に合わせて延長</strong>（デフォルト 30 日では監査に不十分な場合）</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

function Chapter15() {
    return (
        <div id="ch15" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn15">15</div>
                <div className="sec-head-txt">
                    <h2>Cloud Trace / Profiler / Error Reporting</h2>
                    <p>分散トレーシング・継続プロファイリング・エラー自動集計・4 シグナル</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">15.1</span>Cloud Trace（分散トレーシング）</div>
                <pre className="codeblock">{`【Cloud Trace の目的】

マイクロサービス環境での問題:
  ユーザーのリクエストが遅い！でもどのサービスが原因？

  User → API Gateway → Service A → Service B → Database

  → 全体で 3 秒かかっているが、どのステップが遅いか不明

Cloud Trace の効果:
  User → API Gateway(50ms) → Service A(200ms) → Service B(2500ms!) → Database(150ms)

  → Service B に問題があることを特定！`}</pre>
                <pre className="codeblock">{`# Python での Cloud Trace 設定（OpenTelemetry）
from opentelemetry import trace
from opentelemetry.exporter.cloud_trace import CloudTraceSpanExporter
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor

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
        save_order(order)`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">15.2</span>Cloud Profiler（継続的プロファイリング）</div>
                <pre className="codeblock">{`【Cloud Profiler の目的】

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
  └── メモリリークの原因関数を特定`}</pre>
                <pre className="codeblock">{`# Python での Cloud Profiler 設定
import googlecloudprofiler

# アプリ起動時に初期化するだけで自動プロファイリング開始
googlecloudprofiler.start(
    service='my-service',
    service_version='1.0.0',
    verbose=3,
)`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">15.3</span>Error Reporting（エラー追跡）</div>
                <pre className="codeblock">{`【Error Reporting の目的】

アプリケーションで発生した例外・エラーを
自動集計して重要なものを通知する

機能:
  ├── Cloud Logging に記録された例外・エラーを自動検出
  ├── 同じエラーをグループ化（重複を排除）
  ├── 新しいエラーが出たら即時通知
  ├── エラーの発生頻度・傾向を表示
  └── スタックトレースで原因箇所を特定`}</pre>
                <pre className="codeblock">{`# Python アプリでエラーを Error Reporting に送信
from google.cloud import error_reporting

client = error_reporting.Client()

try:
    result = process_order(order_id)
except Exception:
    # エラーを Error Reporting に送信（スタックトレース付き）
    client.report_exception()
    raise`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">15.4</span>4 つのオブザーバビリティシグナル（まとめ）</div>
                <div className="ctable">
                    <div className="ctable-head">
                        <span>シグナル</span><span>GCP ツール</span><span>問いに答える</span><span>例</span>
                    </div>
                    <div className="ctable-row"><span>Metrics（メトリクス）</span><span>Cloud Monitoring</span><span>「何が」起きているか（定量的）</span><span>CPU 80%、エラーレート 0.5%</span></div>
                    <div className="ctable-row"><span>Logs（ログ）</span><span>Cloud Logging</span><span>「何が」起きたか（イベント記録）</span><span>"Error: DB connection refused"</span></div>
                    <div className="ctable-row"><span>Traces（トレース）</span><span>Cloud Trace</span><span>「どこで」遅延が発生しているか</span><span>Service B が 2.5 秒かかっている</span></div>
                    <div className="ctable-row"><span>Profiles（プロファイル）</span><span>Cloud Profiler</span><span>「なぜ」遅いか（コードレベル）</span><span>process_large_array() が CPU の 60% を消費</span></div>
                </div>
            </div>
        </div>
    );
}

function Chapter16() {
    return (
        <div id="ch16" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn16">16</div>
                <div className="sec-head-txt">
                    <h2>Gemini Cloud Assist と Cloud Asset Inventory</h2>
                    <p>根本原因分析・IaC 自動生成・FinOps 提案・全リソース検索・IAM ポリシー分析</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">16.1</span>Gemini Cloud Assist</div>
                <pre className="codeblock">{`【Gemini Cloud Assist とは？】

Google Cloud の AI アシスタント
  → Cloud Console の右上「?」ボタンから利用

できること:
  ├── 自然言語で GCP の操作をサポート
  ├── アーキテクチャ図を自動生成
  ├── Terraform テンプレートを自動生成
  ├── 障害の根本原因（RCA）分析
  └── コスト最適化の提案`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">16.2</span>根本原因分析（Root Cause Analysis）</div>
                <pre className="codeblock">{`【Gemini によるトラブルシューティング例】

エンジニアが入力:
  「us-central1 の Cloud Run サービスが今朝 9 時から
   503 エラーを返しています。原因を調べてください。」

Gemini が自動分析:
  ┌── Cloud Logging のエラーログを横断分析
  ├── Cloud Monitoring のメトリクスを確認
  │   （CPU 急上昇、メモリ不足など）
  ├── Cloud Asset Inventory の設定変更履歴を確認
  │   （デプロイ・設定変更がなかったか）
  └── 分析結果を自然言語で提示

Gemini の回答例:
  「8:55 AM に新しいリビジョンがデプロイされました。
   そのリビジョンから OOMKilled（メモリ不足）が多発しています。
   メモリ上限を 256MB から 512MB に増やすことを推奨します。」`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">16.3</span>Cloud Asset Inventory</div>
                <pre className="codeblock">{`【Cloud Asset Inventory の目的】

「組織全体に何があるか、誰がアクセスできるか」を一元的に把握

機能:
  ├── 全リソースの検索・エクスポート
  ├── IAM ポリシーの変更履歴
  ├── リソースへのアクセス権分析
  └── 組織ポリシーとの整合性確認`}</pre>
                <pre className="codeblock">{`# 組織内の全 GKE クラスタを検索
gcloud asset search-all-resources \\
  --asset-types='container.googleapis.com/Cluster' \\
  --scope='organizations/ORG_ID' \\
  --format="table(name,location,displayName)"

# 外部 IP を持つ VM を検索（セキュリティ監査）
gcloud asset search-all-resources \\
  --asset-types='compute.googleapis.com/Instance' \\
  --scope='organizations/ORG_ID' \\
  --query='networkInterfaces.accessConfigs.natIP:*'`}</pre>
                <pre className="codeblock">{`# IAM ポリシーの変更履歴を確認
gcloud asset list \\
  --organization=ORG_ID \\
  --asset-types='iam.googleapis.com/Policy' \\
  --content-type=iam-policy \\
  --snapshot-time=$(date -d '1 day ago' -u +%Y-%m-%dT%H:%M:%SZ)

# 特定のリソースにアクセスできる全 Identity を分析
gcloud asset analyze-iam-policy \\
  --organization=ORG_ID \\
  --full-resource-name='//storage.googleapis.com/projects/_/buckets/my-sensitive-bucket'`}</pre>
            </div>
        </div>
    );
}

function Chapter17() {
    return (
        <div id="ch17" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn17">17</div>
                <div className="sec-head-txt">
                    <h2>Domain 3 試験対策まとめ</h2>
                    <p>頻出パターン・重要用語チェックリスト・推奨学習リソース</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">17.1</span>試験頻出パターン</div>
                <pre className="codeblock">{`【パターン①】メモリメトリクスに関する問題

問題文: 「Compute Engine VM のメモリ使用量を監視したい。どうすればよいか？」

正解: Ops Agent をインストールして設定する

よくある不正解:
「Cloud Monitoring コンソールで自動的に確認できる」
→ ❌ メモリ使用量はデフォルトでは取得されない
   CPU/ネットワーク I/O は自動取得だが、メモリは Ops Agent が必要`}</pre>
                <pre className="codeblock">{`【パターン②】スナップショットの整合性に関する問題

問題文: 「MySQL データベースが動作している VM のディスクの
 完全な整合性を保ったバックアップを取得したい。」

正解: アプリケーション整合性スナップショット
  → MySQL で FLUSH TABLES WITH READ LOCK を実行してから
    スナップショットを取得

クラッシュ整合性との違い:
  クラッシュ整合性: アプリ無停止、メモリのフラッシュなし
  アプリケーション整合性: 書き込みを停止してからスナップショット`}</pre>
                <pre className="codeblock">{`【パターン③】監査ログの種類に関する問題

問題文 1: 「IAM ポリシーの変更を記録したい。どのログを使うか？」
→ 管理アクティビティ監査ログ（常に有効）

問題文 2: 「Cloud Storage バケットのオブジェクト読み取りを監査したい。どうすればよいか？」
→ データアクセス監査ログを有効化（デフォルトは無効）

3 種類の使い分け:
  管理アクティビティ: リソースの作成・変更・削除（常に有効・無料）
  データアクセス:     データの読み書き（手動で有効化・有料）
  システムイベント:   Google の自動操作（常に有効・無料）`}</pre>
                <pre className="codeblock">{`【パターン④】ログのエクスポート先に関する問題

問題文: 「ログを 7 年間保持してコンプライアンス要件を満たしたい。
 コストを最小化する方法は？」

正解: Cloud Storage の Coldline ストレージへのシンクを設定
  → 低コストな長期アーカイブ

各エクスポート先の使い分け:
  BigQuery: 長期保存 + SQL で柔軟な分析
  Cloud Storage: 純粋なアーカイブ（コスト最安）
  Pub/Sub: リアルタイムで SIEM や外部システムに連携`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">17.2</span>Domain 3 重要用語チェックリスト</div>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: コンピュートリソースの管理</div>
                    <ul>
                        <li>スナップショットスケジュールで 1時間ごとに自動取得できることを知っている</li>
                        <li>クラッシュ整合性 vs アプリケーション整合性の違いを説明できる</li>
                        <li>Linux では fstrim でスナップショットを最適化できることを知っている</li>
                        <li>MIG のローリングアップデートで --max-unavailable=0 がゼロダウンタイムを意味することを知っている</li>
                        <li>kubectl rollout undo で Deployment をロールバックできることを知っている</li>
                    </ul>
                </div>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: Cloud Monitoring</div>
                    <ul>
                        <li>メモリ使用量には Ops Agent が必要（デフォルトでは取得不可）</li>
                        <li>Ops Agent = Fluent Bit（ログ）+ OpenTelemetry（メトリクス）の統合エージェント</li>
                        <li>GKE の Prometheus 監視は Managed Service for Prometheus を使用</li>
                        <li>SLO = 目標値、SLI = 測定値、エラーバジェット = 許容失敗量を説明できる</li>
                        <li>バーンレートアラートでエラーバジェットの消費速度を監視できることを知っている</li>
                    </ul>
                </div>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: Cloud Logging</div>
                    <ul>
                        <li>監査ログの 3種類（管理アクティビティ・データアクセス・システムイベント）を説明できる</li>
                        <li>データアクセス監査ログはデフォルトで無効（手動で有効化が必要）</li>
                        <li>管理アクティビティ監査ログは無効化不可・無料</li>
                        <li>_Required バケットは 400 日保持・変更不可</li>
                        <li>Log Router シンクで BigQuery/Cloud Storage/Pub/Sub にログをエクスポートできる</li>
                        <li>GKE の監査ログは無効化できない</li>
                    </ul>
                </div>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: Gemini Cloud Assist</div>
                    <ul>
                        <li>根本原因分析（ログ + メトリクス + 設定変更履歴を横断分析）ができることを知っている</li>
                        <li>Cloud Asset Inventory で組織全体のリソースを一元検索できることを知っている</li>
                    </ul>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">17.3</span>推奨学習リソース</div>
                <div className="ctable">
                    <div className="ctable-head">
                        <span>リソース</span><span>URL</span>
                    </div>
                    <div className="ctable-row"><span>ACE 試験公式ページ</span><span>cloud.google.com/learn/certification/cloud-engineer</span></div>
                    <div className="ctable-row"><span>スナップショットベストプラクティス</span><span>docs.cloud.google.com/compute/docs/disks/snapshot-best-practices</span></div>
                    <div className="ctable-row"><span>Ops Agent の概要</span><span>docs.cloud.google.com/monitoring/agent/ops-agent</span></div>
                    <div className="ctable-row"><span>Cloud Monitoring ドキュメント</span><span>cloud.google.com/monitoring</span></div>
                    <div className="ctable-row"><span>オブザーバビリティ概要</span><span>cloud.google.com/products/observability</span></div>
                    <div className="ctable-row"><span>Gemini Cloud Assist</span><span>cloud.google.com/products/gemini/cloud-assist</span></div>
                    <div className="ctable-row"><span>Cloud Asset Inventory</span><span>cloud.google.com/asset-inventory/docs/overview</span></div>
                    <div className="ctable-row"><span>Managed Service for Prometheus</span><span>cloud.google.com/stackdriver/docs/managed-prometheus</span></div>
                </div>
                <div className="wb">
                    <div className="wbt">Domain 3 学習の最終アドバイス</div>
                    <p>Domain 3 は「デプロイ後の運用・監視」がテーマです。</p>
                    <p><strong>最頻出トピック TOP 5:</strong></p>
                    <ul>
                        <li>① Ops Agent → メモリ・ディスク使用率の取得</li>
                        <li>② 監査ログの 3 種類（管理アクティビティ / データアクセス / システムイベント）</li>
                        <li>③ スナップショット整合性（クラッシュ整合性 vs アプリケーション整合性）</li>
                        <li>④ Log Router シンクのエクスポート先の使い分け（BigQuery / GCS / Pub/Sub）</li>
                        <li>⑤ SLO / SLI / エラーバジェットの概念</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default function Domain3Page() {
    return (
        <div className="d3-page">
            <section className="hero">
                <div className="hero-eyebrow">ACE Domain 3 · ~22%</div>
                <h1>
                    Ensuring Successful Operation{' '}
                    <span>of a Cloud Solution</span>
                </h1>
                <p className="hero-sub">
                    クラウドソリューションの運用管理 — SRE・監視・ロギング・障害対応を詳細解説
                </p>
                <div className="hero-meta">
                    <span className="hero-badge">
                        <span className="dot dot-green" />
                        試験配点 ~22%
                    </span>
                    <span className="hero-badge">
                        <span className="dot dot-cyan" />
                        全17章
                    </span>
                    <span className="hero-badge">
                        <span className="dot" />
                        コードブロック 190個
                    </span>
                </div>
            </section>

            <nav className="snav" role="navigation" aria-label="章ナビゲーション">
                <div className="snav-inner">
                    <a href="#ch0" className="snav-link"><span className="snav-num">00</span>全体マップ</a>
                    <a href="#ch1" className="snav-link"><span className="snav-num">01</span>SRE的アプローチ</a>
                    <a href="#ch2" className="snav-link"><span className="snav-num">02</span>GCEライフサイクル</a>
                    <a href="#ch3" className="snav-link"><span className="snav-num">03</span>スナップショット</a>
                    <a href="#ch4" className="snav-link"><span className="snav-num">04</span>MIG運用</a>
                    <a href="#ch5" className="snav-link"><span className="snav-num">05</span>GKEクラスタ運用</a>
                    <a href="#ch6" className="snav-link"><span className="snav-num">06</span>Cloud Run/Functions</a>
                    <a href="#ch7" className="snav-link"><span className="snav-num">07</span>Storageデータ管理</a>
                    <a href="#ch8" className="snav-link"><span className="snav-num">08</span>SQL/Spannerバックアップ</a>
                    <a href="#ch9" className="snav-link"><span className="snav-num">09</span>Cloud Monitoring</a>
                    <a href="#ch10" className="snav-link"><span className="snav-num">10</span>Ops Agent</a>
                    <a href="#ch11" className="snav-link"><span className="snav-num">11</span>アラートとSLO</a>
                    <a href="#ch12" className="snav-link"><span className="snav-num">12</span>Cloud Logging</a>
                    <a href="#ch13" className="snav-link"><span className="snav-num">13</span>監査ログ</a>
                    <a href="#ch14" className="snav-link"><span className="snav-num">14</span>Log Router</a>
                    <a href="#ch15" className="snav-link"><span className="snav-num">15</span>Trace/Profiler</a>
                    <a href="#ch16" className="snav-link"><span className="snav-num">16</span>Gemini Cloud Assist</a>
                    <a href="#ch17" className="snav-link"><span className="snav-num">17</span>試験対策</a>
                </div>
            </nav>

            <div className="wrapper">
                <SectionIntro />
                <Chapter1 />
                <Chapter2 />
                <Chapter3 />
                <Chapter4 />
                <Chapter5 />
                <Chapter6 />
                <Chapter7 />
                <Chapter8 />
                <Chapter9 />
                <Chapter10 />
                <Chapter11 />
                <Chapter12 />
                <Chapter13 />
                <Chapter14 />
                <Chapter15 />
                <Chapter16 />
                <Chapter17 />
            </div>

            <footer className="page-footer">
                <p>Domain 3: Ensuring Successful Operation of a Cloud Solution</p>
            </footer>
        </div>
    );
}
