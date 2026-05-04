import React from 'react';
import styles from './Section3.module.css';

/**
 * Section3 コンポーネント
 * 
 * Cloud Digital Leader のセクションコンテンツを表示します。
 * 
 * @returns {JSX.Element} Section3 の JSX
 */
export const Section3 = () => {
    return (
        <>
            <section id="network" className={`${styles.section} ${styles.sectionAlt}`}>
                <div className={styles.container}>
                    <div className={styles.sh}>
                        <div className={styles.shTag}>5.5 Network Security</div>
                        <h2 className={styles.shTitle}>
                            ネットワークセキュリティ<span className={styles.examTag}>最重要</span>
                        </h2>
                        <p className={styles.shDesc}>
                            Cloud Armor・Cloud IAP・VPC Service Controls
                            の役割の違いを正確に理解することが試験の鍵です。
                        </p>
                    </div>

                    <div className={styles.g3} style={{ marginBottom: '2rem' }}>
                        <div className={`${styles.card} ${styles.borderRed}`}>
                            <div className={styles.cardIcon} aria-hidden="true">⚔️</div>
                            <div className={styles.cardTitle}>Cloud Armor</div>
                            <div className={styles.cardBody} style={{ marginBottom: '0.8rem' }}>
                                <strong style={{ color: 'var(--color-accent-foreground)' }}>
                                    DDoS 防御 + WAF（Web Application Firewall）
                                </strong>
                                <br />グローバルロードバランサーの手前でトラフィックをフィルタリング。Google
                                のグローバルネットワークのエッジで攻撃を遮断。
                            </div>
                            <ul className={`${styles.cardList} ${styles.cardListRed}`}>
                                <li>L3/L4 DDoS を自動的に検知・緩和</li>
                                <li>OWASP Top 10 の WAF ルールを適用</li>
                                <li>IP・地域ベースのブロック・レート制限</li>
                                <li>Adaptive Protection（ML で攻撃自動検出）</li>
                            </ul>
                            <div style={{ marginTop: '0.8rem' }}>
                                <span className={`${styles.badge} ${styles.badgeRed}`}>外部攻撃を防御</span>
                            </div>
                        </div>

                        <div className={`${styles.card} ${styles.borderYellow}`}>
                            <div className={styles.cardIcon} aria-hidden="true">🚪</div>
                            <div className={styles.cardTitle}>Cloud IAP（Identity-Aware Proxy）</div>
                            <div className={styles.cardBody} style={{ marginBottom: '0.8rem' }}>
                                <strong style={{ color: 'var(--color-accent-foreground)' }}>
                                    VPN 不要のゼロトラストアクセス制御
                                </strong>
                                <br />アプリ単位で認証・認可を実施。すべてのアクセスをログ記録。
                            </div>
                            <ul className={`${styles.cardList} ${styles.cardListGold}`}>
                                <li>VPN なしで社内アプリへセキュアアクセス</li>
                                <li>アクセスのたびに Google 認証 + MFA</li>
                                <li>IAM で誰がアクセスできるかを細かく制御</li>
                                <li>SSH・RDP への TCP トンネリングにも対応</li>
                            </ul>
                            <div style={{ marginTop: '0.8rem' }}>
                                <span className={`${styles.badge} ${styles.badgeGold}`}>ゼロトラスト実装</span>
                            </div>
                        </div>

                        <div className={`${styles.card} ${styles.borderBlue}`}>
                            <div className={styles.cardIcon} aria-hidden="true">🏰</div>
                            <div className={styles.cardTitle}>VPC Service Controls（VPC SC）</div>
                            <div className={styles.cardBody} style={{ marginBottom: '0.8rem' }}>
                                <strong style={{ color: 'var(--color-accent-foreground)' }}>
                                    データ流出（Exfiltration）防止の境界線
                                </strong>
                                <br />GCP
                                サービスの周囲にセキュリティ境界を作成。たとえ認証情報を盗まれても境界外からのアクセスをブロック。
                            </div>
                            <ul className={`${styles.cardList} ${styles.cardListSky}`}>
                                <li>BigQuery・Cloud Storage 等の周りに境界</li>
                                <li>認証情報盗難後の外部コピーを物理的にブロック</li>
                                <li>本番適用前に Dry Run モードで影響確認</li>
                            </ul>
                            <div style={{ marginTop: '0.8rem' }}>
                                <span className={`${styles.badge} ${styles.badgeSky}`}>データ流出防止</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.warnBox}>
                        <strong>⚠️ 試験頻出：3 サービスの役割の違い</strong><br />
                        <strong style={{ color: 'var(--color-accent-foreground)' }}>Cloud Armor</strong>：外部からの攻撃（DDoS・WAF）を<em>ブロック</em>する
                        → 外部攻撃防御<br />
                        <strong style={{ color: 'var(--color-accent-foreground)' }}>Cloud IAP</strong>：アクセスのたびに<em>認証・認可</em>する →
                        ゼロトラストアクセス制御<br />
                        <strong style={{ color: 'var(--color-accent-foreground)' }}>VPC Service Controls</strong>：データを境界内に<em>閉じ込める</em> →
                        内部からのデータ流出防止
                    </div>

                    <div className={styles.bpBox}>
                        <div className={styles.bpTitle}>✅ ベストプラクティス：ネットワークセキュリティ</div>
                        <ul>
                            <li>
                                すべての本番 ALB（Application Load Balancer）に
                                <strong>Cloud Armor</strong> を設定する。
                            </li>
                            <li>
                                SSH・RDP へのアクセスは
                                <strong>Cloud IAP</strong> 経由のみに限定し、VPN・外部 IP を不要にする。
                            </li>
                            <li>
                                機密データを含む BigQuery・Cloud Storage には
                                <strong>VPC SC</strong> を適用する（Dry Run で確認後に本番適用）。
                            </li>
                            <li>VM に外部 IP を付けず、Cloud NAT でアウトバウンドのみを確保する。</li>
                            <li>
                                VPC フローログを有効化してネットワークトラフィックを記録・監査する。
                            </li>
                        </ul>
                    </div>

                    <div className={styles.src}>
                        <div className={styles.srcLabel}>📎 参考ソース</div>
                        <a href="https://cloud.google.com/armor/docs" target="_blank" rel="noopener noreferrer">
                            https://cloud.google.com/armor/docs
                        </a>
                        <a href="https://cloud.google.com/iap/docs" target="_blank" rel="noopener noreferrer">
                            https://cloud.google.com/iap/docs
                        </a>
                        <a href="https://cloud.google.com/vpc-service-controls/docs" target="_blank" rel="noopener noreferrer">
                            https://cloud.google.com/vpc-service-controls/docs
                        </a>
                    </div>
                </div>
            </section>

            <section id="monitoring" className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.sh}>
                        <div className={styles.shTag}>5.6 Threat Detection & Security Monitoring</div>
                        <h2 className={styles.shTitle}>脅威検出とセキュリティ監視</h2>
                        <p className={styles.shDesc}>
                            Security Command Center・監査ログの 4 種類・Cloud IDS・Chronicle
                            の役割と使い分けを理解します。
                        </p>
                    </div>

                    <div className={styles.subTitle}>
                        Cloud 監査ログの 4 種類<span className={styles.examTag}>最重要</span>
                    </div>
                    <div className={styles.auditWrap} style={{ marginBottom: '2rem' }}>
                        <table className={styles.auditTable}>
                            <thead>
                                <tr>
                                    <th scope="col">ログ種別</th>
                                    <th scope="col">記録内容</th>
                                    <th scope="col">デフォルト</th>
                                    <th scope="col">料金</th>
                                    <th scope="col">保持期間</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>① Admin Activity<br />（管理アクティビティ）</td>
                                    <td>
                                        リソース作成・削除・IAM 変更・設定変更など「設定を変えた」操作
                                    </td>
                                    <td>
                                        <span className={`${styles.badge} ${styles.badgeTeal}`}>常に有効</span><br />
                                        <span style={{ fontSize: '0.9rem' }}>無効化不可</span>
                                    </td>
                                    <td>無料</td>
                                    <td>400 日</td>
                                </tr>
                                <tr>
                                    <td>② Data Access<br />（データアクセス）</td>
                                    <td>
                                        BigQuery クエリ・Cloud Storage
                                        ダウンロードなど「データを読み書きした」操作
                                    </td>
                                    <td>
                                        <span className={`${styles.badge} ${styles.badgeRed}`}>デフォルト無効</span><br />
                                        <span style={{ fontSize: '0.9rem' }}>要有効化</span>
                                    </td>
                                    <td>有料（大量）</td>
                                    <td>30 日</td>
                                </tr>
                                <tr>
                                    <td>③ System Event<br />（システムイベント）</td>
                                    <td>
                                        Google
                                        システムによる自動操作（ライブマイグレーション・自動スケーリング等）
                                    </td>
                                    <td><span className={`${styles.badge} ${styles.badgeTeal}`}>常に有効</span></td>
                                    <td>無料</td>
                                    <td>400 日</td>
                                </tr>
                                <tr>
                                    <td>④ Policy Denied<br />（ポリシー拒否）</td>
                                    <td>VPC Service Controls でブロックされたアクセスの記録</td>
                                    <td><span className={`${styles.badge} ${styles.badgeRed}`}>要有効化</span></td>
                                    <td>有料</td>
                                    <td>30 日</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className={styles.warnBox}>
                        <strong>⚠️ 試験頻出の区別：</strong>
                        <strong style={{ color: 'var(--color-accent-foreground)' }}>Admin Activity</strong>（管理アクティビティ）は「<em>設定を変えた</em>」操作 → 常に有効・無料。
                        <strong style={{ color: 'var(--color-accent-foreground)' }}>Data Access</strong>（データアクセス）は「<em>データを読み書きした</em>」操作 →
                        デフォルト無効・有効化が必要・有料。 機密データを扱うサービスでは必ず Data
                        Access ログを有効化する。
                    </div>

                    {/* SCC */}
                    <div className={styles.subTitle} style={{ marginTop: '2.5rem' }}>
                        Security Command Center（SCC）
                    </div>
                    <div className={styles.g2}>
                        <div className={styles.card}>
                            <div className={styles.cardTitle}>🎯 SCC が自動検出するもの</div>
                            <div style={{ fontSize: '0.95rem', color: 'var(--color-muted-foreground)' }}>
                                <div className={styles.sccItem}>
                                    <strong style={{ color: 'var(--cdl-yellow)' }}>設定ミス（Misconfiguration）</strong><br />
                                    公開されている Cloud Storage バケット・外部 IP の不適切な
                                    VM・弱いファイアウォールルール・MFA が未設定の特権ユーザー
                                </div>
                                <div className={styles.sccItem}>
                                    <strong style={{ color: 'var(--cdl-red)' }}>アクティブな脅威</strong><br />
                                    マルウェアの実行・異常な API
                                    コール（クリプトマイニング）・侵害された認証情報の利用・データ流出の試み
                                </div>
                                <div>
                                    <strong style={{ color: 'var(--cdl-blue)' }}>脆弱性</strong><br />
                                    脆弱なソフトウェアバージョン・CVE（既知の脆弱性）・コンテナイメージの脆弱性
                                </div>
                            </div>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.cardTitle}>🔍 他のセキュリティツールとの違い</div>
                            <div style={{ fontSize: '0.95rem', color: 'var(--color-muted-foreground)' }}>
                                <div className={styles.sccItem}>
                                    <span className={`${styles.badge} ${styles.badgeRed}`} style={{ marginBottom: '0.3rem' }}>SCC</span><br />
                                    GCP 全体の脅威・設定ミス・脆弱性を<strong style={{ color: 'var(--color-accent-foreground)' }}>一元可視化</strong>するダッシュボード。CSPM（Cloud Security Posture Management）。
                                </div>
                                <div className={styles.sccItem}>
                                    <span className={`${styles.badge} ${styles.badgeTeal}`} style={{ marginBottom: '0.3rem' }}>Cloud IDS</span><br />
                                    ネットワークトラフィックを<strong style={{ color: 'var(--color-accent-foreground)' }}>監視・検知</strong>（アラートのみ）。Palo Alto 脅威インテリジェンス活用。
                                </div>
                                <div>
                                    <span className={`${styles.badge} ${styles.badgeGold}`} style={{ marginBottom: '0.3rem' }}>Chronicle</span><br />
                                    Google スケールの SIEM / SOAR。ペタバイトのセキュリティログを<strong style={{ color: 'var(--color-accent-foreground)' }}>超高速分析</strong>。脅威ハンティング。
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.bpBox}>
                        <div className={styles.bpTitle}>✅ ベストプラクティス：セキュリティ監視</div>
                        <ul>
                            <li>
                                機密データを扱うサービスでは
                                <strong>Data Access 監査ログを必ず有効化</strong>する。
                            </li>
                            <li>
                                ログシンクで BigQuery へエクスポートして長期保存・SQL 分析を可能にする。
                            </li>
                            <li>
                                <strong>Security Command Center</strong>
                                を有効化してセキュリティ状況を継続的に自動スキャンする。
                            </li>
                            <li>
                                SCC
                                の検出結果（Findings）に対するアラートを設定し、高リスク項目を迅速に修正する。
                            </li>
                            <li>
                                Cloud Armor + Cloud IDS
                                の組み合わせで「ブロック」と「監視」の多層防御を構築する。
                            </li>
                        </ul>
                    </div>

                    <div className={styles.src}>
                        <div className={styles.srcLabel}>📎 参考ソース</div>
                        <a href="https://cloud.google.com/security-command-center/docs" target="_blank" rel="noopener noreferrer">
                            https://cloud.google.com/security-command-center/docs
                        </a>
                        <a href="https://cloud.google.com/logging/docs/audit" target="_blank" rel="noopener noreferrer">
                            https://cloud.google.com/logging/docs/audit
                        </a>
                        <a href="https://cloud.google.com/intrusion-detection-system/docs" target="_blank" rel="noopener noreferrer">
                            https://cloud.google.com/intrusion-detection-system/docs
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
};
