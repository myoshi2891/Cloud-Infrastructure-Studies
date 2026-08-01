'use client';

import React, { useState, useEffect } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS } from './constants';
import { NavBar } from './NavBar';
import './page.css';

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
                            <i className="ti ti-brand-terraform" />
                            CHALLENGE LAB GUIDE
                        </div>
                        <h1>Terraform で構築する Google Cloud インフラ管理 完全攻略ガイド</h1>
                        <p style={{ margin: 0 }}>
                            Build Infrastructure with Terraform on Google Cloud — Challenge Lab を、初学者〜中級者向けにステップバイステップで解説する。各 Task の手順だけでなく、「なぜその設計にするのか」というベストプラクティスの根拠と、その一次情報源を併記する。
                        </p>
                        <div className="hero-meta">
                            <span>
                                <i className="ti ti-users" />
                                対象読者: Terraform / Google Cloud 初学者〜中級者
                            </span>
                            <span>
                                <i className="ti ti-list-numbers" />
                                全7 Task + 事前準備
                            </span>
                            <span>
                                <i className="ti ti-link" />
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
                            <i className="ti ti-file-code" />
                            ~/.customize_environment
                        </div>
                        <pre><code><span className="tok-comment">#!/bin/sh</span>{'\n'}
<span className="tok-comment"># HashiCorp GPG キーの追加とリポジトリの登録</span>{'\n'}
<span className="tok-command">sudo</span> apt-get update &amp;&amp; <span className="tok-command">sudo</span> apt-get install -y gnupg software-properties-common{'\n'}
<span className="tok-command">wget</span> <span className="tok-flag">-O-</span> https://apt.releases.hashicorp.com/gpg | <span className="tok-command">gpg</span> <span className="tok-flag">--dearmor</span> | <span className="tok-command">sudo</span> tee /usr/share/keyrings/hashicorp-archive-keyring.gpg &gt; /dev/null{'\n'}
<span className="tok-command">echo</span> <span className="tok-string">"deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main"</span> | <span className="tok-command">sudo</span> tee /etc/apt/sources.list.d/hashicorp.list{'\n'}
<span className="tok-command">sudo</span> apt-get update &amp;&amp; <span className="tok-command">sudo</span> apt-get install -y terraform</code></pre>
                        <p>
                            このファイルに実行権限を付与（<code>chmod +x ~/.customize_environment</code>）しておくと、Cloud Shell VM の再作成時にも Terraform CLI が自動的に再インストールされる。
                        </p>
                        <p style={{ fontSize: '13px' }}>
                            <i className="ti ti-link" style={{ color: 'var(--color-text-tertiary)' }} /> 根拠: <a className="ext-link" href="https://cloud.google.com/shell/docs/configuring-cloud-shell" target="_blank" rel="noreferrer">cloud.google.com/shell/docs/configuring-cloud-shell</a>
                        </p>
                    </section>

                    <section id="sec4">
                        <h2><span className="num">4</span>Task 1: ディレクトリ構成とルート変数の設計</h2>
                        <h3><i className="ti ti-puzzle" />なぜ module に分割するのか</h3>
                        <p>
                            Terraform でインフラをコード化する際、すべてのリソース（VM、Storage、VPC、Firewall）を単一の <code>main.tf</code> に詰め込むと、コードの見通しが悪くなり、変更時の影響範囲の特定が困難になる。モジュール化によって以下のメリットが得られる。
                        </p>
                        <ul>
                            <li><strong>再利用性（Reusability）</strong>: 同じ構成のコンポーネントを複数環境（dev/stg/prod）で再利用できる</li>
                            <li><strong>カプセル化（Encapsulation）</strong>: モジュール内部の実装詳細を隠蔽し、必要な入出力（variables / outputs）のみを露出する</li>
                            <li><strong>チーム開発への拡張性</strong>: モジュール単位でレビュー・バージョン管理がしやすくなる</li>
                        </ul>

                        <h3><i className="ti ti-sitemap" />ディレクトリ構成</h3>
                        <div className="mermaid-wrap">
                            <MermaidDiagram chart={DIAGRAMS.DIRECTORY_STRUCTURE} ariaLabel="プロジェクトのディレクトリ構成図" preserveNaturalScale />
                        </div>
                        <pre><code><span className="tok-command">mkdir</span> <span className="tok-flag">-p</span> modules/instances modules/storage{'\n'}
<span className="tok-command">touch</span> main.tf variables.tf{'\n'}
<span className="tok-command">touch</span> modules/instances/&#123;instances.tf,outputs.tf,variables.tf&#125;{'\n'}
<span className="tok-command">touch</span> modules/storage/&#123;storage.tf,outputs.tf,variables.tf&#125;</code></pre>

                        <h3><i className="ti ti-variable" />variables.tf の実装（ルート・各モジュール共通）</h3>
                        <p>
                            各 <code>variables.tf</code>（ルート、instances、storage の3ファイルすべて）に、同じ3つの変数を定義する。
                        </p>
                        <pre><code><span className="tok-keyword">variable</span> <span className="tok-string">"project_id"</span> &#123;{'\n'}
  <span className="tok-attr">description</span> = <span className="tok-string">"The GCP project ID"</span>{'\n'}
  <span className="tok-attr">type</span>        = string{'\n'}
  <span className="tok-attr">default</span>     = <span className="tok-string">"&lt;あなたのプロジェクト ID&gt;"</span>{'\n'}
