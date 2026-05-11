import React from 'react';
import sharedStyles from './SharedSection.module.css';
import { DiagramSVG } from '@/components/DiagramSVG';

/**
 * Render the "Section 3" content block describing Load Balancing and Optimization for the PCNE guide.
 */
export function Section3() {
    return (
        <section className={sharedStyles.section} id="s3" aria-labelledby="s3-title">
            <div className={sharedStyles.sectionLabel}>Section 3 (~19%)</div>
            <h2
                className={sharedStyles.sectionTitle}
                id="s3-title"
                style={{ color: 'var(--color-primary)' }}
            >
                ロードバランシングとトラフィック管理
            </h2>
            <p className={sharedStyles.sectionDesc}>
                約19%を占める重要セクション。6種類のLBを状況に応じて選択できるかが問われる。Global
                vs Regional、Proxy型 vs Passthrough型の違いが最重要。
            </p>
            <div className={sharedStyles.divider}></div>

            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🔀</span> 3.1 ロードバランサー選択の決定フロー
                </h3>
                <div className={sharedStyles.archDiagram}>
                    <DiagramSVG
                        viewBox="0 0 800 380"
                        ariaLabel="ロードバランサー選択の決定フローチャート"
                    >
                        <g
                            style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '14px',
                                fill: 'var(--color-foreground)',
                            }}
                        >
                            <text x="20" y="30" fontWeight="bold">
                                トラフィックの方向は？
                            </text>
                            <path d="M 30,40 v 260" stroke="var(--color-border)" strokeWidth="2" />

                            <path d="M 30,70 h 20" stroke="var(--color-border)" strokeWidth="2" />
                            <text x="60" y="75" fontWeight="bold">
                                外部（インターネット → GCP）
                            </text>
                            <path d="M 70,85 v 180" stroke="var(--color-border)" strokeWidth="2" />

                            <path d="M 70,110 h 20" stroke="var(--color-border)" strokeWidth="2" />
                            <text x="100" y="115" fontWeight="bold">
                                HTTP/HTTPS トラフィック？
                            </text>
                            <path d="M 110,125 v 50" stroke="var(--color-border)" strokeWidth="2" />

                            <path d="M 110,145 h 20" stroke="var(--color-border)" strokeWidth="2" />
                            <text x="140" y="150">
                                グローバル配信が必要？ →{' '}
                                <tspan fill="var(--color-primary)" fontWeight="bold">
                                    Global External HTTP(S) LB (L7)
                                </tspan>
                            </text>

                            <path d="M 110,175 h 20" stroke="var(--color-border)" strokeWidth="2" />
                            <text x="140" y="180">
                                リージョン内で十分？ →{' '}
                                <tspan fill="var(--color-primary)" fontWeight="bold">
                                    Regional External HTTP(S) LB (L7)
                                </tspan>
                            </text>

                            <path d="M 70,210 h 20" stroke="var(--color-border)" strokeWidth="2" />
                            <text x="100" y="215" fontWeight="bold">
                                TCP/UDP/その他プロトコル？
                            </text>
                            <path d="M 110,225 v 50" stroke="var(--color-border)" strokeWidth="2" />

                            <path d="M 110,245 h 20" stroke="var(--color-border)" strokeWidth="2" />
                            <text x="140" y="250">
                                グローバル・静的IP必要？ →{' '}
                                <tspan fill="var(--color-primary)" fontWeight="bold">
                                    External TCP/SSL Proxy LB (L4 Proxy)
                                </tspan>
                            </text>

                            <path d="M 110,275 h 20" stroke="var(--color-border)" strokeWidth="2" />
                            <text x="140" y="280">
                                クライアントIPを保持したい？ →{' '}
                                <tspan fill="var(--color-primary)" fontWeight="bold">
                                    External Network LB (L4 Passthrough)
                                </tspan>
                            </text>

                            <path d="M 30,315 h 20" stroke="var(--color-border)" strokeWidth="2" />
                            <text x="60" y="320" fontWeight="bold">
                                内部（VPC内 → VPC内）
                            </text>
                            <path d="M 70,330 v 40" stroke="var(--color-border)" strokeWidth="2" />

                            <path d="M 70,345 h 20" stroke="var(--color-border)" strokeWidth="2" />
                            <text x="100" y="350">
                                HTTP/HTTPS トラフィック？ →{' '}
                                <tspan fill="var(--color-primary)" fontWeight="bold">
                                    Internal HTTP(S) LB (L7)
                                </tspan>
                            </text>

                            <path d="M 70,370 h 20" stroke="var(--color-border)" strokeWidth="2" />
                            <text x="100" y="375">
                                TCP/UDP？ →{' '}
                                <tspan fill="var(--color-primary)" fontWeight="bold">
                                    Internal TCP/UDP LB (L4 Passthrough)
                                </tspan>
                            </text>
                        </g>
                    </DiagramSVG>
                </div>

                <h4>主要ロードバランサー比較表</h4>
                <div className={`table-wrapper ${sharedStyles.tableWrapperMt}`}>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">LB名</th>
                                <th scope="col">スコープ</th>
                                <th scope="col">レイヤー</th>
                                <th scope="col">プロトコル</th>
                                <th scope="col">Cloud Armor</th>
                                <th scope="col">クライアントIP</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={sharedStyles.tdName}>Global External HTTP(S) LB</td>
                                <td>
                                    <span className={`${sharedStyles.tag} ${sharedStyles.tagCyan}`}>
                                        グローバル
                                    </span>
                                </td>
                                <td>L7</td>
                                <td>HTTP/HTTPS/HTTP2/gRPC</td>
                                <td>
                                    <span
                                        className={`${sharedStyles.tag} ${sharedStyles.tagGreen}`}
                                    >
                                        ✓ 対応
                                    </span>
                                </td>
                                <td>X-Forwarded-For</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>
                                    Regional External HTTP(S) LB
                                </td>
                                <td>
                                    <span className={`${sharedStyles.tag} ${sharedStyles.tagBlue}`}>
                                        リージョン
                                    </span>
                                </td>
                                <td>L7</td>
                                <td>HTTP/HTTPS</td>
                                <td>
                                    <span
                                        className={`${sharedStyles.tag} ${sharedStyles.tagGreen}`}
                                    >
                                        ✓ 対応
                                    </span>
                                </td>
                                <td>X-Forwarded-For</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>External TCP/SSL Proxy LB</td>
                                <td>
                                    <span className={`${sharedStyles.tag} ${sharedStyles.tagCyan}`}>
                                        グローバル
                                    </span>
                                </td>
                                <td>L4 Proxy</td>
                                <td>TCP / SSL</td>
                                <td>
                                    <span className={`${sharedStyles.tag} ${sharedStyles.tagRed}`}>
                                        ✗ 不可
                                    </span>
                                </td>
                                <td>Proxy Protocol</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>External Network LB</td>
                                <td>
                                    <span className={`${sharedStyles.tag} ${sharedStyles.tagBlue}`}>
                                        リージョン
                                    </span>
                                </td>
                                <td>L4 Pass</td>
                                <td>TCP / UDP</td>
                                <td>
                                    <span className={`${sharedStyles.tag} ${sharedStyles.tagRed}`}>
                                        ✗ 不可
                                    </span>
                                </td>
                                <td>
                                    <span
                                        className={`${sharedStyles.tag} ${sharedStyles.tagGreen}`}
                                    >
                                        ネイティブ保持
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>Internal HTTP(S) LB</td>
                                <td>
                                    <span className={`${sharedStyles.tag} ${sharedStyles.tagBlue}`}>
                                        リージョン
                                    </span>
                                </td>
                                <td>L7</td>
                                <td>HTTP/HTTPS</td>
                                <td>
                                    <span
                                        className={`${sharedStyles.tag} ${sharedStyles.tagGreen}`}
                                    >
                                        ✓ 対応
                                    </span>
                                </td>
                                <td>X-Forwarded-For</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>Internal TCP/UDP LB</td>
                                <td>
                                    <span className={`${sharedStyles.tag} ${sharedStyles.tagBlue}`}>
                                        リージョン
                                    </span>
                                </td>
                                <td>L4 Pass</td>
                                <td>TCP / UDP</td>
                                <td>
                                    <span className={`${sharedStyles.tag} ${sharedStyles.tagRed}`}>
                                        ✗ 不可
                                    </span>
                                </td>
                                <td>
                                    <span
                                        className={`${sharedStyles.tag} ${sharedStyles.tagGreen}`}
                                    >
                                        ネイティブ保持
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className={sharedStyles.examTip}>
                    <span className={sharedStyles.tipLabel}>試験頻出⚠</span>
                    <strong>Cloud ArmorはProxy型LBにのみ対応</strong>します。Passthrough型（Network
                    LB, Internal TCP/UDP）には使えません。クライアントIPを保持したい場合はNetwork
                    LBを選びますが、DDoS/WAF保護はできません。
                </div>
            </div>

            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🌐</span> 3.2 Global External HTTP(S) LB ─
                    URLMapとNEGの設計
                </h3>
                <div className={sharedStyles.archDiagram}>
                    <DiagramSVG
                        viewBox="0 0 800 320"
                        ariaLabel="Global External HTTPS LBアーキテクチャ図"
                    >
                        <g style={{ fontFamily: 'var(--font-body)', fontSize: '14px' }}>
                            <rect
                                x="10"
                                y="10"
                                width="780"
                                height="300"
                                fill="transparent"
                                stroke="var(--color-border)"
                                strokeWidth="1"
                                rx="8"
                            />
                            <text x="30" y="35" fill="var(--color-foreground)" fontWeight="bold">
                                ユーザー（世界中）
                            </text>

                            <path
                                d="M 150,45 v 30"
                                stroke="var(--color-primary)"
                                strokeWidth="2"
                                markerEnd="url(#arrow)"
                            />

                            <rect
                                x="30"
                                y="80"
                                width="740"
                                height="210"
                                fill="var(--color-card)"
                                stroke="var(--color-border)"
                                strokeWidth="1"
                                rx="8"
                            />
                            <text x="50" y="105" fill="var(--color-foreground)" fontWeight="bold">
                                Anycast IP（単一グローバルIP）
                            </text>
                            <text
                                x="50"
                                y="125"
                                fill="var(--color-muted-foreground)"
                                fontSize="12px"
                            >
                                最も近いGoogle PoP（Point of Presence）で終端
                            </text>

                            <path
                                d="M 150,135 v 20"
                                stroke="var(--color-primary)"
                                strokeWidth="2"
                                markerEnd="url(#arrow)"
                            />

                            <rect
                                x="50"
                                y="160"
                                width="700"
                                height="110"
                                fill="transparent"
                                stroke="var(--color-border)"
                                strokeWidth="1"
                                rx="4"
                                strokeDasharray="4 4"
                            />
                            <text x="60" y="180" fill="var(--color-foreground)" fontWeight="bold">
                                URL Map（ルーティングルール）
                            </text>

                            <text x="80" y="210" fill="var(--color-foreground)">
                                /api/* →{' '}
                                <tspan fill="var(--color-primary)" fontWeight="bold">
                                    Backend Service A (us-central1 MIG)
                                </tspan>
                            </text>
                            <text x="80" y="230" fill="var(--color-foreground)">
                                /static/* →{' '}
                                <tspan fill="var(--color-primary)" fontWeight="bold">
                                    Cloud Storage (CDNキャッシュ)
                                </tspan>
                            </text>
                            <text x="80" y="250" fill="var(--color-foreground)">
                                {'/*'} →{' '}
                                <tspan fill="var(--color-primary)" fontWeight="bold">
                                    Backend Service B (マルチリージョン)
                                </tspan>
                            </text>

                            <defs>
                                <marker
                                    id="arrow"
                                    viewBox="0 0 10 10"
                                    refX="5"
                                    refY="5"
                                    markerWidth="6"
                                    markerHeight="6"
                                    orient="auto-start-reverse"
                                >
                                    <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-primary)" />
                                </marker>
                            </defs>
                        </g>
                    </DiagramSVG>
                </div>

                <h4>コンポーネント構成</h4>
                <div className={sharedStyles.flowSteps}>
                    <div className={sharedStyles.flowStep}>
                        <div className={sharedStyles.flowStepNum}>1</div>
                        <div className={sharedStyles.flowStepContent}>
                            <div className={sharedStyles.flowStepTitle}>Forwarding Rule</div>
                            <div className={sharedStyles.flowStepBody}>
                                外部IPとポート（80/443）を定義。グローバルIPの場合はAnycastとして機能。
                            </div>
                        </div>
                    </div>
                    <div className={sharedStyles.flowStep}>
                        <div className={sharedStyles.flowStepNum}>2</div>
                        <div className={sharedStyles.flowStepContent}>
                            <div className={sharedStyles.flowStepTitle}>Target HTTP(S) Proxy</div>
                            <div className={sharedStyles.flowStepBody}>
                                SSL証明書を管理し、URL
                                Mapにトラフィックを渡す。HTTPSの場合はSSL終端もここで行う。
                            </div>
                        </div>
                    </div>
                    <div className={sharedStyles.flowStep}>
                        <div className={sharedStyles.flowStepNum}>3</div>
                        <div className={sharedStyles.flowStepContent}>
                            <div className={sharedStyles.flowStepTitle}>URL Map</div>
                            <div className={sharedStyles.flowStepBody}>
                                ホスト名・URLパスに基づいてバックエンドサービスへルーティング。高度なトラフィック制御が可能。
                            </div>
                        </div>
                    </div>
                    <div className={sharedStyles.flowStep}>
                        <div className={sharedStyles.flowStepNum}>4</div>
                        <div className={sharedStyles.flowStepContent}>
                            <div className={sharedStyles.flowStepTitle}>
                                Backend Service + Health Check
                            </div>
                            <div className={sharedStyles.flowStepBody}>
                                バックエンド（MIG・NEG・GCS）の設定と死活監視。セッション維持・タイムアウト設定もここで行う。
                            </div>
                        </div>
                    </div>
                </div>

                <h4>NEG（Network Endpoint Groups）の種類</h4>
                <div className={`table-wrapper ${sharedStyles.tableWrapperMt}`}>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">NEGの種類</th>
                                <th scope="col">エンドポイント</th>
                                <th scope="col">主な用途</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={sharedStyles.tdName}>Zonal NEG</td>
                                <td>GKE Pod・特定ゾーンのVM</td>
                                <td>GKEとの統合（コンテナへの直接転送）</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>Serverless NEG</td>
                                <td>Cloud Run・Cloud Functions・App Engine</td>
                                <td>サーバーレスサービスをLBのバックエンドに</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>Internet NEG</td>
                                <td>オンプレ・他クラウドのエンドポイント</td>
                                <td>ハイブリッドLB構成</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>Hybrid NEG</td>
                                <td>Interconnect/VPN経由の外部エンドポイント</td>
                                <td>オンプレサービスへの転送</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className={sharedStyles.bpBox}>
                    <h5>✅ ベストプラクティス</h5>
                    <ul>
                        <li>マルチリージョンバックエンドで高可用性を実現する</li>
                        <li>Cloud CDNと組み合わせて静的コンテンツをキャッシュする</li>
                        <li>
                            <strong>Cloud ArmorでWAF・DDoS保護を必ず有効化する</strong>
                        </li>
                        <li>SSL PolicyでTLS 1.2以上を強制する（古いバージョンを無効化）</li>
                        <li>Google管理SSL証明書（Managed Certificate）を使用して自動更新する</li>
                        <li>
                            ヘルスチェックのIPレンジ（<code>35.191.0.0/16</code>,{' '}
                            <code>130.211.0.0/22</code>）をFWルールで許可する
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
