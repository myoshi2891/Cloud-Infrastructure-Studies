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

            {/* Card 1: 6つの限界 */}
            <div className="card">
                <div className="card-h">⚠️ なぜ基盤モデルには「限界」があるのか？</div>
                <p style={{ fontSize: '14px', lineHeight: 1.8, marginBottom: '16px' }}>
                    LLM（大規模言語モデル）はトレーニングデータのパターンを学習して出力を生成する。このアーキテクチャ上の特性から、
                    <strong style={{ color: 'var(--teal)' }}>生まれつき持つ構造的な弱点</strong>が存在する。
                    試験では「どの限界に対して、どの対処法が最適か」の組み合わせが問われる。
                </p>

                <div className="lim-grid">
                    <div className="lim">
                        <div className="lim-icon">🌀</div>
                        <div className="lim-t">ハルシネーション（幻覚）</div>
                        <div className="lim-d">
                            事実と異なる内容を、あたかも確実であるかのように自信を持って生成する現象。「でたらめを堂々と話す」問題。
                        </div>
                        <div className="lim-sol">
                            <div className="lim-sol-t">▸ Google Cloud 推奨の対処法</div>
                            グラウンディング（Grounding）・RAG（検索拡張生成）・Human-in-the-Loop（HITL）で事実確認を実施
                        </div>
                    </div>
                    <div className="lim">
                        <div className="lim-icon">📅</div>
                        <div className="lim-t">知識カットオフ（Knowledge Cutoff）</div>
                        <div className="lim-d">
                            トレーニングデータの締め切り日以降の出来事を知らない。「昨日何があったか」を答えられない。
                        </div>
                        <div className="lim-sol">
                            <div className="lim-sol-t">▸ Google Cloud 推奨の対処法</div>
                            Grounding with Google Search でリアルタイム検索を注入・RAG でリアルタイムデータを補完
                        </div>
                    </div>
                    <div className="lim">
                        <div className="lim-icon">⚖️</div>
                        <div className="lim-t">バイアス・公平性（Bias / Fairness）</div>
                        <div className="lim-d">
                            トレーニングデータに内在するバイアスがモデルの出力に反映される。人種・性別・文化的偏りが結果に出る。
                        </div>
                        <div className="lim-sol">
                            <div className="lim-sol-t">▸ Google Cloud 推奨の対処法</div>
                            多様なトレーニングデータの使用・RLHF（人間フィードバックによる強化学習）・定期的な公平性評価
                        </div>
                    </div>
                    <div className="lim">
                        <div className="lim-icon">📊</div>
                        <div className="lim-t">データ依存性（Data Dependency）</div>
                        <div className="lim-d">
                            学習データの質・量・多様性がモデルの品質を直接決定する。「ゴミを入れればゴミが出る（GIGO）」原則。
                        </div>
                        <div className="lim-sol">
                            <div className="lim-sol-t">▸ Google Cloud 推奨の対処法</div>
                            高品質なデータガバナンス・Vertex AI Feature Store でデータ一貫性を担保・データ品質監査
                        </div>
                    </div>
                    <div className="lim">
                        <div className="lim-icon">🎯</div>
                        <div className="lim-t">エッジケースへの脆弱性</div>
                        <div className="lim-d">
                            学習データに存在しない稀なパターンや特殊な状況に対して、予期しない動作や誤った出力を生成する。
                        </div>
                        <div className="lim-sol">
                            <div className="lim-sol-t">▸ Google Cloud 推奨の対処法</div>
                            ファインチューニング（業界固有データでの追加学習）・プロンプトエンジニアリングで対応範囲を定義
                        </div>
                    </div>
                    <div className="lim">
                        <div className="lim-icon">📏</div>
                        <div className="lim-t">コンテキストウィンドウの制限</div>
                        <div className="lim-d">
                            一度に処理できるテキスト量（トークン数）に上限がある。長大な文書は一度に処理できない。
                        </div>
                        <div className="lim-sol">
                            <div className="lim-sol-t">▸ Google Cloud 推奨の対処法</div>
                            RAG でチャンク分割・Gemini 1.5 Pro の 100万トークン対応モデルへの移行・サマリーチェーン技法
                        </div>
                    </div>
                </div>
            </div>

            {/* Card 2: 5つの改善戦略 */}
            <div className="card">
                <div className="card-h">🛠️ Google Cloud 推奨の改善戦略マップ</div>
                <p style={{ fontSize: '14px', marginBottom: '16px' }}>
                    以下の5つのアプローチは目的に応じて単独または組み合わせて使用する。
                    <strong style={{ color: 'var(--teal)' }}>コスト・速度・精度のトレードオフ</strong>を理解して最適な戦略を選ぶことが試験のポイント。
                </p>

                <div className="strat-grid">
                    <div className="strat">
                        <div className="strat-head">
                            <div className="strat-icon" style={{ background: 'rgba(0, 217, 192, 0.12)' }}>✏️</div>
                            <div>
                                <div className="strat-name">プロンプトエンジニアリング</div>
                                <div className="strat-type">コスト低 / 速度 ◎ / 即時効果</div>
                            </div>
                        </div>
                        <ul className="strat-items">
                            <li>追加学習不要でモデルの動作を制御</li>
                            <li>Few-shot / Chain-of-Thought 等の技法を活用</li>
                            <li>ゼロコストで始められる最初のステップ</li>
                            <li>効果は中程度（モデル重みは変えない）</li>
                        </ul>
                        <div className="strat-badge" style={{ background: 'rgba(0, 217, 192, 0.1)', color: 'var(--teal)', border: '1px solid rgba(0, 217, 192, 0.25)' }}>
                            最初に試すべき手法
                        </div>
                    </div>
                    <div className="strat">
                        <div className="strat-head">
                            <div className="strat-icon" style={{ background: 'rgba(157, 255, 110, 0.12)' }}>🔗</div>
                            <div>
                                <div className="strat-name">グラウンディング・RAG</div>
                                <div className="strat-type">コスト中 / 速度 ○ / リアルタイム性高</div>
                            </div>
                        </div>
                        <ul className="strat-items">
                            <li>外部知識ベースにLLMを紐づける</li>
                            <li>ハルシネーション・知識カットオフを解決</li>
                            <li>最新情報を常に反映できる</li>
                            <li>Vertex AI Search / RAG API / Google Search</li>
                        </ul>
                        <div className="strat-badge" style={{ background: 'rgba(157, 255, 110, 0.1)', color: 'var(--lime)', border: '1px solid rgba(157, 255, 110, 0.25)' }}>
                            ハルシネーション対策の王道
                        </div>
                    </div>
                    <div className="strat">
                        <div className="strat-head">
                            <div className="strat-icon" style={{ background: 'rgba(91, 200, 255, 0.12)' }}>🎓</div>
                            <div>
                                <div className="strat-name">ファインチューニング</div>
                                <div className="strat-type">コスト高 / 速度 △ / 高精度</div>
                            </div>
                        </div>
                        <ul className="strat-items">
                            <li>業界・ドメイン固有データで追加学習</li>
                            <li>モデルの重みを更新し専門性を付与</li>
                            <li>高品質データが必要（通常 100〜数千件）</li>
                            <li>SFT / RLHF / PEFT（LoRA/QLoRA）等の手法</li>
                        </ul>
                        <div className="strat-badge" style={{ background: 'rgba(91, 200, 255, 0.1)', color: 'var(--sky)', border: '1px solid rgba(91, 200, 255, 0.25)' }}>
                            専門ドメインへの特化
                        </div>
                    </div>
                    <div className="strat">
                        <div className="strat-head">
                            <div className="strat-icon" style={{ background: 'rgba(255, 204, 0, 0.12)' }}>👤</div>
                            <div>
                                <div className="strat-name">HITL（Human-in-the-Loop）</div>
                                <div className="strat-type">コスト可変 / 品質保証 ◎</div>
                            </div>
                        </div>
                        <ul className="strat-items">
                            <li>AIの判断に人間のレビューを挟む</li>
                            <li>高リスク判断（医療・法律）で必須</li>
                            <li>ミス検知・フィードバックデータ収集</li>
                            <li>継続的なモデル改善サイクルの基盤</li>
                        </ul>
                        <div className="strat-badge" style={{ background: 'rgba(255, 204, 0, 0.1)', color: 'var(--amber)', border: '1px solid rgba(255, 204, 0, 0.25)' }}>
                            高リスク業務では必須
                        </div>
                    </div>
                    <div className="strat">
                        <div className="strat-head">
                            <div className="strat-icon" style={{ background: 'rgba(192, 132, 252, 0.12)' }}>📐</div>
                            <div>
                                <div className="strat-name">継続的評価・モニタリング</div>
                                <div className="strat-type">コスト低〜中 / 品質維持</div>
                            </div>
                        </div>
                        <ul className="strat-items">
                            <li>Vertex AI Evaluation Service で自動評価</li>
                            <li>ドリフト検知・KPI 継続計測</li>
                            <li>自動モデルアップグレード適用</li>
                            <li>Vertex AI Feature Store で特徴量管理</li>
                        </ul>
                        <div className="strat-badge" style={{ background: 'rgba(192, 132, 252, 0.1)', color: 'var(--violet)', border: '1px solid rgba(192, 132, 252, 0.25)' }}>
                            本番維持に不可欠
                        </div>
                    </div>
                </div>

                <div className="warn">
                    <div className="warnt">⚠️ 試験頻出：戦略の選択基準</div>
                    <ul>
                        <li><strong style={{ color: 'var(--bright)' }}>まずプロンプトエンジニアリング</strong>から試し、それで不十分なら RAG / ファインチューニングへ進む</li>
                        <li><strong style={{ color: 'var(--bright)' }}>最新情報が必要</strong>な場合は RAG / グラウンディングを選ぶ（ファインチューニングでは解決不可）</li>
                        <li><strong style={{ color: 'var(--bright)' }}>業界固有の言葉遣い・形式</strong>が必要な場合はファインチューニングが適切</li>
                        <li><strong style={{ color: 'var(--bright)' }}>医療・法律・金融</strong>などの高リスク判断では HITL を必ず組み込む</li>
                    </ul>
                </div>
            </div>

            {/* Card 3: 継続的モニタリング */}
            <div className="card">
                <div className="card-h">📡 継続的モニタリングとモデル管理（試験頻出）</div>
                <p style={{ fontSize: '14px', marginBottom: '16px' }}>
                    Gen AI モデルは一度デプロイして終わりではない。
                    <strong style={{ color: 'var(--teal)' }}>データドリフト・パフォーマンス低下・セキュリティ脆弱性</strong>に継続的に対応する必要がある。
                </p>

                <div className="fgrid">
                    <div className="fi">
                        <div className="fi-t">🔄 自動モデルアップグレード</div>
                        <div className="fi-d">
                            Vertex AI の管理モデルはGoogleが定期的にセキュリティパッチ・バージョン更新を自動適用。手動対応の工数を削減し、常に最新の安全なモデルを利用できる。
                        </div>
                    </div>
                    <div className="fi">
                        <div className="fi-t">📊 KPI継続追跡</div>
                        <div className="fi-d">
                            精度（Accuracy）・F1スコア・BLEU/ROUGE・ユーザー満足度などの指標を継続的に計測。Cloud Monitoring と統合してアラートを自動発火。
                        </div>
                    </div>
                    <div className="fi">
                        <div className="fi-t">🌊 ドリフト監視</div>
                        <div className="fi-d">
                            入力データの統計的分布が学習時と乖離（ドリフト）していないか監視。コンセプトドリフトを早期検知して再学習トリガーを設定。
                        </div>
                    </div>
                    <div className="fi">
                        <div className="fi-t">🗄️ Vertex AI Feature Store</div>
                        <div className="fi-d">
                            特徴量（Feature）を一元管理し、学習時と推論時で同じ特徴量変換を使用することを保証。トレーニング・サービングスキューの防止に不可欠。
                        </div>
                    </div>
                    <div className="fi">
                        <div className="fi-t">📦 バージョン管理</div>
                        <div className="fi-d">
                            Vertex AI Model Registry でモデルのバージョン・メタデータを管理。ロールバック可能な状態を維持し、A/Bテストによる段階的デプロイを実現。
                        </div>
                    </div>
                    <div className="fi">
                        <div className="fi-t">🔒 セキュリティパッチ</div>
                        <div className="fi-d">
                            プロンプトインジェクション攻撃・データポイズニングなどの脅威に対するパッチを定期適用。Vertex AI の管理モデルは Google が自動更新。
                        </div>
                    </div>
                </div>

                <div className="bp">
                    <div className="bpt">✅ 継続的モニタリングのベストプラクティス</div>
                    <ul>
                        <li>本番デプロイ前に<strong>Vertex AI Evaluation Service</strong>でベースラインスコアを記録し、定期比較する</li>
                        <li>Vertex AI <strong>Feature Store</strong> でオンライン/オフライン特徴量を一元管理してスキューを防止する</li>
                        <li><strong>シャドーモード（Shadow Mode）</strong>で新モデルを旧モデルと並行実行し、安全にA/Bテストを実施する</li>
                        <li>ドリフト検知アラートは Cloud Monitoring で設定し、閾値を超えたら自動でエンジニアに通知する</li>
                    </ul>
                </div>
                <div className="src">
                    <div className="srct">📎 参照リソース</div>
                    <a href="https://cloud.google.com/vertex-ai/docs/model-monitoring/overview" target="_blank" rel="noreferrer">
                        https://cloud.google.com/vertex-ai/docs/model-monitoring/overview
                    </a>
                    <a href="https://cloud.google.com/vertex-ai/docs/featurestore/overview" target="_blank" rel="noreferrer">
                        https://cloud.google.com/vertex-ai/docs/featurestore/overview
                    </a>
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

            {/* Card 1: 概要 + fact-row */}
            <div className="card">
                <div className="card-h">🎯 プロンプトエンジニアリングとは？</div>
                <p style={{ fontSize: '14px', lineHeight: 1.8, marginBottom: '16px' }}>
                    プロンプトエンジニアリングとは、<strong style={{ color: 'var(--lime)' }}>LLM（大規模言語モデル）から望ましい出力を引き出すための入力文（プロンプト）を設計・最適化する技術</strong>。
                    モデルの重みを変えずに動作を制御できる最もコスト効率の高い改善手法。試験では各技法の名称・定義・適切なユースケースの識別が問われる。
                </p>

                <div className="fact-row">
                    <div className="fact">
                        <div className="fact-val" style={{ color: 'var(--lime)' }}>0円</div>
                        <div className="fact-lbl">追加コスト<br />（API料金のみ）</div>
                    </div>
                    <div className="fact">
                        <div className="fact-val" style={{ color: 'var(--lime)' }}>即時</div>
                        <div className="fact-lbl">効果発揮<br />（再学習不要）</div>
                    </div>
                    <div className="fact">
                        <div className="fact-val" style={{ color: 'var(--lime)' }}>6+</div>
                        <div className="fact-lbl">主要技法数<br />（試験出題範囲）</div>
                    </div>
                    <div className="fact">
                        <div className="fact-val" style={{ color: 'var(--amber)' }}>中</div>
                        <div className="fact-lbl">最大効果<br />（FT比較）</div>
                    </div>
                </div>
            </div>

            {/* Card 2: 7技法 + 黄金律 + 比較表 + 参照 */}
            <div className="card">
                <div className="card-h">📚 全プロンプト技法 完全ガイド（Zero-shot → ReAct）</div>

                <div className="pt-list">
                    {/* Zero-Shot */}
                    <div className="pt">
                        <div className="pt-label">
                            <span className="pt-tag level-basic">BASIC</span>
                            <div className="pt-name">Zero-Shot</div>
                        </div>
                        <div className="pt-body">
                            <strong>ゼロショット：例示なしで直接タスクを依頼する</strong>
                            <p>事前の例示（デモンストレーション）を与えずに、タスクの指示文だけでLLMに回答させる。最もシンプルで、明確なタスクに有効。モデルが学習済みの知識だけで対応する。</p>
                            <div className="pt-ex">
                                <span className="kw">Prompt:</span>{' '}
                                <span className="str">&quot;次の文章を日本語に翻訳してください：The weather is nice today.&quot;</span><br />
                                <span className="kw">Output:</span>{' '}
                                <span className="str">&quot;今日は天気がいいですね。&quot;</span><br />
                                <span className="comment">// 例示なし。モデルの事前知識だけで回答。</span>
                            </div>
                            <div style={{ marginTop: '10px', fontSize: '12px', color: 'var(--muted)' }}>
                                <strong style={{ color: 'var(--text)' }}>適用場面：</strong>明確で単純なタスク（翻訳・要約・分類）、モデルが十分に学習済みのドメイン
                            </div>
                        </div>
                    </div>

                    {/* One-Shot */}
                    <div className="pt">
                        <div className="pt-label">
                            <span className="pt-tag level-basic">BASIC</span>
                            <div className="pt-name">One-Shot</div>
                        </div>
                        <div className="pt-body">
                            <strong>ワンショット：1つの例示を与えてからタスクを実行</strong>
                            <p>1つの入出力ペアを例として示してからタスクを依頼する。出力フォーマットを厳密に指定したい場合に特に有効。モデルがパターンを学習して同形式で応答する。</p>
                            <div className="pt-ex">
                                <span className="comment">// 例示（1件）</span><br />
                                <span className="kw">Input:</span>{' '}<span className="str">&quot;東京&quot;</span>{' '}→{' '}
                                <span className="kw">Output:</span>{' '}<span className="str">&quot;首都 / 日本 / 1380万人&quot;</span><br />
                                <span className="comment">// タスク</span><br />
                                <span className="kw">Input:</span>{' '}<span className="str">&quot;大阪&quot;</span>{' '}→{' '}
                                <span className="kw">Output:</span>{' '}<span className="str">???</span>
                            </div>
                            <div style={{ marginTop: '10px', fontSize: '12px', color: 'var(--muted)' }}>
                                <strong style={{ color: 'var(--text)' }}>適用場面：</strong>出力形式を統一したい場合、JSON/CSV 等の構造化フォーマットを指定する場合
                            </div>
                        </div>
                    </div>

                    {/* Few-Shot */}
                    <div className="pt">
                        <div className="pt-label">
                            <span className="pt-tag level-standard">STANDARD</span>
                            <div className="pt-name">Few-Shot</div>
                        </div>
                        <div className="pt-body">
                            <strong>フューショット：複数の例示（2〜8件）で精度を向上させる</strong>
                            <p>複数の入出力ペアを例として提供することで、モデルが期待されるパターンをより正確に把握できる。Few-shot は In-Context Learning（文脈内学習）の代表的な技法。</p>
                            <div className="pt-ex">
                                <span className="comment">// 例示3件：感情分類タスク</span><br />
                                <span className="str">&quot;この商品は最高！&quot;</span>{' '}→{' '}<span className="kw">ポジティブ</span><br />
                                <span className="str">&quot;遅延が多くて困った&quot;</span>{' '}→{' '}<span className="kw">ネガティブ</span><br />
                                <span className="str">&quot;普通の品質でした&quot;</span>{' '}→{' '}<span className="kw">ニュートラル</span><br />
                                <span className="comment">// タスク</span><br />
                                <span className="str">&quot;梱包が丁寧で感動した&quot;</span>{' '}→{' '}<span className="fn">???</span>
                            </div>
                            <div style={{ marginTop: '10px', fontSize: '12px', color: 'var(--muted)' }}>
                                <strong style={{ color: 'var(--text)' }}>適用場面：</strong>特定のパターン・形式・分類スキームに従わせたい場合。例示が多いほど精度が向上するが、コンテキスト消費も増える
                            </div>
                        </div>
                    </div>

                    {/* Role Prompting */}
                    <div className="pt">
                        <div className="pt-label">
                            <span className="pt-tag level-standard">STANDARD</span>
                            <div className="pt-name">Role Prompting</div>
                        </div>
                        <div className="pt-body">
                            <strong>ロールプロンプティング：AIに特定の役割・ペルソナを与える</strong>
                            <p>モデルに専門家・キャラクター・特定の視点を持つ人物として振る舞うよう指示する。役割を明確に設定することで、その専門分野に特化した質・スタイルの回答を引き出せる。</p>
                            <div className="pt-ex">
                                <span className="comment">// システムプロンプト</span><br />
                                <span className="kw">Role:</span>{' '}<span className="str">&quot;あなたは15年以上の経験を持つ上級セキュリティエンジニアです。&quot;</span><br />
                                <span className="str">&quot;技術的な正確さを最優先し、平易な言葉で説明してください。&quot;</span><br />
                                <span className="comment">// ユーザー入力</span><br />
                                <span className="kw">User:</span>{' '}<span className="str">&quot;ゼロトラストアーキテクチャを実装する際の注意点は？&quot;</span>
                            </div>
                            <div style={{ marginTop: '10px', fontSize: '12px', color: 'var(--muted)' }}>
                                <strong style={{ color: 'var(--text)' }}>適用場面：</strong>技術文書・法律レビュー・医療相談など、専門性が求められるタスク。Gemini の Gems 機能もこれを体系化したもの
                            </div>
                        </div>
                    </div>

                    {/* Prompt Chaining */}
                    <div className="pt">
                        <div className="pt-label">
                            <span className="pt-tag level-standard">STANDARD</span>
                            <div className="pt-name">Prompt Chaining</div>
                        </div>
                        <div className="pt-body">
                            <strong>プロンプトチェーニング：複雑なタスクを複数ステップに分解して連鎖させる</strong>
                            <p>1つのプロンプトで解決できない複雑なタスクを、複数の小さなステップに分割して順番に実行する手法。前のステップの出力を次のステップの入力に使用する。</p>
                            <div className="pt-ex">
                                <span className="comment">// Step 1: 文章を要約</span><br />
                                <span className="kw">Prompt 1:</span>{' '}<span className="str">&quot;以下の長文を3行で要約してください：{'{'}raw_text{'}'}&quot;</span><br />
                                <span className="num">→ summary_text</span><br /><br />
                                <span className="comment">// Step 2: 要約から課題を抽出</span><br />
                                <span className="kw">Prompt 2:</span>{' '}<span className="str">&quot;以下の要約から主要な課題を箇条書きで抽出：{'{'}summary_text{'}'}&quot;</span><br />
                                <span className="num">→ issues_list</span><br /><br />
                                <span className="comment">// Step 3: 解決策を提案</span><br />
                                <span className="kw">Prompt 3:</span>{' '}<span className="str">&quot;以下の課題に対する解決策を提案：{'{'}issues_list{'}'}&quot;</span>
                            </div>
                            <div style={{ marginTop: '10px', fontSize: '12px', color: 'var(--muted)' }}>
                                <strong style={{ color: 'var(--text)' }}>適用場面：</strong>長大な文書処理・多段階のデータ変換・エージェントの思考ステップ実装
                            </div>
                        </div>
                    </div>

                    {/* Chain-of-Thought */}
                    <div className="pt">
                        <div className="pt-label">
                            <span className="pt-tag level-advanced">ADVANCED</span>
                            <div className="pt-name">Chain-of-Thought</div>
                        </div>
                        <div className="pt-body">
                            <strong>思考の連鎖（CoT）：ステップバイステップで推論プロセスを可視化させる</strong>
                            <p>「ステップバイステップで考えてください（Let&apos;s think step by step）」という指示で、モデルが中間の推論ステップを明示的に記述しながら解答する手法。複雑な論理問題・数学・多段階推論で精度が大幅に向上する。</p>
                            <div className="pt-ex">
                                <span className="comment">// Zero-shot CoT の例</span><br />
                                <span className="kw">Prompt:</span>{' '}<span className="str">&quot;太郎は50個のリンゴを持っています。20個を花子に渡し、&quot;</span><br />
                                <span className="str">&quot;残りの半分を次郎に渡しました。太郎に残るリンゴは何個？&quot;</span><br />
                                <span className="str">&quot;ステップバイステップで考えてください。&quot;</span><br /><br />
                                <span className="comment">// モデルの出力例</span><br />
                                <span className="num">Step 1: 50 - 20 = 30個（花子に渡した後）</span><br />
                                <span className="num">Step 2: 30 ÷ 2 = 15個（次郎に渡した後）</span><br />
                                <span className="num">Answer: 15個</span>
                            </div>
                            <div style={{ marginTop: '10px', fontSize: '12px', color: 'var(--muted)' }}>
                                <strong style={{ color: 'var(--text)' }}>適用場面：</strong>数学・論理推論・多段階の意思決定・コードのデバッグ。「なぜその答えか」の説明可能性も向上する
                            </div>
                        </div>
                    </div>

                    {/* ReAct */}
                    <div className="pt">
                        <div className="pt-label">
                            <span className="pt-tag level-expert">EXPERT</span>
                            <div className="pt-name">ReAct</div>
                        </div>
                        <div className="pt-body">
                            <strong>ReAct（Reasoning + Acting）：推論と行動を交互に繰り返すエージェント手法</strong>
                            <p>Reason（推論）→ Act（ツール使用などの行動）→ Observe（結果観察）のサイクルを繰り返す。外部ツール（検索・計算・API等）を呼び出しながら問題を段階的に解決する、エージェント設計の核心技法。</p>
                            <div className="pt-ex">
                                <span className="kw">Task:</span>{' '}<span className="str">&quot;2024年の日本のGDPはアメリカのGDPの何倍か？&quot;</span><br /><br />
                                <span className="num">Thought 1:</span>{' '}<span className="comment">GDPデータを調べる必要がある</span><br />
                                <span className="fn">Action 1:</span>{' '}<span className="str">search(&quot;2024年 日本 GDP&quot;)</span><br />
                                <span className="kw">Obs 1:</span>{' '}<span className="str">日本GDP = 約4.2兆ドル</span><br /><br />
                                <span className="num">Thought 2:</span>{' '}<span className="comment">アメリカのGDPも調べる</span><br />
                                <span className="fn">Action 2:</span>{' '}<span className="str">search(&quot;2024年 アメリカ GDP&quot;)</span><br />
                                <span className="kw">Obs 2:</span>{' '}<span className="str">米国GDP = 約27兆ドル</span><br /><br />
                                <span className="num">Thought 3:</span>{' '}<span className="comment">計算する</span><br />
                                <span className="fn">Action 3:</span>{' '}<span className="str">calculate(4.2 / 27)</span><br />
                                <span className="kw">Answer:</span>{' '}<span className="str">約0.155倍（約15.6%）</span>
                            </div>
                            <div style={{ marginTop: '10px', fontSize: '12px', color: 'var(--muted)' }}>
                                <strong style={{ color: 'var(--text)' }}>適用場面：</strong>外部ツール・API・データベースと連携するAIエージェント。Vertex AI Agent Builder の内部ロジックとしても活用
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bp">
                    <div className="bpt">✅ プロンプト設計の黄金律</div>
                    <ul>
                        <li><strong>明確さ優先：</strong>「何を」「どのような形式で」「何文字程度で」生成するかを具体的に記述する</li>
                        <li><strong>コンテキストを提供：</strong>背景情報・制約条件・対象読者を明示することで出力品質が向上する</li>
                        <li><strong>ネガティブ指示：</strong>「〜してはいけない」という制約も書くと不適切な出力を防げる</li>
                        <li><strong>出力フォーマット指定：</strong>「JSON形式で」「箇条書きで3点」などフォーマットを明示する</li>
                        <li><strong>反復改善：</strong>プロンプトはイテレーション（試行錯誤）で最適化する。一発完成を期待しない</li>
                    </ul>
                </div>

                <table className="ctbl" style={{ marginTop: '20px' }}>
                    <thead>
                        <tr>
                            <th>技法</th>
                            <th>難易度</th>
                            <th>主なユースケース</th>
                            <th>コスト（トークン）</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong style={{ color: 'var(--teal)' }}>Zero-shot</strong></td>
                            <td>★☆☆</td>
                            <td>翻訳・要約・分類（明確なタスク）</td>
                            <td>最小</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--teal)' }}>One-shot</strong></td>
                            <td>★☆☆</td>
                            <td>フォーマット指定・構造化出力</td>
                            <td>小</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--lime)' }}>Few-shot</strong></td>
                            <td>★★☆</td>
                            <td>パターン学習・カスタム分類</td>
                            <td>中</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--lime)' }}>Role Prompting</strong></td>
                            <td>★★☆</td>
                            <td>専門家視点・特定スタイルの文章生成</td>
                            <td>中</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--lime)' }}>Prompt Chaining</strong></td>
                            <td>★★☆</td>
                            <td>多段階処理・ワークフロー自動化</td>
                            <td>中〜大</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--amber)' }}>Chain-of-Thought</strong></td>
                            <td>★★★</td>
                            <td>数学・論理推論・説明可能性向上</td>
                            <td>大</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--rose)' }}>ReAct</strong></td>
                            <td>★★★</td>
                            <td>AIエージェント・外部ツール連携</td>
                            <td>最大</td>
                        </tr>
                    </tbody>
                </table>

                <div className="src">
                    <div className="srct">📎 参照リソース</div>
                    <a href="https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/introduction-prompt-design" target="_blank" rel="noreferrer">
                        https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/introduction-prompt-design
                    </a>
                    <a href="https://arxiv.org/pdf/2201.11903.pdf" target="_blank" rel="noreferrer">
                        Chain-of-Thought Prompting 原論文 (Wei et al., 2022): https://arxiv.org/pdf/2201.11903.pdf
                    </a>
                    <a href="https://arxiv.org/pdf/2210.03629.pdf" target="_blank" rel="noreferrer">
                        ReAct 原論文 (Yao et al., 2022): https://arxiv.org/pdf/2210.03629.pdf
                    </a>
                    <a href="https://github.com/GoogleCloudPlatform/generative-ai/blob/main/language/prompts/examples/chain_of_thought_react.ipynb" target="_blank" rel="noreferrer">
                        Google Cloud CoT &amp; ReAct サンプルノートブック: https://github.com/GoogleCloudPlatform/generative-ai/
                    </a>
                </div>
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

            {/* Card 1: グラウンディングの本質 */}
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

            {/* Card 2: 3種類のデータソース */}
            <div className="card">
                <div className="card-h">📂 グラウンディングの3種類のデータソース（試験頻出）</div>
                <p style={{ fontSize: '14px', marginBottom: '16px' }}>
                    試験では「どのデータソースで、どのグラウンディング手法を使うか」の組み合わせが問われる。
                </p>

                <div className="fgrid">
                    <div className="fi" style={{ borderTopColor: 'var(--teal)' }}>
                        <div className="fi-t" style={{ color: 'var(--teal)' }}>🏢 ファーストパーティデータ（自社データ）</div>
                        <div className="fi-d">
                            企業が保有する独自の内部データ。社内文書・製品マニュアル・業務ナレッジベース・CRM データ等。<br /><br />
                            <strong style={{ color: 'var(--text)' }}>特徴：</strong>機密性が高い。外部に出さずにGCP内で処理する必要がある。<br /><br />
                            <strong style={{ color: 'var(--text)' }}>推奨手法：</strong>Vertex AI Search（プリビルト RAG）または RAG API
                        </div>
                    </div>
                    <div className="fi" style={{ borderTopColor: 'var(--sky)' }}>
                        <div className="fi-t" style={{ color: 'var(--sky)' }}>🌐 サードパーティデータ（外部データ）</div>
                        <div className="fi-d">
                            業界レポート・ニュースフィード・規制当局の発表・パートナー企業から提供されるデータ。<br /><br />
                            <strong style={{ color: 'var(--text)' }}>特徴：</strong>ライセンス・著作権に注意が必要。定期更新が必要。<br /><br />
                            <strong style={{ color: 'var(--text)' }}>推奨手法：</strong>データパイプラインで取り込み後、Vertex AI Search に登録
                        </div>
                    </div>
                    <div className="fi" style={{ borderTopColor: 'var(--lime)' }}>
                        <div className="fi-t" style={{ color: 'var(--lime)' }}>🌏 World Data（世界の一般知識）</div>
                        <div className="fi-d">
                            インターネット全体のリアルタイム情報。最新ニュース・Wikipedia・公開 Web サイトなど。<br /><br />
                            <strong style={{ color: 'var(--text)' }}>特徴：</strong>最も新鮮。情報の信頼性はソースによって異なる。<br /><br />
                            <strong style={{ color: 'var(--text)' }}>推奨手法：</strong>Grounding with Google Search（リアルタイム Web 検索）
                        </div>
                    </div>
                </div>

                <div className="warn">
                    <div className="warnt">⚠️ 試験頻出：データソースとグラウンディング手法の対応</div>
                    <ul>
                        <li><strong style={{ color: 'var(--bright)' }}>自社機密データ + セキュリティ重視</strong> → Vertex AI Search（VPC 内処理）または RAG API</li>
                        <li><strong style={{ color: 'var(--bright)' }}>最新の世界情報 + 知識カットオフ解消</strong> → Grounding with Google Search</li>
                        <li><strong style={{ color: 'var(--bright)' }}>両方が必要な企業アプリ</strong> → ハイブリッド（社内 Vertex AI Search + Google Search を組み合わせ）</li>
                    </ul>
                </div>
            </div>

            {/* Card 3: RAG の完全解説 */}
            <div className="card">
                <div className="card-h">🔄 RAG（Retrieval-Augmented Generation）仕組みの完全解説</div>
                <p style={{ fontSize: '14px', marginBottom: '16px' }}>
                    RAG = <strong style={{ color: 'var(--sky)' }}>検索（Retrieval）</strong> +{' '}
                    <strong style={{ color: 'var(--lime)' }}>拡張（Augmented）</strong> +{' '}
                    <strong style={{ color: 'var(--teal)' }}>生成（Generation）</strong>。外部文書から関連情報を検索し、それをコンテキストに追加してLLMが生成する技術。
                </p>

                <div className="rag-flow">
                    <div className="rag-step">
                        <div className="rag-num">1</div>
                        <div className="rag-body">
                            <strong>📥 ドキュメントの取り込み・前処理（Ingestion）</strong>
                            <p>PDF・Word・Webページ・データベースなどの企業内ドキュメントを読み込む。テキストを適切なサイズの断片（チャンク）に分割する。チャンクサイズは大きすぎても小さすぎても精度に影響。</p>
                            <div className="rag-tags">
                                <span className="rag-tag rt-teal">チャンキング</span>
                                <span className="rag-tag rt-sky">ドキュメント前処理</span>
                                <span className="rag-tag rt-amber">OCR対応（PDF等）</span>
                            </div>
                        </div>
                    </div>
                    <div className="rag-step">
                        <div className="rag-num">2</div>
                        <div className="rag-body">
                            <strong>🔢 エンベディング（ベクター化）</strong>
                            <p>各チャンクをエンベディングモデル（text-embedding-004等）で数値ベクターに変換。意味的に近いテキストは近い位置のベクターになる。このベクターをベクターデータベースに格納する。</p>
                            <div className="rag-tags">
                                <span className="rag-tag rt-teal">text-embedding-004</span>
                                <span className="rag-tag rt-lime">意味的検索</span>
                                <span className="rag-tag rt-sky">ベクターDB</span>
                            </div>
                        </div>
                    </div>
                    <div className="rag-step">
                        <div className="rag-num">3</div>
                        <div className="rag-body">
                            <strong>🔍 クエリ・検索（Retrieval）</strong>
                            <p>ユーザーの質問もエンベディングでベクター化。ベクターデータベースでコサイン類似度・内積などで最も関連するチャンクを上位N件取得（ベクター検索 + BM25の組み合わせもある）。</p>
                            <div className="rag-tags">
                                <span className="rag-tag rt-teal">コサイン類似度</span>
                                <span className="rag-tag rt-lime">Approximate NN</span>
                                <span className="rag-tag rt-amber">リランキング</span>
                            </div>
                        </div>
                    </div>
                    <div className="rag-step">
                        <div className="rag-num">4</div>
                        <div className="rag-body">
                            <strong>📝 プロンプト拡張・LLM生成（Augmentation + Generation）</strong>
                            <p>検索で取得したチャンクをコンテキストとしてプロンプトに追加し、LLMに渡す。LLMはモデルの知識だけでなく提供されたコンテキストを参照して回答を生成。ソース引用も可能になる。</p>
                            <div className="rag-tags">
                                <span className="rag-tag rt-teal">コンテキスト注入</span>
                                <span className="rag-tag rt-lime">Gemini Pro</span>
                                <span className="rag-tag rt-sky">ソース引用</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="info">
                    <div className="infot">📌 RAG とファインチューニングの違い</div>
                    <p>
                        RAG は「外部から情報を検索して補う」→<strong style={{ color: 'var(--sky)' }}>最新情報対応・データを変えればすぐ反映</strong>。
                        ファインチューニングは「モデル自体を再学習させる」→<strong style={{ color: 'var(--lime)' }}>特定ドメインへの深い適応・推論時コストゼロ</strong>。
                        多くの場合 RAG → FT の順で試すのが Google 推奨のアプローチ。
                    </p>
                </div>
            </div>

            {/* Card 4: 3つの RAG オファリング */}
            <div className="card">
                <div className="card-h">☁️ Google Cloud の3つの RAG オファリング（試験必須）</div>
                <p style={{ fontSize: '14px', marginBottom: '16px' }}>
                    Google Cloud は難易度・制御度に応じた3段階の RAG ソリューションを提供。
                    <strong style={{ color: 'var(--sky)' }}>何を優先するかで選択肢が変わる</strong>ことが試験のポイント。
                </p>

                <div className="fgrid">
                    <div className="fi" style={{ borderTop: '2px solid var(--lime)' }}>
                        <div className="fi-t" style={{ color: 'var(--lime)' }}>① プリビルト RAG — Vertex AI Search</div>
                        <div className="fi-d">
                            <strong style={{ color: 'var(--text)' }}>概要：</strong>ドキュメントをアップロードするだけで RAG 搭載の検索・Q&amp;A API が完成。チャンキング・エンベディング・ベクター検索・LLM回答生成をすべて自動化。<br /><br />
                            <strong style={{ color: 'var(--text)' }}>特徴：</strong>コード最少・最速でPoC可能・エンタープライズ品質<br /><br />
                            <strong style={{ color: 'var(--text)' }}>適用場面：</strong>社内ナレッジ検索・チャットボット・カスタマーサポートのFAQ回答
                        </div>
                    </div>
                    <div className="fi" style={{ borderTop: '2px solid var(--sky)' }}>
                        <div className="fi-t" style={{ color: 'var(--sky)' }}>② RAG API — Vertex AI RAG Engine</div>
                        <div className="fi-d">
                            <strong style={{ color: 'var(--text)' }}>概要：</strong>RAG パイプラインの各ステップ（チャンキング戦略・埋め込みモデル選択・リランキングアルゴリズム）をAPIで細かくカスタマイズ。<br /><br />
                            <strong style={{ color: 'var(--text)' }}>特徴：</strong>高度な制御・複数データソースの動的切り替え可能・専用エンドポイント<br /><br />
                            <strong style={{ color: 'var(--text)' }}>適用場面：</strong>特定のチャンキング戦略が必要な場合・カスタム再ランキングが必要な場合
                        </div>
                    </div>
                    <div className="fi" style={{ borderTop: '2px solid var(--teal)' }}>
                        <div className="fi-t" style={{ color: 'var(--teal)' }}>③ Grounding with Google Search</div>
                        <div className="fi-d">
                            <strong style={{ color: 'var(--text)' }}>概要：</strong>Google のリアルタイム Web 検索インデックスを LLM の回答に注入。API 設定1行で有効化でき、常に最新の世界情報を提供。<br /><br />
                            <strong style={{ color: 'var(--text)' }}>特徴：</strong>リアルタイム・最新情報・知識カットオフを完全解消<br /><br />
                            <strong style={{ color: 'var(--text)' }}>適用場面：</strong>最新ニュース・株価・天気・時事情報が必要なアプリ
                        </div>
                    </div>
                </div>

                <table className="ctbl" style={{ marginTop: '16px' }}>
                    <thead>
                        <tr>
                            <th>比較軸</th>
                            <th>① Vertex AI Search（プリビルト）</th>
                            <th>② RAG API（カスタム）</th>
                            <th>③ Grounding w/ Google Search</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>実装難易度</strong></td>
                            <td>★☆☆（最簡単）</td>
                            <td>★★☆（中程度）</td>
                            <td>★☆☆（最簡単）</td>
                        </tr>
                        <tr>
                            <td><strong>制御度</strong></td>
                            <td>低（自動管理）</td>
                            <td>高（各ステップ制御）</td>
                            <td>低（Google管理）</td>
                        </tr>
                        <tr>
                            <td><strong>データソース</strong></td>
                            <td>社内文書・DB</td>
                            <td>任意（カスタム）</td>
                            <td>公開 Web（リアルタイム）</td>
                        </tr>
                        <tr>
                            <td><strong>最新情報</strong></td>
                            <td>登録次第（手動更新）</td>
                            <td>データ次第</td>
                            <td>◎（常時最新）</td>
                        </tr>
                        <tr>
                            <td><strong>適用場面</strong></td>
                            <td>社内ナレッジ・PoC</td>
                            <td>高精度・専門システム</td>
                            <td>世界の最新情報が必要な場合</td>
                        </tr>
                    </tbody>
                </table>

                <div className="bp">
                    <div className="bpt">✅ RAG オファリング選択のフレームワーク</div>
                    <ul>
                        <li><strong>まず試すなら</strong> → Vertex AI Search（プリビルト RAG）。最小コード・最速PoC</li>
                        <li><strong>精度向上が必要なら</strong> → RAG API でチャンキング戦略・リランキングをカスタマイズ</li>
                        <li><strong>最新情報が必須なら</strong> → Grounding with Google Search を単体または組み合わせで使用</li>
                        <li><strong>エンタープライズ本番なら</strong> → 社内データ（Vertex AI Search）+ 必要に応じて Google Search のハイブリッド構成</li>
                    </ul>
                </div>
                <div className="src">
                    <div className="srct">📎 参照リソース</div>
                    <a href="https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/overview" target="_blank" rel="noreferrer">
                        https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/overview
                    </a>
                    <a href="https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/grounding-with-vertex-ai-search" target="_blank" rel="noreferrer">
                        https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/grounding-with-vertex-ai-search
                    </a>
                    <a href="https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/grounding" target="_blank" rel="noreferrer">
                        https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/grounding
                    </a>
                    <a href="https://arxiv.org/pdf/2005.14165.pdf" target="_blank" rel="noreferrer">
                        RAG 原論文 (Lewis et al., 2020): https://arxiv.org/pdf/2005.14165.pdf
                    </a>
                </div>
            </div>

            {/* Card 5: サンプリングパラメータ */}
            <div className="card" id="sampling">
                <div className="card-h">🎛️ サンプリングパラメータ — LLM の動作を精密にコントロールする</div>
                <p style={{ fontSize: '14px', marginBottom: '16px' }}>
                    Gen AI モデルは複数のパラメータで出力の多様性・長さ・安全性を制御できる。試験では
                    <strong style={{ color: 'var(--sky)' }}>各パラメータの機能と推奨設定値</strong>が頻繁に問われる。
                </p>

                <div className="param-grid">
                    {/* temperature */}
                    <div className="param">
                        <div className="param-name">temperature（温度）</div>
                        <div className="param-range">範囲: 0.0 〜 2.0</div>
                        <div className="param-desc">
                            出力の<strong style={{ color: 'var(--teal)' }}>ランダム性・創造性</strong>を制御する最重要パラメータ。低いほど決定論的（毎回同じ）、高いほど多様で予測不能な出力になる。
                        </div>
                        <div className="param-scale">
                            <div className="param-scale-row">
                                <div className="param-scale-val">0.0</div>
                                <div className="param-bar"><div className="param-fill" style={{ width: '5%' }}></div></div>
                                <div className="param-label">完全決定論的</div>
                            </div>
                            <div className="param-scale-row">
                                <div className="param-scale-val">0.2</div>
                                <div className="param-bar"><div className="param-fill" style={{ width: '20%' }}></div></div>
                                <div className="param-label">事実QA推奨</div>
                            </div>
                            <div className="param-scale-row">
                                <div className="param-scale-val">0.7</div>
                                <div className="param-bar"><div className="param-fill" style={{ width: '55%' }}></div></div>
                                <div className="param-label">バランス型</div>
                            </div>
                            <div className="param-scale-row">
                                <div className="param-scale-val">1.0+</div>
                                <div className="param-bar"><div className="param-fill" style={{ width: '85%' }}></div></div>
                                <div className="param-label">創作文章推奨</div>
                            </div>
                        </div>
                    </div>
                    {/* top_p */}
                    <div className="param">
                        <div className="param-name">top_p（Nucleus Sampling）</div>
                        <div className="param-range">範囲: 0.0 〜 1.0</div>
                        <div className="param-desc">
                            確率の累積値が<strong style={{ color: 'var(--teal)' }}>P に達するまでの上位トークン</strong>からのみサンプリングする。確率が低い「奇妙な単語」を排除し、品質を保ちながら多様性を確保する。
                        </div>
                        <div className="param-scale">
                            <div className="param-scale-row">
                                <div className="param-scale-val">0.1</div>
                                <div className="param-bar"><div className="param-fill" style={{ width: '10%' }}></div></div>
                                <div className="param-label">非常に保守的</div>
                            </div>
                            <div className="param-scale-row">
                                <div className="param-scale-val">0.8</div>
                                <div className="param-bar"><div className="param-fill" style={{ width: '60%' }}></div></div>
                                <div className="param-label">バランス型</div>
                            </div>
                            <div className="param-scale-row">
                                <div className="param-scale-val">0.95</div>
                                <div className="param-bar"><div className="param-fill" style={{ width: '80%' }}></div></div>
                                <div className="param-label">一般推奨値</div>
                            </div>
                            <div className="param-scale-row">
                                <div className="param-scale-val">1.0</div>
                                <div className="param-bar"><div className="param-fill" style={{ width: '100%' }}></div></div>
                                <div className="param-label">全トークン対象</div>
                            </div>
                        </div>
                    </div>
                    {/* max_output_tokens */}
                    <div className="param">
                        <div className="param-name">max_output_tokens</div>
                        <div className="param-range">モデル依存（例: Gemini Pro = 8192）</div>
                        <div className="param-desc">
                            生成する<strong style={{ color: 'var(--teal)' }}>最大トークン数</strong>を設定。1トークン ≒ 日本語で約1〜2文字、英語で約4文字。短い応答が必要なら小さく設定して API コストを削減できる。
                        </div>
                        <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--muted)' }}>
                            <strong style={{ color: 'var(--text)' }}>推奨設定：</strong><br />
                            チャット応答 → 256〜512<br />
                            要約タスク → 1024〜2048<br />
                            長文生成 → モデル上限まで
                        </div>
                    </div>
                    {/* safety_settings */}
                    <div className="param">
                        <div className="param-name">safety_settings</div>
                        <div className="param-range">OFF / LOW / MEDIUM / HIGH / BLOCK_ALL</div>
                        <div className="param-desc">
                            有害コンテンツ（ヘイトスピーチ・危険情報・性的内容・暴力）の<strong style={{ color: 'var(--teal)' }}>フィルタリング強度</strong>を設定。カテゴリ別に個別設定可能。エンタープライズでは HIGH を推奨。
                        </div>
                        <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--muted)' }}>
                            <strong style={{ color: 'var(--text)' }}>カテゴリ：</strong><br />
                            HARM_CATEGORY_HARASSMENT<br />
                            HARM_CATEGORY_HATE_SPEECH<br />
                            HARM_CATEGORY_DANGEROUS_CONTENT<br />
                            HARM_CATEGORY_SEXUALLY_EXPLICIT
                        </div>
                    </div>
                    {/* token_count */}
                    <div className="param">
                        <div className="param-name">token_count（入力トークン）</div>
                        <div className="param-range">モデルのコンテキストウィンドウ以内</div>
                        <div className="param-desc">
                            入力プロンプト（コンテキスト）のトークン数。<strong style={{ color: 'var(--teal)' }}>APIコストは入力+出力トークン数の合計</strong>で課金される。長いコンテキストは精度を上げるがコストも上がる。
                        </div>
                        <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--muted)' }}>
                            <strong style={{ color: 'var(--text)' }}>Gemini のコンテキスト上限：</strong><br />
                            Gemini 1.5 Flash → 1M トークン<br />
                            Gemini 1.5 Pro → 1M トークン<br />
                            Gemini 2.0 Flash → 1M トークン
                        </div>
                    </div>
                    {/* stop_sequences */}
                    <div className="param">
                        <div className="param-name">stop_sequences</div>
                        <div className="param-range">任意の文字列リスト</div>
                        <div className="param-desc">
                            指定した文字列が出力に現れた時点で<strong style={{ color: 'var(--teal)' }}>生成を即座に停止</strong>するシーケンス。JSON生成時の「{'}'} 」やマークダウン区切りの「---」など、出力の終端を制御するのに使用。
                        </div>
                        <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--muted)' }}>
                            <strong style={{ color: 'var(--text)' }}>活用例：</strong><br />
                            stop_sequences: [&quot;```&quot;, &quot;END&quot;, &quot;\n\n&quot;]
                        </div>
                    </div>
                </div>

                <div className="bp">
                    <div className="bpt">✅ サンプリングパラメータのベストプラクティス</div>
                    <ul>
                        <li><strong>事実確認・QA・要約</strong> → temperature: 0.0〜0.3（低い値で一貫性を確保）</li>
                        <li><strong>マーケティング文章・アイデア生成</strong> → temperature: 0.7〜1.0（高い値で創造性を発揮）</li>
                        <li><strong>コード生成</strong> → temperature: 0.0〜0.2（構文的に正確なコードが必要）</li>
                        <li><strong>エンタープライズ本番環境</strong> → safety_settings を HIGH に設定。コンプライアンス監査ログを記録</li>
                        <li><strong>コスト最適化</strong> → max_output_tokens を必要最小限に設定。不必要な長文生成を防ぐ</li>
                    </ul>
                </div>

                <div className="codeblock">
                    <span className="comment">// Vertex AI Python SDK でのサンプリングパラメータ設定例</span><br />
                    <span className="fn">from</span>{' '}<span className="kw">vertexai.generative_models</span>{' '}<span className="fn">import</span>{' '}GenerativeModel, GenerationConfig<br /><br />
                    model = GenerativeModel(<span className="str">&quot;gemini-1.5-pro-002&quot;</span>)<br /><br />
                    config = GenerationConfig(<br />
                    {'  '}temperature=<span className="num">0.2</span>,{' '}<span className="comment"># 事実QA向けに低く設定</span><br />
                    {'  '}top_p=<span className="num">0.9</span>,{' '}<span className="comment"># 上位90%のトークンからサンプリング</span><br />
                    {'  '}max_output_tokens=<span className="num">1024</span>,{' '}<span className="comment"># 最大1024トークンで応答</span><br />
                    {'  '}stop_sequences=[<span className="str">&quot;END&quot;</span>],{' '}<span className="comment"># &quot;END&quot;が出たら停止</span><br />
                    )<br /><br />
                    response = model.generate_content(<br />
                    {'  '}<span className="str">&quot;本日の気温と過去30年の平均気温を比較してください&quot;</span>,<br />
                    {'  '}generation_config=config,<br />
                    )
                </div>
                <div className="src">
                    <div className="srct">📎 参照リソース</div>
                    <a href="https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models" target="_blank" rel="noreferrer">
                        https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models
                    </a>
                    <a href="https://cloud.google.com/vertex-ai/docs/generative-ai/model-reference/text#request_body" target="_blank" rel="noreferrer">
                        https://cloud.google.com/vertex-ai/docs/generative-ai/model-reference/text#request_body
                    </a>
                    <a href="https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/configure-safety-attributes" target="_blank" rel="noreferrer">
                        https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/configure-safety-attributes
                    </a>
                </div>
            </div>
        </section>
    );
}

/* ── Summary Section ── */
function SummarySection() {
    return (
        <section id="summary">
            <div className="card" style={{ borderColor: 'rgba(0, 217, 192, 0.3)', background: 'linear-gradient(135deg, var(--bg2), var(--bg4))' }}>
                <div className="card-h" style={{ fontSize: '18px' }}>🎯 Section 3 試験攻略 — 最重要ポイント完全まとめ</div>

                <div className="fact-row">
                    <div className="fact">
                        <div className="fact-val">~20%</div>
                        <div className="fact-lbl">試験での配点</div>
                    </div>
                    <div className="fact">
                        <div className="fact-val">3</div>
                        <div className="fact-lbl">サブセクション数</div>
                    </div>
                    <div className="fact">
                        <div className="fact-val">7</div>
                        <div className="fact-lbl">プロンプト技法数</div>
                    </div>
                    <div className="fact">
                        <div className="fact-val">6</div>
                        <div className="fact-lbl">サンプリングパラメータ</div>
                    </div>
                </div>

                <div style={{ marginTop: '24px' }}>
                    <div className="fgrid">
                        <div className="fi" style={{ borderTopColor: 'var(--teal)' }}>
                            <div className="fi-t">3.1 で絶対押さえる3点</div>
                            <div className="fi-d">① 6つの限界とそれぞれの対処法の組み合わせ ② 5つの改善戦略のトレードオフ ③ Vertex AI Feature Store・ドリフト監視の役割</div>
                        </div>
                        <div className="fi" style={{ borderTopColor: 'var(--lime)' }}>
                            <div className="fi-t">3.2 で絶対押さえる3点</div>
                            <div className="fi-d">① 7技法の名称・定義・適用場面（特に CoT と ReAct） ② Zero-shot→ReAct の難易度・コスト順 ③ プロンプト設計の黄金律5箇条</div>
                        </div>
                        <div className="fi" style={{ borderTopColor: 'var(--sky)' }}>
                            <div className="fi-t">3.3 で絶対押さえる3点</div>
                            <div className="fi-d">① 3種データソースとグラウンディング手法の対応 ② RAG 3オファリングの使い分け基準 ③ temperature・top-p の意味と推奨設定値</div>
                        </div>
                    </div>
                </div>

                <div className="warn" style={{ marginTop: '20px' }}>
                    <div className="warnt">⚠️ Section 3 で特に混同しやすい概念</div>
                    <ul>
                        <li>
                            <strong style={{ color: 'var(--bright)' }}>RAG ≠ ファインチューニング</strong>：RAG は「検索して補う」、FT は「モデルを再学習させる」。最新情報対応は RAG でしか解決できない
                        </li>
                        <li>
                            <strong style={{ color: 'var(--bright)' }}>Temperature=0 は「完全に同じ出力」ではない</strong>：top-p・top-k の影響で完全同一ではないが、極めて高い一貫性になる
                        </li>
                        <li>
                            <strong style={{ color: 'var(--bright)' }}>Prompt Chaining ≠ Chain-of-Thought</strong>：Chaining は複数プロンプトをつなぐ「ワークフロー」、CoT は1プロンプト内で推論を「見える化」する技法
                        </li>
                        <li>
                            <strong style={{ color: 'var(--bright)' }}>Grounding ≠ RAG</strong>：RAG はグラウンディングの実装方法の一つ。Grounding はより広い概念で、Google Search グラウンディングは RAG の変形
                        </li>
                    </ul>
                </div>

                <div className="src">
                    <div className="srct">📎 Section 3 全体の参照リソース</div>
                    <a href="https://cloud.google.com/learn/certification/generative-ai-leader" target="_blank" rel="noreferrer">
                        試験ページ: https://cloud.google.com/learn/certification/generative-ai-leader
                    </a>
                    <a href="https://services.google.com/fh/files/misc/generative_ai_leader_exam_guide_english.pdf" target="_blank" rel="noreferrer">
                        試験ガイド PDF: https://services.google.com/fh/files/misc/generative_ai_leader_exam_guide_english.pdf
                    </a>
                    <a href="https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/introduction-prompt-design" target="_blank" rel="noreferrer">
                        Prompt Design ガイド: https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/introduction-prompt-design
                    </a>
                    <a href="https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/overview" target="_blank" rel="noreferrer">
                        Grounding 概要: https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/overview
                    </a>
                    <a href="https://cloud.google.com/vertex-ai/docs/model-monitoring/overview" target="_blank" rel="noreferrer">
                        Model Monitoring: https://cloud.google.com/vertex-ai/docs/model-monitoring/overview
                    </a>
                    <a href="https://arxiv.org/pdf/2201.11903.pdf" target="_blank" rel="noreferrer">
                        Chain-of-Thought 論文 (Wei 2022): https://arxiv.org/pdf/2201.11903.pdf
                    </a>
                    <a href="https://arxiv.org/pdf/2210.03629.pdf" target="_blank" rel="noreferrer">
                        ReAct 論文 (Yao 2022): https://arxiv.org/pdf/2210.03629.pdf
                    </a>
                    <a href="https://arxiv.org/pdf/2005.14165.pdf" target="_blank" rel="noreferrer">
                        RAG 論文 (Lewis 2020): https://arxiv.org/pdf/2005.14165.pdf
                    </a>
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
                <div className="sdiv" />
                <SummarySection />
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
