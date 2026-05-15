/**
 * Renders the "2.3 顧客体験向上ソリューション（Customer Engagement Suite）" section with static explanatory UI.
 *
 * The section includes an introductory note, a Vertex AI Search card (features, use cases, best practices),
 * and a Customer Engagement Suite (CES) card with component table, architecture layers, best practices, and reference links.
 *
 * @returns A React element containing the complete static section markup for the Customer Engagement Suite content.
 */
export default function Section23() {
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
