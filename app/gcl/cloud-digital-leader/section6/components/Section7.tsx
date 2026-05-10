import React from 'react';
import sharedStyles from './SharedSection.module.css';

/**
 * Renders the exam-preparation section for Section 6 of the Cloud Digital Leader guide.
 *
 * The section includes a checklist, a "頻出問題パターン TOP 10" block, a keyword map table, and links to official study resources. This component accepts no props and has no side effects.
 *
 * @returns A React element containing the Section 6 — Part 7 exam-preparation content.
 */
export function Section7() {
    return (
        <section className={sharedStyles.section} id="s7" aria-labelledby="s7-title">
            <div className={sharedStyles.sectionLabel}>Section 6 — Part 7</div>
            <h2 className={sharedStyles.sectionTitle} id="s7-title">試験対策<br />チェックリスト</h2>
            <p className={sharedStyles.sectionDesc}>
                Section 6 の出題頻度が高いポイントと、間違えやすい引っかけ問題をまとめました。試験直前の確認にご活用ください。
            </p>
            <div className={sharedStyles.divider}></div>

            {/* 頻出問題パターン */}
            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🎯</span> 頻出問題パターン TOP 10 <span className={`${sharedStyles.tag} ${sharedStyles.tagOrange}`}>試験対策</span>
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' }}>
                    {[
                        {
                            id: '01',
                            title: '財務ガバナンス',
                            question: '「予算の上限に達したらどうなるか？」',
                            answer: <>✅ 正解：<strong>通知が届くだけでリソースは停止しない</strong>。自動停止には Pub/Sub + Cloud Functions が必要。</>
                        },
                        {
                            id: '02',
                            title: 'Cloud Monitoring',
                            question: '「VM のメモリ使用量を監視するために必要なものは？」',
                            answer: <>✅ 正解：<strong>Ops Agent のインストール</strong>。CPU/ネットワークは自動収集だが、メモリはエージェントが必要。</>
                        },
                        {
                            id: '03',
                            title: '監査ログ',
                            question: '「Cloud Storage のオブジェクト読み取りを記録したい」',
                            answer: <>✅ 正解：<strong>データアクセス監査ログを手動で有効化</strong>する。デフォルトでは無効（有料のため）。</>
                        },
                        {
                            id: '04',
                            title: 'SRE 概念',
                            question: '「SLO と SLA の違いは？」',
                            answer: <>✅ 正解：<strong>SLO は内部目標値（より高い）、SLA は顧客との契約値（より低い）</strong>。SLO 未達でも SLA 内なら違約金は発生しない。</>
                        },
                        {
                            id: '05',
                            title: 'ログエクスポート',
                            question: '「コストを最小化しながらログを7年間保管したい」',
                            answer: <>✅ 正解：<strong>Cloud Storage の Coldline へのシンク設定</strong>。BigQuery は分析向きで割高。</>
                        },
                        {
                            id: '06',
                            title: 'Toil',
                            question: '「SRE において Toil とは何か？」',
                            answer: <>✅ 正解：<strong>手作業・繰り返し・自動化できる運用作業</strong>。SRE は Toil を 50% 以下に保ち、残りを自動化・開発に充てる。</>
                        },
                        {
                            id: '07',
                            title: 'サステナビリティ',
                            question: '「Google Cloud 利用のCO₂排出量を確認するツールは？」',
                            answer: <>✅ 正解：<strong>Carbon Footprint ツール</strong>（Cloud Console 内）。プロジェクト・リージョン・サービス別に可視化できる。</>
                        },
                        {
                            id: '08',
                            title: 'コスト最適化',
                            question: '「バッチ処理のコストを最大限に削減したい」',
                            answer: <>✅ 正解：<strong>Spot VM の使用</strong>（最大91%割引）。停止されてもよいバッチ・ML トレーニングが適用対象。</>
                        },
                        {
                            id: '09',
                            title: 'DevOps vs SRE',
                            question: '「DevOps と SRE の関係を最もよく表しているのは？」',
                            answer: <>✅ 正解：<strong>「SRE は DevOps の具体的な実装（クラス）である」</strong>。DevOps が目標・文化、SRE がその実現手法。</>
                        },
                        {
                            id: '10',
                            title: 'Error Budget',
                            question: '「エラーバジェットを使い果たしそうな時、SRE チームはどうすべきか？」',
                            answer: <>✅ 正解：<strong>新機能のリリースを停止して信頼性改善に集中する</strong>。バジェットが残っている間は機能開発を優先できる。</>
                        }
                    ].map(pattern => (
                        <div key={pattern.id} style={{ background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '10px', padding: '20px 24px' }}>
                            <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '1rem', color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '8px' }}>
                                PATTERN {pattern.id} — {pattern.title}
                            </div>
                            <p style={{ fontSize: '1rem', color: '#c8deff', marginBottom: '6px', fontWeight: 500 }}>
                                {pattern.question}
                            </p>
                            <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
                                {pattern.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* キーワードマップ */}
            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🗺️</span> Section 6 キーワードマップ <span className={`${sharedStyles.tag} ${sharedStyles.tagBlue}`}>まとめ</span>
                </h3>
                <div className={`table-wrapper ${sharedStyles.tableWrapperMt}`}>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">カテゴリ</th>
                                <th scope="col">重要キーワード</th>
                                <th scope="col">重要度</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={sharedStyles.tdName}>財務ガバナンス</td>
                                <td>
                                    予算アラート、Committed Use Discounts、Spot
                                    VM、ラベル、BigQuery エクスポート、Recommender
                                </td>
                                <td><span className={`${sharedStyles.pill} ${sharedStyles.pillOrange}`}>★★★</span></td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>SRE</td>
                                <td>
                                    SLI / SLO / SLA / Error Budget、Toil、Blameless
                                    Postmortem、DevOps との関係
                                </td>
                                <td><span className={`${sharedStyles.pill} ${sharedStyles.pillOrange}`}>★★★</span></td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>Cloud Monitoring</td>
                                <td>
                                    Ops Agent、メトリクス・ログ・トレース・プロファイル、Cloud
                                    Trace、Error Reporting
                                </td>
                                <td><span className={`${sharedStyles.pill} ${sharedStyles.pillOrange}`}>★★★</span></td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>Cloud Logging</td>
                                <td>
                                    管理アクティビティ / データアクセス /
                                    システムイベント監査ログ、Log Router、シンク先
                                </td>
                                <td><span className={`${sharedStyles.pill} ${sharedStyles.pillOrange}`}>★★★</span></td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>信頼性</td>
                                <td>
                                    RPO /
                                    RTO、HA、フォールトトレランス、DR、インシデント管理、Postmortem
                                </td>
                                <td><span className={`${sharedStyles.pill} ${sharedStyles.pillBlue}`}>★★☆</span></td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>サステナビリティ</td>
                                <td>
                                    Carbon Footprint ツール、Scope 1/2/3、カーボンニュートラル
                                    2007年、CFE 24/7
                                </td>
                                <td><span className={`${sharedStyles.pill} ${sharedStyles.pillBlue}`}>★★☆</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 公式ソース */}
            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">📚</span> 推奨学習リソース <span className={`${sharedStyles.tag} ${sharedStyles.tagBlue}`}>公式ソース</span>
                </h3>
                <div className={sharedStyles.sources}>
                    <a
                        className={sharedStyles.sourceLink}
                        href="https://services.google.com/fh/files/misc/cloud_digital_leader_exam_guide_english.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className={sharedStyles.sourceIcon} aria-hidden="true">📄</span>
                        <div className={sharedStyles.sourceText}>
                            <strong>Cloud Digital Leader 公式試験ガイド（PDF）</strong>
                            <span className={sharedStyles.sourceUrl}>https://services.google.com/fh/files/misc/cloud_digital_leader_exam_guide_english.pdf</span>
                        </div>
                    </a>
                    <a
                        className={sharedStyles.sourceLink}
                        href="https://cloud.google.com/learn/certification/cloud-digital-leader"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className={sharedStyles.sourceIcon} aria-hidden="true">🔗</span>
                        <div className={sharedStyles.sourceText}>
                            <strong>Cloud Digital Leader 認定資格 公式ページ</strong>
                            <span className={sharedStyles.sourceUrl}>https://cloud.google.com/learn/certification/cloud-digital-leader</span>
                        </div>
                    </a>
                    <a
                        className={sharedStyles.sourceLink}
                        href="https://cloud.google.com/billing/docs/how-to/budgets"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className={sharedStyles.sourceIcon} aria-hidden="true">🔗</span>
                        <div className={sharedStyles.sourceText}>
                            <strong>Cloud Billing — 予算とアラート</strong>
                            <span className={sharedStyles.sourceUrl}>https://cloud.google.com/billing/docs/how-to/budgets</span>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
}
