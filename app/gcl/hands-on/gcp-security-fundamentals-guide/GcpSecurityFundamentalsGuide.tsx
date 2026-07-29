'use client';

import React from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS } from './constants';
import { NavBar } from './NavBar';

function Diagram({ id, label }: { id: keyof typeof DIAGRAMS; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="diagram-wrap">
            <div className="mermaid">
                <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale />
            </div>
            <div className="diagram-caption">{label}</div>
        </div>
    );
}

export function GcpSecurityFundamentalsGuide() {
    return (
        <div className="gcp-security-page">
            <NavBar />
            <header className="hero">
                <div className="eyebrow">Google Cloud Skill Boost 準拠教材</div>
                <h1>Google Cloud セキュリティ基礎<br />完全ガイド</h1>
                <p className="sub">
                    IAM / カスタムロール / サービスアカウント / VPC Peering / IAP / Cloud KMS / Private GKE
                </p>
                <p style={{ maxWidth: '680px', color: 'var(--text-muted)', fontSize: '15px' }}>
                    Google Cloud を触り始めたばかりのエンジニア向けに、7つのハンズオンラボを「なぜその設定が必要なのか」という視点で再構成しました。
                    全体を貫くのは <b style={{ color: 'var(--text)' }}>最小権限の原則(Principle of Least Privilege)</b> ただ一つです。
                </p>
                <div className="hero-meta">
                    <div className="card">
                        <div className="label">対象読者</div>
                        <div className="value">Google Cloud を触り始めたエンジニア</div>
                    </div>
                    <div className="card">
                        <div className="label">前提知識</div>
                        <div className="value">コンソール基本操作・gcloud の雛形が読める程度</div>
                    </div>
                    <div className="card">
                        <div className="label">到達目標</div>
                        <div className="value">IAM・ネットワーク・暗号化を横断した安全設計ができる</div>
                    </div>
                </div>
            </header>

            <div className="wrap">
                <section style={{ marginTop: '10px' }}>
                    <h3 className="section-h">0. この教材の全体像</h3>
                    <p>
                        このガイドは、Google Cloud の「Implement Cloud Security Fundamentals」系スキルバッジで扱う7つのハンズオンラボを、単なる手順書ではなく<b>「なぜその設定が必要なのか」</b>という観点で再構成したものです。全体を貫く思想はただ一つ、<b>最小権限の原則</b>です。各章はこの原則を異なるレイヤー(誰が/何に対して/どの経路で)に適用したものだと考えると、バラバラに見える7つのラボが1本の線でつながります。
                    </p>

                    <Diagram id="diag-0" label="Fig.0 — 3レイヤーで見る最小権限の原則の適用範囲" />

                    <div className="callout tip">
                        <span className="tag">Reading Tip</span>
                        <p>
                            各章の冒頭に「到達目標レベル」を記載しています。K1=記憶している、K2=理由を説明できる、K3=自分の要件に合わせて設計できる、という3段階です。
                        </p>
                    </div>

                    <h3 className="section-h">目次</h3>
                    <div className="toc-grid">
                        <a className="toc-card" href="#ch1">
                            <div className="n">CHAPTER 01</div>
                            <div className="t">IAM基礎 — 誰が・何に・何をできるか</div>
                        </a>
                        <a className="toc-card" href="#ch2">
                            <div className="n">CHAPTER 02</div>
                            <div className="t">IAMカスタムロール — 権限を自分でデザインする</div>
                        </a>
                        <a className="toc-card" href="#ch3">
                            <div className="n">CHAPTER 03</div>
                            <div className="t">サービスアカウント — 人間ではないIDの管理</div>
                        </a>
                        <a className="toc-card" href="#ch4">
                            <div className="n">CHAPTER 04</div>
                            <div className="t">VPC Network Peering — プロジェクトをまたぐ内部通信</div>
                        </a>
                        <a className="toc-card" href="#ch5">
                            <div className="n">CHAPTER 05</div>
                            <div className="t">Identity-Aware Proxy — アプリ層のゼロトラスト</div>
                        </a>
                        <a className="toc-card" href="#ch6">
                            <div className="n">CHAPTER 06</div>
                            <div className="t">Cloud KMS — 鍵管理と暗号化</div>
                        </a>
                        <a className="toc-card" href="#ch7">
                            <div className="n">CHAPTER 07</div>
                            <div className="t">Private GKE クラスタ — ネットワーク隔離</div>
                        </a>
                        <a className="toc-card" href="#ch8">
                            <div className="n">CHAPTER 08</div>
                            <div className="t">総合演習 — 全レイヤーの統合設計</div>
                        </a>
                        <a className="toc-card" href="#refs">
                            <div className="n">APPENDIX</div>
                            <div className="t">参考文献 / 公式ドキュメント</div>
                        </a>
                    </div>
                </section>

                {/* ================= CHAPTER 1 ================= */}
                <section className="chapter" id="ch1">
                    <div className="chapter-head">
                        <span className="chapter-num">01</span>
                        <h2>IAM基礎 — 誰が・何に・何をできるか</h2>
                    </div>
                    <span className="k-badge">到達目標レベル: K1 記憶 → K2 理解</span>
                    <p className="chapter-lead">
                        Cloud IAMの根本設計と、なぜ基本ロールを避けるべきかを理解する。
                    </p>

                    <div className="callout def">
                        <span className="tag">Definition</span>
                        <p>
                            Cloud IAM(Identity and Access Management)は、Google Cloud上のあらゆる操作に対して「誰が(Principal)」「何に(Resource)」「何を(Role = 権限の集合)」できるかを一元管理する仕組みです。ユーザーに直接パーミッションを渡すのではなく、<b>ロールという権限の束を経由して</b>付与する設計になっている点が最大の特徴です。
                        </p>
                    </div>

                    <div className="callout why">
                        <span className="tag">なぜこの設計なのか</span>
                        <p>
                            もしパーミッションを1つずつユーザーへ割り当てる方式だったら、数百人の組織では「誰が何をできるか」を追跡することが事実上不可能になります。ロールという中間層を挟むことで、職務ベースでロールをグループに割り当てられる、新機能追加時にGoogle側が事前定義ロールを自動更新してくれる、監査時に1箇所を確認すればよい、といったメリットが生まれます。
                        </p>
                    </div>

                    <h3 className="section-h">基本ロール(Primitive Roles)の一覧</h3>
                    <p>
                        IAM導入以前から存在する4つの基本ロールは、今でもラボでよく登場します。実務では基本的に<b>使用を避けるべき</b>ロールですが、仕組みを理解するために整理します。
                    </p>
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">ロール名</th>
                                    <th scope="col">ロールID</th>
                                    <th scope="col">できること</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ブラウザ</td>
                                    <td><code>roles/browser</code></td>
                                    <td>フォルダ・組織階層の閲覧のみ。プロジェクト内のリソース自体は見えない</td>
                                </tr>
                                <tr>
                                    <td>閲覧者 (Viewer)</td>
                                    <td><code>roles/viewer</code></td>
                                    <td>状態を変更しない読み取り専用操作(既存リソースの閲覧)</td>
                                </tr>
                                <tr>
                                    <td>編集者 (Editor)</td>
                                    <td><code>roles/editor</code></td>
                                    <td>Viewerの全権限 + リソースの作成・変更・削除</td>
                                </tr>
                                <tr>
                                    <td>オーナー (Owner)</td>
                                    <td><code>roles/owner</code></td>
                                    <td>Editorの全権限 + 権限管理(IAMポリシー変更)+ 課金設定</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="callout warn">
                        <span className="tag">なぜOwner/Editor/Viewerを避けるべきか</span>
                        <p>
                            これらは数千もの権限をサービス横断でまとめて付与してしまいます。「Cloud Storageのファイルを見せたいだけ」の相手にViewerを渡すと、BigQueryやCompute Engineの情報まで見えてしまいます。本番環境では事前定義ロール(例: <code>roles/storage.objectViewer</code>)またはカスタムロールを使うのが定石です。
                        </p>
                    </div>

                    <h3 className="section-h">権限が伝播する仕組み</h3>
                    <p>
                        IAMのポリシーはリソース階層(組織 → フォルダ → プロジェクト → 個々のリソース)に沿って<b>継承</b>されます。上位で付与したロールは下位のすべての子リソースに効きます。
                    </p>

                    <Diagram id="diag-1" label="Fig.1 — IAMポリシーのリソース階層継承" />

                    <h3 className="section-h">ハンズオンで確認する2つの挙動</h3>
                    <p>
                        ラボでは2つのユーザー(Owner権限のUser1、Viewer権限のUser2)を使って以下を体験します。
                    </p>
                    <ol className="step-list">
                        <li>
                            <b>Viewerロールを持つユーザーはIAMページの「アクセス権を付与」ボタン自体が押せない</b> — <code>resourcemanager.projects.setIamPolicy</code> 権限がないため。権限管理を行うにはOwnerまたはそれに準ずるIAM関連ロールが必要。
                        </li>
                        <li>
                            <b>プロジェクトロールを剥奪しても、リソース個別のロールが残っていればアクセスは可能</b> — プロジェクトのViewerロールを削除しても、Cloud Storageバケットに個別に <code>roles/storage.objectViewer</code> を付与しておけば、そのバケットだけは引き続き閲覧できます。
                        </li>
                    </ol>

                    <Diagram id="diag-2" label="Fig.2 — プロジェクト権限とリソース個別権限は独立して機能する" />

                    <h3 className="section-h">ベストプラクティス</h3>
                    <div className="compare-grid">
                        <div className="compare-col good">
                            <h4>✅ 推奨</h4>
                            <ul>
                                <li>事前定義ロール(例: <code>roles/storage.objectViewer</code>)を使う</li>
                                <li>必要な範囲(バケット単位・データセット単位)にロールを絞る</li>
                                <li>権限変更後は反映まで最大80秒程度かかることを見込んで検証する</li>
                                <li>定期的にIAMポリシーの棚卸しを行う</li>
                            </ul>
                        </div>
                        <div className="compare-col bad">
                            <h4>❌ 避けるべき</h4>
                            <ul>
                                <li>基本ロール(Owner/Editor/Viewer)を安易に付与する</li>
                                <li>プロジェクト全体にまとめてロールを付与する</li>
                                <li>変更直後にエラーだと即座に「壊れた」と判断する</li>
                                <li>一度付与した権限を放置する</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ================= CHAPTER 2 ================= */}
                <section className="chapter" id="ch2">
                    <div className="chapter-head">
                        <span className="chapter-num">02</span>
                        <h2>IAMカスタムロール — 権限を自分でデザインする</h2>
                    </div>
                    <span className="k-badge">到達目標レベル: K2 理解 → K3 適用</span>
                    <p className="chapter-lead">
                        権限の命名規則を理解し、自分で最小限のロールを設計・運用できるようになる。
                    </p>

                    <div className="callout def">
                        <span className="tag">Definition</span>
                        <p>
                            カスタムロールとは、Google が用意した事前定義ロールでは粒度が合わない場合に、<b>自分で権限(Permission)を1つずつ選んで束ねて作るロール</b>です。組織レベルまたはプロジェクトレベルで作成でき、Googleによる自動更新の対象にはなりません(自分でメンテナンスする必要があります)。
                        </p>
                    </div>

                    <h3 className="section-h">権限の命名規則を理解する</h3>
                    <p>
                        Cloud IAMの権限はすべて <code>&lt;サービス&gt;.&lt;リソース&gt;.&lt;動詞&gt;</code> という統一フォーマットに従います。多くの場合、1つの権限が1つのREST APIメソッドに対応しています。
                    </p>
                    <div className="code-block">
                        <span className="lang">permission format</span>
                        <pre>
                            <div className="code-line"><span className="cm"># compute.instances.list   → Compute Engine の instances リソースを一覧表示できる</span></div>
                            <div className="code-line"><span className="cm"># compute.instances.stop   → Compute Engine の instances リソースを停止できる</span></div>
                            <div className="code-line"><span className="cm"># storage.buckets.get      → Cloud Storage の bucket 情報を取得できる</span></div>
                            <div className="code-line"><span className="cm"># pubsub.topics.publish    → Pub/Sub の topic にメッセージを発行できる</span></div>
                        </pre>
                    </div>

                    <h3 className="section-h">事前定義ロール vs カスタムロールの比較</h3>
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">観点</th>
                                    <th scope="col">事前定義ロール</th>
                                    <th scope="col">カスタムロール</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>管理主体</td>
                                    <td>Google</td>
                                    <td>自分(プロジェクト/組織の管理者)</td>
                                </tr>
                                <tr>
                                    <td>新機能追加時の更新</td>
                                    <td>自動</td>
                                    <td>手動でメンテナンスが必要</td>
                                </tr>
                                <tr>
                                    <td>粒度</td>
                                    <td>サービス単位で比較的大きい</td>
                                    <td>権限を1つずつ自由に選択できる</td>
                                </tr>
                                <tr>
                                    <td>付与できる階層</td>
                                    <td>全階層</td>
                                    <td>組織レベル or プロジェクトレベル(フォルダ不可)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="callout warn">
                        <span className="tag">プロジェクトレベルの制約</span>
                        <p>
                            プロジェクトレベルのカスタムロールには、組織やフォルダでしか意味を持たない権限を含めることはできません。IAMの権限は階層を下方向にしか継承されないためです。
                        </p>
                    </div>

                    <h3 className="section-h">カスタムロールを作る2つの方法</h3>
                    <p><b>方法A: YAMLファイルによる定義</b></p>
                    <div className="code-block">
                        <span className="lang">yaml</span>
                        <pre>
                            <div className="code-line">title: &quot;Role Editor&quot;</div>
                            <div className="code-line">description: &quot;App Versionsへの編集アクセス&quot;</div>
                            <div className="code-line">stage: &quot;ALPHA&quot;</div>
                            <div className="code-line">includedPermissions:</div>
                            <div className="code-line">- appengine.versions.create</div>
                            <div className="code-line">- appengine.versions.delete</div>
                        </pre>
                    </div>
                    <div className="code-block">
                        <span className="lang">bash</span>
                        <pre>
                            <div className="code-line">gcloud iam roles create editor \</div>
                            <div className="code-line">  --project $DEVSHELL_PROJECT_ID \</div>
                            <div className="code-line">  --file role-definition.yaml</div>
                        </pre>
                    </div>

                    <p><b>方法B: フラグによる直接指定</b></p>
                    <div className="code-block">
                        <span className="lang">bash</span>
                        <pre>
                            <div className="code-line">gcloud iam roles create viewer \</div>
                            <div className="code-line">  --project $DEVSHELL_PROJECT_ID \</div>
                            <div className="code-line">  --title &quot;Role Viewer&quot; \</div>
                            <div className="code-line">  --description &quot;カスタムロールの説明&quot; \</div>
                            <div className="code-line">  --permissions compute.instances.get,compute.instances.list \</div>
                            <div className="code-line">  --stage ALPHA</div>
                        </pre>
                    </div>

                    <h3 className="section-h">etag による楽観的ロック</h3>
                    <p>
                        複数の管理者が同時にロールを更新しようとすると、片方の変更が意図せず上書きされる恐れがあります。Cloud IAMはこれを防ぐために <code>etag</code> というバージョン識別子を使います。
                    </p>

                    <Diagram id="diag-3" label="Fig.3 — etag による Read-Modify-Write の競合防止" />

                    <h3 className="section-h">カスタムロールのライフサイクル</h3>
                    <Diagram id="diag-4" label="Fig.4 — カスタムロールのライフサイクル(作成〜完全消滅)" />

                    <div className="callout warn">
                        <span className="tag">無効化と削除の違い</span>
                        <p>
                            <code>DISABLED</code> にしても既存のポリシーバインディングは残ったまま(効果が無くなるだけ)です。誤って権限が広がりすぎたロールを一時停止したい場合は、削除より先に無効化を検討すると安全です。
                        </p>
                    </div>

                    <h3 className="section-h">ベストプラクティス</h3>
                    <div className="compare-grid">
                        <div className="compare-col good">
                            <h4>✅ 推奨</h4>
                            <ul>
                                <li>「本当に必要な権限」だけをリストアップしてから作成する</li>
                                <li>更新前に必ず <code>describe</code> して最新のetagを確認する</li>
                                <li>説明文に「どの事前定義ロールを参考にしたか」を書いておく</li>
                                <li>廃止時は <code>DEPRECATED</code> にして移行先を案内する</li>
                            </ul>
                        </div>
                        <div className="compare-col bad">
                            <h4>❌ 避けるべき</h4>
                            <ul>
                                <li>とりあえず広めの権限を付与して後で絞ろうとする</li>
                                <li>ローカルにキャッシュした古い定義を使い回して更新する</li>
                                <li>説明が空欄のまま放置する</li>
                                <li>突然削除して依存しているユーザーを詰まらせる</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ================= CHAPTER 3 ================= */}
                <section className="chapter" id="ch3">
                    <div className="chapter-head">
                        <span className="chapter-num">03</span>
                        <h2>サービスアカウント — 人間ではないIDの管理</h2>
                    </div>
                    <span className="k-badge">到達目標レベル: K2 理解 → K3 適用</span>
                    <p className="chapter-lead">
                        「ID」と「リソース」という2つの立場でサービスアカウントを扱えるようになる。
                    </p>

                    <div className="callout def">
                        <span className="tag">Definition</span>
                        <p>
                            サービスアカウントとは、人間ではなく<b>アプリケーションやVMのためのGoogleアカウント</b>です。APIを呼び出す際、エンドユーザーを介さずに「アプリそのもの」として認証・認可を行うために使われます。一意なメールアドレス形式の識別子を持ちます。
                        </p>
                    </div>

                    <div className="callout why">
                        <span className="tag">なぜ人間のアカウントを使い回してはいけないのか</span>
                        <p>
                            個人アカウントの認証情報をVMやバッチ処理が使っていると、退職・異動で処理が止まる、個人アカウントの過剰な権限がそのままアプリに渡る、監査ログで「誰が」「何の目的で」実行したのかが曖昧になる、といった問題が生まれます。サービスアカウントを使うことでアプリの識別・権限・監査を人間のライフサイクルと分離できます。
                        </p>
                    </div>

                    <h3 className="section-h">サービスアカウントの種類</h3>
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">種類</th>
                                    <th scope="col">例</th>
                                    <th scope="col">説明</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Compute Engine デフォルトSA</td>
                                    <td><code>PROJECT_NUMBER-compute@developer.gserviceaccount.com</code></td>
                                    <td>Compute Engine APIを有効化すると自動作成</td>
                                </tr>
                                <tr>
                                    <td>App Engine デフォルトSA</td>
                                    <td><code>PROJECT_ID@appspot.gserviceaccount.com</code></td>
                                    <td>App Engineアプリを含むプロジェクトに自動作成</td>
                                </tr>
                                <tr>
                                    <td>ユーザー管理SA</td>
                                    <td><code>任意の名前@PROJECT_ID.iam.gserviceaccount.com</code></td>
                                    <td>開発者が明示的に作成</td>
                                </tr>
                                <tr>
                                    <td>Google管理SA(サービスエージェント)</td>
                                    <td><code>PROJECT_NUMBER@cloudservices.gserviceaccount.com</code></td>
                                    <td>Google内部処理用。デフォルトでEditorロールを持つため変更・削除は非推奨</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="section-h">「ID」としての利用と「リソース」としての利用</h3>
                    <p>
                        サービスアカウントは<b>2つの立場</b>で登場する点が初学者にとって混乱しやすいポイントです。
                    </p>

                    <Diagram id="diag-5" label="Fig.5 — サービスアカウントの2つの立場" />

                    <p>
                        この2つを分けて設計することで、「VMを起動できる人」と「VMが実際に持つ権限」を独立してコントロールできます。
                    </p>

                    <h3 className="section-h">実例: BigQueryにアクセスするサービスアカウント</h3>
                    <ol className="step-list">
                        <li><code>bigquery-qwiklab</code> という名前でサービスアカウントを作成</li>
                        <li>このサービスアカウントに、必要な <code>BigQuery Data Viewer</code> と <code>BigQuery User</code> の IAM ロールを付与</li>
                        <li>Compute Engine インスタンスの ID として、この専用サービスアカウントをアタッチ</li>
                        <li>VM の OAuth アクセススコープは、サービスアカウントとは別に <code>cloud-platform</code> を設定（実際の許可範囲は IAM ロールで制限）</li>
                        <li>VM内のPythonコードは Application Default Credentials で認証情報を取得し、ユーザー介在なしにBigQueryへクエリを実行する</li>
                    </ol>

                    <Diagram id="diag-6" label="Fig.6 — サービスアカウント経由のBigQueryアクセス" />

                    <h3 className="section-h">ベストプラクティス</h3>
                    <div className="compare-grid">
                        <div className="compare-col good">
                            <h4>✅ 推奨</h4>
                            <ul>
                                <li>ワークロードごとに専用のサービスアカウントを作成する</li>
                                <li>SAには必要最小限のロールだけを付与する</li>
                                <li>90日以上認証実績がないSAは無効化・削除を検討する</li>
                                <li>誰がそのSAを「使える」か明示的に管理する</li>
                            </ul>
                        </div>
                        <div className="compare-col bad">
                            <h4>❌ 避けるべき</h4>
                            <ul>
                                <li>すべてのVM/アプリでデフォルトSA(強い権限)を使い回す</li>
                                <li>とりあえずEditorやOwnerを付与する</li>
                                <li>使われなくなったSAを放置する</li>
                                <li>SAの鍵をローカルにダウンロードして共有する</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ================= CHAPTER 4 ================= */}
                <section className="chapter" id="ch4">
                    <div className="chapter-head">
                        <span className="chapter-num">04</span>
                        <h2>VPC Network Peering — プロジェクトをまたぐ内部通信</h2>
                    </div>
                    <span className="k-badge">到達目標レベル: K2 理解 → K3 適用</span>
                    <p className="chapter-lead">
                        双方向合意という設計思想を理解し、疎通確認までを組み立てられるようになる。
                    </p>

                    <div className="callout def">
                        <span className="tag">Definition</span>
                        <p>
                            VPC Network Peeringは、2つのVPCネットワーク(同一プロジェクト内・別プロジェクト・別組織のいずれでも可)を、<b>内部IPアドレスだけで直接接続する</b>仕組みです。ゲートウェイやVPN機器を経由せず、まるで同じネットワーク内にいるかのように通信できます。
                        </p>
                    </div>

                    <h3 className="section-h">なぜVPNや外部IPより優れているのか</h3>
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">観点</th>
                                    <th scope="col">外部IP経由の通信</th>
                                    <th scope="col">VPN</th>
                                    <th scope="col">VPC Peering</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>レイテンシ</td>
                                    <td>高い(インターネット経由)</td>
                                    <td>中程度(暗号化オーバーヘッド)</td>
                                    <td>低い(同一ネットワーク内相当)</td>
                                </tr>
                                <tr>
                                    <td>セキュリティ</td>
                                    <td>サービスがインターネットに露出</td>
                                    <td>内部化されるが構成が複雑</td>
                                    <td>内部化され露出面がない</td>
                                </tr>
                                <tr>
                                    <td>コスト</td>
                                    <td>通常の帯域課金</td>
                                    <td>トンネル維持コストが発生</td>
                                    <td>内部IP通信のため有利</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="section-h">双方向の設定が必要という重要な特性</h3>
                    <p>
                        VPC Peeringで最もつまずきやすいポイントは、<b>片側だけの設定では有効化されない</b>ことです。
                    </p>

                    <Diagram id="diag-7" label="Fig.7 — VPC Peeringの双方向合意モデル" />

                    <div className="callout why">
                        <span className="tag">なぜこの設計なのか</span>
                        <p>
                            ピア接続の作成は、相手のVPCに対するIAMロールを一切付与しません。つまり「あなたのネットワークに繋ぎたい」という一方的な申請にすぎず、相手側の管理者が同意(自分の側にも同じ接続を作成)することで初めて成立します。他人のネットワークに勝手に接続できてしまう事態を防ぐための安全設計です。
                        </p>
                    </div>

                    <h3 className="section-h">疎通確認までの流れ</h3>
                    <ol className="step-list">
                        <li><code>project-A</code> に <code>network-a</code>(サブネット <code>10.0.0.0/16</code>)を作成し、VM <code>vm-a</code> を配置</li>
                        <li><code>project-B</code> に <code>network-b</code>(サブネット <code>10.8.0.0/16</code>)を作成し、VM <code>vm-b</code> を配置</li>
                        <li>SSH/ICMPを許可するファイアウォールルールをそれぞれ作成</li>
                        <li>双方向のピア接続(<code>peer-ab</code> / <code>peer-ba</code>)を作成し <code>ACTIVE</code> になったことを確認</li>
                        <li><code>vm-b</code> から <code>vm-a</code> の内部IPへ <code>ping</code> を実行し、パケットロス0%であることを確認</li>
                    </ol>

                    <div className="code-block">
                        <span className="lang">bash</span>
                        <pre>
                            <div className="code-line"><span className="cm"># project-A側</span></div>
                            <div className="code-line">gcloud compute networks subnets create network-a-subnet --network network-a \</div>
                            <div className="code-line">    --range 10.0.0.0/16 --region &quot;REGION_1&quot;</div>
                            <div className="code-line"></div>
                            <div className="code-line"><span className="cm"># project-B側</span></div>
                            <div className="code-line">gcloud compute networks subnets create network-b-subnet --network network-b \</div>
                            <div className="code-line">    --range 10.8.0.0/16 --region &quot;REGION_2&quot;</div>
                        </pre>
                    </div>

                    <div className="callout warn">
                        <span className="tag">サブネットのIP範囲重複に注意</span>
                        <p>
                            ピア接続先とサブネットの範囲が重複していると、ピアリング自体が失敗します。設計段階でIPアドレス計画を必ず立てましょう。
                        </p>
                    </div>

                    <h3 className="section-h">ベストプラクティス</h3>
                    <div className="compare-grid">
                        <div className="compare-col good">
                            <h4>✅ 推奨</h4>
                            <ul>
                                <li>ピアリング前にIPアドレス範囲の重複がないか確認する</li>
                                <li>両側で名前(peer-ab / peer-ba)を対応付けて管理する</li>
                                <li>必要な通信だけをファイアウォールルールで許可する</li>
                                <li>重要サービスの接続には consensus モードを検討する</li>
                            </ul>
                        </div>
                        <div className="compare-col bad">
                            <h4>❌ 避けるべき</h4>
                            <ul>
                                <li>とりあえずデフォルトのCIDRで作成して後から気づく</li>
                                <li>名前をランダムにして後から追跡できなくする</li>
                                <li>ピアリング=無制限アクセスだと誤解して全許可にする</li>
                                <li>誰でも片側から一方的に削除できる状態を放置する</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ================= CHAPTER 5 ================= */}
                <section className="chapter" id="ch5">
                    <div className="chapter-head">
                        <span className="chapter-num">05</span>
                        <h2>Identity-Aware Proxy (IAP) — アプリ層のゼロトラスト</h2>
                    </div>
                    <span className="k-badge">到達目標レベル: K2 理解 → K3 適用</span>
                    <p className="chapter-lead">
                        ヘッダーなりすましのリスクとJWT暗号検証の重要性を理解する。
                    </p>

                    <div className="callout def">
                        <span className="tag">Definition</span>
                        <p>
                            IAP(Identity-Aware Proxy)は、HTTPSでアクセスするアプリケーションの手前に立ち、<b>ネットワークレベルのファイアウォールではなく、アプリケーションレベルの認証・認可</b>でアクセス制御を行うGoogle Cloudのサービスです。VPNを使わずにゼロトラストアクセスを実現します。
                        </p>
                    </div>

                    <div className="callout why">
                        <span className="tag">なぜVPNではなくIAPなのか</span>
                        <p>
                            従来型のVPNは「一度ネットワークに入れば内部は信頼される」という前提に立っています。しかしVPN経由で侵入されると内部のあらゆるリソースへ横展開されるリスクを抱えています。IAPは<b>リクエストごと・ユーザーごとに認証と認可を行う</b>ため、境界ではなくID(誰がアクセスしているか)を信頼の基準にします。
                        </p>
                    </div>

                    <h3 className="section-h">認証・認可・ヘッダー伝播の流れ</h3>
                    <Diagram id="diag-8" label="Fig.8 — IAPによる認証・認可フロー" />

                    <div className="code-block">
                        <span className="lang">python</span>
                        <pre>
                            <div className="code-line">user_email = request.headers.get(&apos;X-Goog-Authenticated-User-Email&apos;)</div>
                            <div className="code-line">user_id = request.headers.get(&apos;X-Goog-Authenticated-User-ID&apos;)</div>
                        </pre>
                    </div>

                    <h3 className="section-h">「なりすまし」の危険性とJWT暗号検証</h3>
                    <p>
                        ここが本チャプターの一番重要なポイントです。<b>IAPが無効化・バイパスされた場合、アプリはそれを検知できません。</b>
                        IAPがオフの状態で同じヘッダー名を偽装したリクエストを送ると、アプリはそれを正規のIAP経由のリクエストだと誤認してしまいます。
                    </p>

                    <Diagram id="diag-9" label="Fig.9 — ヘッダー信頼とJWT検証の安全性比較" />

                    <p>
                        対策として <code>X-Goog-IAP-JWT-Assertion</code> ヘッダーに含まれる<b>暗号署名付きのアサーション</b>をアプリ側で検証する方法があります。この署名はGoogleの秘密鍵でしか生成できないため、IAPを経由していないリクエストは検証に失敗します。
                    </p>

                    <div className="code-block">
                        <span className="lang">python</span>
                        <pre>
                            <div className="code-line">from google.auth.transport.requests import Request</div>
                            <div className="code-line">from google.oauth2 import id_token</div>
                            <div className="code-line"></div>
                            <div className="code-line">IAP_PUBLIC_KEY_URL = &apos;https://www.gstatic.com/iap/verify/public_key&apos;</div>
                            <div className="code-line">IAP_ISSUER = &apos;https://cloud.google.com/iap&apos;</div>
                            <div className="code-line"></div>
                            <div className="code-line">def user():</div>
                            <div className="code-line">    assertion = request.headers.get(&apos;X-Goog-IAP-JWT-Assertion&apos;)</div>
                            <div className="code-line">    if assertion is None:</div>
                            <div className="code-line">        return None, None</div>
                            <div className="code-line">    info = id_token.verify_token(</div>
                            <div className="code-line">        assertion,</div>
                            <div className="code-line">        Request(),</div>
                            <div className="code-line">        audience=expected_audience,</div>
                            <div className="code-line">        certs_url=IAP_PUBLIC_KEY_URL,</div>
                            <div className="code-line">    )</div>
                            <div className="code-line">    if info.get(&apos;iss&apos;) != IAP_ISSUER:</div>
                            <div className="code-line">        raise ValueError(&apos;Invalid IAP JWT issuer&apos;)</div>
                            <div className="code-line">    return info[&apos;email&apos;], info[&apos;sub&apos;]</div>
                        </pre>
                    </div>

                    <h3 className="section-h">素のヘッダー参照 vs JWT暗号検証の比較</h3>
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">観点</th>
                                    <th scope="col">ヘッダーをそのまま参照</th>
                                    <th scope="col">JWTを暗号検証</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>実装の手間</td>
                                    <td>低い(ヘッダーを読むだけ)</td>
                                    <td>やや高い(公開鍵取得・署名検証が必要)</td>
                                </tr>
                                <tr>
                                    <td>IAPがオフ/迂回された場合</td>
                                    <td>❌ 偽装ヘッダーをそのまま信用</td>
                                    <td>✅ 署名検証に失敗し検知できる</td>
                                </tr>
                                <tr>
                                    <td>推奨される用途</td>
                                    <td>リスクの低い社内ツール試作段階</td>
                                    <td>機密性の高い本番アプリケーション</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="section-h">ベストプラクティス</h3>
                    <div className="compare-grid">
                        <div className="compare-col good">
                            <h4>✅ 推奨</h4>
                            <ul>
                                <li>機密性の高いアプリではJWTアサーションを検証する</li>
                                <li>IAP有効化配下のバックエンドも直接アクセス経路を遮断する</li>
                                <li><code>IAP-secured Web App User</code> は必要な範囲だけに絞る</li>
                                <li>Cloud Runは <code>run.app</code> 直接URLを無効化しLB経由を強制する</li>
                            </ul>
                        </div>
                        <div className="compare-col bad">
                            <h4>❌ 避けるべき</h4>
                            <ul>
                                <li>ヘッダーの値を無条件に信頼する</li>
                                <li>IAP設定後もバックエンドへの直接アクセス経路を放置する</li>
                                <li>組織全体に大盤振る舞いする</li>
                                <li>デフォルトURLが誰でも叩ける状態を放置する</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ================= CHAPTER 6 ================= */}
                <section className="chapter" id="ch6">
                    <div className="chapter-head">
                        <span className="chapter-num">06</span>
                        <h2>Cloud KMS — 鍵管理と暗号化</h2>
                    </div>
                    <span className="k-badge">到達目標レベル: K2 理解 → K3 適用</span>
                    <p className="chapter-lead">鍵の管理者と利用者を分離する設計思想を理解する。</p>

                    <div className="callout def">
                        <span className="tag">Definition</span>
                        <p>
                            Cloud KMS(Key Management Service)は、Google Cloud上のサービスや自作アプリケーションで使う<b>暗号鍵をクラウド上で一元的に生成・管理・利用するサービス</b>です。KeyRing(鍵のグループ)とCryptoKey(実際の鍵)という2階層のリソースモデルを持ちます。
                        </p>
                    </div>

                    <h3 className="section-h">リソース階層</h3>
                    <Diagram id="diag-10" label="Fig.10 — KeyRing / CryptoKey / Key Version の階層構造" />

                    <p>
                        <b>KeyRing</b> は特定のロケーションに鍵をグループ化する入れ物。環境別(test/staging/prod)やデータの機密度別に分けるのが一般的で、<b>一度作成すると削除できません</b>(コストは発生しません)。<b>CryptoKey</b> は実際に暗号化/復号に使われる鍵で、複数の <b>Key Version</b> を持ち、ローテーションのたびに新バージョンが追加されます。
                    </p>

                    <h3 className="section-h">暗号化・復号のワークフロー</h3>
                    <Diagram id="diag-11" label="Fig.11 — 暗号化・復号ワークフロー" />

                    <div className="code-block">
                        <span className="lang">bash</span>
                        <pre>
                            <div className="code-line"><span className="cm"># 平文をbase64エンコード</span></div>
                            <div className="code-line">PLAINTEXT=$(cat 1.txt | base64 -w0)</div>
                            <div className="code-line"></div>
                            <div className="code-line"><span className="cm"># encryptエンドポイントを呼び出し、結果からciphertextだけ抽出</span></div>
                            <div className="code-line">curl -v &quot;https://cloudkms.googleapis.com/v1/projects/$DEVSHELL_PROJECT_ID/locations/global/keyRings/$KEYRING_NAME/cryptoKeys/$CRYPTOKEY_NAME:encrypt&quot; \</div>
                            <div className="code-line">{`  -d "{\\"plaintext\\":\\"$PLAINTEXT\\"}" \\`}</div>
                            <div className="code-line">  -H &quot;Authorization:Bearer $(gcloud auth application-default print-access-token)&quot; \</div>
                            <div className="code-line">  -H &quot;Content-Type:application/json&quot; \</div>
                            <div className="code-line">| jq .ciphertext -r &gt; 1.encrypted</div>
                        </pre>
                    </div>

                    <div className="callout tip">
                        <span className="tag">重要な性質</span>
                        <p>
                            Cloud KMSは確率的暗号化を採用しているため、<b>同じ平文を同じ鍵で2回暗号化しても異なる暗号文になります</b>。暗号文からパターンを推測されるリスクを下げるための仕様です。
                        </p>
                    </div>

                    <h3 className="section-h">権限分離: 「鍵の管理」と「鍵の使用」は別の権限</h3>
                    <p>
                        KMSを理解する上で最も重要な設計思想が、<b>鍵の管理者(admin)と鍵の利用者(encrypter/decrypter)を役割として分離できる</b>ことです。
                    </p>

                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">ロール</th>
                                    <th scope="col">権限ID</th>
                                    <th scope="col">できること</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Cloud KMS 管理者</td>
                                    <td><code>roles/cloudkms.admin</code></td>
                                    <td>KeyRingの作成、CryptoKeyの作成・無効化・破棄などの管理操作</td>
                                </tr>
                                <tr>
                                    <td>暗号化・復号 実行者</td>
                                    <td><code>roles/cloudkms.cryptoKeyEncrypterDecrypter</code></td>
                                    <td><code>encrypt</code>/<code>decrypt</code> APIのみ呼び出せる(鍵そのものの管理は不可)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <Diagram id="diag-12" label="Fig.12 — 鍵の管理権限と実行権限の分離" />

                    <div className="code-block">
                        <span className="lang">bash</span>
                        <pre>
                            <div className="code-line"><span className="cm"># 鍵管理権限を付与</span></div>
                            <div className="code-line">gcloud kms keyrings add-iam-policy-binding $KEYRING_NAME \</div>
                            <div className="code-line">    --location global --member user:$USER_EMAIL \</div>
                            <div className="code-line">    --role roles/cloudkms.admin</div>
                            <div className="code-line"></div>
                            <div className="code-line"><span className="cm"># 暗号化/復号の実行権限を別途付与</span></div>
                            <div className="code-line">gcloud kms keyrings add-iam-policy-binding $KEYRING_NAME \</div>
                            <div className="code-line">    --location global --member user:$USER_EMAIL \</div>
                            <div className="code-line">    --role roles/cloudkms.cryptoKeyEncrypterDecrypter</div>
                        </pre>
                    </div>

                    <h3 className="section-h">鍵のライフサイクルと監査</h3>
                    <ul style={{ color: 'var(--text)', paddingLeft: '20px' }}>
                        <li>KeyRing は<b>削除不可</b>です。CryptoKey は配下の全キーバージョンを削除した後に、キーバージョンは <code>DESTROYED</code>、<code>IMPORT_FAILED</code>、<code>GENERATION_FAILED</code> のいずれかの状態で、必要な権限を持つ場合に削除できます。通常の無効化は「キーバージョンの破棄(destroy)」で行います。</li>
                        <li>鍵のローテーションは<b>既存の暗号化データを自動で再暗号化しません</b>。鍵の漏洩が疑われる場合は、データの再暗号化・IAMアクセスの取り消し・キーバージョンの破棄をセットで行う必要があります。</li>
                        <li>Cloud Audit Logs(Admin Activity / Data Access)で「誰が・いつ・どの鍵に対して何をしたか」を追跡できます。</li>
                    </ul>

                    <h3 className="section-h">ベストプラクティス</h3>
                    <div className="compare-grid">
                        <div className="compare-col good">
                            <h4>✅ 推奨</h4>
                            <ul>
                                <li>鍵の管理権限とアプリの暗号化実行権限を別ロールで分離する</li>
                                <li>環境やデータの機密度別にKeyRingを分ける</li>
                                <li>鍵侵害の疑いがあればアクセス取消+再暗号化+鍵破棄をセットで行う</li>
                                <li>Cloud Audit Logsで鍵の利用状況を定期的に確認する</li>
                            </ul>
                        </div>
                        <div className="compare-col bad">
                            <h4>❌ 避けるべき</h4>
                            <ul>
                                <li>同じSAに管理権限と実行権限の両方を渡す</li>
                                <li>全環境の鍵を1つのKeyRingに雑多にまとめる</li>
                                <li>ローテーションだけすれば安全だと誤解する</li>
                                <li>監査ログを見ずに「設定したから安全」で放置する</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ================= CHAPTER 7 ================= */}
                <section className="chapter" id="ch7">
                    <div className="chapter-head">
                        <span className="chapter-num">07</span>
                        <h2>Private GKE クラスタ — Kubernetesのネットワーク隔離</h2>
                    </div>
                    <span className="k-badge">到達目標レベル: K2 理解 → K3 適用</span>
                    <p className="chapter-lead">
                        露出面を段階的に絞り込むという考え方でクラスタネットワークを設計できるようになる。
                    </p>

                    <div className="callout def">
                        <span className="tag">Definition</span>
                        <p>
                            Private GKEクラスタとは、<b>コントロールプレーン(マスター)をパブリックインターネットから到達不可能にした</b>GKEクラスタです。ノードにはプライベートIPアドレスのみが割り当てられ、ノードとコントロールプレーン間の通信はVPC Peeringを通じて行われます。
                        </p>
                    </div>

                    <div className="callout why">
                        <span className="tag">なぜノードに外部IPを持たせないのか</span>
                        <p>
                            通常のKubernetesクラスタでは、ノードが外部IPを持つとインターネットから直接ノードのポートへアクセスされるリスクが生まれます。プライベートノードにすることで<b>攻撃対象領域(Attack Surface)をVPC内部に限定</b>できます。
                        </p>
                    </div>

                    <Diagram id="diag-13" label="Fig.13 — Private GKEクラスタのネットワーク構成" />

                    <h3 className="section-h">Master Authorized Networks(承認済みネットワーク)</h3>
                    <p>
                        プライベートクラスタでも、管理者はどこかからkubectlでクラスタを操作する必要があります。そこで使うのが<b>Master Authorized Networks</b>で、「このCIDR範囲からのみコントロールプレーンへのアクセスを許可する」という許可リストです。
                    </p>

                    <div className="code-block">
                        <span className="lang">bash</span>
                        <pre>
                            <div className="code-line">gcloud container clusters create private-cluster \</div>
                            <div className="code-line">    --enable-private-nodes \</div>
                            <div className="code-line">    --master-ipv4-cidr 172.16.0.16/28 \</div>
                            <div className="code-line">    --enable-ip-alias \</div>
                            <div className="code-line">    --create-subnetwork &quot;&quot; \</div>
                            <div className="code-line">    --machine-type e2-medium</div>
                            <div className="code-line"></div>
                            <div className="code-line"><span className="cm"># 特定の外部IP(例: 自分のVMのNAT IP)だけを許可</span></div>
                            <div className="code-line">gcloud container clusters update private-cluster \</div>
                            <div className="code-line">    --enable-master-authorized-networks \</div>
                            <div className="code-line">    --master-authorized-networks &lt;MY_EXTERNAL_RANGE&gt;/32</div>
                        </pre>
                    </div>

                    <h3 className="section-h">パブリックエンドポイントを完全に無効化する</h3>
                    <p>
                        さらにセキュリティレベルを上げたい場合、コントロールプレーンの<b>パブリックエンドポイント自体を無効化(<code>--enable-private-endpoint</code>)</b>できます。この設定を行うと、VPC外部からは一切コントロールプレーンに到達できなくなり、同じVPC内の踏み台ホスト(bastion/jumphost)経由でのみ操作可能になります。
                    </p>

                    <Diagram id="diag-14" label="Fig.14 — パブリックエンドポイント無効化の効果" />

                    <div className="callout warn">
                        <span className="tag">--internal-ip フラグを忘れずに</span>
                        <p>
                            パブリックエンドポイントを無効化したクラスタでは、<code>gcloud container clusters get-credentials</code> の際に <code>--internal-ip</code> を付けないと、存在しないパブリックIPへ接続しようとして失敗します。
                        </p>
                    </div>

                    <h3 className="section-h">カスタムサブネットとセカンダリレンジ</h3>
                    <div className="code-block">
                        <span className="lang">bash</span>
                        <pre>
                            <div className="code-line">gcloud compute networks subnets create my-subnet \</div>
                            <div className="code-line">    --network default \</div>
                            <div className="code-line">    --range 10.0.4.0/22 \</div>
                            <div className="code-line">    --enable-private-ip-google-access \</div>
                            <div className="code-line">    --region=$REGION \</div>
                            <div className="code-line">    --secondary-range my-svc-range=10.0.32.0/20,my-pod-range=10.4.0.0/14</div>
                        </pre>
                    </div>
                    <p>
                        <code>--enable-private-ip-google-access</code> を有効にすることで、外部IPを持たないノードでもGoogle API群に到達できるようになります。
                    </p>

                    <h3 className="section-h">ベストプラクティス</h3>
                    <div className="compare-grid">
                        <div className="compare-col good">
                            <h4>✅ 推奨</h4>
                            <ul>
                                <li>本番クラスタは <code>--enable-private-nodes</code> を基本設定にする</li>
                                <li>機密性の高いワークロードは <code>--enable-private-endpoint</code> も検討する</li>
                                <li>Master Authorized Networksは <code>/32</code> など狭い範囲で許可する</li>
                                <li>IPアドレス計画を事前に立て他のVPC/オンプレと重複させない</li>
                            </ul>
                        </div>
                        <div className="compare-col bad">
                            <h4>❌ 避けるべき</h4>
                            <ul>
                                <li>ノードに外部IPを持たせたまま本番運用する</li>
                                <li>パブリックエンドポイントを無条件に許可し続ける</li>
                                <li><code>0.0.0.0/0</code> のような広すぎる範囲を許可する</li>
                                <li>セカンダリレンジを行き当たりばったりで割り当てる</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ================= CHAPTER 8 ================= */}
                <section className="chapter" id="ch8">
                    <div className="chapter-head">
                        <span className="chapter-num">08</span>
                        <h2>総合演習 — 全レイヤーを統合したセキュアなクラスタ設計</h2>
                    </div>
                    <span className="k-badge">到達目標レベル: K3 適用</span>
                    <p className="chapter-lead">
                        7つの要素を統合し、実際のチャレンジラボ形式の設計課題を解けるようになる。
                    </p>

                    <p>
                        ここまでの7つの要素(IAM基礎/カスタムロール/サービスアカウント/VPC Peering/IAP/KMS/Private GKE)を統合すると、実際の「チャレンジラボ」で問われるような設計課題を解けるようになります。題材は、架空の企業「Jooli Inc.」のOrcaチームが、開発チーム向けに安全なGKEクラスタを構築するというシナリオです。
                    </p>

                    <h3 className="section-h">要件の整理</h3>
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">要件</th>
                                    <th scope="col">対応するChapter</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>クラスタは専用の最小権限サービスアカウントを使う</td>
                                    <td>Chapter 3(サービスアカウント)</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Storage操作用にカスタムロールを作成し、SAへバインドする</td>
                                    <td>Chapter 2(カスタムロール)</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Privateクラスタとし、パブリックエンドポイントも無効化する</td>
                                    <td>Chapter 7(Private GKE)</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Master Authorized Networksに管理用jumphostのIPだけを登録する</td>
                                    <td>Chapter 7(Private GKE)</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>クラスタは指定のカスタムサブネットに配置する</td>
                                    <td>Chapter 7 / VPC設計</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>jumphostからkubectlでの疎通を確認する</td>
                                    <td>Chapter 4 + Chapter 7</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="section-h">統合アーキテクチャ図</h3>
                    <Diagram id="diag-15" label="Fig.15 — IAM・ネットワーク・クラスタを統合したセキュア設計" />

                    <h3 className="section-h">手順の骨格(gcloudコマンド抜粋)</h3>
                    <div className="code-block">
                        <span className="lang">bash</span>
                        <pre>
                            <div className="code-line"><span className="cm"># 1. カスタムロールの作成(Storage操作に限定)</span></div>
                            <div className="code-line">gcloud iam roles create orca_custom_role \</div>
                            <div className="code-line">    --project $DEVSHELL_PROJECT_ID \</div>
                            <div className="code-line">    --title &quot;Custom Security Role&quot; \</div>
                            <div className="code-line">    --permissions storage.buckets.get,storage.objects.get,storage.objects.list,storage.objects.update,storage.objects.create</div>
                            <div className="code-line"></div>
                            <div className="code-line"><span className="cm"># 2. 専用サービスアカウントの作成</span></div>
                            <div className="code-line">gcloud iam service-accounts create orca-sa --display-name &quot;orca-cluster-sa&quot;</div>
                            <div className="code-line"></div>
                            <div className="code-line"><span className="cm"># 3. 組込みロール + カスタムロールをバインド(例)</span></div>
                            <div className="code-line">gcloud projects add-iam-policy-binding $DEVSHELL_PROJECT_ID \</div>
                            <div className="code-line">    --member=&quot;serviceAccount:orca-sa@$DEVSHELL_PROJECT_ID.iam.gserviceaccount.com&quot; \</div>
                            <div className="code-line">    --role=&quot;roles/monitoring.viewer&quot;</div>
                            <div className="code-line"></div>
                            <div className="code-line"><span className="cm"># 4. Privateクラスタの作成(パブリックエンドポイントも無効化)</span></div>
                            <div className="code-line">gcloud container clusters create orca-cluster-name \</div>
                            <div className="code-line">    --service-account=orca-sa@$DEVSHELL_PROJECT_ID.iam.gserviceaccount.com \</div>
                            <div className="code-line">    --subnetwork=orca-build-subnet \</div>
                            <div className="code-line">    --enable-private-nodes \</div>
                            <div className="code-line">    --enable-private-endpoint \</div>
                            <div className="code-line">    --enable-master-authorized-networks \</div>
                            <div className="code-line">    --enable-ip-alias \</div>
                            <div className="code-line">    --zone=ZONE</div>
                            <div className="code-line"></div>
                            <div className="code-line"><span className="cm"># 5. jumphostの内部IPをMaster Authorized Networksに追加</span></div>
                            <div className="code-line">gcloud container clusters update orca-cluster-name \</div>
                            <div className="code-line">    --enable-master-authorized-networks \</div>
                            <div className="code-line">    --master-authorized-networks=&lt;JUMPHOST_INTERNAL_IP&gt;/32 \</div>
                            <div className="code-line">    --zone=ZONE</div>
                            <div className="code-line"></div>
                            <div className="code-line"><span className="cm"># 6. jumphostから internal-ip 経由で認証情報を取得</span></div>
                            <div className="code-line">gcloud container clusters get-credentials orca-cluster-name \</div>
                            <div className="code-line">    --internal-ip --zone=ZONE --project=$DEVSHELL_PROJECT_ID</div>
                            <div className="code-line"></div>
                            <div className="code-line"><span className="cm"># 7. 疎通テスト用の簡易アプリをデプロイ</span></div>
                            <div className="code-line">kubectl create deployment hello-server --image=gcr.io/google-samples/hello-app:1.0</div>
                        </pre>
                    </div>

                    <h3 className="section-h">このシナリオが示す設計原則</h3>
                    <div className="hero-meta" style={{ marginTop: '20px' }}>
                        <div className="card">
                            <div className="label">Principle 01</div>
                            <div className="value">権限は役割ごとに最小の粒度で分離する</div>
                        </div>
                        <div className="card">
                            <div className="label">Principle 02</div>
                            <div className="value">ネットワークの露出面を段階的に絞り込む</div>
                        </div>
                        <div className="card">
                            <div className="label">Principle 03</div>
                            <div className="value">管理経路自体も専用の踏み台に限定する</div>
                        </div>
                        <div className="card">
                            <div className="label">Principle 04</div>
                            <div className="value">すべての操作をCloud Audit Logsで追跡可能にする</div>
                        </div>
                    </div>
                    <p style={{ marginTop: '16px' }}>
                        この4つはそれぞれ Chapter 1〜3(IAM)、Chapter 4〜5(ネットワーク露出)、Chapter 7(クラスタ隔離)で学んだ内容の応用そのものです。
                    </p>
                </section>

                {/* ================= SUMMARY ================= */}
                <section className="chapter">
                    <div className="chapter-head">
                        <span className="chapter-num">＋</span>
                        <h2>ベストプラクティス総まとめ表</h2>
                    </div>
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">レイヤー</th>
                                    <th scope="col">原則</th>
                                    <th scope="col">具体的な実践</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>IAM全般</td>
                                    <td>最小権限の原則</td>
                                    <td>基本ロールを避け、事前定義ロール/カスタムロールで必要な権限だけを付与する</td>
                                </tr>
                                <tr>
                                    <td>カスタムロール</td>
                                    <td>変更管理の徹底</td>
                                    <td>etagで競合を防ぎ、廃止時はDEPRECATEDで移行猶予を設ける</td>
                                </tr>
                                <tr>
                                    <td>サービスアカウント</td>
                                    <td>ID/リソースの分離設計</td>
                                    <td>ワークロードごとに専用SAを作り「誰が使えるか」と「何ができるか」を別々に管理する</td>
                                </tr>
                                <tr>
                                    <td>VPC Peering</td>
                                    <td>双方向合意の原則</td>
                                    <td>両側が明示的に接続を作成した場合のみ有効化される設計を活用し、IP設計を事前に行う</td>
                                </tr>
                                <tr>
                                    <td>IAP</td>
                                    <td>ゼロトラスト</td>
                                    <td>ネットワーク境界ではなくIDを信頼の基準にし、機密データはJWT署名検証まで行う</td>
                                </tr>
                                <tr>
                                    <td>Cloud KMS</td>
                                    <td>権限分離</td>
                                    <td>鍵の管理者と利用者のロールを分け、侵害時は「取り消し+再暗号化+鍵破棄」をセットで行う</td>
                                </tr>
                                <tr>
                                    <td>Private GKE</td>
                                    <td>露出面の最小化</td>
                                    <td>ノードのプライベート化、パブリックエンドポイント無効化、承認済みネットワークの<code>/32</code>運用を組み合わせる</td>
                                </tr>
                                <tr>
                                    <td>全体</td>
                                    <td>監査可能性</td>
                                    <td>Cloud Audit Logsで「誰が・いつ・何を」変更したかを常に追跡できる状態を保つ</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* ================= REFERENCES ================= */}
                <section className="chapter" id="refs">
                    <div className="chapter-head">
                        <span className="chapter-num">📚</span>
                        <h2>参考文献 / 公式ドキュメント一覧</h2>
                    </div>
                    <p className="chapter-lead">
                        各章の内容の根拠となる Google Cloud 公式ドキュメントです（検索により最新性を確認済み）。
                    </p>

                    <div className="refs-group">
                        <div className="refs-group-label">IAM基礎・カスタムロール・サービスアカウント</div>
                        <ul className="refs-list">
                            <li className="ref-item">
                                <span className="ref-title">IAM Overview</span>
                                <a className="ref-link" href="https://cloud.google.com/iam/docs/overview" target="_blank" rel="noopener noreferrer">
                                    cloud.google.com/iam/docs/overview
                                </a>
                            </li>
                            <li className="ref-item">
                                <span className="ref-title">Roles and Permissions</span>
                                <a className="ref-link" href="https://cloud.google.com/iam/docs/roles-overview" target="_blank" rel="noopener noreferrer">
                                    cloud.google.com/iam/docs/roles-overview
                                </a>
                            </li>
                            <li className="ref-item">
                                <span className="ref-title">Create and Manage Custom Roles</span>
                                <a className="ref-link" href="https://cloud.google.com/iam/docs/creating-custom-roles" target="_blank" rel="noopener noreferrer">
                                    cloud.google.com/iam/docs/creating-custom-roles
                                </a>
                            </li>
                            <li className="ref-item">
                                <span className="ref-title">Service Accounts Overview</span>
                                <a className="ref-link" href="https://cloud.google.com/iam/docs/service-account-overview" target="_blank" rel="noopener noreferrer">
                                    cloud.google.com/iam/docs/service-account-overview
                                </a>
                            </li>
                            <li className="ref-item">
                                <span className="ref-title">Access Control for Org (etag)</span>
                                <a className="ref-link" href="https://cloud.google.com/resource-manager/docs/access-control-org" target="_blank" rel="noopener noreferrer">
                                    cloud.google.com/resource-manager/docs/access-control-org
                                </a>
                            </li>
                            <li className="ref-item">
                                <span className="ref-title">gcloud iam roles リファレンス</span>
                                <a className="ref-link" href="https://cloud.google.com/sdk/gcloud/reference/iam/roles" target="_blank" rel="noopener noreferrer">
                                    cloud.google.com/sdk/gcloud/reference/iam/roles
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="refs-group">
                        <div className="refs-group-label">VPC Network Peering</div>
                        <ul className="refs-list">
                            <li className="ref-item">
                                <span className="ref-title">VPC Network Peering 概要</span>
                                <a className="ref-link" href="https://cloud.google.com/vpc/docs/vpc-peering" target="_blank" rel="noopener noreferrer">
                                    cloud.google.com/vpc/docs/vpc-peering
                                </a>
                            </li>
                            <li className="ref-item">
                                <span className="ref-title">Set Up and Manage VPC Peering</span>
                                <a className="ref-link" href="https://cloud.google.com/vpc/docs/using-vpc-peering" target="_blank" rel="noopener noreferrer">
                                    cloud.google.com/vpc/docs/using-vpc-peering
                                </a>
                            </li>
                            <li className="ref-item">
                                <span className="ref-title">About Peering Connections</span>
                                <a className="ref-link" href="https://cloud.google.com/vpc/docs/about-peering-connections" target="_blank" rel="noopener noreferrer">
                                    cloud.google.com/vpc/docs/about-peering-connections
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="refs-group">
                        <div className="refs-group-label">Identity-Aware Proxy (IAP)</div>
                        <ul className="refs-list">
                            <li className="ref-item">
                                <span className="ref-title">IAP Overview（概念）</span>
                                <a className="ref-link" href="https://cloud.google.com/iap/docs/concepts-overview" target="_blank" rel="noopener noreferrer">
                                    cloud.google.com/iap/docs/concepts-overview
                                </a>
                            </li>
                            <li className="ref-item">
                                <span className="ref-title">Using IAP for TCP Forwarding</span>
                                <a className="ref-link" href="https://cloud.google.com/iap/docs/using-tcp-forwarding" target="_blank" rel="noopener noreferrer">
                                    cloud.google.com/iap/docs/using-tcp-forwarding
                                </a>
                            </li>
                            <li className="ref-item">
                                <span className="ref-title">IAP Concepts 一覧</span>
                                <a className="ref-link" href="https://cloud.google.com/iap/docs/concepts" target="_blank" rel="noopener noreferrer">
                                    cloud.google.com/iap/docs/concepts
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="refs-group">
                        <div className="refs-group-label">Cloud KMS</div>
                        <ul className="refs-list">
                            <li className="ref-item">
                                <span className="ref-title">Cloud KMS Overview</span>
                                <a className="ref-link" href="https://cloud.google.com/kms/docs/key-management-service" target="_blank" rel="noopener noreferrer">
                                    cloud.google.com/kms/docs/key-management-service
                                </a>
                            </li>
                            <li className="ref-item">
                                <span className="ref-title">Cloud KMS Resources</span>
                                <a className="ref-link" href="https://cloud.google.com/kms/docs/resource-hierarchy" target="_blank" rel="noopener noreferrer">
                                    cloud.google.com/kms/docs/resource-hierarchy
                                </a>
                            </li>
                            <li className="ref-item">
                                <span className="ref-title">Cloud KMS FAQ</span>
                                <a className="ref-link" href="https://cloud.google.com/kms/docs/faq" target="_blank" rel="noopener noreferrer">
                                    cloud.google.com/kms/docs/faq
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="refs-group">
                        <div className="refs-group-label">Private GKE クラスタ</div>
                        <ul className="refs-list">
                            <li className="ref-item">
                                <span className="ref-title">GKE Networking Best Practices — Private Clusters</span>
                                <a className="ref-link" href="https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters" target="_blank" rel="noopener noreferrer">
                                    cloud.google.com/kubernetes-engine/docs/how-to/private-clusters
                                </a>
                            </li>
                            <li className="ref-item">
                                <span className="ref-title">Master Authorized Networks</span>
                                <a className="ref-link" href="https://cloud.google.com/kubernetes-engine/docs/how-to/authorized-networks" target="_blank" rel="noopener noreferrer">
                                    cloud.google.com/kubernetes-engine/docs/how-to/authorized-networks
                                </a>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
}
