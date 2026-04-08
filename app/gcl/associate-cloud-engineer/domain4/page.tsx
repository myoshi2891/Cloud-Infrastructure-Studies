import type { Metadata } from 'next';
import {
    D4_SECTION_TITLE,
    COMPUTE_ROLES,
    STORAGE_ROLES,
    IAM_ROLES,
    GKE_ROLES,
    CLOUD_RUN_ROLES,
    BIGQUERY_ROLES,
    PRINCIPAL_TYPES,
    ROLE_BEST_PRACTICES,
    IAM_POLICY_BEST_PRACTICES,
    SERVICE_ACCOUNT_TYPES,
    SA_BEST_PRACTICES,
    SECRET_MANAGER_ROLES,
    SECRET_MANAGER_BEST_PRACTICES,
    KMS_ROLES,
    SCC_FINDINGS,
    DOMAIN4_BEST_PRACTICES,
} from './constants';

export const metadata: Metadata = {
    title: 'ACE Domain 4: Access and Security | Cloud Infra Studies',
    description: 'Google Cloud Associate Cloud Engineer Domain 4: Configuring access and security study guide.',
};

function Chapter1() {
    return (
        <div id="ch1" className="sgap">
            <div className="sec-head">
                <div className="sec-num">01</div>
                <div className="sec-head-txt">
                    <h2>Chapter 1: セキュリティの基本概念と設計原則</h2>
                    <p>Google Cloud セキュリティの 3 つの基本原則と責任共有モデル</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">1.1</span>Google Cloud セキュリティの 3 つの基本原則</div>
                
                <h3 className="stitle">原則①: 最小特権の原則（Principle of Least Privilege）</h3>
                <div className="cb-wrap">
                    <div className="cb-label"><span className="dot dot-purple"></span><span className="dot dot-amber"></span><span className="dot dot-fuchsia"></span></div>
                    <pre className="codeblock">{`【最小特権とは？】

必要な権限だけを、必要な人・サービスにだけ、
必要な期間だけ付与する

悪い例（過剰な権限）:
  「とりあえず Editor を全員に付与する」
    → 誰でも VM を削除できる
    → 誰でも DB を変更できる
    → 侵害時の被害が最大化

良い例（最小権限）:
  「フロントエンドエンジニアには Cloud Run の
   デプロイ権限だけを付与する」
   → 必要な操作だけできる
   → 侵害されても他のリソースへの影響を最小化`}</pre>
                </div>

                <h3 className="stitle">原則②: 職務分掌（Separation of Duties）</h3>
                <div className="cb-wrap">
                    <div className="cb-label"><span className="dot dot-purple"></span><span className="dot dot-amber"></span><span className="dot dot-fuchsia"></span></div>
                    <pre className="codeblock">{`【職務分掌とは？】

同一人物がすべての操作を単独で実行できないようにする

例:
  コードを書く人（Developer）
      ↓ PR を作成
  コードをレビューする人（Reviewer）
      ↓ 承認
  本番にデプロイする人（Ops）または CI/CD が自動実行

→ 一人のエンジニアが「コードを書いてそのまま本番にデプロイ」
  できない仕組みを作る`}</pre>
                </div>

                <h3 className="stitle">原則③: 深層防御（Defense in Depth）</h3>
                <div className="cb-wrap">
                    <div className="cb-label"><span className="dot dot-purple"></span><span className="dot dot-amber"></span><span className="dot dot-fuchsia"></span></div>
                    <pre className="codeblock">{`【深層防御とは？】

複数のセキュリティ層を重ねて、
1 つの層が破られても他の層で防御する

Google Cloud での深層防御:

外側: Cloud Armor（DDoS / WAF）
  ↓
ネットワーク: ファイアウォールルール / VPC Service Controls
  ↓
認証: IAM / Identity-Aware Proxy
  ↓
データ: 暗号化（Cloud KMS）/ Secret Manager
  ↓
監視: Security Command Center / Cloud Logging`}</pre>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">1.2</span>Google の共有責任モデル（Shared Responsibility Model）</div>
                <div className="cb-wrap">
                    <div className="cb-label"><span className="dot dot-purple"></span><span className="dot dot-amber"></span><span className="dot dot-fuchsia"></span></div>
                    <pre className="codeblock">{`【誰が何を守るか？】

Google の責任:
  ├── 物理インフラのセキュリティ（データセンター）
  ├── ハードウェアとソフトウェアの脆弱性対応
  ├── ネットワークの基盤セキュリティ
  └── マネージドサービスのセキュリティ（GKE Autopilot など）

顧客（あなた）の責任:
  ├── IAM 設定（誰がアクセスできるか）
  ├── データの暗号化設定
  ├── アプリケーションのセキュリティ
  ├── ファイアウォールルールの設定
  └── シークレット・認証情報の管理

【責任の境界はサービスによって異なる】
  IaaS（Compute Engine）: 顧客の責任範囲が広い
  PaaS（Cloud Run）: Google の責任範囲が広い
  SaaS（Google Workspace）: ほぼ Google が管理`}</pre>
                </div>
            </div>
        </div>
    );
}

