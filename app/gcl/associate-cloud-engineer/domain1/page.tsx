import type { Metadata } from 'next';
import '../ace.css';

export const metadata: Metadata = {
    title: 'Domain 1: 環境設定 包括的解説 | Associate Cloud Engineer',
    description:
        'Google Cloud ACE Domain 1 完全解説。リソース階層・IAM継承・組織ポリシー・請求管理・予算自動制御・BigQuery分析・gcloud CLI・API管理まで全章を網羅。',
};

/* ── Section Intro ── */
function SectionIntro() {
    return (
        <div id="intro" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn1">D1</div>
                <div className="sec-head-txt">
                    <h2>Domain 1: クラウドソリューション環境の設定</h2>
                    <p>試験配点 ≈23%。リソース階層・IAM・組織ポリシー・請求・gcloud CLI・API 管理の完全ガイド。</p>
                </div>
                <div className="pct-badge pb1">≈23%</div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">0.1</span>Domain 1 の全体マップ</div>
                <pre className="codeblock">{`Domain 1: クラウドソリューション環境の設定
│
├── 1. クラウドプロジェクトとアカウントの設定
│   ├── 1-1. Google Cloud リソース階層
│   ├── 1-2. Cloud Identity / Google Workspace
│   ├── 1-3. プロジェクトの作成と管理
│   ├── 1-4. 組織ポリシー（Organization Policy）
│   └── 1-5. gcloud CLI の設定と管理
│
├── 2. 請求構成とコスト管理
│   ├── 2-1. 請求先アカウント（Billing Account）
│   ├── 2-2. 予算とアラートの設定
│   ├── 2-3. コストの可視化と分析
│   └── 2-4. 自動コスト制御アーキテクチャ
│
└── 3. Cloud API の管理
    ├── 3-1. API の有効化と管理
    └── 3-2. API キーとサービスアカウント認証`}</pre>
                <p style={{ fontSize: '14px', marginBottom: '0' }}>
                    Domain 1 は試験全体の約 <strong>23%</strong>（Standard Exam 50〜60問中 約12〜14問）を占める最重要基盤領域。
                    ここで設計する階層・ポリシー・請求構成が後続のすべての運用・セキュリティ・コスト管理の土台となる。
                </p>
                <div className="src">
                    <div className="srct">公式ページ</div>
                    <a href="https://cloud.google.com/learn/certification/cloud-engineer?hl=en" target="_blank" rel="noopener noreferrer">https://cloud.google.com/learn/certification/cloud-engineer?hl=en</a>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">0.2</span>エンタープライズ視点: Domain 1 の位置づけ</div>
                <table className="ctable">
                    <thead>
                        <tr><th>認定試験における主要ドメイン</th><th>概要と評価範囲</th><th>出題比重の目安</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><strong>Domain 1: 環境の設定</strong></td><td>プロジェクト、IAM、請求（Billing）、CLIツールの初期構成とガバナンスの確立</td><td>17.5% - 23%</td></tr>
                        <tr><td>Domain 2: 計画と構成</td><td>ワークロードに適したコンピューティング、ストレージ、ネットワークの選択と設計</td><td>17.5% - 30%</td></tr>
                        <tr><td>Domain 3: デプロイと実装</td><td>Compute Engine、GKE、Cloud Runなどの実際のリソース構築とデプロイ</td><td>25%</td></tr>
                        <tr><td>Domain 4: 正常な運用の確保</td><td>Operations Suiteを用いた監視、ロギング、トラブルシューティング</td><td>20% - 27%</td></tr>
                        <tr><td>Domain 5: アクセスとセキュリティ</td><td>ネットワークセキュリティ、ファイアウォール、サービスアカウントの高度な管理</td><td>20%</td></tr>
                    </tbody>
                </table>
                <p style={{ fontSize: '14px', marginBottom: '0' }}>
                    現代のエンタープライズITにおいて、パブリッククラウドの導入は単なるインフラストラクチャの移行ではなく、組織のガバナンス、セキュリティ、財務管理、そして開発アジリティを根本から再定義する戦略的プロセスである。初期設定の段階で適切なリソース階層、アクセス制御、請求構成を設計することは、将来的なセキュリティインシデントや予算超過（クラウド破産）を防ぎ、スケーラブルな運用を実現するための絶対条件である。
                </p>
            </div>
        </div>
    );
}

