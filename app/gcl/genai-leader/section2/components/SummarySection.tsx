export default function SummarySection() {
    return (
        <section id="summary">
            <div className="card" style={{ borderColor: 'rgba(61, 111, 255, 0.4)', background: 'linear-gradient(135deg, var(--s3) 0%, var(--s4) 100%)' }}>
                <div className="card-title">🎯 Section 2 試験攻略 — 最重要ポイント総まとめ</div>

                <div className="scorecard">
                    <div className="sc">
                        <div className="sc-val" style={{ color: 'var(--aqua)' }}>35%</div>
                        <div className="sc-lbl">試験全体での配点<br />最高配点セクション</div>
                    </div>
                    <div className="sc">
                        <div className="sc-val" style={{ color: 'var(--emerald)' }}>5</div>
                        <div className="sc-lbl">サブセクション数<br />2.1〜2.5</div>
                    </div>
                    <div className="sc">
                        <div className="sc-val" style={{ color: 'var(--amber)' }}>10+</div>
                        <div className="sc-lbl">主要サービス数<br />理解が必要</div>
                    </div>
                    <div className="sc">
                        <div className="sc-val" style={{ color: 'var(--violet)' }}>4</div>
                        <div className="sc-lbl">エージェントツール種別<br />完全暗記推奨</div>
                    </div>
                </div>

                <div className="fgrid" style={{ marginTop: '20px' }}>
                    <div className="fitem" style={{ borderLeftColor: 'var(--sapphire)' }}>
                        <div className="fitem-t" style={{ color: 'var(--sapphire)' }}>2.1 で押さえる3点</div>
                        <div className="fitem-d">① AI-First = 10年以上の本番実績 ② エンタープライズ5要素 ③ TPU/Hypercomputer の位置づけ</div>
                    </div>
                    <div className="fitem" style={{ borderLeftColor: 'var(--aqua)' }}>
                        <div className="fitem-t" style={{ color: 'var(--aqua)' }}>2.2 で押さえる3点</div>
                        <div className="fitem-d">① Gems = カスタム AI ペルソナ ② Gemini Enterprise = エージェント管理基盤 ③ Workspace = 既存ツール内に AI</div>
                    </div>
                    <div className="fitem" style={{ borderLeftColor: 'var(--emerald)' }}>
                        <div className="fitem-t" style={{ color: 'var(--emerald)' }}>2.3 で押さえる3点</div>
                        <div className="fitem-d">① Vertex AI Search = 企業向け検索 ② CES 4コンポーネントの役割 ③ Bot→Human エスカレーション設計</div>
                    </div>
                    <div className="fitem" style={{ borderLeftColor: 'var(--amber)' }}>
                        <div className="fitem-t" style={{ color: 'var(--amber)' }}>2.4 で押さえる3点</div>
                        <div className="fitem-d">① Model Garden = 200以上のモデルカタログ ② RAG 3レベルの使い分け ③ ADK/Agent Engine の役割</div>
                    </div>
                    <div className="fitem" style={{ borderLeftColor: 'var(--violet)' }}>
                        <div className="fitem-t" style={{ color: 'var(--violet)' }}>2.5 で押さえる3点</div>
                        <div className="fitem-d">① 4つのツール種別と使い分け ② 主要 AI API 7種の用途 ③ Vertex AI Studio vs Google AI Studio</div>
                    </div>
                </div>

                <div className="warn" style={{ marginTop: '20px' }}>
                    <div className="warnt">⚠️ 試験でよく混同される概念</div>
                    <ul>
                        <li><strong style={{ color: 'var(--bright)' }}>Gemini Enterprise ≠ Gemini for Workspace</strong>：Enterprise はエージェント管理プラットフォーム、Workspace は Office ツール内 AI</li>
                        <li><strong style={{ color: 'var(--bright)' }}>Vertex AI Studio ≠ Google AI Studio</strong>：前者は本番エンタープライズ用、後者は開発者 PoC 用</li>
                        <li><strong style={{ color: 'var(--bright)' }}>Extensions ≠ Plugins ≠ Functions</strong>：Extensions は Google 製既成ツール、Plugins は OpenAPI 外部連携、Functions は自作カスタムロジック</li>
                        <li><strong style={{ color: 'var(--bright)' }}>AutoML ≠ Vertex AI Training</strong>：AutoML はノーコード自動 ML、Vertex AI Training はカスタムコードでフル制御する ML 学習</li>
                    </ul>
                </div>

                <div className="src">
                    <div className="srct">📎 Section 2 全体の参照リソース</div>
                    <a href="https://cloud.google.com/learn/certification/generative-ai-leader" target="_blank" rel="noopener noreferrer">試験ページ：https://cloud.google.com/learn/certification/generative-ai-leader</a>
                    <a href="https://services.google.com/fh/files/misc/generative_ai_leader_exam_guide_english.pdf" target="_blank" rel="noopener noreferrer">試験ガイド PDF：https://services.google.com/fh/files/misc/generative_ai_leader_exam_guide_english.pdf</a>
                    <a href="https://cloud.google.com/vertex-ai" target="_blank" rel="noopener noreferrer">Vertex AI：https://cloud.google.com/vertex-ai</a>
                    <a href="https://cloud.google.com/gemini-enterprise" target="_blank" rel="noopener noreferrer">Gemini Enterprise：https://cloud.google.com/gemini-enterprise</a>
                    <a href="https://cloud.google.com/products/agent-builder" target="_blank" rel="noopener noreferrer">Vertex AI Agent Builder：https://cloud.google.com/products/agent-builder</a>
                    <a href="https://cloud.google.com/solutions/customer-engagement-ai" target="_blank" rel="noopener noreferrer">Customer Engagement Suite：https://cloud.google.com/solutions/customer-engagement-ai</a>
                    <a href="https://notebooklm.google.com" target="_blank" rel="noopener noreferrer">NotebookLM：https://notebooklm.google.com</a>
                    <a href="https://workspace.google.com/products/gemini/" target="_blank" rel="noopener noreferrer">Gemini for Workspace：https://workspace.google.com/products/gemini/</a>
                </div>
            </div>
        </section>
    );
}
