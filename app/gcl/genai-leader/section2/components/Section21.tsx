export default function Section21() {
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
