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
                <div className="pct-badge pb1">17%</div>
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
                <div className="pct-badge pb2">16%</div>
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
                            <text x={stage.x} y={58} textAnchor="middle" fill="var(--color-foreground)" fontSize={11} fontWeight="bold">{stage.label}</text>
                            <text x={stage.x} y={76} textAnchor="middle" fill="var(--color-muted)" fontSize={9}>{stage.sub}</text>
                            {i < arr.length - 1 && (
                                <path d={`M${stage.x + 55} 62 L${arr[i + 1].x - 55} 62`} stroke="var(--color-border)" strokeWidth={1.5} markerEnd="url(#arrow2)" />
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
                    <p>Compute Engine・GKE・Cloud Run・ハイブリッドクラウド・Anthos</p>
                </div>
                <div className="pct-badge pb3">30%</div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">3.1</span>コンピューティングの選択</div>
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
                            {COMPUTE_SERVICES.map((row, i) => (
                                <tr key={i}>
                                    <td><strong>{row.service}</strong></td>
                                    <td>{row.keyword}</td>
                                    <td>{row.usage}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
                    <p>共有責任モデル・IAM・リソース階層・セキュリティ製品・運用ツール</p>
                </div>
                <div className="pct-badge pb4">30%</div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">4.1</span>リソース階層（Resource Hierarchy）</div>
                <pre className="codeblock">{`組織 (Organization)  ← 会社全体、GWS/Cloud Identity と紐付け
└── フォルダ (Folders)  ← 部門、環境（Dev/Prod）
    └── プロジェクト (Projects)  ← 課金単位、API管理
        └── リソース (Resources)  ← VM, DB, Bucket`}</pre>
                <div className="ib">
                    <div className="ibt">重要: 継承の原則</div>
                    <p>上位階層で設定した IAM ポリシーは、下位階層にすべて<strong>継承</strong>される（拒否はできない、追加のみ）。</p>
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
                <div className="pct-badge pb5">5%</div>
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
        </div>
    );
}

function Section6() {
    return (
        <div id="s6" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn6">06</div>
                <div className="sec-head-txt">
                    <h2>サービス早見表 — 混同ペアの整理</h2>
                    <p>コンピューティング・分析・コスト管理の重要ペア</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">6.1</span>よく混同されるサービスペア</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>混同ペア</th>
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
                    <p>セクション別チェックリスト・学習ロードマップ</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">7.1</span>推奨学習ロードマップ</div>
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
                            {RESOURCES.map((row, i) => (
                                <tr key={i}>
                                    <td>{row.name}</td>
                                    <td><a href={`https://${row.url}`} target="_blank" rel="noopener noreferrer">{row.url}</a></td>
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
