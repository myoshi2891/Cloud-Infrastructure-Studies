import type { Metadata } from 'next';
import './domain2.css';

export const metadata: Metadata = {
    title: 'Domain 2: Planning and Implementing a Cloud Solution',
    description:
        'Google Cloud ACE Domain 2 包括的解説。コンピューティング・ストレージ・ネットワーク・Terraform の計画と実装を詳解。',
};

function SectionIntro() {
    return (
        <div id="ch0" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn0">00</div>
                <div className="sec-head-txt">
                    <h2>Domain 2 全体マップ</h2>
                    <p>クラウドソリューションの計画と実装 — 4つのサブドメインと16章の体系的学習ガイド</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">2.0</span>Domain 2 の構造</div>
                <pre className="codeblock">{`Domain 2: クラウドソリューションの計画・実装（≈ 21%）
│
├── 2-A. コンピューティングリソースの計画と実装
│   ├── Compute Engine (GCE)
│   ├── Spot VM / プリエンプティブル VM
│   ├── Managed Instance Group (MIG)
│   ├── Google Kubernetes Engine (GKE)
│   │   ├── Autopilot モード
│   │   └── Standard モード
│   ├── Cloud Run
│   └── Cloud Functions
│
├── 2-B. データストレージの計画と実装
│   ├── Cloud Storage（オブジェクトストレージ）
│   ├── Persistent Disk / Filestore（ブロック・ファイルストレージ）
│   └── データベースサービス選定
│       ├── Cloud SQL / Cloud Spanner / AlloyDB
│       ├── Firestore / Cloud Bigtable / Memorystore
│       └── BigQuery / Bare Metal Solution
│
├── 2-C. ネットワークリソースの計画と実装
│   ├── VPC・サブネット設計
│   ├── Shared VPC / VPC Peering
│   ├── Cloud NAT / Cloud DNS
│   ├── Cloud VPN / Cloud Interconnect
│   └── ロードバランサの選定
│
└── 2-D. Infrastructure as Code (IaC)
    ├── Terraform の基本と State 管理
    ├── CI/CD パイプラインとの統合
    └── Cloud Deployment Manager`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">目次</span>章一覧</div>
                <div className="ctable">
                    <div className="ctable-head">
                        <span className="cthead">章</span>
                        <span className="cthead">タイトル</span>
                        <span className="cthead">主要トピック</span>
                    </div>
                    {[
                        ['Ch1', 'コンピューティングサービス選定', 'GCE / Spot VM / GKE / Cloud Run / Cloud Functions 比較'],
                        ['Ch2', 'Compute Engine 詳解', 'マシンファミリー・OS Login・ファイアウォール'],
                        ['Ch3', 'Spot VM', 'プリエンプション・チェックポイント・コスト最適化'],
                        ['Ch4', 'MIG', '自動ヒーリング・オートスケール・ローリングアップデート'],
                        ['Ch5', 'GKE', 'Autopilot vs Standard・Workload Identity・HPA'],
                        ['Ch6', 'Cloud Run', 'デプロイ・トラフィック分割・コンテナ設定'],
                        ['Ch7', 'Cloud Functions', 'HTTP/GCS/Pub/Sub トリガー・Gen2 vs Gen1'],
                        ['Ch8', 'Cloud Storage', 'ストレージクラス・OLM・署名付きURL'],
                        ['Ch9', 'ブロック/ファイルストレージ', 'Persistent Disk 種類・リージョナルPD・Filestore'],
                        ['Ch10', 'データベース選定', 'Cloud SQL / Spanner / Firestore / Bigtable / BigQuery'],
                        ['Ch11', 'VPC 設計', 'VPC設計パターン・サブネット・ファイアウォール'],
                        ['Ch12', 'Shared VPC と VPC Peering', '管理プロジェクト・サービスプロジェクト・ピアリング'],
                        ['Ch13', 'Cloud NAT と Cloud DNS', 'Cloud Router・NAT・転送ゾーン・プライベートゾーン'],
                        ['Ch14', 'ロードバランサ', 'LB種類選定・URLマップ・Cloud Armor・SSL'],
                        ['Ch15', 'Terraform', 'State管理・モジュール・CI/CD・リモートバックエンド'],
                        ['Ch16', '試験対策まとめ', '頻出パターン・重要用語・練習問題'],
                    ].map(([ch, title, topics]) => (
                        <div className="ctable-row" key={ch}>
                            <span className="ctval">{ch}</span>
                            <span className="ctval">{title}</span>
                            <span className="ctdef">{topics}</span>
                        </div>
                    ))}
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
                    <h2>コンピューティングサービスの選定</h2>
                    <p>GCE・Spot VM・GKE・Cloud Run・Cloud Functions — どのサービスをいつ使うかを判断するフレームワーク</p>
                </div>
                <div className="pct-badge pb1">~21%</div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">1.1</span>サービス選定フローチャート</div>
                <p className="tcard-desc">「どのコンピューティングサービスを使うか？」を判断するフローチャート</p>
                <pre className="codeblock">{`アプリケーションをどのように動かしたい？
│
├── VM（仮想マシン）が必要？
│   ├── 普通の VM → Compute Engine (GCE)
│   └── コスト削減OK・停止されても大丈夫 → Spot VM + MIG
│
├── コンテナを使う？
│   ├── Kubernetes でオーケストレーション → GKE
│   │   ├── 運用を Google に任せたい → GKE Autopilot（推奨）
│   │   └── カーネル設定など細かい制御が必要 → GKE Standard
│   └── HTTP リクエストで動くステートレスなアプリ → Cloud Run
│
└── 関数（コードの断片）を実行したい？
    └── イベント駆動の軽量処理 → Cloud Functions`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">1.2</span>コンピューティングサービス比較表</div>
                <div className="ctable">
                    <div className="ctable-head">
                        <span className="cthead">サービス</span>
                        <span className="cthead">管理レベル</span>
                        <span className="cthead">起動速度</span>
                        <span className="cthead">コスト</span>
                        <span className="cthead">最適なユースケース</span>
                    </div>
                    {[
                        ['Compute Engine', 'フル制御（IaaS）', '遅い（数分）', 'vCPU/時間', 'レガシー移行・特定ライセンス・OS設定が必要'],
                        ['Spot VM', 'フル制御（IaaS）', '遅い', '最大91%割引', 'バッチ・ML・レンダリング（停止OK）'],
                        ['GKE Autopilot', 'フルマネージド', '中程度', 'Pod リソース単位', '大規模マイクロサービス・運用負荷を下げたい'],
                        ['GKE Standard', '半マネージド', '中程度', 'ノード（VM）単位', '特権コンテナ・カーネル設定・DaemonSet'],
                        ['Cloud Run', 'サーバーレス', '高速', 'リクエスト単位', 'HTTP API・ゼロスケール・イベント駆動'],
                        ['Cloud Functions', 'サーバーレス', '高速', '呼び出し回数単位', '軽量グルーロジック・Webhook'],
                    ].map(([svc, mgmt, speed, cost, usecase]) => (
                        <div className="ctable-row" key={svc}>
                            <span className="ctval">{svc}</span>
                            <span className="ctdef">{mgmt}</span>
                            <span className="ctdef">{speed}</span>
                            <span className="ctdef">{cost}</span>
                            <span className="ctdef">{usecase}</span>
                        </div>
                    ))}
                </div>
                <div className="src">
                    参考: cloud.google.com/blog/topics/developers-practitioners/where-should-i-run-my-stuff-choosing-google-cloud-compute-option
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
                    <h2>Compute Engine (GCE) 詳解</h2>
                    <p>マシンファミリー・ディスク種類・OS Login・ネットワーク設定 — IaaS の完全ガイド</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">2.1</span>Compute Engine とは？</div>
                <p className="tcard-desc">
                    Compute Engine は Google Cloud の IaaS（Infrastructure as a Service）です。Linux や Windows の仮想マシン（VM）を自由に作成・管理できます。
                </p>
                <pre className="codeblock">{`【Compute Engine でできること】
・OS の完全な制御（カーネルパラメータの変更など）
・カスタム VM サイズの設定
・GPU/TPU の接続
・静的 IP アドレスの割り当て
・OS レベルのソフトウェアインストール
・特定のライセンス（Windows Server, SQL Server 等）の利用`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">2.2</span>マシンファミリーとマシンタイプ</div>
                <p className="stitle">マシンファミリーの選択基準</p>
                <pre className="codeblock">{`汎用（General Purpose）: N2, N2D, E2, T2D
    → 通常の Web サーバー、開発環境、中程度のワークロード
    → E2 が最もコスト効率が高い（コスト重視ならまずE2）

コンピューティング最適化（Compute Optimized）: C2, C2D
    → CPU 性能が最優先（ゲーム、HPC、高スループット計算）

メモリ最適化（Memory Optimized）: M2, M3
    → 大容量 RAM が必要（SAP HANA、大型インメモリDB）
    → 最大 12TB のメモリ

アクセラレーター最適化（Accelerator Optimized）: A2, A3, G2
    → GPU/TPU が必要（ML トレーニング、推論、3D レンダリング）`}</pre>

                <p className="stitle">マシンタイプの命名規則</p>
                <pre className="codeblock">{`例: n2-standard-4
    │    │       └── vCPU 数（4コア）
    │    └── シリーズ（standard = バランス型）
    └── ファミリー（n2 = 第2世代汎用）

シリーズの種類:
  standard  = vCPU と メモリのバランス型（vCPU : メモリ = 1:4）
  highmem   = メモリ多め（vCPU : メモリ = 1:8）
  highcpu   = CPU 多め（vCPU : メモリ = 1:1）
  micro/small = 最小構成（共有 vCPU）`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">2.3</span>ディスクの種類と選択基準</div>
                <div className="ctable">
                    <div className="ctable-head">
                        <span className="cthead">ディスク種別</span>
                        <span className="cthead">特徴</span>
                        <span className="cthead">IOPS</span>
                        <span className="cthead">用途</span>
                    </div>
                    {[
                        ['Balanced Persistent Disk', 'コストとパフォーマンスのバランス', '最大 80,000', '一般的なワークロード（デフォルト推奨）'],
                        ['SSD Persistent Disk', '高 IOPS・低レイテンシ', '最大 100,000', '高負荷 DB、トランザクション処理'],
                        ['Standard Persistent Disk', '最安価・低 IOPS', '最大 7,500', 'バッチ処理・コールドデータ'],
                        ['Extreme Persistent Disk', '最高性能', '最大 120,000', 'SAP HANA・ミッションクリティカルDB'],
                        ['Local SSD', '物理的に VM に接続・最速', '最大 2,400,000', 'キャッシュ・一時データ（VM停止で消える）'],
                    ].map(([disk, feat, iops, usage]) => (
                        <div className="ctable-row" key={disk}>
                            <span className="ctval">{disk}</span>
                            <span className="ctdef">{feat}</span>
                            <span className="ctdef">{iops}</span>
                            <span className="ctdef">{usage}</span>
                        </div>
                    ))}
                </div>
                <div className="wb">
                    <div className="wbt">重要</div>
                    <p>Local SSD のデータは VM が<strong>停止・削除されると消えます</strong>。永続化が必要なデータには使用しないこと。</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">2.4</span>VM へのセキュアなアクセス管理</div>

                <p className="stitle">❌ アンチパターン: 静的 SSH 鍵の使用</p>
                <pre className="codeblock">{`【問題のある旧来の方法】
VM のメタデータに SSH 公開鍵を登録
    ↓
退職した社員の鍵が残り続ける
    ↓
不正アクセスのリスクが継続
    ↓
鍵の棚卸し作業が膨大`}</pre>

                <p className="stitle">✅ 推奨: OS Login</p>
                <p className="tcard-desc">OS Login は IAM を通じて SSH アクセスを管理します。</p>
                <pre className="codeblock">{`【OS Login の仕組み】

1. IAM で roles/compute.osLogin（一般ユーザー）
   または roles/compute.osAdminLogin（sudo権限）を付与

2. 社員が SSH 接続しようとする
    ↓
3. OS Login が IAM をリアルタイムに照会
    ↓
4. IAM でロールを持っていれば接続OK
   IAM でロールを削除（退職処理）→ 即時アクセス不可

【メリット】
✓ IAM とライフサイクルを統合（退職 = アクセス消滅）
✓ 個別の SSH キーをローテーションする必要なし
✓ Linux アカウントを自動生成・管理
✓ 詳細な監査ログが自動記録`}</pre>

                <p className="stitle">OS Login の設定方法</p>
                <pre className="codeblock">{`# プロジェクト全体に OS Login を有効化
gcloud compute project-info add-metadata \\
  --metadata enable-oslogin=TRUE

# 特定の VM にのみ OS Login を有効化
gcloud compute instances add-metadata VM_NAME \\
  --metadata enable-oslogin=TRUE

# 本番環境では 2FA を追加（強く推奨）
gcloud compute project-info add-metadata \\
  --metadata enable-oslogin-2fa=TRUE

# ユーザーに OS Login ロールを付与
gcloud projects add-iam-policy-binding PROJECT_ID \\
  --member="user:alice@example.com" \\
  --role="roles/compute.osLogin"

# sudo 権限が必要な場合は osAdminLogin を使用
gcloud projects add-iam-policy-binding PROJECT_ID \\
  --member="user:alice@example.com" \\
  --role="roles/compute.osAdminLogin"`}</pre>

                <p className="stitle">JIT（Just-In-Time）アクセス</p>
                <p className="tcard-desc">本番環境での一時的な特権アクセスには JIT を採用します。</p>
                <pre className="codeblock">{`【JIT アクセスの流れ】

1. エンジニアが緊急作業の必要性を検知
2. JIT リクエストを送信（理由を記述）
3. 承認者がリクエストを承認
4. 一時的に sudo ロールを付与（例: 2時間）
5. 作業完了後、自動的に権限が剥奪
6. 全操作が監査ログに記録

【なぜ重要か】
常時 admin 権限を持つアカウントが侵害されると
    → 取り返しのつかない被害
JIT では権限は作業時間だけに限定される
    → 被害を最小化できる`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">2.5</span>VM のネットワーク設定</div>

                <p className="stitle">外部 IP アドレスの管理</p>
                <pre className="codeblock">{`【一時的な外部 IP (Ephemeral)】
  VM の起動時に自動割り当て
  VM 停止時に解放される（再起動すると変わる）
  コスト: 無料（使用中）

【静的な外部 IP (Static)】
  明示的に予約する
  VM が停止しても保持される
  コスト: 予約中は有料（VM に割り当て中は無料）

【外部 IP なし（推奨: セキュリティ）】
  プライベートネットワーク内のリソースだけからアクセス
  Cloud NAT でインターネットへのアウトバウンドは可能
  セキュリティ上のリスクを最小化`}</pre>

                <p className="stitle">ファイアウォールルール</p>
                <pre className="codeblock">{`# HTTP/HTTPS を許可するファイアウォールルール作成
gcloud compute firewall-rules create allow-http-https \\
  --network=my-vpc \\
  --action=ALLOW \\
  --rules=tcp:80,tcp:443 \\
  --target-tags=web-server \\
  --source-ranges=0.0.0.0/0

# SSH を特定の IP からのみ許可
gcloud compute firewall-rules create allow-ssh-bastion \\
  --network=my-vpc \\
  --action=ALLOW \\
  --rules=tcp:22 \\
  --target-tags=bastion \\
  --source-ranges=203.0.113.0/24`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">2.BP</span>ベストプラクティス: Compute Engine</div>
                <div className="bp">
                    <div className="bpt">ベストプラクティス</div>
                    <div className="ctable">
                        <div className="ctable-head">
                            <span className="cthead">#</span>
                            <span className="cthead">ベストプラクティス</span>
                            <span className="cthead">理由</span>
                        </div>
                        {[
                            ['1', 'OS Login + 2FA を有効化（静的 SSH 鍵は禁止）', 'キーの漏洩・管理コストを排除'],
                            ['2', '外部 IP を持たない VM 構成（Cloud NAT でアウトバウンド）', '攻撃面（アタックサーフェス）を最小化'],
                            ['3', '本番 VM への SSH は JIT アクセスで一時的に付与', '常時権限による被害を防止'],
                            ['4', 'シールドド VM（Shielded VM）を有効化', 'UEFI セキュアブートで VM の完全性を保証'],
                            ['5', 'メタデータサーバーへの不必要なアクセスを制限', '認証情報の不正取得を防止'],
                            ['6', 'Confidential VM を検討（機密ワークロード）', 'メモリ上のデータも暗号化'],
                        ].map(([num, bp, reason]) => (
                            <div className="ctable-row" key={num}>
                                <span className="ctval">{num}</span>
                                <span className="ctval">{bp}</span>
                                <span className="ctdef">{reason}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="src">
                    参考: cloud.google.com/blog/products/compute/top-compute-engine-documentation-pages/
                </div>
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
                    <h2>Spot VM とプリエンプティブル VM</h2>
                    <p>最大91%割引の余剰リソース活用 — チェックポイント設計とプリエンプション対応の完全ガイド</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">3.1</span>Spot VM とは？</div>
                <p className="tcard-desc">
                    Google のデータセンターには、常に余剰の計算リソースがあります。Spot VM はその余剰リソースを格安で提供する仕組みです。
                </p>
                <pre className="codeblock">{`【通常の VM】
  ・確実に稼働し続ける
  ・通常料金（例: n2-standard-4 = 約$0.19/時間）

【Spot VM】
  ・余剰リソースを利用するため最大 91% 割引
  ・Google がリソースを必要としたら 30秒前通知で強制停止される
  ・例: n2-standard-4 = 約$0.02/時間（約90%割引）`}</pre>
                <div className="wb">
                    <div className="wbt">重要</div>
                    <p>Spot VM はいつでも停止される可能性があります。ステートフルなアプリや停止が許されないサービスには使用禁止！</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">3.2</span>Spot VM vs Preemptible VM</div>
                <div className="ctable">
                    <div className="ctable-head">
                        <span className="cthead">項目</span>
                        <span className="cthead">Preemptible VM（旧）</span>
                        <span className="cthead">Spot VM（現在推奨）</span>
                    </div>
                    {[
                        ['最大稼働時間', '24時間（強制停止）', '制限なし'],
                        ['停止通知', '30秒前', '30秒前'],
                        ['価格', '最大80%割引', '最大91%割引'],
                        ['推奨度', '❌ 非推奨（レガシー）', '✅ 推奨'],
                    ].map(([item, old, current]) => (
                        <div className="ctable-row" key={item}>
                            <span className="ctval">{item}</span>
                            <span className="ctdef">{old}</span>
                            <span className="ctdef">{current}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">3.3</span>Spot VM に適したワークロード</div>
                <pre className="codeblock">{`✅ 向いているワークロード:
  ├── バッチ処理（夜間の大量データ処理）
  ├── ML/AI モデルのトレーニング
  ├── 3D レンダリング、動画エンコード
  ├── ゲノム解析などのサイエンティフィック計算
  └── 継続的インテグレーション（CI）のビルド/テスト

❌ 向いていないワークロード:
  ├── Web サーバー（ユーザーへの影響大）
  ├── データベース（データの整合性が壊れる可能性）
  ├── ステートフルなアプリ（状態が失われる）
  └── 停止が許されないミッションクリティカルなサービス`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">3.4</span>プリエンプション（強制停止）への対応設計</div>

                <p className="stitle">① 終了アクションの設定</p>
                <pre className="codeblock">{`# Spot VM 作成時に終了アクションを設定
gcloud compute instances create my-spot-vm \\
  --machine-type=n2-standard-4 \\
  --provisioning-model=SPOT \\
  --instance-termination-action=STOP  # STOP または DELETE

# STOP: VM を停止状態にする（ローカルディスクのデータ保持）
#   → キャパシティが戻った時に再起動可能
# DELETE: VM を削除する（最小コスト・ローカルデータ消失）`}</pre>

                <div className="ctable">
                    <div className="ctable-head">
                        <span className="cthead">終了アクション</span>
                        <span className="cthead">ローカルSSDデータ</span>
                        <span className="cthead">再起動</span>
                        <span className="cthead">用途</span>
                    </div>
                    {[
                        ['STOP', '✅ 保持', '自動（キャパシティ回復後）', 'データを保持したいバッチ'],
                        ['DELETE', '❌ 消える', 'MIG が新規作成', '純粋なバッチ・ステートレス'],
                    ].map(([action, data, restart, usage]) => (
                        <div className="ctable-row" key={action}>
                            <span className="ctval">{action}</span>
                            <span className="ctdef">{data}</span>
                            <span className="ctdef">{restart}</span>
                            <span className="ctdef">{usage}</span>
                        </div>
                    ))}
                </div>

                <p className="stitle">② シャットダウンスクリプトの設定</p>
                <pre className="codeblock">{`# 停止前に状態を Cloud Storage に保存するスクリプト
#!/bin/bash
# /etc/google-cloud/metadata/shutdown-scripts

echo "Spot VM preemption detected. Saving checkpoint..."

# 処理の進捗を Cloud Storage に保存
gsutil cp /var/app/checkpoint.dat gs://my-batch-bucket/checkpoints/job-\${JOB_ID}.dat

# 処理ログを保存
gsutil cp /var/log/app.log gs://my-batch-bucket/logs/job-\${JOB_ID}.log

echo "Checkpoint saved. Shutting down."`}</pre>

                <pre className="codeblock">{`gcloud compute instances add-metadata VM_NAME \\
  --metadata-from-file shutdown-script=shutdown.sh`}</pre>

                <p className="stitle">③ チェックポイントの実装パターン</p>
                <pre className="codeblock">{`# バッチ処理でのチェックポイント実装例（Python）
import signal
import json
from google.cloud import storage

checkpoint_file = "gs://my-bucket/checkpoints/job.json"
is_preempted = False

def handle_sigterm(signum, frame):
    """SIGTERM を受け取ったら（プリエンプション通知）"""
    global is_preempted
    is_preempted = True
    save_checkpoint(current_progress)
    print("Checkpoint saved, shutting down gracefully")

signal.signal(signal.SIGTERM, handle_sigterm)

def save_checkpoint(progress):
    """進捗を GCS に保存"""
    client = storage.Client()
    # ... チェックポイントをGCSに書き込み

def load_checkpoint():
    """前回の進捗を GCS から読み込み"""
    # ... GCS からチェックポイントを読み込み
    pass

# メイン処理（チェックポイントから再開）
last_checkpoint = load_checkpoint()
for i in range(last_checkpoint, total_items):
    if is_preempted:
        break
    process_item(i)
    current_progress = i`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">3.5</span>Spot VM のコスト計算例</div>
                <pre className="codeblock">{`通常の ML トレーニングジョブ:
  A2 Ultra（8x A100 GPU） 通常料金: $32.77/時間
  Spot VM 割引（約70%）:            $9.83/時間

  10時間のトレーニング:
    通常: $327.70
    Spot: $98.30
    節約: $229.40（約70%節約）！`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">3.BP</span>ベストプラクティス: Spot VM</div>
                <div className="bp">
                    <div className="bpt">ベストプラクティス</div>
                    <div className="ctable">
                        <div className="ctable-head">
                            <span className="cthead">#</span>
                            <span className="cthead">ベストプラクティス</span>
                            <span className="cthead">詳細</span>
                        </div>
                        {[
                            ['1', 'MIG（Managed Instance Group）と組み合わせる', 'プリエンプト後に自動で新しい VM を作成'],
                            ['2', 'チェックポイント機能を必ず実装', '処理を途中から再開できるよう設計'],
                            ['3', '終了アクションは STOP を基本に', 'データを保持しキャパシティ回復後に再起動'],
                            ['4', 'シャットダウンスクリプトを設定', '30秒の猶予でクリーンに終了処理'],
                            ['5', '複数ゾーンにわたる MIG を構成', '特定ゾーンの Spot VM が全滅するリスクを分散'],
                            ['6', 'gcloud compute operations describe でプリエンプション履歴を確認', 'Spot 利用率の最適化'],
                        ].map(([num, bp, detail]) => (
                            <div className="ctable-row" key={num}>
                                <span className="ctval">{num}</span>
                                <span className="ctval">{bp}</span>
                                <span className="ctdef">{detail}</span>
                            </div>
                        ))}
                    </div>
                </div>
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
                    <h2>Managed Instance Group (MIG)</h2>
                    <p>自動ヒーリング・オートスケーリング・ローリングアップデート — 高可用性VM管理の完全ガイド</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">4.1</span>MIG とは？</div>
                <p className="tcard-desc">
                    MIG（Managed Instance Group）は、<strong>インスタンステンプレート</strong> から同一設定の VM を複数自動管理する機能です。
                </p>
                <pre className="codeblock">{`インスタンステンプレート（設計図）
  ├── マシンタイプ: n2-standard-4
  ├── OS イメージ: debian-11
  ├── ディスクサイズ: 100GB
  └── スタートアップスクリプト: install_app.sh

       ↓ MIG が自動的に複数の VM を作成・管理

VM1（asia-northeast1-a）
VM2（asia-northeast1-b）
VM3（asia-northeast1-c）`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">4.2</span>MIG の主要機能</div>

                <p className="stitle">機能① 自動ヒーリング（Auto Healing）</p>
                <pre className="codeblock">{`ヘルスチェックで VM の異常を検知
    ↓
異常な VM を自動的に削除
    ↓
新しい VM を自動作成

→ 人間が介入しなくてもサービスを維持！`}</pre>

                <p className="stitle">ヘルスチェックの設定</p>
                <pre className="codeblock">{`# ヘルスチェックを作成
gcloud compute health-checks create http my-health-check \\
  --port=80 \\
  --request-path=/health \\
  --check-interval=30s \\
  --timeout=10s \\
  --healthy-threshold=1 \\
  --unhealthy-threshold=3

# MIG にヘルスチェックを設定
gcloud compute instance-groups managed set-autohealing my-mig \\
  --health-check=my-health-check \\
  --initial-delay=300  # 起動後300秒は異常判定しない`}</pre>

                <p className="stitle">機能② 自動スケーリング（Autoscaling）</p>
                <pre className="codeblock">{`負荷が増加 → VM を自動追加（スケールアウト）
負荷が減少 → VM を自動削除（スケールイン）

スケーリングの指標:
  ├── CPU 使用率（最もシンプル）
  ├── HTTP リクエスト数（LB と連携）
  ├── Cloud Monitoring カスタムメトリクス
  └── Pub/Sub キューの深さ（バッチ処理に有効）`}</pre>

                <pre className="codeblock">{`# CPU 使用率 60% を目標にオートスケールを設定
gcloud compute instance-groups managed set-autoscaling my-mig \\
  --max-num-replicas=10 \\
  --min-num-replicas=2 \\
  --target-cpu-utilization=0.6 \\
  --cool-down-period=90`}</pre>

                <p className="stitle">機能③ ローリングアップデート（Rolling Update）</p>
                <pre className="codeblock">{`旧バージョンのインスタンステンプレート
          ↓ ローリングアップデート
新バージョンのインスタンステンプレート

・1台ずつ順番に更新（サービスを止めない）
・問題が発生したらロールバック可能`}</pre>

                <pre className="codeblock">{`# ローリングアップデートを実行
gcloud compute instance-groups managed rolling-action start-update my-mig \\
  --version=template=new-template \\
  --max-surge=1 \\
  --max-unavailable=0    # 同時に停止できるVM数（0=サービス継続）`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">4.3</span>ゾーン MIG vs リージョン MIG</div>
                <div className="ctable">
                    <div className="ctable-head">
                        <span className="cthead">種類</span>
                        <span className="cthead">展開範囲</span>
                        <span className="cthead">耐障害性</span>
                        <span className="cthead">用途</span>
                    </div>
                    {[
                        ['ゾーン MIG', '1つのゾーン', '低（ゾーン障害で全停止）', '開発・テスト環境'],
                        ['リージョン MIG', '3つのゾーンに均等分散', '高（1ゾーン障害でも継続）', '本番環境（推奨）'],
                    ].map(([type, range, fault, usage]) => (
                        <div className="ctable-row" key={type}>
                            <span className="ctval">{type}</span>
                            <span className="ctdef">{range}</span>
                            <span className="ctdef">{fault}</span>
                            <span className="ctdef">{usage}</span>
                        </div>
                    ))}
                </div>
                <pre className="codeblock">{`# リージョン MIG の作成（本番環境推奨）
gcloud compute instance-groups managed create my-regional-mig \\
  --template=my-template \\
  --size=6 \\
  --region=asia-northeast1  # ゾーンではなくリージョンを指定`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">4.BP</span>ベストプラクティス: MIG</div>
                <div className="bp">
                    <div className="bpt">ベストプラクティス</div>
                    <ul>
                        <li>本番環境は<strong>リージョン MIG</strong> でゾーン障害に備える</li>
                        <li><strong>ヘルスチェック + 自動ヒーリング</strong>を必ず設定する</li>
                        <li>Spot VM との組み合わせでコスト削減（<code>--provisioning-model=SPOT</code>）</li>
                        <li>オートスケーリングの <code>max-num-replicas</code> に上限を設ける（コスト暴走防止）</li>
                        <li>ローリングアップデートで <code>max-unavailable=0</code> を設定してゼロダウンタイム更新</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default function Domain2Page() {
    return (
        <div className="d2-page">
            <section className="hero">
                <div className="hero-eyebrow">ACE Domain 2 · ~21%</div>
                <h1>
                    Planning and Implementing{' '}
                    <span>a Cloud Solution</span>
                </h1>
                <p className="hero-sub">
                    クラウドソリューションの計画と実装 — 初学者でもわかる詳細解説とベストプラクティス
                </p>
                <div className="hero-meta">
                    <span className="hero-badge">
                        <span className="dot dot-green" />
                        試験配点 ~21%
                    </span>
                    <span className="hero-badge">
                        <span className="dot dot-cyan" />
                        全16章
                    </span>
                    <span className="hero-badge">
                        <span className="dot" />
                        コードブロック 234個
                    </span>
                </div>
            </section>

            <nav className="snav" role="navigation" aria-label="章ナビゲーション">
                <div className="snav-inner">
                    <a href="#ch0" className="snav-link"><span className="snav-num">00</span>全体マップ</a>
                    <a href="#ch1" className="snav-link"><span className="snav-num">01</span>コンピューティング選定</a>
                    <a href="#ch2" className="snav-link"><span className="snav-num">02</span>Compute Engine</a>
                    <a href="#ch3" className="snav-link"><span className="snav-num">03</span>Spot VM</a>
                    <a href="#ch4" className="snav-link"><span className="snav-num">04</span>MIG</a>
                    <a href="#ch5" className="snav-link"><span className="snav-num">05</span>GKE</a>
                    <a href="#ch6" className="snav-link"><span className="snav-num">06</span>Cloud Run</a>
                    <a href="#ch7" className="snav-link"><span className="snav-num">07</span>Cloud Functions</a>
                    <a href="#ch8" className="snav-link"><span className="snav-num">08</span>Cloud Storage</a>
                    <a href="#ch9" className="snav-link"><span className="snav-num">09</span>ブロック/ファイル</a>
                    <a href="#ch10" className="snav-link"><span className="snav-num">10</span>データベース</a>
                    <a href="#ch11" className="snav-link"><span className="snav-num">11</span>VPC</a>
                    <a href="#ch12" className="snav-link"><span className="snav-num">12</span>Shared VPC</a>
                    <a href="#ch13" className="snav-link"><span className="snav-num">13</span>Cloud NAT/DNS</a>
                    <a href="#ch14" className="snav-link"><span className="snav-num">14</span>ロードバランサ</a>
                    <a href="#ch15" className="snav-link"><span className="snav-num">15</span>Terraform</a>
                    <a href="#ch16" className="snav-link"><span className="snav-num">16</span>試験対策</a>
                </div>
            </nav>

            <div className="wrapper">
                <SectionIntro />
                <Chapter1 />
                <Chapter2 />
                <Chapter3 />
                <Chapter4 />
                <div id="ch5" className="sgap">
                    <h2>Google Kubernetes Engine (GKE)</h2>
                    <p style={{ color: 'var(--d2-text-muted, #8899b0)' }}>実装中...</p>
                </div>
                <div id="ch6" className="sgap">
                    <h2>Cloud Run</h2>
                    <p style={{ color: 'var(--d2-text-muted, #8899b0)' }}>実装中...</p>
                </div>
                <div id="ch7" className="sgap">
                    <h2>Cloud Functions</h2>
                    <p style={{ color: 'var(--d2-text-muted, #8899b0)' }}>実装中...</p>
                </div>
                <div id="ch8" className="sgap">
                    <h2>Cloud Storage</h2>
                    <p style={{ color: 'var(--d2-text-muted, #8899b0)' }}>実装中...</p>
                </div>
                <div id="ch9" className="sgap">
                    <h2>ブロック・ファイルストレージ</h2>
                    <p style={{ color: 'var(--d2-text-muted, #8899b0)' }}>実装中...</p>
                </div>
                <div id="ch10" className="sgap">
                    <h2>データベース選定</h2>
                    <p style={{ color: 'var(--d2-text-muted, #8899b0)' }}>実装中...</p>
                </div>
                <div id="ch11" className="sgap">
                    <h2>VPC 設計</h2>
                    <p style={{ color: 'var(--d2-text-muted, #8899b0)' }}>実装中...</p>
                </div>
                <div id="ch12" className="sgap">
                    <h2>Shared VPC と VPC Peering</h2>
                    <p style={{ color: 'var(--d2-text-muted, #8899b0)' }}>実装中...</p>
                </div>
                <div id="ch13" className="sgap">
                    <h2>Cloud NAT と Cloud DNS</h2>
                    <p style={{ color: 'var(--d2-text-muted, #8899b0)' }}>実装中...</p>
                </div>
                <div id="ch14" className="sgap">
                    <h2>ロードバランサ</h2>
                    <p style={{ color: 'var(--d2-text-muted, #8899b0)' }}>実装中...</p>
                </div>
                <div id="ch15" className="sgap">
                    <h2>Terraform による IaC</h2>
                    <p style={{ color: 'var(--d2-text-muted, #8899b0)' }}>実装中...</p>
                </div>
                <div id="ch16" className="sgap">
                    <h2>試験対策まとめ</h2>
                    <p style={{ color: 'var(--d2-text-muted, #8899b0)' }}>ベストプラクティス: 実装中...</p>
                </div>
            </div>

            <footer className="page-footer">
                <p>Domain 2: Planning and Implementing a Cloud Solution</p>
            </footer>
        </div>
    );
}
