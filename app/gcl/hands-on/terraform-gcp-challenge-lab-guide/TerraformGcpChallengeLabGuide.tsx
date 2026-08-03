'use client';

import React, { useState, useEffect } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS } from './constants';
import { NavBar } from './NavBar';
import './page.css';

/**
 * Terraform GCP チャレンジラボ解説ページの本文コンポーネント。
 *
 * IntersectionObserver で `main section[id]` を監視して現在表示中のセクションを追跡し、
 * その id を `activeId` として保持する。`activeId` は NavBar に渡され、
 * サイドバー目次のハイライト（scroll spy）を更新する。
 */
export function TerraformGcpChallengeLabGuide() {
    const [activeId, setActiveId] = useState<string>('sec1');

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        const sectionElements = document.querySelectorAll<HTMLElement>('.terraform-lab-guide-page main section[id]');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-20% 0px -70% 0px' },
        );

        sectionElements.forEach((sec) => observer.observe(sec));

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div className="terraform-lab-guide-page">
            <div className="layout">
                <NavBar activeId={activeId} />

                <main className="main">
                    <div className="hero">
                        <div className="hero-eyebrow">
                            <i className="ti ti-brand-terraform" aria-hidden="true" />
                            CHALLENGE LAB GUIDE
                        </div>
                        <h1>Terraform で構築する Google Cloud インフラ管理 完全攻略ガイド</h1>
                        <p style={{ margin: 0 }}>
                            Build Infrastructure with Terraform on Google Cloud — Challenge Lab を、初学者〜中級者向けにステップバイステップで解説する。各 Task の手順だけでなく、「なぜその設計にするのか」というベストプラクティスの根拠と、その一次情報源を併記する。
                        </p>
                        <div className="hero-meta">
                            <span>
                                <i className="ti ti-users" aria-hidden="true" />
                                対象読者: Terraform / Google Cloud 初学者〜中級者
                            </span>
                            <span>
                                <i className="ti ti-list-numbers" aria-hidden="true" />
                                全7 Task + 事前準備
                            </span>
                            <span>
                                <i className="ti ti-link" aria-hidden="true" />
                                各項目に公式ソースを明記
                            </span>
                        </div>
                    </div>

                    <section id="sec1">
                        <h2><span className="num">1</span>このラボで学ぶこと</h2>
                        <p>
                            この Challenge Lab は、以下 6 つの Terraform の中核スキルを、実際に手を動かしながら習得することを目的としている。
                        </p>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">学習テーマ</th>
                                    <th scope="col">実務における重要性</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>1. モジュール設計（Modules）</strong></td>
                                    <td>再利用性と保守性を高め、単一ファイルへの密結合（monolithic config）を避ける</td>
                                </tr>
                                <tr>
                                    <td><strong>2. 既存リソースのインポート（Import）</strong></td>
                                    <td>手動作成された既存インフラを安全に Terraform 管理下に取り込む</td>
                                </tr>
                                <tr>
                                    <td><strong>3. リモートバックエンド（Remote Backend）</strong></td>
                                    <td>ステート（state）を GCS に集約し、複数人での安全な協調開発とロックを実現する</td>
                                </tr>
                                <tr>
                                    <td><strong>4. インフラの変更と追加（Update in-place）</strong></td>
                                    <td>ダウンタイムを最小限に抑えつつスペック変更や構成追加を行う</td>
                                </tr>
                                <tr>
                                    <td><strong>5. Registry モジュールの活用</strong></td>
                                    <td>Google 公式などの公開モジュールを利用し、車輪の再発明を防ぐ</td>
                                </tr>
                                <tr>
                                    <td><strong>6. ネットワーク &amp; セキュリティ制御</strong></td>
                                    <td>VPC・サブネット・ファイアウォールをコード化し、最小権限のアクセス制御を行う</td>
                                </tr>
                            </tbody>
                        </table>
                        <p>
                            Challenge Lab は手順書がなく、既存の知識を応用して自力でゴールにたどり着く形式のため、「なぜこの設計にするのか」という一段階深い理解が重要になる。このガイドでは単なる手順だけでなく、その根拠となる公式ドキュメントも併せて示す。
                        </p>
                    </section>

                    <section id="sec2">
                        <h2><span className="num">2</span>完成形のアーキテクチャ</h2>
                        <p>すべての Task を終えると、以下のような構成が出来上がる。</p>
                        <div className="mermaid-wrap">
                            <MermaidDiagram chart={DIAGRAMS.ARCHITECTURE} ariaLabel="完成形のアーキテクチャ構成図" preserveNaturalScale />
                        </div>
                        <p>
                            ポイントは、<strong>VM インフラ（instances / network / firewall）</strong>と<strong>Terraform の状態管理基盤（storage bucket）</strong>が、役割としては明確に分離されていることである。バケットはアプリケーションのインフラではなく、Terraform 自身の運用基盤（state 管理）のために存在する。
                        </p>
                    </section>

                    <section id="sec3">
                        <h2><span className="num">3</span>事前準備: Terraform CLI のインストール</h2>
                        <p>
                            Cloud Shell はデフォルトでは Terraform がプリインストールされておらず、また Cloud Shell の VM 自体は非アクティブ状態が一定時間続くと破棄される一時的な環境である。そのため、素朴に <code>apt install terraform</code> を実行しただけでは、セッションが切れた瞬間にインストールが失われてしまう。
                        </p>
                        <p>
                            永続的なカスタマイズを行うには、ホームディレクトリ（<code>$HOME</code>）配下に環境構築スクリプトを配置し、Cloud Shell 起動時に自動実行される仕組みを使う。
                        </p>
                        <div className="code-label">
                            <i className="ti ti-file-code" aria-hidden="true" />
                            ~/.customize_environment
                        </div>
                        <pre>
                            <code>
                                <div className="code-line"><span className="tok-comment">#!/bin/sh</span></div>
                                <div className="code-line"><span className="tok-comment"># HashiCorp GPG キーの追加とリポジトリの登録</span></div>
                                <div className="code-line"><span className="tok-command">sudo</span> apt-get update &amp;&amp; <span className="tok-command">sudo</span> apt-get install -y gnupg software-properties-common</div>
                                <div className="code-line"><span className="tok-command">wget</span> <span className="tok-flag">-O-</span> https://apt.releases.hashicorp.com/gpg | <span className="tok-command">gpg</span> <span className="tok-flag">--dearmor</span> | <span className="tok-command">sudo</span> tee /usr/share/keyrings/hashicorp-archive-keyring.gpg &gt; /dev/null</div>
                                <div className="code-line"><span className="tok-command">echo</span> <span className="tok-string">&quot;deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main&quot;</span> | <span className="tok-command">sudo</span> tee /etc/apt/sources.list.d/hashicorp.list</div>
                                <div className="code-line"><span className="tok-command">sudo</span> apt-get update &amp;&amp; <span className="tok-command">sudo</span> apt-get install -y terraform</div>
                            </code>
                        </pre>
                        <p>
                            このファイルに実行権限を付与（<code>chmod +x ~/.customize_environment</code>）しておくと、Cloud Shell VM の再作成時にも Terraform CLI が自動的に再インストールされる。
                        </p>
                        <p className="source-note">
                            <i className="ti ti-link" aria-hidden="true" /> 根拠: <a className="ext-link" href="https://cloud.google.com/shell/docs/configuring-cloud-shell" target="_blank" rel="noreferrer">cloud.google.com/shell/docs/configuring-cloud-shell</a>
                        </p>
                    </section>

                    <section id="sec4">
                        <h2><span className="num">4</span>Task 1: ディレクトリ構成とルート変数の設計</h2>
                        <h3><i className="ti ti-puzzle" aria-hidden="true" />なぜ module に分割するのか</h3>
                        <p>
                            Terraform でインフラをコード化する際、すべてのリソース（VM、Storage、VPC、Firewall）を単一の <code>main.tf</code> に詰め込むと、コードの見通しが悪くなり、変更時の影響範囲の特定が困難になる。モジュール化によって以下のメリットが得られる。
                        </p>
                        <ul>
                            <li><strong>再利用性（Reusability）</strong>: 同じ構成のコンポーネントを複数環境（dev/stg/prod）で再利用できる</li>
                            <li><strong>カプセル化（Encapsulation）</strong>: モジュール内部の実装詳細を隠蔽し、必要な入出力（variables / outputs）のみを露出する</li>
                            <li><strong>チーム開発への拡張性</strong>: モジュール単位でレビュー・バージョン管理がしやすくなる</li>
                        </ul>

                        <h3><i className="ti ti-sitemap" aria-hidden="true" />ディレクトリ構成</h3>
                        <div className="mermaid-wrap">
                            <MermaidDiagram chart={DIAGRAMS.DIRECTORY_STRUCTURE} ariaLabel="プロジェクトのディレクトリ構成図" preserveNaturalScale />
                        </div>
                        <pre>
                            <code>
                                <div className="code-line"><span className="tok-command">mkdir</span> <span className="tok-flag">-p</span> modules/instances modules/storage</div>
                                <div className="code-line"><span className="tok-command">touch</span> main.tf variables.tf</div>
                                <div className="code-line"><span className="tok-command">touch</span> modules/instances/&#123;instances.tf,outputs.tf,variables.tf&#125;</div>
                                <div className="code-line"><span className="tok-command">touch</span> modules/storage/&#123;storage.tf,outputs.tf,variables.tf&#125;</div>
                            </code>
                        </pre>

                        <h3><i className="ti ti-variable" aria-hidden="true" />variables.tf の実装（ルート・各モジュール共通）</h3>
                        <p>
                            各 <code>variables.tf</code>（ルート、instances、storage の3ファイルすべて）に、同じ3つの変数を定義する。
                        </p>
                        <pre>
                            <code>
                                <div className="code-line"><span className="tok-keyword">variable</span> <span className="tok-string">&quot;project_id&quot;</span> &#123;</div>
                                <div className="code-line">  <span className="tok-attr">description</span> = <span className="tok-string">&quot;The GCP project ID&quot;</span></div>
                                <div className="code-line">  <span className="tok-attr">type</span>        = string</div>
                                <div className="code-line">  <span className="tok-attr">default</span>     = <span className="tok-string">&quot;&lt;あなたのプロジェクト ID&gt;&quot;</span></div>
                                <div className="code-line">&#125;</div>
                                <div className="code-line"></div>
                                <div className="code-line"><span className="tok-keyword">variable</span> <span className="tok-string">&quot;region&quot;</span> &#123;</div>
                                <div className="code-line">  <span className="tok-attr">description</span> = <span className="tok-string">&quot;The GCP region&quot;</span></div>
                                <div className="code-line">  <span className="tok-attr">type</span>        = string</div>
                                <div className="code-line">  <span className="tok-attr">default</span>     = <span className="tok-string">&quot;&quot;</span></div>
                                <div className="code-line">&#125;</div>
                                <div className="code-line"></div>
                                <div className="code-line"><span className="tok-keyword">variable</span> <span className="tok-string">&quot;zone&quot;</span> &#123;</div>
                                <div className="code-line">  <span className="tok-attr">description</span> = <span className="tok-string">&quot;The GCP zone&quot;</span></div>
                                <div className="code-line">  <span className="tok-attr">type</span>        = string</div>
                                <div className="code-line">  <span className="tok-attr">default</span>     = <span className="tok-string">&quot;&lt;ラボ開始時に指定されたゾーン&gt;&quot;</span></div>
                                <div className="code-line">&#125;</div>
                            </code>
                        </pre>
                        <div className="callout">
                            <div className="callout-title"><i className="ti ti-checks" aria-hidden="true" />ベストプラクティス</div>
                            <p>
                                <code>default</code> に決め打ちの値を入れるのはアンチパターンとされることが多いが、Challenge Lab のような単一環境・単一目的の検証環境では、<code>terraform apply</code> のたびに <code>-var</code> を指定する手間を省くために default 値を設定するのが合理的である。本番運用では <code>terraform.tfvars</code> や <code>TF_VAR_*</code> 環境変数、あるいは CI/CD のシークレット管理と組み合わせるのがより安全である。
                            </p>
                        </div>

                        <h3><i className="ti ti-cloud" aria-hidden="true" />main.tf: Terraform block と Provider</h3>
                        <pre>
                            <code>
                                <div className="code-line"><span className="tok-keyword">terraform</span> &#123;</div>
                                <div className="code-line">  <span className="tok-keyword">required_providers</span> &#123;</div>
                                <div className="code-line">    <span className="tok-attr">google</span> = &#123;</div>
                                <div className="code-line">      <span className="tok-attr">source</span>  = <span className="tok-string">&quot;hashicorp/google&quot;</span></div>
                                <div className="code-line">      <span className="tok-attr">version</span> = <span className="tok-string">&quot;~&gt; 5.0&quot;</span></div>
                                <div className="code-line">    &#125;</div>
                                <div className="code-line">  &#125;</div>
                                <div className="code-line">&#125;</div>
                                <div className="code-line"></div>
                                <div className="code-line"><span className="tok-keyword">provider</span> <span className="tok-string">&quot;google&quot;</span> &#123;</div>
                                <div className="code-line">  <span className="tok-attr">project</span> = <span className="tok-variable">var.project_id</span></div>
                                <div className="code-line">  <span className="tok-attr">region</span>  = <span className="tok-variable">var.region</span></div>
                                <div className="code-line">  <span className="tok-attr">zone</span>    = <span className="tok-variable">var.zone</span></div>
                                <div className="code-line">&#125;</div>
                            </code>
                        </pre>
                        <p>
                            <code>provider &quot;google&quot;</code> ブロックに <code>zone</code> を明示的に含めることで、以降 <code>google_compute_instance</code> などのリソースでゾーンを省略した場合に、このデフォルトゾーンが自動的に使われるようになる。
                        </p>

                        <h3><i className="ti ti-refresh" aria-hidden="true" />初期化</h3>
                        <pre>
                            <code>
                                <div className="code-line"><span className="tok-command">terraform</span> init</div>
                            </code>
                        </pre>
                        <p>
                            <code>terraform init</code> は、(1) provider プラグインのダウンロード、(2) モジュールの解決、(3) backend の初期化、の3つを行うコマンドである。設定ファイルを変更するたび（特に module や provider を追加・変更した際）は再実行が必要になる。
                        </p>
                        <p className="source-note">
                            <i className="ti ti-link" aria-hidden="true" /> 根拠: <a className="ext-link" href="https://developer.hashicorp.com/terraform/language/modules" target="_blank" rel="noreferrer">developer.hashicorp.com/terraform/language/modules</a> ／ <a className="ext-link" href="https://developer.hashicorp.com/terraform/language/values/variables" target="_blank" rel="noreferrer">developer.hashicorp.com/terraform/language/values/variables</a>
                        </p>
                    </section>

                    <section id="sec5">
                        <h2><span className="num">5</span>Task 2: リソースのインポートと構成</h2>
                        <h3><i className="ti ti-info-circle" aria-hidden="true" />import の位置づけを正しく理解する</h3>
                        <p>
                            <code>terraform import</code> は、<strong>「すでに GCP 上に存在する手動作成リソースを、Terraform の管理下（state ファイル）に取り込む」</strong>ためのコマンドである。
                        </p>
                        <ul>
                            <li>インポート対象の実体リソース（Instance ID 等）を指定して実行する</li>
                            <li>実行しても HCL コード（<code>.tf</code> ファイル）は自動生成されない（※ Terraform 1.5+ の <code>import</code> ブロックを除く古典的 CLI import の場合）</li>
                            <li>そのため、先に <code>instances.tf</code> に受け皿となる <code>resource</code> ブロックを記述しておく必要がある</li>
                        </ul>

                        <h3><i className="ti ti-route" aria-hidden="true" />インポート手順のフロー</h3>
                        <div className="mermaid-wrap">
                            <MermaidDiagram chart={DIAGRAMS.IMPORT_FLOW} ariaLabel="リソースインポートの手順フロー図" preserveNaturalScale />
                        </div>

                        <h3><i className="ti ti-file-code" aria-hidden="true" />main.tf への module 参照追加</h3>
                        <pre>
                            <code>
                                <div className="code-line"><span className="tok-keyword">module</span> <span className="tok-string">&quot;instances&quot;</span> &#123;</div>
                                <div className="code-line">  <span className="tok-attr">source</span>     = <span className="tok-string">&quot;./modules/instances&quot;</span></div>
                                <div className="code-line">  <span className="tok-attr">project_id</span> = <span className="tok-variable">var.project_id</span></div>
                                <div className="code-line">  <span className="tok-attr">region</span>     = <span className="tok-variable">var.region</span></div>
                                <div className="code-line">  <span className="tok-attr">zone</span>       = <span className="tok-variable">var.zone</span></div>
                                <div className="code-line">&#125;</div>
                            </code>
                        </pre>
                        <p>module を追加・変更したら、必ず <code>terraform init</code> を再実行してモジュールを解決させる。</p>

                        <h3><i className="ti ti-server" aria-hidden="true" />instances.tf: 最小限の resource ブロック</h3>
                        <p>
                            ラボの指示どおり、以下の引数だけに絞って最小構成で書く。項目を絞る理由は、「import 後に state との差分を最小化し、意図しないリソースの再作成（recreate）を避けるため」である。特に <code>boot_disk.initialize_params.image</code> のようなイミュータブルな属性は、値が一致していないと <code>terraform apply</code> 時にリソースの作り直しが発生してしまう。
                        </p>
                        <pre>
                            <code>
                                <div className="code-line"><span className="tok-keyword">resource</span> <span className="tok-string">&quot;google_compute_instance&quot;</span> <span className="tok-string">&quot;tf-instance-1&quot;</span> &#123;</div>
                                <div className="code-line">  <span className="tok-attr">name</span>         = <span className="tok-string">&quot;tf-instance-1&quot;</span></div>
                                <div className="code-line">  <span className="tok-attr">machine_type</span> = <span className="tok-string">&quot;e2-medium&quot;</span></div>
                                <div className="code-line">  <span className="tok-attr">zone</span>         = <span className="tok-variable">var.zone</span></div>
                                <div className="code-line"></div>
                                <div className="code-line">  <span className="tok-keyword">boot_disk</span> &#123;</div>
                                <div className="code-line">    <span className="tok-keyword">initialize_params</span> &#123;</div>
                                <div className="code-line">      <span className="tok-attr">image</span> = <span className="tok-string">&quot;projects/debian-cloud/global/images/family/debian-12&quot;</span></div>
                                <div className="code-line">    &#125;</div>
                                <div className="code-line">  &#125;</div>
                                <div className="code-line"></div>
                                <div className="code-line">  <span className="tok-keyword">network_interface</span> &#123;</div>
                                <div className="code-line">    <span className="tok-attr">network</span> = <span className="tok-string">&quot;default&quot;</span></div>
                                <div className="code-line">    <span className="tok-keyword">access_config</span> &#123;&#125;</div>
                                <div className="code-line">  &#125;</div>
                                <div className="code-line"></div>
                                <div className="code-line">  <span className="tok-attr">metadata_startup_script</span> = &lt;&lt;-EOT</div>
                                <div className="code-line">        #!/bin/bash</div>
                                <div className="code-line">    EOT</div>
                                <div className="code-line"></div>
                                <div className="code-line">  <span className="tok-attr">allow_stopping_for_update</span> = <span className="tok-boolean">true</span></div>
                                <div className="code-line">&#125;</div>
                                <div className="code-line"></div>
                                <div className="code-line"><span className="tok-keyword">resource</span> <span className="tok-string">&quot;google_compute_instance&quot;</span> <span className="tok-string">&quot;tf-instance-2&quot;</span> &#123;</div>
                                <div className="code-line">  <span className="tok-attr">name</span>         = <span className="tok-string">&quot;tf-instance-2&quot;</span></div>
                                <div className="code-line">  <span className="tok-attr">machine_type</span> = <span className="tok-string">&quot;e2-medium&quot;</span></div>
                                <div className="code-line">  <span className="tok-attr">zone</span>         = <span className="tok-variable">var.zone</span></div>
                                <div className="code-line"></div>
                                <div className="code-line">  <span className="tok-keyword">boot_disk</span> &#123;</div>
                                <div className="code-line">    <span className="tok-keyword">initialize_params</span> &#123;</div>
                                <div className="code-line">      <span className="tok-attr">image</span> = <span className="tok-string">&quot;projects/debian-cloud/global/images/family/debian-12&quot;</span></div>
                                <div className="code-line">    &#125;</div>
                                <div className="code-line">  &#125;</div>
                                <div className="code-line"></div>
                                <div className="code-line">  <span className="tok-keyword">network_interface</span> &#123;</div>
                                <div className="code-line">    <span className="tok-attr">network</span> = <span className="tok-string">&quot;default&quot;</span></div>
                                <div className="code-line">    <span className="tok-keyword">access_config</span> &#123;&#125;</div>
                                <div className="code-line">  &#125;</div>
                                <div className="code-line"></div>
                                <div className="code-line">  <span className="tok-attr">metadata_startup_script</span> = &lt;&lt;-EOT</div>
                                <div className="code-line">        #!/bin/bash</div>
                                <div className="code-line">    EOT</div>
                                <div className="code-line"></div>
                                <div className="code-line">  <span className="tok-attr">allow_stopping_for_update</span> = <span className="tok-boolean">true</span></div>
                                <div className="code-line">&#125;</div>
                            </code>
                        </pre>
                        <div className="callout danger">
                            <div className="callout-title"><i className="ti ti-alert-triangle" aria-hidden="true" />重要</div>
                            <p>
                                <code>machine_type</code> と <code>boot_disk</code> の image は、Console 上で確認した実際の値に必ず置き換えること。値が実物と食い違っていると、import 自体は成功しても、その後の <code>apply</code> でインスタンスの再作成が走ってしまう危険がある。
                            </p>
                        </div>

                        <h3><i className="ti ti-terminal" aria-hidden="true" />import コマンドの実行</h3>
                        <p>
                            module 内の resource を import する場合、アドレスに <code>module.&lt;モジュール名&gt;.</code> の prefix を付ける。
                        </p>
                        <pre>
                            <code>
                                <div className="code-line"><span className="tok-command">terraform</span> import module.instances.google_compute_instance.tf-instance-1 &lt;PROJECT_ID&gt;/&lt;ZONE&gt;/tf-instance-1</div>
                                <div className="code-line"><span className="tok-command">terraform</span> import module.instances.google_compute_instance.tf-instance-2 &lt;PROJECT_ID&gt;/&lt;ZONE&gt;/tf-instance-2</div>
                            </code>
                        </pre>
                        <p>
                            <code>google_compute_instance</code> の import ID は <code>&#123;&#123;project&#125;&#125;/&#123;&#123;zone&#125;&#125;/&#123;&#123;name&#125;&#125;</code> の形式を取る。ID のフォーマットはリソースの種類ごとに異なるため、必ず provider ドキュメントで確認する習慣をつけること。
                        </p>

                        <h3><i className="ti ti-git-compare" aria-hidden="true" />plan → apply</h3>
                        <pre>
                            <code>
                                <div className="code-line"><span className="tok-command">terraform</span> plan</div>
                                <div className="code-line"><span className="tok-command">terraform</span> apply</div>
                            </code>
                        </pre>
                        <p>
                            ここで最小構成にしか記述していない属性（disk size や labels など）については、Terraform が「設定にない値」を検出し、in-place update（作り直しではない、その場での更新）が発生することがある。ラボの範囲ではこれは想定内の挙動だが、本番環境では<strong>import 前にすべての実属性を漏れなく記述し、<code>terraform plan</code> の差分がゼロ（no changes）になる状態を確認してから apply する</strong>のが正しい手順である。
                        </p>
                        <p className="source-note">
                            <i className="ti ti-link" aria-hidden="true" /> 根拠: <a className="ext-link" href="https://developer.hashicorp.com/terraform/cli/commands/import" target="_blank" rel="noreferrer">developer.hashicorp.com/terraform/cli/commands/import</a> ／ <a className="ext-link" href="https://developer.hashicorp.com/terraform/cli/import/usage" target="_blank" rel="noreferrer">developer.hashicorp.com/terraform/cli/import/usage</a>
                        </p>
                    </section>

                    <section id="sec6">
                        <h2><span className="num">6</span>Task 3: リモートバックエンド（Cloud Storage）への切り替え</h2>
                        <h3><i className="ti ti-help-circle" aria-hidden="true" />なぜ remote backend が必要なのか</h3>
                        <p>
                            デフォルトでは、Terraform の状態（state）はローカルの <code>terraform.tfstate</code> に保存される。しかしローカル管理には以下の危険がある。
                        </p>
                        <ul>
                            <li><strong>複数人での不整合（Race Condition）</strong>: 2人が同時に apply すると state が破損する</li>
                            <li><strong>機密情報の露出</strong>: パスワードや鍵がローカルファイルにプレーンテキストで残る</li>
                            <li><strong>紛失リスク</strong>: PC の故障や Cloud Shell の VM 破棄でインフラの管理手段を失う</li>
                        </ul>
                        <p>
                            これらを解決するため、遠隔のオブジェクトストレージ（GCS / S3）へ状態を保存し、同時にロック機構（State Locking）を有効にする。
                        </p>

                        <h3><i className="ti ti-bucket" aria-hidden="true" />バケットリソースの作成（storage module）</h3>
                        <div className="code-label">modules/storage/storage.tf</div>
                        <pre>
                            <code>
                                <div className="code-line"><span className="tok-keyword">resource</span> <span className="tok-string">&quot;google_storage_bucket&quot;</span> <span className="tok-string">&quot;default&quot;</span> &#123;</div>
                                <div className="code-line">  <span className="tok-attr">name</span>                        = <span className="tok-string">&quot;&lt;Bucket Name&gt;&quot;</span></div>
                                <div className="code-line">  <span className="tok-attr">location</span>                    = <span className="tok-string">&quot;US&quot;</span></div>
                                <div className="code-line">  <span className="tok-attr">force_destroy</span>               = <span className="tok-boolean">true</span>  <span className="tok-comment"># ラボ後片付け用。本番の state バケットでは false</span></div>
                                <div className="code-line">  <span className="tok-attr">uniform_bucket_level_access</span> = <span className="tok-boolean">true</span></div>
                                <div className="code-line"></div>
                                <div className="code-line">  <span className="tok-keyword">versioning</span> &#123;</div>
                                <div className="code-line">    <span className="tok-attr">enabled</span> = <span className="tok-boolean">true</span></div>
                                <div className="code-line">  &#125;</div>
                                <div className="code-line">&#125;</div>
                            </code>
                        </pre>
                        <div className="callout">
                            <div className="callout-title"><i className="ti ti-shield-lock" aria-hidden="true" />state バケットの保護設定</div>
                            <p>
                                <code>versioning</code> を有効にすると、<code>terraform.tfstate</code> が上書きされるたびに旧世代が保持される。apply の中断やオペミスで state が壊れた場合に、直前の世代へ巻き戻して復旧できるため、リモート state バケットでは<strong>事実上必須</strong>の設定である。
                            </p>
                            <p>
                                一方 <code>force_destroy = true</code> は「中にオブジェクトが残っていてもバケットごと削除する」という意味であり、state を丸ごと消し飛ばしかねない。<strong>ここではラボ環境の後片付けを容易にするために <code>true</code> にしているだけ</strong>で、実運用の state バケットでは <code>false</code>（さらに <code>lifecycle &#123; prevent_destroy = true &#125;</code> の併用）が推奨される。
                            </p>
                        </div>
                        <div className="code-label">modules/storage/outputs.tf</div>
                        <pre>
                            <code>
                                <div className="code-line"><span className="tok-keyword">output</span> <span className="tok-string">&quot;bucket_name&quot;</span> &#123;</div>
                                <div className="code-line">  <span className="tok-attr">value</span> = google_storage_bucket.default.name</div>
                                <div className="code-line">&#125;</div>
                            </code>
                        </pre>
                        <div className="code-label">main.tf</div>
                        <pre>
                            <code>
                                <div className="code-line"><span className="tok-keyword">module</span> <span className="tok-string">&quot;storage&quot;</span> &#123;</div>
                                <div className="code-line">  <span className="tok-attr">source</span>     = <span className="tok-string">&quot;./modules/storage&quot;</span></div>
                                <div className="code-line">  <span className="tok-attr">project_id</span> = <span className="tok-variable">var.project_id</span></div>
                                <div className="code-line">  <span className="tok-attr">region</span>     = <span className="tok-variable">var.region</span></div>
                                <div className="code-line">  <span className="tok-attr">zone</span>       = <span className="tok-variable">var.zone</span></div>
                                <div className="code-line">&#125;</div>
                            </code>
                        </pre>
                        <pre>
                            <code>
                                <div className="code-line"><span className="tok-command">terraform</span> init</div>
                                <div className="code-line"><span className="tok-command">terraform</span> apply</div>
                            </code>
                        </pre>

                        <h3><i className="ti ti-arrows-transfer-up" aria-hidden="true" />remote backend の設定と移行フロー</h3>
                        <div className="mermaid-wrap">
                            <MermaidDiagram chart={DIAGRAMS.REMOTE_BACKEND_FLOW} ariaLabel="リモートバックエンド（GCS）への移行フロー図" preserveNaturalScale />
                        </div>
                        <div className="code-label">main.tf</div>
                        <pre>
                            <code>
                                <div className="code-line"><span className="tok-keyword">terraform</span> &#123;</div>
                                <div className="code-line">  <span className="tok-keyword">backend</span> <span className="tok-string">&quot;gcs&quot;</span> &#123;</div>
                                <div className="code-line">    <span className="tok-attr">bucket</span> = <span className="tok-string">&quot;&lt;Bucket Name&gt;&quot;</span></div>
                                <div className="code-line">    <span className="tok-attr">prefix</span> = <span className="tok-string">&quot;terraform/state&quot;</span></div>
                                <div className="code-line">  &#125;</div>
                                <div className="code-line"></div>
                                <div className="code-line">  <span className="tok-keyword">required_providers</span> &#123;</div>
                                <div className="code-line">    <span className="tok-attr">google</span> = &#123;</div>
                                <div className="code-line">      <span className="tok-attr">source</span>  = <span className="tok-string">&quot;hashicorp/google&quot;</span></div>
                                <div className="code-line">      <span className="tok-attr">version</span> = <span className="tok-string">&quot;~&gt; 5.0&quot;</span></div>
                                <div className="code-line">    &#125;</div>
                                <div className="code-line">  &#125;</div>
                                <div className="code-line">&#125;</div>
                            </code>
                        </pre>
                        <div className="callout warning">
                            <div className="callout-title"><i className="ti ti-alert-triangle" aria-hidden="true" />注意点</div>
                            <p>
                                <code>backend</code> ブロックには変数（<code>var.xxx</code>）を使うことができない。これは Terraform の設計上の制約で、backend 設定はプロバイダーやモジュールより前、変数の評価より前の段階で読み込まれるためである。バケット名は直接文字列で書く必要がある。
                            </p>
                        </div>
                        <pre>
                            <code>
                                <div className="code-line"><span className="tok-command">terraform</span> init</div>
                            </code>
                        </pre>
                        <p>
                            <code>backend</code> ブロックを追加して <code>init</code> を実行すると、Terraform は既存のローカル state を検出し、次のように尋ねてくる。
                        </p>
                        <pre>
                            <code>
                                <div className="code-line">Do you want to copy existing state to the new backend?</div>
                                <div className="code-line">  Enter &quot;yes&quot; to copy and &quot;no&quot; to start with an empty state.</div>
                            </code>
                        </pre>
                        <p>
                            ここで<strong><code>yes</code></strong>と入力することで、既存の管理対象（import 済みのインスタンスなど）の記録を失わずに移行できる。<code>no</code> を選ぶと空の state から始まってしまい、既存リソースの管理情報を失うため注意が必要である。
                        </p>
                        <p className="source-note">
                            <i className="ti ti-link" aria-hidden="true" /> 根拠: <a className="ext-link" href="https://developer.hashicorp.com/terraform/language/backend/gcs" target="_blank" rel="noreferrer">developer.hashicorp.com/terraform/language/backend/gcs</a> ／ <a className="ext-link" href="https://cloud.google.com/storage/docs/uniform-bucket-level-access" target="_blank" rel="noreferrer">cloud.google.com/storage/docs/uniform-bucket-level-access</a>
                        </p>
                    </section>

                    <section id="sec7">
                        <h2><span className="num">7</span>Task 4: インフラの変更（Update in-place）</h2>
                        <h3><i className="ti ti-cpu" aria-hidden="true" />machine_type の変更</h3>
                        <p>
                            既存の <code>tf-instance-1</code> と <code>tf-instance-2</code> の <code>machine_type</code> を <code>e2-standard-2</code> へ変更する。
                        </p>
                        <div className="code-label">modules/instances/instances.tf</div>
                        <pre>
                            <code>
                                <div className="code-line"><span className="tok-keyword">resource</span> <span className="tok-string">&quot;google_compute_instance&quot;</span> <span className="tok-string">&quot;tf-instance-1&quot;</span> &#123;</div>
                                <div className="code-line">  <span className="tok-attr">name</span>                      = <span className="tok-string">&quot;tf-instance-1&quot;</span></div>
                                <div className="code-line">  <span className="tok-attr">machine_type</span>              = <span className="tok-string">&quot;e2-standard-2&quot;</span></div>
                                <div className="code-line">  <span className="tok-attr">zone</span>                      = <span className="tok-variable">var.zone</span></div>
                                <div className="code-line">  <span className="tok-attr">allow_stopping_for_update</span> = <span className="tok-boolean">true</span></div>
                                <div className="code-line">  <span className="tok-comment"># ...</span></div>
                                <div className="code-line">&#125;</div>
                            </code>
                        </pre>
                        <p>
                            <code>tf-instance-2</code> も同様に <code>e2-standard-2</code> へ変更する。<code>allow_stopping_for_update = true</code> を設定済みであるため、Terraform はインスタンスを削除せず、<strong>停止 → 属性変更 → 起動</strong>という形で in-place update を行う。この引数を設定していない場合、<code>machine_type</code> のようなプロパティ変更はエラーになるか、リソースの完全な再作成（destroy &amp; create）を招く。
                        </p>

                        <h3><i className="ti ti-server-2" aria-hidden="true" />3台目のインスタンス追加</h3>
                        <pre>
                            <code>
                                <div className="code-line"><span className="tok-keyword">resource</span> <span className="tok-string">&quot;google_compute_instance&quot;</span> <span className="tok-string">&quot;instance-name&quot;</span> &#123;</div>
                                <div className="code-line">  <span className="tok-attr">name</span>         = <span className="tok-string">&quot;&lt;Instance Name&gt;&quot;</span></div>
                                <div className="code-line">  <span className="tok-attr">machine_type</span> = <span className="tok-string">&quot;e2-standard-2&quot;</span></div>
                                <div className="code-line">  <span className="tok-attr">zone</span>         = <span className="tok-variable">var.zone</span></div>
                                <div className="code-line"></div>
                                <div className="code-line">  <span className="tok-keyword">boot_disk</span> &#123;</div>
                                <div className="code-line">    <span className="tok-keyword">initialize_params</span> &#123;</div>
                                <div className="code-line">      <span className="tok-attr">image</span> = <span className="tok-string">&quot;projects/debian-cloud/global/images/family/debian-12&quot;</span></div>
                                <div className="code-line">    &#125;</div>
                                <div className="code-line">  &#125;</div>
                                <div className="code-line"></div>
                                <div className="code-line">  <span className="tok-keyword">network_interface</span> &#123;</div>
                                <div className="code-line">    <span className="tok-attr">network</span> = <span className="tok-string">&quot;default&quot;</span></div>
                                <div className="code-line">    <span className="tok-keyword">access_config</span> &#123;&#125;</div>
                                <div className="code-line">  &#125;</div>
                                <div className="code-line"></div>
                                <div className="code-line">  <span className="tok-attr">metadata_startup_script</span> = &lt;&lt;-EOT</div>
                                <div className="code-line">        #!/bin/bash</div>
                                <div className="code-line">    EOT</div>
                                <div className="code-line"></div>
                                <div className="code-line">  <span className="tok-attr">allow_stopping_for_update</span> = <span className="tok-boolean">true</span></div>
                                <div className="code-line">&#125;</div>
                            </code>
                        </pre>

                        <h3><i className="ti ti-arrows-shuffle" aria-hidden="true" />変更・追加のワークフロー</h3>
                        <div className="mermaid-wrap">
                            <MermaidDiagram chart={DIAGRAMS.UPDATE_WORKFLOW} ariaLabel="インフラの変更および追加のワークフロー図" preserveNaturalScale />
                        </div>
                        <pre>
                            <code>
                                <div className="code-line"><span className="tok-command">terraform</span> init</div>
                                <div className="code-line"><span className="tok-command">terraform</span> apply</div>
                            </code>
                        </pre>
                        <div className="callout">
                            <div className="callout-title"><i className="ti ti-checks" aria-hidden="true" />ベストプラクティス</div>
                            <p>
                                複数リソースにまたがる同種の変更（全インスタンスの machine_type 変更など）は、本来であれば <code>for_each</code> や <code>count</code> を使って DRY（Don&apos;t Repeat Yourself）に書くのが望ましい。本ラボでは学習目的上、明示的に3つの resource ブロックとして書くが、実務では以下のような書き方も検討する価値がある。
                            </p>
                        </div>
                        <pre>
                            <code>
                                <div className="code-line"><span className="tok-keyword">variable</span> <span className="tok-string">&quot;instances&quot;</span> &#123;</div>
                                <div className="code-line">  <span className="tok-attr">type</span>    = map(string)</div>
                                <div className="code-line">  <span className="tok-attr">default</span> = &#123;</div>
                                <div className="code-line">    <span className="tok-string">&quot;tf-instance-1&quot;</span> = <span className="tok-string">&quot;e2-standard-2&quot;</span></div>
                                <div className="code-line">    <span className="tok-string">&quot;tf-instance-2&quot;</span> = <span className="tok-string">&quot;e2-standard-2&quot;</span></div>
                                <div className="code-line">  &#125;</div>
                                <div className="code-line">&#125;</div>
                                <div className="code-line"></div>
                                <div className="code-line"><span className="tok-keyword">resource</span> <span className="tok-string">&quot;google_compute_instance&quot;</span> <span className="tok-string">&quot;this&quot;</span> &#123;</div>
                                <div className="code-line">  <span className="tok-attr">for_each</span>     = <span className="tok-variable">var.instances</span></div>
                                <div className="code-line">  <span className="tok-attr">name</span>         = each.key</div>
                                <div className="code-line">  <span className="tok-attr">machine_type</span> = each.value</div>
                                <div className="code-line">  <span className="tok-comment"># ...</span></div>
                                <div className="code-line">&#125;</div>
                            </code>
                        </pre>
                        <p className="source-note">
                            <i className="ti ti-link" aria-hidden="true" /> 根拠: <a className="ext-link" href="https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_instance" target="_blank" rel="noreferrer">registry.terraform.io/.../compute_instance</a> ／ <a className="ext-link" href="https://developer.hashicorp.com/terraform/language/style" target="_blank" rel="noreferrer">developer.hashicorp.com/terraform/language/style</a>
                        </p>
                    </section>

                    <section id="sec8">
                        <h2><span className="num">8</span>Task 5: リソースの削除（Destroy）</h2>
                        <h3><i className="ti ti-bulb" aria-hidden="true" />Terraform における「削除」の正しい考え方</h3>
                        <p>
                            Terraform では、クラウドコンソールから直接インスタンスを消すのではなく、<strong>「設定ファイルから resource ブロックを削除し、apply する」</strong>ことでリソースを削除するのがベストプラクティスである。
                        </p>
                        <div className="mermaid-wrap">
                            <MermaidDiagram chart={DIAGRAMS.DESTROY_WORKFLOW} ariaLabel="リソースの削除（Destroy）のワークフロー図" preserveNaturalScale />
                        </div>
                        <pre>
                            <code>
                                <div className="code-line"><span className="tok-comment"># instances.tf から google_compute_instance.tf-instance-3 ブロックを削除した後</span></div>
                                <div className="code-line"><span className="tok-command">terraform</span> init</div>
                                <div className="code-line"><span className="tok-command">terraform</span> apply</div>
                            </code>
                        </pre>
                        <p className="source-note">
                            <i className="ti ti-link" aria-hidden="true" /> 根拠: <a className="ext-link" href="https://developer.hashicorp.com/terraform/language/resources/destroy" target="_blank" rel="noreferrer">developer.hashicorp.com/terraform/language/resources/destroy</a> ／ <a className="ext-link" href="https://developer.hashicorp.com/terraform/cli/commands/destroy" target="_blank" rel="noreferrer">developer.hashicorp.com/terraform/cli/commands/destroy</a>
                        </p>
                    </section>

                    <section id="sec9">
                        <h2><span className="num">9</span>Task 6: Registry モジュールの活用（VPC &amp; Subnet）</h2>
                        <h3><i className="ti ti-recycle" aria-hidden="true" />なぜ自作せず Registry モジュールを使うのか</h3>
                        <p>
                            ネットワーク（VPC / サブネット / ルートテーブル / NAT 等）は考慮すべきパラメータが多く、自作すると記述量が増えてテスト保守コストが跳ね上がる。Google Cloud 公式の Terraform Registry モジュールを使うことで、ベストプラクティスに則った高品質な VPC を簡潔に定義できる。
                        </p>

                        <h3><i className="ti ti-git-branch" aria-hidden="true" />モジュールの参照関係</h3>
                        <div className="mermaid-wrap">
                            <MermaidDiagram chart={DIAGRAMS.MODULE_RELATION} ariaLabel="Terraform Registry モジュールの参照関係図" preserveNaturalScale />
                        </div>

                        <h3><i className="ti ti-file-code" aria-hidden="true" />main.tf へのモジュール追加</h3>
                        <pre>
                            <code>
                                <div className="code-line"><span className="tok-keyword">module</span> <span className="tok-string">&quot;vpc&quot;</span> &#123;</div>
                                <div className="code-line">  <span className="tok-attr">source</span>  = <span className="tok-string">&quot;terraform-google-modules/network/google&quot;</span></div>
                                <div className="code-line">  <span className="tok-attr">version</span> = <span className="tok-string">&quot;10.0.0&quot;</span></div>
                                <div className="code-line"></div>
                                <div className="code-line">  <span className="tok-attr">project_id</span>   = <span className="tok-variable">var.project_id</span></div>
                                <div className="code-line">  <span className="tok-attr">network_name</span> = <span className="tok-string">&quot;&lt;VPC Name&gt;&quot;</span></div>
                                <div className="code-line">  <span className="tok-attr">routing_mode</span> = <span className="tok-string">&quot;GLOBAL&quot;</span></div>
                                <div className="code-line"></div>
                                <div className="code-line">  <span className="tok-attr">subnets</span> = [</div>
                                <div className="code-line">    &#123;</div>
                                <div className="code-line">      <span className="tok-attr">subnet_name</span>   = <span className="tok-string">&quot;subnet-01&quot;</span></div>
                                <div className="code-line">      <span className="tok-attr">subnet_ip</span>     = <span className="tok-string">&quot;10.10.10.0/24&quot;</span></div>
                                <div className="code-line">      <span className="tok-attr">subnet_region</span> = <span className="tok-variable">var.region</span></div>
                                <div className="code-line">    &#125;,</div>
                                <div className="code-line">    &#123;</div>
                                <div className="code-line">      <span className="tok-attr">subnet_name</span>   = <span className="tok-string">&quot;subnet-02&quot;</span></div>
                                <div className="code-line">      <span className="tok-attr">subnet_ip</span>     = <span className="tok-string">&quot;10.10.20.0/24&quot;</span></div>
                                <div className="code-line">      <span className="tok-attr">subnet_region</span> = <span className="tok-variable">var.region</span></div>
                                <div className="code-line">    &#125;,</div>
                                <div className="code-line">  ]</div>
                                <div className="code-line">&#125;</div>
                            </code>
                        </pre>
                        <div className="callout">
                            <div className="callout-title"><i className="ti ti-pin" aria-hidden="true" />バージョン固定の重要性</div>
                            <p>
                                <code>version</code> は必ず明示的に固定する。Registry モジュールはメジャーバージョンが上がると破壊的変更（引数名の変更など）を伴うことが多く、固定しないと、ある日突然 <code>terraform init -upgrade</code> で最新版が引き込まれて apply が失敗する、という事故につながる。本ラボでは互換性の観点から <code>10.0.0</code> を指定するよう案内されているが、実務で新規に使う場合は Registry で最新の安定版を確認し、<code>~&gt; 10.0</code> のような柔軟なバージョン制約を検討するとよい。
                            </p>
                        </div>
                        <pre>
                            <code>
                                <div className="code-line"><span className="tok-command">terraform</span> init</div>
                                <div className="code-line"><span className="tok-command">terraform</span> apply</div>
                            </code>
                        </pre>

                        <h3><i className="ti ti-plug-connected" aria-hidden="true" />インスタンスをサブネットに接続する</h3>
                        <div className="callout">
                            <div className="callout-title"><i className="ti ti-alert-triangle" aria-hidden="true" />子モジュールから <code>module.vpc</code> は参照できない</div>
                            <p>
                                <code>module.&lt;NAME&gt;.&lt;OUTPUT&gt;</code> という参照は、その module ブロックを<strong>宣言しているモジュール（ここではルートの <code>main.tf</code>）の中でのみ</strong>有効である。<code>modules/instances</code> の中に <code>module.vpc.network_self_link</code> と書いても、兄弟モジュールは名前解決できず <code>Reference to undeclared module</code> エラーになる。ルートで VPC の output を受け取り、<code>variable</code> 経由で子モジュールへ<strong>受け渡す</strong>のが唯一の経路である。
                            </p>
                        </div>
                        <div className="code-label">main.tf（ルートモジュール: VPC の output を instances へ渡す）</div>
                        <pre>
                            <code>
                                <div className="code-line"><span className="tok-keyword">module</span> <span className="tok-string">&quot;instances&quot;</span> &#123;</div>
                                <div className="code-line">  <span className="tok-attr">source</span>     = <span className="tok-string">&quot;./modules/instances&quot;</span></div>
                                <div className="code-line">  <span className="tok-attr">project_id</span> = <span className="tok-variable">var.project_id</span></div>
                                <div className="code-line">  <span className="tok-attr">region</span>     = <span className="tok-variable">var.region</span></div>
                                <div className="code-line">  <span className="tok-attr">zone</span>       = <span className="tok-variable">var.zone</span></div>
                                <div className="code-line"></div>
                                <div className="code-line">  <span className="tok-comment"># terraform-google-modules/network/google v10.0.0 の output を渡す</span></div>
                                <div className="code-line">  <span className="tok-comment"># subnets は &quot;&lt;region&gt;/&lt;name&gt;&quot; をキーとする map。順序に依存しないよう明示的に引く</span></div>
                                <div className="code-line">  <span className="tok-attr">network</span>    = <span className="tok-variable">module.vpc.network_self_link</span></div>
                                <div className="code-line">  <span className="tok-attr">subnet_01</span>  = <span className="tok-variable">module.vpc.subnets</span>[<span className="tok-string">&quot;$&#123;var.region&#125;/subnet-01&quot;</span>].<span className="tok-variable">self_link</span></div>
                                <div className="code-line">  <span className="tok-attr">subnet_02</span>  = <span className="tok-variable">module.vpc.subnets</span>[<span className="tok-string">&quot;$&#123;var.region&#125;/subnet-02&quot;</span>].<span className="tok-variable">self_link</span></div>
                                <div className="code-line">&#125;</div>
                            </code>
                        </pre>
                        <div className="code-label">modules/instances/variables.tf</div>
                        <pre>
                            <code>
                                <div className="code-line"><span className="tok-keyword">variable</span> <span className="tok-string">&quot;network&quot;</span> &#123;</div>
                                <div className="code-line">  <span className="tok-attr">type</span> = <span className="tok-keyword">string</span></div>
                                <div className="code-line">&#125;</div>
                                <div className="code-line"></div>
                                <div className="code-line"><span className="tok-keyword">variable</span> <span className="tok-string">&quot;subnet_01&quot;</span> &#123;</div>
                                <div className="code-line">  <span className="tok-attr">type</span> = <span className="tok-keyword">string</span></div>
                                <div className="code-line">&#125;</div>
                                <div className="code-line"></div>
                                <div className="code-line"><span className="tok-keyword">variable</span> <span className="tok-string">&quot;subnet_02&quot;</span> &#123;</div>
                                <div className="code-line">  <span className="tok-attr">type</span> = <span className="tok-keyword">string</span></div>
                                <div className="code-line">&#125;</div>
                            </code>
                        </pre>
                        <div className="code-label">modules/instances/instances.tf</div>
                        <pre>
                            <code>
                                <div className="code-line"><span className="tok-keyword">resource</span> <span className="tok-string">&quot;google_compute_instance&quot;</span> <span className="tok-string">&quot;tf-instance-1&quot;</span> &#123;</div>
                                <div className="code-line">  <span className="tok-comment"># ...</span></div>
                                <div className="code-line">  <span className="tok-keyword">network_interface</span> &#123;</div>
                                <div className="code-line">    <span className="tok-attr">network</span>    = <span className="tok-variable">var.network</span></div>
                                <div className="code-line">    <span className="tok-attr">subnetwork</span> = <span className="tok-variable">var.subnet_01</span></div>
                                <div className="code-line">    <span className="tok-keyword">access_config</span> &#123;&#125;</div>
                                <div className="code-line">  &#125;</div>
                                <div className="code-line">&#125;</div>
                                <div className="code-line"></div>
                                <div className="code-line"><span className="tok-keyword">resource</span> <span className="tok-string">&quot;google_compute_instance&quot;</span> <span className="tok-string">&quot;tf-instance-2&quot;</span> &#123;</div>
                                <div className="code-line">  <span className="tok-comment"># ...</span></div>
                                <div className="code-line">  <span className="tok-keyword">network_interface</span> &#123;</div>
                                <div className="code-line">    <span className="tok-attr">network</span>    = <span className="tok-variable">var.network</span></div>
                                <div className="code-line">    <span className="tok-attr">subnetwork</span> = <span className="tok-variable">var.subnet_02</span></div>
                                <div className="code-line">    <span className="tok-keyword">access_config</span> &#123;&#125;</div>
                                <div className="code-line">  &#125;</div>
                                <div className="code-line">&#125;</div>
                            </code>
                        </pre>
                        <pre>
                            <code>
                                <div className="code-line"><span className="tok-command">terraform</span> init</div>
                                <div className="code-line"><span className="tok-command">terraform</span> apply</div>
                            </code>
                        </pre>
                        <p className="source-note">
                            <i className="ti ti-link" aria-hidden="true" /> 根拠: <a className="ext-link" href="https://registry.terraform.io/modules/terraform-google-modules/network/google/latest" target="_blank" rel="noreferrer">registry.terraform.io/modules/terraform-google-modules/network/google/latest</a>
                        </p>
                    </section>

                    <section id="sec10">
                        <h2><span className="num">10</span>Task 7: ファイアウォールルールの設定</h2>
                        <h3><i className="ti ti-shield-half" aria-hidden="true" />GCP のファイアウォールの基本方針</h3>
                        <p>
                            Google Cloud の VPC は、デフォルトでは ingress（内向き）通信を暗黙的にすべて拒否する設計になっている。そのため、VM 間やインターネットからの通信を許可するには、明示的に firewall ルールを作成する必要がある。
                        </p>
                        <div className="mermaid-wrap">
                            <MermaidDiagram chart={DIAGRAMS.FIREWALL_FLOW} ariaLabel="ファイアウォールルールによる通信許可フロー図" preserveNaturalScale />
                        </div>

                        <h3><i className="ti ti-firewall" aria-hidden="true" />firewall リソースの実装</h3>
                        <pre>
                            <code>
                                <div className="code-line"><span className="tok-keyword">resource</span> <span className="tok-string">&quot;google_compute_firewall&quot;</span> <span className="tok-string">&quot;tf-firewall&quot;</span> &#123;</div>
                                <div className="code-line">  <span className="tok-attr">name</span>    = <span className="tok-string">&quot;tf-firewall&quot;</span></div>
                                <div className="code-line">  <span className="tok-attr">network</span> = <span className="tok-variable">module.vpc.network_self_link</span></div>
                                <div className="code-line"></div>
                                <div className="code-line">  <span className="tok-keyword">allow</span> &#123;</div>
                                <div className="code-line">    <span className="tok-attr">protocol</span> = <span className="tok-string">&quot;tcp&quot;</span></div>
                                <div className="code-line">    <span className="tok-attr">ports</span>    = [<span className="tok-string">&quot;80&quot;</span>]</div>
                                <div className="code-line">  &#125;</div>
                                <div className="code-line"></div>
                                <div className="code-line">  <span className="tok-attr">source_ranges</span> = [<span className="tok-string">&quot;0.0.0.0/0&quot;</span>]</div>
                                <div className="code-line">&#125;</div>
                            </code>
                        </pre>
                        <div className="callout">
                            <div className="callout-title"><i className="ti ti-alert-triangle" aria-hidden="true" /><code>source_ranges = [&quot;0.0.0.0/0&quot;]</code> はラボ要件の例外</div>
                            <p>
                                このルールは <code>target_tags</code> / <code>target_service_accounts</code> を指定していないため、<strong>VPC 内の全 VM の TCP:80 がインターネット全体に開放される</strong>。チャレンジラボの採点条件が「ネットワーク全体に対する HTTP 許可」であるためそのまま記述しているが、実運用でこの形をコピーしてはいけない。
                            </p>
                            <p>
                                本番では ① 対象 VM に <code>tags = [&quot;http-server&quot;]</code> を付与し、ファイアウォール側で <code>target_tags = [&quot;http-server&quot;]</code> を指定して<strong>適用対象を限定</strong>する、② <code>source_ranges</code> を Load Balancer のヘルスチェック range（<code>35.191.0.0/16</code>, <code>130.211.0.0/22</code>）や社内 CIDR に絞る、のいずれか（できれば両方）を行う。
                            </p>
                        </div>
                        <div className="callout">
                            <div className="callout-title"><i className="ti ti-info-circle" aria-hidden="true" /><code>network</code> 引数について</div>
                            <p>
                                ラボの指示にもあるとおり、<code>network</code> 引数には <code>projects/&lt;PROJECT_ID&gt;/global/networks/&lt;VPC Name&gt;</code> という形式の URL（self_link）を渡す必要がある。<code>terraform-google-modules/network/google</code> モジュールは <code>network_self_link</code> という output を提供しているため、素直にそれを参照すればよい。もし output の名前がわからない場合は、<code>terraform state show module.vpc</code> や <code>terraform state list</code> で state 内のリソース属性を確認する習慣をつけると良い。
                            </p>
                        </div>
                        <pre>
                            <code>
                                <div className="code-line"><span className="tok-command">terraform</span> init</div>
                                <div className="code-line"><span className="tok-command">terraform</span> apply</div>
                            </code>
                        </pre>

                        <h3><i className="ti ti-plug" aria-hidden="true" />疎通確認</h3>
                        <pre>
                            <code>
                                <div className="code-line"><span className="tok-command">curl</span> <span className="tok-flag">-m 5</span> http://&lt;tf-instance-2の外部IP&gt;:80</div>
                            </code>
                        </pre>
                        <p>
                            Web サーバー自体は起動していないため、素の <code>curl</code> ではタイムアウトではなく接続拒否（connection refused）が返るのが正常である。ここで重要なのは「タイムアウトしない = ファイアウォールでブロックされていない」ことの確認であり、アプリケーション層の応答自体はこのラボの検証対象ではない。
                        </p>
                        <p className="source-note">
                            <i className="ti ti-link" aria-hidden="true" /> 根拠: <a className="ext-link" href="https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_firewall" target="_blank" rel="noreferrer">registry.terraform.io/.../compute_firewall</a> ／ <a className="ext-link" href="https://cloud.google.com/firewall/docs/firewalls" target="_blank" rel="noreferrer">cloud.google.com/firewall/docs/firewalls</a>
                        </p>
                    </section>

                    <section id="sec11">
                        <h2><span className="num">11</span>ベストプラクティス総まとめ</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">観点</th>
                                    <th scope="col">ベストプラクティス</th>
                                    <th scope="col">該当箇所</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>モジュール化</td>
                                    <td>関心事ごとに module を分割する（compute / storage など）</td>
                                    <td>Task 1</td>
                                </tr>
                                <tr>
                                    <td>変数管理</td>
                                    <td>ハードコードせず <code>variables.tf</code> に集約し、default を活用する</td>
                                    <td>Task 1</td>
                                </tr>
                                <tr>
                                    <td>import 前の準備</td>
                                    <td>import する resource の実属性を事前に Console で確認し、極力一致させる</td>
                                    <td>Task 2</td>
                                </tr>
                                <tr>
                                    <td>import 後の検証</td>
                                    <td><code>terraform plan</code> の差分がゼロになることを確認してから運用に入る</td>
                                    <td>Task 2</td>
                                </tr>
                                <tr>
                                    <td>state 管理</td>
                                    <td>ローカル state ではなく remote backend（GCS 等）+ locking を使う</td>
                                    <td>Task 3</td>
                                </tr>
                                <tr>
                                    <td>backend の制約</td>
                                    <td>backend ブロックには変数を使えないことを理解しておく</td>
                                    <td>Task 3</td>
                                </tr>
                                <tr>
                                    <td>in-place update</td>
                                    <td><code>allow_stopping_for_update = true</code> で不要な再作成を避ける</td>
                                    <td>Task 4</td>
                                </tr>
                                <tr>
                                    <td>リソース削除</td>
                                    <td>コンソールから直接消さず、設定ファイルの変更 → apply で削除する</td>
                                    <td>Task 5</td>
                                </tr>
                                <tr>
                                    <td>既存モジュール活用</td>
                                    <td>車輪の再発明を避け、Registry の実績あるモジュールを使う</td>
                                    <td>Task 6</td>
                                </tr>
                                <tr>
                                    <td>バージョン固定</td>
                                    <td>モジュール・provider のバージョンを明示的に固定する</td>
                                    <td>Task 6</td>
                                </tr>
                                <tr>
                                    <td>最小権限</td>
                                    <td>firewall は必要な port・source_range だけに絞る（本ラボでは検証用に緩和）</td>
                                    <td>Task 7</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="callout success">
                            <div className="callout-title">
                                <i className="ti ti-flag-check" aria-hidden="true" />各 Task 完了時の習慣
                            </div>
                            <p>
                                各 Task の最後には必ず <code>terraform plan</code> で差分を確認し、意図しない変更（特にリソースの再作成）が含まれていないかをチェックしてから <code>apply</code> する習慣を徹底してほしい。
                            </p>
                        </div>
                    </section>

                    <section id="sec12">
                        <h2><span className="num">12</span>参考文献・引用ソース一覧</h2>
                        <p>
                            以下は、本ガイド内の各ベストプラクティスの根拠となる一次情報源（HashiCorp 公式ドキュメント、Terraform Registry、Google Cloud 公式ドキュメント）である。カテゴリ別に整理しているので、気になるトピックからそのまま一次情報源に飛べる。
                        </p>

                        <div className="source-groups">
                            <div className="source-group">
                                <div className="source-group-title gcp">
                                    <i className="ti ti-brand-google" aria-hidden="true" />
                                    Google Cloud 公式ドキュメント
                                    <span className="count">3</span>
                                </div>
                                <div className="source-list">
                                    <a className="source-row" href="https://cloud.google.com/shell/docs/configuring-cloud-shell" target="_blank" rel="noreferrer">
                                        <span className="source-row-icon gcp">
                                            <i className="ti ti-terminal-2" aria-hidden="true" />
                                        </span>
                                        <span className="source-row-text">
                                            <span className="source-row-title">Cloud Shell の環境永続化（.customize_environment）</span>
                                            <span className="source-row-url">cloud.google.com/shell/docs/configuring-cloud-shell</span>
                                        </span>
                                        <i className="ti ti-chevron-right source-row-chevron" aria-hidden="true" />
                                    </a>
                                    <a className="source-row" href="https://cloud.google.com/storage/docs/uniform-bucket-level-access" target="_blank" rel="noreferrer">
                                        <span className="source-row-icon gcp">
                                            <i className="ti ti-shield-lock" aria-hidden="true" />
                                        </span>
                                        <span className="source-row-text">
                                            <span className="source-row-title">Uniform bucket-level access について</span>
                                            <span className="source-row-url">cloud.google.com/storage/docs/uniform-bucket-level-access</span>
                                        </span>
                                        <i className="ti ti-chevron-right source-row-chevron" aria-hidden="true" />
                                    </a>
                                    <a className="source-row" href="https://cloud.google.com/firewall/docs/firewalls" target="_blank" rel="noreferrer">
                                        <span className="source-row-icon gcp">
                                            <i className="ti ti-firewall" aria-hidden="true" />
                                        </span>
                                        <span className="source-row-text">
                                            <span className="source-row-title">VPC ファイアウォールルールの概要</span>
                                            <span className="source-row-url">cloud.google.com/firewall/docs/firewalls</span>
                                        </span>
                                        <i className="ti ti-chevron-right source-row-chevron" aria-hidden="true" />
                                    </a>
                                </div>
                            </div>

                            <div className="source-group">
                                <div className="source-group-title registry">
                                    <i className="ti ti-package" aria-hidden="true" />
                                    Terraform Registry（プロバイダー / モジュール）
                                    <span className="count">4</span>
                                </div>
                                <div className="source-list">
                                    <a className="source-row" href="https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_instance" target="_blank" rel="noreferrer">
                                        <span className="source-row-icon registry">
                                            <i className="ti ti-server" aria-hidden="true" />
                                        </span>
                                        <span className="source-row-text">
                                            <span className="source-row-title">google_compute_instance リソースリファレンス</span>
                                            <span className="source-row-url">registry.terraform.io/providers/hashicorp/google/.../compute_instance</span>
                                        </span>
                                        <i className="ti ti-chevron-right source-row-chevron" aria-hidden="true" />
                                    </a>
                                    <a className="source-row" href="https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/storage_bucket" target="_blank" rel="noreferrer">
                                        <span className="source-row-icon registry">
                                            <i className="ti ti-bucket" aria-hidden="true" />
                                        </span>
                                        <span className="source-row-text">
                                            <span className="source-row-title">google_storage_bucket リソースリファレンス</span>
                                            <span className="source-row-url">registry.terraform.io/providers/hashicorp/google/.../storage_bucket</span>
                                        </span>
                                        <i className="ti ti-chevron-right source-row-chevron" aria-hidden="true" />
                                    </a>
                                    <a className="source-row" href="https://registry.terraform.io/modules/terraform-google-modules/network/google/latest" target="_blank" rel="noreferrer">
                                        <span className="source-row-icon registry">
                                            <i className="ti ti-network" aria-hidden="true" />
                                        </span>
                                        <span className="source-row-text">
                                            <span className="source-row-title">terraform-google-modules/network/google モジュール</span>
                                            <span className="source-row-url">registry.terraform.io/modules/terraform-google-modules/network/google</span>
                                        </span>
                                        <i className="ti ti-chevron-right source-row-chevron" aria-hidden="true" />
                                    </a>
                                    <a className="source-row" href="https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_firewall" target="_blank" rel="noreferrer">
                                        <span className="source-row-icon registry">
                                            <i className="ti ti-shield" aria-hidden="true" />
                                        </span>
                                        <span className="source-row-text">
                                            <span className="source-row-title">google_compute_firewall リソースリファレンス</span>
                                            <span className="source-row-url">registry.terraform.io/providers/hashicorp/google/.../compute_firewall</span>
                                        </span>
                                        <i className="ti ti-chevron-right source-row-chevron" aria-hidden="true" />
                                    </a>
                                </div>
                            </div>

                            <div className="source-group">
                                <div className="source-group-title hashicorp">
                                    <i className="ti ti-book-2" aria-hidden="true" />
                                    HashiCorp Terraform 言語・CLI ドキュメント
                                    <span className="count">9</span>
                                </div>
                                <div className="source-list">
                                    <a className="source-row" href="https://developer.hashicorp.com/terraform/language/modules" target="_blank" rel="noreferrer">
                                        <span className="source-row-icon hashicorp">
                                            <i className="ti ti-puzzle" aria-hidden="true" />
                                        </span>
                                        <span className="source-row-text">
                                            <span className="source-row-title">Terraform Modules の基本</span>
                                            <span className="source-row-url">developer.hashicorp.com/terraform/language/modules</span>
                                        </span>
                                        <i className="ti ti-chevron-right source-row-chevron" aria-hidden="true" />
                                    </a>
                                    <a className="source-row" href="https://developer.hashicorp.com/terraform/language/values/variables" target="_blank" rel="noreferrer">
                                        <span className="source-row-icon hashicorp">
                                            <i className="ti ti-variable" aria-hidden="true" />
                                        </span>
                                        <span className="source-row-text">
                                            <span className="source-row-title">Input Variables の定義方法</span>
                                            <span className="source-row-url">developer.hashicorp.com/terraform/language/values/variables</span>
                                        </span>
                                        <i className="ti ti-chevron-right source-row-chevron" aria-hidden="true" />
                                    </a>
                                    <a className="source-row" href="https://developer.hashicorp.com/terraform/cli/commands/import" target="_blank" rel="noreferrer">
                                        <span className="source-row-icon hashicorp">
                                            <i className="ti ti-download" aria-hidden="true" />
                                        </span>
                                        <span className="source-row-text">
                                            <span className="source-row-title">terraform import コマンドリファレンス</span>
                                            <span className="source-row-url">developer.hashicorp.com/terraform/cli/commands/import</span>
                                        </span>
                                        <i className="ti ti-chevron-right source-row-chevron" aria-hidden="true" />
                                    </a>
                                    <a className="source-row" href="https://developer.hashicorp.com/terraform/cli/import/usage" target="_blank" rel="noreferrer">
                                        <span className="source-row-icon hashicorp">
                                            <i className="ti ti-file-description" aria-hidden="true" />
                                        </span>
                                        <span className="source-row-text">
                                            <span className="source-row-title">Import の使い方ガイド</span>
                                            <span className="source-row-url">developer.hashicorp.com/terraform/cli/import/usage</span>
                                        </span>
                                        <i className="ti ti-chevron-right source-row-chevron" aria-hidden="true" />
                                    </a>
                                    <a className="source-row" href="https://developer.hashicorp.com/terraform/language/backend/gcs" target="_blank" rel="noreferrer">
                                        <span className="source-row-icon hashicorp">
                                            <i className="ti ti-cloud-lock" aria-hidden="true" />
                                        </span>
                                        <span className="source-row-text">
                                            <span className="source-row-title">GCS Backend（remote backend）設定リファレンス</span>
                                            <span className="source-row-url">developer.hashicorp.com/terraform/language/backend/gcs</span>
                                        </span>
                                        <i className="ti ti-chevron-right source-row-chevron" aria-hidden="true" />
                                    </a>
                                    <a className="source-row" href="https://developer.hashicorp.com/terraform/language/state" target="_blank" rel="noreferrer">
                                        <span className="source-row-icon hashicorp">
                                            <i className="ti ti-database" aria-hidden="true" />
                                        </span>
                                        <span className="source-row-text">
                                            <span className="source-row-title">Terraform State の概念</span>
                                            <span className="source-row-url">developer.hashicorp.com/terraform/language/state</span>
                                        </span>
                                        <i className="ti ti-chevron-right source-row-chevron" aria-hidden="true" />
                                    </a>
                                    <a className="source-row" href="https://developer.hashicorp.com/terraform/language/resources/destroy" target="_blank" rel="noreferrer">
                                        <span className="source-row-icon hashicorp">
                                            <i className="ti ti-trash" aria-hidden="true" />
                                        </span>
                                        <span className="source-row-text">
                                            <span className="source-row-title">リソースの削除（Destroy）に関する言語ドキュメント</span>
                                            <span className="source-row-url">developer.hashicorp.com/terraform/language/resources/destroy</span>
                                        </span>
                                        <i className="ti ti-chevron-right source-row-chevron" aria-hidden="true" />
                                    </a>
                                    <a className="source-row" href="https://developer.hashicorp.com/terraform/cli/commands/destroy" target="_blank" rel="noreferrer">
                                        <span className="source-row-icon hashicorp">
                                            <i className="ti ti-terminal" aria-hidden="true" />
                                        </span>
                                        <span className="source-row-text">
                                            <span className="source-row-title">terraform destroy コマンドリファレンス</span>
                                            <span className="source-row-url">developer.hashicorp.com/terraform/cli/commands/destroy</span>
                                        </span>
                                        <i className="ti ti-chevron-right source-row-chevron" aria-hidden="true" />
                                    </a>
                                    <a className="source-row" href="https://developer.hashicorp.com/terraform/language/style" target="_blank" rel="noreferrer">
                                        <span className="source-row-icon hashicorp">
                                            <i className="ti ti-ruler-2" aria-hidden="true" />
                                        </span>
                                        <span className="source-row-text">
                                            <span className="source-row-title">Terraform Style Guide（命名規則・構成のベストプラクティス）</span>
                                            <span className="source-row-url">developer.hashicorp.com/terraform/language/style</span>
                                        </span>
                                        <i className="ti ti-chevron-right source-row-chevron" aria-hidden="true" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>

            <footer className="footer">
                <i className="ti ti-brand-terraform" aria-hidden="true" />
                <span>Build Infrastructure with Terraform on Google Cloud — Challenge Lab 完全攻略ガイド</span>
            </footer>
        </div>
    );
}
