'use client';

import { useState, useEffect } from 'react';
import NavBar from './NavBar';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS } from './constants';
import styles from './page.module.css';

function Diagram({ id, label }: { id: string; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className={styles['diagram-wrap']}>
            <div className={styles['diagram-label']}>▶ {label}</div>
            <div className={styles['mermaid-wrap']}>
                <MermaidDiagram chart={chart} ariaLabel={label} />
            </div>
        </div>
    );
}

function CopyButton({ code }: { code: string }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(code).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };
    return (
        <button className={styles['copy-btn']} onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy'}
        </button>
    );
}

function ChecklistItem({ label }: { label: string }) {
    const [checked, setChecked] = useState(false);
    return (
        <li>
            <button
                type="button"
                className={styles['checklist-btn']}
                onClick={() => setChecked(!checked)}
                aria-pressed={checked}
            >
                <span className={`${styles['check-box']} check-box ${checked ? styles.checked : ''}`} />
                <span>{label}</span>
            </button>
        </li>
    );
}

export default function AceSection4Guide() {
    const [scrollTopVisible, setScrollTopVisible] = useState(false);
    const [progressWidth, setProgressWidth] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const s = window.scrollY;
            const t = document.documentElement.scrollHeight - window.innerHeight;
            setProgressWidth(t > 0 ? (s / t) * 100 : 0);
            setScrollTopVisible(s > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className={styles['ace-section4-page']}>
            <div className={styles['progress-bar']} style={{ width: `${progressWidth}%` }} />
            
            <NavBar />

            <main className={styles.main}>
                {/* HERO */}
                <section className={styles.hero} id="top">
                    <div className={styles['hero-bg']} />
                    <div className={styles['hero-grid']} />
                    <div className={styles['hero-eyebrow']}>
                        <span className={styles['hero-tag']}>ACE 試験対策</span>
                        <span className={`${styles['hero-tag']} ${styles.red}`}>Section 4 / ~20%</span>
                        <span className={`${styles['hero-tag']} ${styles.purple}`}>2025年6月版 試験ガイド対応</span>
                    </div>
                    <h1 className={styles['hero-title']}>
                        Section 4: <span className={styles.accent}>Configuring</span><br />
                        <span className={styles.accent}>Access and Security</span>
                    </h1>
                    <p className={styles['hero-sub']}>
                        IAMポリシーの設計・ロール管理・サービスアカウントのライフサイクル・権限借用・Workload Identity Federationまで、アクセスとセキュリティの全領域を完全網羅。中級者〜上級者向け実践ガイド。
                    </p>
                    <div className={styles['hero-stats']}>
                        <div className={styles['hero-stat']}><span className={styles['hero-stat-value']}>~20%</span><span className={styles['hero-stat-label']}>試験配点比率</span></div>
                        <div className={styles['hero-stat']}><span className={styles['hero-stat-value']}>2</span><span className={styles['hero-stat-label']}>主要セクション（4.1 / 4.2）</span></div>
                        <div className={styles['hero-stat']}><span className={styles['hero-stat-value']}>8+</span><span className={styles['hero-stat-label']}>試験ガイド記載の出題トピック</span></div>
                        <div className={styles['hero-stat']}><span className={styles['hero-stat-value']}>30+</span><span className={styles['hero-stat-label']}>公式ドキュメントリンク</span></div>
                    </div>
                </section>

                {/* CHANGES BANNER */}
                <div className={styles['changes-banner']}>
                    <div className={styles['changes-icon']}>🔐</div>
                    <div style={{ flex: 1 }}>
                        <div className={styles['changes-title']}>Section 4 の出題範囲（2025年6月版 試験ガイド）</div>
                        <div className={styles['changes-grid']}>
                            <div className={styles['change-item']}><div className={styles['change-dot']} /><span className={styles['change-label']}>[4.1]</span><span className={styles['change-desc']}>IAMポリシーの表示・作成・組織階層でのロール付与</span></div>
                            <div className={styles['change-item']}><div className={styles['change-dot']} /><span className={styles['change-label']}>[4.1]</span><span className={styles['change-desc']}>カスタムIAMロールの定義・管理</span></div>
                            <div className={styles['change-item']}><div className={styles['change-dot']} /><span className={styles['change-label']}>[4.2]</span><span className={styles['change-desc']}>SA作成・最小権限IAM・リソースへのSA割り当て</span></div>
                            <div className={styles['change-item']}><div className={styles['change-dot']} /><span className={styles['change-label']}>[4.2]</span><span className={styles['change-desc']}>SA権限借用・短期クレデンシャルの作成と管理</span></div>
                            <div className={styles['change-item']}><div className={styles['change-dot']} /><span className={styles['change-label']}>[4.2]</span><span className={styles['change-desc']}>GKEアプリのSA利用・Workload Identity Federationのプロビジョニング</span></div>
                        </div>
                    </div>
                </div>

                <div className={styles.content}>
                    {/* ===== PRINCIPLES ===== */}
                    <div id="principles" className={`${styles['section-header']} ${styles['section-block']}`}>
                        <div className={`${styles['section-icon-wrap']} ${styles['section-icon-purple']}`}>🛡️</div>
                        <div className={styles['section-meta']}>
                            <div className={styles['section-number']}>基礎</div>
                            <h2 className={styles['section-title-main']}>セキュリティ設計の基本原則</h2>
                        </div>
                    </div>

                    <div className={styles['topic-card']}>
                        <div className={styles['topic-card-header']}>
                            <span className={styles['topic-number']}>基礎-A</span>
                            <span className={styles['topic-title']}>Google Cloudセキュリティモデルの核心</span>
                        </div>
                        <div className={styles['topic-body']}>
                            <div className={`${styles.callout} ${styles['callout-purple']}`}>
                                <span className={styles['callout-icon']}>💡</span>
                                <div>
                                    Section 4 が問うのは「誰が何にアクセスできるか」を設計・実装・管理する能力です。単純な暗記ではなく、<strong>なぜその設計が安全なのか</strong>を理解していることが問われます。
                                </div>
                            </div>
                            <div className={styles['sub-title']}>3つの基本原則</div>
                            <div className={styles['table-wrap']}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">原則</th>
                                            <th scope="col">説明</th>
                                            <th scope="col">Google Cloud での実装</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>最小特権（Least Privilege）</strong></td>
                                            <td>必要な権限だけを、必要な期間だけ付与する</td>
                                            <td>事前定義ロール・IAM Conditions</td>
                                        </tr>
                                        <tr>
                                            <td><strong>職務分掌（Separation of Duties）</strong></td>
                                            <td>一人がすべての操作を単独で実行できない設計</td>
                                            <td>承認フロー・PAM（Privileged Access Manager）</td>
                                        </tr>
                                        <tr>
                                            <td><strong>深層防御（Defense in Depth）</strong></td>
                                            <td>複数のセキュリティ層を重ねる</td>
                                            <td>IAM + VPC Firewall + Cloud Armor + KMS</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className={styles['sub-title']}>IAM の構成要素</div>
                            <Diagram id="diag-1" label="IAM の 3 要素とポリシーの関係" />
                        </div>
                    </div>

                    {/* ===== SECTION 4.1 ===== */}
                    <div id="s41-policy" className={`${styles['section-header']} ${styles['section-block']}`}>
                        <div className={`${styles['section-icon-wrap']} ${styles['section-icon-blue']}`}>🔑</div>
                        <div className={styles['section-meta']}>
                            <div className={styles['section-number']}>Section 4.1</div>
                            <h2 className={styles['section-title-main']}>IAMの管理</h2>
                        </div>
                        <span className={styles['section-weight']}>~5–6問</span>
                    </div>

                    {/* 4.1-A */}
                    <div className={styles['topic-card']}>
                        <div className={styles['topic-card-header']}>
                            <span className={styles['topic-number']}>4.1-A</span>
                            <span className={styles['topic-title']}>IAMポリシーの表示と作成</span>
                        </div>
                        <div className={styles['topic-body']}>
                            <div className={styles['sub-title']}>IAMポリシーの構造（JSON）</div>
                            <div className={`${styles.callout} ${styles['callout-blue']}`}>
                                <span className={styles['callout-icon']}>💡</span>
                                <div>
                                    <strong>version: 3 が必要な理由</strong>: IAM Conditions（条件付きバインディング）を使う場合は必ずポリシーバージョンを <code>3</code> に設定します。バージョン <code>1</code> では条件を付与できません。
                                </div>
                            </div>
                            <div className={styles['code-block']}>
                                <CopyButton code={`{
  "version": 3,
  "bindings": [
    {
      "role": "roles/storage.objectViewer",
      "members": [
        "user:alice@example.com",
        "group:dev-team@example.com",
        "serviceAccount:my-app@project.iam.gserviceaccount.com"
      ]
    },
    {
      "role": "roles/compute.instanceAdmin.v1",
      "members": ["user:bob@example.com"],
      "condition": {
        "title": "Business Hours Only",
        "expression": "request.time.getHours('Asia/Tokyo') >= 9 && request.time.getHours('Asia/Tokyo') < 18"
      }
    }
  ],
  "etag": "BwXxyzAbcde="
}`} />
                                <pre>
                                    <code>
{`{
  "version": 3,
  "bindings": [
    {
      "role": "roles/storage.objectViewer",
      "members": [
        "user:alice@example.com",
        "group:dev-team@example.com",
        "serviceAccount:my-app@project.iam.gserviceaccount.com"
      ]
    },
    {
      "role": "roles/compute.instanceAdmin.v1",
      "members": ["user:bob@example.com"],
      "condition": {
        "title": "Business Hours Only",
        "expression": "request.time.getHours('Asia/Tokyo') >= 9 && request.time.getHours('Asia/Tokyo') < 18"
      }
    }
  ],
  "etag": "BwXxyzAbcde="
}`}
                                    </code>
                                </pre>
                            </div>

                            <div className={styles['sub-title']}>IAMポリシーの表示コマンド</div>
                            <div className={styles['code-block']}>
                                <CopyButton code={`# プロジェクトの IAM ポリシーを確認
gcloud projects get-iam-policy PROJECT_ID

# JSON 形式で出力（スクリプト処理向け）
gcloud projects get-iam-policy PROJECT_ID --format=json

# フォルダの IAM ポリシーを確認
gcloud resource-manager folders get-iam-policy FOLDER_ID

# 組織の IAM ポリシーを確認
gcloud organizations get-iam-policy ORG_ID

# Cloud Storage バケットの IAM ポリシーを確認
gcloud storage buckets get-iam-policy gs://my-bucket

# Cloud Run サービスの IAM ポリシーを確認
gcloud run services get-iam-policy SERVICE_NAME --region=REGION`} />
                                <pre>
                                    <code>
                                        <div className={styles['code-line']}><span className={styles.comment}># プロジェクトの IAM ポリシーを確認</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> projects get-iam-policy PROJECT_ID</div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># JSON 形式で出力（スクリプト処理向け）</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> projects get-iam-policy PROJECT_ID <span className={styles.flag}>--format</span>=json</div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># フォルダの IAM ポリシーを確認</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> resource-manager folders get-iam-policy FOLDER_ID</div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># 組織の IAM ポリシーを確認</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> organizations get-iam-policy ORG_ID</div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># Cloud Storage バケットの IAM ポリシーを確認</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> storage buckets get-iam-policy gs://my-bucket</div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># Cloud Run サービスの IAM ポリシーを確認</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> run services get-iam-policy SERVICE_NAME <span className={styles.flag}>--region</span>=REGION</div>
                                    </code>
                                </pre>
                            </div>

                            <div className={styles['sub-title']}>IAMポリシーの作成・変更コマンド</div>
                            <div className={styles['code-block']}>
                                <CopyButton code={`# ユーザーにロールを付与
gcloud projects add-iam-policy-binding PROJECT_ID \\
  --member="user:alice@example.com" \\
  --role="roles/compute.instanceAdmin.v1"

# グループにロールを付与（推奨）
gcloud projects add-iam-policy-binding PROJECT_ID \\
  --member="group:dev-team@example.com" \\
  --role="roles/run.developer"

# 条件付きロールバインディング（IAM Conditions）
gcloud projects add-iam-policy-binding PROJECT_ID \\
  --member="user:contractor@example.com" \\
  --role="roles/viewer" \\
  --condition='title=Temporary Access,expression=request.time < timestamp("2025-12-31T23:59:59Z")'

# ロールを削除
gcloud projects remove-iam-policy-binding PROJECT_ID \\
  --member="user:alice@example.com" \\
  --role="roles/compute.instanceAdmin.v1"

# ポリシーファイルを使った一括更新（注意：完全上書き）
gcloud projects set-iam-policy PROJECT_ID policy.json`} />
                                <pre>
                                    <code>
                                        <div className={styles['code-line']}><span className={styles.comment}># ユーザーにロールを付与</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> projects add-iam-policy-binding PROJECT_ID \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--member</span>=<span className={styles.val}>&quot;user:alice@example.com&quot;</span> \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--role</span>=<span className={styles.val}>&quot;roles/compute.instanceAdmin.v1&quot;</span></div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># グループにロールを付与（推奨）</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> projects add-iam-policy-binding PROJECT_ID \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--member</span>=<span className={styles.val}>&quot;group:dev-team@example.com&quot;</span> \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--role</span>=<span className={styles.val}>&quot;roles/run.developer&quot;</span></div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># 条件付きロールバインディング（IAM Conditions）</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> projects add-iam-policy-binding PROJECT_ID \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--member</span>=<span className={styles.val}>&quot;user:contractor@example.com&quot;</span> \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--role</span>=<span className={styles.val}>&quot;roles/viewer&quot;</span> \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--condition</span>=<span className={styles.val}>&apos;title=Temporary Access,expression=request.time &lt; timestamp(&quot;2025-12-31T23:59:59Z&quot;)&apos;</span></div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># ロールを削除</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> projects remove-iam-policy-binding PROJECT_ID \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--member</span>=<span className={styles.val}>&quot;user:alice@example.com&quot;</span> \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--role</span>=<span className={styles.val}>&quot;roles/compute.instanceAdmin.v1&quot;</span></div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># ポリシーファイルを使った一括更新（注意：完全上書き）</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> projects set-iam-policy PROJECT_ID policy.json</div>
                                    </code>
                                </pre>
                            </div>

                            <div className={`${styles.callout} ${styles['callout-red']}`}>
                                <span className={styles['callout-icon']}>⚠️</span>
                                <div>
                                    <strong>set-iam-policy の危険性</strong>: <code>add/remove-iam-policy-binding</code> は個別バインディングを変更しますが、<code>set-iam-policy</code> はポリシー全体を上書きします。必ず現在のポリシーを取得してから編集し適用してください。
                                </div>
                            </div>

                            <div className={styles['sub-title']}>Deny Policy（拒否ポリシー）</div>
                            <div className={`${styles.callout} ${styles['callout-purple']}`}>
                                <span className={styles['callout-icon']}>🔒</span>
                                <div>
                                    Deny Policy は Allow Policy より<strong>優先</strong>されます。特定の権限を明示的に拒否でき、組織全体の重要リソースを保護するのに効果的です。
                                </div>
                            </div>
                            <div className={styles['code-block']}>
                                <CopyButton code={`# 拒否ポリシーの確認
gcloud iam policies list \\
  --attachment-point=cloudresourcemanager.googleapis.com/projects/PROJECT_ID \\
  --kind=denypolicies

# 拒否ポリシーの作成（JSON ファイルを使用）
gcloud iam policies create POLICY_ID \\
  --attachment-point=cloudresourcemanager.googleapis.com/projects/PROJECT_ID \\
  --kind=denypolicies \\
  --policy-file=deny-policy.json`} />
                                <pre>
                                    <code>
                                        <div className={styles['code-line']}><span className={styles.comment}># 拒否ポリシーの確認</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> iam policies list \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--attachment-point</span>=cloudresourcemanager.googleapis.com/projects/PROJECT_ID \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--kind</span>=denypolicies</div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># 拒否ポリシーの作成（JSON ファイルを使用）</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> iam policies create POLICY_ID \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--attachment-point</span>=cloudresourcemanager.googleapis.com/projects/PROJECT_ID \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--kind</span>=denypolicies \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--policy-file</span>=deny-policy.json</div>
                                    </code>
                                </pre>
                            </div>

                            <div className={styles['bp-grid']}>
                                <div className={styles['bp-card']}><div className={styles['bp-num']}>1</div><div className={styles['bp-text']}><strong>個人ではなくグループにロールを付与する</strong> — メンバー変更時にIAMを変更せず済む</div></div>
                                <div className={styles['bp-card']}><div className={styles['bp-num']}>2</div><div className={styles['bp-text']}><strong>add/remove-binding を優先・set-policy は避ける</strong> — 競合状態と上書きを防止</div></div>
                                <div className={styles['bp-card']}><div className={styles['bp-num']}>3</div><div className={styles['bp-text']}><strong>IAM Conditionsで有効期限・時間帯・リソースパスを制限</strong> — 永続的な過剰権限のリスクを排除</div></div>
                                <div className={styles['bp-card']}><div className={styles['bp-num']}>4</div><div className={styles['bp-text']}><strong>Deny Policyで重要リソースへの危険な操作を禁止</strong> — Allow Policyより優先される強力な保護</div></div>
                            </div>
                            <a href="https://cloud.google.com/iam/docs/resource-hierarchy-access-control" target="_blank" rel="noopener noreferrer" className={styles['ref-link']}>🔗 IAM 継承 &amp; アクセス制御</a>
                            <a href="https://cloud.google.com/iam/docs/deny-overview" target="_blank" rel="noopener noreferrer" className={styles['ref-link']}>🔗 Deny Policy</a>
                            <a href="https://cloud.google.com/iam/docs/conditions-overview" target="_blank" rel="noopener noreferrer" className={styles['ref-link']}>🔗 IAM Conditions</a>
                        </div>
                    </div>

                    {/* 4.1-B */}
                    <div className={styles['topic-card']} id="s41-hierarchy">
                        <div className={styles['topic-card-header']}>
                            <span className={styles['topic-number']}>4.1-B</span>
                            <span className={styles['topic-title']}>組織階層でのロール付与と継承</span>
                        </div>
                        <div className={styles['topic-body']}>
                            <Diagram id="diag-2" label="IAM ポリシーの継承メカニズム" />
                            <div className={`${styles.callout} ${styles['callout-red']}`}>
                                <span className={styles['callout-icon']}>🚨</span>
                                <div>
                                    <strong>試験最頻出の落とし穴</strong>: 有効な権限 = すべての祖先レベルで付与されたポリシーの<strong>和集合（Union）</strong>。下位で削除しても上位の継承は無効にならない。上位の許可を制限したい場合は <strong>Deny Policy</strong> を使用する。
                                </div>
                            </div>
                            <div className={styles['sub-title']}>各階層でのロール付与コマンド</div>
                            <div className={styles['code-block']}>
                                <CopyButton code={`# === 組織レベル ===
gcloud organizations add-iam-policy-binding ORG_ID \\
  --member="group:security-team@example.com" \\
  --role="roles/securitycenter.admin"

# === フォルダレベル ===
gcloud resource-manager folders add-iam-policy-binding FOLDER_ID \\
  --member="group:dev-team@example.com" \\
  --role="roles/editor"

# === プロジェクトレベル ===
gcloud projects add-iam-policy-binding PROJECT_ID \\
  --member="user:alice@example.com" \\
  --role="roles/run.developer"

# === リソースレベル（Cloud Storage バケット）===
gcloud storage buckets add-iam-policy-binding gs://my-bucket \\
  --member="serviceAccount:app@project.iam.gserviceaccount.com" \\
  --role="roles/storage.objectViewer"

# === リソースレベル（Cloud Run サービス）===
gcloud run services add-iam-policy-binding SERVICE_NAME \\
  --region=asia-northeast1 \\
  --member="serviceAccount:caller@project.iam.gserviceaccount.com" \\
  --role="roles/run.invoker"`} />
                                <pre>
                                    <code>
                                        <div className={styles['code-line']}><span className={styles.comment}># === 組織レベル ===</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> organizations add-iam-policy-binding ORG_ID \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--member</span>=<span className={styles.val}>&quot;group:security-team@example.com&quot;</span> \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--role</span>=<span className={styles.val}>&quot;roles/securitycenter.admin&quot;</span></div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># === フォルダレベル ===</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> resource-manager folders add-iam-policy-binding FOLDER_ID \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--member</span>=<span className={styles.val}>&quot;group:dev-team@example.com&quot;</span> \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--role</span>=<span className={styles.val}>&quot;roles/editor&quot;</span></div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># === プロジェクトレベル ===</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> projects add-iam-policy-binding PROJECT_ID \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--member</span>=<span className={styles.val}>&quot;user:alice@example.com&quot;</span> \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--role</span>=<span className={styles.val}>&quot;roles/run.developer&quot;</span></div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># === リソースレベル（Cloud Storage バケット）===</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> storage buckets add-iam-policy-binding gs://my-bucket \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--member</span>=<span className={styles.val}>&quot;serviceAccount:app@project.iam.gserviceaccount.com&quot;</span> \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--role</span>=<span className={styles.val}>&quot;roles/storage.objectViewer&quot;</span></div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># === リソースレベル（Cloud Run サービス）===</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> run services add-iam-policy-binding SERVICE_NAME \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--region</span>=asia-northeast1 \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--member</span>=<span className={styles.val}>&quot;serviceAccount:caller@project.iam.gserviceaccount.com&quot;</span> \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--role</span>=<span className={styles.val}>&quot;roles/run.invoker&quot;</span></div>
                                    </code>
                                </pre>
                            </div>

                            <div className={styles['bp-grid']}>
                                <div className={styles['bp-card']}><div className={styles['bp-num']}>1</div><div className={styles['bp-text']}><strong>Organization レベルのロール付与は最小限に</strong> — 影響範囲が最大のため慎重に管理</div></div>
                                <div className={styles['bp-card']}><div className={styles['bp-num']}>2</div><div className={styles['bp-text']}><strong>複数プロジェクト共通の権限は親フォルダで付与</strong> — 個別設定の手間と漏れを防止</div></div>
                                <div className={styles['bp-card']}><div className={styles['bp-num']}>3</div><div className={styles['bp-text']}><strong>環境（dev/prod）は別フォルダ・別プロジェクトで分離</strong> — 誤操作のリスクを低減</div></div>
                                <div className={styles['bp-card']}><div className={styles['bp-num']}>4</div><div className={styles['bp-text']}><strong>同一信頼境界のリソースを同一プロジェクトにまとめる</strong> — セキュリティポリシーの一貫性を確保</div></div>
                            </div>
                            <a href="https://cloud.google.com/iam/docs/resource-hierarchy-access-control" target="_blank" rel="noopener noreferrer" className={styles['ref-link']}>🔗 リソース階層とアクセス制御</a>
                            <a href="https://cloud.google.com/resource-manager/docs/access-control-org" target="_blank" rel="noopener noreferrer" className={styles['ref-link']}>🔗 組織レベルのアクセス制御</a>
                        </div>
                    </div>

                    {/* 4.1-C */}
                    <div className={styles['topic-card']} id="s41-roles">
                        <div className={styles['topic-card-header']}>
                            <span className={styles['topic-number']}>4.1-C</span>
                            <span className={styles['topic-title']}>ロール種別の管理とカスタムIAMロールの定義</span>
                        </div>
                        <div className={styles['topic-body']}>
                            <Diagram id="diag-3" label="ロール選択フローチャート" />
                            <div className={styles['sub-title']}>試験頻出の事前定義ロール一覧</div>
                            <div className={styles['table-wrap']}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">サービス</th>
                                            <th scope="col">ロール</th>
                                            <th scope="col">権限概要</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td rowSpan={4}>Compute Engine</td>
                                            <td><code>roles/compute.admin</code></td>
                                            <td>Compute Engine の完全管理</td>
                                        </tr>
                                        <tr>
                                            <td><code>roles/compute.instanceAdmin.v1</code></td>
                                            <td>VM の作成・管理（ネットワーク変更は不可）</td>
                                        </tr>
                                        <tr>
                                            <td><code>roles/compute.osLogin</code></td>
                                            <td>OS Login での SSH 接続（sudo なし）</td>
                                        </tr>
                                        <tr>
                                            <td><code>roles/compute.osAdminLogin</code></td>
                                            <td>OS Login での SSH 接続（sudo あり）</td>
                                        </tr>
                                        <tr>
                                            <td rowSpan={4}>Cloud Storage</td>
                                            <td><code>roles/storage.admin</code></td>
                                            <td>バケット・オブジェクトの完全管理</td>
                                        </tr>
                                        <tr>
                                            <td><code>roles/storage.objectAdmin</code></td>
                                            <td>オブジェクトの完全管理（バケット設定変更は不可）</td>
                                        </tr>
                                        <tr>
                                            <td><code>roles/storage.objectCreator</code></td>
                                            <td>オブジェクトのアップロードのみ</td>
                                        </tr>
                                        <tr>
                                            <td><code>roles/storage.objectViewer</code></td>
                                            <td>オブジェクトの閲覧のみ</td>
                                        </tr>
                                        <tr>
                                            <td rowSpan={5}>IAM / SA</td>
                                            <td><code>roles/iam.serviceAccountAdmin</code></td>
                                            <td>SA の作成・管理</td>
                                        </tr>
                                        <tr>
                                            <td><code>roles/iam.serviceAccountUser</code></td>
                                            <td>SA を VM 等にアタッチする権限（actAs）</td>
                                        </tr>
                                        <tr>
                                            <td><code>roles/iam.serviceAccountTokenCreator</code></td>
                                            <td>SA の短期トークン生成（権限借用）</td>
                                        </tr>
                                        <tr>
                                            <td><code>roles/iam.workloadIdentityUser</code></td>
                                            <td>Workload Identity 経由での SA へのアクセス</td>
                                        </tr>
                                        <tr>
                                            <td><code>roles/iam.roleAdmin</code></td>
                                            <td>カスタムロールの作成・管理</td>
                                        </tr>
                                        <tr>
                                            <td>Secret Manager</td>
                                            <td><code>roles/secretmanager.secretAccessor</code></td>
                                            <td>シークレット値の読み取りのみ</td>
                                        </tr>
                                        <tr>
                                            <td rowSpan={2}>Cloud Run</td>
                                            <td><code>roles/run.developer</code></td>
                                            <td>デプロイ・設定変更</td>
                                        </tr>
                                        <tr>
                                            <td><code>roles/run.invoker</code></td>
                                            <td>Cloud Run へのリクエスト送信</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className={styles['sub-title']}>カスタムロールの作成</div>
                            <div className={styles['code-block']}>
                                <CopyButton code={`# YAML でカスタムロールを定義
cat > custom-deployer-role.yaml <<EOF
title: "Cloud Run Deployer"
description: "Cloud Run へのデプロイと Artifact Registry の読み取りのみ"
stage: "GA"
includedPermissions:
  - run.services.create
  - run.services.update
  - run.services.get
  - run.services.list
  - artifactregistry.repositories.get
  - artifactregistry.tags.get
  - storage.objects.get
  - storage.objects.list
EOF

# プロジェクトレベルでカスタムロールを作成
gcloud iam roles create cloudRunDeployer \\
  --project=PROJECT_ID \\
  --file=custom-deployer-role.yaml

# 組織レベルでカスタムロールを作成（組織全体で再利用可能）
gcloud iam roles create cloudRunDeployer \\
  --organization=ORG_ID \\
  --file=custom-deployer-role.yaml

# カスタムロールの一覧確認
gcloud iam roles list --project=PROJECT_ID --filter="name~customRoles"

# 権限を追加
gcloud iam roles update cloudRunDeployer \\
  --project=PROJECT_ID \\
  --add-permissions=run.routes.get

# 無効化（削除前のステップ）
gcloud iam roles update cloudRunDeployer \\
  --project=PROJECT_ID \\
  --stage=DISABLED

# 削除
gcloud iam roles delete cloudRunDeployer --project=PROJECT_ID`} />
                                <pre>
                                    <code>
                                        <div className={styles['code-line']}><span className={styles.comment}># YAML でカスタムロールを定義</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>cat</span> &gt; custom-deployer-role.yaml &lt;&lt;EOF</div>
                                        <div className={styles['code-line']}><span className={styles.val}>title: &quot;Cloud Run Deployer&quot;</span></div>
                                        <div className={styles['code-line']}><span className={styles.val}>description: &quot;Cloud Run へのデプロイと Artifact Registry の読み取りのみ&quot;</span></div>
                                        <div className={styles['code-line']}><span className={styles.val}>stage: &quot;GA&quot;</span></div>
                                        <div className={styles['code-line']}><span className={styles.val}>includedPermissions:</span></div>
                                        <div className={styles['code-line']}><span className={styles.val}>  - run.services.create</span></div>
                                        <div className={styles['code-line']}><span className={styles.val}>  - run.services.update</span></div>
                                        <div className={styles['code-line']}><span className={styles.val}>  - run.services.get</span></div>
                                        <div className={styles['code-line']}><span className={styles.val}>  - run.services.list</span></div>
                                        <div className={styles['code-line']}><span className={styles.val}>  - artifactregistry.repositories.get</span></div>
                                        <div className={styles['code-line']}><span className={styles.val}>  - artifactregistry.tags.get</span></div>
                                        <div className={styles['code-line']}><span className={styles.val}>  - storage.objects.get</span></div>
                                        <div className={styles['code-line']}><span className={styles.val}>  - storage.objects.list</span></div>
                                        <div className={styles['code-line']}><span className={styles.val}>EOF</span></div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># プロジェクトレベルでカスタムロールを作成</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> iam roles create cloudRunDeployer \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--project</span>=PROJECT_ID \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--file</span>=custom-deployer-role.yaml</div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># 組織レベルでカスタムロールを作成（組織全体で再利用可能）</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> iam roles create cloudRunDeployer \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--organization</span>=ORG_ID \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--file</span>=custom-deployer-role.yaml</div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># カスタムロールの一覧確認</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> iam roles list <span className={styles.flag}>--project</span>=PROJECT_ID <span className={styles.flag}>--filter</span>=<span className={styles.val}>&quot;name~customRoles&quot;</span></div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># 権限を追加</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> iam roles update cloudRunDeployer \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--project</span>=PROJECT_ID \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--add-permissions</span>=run.routes.get</div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># 無効化（削除前のステップ）</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> iam roles update cloudRunDeployer \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--project</span>=PROJECT_ID \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--stage</span>=DISABLED</div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># 削除</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> iam roles delete cloudRunDeployer <span className={styles.flag}>--project</span>=PROJECT_ID</div>
                                    </code>
                                </pre>
                            </div>

                            <div className={styles['sub-title']}>カスタムロールのライフサイクル</div>
                            <Diagram id="diag-4" label="カスタムロールのステージ遷移" />
                            <div className={styles['bp-grid']}>
                                <div className={styles['bp-card']}><div className={styles['bp-num']}>1</div><div className={styles['bp-text']}><strong>本番環境での基本ロール（Editor/Owner）使用を禁止</strong> — 過剰権限リスクを排除</div></div>
                                <div className={styles['bp-card']}><div className={styles['bp-num']}>2</div><div className={styles['bp-text']}><strong>事前定義ロールを優先しカスタムロールは最小限に</strong> — 管理コストが高いため</div></div>
                                <div className={styles['bp-card']}><div className={styles['bp-num']}>3</div><div className={styles['bp-text']}><strong>ALPHA → BETA → GA の段階を踏む</strong> — 予期せぬ権限の付与を防止</div></div>
                                <div className={styles['bp-card']}><div className={styles['bp-num']}>4</div><div className={styles['bp-text']}><strong>組織レベルのカスタムロールはプロジェクト間で再利用</strong> — 重複した定義の乱立を防止</div></div>
                            </div>
                            <a href="https://cloud.google.com/iam/docs/creating-custom-roles" target="_blank" rel="noopener noreferrer" className={styles['ref-link']}>🔗 カスタムロールの作成と管理</a>
                            <a href="https://cloud.google.com/iam/docs/roles-overview" target="_blank" rel="noopener noreferrer" className={styles['ref-link']}>🔗 IAM ロールの概要</a>
                        </div>
                    </div>

                    {/* ===== SECTION 4.2 ===== */}
                    <div id="s42-create" className={`${styles['section-header']} ${styles['section-block']}`}>
                        <div className={`${styles['section-icon-wrap']} ${styles['section-icon-cyan']}`}>🤖</div>
                        <div className={styles['section-meta']}>
                            <div className={styles['section-number']}>Section 4.2</div>
                            <h2 className={styles['section-title-main']}>サービスアカウントの管理</h2>
                        </div>
                        <span className={styles['section-weight']}>~5–6問</span>
                    </div>

                    {/* 4.2-A */}
                    <div className={styles['topic-card']}>
                        <div className={styles['topic-card-header']}>
                            <span className={styles['topic-number']}>4.2-A</span>
                            <span className={styles['topic-title']}>サービスアカウントの作成と基本概念</span>
                        </div>
                        <div className={styles['topic-body']}>
                            <Diagram id="diag-5" label="サービスアカウントの二重の役割" />
                            <div className={styles['sub-title']}>サービスアカウントの種類</div>
                            <div className={styles['table-wrap']}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">種類</th>
                                            <th scope="col">作成者</th>
                                            <th scope="col">命名規則</th>
                                            <th scope="col">注意事項</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>ユーザー管理 SA</strong></td>
                                            <td>ユーザーが作成</td>
                                            <td><code>NAME@PROJECT_ID.iam.gserviceaccount.com</code></td>
                                            <td>アプリ・CI/CD・GKE Pod 用（推奨）</td>
                                        </tr>
                                        <tr>
                                            <td><strong>デフォルト SA</strong></td>
                                            <td>Google が自動作成</td>
                                            <td><code>PROJECT_NUMBER-compute@developer.gserviceaccount.com</code></td>
                                            <td><strong>過剰権限のため本番では非推奨</strong></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Google 管理 SA</strong></td>
                                            <td>Google が内部で使用</td>
                                            <td><code>PROJECT_ID@cloudservices.gserviceaccount.com</code></td>
                                            <td>直接操作は不可</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className={`${styles.callout} ${styles['callout-red']}`}>
                                <span className={styles['callout-icon']}>⚠️</span>
                                <div>
                                    <strong>デフォルトSAの危険性</strong>: Compute Engine と App Engine のデフォルト SA は <code>roles/editor</code> に近い過剰な権限を持ちます。本番環境では専用の最小権限 SA を作成して使用してください。
                                </div>
                            </div>
                            <div className={styles['code-block']}>
                                <CopyButton code={`# SA の作成（用途が分かる命名規則を使う）
gcloud iam service-accounts create vm-web-server \\
  --display-name="Web Server VM Service Account" \\
  --description="Prod web server VM - reads GCS, writes Firestore"

# Workload Identity Federation 用（wlif- プレフィックス）
gcloud iam service-accounts create wlif-github-deploy \\
  --display-name="GitHub Actions Deployment SA"

# GKE Workload Identity 用（wlifgke- プレフィックス）
gcloud iam service-accounts create wlifgke-api-backend \\
  --display-name="GKE API Backend Service Account"

# SA の一覧確認
gcloud iam service-accounts list

# SA の無効化（削除ではなく一時停止）
gcloud iam service-accounts disable \\
  vm-web-server@PROJECT_ID.iam.gserviceaccount.com

# SA の削除（30日間は復元可能）
gcloud iam service-accounts delete \\
  vm-web-server@PROJECT_ID.iam.gserviceaccount.com

# SA の復元（削除後30日以内）
gcloud iam service-accounts undelete SA_UNIQUE_ID`} />
                                <pre>
                                    <code>
                                        <div className={styles['code-line']}><span className={styles.comment}># SA の作成（用途が分かる命名規則を使う）</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> iam service-accounts create vm-web-server \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--display-name</span>=<span className={styles.val}>&quot;Web Server VM Service Account&quot;</span> \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--description</span>=<span className={styles.val}>&quot;Prod web server VM - reads GCS, writes Firestore&quot;</span></div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># Workload Identity Federation 用（wlif- プレフィックス）</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> iam service-accounts create wlif-github-deploy \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--display-name</span>=<span className={styles.val}>&quot;GitHub Actions Deployment SA&quot;</span></div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># GKE Workload Identity 用（wlifgke- プレフィックス）</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> iam service-accounts create wlifgke-api-backend \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--display-name</span>=<span className={styles.val}>&quot;GKE API Backend Service Account&quot;</span></div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># SA の一覧確認</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> iam service-accounts list</div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># SA の無効化（削除ではなく一時停止）</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> iam service-accounts disable \</div>
                                        <div className={styles['code-line']}>  vm-web-server@PROJECT_ID.iam.gserviceaccount.com</div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># SA の削除（30日間は復元可能）</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> iam service-accounts delete \</div>
                                        <div className={styles['code-line']}>  vm-web-server@PROJECT_ID.iam.gserviceaccount.com</div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># SA の復元（削除後30日以内）</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> iam service-accounts undelete SA_UNIQUE_ID</div>
                                    </code>
                                </pre>
                            </div>

                            <div className={styles['bp-grid']}>
                                <div className={styles['bp-card']}><div className={styles['bp-num']}>1</div><div className={styles['bp-text']}><strong>1つのSAは1アプリ/1目的のみ</strong> — 最小権限の原則と追跡可能性を確保</div></div>
                                <div className={styles['bp-card']}><div className={styles['bp-num']}>2</div><div className={styles['bp-text']}><strong>デフォルト SA を本番で使わない</strong> — 専用の最小権限 SA を作成する</div></div>
                                <div className={styles['bp-card']}><div className={styles['bp-num']}>3</div><div className={styles['bp-text']}><strong>命名規則を統一する（vm- / wlif- / wlifgke-）</strong> — 一目で用途を識別できる</div></div>
                                <div className={styles['bp-card']}><div className={styles['bp-num']}>4</div><div className={styles['bp-text']}><strong>不要になったSAは無効化→削除の順で対処</strong> — 30日間の復元猶予期間を活用</div></div>
                            </div>
                            <a href="https://cloud.google.com/iam/docs/best-practices-service-accounts" target="_blank" rel="noopener noreferrer" className={styles['ref-link']}>🔗 SA のベストプラクティス</a>
                        </div>
                    </div>

                    {/* 4.2-B */}
                    <div className={styles['topic-card']} id="s42-leastpriv">
                        <div className={styles['topic-card-header']}>
                            <span className={styles['topic-number']}>4.2-B</span>
                            <span className={styles['topic-title']}>最小権限でのIAMポリシー利用</span>
                        </div>
                        <div className={styles['topic-body']}>
                            <Diagram id="diag-6" label="SA への権限付与の意思決定フロー" />
                            <div className={`${styles.callout} ${styles['callout-blue']}`}>
                                <span className={styles['callout-icon']}>🔍</span>
                                <div>
                                    <strong>Policy Analyzer</strong>: 特定のリソースにアクセスできる全 Identity を特定したり、特定の権限を誰が持っているかを調査できます。過剰権限の検出や、インシデント発生時の影響範囲把握に有効です。
                                </div>
                            </div>
                            <div className={styles['code-block']}>
                                <CopyButton code={`# SA に必要な権限だけを付与する例

# Cloud Storage への読み取りのみ（プロジェクトレベル）
gcloud projects add-iam-policy-binding PROJECT_ID \\
  --member="serviceAccount:my-app@PROJECT_ID.iam.gserviceaccount.com" \\
  --role="roles/storage.objectViewer"

# BigQuery への読み取りのみ
gcloud projects add-iam-policy-binding PROJECT_ID \\
  --member="serviceAccount:my-app@PROJECT_ID.iam.gserviceaccount.com" \\
  --role="roles/bigquery.dataViewer"

# Secret Manager のシークレット読み取りのみ
gcloud projects add-iam-policy-binding PROJECT_ID \\
  --member="serviceAccount:my-app@PROJECT_ID.iam.gserviceaccount.com" \\
  --role="roles/secretmanager.secretAccessor"

# より細かい制御：特定のバケットのみにアクセスを制限（リソースレベル）
gcloud storage buckets add-iam-policy-binding gs://specific-bucket \\
  --member="serviceAccount:my-app@PROJECT_ID.iam.gserviceaccount.com" \\
  --role="roles/storage.objectViewer"

# Policy Analyzer: 特定リソースにアクセスできる全 Identity を分析
gcloud asset analyze-iam-policy \\
  --organization=ORG_ID \\
  --full-resource-name="//storage.googleapis.com/projects/_/buckets/my-bucket"

# Policy Analyzer: 特定の権限を持つ Principal を検索
gcloud asset analyze-iam-policy \\
  --project=PROJECT_ID \\
  --permissions="storage.objects.delete"`} />
                                <pre>
                                    <code>
                                        <div className={styles['code-line']}><span className={styles.comment}># SA に必要な権限だけを付与する例</span></div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># Cloud Storage への読み取りのみ（プロジェクトレベル）</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> projects add-iam-policy-binding PROJECT_ID \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--member</span>=<span className={styles.val}>&quot;serviceAccount:my-app@PROJECT_ID.iam.gserviceaccount.com&quot;</span> \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--role</span>=<span className={styles.val}>&quot;roles/storage.objectViewer&quot;</span></div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># BigQuery への読み取りのみ</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> projects add-iam-policy-binding PROJECT_ID \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--member</span>=<span className={styles.val}>&quot;serviceAccount:my-app@PROJECT_ID.iam.gserviceaccount.com&quot;</span> \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--role</span>=<span className={styles.val}>&quot;roles/bigquery.dataViewer&quot;</span></div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># Secret Manager のシークレット読み取りのみ</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> projects add-iam-policy-binding PROJECT_ID \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--member</span>=<span className={styles.val}>&quot;serviceAccount:my-app@PROJECT_ID.iam.gserviceaccount.com&quot;</span> \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--role</span>=<span className={styles.val}>&quot;roles/secretmanager.secretAccessor&quot;</span></div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># より細かい制御：特定のバケットのみにアクセスを制限（リソースレベル）</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> storage buckets add-iam-policy-binding gs://specific-bucket \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--member</span>=<span className={styles.val}>&quot;serviceAccount:my-app@PROJECT_ID.iam.gserviceaccount.com&quot;</span> \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--role</span>=<span className={styles.val}>&quot;roles/storage.objectViewer&quot;</span></div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># Policy Analyzer: 特定リソースにアクセスできる全 Identity を分析</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> asset analyze-iam-policy \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--organization</span>=ORG_ID \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--full-resource-name</span>=<span className={styles.val}>&quot;//storage.googleapis.com/projects/_/buckets/my-bucket&quot;</span></div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># Policy Analyzer: 特定の権限を持つ Principal を検索</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> asset analyze-iam-policy \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--project</span>=PROJECT_ID \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--permissions</span>=<span className={styles.val}>&quot;storage.objects.delete&quot;</span></div>
                                    </code>
                                </pre>
                            </div>
                            <div className={styles['bp-grid']}>
                                <div className={styles['bp-card']}><div className={styles['bp-num']}>1</div><div className={styles['bp-text']}><strong>roles/editor / roles/owner を SA に付与しない</strong> — 過剰権限リスクの根本的排除</div></div>
                                <div className={styles['bp-card']}><div className={styles['bp-num']}>2</div><div className={styles['bp-text']}><strong>プロジェクトレベルよりリソースレベルの付与を優先</strong> — 影響範囲を最小限に絞る</div></div>
                                <div className={styles['bp-card']}><div className={styles['bp-num']}>3</div><div className={styles['bp-text']}><strong>Policy Recommender で不要な権限を定期的に削除</strong> — 権限のクリープ（肥大化）を防止</div></div>
                                <div className={styles['bp-card']}><div className={styles['bp-num']}>4</div><div className={styles['bp-text']}><strong>Policy Analyzer でアクセス権限を定期的に棚卸し</strong> — 意図しないアクセスを早期発見</div></div>
                            </div>
                            <a href="https://cloud.google.com/iam/docs/best-practices-service-accounts" target="_blank" rel="noopener noreferrer" className={styles['ref-link']}>🔗 SA のベストプラクティス</a>
                            <a href="https://cloud.google.com/asset-inventory/docs/analyzing-iam-policy" target="_blank" rel="noopener noreferrer" className={styles['ref-link']}>🔗 Policy Analyzer</a>
                        </div>
                    </div>

                    {/* 4.2-C */}
                    <div className={styles['topic-card']} id="s42-attach">
                        <div className={styles['topic-card-header']}>
                            <span className={styles['topic-number']}>4.2-C</span>
                            <span className={styles['topic-title']}>リソースへのサービスアカウント割り当て</span>
                        </div>
                        <div className={styles['topic-body']}>
                            <div className={styles['sub-title']}>スコープ（Scope）の理解</div>
                            <div className={styles['table-wrap']}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">スコープ</th>
                                            <th scope="col">説明</th>
                                            <th scope="col">推奨度</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><code>cloud-platform</code></td>
                                            <td>すべての GCP API へのアクセスを SA の IAM で制御</td>
                                            <td>✅ 推奨</td>
                                        </tr>
                                        <tr>
                                            <td>個別スコープ（例: storage.read_only）</td>
                                            <td>特定の API のみ（旧来の方法）</td>
                                            <td>⚠️ 非推奨</td>
                                        </tr>
                                        <tr>
                                            <td><code>default</code></td>
                                            <td>一部の API のみデフォルトで有効</td>
                                            <td>❌ 非推奨</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className={`${styles.callout} ${styles['callout-blue']}`}>
                                <span className={styles['callout-icon']}>💡</span>
                                <div>
                                    <strong>なぜ cloud-platform スコープが推奨されるのか？</strong> スコープではなく SA の IAM ロールで権限を制御することで、コンソールや gcloud からの権限変更が即座に反映されます。
                                </div>
                            </div>
                            <div className={styles['code-block']}>
                                <CopyButton code={`# VM 作成時に SA をアタッチ（推奨設定）
gcloud compute instances create my-vm \\
  --zone=asia-northeast1-a \\
  --machine-type=n2-standard-4 \\
  --service-account=vm-web-server@PROJECT_ID.iam.gserviceaccount.com \\
  --scopes=cloud-platform

# 既存 VM の SA を変更（VM を停止してから実行）
gcloud compute instances stop my-vm --zone=asia-northeast1-a
gcloud compute instances set-service-account my-vm \\
  --zone=asia-northeast1-a \\
  --service-account=new-sa@PROJECT_ID.iam.gserviceaccount.com \\
  --scopes=cloud-platform
gcloud compute instances start my-vm --zone=asia-northeast1-a

# Cloud Run サービスに SA をアタッチ
gcloud run deploy my-service \\
  --image=gcr.io/PROJECT_ID/my-app:latest \\
  --region=asia-northeast1 \\
  --service-account=wlif-cloudrun@PROJECT_ID.iam.gserviceaccount.com

# Cloud Functions に SA をアタッチ
gcloud functions deploy my-function \\
  --gen2 --runtime=python312 --trigger-http \\
  --service-account=func-sa@PROJECT_ID.iam.gserviceaccount.com \\
  --region=asia-northeast1`} />
                                <pre>
                                    <code>
                                        <div className={styles['code-line']}><span className={styles.comment}># VM 作成時に SA をアタッチ（推奨設定）</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> compute instances create my-vm \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--zone</span>=asia-northeast1-a \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--machine-type</span>=n2-standard-4 \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--service-account</span>=vm-web-server@PROJECT_ID.iam.gserviceaccount.com \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--scopes</span>=cloud-platform</div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># 既存 VM の SA を変更（VM を停止してから実行）</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> compute instances stop my-vm <span className={styles.flag}>--zone</span>=asia-northeast1-a</div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> compute instances set-service-account my-vm \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--zone</span>=asia-northeast1-a \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--service-account</span>=new-sa@PROJECT_ID.iam.gserviceaccount.com \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--scopes</span>=cloud-platform</div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> compute instances start my-vm <span className={styles.flag}>--zone</span>=asia-northeast1-a</div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># Cloud Run サービスに SA をアタッチ</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> run deploy my-service \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--image</span>=gcr.io/PROJECT_ID/my-app:latest \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--region</span>=asia-northeast1 \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--service-account</span>=wlif-cloudrun@PROJECT_ID.iam.gserviceaccount.com</div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># Cloud Functions に SA をアタッチ</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> functions deploy my-function \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--gen2</span> <span className={styles.flag}>--runtime</span>=python312 <span className={styles.flag}>--trigger-http</span> \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--service-account</span>=func-sa@PROJECT_ID.iam.gserviceaccount.com \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--region</span>=asia-northeast1</div>
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>

                    {/* 4.2-D */}
                    <div className={styles['topic-card']} id="s42-iam">
                        <div className={styles['topic-card-header']}>
                            <span className={styles['topic-number']}>4.2-D</span>
                            <span className={styles['topic-title']}>サービスアカウントのIAM権限管理（actAs権限）</span>
                        </div>
                        <div className={styles['topic-body']}>
                            <div className={`${styles.callout} ${styles['callout-yellow']}`}>
                                <span className={styles['callout-icon']}>⚠️</span>
                                <div>
                                    SA の IAM 権限管理には2つの側面があります。<strong>①SA が GCP リソースにアクセスするための権限</strong>と、<strong>②誰がこのSAを使えるか（SA自体に対するIAM設定）</strong>です。
                                </div>
                            </div>
                            <Diagram id="diag-7" label="actAs 権限の重要性" />
                            <div className={styles['code-block']}>
                                <CopyButton code={`# SA への actAs 権限の付与（SA を VM にアタッチできるようにする）
gcloud iam service-accounts add-iam-policy-binding \\
  privileged-sa@PROJECT_ID.iam.gserviceaccount.com \\
  --member="user:alice@example.com" \\
  --role="roles/iam.serviceAccountUser"

# SA の IAM ポリシー（誰がこの SA を使えるか）を確認
gcloud iam service-accounts get-iam-policy \\
  privileged-sa@PROJECT_ID.iam.gserviceaccount.com

# SA の IAM ポリシーを更新
gcloud iam service-accounts set-iam-policy \\
  privileged-sa@PROJECT_ID.iam.gserviceaccount.com \\
  policy.json`} />
                                <pre>
                                    <code>
                                        <div className={styles['code-line']}><span className={styles.comment}># SA への actAs 権限の付与（SA を VM にアタッチできるようにする）</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> iam service-accounts add-iam-policy-binding \</div>
                                        <div className={styles['code-line']}>  privileged-sa@PROJECT_ID.iam.gserviceaccount.com \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--member</span>=<span className={styles.val}>&quot;user:alice@example.com&quot;</span> \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--role</span>=<span className={styles.val}>&quot;roles/iam.serviceAccountUser&quot;</span></div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># SA の IAM ポリシー（誰がこの SA を使えるか）を確認</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> iam service-accounts get-iam-policy \</div>
                                        <div className={styles['code-line']}>  privileged-sa@PROJECT_ID.iam.gserviceaccount.com</div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># SA の IAM ポリシーを更新</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> iam service-accounts set-iam-policy \</div>
                                        <div className={styles['code-line']}>  privileged-sa@PROJECT_ID.iam.gserviceaccount.com \</div>
                                        <div className={styles['code-line']}>  policy.json</div>
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>

                    {/* 4.2-E */}
                    <div className={styles['topic-card']} id="s42-impersonation">
                        <div className={styles['topic-card-header']}>
                            <span className={styles['topic-number']}>4.2-E</span>
                            <span className={styles['topic-title']}>サービスアカウント権限借用（Impersonation）の管理</span>
                        </div>
                        <div className={styles['topic-body']}>
                            <Diagram id="diag-8" label="権限借用のシーケンス" />
                            <div className={styles['sub-title']}>通常の権限付与 vs 権限借用 vs PAM</div>
                            <div className={styles['table-wrap']}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">方法</th>
                                            <th scope="col">権限の永続性</th>
                                            <th scope="col">監査性</th>
                                            <th scope="col">リスク</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>直接ロール付与</td>
                                            <td>永続的</td>
                                            <td>操作ログのみ</td>
                                            <td>高（常に特権を持つ）</td>
                                        </tr>
                                        <tr>
                                            <td><strong>SA 権限借用</strong></td>
                                            <td>一時的（最大1時間）</td>
                                            <td>誰がいつ借用したかが明確</td>
                                            <td>低（時間制限あり）</td>
                                        </tr>
                                        <tr>
                                            <td><strong>PAM（Privileged Access Manager）</strong></td>
                                            <td>承認制・時間制限</td>
                                            <td>完全な監査証跡</td>
                                            <td>最低</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className={styles['code-block']}>
                                <CopyButton code={`# Step 1: privileged-sa に必要な権限を付与
gcloud projects add-iam-policy-binding PROJECT_ID \\
  --member="serviceAccount:privileged-sa@PROJECT_ID.iam.gserviceaccount.com" \\
  --role="roles/storage.admin"

# Step 2: alice に SA のトークン作成権限を付与
gcloud iam service-accounts add-iam-policy-binding \\
  privileged-sa@PROJECT_ID.iam.gserviceaccount.com \\
  --member="user:alice@example.com" \\
  --role="roles/iam.serviceAccountTokenCreator"

# Step 3a: alice が権限借用で操作（gcloud コマンド）
gcloud storage ls gs://my-bucket \\
  --impersonate-service-account=privileged-sa@PROJECT_ID.iam.gserviceaccount.com

# Step 3b: 一時的なアクセストークンを生成
gcloud auth print-access-token \\
  --impersonate-service-account=privileged-sa@PROJECT_ID.iam.gserviceaccount.com

# Step 3c: gcloud CLI のデフォルトで権限借用を設定
gcloud config set auth/impersonate_service_account \\
  privileged-sa@PROJECT_ID.iam.gserviceaccount.com

# 設定を解除
gcloud config unset auth/impersonate_service_account

# 権限借用のイベントを Cloud Logging で検索
gcloud logging read \\
  'protoPayload.methodName="GenerateAccessToken" AND protoPayload.request.name=~"privileged-sa"' \\
  --limit=10 --format=json`} />
                                <pre>
                                    <code>
                                        <div className={styles['code-line']}><span className={styles.comment}># Step 1: privileged-sa に必要な権限を付与</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> projects add-iam-policy-binding PROJECT_ID \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--member</span>=<span className={styles.val}>&quot;serviceAccount:privileged-sa@PROJECT_ID.iam.gserviceaccount.com&quot;</span> \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--role</span>=<span className={styles.val}>&quot;roles/storage.admin&quot;</span></div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># Step 2: alice に SA のトークン作成権限を付与</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> iam service-accounts add-iam-policy-binding \</div>
                                        <div className={styles['code-line']}>  privileged-sa@PROJECT_ID.iam.gserviceaccount.com \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--member</span>=<span className={styles.val}>&quot;user:alice@example.com&quot;</span> \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--role</span>=<span className={styles.val}>&quot;roles/iam.serviceAccountTokenCreator&quot;</span></div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># Step 3a: alice が権限借用で操作（gcloud コマンド）</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> storage ls gs://my-bucket \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--impersonate-service-account</span>=privileged-sa@PROJECT_ID.iam.gserviceaccount.com</div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># Step 3b: 一時的なアクセストークンを生成</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> auth print-access-token \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--impersonate-service-account</span>=privileged-sa@PROJECT_ID.iam.gserviceaccount.com</div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># Step 3c: gcloud CLI のデフォルトで権限借用を設定</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> config set auth/impersonate_service_account \</div>
                                        <div className={styles['code-line']}>  privileged-sa@PROJECT_ID.iam.gserviceaccount.com</div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># 設定を解除</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> config unset auth/impersonate_service_account</div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># 権限借用のイベントを Cloud Logging で検索</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> logging read \</div>
                                        <div className={styles['code-line']}>  <span className={styles.val}>&apos;protoPayload.methodName=&quot;GenerateAccessToken&quot; AND protoPayload.request.name=~&quot;privileged-sa&quot;&apos;</span> \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--limit</span>=10 <span className={styles.flag}>--format</span>=json</div>
                                    </code>
                                </pre>
                            </div>
                            <div className={styles['bp-grid']}>
                                <div className={styles['bp-card']}><div className={styles['bp-num']}>1</div><div className={styles['bp-text']}><strong>特権操作は直接ロール付与ではなくSA権限借用を使う</strong> — 一時的な権限 + 詳細な監査ログ</div></div>
                                <div className={styles['bp-card']}><div className={styles['bp-num']}>2</div><div className={styles['bp-text']}><strong>TokenCreator はプロジェクトレベルではなくSAリソースレベルで付与</strong> — 影響範囲を特定SAに限定</div></div>
                                <div className={styles['bp-card']}><div className={styles['bp-num']}>3</div><div className={styles['bp-text']}><strong>PAMで承認フローを組み込む</strong> — 承認なしに特権SAを借用できないようにする</div></div>
                            </div>
                            <a href="https://cloud.google.com/iam/docs/service-account-impersonation" target="_blank" rel="noopener noreferrer" className={styles['ref-link']}>🔗 SA の権限借用</a>
                            <a href="https://cloud.google.com/iam/docs/service-account-permissions" target="_blank" rel="noopener noreferrer" className={styles['ref-link']}>🔗 SA 権限のロール</a>
                        </div>
                    </div>

                    {/* 4.2-F */}
                    <div className={styles['topic-card']} id="s42-shortlived">
                        <div className={styles['topic-card-header']}>
                            <span className={styles['topic-number']}>4.2-F</span>
                            <span className={styles['topic-title']}>短期クレデンシャルの作成と管理</span>
                        </div>
                        <div className={styles['topic-body']}>
                            <div className={styles['table-wrap']}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">種類</th>
                                            <th scope="col">用途</th>
                                            <th scope="col">有効期限</th>
                                            <th scope="col">API</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>OAuth 2.0 アクセストークン</strong></td>
                                            <td>Google API 呼び出し</td>
                                            <td>デフォルト1時間（最大12時間）</td>
                                            <td>generateAccessToken</td>
                                        </tr>
                                        <tr>
                                            <td><strong>OIDC ID トークン</strong></td>
                                            <td>Cloud Run / API Gateway の認証</td>
                                            <td>1時間</td>
                                            <td>generateIdToken</td>
                                        </tr>
                                        <tr>
                                            <td><strong>自己署名 JWT</strong></td>
                                            <td>一部の Google API 認証</td>
                                            <td>1時間</td>
                                            <td>signJwt</td>
                                        </tr>
                                        <tr>
                                            <td><strong>自己署名バイナリオブジェクト</strong></td>
                                            <td>カスタム認証</td>
                                            <td>任意</td>
                                            <td>signBlob</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className={styles['code-block']}>
                                <CopyButton code={`# OAuth 2.0 アクセストークンの生成（権限借用）
gcloud auth print-access-token \\
  --impersonate-service-account=my-sa@PROJECT_ID.iam.gserviceaccount.com

# OIDC ID トークンの生成（Cloud Run のエンドポイント向け）
gcloud auth print-identity-token \\
  --impersonate-service-account=my-sa@PROJECT_ID.iam.gserviceaccount.com \\
  --audiences=https://my-cloud-run-service-url

# REST API を使ってアクセストークンを生成
curl -X POST \\
  -H "Authorization: Bearer \$(gcloud auth print-access-token)" \\
  -H "Content-Type: application/json" \\
  -d '{"scope": ["https://www.googleapis.com/auth/cloud-platform"]}' \\
  "https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/my-sa@PROJECT_ID.iam.gserviceaccount.com:generateAccessToken"

# 委任チェーンでトークンを生成（複数の SA を経由）
gcloud auth print-access-token \\
  --impersonate-service-account=sa1@PROJECT.iam.gserviceaccount.com,sa2@PROJECT.iam.gserviceaccount.com,sa3@PROJECT.iam.gserviceaccount.com`} />
                                <pre>
                                    <code>
                                        <div className={styles['code-line']}><span className={styles.comment}># OAuth 2.0 アクセストークンの生成（権限借用）</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> auth print-access-token \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--impersonate-service-account</span>=my-sa@PROJECT_ID.iam.gserviceaccount.com</div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># OIDC ID トークンの生成（Cloud Run のエンドポイント向け）</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> auth print-identity-token \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--impersonate-service-account</span>=my-sa@PROJECT_ID.iam.gserviceaccount.com \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--audiences</span>=https://my-cloud-run-service-url</div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># REST API を使ってアクセストークンを生成</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>curl</span> -X POST \</div>
                                        <div className={styles['code-line']}>  -H <span className={styles.val}>&quot;Authorization: Bearer $(gcloud auth print-access-token)&quot;</span> \</div>
                                        <div className={styles['code-line']}>  -H <span className={styles.val}>&quot;Content-Type: application/json&quot;</span> \</div>
                                        <div className={styles['code-line']}>  -d <span className={styles.val}>{`'{"scope": ["https://www.googleapis.com/auth/cloud-platform"]}'`}</span> \</div>
                                        <div className={styles['code-line']}>  <span className={styles.val}>&quot;https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/my-sa@PROJECT_ID.iam.gserviceaccount.com:generateAccessToken&quot;</span></div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># 委任チェーンでトークンを生成（複数の SA を経由）</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> auth print-access-token \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--impersonate-service-account</span>=sa1@PROJECT.iam.gserviceaccount.com,sa2@PROJECT.iam.gserviceaccount.com,sa3@PROJECT.iam.gserviceaccount.com</div>
                                    </code>
                                </pre>
                            </div>
                            <div className={`${styles.callout} ${styles['callout-red']}`}>
                                <span className={styles['callout-icon']}>🚫</span>
                                <div>
                                    <strong>自己権限借用（Self-Impersonation）は禁止</strong>: SA の短期クレデンシャルを使って、同じ SA の新しいアクセストークンを生成することは禁止されています。盗まれたトークンを無限に更新する攻撃を防ぐためです。
                                </div>
                            </div>
                            <div className={styles['sub-title']}>委任チェーン（Delegation Chain）</div>
                            <div className={`${styles.callout} ${styles['callout-blue']}`}>
                                <span className={styles['callout-icon']}>💡</span>
                                <div>
                                    複数の SA を経由してクレデンシャルを生成するパターン。SA-1 が SA-2 の TokenCreator 権限を持ち、SA-2 が SA-3 の TokenCreator 権限を持つことで権限を段階的に移譲できます。ただし複雑さが増すと監査が困難になるため最小限に留めること。
                                </div>
                            </div>
                            <Diagram id="diag-9" label="委任チェーンのアーキテクチャ" />
                            <div className={styles['bp-grid']}>
                                <div className={styles['bp-card']}><div className={styles['bp-num']}>1</div><div className={styles['bp-text']}><strong>SA の静的 JSON キーより短期クレデンシャルを優先</strong> — 自動失効するため漏洩リスクが低い</div></div>
                                <div className={styles['bp-card']}><div className={styles['bp-num']}>2</div><div className={styles['bp-text']}><strong>アクセストークンの有効期限を最小限に設定</strong> — デフォルト1時間を必要に応じて短縮</div></div>
                                <div className={styles['bp-card']}><div className={styles['bp-num']}>3</div><div className={styles['bp-text']}><strong>OIDC ID トークンは特定のオーディエンスに限定</strong> — 他のサービスへの不正な転用を防止</div></div>
                                <div className={styles['bp-card']}><div className={styles['bp-num']}>4</div><div className={styles['bp-text']}><strong>委任チェーンは複雑になるため最小限に</strong> — 複雑さが増すと監査が困難になる</div></div>
                            </div>
                            <a href="https://cloud.google.com/iam/docs/create-short-lived-credentials-direct" target="_blank" rel="noopener noreferrer" className={styles['ref-link']}>🔗 短期クレデンシャルの作成</a>
                            <a href="https://cloud.google.com/iam/docs/service-account-creds" target="_blank" rel="noopener noreferrer" className={styles['ref-link']}>🔗 SA クレデンシャルの種類</a>
                        </div>
                    </div>

                    {/* 4.2-G */}
                    <div className={styles['topic-card']} id="s42-gke">
                        <div className={styles['topic-card-header']}>
                            <span className={styles['topic-number']}>4.2-G</span>
                            <span className={styles['topic-title']}>GKEアプリケーションでのサービスアカウント利用</span>
                        </div>
                        <div className={styles['topic-body']}>
                            <Diagram id="diag-10" label="Workload Identity Federation for GKE のアーキテクチャ" />
                            <div className={styles['compare-grid']}>
                                <div className={styles['compare-bad']}>
                                    <div className={styles['compare-label']}>✕ アンチパターン：JSON キーを Secret にマウント</div>
                                    <div className={styles['compare-content']}>SA の JSON キーを Kubernetes Secret に保存してPodにマウント。キー漏洩リスク・ローテーション管理の煩雑さが問題。<strong>絶対に使わないこと。</strong></div>
                                </div>
                                <div className={styles['compare-good']}>
                                    <div className={styles['compare-label']}>✓ 推奨：Workload Identity Federation for GKE</div>
                                    <div className={styles['compare-content']}>KSA と GSA を紐付けるだけ。JSON キー不要。メタデータサーバーから自動的に短期トークンを取得。GKE Autopilot では自動有効化。</div>
                                </div>
                            </div>
                            <div className={styles['code-block']}>
                                <CopyButton code={`# Step 1: GKE クラスタで Workload Identity を有効化
gcloud container clusters update my-cluster \\
  --workload-pool=PROJECT_ID.svc.id.goog \\
  --region=asia-northeast1
# ※ GKE Autopilot では自動的に有効化される

# Step 2: GSA を作成
gcloud iam service-accounts create wlifgke-api-backend \\
  --display-name="GKE API Backend GSA"

# Step 3: GSA に必要な権限を付与
gcloud projects add-iam-policy-binding PROJECT_ID \\
  --member="serviceAccount:wlifgke-api-backend@PROJECT_ID.iam.gserviceaccount.com" \\
  --role="roles/storage.objectViewer"

# Step 4: KSA が GSA を使えるように IAM を設定
gcloud iam service-accounts add-iam-policy-binding \\
  wlifgke-api-backend@PROJECT_ID.iam.gserviceaccount.com \\
  --role=roles/iam.workloadIdentityUser \\
  --member="serviceAccount:PROJECT_ID.svc.id.goog[NAMESPACE/KSA_NAME]"

# Step 5: KSA を作成してアノテーションを付ける
kubectl create serviceaccount my-ksa --namespace my-namespace
kubectl annotate serviceaccount my-ksa \\
  --namespace my-namespace \\
  iam.gke.io/gcp-service-account=wlifgke-api-backend@PROJECT_ID.iam.gserviceaccount.com`} />
                                <pre>
                                    <code>
                                        <div className={styles['code-line']}><span className={styles.comment}># Step 1: GKE クラスタで Workload Identity を有効化</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> container clusters update my-cluster \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--workload-pool</span>=PROJECT_ID.svc.id.goog \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--region</span>=asia-northeast1</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># ※ GKE Autopilot では自動的に有効化される</span></div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># Step 2: GSA を作成</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> iam service-accounts create wlifgke-api-backend \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--display-name</span>=<span className={styles.val}>&quot;GKE API Backend GSA&quot;</span></div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># Step 3: GSA に必要な権限を付与</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> projects add-iam-policy-binding PROJECT_ID \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--member</span>=<span className={styles.val}>&quot;serviceAccount:wlifgke-api-backend@PROJECT_ID.iam.gserviceaccount.com&quot;</span> \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--role</span>=<span className={styles.val}>&quot;roles/storage.objectViewer&quot;</span></div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># Step 4: KSA が GSA を使えるように IAM を設定</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> iam service-accounts add-iam-policy-binding \</div>
                                        <div className={styles['code-line']}>  wlifgke-api-backend@PROJECT_ID.iam.gserviceaccount.com \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--role</span>=roles/iam.workloadIdentityUser \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--member</span>=<span className={styles.val}>&quot;serviceAccount:PROJECT_ID.svc.id.goog[NAMESPACE/KSA_NAME]&quot;</span></div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># Step 5: KSA を作成してアノテーションを付ける</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>kubectl</span> create serviceaccount my-ksa <span className={styles.flag}>--namespace</span> my-namespace</div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>kubectl</span> annotate serviceaccount my-ksa \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--namespace</span> my-namespace \</div>
                                        <div className={styles['code-line']}>  iam.gke.io/gcp-service-account=wlifgke-api-backend@PROJECT_ID.iam.gserviceaccount.com</div>
                                    </code>
                                </pre>
                            </div>
                            <div className={styles['sub-title']}>Kubernetes マニフェスト</div>
                            <div className={styles['code-block']}>
                                <CopyButton code={`apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-ksa
  namespace: my-namespace
  annotations:
    iam.gke.io/gcp-service-account: wlifgke-api-backend@PROJECT_ID.iam.gserviceaccount.com
---
apiVersion: apps/v1
kind: Deployment
spec:
  template:
    spec:
      serviceAccountName: my-ksa  # ← KSA を指定するだけ（JSON キー不要）
      containers:
      - name: my-container
        image: gcr.io/PROJECT_ID/my-app:latest
        # GOOGLE_APPLICATION_CREDENTIALS の設定不要！
        # アプリは自動的に Workload Identity を使用する`} />
                                <pre>
                                    <code>
{`apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-ksa
  namespace: my-namespace
  annotations:
    iam.gke.io/gcp-service-account: wlifgke-api-backend@PROJECT_ID.iam.gserviceaccount.com
---
apiVersion: apps/v1
kind: Deployment
spec:
  template:
    spec:
      serviceAccountName: my-ksa  `}
                                        <span className={styles.comment}># ← KSA を指定するだけ（JSON キー不要）</span>{`
      containers:
      - name: my-container
        image: gcr.io/PROJECT_ID/my-app:latest
        `}
                                        <span className={styles.comment}># GOOGLE_APPLICATION_CREDENTIALS の設定不要！</span>{`
        `}
                                        <span className={styles.comment}># アプリは自動的に Workload Identity を使用する</span>
                                    </code>
                                </pre>
                            </div>
                            <div className={styles['bp-grid']}>
                                <div className={styles['bp-card']}><div className={styles['bp-num']}>1</div><div className={styles['bp-text']}><strong>JSON キーは絶対に使わずWorkload Identityを使用</strong> — キー漏洩リスクを根本から排除</div></div>
                                <div className={styles['bp-card']}><div className={styles['bp-num']}>2</div><div className={styles['bp-text']}><strong>GKE Autopilotを使うとWorkload Identityが自動有効</strong> — 設定漏れを防止</div></div>
                                <div className={styles['bp-card']}><div className={styles['bp-num']}>3</div><div className={styles['bp-text']}><strong>Namespace単位・Pod単位でKSAを分離</strong> — 最小権限の原則をコンテナレベルで適用</div></div>
                                <div className={styles['bp-card']}><div className={styles['bp-num']}>4</div><div className={styles['bp-text']}><strong>GSAの命名はwlifgke-プレフィックスを付ける</strong> — Workload Identity用SAだと一目で分かる</div></div>
                            </div>
                            <a href="https://cloud.google.com/iam/docs/workload-identities" target="_blank" rel="noopener noreferrer" className={styles['ref-link']}>🔗 Workload Identities for GKE</a>
                            <a href="https://cloud.google.com/kubernetes-engine/docs/concepts/autopilot-security" target="_blank" rel="noopener noreferrer" className={styles['ref-link']}>🔗 GKE Autopilot セキュリティ</a>
                        </div>
                    </div>

                    {/* 4.2-H */}
                    <div className={styles['topic-card']} id="s42-wif">
                        <div className={styles['topic-card-header']}>
                            <span className={styles['topic-number']}>4.2-H</span>
                            <span className={styles['topic-title']}>Workload Identity Federation のプロビジョニング</span>
                            <span className={styles['topic-new-badge']}>重要</span>
                        </div>
                        <div className={styles['topic-body']}>
                            <Diagram id="diag-11" label="Workload Identity Federation の全体フロー" />
                            <div className={styles['sub-title']}>GitHub Actions との設定（最もよく使われるパターン）</div>
                            <div className={styles['code-block']}>
                                <CopyButton code={`# Step 1: Workload Identity Pool を作成
gcloud iam workload-identity-pools create github-pool \\
  --location=global \\
  --display-name="GitHub Actions Pool" \\
  --description="GitHub Actions Workload Identity Pool"

# Step 2: GitHub の OIDC Provider を登録
gcloud iam workload-identity-pools providers create-oidc github-provider \\
  --location=global \\
  --workload-identity-pool=github-pool \\
  --display-name="GitHub OIDC Provider" \\
  --issuer-uri="https://token.actions.githubusercontent.com" \\
  --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository,attribute.actor=assertion.actor" \\
  --attribute-condition="assertion.repository_owner == 'my-org'"

# Step 3: GSA を作成
gcloud iam service-accounts create wlif-github-deploy \\
  --display-name="GitHub Actions Deployment SA"

# Step 4: GSA に必要な権限を付与
gcloud projects add-iam-policy-binding PROJECT_ID \\
  --member="serviceAccount:wlif-github-deploy@PROJECT_ID.iam.gserviceaccount.com" \\
  --role="roles/run.developer"

# Step 5: Workload Identity Pool が GSA を権限借用できるように設定
WORKLOAD_IDENTITY_POOL_ID=\$(gcloud iam workload-identity-pools describe github-pool \\
  --location=global --format="value(name)")

gcloud iam service-accounts add-iam-policy-binding \\
  wlif-github-deploy@PROJECT_ID.iam.gserviceaccount.com \\
  --role="roles/iam.workloadIdentityUser" \\
  --member="principalSet://iam.googleapis.com/\${WORKLOAD_IDENTITY_POOL_ID}/attribute.repository/my-org/my-repo"`} />
                                <pre>
                                    <code>
                                        <div className={styles['code-line']}><span className={styles.comment}># Step 1: Workload Identity Pool を作成</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> iam workload-identity-pools create github-pool \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--location</span>=global \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--display-name</span>=<span className={styles.val}>&quot;GitHub Actions Pool&quot;</span> \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--description</span>=<span className={styles.val}>&quot;GitHub Actions Workload Identity Pool&quot;</span></div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># Step 2: GitHub の OIDC Provider を登録</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> iam workload-identity-pools providers create-oidc github-provider \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--location</span>=global \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--workload-identity-pool</span>=github-pool \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--display-name</span>=<span className={styles.val}>&quot;GitHub OIDC Provider&quot;</span> \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--issuer-uri</span>=<span className={styles.val}>&quot;https://token.actions.githubusercontent.com&quot;</span> \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--attribute-mapping</span>=<span className={styles.val}>&quot;google.subject=assertion.sub,attribute.repository=assertion.repository,attribute.actor=assertion.actor&quot;</span> \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--attribute-condition</span>=<span className={styles.val}>&quot;assertion.repository_owner == &apos;my-org&apos;&quot;</span></div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># Step 3: GSA を作成</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> iam service-accounts create wlif-github-deploy \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--display-name</span>=<span className={styles.val}>&quot;GitHub Actions Deployment SA&quot;</span></div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># Step 4: GSA に必要な権限を付与</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> projects add-iam-policy-binding PROJECT_ID \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--member</span>=<span className={styles.val}>&quot;serviceAccount:wlif-github-deploy@PROJECT_ID.iam.gserviceaccount.com&quot;</span> \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--role</span>=<span className={styles.val}>&quot;roles/run.developer&quot;</span></div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># Step 5: Workload Identity Pool が GSA を権限借用できるように設定</span></div>
                                        <div className={styles['code-line']}>WORKLOAD_IDENTITY_POOL_ID=$(gcloud iam workload-identity-pools describe github-pool \</div>
                                        <div className={styles['code-line']}>  --location=global --format=&quot;value(name)&quot;)</div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> iam service-accounts add-iam-policy-binding \</div>
                                        <div className={styles['code-line']}>  wlif-github-deploy@PROJECT_ID.iam.gserviceaccount.com \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--role</span>=<span className={styles.val}>&quot;roles/iam.workloadIdentityUser&quot;</span> \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--member</span>=<span className={styles.val}>{"\"principalSet://iam.googleapis.com/\\${WORKLOAD_IDENTITY_POOL_ID}/attribute.repository/my-org/my-repo\""}</span></div>
                                    </code>
                                </pre>
                            </div>

                            <div className={styles['sub-title']}>GitHub Actions ワークフロー（SA キー不要）</div>
                            <div className={styles['code-block']}>
                                <CopyButton code={`name: Deploy to Cloud Run
on:
  push:
    branches: [main]

permissions:
  contents: read
  id-token: write   # OIDC トークンの生成を許可（必須）

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      # Workload Identity Federation で認証（SA キー不要！）
      - id: auth
        uses: google-github-actions/auth@v2
        with:
          workload_identity_provider: 'projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/github-pool/providers/github-provider'
          service_account: 'wlif-github-deploy@PROJECT_ID.iam.gserviceaccount.com'

      - name: Deploy to Cloud Run
        run: |
          gcloud run deploy my-service \\
            --image=gcr.io/PROJECT_ID/my-app:\${{ github.sha }} \\
            --region=asia-northeast1`} />
                                <pre>
                                    <code>
{`name: Deploy to Cloud Run
on:
  push:
    branches: [main]

permissions:
  contents: read
  id-token: write   `}
                                        <span className={styles.comment}># OIDC トークンの生成を許可（必須）</span>{`

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      `}
                                        <span className={styles.comment}># Workload Identity Federation で認証（SA キー不要！）</span>{`
      - id: auth
        uses: google-github-actions/auth@v2
        with:
          workload_identity_provider: 'projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/github-pool/providers/github-provider'
          service_account: 'wlif-github-deploy@PROJECT_ID.iam.gserviceaccount.com'

      - name: Deploy to Cloud Run
        run: |
          gcloud run deploy my-service \\
            --image=gcr.io/PROJECT_ID/my-app:\${{ github.sha }} \\
            --region=asia-northeast1`}
                                    </code>
                                </pre>
                            </div>

                            <div className={styles['sub-title']}>セキュリティ強化のための attribute-condition</div>
                            <div className={styles['code-block']}>
                                <CopyButton code={`# GitHub Actions: 特定の Organization のリポジトリのみ許可
--attribute-condition="assertion.repository_owner == 'my-org'"

# GitHub Actions: 特定のリポジトリのみ許可（より厳密）
--attribute-condition="assertion.repository == 'my-org/my-repo'"

# AWS: 特定の IAM ロールのみ許可
--attribute-condition="attribute.aws_role == 'arn:aws:sts::ACCOUNT:assumed-role/ROLE'"`} />
                                <pre>
                                    <code>
                                        <div className={styles['code-line']}><span className={styles.comment}># GitHub Actions: 特定の Organization のリポジトリのみ許可</span></div>
                                        <div className={styles['code-line']}><span className={styles.flag}>--attribute-condition</span>=<span className={styles.val}>&quot;assertion.repository_owner == &apos;my-org&apos;&quot;</span></div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># GitHub Actions: 特定のリポジトリのみ許可（より厳密）</span></div>
                                        <div className={styles['code-line']}><span className={styles.flag}>--attribute-condition</span>=<span className={styles.val}>&quot;assertion.repository == &apos;my-org/my-repo&apos;&quot;</span></div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># AWS: 特定の IAM ロールのみ許可</span></div>
                                        <div className={styles['code-line']}><span className={styles.flag}>--attribute-condition</span>=<span className={styles.val}>&quot;attribute.aws_role == &apos;arn:aws:sts::ACCOUNT:assumed-role/ROLE&apos;&quot;</span></div>
                                    </code>
                                </pre>
                            </div>

                            <div className={styles['sub-title']}>AWS との設定例</div>
                            <div className={`${styles.callout} ${styles['callout-blue']}`}>
                                <span className={styles['callout-icon']}>☁️</span>
                                <div>
                                    AWS 用の WIF 設定コマンドの例です。AWS アカウントIDを指定して Provider を作成し、AWS IAM ロールの ARN を <code>attribute-condition</code> でバインドします。
                                </div>
                            </div>
                            <div className={styles['code-block']}>
                                <CopyButton code={`# AWS 用 Workload Identity Pool を作成
gcloud iam workload-identity-pools create aws-pool \\
  --location=global \\
  --display-name="AWS Pool" \\
  --description="AWS Workload Identity Pool"

# AWS 用 Workload Identity Pool Provider を作成
gcloud iam workload-identity-pools providers create-aws aws-provider \\
  --location=global \\
  --workload-identity-pool=aws-pool \\
  --display-name="AWS Provider" \\
  --account-id=AWS_ACCOUNT_ID

# AWS EC2 インスタンスが Pool を使えるように設定
gcloud iam service-accounts add-iam-policy-binding \\
  wlif-aws-app@PROJECT_ID.iam.gserviceaccount.com \\
  --role="roles/iam.workloadIdentityUser" \\
  --member="principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/aws-pool/attribute.aws_role/arn:aws:sts::AWS_ACCOUNT_ID:assumed-role/MY_ROLE_NAME"`} />
                                <pre>
                                    <code>
                                        <div className={styles['code-line']}><span className={styles.comment}># AWS 用 Workload Identity Pool を作成</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> iam workload-identity-pools create aws-pool \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--location</span>=global \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--display-name</span>=<span className={styles.val}>&quot;AWS Pool&quot;</span> \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--description</span>=<span className={styles.val}>&quot;AWS Workload Identity Pool&quot;</span></div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># AWS 用 Workload Identity Pool Provider を作成</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> iam workload-identity-pools providers create-aws aws-provider \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--location</span>=global \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--workload-identity-pool</span>=aws-pool \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--display-name</span>=<span className={styles.val}>&quot;AWS Provider&quot;</span> \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--account-id</span>=AWS_ACCOUNT_ID</div>
                                        <div className={styles['code-line']}>&nbsp;</div>
                                        <div className={styles['code-line']}><span className={styles.comment}># AWS EC2 インスタンスが Pool を使えるように設定</span></div>
                                        <div className={styles['code-line']}><span className={styles.cmd}>gcloud</span> iam service-accounts add-iam-policy-binding \</div>
                                        <div className={styles['code-line']}>  wlif-aws-app@PROJECT_ID.iam.gserviceaccount.com \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--role</span>=<span className={styles.val}>&quot;roles/iam.workloadIdentityUser&quot;</span> \</div>
                                        <div className={styles['code-line']}>  <span className={styles.flag}>--member</span>=<span className={styles.val}>&quot;principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/aws-pool/attribute.aws_role/arn:aws:sts::AWS_ACCOUNT_ID:assumed-role/MY_ROLE_NAME&quot;</span></div>
                                    </code>
                                </pre>
                            </div>

                            <div className={styles['sub-title']}>WIF のセキュリティリスクと対策</div>
                            <div className={styles['table-wrap']}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">リスク</th>
                                            <th scope="col">対策</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><strong>なりすまし（Spoofing）</strong></td>
                                            <td><code>attribute-condition</code> で許可する外部 IdP を制限</td>
                                        </tr>
                                        <tr>
                                            <td><strong>権限昇格（Privilege Escalation）</strong></td>
                                            <td>Pool Provider に最小限の属性マッピングを設定</td>
                                        </tr>
                                        <tr>
                                            <td><strong>否認不可性の欠如</strong></td>
                                            <td>Cloud Audit Logs で権限借用イベントを監視</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className={styles['bp-grid']}>
                                <div className={styles['bp-card']}><div className={styles['bp-num']}>1</div><div className={styles['bp-text']}><strong>SA JSON キーの代わりに常にWIFを使用</strong> — キー管理不要・自動失効・より安全</div></div>
                                <div className={styles['bp-card']}><div className={styles['bp-num']}>2</div><div className={styles['bp-text']}><strong>attribute-conditionで外部IdPの範囲を必ず限定</strong> — なりすまし攻撃を防止</div></div>
                                <div className={styles['bp-card']}><div className={styles['bp-num']}>3</div><div className={styles['bp-text']}><strong>環境（dev/staging/prod）ごとに別のPoolを作成</strong> — 環境間の分離を確保</div></div>
                                <div className={styles['bp-card']}><div className={styles['bp-num']}>4</div><div className={styles['bp-text']}><strong>直接リソースアクセスをSA権限借用より優先</strong> — シンプルで管理しやすい</div></div>
                                <div className={styles['bp-card']}><div className={styles['bp-num']}>5</div><div className={styles['bp-text']}><strong>GSAの命名にwlif-プレフィックスを使用</strong> — WIF用SAだと一目で識別できる</div></div>
                                <div className={styles['bp-card']}><div className={styles['bp-num']}>6</div><div className={styles['bp-text']}><strong>Pool Providerは環境を表す意味のある名前にする</strong> — 管理・監査が容易になる</div></div>
                            </div>
                            <a href="https://cloud.google.com/iam/docs/workload-identity-federation" target="_blank" rel="noopener noreferrer" className={styles['ref-link']}>🔗 Workload Identity Federation 概要</a>
                            <a href="https://cloud.google.com/iam/docs/best-practices-for-using-workload-identity-federation" target="_blank" rel="noopener noreferrer" className={styles['ref-link']}>🔗 WIF ベストプラクティス</a>
                            <a href="https://cloud.google.com/iam/docs/best-practices-for-using-service-accounts-in-deployment-pipelines" target="_blank" rel="noopener noreferrer" className={styles['ref-link']}>🔗 デプロイパイプラインでの SA ベストプラクティス</a>
                        </div>
                    </div>

                    {/* ===== EXAM PATTERNS ===== */}
                    <div id="exam-patterns" className={`${styles['section-header']} ${styles['section-block']}`}>
                        <div className={`${styles['section-icon-wrap']} ${styles['section-icon-red']}`}>🎯</div>
                        <div className={styles['section-meta']}>
                            <div className={styles['section-number']}>試験対策</div>
                            <h2 className={styles['section-title-main']}>頻出パターン別 解法ガイド</h2>
                        </div>
                    </div>

                    {/* exam-patterns */}
                    <div className={styles['topic-card']}>
                        <div className={styles['topic-card-header']}>
                            <span className={styles['topic-number']}>試験-0</span>
                            <span className={styles['topic-title']}>頻出シナリオ別 解法ガイド（選択問題対策）</span>
                        </div>
                        <div className={styles['topic-body']}>
                            <div className={`${styles.callout} ${styles['callout-purple']}`}>
                                <span className={styles['callout-icon']}>📝</span>
                                <div>
                                    以下は試験で実際に出題される典型的なシナリオです。<strong>問題文のキーワードから正解を導く思考プロセス</strong>を確認してください。
                                </div>
                            </div>

                            <div className={styles['sub-title']}>パターン①: ロール選択問題</div>
                            <div className={styles['compare-grid']}>
                                <div className={styles['compare-bad']}>
                                    <div className={styles['compare-label']}>❌ 典型的な誤答パターン</div>
                                    <div className={styles['compare-content']}>
                                        「Cloud Run へのデプロイと Artifact Registry の読み取りだけできればいい」<br /><br />
                                        ❌ <code>roles/editor</code>（過剰：あらゆるリソースの変更権限を含む）<br />
                                        ❌ <code>roles/owner</code>（過剰：IAM管理権限まで含む）<br />
                                        ❌ <code>roles/run.admin</code>（過剰：Cloud Run 管理権限を含む）
                                    </div>
                                </div>
                                <div className={styles['compare-good']}>
                                    <div className={styles['compare-label']}>✓ 正解の考え方（最小権限）</div>
                                    <div className={styles['compare-content']}>
                                        必要な操作を正確に特定してロールを選択：<br /><br />
                                        ✅ Cloud Run へのデプロイ → <code>roles/run.developer</code><br />
                                        ✅ Artifact Registry の読み取り → <code>roles/artifactregistry.reader</code><br /><br />
                                        この2つのロールの組み合わせが最小権限の正解。
                                    </div>
                                </div>
                            </div>

                            <div className={styles['sub-title']}>パターン②: GKEでのSA問題</div>
                            <div className={styles['compare-grid']}>
                                <div className={styles['compare-bad']}>
                                    <div className={styles['compare-label']}>❌ よくある誤答</div>
                                    <div className={styles['compare-content']}>
                                        「GKE 上のアプリが Cloud Storage バケットにアクセスする必要がある」<br /><br />
                                        ❌ SA の JSON キーを Kubernetes Secret に保存してマウントする<br />
                                        ❌ Node の SA に直接権限を付与する（すべての Pod に影響）<br />
                                        ❌ アプリコード内に認証情報をハードコードする
                                    </div>
                                </div>
                                <div className={styles['compare-good']}>
                                    <div className={styles['compare-label']}>✓ 正解: Workload Identity Federation for GKE</div>
                                    <div className={styles['compare-content']}>
                                        KSA と GSA を紐付けてキーレス認証を実現：<br /><br />
                                        ✅ GKE クラスタで Workload Identity を有効化<br />
                                        ✅ KSA に <code>iam.gke.io/gcp-service-account</code> アノテーション付与<br />
                                        ✅ GSA に <code>roles/iam.workloadIdentityUser</code> を設定<br />
                                        ✅ JSON キーは一切不要
                                    </div>
                                </div>
                            </div>

                            <div className={styles['sub-title']}>パターン③: Workload Identity Federation 問題</div>
                            <div className={styles['compare-grid']}>
                                <div className={styles['compare-bad']}>
                                    <div className={styles['compare-label']}>❌ よくある誤答</div>
                                    <div className={styles['compare-content']}>
                                        「GitHub Actions から SA JSON キーを使わずに GCP リソースを操作したい」<br /><br />
                                        ❌ SA JSON キーを GitHub Secrets に保存する（SA キー自体が非推奨）<br />
                                        ❌ ADC を GitHub Actions 環境に設定する（GKE 等のコンピュート外では使えない）
                                    </div>
                                </div>
                                <div className={styles['compare-good']}>
                                    <div className={styles['compare-label']}>✓ 正解: Workload Identity Federation</div>
                                    <div className={styles['compare-content']}>
                                        キーレス認証のセットアップ手順：<br /><br />
                                        ✅ 1. Workload Identity Pool を作成<br />
                                        ✅ 2. GitHub の OIDC Provider を Pool に登録<br />
                                        ✅ 3. GSA に <code>roles/iam.workloadIdentityUser</code> を付与<br />
                                        ✅ 4. GitHub Actions で <code>google-github-actions/auth@v2</code> を使用<br />
                                        ✅ 5. permissions: <code>id-token: write</code> を設定（必須）
                                    </div>
                                </div>
                            </div>

                            <div className={styles['sub-title']}>パターン④: 短期クレデンシャル・権限借用問題</div>
                            <div className={styles['compare-grid']}>
                                <div className={styles['compare-bad']}>
                                    <div className={styles['compare-label']}>❌ よくある誤答</div>
                                    <div className={styles['compare-content']}>
                                        「あるユーザーが特定の管理タスクを一時的に実行する必要がある。最小権限の原則に従い監査証跡を残すには？」<br /><br />
                                        ❌ ユーザーに直接 <code>roles/storage.admin</code> を付与する（永続的で過剰）<br />
                                        ❌ SA の JSON キーを一時的に渡す（キー管理が困難）
                                    </div>
                                </div>
                                <div className={styles['compare-good']}>
                                    <div className={styles['compare-label']}>✓ 正解: SA 権限借用（Impersonation）</div>
                                    <div className={styles['compare-content']}>
                                        一時的な特権アクセスのベストプラクティス：<br /><br />
                                        ✅ 特権 SA に <code>roles/iam.serviceAccountTokenCreator</code> を付与<br />
                                        ✅ <code>gcloud --impersonate-service-account</code> フラグで操作<br />
                                        ✅ 操作は Cloud Audit Logs に自動記録<br />
                                        ✅ 1時間でトークンが自動失効
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles['topic-card']}>
                        <div className={styles['topic-card-header']}>
                            <span className={styles['topic-number']}>試験-A</span>
                            <span className={styles['topic-title']}>キーワード → 正解サービス・設定 即答マップ</span>
                        </div>
                        <div className={styles['topic-body']}>
                            <div className={styles['pattern-grid']}>
                                <div className={styles['pattern-card']}>
                                    <div className={`${styles['pattern-card-head']} ${styles['ph-blue']}`}>🔑 Pattern A: IAMロール選択</div>
                                    <div className={styles['pattern-row']}><span className={styles['pattern-kw']}>「Cloud Run にデプロイのみ」</span><span className={`${styles['pattern-ans']} ${styles.blue}`}>roles/run.developer</span></div>
                                    <div className={styles['pattern-row']}><span className={styles['pattern-kw']}>「Cloud Runを呼び出すだけ」</span><span className={`${styles['pattern-ans']} ${styles.blue}`}>roles/run.invoker</span></div>
                                    <div className={styles['pattern-row']}><span className={styles['pattern-kw']}>「GCSのオブジェクト読み取りのみ」</span><span className={`${styles['pattern-ans']} ${styles.blue}`}>roles/storage.objectViewer</span></div>
                                    <div className={styles['pattern-row']}><span className={styles['pattern-kw']}>「SSH接続のみ（sudo不要）」</span><span className={`${styles['pattern-ans']} ${styles.blue}`}>roles/compute.osLogin</span></div>
                                    <div className={styles['pattern-row']}><span className={styles['pattern-kw']}>「SSH接続のみ（sudo必要）」</span><span className={`${styles['pattern-ans']} ${styles.blue}`}>roles/compute.osAdminLogin</span></div>
                                    <div className={styles['pattern-row']}><span className={styles['pattern-kw']}>「SAをVMにアタッチしたい」</span><span className={`${styles['pattern-ans']} ${styles.blue}`}>roles/iam.serviceAccountUser</span></div>
                                    <div className={styles['pattern-row']}><span className={styles['pattern-kw']}>「SAの権限を一時的に借用したい」</span><span className={`${styles['pattern-ans']} ${styles.blue}`}>roles/iam.serviceAccountTokenCreator</span></div>
                                    <div className={styles['pattern-row']}><span className={styles['pattern-kw']}>「シークレット値の読み取りのみ」</span><span className={`${styles['pattern-ans']} ${styles.blue}`}>roles/secretmanager.secretAccessor</span></div>
                                </div>
                                <div className={styles['pattern-card']}>
                                    <div className={`${styles['pattern-card-head']} ${styles['ph-cyan']}`}>🤖 Pattern B: SA認証方式選択</div>
                                    <div className={styles['pattern-row']}><span className={styles['pattern-kw']}>「GCE/GKE/Cloud RunからGCP APIへ」</span><span className={`${styles['pattern-ans']} ${styles.cyan}`}>SAをリソースにアタッチ</span></div>
                                    <div className={styles['pattern-row']}><span className={styles['pattern-kw']}>「ローカル開発からGCP APIへ」</span><span className={`${styles['pattern-ans']} ${styles.cyan}`}>ADC (gcloud auth app-default login)</span></div>
                                    <div className={styles['pattern-row']}><span className={styles['pattern-kw']}>「GitHub ActionsからGCP APIへ」</span><span className={`${styles['pattern-ans']} ${styles.cyan}`}>Workload Identity Federation</span></div>
                                    <div className={styles['pattern-row']}><span className={styles['pattern-kw']}>「AWS EC2からGCP APIへ」</span><span className={`${styles['pattern-ans']} ${styles.cyan}`}>Workload Identity Federation</span></div>
                                    <div className={styles['pattern-row']}><span className={styles['pattern-kw']}>「一時的に特権操作が必要」</span><span className={`${styles['pattern-ans']} ${styles.cyan}`}>SA Impersonation</span></div>
                                    <div className={styles['pattern-row']}><span className={styles['pattern-kw']}>「承認フロー付きの特権アクセス」</span><span className={`${styles['pattern-ans']} ${styles.cyan}`}>PAM (Privileged Access Manager)</span></div>
                                    <div className={styles['pattern-row']}><span className={styles['pattern-kw']}>「GKEのPodからGCP APIへ」</span><span className={`${styles['pattern-ans']} ${styles.cyan}`}>Workload Identity for GKE</span></div>
                                </div>
                                <div className={styles['pattern-card']}>
                                    <div className={`${styles['pattern-card-head']} ${styles['ph-purple']}`}>📜 Pattern C: IAMポリシー操作</div>
                                    <div className={styles['pattern-row']}><span className={styles['pattern-kw']}>「既存ポリシーにバインディングを追加」</span><span className={`${styles['pattern-ans']} ${styles.purple}`}>add-iam-policy-binding</span></div>
                                    <div className={styles['pattern-row']}><span className={styles['pattern-kw']}>「既存ポリシーからバインディングを削除」</span><span className={`${styles['pattern-ans']} ${styles.purple}`}>remove-iam-policy-binding</span></div>
                                    <div className={styles['pattern-row']}><span className={styles['pattern-kw']}>「ポリシー全体を置き換え（危険）」</span><span className={`${styles['pattern-ans']} ${styles.purple}`}>set-iam-policy</span></div>
                                    <div className={styles['pattern-row']}><span className={styles['pattern-kw']}>「特定の権限を強制的に拒否したい」</span><span className={`${styles['pattern-ans']} ${styles.purple}`}>Deny Policy</span></div>
                                    <div className={styles['pattern-row']}><span className={styles['pattern-kw']}>「有効期限付きの権限を付与したい」</span><span className={`${styles['pattern-ans']} ${styles.purple}`}>IAM Conditions</span></div>
                                    <div className={styles['pattern-row']}><span className={styles['pattern-kw']}>「不要な権限を自動検出したい」</span><span className={`${styles['pattern-ans']} ${styles.purple}`}>Policy Recommender</span></div>
                                    <div className={styles['pattern-row']}><span className={styles['pattern-kw']}>「特定リソースにアクセスできる全Identityを調査」</span><span className={`${styles['pattern-ans']} ${styles.purple}`}>Policy Analyzer</span></div>
                                </div>
                                <div className={styles['pattern-card']}>
                                    <div className={`${styles['pattern-card-head']} ${styles['ph-red']}`}>🚨 Pattern D: 引っかけに注意</div>
                                    <div className={styles['pattern-row']}><span className={styles['pattern-kw']}>「SA JSONキーは90日で自動失効」</span><span className={styles['pattern-ans']} style={{ color: '#ef5350' }}>❌ 失効しない（無期限）</span></div>
                                    <div className={styles['pattern-row']}><span className={styles['pattern-kw']}>「下位で上位のロールを削除できる」</span><span className={styles['pattern-ans']} style={{ color: '#ef5350' }}>❌ できない（和集合）</span></div>
                                    <div className={styles['pattern-row']}><span className={styles['pattern-kw']}>「基本ロールは開発環境なら使っていい」</span><span className={styles['pattern-ans']} style={{ color: '#ef5350' }}>❌ 原則禁止</span></div>
                                    <div className={styles['pattern-row']}><span className={styles['pattern-kw']}>「GKEでのJSON Keyを K8s Secret で管理」</span><span className={styles['pattern-ans']} style={{ color: '#ef5350' }}>❌ Workload Identity を使う</span></div>
                                    <div className={styles['pattern-row']}><span className={styles['pattern-kw']}>「カスタムロールはPJとOrg間で共有可能」</span><span className={styles['pattern-ans']} style={{ color: '#ef5350' }}>❌ それぞれで独立管理</span></div>
                                    <div className={styles['pattern-row']}><span className={styles['pattern-kw']}>「自己権限借用でトークンを無限更新」</span><span className={styles['pattern-ans']} style={{ color: '#ef5350' }}>❌ IAMが禁止している</span></div>
                                    <div className={styles['pattern-row']}><span className={styles['pattern-kw']}>「GKE Autopilotでは Workload Identity は任意設定」</span><span className={styles['pattern-ans']} style={{ color: '#ef5350' }}>❌ 自動有効化される</span></div>
                                    <div className={styles['pattern-row']}><span className={styles['pattern-kw']}>「SA JSONキーをローテーションすれば安全」</span><span className={styles['pattern-ans']} style={{ color: '#ef5350' }}>❌ WIF/短期クレデンシャルが最安全</span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ===== TRAPS ===== */}
                    <div id="traps" className={`${styles['section-header']} ${styles['section-block']}`}>
                        <div className={`${styles['section-icon-wrap']} ${styles['section-icon-red']}`}>⚠️</div>
                        <div className={styles['section-meta']}>
                            <div className={styles['section-number']}>引っかけ対策</div>
                            <h2 className={styles['section-title-main']}>引っかけ問題パターン 完全攻略</h2>
                        </div>
                    </div>

                    {/* traps */}
                    <div className={styles['topic-card']}>
                        <div className={styles['topic-card-header']}>
                            <span className={styles['topic-number']}>罠-A</span>
                            <span className={styles['topic-title']}>試験で狙われる「よくある誤解」 10選</span>
                        </div>
                        <div className={styles['topic-body']}>
                            <div className={`${styles.callout} ${styles['callout-red']}`}>
                                <span className={styles['callout-icon']}>🚨</span>
                                <div>
                                    以下のパターンは試験で頻繁に出題される「引っかけ」です。<strong>全問正答できるまで繰り返し確認</strong>してください。
                                </div>
                            </div>
                            <div className={styles['table-wrap']}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">よくある誤解（問題文に出る表現）</th>
                                            <th scope="col">正しい理解</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>「SA JSON キーをローテーションすれば安全」</td>
                                            <td>✅ キー自体を使わない WIF / 短期クレデンシャルが最安全。ローテーションしても漏洩リスクは残る。</td>
                                        </tr>
                                        <tr>
                                            <td>「SA キーは90日で自動失効する」</td>
                                            <td>❌ <strong>SA キーはデフォルトで失効しない（無期限）</strong>。IAM Conditions などで明示的に期限設定が必要。</td>
                                        </tr>
                                        <tr>
                                            <td>「基本ロール（Editor）は開発環境なら使っていい」</td>
                                            <td>❌ <strong>本番/開発問わず原則禁止</strong>。事前定義ロールを用途に合わせて使うこと。</td>
                                        </tr>
                                        <tr>
                                            <td>「下位階層でロールを削除すれば上位の権限を制限できる」</td>
                                            <td>❌ <strong>下位で削除しても上位の継承は無効にならない</strong>（権限は和集合）。制限したい場合は Deny Policy を使う。</td>
                                        </tr>
                                        <tr>
                                            <td>「カスタムロールはプロジェクトと組織レベルで共有できる」</td>
                                            <td>✅ <strong>Organizationレベルで作成されたカスタムロールは、同じ組織内のプロジェクトやフォルダに直接バインドして割り当てることができます。別々に作成し直す必要はありません。組織階層全体で直接利用可能です。</strong>（※プロジェクトレベルで作成されたカスタムロールは、そのプロジェクト内でのみ利用可能です）</td>
                                        </tr>
                                        <tr>
                                            <td>「GKE Autopilot では Workload Identity は任意設定」</td>
                                            <td>❌ <strong>GKE Autopilot では Workload Identity が自動有効化</strong>される。無効化できない。</td>
                                        </tr>
                                        <tr>
                                            <td>「自己権限借用で短期トークンを無限に更新できる」</td>
                                            <td>❌ <strong>IAM は自己権限借用を明示的に禁止</strong>している。盗まれたトークンを使って新しいトークンを取得する攻撃を防ぐため。</td>
                                        </tr>
                                        <tr>
                                            <td>「roles/iam.serviceAccountUser があればSAの短期トークンを生成できる」</td>
                                            <td>❌ <strong>短期トークンの生成には <code>roles/iam.serviceAccountTokenCreator</code> が必要</strong>。<code>serviceAccountUser</code> は SA を VM 等にアタッチする (actAs) 権限。</td>
                                        </tr>
                                        <tr>
                                            <td>「Node の SA に権限を付与すれば GKE の Pod から GCP API にアクセスできる」</td>
                                            <td>⚠️ 技術的には可能だが<strong>全 Pod に影響するため非推奨</strong>。Pod 単位で KSA を使った Workload Identity を設定すること。</td>
                                        </tr>
                                        <tr>
                                            <td>「set-iam-policy は add-iam-policy-binding より細かく制御できる」</td>
                                            <td>❌ <strong>set-iam-policy はポリシー全体を上書きする危険なコマンド</strong>。個別バインディングには add/remove-iam-policy-binding を使う。</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* ===== CHECKLIST ===== */}
                    <div id="checklist" className={`${styles['section-header']} ${styles['section-block']}`}>
                        <div className={`${styles['section-icon-wrap']} ${styles['section-icon-green']}`}>✅</div>
                        <div className={styles['section-meta']}>
                            <div className={styles['section-number']}>直前確認</div>
                            <h2 className={styles['section-title-main']}>Section 4 直前チェックリスト</h2>
                        </div>
                    </div>

                    {/* checklist 4.1 */}
                    <div className={styles['topic-card']}>
                        <div className={styles['topic-card-header']}>
                            <span className={styles['topic-number']}>Check-A</span>
                            <span className={styles['topic-title']}>4.1 IAMの管理</span>
                        </div>
                        <div className={styles['topic-body']}>
                            <ul className={styles.checklist}>
                                <ChecklistItem label="IAMポリシーのJSON構造（version, bindings, etag）を説明できる" />
                                <ChecklistItem label="add-iam-policy-binding と set-iam-policy の違いと危険性を知っている" />
                                <ChecklistItem label="組織・フォルダ・プロジェクト・リソース各レベルでのロール付与コマンドを知っている" />
                                <ChecklistItem label="IAMポリシーが上位から下位へ継承され下位で上位を取り消せないことを知っている（和集合）" />
                                <ChecklistItem label="IAM Conditions で時間・日付・リソースパスの条件を付与できる" />
                                <ChecklistItem label="Deny Policy が Allow Policy より優先されることを知っている" />
                                <ChecklistItem label="基本ロール（Editor/Owner）を本番環境で使うべきでない理由を説明できる" />
                                <ChecklistItem label="カスタムロールのライフサイクル（ALPHA → BETA → GA → DISABLED → DELETED）を知っている" />
                                <ChecklistItem label="roles/iam.serviceAccountUser（actAs）と roles/iam.serviceAccountTokenCreator の違いを説明できる" />
                                <ChecklistItem label="Policy Analyzer でアクセス権を分析できることを知っている" />
                            </ul>
                        </div>
                    </div>

                    {/* checklist 4.2 */}
                    <div className={styles['topic-card']}>
                        <div className={styles['topic-card-header']}>
                            <span className={styles['topic-number']}>Check-B</span>
                            <span className={styles['topic-title']}>4.2 サービスアカウントの管理</span>
                        </div>
                        <div className={styles['topic-body']}>
                            <ul className={styles.checklist}>
                                <ChecklistItem label="ユーザー管理 SA・デフォルト SA・Google 管理 SA の違いを説明できる" />
                                <ChecklistItem label="デフォルト SA の過剰権限問題を知っており専用 SA を使う理由を説明できる" />
                                <ChecklistItem label="roles/iam.serviceAccountUser（actAs）が必要なケースを説明できる" />
                                <ChecklistItem label="roles/iam.serviceAccountTokenCreator が権限借用に必要なことを知っている" />
                                <ChecklistItem label="SA 権限借用のフロー（一時トークン・監査ログ・1時間失効）を説明できる" />
                                <ChecklistItem label="短期クレデンシャルの種類（OAuth2.0 / OIDC IDトークン / 自己署名JWT）を知っている" />
                                <ChecklistItem label="自己権限借用が禁止されている理由を説明できる" />
                                <ChecklistItem label="GKE での Workload Identity Federation の設定フロー（KSA → GSA 紐付け）を説明できる" />
                                <ChecklistItem label="iam.gke.io/gcp-service-account アノテーションの役割を知っている" />
                                <ChecklistItem label="Workload Identity Federation の設定フロー（Pool → Provider → GSA）を説明できる" />
                                <ChecklistItem label="attribute-condition でセキュリティを強化する方法を知っている" />
                                <ChecklistItem label="GitHub Actions での WIF 設定と id-token: write permission の必要性を知っている" />
                                <ChecklistItem label="SA JSON キーより WIF・短期クレデンシャル・Workload Identity が推奨される理由を説明できる" />
                                <ChecklistItem label="命名規則（vm-、wlif-、wlifgke-）の目的を知っている" />
                            </ul>
                        </div>
                    </div>

                    {/* Final Advice */}
                    <div className={styles['topic-card']}>
                        <div className={styles['topic-card-header']}>
                            <span className={styles['topic-number']}>📝 Advice</span>
                            <span className={styles['topic-title']}>Section 4 学習の最終アドバイス — 必ず押さえる5つのポイント</span>
                        </div>
                        <div className={styles['topic-body']}>
                            <div className={`${styles.callout} ${styles['callout-blue']}`}>
                                <span className={styles['callout-icon']}>💡</span>
                                <div>
                                    Section 4 はセキュリティ設計に関するドメインで、試験配点は約<strong>20%</strong>です。他のドメイン（GKE・Cloud Run・Terraform）とも深く連携しており、IAM・SA の知識は試験全体を通じて問われます。
                                </div>
                            </div>
                            <div className={styles['bp-grid']}>
                                <div className={styles['bp-card']} style={{ borderColor: 'rgba(234,67,53,0.4)', background: 'rgba(234,67,53,0.06)' }}>
                                    <div className={styles['bp-num']} style={{ background: 'rgba(234,67,53,0.18)', color: '#ef5350' }}>①</div>
                                    <div className={styles['bp-text']} style={{ color: 'var(--color-foreground)' }}>
                                        <strong style={{ color: '#ef5350' }}>SA JSON キーは使わない</strong><br />
                                        <span style={{ fontSize: '11.5px', color: 'var(--color-muted-foreground)' }}>→ WIF / 短期クレデンシャル / Workload Identity を使う。キーは漏洩・失効なし・管理困難のリスクを持つ。</span>
                                    </div>
                                </div>
                                <div className={styles['bp-card']} style={{ borderColor: 'rgba(234,67,53,0.4)', background: 'rgba(234,67,53,0.06)' }}>
                                    <div className={styles['bp-num']} style={{ background: 'rgba(234,67,53,0.18)', color: '#ef5350' }}>②</div>
                                    <div className={styles['bp-text']} style={{ color: 'var(--color-foreground)' }}>
                                        <strong style={{ color: '#ef5350' }}>基本ロール（Editor/Owner）は本番禁止</strong><br />
                                        <span style={{ fontSize: '11.5px', color: 'var(--color-muted-foreground)' }}>→ 必ず事前定義ロールを用途に合わせて選択。カスタムロールは管理コストを考慮して最小限に。</span>
                                    </div>
                                </div>
                                <div className={styles['bp-card']} style={{ borderColor: 'rgba(52,168,83,0.4)', background: 'rgba(52,168,83,0.06)' }}>
                                    <div className={styles['bp-num']} style={{ background: 'rgba(52,168,83,0.18)', color: 'var(--color-google-green)' }}>③</div>
                                    <div className={styles['bp-text']} style={{ color: 'var(--color-foreground)' }}>
                                        <strong style={{ color: 'var(--color-google-green)' }}>GKE での SA 利用は Workload Identity Federation for GKE 一択</strong><br />
                                        <span style={{ fontSize: '11.5px', color: 'var(--color-muted-foreground)' }}>→ KSA + GSA の紐付けでキーレス認証。GKE Autopilot では自動有効化。</span>
                                    </div>
                                </div>
                                <div className={styles['bp-card']} style={{ borderColor: 'rgba(66,133,244,0.4)', background: 'rgba(66,133,244,0.06)' }}>
                                    <div className={styles['bp-num']} style={{ background: 'rgba(66,133,244,0.18)', color: 'var(--color-google-blue)' }}>④</div>
                                    <div className={styles['bp-text']} style={{ color: 'var(--color-foreground)' }}>
                                        <strong style={{ color: 'var(--color-google-blue)' }}>権限借用（Impersonation）で一時的な特権アクセスを管理</strong><br />
                                        <span style={{ fontSize: '11.5px', color: 'var(--color-muted-foreground)' }}>→ TokenCreator ロールで短期トークンを取得。1時間で自動失効し、Cloud Audit Logs に記録される。</span>
                                    </div>
                                </div>
                                <div className={styles['bp-card']} style={{ borderColor: 'rgba(124,77,255,0.4)', background: 'rgba(124,77,255,0.06)' }}>
                                    <div className={styles['bp-num']} style={{ background: 'rgba(124,77,255,0.18)', color: '#9334e6' }}>⑤</div>
                                    <div className={styles['bp-text']} style={{ color: 'var(--color-foreground)' }}>
                                        <strong style={{ color: '#9334e6' }}>Workload Identity Federation で外部ワークロードのキーレス認証</strong><br />
                                        <span style={{ fontSize: '11.5px', color: 'var(--color-muted-foreground)' }}>→ Pool + Provider + attribute-condition の3点セットで設定。GitHub Actions / AWS / オンプレミスを SA キーなしで認証。</span>
                                    </div>
                                </div>
                            </div>
                            <div className={`${styles.callout} ${styles['callout-green']}`}>
                                <span className={styles['callout-icon']}>✅</span>
                                <div>
                                    IAM の継承（和集合）・Deny Policy の優先・SA の二重の役割・自己権限借用の禁止は<strong>試験頻出の概念</strong>です。理屈から理解することで、初見の問題でも正解を導けます。
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* REFS */}
                    <div id="refs" className={`${styles['section-header']} ${styles['section-block']}`}>
                        <div className={`${styles['section-icon-wrap']} ${styles['section-icon-blue']}`}>🔗</div>
                        <div className={styles['section-meta']}>
                            <div className={styles['section-number']}>参考リソース</div>
                            <h2 className={styles['section-title-main']}>公式ドキュメント一覧</h2>
                        </div>
                    </div>

                    <div className={styles['refs-grid']}>
                        <a href="https://cloud.google.com/learn/certification/cloud-engineer?hl=en" target="_blank" rel="noopener noreferrer" className={styles['ref-item']}><div className={styles['ref-dot']} /><div className={styles['ref-text']}><strong>ACE 試験公式ページ</strong>認定資格の概要・登録</div></a>
                        <a href="https://services.google.com/fh/files/misc/063026_associate_cloud_engineer_exam_guide_english.pdf" target="_blank" rel="noopener noreferrer" className={styles['ref-item']}><div className={styles['ref-dot']} /><div className={styles['ref-text']}><strong>試験ガイド PDF（2025年6月版）</strong>出題範囲の詳細</div></a>
                        <a href="https://cloud.google.com/iam/docs/resource-hierarchy-access-control" target="_blank" rel="noopener noreferrer" className={styles['ref-item']}><div className={styles['ref-dot']} /><div className={styles['ref-text']}><strong>IAM リソース階層とアクセス制御</strong>継承メカニズムの詳細</div></a>
                        <a href="https://cloud.google.com/iam/docs/roles-overview" target="_blank" rel="noopener noreferrer" className={styles['ref-item']}><div className={styles['ref-dot']} /><div className={styles['ref-text']}><strong>IAM ロールの概要</strong>ロール種別の説明</div></a>
                        <a href="https://cloud.google.com/iam/docs/creating-custom-roles" target="_blank" rel="noopener noreferrer" className={styles['ref-item']}><div className={styles['ref-dot']} /><div className={styles['ref-text']}><strong>カスタムロールの作成と管理</strong>YAML定義とライフサイクル</div></a>
                        <a href="https://cloud.google.com/iam/docs/deny-overview" target="_blank" rel="noopener noreferrer" className={styles['ref-item']}><div className={styles['ref-dot']} /><div className={styles['ref-text']}><strong>Deny Policy 概要</strong>拒否ポリシーの仕組み</div></a>
                        <a href="https://cloud.google.com/iam/docs/conditions-overview" target="_blank" rel="noopener noreferrer" className={styles['ref-item']}><div className={styles['ref-dot']} /><div className={styles['ref-text']}><strong>IAM Conditions</strong>条件付きバインディング</div></a>
                        <a href="https://cloud.google.com/iam/docs/best-practices-service-accounts" target="_blank" rel="noopener noreferrer" className={styles['ref-item']}><div className={styles['ref-dot']} /><div className={styles['ref-text']}><strong>SA のベストプラクティス</strong>安全なSA管理の指針</div></a>
                        <a href="https://cloud.google.com/iam/docs/service-account-impersonation" target="_blank" rel="noopener noreferrer" className={styles['ref-item']}><div className={styles['ref-dot']} /><div className={styles['ref-text']}><strong>SA の権限借用</strong>Impersonationの設定方法</div></a>
                        <a href="https://cloud.google.com/iam/docs/create-short-lived-credentials-direct" target="_blank" rel="noopener noreferrer" className={styles['ref-item']}><div className={styles['ref-dot']} /><div className={styles['ref-text']}><strong>短期クレデンシャルの作成</strong>トークン種別と生成方法</div></a>
                        <a href="https://cloud.google.com/iam/docs/service-account-creds" target="_blank" rel="noopener noreferrer" className={styles['ref-item']}><div className={styles['ref-dot']} /><div className={styles['ref-text']}><strong>SA クレデンシャルの種類</strong>OAuth / OIDC / JWT</div></a>
                        <a href="https://cloud.google.com/iam/docs/service-account-permissions" target="_blank" rel="noopener noreferrer" className={styles['ref-item']}><div className={styles['ref-dot']} /><div className={styles['ref-text']}><strong>SA 権限のロール</strong>actAs権限の詳細</div></a>
                        <a href="https://cloud.google.com/iam/docs/workload-identity-federation" target="_blank" rel="noopener noreferrer" className={styles['ref-item']}><div className={styles['ref-dot']} /><div className={styles['ref-text']}><strong>Workload Identity Federation 概要</strong>外部ワークロードの認証</div></a>
                        <a href="https://cloud.google.com/iam/docs/best-practices-for-using-workload-identity-federation" target="_blank" rel="noopener noreferrer" className={styles['ref-item']}><div className={styles['ref-dot']} /><div className={styles['ref-text']}><strong>WIF ベストプラクティス</strong>セキュアな設定の指針</div></a>
                        <a href="https://cloud.google.com/iam/docs/workload-identities" target="_blank" rel="noopener noreferrer" className={styles['ref-item']}><div className={styles['ref-dot']} /><div className={styles['ref-text']}><strong>Workload Identities for GKE</strong>GKEでのWIF設定</div></a>
                        <a href="https://cloud.google.com/iam/docs/best-practices-for-using-service-accounts-in-deployment-pipelines" target="_blank" rel="noopener noreferrer" className={styles['ref-item']}><div className={styles['ref-dot']} /><div className={styles['ref-text']}><strong>デプロイパイプラインでのSAベストプラクティス</strong>CI/CD向け設定</div></a>
                        <a href="https://cloud.google.com/kubernetes-engine/docs/concepts/autopilot-security" target="_blank" rel="noopener noreferrer" className={styles['ref-item']}><div className={styles['ref-dot']} /><div className={styles['ref-text']}><strong>GKE Autopilot セキュリティ</strong>自動セキュリティ強化</div></a>
                        <a href="https://cloud.google.com/resource-manager/docs/access-control-org" target="_blank" rel="noopener noreferrer" className={styles['ref-item']}><div className={styles['ref-dot']} /><div className={styles['ref-text']}><strong>組織レベルのアクセス制御</strong>Org IAM管理</div></a>
                        <a href="https://cloud.google.com/blog/products/identity-security/iam-best-practice-guides-available-now" target="_blank" rel="noopener noreferrer" className={styles['ref-item']}><div className={styles['ref-dot']} /><div className={styles['ref-text']}><strong>IAM ベストプラクティスガイド</strong>実務向け設計指針</div></a>
                    </div>

                </div>
            </main>

            <button
                type="button"
                className={`${styles['scroll-top']} ${scrollTopVisible ? styles.visible : ''}`}
                onClick={scrollToTop}
                aria-label="ページ最上部へスクロール"
            >
                ↑
            </button>
        </div>
    );
}
