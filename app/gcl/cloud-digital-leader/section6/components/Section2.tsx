import React from 'react';
import sharedStyles from './SharedSection.module.css';

export function Section2() {
    return (
        <section className={sharedStyles.section} id="s2">
            <div className={sharedStyles.sectionLabel}>Section 6 — Part 2</div>
            <h2 className={sharedStyles.sectionTitle}>SRE 原則と<br />運用の卓越性</h2>
            <p className={sharedStyles.sectionDesc}>
                Googleが生み出したSite Reliability Engineering（SRE）の考え方を理解することは、Cloud Digital Leaderとして必須の知識です。
            </p>
            <div className={sharedStyles.divider}></div>

            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🔬</span> SRE（Site Reliability Engineering）とは？
                    <span className={`${sharedStyles.tag} ${sharedStyles.tagBlue}`}>基本概念</span>
                </h3>
                <p>
                    SRE は Google が考案した<strong>ソフトウェアエンジニアリングのアプローチを運用（Ops）に適用する</strong>手法です。手作業を自動化し、システムの信頼性を高めることを目指します。
                </p>
                <ul className="styled-list">
                    <li>
                        <strong>DevOps の具体的な実装方法</strong>として位置づけられる（目標は同じ、手法が具体的）
                    </li>
                    <li>
                        「エラーは避けられない」という現実を受け入れ、<strong>どれだけ許容するか</strong>を設計する
                    </li>
                    <li>
                        オペレーション作業を<strong>50% 以下</strong>に抑え、残りは開発・自動化に充てるルールがある
                    </li>
                    <li>
                        インシデント後は<strong>ブレームレスな事後分析（Blameless Postmortem）</strong>で根本原因を分析
                    </li>
                </ul>
            </div>

            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">📊</span> SLI / SLO / SLA / エラーバジェット
                    <span className={`${sharedStyles.tag} ${sharedStyles.tagOrange}`}>重要概念</span>
                </h3>
                
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">用語</th>
                                <th scope="col">定義</th>
                                <th scope="col">具体例</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={sharedStyles.tdName}><span className="pill pill-blue">SLI</span></td>
                                <td>実際に計測するサービスの品質指標（メトリクス）</td>
                                <td>「過去30日間のリクエスト成功率 = 99.95%」</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>
                                    <span className="pill pill-green">SLO</span>
                                </td>
                                <td>SLI に対して設定する内部目標値。SLA より高く設定する</td>
                                <td>「リクエスト成功率を 99.9% 以上に保つ」</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>
                                    <span className="pill pill-orange">SLA</span>
                                </td>
                                <td>顧客と合意した正式な契約上の目標値。未達時はペナルティ発生</td>
                                <td>「99.5% を下回った場合はクレジット返金」</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>
                                    <span className="pill pill-red">Error Budget</span>
                                </td>
                                <td>SLO = (1 - SLO目標) × 期間。許容できる障害時間の総量</td>
                                <td>SLO 99.9% → 月間 43.8 分のダウンタイムが許容量</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className={sharedStyles.highlight}>
                    <strong>エラーバジェットの使い方：</strong>バジェットが残っている間は機能開発を優先し、バジェットを使い果たしそうな時は信頼性改善にリソースを集中させます。これにより開発スピードと安定性のバランスを数値で管理できます。
                </div>
            </div>

            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">⚙️</span> Toil（トイル）の概念
                    <span className={`${sharedStyles.tag} ${sharedStyles.tagBlue}`}>SRE 固有概念</span>
                </h3>
                <p>
                    <strong>Toil（トイル）</strong>とは、手作業・繰り返し・自動化できる運用作業のことです。SRE の核心的な考え方の一つで、Toil を減らすことが SRE の主要なミッションです。
                </p>

                <div className={sharedStyles.cards}>
                    <div className={sharedStyles.card}>
                        <div className={sharedStyles.cardIcon} aria-hidden="true">❌</div>
                        <h4>Toil の特徴</h4>
                        <ul className="styled-list" style={{ marginTop: '8px' }}>
                            <li>手作業で繰り返し発生する</li>
                            <li>自動化できるが自動化していない</li>
                            <li>長期的な価値を生まない</li>
                            <li>サービス成長に比例して増える</li>
                        </ul>
                    </div>
                    <div className={sharedStyles.card}>
                        <div className={sharedStyles.cardIcon} aria-hidden="true">✅</div>
                        <h4>Toil 削減の方法</h4>
                        <ul className="styled-list" style={{ marginTop: '8px' }}>
                            <li>自動化スクリプトの作成</li>
                            <li>IaC（Terraform 等）の導入</li>
                            <li>CI/CD パイプラインの構築</li>
                            <li>マネージドサービスへの移行</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className={sharedStyles.bpBox}>
                <h5>ベストプラクティス：SRE と運用の卓越性</h5>
                <ul>
                    <li>
                        <strong>SLO を先に定義</strong>してから監視・アラートを設計する（CPU 80%より「ユーザー体験に直結する SLO 監視」が重要）
                    </li>
                    <li>
                        <strong>エラーバジェットを使ってリリース判断</strong>を行う（バジェット残量が多い→新機能優先 / 少ない→信頼性改善優先）
                    </li>
                    <li>
                        インシデント後は必ず<strong>ブレームレス Postmortem</strong>を実施して同じ障害が再発しないよう仕組みを改善する
                    </li>
                    <li>
                        SRE の作業時間の<strong>50% 以上を Toil に費やしていないか</strong>定期的にレビューする
                    </li>
                </ul>
            </div>

            <div className={sharedStyles.sources}>
                <a className={sharedStyles.sourceLink} href="https://sre.google/books/" target="_blank" rel="noopener noreferrer">
                    <span className={sharedStyles.sourceIcon} aria-hidden="true">🔗</span>
                    <div className={sharedStyles.sourceText}>
                        <strong>Google SRE Books（公式無料公開）</strong>
                        <span className={sharedStyles.sourceUrl}>https://sre.google/books/</span>
                    </div>
                </a>
                <a className={sharedStyles.sourceLink} href="https://cloud.google.com/blog/products/devops-sre" target="_blank" rel="noopener noreferrer">
                    <span className={sharedStyles.sourceIcon} aria-hidden="true">🔗</span>
                    <div className={sharedStyles.sourceText}>
                        <strong>Google Cloud DevOps &amp; SRE ブログ</strong>
                        <span className={sharedStyles.sourceUrl}>https://cloud.google.com/blog/products/devops-sre</span>
                    </div>
                </a>
            </div>
        </section>
    );
}
