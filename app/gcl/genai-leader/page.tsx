import type { Metadata } from 'next';
import { Space_Mono } from 'next/font/google';
import './genai-leader.css';

const spaceMono = Space_Mono({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-display-mono',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Generative AI Leader',
    description: 'Google Cloud Generative AI Leader 試験完全対策ガイド',
};

/* ── セクション1：生成 AI の基礎知識 ── */
function Section1() {
    return (
        <div id="section1" className="section-sep">
            <div className="section-header">
                <div className="section-number s1-num">01</div>
                <div className="section-header-text">
                    <h2>生成 AI の基礎知識（Fundamentals of Gen AI）</h2>
                    <p>AI・ML・生成AIの中核概念、データの種類、Gen AIランドスケープ、Googleの基盤モデルを理解する</p>
                </div>
                <div className="pct-badge pct-blue">~30%</div>
            </div>

            {/* 1.1 Core Concepts */}
            <div className="topic-card">
                <div className="topic-title"><span className="topic-id">1.1</span>Gen AI の中核概念と用語</div>
                <div className="term-grid">
                    <div className="term-item"><div className="term-name">人工知能 (AI)</div><div className="term-def">人間の知的行動をコンピュータで模倣する広い分野。機械学習・深層学習・生成AIを包含する上位概念。</div></div>
                    <div className="term-item"><div className="term-name">機械学習 (ML)</div><div className="term-def">データから自動的にパターンを学習するAIの手法。明示的にルールをプログラムせずとも予測・分類ができる。</div></div>
                    <div className="term-item"><div className="term-name">大規模言語モデル (LLM)</div><div className="term-def">膨大なテキストデータで訓練された、人間のような文章を生成・理解できる大規模なニューラルネットワーク。</div></div>
                    <div className="term-item"><div className="term-name">基盤モデル (Foundation Model)</div><div className="term-def">大量のデータで事前学習した汎用モデル。特定タスクへのファインチューニングなしに、多様なタスクに対応できる。</div></div>
                    <div className="term-item"><div className="term-name">生成 AI (Generative AI)</div><div className="term-def">テキスト・画像・音声・動画・コードなど新しいコンテンツを生成できるAI。LLMや拡散モデルが代表例。</div></div>
                    <div className="term-item"><div className="term-name">拡散モデル (Diffusion Model)</div><div className="term-def">ノイズを徐々に除去することで高品質な画像を生成する手法。Stable Diffusion や Imagen が代表例。</div></div>
                    <div className="term-item"><div className="term-name">マルチモーダル</div><div className="term-def">テキスト・画像・音声・動画など複数のデータ形式を同時に処理・生成できるモデル。GeminiはGoogle代表例。</div></div>
                    <div className="term-item"><div className="term-name">プロンプトエンジニアリング</div><div className="term-def">LLMから望ましい出力を得るために入力文（プロンプト）を設計・最適化する技術。</div></div>
                    <div className="term-item"><div className="term-name">自然言語処理 (NLP)</div><div className="term-def">人間の言語をコンピュータが理解・処理・生成できるようにする技術分野。翻訳・感情分析・テキスト要約など。</div></div>
                    <div className="term-item"><div className="term-name">ファインチューニング</div><div className="term-def">事前学習済みモデルを特定のタスクや業界ドメインのデータで追加学習させ、精度を向上させる手法。</div></div>
                </div>
                <div className="best-practice">
                    <div className="bp-title">試験ポイント：AI・ML・Gen AI の階層関係</div>
                    <ul>
                        <li>AI ⊃ ML ⊃ 深層学習 ⊃ 生成AI という包含関係を理解する</li>
                        <li>LLM は生成AIの一種だが、生成AIはテキスト以外も含む（画像・動画等）</li>
                        <li>基盤モデルは「汎用性が高い」点が特徴——ファインチューニングで特化できる</li>
                    </ul>
                </div>
            </div>

            {/* 1.1 ML Approaches */}
            <div className="topic-card">
                <div className="topic-title"><span className="topic-id">1.1</span>機械学習のアプローチ（3種類）</div>
                <div className="step-flow">
                    <div className="step-item">
                        <div className="step-num">1</div>
                        <div className="step-content">
                            <strong>教師あり学習（Supervised Learning）</strong>
                            <p>正解ラベル付きデータで学習。例：スパムメール分類、画像認識（猫か犬か）、価格予測。<br /><b style={{ color: 'var(--gl-cyan)' }}>→ 業務活用例：</b>顧客チャーン予測、不正検知、需要予測</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-num">2</div>
                        <div className="step-content">
                            <strong>教師なし学習（Unsupervised Learning）</strong>
                            <p>ラベルなしデータからパターンを発見。例：顧客セグメンテーション、異常検知、次元削減。<br /><b style={{ color: 'var(--gl-cyan)' }}>→ 業務活用例：</b>顧客グループの自動分類、レコメンデーション</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <div className="step-num">3</div>
                        <div className="step-content">
                            <strong>強化学習（Reinforcement Learning）</strong>
                            <p>試行錯誤で報酬を最大化するよう学習。例：ゲームAI、自動運転、ロボット制御。<br /><b style={{ color: 'var(--gl-cyan)' }}>→ 業務活用例：</b>広告入札最適化、在庫管理、RLHF（LLMの品質向上）</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ML Lifecycle */}
            <div className="topic-card">
                <div className="topic-title"><span className="topic-id">1.1</span>機械学習ライフサイクル と Google Cloud ツール</div>
                <table className="compare-table">
                    <thead><tr><th>ステージ</th><th>内容</th><th>Google Cloud ツール例</th></tr></thead>
                    <tbody>
                        <tr><td><strong>1. データ取り込み</strong></td><td>各種データソースからデータを収集</td><td><span className="pill pill-blue">Cloud Storage</span> <span className="pill pill-blue">Pub/Sub</span> <span className="pill pill-blue">BigQuery</span></td></tr>
                        <tr><td><strong>2. データ準備</strong></td><td>クレンジング・変換・ラベリング</td><td><span className="pill pill-green">Dataflow</span> <span className="pill pill-green">Vertex AI Datasets</span></td></tr>
                        <tr><td><strong>3. モデルトレーニング</strong></td><td>モデルの学習・チューニング</td><td><span className="pill pill-yellow">Vertex AI Training</span> <span className="pill pill-yellow">AutoML</span></td></tr>
                        <tr><td><strong>4. モデルデプロイ</strong></td><td>本番環境へのモデル公開</td><td><span className="pill pill-purple">Vertex AI Prediction</span> <span className="pill pill-purple">Model Registry</span></td></tr>
                        <tr><td><strong>5. モデル管理</strong></td><td>監視・更新・バージョン管理</td><td><span className="pill pill-cyan">Vertex AI Pipelines</span> <span className="pill pill-cyan">Vertex AI Feature Store</span></td></tr>
                    </tbody>
                </table>
            </div>

            {/* 1.2 Data Quality */}
            <div className="topic-card">
                <div className="topic-title"><span className="topic-id">1.2</span>データの種類と品質</div>
                <div className="term-grid">
                    <div className="term-item"><div className="term-name">構造化データ (Structured)</div><div className="term-def">表形式で整理されたデータ。CSVやRDBMSのテーブルが代表例。検索・集計が容易。</div></div>
                    <div className="term-item"><div className="term-name">非構造化データ (Unstructured)</div><div className="term-def">テキスト・画像・動画・音声など形式が定まっていないデータ。データの80〜90%を占める。</div></div>
                    <div className="term-item"><div className="term-name">ラベルあり (Labeled)</div><div className="term-def">正解（アノテーション）が付いたデータ。教師あり学習に必要。作成コストが高い。</div></div>
                    <div className="term-item"><div className="term-name">ラベルなし (Unlabeled)</div><div className="term-def">正解がないデータ。教師なし学習や自己教師あり学習（LLMの事前学習）に使用。</div></div>
                </div>
                <div className="best-practice">
                    <div className="bp-title">データ品質の6つの特性（試験頻出）</div>
                    <ul>
                        <li><strong>完全性（Completeness）：</strong>欠損値がない、必要な項目が揃っている</li>
                        <li><strong>一貫性（Consistency）：</strong>異なるシステム間でデータが矛盾しない</li>
                        <li><strong>関連性（Relevance）：</strong>目的のタスクに必要なデータである</li>
                        <li><strong>可用性（Availability）：</strong>必要なときにアクセス可能である</li>
                        <li><strong>コスト（Cost）：</strong>データ収集・維持のコスト対効果が良い</li>
                        <li><strong>フォーマット（Format）：</strong>モデルが処理できる形式である</li>
                    </ul>
                </div>
            </div>

            {/* 1.3 Gen AI Landscape */}
            <div className="topic-card">
                <div className="topic-title"><span className="topic-id">1.3</span>Gen AI ランドスケープ（5層構造）</div>
                <div className="step-flow">
                    <div className="step-item"><div className="step-num">1</div><div className="step-content"><strong>インフラストラクチャ（Infrastructure）</strong><p>GPU/TPU、クラウドコンピューティング、高速ネットワーク。AIの計算基盤。<br /><b style={{ color: 'var(--gl-cyan)' }}>GCP例：</b>TPU v4/v5、A100/H100 GPU、Google のデータセンター</p></div></div>
                    <div className="step-item"><div className="step-num">2</div><div className="step-content"><strong>モデル（Models）</strong><p>Gemini、Gemma、Imagen、Veo などの基盤モデル。AIの「頭脳」部分。<br /><b style={{ color: 'var(--gl-cyan)' }}>GCP例：</b>Model Garden（150以上のモデルを提供）</p></div></div>
                    <div className="step-item"><div className="step-num">3</div><div className="step-content"><strong>プラットフォーム（Platforms）</strong><p>モデルを構築・デプロイ・管理するツール群。開発の生産性を上げる。<br /><b style={{ color: 'var(--gl-cyan)' }}>GCP例：</b>Vertex AI Platform、Vertex AI Studio、Google AI Studio</p></div></div>
                    <div className="step-item"><div className="step-num">4</div><div className="step-content"><strong>エージェント（Agents）</strong><p>ツールを使いながら自律的に複数タスクを実行するAIシステム。<br /><b style={{ color: 'var(--gl-cyan)' }}>GCP例：</b>Vertex AI Agent Builder、Conversational Agents</p></div></div>
                    <div className="step-item"><div className="step-num">5</div><div className="step-content"><strong>アプリケーション（Applications）</strong><p>エンドユーザーが実際に使うGen AI搭載の業務システム・消費者向け製品。<br /><b style={{ color: 'var(--gl-cyan)' }}>GCP例：</b>Gemini app、Gemini for Workspace、NotebookLM</p></div></div>
                </div>
            </div>

            {/* 1.4 Google Foundation Models */}
            <div className="topic-card">
                <div className="topic-title"><span className="topic-id">1.4</span>Google の基盤モデル（Gemini / Gemma / Imagen / Veo）</div>
                <table className="compare-table">
                    <thead><tr><th>モデル</th><th>タイプ</th><th>特徴</th><th>代表的用途</th></tr></thead>
                    <tbody>
                        <tr><td><strong style={{ color: 'var(--gl-blue)' }}>Gemini</strong></td><td>マルチモーダル LLM</td><td>テキスト・画像・音声・動画・コードを統合処理。Ultra/Pro/Flash/Nano の各サイズ</td><td>文書要約、コード生成、複雑な推論、エージェント</td></tr>
                        <tr><td><strong style={{ color: 'var(--gl-green)' }}>Gemma</strong></td><td>軽量オープンモデル</td><td>オープンウェイト。Geminiの技術を使いながら小型・軽量。ローカル/エッジでも動作</td><td>自社インフラでの実行、カスタマイズ、コスト最適化</td></tr>
                        <tr><td><strong style={{ color: 'var(--gl-yellow)' }}>Imagen</strong></td><td>テキスト→画像生成</td><td>高品質・高解像度な画像生成。安全フィルタ内蔵。商用利用可能</td><td>マーケ素材作成、商品画像生成、デザインプロトタイプ</td></tr>
                        <tr><td><strong style={{ color: 'var(--gl-purple)' }}>Veo</strong></td><td>テキスト→動画生成</td><td>高品質な動画をプロンプトから生成。様々なスタイルや解像度対応</td><td>広告動画制作、コンテンツ制作、教育コンテンツ</td></tr>
                    </tbody>
                </table>
                <div className="best-practice">
                    <div className="bp-title">基盤モデル選定時の考慮ポイント（試験頻出）</div>
                    <ul>
                        <li><strong>モダリティ：</strong>テキストのみ？画像も必要？動画も？→ 処理したいデータ形式で選ぶ</li>
                        <li><strong>コンテキストウィンドウ：</strong>長い文書を一度に処理したい場合は大きいウィンドウが必要</li>
                        <li><strong>セキュリティ・プライバシー：</strong>機密データを扱う場合は自社インフラ or VPC内で</li>
                        <li><strong>コスト vs パフォーマンス：</strong>Flash（速い・安い）vs Ultra（高精度・高コスト）</li>
                        <li><strong>ファインチューニング可否：</strong>特定業務に最適化したい場合はカスタマイズ対応モデルを選ぶ</li>
                    </ul>
                </div>
                <div className="source-box">
                    <div className="src-title">参照リソース</div>
                    <a href="https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models" target="_blank" rel="noopener noreferrer">https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models</a>
                    <a href="https://cloud.google.com/model-garden" target="_blank" rel="noopener noreferrer">https://cloud.google.com/model-garden</a>
                </div>
            </div>
        </div>
    );
}

