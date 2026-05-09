import React from 'react';
import sharedStyles from './SharedSection.module.css';
import { DiagramSVG } from '@/components/DiagramSVG';

/**
 * Renders the Section 6 - Part 4 (Cloud Logging and Audit) of the Cloud Digital Leader guide.
 * Explains Cloud Logging, audit log types, and log routing/export best practices.
 *
 * @param props - This component accepts no props.
 * @returns {JSX.Element} The rendered section element with logging and audit content.
 * @remarks Uses DiagramSVG component for visual flow representation. No side effects.
 */
export function Section4() {
    return (
        <section className={sharedStyles.section} id="s4">
            <div className={sharedStyles.sectionLabel}>Section 6 — Part 4</div>
            <h2 className={sharedStyles.sectionTitle}>Cloud Logging<br />ログ管理と監査</h2>
            <p className={sharedStyles.sectionDesc}>
                「誰がいつ何をしたか」を記録し、問題発生時の調査・コンプライアンス対応・セキュリティ監査の基盤を整えます。
            </p>
            <div className={sharedStyles.divider}></div>

            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">📋</span> Cloud Logging とは？ <span className={`${sharedStyles.tag} ${sharedStyles.tagBlue}`}>概要</span>
                </h3>
                <p>
                    Cloud Logging は Google Cloud 上のあらゆるサービスからログを収集・保存・検索・エクスポートするフルマネージドのログ管理サービスです。GCP サービスのログは自動的に収集され、VM 内のアプリログは Ops Agent 経由で収集します。
                </p>
                <div className={sharedStyles.diagramWrapper}>
                    <DiagramSVG viewBox="0 0 800 120" ariaLabel="Cloud Logging のログ収集とルーティングフロー: SOURCEからCOLLECT、ROUTEを経てDESTへ">
                        <rect x="10" y="30" width="160" height="60" rx="8" fill="var(--color-card)" stroke="var(--cdl-blue)" strokeWidth="2" />
                        <text x="90" y="55" textAnchor="middle" fill="var(--color-foreground)" fontSize="14" fontWeight="bold">SOURCE (発生源)</text>
                        <text x="90" y="75" textAnchor="middle" fill="var(--color-muted-foreground)" fontSize="12">GCP・VM・アプリ</text>

                        <path d="M 180 60 L 220 60" stroke="var(--color-muted-foreground)" strokeWidth="2" markerEnd="url(#arrow)" />

                        <rect x="230" y="30" width="160" height="60" rx="8" fill="var(--color-card)" stroke="var(--cdl-blue)" strokeWidth="2" />
                        <text x="310" y="55" textAnchor="middle" fill="var(--color-foreground)" fontSize="14" fontWeight="bold">COLLECT</text>
                        <text x="310" y="75" textAnchor="middle" fill="var(--color-muted-foreground)" fontSize="12">受信・保存 (Logging)</text>

                        <path d="M 400 60 L 440 60" stroke="var(--color-muted-foreground)" strokeWidth="2" markerEnd="url(#arrow)" />

                        <rect x="450" y="30" width="160" height="60" rx="8" fill="var(--color-card)" stroke="var(--cdl-blue)" strokeWidth="2" />
                        <text x="530" y="55" textAnchor="middle" fill="var(--color-foreground)" fontSize="14" fontWeight="bold">ROUTE</text>
                        <text x="530" y="75" textAnchor="middle" fill="var(--color-muted-foreground)" fontSize="12">フィルタで振り分け</text>

                        <path d="M 620 60 L 660 60" stroke="var(--color-muted-foreground)" strokeWidth="2" markerEnd="url(#arrow)" />

                        <rect x="670" y="30" width="120" height="60" rx="8" fill="var(--color-card)" stroke="var(--cdl-blue)" strokeWidth="2" />
                        <text x="730" y="55" textAnchor="middle" fill="var(--color-foreground)" fontSize="14" fontWeight="bold">DEST</text>
                        <text x="730" y="75" textAnchor="middle" fill="var(--color-muted-foreground)" fontSize="12">BQ / GCS / PubSub</text>
                    </DiagramSVG>
                </div>
            </div>

            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🔒</span> 監査ログ（Audit Logs）の3種類
                    <span className={`${sharedStyles.tag} ${sharedStyles.tagOrange}`}>試験最頻出</span>
                </h3>
                <p>
                    監査ログは<strong>「誰がいつ何をしたか」</strong>を記録するセキュリティ・コンプライアンス上の最重要ログです。
                </p>
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">ログ種別</th>
                                <th scope="col">記録内容</th>
                                <th scope="col">デフォルト有効</th>
                                <th scope="col">料金</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={sharedStyles.tdName}>管理アクティビティ<br />(Admin Activity)</td>
                                <td>リソースの作成・削除・設定変更、IAM ポリシー変更</td>
                                <td><span className="pill pill-green">✓ 常に有効</span></td>
                                <td><span className="pill pill-green">無料</span></td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>データアクセス<br />(Data Access)</td>
                                <td>Cloud Storage オブジェクト読み取り、BigQuery テーブルへのクエリなど</td>
                                <td><span className="pill pill-red">✗ デフォルト無効</span></td>
                                <td><span className="pill pill-orange">有料</span></td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>システムイベント<br />(System Event)</td>
                                <td>Google による自動操作（ライブマイグレーションなど）</td>
                                <td><span className="pill pill-green">✓ 常に有効</span></td>
                                <td><span className="pill pill-green">無料</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={sharedStyles.highlight}>
                    <strong>📝 試験ポイント：</strong> 「Cloud Storage バケットへのファイル読み取りを監査したい」→ <strong>データアクセス監査ログを手動で有効化</strong>する必要があります。「VM インスタンスの削除を追跡したい」→ <strong>管理アクティビティ監査ログ</strong>（デフォルトで記録済み）で確認可能です。
                </div>
            </div>

            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">📤</span> ログのエクスポート先と用途 <span className={`${sharedStyles.tag} ${sharedStyles.tagBlue}`}>ルーティング</span>
                </h3>
                <div className={sharedStyles.cards}>
                    <div className={sharedStyles.card}>
                        <div className={sharedStyles.cardIcon} aria-hidden="true">🗄️</div>
                        <h4>BigQuery へのエクスポート</h4>
                        <p>
                            <strong>長期保存 + SQL 分析</strong>が必要なログに最適。監査ログのカスタム分析・ダッシュボード作成・コスト分析などに活用。
                        </p>
                    </div>
                    <div className={sharedStyles.card}>
                        <div className={sharedStyles.cardIcon} aria-hidden="true">🗃️</div>
                        <h4>Cloud Storage へのエクスポート</h4>
                        <p>
                            <strong>低コストの長期アーカイブ</strong>が目的の場合に最適。Coldline ストレージと組み合わせて7年以上の保管コストを最小化。
                        </p>
                    </div>
                    <div className={sharedStyles.card}>
                        <div className={sharedStyles.cardIcon} aria-hidden="true">📨</div>
                        <h4>Pub/Sub へのエクスポート</h4>
                        <p>
                            <strong>リアルタイム処理</strong>が必要なログに最適。SIEM ツールへのストリーミング、Cloud Functions によるアラート自動化に活用。
                        </p>
                    </div>
                </div>
            </div>

            <div className={sharedStyles.bpBox}>
                <h5>ベストプラクティス：Cloud Logging</h5>
                <ul>
                    <li>監査ログは<strong>BigQuery にエクスポート</strong>してコンプライアンス・セキュリティ調査の基盤を構築する</li>
                    <li>機密データを扱う API（BigQuery・Cloud Storage・Secret Manager）は<strong>データアクセス監査ログを有効化</strong>する</li>
                    <li>長期保管が必要なログは<strong>Cloud Storage の Coldline</strong>にシンクして保管コストを最小化する</li>
                    <li>アプリケーションは <strong>構造化ログ（JSON形式）</strong> で出力して Cloud Logging での検索・集計を効率化する</li>
                    <li>ログ保持期間のデフォルト（30日）では不十分な場合は<strong>カスタムバケット</strong>で保持期間を延長する</li>
                </ul>
            </div>

            <div className={sharedStyles.sources}>
                <a className={sharedStyles.sourceLink} href="https://cloud.google.com/logging/docs/overview" target="_blank" rel="noopener noreferrer">
                    <span className={sharedStyles.sourceIcon} aria-hidden="true">🔗</span>
                    <div className={sharedStyles.sourceText}>
                        <strong>Cloud Logging — 概要ドキュメント</strong>
                        <span className={sharedStyles.sourceUrl}>https://cloud.google.com/logging/docs/overview</span>
                    </div>
                </a>
                <a className={sharedStyles.sourceLink} href="https://cloud.google.com/logging/docs/audit" target="_blank" rel="noopener noreferrer">
                    <span className={sharedStyles.sourceIcon} aria-hidden="true">🔗</span>
                    <div className={sharedStyles.sourceText}>
                        <strong>Cloud 監査ログ — 概要と種類</strong>
                        <span className={sharedStyles.sourceUrl}>https://cloud.google.com/logging/docs/audit</span>
                    </div>
                </a>
            </div>
        </section>
    );
}
