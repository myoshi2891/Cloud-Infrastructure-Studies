import type { Metadata } from 'next';
import { Sora, IBM_Plex_Mono } from 'next/font/google';
import './section2.css';

const sora = Sora({
    subsets: ['latin'],
    weight: ['300', '400', '600', '700', '800'],
    variable: '--font-sora',
    display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
    subsets: ['latin'],
    weight: ['400', '600'],
    variable: '--font-ibm-plex-mono',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Section 2: Google Cloud の Gen AI サービス | Generative AI Leader',
    description:
        'Generative AI Leader 試験 Section 2 — Google Cloud の Gen AI プロダクト群完全解説。Vertex AI・Gemini Workspace・CES・エージェントツーリング',
};

/* ── Section 2.1: Google Cloud の強み ── */
function Section21() {
    return (
        <section id="s21">
            <div className="ssh ssh-1">
                <div className="ssh-num num-1">2.1</div>
                <div className="ssh-text">
                    <h2>Google Cloud の Gen AI における強み</h2>
                    <p>Google の AI-First アプローチ・エンタープライズ対応基盤・オープン戦略・AI最適化インフラを理解する</p>
                </div>
                <div className="ssh-badge b1">試験頻出</div>
            </div>

            <div className="card">
                <div className="card-title">🏆 Google の AI-First アプローチと長年の研究蓄積</div>
                <p style={{ fontSize: '14px', marginBottom: '16px' }}>
                    Google は 10年以上前から AI を事業の中核に据えてきた企業。
                    Transformer アーキテクチャ（2017年）・BERT・AlphaFold など現代AIの基盤技術を生み出した研究蓄積が他社との最大の差別化要因。
                </p>

                <div className="fgrid">
                    <div className="fitem">
                        <div className="fitem-t">🔬 AI 研究の先駆者</div>
                        <div className="fitem-d">Transformer・BERT・T5・AlphaFold など現代AI基盤技術を発明。Google DeepMind が世界トップの研究成果を継続的に産出。</div>
                    </div>
                    <div className="fitem">
                        <div className="fitem-t">🌍 本番スケールの実績</div>
                        <div className="fitem-d">Google 検索・Gmail スマート返信・Google マップ ETA 予測など数十億ユーザー規模でAIを運用してきた実証済み技術。</div>
                    </div>
                    <div className="fitem">
                        <div className="fitem-t">🔄 研究→製品の高速転換</div>
                        <div className="fitem-d">Google DeepMind の研究成果を Vertex AI・Gemini として顧客に迅速提供できる一気通貫体制。</div>
                    </div>
                    <div className="fitem">
                        <div className="fitem-t">📊 データ優位性</div>
                        <div className="fitem-d">Web インデックス・Google マップ・YouTube のデータ資産。リアルタイム検索グラウンディングで最新情報を提供。</div>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-title">🏢 エンタープライズ対応 AI プラットフォームの5つの柱</div>
                <div className="fgrid">
                    <div className="fitem" style={{ borderLeftColor: 'var(--sapphire)' }}>
                        <div className="fitem-t" style={{ color: 'var(--sapphire)' }}>🛡️ Responsible（責任ある AI）</div>
                        <div className="fitem-d">Google の AI 原則に基づく開発・デプロイ。ハルシネーション対策・バイアス軽減・透明性確保の仕組みが標準装備。</div>
                    </div>
                    <div className="fitem" style={{ borderLeftColor: 'var(--emerald)' }}>
                        <div className="fitem-t" style={{ color: 'var(--emerald)' }}>🔒 Secure（セキュア）</div>
                        <div className="fitem-d">CMEK・VPC Service Controls・IAM による完全なデータ分離。顧客データを Google の AI 学習に使用しない契約保証。</div>
                    </div>
                    <div className="fitem" style={{ borderLeftColor: 'var(--aqua)' }}>
                        <div className="fitem-t" style={{ color: 'var(--aqua)' }}>🔐 Private（プライベート）</div>
                        <div className="fitem-d">データ主権の保証。処理リージョン指定可能。EU AI Act・GDPR・HIPAA 等の規制コンプライアンスに対応。</div>
                    </div>
                    <div className="fitem" style={{ borderLeftColor: 'var(--amber)' }}>
                        <div className="fitem-t" style={{ color: 'var(--amber)' }}>⚡ Reliable（信頼性）</div>
                        <div className="fitem-d">99.9% 以上の SLA・グローバルリージョン展開・専用 AI インフラ（TPU/GPU）による高可用性。</div>
                    </div>
                    <div className="fitem" style={{ borderLeftColor: 'var(--violet)' }}>
                        <div className="fitem-t" style={{ color: 'var(--violet)' }}>🔓 Open（オープン）</div>
                        <div className="fitem-d">ベンダーロックイン回避。Gemma（オープンウェイト）・Kubernetes ベース・マルチクラウド対応。</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ── Section 2.2: プリビルト Gen AI サービス ── */
function Section22() {
    return (
        <section id="s22">
            <div className="ssh ssh-2">
                <div className="ssh-num num-2">2.2</div>
                <div className="ssh-text">
                    <h2>プリビルト Gen AI サービス（すぐ使えるAI）</h2>
                    <p>Gemini app・Gemini Advanced・Gemini Enterprise・NotebookLM・Gemini for Google Workspace の機能・用途・ビジネス価値</p>
                </div>
                <div className="ssh-badge b2">最頻出</div>
            </div>

            <div className="info">
                <div className="infot">📌 プリビルト Gen AI とは？</div>
                <p>「すぐ使える（Out-of-the-box）」Gen AI サービス群。カスタム開発やコーディング不要で、ビジネスユーザーがそのまま業務に活用できる製品。</p>
            </div>

            {/* Gemini App */}
            <div className="pcard">
                <div className="pcard-head">
                    <div className="pcard-icon pi-blue">✨</div>
                    <div>
                        <div className="pcard-name">Gemini アプリ（gemini.google.com）</div>
                        <div className="pcard-type">コンシューマー向け AIアシスタント</div>
                    </div>
                </div>
                <div className="pcard-desc">
                    Google の汎用 AI アシスタントアプリ。ブラウザ・iOS・Android から利用可能。
                    テキスト・画像・音声・コードを理解し、会話形式で幅広いタスクを支援する。
                </div>
                <div className="fgrid">
                    <div className="fitem">
                        <div className="fitem-t">Gemini Advanced</div>
                        <div className="fitem-d">Gemini Ultra モデルを使用。複雑な推論・長文処理・高度なコード生成が可能。Google One AI Premium サブスクリプション。</div>
                    </div>
                    <div className="fitem">
                        <div className="fitem-t">Gems（カスタム AI）</div>
                        <div className="fitem-d">システムインストラクションと知識をカスタマイズした「特化型 AI アシスタント」をコーディング不要で作成・保存。</div>
                    </div>
                    <div className="fitem">
                        <div className="fitem-t">Deep Research</div>
                        <div className="fitem-d">ウェブを自律的に調査し、詳細なリサーチレポートを自動生成するエージェント機能。</div>
                    </div>
                </div>
            </div>

            {/* NotebookLM */}
            <div className="pcard">
                <div className="pcard-head">
                    <div className="pcard-icon pi-aqua">📓</div>
                    <div>
                        <div className="pcard-name">NotebookLM</div>
                        <div className="pcard-type">AI 搭載 研究・知識整理アシスタント</div>
                    </div>
                </div>
                <div className="pcard-desc">
                    自分がアップロードした資料（PDF・動画・音声・URL）を「ソース」として読み込み、
                    その内容だけを根拠に回答・要約・音声ポッドキャスト生成を行う。
                    <strong style={{ color: 'var(--bright)' }}>グラウンディング特化</strong>型のAIアシスタント。
                </div>
                <div className="bp">
                    <div className="bpt">NotebookLM の差別化ポイント</div>
                    <ul>
                        <li>回答は必ずアップロードした資料の引用元付き → ハルシネーション対策に優れる</li>
                        <li>「Audio Overview」機能 → 資料の内容を2人の対話形式のポッドキャストに自動変換</li>
                        <li>企業版 NotebookLM Plus → セキュリティ強化・利用状況管理・大容量対応</li>
                    </ul>
                </div>
            </div>

            {/* Gemini for Workspace */}
            <div className="pcard">
                <div className="pcard-head">
                    <div className="pcard-icon pi-emerald">📧</div>
                    <div>
                        <div className="pcard-name">Gemini for Google Workspace</div>
                        <div className="pcard-type">ビジネス生産性向上のための AI アシスタント</div>
                    </div>
                </div>
                <div className="pcard-desc">
                    Gmail・Docs・Sheets・Slides・Meet に Gemini が統合されたビジネス向けサービス。
                    「Help me write」「Help me organize」などのAI機能がワークフローに組み込まれる。
                </div>
                <div className="fgrid">
                    <div className="fitem">
                        <div className="fitem-t">Gemini Business</div>
                        <div className="fitem-d">中小企業向け。Workspace アプリ内での AI 機能（メール要約・文書作成支援等）とデータ保護。</div>
                    </div>
                    <div className="fitem">
                        <div className="fitem-t">Gemini Enterprise</div>
                        <div className="fitem-d">大企業向け。高度なセキュリティ・コンプライアンス・管理機能・Gemini Advanced 相当モデル利用。</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ── Section 2.3: 顧客体験向上ソリューション ── */
function Section23() {
    return (
        <section id="s23">
            <div className="ssh ssh-3">
                <div className="ssh-num num-3">2.3</div>
                <div className="ssh-text">
                    <h2>顧客体験向上ソリューション（Customer Engagement Suite）</h2>
                    <p>Vertex AI Search・Customer Engagement Suite（CES）の機能・用途・ビジネス価値を理解する</p>
                </div>
                <div className="ssh-badge b3">頻出</div>
            </div>

            <div className="info">
                <div className="infot">📌 このサブセクションの位置づけ</div>
                <p>2.3 は「顧客向け（External Facing）」の Gen AI ソリューション。コールセンター・カスタマーサポート・EC サイト検索などを AI で強化する。</p>
            </div>

            {/* Vertex AI Search */}
            <div className="pcard">
                <div className="pcard-head">
                    <div className="pcard-icon pi-emerald">🔍</div>
                    <div>
                        <div className="pcard-name">Vertex AI Search</div>
                        <div className="pcard-type">エンタープライズ向け Google 品質の検索</div>
                    </div>
                </div>
                <div className="pcard-desc">
                    Google の検索エンジン技術を企業のウェブサイト・社内ポータル・EC サイトに組み込めるマネージド検索サービス。
                    非構造化データ（PDF・HTML・動画）も含む横断検索と RAG による回答生成を提供。
                </div>
                <div className="fgrid">
                    <div className="fitem">
                        <div className="fitem-t">Retail Search</div>
                        <div className="fitem-d">EC サイト向け特化版。商品の意味理解・パーソナライズ・クエリ理解による購買転換率の向上。</div>
                    </div>
                    <div className="fitem">
                        <div className="fitem-t">Conversational Search</div>
                        <div className="fitem-d">会話形式での検索・RAG による回答生成。ユーザーが自然言語で質問し、ソース付きで回答を得られる。</div>
                    </div>
                </div>
            </div>

            {/* CES */}
            <div className="pcard">
                <div className="pcard-head">
                    <div className="pcard-icon pi-aqua">📞</div>
                    <div>
                        <div className="pcard-name">Customer Engagement Suite（CES）</div>
                        <div className="pcard-type">AI によるコンタクトセンター変革</div>
                    </div>
                </div>
                <div className="pcard-desc">
                    旧 Contact Center AI（CCAI）を中核とした、コンタクトセンター全体の AI 化ソリューション。
                    音声・チャット・メール対応を AI が担い、人間エージェントをサポートする。
                </div>
                <div className="fgrid">
                    <div className="fitem">
                        <div className="fitem-t">Agent Assist</div>
                        <div className="fitem-d">人間エージェントへのリアルタイム回答提案・通話要約・感情分析。エージェントの生産性と顧客満足度を同時向上。</div>
                    </div>
                    <div className="fitem">
                        <div className="fitem-t">Dialogflow CX</div>
                        <div className="fitem-d">高度な会話フロー設計が可能な仮想エージェント構築プラットフォーム。ビジュアルフロービルダーで複雑な対話を設計。</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ── Section 2.4: 開発者向け AI 基盤 ── */
function Section24() {
    return (
        <section id="s24">
            <div className="ssh ssh-4">
                <div className="ssh-num num-4">2.4</div>
                <div className="ssh-text">
                    <h2>開発者向け AI 構築基盤（Vertex AI Platform）</h2>
                    <p>Vertex AI・Model Garden・AutoML・RAG offerings・Vertex AI Agent Builder — 開発者が Gen AI アプリを作るための全ツールを理解する</p>
                </div>
                <div className="ssh-badge b4">最重要</div>
            </div>

            <div className="card">
                <div className="card-title">🏗️ Vertex AI Platform の全体像</div>
                <p style={{ fontSize: '14px', marginBottom: '16px' }}>
                    Vertex AI は Google Cloud の<strong style={{ color: 'var(--aqua)' }}>統合 AI 開発プラットフォーム</strong>。
                    モデルの選択→カスタマイズ→デプロイ→エージェント化→本番管理までの Gen AI ライフサイクル全体をカバー。
                </p>

                <table className="stbl">
                    <thead>
                        <tr>
                            <th>コンポーネント</th>
                            <th>役割</th>
                            <th>対象ユーザー</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ color: 'var(--sapphire)', fontFamily: 'var(--mono)' }}>Model Garden</td>
                            <td>200以上のモデルを探索・選択・デプロイするカタログ</td>
                            <td>開発者・データサイエンティスト</td>
                        </tr>
                        <tr>
                            <td style={{ color: 'var(--aqua)', fontFamily: 'var(--mono)' }}>Vertex AI Studio</td>
                            <td>プロンプト設計・モデルテスト・微調整を行うUI</td>
                            <td>プロンプトエンジニア・開発者</td>
                        </tr>
                        <tr>
                            <td style={{ color: 'var(--emerald)', fontFamily: 'var(--mono)' }}>AutoML</td>
                            <td>コードなしでカスタムMLモデルを自動学習・デプロイ</td>
                            <td>ML未経験の開発者・ビジネスアナリスト</td>
                        </tr>
                        <tr>
                            <td style={{ color: 'var(--amber)', fontFamily: 'var(--mono)' }}>RAG Engine</td>
                            <td>企業データをベクトルDB管理してRAGパイプラインを構築</td>
                            <td>バックエンド開発者</td>
                        </tr>
                        <tr>
                            <td style={{ color: 'var(--rose)', fontFamily: 'var(--mono)' }}>Agent Builder</td>
                            <td>自律型AIエージェントの構築・オーケストレーション</td>
                            <td>エージェント開発者</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="card">
                <div className="card-title">🎛️ Vertex AI Studio でできること</div>
                <div className="fgrid">
                    <div className="fitem">
                        <div className="fitem-t">プロンプト設計</div>
                        <div className="fitem-d">System prompt・Few-shot例・Temperature などのパラメータをUIで調整しながら最適なプロンプトを設計。</div>
                    </div>
                    <div className="fitem">
                        <div className="fitem-t">モデル比較</div>
                        <div className="fitem-d">同一プロンプトで複数モデルの出力を並べて比較評価。最適モデル選定を効率化。</div>
                    </div>
                    <div className="fitem">
                        <div className="fitem-t">Supervised Fine-tuning</div>
                        <div className="fitem-d">特定タスク用のラベル付きデータで Gemini をファインチューニング。プロンプトで解決できない精度要件に対応。</div>
                    </div>
                    <div className="fitem">
                        <div className="fitem-t">Grounding</div>
                        <div className="fitem-d">Google 検索や社内データへのグラウンディングを設定。最新情報と社内知識を組み合わせた回答生成。</div>
                    </div>
                </div>
            </div>

            <div className="warn">
                <div className="warnt">試験頻出の区別ポイント</div>
                <ul>
                    <li>「AutoML」は<strong style={{ color: 'var(--bright)' }}>カスタムモデルを学習</strong>するツール — 既存の基盤モデルを使うのではなく、独自データで一から学習</li>
                    <li>「Vertex AI Studio」は<strong style={{ color: 'var(--bright)' }}>プロンプト設計・モデル実験</strong>の UI ツール — 開発者向けのプレイグラウンド</li>
                    <li>「Model Garden」はモデルの<strong style={{ color: 'var(--bright)' }}>カタログ・選択</strong>ツール — 200以上の Googleモデル・サードパーティモデルを探索</li>
                </ul>
            </div>
        </section>
    );
}

/* ── Section 2.5: Gen AI エージェントのツーリング ── */
function Section25() {
    return (
        <section id="s25">
            <div className="ssh ssh-5">
                <div className="ssh-num num-5">2.5</div>
                <div className="ssh-text">
                    <h2>Gen AI エージェントのツーリング</h2>
                    <p>エージェントがどのようにツールを使って外部環境と連携するか・主要な Google Cloud AI API・ツール種別を理解する</p>
                </div>
                <div className="ssh-badge b5">重要</div>
            </div>

            <div className="card">
                <div className="card-title">🔧 AI エージェントが使う4種類のツール</div>
                <p style={{ fontSize: '14px', marginBottom: '16px' }}>
                    エージェントは単体では「考える」だけ。<strong style={{ color: 'var(--aqua)' }}>ツール</strong>を通じて
                    外部環境（API・DB・ファイル等）と連携して初めて「行動」できる。
                </p>

                <div className="tool-grid">
                    <div className="tool-item">
                        <div className="tool-name">📡 Extensions（拡張機能）</div>
                        <div className="tool-desc">
                            Google が提供する既製ツール。Google Search・Maps・Gmail・Calendar などに直接アクセス。
                            設定するだけで使える最も簡単なツール統合方法。
                        </div>
                    </div>
                    <div className="tool-item">
                        <div className="tool-name">🔌 Functions（関数呼び出し）</div>
                        <div className="tool-desc">
                            自社の既存 API・データベース・カスタムロジックをエージェントツールとして定義する機能。
                            Function Calling（Gemini API）により LLM が適切な関数を選択して呼び出す。
                        </div>
                    </div>
                    <div className="tool-item">
                        <div className="tool-name">📂 Data Stores（データストア）</div>
                        <div className="tool-desc">
                            自社の文書・FAQなどをベクトルDBに格納し、エージェントが検索・参照できるようにするもの。
                            Vertex AI Search のデータストアが使われる。
                        </div>
                    </div>
                    <div className="tool-item">
                        <div className="tool-name">🤖 Model as a Tool</div>
                        <div className="tool-desc">
                            別のAIモデル自体をツールとして呼び出す設計パターン。
                            オーケストレーターエージェントが専門エージェントを協調させるマルチエージェント構成で使用。
                        </div>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-title">🗺️ Google Cloud AI API と用途の対応表</div>
                <table className="stbl">
                    <thead>
                        <tr>
                            <th>API / サービス</th>
                            <th>モダリティ</th>
                            <th>主なユースケース</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ color: 'var(--aqua)', fontFamily: 'var(--mono)' }}>Gemini API</td>
                            <td>テキスト・画像・音声・動画</td>
                            <td>マルチモーダル推論・コード生成・RAG</td>
                        </tr>
                        <tr>
                            <td style={{ color: 'var(--sapphire)', fontFamily: 'var(--mono)' }}>Natural Language API</td>
                            <td>テキスト</td>
                            <td>感情分析・エンティティ抽出・構文解析</td>
                        </tr>
                        <tr>
                            <td style={{ color: 'var(--emerald)', fontFamily: 'var(--mono)' }}>Vision AI</td>
                            <td>画像</td>
                            <td>物体検出・OCR・顔検出・ラベリング</td>
                        </tr>
                        <tr>
                            <td style={{ color: 'var(--amber)', fontFamily: 'var(--mono)' }}>Speech-to-Text</td>
                            <td>音声</td>
                            <td>音声文字起こし・コールセンター分析</td>
                        </tr>
                        <tr>
                            <td style={{ color: 'var(--violet)', fontFamily: 'var(--mono)' }}>Translation API</td>
                            <td>テキスト</td>
                            <td>100以上の言語の自動翻訳</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="bp">
                <div className="bpt">Section 2 試験攻略のまとめ</div>
                <ul>
                    <li>「プリビルト」vs「Vertex AI での構築」— コーディング不要で即利用 vs 開発者が構築</li>
                    <li>NotebookLM = グラウンディング特化・引用元付き回答・Audio Overview が差別化</li>
                    <li>Vertex AI Studio = プロンプト実験の UI ツール。AutoML = コードなしカスタムML学習</li>
                    <li>CES（顧客体験向上） = コンタクトセンター AI（Agent Assist + Dialogflow CX）</li>
                    <li>エージェントのツール4種 = Extensions（既製）・Functions（自社API）・Data Stores（文書）・Model（AI呼び出し）</li>
                </ul>
            </div>
        </section>
    );
}

/* ── Main Page ── */
export default function Section2Page() {
    const fontClasses = `${sora.variable} ${ibmPlexMono.variable}`;

    return (
        <div className={`s2-page ${fontClasses}`}>
            {/* HERO */}
            <header className="hero">
                <div className="orb orb-1" />
                <div className="orb orb-2" />
                <div className="orb orb-3" />

                <div className="hero-tag">Generative AI Leader 試験対策 — 深掘りシリーズ</div>
                <h1>
                    <span className="g1">Section 2</span>
                    <span className="g2">Google Cloud の Gen AI サービス完全解説</span>
                </h1>
                <p className="hero-sub">
                    試験最高配点 <strong style={{ color: 'var(--aqua)' }}>~35%</strong> を占める Section 2 を完全攻略。
                    Google Cloud の Gen AI プロダクト群を「なぜ存在するか」「誰が使うか」「どのビジネス価値があるか」の視点で徹底解説。
                </p>

                <div className="s2-weight">
                    <div className="pct">~35%</div>
                    <div className="desc">
                        <strong>Section 2: Google Cloud&apos;s Gen AI Offerings</strong>
                        <span>試験全体の最高配点セクション • 5つのサブセクション構成</span>
                    </div>
                </div>

                <div className="subsec-pills">
                    <div className="sp sp-1">2.1 Google Cloud の強み</div>
                    <div className="sp sp-2">2.2 プリビルト Gen AI サービス</div>
                    <div className="sp sp-3">2.3 顧客体験向上ソリューション</div>
                    <div className="sp sp-4">2.4 開発者向け AI 基盤</div>
                    <div className="sp sp-5">2.5 AI エージェント ツーリング</div>
                </div>
            </header>

            {/* NAV */}
            <nav className="topnav">
                <a href="#s21" className="n1"><span className="ni">2.1</span>Google Cloud の強み</a>
                <a href="#s22" className="n2"><span className="ni">2.2</span>プリビルト Gen AI</a>
                <a href="#s23" className="n3"><span className="ni">2.3</span>顧客体験 CES</a>
                <a href="#s24" className="n4"><span className="ni">2.4</span>開発者向け Vertex AI</a>
                <a href="#s25" className="n5"><span className="ni">2.5</span>エージェントツール</a>
            </nav>

            {/* MAIN */}
            <main className="wrap">
                <Section21 />
                <div className="sdiv" />
                <Section22 />
                <div className="sdiv" />
                <Section23 />
                <div className="sdiv" />
                <Section24 />
                <div className="sdiv" />
                <Section25 />
            </main>

            {/* FOOTER */}
            <footer>
                <strong>Google Cloud Generative AI Leader — Section 2 Gen AI サービス完全解説ガイド</strong>
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