&#125;{'\n'}
{'\n'}
<span className="tok-keyword">variable</span> <span className="tok-string">"region"</span> &#123;{'\n'}
  <span className="tok-attr">description</span> = <span className="tok-string">"The GCP region"</span>{'\n'}
  <span className="tok-attr">type</span>        = string{'\n'}
  <span className="tok-attr">default</span>     = <span className="tok-string">"us-east1"</span>{'\n'}
&#125;{'\n'}
{'\n'}
<span className="tok-keyword">variable</span> <span className="tok-string">"zone"</span> &#123;{'\n'}
  <span className="tok-attr">description</span> = <span className="tok-string">"The GCP zone"</span>{'\n'}
  <span className="tok-attr">type</span>        = string{'\n'}
  <span className="tok-attr">default</span>     = <span className="tok-string">"us-east1-b"</span>{'\n'}
&#125;</code></pre>

                        <h3><i className="ti ti-cloud" />main.tf: Terraform block と Provider</h3>
                        <pre><code><span className="tok-keyword">terraform</span> &#123;{'\n'}
  <span className="tok-keyword">required_providers</span> &#123;{'\n'}
    <span className="tok-attr">google</span> = &#123;{'\n'}
      <span className="tok-attr">source</span>  = <span className="tok-string">"hashicorp/google"</span>{'\n'}
      <span className="tok-attr">version</span> = <span className="tok-string">"~&gt; 5.0"</span>{'\n'}
    &#125;{'\n'}
  &#125;{'\n'}
&#125;{'\n'}
{'\n'}
<span className="tok-keyword">provider</span> <span className="tok-string">"google"</span> &#123;{'\n'}
  <span className="tok-attr">project</span> = <span className="tok-variable">var.project_id</span>{'\n'}
  <span className="tok-attr">region</span>  = <span className="tok-variable">var.region</span>{'\n'}
  <span className="tok-attr">zone</span>    = <span className="tok-variable">var.zone</span>{'\n'}
&#125;</code></pre>

                        <h3><i className="ti ti-refresh" />初期化</h3>
                        <pre><code><span className="tok-command">terraform</span> init</code></pre>
                        <p style={{ fontSize: '13px' }}>
                            <i className="ti ti-link" style={{ color: 'var(--color-text-tertiary)' }} /> 根拠: <a className="ext-link" href="https://developer.hashicorp.com/terraform/language/modules" target="_blank" rel="noreferrer">developer.hashicorp.com/terraform/language/modules</a> ／ <a className="ext-link" href="https://developer.hashicorp.com/terraform/language/values/variables" target="_blank" rel="noreferrer">developer.hashicorp.com/terraform/language/values/variables</a>
                        </p>
                    </section>

                    <section id="sec5">
                        <h2><span className="num">5</span>Task 2: リソースのインポートと構成</h2>
                        <h3><i className="ti ti-info-circle" />import の位置づけを正しく理解する</h3>
                        <p>
                            <code>terraform import</code> は、<strong>「すでに GCP 上に存在する手動作成リソースを、Terraform の管理下（state ファイル）に取り込む」</strong>ためのコマンドである。
                        </p>
                        <ul>
                            <li>インポート対象の実体リソース（Instance ID 等）を指定して実行する</li>
                            <li>実行しても HCL コード（<code>.tf</code> ファイル）は自動生成されない（※ Terraform 1.5+ の <code>import</code> ブロックを除く古典的 CLI import の場合）</li>
                            <li>そのため、先に <code>instances.tf</code> に受け皿となる <code>resource</code> ブロックを記述しておく必要がある</li>
                        </ul>

                        <h3><i className="ti ti-route" />インポート手順のフロー</h3>
                        <div className="mermaid-wrap">
                            <MermaidDiagram chart={DIAGRAMS.IMPORT_FLOW} ariaLabel="リソースインポートの手順フロー図" preserveNaturalScale />
                        </div>

                        <h3><i className="ti ti-file-code" />main.tf への module 参照追加</h3>
                        <pre><code><span className="tok-keyword">module</span> <span className="tok-string">"instances"</span> &#123;{'\n'}
  <span className="tok-attr">source</span>     = <span className="tok-string">"./modules/instances"</span>{'\n'}
  <span className="tok-attr">project_id</span> = <span className="tok-variable">var.project_id</span>{'\n'}
  <span className="tok-attr">region</span>     = <span className="tok-variable">var.region</span>{'\n'}
  <span className="tok-attr">zone</span>       = <span className="tok-variable">var.zone</span>{'\n'}
