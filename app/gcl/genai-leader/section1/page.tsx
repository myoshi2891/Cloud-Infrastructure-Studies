import type { Metadata } from 'next';
import { Fraunces, Azeret_Mono } from 'next/font/google';
import './section1.css';

const fraunces = Fraunces({
    subsets: ['latin'],
    axes: ['opsz'],
    variable: '--font-fraunces',
    display: 'swap',
});

const azeretMono = Azeret_Mono({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600'],
    variable: '--font-azeret-mono',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Section 1: Gen AI 基礎知識 | Generative AI Leader',
    description:
        'Generative AI Leader 試験 Section 1 完全解説 — AI・ML・生成AIの核心概念、データの本質、Gen AI ランドスケープ、Google基盤モデル',
};

/* ── 参照リソース共通コンポーネント ── */
interface RefsItem { href: string; label?: string }

function ReferencesBlock({ title, items }: { title: string; items: RefsItem[] }) {
    return (
        <div className="src">
            <div className="srct">{title}</div>
            {items.map(({ href, label }) => (
                <a key={href} href={href} target="_blank" rel="noreferrer">
                    {label ?? href}
                </a>
            ))}
        </div>
    );
}

/* ── Sub-section 1.1: 核心概念・用語 ── */
function Section11() {
    return (
        <section id="s11">
            <div className="sh sha">
                <div className="sh-icon si-a">🧠</div>
                <div className="sh-body">
                    <h2>Gen AI の核心概念・用語と定義</h2>
                    <p>試験で必須の AI・ML・LLM・基盤モデルほか主要用語を体系的に定義する</p>
                </div>
                <div className="sh-badge sba">試験最頻出</div>
            </div>

            {/* AI → ML → 深層学習 → 生成AI 包含関係 */}
            <div className="card">
                <div className="card-h">🌌 AI → ML → 深層学習 → 生成 AI の包含関係（最重要図）</div>
                <p style={{ fontSize: '14px', lineHeight: 1.8, marginBottom: '16px' }}>
                    試験では「生成 AI は AI の一種か？」「LLM と基盤モデルの違いは？」のような問いが出る。
                    まず<strong style={{ color: 'var(--aurora3)' }}>包含関係の全体像</strong>を正確に理解することが出発点。
                </p>

                <div className="hierarchy">
                    <div className="hier-row">
                        <div className="hier-indent">
                            <div className="hier-dot" style={{ background: 'var(--aurora1)' }}></div>
                            <div className="hier-name" style={{ color: 'var(--aurora1)' }}>人工知能（AI）</div>
                        </div>
                        <div className="hier-body">
                            <p>人間の知的行動をコンピュータで模倣する技術分野全体の総称。最も広い概念。機械学習・エキスパートシステム・ロボティクスなどを含む。</p>
                            <div className="hier-tags">
                                <span className="ht" style={{ background: 'rgba(224,64,160,0.08)', color: 'var(--aurora1)', borderColor: 'rgba(224,64,160,0.2)' }}>Artificial Intelligence</span>
                                <span className="ht" style={{ color: 'var(--muted)', borderColor: 'var(--rim)' }}>最上位概念</span>
                            </div>
                        </div>
                    </div>
                    <div className="hier-row">
                        <div className="hier-indent" style={{ paddingLeft: '36px' }}>
                            <div className="hier-dot" style={{ background: 'var(--aurora2)' }}></div>
                            <div className="hier-name" style={{ color: 'var(--aurora2)' }}>機械学習（ML）</div>
                        </div>
                        <div className="hier-body">
                            <p>データからパターンを自動的に学習するAIの手法。教師あり・教師なし・強化学習の3アプローチ。</p>
                            <div className="hier-tags">
                                <span className="ht" style={{ background: 'rgba(123,79,232,0.08)', color: 'var(--aurora2)', borderColor: 'rgba(123,79,232,0.2)' }}>Machine Learning</span>
                                <span className="ht" style={{ color: 'var(--muted)', borderColor: 'var(--rim)' }}>AI の手法の一つ</span>
                            </div>
                        </div>
                    </div>
                    <div className="hier-row">
                        <div className="hier-indent" style={{ paddingLeft: '72px' }}>
                            <div className="hier-dot" style={{ background: 'var(--aurora3)' }}></div>
                            <div className="hier-name" style={{ color: 'var(--aurora3)' }}>深層学習（DL）</div>
                        </div>
                        <div className="hier-body">
                            <p>多層ニューラルネットワークを使ったML手法。大量データと高い計算能力で複雑なパターンを学習する。</p>
                            <div className="hier-tags">
                                <span className="ht" style={{ background: 'rgba(30,184,212,0.08)', color: 'var(--aurora3)', borderColor: 'rgba(30,184,212,0.2)' }}>Deep Learning</span>
                            </div>
                        </div>
                    </div>
                    <div className="hier-row">
                        <div className="hier-indent" style={{ paddingLeft: '108px' }}>
                            <div className="hier-dot" style={{ background: 'var(--aurora4)' }}></div>
                            <div className="hier-name" style={{ color: 'var(--aurora4)' }}>生成 AI（Gen AI）</div>
                        </div>
                        <div className="hier-body">
                            <p>新しいコンテンツ（テキスト・画像・音声・動画・コード）を生成できるDLモデル。最も内側の概念。</p>
                            <div className="hier-tags">
                                <span className="ht" style={{ background: 'rgba(24,217,139,0.08)', color: 'var(--aurora4)', borderColor: 'rgba(24,217,139,0.2)' }}>Generative AI</span>
                                <span className="ht" style={{ color: 'var(--muted)', borderColor: 'var(--rim)' }}>DL の特殊な応用</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 主要用語グロッサリー */}
            <div className="card">
                <div className="card-h">📖 試験必須用語グロッサリー</div>
                <div className="glossary">
                    <div className="gterm">
                        <div className="gt-en">Foundation Model</div>
                        <div className="gt-jp">基盤モデル</div>
                        <div className="gt-def">大規模データで事前学習された汎用モデル。ファインチューニングなしに多様なタスクに対応できる。GPT・Gemini・Claude が代表例。</div>
                    </div>
                    <div className="gterm">
                        <div className="gt-en">Large Language Model</div>
                        <div className="gt-jp">LLM（大規模言語モデル）</div>
                        <div className="gt-def">テキストに特化した基盤モデル。数兆トークンで学習し、自然言語の理解・生成に優れる。基盤モデルのサブセット。</div>
                    </div>
                    <div className="gterm">
                        <div className="gt-en">Multimodal Model</div>
                        <div className="gt-jp">マルチモーダルモデル</div>
                        <div className="gt-def">テキスト・画像・音声・動画など複数のモダリティを同時に理解・生成できるモデル。Gemini が代表例。</div>
                    </div>
                    <div className="gterm">
                        <div className="gt-en">Prompt</div>
                        <div className="gt-jp">プロンプト</div>
                        <div className="gt-def">モデルへの入力指示。Zero-shot（例なし）・Few-shot（例あり）・Chain-of-Thought（思考過程）の3種類が試験頻出。</div>
                    </div>
                    <div className="gterm">
                        <div className="gt-en">Hallucination</div>
                        <div className="gt-jp">ハルシネーション（幻覚）</div>
                        <div className="gt-def">LLM が事実ではない情報を自信を持って生成する現象。RAG やグラウンディングで軽減できる。</div>
                    </div>
                    <div className="gterm">
                        <div className="gt-en">Fine-tuning</div>
                        <div className="gt-jp">ファインチューニング</div>
                        <div className="gt-def">事前学習済みモデルを特定タスク用データで追加学習する手法。プロンプトエンジニアリングより高精度だがコスト高。</div>
                    </div>
                    <div className="gterm">
                        <div className="gt-en">RAG</div>
                        <div className="gt-jp">検索拡張生成</div>
                        <div className="gt-def">Retrieval-Augmented Generation。最新情報をベクトルDBから動的取得してコンテキストに注入する手法。ハルシネーション抑制に有効。</div>
                    </div>
                    <div className="gterm">
                        <div className="gt-en">Embedding</div>
                        <div className="gt-jp">埋め込みベクトル</div>
                        <div className="gt-def">テキスト・画像などを意味を保ったまま高次元数値ベクトルに変換したもの。類似度計算・RAG・検索の基盤技術。</div>
                    </div>
                </div>

                <div className="bp">
                    <div className="bpt">試験攻略ポイント</div>
                    <ul>
                        <li>「基盤モデル ⊃ LLM」— LLM は基盤モデルの一種。マルチモーダルモデルは LLM ではない</li>
                        <li>「Gen AI ⊂ DL ⊂ ML ⊂ AI」— 内包関係を逆に答えさせる問題に注意</li>
                        <li>ハルシネーション対策として「RAG」「グラウンディング」「温度パラメータ低下」が選択肢に出やすい</li>
                        <li>Few-shot プロンプトは「例を含むプロンプト」— Zero-shot は「例なし」</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

/* ── Sub-section 1.1b: ML アプローチ ── */
function Section11b() {
    return (
        <section id="s11b">
            <div className="card">
                <div className="card-h">🎓 機械学習の3つのアプローチ — 完全解説</div>
                <p style={{ fontSize: '14px', lineHeight: 1.8, marginBottom: '16px' }}>
                    試験では「このビジネス課題には教師あり・教師なし・強化学習のどれが適切か」という実践的な問いが出る。
                    各アプローチの<strong style={{ color: 'var(--aurora3)' }}>データ形式・学習方法・代表的ユースケース</strong>を正確に区別する。
                </p>

                <div className="approach-grid">
                    <div className="appr-card appr-1">
                        <div className="appr-icon">🎯</div>
                        <div className="appr-name">教師あり学習</div>
                        <div className="appr-sub">Supervised Learning</div>
                        <div className="appr-body">
                            <strong style={{ color: 'var(--bright)' }}>正解ラベル付き</strong>のデータ（入力→正解ペア）でモデルを訓練する手法。
                            最も広く使われるアプローチ。
                        </div>
                        <div className="appr-tags">
                            <span className="at">画像分類</span>
                            <span className="at">スパム検出</span>
                            <span className="at">チャーン予測</span>
                            <span className="at">SFT・RLHF</span>
                        </div>
                    </div>
                    <div className="appr-card appr-2">
                        <div className="appr-icon">🔍</div>
                        <div className="appr-name">教師なし学習</div>
                        <div className="appr-sub">Unsupervised Learning</div>
                        <div className="appr-body">
                            <strong style={{ color: 'var(--bright)' }}>ラベルなし</strong>のデータから自律的にパターン・構造・グループを発見する手法。
                        </div>
                        <div className="appr-tags">
                            <span className="at">クラスタリング</span>
                            <span className="at">異常検知</span>
                            <span className="at">次元削減</span>
                            <span className="at">LLM事前学習</span>
                        </div>
                    </div>
                    <div className="appr-card appr-3">
                        <div className="appr-icon">🏆</div>
                        <div className="appr-name">強化学習</div>
                        <div className="appr-sub">Reinforcement Learning</div>
                        <div className="appr-body">
                            エージェントが<strong style={{ color: 'var(--bright)' }}>試行錯誤</strong>しながら報酬を最大化するよう学習する手法。
                        </div>
                        <div className="appr-tags">
                            <span className="at">ゲームAI</span>
                            <span className="at">自動運転</span>
                            <span className="at">ロボット制御</span>
                            <span className="at">RLHF</span>
                        </div>
                    </div>
                </div>

                <div className="warn">
                    <div className="warnt">試験頻出の引っかけ</div>
                    <ul>
                        <li>LLM の事前学習は「教師なし学習」— 次のトークン予測は自己教師あり学習とも呼ばれるが試験では教師なし学習に分類</li>
                        <li>RLHF（人間フィードバックによる強化学習）は「強化学習」— Gen AI 改善でよく使われる</li>
                        <li>ファインチューニング（SFT）は「教師あり学習」— ラベル付きデータが必要</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

/* ── Sub-section 1.1c: ML ライフサイクル ── */
function Section11c() {
    return (
        <section id="s11c">
            <div className="card">
                <div className="card-h">🔄 ML ライフサイクル 5 ステージと Google Cloud ツール対応表</div>
                <p style={{ fontSize: '14px', lineHeight: 1.8, marginBottom: '16px' }}>
                    試験では「このステージを担当する Google Cloud ツールは？」の問題が頻出。
                    各ステージの目的と対応ツールを正確にマッピングして覚える。
                </p>

                <div className="lifecycle">
                    <div className="lc-step">
                        <div className="lc-num" style={{ color: 'var(--aurora1)' }}>1</div>
                        <div className="lc-title">データ収集・準備</div>
                        <p style={{ fontSize: '12px', color: 'var(--text)', lineHeight: 1.7 }}>
                            学習に必要なデータを収集し、クリーニング・ラベリング・前処理を行う
                        </p>
                        <div className="lc-tools">
                            <span className="lct">BigQuery</span>
                            <span className="lct">Cloud Storage</span>
                            <span className="lct">Dataflow</span>
                        </div>
                    </div>
                    <div className="lc-step">
                        <div className="lc-num" style={{ color: 'var(--aurora2)' }}>2</div>
                        <div className="lc-title">モデル開発・実験</div>
                        <p style={{ fontSize: '12px', color: 'var(--text)', lineHeight: 1.7 }}>
                            アーキテクチャ選択・ハイパーパラメータ探索・実験管理
                        </p>
                        <div className="lc-tools">
                            <span className="lct">Vertex AI Workbench</span>
                            <span className="lct">Colab Enterprise</span>
                        </div>
                    </div>
                    <div className="lc-step">
                        <div className="lc-num" style={{ color: 'var(--aurora3)' }}>3</div>
                        <div className="lc-title">学習・評価</div>
                        <p style={{ fontSize: '12px', color: 'var(--text)', lineHeight: 1.7 }}>
                            スケーラブルな学習インフラでモデルを訓練し、メトリクスで評価
                        </p>
                        <div className="lc-tools">
                            <span className="lct">Vertex AI Training</span>
                            <span className="lct">Model Evaluation</span>
                        </div>
                    </div>
                    <div className="lc-step">
                        <div className="lc-num" style={{ color: 'var(--aurora4)' }}>4</div>
                        <div className="lc-title">デプロイ・提供</div>
                        <p style={{ fontSize: '12px', color: 'var(--text)', lineHeight: 1.7 }}>
                            本番環境にモデルをデプロイし、推論エンドポイントを提供
                        </p>
                        <div className="lc-tools">
                            <span className="lct">Vertex AI Endpoints</span>
                            <span className="lct">Model Registry</span>
                        </div>
                    </div>
                    <div className="lc-step">
                        <div className="lc-num" style={{ color: 'var(--aurora5)' }}>5</div>
                        <div className="lc-title">監視・改善</div>
                        <p style={{ fontSize: '12px', color: 'var(--text)', lineHeight: 1.7 }}>
                            本番モデルのドリフト検知・再学習トリガー・継続的改善
                        </p>
                        <div className="lc-tools">
                            <span className="lct">Vertex AI Monitoring</span>
                            <span className="lct">Cloud Monitoring</span>
                        </div>
                    </div>
                </div>

                <div className="bp">
                    <div className="bpt">Vertex AI Pipelines の役割</div>
                    <ul>
                        <li>MLOps の自動化 — ステージ1〜5全体をパイプラインとして管理・自動化するサービス</li>
                        <li>再現性確保 — 実験の各ステップを記録し、同じ結果を再現可能にする</li>
                        <li>CI/CD for ML — モデルの継続的インテグレーション・デプロイを実現</li>
                    </ul>
                </div>
                <ReferencesBlock
                    title="📎 参照リソース"
                    items={[
                        { href: 'https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models' },
                        { href: 'https://cloud.google.com/vertex-ai' },
                        { href: 'https://arxiv.org/abs/1706.03762', label: 'Attention is All You Need 原論文' },
                    ]}
                />
            </div>
        </section>
    );
}

/* ── Sub-section 1.2: データの種類 ── */
function Section12() {
    return (
        <section id="s12">
            <div className="sh shb">
                <div className="sh-icon si-b">📊</div>
                <div className="sh-body">
                    <h2>データの種類とビジネス的意味</h2>
                    <p>構造化 vs 非構造化・ラベルあり vs なし・データ品質の6特性 — Gen AI を成功させるデータの本質を理解する</p>
                </div>
                <div className="sh-badge sbb">頻出</div>
            </div>

            <div className="card">
                <div className="card-h">🗄️ 構造化データ vs 非構造化データ</div>
                <p style={{ fontSize: '14px', lineHeight: 1.8, marginBottom: '16px' }}>
                    データの<strong style={{ color: 'var(--aurora3)' }}>80〜90% は非構造化データ</strong>と言われる。
                    Gen AI の革命的な点は、これまでコンピュータが扱いにくかった非構造化データを活用できるようになった点にある。
                </p>

                <table className="ctbl">
                    <thead>
                        <tr>
                            <th>種類</th>
                            <th>特徴</th>
                            <th>具体例</th>
                            <th>GCP 格納先</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ color: 'var(--aurora3)', fontFamily: 'var(--mono)', fontWeight: 600 }}>構造化データ</td>
                            <td>明確なスキーマ・行列形式</td>
                            <td>売上データ・顧客情報・センサー値</td>
                            <td>BigQuery · Cloud SQL · Spanner</td>
                        </tr>
                        <tr>
                            <td style={{ color: 'var(--aurora1)', fontFamily: 'var(--mono)', fontWeight: 600 }}>非構造化データ</td>
                            <td>スキーマなし・全体の80〜90%</td>
                            <td>テキスト・画像・音声・動画・PDF</td>
                            <td>Cloud Storage · AlloyDB</td>
                        </tr>
                        <tr>
                            <td style={{ color: 'var(--aurora4)', fontFamily: 'var(--mono)', fontWeight: 600 }}>半構造化データ</td>
                            <td>柔軟なスキーマ・階層構造あり</td>
                            <td>JSON・XML・メール・ログ</td>
                            <td>Firestore · BigQuery JSON</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="card">
                <div className="card-h">⚖️ データ品質の6特性</div>
                <div className="glossary">
                    <div className="gterm">
                        <div className="gt-en">Accuracy</div>
                        <div className="gt-jp">正確性</div>
                        <div className="gt-def">データが現実の状態を正しく反映しているか。誤ったデータはモデルを誤った方向に学習させる。</div>
                    </div>
                    <div className="gterm">
                        <div className="gt-en">Completeness</div>
                        <div className="gt-jp">完全性</div>
                        <div className="gt-def">必要なデータが欠損なく揃っているか。欠損値が多いと偏ったモデルになる。</div>
                    </div>
                    <div className="gterm">
                        <div className="gt-en">Consistency</div>
                        <div className="gt-jp">一貫性</div>
                        <div className="gt-def">異なるシステム間でデータが矛盾なく整合しているか。</div>
                    </div>
                    <div className="gterm">
                        <div className="gt-en">Timeliness</div>
                        <div className="gt-jp">適時性</div>
                        <div className="gt-def">データが最新の状態を反映しているか。古いデータで学習したモデルは時代遅れの予測をする。</div>
                    </div>
                    <div className="gterm">
                        <div className="gt-en">Uniqueness</div>
                        <div className="gt-jp">一意性</div>
                        <div className="gt-def">重複レコードがないか。重複はモデルの過学習を引き起こす。</div>
                    </div>
                    <div className="gterm">
                        <div className="gt-en">Validity</div>
                        <div className="gt-jp">妥当性</div>
                        <div className="gt-def">データが定義されたルール・形式・範囲に従っているか。</div>
                    </div>
                </div>
                <ReferencesBlock
                    title="📎 参照リソース"
                    items={[
                        { href: 'https://cloud.google.com/dataplex/docs/data-quality-overview' },
                        { href: 'https://cloud.google.com/security/products/sensitive-data-protection' },
                    ]}
                />
            </div>
        </section>
    );
}

/* ── Sub-section 1.3: Gen AI ランドスケープ ── */
function Section13() {
    return (
        <section id="s13">
            <div className="sh shc">
                <div className="sh-icon si-c">🗺️</div>
                <div className="sh-body">
                    <h2>Gen AI ランドスケープ — 5 層構造とビジネス的意味</h2>
                    <p>Infrastructure → Models → Platforms → Agents → Applications の5層ピラミッドと各層のビジネス的位置づけ</p>
                </div>
                <div className="sh-badge sbc">試験頻出</div>
            </div>

            <div className="card">
                <div className="card-h">🏗️ Gen AI エコシステムの5層構造</div>
                <p style={{ fontSize: '14px', lineHeight: 1.8, marginBottom: '16px' }}>
                    Gen AI のエコシステムは下層から上層へ、<strong style={{ color: 'var(--aurora4)' }}>「計算基盤→知能→ツール→自律→応用」</strong>の順で積み重なる5層構造で理解する。
                </p>

                <div className="landscape">
                    <div className="ls-layer" style={{ borderColor: 'rgba(224,64,160,0.25)' }}>
                        <div className="ls-num" style={{ color: 'var(--aurora1)', background: 'rgba(224,64,160,0.06)' }}>5</div>
                        <div className="ls-label" style={{ borderColor: 'rgba(224,64,160,0.2)' }}>
                            <div>
                                <div className="ls-label-name" style={{ color: 'var(--aurora1)' }}>アプリケーション層</div>
                                <div className="ls-label-en">APPLICATIONS</div>
                            </div>
                        </div>
                        <div className="ls-body">
                            エンドユーザーが直接触れる Gen AI 搭載の製品・サービス。<br />
                            <span style={{ color: 'var(--aurora1)', fontFamily: 'var(--mono)', fontSize: '12px' }}>例：Gemini app · Gemini for Workspace · NotebookLM · AI搭載SaaS</span>
                        </div>
                    </div>
                    <div className="ls-layer" style={{ borderColor: 'rgba(224,64,160,0.2)' }}>
                        <div className="ls-num" style={{ color: 'var(--aurora2)', background: 'rgba(123,79,232,0.06)' }}>4</div>
                        <div className="ls-label" style={{ borderColor: 'rgba(123,79,232,0.2)' }}>
                            <div>
                                <div className="ls-label-name" style={{ color: 'var(--aurora2)' }}>エージェント層</div>
                                <div className="ls-label-en">AGENTS</div>
                            </div>
                        </div>
                        <div className="ls-body">
                            自律的にツールを使い、複数ステップのタスクを実行するシステム。<br />
                            <span style={{ color: 'var(--aurora2)', fontFamily: 'var(--mono)', fontSize: '12px' }}>例：Vertex AI Agent Builder · Agentspace</span>
                        </div>
                    </div>
                    <div className="ls-layer" style={{ borderColor: 'rgba(30,184,212,0.25)' }}>
                        <div className="ls-num" style={{ color: 'var(--aurora3)', background: 'rgba(30,184,212,0.06)' }}>3</div>
                        <div className="ls-label" style={{ borderColor: 'rgba(30,184,212,0.2)' }}>
                            <div>
                                <div className="ls-label-name" style={{ color: 'var(--aurora3)' }}>プラットフォーム層</div>
                                <div className="ls-label-en">PLATFORMS</div>
                            </div>
                        </div>
                        <div className="ls-body">
                            開発者がモデルを活用・カスタマイズするツール群。<br />
                            <span style={{ color: 'var(--aurora3)', fontFamily: 'var(--mono)', fontSize: '12px' }}>例：Vertex AI Studio · Model Garden · AI Platform</span>
                        </div>
                    </div>
                    <div className="ls-layer" style={{ borderColor: 'rgba(24,217,139,0.25)' }}>
                        <div className="ls-num" style={{ color: 'var(--aurora4)', background: 'rgba(24,217,139,0.06)' }}>2</div>
                        <div className="ls-label" style={{ borderColor: 'rgba(24,217,139,0.2)' }}>
                            <div>
                                <div className="ls-label-name" style={{ color: 'var(--aurora4)' }}>モデル層</div>
                                <div className="ls-label-en">MODELS</div>
                            </div>
                        </div>
                        <div className="ls-body">
                            基盤モデル・LLM・マルチモーダルモデル本体。知識と能力の中核。<br />
                            <span style={{ color: 'var(--aurora4)', fontFamily: 'var(--mono)', fontSize: '12px' }}>例：Gemini · Gemma · Imagen · Veo · Claude · GPT</span>
                        </div>
                    </div>
                    <div className="ls-layer" style={{ borderColor: 'rgba(245,197,67,0.25)' }}>
                        <div className="ls-num" style={{ color: 'var(--aurora5)', background: 'rgba(245,197,67,0.06)' }}>1</div>
                        <div className="ls-label" style={{ borderColor: 'rgba(245,197,67,0.2)' }}>
                            <div>
                                <div className="ls-label-name" style={{ color: 'var(--aurora5)' }}>インフラ層</div>
                                <div className="ls-label-en">INFRASTRUCTURE</div>
                            </div>
                        </div>
                        <div className="ls-body">
                            GPU/TPU・クラウドコンピューティング・ストレージの計算基盤。<br />
                            <span style={{ color: 'var(--aurora5)', fontFamily: 'var(--mono)', fontSize: '12px' }}>例：TPU v5e · A100/H100 · Cloud TPU · Hypercomputer</span>
                        </div>
                    </div>
                </div>

                <div className="warn">
                    <div className="warnt">⚠️ 試験頻出：各層のビジネス的含意</div>
                    <ul>
                        <li><strong style={{ color: 'var(--bright)' }}>インフラ層</strong>：参入障壁が最も高い。Google・Amazon・Microsoft のような巨大企業が主役。一般企業は「利用者」として位置する。</li>
                        <li><strong style={{ color: 'var(--bright)' }}>モデル層</strong>：基盤モデルは少数の企業が提供。一般企業はファインチューニングで自社特化モデルを作るか、API 経由で利用する。</li>
                        <li><strong style={{ color: 'var(--bright)' }}>プラットフォーム層</strong>：ここが一般企業・開発者の主戦場。Vertex AI はこの層に位置する。</li>
                        <li><strong style={{ color: 'var(--bright)' }}>アプリケーション層</strong>：最も参入しやすい。既存のモデル・プラットフォームを活用してビジネス価値を創出できる。Gemini for Workspace がこの代表例。</li>
                    </ul>
                </div>
                <ReferencesBlock
                    title="📎 参照リソース"
                    items={[
                        { href: 'https://cloud.google.com/use-cases/generative-ai' },
                        { href: 'https://cloud.google.com/vertex-ai' },
                    ]}
                />
            </div>
        </section>
    );
}

/* ── Sub-section 1.4: Google 基盤モデル ── */
function Section14() {
    return (
        <section id="s14">
            <div className="sh shd">
                <div className="sh-icon si-d">🌟</div>
                <div className="sh-body">
                    <h2>Google の基盤モデル完全解説（Gemini / Gemma / Imagen / Veo）</h2>
                    <p>各モデルの特徴・強み・ユースケース・選定基準を徹底比較。試験で問われる差別化ポイントを習得する</p>
                </div>
                <div className="sh-badge sbd">最重要</div>
            </div>

            <div className="card">
                <div className="card-h">🤖 Google 基盤モデル ファミリー 完全比較</div>

                <div className="model-grid">
                    {/* Gemini */}
                    <div className="model-card mc-gemini">
                        <div className="mc-icon">✨</div>
                        <div className="mc-name" style={{ color: 'var(--aurora3)' }}>Gemini</div>
                        <div className="mc-type">Multimodal LLM Family</div>
                        <div className="mc-desc">
                            Google DeepMind が開発したフラッグシップのマルチモーダル基盤モデル。
                            テキスト・画像・音声・動画・コードを統合的に理解・生成できる。
                            <strong style={{ color: 'var(--bright)' }}>Ultra/Pro/Flash/Nano</strong> の4バリアントで用途別に最適化。
                        </div>
                        <div className="mc-tags">
                            <span className="mct">マルチモーダル</span>
                            <span className="mct">100万トークン対応</span>
                            <span className="mct">コード生成</span>
                            <span className="mct">クローズドソース</span>
                        </div>
                    </div>

                    {/* Gemma */}
                    <div className="model-card mc-gemma">
                        <div className="mc-icon">🔓</div>
                        <div className="mc-name" style={{ color: 'var(--aurora4)' }}>Gemma</div>
                        <div className="mc-type">Open-weight LLM</div>
                        <div className="mc-desc">
                            Gemini の技術を基にした<strong style={{ color: 'var(--bright)' }}>オープンウェイト</strong>軽量モデル。
                            自社環境へのデプロイ・ファインチューニングが可能。2B・7B など複数サイズ展開。
                        </div>
                        <div className="mc-tags">
                            <span className="mct">オープンウェイト</span>
                            <span className="mct">軽量・高効率</span>
                            <span className="mct">オンデバイス対応</span>
                            <span className="mct">ファインチューニング可</span>
                        </div>
                    </div>

                    {/* Imagen */}
                    <div className="model-card mc-imagen">
                        <div className="mc-icon">🎨</div>
                        <div className="mc-name" style={{ color: 'var(--aurora1)' }}>Imagen</div>
                        <div className="mc-type">Text-to-Image Model</div>
                        <div className="mc-desc">
                            テキストから高品質な画像を生成する<strong style={{ color: 'var(--bright)' }}>拡散モデル</strong>。
                            企業向けの高解像度画像生成・編集・スタイル変換に対応。
                        </div>
                        <div className="mc-tags">
                            <span className="mct">Text-to-Image</span>
                            <span className="mct">高解像度生成</span>
                            <span className="mct">画像編集</span>
                            <span className="mct">拡散モデル</span>
                        </div>
                    </div>

                    {/* Veo */}
                    <div className="model-card mc-veo">
                        <div className="mc-icon">🎬</div>
                        <div className="mc-name" style={{ color: 'var(--aurora5)' }}>Veo</div>
                        <div className="mc-type">Text-to-Video Model</div>
                        <div className="mc-desc">
                            テキストや画像から<strong style={{ color: 'var(--bright)' }}>高品質動画</strong>を生成するモデル。
                            長尺・高解像度動画の生成に対応。映像制作ワークフローを変革する。
                        </div>
                        <div className="mc-tags">
                            <span className="mct">Text-to-Video</span>
                            <span className="mct">高品質動画</span>
                            <span className="mct">長尺対応</span>
                            <span className="mct">映像制作</span>
                        </div>
                    </div>
                </div>

                <div className="bp">
                    <div className="bpt">モデル選定の判断基準（試験頻出）</div>
                    <ul>
                        <li><strong style={{ color: 'var(--bright)' }}>クローズドで高精度なタスク</strong> → Gemini Pro/Ultra（Vertex AI API 経由）</li>
                        <li><strong style={{ color: 'var(--bright)' }}>自社環境デプロイ・カスタマイズ</strong> → Gemma（オープンウェイト）</li>
                        <li><strong style={{ color: 'var(--bright)' }}>画像生成・編集</strong> → Imagen</li>
                        <li><strong style={{ color: 'var(--bright)' }}>動画生成</strong> → Veo</li>
                        <li><strong style={{ color: 'var(--bright)' }}>レイテンシ重視・モバイル/エッジ</strong> → Gemini Nano / Gemma 2B</li>
                        <li><strong style={{ color: 'var(--bright)' }}>複数モダリティが混在するタスク</strong> → Gemini（全モダリティ統合処理）</li>
                    </ul>
                </div>
                <ReferencesBlock
                    title="📎 参照リソース"
                    items={[
                        { href: 'https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models', label: 'Vertex AI モデル一覧: https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models' },
                        { href: 'https://cloud.google.com/model-garden', label: 'Model Garden: https://cloud.google.com/model-garden' },
                        { href: 'https://ai.google.dev/gemma/docs', label: 'Gemma 公式ドキュメント: https://ai.google.dev/gemma/docs' },
                        { href: 'https://deepmind.google/technologies/gemini/', label: 'Gemini 公式サイト: https://deepmind.google/technologies/gemini/' },
                    ]}
                />
            </div>

            {/* 試験まとめ */}
            <div className="card" style={{ borderColor: 'var(--rim2)' }}>
                <div className="card-h" style={{ fontSize: '18px' }}>✦ Section 1 試験攻略 — 最重要ポイント完全まとめ</div>
                <div className="sum-grid">
                    <div className="sum-f">
                        <div className="sum-v" style={{ color: 'var(--aurora3)' }}>~30%</div>
                        <div className="sum-l">試験全体での配点</div>
                    </div>
                    <div className="sum-f">
                        <div className="sum-v" style={{ color: 'var(--aurora1)' }}>4</div>
                        <div className="sum-l">サブセクション数</div>
                    </div>
                    <div className="sum-f">
                        <div className="sum-v" style={{ color: 'var(--aurora4)' }}>8+</div>
                        <div className="sum-l">必須用語数（1.1）</div>
                    </div>
                    <div className="sum-f">
                        <div className="sum-v" style={{ color: 'var(--aurora5)' }}>6</div>
                        <div className="sum-l">データ品質特性数</div>
                    </div>
                    <div className="sum-f">
                        <div className="sum-v" style={{ color: 'var(--aurora2)' }}>5</div>
                        <div className="sum-l">ランドスケープ層数</div>
                    </div>
                    <div className="sum-f">
                        <div className="sum-v" style={{ color: 'var(--aurora1)' }}>4</div>
                        <div className="sum-l">Google 基盤モデル数</div>
                    </div>
                </div>

                <div className="fgrid" style={{ marginTop: '24px' }}>
                    <div className="fi" style={{ borderTop: '2px solid var(--aurora1)' }}>
                        <div className="fi-t" style={{ color: 'var(--aurora1)' }}>1.1 で絶対押さえる5点</div>
                        <div className="fi-d">
                            ① AI⊃ML⊃DL⊃GenAI の包含関係<br />
                            ② LLM・基盤モデル・マルチモーダルの定義の違い<br />
                            ③ Prompt Engineering vs Prompt Tuning の差<br />
                            ④ 教師あり・教師なし・強化学習の判断基準<br />
                            ⑤ ML ライフサイクル5ステージと GCP ツール対応
                        </div>
                    </div>
                    <div className="fi" style={{ borderTop: '2px solid var(--aurora3)' }}>
                        <div className="fi-t" style={{ color: 'var(--aurora3)' }}>1.2 で絶対押さえる3点</div>
                        <div className="fi-d">
                            ① 構造化 vs 非構造化データの定義と実例<br />
                            ② ラベルあり vs なしデータの学習アプローチへの対応<br />
                            ③ データ品質6特性（正確性・完全性・一貫性・適時性・一意性・妥当性）の定義
                        </div>
                    </div>
                    <div className="fi" style={{ borderTop: '2px solid var(--aurora4)' }}>
                        <div className="fi-t" style={{ color: 'var(--aurora4)' }}>1.3 で絶対押さえる2点</div>
                        <div className="fi-d">
                            ① 5層構造の名称と順序（Infrastructure → Models → Platforms → Agents → Applications）<br />
                            ② 各層のビジネス的意味と GCP での具体例（Vertex AI はプラットフォーム層）
                        </div>
                    </div>
                    <div className="fi" style={{ borderTop: '2px solid var(--aurora5)' }}>
                        <div className="fi-t" style={{ color: 'var(--aurora5)' }}>1.4 で絶対押さえる4点</div>
                        <div className="fi-d">
                            ① Gemini = マルチモーダル LLM（全モダリティ対応）<br />
                            ② Gemma = オープンウェイト・ローカル実行<br />
                            ③ Imagen = テキスト→画像生成（拡散モデル）<br />
                            ④ Veo = テキスト→動画生成
                        </div>
                    </div>
                </div>

                <div className="warn" style={{ marginTop: '20px' }}>
                    <div className="warnt">⚠️ Section 1 で特に混同しやすい概念</div>
                    <ul>
                        <li><strong style={{ color: 'var(--bright)' }}>「生成 AI = LLM」は誤り</strong>：LLM は主に言語タスクを扱うが、近年はマルチモーダル拡張もある。生成 AI は画像・動画・音楽生成も含む広い概念</li>
                        <li><strong style={{ color: 'var(--bright)' }}>「基盤モデル = LLM」は誤り</strong>：基盤モデルは LLM を含む概念。Imagen（画像）・Veo（動画）も基盤モデル</li>
                        <li><strong style={{ color: 'var(--bright)' }}>Prompt Engineering ≠ Prompt Tuning</strong>：前者はプロンプト文を人間が工夫するだけ、後者は機械学習でプレフィックスを最適化する</li>
                        <li><strong style={{ color: 'var(--bright)' }}>Gemma ≠ Gemini の小型版</strong>：GemmaはGeminiとは別のオープンウェイトモデルファミリー。目的（オープン化）が異なる</li>
                    </ul>
                </div>

                <ReferencesBlock
                    title="📎 Section 1 全体の参照リソース"
                    items={[
                        { href: 'https://cloud.google.com/learn/certification/generative-ai-leader', label: '試験ページ: https://cloud.google.com/learn/certification/generative-ai-leader' },
                        { href: 'https://services.google.com/fh/files/misc/generative_ai_leader_exam_guide_english.pdf', label: '試験ガイド PDF: https://services.google.com/fh/files/misc/generative_ai_leader_exam_guide_english.pdf' },
                        { href: 'https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models', label: 'Vertex AI モデルガイド: https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models' },
                        { href: 'https://cloud.google.com/model-garden', label: 'Model Garden: https://cloud.google.com/model-garden' },
                        { href: 'https://ai.google.dev/gemma/docs', label: 'Gemma ドキュメント: https://ai.google.dev/gemma/docs' },
                        { href: 'https://cloud.google.com/vertex-ai', label: 'Vertex AI: https://cloud.google.com/vertex-ai' },
                    ]}
                />
            </div>
        </section>
    );
}

/* ── Main Page ── */
export default function Section1Page() {
    const fontClasses = `${fraunces.variable} ${azeretMono.variable}`;

    return (
        <div className={`s1-page ${fontClasses}`}>
            {/* HERO */}
            <header className="hero">
                <div className="hero-label">Generative AI Leader 試験対策 — Section 1 深掘り</div>
                <h1>
                    <span className="s1">Gen AI 基礎知識</span>
                    <span className="s2">完全攻略ガイド</span>
                </h1>
                <p className="hero-desc">
                    試験配点 <strong style={{ color: 'var(--aurora3)' }}>~30%</strong> の Section 1 を完全制覇。
                    AI・ML・生成 AI の核心概念からデータの本質・モデル選定基準・Google の基盤モデルまで、
                    初学者でも「なぜそうなるか」まで理解できるよう体系化。
                </p>
                <div className="hero-badge">
                    <div className="pct">~30%</div>
                    <div className="info">
                        <strong>Section 1: Fundamentals of Generative AI</strong>
                        <span>4 subsections · AI 技術の本質的理解が問われる基礎セクション</span>
                    </div>
                </div>
                <div className="ss-row">
                    <div className="ssc ssc-1">1.1 Gen AI 核心概念とユースケース</div>
                    <div className="ssc ssc-2">1.2 データの種類とビジネス的意味</div>
                    <div className="ssc ssc-3">1.3 Gen AI ランドスケープ 5 層</div>
                    <div className="ssc ssc-4">1.4 Google 基盤モデル 完全解説</div>
                </div>
            </header>

            {/* NAV */}
            <nav className="snav">
                <a href="#s11" className="na na-a"><span className="nch nca">1.1</span>核心概念・用語</a>
                <a href="#s11b" className="na na-a"><span className="nch nca">1.1+</span>ML アプローチ</a>
                <a href="#s11c" className="na na-a"><span className="nch nca">1.1+</span>ML ライフサイクル</a>
                <a href="#s12" className="na na-b"><span className="nch ncb">1.2</span>データの種類</a>
                <a href="#s13" className="na na-c"><span className="nch ncc">1.3</span>ランドスケープ</a>
                <a href="#s14" className="na na-d"><span className="nch ncd">1.4</span>基盤モデル</a>
            </nav>

            {/* MAIN */}
            <main className="wrap">
                <Section11 />
                <div className="sdiv" />
                <Section11b />
                <div className="sdiv" />
                <Section11c />
                <div className="sdiv" />
                <Section12 />
                <div className="sdiv" />
                <Section13 />
                <div className="sdiv" />
                <Section14 />
            </main>

            {/* FOOTER */}
            <footer>
                <strong>Google Cloud Generative AI Leader — Section 1 基礎知識 完全解説ガイド</strong>
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
