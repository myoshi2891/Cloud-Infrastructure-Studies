import React from 'react';
import styles from './Section1.module.css';

/**
 * Section1 コンポーネント
 * 
 * Cloud Digital Leader のセクションコンテンツを表示します。
 * 
 * @returns {JSX.Element} Section1 の JSX
 */
export const Section1 = () => {
    return (
        <>
            <section id="shared" className={`${styles.section} ${styles.sectionAlt}`}>
                <div className={styles.container}>
                    <div className={styles.sh}>
                        <div className={styles.shTag}>5.1 Shared Responsibility</div>
                        <h2 className={styles.shTitle}>責任共有モデル<span className={styles.examTag}>最重要</span></h2>
                        <p className={styles.shDesc}>
                            Google
                            とユーザーがセキュリティ責任をどう分担するかを理解します。サービスモデルによって境界線が変わります。
                        </p>
                    </div>

                    <div className={styles.srWrap} style={{ marginBottom: '1.5rem' }}>
                        <table className={styles.srTable}>
                            <thead>
                                <tr>
                                    <th scope="col">責任領域</th>
                                    <th scope="col">SaaS（例: Google Workspace）</th>
                                    <th scope="col">PaaS（例: Cloud SQL）</th>
                                    <th scope="col">IaaS（例: Compute Engine）</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>データ・コンテンツ</td>
                                    <td><span className={`${styles.badge} ${styles.badgeAmber}`}>ユーザー</span></td>
                                    <td><span className={`${styles.badge} ${styles.badgeAmber}`}>ユーザー</span></td>
                                    <td><span className={`${styles.badge} ${styles.badgeAmber}`}>ユーザー</span></td>
                                </tr>
                                <tr>
                                    <td>ユーザー管理・IAM</td>
                                    <td><span className={`${styles.badge} ${styles.badgeAmber}`}>ユーザー</span></td>
                                    <td><span className={`${styles.badge} ${styles.badgeAmber}`}>ユーザー</span></td>
                                    <td><span className={`${styles.badge} ${styles.badgeAmber}`}>ユーザー</span></td>
                                </tr>
                                <tr>
                                    <td>アプリケーション</td>
                                    <td><span className={`${styles.badge} ${styles.badgeTeal}`}>Google</span></td>
                                    <td><span className={`${styles.badge} ${styles.badgeAmber}`}>ユーザー</span></td>
                                    <td><span className={`${styles.badge} ${styles.badgeAmber}`}>ユーザー</span></td>
                                </tr>
                                <tr>
                                    <td>OS・ランタイム</td>
                                    <td><span className={`${styles.badge} ${styles.badgeTeal}`}>Google</span></td>
                                    <td><span className={`${styles.badge} ${styles.badgeTeal}`}>Google</span></td>
                                    <td><span className={`${styles.badge} ${styles.badgeAmber}`}>ユーザー</span></td>
                                </tr>
                                <tr>
                                    <td>仮想化・ハイパーバイザー</td>
                                    <td><span className={`${styles.badge} ${styles.badgeTeal}`}>Google</span></td>
                                    <td><span className={`${styles.badge} ${styles.badgeTeal}`}>Google</span></td>
                                    <td><span className={`${styles.badge} ${styles.badgeTeal}`}>Google</span></td>
                                </tr>
                                <tr>
                                    <td>ネットワーク・ハードウェア</td>
                                    <td><span className={`${styles.badge} ${styles.badgeTeal}`}>Google</span></td>
                                    <td><span className={`${styles.badge} ${styles.badgeTeal}`}>Google</span></td>
                                    <td><span className={`${styles.badge} ${styles.badgeTeal}`}>Google</span></td>
                                </tr>
                                <tr>
                                    <td>データセンター物理セキュリティ</td>
                                    <td><span className={`${styles.badge} ${styles.badgeTeal}`}>Google</span></td>
                                    <td><span className={`${styles.badge} ${styles.badgeTeal}`}>Google</span></td>
                                    <td><span className={`${styles.badge} ${styles.badgeTeal}`}>Google</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className={styles.g2}>
                        <div className={`${styles.card} ${styles.borderLeftGreen}`}>
                            <div className={styles.cardTitle}>✅ Google が常に守るもの</div>
                            <ul style={{ listStyle: 'none', fontSize: '1rem', color: 'var(--color-muted-foreground)', padding: 0, margin: 0 }}>
                                <li style={{ padding: '0.35rem 0 0.35rem 1.2rem', position: 'relative', borderBottom: '1px solid var(--color-border)' }}>
                                    <span style={{ position: 'absolute', left: 0, color: 'var(--cdl-green)' }}>›</span>データセンターへの物理的な侵入防止
                                </li>
                                <li style={{ padding: '0.35rem 0 0.35rem 1.2rem', position: 'relative', borderBottom: '1px solid var(--color-border)' }}>
                                    <span style={{ position: 'absolute', left: 0, color: 'var(--cdl-green)' }}>›</span>ハードウェアの完全性（Titan チップ）
                                </li>
                                <li style={{ padding: '0.35rem 0 0.35rem 1.2rem', position: 'relative', borderBottom: '1px solid var(--color-border)' }}>
                                    <span style={{ position: 'absolute', left: 0, color: 'var(--cdl-green)' }}>›</span>ネットワークインフラへの攻撃対策
                                </li>
                                <li style={{ padding: '0.35rem 0 0.35rem 1.2rem', position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: 0, color: 'var(--cdl-green)' }}>›</span>ハイパーバイザーの脆弱性対応
                                </li>
                            </ul>
                        </div>
                        <div className={`${styles.card} ${styles.borderLeftYellow}`}>
                            <div className={styles.cardTitle}>⚠️ ユーザーが常に守るもの</div>
                            <ul style={{ listStyle: 'none', fontSize: '1rem', color: 'var(--color-muted-foreground)', padding: 0, margin: 0 }}>
                                <li style={{ padding: '0.35rem 0 0.35rem 1.2rem', position: 'relative', borderBottom: '1px solid var(--color-border)' }}>
                                    <span style={{ position: 'absolute', left: 0, color: 'var(--cdl-yellow)' }}>›</span>誰がデータにアクセスできるか（IAM 設定）
                                </li>
                                <li style={{ padding: '0.35rem 0 0.35rem 1.2rem', position: 'relative', borderBottom: '1px solid var(--color-border)' }}>
                                    <span style={{ position: 'absolute', left: 0, color: 'var(--cdl-yellow)' }}>›</span>データの分類と適切な保護設定
                                </li>
                                <li style={{ padding: '0.35rem 0 0.35rem 1.2rem', position: 'relative', borderBottom: '1px solid var(--color-border)' }}>
                                    <span style={{ position: 'absolute', left: 0, color: 'var(--cdl-yellow)' }}>›</span>アプリケーションのセキュリティ
                                </li>
                                <li style={{ padding: '0.35rem 0 0.35rem 1.2rem', position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: 0, color: 'var(--cdl-yellow)' }}>›</span>エンドユーザーの認証・認可設定
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.warnBox} style={{ marginTop: '1.5rem' }}>
                        <strong>⚠️ 試験頻出の引っかけ：</strong>
                        「Google Cloud はセキュアだから、ユーザーは何もしなくていい」→
                        <strong style={{ color: 'var(--cdl-yellow)' }}>誤り！</strong>
                        データへのアクセス制御（IAM）・データの保護設定・アプリのセキュリティは常にユーザーの責任です。
                        Google
                        は<em>インフラ</em>を守りますが、<em>データとアクセス管理</em>はユーザーの責任です。
                    </div>

                    <div className={styles.src}>
                        <div className={styles.srcLabel}>📎 参考ソース</div>
                        <a
                            href="https://docs.cloud.google.com/architecture/framework/security/shared-responsibility-shared-fate"
                            target="_blank" rel="noopener noreferrer"
                        >
                            https://docs.cloud.google.com/architecture/framework/security/shared-responsibility-shared-fate
                        </a>
                        <a href="https://cloud.google.com/security/shared-fate" target="_blank" rel="noopener noreferrer">
                            https://cloud.google.com/security/shared-fate
                        </a>
                    </div>
                </div>
            </section>

            <section id="zerotrust" className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.sh}>
                        <div className={styles.shTag}>5.2 Zero Trust / BeyondCorp</div>
                        <h2 className={styles.shTitle}>
                            ゼロトラストと BeyondCorp<span className={styles.examTag}>頻出</span>
                        </h2>
                        <p className={styles.shDesc}>
                            「Never Trust, Always
                            Verify（決して信頼せず、常に検証する）」という現代のセキュリティアーキテクチャの基本思想。
                        </p>
                    </div>

                    <div className={styles.ztDiagram} style={{ marginBottom: '2rem' }}>
                        <div
                            style={{
                                fontFamily: 'var(--ff-mono, \'DM Mono\', monospace)',
                                fontSize: '1rem',
                                color: 'color-mix(in srgb, var(--color-accent-foreground) 50%, transparent)',
                                marginBottom: '1.5rem',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                            }}
                        >
                            従来の境界型セキュリティ vs ゼロトラスト
                        </div>
                        <div className={styles.ztCompare}>
                            <div className={`${styles.ztCol} ${styles.ztColOld}`}>
                                <div className={styles.ztColTitle}>❌ 従来の「城とお堀」モデル</div>
                                <ul>
                                    <li>社内ネットワーク内にいる = 信頼できる</li>
                                    <li>ファイアウォールで外部を遮断</li>
                                    <li>一度侵入されると内部を自由に移動（横移動）</li>
                                    <li>テレワーク・クラウド時代には「社内」という概念が崩壊</li>
                                    <li>内部犯行・認証情報窃取に無防備</li>
                                </ul>
                            </div>
                            <div className={`${styles.ztCol} ${styles.ztColNew}`}>
                                <div className={styles.ztColTitle}>✅ ゼロトラスト（BeyondCorp）</div>
                                <ul>
                                    <li>ネットワークの場所は信頼の根拠にならない</li>
                                    <li>アクセスのたびに「誰が・どのデバイスで・何に」を検証</li>
                                    <li>リソースごとに最小限のアクセス権を付与</li>
                                    <li>すべてのアクセスがログ記録される</li>
                                    <li>デバイスの健全性・ユーザー認証・コンテキストを総合判断</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className={styles.subTitle}>Google の BeyondCorp 実装サービス</div>
                    <div className={styles.g3}>
                        <div className={`${styles.card} ${styles.borderYellow}`}>
                            <div className={styles.cardIcon} aria-hidden="true">🚪</div>
                            <div className={styles.cardTitle}>Cloud Identity-Aware Proxy（IAP）</div>
                            <div className={styles.cardBody}>
                                VPN
                                なしで社内アプリへのセキュアなアクセスを実現。アプリ単位でユーザーを認証・認可し、すべてのアクセスをログ記録。
                            </div>
                            <div style={{ marginTop: '0.8rem' }}>
                                <span className={`${styles.badge} ${styles.badgeGold}`}>ゼロトラストの中心</span>
                            </div>
                        </div>
                        <div className={`${styles.card} ${styles.borderGreen}`}>
                            <div className={styles.cardIcon} aria-hidden="true">📋</div>
                            <div className={styles.cardTitle}>Context-Aware Access</div>
                            <div className={styles.cardBody}>
                                場所・デバイス・時間帯などのコンテキストに応じてアクセスを制御。「管理されたデバイスからのみ本番へアクセス可」などを実装。
                            </div>
                            <div style={{ marginTop: '0.8rem' }}>
                                <span className={`${styles.badge} ${styles.badgeTeal}`}>条件付きアクセス</span>
                            </div>
                        </div>
                        <div className={`${styles.card} ${styles.borderBlue}`}>
                            <div className={styles.cardIcon} aria-hidden="true">🏢</div>
                            <div className={styles.cardTitle}>BeyondCorp Enterprise</div>
                            <div className={styles.cardBody}>
                                企業全体のゼロトラスト導入を支援するマネージドプラットフォーム。デバイス検証・ユーザー認証・アクセスポリシーを統合管理。
                            </div>
                            <div style={{ marginTop: '0.8rem' }}>
                                <span className={`${styles.badge} ${styles.badgeSky}`}>エンタープライズ</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.src}>
                        <div className={styles.srcLabel}>📎 参考ソース</div>
                        <a href="https://cloud.google.com/beyondcorp" target="_blank" rel="noopener noreferrer">
                            https://cloud.google.com/beyondcorp
                        </a>
                        <a href="https://cloud.google.com/iap/docs" target="_blank" rel="noopener noreferrer">
                            https://cloud.google.com/iap/docs
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
};
