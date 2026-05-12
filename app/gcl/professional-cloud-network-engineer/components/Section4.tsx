import React from 'react';
import sharedStyles from './SharedSection.module.css';
import { DiagramSVG } from '@/components/DiagramSVG';

/**
 * Render the "Section 4" content block describing CDN, DNS, and IP Address Management for the PCNE guide.
 */
export function Section4() {
    return (
        <section className={sharedStyles.section} id="s4" aria-labelledby="s4-title">
            <div className={sharedStyles.sectionLabel}>Section 4 (~15%)</div>
            <h2
                className={sharedStyles.sectionTitle}
                id="s4-title"
                style={{ color: 'var(--color-theme-genai-fg)' }}
            >
                CDN・DNS・IPアドレス管理
            </h2>
            <p className={sharedStyles.sectionDesc}>
                約15%を占めるセクション。Cloud
                DNSのゾーン種別と転送設定、IPアドレスのエフェメラル/静的の違い、グローバル/リージョンのスコープが頻出。
            </p>
            <div className={sharedStyles.divider}></div>

            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🌍</span> 4.1 Cloud DNS ─
                    パブリック/プライベートゾーンと転送設定
                </h3>
                <div className={`table-wrapper ${sharedStyles.tableWrapperMt}`}>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">ゾーン種別</th>
                                <th scope="col">公開範囲</th>
                                <th scope="col">用途</th>
                                <th scope="col">アクセス元</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={sharedStyles.tdName}>パブリックゾーン</td>
                                <td>インターネット全体</td>
                                <td>外部公開ドメインのDNS管理</td>
                                <td>誰でも</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>プライベートゾーン</td>
                                <td>指定VPCのみ</td>
                                <td>内部サービスのDNS解決</td>
                                <td>紐づけたVPCのみ</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h4>DNS転送の2方向</h4>
                <div className={sharedStyles.archDiagram}>
                    <DiagramSVG viewBox="0 0 800 240" ariaLabel="DNS転送の2方向">
                        <g
                            style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '14px',
                                fill: 'var(--color-foreground)',
                            }}
                        >
                            <text x="20" y="30" fontWeight="bold">
                                アウトバウンド転送（GCP → オンプレ）
                            </text>
                            <rect
                                x="20"
                                y="45"
                                width="160"
                                height="40"
                                fill="var(--color-card)"
                                stroke="var(--color-border)"
                                rx="4"
                            />
                            <text x="40" y="70">
                                GCPリソース
                            </text>

                            <path
                                d="M 180,65 h 40"
                                stroke="var(--color-primary)"
                                strokeWidth="2"
                                markerEnd="url(#arrow)"
                            />

                            <rect
                                x="220"
                                y="45"
                                width="200"
                                height="40"
                                fill="var(--color-card)"
                                stroke="var(--color-border)"
                                rx="4"
                            />
                            <text x="235" y="70">
                                Cloud DNS (転送ゾーン)
                            </text>

                            <path
                                d="M 420,65 h 40"
                                stroke="var(--color-primary)"
                                strokeWidth="2"
                                markerEnd="url(#arrow)"
                            />

                            <rect
                                x="460"
                                y="45"
                                width="160"
                                height="40"
                                fill="var(--color-card)"
                                stroke="var(--color-border)"
                                strokeDasharray="4 4"
                                rx="4"
                            />
                            <text x="480" y="70">
                                Interconnect/VPN
                            </text>

                            <path
                                d="M 620,65 h 40"
                                stroke="var(--color-primary)"
                                strokeWidth="2"
                                markerEnd="url(#arrow)"
                            />

                            <rect
                                x="660"
                                y="45"
                                width="120"
                                height="40"
                                fill="var(--color-card)"
                                stroke="var(--color-border)"
                                rx="4"
                            />
                            <text x="670" y="70">
                                オンプレDNS
                            </text>

                            <text x="20" y="140" fontWeight="bold">
                                インバウンド転送（オンプレ → GCP）
                            </text>
                            <rect
                                x="20"
                                y="155"
                                width="160"
                                height="40"
                                fill="var(--color-card)"
                                stroke="var(--color-border)"
                                rx="4"
                            />
                            <text x="40" y="180">
                                オンプレホスト
                            </text>

                            <path
                                d="M 180,175 h 40"
                                stroke="var(--color-primary)"
                                strokeWidth="2"
                                markerEnd="url(#arrow)"
                            />

                            <rect
                                x="220"
                                y="155"
                                width="200"
                                height="40"
                                fill="var(--color-card)"
                                stroke="var(--color-border)"
                                strokeDasharray="4 4"
                                rx="4"
                            />
                            <text x="250" y="180">
                                Interconnect/VPN
                            </text>

                            <path
                                d="M 420,175 h 40"
                                stroke="var(--color-primary)"
                                strokeWidth="2"
                                markerEnd="url(#arrow)"
                            />

                            <rect
                                x="460"
                                y="155"
                                width="160"
                                height="40"
                                fill="var(--color-card)"
                                stroke="var(--color-border)"
                                rx="4"
                            />
                            <text x="470" y="180">
                                35.199.192.0/19
                            </text>

                            <path
                                d="M 620,175 h 40"
                                stroke="var(--color-primary)"
                                strokeWidth="2"
                                markerEnd="url(#arrow)"
                            />

                            <rect
                                x="660"
                                y="155"
                                width="120"
                                height="40"
                                fill="var(--color-card)"
                                stroke="var(--color-border)"
                                rx="4"
                            />
                            <text x="680" y="180">
                                Cloud DNS
                            </text>

                            <text
                                x="20"
                                y="225"
                                fill="var(--color-theme-cdl-fg)"
                                fontSize="12px"
                                fontWeight="bold"
                            >
                                注意: オンプレのFWで 35.199.192.0/19 からの通信を許可すること
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

                <h4>DNSピアリング</h4>
                <p>
                    複数VPC間でプライベートゾーンを共有できます。ハブ＆スポーク構成でHub
                    VPCのDNSをスポークVPCから参照する際に活用します。
                </p>

                <div className={sharedStyles.bpBox}>
                    <h5>✅ ベストプラクティス</h5>
                    <ul>
                        <li>
                            内部サービスは<strong>プライベートゾーン</strong>でDNS管理を集中化する
                        </li>
                        <li>
                            <strong>DNSピアリング</strong>でVPC間の名前解決を統合する
                        </li>
                        <li>
                            <strong>転送ゾーン</strong>でオンプレのDNSと統合する
                        </li>
                        <li>
                            パブリックゾーンは<strong>DNSSEC</strong>で完全性を保護する
                        </li>
                        <li>
                            変更頻度に応じてTTLを適切に設定する（短すぎるとDNSトラフィック増加）
                        </li>
                    </ul>
                </div>
            </div>

            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🔢</span> 4.2 IPアドレス管理 ─
                    エフェメラル・静的・グローバル・リージョン
                </h3>
                <div className={`table-wrapper ${sharedStyles.tableWrapperMt}`}>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">種別</th>
                                <th scope="col">永続性</th>
                                <th scope="col">コスト</th>
                                <th scope="col">用途</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={sharedStyles.tdName}>エフェメラルIP</td>
                                <td>VM停止・削除で変わる</td>
                                <td>追加コストなし</td>
                                <td>開発・テスト環境</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>静的IP（リージョン）</td>
                                <td>予約して永続化</td>
                                <td>未使用時に課金あり</td>
                                <td>リージョンLB・VM・Cloud NAT</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>静的IP（グローバル）</td>
                                <td>予約して永続化</td>
                                <td>未使用時に課金あり</td>
                                <td>Global LB（Anycast）</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className={sharedStyles.examTip}>
                    <span className={sharedStyles.tipLabel}>注意⚠</span>
                    静的IPを予約したまま<strong>VMやLBに割り当てていない</strong>
                    場合、課金が発生します。使わない静的IPは解放してください。
                </div>
            </div>
        </section>
    );
}
