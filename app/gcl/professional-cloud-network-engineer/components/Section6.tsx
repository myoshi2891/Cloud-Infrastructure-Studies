import React from 'react';
import sharedStyles from './SharedSection.module.css';

/**
 * Render the "Section 6" content block describing Network Monitoring and Troubleshooting for the PCNE guide.
 */
export function Section6() {
    return (
        <section className={sharedStyles.section} id="s6" aria-labelledby="s6-title">
            <div className={sharedStyles.sectionLabel}>Section 6 (~10%)</div>
            <h2
                className={sharedStyles.sectionTitle}
                id="s6-title"
                style={{ color: 'var(--color-theme-genai-fg)' }}
            >
                ネットワーク監視・トラブルシューティング
            </h2>
            <p className={sharedStyles.sectionDesc}>
                約10%を占めるセクション。Network Intelligence Centerの5ツール、VPC Flow Logs、Packet
                Mirroringの使い方と使い分けが問われる。
            </p>
            <div className={sharedStyles.divider}></div>

            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">📡</span> 6.1 Network Intelligence Center ─
                    5つの診断ツール
                </h3>
                <div className={sharedStyles.cardGrid}>
                    <div className={sharedStyles.card}>
                        <div className={sharedStyles.cardIcon}>🔌</div>
                        <div className={sharedStyles.cardTitle}>Connectivity Tests</div>
                        <div className={sharedStyles.cardBody}>
                            2点間の接続性を<strong>仮想的なパケットトレース</strong>
                            で分析。FW・ルート・NATの問題を即特定。実際にパケットを送らないのがポイント。
                        </div>
                    </div>
                    <div className={sharedStyles.card}>
                        <div className={sharedStyles.cardIcon}>📊</div>
                        <div className={sharedStyles.cardTitle}>Performance Dashboard</div>
                        <div className={sharedStyles.cardBody}>
                            ゾーン間・リージョン間のレイテンシ・パケット損失をリアルタイム表示。Googleの基準値との比較も可能。
                        </div>
                    </div>
                    <div className={sharedStyles.card}>
                        <div className={sharedStyles.cardIcon}>🔎</div>
                        <div className={sharedStyles.cardTitle}>Firewall Insights</div>
                        <div className={sharedStyles.cardBody}>
                            使われていないFWルールを検出。Shadow
                            Rules（上位ルールに隠れているルール）の発見。過剰権限の整理に活用。
                        </div>
                    </div>
                    <div className={sharedStyles.card}>
                        <div className={sharedStyles.cardIcon}>🌐</div>
                        <div className={sharedStyles.cardTitle}>Network Topology</div>
                        <div className={sharedStyles.cardBody}>
                            VPC・サブネット・VMの接続関係を可視化。トラフィックフロー・帯域使用量を直感的に把握できる。
                        </div>
                    </div>
                    <div className={sharedStyles.card}>
                        <div className={sharedStyles.cardIcon}>⚙️</div>
                        <div className={sharedStyles.cardTitle}>Network Analyzer</div>
                        <div className={sharedStyles.cardBody}>
                            VPCネットワーク設定を自動分析。問題点・ベストプラクティス違反を自動検出し、改善推奨を提示。
                        </div>
                    </div>
                </div>
            </div>

            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🔍</span> 6.2 VPC Flow Logs・FWログ・Packet Mirroring ─
                    使い分け
                </h3>
                <div className={`table-wrapper ${sharedStyles.tableWrapperMt}`}>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">ツール</th>
                                <th scope="col">何を記録するか</th>
                                <th scope="col">主な用途</th>
                                <th scope="col">コスト</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={sharedStyles.tdName}>VPC Flow Logs</td>
                                <td>
                                    サブネット内の全トラフィック（サンプリング）
                                    <br />
                                    src/dst IP・ポート・バイト数
                                </td>
                                <td>セキュリティ監査・コスト分析・コンプライアンス</td>
                                <td>サンプリングレートと容量に比例</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>FWルールログ</td>
                                <td>FWルールに一致したトラフィックのALLOW/DENY</td>
                                <td>FWデバッグ・セキュリティ侵害調査</td>
                                <td>ルールごとに有効化</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>Packet Mirroring</td>
                                <td>対象VMの全パケット内容（コピー）</td>
                                <td>IDS・深層パケット検査・詳細デバッグ</td>
                                <td>高（全パケットコピー）</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="code-block mt-6">
                    <div className="code-line">
                        <span className="cm"># VPC Flow Logsの有効化（サブネット単位）</span>
                    </div>
                    <div className="code-line">
                        gcloud compute networks subnets update{' '}
                        <span className="str">my-subnet</span> \
                    </div>
                    <div className="code-line"> --enable-flow-logs \</div>
                    <div className="code-line">
                        {' '}
                        --logging-aggregation-interval=INTERVAL_5_SEC \
                    </div>
                    <div className="code-line">
                        {' '}
                        --logging-flow-sampling=0.5 \ <span className="cm"># 50%サンプリング</span>
                    </div>
                    <div className="code-line"> --logging-metadata=INCLUDE_ALL_METADATA \</div>
                    <div className="code-line"> --region=us-central1</div>
                </div>

                <h4>トラブルシューティング手順（試験頻出）</h4>
                <div className={sharedStyles.flowSteps}>
                    <div className={sharedStyles.flowStep}>
                        <div
                            className={sharedStyles.flowStepNum}
                            style={{
                                background: 'var(--color-theme-genai-bg)',
                                color: 'var(--color-theme-genai-fg)',
                                borderColor: 'rgba(255, 209, 102, 0.3)',
                            }}
                        >
                            1
                        </div>
                        <div className={sharedStyles.flowStepContent}>
                            <div className={sharedStyles.flowStepTitle}>
                                Connectivity Testで問題箇所を絞り込む
                            </div>
                            <div className={sharedStyles.flowStepBody}>
                                仮想パケットトレースでFW・ルーティング・NATのどこで問題が発生しているか確認する。
                            </div>
                        </div>
                    </div>
                    <div className={sharedStyles.flowStep}>
                        <div
                            className={sharedStyles.flowStepNum}
                            style={{
                                background: 'var(--color-theme-genai-bg)',
                                color: 'var(--color-theme-genai-fg)',
                                borderColor: 'rgba(255, 209, 102, 0.3)',
                            }}
                        >
                            2
                        </div>
                        <div className={sharedStyles.flowStepContent}>
                            <div className={sharedStyles.flowStepTitle}>
                                FWルールを確認（ログを参照）
                            </div>
                            <div className={sharedStyles.flowStepBody}>
                                送信元/宛先のIP・ポートが許可されているか確認。暗黙のDENYに引っかかっていないかを確認。
                            </div>
                        </div>
                    </div>
                    <div className={sharedStyles.flowStep}>
                        <div
                            className={sharedStyles.flowStepNum}
                            style={{
                                background: 'var(--color-theme-genai-bg)',
                                color: 'var(--color-theme-genai-fg)',
                                borderColor: 'rgba(255, 209, 102, 0.3)',
                            }}
                        >
                            3
                        </div>
                        <div className={sharedStyles.flowStepContent}>
                            <div className={sharedStyles.flowStepTitle}>ルーティングを確認</div>
                            <div className={sharedStyles.flowStepBody}>
                                正しいネクストホップにルートが設定されているか確認。VPN/Interconnectトンネルがアップか、BGPセッションが確立しているかを確認。
                            </div>
                        </div>
                    </div>
                    <div className={sharedStyles.flowStep}>
                        <div
                            className={sharedStyles.flowStepNum}
                            style={{
                                background: 'var(--color-theme-genai-bg)',
                                color: 'var(--color-theme-genai-fg)',
                                borderColor: 'rgba(255, 209, 102, 0.3)',
                            }}
                        >
                            4
                        </div>
                        <div className={sharedStyles.flowStepContent}>
                            <div className={sharedStyles.flowStepTitle}>
                                アプリケーション側を確認
                            </div>
                            <div className={sharedStyles.flowStepBody}>
                                サービスが起動しているか、正しいポートでリスニングしているか、ヘルスチェックを通過しているかを確認。
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