&#125;</code></pre>
                        <p>module を追加・変更したら、必ず <code>terraform init</code> を再実行してモジュールを解決させる。</p>

                        <h3><i className="ti ti-server" />instances.tf: 最小限の resource ブロック</h3>
                        <pre><code><span className="tok-keyword">resource</span> <span className="tok-string">"google_compute_instance"</span> <span className="tok-string">"tf-instance-1"</span> &#123;{'\n'}
  <span className="tok-attr">name</span>         = <span className="tok-string">"tf-instance-1"</span>{'\n'}
  <span className="tok-attr">machine_type</span> = <span className="tok-string">"e2-micro"</span>{'\n'}
  <span className="tok-attr">zone</span>         = <span className="tok-variable">var.zone</span>{'\n'}
{'\n'}
  <span className="tok-keyword">boot_disk</span> &#123;{'\n'}
    <span className="tok-keyword">initialize_params</span> &#123;{'\n'}
      <span className="tok-attr">image</span> = <span className="tok-string">"debian-cloud/debian-11"</span>{'\n'}
    &#125;{'\n'}
  &#125;{'\n'}
{'\n'}
  <span className="tok-keyword">network_interface</span> &#123;{'\n'}
    <span className="tok-attr">network</span> = <span className="tok-string">"default"</span>{'\n'}
  &#125;{'\n'}
&#125;{'\n'}
{'\n'}
<span className="tok-keyword">resource</span> <span className="tok-string">"google_compute_instance"</span> <span className="tok-string">"tf-instance-2"</span> &#123;{'\n'}
  <span className="tok-attr">name</span>         = <span className="tok-string">"tf-instance-2"</span>{'\n'}
  <span className="tok-attr">machine_type</span> = <span className="tok-string">"e2-micro"</span>{'\n'}
  <span className="tok-attr">zone</span>         = <span className="tok-variable">var.zone</span>{'\n'}
{'\n'}
  <span className="tok-keyword">boot_disk</span> &#123;{'\n'}
    <span className="tok-keyword">initialize_params</span> &#123;{'\n'}
      <span className="tok-attr">image</span> = <span className="tok-string">"debian-cloud/debian-11"</span>{'\n'}
    &#125;{'\n'}
  &#125;{'\n'}
{'\n'}
  <span className="tok-keyword">network_interface</span> &#123;{'\n'}
    <span className="tok-attr">network</span> = <span className="tok-string">"default"</span>{'\n'}
  &#125;{'\n'}
&#125;</code></pre>

                        <h3><i className="ti ti-terminal" />import コマンドの実行</h3>
                        <pre><code><span className="tok-command">terraform</span> import module.instances.google_compute_instance.tf-instance-1 projects/&lt;PROJECT_ID&gt;/zones/&lt;ZONE&gt;/instances/tf-instance-1{'\n'}
<span className="tok-command">terraform</span> import module.instances.google_compute_instance.tf-instance-2 projects/&lt;PROJECT_ID&gt;/zones/&lt;ZONE&gt;/instances/tf-instance-2</code></pre>

                        <h3><i className="ti ti-git-compare" />plan → apply</h3>
                        <pre><code><span className="tok-command">terraform</span> plan{'\n'}
<span className="tok-command">terraform</span> apply</code></pre>
                        <p style={{ fontSize: '13px' }}>
                            <i className="ti ti-link" style={{ color: 'var(--color-text-tertiary)' }} /> 根拠: <a className="ext-link" href="https://developer.hashicorp.com/terraform/cli/commands/import" target="_blank" rel="noreferrer">developer.hashicorp.com/terraform/cli/commands/import</a> ／ <a className="ext-link" href="https://developer.hashicorp.com/terraform/cli/import/usage" target="_blank" rel="noreferrer">developer.hashicorp.com/terraform/cli/import/usage</a>
                        </p>
                    </section>

                    <section id="sec6">
                        <h2><span className="num">6</span>Task 3: リモートバックエンド（Cloud Storage）への切り替え</h2>
                        <h3><i className="ti ti-help-circle" />なぜ remote backend が必要なのか</h3>
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

                        <h3><i className="ti ti-bucket" />バケットリソースの作成（storage module）</h3>
                        <div className="code-label">modules/storage/storage.tf</div>
                        <pre><code><span className="tok-keyword">resource</span> <span className="tok-string">"google_storage_bucket"</span> <span className="tok-string">"storage_bucket"</span> &#123;{'\n'}
  <span className="tok-attr">name</span>                        = <span className="tok-string">"&lt;Bucket Name&gt;"</span>{'\n'}
  <span className="tok-attr">location</span>                    = <span className="tok-variable">var.region</span>{'\n'}
  <span className="tok-attr">force_destroy</span>               = <span className="tok-boolean">true</span>{'\n'}
  <span className="tok-attr">uniform_bucket_level_access</span> = <span className="tok-boolean">true</span>{'\n'}
&#125;</code></pre>
                        <div className="code-label">main.tf</div>
                        <pre><code><span className="tok-keyword">module</span> <span className="tok-string">"storage"</span> &#123;{'\n'}
  <span className="tok-attr">source</span>     = <span className="tok-string">"./modules/storage"</span>{'\n'}
  <span className="tok-attr">project_id</span> = <span className="tok-variable">var.project_id</span>{'\n'}
  <span className="tok-attr">region</span>     = <span className="tok-variable">var.region</span>{'\n'}
  <span className="tok-attr">zone</span>       = <span className="tok-variable">var.zone</span>{'\n'}
