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

            {/* AI-First */}
            <div className="card">
                <div className="card-title">🏆 Google の AI-First アプローチと長年の研究蓄積</div>
                <p style={{ fontSize: '14px', marginBottom: '16px' }}>
                    Google は 10年以上前から AI を事業の中核に据えてきた企業。検索・Gmail・YouTube・Maps など数十億ユーザーが使う製品でAIを本番運用してきた実績が他社との最大の差別化要因。
                </p>

                <div className="fgrid">
                    <div className="fitem">
                        <div className="fitem-t">🔬 AI 研究の先駆者</div>
                        <div className="fitem-d">Transformer アーキテクチャ（2017年）・BERT・T5・AlphaFold など、現代 AI の基盤技術を生み出したのは Google の研究チーム。</div>
                    </div>
                    <div className="fitem">
                        <div className="fitem-t">🌍 本番スケールの実績</div>
                        <div className="fitem-d">Google 検索・Gmail スマート返信・Google マップの ETA 予測など、数十億ユーザー規模でAIを日常的に稼働させてきた実証済み技術。</div>
                    </div>
                    <div className="fitem">
                        <div className="fitem-t">🔄 研究→製品の高速転換</div>
                        <div className="fitem-d">DeepMind・Google Brain（現 Google DeepMind）の研究成果を Vertex AI・Gemini として顧客に迅速に提供できる一気通貫の体制。</div>
                    </div>
                    <div className="fitem">
                        <div className="fitem-t">📊 データ優位性</div>
                        <div className="fitem-d">Web インデックス・Google マップ・YouTube のデータ資産によるモデルの学習品質優位性。リアルタイム検索グラウンディングで最新情報を提供できる。</div>
                    </div>
                </div>
            </div>

            {/* Enterprise Ready */}
            <div className="card">
                <div className="card-title">🏢 エンタープライズ対応 AI プラットフォームの5つの柱</div>

                <div className="fgrid">
                    <div className="fitem" style={{ borderLeftColor: 'var(--sapphire)' }}>
                        <div className="fitem-t" style={{ color: 'var(--sapphire)' }}>🛡️ Responsible（責任ある AI）</div>
                        <div className="fitem-d">Google の AI 原則に基づく開発・デプロイ。ハルシネーション対策・バイアス軽減・透明性確保の仕組みが標準装備。</div>
                    </div>
                    <div className="fitem" style={{ borderLeftColor: 'var(--emerald)' }}>
                        <div className="fitem-t" style={{ color: 'var(--emerald)' }}>🔒 Secure（セキュア）</div>
                        <div className="fitem-d">CMEK（顧客管理暗号化キー）・VPC Service Controls・IAM による完全なデータ分離。顧客データをGoogleのAI学習に使用しない契約保証。</div>
                    </div>
                    <div className="fitem" style={{ borderLeftColor: 'var(--aqua)' }}>
                        <div className="fitem-t" style={{ color: 'var(--aqua)' }}>🔐 Private（プライベート）</div>
                        <div className="fitem-d">データ主権の保証。データ処理リージョンを指定可能。EU AI Act・GDPR・HIPAA 等の規制コンプライアンスに対応。</div>
                    </div>
                    <div className="fitem" style={{ borderLeftColor: 'var(--amber)' }}>
                        <div className="fitem-t" style={{ color: 'var(--amber)' }}>⚡ Reliable（信頼性）</div>
                        <div className="fitem-d">99.9%〜99.999% の SLA。グローバルな冗長インフラ。マルチリージョン展開で高可用性を実現。</div>
                    </div>
                    <div className="fitem" style={{ borderLeftColor: 'var(--violet)' }}>
                        <div className="fitem-t" style={{ color: 'var(--violet)' }}>📈 Scalable（スケーラブル）</div>
                        <div className="fitem-d">数百万の API リクエストを処理可能。TPU/GPU クラスタで大規模モデルのトレーニングと推論を柔軟にスケール。</div>
                    </div>
                </div>

                <div className="bp">
                    <div className="bpt">✅ 試験ポイント：「エンタープライズ対応」の意味</div>
                    <ul>
                        <li>エンタープライズ = 責任ある・安全・プライベート・信頼性高・スケーラブルの5要素を全て満たすこと</li>
                        <li>「顧客データを学習に使わない」というデータ主権は大企業が GCP を選ぶ最大の理由の一つ</li>
                        <li>コンプライアンス（規制対応）と AI 活用の両立ができる点が他社クラウドとの差別化要因</li>
                    </ul>
                </div>
            </div>

            {/* AI Optimized Infrastructure */}
            <div className="card">
                <div className="card-title">⚡ AI 最適化インフラストラクチャ（Hypercomputer）</div>
                <p style={{ fontSize: '14px', marginBottom: '16px' }}>
                    Google は AI ワークロードのために{' '}
                    <strong style={{ color: 'var(--aqua)' }}>Hypercomputer</strong>{' '}
                    という独自のコンピューティングアーキテクチャを開発。CPU・GPU・TPU・ネットワーク・ストレージを一体最適化した AI 専用基盤。
                </p>

                <table className="tbl">
                    <thead>
                        <tr>
                            <th>コンポーネント</th>
                            <th>特徴</th>
                            <th>AI での活用</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong style={{ color: 'var(--aqua)' }}>TPU（Tensor Processing Unit）</strong></td>
                            <td>Google が独自設計した AI 専用チップ。第6世代（Trillium = TPU v6）まで進化。行列演算を超高速化。</td>
                            <td>LLM の大規模学習・推論コストを GPU 比で大幅削減。Gemini の学習も TPU で実施。</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--aqua)' }}>GPU（NVIDIA A100/H100/H200）</strong></td>
                            <td>汎用的な高性能 GPU。幅広い AI フレームワーク（PyTorch/JAX/TF）に対応。</td>
                            <td>カスタムモデルのトレーニング・ファインチューニング・マルチモーダル推論に使用。</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--aqua)' }}>Jupiter ネットワーク</strong></td>
                            <td>データセンター内の超高速ネットワーク（Petabit スケール）。ノード間通信のボトルネックを排除。</td>
                            <td>大規模分散学習でのノード間通信を高速化。TPU ポッド間の効率的なデータ転送。</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--aqua)' }}>Pathways システム</strong></td>
                            <td>数千の TPU チップを単一の巨大モデルとして活用できる分散コンピューティングシステム。</td>
                            <td>Gemini Ultra のような超大規模マルチモーダルモデルを効率的に学習・推論する基盤。</td>
                        </tr>
                    </tbody>
                </table>

                <div className="info">
                    <div className="infot">📌 試験ポイント：Hypercomputer の位置づけ</div>
                    <p>
                        Hypercomputer は「GPU だけ・TPU だけ」ではなく、<strong style={{ color: 'var(--aqua)' }}>AI ワークロード全体を最適化するシステムアーキテクチャ</strong>。クラウドコンピューティング・カスタムチップ・高速ネットワーク・AI最適化ストレージを統合した概念として試験に出題される。
                    </p>
                </div>
            </div>

            {/* Open Approach */}
            <div className="card">
                <div className="card-title">🔓 Google Cloud のオープン戦略</div>

                <div className="fgrid">
                    <div className="fitem">
                        <div className="fitem-t">Gemma（オープンウェイトモデル）</div>
                        <div className="fitem-d">Apache 2.0 ライセンスで公開。自社インフラ・エッジデバイスで実行可能。ベンダーロックインを回避しながら Google の技術を活用できる。</div>
                    </div>
                    <div className="fitem">
                        <div className="fitem-t">Model Garden（マルチベンダー）</div>
                        <div className="fitem-d">Gemini に加え、Anthropic Claude・Meta Llama・Mistral AI など 200以上のモデルを提供。特定ベンダーに依存しない選択肢。</div>
                    </div>
                    <div className="fitem">
                        <div className="fitem-t">オープンスタンダード対応</div>
                        <div className="fitem-d">OpenAPI・gRPC・REST API での標準インターフェース。LangChain・LlamaIndex・Hugging Face との統合。オープンソースエコシステムとの互換性。</div>
                    </div>
                    <div className="fitem">
                        <div className="fitem-t">ADK（オープンソース）</div>
                        <div className="fitem-d">Agent Development Kit は OSS として公開。GCP に限らず任意のクラウドやオンプレで実行可能。GitHub から誰でも入手・改変できる。</div>
                    </div>
                </div>

                <div className="bp">
                    <div className="bpt">✅ 「オープン戦略」のビジネス価値</div>
                    <ul>
                        <li>ベンダーロックインの回避：特定 AI ベンダーへの依存を減らし、将来の移行コストを低減</li>
                        <li>既存スキルの活用：PyTorch・TensorFlow・LangChain など既存ツールを継続使用できる</li>
                        <li>エコシステムの拡大：オープンモデルを使う開発者コミュニティを Google Cloud に引き込む戦略</li>
                        <li>コンプライアンス：オープンウェイトモデルをオンプレミスで実行することでデータを外部に出さない運用が可能</li>
                    </ul>
                </div>
            </div>

            {/* Data Control */}
            <div className="card">
                <div className="card-title">🔑 データ管理とAI民主化</div>
                <div className="split">
                    <div className="sbox">
                        <div className="sbox-t" style={{ color: 'var(--sapphire)' }}>データ主権・ガバナンスの仕組み</div>
                        <ul>
                            <li>顧客データをGoogleのモデル学習に一切使用しない（契約保証）</li>
                            <li>CMEK：顧客が管理する暗号化キーでデータを保護</li>
                            <li>VPC Service Controls：リソース境界でデータ漏洩を防止</li>
                            <li>データ処理リージョンの指定で地理的な主権を確保</li>
                            <li>アクセスログ・監査ログで誰がいつどのデータを扱ったか追跡</li>
                        </ul>
                    </div>
                    <div className="sbox">
                        <div className="sbox-t" style={{ color: 'var(--emerald)' }}>AI 開発の民主化（全員が使えるように）</div>
                        <ul>
                            <li><strong style={{ color: 'var(--bright)' }}>ノーコード：</strong>Gemini for Workspace、NotebookLM など</li>
                            <li><strong style={{ color: 'var(--bright)' }}>ローコード：</strong>Vertex AI Studio、AutoML、Agent Designer</li>
                            <li><strong style={{ color: 'var(--bright)' }}>フルコード：</strong>Vertex AI API、ADK、Model Garden</li>
                            <li>事前学習済みモデルの API で即座に AI 機能を追加</li>
                            <li>プログラミング知識ゼロの業務担当者も Gems でカスタム AI を作成可能</li>
                        </ul>
                    </div>
                </div>
                <div className="src">
                    <div className="srct">📎 参照リソース</div>
                    <a href="https://cloud.google.com/ai" target="_blank" rel="noopener noreferrer">https://cloud.google.com/ai</a>
                    <a href="https://cloud.google.com/tpu/docs/intro-to-tpu" target="_blank" rel="noopener noreferrer">https://cloud.google.com/tpu/docs/intro-to-tpu</a>
                    <a href="https://cloud.google.com/blog/topics/systems/introducing-cloud-tpu-vms" target="_blank" rel="noopener noreferrer">https://cloud.google.com/blog/topics/systems/introducing-cloud-tpu-vms</a>
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
                <p>「すぐ使える（Out-of-the-box）」Gen AI サービス群。カスタム開発やコーディング不要で、ビジネスユーザーがそのまま業務に活用できる製品。試験では各サービスの対象ユーザーとユースケースの区別が問われる。</p>
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
                    Google の汎用 AI アシスタントアプリ。ブラウザ・iOS・Android から利用可能。テキスト・画像・音声・コードを理解し、会話形式で幅広いタスクを支援する。
                </div>
                <div className="fgrid">
                    <div className="fitem">
                        <div className="fitem-t">基本機能（Gemini app）</div>
                        <div className="fitem-d">文章作成・要約・翻訳・情報調査・コード生成・画像認識。Google 検索との統合でリアルタイム情報へのアクセス。</div>
                    </div>
                    <div className="fitem">
                        <div className="fitem-t">Gems（カスタム AI）</div>
                        <div className="fitem-d">システムインストラクションと知識をカスタマイズした「特化型 AI アシスタント」を作成・保存できる機能。コーディング不要。</div>
                    </div>
                    <div className="fitem">
                        <div className="fitem-t">Gemini Advanced</div>
                        <div className="fitem-d">Gemini Ultra モデルを使用。より複雑な推論・長文処理・高度なコード生成が可能。Google One AI Premium サブスクリプションで提供。</div>
                    </div>
                    <div className="fitem">
                        <div className="fitem-t">Deep Research</div>
                        <div className="fitem-d">ウェブを自律的に調査し、詳細なリサーチレポートを自動生成するエージェント機能。多段階の検索と合成を自動実行。</div>
                    </div>
                </div>
                <div className="tags">
                    <span className="tag t-blue">コーディング不要</span>
                    <span className="tag t-aqua">個人ユーザー</span>
                    <span className="tag t-green">マルチモーダル</span>
                    <span className="tag t-muted">Google検索統合</span>
                </div>

                <div className="warn">
                    <div className="warnt">⚠️ 試験頻出：Gems の定義</div>
                    <ul>
                        <li>Gems = カスタムシステムプロンプト + ナレッジを組み込んだ「専門家ペルソナ AI」</li>
                        <li>例：「マーケティング担当向け Gem」「法律文書レビュー Gem」「コードレビュー Gem」</li>
                        <li>Gems は Gemini app / Gemini Advanced で利用可能な機能。Gemini Enterprise の「カスタムエージェント」とは別物。</li>
                    </ul>
                </div>
            </div>

            {/* Gemini Enterprise */}
            <div className="pcard">
                <div className="pcard-head">
                    <div className="pcard-icon pi-aqua">🏢</div>
                    <div>
                        <div className="pcard-name">Gemini Enterprise</div>
                        <div className="pcard-type">大企業向け AI エージェントプラットフォーム</div>
                    </div>
                </div>
                <div className="pcard-desc">
                    組織全体で AI エージェントを安全にデプロイ・管理・ガバナンスするための企業向けプラットフォーム。Google 製エージェント（NotebookLM・Deep Research等）＋カスタムエージェント＋サードパーティエージェントを一元管理する「エージェントマーケットプレイス」。
                </div>

                <table className="tbl">
                    <thead>
                        <tr>
                            <th>機能</th>
                            <th>内容</th>
                            <th>ビジネス価値</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong style={{ color: 'var(--aqua)' }}>NotebookLM Enterprise</strong></td>
                            <td>企業内ドキュメント（PDF・URL・Google Docs 等）をソースにした AI 調査・要約ツール。Claude NotebookLM API として API 提供も可能。</td>
                            <td>社内ナレッジへの質問応答。ハルシネーション低減（ソース参照型）。新入社員のオンボーディング加速。</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--aqua)' }}>マルチモーダル検索</strong></td>
                            <td>テキスト・画像・動画・音声を横断した企業内横断検索。Google の検索品質を社内データに適用。</td>
                            <td>情報の発見可能性向上。従業員の情報探索時間を大幅短縮。</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--aqua)' }}>カスタムエージェント</strong></td>
                            <td>Agent Designer（ノーコード）または Vertex AI ADK（コード）で構築したカスタムエージェントをGemini Enterprise に登録・公開できる。</td>
                            <td>業務固有のタスク自動化。社員が1か所から全エージェントにアクセスできる統一体験。</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--aqua)' }}>ガバナンス・セキュリティ</strong></td>
                            <td>エージェントの利用状況の監査ログ・アクセス制御（IAM）・コンプライアンスレポート。</td>
                            <td>IT 部門がエージェントを集中管理。シャドー AI のリスクを排除。</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--aqua)' }}>Gemini Code Assist</strong></td>
                            <td>開発者向けコーディングエージェント。コード生成・説明・バグ修正・テスト生成を IDE から直接実行。</td>
                            <td>開発者の生産性向上（Google 調査で平均 20-30% 向上）。コードレビュー自動化。</td>
                        </tr>
                    </tbody>
                </table>
                <div className="tags">
                    <span className="tag t-aqua">Enterprise 向け</span>
                    <span className="tag t-blue">エージェント管理</span>
                    <span className="tag t-green">ガバナンス</span>
                    <span className="tag t-amber">コンプライアンス</span>
                    <span className="tag t-violet">ノーコード〜フルコード</span>
                </div>
                <div className="src">
                    <div className="srct">📎 参照リソース</div>
                    <a href="https://cloud.google.com/gemini-enterprise" target="_blank" rel="noopener noreferrer">https://cloud.google.com/gemini-enterprise</a>
                    <a href="https://notebooklm.google.com" target="_blank" rel="noopener noreferrer">https://notebooklm.google.com</a>
                </div>
            </div>

            {/* Gemini for Workspace */}
            <div className="pcard">
                <div className="pcard-head">
                    <div className="pcard-icon pi-emerald">📧</div>
                    <div>
                        <div className="pcard-name">Gemini for Google Workspace</div>
                        <div className="pcard-type">オフィスワーカー全員のための AI アシスタント</div>
                    </div>
                </div>
                <div className="pcard-desc">
                    Gmail・Docs・Sheets・Slides・Meet・Drive・Chat などの Google Workspace アプリに AI 機能を直接埋め込む。コードや新しいツールを学ばずに、既存のワークフローの中でAIを活用できる。
                </div>

                <div className="fgrid">
                    <div className="fitem">
                        <div className="fitem-t">📨 Gmail：スマート作成</div>
                        <div className="fitem-d">受信メールの要約・返信下書きの自動生成・トーン調整（丁寧に/簡潔に）。スレッド全体を要約して素早く内容を把握。</div>
                    </div>
                    <div className="fitem">
                        <div className="fitem-t">📝 Docs：文書作成支援</div>
                        <div className="fitem-d">プロンプトから文書ドラフト生成・文章の改善提案・文書の要約。長文リサーチレポートをゼロから生成。</div>
                    </div>
                    <div className="fitem">
                        <div className="fitem-t">📊 Sheets：データ分析</div>
                        <div className="fitem-d">自然言語で数式を生成（「売上の前月比を計算して」）。データから自動的に分析インサイトを抽出・視覚化。</div>
                    </div>
                    <div className="fitem">
                        <div className="fitem-t">🎨 Slides：プレゼン生成</div>
                        <div className="fitem-d">アウトラインからスライドを自動生成。画像生成（Imagen 統合）でビジュアルを自動挿入。デザインの自動提案。</div>
                    </div>
                    <div className="fitem">
                        <div className="fitem-t">🎥 Meet：会議 AI</div>
                        <div className="fitem-d">会議のリアルタイム字幕・要約・アクションアイテム自動抽出。遅刻者向けのキャッチアップ機能。</div>
                    </div>
                    <div className="fitem">
                        <div className="fitem-t">🔍 Drive：コンテンツ検索</div>
                        <div className="fitem-d">「先週の Q3 売上レポート」などの自然言語でファイルを検索。複数ファイルをまとめて要約・比較。</div>
                    </div>
                </div>

                <div className="bp">
                    <div className="bpt">✅ ビジネス導入のベストプラクティス</div>
                    <ul>
                        <li><strong>段階的展開：</strong>パイロット部門から開始し、成功事例を作ってから全社展開する</li>
                        <li><strong>プロンプト教育：</strong>社員向けのプロンプトライブラリを整備し、効果的な使い方を標準化する</li>
                        <li><strong>効果測定：</strong>会議時間短縮・メール作成時間削減などの KPI を設定して ROI を可視化する</li>
                        <li><strong>既存 IT との統合：</strong>Google Workspace が既存インフラなら追加投資最小でAI機能を追加できる大きなメリット</li>
                    </ul>
                </div>
                <div className="src">
                    <div className="srct">📎 参照リソース</div>
                    <a href="https://workspace.google.com/products/gemini/" target="_blank" rel="noopener noreferrer">https://workspace.google.com/products/gemini/</a>
                </div>
            </div>

            {/* Comparison */}
            <div className="card">
                <div className="card-title">📊 プリビルト Gen AI サービス 比較表（試験頻出）</div>
                <table className="tbl">
                    <thead>
                        <tr>
                            <th>サービス</th>
                            <th>主な対象ユーザー</th>
                            <th>核心価値</th>
                            <th>特徴的機能</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong style={{ color: 'var(--sapphire)' }}>Gemini app</strong></td>
                            <td>個人・ビジネスユーザー全般</td>
                            <td>汎用 AI アシスタント</td>
                            <td>Gems・マルチモーダル・Google 検索統合</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--sapphire)' }}>Gemini Advanced</strong></td>
                            <td>プロフェッショナル・高度ユーザー</td>
                            <td>Ultra モデルの高精度推論</td>
                            <td>Deep Research・長文処理・高精度コード生成</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--aqua)' }}>Gemini Enterprise</strong></td>
                            <td>大企業 IT 部門・経営層</td>
                            <td>エージェント管理・ガバナンス</td>
                            <td>NotebookLM API・カスタムエージェント・監査ログ</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--emerald)' }}>Gemini for Workspace</strong></td>
                            <td>オフィスワーカー全員</td>
                            <td>既存ツール内での AI 活用</td>
                            <td>Gmail/Docs/Sheets/Slides/Meet の AI 機能</td>
                        </tr>
                    </tbody>
                </table>
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
                <p>2.3 は「顧客向け（External Facing）」の Gen AI ソリューション。自社の顧客体験を向上させるためのサービス群。コールセンター・カスタマーサポート・EC サイト検索などを AI で強化する。</p>
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
                    Google の検索エンジン技術を企業のウェブサイト・社内ポータル・EC サイトに組み込めるマネージド検索サービス。非構造化データ（PDF・HTML・動画）も含む横断検索と、RAG（Retrieval Augmented Generation）による要約回答を提供する。
                </div>

                <div className="fgrid">
                    <div className="fitem">
                        <div className="fitem-t">🌐 外部向け検索（Website Search）</div>
                        <div className="fitem-d">企業の公開 Web サイトに Google 品質の検索を追加。クロール・インデックス・ランキングを全自動管理。検索 API 経由で Web サービスに埋め込み可能。</div>
                    </div>
                    <div className="fitem">
                        <div className="fitem-t">🏢 社内向け検索（Enterprise Search）</div>
                        <div className="fitem-d">Google Drive・BigQuery・Cloud Storage・外部データソースを横断した企業内検索。RAG 搭載で検索結果を要約した回答を生成。</div>
                    </div>
                    <div className="fitem">
                        <div className="fitem-t">🛒 コマース向け（Retail Search）</div>
                        <div className="fitem-d">EC サイト向け商品検索。ユーザーの意図を理解した意味的検索・パーソナライズドレコメンデーション。在庫状況・価格・レビューを考慮したランキング。</div>
                    </div>
                    <div className="fitem">
                        <div className="fitem-t">📋 プリビルト RAG</div>
                        <div className="fitem-d">ドキュメントをアップロードするだけで RAG 搭載の Q&amp;A アプリを構築できる。コード最小限でエンタープライズ RAG を実現する最速の方法。</div>
                    </div>
                </div>

                <div className="bp">
                    <div className="bpt">✅ Vertex AI Search 活用のベストプラクティス</div>
                    <ul>
                        <li>非構造化ドキュメント（PDF・Office ファイル等）を直接インデックス化できる点を最大活用する</li>
                        <li>検索結果の品質評価には Vertex AI Evaluation Service を使用し、KPI（NDCG・MRR等）で測定する</li>
                        <li>Google Search（一般向け検索）との違い：Vertex AI Search は企業固有データを対象とした API ベースのソリューション</li>
                    </ul>
                </div>
            </div>

            {/* Customer Engagement Suite */}
            <div className="pcard">
                <div className="pcard-head">
                    <div className="pcard-icon pi-amber">📞</div>
                    <div>
                        <div className="pcard-name">Customer Engagement Suite（CES）</div>
                        <div className="pcard-type">AI 搭載型コンタクトセンター・顧客サポートソリューション</div>
                    </div>
                </div>
                <div className="pcard-desc">
                    旧称「Contact Center AI（CCAI）」。コンタクトセンターを AI で強化するソリューション群。エンドツーエンドの顧客対応自動化から、人間のオペレーターへのリアルタイムサポートまでをカバーする。
                </div>

                <table className="tbl">
                    <thead>
                        <tr>
                            <th>コンポーネント</th>
                            <th>機能</th>
                            <th>ユースケース</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong style={{ color: 'var(--amber)' }}>Conversational Agents（旧 Dialogflow）</strong></td>
                            <td>ルールベース + Gen AI のハイブリッドチャットボット・音声ボット構築プラットフォーム。決定論的フロー（Flows）と LLM ジェネラティブ応答を組み合わせる。</td>
                            <td>24時間自動対応のサポートチャット・IVR（自動音声応答）・FAQ 自動回答</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--amber)' }}>Agent Assist</strong></td>
                            <td>人間のコールセンターオペレーターをリアルタイムに AI がサポート。会話に関連するナレッジ記事・推奨返答・次のアクションをリアルタイム表示。</td>
                            <td>オペレーター応答品質の向上・研修期間短縮・平均対応時間（AHT）削減</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--amber)' }}>Conversational Insights</strong></td>
                            <td>全通話・チャットログを AI で分析。顧客感情スコア・トピック分類・エージェントパフォーマンスを可視化するダッシュボード。</td>
                            <td>コンタクトセンター運営の改善・製品フィードバック分析・コンプライアンス監査</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--amber)' }}>CCAI Platform（CCaaS）</strong></td>
                            <td>フルマネージドのコンタクトセンター基盤。電話・チャット・メール・SNS を統合するオムニチャネル対応。AI 機能が最初から組み込まれた SaaS 型コンタクトセンター。</td>
                            <td>コンタクトセンターの新規立ち上げ・クラウド移行・インフラ管理の外部委託</td>
                        </tr>
                    </tbody>
                </table>

                {/* Architecture Flow */}
                <div className="arch">
                    <div className="arch-title">CES アーキテクチャの全体像</div>
                    <div className="arch-layers">
                        <div className="alayer">
                            <div className="alayer-dot" style={{ background: 'var(--emerald)' }} />
                            <div className="alayer-name">顧客チャネル層</div>
                            <div className="alayer-desc">電話・Web チャット・モバイルアプリ・SNS（オムニチャネル対応）</div>
                            <div className="alayer-tags">
                                <span className="alayer-tag" style={{ background: 'rgba(0, 229, 160, 0.1)', color: 'var(--emerald)' }}>PSTN</span>
                                <span className="alayer-tag" style={{ background: 'rgba(0, 229, 160, 0.1)', color: 'var(--emerald)' }}>WebRTC</span>
                                <span className="alayer-tag" style={{ background: 'rgba(0, 229, 160, 0.1)', color: 'var(--emerald)' }}>API</span>
                            </div>
                        </div>
                        <div className="alayer">
                            <div className="alayer-dot" style={{ background: 'var(--amber)' }} />
                            <div className="alayer-name">AI 自動化層</div>
                            <div className="alayer-desc">Conversational Agents で 70-80% の問い合わせを自動解決</div>
                            <div className="alayer-tags">
                                <span className="alayer-tag" style={{ background: 'rgba(255, 181, 0, 0.1)', color: 'var(--amber)' }}>Dialogflow</span>
                                <span className="alayer-tag" style={{ background: 'rgba(255, 181, 0, 0.1)', color: 'var(--amber)' }}>Gemini</span>
                                <span className="alayer-tag" style={{ background: 'rgba(255, 181, 0, 0.1)', color: 'var(--amber)' }}>TTS/STT</span>
                            </div>
                        </div>
                        <div className="alayer">
                            <div className="alayer-dot" style={{ background: 'var(--sapphire)' }} />
                            <div className="alayer-name">オペレーター支援層</div>
                            <div className="alayer-desc">Agent Assist で複雑な問い合わせに対応する人間オペレーターをリアルタイム AI サポート</div>
                            <div className="alayer-tags">
                                <span className="alayer-tag" style={{ background: 'rgba(61, 111, 255, 0.1)', color: 'var(--sapphire)' }}>Agent Assist</span>
                                <span className="alayer-tag" style={{ background: 'rgba(61, 111, 255, 0.1)', color: 'var(--sapphire)' }}>Knowledge Search</span>
                            </div>
                        </div>
                        <div className="alayer">
                            <div className="alayer-dot" style={{ background: 'var(--violet)' }} />
                            <div className="alayer-name">分析・改善層</div>
                            <div className="alayer-desc">Conversational Insights で全対話を分析・品質改善のインサイトを継続提供</div>
                            <div className="alayer-tags">
                                <span className="alayer-tag" style={{ background: 'rgba(167, 139, 250, 0.1)', color: 'var(--violet)' }}>Insights</span>
                                <span className="alayer-tag" style={{ background: 'rgba(167, 139, 250, 0.1)', color: 'var(--violet)' }}>BigQuery</span>
                                <span className="alayer-tag" style={{ background: 'rgba(167, 139, 250, 0.1)', color: 'var(--violet)' }}>Looker</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bp">
                    <div className="bpt">✅ CES 導入のベストプラクティス</div>
                    <ul>
                        <li><strong>段階導入：</strong>まず Conversational Agents でよくある FAQ を自動化し、解決率を測定してから Agent Assist を追加する</li>
                        <li><strong>HITL（Human-in-the-Loop）：</strong>AIが自信のない質問は自動的に人間にエスカレートする設計を必ず実装する</li>
                        <li><strong>感情分析の活用：</strong>Conversational Insights の感情スコアでクレーム顧客を早期発見し、対応品質を向上</li>
                        <li><strong>Knowledge Base 整備：</strong>Agent Assist の品質は社内ナレッジベースの質に比例。定期的な更新プロセスを確立する</li>
                    </ul>
                </div>
                <div className="src">
                    <div className="srct">📎 参照リソース</div>
                    <a href="https://cloud.google.com/solutions/customer-engagement-ai" target="_blank" rel="noopener noreferrer">https://cloud.google.com/solutions/customer-engagement-ai</a>
                    <a href="https://cloud.google.com/products/conversational-agents" target="_blank" rel="noopener noreferrer">https://cloud.google.com/products/conversational-agents</a>
                    <a href="https://cloud.google.com/enterprise-search" target="_blank" rel="noopener noreferrer">https://cloud.google.com/enterprise-search</a>
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

            {/* Vertex AI Overview */}
            <div className="card">
                <div className="card-title">🏗️ Vertex AI Platform の全体像</div>
                <p style={{ fontSize: '14px', marginBottom: '16px' }}>
                    Vertex AI は Google Cloud の<strong style={{ color: 'var(--aqua)' }}>統合 AI 開発プラットフォーム</strong>。モデルの選択→カスタマイズ→デプロイ→エージェント化→本番管理までの Gen AI ライフサイクル全体をカバー。
                </p>

                <div className="arch">
                    <div className="arch-title">Vertex AI Platform のコンポーネント体系</div>
                    <div className="arch-layers">
                        <div className="alayer">
                            <div className="alayer-dot" style={{ background: 'var(--sapphire)' }} />
                            <div className="alayer-name">モデル層</div>
                            <div className="alayer-desc">200以上のモデルを探索・選択・デプロイ</div>
                            <div className="alayer-tags">
                                <span className="alayer-tag" style={{ background: 'rgba(61, 111, 255, 0.1)', color: 'var(--sapphire)' }}>Model Garden</span>
                                <span className="alayer-tag" style={{ background: 'rgba(61, 111, 255, 0.1)', color: 'var(--sapphire)' }}>Gemini</span>
                                <span className="alayer-tag" style={{ background: 'rgba(61, 111, 255, 0.1)', color: 'var(--sapphire)' }}>Gemma</span>
                                <span className="alayer-tag" style={{ background: 'rgba(61, 111, 255, 0.1)', color: 'var(--sapphire)' }}>Claude</span>
                                <span className="alayer-tag" style={{ background: 'rgba(61, 111, 255, 0.1)', color: 'var(--sapphire)' }}>Llama</span>
                            </div>
                        </div>
                        <div className="alayer">
                            <div className="alayer-dot" style={{ background: 'var(--aqua)' }} />
                            <div className="alayer-name">開発ツール層</div>
                            <div className="alayer-desc">プロンプト設計・ファインチューニング・評価のための IDE</div>
                            <div className="alayer-tags">
                                <span className="alayer-tag" style={{ background: 'rgba(0, 200, 255, 0.1)', color: 'var(--aqua)' }}>Vertex AI Studio</span>
                                <span className="alayer-tag" style={{ background: 'rgba(0, 200, 255, 0.1)', color: 'var(--aqua)' }}>AutoML</span>
                                <span className="alayer-tag" style={{ background: 'rgba(0, 200, 255, 0.1)', color: 'var(--aqua)' }}>Colab Enterprise</span>
                            </div>
                        </div>
                        <div className="alayer">
                            <div className="alayer-dot" style={{ background: 'var(--emerald)' }} />
                            <div className="alayer-name">データ・検索層</div>
                            <div className="alayer-desc">RAG のためのデータストア・検索・グラウンディング</div>
                            <div className="alayer-tags">
                                <span className="alayer-tag" style={{ background: 'rgba(0, 229, 160, 0.1)', color: 'var(--emerald)' }}>Vertex AI Search</span>
                                <span className="alayer-tag" style={{ background: 'rgba(0, 229, 160, 0.1)', color: 'var(--emerald)' }}>RAG API</span>
                                <span className="alayer-tag" style={{ background: 'rgba(0, 229, 160, 0.1)', color: 'var(--emerald)' }}>Feature Store</span>
                            </div>
                        </div>
                        <div className="alayer">
                            <div className="alayer-dot" style={{ background: 'var(--amber)' }} />
                            <div className="alayer-name">エージェント層</div>
                            <div className="alayer-desc">AI エージェントの構築・デプロイ・スケール・ガバナンス</div>
                            <div className="alayer-tags">
                                <span className="alayer-tag" style={{ background: 'rgba(255, 181, 0, 0.1)', color: 'var(--amber)' }}>Agent Builder</span>
                                <span className="alayer-tag" style={{ background: 'rgba(255, 181, 0, 0.1)', color: 'var(--amber)' }}>ADK</span>
                                <span className="alayer-tag" style={{ background: 'rgba(255, 181, 0, 0.1)', color: 'var(--amber)' }}>Agent Engine</span>
                            </div>
                        </div>
                        <div className="alayer">
                            <div className="alayer-dot" style={{ background: 'var(--violet)' }} />
                            <div className="alayer-name">MLOps 層</div>
                            <div className="alayer-desc">本番モデルの監視・評価・バージョン管理・パイプライン</div>
                            <div className="alayer-tags">
                                <span className="alayer-tag" style={{ background: 'rgba(167, 139, 250, 0.1)', color: 'var(--violet)' }}>Model Registry</span>
                                <span className="alayer-tag" style={{ background: 'rgba(167, 139, 250, 0.1)', color: 'var(--violet)' }}>Pipelines</span>
                                <span className="alayer-tag" style={{ background: 'rgba(167, 139, 250, 0.1)', color: 'var(--violet)' }}>Evaluation</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Model Garden */}
            <div className="pcard">
                <div className="pcard-head">
                    <div className="pcard-icon pi-blue">🌳</div>
                    <div>
                        <div className="pcard-name">Model Garden</div>
                        <div className="pcard-type">200以上のモデルを一か所で探索・試用・デプロイ</div>
                    </div>
                </div>
                <div className="pcard-desc">
                    Vertex AI の「モデルカタログ」。Google 製モデル・サードパーティモデル・オープンソースモデルを一元管理。ビジネスニーズに最適なモデルを素早く選定し、API または専用エンドポイントで使い始められる。
                </div>
                <div className="fgrid">
                    <div className="fitem">
                        <div className="fitem-t">🔵 Google ファーストパーティ</div>
                        <div className="fitem-d">Gemini シリーズ（Ultra/Pro/Flash/Nano）・Imagen（画像）・Veo（動画）・Chirp（音声）・Code・MedLM（医療）</div>
                    </div>
                    <div className="fitem">
                        <div className="fitem-t">🤝 サードパーティ</div>
                        <div className="fitem-d">Anthropic Claude・Mistral AI・AI21 Labs など主要 AI ベンダーのモデル。Vertex AI の安全性・課金・IAM でまとめて管理。</div>
                    </div>
                    <div className="fitem">
                        <div className="fitem-t">🔓 オープンソース</div>
                        <div className="fitem-d">Meta Llama 3・Gemma・Falcon・MPT など。ファインチューニングして自社専用モデルを構築する出発点として使用。</div>
                    </div>
                    <div className="fitem">
                        <div className="fitem-t">⚡ 即座に試用可能</div>
                        <div className="fitem-d">コンソール上でモデルに直接プロンプトを入力して試せるプレイグラウンド付き。技術評価を素早く完了できる。</div>
                    </div>
                </div>
            </div>

            {/* AutoML */}
            <div className="pcard">
                <div className="pcard-head">
                    <div className="pcard-icon pi-aqua">🤖</div>
                    <div>
                        <div className="pcard-name">AutoML</div>
                        <div className="pcard-type">ノーコード・ローコードのカスタムモデル構築</div>
                    </div>
                </div>
                <div className="pcard-desc">
                    ML の専門知識なしに、自社データからカスタム ML モデルを構築できる自動機械学習ツール。データをアップロードして「学習開始」するだけで、Google が最適なアーキテクチャを自動選択・チューニング。
                </div>
                <table className="tbl">
                    <thead>
                        <tr>
                            <th>タイプ</th>
                            <th>対応タスク</th>
                            <th>代表ユースケース</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>AutoML Vision</strong></td>
                            <td>画像分類・物体検出・セグメンテーション</td>
                            <td>製品不良品検出・医療画像診断・棚卸し自動化</td>
                        </tr>
                        <tr>
                            <td><strong>AutoML Natural Language</strong></td>
                            <td>テキスト分類・感情分析・エンティティ抽出</td>
                            <td>サポートチケット自動分類・レビュー感情分析</td>
                        </tr>
                        <tr>
                            <td><strong>AutoML Tables</strong></td>
                            <td>表形式データの分類・回帰・予測</td>
                            <td>顧客チャーン予測・在庫需要予測・与信判断</td>
                        </tr>
                        <tr>
                            <td><strong>AutoML Video</strong></td>
                            <td>動画分類・物体追跡・アクション認識</td>
                            <td>セキュリティ映像分析・スポーツ分析</td>
                        </tr>
                    </tbody>
                </table>

                <div className="warn">
                    <div className="warnt">⚠️ AutoML vs カスタムモデル（試験頻出の使い分け）</div>
                    <ul>
                        <li><strong style={{ color: 'var(--bright)' }}>AutoML を選ぶ場合：</strong>ML エンジニアがいない・迅速に結果が必要・標準的なタスク（分類・回帰）で十分</li>
                        <li><strong style={{ color: 'var(--bright)' }}>カスタムモデルを選ぶ場合：</strong>高度な制御が必要・固有のアーキテクチャが必要・大規模データで精度を最大化したい</li>
                        <li>AutoML はデータをアップロードするだけで GPU インフラ管理不要。ML 専門家なしでも結果を出せる「民主化」ツール。</li>
                    </ul>
                </div>
            </div>

            {/* RAG Offerings */}
            <div className="pcard">
                <div className="pcard-head">
                    <div className="pcard-icon pi-violet">🔗</div>
                    <div>
                        <div className="pcard-name">Google Cloud の RAG オファリング</div>
                        <div className="pcard-type">3つのレベルで選べるRAG（検索拡張生成）実装方法</div>
                    </div>
                </div>
                <div className="pcard-desc">
                    RAG（Retrieval-Augmented Generation）= LLM の回答を外部知識ベースに基づかせることでハルシネーションを低減し、最新・企業固有情報を回答に反映する技術。Google Cloud は難易度と制御度に応じた3レベルを提供。
                </div>

                <div className="flow">
                    <div className="fstep">
                        <div className="fnum" style={{ background: 'rgba(0, 229, 160, 0.12)', borderColor: 'rgba(0, 229, 160, 0.35)', color: 'var(--emerald)' }}>①</div>
                        <div className="fbody">
                            <strong>プリビルト RAG（Vertex AI Search）— 最も簡単</strong>
                            <p>
                                ドキュメントをアップロードするだけで RAG 機能付き検索 API が完成。チャンキング・エンベディング・ベクター検索・LLM 回答生成を全自動。<br />
                                <strong style={{ color: 'var(--emerald)' }}>推奨場面：</strong>プロトタイプ・PoC・技術スタックの素早い検証・ML エンジニアが少ないチーム
                            </p>
                        </div>
                    </div>
                    <div className="fstep">
                        <div className="fnum" style={{ background: 'rgba(61, 111, 255, 0.12)', borderColor: 'rgba(61, 111, 255, 0.35)', color: 'var(--sapphire)' }}>②</div>
                        <div className="fbody">
                            <strong>RAG API（Vertex AI RAG Engine）— カスタム制御</strong>
                            <p>
                                RAG パイプラインの各ステップ（チャンキング戦略・埋め込みモデル選択・リランキング）を API 経由でカスタマイズ。プリビルトより細かい制御が可能。<br />
                                <strong style={{ color: 'var(--sapphire)' }}>推奨場面：</strong>特定のチャンキング戦略が必要・複数データソースを動的に切り替えたい・高度な再ランキングが必要
                            </p>
                        </div>
                    </div>
                    <div className="fstep">
                        <div className="fnum" style={{ background: 'rgba(255, 181, 0, 0.12)', borderColor: 'rgba(255, 181, 0, 0.35)', color: 'var(--amber)' }}>③</div>
                        <div className="fbody">
                            <strong>Grounding with Google Search — リアルタイム世界知識</strong>
                            <p>
                                Google のリアルタイム Web インデックスを LLM の回答に注入。知識カットオフ問題を解決し、常に最新情報を提供。API 1行の設定で有効化。<br />
                                <strong style={{ color: 'var(--amber)' }}>推奨場面：</strong>最新ニュース・株価・時事情報が必要・LLMの知識カットオフが問題になる
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bp">
                    <div className="bpt">✅ RAG 選択のフレームワーク</div>
                    <ul>
                        <li><strong>企業内データ（静的）+ 速度重視</strong> → プリビルト RAG（Vertex AI Search）</li>
                        <li><strong>企業内データ（動的）+ 精度重視</strong> → RAG API で細かくチューニング</li>
                        <li><strong>一般的な世界知識 + 最新性重視</strong> → Grounding with Google Search</li>
                        <li><strong>三者の組み合わせ</strong> → エンタープライズアプリでは状況に応じてハイブリッドで使うのが最善</li>
                    </ul>
                </div>
            </div>

            {/* Vertex AI Agent Builder */}
            <div className="pcard">
                <div className="pcard-head">
                    <div className="pcard-icon pi-amber">🤖</div>
                    <div>
                        <div className="pcard-name">Vertex AI Agent Builder</div>
                        <div className="pcard-type">エンタープライズ AI エージェントの構築・デプロイ・スケール統合プラットフォーム</div>
                    </div>
                </div>
                <div className="pcard-desc">
                    AI エージェントの設計から本番運用まで全体をカバーする統合プラットフォーム。ノーコードのビジュアルデザイナーからフルコードの SDK まで対応。Agent Development Kit（ADK）・Agent Engine・Agent Designer の3コンポーネントで構成。
                </div>

                <div className="fgrid">
                    <div className="fitem" style={{ borderLeftColor: 'var(--emerald)' }}>
                        <div className="fitem-t" style={{ color: 'var(--emerald)' }}>🎨 Agent Designer（ローコード）</div>
                        <div className="fitem-d">ビジュアルインターフェースでエージェントの目標・ツール・動作を定義。プログラミング知識がなくてもエージェントのプロトタイプを作成できる。</div>
                    </div>
                    <div className="fitem" style={{ borderLeftColor: 'var(--sapphire)' }}>
                        <div className="fitem-t" style={{ color: 'var(--sapphire)' }}>⚙️ Agent Development Kit（ADK）</div>
                        <div className="fitem-d">Python・TypeScript 対応のオープンソース SDK。マルチエージェントシステム・ツール統合・メモリ管理・双方向音声ストリーミングを実装できる。ADK は7百万回以上ダウンロードされた実績。</div>
                    </div>
                    <div className="fitem" style={{ borderLeftColor: 'var(--amber)' }}>
                        <div className="fitem-t" style={{ color: 'var(--amber)' }}>🚀 Agent Engine（マネージドランタイム）</div>
                        <div className="fitem-d">本番エージェントのデプロイ・スケール・監視基盤。セッション管理・長期メモリ（Memory Bank）・オブザーバビリティ（トレース・ログ）・評価ツールを提供。</div>
                    </div>
                    <div className="fitem" style={{ borderLeftColor: 'var(--violet)' }}>
                        <div className="fitem-t" style={{ color: 'var(--violet)' }}>🛡️ セキュリティ・ガバナンス</div>
                        <div className="fitem-d">Model Armor（プロンプトインジェクション対策）・IAM ベースのエージェント ID・Security Command Center との統合。エンタープライズグレードの安全性。</div>
                    </div>
                </div>

                <div className="warn">
                    <div className="warnt">⚠️ 試験頻出：Vertex AI Studio vs Google AI Studio</div>
                    <ul>
                        <li><strong style={{ color: 'var(--bright)' }}>Vertex AI Studio</strong>：エンタープライズ向け。Vertex AI プラットフォーム上で動作。本番デプロイ・VPC 統合・IAM・監査ログ対応。大企業の本番環境に最適。費用は使用量課金。</li>
                        <li><strong style={{ color: 'var(--bright)' }}>Google AI Studio</strong>：開発者・PoC 向け。gemini.google.com の開発者版。無料枠あり・API キーで即座にアクセス可能。PoC・学習・プロトタイプに最適。</li>
                        <li><strong style={{ color: 'var(--amber)' }}>使い分けのルール：</strong>テストは Google AI Studio → 本番は Vertex AI Studio への移行が推奨パス</li>
                    </ul>
                </div>

                <div className="src">
                    <div className="srct">📎 参照リソース</div>
                    <a href="https://cloud.google.com/vertex-ai" target="_blank" rel="noopener noreferrer">https://cloud.google.com/vertex-ai</a>
                    <a href="https://cloud.google.com/products/agent-builder" target="_blank" rel="noopener noreferrer">https://cloud.google.com/products/agent-builder</a>
                    <a href="https://cloud.google.com/model-garden" target="_blank" rel="noopener noreferrer">https://cloud.google.com/model-garden</a>
                    <a href="https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/overview" target="_blank" rel="noopener noreferrer">https://cloud.google.com/vertex-ai/generative-ai/docs/grounding/overview</a>
                </div>
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

            {/* Agent Tools */}
            <div className="card">
                <div className="card-title">🔧 AI エージェントが使う4種類のツール</div>
                <p style={{ fontSize: '14px', marginBottom: '16px' }}>
                    エージェントは単体では「考える」だけ。<strong style={{ color: 'var(--aqua)' }}>ツール</strong>を通じて外部環境（API・DB・ファイル等）と連携して初めて「行動」できる。ツールの選択がエージェント設計の核心。
                </p>

                <div className="fgrid">
                    <div className="fitem" style={{ borderLeftColor: 'var(--sapphire)' }}>
                        <div className="fitem-t" style={{ color: 'var(--sapphire)' }}>📡 Extensions（拡張機能）</div>
                        <div className="fitem-d">
                            Google が提供する既製ツール。Google Search・Google Maps・Gmail・Calendar などに直接アクセスできる。設定するだけで使える最も簡単なツール統合方法。<br />
                            <span style={{ fontSize: '11px', color: 'var(--muted)' }}>例：「今日の東京の天気は？」→ 拡張機能が Google 検索を呼び出してリアルタイムデータを取得</span>
                        </div>
                    </div>
                    <div className="fitem" style={{ borderLeftColor: 'var(--aqua)' }}>
                        <div className="fitem-t" style={{ color: 'var(--aqua)' }}>⚙️ Functions（関数）</div>
                        <div className="fitem-d">
                            開発者が定義した任意のカスタム関数。Cloud Functions・Cloud Run・外部 API 等を呼び出す。Function Calling（Gemini の機能）でモデルが自律的に関数を選択・実行する。<br />
                            <span style={{ fontSize: '11px', color: 'var(--muted)' }}>例：「在庫を確認して」→ Agents が在庫 API 関数を自動選択して呼び出し</span>
                        </div>
                    </div>
                    <div className="fitem" style={{ borderLeftColor: 'var(--emerald)' }}>
                        <div className="fitem-t" style={{ color: 'var(--emerald)' }}>🗄️ Data Stores（データストア）</div>
                        <div className="fitem-d">
                            RAG のためのベクターデータベース・ドキュメントストア・構造化 DB への接続。Cloud Storage・BigQuery・Firestore・ウェブサイト等のコンテンツを参照して LLM の回答を補完する。<br />
                            <span style={{ fontSize: '11px', color: 'var(--muted)' }}>例：「製品マニュアルを参照して返答を生成」→ Data Store から関連チャンクを検索して LLM に提供</span>
                        </div>
                    </div>
                    <div className="fitem" style={{ borderLeftColor: 'var(--amber)' }}>
                        <div className="fitem-t" style={{ color: 'var(--amber)' }}>🧩 Plugins（プラグイン）</div>
                        <div className="fitem-d">
                            OpenAPI 仕様（Swagger）に基づく外部サービス連携。Salesforce・SAP・Jira・ServiceNow などのエンタープライズ SaaS を標準インターフェースで接続。<br />
                            <span style={{ fontSize: '11px', color: 'var(--muted)' }}>例：「Salesforce の案件を更新して」→ OpenAPI Plugin 経由でSalesforce CRM を操作</span>
                        </div>
                    </div>
                </div>

                <div className="bp">
                    <div className="bpt">✅ ツール選択の判断基準</div>
                    <ul>
                        <li><strong>Google サービスへの接続 + 素早く実装</strong> → Extensions</li>
                        <li><strong>自社 API・カスタムロジック</strong> → Functions（Cloud Run / Cloud Functions で実装）</li>
                        <li><strong>企業内ドキュメント・RAG</strong> → Data Stores（Vertex AI Search と組み合わせ）</li>
                        <li><strong>外部 SaaS（Salesforce・SAP等）</strong> → Plugins（OpenAPI仕様があれば簡単に接続）</li>
                    </ul>
                </div>
            </div>

            {/* Google Cloud AI APIs */}
            <div className="card">
                <div className="card-title">🌐 エージェントで活用できる主要 Google Cloud AI API</div>
                <p style={{ fontSize: '14px', marginBottom: '16px' }}>
                    以下の API はエージェントのツールとして Functions または Extensions 経由で呼び出せる。試験では各 API の用途を識別できることが求められる。
                </p>

                <table className="tbl">
                    <thead>
                        <tr>
                            <th>API</th>
                            <th>機能</th>
                            <th>エージェントでの活用例</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong style={{ color: 'var(--aqua)' }}>Speech-to-Text API</strong></td>
                            <td>125言語対応の音声認識・文字起こし。リアルタイム・バッチ処理両対応。</td>
                            <td>音声コマンドをエージェントへの指示として変換。コールセンター通話を文字起こし。</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--aqua)' }}>Text-to-Speech API</strong></td>
                            <td>40言語・220以上の音声で自然な音声合成（TTS）。感情・速度・ピッチを制御可能。</td>
                            <td>エージェントのテキスト回答を音声で出力。音声 IVR・アクセシビリティ対応。</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--aqua)' }}>Translation API</strong></td>
                            <td>130以上の言語間のニューラル機械翻訳。リアルタイムかつバッチ翻訳に対応。</td>
                            <td>多言語顧客対応エージェント。グローバルコンテンツの自動翻訳ワークフロー。</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--aqua)' }}>Document AI API</strong></td>
                            <td>PDF・画像からの OCR・データ抽出。請求書・契約書・免許証等の構造化データ化。</td>
                            <td>請求書処理自動化エージェント。契約書のキーターム自動抽出。</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--aqua)' }}>Cloud Vision API</strong></td>
                            <td>画像内のオブジェクト検出・ラベル付け・テキスト認識（OCR）・顔検出・感情分析。</td>
                            <td>商品画像自動タグ付けエージェント。写真からの情報抽出。</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--aqua)' }}>Video Intelligence API</strong></td>
                            <td>動画内のシーン検出・物体追跡・テキスト認識・コンテンツ適正評価。</td>
                            <td>動画コンテンツの自動分類・不適切コンテンツ検出。監視映像の分析。</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--aqua)' }}>Natural Language API</strong></td>
                            <td>感情分析・エンティティ認識・テキスト分類・構文解析をすぐ使える事前学習済み API。</td>
                            <td>ユーザーフィードバックの自動感情分析。サポートチケットの優先度自動分類。</td>
                        </tr>
                    </tbody>
                </table>

                <div className="info">
                    <div className="infot">📌 試験ポイント：Document Translation API</div>
                    <p>
                        Translation API がテキストを翻訳するのに対し、<strong style={{ color: 'var(--aqua)' }}>Document Translation API</strong> は PDF・Word・HTML などのドキュメントを<strong>フォーマット（レイアウト・書式）を保ったまま</strong>翻訳する。多国籍企業の社内文書翻訳自動化に活用。
                    </p>
                </div>
            </div>

            {/* Studio Comparison */}
            <div className="card">
                <div className="card-title">⚖️ Vertex AI Studio vs Google AI Studio — 完全比較（試験最頻出）</div>
                <table className="tbl">
                    <thead>
                        <tr>
                            <th>比較軸</th>
                            <th>Vertex AI Studio</th>
                            <th>Google AI Studio</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>対象ユーザー</strong></td>
                            <td>大企業・エンタープライズ開発者</td>
                            <td>個人開発者・研究者・PoC チーム</td>
                        </tr>
                        <tr>
                            <td><strong>動作基盤</strong></td>
                            <td>Vertex AI Platform（GCP プロジェクト内）</td>
                            <td>Google AI（aistudio.google.com）</td>
                        </tr>
                        <tr>
                            <td><strong>セキュリティ</strong></td>
                            <td>VPC 統合・IAM・CMEK・監査ログ・DLP 統合</td>
                            <td>標準的な Google アカウント認証</td>
                        </tr>
                        <tr>
                            <td><strong>本番デプロイ</strong></td>
                            <td>Vertex AI Endpoints に直接デプロイ可能</td>
                            <td>API キーを Vertex AI に移行して本番化</td>
                        </tr>
                        <tr>
                            <td><strong>費用</strong></td>
                            <td>トークン課金（プロジェクト請求）</td>
                            <td>無料枠あり・超過後は課金</td>
                        </tr>
                        <tr>
                            <td><strong>モデルアクセス</strong></td>
                            <td>Gemini 全バージョン + Model Garden 全モデル</td>
                            <td>Gemini シリーズ</td>
                        </tr>
                        <tr>
                            <td><strong>推奨場面</strong></td>
                            <td>本番 AI アプリ・エンタープライズ要件・コンプライアンス必須</td>
                            <td>PoC・学習・アイデア検証・個人プロジェクト</td>
                        </tr>
                    </tbody>
                </table>
                <div className="src">
                    <div className="srct">📎 参照リソース</div>
                    <a href="https://cloud.google.com/products/agent-builder" target="_blank" rel="noopener noreferrer">https://cloud.google.com/products/agent-builder</a>
                    <a href="https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/function-calling" target="_blank" rel="noopener noreferrer">https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/function-calling</a>
                    <a href="https://aistudio.google.com" target="_blank" rel="noopener noreferrer">https://aistudio.google.com</a>
                    <a href="https://cloud.google.com/natural-language/docs" target="_blank" rel="noopener noreferrer">https://cloud.google.com/natural-language/docs</a>
                    <a href="https://cloud.google.com/document-ai/docs" target="_blank" rel="noopener noreferrer">https://cloud.google.com/document-ai/docs</a>
                </div>
            </div>
        </section>
    );
}

/* ── Summary Section ── */
function SummarySection() {
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
                <hr className="sdiv" />
                <Section22 />
                <hr className="sdiv" />
                <Section23 />
                <hr className="sdiv" />
                <Section24 />
                <hr className="sdiv" />
                <Section25 />
                <hr className="sdiv" />
                <SummarySection />
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
