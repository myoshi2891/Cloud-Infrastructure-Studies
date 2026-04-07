import type { Metadata } from 'next';
import './cdl.css';

export const metadata: Metadata = {
    title: 'Cloud Digital Leader 認定試験',
    description:
        'Google Cloud Digital Leader 包括的解説。DX・データ・AI/ML・インフラ・セキュリティ・生成AI の全領域を詳解。',
};

function SectionIntro() {
    return (
        <div id="s0" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn0">00</div>
                <div className="sec-head-txt">
                    <h2>試験概要と出題セクション</h2>
                    <p>Cloud Digital Leader (CDL) — ビジネスリーダー・意思決定者向け Google Cloud 認定資格</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">0.1</span>試験仕様</div>
                <div className="ctable">
                    <div className="ctable-head">
                        <span>項目</span><span>内容</span>
                    </div>
                    <div className="ctable-row"><span>試験時間</span><span>90分</span></div>
                    <div className="ctable-row"><span>問題数</span><span>60問</span></div>
                    <div className="ctable-row"><span>合格点</span><span>約 70%</span></div>
                    <div className="ctable-row"><span>受験料</span><span>$200</span></div>
                    <div className="ctable-row"><span>有効期間</span><span>3年間</span></div>
                    <div className="ctable-row"><span>前提知識</span><span>不要（推奨: 6ヶ月以上のクラウド経験）</span></div>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">0.2</span>出題セクション別 配点</div>
                <div className="ctable">
                    <div className="ctable-head">
                        <span>セクション</span><span>テーマ</span><span>配点目安</span>
                    </div>
                    <div className="ctable-row"><span>Section 1</span><span>デジタルトランスフォーメーションと Google Cloud</span><span>~17%</span></div>
                    <div className="ctable-row"><span>Section 2</span><span>データと Google Cloud によるイノベーション</span><span>~16%</span></div>
                    <div className="ctable-row"><span>Section 3</span><span>インフラとアプリのモダナイゼーション</span><span>~16%</span></div>
                    <div className="ctable-row"><span>Section 4</span><span>Google Cloud のセキュリティとオペレーション</span><span>~17%</span></div>
                    <div className="ctable-row"><span>Section 5</span><span>AI と ML ソリューション</span><span>~16%</span></div>
                    <div className="ctable-row"><span>その他</span><span>Google Cloud の基礎概念・費用最適化</span><span>~18%</span></div>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">0.3</span>試験の受け方・準備方法</div>
                <pre className="codeblock">{`Step 1: 公式試験ガイドを読む（必須）
Step 2: Cloud Skills Boost の CDL ラーニングパスを修了
Step 3: 公式サンプル問題を解く
Step 4: cp.certmetrics.com/google から試験を予約

📎 試験ページ: cloud.google.com/learn/certification/cloud-digital-leader
📎 学習パス: cloudskillsboost.google/paths/9`}</pre>
            </div>
        </div>
    );
}