&#125;</code></pre>
                        <pre><code><span className="tok-command">terraform</span> init{'\n'}
<span className="tok-command">terraform</span> apply</code></pre>

                        <h3><i className="ti ti-arrows-transfer-up" />remote backend の設定と移行フロー</h3>
                        <div className="mermaid-wrap">
                            <MermaidDiagram chart={DIAGRAMS.REMOTE_BACKEND_FLOW} ariaLabel="リモートバックエンド（GCS）への移行フロー図" preserveNaturalScale />
                        </div>
                        <div className="code-label">main.tf</div>
                        <pre><code><span className="tok-keyword">terraform</span> &#123;{'\n'}
  <span className="tok-keyword">backend</span> <span className="tok-string">"gcs"</span> &#123;{'\n'}
    <span className="tok-attr">bucket</span> = <span className="tok-string">"&lt;Bucket Name&gt;"</span>{'\n'}
    <span className="tok-attr">prefix</span> = <span className="tok-string">"terraform/state"</span>{'\n'}
  &#125;{'\n'}
{'\n'}
  <span className="tok-keyword">required_providers</span> &#123;{'\n'}
    <span className="tok-attr">google</span> = &#123;{'\n'}
      <span className="tok-attr">source</span>  = <span className="tok-string">"hashicorp/google"</span>{'\n'}
      <span className="tok-attr">version</span> = <span className="tok-string">"~&gt; 5.0"</span>{'\n'}
    &#125;{'\n'}
  &#125;{'\n'}
&#125;</code></pre>
                        <div className="callout warning">
                            <div className="callout-title"><i className="ti ti-alert-triangle" />注意点</div>
                            <p>
                                <code>backend</code> ブロック内では <code>var.bucket_name</code> などの変数は使用できない。Hardcoded string または <code>-backend-config</code> を使用する。
                            </p>
                        </div>
                        <pre><code><span className="tok-command">terraform</span> init</code></pre>
                        <p style={{ fontSize: '13px' }}>
                            <i className="ti ti-link" style={{ color: 'var(--color-text-tertiary)' }} /> 根拠: <a className="ext-link" href="https://developer.hashicorp.com/terraform/language/backend/gcs" target="_blank" rel="noreferrer">developer.hashicorp.com/terraform/language/backend/gcs</a> ／ <a className="ext-link" href="https://cloud.google.com/storage/docs/uniform-bucket-level-access" target="_blank" rel="noreferrer">cloud.google.com/storage/docs/uniform-bucket-level-access</a>
                        </p>
                    </section>

                    <section id="sec7">
                        <h2><span className="num">7</span>Task 4: インフラの変更（Update in-place）</h2>
                        <h3><i className="ti ti-cpu" />machine_type の変更</h3>
                        <p>
                            既存の <code>tf-instance-1</code> と <code>tf-instance-2</code> の <code>machine_type</code> を <code>e2-standard-2</code> へ変更する。
                        </p>
                        <div className="code-label">modules/instances/instances.tf</div>
                        <pre><code><span className="tok-keyword">resource</span> <span className="tok-string">"google_compute_instance"</span> <span className="tok-string">"tf-instance-1"</span> &#123;{'\n'}
  <span className="tok-attr">name</span>                      = <span className="tok-string">"tf-instance-1"</span>{'\n'}
  <span className="tok-attr">machine_type</span>              = <span className="tok-string">"e2-standard-2"</span>{'\n'}
  <span className="tok-attr">zone</span>                      = <span className="tok-variable">var.zone</span>{'\n'}
  <span className="tok-attr">allow_stopping_for_update</span> = <span className="tok-boolean">true</span>{'\n'}
  <span className="tok-comment"># ...</span>{'\n'}
&#125;</code></pre>

                        <h3><i className="ti ti-server-2" />3台目のインスタンス追加</h3>
                        <pre><code><span className="tok-keyword">resource</span> <span className="tok-string">"google_compute_instance"</span> <span className="tok-string">"tf-instance-3"</span> &#123;{'\n'}
  <span className="tok-attr">name</span>                      = <span className="tok-string">"tf-instance-3"</span>{'\n'}
  <span className="tok-attr">machine_type</span>              = <span className="tok-string">"e2-standard-2"</span>{'\n'}
  <span className="tok-attr">zone</span>                      = <span className="tok-variable">var.zone</span>{'\n'}
  <span className="tok-attr">allow_stopping_for_update</span> = <span className="tok-boolean">true</span>{'\n'}
{'\n'}
  <span className="tok-keyword">boot_disk</span> &#123;{'\n'}
    <span className="tok-keyword">initialize_params</span> &#123;{'\n'}
      <span className="tok-attr">image</span> = <span className="tok-string">"debian-cloud/debian-11"</span>{'\n'}
    &#125;{'\n'}
  &#125;{'\n'}
{'\n'}
  <span className="tok-keyword">network_interface</span> &#123;{'\n'}
    <span className="tok-attr">network</span> = <span className="tok-string">"default"</span>{'\n'}
  &#125;{'\n'}
