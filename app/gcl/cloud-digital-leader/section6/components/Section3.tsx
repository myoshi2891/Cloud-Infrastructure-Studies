import React from 'react';
import sharedStyles from './SharedSection.module.css';

/**
 * Renders the Section 6 - Part 3 (Cloud Monitoring) component for the Cloud Digital Leader guide.
 * It provides a comprehensive overview of Google Cloud Monitoring services, observability signals, and Ops Agent.
 *
 * @returns {React.ReactElement} The section containing Cloud Monitoring educational content.
 * @remarks This component does not take any props and has no side effects.
 */
export function Section3() {
    return (
        <section className={sharedStyles.section} id="s3">
            <div className={sharedStyles.sectionLabel}>Section 6 — Part 3</div>
            <h2 className={sharedStyles.sectionTitle}>Cloud Monitoring<br />モニタリングの全体像</h2>
            <p className={sharedStyles.sectionDesc}>
                システムの「今何が起きているか」を数値で把握するためのサービス群。問題が起きる前に検知し、自動で対応できる体制を整えます。
            </p>
            <div className={sharedStyles.divider}></div>

            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">📡</span> Cloud Monitoring とは？ <span className={`${sharedStyles.tag} ${sharedStyles.tagBlue}`}>概要</span>
                </h3>
                <p>
                    Cloud Monitoring は Google Cloud のインフラとアプリケーションのメトリクスを収集・可視化・アラートを設定するフルマネージドサービスです。Google Cloud リソースのメトリクスは自動収集されますが、VM 内部（メモリ等）は <strong>Ops Agent</strong> の追加インストールが必要です。
                </p>
            </div>

            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🔭</span> オブザーバビリティ（可観測性）の4シグナル
                    <span className={`${sharedStyles.tag} ${sharedStyles.tagBlue}`}>重要概念</span>
                </h3>
                <div className={sharedStyles.cards}>
                    <div className={sharedStyles.card}>
                        <div className={sharedStyles.cardIcon} aria-hidden="true">📊</div>
                        <h4>Metrics（メトリクス）</h4>
                        <p>
                            <strong>何が・どれだけ</strong>起きているかの定量的な数値。CPU使用率・リクエスト数・エラーレートなど。→ Cloud Monitoring
                        </p>
                    </div>
                    <div className={sharedStyles.card}>
                        <div className={sharedStyles.cardIcon} aria-hidden="true">📄</div>
                        <h4>Logs（ログ）</h4>
                        <p>
                            <strong>いつ・何が</strong>起きたかのイベント記録。エラーメッセージ・アクセスログ・監査ログなど。→ Cloud Logging
                        </p>
                    </div>
                    <div className={sharedStyles.card}>
                        <div className={sharedStyles.cardIcon} aria-hidden="true">🔍</div>
                        <h4>Traces（トレース）</h4>
                        <p>
                            <strong>どこで</strong>遅延が発生しているかの分散トレース。マイクロサービス間の処理経路を可視化。→ Cloud Trace
                        </p>
                    </div>
                    <div className={sharedStyles.card}>
                        <div className={sharedStyles.cardIcon} aria-hidden="true">🔬</div>
                        <h4>Profiles（プロファイル）</h4>
                        <p>
                            <strong>なぜ</strong>遅いかのコードレベル分析。どの関数が CPU/メモリを消費しているかを継続的に計測。→ Cloud Profiler
                        </p>
                    </div>
                </div>
            </div>

            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🛠️</span> Google Cloud モニタリングサービス群
                    <span className={`${sharedStyles.tag} ${sharedStyles.tagBlue}`}>サービス一覧</span>
                </h3>
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">サービス</th>
                                <th scope="col">役割</th>
                                <th scope="col">主な特徴</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={sharedStyles.tdName}>Cloud Monitoring</td>
                                <td>メトリクス収集・可視化・アラート</td>
                                <td>ダッシュボード作成、SLO 監視、アップタイムチェック</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>Ops Agent</td>
                                <td>VM 内部メトリクス収集</td>
                                <td>メモリ・ディスク使用率など GCE デフォルトで取得できないメトリクスを収集</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>Managed Service<br />for Prometheus</td>
                                <td>Kubernetes メトリクス</td>
                                <td>Prometheus 互換 API でメトリクスを収集、運用オーバーヘッドなし</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>Cloud Trace</td>
                                <td>分散トレーシング</td>
                                <td>リクエストがサービスをまたぐ処理経路とレイテンシを可視化</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>Cloud Profiler</td>
                                <td>継続的プロファイリング</td>
                                <td>本番環境への影響を最小化しながらCPU/メモリの消費関数を特定</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>Error Reporting</td>
                                <td>エラー集約・通知</td>
                                <td>アプリケーションの例外を自動集計・グループ化し、新規エラーを即時通知</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🤖</span> Ops Agent の重要性 <span className={`${sharedStyles.tag} ${sharedStyles.tagOrange}`}>試験頻出</span>
                </h3>
                <p>
                    Compute Engine VM のデフォルト状態では取得できるメトリクスに制限があります。
                </p>
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">メトリクス</th>
                                <th scope="col">エージェントなし</th>
                                <th scope="col">Ops Agent あり</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>CPU 使用率</td>
                                <td><span className="pill pill-green">✓ 自動取得</span></td>
                                <td><span className="pill pill-green">✓ 取得可能</span></td>
                            </tr>
                            <tr>
                                <td>ネットワーク I/O</td>
                                <td><span className="pill pill-green">✓ 自動取得</span></td>
                                <td><span className="pill pill-green">✓ 取得可能</span></td>
                            </tr>
                            <tr>
                                <td><strong>メモリ使用量</strong></td>
                                <td><span className="pill pill-red">✗ 取得不可</span></td>
                                <td><span className="pill pill-green">✓ 取得可能</span></td>
                            </tr>
                            <tr>
                                <td><strong>ディスク使用率</strong></td>
                                <td><span className="pill pill-red">✗ 取得不可</span></td>
                                <td><span className="pill pill-green">✓ 取得可能</span></td>
                            </tr>
                            <tr>
                                <td>アプリケーションログ</td>
                                <td><span className="pill pill-red">✗ 取得不可</span></td>
                                <td><span className="pill pill-green">✓ 取得可能</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={sharedStyles.highlight}>
                    <strong>📝 試験ポイント：</strong> 「VM のメモリ使用量を監視したい」という問題では、<strong>Ops Agent のインストール</strong>が正解です。Cloud Monitoring だけでは自動取得されません。
                </div>
            </div>

            <div className={sharedStyles.bpBox}>
                <h5>ベストプラクティス：Cloud Monitoring</h5>
                <ul>
                    <li>すべての Compute Engine VM に<strong>Ops Agent をインストール</strong>してメモリ・ディスクを監視する</li>
                    <li>CPU アラートより<strong>SLO ベースのアラートを優先</strong>する（ユーザー体験に直結）</li>
                    <li>GKE のメトリクスには<strong>Managed Service for Prometheus</strong>を使用して運用負荷を最小化</li>
                    <li>アラートには<strong>対応手順（Runbook）へのリンク</strong>を含めて受信者が迷わず対応できるようにする</li>
                    <li>ダッシュボードはサービス別・チーム別に整理して<strong>障害時に素早く状況把握</strong>できるようにする</li>
                </ul>
            </div>

            <div className={sharedStyles.sources}>
                <a className={sharedStyles.sourceLink} href="https://cloud.google.com/monitoring/docs/overview" target="_blank" rel="noopener noreferrer">
                    <span className={sharedStyles.sourceIcon} aria-hidden="true">🔗</span>
                    <div className={sharedStyles.sourceText}>
                        <strong>Cloud Monitoring — 概要ドキュメント</strong>
                        <span className={sharedStyles.sourceUrl}>https://cloud.google.com/monitoring/docs/overview</span>
                    </div>
                </a>
                <a className={sharedStyles.sourceLink} href="https://cloud.google.com/monitoring/agent/ops-agent" target="_blank" rel="noopener noreferrer">
                    <span className={sharedStyles.sourceIcon} aria-hidden="true">🔗</span>
                    <div className={sharedStyles.sourceText}>
                        <strong>Ops Agent — 概要と設定方法</strong>
                        <span className={sharedStyles.sourceUrl}>https://cloud.google.com/monitoring/agent/ops-agent</span>
                    </div>
                </a>
                <a className={sharedStyles.sourceLink} href="https://cloud.google.com/trace/docs/overview" target="_blank" rel="noopener noreferrer">
                    <span className={sharedStyles.sourceIcon} aria-hidden="true">🔗</span>
                    <div className={sharedStyles.sourceText}>
                        <strong>Cloud Trace — 概要</strong>
                        <span className={sharedStyles.sourceUrl}>https://cloud.google.com/trace/docs/overview</span>
                    </div>
                </a>
            </div>
        </section>
    );
}
