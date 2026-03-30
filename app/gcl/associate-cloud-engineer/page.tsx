import type { Metadata } from 'next';
import './ace.css';

export const metadata: Metadata = {
    title: 'Associate Cloud Engineer',
    description: 'Google Cloud Associate Cloud Engineer 試験完全対策ガイド',
};

/* ── セクション1：クラウドソリューション環境のセットアップ ── */
function Section1() {
    return (
        <div id="s1" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn1">01</div>
                <div className="sec-head-txt">
                    <h2>クラウドソリューション環境のセットアップ</h2>
                    <p>プロジェクト・組織・課金・IAM・ネットワークの初期設定。GCPを使い始める前に必要な基盤構築を理解する。</p>
                </div>
                <div className="pct-badge pb1">~23%</div>
            </div>

            {/* 1.1 Resource Hierarchy */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">1.1</span>リソース階層（Resource Hierarchy）の設計</div>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>GCPのリソースは <strong style={{ color: 'var(--ace-cyan)' }}>組織 → フォルダ → プロジェクト → リソース</strong> の4層構造で管理される。ポリシーは上位から下位へ継承される。</p>

                <div className="tgrid">
                    <div className="titem">
                        <div className="tname">組織（Organization）</div>
                        <div className="tdef">Cloud Identity または Google Workspace ドメインに紐づく最上位ノード。全プロジェクトのルート。組織ポリシーは全リソースに適用される。</div>
                    </div>
                    <div className="titem">
                        <div className="tname">フォルダ（Folder）</div>
                        <div className="tdef">プロジェクトをグループ化する中間層。部門・環境（dev/stg/prod）・チーム単位での権限分離に活用。フォルダは入れ子可能。</div>
                    </div>
                    <div className="titem">
                        <div className="tname">プロジェクト（Project）</div>
                        <div className="tdef">GCPリソースの基本コンテナ。すべてのAPIとリソースはプロジェクトに属する。課金・IAM・サービスはプロジェクト単位で管理。</div>
                    </div>
                    <div className="titem">
                        <div className="tname">組織ポリシー（Org Policy）</div>
                        <div className="tdef">組織・フォルダ・プロジェクトに適用する制約。例：特定リージョン以外でのリソース作成禁止、外部IPの無効化。継承は下位に伝播。</div>
                    </div>
                </div>

                <div className="bp">
                    <div className="bpt">リソース階層設計のベストプラクティス</div>
                    <ul>
                        <li>フォルダで環境（prod/dev/staging）を分離し、本番へのアクセスを最小限に制限する</li>
                        <li>組織ポリシーで <code>constraints/compute.requireShieldedVm</code> 等のセキュリティ制約を一括適用する</li>
                        <li>プロジェクトはアプリ・サービス単位で分割し、課金・権限・サービス制限を独立させる</li>
                        <li>Terraform などの IaC でプロジェクト作成を自動化し、設定ドリフトを防ぐ</li>
                    </ul>
                </div>
                <pre className="codeblock">
                    <span className="comment"># 組織ポリシーの確認</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}org-policies <span className="flag">list</span>{' '}<span className="flag">--organization=</span><span className="val">ORG_ID</span>{'\n'}
                    {'\n'}
                    <span className="comment"># フォルダの作成</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}resource-manager folders create \{'\n'}
                    {'  '}<span className="flag">--display-name=</span><span className="val">&quot;Production&quot;</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--organization=</span><span className="val">ORG_ID</span>{'\n'}
                    {'\n'}
                    <span className="comment"># プロジェクトの作成（フォルダ配下）</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}projects create <span className="val">my-project-id</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--folder=</span><span className="val">FOLDER_ID</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--name=</span><span className="val">&quot;My Project&quot;</span>
                </pre>
                <div className="src">
                    <div className="srct">参照リソース</div>
                    <a href="https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy" target="_blank" rel="noopener noreferrer">https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy</a>
                    <a href="https://cloud.google.com/resource-manager/docs/organization-policy/overview" target="_blank" rel="noopener noreferrer">https://cloud.google.com/resource-manager/docs/organization-policy/overview</a>
                </div>
            </div>

            {/* 1.1 IAM */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">1.1</span>IAM（Identity and Access Management）の基礎</div>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>IAMは「<strong style={{ color: 'var(--ace-cyan)' }}>誰が（Member）・何を（Permission）・どのリソースに（Resource）できるか</strong>」を定義する。ロールはアクセス制御の最小単位。</p>

                <table className="ctable">
                    <thead><tr><th>ロール種別</th><th>内容</th><th>代表例</th></tr></thead>
                    <tbody>
                        <tr><td><strong>基本ロール（Basic）</strong></td><td>プロジェクト全体に適用される粗い粒度のロール。本番環境では非推奨。</td><td>Owner / Editor / Viewer</td></tr>
                        <tr><td><strong>事前定義ロール（Predefined）</strong></td><td>特定サービスに最適化されたロール。Google が管理・更新する。推奨。</td><td>compute.instanceAdmin / storage.objectAdmin</td></tr>
                        <tr><td><strong>カスタムロール（Custom）</strong></td><td>必要な権限のみを集めた自作ロール。最小権限の原則を厳密に実現できる。</td><td>組織・プロジェクトレベルで作成可能</td></tr>
                    </tbody>
                </table>

                <div className="wb">
                    <div className="wbt">試験頻出：IAM バインディングの仕組み</div>
                    <ul>
                        <li>IAM ポリシーは「誰（member）にどのロール（role）を与えるか」のバインディングの集合</li>
                        <li>ポリシーは加算的（additive）——より高いリソースで与えた権限は下位でも有効</li>
                        <li><strong style={{ color: 'var(--ace-cyan)' }}>拒否ポリシー（Deny Policy）</strong>は許可ポリシーより優先される（GCPの新機能）</li>
                        <li>Cloud Identity でグループを管理し、個人ではなくグループにロールを付与するのがベスト</li>
                    </ul>
                </div>
                <pre className="codeblock">
                    <span className="comment"># IAMポリシーの確認</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}projects get-iam-policy <span className="val">PROJECT_ID</span>{'\n'}
                    {'\n'}
                    <span className="comment"># ロールの付与</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}projects add-iam-policy-binding <span className="val">PROJECT_ID</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--member=</span><span className="val">&quot;user:alice@example.com&quot;</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--role=</span><span className="val">&quot;roles/compute.instanceAdmin.v1&quot;</span>{'\n'}
                    {'\n'}
                    <span className="comment"># カスタムロール作成</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}iam roles create <span className="val">myCustomRole</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--project=</span><span className="val">PROJECT_ID</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--file=</span><span className="val">role-definition.yaml</span>
                </pre>
            </div>

            {/* 1.1 Cloud Identity */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">1.1</span>Cloud Identity とユーザー管理</div>
                <div className="tgrid">
                    <div className="titem">
                        <div className="tname">Cloud Identity</div>
                        <div className="tdef">Google のIDaaS（Identity as a Service）。ユーザー・グループを管理し、GCP・Google Workspace・外部アプリへのSSOを提供。</div>
                    </div>
                    <div className="titem">
                        <div className="tname">グループ管理</div>
                        <div className="tdef">ユーザーをグループ化して権限を一括管理。個人ではなくグループにIAMロールを付与することで管理負荷を低減。</div>
                    </div>
                    <div className="titem">
                        <div className="tname">SAML / OIDC フェデレーション</div>
                        <div className="tdef">社内 IdP（Active Directory、Okta 等）と連携し、既存の認証基盤を活用。ユーザープロビジョニングの自動化（SCIM対応）。</div>
                    </div>
                    <div className="titem">
                        <div className="tname">Workload Identity Federation</div>
                        <div className="tdef">AWS・Azure・オンプレのワークロードが、サービスアカウントキーなしに GCP リソースへアクセスする仕組み。</div>
                    </div>
                </div>
                <div className="bp">
                    <div className="bpt">ユーザー管理のベストプラクティス</div>
                    <ul>
                        <li>個人アカウントではなくグループ（group:）にロールを付与する——管理が大幅に簡素化</li>
                        <li>MFA（多要素認証）を全ユーザーに強制する（Cloud Identity の Security Policy で設定）</li>
                        <li>サービスアカウントキーを発行せず Workload Identity Federation で代替する</li>
                        <li>退職者のアカウントを即時無効化できるよう Cloud Identity と HR システムを連携する</li>
                    </ul>
                </div>
            </div>

            {/* 1.1 APIs & Quotas */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">1.1</span>API 有効化・割り当て（Quota）管理</div>
                <div className="ib">
                    <div className="ibt">重要ポイント</div>
                    <p>GCP の各サービスは使用前に API を有効化する必要がある。大規模トラフィックの前には Quota 増加を事前申請すること。クォータ超過はアプリダウンの原因となる。</p>
                </div>
                <pre className="codeblock">
                    <span className="comment"># APIの有効化</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}services enable <span className="val">compute.googleapis.com</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}services enable <span className="val">container.googleapis.com</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}services enable <span className="val">sqladmin.googleapis.com</span>{'\n'}
                    {'\n'}
                    <span className="comment"># 有効なAPIの一覧確認</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}services list <span className="flag">--enabled</span>{'\n'}
                    {'\n'}
                    <span className="comment"># クォータの確認</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}compute project-info describe <span className="flag">--project=</span><span className="val">PROJECT_ID</span>
                </pre>
                <div className="src">
                    <div className="srct">参照リソース</div>
                    <a href="https://cloud.google.com/iam/docs/overview" target="_blank" rel="noopener noreferrer">https://cloud.google.com/iam/docs/overview</a>
                    <a href="https://cloud.google.com/docs/quotas" target="_blank" rel="noopener noreferrer">https://cloud.google.com/docs/quotas</a>
                </div>
            </div>

            {/* 1.2 Billing */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">1.2</span>課金設定（Billing Configuration）</div>
                <div className="sflow">
                    <div className="sitem">
                        <div className="snum">1</div>
                        <div className="scont">
                            <strong>課金アカウントの作成</strong>
                            <p>請求の支払い主体となるエンティティ。1つの課金アカウントに複数プロジェクトをリンク可能。請求書払い・クレジットカード払いに対応。</p>
                        </div>
                    </div>
                    <div className="sitem">
                        <div className="snum">2</div>
                        <div className="scont">
                            <strong>プロジェクトへのリンク</strong>
                            <p>プロジェクトは必ず1つの課金アカウントにリンクする。リンクを外すと有料サービスが停止。異なる部門に別々の課金アカウントを割り当て可能。</p>
                        </div>
                    </div>
                    <div className="sitem">
                        <div className="snum">3</div>
                        <div className="scont">
                            <strong>予算・アラートの設定</strong>
                            <p>月次予算を設定し、50%・90%・100%消費時にメールや Pub/Sub 通知を受け取る。自動的にプロジェクトを停止するわけではない（Cloud Functions で自動化可能）。</p>
                        </div>
                    </div>
                    <div className="sitem">
                        <div className="snum">4</div>
                        <div className="scont">
                            <strong>課金データのエクスポート</strong>
                            <p>課金データを BigQuery または Cloud Storage にエクスポートし、コスト分析・FinOps を実施。Looker Studio でダッシュボード化できる。</p>
                        </div>
                    </div>
                </div>

                <div className="bp">
                    <div className="bpt">課金管理のベストプラクティス</div>
                    <ul>
                        <li>全プロジェクトにラベル（label）を付与し、BigQuery エクスポートでチーム別・環境別コストを可視化</li>
                        <li>予算アラートは Pub/Sub → Cloud Functions で課金アカウントの自動停止に活用できる</li>
                        <li>committed use discounts（CUD）と sustained use discounts（SUD）の違いを理解する</li>
                        <li>Billing IAM で billing.accounts.viewer を制限し、課金情報へのアクセスを最小化する</li>
                    </ul>
                </div>
                <div className="src">
                    <div className="srct">参照リソース</div>
                    <a href="https://cloud.google.com/billing/docs/how-to/budgets" target="_blank" rel="noopener noreferrer">https://cloud.google.com/billing/docs/how-to/budgets</a>
                    <a href="https://cloud.google.com/billing/docs/how-to/export-data-bigquery" target="_blank" rel="noopener noreferrer">https://cloud.google.com/billing/docs/how-to/export-data-bigquery</a>
                </div>
            </div>
        </div>
    );
}

/* ── セクション2：クラウドソリューションの計画と実装 ── */
function Section2() {
    return (
        <div id="s2" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn2">02</div>
                <div className="sec-head-txt">
                    <h2>クラウドソリューションの計画と実装</h2>
                    <p>コンピューティング・ストレージ・ネットワーク・IaCの選定と実装。GCPの主要サービスを実際にデプロイする技術を習得する。</p>
                </div>
                <div className="pct-badge pb2">~30%</div>
            </div>

            {/* 2.1 Compute Resources */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">2.1</span>コンピューティングサービスの選択と実装</div>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>ワークロードの性質に応じて最適なコンピューティングプラットフォームを選択することが、ACE試験の最重要テーマの一つ。</p>

                <table className="ctable">
                    <thead><tr><th>サービス</th><th>管理範囲</th><th>主なユースケース</th><th>スケール単位</th></tr></thead>
                    <tbody>
                        <tr>
                            <td><strong style={{ color: 'var(--ace-blue)' }}>Compute Engine</strong></td>
                            <td>IaaS：OS・MW まで自己管理</td>
                            <td>レガシー移行、特定OS要件、GPU/TPU ワークロード、リフト&amp;シフト</td>
                            <td>VM インスタンス</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--ace-green)' }}>GKE（Autopilot）</strong></td>
                            <td>マネージドコンテナ基盤</td>
                            <td>マイクロサービス、バッチ処理、ステートフルアプリ（StatefulSet）</td>
                            <td>Pod（ノードは自動管理）</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--ace-green)' }}>GKE（Standard）</strong></td>
                            <td>コンテナ基盤（ノード管理あり）</td>
                            <td>細かいノード制御が必要、GPU ノードプール、特殊OS設定</td>
                            <td>Pod / Node Pool</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--ace-yellow)' }}>Cloud Run</strong></td>
                            <td>サーバーレスコンテナ</td>
                            <td>HTTP/gRPC API、イベント処理、スパイクトラフィック対応</td>
                            <td>コンテナインスタンス（0→N）</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--ace-yellow)' }}>Cloud Run functions</strong></td>
                            <td>FaaS（Function as a Service）</td>
                            <td>Pub/Sub トリガー、GCS イベント、軽量処理、Eventarc 連携</td>
                            <td>関数インスタンス（0→N）</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--ace-orange)' }}>App Engine</strong></td>
                            <td>PaaS（言語ランタイム管理）</td>
                            <td>Web アプリ（Standard：Node.js/Python等、Flex：カスタムランタイム）</td>
                            <td>インスタンス（スケール自動）</td>
                        </tr>
                    </tbody>
                </table>

                <div className="wb">
                    <div className="wbt">試験頻出：コンピュート選択の判断軸</div>
                    <ul>
                        <li><strong style={{ color: 'var(--ace-cyan)' }}>OS レベルの制御が必要</strong> → Compute Engine</li>
                        <li><strong style={{ color: 'var(--ace-cyan)' }}>コンテナ + ステートフル or 長時間処理</strong> → GKE</li>
                        <li><strong style={{ color: 'var(--ace-cyan)' }}>コンテナ + ステートレス HTTP API</strong> → Cloud Run</li>
                        <li><strong style={{ color: 'var(--ace-cyan)' }}>イベント駆動 + 短時間処理</strong> → Cloud Run functions</li>
                        <li><strong style={{ color: 'var(--ace-cyan)' }}>0 スケール（アイドル時コスト 0）が必要</strong> → Cloud Run / Cloud Run functions</li>
                    </ul>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <p style={{ color: 'var(--ace-text-bright)', fontWeight: 700, marginBottom: '12px' }}>Compute Engine の主要設定</p>
                    <div className="tgrid">
                        <div className="titem">
                            <div className="tname">マシンタイプ</div>
                            <div className="tdef">E2（コスト重視）、N2/N4（汎用）、C3（コンピューティング最適化）、M3（メモリ最適化）。カスタムマシンタイプで vCPU・メモリを個別指定も可能。</div>
                        </div>
                        <div className="titem">
                            <div className="tname">Spot VM（旧 Preemptible）</div>
                            <div className="tdef">通常 VM より最大 91% 安価。ただし最大24時間で停止され得る。バッチ処理・耐障害性のあるワークロードに最適。</div>
                        </div>
                        <div className="titem">
                            <div className="tname">マネージドインスタンスグループ（MIG）</div>
                            <div className="tdef">インスタンステンプレートから同一VMを複数作成・自動スケーリング・自己修復（autohealing）を提供。高可用性の基本。</div>
                        </div>
                        <div className="titem">
                            <div className="tname">OS Login</div>
                            <div className="tdef">SSH公開鍵の管理をIAMで統合。個人の Google アカウントで SSH 接続でき、鍵の個別管理が不要になる。</div>
                        </div>
                        <div className="titem">
                            <div className="tname">Persistent Disk vs Hyperdisk</div>
                            <div className="tdef">PD：標準のブロックストレージ（zonal/regional）。Hyperdisk：高IOPSが必要な DB ワークロード向け。容量とIOPSを独立してスケールできる。</div>
                        </div>
                        <div className="titem">
                            <div className="tname">VM Manager</div>
                            <div className="tdef">OS パッチ管理・インベントリ収集・設定管理を統合。パッチコンプライアンスの自動化に使用。</div>
                        </div>
                    </div>
                </div>

                <pre className="codeblock">
                    <span className="comment"># インスタンステンプレートの作成</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}compute instance-templates create <span className="val">web-template</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--machine-type=</span><span className="val">e2-medium</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--image-family=</span><span className="val">debian-11</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--image-project=</span><span className="val">debian-cloud</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--metadata-from-file</span>{' '}<span className="val">startup-script=startup.sh</span>{'\n'}
                    {'\n'}
                    <span className="comment"># マネージドインスタンスグループの作成（オートスケール）</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}compute instance-groups managed create <span className="val">web-mig</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--template=</span><span className="val">web-template</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--size=</span><span className="val">3</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--zone=</span><span className="val">us-central1-a</span>{'\n'}
                    {'\n'}
                    <span className="comment"># オートスケーリングの設定</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}compute instance-groups managed set-autoscaling <span className="val">web-mig</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--min-num-replicas=</span><span className="val">2</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--max-num-replicas=</span><span className="val">10</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--target-cpu-utilization=</span><span className="val">0.6</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--zone=</span><span className="val">us-central1-a</span>
                </pre>

                {/* GKE Details */}
                <div style={{ marginTop: '20px' }}>
                    <p style={{ color: 'var(--ace-text-bright)', fontWeight: 700, marginBottom: '12px' }}>GKE の主要設定</p>
                </div>
                <table className="ctable">
                    <thead><tr><th>設定</th><th>Autopilot</th><th>Standard</th></tr></thead>
                    <tbody>
                        <tr><td><strong>ノード管理</strong></td><td>Google が完全管理</td><td>ユーザーが管理（ノードプール）</td></tr>
                        <tr><td><strong>課金単位</strong></td><td>Pod のリソース（vCPU/MEM）</td><td>ノード VM の費用</td></tr>
                        <tr><td><strong>セキュリティ</strong></td><td>Shielded Nodes・Workload Identity が強制</td><td>オプション設定</td></tr>
                        <tr><td><strong>推奨場面</strong></td><td>運用負荷を最小化したい場合</td><td>特殊なノード設定・GPU が必要な場合</td></tr>
                    </tbody>
                </table>
                <pre className="codeblock">
                    <span className="comment"># GKE Autopilot クラスタの作成</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}container clusters create-auto <span className="val">my-cluster</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--region=</span><span className="val">us-central1</span>{'\n'}
                    {'\n'}
                    <span className="comment"># GKE Standard（プライベートクラスタ）の作成</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}container clusters create <span className="val">private-cluster</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--zone=</span><span className="val">us-central1-a</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--enable-private-nodes</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--enable-private-endpoint</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--master-ipv4-cidr=</span><span className="val">172.16.0.0/28</span>{'\n'}
                    {'\n'}
                    <span className="comment"># kubectl の設定</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}container clusters get-credentials <span className="val">my-cluster</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--region=</span><span className="val">us-central1</span>
                </pre>
                <div className="src">
                    <div className="srct">参照リソース</div>
                    <a href="https://cloud.google.com/compute/docs/instances/instance-life-cycle" target="_blank" rel="noopener noreferrer">https://cloud.google.com/compute/docs/instances/instance-life-cycle</a>
                    <a href="https://cloud.google.com/kubernetes-engine/docs/concepts/autopilot-overview" target="_blank" rel="noopener noreferrer">https://cloud.google.com/kubernetes-engine/docs/concepts/autopilot-overview</a>
                    <a href="https://cloud.google.com/run/docs" target="_blank" rel="noopener noreferrer">https://cloud.google.com/run/docs</a>
                </div>
            </div>

            {/* 2.2 Storage & Data */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">2.2</span>ストレージとデータソリューションの計画・実装</div>

                <table className="ctable">
                    <thead><tr><th>サービス</th><th>タイプ</th><th>特徴・ユースケース</th></tr></thead>
                    <tbody>
                        <tr><td><strong style={{ color: 'var(--ace-cyan)' }}>Cloud Storage</strong></td><td>オブジェクトストレージ</td><td>画像・動画・バックアップ・ログ保管。グローバル一意のバケット名。4段階ストレージクラス。</td></tr>
                        <tr><td><strong style={{ color: 'var(--ace-cyan)' }}>Cloud SQL</strong></td><td>マネージドRDBMS</td><td>MySQL・PostgreSQL・SQL Server。垂直スケール主体。HA構成・自動バックアップ・フェイルオーバー。</td></tr>
                        <tr><td><strong style={{ color: 'var(--ace-cyan)' }}>Cloud Spanner</strong></td><td>グローバル分散RDBMS</td><td>99.999% SLA。グローバル一貫性のあるトランザクション。銀行・在庫管理等の金融システムに最適。</td></tr>
                        <tr><td><strong style={{ color: 'var(--ace-cyan)' }}>Firestore</strong></td><td>NoSQL ドキュメント DB</td><td>サーバーレス・リアルタイム同期。モバイル/Web アプリのバックエンドに最適。</td></tr>
                        <tr><td><strong style={{ color: 'var(--ace-cyan)' }}>Bigtable</strong></td><td>NoSQL ワイドカラム</td><td>時系列データ・IoT・広告データ等の超高スループット低遅延アクセス。</td></tr>
                        <tr><td><strong style={{ color: 'var(--ace-cyan)' }}>BigQuery</strong></td><td>データウェアハウス</td><td>サーバーレス SQL 分析。スキャン課金。数 TB のクエリを秒単位で実行。</td></tr>
                        <tr><td><strong style={{ color: 'var(--ace-cyan)' }}>AlloyDB</strong></td><td>PostgreSQL 互換 DB</td><td>Cloud SQL PostgreSQL より最大4倍高速な分析クエリ性能。TP+AP統合（HTAP）。</td></tr>
                        <tr><td><strong style={{ color: 'var(--ace-cyan)' }}>Memorystore</strong></td><td>インメモリ DB</td><td>マネージド Redis / Memcached。セッション管理・キャッシュ・リーダーボードに最適。</td></tr>
                        <tr><td><strong style={{ color: 'var(--ace-cyan)' }}>Pub/Sub</strong></td><td>メッセージキュー</td><td>非同期メッセージング。イベント駆動アーキテクチャ。Dataflow・Cloud Run との統合。</td></tr>
                        <tr><td><strong style={{ color: 'var(--ace-cyan)' }}>Filestore</strong></td><td>マネージドNFS</td><td>VM や GKE からのファイル共有。HPC ワークロードや CMS に使用。</td></tr>
                    </tbody>
                </table>

                <div style={{ marginTop: '20px' }}>
                    <p style={{ color: 'var(--ace-text-bright)', fontWeight: 700, marginBottom: '12px' }}>Cloud Storage ストレージクラスの使い分け</p>
                </div>
                <table className="ctable">
                    <thead><tr><th>クラス</th><th>最小保存期間</th><th>ユースケース</th><th>コスト特性</th></tr></thead>
                    <tbody>
                        <tr><td><strong>Standard</strong></td><td>なし</td><td>頻繁にアクセスするデータ、Web 配信</td><td>ストレージ高・取得無料</td></tr>
                        <tr><td><strong>Nearline</strong></td><td>30日</td><td>月1回程度のアクセス（バックアップ等）</td><td>ストレージ低・取得課金</td></tr>
                        <tr><td><strong>Coldline</strong></td><td>90日</td><td>四半期1回程度のアクセス（アーカイブ）</td><td>ストレージ格安・取得高コスト</td></tr>
                        <tr><td><strong>Archive</strong></td><td>365日</td><td>年1回未満（規制対応・長期保存）</td><td>ストレージ最安・取得最高コスト</td></tr>
                    </tbody>
                </table>

                <div className="bp">
                    <div className="bpt">DB 選択のベストプラクティス</div>
                    <ul>
                        <li><strong>RDB + グローバル展開 + 強一貫性</strong> → Cloud Spanner</li>
                        <li><strong>RDB + リージョン + MySQL/PG 互換</strong> → Cloud SQL</li>
                        <li><strong>大量時系列データ + 低遅延</strong> → Bigtable</li>
                        <li><strong>モバイルアプリ + リアルタイム同期</strong> → Firestore</li>
                        <li><strong>分析・DWH + 大規模 SQL</strong> → BigQuery</li>
                        <li><strong>キャッシュ + セッション管理</strong> → Memorystore（Redis）</li>
                    </ul>
                </div>
                <pre className="codeblock">
                    <span className="comment"># Cloud Storage バケット作成（マルチリージョン）</span>{'\n'}
                    <span className="cmd">gsutil</span>{' '}mb <span className="flag">-l</span>{' '}<span className="val">US</span>{' '}<span className="flag">-c</span>{' '}<span className="val">STANDARD</span>{' '}<span className="val">gs://my-bucket-name</span>{'\n'}
                    {'\n'}
                    <span className="comment"># ライフサイクルポリシーの設定</span>{'\n'}
                    <span className="cmd">gsutil</span>{' '}lifecycle set <span className="val">lifecycle.json</span>{' '}<span className="val">gs://my-bucket-name</span>{'\n'}
                    {'\n'}
                    <span className="comment"># Cloud SQL インスタンスの作成（HA構成）</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}sql instances create <span className="val">my-sql</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--database-version=</span><span className="val">POSTGRES_15</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--tier=</span><span className="val">db-n1-standard-4</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--region=</span><span className="val">us-central1</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--availability-type=</span><span className="val">REGIONAL</span>
                </pre>
                <div className="src">
                    <div className="srct">参照リソース</div>
                    <a href="https://cloud.google.com/storage/docs/storage-classes" target="_blank" rel="noopener noreferrer">https://cloud.google.com/storage/docs/storage-classes</a>
                    <a href="https://cloud.google.com/products/databases" target="_blank" rel="noopener noreferrer">https://cloud.google.com/products/databases</a>
                </div>
            </div>

            {/* 2.3 Networking */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">2.3</span>ネットワークリソースの計画・実装</div>

                <div className="tgrid">
                    <div className="titem">
                        <div className="tname">VPC（Virtual Private Cloud）</div>
                        <div className="tdef">GCPのソフトウェア定義ネットワーク。グローバルに展開（リージョンをまたぐ）。カスタムモードVPCでサブネットを自分で定義するのが推奨。</div>
                    </div>
                    <div className="titem">
                        <div className="tname">Shared VPC</div>
                        <div className="tdef">Host プロジェクトのVPCを複数の Service プロジェクトで共有。ネットワーク管理を集中化しつつ、アプリ開発チームは独立したプロジェクトで作業できる。</div>
                    </div>
                    <div className="titem">
                        <div className="tname">VPC Network Peering</div>
                        <div className="tdef">異なるVPC（異なる組織も可）間でプライベートIPルーティングを設定。推移的ルーティングは不可（A-B-C の場合、A-Cは直接ピアリングが必要）。</div>
                    </div>
                    <div className="titem">
                        <div className="tname">Cloud VPN</div>
                        <div className="tdef">オンプレミスと GCP を IPsec トンネルで接続。HA VPN（99.99% SLA）と Classic VPN（99.9% SLA）がある。帯域は各トンネル最大 3Gbps。</div>
                    </div>
                    <div className="titem">
                        <div className="tname">Cloud Interconnect</div>
                        <div className="tdef">オンプレミスと GCP を専用回線（Dedicated Interconnect：10/100Gbps）またはパートナー経由（Partner Interconnect：50Mbps〜50Gbps）で接続。</div>
                    </div>
                    <div className="titem">
                        <div className="tname">Cloud NGFW（次世代ファイアウォール）</div>
                        <div className="tdef">ステートフルなファイアウォール。ルールは優先度（priority）で評価。デフォルト拒否ルールが最低優先度（65535）で存在する。</div>
                    </div>
                </div>

                <div style={{ marginTop: '18px' }}>
                    <p style={{ color: 'var(--ace-text-bright)', fontWeight: 700, marginBottom: '10px' }}>ロードバランサーの種類と使い分け</p>
                </div>
                <table className="ctable">
                    <thead><tr><th>ロードバランサー</th><th>レイヤー</th><th>スコープ</th><th>ユースケース</th></tr></thead>
                    <tbody>
                        <tr><td><strong>グローバル外部 HTTP(S) LB</strong></td><td>L7</td><td>グローバル</td><td>Web アプリ、Cloud CDN 統合、URL ルーティング</td></tr>
                        <tr><td><strong>リージョン外部 HTTP(S) LB</strong></td><td>L7</td><td>リージョン</td><td>リージョン内の HTTP アプリ、プロキシ</td></tr>
                        <tr><td><strong>外部 TCP/UDP NLB（パススルー）</strong></td><td>L4</td><td>リージョン</td><td>高性能 TCP/UDP、Game サーバー、非 HTTP プロトコル</td></tr>
                        <tr><td><strong>内部 HTTP(S) LB</strong></td><td>L7</td><td>リージョン内</td><td>マイクロサービス間の内部 HTTP トラフィック</td></tr>
                        <tr><td><strong>内部 TCP/UDP LB</strong></td><td>L4</td><td>リージョン内</td><td>内部サービス間の TCP/UDP トラフィック</td></tr>
                    </tbody>
                </table>

                <div style={{ marginTop: '14px' }}>
                    <p style={{ color: 'var(--ace-text-bright)', fontWeight: 700, marginBottom: '10px' }}>Network Service Tiers（ネットワークサービス階層）</p>
                </div>
                <div className="compare-2">
                    <div className="cbox">
                        <div className="cbox-title" style={{ color: 'var(--ace-blue)' }}>Premium Tier（デフォルト）</div>
                        <ul>
                            <li>Google のプレミアムグローバルバックボーン使用</li>
                            <li>低レイテンシ・高信頼性</li>
                            <li>グローバルロードバランサー対応</li>
                            <li>コストは高め</li>
                        </ul>
                    </div>
                    <div className="cbox">
                        <div className="cbox-title" style={{ color: 'var(--ace-green)' }}>Standard Tier</div>
                        <ul>
                            <li>一般的なインターネット（ISP）経由</li>
                            <li>レイテンシはやや高い</li>
                            <li>リージョナルロードバランサーのみ</li>
                            <li>コストは低め（約30%削減）</li>
                        </ul>
                    </div>
                </div>

                <pre className="codeblock">
                    <span className="comment"># カスタムモードVPCの作成</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}compute networks create <span className="val">my-vpc</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--subnet-mode=</span><span className="val">custom</span>{'\n'}
                    {'\n'}
                    <span className="comment"># サブネットの作成</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}compute networks subnets create <span className="val">my-subnet</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--network=</span><span className="val">my-vpc</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--region=</span><span className="val">us-central1</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--range=</span><span className="val">10.0.0.0/24</span>{'\n'}
                    {'\n'}
                    <span className="comment"># ファイアウォールルールの作成（タグベース）</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}compute firewall-rules create <span className="val">allow-http</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--network=</span><span className="val">my-vpc</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--allow=</span><span className="val">tcp:80,tcp:443</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--target-tags=</span><span className="val">web-server</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--source-ranges=</span><span className="val">0.0.0.0/0</span>
                </pre>
                <div className="src">
                    <div className="srct">参照リソース</div>
                    <a href="https://cloud.google.com/vpc/docs/vpc" target="_blank" rel="noopener noreferrer">https://cloud.google.com/vpc/docs/vpc</a>
                    <a href="https://cloud.google.com/load-balancing/docs/load-balancing-overview" target="_blank" rel="noopener noreferrer">https://cloud.google.com/load-balancing/docs/load-balancing-overview</a>
                    <a href="https://cloud.google.com/network-tiers/docs/overview" target="_blank" rel="noopener noreferrer">https://cloud.google.com/network-tiers/docs/overview</a>
                </div>
            </div>

            {/* 2.4 IaC */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">2.4</span>Infrastructure as Code（IaC）による実装</div>

                <div className="tgrid">
                    <div className="titem">
                        <div className="tname">Terraform</div>
                        <div className="tdef">HashiCorp 製の最もポピュラーなIaCツール。HCL 言語で記述。GCP プロバイダーで全リソースを管理可能。State ファイル管理が重要（GCS バックエンド推奨）。</div>
                    </div>
                    <div className="titem">
                        <div className="tname">Fabric FAST</div>
                        <div className="tdef">Google 公式の Terraform ファウンデーションフレームワーク。組織・課金・VPC等の基盤構成を短時間で構築するための Terraform モジュール集。</div>
                    </div>
                    <div className="titem">
                        <div className="tname">Config Connector</div>
                        <div className="tdef">Kubernetes CRD 経由で GCP リソースを宣言的に管理。GKE 上で動作し、kubectl apply で GCP リソース（SQL・GCS等）を作成できる。</div>
                    </div>
                    <div className="titem">
                        <div className="tname">Helm</div>
                        <div className="tdef">Kubernetes アプリケーションのパッケージマネージャ。Chart という単位でアプリをテンプレート化。GKE アプリのデプロイに使用。</div>
                    </div>
                </div>

                <div className="bp">
                    <div className="bpt">IaC ベストプラクティス</div>
                    <ul>
                        <li>Terraform State ファイルは必ず GCS バックエンドに保存し、ローカルに保持しない</li>
                        <li>State ロックに Cloud Spanner または GCS オブジェクトロックを使用してコンフリクトを防ぐ</li>
                        <li>環境（dev/stg/prod）ごとに Terraform workspace またはディレクトリを分離する</li>
                        <li>CI/CD パイプライン（Cloud Build）で <code>terraform plan</code> を PR レビュー時に自動実行する</li>
                        <li>モジュールでリソースを再利用可能にし、環境間の設定差分を変数で吸収する</li>
                    </ul>
                </div>
                <pre className="codeblock">
                    <span className="comment"># Terraform でGCS バックエンドを設定する例（main.tf）</span>{'\n'}
                    {'terraform {\n'}
                    {'  backend '}<span className="val">&quot;gcs&quot;</span>{' {\n'}
                    {'    bucket = '}<span className="val">&quot;my-tfstate-bucket&quot;</span>{'\n'}
                    {'    prefix = '}<span className="val">&quot;terraform/state&quot;</span>{'\n'}
                    {'  }\n'}
                    {'}\n'}
                    {'\n'}
                    <span className="comment"># Cloud Build で terraform plan を自動実行</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}builds submit <span className="flag">--config</span>{' '}<span className="val">cloudbuild.yaml</span>{' '}.
                </pre>
                <div className="src">
                    <div className="srct">参照リソース</div>
                    <a href="https://cloud.google.com/docs/terraform" target="_blank" rel="noopener noreferrer">https://cloud.google.com/docs/terraform</a>
                    <a href="https://cloud.google.com/infrastructure-manager/docs" target="_blank" rel="noopener noreferrer">https://cloud.google.com/infrastructure-manager/docs</a>
                </div>
            </div>
        </div>
    );
}

/* ── セクション3：クラウドソリューションの運用管理 ── */
function Section3() {
    return (
        <div id="s3" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn3">03</div>
                <div className="sec-head-txt">
                    <h2>クラウドソリューションの運用管理</h2>
                    <p>コンピュート・ストレージ・ネットワークの日常運用と、Cloud Monitoring/Logging を用いた観測・問題解決を習得する。</p>
                </div>
                <div className="pct-badge pb3">~27%</div>
            </div>

            {/* 3.1 Compute Management */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">3.1</span>コンピューティングリソースの運用管理</div>

                <div className="tgrid">
                    <div className="titem">
                        <div className="tname">リモート接続（SSH/RDP）</div>
                        <div className="tdef">Console SSH ボタン、gcloud compute ssh、IAP（Identity-Aware Proxy）トンネル経由が推奨。外部IPなしの VM にも IAP 経由で接続可能。</div>
                    </div>
                    <div className="titem">
                        <div className="tname">スナップショット管理</div>
                        <div className="tdef">Persistent Disk の増分スナップショット。スケジュールスナップショットで定期的に自動取得。RPO 要件に応じて頻度を設定する。</div>
                    </div>
                    <div className="titem">
                        <div className="tname">カスタムイメージ</div>
                        <div className="tdef">OS・ミドルウェアを含む VM イメージ。ゴールデンイメージとして管理し、MIG のテンプレートに利用。イメージファミリーでバージョン管理。</div>
                    </div>
                    <div className="titem">
                        <div className="tname">GKE Node Pool 管理</div>
                        <div className="tdef">Node Pool の追加・変更・削除。クラスタを停止せずにノードプールのサイズや機種を変更可能。Node Auto Provisioning で自動最適化。</div>
                    </div>
                    <div className="titem">
                        <div className="tname">Pod オートスケーリング</div>
                        <div className="tdef">HPA（Horizontal Pod Autoscaler）：CPU/メモリでPod数をスケール。VPA（Vertical Pod Autoscaler）：Pod のリソースリクエストを動的調整。</div>
                    </div>
                    <div className="titem">
                        <div className="tname">Cloud Run トラフィック分割</div>
                        <div className="tdef">Cloud Run の複数リビジョン間でトラフィックを % で分割。カナリアデプロイ・Blue/Green デプロイに活用。</div>
                    </div>
                </div>

                <pre className="codeblock">
                    <span className="comment"># IAP 経由で外部IPなしのVMにSSH接続</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}compute ssh <span className="val">my-instance</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--zone=</span><span className="val">us-central1-a</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--tunnel-through-iap</span>{'\n'}
                    {'\n'}
                    <span className="comment"># スナップショットの作成</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}compute disks snapshot <span className="val">my-disk</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--snapshot-names=</span><span className="val">my-snapshot</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--zone=</span><span className="val">us-central1-a</span>{'\n'}
                    {'\n'}
                    <span className="comment"># Cloud Run のトラフィック分割（カナリアデプロイ）</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}run services update-traffic <span className="val">my-service</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--to-revisions=</span><span className="val">rev1=90,rev2=10</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--region=</span><span className="val">us-central1</span>{'\n'}
                    {'\n'}
                    <span className="comment"># GKE の Pod 一覧確認</span>{'\n'}
                    <span className="cmd">kubectl</span>{' '}get pods <span className="flag">-n</span>{' '}<span className="val">default</span>{' '}<span className="flag">-o wide</span>{'\n'}
                    <span className="cmd">kubectl</span>{' '}get services <span className="flag">--all-namespaces</span>
                </pre>
            </div>

            {/* 3.2 Storage Management */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">3.2</span>ストレージ・データの運用管理</div>

                <div className="tgrid">
                    <div className="titem">
                        <div className="tname">Cloud Storage オブジェクト管理</div>
                        <div className="tdef">ACL・IAM でオブジェクトレベルのアクセス制御。バージョニング・保持ポリシー・オブジェクトロック（WORM）で誤削除・改竄を防止。</div>
                    </div>
                    <div className="titem">
                        <div className="tname">ライフサイクル管理</div>
                        <div className="tdef">条件（経過日数・バージョン数）に基づき自動でストレージクラスを変更またはオブジェクトを削除。コスト最適化に重要。</div>
                    </div>
                    <div className="titem">
                        <div className="tname">データベースバックアップ</div>
                        <div className="tdef">Cloud SQL：自動バックアップ（7日保持デフォルト）・オンデマンドバックアップ・ポイントインタイムリカバリ（PITR）。Spanner：マネージドバックアップ。</div>
                    </div>
                    <div className="titem">
                        <div className="tname">Database Center</div>
                        <div className="tdef">GCPの全データベースの一元管理ダッシュボード。ヘルス・セキュリティ・コンプライアンス状況を一覧表示。</div>
                    </div>
                </div>

                <pre className="codeblock">
                    <span className="comment"># ライフサイクルポリシーJSON例</span>{'\n'}
                    {'{\n'}
                    {'  "rule": [{\n'}
                    {'    "action": {"type": '}<span className="val">&quot;SetStorageClass&quot;</span>{', "storageClass": '}<span className="val">&quot;NEARLINE&quot;</span>{'}\n'}
                    {'    "condition": {"age": '}<span className="val">30</span>{'}\n'}
                    {'  },{\n'}
                    {'    "action": {"type": '}<span className="val">&quot;Delete&quot;</span>{'}\n'}
                    {'    "condition": {"age": '}<span className="val">365</span>{'}\n'}
                    {'  }]\n'}
                    {'}\n'}
                    {'\n'}
                    <span className="comment"># BigQuery クエリ実行（コスト確認付き）</span>{'\n'}
                    <span className="cmd">bq</span>{' '}query <span className="flag">--use_legacy_sql=false</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--dry_run</span>{' '}\{'\n'}
                    {'  '}<span className="val">{"'SELECT * FROM `project.dataset.table` LIMIT 100'"}</span>{'\n'}
                    {'\n'}
                    <span className="comment"># Cloud SQL のバックアップ作成</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}sql backups create \{'\n'}
                    {'  '}<span className="flag">--instance=</span><span className="val">my-sql-instance</span>
                </pre>
            </div>

            {/* 3.3 Network Management */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">3.3</span>ネットワークリソースの運用管理</div>

                <div className="tgrid">
                    <div className="titem">
                        <div className="tname">サブネット拡張</div>
                        <div className="tdef">既存のサブネット CIDR を拡張（縮小は不可）。例：/24 → /22 に拡大。ダウンタイムなしで変更可能。既存 VM の IP アドレスは変わらない。</div>
                    </div>
                    <div className="titem">
                        <div className="tname">静的外部 IP の予約</div>
                        <div className="tdef">VM・ロードバランサーに固定 IP を割り当て。未使用の静的 IP は課金される。リージョナルとグローバルで利用可能な LB の種類が異なる。</div>
                    </div>
                    <div className="titem">
                        <div className="tname">Cloud DNS</div>
                        <div className="tdef">マネージド DNS サービス。プライベートゾーン（VPC 内部解決）とパブリックゾーンを提供。DNSSEC 対応。100% SLA。</div>
                    </div>
                    <div className="titem">
                        <div className="tname">Cloud NAT</div>
                        <div className="tdef">外部 IP を持たないVM が インターネットに outbound アクセスするための NAT ゲートウェイ。インバウンドは不可。ソフトウェア定義で高可用性。</div>
                    </div>
                </div>

                <pre className="codeblock">
                    <span className="comment"># 静的外部IPの予約</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}compute addresses create <span className="val">my-static-ip</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--region=</span><span className="val">us-central1</span>{'\n'}
                    {'\n'}
                    <span className="comment"># Cloud NAT の設定（Cloud Router 経由）</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}compute routers create <span className="val">my-router</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--network=</span><span className="val">my-vpc</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--region=</span><span className="val">us-central1</span>{'\n'}
                    {'\n'}
                    <span className="cmd">gcloud</span>{' '}compute routers nats create <span className="val">my-nat</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--router=</span><span className="val">my-router</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--auto-allocate-nat-external-ips</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--nat-all-subnet-ip-ranges</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--region=</span><span className="val">us-central1</span>
                </pre>
            </div>

            {/* 3.4 Monitoring & Logging */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">3.4</span>監視・ロギング（Cloud Observability）</div>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>Cloud Monitoring・Cloud Logging・Cloud Trace・Cloud Profiler を組み合わせて可観測性（Observability）を実現する。ACEで頻出の実践的トピック。</p>

                <table className="ctable">
                    <thead><tr><th>サービス</th><th>役割</th><th>主な機能</th></tr></thead>
                    <tbody>
                        <tr>
                            <td><strong style={{ color: 'var(--ace-green)' }}>Cloud Monitoring</strong></td>
                            <td>メトリクス監視</td>
                            <td>アラートポリシー・アップタイムチェック・ダッシュボード。Ops Agent でカスタムメトリクス収集。Prometheus 統合。</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--ace-green)' }}>Cloud Logging</strong></td>
                            <td>ログ管理</td>
                            <td>全GCPサービスのログを一元収集。ログバケット・シンク（BigQuery/GCS/Pub/Sub 転送）・ログアナリティクスで SQL 分析。</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--ace-green)' }}>Cloud Trace</strong></td>
                            <td>分散トレーシング</td>
                            <td>リクエストのレイテンシ分析。マイクロサービス間の依存関係を可視化。ボトルネック特定に使用。</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--ace-green)' }}>Cloud Profiler</strong></td>
                            <td>プロファイリング</td>
                            <td>本番アプリの CPU/メモリ使用プロファイルを継続的収集。パフォーマンス劣化箇所の特定。</td>
                        </tr>
                        <tr>
                            <td><strong style={{ color: 'var(--ace-green)' }}>Ops Agent</strong></td>
                            <td>エージェント</td>
                            <td>Compute Engine VM へインストールするエージェント。Fluent Bit + OpenTelemetry で ログ+メトリクスを送信。</td>
                        </tr>
                    </tbody>
                </table>

                <div style={{ marginTop: '16px' }}>
                    <p style={{ color: 'var(--ace-text-bright)', fontWeight: 700, marginBottom: '10px' }}>監査ログの種類（試験頻出）</p>
                </div>
                <table className="ctable">
                    <thead><tr><th>ログ種別</th><th>内容</th><th>デフォルト</th></tr></thead>
                    <tbody>
                        <tr><td><strong>Admin Activity</strong></td><td>リソース構成変更（VM 作成・削除・IAM 変更等）</td><td>常に有効・無効化不可</td></tr>
                        <tr><td><strong>Data Access</strong></td><td>データの読み書き（GCS ファイル読み取り等）</td><td>デフォルト無効（有効化推奨）</td></tr>
                        <tr><td><strong>System Event</strong></td><td>Google システムが自動実行する操作（ライブマイグレーション等）</td><td>常に有効</td></tr>
                        <tr><td><strong>Policy Denied</strong></td><td>VPC Service Controls でブロックされたアクセス</td><td>有効化で記録</td></tr>
                    </tbody>
                </table>

                <div className="bp">
                    <div className="bpt">監視・ロギングのベストプラクティス</div>
                    <ul>
                        <li>Ops Agent を全 Compute Engine VM に必ず導入し、ログとメトリクスを集中管理する</li>
                        <li>Data Access 監査ログを有効化し、機密データへのアクセスを記録する（コスト増に注意）</li>
                        <li>ログシンクで BigQuery へ転送し、Log Analytics で長期分析・コンプライアンスレポートを作成</li>
                        <li>SLO に基づいたアラートを設定し、ノイズを減らす（症状ベース vs 原因ベースのアラート）</li>
                        <li>Active Assist（Recommender）の推奨を定期チェックし、リソースの最適化に活用する</li>
                    </ul>
                </div>

                <pre className="codeblock">
                    <span className="comment"># Cloud Monitoring アラートポリシーの作成</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}alpha monitoring policies create \{'\n'}
                    {'  '}<span className="flag">--policy-from-file=</span><span className="val">alert-policy.json</span>{'\n'}
                    {'\n'}
                    <span className="comment"># ログシンクの作成（BigQueryへ転送）</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}logging sinks create <span className="val">my-bq-sink</span>{' '}\{'\n'}
                    {'  '}<span className="val">bigquery.googleapis.com/projects/PROJECT_ID/datasets/DATASET</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--log-filter=</span><span className="val">{"'resource.type=\"gce_instance\"'"}</span>{'\n'}
                    {'\n'}
                    <span className="comment"># Ops Agent のインストール（Compute Engine VM内で実行）</span>{'\n'}
                    {'curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh\n'}
                    <span className="cmd">bash</span>{' '}add-google-cloud-ops-agent-repo.sh <span className="flag">--also-install</span>{'\n'}
                    {'\n'}
                    <span className="comment"># 監査ログの確認</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}logging read \{'\n'}
                    {'  '}<span className="val">{"'logName=\"projects/PROJECT_ID/logs/cloudaudit.googleapis.com%2Factivity\"'"}</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--limit=</span><span className="val">50</span>
                </pre>
                <div className="src">
                    <div className="srct">参照リソース</div>
                    <a href="https://cloud.google.com/monitoring/docs" target="_blank" rel="noopener noreferrer">https://cloud.google.com/monitoring/docs</a>
                    <a href="https://cloud.google.com/logging/docs" target="_blank" rel="noopener noreferrer">https://cloud.google.com/logging/docs</a>
                    <a href="https://cloud.google.com/logging/docs/audit" target="_blank" rel="noopener noreferrer">https://cloud.google.com/logging/docs/audit</a>
                    <a href="https://cloud.google.com/stackdriver/docs/solutions/agents/ops-agent" target="_blank" rel="noopener noreferrer">https://cloud.google.com/stackdriver/docs/solutions/agents/ops-agent</a>
                </div>
            </div>
        </div>
    );
}

/* ── セクション4：アクセスとセキュリティの構成 ── */
function Section4() {
    return (
        <div id="s4" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn4">04</div>
                <div className="sec-head-txt">
                    <h2>アクセスとセキュリティの構成</h2>
                    <p>IAMポリシーの管理、サービスアカウントの適切な利用、最小権限の原則を徹底する。</p>
                </div>
                <div className="pct-badge pb4">~20%</div>
            </div>

            {/* 4.1 IAM Management */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">4.1</span>IAM ポリシーの管理</div>

                <div className="tgrid">
                    <div className="titem">
                        <div className="tname">IAM ポリシーの確認と付与</div>
                        <div className="tdef"><code>get-iam-policy</code> で現在のポリシー確認、<code>add-iam-policy-binding</code> で個別追加、<code>set-iam-policy</code> でファイルから全体を上書き。</div>
                    </div>
                    <div className="titem">
                        <div className="tname">条件付き IAM（Conditional IAM）</div>
                        <div className="tdef">時間帯・リソース属性・IP アドレスなどの条件に基づいて IAM を制御。例：業務時間内のみアクセス許可、特定リージョンのリソースのみ操作可能。</div>
                    </div>
                    <div className="titem">
                        <div className="tname">拒否ポリシー（Deny Policy）</div>
                        <div className="tdef">許可ポリシーよりも優先して適用される拒否ルール。Owner でも上書きできない強制的な制約を作成可能。組織・フォルダ・プロジェクトに適用。</div>
                    </div>
                    <div className="titem">
                        <div className="tname">Policy Analyzer</div>
                        <div className="tdef">「このユーザーはこのリソースに何ができるか？」を分析するツール。誰が特定リソースにアクセスできるかを可視化。</div>
                    </div>
                </div>

                <pre className="codeblock">
                    <span className="comment"># IAMポリシーの確認</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}projects get-iam-policy <span className="val">PROJECT_ID</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--format=</span><span className="val">json</span>{'\n'}
                    {'\n'}
                    <span className="comment"># 特定ロールの付与（条件付き）</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}projects add-iam-policy-binding <span className="val">PROJECT_ID</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--member=</span><span className="val">&quot;group:dev-team@example.com&quot;</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--role=</span><span className="val">&quot;roles/compute.viewer&quot;</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--condition=</span><span className="val">{"'expression=request.time.getHours(\"Asia/Tokyo\") >= 9 && request.time.getHours(\"Asia/Tokyo\") <= 18,title=BusinessHoursOnly'"}</span>{'\n'}
                    {'\n'}
                    <span className="comment"># ロールの削除</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}projects remove-iam-policy-binding <span className="val">PROJECT_ID</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--member=</span><span className="val">&quot;user:alice@example.com&quot;</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--role=</span><span className="val">&quot;roles/editor&quot;</span>
                </pre>

                <div className="bp">
                    <div className="bpt">IAM 管理のベストプラクティス</div>
                    <ul>
                        <li>基本ロール（Owner/Editor/Viewer）は本番環境では使用せず、事前定義ロールを使う</li>
                        <li>個人ではなくグループにロールを付与する（管理の簡素化・監査の容易化）</li>
                        <li>最小権限の原則：必要最小限の権限のみを付与し、定期的にレビューする</li>
                        <li>Policy Analyzer で権限の棚卸しを定期実施し、不要なバインディングを削除する</li>
                    </ul>
                </div>
            </div>

            {/* 4.2 Service Accounts */}
            <div className="tcard">
                <div className="ttitle"><span className="tid">4.2</span>サービスアカウントの管理</div>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>サービスアカウントは <strong style={{ color: 'var(--ace-cyan)' }}>「人間ではなくアプリケーション・VM・サービスのための IAM メンバー」</strong>。適切に管理しないとセキュリティリスクになる。</p>

                <div className="tgrid">
                    <div className="titem">
                        <div className="tname">サービスアカウントの作成</div>
                        <div className="tdef">プロジェクトに専用のサービスアカウントを作成し、アプリごとに分離する。1アプリ = 1サービスアカウントが原則。</div>
                    </div>
                    <div className="titem">
                        <div className="tname">VM へのサービスアカウント割り当て</div>
                        <div className="tdef">VM 作成時またはサービスアカウントの変更で割り当て。VM 上のアプリは Application Default Credentials (ADC) で自動認証される。鍵ファイル不要。</div>
                    </div>
                    <div className="titem">
                        <div className="tname">サービスアカウントなりすまし（Impersonation）</div>
                        <div className="tdef"><code>roles/iam.serviceAccountTokenCreator</code> ロールを持つユーザーが他のサービスアカウントとして一時的に行動できる。監査ログに記録される。</div>
                    </div>
                    <div className="titem">
                        <div className="tname">短期間の認証情報</div>
                        <div className="tdef">長期間有効なサービスアカウントキーを使わず、<code>generateIdToken</code> や <code>generateAccessToken</code> で短期間（1時間）のトークンを発行する。</div>
                    </div>
                    <div className="titem">
                        <div className="tname">GKE Workload Identity</div>
                        <div className="tdef">Kubernetes ServiceAccount と GCP ServiceAccount をバインドする仕組み。Pod から GCP リソースへ鍵ファイルなしにアクセス可能。GKE のベストプラクティス。</div>
                    </div>
                    <div className="titem">
                        <div className="tname">サービスアカウントキーの廃止</div>
                        <div className="tdef">サービスアカウントキー（JSON ファイル）の発行は最終手段。代わりに Workload Identity Federation や VM へのサービスアカウント割り当てを使う。</div>
                    </div>
                </div>

                <div className="wb">
                    <div className="wbt">セキュリティリスク：サービスアカウントキー</div>
                    <ul>
                        <li>キーファイルは漏洩すると長期間悪用される危険がある（有効期限なし）</li>
                        <li>組織ポリシーで <code>constraints/iam.disableServiceAccountKeyCreation</code> を適用し、キー作成を禁止できる</li>
                        <li>どうしてもキーが必要な場合：90日以下のローテーション、Secret Manager での安全な保管が必須</li>
                    </ul>
                </div>

                <pre className="codeblock">
                    <span className="comment"># サービスアカウントの作成</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}iam service-accounts create <span className="val">my-app-sa</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--display-name=</span><span className="val">&quot;My App Service Account&quot;</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--project=</span><span className="val">PROJECT_ID</span>{'\n'}
                    {'\n'}
                    <span className="comment"># サービスアカウントにロールを付与</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}projects add-iam-policy-binding <span className="val">PROJECT_ID</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--member=</span><span className="val">&quot;serviceAccount:my-app-sa@PROJECT_ID.iam.gserviceaccount.com&quot;</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--role=</span><span className="val">&quot;roles/storage.objectViewer&quot;</span>{'\n'}
                    {'\n'}
                    <span className="comment"># GKE Workload Identity の設定</span>{'\n'}
                    <span className="comment"># 1. K8s ServiceAccount と GCP SA をバインド</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}iam service-accounts add-iam-policy-binding <span className="val">GSA_NAME@PROJECT_ID.iam.gserviceaccount.com</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--role=</span><span className="val">roles/iam.workloadIdentityUser</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--member=</span><span className="val">&quot;serviceAccount:PROJECT_ID.svc.id.goog[NAMESPACE/KSA_NAME]&quot;</span>{'\n'}
                    {'\n'}
                    <span className="comment"># 2. K8s SA にアノテーション付与</span>{'\n'}
                    <span className="cmd">kubectl</span>{' '}annotate serviceaccount <span className="val">KSA_NAME</span>{' '}\{'\n'}
                    {'  '}<span className="flag">--namespace=</span><span className="val">NAMESPACE</span>{' '}\{'\n'}
                    {'  '}iam.gke.io/gcp-service-account=<span className="val">GSA_NAME@PROJECT_ID.iam.gserviceaccount.com</span>
                </pre>
                <div className="src">
                    <div className="srct">参照リソース</div>
                    <a href="https://cloud.google.com/iam/docs/service-account-overview" target="_blank" rel="noopener noreferrer">https://cloud.google.com/iam/docs/service-account-overview</a>
                    <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity" target="_blank" rel="noopener noreferrer">https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity</a>
                    <a href="https://cloud.google.com/iam/docs/workload-identity-federation" target="_blank" rel="noopener noreferrer">https://cloud.google.com/iam/docs/workload-identity-federation</a>
                </div>
            </div>

            {/* Study Road Map */}
            <hr className="sdiv" />
            <div className="tcard" style={{ borderColor: 'rgba(79,142,247,.4)' }}>
                <div className="ttitle">ACE 試験合格ロードマップ（推奨 8〜12 週）</div>
                <div className="sflow">
                    <div className="sitem">
                        <div className="snum">W1-2</div>
                        <div className="scont">
                            <strong>GCP 基礎とリソース階層を理解する</strong>
                            <p>Cloud Skills Boost の「Google Cloud Fundamentals: Core Infrastructure」を受講。GCP コンソールとgcloud CLI を毎日触る。無料クレジット（$300）で実際に操作する。</p>
                        </div>
                    </div>
                    <div className="sitem">
                        <div className="snum">W3-4</div>
                        <div className="scont">
                            <strong>コンピューティングサービスを習得する（Section 2 の核心）</strong>
                            <p>Compute Engine・GKE・Cloud Run のハンズオンラボを複数実施。<code>gcloud</code> コマンドを暗記ではなく理解して使えるようにする。</p>
                        </div>
                    </div>
                    <div className="sitem">
                        <div className="snum">W5-6</div>
                        <div className="scont">
                            <strong>ストレージ・ネットワーク・IaC を習得する</strong>
                            <p>各 DB サービスの特性を比較表で整理。VPC・ファイアウォール・LB の設定をハンズオンで実践。Terraform で実際に GCP リソースをデプロイしてみる。</p>
                        </div>
                    </div>
                    <div className="sitem">
                        <div className="snum">W7-8</div>
                        <div className="scont">
                            <strong>運用管理・監視・IAM を習得する</strong>
                            <p>Cloud Monitoring でアラートを設定。Cloud Logging でログフィルタを作成。IAM の各ロール種別とサービスアカウントの使い方を完全理解する。</p>
                        </div>
                    </div>
                    <div className="sitem">
                        <div className="snum">W9-10</div>
                        <div className="scont">
                            <strong>模擬試験と弱点補強</strong>
                            <p>公式サンプル問題を繰り返し解く。間違えた問題の公式ドキュメントを必ず読む。Udemy 等の有料模擬問題集（400問以上）も活用すると合格率が上がる。</p>
                        </div>
                    </div>
                </div>

                <div className="pills" style={{ marginTop: '16px' }}>
                    <span className="pill p-blue">2時間・50〜60問</span>
                    <span className="pill p-green">推奨：6ヶ月の実務経験</span>
                    <span className="pill p-yellow">日本語受験可</span>
                    <span className="pill p-purple">オンライン受験対応</span>
                    <span className="pill p-orange">$125 / 更新 $75</span>
                </div>

                <div className="src">
                    <div className="srct">公式リンク集</div>
                    <a href="https://cloud.google.com/learn/certification/cloud-engineer" target="_blank" rel="noopener noreferrer">試験概要：https://cloud.google.com/learn/certification/cloud-engineer</a>
                    <a href="https://services.google.com/fh/files/misc/associate_cloud_engineer_exam_guide_english.pdf" target="_blank" rel="noopener noreferrer">試験ガイド PDF</a>
                    <a href="https://www.cloudskillsboost.google/paths/11" target="_blank" rel="noopener noreferrer">公式ラーニングパス：https://www.cloudskillsboost.google/paths/11</a>
                    <a href="https://cloud.google.com/docs" target="_blank" rel="noopener noreferrer">GCP 公式ドキュメント：https://cloud.google.com/docs</a>
                </div>
            </div>
        </div>
    );
}

/* ── メインページコンポーネント ── */
export default function AssociateCloudEngineerPage() {
    return (
        <div className="ace-page">
            {/* Hero */}
            <section className="hero">
                <div className="hero-eyebrow">Google Cloud Certification</div>
                <h1>
                    <span className="accent">Associate Cloud Engineer</span>
                    <br />
                    完全マスター教材
                </h1>
                <p className="hero-desc">
                    GCP の基盤構築から運用管理まで——ACE 試験に必要な知識を体系的に学ぶ
                </p>
                <div className="meta-row">
                    <div className="meta-pill">
                        <div className="ml">Duration</div>
                        <div className="mv">2 時間</div>
                    </div>
                    <div className="meta-pill">
                        <div className="ml">Questions</div>
                        <div className="mv">50〜60問</div>
                    </div>
                    <div className="meta-pill">
                        <div className="ml">Fee</div>
                        <div className="mv">$125</div>
                    </div>
                    <div className="meta-pill">
                        <div className="ml">Validity</div>
                        <div className="mv">2 年間</div>
                    </div>
                    <div className="meta-pill">
                        <div className="ml">Language</div>
                        <div className="mv">日本語対応</div>
                    </div>
                </div>
            </section>

            {/* Sticky Nav */}
            <nav className="snav" role="navigation">
                <a href="#overview" className="n1"><span className="dot db" />概要</a>
                <a href="#s1" className="n1"><span className="dot db" />S1: 環境構築</a>
                <a href="#s2" className="n2"><span className="dot dg" />S2: 計画・実装</a>
                <a href="#s3" className="n3"><span className="dot dy" />S3: 運用管理</a>
                <a href="#s4" className="n4"><span className="dot do" />S4: アクセス・セキュリティ</a>
            </nav>

            {/* Main Content */}
            <main className="wrap">
                {/* Overview */}
                <div id="overview">
                    <div className="overview-card">
                        <h3>出題セクション別 比重と内容</h3>
                        <div className="prow">
                            <div className="pl">Section 1: クラウド環境のセットアップ</div>
                            <div className="pbar"><div className="pfill fb" style={{ width: '23%' }} /></div>
                            <div className="ppct cb">~23%</div>
                        </div>
                        <div className="prow">
                            <div className="pl">Section 2: クラウドソリューションの計画・実装</div>
                            <div className="pbar"><div className="pfill fg" style={{ width: '30%' }} /></div>
                            <div className="ppct cg">~30%</div>
                        </div>
                        <div className="prow">
                            <div className="pl">Section 3: クラウドソリューションの運用</div>
                            <div className="pbar"><div className="pfill fy" style={{ width: '27%' }} /></div>
                            <div className="ppct cy">~27%</div>
                        </div>
                        <div className="prow">
                            <div className="pl">Section 4: アクセスとセキュリティの構成</div>
                            <div className="pbar"><div className="pfill fo" style={{ width: '20%' }} /></div>
                            <div className="ppct co">~20%</div>
                        </div>
                    </div>
                </div>

                <Section1 />
                <hr className="sdiv" />
                <Section2 />
                <hr className="sdiv" />
                <Section3 />
                <hr className="sdiv" />
                <Section4 />
            </main>

            {/* Page Footer */}
            <footer className="page-footer">
                <p style={{ marginBottom: '8px', fontWeight: 600 }}>Google Cloud Associate Cloud Engineer 試験完全対策ガイド</p>
                <p>
                    参考：<a href="https://cloud.google.com/learn/certification/cloud-engineer" target="_blank" rel="noopener noreferrer">Google Cloud 公式試験ページ</a> ｜ 作成日：2026年3月
                </p>
                <p style={{ marginTop: '8px', fontSize: '11px', opacity: 0.5 }}>※ 本ガイドは学習目的で作成。最新情報は必ず公式サイトでご確認ください。</p>
            </footer>
        </div>
    );
}
