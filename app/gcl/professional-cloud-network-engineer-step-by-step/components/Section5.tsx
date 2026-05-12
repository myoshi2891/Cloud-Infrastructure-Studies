import React from 'react';
import sharedStyles from './SharedSection.module.css';

/**
 * Renders the Section 5 content covering Network Operations, Monitoring, and Troubleshooting.
 *
 * @returns The React element for Section 5 of the step-by-step guide
 */
export function Section5() {
    return (
        <section className={sharedStyles.section} id="s5" aria-labelledby="s5-title">
            <div className={sharedStyles.sectionLabel}>Section 5 (14%)</div>
            <h2 className={sharedStyles.sectionTitle} id="s5-title" style={{ color: 'var(--color-primary)' }}>
                ネットワーク運用、監視、トラブルシューティング
            </h2>
            <p className={sharedStyles.sectionDesc}>
                Google Cloud Observabilityを活用したネットワーク監視、Network Intelligence Centerによる診断・トラブルシューティング、VPN/Interconnect/BGPの問題解決が問われる。
            </p>
            <div className={sharedStyles.divider}></div>

            {/* 5.1 ロギングとモニタリング（Cloud Observability） */}
            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">📊</span> 5.1 ロギングとモニタリング（Cloud Observability）
                </h3>
                <p>
                    ネットワークコンポーネントのログとメトリクスを適切に設定・活用することで、障害の早期発見と根本原因分析を実現する。各サービスの主要なメトリクスを把握することが重要。
                </p>

                <div className={`table-wrapper ${sharedStyles.tableWrapperMt}`}>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">サービス</th>
                                <th scope="col">主要ログ/メトリクス</th>
                                <th scope="col">用途</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={sharedStyles.tdName}>VPC Flow Logs</td>
                                <td>5タプル情報（送信元/宛先IP・ポート・プロトコル）、バイト数、パケット数</td>
                                <td>トラフィック分析、セキュリティ監査、コスト最適化</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>Cloud VPN</td>
                                <td>トンネル状態、パケット数、転送バイト数</td>
                                <td>VPN障害の早期検知、帯域監視</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>Cloud Router</td>
                                <td>BGPセッション状態、広報/受信ルート数</td>
                                <td>BGP障害検知、ルートクォータ監視</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>Cloud Interconnect</td>
                                <td>リンク状態、受信/送信ビットレート、パケットドロップ</td>
                                <td>物理リンク障害検知、帯域利用率監視</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>Cloud NAT</td>
                                <td>ポート使用量、ドロップパケット数、NAT割り当てエラー</td>
                                <td>ポート枯渇の早期警告</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>Cloud DNS</td>
                                <td>クエリログ、応答コード、レイテンシ</td>
                                <td>名前解決の問題調査、セキュリティ分析</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>Cloud Armor</td>
                                <td>リクエスト数、ブロック数、ルール別統計</td>
                                <td>DDoS攻撃の検知、WAFルールの最適化</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h4 className={sharedStyles.subHeading}>✅ ベストプラクティス</h4>
                <ul className={sharedStyles.bestPracticeList}>
                    <li>VPC Flow Logsは全サブネットではなく、セキュリティ要件が高い/トラブルシューティングが必要なサブネットに限定し、サンプリングレートを調整してコストを最適化する</li>
                    <li>Cloud RouterのBGPセッション状態とルート数をCloud Monitoringでアラートを設定し、ルートクォータ超過を早期検知する</li>
                    <li>重要なネットワークメトリクス（Interconnect帯域利用率80%以上、NATポート使用率90%以上等）にアラートポリシーを設定する</li>
                    <li>Cloud DNSクエリログを有効化して不審なDNSクエリ（C2通信、DNSトンネリング等）を検知するSIEMルールを設定する</li>
                </ul>
            </div>
            <div className={sharedStyles.divider}></div>

            {/* 5.2 接続問題のトラブルシューティング */}
            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🔧</span> 5.2 接続問題のトラブルシューティング
                </h3>
                <p>
                    VPN、Interconnect、BGPなどのハイブリッド接続の問題を系統的に診断・解決するスキルが問われる。またApplication LBのトラフィックドレインやVPC Flow Logs/パケットミラーリングを使ったデバッグ手法も重要。
                </p>

                <h4 className={sharedStyles.subHeading}>主要なトラブルシューティングシナリオ</h4>
                <ul className={sharedStyles.list}>
                    <li><strong>Application LBのトラフィックドレイン：</strong> バックエンドをメンテナンスモードにするためにサービングキャパシティを0%に設定し、既存接続を安全に終了させる。</li>
                    <li><strong>VPNのトラブルシューティング：</strong> IKEネゴシエーションの失敗（PSK不一致、暗号スイート不一致）、トンネルのフラッピング（BFD設定ミス）、ルーティング問題の診断。</li>
                    <li><strong>Cloud Interconnect問題：</strong> 物理リンク状態、VLAN attachmentの状態、BGPセッション確立の確認。Colocation施設との連携が必要な物理障害の判別。</li>
                    <li><strong>Cloud Router BGPピアリング問題：</strong> BGPセッション状態（IDLE/ACTIVE/ESTABLISHED）の確認、ASN設定ミス、アドバタイズされたルートの確認、認証設定の確認。</li>
                    <li><strong>VPC Flow Logs/ファイアウォールログ/パケットミラーリングの活用：</strong> REJECTされた通信の特定、ファイアウォールルールのデバッグ、ペイロードレベルの詳細分析。</li>
                </ul>

                <h4 className={sharedStyles.subHeading}>✅ トラブルシューティングの鉄則</h4>
                <ul className={sharedStyles.bestPracticeList}>
                    <li>下位レイヤーから確認（L1物理→L2リンク→L3ルーティング→L4ポート→L7アプリ）し、根本原因を系統的に絞り込む</li>
                    <li>Connectivity Testを最初に実行してルート・ファイアウォール設定の問題を即座に特定する（実際のパケット送信不要）</li>
                    <li>本番環境でのパケットキャプチャにはPacket Mirroringを使用し、直接VMに負荷をかけずに通信内容を分析する</li>
                </ul>
            </div>
            <div className={sharedStyles.divider}></div>

            {/* 5.3 Network Intelligence Centerによる監視と診断 */}
            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🔬</span> 5.3 Network Intelligence Centerによる監視と診断
                </h3>
                <p>
                    Network Intelligence Centerはネットワークの可視化と診断を統合したマネージドツール群。各モジュールの特性と使い分けを正確に理解することが試験では問われる。
                </p>

                <ul className={sharedStyles.list}>
                    <li><strong>🗺️ Network Topology：</strong> VPC、リージョン、オンプレミスとの接続、VM間の実際のトラフィックフローを視覚的なグラフで表示。帯域利用率とボトルネックを特定。</li>
                    <li><strong>🔍 Connectivity Tests：</strong> 実際のパケット送信なしにコントロールプレーン設定を静的解析。ファイアウォールルールやルーティングの問題を瞬時に特定。送信元→宛先の到達性をシミュレーション。</li>
                    <li><strong>📈 Performance Dashboard：</strong> プロジェクトスコープとGoogleワイドのパケットロスとレイテンシを表示。VMからGoogleフロントエンドまでの経路上の問題を特定。</li>
                    <li><strong>🔒 Firewall Insights：</strong> 機械学習で未使用ルール、シャドウイングされたルール、過剰な権限のルールを自動検出。ファイアウォールポリシーの最適化提案を提供。</li>
                    <li><strong>🔄 Network Analyzer：</strong> ネットワーク障害、最適でない設定、利用率警告を自動検知。設定の誤り（孤立したネットワークリソース等）をプロアクティブに通知。</li>
                    <li><strong>📊 Flow Analyzer：</strong> VPC Flow LogsとBigQueryを活用してネットワークトラフィックパターンを分析。トップN通信、異常検知、コスト最適化機会の特定。</li>
                </ul>

                <h4 className={sharedStyles.subHeading}>✅ ベストプラクティス</h4>
                <ul className={sharedStyles.bestPracticeList}>
                    <li>新しい環境や設定変更後はまずConnectivity Testsを実行して、実際の障害が発生する前に設定ミスを検出する</li>
                    <li>Firewall Insightsを定期的に確認し（月1回等）、未使用ルールを削除してファイアウォールポリシーをクリーンに保つ</li>
                    <li>Network Analyzerのアラートをサブスクライブして、設定の問題をプロアクティブに通知を受ける</li>
                </ul>
            </div>
        </section>
    );
}
