import type { Metadata } from 'next';

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

            <div className="tcard">
                <div className="ttitle"><span className="tid">1.3</span>コスト最適化: Pricing Calculator と確約利用割引（補足）</div>
                <p className="tcard-desc">アーキテクチャ計画段階でのコスト見積もりと制御メカニズムを理解することが、クラウド破産を防ぐ鍵です。</p>
                <div className="ctable">
                    <div className="ctable-head">
                        <span className="cthead">最適化手法</span>
                        <span className="cthead">説明</span>
                        <span className="cthead">対象</span>
                    </div>
                    {[
                        ['Pricing Calculator', 'リソースの予想利用量から月額料金をシミュレーション。リージョンごとの差分も把握可能', 'すべてのサービス'],
                        ['確約利用割引（CUD）1年', '1年間の利用確約でオンデマンド価格から最大20%割引', 'Compute Engine / Cloud SQL'],
                        ['確約利用割引（CUD）3年', '3年間の利用確約で最大70%割引', 'Compute Engine / Cloud SQL'],
                        ['財務バッファ', 'サーバーレスの見積もりには10〜20%の余裕を追加（トラフィックスパイク対応）', 'Cloud Run / Functions / MIG'],
                        ['カスタム割り当て（Quotas）', 'BigQuery の1日あたりの処理データ量に上限を設定して高額請求を防止', 'BigQuery'],
                        ['Maximum bytes billed', 'クエリ単位で上限バイト数を設定。上限超過クエリは実行前に失敗させる', 'BigQuery'],
                    ].map(([method, desc, target]) => (
                        <div className="ctable-row" key={method}>
                            <span className="ctval">{method}</span>
                            <span className="ctdef">{desc}</span>
                            <span className="ctdef">{target}</span>
                        </div>
                    ))}
                </div>
                <div className="wb">
                    <div className="wbt">初学者の罠</div>
                    <p>BigQuery で <code>LIMIT</code> 句を使っても、列指向ストレージの特性上スキャンされるデータ量（課金対象バイト数）は一切減少しません。必ず<strong>テーブルプレビュー機能</strong>を使い、クエリ前に推定コストを確認してください。</p>
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

