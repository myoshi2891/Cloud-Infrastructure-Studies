export default function Section24() {
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