&#125;</code></pre>

                        <h3><i className="ti ti-arrows-shuffle" />変更・追加のワークフロー</h3>
                        <div className="mermaid-wrap">
                            <MermaidDiagram chart={DIAGRAMS.UPDATE_WORKFLOW} ariaLabel="インフラの変更および追加のワークフロー図" preserveNaturalScale />
                        </div>
                        <pre><code><span className="tok-command">terraform</span> init{'\n'}
<span className="tok-command">terraform</span> apply</code></pre>
                        <p style={{ fontSize: '13px' }}>
                            <i className="ti ti-link" style={{ color: 'var(--color-text-tertiary)' }} /> 根拠: <a className="ext-link" href="https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_instance" target="_blank" rel="noreferrer">registry.terraform.io/.../compute_instance</a> ／ <a className="ext-link" href="https://developer.hashicorp.com/terraform/language/style" target="_blank" rel="noreferrer">developer.hashicorp.com/terraform/language/style</a>
                        </p>
                    </section>

                    <section id="sec8">
                        <h2><span className="num">8</span>Task 5: リソースの削除（Destroy）</h2>
                        <h3><i className="ti ti-bulb" />Terraform における「削除」の正しい考え方</h3>
                        <p>
                            Terraform では、クラウドコンソールから直接インスタンスを消すのではなく、<strong>「設定ファイルから resource ブロックを削除し、apply する」</strong>ことでリソースを削除するのがベストプラクティスである。
                        </p>
                        <div className="mermaid-wrap">
                            <MermaidDiagram chart={DIAGRAMS.DESTROY_WORKFLOW} ariaLabel="リソースの削除（Destroy）のワークフロー図" preserveNaturalScale />
                        </div>
                        <pre><code><span className="tok-comment"># instances.tf から google_compute_instance.tf-instance-3 ブロックを削除した後</span>{'\n'}
<span className="tok-command">terraform</span> init{'\n'}
<span className="tok-command">terraform</span> apply</code></pre>
                        <p style={{ fontSize: '13px' }}>
                            <i className="ti ti-link" style={{ color: 'var(--color-text-tertiary)' }} /> 根拠: <a className="ext-link" href="https://developer.hashicorp.com/terraform/language/resources/destroy" target="_blank" rel="noreferrer">developer.hashicorp.com/terraform/language/resources/destroy</a> ／ <a className="ext-link" href="https://developer.hashicorp.com/terraform/cli/commands/destroy" target="_blank" rel="noreferrer">developer.hashicorp.com/terraform/cli/commands/destroy</a>
                        </p>
                    </section>

                    <section id="sec9">
                        <h2><span className="num">9</span>Task 6: Registry モジュールの活用（VPC &amp; Subnet）</h2>
                        <h3><i className="ti ti-recycle" />なぜ自作せず Registry モジュールを使うのか</h3>
                        <p>
                            ネットワーク（VPC / サブネット / ルートテーブル / NAT 等）は考慮すべきパラメータが多く、自作すると記述量が増えてテスト保守コストが跳ね上がる。Google Cloud 公式の Terraform Registry モジュールを使うことで、ベストプラクティスに則った高品質な VPC を簡潔に定義できる。
                        </p>

                        <h3><i className="ti ti-git-branch" />モジュールの参照関係</h3>
                        <div className="mermaid-wrap">
                            <MermaidDiagram chart={DIAGRAMS.MODULE_RELATION} ariaLabel="Terraform Registry モジュールの参照関係図" preserveNaturalScale />
                        </div>

                        <h3><i className="ti ti-file-code" />main.tf へのモジュール追加</h3>
                        <pre><code><span className="tok-keyword">module</span> <span className="tok-string">"vpc"</span> &#123;{'\n'}
  <span className="tok-attr">source</span>  = <span className="tok-string">"terraform-google-modules/network/google"</span>{'\n'}
  <span className="tok-attr">version</span> = <span className="tok-string">"10.0.0"</span>{'\n'}
{'\n'}
  <span className="tok-attr">project_id</span>   = <span className="tok-variable">var.project_id</span>{'\n'}
  <span className="tok-attr">network_name</span> = <span className="tok-string">"&lt;VPC Name&gt;"</span>{'\n'}
  <span className="tok-attr">routing_mode</span> = <span className="tok-string">"GLOBAL"</span>{'\n'}
{'\n'}
  <span className="tok-attr">subnets</span> = [{'\n'}
    &#123;{'\n'}
      <span className="tok-attr">subnet_name</span>   = <span className="tok-string">"subnet-01"</span>{'\n'}
      <span className="tok-attr">subnet_ip</span>     = <span className="tok-string">"10.10.10.0/24"</span>{'\n'}
      <span className="tok-attr">subnet_region</span> = <span className="tok-variable">var.region</span>{'\n'}
    &#125;,{'\n'}
    &#123;{'\n'}
      <span className="tok-attr">subnet_name</span>   = <span className="tok-string">"subnet-02"</span>{'\n'}
      <span className="tok-attr">subnet_ip</span>     = <span className="tok-string">"10.10.20.0/24"</span>{'\n'}
      <span className="tok-attr">subnet_region</span> = <span className="tok-variable">var.region</span>{'\n'}
    &#125;,{'\n'}
  ]{'\n'}