/* ── セクション2：Google Cloud の Gen AI サービス ── */
function Section2() {
    return (
        <div id="section2">
            <div className="section-header">
                <div className="section-number s2-num">02</div>
                <div className="section-header-text">
                    <h2>Google Cloud の Gen AI サービス（GCP Gen AI Offerings）</h2>
                    <p>Vertex AI・Gemini・Customer Engagement Suite など、GCPの主要Gen AIサービスの機能・用途・ビジネス価値を理解する</p>
                </div>
                <div className="pct-badge pct-green">~35%</div>
            </div>

            {/* 2.1 GCP Strengths */}
            <div className="topic-card">
                <div className="topic-title"><span className="topic-id">2.1</span>Google Cloud の Gen AI における強み</div>
                <div className="term-grid">
                    <div className="term-item"><div className="term-name">AI-First アプローチ</div><div className="term-def">Google 自身がAI企業として自社サービスにAIを組み込んできた実績。Search・Maps・YouTube等で10年以上の本番運用経験。</div></div>
                    <div className="term-item"><div className="term-name">エンタープライズ対応</div><div className="term-def">責任あるAI・セキュリティ・プライバシー・信頼性・スケーラビリティを標準装備。SOC2/ISO27001等の認証。</div></div>
                    <div className="term-item"><div className="term-name">オープン性</div><div className="term-def">オープンソース（Gemma）や標準API対応で、ベンダーロックインを避けられる。Hugging Faceとの連携も充実。</div></div>
                    <div className="term-item"><div className="term-name">AI最適化インフラ</div><div className="term-def">独自設計のTPU（Tensor Processing Unit）でLLM学習・推論コストを大幅削減。Hypercomputerアーキテクチャ。</div></div>
                    <div className="term-item"><div className="term-name">民主化ツール</div><div className="term-def">AutoML（ノーコード）、AI API（コード少量）、Vertex AI（フルコード）と段階的に対応。技術レベル不問でAIを活用可能。</div></div>
                    <div className="term-item"><div className="term-name">データ管理の主権</div><div className="term-def">顧客データをGoogleのAI学習に使用しない。VPC Service Controls・CMEK（顧客管理暗号化キー）でデータ保護。</div></div>
                </div>
            </div>

            {/* 2.2 Prebuilt Offerings */}
            <div className="topic-card">
                <div className="topic-title"><span className="topic-id">2.2</span>プリビルト Gen AI サービス（Gemini アプリ群）</div>
                <table className="compare-table">
                    <thead><tr><th>サービス</th><th>主な機能</th><th>対象ユーザー</th></tr></thead>
                    <tbody>
                        <tr><td><strong style={{ color: 'var(--gl-blue)' }}>Gemini app</strong></td><td>チャット形式でのテキスト・画像・音声対話。Gems（カスタムAI）機能でパーソナライズ</td><td>一般ユーザー・ビジネスユーザー</td></tr>
                        <tr><td><strong style={{ color: 'var(--gl-blue)' }}>Gemini Advanced</strong></td><td>Gemini Ultra モデルを利用した高精度推論。複雑な分析・コード生成・長文処理が可能</td><td>プロフェッショナル・開発者</td></tr>
                        <tr><td><strong style={{ color: 'var(--gl-green)' }}>Gemini Enterprise</strong></td><td>NotebookLM API、マルチモーダル検索、カスタムエージェント構築。企業向け高度機能</td><td>大企業・IT部門</td></tr>
                        <tr><td><strong style={{ color: 'var(--gl-green)' }}>Gemini for Workspace</strong></td><td>Gmail・Docs・Sheets・Slides・MeetにAI機能を追加。メール下書き、文書要約、スプレッドシート分析</td><td>オフィスワーカー全員</td></tr>
                        <tr><td><strong style={{ color: 'var(--gl-yellow)' }}>NotebookLM</strong></td><td>資料（PDF・URL等）をソースとして、AIが質問応答・要約・ポッドキャスト生成。ハルシネーション低減</td><td>研究者・学習者・コンサルタント</td></tr>
                    </tbody>
                </table>
                <div className="best-practice">
                    <div className="bp-title">ビジネス価値のポイント（試験頻出）</div>
                    <ul>
                        <li>Gemini for Workspace は既存のGoogle Workspaceアドオンとして追加可能——既存ITインフラを活かせる</li>
                        <li>NotebookLM は企業内資料を「ソース」にするため、幻覚（ハルシネーション）を大幅に低減できる</li>
                        <li>Gemini Enterprise の Gems 機能で、部署・ロール別のカスタムAIアシスタントを作成できる</li>
                    </ul>
                </div>
            </div>

            {/* 2.3 Customer Experience */}
            <div className="topic-card">
                <div className="topic-title"><span className="topic-id">2.3</span>顧客体験向上ソリューション（CX）</div>
                <div className="term-grid">
                    <div className="term-item"><div className="term-name">Vertex AI Search</div><div className="term-def">企業内データ（非構造化も含む）を横断した Google品質の検索。社内ポータル・EC・サポートサイトに組み込み可能。</div></div>
                    <div className="term-item"><div className="term-name">Conversational Agents（旧Dialogflow）</div><div className="term-def">ルールベース＋Gen AI を組み合わせたチャットボット・音声ボット構築プラットフォーム。決定論的フローとLLMを融合。</div></div>
                    <div className="term-item"><div className="term-name">Agent Assist</div><div className="term-def">人間のコールセンターオペレーターをリアルタイムにAIがサポート。関連情報・返答候補を自動表示。</div></div>
                    <div className="term-item"><div className="term-name">Conversational Insights</div><div className="term-def">通話・チャットログをAIで分析。顧客感情・トピック・エージェントパフォーマンスを可視化。</div></div>
                    <div className="term-item"><div className="term-name">CCAI Platform (CCaaS)</div><div className="term-def">Contact Center as a Service。AI機能を内蔵したフルマネージドのコンタクトセンター基盤。電話・チャット・メールを統合。</div></div>
                </div>
                <div className="source-box">
                    <div className="src-title">参照リソース</div>
                    <a href="https://cloud.google.com/products/agent-builder" target="_blank" rel="noopener noreferrer">https://cloud.google.com/products/agent-builder</a>
                    <a href="https://cloud.google.com/solutions/customer-engagement-ai" target="_blank" rel="noopener noreferrer">https://cloud.google.com/solutions/customer-engagement-ai</a>
                </div>
            </div>

            {/* 2.4 Developer Empowerment */}
            <div className="topic-card">
                <div className="topic-title"><span className="topic-id">2.4</span>開発者向け Gen AI 基盤（Vertex AI）</div>
                <table className="compare-table">
                    <thead><tr><th>サービス</th><th>機能</th><th>使いどころ</th></tr></thead>
                    <tbody>
                        <tr><td><strong style={{ color: 'var(--gl-cyan)' }}>Vertex AI Platform</strong></td><td>MLライフサイクル全体を一元管理するプラットフォーム。AutoML、Model Garden、Training等を包含</td><td>ML/AI 開発から本番運用まで全工程</td></tr>
                        <tr><td><strong style={{ color: 'var(--gl-cyan)' }}>Model Garden</strong></td><td>Google製モデル（Gemini等）＋サードパーティモデル（Llama、Mistral等）を一か所で探索・デプロイ</td><td>適切なモデルを素早く選定・試用したいとき</td></tr>
                        <tr><td><strong style={{ color: 'var(--gl-cyan)' }}>AutoML</strong></td><td>コードほぼ不要でカスタムMLモデルを構築。画像分類・テキスト分類・表形式データに対応</td><td>MLエンジニア不在でも自社データでモデルを作りたいとき</td></tr>
                        <tr><td><strong style={{ color: 'var(--gl-cyan)' }}>Vertex AI Search</strong></td><td>企業データ向けRAG搭載検索。非構造化データ（PDF等）も検索可能。API経由で組み込み</td><td>社内ナレッジベース検索・RAGアプリ構築</td></tr>
                        <tr><td><strong style={{ color: 'var(--gl-cyan)' }}>RAG API</strong></td><td>独自のRAGパイプラインを構築するためのAPI群。より細かい制御が必要な場合に使用</td><td>カスタムRAGシステムの構築</td></tr>
                        <tr><td><strong style={{ color: 'var(--gl-cyan)' }}>Vertex AI Agent Builder</strong></td><td>カスタムAIエージェントを構築・デプロイ。外部ツール・API呼び出しをオーケストレーション</td><td>複数ステップの自動化タスクをAIエージェントで実行</td></tr>
                    </tbody>
                </table>
            </div>

            {/* 2.5 Agent Tooling */}
            <div className="topic-card">
                <div className="topic-title"><span className="topic-id">2.5</span>AIエージェントのツール種別</div>
                <div className="term-grid">
                    <div className="term-item"><div className="term-name">Extensions（拡張機能）</div><div className="term-def">Google提供の既成ツール。Google Search、Google Maps等をエージェントが呼び出せる。</div></div>
                    <div className="term-item"><div className="term-name">Functions（関数）</div><div className="term-def">開発者が定義したカスタム関数。Cloud Functions・Cloud Run経由で外部APIやDBと連携。</div></div>
                    <div className="term-item"><div className="term-name">Data Stores（データストア）</div><div className="term-def">ベクターDB・構造化DB等への接続。RAGのデータソースとして活用。</div></div>
                    <div className="term-item"><div className="term-name">Plugins（プラグイン）</div><div className="term-def">OpenAPI仕様に基づく外部サービス連携。SalesforceやJira等のSaaSと接続。</div></div>
                </div>
                <div className="warning-box">
                    <div className="w-title">Vertex AI Studio vs Google AI Studio の違い（試験頻出）</div>
                    <p><strong style={{ color: 'var(--gl-cyan)' }}>Vertex AI Studio：</strong>エンタープライズ向け。Vertex AI プラットフォーム上で動作。本番デプロイ、セキュリティ、VPC統合、監査ログ対応。大企業・本番環境に最適。</p>
                    <p style={{ marginTop: '8px' }}><strong style={{ color: 'var(--gl-cyan)' }}>Google AI Studio：</strong>開発者・プロトタイプ向け。Gemini APIへ素早くアクセス。無料枠あり。PoC・試作品作成に最適。</p>
                </div>
                <div className="source-box">
                    <div className="src-title">参照リソース</div>
                    <a href="https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/function-calling" target="_blank" rel="noopener noreferrer">https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/function-calling</a>
                    <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer">https://aistudio.google.com/app/apikey</a>
                </div>
            </div>
        </div>
    );
}

