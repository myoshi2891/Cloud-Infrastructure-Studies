'use client';

import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS } from './constants';
import NavBar from './NavBar';

function Diagram({ id, label }: { id: string; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap">
            <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale />
        </div>
    );
}

export default function SetUpAnAppDevEnvironmentGuide() {
    return (
        <div className="app-dev-environment-page">
            <NavBar />

            <div className="wrap">
                {/* ===================== HERO ===================== */}
                <section className="hero" id="overview">
                    <div className="hero-eyebrow">
                        <span className="pulse-dot"></span>GOOGLE CLOUD SKILLS BOOST — COMPLETE GUIDE
                    </div>
                    <h1>Google Cloud アプリ開発環境構築<br />完全ガイド</h1>
                    <p className="hero-sub">
                        Cloud Storage・IAM・Cloud Monitoring・Cloud Run functions・Pub/Sub
                        を、初学者がステップバイステップで理解できるように再構成。すべての章に「なぜそうするのか」と公式ドキュメントの一次情報源を併記しています。
                    </p>

                    <div className="table-wrap hero-meta-table">
                        <table>
                            <tbody>
                                <tr>
                                    <td style={{ color: 'var(--text-muted)', width: '180px' }}>対象ラボ</td>
                                    <td>
                                        Cloud Storage（Console／CLI）、IAM Qwik Start、Cloud Monitoring
                                        LAMP、Cloud Run functions（Console／Pub/Sub
                                        トリガー）、Pub/Sub（Console／CLI／Python）、Challenge
                                        Lab（GSP315「Memories」）
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ color: 'var(--text-muted)' }}>対象読者</td>
                                    <td>Google Cloud 初学者 〜 ジュニアクラウドエンジニア</td>
                                </tr>
                                <tr>
                                    <td style={{ color: 'var(--text-muted)' }}>扱う技術要素</td>
                                    <td>
                                        <code>Cloud Storage</code> / <code>IAM</code> /{' '}
                                        <code>Cloud Monitoring・Logging</code> /{' '}
                                        <code>Cloud Run functions</code> / <code>Eventarc</code> /{' '}
                                        <code>Pub/Sub</code>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ color: 'var(--text-muted)' }}>最終更新</td>
                                    <td>2026-07-01</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="subhead" style={{ marginTop: '48px' }}>目次</h3>
                    <div className="toc-grid">
                        <div className="toc-item">
                            <span className="toc-num">01</span>
                            <a href="#architecture">全体アーキテクチャとラーニングパス</a>
                        </div>
                        <div className="toc-item">
                            <span className="toc-num">02</span>
                            <a href="#storage">Cloud Storage — オブジェクトストレージの基礎</a>
                        </div>
                        <div className="toc-item">
                            <span className="toc-num">03</span>
                            <a href="#iam">IAM — アクセス制御の基礎</a>
                        </div>
                        <div className="toc-item">
                            <span className="toc-num">04</span>
                            <a href="#monitoring">Cloud Monitoring — 可観測性の基礎</a>
                        </div>
                        <div className="toc-item">
                            <span className="toc-num">05</span>
                            <a href="#functions">Cloud Run functions — イベント駆動サーバーレス</a>
                        </div>
                        <div className="toc-item">
                            <span className="toc-num">06</span>
                            <a href="#pubsub">Pub/Sub — 非同期メッセージング</a>
                        </div>
                        <div className="toc-item">
                            <span className="toc-num">07</span>
                            <a href="#challenge">総合演習：Challenge Lab（GSP315）</a>
                        </div>
                        <div className="toc-item">
                            <span className="toc-num">08</span>
                            <a href="#practices">サービス横断ベストプラクティス早見表</a>
                        </div>
                        <div className="toc-item">
                            <span className="toc-num">09</span>
                            <a href="#troubleshoot">よくあるエラーとトラブルシューティング</a>
                        </div>
                        <div className="toc-item">
                            <span className="toc-num">10</span>
                            <a href="#refs">参考ソース一覧</a>
                        </div>
                    </div>

                    <div className="callout tip" style={{ marginTop: '36px' }}>
                        <span className="callout-label">Tip</span>
                        各章は単独でも読めますが、これらのサービスは実際には疎結合に連携します。特に第7章の
                        Challenge Lab では、Cloud Storage・Pub/Sub・Cloud Run functions・IAM
                        が1つのイベント駆動パイプラインとして統合される様子を確認できます。
                    </div>
                </section>

                {/* ===================== ARCHITECTURE ===================== */}
                <section id="architecture">
                    <div className="chapter-head">
                        <span className="chapter-num">CH.01</span>
                        <h2>全体アーキテクチャとラーニングパス</h2>
                    </div>
                    <p className="chapter-desc">
                        このコースで扱う5つのコアサービスは、次のような依存関係で学習すると理解が深まります。
                    </p>

                    <div className="diagram-wrap">
                        <Diagram id="diag-arch-path" label="Fig 1.1 — 5サービスの依存関係と学習パス" />
                        <div className="diagram-caption">Fig 1.1 — 5サービスの依存関係と学習パス</div>
                    </div>

                    <h3 className="subhead">なぜこの順序で学ぶのか</h3>
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">サービス</th>
                                    <th scope="col">役割</th>
                                    <th scope="col">このコースでの位置づけ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><b>Cloud Storage</b></td>
                                    <td>非構造化データ（画像・ファイル）の格納</td>
                                    <td>すべてのイベントの起点になるデータレイク</td>
                                </tr>
                                <tr>
                                    <td><b>IAM</b></td>
                                    <td>「誰が」「何に」「どこまで」アクセスできるかの制御</td>
                                    <td>全サービス共通の横断的なセキュリティレイヤー</td>
                                </tr>
                                <tr>
                                    <td><b>Cloud Monitoring</b></td>
                                    <td>システムの健全性の可視化とアラート</td>
                                    <td>運用フェーズで異常を検知する仕組み</td>
                                </tr>
                                <tr>
                                    <td><b>Cloud Run functions</b></td>
                                    <td>イベントをトリガーに実行される軽量処理</td>
                                    <td>Storage や Pub/Sub のイベントに反応する「のり」の役割</td>
                                </tr>
                                <tr>
                                    <td><b>Pub/Sub</b></td>
                                    <td>サービス間の非同期メッセージング</td>
                                    <td>疎結合なマイクロサービス連携を実現する基盤</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* ===================== CLOUD STORAGE ===================== */}
                <section id="storage">
                    <div className="chapter-head">
                        <span className="chapter-num">CH.02</span>
                        <h2>Cloud Storage — オブジェクトストレージの基礎</h2>
                    </div>

                    <h3 className="subhead">定義</h3>
                    <p>
                        Cloud Storage
                        は、世界規模でオブジェクト（ファイル）を格納・取得できるマネージド型のオブジェクトストレージサービスです。Web
                        コンテンツの配信、アーカイブ／災害対策用のデータ保管、大容量データの配布など、幅広い用途に使えます。
                    </p>

                    <h3 className="subhead">理由（なぜバケットという概念があるのか）</h3>
                    <p>
                        Cloud Storage
                        にデータを置くには、必ず<b>バケット</b>という入れ物を経由します。バケットはディレクトリのようにネストできず、フラットな名前空間の中でオブジェクトのキーとして「フォルダ風の階層」を疑似的に表現します。この設計により、Google
                        は水平スケーラビリティと高い耐久性を両立させています。
                    </p>

                    <h3 className="subhead">バケット命名規則（重要）</h3>
                    <p>
                        バケット名は Cloud Storage
                        の<b>単一のグローバル名前空間</b>を共有するため、プロジェクトをまたいで世界中で一意である必要があります。バケット名は小文字の英字、数字、ダッシュ（-）、アンダースコア（_）、ドット（.）のみを使用でき、スペースは使用できません。
                    </p>

                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">ルール</th>
                                    <th scope="col">内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>使用可能文字</td>
                                    <td>
                                        小文字英数字、<code>-</code>、<code>_</code>、<code>.</code>
                                        のみ
                                    </td>
                                </tr>
                                <tr>
                                    <td>開始／終了文字</td>
                                    <td>数字または英字で開始・終了する必要がある</td>
                                </tr>
                                <tr>
                                    <td>文字数</td>
                                    <td>
                                        3〜63文字（ドットを含む場合は最大222文字、各セグメントは63文字まで）
                                    </td>
                                </tr>
                                <tr>
                                    <td>IPアドレス形式</td>
                                    <td>
                                        ドット区切りの10進数表記（例: <code>192.168.5.4</code>）は不可
                                    </td>
                                </tr>
                                <tr>
                                    <td>禁止プレフィックス</td>
                                    <td><code>goog</code> から始まる名前は不可</td>
                                </tr>
                                <tr>
                                    <td>禁止文字列</td>
                                    <td>&quot;google&quot; や &quot;g00gle&quot; のような紛らわしい表記も使用不可</td>
                                </tr>
                                <tr>
                                    <td>一意性</td>
                                    <td>
                                        グローバルに一意な名前空間を共有するため、既存の名前とは重複できない
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="callout warning">
                        <span className="callout-label">Warning</span>
                        バケット名は公開情報として誰でも見ることができるため、ユーザーID・メールアドレス・プロジェクト名・個人を特定できる情報（PII）をバケット名に含めるべきではありません。プロジェクトIDをそのままバケット名に使うラボの手順は学習用としては簡便ですが、本番環境では推測されにくいランダムな接尾辞を付けるのが推奨されます。
                    </div>

                    <div className="gb-grid">
                        <div className="gb-card good">
                            <div className="gb-title">✅ 良い例</div>
                            命名: <code>mycompany-prod-images-x7k2p</code><br />
                            アクセス制御: 用途ごとに最小権限のロールを付与<br />
                            削除運用: 不要になったら空にして保持を検討
                        </div>
                        <div className="gb-card bad">
                            <div className="gb-title">❌ 悪い例</div>
                            命名: <code>mysecretproject-bucket</code><br />
                            アクセス制御: プロジェクト全体に <code>allUsers</code> で公開<br />
                            削除運用: すぐに削除して名前を再利用可能にする
                        </div>
                    </div>

                    <h3 className="subhead">コンソールでのバケット作成フロー</h3>
                    <div className="diagram-wrap">
                        <Diagram id="diag-storage-console" label="Fig 2.1 — コンソールでのバケット作成フロー" />
                        <div className="diagram-caption">Fig 2.1 — コンソールでのバケット作成フロー</div>
                    </div>

                    <h3 className="subhead">CLI でのベストプラクティス</h3>
                    <div className="code-block">
                        <div className="code-line"><span className="code-comment"># バケット作成（gcloud storage は gsutil の後継コマンド）</span></div>
                        <div className="code-line">gcloud storage buckets create gs://&lt;YOUR-BUCKET-NAME&gt; \</div>
                        <div className="code-line">  --location=REGION \</div>
                        <div className="code-line">  --default-storage-class=STANDARD</div>
                        <div className="code-line"></div>
                        <div className="code-line"><span className="code-comment"># オブジェクトのアップロード</span></div>
                        <div className="code-line">gcloud storage cp ada.jpg gs://YOUR-BUCKET-NAME</div>
                        <div className="code-line"></div>
                        <div className="code-line"><span className="code-comment"># フォルダ構造を模したコピー</span></div>
                        <div className="code-line">gcloud storage cp gs://YOUR-BUCKET-NAME/ada.jpg gs://YOUR-BUCKET-NAME/image-folder/</div>
                        <div className="code-line"></div>
                        <div className="code-line"><span className="code-comment"># 一覧表示（詳細付き）</span></div>
                        <div className="code-line">gcloud storage ls -l gs://YOUR-BUCKET-NAME</div>
                    </div>

                    <p>
                        <b>なぜ <code>gcloud storage</code> を使うのか</b>：旧来の
                        <code>gsutil</code> コマンドと同等の操作ができますが、<code>gcloud</code> CLI
                        に統合されたことで認証・出力フォーマットの一貫性が高まっています。ラボの一部では
                        <code>gsutil</code> も登場しますが、現在は
                        <code>gcloud storage</code> 系のコマンドが推奨されます。
                    </p>

                    <h3 className="subhead">公開アクセスとオブジェクト権限のベストプラクティス</h3>
                    <p>
                        ラボでは <code>allUsers</code> に
                        <code>Storage Object Viewer</code>
                        ロールを付与してオブジェクトを公開しますが、これは<b>学習目的の例</b>であり、本番運用では以下の原則を守る必要があります。
                    </p>
                    <ul>
                        <li>
                            オブジェクトを公開読み取り可能にする権限を使う際は、本当にそのオブジェクトを公開する意図があるかを必ず確認すること。一度「公開」されたデータはインターネット上のどこかにコピーされる可能性があり、実質的に読み取り制御を取り戻すことは不可能になる。
                        </li>
                        <li>
                            個々のユーザーを大量に列挙するより、グループを使う方が望ましい。スケールしやすく、大量のオブジェクトに対するアクセス制御を一括で効率的に更新できる。
                        </li>
                        <li>
                            均一バケットレベルアクセス（Uniform bucket-level
                            access）を有効にし、オブジェクト単位の ACL 管理よりも IAM
                            による一元管理を優先する。
                        </li>
                    </ul>

                    <div className="diagram-wrap">
                        <Diagram id="diag-storage-public" label="Fig 2.2 — 公開アクセス設計の意思決定フロー" />
                        <div className="diagram-caption">Fig 2.2 — 公開アクセス設計の意思決定フロー</div>
                    </div>
                </section>

                {/* ===================== IAM ===================== */}
                <section id="iam">
                    <div className="chapter-head">
                        <span className="chapter-num">CH.03</span>
                        <h2>IAM — アクセス制御の基礎</h2>
                    </div>

                    <h3 className="subhead">定義</h3>
                    <p>
                        Identity and Access
                        Management（IAM）は、「誰が（Identity）」「どのリソースに」「何ができるか（Role）」を一元管理する仕組みです。IAM
                        ポリシーは、プリンシパル（ユーザー・グループ・サービスアカウント）にロール（権限の集合）を紐付けることで機能します。
                    </p>

                    <h3 className="subhead">基本ロール（Basic Roles）の理解</h3>
                    <p>
                        レガシーな基本ロールは
                        Owner（<code>roles/owner</code>）、Editor（<code>roles/editor</code>）、Viewer（<code>roles/viewer</code>）の3つです。プリンシパルに基本ロールを付与すると、そのロールに含まれるすべての権限が付与されます。
                    </p>

                    <div className="diagram-wrap">
                        <Diagram id="diag-iam-basic" label="Fig 3.1 — 基本ロールの包含関係" />
                        <div className="diagram-caption">Fig 3.1 — 基本ロールの包含関係</div>
                    </div>

                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">ロール</th>
                                    <th scope="col">できること</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><code>roles/viewer</code></td>
                                    <td>リソースの閲覧のみ（状態を変更する操作は不可）</td>
                                </tr>
                                <tr>
                                    <td><code>roles/editor</code></td>
                                    <td>Viewer の全権限 ＋ 既存リソースの変更</td>
                                </tr>
                                <tr>
                                    <td><code>roles/owner</code></td>
                                    <td>Editor の全権限 ＋ プロジェクトの権限管理・課金設定</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="callout danger">
                        <span className="callout-label">Caution</span>
                        基本ロール（Owner・Editor・Viewer）はすべての Google Cloud
                        サービスにまたがる膨大な数の権限を含みます。本番環境では、代替手段がない場合を除き基本ロールを付与すべきではなく、必要最小限の事前定義ロールまたはカスタムロールを使用することが推奨されます。これは<b>最小権限の原則（Principle of Least Privilege）</b>と呼ばれ、IAM設計の最重要指針です。
                    </div>

                    <h3 className="subhead">事前定義ロールへの移行（本番運用のベストプラクティス）</h3>
                    <p>
                        ラボでは学習を簡単にするために基本ロールを使いますが、実運用では下表のようにサービス固有の事前定義ロールに置き換えるべきです。
                    </p>

                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">シナリオ</th>
                                    <th scope="col">❌ ラボでの簡易設定</th>
                                    <th scope="col">✅ 本番運用でのベストプラクティス</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Cloud Storage の読み取り専用アクセス</td>
                                    <td><code>roles/viewer</code>（プロジェクト全体）</td>
                                    <td><code>roles/storage.objectViewer</code>（バケット単位）</td>
                                </tr>
                                <tr>
                                    <td>Pub/Sub へのメッセージ発行</td>
                                    <td><code>roles/editor</code></td>
                                    <td><code>roles/pubsub.publisher</code>（トピック単位）</td>
                                </tr>
                                <tr>
                                    <td>Cloud Run functions のデプロイ</td>
                                    <td><code>roles/owner</code></td>
                                    <td>
                                        <code>roles/cloudfunctions.developer</code> +{' '}
                                        <code>roles/iam.serviceAccountUser</code>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="subhead">権限の伝播と反映時間</h3>
                    <p>
                        IAM
                        ポリシーの変更は即座にではなく、システム全体に伝播するまで時間がかかることがあります。ラボの手順内でも「最大80秒程度かかる」という注記がありますが、これは
                        Google のグローバルに分散したメタデータレイヤーの整合性モデルに起因します。
                    </p>

                    <div className="diagram-wrap">
                        <Diagram id="diag-iam-sequence" label="Fig 3.2 — IAM権限変更の伝播シーケンス" />
                        <div className="diagram-caption">Fig 3.2 — IAM権限変更の伝播シーケンス</div>
                    </div>

                    <h3 className="subhead">権限を絞り込むための実践フロー</h3>
                    <p>
                        プリンシパルに付与すべき事前定義ロールを見つけるには、まず本番環境では基本ロールを候補から除外し、サービスエージェント用のロール（名前が
                        &quot;Service Agent&quot;
                        で終わるもの）も除外した上で、必要な権限を含む最も限定的な事前定義ロールを選びます。
                    </p>

                    <div className="diagram-wrap">
                        <Diagram id="diag-iam-flow" label="Fig 3.3 — 最小権限ロール選定フロー" />
                        <div className="diagram-caption">Fig 3.3 — 最小権限ロール選定フロー</div>
                    </div>
                </section>

                {/* ===================== MONITORING ===================== */}
                <section id="monitoring">
                    <div className="chapter-head">
                        <span className="chapter-num">CH.04</span>
                        <h2>Cloud Monitoring — 可観測性の基礎</h2>
                    </div>

                    <h3 className="subhead">定義</h3>
                    <p>
                        Cloud Monitoring は、Google
                        Cloud・AWS・オンプレミスのアプリケーションからメトリクス・イベント・メタデータを収集し、ダッシュボード・アラートを通じてシステムの健全性を可視化するサービスです。Cloud
                        Logging と密に統合されており、両者を合わせて「Google Cloud
                        Observability」と呼びます。
                    </p>

                    <h3 className="subhead">なぜエージェントが必要なのか</h3>
                    <p>
                        Compute Engine の VM は、ハイパーバイザー経由で CPU
                        使用率やネットワークトラフィックなど一部のメトリクスを自動的に収集できますが、ディスク
                        I/O の詳細やアプリケーション固有のログ・メトリクスを取得するには
                        <b>Ops Agent</b> のインストールが必要です。Ops Agent は Compute Engine
                        インスタンス上でログとメトリクスを収集し、ログは Cloud Logging へ、メトリクスは
                        Cloud Monitoring へ送信します。
                    </p>

                    <div className="diagram-wrap">
                        <Diagram id="diag-monitoring-agent" label="Fig 4.1 — Ops Agent を介したテレメトリー収集の流れ" />
                        <div className="diagram-caption">
                            Fig 4.1 — Ops Agent を介したテレメトリー収集の流れ
                        </div>
                    </div>

                    <h3 className="subhead">インストール手順（ベストプラクティス比較）</h3>
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">方法</th>
                                    <th scope="col">適したシーン</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>VM作成時にチェックボックスで自動インストール</td>
                                    <td>新規VM、少数台のシンプルな運用</td>
                                </tr>
                                <tr>
                                    <td>インストールスクリプトを SSH 内で実行</td>
                                    <td>既存VMへの後付け、ラボでの学習</td>
                                </tr>
                                <tr>
                                    <td>VM Extension Manager ポリシー</td>
                                    <td>フリート全体への一括導入・自動アップグレード</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="code-block">
                        <div className="code-line"><span className="code-comment"># Ops Agent のインストール（SSH ターミナル内）</span></div>
                        <div className="code-line">curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh</div>
                        <div className="code-line">sudo bash add-google-cloud-ops-agent-repo.sh --also-install</div>
                        <div className="code-line"></div>
                        <div className="code-line"><span className="code-comment"># インストール状態の確認</span></div>
                        <div className="code-line">sudo systemctl status google-cloud-ops-agent&quot;*&quot;</div>
                    </div>

                    <div className="callout info">
                        <span className="callout-label">Note</span>
                        デフォルトでは Ops Agent は Compute Engine
                        のデフォルトサービスアカウントを使用し、そのサービスアカウントにはログとメトリクスの書き込みに必要な
                        Logs Writer（<code>roles/logging.logWriter</code>）と Monitoring Metric Writer
                        のロールが付与されています。本番環境では最小権限の専用サービスアカウントを VM
                        にアタッチすることが推奨されます（第3章参照）。
                    </div>

                    <h3 className="subhead">アップタイムチェックとアラートポリシーの設計</h3>
                    <div className="gb-grid">
                        <div className="gb-card good">
                            <div className="gb-title">✅ 良い例</div>
                            チェック頻度: サービスの SLA に応じて調整（1〜5分間隔）<br />
                            通知先: オンコール担当者のチャンネル（Slack/PagerDuty）<br />
                            しきい値: 過去のベースラインを踏まえて設定
                        </div>
                        <div className="gb-card bad">
                            <div className="gb-title">❌ 悪い例</div>
                            チェック頻度: 常に最小間隔にしてコストを無駄にする<br />
                            通知先: 個人のメールアドレスのみで属人化<br />
                            しきい値: 根拠のない値を仮置きしたまま放置
                        </div>
                    </div>

                    <div className="diagram-wrap">
                        <Diagram id="diag-monitoring-alert" label="Fig 4.2 — アップタイムチェック〜アラート設計フロー" />
                        <div className="diagram-caption">
                            Fig 4.2 — アップタイムチェック〜アラート設計フロー
                        </div>
                    </div>

                    <h3 className="subhead">ダッシュボード設計の考え方</h3>
                    <p>
                        ラボでは CPU Load と Received Packets
                        の2つのウィジェットを持つカスタムダッシュボードを作成します。実運用では、以下の「4大シグナル（Four
                        Golden Signals）」を意識して設計すると効果的です。
                    </p>

                    <div className="metric-grid">
                        <div className="metric-card">
                            <div className="metric-val">Latency</div>
                            <div className="metric-label">リクエスト応答時間</div>
                        </div>
                        <div className="metric-card">
                            <div className="metric-val">Traffic</div>
                            <div className="metric-label">Received/Sent Packets</div>
                        </div>
                        <div className="metric-card">
                            <div className="metric-val">Errors</div>
                            <div className="metric-label">5xx エラーレート</div>
                        </div>
                        <div className="metric-card">
                            <div className="metric-val">Saturation</div>
                            <div className="metric-label">CPU load・ディスク使用率</div>
                        </div>
                    </div>
                </section>

                {/* ===================== CLOUD RUN FUNCTIONS ===================== */}
                <section id="functions">
                    <div className="chapter-head">
                        <span className="chapter-num">CH.05</span>
                        <h2>Cloud Run functions — イベント駆動サーバーレス</h2>
                    </div>

                    <h3 className="subhead">定義</h3>
                    <p>
                        Cloud Run function（旧称 Cloud
                        Functions）は、HTTPリクエストやメッセージング、ファイルアップロードなどの「イベント」に応答して実行される単一目的のコードです。常時起動するサーバーが不要なため、突発的・断続的なワークロードに向いています。
                    </p>

                    <h3 className="subhead">トリガーの2種類</h3>
                    <p>
                        Cloud Run functions のイベント駆動トリガーは、Google Cloud
                        プロジェクト内のイベントに反応します。これに対し HTTP トリガーは HTTP(S)
                        リクエストに反応します。イベント駆動の関数をトリガーするには、CloudEvents 仕様の
                        Google 実装である <b>Eventarc</b> を使う必要があります。
                    </p>

                    <div className="diagram-wrap">
                        <Diagram id="diag-functions-triggers" label="Fig 5.1 — HTTPトリガーとイベント駆動トリガーの分岐" />
                        <div className="diagram-caption">
                            Fig 5.1 — HTTPトリガーとイベント駆動トリガーの分岐
                        </div>
                    </div>

                    <div className="callout info">
                        <span className="callout-label">Note</span>
                        Pub/Sub トリガーと Cloud Storage トリガーは、いずれも Eventarc
                        トリガーの一種として実装されています。つまり「Pub/Sub
                        トリガー」というラボのタスクは、内部的には Eventarc が Pub/Sub
                        のイベントをフィルタリングして関数に配信する仕組みになっています。
                    </div>

                    <h3 className="subhead">コンソールでのデプロイフロー</h3>
                    <div className="diagram-wrap">
                        <Diagram id="diag-functions-deploy" label="Fig 5.2 — コンソールでの関数デプロイフロー" />
                        <div className="diagram-caption">Fig 5.2 — コンソールでの関数デプロイフロー</div>
                    </div>

                    <h3 className="subhead">CLI でのデプロイと Pub/Sub トリガー</h3>
                    <div className="code-block">
                        <div className="code-line"><span className="code-comment"># 関数のデプロイ（Pub/Sub トリガー、第2世代）</span></div>
                        <div className="code-line">gcloud functions deploy nodejs-pubsub-function \</div>
                        <div className="code-line">  --gen2 \</div>
                        <div className="code-line">  --runtime=nodejs22 \</div>
                        <div className="code-line">  --region=REGION \</div>
                        <div className="code-line">  --source=. \</div>
                        <div className="code-line">  --entry-point=helloPubSub \</div>
                        <div className="code-line">  --trigger-topic cf-demo \</div>
                        <div className="code-line">  --stage-bucket PROJECT_ID-bucket \</div>
                        <div className="code-line">  --service-account cloudfunctionsa@PROJECT_ID.iam.gserviceaccount.com \</div>
                        <div className="code-line">  --allow-unauthenticated</div>
                        <div className="code-line"></div>
                        <div className="code-line"><span className="code-comment"># デプロイ状態の確認</span></div>
                        <div className="code-line">gcloud functions describe nodejs-pubsub-function --region=REGION</div>
                        <div className="code-line"></div>
                        <div className="code-line"><span className="code-comment"># トピックにメッセージを発行してテスト</span></div>
                        <div className="code-line">gcloud pubsub topics publish cf-demo --message=&quot;Cloud Function Gen2&quot;</div>
                        <div className="code-line"></div>
                        <div className="code-line"><span className="code-comment"># ログの確認</span></div>
                        <div className="code-line">gcloud functions logs read nodejs-pubsub-function --region=REGION</div>
                    </div>

                    <h3 className="subhead">Cloud Storage トリガー作成のベストプラクティス</h3>
                    <p>
                        第7章の Challenge Lab で使う Cloud Storage トリガーは、次のように Eventarc の
                        <code>google.cloud.storage.object.v1.finalized</code>
                        イベントをフィルタリングして構築します。
                    </p>

                    <div className="code-block">
                        <div className="code-line">gcloud eventarc triggers create TRIGGER_NAME \</div>
                        <div className="code-line">  --location=REGION \</div>
                        <div className="code-line">  --destination-run-service=SERVICE_NAME \</div>
                        <div className="code-line">  --destination-run-region=REGION \</div>
                        <div className="code-line">  --event-filters=&quot;type=google.cloud.storage.object.v1.finalized&quot; \</div>
                        <div className="code-line">  --event-filters=&quot;bucket=BUCKET_NAME&quot; \</div>
                        <div className="code-line">  --service-account=SERVICE_ACCOUNT_EMAIL</div>
                    </div>

                    <p>
                        Eventarc
                        トリガーの作成後、すぐに稼働するわけではなく、トリガーが完全に機能するまで<b>最大2分</b>ほどかかることがあります。ラボの手順で「サムネイル画像がすぐに反映されない」場合の多くは、この伝播待ちが原因です。
                    </p>

                    <h3 className="subhead">サービスアカウントとロールの整合性</h3>
                    <p>
                        Cloud Storage の直接イベントに対するトリガーを作成する前に、Cloud Storage
                        のサービスエージェントに Pub/Sub
                        パブリッシャーのロール（<code>roles/pubsub.publisher</code>）を付与する必要があります。これは、Cloud
                        Storage の変更イベントが内部的に Pub/Sub 経由で Eventarc
                        に配信される仕組みになっているためです。
                    </p>

                    <div className="diagram-wrap">
                        <Diagram id="diag-functions-sa" label="Fig 5.3 — イベント配信とサービスアカウント権限構造" />
                        <div className="diagram-caption">Fig 5.3 — イベント配信とサービスアカウント権限構造</div>
                    </div>

                    <div className="gb-grid">
                        <div className="gb-card good">
                            <div className="gb-title">✅ 良い例</div>
                            サービスアカウント: 関数専用の最小権限SAを作成・アタッチ<br />
                            権限管理: 必要なロール（<code>eventReceiver</code>, <code>invoker</code>）のみを明示付与<br />
                            認証設定: 要件に応じて IAM 認証を必須化
                        </div>
                        <div className="gb-card bad">
                            <div className="gb-title">❌ 悪い例</div>
                            サービスアカウント: Compute Engine のデフォルトSAを使い回す<br />
                            権限管理: エラーのたびに権限を過剰に付与して回避<br />
                            認証設定: 常に <code>--allow-unauthenticated</code> で公開
                        </div>
                    </div>
                </section>

                {/* ===================== PUB/SUB ===================== */}
                <section id="pubsub">
                    <div className="chapter-head">
                        <span className="chapter-num">CH.06</span>
                        <h2>Pub/Sub — 非同期メッセージング</h2>
                    </div>

                    <h3 className="subhead">定義</h3>
                    <p>
                        Pub/Sub
                        は、メッセージの送信者（Publisher）と受信者（Subscriber）を分離した非同期・スケーラブルなメッセージングサービスです。レイテンシは通常100ミリ秒程度で、ストリーミング分析やデータ統合パイプラインでのデータのロード・配信によく使われます。
                    </p>

                    <h3 className="subhead">基本コンセプト</h3>
                    <div className="diagram-wrap">
                        <Diagram id="diag-pubsub-basic" label="Fig 6.1 — Publish/Subscribe の基本構造" />
                        <div className="diagram-caption">Fig 6.1 — Publish/Subscribe の基本構造</div>
                    </div>

                    <p>
                        Publisher（Producer
                        とも呼ばれる）はメッセージを作成し、指定したトピックに対してメッセージングサービスに送信（Publish）します。Subscription
                        は特定のトピックのメッセージを受信する意思を表す名前付きのエンティティで、Subscriber（Consumer
                        とも呼ばれる）は指定した Subscription からメッセージを受信します。
                    </p>

                    <h3 className="subhead">なぜ「先にサブスクリプションを作る」のか</h3>
                    <p>
                        サブスクリプションが接続されていないトピックに発行を開始すると、そのメッセージは保持されず、後から接続されたサブスクリプションに配信することはできません。ラボの手順で「トピックを作成
                        → サブスクリプションを作成 →
                        メッセージを発行」という順序が徹底されているのは、このためです。
                    </p>

                    <div className="diagram-wrap">
                        <Diagram id="diag-pubsub-timing" label="Fig 6.2 — サブスクリプション作成タイミングの重要性" />
                        <div className="diagram-caption">
                            Fig 6.2 — サブスクリプション作成タイミングの重要性
                        </div>
                    </div>

                    <h3 className="subhead">コンソール・CLI・Python の3つのアプローチ比較</h3>
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">アプローチ</th>
                                    <th scope="col">主なコマンド／操作</th>
                                    <th scope="col">向いている用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>コンソール</td>
                                    <td>Pub/Sub &gt; Topics &gt; Create topic</td>
                                    <td>学習・GUIでの動作確認</td>
                                </tr>
                                <tr>
                                    <td>gcloud CLI</td>
                                    <td>
                                        <code>gcloud pubsub topics create</code> /{' '}
                                        <code>gcloud pubsub subscriptions pull</code>
                                    </td>
                                    <td>スクリプト化・自動化・CI/CD</td>
                                </tr>
                                <tr>
                                    <td>Python クライアントライブラリ</td>
                                    <td>
                                        <code>publisher.py</code> /{' '}
                                        <code>subscriber.py</code>（公式サンプル）
                                    </td>
                                    <td>アプリケーションへの組み込み</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="code-block">
                        <div className="code-line"><span className="code-comment"># トピック作成</span></div>
                        <div className="code-line">gcloud pubsub topics create myTopic</div>
                        <div className="code-line"></div>
                        <div className="code-line"><span className="code-comment"># サブスクリプション作成（Pull型）</span></div>
                        <div className="code-line">gcloud pubsub subscriptions create --topic myTopic mySubscription</div>
                        <div className="code-line"></div>
                        <div className="code-line"><span className="code-comment"># メッセージ発行</span></div>
                        <div className="code-line">gcloud pubsub topics publish myTopic --message &quot;Hello World&quot;</div>
                        <div className="code-line"></div>
                        <div className="code-line"><span className="code-comment"># メッセージのPull（自動ACK）</span></div>
                        <div className="code-line">gcloud pubsub subscriptions pull mySubscription --auto-ack</div>
                        <div className="code-line"></div>
                        <div className="code-line"><span className="code-comment"># 複数メッセージをまとめてPull</span></div>
                        <div className="code-line">gcloud pubsub subscriptions pull mySubscription --limit=3</div>
                    </div>

                    <div className="callout tip">
                        <span className="callout-label">Tip</span>
                        <code>--auto-ack</code> を付けずに Pull
                        すると、メッセージは確認応答（ACK）されないまま残り続け、確認応答期限が過ぎると再配信されます。ラボで「同じメッセージが1つずつしか出てこない」という挙動は、<code>pull</code> コマンドがデフォルトで1件しか返さない仕様によるものです。
                    </div>

                    <h3 className="subhead">Publish / Subscribe のベストプラクティス</h3>
                    <p>
                        Pub/Sub client library でメッセージを発行する際は、リクエストごとに新しい
                        Publisher クライアントを作るのではなく、同じ Publisher
                        クライアントを再利用する方が効率的です。新しい Publisher
                        クライアントを作成した後の最初の発行リクエストは、認証済み接続を確立するのに時間がかかるためです。
                    </p>
                    <p>
                        発行側でメッセージに順序キー（ordering
                        key）を付けて同一リージョンに送信している場合、Subscriber
                        側でもそのSubscriptionに対して順序付き配信を有効にすることで、メッセージを順序どおりに受信できます。
                    </p>

                    <div className="gb-grid">
                        <div className="gb-card good">
                            <div className="gb-title">✅ 良い例</div>
                            クライアント管理: Publisher/Subscriberクライアントを使い回す<br />
                            メッセージ順序: 必要な場合のみ ordering key を使用<br />
                            重複耐性: アプリケーション側で重複配信に耐えられる設計
                        </div>
                        <div className="gb-card bad">
                            <div className="gb-title">❌ 悪い例</div>
                            クライアント管理: リクエストのたびに新規クライアントを生成<br />
                            メッセージ順序: 全メッセージに不要な順序制御を強制しスループット低下<br />
                            重複耐性: 重複が来ない前提でロジックを書く
                        </div>
                    </div>

                    <h3 className="subhead">信頼性設計（マルチゾーン／マルチリージョン）</h3>
                    <p>
                        Pub/Sub
                        はゾーン間レプリケーションを組み込みで備えており、サービス自体の単一ゾーン障害への対処は不要ですが、クライアント側やネットワークの障害に対する耐性を持たせるには、リージョン内の複数ゾーンで十分なキャパシティを持つ
                        Publisher と Subscriber を運用することがベストプラクティスです。
                    </p>
                </section>

                {/* ===================== CHALLENGE LAB ===================== */}
                <section id="challenge">
                    <div className="chapter-head">
                        <span className="chapter-num">CH.07</span>
                        <h2>総合演習：Challenge Lab（GSP315）&quot;Memories&quot; サムネイル生成システム</h2>
                    </div>

                    <h3 className="subhead">シナリオ</h3>
                    <p>
                        新設された &quot;Memories&quot;
                        チーム向けに、写真をアップロードすると自動でサムネイルを生成するパイプラインを構築します。これは第2〜6章で学んだ全サービスの統合演習です。
                    </p>

                    <h3 className="subhead">統合アーキテクチャ</h3>
                    <div className="diagram-wrap">
                        <Diagram id="diag-challenge-arch" label="Fig 7.1 — Challenge Lab 統合アーキテクチャ" />
                        <div className="diagram-caption">Fig 7.1 — Challenge Lab 統合アーキテクチャ</div>
                    </div>

                    <h3 className="subhead">タスクごとの実装ポイント</h3>

                    <div className="arch-layers">
                        <div className="arch-row storage">
                            <span className="arch-tag">TASK 1</span>
                            <p>
                                <b>バケット作成</b> —{' '}
                                <code>gcloud storage buckets create gs://&lt;Bucket Name&gt; --location=REGION</code>。指定された REGION／ZONE
                                に必ず合わせて作成することが採点上のポイントです。標準サイズ（<code>e2-micro</code>／<code>e2-medium</code>）とリージョン指定はコスト管理の観点からも重要です。
                            </p>
                        </div>
                        <div className="arch-row pubsub">
                            <span className="arch-tag">TASK 2</span>
                            <p>
                                <b>Pub/Sub トピック作成</b> —{' '}
                                <code>gcloud pubsub topics create &lt;Topic Name&gt;</code>。このトピックは、サムネイル生成完了後に Cloud Run function
                                から通知を発行するために使われます（第6章参照）。
                            </p>
                        </div>
                        <div className="arch-row func">
                            <span className="arch-tag">TASK 3</span>
                            <p>
                                <b>Cloud Run function（サムネイル生成）</b> — Entry
                                point：関数名（イベントを処理する関数）。Trigger：Cloud Storage（第5章の
                                Eventarc トリガーと同じ仕組み）。ランタイム：Node.js
                                22、第2世代（Execution environment）。
                            </p>
                        </div>
                        <div className="arch-row iam">
                            <span className="arch-tag">TASK 4</span>
                            <p>
                                <b>前任エンジニアのアクセス除去</b> —
                                第3章で学んだ「最小権限の原則」の実践。退職・異動したメンバーのアクセスを速やかに取り消すことは、セキュリティ運用の基本です。
                            </p>
                        </div>
                    </div>

                    <div className="code-block">
                        <div className="code-line"><span className="code-comment">// タスク3: コード内の要点</span></div>
                        <div className="code-line">functions.cloudEvent(&apos;&apos;, async cloudEvent =&gt; &#123;</div>
                        <div className="code-line">  const event = cloudEvent.data;</div>
                        <div className="code-line">  const fileName = event.name;</div>
                        <div className="code-line">  const bucketName = event.bucket;</div>
                        <div className="code-line">  <span className="code-comment">// ファイル名にすでに &quot;64x64_thumbnail&quot; が含まれていないかチェックする</span></div>
                        <div className="code-line">  <span className="code-comment">// → これは無限ループ（サムネイルからさらにサムネイルを作る）を防ぐガード</span></div>
                        <div className="code-line">  if (fileName.search(&quot;64x64_thumbnail&quot;) === -1) &#123;</div>
                        <div className="code-line">    <span class="code-comment">// sharpでリサイズしてサムネイルを生成</span></div>
                        <div className="code-line">    <span class="code-comment">// 生成後、Pub/Subトピックに完了メッセージを発行</span></div>
                        <div className="code-line">  &#125;</div>
                        <div className="code-line">&#125;);</div>
                    </div>

                    <div className="callout warning">
                        <span className="callout-label">Important</span>
                        この「すでにサムネイルかどうかをファイル名でチェックする」ロジックは、イベント駆動アーキテクチャで頻出する<b>無限ループ防止パターン</b>です。サムネイル生成が新しいオブジェクトを同じバケットに書き込むと、それ自体が新たな
                        <code>object.finalized</code>
                        イベントを発火させてしまうため、処理対象を判定するガード条件が不可欠です。
                    </div>

                    <div className="code-block">
                        <div className="code-line"><span className="code-comment"># タスク4: Username 2（Viewerロール）からアクセスを除去</span></div>
                        <div className="code-line">gcloud projects remove-iam-policy-binding PROJECT_ID \</div>
                        <div className="code-line">  --member=&quot;user:PREVIOUS_ENGINEER_EMAIL&quot; \</div>
                        <div className="code-line">  --role=&quot;roles/viewer&quot;</div>
                    </div>

                    <h3 className="subhead">必要な IAM ロールの整理</h3>
                    <p>
                        Cloud Run function サービスアカウントに
                        <code>roles/run.invoker</code>（呼び出し許可）と
                        <code>roles/eventarc.eventReceiver</code>（イベント受信許可）を付与し、Cloud
                        Storage のサービスアカウントには
                        <code>roles/pubsub.publisher</code>
                        を付与して、オブジェクトがアップロードされた際にイベントを発行できるようにする必要があります。
                    </p>

                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">サービスアカウント</th>
                                    <th scope="col">付与するロール</th>
                                    <th scope="col">目的</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Cloud Run function 用 SA</td>
                                    <td><code>roles/eventarc.eventReceiver</code></td>
                                    <td>Eventarc からイベントを受信</td>
                                </tr>
                                <tr>
                                    <td>Cloud Run function 用 SA</td>
                                    <td><code>roles/run.invoker</code></td>
                                    <td>関数（サービス）を呼び出し可能にする</td>
                                </tr>
                                <tr>
                                    <td>Cloud Storage サービスエージェント</td>
                                    <td><code>roles/pubsub.publisher</code></td>
                                    <td>オブジェクトイベントをEventarcに転送</td>
                                </tr>
                                <tr>
                                    <td>Cloud Run function 用 SA</td>
                                    <td><code>roles/pubsub.publisher</code>（トピック単位）</td>
                                    <td>処理完了メッセージを発行</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* ===================== PRACTICES TABLE ===================== */}
                <section id="practices">
                    <div className="chapter-head">
                        <span className="chapter-num">CH.08</span>
                        <h2>サービス横断ベストプラクティス早見表</h2>
                    </div>

                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">カテゴリ</th>
                                    <th scope="col">ベストプラクティス</th>
                                    <th scope="col">該当章</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>コスト</td>
                                    <td>
                                        リージョン・ゾーンを指定し、不要なマルチリージョン設定を避ける
                                    </td>
                                    <td>CH.02, CH.07</td>
                                </tr>
                                <tr>
                                    <td>コスト</td>
                                    <td>
                                        VM サイズは要件に応じて <code>e2-micro</code>／<code>e2-medium</code> を選択
                                    </td>
                                    <td>CH.04, CH.07</td>
                                </tr>
                                <tr>
                                    <td>セキュリティ</td>
                                    <td>基本ロール（Owner/Editor/Viewer）は本番で極力使わない</td>
                                    <td>CH.03</td>
                                </tr>
                                <tr>
                                    <td>セキュリティ</td>
                                    <td>公開アクセスは範囲を最小限に、意図を明確にしてから設定</td>
                                    <td>CH.02</td>
                                </tr>
                                <tr>
                                    <td>セキュリティ</td>
                                    <td>用途ごとに専用サービスアカウントを作成する</td>
                                    <td>CH.05, CH.07</td>
                                </tr>
                                <tr>
                                    <td>可用性</td>
                                    <td>アップタイムチェックとアラートで異常を早期検知</td>
                                    <td>CH.04</td>
                                </tr>
                                <tr>
                                    <td>可用性</td>
                                    <td>Pub/Sub Publisher/Subscriber をマルチゾーンで運用</td>
                                    <td>CH.06</td>
                                </tr>
                                <tr>
                                    <td>開発効率</td>
                                    <td>Publisher/Subscriber クライアントを再利用する</td>
                                    <td>CH.06</td>
                                </tr>
                                <tr>
                                    <td>開発効率</td>
                                    <td>イベント駆動関数には無限ループ防止のガード条件を入れる</td>
                                    <td>CH.05, CH.07</td>
                                </tr>
                                <tr>
                                    <td>運用</td>
                                    <td>退職・異動したメンバーのIAMロールを速やかに除去する</td>
                                    <td>CH.03, CH.07</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* ===================== TROUBLESHOOTING ===================== */}
                <section id="troubleshoot">
                    <div className="chapter-head">
                        <span className="chapter-num">CH.09</span>
                        <h2>よくあるエラーとトラブルシューティング</h2>
                    </div>

                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">症状</th>
                                    <th scope="col">原因</th>
                                    <th scope="col">対処</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>バケット作成時に <code>409 Conflict</code></td>
                                    <td>バケット名がグローバルに重複している</td>
                                    <td>より一意性の高い名前（ランダムなサフィックス付き）に変更</td>
                                </tr>
                                <tr>
                                    <td>IAM 権限変更後もアクセスが変わらない</td>
                                    <td>ポリシーの伝播待ち（最大80秒程度）</td>
                                    <td>数分待って再試行、または再ログイン</td>
                                </tr>
                                <tr>
                                    <td>Cloud Run function の Eventarc トリガーが発火しない</td>
                                    <td>トリガー作成直後で伝播が完了していない、または権限不足</td>
                                    <td>
                                        最大2分待つ、<code>roles/pubsub.publisher</code> 等の権限を確認
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <code>AccessDeniedException</code>（Pub/Sub 経由の Storage
                                        操作）
                                    </td>
                                    <td>サービスエージェントへのロール付与が反映されていない</td>
                                    <td>1分程度待って再実行</td>
                                </tr>
                                <tr>
                                    <td>Pub/Sub の <code>pull</code> で0件しか返らない</td>
                                    <td>
                                        サブスクリプションが未接続の状態でメッセージを発行した、または既にACK済み
                                    </td>
                                    <td>先にサブスクリプションを作成してから発行する運用に変更</td>
                                </tr>
                                <tr>
                                    <td>Ops Agent のステータスが &quot;Not detected&quot;</td>
                                    <td>サービスアカウントの権限不足、またはエージェント未起動</td>
                                    <td>
                                        <code>roles/logging.logWriter</code>／Monitoring
                                        関連ロールを確認しエージェントを再起動
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* ===================== REFERENCES ===================== */}
                <section id="refs">
                    <div className="chapter-head">
                        <span className="chapter-num">CH.10</span>
                        <h2>参考ソース一覧</h2>
                    </div>
                    <p className="chapter-desc">
                        各章の内容を裏付ける一次情報源です。ラボの簡易設定を本番環境にそのまま持ち込まないよう、必ず最新のドキュメントを確認してください。
                    </p>

                    <h3 className="subhead">Cloud Storage</h3>
                    <div className="ref-grid">
                        <div className="ref-card">
                            <div className="ref-cat">Naming</div>
                            <div className="ref-title">About Cloud Storage buckets（バケット命名規則）</div>
                            <a
                                className="ref-url"
                                href="https://docs.cloud.google.com/storage/docs/buckets"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                docs.cloud.google.com/storage/docs/buckets
                            </a>
                        </div>
                        <div className="ref-card">
                            <div className="ref-cat">Best Practices</div>
                            <div className="ref-title">Best practices for Cloud Storage</div>
                            <a
                                className="ref-url"
                                href="https://cloud.google.com/storage/docs/best-practices"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                cloud.google.com/storage/docs/best-practices
                            </a>
                        </div>
                        <div className="ref-card">
                            <div className="ref-cat">How-to</div>
                            <div className="ref-title">Create a bucket</div>
                            <a
                                className="ref-url"
                                href="https://cloud.google.com/storage/docs/creating-buckets"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                cloud.google.com/storage/docs/creating-buckets
                            </a>
                        </div>
                    </div>

                    <h3 className="subhead">IAM</h3>
                    <div className="ref-grid">
                        <div className="ref-card">
                            <div className="ref-cat">Concept</div>
                            <div className="ref-title">Roles and permissions（基本ロールの定義）</div>
                            <a
                                className="ref-url"
                                href="https://docs.cloud.google.com/iam/docs/roles-overview"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                docs.cloud.google.com/iam/docs/roles-overview
                            </a>
                        </div>
                        <div className="ref-card">
                            <div className="ref-cat">Best Practices</div>
                            <div className="ref-title">
                                Find the right predefined roles（最小権限の原則の実践）
                            </div>
                            <a
                                className="ref-url"
                                href="https://docs.cloud.google.com/iam/docs/choose-predefined-roles"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                docs.cloud.google.com/iam/docs/choose-predefined-roles
                            </a>
                        </div>
                        <div className="ref-card">
                            <div className="ref-cat">Reference</div>
                            <div className="ref-title">IAM roles for Cloud Storage</div>
                            <a
                                className="ref-url"
                                href="https://docs.cloud.google.com/storage/docs/access-control/iam-roles"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                docs.cloud.google.com/storage/docs/access-control/iam-roles
                            </a>
                        </div>
                    </div>

                    <h3 className="subhead">Cloud Monitoring</h3>
                    <div className="ref-grid">
                        <div className="ref-card">
                            <div className="ref-cat">How-to</div>
                            <div className="ref-title">Installing the Ops Agent on individual VMs</div>
                            <a
                                className="ref-url"
                                href="https://docs.cloud.google.com/monitoring/agent/ops-agent/installation"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                docs.cloud.google.com/monitoring/agent/ops-agent/installation
                            </a>
                        </div>
                        <div className="ref-card">
                            <div className="ref-cat">How-to</div>
                            <div className="ref-title">Install the Ops Agent during VM creation</div>
                            <a
                                className="ref-url"
                                href="https://docs.cloud.google.com/monitoring/agent/ops-agent/install-agent-vm-creation"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                docs.cloud.google.com/monitoring/agent/ops-agent/install-agent-vm-creation
                            </a>
                        </div>
                        <div className="ref-card">
                            <div className="ref-cat">Fleet Mgmt</div>
                            <div className="ref-title">Manage the Ops Agent via VM Extension Manager</div>
                            <a
                                className="ref-url"
                                href="https://docs.cloud.google.com/monitoring/agent/ops-agent/agent-vmem-policies"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                docs.cloud.google.com/monitoring/agent/ops-agent/agent-vmem-policies
                            </a>
                        </div>
                    </div>

                    <h3 className="subhead">Cloud Run functions / Eventarc</h3>
                    <div className="ref-grid">
                        <div className="ref-card">
                            <div className="ref-cat">Concept</div>
                            <div className="ref-title">
                                Cloud Run function triggers（トリガー種別の全体像）
                            </div>
                            <a
                                className="ref-url"
                                href="https://docs.cloud.google.com/run/docs/function-triggers"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                docs.cloud.google.com/run/docs/function-triggers
                            </a>
                        </div>
                        <div className="ref-card">
                            <div className="ref-cat">Tutorial</div>
                            <div className="ref-title">
                                Trigger functions from Cloud Storage using Eventarc
                            </div>
                            <a
                                className="ref-url"
                                href="https://docs.cloud.google.com/run/docs/tutorials/trigger-functions-storage"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                docs.cloud.google.com/run/docs/tutorials/trigger-functions-storage
                            </a>
                        </div>
                        <div className="ref-card">
                            <div className="ref-cat">Tutorial</div>
                            <div className="ref-title">Trigger functions from Pub/Sub using Eventarc</div>
                            <a
                                className="ref-url"
                                href="https://docs.cloud.google.com/run/docs/tutorials/pubsub-eventdriven"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                docs.cloud.google.com/run/docs/tutorials/pubsub-eventdriven
                            </a>
                        </div>
                        <div className="ref-card">
                            <div className="ref-cat">Tutorial</div>
                            <div className="ref-title">
                                Use Eventarc to receive events from Cloud Storage
                            </div>
                            <a
                                className="ref-url"
                                href="https://docs.cloud.google.com/run/docs/tutorials/eventarc"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                docs.cloud.google.com/run/docs/tutorials/eventarc
                            </a>
                        </div>
                        <div className="ref-card">
                            <div className="ref-cat">How-to</div>
                            <div className="ref-title">Create triggers from Cloud Storage events</div>
                            <a
                                className="ref-url"
                                href="https://docs.cloud.google.com/run/docs/triggering/storage-triggers"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                docs.cloud.google.com/run/docs/triggering/storage-triggers
                            </a>
                        </div>
                    </div>

                    <h3 className="subhead">Pub/Sub</h3>
                    <div className="ref-grid">
                        <div className="ref-card">
                            <div className="ref-cat">Concept</div>
                            <div className="ref-title">
                                Overview of the Pub/Sub service（基本コンセプト）
                            </div>
                            <a
                                className="ref-url"
                                href="https://docs.cloud.google.com/pubsub/docs/pubsub-basics"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                docs.cloud.google.com/pubsub/docs/pubsub-basics
                            </a>
                        </div>
                        <div className="ref-card">
                            <div className="ref-cat">Concept</div>
                            <div className="ref-title">What is Pub/Sub?（ユースケースと設計思想）</div>
                            <a
                                className="ref-url"
                                href="https://docs.cloud.google.com/pubsub/docs/overview"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                docs.cloud.google.com/pubsub/docs/overview
                            </a>
                        </div>
                        <div className="ref-card">
                            <div className="ref-cat">Best Practices</div>
                            <div className="ref-title">Best practices to publish to a Pub/Sub topic</div>
                            <a
                                className="ref-url"
                                href="https://docs.cloud.google.com/pubsub/docs/publish-best-practices"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                docs.cloud.google.com/pubsub/docs/publish-best-practices
                            </a>
                        </div>
                        <div className="ref-card">
                            <div className="ref-cat">Best Practices</div>
                            <div className="ref-title">Best practices to subscribe to a Pub/Sub topic</div>
                            <a
                                className="ref-url"
                                href="https://docs.cloud.google.com/pubsub/docs/subscribe-best-practices"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                docs.cloud.google.com/pubsub/docs/subscribe-best-practices
                            </a>
                        </div>
                        <div className="ref-card">
                            <div className="ref-cat">Reliability</div>
                            <div className="ref-title">Pub/Sub: Introduction to reliability</div>
                            <a
                                className="ref-url"
                                href="https://docs.cloud.google.com/pubsub/docs/reliability-intro"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                docs.cloud.google.com/pubsub/docs/reliability-intro
                            </a>
                        </div>
                        <div className="ref-card">
                            <div className="ref-cat">How-to</div>
                            <div className="ref-title">Publish messages to topics</div>
                            <a
                                className="ref-url"
                                href="https://docs.cloud.google.com/pubsub/docs/publisher"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                docs.cloud.google.com/pubsub/docs/publisher
                            </a>
                        </div>
                    </div>

                    <h3 className="subhead">Challenge Lab（GSP315）関連の実装参考</h3>
                    <div className="ref-grid">
                        <div className="ref-card">
                            <div className="ref-cat">Codelab</div>
                            <div className="ref-title">
                                Triggering Event Processing from Cloud Storage using
                                Eventarc（類似構成）
                            </div>
                            <a
                                className="ref-url"
                                href="https://codelabs.developers.google.com/triggering-cloud-functions-from-cloud-storage"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                codelabs.developers.google.com/triggering-cloud-functions-from-cloud-storage
                            </a>
                        </div>
                        <div className="ref-card">
                            <div className="ref-cat">Codelab</div>
                            <div className="ref-title">
                                Getting Started with Event-driven Cloud Run functions
                            </div>
                            <a
                                className="ref-url"
                                href="https://codelabs.developers.google.com/codelabs/getting-started-cloud-run-functions-event-driven"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                codelabs.developers.google.com/codelabs/getting-started-cloud-run-functions-event-driven
                            </a>
                        </div>
                    </div>
                </section>
            </div>

            <footer>
                このガイドの使い方 —
                各章末の公式ドキュメントURLは、ラボの手順だけでは触れられていない「なぜ」の部分を裏付ける一次情報源です。実際にプロジェクトへ適用する際は、必ず最新のドキュメントを確認し、ラボの簡易設定（基本ロールの多用、
                <code>allUsers</code>
                への公開など）をそのまま本番環境に持ち込まないよう注意してください。<br /><br />
                Generated 2026-07-01 · Google Cloud App Dev Environment Guide
            </footer>
        </div>
    );
}
