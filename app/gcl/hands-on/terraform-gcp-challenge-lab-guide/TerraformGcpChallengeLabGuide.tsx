'use client';

import React from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS } from './constants';
import './page.css';

export function TerraformGcpChallengeLabGuide() {
    return (
        <div className="terraform-lab-guide-page">
            <header>
                <h1>Terraform で構築する Google Cloud インフラ管理 完全攻略ガイド</h1>
            </header>

            <main>
                <section id="sec1">
                    <h2><span className="num">1</span>1. このラボで達成すること</h2>
                    <p>
                        このガイドでは、Terraform を使用して Google Cloud 上のインフラストラクチャ（Compute Engine、Cloud Storage、VPC ネットワーク、ファイアウォール）を構成・管理するハンズオンの完全な攻略手順と解説を提供する。
                    </p>
                    <p>
                        Challenge Lab は手順書がなく、既存の知識を応用して自力でゴールにたどり着く形式のため、「なぜこの設計にするのか」という一段階深い理解が重要になる。このガイドでは単なる手順だけでなく、その根拠となる公式ドキュメントも併せて示す。
                    </p>
                </section>

                <section id="sec2">
                    <h2><span className="num">2</span>2. 事前準備 &amp; バックエンド初期化</h2>
                    <p>すべての Task を終えると、以下のような完成形アーキテクチャが出来上がる。</p>
                    <div className="mermaid-wrap">
                        <MermaidDiagram chart={DIAGRAMS.ARCHITECTURE} preserveNaturalScale={true} />
                    </div>
                    <p>
                        ポイントは、<strong>VM インフラ（instances / network / firewall）</strong>と<strong>Terraform の状態管理基盤（storage bucket）</strong>が、役割としては明確に分離されていることである。バケットはアプリケーションのインフラではなく、Terraform 自身の運用基盤（state 管理）のために存在する。
                    </p>

                    <h3>事前準備: Terraform CLI のインストール</h3>
                    <p>
                        Cloud Shell はデフォルトでは Terraform がプリインストールされておらず、また Cloud Shell の VM 自体は非アクティブ状態が一定時間続くと破棄される一時的な環境である。そのため、素朴に <code>apt install terraform</code> を実行しただけでは、セッションが切れた瞬間にインストールが失われてしまう。
                    </p>
                    <p>
                        永続的なカスタマイズを行うには、ホームディレクトリ（<code>$HOME</code>）配下に環境構築スクリプトを配置し、Cloud Shell 起動時に自動実行される仕組みを使う。
                    </p>
                    <div className="code-label">~/.customize_environment</div>
                    <pre><code>{`#!/bin/sh
# HashiCorp GPG キーの追加とリポジトリの登録
sudo apt-get update && sudo apt-get install -y gnupg software-properties-common
wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor | sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg > /dev/null
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt-get update && sudo apt-get install -y terraform`}</code></pre>
                    <p>
                        このファイルに実行権限を付与（<code>chmod +x ~/.customize_environment</code>）しておくと、Cloud Shell VM の再作成時にも Terraform CLI が自動的に再インストールされる。
                    </p>
                </section>

                <section id="sec3">
                    <h2><span className="num">3</span>3. Task 1: インフラ構成要素のモジュール化</h2>
                    <h3>なぜ module に分割するのか</h3>
                    <p>
                        Terraform でインフラをコード化する際、すべてのリソース（VM、Storage、VPC、Firewall）を単一の <code>main.tf</code> に詰め込むと、コードの見通しが悪くなり、変更時の影響範囲の特定が困難になる。
                    </p>
                    <ul>
                        <li><strong>再利用性（Reusability）</strong>: 同じ構成のコンポーネントを複数環境（dev/stg/prod）で再利用できる</li>
                        <li><strong>カプセル化（Encapsulation）</strong>: モジュール内部の実装詳細を隠蔽し、必要な入出力（variables / outputs）のみを露出する</li>
                        <li><strong>チーム開発への拡張性</strong>: モジュール単位でレビュー・バージョン管理がしやすくなる</li>
                    </ul>

                    <h3>ディレクトリ構成</h3>
                    <div className="mermaid-wrap">
                        <MermaidDiagram chart={DIAGRAMS.DIRECTORY_STRUCTURE} preserveNaturalScale={true} />
                    </div>
                    <pre><code>{`mkdir -p modules/instances modules/storage
touch main.tf variables.tf
touch modules/instances/{instances.tf,outputs.tf,variables.tf}
touch modules/storage/{storage.tf,outputs.tf,variables.tf}`}</code></pre>

                    <h3>variables.tf の実装（ルート・各モジュール共通）</h3>
                    <p>
                        各 <code>variables.tf</code>（ルート、instances、storage の3ファイルすべて）に、同じ3つの変数を定義する。
                    </p>
                    <pre><code>{`variable "project_id" {
  description = "The GCP project ID"
  type        = string
  default     = "<あなたのプロジェクト ID>"
}

variable "region" {
  description = "The GCP region"
  type        = string
  default     = "us-east1"
}

variable "zone" {
  description = "The GCP zone"
  type        = string
  default     = "us-east1-b"
}`}</code></pre>

                    <h3>main.tf: Terraform block と Provider</h3>
                    <pre><code>{`terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
  zone    = var.zone
}`}</code></pre>

                    <h3>初期化</h3>
                    <pre><code>{`terraform init`}</code></pre>
                </section>

                <section id="sec4">
                    <h2><span className="num">4</span>4. Task 2: リソースのインポートと構成</h2>
                    <h3>import の位置づけを正しく理解する</h3>
                    <p>
                        <code>terraform import</code> は、<strong>「すでに GCP 上に存在する手動作成リソースを、Terraform の管理下（state ファイル）に取り込む」</strong>ためのコマンドである。
                    </p>

                    <h3>インポート手順のフロー</h3>
                    <div className="mermaid-wrap">
                        <MermaidDiagram chart={DIAGRAMS.IMPORT_FLOW} preserveNaturalScale={true} />
                    </div>

                    <h3>main.tf への module 参照追加</h3>
                    <pre><code>{`module "instances" {
  source     = "./modules/instances"
  project_id = var.project_id
  region     = var.region
  zone       = var.zone
}`}</code></pre>
                    <p>
                        module を追加・変更したら、必ず <code>terraform init</code> を再実行してモジュールを解決させる。
                    </p>

                    <h3>instances.tf: 最小限の resource ブロック</h3>
                    <pre><code>{`resource "google_compute_instance" "tf-instance-1" {
  name         = "tf-instance-1"
  machine_type = "e2-micro"
  zone         = var.zone

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
    }
  }

  network_interface {
    network = "default"
  }
}

resource "google_compute_instance" "tf-instance-2" {
  name         = "tf-instance-2"
  machine_type = "e2-micro"
  zone         = var.zone

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
    }
  }

  network_interface {
    network = "default"
  }
}`}</code></pre>

                    <h3>import コマンドの実行</h3>
                    <pre><code>{`terraform import module.instances.google_compute_instance.tf-instance-1 projects/<PROJECT_ID>/zones/<ZONE>/instances/tf-instance-1
terraform import module.instances.google_compute_instance.tf-instance-2 projects/<PROJECT_ID>/zones/<ZONE>/instances/tf-instance-2`}</code></pre>

                    <h3>plan → apply</h3>
                    <pre><code>{`terraform plan
terraform apply`}</code></pre>
                </section>

                <section id="sec5">
                    <h2><span className="num">5</span>5. Task 3: リモートバックエンド（Cloud Storage）への切り替え</h2>
                    <h3>なぜ remote backend が必要なのか</h3>
                    <p>
                        デフォルトでは、Terraform の状態（state）はローカルの <code>terraform.tfstate</code> に保存される。しかしローカル管理には「複数人での同時変更による衝突リスク」や「機密情報の露出リスク」があるため、実務では遠隔のオブジェクトストレージ＋ロック機構（GCS / S3）へ状態を保存する。
                    </p>

                    <h3>バケットリソースの作成（storage module）</h3>
                    <p><code>modules/storage/storage.tf</code> に以下を定義する。</p>
                    <pre><code>{`resource "google_storage_bucket" "storage_bucket" {
  name                        = "<Bucket Name>"
  location                    = var.region
  force_destroy               = true
  uniform_bucket_level_access = true
}`}</code></pre>

                    <h3>remote backend の設定と移行フロー</h3>
                    <div className="mermaid-wrap">
                        <MermaidDiagram chart={DIAGRAMS.REMOTE_BACKEND_FLOW} preserveNaturalScale={true} />
                    </div>
                    <div className="code-label">main.tf</div>
                    <pre><code>{`terraform {
  backend "gcs" {
    bucket = "<Bucket Name>"
    prefix = "terraform/state"
  }

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.0"
    }
  }
}`}</code></pre>
                    <div className="callout warning">
                        <div className="callout-title">注意点</div>
                        <p>
                            <code>backend</code> ブロック内では <code>var.bucket_name</code> などの変数は使用できない。Hardcoded string または <code>-backend-config</code> を使用する。
                        </p>
                    </div>
                    <pre><code>{`terraform init`}</code></pre>
                </section>

                <section id="sec6">
                    <h2><span className="num">6</span>6. Task 4: モジュールの修正とインフラ更新</h2>
                    <h3>machine_type の変更</h3>
                    <p><code>instances.tf</code> の machine_type を <code>e2-standard-2</code> へ変更する。</p>

                    <h3>3台目のインスタンス追加</h3>
                    <pre><code>{`resource "google_compute_instance" "tf-instance-3" {
  name         = "tf-instance-3"
  machine_type = "e2-standard-2"
  zone         = var.zone

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
    }
  }

  network_interface {
    network = "default"
  }

  allow_stopping_for_update = true
}`}</code></pre>

                    <h3>変更・追加のワークフロー</h3>
                    <div className="mermaid-wrap">
                        <MermaidDiagram chart={DIAGRAMS.UPDATE_WORKFLOW} preserveNaturalScale={true} />
                    </div>
                    <pre><code>{`terraform init
terraform apply`}</code></pre>
                </section>

                <section id="sec7">
                    <h2><span className="num">7</span>7. トラブルシューティング &amp; 実践的ノウハウ</h2>
                    <h3>Task 5: リソースの削除（Destroy）</h3>
                    <p>
                        Terraform では、クラウドコンソールから直接インスタンスを消すのではなく、<strong>「設定ファイルから resource ブロックを削除し、apply する」</strong>ことでリソースを削除するのがベストプラクティスである。
                    </p>
                    <div className="mermaid-wrap">
                        <MermaidDiagram chart={DIAGRAMS.DESTROY_WORKFLOW} preserveNaturalScale={true} />
                    </div>
                    <pre><code>{`terraform init
terraform apply`}</code></pre>

                    <h3>よくあるエラーと解決策</h3>
                    <div className="callout danger">
                        <div className="callout-title">エラー: ResourceAlreadyExists</div>
                        <p>
                            すでに GCP に存在するリソースを <code>apply</code> で作ろうとした場合に発生。<code>terraform import</code> を実行して state に取り込む。
                        </p>
                    </div>
                    <div className="callout warning">
                        <div className="callout-title">エラー: Cannot change machine_type without stopping</div>
                        <p>
                            稼働中の VM のスペック変更時に発生。リソースブロックに <code>allow_stopping_for_update = true</code> を追加する。
                        </p>
                    </div>
                </section>

                <section id="sec8">
                    <h2><span className="num">8</span>8. まとめ</h2>
                    <p>
                        本 Challenge Lab を通じて、Terraform による Google Cloud インフラ管理のライフサイクル全般（モジュール化、手動リソースの import、GCS リモートバックエンドでの状態共有、インプレース更新、VPC/ファイアウォール構築）を網羅した。
                    </p>
                </section>

                <section id="sec9">
                    <h2>Task 6: Registry モジュールの活用</h2>
                    <h3>モジュールの参照関係</h3>
                    <div className="mermaid-wrap">
                        <MermaidDiagram chart={DIAGRAMS.MODULE_RELATION} preserveNaturalScale={true} />
                    </div>

                    <h3>main.tf へのモジュール追加</h3>
                    <pre><code>{`module "vpc" {
  source  = "terraform-google-modules/network/google"
  version = "10.0.0"

  project_id   = var.project_id
  network_name = "<VPC Name>"
  routing_mode = "GLOBAL"

  subnets = [
    {
      subnet_name   = "subnet-01"
      subnet_ip     = "10.10.10.0/24"
      subnet_region = var.region
    },
    {
      subnet_name   = "subnet-02"
      subnet_ip     = "10.10.20.0/24"
      subnet_region = var.region
    },
  ]
}`}</code></pre>

                    <h3>インスタンスをサブネットに接続する</h3>
                    <pre><code>{`resource "google_compute_instance" "tf-instance-1" {
  # ...
  network_interface {
    network    = module.vpc.network_name
    subnetwork = "subnet-01"
    access_config {}
  }
}

resource "google_compute_instance" "tf-instance-2" {
  # ...
  network_interface {
    network    = module.vpc.network_name
    subnetwork = "subnet-02"
    access_config {}
  }
}`}</code></pre>
                </section>

                <section id="sec10">
                    <h2>Task 7: ファイアウォールルールの設定</h2>
                    <h3>firewall リソースの実装</h3>
                    <div className="mermaid-wrap">
                        <MermaidDiagram chart={DIAGRAMS.FIREWALL_FLOW} preserveNaturalScale={true} />
                    </div>
                    <pre><code>{`resource "google_compute_firewall" "tf-firewall" {
  name    = "tf-firewall"
  network = module.vpc.network_self_link

  allow {
    protocol = "tcp"
    ports    = ["80"]
  }

  source_ranges = ["0.0.0.0/0"]
}`}</code></pre>
                </section>

                <section id="sec11">
                    <h2>ベストプラクティス総まとめ</h2>
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
                </section>

                <section id="sec12">
                    <h2>参考文献・引用ソース一覧</h2>
                    <div className="source-groups">
                        <div className="source-group">
                            <div className="source-group-title gcp">
                                Google Cloud 公式ドキュメント <span className="count">3</span>
                            </div>
                            <div className="source-list">
                                <a className="source-row" href="https://cloud.google.com/shell/docs/configuring-cloud-shell" target="_blank" rel="noreferrer">
                                    <span className="source-row-text">
                                        <span className="source-row-title">Cloud Shell の環境永続化（.customize_environment）</span>
                                        <span className="source-row-url">cloud.google.com/shell/docs/configuring-cloud-shell</span>
                                    </span>
                                </a>
                                <a className="source-row" href="https://cloud.google.com/storage/docs/uniform-bucket-level-access" target="_blank" rel="noreferrer">
                                    <span className="source-row-text">
                                        <span className="source-row-title">Uniform bucket-level access について</span>
                                        <span className="source-row-url">cloud.google.com/storage/docs/uniform-bucket-level-access</span>
                                    </span>
                                </a>
                                <a className="source-row" href="https://cloud.google.com/firewall/docs/firewalls" target="_blank" rel="noreferrer">
                                    <span className="source-row-text">
                                        <span className="source-row-title">VPC ファイアウォールルールの概要</span>
                                        <span className="source-row-url">cloud.google.com/firewall/docs/firewalls</span>
                                    </span>
                                </a>
                            </div>
                        </div>

                        <div className="source-group">
                            <div className="source-group-title registry">
                                Terraform Registry（プロバイダー / モジュール） <span className="count">4</span>
                            </div>
                            <div className="source-list">
                                <a className="source-row" href="https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_instance" target="_blank" rel="noreferrer">
                                    <span className="source-row-text">
                                        <span className="source-row-title">google_compute_instance リソースリファレンス</span>
                                        <span className="source-row-url">registry.terraform.io/providers/hashicorp/google/.../compute_instance</span>
                                    </span>
                                </a>
                                <a className="source-row" href="https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/storage_bucket" target="_blank" rel="noreferrer">
                                    <span className="source-row-text">
                                        <span className="source-row-title">google_storage_bucket リソースリファレンス</span>
                                        <span className="source-row-url">registry.terraform.io/providers/hashicorp/google/.../storage_bucket</span>
                                    </span>
                                </a>
                                <a className="source-row" href="https://registry.terraform.io/modules/terraform-google-modules/network/google/latest" target="_blank" rel="noreferrer">
                                    <span className="source-row-text">
                                        <span className="source-row-title">terraform-google-modules/network/google モジュール</span>
                                        <span className="source-row-url">registry.terraform.io/modules/terraform-google-modules/network/google</span>
                                    </span>
                                </a>
                                <a className="source-row" href="https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/compute_firewall" target="_blank" rel="noreferrer">
                                    <span className="source-row-text">
                                        <span className="source-row-title">google_compute_firewall リソースリファレンス</span>
                                        <span className="source-row-url">registry.terraform.io/providers/hashicorp/google/.../compute_firewall</span>
                                    </span>
                                </a>
                            </div>
                        </div>

                        <div className="source-group">
                            <div className="source-group-title hashicorp">
                                HashiCorp Terraform 言語・CLI ドキュメント <span className="count">9</span>
                            </div>
                            <div className="source-list">
                                <a className="source-row" href="https://developer.hashicorp.com/terraform/language/modules" target="_blank" rel="noreferrer">
                                    <span className="source-row-text">
                                        <span className="source-row-title">Terraform Modules の基本</span>
                                        <span className="source-row-url">developer.hashicorp.com/terraform/language/modules</span>
                                    </span>
                                </a>
                                <a className="source-row" href="https://developer.hashicorp.com/terraform/language/values/variables" target="_blank" rel="noreferrer">
                                    <span className="source-row-text">
                                        <span className="source-row-title">Input Variables の定義方法</span>
                                        <span className="source-row-url">developer.hashicorp.com/terraform/language/values/variables</span>
                                    </span>
                                </a>
                                <a className="source-row" href="https://developer.hashicorp.com/terraform/cli/commands/import" target="_blank" rel="noreferrer">
                                    <span className="source-row-text">
                                        <span className="source-row-title">terraform import コマンドリファレンス</span>
                                        <span className="source-row-url">developer.hashicorp.com/terraform/cli/commands/import</span>
                                    </span>
                                </a>
                                <a className="source-row" href="https://developer.hashicorp.com/terraform/language/backend/gcs" target="_blank" rel="noreferrer">
                                    <span className="source-row-text">
                                        <span className="source-row-title">GCS Backend（remote backend）設定リファレンス</span>
                                        <span className="source-row-url">developer.hashicorp.com/terraform/language/backend/gcs</span>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="footer">
                <span>Build Infrastructure with Terraform on Google Cloud — Challenge Lab 完全攻略ガイド</span>
            </footer>
        </div>
    );
}
