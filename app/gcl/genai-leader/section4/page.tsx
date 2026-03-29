import type { Metadata } from 'next';
import { Playfair_Display, DM_Mono } from 'next/font/google';
import './section4.css';

const playfairDisplay = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '700', '800'],
    variable: '--font-playfair-display',
    display: 'swap',
});

const dmMono = DM_Mono({
    subsets: ['latin'],
    weight: ['300', '400', '500'],
    variable: '--font-dm-mono',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Section 4: Gen AI ビジネス戦略 | Generative AI Leader',
    description:
        'Generative AI Leader 試験 Section 4 — Gen AI 実装ステップ・セキュアな AI・責任ある AI を経営者視点で完全解説',
};

/* ── Section 4.1: Gen AI ソリューションの成功実装ステップ ── */
function Section41() {
    return (
        <section id="s41">
            <div className="sec-h sh-amber">
                <div className="sec-num sn-a">4.1</div>
                <div>
                    <h2>Gen AI ソリューションの成功実装ステップ</h2>
                    <p>ビジネスニーズの特定からROI測定まで、Google Cloud が推奨する変革的 Gen AI 導入の全プロセスを理解する</p>
                </div>
                <div className="sec-badge sb-amber">試験頻出</div>
            </div>

            <div className="card">
                <div className="card-h">📋 Gen AI ソリューションの種類と特性</div>
                <p style={{ fontSize: '14px', lineHeight: 1.8, marginBottom: '16px' }}>
                    試験では「どのビジネス課題に、どの Gen AI ソリューションタイプが適切か」を判断する問題が出る。
                </p>

                <table className="ctbl">
                    <thead>
                        <tr>
                            <th>ソリューションタイプ</th>
                            <th>代表的なビジネスユースケース</th>
                            <th>Google Cloud サービス例</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ color: 'var(--amber)', fontFamily: 'var(--mono)' }}>テキスト生成</td>
                            <td>マーケティングコンテンツ自動作成・契約書ドラフト・多言語カスタマーサポート</td>
                            <td>Gemini API, Gemini for Workspace Docs</td>
                        </tr>
                        <tr>
                            <td style={{ color: 'var(--amber)', fontFamily: 'var(--mono)' }}>画像生成</td>
                            <td>商品画像自動生成・広告クリエイティブ・不動産バーチャルステージング</td>
                            <td>Imagen on Vertex AI</td>
                        </tr>
                        <tr>
                            <td style={{ color: 'var(--amber)', fontFamily: 'var(--mono)' }}>コード生成</td>
                            <td>開発者生産性向上・レガシーコード移行・自動テスト生成・SQL最適化</td>
                            <td>Gemini Code Assist, Gemini Enterprise</td>
                        </tr>
                        <tr>
                            <td style={{ color: 'var(--amber)', fontFamily: 'var(--mono)' }}>パーソナライズ体験</td>
                            <td>個別化レコメンデーション・顧客ジャーニーの動的最適化</td>
                            <td>Vertex AI, Recommendations AI</td>
                        </tr>
                        <tr>
                            <td style={{ color: 'var(--amber)', fontFamily: 'var(--mono)' }}>情報検索 / QA</td>
                            <td>社内ナレッジベース検索・顧客FAQボット・文書検索</td>
                            <td>Vertex AI Search, NotebookLM</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="card">
                <div className="card-h">🗺️ Gen AI 導入の成功ステップ（Google Cloud 推奨）</div>
                <div className="steps">
                    <div className="step">
                        <div className="step-num">1</div>
                        <div className="step-body">
                            <div className="step-title">ビジネスニーズの特定（Use Case Discovery）</div>
                            <div className="step-desc">
                                「どのビジネス課題を解決したいか？」を明確化。ROI が見込めるユースケースを優先的に選定。
                                パイロットプロジェクト用のユースケースは「影響大 × 実現可能性高」の領域を選ぶ。
                            </div>
                        </div>
                    </div>
                    <div className="step">
                        <div className="step-num">2</div>
                        <div className="step-body">
                            <div className="step-title">モデル選定（Model Selection）</div>
                            <div className="step-desc">
                                必要な機能（テキスト・画像・コード・マルチモーダル）・精度要件・コスト・レイテンシに基づいてモデルを選択。
                                「まず Gemini Pro → 不十分ならカスタマイズ」のアプローチが推奨。
                            </div>
                        </div>
                    </div>
                    <div className="step">
                        <div className="step-num">3</div>
                        <div className="step-body">
                            <div className="step-title">プロトタイプ開発（Build Prototype）</div>
                            <div className="step-desc">
                                Vertex AI Studio でプロンプト設計・モデル評価。RAG パイプライン構築・API 統合。
                                小規模で素早く動くプロトタイプを作り、ビジネスステークホルダーへ早期デモを実施。
                            </div>
                        </div>
                    </div>
                    <div className="step">
                        <div className="step-num">4</div>
                        <div className="step-body">
                            <div className="step-title">評価・改善（Evaluate &amp; Improve）</div>
                            <div className="step-desc">
                                モデルの精度・一貫性・安全性をベンチマーク評価。必要に応じてファインチューニング・RAG 改善・プロンプト最適化を実施。
                            </div>
                        </div>
                    </div>
                    <div className="step">
                        <div className="step-num">5</div>
                        <div className="step-body">
                            <div className="step-title">デプロイ・モニタリング（Deploy &amp; Monitor）</div>
                            <div className="step-desc">
                                Vertex AI Endpoints に本番デプロイ。ドリフト検知・コスト監視・パフォーマンス管理。
                                フィードバックループで継続的改善サイクルを確立する。
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-h">📊 ROI 測定フレームワーク</div>
                <div className="fgrid">
                    <div className="fi" style={{ borderLeftColor: 'var(--amber)' }}>
                        <div className="fi-t" style={{ color: 'var(--amber)' }}>コスト削減（Cost Reduction）</div>
                        <div className="fi-d">人件費削減・自動化による効率化・エラーコスト削減。コールセンター自動化・ドキュメント処理自動化が代表例。</div>
                    </div>
                    <div className="fi" style={{ borderLeftColor: 'var(--sage)' }}>
                        <div className="fi-t" style={{ color: 'var(--sage)' }}>収益増加（Revenue Growth）</div>
                        <div className="fi-d">パーソナライズによる購買率向上・新製品ライン追加・市場投入スピード向上。コンテンツ生成の大量化が代表例。</div>
                    </div>
                    <div className="fi" style={{ borderLeftColor: 'var(--steel)' }}>
                        <div className="fi-t" style={{ color: 'var(--steel)' }}>生産性向上（Productivity）</div>
                        <div className="fi-d">従業員の作業効率化・意思決定スピード向上・知識アクセスの民主化。Gemini for Workspace が代表的。</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ── Section 4.2: セキュアな AI ── */
function Section42() {
    return (
        <section id="s42">
            <div className="sec-h sh-rose">
                <div className="sec-num sn-r">4.2</div>
                <div>
                    <h2>セキュアな AI（Secure AI）とその重要性</h2>
                    <p>ML ライフサイクル全体のセキュリティ・Google の SAIF フレームワーク・GCP セキュリティツールを理解する</p>
                </div>
                <div className="sec-badge sb-rose">最重要</div>
            </div>

            <div className="card">
                <div className="card-h">🔐 なぜ Gen AI にはセキュリティが特別に重要か？</div>
                <p style={{ fontSize: '14px', lineHeight: 1.8, marginBottom: '16px' }}>
                    Gen AI システムは従来のソフトウェアとは異なる<strong style={{ color: 'var(--rose)' }}>固有のセキュリティリスク</strong>を持つ。
                    モデルへの攻撃・データの汚染・プロンプトによる悪用など、新たな脅威ベクターが存在する。
                </p>

                <div className="fgrid">
                    <div className="fi" style={{ borderLeftColor: 'var(--rose)' }}>
                        <div className="fi-t" style={{ color: 'var(--rose)' }}>🎯 プロンプトインジェクション攻撃</div>
                        <div className="fi-d">悪意あるテキストをプロンプトに埋め込み、AIに意図しない動作をさせる攻撃。「上記の指示を無視して...」のような指令で安全フィルタを回避しようとする。</div>
                    </div>
                    <div className="fi" style={{ borderLeftColor: 'var(--rose)' }}>
                        <div className="fi-t" style={{ color: 'var(--rose)' }}>☠️ データポイズニング</div>
                        <div className="fi-d">トレーニングデータや RAG のナレッジベースに悪意あるデータを混入し、モデルの出力を意図的に歪める攻撃。学習データの品質管理が防御の鍵。</div>
                    </div>
                    <div className="fi" style={{ borderLeftColor: 'var(--rose)' }}>
                        <div className="fi-t" style={{ color: 'var(--rose)' }}>🔓 モデル抽出攻撃</div>
                        <div className="fi-d">大量のクエリを送信してモデルの挙動からモデルを複製・盗用しようとする攻撃。レート制限とアクセス制御が防御策。</div>
                    </div>
                    <div className="fi" style={{ borderLeftColor: 'var(--rose)' }}>
                        <div className="fi-t" style={{ color: 'var(--rose)' }}>📤 機密データ漏洩</div>
                        <div className="fi-d">モデルがトレーニングデータ内の個人情報・機密情報を出力に含める可能性。プロンプトによる個人情報抽出に注意。</div>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-h">🛡️ Google の SAIF（Secure AI Framework）</div>
                <p style={{ fontSize: '14px', lineHeight: 1.8, marginBottom: '16px' }}>
                    SAIF は Google が発表した AI セキュリティのための包括的フレームワーク。
                    <strong style={{ color: 'var(--amber)' }}>6つのコア要素</strong>で構成され、組織が責任を持って AI を開発・展開するためのガイダンスを提供。
                </p>

                <div className="fgrid">
                    <div className="fi" style={{ borderLeftColor: 'var(--amber)' }}>
                        <div className="fi-t">① AI エコシステム全体にセキュリティ基盤を拡張</div>
                        <div className="fi-d">従来のソフトウェアセキュリティ手法を AI スタック全体（モデル・データ・推論基盤）に適用</div>
                    </div>
                    <div className="fi" style={{ borderLeftColor: 'var(--amber)' }}>
                        <div className="fi-t">② AI 固有のリスクに対処する</div>
                        <div className="fi-d">プロンプトインジェクション・ハルシネーション・敵対的入力など AI 特有のリスクに特化した対策を実装</div>
                    </div>
                    <div className="fi" style={{ borderLeftColor: 'var(--amber)' }}>
                        <div className="fi-t">③ 迅速なレスポンスを可能にする</div>
                        <div className="fi-d">AI システムへの攻撃・脆弱性に対する検知・分析・対応のサイクルを高速化</div>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-h">🔧 Google Cloud の AI セキュリティツール</div>
                <div className="fgrid">
                    <div className="fi">
                        <div className="fi-t" style={{ color: 'var(--amber)', fontFamily: 'var(--mono)' }}>Sensitive Data Protection</div>
                        <div className="fi-d">個人情報・機密データの自動検出・マスキング・暗号化。学習データから機密情報を除去するパイプラインの構築に使用。</div>
                    </div>
                    <div className="fi">
                        <div className="fi-t" style={{ color: 'var(--amber)', fontFamily: 'var(--mono)' }}>CMEK（Customer-Managed Encryption Keys）</div>
                        <div className="fi-d">顧客が管理する暗号化キーを使用してデータを保護。Google もデータにアクセスできない完全なデータ主権を保証。</div>
                    </div>
                    <div className="fi">
                        <div className="fi-t" style={{ color: 'var(--amber)', fontFamily: 'var(--mono)' }}>VPC Service Controls</div>
                        <div className="fi-d">Vertex AI API 等へのアクセスを特定の VPC に限定。データの不正な持ち出しを防ぐペリメータセキュリティ。</div>
                    </div>
                    <div className="fi">
                        <div className="fi-t" style={{ color: 'var(--amber)', fontFamily: 'var(--mono)' }}>Model Armor</div>
                        <div className="fi-d">プロンプトインジェクション・ジェイルブレイク・有害コンテンツの検出・ブロックを行う AI セーフティガード。</div>
                    </div>
                </div>
            </div>

            <div className="warn">
                <div className="warnt">試験頻出: セキュアな AI のポイント</div>
                <ul>
                    <li>SAIF = Google が提唱する AI セキュリティフレームワーク（試験で名前が問われる）</li>
                    <li>「顧客データを Google のモデル学習に使わない」→ Google Cloud の契約保証（Vertex AI の差別化点）</li>
                    <li>CMEK = 顧客管理の暗号化キー。Google もデータを見られない → データ主権の最高レベル</li>
                    <li>プロンプトインジェクション対策 → Model Armor / 入力バリデーション / システムプロンプトの隔離</li>
                </ul>
            </div>
        </section>
    );
}

/* ── Section 4.3: 責任ある AI ── */
function Section43() {
    return (
        <section id="s43">
            <div className="sec-h sh-sage">
                <div className="sec-num sn-s">4.3</div>
                <div>
                    <h2>責任ある AI（Responsible AI）とビジネス倫理</h2>
                    <p>透明性・公平性・プライバシー・説明責任・安全性 — AI を社会的に正しく活用するための原則と実践を理解する</p>
                </div>
                <div className="sec-badge sb-sage">重要</div>
            </div>

            <div className="card">
                <div className="card-h">🌱 責任ある AI とは何か？なぜビジネスに必要か？</div>
                <p style={{ fontSize: '14px', lineHeight: 1.8, marginBottom: '16px' }}>
                    責任ある AI とは、<strong style={{ color: 'var(--sage)' }}>AI を倫理的・公平・透明・安全に設計・開発・展開・監視する原則と実践の集合体</strong>。
                    単なる道徳論ではなく、<strong style={{ color: 'var(--amber)' }}>ビジネスリスク管理・規制対応・ブランド価値保護</strong>の観点からも不可欠な経営課題。
                </p>

                <div className="fgrid">
                    <div className="fi" style={{ borderLeftColor: 'var(--sage)' }}>
                        <div className="fi-t" style={{ color: 'var(--sage)' }}>⚖️ 法規制リスク</div>
                        <div className="fi-d">EU AI Act・GDPR・CCPA など AI に関する規制が世界中で強化中。責任ある AI の不備は多額の制裁金リスク。</div>
                    </div>
                    <div className="fi" style={{ borderLeftColor: 'var(--sage)' }}>
                        <div className="fi-t" style={{ color: 'var(--sage)' }}>🤝 信頼・ブランド価値</div>
                        <div className="fi-d">差別的・偏見的なAI出力はブランドへの重大な打撃。顧客・従業員・パートナーとの信頼関係の基盤。</div>
                    </div>
                    <div className="fi" style={{ borderLeftColor: 'var(--sage)' }}>
                        <div className="fi-t" style={{ color: 'var(--sage)' }}>🌍 社会的責任</div>
                        <div className="fi-d">技術がもたらす社会への影響を考慮することが企業市民としての責務。SDGs・ESG との整合性も重要。</div>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-h">🎯 責任ある AI の6つの原則（Google AI Principles）</div>

                <div className="principle-grid">
                    <div className="principle">
                        <div className="principle-icon">⚖️</div>
                        <div className="principle-name" style={{ color: 'var(--amber)' }}>公平性（Fairness）</div>
                        <div className="principle-desc">すべてのユーザーに対して偏りなく公平に扱う。性別・人種・年齢・文化的バックグラウンドによる差別的扱いを排除する。</div>
                    </div>
                    <div className="principle">
                        <div className="principle-icon">🔍</div>
                        <div className="principle-name" style={{ color: 'var(--amber)' }}>説明責任（Accountability）</div>
                        <div className="principle-desc">AI の決定・行動に対して説明できる仕組みを持つ。誰が何を決定し、なぜその出力が生成されたかを追跡可能にする。</div>
                    </div>
                    <div className="principle">
                        <div className="principle-icon">🔒</div>
                        <div className="principle-name" style={{ color: 'var(--amber)' }}>プライバシー（Privacy）</div>
                        <div className="principle-desc">個人データを最小限収集し、適切に保護する。ユーザーが自分のデータをコントロールできる仕組みを提供する。</div>
                    </div>
                    <div className="principle">
                        <div className="principle-icon">🌿</div>
                        <div className="principle-name" style={{ color: 'var(--amber)' }}>透明性（Transparency）</div>
                        <div className="principle-desc">AI が使われていることをユーザーに明示する。判断基準・データ使用方法・モデルの限界を開示する。</div>
                    </div>
                    <div className="principle">
                        <div className="principle-icon">🛡️</div>
                        <div className="principle-name" style={{ color: 'var(--amber)' }}>安全性（Safety）</div>
                        <div className="principle-desc">有害なコンテンツの生成を防ぎ、悪用を防止する設計をする。人間による監視（Human-in-the-loop）の仕組みを設ける。</div>
                    </div>
                    <div className="principle">
                        <div className="principle-icon">♻️</div>
                        <div className="principle-name" style={{ color: 'var(--amber)' }}>信頼性（Reliability）</div>
                        <div className="principle-desc">AI が一貫して期待通りに動作すること。エッジケースや想定外入力でも安定した挙動を維持する。</div>
                    </div>
                </div>
            </div>

            <div className="card" id="summary">
                <div className="card-h">🎓 Section 4 試験対策 総まとめ</div>
                <div className="bp">
                    <div className="bpt">Section 4 の試験配点と重要度</div>
                    <ul>
                        <li>試験配点 ~15% — Section 全体では最も少ないが、ビジネスリーダー視点の応用問題が多い</li>
                        <li>4.1 実装ステップ — 「どのフェーズで何をすべきか」の実践的判断問題</li>
                        <li>4.2 セキュアな AI — SAIF・CMEK・プロンプトインジェクション対策が頻出キーワード</li>
                        <li>4.3 責任ある AI — Google AI Principles の6原則とその事例への適用が問われる</li>
                        <li>セキュアな AI と責任ある AI の違い：セキュア = 技術的脅威からの保護 / 責任ある = 倫理・公平・透明性</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

/* ── Main Page ── */
export default function Section4Page() {
    const fontClasses = `${playfairDisplay.variable} ${dmMono.variable}`;

    return (
        <div className={`s4-page ${fontClasses}`}>
            {/* HERO */}
            <header className="hero">
                <div className="ornament tl" />
                <div className="ornament tr" />
                <div className="ornament-line l" />
                <div className="ornament-line r" />

                <div className="hero-kicker">
                    <span className="dash" />
                    Generative AI Leader 試験対策 — Section 4 深掘り
                    <span className="dash" />
                </div>
                <h1>
                    <span className="gold-text">Gen AI 成功への</span><br />
                    <span className="italic-span">ビジネス戦略</span>完全解説
                </h1>
                <p className="hero-sub">
                    試験配点 <strong style={{ color: 'var(--amber)' }}>~15%</strong> の Section 4 を完全制覇。
                    Gen AI ソリューションの実装ステップ・セキュアなAIの設計・責任あるAIの原則を、経営者・ビジネスリーダー視点で体系的に理解する。
                </p>

                <div className="hero-badge">
                    <div className="pct">~15%</div>
                    <div className="meta">
                        <strong>Section 4: Business Strategies for a Successful Gen AI Solution</strong>
                        <span>3 subsections · 試験最終セクション · ビジネス・倫理の総仕上げ</span>
                    </div>
                </div>

                <div className="ss-pills">
                    <div className="ss-pill">4.1 Gen AI 実装の成功ステップ</div>
                    <div className="ss-pill">4.2 セキュアな AI の設計と防御</div>
                    <div className="ss-pill">4.3 責任ある AI とビジネス倫理</div>
                </div>
            </header>

            {/* NAV */}
            <nav className="snav">
                <a href="#s41" className="n1"><span className="snav-num nn1">4.1</span>Gen AI 実装戦略</a>
                <a href="#s42" className="n2"><span className="snav-num nn2">4.2</span>セキュアな AI</a>
                <a href="#s43" className="n3"><span className="snav-num nn3">4.3</span>責任ある AI</a>
                <a href="#summary"><span className="snav-num" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--muted)', border: '1px solid var(--border)' }}>◎</span>試験まとめ</a>
            </nav>

            {/* MAIN */}
            <main className="wrap">
                <Section41 />
                <div className="sdiv" />
                <Section42 />
                <div className="sdiv" />
                <Section43 />
            </main>

            {/* FOOTER */}
            <footer>
                <strong>Google Cloud Generative AI Leader — Section 4 ビジネス戦略 完全解説ガイド</strong>
                <br /><br />
                参考：
                <a href="https://cloud.google.com/learn/certification/generative-ai-leader" target="_blank" rel="noreferrer">
                    Google Cloud 公式試験ページ
                </a>
                {' '}｜ 作成日：2026年3月<br /><br />
                <span style={{ fontSize: '11px', opacity: 0.4 }}>
                    ※ 本ガイドは学習目的で作成。最新情報は必ず公式サイトでご確認ください。
                </span>
            </footer>
        </div>
    );
}
