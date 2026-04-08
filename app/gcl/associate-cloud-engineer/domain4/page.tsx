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
                    <a href="#ch1" className="snav-link"><span className="snav-num">01</span> セキュリ ティの基本</a>
                    <a href="#ch2" className="snav-link"><span className="snav-num">02</span> IAMアーキテクチャ</a>
                    <a href="#ch3" className="snav-link"><span className="snav-num">03</span> ロールの 3 種類</a>
                    <a href="#ch4" className="snav-link"><span className="snav-num">04</span> IAM ポリ シー管理</a>
                    <a href="#ch5" className="snav-link"><span className="snav-num">05</span> 条件付き IAM</a>
                    <a href="#ch6" className="snav-link"><span className="snav-num">06</span> サービスアカウント</a>
                    <a href="#ch7" className="snav-link"><span className="snav-num">07</span> SA キーのリスク</a>
                    <a href="#ch8" className="snav-link"><span className="snav-num">08</span> Workload Identity</a>
                    <a href="#ch9" className="snav-link"><span className="snav-num">09</span> ADC</a>
                    <a href="#ch10" className="snav-link"><span className="snav-num">10</span> Impersonation / PAM</a>
                    <a href="#ch11" className="snav-link"><span className="snav-num">11</span> Secret Manager</a>
                    <a href="#ch12" className="snav-link"><span className="snav-num">12</span> Cloud KMS</a>
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
            </div>
        </main>
    );
}