function Section1() {
    return (
        <div id="s1" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn1">01</div>
                <div className="sec-head-txt">
                    <h2>DX・クラウド基礎 — デジタルトランスフォーメーションと Google Cloud</h2>
                    <p>クラウドの5特性・IaaS/PaaS/SaaS・デプロイモデル・CapEx vs OpEx・6つのR</p>
                </div>
                <div className="pct-badge pb1">~17%</div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">1.1</span>クラウドの5つの本質的特性（NIST 定義）</div>
                <div className="ctable">
                    <div className="ctable-head">
                        <span>特性</span><span>説明</span><span>ビジネス上の意味</span>
                    </div>
                    <div className="ctable-row"><span>オンデマンド・セルフサービス</span><span>人手を介さずにリソースを即時調達</span><span>IT部門の承認待ち時間ゼロ</span></div>
                    <div className="ctable-row"><span>幅広いネットワークアクセス</span><span>任意のデバイスからアクセス可能</span><span>場所・端末を選ばない働き方</span></div>
                    <div className="ctable-row"><span>リソースの共有（マルチテナント）</span><span>複数ユーザーで物理リソースを共有</span><span>コスト効率の向上</span></div>
                    <div className="ctable-row"><span>迅速な弾力性（エラスティシティ）</span><span>需要に応じて自動でスケール</span><span>急なトラフィック増にも対応</span></div>
                    <div className="ctable-row"><span>計測されたサービス</span><span>使用量に応じた従量課金</span><span>使った分だけ払う経済合理性</span></div>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">1.2</span>クラウドサービスモデル（IaaS / PaaS / SaaS）</div>
                <pre className="codeblock">{`責任の分担（下が基盤、上がユーザー責任）

┌─────────────────┬─────────────────┬─────────────────┐
│     IaaS         │     PaaS         │     SaaS         │
│  Infrastructure  │    Platform      │    Software      │
│  as a Service    │  as a Service    │  as a Service    │
├─────────────────┼─────────────────┼─────────────────┤
│ アプリ [USER]    │ アプリ [USER]    │         [USER]   │
│ ランタイム [USER]│ ランタイム [GCP] │         [GCP]    │
│ OS [USER]        │ OS      [GCP]    │         [GCP]    │
│ 仮想化  [GCP]    │ 仮想化  [GCP]    │         [GCP]    │
│ ハード  [GCP]    │ ハード  [GCP]    │         [GCP]    │
└─────────────────┴─────────────────┴─────────────────┘
例: Compute Engine  Cloud Run / App   Google Workspace
                    Engine            Gmail / Drive`}</pre>
                <div className="tgrid">
                    <div className="titem"><div className="tname">IaaS（Compute Engine など）</div><div className="tdef">OS・MWを自分で管理。リフト&シフト移行・最大の柔軟性が必要なワークロード向け</div></div>
                    <div className="titem"><div className="tname">PaaS（App Engine・Cloud Run など）</div><div className="tdef">インフラ管理なしにアプリ開発に集中。開発者の生産性を最大化</div></div>
                    <div className="titem"><div className="tname">SaaS（Google Workspace など）</div><div className="tdef">インストール・管理不要でソフトウェアをすぐ使える。Gmail・Docs・Sheets</div></div>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">1.3</span>クラウドデプロイメントモデル</div>
                <div className="ctable">
                    <div className="ctable-head">
                        <span>モデル</span><span>説明</span><span>適用場面</span>
                    </div>
                    <div className="ctable-row"><span>パブリッククラウド</span><span>GCP・AWS・Azure が提供する共有インフラ</span><span>コスト最適化・スケーラビリティ重視</span></div>
                    <div className="ctable-row"><span>プライベートクラウド</span><span>企業専用のクラウド環境（オンプレ）</span><span>高いセキュリティ・コンプライアンス要件</span></div>
                    <div className="ctable-row"><span>ハイブリッドクラウド</span><span>パブリック + プライベートを組み合わせ</span><span>段階的移行・データ主権の確保</span></div>
                    <div className="ctable-row"><span>マルチクラウド</span><span>複数のクラウドプロバイダーを利用</span><span>ベンダーロックイン回避・最適サービス選択</span></div>
                </div>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: デプロイメントモデル選定</div>
                    <ul>
                        <li><strong>コスト優先</strong>: パブリッククラウドを選択。CapEx から OpEx へ転換</li>
                        <li><strong>規制対応</strong>: 金融・医療など規制産業ではハイブリッドを検討</li>
                        <li><strong>既存投資保護</strong>: オンプレの設備投資が残っている場合はハイブリッドで段階移行</li>
                        <li><strong>ベンダー分散</strong>: 単一障害点を避けるためマルチクラウド戦略を検討</li>
                    </ul>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">1.4</span>CapEx vs OpEx とクラウド移行の DX 価値</div>
                <div className="ctable">
                    <div className="ctable-head">
                        <span>概念</span><span>説明</span><span>クラウドとの関係</span>
                    </div>
                    <div className="ctable-row"><span>CapEx（資本支出）</span><span>設備・サーバー等への先行投資。資産として計上</span><span>オンプレミス運用の特徴</span></div>
                    <div className="ctable-row"><span>OpEx（運用費用）</span><span>月次・年次の運用コスト。費用として計上</span><span>クラウドの特徴（使った分だけ払う）</span></div>
                </div>
                <pre className="codeblock">{`Google Cloud の DX を加速する3つの柱:

1. インフラの近代化
   └── オンプレ → クラウドへの移行・レガシーシステムの刷新
   └── コスト削減・俊敏性向上

2. データと AI の活用
   └── データドリブン意思決定・AI/ML で業務自動化・予測

3. スマートアナリティクス
   └── ビジネスインテリジェンス・顧客インサイト・新ビジネスモデル`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">1.5</span>クラウド移行戦略（6つの R）</div>
                <div className="ctable">
                    <div className="ctable-head">
                        <span>戦略</span><span>別名</span><span>説明</span><span>コスト</span><span>期間</span>
                    </div>
                    <div className="ctable-row"><span>Rehost</span><span>リフト&シフト</span><span>そのままクラウドへ移動</span><span>低</span><span>短</span></div>
                    <div className="ctable-row"><span>Replatform</span><span>リフト&調整&シフト</span><span>最小限の変更でクラウド最適化</span><span>中</span><span>中</span></div>
                    <div className="ctable-row"><span>Repurchase</span><span>ドロップ&ショッピング</span><span>SaaS 製品への乗り換え</span><span>中</span><span>中</span></div>
                    <div className="ctable-row"><span>Refactor</span><span>リアーキテクチャ</span><span>クラウドネイティブへ再設計</span><span>高</span><span>長</span></div>
                    <div className="ctable-row"><span>Retire</span><span>廃止</span><span>不要なシステムを廃止</span><span>なし</span><span>短</span></div>
                    <div className="ctable-row"><span>Retain</span><span>保持</span><span>当面オンプレに残す</span><span>なし</span><span>—</span></div>
                </div>
                <div className="wb">
                    <div className="wbt">試験ポイント</div>
                    <p>「最も速く・安く移行する」= Rehost（リフト&シフト）。「クラウドのメリットを最大限活かす」= Refactor。</p>
                </div>
            </div>
        </div>
    );
}

function Section2() {
    return (
        <div id="s2" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn2">02</div>
                <div className="sec-head-txt">
                    <h2>データとイノベーション — データ管理・分析・BI サービス</h2>
                    <p>DB 選定・BigQuery・Looker・Dataflow・Dataproc・ストレージクラス</p>
                </div>
                <div className="pct-badge pb2">~16%</div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">2.1</span>データが生み出す 4 つのビジネス価値</div>
                <div className="tgrid">
                    <div className="titem"><div className="tname">1. 過去の理解（記述的分析）</div><div className="tdef">何が起きたかを把握</div></div>
                    <div className="titem"><div className="tname">2. 現状の把握（診断的分析）</div><div className="tdef">今何が起きているかをリアルタイムで監視</div></div>
                    <div className="titem"><div className="tname">3. 未来の予測（予測的分析）</div><div className="tdef">次に何が起きるかを予測</div></div>
                    <div className="titem"><div className="tname">4. 最適行動の提案（処方的分析）</div><div className="tdef">何をすべきかを AI が提案</div></div>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">2.2</span>データベースサービス一覧と選択基準</div>
                <div className="ctable">
                    <div className="ctable-head">
                        <span>サービス</span><span>タイプ</span><span>特徴</span><span>適用場面</span>
                    </div>
                    <div className="ctable-row"><span>Cloud SQL</span><span>マネージド RDBMS</span><span>MySQL・PostgreSQL・SQL Server 対応。垂直スケール</span><span>既存 RDB のクラウド移行・Web アプリ</span></div>
                    <div className="ctable-row"><span>Cloud Spanner</span><span>グローバル分散 RDBMS</span><span>99.999% SLA。世界規模の強一貫性</span><span>金融・在庫管理・グローバル EC</span></div>
                    <div className="ctable-row"><span>Firestore</span><span>NoSQL ドキュメント</span><span>サーバーレス・リアルタイム同期</span><span>モバイル/Web アプリのバックエンド</span></div>
                    <div className="ctable-row"><span>Bigtable</span><span>NoSQL ワイドカラム</span><span>超高スループット・超低遅延</span><span>時系列・IoT・広告データ</span></div>
                    <div className="ctable-row"><span>BigQuery</span><span>データウェアハウス</span><span>サーバーレス SQL 分析。数 TB を数秒で処理</span><span>BI・データ分析・機械学習</span></div>
                    <div className="ctable-row"><span>Memorystore</span><span>インメモリ DB</span><span>マネージド Redis/Memcached</span><span>セッション管理・キャッシュ</span></div>
                    <div className="ctable-row"><span>AlloyDB</span><span>PostgreSQL 互換</span><span>Cloud SQL より高速な分析性能（HTAP）</span><span>高性能トランザクション + 分析</span></div>
                </div>
                <pre className="codeblock">{`DB 選択フロー:

RDB が必要か？
├── YES: グローバルに強一貫性が必要 → Cloud Spanner
└── YES: リージョン内で十分       → Cloud SQL

NoSQL が必要か？
├── ドキュメント形式・リアルタイム → Firestore
├── 時系列・超大量データ          → Bigtable
└── キャッシュ・セッション         → Memorystore

分析・DWH 用途                    → BigQuery`}</pre>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: データベース選択</div>
                    <ul>
                        <li>グローバルな強一貫性が必要 → Cloud Spanner（コストは高いが 99.999% SLA）</li>
                        <li>既存 MySQL/PostgreSQL の移行 → Cloud SQL（最も簡単な移行パス）</li>
                        <li>大量データの SQL 分析 → BigQuery（サーバーレス・ペタバイトスケール）</li>
                        <li>リアルタイム同期が必要な モバイルアプリ → Firestore</li>
                    </ul>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">2.3</span>データ分析・BI サービス</div>
                <div className="tgrid">
                    <div className="titem"><div className="tname">Looker（エンタープライズ BI）</div><div className="tdef">LookML で全社データ定義を一元管理。「真実の唯一の情報源」。経営ダッシュボード・売上レポート向け</div></div>
                    <div className="titem"><div className="tname">Looker Studio（旧 Data Studio）</div><div className="tdef">無料のセルフサービス BI。コードなしでインタラクティブなレポートを作成。Google Sheets・BigQuery と連携</div></div>
                    <div className="titem"><div className="tname">Cloud Dataflow</div><div className="tdef">フルマネージドのデータ処理パイプライン（Apache Beam）。ストリーミング + バッチの両方に対応。ログ処理・IoT データ変換・ETL</div></div>
                    <div className="titem"><div className="tname">Cloud Dataproc</div><div className="tdef">マネージド Apache Hadoop/Spark クラスタ。既存の Hadoop ワークロードをクラウドへ移行。必要な時だけ起動してコスト削減</div></div>
                    <div className="titem"><div className="tname">Cloud Pub/Sub</div><div className="tdef">フルマネージドのメッセージングサービス。イベント駆動アーキテクチャの基盤。1秒あたり数百万メッセージを処理可能</div></div>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">2.4</span>Cloud Storage のストレージクラス</div>
                <div className="ctable">
                    <div className="ctable-head">
                        <span>クラス</span><span>アクセス頻度</span><span>最小保存期間</span><span>ユースケース</span>
                    </div>
                    <div className="ctable-row"><span>Standard</span><span>頻繁</span><span>なし</span><span>Web コンテンツ・アクティブデータ</span></div>
                    <div className="ctable-row"><span>Nearline</span><span>月1回程度</span><span>30 日</span><span>バックアップ・月次レポート</span></div>
                    <div className="ctable-row"><span>Coldline</span><span>四半期1回程度</span><span>90 日</span><span>アーカイブ・DR 用バックアップ</span></div>
                    <div className="ctable-row"><span>Archive</span><span>年1回未満</span><span>365 日</span><span>長期保管・規制対応アーカイブ</span></div>
                </div>
            </div>
        </div>
    );
}

function Section3() {
    return (
        <div id="s3" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn3">03</div>
                <div className="sec-head-txt">
                    <h2>インフラとモダナイゼーション — コンピューティング・ネットワーク・マネージドサービス</h2>
                    <p>Compute Engine・GKE・Cloud Run・コンテナ・VPC・Cloud Interconnect</p>
                </div>
                <div className="pct-badge pb3">~16%</div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">3.1</span>コンピューティングサービスの比較と選択</div>
                <div className="ctable">
                    <div className="ctable-head">
                        <span>サービス</span><span>キーワード</span><span>使い分け</span>
                    </div>
                    <div className="ctable-row"><span>Compute Engine</span><span>VM・IaaS・OS 制御・GPU</span><span>レガシー移行・特定 OS 要件・最大の柔軟性</span></div>
                    <div className="ctable-row"><span>GKE</span><span>コンテナ・Kubernetes・ステートフル</span><span>マイクロサービス・長時間処理</span></div>
                    <div className="ctable-row"><span>Cloud Run</span><span>コンテナ・サーバーレス・HTTP・0 スケール</span><span>ステートレス API・スパイクトラフィック</span></div>
                    <div className="ctable-row"><span>Cloud Run Functions</span><span>FaaS・イベント駆動・軽量処理</span><span>Webhook・トリガー・小さな関数</span></div>
                    <div className="ctable-row"><span>App Engine</span><span>PaaS・Web アプリ・コードだけ</span><span>レガシー Web アプリの移行</span></div>
                </div>
                <pre className="codeblock">{`コンピューティングサービス選択フロー:

OS・ミドルウェアの制御が必要         → Compute Engine
コンテナ + ステートフル/長時間処理    → GKE
コンテナ + ステートレス HTTP API      → Cloud Run
イベント駆動 + 短時間の小さな関数     → Cloud Run Functions
コード書くだけでOK（PaaS）           → App Engine
0スケールでコスト最小化              → Cloud Run / Cloud Run Functions`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">3.2</span>コンテナと VM の違い</div>
                <pre className="codeblock">{`従来の VM:                コンテナ:
┌──────────────┐        ┌──────────────┐
│    App A      │        │ App A | App B │
│  バイナリ/Lib │        │  バイナリ/Lib│
│  ゲスト OS    │        ├──────────────┤
├──────────────┤        │コンテナランタイム│
│   Hypervisor  │        │  ホスト OS    │
│   ホスト OS   │        │  ハードウェア │
│   ハードウェア│        └──────────────┘
└──────────────┘
→ 重くて起動が遅い       → 軽くて起動が速い`}</pre>
                <div className="tgrid">
                    <div className="titem"><div className="tname">GKE Autopilot</div><div className="tdef">Google が完全管理。Pod 単位課金。運用負荷を最小化したい場合に最適</div></div>
                    <div className="titem"><div className="tname">GKE Standard</div><div className="tdef">ユーザーがノードを管理。ノード VM 課金。細かいノード制御が必要な場合</div></div>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">3.3</span>ネットワークサービス</div>
                <div className="ctable">
                    <div className="ctable-head">
                        <span>サービス</span><span>説明</span><span>帯域/用途</span>
                    </div>
                    <div className="ctable-row"><span>VPC（Virtual Private Cloud）</span><span>グローバルに展開するソフトウェア定義ネットワーク</span><span>プロジェクト間の分離・ファイアウォールルール</span></div>
                    <div className="ctable-row"><span>Cloud Load Balancing</span><span>グローバル/リージョナルの自動スケーリング対応ロードバランサー</span><span>HTTP/HTTPS トラフィックの分散</span></div>
                    <div className="ctable-row"><span>Cloud CDN</span><span>Google のグローバルネットワークでコンテンツをキャッシュ・高速配信</span><span>静的コンテンツのレイテンシ削減</span></div>
                    <div className="ctable-row"><span>Dedicated Interconnect</span><span>専用回線で GCP と直接接続</span><span>10/100Gbps — 大量データ転送</span></div>
                    <div className="ctable-row"><span>Partner Interconnect</span><span>パートナー経由の専用接続</span><span>50Mbps〜50Gbps</span></div>
                    <div className="ctable-row"><span>Cloud VPN</span><span>インターネット経由 IPsec トンネル</span><span>最大 3Gbps/トンネル — 低コスト接続</span></div>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">3.4</span>マネージドサービスとサーバーレスの価値</div>
                <pre className="codeblock">{`管理責任の分担:

           オンプレミス  IaaS(GCE)  PaaS(AppEng)  サーバーレス
アプリ        [自社]      [自社]      [自社]         [自社]
ランタイム    [自社]      [自社]      [自社]         [GCP]
OS            [自社]      [自社]      [自社]         [GCP]
ミドルウェア  [自社]      [GCP]       [GCP]          [GCP]
仮想化        [自社]      [GCP]       [GCP]          [GCP]
ハードウェア  [自社]      [GCP]       [GCP]          [GCP]`}</pre>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: マネージドサービス活用</div>
                    <ul>
                        <li>差別化されない重労働（インフラ管理・パッチ適用）は<strong>マネージドサービスに委譲</strong></li>
                        <li>エンジニアはビジネス価値を生む<strong>アプリケーション開発に集中</strong></li>
                        <li>Spot/Preemptible VM を活用してバッチ処理のコストを最大 91% 削減</li>
                        <li>Sustained Use Discount（自動割引 30%）と Committed Use Discount（最大 57%）を理解する</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

function Section4() {
    return (
        <div id="s4" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn4">04</div>
                <div className="sec-head-txt">
                    <h2>セキュリティとオペレーション — IAM・多層防御・費用管理</h2>
                    <p>IAM・リソース階層・Cloud Armor・KMS・SCC・Cloud Monitoring・コスト最適化</p>
                </div>
                <div className="pct-badge pb4">~17%</div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">4.1</span>Google Cloud のセキュリティ設計思想（多層防御）</div>
                <pre className="codeblock">{`Layer 7: データ        暗号化・DLP・アクセス制御
Layer 6: ユーザー      IAM・MFA・Cloud Identity
Layer 5: アプリ        脆弱性スキャン・Container Analysis
Layer 4: エンドポイント Chrome Enterprise・BeyondCorp
Layer 3: ネットワーク  VPC・ファイアウォール・Cloud Armor
Layer 2: インフラ      Shielded VMs・Confidential Computing
Layer 1: ハードウェア  Titan チップ・物理セキュリティ`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">4.2</span>IAM（Identity and Access Management）</div>
                <div className="ctable">
                    <div className="ctable-head">
                        <span>ロール種別</span><span>説明</span><span>推奨度</span>
                    </div>
                    <div className="ctable-row"><span>基本ロール</span><span>Owner / Editor / Viewer。プロジェクト全体に適用</span><span>❌ 本番環境では非推奨</span></div>
                    <div className="ctable-row"><span>事前定義ロール</span><span>特定サービスに最適化されたロール</span><span>✅ 推奨</span></div>
                    <div className="ctable-row"><span>カスタムロール</span><span>必要な権限のみを組み合わせた自作ロール</span><span>✅ 最小権限の原則を徹底</span></div>
                </div>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: IAM</div>
                    <ul>
                        <li><strong>最小権限の原則</strong>: 必要最小限のロールのみを付与</li>
                        <li><strong>グループ管理</strong>: 個人ではなくグループにロールを付与</li>
                        <li><strong>サービスアカウントキー</strong>: 可能な限り発行せず、Workload Identity Federation を使用</li>
                        <li><strong>定期レビュー</strong>: 不要なロールの付与を定期的に棚卸し</li>
                        <li><strong>2 段階認証（MFA）</strong>: 全ユーザーに強制する</li>
                    </ul>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">4.3</span>リソース階層とポリシー継承</div>
                <pre className="codeblock">{`組織（Organization）
    │
    ├── フォルダ（Folder）←── 部門・環境でグループ化
    │       │
    │       ├── プロジェクト（Project）
    │       │       │
    │       │       └── リソース（VM・GCS・DB等）
    │       │
    │       └── プロジェクト（Project）
    │
    └── フォルダ（Folder）

ポリシーは上位から下位へ継承される（上書き不可）
IAM ポリシーは「追加のみ」→ 上位で付与した権限は下位でも有効`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">4.4</span>主要セキュリティサービス</div>
                <div className="ctable">
                    <div className="ctable-head">
                        <span>サービス</span><span>キーワード</span><span>役割</span>
                    </div>
                    <div className="ctable-row"><span>Cloud IAP</span><span>認証・アクセス制御・ゼロトラスト</span><span>VPN なし・ゼロトラストで社内アプリアクセス制御</span></div>
                    <div className="ctable-row"><span>Cloud Armor</span><span>DDoS・WAF・OWASP Top 10</span><span>Web アプリの DDoS 保護・SQL インジェクション・XSS ブロック</span></div>
                    <div className="ctable-row"><span>Secret Manager</span><span>API キー・パスワード管理</span><span>機密情報を安全に管理。自動ローテーション対応</span></div>
                    <div className="ctable-row"><span>Cloud KMS</span><span>暗号化キー管理・CMEK</span><span>顧客管理暗号化キーでデータをさらに強固に保護</span></div>
                    <div className="ctable-row"><span>Security Command Center</span><span>脅威・脆弱性の一元可視化</span><span>リスクの検出・優先順位付け・修復ガイダンス</span></div>
                    <div className="ctable-row"><span>Sensitive Data Protection（DLP）</span><span>PII 検出・マスキング</span><span>個人情報を自動検出・分類。GDPR・HIPAA 対応</span></div>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">4.5</span>コンプライアンスと規制対応</div>
                <div className="ctable">
                    <div className="ctable-head">
                        <span>規制/認証</span><span>対象業界</span><span>説明</span>
                    </div>
                    <div className="ctable-row"><span>ISO 27001</span><span>全業種</span><span>情報セキュリティ管理の国際規格</span></div>
                    <div className="ctable-row"><span>SOC 2 / SOC 3</span><span>全業種</span><span>システムの信頼性・セキュリティの監査報告</span></div>
                    <div className="ctable-row"><span>PCI DSS</span><span>金融・EC</span><span>クレジットカード情報の取り扱い基準</span></div>
                    <div className="ctable-row"><span>HIPAA</span><span>医療（米国）</span><span>医療情報の保護に関する規制</span></div>
                    <div className="ctable-row"><span>GDPR</span><span>EU 圏</span><span>欧州個人データ保護規則</span></div>
                    <div className="ctable-row"><span>FedRAMP</span><span>米国政府</span><span>連邦政府クラウドサービスの安全基準</span></div>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">4.6</span>費用管理と最適化</div>
                <div className="ctable">
                    <div className="ctable-head">
                        <span>割引概念</span><span>説明</span>
                    </div>
                    <div className="ctable-row"><span>従量課金</span><span>使用した分だけ支払う（秒単位課金が多い）</span></div>
                    <div className="ctable-row"><span>Sustained Use Discount</span><span>月間で一定時間以上使うと自動で最大 30% 割引（申込不要）</span></div>
                    <div className="ctable-row"><span>Committed Use Discount</span><span>1 年/3 年コミットで最大 57% 割引（Compute Engine・事前申込必要）</span></div>
                    <div className="ctable-row"><span>Spot/Preemptible VM</span><span>通常比最大 91% 安価（中断の可能性あり）</span></div>
                </div>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: コスト最適化</div>
                    <ul>
                        <li><strong>右サイズ化</strong>: 過剰スペックの VM をダウンサイズ（Active Assist が自動提案）</li>
                        <li><strong>使われていないリソースの削除</strong>: 停止中の VM・未使用の IP アドレス</li>
                        <li><strong>Spot VM の活用</strong>: バッチ処理・CI/CD などに</li>
                        <li><strong>Committed Use の適用</strong>: 安定したワークロードには長期契約が得（Sustained Use との違いを理解）</li>
                        <li><strong>予算アラート設定</strong>: 50%・90%・100% 消費時に通知</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

function Section5() {
    return (
        <div id="s5" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn5">05</div>
                <div className="sec-head-txt">
                    <h2>AI と ML ソリューション — プリビルト API・AutoML・Vertex AI・生成 AI</h2>
                    <p>AI 階層・機械学習 3 アプローチ・Gemini・RAG・責任ある AI</p>
                </div>
                <div className="pct-badge pb5">~16%</div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">5.1</span>AI の階層的理解</div>
                <pre className="codeblock">{`AI（人工知能）: 人間の知的行動をコンピュータで模倣する技術全般
  └── ML（機械学習）: データからパターンを自動学習
        └── 深層学習（Deep Learning）: 多層ニューラルネットワーク
              └── 生成AI（Generative AI）: 新しいコンテンツを生成
                    └── LLM（大規模言語モデル）: テキスト生成に特化`}</pre>
                <div className="ctable">
                    <div className="ctable-head">
                        <span>アプローチ</span><span>データ形式</span><span>代表例</span>
                    </div>
                    <div className="ctable-row"><span>教師あり学習</span><span>正解ラベル付きデータ</span><span>スパム分類・需要予測・画像認識</span></div>
                    <div className="ctable-row"><span>教師なし学習</span><span>ラベルなしデータ</span><span>顧客セグメンテーション・異常検知</span></div>
                    <div className="ctable-row"><span>強化学習</span><span>報酬シグナル</span><span>ゲーム AI・自動運転・RLHF</span></div>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">5.2</span>Google Cloud AI/ML サービス階層</div>
                <pre className="codeblock">{`【使いやすさ重視】 ←────────────────────────→ 【カスタマイズ重視】

プリビルト AI API    AutoML          Vertex AI カスタムモデル
(API呼び出すだけ)   (ノーコード ML)   (フルコントロール)

エンジニア不要      ML の専門知識不要  ML エンジニア必要
コスト最小          中程度             最大コスト
柔軟性低            中程度             最大柔軟性`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">5.3</span>プリビルト AI API（事前学習済みモデル API）</div>
                <div className="ctable">
                    <div className="ctable-head">
                        <span>API</span><span>機能</span><span>ユースケース</span>
                    </div>
                    <div className="ctable-row"><span>Vision API</span><span>画像認識・ラベル付け・OCR・顔検出</span><span>商品画像タグ付け・文書デジタル化</span></div>
                    <div className="ctable-row"><span>Natural Language API</span><span>感情分析・エンティティ抽出・分類</span><span>レビュー分析・チケット自動分類</span></div>
                    <div className="ctable-row"><span>Translation API</span><span>130 以上の言語間翻訳</span><span>多言語コンテンツ・グローバル対応</span></div>
                    <div className="ctable-row"><span>Speech-to-Text API</span><span>音声→テキスト変換</span><span>コールセンター文字起こし・音声コマンド</span></div>
                    <div className="ctable-row"><span>Document AI API</span><span>PDF・文書の構造化データ抽出</span><span>請求書処理自動化・契約書解析</span></div>
                    <div className="ctable-row"><span>Video Intelligence API</span><span>動画内シーン検出・物体認識</span><span>動画コンテンツ分類・監視映像分析</span></div>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">5.4</span>Gemini モデルファミリー（生成 AI）</div>
                <div className="ctable">
                    <div className="ctable-head">
                        <span>モデル</span><span>特徴</span><span>主な用途</span>
                    </div>
                    <div className="ctable-row"><span>Gemini Ultra</span><span>最高精度・最大規模</span><span>複雑な推論・マルチモーダルタスク</span></div>
                    <div className="ctable-row"><span>Gemini Pro</span><span>性能とコストのバランス</span><span>多様なビジネスタスク・RAG</span></div>
                    <div className="ctable-row"><span>Gemini Flash</span><span>高速・低コスト</span><span>大量処理・リアルタイムアプリ</span></div>
                    <div className="ctable-row"><span>Gemini Nano</span><span>小型・オンデバイス</span><span>エッジデバイス・スマートフォン</span></div>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">5.5</span>RAG・ハルシネーション・ファインチューニング</div>
                <pre className="codeblock">{`【RAG（Retrieval-Augmented Generation）】

通常の LLM:  プロンプト → LLM → 回答（学習データのみから生成）
                                   ↑ ハルシネーションのリスクあり

RAG:         プロンプト → 検索エンジン → 関連文書を取得
                               ↓
                   プロンプト + 文書 → LLM → 根拠ある回答
                                               ↑ ハルシネーション大幅減少

RAG のメリット:
  ├── 最新情報に対応（モデルの知識カットオフを超えられる）
  ├── 企業固有の知識を活用
  └── 回答に根拠（ソース）を提示できる`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">5.6</span>責任ある AI（Responsible AI）— Google AI の 6 原則</div>
                <div className="ctable">
                    <div className="ctable-head">
                        <span>原則</span><span>説明</span>
                    </div>
                    <div className="ctable-row"><span>公平性（Fairness）</span><span>バイアスのない公平な出力</span></div>
                    <div className="ctable-row"><span>透明性（Transparency）</span><span>AI であることを開示・判断根拠の説明</span></div>
                    <div className="ctable-row"><span>説明可能性（Explainability）</span><span>なぜその判断をしたかを説明できる</span></div>
                    <div className="ctable-row"><span>プライバシー（Privacy）</span><span>個人データの最小収集・適切な管理</span></div>
                    <div className="ctable-row"><span>説明責任（Accountability）</span><span>AI 判断の責任を持つ人間が存在すること</span></div>
                    <div className="ctable-row"><span>安全性（Safety）</span><span>有害コンテンツ生成の防止・セーフガード</span></div>
                </div>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: AI サービス選択</div>
                    <ul>
                        <li>コード少なく汎用タスク → <strong>プリビルト AI API</strong>（Vision・NL・Translation など）</li>
                        <li>独自データでカスタムモデル（ML 知識不要）→ <strong>AutoML</strong></li>
                        <li>フル機能 ML・本番向け → <strong>Vertex AI</strong>（MLエンジニアが必要）</li>
                        <li>ハルシネーションを低減したい → <strong>RAG + Grounding</strong> を活用</li>
                        <li>オフィス業務の AI 化 → <strong>Gemini for Google Workspace</strong></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

function Section6() {
    return (
        <div id="s6" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn6">06</div>
                <div className="sec-head-txt">
                    <h2>サービス早見表 — カテゴリ別・混同ペア</h2>
                    <p>コンピューティング・ストレージ/DB・AI/ML・セキュリティ・オペレーション</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">6.1</span>コンピューティングサービス早見表</div>
                <div className="ctable">
                    <div className="ctable-head">
                        <span>サービス</span><span>キーワード</span><span>使い分け</span>
                    </div>
                    <div className="ctable-row"><span>Compute Engine</span><span>VM・IaaS・OS 制御・GPU が必要</span><span>レガシー移行・特定 OS 要件</span></div>
                    <div className="ctable-row"><span>GKE</span><span>コンテナ・Kubernetes・ステートフル</span><span>マイクロサービス・長時間処理</span></div>
                    <div className="ctable-row"><span>Cloud Run</span><span>コンテナ・サーバーレス・HTTP・0 スケール</span><span>ステートレス API・スパイクトラフィック</span></div>
                    <div className="ctable-row"><span>Cloud Run Functions</span><span>FaaS・イベント駆動・軽量処理</span><span>Webhook・トリガー・小さな関数</span></div>
                    <div className="ctable-row"><span>App Engine</span><span>PaaS・Web アプリ・コードだけ</span><span>レガシー Web アプリの移行</span></div>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">6.2</span>よく混同されるサービスペア</div>
                <div className="ctable">
                    <div className="ctable-head">
                        <span>混同ペア</span><span>正しい理解</span>
                    </div>
                    <div className="ctable-row"><span>Cloud Run vs Cloud Run Functions</span><span>Cloud Run はコンテナ。Functions は関数（コード）。どちらもサーバーレス</span></div>
                    <div className="ctable-row"><span>Cloud SQL vs BigQuery</span><span>Cloud SQL: OLTP（トランザクション処理）。BigQuery: OLAP（分析）</span></div>
                    <div className="ctable-row"><span>Dataflow vs Dataproc</span><span>Dataflow: Apache Beam（ストリーミング + バッチ）。Dataproc: Hadoop/Spark（バッチ）</span></div>
                    <div className="ctable-row"><span>Committed Use vs Sustained Use</span><span>Committed Use は事前申込が必要。Sustained Use は自動適用</span></div>
                    <div className="ctable-row"><span>匿名化 vs 仮名化</span><span>匿名化は再識別不可（GDPR 対象外）。仮名化は再識別可能（GDPR 対象）</span></div>
                    <div className="ctable-row"><span>Looker vs Looker Studio</span><span>Looker: エンタープライズ BI（有料）。Looker Studio: セルフサービス BI（無料）</span></div>
                </div>
            </div>
        </div>
    );
}

function Section7() {
    return (
        <div id="s7" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn7">07</div>
                <div className="sec-head-txt">
                    <h2>試験攻略チェックリスト — 必ず押さえるべき概念</h2>
                    <p>セクション別チェックリスト・学習ロードマップ・試験当日のポイント</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">7.1</span>必ず押さえるべき概念（各セクション）</div>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: Section 1 — DX とクラウド基礎</div>
                    <ul>
                        <li>IaaS / PaaS / SaaS の違いと具体例（Compute Engine / App Engine / Google Workspace）</li>
                        <li>パブリック・プライベート・ハイブリッド・マルチクラウドの違い</li>
                        <li>CapEx vs OpEx の違いとクラウドとの関係</li>
                        <li>クラウド移行の 6 つの R（Rehost・Replatform・Refactor・Repurchase・Retire・Retain）</li>
                    </ul>
                </div>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: Section 2 — データとイノベーション</div>
                    <ul>
                        <li>BigQuery とはどんなサービスか（DWH・サーバーレス・SQL 分析）</li>
                        <li>Cloud Storage のストレージクラス 4 種（Standard・Nearline・Coldline・Archive）</li>
                        <li>DB 選択基準（RDB vs NoSQL、グローバル一貫性 vs リージョン）</li>
                        <li>Looker / Looker Studio の違い（エンタープライズ BI vs セルフサービス）</li>
                        <li>Pub/Sub・Dataflow・Dataproc の役割の違い</li>
                    </ul>
                </div>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: Section 3 — インフラとモダナイゼーション</div>
                    <ul>
                        <li>コンテナと VM の違い</li>
                        <li>Compute Engine / GKE / Cloud Run / Cloud Run Functions の使い分け</li>
                        <li>GKE Autopilot と Standard の違い</li>
                        <li>Cloud Interconnect vs Cloud VPN の使い分け</li>
                        <li>Spot/Preemptible VM はいつ使うか</li>
                    </ul>
                </div>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: Section 4 — セキュリティとオペレーション</div>
                    <ul>
                        <li>IAM の最小権限の原則・グループ管理</li>
                        <li>リソース階層（組織→フォルダ→プロジェクト→リソース）</li>
                        <li>Cloud Armor・Cloud KMS・Secret Manager・IAP・SCC の役割</li>
                        <li>監査ログの種類（Admin Activity・Data Access・System Event の違い）</li>
                        <li>費用最適化の手段（Committed Use・Spot VM・右サイズ化）</li>
                    </ul>
                </div>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: Section 5 — AI/ML</div>
                    <ul>
                        <li>プリビルト API vs AutoML vs Vertex AI カスタムモデルの使い分け</li>
                        <li>Gemini の 4 バリアント（Ultra・Pro・Flash・Nano）の特徴</li>
                        <li>RAG とは何か・なぜハルシネーションを減らせるか</li>
                        <li>責任ある AI の 6 原則</li>
                        <li>匿名化 vs 仮名化の違い（再識別可能かどうか）</li>
                    </ul>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">7.2</span>推奨学習ロードマップ</div>
                <pre className="codeblock">{`Week 1-2: 基礎概念の固め
├── Cloud の基本概念（IaaS/PaaS/SaaS、デプロイモデル）
├── Google Cloud のコアサービス概要
└── Cloud Skills Boost の入門コースを修了

Week 3-4: 主要サービスの理解
├── コンピューティング・ストレージ・ネットワーク
├── データ分析・データベースサービス
└── セキュリティの基本（IAM・暗号化）

Week 5: AI/ML と総まとめ
├── AI API の種類と使い分け
├── 生成 AI（Gemini・RAG・ファインチューニング）
└── 責任ある AI

Week 6: 試験直前対策
├── 公式サンプル問題を繰り返し解く
├── 間違えた問題の公式ドキュメントを読む
└── 頻出サービス早見表を暗記`}</pre>
            </div>
        </div>
    );
}

function Section8() {
    return (
        <div id="s8" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn8">08</div>
                <div className="sec-head-txt">
                    <h2>参照リソース — 公式ドキュメント・学習パス・試験登録</h2>
                    <p>試験当日のポイント・公式参照リソース一覧</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">8.1</span>試験当日のポイント</div>
                <div className="tgrid">
                    <div className="titem"><div className="tname">「ビジネスリーダー」の視点で解答</div><div className="tdef">技術詳細より「ビジネス価値・コスト効率・生産性向上」を重視</div></div>
                    <div className="titem"><div className="tname">Google Cloud 固有のサービス名を覚える</div><div className="tdef">一般用語ではなく Google Cloud 固有の名前で選択肢を判断</div></div>
                    <div className="titem"><div className="tname">「最も適切な」に注意</div><div className="tdef">複数が正しい場合でも「最もシンプル」「最もコスト効率が良い」を選ぶ</div></div>
                    <div className="titem"><div className="tname">セキュリティ問題は最小権限の原則</div><div className="tdef">権限を広く与えるより絞る方が正解</div></div>
                    <div className="titem"><div className="tname">マネージドサービス優先</div><div className="tdef">「自分で管理する」より「マネージドサービスを使う」が Google の推奨</div></div>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">8.2</span>公式参照リソース一覧</div>
                <div className="ctable">
                    <div className="ctable-head">
                        <span>リソース</span><span>URL</span>
                    </div>
                    <div className="ctable-row"><span>試験概要ページ</span><span>cloud.google.com/learn/certification/cloud-digital-leader</span></div>
                    <div className="ctable-row"><span>公式試験ガイド</span><span>cloud.google.com/learn/certification/guides/cloud-digital-leader</span></div>
                    <div className="ctable-row"><span>Cloud Skills Boost 学習パス</span><span>cloudskillsboost.google/paths/9</span></div>
                    <div className="ctable-row"><span>試験登録</span><span>cp.certmetrics.com/google/en/login</span></div>
                    <div className="ctable-row"><span>IAM ドキュメント</span><span>cloud.google.com/iam/docs</span></div>
                    <div className="ctable-row"><span>BigQuery ドキュメント</span><span>cloud.google.com/bigquery/docs</span></div>
                    <div className="ctable-row"><span>Vertex AI ドキュメント</span><span>cloud.google.com/vertex-ai/docs</span></div>
                    <div className="ctable-row"><span>セキュリティ概要</span><span>cloud.google.com/security/overview</span></div>
                    <div className="ctable-row"><span>Google AI 原則</span><span>ai.google/responsibility/principles/</span></div>
                    <div className="ctable-row"><span>Cloud Storage クラス</span><span>cloud.google.com/storage/docs/storage-classes</span></div>
                    <div className="ctable-row"><span>コスト最適化</span><span>cloud.google.com/architecture/framework/cost-optimization</span></div>
                </div>
            </div>
        </div>
    );
}

export default function CloudDigitalLeaderPage() {
    return (
        <div className="cdl-page">
            <section className="hero">
                <div className="hero-eyebrow">Google Cloud Certification · CDL</div>
                <h1>
                    Cloud Digital Leader{' '}
                    <span>認定試験</span>
                </h1>
                <p className="hero-sub">
                    DX・データ・AI/ML・インフラ・セキュリティ・生成 AI — 全領域を体系的に解説
                </p>
                <div className="hero-meta">
                    <span className="hero-badge">
                        <span className="dot dot-blue" />
                        全8セクション
                    </span>
                    <span className="hero-badge">
                        <span className="dot dot-red" />
                        試験時間 90分
                    </span>
                    <span className="hero-badge">
                        <span className="dot dot-yellow" />
                        60問
                    </span>
                    <span className="hero-badge">
                        <span className="dot dot-green" />
                        合格ライン 70%
                    </span>
                </div>
            </section>

            <nav className="snav" role="navigation" aria-label="セクションナビゲーション">
                <div className="snav-inner">
                    <a href="#s0" className="snav-link"><span className="snav-num">00</span>試験概要</a>
                    <a href="#s1" className="snav-link"><span className="snav-num">01</span>DX・クラウド基礎</a>
                    <a href="#s2" className="snav-link"><span className="snav-num">02</span>データとイノベーション</a>
                    <a href="#s3" className="snav-link"><span className="snav-num">03</span>インフラとモダナイゼーション</a>
                    <a href="#s4" className="snav-link"><span className="snav-num">04</span>セキュリティと運用</a>
                    <a href="#s5" className="snav-link"><span className="snav-num">05</span>AI/ML</a>
                    <a href="#s6" className="snav-link"><span className="snav-num">06</span>サービス早見表</a>
                    <a href="#s7" className="snav-link"><span className="snav-num">07</span>試験攻略</a>
                    <a href="#s8" className="snav-link"><span className="snav-num">08</span>参照リソース</a>
                </div>
            </nav>

            <div className="wrapper">
                <SectionIntro />
                <Section1 />
                <Section2 />
                <Section3 />
                <Section4 />
                <Section5 />
                <Section6 />
                <Section7 />
                <Section8 />
            </div>

            <footer className="page-footer">
                <p>Cloud Digital Leader 認定試験 包括的解説</p>
            </footer>
        </div>
    );
}
