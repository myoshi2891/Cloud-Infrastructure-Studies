import type { Metadata } from 'next';
import '../ace.css';

export const metadata: Metadata = {
    title: 'ACE 試験対策・アーキテクチャ詳細ガイド | Associate Cloud Engineer',
    description:
        'Google Cloud ACE 試験の完全学習ガイド。初学者向け試験概要・学習ロードマップから、コンピューティング・GKE・ストレージ・ネットワーク・IaC・IAM・GenAI まで全領域のアーキテクチャとベストプラクティスを網羅。',
};

/* ── Section 1: 試験の全体像と学習ロードマップ ── */
function S1Overview() {
    return (
        <div id="s1" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn1">01</div>
                <div className="sec-head-txt">
                    <h2>試験の全体像と学習ロードマップ</h2>
                    <p>ACE認定資格の概要、試験構成、出題ドメインと配点比率、6〜8週間の学習ロードマップ。</p>
                </div>
                <div className="pct-badge pb1">≈23%</div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">1.1</span>ACE認定資格とは？</div>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    Google Cloud Associate Cloud Engineer (ACE) は、Google Cloud を使ったアプリケーションやインフラのデプロイ・保守を担うエンジニア向けの入門〜中級認定資格です。
                </p>
                <table className="ctable">
                    <thead>
                        <tr><th>レベル</th><th>説明</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>推奨経験</td><td>Google Cloud での実務経験 <strong>6ヶ月以上</strong></td></tr>
                        <tr><td>スキルセット</td><td>クラウドインフラの設計、デプロイ、監視、セキュリティ設定</td></tr>
                        <tr><td>次のステップ</td><td>Professional Cloud Architect / Professional DevOps Engineer</td></tr>
                    </tbody>
                </table>
                <div className="src">
                    <div className="srct">公式ページ</div>
                    <a href="https://cloud.google.com/learn/certification/cloud-engineer?hl=en" target="_blank" rel="noopener noreferrer">https://cloud.google.com/learn/certification/cloud-engineer?hl=en</a>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">1.2</span>試験の種類と構成</div>
                <table className="ctable">
                    <thead>
                        <tr><th>試験タイプ</th><th>試験時間</th><th>設問数</th><th>受験料</th><th>有効期限</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><strong>Standard Exam</strong>（新規・再取得）</td><td>2時間</td><td>50〜60問</td><td>$125</td><td>3年</td></tr>
                        <tr><td><strong>Renewal Exam</strong>（有効期限内の更新）</td><td>1時間</td><td>20問</td><td>$75</td><td>3年</td></tr>
                    </tbody>
                </table>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">1.3</span>出題ドメインと配点比率</div>
                <pre className="codeblock">{`┌─────────────────────────────────────────────────────────┐
│  Domain 1: クラウドソリューション環境の設定      ≈ 23%  │
│  Domain 2: クラウドソリューションの計画と実装    ≈ 30%  │
│  Domain 3: 正常なオペレーションの確保            ≈ 27%  │
│  Domain 4: アクセスとセキュリティの構成          ≈ 20%  │
└─────────────────────────────────────────────────────────┘`}</pre>
                <p style={{ fontSize: '14px', marginBottom: '0' }}>
                    💡 <strong>学習のコツ</strong>: Domain 2（計画と実装）が最大配点です。Compute Engine、GKE、Cloud SQL などの実装パターンを重点的に学習しましょう。
                </p>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">1.4</span>学習ロードマップ（目安: 6〜8週間）</div>
                <pre className="codeblock">{`Week 1-2: 基礎固め
  └── Google Cloud 概要 → IAM・リソース階層 → VPCの基本

Week 3-4: コンピューティング & ストレージ
  └── Compute Engine → GKE → Cloud Run → Cloud Storage → データベース選定

Week 5-6: ネットワーク & IaC
  └── VPC設計 → ロードバランサ → Terraform基礎

Week 7-8: 運用 & 試験対策
  └── Cloud Monitoring/Logging → セキュリティ強化 → 模擬試験`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">1.5</span>エンタープライズ視点: 試験構造の詳細</div>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    ACE試験には、初回の認定または失効した認定の再取得を目的とする「スタンダード試験（Standard Exam）」と、有効期限内の更新を目的とする「更新試験（Renewal Exam）」の2つのパスが用意されている。
                </p>
                <table className="ctable">
                    <thead>
                        <tr><th>試験タイプ</th><th>試験時間</th><th>設問数</th><th>受験料</th><th>有効期限</th><th>出題範囲の特徴</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Standard Exam</strong></td>
                            <td>2時間</td><td>50〜60問</td><td>$125</td><td>3年</td>
                            <td>クラウド環境の設定、計画・実装、運用、アクセスとセキュリティの全領域。</td>
                        </tr>
                        <tr>
                            <td><strong>Renewal Exam</strong></td>
                            <td>1時間</td><td>20問</td><td>$75</td><td>3年</td>
                            <td>実装（約40%）、運用（約40%）、セキュリティ（約20%）に焦点を当てた実務中心の内容。</td>
                        </tr>
                    </tbody>
                </table>
                <p style={{ fontSize: '14px', marginBottom: '0' }}>
                    試験ガイドに基づく主要な出題ドメインは、クラウドソリューション環境の設定（約23%）、クラウドソリューションの計画と実装（約30%）、正常なオペレーションの確保（約27%）、アクセスとセキュリティの構成（約20%）の4つに大別される。これらのドメインは、インフラストラクチャのライフサイクル全体を網羅しており、理論的な知識だけでなく、実務におけるシナリオベースの問題解決能力が問われる。
                </p>
                <div className="src">
                    <div className="srct">参照リソース</div>
                    <a href="https://cloud.google.com/learn/certification/cloud-engineer?hl=en" target="_blank" rel="noopener noreferrer">Associate Cloud Engineer Certification | Google Cloud</a>
                    <a href="https://services.google.com/fh/files/misc/associate_cloud_engineer_exam_guide_english.pdf" target="_blank" rel="noopener noreferrer">Associate Cloud Engineer Exam Guide（公式 PDF）</a>
                </div>
            </div>
        </div>
    );
}

/* ── Section 2: クラウドソリューション環境の設定とガバナンス ── */
function S2Governance() {
    return (
        <div id="s2" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn2">02</div>
                <div className="sec-head-txt">
                    <h2>クラウドソリューション環境の設定とガバナンス</h2>
                    <p>リソース階層、IAMポリシー継承、請求先アカウント、予算アラート、自動コスト制御アーキテクチャ。</p>
                </div>
                <div className="pct-badge pb2">Domain 1</div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">2.1</span>リソース階層（Resource Hierarchy）</div>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    Google Cloud のすべてのリソースは、以下の厳密な階層構造で管理されます。
                </p>
                <pre className="codeblock">{`Organization（組織）
    └── Folder（フォルダ）
            └── Project（プロジェクト）
                    └── Resources（VMなど個別リソース）`}</pre>
                <table className="ctable">
                    <thead>
                        <tr><th>レベル</th><th>役割</th><th>具体例</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><strong>Organization</strong></td><td>企業・組織全体のルート</td><td>「example.com」</td></tr>
                        <tr><td><strong>Folder</strong></td><td>部門・事業部の区分け</td><td>「開発部」「財務部」</td></tr>
                        <tr><td><strong>Project</strong></td><td>ビリングと信頼境界の単位</td><td>「prod-webapp」「dev-backend」</td></tr>
                        <tr><td><strong>Resource</strong></td><td>実際のクラウドリソース</td><td>VM、バケット、DBなど</td></tr>
                    </tbody>
                </table>
                <p style={{ fontSize: '14px', marginBottom: '10px' }}><strong>IAMポリシーの継承</strong></p>
                <pre className="codeblock">{`Organization レベルのポリシー
    ↓ 自動継承
Folder レベルのポリシー
    ↓ 自動継承
Project レベルのポリシー
    ↓ 自動継承
個別リソースのポリシー`}</pre>
                <div className="wb">
                    ⚠️ <strong>重要</strong>: IAMポリシーは <strong>上位から下位へ継承</strong> されます。下位レベルで制限しても、上位で許可されていればアクセスできます。
                </div>
                <div className="bp">
                    <div className="bpt">ベストプラクティス</div>
                    <ul>
                        <li><strong>企業組織構造をフォルダ階層に反映する</strong>（部門→プロジェクト）</li>
                        <li><strong>同じ信頼境界のリソースは同一プロジェクトにまとめる</strong></li>
                        <li><strong>複数プロジェクト共通の権限は親フォルダで付与</strong>（管理オーバーヘッド削減）</li>
                        <li>Google Workspace または Cloud Identity アカウントに組織を紐付ける</li>
                    </ul>
                </div>
                <div className="src">
                    <div className="srct">参照リソース</div>
                    <a href="https://docs.cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy" target="_blank" rel="noopener noreferrer">https://docs.cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy</a>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">2.2</span>請求と予算管理（Billing &amp; Budget）</div>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}><strong>請求先アカウントの構造</strong></p>
                <pre className="codeblock">{`支払いプロファイル（クレカ情報など）
    └── 請求先アカウント（Billing Account）
            ├── Project A
            ├── Project B
            └── Project C`}</pre>
                <p style={{ fontSize: '14px', marginBottom: '10px' }}>
                    💡 各プロジェクトは <strong>正確に1つ</strong> の請求先アカウントにリンクされます。
                </p>
                <p style={{ fontSize: '14px', marginBottom: '10px' }}><strong>予算アラートの設定フロー</strong></p>
                <pre className="codeblock">{`1. 予算を設定（月次/四半期/年次）
2. スコープを設定（組織 / フォルダ / プロジェクト / ラベル）
3. 閾値を設定（例: 50% / 90% / 100%）
4. 通知先を設定（メール or Pub/Sub）`}</pre>
                <div className="wb">
                    ⚠️ <strong>最重要ポイント: 予算上限でリソースは止まらない</strong><br />
                    Google Cloud は予算の上限に達しても <strong>リソースを自動停止しません</strong>。
                </div>
                <p style={{ fontSize: '14px', marginBottom: '10px' }}>自動停止を実現するアーキテクチャ:</p>
                <pre className="codeblock">{`予算アラート
    → Pub/Sub トピック
        → Cloud Functions
            → リソースの停止 (例: VM停止, API無効化)`}</pre>
                <table className="ctable">
                    <thead>
                        <tr><th>リスク</th><th>原因</th><th>対策</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>暗号資産マイニング</td><td>認証情報漏洩</td><td>Secret Manager 利用、キーの定期ローテーション</td></tr>
                        <tr><td>DDoS によるオートスケール過多</td><td>トラフィック急増</td><td><strong>Cloud Armor</strong> でエッジ防御 + スケーリング上限設定</td></tr>
                    </tbody>
                </table>
                <div className="bp">
                    <div className="bpt">ベストプラクティス</div>
                    <ul>
                        <li>Cloud Billing データを <strong>BigQuery へエクスポート</strong> し、SQL でコスト分析・監査を実施する</li>
                        <li>予算は実際のコストだけでなく <strong>予測コスト</strong> に対してもアラートを設定する</li>
                        <li>ラベル（Labels）を活用してリソースをコストセンター単位で分類する</li>
                    </ul>
                </div>
                <div className="src">
                    <div className="srct">参照リソース</div>
                    <a href="https://docs.cloud.google.com/billing/docs/how-to/budgets" target="_blank" rel="noopener noreferrer">https://docs.cloud.google.com/billing/docs/how-to/budgets</a>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">2.3</span>エンタープライズ視点: リソース階層設計とガバナンス</div>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    Google Cloudのリソースは厳密な階層構造で管理される。リソース階層の設計においては、実際の企業の組織構造（部門、事業部、チームなど）をクラウド階層にミラーリングすることがベストプラクティスとされる。Identity and Access Management (IAM) のポリシーは、この階層を通じて上位レベルから下位レベルへと継承されるため、組織レベルで適用されたアクセス制御ポリシーは、その配下にあるすべてのリソースに自動的に適用される。
                </p>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    プロジェクトは企業内の信頼境界（Trust Boundary）を表すため、同じ信頼境界を共有するリソースは同一のプロジェクトにグループ化することが推奨される。複数のプロジェクトにまたがる役割をユーザーに付与する必要がある場合は、プロジェクト単位で設定するのではなく、親フォルダレベルで役割を設定することで管理のオーバーヘッドを削減できる。
                </p>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">2.4</span>エンタープライズ視点: 請求・コスト管理戦略</div>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    クラウドの運用において、コストの監視と管理は極めて重要である。Google Cloudの請求システムは、支払いプロファイルに紐づく請求先アカウント（Billing Account）を中心に構成されており、各プロジェクトは正確に一つの請求先アカウントにリンクされる必要がある。効果的なコスト管理のためには、「価格（設定された料金）」と「コスト（使用量に基づく実際の支出）」の根本的な違いを理解することが不可欠である。
                </p>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    予期せぬ請求を防ぐための主要なメカニズムが「予算（Budgets）」と「アラート」である。これらは月次、四半期、年次などの期間で設定でき、組織、フォルダ、プロジェクト、または特定のリソースラベルごとにスコープを限定することが可能である。実際のコストや予測コストが設定した閾値に達した際、指定した受信者にメールで通知が送信される。しかし、ここで注意すべき重要な仕様は、Google Cloudは予算の上限に達してもリソースを自動的にシャットダウンしないという点である。プログラムによる自動的なコスト制御（例えば、特定のリソースの停止）を実現するには、予算アラートの通知先としてPub/Subトピックを設定し、Cloud Functionsなどをトリガーするアーキテクチャを構築する必要がある。
                </p>
                <p style={{ fontSize: '14px', marginBottom: '0' }}>
                    また、セキュリティインシデントがコストに与える影響も考慮しなければならない。誤って漏洩した認証情報が悪用されて暗号資産のマイニングが行われたり、DDoS攻撃によってフロントエンドの負荷が急増し、オートスケーリングが不必要にトリガーされたりすることで、多額の請求が発生するリスクがある。これらの脅威を軽減するためには、スケーリングの上限を適切に設定し、ネットワーク境界でCloud Armorを利用して脅威を検出・緩和することが推奨される。さらに、詳細なコスト分析や監査の基盤として、Cloud BillingデータをBigQueryへ継続的にエクスポートする設定を有効にすることが求められる。
                </p>
            </div>
        </div>
    );
}

/* ── Section 3: コンピューティングリソース ── */
function S3Compute() {
    return (
        <div id="s3" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn3">03</div>
                <div className="sec-head-txt">
                    <h2>コンピューティングリソース</h2>
                    <p>Compute Engine、Spot VM、Cloud Run の詳細と選定基準。OS Login、Workload Identity、サーバーレスネットワーキング。</p>
                </div>
                <div className="pct-badge pb3">Domain 2</div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">3.1</span>コンピューティングサービス選定ガイド</div>
                <pre className="codeblock">{`「どのコンピューティングサービスを使う？」

制御レベルが高い ←────────────────────→ 制御レベルが低い
Compute Engine → GKE Standard → GKE Autopilot → Cloud Run → Cloud Functions`}</pre>
                <table className="ctable">
                    <thead>
                        <tr><th>サービス</th><th>特徴</th><th>最適なユースケース</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><strong>Compute Engine</strong></td><td>完全な OS 制御が可能な VM</td><td>レガシー移行、特定ライセンスが必要なアプリ</td></tr>
                        <tr><td><strong>Spot VM</strong></td><td>最大91%割引、いつでも停止される可能性あり</td><td>バッチ処理、レンダリング、ML トレーニング</td></tr>
                        <tr><td><strong>GKE</strong></td><td>マネージド Kubernetes</td><td>マイクロサービス、コンテナ化アプリ</td></tr>
                        <tr><td><strong>Cloud Run</strong></td><td>フルマネージドサーバーレスコンテナ</td><td>HTTP API、イベント駆動の処理</td></tr>
                        <tr><td><strong>Cloud Functions</strong></td><td>イベント駆動の関数</td><td>軽量なグルーロジック、Webhookなど</td></tr>
                    </tbody>
                </table>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">3.2</span>Compute Engine (GCE) の詳細</div>
                <table className="ctable">
                    <thead>
                        <tr><th>マシンファミリー</th><th>特徴</th><th>用途</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><strong>General Purpose</strong> (N2, E2)</td><td>バランス型</td><td>Web サーバー、開発環境</td></tr>
                        <tr><td><strong>Compute Optimized</strong> (C2)</td><td>高 vCPU 性能</td><td>ゲーム、HPC</td></tr>
                        <tr><td><strong>Memory Optimized</strong> (M2)</td><td>大量メモリ</td><td>SAP HANA、インメモリ DB</td></tr>
                        <tr><td><strong>Accelerator Optimized</strong> (A2)</td><td>GPU 搭載</td><td>ML トレーニング、推論</td></tr>
                    </tbody>
                </table>
                <p style={{ fontSize: '14px', marginBottom: '10px' }}><strong>セキュアな SSH アクセス管理</strong></p>
                <pre className="codeblock">{`❌ アンチパターン（避けるべき方法）
静的な SSH 公開鍵をメタデータに登録
    → 退職者の鍵が残り続けるリスク
    → 鍵の棚卸しが困難

✅ 推奨: OS Login を使用
OS Login 有効化
    → IAM ポリシーで SSH アクセスを制御
    → ユーザー削除 = 即時アクセス失効
    → 詳細な監査ログが自動記録`}</pre>
                <p style={{ fontSize: '14px', marginBottom: '8px' }}>OS Login の設定:</p>
                <pre className="codeblock">
                    <span className="comment"># プロジェクト全体に OS Login を有効化</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}compute project-info add-metadata \{'\n'}
                    {'  '}<span className="flag">--metadata</span>{' '}enable-oslogin=TRUE{'\n'}
                    {'\n'}
                    <span className="comment"># 本番環境では 2FA も必須に</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}compute project-info add-metadata \{'\n'}
                    {'  '}<span className="flag">--metadata</span>{' '}enable-oslogin-2fa=TRUE
                </pre>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: Compute Engine</div>
                    <ol>
                        <li><strong>OS Login + 2FA</strong> を本番環境で必須化</li>
                        <li><strong>特権サービスアカウントをアタッチした VM への SSH を避ける</strong></li>
                        <li><strong>JIT (Just-In-Time) アクセス</strong> で一時的な権限付与を採用</li>
                        <li>スナップショットは <strong>1時間ごと</strong> に取得（障害復旧の備え）</li>
                    </ol>
                </div>
                <div className="src">
                    <div className="srct">参照リソース</div>
                    <a href="https://docs.cloud.google.com/compute/docs/oslogin/set-up-oslogin" target="_blank" rel="noopener noreferrer">https://docs.cloud.google.com/compute/docs/oslogin/set-up-oslogin</a>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">3.3</span>Spot VM（スポットVM）</div>
                <pre className="codeblock">{`Google のキャパシティに余裕がある時に使える VM
                ↓
通常 VM の最大 91% 割引
                ↓
Google がキャパシティを必要とした時に「プリエンプト（強制停止）」`}</pre>
                <p style={{ fontSize: '14px', marginBottom: '8px' }}>プリエンプトへの備え:</p>
                <pre className="codeblock">
                    <span className="comment"># シャットダウンスクリプトで状態を Cloud Storage に保存</span>{'\n'}
                    {`#!/bin/bash`}{'\n'}
                    <span className="comment"># /etc/google-cloud/metadata/shutdown-scripts</span>{'\n'}
                    <span className="cmd">gsutil</span>{' '}cp /var/app/checkpoint.dat gs://my-bucket/checkpoints/
                </pre>
                <table className="ctable">
                    <thead>
                        <tr><th>設定値</th><th>動作</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><code style={{ color: 'var(--ace-cyan)' }}>STOP</code>（推奨）</td><td>停止後、キャパシティ回復時に再起動。ローカルディスクのデータ保持</td></tr>
                        <tr><td><code style={{ color: 'var(--ace-cyan)' }}>DELETE</code></td><td>VM が削除される。コスト節約を最優先の場合</td></tr>
                    </tbody>
                </table>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: Spot VM</div>
                    <ol>
                        <li><strong>フォールトトレラント（障害耐性）</strong> なアプリケーション設計を前提とする</li>
                        <li><strong>MIG（Managed Instance Group）と組み合わせ</strong>てプリエンプト後に自動再作成</li>
                        <li><strong>チェックポイント機能</strong>を実装し、処理を途中から再開できるようにする</li>
                        <li>終了アクションは <code style={{ color: 'var(--ace-cyan)' }}>STOP</code> に設定してディスクデータを保持する</li>
                    </ol>
                </div>
                <div className="src">
                    <div className="srct">参照リソース</div>
                    <a href="https://docs.cloud.google.com/compute/docs/instances/create-use-spot" target="_blank" rel="noopener noreferrer">https://docs.cloud.google.com/compute/docs/instances/create-use-spot</a>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">3.4</span>Cloud Run（サーバーレスコンテナ）</div>
                <pre className="codeblock">{`コンテナイメージをデプロイするだけ！
    ↓
・インフラ管理不要（ゼロオペレーション）
・ゼロへのスケールダウン（アイドル時コストなし）
・HTTP リクエスト or Eventarc イベントで起動`}</pre>
                <p style={{ fontSize: '14px', marginBottom: '8px' }}>ネットワーク接続: Direct VPC Egress</p>
                <pre className="codeblock">{`Cloud Run → [Direct VPC Egress] → VPC内のリソース
                                    ├── Cloud SQL
                                    ├── Memorystore
                                    └── GCE VM (内部IP)`}</pre>
                <p style={{ fontSize: '14px', marginBottom: '10px' }}>
                    💡 <strong>第1世代 vs 第2世代</strong>: スループットを最大化するには <strong>第2世代の実行環境 + Direct VPC egress</strong> を選択。VPC コネクタより高速です。
                </p>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: Cloud Run</div>
                    <ol>
                        <li><strong>ステートレス</strong>（状態をコンテナ外に保存）なワークロードに使用</li>
                        <li>VPC 内のリソースへのアクセスには <strong>Direct VPC Egress</strong>（第2世代）を使用</li>
                        <li>コールドスタートを最小化するために <strong>最小インスタンス数</strong> を設定</li>
                        <li>シークレットは <strong>Secret Manager</strong> から環境変数として注入</li>
                    </ol>
                </div>
                <div className="src">
                    <div className="srct">参照リソース</div>
                    <a href="https://docs.cloud.google.com/run/docs/configuring/networking-best-practices" target="_blank" rel="noopener noreferrer">https://docs.cloud.google.com/run/docs/configuring/networking-best-practices</a>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">3.5</span>エンタープライズ視点: コンピューティング最適化</div>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    コンピューティングサービスの選択は、ワークロードの性質、必要な制御レベル、およびコスト効率の要件に依存する。
                </p>
                <table className="ctable">
                    <thead>
                        <tr><th>サービス名</th><th>特徴とユースケース</th><th>管理と運用のベストプラクティス</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Compute Engine (GCE)</strong></td>
                            <td>OSレベルの制御が必要なレガシーシステムや特定のライセンスを伴うソフトウェアのホスティングに使用される仮想マシン（VM）。</td>
                            <td>OS Loginを有効にし、IAMポリシーに基づいたきめ細かいLinuxアカウントのライフサイクル管理を実施する。</td>
                        </tr>
                        <tr>
                            <td><strong>Spot VMs</strong></td>
                            <td>通常のVMより最大91%安価に提供されるが、Google側のキャパシティ要件によりいつでもプリエンプト（強制停止）される可能性がある。</td>
                            <td>フォールトトレラント（障害耐性）のあるレンダリングやバッチ処理に最適。マネージドインスタンスグループ（MIG）と組み合わせ、自動的に再作成されるように設計する。</td>
                        </tr>
                        <tr>
                            <td><strong>Cloud Run</strong></td>
                            <td>コンテナ化されたアプリケーションを実行するフルマネージドのサーバーレスプラットフォーム。ゼロへのスケールダウンが可能。</td>
                            <td>HTTPリクエストやEventarcイベントでトリガーされるステートレスなワークロードに使用。VPCリソースへの高速なアクセスにはDirect VPC egressを利用する。</td>
                        </tr>
                    </tbody>
                </table>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    Compute Engineの運用において、VMへのセキュアなアクセスを確立することは最優先事項である。従来の静的なSSHキー管理に代わり、OS Loginを使用することで、IAMポリシーを通じた継続的なアクセス評価が可能になる。本番環境のVMに対しては、OS Loginにおける二要素認証（2FA）を必須とし、メタデータ <code style={{ color: 'var(--ace-cyan)' }}>enable-oslogin-2fa</code> を <code style={{ color: 'var(--ace-cyan)' }}>TRUE</code> に設定することが推奨される。また、永続的な脅威を防ぐため、特権サービスアカウントがアタッチされたVMへのSSHアクセスは避け、JIT（Just-In-Time）アクセスを採用して一時的に権限を付与する運用がベストプラクティスとされる。
                </p>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    Spot VMを利用する場合、アプリケーションはプリエンプションに耐えうる設計でなければならない。停止イベントを適切に処理するために、シャットダウンスクリプトを構成し、Cloud Storageへのチェックポイントの保存やクリーンな終了プロセスを実行する時間を確保する。また、終了アクションを <code style={{ color: 'var(--ace-cyan)' }}>STOP</code> に設定することで、キャパシティが再び利用可能になった際にVMを再起動し、ローカルディスクのデータを保持することが可能になる。
                </p>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">3.6</span>エンタープライズ視点: サーバーレスネットワーキングと Direct VPC Egress</div>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    Cloud Runなどのサーバーレス環境を設計する際、ネットワークトポロジの制約とトラフィックルーティング戦略が重要となる。サーバーレスVPCアクセス（Serverless VPC Access）を通じて、外部IPを持たない内部リソース（Cloud SQLやMemorystoreなど）への安全な接続が提供される。
                </p>
                <p style={{ fontSize: '14px', marginBottom: '0' }}>
                    パフォーマンスとスループットを最大化するためには、第2世代の実行環境を利用し、従来のVPCコネクタを使用する代わりに「Direct VPC egress」を設定してネットワークの送信スループットを高速化することが推奨される。また、大規模なデプロイメントにおいてIPアドレスの枯渇を防ぐため、RFC 1918以外のIPv4アドレスの使用、Cloud NATやPrivate Service Connectの活用、さらにはIPv4とIPv6のデュアルスタックサブネットの導入といった戦略が有効である。
                </p>
            </div>
        </div>
    );
}

/* ── Section 4: コンテナとKubernetes (GKE) ── */
function S4GKE() {
    return (
        <div id="s4" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn4">04</div>
                <div className="sec-head-txt">
                    <h2>コンテナと Kubernetes (GKE)</h2>
                    <p>GKE Autopilot vs Standard、Workload Identity、Binary Authorization、Security Posture Dashboard。</p>
                </div>
                <div className="pct-badge pb4">Domain 2</div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">4.1</span>GKE の2つのモード: Autopilot vs Standard</div>
                <pre className="codeblock">{`             Autopilot モード
┌────────────────────────────────────────┐
│ Google がすべて管理:                    │
│   ・ノードのプロビジョニング            │
│   ・スケーリング                        │
│   ・アップグレード                      │
│   ・セキュリティ制約                    │
│ 課金: Pod が要求する vCPU/Memory 単位   │
└────────────────────────────────────────┘
          ↑ デフォルト推奨

             Standard モード
┌────────────────────────────────────────┐
│ ユーザーがノードプールを直接管理        │
│ 課金: ノード（VM）単位                  │
│ 必要な場面:                             │
│   ・特権コンテナの実行                  │
│   ・カーネルパラメータのチューニング    │
│   ・DaemonSet（ロギング/監視エージェント）│
└────────────────────────────────────────┘`}</pre>
                <table className="ctable">
                    <thead>
                        <tr><th>項目</th><th>Autopilot</th><th>Standard</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>ノード管理</td><td>Google が自動管理</td><td>ユーザーが管理</td></tr>
                        <tr><td>セキュリティ標準</td><td>Baseline 強制</td><td>ユーザー設定</td></tr>
                        <tr><td>特権コンテナ</td><td>❌ 不可</td><td>✅ 可能</td></tr>
                        <tr><td>Workload Identity</td><td>自動有効</td><td>手動設定が必要</td></tr>
                        <tr><td>課金単位</td><td>Pod リソース</td><td>ノード（VM）</td></tr>
                        <tr><td>アイドルコスト</td><td>なし</td><td>あり</td></tr>
                    </tbody>
                </table>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">4.2</span>GKE セキュリティの要点</div>
                <p style={{ fontSize: '14px', marginBottom: '10px' }}><strong>Workload Identity Federation（最重要！）</strong></p>
                <pre className="codeblock">{`❌ アンチパターン: サービスアカウントキーをクラスタ内に保存
Secret として JSON キーを保存
    → キーが漏洩するリスク
    → キーのローテーション管理が複雑

✅ 推奨: Workload Identity を使用
Kubernetes Service Account
    ↓ 紐付け (bind)
Google Cloud IAM Service Account
    ↓
GCP API (Secret Manager, Cloud Storage など) にアクセス`}</pre>
                <p style={{ fontSize: '14px', marginBottom: '8px' }}>設定例:</p>
                <pre className="codeblock">
                    <span className="comment"># KSA と GSA を紐付け</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}iam service-accounts add-iam-policy-binding \{'\n'}
                    {'  '}GSA_NAME@PROJECT_ID.iam.gserviceaccount.com \{'\n'}
                    {'  '}<span className="flag">--role</span>{' '}roles/iam.workloadIdentityUser \{'\n'}
                    {'  '}<span className="flag">--member</span>{' '}{'`'}"serviceAccount:PROJECT_ID.svc.id.goog[NAMESPACE/KSA_NAME]"{'`'}
                </pre>
                <p style={{ fontSize: '14px', marginBottom: '10px' }}><strong>Binary Authorization（コンテナ整合性の保証）</strong></p>
                <pre className="codeblock">{`CI/CD パイプラインで署名
    └── イメージにデジタル署名を付与

GKE デプロイ時に検証
    └── 承認済み署名がないイメージはブロック！`}</pre>
                <p style={{ fontSize: '14px', marginBottom: '10px' }}><strong>Security Posture Dashboard</strong></p>
                <p style={{ fontSize: '14px', marginBottom: '10px' }}>GKE の「セキュリティポスチャダッシュボード」が自動スキャン:</p>
                <ul style={{ fontSize: '14px', paddingLeft: '20px', marginBottom: '14px' }}>
                    <li>Pod 仕様の設定上の懸念事項</li>
                    <li>コンテナイメージの CVE（脆弱性）</li>
                    <li>修正アクションの推奨</li>
                </ul>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: GKE</div>
                    <ol>
                        <li>新規クラスタは <strong>Autopilot モードをデフォルト</strong> で選択</li>
                        <li>Google Cloud API アクセスには必ず <strong>Workload Identity</strong> を使用（静的キー禁止）</li>
                        <li><strong>Binary Authorization</strong> でデプロイ可能なイメージを承認済みのみに制限</li>
                        <li><strong>Security Posture Dashboard</strong> を定期的に確認して脆弱性を解消</li>
                        <li>コンテナイメージは <strong>Artifact Registry</strong> に格納し、脆弱性スキャンを有効化</li>
                    </ol>
                </div>
                <div className="src">
                    <div className="srct">参照リソース</div>
                    <a href="https://docs.cloud.google.com/kubernetes-engine/docs/concepts/autopilot-security" target="_blank" rel="noopener noreferrer">https://docs.cloud.google.com/kubernetes-engine/docs/concepts/autopilot-security</a>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">4.3</span>エンタープライズ視点: GKE アーキテクチャ</div>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    GKEはコンテナ化されたアプリケーションのデプロイを管理するマネージドKubernetesサービスであり、クラスタの動作モードとして「Autopilot」と「Standard」の2つを提供する。
                </p>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    Autopilotモードは、ノードのプロビジョニング、スケーリング、アップグレード、およびセキュリティ制約の管理をすべてGoogleが代行するフルマネージド環境であり、新規クラスタのデフォルトとして推奨される。課金モデルはPodが要求するリソース（vCPU、メモリ、エフェメラルストレージ）に基づいており、アイドル状態のノードに対するコストが発生しないため、負荷変動の激しいワークロードにおいてコスト効率が高い。一方、Standardモードは、ユーザーがノードプールを直接管理するIaaSに近いモデルであり、特権コンテナの実行、特定のカーネルパラメータの調整、高メモリインスタンスの指定、またはロギングや監視用のDaemonSetの実行が必要な場合に選択される。
                </p>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    セキュリティの観点から見ると、AutopilotクラスタはKubernetes Baselineセキュリティ標準をデフォルトで適用し、特権コンテナやホスト名前空間の利用をブロックする。また、Workload Identity Federationが自動的に有効化されており、Podがノードのメタデータサーバーに直接アクセスして機密情報を取得することを防ぐ。アプリケーションがGoogle CloudのAPI（Secret Managerなど）にアクセスする際は、静的なサービスアカウントキーをクラスタ内に保存するのではなく、このWorkload Identityを利用してKubernetesのサービスアカウントとGoogle CloudのIAMサービスアカウントを紐付けることが最も安全なアプローチである。
                </p>
                <p style={{ fontSize: '14px', marginBottom: '0' }}>
                    さらに、GKEのセキュリティ態勢を高めるための機能として、セキュリティポスチャダッシュボード（Security Posture Dashboard）が存在する。この機能は、Podの仕様における構成上の懸念事項や、コンテナイメージ内のワークロードの脆弱性を自動的にスキャンし、影響度の高いセキュリティ情報（CVEリンクや推奨される修正アクション）をプロアクティブに提示する。コンテナイメージの完全性を保証するためには、Binary Authorizationを利用し、事前に承認されたイメージのみがクラスタにデプロイされるようポリシーを強制する設定が求められる。
                </p>
            </div>
        </div>
    );
}

/* ── Section 5: データ・ストレージアーキテクチャ ── */
function S5Storage() {
    return (
        <div id="s5" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn1">05</div>
                <div className="sec-head-txt">
                    <h2>データ・ストレージアーキテクチャ</h2>
                    <p>Cloud Storage の4クラス、OLM、Soft Delete、Signed URL、データベース選定フローチャートと比較表。</p>
                </div>
                <div className="pct-badge pb1">Domain 2</div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">5.1</span>Cloud Storage（オブジェクトストレージ）</div>
                <pre className="codeblock">{`アクセス頻度
   高い ←──────────────────────────→ 低い

Standard → Nearline → Coldline → Archive
 ($)       ($$)       ($$$)      ($$$$)
最安/GB
         ↑             ↑            ↑
      月1回          年4回未満    年1回未満`}</pre>
                <table className="ctable">
                    <thead>
                        <tr><th>クラス</th><th>最小保存期間</th><th>アクセスコスト</th><th>ユースケース</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><strong>Standard</strong></td><td>なし</td><td>無料</td><td>頻繁アクセスデータ、Webコンテンツ</td></tr>
                        <tr><td><strong>Nearline</strong></td><td>30日</td><td>あり</td><td>バックアップ、月次レポート</td></tr>
                        <tr><td><strong>Coldline</strong></td><td>90日</td><td>高め</td><td>災害復旧、四半期データ</td></tr>
                        <tr><td><strong>Archive</strong></td><td>365日</td><td>最高</td><td>法規制保管、年次データ</td></tr>
                    </tbody>
                </table>
                <p style={{ fontSize: '14px', marginBottom: '8px' }}><strong>Object Lifecycle Management (OLM) で自動コスト最適化</strong></p>
                <pre className="codeblock">{`# ライフサイクルポリシーの例
lifecycle:
  rule:
  - action:
      type: SetStorageClass
      storageClass: NEARLINE
    condition:
      age: 30        # 30日経過後 Nearline に移行
  - action:
      type: SetStorageClass
      storageClass: COLDLINE
    condition:
      age: 90        # 90日経過後 Coldline に移行
  - action:
      type: Delete
    condition:
      age: 365       # 365日後に削除`}</pre>
                <p style={{ fontSize: '14px', marginBottom: '10px' }}><strong>バケット名のベストプラクティス</strong></p>
                <div className="wb">⚠️ バケット名はグローバルに一意で、URL として公開されます！</div>
                <table className="ctable">
                    <thead>
                        <tr><th>ルール</th><th>理由</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><strong>個人情報・機密情報を含めない</strong></td><td>バケット名は公開されるため</td></tr>
                        <tr><td><strong>意味のないコードネームやランダムサフィックスを付ける</strong></td><td>第三者による推測防止</td></tr>
                        <tr><td><code style={{ color: 'var(--ace-cyan)' }}>goog</code> で始まる名前は使用不可</td><td>Google 予約済み</td></tr>
                        <tr><td><code style={{ color: 'var(--ace-cyan)' }}>google</code> のスペルミス変形は使用不可</td><td>Google 予約済み</td></tr>
                    </tbody>
                </table>
                <p style={{ fontSize: '14px', marginBottom: '10px' }}><strong>論理削除（Soft Delete）</strong></p>
                <ul style={{ fontSize: '14px', paddingLeft: '20px', marginBottom: '14px' }}>
                    <li>デフォルトで有効（7日間保持）</li>
                    <li>削除後10分以内は同名バケットを再作成できない仕様に注意</li>
                </ul>
                <p style={{ fontSize: '14px', marginBottom: '8px' }}><strong>署名付きURL（Signed URLs）</strong></p>
                <pre className="codeblock">
                    <span className="comment"># Google アカウントなしでも一時的アクセスを提供</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}storage sign-url gs://BUCKET/OBJECT \{'\n'}
                    {'  '}<span className="flag">--duration=</span>1h \{'\n'}
                    {'  '}<span className="flag">--private-key-file=</span>KEY_FILE
                </pre>
                <ul style={{ fontSize: '14px', paddingLeft: '20px', marginBottom: '14px' }}>
                    <li>有効期間は最大 <strong>7日間</strong></li>
                    <li>X-Goog-Algorithm、X-Goog-Expires などの情報が URL に含まれる</li>
                </ul>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: Cloud Storage</div>
                    <ol>
                        <li><strong>OLM を必ず設定</strong> してストレージクラスを自動移行</li>
                        <li>バケット名に <strong>PII（個人識別情報）を含めない</strong></li>
                        <li>一時アクセスは <strong>署名付きURL</strong> を使用（IAM ロール付与は避ける）</li>
                        <li>規制データには <strong>Bucket Lock / Object Retention Lock</strong> を設定</li>
                        <li>バージョニングを有効化して誤上書きを防止</li>
                    </ol>
                </div>
                <div className="src">
                    <div className="srct">参照リソース</div>
                    <a href="https://docs.cloud.google.com/storage/docs/best-practices" target="_blank" rel="noopener noreferrer">https://docs.cloud.google.com/storage/docs/best-practices</a>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">5.2</span>データベースサービス選定ガイド</div>
                <pre className="codeblock">{`データは構造化？
├── YES → SQL が必要？
│         ├── YES → グローバル分散が必要？
│         │         ├── YES → Cloud Spanner（99.999% SLA）
│         │         └── NO  → 高性能 PostgreSQL？
│         │                   ├── YES → AlloyDB
│         │                   └── NO  → Cloud SQL
│         └── NO  → NoSQL
│                   ├── 大規模時系列・IoTデータ → Cloud Bigtable
│                   └── モバイル/リアルタイム同期 → Firestore
└── NO → 非構造化 → Cloud Storage（オブジェクト）`}</pre>
                <table className="ctable">
                    <thead>
                        <tr><th>サービス</th><th>種別</th><th>特徴</th><th>ユースケース</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><strong>Cloud SQL</strong></td><td>リレーショナル</td><td>MySQL / PostgreSQL / SQL Server のマネージドサービス</td><td>Web アプリ、ERP、EC サイト</td></tr>
                        <tr><td><strong>Cloud Spanner</strong></td><td>リレーショナル</td><td>グローバル分散、水平スケール、99.999% SLA</td><td>グローバル金融、在庫管理</td></tr>
                        <tr><td><strong>AlloyDB</strong></td><td>リレーショナル</td><td>PostgreSQL 互換、標準比4倍の性能、ML 最適化</td><td>高性能 OLTP、分析混在</td></tr>
                        <tr><td><strong>Firestore</strong></td><td>NoSQL（ドキュメント）</td><td>サーバーレス、リアルタイム同期、強整合性</td><td>モバイルアプリ、IoT バックエンド</td></tr>
                        <tr><td><strong>Cloud Bigtable</strong></td><td>NoSQL（ワイドカラム）</td><td>ミリ秒レイテンシ、ペタバイトスケール、HBase互換</td><td>時系列データ、ML フィーチャーストア</td></tr>
                        <tr><td><strong>Memorystore</strong></td><td>インメモリ</td><td>Redis / Memcached マネージドサービス</td><td>キャッシュ、セッション、リーダーボード</td></tr>
                        <tr><td><strong>BigQuery</strong></td><td>データウェアハウス</td><td>サーバーレス分析、SQL で ML モデル作成</td><td>BI、大規模データ分析</td></tr>
                        <tr><td><strong>Bare Metal Solution</strong></td><td>専用ハードウェア</td><td>低レイテンシ専用ハード</td><td>Oracle のリフト&amp;シフト</td></tr>
                    </tbody>
                </table>
                <pre className="codeblock">{`試験頻出: Cloud SQL vs Cloud Spanner vs AlloyDB

Cloud SQL:      小〜中規模、シングルリージョン、標準的なRDB
    ↓ スケールが足りなくなったら
Cloud Spanner:  グローバル、水平スケール、99.999% SLA が必要
AlloyDB:        PostgreSQL 互換を維持したまま性能を4倍に上げたい`}</pre>
                <div className="src">
                    <div className="srct">参照リソース</div>
                    <a href="https://cloud.google.com/blog/topics/developers-practitioners/your-google-cloud-database-options-explained" target="_blank" rel="noopener noreferrer">https://cloud.google.com/blog/topics/developers-practitioners/your-google-cloud-database-options-explained</a>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">5.3</span>エンタープライズ視点: データストレージ設計</div>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    データの性質とアクセスパターンに応じて、最適なストレージクラスやデータベースソリューションを選択することが、システムの性能とコストに直結する。
                </p>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    Cloud Storageは非構造化データの保存に使用され、アクセス頻度に応じて4つのストレージクラス（Standard、Nearline、Coldline、Archive）を使い分ける。コストを最適化するためには、オブジェクトの年齢や新しいバージョンかどうかに基づいて、自動的により低コストなストレージクラスへ移行させるか、削除を行うObject Lifecycle Management (OLM) を設定することが不可欠である。
                </p>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    セキュリティの観点からは、バケット名やオブジェクト名に関する厳格なベストプラクティスが存在する。バケット名は全ユーザー間でグローバルに一意である必要があり、URLとして公開される性質を持つため、個人情報や機密情報を含めてはならない。第三者による推測を防ぐため、意味を持たないコードネームやランダムなサフィックスを付与することが推奨される。
                </p>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    誤削除からの復元を担保する「論理削除（Soft Delete）」機能は、デフォルトで有効化されており、削除されたオブジェクトを7日間保持する。特定のユーザーに一時的なアクセスを許可する場合は、リソースに直接アクセスするための署名付きURL（Signed URLs）を生成する。このURLには、使用されるアルゴリズム（X-Goog-Algorithm）や有効期限（X-Goog-Expires、最大7日間）が含まれ、Googleアカウントを持たないユーザーとのセキュアなデータ共有を可能にする。
                </p>
                <table className="ctable">
                    <thead>
                        <tr><th>データベースタイプ</th><th>サービス名</th><th>アーキテクチャと最適なユースケース</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>リレーショナル (SQL)</td><td><strong>Cloud SQL</strong></td><td>MySQL、PostgreSQL、SQL Serverのフルマネージドサービス。標準的なWebフレームワーク、ERP、Eコマースなど、厳格なACID特性とスキーマを必要とするワークロードに最適。</td></tr>
                        <tr><td>リレーショナル (SQL)</td><td><strong>Cloud Spanner</strong></td><td>リレーショナル構造とNoSQLの水平スケーラビリティを兼ね備えたグローバル分散データベース。99.999%の可用性を持ち、グローバルな金融システムやインベントリ管理に使用される。</td></tr>
                        <tr><td>リレーショナル (SQL)</td><td><strong>AlloyDB</strong></td><td>PostgreSQL互換の高性能データベース。標準的なPostgreSQLの4倍のトランザクション性能を持ち、機械学習を活用した最適化を提供する。</td></tr>
                        <tr><td>非リレーショナル (NoSQL)</td><td><strong>Firestore</strong></td><td>サーバーレスのドキュメント指向データベース。モバイルアプリケーションやIoTのバックエンドにおいて、強力な一貫性とリアルタイム同期を提供する。</td></tr>
                        <tr><td>非リレーショナル (NoSQL)</td><td><strong>Cloud Bigtable</strong></td><td>ワイドカラム型データベース。ミリ秒未満のレイテンシで数十億行、ペタバイト規模のデータを処理可能。時系列データや機械学習の分析に最適。</td></tr>
                        <tr><td>インメモリ</td><td><strong>Memorystore</strong></td><td>RedisおよびMemcachedのマネージドサービス。マイクロ秒レベルの応答が求められるキャッシング、リーダーボード、セッション管理に使用される。</td></tr>
                    </tbody>
                </table>
                <p style={{ fontSize: '14px', marginBottom: '0' }}>
                    データウェアハウスの用途や、SQLを用いた機械学習モデルの構築にはBigQueryが最適であり、既存のOracleデータベースをリフト＆シフトでクラウドに移行する場合は、低遅延のハードウェアを提供するBare Metal Solutionが選択肢となる。
                </p>
            </div>
        </div>
    );
}

/* ── Section 6: ネットワークとロードバランシング ── */
function S6Network() {
    return (
        <div id="s6" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn2">06</div>
                <div className="sec-head-txt">
                    <h2>ネットワークとロードバランシング</h2>
                    <p>Google Cloud VPC のグローバル特性、Shared VPC、VPC Peering、Cloud NAT、Cloud DNS、ロードバランサ選定。</p>
                </div>
                <div className="pct-badge pb2">Domain 2</div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">6.1</span>VPC（Virtual Private Cloud）の基本</div>
                <pre className="codeblock">{`通常のクラウド（他社）:
  リージョンごとに別々の VPC が必要
                ↓
Google Cloud VPC:
  1つの VPC がグローバルに広がる！
  東京・米国・欧州のサブネットを1つの VPC で管理可能`}</pre>
                <p style={{ fontSize: '14px', marginBottom: '10px' }}><strong>Shared VPC（共有VPC）</strong> — 大規模組織での推奨構成</p>
                <pre className="codeblock">{`ホストプロジェクト（ネットワーク管理）
    ├── サブネット A（開発チーム用）
    │       ↑ ネットワーク使用権限付与
    │   サービスプロジェクト 1（開発チーム）
    │       └── VM, Cloud Run など
    │
    └── サブネット B（本番チーム用）
            ↑ ネットワーク使用権限付与
        サービスプロジェクト 2（本番チーム）
            └── VM, GKE など`}</pre>
                <p style={{ fontSize: '14px', marginBottom: '10px' }}><strong>メリット</strong>:</p>
                <ul style={{ fontSize: '14px', paddingLeft: '20px', marginBottom: '14px' }}>
                    <li>ネットワーク管理と開発を <strong>職務分掌</strong>（最小特権の原則）</li>
                    <li>セキュリティポリシーを集中管理</li>
                    <li>サービスプロジェクトは独自のコスト管理が可能</li>
                </ul>
                <div className="src">
                    <div className="srct">参照リソース</div>
                    <a href="https://docs.cloud.google.com/vpc/docs/shared-vpc" target="_blank" rel="noopener noreferrer">https://docs.cloud.google.com/vpc/docs/shared-vpc</a>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">6.2</span>VPC ネットワーキングパターン</div>
                <p style={{ fontSize: '14px', marginBottom: '8px' }}><strong>VPC Network Peering</strong></p>
                <pre className="codeblock">{`VPC A ──── Peering ──── VPC B
                         │
                       Peering
                         │
                        VPC C

⚠️ 注意: A → B, B → C でも A → C は通信できない！
         （Peering は推移的でない）`}</pre>
                <p style={{ fontSize: '14px', marginBottom: '8px' }}><strong>Cloud NAT（プライベートインスタンスのインターネット接続）</strong></p>
                <pre className="codeblock">{`プライベート VM（外部 IP なし）
    ↓
Cloud NAT（送信元 IP を変換）
    ↓
インターネット`}</pre>
                <p style={{ fontSize: '14px', marginBottom: '8px' }}>ポート枯渇の監視（Cloud Monitoring MQL クエリ）:</p>
                <pre className="codeblock">{`fetch nat_gateway
| metric 'compute.googleapis.com/nat/port_usage'
| align mean_aligner()
| every 1m`}</pre>
                <p style={{ fontSize: '14px', marginBottom: '10px' }}><strong>Cloud DNS ベストプラクティス</strong></p>
                <table className="ctable">
                    <thead>
                        <tr><th>シナリオ</th><th>設定方法</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>オンプレミス → Cloud DNS のプライベートゾーンを解決</td><td><strong>インバウンドサーバーポリシー</strong> を設定</td></tr>
                        <tr><td>Google Cloud → オンプレミスの DNS を解決</td><td><strong>転送ゾーン（Forwarding Zone）</strong> を設定</td></tr>
                    </tbody>
                </table>
                <div className="src">
                    <div className="srct">参照リソース</div>
                    <a href="https://docs.cloud.google.com/dns/docs/best-practices" target="_blank" rel="noopener noreferrer">https://docs.cloud.google.com/dns/docs/best-practices</a>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">6.3</span>ロードバランサの選定</div>
                <pre className="codeblock">{`対象トラフィックは HTTP/HTTPS？
├── YES → Application Load Balancer (L7)
│         ├── グローバル配信が必要 → Global External ALB（Premium Tier）
│         └── リージョン内のみ → Regional ALB
│
└── NO → Network Load Balancer (L4)
          ├── SSL オフロードが必要 → Proxy Network LB
          └── 送信元 IP を保持したい → Passthrough Network LB`}</pre>
                <table className="ctable">
                    <thead>
                        <tr><th>ロードバランサ</th><th>レイヤ</th><th>特徴</th><th>送信元 IP 保持</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><strong>Global External ALB</strong></td><td>L7</td><td>Premium Tier でグローバル分散</td><td>❌（X-Forwarded-For ヘッダ参照）</td></tr>
                        <tr><td><strong>Regional External ALB</strong></td><td>L7</td><td>特定リージョン内に限定</td><td>❌</td></tr>
                        <tr><td><strong>Proxy Network LB</strong></td><td>L4</td><td>TCP プロキシ、SSL オフロード対応</td><td>❌</td></tr>
                        <tr><td><strong>Passthrough Network LB</strong></td><td>L4</td><td>TCP/UDP/ESP/GRE/ICMP</td><td>✅（そのまま転送）</td></tr>
                    </tbody>
                </table>
                <div className="wb">
                    ⚠️ <strong>試験頻出: コンプライアンス要件がある場合</strong><br />
                    管轄区域の規制で <strong>データを特定リージョン内に留める必要がある場合</strong>は、必ず「リージョナル」ロードバランサを選択！グローバルスコープでは不可。
                </div>
                <div className="src">
                    <div className="srct">参照リソース</div>
                    <a href="https://docs.cloud.google.com/load-balancing/docs/choosing-load-balancer" target="_blank" rel="noopener noreferrer">https://docs.cloud.google.com/load-balancing/docs/choosing-load-balancer</a>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">6.4</span>エンタープライズ視点: ネットワークトポロジ</div>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    Google CloudのVirtual Private Cloud (VPC) は、単一のVPCがグローバルに広がり、すべてのリージョンにまたがってサブネットを配置できるという独自の特徴を持つ。このアーキテクチャにより、マルチリージョン展開におけるネットワークの複雑さが大幅に軽減される。
                </p>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    大規模組織においては、<strong>Shared VPC（共有VPC）</strong> の導入がベストプラクティスである。Shared VPCは、1つのホストプロジェクト内でネットワークリソース（サブネット、ルート、ファイアウォール）を集中管理し、複数のサービスプロジェクトに属するリソースが共通のVPCネットワークを使用してセキュアに通信できるようにする機能である。これにより、ネットワーク管理タスクとインスタンス作成タスクの職務分掌（最小特権の原則）を徹底でき、例えば「Network User」ロールをサブネットレベルで特定のグループに付与することで、厳密なアクセス制御が実現する。
                </p>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    VPC間の接続には、<strong>VPC Network Peering</strong>が一般的に使用される。これはGoogleのSDNを通じて2つのVPCを内部IPで高速に接続する手法であるが、重要な制約として「推移的（Transitive）ではない」点が挙げられる。VPC AがVPC Bとピアリングし、VPC BがVPC Cとピアリングしていても、AとCは直接通信できない。また、ピアリングするVPC間でIPアドレスの範囲が重複している場合、接続は確立できない。より複雑なトポロジやオンプレミスとの接続が必要な場合は、Cloud VPNやCloud Interconnectを利用し、動的ルーティング（BGP）によってネットワークの到達性をグローバルまたはリージョナルに管理する。
                </p>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    外部へのアウトバウンドトラフィックを制御し、プライベートIPしか持たないインスタンス群からインターネットへの安全なアクセスを提供するためには、<strong>Cloud NAT</strong>を使用する。Cloud NATの運用においては、各VMに割り当てられるポートの枯渇を防ぐことが重要であり、Cloud MonitoringとMQLクエリ（<code style={{ color: 'var(--ace-cyan)' }}>compute.googleapis.com/nat/port_usage</code>）を活用してポートの利用状況を継続的に監視する運用が不可欠である。
                </p>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    オンプレミスネットワークとGoogle Cloud間でのシームレスな名前解決を実現するためには、<strong>Cloud DNS</strong>のベストプラクティスを適用する。オンプレミス環境からCloud DNSのプライベートゾーンを解決するためには、インバウンドのサーバーポリシーを設定し、逆にGoogle CloudからオンプレミスのDNSを解決するためには、転送ゾーン（Forwarding zones）を使用してトラフィックをルーティングする。
                </p>
                <table className="ctable">
                    <thead>
                        <tr><th>トラフィック層</th><th>ロードバランサの種類</th><th>アーキテクチャと最適なユースケース</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>レイヤ7 (L7)</td>
                            <td><strong>Application Load Balancer</strong></td>
                            <td>HTTP/HTTPSトラフィックを処理し、高度なルーティングやSSL終端を提供する。グローバル外部ALBはPremium Tierを使用して世界中に分散されたバックエンドへトラフィックをルーティングし、レイテンシを最小化する。</td>
                        </tr>
                        <tr>
                            <td>レイヤ4 (L4)</td>
                            <td><strong>Proxy Network Load Balancer</strong></td>
                            <td>TCPトラフィックをプロキシとして処理し、SSLオフロードをサポートする。クライアントとの接続を終端してからバックエンドへ新しい接続を確立するため、デフォルトではクライアントIPは保持されない。</td>
                        </tr>
                        <tr>
                            <td>レイヤ4 (L4)</td>
                            <td><strong>Passthrough Network Load Balancer</strong></td>
                            <td>TCP、UDP、ESP、GRE、ICMPなどのプロトコルを処理する。クライアントの接続を終端せず、パケットの送信元IPなどの情報をそのままバックエンドVMへ転送する（ダイレクトサーバーリターン）。</td>
                        </tr>
                    </tbody>
                </table>
                <p style={{ fontSize: '14px', marginBottom: '0' }}>
                    管轄区域のコンプライアンス要件により、トラフィックを特定のリージョン内に留める必要がある場合や、TLSの終端を厳密に特定の地域で行う必要がある場合は、グローバルスコープではなく、必ず「リージョナル」ロードバランサを選択しなければならない。
                </p>
            </div>
        </div>
    );
}

/* ── Section 7: Infrastructure as Code (Terraform) ── */
function S7Terraform() {
    return (
        <div id="s7" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn3">07</div>
                <div className="sec-head-txt">
                    <h2>Infrastructure as Code (Terraform)</h2>
                    <p>State ファイル管理、リモートバックエンド、CI/CD 統合、GitOps、キーレス認証。</p>
                </div>
                <div className="pct-badge pb3">Domain 2</div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">7.1</span>Terraform の基本概念</div>
                <table className="ctable">
                    <thead>
                        <tr><th>用語</th><th>説明</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><strong>State ファイル</strong> (<code style={{ color: 'var(--ace-cyan)' }}>terraform.tfstate</code>)</td><td>Terraform コードと実際の GCP リソースのマッピング情報</td></tr>
                        <tr><td><strong>Plan</strong> (<code style={{ color: 'var(--ace-cyan)' }}>terraform plan</code>)</td><td>適用前に変更内容を確認するコマンド</td></tr>
                        <tr><td><strong>Apply</strong> (<code style={{ color: 'var(--ace-cyan)' }}>terraform apply</code>)</td><td>実際にインフラを変更するコマンド</td></tr>
                        <tr><td><strong>Backend</strong></td><td>State ファイルの保存場所（ローカル or リモート）</td></tr>
                    </tbody>
                </table>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">7.2</span>State ファイルの管理</div>
                <pre className="codeblock">{`❌ アンチパターン: State をローカルに保存
問題点:
・チームメンバー全員が別々の State を持つ
・並行作業で State が競合する（State Corruption）
・State の紛失リスク`}</pre>
                <p style={{ fontSize: '14px', marginBottom: '8px' }}>✅ 推奨: Cloud Storage リモートバックエンド</p>
                <pre className="codeblock">{`# backend.tf
terraform {
  backend "gcs" {
    bucket  = "my-terraform-state-bucket"
    prefix  = "terraform/state"
  }
}`}</pre>
                <p style={{ fontSize: '14px', marginBottom: '10px' }}>Cloud Storage バケットの設定:</p>
                <ul style={{ fontSize: '14px', paddingLeft: '20px', marginBottom: '14px' }}>
                    <li><strong>オブジェクトバージョニング</strong> を有効化（State の変更履歴を保存）</li>
                    <li><strong>State ロック</strong> を有効化（並行作業による競合を防止）</li>
                </ul>
                <div className="wb">
                    ⚠️ <strong>絶対禁止</strong>: <code style={{ color: 'var(--ace-cyan)' }}>terraform.tfstate</code> ファイルを <strong>手動で直接編集しない</strong>！設定の破損を招きます。
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">7.3</span>Terraform の運用フロー</div>
                <pre className="codeblock">{`標準的なデプロイフロー:

1. コードを変更
   └── git commit & push

2. プランファイルを生成・確認
   └── terraform plan -out=tfplan
   └── プランファイルの内容をレビュー

3. 承認後に適用
   └── terraform apply tfplan

※ プランファイルは実行環境に依存するため、
   環境間を移動する際は注意が必要`}</pre>
                <p style={{ fontSize: '14px', marginBottom: '8px' }}><strong>既存リソースの Import</strong></p>
                <p style={{ fontSize: '14px', marginBottom: '8px' }}>従来の方法（Terraform {'<'} 1.5）:</p>
                <pre className="codeblock">
                    <span className="cmd">terraform</span>{' '}import google_compute_instance.vm_instance \{'\n'}
                    {'  '}projects/PROJECT/zones/ZONE/instances/VM_NAME
                </pre>
                <p style={{ fontSize: '14px', marginBottom: '8px' }}>モダンな方法（Terraform {'>='} 1.5）:</p>
                <pre className="codeblock">{`# main.tf に import ブロックを追加
import {
  to = google_compute_instance.vm_instance
  id = "projects/PROJECT/zones/ZONE/instances/VM_NAME"
}`}</pre>
                <p style={{ fontSize: '14px', marginBottom: '0' }}>
                    → <code style={{ color: 'var(--ace-cyan)' }}>terraform plan</code> と <code style={{ color: 'var(--ace-cyan)' }}>terraform apply</code> を一連のパイプラインに統合できる。
                </p>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">7.4</span>CI/CD パイプラインとの統合（GitOps）</div>
                <pre className="codeblock">{`リポジトリ構造:
environments/
    ├── dev/         ← dev ブランチへの merge で自動 apply
    │   ├── main.tf
    │   └── variables.tf
    └── prod/        ← main ブランチへの merge で自動 apply
        ├── main.tf
        └── variables.tf`}</pre>
                <p style={{ fontSize: '14px', marginBottom: '10px' }}><strong>認証のベストプラクティス（キーレス認証）</strong></p>
                <pre className="codeblock">{`❌ アンチパターン:
# Cloud Build にサービスアカウント JSON キーを渡す
env:
  - GOOGLE_CREDENTIALS=${'$'}{{ secrets.SA_KEY }}  # 危険！

✅ 推奨:
Cloud Build のサービスアカウント
    ↓ Workload Identity Federation / ADC を使用
権限借用（Impersonation）で一時クレデンシャルを取得
    ↓
Terraform apply を実行`}</pre>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: Terraform</div>
                    <ol>
                        <li>State ファイルは必ず <strong>Cloud Storage のリモートバックエンド</strong> に保存</li>
                        <li>適用前に必ず <strong><code style={{ color: 'var(--ace-cyan)' }}>terraform plan</code> で変更内容を確認</strong></li>
                        <li>CI/CD 認証には <strong>JSON キーを使わず ADC/Workload Identity</strong> を使用</li>
                        <li>環境（dev/staging/prod）は <strong>別ディレクトリ or ワークスペース</strong> で管理</li>
                        <li>Terraform コードは <strong>Git リポジトリ</strong> で管理し、PR レビューを必須化</li>
                    </ol>
                </div>
                <div className="src">
                    <div className="srct">参照リソース</div>
                    <a href="https://docs.cloud.google.com/docs/terraform/best-practices/operations" target="_blank" rel="noopener noreferrer">https://docs.cloud.google.com/docs/terraform/best-practices/operations</a>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">7.5</span>エンタープライズ視点: IaC ベストプラクティス</div>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    インフラストラクチャの一貫性と再現性を担保するため、Terraformを利用したIaCのプラクティスがACE試験で問われる。
                </p>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    Terraformの運用において最も重要な概念は、状態（State）ファイルの管理である。<code style={{ color: 'var(--ace-cyan)' }}>terraform.tfstate</code> ファイルは、Terraformの構成コードと実際のGoogle Cloudリソースのマッピングを維持する重要なファイルであり、このファイルを手動で直接変更することは構成の破損を招くため固く禁じられている。チームでの並行作業による競合を防ぐため、状態ファイルはローカルに保存するのではなく、Cloud Storageバケットをリモートバックエンドとして構成し、オブジェクトバージョニングと状態ロックを有効にして管理することがベストプラクティスである。
                </p>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    構成変更のデプロイプロセスにおいては、適用前に必ず <code style={{ color: 'var(--ace-cyan)' }}>terraform plan</code> コマンドを実行し、出力されたプランファイル（例: <code style={{ color: 'var(--ace-cyan)' }}>terraform plan -out=tfplan</code>）をレビューする手順を遵守する。この保存されたプランファイルは、実行環境のアーキテクチャや絶対パスに依存するため、実行環境間での移動には注意が必要である。また、コンソールから手動で作成された既存のリソースをTerraformの管理下に取り込む場合、従来は <code style={{ color: 'var(--ace-cyan)' }}>terraform import</code> コマンドを使用していたが、Terraform バージョン 1.5 以降では構成コード内に <code style={{ color: 'var(--ace-cyan)' }}>import</code> ブロックを記述することで、プランと適用を一連のパイプラインに統合するモダンなアプローチが可能となっている。
                </p>
                <p style={{ fontSize: '14px', marginBottom: '0' }}>
                    CI/CDの統合においては、Cloud Buildなどのマネージドサービスを使用し、GitOpsのメソドロジーを採用することが推奨される。例えば、リポジトリ内の <code style={{ color: 'var(--ace-cyan)' }}>environments/dev</code> や <code style={{ color: 'var(--ace-cyan)' }}>environments/prod</code> ディレクトリを使用して環境を論理的に分離し、ブランチへのマージをトリガーとして自動的に <code style={{ color: 'var(--ace-cyan)' }}>terraform apply</code> が実行されるパイプラインを構築する。この際、パイプラインの実行にはサービスアカウントのJSONキーを使用するのではなく、クラウドプロバイダー固有の権限借用メカニズムやApplication Default Credentials (ADC) を活用してセキュアに認証を行う。
                </p>
            </div>
        </div>
    );
}

/* ── Section 8: オペレーション・モニタリング・ロギング ── */
function S8Operations() {
    return (
        <div id="s8" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn4">08</div>
                <div className="sec-head-txt">
                    <h2>オペレーション・モニタリング・ロギング</h2>
                    <p>Ops Agent、SLO 定義、監査ログ3種類、Log Router、BigQuery エクスポート、スナップショット管理。</p>
                </div>
                <div className="pct-badge pb4">≈27%</div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">8.1</span>モニタリング（Cloud Monitoring）</div>
                <p style={{ fontSize: '14px', marginBottom: '8px' }}><strong>Ops Agent の役割</strong></p>
                <pre className="codeblock">{`Compute Engine VM
    └── Ops Agent をインストール
            ├── Fluent Bit（ログ収集）
            │     └── アプリログ、システムログ → Cloud Logging
            └── OpenTelemetry Collector（メトリクス収集）
                  └── メモリ使用量、ディスク I/O → Cloud Monitoring`}</pre>
                <div className="wb">
                    💡 <strong>注意</strong>: デフォルトの GCE エージェントは CPU / ネットワークのみ。<strong>メモリ使用量</strong> を取得するには <strong>Ops Agent が必須</strong>！
                </div>
                <p style={{ fontSize: '14px', marginBottom: '8px' }}><strong>Kubernetes / GKE のモニタリング</strong></p>
                <pre className="codeblock">{`GKE クラスタ
    └── Google Cloud Managed Service for Prometheus
            ↓
        オープンソース Prometheus と互換性あり
        運用オーバーヘッドなし（マネージド）
            ↓
        Cloud Monitoring でクエリ・アラート設定`}</pre>
                <p style={{ fontSize: '14px', marginBottom: '8px' }}><strong>SLO（サービスレベル目標）の設定</strong></p>
                <pre className="codeblock">{`SLI（指標）の定義:
  例: 「99.9% のリクエストが 200ms 以内に応答する」

SLO の設定:
  Cloud Monitoring → SLO 作成
      ↓
  SLO 違反時にアラート発報
      ↓
  PagerDuty / Slack へ通知`}</pre>
                <p style={{ fontSize: '14px', marginBottom: '0' }}>
                    💡 単純な「CPU 使用率 {'>'} 80%」アラートより、<strong>ユーザー体験に直結する SLO 監視</strong>を推奨。
                </p>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">8.2</span>ロギング（Cloud Logging）</div>
                <p style={{ fontSize: '14px', marginBottom: '10px' }}><strong>監査ログ（Audit Logs）の種類</strong></p>
                <table className="ctable">
                    <thead>
                        <tr><th>ログ種別</th><th>内容</th><th>デフォルト有効</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><strong>管理アクティビティ</strong></td><td>リソースの作成・削除・設定変更</td><td>✅ 常に有効</td></tr>
                        <tr><td><strong>データアクセス</strong></td><td>データの読み書き（BigQuery, Cloud Storage 等）</td><td>❌ 手動有効化</td></tr>
                        <tr><td><strong>システムイベント</strong></td><td>Google によるシステム動作（VM マイグレーションなど）</td><td>✅ 常に有効</td></tr>
                    </tbody>
                </table>
                <div className="wb">⚠️ <strong>GKE の監査ログは無効化できません</strong>（セキュリティ上の理由）</div>
                <p style={{ fontSize: '14px', marginBottom: '8px' }}><strong>ログのルーティング戦略</strong></p>
                <pre className="codeblock">{`Cloud Logging（Log Router）
    ├── Cloud Logging バケット（デフォルト: 30日保持）
    │
    ├── BigQuery（長期保存 + SQL 分析）
    │     └── 法規制対応、セキュリティ監査
    │
    ├── Cloud Storage（低コスト長期保管）
    │     └── コンプライアンス保管
    │
    └── Pub/Sub（リアルタイム処理）
          └── SIEM へのストリーミング`}</pre>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: ロギング</div>
                    <ol>
                        <li>監査ログは <strong>BigQuery にエクスポート</strong> して SQL で分析・監査</li>
                        <li><strong>データアクセスログ</strong> は機密データを扱う API で有効化</li>
                        <li>GKE ノードで <strong>Linux auditd ログ</strong> を有効化（セキュリティ調査用）</li>
                        <li>ログの <strong>保持期間とエクスポート先</strong> を事前に設計しコスト最適化</li>
                    </ol>
                </div>
                <div className="src">
                    <div className="srct">参照リソース</div>
                    <a href="https://cloud.google.com/blog/products/devops-sre/cloud-logging-cost-management-best-practices" target="_blank" rel="noopener noreferrer">https://cloud.google.com/blog/products/devops-sre/cloud-logging-cost-management-best-practices</a>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">8.3</span>スナップショット管理</div>
                <table className="ctable">
                    <thead>
                        <tr><th>種類</th><th>方法</th><th>整合性レベル</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><strong>クラッシュ整合性</strong></td><td>アプリ停止なしで取得</td><td>OS 再起動後の整合性</td></tr>
                        <tr><td><strong>アプリケーション整合性</strong></td><td>データをフラッシュしてから取得</td><td>完全な整合性</td></tr>
                    </tbody>
                </table>
                <p style={{ fontSize: '14px', marginBottom: '8px' }}>Linux でのスナップショット高速化:</p>
                <pre className="codeblock">
                    <span className="comment"># スナップショット前に未使用ブロックをフラッシュ</span>{'\n'}
                    sudo fstrim -v /{'\n'}
                    {'\n'}
                    <span className="comment"># または、マウント時に discard オプションを付与</span>{'\n'}
                    <span className="comment"># /etc/fstab:</span>{'\n'}
                    <span className="comment"># /dev/sdb /data ext4 defaults,discard 0 0</span>
                </pre>
                <p style={{ fontSize: '14px', marginBottom: '10px' }}>
                    → スナップショットのサイズが小さくなり、取得が高速化されます。
                </p>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: スナップショット</div>
                    <ol>
                        <li>本番環境では <strong>1時間ごと</strong> にスナップショットを取得（スナップショットスケジュール使用）</li>
                        <li>アプリケーション整合性が必要な場合は <strong>停止前にデータをフラッシュ</strong></li>
                        <li><code style={{ color: 'var(--ace-cyan)' }}>fstrim</code> または <code style={{ color: 'var(--ace-cyan)' }}>discard</code> オプションでスナップショットを最適化</li>
                    </ol>
                </div>
                <div className="src">
                    <div className="srct">参照リソース</div>
                    <a href="https://docs.cloud.google.com/compute/docs/disks/snapshot-best-practices" target="_blank" rel="noopener noreferrer">https://docs.cloud.google.com/compute/docs/disks/snapshot-best-practices</a>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">8.4</span>エンタープライズ視点: オブザーバビリティ設計</div>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    Compute Engineの永続ディスクのバックアップとして、スナップショットを定期的に取得する運用が推奨される（ベストプラクティスとしては1時間に1回）。スナップショットの取得プロセスにおいて、アプリケーションを停止せずに取得するクラッシュ整合性（Crash Consistent）スナップショットと、未書き込みのデータをフラッシュしてから取得するアプリケーション整合性（Application Consistent）スナップショットの違いを理解することが重要である。Linux環境では、スナップショットのサイズを最小化し作成を高速化するために、作成前に <code style={{ color: 'var(--ace-cyan)' }}>fstrim</code> コマンドを実行するか、<code style={{ color: 'var(--ace-cyan)' }}>discard</code> オプションを付けてマウントする手法が推奨される。
                </p>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    Cloud Storageに保存された重要なデータの保護においては、誤削除からの回復を提供する「論理削除」機能に加え、規制遵守要件を満たすための保持ロック機能が存在する。特定のバケット内のすべてのオブジェクトに対して必須の保持期間を強制するバケットロック（Bucket Lock）や、オブジェクト単位で特定の期限まで削除・上書きを禁止するオブジェクト保持ロック（Object Retention Lock）を活用することで、強力なデータガバナンスが実現する。
                </p>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    システムの健全性を可視化するためには、Cloud MonitoringとCloud Loggingを連携させた統合的なアプローチが必要である。VM内の詳細なシステムメトリクス（メモリ使用量など）やサードパーティアプリケーションのログを収集するためには、Compute EngineインスタンスにOps Agentをデプロイする。Ops Agentは、ログ収集にFluent Bitを、メトリクス収集にOpenTelemetry Collectorを利用する統合エージェントである。Kubernetes環境におけるメトリクス収集においては、オープンソース標準との互換性を保ちながら運用オーバーヘッドを削減するために、Google Cloud Managed Service for Prometheusを利用することがベストプラクティスとされる。
                </p>
                <p style={{ fontSize: '14px', marginBottom: '0' }}>
                    Cloud Loggingは、アプリケーションのログやインフラストラクチャのログを一元的に収集する。特に重要なのが、システムへのアクセス履歴や設定変更の履歴を記録する監査ログ（Audit Logs）である。監査ログには、「管理アクティビティ（リソースの構成変更）」、「データアクセス（データの読み書き）」、「システムイベント（システムの動作）」の3種類が含まれ、セキュリティ要件に不可欠なデータソースとなる。GKE環境においては、これらの監査ログを無効化することはできず、さらにContainer-Optimized OSを使用するノードでは、バイナリの実行履歴などを追跡するために詳細なLinux auditdログを有効化することがセキュリティインシデントの調査において有効である。蓄積された膨大なログデータは、Log Routerの機能を利用してフィルタリングし、長期保存や高度なSQLクエリ分析を行うためにBigQueryへルーティング（エクスポート）することで、コストと運用効率のバランスを取る。
                </p>
            </div>
        </div>
    );
}

/* ── Section 9: IAMとセキュリティ ── */
function S9IAM() {
    return (
        <div id="s9" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn1">09</div>
                <div className="sec-head-txt">
                    <h2>IAM とセキュリティ</h2>
                    <p>IAMロール3種類、最小特権の原則、サービスアカウント管理、権限借用、組織ポリシー、Cloud Asset Inventory。</p>
                </div>
                <div className="pct-badge pb1">≈20%</div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">9.1</span>IAM の3種類のロール</div>
                <pre className="codeblock">{`基本ロール（Basic Roles）
  ├── Viewer   (閲覧のみ)
  ├── Editor   (閲覧 + 編集)
  └── Owner    (すべての権限)
    ⚠️ 粒度が粗すぎる → 本番環境での使用は原則禁止

事前定義ロール（Predefined Roles）
  ├── roles/compute.instanceAdmin.v1
  ├── roles/storage.objectViewer
  └── ... (Google が用意した細かいロール)
    ✅ 基本的にこれを使用する

カスタムロール（Custom Roles）
  └── 特殊なワークフローのみ自前で定義
    ⚠️ 管理コストが増えるため最小限に`}</pre>
                <div className="bp" style={{ borderColor: 'var(--ace-yellow)' }}>
                    <div className="bpt">最小特権の原則（Principle of Least Privilege）</div>
                    <p style={{ fontSize: '14px', margin: 0 }}>必要な権限だけを、必要な期間だけ、必要なリソースにのみ付与する</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">9.2</span>サービスアカウントの安全な管理</div>
                <pre className="codeblock">{`❌ アンチパターン: 静的 JSON キーの使用
サービスアカウント JSON キーを生成
    ↓
開発者のローカル PC / CI/CD に保存
    ↓
キーが GitHub に誤コミット or 漏洩！
    ↓
悪用されて莫大な請求が発生...`}</pre>
                <table className="ctable">
                    <thead>
                        <tr><th>シナリオ</th><th>推奨手法</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><strong>ローカル開発</strong></td><td><code style={{ color: 'var(--ace-cyan)' }}>gcloud auth application-default login</code> → ADC を使用</td></tr>
                        <tr><td><strong>CI/CD パイプライン</strong></td><td>Workload Identity Federation で動的クレデンシャルを交換</td></tr>
                        <tr><td><strong>GCE/GKE 内</strong></td><td>インスタンスにサービスアカウントをアタッチ（キー不要）</td></tr>
                        <tr><td><strong>外部クラウド（AWS等）から</strong></td><td>Workload Identity Federation を設定</td></tr>
                    </tbody>
                </table>
                <p style={{ fontSize: '14px', marginBottom: '10px' }}><strong>権限借用（Impersonation）</strong></p>
                <pre className="codeblock">{`ユーザー A（通常権限）
    ↓ 権限借用（SA_B の impersonation 権限を持つ）
サービスアカウント B（管理者権限）
    ↓ 短期有効な認証情報（Short-lived credentials）を取得
管理タスクを実行
    ↓
「誰がいつ何を実行したか」が監査ログに残る`}</pre>
                <pre className="codeblock">
                    <span className="comment"># 権限借用でリソースを操作</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}storage ls \{'\n'}
                    {'  '}<span className="flag">--impersonate-service-account=</span>SA_EMAIL@PROJECT.iam.gserviceaccount.com
                </pre>
                <p style={{ fontSize: '14px', marginBottom: '10px' }}><strong>PAM（Privileged Access Manager）</strong></p>
                <p style={{ fontSize: '14px', marginBottom: '10px' }}>高度なエンタープライズ要件では <strong>PAM API</strong> を使用:</p>
                <ul style={{ fontSize: '14px', paddingLeft: '20px', marginBottom: '14px' }}>
                    <li>承認ワークフロー付きで一時的に特権を付与</li>
                    <li>自動的な権限取り消し（期限設定）</li>
                    <li>詳細な監査ログ</li>
                </ul>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">9.3</span>組織ポリシーとリソース制御</div>
                <table className="ctable">
                    <thead>
                        <tr><th>ポリシー例</th><th>効果</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><code style={{ color: 'var(--ace-cyan)' }}>constraints/iam.allowedPolicyMemberDomains</code></td><td>特定ドメインのユーザーのみ IAM に追加可能</td></tr>
                        <tr><td><code style={{ color: 'var(--ace-cyan)' }}>constraints/compute.disableExternalIpAddresses</code></td><td>外部 IP を持つ VM の作成を禁止</td></tr>
                        <tr><td><code style={{ color: 'var(--ace-cyan)' }}>constraints/gcp.resourceLocations</code></td><td>リソースを特定リージョンに限定</td></tr>
                        <tr><td><code style={{ color: 'var(--ace-cyan)' }}>constraints/iam.disableServiceAccountKeyCreation</code></td><td>SA キー生成を組織全体で禁止</td></tr>
                    </tbody>
                </table>
                <p style={{ fontSize: '14px', marginBottom: '10px' }}><strong>Cloud Asset Inventory</strong></p>
                <pre className="codeblock">{`組織全体のリソースと IAM ポリシーを一元管理

主な機能:
・全リソースの検索・エクスポート
・IAM ポリシーの変更履歴の確認
・特定のリソースへのアクセス権を持つユーザーの一覧表示`}</pre>
                <pre className="codeblock">
                    <span className="comment"># 組織内のすべての VM を一覧表示</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}asset search-all-resources \{'\n'}
                    {'  '}<span className="flag">--asset-types=</span>{`'compute.googleapis.com/Instance'`}{' '}\{'\n'}
                    {'  '}<span className="flag">--scope=</span>{`'organizations/ORG_ID'`}
                </pre>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: IAM &amp; セキュリティ</div>
                    <ol>
                        <li><strong>基本ロール（Editor/Owner）の本番環境での使用を禁止</strong></li>
                        <li>サービスアカウント認証は <strong>JSON キーではなく Workload Identity / ADC</strong></li>
                        <li><strong>権限借用（Impersonation）</strong> で特権操作を一時的に実施（監査ログ付き）</li>
                        <li><strong>組織ポリシー</strong> で SA キー生成・外部 IP 付与などを組織全体で制限</li>
                        <li><strong>Cloud Asset Inventory</strong> で定期的なアクセス権棚卸しを実施</li>
                    </ol>
                </div>
                <div className="src">
                    <div className="srct">参照リソース</div>
                    <a href="https://cloud.google.com/blog/products/identity-security/iam-best-practice-guides-available-now" target="_blank" rel="noopener noreferrer">https://cloud.google.com/blog/products/identity-security/iam-best-practice-guides-available-now</a>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">9.4</span>エンタープライズ視点: アクセス・セキュリティ設計</div>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    IAMによるアクセス制御の根幹は「最小特権の原則（Principle of Least Privilege）」である。権限の割り当てにおいて、「編集者（Editor）」や「オーナー（Owner）」などの基本ロール（Basic Roles）はプロジェクト全体に対して過剰な権限を付与するため、レガシー環境や初期設定時を除き、本番環境での使用は厳しく制限されるべきである。代わりに、Googleによってキュレーションされた細かな権限の集合である「事前定義ロール（Predefined Roles）」を使用し、それでも要件を満たせない特殊なワークフローに対してのみ、独自の「カスタムロール（Custom Roles）」を定義する。
                </p>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    サービスアカウントの管理においては、認証情報の漏洩リスクを最小化する戦略が問われる。開発者がローカル環境からAPIにアクセスする際や、CI/CDパイプラインからリソースを操作する際に、静的なサービスアカウントキー（JSONファイル）を生成して使用することはセキュリティ上の重大なアンチパターンである。代わりに、ローカル開発環境では <code style={{ color: 'var(--ace-cyan)' }}>gcloud auth application-default login</code> コマンドを使用してApplication Default Credentials (ADC) を生成し、外部のクラウドリソース（AWSやオンプレミス）からのアクセスには「Workload Identity連携」を設定して、動的なクレデンシャルを交換する手法が推奨される。
                </p>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    さらに、特権の永続的な割り当てを防ぐため、特定の管理タスクを実行する必要があるユーザーには、サービスアカウントの「権限借用（Impersonation）」を利用させる。これにより、ユーザー自身の権限を拡大することなく、短期有効な認証情報（Short-lived credentials）を用いて一時的に特権操作を実行させることが可能となり、詳細な監査ログを通じて「誰がいつ、どのサービスアカウントを利用したか」を正確に追跡できる。より高度なエンタープライズ要件に対しては、Privileged Access Manager (PAM) APIを利用して、承認ベースのアクセス権付与ワークフローを実装する。
                </p>
                <p style={{ fontSize: '14px', marginBottom: '0' }}>
                    複雑化するクラウド環境全体の設定や脆弱性を把握するためには、統合的な可視化ツールが不可欠である。Cloud Asset Inventoryは、組織全体にわたるGoogle CloudリソースやIAMポリシーの履歴を検索、分析、およびエクスポートする機能を提供し、リソースの階層構造やアクセス権の状況を一元的に把握することを可能にする。
                </p>
            </div>
        </div>
    );
}

/* ── Section 10: 生成AIと高度な運用最適化 ── */
function S10GenAI() {
    return (
        <div id="s10" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn2">10</div>
                <div className="sec-head-txt">
                    <h2>生成AI と高度な運用最適化</h2>
                    <p>Gemini Cloud Assist の機能と活用例。アーキテクチャ図自動生成、RCA、FinOps Hub 連携。</p>
                </div>
                <div className="pct-badge pb2">最新トピック</div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">10.1</span>Gemini Cloud Assist</div>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    ACE 試験の最新出題範囲として、<strong>Gemini Cloud Assist</strong> の活用が含まれています。
                </p>
                <table className="ctable">
                    <thead>
                        <tr><th>機能</th><th>説明</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><strong>アーキテクチャ図の自動生成</strong></td><td>自然言語プロンプトから Cloud アーキテクチャ図を生成</td></tr>
                        <tr><td><strong>IaC テンプレート作成</strong></td><td>ベストプラクティス準拠の Terraform テンプレートを自動生成</td></tr>
                        <tr><td><strong>根本原因分析（RCA）</strong></td><td>ログ、メトリクス、構成変更を横断的に分析して障害原因を特定</td></tr>
                        <tr><td><strong>コスト最適化提案</strong></td><td>FinOps Hub 連携でリソースの無駄遣いを AI が分析・提案</td></tr>
                    </tbody>
                </table>
                <p style={{ fontSize: '14px', marginBottom: '8px' }}><strong>活用例</strong></p>
                <pre className="codeblock">{`コンソールの Gemini Cloud Assist に入力:
「us-central1 で 2時間前から Cloud Run が 503 を返しています。原因を調査してください」
    ↓
Gemini が以下を自動分析:
・Cloud Logging のエラーログ
・Cloud Monitoring のメトリクス
・Cloud Asset Inventory の設定変更履歴
    ↓
根本原因と修正アクションを提示`}</pre>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    最新の運用プラクティスとして、生成AIである「Gemini Cloud Assist」の活用がACE試験の出題範囲に組み込まれている。Gemini Cloud Assistは、自然言語によるプロンプトを通じて、インフラストラクチャのアーキテクチャ図の自動生成や、ベストプラクティスに準拠したデプロイ用テンプレート（Terraformなど）の作成を支援する。また、複雑なトラブルシューティングにおいては、Cloud Loggingのログ、Cloud Asset Inventoryの構成変更履歴、およびメトリクスデータを横断的に分析し、システム障害の根本原因（Root Cause Analysis）を特定する調査機能を提供する。FinOps Hubと連携することで、リソースの稼働率や無駄な支出を分析し、コスト最適化の機会をAIが提示する機能も備えており、クラウド運用における意思決定を強力にサポートする。
                </p>
                <div className="src">
                    <div className="srct">参照リソース</div>
                    <a href="https://cloud.google.com/products/gemini/cloud-assist" target="_blank" rel="noopener noreferrer">https://cloud.google.com/products/gemini/cloud-assist</a>
                </div>
            </div>
        </div>
    );
}

/* ── Section 11: 試験直前チェックリスト ── */
function S11Checklist() {
    return (
        <div id="s11" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn3">11</div>
                <div className="sec-head-txt">
                    <h2>試験直前チェックリスト &amp; 推奨学習リソース</h2>
                    <p>Domain 1〜4 のチェックリスト全項目、推奨学習リソース、エンタープライズ視点の結論。</p>
                </div>
                <div className="pct-badge pb3">直前確認</div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">11.1</span>Domain 1 チェックリスト: クラウドソリューション環境の設定（≈23%）</div>
                <ul style={{ fontSize: '14px', paddingLeft: '20px', lineHeight: '2' }}>
                    <li>☐ IAM ポリシーの継承方向（上位 → 下位）を理解している</li>
                    <li>☐ 組織 → フォルダ → プロジェクト → リソースの階層を説明できる</li>
                    <li>☐ 予算アラートが上限達成時にリソースを <strong>停止しない</strong> ことを知っている</li>
                    <li>☐ 自動コスト制御には <code style={{ color: 'var(--ace-cyan)' }}>Pub/Sub + Cloud Functions</code> が必要だと知っている</li>
                    <li>☐ Cloud Billing を BigQuery にエクスポートする目的を説明できる</li>
                </ul>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">11.2</span>Domain 2 チェックリスト: 計画と実装（≈30%）</div>
                <ul style={{ fontSize: '14px', paddingLeft: '20px', lineHeight: '2' }}>
                    <li>☐ Spot VM のユースケースとプリエンプト対応設計を説明できる</li>
                    <li>☐ GKE Autopilot vs Standard の使い分けを説明できる</li>
                    <li>☐ Workload Identity Federation が JSON キーより安全な理由を説明できる</li>
                    <li>☐ Cloud SQL / Spanner / AlloyDB / Bigtable / Firestore を使い分けられる</li>
                    <li>☐ OLM（Object Lifecycle Management）の設定方法を知っている</li>
                    <li>☐ Shared VPC とサービスプロジェクトの構成を説明できる</li>
                    <li>☐ Terraform の State ファイルをリモートバックエンドで管理できる</li>
                    <li>☐ VPC Peering が推移的でないことを知っている</li>
                </ul>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">11.3</span>Domain 3 チェックリスト: 正常なオペレーション（≈27%）</div>
                <ul style={{ fontSize: '14px', paddingLeft: '20px', lineHeight: '2' }}>
                    <li>☐ Ops Agent が必要なメトリクス（メモリ等）を知っている</li>
                    <li>☐ 監査ログの3種類（管理アクティビティ / データアクセス / システムイベント）を説明できる</li>
                    <li>☐ ログを BigQuery にルーティングする方法を知っている</li>
                    <li>☐ スナップショットスケジュールの推奨頻度（1時間ごと）を知っている</li>
                    <li>☐ SLO ベースの監視の重要性を説明できる</li>
                </ul>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">11.4</span>Domain 4 チェックリスト: アクセスとセキュリティ（≈20%）</div>
                <ul style={{ fontSize: '14px', paddingLeft: '20px', lineHeight: '2' }}>
                    <li>☐ 基本ロール（Editor/Owner）を本番で使うべきでない理由を説明できる</li>
                    <li>☐ サービスアカウント JSON キーのリスクと代替手法（ADC/WIF）を説明できる</li>
                    <li>☐ 権限借用（Impersonation）の利点（監査ログ + 最小特権）を説明できる</li>
                    <li>☐ 組織ポリシーで SA キー生成を禁止できることを知っている</li>
                    <li>☐ Binary Authorization の役割を説明できる</li>
                </ul>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">11.5</span>推奨学習リソース</div>
                <table className="ctable">
                    <thead>
                        <tr><th>リソース</th><th>URL</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>ACE 公式認定ページ</td><td><a href="https://cloud.google.com/learn/certification/cloud-engineer?hl=en" target="_blank" rel="noopener noreferrer">https://cloud.google.com/learn/certification/cloud-engineer?hl=en</a></td></tr>
                        <tr><td>ACE 試験ガイド（公式 PDF）</td><td><a href="https://services.google.com/fh/files/misc/associate_cloud_engineer_exam_guide_english.pdf" target="_blank" rel="noopener noreferrer">services.google.com/fh/files/misc/...exam_guide_english.pdf</a></td></tr>
                        <tr><td>Google Cloud スキルブースト</td><td><a href="https://cloudskillsboost.google/" target="_blank" rel="noopener noreferrer">https://cloudskillsboost.google/</a></td></tr>
                        <tr><td>Cloud Architecture Center</td><td><a href="https://cloud.google.com/architecture" target="_blank" rel="noopener noreferrer">https://cloud.google.com/architecture</a></td></tr>
                        <tr><td>Google Cloud ドキュメント</td><td><a href="https://cloud.google.com/docs" target="_blank" rel="noopener noreferrer">https://cloud.google.com/docs</a></td></tr>
                        <tr><td>IAM ベストプラクティスブログ</td><td><a href="https://cloud.google.com/blog/products/identity-security/iam-best-practice-guides-available-now" target="_blank" rel="noopener noreferrer">cloud.google.com/blog/...iam-best-practice-guides</a></td></tr>
                        <tr><td>リソース階層ドキュメント</td><td><a href="https://docs.cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy" target="_blank" rel="noopener noreferrer">docs.cloud.google.com/resource-manager/...</a></td></tr>
                        <tr><td>Terraform ベストプラクティス</td><td><a href="https://docs.cloud.google.com/docs/terraform/best-practices/operations" target="_blank" rel="noopener noreferrer">docs.cloud.google.com/docs/terraform/...</a></td></tr>
                        <tr><td>Cloud Storage ベストプラクティス</td><td><a href="https://docs.cloud.google.com/storage/docs/best-practices" target="_blank" rel="noopener noreferrer">docs.cloud.google.com/storage/docs/best-practices</a></td></tr>
                        <tr><td>GKE Autopilot セキュリティ</td><td><a href="https://docs.cloud.google.com/kubernetes-engine/docs/concepts/autopilot-security" target="_blank" rel="noopener noreferrer">docs.cloud.google.com/kubernetes-engine/...</a></td></tr>
                        <tr><td>ロードバランサ選定ガイド</td><td><a href="https://docs.cloud.google.com/load-balancing/docs/choosing-load-balancer" target="_blank" rel="noopener noreferrer">docs.cloud.google.com/load-balancing/...</a></td></tr>
                    </tbody>
                </table>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">11.6</span>結論: エンタープライズ視点からのまとめ</div>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    Google Cloud Associate Cloud Engineerとしての実践能力は、単一のサービスの設定方法を暗記することにとどまらず、セキュリティ、コスト、パフォーマンス、そして運用の自動化という多角的な観点から最適なアーキテクチャを設計し、実装する能力にかかっている。
                </p>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    本ガイドで詳述した通り、適切なリソース階層の設計とIAMによる最小特権の徹底、予算アラートやBigQueryエクスポートを通じた厳格なコスト管理は、クラウドジャーニーの基礎である。GKE Autopilotの採用による運用オーバーヘッドの削減とセキュリティ態勢の向上、Shared VPCとCloud DNSによるセキュアなネットワークトポロジの構築、そしてTerraformを用いたインフラストラクチャの状態管理とCI/CDパイプラインの統合は、スケーラブルなエンタープライズソリューションを実現するための核心技術である。
                </p>
                <p style={{ fontSize: '14px', marginBottom: '0' }}>
                    さらに、Ops AgentやManaged Service for Prometheusを通じたオブザーバビリティの確立と、Gemini Cloud AssistなどのAI駆動型ツールによるプロアクティブな障害調査およびコスト最適化は、現代のクラウドエンジニアにとって不可欠なスキルセットとなっている。これらのベストプラクティスと技術的洞察を日常のオペレーションに統合することで、エンジニアはGoogle Cloud環境における強固なガバナンスとアジリティを両立させ、ビジネス要件を満たす世界トップクラスのインフラストラクチャを継続的に提供することが可能となる。
                </p>
            </div>

            <div className="src" style={{ marginTop: '24px' }}>
                <div className="srct">全参照リソース（55件）</div>
                <a href="https://cloud.google.com/learn/certification/cloud-engineer?hl=en" target="_blank" rel="noopener noreferrer">Associate Cloud Engineer Certification | Google Cloud</a>
                <a href="https://services.google.com/fh/files/misc/associate_cloud_engineer_exam_guide_english.pdf" target="_blank" rel="noopener noreferrer">Associate Cloud Engineer Exam Guide | English - Google</a>
                <a href="https://docs.cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy" target="_blank" rel="noopener noreferrer">About resource hierarchy - Google Cloud Documentation</a>
                <a href="https://cloud.google.com/blog/products/identity-security/iam-best-practice-guides-available-now" target="_blank" rel="noopener noreferrer">IAM best practice guides available now | Google Cloud Blog</a>
                <a href="https://docs.cloud.google.com/iam/docs/resource-hierarchy-access-control" target="_blank" rel="noopener noreferrer">Using resource hierarchy for access control | IAM</a>
                <a href="https://cloud.google.com/blog/products/identity-security/resource-hierarchies-make-your-iam-management-easier" target="_blank" rel="noopener noreferrer">Resource hierarchies make your IAM management easier | Google Cloud Blog</a>
                <a href="https://docs.cloud.google.com/billing/docs/how-to/budgets" target="_blank" rel="noopener noreferrer">Create, edit, or delete budgets and budget alerts | Cloud Billing</a>
                <a href="https://docs.cloud.google.com/billing/docs/concepts" target="_blank" rel="noopener noreferrer">Cloud Billing overview - Google Cloud Documentation</a>
                <a href="https://cloud.google.com/blog/products/devops-sre/cloud-logging-cost-management-best-practices" target="_blank" rel="noopener noreferrer">Cloud Logging cost management best practices | Google Cloud Blog</a>
                <a href="https://docs.cloud.google.com/compute/docs/oslogin/set-up-oslogin" target="_blank" rel="noopener noreferrer">Set up OS Login | Compute Engine - Google Cloud Documentation</a>
                <a href="https://docs.cloud.google.com/compute/docs/instances/create-use-spot" target="_blank" rel="noopener noreferrer">Create and use Spot VMs | Compute Engine - Google Cloud Documentation</a>
                <a href="https://docs.cloud.google.com/run/docs/configuring/networking-best-practices" target="_blank" rel="noopener noreferrer">Best practices for Cloud Run networking - Google Cloud Documentation</a>
                <a href="https://docs.cloud.google.com/kubernetes-engine/docs/concepts/autopilot-security" target="_blank" rel="noopener noreferrer">GKE Autopilot security measures - Google Cloud Documentation</a>
                <a href="https://docs.cloud.google.com/kubernetes-engine/docs/resources/autopilot-standard-feature-comparison" target="_blank" rel="noopener noreferrer">Compare features in Autopilot and Standard clusters | GKE</a>
                <a href="https://docs.cloud.google.com/storage/docs/best-practices" target="_blank" rel="noopener noreferrer">Best practices for Cloud Storage | Google Cloud Documentation</a>
                <a href="https://cloud.google.com/blog/topics/developers-practitioners/your-google-cloud-database-options-explained" target="_blank" rel="noopener noreferrer">Your Google Cloud database options, explained | Google Cloud Blog</a>
                <a href="https://docs.cloud.google.com/vpc/docs/shared-vpc" target="_blank" rel="noopener noreferrer">Shared VPC | Virtual Private Cloud - Google Cloud Documentation</a>
                <a href="https://docs.cloud.google.com/dns/docs/best-practices" target="_blank" rel="noopener noreferrer">Best practices for Cloud DNS | Google Cloud Documentation</a>
                <a href="https://docs.cloud.google.com/load-balancing/docs/choosing-load-balancer" target="_blank" rel="noopener noreferrer">Choose a load balancer | Cloud Load Balancing | Google Cloud</a>
                <a href="https://docs.cloud.google.com/docs/terraform/best-practices/operations" target="_blank" rel="noopener noreferrer">Best practices for Terraform operations | Terraform on Google Cloud</a>
                <a href="https://docs.cloud.google.com/compute/docs/disks/snapshot-best-practices" target="_blank" rel="noopener noreferrer">Best practices for Compute Engine disk snapshots | Google Cloud</a>
                <a href="https://docs.cloud.google.com/monitoring/agent/ops-agent" target="_blank" rel="noopener noreferrer">Ops Agent overview | Cloud Monitoring - Google Cloud Documentation</a>
                <a href="https://cloud.google.com/products/gemini/cloud-assist" target="_blank" rel="noopener noreferrer">Gemini Cloud Assist: AI-assisted cloud operations and management</a>
                <a href="https://docs.cloud.google.com/cloud-assist/overview" target="_blank" rel="noopener noreferrer">Gemini Cloud Assist overview - Google Cloud Documentation</a>
                <a href="https://docs.cloud.google.com/architecture/best-practices-vpc-design" target="_blank" rel="noopener noreferrer">Best practices and reference architectures for VPC design</a>
                <a href="https://cloud.google.com/blog/products/networking/6-best-practices-for-running-cloud-nat" target="_blank" rel="noopener noreferrer">Best practices for running Cloud NAT | Google Cloud Blog</a>
                <a href="https://docs.cloud.google.com/load-balancing/docs/load-balancing-overview" target="_blank" rel="noopener noreferrer">Cloud Load Balancing overview - Google Cloud Documentation</a>
                <a href="https://cloudskillsboost.google/" target="_blank" rel="noopener noreferrer">Google Cloud Skills Boost</a>
                <a href="https://cloud.google.com/architecture" target="_blank" rel="noopener noreferrer">Cloud Architecture Center | Google Cloud</a>
            </div>
        </div>
    );
}

/* ── ページ本体 ── */
export default function ArchitectureGuidePage() {
    return (
        <div className="ace-page">
            <section className="hero">
                <div className="hero-eyebrow">ACE STUDY GUIDE</div>
                <h1>
                    ACE 完全学習ガイド<br />
                    <span className="accent">試験対策・アーキテクチャ詳細</span>
                </h1>
                <p className="hero-desc">
                    初学者からエンジニアまで — ステップバイステップで理解する試験対策 &amp; ベストプラクティス。
                    ace-complete-study-guide + エンタープライズ深掘り解説を完全統合。
                </p>
                <div className="meta-row">
                    <div className="meta-pill"><div className="ml">試験時間</div><div className="mv">2時間</div></div>
                    <div className="meta-pill"><div className="ml">設問数</div><div className="mv">50〜60問</div></div>
                    <div className="meta-pill"><div className="ml">受験料</div><div className="mv">$125</div></div>
                    <div className="meta-pill"><div className="ml">有効期限</div><div className="mv">3年</div></div>
                    <div className="meta-pill"><div className="ml">セクション数</div><div className="mv">11</div></div>
                </div>
            </section>

            <nav className="snav">
                <a href="#s1" className="n1"><span className="dot db" />S1 試験概要</a>
                <a href="#s2" className="n2"><span className="dot dg" />S2 ガバナンス</a>
                <a href="#s3" className="n3"><span className="dot dy" />S3 コンピュート</a>
                <a href="#s4" className="n4"><span className="dot do" />S4 GKE</a>
                <a href="#s5" className="n1"><span className="dot db" />S5 ストレージ</a>
                <a href="#s6" className="n2"><span className="dot dg" />S6 ネットワーク</a>
                <a href="#s7" className="n3"><span className="dot dy" />S7 Terraform</a>
                <a href="#s8" className="n4"><span className="dot do" />S8 オペレーション</a>
                <a href="#s9" className="n1"><span className="dot db" />S9 IAM</a>
                <a href="#s10" className="n2"><span className="dot dg" />S10 GenAI</a>
                <a href="#s11" className="n3"><span className="dot dy" />S11 チェックリスト</a>
            </nav>

            <main className="wrap">
                <S1Overview />
                <S2Governance />
                <S3Compute />
                <S4GKE />
                <S5Storage />
                <S6Network />
                <S7Terraform />
                <S8Operations />
                <S9IAM />
                <S10GenAI />
                <S11Checklist />
            </main>
        </div>
    );
}