/* ── セクション3：Gen AI モデル出力改善技術 ── */
function Section3() {
    return (
        <div id="section3">
            <div className="section-header">
                <div className="section-number s3-num">03</div>
                <div className="section-header-text">
                    <h2>Gen AI モデル出力改善技術（Techniques to Improve Gen AI Output）</h2>
                    <p>プロンプトエンジニアリング・RAG・グラウンディング・ファインチューニングなど、モデル性能向上の手法を理解する</p>
                </div>
                <div className="pct-badge pct-yellow">~20%</div>
            </div>

            {/* 3.1 Foundation Model Limitations */}
            <div className="topic-card">
                <div className="topic-title"><span className="topic-id">3.1</span>基盤モデルの限界と対策</div>
                <table className="compare-table">
                    <thead><tr><th>限界</th><th>説明</th><th>Google 推奨対策</th></tr></thead>
                    <tbody>
                        <tr><td><strong style={{ color: 'var(--gl-red)' }}>ハルシネーション</strong></td><td>AIが事実と異なる内容を自信を持って生成する現象</td><td>グラウンディング、RAG、HITL（人間によるレビュー）</td></tr>
                        <tr><td><strong style={{ color: 'var(--gl-red)' }}>知識カットオフ</strong></td><td>学習データの締切日以降の情報を知らない</td><td>Grounding with Google Search、RAGでリアルタイムデータ補充</td></tr>
                        <tr><td><strong style={{ color: 'var(--gl-red)' }}>バイアス・公平性</strong></td><td>学習データのバイアスがモデルに反映される</td><td>多様なデータ、RLHF、定期的な公平性評価</td></tr>
                        <tr><td><strong style={{ color: 'var(--gl-red)' }}>エッジケース</strong></td><td>稀なパターン・特殊ケースへの対応が弱い</td><td>ファインチューニング、プロンプトエンジニアリング</td></tr>
                        <tr><td><strong style={{ color: 'var(--gl-red)' }}>データ依存性</strong></td><td>学習データの質がモデル品質に直結する</td><td>高品質データガバナンス、データ品質管理</td></tr>
                    </tbody>
                </table>
                <div className="best-practice">
                    <div className="bp-title">継続的モニタリングのベストプラクティス</div>
                    <ul>
                        <li><strong>Vertex AI Feature Store：</strong>特徴量の一貫性を保ち、学習・推論のデータ乖離を防ぐ</li>
                        <li><strong>ドリフト監視：</strong>入力データ分布の変化を検知し、再学習トリガーを設定</li>
                        <li><strong>KPI追跡：</strong>精度・レイテンシ・コストを継続的に計測</li>
                        <li><strong>自動モデルアップグレード：</strong>Vertex AI の管理モデルは安全パッチ・改善を自動適用</li>
                    </ul>
                </div>
            </div>

            {/* 3.2 Prompt Engineering */}
            <div className="topic-card">
                <div className="topic-title"><span className="topic-id">3.2</span>プロンプトエンジニアリング技術</div>
                <div className="step-flow">
                    <div className="step-item"><div className="step-num">基礎</div><div className="step-content"><strong>Zero-Shot プロンプティング</strong><p>例示なしで直接タスクを依頼。シンプルなタスクや明確な指示で効果的。<br />例：「次の文章を日本語に翻訳してください：Hello World」</p></div></div>
                    <div className="step-item"><div className="step-num">入門</div><div className="step-content"><strong>One-Shot プロンプティング</strong><p>1つの例示を与えてからタスクを実行。出力フォーマットを指定したいときに有効。</p></div></div>
                    <div className="step-item"><div className="step-num">標準</div><div className="step-content"><strong>Few-Shot プロンプティング</strong><p>複数の例示（2〜8例）を与えて精度向上。特定のパターンや形式に従わせたいときに最適。</p></div></div>
                    <div className="step-item"><div className="step-num">応用</div><div className="step-content"><strong>Role Prompting（ロールプロンプティング）</strong><p>AIに役割を与える。「あなたはシニアデータアナリストです。次のデータを分析してください」</p></div></div>
                    <div className="step-item"><div className="step-num">高度</div><div className="step-content"><strong>Chain-of-Thought（思考の連鎖）プロンプティング</strong><p>「ステップバイステップで考えてください」と指示。論理的推論・計算・複雑な分析に効果的。</p></div></div>
                    <div className="step-item"><div className="step-num">最高</div><div className="step-content"><strong>ReAct プロンプティング</strong><p>Reason（推論）+ Act（行動）を繰り返す。外部ツールを使いながら問題を段階的に解決するエージェント向け。</p></div></div>
                </div>
                <div className="best-practice">
                    <div className="bp-title">プロンプト設計のベストプラクティス</div>
                    <ul>
                        <li>タスクを明確・具体的に記述する——曖昧さを排除する</li>
                        <li>期待する出力フォーマット（JSON・箇条書き・表等）を明示する</li>
                        <li>コンテキスト（背景情報）を十分に与える</li>
                        <li>複雑なタスクは Prompt Chaining（連鎖）で段階的に処理する</li>
                        <li>ネガティブプロンプト（やらないこと）も明示すると品質が上がる</li>
                    </ul>
                </div>
                <div className="source-box">
                    <div className="src-title">参照リソース</div>
                    <a href="https://github.com/GoogleCloudPlatform/generative-ai/blob/main/language/prompts/examples/chain_of_thought_react.ipynb" target="_blank" rel="noopener noreferrer">Chain-of-Thought / ReAct サンプル</a>
                    <a href="https://arxiv.org/pdf/2201.11903.pdf" target="_blank" rel="noopener noreferrer">Chain-of-Thought Prompting 論文 (Wei et al.)</a>
                    <a href="https://arxiv.org/pdf/2210.03629.pdf" target="_blank" rel="noopener noreferrer">ReAct 論文 (Yao et al.)</a>
                </div>
            </div>

            {/* 3.3 Grounding & RAG */}
            <div className="topic-card">
                <div className="topic-title"><span className="topic-id">3.3</span>グラウンディング（Grounding）と RAG</div>
                <div className="term-grid">
                    <div className="term-item"><div className="term-name">グラウンディングとは</div><div className="term-def">LLMの回答を信頼できるデータソースに紐付け、幻覚を減らし事実に基づく回答を生成させる手法。</div></div>
                    <div className="term-item"><div className="term-name">RAG（Retrieval-Augmented Generation）</div><div className="term-def">外部知識ベースから関連情報を検索（Retrieve）し、それを元にテキストを生成（Generate）する手法。</div></div>
                    <div className="term-item"><div className="term-name">ファーストパーティデータ</div><div className="term-def">自社の企業内データ（社内文書、DB等）を使ったグラウンディング。機密情報の取り扱いに注意が必要。</div></div>
                    <div className="term-item"><div className="term-name">Grounding with Google Search</div><div className="term-def">Googleの検索結果をリアルタイムでLLMに注入。最新情報・知識カットオフ問題を解決。</div></div>
                </div>
                <div className="step-flow" style={{ marginTop: '16px' }}>
                    <div className="step-item"><div className="step-num">1</div><div className="step-content"><strong>プリビルト RAG：Vertex AI Search</strong><p>最も簡単なRAG実装方法。ドキュメントをアップロードするだけで検索・回答生成。ノーコードで利用可能。</p></div></div>
                    <div className="step-item"><div className="step-num">2</div><div className="step-content"><strong>RAG APIs（Vertex AI RAG Engine）</strong><p>RAGパイプラインをAPI経由でカスタム構築。チャンク分割・ベクター検索・再ランキングを細かく制御可能。</p></div></div>
                    <div className="step-item"><div className="step-num">3</div><div className="step-content"><strong>Grounding with Google Search</strong><p>Vertex AI API経由でGoogleのWebインデックスを活用。リアルタイム情報が必要なユースケースに最適。</p></div></div>
                </div>
                <div className="best-practice">
                    <div className="bp-title">サンプリングパラメータ（試験頻出）</div>
                    <ul>
                        <li><strong>Temperature（0〜1）：</strong>低い→決定論的・一貫性高い、高い→多様・創造的。事実確認には低い値を推奨</li>
                        <li><strong>Top-P（nucleus sampling）：</strong>確率上位P%のトークンのみから選択。多様性と品質のバランス調整</li>
                        <li><strong>Max Output Tokens：</strong>生成する最大トークン数。長い回答が必要な場合は増やす</li>
                        <li><strong>Safety Settings：</strong>有害コンテンツのフィルタリング強度。エンタープライズ用途では高めに設定</li>
                    </ul>
                </div>
                <div className="source-box">
                    <div className="src-title">参照リソース</div>
                    <a href="https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/overview" target="_blank" rel="noopener noreferrer">https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/overview</a>
                    <a href="https://arxiv.org/pdf/2005.14165.pdf" target="_blank" rel="noopener noreferrer">RAG 原論文 (Lewis et al.)</a>
                </div>
            </div>
        </div>
    );
}

