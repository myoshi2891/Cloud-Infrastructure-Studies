import type { Metadata } from 'next';
import { Outfit, Fira_Code } from 'next/font/google';
import { getFormattedCreationDate } from '../constants';
import './section3.css';

const outfit = Outfit({
    subsets: ['latin'],
    weight: ['300', '400', '600', '700', '800'],
    variable: '--font-outfit',
    display: 'swap',
});

const firaCode = Fira_Code({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    variable: '--font-fira-code',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Section 3: モデル出力改善技術 | Generative AI Leader',
    description:
        'Generative AI Leader 試験 Section 3 — プロンプトエンジニアリング・グラウンディング・RAG の3大技術を完全解説',
};

/* ── Section 3.1: ファウンデーションモデルの限界 ── */
function Section31() {
    return (
        <section id="s31">
            <div className="sec-header">
                <div className="sec-num-box sn-teal">3.1</div>
                <div>
                    <h2>ファウンデーションモデルの限界と克服戦略</h2>
                    <p>基盤モデルが抱える根本的な課題を特定し、Google Cloud 推奨の対処法と継続的モニタリングを理解する</p>
                </div>
                <div className="sec-pct p-teal">試験頻出</div>
            </div>

            <div className="card">
                <div className="card-h">⚠️ なぜ基盤モデルには「限界」があるのか？</div>
                <p style={{ fontSize: '14px', lineHeight: 1.8, marginBottom: '16px' }}>
                    LLM はトレーニングデータのパターンを学習して出力を生成する。このアーキテクチャ上の特性から、
                    <strong style={{ color: 'var(--teal)' }}>生まれつき持つ構造的な弱点</strong>が存在する。
                    試験では「どの限界に対して、どの対処法が最適か」の組み合わせが問われる。
                </p>

                <div className="lim-grid">
                    <div className="lim">
                        <div className="lim-icon">🌀</div>
                        <div className="lim-t">ハルシネーション（幻覚）</div>
                        <div className="lim-d">事実と異なる内容を、あたかも確実であるかのように自信を持って生成する現象。「でたらめを堂々と話す」問題。</div>
                        <div className="lim-fix">→ グラウンディング / RAG / 温度パラメータ低下</div>
                    </div>
                    <div className="lim">
                        <div className="lim-icon">⏱️</div>
                        <div className="lim-t">知識カットオフ</div>
                        <div className="lim-d">学習データには終了時点（カットオフ）があり、それ以降の最新情報を知らない。2024年以降の出来事を答えられない。</div>
                        <div className="lim-fix">→ グラウンディング with Google Search</div>
                    </div>
                    <div className="lim">
                        <div className="lim-icon">🔒</div>
                        <div className="lim-t">社内データの不知</div>
                        <div className="lim-d">公開データで学習しているため、企業固有の内部情報・プロプライエタリなドキュメントを知らない。</div>
                        <div className="lim-fix">→ RAG / Fine-tuning / Data Store</div>
                    </div>
                    <div className="lim">
                        <div className="lim-icon">⚖️</div>
                        <div className="lim-t">バイアス</div>
                        <div className="lim-d">学習データに含まれる人間の偏見・文化的偏りが出力に反映される。性別・人種・文化的ステレオタイプが出やすい。</div>
                        <div className="lim-fix">→ Responsible AI 設計 / 評価・モニタリング</div>
                    </div>
                    <div className="lim">
                        <div className="lim-icon">📏</div>
                        <div className="lim-t">コンテキスト長の制限</div>
                        <div className="lim-d">処理できるテキスト量（トークン数）に上限があり、非常に長い文書の全体を一度に処理できない（Gemini 1M tokens で大幅改善）。</div>
                        <div className="lim-fix">→ チャンキング戦略 / 長コンテキストモデル選択</div>
                    </div>
                    <div className="lim">
                        <div className="lim-icon">🎯</div>
                        <div className="lim-t">タスク特化の不足</div>
                        <div className="lim-d">汎用モデルは特定ドメイン（法律・医療・金融）での専門的精度が不足する。業界特有の用語・知識への対応が甘い。</div>
                        <div className="lim-fix">→ Fine-tuning / Domain-specific RAG</div>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-h">🛠️ 限界克服の3つのアプローチ比較</div>
                <div className="fgrid">
                    <div className="fitem" style={{ borderLeftColor: 'var(--teal)' }}>
                        <div className="fitem-t" style={{ color: 'var(--teal)' }}>① プロンプトエンジニアリング</div>
                        <div className="fitem-d">最も低コスト・即効性あり。モデルを変えずに入力を工夫する。コスト：低、精度向上：中、実装難易度：低。</div>
                    </div>
                    <div className="fitem" style={{ borderLeftColor: 'var(--lime)' }}>
                        <div className="fitem-t" style={{ color: 'var(--lime)' }}>② グラウンディング / RAG</div>
                        <div className="fitem-d">最新情報・社内データを動的に注入。ハルシネーション抑制に最も効果的。コスト：中、精度向上：高。</div>
                    </div>
                    <div className="fitem" style={{ borderLeftColor: 'var(--amber)' }}>
                        <div className="fitem-t" style={{ color: 'var(--amber)' }}>③ ファインチューニング</div>
                        <div className="fitem-d">モデルの重みを特定タスク用に更新。最高精度だが最も高コスト・時間がかかる。コスト：高、精度向上：最高。</div>
                    </div>
                </div>

                <div className="warn">
                    <div className="warnt">試験の優先順位判断</div>
                    <ul>
                        <li>まずプロンプトエンジニアリングを試みる → 不十分なら RAG/グラウンディング → それでも不十分ならファインチューニング</li>
                        <li>最新情報が必要 → グラウンディング（ファインチューニングでは解決不可）</li>
                        <li>社内特化情報の正確な引用が必要 → RAG</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

/* ── Section 3.2: プロンプトエンジニアリング技術 ── */
function Section32() {
    return (
        <section id="s32">
            <div className="sec-header">
                <div className="sec-num-box sn-lime">3.2</div>
                <div>
                    <h2>プロンプトエンジニアリング技術</h2>
                    <p>LLM との効果的なコミュニケーション技法を体系的に理解する。Zero-shot から ReAct まで全手法を実例付きで解説</p>
                </div>
                <div className="sec-pct p-lime">最重要</div>
            </div>

            <div className="card">
                <div className="card-h">🎯 プロンプトエンジニアリングとは？</div>
                <p style={{ fontSize: '14px', lineHeight: 1.8, marginBottom: '16px' }}>
                    <strong style={{ color: 'var(--lime)' }}>LLM から望ましい出力を引き出すための入力文（プロンプト）を設計・最適化する技術</strong>。
                    モデルの重みを変えずに動作を制御できる最もコスト効率の高い改善手法。
                </p>

                <div className="fact-row">
                    <div className="fact">
                        <div className="fact-val" style={{ color: 'var(--lime)' }}>0円</div>
                        <div className="fact-lbl">追加コスト{'\n'}（API料金のみ）</div>
                    </div>
                    <div className="fact">
                        <div className="fact-val" style={{ color: 'var(--lime)' }}>即時</div>
                        <div className="fact-lbl">効果発揮{'\n'}（再学習不要）</div>
                    </div>
                    <div className="fact">
                        <div className="fact-val" style={{ color: 'var(--lime)' }}>6+</div>
                        <div className="fact-lbl">主要技法数{'\n'}（試験出題範囲）</div>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-h">📚 全プロンプト技法 完全ガイド</div>

                <div className="pt-list">
                    <div className="pt">
                        <div className="pt-label">
                            <span className="pt-tag level-basic">BASIC</span>
                            <div className="pt-name">Zero-Shot</div>
                        </div>
                        <div className="pt-body">
                            <strong>ゼロショット：例示なしで直接タスクを依頼する</strong>
                            <p>事前の例示（デモンストレーション）を与えずに、タスクの指示文だけでLLMに回答させる。最もシンプルで、明確なタスクに有効。</p>
                            <div className="pt-ex">
                                <span className="kw">Prompt:</span> 以下の文章をポジティブ・ネガティブ・中立で分類してください：「このホテルは最高でした」
                            </div>
                        </div>
                    </div>

                    <div className="pt">
                        <div className="pt-label">
                            <span className="pt-tag level-basic">BASIC</span>
                            <div className="pt-name">Few-Shot</div>
                        </div>
                        <div className="pt-body">
                            <strong>フューショット：少数の例示（デモンストレーション）を含める</strong>
                            <p>プロンプト内に「入力→期待される出力」のペアを複数含めることで、モデルが「このパターンで答えればいい」と学習する。精度が大幅に向上する。</p>
                            <div className="pt-ex">
                                <span className="kw">例1:</span> <span className="val">「最高」→ ポジティブ</span>{'\n'}
                                <span className="kw">例2:</span> <span className="val">「最悪」→ ネガティブ</span>{'\n'}
                                <span className="kw">分類:</span> 「普通でした」→ <span className="out">?</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt">
                        <div className="pt-label">
                            <span className="pt-tag level-mid">INTERMEDIATE</span>
                            <div className="pt-name">Chain-of-Thought (CoT)</div>
                        </div>
                        <div className="pt-body">
                            <strong>思考の連鎖：「ステップバイステップで考えてください」と指示</strong>
                            <p>複雑な推論問題で「Let&apos;s think step by step」と付け加えるだけで劇的に精度が向上する。LLM が中間推論ステップを経由して最終回答を導く。</p>
                            <div className="pt-ex">
                                <span className="kw">指示:</span> この数学の問題をステップバイステップで解いてください。
                            </div>
                        </div>
                    </div>

                    <div className="pt">
                        <div className="pt-label">
                            <span className="pt-tag level-adv">ADVANCED</span>
                            <div className="pt-name">ReAct（Reason + Act）</div>
                        </div>
                        <div className="pt-body">
                            <strong>推論+行動：思考と行動を交互に繰り返すエージェント型プロンプト</strong>
                            <p>
                                LLM が「思考（Thought）→ 行動（Action）→ 観察（Observation）→ 思考…」を繰り返しながら問題を解く。
                                ツール呼び出しが必要なエージェントタスクに最適。
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bp">
                <div className="bpt">試験攻略：技法選択の判断基準</div>
                <ul>
                    <li>「シンプルなタスク・即座に試したい」→ Zero-Shot</li>
                    <li>「出力フォーマットを揃えたい・精度を上げたい」→ Few-Shot（3〜5例が最適）</li>
                    <li>「数学・論理・多段階推論」→ Chain-of-Thought（「ステップバイステップ」の魔法の言葉）</li>
                    <li>「エージェントがツールを使う」→ ReAct</li>
                </ul>
            </div>
        </section>
    );
}

/* ── Section 3.3: グラウンディング技術と RAG ── */
function Section33() {
    return (
        <section id="s33">
            <div className="sec-header">
                <div className="sec-num-box sn-sky">3.3</div>
                <div>
                    <h2>グラウンディング技術と RAG</h2>
                    <p>LLM の回答を事実に基づかせる「グラウンディング」の概念・3種類のデータソース・Google Cloud の RAG オファリング・サンプリングパラメータを完全理解する</p>
                </div>
                <div className="sec-pct p-sky">最重要</div>
            </div>

            <div className="card">
                <div className="card-h">🌍 グラウンディング（Grounding）の本質</div>
                <p style={{ fontSize: '14px', lineHeight: 1.8, marginBottom: '16px' }}>
                    グラウンディングとは、<strong style={{ color: 'var(--sky)' }}>LLM の生成する回答を、信頼できる外部データソースに「紐づける（錨をおろす）」技術</strong>。
                    モデルが「記憶から作り話をする」のではなく「参照した文書から回答する」ようにすることで、ハルシネーションを根本的に削減する。
                </p>

                <div className="split2">
                    <div className="sbox">
                        <div className="sbox-t" style={{ color: 'var(--rose)' }}>❌ グラウンディングなし（危険）</div>
                        <ul>
                            <li>モデルの学習済みパラメータのみから生成</li>
                            <li>ハルシネーションが頻繁に発生</li>
                            <li>知識カットオフ以降の情報を参照不可</li>
                            <li>企業固有の情報を回答できない</li>
                            <li>出典・根拠の引用が不可能</li>
                        </ul>
                    </div>
                    <div className="sbox">
                        <div className="sbox-t" style={{ color: 'var(--teal)' }}>✅ グラウンディングあり（推奨）</div>
                        <ul>
                            <li>外部データソースを参照してから生成</li>
                            <li>ハルシネーションを大幅に低減</li>
                            <li>最新情報・リアルタイムデータを反映</li>
                            <li>企業固有の社内文書を参照可能</li>
                            <li>引用元（ソース）を明示して信頼性向上</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-h">📂 グラウンディングの3種類のデータソース（試験頻出）</div>
                <div className="fgrid">
                    <div className="fitem" style={{ borderLeftColor: 'var(--teal)' }}>
                        <div className="fitem-t" style={{ color: 'var(--teal)' }}>① 公開ウェブ / Google 検索</div>
                        <div className="fitem-d">
                            Google 検索エンジンをリアルタイムで呼び出し、最新のウェブ情報を取得してコンテキストに注入。
                            <strong style={{ color: 'var(--bright)' }}>知識カットオフ問題の最強の解決策</strong>。
                        </div>
                    </div>
                    <div className="fitem" style={{ borderLeftColor: 'var(--lime)' }}>
                        <div className="fitem-t" style={{ color: 'var(--lime)' }}>② 企業データ / Vertex AI Search</div>
                        <div className="fitem-d">
                            社内文書・FAQ・製品情報などをベクトルDBに格納し、質問と意味的に近い文書を取得して回答生成に使用。
                            <strong style={{ color: 'var(--bright)' }}>社内知識活用の主要手法</strong>。
                        </div>
                    </div>
                    <div className="fitem" style={{ borderLeftColor: 'var(--amber)' }}>
                        <div className="fitem-t" style={{ color: 'var(--amber)' }}>③ 構造化データ / データベース</div>
                        <div className="fitem-d">
                            BigQuery・Cloud SQL 等の構造化データをSQLで照会し、正確な数値・事実データを取得する。
                            <strong style={{ color: 'var(--bright)' }}>数値精度が必要なタスク</strong>に適する。
                        </div>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-h">🔄 RAG（検索拡張生成）のパイプライン</div>
                <p style={{ fontSize: '14px', lineHeight: 1.8, marginBottom: '16px' }}>
                    RAG = Retrieval-Augmented Generation。
                    外部ドキュメントを<strong style={{ color: 'var(--sky)' }}>ベクトル化して保存し、クエリ時に関連文書を動的検索してプロンプトに注入</strong>する手法。
                </p>

                <div className="rag-flow">
                    <div className="rag-step">
                        <div className="rag-num">1</div>
                        <div className="rag-body">
                            <div className="rag-title">インデックス作成（オフライン）</div>
                            <div className="rag-desc">文書をチャンク分割 → Embedding API でベクトル化 → Vertex AI Vector Search / AlloyDB に格納</div>
                        </div>
                    </div>
                    <div className="rag-step">
                        <div className="rag-num">2</div>
                        <div className="rag-body">
                            <div className="rag-title">クエリのベクトル化（オンライン）</div>
                            <div className="rag-desc">ユーザーの質問を同じ Embedding モデルでベクトル化</div>
                        </div>
                    </div>
                    <div className="rag-step">
                        <div className="rag-num">3</div>
                        <div className="rag-body">
                            <div className="rag-title">類似文書の取得</div>
                            <div className="rag-desc">コサイン類似度等でベクトル空間上の近隣文書を検索・取得（Top-K 取得）</div>
                        </div>
                    </div>
                    <div className="rag-step">
                        <div className="rag-num">4</div>
                        <div className="rag-body">
                            <div className="rag-title">拡張プロンプト生成</div>
                            <div className="rag-desc">取得した文書＋元の質問を組み合わせてプロンプトを構築</div>
                        </div>
                    </div>
                    <div className="rag-step">
                        <div className="rag-num">5</div>
                        <div className="rag-body">
                            <div className="rag-title">LLM が根拠付き回答を生成</div>
                            <div className="rag-desc">Gemini が参照文書を根拠に回答を生成し、引用元（ソース）を添付</div>
                        </div>
                    </div>
                </div>

                <div className="bp">
                    <div className="bpt">Google Cloud の RAG オファリング</div>
                    <ul>
                        <li><strong style={{ color: 'var(--bright)' }}>Vertex AI RAG Engine</strong> — フルマネージド RAG パイプライン。インデックス管理・検索・生成を統合管理</li>
                        <li><strong style={{ color: 'var(--bright)' }}>Vertex AI Search</strong> — エンタープライズ向け検索+RAG。複数データソースの横断検索</li>
                        <li><strong style={{ color: 'var(--bright)' }}>AlloyDB + pgvector</strong> — PostgreSQL ベースのベクトルDB。既存DBとの統合に最適</li>
                        <li><strong style={{ color: 'var(--bright)' }}>Vertex AI Vector Search</strong> — 大規模ベクトル検索に特化した高速インデックス</li>
                    </ul>
                </div>
            </div>

            <div className="card" id="summary">
                <div className="card-h">🌡️ サンプリングパラメータ（Temperature / Top-P / Top-K）</div>
                <div className="fgrid">
                    <div className="fitem" style={{ borderLeftColor: 'var(--rose)' }}>
                        <div className="fitem-t" style={{ color: 'var(--rose)' }}>Temperature（温度）</div>
                        <div className="fitem-d">
                            0.0〜1.0（または2.0）。<strong style={{ color: 'var(--bright)' }}>低い値 = 決定論的・保守的</strong>（正確な事実質問に適する）、<strong style={{ color: 'var(--bright)' }}>高い値 = 多様・創造的</strong>（創作に適する）。
                        </div>
                    </div>
                    <div className="fitem" style={{ borderLeftColor: 'var(--violet)' }}>
                        <div className="fitem-t" style={{ color: 'var(--violet)' }}>Top-P（核サンプリング）</div>
                        <div className="fitem-d">累積確率 P% 以内のトークンのみを候補にする。0.95 なら上位95%確率のトークンから選択。Temperature との組み合わせで使う。</div>
                    </div>
                    <div className="fitem" style={{ borderLeftColor: 'var(--sky)' }}>
                        <div className="fitem-t" style={{ color: 'var(--sky)' }}>Top-K</div>
                        <div className="fitem-d">確率上位 K 個のトークンのみを候補にする。K=1 なら greedy decoding（最も確率の高いトークンを常に選択）= 最も決定論的。</div>
                    </div>
                </div>

                <div className="warn">
                    <div className="warnt">試験で問われる Temperature の使い分け</div>
                    <ul>
                        <li>医療診断・法律文書・財務データの分析 → Temperature 低（0.0〜0.3）— 正確性最優先</li>
                        <li>マーケティングコピー・詩・創作物語生成 → Temperature 高（0.7〜1.0）— 多様性・創造性を優先</li>
                        <li>ハルシネーション対策 → Temperature を低くする（確率の高い「正確な」トークンを選択）</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

/* ── Main Page ── */
export default function Section3Page() {
    const fontClasses = `${outfit.variable} ${firaCode.variable}`;

    return (
        <div className={`s3-page ${fontClasses}`}>
            {/* HERO */}
            <header className="hero">
                <div className="hero-corner tl" />
                <div className="hero-corner tr" />
                <div className="hero-corner bl" />
                <div className="hero-corner br" />

                <div className="hero-eyebrow">
                    <span className="blink" />
                    Generative AI Leader 試験対策 — Section 3 深掘り
                </div>
                <div className="hero-label">GEN AI MODEL IMPROVEMENT TECHNIQUES</div>
                <h1>
                    モデル出力を<br />
                    <em>劇的に改善する</em>技術
                </h1>
                <p className="hero-sub">
                    試験配点 <strong style={{ color: 'var(--teal)' }}>~20%</strong> の Section 3 を完全制覇。
                    ファウンデーションモデルの限界を把握し、プロンプトエンジニアリング・グラウンディング・RAG の3大技術を実例付きで深掘り解説。
                </p>

                <div className="hero-badge">
                    <div className="num">~20%</div>
                    <div className="info">
                        <strong>Section 3: Techniques to Improve Gen AI Model Output</strong>
                        <span>3つのサブセクション構成 • 試験全体の核心技術領域</span>
                    </div>
                </div>

                <div className="subsec-row">
                    <div className="ss-chip ss-1">3.1 基盤モデルの限界と克服戦略</div>
                    <div className="ss-chip ss-2">3.2 プロンプトエンジニアリング技術</div>
                    <div className="ss-chip ss-3">3.3 グラウンディング・RAG 技術</div>
                </div>
            </header>

            {/* NAV */}
            <nav className="snav">
                <a href="#s31" className="t1"><span className="ch ch1">3.1</span>モデルの限界と克服</a>
                <a href="#s32" className="t2"><span className="ch ch2">3.2</span>プロンプトエンジニアリング</a>
                <a href="#s33" className="t3"><span className="ch ch3">3.3</span>グラウンディング・RAG</a>
                <a href="#summary"><span className="ch" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--muted)' }}>◎</span>まとめ</a>
            </nav>

            {/* MAIN */}
            <main className="wrap">
                <Section31 />
                <div className="sdiv" />
                <Section32 />
                <div className="sdiv" />
                <Section33 />
            </main>

            {/* FOOTER */}
            <footer>
                <strong>Google Cloud Generative AI Leader — Section 3 モデル出力改善技術 完全解説ガイド</strong>
                <br /><br />
                参考：
                <a href="https://cloud.google.com/learn/certification/generative-ai-leader" target="_blank" rel="noreferrer">
                    Google Cloud 公式試験ページ
                </a>
                {' '}｜ {getFormattedCreationDate()}<br /><br />
                <span style={{ fontSize: '11px', opacity: 0.4 }}>
                    ※ 本ガイドは学習目的で作成。最新情報は必ず公式サイトでご確認ください。
                </span>
            </footer>
        </div>
    );
}
