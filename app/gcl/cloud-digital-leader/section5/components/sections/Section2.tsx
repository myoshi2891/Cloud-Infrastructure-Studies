import styles from '@/app/gcl/cloud-digital-leader/section5/components/sections/Section2.module.css';

/**
 * Section2 コンポーネント
 * 
 * Cloud Digital Leader のセクションコンテンツを表示します。
 * 
 * @returns {JSX.Element} Section2 の JSX
 */
export const Section2 = () => {
    return (
        <>
            <section id="iam" aria-labelledby="iam-heading" className={`${styles.section} ${styles.sectionAlt}`}>
                <div className={styles.container}>
                    <div className={styles.sh}>
                        <div className={styles.shTag}>5.3 Identity and Access Management</div>
                        <h2 id="iam-heading" className={styles.shTitle}>
                            IAM（アイデンティティとアクセス管理）<span className={styles.examTag} aria-hidden="true">最重要</span>
                        </h2>
                        <p className={styles.shDesc}>
                            「誰が（Who）・何に（Resource）・何ができるか（Permission）」を制御するクラウドセキュリティの中核システム。
                        </p>
                    </div>

                    <div className={styles.g3} style={{ marginBottom: '2rem' }}>
                        <div
                            className={styles.card}
                            style={{
                                background: 'color-mix(in srgb, var(--color-cdl-warning) 6%, transparent)',
                                borderColor: 'color-mix(in srgb, var(--color-cdl-warning) 20%, transparent)',
                            }}
                        >
                            <div
                                className={styles.warningMono}
                            >
                                PRINCIPAL / 主体（誰が）
                            </div>
                            <ul role="list" aria-label="主体の種類の一覧" style={{ listStyle: 'none', fontSize: '1rem', color: 'var(--color-muted-foreground)', padding: 0, margin: 0 }}>
                                <li style={{ marginBottom: '0.4rem' }}>
                                    👤 Google アカウント（個人ユーザー）
                                </li>
                                <li style={{ marginBottom: '0.4rem' }}>
                                    👥 Google グループ
                                    <span className={`${styles.badge} ${styles.badgeTeal}`} style={{ fontSize: '0.85rem', marginLeft: '0.5rem' }}>推奨</span>
                                </li>
                                <li style={{ marginBottom: '0.4rem' }}>
                                    🤖 サービスアカウント（アプリ・VM）
                                </li>
                                <li style={{ marginBottom: '0.4rem' }}>🌐 Cloud Identity ドメイン</li>
                                <li style={{ color: 'var(--color-cdl-error)' }}>
                                    ⚠️ allUsers / allAuthenticatedUsers（公開設定 — 原則使用禁止）
                                </li>
                            </ul>
                        </div>
                        <div
                            className={styles.card}
                            style={{
                                background: 'color-mix(in srgb, var(--color-cdl-success) 5%, transparent)',
                                borderColor: 'color-mix(in srgb, var(--color-cdl-success) 15%, transparent)',
                            }}
                        >
                            <div
                                className={styles.successMono}
                            >
                                ROLE / ロール（何ができるか）
                            </div>
                            <div style={{ fontSize: '1rem', color: 'var(--color-muted-foreground)' }}>
                                <div style={{ marginBottom: '0.5rem' }}>
                                    <span className={`${styles.badge} ${styles.badgeRed}`}>非推奨</span>
                                    <strong style={{ color: 'var(--color-accent-foreground)', marginLeft: '0.5rem' }}>基本ロール</strong> — Owner / Editor / Viewer<br />
                                    <span style={{ fontSize: '0.95rem' }}>プロジェクト全体に広すぎる権限。本番環境では使用禁止。</span>
                                </div>
                                <div style={{ marginBottom: '0.5rem' }}>
                                    <span className={`${styles.badge} ${styles.badgeTeal}`}>推奨</span>
                                    <strong style={{ color: 'var(--color-accent-foreground)', marginLeft: '0.5rem' }}>事前定義ロール</strong><br />
                                    <span style={{ fontSize: '0.95rem' }}>特定サービスに最適化。Google が管理・更新。</span>
                                </div>
                                <div>
                                    <span className={`${styles.badge} ${styles.badgeSky}`}>精密</span>
                                    <strong style={{ color: 'var(--color-accent-foreground)', marginLeft: '0.5rem' }}>カスタムロール</strong><br />
                                    <span style={{ fontSize: '0.95rem' }}>必要な権限だけを独自に組み合わせ。最小権限の徹底実現。</span>
                                </div>
                            </div>
                        </div>
                        <div
                            className={styles.card}
                            style={{
                                background: 'color-mix(in srgb, var(--color-cdl-info) 5%, transparent)',
                                borderColor: 'color-mix(in srgb, var(--color-cdl-info) 15%, transparent)',
                            }}
                        >
                            <div
                                className={styles.infoMono}
                            >
                                RESOURCE / リソース（何に対して）
                            </div>
                            <div style={{ fontSize: '1rem', color: 'var(--color-muted-foreground)' }}>
                                <div style={{ marginBottom: '0.4rem' }}>🏢 組織（Organization）— 全体に継承</div>
                                <div style={{ marginBottom: '0.4rem' }}>📁 フォルダ（Folder）— 部門単位</div>
                                <div style={{ marginBottom: '0.4rem' }}>📂 プロジェクト（Project）— アプリ単位</div>
                                <div>⚙️ 個別リソース（VM・バケット・DB）</div>
                                <div
                                    style={{
                                        marginTop: '0.7rem',
                                        fontSize: '0.95rem',
                                        color: 'var(--color-muted-foreground)',
                                        fontStyle: 'italic',
                                    }}
                                >
                                    ⚠️ 権限は上位から下位へ継承。下位では取り消せない。
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ROLE COMPARISON */}
                    <h3 className={styles.subTitle}>
                        3 種類のロール詳細比較<span className={styles.examTag} aria-hidden="true">頻出</span>
                    </h3>
                    <div className={styles.roleWrap}>
                        <table className={styles.roleTable}>
                            <thead>
                                <tr>
                                    <th scope="col">種類</th>
                                    <th scope="col">権限の範囲</th>
                                    <th scope="col">管理主体</th>
                                    <th scope="col">推奨度</th>
                                    <th scope="col">使い所</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        基本ロール<br />
                                        <code style={{ fontSize: '0.95rem', background: 'color-mix(in srgb, var(--color-cdl-error) 10%, transparent)', padding: '2px 4px', borderRadius: '3px', color: 'var(--color-cdl-error)' }}>Owner/Editor/Viewer</code>
                                    </td>
                                    <td>プロジェクト全体に広範な権限。非常に粗い粒度。</td>
                                    <td>Google</td>
                                    <td><span className={`${styles.badge} ${styles.badgeRed}`}>本番禁止</span></td>
                                    <td>テスト環境・サンドボックスのみ</td>
                                </tr>
                                <tr>
                                    <td>
                                        事前定義ロール<br />
                                        <code style={{ fontSize: '0.95rem', background: 'color-mix(in srgb, var(--color-cdl-success) 10%, transparent)', padding: '2px 4px', borderRadius: '3px', color: 'var(--color-cdl-success)' }}>roles/bigquery.dataViewer</code>
                                    </td>
                                    <td>特定サービスの特定操作に最適化された細かい権限セット</td>
                                    <td>Google（自動更新）</td>
                                    <td><span className={`${styles.badge} ${styles.badgeTeal}`}>推奨</span></td>
                                    <td>ほとんどのユースケース</td>
                                </tr>
                                <tr>
                                    <td>カスタムロール</td>
                                    <td>ユーザーが個別権限を選んで組み合わせた独自ロール</td>
                                    <td>ユーザー（手動管理）</td>
                                    <td><span className={`${styles.badge} ${styles.badgeSky}`}>精密制御</span></td>
                                    <td>特殊なコンプライアンス要件</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* SERVICE ACCOUNT */}
                    <h3 className={styles.subTitle}>
                        サービスアカウントの安全管理<span className={styles.examTag} aria-hidden="true">頻出</span>
                    </h3>
                    <div className={styles.g2}>
                        <div className={`${styles.card} ${styles.borderLeftRed}`}>
                            <h4 className={styles.cardTitle}>❌ サービスアカウントキーの危険性</h4>
                            <div className={styles.cardBody} style={{ marginBottom: '0.8rem' }}>
                                JSON
                                キーファイルは有効期限なしの認証情報。漏洩すると攻撃者が任意の時間・場所から
                                GCP にアクセス可能。コードリポジトリへの誤コミットが最大リスク。
                            </div>
                            <div className={styles.warnBox} style={{ marginTop: '0.5rem', fontSize: '0.95rem', padding: '1rem' }}>
                                <strong>組織ポリシーで禁止推奨：</strong><br />
                                <code style={{ fontFamily: 'var(--font-mono, "DM Mono", monospace)', background: 'color-mix(in srgb, var(--color-cdl-error) 10%, transparent)', padding: '2px 4px', borderRadius: '3px', marginTop: '0.4rem', display: 'inline-block', color: 'var(--color-cdl-error)' }}>constraints/iam.disableServiceAccountKeyCreation</code>
                            </div>
                        </div>
                        <div className={`${styles.card} ${styles.borderLeftGreen}`}>
                            <h4 className={styles.cardTitle}>✅ キーなしの代替認証手法</h4>
                            <ul role="list" aria-label="キーなしの代替認証手法" style={{ listStyle: 'none', fontSize: '1rem', color: 'var(--color-muted-foreground)', padding: 0, margin: 0 }}>
                                <li style={{ padding: '0.4rem 0 0.4rem 1.2rem', position: 'relative', borderBottom: '1px solid var(--color-border)' }}>
                                    <span style={{ position: 'absolute', left: 0, color: 'var(--color-cdl-success)' }}>①</span>
                                    <strong style={{ color: 'var(--color-accent-foreground)' }}>Application Default Credentials（ADC）</strong>
                                    <br />— VM・Cloud Run は自動認証
                                </li>
                                <li style={{ padding: '0.4rem 0 0.4rem 1.2rem', position: 'relative', borderBottom: '1px solid var(--color-border)' }}>
                                    <span style={{ position: 'absolute', left: 0, color: 'var(--color-cdl-success)' }}>②</span>
                                    <strong style={{ color: 'var(--color-accent-foreground)' }}>Workload Identity（GKE）</strong>
                                    <br />— Pod に SA を直接紐付け
                                </li>
                                <li style={{ padding: '0.4rem 0 0.4rem 1.2rem', position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: 0, color: 'var(--color-cdl-success)' }}>③</span>
                                    <strong style={{ color: 'var(--color-accent-foreground)' }}>Workload Identity Federation</strong>
                                    <br />— AWS・GitHub Actions との連携（短期トークン）
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.bpBox}>
                        <h3 className={styles.bpTitle} aria-label="ベストプラクティス：IAM">✅ ベストプラクティス：IAM</h3>
                        <ul role="list" aria-label="IAM のベストプラクティス">
                            <li>
                                基本ロール（Owner/Editor/Viewer）は本番環境で<strong>絶対に使用しない</strong>。事前定義ロールを使う。
                            </li>
                            <li>
                                個人ではなく<strong>グループにロールを付与</strong>する（メンバー変更時の管理効率化）。
                            </li>
                            <li>最小権限の原則：タスクに必要な最小限のロールのみを付与する。</li>
                            <li>IAM Recommender で過剰権限を定期的に検出・削除する。</li>
                            <li>
                                サービスアカウントキーの作成を組織ポリシーで禁止し、ADC / Workload
                                Identity を使用する。
                            </li>
                            <li>Admin Activity 監査ログで権限変更を継続的に監視する。</li>
                        </ul>
                    </div>

                    <div className={styles.src}>
                        <div className={styles.srcLabel}>📎 参考ソース</div>
                        <a href="https://cloud.google.com/iam/docs/overview" target="_blank" rel="noopener noreferrer">Cloud IAM overview</a>
                        <a href="https://cloud.google.com/iam/docs/best-practices" target="_blank" rel="noopener noreferrer">IAM best practices</a>
                        <a href="https://cloud.google.com/iam/docs/service-account-overview" target="_blank" rel="noopener noreferrer">Service Accounts overview</a>
                        <a href="https://cloud.google.com/iam/docs/workload-identity-federation" target="_blank" rel="noopener noreferrer">Workload Identity Federation</a>
                    </div>
                </div>
            </section>

            {/* ENCRYPTION */}
            <section id="encryption" aria-labelledby="encryption-heading" className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.sh}>
                        <div className={styles.shTag}>5.4 Encryption & Data Protection</div>
                        <h2 id="encryption-heading" className={styles.shTitle}>暗号化とデータ保護<span className={styles.examTag} aria-hidden="true">最重要</span></h2>
                        <p className={styles.shDesc}>
                            データの 3 つの状態での暗号化と、Cloud KMS
                            による鍵管理オプションを理解します。
                        </p>
                    </div>

                    {/* 3 STATES */}
                    <h3 className={styles.subTitle}>データの 3 つの状態と暗号化</h3>
                    <div className={styles.encRow} style={{ marginBottom: '2rem' }}>
                        <div className={styles.encItem}>
                            <div
                                className={styles.encNum}
                                style={{ background: 'color-mix(in srgb, var(--color-cdl-warning) 15%, transparent)', color: 'var(--color-cdl-warning)' }}
                            >
                                ①
                            </div>
                            <div>
                                <div className={styles.encTitle} style={{ color: 'var(--color-cdl-warning)' }}>
                                    保存中（Data at Rest）
                                </div>
                                <div className={styles.encDesc}>
                                    ストレージ（ディスク・データベース）に保存された状態のデータ。例：Cloud
                                    Storage・BigQuery・Persistent Disk のデータ。<br />
                                    <strong style={{ color: 'var(--color-cdl-warning)' }}>
                                        Google のデフォルト：AES-256
                                        で全データを自動暗号化（追加設定・費用不要）
                                    </strong>
                                </div>
                            </div>
                        </div>
                        <div className={styles.encItem}>
                            <div
                                className={styles.encNum}
                                style={{ background: 'color-mix(in srgb, var(--color-cdl-info) 15%, transparent)', color: 'var(--color-cdl-info)' }}
                            >
                                ②
                            </div>
                            <div>
                                <div className={styles.encTitle} style={{ color: 'var(--color-cdl-info)' }}>
                                    転送中（Data in Transit）
                                </div>
                                <div className={styles.encDesc}>
                                    ネットワーク経由で移動中のデータ。例：ブラウザから Cloud Storage
                                    へのアップロード・サービス間 API 通信。<br />
                                    <strong style={{ color: 'var(--color-cdl-info)' }}>
                                        Google のデフォルト：TLS 1.2
                                        以上で全通信を自動暗号化。内部通信は ALTS を使用。
                                    </strong>
                                </div>
                            </div>
                        </div>
                        <div className={styles.encItem}>
                            <div
                                className={styles.encNum}
                                style={{ background: 'color-mix(in srgb, var(--color-cdl-success) 15%, transparent)', color: 'var(--color-cdl-success)' }}
                            >
                                ③
                            </div>
                            <div>
                                <div className={styles.encTitle} style={{ color: 'var(--color-cdl-success)' }}>
                                    使用中（Data in Use）
                                </div>
                                <div className={styles.encDesc}>
                                    メモリ（RAM）上で処理されている状態のデータ。従来は平文のままだった唯一の状態。<br />
                                    <strong style={{ color: 'var(--color-cdl-success)' }}>
                                        Confidential VM・Confidential GKE Nodes で AMD SEV
                                        技術を使いメモリも暗号化。
                                    </strong>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.infoBox}>
                        <strong>🔑 重要な試験ポイント：</strong>
                        Google Cloud
                        は<strong>保存中・転送中のデータを追加設定なしでデフォルト暗号化</strong>します。
                        「使用中」のデータを暗号化するのは
                        <strong>Confidential VM</strong> の特徴です（AMD SEV 技術）。
                    </div>

                    {/* KMS OPTIONS */}
                    <h3 className={`${styles.subTitle} ${styles.marginTopLarge}`} aria-label="Cloud KMS：暗号鍵管理の 3 段階">
                        Cloud KMS：暗号鍵管理の 3 段階<span className={styles.examTag} aria-hidden="true">頻出</span>
                    </h3>
                    <div className={styles.kmsWrap}>
                        <table className={styles.kmsTable}>
                            <thead>
                                <tr>
                                    <th scope="col">管理方式</th>
                                    <th scope="col">鍵の管理主体</th>
                                    <th scope="col">コスト</th>
                                    <th scope="col">主なユースケース</th>
                                    <th scope="col">使用例</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        🔑 Google-Managed Keys<br />
                                        <span style={{ fontSize: '0.9rem', color: 'var(--color-muted-foreground)', fontWeight: 'normal' }}>
                                            （デフォルト）
                                        </span>
                                    </td>
                                    <td>Google が自動管理・ローテーション</td>
                                    <td>無料</td>
                                    <td>一般的なワークロード。追加設定不要。</td>
                                    <td>ほとんどのケースで十分</td>
                                </tr>
                                <tr>
                                    <td>
                                        🗝️ CMEK<br />
                                        <span style={{ fontSize: '0.9rem', color: 'var(--color-muted-foreground)', fontWeight: 'normal' }}>
                                            Customer-Managed Encryption Keys
                                        </span>
                                    </td>
                                    <td>
                                        ユーザーが Cloud KMS で管理。鍵の無効化・削除をユーザーが制御。
                                    </td>
                                    <td>KMS 利用料</td>
                                    <td>
                                        規制業界（金融・医療・政府）。鍵を無効化するとデータへのアクセス不可。
                                    </td>
                                    <td>コンプライアンス必須の場合</td>
                                </tr>
                                <tr>
                                    <td>
                                        🔐 CSEK<br />
                                        <span style={{ fontSize: '0.9rem', color: 'var(--color-muted-foreground)', fontWeight: 'normal' }}>
                                            Customer-Supplied Encryption Keys
                                        </span>
                                    </td>
                                    <td>
                                        ユーザーが Google Cloud 外で鍵を管理。リクエストのたびに提供。
                                    </td>
                                    <td>高い管理コスト</td>
                                    <td>鍵を Google に一切渡したくない最高セキュリティ要件。</td>
                                    <td>極めて機密性の高いデータ</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className={styles.g3} style={{ marginTop: '1.5rem' }}>
                        <div className={styles.card}>
                            <div className={styles.cardIcon} aria-hidden="true">🔒</div>
                            <h4 className={styles.cardTitle}>Cloud HSM</h4>
                            <div className={styles.cardBody}>
                                FIPS 140-2 Level 3
                                認証のハードウェアセキュリティモジュール。物理的に改ざん困難なハードウェアで鍵を保護。PCI
                                DSS・HIPAA 等の規制で必要な場合。
                            </div>
                            <div style={{ marginTop: '0.8rem' }}>
                                <span className={`${styles.badge} ${styles.badgeGold}`}>最高レベル保護</span>
                            </div>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.cardIcon} aria-hidden="true">💻</div>
                            <h4 className={styles.cardTitle}>Confidential VM</h4>
                            <div className={styles.cardBody}>
                                処理中（メモリ上）のデータも暗号化。AMD SEV（Secure Encrypted
                                Virtualization）技術を使用。Google
                                のハイパーバイザーもメモリを読めない。
                            </div>
                            <div style={{ marginTop: '0.8rem' }}>
                                <span className={`${styles.badge} ${styles.badgeTeal}`}>使用中も保護</span>
                            </div>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.cardIcon} aria-hidden="true">🗝️</div>
                            <h4 className={styles.cardTitle}>Secret Manager</h4>
                            <div className={styles.cardBody}>
                                API
                                キー・パスワード・証明書などの機密情報を安全に管理。コードへのハードコード禁止。バージョン管理・アクセス制御・監査ログ付き。
                            </div>
                            <div style={{ marginTop: '0.8rem' }}>
                                <span className={`${styles.badge} ${styles.badgeSky}`}>シークレット管理</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.bpBox}>
                        <h3 className={styles.bpTitle} aria-label="ベストプラクティス：暗号化">✅ ベストプラクティス：暗号化</h3>
                        <ul role="list" aria-label="暗号化のベストプラクティス">
                            <li>一般ワークロード → Google-Managed Keys（デフォルト・無料）で十分。</li>
                            <li>
                                規制対応（金融・医療・GDPR）→ <strong>CMEK</strong> で Cloud KMS
                                により鍵をユーザー管理する。
                            </li>
                            <li>
                                鍵を Google に渡したくない極秘要件 →
                                CSEK（管理コストと要件を慎重に評価）。
                            </li>
                            <li>
                                処理中のデータも保護が必要 → <strong>Confidential VM</strong> を使用。
                            </li>
                            <li>
                                API キー・パスワードはコードに直書きせず、必ず
                                <strong>Secret Manager</strong> を使用。
                            </li>
                        </ul>
                    </div>

                    <div className={styles.src}>
                        <div className={styles.srcLabel}>📎 参考ソース</div>
                        <a href="https://cloud.google.com/security/encryption/default-encryption" target="_blank" rel="noopener noreferrer">Default encryption at rest</a>
                        <a href="https://cloud.google.com/kms/docs" target="_blank" rel="noopener noreferrer">Cloud KMS documentation</a>
                        <a href="https://cloud.google.com/confidential-computing/confidential-vm/docs" target="_blank" rel="noopener noreferrer">Confidential VM documentation</a>
                        <a href="https://cloud.google.com/secret-manager/docs" target="_blank" rel="noopener noreferrer">Secret Manager documentation</a>
                    </div>
                </div>
            </section>
        </>
    );
};