&#125;</code></pre>
                        <pre><code><span className="tok-command">terraform</span> init{'\n'}
<span className="tok-command">terraform</span> apply</code></pre>

                        <h3><i className="ti ti-plug-connected" />インスタンスをサブネットに接続する</h3>
                        <div className="code-label">modules/instances/instances.tf</div>
                        <pre><code><span className="tok-keyword">resource</span> <span className="tok-string">"google_compute_instance"</span> <span className="tok-string">"tf-instance-1"</span> &#123;{'\n'}
  <span className="tok-comment"># ...</span>{'\n'}
  <span className="tok-keyword">network_interface</span> &#123;{'\n'}
    <span className="tok-attr">network</span>    = <span className="tok-variable">module.vpc.network_name</span>{'\n'}
    <span className="tok-attr">subnetwork</span> = <span className="tok-string">"subnet-01"</span>{'\n'}
    <span className="tok-keyword">access_config</span> &#123;&#125;{'\n'}
  &#125;{'\n'}
&#125;{'\n'}
{'\n'}
<span className="tok-keyword">resource</span> <span className="tok-string">"google_compute_instance"</span> <span className="tok-string">"tf-instance-2"</span> &#123;{'\n'}
  <span className="tok-comment"># ...</span>{'\n'}
  <span className="tok-keyword">network_interface</span> &#123;{'\n'}
    <span className="tok-attr">network</span>    = <span className="tok-variable">module.vpc.network_name</span>{'\n'}
    <span className="tok-attr">subnetwork</span> = <span className="tok-string">"subnet-02"</span>{'\n'}
    <span className="tok-keyword">access_config</span> &#123;&#125;{'\n'}
  &#125;{'\n'}
&#125;</code></pre>
                        <pre><code><span className="tok-command">terraform</span> init{'\n'}
<span className="tok-command">terraform</span> apply</code></pre>
                        <p style={{ fontSize: '13px' }}>
                            <i className="ti ti-link" style={{ color: 'var(--color-text-tertiary)' }} /> 根拠: <a className="ext-link" href="https://registry.terraform.io/modules/terraform-google-modules/network/google/latest" target="_blank" rel="noreferrer">registry.terraform.io/modules/terraform-google-modules/network/google/latest</a>
                        </p>
                    </section>

                    <section id="sec10">
                        <h2><span className="num">10</span>Task 7: ファイアウォールルールの設定</h2>
                        <h3><i className="ti ti-shield-half" />GCP のファイアウォールの基本方針</h3>
                        <p>
                            Google Cloud の VPC は、デフォルトでは ingress（内向き）通信を暗黙的にすべて拒否する設計になっている。そのため、VM 間やインターネットからの通信を許可するには、明示的に firewall ルールを作成する必要がある。
                        </p>
                        <div className="mermaid-wrap">
                            <MermaidDiagram chart={DIAGRAMS.FIREWALL_FLOW} ariaLabel="ファイアウォールルールによる通信許可フロー図" preserveNaturalScale />
                        </div>

                        <h3><i className="ti ti-firewall" />firewall リソースの実装</h3>
                        <pre><code><span className="tok-keyword">resource</span> <span className="tok-string">"google_compute_firewall"</span> <span className="tok-string">"tf-firewall"</span> &#123;{'\n'}
  <span className="tok-attr">name</span>    = <span className="tok-string">"tf-firewall"</span>{'\n'}
  <span className="tok-attr">network</span> = <span className="tok-variable">module.vpc.network_self_link</span>{'\n'}
{'\n'}
  <span className="tok-keyword">allow</span> &#123;{'\n'}
    <span className="tok-attr">protocol</span> = <span className="tok-string">"tcp"</span>{'\n'}
    <span className="tok-attr">ports</span>    = [<span className="tok-string">"80"</span>]{'\n'}
  &#125;{'\n'}
{'\n'}
  <span className="tok-attr">source_ranges</span> = [<span className="tok-string">"0.0.0.0/0"</span>]{'\n'}
&#125;</code></pre>
                        <pre><code><span className="tok-command">terraform</span> init{'\n'}
