import { ReferencesBlock } from './ReferencesBlock';

/**
 * Renders the Section 1.4 UI describing Google foundation models (Gemini, Gemma, Imagen, Veo).
 *
 * The section includes a header with a priority badge, a comparative card with four model
 * summaries and selection criteria, a references block, and a consolidated exam-summary card
 * with key memorization points and additional references.
 *
 * @returns The JSX element for the section with id "s14", containing the model comparison grid, decision criteria, references, and exam summary content.
 */
export default function Section14() {
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