function Chapter2() {
    return (
        <div id="ch2" className="sgap">
            <div className="sec-head">
                <div className="sec-num">02</div>
                <div className="sec-head-txt">
                    <h2>Chapter 2: IAM の基本アーキテクチャ</h2>
                    <p>主体・ロール・リソースの関係と命名規則</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">2.1</span>IAM の 3 つの要素</div>
                <p>IAM（Identity and Access Management）は、Google Cloud のすべてのアクセス制御の基盤です。</p>
                <div className="cb-wrap">
                    <div className="cb-label"><span className="dot dot-purple"></span><span className="dot dot-amber"></span><span className="dot dot-fuchsia"></span></div>
                    <pre className="codeblock">{`【IAM の 3 要素】

① 主体（Principal / Who）
   └── 誰がアクセスするか？

② ロール（Role / Can do what）
   └── 何ができるか？

③ リソース（Resource / On which resource）
   └── どのリソースに対して？

IAM ポリシー = 主体 + ロール + リソース の組み合わせ`}</pre>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">2.2</span>主体（Principal）の種類</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>主体の種類</th>
                                <th>説明</th>
                                <th>例</th>
                            </tr>
                        </thead>
                        <tbody>
                            {PRINCIPAL_TYPES.map((p, i) => (
                                <tr key={i}>
                                    <td><strong>{p.type}</strong></td>
                                    <td>{p.description}</td>
                                    <td>{p.example}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="wb">
                    <div className="wbt">⚠️ 試験頻出</div>
                    <p><code>allUsers</code> と <code>allAuthenticatedUsers</code> は<strong>公開設定</strong>になるため、機密リソースには絶対に使用しないこと！</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">2.3</span>権限（Permission）の命名規則</div>
                <div className="cb-wrap">
                    <div className="cb-label"><span className="dot dot-purple"></span><span className="dot dot-amber"></span><span className="dot dot-fuchsia"></span></div>
                    <pre className="codeblock">{`権限の命名規則: service.resource.verb

例:
  compute.instances.create    → VM インスタンスの作成
  storage.objects.get         → Storage オブジェクトの取得
  bigquery.tables.create      → BigQuery テーブルの作成
  iam.serviceAccounts.actAs   → サービスアカウントとして動作

【service の例】
  compute    → Compute Engine
  storage    → Cloud Storage
  bigquery   → BigQuery
  iam        → IAM
  container  → GKE
  run        → Cloud Run
  cloudsql   → Cloud SQL`}</pre>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">2.4</span>IAM ポリシーの構造</div>
                <div className="cb-wrap">
                    <div className="cb-label"><span className="dot dot-purple"></span><span className="dot dot-amber"></span><span className="dot dot-fuchsia"></span></div>
                    <pre className="codeblock">{`{
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
      "members": [
        "user:bob@example.com"
      ],
      "condition": {
        "title": "Production Hours Only",
        "expression": "request.time.getHours('Asia/Tokyo') >= 9 && request.time.getHours('Asia/Tokyo') < 18"
      }
    }
  ],
  "version": 3
}`}</pre>
                </div>
            </div>
        </div>
    );
}

function Chapter3() {
    return (
        <div id="ch3" className="sgap">
            <div className="sec-head">
                <div className="sec-num">03</div>
                <div className="sec-head-txt">
                    <h2>Chapter 3: ロールの 3 種類：基本 / 事前定義 / カスタム</h2>
                    <p>基本ロール（非推奨）・事前定義ロール・カスタムロールの使い分け</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">3.1</span>基本ロール（Basic Roles / Primitive Roles）</div>
                <div className="cb-wrap">
                    <div className="cb-label"><span className="dot dot-purple"></span><span className="dot dot-amber"></span><span className="dot dot-fuchsia"></span></div>
                    <pre className="codeblock">{`【3 つの基本ロール】

roles/viewer（閲覧者）
  └── すべてのリソースを閲覧のみ（変更不可）

roles/editor（編集者）
  └── ほぼすべてのリソースを作成・更新・削除
      ※ IAM の変更・請求設定は不可

roles/owner（オーナー）
  └── すべての権限（IAM 変更・請求設定も含む）`}</pre>
                </div>
                <h3 className="stitle">⚠️ 基本ロールを使ってはいけない理由</h3>
                <div className="cb-wrap">
                    <div className="cb-label"><span className="dot dot-purple"></span><span className="dot dot-amber"></span><span className="dot dot-fuchsia"></span></div>
                    <pre className="codeblock">{`【なぜ本番環境で基本ロールを使ってはいけないのか？】

roles/editor を付与した場合:
  ✅ やりたいこと: Cloud Run へのデプロイ
  ❌ 意図しない権限:
      ・Cloud SQL の DB を削除できる
      ・Cloud Storage バケットを削除できる
      ・Cloud Spanner のデータを変更できる
      ・Compute Engine の VM を削除できる
      ・Secret Manager のシークレットを読める

→ 必要以上の権限が付与されてしまう
→ アカウントが侵害された場合の被害が甚大

【例外的に使用可能なケース】
  ├── 開発環境での個人プロジェクト（学習目的）
  ├── 小規模チームの初期フェーズ（一時的）
  └── 組織ポリシーで後から制限することを前提に`}</pre>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">3.2</span>事前定義ロール（Predefined Roles）</div>
                <p>Google が各サービスに対してキュレーションした細かいロールです。</p>
                
                <h3 className="stitle">Compute Engine</h3>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead><tr><th>ロール</th><th>権限の概要</th></tr></thead>
                        <tbody>
                            {COMPUTE_ROLES.map((r, i) => (
                                <tr key={i}><td><strong>{r.role}</strong></td><td>{r.description}</td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <h3 className="stitle">Cloud Storage</h3>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead><tr><th>ロール</th><th>権限の概要</th></tr></thead>
                        <tbody>
                            {STORAGE_ROLES.map((r, i) => (
                                <tr key={i}><td><strong>{r.role}</strong></td><td>{r.description}</td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <h3 className="stitle">IAM & Service Accounts</h3>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead><tr><th>ロール</th><th>権限の概要</th></tr></thead>
                        <tbody>
                            {IAM_ROLES.map((r, i) => (
                                <tr key={i}><td><strong>{r.role}</strong></td><td>{r.description}</td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <h3 className="stitle">GKE</h3>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead><tr><th>ロール</th><th>権限の概要</th></tr></thead>
                        <tbody>
                            {GKE_ROLES.map((r, i) => (
                                <tr key={i}><td><strong>{r.role}</strong></td><td>{r.description}</td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <h3 className="stitle">Cloud Run</h3>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead><tr><th>ロール</th><th>権限の概要</th></tr></thead>
                        <tbody>
                            {CLOUD_RUN_ROLES.map((r, i) => (
                                <tr key={i}><td><strong>{r.role}</strong></td><td>{r.description}</td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <h3 className="stitle">BigQuery</h3>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead><tr><th>ロール</th><th>権限の概要</th></tr></thead>
                        <tbody>
                            {BIGQUERY_ROLES.map((r, i) => (
                                <tr key={i}><td><strong>{r.role}</strong></td><td>{r.description}</td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">3.3</span>カスタムロール（Custom Roles）</div>
                <div className="cb-wrap">
                    <div className="cb-label"><span className="dot dot-purple"></span><span className="dot dot-amber"></span><span className="dot dot-fuchsia"></span></div>
                    <pre className="codeblock">{`【カスタムロールを作成すべきケース】

事前定義ロールでは:
  ├── 権限が多すぎる（オーバースコープ）
  │   例: roles/storage.admin はバケット削除もできてしまう
  │       「オブジェクトのアップロードと読み取りだけ」のロールが欲しい
  │
  └── 複数のサービスにまたがる特定の組み合わせが必要
      例: Cloud Run のデプロイ権限 + Artifact Registry の読み取り権限

【カスタムロールの注意点】
  ├── 管理コストが増える（権限の追加・削除の追跡が必要）
  ├── Google が新しいサービスを追加しても自動更新されない
  └── 使いすぎると管理が複雑になる → 最小限にとどめる`}</pre>
                </div>
                <p>カスタムロールの作成:</p>
                <div className="cb-wrap">
                    <div className="cb-label"><span className="dot dot-purple"></span><span className="dot dot-amber"></span><span className="dot dot-fuchsia"></span></div>
                    <pre className="codeblock">{`# YAML ファイルでカスタムロールを定義
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
  - artifactregistry.tags.list
  - storage.objects.get
  - storage.objects.list
EOF

# プロジェクトレベルでカスタムロールを作成
gcloud iam roles create cloudRunDeployer \\
  --project=PROJECT_ID \\
  --file=custom-deployer-role.yaml

# カスタムロールの一覧確認
gcloud iam roles list --project=PROJECT_ID --filter="name~customRoles"

# カスタムロールの詳細確認
gcloud iam roles describe cloudRunDeployer \\
  --project=PROJECT_ID

# カスタムロールの更新（権限を追加）
gcloud iam roles update cloudRunDeployer \\
  --project=PROJECT_ID \\
  --add-permissions=run.routes.get`}</pre>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">3.4</span>ロール選択の意思決定フロー</div>
                <div className="cb-wrap">
                    <div className="cb-label"><span className="dot dot-purple"></span><span className="dot dot-amber"></span><span className="dot dot-fuchsia"></span></div>
                    <pre className="codeblock">{`権限を付与したい
    ↓
事前定義ロールで要件を満たせるか？
    ├── YES → 事前定義ロールを使用（推奨）
    │
    └── NO  → 事前定義ロールが広すぎる or 複数ロールの組み合わせが必要
              ↓
          カスタムロールを作成（最小限の権限で）

※ 基本ロール（Viewer/Editor/Owner）は最終手段
  → 本番環境では原則使用しない`}</pre>
                </div>

                <div className="bp">
                    <div className="bpt">✅ ベストプラクティス: ロール管理</div>
                    <div className="ctable-wrap">
                        <table className="ctable">
                            <thead><tr><th>#</th><th>ベストプラクティス</th><th>理由</th></tr></thead>
                            <tbody>
                                {ROLE_BEST_PRACTICES.map((p, i) => (
                                    <tr key={i}><td>{p.id}</td><td><strong>{p.practice}</strong></td><td>{p.reason}</td></tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="src">
                    <div className="srct">参考リソース</div>
                    <a href="https://cloud.google.com/blog/products/identity-security/iam-best-practice-guides-available-now" target="_blank" rel="noreferrer">IAM Best Practice Guides Available Now</a>
                    <a href="https://cloudoptimo.com/blog/google-cloud-iam-role-hierarchies-explained/" target="_blank" rel="noreferrer">Google Cloud IAM Role Hierarchies Explained</a>
                </div>
            </div>
        </div>
    );
}

function Chapter4() {
    return (
        <div id="ch4" className="sgap">
            <div className="sec-head">
                <div className="sec-num">04</div>
                <div className="sec-head-txt">
                    <h2>Chapter 4: IAM ポリシーの設定と管理</h2>
                    <p>CLI・API を用いたアクセス権限の付与と Policy Recommender</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">4.1</span>IAM ポリシーの設定コマンド</div>
                <div className="cb-wrap">
                    <div className="cb-label"><span className="dot dot-purple"></span><span className="dot dot-amber"></span><span className="dot dot-fuchsia"></span></div>
                    <pre className="codeblock">{`# ===== プロジェクトレベルの IAM 操作 =====

# 現在の IAM ポリシーを確認
gcloud projects get-iam-policy PROJECT_ID

# ユーザーにロールを付与
gcloud projects add-iam-policy-binding PROJECT_ID \\
  --member="user:alice@example.com" \\
  --role="roles/run.developer"

# グループにロールを付与（推奨）
gcloud projects add-iam-policy-binding PROJECT_ID \\
  --member="group:backend-team@example.com" \\
  --role="roles/compute.instanceAdmin.v1"

# ロールを削除
gcloud projects remove-iam-policy-binding PROJECT_ID \\
  --member="user:alice@example.com" \\
  --role="roles/run.developer"

# ===== リソースレベルの IAM 操作 =====

# Cloud Storage バケットへの権限付与
gcloud storage buckets add-iam-policy-binding gs://my-bucket \\
  --member="serviceAccount:my-app@PROJECT.iam.gserviceaccount.com" \\
  --role="roles/storage.objectViewer"

# Cloud Run サービスへの Invoker 権限付与
gcloud run services add-iam-policy-binding my-service \\
  --region=asia-northeast1 \\
  --member="serviceAccount:caller-sa@PROJECT.iam.gserviceaccount.com" \\
  --role="roles/run.invoker"

# BigQuery データセットへの権限付与
bq add-iam-policy-binding \\
  --project=PROJECT_ID \\
  --dataset=my_dataset \\
  --member="group:data-team@example.com" \\
  --role="roles/bigquery.dataViewer"`}</pre>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">4.2</span>IAM ポリシーの一括更新（Policy ファイルを使った管理）</div>
                <div className="cb-wrap">
                    <div className="cb-label"><span className="dot dot-purple"></span><span className="dot dot-amber"></span><span className="dot dot-fuchsia"></span></div>
                    <pre className="codeblock">{`# 現在のポリシーをファイルに書き出す
gcloud projects get-iam-policy PROJECT_ID \\
  --format=json > current-policy.json

# ポリシーファイルを編集して一括更新
# （current-policy.json を編集後）
gcloud projects set-iam-policy PROJECT_ID current-policy.json`}</pre>
                </div>
                <div className="wb">
                    <div className="wbt">⚠️ 注意</div>
                    <p><strong>`set-iam-policy` は完全上書き</strong>です！現在のポリシーを取得してから編集して適用してください。</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">4.3</span>Policy Recommender（IAM 推奨事項）</div>
                <p>Policy Recommender は、実際の使用状況を分析して、<strong>過剰な権限を検出</strong>し、より適切なロールを推奨する AI 搭載ツールです。</p>
                <div className="cb-wrap">
                    <div className="cb-label"><span className="dot dot-purple"></span><span className="dot dot-amber"></span><span className="dot dot-fuchsia"></span></div>
                    <pre className="codeblock">{`【Policy Recommender の仕組み】

90 日間のアクティビティを分析
    ↓
「このユーザーは Editor 権限を持っているが、
 実際に使ったのは Cloud Run の操作だけ」を検出
    ↓
推奨事項:
  「roles/editor → roles/run.developer に変更することを推奨
   これにより 150 の不要な権限が削除されます」`}</pre>
                </div>
                <div className="cb-wrap">
                    <div className="cb-label"><span className="dot dot-purple"></span><span className="dot dot-amber"></span><span className="dot dot-fuchsia"></span></div>
                    <pre className="codeblock">{`# プロジェクトの IAM 推奨事項を確認
gcloud recommender recommendations list \\
  --project=PROJECT_ID \\
  --location=global \\
  --recommender=google.iam.policy.Recommender

# 推奨事項を適用（権限を縮小）
gcloud recommender recommendations apply RECOMMENDATION_ID \\
  --project=PROJECT_ID \\
  --location=global \\
  --recommender=google.iam.policy.Recommender \\
  --etag=ETAG`}</pre>
                </div>
            </div>
        </div>
    );
}

function Chapter5() {
    return (
        <div id="ch5" className="sec-head">
            <h2 className="stitle"><span className="sn5">05</span> 条件付きロールバインディング（IAM Conditions）</h2>
            
            <div className="tcard">
                <div className="ttitle"><span className="tid">5.1</span> IAM Conditions とは？</div>
                <p className="tdesc">IAM Conditions は、ロールバインディングに「条件」を追加して、<strong>特定の状況でのみ権限を有効にする</strong>機能です。</p>
                <div className="code-block">
                    <pre><code>{`【通常のロールバインディング】
  alice に roles/storage.objectAdmin を付与
  → いつでも、どこからでもアクセス可能

【条件付きロールバインディング】
  alice に roles/storage.objectAdmin を付与
  ただし、以下の条件を満たす場合のみ:
    ├── 特定の時間帯のみ（例: 平日 9:00-18:00）
    ├── 特定のリソースのみ（例: 本番バケット以外）
    └── 特定のリクエスト元のみ`}</code></pre>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">5.2</span> 条件式の書き方（CEL: Common Expression Language）</div>
                <div className="code-block">
                    <pre><code>{`【よく使う条件の種類】

① 時間ベースの条件
request.time.getHours('Asia/Tokyo') >= 9 &&
request.time.getHours('Asia/Tokyo') < 18

② 特定リソースへのアクセス制限
resource.name.startsWith("projects/my-project/datasets/staging")

③ リソースタイプによる制限
resource.type == "storage.googleapis.com/Object"

④ タグベースのアクセス制御
resource.matchTagId("tagValues/123456789")`}</code></pre>
                </div>
                
                <p className="stitle">実践的な使用例</p>
                <div className="code-block">
                    <pre><code>{`# 例1: 業務時間内（JST 9:00-18:00）のみ権限を有効化
gcloud projects add-iam-policy-binding PROJECT_ID \\
  --member="user:contractor@partner.com" \\
  --role="roles/compute.instanceAdmin.v1" \\
  --condition='
    title=BusinessHoursOnly,
    description=Only during business hours JST,
    expression=request.time.getHours("Asia/Tokyo") >= 9 && request.time.getHours("Asia/Tokyo") < 18'

# 例2: 有効期限付きの権限付与（一時的なアクセス）
gcloud projects add-iam-policy-binding PROJECT_ID \\
  --member="user:temp-worker@example.com" \\
  --role="roles/viewer" \\
  --condition='
    title=TemporaryAccess,
    description=Valid until 2024-03-31,
    expression=request.time < timestamp("2024-03-31T23:59:59Z")'

# 例3: 特定の Cloud Storage パスのみアクセス許可
gcloud storage buckets add-iam-policy-binding gs://my-bucket \\
  --member="serviceAccount:external-app@PROJECT.iam.gserviceaccount.com" \\
  --role="roles/storage.objectViewer" \\
  --condition='
    title=DevOnlyAccess,
    description=Access to dev prefix only,
    expression=resource.name.startsWith("projects/_/buckets/my-bucket/objects/dev/")'`}</code></pre>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">5.3</span> グループ vs 個人へのロール付与</div>
                <div className="code-block">
                    <pre><code>{`【個人（ユーザー）に直接ロールを付与する問題】

社員 A、B、C が同じ権限を必要としている場合:
  ユーザーごとに add-iam-policy-binding を 3 回実行
    ↓
社員 D が追加されたら また 1 回実行
社員 A が退職したら remove-iam-policy-binding を実行
    ↓
管理が煩雑・設定漏れのリスク

【グループにロールを付与する利点（推奨）】

Google グループ: backend-team@example.com に権限付与
    ↓
グループにメンバーを追加するだけで権限が自動付与
グループからメンバーを削除するだけで権限が自動剥奪
IAM ポリシーを変更する必要なし！

設定例:
  gcloud projects add-iam-policy-binding PROJECT_ID \\
    --member="group:backend-team@example.com" \\
    --role="roles/run.developer"`}</code></pre>
                </div>

                <p className="stitle">✅ ベストプラクティス: IAM ポリシー管理</p>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>ベストプラクティス</th>
                                <th>理由</th>
                            </tr>
                        </thead>
                        <tbody>
                            {IAM_POLICY_BEST_PRACTICES.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td><strong>{item.practice}</strong></td>
                                    <td>{item.reason}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="tdesc mt-4">🔗 <strong>参考</strong>: https://docs.cloud.google.com/iam/docs/resource-hierarchy-access-control</p>
            </div>
        </div>
    );
}

function Chapter6() {
    return (
        <div id="ch6" className="sec-head">
            <h2 className="stitle"><span className="sn1">06</span> サービスアカウントの基本概念と種類</h2>
            
            <div className="tcard">
                <div className="ttitle"><span className="tid">6.1</span> サービスアカウントとは？</div>
                <div className="code-block">
                    <pre><code>{`【人間のアカウント vs サービスアカウント】

人間のアカウント（User Account）:
  └── alice@example.com でログインするのは「人間」

サービスアカウント（Service Account）:
  └── my-app@project.iam.gserviceaccount.com
      これは「アプリケーション・プログラム」のアカウント

【サービスアカウントの二重の役割】

役割①: 主体（Principal）としてのサービスアカウント
  → 他のリソースにアクセスする「誰か」として機能
  例: VM 上のアプリが Cloud Storage を読み取る
      （VM に SA をアタッチ → SA の権限でアクセス）

役割②: リソース（Resource）としてのサービスアカウント
  → 「誰かが SA を使う権限を管理する対象」
  例: alice が特定の SA を使う権限を持つかどうか
      （SA へのアクセス自体を IAM で制御）`}</code></pre>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">6.2</span> サービスアカウントの種類</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>種類</th>
                                <th>作成者</th>
                                <th>用途</th>
                            </tr>
                        </thead>
                        <tbody>
                            {SERVICE_ACCOUNT_TYPES.map((item, i) => (
                                <tr key={i}>
                                    <td><strong>{item.type}</strong></td>
                                    <td>{item.creator}</td>
                                    <td>{item.usage}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="alert-box mt-4">
                    <p className="tdesc">⚠️ <strong>デフォルト SA の危険性</strong>: Compute Engine のデフォルト SA は、組織の作成時期によっては <code>roles/editor</code> 相当の権限を自動付与される可能性があります。組織ポリシー（<code>iam.automaticIamGrantsForDefaultServiceAccounts</code>）を確認し、2024-05-03 以降に作成された組織ではこの制約がデフォルトで有効なため自動付与は行われませんが、旧来の組織では明示的に確認が必要です。いずれの場合も、専用の最小権限 SA を作成してアタッチしてください。</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">6.3</span> サービスアカウントの作成と管理</div>
                <div className="code-block">
                    <pre><code>{`# サービスアカウントの作成
gcloud iam service-accounts create my-app-sa \\
  --display-name="My Application Service Account" \\
  --description="SA for the production web application"

# SA の一覧確認
gcloud iam service-accounts list

# SA の詳細確認
gcloud iam service-accounts describe \\
  my-app-sa@PROJECT_ID.iam.gserviceaccount.com

# SA に IAM ロールを付与（SA が Cloud Storage を読み取る権限）
gcloud projects add-iam-policy-binding PROJECT_ID \\
  --member="serviceAccount:my-app-sa@PROJECT_ID.iam.gserviceaccount.com" \\
  --role="roles/storage.objectViewer"

# SA を VM にアタッチ（VM 作成時）
gcloud compute instances create my-vm \\
  --service-account=my-app-sa@PROJECT_ID.iam.gserviceaccount.com \\
  --scopes=cloud-platform \\
  --zone=asia-northeast1-a

# 既存 VM の SA を変更
gcloud compute instances set-service-account my-vm \\
  --service-account=new-sa@PROJECT_ID.iam.gserviceaccount.com \\
  --scopes=cloud-platform \\
  --zone=asia-northeast1-a

# SA の無効化（削除せずに一時停止）
gcloud iam service-accounts disable \\
  my-app-sa@PROJECT_ID.iam.gserviceaccount.com

# SA の削除
gcloud iam service-accounts delete \\
  my-app-sa@PROJECT_ID.iam.gserviceaccount.com`}</code></pre>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">6.4</span> <code>iam.serviceAccounts.actAs</code> 権限の重要性</div>
                <div className="code-block">
                    <pre><code>{`【actAs 権限とは？】

「サービスアカウントを VM にアタッチする」操作は
roles/iam.serviceAccountUser（含む actAs 権限）が必要

なぜ重要か？
  privileged-sa には Cloud SQL Admin 権限がある
  → この SA を誰でも VM にアタッチできると
    誰でも privileged-sa の権限を利用できてしまう！

→ actAs 権限を持つ人だけが、その SA を使えるリソースを作成できる

gcloud iam service-accounts add-iam-policy-binding \\
  privileged-sa@PROJECT.iam.gserviceaccount.com \\
  --member="user:alice@example.com" \\
  --role="roles/iam.serviceAccountUser"`}</code></pre>
                </div>
            </div>
        </div>
    );
}

function Chapter7() {
    return (
        <div id="ch7" className="sec-head">
            <h2 className="stitle"><span className="sn2">07</span> サービスアカウントキーのリスクと代替手法</h2>
            
            <div className="tcard">
                <div className="ttitle"><span className="tid">7.1</span> SA キー（JSON キー）の問題点</div>
                <div className="code-block">
                    <pre><code>{`【サービスアカウントキーの生成から漏洩まで】

Step 1: エンジニアが SA キーを生成
  gcloud iam service-accounts keys create key.json \\
    --iam-account=my-sa@PROJECT.iam.gserviceaccount.com

Step 2: key.json を CI/CD に設定 or ローカルに保存

Step 3: 誤って GitHub にコミット or ラップトップを紛失

Step 4: 攻撃者がキーを発見

Step 5: 攻撃者が GCP API を呼び出す
  gcloud auth activate-service-account --key-file=stolen-key.json

Step 6: 莫大な被害が発生！

【SA キーの管理コスト】
  ├── 定期的なローテーションが必要（90日ごと推奨）
  ├── 有効期限の管理
  ├── 誰がどのキーを持っているかの追跡
  └── 組織全体で数百〜数千のキーを管理する地獄`}</code></pre>
                </div>
                <div className="alert-box mt-4">
                    <p className="tdesc">⚠️ <strong>ACE 試験最重要</strong>: SA JSON キーの使用はセキュリティ上の重大なアンチパターン。代替手法を必ず覚えること。</p>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">7.2</span> SA キーを使わない認証方法の選択</div>
                <div className="code-block">
                    <pre><code>{`【シナリオ別の推奨認証方法】

シナリオ A: GCE/GKE/Cloud Run 上のアプリ
  → VM または Pod に SA をアタッチ
  → メタデータサーバーから自動的にトークンを取得
  → キー不要！

シナリオ B: 開発者のローカル PC
  → gcloud auth application-default login
  → ADC（Application Default Credentials）を使用
  → キー不要！

シナリオ C: GitHub Actions / GitLab CI / Jenkins
  → Workload Identity Federation を設定
  → CI/CD が動的にトークンを交換
  → キー不要！

シナリオ D: AWS / Azure / オンプレミスのシステム
  → Workload Identity Federation を設定
  → 外部 IdP のトークンを GCP トークンに交換
  → キー不要！

シナリオ E: 権限が必要な一時的な管理作業
  → SA Impersonation（権限借用）を使用
  → 短期トークンのみを生成
  → キー不要！

⚠️ SA JSON キーを使うべきシナリオ: ほぼなし
   どうしても必要な場合は組織ポリシーで管理し、
   有効期限を設定して定期ローテーションする`}</code></pre>
                </div>
            </div>
        </div>
    );
}

function Chapter8() {
    return (
        <div id="ch8" className="sec-head">
            <h2 className="stitle"><span className="sn3">08</span> Workload Identity Federation</h2>
            
            <div className="tcard">
                <div className="ttitle"><span className="tid">8.1</span> Workload Identity Federation とは？</div>
                <p className="tdesc">外部システム（AWS、GitHub Actions など）から <strong>SA キーなし</strong>で Google Cloud API にアクセスするための仕組みです。</p>
                <div className="code-block">
                    <pre><code>{`【Workload Identity Federation の仕組み】

従来（SA キー使用）:
  GitHub Actions → key.json を秘密として保存 → GCP API 呼び出し

Workload Identity Federation（推奨）:
  GitHub Actions
      ↓ OIDC トークン（GitHub が発行）を提示
  Google Cloud Security Token Service (STS)
      ↓ OIDC トークンを検証
      ↓ 短期有効な Google Cloud アクセストークンを発行
  GCP API を呼び出す
      ↓ 完了後トークンは自動失効

【メリット】
  ✓ SA キーをどこにも保存しない
  ✓ トークンは短期間で自動失効
  ✓ 監査ログで誰が何時アクセスしたか追跡可能`}</code></pre>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">8.2</span> GitHub Actions との Workload Identity Federation 設定</div>
                <div className="code-block">
                    <pre><code>{`# Step 1: Workload Identity Pool の作成
gcloud iam workload-identity-pools create github-pool \\
  --location=global \\
  --description="GitHub Actions Workload Identity Pool" \\
  --display-name="GitHub Actions Pool"

# Step 2: GitHub の OIDC プロバイダーを登録
gcloud iam workload-identity-pools providers create-oidc github-provider \\
  --location=global \\
  --workload-identity-pool=github-pool \\
  --display-name="GitHub OIDC Provider" \\
  --issuer-uri="https://token.actions.githubusercontent.com" \\
  --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository,attribute.actor=assertion.actor,attribute.aud=assertion.aud" \\
  --attribute-condition="assertion.repository_owner == 'my-org'"  # 組織を限定

# Step 3: SA を作成（CI/CD 用の最小権限 SA）
gcloud iam service-accounts create github-deploy-sa \\
  --display-name="GitHub Actions Deploy SA"

gcloud projects add-iam-policy-binding PROJECT_ID \\
  --member="serviceAccount:github-deploy-sa@PROJECT_ID.iam.gserviceaccount.com" \\
  --role="roles/run.developer"  # 必要な権限のみ

# Step 4: Workload Identity Pool に SA への権限借用を許可
WORKLOAD_IDENTITY_POOL_ID=$(gcloud iam workload-identity-pools describe github-pool \\
  --location=global \\
  --format="value(name)")

gcloud iam service-accounts add-iam-policy-binding \\
  github-deploy-sa@PROJECT_ID.iam.gserviceaccount.com \\
  --role="roles/iam.workloadIdentityUser" \\
  --member="principalSet://iam.googleapis.com/\${WORKLOAD_IDENTITY_POOL_ID}/attribute.repository/my-org/my-repo"`}</code></pre>
                </div>

                <p className="stitle mt-4">GitHub Actions ワークフローの設定</p>
                <div className="code-block">
                    <pre><code>{`# .github/workflows/deploy.yml
name: Deploy to Cloud Run

on:
  push:
    branches: [main]

permissions:
  contents: read
  id-token: write  # OIDC トークンの生成を許可

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
          service_account: 'github-deploy-sa@PROJECT_ID.iam.gserviceaccount.com'

      # gcloud が自動的に上記で取得したトークンを使用
      - name: Deploy to Cloud Run
        run: |
          gcloud run deploy my-service \\
            --image=gcr.io/PROJECT/my-app:\${{ github.sha }} \\
            --region=asia-northeast1`}</code></pre>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">8.3</span> GKE での Workload Identity</div>
                <p className="tdesc">GKE 環境では、Pod が Google Cloud API にアクセスする際に Workload Identity を使用します。</p>
                <div className="code-block">
                    <pre><code>{`# Step 1: GKE クラスタで Workload Identity を有効化
gcloud container clusters update my-cluster \\
  --workload-pool=PROJECT_ID.svc.id.goog \\
  --region=asia-northeast1

# Step 2: Google Cloud SA を作成
gcloud iam service-accounts create gke-app-sa \\
  --display-name="GKE Application SA"

# Step 3: SA に必要な権限を付与
gcloud projects add-iam-policy-binding PROJECT_ID \\
  --member="serviceAccount:gke-app-sa@PROJECT_ID.iam.gserviceaccount.com" \\
  --role="roles/secretmanager.secretAccessor"  # Secret Manager へのアクセス

# Step 4: Kubernetes SA と Google Cloud SA を紐付け
gcloud iam service-accounts add-iam-policy-binding \\
  gke-app-sa@PROJECT_ID.iam.gserviceaccount.com \\
  --role=roles/iam.workloadIdentityUser \\
  --member="serviceAccount:PROJECT_ID.svc.id.goog[my-namespace/my-ksa]"`}</code></pre>
                </div>
                <div className="code-block mt-4">
                    <pre><code>{`# Kubernetes Service Account の設定
apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-ksa
  namespace: my-namespace
  annotations:
    # Google Cloud SA に紐付け
    iam.gke.io/gcp-service-account: gke-app-sa@PROJECT_ID.iam.gserviceaccount.com`}</code></pre>
                </div>
                <p className="tdesc mt-4">🔗 <strong>参考</strong>: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/autopilot-security</p>
            </div>
        </div>
    );
}

function Chapter9() {
    return (
        <div id="ch9" className="sec-head">
            <h2 className="stitle"><span className="sn4">09</span> Application Default Credentials (ADC)</h2>
            
            <div className="tcard">
                <div className="ttitle"><span className="tid">9.1</span> ADC とは？</div>
                <p className="tdesc">ADC は、コードを変更せずに認証情報を切り替えられる仕組みです。</p>
                <div className="code-block">
                    <pre><code>{`【ADC の検索順序（コードが認証情報を探す順番）】

1. GOOGLE_APPLICATION_CREDENTIALS 環境変数
   └── 指定されたキーファイルを使用

2. gcloud auth application-default login で設定した認証情報
   └── ローカル開発環境での標準

3. GCE / GKE / Cloud Run などの実行環境
   └── メタデータサーバーからトークンを自動取得（キー不要）

4. Cloud Shell
   └── 自動的に認証済み

【コードは認証情報を意識しない】

# コードでは認証情報を指定しない
from google.cloud import storage
client = storage.Client()  # ADC が自動的に認証情報を解決`}</code></pre>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">9.2</span> ローカル開発での ADC 設定</div>
                <div className="code-block">
                    <pre><code>{`# 方法1: ユーザーアカウントで認証（最も一般的）
gcloud auth application-default login
# ブラウザが開いて Google アカウントでログイン
# 認証情報が ~/.config/gcloud/application_default_credentials.json に保存

# 方法2: SA を権限借用して ADC を設定
gcloud auth application-default login \\
  --impersonate-service-account=my-sa@PROJECT.iam.gserviceaccount.com
# SA の権限でローカル開発が可能

# 方法3: 環境変数で SA キーを指定（非推奨）
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/key.json
# ※ 緊急時以外は使用しない

# ADC の設定を確認
gcloud auth application-default print-access-token

# ADC の設定を削除
gcloud auth application-default revoke`}</code></pre>
                </div>
            </div>
        </div>
    );
}

function Chapter10() {
    return (
        <div id="ch10" className="sec-head">
            <h2 className="stitle"><span className="sn5">10</span> 権限借用（Impersonation）と PAM</h2>
            
            <div className="tcard">
                <div className="ttitle"><span className="tid">10.1</span> SA Impersonation（権限借用）</div>
                <div className="code-block">
                    <pre><code>{`【権限借用の仕組み】

alice（通常の権限を持つエンジニア）
    ↓ roles/iam.serviceAccountTokenCreator を持つ
privileged-sa（管理者権限を持つ SA）
    ↓ 短期トークンを生成（1時間以内に自動失効）
管理タスクを実行
    ↓ 完了

【通常の権限付与との違い】

通常の権限付与:
  alice に直接 roles/storage.admin を付与
  → alice は永続的に全バケットを管理できる
  → alice のアカウントが侵害されると大問題

権限借用:
  alice は自分の権限ではなく SA を借用して作業
  → 短期トークンで操作（1時間で失効）
  → 「alice が privileged-sa を使って何時にどの操作をしたか」
    が監査ログに詳細記録される
  → alice 自身の権限は小さいまま`}</code></pre>
                </div>
                <p className="stitle mt-4">設定手順:</p>
                <div className="code-block">
                    <pre><code>{`# Step 1: privileged-sa の作成
gcloud iam service-accounts create privileged-sa \\
  --display-name="Privileged Operations SA"

# Step 2: privileged-sa に管理権限を付与
gcloud projects add-iam-policy-binding PROJECT_ID \\
  --member="serviceAccount:privileged-sa@PROJECT_ID.iam.gserviceaccount.com" \\
  --role="roles/storage.admin"

# Step 3: alice に SA の TokenCreator 権限を付与
gcloud iam service-accounts add-iam-policy-binding \\
  privileged-sa@PROJECT_ID.iam.gserviceaccount.com \\
  --member="user:alice@example.com" \\
  --role="roles/iam.serviceAccountTokenCreator"

# Step 4: alice が権限借用を使って操作
gcloud storage buckets list \\
  --impersonate-service-account=privileged-sa@PROJECT_ID.iam.gserviceaccount.com

# または短期トークンを生成して使用
gcloud auth print-access-token \\
  --impersonate-service-account=privileged-sa@PROJECT_ID.iam.gserviceaccount.com`}</code></pre>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">10.2</span> Privileged Access Manager (PAM)</div>
                <p className="tdesc">PAM は承認ワークフロー付きで一時的な特権アクセスを管理するエンタープライズ機能です。</p>
                <div className="code-block">
                    <pre><code>{`【PAM のワークフロー】

Step 1: alice が特権アクセスをリクエスト
  「prod の Cloud SQL を修正するために DB Admin が必要（理由: インシデント対応）」

Step 2: 承認者（上長・セキュリティチーム）がリクエストを確認
  → Slack / Email で通知
  → 理由・期間を確認して承認 or 却下

Step 3: 承認されたら自動的にロールを付与
  → 指定期間（例: 2時間）だけ有効

Step 4: 期間終了後、自動的にロールを剥奪
  → 誰の操作も不要

Step 5: 全操作が監査ログに詳細記録`}</code></pre>
                </div>
                <div className="code-block mt-4">
                    <pre><code>{`# PAM の設定（エンタイトルメントの作成）
gcloud pam entitlements create prod-db-admin-access \\
  --location=global \\
  --project=PROJECT_ID \\
  --privileged-access='iamAccess={iamPolicies=[{resource=//cloudresourcemanager.googleapis.com/projects/PROJECT_ID,roleBindings=[{role=roles/cloudsql.admin}]}]}' \\
  --max-request-duration=7200s \\
  --approval-workflow='manualApprovals={steps=[{approvalsNeeded=1,approvers={principals=[user:manager@example.com]}}]}'`}</code></pre>
                </div>

                <p className="stitle mt-4">✅ ベストプラクティス: SA と認証管理</p>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>ベストプラクティス</th>
                                <th>理由</th>
                            </tr>
                        </thead>
                        <tbody>
                            {SA_BEST_PRACTICES.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td><strong>{item.practice}</strong></td>
                                    <td>{item.reason}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="tdesc mt-4">🔗 <strong>参考</strong>: https://cloud.google.com/blog/products/identity-security/iam-best-practice-guides-available-now</p>
            </div>
        </div>
    );
}

function Chapter11() {
    return (
        <div id="ch11" className="sec-head">
            <h2 className="stitle"><span className="sn1">11</span> Secret Manager（シークレット管理）</h2>
            
            <div className="tcard">
                <div className="ttitle"><span className="tid">11.1</span> Secret Manager とは？</div>
                <div className="code-block">
                    <pre><code>{`【なぜ Secret Manager が必要か？】

❌ 絶対にやってはいけないこと:
  ├── コードにパスワードをハードコード
  │   DB_PASSWORD = "my-secret-password"
  ├── 環境変数に平文でシークレットを設定
  │   ENV DB_PASSWORD="my-secret-password"
  └── 設定ファイルをそのまま Git にコミット
      database.conf に password=... が含まれている

✅ Secret Manager を使う理由:
  ├── シークレットを安全に暗号化して保存
  ├── アクセス制御（IAM で誰が読めるかを制御）
  ├── バージョン管理（前のバージョンにロールバック可能）
  ├── 自動ローテーション（パスワードを定期更新）
  └── 監査ログ（誰がいつシークレットを読んだか記録）`}</code></pre>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">11.2</span> Secret Manager の基本操作</div>
                <div className="code-block">
                    <pre><code>{`# ===== シークレットの作成 =====

# テキストでシークレットを作成
echo -n "my-database-password" | \\
  gcloud secrets create db-password \\
    --replication-policy=automatic \\
    --data-file=-

# ファイルからシークレットを作成
gcloud secrets create api-key \\
  --replication-policy=automatic \\
  --data-file=./api-key.txt

# ===== シークレットのバージョン管理 =====

# 新しいバージョンを追加（ローテーション）
echo -n "new-password-v2" | \\
  gcloud secrets versions add db-password \\
    --data-file=-

# バージョン一覧の確認
gcloud secrets versions list db-password

# ===== シークレットへのアクセス =====

# 最新バージョンにアクセス
gcloud secrets versions access latest --secret=db-password

# 特定バージョンにアクセス
gcloud secrets versions access 2 --secret=db-password

# ===== シークレットの管理 =====

# シークレット一覧
gcloud secrets list

# シークレットの詳細
gcloud secrets describe db-password

# 古いバージョンを無効化
gcloud secrets versions disable 1 --secret=db-password

# バージョンを削除（永久削除・復元不可）
gcloud secrets versions destroy 1 --secret=db-password

# シークレット自体を削除
gcloud secrets delete db-password`}</code></pre>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">11.3</span> アプリケーションからのシークレットアクセス</div>
                
                <p className="stitle">Python からのアクセス</p>
                <div className="code-block">
                    <pre><code>{`from google.cloud import secretmanager

def access_secret(project_id: str, secret_id: str, version_id: str = "latest") -> str:
    """Secret Manager からシークレットを取得"""
    client = secretmanager.SecretManagerServiceClient()
    
    # シークレットのリソース名を構築
    name = f"projects/{project_id}/secrets/{secret_id}/versions/{version_id}"
    
    # シークレットにアクセス
    response = client.access_secret_version(request={"name": name})
    
    return response.payload.data.decode("UTF-8")

# 使用例
db_password = access_secret("my-project", "db-password")
# → "my-database-password"`}</code></pre>
                </div>

                <p className="stitle mt-4">Cloud Run での環境変数注入</p>
                <div className="code-block">
                    <pre><code>{`# Cloud Run デプロイ時に Secret Manager のシークレットを環境変数として注入
gcloud run deploy my-service \\
  --image=gcr.io/PROJECT/my-app:latest \\
  --region=asia-northeast1 \\
  --set-secrets="DB_PASSWORD=db-password:latest,API_KEY=api-key:latest"
  # 環境変数名=シークレット名:バージョン`}</code></pre>
                </div>

                <p className="stitle mt-4">Kubernetes（GKE）でのシークレットの使用</p>
                <div className="code-block">
                    <pre><code>{`# Secret Store CSI Driver を使用して Pod に直接マウント
apiVersion: secrets-store.csi.x-k8s.io/v1
kind: SecretProviderClass
metadata:
  name: my-app-secrets
spec:
  provider: gcp
  parameters:
    secrets: |
      - resourceName: "projects/PROJECT/secrets/db-password/versions/latest"
        fileName: "db-password"
---
apiVersion: v1
kind: Pod
spec:
  volumes:
  - name: secrets-vol
    csi:
      driver: secrets-store.csi.k8s.io
      readOnly: true
      volumeAttributes:
        secretProviderClass: my-app-secrets
  containers:
  - name: app
    volumeMounts:
    - name: secrets-vol
      mountPath: /run/secrets
      readOnly: true`}</code></pre>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">11.4</span> Secret Manager の IAM 設定</div>
                <div className="code-block">
                    <pre><code>{`# SA にシークレットへのアクセス権を付与
gcloud secrets add-iam-policy-binding db-password \\
  --member="serviceAccount:my-app-sa@PROJECT.iam.gserviceaccount.com" \\
  --role="roles/secretmanager.secretAccessor"

# 開発チームにシークレットの管理権限を付与
gcloud secrets add-iam-policy-binding db-password \\
  --member="group:backend-team@example.com" \\
  --role="roles/secretmanager.secretVersionManager"`}</code></pre>
                </div>

                <div className="ctable-wrap mt-4">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>ロール</th>
                                <th>権限</th>
                            </tr>
                        </thead>
                        <tbody>
                            {SECRET_MANAGER_ROLES.map((item, i) => (
                                <tr key={i}>
                                    <td><code>{item.role}</code></td>
                                    <td>{item.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <p className="stitle mt-4">✅ ベストプラクティス: Secret Manager</p>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>ベストプラクティス</th>
                            </tr>
                        </thead>
                        <tbody>
                            {SECRET_MANAGER_BEST_PRACTICES.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td><strong>{item.practice}</strong></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="tdesc mt-4">🔗 <strong>参考</strong>: https://cloud.google.com/secret-manager/docs/overview</p>
            </div>
        </div>
    );
}

function Chapter12() {
    return (
        <div id="ch12" className="sec-head">
            <h2 className="stitle"><span className="sn2">12</span> Cloud KMS（鍵管理サービス）</h2>
            
            <div className="tcard">
                <div className="ttitle"><span className="tid">12.1</span> Cloud KMS とは？</div>
                <div className="code-block">
                    <pre><code>{`【Cloud KMS でできること】

暗号化キーの管理:
  ├── 暗号化キーを Cloud KMS で一元管理
  ├── キーのローテーション（定期的に新しいキーに切り替え）
  ├── キーへのアクセスを IAM で制御
  └── FIPS 140-2 準拠のハードウェアで保護

データの暗号化・復号化:
  └── Cloud KMS キーを使ってデータを暗号化・復号化
      （CMEK: Customer Managed Encryption Keys）

【デフォルト暗号化 vs CMEK】

デフォルト:
  Google が管理するキーでデータを暗号化
  → 自動・コストなし
  → キーの管理は Google が担当

CMEK（顧客管理暗号化キー）:
  自分で作成・管理するキーでデータを暗号化
  → コストあり
  → キーの削除でデータへのアクセスを完全遮断可能
  → コンプライアンス要件（自社でキーを管理する義務）に対応`}</code></pre>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">12.2</span> Cloud KMS の基本操作</div>
                <div className="code-block">
                    <pre><code>{`# ===== キーリングとキーの作成 =====

# キーリングを作成（キーをグループ化するコンテナ）
gcloud kms keyrings create my-keyring \\
  --location=asia-northeast1

# 対称暗号化キーを作成（データの暗号化・復号化）
gcloud kms keys create my-symmetric-key \\
  --keyring=my-keyring \\
  --location=asia-northeast1 \\
  --purpose=encryption \\
  --rotation-period=90d \\
  --next-rotation-time=2024-04-01T00:00:00Z

# 非対称署名キーを作成（コード署名・JWT 署名など）
gcloud kms keys create my-asymmetric-key \\
  --keyring=my-keyring \\
  --location=asia-northeast1 \\
  --purpose=asymmetric-signing \\
  --default-algorithm=ec-sign-p256-sha256

# ===== 暗号化・復号化 =====

# ファイルを暗号化
gcloud kms encrypt \\
  --keyring=my-keyring \\
  --key=my-symmetric-key \\
  --location=asia-northeast1 \\
  --plaintext-file=sensitive-data.txt \\
  --ciphertext-file=sensitive-data.enc

# ファイルを復号化
gcloud kms decrypt \\
  --keyring=my-keyring \\
  --key=my-symmetric-key \\
  --location=asia-northeast1 \\
  --ciphertext-file=sensitive-data.enc \\
  --plaintext-file=decrypted-data.txt

# ===== キーバージョン管理 =====

# キーの全バージョン一覧
gcloud kms keys versions list \\
  --key=my-symmetric-key \\
  --keyring=my-keyring \\
  --location=asia-northeast1

# 古いキーバージョンを無効化（既存データへのアクセスは可能）
gcloud kms keys versions disable 1 \\
  --key=my-symmetric-key \\
  --keyring=my-keyring \\
  --location=asia-northeast1`}</code></pre>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">12.3</span> CMEK による Cloud Storage の暗号化</div>
                <div className="code-block">
                    <pre><code>{`# Cloud Storage バケットに CMEK を設定
gcloud storage buckets update gs://my-sensitive-bucket \\
  --default-kms-key=projects/PROJECT/locations/asia-northeast1/keyRings/my-keyring/cryptoKeys/my-symmetric-key

# SA に Cloud Storage バケットがキーを使う権限を付与
gcloud kms keys add-iam-policy-binding my-symmetric-key \\
  --keyring=my-keyring \\
  --location=asia-northeast1 \\
  --member="serviceAccount:service-PROJECT_NUMBER@gs-project-accounts.iam.gserviceaccount.com" \\
  --role="roles/cloudkms.cryptoKeyEncrypterDecrypter"`}</code></pre>
                </div>

                <div className="ctable-wrap mt-4">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>KMS ロール</th>
                                <th>権限</th>
                            </tr>
                        </thead>
                        <tbody>
                            {KMS_ROLES.map((item, i) => (
                                <tr key={i}>
                                    <td><code>{item.role}</code></td>
                                    <td>{item.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="tdesc mt-4">🔗 <strong>参考</strong>: https://cloud.google.com/kms/docs/overview</p>
            </div>
        </div>
    );
}

function Chapter13() {
    return (
        <div id="ch13" className="sec-head">
            <h2 className="stitle"><span className="sn3">13</span> VPC Service Controls</h2>
            
            <div className="tcard">
                <div className="ttitle"><span className="tid">13.1</span> VPC Service Controls とは？</div>
                <div className="code-block">
                    <pre><code>{`【VPC Service Controls の目的】

通常の IAM:
  「誰が何のリソースにアクセスできるか」を制御

VPC Service Controls:
  「どこから」アクセスできるかを制御
  （IAM と組み合わせてより強固なセキュリティを実現）

【防御できる脅威】

脅威1: データの持ち出し（Data Exfiltration）
  攻撃者が会社の BigQuery データを
  自分の Google Cloud プロジェクトにコピーしようとする
  → VPC Service Controls でブロック！

脅威2: 認証情報の盗難後のアクセス
  盗まれた SA キーで外部から Cloud Storage にアクセスしようとする
  → VPC Service Controls で許可された場所からのみアクセス！

脅威3: フィッシング後の不正アクセス
  社員が騙されてフィッシングサイトで認証情報を入力
  → 特定の IP / VPC からのみアクセスを許可しているためブロック！`}</code></pre>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">13.2</span> VPC Service Controls の設計</div>
                <div className="code-block">
                    <pre><code>{`【サービス境界（Service Perimeter）の構造】

サービス境界（Service Perimeter）:
  ├── 保護対象プロジェクト: project-A, project-B
  ├── 保護対象 API: BigQuery, Cloud Storage, Cloud SQL
  │
  ├── アクセスポリシー（誰がアクセスできるか）:
  │   ├── VPC Network: my-corp-vpc（社内ネットワークから）
  │   ├── IP アドレス範囲: 203.0.113.0/24（会社の外部 IP）
  │   └── SA: trusted-sa@project.iam.gserviceaccount.com
  │
  └── アクセスレベル（Access Level）:
      └── 上記の組み合わせで定義

境界外からのアクセス → PERMISSION DENIED
境界内からのアクセス → IAM で判断`}</code></pre>
                </div>
                <div className="code-block mt-4">
                    <pre><code>{`# アクセスポリシーの作成
gcloud access-context-manager policies create \\
  --organization=ORG_ID \\
  --title="My Corp Access Policy"

# アクセスレベルの作成（会社の VPC + IP 範囲を許可）
gcloud access-context-manager levels create corp-network \\
  --policy=POLICY_ID \\
  --title="Corporate Network Access" \\
  --basic-level-spec=access-level-spec.yaml

# サービス境界の作成
gcloud access-context-manager perimeters create my-perimeter \\
  --policy=POLICY_ID \\
  --title="Data Protection Perimeter" \\
  --resources=projects/PROJECT_NUMBER \\
  --restricted-services=bigquery.googleapis.com,storage.googleapis.com \\
  --access-levels=accessPolicies/POLICY_ID/accessLevels/corp-network`}</code></pre>
                </div>
                <p className="tdesc mt-4">🔗 <strong>参考</strong>: https://cloud.google.com/vpc-service-controls/docs/overview</p>
            </div>
        </div>
    );
}

function Chapter14() {
    return (
        <div id="ch14" className="sec-head">
            <h2 className="stitle"><span className="sn4">14</span> Identity-Aware Proxy (IAP)</h2>
            
            <div className="tcard">
                <div className="ttitle"><span className="tid">14.1</span> IAP とは？</div>
                <div className="code-block">
                    <pre><code>{`【IAP がない場合（従来の方法）】

ユーザー → インターネット → VPN → 社内システム
または
ユーザー → インターネット → Bastion Host → 社内システム

問題点:
  ├── VPN のセットアップが面倒
  ├── Bastion Host の管理コスト
  └── VPN が侵害されると内部に全アクセス

【IAP がある場合（ゼロトラストアクセス）】

ユーザー → インターネット → IAP → Google 内部ネットワーク → アプリ
              ↑
         認証・認可をここで実施
         ・Google アカウントで認証
         ・IAM で認可（どのユーザーがアクセス可能か）
         ・デバイスのセキュリティ状態を確認
         ・VPN 不要！`}</code></pre>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">14.2</span> IAP の設定</div>
                <div className="code-block">
                    <pre><code>{`# Cloud Run サービスに IAP を有効化
# （先にロードバランサを設定し、IAP はバックエンドサービスに適用）

# バックエンドサービスに IAP を有効化
gcloud compute backend-services update my-backend-service \\
  --iap=enabled \\
  --oauth2-client-id=CLIENT_ID \\
  --oauth2-client-secret=CLIENT_SECRET \\
  --global

# ユーザーにアクセスを許可
gcloud iap web add-iam-policy-binding \\
  --resource-type=backend-services \\
  --service=my-backend-service \\
  --member="user:alice@example.com" \\
  --role="roles/iap.httpsResourceAccessor"

# グループにアクセスを許可（推奨）
gcloud iap web add-iam-policy-binding \\
  --resource-type=backend-services \\
  --service=my-backend-service \\
  --member="group:internal-users@example.com" \\
  --role="roles/iap.httpsResourceAccessor"`}</code></pre>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">14.3</span> IAP による SSH / TCP トンネリング</div>
                <p className="tdesc">VPN なしで VM や GKE ノードに安全に接続できます。</p>
                <div className="code-block">
                    <pre><code>{`# IAP トンネル経由で VM に SSH 接続
gcloud compute ssh VM_NAME \\
  --zone=asia-northeast1-a \\
  --tunnel-through-iap
# → 外部 IP なし・ファイアウォールで SSH を開放していない VM にも接続可能！

# IAP トンネル経由でローカルポートフォワーディング
# 例: Cloud SQL に直接接続（Auth Proxy の代替）
gcloud compute start-iap-tunnel VM_NAME 3306 \\
  --local-host-port=localhost:3307 \\
  --zone=asia-northeast1-a
# → localhost:3307 → IAP → VM の 3306 にトンネル`}</code></pre>
                </div>

                <p className="stitle mt-4">✅ ベストプラクティス: IAP</p>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>ベストプラクティス</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>1</td><td><strong>VPN の代わりに IAP</strong> でゼロトラストアクセスを実現</td></tr>
                            <tr><td>2</td><td><strong>VM の外部 IP を削除</strong>し、IAP トンネル経由でのみ SSH を許可</td></tr>
                            <tr><td>3</td><td><strong>グループで IAP アクセスを管理</strong>（個人への付与は避ける）</td></tr>
                            <tr><td>4</td><td><strong>IAP + OS Login の組み合わせ</strong>で多層防御</td></tr>
                        </tbody>
                    </table>
                </div>
                <p className="tdesc mt-4">🔗 <strong>参考</strong>: https://cloud.google.com/iap/docs/concepts-overview</p>
            </div>
        </div>
    );
}

function Chapter15() {
    return (
        <div id="ch15" className="sec-head">
            <h2 className="stitle"><span className="sn5">15</span> Cloud Armor（DDoS 防御 / WAF）</h2>
            
            <div className="tcard">
                <div className="ttitle"><span className="tid">15.1</span> Cloud Armor の役割</div>
                <div className="code-block">
                    <pre><code>{`【Cloud Armor が保護するレイヤ】

インターネット → Cloud Armor → Cloud Load Balancer → バックエンド
     ↑
  DDoS 攻撃・悪意のあるリクエストをここでブロック

【Cloud Armor でできること】

① L3/L4 DDoS 防御（自動）
   → ネットワーク層の大規模 DDoS を自動的に軽減

② L7 WAF（Web Application Firewall）
   → SQL インジェクション、XSS などの攻撃を検出・ブロック

③ IP ベースのアクセス制御
   → 特定の IP アドレスをブロック or 許可リスト

④ 地理情報ベースのアクセス制御
   → 特定の国からのアクセスをブロック

⑤ レート制限
   → 1つの IP からの大量リクエストを制限`}</code></pre>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">15.2</span> Cloud Armor のセキュリティポリシー設定</div>
                <div className="code-block">
                    <pre><code>{`# セキュリティポリシーを作成
gcloud compute security-policies create my-waf-policy \\
  --description="WAF and DDoS protection for production"

# ===== WAF ルール（OWASP ルールセット）=====

# SQL インジェクション対策ルールを追加
gcloud compute security-policies rules create 1000 \\
  --security-policy=my-waf-policy \\
  --expression="evaluatePreconfiguredExpr('sqli-v33-stable')" \\
  --action=deny-403 \\
  --description="Block SQL injection attempts"

# XSS（クロスサイトスクリプティング）対策
gcloud compute security-policies rules create 1001 \\
  --security-policy=my-waf-policy \\
  --expression="evaluatePreconfiguredExpr('xss-v33-stable')" \\
  --action=deny-403 \\
  --description="Block XSS attempts"

# ===== IP ベースのルール =====

# 特定 IP をブロック
gcloud compute security-policies rules create 2000 \\
  --security-policy=my-waf-policy \\
  --src-ip-ranges=203.0.113.100/32 \\
  --action=deny-403 \\
  --description="Block known malicious IP"

# 特定の国からのアクセスをブロック
gcloud compute security-policies rules create 3000 \\
  --security-policy=my-waf-policy \\
  --expression="origin.region_code == 'XX'" \\
  --action=deny-403 \\
  --description="Block traffic from country XX"

# ===== レート制限 =====

# 1 IP あたり 100 リクエスト/60 秒に制限
gcloud compute security-policies rules create 4000 \\
  --security-policy=my-waf-policy \\
  --expression="true" \\
  --action=rate-based-ban \\
  --rate-limit-threshold-count=100 \\
  --rate-limit-threshold-interval-sec=60 \\
  --ban-duration-sec=600 \\
  --conform-action=allow \\
  --exceed-action=deny-429 \\
  --description="Rate limiting per IP"

# ===== ポリシーを LB バックエンドサービスに適用 =====
gcloud compute backend-services update my-backend-service \\
  --security-policy=my-waf-policy \\
  --global`}</code></pre>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">15.3</span> Cloud Armor のアダプティブ保護（Adaptive Protection）</div>
                <div className="code-block">
                    <pre><code>{`【Adaptive Protection とは？】

Google の ML モデルがトラフィックを分析:
  ├── 通常のトラフィックパターンを学習
  ├── 異常なトラフィック（DDoS の可能性）を検出
  ├── ブロックルールを自動提案
  └── ワンクリックで適用可能

設定方法:
  gcloud compute security-policies update my-waf-policy \\
    --enable-layer7-ddos-defense

→ 大規模 DDoS 攻撃時に自動的に保護ルールを適用`}</code></pre>
                </div>

                <p className="stitle mt-4">✅ ベストプラクティス: Cloud Armor</p>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>ベストプラクティス</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>1</td><td><strong>すべての本番 ALB に Cloud Armor を設定</strong></td></tr>
                            <tr><td>2</td><td><strong>OWASP Top 10 対策ルールを有効化</strong>（WAF ルールセット）</td></tr>
                            <tr><td>3</td><td><strong>レート制限で DDoS によるコスト暴走を防止</strong></td></tr>
                            <tr><td>4</td><td><strong>Adaptive Protection を有効化</strong>して ML ベースの自動保護</td></tr>
                            <tr><td>5</td><td><strong>プリコンフィグ済みルールはまず `preview` モードで確認</strong></td></tr>
                        </tbody>
                    </table>
                </div>
                <p className="tdesc mt-4">🔗 <strong>参考</strong>: https://cloud.google.com/armor/docs/overview</p>
            </div>
        </div>
    );
}

function Chapter16({ findings }: { findings: any[] }) {
    return (
        <div id="ch16" className="sec-head">
            <h2 className="stitle"><span className="sn1">16</span> Security Command Center (SCC)</h2>
            
            <div className="tcard">
                <div className="ttitle"><span className="tid">16.1</span> Security Command Center とは？</div>
                <div className="code-block">
                    <pre><code>{`【SCC の目的と位置づけ】

Security Command Center = Google Cloud のセキュリティ管理センター

機能:
  ├── 脆弱性の自動検出（VM の設定ミス、公開バケットなど）
  ├── 脅威の検出（不審な操作、マルウェアなど）
  ├── コンプライアンス状況の可視化（CIS Benchmark など）
  └── セキュリティスコアの提供

【SCC のサービス階層】

Standard（無料）:
  ├── Security Health Analytics（設定ミスの検出）
  ├── Web Security Scanner（基本）
  └── Cloud Asset Inventory との統合

Premium（有料）:
  ├── Event Threat Detection（リアルタイム脅威検出）
  ├── Container Threat Detection（GKE の脅威）
  ├── Virtual Machine Threat Detection（VM のマルウェア）
  └── Web Security Scanner（高度）`}</code></pre>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">16.2</span> Security Health Analytics（設定ミスの検出）</div>
                <p className="tdesc">SCC は以下のような設定ミスを自動的に検出してアラートを出します。</p>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>検出カテゴリ</th>
                                <th>具体的な検出内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            {findings.map((item, i) => (
                                <tr key={i}>
                                    <td><strong>{item.category}</strong></td>
                                    <td>{item.details}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">16.3</span> SCC の所見（Findings）の確認</div>
                <div className="code-block">
                    <pre><code>{`# SCC の所見一覧を確認
gcloud scc findings list ORGANIZATION_ID \\
  --source=ALL \\
  --filter="state=ACTIVE AND severity=HIGH" \\
  --format="table(name,category,severity,state)"

# 特定のプロジェクトの所見
gcloud scc findings list ORGANIZATION_ID \\
  --source=ALL \\
  --filter="resourceName:projects/my-project AND state=ACTIVE"

# 所見を解消済みとしてマーク
gcloud scc findings update FINDING_NAME \\
  --source=SOURCE_ID \\
  --organization=ORG_ID \\
  --state=INACTIVE`}</code></pre>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">16.4</span> Binary Authorization（コンテナの完全性保証）</div>
                <div className="code-block">
                    <pre><code>{`【Binary Authorization の目的】

問題:
  「誰でもどんなコンテナイメージでも GKE にデプロイできる」
  → サプライチェーン攻撃に弱い
  → テストしていないイメージが本番に入るリスク

解決策: Binary Authorization

CI/CD パイプライン:
  コードビルド → テスト合格 → 承認済み署名をイメージに付与

GKE デプロイ時:
  Binary Authorization がポリシーを確認
    ├── 有効な署名あり → デプロイ許可 ✅
    └── 署名なし / 無効な署名 → デプロイ拒否 ❌ + アラート

【防げる攻撃】
  ├── 承認されていないイメージの誤デプロイ
  ├── サプライチェーン攻撃（npm パッケージへの悪意のあるコード）
  └── 開発者による手動デプロイ（CI/CD をバイパス）`}</code></pre>
                </div>
                <div className="code-block mt-4">
                    <pre><code>{`# Binary Authorization を GKE クラスタで有効化
gcloud container clusters update my-cluster \\
  --binauthz-evaluation-mode=PROJECT_SINGLETON_POLICY_ENFORCE \\
  --region=asia-northeast1

# 証明者（Attestor）の作成
# 証明者 = 「このイメージを承認できる人/サービス」の定義
gcloud container binauthz attestors create my-attestor \\
  --attestation-authority-note=projects/PROJECT/notes/my-note \\
  --attestation-authority-note-project=PROJECT

# ポリシーの設定（すべてのイメージに署名を要求）
cat > policy.yaml <<EOF
defaultAdmissionRule:
  evaluationMode: REQUIRE_ATTESTATION
  enforcementMode: ENFORCED_BLOCK_AND_AUDIT_LOG
  requireAttestationsBy:
    - projects/PROJECT/attestors/my-attestor
globalPolicyEvaluationMode: ENABLE
EOF

gcloud container binauthz policy import policy.yaml`}</code></pre>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">16.5</span> ファイアウォールルールのセキュリティ設計</div>
                
                <h3 className="stitle">ファイアウォール設計の原則</h3>
                <div className="code-block">
                    <pre><code>{`【デフォルト拒否（Default Deny）の原則】

ネットワークのデフォルト状態:
  すべてのトラフィックを拒否
    ↓ 明示的に許可したもののみ通過

GCP のデフォルトファイアウォール:
  ├── INGRESS: すべて拒否（デフォルト）
  └── EGRESS: すべて許可（デフォルト）
      ↑ 本番環境では Egress も制限することを検討`}</code></pre>
                </div>

                <h3 className="stitle">安全なファイアウォール設計パターン</h3>
                <div className="code-block">
                    <pre><code>{`# ===== 推奨パターン: タグベースのルール =====

# Web サーバーへの HTTP/HTTPS のみ許可
gcloud compute firewall-rules create allow-http-https-to-web \\
  --network=prod-vpc \\
  --direction=INGRESS \\
  --priority=1000 \\
  --action=ALLOW \\
  --rules=tcp:80,tcp:443 \\
  --target-tags=web-server \\        # web-server タグを持つ VM のみ
  --source-ranges=0.0.0.0/0 \\
  --description="Allow HTTP/HTTPS traffic to web servers"

# App サーバーへはロードバランサからのみ許可
gcloud compute firewall-rules create allow-app-from-lb \\
  --network=prod-vpc \\
  --direction=INGRESS \\
  --priority=1000 \\
  --action=ALLOW \\
  --rules=tcp:8080 \\
  --target-tags=app-server \\
  --source-tags=web-server          # web-server タグからのみ

# DB サーバーへはアプリサーバーからのみ許可
gcloud compute firewall-rules create allow-db-from-app \\
  --network=prod-vpc \\
  --direction=INGRESS \\
  --priority=1000 \\
  --action=ALLOW \\
  --rules=tcp:5432 \\
  --target-tags=db-server \\
  --source-tags=app-server          # app-server タグからのみ

# SSH は IAP からのみ許可（外部からの直接 SSH を完全ブロック）
gcloud compute firewall-rules create allow-ssh-iap \\
  --network=prod-vpc \\
  --direction=INGRESS \\
  --priority=1000 \\
  --action=ALLOW \\
  --rules=tcp:22 \\
  --target-tags=ssh-allowed \\
  --source-ranges=35.235.240.0/20   # IAP の IP レンジ`}</code></pre>
                </div>

                <h3 className="stitle">❌ やってはいけないファイアウォール設定</h3>
                <div className="code-block">
                    <pre><code>{`# ❌ 危険: SSH を全世界に公開
gcloud compute firewall-rules create bad-ssh-rule \\
  --action=ALLOW \\
  --rules=tcp:22 \\
  --source-ranges=0.0.0.0/0   # すべての IP から SSH 接続可能！

# ❌ 危険: タグなし（全 VM に適用）
gcloud compute firewall-rules create bad-rule \\
  --action=ALLOW \\
  --rules=tcp:3389 \\           # RDP を全 VM に公開
  --source-ranges=0.0.0.0/0

# ✅ 修正: IAP からの SSH のみ許可、特定タグの VM のみ
gcloud compute firewall-rules create good-ssh-rule \\
  --action=ALLOW \\
  --rules=tcp:22 \\
  --source-ranges=35.235.240.0/20 \\  # IAP の IP レンジ
  --target-tags=bastion-only          # 限定された VM のみ`}</code></pre>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">16.6</span> OS Login と多層防御（再確認）</div>
                <p className="tdesc">Domain 4 として改めて OS Login の重要性を整理します。</p>
                <div className="code-block">
                    <pre><code>{`【OS Login の多層防御効果】

層1: IAM（誰が SSH できるか）
  roles/compute.osLogin        → SSH 接続（sudo なし）
  roles/compute.osAdminLogin   → SSH 接続（sudo あり）
  → IAM で制御されるため、退職者は即時アクセス不可

層2: OS Login 自体の設定
  enable-oslogin=TRUE          → OS Login 有効化
  enable-oslogin-2fa=TRUE      → 2 要素認証必須

層3: ファイアウォールルール
  SSH は IAP からのみ許可（35.235.240.0/20）
  → 外部 IP からの直接アクセスを完全ブロック

層4: 組織ポリシー（強制適用）
  constraints/compute.requireOsLogin
  → 全 VM で OS Login を強制（設定し忘れ防止）

→ この 4 層すべてを通過しないと VM にアクセスできない！`}</code></pre>
                </div>
            </div>
        </div>
    );
}

function Chapter17({ practices }: { practices: any[] }) {
    return (
        <div id="ch17" className="sec-head">
            <h2 className="stitle"><span className="sn2">17</span> Domain 4 試験対策まとめ</h2>
            
            <div className="tcard">
                <div className="ttitle"><span className="tid">17.1</span> 試験頻出パターン</div>
                <div className="code-block">
                    <pre><code>{`【パターン①: IAM ロールの選択問題】
「フロントエンドエンジニアは Cloud Run へのデプロイと
 Artifact Registry からのイメージプルができる必要がある。
 最小権限のロールはどれか？」

考え方:
  Step 1: 必要な操作を特定
    ├── Cloud Run のデプロイ → roles/run.developer
    └── Artifact Registry の読み取り → roles/artifactregistry.reader

  Step 2: 基本ロールは選ばない
    ❌ roles/editor（過剰権限）
    ✅ roles/run.developer + roles/artifactregistry.reader

【よくある誤答パターン】
  ❌ roles/owner（問題外の過剰権限）
  ❌ roles/editor（多くの不要な権限が含まれる）
  ✅ 事前定義ロールの組み合わせ または カスタムロール

【パターン②: SA キーの代替手法の問題】
「GitHub Actions から GCP のリソースを操作したい。
 最もセキュアな方法はどれか？」

正解: Workload Identity Federation
  → GitHub OIDC トークンを GCP トークンに交換
  → SA キーを GitHub に保存しない

【パターン③: シークレット管理の問題】
「Cloud Run アプリがデータベースのパスワードを必要とする。
 最もセキュアな管理方法はどれか？」

正解:
  Secret Manager にパスワードを保存
  Cloud Run の --set-secrets フラグで環境変数として注入
  SA に roles/secretmanager.secretAccessor を付与

【パターン④: ネットワークセキュリティの問題】
「本番環境の VM への SSH アクセスをセキュアにしたい。
 外部 IP を持たない VM にも接続できるようにしたい。」

正解: IAP トンネル + OS Login`}</code></pre>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">17.2</span> セキュリティサービスの役割マップ</div>
                <div className="code-block">
                    <pre><code>{`【攻撃経路別のセキュリティサービス】

① 認証・アクセス制御
   IAM: 誰が何をできるか
   OS Login: VM への SSH アクセス
   IAP: VPN 不要のゼロトラストアクセス
   Binary Authorization: 承認済みコンテナのみデプロイ

② シークレット・データ保護
   Secret Manager: パスワード・APIキーの安全な管理
   Cloud KMS: 暗号化キーの管理・CMEK

③ ネットワーク防御
   Cloud Armor: DDoS・WAF（外部からの攻撃）
   VPC Firewall: ネットワーク層のアクセス制御
   VPC Service Controls: データ持ち出し防止

④ 可視化・検出
   Security Command Center: 設定ミス・脅威の検出
   Cloud Audit Logs: 誰が何をしたかの記録
   Cloud Asset Inventory: リソース・IAM の全体把握`}</code></pre>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">17.3</span> Domain 4 全体のベストプラクティス一覧</div>
                <div className="ctable-wrap">
                    <table className="ctable">
                        <thead>
                            <tr>
                                <th>カテゴリ</th>
                                <th>ベストプラクティス</th>
                            </tr>
                        </thead>
                        <tbody>
                            {practices.map((item, i) => (
                                <tr key={i}>
                                    <td><strong>{item.category}</strong></td>
                                    <td>{item.practice}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="wb">
                <div className="wbt">📝 Domain 4 学習の最終アドバイス</div>
                <p>必ず押さえるべき 5 つの核心:</p>
                <ol className="list-decimal pl-6 mt-2 space-y-1">
                    <li><strong>SA JSON キーは使わない</strong> → Workload Identity / ADC / Impersonation</li>
                    <li><strong>基本ロール（Editor/Owner）は本番禁止</strong> → 事前定義ロールを使う</li>
                    <li><strong>Secret Manager でシークレットを管理</strong>（ハードコード・平文禁止）</li>
                    <li><strong>IAP + OS Login で VM への SSH を多層防御</strong>（外部 IP 不要）</li>
                    <li><strong>Cloud Armor ですべての本番 ALB を DDoS/WAF から保護</strong></li>
                </ol>
            </div>
        </div>
    );
}

function Chapter18() {
    return (
        <div id="ch18" className="sec-head">
            <h2 className="stitle"><span className="sn3">18</span> 包括的調査および実践的アーキテクチャガイド</h2>
            
            <div className="tcard">
                <div className="ttitle"><span className="tid">18.1</span> クラウドインフラストラクチャにおけるセキュリティの重要性</div>
                <p className="tdesc">現代のクラウドインフラストラクチャ設計において、強固なセキュリティ基盤の確立と厳格なアクセス制御の実装は、システムの可用性とデータの機密性を担保するための最重要課題です。ゼロトラストアーキテクチャの原則に基づき、最小特権の原則を実際のシステムに適用する実践的な能力が問われます。</p>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">18.2</span> IAM権限とロールの構造的分類</div>
                <p className="tdesc">IAMにおける最小のアクセス制御単位は「権限（Permissions）」であり、通常 <code>service.resource.verb</code> の形式（例：<code>compute.instances.start</code>）で表現されます。これらを論理的に束ねた「ロール（Roles）」をプリンシパルに割り当てます。</p>
                <div className="code-block">
                    <pre><code>{`【ロールの種類と特徴】

基本ロール (Basic Roles):
  「オーナー」「編集者」「閲覧者」。広範なアクセス権を提供。
  本番環境での使用はセキュリティ上の観点から強く非推奨。

事前定義ロール (Predefined Roles):
  Googleが保守。特定のサービスやジョブ機能に特化した細粒度の権限を提供。
  本番環境における標準的かつ最も推奨される選択肢。

カスタムロール (Custom Roles):
  組織独自の要件に適合させるため、任意の権限を組み合わせて定義。
  編集権限を持つプリンシパルに対する厳格な制限が必要（特権昇格リスク）。`}</code></pre>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">18.3</span> IAMポリシーの動的管理とAPIの失敗に対する指数バックオフ戦略</div>
                <div className="code-block">
                    <pre><code>{`【Read-Modify-Write パターン】

大規模な変更をREST APIやクライアントライブラリを通じて実行する場合:
1. Read: getIamPolicy() で現在の許可ポリシーと ETag を取得
2. Modify: JSONオブジェクトに対してプリンシパルの追加・ロール変更を適用
3. Write: setIamPolicy() で送信し、サーバー側で ETag を比較

【Thundering Herd 問題の回避】
IAM APIリクエストが失敗した場合、「ジッター（揺らぎ）を伴う切り捨て指数バックオフ」を適用。
待機時間 = min((2^n + random-fraction), maximum-backoff)
※ 409 (Conflict) エラーの場合は、単なる再試行ではなく、getIamPolicy() からやり直す。`}</code></pre>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">18.4</span> サービスアカウントキーの脆弱性と最新の組織ポリシー</div>
                <div className="code-block">
                    <pre><code>{`2024年のセキュリティ動向レポートによると、認証情報の脆弱性がクラウド侵害の約76%を占めます。
Google Cloudは2024年5月以降、デフォルトで iam.disableServiceAccountKeyCreation の強力な組織ポリシーを適用しています。

キーを使用せざるを得ない環境での運用ルール:
・一時ディレクトリや公開された共有フォルダに絶対に放置しない。
・ユーザー間で電子メールやチャットツールを通じて直接受け渡ししない。
・GitHubやGitLabなどのソースコードリポジトリにキーを含めてコミットしない。
・アプリケーションの実行バイナリの内部にキーをハードコードして埋め込まない。
・定期的なローテーションポリシーを確立し自動化する。`}</code></pre>
                </div>
            </div>

            <div className="tcard">
                <div className="ttitle"><span className="tid">18.5</span> Cloud Audit Logsによる監視体制とコンプライアンスの確保</div>
                <div className="code-block">
                    <pre><code>{`【監査ログの4つのカテゴリ】

管理アクティビティ監査ログ (Admin Activity):
  リソースの構成変更を記録。強制的に有効（無料）、400日間保存。

データアクセス監査ログ (Data Access):
  ユーザーデータに対する作成・変更・読み取りを記録。
  デフォルト無効。有効化時は膨大なボリュームに注意。
  「免除されたプリンシパル」を設定してノイズを削減することが重要。

システムイベント監査ログ (System Event):
  Google Cloudシステム側が自律的に実行したイベント。常に有効（無料）。

ポリシー拒否監査ログ (Policy Denied):
  セキュリティポリシー違反や拒否されたアクセス試行を記録。デフォルト有効。`}</code></pre>
                </div>
            </div>
        </div>
    );
}

export default function Domain4Page() {
    return (
        <main className="d4-page">
            <section className="hero">
                <div className="hero-eyebrow">ACE Exam Preparation</div>
                <h1><span>Domain 4</span><br />アクセスとセキュリティの構成</h1>
                <p className="hero-sub">
                    Identity and Access Management (IAM), Service Accounts, Security Command Center, Cloud Armor, and more.
                </p>
                <div className="hero-meta">
                    <span className="hero-badge"><span className="dot dot-purple"></span>試験比重: 約20%</span>
                </div>
            </section>

            <nav className="snav">
                <div className="snav-inner">
                    <a href="#ch1" className="snav-link"><span className="snav-num">01</span> セキュリティの基本</a>
                    <a href="#ch2" className="snav-link"><span className="snav-num">02</span> IAMアーキテクチャ</a>
                    <a href="#ch3" className="snav-link"><span className="snav-num">03</span> ロールの 3 種類</a>
                    <a href="#ch4" className="snav-link"><span className="snav-num">04</span> IAM ポリシー管理</a>
                    <a href="#ch5" className="snav-link"><span className="snav-num">05</span> 条件付き IAM</a>
                    <a href="#ch6" className="snav-link"><span className="snav-num">06</span> サービスアカウント</a>
                    <a href="#ch7" className="snav-link"><span className="snav-num">07</span> SA キーのリスク</a>
                    <a href="#ch8" className="snav-link"><span className="snav-num">08</span> Workload Identity</a>
                    <a href="#ch9" className="snav-link"><span className="snav-num">09</span> ADC</a>
                    <a href="#ch10" className="snav-link"><span className="snav-num">10</span> Impersonation / PAM</a>
                    <a href="#ch11" className="snav-link"><span className="snav-num">11</span> Secret Manager</a>
                    <a href="#ch12" className="snav-link"><span className="snav-num">12</span> Cloud KMS</a>
                    <a href="#ch13" className="snav-link"><span className="snav-num">13</span> VPC Service Controls</a>
                    <a href="#ch14" className="snav-link"><span className="snav-num">14</span> IAP</a>
                    <a href="#ch15" className="snav-link"><span className="snav-num">15</span> Cloud Armor</a>
                    <a href="#ch16" className="snav-link"><span className="snav-num">16</span> SCC</a>
                    <a href="#ch17" className="snav-link"><span className="snav-num">17</span> Domain 4 まとめ</a>
                    <a href="#ch18" className="snav-link"><span className="snav-num">18</span> 包括的調査ガイド</a>
                </div>
            </nav>

            <div className="wrapper">
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
                <Chapter11 />
                <Chapter12 />
                <Chapter13 />
                <Chapter14 />
                <Chapter15 />
                <Chapter16 findings={SCC_FINDINGS} />
                <Chapter17 practices={DOMAIN4_BEST_PRACTICES} />
                <Chapter18 />
            </div>
        </main>
    );
}