<span className="tok-command">terraform</span> apply</code></pre>

                        <h3><i className="ti ti-plug" />疎通確認</h3>
                        <pre><code><span className="tok-command">curl</span> <span className="tok-flag">-m 5</span> http://&lt;tf-instance-2の外部IP&gt;:80</code></pre>
                        <p style={{ fontSize: '13px' }}>
                            <i className="ti ti-link" style={{ color: 'var(--color-text-tertiary)' }} /> 根拠: <a className="ext-link" href="https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_firewall" target="_blank" rel="noreferrer">registry.terraform.io/.../compute_firewall</a> ／ <a className="ext-link" href="https://cloud.google.com/firewall/docs/firewalls" target="_blank" rel="noreferrer">cloud.google.com/firewall/docs/firewalls</a>
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
                                <i className="ti ti-flag-check" />各 Task 完了時の習慣
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
                                    <i className="ti ti-brand-google" />
                                    Google Cloud 公式ドキュメント
                                    <span className="count">3</span>
                                </div>
                                <div className="source-list">
                                    <a className="source-row" href="https://cloud.google.com/shell/docs/configuring-cloud-shell" target="_blank" rel="noreferrer">
                                        <span className="source-row-icon gcp">
                                            <i className="ti ti-terminal-2" />
                                        </span>
                                        <span className="source-row-text">
                                            <span className="source-row-title">Cloud Shell の環境永続化（.customize_environment）</span>
                                            <span className="source-row-url">cloud.google.com/shell/docs/configuring-cloud-shell</span>
                                        </span>
                                        <i className="ti ti-chevron-right source-row-chevron" />
                                    </a>
                                    <a className="source-row" href="https://cloud.google.com/storage/docs/uniform-bucket-level-access" target="_blank" rel="noreferrer">
                                        <span className="source-row-icon gcp">
                                            <i className="ti ti-shield-lock" />
                                        </span>
                                        <span className="source-row-text">
                                            <span className="source-row-title">Uniform bucket-level access について</span>
                                            <span className="source-row-url">cloud.google.com/storage/docs/uniform-bucket-level-access</span>
                                        </span>
                                        <i className="ti ti-chevron-right source-row-chevron" />
                                    </a>
                                    <a className="source-row" href="https://cloud.google.com/firewall/docs/firewalls" target="_blank" rel="noreferrer">
                                        <span className="source-row-icon gcp">
                                            <i className="ti ti-firewall" />
                                        </span>
                                        <span className="source-row-text">
                                            <span className="source-row-title">VPC ファイアウォールルールの概要</span>
                                            <span className="source-row-url">cloud.google.com/firewall/docs/firewalls</span>
                                        </span>
                                        <i className="ti ti-chevron-right source-row-chevron" />
                                    </a>
                                </div>
                            </div>

                            <div className="source-group">
                                <div className="source-group-title registry">
                                    <i className="ti ti-package" />
                                    Terraform Registry（プロバイダー / モジュール）
                                    <span className="count">4</span>
                                </div>
                                <div className="source-list">
                                    <a className="source-row" href="https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_instance" target="_blank" rel="noreferrer">
                                        <span className="source-row-icon registry">
                                            <i className="ti ti-server" />
                                        </span>
                                        <span className="source-row-text">
                                            <span className="source-row-title">google_compute_instance リソースリファレンス</span>
                                            <span className="source-row-url">registry.terraform.io/providers/hashicorp/google/.../compute_instance</span>
                                        </span>
                                        <i className="ti ti-chevron-right source-row-chevron" />
                                    </a>
                                    <a className="source-row" href="https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/storage_bucket" target="_blank" rel="noreferrer">
                                        <span className="source-row-icon registry">
                                            <i className="ti ti-bucket" />
                                        </span>
                                        <span className="source-row-text">
                                            <span className="source-row-title">google_storage_bucket リソースリファレンス</span>
                                            <span className="source-row-url">registry.terraform.io/providers/hashicorp/google/.../storage_bucket</span>
                                        </span>
                                        <i className="ti ti-chevron-right source-row-chevron" />
                                    </a>
                                    <a className="source-row" href="https://registry.terraform.io/modules/terraform-google-modules/network/google/latest" target="_blank" rel="noreferrer">
                                        <span className="source-row-icon registry">
                                            <i className="ti ti-network" />
                                        </span>
                                        <span className="source-row-text">
                                            <span className="source-row-title">terraform-google-modules/network/google モジュール</span>
                                            <span className="source-row-url">registry.terraform.io/modules/terraform-google-modules/network/google</span>
                                        </span>
                                        <i className="ti ti-chevron-right source-row-chevron" />
                                    </a>
                                    <a className="source-row" href="https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_firewall" target="_blank" rel="noreferrer">
                                        <span className="source-row-icon registry">
                                            <i className="ti ti-shield" />
                                        </span>
                                        <span className="source-row-text">
                                            <span className="source-row-title">google_compute_firewall リソースリファレンス</span>
                                            <span className="source-row-url">registry.terraform.io/providers/hashicorp/google/.../compute_firewall</span>
                                        </span>
                                        <i className="ti ti-chevron-right source-row-chevron" />
                                    </a>
                                </div>
                            </div>

                            <div className="source-group">
                                <div className="source-group-title hashicorp">
                                    <i className="ti ti-book-2" />
                                    HashiCorp Terraform 言語・CLI ドキュメント
                                    <span className="count">9</span>
                                </div>
                                <div className="source-list">
                                    <a className="source-row" href="https://developer.hashicorp.com/terraform/language/modules" target="_blank" rel="noreferrer">
                                        <span className="source-row-icon hashicorp">
                                            <i className="ti ti-puzzle" />
                                        </span>
                                        <span className="source-row-text">
                                            <span className="source-row-title">Terraform Modules の基本</span>
                                            <span className="source-row-url">developer.hashicorp.com/terraform/language/modules</span>
                                        </span>
                                        <i className="ti ti-chevron-right source-row-chevron" />
                                    </a>
                                    <a className="source-row" href="https://developer.hashicorp.com/terraform/language/values/variables" target="_blank" rel="noreferrer">
                                        <span className="source-row-icon hashicorp">
                                            <i className="ti ti-variable" />
                                        </span>
                                        <span className="source-row-text">
                                            <span className="source-row-title">Input Variables の定義方法</span>
                                            <span className="source-row-url">developer.hashicorp.com/terraform/language/values/variables</span>
                                        </span>
                                        <i className="ti ti-chevron-right source-row-chevron" />
                                    </a>
                                    <a className="source-row" href="https://developer.hashicorp.com/terraform/cli/commands/import" target="_blank" rel="noreferrer">
                                        <span className="source-row-icon hashicorp">
                                            <i className="ti ti-download" />
                                        </span>
                                        <span className="source-row-text">
                                            <span className="source-row-title">terraform import コマンドリファレンス</span>
                                            <span className="source-row-url">developer.hashicorp.com/terraform/cli/commands/import</span>
                                        </span>
                                        <i className="ti ti-chevron-right source-row-chevron" />
                                    </a>
                                    <a className="source-row" href="https://developer.hashicorp.com/terraform/cli/import/usage" target="_blank" rel="noreferrer">
                                        <span className="source-row-icon hashicorp">
                                            <i className="ti ti-file-description" />
                                        </span>
                                        <span className="source-row-text">
                                            <span className="source-row-title">Import の使い方ガイド</span>
                                            <span className="source-row-url">developer.hashicorp.com/terraform/cli/import/usage</span>
                                        </span>
                                        <i className="ti ti-chevron-right source-row-chevron" />
                                    </a>
                                    <a className="source-row" href="https://developer.hashicorp.com/terraform/language/backend/gcs" target="_blank" rel="noreferrer">
                                        <span className="source-row-icon hashicorp">
                                            <i className="ti ti-cloud-lock" />
                                        </span>
                                        <span className="source-row-text">
                                            <span className="source-row-title">GCS Backend（remote backend）設定リファレンス</span>
                                            <span className="source-row-url">developer.hashicorp.com/terraform/language/backend/gcs</span>
                                        </span>
                                        <i className="ti ti-chevron-right source-row-chevron" />
                                    </a>
                                    <a className="source-row" href="https://developer.hashicorp.com/terraform/language/state" target="_blank" rel="noreferrer">
                                        <span className="source-row-icon hashicorp">
                                            <i className="ti ti-database" />
                                        </span>
                                        <span className="source-row-text">
                                            <span className="source-row-title">Terraform State の概念</span>
                                            <span className="source-row-url">developer.hashicorp.com/terraform/language/state</span>
                                        </span>
                                        <i className="ti ti-chevron-right source-row-chevron" />
                                    </a>
                                    <a className="source-row" href="https://developer.hashicorp.com/terraform/language/resources/destroy" target="_blank" rel="noreferrer">
                                        <span className="source-row-icon hashicorp">
                                            <i className="ti ti-trash" />
                                        </span>
                                        <span className="source-row-text">
                                            <span className="source-row-title">リソースの削除（Destroy）に関する言語ドキュメント</span>
                                            <span className="source-row-url">developer.hashicorp.com/terraform/language/resources/destroy</span>
                                        </span>
                                        <i className="ti ti-chevron-right source-row-chevron" />
                                    </a>
                                    <a className="source-row" href="https://developer.hashicorp.com/terraform/cli/commands/destroy" target="_blank" rel="noreferrer">
                                        <span className="source-row-icon hashicorp">
                                            <i className="ti ti-terminal" />
                                        </span>
                                        <span className="source-row-text">
                                            <span className="source-row-title">terraform destroy コマンドリファレンス</span>
                                            <span className="source-row-url">developer.hashicorp.com/terraform/cli/commands/destroy</span>
                                        </span>
                                        <i className="ti ti-chevron-right source-row-chevron" />
                                    </a>
                                    <a className="source-row" href="https://developer.hashicorp.com/terraform/language/style" target="_blank" rel="noreferrer">
                                        <span className="source-row-icon hashicorp">
                                            <i className="ti ti-ruler-2" />
                                        </span>
                                        <span className="source-row-text">
                                            <span className="source-row-title">Terraform Style Guide（命名規則・構成のベストプラクティス）</span>
                                            <span className="source-row-url">developer.hashicorp.com/terraform/language/style</span>
                                        </span>
                                        <i className="ti ti-chevron-right source-row-chevron" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>

            <footer className="footer">
                <i className="ti ti-brand-terraform" />
                <span>Build Infrastructure with Terraform on Google Cloud — Challenge Lab 完全攻略ガイド</span>
            </footer>
        </div>
    );
}
