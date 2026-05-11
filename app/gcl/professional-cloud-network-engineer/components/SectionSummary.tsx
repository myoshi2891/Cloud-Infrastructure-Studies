import React from 'react';
import sharedStyles from './SharedSection.module.css';

/**
 * Render the final summary section including the Cheatsheet, TRAPS, and exam strategies.
 */
export function SectionSummary() {
    return (
        <>
            {/* Cheatsheet Section */}
            <section className={sharedStyles.section} id="cheatsheet" aria-labelledby="cheatsheet-title">
                <div className={sharedStyles.sectionLabel}>SUMMARY</div>
                <h2 className={sharedStyles.sectionTitle} id="cheatsheet-title" style={{ color: 'var(--color-theme-cdl-fg)' }}>
                    試験攻略チートシート ─ 頻出サービス早見表
                </h2>
                <p className={sharedStyles.sectionDesc}>
                    試験直前に確認すべきキーワードとサービスの紐付けを一覧にまとめました。
                </p>
                <div className={sharedStyles.divider}></div>

                <div className={`table-wrapper ${sharedStyles.tableWrapperMt}`}>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">サービス</th>
                                <th scope="col">最重要キーワード</th>
                                <th scope="col">主な用途</th>
                                <th scope="col">よく混同されるポイント</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={sharedStyles.tdName}>VPC</td>
                                <td>グローバルスコープ / Custom Mode</td>
                                <td>ネットワーク基盤</td>
                                <td>VPCはグローバル、サブネットはリージョン</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>Shared VPC</td>
                                <td>Host Project / Service Project / 集中管理</td>
                                <td>企業内ネットワーク統合</td>
                                <td>異組織間はVPC Peering（Shared VPCは同一組織のみ）</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>VPC Peering</td>
                                <td>推移的ルーティング不可 / CIDR重複不可</td>
                                <td>VPC間プライベート通信</td>
                                <td>A-B-CでAとCは通信不可（推移的ルーティング禁止）</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>HA VPN</td>
                                <td>99.99% SLA / BGP必須 / 2トンネル</td>
                                <td>オンプレとの暗号化接続</td>
                                <td>Classic VPN は99.9% SLA（新規非推奨）</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>Dedicated IC</td>
                                <td>専用線 / 10G or 100G / Meet-Me Location</td>
                                <td>大帯域オンプレ接続</td>
                                <td>Googleコロケ施設に直接接続できない場合はPartner IC</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>Cloud Router</td>
                                <td>BGP / 動的ルーティング / データ通過なし</td>
                                <td>ルート交換エンジン</td>
                                <td>データプレーンは通過しない（コントロールプレーンのみ）</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>Cloud NAT</td>
                                <td>アウトバウンドのみ / 外部IP不要</td>
                                <td>プライベートVM→インターネット</td>
                                <td>インバウンド接続は絶対に不可</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>Global HTTP(S) LB</td>
                                <td>L7 / Anycast / URL Map / CDN連携</td>
                                <td>Webアプリグローバル配信</td>
                                <td>Cloud ArmorはProxy型のみ対応</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>Network LB</td>
                                <td>L4 Passthrough / クライアントIP保持</td>
                                <td>非HTTP・UDP・クライアントIP必要</td>
                                <td>Cloud Armor使用不可（Passthrough型のため）</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>Cloud Armor</td>
                                <td>WAF / DDoS / OWASP / Rate Limiting</td>
                                <td>Webセキュリティ</td>
                                <td>外部Application LBにのみ適用可能</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>VPC SC</td>
                                <td>Service Perimeter / データ漏洩防止 / Exfiltration</td>
                                <td>高セキュリティ環境のAPI保護</td>
                                <td>IAMだけでは防げないデータ持ち出しを防ぐ</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>IAP</td>
                                <td>VPNなし / ゼロトラスト / 35.235.240.0/20</td>
                                <td>セキュアな管理アクセス</td>
                                <td>踏み台サーバーを代替する（外部IP不要）</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>Connectivity Test</td>
                                <td>仮想パケットトレース / 疎通確認</td>
                                <td>トラブルシューティング</td>
                                <td>実際にパケットを送らない（仮想的な分析）</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>Private Google Access</td>
                                <td>外部IPなし / GCPサービスアクセス</td>
                                <td>セキュアなGCPサービス利用</td>
                                <td>サブネット設定で有効化するだけ（簡単）</td>
                            </tr>
                            <tr>
                                <td className={sharedStyles.tdName}>PSC</td>
                                <td>プライベートエンドポイント / ピアリング不要</td>
                                <td>マネージドサービスへの接続</td>
                                <td>VPC Peeringより管理がシンプル</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* TRAPS Section */}
            <section className={sharedStyles.section} id="confusion" aria-labelledby="confusion-title">
                <div className={sharedStyles.sectionLabel}>TRAPS</div>
                <h2 className={sharedStyles.sectionTitle} id="confusion-title" style={{ color: 'var(--color-theme-genai-fg)' }}>
                    混同しやすいポイント ─ 試験の落とし穴
                </h2>
                <p className={sharedStyles.sectionDesc}>
                    受験者が誤りやすい概念の対比をまとめました。試験直前に必ず確認してください。
                </p>
                <div className={sharedStyles.divider}></div>

                <div style={{ display: 'grid', gap: '14px' }}>
                    <div className={sharedStyles.bpBox} style={{ borderColor: 'rgba(255, 87, 87, 0.4)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <span style={{ fontSize: '1rem' }}>❌</span>
                            <strong>「VPCはリージョンスコープだ」</strong>
                        </div>
                        <p style={{ margin: 0 }}>
                            VPC自体は<strong>グローバルスコープ</strong>です。リージョンスコープなのは<strong>サブネット</strong>です。1つのVPCが複数リージョンにまたがれるのがGCPの特徴です。
                        </p>
                    </div>

                    <div className={sharedStyles.bpBox} style={{ borderColor: 'rgba(255, 87, 87, 0.4)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <span style={{ fontSize: '1rem' }}>❌</span>
                            <strong>「Cloud VPN（全般）は99.99% SLA」</strong>
                        </div>
                        <p style={{ margin: 0 }}>
                            <strong>HA VPN</strong>が99.99% SLAです。<strong>Classic VPN</strong>は99.9% SLAです。新規構築ではHA VPNを使用してください。
                        </p>
                    </div>

                    <div className={sharedStyles.bpBox} style={{ borderColor: 'rgba(255, 87, 87, 0.4)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <span style={{ fontSize: '1rem' }}>❌</span>
                            <strong>「Cloud NATでインバウンド接続も受けられる」</strong>
                        </div>
                        <p style={{ margin: 0 }}>
                            Cloud NATは<strong>アウトバウンドのみ</strong>です。外部からの受信接続はできません。受信が必要な場合はロードバランサーや外部IPを使用します。
                        </p>
                    </div>

                    <div className={sharedStyles.bpBox} style={{ borderColor: 'rgba(255, 87, 87, 0.4)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <span style={{ fontSize: '1rem' }}>❌</span>
                            <strong>「VPC PeeringでA-B-Cがつながれば全VPCが通信できる」</strong>
                        </div>
                        <p style={{ margin: 0 }}>
                            推移的ルーティングは<strong>不可</strong>です。A→B→CとピアリングしてもAとCは通信できません。A-C間にも直接ピアリングが必要です。
                        </p>
                    </div>

                    <div className={sharedStyles.bpBox} style={{ borderColor: 'rgba(255, 87, 87, 0.4)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <span style={{ fontSize: '1rem' }}>❌</span>
                            <strong>「Cloud ArmorはすべてのLBで使える」</strong>
                        </div>
                        <p style={{ margin: 0 }}>
                            Cloud ArmorはProxy型LB（Application LB・TCP Proxy LB等）にのみ対応します。<strong>Passthrough型（Network LB・Internal TCP/UDP LB）では使えません</strong>。
                        </p>
                    </div>

                    <div className={sharedStyles.bpBox} style={{ borderColor: 'rgba(255, 87, 87, 0.4)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <span style={{ fontSize: '1rem' }}>❌</span>
                            <strong>「Dedicated InterconnectはどこでもGoogleと直接接続できる」</strong>
                        </div>
                        <p style={{ margin: 0 }}>
                            Dedicated InterconnectはGoogleが指定する<strong>コロケーション施設（Meet-Me Location）</strong>に物理接続できる場合のみ利用可能です。施設に接続できない場合はPartner Interconnectを使用します。
                        </p>
                    </div>

                    <div className={sharedStyles.bpBox} style={{ borderColor: 'rgba(255, 87, 87, 0.4)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <span style={{ fontSize: '1rem' }}>❌</span>
                            <strong>「IAMポリシーだけでデータ漏洩を完全に防げる」</strong>
                        </div>
                        <p style={{ margin: 0 }}>
                            IAMはユーザーのアクセス権限を制御しますが、正規ユーザーによるデータ持ち出し（Exfiltration）は防げません。<strong>VPC Service Controls</strong>でAPIの境界を設定することでデータ漏洩を防止します。
                        </p>
                    </div>
                </div>

                {/* Exam Strategies */}
                <h3 className="mt-12">試験当日の解答戦略</h3>
                <div className={sharedStyles.cardGrid}>
                    <div className={sharedStyles.card}>
                        <div className={sharedStyles.cardIcon}>🎯</div>
                        <div className={sharedStyles.cardTitle}>最もシンプルな解決策を選ぶ</div>
                        <div className={sharedStyles.cardBody}>
                            複雑な構成より管理が簡単なソリューションが正解になりやすい。「これをしなくてもあれで解決できる」という選択肢を探す。
                        </div>
                    </div>
                    <div className={sharedStyles.card}>
                        <div className={sharedStyles.cardIcon}>☁️</div>
                        <div className={sharedStyles.cardTitle}>マネージドサービスを優先</div>
                        <div className={sharedStyles.cardBody}>
                            自分で管理するより「Googleが管理するマネージドサービス」を選ぶのが基本方針。運用コストが低く、SLAも高い。
                        </div>
                    </div>
                    <div className={sharedStyles.card}>
                        <div className={sharedStyles.cardIcon}>🔄</div>
                        <div className={sharedStyles.cardTitle}>冗長性・HAの要件を必ず確認</div>
                        <div className={sharedStyles.cardBody}>
                            99.99% SLAが必要ならHA VPN・Interconnect複数Metro。SLAの数字と対応する構成を暗記する。
                        </div>
                    </div>
                    <div className={sharedStyles.card}>
                        <div className={sharedStyles.cardIcon}>💰</div>
                        <div className={sharedStyles.cardTitle}>コストと要件のバランス</div>
                        <div className={sharedStyles.cardBody}>
                            Dedicated Interconnectが必須かVPNで十分かを見極める。帯域・レイテンシ要件が鍵になる。
                        </div>
                    </div>
                    <div className={sharedStyles.card}>
                        <div className={sharedStyles.cardIcon}>🔐</div>
                        <div className={sharedStyles.cardTitle}>セキュリティは最小権限</div>
                        <div className={sharedStyles.cardBody}>
                            最も限定的なアクセスを許可するソリューションを選ぶ。「最小権限の原則」が常に正しい方向を示す。
                        </div>
                    </div>
                    <div className={sharedStyles.card}>
                        <div className={sharedStyles.cardIcon}>📡</div>
                        <div className={sharedStyles.cardTitle}>帯域要件で接続方式を選ぶ</div>
                        <div className={sharedStyles.cardBody}>
                            大帯域→Interconnect、中帯域→Partner IC、小帯域/コスト優先→VPN。この3段階の判断軸を常に意識する。
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
