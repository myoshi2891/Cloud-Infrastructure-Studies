import type { Metadata } from 'next';
import {
    EXAM_SPEC,
    EXAM_DOMAINS,
    NIST_CHARACTERISTICS,
    AI_PRINCIPLES,
    AI_NOT_PURSUE,
    COMPUTE_SERVICES,
    CONFUSING_PAIRS,
    RESOURCES,
    DEPLOYMENT_MODELS,
    CAPEX_OPEX,
    GCP_STRENGTHS,
    SERVICE_MODEL_RESPONSIBILITY,
    ADOPTION_FRAMEWORK,
    STORAGE_CLASSES,
    DB_SERVICES,
    MIGRATION_6R,
    MACHINE_TYPES,
    GKE_MODES,
    NETWORK_SERVICES,
    IAM_ROLES,
    COMPLIANCE_CERTS,
    COST_MODEL,
    SUPPORT_TIERS,
    PREBUILT_APIS,
    AUTOML_SERVICES,
    VERTEX_COMPONENTS,
    GEMINI_MODELS,
    RESPONSIBLE_AI_PRINCIPLES,
    PRIVACY_TECHNIQUES,
    ML_APPROACHES,
    BQML_FEATURES,
    QR_COMPUTE,
    QR_STORAGE_DB,
    QR_AIML,
    QR_SECURITY,
    QR_OPS,
    CHECKLIST_CONCEPTS,
    ROADMAP_WEEKS,
    EXAM_TIPS,
    REFERENCE_LINKS,
} from './constants';

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
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>項目</th>
                                <th>内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            {EXAM_SPEC.map((row, i) => (
                                <tr key={i}>
                                    <td>{row.item}</td>
                                    <td>{row.content}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">0.2</span>出題ドメイン別 配点</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>セクション</th>
                                <th>テーマ</th>
                                <th>配点目安</th>
                            </tr>
                        </thead>
                        <tbody>
                            {EXAM_DOMAINS.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>{row.section}</strong></td>
                                    <td>{row.theme}</td>
                                    <td>{row.weight}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
                    <p>クラウドの5特性・IaaS/PaaS/SaaS・デプロイモデル・CapEx vs OpEx・Cloud Adoption Framework</p>
                </div>
            </div>

            {/* 1.1 NIST 5特性 */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">1.1</span>クラウドの5つの本質的特性（NIST 定義）</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>特性</th>
                                <th>説明</th>
                                <th>ビジネス上の意味</th>
                            </tr>
                        </thead>
                        <tbody>
                            {NIST_CHARACTERISTICS.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>{row.trait}</strong></td>
                                    <td>{row.desc}</td>
                                    <td>{row.meaning}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 1.2 IaaS/PaaS/SaaS 責任分担 SVG */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">1.2</span>クラウドサービスモデル（IaaS / PaaS / SaaS）</div>
                <svg viewBox="0 0 640 260" className="cdl-svg" aria-label="IaaS/PaaS/SaaS 責任分担図" role="img">
                    {/* 列ヘッダ */}
                    {[{ x: 80, label: 'IaaS' }, { x: 280, label: 'PaaS' }, { x: 480, label: 'SaaS' }].map(col => (
                        <g key={col.label}>
                            <rect x={col.x - 80} y={4} width={160} height={32} rx={6} fill="var(--cdl-blue)" opacity={0.9} />
                            <text x={col.x} y={24} textAnchor="middle" fill="#fff" fontSize={14} fontWeight="bold">{col.label}</text>
                        </g>
                    ))}
                    {/* 行ラベルと色分け */}
                    {[
                        { layer: 'アプリ', y: 48, iaas: 'USER', paas: 'USER', saas: 'GCP' },
                        { layer: 'ランタイム', y: 90, iaas: 'USER', paas: 'GCP', saas: 'GCP' },
                        { layer: 'OS / VM', y: 132, iaas: 'USER', paas: 'GCP', saas: 'GCP' },
                        { layer: 'ネットワーク', y: 174, iaas: 'GCP', paas: 'GCP', saas: 'GCP' },
                        { layer: 'ハードウェア', y: 216, iaas: 'GCP', paas: 'GCP', saas: 'GCP' },
                    ].map(row => {
                        const cells = [row.iaas, row.paas, row.saas];
                        return (
                            <g key={row.layer}>
                                <text x={8} y={row.y + 22} fill="var(--color-muted)" fontSize={11}>{row.layer}</text>
                                {cells.map((owner, ci) => {
                                    const cx = ci * 200 + 80;
                                    const fill = owner === 'USER' ? 'var(--cdl-blue)' : 'var(--cdl-green)';
                                    return (
                                        <g key={ci}>
                                            <rect x={cx - 72} y={row.y + 4} width={144} height={30} rx={4} fill={fill} opacity={0.75} />
                                            <text x={cx} y={row.y + 24} textAnchor="middle" fill="#fff" fontSize={12}>{owner}</text>
                                        </g>
                                    );
                                })}
                            </g>
                        );
                    })}
                    {/* 例示ラベル */}
                    {[
                        { x: 80, label: 'Compute Engine' },
                        { x: 280, label: 'Cloud Run / App Engine' },
                        { x: 480, label: 'Google Workspace' },
                    ].map(col => (
                        <text key={col.label} x={col.x} y={254} textAnchor="middle" fill="var(--color-muted)" fontSize={10}>{col.label}</text>
                    ))}
                </svg>
                <div className="stitle">各モデルの使いどころ</div>
                <div className="tgrid">
                    <div className="titem">
                        <strong>IaaS</strong>
                        <p>OS・ミドルウェアを自分で管理したい場合。オンプレをそのままクラウドへ移行（リフト&シフト）。最大の柔軟性が必要なワークロード。</p>
                        <p><em>例: Compute Engine、Cloud Storage</em></p>
                    </div>
                    <div className="titem">
                        <strong>PaaS</strong>
                        <p>インフラ管理なしにアプリ開発に集中したい場合。開発者の生産性を最大化。</p>
                        <p><em>例: App Engine、Cloud Run、BigQuery</em></p>
                    </div>
                    <div className="titem">
                        <strong>SaaS</strong>
                        <p>インストール・管理不要でソフトウェアをすぐ使いたい場合。</p>
                        <p><em>例: Google Workspace（Gmail、Docs、Meet）</em></p>
                    </div>
                </div>
            </div>

            {/* 1.3 デプロイメントモデル */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">1.3</span>クラウドデプロイメントモデル</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>モデル</th>
                                <th>説明</th>
                                <th>適用場面</th>
                            </tr>
                        </thead>
                        <tbody>
                            {DEPLOYMENT_MODELS.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>{row.model}</strong></td>
                                    <td>{row.desc}</td>
                                    <td>{row.useCase}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: デプロイメントモデル選定</div>
                    <ul>
                        <li><strong>コスト優先</strong>: パブリッククラウドを選択。CapEx から OpEx へ転換</li>
                        <li><strong>規制対応</strong>: 金融・医療など規制産業ではハイブリッドを検討</li>
                        <li><strong>既存投資保護</strong>: オンプレの設備投資が残る場合はハイブリッドで段階移行</li>
                        <li><strong>ベンダー分散</strong>: 単一障害点を避けるためマルチクラウド戦略を検討</li>
                    </ul>
                </div>
            </div>

            {/* 1.4 DX の3つの柱 SVG */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">1.4</span>Google Cloud の DX を加速する3つの柱</div>
                <svg viewBox="0 0 640 180" className="cdl-svg" aria-label="DX の3つの柱" role="img">
                    {[
                        { x: 80, color: 'var(--cdl-blue)', title: 'インフラの近代化', items: ['オンプレ → クラウドへ移行', 'レガシーシステムの刷新', 'コスト削減・俊敏性向上'] },
                        { x: 280, color: 'var(--cdl-green)', title: 'データとAIの活用', items: ['データドリブン意思決定', 'AI/ML で業務自動化・予測', 'リアルタイム分析基盤'] },
                        { x: 480, color: 'var(--cdl-purple)', title: 'スマートアナリティクス', items: ['ビジネスインテリジェンス', '顧客インサイトの取得', '新ビジネスモデルの創出'] },
                    ].map(col => (
                        <g key={col.title}>
                            <rect x={col.x - 75} y={4} width={150} height={172} rx={8} fill={col.color} opacity={0.15} stroke={col.color} strokeWidth={1.5} />
                            <rect x={col.x - 75} y={4} width={150} height={34} rx={8} fill={col.color} opacity={0.85} />
                            <text x={col.x} y={26} textAnchor="middle" fill="#fff" fontSize={11} fontWeight="bold">{col.title}</text>
                            {col.items.map((item, ii) => (
                                <text key={ii} x={col.x} y={60 + ii * 28} textAnchor="middle" fill="var(--color-foreground)" fontSize={10}>{item}</text>
                            ))}
                        </g>
                    ))}
                </svg>
            </div>

            {/* 1.5 CapEx vs OpEx */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">1.5</span>CapEx vs OpEx（重要概念）</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>概念</th>
                                <th>説明</th>
                                <th>クラウドとの関係</th>
                            </tr>
                        </thead>
                        <tbody>
                            {CAPEX_OPEX.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>{row.concept}</strong></td>
                                    <td>{row.desc}</td>
                                    <td>{row.relation}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="ib">
                    <div className="ibt">試験ポイント</div>
                    <p>クラウドへの移行は CapEx を OpEx に転換する。これにより初期投資を抑え、需要変動に柔軟に対応できる。</p>
                </div>
            </div>

            {/* 1.6 Google Cloud の強み */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">1.6</span>Google Cloud の強み</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>強み</th>
                                <th>説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            {GCP_STRENGTHS.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>{row.strength}</strong></td>
                                    <td>{row.desc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 1.7 IaaS/PaaS/SaaS 管理責任表 */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">1.7</span>サービスモデル別 管理責任の分担</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>モデル</th>
                                <th>定義</th>
                                <th>ユースケース</th>
                                <th>ユーザー側の管理責任</th>
                            </tr>
                        </thead>
                        <tbody>
                            {SERVICE_MODEL_RESPONSIBILITY.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>{row.model}</strong></td>
                                    <td>{row.definition}</td>
                                    <td>{row.useCase}</td>
                                    <td>{row.userResponsibility}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 1.8 Cloud Adoption Framework */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">1.8</span>Cloud Adoption Framework（クラウド導入フレームワーク）</div>
                <p className="card-desc">Google Cloud が提供するクラウド移行成熟度モデル。技術・組織文化・プロセスを含めた全体論的なアプローチで、4つのテーマに基づく。</p>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>テーマ</th>
                                <th>説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ADOPTION_FRAMEWORK.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>{row.pillar}</strong></td>
                                    <td>{row.desc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
                    <h2>データとイノベーション — クラウドによるイノベーション</h2>
                    <p>データ価値・データ型・DB選択・BigQuery・分析パイプライン・Cloud Storage</p>
                </div>
            </div>

            {/* 2.1 データの価値とビジネス活用 */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">2.1</span>データの価値とビジネス活用</div>
                <p className="card-desc"><strong>データドリブン経営</strong>とは、勘や経験ではなくデータに基づいて意思決定を行う経営スタイルです。</p>
                <div className="stitle">データが生み出す4つのビジネス価値</div>
                <ol className="cdl-list">
                    <li><strong>過去の理解</strong>: 何が起きたかを把握（記述的分析）</li>
                    <li><strong>現状の把握</strong>: 今何が起きているかをリアルタイムで監視（診断的分析）</li>
                    <li><strong>未来の予測</strong>: 次に何が起きるかを予測（予測的分析）</li>
                    <li><strong>最適行動の提案</strong>: 何をすべきかをAIが提案（処方的分析）</li>
                </ol>
            </div>

            {/* 2.2 データの種類とアーキテクチャ */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">2.2</span>データの種類とストレージアーキテクチャ</div>
                <div className="tgrid">
                    <div className="titem">
                        <strong>構造化データ</strong>
                        <p>リレーショナルデータベースで管理される行・列形式のデータ。SQLでクエリ可能。</p>
                        <p><em>例: 顧客テーブル、注文履歴、会計データ</em></p>
                    </div>
                    <div className="titem">
                        <strong>半構造化データ</strong>
                        <p>スキーマは固定されていないが、タグや階層構造を持つデータ。</p>
                        <p><em>例: JSON、XML、ログファイル</em></p>
                    </div>
                    <div className="titem">
                        <strong>非構造化データ</strong>
                        <p>定義されたフォーマットを持たないデータ。クラウドが最も価値を解放する領域。</p>
                        <p><em>例: 画像、動画、音声、テキスト文書</em></p>
                    </div>
                </div>
                <div className="stitle">データリポジトリの設計</div>
                <div className="tgrid">
                    <div className="titem">
                        <strong>データウェアハウス</strong>
                        <p>高度に構造化・最適化されたデータセットを保存。BI ツールを用いた高速なクエリやレポーティングに特化。</p>
                        <p><em>GCP例: BigQuery</em></p>
                    </div>
                    <div className="titem">
                        <strong>データレイク</strong>
                        <p>あらゆる形式の生データをそのままのフォーマットで安価に大量保存。ML トレーニングデータや将来のデータ探索の基盤。</p>
                        <p><em>GCP例: Cloud Storage</em></p>
                    </div>
                    <div className="titem">
                        <strong>データレイクハウス</strong>
                        <p>データレイクの柔軟性とデータウェアハウスの管理・クエリ性能を兼ね備えた次世代アーキテクチャ。</p>
                        <p><em>GCP例: BigQuery + Cloud Storage 統合</em></p>
                    </div>
                </div>
            </div>

            {/* 2.3 データベースサービス一覧 */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">2.3</span>データベースサービス一覧</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>サービス</th>
                                <th>タイプ</th>
                                <th>特徴</th>
                                <th>適用場面</th>
                            </tr>
                        </thead>
                        <tbody>
                            {DB_SERVICES.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>{row.service}</strong></td>
                                    <td>{row.type}</td>
                                    <td>{row.feature}</td>
                                    <td>{row.useCase}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="stitle">DB選択デシジョンツリー</div>
                <pre className="codeblock">{`RDBが必要か？
├── YES: グローバルに強一貫性が必要 → Cloud Spanner
└── YES: リージョン内で十分      → Cloud SQL

NoSQLが必要か？
├── ドキュメント形式・リアルタイム → Firestore
├── 時系列・超大量データ         → Bigtable
└── キャッシュ・セッション        → Memorystore

分析・DWH用途                    → BigQuery
高性能HTAP（OLTP+分析）          → AlloyDB`}</pre>
            </div>

            {/* 2.4 データ分析サービス */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">2.4</span>データ分析サービス</div>

                <div className="stitle">Looker（エンタープライズBI）</div>
                <p className="card-desc"><strong>Looker</strong> は Google Cloud のエンタープライズ BI プラットフォーム。<strong>LookML</strong> という独自言語でデータ定義を一元管理し、全社員が同じ定義で一貫したデータを参照できる「<strong>真実の唯一の情報源</strong>」を実現する。BigQuery・Cloud SQL など主要 DB に直接接続し、経営ダッシュボード・売上レポート・顧客分析に活用される。</p>

                <div className="stitle">Looker Studio（セルフサービスBI）</div>
                <p className="card-desc">無料で使える<strong>セルフサービスBI</strong>/ダッシュボードツール。コードなしでインタラクティブなレポートを作成。Google Sheets・BigQuery・Google Analytics などと連携。</p>

                <div className="stitle">Google Cloud Dataflow</div>
                <p className="card-desc">フルマネージドのデータ処理パイプライン（<strong>Apache Beam</strong> ベース）。リアルタイム（ストリーミング）とバッチ処理の両方に対応。大量データの変換・集計・分析パイプラインを構築。<em>用途: ログ処理・IoTデータ変換・ETLパイプライン</em></p>

                <div className="stitle">Google Cloud Dataproc</div>
                <p className="card-desc">マネージド <strong>Apache Hadoop</strong>/Spark クラスタ。既存のHadoopワークロードをクラウドへ移行し、必要な時だけクラスタを起動してコスト削減。<em>用途: 大規模バッチデータ処理・ML パイプライン</em></p>

                <div className="stitle">Google Cloud Pub/Sub</div>
                <p className="card-desc">フルマネージドの<strong>メッセージングサービス</strong>。イベント駆動アーキテクチャの基盤として、1秒あたり数百万メッセージを処理可能。<em>用途: リアルタイムデータ取り込み・システム間の非同期連携</em></p>
            </div>

            {/* 2.5 スマートアナリティクスアーキテクチャ SVG */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">2.5</span>スマートアナリティクスのアーキテクチャ</div>
                <svg viewBox="0 0 700 160" className="cdl-svg" aria-label="スマートアナリティクスアーキテクチャ" role="img">
                    {[
                        { x: 50, label: 'データソース', sub: 'IoT・Webログ', color: 'var(--cdl-blue)' },
                        { x: 180, label: 'データ取り込み', sub: 'Pub/Sub', color: 'var(--cdl-cyan)' },
                        { x: 310, label: '処理・変換', sub: 'Dataflow / Dataproc', color: 'var(--cdl-green)' },
                        { x: 450, label: '格納', sub: 'BigQuery / Bigtable', color: 'var(--cdl-yellow)' },
                        { x: 580, label: '分析・可視化', sub: 'Looker / Vertex AI', color: 'var(--cdl-purple)' },
                    ].map((stage, i, arr) => (
                        <g key={stage.label}>
                            <rect x={stage.x - 55} y={30} width={110} height={64} rx={8} fill={stage.color} opacity={0.2} stroke={stage.color} strokeWidth={1.5} />
                            <text x={stage.x} y={58} textAnchor="middle" fill="#fff" fontSize={11} fontWeight="bold">{stage.label}</text>
                            <text x={stage.x} y={76} textAnchor="middle" fill="#fff" fontSize={9} opacity={0.8}>{stage.sub}</text>
                            {i < arr.length - 1 && (
                                <path d={`M${stage.x + 55} 62 L${(arr[i + 1]?.x ?? 0) - 55} 62`} stroke="var(--color-border)" strokeWidth={1.5} markerEnd="url(#arrow2)" />
                            )}
                        </g>
                    ))}
                    <defs>
                        <marker id="arrow2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                            <path d="M0,0 L6,3 L0,6 Z" fill="var(--color-border)" />
                        </marker>
                    </defs>
                </svg>
            </div>

            {/* 2.6 GCS ストレージクラス */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">2.6</span>Google Cloud Storage (GCS) ストレージクラス</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>クラス</th>
                                <th>アクセス頻度</th>
                                <th>最低保存期間</th>
                                <th>ユースケース</th>
                            </tr>
                        </thead>
                        <tbody>
                            {STORAGE_CLASSES.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>{row.name}</strong></td>
                                    <td>{row.frequency}</td>
                                    <td>{row.minRetention}</td>
                                    <td>{row.useCase}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: ストレージコスト最適化</div>
                    <ul>
                        <li><strong>ライフサイクルポリシー</strong>を設定して古いデータを自動的に低コストクラスへ移行</li>
                        <li>30日アクセスなし → Nearline、90日 → Coldline、365日以上 → Archive</li>
                        <li>不要データは自動削除ルールを設定</li>
                        <li><strong>バケットロック</strong>でコンプライアンス要件（WORM）に対応</li>
                    </ul>
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
                    <h2>インフラとモダナイゼーション — インフラとアプリのモダナイゼーション</h2>
                    <p>移行戦略6R・Compute Engine・GKE・Cloud Run・ネットワーク・GKE Enterprise・Apigee</p>
                </div>
            </div>

            {/* 3.1 移行戦略 6R */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">3.1</span>クラウドへの移行戦略（6つの R）</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>戦略</th>
                                <th>別名</th>
                                <th>説明</th>
                                <th>コスト</th>
                                <th>期間</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MIGRATION_6R.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>{row.strategy}</strong></td>
                                    <td>{row.alias}</td>
                                    <td>{row.desc}</td>
                                    <td>{row.cost}</td>
                                    <td>{row.duration}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="ib">
                    <div className="ibt">試験ポイント</div>
                    <p>「最も速く・安く移行する」= <strong>Rehost（リフト&シフト）</strong>。「クラウドのメリットを最大限活かす」= <strong>Refactor</strong>。</p>
                </div>
            </div>

            {/* 3.2 コンピューティングサービス詳細 */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">3.2</span>コンピューティングサービス詳細</div>

                <div className="stitle">Compute Engine（仮想マシン）</div>
                <p className="card-desc">Google Cloud の <strong>IaaS コンピューティングサービス</strong>。OS・ミドルウェア・アプリの完全制御と幅広いマシンタイプを提供。</p>
                <ul className="cdl-list">
                    <li><strong>Preemptible/Spot VM</strong>: 通常比最大 91% 安価。中断可能なバッチ処理向け</li>
                    <li><strong>Sustained Use Discount</strong>: 月の一定時間以上利用すると自動割引（最大 30%）</li>
                    <li><strong>Committed Use Discount</strong>: 1年・3年契約で最大 57% 割引</li>
                </ul>

                <div className="stitle">マシンタイプの種類</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>シリーズ</th>
                                <th>用途</th>
                                <th>特徴</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MACHINE_TYPES.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>{row.series}</strong></td>
                                    <td>{row.use}</td>
                                    <td>{row.feature}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="stitle">Google Kubernetes Engine（GKE）</div>
                <p className="card-desc"><strong>Kubernetes</strong> はコンテナ化されたアプリを自動的にデプロイ・スケール・管理するオープンソースプラットフォーム。</p>

                {/* コンテナ vs VM SVG */}
                <svg viewBox="0 0 560 200" className="cdl-svg" aria-label="コンテナ vs VM 比較図" role="img">
                    {/* VM 側 */}
                    <rect x={10} y={10} width={240} height={180} rx={8} fill="var(--cdl-red)" opacity={0.1} stroke="var(--cdl-red)" strokeWidth={1.5} />
                    <text x={130} y={30} textAnchor="middle" fill="var(--cdl-red)" fontSize={13} fontWeight="bold">従来の VM</text>
                    {[
                        { label: 'App A', y: 44, bg: 'var(--cdl-blue)' },
                        { label: 'バイナリ / Lib', y: 76, bg: 'var(--cdl-blue)' },
                        { label: 'ゲストOS', y: 108, bg: 'var(--cdl-red)' },
                        { label: 'Hypervisor', y: 140, bg: 'var(--cdl-red)' },
                        { label: 'ホストOS / HW', y: 162, bg: '#555' },
                    ].map(layer => (
                        <g key={layer.label}>
                            <rect x={30} y={layer.y} width={200} height={26} rx={4} fill={layer.bg} opacity={0.7} />
                            <text x={130} y={layer.y + 18} textAnchor="middle" fill="#fff" fontSize={11}>{layer.label}</text>
                        </g>
                    ))}
                    <text x={130} y={194} textAnchor="middle" fill="var(--color-muted)" fontSize={10}>重くて起動が遅い</text>

                    {/* コンテナ側 */}
                    <rect x={310} y={10} width={240} height={180} rx={8} fill="var(--cdl-green)" opacity={0.1} stroke="var(--cdl-green)" strokeWidth={1.5} />
                    <text x={430} y={30} textAnchor="middle" fill="var(--cdl-green)" fontSize={13} fontWeight="bold">コンテナ</text>
                    {[
                        { label: 'App A | App B', y: 44, bg: 'var(--cdl-blue)' },
                        { label: 'バイナリ / Lib', y: 76, bg: 'var(--cdl-blue)' },
                        { label: 'Container Runtime', y: 108, bg: 'var(--cdl-green)' },
                        { label: 'ホストOS / HW', y: 140, bg: '#555' },
                    ].map(layer => (
                        <g key={layer.label}>
                            <rect x={330} y={layer.y} width={200} height={26} rx={4} fill={layer.bg} opacity={0.7} />
                            <text x={430} y={layer.y + 18} textAnchor="middle" fill="#fff" fontSize={11}>{layer.label}</text>
                        </g>
                    ))}
                    <text x={430} y={194} textAnchor="middle" fill="var(--color-muted)" fontSize={10}>軽くて起動が速い</text>
                </svg>

                <div className="stitle">GKE の 2 つのモード</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>モード</th>
                                <th>ノード管理</th>
                                <th>課金</th>
                                <th>推奨場面</th>
                            </tr>
                        </thead>
                        <tbody>
                            {GKE_MODES.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>{row.mode}</strong></td>
                                    <td>{row.nodeManagement}</td>
                                    <td>{row.billing}</td>
                                    <td>{row.recommended}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="stitle">Cloud Run（サーバーレスコンテナ）</div>
                <p className="card-desc">コンテナをサーバーレスで実行するフルマネージドサービス。リクエストがない時は <strong>0スケール</strong>（コストゼロ）。リクエストに応じて自動スケール。<em>用途: HTTP/gRPC API・イベント処理・スパイクトラフィック対応</em></p>

                <div className="stitle">Cloud Run Functions（旧Cloud Functions）</div>
                <p className="card-desc">イベント駆動のサーバーレス関数（<strong>FaaS</strong>）。HTTP リクエスト・Pub/Sub・Cloud Storage イベントでトリガー。<em>用途: 軽量処理・Webhook・ETL・通知送信</em></p>

                <div className="stitle">App Engine</div>
                <p className="card-desc">PaaS の Web アプリプラットフォーム。<strong>Standard環境</strong>: Python・Node.js・Go・Java など対応。Flexible 環境: カスタムランタイム・Docker コンテナ対応。</p>

                <div className="stitle">コンピューティングサービス選択ガイド</div>
                <pre className="codeblock">{`OS・ミドルウェアの制御が必要         → Compute Engine
コンテナ + ステートフル/長時間処理    → GKE
コンテナ + ステートレス HTTP API      → Cloud Run
イベント駆動 + 短時間の小さな関数     → Cloud Run Functions
コード書くだけでOK（PaaS）           → App Engine
0スケールでコスト最小化              → Cloud Run / Cloud Run Functions`}</pre>
            </div>

            {/* 3.3 ネットワークサービス */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">3.3</span>ネットワークサービス</div>

                <div className="stitle">Virtual Private Cloud（VPC）</div>
                <p className="card-desc">Google Cloud の<strong>ソフトウェア定義ネットワーク</strong>。1つの VPC が<strong>グローバルに展開</strong>（リージョンをまたがる）。プロジェクトごとに分離されたネットワーク環境を構築。ファイアウォールルールで送受信トラフィックを細かく制御。</p>

                <div className="stitle">Cloud Load Balancing</div>
                <p className="card-desc"><strong>グローバルロードバランサー</strong>: 世界規模でトラフィックを分散（HTTP/HTTPS）。<strong>リージョナルロードバランサー</strong>: 特定リージョン内での負荷分散。自動スケーリング対応。</p>

                <div className="stitle">Cloud CDN（Content Delivery Network）</div>
                <p className="card-desc">Google のグローバルネットワークを使ってコンテンツをキャッシュ・高速配信。静的コンテンツ（画像・動画・CSS/JS）のレイテンシを大幅削減。</p>

                <div className="stitle">Cloud Interconnect / Cloud VPN</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>サービス</th>
                                <th>説明</th>
                                <th>帯域</th>
                                <th>用途</th>
                            </tr>
                        </thead>
                        <tbody>
                            {NETWORK_SERVICES.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>{row.service}</strong></td>
                                    <td>{row.desc}</td>
                                    <td>{row.bandwidth}</td>
                                    <td>{row.use}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 3.4 マネージドサービスと責任分担 SVG */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">3.4</span>マネージドサービスと責任分担</div>
                <p className="card-desc"><strong>マネージドサービス</strong>とは、インフラの管理（パッチ適用・スケーリング・バックアップ等）を Google が代わりに行うサービス。</p>
                <svg viewBox="0 0 680 200" className="cdl-svg" aria-label="マネージドサービスの責任分担" role="img">
                    {[
                        { x: 70, label: 'オンプレミス', layers: ['アプリ', 'ランタイム', 'OS', 'ミドルウェア', '仮想化', 'HW'], userCount: 6, color: 'var(--cdl-red)' },
                        { x: 230, label: 'IaaS (GCE)', layers: ['アプリ', 'ランタイム', 'OS', 'ミドルウェア [GCP]', '仮想化 [GCP]', 'HW [GCP]'], userCount: 4, color: 'var(--cdl-yellow)' },
                        { x: 400, label: 'PaaS (App Eng)', layers: ['アプリ', 'ランタイム [GCP]', 'OS [GCP]', 'MW [GCP]', '仮想化 [GCP]', 'HW [GCP]'], userCount: 2, color: 'var(--cdl-blue)' },
                        { x: 580, label: 'サーバーレス', layers: ['アプリ', 'ランタイム [GCP]', 'OS [GCP]', 'MW [GCP]', '仮想化 [GCP]', 'HW [GCP]'], userCount: 1, color: 'var(--cdl-green)' },
                    ].map(col => (
                        <g key={col.label}>
                            <text x={col.x} y={16} textAnchor="middle" fill="var(--color-foreground)" fontSize={10} fontWeight="bold">{col.label}</text>
                            {col.layers.map((layer, li) => {
                                const isUser = li < col.userCount;
                                return (
                                    <g key={li}>
                                        <rect x={col.x - 70} y={22 + li * 28} width={140} height={24} rx={4} fill={isUser ? col.color : '#444'} opacity={isUser ? 0.7 : 0.5} />
                                        <text x={col.x} y={22 + li * 28 + 16} textAnchor="middle" fill="#fff" fontSize={9}>{layer}</text>
                                    </g>
                                );
                            })}
                        </g>
                    ))}
                </svg>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: マネージドサービス活用</div>
                    <ul>
                        <li><strong>差別化されない重労働</strong>（インフラ管理・パッチ適用）はマネージドサービスに委譲</li>
                        <li>エンジニアはビジネス価値を生む<strong>アプリケーション開発に集中</strong></li>
                        <li>スケーリング設定より<strong>ビジネスロジックの実装</strong>に時間を使う</li>
                    </ul>
                </div>
            </div>

            {/* 3.5 マイクロサービスアーキテクチャ */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">3.5</span>マイクロサービスとアーキテクチャのモダナイゼーション</div>
                <p className="card-desc">Google Cloud Architecture Framework が示すベストプラクティスによれば、システムは密結合なモノリシック（一枚岩）アーキテクチャから脱却し、コンポーネントごとに独立してスケール・更新が可能な「<strong>疎結合（Decoupled）</strong>」かつ「<strong>ステートレス（状態を保持しない）</strong>」なマイクロサービスアーキテクチャへと移行すべきです。</p>
                <div className="tgrid">
                    <div className="titem">
                        <strong>モノリシックアーキテクチャ</strong>
                        <p>全機能が単一プロセスに統合。変更に時間がかかり、部分的なスケールが困難。</p>
                    </div>
                    <div className="titem">
                        <strong>マイクロサービスアーキテクチャ</strong>
                        <p>機能ごとに独立したサービスとして分割。各サービスが独立してデプロイ・スケール可能。</p>
                    </div>
                </div>
            </div>

            {/* 3.6 GKE Enterprise と ハイブリッド/マルチクラウド */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">3.6</span>GKE Enterprise と ハイブリッド/マルチクラウド</div>
                <p className="card-desc">企業の IT インフラは単一のパブリッククラウドだけで完結するとは限りません。法規制・データ主権・既存オンプレミス投資の観点から、ハイブリッドクラウドやマルチクラウド戦略を採用することが増えています。</p>
                <div className="tgrid">
                    <div className="titem">
                        <strong>GKE Enterprise（旧 Anthos）</strong>
                        <p>Google Cloud、他社クラウド、オンプレミス環境を組み合わせた分散環境を<strong>単一のコントロールパネル</strong>から統合管理。セキュリティポリシーやコンテナのオーケストレーションを一元化し、一貫した運用を実現。</p>
                    </div>
                    <div className="titem">
                        <strong>ハイブリッド/マルチクラウドの用途</strong>
                        <ul className="cdl-list">
                            <li>法規制・データ主権への対応</li>
                            <li>既存オンプレミス投資の保護</li>
                            <li>ベンダーロックイン回避</li>
                            <li>最適なサービスをプロバイダーをまたいで選択</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* 3.7 Apigee と API エコノミー */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">3.7</span>Apigee と API エコノミー</div>
                <p className="card-desc">モダナイゼーションの中核として、社内外のシステムをつなぐ <strong>API（Application Programming Interface）</strong> の重要性が増しています。API は単なる連携ツールではなく、企業のデータやサービスをパッケージ化し、サードパーティに提供することで新たな収益源を生み出すビジネス資産です。</p>
                <div className="tgrid">
                    <div className="titem">
                        <strong>Apigee（API管理プラットフォーム）</strong>
                        <p>フルライフサイクルの API 管理プラットフォーム。API のバージョン管理・セキュリティ担保（アクセス制御・DDoS 対策）・高度なトラフィック分析を提供。</p>
                    </div>
                    <div className="titem">
                        <strong>API マネタイゼーション（収益化）</strong>
                        <p>サブスクリプションや従量課金などの柔軟なモデルを用いた API の<strong>マネタイゼーション</strong>（収益化）を Apigee が強力に支援。API エコノミーへの参入を加速する。</p>
                    </div>
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
                    <h2>セキュリティと運用 — Google Cloud のセキュリティと運用</h2>
                    <p>共有責任モデル・Shared Fate・BeyondCorp・IAM・セキュリティサービス・コンプライアンス・費用管理</p>
                </div>
            </div>

            {/* 4.0 セキュリティ多層構造 SVG */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">4.0</span>Google Cloud セキュリティの多層構造</div>
                <p className="card-desc">Google Cloud は<strong>多層防御（Defense in Depth）</strong>とゼロトラストセキュリティの考え方を基本とします。</p>
                <svg viewBox="0 0 580 280" className="cdl-svg" aria-label="セキュリティ7層構造" role="img">
                    {[
                        { label: 'Layer 7: データ', sub: '暗号化・DLP・アクセス制御', color: 'var(--cdl-purple)', y: 20 },
                        { label: 'Layer 6: ユーザー', sub: 'IAM・MFA・Cloud Identity', color: 'var(--cdl-blue)', y: 58 },
                        { label: 'Layer 5: アプリ', sub: '脆弱性スキャン・Container Analysis', color: 'var(--cdl-cyan)', y: 96 },
                        { label: 'Layer 4: エンドポイント', sub: 'Chrome Enterprise・BeyondCorp', color: 'var(--cdl-green)', y: 134 },
                        { label: 'Layer 3: ネットワーク', sub: 'VPC・ファイアウォール・Cloud Armor', color: 'var(--cdl-yellow)', y: 172 },
                        { label: 'Layer 2: インフラ', sub: 'Shielded VMs・Confidential Computing', color: 'var(--cdl-red)', y: 210 },
                        { label: 'Layer 1: ハードウェア', sub: 'Titan チップ・物理セキュリティ', color: '#666', y: 248 },
                    ].map((layer, i) => {
                        const width = 560 - i * 24;
                        const x = (580 - width) / 2;
                        return (
                            <g key={layer.label}>
                                <rect x={x} y={layer.y} width={width} height={32} rx={4} fill={layer.color} opacity={0.8} />
                                <text x={290} y={layer.y + 13} textAnchor="middle" fill="#fff" fontSize={11} fontWeight="bold">{layer.label}</text>
                                <text x={290} y={layer.y + 27} textAnchor="middle" fill="#fff" fontSize={9} opacity={0.9}>{layer.sub}</text>
                            </g>
                        );
                    })}
                </svg>
            </div>

            {/* 4.1 リソース階層 */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">4.1</span>リソース階層（Resource Hierarchy）</div>
                <pre className="codeblock">{`組織（Organization）
    │
    ├── フォルダ（Folder）← 部門・環境（Dev/Prod）でグループ化
    │       │
    │       ├── プロジェクト（Project）← 課金単位、API 管理
    │       │       │
    │       │       └── リソース（VM・GCS・DB 等）
    │       │
    │       └── プロジェクト（Project）
    │
    └── フォルダ（Folder）

ポリシーは上位から下位へ継承される（上書き不可）`}</pre>
                <div className="ib">
                    <div className="ibt">重要: 継承の原則（ポリシーの加算性）</div>
                    <p>上位階層で設定した IAM ポリシーは、下位階層にすべて<strong>継承</strong>される（拒否はできない、追加のみ）。IAM ポリシーは「追加のみ」で、上位で付与した権限は下位でも有効。</p>
                </div>
            </div>

            {/* 4.2 IAM 詳細 */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">4.2</span>IAM（Identity and Access Management）</div>
                <p className="card-desc">IAM は「<strong>誰が（Who）・何を（Permission）・どのリソースに（Resource）できるか</strong>」を制御するサービスです。</p>

                <div className="stitle">メンバー（誰が）の種類</div>
                <ul className="cdl-list">
                    <li><strong>Google アカウント</strong>（個人ユーザー）</li>
                    <li><strong>サービスアカウント</strong>（アプリ・VM・サービス用）</li>
                    <li><strong>Google グループ</strong>（複数ユーザーのまとめ）</li>
                    <li><strong>Cloud Identity ドメイン</strong></li>
                </ul>

                <div className="stitle">ロールの種類</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>ロール種別</th>
                                <th>説明</th>
                                <th>推奨度</th>
                            </tr>
                        </thead>
                        <tbody>
                            {IAM_ROLES.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>{row.roleType}</strong></td>
                                    <td>{row.desc}</td>
                                    <td>{row.recommendation}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="bp">
                    <div className="bpt">IAM ベストプラクティス</div>
                    <ol className="cdl-list">
                        <li><strong>最小権限の原則</strong>: 必要最小限のロールのみを付与</li>
                        <li><strong>グループ管理</strong>: 個人ではなくグループにロールを付与</li>
                        <li><strong>サービスアカウントキー</strong>: 可能な限り発行せず、<strong>Workload Identity Federation</strong> を使用</li>
                        <li><strong>定期レビュー</strong>: 不要なロールの付与を定期的に棚卸し</li>
                        <li><strong>2段階認証（MFA）</strong>: 全ユーザーに強制する</li>
                    </ol>
                </div>
            </div>

            {/* 4.3 主要セキュリティサービス */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">4.3</span>主要セキュリティサービス</div>

                <div className="stitle">Cloud Identity-Aware Proxy（Cloud IAP）</div>
                <p className="card-desc">VPN なしで社内アプリへの<strong>コンテキストアウェアアクセス</strong>を実現。ユーザーの ID・デバイス・場所に基づいてアクセスを制御。<strong>BeyondCorp Enterprise</strong> の核心コンポーネント。</p>

                <div className="stitle">Cloud Armor</div>
                <p className="card-desc">Web アプリの <strong>DDoS</strong> 保護・<strong>WAF（Web アプリファイアウォール）</strong>。SQLインジェクション・XSS など OWASP Top 10 脆弱性をブロック。IP・地域ベースのアクセス制御。Cloud Load Balancing と統合。</p>

                <div className="stitle">Secret Manager</div>
                <p className="card-desc">API キー・パスワード・TLS 証明書などの<strong>機密情報を安全に管理</strong>。アプリのコードにシークレットをハードコードしない。自動ローテーション・アクセスログを提供。</p>

                <div className="stitle">Cloud Key Management Service（Cloud KMS）</div>
                <p className="card-desc"><strong>暗号化キーの集中管理サービス</strong>。<strong>CMEK（Customer-Managed Encryption Keys）</strong> で顧客自身が暗号鍵を管理し、データを完全自社管理。ハードウェアセキュリティモジュール（HSM）対応。</p>

                <div className="stitle">Security Command Center</div>
                <p className="card-desc">Google Cloud リソース全体の<strong>セキュリティ脅威・脆弱性を一元可視化</strong>。リスクの検出・優先順位付け・修復のガイダンスを提供。コンプライアンス状況のダッシュボード。</p>

                <div className="stitle">Sensitive Data Protection（旧 Cloud DLP）</div>
                <p className="card-desc">データ内の個人情報（PII）・機密情報を<strong>自動検出・分類・マスキング</strong>。BigQuery・Cloud Storage などに格納されたデータをスキャン。GDPR・HIPAA 等のコンプライアンス対応に必須。</p>
            </div>

            {/* 4.4 コンプライアンスと規制対応 */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">4.4</span>コンプライアンスと規制対応</div>
                <p className="card-desc">Google Cloud は多数の第三者認証・コンプライアンスフレームワークに対応しています。</p>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>規制/認証</th>
                                <th>対象業界</th>
                                <th>説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            {COMPLIANCE_CERTS.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>{row.cert}</strong></td>
                                    <td>{row.industry}</td>
                                    <td>{row.desc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 4.5 クラウドオペレーション */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">4.5</span>クラウドオペレーション（Cloud Observability）</div>

                <div className="stitle">Cloud Monitoring</div>
                <p className="card-desc"><strong>メトリクスの収集・可視化・アラート</strong>。CPU 使用率・レイテンシ・エラー率などを継続監視。アップタイムチェックでサービスの死活監視。</p>

                <div className="stitle">Cloud Logging</div>
                <p className="card-desc">GCP 全サービスのログを<strong>一元収集・保存・分析</strong>。<strong>監査ログ（Audit Logs）</strong>: 誰がいつ何をしたかを記録（Admin Activity は常時有効・無効化不可）。ログシンクで BigQuery・Cloud Storage へ転送して長期分析。</p>

                <div className="stitle">Cloud Trace</div>
                <p className="card-desc">アプリケーションの<strong>分散トレーシング</strong>（レイテンシ分析）。マイクロサービス間のリクエスト経路と処理時間を可視化。</p>

                <div className="stitle">Cloud Profiler</div>
                <p className="card-desc"><strong>本番アプリのパフォーマンスプロファイリング</strong>。CPU とメモリ消費の原因箇所を特定（オーバーヘッドが非常に小さい）。</p>

                <div className="bp">
                    <div className="bpt">オペレーション ベストプラクティス</div>
                    <ul>
                        <li><strong>SLO ベースのアラート設定</strong>: 症状ベースのアラートでノイズを減らす</li>
                        <li><strong>ログバケットの保持期間設定</strong>: デフォルトは 30 日。コンプライアンス要件に応じて延長</li>
                        <li><strong>予算アラート</strong>: 予算の 50%・90%・100% 消費時に通知を設定</li>
                        <li><strong>Active Assist（推奨）</strong>: GCP が自動でコスト削減・パフォーマンス改善を提案</li>
                    </ul>
                </div>
            </div>

            {/* 4.6 費用管理と最適化 */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">4.6</span>費用管理と最適化</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>概念</th>
                                <th>説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            {COST_MODEL.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>{row.concept}</strong></td>
                                    <td>{row.desc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="stitle">費用最適化のアプローチ</div>
                <ol className="cdl-list">
                    <li><strong>右サイズ化（Right-sizing）</strong>: 過剰スペックの VM をダウンサイズ</li>
                    <li><strong>使われていないリソースの削除</strong>: 停止中の VM・未使用の IP アドレス</li>
                    <li><strong>ストレージクラスの最適化</strong>: アクセス頻度に応じたクラス選択</li>
                    <li><strong>Spot VM の活用</strong>: バッチ処理・CI/CD などに</li>
                    <li><strong>Committed Use の適用</strong>: 安定したワークロードには長期契約が得</li>
                </ol>

                <div className="stitle">Google Cloud Billing の管理ツール</div>
                <ul className="cdl-list">
                    <li><strong>予算アラート</strong>: 月次予算を設定し、閾値超過時に通知</li>
                    <li><strong>Cost Table</strong>: プロジェクト・サービス別のコスト内訳</li>
                    <li><strong>BigQuery への課金データエクスポート</strong>: 詳細分析・カスタムレポート</li>
                    <li><strong>Recommender（Active Assist）</strong>: AI によるコスト削減・セキュリティ改善の推奨</li>
                </ul>
            </div>

            {/* 4.7 責任共有モデルと Shared Fate */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">4.7</span>責任共有モデルと Shared Fate</div>
                <div className="tgrid">
                    <div className="titem">
                        <strong>責任共有モデル（Shared Responsibility Model）</strong>
                        <p>Google Cloud が基盤インフラ（データセンター・ハードウェア・ネットワーク）の保護に責任を持ち、顧客はサービスレイヤーに応じた責任（OS パッチ・IAM 設定・データアクセス制御など）を負うという概念。</p>
                    </div>
                    <div className="titem">
                        <strong>Shared Fate（共有の運命）</strong>
                        <p>Google Cloud 独自のアプローチ。クラウドベンダーが責任境界を引いて顧客を突き放すのではなく、検証済みのセキュリティブループリント・セキュアな IaC・サイバー保険オプションを提供し、顧客のリスク管理に積極的に関与して<strong>共同でセキュリティ成果を達成</strong>する理念。</p>
                    </div>
                </div>
            </div>

            {/* 4.8 BeyondCorp ゼロトラスト */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">4.8</span>BeyondCorp とゼロトラストアーキテクチャ</div>
                <p className="card-desc">従来のオンプレミス環境で主流だった「境界防御モデル（ファイアウォールで脅威を遮断）」は、テレワークやクラウドの普及によりもはや有効ではありません。</p>
                <p className="card-desc">Google Cloud は、内部ネットワークであっても暗黙の信頼を置かず、すべてのユーザーとデバイスのアクセス要求に対して、その都度コンテキスト（身元・場所・デバイスの安全性など）を動的に検証する<strong>ゼロトラスト</strong>モデルである <strong>BeyondCorp</strong> アプローチを採用しています。</p>
                <div className="ib">
                    <div className="ibt">ゼロトラストの原則</div>
                    <p>「決して信頼せず、常に検証する（Never Trust, Always Verify）」— ネットワーク内にいるからといって安全とは限らない。</p>
                </div>
            </div>

            {/* 4.9 CMEK とデータレジデンシ */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">4.9</span>CMEK とデータレジデンシ・データ主権</div>
                <div className="tgrid">
                    <div className="titem">
                        <strong>CMEK（顧客管理暗号化キー）</strong>
                        <p>Google Cloud に保存されるデータはデフォルトで暗号化されます。さらに機密性の高い要件を満たすため、顧客自身が <strong>Cloud KMS</strong> で暗号鍵を管理する <strong>CMEK</strong> を利用し、データの制御を完全に自社管理にできます。</p>
                    </div>
                    <div className="titem">
                        <strong>データレジデンシとデータ主権</strong>
                        <p>欧州の GDPR などに代表される<strong>データレジデンシ</strong>（データの地理的保管要件）に対応するため、ユーザー自身がデータを保存するリージョンを指定し、他リージョンへの移動を制限する<strong>データ主権</strong>の制御機能を Google Cloud は強力にサポートしています。</p>
                    </div>
                </div>
            </div>

            {/* 4.10 サポート階層 */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">4.10</span>Google Cloud サポート階層</div>
                <div className="ib">
                    <div className="ibt">注</div>
                    <p>以下のサポート料金・SLA 情報は 2026-04-06 時点の公式ドキュメントに基づく。最新情報は公式サポートページでご確認ください。</p>
                </div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>サポート階層</th>
                                <th>月額コスト</th>
                                <th>SLA（レスポンスタイム）</th>
                                <th>主要な特徴</th>
                            </tr>
                        </thead>
                        <tbody>
                            {SUPPORT_TIERS.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>{row.tier}</strong></td>
                                    <td>{row.cost}</td>
                                    <td>{row.sla}</td>
                                    <td>{row.features}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 4.11 Active Assist */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">4.11</span>Active Assist による継続的な最適化</div>
                <p className="card-desc"><strong>Active Assist</strong> は、機械学習を用いて顧客のクラウド利用状況を継続的に分析し、インテリジェントな推奨事項（レコメンデーション）を提示するポートフォリオです。</p>
                <div className="tgrid">
                    {[
                        { cat: 'コスト', ex: 'アイドル状態の VM の特定・削除推奨' },
                        { cat: 'セキュリティ', ex: '過剰な IAM 権限の検出' },
                        { cat: 'パフォーマンス', ex: '過剰プロビジョニングインスタンスの Right-sizing 提案' },
                        { cat: '信頼性', ex: '単一障害点の検出' },
                        { cat: 'サステナビリティ', ex: '炭素排出量の削減推奨' },
                    ].map(item => (
                        <div key={item.cat} className="titem">
                            <strong>{item.cat}</strong>
                            <p>{item.ex}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 4.12 SRE・DevOps・DR */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">4.12</span>SRE・DevOps・ディザスタリカバリ</div>
                <div className="tgrid">
                    <div className="titem">
                        <strong>SRE（Site Reliability Engineering）</strong>
                        <p>開発と運用を融合させた DevOps アプローチを実践するための枠組み。SLO（Service Level Objective）・SLI・エラーバジェットを中心に高い可用性を維持します。</p>
                    </div>
                    <div className="titem">
                        <strong>ディザスタリカバリ（DR）</strong>
                        <p>単一障害点（SPOF）を排除し、Cloud Load Balancing のグローバル Anycast IP を使用して複数リージョンにトラフィックをインテリジェントに分散するアーキテクチャを採用します。</p>
                    </div>
                </div>
            </div>

            {/* 4.13 Carbon Footprint とサステナビリティ */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">4.13</span>Carbon Footprint とサステナビリティ</div>
                <p className="card-desc">Google Cloud は、顧客の環境負荷を測定し削減を支援するための <strong>Carbon Footprint</strong> ツールを提供しています。データセンターの機器レベルでの詳細な電力監視データに基づき、プロジェクト・プロダクトごとに炭素排出量をダッシュボードで正確に可視化します。</p>
                <div className="bp">
                    <div className="bpt">サステナビリティ ベストプラクティス</div>
                    <ul>
                        <li>Carbon Footprint を用いて排出量の多い<strong>カーボンホットスポット</strong>を特定</li>
                        <li>時間的制約のないバッチ処理ワークロードを、再生可能エネルギーの供給比率が高い（炭素強度が低い）リージョンにスケジューリング</li>
                        <li>Active Assist と連携して非稼働状態のリソースを積極的に廃止</li>
                        <li>Google Cloud は 2007 年からカーボンニュートラル達成済み</li>
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
                    <h2>AI/ML — Google Cloud の AI によるイノベーション</h2>
                    <p>AI 原則・Vertex AI・生成 AI・Gemini・RAG</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">5.1</span>Google AI 原則 — 責任ある AI（Responsible AI）</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>7つの原則</th>
                                <th>説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            {AI_PRINCIPLES.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>{row.principle}</strong></td>
                                    <td>{row.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="stitle">追及しない 4 つの用途</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>対象</th>
                                <th>説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            {AI_NOT_PURSUE.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>{row.target}</strong></td>
                                    <td>{row.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 5.2 AI・ML 階層 SVG */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">5.2</span>AI・ML・深層学習・生成 AI の包含関係（最重要）</div>
                <p className="tdesc">
                    試験で最も基本的かつ頻出の概念です。
                    AI ⊃ ML ⊃ 深層学習 ⊃ 生成AI ⊃ LLM の入れ子構造（包含関係）を理解することが最重要です。
                    AI が最も広い概念、LLM が最も狭い概念です。
                    「生成AI = LLM」は<strong>誤り</strong>。LLM はテキスト生成専門ですが、
                    生成AI には画像生成（Imagen）・動画生成（Veo）・音楽生成なども含まれます。
                    深層学習とは多層ニューラルネットワークを使った ML であり、画像認識・音声認識・翻訳に活用されます。
                </p>
                <svg
                    role="img"
                    aria-label="AI・ML・深層学習・生成AI・LLM の包含関係図"
                    viewBox="0 0 560 340"
                    className="diagram-svg"
                >
                    {/* AI 最外層 */}
                    <rect x="10" y="10" width="540" height="320" rx="12" fill="#e8f4f8" stroke="#5b9bd5" strokeWidth="2" />
                    <text x="30" y="38" fontSize="15" fontWeight="bold" fill="#1a4a72">AI（人工知能 / Artificial Intelligence）</text>
                    <text x="30" y="56" fontSize="12" fill="#2c5f8a">「人間の知的行動をコンピュータで模倣する技術全般」</text>

                    {/* ML 層 */}
                    <rect x="30" y="68" width="500" height="248" rx="10" fill="#d4e9f7" stroke="#2980b9" strokeWidth="2" />
                    <text x="50" y="92" fontSize="14" fontWeight="bold" fill="#1a5276">ML（機械学習 / Machine Learning）</text>
                    <text x="50" y="108" fontSize="11" fill="#1f618d">「データからパターンを自動学習する」　代表例: スパムフィルタ・需要予測</text>

                    {/* 深層学習 層 */}
                    <rect x="50" y="118" width="460" height="184" rx="8" fill="#c3dff2" stroke="#1a6fa3" strokeWidth="2" />
                    <text x="70" y="140" fontSize="13" fontWeight="bold" fill="#154360">深層学習（Deep Learning）</text>
                    <text x="70" y="156" fontSize="11" fill="#1a5276">「多層ニューラルネットワーク」　代表例: 画像認識・音声認識・翻訳</text>

                    {/* 生成AI 層 */}
                    <rect x="70" y="166" width="420" height="122" rx="6" fill="#aed6f1" stroke="#117a8b" strokeWidth="2" />
                    <text x="90" y="188" fontSize="13" fontWeight="bold" fill="#0e6655">生成 AI（Generative AI）</text>
                    <text x="90" y="204" fontSize="11" fill="#117a65">「新しいテキスト・画像・音声・動画を生成できる AI」</text>
                    <text x="90" y="220" fontSize="11" fill="#117a65">例: Gemini（テキスト）・Imagen（画像）・Veo（動画）</text>

                    {/* LLM 層 */}
                    <rect x="90" y="230" width="380" height="48" rx="5" fill="#85c1e9" stroke="#0a5a6e" strokeWidth="2" />
                    <text x="280" y="250" fontSize="13" fontWeight="bold" fill="#0a3d5f" textAnchor="middle">LLM（大規模言語モデル）</text>
                    <text x="280" y="268" fontSize="11" fill="#0a3d5f" textAnchor="middle">「テキスト生成に特化した超大規模モデル」　例: Gemini・GPT-4・Claude</text>
                </svg>

                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>概念</th>
                                <th>定義</th>
                                <th>具体例</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>AI（人工知能）</strong></td>
                                <td>人間の知的行動をコンピュータで模倣する技術全般</td>
                                <td>チェスプログラム・Siri・自動運転</td>
                            </tr>
                            <tr>
                                <td><strong>ML（機械学習）</strong></td>
                                <td>データからパターンを自動学習する AI の手法</td>
                                <td>スパムフィルタ・需要予測・顧客セグメント</td>
                            </tr>
                            <tr>
                                <td><strong>深層学習（DL）</strong></td>
                                <td>多層のニューラルネットワークを使った ML</td>
                                <td>画像認識・音声認識・翻訳</td>
                            </tr>
                            <tr>
                                <td><strong>生成 AI</strong></td>
                                <td>新しいテキスト・画像・音声・動画を生成できる AI</td>
                                <td>Gemini・Imagen・Veo</td>
                            </tr>
                            <tr>
                                <td><strong>LLM</strong></td>
                                <td>テキスト生成に特化した超大規模な言語モデル</td>
                                <td>Gemini・GPT-4・Claude</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 5.3 機械学習 3 アプローチ */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">5.3</span>機械学習の 3 つのアプローチ</div>
                <p className="tdesc">
                    機械学習には「教師あり学習」「教師なし学習」「強化学習」の 3 つのアプローチがあります。
                    データの形式と学習方法が異なるため、ユースケースによって使い分けます。
                    RLHF（人間フィードバックによる強化学習）は Gemini の品質向上にも活用されています。
                </p>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>アプローチ</th>
                                <th>データ形式</th>
                                <th>代表タスク</th>
                                <th>GCP 活用例</th>
                                <th>ビジネス活用例</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ML_APPROACHES.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>{row.approach}</strong></td>
                                    <td>{row.dataFormat}</td>
                                    <td>{row.tasks}</td>
                                    <td>{row.gcpExample}</td>
                                    <td>{row.businessExample}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="stitle">教師あり学習のビジネス活用例</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>業界</th>
                                <th>ユースケース</th>
                                <th>入力データ</th>
                                <th>予測対象</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>金融</td><td>与信審査</td><td>年収・勤続年数・取引履歴</td><td>返済可能か</td></tr>
                            <tr><td>EC</td><td>購買予測</td><td>閲覧・購買履歴</td><td>購入確率</td></tr>
                            <tr><td>医療</td><td>疾患診断支援</td><td>検査データ・画像</td><td>疾患の有無</td></tr>
                            <tr><td>製造</td><td>品質検査</td><td>センサーデータ・画像</td><td>不良品か否か</td></tr>
                            <tr><td>マーケティング</td><td>離脱予測</td><td>顧客行動ログ</td><td>解約確率</td></tr>
                        </tbody>
                    </table>
                </div>
                <div className="stitle">教師なし学習のビジネス活用例</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>ユースケース</th>
                                <th>説明</th>
                                <th>効果</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td><strong>顧客セグメンテーション</strong></td><td>購買パターンで自動的に顧客グループを発見</td><td>ターゲットマーケティングの精度向上</td></tr>
                            <tr><td><strong>不正検知</strong></td><td>正常な取引パターンから逸脱したものを検知</td><td>事前定義不要で新種の不正も検知</td></tr>
                            <tr><td><strong>レコメンドエンジン</strong></td><td>「この商品を見た人はこれも見ている」を発見</td><td>顧客体験向上・クロスセル強化</td></tr>
                            <tr><td><strong>文書分類</strong></td><td>大量のドキュメントを内容でグループ化</td><td>情報管理・ナレッジ整理</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 5.4 AI サービス層スペクトラム SVG */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">5.4</span>Google Cloud AI サービスの階層構造（サービス選択の指針）</div>
                <p className="tdesc">
                    Google Cloud の AI サービスは「使いやすさ」と「カスタマイズ性」のバランスで 4 層に分かれています。
                    <strong>プリビルト API</strong>（ML 知識不要・即座に利用）→ AutoML（ノーコードでカスタムモデル）→
                    Vertex AI（<strong>カスタムモデル</strong>・フル制御）→ 生成 AI サービスの順にステップアップします。
                    まずプリビルト AI API から試し、精度が不十分なら AutoML、さらに高い要件なら Vertex AI カスタムモデルを検討します。
                </p>
                <svg
                    role="img"
                    aria-label="Google Cloud AI サービス層スペクトラム"
                    viewBox="0 0 700 200"
                    className="diagram-svg"
                >
                    {/* 軸 */}
                    <text x="10" y="20" fontSize="12" fill="#555">◀ 使いやすさ重視</text>
                    <text x="530" y="20" fontSize="12" fill="#555">カスタマイズ重視 ▶</text>
                    <line x1="10" y1="28" x2="690" y2="28" stroke="#aaa" strokeWidth="1" />

                    {/* Layer 1: プリビルト API */}
                    <rect x="10" y="38" width="155" height="130" rx="8" fill="#d5e8d4" stroke="#82b366" strokeWidth="2" />
                    <text x="87" y="62" fontSize="12" fontWeight="bold" fill="#1a5c1a" textAnchor="middle">プリビルト AI API</text>
                    <text x="87" y="80" fontSize="10" fill="#2e7d32" textAnchor="middle">ML 知識不要</text>
                    <text x="87" y="96" fontSize="10" fill="#2e7d32" textAnchor="middle">コード最小</text>
                    <text x="87" y="112" fontSize="10" fill="#2e7d32" textAnchor="middle">即座に利用開始</text>
                    <text x="87" y="128" fontSize="10" fill="#2e7d32" textAnchor="middle">低コスト</text>
                    <text x="87" y="148" fontSize="11" fontWeight="bold" fill="#1b5e20" textAnchor="middle">Vision / NL / Speech</text>
                    <text x="87" y="162" fontSize="11" fontWeight="bold" fill="#1b5e20" textAnchor="middle">Translation / Document AI</text>

                    {/* Layer 2: AutoML */}
                    <rect x="178" y="38" width="155" height="130" rx="8" fill="#dae8fc" stroke="#6c8ebf" strokeWidth="2" />
                    <text x="255" y="62" fontSize="12" fontWeight="bold" fill="#1a3c6e" textAnchor="middle">AutoML（ノーコード）</text>
                    <text x="255" y="80" fontSize="10" fill="#1f4e8c" textAnchor="middle">ML 知識少し必要</text>
                    <text x="255" y="96" fontSize="10" fill="#1f4e8c" textAnchor="middle">独自データで学習</text>
                    <text x="255" y="112" fontSize="10" fill="#1f4e8c" textAnchor="middle">数時間で完成</text>
                    <text x="255" y="128" fontSize="10" fill="#1f4e8c" textAnchor="middle">中コスト</text>
                    <text x="255" y="148" fontSize="11" fontWeight="bold" fill="#1a3a6e" textAnchor="middle">AutoML Vision</text>
                    <text x="255" y="162" fontSize="11" fontWeight="bold" fill="#1a3a6e" textAnchor="middle">AutoML Tables / NL</text>

                    {/* Layer 3: Vertex AI カスタムモデル */}
                    <rect x="346" y="38" width="175" height="130" rx="8" fill="#fff2cc" stroke="#d6b656" strokeWidth="2" />
                    <text x="433" y="62" fontSize="12" fontWeight="bold" fill="#7d4f00" textAnchor="middle">Vertex AI（フルコード）</text>
                    <text x="433" y="80" fontSize="10" fill="#8a5500" textAnchor="middle">ML 専門知識必要</text>
                    <text x="433" y="96" fontSize="10" fill="#8a5500" textAnchor="middle">カスタムモデル</text>
                    <text x="433" y="112" fontSize="10" fill="#8a5500" textAnchor="middle">数週間〜数ヶ月</text>
                    <text x="433" y="128" fontSize="10" fill="#8a5500" textAnchor="middle">高コスト</text>
                    <text x="433" y="148" fontSize="11" fontWeight="bold" fill="#7d4f00" textAnchor="middle">Vertex AI Training</text>
                    <text x="433" y="162" fontSize="11" fontWeight="bold" fill="#7d4f00" textAnchor="middle">Model Garden</text>

                    {/* Layer 4: 生成 AI */}
                    <rect x="534" y="38" width="156" height="130" rx="8" fill="#f8cecc" stroke="#b85450" strokeWidth="2" />
                    <text x="612" y="62" fontSize="12" fontWeight="bold" fill="#7d1f1a" textAnchor="middle">生成 AI サービス</text>
                    <text x="612" y="80" fontSize="10" fill="#8c2a24" textAnchor="middle">ビジネス活用重視</text>
                    <text x="612" y="96" fontSize="10" fill="#8c2a24" textAnchor="middle">即座〜数時間</text>
                    <text x="612" y="112" fontSize="10" fill="#8c2a24" textAnchor="middle">API 課金</text>
                    <text x="612" y="132" fontSize="11" fontWeight="bold" fill="#7d1f1a" textAnchor="middle">Gemini・Vertex AI</text>
                    <text x="612" y="148" fontSize="11" fontWeight="bold" fill="#7d1f1a" textAnchor="middle">Studio・Agent</text>
                    <text x="612" y="162" fontSize="11" fontWeight="bold" fill="#7d1f1a" textAnchor="middle">Builder</text>
                </svg>
            </div>

            {/* 5.5 プリビルト AI API 表（7行） */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">5.5</span>プリビルト AI API — 事前学習済みモデル（7 種）</div>
                <p className="tdesc">
                    プリビルト AI API は、Google が膨大なデータで事前学習済みのモデルを API として公開したサービスです。
                    ML の専門知識不要で即座に利用開始でき、学習コスト・インフラ管理も不要です。
                    まずプリビルト AI API から試し、精度が不十分であれば AutoML でカスタムモデルを検討します。
                </p>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>API</th>
                                <th>カテゴリ</th>
                                <th>主な機能・ユースケース</th>
                            </tr>
                        </thead>
                        <tbody>
                            {PREBUILT_APIS.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>{row.api}</strong></td>
                                    <td>{row.category}</td>
                                    <td>{row.desc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="stitle">各 API の詳細</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>API</th>
                                <th>入力</th>
                                <th>出力</th>
                                <th>主な用途</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Vision API</strong></td>
                                <td>画像・動画フレーム</td>
                                <td>ラベル・テキスト・顔情報</td>
                                <td>画像認識・OCR・不適切コンテンツ検出・ランドマーク認識・ロゴ検出</td>
                            </tr>
                            <tr>
                                <td><strong>Natural Language API</strong></td>
                                <td>テキスト</td>
                                <td>感情・エンティティ・分類</td>
                                <td>感情分析（ポジ/ネガ/中立）・エンティティ抽出・構文解析・コンテンツ分類（700以上のカテゴリ）</td>
                            </tr>
                            <tr>
                                <td><strong>Translation API</strong></td>
                                <td>テキスト（任意言語）</td>
                                <td>翻訳済みテキスト</td>
                                <td>130以上の言語間翻訳・自動言語検出・ドキュメント翻訳（PDF/Wordのレイアウト保持）・Glossary対応</td>
                            </tr>
                            <tr>
                                <td><strong>Speech-to-Text</strong></td>
                                <td>音声ファイル・ストリーム</td>
                                <td>テキスト</td>
                                <td>125以上の言語・方言対応・話者分離・リアルタイムおよびバッチ処理・カスタム音声モデル</td>
                            </tr>
                            <tr>
                                <td><strong>Text-to-Speech</strong></td>
                                <td>テキスト</td>
                                <td>音声ファイル</td>
                                <td>40以上の言語・220以上の音声・WaveNet音声・IVR・アクセシビリティ対応・感情・速度・ピッチのカスタマイズ</td>
                            </tr>
                            <tr>
                                <td><strong>Video Intelligence API</strong></td>
                                <td>動画ファイル</td>
                                <td>シーン・物体・テキスト情報</td>
                                <td>シーン変換検出・物体追跡・コンテンツモデレーション・音声文字起こし・人物検出</td>
                            </tr>
                            <tr>
                                <td><strong>Document AI API</strong></td>
                                <td>PDF・画像文書</td>
                                <td>構造化データ（JSON）</td>
                                <td>30以上の業界固有文書処理・請求書/領収書/契約書/身分証明書・Human-in-the-Loop対応</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 5.6 AutoML サービス表 */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">5.6</span>AutoML — ノーコード ML（独自データでカスタムモデル）</div>
                <p className="tdesc">
                    AutoML は ML の専門知識なしに独自データからカスタム ML モデルを構築できるサービスです。
                    従来 ML エンジニアが数週間〜数ヶ月かけて実施する作業を、数時間〜1日・ML 知識不要で完結します。
                    Google の AutoML が内部で最適なモデルアーキテクチャの自動選択、ハイパーパラメータの自動チューニング（Neural Architecture Search）、データ拡張の自動適用を実施します。
                </p>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>AutoML サービス</th>
                                <th>対象データ</th>
                                <th>機能・ユースケース</th>
                            </tr>
                        </thead>
                        <tbody>
                            {AUTOML_SERVICES.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>{row.service}</strong></td>
                                    <td>{row.target}</td>
                                    <td>{row.desc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="stitle">AutoML の利用手順（AutoML Tables を例に）</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>ステップ</th>
                                <th>内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td><strong>Step 1</strong></td><td>データの準備・アップロード（CSV または BigQuery テーブル。最低1,000件、推奨10,000件以上）</td></tr>
                            <tr><td><strong>Step 2</strong></td><td>目的変数（ターゲット）の設定 — 予測したい列を選択（例: 「解約済みフラグ」）</td></tr>
                            <tr><td><strong>Step 3</strong></td><td>トレーニング実行 — 予算（最大トレーニング時間）を設定して「トレーニング開始」ボタンをクリック</td></tr>
                            <tr><td><strong>Step 4</strong></td><td>モデルの評価 — 精度・再現率・AUC を自動計算。特徴量重要度（どの変数が予測に重要か）を確認</td></tr>
                            <tr><td><strong>Step 5</strong></td><td>デプロイ・予測 API — ボタン1つでエンドポイントとしてデプロイ。REST API で新しいデータの予測結果を取得</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 5.7 Vertex AI コンポーネント表（9行） */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">5.7</span>Vertex AI — 統合 ML プラットフォーム（9 コンポーネント）</div>
                <p className="tdesc">
                    Vertex AI は ML ライフサイクル全体（データ準備→学習→評価→デプロイ→監視）を一つのプラットフォームで管理できる統合 ML 基盤です。
                    2021年に複数の個別 ML サービス（AI Platform・AutoML・Explainable AI・Prediction Service 等）が統合されました。
                    データサイエンティストとエンジニアの協業が容易になり、MLOps（ML の DevOps）を実現します。
                    Model Monitoring はデータドリフト・予測ドリフトを自動検知し、アラートを発報・再学習を自動トリガーします。
                </p>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>コンポーネント</th>
                                <th>役割・機能</th>
                            </tr>
                        </thead>
                        <tbody>
                            {VERTEX_COMPONENTS.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>{row.component}</strong></td>
                                    <td>{row.desc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 5.8 Gemini モデル表（4種） */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">5.8</span>Gemini — Google の基盤モデルファミリー</div>
                <p className="tdesc">
                    Gemini は Google DeepMind が開発したフラッグシップのマルチモーダル基盤モデルです。
                    テキスト・画像・音声・動画・コードを統合的に理解・生成できます。
                    Gemini 1.5 Pro/Flash は最大 100 万トークン（約70万語・映画脚本750本分）のコンテキストウィンドウを持ち、長大な文書やコードベース全体をまとめて処理できます。
                    Google の全サービスに統合されていく次世代 AI です。
                </p>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>モデル</th>
                                <th>コンテキスト</th>
                                <th>特徴と主なユースケース</th>
                            </tr>
                        </thead>
                        <tbody>
                            {GEMINI_MODELS.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>{row.model}</strong></td>
                                    <td>{row.context}</td>
                                    <td>{row.useCase}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="stitle">Google 基盤モデルファミリー全体</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>モデル</th>
                                <th>タイプ</th>
                                <th>入力</th>
                                <th>出力</th>
                                <th>試験キーワード</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td><strong>Gemini 2.5 Pro</strong></td><td>マルチモーダル LLM</td><td>テキスト・画像・音声・動画</td><td>テキスト・コード</td><td>最高性能・複雑な推論・100万トークン超</td></tr>
                            <tr><td><strong>Gemini 2.5 Flash</strong></td><td>マルチモーダル LLM</td><td>テキスト・画像・音声・動画</td><td>テキスト・コード</td><td>性能とコストのバランス・RAG・100万トークン超</td></tr>
                            <tr><td><strong>Gemini 2.5 Flash-Lite</strong></td><td>マルチモーダル LLM</td><td>テキスト・画像・音声・動画</td><td>テキスト・コード</td><td>高速・低コスト・大量処理・長文コンテキスト</td></tr>
                            <tr><td><strong>Gemini 2.0 Flash</strong></td><td>マルチモーダル LLM</td><td>テキスト・画像・音声・動画</td><td>テキスト・コード</td><td>エージェント・チャット・100万トークン</td></tr>
                            <tr><td><strong>Gemma</strong></td><td>オープンウェイト LLM</td><td>テキスト</td><td>テキスト</td><td>OSS・自己ホスト・ベンダーロックイン回避・機密データ保護</td></tr>
                            <tr><td><strong>Imagen</strong></td><td>画像生成</td><td>テキスト</td><td>画像</td><td>拡散モデル・SynthID 透かし・商用利用・EC商品画像</td></tr>
                            <tr><td><strong>Veo</strong></td><td>動画生成</td><td>テキスト・画像</td><td>動画</td><td>動画生成・シネマティック・広告プロトタイプ</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 5.9 Gemini for Workspace + NotebookLM */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">5.9</span>Gemini for Workspace と NotebookLM</div>
                <p className="tdesc">
                    Gemini for Workspace は Gmail・Docs・Sheets・Slides・Meet に Gemini の AI 機能を直接組み込むアドオンです。
                    ビジネスユーザーが普段使うツールの中で AI を活用でき、メール作成時間 30〜50% 短縮・会議準備・議事録作成の自動化・繰り返し作業の大幅削減・言語の壁を超えたグローバルコラボレーションが実現します。
                </p>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>アプリ</th>
                                <th>AI 機能</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Gmail</strong></td>
                                <td>長いメールスレッドの自動要約・返信メールのドラフト自動生成・トーン調整（丁寧・カジュアル・簡潔に）</td>
                            </tr>
                            <tr>
                                <td><strong>Google Docs</strong></td>
                                <td>アウトラインからドキュメントを自動生成・既存文書の要約・翻訳・改善提案・社内ドキュメントへの質問応答</td>
                            </tr>
                            <tr>
                                <td><strong>Google Sheets</strong></td>
                                <td>自然言語で数式を自動生成（「売上の前年比を計算して」）・データからインサイトを自動抽出・可視化・予測分析</td>
                            </tr>
                            <tr>
                                <td><strong>Google Slides</strong></td>
                                <td>テキストからプレゼンスライドを自動生成・画像・デザインの自動提案（Imagen と連携）・スピーカーノートの自動生成</td>
                            </tr>
                            <tr>
                                <td><strong>Google Meet</strong></td>
                                <td>会議のリアルタイム文字起こし・会議終了後の自動サマリーとアクション項目抽出・遅刻者向けのキャッチアップ機能</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="stitle">NotebookLM</div>
                <p className="tdesc">
                    NotebookLM は、ドキュメント（PDF・URL・Google Docs 等）を「ソース」として設定し、そのソースだけを参照して質問応答・要約・ポッドキャスト生成を行うツールです。
                    ソースに基づいた回答のみを生成するため<strong>ハルシネーション（でたらめ回答）を大幅に低減</strong>します。
                    社内文書・報告書・研究論文の分析に最適であり、知識ワーカー（ナレッジワーカー）向けの AI ツールです。
                </p>
            </div>

            {/* 5.10 Vertex AI Agent Builder */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">5.10</span>Vertex AI Agent Builder — AI エージェントの構築</div>
                <p className="tdesc">
                    AI エージェントとは、LLM が「ツールを使いながら自律的に複数ステップのタスクを実行できる」システムです。
                    通常の LLM は受動的（質問に答えるだけ）ですが、AI エージェントは能動的・自律的に行動します。
                    例えば「来週の水曜日、東京から大阪の新幹線を予約して」と依頼すると、カレンダー確認・新幹線検索・座席予約・確認メール送信まで自律的に実行します。
                </p>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>コンポーネント</th>
                                <th>説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Agent Designer（ローコード UI）</strong></td>
                                <td>ビジュアルインターフェースでエージェントを設計。ノーコードでエージェントのフローを定義</td>
                            </tr>
                            <tr>
                                <td><strong>Agent Development Kit（ADK）</strong></td>
                                <td>Python・Java でカスタムエージェントをコーディング。オープンソース（GitHub で公開）。複雑なロジック・カスタムツールの実装</td>
                            </tr>
                            <tr>
                                <td><strong>Agent Engine（マネージドランタイム）</strong></td>
                                <td>デプロイ・スケーリング・監視を自動管理。セッション管理・長期メモリ（Memory Bank）。実行ログ・トレースの可視化</td>
                            </tr>
                            <tr>
                                <td><strong>利用可能なツール</strong></td>
                                <td>Google Search・Vertex AI Search・Code Interpreter・外部 API（REST/GraphQL）・BigQuery・Cloud SQL・Google Workspace（Gmail・Calendar・Drive）・カスタム関数</td>
                            </tr>
                            <tr>
                                <td><strong>マルチエージェント</strong></td>
                                <td>複数の専門エージェントが協調して複雑なタスクを処理。例: リサーチ・執筆・校正エージェントが連携してレポートを自動生成</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 5.11 RAG SVG 図 */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">5.11</span>RAG（Retrieval-Augmented Generation）— 検索拡張生成</div>
                <p className="tdesc">
                    RAG（検索拡張生成）は LLM に「外部知識ベースから関連情報を検索して渡す」技術です。
                    LLM が抱える①ハルシネーション ②知識のカットオフ ③非公開情報を知らない という根本的な課題を解決します。
                    ベクトルデータベースに文書を埋め込み（Embedding）として格納し、ユーザーの質問と意味的に近い文書を高速検索します。
                </p>
                <svg
                    role="img"
                    aria-label="RAG（Retrieval-Augmented Generation）の仕組み図"
                    viewBox="0 0 700 260"
                    className="diagram-svg"
                >
                    {/* タイトル */}
                    <text x="350" y="22" fontSize="14" fontWeight="bold" fill="#333" textAnchor="middle">RAG の仕組み — 通常の LLM vs RAG</text>

                    {/* 通常のLLM（左側） */}
                    <rect x="10" y="34" width="320" height="210" rx="8" fill="#ffeeba" stroke="#ffc107" strokeWidth="2" />
                    <text x="170" y="56" fontSize="12" fontWeight="bold" fill="#856404" textAnchor="middle">通常の LLM（ハルシネーションリスクあり）</text>
                    <rect x="30" y="66" width="120" height="34" rx="5" fill="#fff3cd" stroke="#ffc107" strokeWidth="1" />
                    <text x="90" y="88" fontSize="11" fill="#856404" textAnchor="middle">ユーザーの質問</text>
                    <line x1="150" y1="83" x2="190" y2="83" stroke="#856404" strokeWidth="1.5" markerEnd="url(#arrow1)" />
                    <rect x="190" y="66" width="100" height="34" rx="5" fill="#ffe8a1" stroke="#ffc107" strokeWidth="1" />
                    <text x="240" y="88" fontSize="11" fill="#856404" textAnchor="middle">LLM のみ</text>
                    <text x="170" y="120" fontSize="11" fill="#856404" textAnchor="middle">↓</text>
                    <rect x="50" y="128" width="220" height="46" rx="5" fill="#f8d7da" stroke="#f5c6cb" strokeWidth="1" />
                    <text x="160" y="148" fontSize="11" fill="#721c24" textAnchor="middle">❌ 自社情報を知らない</text>
                    <text x="160" y="165" fontSize="11" fill="#721c24" textAnchor="middle">❌ ハルシネーション発生</text>
                    <text x="170" y="192" fontSize="11" fill="#856404" textAnchor="middle">例: 「弊社の製品保証は一般的に1年です」</text>
                    <text x="170" y="208" fontSize="11" fill="#721c24" textAnchor="middle">（自社情報でなく一般情報を回答）</text>

                    {/* RAG（右側） */}
                    <rect x="360" y="34" width="330" height="210" rx="8" fill="#d4edda" stroke="#28a745" strokeWidth="2" />
                    <text x="525" y="56" fontSize="12" fontWeight="bold" fill="#155724" textAnchor="middle">RAG（ハルシネーション大幅低減）</text>

                    {/* Step 1: ユーザー質問 */}
                    <rect x="375" y="66" width="110" height="30" rx="4" fill="#c3e6cb" stroke="#28a745" strokeWidth="1" />
                    <text x="430" y="86" fontSize="11" fill="#155724" textAnchor="middle">ユーザーの質問</text>

                    {/* ① 検索 */}
                    <line x1="485" y1="81" x2="510" y2="81" stroke="#155724" strokeWidth="1.5" />
                    <rect x="510" y="66" width="160" height="30" rx="4" fill="#b8daff" stroke="#004085" strokeWidth="1" />
                    <text x="590" y="80" fontSize="10" fill="#004085" textAnchor="middle">① ベクトルデータベース</text>
                    <text x="590" y="93" fontSize="10" fill="#004085" textAnchor="middle">（Vector DB）で類似検索</text>

                    {/* ② コンテキスト拡張 */}
                    <text x="525" y="118" fontSize="11" fill="#155724" textAnchor="middle">↓ ② 関連文書を取得してプロンプトに追加</text>

                    {/* LLM */}
                    <rect x="430" y="128" width="185" height="30" rx="4" fill="#c3e6cb" stroke="#28a745" strokeWidth="1" />
                    <text x="522" y="148" fontSize="11" fill="#155724" textAnchor="middle">③ LLM が文書を参照して回答生成</text>

                    <text x="525" y="178" fontSize="11" fill="#155724" textAnchor="middle">↓</text>
                    <rect x="375" y="185" width="295" height="46" rx="5" fill="#d4edda" stroke="#28a745" strokeWidth="1" />
                    <text x="522" y="205" fontSize="11" fill="#155724" textAnchor="middle">✅ 「弊社の製品保証期間は購入日から3年間です」</text>
                    <text x="522" y="222" fontSize="11" fill="#155724" textAnchor="middle">（保証規定 P.3 参照）← 根拠付き回答</text>
                </svg>

                <div className="stitle">RAG のメリットと Google Cloud での実装</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>観点</th>
                                <th>内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td><strong>ハルシネーション低減</strong></td><td>外部文書を根拠とした回答を生成するため、事実と異なる内容の生成を大幅に削減</td></tr>
                            <tr><td><strong>最新情報対応</strong></td><td>ベクトルデータベースのデータを更新するだけで知識を最新化（モデル再学習不要）</td></tr>
                            <tr><td><strong>自社情報活用</strong></td><td>社内文書・製品マニュアル・FAQ など非公開情報に基づく回答が可能</td></tr>
                            <tr><td><strong>根拠の明示</strong></td><td>回答に引用元（ソース）を提示できるため信頼性・透明性が向上</td></tr>
                            <tr><td><strong>GCP: Vertex AI Search</strong></td><td>最も簡単・プリビルト。エンタープライズ検索と RAG を統合</td></tr>
                            <tr><td><strong>GCP: Vertex AI RAG Engine</strong></td><td>カスタム RAG パイプラインを構築したい場合</td></tr>
                            <tr><td><strong>GCP: Grounding with Google Search</strong></td><td>リアルタイム Web 検索で最新情報を補完（知識カットオフ問題を解消）</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 5.12 ハルシネーション・ファインチューニング・グラウンディング */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">5.12</span>生成 AI の活用技術 — ハルシネーション・グラウンディング・ファインチューニング</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>技術</th>
                                <th>定義・仕組み</th>
                                <th>対策・活用方法</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>ハルシネーション（幻覚）</strong></td>
                                <td>LLM が事実と異なる内容を自信を持った形で生成する現象。LLM が「正確な事実」ではなく「もっともらしい文章」を確率的に予測するため発生する。例: 実在しない人物の受賞歴・間違った医療情報・動かないコードを正確として出力</td>
                                <td>RAG・グラウンディング・Human-in-the-Loop（重要な決定に人間のレビューを挟む）・低 Temperature 設定・ファクトチェック機能の組み込み</td>
                            </tr>
                            <tr>
                                <td><strong>グラウンディング（Grounding）</strong></td>
                                <td>LLM の回答を「信頼できる外部データソース」に根拠付ける技術。RAG の上位概念（RAG はグラウンディングの一実装方法）。①自社データ（社内文書・製品マニュアル・FAQ）②Google 検索（リアルタイム Web 情報）③サードパーティ（天気・株価・為替等）の 3 種類がある</td>
                                <td>Vertex AI Search（自社データ）・Grounding with Google Search（最新 Web 情報）・Vertex AI RAG Engine（カスタムパイプライン）</td>
                            </tr>
                            <tr>
                                <td><strong>ファインチューニング（Fine-tuning）</strong></td>
                                <td>事前学習済み基盤モデルを自社固有データで追加学習させる技術。モデルの「重み（パラメータ）」自体を更新する。SFT（教師あり微調整）・RLHF（人間フィードバックによる強化学習。ChatGPT・Gemini の品質向上に活用）・PEFT/LoRA（少ないパラメータで効率的に微調整）の手法がある</td>
                                <td>特定ドメインの専門用語・文体の習得・特定フォーマットの出力を安定生成・業界固有知識の深い理解に活用。高品質なデータセット作成と GPU コストが必要</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="stitle">3 技術の使い分け比較</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>比較項目</th>
                                <th>RAG / グラウンディング</th>
                                <th>ファインチューニング</th>
                                <th>プロンプトエンジニアリング</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td><strong>目的</strong></td><td>最新・自社情報を反映</td><td>ドメイン知識・文体の習得</td><td>出力の最適化</td></tr>
                            <tr><td><strong>データ更新</strong></td><td>リアルタイム更新可能</td><td>再学習が必要</td><td>不要</td></tr>
                            <tr><td><strong>コスト</strong></td><td>中程度</td><td>高い（GPU 学習）</td><td>低い</td></tr>
                            <tr><td><strong>ハルシネーション対策</strong></td><td>◎ 効果的</td><td>△ 一部改善</td><td>△ 限定的</td></tr>
                            <tr><td><strong>GCP サービス</strong></td><td>Vertex AI Search・RAG Engine</td><td>Vertex AI Training</td><td>Vertex AI Studio</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 5.13 責任ある AI 6 原則表 */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">5.13</span>責任ある AI（Responsible AI）— 6 つの核心原則</div>
                <p className="tdesc">
                    AI が引き起こす可能性のある問題（差別・偏見、ハルシネーション、プライバシー侵害、フェイクニュース・ディープフェイク、ブラックボックス問題）に対処するために、Google は責任ある AI の原則を全製品・研究に適用しています。
                    公平性・説明責任・透明性・プライバシー保護は試験で特に頻出の原則です。
                </p>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>原則</th>
                                <th>説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            {RESPONSIBLE_AI_PRINCIPLES.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>{row.principle}</strong></td>
                                    <td>{row.desc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="stitle">AI のバイアスの種類と対策</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>バイアスの種類</th>
                                <th>説明</th>
                                <th>例</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td><strong>選択バイアス</strong></td><td>学習データが特定の集団に偏っている</td><td>医療 AI の学習データが白人男性中心 → 他の人種に精度が低い</td></tr>
                            <tr><td><strong>確証バイアス</strong></td><td>既存の偏見を強化する方向に学習が進む</td><td>採用 AI が「男性エンジニアが多い」現状を「正解」として学習</td></tr>
                            <tr><td><strong>測定バイアス</strong></td><td>データの収集・ラベリング方法自体に偏りがある</td><td>アノテーターの文化的背景が正解ラベルに影響する</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 5.14 プライバシー保護技術表 */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">5.14</span>プライバシー保護技術（試験頻出）</div>
                <p className="tdesc">
                    AI・データ処理においてプライバシーを保護するための 3 つの主要技術です。
                    GDPR（EU個人データ保護規則）や医療情報保護法（HIPAA）などの規制対応にも密接に関連します。
                    匿名化は再識別が不可能なため GDPR の適用外となりますが、仮名化は紐付けテーブルで再識別が可能なため GDPR が適用されます。
                </p>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>手法</th>
                                <th>説明</th>
                                <th>具体例</th>
                            </tr>
                        </thead>
                        <tbody>
                            {PRIVACY_TECHNIQUES.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>{row.technique}</strong></td>
                                    <td>{row.desc}</td>
                                    <td>{row.example}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 5.15 BigQuery ML */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">5.15</span>BigQuery ML — SQL で ML モデルを作成</div>
                <p className="tdesc">
                    BigQuery ML（BQML）は、BigQuery 内で SQL 文を書くだけで ML モデルを作成・学習・評価・予測できる機能です。
                    データをエクスポートして別の環境で学習させる必要がなく、データが存在する BigQuery 上で直接 ML を実行できます。
                    データサイエンティストでなくても SQL を知っていれば ML モデルを構築できるため、ビジネスアナリストによる ML 活用を促進します。
                </p>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>特徴</th>
                                <th>内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            {BQML_FEATURES.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>{row.feature}</strong></td>
                                    <td>{row.desc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 5.16 Explainable AI */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">5.16</span>Explainable AI（説明可能な AI / XAI）</div>
                <p className="tdesc">
                    Explainable AI（XAI）は、AI がなぜその判断をしたかを人間が理解できる形で説明する技術です。
                    EU AI Act・金融規制などで「判断根拠の説明」が義務化されており、規制対応として必須です。
                    また、誤判断の原因特定・バイアスの発見・ユーザーの AI への信頼醸成に不可欠です。
                    Vertex Explainable AI は特徴量重要度の提示・注意機構の可視化（ヒートマップ）・SHAP（Shapley Additive Explanations）による影響量の数値化を提供します。
                </p>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>機能</th>
                                <th>説明</th>
                                <th>活用例</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>特徴量重要度（Feature Importance）</strong></td>
                                <td>どの入力変数が予測に最も影響を与えたかを数値で表示</td>
                                <td>「この融資否認は『収入』60%・『負債比率』30%・『勤続年数』10% の影響」→ 顧客への説明責任を果たせる</td>
                            </tr>
                            <tr>
                                <td><strong>注意機構の可視化（Attention Visualization）</strong></td>
                                <td>画像分類において、モデルが注目した領域をヒートマップで表示</td>
                                <td>「この画像のどの部分を見て猫と判断したか」をヒートマップで表示。誤判断の原因特定が容易</td>
                            </tr>
                            <tr>
                                <td><strong>SHAP（Shapley Additive Explanations）</strong></td>
                                <td>ゲーム理論に基づき各特徴量が予測に与えた影響量を正確に数値化</td>
                                <td>複数の特徴量が複雑に絡み合うモデルでも公平な貢献度を算出。医療診断・採用判定・ローン審査の説明に活用</td>
                            </tr>
                        </tbody>
                    </table>
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
                    <h2>頻出サービス早見表</h2>
                    <p>試験直前に見直すべき主要サービスのまとめ</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">6.1</span>7.1 コンピューティング</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>サービス</th>
                                <th>キーワード</th>
                                <th>使い分け</th>
                            </tr>
                        </thead>
                        <tbody>
                            {QR_COMPUTE.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>{row.service}</strong></td>
                                    <td>{row.keywords}</td>
                                    <td>{row.usecase}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">6.2</span>7.2 ストレージ・データベース</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>サービス</th>
                                <th>キーワード</th>
                                <th>使い分け</th>
                            </tr>
                        </thead>
                        <tbody>
                            {QR_STORAGE_DB.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>{row.service}</strong></td>
                                    <td>{row.keywords}</td>
                                    <td>{row.usecase}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">6.3</span>7.3 AI・ML</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>サービス</th>
                                <th>キーワード</th>
                                <th>対象者・用途</th>
                            </tr>
                        </thead>
                        <tbody>
                            {QR_AIML.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>{row.service}</strong></td>
                                    <td>{row.keywords}</td>
                                    <td>{row.usecase}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">6.4</span>7.4 セキュリティ</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>サービス</th>
                                <th>キーワード</th>
                                <th>役割</th>
                            </tr>
                        </thead>
                        <tbody>
                            {QR_SECURITY.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>{row.service}</strong></td>
                                    <td>{row.keywords}</td>
                                    <td>{row.usecase}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">6.5</span>7.5 オペレーション</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>サービス</th>
                                <th>キーワード</th>
                                <th>役割</th>
                            </tr>
                        </thead>
                        <tbody>
                            {QR_OPS.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>{row.service}</strong></td>
                                    <td>{row.keywords}</td>
                                    <td>{row.usecase}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
                    <h2>試験攻略チェックリスト</h2>
                    <p>必ず押さえるべき概念・混同しやすいポイント・学習ロードマップ・試験当日のポイント</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">7.1</span>必ず押さえるべき概念（各セクション）</div>
                <div className="tgrid">
                    {CHECKLIST_CONCEPTS.map((list, i) => (
                        <div key={i} className="titem">
                            <strong>{list.section}</strong>
                            <ul className="cdl-list">
                                {list.items.map((item, j) => (
                                    <li key={j}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">7.2</span>よく混同されるポイント</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>間違いやすい組み合わせ</th>
                                <th>正しい理解</th>
                            </tr>
                        </thead>
                        <tbody>
                            {CONFUSING_PAIRS.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>{row.pair}</strong></td>
                                    <td>{row.truth}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">7.3</span>推奨学習ロードマップ</div>
                {ROADMAP_WEEKS.map((rw, i) => (
                    <div key={i} style={{ marginBottom: '1rem' }}>
                        <div className="stitle">{rw.week}</div>
                        <ul className="cdl-list">
                            {rw.items.map((item, j) => (
                                <li key={j}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">7.4</span>試験当日のポイント</div>
                <ol className="cdl-list">
                    {EXAM_TIPS.map((tip, i) => (
                        <li key={i}><strong>{tip.split(':')[0]}</strong>: {tip.split(':')[1]}</li>
                    ))}
                </ol>
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
                    <h2>参照リソース — 公式ドキュメント・試験登録</h2>
                    <p>公式参照リソース一覧</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">8.1</span>公式参照リソース一覧</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>リソース</th>
                                <th>URL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {REFERENCE_LINKS.map((row, i) => (
                                <tr key={i}>
                                    <td>{row.title}</td>
                                    <td><a href={row.url} target="_blank" rel="noopener noreferrer">{row.url}</a></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
                        全9セクション
                    </span>
                    <span className="hero-badge">
                        <span className="dot dot-red" />
                        試験時間 90分
                    </span>
                    <span className="hero-badge">
                        <span className="dot dot-yellow" />
                        50–60問
                    </span>
                    <span className="hero-badge">
                        <span className="dot dot-green" />
                        推奨経験 6ヶ月+
                    </span>
                </div>
            </section>

            <nav className="snav" role="navigation" aria-label="セクションナビゲーション">
                <div className="snav-inner">
                    <a href="#s0" className="snav-link"><span className="snav-num">00</span>試験概要</a>
                    <a href="#s1" className="snav-link"><span className="snav-num">01</span>DX基礎</a>
                    <a href="#s2" className="snav-link"><span className="snav-num">02</span>データ</a>
                    <a href="#s3" className="snav-link"><span className="snav-num">03</span>インフラ</a>
                    <a href="#s4" className="snav-link"><span className="snav-num">04</span>セキュリティ</a>
                    <a href="#s5" className="snav-link"><span className="snav-num">05</span>AI/ML</a>
                    <a href="#s6" className="snav-link"><span className="snav-num">06</span>早見表</a>
                    <a href="#s7" className="snav-link"><span className="snav-num">07</span>攻略</a>
                    <a href="#s8" className="snav-link"><span className="snav-num">08</span>リソース</a>
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
                <p>Cloud Digital Leader 認定試験 包括的解説 — 2026 Edition</p>
            </footer>
        </div>
    );
}
