export default function Section25() {
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
