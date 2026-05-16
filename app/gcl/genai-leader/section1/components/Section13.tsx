import { ReferencesBlock } from './ReferencesBlock';

/**
 * Render a section that visualizes the Gen AI ecosystem's five-layer landscape and summarizes each layer's business implications.
 *
 * The section includes labeled representations of the five layers (Infrastructure, Models, Platforms, Agents, Applications),
 * a highlighted checklist of business-positioning notes, and a references block with related links.
 *
 * @returns The JSX element for the section with id "s13" describing the Gen AI 5-layer structure and references.
 */
export default function Section13() {
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
