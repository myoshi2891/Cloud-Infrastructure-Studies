import React from 'react';
import sharedStyles from './SharedSection.module.css';
import { DiagramSVG } from '@/components/DiagramSVG';

/**
 * Render the "Section 5" content block describing Network Security design and implementation for the PCNE guide.
 */
export function Section5() {
    return (
        <section className={sharedStyles.section} id="s5" aria-labelledby="s5-title">
            <div className={sharedStyles.sectionLabel}>Section 5 (~12%)</div>
            <h2
                className={sharedStyles.sectionTitle}
                id="s5-title"
                style={{ color: 'var(--color-theme-cdl-fg)' }}
            >
                ネットワークセキュリティ設計と実装
            </h2>
            <p className={sharedStyles.sectionDesc}>
                約12%を占めるセクション。Cloud Armor・VPC Service
                Controls・IAP・SSL/TLSの組み合わせが頻出。「どのサービスを使えばデータ漏洩を防げるか」が問われる。
            </p>
            <div className={sharedStyles.divider}></div>

            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🛡️</span> 5.1 Cloud Armor ─ WAF・DDoS・Rate
                    Limiting・Adaptive Protection
                </h3>
                <div className={sharedStyles.cardGrid}>
                    <div className={sharedStyles.card}>
                        <div className={sharedStyles.cardIcon}>🛡</div>
                        <div className={sharedStyles.cardTitle}>DDoS防御</div>
                        <div className={sharedStyles.cardBody}>
                            L3/L4のボリューム攻撃（SYN Flood・UDP
                            Flood）をGoogleインフラレベルで自動緩和。ユーザー設定不要。
                        </div>
                    </div>
                    <div className={sharedStyles.card}>
                        <div className={sharedStyles.cardIcon}>🔍</div>
                        <div className={sharedStyles.cardTitle}>WAF（L7）</div>
                        <div className={sharedStyles.cardBody}>
                            SQLインジェクション・XSSなどOWASPトップ10対策。事前設定ルール（Preconfigured
                            Rules）を有効化するだけ。
                        </div>
                    </div>
                    <div className={sharedStyles.card}>
                        <div className={sharedStyles.cardIcon}>⚡</div>
                        <div className={sharedStyles.cardTitle}>Rate Limiting</div>
                        <div className={sharedStyles.cardBody}>
                            単一IPからの過剰リクエストを制限。スロットリング（503）またはリダイレクトで対応。大量リクエスト攻撃に有効。
                        </div>
                    </div>
                    <div className={sharedStyles.card}>
                        <div className={sharedStyles.cardIcon}>🤖</div>
                        <div className={sharedStyles.cardTitle}>Adaptive Protection</div>
                        <div className={sharedStyles.cardBody}>
                            AIがトラフィックパターンを分析し、L7
                            DDoS攻撃を自動検出して防御ルールを推奨。有効化を強く推奨。
                        </div>
                    </div>
                </div>

                <div className="code-block mt-6">
                    <div className="code-line">
                        <span className="cm"># セキュリティポリシー作成</span>
                    </div>
                    <div className="code-line">
                        gcloud compute security-policies create{' '}
                        <span className="str">my-security-policy</span> \
                    </div>
                    <div className="code-line">  --description=&quot;WAF and DDoS protection policy&quot;</div>
                    <div className="code-line"></div>
                    <div className="code-line">
                        <span className="cm"># OWASP SQLインジェクションルール追加</span>
                    </div>
                    <div className="code-line">
                        gcloud compute security-policies rules create 300 \
                    </div>
                    <div className="code-line"> --security-policy=my-security-policy \</div>
                    <div className="code-line">
                        {' '}
                        --expression=&quot;evaluatePreconfiguredWaf(&apos;sqli-v422-stable&apos;)&quot; \
                    </div>
                    <div className="code-line"> --action=deny-403</div>
                    <div className="code-line"></div>
                    <div className="code-line">
                        <span className="cm"># 特定IPをブロック</span>
                    </div>
                    <div className="code-line">
                        gcloud compute security-policies rules create 100 \
                    </div>
                    <div className="code-line"> --security-policy=my-security-policy \</div>
                    <div className="code-line"> --src-ip-ranges=1.2.3.4/32 \</div>
                    <div className="code-line"> --action=deny-403</div>
                    <div className="code-line"></div>
                    <div className="code-line">
                        <span className="cm"># バックエンドサービスにポリシーを適用</span>
                    </div>
                    <div className="code-line">
                        gcloud compute backend-services update{' '}
                        <span className="str">my-backend</span> \
                    </div>
                    <div className="code-line"> --security-policy=my-security-policy \</div>
                    <div className="code-line"> --global</div>
                </div>

                <div className={sharedStyles.examTip}>
                    <span className={sharedStyles.tipLabel}>💡 プレビューモードを活用</span>
                    本番環境に適用する前に<code>--action=deny-403</code>を
                    <code>--action=allow --preview</code>
                    に変えてログを確認し、正規トラフィックがブロックされないかをテストします。
                </div>

                <div className={sharedStyles.bpBox}>
                    <h5>✅ ベストプラクティス</h5>
                    <ul>
                        <li>
                            全外部LBに<strong>Cloud Armorセキュリティポリシーを適用</strong>
                            する（必須）
                        </li>
                        <li>
                            <strong>Adaptive Protection</strong>を有効化してAI自動検出を活用する
                        </li>
                        <li>OWASPの事前設定ルールをすべて有効化する</li>
                        <li>
                            本番適用前に<strong>プレビューモード</strong>で誤ブロックを確認する
                        </li>
                        <li>ログを有効化してアタックパターンを継続的に分析する</li>
                    </ul>
                </div>
            </div>

            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🚫</span> 5.2 VPC Service Controls ─
                    データ漏洩（Exfiltration）防止
                </h3>
                <p>
                    <strong>VPC Service Controls（VPC SC）</strong>
                    は、GCPのAPIサービス（BigQuery・GCS・KMS等）の周囲に
                    <strong>仮想的なセキュリティ境界</strong>
                    を作成し、境界外からのAPIアクセスを遮断します。IAMだけでは防げない
                    <strong>データの持ち出しを防止</strong>します。
                </p>

                <div className={sharedStyles.archDiagram}>
                    <DiagramSVG
                        viewBox="0 0 800 240"
                        ariaLabel="VPC Service Controls サービス境界のアーキテクチャ図"
                    >
                        <g
                            style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '14px',
                                fill: 'var(--color-foreground)',
                            }}
                        >
                            <rect
                                x="20"
                                y="20"
                                width="760"
                                height="150"
                                fill="transparent"
                                stroke="var(--color-theme-cdl-fg)"
                                strokeWidth="2"
                                strokeDasharray="4 4"
                                rx="8"
                            />
                            <text x="40" y="45" fill="var(--color-theme-cdl-fg)" fontWeight="bold">
                                Service Perimeter（サービス境界）
                            </text>

                            <rect
                                x="40"
                                y="60"
                                width="300"
                                height="90"
                                fill="var(--color-card)"
                                stroke="var(--color-border)"
                                rx="4"
                            />
                            <text x="50" y="85" fontWeight="bold">
                                GCP API (保護対象)
                            </text>
                            <text x="50" y="105">
                                BigQuery, GCS, KMS, Pub/Sub 等
                            </text>

                            <rect
                                x="460"
                                y="60"
                                width="300"
                                height="90"
                                fill="var(--color-card)"
                                stroke="var(--color-border)"
                                rx="4"
                            />
                            <text x="470" y="85" fontWeight="bold">
                                境界内のリソース (Trusted)
                            </text>
                            <text x="470" y="105">
                                Project A (VPC-A), Project B (VPC-B)
                            </text>

                            <path
                                d="M 340,105 h 120"
                                stroke="var(--color-primary)"
                                strokeWidth="2"
                                markerEnd="url(#arrow)"
                                markerStart="url(#arrow-start)"
                            />
                            <text x="350" y="95" fontSize="12px">
                                境界内からのアクセス
                            </text>

                            <path
                                d="M 380,220 v -50"
                                stroke="var(--color-theme-cdl-fg)"
                                strokeWidth="2"
                                markerEnd="url(#arrow-red)"
                            />
                            <text
                                x="400"
                                y="210"
                                fill="var(--color-theme-cdl-fg)"
                                fontWeight="bold"
                            >
                                境界外（インターネット等）からのAPI呼び出し → 全て拒否
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
                                <marker
                                    id="arrow-start"
                                    viewBox="0 0 10 10"
                                    refX="5"
                                    refY="5"
                                    markerWidth="6"
                                    markerHeight="6"
                                    orient="auto"
                                >
                                    <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-primary)" />
                                </marker>
                                <marker
                                    id="arrow-red"
                                    viewBox="0 0 10 10"
                                    refX="5"
                                    refY="5"
                                    markerWidth="6"
                                    markerHeight="6"
                                    orient="auto-start-reverse"
                                >
                                    <path
                                        d="M 0 0 L 10 5 L 0 10 z"
                                        fill="var(--color-theme-cdl-fg)"
                                    />
                                </marker>
                            </defs>
                        </g>
                    </DiagramSVG>
                </div>

                <div className={sharedStyles.examTip}>
                    <span className={sharedStyles.tipLabel}>ℹ アクセスレベルで例外を許可</span>
                    境界外のユーザー・システムに条件付きアクセスを許可できます。条件例：特定のIPレンジ、MFA使用済み、特定のデバイス状態（Access
                    Context Manager）。
                </div>

                <div className={sharedStyles.bpBox}>
                    <h5>✅ ベストプラクティス</h5>
                    <ul>
                        <li>機密データ（個人情報・金融データ）を扱うプロジェクトに必ず適用する</li>
                        <li>
                            まず<strong>ドライランモード</strong>
                            で境界を設定し、正規トラフィックへの影響を確認する
                        </li>
                        <li>Access Context Managerでアクセスレベルを細かく管理する</li>
                        <li>Ingress/Egressポリシーで必要な例外のみ許可する</li>
                    </ul>
                </div>
            </div>

            <div className={sharedStyles.detailBlock}>
                <h3>
                    <span aria-hidden="true">🔑</span> 5.3 Identity-Aware Proxy（IAP）─
                    VPNなしのゼロトラストアクセス
                </h3>
                <p>
                    IAPを使えば<strong>パブリックIPを持たないVMにも</strong>
                    、VPNなしで安全にSSH/RDP接続できます。Google Accountと
                    IAMで認証・認可を一元管理します。
                </p>

                <div className={sharedStyles.archDiagram}>
                    <DiagramSVG viewBox="0 0 800 200" ariaLabel="IAPと従来VPNのアクセス比較図">
                        <g
                            style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '14px',
                                fill: 'var(--color-foreground)',
                            }}
                        >
                            <text x="20" y="30" fontWeight="bold">
                                従来のVPNアクセス（複雑・管理コスト高）:
                            </text>
                            <rect
                                x="20"
                                y="45"
                                width="100"
                                height="40"
                                fill="var(--color-card)"
                                stroke="var(--color-border)"
                                rx="4"
                            />
                            <text x="40" y="70">
                                ユーザー
                            </text>
                            <path
                                d="M 120,65 h 40"
                                stroke="var(--color-border)"
                                strokeWidth="2"
                                markerEnd="url(#arrow-gray)"
                            />
                            <rect
                                x="160"
                                y="45"
                                width="120"
                                height="40"
                                fill="var(--color-card)"
                                stroke="var(--color-border)"
                                rx="4"
                            />
                            <text x="180" y="70">
                                VPN接続
                            </text>
                            <path
                                d="M 280,65 h 40"
                                stroke="var(--color-border)"
                                strokeWidth="2"
                                markerEnd="url(#arrow-gray)"
                            />
                            <rect
                                x="320"
                                y="45"
                                width="140"
                                height="40"
                                fill="var(--color-card)"
                                stroke="var(--color-border)"
                                rx="4"
                            />
                            <text x="330" y="70">
                                踏み台サーバー
                            </text>
                            <path
                                d="M 460,65 h 40"
                                stroke="var(--color-border)"
                                strokeWidth="2"
                                markerEnd="url(#arrow-gray)"
                            />
                            <rect
                                x="500"
                                y="45"
                                width="80"
                                height="40"
                                fill="var(--color-card)"
                                stroke="var(--color-border)"
                                rx="4"
                            />
                            <text x="525" y="70">
                                VM
                            </text>

                            <text x="20" y="125" fontWeight="bold">
                                IAPを使ったアクセス（シンプル・ゼロトラスト）:
                            </text>
                            <rect
                                x="20"
                                y="140"
                                width="100"
                                height="40"
                                fill="var(--color-card)"
                                stroke="var(--color-border)"
                                rx="4"
                            />
                            <text x="40" y="165">
                                ユーザー
                            </text>
                            <path
                                d="M 120,160 h 60"
                                stroke="var(--color-primary)"
                                strokeWidth="2"
                                markerEnd="url(#arrow)"
                            />
                            <text x="135" y="150" fontSize="12px">
                                HTTPS
                            </text>
                            <rect
                                x="180"
                                y="140"
                                width="180"
                                height="40"
                                fill="var(--color-card)"
                                stroke="var(--color-primary)"
                                strokeWidth="2"
                                rx="4"
                            />
                            <text x="200" y="165" fontWeight="bold">
                                IAP（Googleが認証）
                            </text>
                            <path
                                d="M 360,160 h 60"
                                stroke="var(--color-primary)"
                                strokeWidth="2"
                                markerEnd="url(#arrow)"
                            />
                            <rect
                                x="420"
                                y="140"
                                width="80"
                                height="40"
                                fill="var(--color-card)"
                                stroke="var(--color-border)"
                                rx="4"
                            />
                            <text x="445" y="165">
                                VM
                            </text>

                            <text
                                x="180"
                                y="195"
                                fill="var(--color-muted-foreground)"
                                fontSize="12px"
                            >
                                ↑ Google Account + IAM ポリシーで制御（MFA・デバイス状態等）
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
                                <marker
                                    id="arrow-gray"
                                    viewBox="0 0 10 10"
                                    refX="5"
                                    refY="5"
                                    markerWidth="6"
                                    markerHeight="6"
                                    orient="auto-start-reverse"
                                >
                                    <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-border)" />
                                </marker>
                            </defs>
                        </g>
                    </DiagramSVG>
                </div>

                <div className="code-block mt-6">
                    <div className="code-line">
                        <span className="cm"># IAP経由でSSH接続（ポート22を外部に開けない！）</span>
                    </div>
                    <div className="code-line">
                        gcloud compute ssh <span className="str">my-vm</span> \
                    </div>
                    <div className="code-line"> --tunnel-through-iap \</div>
                    <div className="code-line"> --project=my-project \</div>
                    <div className="code-line"> --zone=us-central1-a</div>
                    <div className="code-line"></div>
                    <div className="code-line">
                        <span className="cm"># 必要なFWルール: IAPのCIDR範囲のみSSHを許可</span>
                    </div>
                    <div className="code-line">
                        gcloud compute firewall-rules create{' '}
                        <span className="str">allow-iap-ssh</span> \
                    </div>
                    <div className="code-line"> --network=my-vpc \</div>
                    <div className="code-line"> --action=ALLOW \</div>
                    <div className="code-line"> --rules=tcp:22 \</div>
                    <div className="code-line"> --source-ranges=35.235.240.0/20 \</div>
                    <div className="code-line"> --target-tags=iap-ssh-target</div>
                </div>

                <div className={sharedStyles.bpBox}>
                    <h5>✅ ベストプラクティス</h5>
                    <ul>
                        <li>
                            SSH/RDPは外部からの直接アクセスを廃止し、<strong>IAP経由のみ</strong>
                            に限定する
                        </li>
                        <li>管理画面・内部ツールへのアクセスはすべてIAPで保護する</li>
                        <li>BeyondCorp Enterpriseと統合してデバイス状態・場所を条件に追加する</li>
                        <li>IAPのIPレンジ（35.235.240.0/20）以外からのSSHを全拒否する</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
