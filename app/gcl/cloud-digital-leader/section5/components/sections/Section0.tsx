import React from 'react';
import styles from './Section0.module.css';

/**
 * Section0 コンポーネント
 * 
 * Cloud Digital Leader のセクションコンテンツを表示します。
 * 
 * @returns {JSX.Element} Section0 の JSX
 */
export const Section0 = () => {
    return (
        <section id="overview" className={styles.section}>
            <div className={styles.container}>
                <div className={styles.sh}>
                    <div className={styles.shTag}>Section 5 Overview</div>
                    <h2 className={styles.shTitle}>Section 5 の全体像と学習ポイント</h2>
                    <p className={styles.shDesc}>
                        試験ガイドに基づく出題範囲と、多層防御アーキテクチャの全体像を把握しましょう。
                    </p>
                </div>

                <div className={styles.g3}>
                    <div className={`${styles.card} ${styles.borderYellow}`}>
                        <div className={styles.cardIcon} aria-hidden="true">🏛️</div>
                        <div className={styles.cardTitle}>5.1 クラウドセキュリティの基礎</div>
                        <div className={styles.cardBody}>
                            責任共有モデル（Shared Responsibility）・ゼロトラスト / BeyondCorp・CIA
                            トライアド・多層防御（Defense in Depth）の概念。
                        </div>
                        <div style={{ marginTop: '0.8rem' }}>
                            <span className={`${styles.badge} ${styles.badgeGold}`}>基礎概念</span>
                        </div>
                    </div>
                    <div className={`${styles.card} ${styles.borderGreen}`}>
                        <div className={styles.cardIcon} aria-hidden="true">🔑</div>
                        <div className={styles.cardTitle}>5.2 IAM とアクセス管理</div>
                        <div className={styles.cardBody}>
                            Identity and Access Management・3
                            種のロール・最小権限の原則・サービスアカウントの安全管理・Cloud
                            Identity。
                        </div>
                        <div style={{ marginTop: '0.8rem' }}>
                            <span className={`${styles.badge} ${styles.badgeTeal}`}>IAM</span>
                        </div>
                    </div>
                    <div className={`${styles.card} ${styles.borderBlue}`}>
                        <div className={styles.cardIcon} aria-hidden="true">🔒</div>
                        <div className={styles.cardTitle}>5.3 暗号化とデータ保護</div>
                        <div className={styles.cardBody}>
                            保存中・転送中・使用中の暗号化・Google-Managed Keys / CMEK / CSEK・Cloud
                            KMS・Cloud HSM・Confidential Computing。
                        </div>
                        <div style={{ marginTop: '0.8rem' }}>
                            <span className={`${styles.badge} ${styles.badgeSky}`}>暗号化</span>
                        </div>
                    </div>
                    <div className={`${styles.card} ${styles.borderRed}`}>
                        <div className={styles.cardIcon} aria-hidden="true">🛡️</div>
                        <div className={styles.cardTitle}>5.4 ネットワークセキュリティ</div>
                        <div className={styles.cardBody}>
                            Cloud Armor（DDoS/WAF）・Cloud IAP（ゼロトラスト）・VPC Service
                            Controls（データ流出防止）・ファイアウォールルール。
                        </div>
                        <div style={{ marginTop: '0.8rem' }}>
                            <span className={`${styles.badge} ${styles.badgeAmber}`}>ネットワーク</span>
                        </div>
                    </div>
                    <div className={`${styles.card} ${styles.borderPurple}`}>
                        <div className={styles.cardIcon} aria-hidden="true">👁️</div>
                        <div className={styles.cardTitle}>5.5 脅威検出・セキュリティ監視</div>
                        <div className={styles.cardBody}>
                            Security Command Center・Cloud Audit Logs（4 種類）・Cloud
                            IDS・Chronicle（SIEM）の役割と使い分け。
                        </div>
                        <div style={{ marginTop: '0.8rem' }}>
                            <span className={`${styles.badge} ${styles.badgeRed}`}>監視・検出</span>
                        </div>
                    </div>
                    <div className={`${styles.card} ${styles.borderGreen}`}>
                        <div className={styles.cardIcon} aria-hidden="true">📋</div>
                        <div className={styles.cardTitle}>5.6 コンプライアンス・DLP</div>
                        <div className={styles.cardBody}>
                            GDPR・HIPAA・PCI DSS・Sensitive Data Protection
                            の保護手法（匿名化・仮名化・トークン化）とコンプライアンス認証。
                        </div>
                        <div style={{ marginTop: '0.8rem' }}>
                            <span className={`${styles.badge} ${styles.badgeTeal}`}>コンプライアンス</span>
                        </div>
                    </div>
                </div>

                <div className={styles.infoBox}>
                    <strong>📌 試験の重要ポイント：</strong>
                    Section 5 は試験全体の約 17% を占めます。
                    <strong>「誰が何に責任を持つか（責任共有モデル）」</strong>と
                    <strong>「各セキュリティサービスの役割の違い」</strong>が特に頻出です。
                </div>

                {/* DEFENSE IN DEPTH */}
                <div className={styles.subTitle}>
                    多層防御（Defense in Depth）<span className={styles.examTag}>頻出</span>
                </div>
                <div className={styles.layers}>
                    <div className={`${styles.layer} ${styles.l8}`}>
                        <span className={styles.layerNum}>8</span><span className={styles.layerIcon}>💾</span>
                        <div>
                            <div className={styles.layerName}>データ層</div>
                            <div className={styles.layerDesc}>
                                AES-256 暗号化（保存中・転送中・使用中）・Cloud KMS・CMEK・Sensitive
                                Data Protection
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.layer} ${styles.l7}`}>
                        <span className={styles.layerNum}>7</span><span className={styles.layerIcon}>🆔</span>
                        <div>
                            <div className={styles.layerName}>アイデンティティ層</div>
                            <div className={styles.layerDesc}>
                                IAM・MFA・Cloud
                                Identity・BeyondCorp・サービスアカウント管理・Workload Identity
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.layer} ${styles.l6}`}>
                        <span className={styles.layerNum}>6</span><span className={styles.layerIcon}>🖥️</span>
                        <div>
                            <div className={styles.layerName}>アプリケーション層</div>
                            <div className={styles.layerDesc}>
                                脆弱性スキャン・Web Security Scanner・Binary
                                Authorization（承認済みコンテナのみ実行）
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.layer} ${styles.l5}`}>
                        <span className={styles.layerNum}>5</span><span className={styles.layerIcon}>📱</span>
                        <div>
                            <div className={styles.layerName}>エンドポイント層</div>
                            <div className={styles.layerDesc}>
                                Chrome Enterprise・BeyondCorp Enterprise・デバイス管理・Endpoint
                                Verification
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.layer} ${styles.l4}`}>
                        <span className={styles.layerNum}>4</span><span className={styles.layerIcon}>🌐</span>
                        <div>
                            <div className={styles.layerName}>ネットワーク層</div>
                            <div className={styles.layerDesc}>
                                VPC・ファイアウォール・Cloud Armor（WAF/DDoS）・VPC Service
                                Controls・Cloud IAP・Cloud NAT
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.layer} ${styles.l3}`}>
                        <span className={styles.layerNum}>3</span><span className={styles.layerIcon}>⚙️</span>
                        <div>
                            <div className={styles.layerName}>インフラ層</div>
                            <div className={styles.layerDesc}>
                                Shielded VM・Confidential VM・OS Login・VM Manager（パッチ管理）
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.layer} ${styles.l2}`}>
                        <span className={styles.layerNum}>2</span><span className={styles.layerIcon}>🗄️</span>
                        <div>
                            <div className={styles.layerName}>ストレージ層</div>
                            <div className={styles.layerDesc}>
                                保存データの暗号化（デフォルト AES-256）・CMEK・Cloud HSM
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.layer} ${styles.l1}`}>
                        <span className={styles.layerNum}>1</span><span className={styles.layerIcon}>🏢</span>
                        <div>
                            <div className={styles.layerName}>ハードウェア / DC 層</div>
                            <div className={styles.layerDesc}>
                                Titan チップ（改ざん防止）・物理セキュリティ（24/7
                                監視）・廃棄ドライブの物理破壊
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.src}>
                    <div className={styles.srcLabel}>📎 公式ソース</div>
                    <a
                        href="https://services.google.com/fh/files/misc/cloud_digital_leader_exam_guide_english.pdf"
                        target="_blank" rel="noopener noreferrer"
                    >
                        Cloud Digital Leader Exam Guide (Official PDF)
                    </a>
                    <a href="https://cloud.google.com/security/overview" target="_blank" rel="noopener noreferrer">
                        https://cloud.google.com/security/overview
                    </a>
                    <a href="https://docs.cloud.google.com/docs/security/infrastructure/design" target="_blank" rel="noopener noreferrer">
                        https://docs.cloud.google.com/docs/security/infrastructure/design
                    </a>
                </div>
            </div>
        </section>
    );
};
