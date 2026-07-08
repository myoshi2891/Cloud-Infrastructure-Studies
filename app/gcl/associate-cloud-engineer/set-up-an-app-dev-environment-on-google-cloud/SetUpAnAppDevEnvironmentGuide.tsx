'use client';

import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS } from './constants';
import NavBar from './NavBar';

/**
 * Set Up an App Dev Environment on Google Cloud ガイドのクライアントコンポーネント。
 * 本文マークアップ、各セクションのコンテンツ、Mermaid図のレンダリングを含む。
 */
export default function SetUpAnAppDevEnvironmentGuide() {
    return (
        <div className="app-dev-environment-page">
            {/* ===================== Top bar ===================== */}
            {/* グローバルヘッダーが常駐するため、ここは元のブランド表記のみをヘッダー直下のアクセントとして表示 */}
            <div className="topbar" style={{ display: 'none' }}>
                <div className="topbar__brand">
                    <span className="topbar__dots"><i></i><i></i><i></i><i></i></span>
                    App Dev Environment on Google Cloud
                </div>
                <span className="topbar__tag">course_templates / 637</span>
                <a className="topbar__src" href="https://www.skills.google/course_templates/637" target="_blank" rel="noopener">skills.google ↗</a>
            </div>

            <div className="shell">
                <NavBar />

                {/* ===================== Main ===================== */}
                <main>
                    <div className="wrap">
                        {/* ===================== Hero ===================== */}
                        <header className="hero">
                            <span className="hero__eyebrow">Google Cloud · ハンズオン学習ガイド</span>
                            <h1>4つのサービスを繋いで<br /><span className="g1">保存</span>・<span className="g2">権限</span>・<span className="g3">処理</span>・<span className="g4">通知</span>を<br />ひとつのパイプラインにする。</h1>
                            <p className="hero__lead">
                                写真管理アプリ「Memories」を題材に、Cloud Storage・IAM・Cloud Functions・Pub/Sub を組み合わせた
                                <strong>イベント駆動サーバーレス環境</strong>をゼロから構築します。各サービスを「定義 → なぜ使うか → 具体例 → コード → ベストプラクティス」の順で解説し、最後に Challenge Lab（GSP315）で統合します。
                            </p>
                            <div className="hero__meta">
                                <span>対象：<b>初学者〜ジュニアエンジニア</b></span>
                                <span>学習時間：<b>約1時間15分＋Lab 1時間</b></span>
                                <span>最終更新：<b>2026-07-01</b></span>
                            </div>

                            {/* Signature: pipeline rail */}
                            <div className="rail-flow" role="img" aria-label="学習パイプライン：Cloud Storage、IAM、Cloud Functions、Pub/Sub、Challenge Lab の5ステージ">
                                <div className="rail__stop s1"><div className="rail__num">01</div><span className="rail__node"></span><div className="rail__name">Cloud Storage</div><div className="rail__role">データの置き場</div></div>
                                <div className="rail__stop s2"><div className="rail__num">02</div><span className="rail__node"></span><div className="rail__name">Cloud IAM</div><div className="rail__role">アクセス制御</div></div>
                                <div className="rail__stop s3"><div className="rail__num">03</div><span className="rail__node"></span><div className="rail__name">Functions</div><div className="rail__role">イベント処理</div></div>
                                <div className="rail__stop s4"><div className="rail__num">04</div><span className="rail__node"></span><div className="rail__name">Pub/Sub</div><div className="rail__role">非同期通知</div></div>
                                <div className="rail__stop s5"><div className="rail__num">05</div><span className="rail__node"></span><div className="rail__name">Challenge</div><div className="rail__role">GSP315 統合</div></div>
                            </div>
                        </header>

                        {/* ===================== 1. About ===================== */}
                        <section id="s1" className="sec-violet">
                            <div className="station">
                                <div className="station__no">01</div>
                                <div className="station__body">
                                    <span className="station__kicker">Orientation</span>
                                    <h2><span className="station__chip"></span>このガイドについて</h2>
                                </div>
                            </div>

                            <h3><span className="mk">1.1</span>スコープに関する注記</h3>
                            <p>
                                Google Skills（旧 Google Cloud Skills Boost）の個別ラボページは、受講登録済みアカウントでのサインインが必須のため、ラボ ID 単位（<code>/labs/592541</code> 〜 <code>/labs/592550</code>）での本文取得はできません。そのため本ガイドは、以下の情報源を根拠として再構成しています。
                            </p>
                            <ul>
                                <li>コース <code>course_templates/637</code> の<strong>公式コース概要</strong>に明記された技術スコープ：Cloud Storage、IAM、Cloud Functions、Pub/Sub</li>
                                <li>本コース末尾の Challenge Lab（<code>labs/592550</code>）である <strong>GSP315</strong> の公開シナリオ・タスク構成</li>
                                <li>各サービスの Google Cloud 公式ドキュメント（ベストプラクティスページ）</li>
                            </ul>
                            <p>
                                一般的にこの構成のコースは、①Cloud Storage の基本操作、②IAM によるアクセス制御、③Cloud Functions（現行の Cloud Run functions）のデプロイ、④Pub/Sub のメッセージング、という4つの実習を経て、最後にこれらを統合する Challenge Lab（GSP315）で総仕上げを行います。本ガイドはこの流れに沿って各サービスを解説します。
                            </p>

                            <h3><span className="mk">1.2</span>提供された参照 URL の位置づけ</h3>
                            <div className="tbl-wrap">
                                <table>
                                    <thead><tr><th scope="col">#</th><th scope="col">URL（末尾）</th><th scope="col">位置づけ（推定）</th></tr></thead>
                                    <tbody>
                                        <tr><td>1</td><td><code>labs/592541</code></td><td>コース前半：Cloud Storage 実習</td></tr>
                                        <tr><td>2</td><td><code>labs/592542</code></td><td>Cloud Storage 実習（CLI/SDK）</td></tr>
                                        <tr><td>3</td><td><code>labs/592543</code></td><td>Cloud IAM 実習</td></tr>
                                        <tr><td>4</td><td><code>labs/592544</code></td><td>Cloud Functions 実習（コンソール）</td></tr>
                                        <tr><td>5</td><td><code>labs/592545</code></td><td>Cloud Functions 実習（コマンドライン）</td></tr>
                                        <tr><td>6</td><td><code>labs/592546</code></td><td>Pub/Sub 実習（コンソール）</td></tr>
                                        <tr><td>7</td><td><code>labs/592547</code></td><td>Pub/Sub 実習（コマンドライン）</td></tr>
                                        <tr><td>8</td><td><code>labs/592548</code></td><td>Pub/Sub 実習（補足／言語別クライアント）</td></tr>
                                        <tr><td>9</td><td><code>labs/592549</code></td><td>復習クイズ／知識確認</td></tr>
                                        <tr><td>10</td><td><code>labs/592550</code></td><td className="lead">Challenge Lab（GSP315）※確認済み</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="note">
                                <span className="note__ico">⚠</span>
                                <span>9番までの厳密なラベルはサインインしないと確認できないため「推定」です。ただし <b>10番目が Challenge Lab (GSP315)</b> であることは、複数の独立した情報源で一致しており確度は高いです。</span>
                            </div>
                        </section>

                        <hr className="rule" />

                        {/* ===================== 2. Learning path ===================== */}
                        <section id="s2" className="sec-violet">
                            <div className="station">
                                <div className="station__no">02</div>
                                <div className="station__body">
                                    <span className="station__kicker">Learning Path</span>
                                    <h2><span className="station__chip"></span>コース全体像とラーニングパス</h2>
                                </div>
                            </div>
                            <p>
                                このコースは「写真管理アプリ Memories」というシナリオを軸に、<strong>ストレージ・権限管理・サーバーレス処理・非同期通知</strong>という、モダンなアプリ開発環境の基本4要素を一気通貫で学びます。
                            </p>

                            <div className="diagram">
                                <p className="diagram__cap">Fig 2.1 — 学習パイプラインの全体像</p>
                                <div className="mermaid" id="diag-learning-path">
                                    <MermaidDiagram chart={DIAGRAMS['diag-learning-path']} ariaLabel="学習パイプラインの全体像" />
                                </div>
                            </div>

                            <h3><span className="mk">2.1</span>なぜこの順番で学ぶのか</h3>
                            <div className="tbl-wrap">
                                <table>
                                    <thead><tr><th scope="col">順番</th><th scope="col">サービス</th><th scope="col">このコースにおける役割</th></tr></thead>
                                    <tbody>
                                        <tr><td>1</td><td className="lead">Cloud Storage</td><td>画像などの非構造化データを保存する「置き場」を作る</td></tr>
                                        <tr><td>2</td><td className="lead">IAM</td><td>誰が・どのリソースに・何をできるかを制御する土台を理解する</td></tr>
                                        <tr><td>3</td><td className="lead">Cloud Functions</td><td>アップロードを<strong>トリガー</strong>に自動処理（サムネイル生成など）を実行する</td></tr>
                                        <tr><td>4</td><td className="lead">Pub/Sub</td><td>処理結果を他システムに<strong>非同期で通知</strong>する</td></tr>
                                        <tr><td>5</td><td className="lead">Challenge Lab</td><td>上記すべてを組み合わせ、実務に近いシナリオを自力で完成させる</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            <p>
                                この流れは「ストレージにファイルが置かれる → 権限に基づいてイベントが検知される → 関数が起動して加工する → 完了をメッセージングで知らせる」という、<strong>サーバーレスなイベント駆動アーキテクチャの典型パターン</strong>そのものです。
                            </p>
                        </section>

                        <hr className="rule" />

                        {/* ===================== 3. Cloud Storage ===================== */}
                        <section id="s3" className="sec-storage">
                            <div className="station">
                                <div className="station__no">03</div>
                                <div className="station__body">
                                    <span className="station__kicker">Object Storage</span>
                                    <h2><span className="station__chip"></span>Cloud Storage — オブジェクトストレージの基礎</h2>
                                </div>
                            </div>

                            <h3><span className="mk">3.1</span>定義</h3>
                            <p>
                                Cloud Storage は、任意の量の非構造化データ（画像・動画・ログ・バックアップなど）を<strong>オブジェクト</strong>として保存できるフルマネージドのストレージサービスです。データは「<strong>バケット</strong>」と呼ばれるコンテナに格納され、各バケットはプロジェクトに属します。
                            </p>

                            <h3><span className="mk">3.2</span>なぜ使うか</h3>
                            <ul>
                                <li>サーバーの容量管理が不要で、ペタバイト級までシームレスにスケールする</li>
                                <li>99.999999999%（イレブンナイン）の年間耐久性を持つ</li>
                                <li>Standard／Nearline／Coldline／Archive の4クラスでアクセス頻度に応じたコスト最適化ができる</li>
                                <li>Cloud Functions や Pub/Sub とイベント連携しやすい（本コースの核心）</li>
                            </ul>

                            <h3><span className="mk">3.3</span>具体例（コンソールでの操作フロー）</h3>
                            <div className="diagram">
                                <p className="diagram__cap">Fig 3.1 — バケット作成〜アップロードの流れ</p>
                                <div className="mermaid" id="diag-storage-flow">
                                    <MermaidDiagram chart={DIAGRAMS['diag-storage-flow']} ariaLabel="バケット作成からアップロードの流れ" />
                                </div>
                            </div>
                            <p>バケット名は<strong>グローバルネームスペースで一意</strong>である必要がありますが、オブジェクト名はバケット内でのみ一意であれば構いません。</p>

                            <h3><span className="mk">3.4</span>コード例（gcloud CLI）</h3>
                            <div className="code">
                                <div className="code__bar"><i></i><i></i><i></i><span className="code__lang">bash</span></div>
                                <pre dangerouslySetInnerHTML={{ __html: `<code><span class="cm"># 環境変数の準備</span>
<span class="kw">export</span> PROJECT_ID=$(gcloud config get-value project)
<span class="kw">export</span> BUCKET_NAME="\${PROJECT_ID}-photos"
<span class="kw">export</span> REGION="asia-northeast1"

<span class="cm"># リージョンバケットを作成</span>
gcloud storage buckets create gs://\${BUCKET_NAME} \\
  --project=\${PROJECT_ID} \\
  --location=\${REGION} \\
  --uniform-bucket-level-access

<span class="cm"># オブジェクトをアップロード</span>
gcloud storage cp ./sample.jpg gs://\${BUCKET_NAME}/

<span class="cm"># バケット内の一覧を確認</span>
gcloud storage ls gs://\${BUCKET_NAME}/</code>` }} />
                            </div>
                            <div className="note">
                                <span className="note__ico">TIP</span>
                                <span><code>gcloud storage</code> コマンドは従来の <code>gsutil</code> の後継で、より高速かつ一貫性のある挙動をします。新規学習では <b>gcloud storage を使うのがおすすめ</b>です。</span>
                            </div>

                            <h3><span className="mk">3.5</span>ベストプラクティス</h3>
                            <div className="tbl-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">項目</th>
                                            <th scope="col">✅ 推奨</th>
                                            <th scope="col">❌ 避けるべき</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>1</td><td className="lead">バケット命名</td><td>機密情報を含まない推測されにくい名前にする</td><td><code>mysecret-prod-bucket</code> のように機密情報を露出させる</td></tr>
                                        <tr><td>2</td><td className="lead">アクセス制御</td><td>均一バケットレベルアクセス（IAMのみ）を有効化し最小権限で運用</td><td>オブジェクトごとにACLを個別設定して管理を複雑化させる</td></tr>
                                        <tr><td>3</td><td className="lead">公開設定</td><td>公開が必要なオブジェクトだけを明示的に許可する</td><td>バケット全体をうっかり公開設定にする</td></tr>
                                        <tr><td>4</td><td className="lead">ストレージクラス</td><td>アクセス頻度に応じて4クラスを使い分ける</td><td>すべて Standard のまま高コストを放置する</td></tr>
                                        <tr><td>5</td><td className="lead">再試行戦略</td><td>新規コネクションでの再試行やヘッジドリクエストを実装する</td><td>同一パスへの単純リトライのみで「サーバー固着」を起こす</td></tr>
                                        <tr><td>6</td><td className="lead">オブジェクト名</td><td>ランダム性のあるプレフィックスでホットスポットを回避する</td><td>連番やタイムスタンプのみの命名で書き込みを集中させる</td></tr>
                                        <tr><td>7</td><td className="lead">ライフサイクル</td><td>ルールで古いデータを自動的に低コスト化・削除する</td><td>不要データを手動管理のまま放置しコストを増大させる</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <hr className="rule" />

                        {/* ===================== 4. IAM ===================== */}
                        <section id="s4" className="sec-iam">
                            <div className="station">
                                <div className="station__no">04</div>
                                <div className="station__body">
                                    <span className="station__kicker">Access Control</span>
                                    <h2><span className="station__chip"></span>Cloud IAM — アクセス制御の基礎</h2>
                                </div>
                            </div>

                            <h3><span className="mk">4.1</span>定義</h3>
                            <p>
                                IAM（Identity and Access Management）は「<strong>誰が</strong>（Principal）」「<strong>どのリソースに</strong>（Resource）」「<strong>何をできるか</strong>（Permission）」を、ロールの付与によって制御する仕組みです。Google Cloud では権限を直接付与せず、権限をまとめた「<strong>ロール</strong>」を主体に紐づけます。
                            </p>
                            <div className="diagram">
                                <p className="diagram__cap">Fig 4.1 — Principal / Role / Permission / Resource の関係</p>
                                <div className="mermaid" id="diag-iam-relation">
                                    <MermaidDiagram chart={DIAGRAMS['diag-iam-relation']} ariaLabel="Principal、Role、Permission、Resourceの関係" />
                                </div>
                            </div>

                            <h3><span className="mk">4.2</span>なぜ使うか</h3>
                            <ul>
                                <li>誤操作や不正アクセスの被害範囲（ブラストラディウス）を最小化できる</li>
                                <li>Owner／Editor／Viewer の広範な基本ロールに頼らず、事前定義ロール（<code>roles/storage.objectViewer</code> など）で細かく制御できる</li>
                                <li>退職者や異動者のアクセスを確実に取り消せる（Challenge Lab でも実施）</li>
                            </ul>

                            <h3><span className="mk">4.3</span>具体例</h3>
                            <p>このコースでは、プロジェクトに参加している「前任のクラウドエンジニア」のアクセス権を確認し、不要になった時点で削除する、実務でも頻出のシナリオを扱います。</p>
                            <div className="diagram">
                                <p className="diagram__cap">Fig 4.2 — 前任エンジニアのアクセス権を取り消す</p>
                                <div className="mermaid" id="diag-iam-revoke">
                                    <MermaidDiagram chart={DIAGRAMS['diag-iam-revoke']} ariaLabel="前任エンジニアのアクセス権取り消しフロー" />
                                </div>
                            </div>

                            <h3><span className="mk">4.4</span>コード例（gcloud CLI）</h3>
                            <div className="code">
                                <div className="code__bar"><i></i><i></i><i></i><span className="code__lang">bash</span></div>
                                <pre dangerouslySetInnerHTML={{ __html: `<code><span class="cm"># 現在のIAMポリシーを確認</span>
gcloud projects get-iam-policy \${PROJECT_ID}

<span class="cm"># 特定ユーザーの roles/viewer を削除（最小権限の原則の実践）</span>
gcloud projects remove-iam-policy-binding \${PROJECT_ID} \\
  --member=<span class="st">"user:previous-engineer@example.com"</span> \\
  --role=<span class="st">"roles/viewer"</span>

<span class="cm"># バケット単位で最小権限を付与する例（リソース単位に絞る）</span>
gcloud storage buckets add-iam-policy-binding gs://\${BUCKET_NAME} \\
  --member=<span class="st">"serviceAccount:thumbnail-fn@\${PROJECT_ID}.iam.gserviceaccount.com"</span> \\
  --role=<span class="st">"roles/storage.objectViewer"</span></code>` }} />
                            </div>

                            <h3><span className="mk">4.5</span>ベストプラクティス</h3>
                            <div className="tbl-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">項目</th>
                                            <th scope="col">✅ 推奨</th>
                                            <th scope="col">❌ 避けるべき</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>1</td><td className="lead">最小権限の原則</td><td>タスク遂行に必要な最小限の権限のみを付与する</td><td>とりあえず <code>roles/editor</code> や <code>roles/owner</code> を付与</td></tr>
                                        <tr><td>2</td><td className="lead">付与範囲</td><td>バケットや関数などリソース単位でロールを絞り込む</td><td>プロジェクト全体に広いロールを付与する</td></tr>
                                        <tr><td>3</td><td className="lead">サービスアカウント</td><td>用途ごとに専用SAを作成し機能を分離する</td><td>すべての関数で同一の高権限SAを共有する</td></tr>
                                        <tr><td>4</td><td className="lead">定期棚卸し</td><td>IAM Recommender で未使用権限を定期的に削除する</td><td>付与した権限を放置し「権限の肥大化」を起こす</td></tr>
                                        <tr><td>5</td><td className="lead">監査</td><td>Cloud Audit Logs で IAM 変更を継続的に監視する</td><td>権限変更を記録・追跡せず放置する</td></tr>
                                        <tr><td>6</td><td className="lead">グループ活用</td><td>多数ユーザーへの付与はグループ単位で行う</td><td>ユーザーを1人ずつ列挙して管理コストを増やす</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <hr className="rule" />

                        {/* ===================== 5. Cloud Functions ===================== */}
                        <section id="s5" className="sec-func">
                            <div className="station">
                                <div className="station__no">05</div>
                                <div className="station__body">
                                    <span className="station__kicker">Serverless Compute</span>
                                    <h2><span className="station__chip"></span>Cloud Functions（Cloud Run functions）</h2>
                                </div>
                            </div>

                            <h3><span className="mk">5.1</span>定義</h3>
                            <p>
                                Cloud Functions は、サーバー管理不要でイベント（HTTP リクエストや Cloud Storage への書き込みなど）に応じて単一目的のコードを実行できるサーバーレス実行環境です。第2世代（Gen2）は Cloud Run 上で稼働し、現在は「<strong>Cloud Run functions</strong>」という製品名に統合されています。内部的には Cloud Run サービスと Eventarc トリガーの組み合わせとして構成されます。
                            </p>
                            <div className="diagram">
                                <p className="diagram__cap">Fig 5.1 — アップロードをトリガーにしたイベント処理パイプライン</p>
                                <div className="mermaid" id="diag-func-pipeline">
                                    <MermaidDiagram chart={DIAGRAMS['diag-func-pipeline']} ariaLabel="アップロードをトリガーにしたイベント処理パイプライン" />
                                </div>
                            </div>

                            <h3><span className="mk">5.2</span>なぜ使うか</h3>
                            <ul>
                                <li>インフラのプロビジョニング不要で、コードをデプロイするだけで即座にスケールする</li>
                                <li>Cloud Storage・Pub/Sub・Firestore など多様なイベントソースと直接連携できる</li>
                                <li>使った分だけの課金（リクエストが来ない間はコストが発生しない）</li>
                            </ul>

                            <h3><span className="mk">5.3</span>具体例（コンソールでのデプロイ手順）</h3>
                            <ol>
                                <li>関数名・リージョン・トリガー種別（Cloud Storage の <code>finalized</code> イベント）を設定する</li>
                                <li>対象バケットを指定する</li>
                                <li>エントリポイント（実行される関数名）とランタイム（例：Node.js 22）を設定する</li>
                                <li>ソースコード（<code>index.js</code> と <code>package.json</code>）を記述してデプロイする</li>
                            </ol>

                            <h3><span className="mk">5.4</span>コード例（Node.js／概念コード）</h3>
                            <p>Cloud Storage への画像アップロードをトリガーにサムネイルを生成し、完了を Pub/Sub に通知する処理の概念的な骨組みです。</p>
                            <div className="code">
                                <div className="code__bar"><i></i><i></i><i></i><span className="code__lang">javascript</span></div>
                                <pre>
                                    <div className="code-line"><span className="kw">const</span> functions = <span className="kw">require</span>(<span className="st">{'@google-cloud/functions-framework'}</span>);</div>
                                    <div className="code-line"><span className="kw">const</span> {"{ Storage }"} = <span className="kw">require</span>(<span className="st">{'@google-cloud/storage'}</span>);</div>
                                    <div className="code-line"><span className="kw">const</span> {"{ PubSub }"} = <span className="kw">require</span>(<span className="st">{'@google-cloud/pubsub'}</span>);</div>
                                    <div className="code-line"><span className="kw">const</span> {"{ pipeline }"} = <span className="kw">require</span>(<span className="st">{'stream/promises'}</span>);</div>
                                    <div className="code-line"><span className="kw">const</span> sharp = <span className="kw">require</span>(<span className="st">{'sharp'}</span>);</div>
                                    <div className="code-line">&nbsp;</div>
                                    <div className="code-line"><span className="kw">const</span> storage = <span className="kw">new</span> Storage();</div>
                                    <div className="code-line"><span className="kw">const</span> pubsub = <span className="kw">new</span> PubSub();</div>
                                    <div className="code-line">&nbsp;</div>
                                    <div className="code-line">functions.cloudEvent(<span className="st">{'generateThumbnail'}</span>, <span className="kw">async</span> (cloudEvent) =&gt; {"{"}</div>
                                    <div className="code-line">  <span className="kw">const</span> event = cloudEvent.data;</div>
                                    <div className="code-line">  <span className="kw">const</span> {"{ bucket: bucketName, name: fileName }"} = event;</div>
                                    <div className="code-line">&nbsp;</div>
                                    <div className="code-line">  <span className="cm">{"// 冪等性の確保：既にサムネイルなら再処理しない。拡張子なしのサムネイル名（例：xxx_thumb）も含む"}</span></div>
                                    <div className="code-line">  <span className="kw">if</span> (fileName.includes(<span className="st">{"'_thumb'"}</span>) || fileName.endsWith(<span className="st">{"'_thumb'"}</span>)) {"{"}</div>
                                    <div className="code-line">    console.log(<span className="st">{`\`Skip: \${fileName} is already a thumbnail\``}</span>);</div>
                                    <div className="code-line">    <span className="kw">return</span>;</div>
                                    <div className="code-line">  {"}"}</div>
                                    <div className="code-line">&nbsp;</div>
                                    <div className="code-line">  <span className="kw">const</span> bucket = storage.bucket(bucketName);</div>
                                    <div className="code-line">  <span className="kw">const</span> dotIndex = fileName.lastIndexOf(<span className="st">{"'.'"}</span>);</div>
                                    <div className="code-line">  <span className="kw">const</span> {"thumbName = dotIndex !== -1 ? `${fileName.slice(0, dotIndex)}_thumb${fileName.slice(dotIndex)}` : `${fileName}_thumb`;"}</div>
                                    <div className="code-line">&nbsp;</div>
                                    <div className="code-line">  <span className="kw">await</span> pipeline(</div>
                                    <div className="code-line">    bucket.file(fileName).createReadStream(),</div>
                                    <div className="code-line">    sharp().resize(<span className="vr">64</span>, <span className="vr">64</span>),</div>
                                    <div className="code-line">    bucket.file(thumbName).createWriteStream()</div>
                                    <div className="code-line">  );</div>
                                    <div className="code-line">&nbsp;</div>
                                    <div className="code-line">  <span className="kw">await</span> {"pubsub.topic(process.env.TOPIC_NAME).publishMessage({"}</div>
                                    <div className="code-line">    {"data: Buffer.from(JSON.stringify({ thumbnail: thumbName })),"}</div>
                                    <div className="code-line">  {"});"}</div>
                                    <div className="code-line">{"}"});</div>
                                </pre>
                            </div>
                            <div className="code">
                                <div className="code__bar"><i></i><i></i><i></i><span className="code__lang">bash — deploy</span></div>
                                <pre dangerouslySetInnerHTML={{ __html: `<code><span class="cm"># デプロイ例（Gen2 / Cloud Storage トリガー）</span>
gcloud functions deploy generateThumbnail \\
  --gen2 \\
  --runtime=nodejs22 \\
  --region=\${REGION} \\
  --source=. \\
  --entry-point=generateThumbnail \\
  --trigger-event-filters="type=google.cloud.storage.object.v1.finalized" \\
  --trigger-event-filters="bucket=\${BUCKET_NAME}" \\
  --set-env-vars=TOPIC_NAME=\${TOPIC_NAME} \\
  --max-instances=2</code>` }} />
                            </div>

                            <h3><span className="mk">5.5</span>ベストプラクティス</h3>
                            <div className="tbl-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">項目</th>
                                            <th scope="col">✅ 推奨</th>
                                            <th scope="col">❌ 避けるべき</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>1</td><td className="lead">冪等性</td><td>同じイベントで複数回呼ばれても同じ結果になるよう設計する</td><td>副作用のある処理を無条件に繰り返し実行する</td></tr>
                                        <tr><td>2</td><td className="lead">無限ループ防止</td><td>生成物が自分自身をトリガーしないようファイル名等でガードする</td><td>生成物が再度トリガー対象になり無限ループが発生する</td></tr>
                                        <tr><td>3</td><td className="lead">コールドスタート対策</td><td>依存を最小化し、重い初期化はグローバルスコープで1回だけ</td><td>毎回の呼び出しで重い処理を再初期化する</td></tr>
                                        <tr><td>4</td><td className="lead">権限</td><td>関数専用SAを作り必要な権限のみ付与する</td><td>デフォルトSA（Editor相当）をそのまま使う</td></tr>
                                        <tr><td>5</td><td className="lead">依存の固定</td><td><code>package-lock.json</code> 等でバージョンを固定する</td><td>バージョン未指定で環境ごとに挙動が変わる</td></tr>
                                        <tr><td>6</td><td className="lead">エラーハンドリング</td><td>例外を捕捉しログ出力、必要に応じ再試行ポリシーを設定</td><td>未処理の例外でクラッシュし原因追跡が困難になる</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <hr className="rule" />

                        {/* ===================== 6. Pub/Sub ===================== */}
                        <section id="s6" className="sec-pubsub">
                            <div className="station">
                                <div className="station__no">06</div>
                                <div className="station__body">
                                    <span className="station__kicker">Async Messaging</span>
                                    <h2><span className="station__chip"></span>Pub/Sub — 非同期メッセージング</h2>
                                </div>
                            </div>

                            <h3><span className="mk">6.1</span>定義</h3>
                            <p>
                                Pub/Sub は、メッセージの送信者（Publisher）と受信者（Subscriber）を分離する<strong>非同期メッセージングサービス</strong>です。Publisher は「<strong>トピック</strong>」にメッセージを送信し、Subscriber は「<strong>サブスクリプション</strong>」を通じてメッセージを受信します。
                            </p>
                            <div className="diagram">
                                <p className="diagram__cap">Fig 6.1 — 1トピックから複数の Subscriber へのファンアウト</p>
                                <div className="mermaid" id="diag-pubsub-fanout">
                                    <MermaidDiagram chart={DIAGRAMS['diag-pubsub-fanout']} ariaLabel="1トピックから複数のSubscriberへのファンアウト" />
                                </div>
                            </div>

                            <h3><span className="mk">6.2</span>なぜ使うか</h3>
                            <ul>
                                <li>Publisher と Subscriber が互いの稼働状況を意識せず疎結合で連携できる</li>
                                <li>1トピックに複数のサブスクリプションを紐づける「ファンアウト」で、同じイベントを複数システムに配信できる</li>
                                <li>サービス障害時にもメッセージが保持され、リトライや再処理が可能</li>
                            </ul>

                            <h3><span className="mk">6.3</span>具体例</h3>
                            <p>Challenge Lab のシナリオでは、サムネイル生成完了を知らせるトピックを用意し、Cloud Function がそこにメッセージを発行します。この時点では<strong>サブスクリプションを作らず「送信先の箱」だけを用意する</strong>のがポイントです（後続の消費者が必要になった時点で追加できます）。</p>

                            <h3><span className="mk">6.4</span>コード例（gcloud CLI）</h3>
                            <div className="code">
                                <div className="code__bar"><i></i><i></i><i></i><span className="code__lang">bash</span></div>
                                <pre dangerouslySetInnerHTML={{ __html: `<code><span class="cm"># トピックを作成</span>
gcloud pubsub topics create \${TOPIC_NAME}

<span class="cm"># 動作確認用にサブスクリプションを作成</span>
gcloud pubsub subscriptions create \${TOPIC_NAME}-sub \\
  --topic=\${TOPIC_NAME}

<span class="cm"># テストメッセージを発行</span>
gcloud pubsub topics publish \${TOPIC_NAME} \\
  --message="thumbnail generated"

<span class="cm"># サブスクリプションからメッセージを取得</span>
gcloud pubsub subscriptions pull \${TOPIC_NAME}-sub --auto-ack --limit=5</code>` }} />
                            </div>

                            <h3><span className="mk">6.5</span>ベストプラクティス</h3>
                            <div className="tbl-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">項目</th>
                                            <th scope="col">✅ 推奨</th>
                                            <th scope="col">❌ 避けるべき</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>1</td><td className="lead">Publisher再利用</td><td>クライアントを使い回して接続確立のオーバーヘッドを避ける</td><td>リクエストごとに新しいクライアントを生成する</td></tr>
                                        <tr><td>2</td><td className="lead">メッセージ保持</td><td>Publish前にサブスクリプションを用意するか保持を有効化する</td><td>サブスクリプション不在のままPublishし、メッセージを失う</td></tr>
                                        <tr><td>3</td><td className="lead">冪等な処理</td><td>「少なくとも1回配信」を前提に重複処理に耐える設計にする</td><td>メッセージが必ず1回だけ届く前提で実装する</td></tr>
                                        <tr><td>4</td><td className="lead">デッドレターキュー</td><td>失敗し続けるメッセージをデッドレタートピックへ退避させる</td><td>失敗メッセージが際限なく再配信され続ける</td></tr>
                                        <tr><td>5</td><td className="lead">順序保証</td><td>順序が必要な場合のみ ordering key を設定する</td><td>一律で順序保証を要求しスループットを落とす</td></tr>
                                        <tr><td>6</td><td className="lead">バッチ処理</td><td>クライアントのバッチ機能でスループットとコストを最適化する</td><td>1メッセージ1リクエストで大量発行しコストを増大させる</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <hr className="rule" />

                        {/* ===================== 7. Challenge Lab ===================== */}
                        <section id="s7" className="sec-violet">
                            <div className="station">
                                <div className="station__no">07</div>
                                <div className="station__body">
                                    <span className="station__kicker">Capstone · GSP315</span>
                                    <h2><span className="station__chip"></span>総合演習：Challenge Lab（GSP315）</h2>
                                </div>
                            </div>

                            <h3><span className="mk">7.1</span>シナリオ概要</h3>
                            <p>
                                あなたは Jooli 社のジュニアクラウドエンジニアとして、写真管理アプリ「Memories」の開発チームから、アプリ開発環境の初期構築を依頼されます。<strong>ステップバイステップの手順書は与えられず</strong>、これまでの実習で得たスキルをもとに自力でタスクを完了させる、実務に近いシナリオです。
                            </p>

                            <h3><span className="mk">7.2</span>統合アーキテクチャ図</h3>
                            <div className="diagram">
                                <p className="diagram__cap">Fig 7.1 — GSP315 の統合アーキテクチャ</p>
                                <div className="mermaid" id="diag-gsp315-arch">
                                    <MermaidDiagram chart={DIAGRAMS['diag-gsp315-arch']} ariaLabel="GSP315の統合アーキテクチャ" />
                                </div>
                            </div>

                            <h3><span className="mk">7.3</span>タスク一覧</h3>
                            <div className="tbl-wrap">
                                <table>
                                    <thead><tr><th scope="col">タスク</th><th scope="col">内容</th><th scope="col">主な技術</th></tr></thead>
                                    <tbody>
                                        <tr><td className="lead">Task 1</td><td>写真保存用の Cloud Storage バケットを作成する</td><td>Cloud Storage</td></tr>
                                        <tr><td className="lead">Task 2</td><td>Cloud Run function が使用する Pub/Sub トピックを作成する</td><td>Pub/Sub</td></tr>
                                        <tr><td className="lead">Task 3</td><td>アップロードをトリガーにサムネイルを生成する関数(Gen2)を作成・デプロイ</td><td>Functions / Eventarc</td></tr>
                                        <tr><td className="lead">Task 4</td><td>画像をアップロードしてインフラ全体の動作を検証する</td><td>Storage / Functions / Pub/Sub</td></tr>
                                        <tr><td className="lead">Task 5</td><td>前任のクラウドエンジニアのプロジェクトアクセスを削除する</td><td>IAM</td></tr>
                                    </tbody>
                                </table>
                            </div>

                            <h3><span className="mk">7.4</span>手順ごとの解説</h3>
                            <p><strong>Task 1: バケット作成</strong> — ラボパネルに指定されたバケット名（例：<code>qwiklabs-gcp-XX-xxxxxxxx-bucket</code>）を使い、リージョンを選択してデフォルト設定で作成します。バケット名は採点システムが検証するため、<strong>指定された名前を正確に使用</strong>することが重要です。</p>
                            <p><strong>Task 2: Pub/Sub トピック作成</strong> — 関数が処理完了後にメッセージを発行するためのトピックを作成します。この段階ではサブスクリプションの作成は要求されていません（関数が Publisher として使うだけのため）。</p>
                            <p><strong>Task 3: Cloud Run function（サムネイル生成）</strong></p>
                            <ul>
                                <li>トリガー：対象バケットへの Cloud Storage <code>finalized</code> イベント</li>
                                <li>エントリポイントは<strong>コード内の関数名と完全に一致</strong>させる（不一致はデプロイ後の動作不良の典型的な原因）</li>
                                <li>Eventarc がイベントを読み取れるよう、Cloud Storage サービスエージェントへ <code>roles/pubsub.publisher</code> を付与するなど権限伝播が必要な場合がある（数分のタイムラグあり）</li>
                            </ul>
                            <p><strong>Task 4: 動作検証</strong> — 指定の画像（例：<code>map.jpg</code>）をアップロードし、数十秒〜数分後にサムネイルが生成されることを確認します。生成されない場合は関数の「トリガー」タブで設定が正しく保存されているか確認し、必要ならトリガーを再作成します。</p>
                            <p><strong>Task 5: IAM クリーンアップ</strong> — プロジェクトには「あなた（Owner）」と「前任エンジニア（Viewer）」の2プリンシパルが存在します。前任エンジニアの <code>roles/viewer</code> バインディングを削除し、最小権限の原則を実践して完了します。</p>

                            <h3><span className="mk">7.5</span>よくあるエラーと対処</h3>
                            <div className="tbl-wrap">
                                <table>
                                    <thead><tr><th scope="col">症状</th><th scope="col">想定される原因</th><th scope="col">対処</th></tr></thead>
                                    <tbody>
                                        <tr><td className="lead">サムネイルが生成されない</td><td>Eventarc/Storage サービスエージェント権限が未伝播</td><td>数分待って再アップロード、または権限設定を再確認</td></tr>
                                        <tr><td className="lead">デプロイ成功だが関数がエラー終了</td><td>エントリポイント名とコード内の関数名が不一致</td><td>「エントリポイント」欄を関数名と完全一致させる</td></tr>
                                        <tr><td className="lead">サムネイルが無限に生成される</td><td>生成物自身が再度トリガー対象になっている</td><td>ファイル名にサフィックスを付け既存サムネイルを除外</td></tr>
                                        <tr><td className="lead">Pub/Sub Publish でエラー</td><td>Storage サービスエージェントに <code>roles/pubsub.publisher</code> 未付与</td><td>該当サービスエージェントへ IAM ロールを追加</td></tr>
                                        <tr><td className="lead">権限削除が完了と判定されない</td><td>削除対象のメンバー／ロール指定が誤り</td><td><code>get-iam-policy</code> で現状確認してから正確に削除</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <hr className="rule" />

                        {/* ===================== 8. Cross-cutting BP ===================== */}
                        <section id="s8" className="sec-violet">
                            <div className="station">
                                <div className="station__no">08</div>
                                <div className="station__body">
                                    <span className="station__kicker">Cheat Sheet</span>
                                    <h2><span className="station__chip"></span>サービス横断ベストプラクティス早見表</h2>
                                </div>
                            </div>
                            <div className="tbl-wrap">
                                <table>
                                    <thead><tr><th scope="col">観点</th><th scope="col">Cloud Storage</th><th scope="col">IAM</th><th scope="col">Cloud Functions</th><th scope="col">Pub/Sub</th></tr></thead>
                                    <tbody>
                                        <tr><td className="lead">最小権限</td><td>バケット単位でロールを付与</td><td>リソース単位で付与</td><td>関数専用SAを用意</td><td>トピック/サブ単位で絞る</td></tr>
                                        <tr><td className="lead">スケール対策</td><td>ランダムプレフィックスでホットスポット回避</td><td>該当なし</td><td>コールドスタート対策・依存最小化</td><td>バッチ発行で最適化</td></tr>
                                        <tr><td className="lead">信頼性</td><td>ライフサイクル管理・再試行戦略</td><td>定期的な権限棚卸し</td><td>冪等な処理設計</td><td>デッドレターキュー・冪等Subscriber</td></tr>
                                        <tr><td className="lead">可観測性</td><td>アクセスログ・監査ログ</td><td>Cloud Audit Logs</td><td>Cloud Logging でエラー監視</td><td>未処理メッセージ滞留を監視</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <hr className="rule" />

                        {/* ===================== 9. Troubleshooting ===================== */}
                        <section id="s9" className="sec-iam">
                            <div className="station">
                                <div className="station__no">09</div>
                                <div className="station__body">
                                    <span className="station__kicker">Troubleshooting</span>
                                    <h2><span className="station__chip"></span>よくあるエラーとトラブルシューティング</h2>
                                </div>
                            </div>
                            <div className="tbl-wrap">
                                <table>
                                    <thead><tr><th scope="col">カテゴリ</th><th scope="col">症状</th><th scope="col">チェックポイント</th></tr></thead>
                                    <tbody>
                                        <tr><td className="lead">権限伝播遅延</td><td>「Permission denied」が数分後に解消する</td><td>Eventarc/Storage サービスエージェントへの権限付与直後は数分の伝播待ちが必要</td></tr>
                                        <tr><td className="lead">バケット名の衝突</td><td>バケット作成に失敗する</td><td>バケット名はグローバルで一意。プロジェクトID等を含めて一意性を担保する</td></tr>
                                        <tr><td className="lead">関数のタイムアウト</td><td>大きな画像処理で関数がタイムアウトする</td><td>メモリ／タイムアウト設定を見直すか、ストリーム処理でメモリ使用量を削減</td></tr>
                                        <tr><td className="lead">メッセージ消失</td><td>Publishしたのにメッセージが届かない</td><td>サブスクリプション未作成のままPublishしていないか確認（保持設定も検討）</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <hr className="rule" />

                        {/* ===================== 10. Sources ===================== */}
                        <section id="s10" className="sec-violet">
                            <div className="station">
                                <div className="station__no">10</div>
                                <div className="station__body">
                                    <span className="station__kicker">References</span>
                                    <h2><span className="station__chip"></span>参考ソース一覧</h2>
                                </div>
                            </div>

                            <div className="src-group">
                                <h4><span className="dot" style={{ background: 'var(--violet)' }}></span>10.1 提供されたコース URL（本ガイドの対象範囲）</h4>
                                <ul className="src-list">
                                    <li><a href="https://www.skills.google/course_templates/637" target="_blank" rel="noopener">skills.google/course_templates/637（コース概要）</a></li>
                                    <li><a href="https://www.skills.google/course_templates/637/labs/592541" target="_blank" rel="noopener">labs/592541</a></li>
                                    <li><a href="https://www.skills.google/course_templates/637/labs/592542" target="_blank" rel="noopener">labs/592542</a></li>
                                    <li><a href="https://www.skills.google/course_templates/637/labs/592543" target="_blank" rel="noopener">labs/592543</a></li>
                                    <li><a href="https://www.skills.google/course_templates/637/labs/592544" target="_blank" rel="noopener">labs/592544</a></li>
                                    <li><a href="https://www.skills.google/course_templates/637/labs/592545" target="_blank" rel="noopener">labs/592545</a></li>
                                    <li><a href="https://www.skills.google/course_templates/637/labs/592546" target="_blank" rel="noopener">labs/592546</a></li>
                                    <li><a href="https://www.skills.google/course_templates/637/labs/592547" target="_blank" rel="noopener">labs/592547</a></li>
                                    <li><a href="https://www.skills.google/course_templates/637/labs/592548" target="_blank" rel="noopener">labs/592548</a></li>
                                    <li><a href="https://www.skills.google/course_templates/637/labs/592549" target="_blank" rel="noopener">labs/592549</a></li>
                                    <li><a href="https://www.skills.google/course_templates/637/labs/592550" target="_blank" rel="noopener">labs/592550（Challenge Lab: GSP315）</a></li>
                                </ul>
                            </div>

                            <div className="src-group">
                                <h4><span className="dot" style={{ background: 'var(--storage)' }}></span>10.2 Cloud Storage</h4>
                                <ul className="src-list">
                                    <li><a href="https://cloud.google.com/storage/docs/best-practices" target="_blank" rel="noopener">cloud.google.com/storage/docs/best-practices</a></li>
                                    <li><a href="https://cloud.google.com/storage/docs/access-control/best-practices-access-control" target="_blank" rel="noopener">storage/docs/access-control/best-practices-access-control</a></li>
                                    <li><a href="https://cloud.google.com/storage/docs/best-practices-media-workload" target="_blank" rel="noopener">storage/docs/best-practices-media-workload</a></li>
                                </ul>
                                <h4><span className="dot" style={{ background: 'var(--iam)' }}></span>10.3 IAM</h4>
                                <ul className="src-list">
                                    <li><a href="https://cloud.google.com/iam/docs/using-iam-securely" target="_blank" rel="noopener">iam/docs/using-iam-securely</a></li>
                                    <li><a href="https://cloud.google.com/iam/docs/best-practices-service-accounts" target="_blank" rel="noopener">iam/docs/best-practices-service-accounts</a></li>
                                    <li><a href="https://cloud.google.com/iam/docs/pam-best-practices" target="_blank" rel="noopener">iam/docs/pam-best-practices</a></li>
                                </ul>
                                <h4><span className="dot" style={{ background: 'var(--func)' }}></span>10.4 Cloud Functions / Cloud Run functions</h4>
                                <ul className="src-list">
                                    <li><a href="https://cloud.google.com/run/docs/tips/functions-best-practices" target="_blank" rel="noopener">run/docs/tips/functions-best-practices</a></li>
                                    <li><a href="https://cloud.google.com/run/docs/write-functions" target="_blank" rel="noopener">run/docs/write-functions</a></li>
                                    <li><a href="https://cloud.google.com/functions/docs/concepts/overview" target="_blank" rel="noopener">functions/docs/concepts/overview</a></li>
                                    <li><a href="https://cloud.google.com/blog/products/application-development/least-privilege-for-cloud-functions-using-cloud-iam" target="_blank" rel="noopener">blog: least-privilege-for-cloud-functions-using-cloud-iam</a></li>
                                </ul>
                                <h4><span className="dot" style={{ background: 'var(--pubsub)' }}></span>10.5 Pub/Sub</h4>
                                <ul className="src-list">
                                    <li><a href="https://cloud.google.com/pubsub/docs/pubsub-basics" target="_blank" rel="noopener">pubsub/docs/pubsub-basics</a></li>
                                    <li><a href="https://cloud.google.com/pubsub/docs/publish-best-practices" target="_blank" rel="noopener">pubsub/docs/publish-best-practices</a></li>
                                    <li><a href="https://cloud.google.com/pubsub/docs/subscribe-best-practices" target="_blank" rel="noopener">pubsub/docs/subscribe-best-practices</a></li>
                                    <li><a href="https://cloud.google.com/pubsub/docs/overview" target="_blank" rel="noopener">pubsub/docs/overview</a></li>
                                    <li><a href="https://cloud.google.com/pubsub/docs/publish-message-overview" target="_blank" rel="noopener">pubsub/docs/publish-message-overview</a></li>
                                </ul>
                            </div>

                            <div className="src-group">
                                <h4><span className="dot" style={{ background: 'var(--muted-2)' }}></span>10.6 Challenge Lab（GSP315）シナリオ確認に使用したソース</h4>
                                <p>以下は公式ドキュメントではなく、GSP315 のシナリオ・タスク構成を裏付けるために参照したコミュニティ／サードパーティ記事です。コード例はいずれも本ガイド用に独自に書き直しており、これらからの転載ではありません。</p>
                                <ul className="src-list">
                                    <li><a href="https://www.cloudskillsboost.google/course_templates/637/labs/592550" target="_blank" rel="noopener">cloudskillsboost.google/…/labs/592550（Challenge Lab 本体）</a></li>
                                    <li><a href="https://medium.com/@willtorber/set-up-an-app-dev-environment-on-google-cloud-7f11ee1efd88" target="_blank" rel="noopener">medium.com/@willtorber/set-up-an-app-dev-environment…</a></li>
                                    <li><a href="https://github.com/tariqsheikhsw/GoogleCloudArchitectLabs" target="_blank" rel="noopener">github.com/tariqsheikhsw/GoogleCloudArchitectLabs</a></li>
                                </ul>
                            </div>
                        </section>

                        <footer>
                            <p>本ガイドは Google Cloud の公式ドキュメントと、公開されているコース／ラボ情報をもとに作成した学習補助資料です。実際のラボ画面の項目名や採点基準はコースの更新により変更される場合があるため、最終的には受講中のラボパネルの指示を優先してください。</p>
                        </footer>
                    </div>
                </main>
            </div>
        </div>
    );
}
