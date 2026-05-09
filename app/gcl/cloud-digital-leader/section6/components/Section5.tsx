import React from 'react';
import sharedStyles from './SharedSection.module.css';
import { DiagramSVG } from '@/components/DiagramSVG';

export function Section5() {
    return (
        <section className={sharedStyles.section} id="s5">
            <div className={sharedStyles.sectionLabel}>Section 6 — Part 5</div>
            <h2 className={sharedStyles.sectionTitle}>信頼性・可用性の<br />設計原則</h2>
            <p className={sharedStyles.sectionDesc}>
                障害が起きても止まらないシステムを設計するための考え方とGoogle Cloudの具体的なサービスを学びます。
            </p>
            <div className={sharedStyles.divider}></div>

            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🛡️</span> 信頼性の重要概念 <span className={`${sharedStyles.tag} ${sharedStyles.tagBlue}`}>基本概念</span>
                </h3>
                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">用語</th>
                                <th scope="col">意味</th>
                                <th scope="col">Google Cloud の実装例</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={sharedStyles.tdName}>高可用性 (HA)</td>
                                <td>システムが継続的に稼働し続ける能力。99.9% 以上のアップタイムが目標。</td>
                                <td>Cloud SQL の HA 構成、リージョナル MIG、GKE マルチゾーン</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>フォールトトレランス</td>
                                <td>一部のコンポーネントが障害を起こしても、サービスを継続できる設計</td>
                                <td>複数ゾーンへの冗長デプロイ、Load Balancer によるヘルスチェック</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>RPO<br />(目標復旧時点)</td>
                                <td>障害発生時に「どこまで遡ってデータを復元するか」の目標時点</td>
                                <td>Cloud SQL: PITR（ポイントインタイムリカバリ）でRPOを最小化</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>RTO<br />(目標復旧時間)</td>
                                <td>障害発生から「サービス復旧まで何時間以内にするか」の目標値</td>
                                <td>Cloud SQL HA でフェイルオーバー約数十秒、DR サイトで複数分</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>ディザスタリカバリ</td>
                                <td>大規模障害（リージョン障害等）からのシステム復旧計画</td>
                                <td>クロスリージョンレプリカ、マルチリージョンのCloud Storage</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🚨</span> インシデント管理フロー <span className={`${sharedStyles.tag} ${sharedStyles.tagOrange}`}>運用プロセス</span>
                </h3>
                <p>インシデント（サービス障害）への対応には標準化されたプロセスが必要です。</p>
                <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem', overflowX: 'auto' }}>
                    <DiagramSVG viewBox="0 0 1000 120" ariaLabel="インシデント管理フロー: 検知から事後分析までの5ステップ">
                        <rect x="20" y="30" width="160" height="60" rx="8" fill="var(--color-card)" stroke="var(--cdl-blue)" strokeWidth="2" />
                        <text x="100" y="55" textAnchor="middle" fill="var(--color-foreground)" fontSize="14" fontWeight="bold">01 検知 (Detect)</text>
                        <text x="100" y="75" textAnchor="middle" fill="var(--color-muted-foreground)" fontSize="12">SLO アラート・報告</text>

                        <path d="M 180 60 L 220 60" stroke="var(--color-muted-foreground)" strokeWidth="2" markerEnd="url(#arrow)" />

                        <rect x="220" y="30" width="160" height="60" rx="8" fill="var(--color-card)" stroke="var(--cdl-blue)" strokeWidth="2" />
                        <text x="300" y="55" textAnchor="middle" fill="var(--color-foreground)" fontSize="14" fontWeight="bold">02 トリアージ (Triage)</text>
                        <text x="300" y="75" textAnchor="middle" fill="var(--color-muted-foreground)" fontSize="12">影響度評価・宣言</text>

                        <path d="M 380 60 L 420 60" stroke="var(--color-muted-foreground)" strokeWidth="2" markerEnd="url(#arrow)" />

                        <rect x="420" y="30" width="160" height="60" rx="8" fill="var(--color-card)" stroke="var(--cdl-blue)" strokeWidth="2" />
                        <text x="500" y="55" textAnchor="middle" fill="var(--color-foreground)" fontSize="14" fontWeight="bold">03 緩和 (Mitigate)</text>
                        <text x="500" y="75" textAnchor="middle" fill="var(--color-muted-foreground)" fontSize="12">暫定対処で復旧</text>

                        <path d="M 580 60 L 620 60" stroke="var(--color-muted-foreground)" strokeWidth="2" markerEnd="url(#arrow)" />

                        <rect x="620" y="30" width="160" height="60" rx="8" fill="var(--color-card)" stroke="var(--cdl-blue)" strokeWidth="2" />
                        <text x="700" y="55" textAnchor="middle" fill="var(--color-foreground)" fontSize="14" fontWeight="bold">04 解決 (Resolve)</text>
                        <text x="700" y="75" textAnchor="middle" fill="var(--color-muted-foreground)" fontSize="12">根本解決・恒久対策</text>

                        <path d="M 780 60 L 820 60" stroke="var(--color-muted-foreground)" strokeWidth="2" markerEnd="url(#arrow)" />

                        <rect x="820" y="30" width="160" height="60" rx="8" fill="var(--color-card)" stroke="var(--cdl-blue)" strokeWidth="2" />
                        <text x="900" y="55" textAnchor="middle" fill="var(--color-foreground)" fontSize="14" fontWeight="bold">05 事後分析 (Postmortem)</text>
                        <text x="900" y="75" textAnchor="middle" fill="var(--color-muted-foreground)" fontSize="12">ブレームレスな分析</text>
                    </DiagramSVG>
                </div>
            </div>

            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🔄</span> DevOps と SRE の関係 <span className={`${sharedStyles.tag} ${sharedStyles.tagBlue}`}>考え方</span>
                </h3>
                <div className={sharedStyles.cards}>
                    <div className={sharedStyles.card}>
                        <div className={sharedStyles.cardIcon} aria-hidden="true">🚀</div>
                        <h4>DevOps（開発 + 運用の統合）</h4>
                        <p>
                            開発と運用の<strong>サイロを壊し</strong>、協力してサービスを素早くデリバリーする文化・考え方。CI/CD・自動化・フィードバックループが核心。
                        </p>
                    </div>
                    <div className={sharedStyles.card}>
                        <div className={sharedStyles.cardIcon} aria-hidden="true">⚙️</div>
                        <h4>SRE（DevOps の具体的実装）</h4>
                        <p>
                            DevOps の価値観を<strong>ソフトウェアエンジニアリングで具体化</strong>した実践手法。エラーバジェット・Toil削減・SLO設計などが特徴。
                        </p>
                    </div>
                </div>
                <div className={sharedStyles.highlight}>
                    <strong>📝 試験での覚え方：</strong> DevOps は「文化・考え方・目標」、SRE は「具体的な実装方法・実践手法」と覚えましょう。「SRE は DevOps の実装である」がGoogleの公式見解です。
                </div>
            </div>

            <div className={sharedStyles.bpBox}>
                <h5>ベストプラクティス：信頼性設計</h5>
                <ul>
                    <li>本番データベースは必ず<strong>HA（高可用性）構成</strong> で構築し、RPO・RTO を事前に定義する</li>
                    <li>ロードバランサに<strong>ヘルスチェック</strong>を設定して異常なバックエンドを自動的に除外する</li>
                    <li>複数ゾーンへの<strong>リージョナル MIG（Managed Instance Group）</strong>でゾーン障害に備える</li>
                    <li>DR（ディザスタリカバリ）手順は<strong>定期的に訓練（Chaos Engineering）</strong>して実際に機能することを確認する</li>
                    <li>インシデント後は<strong>48時間以内に Postmortem</strong> を実施して学びを組織に残す</li>
                </ul>
            </div>
        </section>
    );
}
