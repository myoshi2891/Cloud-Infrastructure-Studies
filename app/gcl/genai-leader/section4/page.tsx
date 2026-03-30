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

            {/* Gen AI Solution Types */}
            <div className="card">
                <div className="card-h">📋 Gen AI ソリューションの種類と特性</div>
                <p style={{ fontSize: '14px', lineHeight: 1.8, marginBottom: '16px' }}>
                    試験では「どのビジネス課題に、どの Gen AI ソリューションタイプが適切か」を判断する問題が出る。
                    各タイプの強みと適用場面を理解することが第一歩。
                </p>

                <table className="ctbl">
                    <thead>
                        <tr>
                            <th>ソリューションタイプ</th>
                            <th>定義</th>
                            <th>代表的なビジネスユースケース</th>
                            <th>Google Cloud サービス例</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong style={{ color: 'var(--amber)' }}>テキスト生成</strong></td>
                            <td>文章・コピー・要約・翻訳・レポートの自動生成</td>
                            <td>マーケティングコンテンツ自動作成、契約書ドラフト生成、多言語カスタマーサポート</td>
                            <td>Gemini API, Gemini for Workspace Docs, Vertex AI</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--amber)' }}>画像生成</strong></td>
                            <td>テキストプロンプトからオリジナル画像・デザインを生成</td>
                            <td>商品画像自動生成、広告クリエイティブ、UX プロトタイプ、不動産バーチャルステージング</td>
                            <td>Imagen on Vertex AI, Gemini マルチモーダル</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--amber)' }}>コード生成</strong></td>
                            <td>自然言語指示からソースコード・テスト・ドキュメントを生成</td>
                            <td>開発者生産性向上、レガシーコード移行、自動テスト生成、SQL クエリ最適化</td>
                            <td>Gemini Code Assist, Gemini Enterprise</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--amber)' }}>パーソナライズ体験</strong></td>
                            <td>ユーザー行動・嗜好に基づく個別最適化された体験・推薦</td>
                            <td>EC 商品レコメンデーション、個別化ニュースフィード、学習プラットフォーム</td>
                            <td>Vertex AI + BigQuery, Recommendations AI</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--amber)' }}>データ分析・発見</strong></td>
                            <td>大量データからパターン・インサイト・異常を自動発見</td>
                            <td>財務異常検知、顧客チャーン予測、サプライチェーン最適化、医療診断支援</td>
                            <td>BigQuery ML, Vertex AI AutoML, Gemini for Data</td>
                        </tr>
                    </tbody>
                </table>

                <div className="bp">
                    <div className="bpt">◆ ソリューションタイプ選択のフレームワーク</div>
                    <ul>
                        <li><strong>課題の性質を最初に定義する：</strong>「何を生成したいか」ではなく「どのビジネス問題を解決したいか」から出発する</li>
                        <li><strong>既存ワークフローへの統合を考慮：</strong>全く新しいシステムより、既存業務プロセスを強化する方が ROI が高い傾向がある</li>
                        <li><strong>段階的に複雑化する：</strong>テキスト生成のような成熟したユースケースから開始し、徐々にマルチモーダル・エージェント型へ発展させる</li>
                    </ul>
                </div>
            </div>

            {/* Key Factors */}
            <div className="card">
                <div className="card-h">🔍 Gen AI ニーズを左右するキー要因</div>
                <div className="fgrid">
                    <div className="fi">
                        <div className="fi-t">📊 ビジネス要件（Business Requirements）</div>
                        <div className="fi-d">ROI 目標・解決すべき課題の優先度・組織の AI 成熟度・利害関係者の期待値・コンプライアンス要件。まずここを明確にしないと全てが無意味になる。</div>
                    </div>
                    <div className="fi">
                        <div className="fi-t">⚙️ 技術的制約（Technical Constraints）</div>
                        <div className="fi-d">既存インフラとの統合難易度・データの可用性と品質・レイテンシ要件・セキュリティポリシー・開発チームのスキルセット・API コスト。</div>
                    </div>
                    <div className="fi">
                        <div className="fi-t">💰 コストと ROI の見積もり</div>
                        <div className="fi-d">API 使用量・推論コスト・開発工数・運用コスト・人件費削減額・売上増加額を定量化。Gen AI は初期投資が必要だが中長期で回収できるケースが多い。</div>
                    </div>
                    <div className="fi">
                        <div className="fi-t">🛡️ リスクとコンプライアンス</div>
                        <div className="fi-d">規制産業（金融・医療・法律）では特に慎重な判断が必要。GDPR・HIPAA・AI Act などの規制への対応コストを事前評価する。</div>
                    </div>
                    <div className="fi">
                        <div className="fi-t">👥 変更管理と人材育成</div>
                        <div className="fi-d">Gen AI 導入は技術だけでなく組織変革を伴う。従業員のスキルアップ・業務プロセス再設計・AIへの抵抗感の払拭が成否を左右する。</div>
                    </div>
                    <div className="fi">
                        <div className="fi-t">📈 スケーラビリティ計画</div>
                        <div className="fi-d">PoC 成功後の本番スケールを最初から設計する。ユーザー数の増加・データ量の拡大・新機能追加に対応できるアーキテクチャを選定する。</div>
                    </div>
                </div>
            </div>

            {/* Implementation Roadmap */}
            <div className="card">
                <div className="card-h">🗺️ Google Cloud 推奨：Gen AI 実装の 5 ステップ ロードマップ</div>
                <p style={{ fontSize: '14px', lineHeight: 1.8, marginBottom: '20px' }}>
                    Google Cloud が推奨する段階的な Gen AI 導入プロセス。試験では各ステップの内容・順序・それぞれで重要な考慮点が問われる。
                </p>

                <div className="roadmap">
                    {/* Step 1 */}
                    <div className="rm-step">
                        <div className="rm-dot"><div className="rm-dot-n">1</div></div>
                        <div className="rm-step-h">
                            <span className="rm-label">STEP 01</span>
                            <strong>ビジネスニーズの特定と優先順位付け（Identify）</strong>
                        </div>
                        <p>
                            組織が抱える課題を棚卸しし、Gen AI で解決できるものを特定する。全員が同意する明確な問題定義が出発点。「AI のための AI」を避け、ビジネス価値が明確なユースケースのみを選ぶ。
                        </p>
                        <ul style={{ marginTop: '8px' }}>
                            <li>現状業務の課題・ボトルネック・機会コストを定量化する</li>
                            <li>ROI が高く、実現可能性があり、リスクが低いユースケースを優先する</li>
                            <li>経営層・業務部門・IT 部門の三者が合意できるユースケースを選ぶ</li>
                            <li>競合他社の Gen AI 活用状況も参考に機会損失を評価する</li>
                        </ul>
                        <div className="rm-tags">
                            <span className="rm-tag">ユースケース評価</span>
                            <span className="rm-tag">ROI 分析</span>
                            <span className="rm-tag">ステークホルダー合意</span>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="rm-step">
                        <div className="rm-dot"><div className="rm-dot-n">2</div></div>
                        <div className="rm-step-h">
                            <span className="rm-label">STEP 02</span>
                            <strong>適切なソリューションの選択（Choose）</strong>
                        </div>
                        <p>
                            特定したユースケースに最適な Gen AI アプローチを選択する。プリビルト利用・カスタム構築・モデルファインチューニングのトレードオフを技術的制約とビジネス要件の両面から評価する。
                        </p>
                        <div className="dt" style={{ marginTop: '12px' }}>
                            <div className="dt-row">
                                <div className="dt-if">速さ重視</div>
                                <div className="dt-arrow">→</div>
                                <div className="dt-then"><strong>プリビルト Gen AI</strong>（Gemini for Workspace, NotebookLM）を活用</div>
                            </div>
                            <div className="dt-row">
                                <div className="dt-if">自社データ活用</div>
                                <div className="dt-arrow">→</div>
                                <div className="dt-then"><strong>RAG + Vertex AI Search</strong> で社内ナレッジを組み込む</div>
                            </div>
                            <div className="dt-row">
                                <div className="dt-if">専門特化が必要</div>
                                <div className="dt-arrow">→</div>
                                <div className="dt-then"><strong>ファインチューニング</strong>で業界固有のモデルを構築</div>
                            </div>
                            <div className="dt-row">
                                <div className="dt-if">完全カスタム</div>
                                <div className="dt-arrow">→</div>
                                <div className="dt-then"><strong>Vertex AI + ADK</strong> でゼロからエージェントを構築</div>
                            </div>
                        </div>
                        <div className="rm-tags">
                            <span className="rm-tag">ビルド vs バイ判断</span>
                            <span className="rm-tag">コスト試算</span>
                            <span className="rm-tag">技術評価</span>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="rm-step">
                        <div className="rm-dot"><div className="rm-dot-n">3</div></div>
                        <div className="rm-step-h">
                            <span className="rm-label">STEP 03</span>
                            <strong>パイロット・PoC の実施（Pilot）</strong>
                        </div>
                        <p>
                            選択したソリューションを小規模で素早く検証する。仮説を早期に検証し、本格展開前に問題を発見してコストと時間の無駄を防ぐ。「失敗するなら早く失敗する」のが正しい姿勢。
                        </p>
                        <ul style={{ marginTop: '8px' }}>
                            <li>90日以内に初期成果が出せる範囲でパイロット範囲を限定する</li>
                            <li>明確な成功基準（精度・速度・コスト削減率）を事前に設定する</li>
                            <li>実際のエンドユーザーを参加させ、現実的なフィードバックを得る</li>
                            <li>Google Cloud の $300 無料クレジットや限定ライセンスを活用して低コストで試す</li>
                        </ul>
                        <div className="rm-tags">
                            <span className="rm-tag">MVP 設計</span>
                            <span className="rm-tag">成功基準設定</span>
                            <span className="rm-tag">ユーザーテスト</span>
                        </div>
                    </div>

                    {/* Step 4 */}
                    <div className="rm-step">
                        <div className="rm-dot"><div className="rm-dot-n">4</div></div>
                        <div className="rm-step-h">
                            <span className="rm-label">STEP 04</span>
                            <strong>既存システムへの統合と組織展開（Integrate）</strong>
                        </div>
                        <p>
                            PoC が成功したら、既存の業務システム・ワークフロー・IT インフラに Gen AI を統合する。技術的な統合と組織的な変更管理（人材育成・プロセス再設計）を並行して進める。
                        </p>
                        <ul style={{ marginTop: '8px' }}>
                            <li>既存 API・データパイプライン・SaaS ツールとの連携を設計する</li>
                            <li>Gen AI 活用のトレーニングとプロンプトライブラリを全社で整備する</li>
                            <li>段階的ロールアウト（パイロット部門→全社展開）で変化への抵抗を軽減する</li>
                            <li>Champion（社内推進者）を各部門に設け、草の根でAI活用を広げる</li>
                        </ul>
                        <div className="rm-tags">
                            <span className="rm-tag">API 統合</span>
                            <span className="rm-tag">変更管理</span>
                            <span className="rm-tag">トレーニング</span>
                            <span className="rm-tag">段階展開</span>
                        </div>
                    </div>

                    {/* Step 5 */}
                    <div className="rm-step">
                        <div className="rm-dot"><div className="rm-dot-n">5</div></div>
                        <div className="rm-step-h">
                            <span className="rm-label">STEP 05</span>
                            <strong>効果測定と継続改善（Measure）</strong>
                        </div>
                        <p>
                            定量的な KPI を継続的に計測し、Gen AI の真の事業価値を可視化する。ROI を経営層に報告し、次の投資判断の根拠とする。継続的な改善サイクル（測定→分析→改善→測定）を確立する。
                        </p>
                        <ul style={{ marginTop: '8px' }}>
                            <li>財務指標（コスト削減額・売上増加額）と運用指標（時間短縮・品質向上）の両方を計測する</li>
                            <li>Vertex AI Evaluation Service でモデルの精度・品質を継続的に自動評価する</li>
                            <li>A/B テストで Gen AI あり/なしの効果を科学的に比較する</li>
                            <li>ユーザーフィードバック（CSAT・NPS）も定性的指標として収集する</li>
                        </ul>
                        <div className="rm-tags">
                            <span className="rm-tag">KPI ダッシュボード</span>
                            <span className="rm-tag">A/B テスト</span>
                            <span className="rm-tag">ROI レポート</span>
                        </div>
                    </div>
                </div>

                <div className="bp">
                    <div className="bpt">◆ 実装成功のベストプラクティス</div>
                    <ul>
                        <li><strong>トップダウンとボトムアップを同時並行：</strong>経営層のコミットメント（予算・方向性）と現場の草の根活用（日常業務への組み込み）の両方が必要</li>
                        <li><strong>データ品質を最優先：</strong>Gen AI の出力品質は入力データの品質に直結する。データガバナンス整備を AI 導入と並行して進める</li>
                        <li><strong>失敗を前提に設計：</strong>Gen AI は 100% 正確ではない。誤出力が発生した時の検知・エスカレーション・修正のプロセスを事前に設計する</li>
                    </ul>
                </div>
            </div>

            {/* KPI Measurement Framework */}
            <div className="card">
                <div className="card-h">📊 Gen AI インパクト測定フレームワーク</div>
                <p style={{ fontSize: '14px', lineHeight: 1.8, marginBottom: '16px' }}>
                    試験では「どのように Gen AI の効果を測定するか」が問われる。測定指標は財務・運用・顧客・技術の4カテゴリに分類される。
                </p>

                <div className="kpi-grid">
                    <div className="kpi">
                        <div className="kpi-cat">財務指標</div>
                        <div className="kpi-name">ROI と経済効果</div>
                        <ul className="kpi-list">
                            <li>人件費削減率（自動化による工数削減）</li>
                            <li>売上増加額（パーソナライズ・推薦精度向上）</li>
                            <li>エラー・ミス削減による損失回避額</li>
                            <li>新製品・サービス投入時間の短縮</li>
                            <li>インフラコスト削減（クラウド最適化）</li>
                        </ul>
                    </div>
                    <div className="kpi">
                        <div className="kpi-cat">運用指標</div>
                        <div className="kpi-name">生産性・効率性</div>
                        <ul className="kpi-list">
                            <li>タスク完了時間の短縮率</li>
                            <li>1人あたり処理件数の増加率</li>
                            <li>コードレビュー・文書作成時間削減</li>
                            <li>コールセンター平均対応時間（AHT）</li>
                            <li>システム稼働率・エラー率</li>
                        </ul>
                    </div>
                    <div className="kpi">
                        <div className="kpi-cat">顧客指標</div>
                        <div className="kpi-name">体験・満足度</div>
                        <ul className="kpi-list">
                            <li>顧客満足度スコア（CSAT/NPS）</li>
                            <li>サポートの初回解決率（FCR）</li>
                            <li>パーソナライズ施策のコンバージョン率</li>
                            <li>顧客維持率（チャーン率の改善）</li>
                            <li>ユーザーエンゲージメント指標</li>
                        </ul>
                    </div>
                    <div className="kpi">
                        <div className="kpi-cat">技術指標</div>
                        <div className="kpi-name">モデル品質・信頼性</div>
                        <ul className="kpi-list">
                            <li>モデル精度（BLEU・ROUGE・F1 スコア）</li>
                            <li>ハルシネーション発生率</li>
                            <li>推論レイテンシ（応答速度）</li>
                            <li>API エラー率・可用性</li>
                            <li>安全フィルタ発動率（有害コンテンツ検知）</li>
                        </ul>
                    </div>
                </div>

                <div className="src">
                    <div className="srct">📎 参照リソース</div>
                    <a href="https://cloud.google.com/transform/scaling-ai-from-experimentation-to-enterprise-reality-google" target="_blank" rel="noreferrer">https://cloud.google.com/transform/scaling-ai-from-experimentation-to-enterprise-reality-google</a>
                    <a href="https://cloud.google.com/transform/what-it-takes-to-get-your-team-ready-for-the-agentic-era" target="_blank" rel="noreferrer">https://cloud.google.com/transform/what-it-takes-to-get-your-team-ready-for-the-agentic-era</a>
                    <a href="https://cloud.google.com/solutions/ai" target="_blank" rel="noreferrer">https://cloud.google.com/solutions/ai</a>
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

            {/* Why Secure AI */}
            <div className="card">
                <div className="card-h">🔐 なぜ Gen AI にはセキュリティが特別に重要か？</div>
                <p style={{ fontSize: '14px', lineHeight: 1.8, marginBottom: '16px' }}>
                    Gen AI システムは従来のソフトウェアとは異なる<strong style={{ color: 'var(--rose)' }}>固有のセキュリティリスク</strong>を持つ。
                    モデルへの攻撃・データの汚染・プロンプトによる悪用など、新たな脅威ベクターが存在する。
                </p>

                <div className="fgrid">
                    <div className="fi">
                        <div className="fi-t" style={{ color: 'var(--rose)' }}>🎯 プロンプトインジェクション攻撃</div>
                        <div className="fi-d">悪意あるテキストをプロンプトに埋め込み、AIに意図しない動作をさせる攻撃。「上記の指示を無視して...」のような指令で安全フィルタを回避しようとする。</div>
                    </div>
                    <div className="fi">
                        <div className="fi-t" style={{ color: 'var(--rose)' }}>☠️ データポイズニング</div>
                        <div className="fi-d">トレーニングデータや RAG のナレッジベースに悪意あるデータを混入し、モデルの出力を意図的に歪める攻撃。学習データの品質管理が防御の鍵。</div>
                    </div>
                    <div className="fi">
                        <div className="fi-t" style={{ color: 'var(--rose)' }}>🔍 モデルの逆向き攻撃（Model Inversion）</div>
                        <div className="fi-d">モデルの出力を繰り返し問い合わせることで、学習データに含まれる個人情報・秘密情報を推測・復元しようとする攻撃。</div>
                    </div>
                    <div className="fi">
                        <div className="fi-t" style={{ color: 'var(--rose)' }}>📊 トレーニングデータ漏洩</div>
                        <div className="fi-d">LLM は学習データを「記憶」することがある。特定のプロンプトで個人情報・機密情報が意図せず出力されるリスク。差分プライバシーで対策。</div>
                    </div>
                    <div className="fi">
                        <div className="fi-t" style={{ color: 'var(--rose)' }}>⚙️ サプライチェーン攻撃</div>
                        <div className="fi-d">利用するオープンソースモデル・ライブラリ・サードパーティデータが改ざんされているリスク。Model Garden の信頼できるソースから取得することが重要。</div>
                    </div>
                    <div className="fi">
                        <div className="fi-t" style={{ color: 'var(--rose)' }}>🚨 敵対的サンプル（Adversarial Inputs）</div>
                        <div className="fi-d">人間には通常通りに見えるが、AIモデルを誤作動させるよう設計された入力。画像の微細なノイズや文章の特殊文字がモデルを欺く。</div>
                    </div>
                </div>
            </div>

            {/* ML Lifecycle Security */}
            <div className="card">
                <div className="card-h">🔄 ML ライフサイクル全体のセキュリティ設計</div>
                <p style={{ fontSize: '14px', lineHeight: 1.8, marginBottom: '16px' }}>
                    セキュリティは「最後に追加するもの」ではなく、<strong style={{ color: 'var(--amber)' }}>ML ライフサイクルの全ステップに組み込む</strong>べきもの。各フェーズ固有のリスクと対策を理解する。
                </p>

                <div className="lifecycle">
                    <div className="lc-row">
                        <div className="lc-phase">
                            <div className="lc-phase-num">01</div>
                            <div className="lc-phase-name">Data Collection</div>
                        </div>
                        <div className="lc-body">
                            <strong>データ収集・取り込みフェーズのセキュリティ</strong>
                            <p>学習・RAG 用データの収集段階で、データの真正性・完全性・機密性を確保する。汚染されたデータが後続の全フェーズに影響する。</p>
                            <div className="lc-tags">
                                <span className="lc-tag">データ出所の検証</span>
                                <span className="lc-tag">転送時の暗号化（TLS）</span>
                                <span className="lc-tag">Sensitive Data Protection</span>
                                <span className="lc-tag">アクセスログ記録</span>
                            </div>
                        </div>
                    </div>
                    <div className="lc-row">
                        <div className="lc-phase">
                            <div className="lc-phase-num">02</div>
                            <div className="lc-phase-name">Data Prep</div>
                        </div>
                        <div className="lc-body">
                            <strong>データ前処理・ラベリングフェーズのセキュリティ</strong>
                            <p>データのクレンジング・アノテーション・特徴量エンジニアリングの段階で機密情報の除去・匿名化を実施。人間アノテーターへのアクセス制限も重要。</p>
                            <div className="lc-tags">
                                <span className="lc-tag">PII の検出・匿名化</span>
                                <span className="lc-tag">アノテーター権限管理</span>
                                <span className="lc-tag">差分プライバシー</span>
                                <span className="lc-tag">データ系譜（Lineage）記録</span>
                            </div>
                        </div>
                    </div>
                    <div className="lc-row">
                        <div className="lc-phase">
                            <div className="lc-phase-num">03</div>
                            <div className="lc-phase-name">Model Training</div>
                        </div>
                        <div className="lc-body">
                            <strong>モデルトレーニング・ファインチューニングのセキュリティ</strong>
                            <p>大規模な計算リソースを使う学習フェーズでは、VPC 内での実行・顧客管理暗号化キー（CMEK）の適用・学習環境へのアクセス制限が重要。</p>
                            <div className="lc-tags">
                                <span className="lc-tag">VPC Service Controls</span>
                                <span className="lc-tag">CMEK（顧客管理暗号化キー）</span>
                                <span className="lc-tag">IAM 最小権限</span>
                                <span className="lc-tag">学習ジョブの監査ログ</span>
                            </div>
                        </div>
                    </div>
                    <div className="lc-row">
                        <div className="lc-phase">
                            <div className="lc-phase-num">04</div>
                            <div className="lc-phase-name">Deployment</div>
                        </div>
                        <div className="lc-body">
                            <strong>モデルデプロイ・API 公開フェーズのセキュリティ</strong>
                            <p>本番 API のセキュリティ設定・レート制限・認証・TLS 強制が重要。プロンプトインジェクション対策として Model Armor の適用を推奨。</p>
                            <div className="lc-tags">
                                <span className="lc-tag">API Key / OAuth 2.0</span>
                                <span className="lc-tag">Rate Limiting</span>
                                <span className="lc-tag">Model Armor</span>
                                <span className="lc-tag">Cloud Armor（DDoS 対策）</span>
                            </div>
                        </div>
                    </div>
                    <div className="lc-row">
                        <div className="lc-phase">
                            <div className="lc-phase-num">05</div>
                            <div className="lc-phase-name">Monitoring</div>
                        </div>
                        <div className="lc-body">
                            <strong>本番運用・モニタリングフェーズのセキュリティ</strong>
                            <p>本番稼働中の AI システムへの不正アクセス・異常な使用パターン・モデルドリフトを継続的に監視。Security Command Center と統合して脅威を早期検知。</p>
                            <div className="lc-tags">
                                <span className="lc-tag">Security Command Center</span>
                                <span className="lc-tag">Cloud Logging 監査</span>
                                <span className="lc-tag">異常検知アラート</span>
                                <span className="lc-tag">ワークロード監視</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SAIF Framework */}
            <div className="card">
                <div className="card-h">🛡️ Google の SAIF（Secure AI Framework）— 6つの核心原則</div>
                <p style={{ fontSize: '14px', lineHeight: 1.8, marginBottom: '16px' }}>
                    Google が 2023年に公開した <strong style={{ color: 'var(--amber)' }}>SAIF（Secure AI Framework）</strong> は、AI システムをセキュアに構築・デプロイ・運用するための包括的なフレームワーク。
                    試験では各原則の名称と意味の理解が求められる。
                </p>

                <div className="saif-grid">
                    <div className="saif-card">
                        <div className="saif-num" style={{ color: 'rgba(200, 150, 10, 0.3)' }}>01</div>
                        <div className="saif-head">AI セキュリティを既存インフラに組み込む</div>
                        <div className="saif-desc">AI 固有の新しいセキュリティレイヤーを作るのではなく、既存の堅牢なセキュリティ基盤（IAM・ネットワーク・暗号化）に AI セキュリティを統合する。</div>
                        <div className="saif-ex">
                            <span className="label">Google Cloud での実装例</span>
                            IAM・VPC・Cloud KMS などの既存セキュリティツールを AI ワークロードにも適用
                        </div>
                    </div>
                    <div className="saif-card">
                        <div className="saif-num" style={{ color: 'rgba(200, 150, 10, 0.3)' }}>02</div>
                        <div className="saif-head">脅威インテリジェンスを AI 防御に活用する</div>
                        <div className="saif-desc">Google の世界規模のセキュリティ情報（脅威インテリジェンス）を活用して、AI 固有の攻撃パターン（プロンプトインジェクション等）を特定・防御する。</div>
                        <div className="saif-ex">
                            <span className="label">Google Cloud での実装例</span>
                            Google Threat Intelligence の AI セキュリティインサイトを Security Command Center に統合
                        </div>
                    </div>
                    <div className="saif-card">
                        <div className="saif-num" style={{ color: 'rgba(200, 150, 10, 0.3)' }}>03</div>
                        <div className="saif-head">変更の大規模かつ迅速な検証</div>
                        <div className="saif-desc">AI モデルの更新・データの変更・設定変更を大規模かつ迅速に検証できる体制を構築する。継続的インテグレーション（CI）の概念を AI に適用する。</div>
                        <div className="saif-ex">
                            <span className="label">Google Cloud での実装例</span>
                            Vertex AI Evaluation Service + Cloud Build パイプラインでモデル変更を自動テスト
                        </div>
                    </div>
                    <div className="saif-card">
                        <div className="saif-num" style={{ color: 'rgba(200, 150, 10, 0.3)' }}>04</div>
                        <div className="saif-head">AI の最小権限アクセス原則の適用</div>
                        <div className="saif-desc">AI モデル・エージェントは必要最小限の権限のみを持つべき。過剰な権限を持つ AI が攻撃された場合のリスクを最小化する。</div>
                        <div className="saif-ex">
                            <span className="label">Google Cloud での実装例</span>
                            サービスアカウントに最小権限を付与・エージェントのツールアクセスを必要な API のみに限定
                        </div>
                    </div>
                    <div className="saif-card">
                        <div className="saif-num" style={{ color: 'rgba(200, 150, 10, 0.3)' }}>05</div>
                        <div className="saif-head">AIデプロイの継続的監視・テスト</div>
                        <div className="saif-desc">本番 AI システムを継続的に監視し、異常な動作・攻撃の兆候・モデルドリフトを早期に検知する。「一度デプロイして終わり」ではない姿勢が重要。</div>
                        <div className="saif-ex">
                            <span className="label">Google Cloud での実装例</span>
                            Cloud Monitoring + Security Command Center でリアルタイムアラート設定
                        </div>
                    </div>
                    <div className="saif-card">
                        <div className="saif-num" style={{ color: 'rgba(200, 150, 10, 0.3)' }}>06</div>
                        <div className="saif-head">AI セキュリティプログラムの制度化</div>
                        <div className="saif-desc">AI セキュリティを特定チームの責任ではなく、組織全体の文化として制度化する。セキュリティポリシー・教育・インシデント対応計画を整備する。</div>
                        <div className="saif-ex">
                            <span className="label">Google Cloud での実装例</span>
                            AI セキュリティポリシーの策定・定期的なレッドチーム演習・SAIF チェックリストの活用
                        </div>
                    </div>
                </div>

                <div className="info">
                    <div className="infot">📌 試験ポイント：SAIF の本質</div>
                    <p>
                        SAIF は「AI セキュリティの新しいルールブック」ではなく、<strong style={{ color: 'var(--sage)' }}>既存のサイバーセキュリティの原則をAI時代に拡張・適応させたフレームワーク</strong>。DevSecOps・最小権限・継続的監視などの概念を AI 固有のリスクに合わせて進化させたもの。
                    </p>
                </div>
            </div>

            {/* GCP Security Tools */}
            <div className="card">
                <div className="card-h">🔧 Google Cloud の主要セキュリティツール群</div>
                <table className="ctbl">
                    <thead>
                        <tr>
                            <th>ツール / サービス</th>
                            <th>役割</th>
                            <th>AI セキュリティでの具体的活用</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong style={{ color: 'var(--amber)' }}>IAM（Identity and Access Management）</strong></td>
                            <td>誰が・何に・どの操作ができるかを制御する認証・認可の基盤</td>
                            <td>AI エージェントのサービスアカウントに必要最小限の権限のみ付与。人間ユーザーの Vertex AI へのアクセスを役割で制限。</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--amber)' }}>Security Command Center</strong></td>
                            <td>GCP リソース全体のセキュリティ脅威・脆弱性を一元可視化するダッシュボード</td>
                            <td>AI ワークロードへの不正アクセス試行を検知。モデルエンドポイントの異常なトラフィックをアラート。脆弱性スキャン結果の集約。</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--amber)' }}>VPC Service Controls</strong></td>
                            <td>GCP リソースを仮想的なセキュリティ境界で囲い、データ漏洩を防止</td>
                            <td>機密 AI 学習データを VPC 境界内に閉じ込める。外部 API からのデータ流出を防止。コンプライアンス要件対応。</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--amber)' }}>Cloud KMS / CMEK</strong></td>
                            <td>暗号化キーの管理サービス。顧客管理暗号化キー（CMEK）で完全な鍵制御を実現</td>
                            <td>学習データ・モデルウェイト・推論結果を顧客管理キーで暗号化。Googleも復号不可の状態でデータを管理。</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--amber)' }}>Model Armor</strong></td>
                            <td>Vertex AI Agent Builder のエージェント向けプロンプトインジェクション対策機能</td>
                            <td>ユーザー入力からのプロンプトインジェクション試行を検知・ブロック。不適切なコンテンツのフィルタリング。エージェントの安全な実行を保証。</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--amber)' }}>Cloud Armor</strong></td>
                            <td>Web アプリ・API への DDoS 攻撃・不正アクセスを防御する WAF</td>
                            <td>大量の不正 AI API リクエスト（コスト攻撃）を遮断。地域ベースの IP フィルタリング。レート制限ルールの適用。</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--amber)' }}>Sensitive Data Protection</strong></td>
                            <td>個人情報・機密情報を自動検出・分類・マスキング・削除するサービス（旧 Cloud DLP）</td>
                            <td>トレーニングデータ・RAG ナレッジベースに含まれる PII（個人識別情報）を自動検出して除去。</td>
                        </tr>
                    </tbody>
                </table>

                <div className="bp">
                    <div className="bpt">◆ セキュアな AI 設計の黄金律</div>
                    <ul>
                        <li><strong>Secure by Design（設計段階からセキュアに）：</strong>後付けではなく、アーキテクチャ設計の最初からセキュリティを組み込む</li>
                        <li><strong>Defense in Depth（多層防御）：</strong>1つのセキュリティ層が突破されても次の層で防御できるよう、複数のセキュリティメカニズムを重ねる</li>
                        <li><strong>Zero Trust（ゼロトラスト）：</strong>「信頼できるネットワーク内」という概念を廃止し、全ての通信・アクセスを検証する</li>
                        <li><strong>Principle of Least Privilege（最小権限の原則）：</strong>AI エージェントを含む全エンティティに、タスクに必要な最小限の権限のみを付与する</li>
                    </ul>
                </div>
                <div className="src">
                    <div className="srct">📎 参照リソース</div>
                    <a href="https://cloud.google.com/security/ai" target="_blank" rel="noreferrer">https://cloud.google.com/security/ai</a>
                    <a href="https://services.google.com/fh/files/blogs/google_secure_ai_framework_approach.pdf" target="_blank" rel="noreferrer">Google SAIF 詳細ドキュメント: https://services.google.com/fh/files/blogs/google_secure_ai_framework_approach.pdf</a>
                    <a href="https://cloud.google.com/security/products/security-command-center" target="_blank" rel="noreferrer">https://cloud.google.com/security/products/security-command-center</a>
                    <a href="https://cloud.google.com/security/products/iam" target="_blank" rel="noreferrer">https://cloud.google.com/security/products/iam</a>
                </div>
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

            {/* What is Responsible AI */}
            <div className="card">
                <div className="card-h">🌱 責任ある AI とは何か？なぜビジネスに必要か？</div>
                <p style={{ fontSize: '14px', lineHeight: 1.8, marginBottom: '16px' }}>
                    責任ある AI とは、<strong style={{ color: 'var(--sage)' }}>AI を倫理的・公平・透明・安全に設計・開発・展開・監視する原則と実践の集合体</strong>。
                    単なる道徳論ではなく、<strong style={{ color: 'var(--amber)' }}>ビジネスリスク管理・規制対応・ブランド価値保護</strong>の観点からも不可欠な経営課題。
                </p>

                <div className="fgrid">
                    <div className="fi">
                        <div className="fi-t" style={{ color: 'var(--sage)' }}>⚖️ 法規制リスク</div>
                        <div className="fi-d">EU AI Act・GDPR・CCPA など、AIに関する規制が世界中で強化中。責任あるAIの不備は多額の制裁金リスク。コンプライアンスと AI 活用の両立が必須。</div>
                    </div>
                    <div className="fi">
                        <div className="fi-t" style={{ color: 'var(--sage)' }}>🏛️ ブランド・信頼リスク</div>
                        <div className="fi-d">AIの偏った出力・プライバシー侵害・差別的な判断は、消費者の信頼を一瞬で失わせる。企業価値・顧客ロイヤリティへの長期的な打撃となる。</div>
                    </div>
                    <div className="fi">
                        <div className="fi-t" style={{ color: 'var(--sage)' }}>👥 社会的影響責任</div>
                        <div className="fi-d">AIは採用・融資・医療診断など、人の人生に直接影響する判断に使われる。不公平な AI は社会的不平等を拡大させる可能性がある。</div>
                    </div>
                    <div className="fi">
                        <div className="fi-t" style={{ color: 'var(--sage)' }}>🏆 競争優位</div>
                        <div className="fi-d">責任あるAIは「コスト」ではなく「差別化要因」。信頼できるAIを提供する企業が、長期的に顧客・パートナー・人材を引き付ける競争優位を持つ。</div>
                    </div>
                </div>
            </div>

            {/* Google's 7 Principles */}
            <div className="card">
                <div className="card-h">📜 Google の AI 原則（7 Principles）</div>
                <p style={{ fontSize: '14px', lineHeight: 1.8, marginBottom: '16px' }}>
                    Google は 2018年に <strong style={{ color: 'var(--amber)' }}>AI 開発の7つの原則</strong>を公表し、全製品・サービスの AI 開発に適用している。試験では原則の内容の理解が問われる。
                </p>

                <div className="fgrid">
                    <div className="fi" style={{ borderColor: 'var(--brd2)' }}>
                        <div className="fi-t">① 社会的に有益であること</div>
                        <div className="fi-d">AIの利益が潜在的なリスクを大幅に上回る場合にのみ開発を進める。科学・人類・社会への明確な貢献を追求する。</div>
                    </div>
                    <div className="fi" style={{ borderColor: 'var(--brd2)' }}>
                        <div className="fi-t">② 不公平なバイアスを作り出したり強化したりしないこと</div>
                        <div className="fi-d">人種・性別・国籍・宗教などに基づく不当な差別を AI が生み出さないよう、継続的なバイアス評価を実施する。</div>
                    </div>
                    <div className="fi" style={{ borderColor: 'var(--brd2)' }}>
                        <div className="fi-t">③ 安全性のために構築・テストされること</div>
                        <div className="fi-d">予期しない動作・悪用を防ぐための安全対策を設計段階から組み込む。テストと検証を継続的に実施する。</div>
                    </div>
                    <div className="fi" style={{ borderColor: 'var(--brd2)' }}>
                        <div className="fi-t">④ 人々に対して説明責任を持つこと</div>
                        <div className="fi-d">AIの判断を人間が理解・評価・修正できる仕組みを提供する。Human-in-the-Loop を適切に設計する。</div>
                    </div>
                    <div className="fi" style={{ borderColor: 'var(--brd2)' }}>
                        <div className="fi-t">⑤ プライバシーの設計原則を組み込むこと</div>
                        <div className="fi-d">個人データの収集・使用について透明性を保ち、ユーザーが自分のデータを管理できる手段を提供する。</div>
                    </div>
                    <div className="fi" style={{ borderColor: 'var(--brd2)' }}>
                        <div className="fi-t">⑥ 科学的卓越性の高い基準を維持すること</div>
                        <div className="fi-d">AI の進歩のために、多角的な視点・オープンな議論・科学的厳密性を持った研究を行う。</div>
                    </div>
                    <div className="fi" style={{ borderColor: 'var(--brd2)' }}>
                        <div className="fi-t">⑦ 上記の原則に沿って利用できるようにすること</div>
                        <div className="fi-d">Google の AI ツール・サービスをこれらの原則に整合する用途にのみ提供する。武器化・監視・人権侵害への利用は禁止。</div>
                    </div>
                </div>
            </div>

            {/* Core RAI Principles */}
            <div className="card">
                <div className="card-h">🏛️ 責任ある AI の核心原則（試験必須の6要素）</div>

                <div className="rai-grid">
                    <div className="rai-card">
                        <div className="rai-icon">⚖️</div>
                        <div className="rai-name">公平性</div>
                        <div className="rai-en">Fairness</div>
                        <div className="rai-desc">AI が特定の人種・性別・年齢・国籍・障害などの属性によって差別的な結果を出さないこと。学習データのバイアスを積極的に検出・除去する。</div>
                        <div className="rai-check">
                            <div className="rai-check-t">▸ 実践的アプローチ</div>
                            学習データの多様性確保・定期的な公平性監査・グループ別精度の比較評価・RLHF による出力品質の改善
                        </div>
                    </div>
                    <div className="rai-card">
                        <div className="rai-icon">🔭</div>
                        <div className="rai-name">透明性</div>
                        <div className="rai-en">Transparency</div>
                        <div className="rai-desc">AIがどのように機能するか、なぜその判断をしたかを、利用者や社会に対して開示すること。「ブラックボックス AI」を避け、決定プロセスを可視化する。</div>
                        <div className="rai-check">
                            <div className="rai-check-t">▸ 実践的アプローチ</div>
                            AI であることの明示・決定根拠の提示（説明可能な AI）・モデルカードの公開・利用規約の明確化
                        </div>
                    </div>
                    <div className="rai-card">
                        <div className="rai-icon">🔍</div>
                        <div className="rai-name">説明可能性</div>
                        <div className="rai-en">Explainability</div>
                        <div className="rai-desc">AIの意思決定プロセスや予測根拠を、人間が理解できる形で説明できる能力。特に医療・金融・法律分野では規制上も必須となっている。</div>
                        <div className="rai-check">
                            <div className="rai-check-t">▸ Google Cloud での実装</div>
                            Vertex Explainable AI・SHAP値での特徴量重要度説明・注意機構の可視化・回答根拠のソース引用
                        </div>
                    </div>
                    <div className="rai-card">
                        <div className="rai-icon">🔐</div>
                        <div className="rai-name">プライバシー</div>
                        <div className="rai-en">Privacy</div>
                        <div className="rai-desc">個人情報の収集・保存・使用を最小限に抑え、ユーザーが自分のデータに対して意味のある管理権を持てること。データ収集には明示的な同意が必要。</div>
                        <div className="rai-check">
                            <div className="rai-check-t">▸ 実践的アプローチ</div>
                            データ最小化原則・目的限定収集・匿名化・仮名化・差分プライバシー・暗号化・忘れられる権利への対応
                        </div>
                    </div>
                    <div className="rai-card">
                        <div className="rai-icon">📋</div>
                        <div className="rai-name">説明責任</div>
                        <div className="rai-en">Accountability</div>
                        <div className="rai-desc">AIの出力・判断に対して、明確な責任を持つ人間・組織が存在すること。AIに「責任を転嫁」することはできない。監査証跡と HITL が基盤となる。</div>
                        <div className="rai-check">
                            <div className="rai-check-t">▸ 実践的アプローチ</div>
                            AI ガバナンス委員会の設置・監査ログの保存・Human-in-the-Loop 設計・インシデント対応計画の整備
                        </div>
                    </div>
                    <div className="rai-card">
                        <div className="rai-icon">🛡️</div>
                        <div className="rai-name">安全性</div>
                        <div className="rai-en">Safety</div>
                        <div className="rai-desc">有害・危険・不適切なコンテンツの生成を防ぎ、AI が悪用・誤用されないようにするセーフガードを実装すること。安全フィルタと定期的なレッドチーム演習が重要。</div>
                        <div className="rai-check">
                            <div className="rai-check-t">▸ Google Cloud での実装</div>
                            Gemini Safety Settings・Vertex AI Content Filtering・Model Armor・定期的なレッドチーミング
                        </div>
                    </div>
                </div>
            </div>

            {/* Privacy Tech */}
            <div className="card">
                <div className="card-h">🔏 プライバシー保護の核心技術（試験頻出）</div>
                <p style={{ fontSize: '14px', lineHeight: 1.8, marginBottom: '16px' }}>
                    試験では特に <strong style={{ color: 'var(--amber)' }}>匿名化・仮名化・差分プライバシー</strong>の違いと適用場面が問われる。3つの概念を正確に区別して理解することが重要。
                </p>

                <div className="priv-grid">
                    <div className="priv">
                        <div className="priv-name">データ匿名化</div>
                        <div className="priv-en">Anonymization / De-identification</div>
                        <div className="priv-desc">
                            個人を特定できる全ての識別情報（名前・住所・生年月日・電話番号・顔写真等）を<strong style={{ color: 'var(--cream)' }}>完全に除去または変換</strong>する処理。
                            匿名化されたデータは再識別が（理論上）不可能とされ、GDPR の規制対象外となる。
                        </div>
                        <div className="priv-example">
                            <div className="priv-example-t">▸ 処理例</div>
                            元データ：「田中太郎（東京都渋谷区）が2024年3月15日に診察を受けた」<br />
                            匿名化後：「30代男性（東京都内）が2024年3月に診察を受けた」
                        </div>
                    </div>
                    <div className="priv">
                        <div className="priv-name">仮名化</div>
                        <div className="priv-en">Pseudonymization</div>
                        <div className="priv-desc">
                            直接識別子（名前・ID等）を<strong style={{ color: 'var(--cream)' }}>仮の識別子（トークン・ハッシュ値等）に置換</strong>する処理。
                            元のデータと仮名化データを「紐付けテーブル」で結びつければ再識別は可能。
                            GDPR では引き続き個人データとして扱われるが、適切な保護措置として認められる。
                        </div>
                        <div className="priv-example">
                            <div className="priv-example-t">▸ 処理例</div>
                            元データ：「田中太郎（ユーザーID: tanaka_taro）の購買履歴」<br />
                            仮名化後：「ユーザー #a3f7d2b（仮名）の購買履歴」<br />
                            ※ 別の安全な場所に「#a3f7d2b = 田中太郎」の変換テーブルを保管
                        </div>
                    </div>
                    <div className="priv">
                        <div className="priv-name">差分プライバシー</div>
                        <div className="priv-en">Differential Privacy</div>
                        <div className="priv-desc">
                            統計的ノイズ（ランダムな誤差）をデータに加えることで、<strong style={{ color: 'var(--cream)' }}>個人の情報を漏洩させずにデータセット全体の統計的傾向を共有</strong>できる数学的手法。
                            Google・Apple が大規模に実用化。AI 学習に使うデータの保護に有効。
                        </div>
                        <div className="priv-example">
                            <div className="priv-example-t">▸ 活用例</div>
                            「Androidユーザーの平均的なタイピング速度」を個々のユーザーの情報を明かさずに収集・分析。
                            モデルトレーニング時の学習データにノイズを加えて個人情報の漏洩を防止する。
                        </div>
                    </div>
                </div>

                <div className="warn">
                    <div className="warnt">⚠️ 試験頻出：3つの技術の重要な違い</div>
                    <ul>
                        <li><strong style={{ color: 'var(--cream)' }}>匿名化（Anonymization）</strong>：識別情報を完全除去 → 再識別不可 → GDPR 対象外になる</li>
                        <li><strong style={{ color: 'var(--cream)' }}>仮名化（Pseudonymization）</strong>：識別子を別の識別子に置換 → 紐付けテーブルで再識別可能 → GDPR 引き続き適用</li>
                        <li><strong style={{ color: 'var(--cream)' }}>差分プライバシー</strong>：統計ノイズを加える数学的手法 → 個人ではなく集団の傾向を保護 → AI学習データの保護に特に有効</li>
                    </ul>
                </div>
            </div>

            {/* Bias & Fairness in Depth */}
            <div className="card">
                <div className="card-h">📊 データ品質・バイアス・公平性の深掘り</div>
                <p style={{ fontSize: '14px', lineHeight: 1.8, marginBottom: '16px' }}>
                    AI のバイアスは技術的問題であると同時に<strong style={{ color: 'var(--amber)' }}>ビジネス・社会的リスク</strong>でもある。データ品質がモデルの公平性の根本を決定する。
                </p>

                <div className="fgrid">
                    <div className="fi">
                        <div className="fi-t" style={{ color: 'var(--rose)' }}>📉 代表性バイアス</div>
                        <div className="fi-d">特定の人口グループが学習データに過少・過多に含まれることで発生。例：顔認識AIが暗い肌色の人物の精度が低い（学習データが白人中心）。</div>
                    </div>
                    <div className="fi">
                        <div className="fi-t" style={{ color: 'var(--rose)' }}>🏛️ 歴史的バイアス</div>
                        <div className="fi-d">過去の人間の偏った判断を反映したデータで学習したモデルが、その偏りを再現・強化する。例：採用AIが過去の採用データ（男性偏重）を学習して女性を低評価。</div>
                    </div>
                    <div className="fi">
                        <div className="fi-t" style={{ color: 'var(--rose)' }}>📝 測定バイアス</div>
                        <div className="fi-d">データ収集・ラベリングのプロセス自体にバイアスがある場合。アノテーターの文化的背景・個人的偏見が正解ラベルに影響する。</div>
                    </div>
                    <div className="fi">
                        <div className="fi-t" style={{ color: 'var(--sage)' }}>🔄 継続的公平性評価</div>
                        <div className="fi-d">バイアスは一度排除すれば終わりではない。データ分布の変化・新しいユースケースで再発する。定期的な公平性メトリクスの計測が必要。</div>
                    </div>
                    <div className="fi">
                        <div className="fi-t" style={{ color: 'var(--sage)' }}>🌍 多様なチームの重要性</div>
                        <div className="fi-d">AI 開発チームの多様性（性別・人種・文化的背景・専門分野）自体がバイアス低減に貢献する。多角的な視点がバイアスの見落としを防ぐ。</div>
                    </div>
                    <div className="fi">
                        <div className="fi-t" style={{ color: 'var(--sage)' }}>📊 Vertex AI のバイアス検出</div>
                        <div className="fi-d">Vertex Explainable AI・Model Evaluation Service で人口統計グループ別の精度差を自動測定。NDCG・精度・再現率の分解分析が可能。</div>
                    </div>
                </div>

                <div className="bp">
                    <div className="bpt">◆ 責任ある AI 実装のベストプラクティス</div>
                    <ul>
                        <li><strong>「倫理レビュー」を開発プロセスに組み込む：</strong>コードレビューと同様に、AI の倫理的影響を正式な評価ステップとして組み込む</li>
                        <li><strong>AI ガバナンス委員会を設置する：</strong>技術・法律・倫理・ビジネスの代表者で構成し、高リスク AI プロジェクトを審査する</li>
                        <li><strong>「AI カード（Model Card）」を作成・公開する：</strong>AI の用途・限界・バイアス評価結果・使用条件を記載した技術文書で透明性を確保する</li>
                        <li><strong>Human-in-the-Loop を適切に設計する：</strong>全ての判断をAIに委ねるのではなく、高リスク・高影響な判断には必ず人間の確認を挟む</li>
                        <li><strong>継続的な Red Team（レッドチーム）演習：</strong>意図的に AI を攻撃・悪用しようとするテストを定期実施し、脆弱性を事前発見する</li>
                    </ul>
                </div>

                <div className="src">
                    <div className="srct">📎 参照リソース</div>
                    <a href="https://ai.google/responsibility/principles/" target="_blank" rel="noreferrer">Google AI 原則: https://ai.google/responsibility/principles/</a>
                    <a href="https://cloud.google.com/vertex-ai/docs/explainable-ai/overview" target="_blank" rel="noreferrer">Vertex Explainable AI: https://cloud.google.com/vertex-ai/docs/explainable-ai/overview</a>
                    <a href="https://cloud.google.com/security/products/sensitive-data-protection" target="_blank" rel="noreferrer">Sensitive Data Protection: https://cloud.google.com/security/products/sensitive-data-protection</a>
                    <a href="https://cloud.google.com/responsible-ai" target="_blank" rel="noreferrer">Google Cloud 責任あるAI: https://cloud.google.com/responsible-ai</a>
                </div>
            </div>
        </section>
    );
}

