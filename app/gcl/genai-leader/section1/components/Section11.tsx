/* ── Sub-section 1.1: 核心概念・用語 ── */
export default function Section11() {
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