function Chapter16() {
    return (
        <div id="ch16" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn16">16</div>
                <div className="sec-head-txt">
                    <h2>試験対策まとめ</h2>
                    <p>頻出パターン・重要用語チェックリスト・推奨リソース — ACE Domain 2 完全攻略ガイド</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">16.1</span>試験頻出の選択問題パターン</div>

                <p className="stitle">パターン①: コンピューティングサービスの選択</p>
                <pre className="codeblock">{`【問題文の例】
「画像処理のバッチジョブを実行したい。
 コストを最小化しつつ、停止されても問題ない。
 どのサービスを使うべきか？」

正解: Spot VM + MIG
理由:
  ・バッチジョブ → 停止されても問題ない
  ・コスト最小化 → Spot VM（最大91%割引）
  ・停止後の自動再作成 → MIG と組み合わせ

【問題文の例】
「HTTP API を提供したい。
 アイドル時間はコストゼロにしたい。
 どのサービスを使うべきか？」

正解: Cloud Run
理由:
  ・HTTP API → Cloud Run
  ・アイドル時コストゼロ → ゼロスケール可能`}</pre>

                <p className="stitle">パターン②: データベースの選択</p>
                <pre className="codeblock">{`【問題文の例】
「グローバルに展開する金融システムで
 強い整合性が必要。99.999% の可用性が必要。
 どのDBを使うべきか？」

正解: Cloud Spanner
理由:
  ・グローバル分散 → Spanner
  ・強整合性 → Spanner（ACID）
  ・99.999% SLA → Spanner のみが提供

【問題文の例】
「IoT デバイスから毎秒100万件のデータが来る。
 低レイテンシでの書き込みが必要。
 どのDBを使うべきか？」

正解: Cloud Bigtable
理由:
  ・超大規模・高スループット → Bigtable
  ・時系列データ → Bigtable のユースケース`}</pre>

                <p className="stitle">パターン③: ネットワーク設計</p>
                <pre className="codeblock">{`【問題文の例】
「複数のチームが同じ VPC ネットワークを使いたい。
 ネットワーク管理は1チームが担当し、
 各チームはアプリのみ管理したい。」

正解: Shared VPC
理由:
  ・ネットワーク管理の集中化 → ホストプロジェクト
  ・各チームがアプリを管理 → サービスプロジェクト

【問題文の例】
「VPC A が VPC B と Peering。
 VPC B が VPC C と Peering。
 A から C に直接通信できるか？」

正解: できない（Peering は推移的でない）`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">16.2</span>Domain 2 重要用語チェックリスト</div>

                <p className="stitle">コンピューティング</p>
                <div className="bp">
                    <div className="bpt">ベストプラクティス</div>
                    <ul>
                        <li>Spot VM は最大 <strong>91%</strong> 割引で、いつでもプリエンプトされる</li>
                        <li>Spot VM はバッチ・ML・レンダリングに最適（Web サーバーは NG）</li>
                        <li>GKE Autopilot は Pod リソース単位の課金（アイドルコストなし）</li>
                        <li>GKE Standard は特権コンテナや DaemonSet が必要な場合に選択</li>
                        <li>Workload Identity で GKE から GCP API にアクセス（JSON キー禁止）</li>
                        <li>Cloud Run はゼロスケール可能なサーバーレスコンテナ</li>
                    </ul>
                </div>

                <p className="stitle">ストレージ・データベース</p>
                <div className="bp">
                    <div className="bpt">ベストプラクティス</div>
                    <ul>
                        <li>Cloud Storage の 4 クラス（Standard/Nearline/Coldline/Archive）の使い分け</li>
                        <li>Nearline=30日、Coldline=90日、Archive=365日 の最小保存期間</li>
                        <li>OLM（Object Lifecycle Management）でストレージクラスを自動移行</li>
                        <li>署名付き URL の最大有効期間は <strong>7日間</strong></li>
                        <li>Cloud SQL は標準 RDBMS、Spanner はグローバル分散（99.999%）</li>
                        <li>Bigtable は ペタバイトスケール・時系列データ</li>
                        <li>Firestore はリアルタイム同期・モバイル/IoT バックエンド</li>
                    </ul>
                </div>

                <p className="stitle">ネットワーク</p>
                <div className="bp">
                    <div className="bpt">ベストプラクティス</div>
                    <ul>
                        <li>Google Cloud VPC は <strong>グローバル</strong>（リージョンをまたぐ）</li>
                        <li>Shared VPC: ホストプロジェクトがネットワークを集中管理</li>
                        <li>VPC Peering は <strong>推移的でない</strong>（A-B-C でも A-C は通信不可）</li>
                        <li>Cloud NAT: 外部 IP なし VM のインターネットアウトバウンド</li>
                        <li>Cloud DNS 転送ゾーン: GCP → オンプレの DNS 解決</li>
                        <li>Global ALB はグローバル配信、Regional LB はリージョン内限定</li>
                        <li>コンプライアンス要件（データ主権）には必ずリージョナル LB</li>
                    </ul>
                </div>

                <p className="stitle">Terraform</p>
                <div className="bp">
                    <div className="bpt">ベストプラクティス</div>
                    <ul>
                        <li>State ファイルは <strong>Cloud Storage のリモートバックエンド</strong>に保存</li>
                        <li>State ファイルを <strong>手動編集禁止</strong></li>
                        <li><code>terraform plan -out=tfplan</code> → <code>terraform apply tfplan</code> の順番</li>
                        <li>CI/CD の認証は JSON キーではなく <strong>Workload Identity/ADC</strong></li>
                        <li>Terraform 1.5以降は <code>import</code> ブロックで既存リソースを取り込み</li>
                    </ul>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">16.3</span>推奨学習リソース（Domain 2）</div>
                <div className="ctable">
                    <div className="ctable-head">
                        <span className="cthead">リソース</span>
                        <span className="cthead">URL</span>
                    </div>
                    {[
                        ['ACE 試験公式ページ', 'cloud.google.com/learn/certification/cloud-engineer'],
                        ['Compute Engine ドキュメント', 'cloud.google.com/compute/docs'],
                        ['OS Login 設定', 'cloud.google.com/compute/docs/oslogin/set-up-oslogin'],
                        ['Spot VM の作成と使用', 'cloud.google.com/compute/docs/instances/create-use-spot'],
                        ['GKE Autopilot セキュリティ', 'cloud.google.com/kubernetes-engine/docs/concepts/autopilot-security'],
                        ['GKE Autopilot vs Standard', 'cloud.google.com/kubernetes-engine/docs/resources/autopilot-standard-feature-comparison'],
                        ['Cloud Run ネットワーキング', 'cloud.google.com/run/docs/configuring/networking-best-practices'],
                        ['Cloud Storage ベストプラクティス', 'cloud.google.com/storage/docs/best-practices'],
                        ['データベース選定ガイド', 'cloud.google.com/blog/topics/developers-practitioners/your-google-cloud-database-options-explained'],
                        ['VPC 設計ベストプラクティス', 'cloud.google.com/architecture/best-practices-vpc-design'],
                        ['Shared VPC', 'cloud.google.com/vpc/docs/shared-vpc'],
                        ['Cloud NAT のベストプラクティス', 'cloud.google.com/blog/products/networking/6-best-practices-for-running-cloud-nat'],
                        ['ロードバランサ選定', 'cloud.google.com/load-balancing/docs/choosing-load-balancer'],
                        ['Terraform ベストプラクティス', 'cloud.google.com/docs/terraform/best-practices/operations'],
                    ].map(([resource, url]) => (
                        <div className="ctable-row" key={resource}>
                            <span className="ctval">{resource}</span>
                            <span className="ctdef">{url}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">16.ADV</span>Domain 2 学習の最終アドバイス</div>
                <div className="wb">
                    <div className="wbt">最終アドバイス</div>
                    <p>Domain 2 は ACE 試験の中で<strong>最大配点（≈21%）</strong>です。以下の点を徹底的に習得してください。</p>
                </div>
                <div className="bp">
                    <div className="bpt">ベストプラクティス</div>
                    <ul>
                        <li><strong>① サービス選定の「理由」を説明できるようにする</strong><br />
                            「このサービスを選ぶのはなぜか？」を自分の言葉で説明できること</li>
                        <li><strong>② アンチパターンと推奨パターンをセットで覚える</strong><br />
                            「❌ JSON キー → ✅ Workload Identity」のように対比で理解する</li>
                        <li><strong>③ 実際に手を動かす（ハンズオン）</strong><br />
                            Cloud Shell や Google Cloud Skills Boost で実際に触ることが最高の学習法</li>
                    </ul>
                </div>
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
                    <h2>ロードバランサの選定と設定</h2>
                    <p>ALB/NLB・URL マップ・Cloud Armor・コンプライアンス要件 — トラフィック分散の完全ガイド</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">14.1</span>ロードバランサ選定フローチャート</div>
                <pre className="codeblock">{`どんなトラフィック？
├── HTTP/HTTPS
│   └── Application Load Balancer (L7)
│       ├── グローバル配信が必要 → Global External ALB (Premium Tier)
│       ├── リージョン内に限定 → Regional External ALB
│       └── VPC 内部のみ → Internal ALB
│
└── TCP/UDP/その他
    └── Network Load Balancer (L4)
        ├── SSL オフロード必要 → Proxy Network LB
        └── 送信元 IP 保持・UDP が必要 → Passthrough Network LB
            └── 内部通信のみ → Internal Passthrough NLB`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">14.2</span>Application Load Balancer（L7）</div>

                <p className="stitle">Global External ALB（グローバル外部 ALB）</p>
                <pre className="codeblock">{`特徴:
  ├── Anycast IP（1つのIPで全世界にサービス提供）
  ├── ユーザーに最も近いエッジ PoP で SSL 終端
  ├── URL ベースのルーティング（/api/* → API バックエンド）
  ├── ヘッダーベースのルーティング
  ├── Cloud Armor（DDoS 防御）と統合
  └── Premium Tier ネットワーク使用（Google のバックボーン）

主なユースケース:
  ├── グローバルな Web サービス
  ├── 複数リージョンにバックエンドを分散
  └── セキュリティ要件の高い Web アプリ`}</pre>

                <p className="stitle">URL マップによるルーティング</p>
                <pre className="codeblock">{`URL マップの例:

/ （デフォルト）→ フロントエンド MIG
/api/*         → API Cloud Run サービス
/static/*      → Cloud Storage バケット（静的コンテンツ）
/admin/*       → 管理者用バックエンド（特定 IP のみ Cloud Armor で制限）`}</pre>

                <pre className="codeblock">{`# URL マップを作成
gcloud compute url-maps create my-url-map \\
  --default-service=frontend-backend-service

# パスマッチャーを追加
gcloud compute url-maps add-path-matcher my-url-map \\
  --path-matcher-name=api-matcher \\
  --default-service=frontend-backend-service \\
  --backend-service-path-rules=/api/*=api-backend-service,/static/*=storage-backend`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">14.3</span>Network Load Balancer（L4）</div>
                <pre className="codeblock">{`Proxy Network LB（プロキシ型）:
  クライアント ─── 接続終端 ─── Cloud LB ─── 新しい接続 ─── バックエンド

  ・LB でTCP接続を終端
  ・SSL オフロードが可能
  ・クライアントの送信元IPが失われる（X-Forwarded-For ヘッダーで補完）

Passthrough Network LB（パススルー型）:
  クライアント ──────────────── バックエンド（直接）
              ↑ パケットをそのまま転送

  ・クライアントの送信元IPをそのままバックエンドに転送
  ・TCP/UDP/ESP/GRE/ICMP に対応
  ・バックエンドが直接クライアントに応答（DSR: Direct Server Return）

使い分け:
  送信元IP が必要（ログ記録・地域制限など）→ Passthrough
  SSL オフロードが必要 → Proxy`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">14.4</span>コンプライアンス要件とロードバランサの選択</div>
                <div className="wb">
                    <div className="wbt">試験頻出</div>
                    <p>データ主権・コンプライアンス要件がある場合</p>
                </div>
                <pre className="codeblock">{`【コンプライアンス要件がある場合】

「すべてのトラフィックを日本国内に留める必要がある」
「SSL/TLS 終端は必ず東京リージョンで行わなければならない」

→ グローバルスコープの ALB は使えない！
  グローバル ALB はエッジで SSL 終端するため
  海外の PoP でも処理される可能性がある

→ 必ず「リージョナル」ロードバランサを選択
  Regional External ALB または
  Regional Internal ALB`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">14.5</span>Cloud Armor（DDoS 防御）</div>
                <pre className="codeblock">{`【Cloud Armor の主な機能】

DDoS 防御:
  → アプリケーション層（L7）の攻撃を自動軽減

WAF（Web Application Firewall）:
  → SQLインジェクション・XSS などを検出・ブロック

カスタムルール:
  → 特定 IP からのブロック
  → 地理情報ベースのアクセス制御

レート制限:
  → 1つの IP から大量リクエストをブロック`}</pre>

                <pre className="codeblock">{`# Cloud Armor ポリシーを作成して ALB に適用
gcloud compute security-policies create my-security-policy \\
  --description="WAF and DDoS protection"

# 日本以外からのアクセスをブロック
gcloud compute security-policies rules create 1000 \\
  --security-policy=my-security-policy \\
  --expression="origin.region_code != 'JP'" \\
  --action=deny-403

# ALB バックエンドサービスにポリシーを適用
gcloud compute backend-services update my-backend-service \\
  --security-policy=my-security-policy \\
  --global`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">14.BP</span>ベストプラクティス: ロードバランサ</div>
                <div className="bp">
                    <div className="bpt">ベストプラクティス</div>
                    <div className="ctable">
                        <div className="ctable-head">
                            <span className="cthead">#</span>
                            <span className="cthead">ベストプラクティス</span>
                            <span className="cthead">理由</span>
                        </div>
                        {[
                            ['1', '本番 Web アプリには Cloud Armor を必ず設定', 'DDoS・WAF 保護'],
                            ['2', 'コンプライアンス要件がある場合はリージョナル LB を選択', 'データの地理的制限'],
                            ['3', 'バックエンドサービスにヘルスチェックを設定', '異常バックエンドへのルーティング防止'],
                            ['4', 'グローバル ALB は Premium Tier ネットワークで使用', 'Standard Tier では真のグローバル配信にならない'],
                            ['5', '送信元 IP が必要なら Passthrough NLB を選択', 'Proxy 型は送信元 IP が失われる'],
                        ].map(([num, bp, reason]) => (
                            <div className="ctable-row" key={num}>
                                <span className="ctval">{num}</span>
                                <span className="ctval">{bp}</span>
                                <span className="ctdef">{reason}</span>
                            </div>
                        ))}
                    </div>
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
                    <h2>Infrastructure as Code (Terraform)</h2>
                    <p>State管理・リモートバックエンド・CI/CD統合・GitOps — IaC の完全ガイド</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">15.1</span>なぜ IaC が重要か？</div>
                <pre className="codeblock">{`【手動でコンソール操作する問題】

  ├── 再現性がない（「あの設定どうやったっけ？」）
  ├── 環境間の差異（dev と prod の設定が微妙に違う）
  ├── 監査ができない（「誰がいつ何を変えたか？」）
  └── ヒューマンエラー（クリック間違い）

【Terraform（IaC）による解決】

  ├── コードとして定義 → 完全に再現可能
  ├── Git で管理 → 変更履歴が完全に記録される
  ├── PR レビュー → 本番適用前に人間がチェック
  └── plan → apply の 2 ステップで安全に適用`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">15.2</span>Terraform の基本構造</div>
                <pre className="codeblock">{`# main.tf - リソースの定義
resource "google_compute_instance" "web_server" {
  name         = "web-server-prod"
  machine_type = "n2-standard-4"
  zone         = "asia-northeast1-a"

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
      size  = 50
    }
  }

  network_interface {
    network    = "my-vpc"
    subnetwork = "web-subnet"
    # access_config なし = 外部IP なし（推奨）
  }

  metadata = {
    enable-oslogin = "TRUE"
  }

  tags = ["web-server"]
}

# variables.tf - 変数の定義
variable "project_id" {
  description = "Google Cloud プロジェクト ID"
  type        = string
}

variable "region" {
  description = "デプロイするリージョン"
  type        = string
  default     = "asia-northeast1"
}

# outputs.tf - 出力値の定義
output "instance_internal_ip" {
  description = "VM の内部 IP"
  value       = google_compute_instance.web_server.network_interface[0].network_ip
}`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">15.3</span>State ファイルの管理（最重要）</div>
                <p className="tcard-desc">Terraform は「terraform.tfstate」というファイルで「コードと実際のGCPリソースの対応関係」を管理します。</p>
                <pre className="codeblock">{`terraform.tfstate の中身（例）:
{
  "resources": [
    {
      "type": "google_compute_instance",
      "name": "web_server",
      "instances": [
        {
          "attributes": {
            "id": "projects/my-proj/zones/asia-northeast1-a/instances/web-server-prod",
            "machine_type": "n2-standard-4",
            ...
          }
        }
      ]
    }
  ]
}

もしこのファイルが壊れると:
  Terraform がリソースを「存在しない」と思い込み
  → 既存リソースを削除して再作成しようとする！
  → 本番環境への大規模障害！`}</pre>
                <div className="wb">
                    <div className="wbt">絶対禁止</div>
                    <p><code>terraform.tfstate</code> を手動で編集してはいけません！</p>
                </div>

                <p className="stitle">ローカル State の問題点</p>
                <pre className="codeblock">{`【ローカル State の問題】

開発者 A が terraform apply
  → ローカルの tfstate が更新

開発者 B が同時に terraform apply（古い tfstate を持っている）
  → State の競合！
  → リソースが重複作成 or 意図しない削除！

→ チーム開発でのローカル State は使用禁止`}</pre>

                <p className="stitle">リモートバックエンドの設定（Cloud Storage）</p>
                <pre className="codeblock">{`# backend.tf
terraform {
  backend "gcs" {
    bucket  = "my-terraform-state-bucket"
    prefix  = "terraform/state"
  }
}`}</pre>

                <pre className="codeblock">{`# State 用の Cloud Storage バケットを作成
gcloud storage buckets create gs://my-terraform-state-bucket \\
  --location=asia-northeast1 \\
  --uniform-bucket-level-access

# バージョニングを有効化（State の変更履歴を保存）
gcloud storage buckets update gs://my-terraform-state-bucket \\
  --versioning

# State ロックは GCS バックエンドで自動的に有効化される
# → 並行 apply を自動防止！`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">15.4</span>Terraform の安全なデプロイフロー</div>
                <pre className="codeblock">{`【標準的なデプロイフロー】

Step 1: コードを変更してコミット
  ↓
Step 2: terraform plan でプレビュー
  $ terraform plan -out=tfplan

  出力例:
  Plan: 1 to add, 2 to change, 0 to destroy.

  + google_compute_instance.new_vm       ← 追加される
  ~ google_compute_instance.web_server   ← 変更される

  → 変更内容を確認してレビュー

Step 3: プランファイルを使って適用
  $ terraform apply tfplan

  → plan 時と同じ内容のみ適用（サプライズなし！）

【重要】プランファイルの注意点:
  プランファイルは実行環境（パスなど）に依存するため
  環境間を移動して使うことはできない`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">15.5</span>既存リソースの Import</div>

                <p className="stitle">従来の方法（Terraform {`<`} 1.5）</p>
                <pre className="codeblock">{`# Console で手動作成した VM を Terraform 管理下に置く
terraform import google_compute_instance.my_vm \\
  projects/PROJECT/zones/asia-northeast1-a/instances/my-vm`}</pre>

                <p className="stitle">モダンな方法（Terraform {`>=`} 1.5 推奨）</p>
                <pre className="codeblock">{`# main.tf に import ブロックを追加
import {
  to = google_compute_instance.my_vm
  id = "projects/PROJECT/zones/asia-northeast1-a/instances/my-vm"
}

resource "google_compute_instance" "my_vm" {
  name         = "my-vm"
  # ... リソースの設定
}`}</pre>

                <pre className="codeblock">{`# import を含む plan を実行
terraform plan  # import ブロックを検出して取り込み計画を表示

# 問題なければ apply
terraform apply`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">15.6</span>CI/CD パイプラインとの統合（GitOps）</div>
                <pre className="codeblock">{`リポジトリ構造:

my-infra/
├── environments/
│   ├── dev/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── terraform.tfvars
│   │
│   └── prod/
│       ├── main.tf
│       ├── variables.tf
│       └── terraform.tfvars
│
└── modules/
    ├── vpc/
    ├── gke/
    └── cloud-sql/

【ブランチ戦略】
  feature/xxx → dev ブランチへの PR
                  ↓ マージ
              dev ブランチ → dev 環境に自動 apply
                  ↓ 承認
              main ブランチへの PR → レビュー
                  ↓ マージ
              main ブランチ → prod 環境に自動 apply`}</pre>

                <p className="stitle">Cloud Build による CI/CD</p>
                <pre className="codeblock">{`# cloudbuild.yaml
steps:
  # Terraform の初期化
  - name: 'hashicorp/terraform:1.5'
    entrypoint: 'terraform'
    args: ['init', '-backend-config=bucket=my-state-bucket']
    dir: 'environments/\${_ENV}'

  # プランの実行
  - name: 'hashicorp/terraform:1.5'
    entrypoint: 'terraform'
    args: ['plan', '-out=tfplan']
    dir: 'environments/\${_ENV}'

  # 適用（main ブランチのみ）
  - name: 'hashicorp/terraform:1.5'
    entrypoint: 'terraform'
    args: ['apply', '-auto-approve', 'tfplan']
    dir: 'environments/\${_ENV}'

substitutions:
  _ENV: 'dev'

# Cloud Build のサービスアカウントで実行（JSON キー不要！）
serviceAccount: 'projects/PROJECT/serviceAccounts/terraform-sa@PROJECT.iam.gserviceaccount.com'`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">15.BP</span>ベストプラクティス: Terraform</div>
                <div className="bp">
                    <div className="bpt">ベストプラクティス</div>
                    <div className="ctable">
                        <div className="ctable-head">
                            <span className="cthead">#</span>
                            <span className="cthead">ベストプラクティス</span>
                            <span className="cthead">理由</span>
                        </div>
                        {[
                            ['1', 'State は Cloud Storage リモートバックエンドに保存', '競合・紛失防止'],
                            ['2', 'State バケットはバージョニングを有効化', '誤操作からの復元'],
                            ['3', 'terraform plan -out=tfplan を必ず実施', '意図しない変更の防止'],
                            ['4', 'State ファイルを手動編集禁止', '設定破損リスク'],
                            ['5', 'CI/CD 認証は Workload Identity/ADC を使用（JSON キー禁止）', 'キー漏洩防止'],
                            ['6', '環境ごとに別ディレクトリ・別 State バケットを使用', '誤った環境への適用防止'],
                            ['7', 'terraform import ブロックで既存リソースを管理下へ', 'コンソールで作ったリソースをIaC管理に移行'],
                        ].map(([num, bp, reason]) => (
                            <div className="ctable-row" key={num}>
                                <span className="ctval">{num}</span>
                                <span className="ctval">{bp}</span>
                                <span className="ctdef">{reason}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">10.ADV</span>AlloyDB アーキテクチャ深掘り: コンピュート/ストレージ分離（補足）</div>
                <pre className="codeblock">{`【AlloyDB の革新的アーキテクチャ】

従来の PostgreSQL:
  プライマリ DB が WAL（Write-Ahead Logging）を処理しながら
  ページをディスクに書き込む → I/O 負荷が高い
  「Torn Pages（不完全なページ書き込み）」問題のリスクあり

AlloyDB のコンピュート/ストレージ分離:
  WAL レコードのみをインテリジェントな分散ストレージ層
  （Log Processing Service: LPS）に送信

  LPS が担当:
  ├── WAL の解析・適用
  ├── ページの更新（コンピュート層に代わって）
  └── ネットワーク効率の最大化

  → プライマリ DB は I/O の重い作業から解放
  → Torn Pages 問題を根本から解決
  → リードレプリカを極めて低遅延でスケールアウト可能`}</pre>

                <pre className="codeblock">{`【Hyperdisk（次世代ブロックストレージ）との使い分け】

Persistent Disk（従来）:
  容量・スループット・IOPS が連動して決まる

Hyperdisk（新世代）:
  容量 と スループット/IOPS を完全に独立してプロビジョニング
  → データ分析: 大容量・高スループット を低コストで実現
  → 高I/O DB: 大容量 は不要だが高IOPSが必要、という場合に最適
  → 動的な変更が可能（再起動不要）

用途別推奨:
  ├── 一般的な VM ワークロード → Balanced Persistent Disk
  ├── 高I/O データベース → Hyperdisk Extreme
  ├── データ分析・高スループット → Hyperdisk Throughput
  └── キャッシュ・一時データ → Local SSD（VM停止でデータ消滅）`}</pre>
                <div className="src">参考: cloud.google.com/blog/products/databases/alloydb-for-postgresql-intelligent-scalable-storage</div>
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
                    <h2>VPC ネットワーク設計</h2>
                    <p>グローバルVPC・カスタムモードサブネット・タグベースFWルール — ネットワーク基盤の設計ガイド</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">11.1</span>Google Cloud VPC の特徴</div>
                <pre className="codeblock">{`【他のクラウドとの違い】

他社クラウド（一般的）:        Google Cloud VPC:
  リージョンごとに VPC          1つの VPC がグローバルに存在
  asia-northeast1 VPC
  us-central1 VPC        →     グローバル VPC
                                 ├── サブネット（東京）
                                 ├── サブネット（米国）
                                 └── サブネット（欧州）

→ マルチリージョン展開でもVPCを1つで管理できる！
→ リージョン間の通信はGoogle のプライベートネットワーク（高速・低コスト）`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">11.2</span>サブネット設計</div>
                <pre className="codeblock">{`【自動モード VPC】
  → サブネットが各リージョンに自動作成（10.128.0.0/9）
  → お試し・開発用途に便利
  → 本番環境には不推奨（IP 範囲が固定）

【カスタムモード VPC（本番環境推奨）】
  → 自分でサブネットとIPレンジを定義
  → 将来の VPC Peering で重複しないよう計画的に設計`}</pre>

                <p className="stitle">サブネットの IP 範囲設計例</p>
                <pre className="codeblock">{`【企業全体の IP 設計例】

10.0.0.0/8 を会社全体に割り当て

├── 10.1.0.0/16  → 東京リージョン（asia-northeast1）
│   ├── 10.1.1.0/24  → 東京 Web 層（asia-northeast1-a）
│   ├── 10.1.2.0/24  → 東京 App 層（asia-northeast1-b）
│   └── 10.1.3.0/24  → 東京 DB 層（asia-northeast1-c）
│
├── 10.2.0.0/16  → 大阪リージョン（asia-northeast2）
│   └── ...
│
└── 10.3.0.0/16  → オンプレミス（VPN/Interconnect で接続）`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">11.3</span>ファイアウォールルールの設計</div>
                <pre className="codeblock">{`ファイアウォールルールは VPC レベルで管理（ハードウェアでなくソフトウェア）

方向:
  ├── INGRESS（入ってくるトラフィック）
  └── EGRESS（出ていくトラフィック）

対象の指定方法:
  ├── ネットワークタグ（例: tag=web-server）← 推奨
  ├── サービスアカウント
  └── IP レンジ（例: 0.0.0.0/0 = すべて）

優先度（Priority）: 数値が小さいほど優先（0〜65534）
  デフォルト拒否ルール: Priority=65535（最低優先度）`}</pre>

                <p className="stitle">ベストプラクティス: タグベースのファイアウォール</p>
                <pre className="codeblock">{`# Web サーバータグを持つ VM に HTTP/HTTPS を許可
gcloud compute firewall-rules create allow-web \\
  --network=my-vpc \\
  --direction=INGRESS \\
  --priority=1000 \\
  --action=ALLOW \\
  --rules=tcp:80,tcp:443 \\
  --target-tags=web-server \\
  --source-ranges=0.0.0.0/0

# App サーバーはロードバランサからのみアクセスを許可
gcloud compute firewall-rules create allow-app-from-lb \\
  --network=my-vpc \\
  --direction=INGRESS \\
  --priority=1000 \\
  --action=ALLOW \\
  --rules=tcp:8080 \\
  --target-tags=app-server \\
  --source-tags=load-balancer`}</pre>
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
                    <h2>Shared VPC と VPC Peering</h2>
                    <p>ホストプロジェクト・サービスプロジェクト・推移的接続の制約 — マルチプロジェクトネットワーク設計</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">12.1</span>Shared VPC（共有 VPC）</div>
                <pre className="codeblock">{`【Shared VPC がない場合の問題】

各チームが独自の VPC を持つ:
  Project A（フロントエンドチーム）: 10.0.0.0/16
  Project B（バックエンドチーム）: 10.1.0.0/16
  Project C（DBチーム）: 10.2.0.0/16

  問題: 各チームが自分でネットワークを管理 → 設定のばらつき
       セキュリティポリシーの一貫性がない
       ネットワーク管理の責任が分散

【Shared VPC による解決】

ホストプロジェクト（ネットワーク管理チームが所有）
  └── VPC（統一されたサブネット・ファイアウォール）

サービスプロジェクト A（フロントエンドチーム）
  └── アプリ → ホストプロジェクトの VPC のサブネットを利用

サービスプロジェクト B（バックエンドチーム）
  └── アプリ → ホストプロジェクトの VPC のサブネットを利用

メリット:
  ✓ ネットワーク設定を一元管理（セキュリティポリシーの統一）
  ✓ ネットワーク管理とアプリ開発の職務分掌
  ✓ 各チームのコストは独立したプロジェクトで管理`}</pre>

                <p className="stitle">Shared VPC の設定</p>
                <pre className="codeblock">{`# ホストプロジェクトを指定
gcloud compute shared-vpc enable HOST_PROJECT_ID

# サービスプロジェクトをホストに紐付け
gcloud compute shared-vpc associated-projects add SERVICE_PROJECT_ID \\
  --host-project=HOST_PROJECT_ID

# Network User ロールをサービスプロジェクトのチームに付与
# （サブネットの使用権限のみ、VPC の設定変更は不可）
gcloud projects add-iam-policy-binding HOST_PROJECT_ID \\
  --member="group:backend-team@example.com" \\
  --role="roles/compute.networkUser" \\
  --condition="resource.name == projects/HOST_PROJECT_ID/regions/asia-northeast1/subnetworks/backend-subnet"`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">12.2</span>VPC Network Peering</div>
                <pre className="codeblock">{`VPC A（Project 1）  ← Peering →  VPC B（Project 2）

・内部 IP でプライベートに通信
・Google のプライベートネットワークを使用（高速）
・インターネットを経由しない
・トラフィックが GCP を出ない

使用場面:
  ├── 異なるプロジェクト間の内部通信
  └── 異なる組織の VPC 間の接続`}</pre>

                <p className="stitle">⚠️ VPC Peering の重要な制約</p>
                <pre className="codeblock">{`【制約 1: 推移的（Transitive）ではない】

VPC A ── Peering ── VPC B ── Peering ── VPC C

A と B は通信できる ✅
B と C は通信できる ✅
A と C は通信できない ❌ ← これが最重要！

→ A と C を通信させるには、A-C 間の Peering を別途作成する必要あり

【制約 2: IP アドレスの重複不可】

VPC A: 10.0.0.0/16
VPC B: 10.0.0.0/16 ← 重複！Peering 不可！

→ Peering する VPC 間は IP 範囲が重複してはいけない
→ カスタムモード VPC でIP を計画的に設計することが重要`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">12.3</span>Shared VPC vs VPC Peering の使い分け</div>
                <div className="ctable">
                    <div className="ctable-head">
                        <span className="cthead">判断基準</span>
                        <span className="cthead">Shared VPC</span>
                        <span className="cthead">VPC Peering</span>
                    </div>
                    {[
                        ['管理の一元化', '✅（ホストプロジェクトで集中管理）', '❌（各VPCで個別管理）'],
                        ['同一組織内', '✅', '✅'],
                        ['異なる組織間', '❌', '✅'],
                        ['スケール', '多数のプロジェクトに対応', '1対1の接続'],
                        ['設定の複雑さ', '中程度', '低い'],
                    ].map(([criteria, shared, peering]) => (
                        <div className="ctable-row" key={criteria}>
                            <span className="ctval">{criteria}</span>
                            <span className="ctdef">{shared}</span>
                            <span className="ctdef">{peering}</span>
                        </div>
                    ))}
                </div>
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
                    <h2>Cloud NAT と Cloud DNS</h2>
                    <p>外部IP不要のアウトバウンド接続・ハイブリッドDNS解決 — セキュアなネットワーク出口設計</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">13.1</span>Cloud NAT</div>
                <pre className="codeblock">{`【なぜ Cloud NAT が必要か？】

セキュリティのベストプラクティス:
  VM に外部 IP を割り当てない
  → でも VM からインターネット（パッケージDL等）へのアクセスが必要

解決策: Cloud NAT

外部IP なし の VM
    ↓
Cloud NAT（送信元 IP を変換）
    ↓
インターネット（apt-get install, etc.）

VM の外部 IP = Cloud NAT の IP（共有）
→ 個々の VM の IP が外部に直接露出しない`}</pre>

                <p className="stitle">Cloud NAT の設定</p>
                <pre className="codeblock">{`# Cloud Router を作成（Cloud NAT の前提条件）
gcloud compute routers create my-router \\
  --network=my-vpc \\
  --region=asia-northeast1

# Cloud NAT を作成
gcloud compute routers nats create my-nat \\
  --router=my-router \\
  --region=asia-northeast1 \\
  --nat-all-subnet-ip-ranges \\
  --auto-allocate-nat-external-ips`}</pre>

                <p className="stitle">Cloud NAT のポート枯渇問題</p>
                <pre className="codeblock">{`【ポート枯渇とは？】

Cloud NAT は送信元 IP:ポート でセッションを識別
各 VM に割り当てられるポート数には上限がある

VM が同時接続数の上限を超えると:
  → 新しい接続が確立できない
  → "Connection refused" エラー

【監視コマンド（MQL クエリ）】
fetch nat_gateway
| metric 'compute.googleapis.com/nat/port_usage'
| align mean_aligner()
| every 1m

【対策】
  ├── ポート数を手動増加（--min-ports-per-vm）
  ├── 静的 NAT IP を追加
  └── コネクションプールの最適化（アプリ側）`}</pre>

                <div className="bp">
                    <div className="bpt">ベストプラクティス: Cloud NAT</div>
                    <ul>
                        <li><strong>すべての VM に外部 IP を割り当てない</strong>（Cloud NAT でアウトバウンドを確保）</li>
                        <li><strong>ポート使用率を Cloud Monitoring で継続監視</strong></li>
                        <li><strong>--min-ports-per-vm</strong> を接続数に応じて適切に設定</li>
                    </ul>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">13.2</span>Cloud DNS</div>

                <p className="stitle">ハイブリッド環境でのDNS解決</p>
                <pre className="codeblock">{`【シナリオ: オンプレミス + Google Cloud のハイブリッド構成】

問題: 2つの環境でのDNS名前解決を統合したい

Cloud DNS のプライベートゾーン:
  gcp.internal → GCPリソースの名前解決

オンプレミスの DNS サーバー:
  corp.internal → オンプレミスリソースの名前解決

【解決策】

① オンプレ → GCP のプライベートゾーンを解決:
  Cloud DNS にインバウンドフォワーダーを設定
  オンプレの DNS が 169.254.169.254 に転送

② GCP → オンプレのDNSを解決:
  Cloud DNS に転送ゾーン（Forwarding Zone）を設定
  gcp で corp.internal クエリ → オンプレ DNS サーバーに転送`}</pre>

                <pre className="codeblock">{`# 転送ゾーンを作成（GCP → オンプレの DNS を解決）
gcloud dns managed-zones create on-prem-forwarding \\
  --dns-name=corp.internal. \\
  --description="Forward to on-premises DNS" \\
  --visibility=private \\
  --networks=my-vpc \\
  --forwarding-targets=10.0.0.53

# インバウンドポリシーを作成（オンプレ → GCP を解決）
gcloud dns policies create inbound-policy \\
  --description="Inbound DNS forwarding" \\
  --networks=my-vpc \\
  --enable-inbound-forwarding`}</pre>
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
                    <h2>Cloud Storage（オブジェクトストレージ）</h2>
                    <p>4ストレージクラス・OLM・署名付きURL・データ保護 — 非構造化データ管理の完全ガイド</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">8.1</span>Cloud Storage とは？</div>
                <pre className="codeblock">{`【Cloud Storage の特徴】
  ├── 容量無制限（バケット単位で管理）
  ├── 高い耐久性（99.999999999% = イレブンナイン）
  ├── グローバルなアクセス
  ├── バケット ─ オブジェクト の 2 層構造
  └── HTTP/HTTPS でアクセス可能`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">8.2</span>4 つのストレージクラス</div>
                <pre className="codeblock">{`アクセス頻度
  高い ←──────────────────────────────────→ 低い

Standard → Nearline → Coldline → Archive
 ↑費用/GB    ↑費用/GB   ↑費用/GB   ↑費用/GB
  高め        中         低め        最安値
            ↑取り出し料金
   無料      有料(安)    有料(中)    有料(高)`}</pre>

                <div className="ctable">
                    <div className="ctable-head">
                        <span className="cthead">クラス</span>
                        <span className="cthead">GB 単価</span>
                        <span className="cthead">取り出し料金</span>
                        <span className="cthead">最小保存期間</span>
                        <span className="cthead">アクセス頻度の目安</span>
                    </div>
                    {[
                        ['Standard', '$0.020/GB', '無料', 'なし', '頻繁（日次以上）'],
                        ['Nearline', '$0.010/GB', '$0.01/GB', '30日', '月1回程度'],
                        ['Coldline', '$0.004/GB', '$0.02/GB', '90日', '四半期1回程度'],
                        ['Archive', '$0.0012/GB', '$0.05/GB', '365日', '年1回以下'],
                    ].map(([cls, price, retrieve, minPeriod, freq]) => (
                        <div className="ctable-row" key={cls}>
                            <span className="ctval">{cls}</span>
                            <span className="ctdef">{price}</span>
                            <span className="ctdef">{retrieve}</span>
                            <span className="ctdef">{minPeriod}</span>
                            <span className="ctdef">{freq}</span>
                        </div>
                    ))}
                </div>
                <div className="wb">
                    <div className="wbt">試験頻出</div>
                    <p>最小保存期間より前に削除しても、最小保存期間分の料金が発生します！</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">8.3</span>バケットの作成とロケーション設定</div>
                <pre className="codeblock">{`【Single Region（単一リージョン）】
  例: asia-northeast1（東京）
  → 最もコストが低い
  → リージョン障害でデータにアクセス不可
  → 同一リージョン内でのデータ転送が最速

【Dual Region（デュアルリージョン）】
  例: asia1（東京 + 大阪）
  → 2リージョン間で自動レプリケーション
  → 地理的冗長性あり
  → コストは Multi-Region と同程度

【Multi Region（マルチリージョン）】
  例: asia（アジア全体）、us（米国全体）、eu（EU）
  → 最高の可用性と地理分散
  → コストは最も高い
  → グローバルなコンテンツ配信に最適`}</pre>

                <pre className="codeblock">{`# バケットの作成
gcloud storage buckets create gs://my-app-bucket \\
  --location=asia-northeast1 \\
  --storage-class=STANDARD \\
  --uniform-bucket-level-access`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">8.4</span>オブジェクトライフサイクル管理（OLM）</div>
                <pre className="codeblock">{`オブジェクト作成（Standard）
    │
    ├── 30日後 → Nearline に自動移行
    │
    ├── 90日後 → Coldline に自動移行
    │
    ├── 365日後 → Archive に自動移行
    │
    └── 730日後 → 自動削除

→ このルールを設定するだけでコスト最適化が自動化！`}</pre>

                <pre className="codeblock">{`{
  "lifecycle": {
    "rule": [
      {
        "action": {"type": "SetStorageClass", "storageClass": "NEARLINE"},
        "condition": {"age": 30}
      },
      {
        "action": {"type": "SetStorageClass", "storageClass": "COLDLINE"},
        "condition": {"age": 90}
      },
      {
        "action": {"type": "SetStorageClass", "storageClass": "ARCHIVE"},
        "condition": {"age": 365}
      },
      {
        "action": {"type": "Delete"},
        "condition": {"age": 730}
      }
    ]
  }
}`}</pre>

                <pre className="codeblock">{`# OLM ポリシーをバケットに適用
gcloud storage buckets update gs://my-bucket \\
  --lifecycle-file=lifecycle.json`}</pre>

                <div className="ctable">
                    <div className="ctable-head">
                        <span className="cthead">条件名</span>
                        <span className="cthead">説明</span>
                        <span className="cthead">例</span>
                    </div>
                    {[
                        ['age', 'オブジェクトの作成からの日数', '30'],
                        ['numNewerVersions', 'より新しいバージョンの数', '3（3つ以上の新バージョンがあれば）'],
                        ['isLive', '最新バージョンかどうか', 'false（非最新のみ対象）'],
                        ['matchesStorageClass', '特定ストレージクラスのみ対象', '["STANDARD"]'],
                        ['createdBefore', '特定日付より前に作成', '2024-01-01'],
                    ].map(([cond, desc, ex]) => (
                        <div className="ctable-row" key={cond}>
                            <span className="ctval">{cond}</span>
                            <span className="ctdef">{desc}</span>
                            <span className="ctdef">{ex}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">8.5</span>バケットセキュリティのベストプラクティス</div>
                <pre className="codeblock">{`【バケット名のルール】
  ├── グローバルに一意（全世界で重複不可）
  ├── 3〜63文字
  ├── 小文字・数字・ハイフン・アンダースコアのみ
  ├── 「goog」で始まる名前は予約済みで使用不可
  ├── 「google」のスペルミス（googel など）も使用不可
  └── バケット名は URL に含まれる！

【バケット名の設計原則】
  ❌ 悪い例: my-company-production-database-backups-tokyo
    → 会社名・環境・内容が丸わかり

  ✅ 良い例: bkt-a7f2k9-prod-bak
    → 意味を推測しにくいランダムなサフィックス付き
    → 個人情報・機密情報を一切含まない`}</pre>

                <pre className="codeblock">{`【アクセス制御の 2 つのモデル】

【1. ACL（Access Control List）】  ← 旧モデル・非推奨
  オブジェクトごとに個別のアクセス制御が可能
  管理が複雑になりがち

【2. 統一バケットレベルアクセス（Uniform Bucket-Level Access）】 ← 推奨
  バケット全体に IAM ポリシーを適用
  オブジェクト個別の ACL は無効化
  管理がシンプル・一貫性あり`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">8.6</span>署名付き URL（Signed URLs）</div>
                <p className="tcard-desc">Google アカウントを持たないユーザーに一時的なアクセスを付与する仕組みです。</p>
                <pre className="codeblock">{`【ユースケース】
  ├── 外部パートナーへのデータ共有
  ├── 顧客へのダウンロードリンク提供
  └── 一時的なアップロード用 URL の生成

【署名付き URL の構造】
  https://storage.googleapis.com/BUCKET/OBJECT
    ?X-Goog-Algorithm=GOOG4-RSA-SHA256
    &X-Goog-Credential=...
    &X-Goog-Date=20240101T000000Z
    &X-Goog-Expires=3600         ← 有効期間（秒）
    &X-Goog-Signature=...`}</pre>

                <pre className="codeblock">{`# 1時間有効な署名付き URL を生成
gcloud storage sign-url gs://my-bucket/my-file.pdf \\
  --duration=1h \\
  --service-account=my-sa@PROJECT.iam.gserviceaccount.com

# 最大有効期間は 7日間（604800秒）`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">8.7</span>データ保護機能</div>

                <p className="stitle">論理削除（Soft Delete）</p>
                <pre className="codeblock">{`デフォルト設定: 有効（7日間保持）

オブジェクト削除 → 7日間はリカバリ可能
              → 8日目以降は完全削除（コストも発生）

保持期間のカスタマイズ（0〜90日）:
  gcloud storage buckets update gs://my-bucket \\
    --soft-delete-duration=30d`}</pre>

                <div className="wb">
                    <div className="wbt">バケット再作成の仕様</div>
                    <p>バケットを削除後 10 分以内に同名バケットを作成しようとすると 404 エラーが発生します。</p>
                </div>

                <p className="stitle">バケットロック（Bucket Lock）と保持ポリシー</p>
                <pre className="codeblock">{`【用途】コンプライアンス・法規制対応

保持ポリシー:
  バケット内のすべてのオブジェクトを
  指定期間（例: 7年間）削除・上書き不可にする

バケットロック:
  保持ポリシー自体を変更・削除不可にする
  （取り消しができない操作！）

gcloud storage buckets update gs://my-compliance-bucket \\
  --retention-period=7y  # 7年間保持

gcloud storage buckets lock gs://my-compliance-bucket  # ロック（不可逆！）`}</pre>

                <p className="stitle">オブジェクトバージョニング</p>
                <pre className="codeblock">{`# バージョニングを有効化
gcloud storage buckets update gs://my-bucket --versioning

# 非最新バージョンを確認
gcloud storage objects list gs://my-bucket --all-versions

# 特定バージョンを復元
gsutil cp gs://my-bucket/file.txt#1234567890 gs://my-bucket/file.txt`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">8.BP</span>ベストプラクティス: Cloud Storage</div>
                <div className="bp">
                    <div className="bpt">ベストプラクティス</div>
                    <div className="ctable">
                        <div className="ctable-head">
                            <span className="cthead">#</span>
                            <span className="cthead">ベストプラクティス</span>
                            <span className="cthead">理由</span>
                        </div>
                        {[
                            ['1', '統一バケットレベルアクセスを有効化', 'IAMで一元管理・ACLの複雑さを排除'],
                            ['2', 'OLM を必ず設定してストレージクラスを自動移行', 'コスト最適化の自動化'],
                            ['3', 'バケット名に機密情報を含めない', 'バケット名は URL に公開される'],
                            ['4', 'バージョニングを有効化し、非最新版には OLM を設定', '誤削除対策・コスト管理'],
                            ['5', 'Soft Delete は用途に応じて保持期間を設定', 'デフォルト7日では短すぎる場合も'],
                            ['6', 'パブリックアクセスを原則禁止', '意図しないデータ公開を防止'],
                        ].map(([num, bp, reason]) => (
                            <div className="ctable-row" key={num}>
                                <span className="ctval">{num}</span>
                                <span className="ctval">{bp}</span>
                                <span className="ctdef">{reason}</span>
                            </div>
                        ))}
                    </div>
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
                    <h2>ブロックストレージとファイルストレージ</h2>
                    <p>Persistent Disk・リージョナルPD・Filestore — VM ストレージの完全ガイド</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">9.1</span>Persistent Disk（永続ディスク）</div>
                <p className="tcard-desc">VM に接続するブロックストレージです。</p>
                <pre className="codeblock">{`Persistent Disk の特徴:
  ├── VM とは独立して存在（VM を削除してもディスクは残る設定可能）
  ├── 複数のVMから読み取り専用で共有可能（マルチリーダー）
  ├── 1つのVMへの読み書きと1つのVMへの共有（マルチライター）※Extreme除く
  └── ゾーンPD と リージョンPD の2種類

【ゾーン PD】
  1つのゾーン内に存在
  → そのゾーン障害でアクセス不可

【リージョン PD（高可用性）】
  2つのゾーンに同期レプリケーション
  → 1ゾーン障害でも他ゾーンでアクセス継続
  → 約2倍のコスト`}</pre>

                <pre className="codeblock">{`# リージョン Persistent Disk の作成（高可用性）
gcloud compute disks create my-regional-disk \\
  --type=pd-balanced \\
  --size=100GB \\
  --region=asia-northeast1 \\
  --replica-zones=asia-northeast1-a,asia-northeast1-b`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">9.2</span>Filestore（マネージドNFSファイルシステム）</div>
                <p className="tcard-desc">複数の VM から同時にアクセスできるNFSファイルシステムです。</p>
                <pre className="codeblock">{`【Filestore の用途】
  ├── 複数の VM でファイルを共有（共有ホームディレクトリなど）
  ├── レガシーアプリの NFS 依存を維持したまま移行
  └── CMS（WordPress など）の共有ストレージ

【Filestore 階層】
  Basic HDD → Basic SSD → High Scale SSD → Enterprise
  （コスト低←──────────────────────────→パフォーマンス高）`}</pre>
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
                    <h2>データベースサービス完全選定ガイド</h2>
                    <p>Cloud SQL / Spanner / AlloyDB / Firestore / Bigtable / Memorystore / BigQuery — 最適なDBを選ぶフレームワーク</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">10.1</span>データベース選定のフローチャート</div>
                <pre className="codeblock">{`どんなデータを扱う？
│
├── 構造化データ（スキーマが決まっている）
│   │
│   └── SQL が必要？
│       ├── YES → どんな規模・要件？
│       │         ├── 標準的なWebアプリ → Cloud SQL
│       │         ├── グローバル分散・99.999% → Cloud Spanner
│       │         └── PostgreSQL 高性能（4倍）→ AlloyDB
│       │
│       └── NO（NoSQL）→ どんな特性が必要？
│           ├── リアルタイム同期・モバイル → Firestore
│           ├── 超大規模・低レイテンシ・時系列 → Cloud Bigtable
│           └── マイクロ秒・キャッシュ → Memorystore
│
├── 分析・DWH → BigQuery
│
└── Oracle を移行したい → Bare Metal Solution`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">10.2</span>Cloud SQL</div>
                <p className="tcard-desc">MySQL、PostgreSQL、SQL Server のフルマネージドサービスです。</p>
                <pre className="codeblock">{`【Cloud SQL が管理してくれるもの】
  ├── OS パッチ適用
  ├── データベースマイナーバージョンアップ
  ├── 自動バックアップ（日次）
  ├── フェイルオーバーレプリカ（HA構成）
  └── SSL/TLS 暗号化`}</pre>

                <p className="stitle">アーキテクチャパターン</p>
                <pre className="codeblock">{`【シングルインスタンス（開発環境）】
  プライマリ DB ←── 読み書き
  コスト: 安い、可用性: 低い

【高可用性（HA）構成（本番環境）】
  プライマリ DB（ゾーンA）
       ↓ 同期レプリケーション
  スタンバイ DB（ゾーンB）

  プライマリ障害 → 自動フェイルオーバー（数十秒）
  コスト: 2倍程度

【リードレプリカ（読み取りスケール）】
  プライマリ DB（書き込み）
       ↓ 非同期レプリケーション
  リードレプリカ 1（読み取り）
  リードレプリカ 2（読み取り）

  読み取り負荷を複数レプリカに分散`}</pre>

                <p className="stitle">Cloud SQL への安全な接続</p>
                <pre className="codeblock">{`【3つの接続方法】

方法1: Cloud SQL Auth Proxy（推奨）
  アプリ → Cloud SQL Auth Proxy（ローカル）→ Cloud SQL
  → SSL/TLS を自動処理、IAM で認証
  → DB のパスワードが不要

  使用例:
  # Auth Proxy を起動
  ./cloud-sql-proxy PROJECT:REGION:INSTANCE_NAME

方法2: プライベート IP（VPC 内から）
  VPC 内のアプリ → プライベート IP → Cloud SQL
  → インターネットを経由しない最も安全な方法
  → Private Service Connect を使用

方法3: 公開 IP（外部から）
  外部アプリ → Cloud SQL（公開 IP）
  → 許可された IP アドレスのみアクセス可能（許可リスト）
  → 原則避けるべき`}</pre>

                <pre className="codeblock">{`# Cloud SQL インスタンス作成（HA 構成）
gcloud sql instances create my-postgres \\
  --database-version=POSTGRES_15 \\
  --tier=db-n1-standard-4 \\
  --region=asia-northeast1 \\
  --availability-type=REGIONAL \\
  --backup-start-time=03:00 \\
  --no-assign-ip \\
  --network=my-vpc`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">10.3</span>Cloud Spanner</div>
                <pre className="codeblock">{`Cloud Spanner = リレーショナル × グローバル分散 × 水平スケール

【何が特別か】
  通常の DB: スケールアップ（大きなマシンに変える）で対応
  Cloud Spanner: ノードを追加するだけで水平スケール
                 SQL/ACIDトランザクションを維持したまま！

【SLA: 99.999%（ファイブナイン）】
  年間ダウンタイム: 約 5.26 分
  他の DB は通常 99.9%（年間 8.76 時間）

【ユースケース】
  ├── グローバルな金融システム（証券、決済）
  ├── 大規模インベントリ管理
  └── グローバルゲームのリーダーボード・状態管理`}</pre>

                <div className="ctable">
                    <div className="ctable-head">
                        <span className="cthead">判断基準</span>
                        <span className="cthead">Cloud SQL</span>
                        <span className="cthead">Cloud Spanner</span>
                    </div>
                    {[
                        ['規模', '中規模まで', '大規模・超大規模'],
                        ['グローバル分散', '❌（リードレプリカは可能）', '✅'],
                        ['水平スケール', '❌', '✅'],
                        ['SQL 対応', '✅', '✅（方言あり）'],
                        ['費用', '安い', '高い（ノード=$0.9/時間〜）'],
                        ['移行コスト', '低い', '高い（スキーマ変更が必要）'],
                    ].map(([criteria, sql, spanner]) => (
                        <div className="ctable-row" key={criteria}>
                            <span className="ctval">{criteria}</span>
                            <span className="ctdef">{sql}</span>
                            <span className="ctdef">{spanner}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">10.4</span>AlloyDB</div>
                <pre className="codeblock">{`AlloyDB = PostgreSQL 完全互換 + Google AI 最適化

【性能】
  標準 PostgreSQL の 4倍のトランザクション性能
  分析クエリは 100倍速い（列指向ストレージを内部使用）

【Cloud SQL PostgreSQL vs AlloyDB の使い分け】
  Cloud SQL PostgreSQL:
    → 標準的な Web アプリ・既存 PG アプリの移行
    → 中規模まで

  AlloyDB:
    → OLTP と分析（HTAP）を同一 DB で処理したい
    → 高性能が必要・AI/ML との統合が必要
    → pgvector を使ったベクトル検索（AI 機能）`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">10.5</span>Firestore</div>
                <pre className="codeblock">{`【Firestore の特徴】

ドキュメント指向 NoSQL:
  データ構造: コレクション → ドキュメント → フィールド

  users（コレクション）
    └── alice（ドキュメント）
         ├── name: "Alice"
         ├── age: 30
         └── orders（サブコレクション）
               └── order-001
                    ├── item: "laptop"
                    └── price: 150000

リアルタイム同期:
  データが変更されると全クライアントに即時反映
  → モバイルアプリ・チャット・コラボツールに最適

サーバーレス:
  キャパシティプランニング不要・自動的にスケール`}</pre>

                <div className="ctable">
                    <div className="ctable-head">
                        <span className="cthead">判断基準</span>
                        <span className="cthead">Firestore</span>
                        <span className="cthead">Cloud Bigtable</span>
                    </div>
                    {[
                        ['データ規模', 'GB〜TB', 'TB〜PB'],
                        ['アクセス', 'ドキュメント単位', '行/列単位'],
                        ['クエリ', '豊富（複合クエリ可）', 'キーのみ（フィルタは限定的）'],
                        ['リアルタイム同期', '✅', '❌'],
                        ['レイテンシ', 'ミリ秒', 'ミリ秒未満'],
                        ['ユースケース', 'モバイル・Web バックエンド', 'IoT・時系列・ML データ'],
                    ].map(([criteria, fs, bt]) => (
                        <div className="ctable-row" key={criteria}>
                            <span className="ctval">{criteria}</span>
                            <span className="ctdef">{fs}</span>
                            <span className="ctdef">{bt}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">10.6</span>Cloud Bigtable</div>
                <pre className="codeblock">{`【Cloud Bigtable の特徴】

ワイドカラム型 NoSQL:
  数十億行 × 数百万列 のデータを処理
  ミリ秒未満のレイテンシを維持

  行キー（Row Key）でアクセス最適化:
  例: "sensor_001#2024010112000000"（センサーID + タイムスタンプ）
     → 時系列データの範囲スキャンが超高速

HBase 互換:
  Hadoop エコシステムとの統合が容易

【ユースケース】
  ├── IoT センサーデータ（秒間数百万レコード）
  ├── 広告配信ログ
  ├── 金融の取引履歴
  └── ML フィーチャーストア`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">10.7</span>Memorystore</div>
                <pre className="codeblock">{`【Memorystore の特徴】

Redis / Memcached のフルマネージドサービス
  → 自分で Redis を EC2 や GCE に立てる必要なし

マイクロ秒レベルのレスポンス:
  通常の DB（ミリ秒）の 1/1000 の速さ

【用途】
  ├── セッション管理（ユーザーのログイン状態）
  ├── キャッシュ（頻繁にアクセスされるDBクエリ結果）
  ├── リーダーボード（ゲームのランキング）
  ├── レート制限（API の呼び出し回数制限）
  └── Pub/Sub パターン（Redis の Pub/Sub 機能）

【Memcached vs Redis の選択】
  Memcached: シンプルなキャッシュ・マルチスレッド
  Redis: データ永続化・複雑なデータ構造（Set, SortedSet など）
         → ほとんどのケースで Redis を推奨`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">10.8</span>BigQuery</div>
                <pre className="codeblock">{`【BigQuery の特徴】

サーバーレス・フルマネージドのデータウェアハウス
  → インフラ管理不要
  → 数秒で数TB のデータを分析

ストレージとコンピューティングの分離:
  ストレージ: 安価（$0.02/GB/月）
  クエリ: 処理したデータ量に課金（$5/TB）
  → 必要な時だけクエリを実行（コスト効率高い）

SQL で機械学習（BigQuery ML）:
  CREATE MODEL でモデルをトレーニング
  → データサイエンティストが Python 不要で ML を実施

【ACE 試験での BigQuery の位置づけ】
  ├── Cloud Billing データのエクスポート先（監査・分析）
  ├── Cloud Logging のエクスポート先（長期ログ分析）
  └── データウェアハウス・BI の基盤`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">10.BP</span>ベストプラクティス: データベース選定</div>
                <div className="bp">
                    <div className="bpt">ベストプラクティス</div>
                    <div className="ctable">
                        <div className="ctable-head">
                            <span className="cthead">ユースケース</span>
                            <span className="cthead">推奨サービス</span>
                            <span className="cthead">理由</span>
                        </div>
                        {[
                            ['WordPress・EC サイト', 'Cloud SQL (MySQL/PG)', '標準的な RDBMS で移行コスト低'],
                            ['グローバル金融システム', 'Cloud Spanner', '99.999% SLA・グローバル強整合性'],
                            ['PostgreSQL で高性能が必要', 'AlloyDB', 'PG 互換のまま4倍の性能'],
                            ['モバイルアプリのバックエンド', 'Firestore', 'リアルタイム同期・サーバーレス'],
                            ['IoT・時系列データ', 'Cloud Bigtable', 'ペタバイトスケール・ミリ秒レイテンシ'],
                            ['セッション・キャッシュ', 'Memorystore (Redis)', 'マイクロ秒レスポンス'],
                            ['コスト分析・BI', 'BigQuery', 'サーバーレスDWH・SQL分析'],
                            ['Oracle の移行', 'Bare Metal Solution', 'Oracle ライセンス・低レイテンシHW'],
                        ].map(([usecase, svc, reason]) => (
                            <div className="ctable-row" key={usecase}>
                                <span className="ctval">{usecase}</span>
                                <span className="ctval">{svc}</span>
                                <span className="ctdef">{reason}</span>
                            </div>
                        ))}
                    </div>
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
                    <h2>Google Kubernetes Engine (GKE)</h2>
                    <p>Autopilot vs Standard・Workload Identity・Binary Authorization・オートスケーリングの完全ガイド</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">5.1</span>Kubernetes の基本概念</div>
                <pre className="codeblock">{`【Kubernetes の主要オブジェクト】

Pod（ポッド）
  └── 1つ以上のコンテナをまとめた最小デプロイ単位
      例: nginx コンテナ + ログ収集サイドカー

Deployment（デプロイメント）
  └── Pod の望ましい状態を定義・管理
      例: 「このアプリを3つのレプリカで動かす」

Service（サービス）
  └── Pod へのネットワークアクセスを提供
      例: 「このラベルを持つPodに負荷分散する」

Node（ノード）
  └── Pod が実際に動く仮想マシン（VM）
      GKE では Compute Engine VM が Node になる

Namespace（ネームスペース）
  └── クラスタを論理的に分割する仮想境界
      例: namespace: frontend, backend, monitoring`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">5.2</span>GKE の 2 つのモード: Autopilot vs Standard</div>

                <p className="stitle">モード選択のフローチャート</p>
                <pre className="codeblock">{`特権コンテナが必要？ → YES → Standard モード
カーネルパラメータの変更が必要？ → YES → Standard モード
DaemonSet でのエージェント配置が必要？ → YES → Standard モード
既存のノード管理チームがある？ → YES → Standard モード
                    ↓
              それ以外の場合
                    ↓
          Autopilot モード（推奨）`}</pre>

                <p className="stitle">🚀 GKE Autopilot モード</p>
                <pre className="codeblock">{`【Autopilot でGoogle が自動管理するもの】

インフラ管理:
  ├── ノードのプロビジョニング（VM の作成）
  ├── ノードのスケーリング（増減）
  ├── ノードのアップグレード（Kubernetes バージョン更新）
  └── ノードの修復（障害ノードの自動交換）

セキュリティ:
  ├── Kubernetes Baseline セキュリティ標準の強制適用
  ├── 特権コンテナのブロック
  ├── ホスト名前空間へのアクセス制限
  └── Workload Identity の自動有効化

【Autopilot の課金モデル】
  ❌ ノード（VM）単位の課金 ではなく
  ✅ Pod が要求する vCPU / メモリ / エフェメラルストレージ の課金

  例: Pod が requests: cpu=0.5, memory=1Gi を設定
    → その Pod が動いている時間だけ課金
    → アイドルノードへの課金なし！`}</pre>

                <div className="ctable">
                    <div className="ctable-head">
                        <span className="cthead">制約（Autopilot）</span>
                        <span className="cthead">説明</span>
                    </div>
                    {[
                        ['特権コンテナ', '❌ 実行不可'],
                        ['HostPath ボリューム', '❌ 使用不可'],
                        ['NodeSelector（特定ノードへの配置）', '限定的'],
                        ['DaemonSet', '❌ 基本的に不可'],
                        ['カーネルパラメータ変更', '❌ 不可'],
                    ].map(([constraint, desc]) => (
                        <div className="ctable-row" key={constraint}>
                            <span className="ctval">{constraint}</span>
                            <span className="ctdef">{desc}</span>
                        </div>
                    ))}
                </div>

                <p className="stitle">⚙️ GKE Standard モード</p>
                <pre className="codeblock">{`【Standard でユーザーが管理するもの】

・ノードプールの作成・削除
・マシンタイプの選択
・ノードのアップグレード（手動またはスケジュール設定）
・ノード上の DaemonSet の管理

【Standard が必要な場面】
  ├── 特権コンテナの実行（一部のセキュリティツールなど）
  ├── カーネルパラメータ（sysctl）の変更
  ├── GPU / TPU ノードプールの設定
  ├── カスタムロギング/監視エージェント（DaemonSet）
  └── Bare Metal/特殊ハードウェアの要件`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">5.3</span>GKE クラスタの作成</div>

                <p className="stitle">Autopilot クラスタの作成</p>
                <pre className="codeblock">{`# Autopilot クラスタを作成（推奨設定）
gcloud container clusters create-auto my-autopilot-cluster \\
  --region=asia-northeast1 \\
  --network=my-vpc \\
  --subnetwork=my-subnet \\
  --enable-private-nodes \\
  --master-ipv4-cidr=172.16.0.0/28

# クラスタへの認証情報を取得（kubectl で操作できるようにする）
gcloud container clusters get-credentials my-autopilot-cluster \\
  --region=asia-northeast1`}</pre>

                <p className="stitle">Standard クラスタの作成</p>
                <pre className="codeblock">{`# Standard クラスタを作成
gcloud container clusters create my-standard-cluster \\
  --machine-type=n2-standard-4 \\
  --num-nodes=3 \\
  --region=asia-northeast1 \\
  --node-locations=asia-northeast1-a,asia-northeast1-b,asia-northeast1-c \\
  --enable-autoscaling \\
  --min-nodes=1 \\
  --max-nodes=10 \\
  --workload-pool=PROJECT_ID.svc.id.goog \\
  --enable-private-nodes \\
  --master-ipv4-cidr=172.16.0.0/28`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">5.4</span>GKE のセキュリティ設計</div>

                <p className="stitle">Workload Identity Federation（最重要）</p>
                <pre className="codeblock">{`【❌ 危険なアンチパターン】
サービスアカウントの JSON キーを
Kubernetes Secret に保存して Pod から参照
    ↓
キーが漏洩するリスク / キーの定期ローテーションの手間

【✅ 正しい方法: Workload Identity】

Kubernetes Service Account (KSA)
    ↓ bind（紐付け）
Google Cloud IAM Service Account (GSA)
    ↓
Pod は KSA を使って Google Cloud API に直接アクセス
（JSON キー不要！）`}</pre>

                <pre className="codeblock">{`# 1. Google Cloud IAM サービスアカウントを作成
gcloud iam service-accounts create my-app-sa \\
  --display-name="My Application SA"

# 2. 必要な IAM ロールを付与（例: Cloud Storage の読み取り）
gcloud projects add-iam-policy-binding PROJECT_ID \\
  --member="serviceAccount:my-app-sa@PROJECT_ID.iam.gserviceaccount.com" \\
  --role="roles/storage.objectViewer"

# 3. KSA と GSA を紐付け
gcloud iam service-accounts add-iam-policy-binding \\
  my-app-sa@PROJECT_ID.iam.gserviceaccount.com \\
  --role="roles/iam.workloadIdentityUser" \\
  --member="serviceAccount:PROJECT_ID.svc.id.goog[NAMESPACE/KSA_NAME]"`}</pre>

                <pre className="codeblock">{`# Kubernetes Service Account に GSA を紐付けるアノテーション
apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-ksa
  namespace: my-app
  annotations:
    iam.gke.io/gcp-service-account: my-app-sa@PROJECT_ID.iam.gserviceaccount.com
---
# Pod で KSA を使用
apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  serviceAccountName: my-ksa
  containers:
  - name: my-container
    image: my-image`}</pre>

                <p className="stitle">Binary Authorization（コンテナの完全性保証）</p>
                <pre className="codeblock">{`【Binary Authorization の仕組み】

CI パイプライン:
  コードビルド → テスト通過 → イメージに署名

GKE デプロイ時:
  Binary Authorization が署名を検証
    ├── 有効な署名あり → デプロイ許可 ✅
    └── 署名なし・無効 → デプロイ拒否 ❌

【防げる攻撃】
  ├── 承認されていないイメージの誤デプロイ
  ├── サプライチェーン攻撃（パッケージへの悪意のあるコード挿入）
  └── 本番環境への未テストイメージのデプロイ`}</pre>

                <p className="stitle">セキュリティポスチャダッシュボード</p>
                <pre className="codeblock">{`GKE Console → セキュリティポスチャ

自動スキャン項目:
  ├── Pod の設定上の懸念事項
  │   例: 「root として実行している」「特権コンテナ」
  ├── コンテナイメージの脆弱性（CVE）
  │   例: 「コンテナの libssl に高リスクのCVEあり」
  └── 推奨される修正アクション（自動提示）`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">5.5</span>GKE のオートスケーリング</div>
                <div className="ctable">
                    <div className="ctable-head">
                        <span className="cthead">スケーリング種別</span>
                        <span className="cthead">対象</span>
                        <span className="cthead">仕組み</span>
                    </div>
                    {[
                        ['HPA（Horizontal Pod Autoscaler）', 'Pod 数', 'CPU/メモリ/カスタムメトリクスに基づいてPodを増減'],
                        ['VPA（Vertical Pod Autoscaler）', 'Pod のリソース量', 'CPU/メモリのリクエストを自動調整'],
                        ['Cluster Autoscaler', 'ノード数', 'Podがスケジュールできない時にノードを追加'],
                        ['KEDA', 'Pod 数', 'Pub/Subキューなど外部メトリクスに基づいてスケール'],
                    ].map(([type, target, how]) => (
                        <div className="ctable-row" key={type}>
                            <span className="ctval">{type}</span>
                            <span className="ctdef">{target}</span>
                            <span className="ctdef">{how}</span>
                        </div>
                    ))}
                </div>
                <pre className="codeblock">{`# HPA の設定例
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: my-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-app
  minReplicas: 2
  maxReplicas: 20
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 60  # CPU 60% を目標に Pod 数を調整`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">5.BP</span>ベストプラクティス: GKE</div>
                <div className="bp">
                    <div className="bpt">ベストプラクティス</div>
                    <div className="ctable">
                        <div className="ctable-head">
                            <span className="cthead">#</span>
                            <span className="cthead">ベストプラクティス</span>
                            <span className="cthead">理由</span>
                        </div>
                        {[
                            ['1', '新規クラスタは Autopilot を選択（特別な要件がなければ）', '運用負荷ゼロ・セキュリティが自動強化'],
                            ['2', 'JSON キーは絶対に使わず Workload Identity を使用', '認証情報の漏洩を根本的に防止'],
                            ['3', 'プライベートクラスタ（外部 IP なし）で構築', 'ノードへの直接攻撃を遮断'],
                            ['4', 'Binary Authorization を有効化', '承認されていないイメージのデプロイを阻止'],
                            ['5', 'Security Posture Dashboard を定期確認', 'CVE と設定ミスをプロアクティブに解消'],
                            ['6', 'リソースリクエストとリミットを必ず設定', 'Podのリソース競合・コスト最適化'],
                            ['7', 'Namespace で環境・チームを分離', 'マルチテナントのアクセス制御'],
                        ].map(([num, bp, reason]) => (
                            <div className="ctable-row" key={num}>
                                <span className="ctval">{num}</span>
                                <span className="ctval">{bp}</span>
                                <span className="ctdef">{reason}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">5.ADV</span>GKE ネットワーク深掘り: VPC-native クラスター（補足）</div>
                <pre className="codeblock">{`【ルートベース vs VPC ネイティブ クラスター】

ルートベース クラスター（旧）:
  Pod の IP ルーティングを VPC の静的ルートに依存
  → ノード数増加でルート割り当て上限（クォータ）に到達
  → スケーラビリティのボトルネックとなる
  → 一度作成したら VPC ネイティブに移行不可！

VPC ネイティブ クラスター（現在のデフォルト・推奨）:
  エイリアスIP（Alias IPs）で Pod に直接 IP を割り当て
  → VPC ルーティングテーブルを消費しない
  → 無限に近いスケーラビリティを実現

VPC ネイティブが有効にする追加機能:
  ├── コンテナネイティブ負荷分散（NEG: Network Endpoint Group）
  │   → LB が Pod に直接ルーティング（VMを経由しない高効率）
  └── Google API へのプライベートアクセス（VPC SC との連携）

計画段階での重要な教訓:
  → 新規クラスターは必ず VPC ネイティブを選択
  → ルートベースから VPC ネイティブへの移行は不可能
     （クラスターを作り直す必要がある）`}</pre>
                <div className="src">参考: cloud.google.com/kubernetes-engine/docs/how-to/routes-based-cluster</div>
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
                    <h2>Cloud Run</h2>
                    <p>サーバーレスコンテナ — ゼロスケール・Direct VPC Egress・カナリアデプロイの完全ガイド</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">6.1</span>Cloud Run とは？</div>
                <p className="tcard-desc">
                    Cloud Run はコンテナイメージを渡すだけで動くフルマネージドのサーバーレスプラットフォームです。
                </p>
                <pre className="codeblock">{`【Cloud Run の特徴】

デプロイは 3ステップだけ:
  1. コンテナイメージをビルド（Artifact Registry へ push）
  2. Cloud Run にデプロイ
  3. HTTPS エンドポイントが自動生成されて完了！

スケーリング:
  リクエストが来たら → 自動でスケールアウト
  リクエストがなければ → ゼロにスケールダウン（コストゼロ）

料金:
  リクエスト処理中のみ課金
  アイドル時間は無料（最小インスタンス=0の場合）`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">6.2</span>Cloud Run の 2 世代の実行環境</div>
                <div className="ctable">
                    <div className="ctable-head">
                        <span className="cthead">項目</span>
                        <span className="cthead">第1世代</span>
                        <span className="cthead">第2世代（推奨）</span>
                    </div>
                    {[
                        ['CPU', 'リクエスト処理中のみ', '常時利用可能'],
                        ['ネットワーク', 'VPC コネクタ経由', 'Direct VPC Egress（高速）'],
                        ['スループット', '制限あり', '最大2Gbps'],
                        ['並行処理', '最大 250 リクエスト/インスタンス', '最大 1000 リクエスト/インスタンス'],
                    ].map(([item, gen1, gen2]) => (
                        <div className="ctable-row" key={item}>
                            <span className="ctval">{item}</span>
                            <span className="ctdef">{gen1}</span>
                            <span className="ctdef">{gen2}</span>
                        </div>
                    ))}
                </div>
                <pre className="codeblock">{`# 第2世代で Cloud Run をデプロイ（推奨）
gcloud run deploy my-service \\
  --image=gcr.io/PROJECT_ID/my-app:latest \\
  --region=asia-northeast1 \\
  --platform=managed \\
  --execution-environment=gen2 \\
  --vpc-egress=all-traffic \\
  --network=my-vpc \\
  --subnet=my-subnet`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">6.3</span>VPC 内のリソースへの接続</div>

                <p className="stitle">Direct VPC Egress（第2世代・推奨）</p>
                <pre className="codeblock">{`Cloud Run コンテナ
    ↓ Direct VPC Egress（高速・低レイテンシ）
VPC ネットワーク
    ├── Cloud SQL（プライベート IP）
    ├── Memorystore（Redis）
    ├── GCE VM（内部 IP）
    └── GKE サービス`}</pre>

                <pre className="codeblock">{`# Direct VPC Egress で VPC 内リソースにアクセス
gcloud run deploy my-service \\
  --image=CONTAINER_IMAGE \\
  --vpc-egress=private-ranges-only \\
  --network=my-vpc \\
  --subnet=my-subnet`}</pre>

                <p className="stitle">旧: Serverless VPC Access コネクタ（第1世代）</p>
                <pre className="codeblock">{`# Serverless VPC Access コネクタを作成（旧方式）
gcloud compute networks vpc-access connectors create my-connector \\
  --network=my-vpc \\
  --region=asia-northeast1 \\
  --range=10.8.0.0/28

# Cloud Run にコネクタを設定
gcloud run deploy my-service \\
  --vpc-connector=my-connector`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">6.4</span>トラフィック分割（カナリアデプロイ）</div>
                <p className="tcard-desc">Cloud Run はトラフィックを複数のリビジョン（バージョン）に分割できます。</p>
                <pre className="codeblock">{`【カナリアデプロイの例】

v1（安定版） ─────── 90% のトラフィック
v2（新バージョン） ── 10% のトラフィック
                      ↓
              問題なければ 100% に切り替え
              問題あればすぐ v1 に戻す`}</pre>

                <pre className="codeblock">{`# v2 に 10% のトラフィックを向ける
gcloud run services update-traffic my-service \\
  --to-revisions=v1=90,v2=10

# 問題なければ v2 に 100% 切り替え
gcloud run services update-traffic my-service \\
  --to-latest`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">6.5</span>Cloud Run の認証</div>
                <pre className="codeblock">{`【外部からのアクセス制御】

インターネット公開（認証不要）:
  gcloud run deploy my-service --allow-unauthenticated

認証必須（IAM で制御）:
  gcloud run deploy my-service --no-allow-unauthenticated
  → アクセスには roles/run.invoker ロールが必要

サービス間認証:
  Cloud Run サービス A → Cloud Run サービス B
    サービス A のサービスアカウントに
    サービス B の roles/run.invoker を付与`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">6.BP</span>ベストプラクティス: Cloud Run</div>
                <div className="bp">
                    <div className="bpt">ベストプラクティス</div>
                    <div className="ctable">
                        <div className="ctable-head">
                            <span className="cthead">#</span>
                            <span className="cthead">ベストプラクティス</span>
                            <span className="cthead">理由</span>
                        </div>
                        {[
                            ['1', '第2世代実行環境 + Direct VPC Egress を使用', 'スループット向上・VPC コネクタ不要'],
                            ['2', 'ステートレスな設計（状態は Cloud SQL・Firestore に保存）', 'スケーリングに対応するため'],
                            ['3', '最小インスタンス数を設定してコールドスタートを削減', 'レイテンシの安定化'],
                            ['4', '--no-allow-unauthenticated で IAM 認証を必須に', '意図せぬ公開を防止'],
                            ['5', 'Secret Manager から環境変数を注入してシークレット管理', 'コードや環境変数にシークレットを直書きしない'],
                            ['6', 'カナリアデプロイでリリースリスクを軽減', '問題を早期発見・即時ロールバック'],
                        ].map(([num, bp, reason]) => (
                            <div className="ctable-row" key={num}>
                                <span className="ctval">{num}</span>
                                <span className="ctval">{bp}</span>
                                <span className="ctdef">{reason}</span>
                            </div>
                        ))}
                    </div>
                </div>
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
                    <h2>Cloud Functions</h2>
                    <p>イベント駆動サーバーレス — HTTP/GCS/Pub/Sub トリガーと Gen2 の完全ガイド</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">7.1</span>Cloud Functions とは？</div>
                <pre className="codeblock">{`【Cloud Functions の特徴】

サーバー管理不要:
  コードだけ書けばOK
  実行環境・スケーリングはGoogle が管理

イベントドリブン:
  ├── HTTP リクエスト
  ├── Cloud Storage へのファイルアップロード
  ├── Pub/Sub メッセージ
  ├── Cloud Scheduler（定期実行）
  └── Firestore の変更

料金:
  関数の呼び出し回数 + 実行時間の課金
  月 200 万回まで無料`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">7.2</span>Cloud Functions の世代</div>
                <div className="ctable">
                    <div className="ctable-head">
                        <span className="cthead">項目</span>
                        <span className="cthead">第1世代</span>
                        <span className="cthead">第2世代（推奨）</span>
                    </div>
                    {[
                        ['実行時間の上限', '9分', '60分'],
                        ['並列性', '1リクエスト/インスタンス', '最大1000リクエスト/インスタンス'],
                        ['メモリ', '最大 8GB', '最大 32GB'],
                        ['CPU', 'リクエスト中のみ', '常時'],
                        ['ベース', 'Cloud Functions', 'Cloud Run Functions（Cloud Run 上で動作）'],
                    ].map(([item, gen1, gen2]) => (
                        <div className="ctable-row" key={item}>
                            <span className="ctval">{item}</span>
                            <span className="ctdef">{gen1}</span>
                            <span className="ctdef">{gen2}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">7.3</span>Cloud Functions の代表的な使用例</div>

                <p className="stitle">例1: HTTP トリガー（API エンドポイント）</p>
                <pre className="codeblock">{`import functions_framework
from flask import jsonify

@functions_framework.http
def hello_world(request):
    name = request.args.get('name', 'World')
    return jsonify({'message': f'Hello, {name}!'})`}</pre>

                <p className="stitle">例2: Cloud Storage トリガー（画像アップロード時に処理）</p>
                <pre className="codeblock">{`import functions_framework
from google.cloud import storage, vision

@functions_framework.cloud_event
def process_image(cloud_event):
    data = cloud_event.data
    bucket_name = data["bucket"]
    file_name = data["name"]

    # Cloud Vision API で画像分析
    client = vision.ImageAnnotatorClient()
    image = vision.Image()
    image.source.image_uri = f"gs://{bucket_name}/{file_name}"

    response = client.label_detection(image=image)
    print(f"Labels: {[l.description for l in response.label_annotations]}")`}</pre>

                <p className="stitle">例3: Pub/Sub トリガー（予算アラートへの対応）</p>
                <pre className="codeblock">{`import base64
import json
import googleapiclient.discovery

def stop_billing(event, context):
    """予算超過アラートを受けてリソースを停止"""
    pubsub_data = base64.b64decode(event['data']).decode('utf-8')
    data = json.loads(pubsub_data)

    if data['costAmount'] >= data['budgetAmount']:
        compute = googleapiclient.discovery.build('compute', 'v1')
        # VM を停止
        compute.instances().stop(
            project='PROJECT_ID',
            zone='asia-northeast1-a',
            instance='my-vm'
        ).execute()`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">7.4</span>Cloud Functions vs Cloud Run の使い分け</div>
                <pre className="codeblock">{`【Cloud Functions を選ぶとき】
  ├── 単純なイベント処理（数行〜数十行のコード）
  ├── 各種 Google Cloud サービスのイベントに反応
  ├── 定期バッチ（Cloud Scheduler + Functions）
  └── プロトタイプ・PoC の素早い実装

【Cloud Run を選ぶとき】
  ├── 複数のエンドポイントを持つ REST API
  ├── 既存のコンテナ化されたアプリ
  ├── カスタムランタイム（Go・Rust など）
  ├── 長時間実行が必要（60分以上）
  └── 複雑なミドルウェアが必要なアプリ`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">7.BP</span>ベストプラクティス: Cloud Functions</div>
                <div className="bp">
                    <div className="bpt">ベストプラクティス</div>
                    <ul>
                        <li><strong>第2世代を使用</strong>（実行時間60分・高並列性）</li>
                        <li><strong>関数は単一責任の原則</strong>（1関数 = 1つのことだけ処理）</li>
                        <li><strong>シークレットは Secret Manager から取得</strong>（環境変数に直書き禁止）</li>
                        <li><strong>VPC コネクタ</strong>でプライベートリソースに接続</li>
                        <li><strong>冪等性（Idempotency）の確保</strong>（同じイベントを複数回受けても安全）</li>
                    </ul>
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
            </div>

            <footer className="page-footer">
                <p>Domain 2: Planning and Implementing a Cloud Solution</p>
            </footer>
        </div>
    );
}
