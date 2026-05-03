import React from 'react';
import styles from './Section4.module.css';

export const Section4 = () => {
    return (
        <>
            <section id="compliance" className={`${styles.section} ${styles.sectionAlt}`}>
                <div className={styles.container}>
                    <div className={styles.sh}>
                        <div className={styles.shTag}>5.7 Compliance & Regulations</div>
                        <h2 className={styles.shTitle}>コンプライアンスと規制対応</h2>
                        <p className={styles.shDesc}>
                            GDPR・HIPAA・PCI DSS の要点と、Google Cloud
                            のコンプライアンス認証・支援サービスを理解します。
                        </p>
                    </div>

                    <div className={styles.compGrid} style={{ marginBottom: '2rem' }}>
                        <div className={styles.compCard}>
                            <div className={styles.compAbbr}>GDPR</div>
                            <div className={styles.compName}>EU 一般データ保護規則</div>
                            <div className={styles.compDesc}>
                                EU 居住者のデータを扱う全企業に適用（EU 外の企業も対象）。<br />削除権・アクセス権・ポータビリティ権。<br />違反時は最大
                                2,000 万ユーロ or 売上の 4%。
                            </div>
                            <div style={{ marginTop: '0.8rem' }}>
                                <span className={`${styles.badge} ${styles.badgeTeal}`}>EU データ保護</span>
                            </div>
                        </div>
                        <div className={styles.compCard}>
                            <div className={styles.compAbbr}>HIPAA</div>
                            <div className={styles.compName}>米国医療情報保護法</div>
                            <div className={styles.compDesc}>
                                PHI（医療情報）を扱う米国の医療機関・保険会社に適用。<br />Google Cloud
                                は BAA（Business Associate Agreement）を提供。<br />Cloud Healthcare API
                                が HIPAA 対応。
                            </div>
                            <div style={{ marginTop: '0.8rem' }}>
                                <span className={`${styles.badge} ${styles.badgeSky}`}>医療情報保護</span>
                            </div>
                        </div>
                        <div className={styles.compCard}>
                            <div className={styles.compAbbr}>PCI<br />DSS</div>
                            <div className={styles.compName}>クレジットカード業界基準</div>
                            <div className={styles.compDesc}>
                                カード情報を扱う全企業に適用。Visa / Mastercard 等が策定。<br />Google
                                Cloud の多くのサービスが PCI DSS Level 1 認定。<br />暗号化・アクセス制御・監査ログが要件。
                            </div>
                            <div style={{ marginTop: '0.8rem' }}>
                                <span className={`${styles.badge} ${styles.badgeAmber}`}>決済セキュリティ</span>
                            </div>
                        </div>
                        <div className={styles.compCard}>
                            <div className={styles.compAbbr}>ISO<br />27001</div>
                            <div className={styles.compName}>情報セキュリティ管理</div>
                            <div className={styles.compDesc}>
                                情報セキュリティ管理の国際規格。<br />ISO
                                27017（クラウドセキュリティ）<br />ISO 27018（クラウド個人情報保護）<br />Google
                                Cloud は認証取得済み。
                            </div>
                            <div style={{ marginTop: '0.8rem' }}>
                                <span className={`${styles.badge} ${styles.badgeGold}`}>国際規格</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.g2}>
                        <div className={styles.card}>
                            <div className={styles.cardTitle}>📑 Compliance Reports Manager</div>
                            <div className={styles.cardBody}>
                                Google Cloud のコンプライアンス認証文書（SOC レポート・ISO
                                認証書等）をセルフサービスでダウンロードできるツール。監査担当者への証拠提出が数分で完了。
                            </div>
                            <div style={{ marginTop: '0.8rem' }}>
                                <a
                                    href="https://cloud.google.com/security/compliance/compliance-reports-manager"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        color: '#d4882a',
                                        fontSize: '1rem',
                                        fontFamily: 'var(--ff-mono, "DM Mono", monospace)',
                                        textDecoration: 'none'
                                    }}
                                >
                                    cloud.google.com/security/compliance →
                                </a>
                            </div>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.cardTitle}>🔒 Assured Workloads</div>
                            <div className={styles.cardBody}>
                                規制要件（FedRAMP・HIPAA
                                等）に適合した論理的な境界をクリックで構築。データ保管地域の強制・担当者アクセス制限・暗号化コントロールを自動化。
                            </div>
                            <div style={{ marginTop: '0.8rem' }}>
                                <span className={`${styles.badge} ${styles.badgeTeal}`}>コンプライアンス自動化</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.infoBox} style={{ marginTop: '1.5rem' }}>
                        <strong style={{ color: 'var(--color-text-primary, #1a1a1a)' }}>🌏 データ主権とリージョン選択：</strong>
                        EU のデータは EU リージョン（<code style={{ background: 'rgba(0,0,0,0.05)', padding: '2px 4px', borderRadius: '3px' }}>europe-west1</code>
                        等）、日本のデータは日本リージョン（<code style={{ background: 'rgba(0,0,0,0.05)', padding: '2px 4px', borderRadius: '3px' }}>asia-northeast1</code> 東京）に保管。
                        組織ポリシー
                        <code style={{ background: 'rgba(0,0,0,0.05)', padding: '2px 4px', borderRadius: '3px' }}>constraints/gcp.resourceLocations</code>
                        で指定リージョン以外でのリソース作成を禁止することで GDPR
                        等のデータ主権要件に対応できます。
                    </div>

                    <div className={styles.src}>
                        <div className={styles.srcLabel}>📎 参考ソース</div>
                        <a href="https://cloud.google.com/security/compliance" target="_blank" rel="noopener noreferrer">
                            https://cloud.google.com/security/compliance
                        </a>
                        <a href="https://cloud.google.com/privacy/gdpr" target="_blank" rel="noopener noreferrer">
                            https://cloud.google.com/privacy/gdpr
                        </a>
                        <a href="https://cloud.google.com/security/compliance/pci-dss" target="_blank" rel="noopener noreferrer">
                            https://cloud.google.com/security/compliance/pci-dss
                        </a>
                    </div>
                </div>
            </section>

            {/* DLP */}
            <section id="dlp" className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.sh}>
                        <div className={styles.shTag}>5.8 Data Privacy & Sensitive Data Protection</div>
                        <h2 className={styles.shTitle}>
                            データプライバシーと Sensitive Data Protection<span className={styles.examTag}>頻出</span>
                        </h2>
                        <p className={styles.shDesc}>
                            匿名化・仮名化・トークン化の違い（再識別可否・GDPR
                            適用有無）が試験で最も問われるポイントです。
                        </p>
                    </div>

                    <div className={styles.infoBox} style={{ marginBottom: '1.5rem' }}>
                        <strong style={{ color: 'var(--color-text-primary, #1a1a1a)' }}>Sensitive Data Protection（旧 Cloud DLP）とは：</strong>
                        テキスト・画像・構造化データ内の機密情報を自動検出・分類・保護するサービス。 150
                        以上の組み込み情報タイプ（PII・医療情報・認証情報など）に対応。
                    </div>

                    <div className={styles.subTitle}>
                        7 つの保護手法<span className={styles.examTag}>試験で最頻出</span>
                    </div>
                    <div className={styles.dlpGrid}>
                        <div className={styles.dlpCard} style={{ borderLeftColor: '#3a6fa0' }}>
                            <div className={styles.dlpName} style={{ color: '#3a6fa0' }}>① 検出</div>
                            <div className={styles.dlpDesc}>
                                どこに機密データがあるかを<strong style={{ color: 'var(--color-text-primary, #1a1a1a)' }}>発見するだけ</strong>。BigQuery
                                の全テーブルをスキャンして PII を含む列を特定。
                            </div>
                            <div className={styles.dlpExample} style={{ color: 'var(--color-text-muted, #7a7470)' }}>
                                変更なし → 場所の把握のみ
                            </div>
                        </div>
                        <div className={styles.dlpCard} style={{ borderLeftColor: '#c4593a' }}>
                            <div className={styles.dlpName} style={{ color: '#c4593a' }}>② マスキング</div>
                            <div className={styles.dlpDesc}>
                                一部を「*」や「X」で<strong style={{ color: 'var(--color-text-primary, #1a1a1a)' }}>置き換え</strong>。末尾のみ表示などで必要最小限を残す。
                            </div>
                            <div className={styles.dlpExample} style={{ color: '#c4593a' }}>
                                090-1234-5678 → ***-****-5678
                            </div>
                        </div>
                        <div className={styles.dlpCard} style={{ borderLeftColor: '#d4882a' }}>
                            <div className={styles.dlpName} style={{ color: '#d4882a' }}>③ 仮名化 ⚠️</div>
                            <div className={styles.dlpDesc}>
                                識別子を仮の識別子に置換。<strong style={{ color: 'var(--color-text-primary, #1a1a1a)' }}>変換テーブルで元に戻せる</strong>（再識別可能）。GDPR
                                引き続き適用。
                            </div>
                            <div className={styles.dlpExample} style={{ color: '#d4882a' }}>
                                田中太郎 → UID-a7f3k
                            </div>
                        </div>
                        <div className={styles.dlpCard} style={{ borderLeftColor: '#4a7a5c' }}>
                            <div className={styles.dlpName} style={{ color: '#4a7a5c' }}>④ 匿名化 ✅</div>
                            <div className={styles.dlpDesc}>
                                識別情報を<strong style={{ color: 'var(--color-text-primary, #1a1a1a)' }}>完全に除去・元に戻せない</strong>。GDPR
                                規制対象外になる。研究データの公開に最適。
                            </div>
                            <div className={styles.dlpExample} style={{ color: '#4a7a5c' }}>
                                田中太郎・渋谷区 → 30代男性・東京都内
                            </div>
                        </div>
                        <div className={styles.dlpCard} style={{ borderLeftColor: '#3a6fa0' }}>
                            <div className={styles.dlpName} style={{ color: '#3a6fa0' }}>⑤ トークン化</div>
                            <div className={styles.dlpDesc}>
                                値を<strong style={{ color: 'var(--color-text-primary, #1a1a1a)' }}>ランダムなトークンに置換</strong>。同じ形式・長さを保つことも可能。PCI
                                DSS のカードデータに最適。
                            </div>
                            <div className={styles.dlpExample} style={{ color: '#3a6fa0' }}>
                                4111-xxxx → TOKEN-ab3f8x
                            </div>
                        </div>
                        <div className={styles.dlpCard} style={{ borderLeftColor: '#e05050' }}>
                            <div className={styles.dlpName} style={{ color: '#e05050' }}>⑥ 暗号化</div>
                            <div className={styles.dlpDesc}>
                                暗号化キーで暗号化。<strong style={{ color: 'var(--color-text-primary, #1a1a1a)' }}>鍵があれば復号可能</strong>。鍵管理が重要。Cloud
                                KMS と組み合わせる。
                            </div>
                            <div className={styles.dlpExample} style={{ color: '#e05050' }}>
                                090-1234-5678 → 3f8a…9d2c
                            </div>
                        </div>
                        <div className={styles.dlpCard} style={{ borderLeftColor: '#6b3f7a' }}>
                            <div className={styles.dlpName} style={{ color: '#6b3f7a' }}>⑦ 日付シフト</div>
                            <div className={styles.dlpDesc}>
                                日付をランダムにずらす。<strong style={{ color: 'var(--color-text-primary, #1a1a1a)' }}>統計的特性を保ちつつ</strong>個人を特定できなくする。医療・研究データに活用。
                            </div>
                            <div className={styles.dlpExample} style={{ color: '#6b3f7a' }}>
                                2024-01-15 → 2024-03-27（±数ヶ月）
                            </div>
                        </div>
                    </div>

                    <div className={styles.warnBox} style={{ marginTop: '1.5rem' }}>
                        <strong style={{ color: '#e05050' }}>⚠️ 試験の超頻出：匿名化 vs 仮名化の違い</strong><br />
                        <strong style={{ color: 'var(--color-text-primary, #1a1a1a)' }}>匿名化（Anonymization）</strong>：再識別不可能 → GDPR
                        規制対象外。データを公開・共有したい場合。<br />
                        <strong style={{ color: 'var(--color-text-primary, #1a1a1a)' }}>仮名化（Pseudonymization）</strong>：変換テーブルで再識別可能 → GDPR
                        引き続き適用。開発・テスト環境で本番データを使いたい場合。
                    </div>

                    <div className={styles.g3} style={{ marginTop: '1.5rem' }}>
                        <div className={styles.card}>
                            <div className={styles.cardTitle} style={{ fontSize: '1rem' }}>開発・テスト環境</div>
                            <div className={styles.cardBody}>
                                本番データを使う必要がある場合 →
                                <strong style={{ color: '#d4882a' }}>仮名化</strong><br />元データへの変換が可能なため、後から正式データでの検証もできる
                            </div>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.cardTitle} style={{ fontSize: '1rem' }}>
                                データの公開・研究利用
                            </div>
                            <div className={styles.cardBody}>
                                外部に公開・第三者と共有する場合 →
                                <strong style={{ color: '#4a7a5c' }}>匿名化</strong><br />GDPR
                                対象外になるため、規制の制約なしに活用できる
                            </div>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.cardTitle} style={{ fontSize: '1rem' }}>PCI DSS・決済データ</div>
                            <div className={styles.cardBody}>
                                クレジットカード番号の保護 →
                                <strong style={{ color: '#3a6fa0' }}>トークン化</strong><br />同じ形式・長さを維持しつつ実際のカード番号を隠蔽
                            </div>
                        </div>
                    </div>

                    <div className={styles.src}>
                        <div className={styles.srcLabel}>📎 参考ソース</div>
                        <a href="https://cloud.google.com/sensitive-data-protection/docs" target="_blank" rel="noopener noreferrer">
                            https://cloud.google.com/sensitive-data-protection/docs
                        </a>
                        <a
                            href="https://cloud.google.com/sensitive-data-protection/docs/pseudonymization"
                            target="_blank" rel="noopener noreferrer"
                        >
                            https://cloud.google.com/sensitive-data-protection/docs/pseudonymization
                        </a>
                        <a href="https://cloud.google.com/privacy" target="_blank" rel="noopener noreferrer">https://cloud.google.com/privacy</a>
                    </div>
                </div>
            </section>

            {/* CHECKLIST */}
            <section id="checklist" className={`${styles.section} ${styles.sectionAlt}`}>
                <div className={styles.container}>
                    <div className={styles.sh}>
                        <div className={styles.shTag}>Exam Preparation</div>
                        <h2 className={styles.shTitle}>試験直前チェックリスト＆頻出パターン</h2>
                        <p className={styles.shDesc}>
                            Section 5 の重要ポイントを確認し、頻出問題パターンで理解を深めましょう。
                        </p>
                    </div>

                    <div className={styles.g2} style={{ marginBottom: '2.5rem' }}>
                        <div>
                            <div
                                style={{
                                    fontFamily: 'var(--ff-mono, "DM Mono", monospace)',
                                    fontSize: '1rem',
                                    color: '#d4882a',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    marginBottom: '0.8rem',
                                }}
                            >
                                基礎・責任共有・ゼロトラスト
                            </div>
                            <div className={styles.checklist} style={{ marginBottom: '1.5rem' }}>
                                <div className={styles.clItem}>
                                    <div className={styles.clBox}>✓</div>
                                    責任共有モデルで Google
                                    とユーザーがそれぞれ何に責任を持つか説明できる
                                </div>
                                <div className={styles.clItem}>
                                    <div className={styles.clBox}>✓</div>
                                    ゼロトラスト・BeyondCorp
                                    の「ネットワーク内でも信頼しない」概念を説明できる
                                </div>
                                <div className={styles.clItem}>
                                    <div className={styles.clBox}>✓</div>
                                    多層防御（Defense in Depth）の 8 層を大まかに説明できる
                                </div>
                                <div className={styles.clItem}>
                                    <div className={styles.clBox}>✓</div>
                                    Cloud IAP が「VPN
                                    不要のゼロトラストアクセス制御」であることを説明できる
                                </div>
                            </div>
                            <div
                                style={{
                                    fontFamily: 'var(--ff-mono, "DM Mono", monospace)',
                                    fontSize: '1rem',
                                    color: '#d4882a',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    marginBottom: '0.8rem',
                                }}
                            >
                                IAM
                            </div>
                            <div className={styles.checklist} style={{ marginBottom: '1.5rem' }}>
                                <div className={styles.clItem}>
                                    <div className={styles.clBox}>✓</div>
                                    基本ロール（Owner/Editor/Viewer）を本番環境で使ってはいけない理由を説明できる
                                </div>
                                <div className={styles.clItem}>
                                    <div className={styles.clBox}>✓</div>
                                    事前定義ロール・カスタムロールの違いと使い分けを説明できる
                                </div>
                                <div className={styles.clItem}>
                                    <div className={styles.clBox}>✓</div>
                                    サービスアカウントキーのリスクと ADC・Workload Identity
                                    の代替手法を説明できる
                                </div>
                                <div className={styles.clItem}>
                                    <div className={styles.clBox}>✓</div>
                                    最小権限の原則の重要性を説明できる
                                </div>
                            </div>
                        </div>
                        <div>
                            <div
                                style={{
                                    fontFamily: 'var(--ff-mono, "DM Mono", monospace)',
                                    fontSize: '1rem',
                                    color: '#d4882a',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    marginBottom: '0.8rem',
                                }}
                            >
                                暗号化・ネットワーク
                            </div>
                            <div className={styles.checklist} style={{ marginBottom: '1.5rem' }}>
                                <div className={styles.clItem}>
                                    <div className={styles.clBox}>✓</div>
                                    暗号化の 3 状態（保存中・転送中・使用中）と Google
                                    のデフォルト対応を説明できる
                                </div>
                                <div className={styles.clItem}>
                                    <div className={styles.clBox}>✓</div>
                                    Google-Managed / CMEK / CSEK の違いと選択基準を説明できる
                                </div>
                                <div className={styles.clItem}>
                                    <div className={styles.clBox}>✓</div>
                                    Confidential VM が「使用中のデータも暗号化」することを説明できる
                                </div>
                                <div className={styles.clItem}>
                                    <div className={styles.clBox}>✓</div>
                                    Cloud Armor・Cloud IAP・VPC SC の役割の違いを即答できる
                                </div>
                            </div>
                            <div
                                style={{
                                    fontFamily: 'var(--ff-mono, "DM Mono", monospace)',
                                    fontSize: '1rem',
                                    color: '#d4882a',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.1em',
                                    marginBottom: '0.8rem',
                                }}
                            >
                                監視・コンプライアンス・DLP
                            </div>
                            <div className={styles.checklist}>
                                <div className={styles.clItem}>
                                    <div className={styles.clBox}>✓</div>
                                    監査ログの 4 種類（Admin Activity / Data Access / System Event /
                                    Policy Denied）を説明できる
                                </div>
                                <div className={styles.clItem}>
                                    <div className={styles.clBox}>✓</div>
                                    Admin Activity（常時有効・無料）と Data
                                    Access（要有効化・有料）の違いを説明できる
                                </div>
                                <div className={styles.clItem}>
                                    <div className={styles.clBox}>✓</div>
                                    匿名化（再識別不可・GDPR 対象外）と仮名化（再識別可能・GDPR
                                    対象）の違いを説明できる
                                </div>
                                <div className={styles.clItem}>
                                    <div className={styles.clBox}>✓</div>
                                    GDPR・HIPAA・PCI DSS の概要とそれぞれの適用対象を説明できる
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* EXAM PATTERNS */}
                    <div className={styles.subTitle}>頻出問題パターンと解法</div>
                    <div className={styles.g2}>
                        <div className={styles.ptnCard}>
                            <div className={styles.ptnHeader}>
                                <div className={styles.ptnNum}>01</div>
                                <div className={styles.ptnTitle}>責任共有モデル</div>
                            </div>
                            <div className={styles.ptnBody}>
                                <div className={styles.ptnQ}>
                                    「Cloud SQL を使用する企業で顧客の個人情報が漏洩した。Google
                                    と企業はそれぞれ何に責任を持つか？」
                                </div>
                                <ol className={styles.ptnSteps}>
                                    <li>Cloud SQL は PaaS → OS・エンジンは Google が管理</li>
                                    <li>データへのアクセス制御（IAM）はユーザーの責任</li>
                                    <li>個人情報の内容・アクセス管理はユーザーの責任</li>
                                </ol>
                                <div className={styles.ptnResult}>
                                    Google はインフラ保護、企業はデータとアクセス管理に責任
                                </div>
                            </div>
                        </div>

                        <div className={styles.ptnCard}>
                            <div className={styles.ptnHeader}>
                                <div className={styles.ptnNum}>02</div>
                                <div className={styles.ptnTitle}>暗号化鍵の選択</div>
                            </div>
                            <div className={styles.ptnBody}>
                                <div className={styles.ptnQ}>
                                    「金融機関が GCP
                                    に顧客データを保存。規制で『鍵は自社が管理しなければならない』と定められている。」
                                </div>
                                <ol className={styles.ptnSteps}>
                                    <li>「自社が鍵を管理」→ Google-Managed では不可</li>
                                    <li>Cloud KMS でユーザーが鍵を作成・管理 → CMEK が適切</li>
                                    <li>CSEK は管理コストが高い・今回は不要</li>
                                </ol>
                                <div className={styles.ptnResult}>
                                    答え：CMEK（Customer-Managed Encryption Keys）+ Cloud KMS
                                </div>
                            </div>
                        </div>

                        <div className={styles.ptnCard}>
                            <div className={styles.ptnHeader}>
                                <div className={styles.ptnNum}>03</div>
                                <div className={styles.ptnTitle}>匿名化 vs 仮名化</div>
                            </div>
                            <div className={styles.ptnBody}>
                                <div className={styles.ptnQ}>
                                    「医療研究機関が患者データを研究に使用したい。患者を特定できないようにしつつ
                                    GDPR 規制対象外にしたい。」
                                </div>
                                <ol className={styles.ptnSteps}>
                                    <li>GDPR 対象外にしたい → 再識別不可能であること</li>
                                    <li>仮名化は再識別可能 → GDPR 引き続き適用される</li>
                                    <li>匿名化は再識別不可能 → GDPR 対象外になる</li>
                                </ol>
                                <div className={styles.ptnResult}>
                                    答え：匿名化（Anonymization / De-identification）
                                </div>
                            </div>
                        </div>

                        <div className={styles.ptnCard}>
                            <div className={styles.ptnHeader}>
                                <div className={styles.ptnNum}>04</div>
                                <div className={styles.ptnTitle}>VPC SC の活用</div>
                            </div>
                            <div className={styles.ptnBody}>
                                <div className={styles.ptnQ}>
                                    「BigQuery
                                    に機密データを保存。社員のアカウントが侵害されても、外部プロジェクトへのデータエクスポートを防ぎたい。」
                                </div>
                                <ol className={styles.ptnSteps}>
                                    <li>認証情報が盗まれても境界外へのデータ移動を防ぎたい</li>
                                    <li>ファイアウォールや IAM だけでは認証情報盗難後は防げない</li>
                                    <li>VPC SC がデータの外部流出を境界で防止する</li>
                                </ol>
                                <div className={styles.ptnResult}>
                                    答え：VPC Service Controls（データ流出防止）
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CONFUSION TABLE */}
                    <div className={styles.subTitle} style={{ marginTop: '3rem' }}>混同しやすいポイントの整理</div>
                    <div className={styles.confWrap}>
                        <table className={styles.confTable}>
                            <thead>
                                <tr>
                                    <th>混同パターン</th>
                                    <th>✅ 正しい理解</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Cloud Armor = Cloud IAP</td>
                                    <td>
                                        Cloud Armor は外部攻撃（DDoS/WAF）を<em>ブロック</em>。Cloud IAP
                                        はアクセスのたびに<em>認証・認可</em>するゼロトラスト実装。
                                    </td>
                                </tr>
                                <tr>
                                    <td>CMEK = CSEK</td>
                                    <td>
                                        CMEK は Cloud KMS に鍵を保管（ユーザーが管理）。CSEK は GCP
                                        外で管理（リクエストのたびにユーザーが提供）。
                                    </td>
                                </tr>
                                <tr>
                                    <td>匿名化 = 仮名化</td>
                                    <td>
                                        匿名化は再識別不可（GDPR
                                        対象外）。仮名化は変換テーブルで再識別可能（GDPR
                                        引き続き適用）。
                                    </td>
                                </tr>
                                <tr>
                                    <td>Admin Activity = Data Access ログ</td>
                                    <td>
                                        Admin Activity は「設定変更」（常時有効・無料）。Data Access
                                        は「データの読み書き」（デフォルト無効・有料）。
                                    </td>
                                </tr>
                                <tr>
                                    <td>VPC SC = ファイアウォール</td>
                                    <td>
                                        ファイアウォールは L4 の通信制御。VPC SC
                                        は認証済みアクセスも含む API
                                        アクセスの境界制御（データ流出防止）。
                                    </td>
                                </tr>
                                <tr>
                                    <td>SCC = Cloud Logging</td>
                                    <td>
                                        SCC は脅威・設定ミスの<em>可視化と検出</em>。Cloud Logging
                                        はログの<em>収集・保存・分析</em>基盤。
                                    </td>
                                </tr>
                                <tr>
                                    <td>Google が全て守る</td>
                                    <td>
                                        Google
                                        はインフラを守るが、データとアクセス管理（IAM）はユーザーの責任（責任共有モデル）。
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
};