/* ── セクション4：Gen AI ビジネス戦略 ── */
function Section4() {
    return (
        <div id="section4">
            <div className="section-header">
                <div className="section-number s4-num">04</div>
                <div className="section-header-text">
                    <h2>Gen AI ビジネス戦略（Business Strategies for Gen AI）</h2>
                    <p>組織へのGen AI導入ステップ、セキュアなAI、責任あるAIの原則を理解する</p>
                </div>
                <div className="pct-badge pct-red">~15%</div>
            </div>

            {/* 4.1 Implementation Steps */}
            <div className="topic-card">
                <div className="topic-title"><span className="topic-id">4.1</span>Gen AI ソリューション実装ステップ</div>
                <div className="step-flow">
                    <div className="step-item"><div className="step-num">1</div><div className="step-content"><strong>ビジネスニーズの特定（Identify）</strong><p>解決すべき課題を明確化。ROIが高く、実現可能性のあるユースケースを選定する。<br /><b style={{ color: 'var(--gl-cyan)' }}>ポイント：</b>「AI for AI&apos;s sake」ではなく、ビジネス価値が明確なもの優先</p></div></div>
                    <div className="step-item"><div className="step-num">2</div><div className="step-content"><strong>適切なソリューションの選択（Choose）</strong><p>プリビルト利用 vs カスタム構築 vs モデル微調整のトレードオフを評価。技術的制約・予算・セキュリティ要件を考慮する。</p></div></div>
                    <div className="step-item"><div className="step-num">3</div><div className="step-content"><strong>パイロット・PoC（Pilot）</strong><p>小規模から始め、仮説を素早く検証。失敗を早期に発見しコストを最小化。<br /><b style={{ color: 'var(--gl-cyan)' }}>推奨：</b>90日以内に初期成果を出せる範囲でスタート</p></div></div>
                    <div className="step-item"><div className="step-num">4</div><div className="step-content"><strong>統合・展開（Integrate）</strong><p>既存システム・ワークフローへのGen AIの組み込み。変更管理・トレーニングを並行して実施。</p></div></div>
                    <div className="step-item"><div className="step-num">5</div><div className="step-content"><strong>効果測定（Measure）</strong><p>KPI（コスト削減率・生産性向上率・顧客満足度等）を定量的に計測。継続的改善サイクルを確立。</p></div></div>
                </div>
                <div className="best-practice">
                    <div className="bp-title">Gen AI ソリューションタイプ別 選定基準</div>
                    <ul>
                        <li><strong>テキスト生成：</strong>コンテンツ作成・要約・翻訳が必要な場合 → Gemini / Vertex AI</li>
                        <li><strong>画像生成：</strong>マーケティング素材・商品画像が必要な場合 → Imagen on Vertex AI</li>
                        <li><strong>コード生成：</strong>開発者の生産性向上 → Gemini Code Assist</li>
                        <li><strong>パーソナライズ：</strong>個別対応のレコメンデーションや体験 → Vertex AI + BigQuery</li>
                    </ul>
                </div>
            </div>

            {/* 4.2 Secure AI */}
            <div className="topic-card">
                <div className="topic-title"><span className="topic-id">4.2</span>セキュアな AI（Secure AI）と Google SAIF</div>
                <div className="term-grid">
                    <div className="term-item"><div className="term-name">SAIF（Secure AI Framework）</div><div className="term-def">Google が公開した AIセキュリティのフレームワーク。AI システムをML ライフサイクル全体でセキュアにするための原則と手法。</div></div>
                    <div className="term-item"><div className="term-name">IAM（Identity and Access Management）</div><div className="term-def">誰が（Who）・何を（What）・どのリソースに（Which）できるかを制御。最小権限の原則を適用。</div></div>
                    <div className="term-item"><div className="term-name">Security Command Center</div><div className="term-def">Google Cloud リソース全体のセキュリティ脅威・脆弱性を一元可視化・管理するダッシュボード。</div></div>
                    <div className="term-item"><div className="term-name">ワークロード監視</div><div className="term-def">モデルへの異常なアクセス・プロンプトインジェクション・データポイズニング攻撃を検知・対応。</div></div>
                </div>
                <div className="step-flow" style={{ marginTop: '16px' }}>
                    <div className="step-item"><div className="step-num">1</div><div className="step-content"><strong>データ収集時のセキュリティ</strong><p>暗号化（転送中・保存時）、データガバナンス、機密データの自動検出（Sensitive Data Protection）</p></div></div>
                    <div className="step-item"><div className="step-num">2</div><div className="step-content"><strong>学習・ファインチューニング時</strong><p>プライベートVPC内での実行、CMEK（顧客管理暗号化鍵）、学習データへのアクセスログ取得</p></div></div>
                    <div className="step-item"><div className="step-num">3</div><div className="step-content"><strong>デプロイ・運用時</strong><p>IAMによるAPI アクセス制御、レート制限、プロンプトインジェクション対策、監査ログ</p></div></div>
                </div>
            </div>

            {/* 4.3 Responsible AI */}
            <div className="topic-card">
                <div className="topic-title"><span className="topic-id">4.3</span>責任ある AI（Responsible AI）の原則</div>
                <div className="term-grid">
                    <div className="term-item"><div className="term-name">公平性（Fairness）</div><div className="term-def">AIが特定の人種・性別・年齢等で差別的な結果を出さないよう、バイアスを検出・除去する。</div></div>
                    <div className="term-item"><div className="term-name">透明性（Transparency）</div><div className="term-def">AIがなぜその判断をしたか説明できること。利用者がAIを利用していることを知ること。</div></div>
                    <div className="term-item"><div className="term-name">説明可能性（Explainability）</div><div className="term-def">AIの意思決定プロセスを人間が理解できるよう説明する能力。Vertex Explainable AI が対応。</div></div>
                    <div className="term-item"><div className="term-name">プライバシー（Privacy）</div><div className="term-def">個人データの最小収集、匿名化・仮名化、GDPR等の規制準拠。データ主権の尊重。</div></div>
                    <div className="term-item"><div className="term-name">説明責任（Accountability）</div><div className="term-def">AIの出力に責任を持つ人間・組織が存在すること。監査証跡・Human-in-the-Loopの整備。</div></div>
                    <div className="term-item"><div className="term-name">安全性（Safety）</div><div className="term-def">有害なコンテンツ生成・悪用を防ぐセーフガードの実装。Google Safety Filters 等を活用。</div></div>
                </div>
                <div className="best-practice">
                    <div className="bp-title">プライバシー保護技術（試験頻出）</div>
                    <ul>
                        <li><strong>データ匿名化（Anonymization）：</strong>個人を特定できないよう識別情報を完全に除去</li>
                        <li><strong>仮名化（Pseudonymization）：</strong>直接識別子を仮の識別子に置換。元のデータと切り離して管理</li>
                        <li><strong>差分プライバシー（Differential Privacy）：</strong>統計的ノイズを加え、個人の再識別を防ぎながらデータを活用</li>
                        <li><strong>Sensitive Data Protection：</strong>GCP サービスで機密情報を自動検出・マスキング</li>
                    </ul>
                </div>
                <div className="source-box">
                    <div className="src-title">参照リソース</div>
                    <a href="https://cloud.google.com/vertex-ai/docs/start/introduction-unified-platform" target="_blank" rel="noopener noreferrer">https://cloud.google.com/vertex-ai/docs/start/introduction-unified-platform</a>
                </div>
            </div>

            {/* Study Tips */}
            <hr className="section-divider" />
            <div className="topic-card" style={{ borderColor: 'rgba(66, 133, 244, 0.4)' }}>
                <div className="topic-title">試験合格のための学習ロードマップ（5 Steps）</div>
                <div className="step-flow">
                    <div className="step-item"><div className="step-num">1</div><div className="step-content"><strong>試験ガイドを熟読する（30分）</strong><p>全4セクションの出題領域を把握。自分の弱点分野を特定する。</p></div></div>
                    <div className="step-item"><div className="step-num">2</div><div className="step-content"><strong>Cloud Skills Boost ラーニングパスを受講（推定10〜20時間）</strong><p>公式の Generative AI Leader Learning Path（無料コースあり）を修了。動画・ハンズオンで体験を積む。</p></div></div>
                    <div className="step-item"><div className="step-num">3</div><div className="step-content"><strong>サンプル問題を解く（1〜2時間）</strong><p>公式サンプル問題で出題傾向と問題形式を把握。間違いの多いセクションを重点学習。</p></div></div>
                    <div className="step-item"><div className="step-num">4</div><div className="step-content"><strong>Google Cloud 公式ドキュメントを参照（随時）</strong><p>Vertex AI・Gemini・Agent Builder等の概要ページを読み込む。実際のサービス画面も触れると理解が深まる。</p></div></div>
                    <div className="step-item"><div className="step-num">5</div><div className="step-content"><strong>試験当日：ビジネス視点で解答する</strong><p>この試験は「技術実装者」ではなく「AI ビジネスリーダー」向け。「ビジネス価値は何か？」「どの製品が最適か？」の観点で選択肢を評価する。</p></div></div>
                </div>
                <div className="service-pills" style={{ marginTop: '16px' }}>
                    <span className="pill pill-blue">試験時間 90分</span>
                    <span className="pill pill-green">前提知識 不要</span>
                    <span className="pill pill-yellow">英語・日本語対応</span>
                    <span className="pill pill-purple">オンライン受験 可</span>
                    <span className="pill pill-red">$99</span>
                </div>
                <div className="source-box">
                    <div className="src-title">公式リンク集</div>
                    <a href="https://cloud.google.com/learn/certification/generative-ai-leader" target="_blank" rel="noopener noreferrer">試験概要ページ</a>
                    <a href="https://services.google.com/fh/files/misc/generative_ai_leader_exam_guide_english.pdf" target="_blank" rel="noopener noreferrer">試験ガイド PDF</a>
                    <a href="https://www.cloudskillsboost.google/paths/1951" target="_blank" rel="noopener noreferrer">公式ラーニングパス</a>
                    <a href="https://forms.gle/soztS7Q74AXBncATA" target="_blank" rel="noopener noreferrer">サンプル問題</a>
                    <a href="https://cp.certmetrics.com/google/en/login" target="_blank" rel="noopener noreferrer">試験登録</a>
                </div>
            </div>
        </div>
    );
}

