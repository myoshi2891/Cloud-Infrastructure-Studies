import React from 'react';
import sharedStyles from './SharedSection.module.css';

/**
 * Render the "Section 2" content block describing hybrid connectivity and network interconnect options for the PCNE guide.
 *
 * @returns The React element for Section 2, including headers, comparison tables, best-practice notes, and exam tips.
 */
export function Section2() {
    return (
        <section className={sharedStyles.section} id="s2" aria-labelledby="s2-title">
            <div className={sharedStyles.sectionLabel}>Section 2 (23%)</div>
            <h2 className={sharedStyles.sectionTitle} id="s2-title" style={{ color: 'var(--color-primary)' }}>
                ハイブリッド接続とネットワーク相互接続
            </h2>
            <p className={sharedStyles.sectionDesc}>
                試験最大配点（約23%）のセクション。Cloud VPN・Interconnect・Cloud Routerの選択基準と設定方法、SLAの違いが頻出。シナリオベースで「どの接続方式を選ぶか」が問われます。
            </p>
            <div className={sharedStyles.divider}></div>

            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🌐</span> 2.1 接続方式の全体比較 ─ 帯域・コスト・SLAで選択する
                </h3>
                <div className={`table-wrapper ${sharedStyles.tableWrapperMt}`}>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">接続方式</th>
                                <th scope="col">帯域幅</th>
                                <th scope="col">SLA</th>
                                <th scope="col">推奨場面</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={sharedStyles.tdName}>HA VPN</td>
                                <td>最大 3Gbps/トンネル</td>
                                <td><span className={`${sharedStyles.tag} ${sharedStyles.tagBlue}`}>99.99%</span></td>
                                <td>帯域が少なく、コスト優先の場合</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>Classic VPN</td>
                                <td>最大 3Gbps/トンネル</td>
                                <td><span className={`${sharedStyles.tag} ${sharedStyles.tagOrange}`}>99.9%</span></td>
                                <td><span className={`${sharedStyles.tag} ${sharedStyles.tagOrange}`}>新規非推奨</span></td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>Partner Interconnect</td>
                                <td>50Mbps〜50Gbps</td>
                                <td><span className={`${sharedStyles.tag} ${sharedStyles.tagBlue}`}>99.9〜99.99%</span></td>
                                <td>Googleコロケ外・小〜中帯域</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>Dedicated Interconnect</td>
                                <td>10G / 100G × 最大8回線</td>
                                <td><span className={`${sharedStyles.tag} ${sharedStyles.tagBlue}`}>99.9〜99.99%</span></td>
                                <td>大帯域・低レイテンシ必須</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={sharedStyles.examTip}>
                    <span className={sharedStyles.tipLabel}>試験対策</span>
                    ① 大帯域（数十Gbps以上）+ 低レイテンシ必須 → <strong>Dedicated Interconnect</strong><br />
                    ② Googleコロケ施設に物理接続できない → <strong>Partner Interconnect</strong><br />
                    ③ コスト優先・帯域が3Gbps以下で十分 → <strong>HA VPN</strong><br />
                    ④ Classic VPNは新規構築で使わないこと（99.9% SLAのみ）
                </div>
            </div>

            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🔒</span> 2.2 HA VPN ─ 99.99% SLAを実現する高可用性VPN設計
                </h3>
                <p>HA VPN（High Availability VPN）は<strong>99.99% SLA</strong>を提供します。2つの独立したインターフェースに2本のトンネルを張り、BGPで動的ルーティングを行います。</p>
                
                <div className={sharedStyles.bpBox}>
                    <h4>ベストプラクティス</h4>
                    <ul>
                        <li><strong>新規VPN構築は必ずHA VPN</strong>を使用（Classic VPNは非推奨）</li>
                        <li><strong>IKEv2</strong>を使用（IKEv1より安全で効率的）</li>
                        <li>BGP（動的ルーティング）を必ず設定する（静的ルートは管理コストが高い）</li>
                        <li>帯域不足の場合はECMP（等コストマルチパス）でトンネルをスケールする</li>
                    </ul>
                </div>
            </div>

            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">⚡</span> 2.3 Cloud Interconnect ─ 専用線による99.99%冗長設計
                </h3>
                <p><strong>Dedicated Interconnect</strong>はGoogleのコロケーション施設に物理的に直接接続する専用線サービスです。10Gbps/100Gbps単位で回線を確保します。</p>

                <div className={sharedStyles.highlight}>
                    <strong>99.99% SLA冗長構成（本番環境必須）</strong><br/>
                    Metro-A が完全停止してもMetro-Bで継続 = <strong>99.99% SLA</strong>（異なる2 Metro × 2回線 = 合計4回線）<br/>
                    同一Metro内2本のみ = 99.9% SLA（非推奨）
                </div>

                <div className={sharedStyles.bpBox}>
                    <h4>VLAN Attachmentとは</h4>
                    <p>1本の物理専用線を論理的に複数に分割する仕組み（VLAN）。各アタッチメントが1つのVPCに対応し、1本の回線で複数のVPCに接続できます。</p>
                </div>
            </div>

            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🔀</span> 2.4 Cloud Router と BGP ─ 動的ルーティングの仕組みと設定
                </h3>
                <p>Cloud RouterはBGPセッションを管理し、オンプレとGCP間でルートを自動交換します。<strong>データプレーンのトラフィック自体は通過しません</strong>（コントロールプレーンのみ）。</p>
                <div className={`table-wrapper ${sharedStyles.tableWrapperMt}`}>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">モード</th>
                                <th scope="col">ルートの適用範囲</th>
                                <th scope="col">用途</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={sharedStyles.tdName}>Regional</td>
                                <td>学習したルートを同一リージョンのサブネットにのみ適用</td>
                                <td>リージョン内に閉じた構成・コスト最適化</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>Global（推奨）</td>
                                <td>全リージョンの全サブネットに学習ルートを反映</td>
                                <td>マルチリージョン構成・HA設計</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className={sharedStyles.examTip}>
                    <span className={sharedStyles.tipLabel}>💡 BGP MED (Multi-Exit Discriminator)</span>
                    複数のBGPパスがある場合に、どのパスを優先するかを制御する属性。MEDが小さい方が優先されます。アクティブ/スタンバイの制御に活用します。
                </div>
            </div>
        </section>
    );
}