/* ── Chapter 1: リソース階層 ── */
function Chapter1() {
    return (
        <div id="ch1" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn2">01</div>
                <div className="sec-head-txt">
                    <h2>Chapter 1: Google Cloud リソース階層の完全理解</h2>
                    <p>Organization・Folder・Project・Resource の4層構造、IAMポリシー継承メカニズム、実践的な設計パターン。</p>
                </div>
                <div className="pct-badge pb2">最重要</div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">1.1</span>リソース階層とは？ — 会社組織図との対応</div>
                <pre className="codeblock">{`【現実の会社組織】              【Google Cloud の階層】
  株式会社 Example          →   Organization（組織）
    ├── 開発部門             →     ├── Folder（フォルダ）
    │    ├── バックエンドチーム →  │    ├── Project（プロジェクト）
    │    └── フロントエンドチーム→ │    └── Project（プロジェクト）
    └── 営業部門             →     └── Folder（フォルダ）
         └── ...             →          └── Project（プロジェクト）`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">1.2</span>各階層レベルの詳細解説</div>
                <p style={{ fontSize: '14px', marginBottom: '10px' }}><strong>レベル1: Organization（組織）</strong></p>
                <pre className="codeblock">{`Organization: example.com
├── 全プロジェクトの親
├── 組織ポリシーを全体に適用できる
└── 組織レベルのIAMロール付与が可能`}</pre>
                <table className="ctable">
                    <thead>
                        <tr><th>特性</th><th>内容</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>自動作成</td><td>Google Workspace / Cloud Identity ドメインに紐付いて自動生成</td></tr>
                        <tr><td>一意性</td><td>1つのドメインにつき1つの Organization</td></tr>
                        <tr><td>親リソース</td><td>存在しない（最上位）</td></tr>
                        <tr><td>デフォルトロール</td><td><code style={{ color: 'var(--ace-cyan)' }}>Organization Admin</code>、<code style={{ color: 'var(--ace-cyan)' }}>Billing Account Creator</code> など</td></tr>
                    </tbody>
                </table>
                <p style={{ fontSize: '14px', marginTop: '14px', marginBottom: '10px' }}><strong>レベル2: Folder（フォルダ）— ネスト構造</strong></p>
                <pre className="codeblock">{`Organization: example.com
├── Folder: 開発環境
│   ├── Project: dev-frontend
│   ├── Project: dev-backend
│   └── Project: dev-database
│
├── Folder: ステージング環境
│   └── Project: staging-webapp
│
└── Folder: 本番環境
    ├── Project: prod-frontend
    └── Project: prod-backend

フォルダは最大 10レベル まで入れ子にできます`}</pre>
                <table className="ctable">
                    <thead>
                        <tr><th>用途</th><th>例</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>環境分離</td><td>開発・ステージング・本番</td></tr>
                        <tr><td>部門分離</td><td>開発部・財務部・マーケティング部</td></tr>
                        <tr><td>地域分離</td><td>日本・米国・欧州</td></tr>
                        <tr><td>プロジェクト分類</td><td>社内システム・顧客向けサービス</td></tr>
                    </tbody>
                </table>
                <p style={{ fontSize: '14px', marginTop: '14px', marginBottom: '10px' }}><strong>レベル3: Project（プロジェクト）— 3つの識別子</strong></p>
                <pre className="codeblock">{`Project: my-webapp-prod
├── 一意の Project ID（変更不可）
├── Project Number（自動採番、変更不可）
├── Project Name（変更可能）
├── 紐付けられた Billing Account
├── 有効化された API のリスト
└── リソース（VM、DB、ストレージ...）`}</pre>
                <table className="ctable">
                    <thead>
                        <tr><th>識別子</th><th>例</th><th>変更可否</th><th>特徴</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><strong>Project ID</strong></td><td><code style={{ color: 'var(--ace-cyan)' }}>my-webapp-prod-20240101</code></td><td>❌ 変更不可</td><td>グローバルに一意。作成時に指定（自動生成も可）</td></tr>
                        <tr><td><strong>Project Number</strong></td><td><code style={{ color: 'var(--ace-cyan)' }}>123456789012</code></td><td>❌ 変更不可</td><td>Google が自動採番する数値 ID</td></tr>
                        <tr><td><strong>Project Name</strong></td><td><code style={{ color: 'var(--ace-cyan)' }}>My Webapp Production</code></td><td>✅ 変更可</td><td>表示名。一意性は不要</td></tr>
                    </tbody>
                </table>
                <div className="wb">
                    ⚠️ <strong>試験頻出</strong>: Project ID は <strong>グローバルに一意</strong> で <strong>変更不可</strong>。一度設定したら永久に変わりません。
                </div>
                <pre className="codeblock">{`✅ 同一プロジェクトに置くべきリソース:
   → 同じチームが管理するリソース
   → 同じセキュリティ要件を持つリソース
   → 同じ予算で管理するリソース

❌ 別プロジェクトに分けるべきケース:
   → 開発環境と本番環境（セキュリティレベルが異なる）
   → 異なる部門のシステム（責任範囲が異なる）
   → コストを独立して管理したいシステム`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">1.3</span>IAMポリシーの継承メカニズム（最重要）</div>
                <pre className="codeblock">{`IAM Policy の基本構造:

Policy = {
  "bindings": [
    {
      "role": "roles/editor",        ← 何ができるか（役割）
      "members": [                   ← 誰が
        "user:alice@example.com"
      ]
    }
  ]
}`}</pre>
                <p style={{ fontSize: '14px', marginBottom: '8px' }}><strong>継承の仕組み（上位 → 下位に自動適用）</strong></p>
                <pre className="codeblock">{`Organization レベル: alice に roles/viewer を付与
    ↓ 自動的に継承される
Folder レベル: alice はここでも viewer
    ↓ 自動的に継承される
Project レベル: alice はここでも viewer
    ↓ 自動的に継承される
Resource レベル: alice はここでも viewer`}</pre>
                <pre className="codeblock">{`【ルール1】上位の許可は下位でも有効
  Organization で roles/editor を付与
  → その配下のすべてのプロジェクトでも editor 権限が有効

【ルール2】下位での制限で上位の許可は取り消せない
  Organization で roles/editor を付与
  Project レベルで拒否しようとしても無効
  → 上位の許可は下位で上書きできない（原則）

【ルール3】権限は「和集合（Union）」
  Organization: roles/viewer
  Project: roles/editor
  → 実際の権限 = viewer + editor の両方`}</pre>
                <div className="wb">
                    ⚠️ <strong>試験頻出の引っかけ</strong>: 下位レベルで権限を「削除」しても、上位レベルで付与されていれば有効のまま！
                </div>
                <p style={{ fontSize: '14px', marginBottom: '8px' }}><strong>実践的な設計パターン</strong></p>
                <pre className="codeblock">{`【パターン1: 環境ごとの分離】
Organization: example.com
├── Folder: 開発環境
│   └── Project: dev-app
│       ← ここで dev-team@example.com に roles/editor を付与
│         （開発環境だけ編集できる）
│
└── Folder: 本番環境
    └── Project: prod-app
        ← ここで ops-team@example.com に roles/editor を付与
          （本番は ops チームのみ編集可能）

【パターン2: 横断的な閲覧権限】
Organization レベルで
  monitoring-team@example.com に roles/viewer を付与
→ すべてのプロジェクトのリソースを閲覧できる
→ 個別プロジェクトに設定不要でメンテコスト削減！`}</pre>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: IAM 継承設計</div>
                    <ol>
                        <li><strong>企業の組織構造をフォルダ階層に反映する</strong>（権限管理が直感的になる）</li>
                        <li><strong>複数プロジェクト共通の権限は親フォルダで付与</strong>（個別設定の手間が省け、設定漏れを防止）</li>
                        <li><strong>同じ信頼境界のリソースを同一プロジェクトにまとめる</strong>（セキュリティポリシーの一貫性）</li>
                        <li><strong>Organization レベルへのロール付与は最小限に</strong>（影響範囲が最大なため慎重に）</li>
                    </ol>
                </div>
                <div className="src">
                    <div className="srct">参照リソース</div>
                    <a href="https://docs.cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy" target="_blank" rel="noopener noreferrer">https://docs.cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy</a>
                    <a href="https://docs.cloud.google.com/iam/docs/resource-hierarchy-access-control" target="_blank" rel="noopener noreferrer">https://docs.cloud.google.com/iam/docs/resource-hierarchy-access-control</a>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">1.4</span>エンタープライズ視点: リソース階層アーキテクチャ設計</div>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    Google Cloudのリソース階層は、最上位の「組織（Organization）」、中間層の「フォルダ（Folders）」、そして最下層の「プロジェクト（Projects）」という厳密なツリー構造で構成される。この構造の最大の利点は、ポリシーの「継承（Inheritance）」とリソースの「所有権（Ownership）」の明確化にある。上位階層で設定されたIAMの許可ポリシーや組織のポリシーは、下位のすべてのリソースに自動的に適用され、管理のオーバーヘッドを劇的に削減する。また、従業員が退職した場合でも、リソースは個人のアカウントではなく組織に属しているため、システムが停止することなく安全に保持される。
                </p>
                <table className="ctable">
                    <thead>
                        <tr><th>階層レベル</th><th>アーキテクチャ上の役割と特徴</th><th>ベストプラクティスと推奨設定</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>組織 (Organization)</strong></td>
                            <td>階層のルートノード。Google WorkspaceまたはCloud Identityのドメインと1対1で関連付けられる。</td>
                            <td>企業全体に適用する包括的なセキュリティポリシーの適用点。特別な理由がない限り、企業ごとに単一の組織ノードを使用する。</td>
                        </tr>
                        <tr>
                            <td><strong>フォルダ (Folders)</strong></td>
                            <td>プロジェクトを論理的にグループ化するための任意のコンテナ。最大10階層までネスト可能。</td>
                            <td>環境（本番、ステージング、開発）や事業部門ごとにリソースを分離する。IAMロールは個別のプロジェクトではなくフォルダレベルで一括付与する。</td>
                        </tr>
                        <tr>
                            <td><strong>プロジェクト (Projects)</strong></td>
                            <td>リソースをプロビジョニングし、課金、API管理、IAMの基盤となる基本単位。</td>
                            <td>同じ信頼境界（トラストバウンダリ）を共有するリソースのみを同一プロジェクトに配置する。本番環境と開発環境は別々のプロジェクトに完全に分離する。</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

/* ── Chapter 2: Cloud Identity & Workspace ── */
function Chapter2() {
    return (
        <div id="ch2" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn3">02</div>
                <div className="sec-head-txt">
                    <h2>Chapter 2: Cloud Identity と Google Workspace</h2>
                    <p>Organization 作成の前提条件、管理対象ユーザーと非管理対象ユーザーの違い、GCDS との連携。</p>
                </div>
                <div className="pct-badge pb3">基盤</div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">2.1</span>Google Cloud の「アカウント」の仕組み</div>
                <pre className="codeblock">{`Google Workspace            Cloud Identity
（旧 G Suite）              （無料版）
  ├── Gmail                   ├── 組織 ID 管理のみ
  ├── Drive                   ├── Google Cloud 利用
  ├── Meet など               └── コスト: 無料（Free）
  └── Google Cloud 利用
  コスト: 有料`}</pre>
                <table className="ctable">
                    <thead>
                        <tr><th>項目</th><th>Google Workspace</th><th>Cloud Identity (Free)</th><th>Cloud Identity (Premium)</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Gmail / Drive</td><td>✅ あり</td><td>❌ なし</td><td>❌ なし</td></tr>
                        <tr><td>Google Cloud 利用</td><td>✅</td><td>✅</td><td>✅</td></tr>
                        <tr><td>Organization 作成</td><td>✅</td><td>✅</td><td>✅</td></tr>
                        <tr><td>MDM（モバイル管理）</td><td>一部</td><td>❌</td><td>✅</td></tr>
                        <tr><td>コスト</td><td>有料</td><td><strong>無料</strong></td><td>有料</td></tr>
                    </tbody>
                </table>
                <p style={{ fontSize: '14px', marginBottom: '0', marginTop: '10px' }}>
                    💡 <strong>試験ポイント</strong>: 企業がGoogle Workspaceを既に使っている場合、追加コストなしでGoogle CloudのOrganization機能が利用できます。
                </p>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">2.2</span>管理対象ユーザーと非管理対象ユーザー</div>
                <pre className="codeblock">{`【管理対象ユーザー（Managed Users）】
  会社ドメイン: alice@example.com
  → Google Workspace / Cloud Identity で管理される
  → Organization 配下にプロジェクトを作成
  → 組織ポリシーが適用される

【非管理対象ユーザー（Unmanaged Users）】
  個人Gmail: alice@gmail.com
  → Organization なし（個人プロジェクトのみ）
  → 組織ポリシーは適用されない
  → 企業での利用は非推奨`}</pre>
                <div className="wb">
                    ⚠️ <strong>重要</strong>: 管理対象ユーザー（@会社ドメイン）は <strong>原則として組織内にプロジェクトを作成</strong> しなければなりません。
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">2.3</span>エンタープライズ視点: Cloud Identity ディレクトリ統合</div>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    エンタープライズ環境において、数百、数千のユーザーを手動で管理することは非現実的である。Google Cloudのユーザー基盤は、Google WorkspaceまたはCloud Identityのディレクトリサービスによって提供される。既存のITインフラストラクチャとしてActive Directory (AD) やLDAPを運用している企業は、Google Cloud Directory Sync (GCDS) やSAMLベースのフェデレーション（シングルサインオン）を構成することで、オンプレミスのID情報をクラウドとシームレスに同期できる。これにより、人事システム上で従業員が退職扱いとなった瞬間にクラウドへのアクセス権も自動的に剥奪され、孤立したアカウントによる不正アクセスのリスクを根絶することが可能となる。
                </p>
                <div className="src">
                    <div className="srct">参照リソース</div>
                    <a href="https://cloud.google.com/identity/docs/overview" target="_blank" rel="noopener noreferrer">https://cloud.google.com/identity/docs/overview</a>
                </div>
            </div>
        </div>
    );
}

/* ── Chapter 3: プロジェクト管理 ── */
function Chapter3() {
    return (
        <div id="ch3" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn4">03</div>
                <div className="sec-head-txt">
                    <h2>Chapter 3: プロジェクトの作成と管理</h2>
                    <p>3通りの作成方法（Console・gcloud・Terraform）、ライフサイクル（30日猶予期間）、クォータ管理。</p>
                </div>
                <div className="pct-badge pb4">Domain 1</div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">3.1</span>プロジェクト作成の方法（3通り）</div>
                <p style={{ fontSize: '14px', marginBottom: '8px' }}><strong>方法①: Google Cloud Console（GUI）</strong></p>
                <pre className="codeblock">{`1. https://console.cloud.google.com にアクセス
2. 上部のプロジェクト選択メニューをクリック
3. 「新しいプロジェクト」をクリック
4. 以下を入力:
   - プロジェクト名: My Webapp Prod
   - プロジェクトID: my-webapp-prod-xxxx（自動生成 or 手動指定）
   - 場所（親組織/フォルダ）: 選択
5. 「作成」をクリック`}</pre>
                <p style={{ fontSize: '14px', marginBottom: '8px' }}><strong>方法②: gcloud CLI</strong></p>
                <pre className="codeblock">
                    <span className="comment"># プロジェクトの作成</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}projects create PROJECT_ID \{'\n'}
                    {'  '}<span className="flag">--name=</span><span className="val">&quot;My Webapp Prod&quot;</span> \{'\n'}
                    {'  '}<span className="flag">--folder=</span>FOLDER_ID{'\n'}
                    {'\n'}
                    <span className="comment"># 作成後、そのプロジェクトをデフォルトに設定</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}config set project my-webapp-prod-20240101
                </pre>
                <p style={{ fontSize: '14px', marginBottom: '8px' }}><strong>方法③: Terraform（IaC）</strong></p>
                <pre className="codeblock">{`resource "google_project" "my_project" {
  name            = "My Webapp Production"
  project_id      = "my-webapp-prod-20240101"
  folder_id       = "987654321"
  billing_account = "ABCDEF-123456-GHIJKL"
}`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">3.2</span>プロジェクトのライフサイクル</div>
                <pre className="codeblock">{`ACTIVE（アクティブ）
    ↓ 削除操作
DELETE_REQUESTED（削除予約）
    │
    ├── 30日間の猶予期間
    │   └── この間に「削除取り消し」が可能
    │
    └── 30日後
        ↓
    完全削除（復元不可）`}</pre>
                <div className="wb">
                    ⚠️ <strong>重要</strong>: プロジェクトを削除すると、その中のすべてのリソースが <strong>30日後に完全削除</strong> されます。誤削除に注意！
                </div>
                <pre className="codeblock">
                    <span className="comment"># プロジェクトを削除（30日の猶予あり）</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}projects delete PROJECT_ID{'\n'}
                    {'\n'}
                    <span className="comment"># 削除をキャンセル（30日以内）</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}projects undelete PROJECT_ID{'\n'}
                    {'\n'}
                    <span className="comment"># プロジェクトのステータス確認</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}projects describe PROJECT_ID
                </pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">3.3</span>プロジェクトのリソース制限（クォータ）</div>
                <table className="ctable">
                    <thead>
                        <tr><th>リソース</th><th>デフォルト上限</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>組織あたりのプロジェクト数</td><td>制限なし（ただし作成レートに上限あり）</td></tr>
                        <tr><td>請求先アカウントあたりのプロジェクト数</td><td>5（デフォルト。増加申請可能）</td></tr>
                    </tbody>
                </table>
                <p style={{ fontSize: '14px', marginBottom: '0', marginTop: '10px' }}>
                    💡 <strong>試験ポイント</strong>: プロジェクト作成数のクォータを超えた場合は、Google Cloud サポートに増加申請が必要です。
                </p>
                <div className="src">
                    <div className="srct">参照リソース</div>
                    <a href="https://cloud.google.com/resource-manager/docs/creating-managing-projects" target="_blank" rel="noopener noreferrer">https://cloud.google.com/resource-manager/docs/creating-managing-projects</a>
                    <a href="https://cloud.google.com/docs/enterprise/best-practices-for-enterprise-organizations" target="_blank" rel="noopener noreferrer">https://cloud.google.com/docs/enterprise/best-practices-for-enterprise-organizations</a>
                </div>
            </div>
        </div>
    );
}

/* ── Chapter 4: 組織ポリシー ── */
function Chapter4() {
    return (
        <div id="ch4" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn1">04</div>
                <div className="sec-head-txt">
                    <h2>Chapter 4: 組織ポリシー（Organization Policy）</h2>
                    <p>IAM との違い、主要な制約一覧（セキュリティ/ネットワーク/リージョン制限）、継承と上書き、設定コマンド。</p>
                </div>
                <div className="pct-badge pb1">ガバナンス</div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">4.1</span>組織ポリシーとは？ — IAM との違い</div>
                <pre className="codeblock">{`【IAM の役割】
「alice は VM を作成できる（権限の制御）」

【組織ポリシー の役割】
「誰であっても外部IPを持つVMは作成できない（設定の強制）」
     ↑
  alice が admin でも制約を受ける！`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">4.2</span>主要な組織ポリシーの制約（Constraints）</div>
                <p style={{ fontSize: '14px', marginBottom: '8px' }}><strong>セキュリティ関連</strong></p>
                <table className="ctable">
                    <thead>
                        <tr><th>制約名</th><th>効果</th><th>推奨設定</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><code style={{ color: 'var(--ace-cyan)' }}>constraints/iam.allowedPolicyMemberDomains</code></td><td>IAMに追加できるユーザーを特定ドメインに限定</td><td>自社ドメインのみ許可</td></tr>
                        <tr><td><code style={{ color: 'var(--ace-cyan)' }}>constraints/iam.disableServiceAccountKeyCreation</code></td><td>SAの静的JSONキー生成を禁止</td><td>有効化推奨</td></tr>
                        <tr><td><code style={{ color: 'var(--ace-cyan)' }}>constraints/iam.disableServiceAccountKeyUpload</code></td><td>SAへの外部キーのアップロードを禁止</td><td>有効化推奨</td></tr>
                        <tr><td><code style={{ color: 'var(--ace-cyan)' }}>constraints/compute.requireOsLogin</code></td><td>すべてのVMでOS Loginを強制</td><td>有効化推奨</td></tr>
                    </tbody>
                </table>
                <p style={{ fontSize: '14px', marginBottom: '8px', marginTop: '14px' }}><strong>ネットワーク関連</strong></p>
                <table className="ctable">
                    <thead>
                        <tr><th>制約名</th><th>効果</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><code style={{ color: 'var(--ace-cyan)' }}>constraints/compute.disableExternalIpAddresses</code></td><td>外部IPを持つVMの作成を禁止</td></tr>
                        <tr><td><code style={{ color: 'var(--ace-cyan)' }}>constraints/compute.restrictCloudNATUsage</code></td><td>Cloud NATの使用を特定のサブネットに制限</td></tr>
                        <tr><td><code style={{ color: 'var(--ace-cyan)' }}>constraints/compute.vmExternalIpAccess</code></td><td>外部IPを許可するVMのリストを制限</td></tr>
                    </tbody>
                </table>
                <p style={{ fontSize: '14px', marginBottom: '8px', marginTop: '14px' }}><strong>リージョン制限関連</strong></p>
                <table className="ctable">
                    <thead>
                        <tr><th>制約名</th><th>効果</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><code style={{ color: 'var(--ace-cyan)' }}>constraints/gcp.resourceLocations</code></td><td>リソースを特定のリージョンに限定（データ主権のため）</td></tr>
                    </tbody>
                </table>
                <pre className="codeblock">{`# 例: 日本リージョンのみにリソースを限定
constraint: constraints/gcp.resourceLocations
listPolicy:
  allowedValues:
    - in:asia-northeast1-locations  # 東京
    - in:asia-northeast2-locations  # 大阪`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">4.3</span>組織ポリシーの継承と上書き・設定コマンド</div>
                <pre className="codeblock">{`Organization レベル: ポリシー A を設定
    ↓ 継承
Folder レベル: ポリシー A が有効（+ ポリシー B を追加も可能）
    ↓ 継承
Project レベル: ポリシー A, B が有効

【上書きの例外】
  特定フォルダ/プロジェクトで「継承をリセット」することで
  上位のポリシーを無効化し、独自のポリシーを設定可能
  （ただし Organization Admin 権限が必要）`}</pre>
                <pre className="codeblock">
                    <span className="comment"># 特定の制約を有効化（外部IPを持つVMの作成を禁止）</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}resource-manager org-policies enable-enforce \{'\n'}
                    {'  '}constraints/compute.disableExternalIpAddresses \{'\n'}
                    {'  '}<span className="flag">--organization=</span>ORG_ID{'\n'}
                    {'\n'}
                    <span className="comment"># 特定のプロジェクトに制約を設定</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}resource-manager org-policies set-policy policy.yaml \{'\n'}
                    {'  '}<span className="flag">--project=</span>PROJECT_ID{'\n'}
                    {'\n'}
                    <span className="comment"># 現在のポリシーを確認</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}resource-manager org-policies describe \{'\n'}
                    {'  '}constraints/compute.disableExternalIpAddresses \{'\n'}
                    {'  '}<span className="flag">--organization=</span>ORG_ID
                </pre>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: 組織ポリシー</div>
                    <ol>
                        <li><code style={{ color: 'var(--ace-cyan)' }}>constraints/iam.disableServiceAccountKeyCreation</code> を組織全体で有効化し、静的キーの生成を禁止する</li>
                        <li><code style={{ color: 'var(--ace-cyan)' }}>constraints/gcp.resourceLocations</code> でデータを特定リージョンに限定（GDPR、個人情報保護法対応）</li>
                        <li><code style={{ color: 'var(--ace-cyan)' }}>constraints/iam.allowedPolicyMemberDomains</code> で自社ドメイン外のユーザーをIAMに追加できないよう制限</li>
                        <li>開発環境は制約を緩和して素早いイテレーションを可能に、本番環境は厳しく制約する</li>
                    </ol>
                </div>
                <div className="src">
                    <div className="srct">参照リソース</div>
                    <a href="https://cloud.google.com/resource-manager/docs/organization-policy/overview" target="_blank" rel="noopener noreferrer">https://cloud.google.com/resource-manager/docs/organization-policy/overview</a>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">4.4</span>エンタープライズ視点: 組織ポリシーによるガバナンス強制</div>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    IAMが「誰がリソースにアクセスできるか（認証と認可）」を制御するのに対し、組織のポリシーは「リソースがどのように構成されるか（構成の制限）」を定義する強力なガバナンスツールである。これにより、強力な管理者権限を持つユーザーであっても、企業のコンプライアンス要件に反する操作をシステムレベルでブロックすることが可能となる。ベストプラクティスとして、組織のベースラインとなるセキュリティ要件は組織またはフォルダレベルで適用し、特定の検証が必要なプロジェクトに対してのみ、タグや条件付きルールを用いて例外処理（免除）を設定するアプローチが推奨される。
                </p>
                <table className="ctable">
                    <thead>
                        <tr><th>制約の対象</th><th>ポリシーの機能とセキュリティ上の意義</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>外部IPアクセスの制限</strong><br /><code style={{ fontSize: '11px', color: 'var(--ace-cyan)' }}>constraints/compute.managed.vmExternalIpAccess</code></td>
                            <td>Compute Engineの仮想マシンが外部IPv4アドレスを持つことをデフォルトで禁止する。意図しないインターネットからの直接アクセス（アタックサーフェス）を排除する。</td>
                        </tr>
                        <tr>
                            <td><strong>プロジェクト規模のSSHキーのブロック</strong><br /><code style={{ fontSize: '11px', color: 'var(--ace-cyan)' }}>constraints/compute.managed.blockProjectSshKeys</code></td>
                            <td>プロジェクト全体のメタデータにSSHキーを設定することを防ぎ、インスタンス単位での厳格なアクセス制御を強制する。</td>
                        </tr>
                        <tr>
                            <td><strong>デフォルトサービスアカウントの禁止</strong><br /><code style={{ fontSize: '11px', color: 'var(--ace-cyan)' }}>constraints/container.managed.disallowDefaultComputeServiceAccount</code></td>
                            <td>GKEクラスターのノードプールを作成する際、過剰な権限を持つデフォルトのCompute Engineサービスアカウントの使用を禁じ、最小権限のカスタムサービスアカウントの使用を強制する。</td>
                        </tr>
                        <tr>
                            <td><strong>APIキー作成の無効化</strong><br /><code style={{ fontSize: '11px', color: 'var(--ace-cyan)' }}>constraints/iam.managed.disableServiceAccountApiKeyCreation</code></td>
                            <td>漏洩リスクの高いサービスアカウント用のAPIキーの作成をシステムレベルでブロックし、より安全なWorkload Identity連携などの代替手段への移行を促す。</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

/* ── Chapter 5: gcloud CLI ── */
function Chapter5() {
    return (
        <div id="ch5" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn2">05</div>
                <div className="sec-head-txt">
                    <h2>Chapter 5: gcloud CLI の設定と操作</h2>
                    <p>インストール・gcloud init・Configuration 管理・認証（ADC）・よく使うコマンド集。</p>
                </div>
                <div className="pct-badge pb2">CLI</div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">5.1</span>インストールと初期設定</div>
                <pre className="codeblock">
                    <span className="comment"># Google Cloud SDK のインストール</span>{'\n'}
                    <span className="comment"># macOS (Homebrew)</span>{'\n'}
                    brew install --cask google-cloud-sdk{'\n'}
                    {'\n'}
                    <span className="comment"># Ubuntu/Debian</span>{'\n'}
                    sudo apt-get install google-cloud-cli{'\n'}
                    {'\n'}
                    <span className="comment"># インストール確認</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}version
                </pre>
                <pre className="codeblock">
                    <span className="comment"># 初期設定（インタラクティブ）</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}init{'\n'}
                    {'\n'}
                    <span className="comment"># インタラクティブに以下を設定:</span>{'\n'}
                    <span className="comment"># 1. Google アカウントでログイン（ブラウザが開く）</span>{'\n'}
                    <span className="comment"># 2. デフォルトプロジェクトの選択</span>{'\n'}
                    <span className="comment"># 3. デフォルトリージョン/ゾーンの設定</span>
                </pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">5.2</span>設定（Configuration）の管理</div>
                <pre className="codeblock">{`設定（Configuration）= プロファイルのようなもの
  ├── config: default（デフォルト設定）
  ├── config: dev-project（開発環境用）
  └── config: prod-project（本番環境用）`}</pre>
                <pre className="codeblock">
                    <span className="comment"># 現在の設定を確認</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}config list{'\n'}
                    {'\n'}
                    <span className="comment"># デフォルトプロジェクトを変更</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}config set project PROJECT_ID{'\n'}
                    {'\n'}
                    <span className="comment"># デフォルトリージョンを変更</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}config set compute/region asia-northeast1{'\n'}
                    {'\n'}
                    <span className="comment"># 新しい設定（プロファイル）を作成</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}config configurations create dev-profile{'\n'}
                    {'\n'}
                    <span className="comment"># 設定を切り替え</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}config configurations activate dev-profile{'\n'}
                    {'\n'}
                    <span className="comment"># 設定一覧を表示</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}config configurations list
                </pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">5.3</span>認証（Authentication）の管理</div>
                <pre className="codeblock">
                    <span className="comment"># ----- ユーザー認証 -----</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}auth login{'\n'}
                    <span className="cmd">gcloud</span>{' '}auth list{'\n'}
                    <span className="cmd">gcloud</span>{' '}auth revoke USER_EMAIL{'\n'}
                    {'\n'}
                    <span className="comment"># ----- Application Default Credentials (ADC) -----</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}auth application-default login{'\n'}
                    <span className="cmd">gcloud</span>{' '}auth application-default print-access-token
                </pre>
                <pre className="codeblock">{`ADC（Application Default Credentials）の検索順序:
1. GOOGLE_APPLICATION_CREDENTIALS 環境変数
2. gcloud auth application-default login で設定した認証情報
3. GCE/GKE などのコンピューティング環境の場合はメタデータサーバー`}</pre>
                <p style={{ fontSize: '14px', marginBottom: '0' }}>
                    💡 <strong>試験ポイント</strong>: ローカル開発環境では <code style={{ color: 'var(--ace-cyan)' }}>gcloud auth application-default login</code> を使用します。サービスアカウントの JSON キーをローカルに保存することはセキュリティリスクです。
                </p>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">5.4</span>よく使う gcloud コマンド集</div>
                <pre className="codeblock">
                    <span className="comment"># ----- プロジェクト操作 -----</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}projects list{'\n'}
                    <span className="cmd">gcloud</span>{' '}projects describe PROJECT_ID{'\n'}
                    <span className="cmd">gcloud</span>{' '}config set project PROJECT_ID{'\n'}
                    {'\n'}
                    <span className="comment"># ----- IAM 操作 -----</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}projects get-iam-policy PROJECT_ID{'\n'}
                    <span className="cmd">gcloud</span>{' '}projects add-iam-policy-binding PROJECT_ID \{'\n'}
                    {'  '}<span className="flag">--member=</span><span className="val">&quot;user:alice@example.com&quot;</span> \{'\n'}
                    {'  '}<span className="flag">--role=</span><span className="val">&quot;roles/editor&quot;</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}projects remove-iam-policy-binding PROJECT_ID \{'\n'}
                    {'  '}<span className="flag">--member=</span><span className="val">&quot;user:alice@example.com&quot;</span> \{'\n'}
                    {'  '}<span className="flag">--role=</span><span className="val">&quot;roles/editor&quot;</span>{'\n'}
                    {'\n'}
                    <span className="comment"># ----- API 管理 -----</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}services enable compute.googleapis.com{'\n'}
                    <span className="cmd">gcloud</span>{' '}services list <span className="flag">--enabled</span>{'\n'}
                    {'\n'}
                    <span className="comment"># ----- リージョン/ゾーン -----</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}compute regions list{'\n'}
                    <span className="cmd">gcloud</span>{' '}compute zones list
                </pre>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: gcloud CLI</div>
                    <ol>
                        <li><code style={{ color: 'var(--ace-cyan)' }}>gcloud config configurations</code> で環境（dev/prod）ごとにプロファイルを作成する</li>
                        <li>ローカル開発には <code style={{ color: 'var(--ace-cyan)' }}>gcloud auth application-default login</code> を使用し、JSON キーは使わない</li>
                        <li>スクリプトでは <code style={{ color: 'var(--ace-cyan)' }}>--quiet</code> フラグと <code style={{ color: 'var(--ace-cyan)' }}>--format=json</code> を使って処理を自動化する</li>
                        <li>CI/CD では Workload Identity Federation を使用し、JSON キーを排除する</li>
                    </ol>
                </div>
                <div className="src">
                    <div className="srct">参照リソース</div>
                    <a href="https://cloud.google.com/sdk/docs/configurations" target="_blank" rel="noopener noreferrer">https://cloud.google.com/sdk/docs/configurations</a>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">5.5</span>エンタープライズ視点: CLI インストールと複数環境管理</div>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    特筆すべきは、Google Cloud Consoleに統合されている「Cloud Shell」の存在である。Cloud Shellを起動すると、最新のCloud CLIツール群（gcloud、bq、gsutil、kubectlなど）がプリインストールされた一時的な（エフェメラルな）Linuxコンテナが即座に立ち上がり、現在コンソールにログインしているユーザーの認証情報とプロジェクトコンテキストが自動的に引き継がれる。ただし、Cloud Shell内のデータ（ホームディレクトリ以外）はセッション終了後に消去される一時的なものである点に留意が必要である。
                </p>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    実務において、エンジニアは「開発環境（dev）」、「ステージング環境（stg）」、「本番環境（prod）」といった複数のプロジェクトを行き来しながら作業することが日常的である。初期化時に作成された単一の「デフォルト構成（default configuration）」のみに依存して運用を行うことは、致命的なオペレーションミスの温床となる。たとえば、開発環境だと思い込んでデータベースの削除コマンドを実行したところ、実際にはCLIのコンテキストが本番環境のプロジェクトに向いており、本番データを消失させてしまうといった事故である。
                </p>
                <table className="ctable">
                    <thead>
                        <tr><th>コマンド</th><th>実行されるアクションと運用のベストプラクティス</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><code style={{ color: 'var(--ace-cyan)' }}>gcloud config configurations create [NAME]</code></td><td>新しい独立した構成（例：<code style={{ color: 'var(--ace-yellow)' }}>prod-env</code>）を作成する。作成しただけではアクティブにならないため、後続の切り替えが必要。</td></tr>
                        <tr><td><code style={{ color: 'var(--ace-cyan)' }}>gcloud config set project</code></td><td>現在アクティブな構成のプロパティ（プロジェクト）を上書き設定する。ゾーン変更時は <code style={{ color: 'var(--ace-yellow)' }}>compute/zone</code> を指定。</td></tr>
                        <tr><td><code style={{ color: 'var(--ace-cyan)' }}>gcloud config configurations list</code></td><td>ローカルに保存されているすべての構成の一覧を表示し、現在どれがアクティブ（IS_ACTIVE=True）であるかを視覚的に確認する。オペレーション前の安全確認の基本。</td></tr>
                        <tr><td><code style={{ color: 'var(--ace-cyan)' }}>gcloud config configurations activate [NAME]</code></td><td>操作対象の構成（コンテキスト）を明示的に切り替える。以降のgcloudコマンドはすべてこの新しい構成のプロパティに基づいて実行される。</td></tr>
                    </tbody>
                </table>
                <p style={{ fontSize: '14px', marginBottom: '14px', marginTop: '14px' }}>
                    さらに高度な自動化手法として、ディレクトリごとに構成を自動的に切り替えるアプローチが存在する。<code style={{ color: 'var(--ace-cyan)' }}>direnv</code> のような環境変数管理ツールを使用し、プロジェクトのディレクトリ配下に配置した <code style={{ color: 'var(--ace-cyan)' }}>.envrc</code> ファイルに <code style={{ color: 'var(--ace-cyan)' }}>export CLOUDSDK_ACTIVE_CONFIG_NAME=prod-env</code> のように記述する。これにより、ターミナルでディレクトリを移動した瞬間に環境変数が自動的に読み込まれ、gcloudコマンドのコンテキストがディレクトリと完全に同期する。
                </p>
                <table className="ctable">
                    <thead>
                        <tr><th>コマンドラインツール</th><th>対象となる主要リソースと機能</th><th>実行例とユースケース</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><strong><code style={{ color: 'var(--ace-cyan)' }}>gcloud</code></strong></td><td>Compute Engine、VPC、IAM、Cloud Runなど、Google Cloudのコアリソースのプロビジョニングと管理を担う主軸ツール。</td><td><code style={{ color: 'var(--ace-yellow)' }}>gcloud projects add-iam-policy-binding</code> による権限付与や、<code style={{ color: 'var(--ace-yellow)' }}>gcloud auth revoke</code> による認証情報の破棄。</td></tr>
                        <tr><td><strong><code style={{ color: 'var(--ace-cyan)' }}>gsutil</code></strong></td><td>Cloud Storageのオブジェクト操作、バケット管理、アクセス制御（ACL）、ライフサイクル設定に特化している。</td><td><code style={{ color: 'var(--ace-yellow)' }}>gsutil cp</code> や <code style={{ color: 'var(--ace-yellow)' }}>gsutil rsync</code> を用いた大量データの並列アップロードや同期。</td></tr>
                        <tr><td><strong><code style={{ color: 'var(--ace-cyan)' }}>bq</code></strong></td><td>BigQueryに対するSQLクエリの実行、データセットやテーブルのスキーマ管理、ジョブの制御を行う。</td><td><code style={{ color: 'var(--ace-yellow)' }}>bq query</code> によるデータの分析実行や、<code style={{ color: 'var(--ace-yellow)' }}>bq ls -j</code> によるジョブ履歴のリストアップ。</td></tr>
                        <tr><td><strong><code style={{ color: 'var(--ace-cyan)' }}>kubectl</code></strong></td><td>GKEクラスター内のコンテナ化されたワークロード（ポッドやサービス）のデプロイと管理を行う。</td><td><code style={{ color: 'var(--ace-yellow)' }}>gcloud components install kubectl</code> で追加インストール。クラスタ自体は <code style={{ color: 'var(--ace-yellow)' }}>gcloud container clusters create</code>、内部のアプリは <code style={{ color: 'var(--ace-yellow)' }}>kubectl apply</code>。</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

/* ── Chapter 6: 請求先アカウント ── */
function Chapter6() {
    return (
        <div id="ch6" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn3">06</div>
                <div className="sec-head-txt">
                    <h2>Chapter 6: 請求先アカウント（Billing Account）の構造と管理</h2>
                    <p>請求構造、Self-serve vs Invoiced、IAM ロール（billing.admin/viewer/projectManager/costsManager）。</p>
                </div>
                <div className="pct-badge pb3">コスト管理</div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">6.1</span>請求の仕組みを理解する</div>
                <pre className="codeblock">{`【請求の全体構造】

支払いプロファイル（Payment Profile）
  │  ← クレジットカードや銀行口座の情報
  │
  ├── 請求先アカウント A（Billing Account）
  │   ├── Project 1 ← このプロジェクトの料金が請求先 A に請求
  │   ├── Project 2
  │   └── Project 3
  │
  └── 請求先アカウント B（Billing Account）
      ├── Project 4
      └── Project 5`}</pre>
                <table className="ctable">
                    <thead>
                        <tr><th>種類</th><th>説明</th><th>用途</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><strong>Self-serve（セルフサービス）</strong></td><td>クレジットカードで直接支払い</td><td>個人・スタートアップ</td></tr>
                        <tr><td><strong>Invoiced（請求書払い）</strong></td><td>月末に請求書が発行される</td><td>エンタープライズ</td></tr>
                    </tbody>
                </table>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">6.2</span>プロジェクトと請求先アカウントの関係</div>
                <pre className="codeblock">{`重要な仕様:
・1つのプロジェクトは 正確に1つの請求先アカウント にリンク
・1つの請求先アカウントには 複数のプロジェクト をリンク可能
・請求先アカウントがリンクされていないプロジェクトは
  有料APIを使用できない

  Project A ──→ Billing Account X
  Project B ──→ Billing Account X  ✅ 複数プロジェクト → 1つのBA
  Project C ──→ Billing Account Y
  Project D ──→ Billing Account X または Y（どちらか一方のみ）`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">6.3</span>請求先アカウントの IAM ロール</div>
                <table className="ctable">
                    <thead>
                        <tr><th>ロール</th><th>権限</th><th>付与対象の例</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><code style={{ color: 'var(--ace-cyan)' }}>billing.admin</code></td><td>請求先アカウントの完全管理（プロジェクトのリンク含む）</td><td>財務部門の管理者</td></tr>
                        <tr><td><code style={{ color: 'var(--ace-cyan)' }}>billing.viewer</code></td><td>請求情報の閲覧のみ</td><td>財務部門の一般担当者</td></tr>
                        <tr><td><code style={{ color: 'var(--ace-cyan)' }}>billing.projectManager</code></td><td>プロジェクトを請求先アカウントにリンク・アンリンク</td><td>プロジェクト管理者</td></tr>
                        <tr><td><code style={{ color: 'var(--ace-cyan)' }}>billing.costsManager</code></td><td>予算とアラートの管理</td><td>FinOps 担当者</td></tr>
                    </tbody>
                </table>
                <pre className="codeblock">{`【職務分掌の例】

財務部門 Admin: billing.admin
  └── 支払い方法の変更、アカウントの作成

プロジェクトマネージャー: billing.projectManager
  └── プロジェクトを請求先アカウントにリンク
      （支払い方法の変更はできない）

一般エンジニア: billing.viewer
  └── コストを確認するだけ`}</pre>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: 請求先アカウント</div>
                    <ol>
                        <li>部門・事業別に請求先アカウントを分けてコストを独立管理する</li>
                        <li><code style={{ color: 'var(--ace-cyan)' }}>billing.admin</code> ロールは最小限の担当者にのみ付与する</li>
                        <li>リソースにラベル（Labels）を付けてコストセンター別の分析を可能にする</li>
                        <li>請求データを BigQuery にエクスポートして詳細分析を実施する</li>
                    </ol>
                </div>
                <div className="src">
                    <div className="srct">参照リソース</div>
                    <a href="https://docs.cloud.google.com/billing/docs/concepts" target="_blank" rel="noopener noreferrer">https://docs.cloud.google.com/billing/docs/concepts</a>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">6.4</span>エンタープライズ視点: 請求先アカウントの自動化と IAM</div>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    一般的なエンタープライズアーキテクチャでは、企業全体で1つのマスター請求先アカウントを作成し、すべての部門のプロジェクトをそこにリンクさせることで、組織全体の利用状況を統合的に可視化し、ボリュームディスカウントの恩恵を最大化するアプローチが取られる。
                </p>
                <pre className="codeblock">
                    <span className="comment"># 利用可能な請求先アカウント一覧を取得</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}billing accounts list{'\n'}
                    {'\n'}
                    <span className="comment"># プロジェクトを請求先アカウントにリンク</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}billing projects link PROJECT_ID \{'\n'}
                    {'  '}<span className="flag">--billing-account=</span>BILLING_ACCOUNT_ID
                </pre>
                <p style={{ fontSize: '14px', marginBottom: '0' }}>
                    このような自動化を導入することで、開発者が手動でプロジェクトを作成した際に請求設定を忘れるというオペレーションミスを排除できる。
                </p>
            </div>
        </div>
    );
}

/* ── Chapter 7: 予算・アラート・自動コスト制御 ── */
function Chapter7() {
    return (
        <div id="ch7" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn4">07</div>
                <div className="sec-head-txt">
                    <h2>Chapter 7: 予算・アラート・自動コスト制御</h2>
                    <p>予算スコープ設定、3段階アラート、Pub/Sub + Cloud Functions 自動停止アーキテクチャ（Python コード例）、セキュリティリスク対策。</p>
                </div>
                <div className="pct-badge pb4">最重要</div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">7.1</span>予算（Budget）の構成要素</div>
                <pre className="codeblock">{`予算設定の構成要素:

┌─────────────────────────────────────────┐
│  予算名: Monthly API Budget              │
│                                          │
│  スコープ: Project: my-webapp-prod       │
│  期間: 月次（毎月リセット）               │
│  予算金額: $1,000                        │
│                                          │
│  アラート閾値:                            │
│    ├── 50%  → $500  → メール通知         │
│    ├── 90%  → $900  → メール通知         │
│    └── 100% → $1,000 → メール + Pub/Sub  │
└─────────────────────────────────────────┘`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">7.2</span>予算のスコープ設定</div>
                <pre className="codeblock">{`スコープの粒度（大→小）:
  組織全体
    ↓
  特定のフォルダ
    ↓
  特定のプロジェクト（複数も可）
    ↓
  特定のサービス（例: Compute Engine のみ）
    ↓
  特定のラベル（例: env=production のリソースのみ）`}</pre>
                <pre className="codeblock">
                    <span className="comment"># gcloud で予算を作成する例</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}billing budgets create \{'\n'}
                    {'  '}<span className="flag">--billing-account=</span>BILLING_ACCOUNT_ID \{'\n'}
                    {'  '}<span className="flag">--display-name=</span><span className="val">&quot;Monthly Prod Budget&quot;</span> \{'\n'}
                    {'  '}<span className="flag">--budget-amount=</span>1000USD \{'\n'}
                    {'  '}<span className="flag">--threshold-rule=</span>percent=0.5 \{'\n'}
                    {'  '}<span className="flag">--threshold-rule=</span>percent=0.9 \{'\n'}
                    {'  '}<span className="flag">--threshold-rule=</span>percent=1.0 \{'\n'}
                    {'  '}<span className="flag">--filter-projects=</span>projects/my-webapp-prod
                </pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">7.3</span>⚠️ 最重要: 予算上限でリソースは自動停止しない！</div>
                <div className="wb">
                    <strong>これは ACE 試験で最もよく問われるポイントです！</strong>
                </div>
                <pre className="codeblock">{`【よくある誤解】
  予算の上限に達したら → Google が自動でリソースを停止してくれる

【正しい動作】
  予算の上限に達したら → 通知が来るだけ
                        → リソースは停止しない！
                        → 課金は継続される！

自動停止を実現するには、自分でアーキテクチャを組む必要があります`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">7.4</span>自動コスト制御アーキテクチャ</div>
                <pre className="codeblock">{`┌──────────────────────────────────────────────────────────┐
│                                                          │
│  ① 予算の100%閾値に到達                                   │
│           ↓                                              │
│  ② Cloud Billing が Pub/Sub トピックにメッセージを発行   │
│           ↓                                              │
│  ③ Cloud Functions が Pub/Sub をトリガーとして起動       │
│           ↓                                              │
│  ④ Cloud Functions が GCP API を呼び出してリソース操作   │
│     例: VM を停止、プロジェクトをシャットダウン           │
│                                                          │
└──────────────────────────────────────────────────────────┘`}</pre>
                <p style={{ fontSize: '14px', marginBottom: '8px' }}><strong>実装例: Cloud Functions で VM を自動停止（Python）</strong></p>
                <pre className="codeblock">{`# Cloud Functions のコード例（Python）
import base64
import json
import googleapiclient.discovery

def stop_billing(data, context):
    """予算アラートを受け取ってVMを停止する"""
    # Pub/Sub メッセージをデコード
    pubsub_data = base64.b64decode(data['data']).decode('utf-8')
    budget_notification = json.loads(pubsub_data)

    # 予算超過を確認
    cost_amount = budget_notification['costAmount']
    budget_amount = budget_notification['budgetAmount']

    if cost_amount >= budget_amount:
        # Compute Engine API を使って VM を停止
        compute = googleapiclient.discovery.build('compute', 'v1')
        compute.instances().stop(
            project='my-project',
            zone='asia-northeast1-a',
            instance='my-vm-instance'
        ).execute()
        print(f"VM stopped due to budget exceeded: {cost_amount}")`}</pre>
                <p style={{ fontSize: '14px', marginBottom: '8px' }}><strong>より高度なパターン: プロジェクト全体を無効化</strong></p>
                <pre className="codeblock">{`def disable_billing(project_id):
    """プロジェクトから請求先アカウントを切り離す（全リソース停止）"""
    billing = googleapiclient.discovery.build('cloudbilling', 'v1')

    # 請求先アカウントのリンクを解除
    billing.projects().updateBillingInfo(
        name=f'projects/{project_id}',
        body={'billingAccountName': ''}  # 空文字でリンク解除
    ).execute()`}</pre>
                <div className="wb">
                    ⚠️ <strong>注意</strong>: プロジェクトから請求先アカウントをリンク解除すると、すべてのリソースが停止します。本番環境での使用は慎重に！
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">7.5</span>コストを発生させるセキュリティリスクと対策</div>
                <pre className="codeblock">{`【リスク①: 認証情報の漏洩 → 暗号資産マイニング】
開発者が誤って GitHub に
サービスアカウントの JSON キーを公開
    ↓
攻撃者がキーを発見して即座に悪用
    ↓
大量の高性能 VM や GPU インスタンスを起動
    ↓
数時間で数百万円の請求が発生！`}</pre>
                <p style={{ fontSize: '14px', marginBottom: '8px' }}><strong>対策</strong>:</p>
                <ul style={{ fontSize: '14px', paddingLeft: '20px', marginBottom: '14px' }}>
                    <li><code style={{ color: 'var(--ace-cyan)' }}>constraints/iam.disableServiceAccountKeyCreation</code> を有効化してキー生成を禁止</li>
                    <li>Secret Scanner（GitHub の機能）でキーの誤コミットを検出</li>
                    <li>VM インスタンスの作成に上限クォータを設定</li>
                </ul>
                <pre className="codeblock">{`【リスク②: DDoS 攻撃 → オートスケールによるコスト急増】
悪意のある大量トラフィック（DDoS 攻撃）
    ↓
Cloud Load Balancing が大量のリクエストを受信
    ↓
バックエンドのオートスケーリングが発動
    ↓
VM が大量に起動 → 攻撃が終わっても請求は発生！`}</pre>
                <pre className="codeblock">
                    <span className="comment"># Cloud Armor のセキュリティポリシーを作成</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}compute security-policies create my-ddos-policy \{'\n'}
                    {'  '}<span className="flag">--description=</span><span className="val">&quot;DDoS protection policy&quot;</span>{'\n'}
                    {'\n'}
                    <span className="comment"># レート制限ルールを追加（1IPあたり1000リクエスト/分）</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}compute security-policies rules create 1000 \{'\n'}
                    {'  '}<span className="flag">--security-policy=</span>my-ddos-policy \{'\n'}
                    {'  '}<span className="flag">--expression=</span><span className="val">&quot;true&quot;</span> \{'\n'}
                    {'  '}<span className="flag">--action=</span>rate-based-ban \{'\n'}
                    {'  '}<span className="flag">--rate-limit-threshold-count=</span>1000 \{'\n'}
                    {'  '}<span className="flag">--rate-limit-threshold-interval-sec=</span>60 \{'\n'}
                    {'  '}<span className="flag">--ban-duration-sec=</span>600
                </pre>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: 予算とコスト管理</div>
                    <ol>
                        <li><strong>すべてのプロジェクトに予算アラートを設定</strong>（予期せぬ課金の早期発見）</li>
                        <li><strong>50%, 90%, 100% の3段階でアラートを設定</strong>（段階的な把握と対応が可能）</li>
                        <li><strong>100% 閾値には Pub/Sub も設定</strong>（自動制御の起点）</li>
                        <li><strong>予算金額は「前月支出の 120%」などで設定</strong>（異常なコスト増を検知）</li>
                        <li><strong>Cloud Armor と MIG の上限設定を必ず実施</strong>（セキュリティ起因のコスト急増を防止）</li>
                        <li><strong>Billing データを BigQuery にエクスポート</strong>（詳細分析と監査の基盤）</li>
                    </ol>
                </div>
                <div className="src">
                    <div className="srct">参照リソース</div>
                    <a href="https://docs.cloud.google.com/billing/docs/how-to/budgets" target="_blank" rel="noopener noreferrer">https://docs.cloud.google.com/billing/docs/how-to/budgets</a>
                    <a href="https://medium.com/qodea/budget-alerts-caps-in-google-cloud-76ff71929b42" target="_blank" rel="noopener noreferrer">Budget Alerts &amp; &apos;Caps&apos; in Google Cloud (Medium)</a>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">7.6</span>エンタープライズ視点: プログラム駆動型コスト制御</div>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    初学者が最も誤解しやすいポイントは、「予算を設定すれば、その金額に達した時点で自動的にリソースが停止し、課金が止まる」という思い込みである。Google Cloudのデフォルトの予算アラートは、あくまで「メール等による情報提供」に過ぎず、APIの利用を自動的にブロックする機能は持っていない。
                </p>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    真の意味で予算を上限（キャップ）として機能させ、過剰な請求を強制的に防ぐためには、「Programmatic Notifications（プログラムによる予算通知）」のアーキテクチャを構築する必要がある。
                </p>
                <table className="ctable">
                    <thead>
                        <tr><th>予算のスコープ設定</th><th>適用シナリオと運用上の利点</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><strong>請求先アカウント全体</strong></td><td>企業全体のクラウド支出の総額を監視するマクロレベルの防衛線。財務部門向けのアラート設定に適する。</td></tr>
                        <tr><td><strong>プロジェクト / フォルダ単位</strong></td><td>開発環境や特定の事業部門ごとに予算を割り当て、チーム単位でのコストに対する説明責任（アカウンタビリティ）を確立する。</td></tr>
                        <tr><td><strong>サービス単位</strong></td><td>BigQueryやCompute Engineなど、コストが急増しやすい特定の高単価サービスに限定して予算を設定し、異常な使用量を早期に検知する。</td></tr>
                        <tr><td><strong>ラベル（Labels）ベース</strong></td><td>リソースに付与されたメタデータ（例：<code style={{ color: 'var(--ace-cyan)' }}>env:staging</code> や <code style={{ color: 'var(--ace-cyan)' }}>team:backend</code>）に基づいてコストを集計する。プロジェクトの枠を超えたマイクロサービスアーキテクチャのコスト管理に極めて有効。</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

/* ── Chapter 8: BigQuery コスト分析 ── */
function Chapter8() {
    return (
        <div id="ch8" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn1">08</div>
                <div className="sec-head-txt">
                    <h2>Chapter 8: コストの可視化と BigQuery 分析</h2>
                    <p>Billing データ BigQuery エクスポート、SQL クエリによるコスト分析、ラベル戦略、Looker Studio 連携。</p>
                </div>
                <div className="pct-badge pb1">FinOps</div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">8.1</span>BigQuery への Billing データエクスポート</div>
                <pre className="codeblock">{`Cloud Billing Console だけでは:
  ✗ 過去データは限られた期間しか見られない
  ✗ 複雑なカスタムクエリは実行できない
  ✗ 複数の請求先アカウントの横断分析が難しい

BigQuery エクスポートにより:
  ✓ 全期間のコストデータを保持
  ✓ SQL で自由に分析可能
  ✓ Looker Studio などで可視化
  ✓ 監査証跡として活用`}</pre>
                <pre className="codeblock">{`BigQuery エクスポートの設定手順:

1. Cloud Billing → 請求先アカウントを選択
2. 「課金データのエクスポート」をクリック
3. BigQuery エクスポートを選択
4. 以下を設定:
   - プロジェクト: billing-data-project
   - データセット: billing_export
5. 保存

→ 以降、課金データが BigQuery に自動で書き込まれる`}</pre>
                <table className="ctable">
                    <thead>
                        <tr><th>データ種類</th><th>内容</th><th>用途</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><strong>標準課金データ</strong></td><td>日次の詳細な使用量と費用</td><td>日々のコスト分析</td></tr>
                        <tr><td><strong>詳細課金データ（リソースベース）</strong></td><td>リソースレベルの詳細なコストデータ</td><td>細粒度の分析</td></tr>
                        <tr><td><strong>料金データ</strong></td><td>SKU ごとの料金表</td><td>コスト計算・予測</td></tr>
                    </tbody>
                </table>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">8.2</span>BigQuery でのコスト分析クエリ例</div>
                <pre className="codeblock">{`-- プロジェクト別の月次コストを集計
SELECT
  project.id AS project_id,
  FORMAT_DATE('%Y-%m', DATE(usage_start_time)) AS month,
  SUM(cost) AS total_cost,
  currency
FROM
  \`my_project.billing_export.gcp_billing_export_v1_XXXXXX\`
WHERE
  DATE(usage_start_time) >= DATE_SUB(CURRENT_DATE(), INTERVAL 6 MONTH)
GROUP BY
  project_id, month, currency
ORDER BY
  month DESC, total_cost DESC;

-- サービス別コストのトップ10
SELECT
  service.description AS service_name,
  ROUND(SUM(cost), 2) AS total_cost
FROM
  \`my_project.billing_export.gcp_billing_export_v1_XXXXXX\`
WHERE
  DATE(usage_start_time) >= DATE_TRUNC(CURRENT_DATE(), MONTH)
GROUP BY
  service_name
ORDER BY
  total_cost DESC
LIMIT 10;`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">8.3</span>コスト最適化のためのラベル（Labels）戦略</div>
                <pre className="codeblock">{`【推奨ラベル一覧】

env: production / staging / development
team: backend / frontend / data
cost-center: engineering / marketing / finance
app: webapp / api / batch
owner: alice / bob`}</pre>
                <pre className="codeblock">
                    <span className="comment"># VM インスタンスにラベルを付ける</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}compute instances add-labels INSTANCE_NAME \{'\n'}
                    {'  '}<span className="flag">--labels=</span>env=production,team=backend,cost-center=engineering{'\n'}
                    {'\n'}
                    <span className="comment"># Cloud Storage バケットにラベルを付ける</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}storage buckets update gs://BUCKET_NAME \{'\n'}
                    {'  '}<span className="flag">--update-labels=</span>env=production,team=data
                </pre>
                <pre className="codeblock">{`-- チーム別のコスト分析（ラベル付き）
SELECT
  labels.value AS team,
  SUM(cost) AS total_cost
FROM
  \`billing_export.gcp_billing_export_v1_XXXXXX\`,
  UNNEST(labels) AS labels
WHERE
  labels.key = 'team'
  AND DATE(usage_start_time) >= DATE_TRUNC(CURRENT_DATE(), MONTH)
GROUP BY
  team
ORDER BY
  total_cost DESC;`}</pre>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: コスト分析</div>
                    <ol>
                        <li>BigQuery への Billing データエクスポートは <strong>今すぐ有効化</strong>（過去データは取得できない）</li>
                        <li>すべてのリソースに <strong>ラベルを付ける標準化ポリシー</strong> を組織で策定する</li>
                        <li>Looker Studio（旧 Data Studio）で <strong>コストダッシュボードを構築</strong>して定期共有</li>
                        <li><strong>コミット使用割引（CUD）</strong> を活用して定常的な Compute Engine の利用コストを削減</li>
                    </ol>
                </div>
                <div className="src">
                    <div className="srct">参照リソース</div>
                    <a href="https://docs.cloud.google.com/billing/docs/how-to/export-data-bigquery" target="_blank" rel="noopener noreferrer">https://docs.cloud.google.com/billing/docs/how-to/export-data-bigquery</a>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">8.4</span>エンタープライズ視点: BigQuery FinOps 分析</div>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    エクスポート設定を有効にすると、その時点以降の請求データが定期的に指定したBigQueryデータセットに自動的にストリーミングされる（過去のデータは遡ってエクスポートされないため、プロジェクト設立直後の設定が不可欠である）。
                </p>
                <table className="ctable">
                    <thead>
                        <tr><th>エクスポートデータの種類</th><th>スキーマの特徴と分析のユースケース</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>標準データエクスポート (Standard)</strong></td>
                            <td>プロジェクト、サービス、リージョン、SKUごとの日々の使用量とコストの概要データを含む。一般的な部門別月次レポートの作成や、全体的なトレンド分析に適している。</td>
                        </tr>
                        <tr>
                            <td><strong>詳細データエクスポート (Detailed)</strong></td>
                            <td>標準データに加え、仮想マシンやディスクなどの個別の「リソースIDレベル」の精緻な課金データが含まれる。リソースの最適化（無駄なインスタンスの特定）や、ラベル付け戦略の有効性を検証するFinOpsの要となる。</td>
                        </tr>
                        <tr>
                            <td><strong>料金・CUDメタデータエクスポート</strong></td>
                            <td>利用可能なSKUの最新の価格表や、確約利用割引（Committed Use Discounts）に関する詳細なメタデータを含む。割引の適用効率を分析し、将来の予約リソース購入計画を立てるために使用する。</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

/* ── Chapter 9: Cloud API 管理 ── */
function Chapter9() {
    return (
        <div id="ch9" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn2">09</div>
                <div className="sec-head-txt">
                    <h2>Chapter 9: Cloud API の有効化と管理</h2>
                    <p>API の有効化（Console・gcloud・Terraform）、主要 API 一覧、認証方式、クォータ管理。</p>
                </div>
                <div className="pct-badge pb2">API 管理</div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">9.1</span>Google Cloud API の基本概念</div>
                <pre className="codeblock">{`新規プロジェクト作成直後:
  ├── Compute Engine API: ❌ 無効
  ├── Cloud Storage API: ❌ 無効
  ├── Cloud SQL Admin API: ❌ 無効
  └── ...（ほぼすべて無効）

↓ 使いたいAPIを有効化する必要がある

有効化後:
  ├── Compute Engine API: ✅ 有効 → VM を作成できる
  ├── Cloud Storage API: ✅ 有効 → バケットを作成できる
  └── ...`}</pre>
                <p style={{ fontSize: '14px', marginBottom: '0' }}>
                    💡 <strong>なぜデフォルトで無効？</strong>: セキュリティ上の理由から、使わないAPIは無効にしておくことで攻撃面（アタックサーフェス）を最小化します。
                </p>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">9.2</span>API の有効化方法（3通り）</div>
                <pre className="codeblock">
                    <span className="comment"># 単一の API を有効化</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}services enable compute.googleapis.com{'\n'}
                    {'\n'}
                    <span className="comment"># 複数の API を一度に有効化</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}services enable \{'\n'}
                    {'  '}compute.googleapis.com \{'\n'}
                    {'  '}storage.googleapis.com \{'\n'}
                    {'  '}sqladmin.googleapis.com \{'\n'}
                    {'  '}container.googleapis.com \{'\n'}
                    {'  '}cloudrun.googleapis.com{'\n'}
                    {'\n'}
                    <span className="comment"># 有効化されている API の一覧</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}services list <span className="flag">--enabled</span>{'\n'}
                    {'\n'}
                    <span className="comment"># API を無効化</span>{'\n'}
                    <span className="cmd">gcloud</span>{' '}services disable compute.googleapis.com
                </pre>
                <p style={{ fontSize: '14px', marginBottom: '8px' }}><strong>Terraform による API 有効化（IaC）</strong></p>
                <pre className="codeblock">{`# 複数の API をまとめて有効化
locals {
  services = [
    "compute.googleapis.com",
    "storage.googleapis.com",
    "sqladmin.googleapis.com",
    "container.googleapis.com",
  ]
}

resource "google_project_service" "apis" {
  for_each = toset(local.services)

  project            = var.project_id
  service            = each.value
  disable_on_destroy = false  # Terraform 削除時にサービス中断を防ぐ
}`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">9.3</span>主要な API と対応するサービス</div>
                <table className="ctable">
                    <thead>
                        <tr><th>API 名</th><th>サービス</th><th>有効化が必要な操作</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><code style={{ color: 'var(--ace-cyan)' }}>compute.googleapis.com</code></td><td>Compute Engine</td><td>VM の作成・管理</td></tr>
                        <tr><td><code style={{ color: 'var(--ace-cyan)' }}>storage.googleapis.com</code></td><td>Cloud Storage</td><td>バケットの作成・管理</td></tr>
                        <tr><td><code style={{ color: 'var(--ace-cyan)' }}>container.googleapis.com</code></td><td>GKE</td><td>Kubernetes クラスタの作成</td></tr>
                        <tr><td><code style={{ color: 'var(--ace-cyan)' }}>run.googleapis.com</code></td><td>Cloud Run</td><td>コンテナアプリのデプロイ</td></tr>
                        <tr><td><code style={{ color: 'var(--ace-cyan)' }}>sqladmin.googleapis.com</code></td><td>Cloud SQL</td><td>DB インスタンスの作成</td></tr>
                        <tr><td><code style={{ color: 'var(--ace-cyan)' }}>bigquery.googleapis.com</code></td><td>BigQuery</td><td>データウェアハウスの利用</td></tr>
                        <tr><td><code style={{ color: 'var(--ace-cyan)' }}>cloudfunctions.googleapis.com</code></td><td>Cloud Functions</td><td>関数のデプロイ</td></tr>
                        <tr><td><code style={{ color: 'var(--ace-cyan)' }}>pubsub.googleapis.com</code></td><td>Pub/Sub</td><td>メッセージングの利用</td></tr>
                        <tr><td><code style={{ color: 'var(--ace-cyan)' }}>secretmanager.googleapis.com</code></td><td>Secret Manager</td><td>シークレットの管理</td></tr>
                        <tr><td><code style={{ color: 'var(--ace-cyan)' }}>iam.googleapis.com</code></td><td>IAM</td><td>IAM の高度な操作</td></tr>
                        <tr><td><code style={{ color: 'var(--ace-cyan)' }}>cloudresourcemanager.googleapis.com</code></td><td>Resource Manager</td><td>プロジェクト・フォルダの管理</td></tr>
                        <tr><td><code style={{ color: 'var(--ace-cyan)' }}>monitoring.googleapis.com</code></td><td>Cloud Monitoring</td><td>カスタムメトリクスの送信</td></tr>
                        <tr><td><code style={{ color: 'var(--ace-cyan)' }}>logging.googleapis.com</code></td><td>Cloud Logging</td><td>ログの書き込み</td></tr>
                    </tbody>
                </table>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">9.4</span>API の認証方式と API キー</div>
                <pre className="codeblock">{`【推奨度: 高】
  Workload Identity Federation
    ├── AWS、Azure、GitHub Actions などから GCP API にアクセス
    └── JSON キー不要、動的なクレデンシャルを使用

  Application Default Credentials (ADC)
    ├── ローカル開発環境での利用
    └── gcloud auth application-default login で設定

  インスタンスに紐付けられたサービスアカウント
    ├── GCE / GKE 上のアプリが GCP API にアクセス
    └── JSON キー不要、メタデータサーバーから自動取得

【推奨度: 低（非推奨）】
  サービスアカウント JSON キー
    ├── ローカルファイルに秘密鍵を保存
    ├── 漏洩リスクが高い
    └── 緊急時を除き使用しない`}</pre>
                <pre className="codeblock">{`API キーの使い分け:
  ✅ Google Maps JavaScript API（フロントエンドから利用）
  ✅ YouTube Data API など公開データの取得
  ❌ Cloud Storage や Compute Engine などの管理 API`}</pre>
                <div className="bp">
                    <div className="bpt">ベストプラクティス: API 管理</div>
                    <ol>
                        <li><strong>最小権限の原則</strong>: 必要な API だけを有効化する</li>
                        <li>Terraform で API の有効化を <strong>IaC 化</strong> して環境再現性を確保</li>
                        <li><code style={{ color: 'var(--ace-cyan)' }}>disable_on_destroy = false</code> を設定して Terraform 削除時のサービス中断を防ぐ</li>
                        <li><strong>API キーは公開 API にのみ使用</strong>、クラウドリソース管理には使用しない</li>
                        <li>API キーを使う場合は <strong>制限（HTTP リファラー / IP アドレス制限）</strong> を必ず設定</li>
                        <li>クォータの利用状況を <strong>Cloud Monitoring</strong> で監視してアラートを設定</li>
                    </ol>
                </div>
                <div className="src">
                    <div className="srct">参照リソース</div>
                    <a href="https://cloud.google.com/apis/docs/overview" target="_blank" rel="noopener noreferrer">https://cloud.google.com/apis/docs/overview</a>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">9.5</span>エンタープライズ視点: API 依存関係と Operations Suite</div>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    API管理における高度な洞察として、API間の「依存関係」の理解が挙げられる。特定のAPI（例：GKE API）を有効化すると、それが依存する基盤となるAPI（例：Compute Engine API）も非同期に有効化される。TerraformなどのIaCツールを使用してAPIを一括で有効化する際、この非同期的な有効化プロセスと依存関係が原因で競合状態（レースコンディション）が発生することがある。そのため、ベストプラクティスとしては、アプリケーションの実行に真に必要なAPIのみを厳格に特定して有効化し、攻撃者が利用可能なアタックサーフェス（攻撃面）を最小限に抑えることが推奨される。
                </p>
                <p style={{ fontSize: '14px', marginBottom: '0' }}>
                    クラウド環境にデプロイされたリソースの正常性を確保し、障害に迅速に対応するためには、包括的なオブザーバビリティ（可観測性）基盤が必要である。Cloud Monitoringを使用するためには、プロジェクトを「指標スコープ（Metrics Scope）」に追加してワークスペースを構築する。指標スコープの強力な点は、単一のプロジェクト内のリソースだけでなく、複数のGoogle CloudプロジェクトやAWS環境のメトリクスを単一のガラス板（Single Pane of Glass）で一元的に監視できることである。
                </p>
            </div>
        </div>
    );
}

/* ── Chapter 10: 試験対策まとめ ── */
function Chapter10() {
    return (
        <div id="ch10" className="sgap">
            <div className="sec-head">
                <div className="sec-num sn3">10</div>
                <div className="sec-head-txt">
                    <h2>Chapter 10: Domain 1 試験対策まとめ</h2>
                    <p>出題パターン別頻出トピック、重要用語一覧、試験直前チェックリスト、推奨学習リソース。</p>
                </div>
                <div className="pct-badge pb3">直前確認</div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">10.1</span>出題パターン別の頻出トピック</div>
                <pre className="codeblock">{`【パターン①: リソース階層の設計問題】
典型的な問題文:
「A 社は 3 つの部門（開発・営業・財務）を持ち、
 各部門が複数の環境（開発・本番）を持つ。
 最適なリソース階層はどれか？」

解答の考え方:
Organization: a-company.com
├── Folder: 開発部門
│   ├── Project: dev-dept-dev
│   └── Project: dev-dept-prod
├── Folder: 営業部門
│   ├── Project: sales-dept-dev
│   └── Project: sales-dept-prod
└── Folder: 財務部門
    ├── Project: finance-dept-dev
    └── Project: finance-dept-prod

→ 各部門でフォルダを作り、環境ごとにプロジェクトを分ける
→ 共通のポリシーは上位フォルダで一括設定`}</pre>
                <pre className="codeblock">{`【パターン②: コスト管理の自動化問題】
典型的な問題文:
「開発チームが予算を超えた場合、自動的に VM を停止させたい。
 どのアーキテクチャが正しいか？」

正解パターン:
予算アラート（Pub/Sub 通知設定）
    ↓
Pub/Sub トピック
    ↓
Cloud Functions
    ↓
Compute Engine API で VM 停止

よくある不正解:
「予算に上限金額を設定すれば自動停止される」
→ 誤り！予算上限ではリソースは止まりません！`}</pre>
                <pre className="codeblock">{`【パターン③: 組織ポリシーの適用問題】
典型的な問題文:
「本番環境のプロジェクトで外部IPを持つVMを作成できないよう
 強制したい。どうするか？」

正解:
組織ポリシー: constraints/compute.disableExternalIpAddresses
を本番環境フォルダに適用する

IAM との違いを理解する:
IAM: 「誰が」VM を作成できるか → ユーザーへの権限付与
組織ポリシー: 「どんな VM を」作れるか → リソース設定の強制`}</pre>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">10.2</span>Domain 1 重要用語の一覧</div>
                <table className="ctable">
                    <thead>
                        <tr><th>用語</th><th>説明</th><th>試験での重要度</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><strong>Organization</strong></td><td>階層の最上位ノード。Google Workspace/Cloud Identity に紐付く</td><td>⭐⭐⭐</td></tr>
                        <tr><td><strong>Folder</strong></td><td>Organization と Project の中間。部門・環境の分離に使用</td><td>⭐⭐⭐</td></tr>
                        <tr><td><strong>Project ID</strong></td><td>グローバルに一意、変更不可</td><td>⭐⭐⭐</td></tr>
                        <tr><td><strong>IAM ポリシーの継承</strong></td><td>上位から下位へ自動継承。下位での取り消し不可（原則）</td><td>⭐⭐⭐</td></tr>
                        <tr><td><strong>Billing Account</strong></td><td>プロジェクトに正確に1つリンク</td><td>⭐⭐⭐</td></tr>
                        <tr><td><strong>予算アラート</strong></td><td>閾値到達で通知のみ。リソース停止はしない</td><td>⭐⭐⭐</td></tr>
                        <tr><td><strong>Pub/Sub + Cloud Functions</strong></td><td>自動コスト制御の実現手段</td><td>⭐⭐⭐</td></tr>
                        <tr><td><strong>BigQuery Billing Export</strong></td><td>詳細コスト分析の基盤</td><td>⭐⭐</td></tr>
                        <tr><td><strong>Organization Policy</strong></td><td>リソース設定の強制（IAM とは別）</td><td>⭐⭐⭐</td></tr>
                        <tr><td><strong>gcloud config</strong></td><td>プロジェクト・アカウントの切り替え</td><td>⭐⭐</td></tr>
                        <tr><td><strong>ADC</strong></td><td>ローカル開発での推奨認証方法</td><td>⭐⭐</td></tr>
                    </tbody>
                </table>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">10.3</span>試験直前チェックリスト（Domain 1）</div>
                <p style={{ fontSize: '14px', marginBottom: '8px' }}><strong>リソース階層とガバナンス</strong></p>
                <ul style={{ fontSize: '14px', paddingLeft: '20px', lineHeight: '2' }}>
                    <li>☐ Organization → Folder → Project → Resource の順序を説明できる</li>
                    <li>☐ IAM ポリシーが上位から下位へ <strong>継承</strong> されることを知っている</li>
                    <li>☐ 下位レベルで上位の IAM ポリシーを <strong>取り消せない</strong> ことを知っている</li>
                    <li>☐ Project ID は <strong>グローバルに一意で変更不可</strong> だと知っている</li>
                    <li>☐ 削除したプロジェクトは <strong>30日以内</strong> なら復元できることを知っている</li>
                    <li>☐ Google Workspace または Cloud Identity がないと Organization は作れないことを知っている</li>
                </ul>
                <p style={{ fontSize: '14px', marginBottom: '8px', marginTop: '14px' }}><strong>組織ポリシー</strong></p>
                <ul style={{ fontSize: '14px', paddingLeft: '20px', lineHeight: '2' }}>
                    <li>☐ 組織ポリシーと IAM の違い（設定の強制 vs アクセス制御）を説明できる</li>
                    <li>☐ <code style={{ color: 'var(--ace-cyan)' }}>constraints/iam.disableServiceAccountKeyCreation</code> の効果を説明できる</li>
                    <li>☐ <code style={{ color: 'var(--ace-cyan)' }}>constraints/gcp.resourceLocations</code> の効果を説明できる</li>
                </ul>
                <p style={{ fontSize: '14px', marginBottom: '8px', marginTop: '14px' }}><strong>請求とコスト管理</strong></p>
                <ul style={{ fontSize: '14px', paddingLeft: '20px', lineHeight: '2' }}>
                    <li>☐ 1つのプロジェクトは <strong>正確に1つ</strong> の請求先アカウントにリンクされることを知っている</li>
                    <li>☐ 予算アラートが上限に達してもリソースは <strong>自動停止しない</strong> ことを知っている</li>
                    <li>☐ 自動停止には <strong>Pub/Sub + Cloud Functions</strong> が必要なことを知っている</li>
                    <li>☐ BigQuery への Billing データエクスポートの目的と設定方法を知っている</li>
                    <li>☐ ラベルを使ったコストセンター別分析の方法を知っている</li>
                    <li>☐ DDoS → オートスケール → コスト急増のリスクと対策（Cloud Armor）を知っている</li>
                </ul>
                <p style={{ fontSize: '14px', marginBottom: '8px', marginTop: '14px' }}><strong>gcloud CLI と API 管理</strong></p>
                <ul style={{ fontSize: '14px', paddingLeft: '20px', lineHeight: '2' }}>
                    <li>☐ <code style={{ color: 'var(--ace-cyan)' }}>gcloud config set project</code> でプロジェクトを切り替えられる</li>
                    <li>☐ <code style={{ color: 'var(--ace-cyan)' }}>gcloud config configurations</code> で複数プロファイルを管理できる</li>
                    <li>☐ <code style={{ color: 'var(--ace-cyan)' }}>gcloud auth application-default login</code> の目的を説明できる</li>
                    <li>☐ 新規プロジェクトでは API を個別に有効化する必要があることを知っている</li>
                    <li>☐ <code style={{ color: 'var(--ace-cyan)' }}>gcloud services enable</code> で API を有効化できる</li>
                </ul>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">10.4</span>推奨学習リソース（Domain 1）</div>
                <table className="ctable">
                    <thead>
                        <tr><th>リソース</th><th>内容</th><th>URL</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><strong>ACE 試験公式ページ</strong></td><td>試験構造・登録方法</td><td><a href="https://cloud.google.com/learn/certification/cloud-engineer?hl=en" target="_blank" rel="noopener noreferrer">cloud.google.com/learn/certification/cloud-engineer</a></td></tr>
                        <tr><td><strong>試験ガイド（公式 PDF）</strong></td><td>出題範囲の詳細</td><td><a href="https://services.google.com/fh/files/misc/associate_cloud_engineer_exam_guide_english.pdf" target="_blank" rel="noopener noreferrer">services.google.com/.../exam_guide_english.pdf</a></td></tr>
                        <tr><td><strong>リソース階層ドキュメント</strong></td><td>Organization/Folder/Project の詳細</td><td><a href="https://docs.cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy" target="_blank" rel="noopener noreferrer">docs.cloud.google.com/resource-manager/...</a></td></tr>
                        <tr><td><strong>IAM 継承のドキュメント</strong></td><td>ポリシー継承の詳細</td><td><a href="https://docs.cloud.google.com/iam/docs/resource-hierarchy-access-control" target="_blank" rel="noopener noreferrer">docs.cloud.google.com/iam/docs/...</a></td></tr>
                        <tr><td><strong>組織ポリシーの概要</strong></td><td>組織ポリシーの設定方法</td><td><a href="https://cloud.google.com/resource-manager/docs/organization-policy/overview" target="_blank" rel="noopener noreferrer">cloud.google.com/resource-manager/...</a></td></tr>
                        <tr><td><strong>予算アラートのドキュメント</strong></td><td>予算・アラートの設定</td><td><a href="https://docs.cloud.google.com/billing/docs/how-to/budgets" target="_blank" rel="noopener noreferrer">docs.cloud.google.com/billing/docs/how-to/budgets</a></td></tr>
                        <tr><td><strong>Billing エクスポートの設定</strong></td><td>BigQuery への課金データエクスポート</td><td><a href="https://docs.cloud.google.com/billing/docs/how-to/export-data-bigquery" target="_blank" rel="noopener noreferrer">docs.cloud.google.com/billing/docs/how-to/...</a></td></tr>
                        <tr><td><strong>gcloud 設定ドキュメント</strong></td><td>gcloud CLI の設定方法</td><td><a href="https://cloud.google.com/sdk/docs/configurations" target="_blank" rel="noopener noreferrer">cloud.google.com/sdk/docs/configurations</a></td></tr>
                        <tr><td><strong>IAM ベストプラクティス</strong></td><td>権限設計のベストプラクティス</td><td><a href="https://cloud.google.com/blog/products/identity-security/iam-best-practice-guides-available-now" target="_blank" rel="noopener noreferrer">cloud.google.com/blog/.../iam-best-practice-guides</a></td></tr>
                        <tr><td><strong>Cloud Billing の概要</strong></td><td>請求先アカウントの仕組み</td><td><a href="https://docs.cloud.google.com/billing/docs/concepts" target="_blank" rel="noopener noreferrer">docs.cloud.google.com/billing/docs/concepts</a></td></tr>
                    </tbody>
                </table>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">10.5</span>エンタープライズ視点: Domain 1 の結論</div>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    Google Cloud Associate Cloud Engineer認定試験の「Domain 1: クラウドソリューション環境の設定」は、単なる初期設定の操作手順を暗記する領域ではない。それは、堅牢でセキュア、かつコスト効率の高いエンタープライズ・クラウドインフラストラクチャを支える哲学と設計思想を深く理解し、実装する能力を測る領域である。
                </p>
                <p style={{ fontSize: '14px', marginBottom: '14px' }}>
                    リソース階層の設計は組織のガバナンスと信頼境界をクラウド上に物理的に反映させる作業であり、フォルダと組織ポリシーの継承メカニズムを前提とした精緻なアーキテクチャ設計が求められる。アクセス制御においては、従来の基本ロールに依存した大雑把な権限付与から脱却し、Workload Identity連携やカスタムサービスアカウントを通じた「最小権限の原則」を徹底する、高度なアイデンティティ管理へと昇華させなければならない。
                </p>
                <p style={{ fontSize: '14px', marginBottom: '0' }}>
                    また、コスト管理は単なる事後的な経費報告であってはならない。BigQueryへの詳細な課金データエクスポートによるリソースレベルのFinOps分析と、Pub/SubおよびCloud Functionsを用いたプログラム駆動型のアラート・強制遮断メカニズムを組み込むことで、クラウドの持つ俊敏性を損なうことなく、財務的な安全性を担保するプロアクティブな防衛線が構築される。そして、これらのすべての設計をコードとして具現化し、反復可能でスケーラブルなオペレーションを実現する入り口となるのが、Google Cloud CLIの的確な操作である。
                </p>
            </div>

            <div className="src" style={{ marginTop: '24px' }}>
                <div className="srct">全参照リソース（47件）</div>
                <a href="https://cloud.google.com/learn/certification/cloud-engineer?hl=en" target="_blank" rel="noopener noreferrer">Associate Cloud Engineer Certification | Google Cloud</a>
                <a href="https://services.google.com/fh/files/misc/associate_cloud_engineer_exam_guide_english.pdf" target="_blank" rel="noopener noreferrer">Associate Cloud Engineer Exam Guide | English - Google</a>
                <a href="https://docs.cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy" target="_blank" rel="noopener noreferrer">About resource hierarchy - Google Cloud Documentation</a>
                <a href="https://docs.cloud.google.com/iam/docs/resource-hierarchy-access-control" target="_blank" rel="noopener noreferrer">Using resource hierarchy for access control | IAM</a>
                <a href="https://cloud.google.com/resource-manager/docs/organization-policy/overview" target="_blank" rel="noopener noreferrer">Organization policy constraints - Google Cloud Documentation</a>
                <a href="https://cloud.google.com/identity/docs/overview" target="_blank" rel="noopener noreferrer">Cloud Identity overview - Google Cloud Documentation</a>
                <a href="https://cloud.google.com/resource-manager/docs/creating-managing-projects" target="_blank" rel="noopener noreferrer">Creating and managing projects - Google Cloud Documentation</a>
                <a href="https://docs.cloud.google.com/billing/docs/concepts" target="_blank" rel="noopener noreferrer">Cloud Billing overview - Google Cloud Documentation</a>
                <a href="https://docs.cloud.google.com/billing/docs/how-to/budgets" target="_blank" rel="noopener noreferrer">Create, edit, or delete budgets and budget alerts | Cloud Billing</a>
                <a href="https://docs.cloud.google.com/billing/docs/how-to/export-data-bigquery" target="_blank" rel="noopener noreferrer">Export Cloud Billing data to BigQuery - Google Cloud Documentation</a>
                <a href="https://cloud.google.com/sdk/docs/configurations" target="_blank" rel="noopener noreferrer">Managing gcloud CLI configurations | Google Cloud SDK</a>
                <a href="https://docs.cloud.google.com/sdk/docs/install-sdk" target="_blank" rel="noopener noreferrer">Quickstart: Install the Google Cloud CLI</a>
                <a href="https://cloud.google.com/blog/products/identity-security/iam-best-practice-guides-available-now" target="_blank" rel="noopener noreferrer">IAM best practice guides available now | Google Cloud Blog</a>
                <a href="https://cloud.google.com/apis/docs/overview" target="_blank" rel="noopener noreferrer">Google Cloud APIs overview</a>
                <a href="https://docs.cloud.google.com/billing/docs/how-to/budgets-programmatic-notifications" target="_blank" rel="noopener noreferrer">Set up programmatic notifications | Cloud Billing</a>
                <a href="https://cloud.google.com/resource-manager/docs/creating-managing-folders" target="_blank" rel="noopener noreferrer">Creating and managing folders - Google Cloud Documentation</a>
                <a href="https://cloud.google.com/docs/enterprise/best-practices-for-enterprise-organizations" target="_blank" rel="noopener noreferrer">Best practices for enterprise organizations | Google Cloud</a>
                <a href="https://medium.com/qodea/budget-alerts-caps-in-google-cloud-76ff71929b42" target="_blank" rel="noopener noreferrer">Budget Alerts &amp; &apos;Caps&apos; in Google Cloud (Medium)</a>
            </div>
        </div>
    );
}

/* ── ページ本体 ── */
export default function Domain1Page() {
    return (
        <div className="ace-page">
            <section className="hero">
                <div className="hero-eyebrow">DOMAIN 1 DEEP DIVE</div>
                <h1>
                    Domain 1: 環境設定<br />
                    <span className="accent">包括的解説</span>
                </h1>
                <p className="hero-desc">
                    クラウドソリューション環境の設定 — 試験配点 ≈23%。リソース階層・IAM・組織ポリシー・請求・gcloud CLI・API 管理を完全網羅。
                    ace-domain1-setup-guide + エンタープライズ深掘り解説を統合。
                </p>
                <div className="meta-row">
                    <div className="meta-pill"><div className="ml">配点</div><div className="mv">≈23%</div></div>
                    <div className="meta-pill"><div className="ml">問題数目安</div><div className="mv">12〜14問</div></div>
                    <div className="meta-pill"><div className="ml">チャプター数</div><div className="mv">10</div></div>
                    <div className="meta-pill"><div className="ml">コード例</div><div className="mv">Python/HCL/SQL</div></div>
                </div>
            </section>

            <nav className="snav">
                <a href="#intro" className="n1"><span className="dot db" />概要</a>
                <a href="#ch1" className="n2"><span className="dot dg" />Ch1 階層</a>
                <a href="#ch2" className="n3"><span className="dot dy" />Ch2 Identity</a>
                <a href="#ch3" className="n4"><span className="dot do" />Ch3 プロジェクト</a>
                <a href="#ch4" className="n1"><span className="dot db" />Ch4 Org Policy</a>
                <a href="#ch5" className="n2"><span className="dot dg" />Ch5 gcloud CLI</a>
                <a href="#ch6" className="n3"><span className="dot dy" />Ch6 請求</a>
                <a href="#ch7" className="n4"><span className="dot do" />Ch7 予算</a>
                <a href="#ch8" className="n1"><span className="dot db" />Ch8 BigQuery</a>
                <a href="#ch9" className="n2"><span className="dot dg" />Ch9 API</a>
                <a href="#ch10" className="n3"><span className="dot dy" />Ch10 まとめ</a>
            </nav>

            <main className="wrap">
                <SectionIntro />
                <Chapter1 />
                <Chapter2 />
                <Chapter3 />
                <Chapter4 />
                <Chapter5 />
                <Chapter6 />
                <Chapter7 />
                <Chapter8 />
                <Chapter9 />
                <Chapter10 />
            </main>
        </div>
    );
}
