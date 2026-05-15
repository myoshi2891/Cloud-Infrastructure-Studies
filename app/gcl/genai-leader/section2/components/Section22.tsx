export default function Section22() {
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