/* ── Summary Section ── */
function SummarySection() {
    return (
        <section id="summary">
            <div className="card" style={{ borderColor: 'var(--brd2)', background: 'linear-gradient(135deg, var(--bg2), var(--bg4))' }}>
                <div className="card-h" style={{ fontSize: '18px', fontFamily: 'var(--serif)' }}>◆ Section 4 試験攻略 — 最重要ポイント完全まとめ</div>

                <div className="scorecard">
                    <div className="sc">
                        <div className="sc-v">~15%</div>
                        <div className="sc-l">試験全体での配点</div>
                    </div>
                    <div className="sc">
                        <div className="sc-v">3</div>
                        <div className="sc-l">サブセクション数</div>
                    </div>
                    <div className="sc">
                        <div className="sc-v">5</div>
                        <div className="sc-l">実装ステップ数</div>
                    </div>
                    <div className="sc">
                        <div className="sc-v">6</div>
                        <div className="sc-l">SAIF 原則数</div>
                    </div>
                    <div className="sc">
                        <div className="sc-v">6</div>
                        <div className="sc-l">責任ある AI 要素数</div>
                    </div>
                </div>

                <div className="fgrid" style={{ marginTop: '24px' }}>
                    <div className="fi" style={{ borderColor: 'var(--brd2)' }}>
                        <div className="fi-t" style={{ color: 'var(--amber)' }}>4.1 で絶対押さえる4点</div>
                        <div className="fi-d">
                            ① 5種類の Gen AI ソリューションタイプと適用場面<br />
                            ② 実装5ステップの順序と各ステップの重要考慮点<br />
                            ③ ビジネス要件 vs 技術的制約のトレードオフ評価<br />
                            ④ 4カテゴリの KPI 測定フレームワーク
                        </div>
                    </div>
                    <div className="fi" style={{ borderColor: 'var(--brd2)' }}>
                        <div className="fi-t" style={{ color: 'var(--rose)' }}>4.2 で絶対押さえる4点</div>
                        <div className="fi-d">
                            ① AI 固有のセキュリティリスク6種（特にプロンプトインジェクション）<br />
                            ② ML ライフサイクル全5フェーズのセキュリティ対策<br />
                            ③ SAIF 6原則の内容と目的<br />
                            ④ IAM・Security Command Center・VPC Service Controls・Model Armor の役割
                        </div>
                    </div>
                    <div className="fi" style={{ borderColor: 'var(--brd2)' }}>
                        <div className="fi-t" style={{ color: 'var(--sage)' }}>4.3 で絶対押さえる4点</div>
                        <div className="fi-d">
                            ① 責任ある AI の6核心原則（公平性・透明性・説明可能性・プライバシー・説明責任・安全性）<br />
                            ② 匿名化・仮名化・差分プライバシーの違い（特に再識別可否）<br />
                            ③ バイアスの3種類（代表性・歴史的・測定）と対策<br />
                            ④ Google AI 7原則の概要
                        </div>
                    </div>
                </div>

                <div className="warn" style={{ marginTop: '20px' }}>
                    <div className="warnt">⚠️ Section 4 で特に混同しやすい概念</div>
                    <ul>
                        <li><strong style={{ color: 'var(--cream)' }}>匿名化 ≠ 仮名化</strong>：匿名化は再識別不可（GDPR対象外）、仮名化は紐付けテーブルで再識別可能（GDPR引き続き対象）</li>
                        <li><strong style={{ color: 'var(--cream)' }}>Secure AI（セキュリティ） ≠ Responsible AI（倫理）</strong>：前者はサイバー攻撃・悪用への防御、後者はバイアス・透明性・公平性の倫理的配慮</li>
                        <li><strong style={{ color: 'var(--cream)' }}>透明性 ≠ 説明可能性</strong>：透明性は「AIであることを知らせる」こと、説明可能性は「なぜその答えを出したか説明できる」能力</li>
                        <li><strong style={{ color: 'var(--cream)' }}>SAIF は Google 独自のルールではない</strong>：既存のサイバーセキュリティの原則を AI 時代に拡張した普遍的フレームワーク</li>
                    </ul>
                </div>

                <div className="src">
                    <div className="srct">📎 Section 4 全体の参照リソース</div>
                    <a href="https://cloud.google.com/learn/certification/generative-ai-leader" target="_blank" rel="noreferrer">試験ページ: https://cloud.google.com/learn/certification/generative-ai-leader</a>
                    <a href="https://services.google.com/fh/files/misc/generative_ai_leader_exam_guide_english.pdf" target="_blank" rel="noreferrer">試験ガイド PDF: https://services.google.com/fh/files/misc/generative_ai_leader_exam_guide_english.pdf</a>
                    <a href="https://ai.google/responsibility/principles/" target="_blank" rel="noreferrer">Google AI 原則: https://ai.google/responsibility/principles/</a>
                    <a href="https://services.google.com/fh/files/blogs/google_secure_ai_framework_approach.pdf" target="_blank" rel="noreferrer">SAIF ドキュメント: https://services.google.com/fh/files/blogs/google_secure_ai_framework_approach.pdf</a>
                    <a href="https://cloud.google.com/responsible-ai" target="_blank" rel="noreferrer">Google Cloud 責任ある AI: https://cloud.google.com/responsible-ai</a>
                    <a href="https://cloud.google.com/security/ai" target="_blank" rel="noreferrer">Google Cloud AI セキュリティ: https://cloud.google.com/security/ai</a>
                    <a href="https://cloud.google.com/vertex-ai/docs/explainable-ai/overview" target="_blank" rel="noreferrer">Vertex Explainable AI: https://cloud.google.com/vertex-ai/docs/explainable-ai/overview</a>
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
                <div className="divider"><div className="divider-gem" /></div>
                <Section42 />
                <div className="divider"><div className="divider-gem" /></div>
                <Section43 />
                <div className="divider"><div className="divider-gem" /></div>
                <SummarySection />
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