/* ── メインページコンポーネント ── */
export default function GenaiLeaderPage() {
    return (
        <div className={`genai-leader-page ${spaceMono.variable}`}>
            {/* Hero */}
            <section className="hero">
                <div className="hero-badge">Google Cloud 認定試験 完全対策ガイド</div>
                <h1>
                    Generative AI Leader<br />
                    <span>試験完全マスター</span>
                </h1>
                <p className="hero-sub">
                    初学者でも安心！4つの出題セクションを図解・ベストプラクティス付きでステップバイステップ解説。生成AI時代のビジネスリーダーを目指す方の決定版ガイド。
                </p>
                <div className="meta-grid">
                    <div className="meta-card"><div className="label">試験時間</div><div className="val">90 分</div></div>
                    <div className="meta-card"><div className="label">問題数</div><div className="val">50〜60問</div></div>
                    <div className="meta-card"><div className="label">形式</div><div className="val">多肢選択式</div></div>
                    <div className="meta-card"><div className="label">受験料</div><div className="val">$99</div></div>
                    <div className="meta-card"><div className="label">有効期間</div><div className="val">3 年間</div></div>
                    <div className="meta-card"><div className="label">前提知識</div><div className="val">不要</div></div>
                </div>
            </section>

            {/* Sticky Nav */}
            <nav className="sticky-nav" role="navigation">
                <a href="#overview" className="nav-item"><span className="dot dot-blue" />試験概要</a>
                <a href="#section1" className="nav-item s1"><span className="dot dot-blue" />Section 1: Gen AI 基礎</a>
                <a href="#section2" className="nav-item s2"><span className="dot dot-green" />Section 2: GCP サービス</a>
                <a href="#section3" className="nav-item s3"><span className="dot dot-yellow" />Section 3: モデル改善</a>
                <a href="#section4" className="nav-item s4"><span className="dot dot-red" />Section 4: ビジネス戦略</a>
            </nav>

            {/* Main Content */}
            <main className="wrapper">
                {/* Overview */}
                <div id="overview">
                    <div className="exam-overview">
                        <h3>📊 出題セクション別 比重</h3>
                        <div className="progress-row">
                            <div className="progress-label">Section 1: Gen AI 基礎</div>
                            <div className="progress-bar"><div className="progress-fill fill-blue" style={{ width: '30%' }} /></div>
                            <div className="progress-pct pct-b">~30%</div>
                        </div>
                        <div className="progress-row">
                            <div className="progress-label">Section 2: GCP サービス</div>
                            <div className="progress-bar"><div className="progress-fill fill-green" style={{ width: '35%' }} /></div>
                            <div className="progress-pct pct-g">~35%</div>
                        </div>
                        <div className="progress-row">
                            <div className="progress-label">Section 3: モデル改善技術</div>
                            <div className="progress-bar"><div className="progress-fill fill-yellow" style={{ width: '20%' }} /></div>
                            <div className="progress-pct pct-y">~20%</div>
                        </div>
                        <div className="progress-row">
                            <div className="progress-label">Section 4: ビジネス戦略</div>
                            <div className="progress-bar"><div className="progress-fill fill-red" style={{ width: '15%' }} /></div>
                            <div className="progress-pct pct-r">~15%</div>
                        </div>
                    </div>
                </div>

                <Section1 />
                <hr className="section-divider" />
                <Section2 />
                <hr className="section-divider" />
                <Section3 />
                <hr className="section-divider" />
                <Section4 />
            </main>

            {/* Page Footer */}
            <footer className="page-footer">
                <p style={{ marginBottom: '8px' }}>Google Cloud Generative AI Leader 試験対策ガイド</p>
                <p>
                    参考：<a href="https://cloud.google.com/learn/certification/generative-ai-leader" target="_blank" rel="noopener noreferrer">Google Cloud 公式試験ページ</a> ｜ 作成日：2026年3月
                </p>
                <p style={{ marginTop: '8px', fontSize: '11px', opacity: 0.6 }}>※ 本ガイドは学習目的で作成されました。最新情報は必ず公式サイトでご確認ください。</p>
            </footer>
        </div>
    );
}
