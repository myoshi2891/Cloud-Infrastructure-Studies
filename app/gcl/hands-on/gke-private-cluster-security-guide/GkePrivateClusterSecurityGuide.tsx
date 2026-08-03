'use client';

import React, { useState, useEffect } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS, type DiagramId } from './constants';
import { NavBar } from './NavBar';

function Diagram({ id, label }: { id: DiagramId; label: string }) {
    const chart = DIAGRAMS[id];
    return (
        <div className="mermaid-block">
            <div className="mermaid-wrap">
                <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale />
            </div>
        </div>
    );
}

export function GkePrivateClusterSecurityGuide() {
    const [activeId, setActiveId] = useState<string>('overview');

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        const sectionElements = document.querySelectorAll<HTMLElement>('main section[id]');
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
        <div className="gke-security-guide-page">
            <div className="layout">
                <NavBar activeId={activeId} />

                <main className="main">
                    <div className="hero">
                        <span className="eyebrow">
                            <i className="ti ti-cloud-lock" />
                            GKE × IAM × ネットワークセキュリティ
                        </span>
                        <h1>GKE プライベートクラスタ セキュリティ実装ガイド</h1>
                        <p>
                            「Implement Cloud Security Fundamentals on Google
                            Cloud」チャレンジラボを題材に、最小権限のサービスアカウント設計からプライベートクラスタの構築、踏み台経由の動作検証まで、初学者にも分かるようベストプラクティスの根拠つきで解説します。
                        </p>
                    </div>

                    <section id="overview">
                        <h2>
                            <i className="ti ti-sitemap" />
                            1. このラボで何をするのか（全体像）
                        </h2>
                        <p>
                            Jooli Inc. の Orca チームの一員として、開発チームが使う{' '}
                            <strong>GKE プライベートクラスタ</strong>{' '}
                            を、組織のセキュリティ基準に沿って構築します。要求されているセキュリティ基準は、次の3本柱に整理できます。
                        </p>

                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">基準</th>
                                    <th scope="col">内容</th>
                                    <th scope="col">目的</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>最小権限の専用サービスアカウント</td>
                                    <td>
                                        Compute Engine
                                        のデフォルトSAを使わず、専用SAに必要最小限のロールのみ付与
                                    </td>
                                    <td>ノードやワークロードの侵害時の被害範囲を限定する</td>
                                </tr>
                                <tr>
                                    <td>プライベートクラスタ + 限定公開エンドポイント</td>
                                    <td>
                                        パブリックエンドポイントを無効化し、承認済みネットワークのみアクセス許可
                                    </td>
                                    <td>コントロールプレーンへの外部からの攻撃面をゼロにする</td>
                                </tr>
                                <tr>
                                    <td>踏み台（jumphost）経由の限定アクセス</td>
                                    <td>
                                        管理サブネットの <code>orca-jumphost</code> からのみ内部IPで接続
                                    </td>
                                    <td>管理アクセス経路を1点に集約し監査しやすくする</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="callout">
                            <i className="ti ti-info-circle" />
                            <div className="body">
                                この3層構成は Google 自身が GKE
                                のセキュリティ強化ガイドで推奨している内容そのものです。詳細は{' '}
                                <a
                                    href="https://cloud.google.com/kubernetes-engine/docs/how-to/hardening-your-cluster#use_least_privilege_sa"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Hardening your cluster&apos;s security
                                </a>{' '}
                                を参照してください。
                            </div>
                        </div>

                        <h3>全体アーキテクチャ</h3>
                        <Diagram id="mermaid-1" label="GKE プライベートクラスタ 全体アーキテクチャ図" />
                        <p style={{ fontSize: '13.5px', color: 'var(--color-muted-foreground, #6b7c93)', marginTop: '-14px' }}>
                            パブリックエンドポイントへの経路は物理的に無効化されているため、
                            <code>orca-jumphost</code>
                            を経由した内部IP通信だけが唯一の管理経路になります。（赤枠 = アクセス不可 / 緑枠 = 唯一の許可経路）
                        </p>

                        <h3>タスクの実行順序</h3>
                        <p>
                            タスクには依存関係があるため、この順序で進める必要があります。逆順に進めると「サービスアカウントが存在しない」「ロールが存在しない」といったエラーになります。
                        </p>
                        <Diagram id="mermaid-2" label="タスクの実行順序フローチャート" />
                    </section>

                    <section id="task1">
                        <h2>
                            <i className="ti ti-shield-lock" />
                            2. Task 1: カスタムセキュリティロールの作成
                        </h2>
                        <h3>ベストプラクティスの根拠</h3>
                        <p>
                            開発チームが要求しているのは「Cloud Storage
                            バケット・オブジェクトの作成・更新権限」です。ここで
                            <code>roles/storage.objectAdmin</code>
                            のような既存の広い事前定義ロールを安易に使うのは避けるべきです。IAMのベストプラクティスは常に「必要な権限だけを持つカスタムロールを作る」ことを推奨しています（
                            <a
                                href="https://cloud.google.com/iam/docs/creating-custom-roles"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Creating and managing custom roles
                            </a>
                            ）。
                        </p>

                        <p>今回付与すべき権限は次の5つのみです。</p>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">権限</th>
                                    <th scope="col">用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><code>storage.buckets.get</code></td>
                                    <td>バケットのメタデータ取得</td>
                                </tr>
                                <tr>
                                    <td><code>storage.objects.get</code></td>
                                    <td>オブジェクトの取得（ダウンロード）</td>
                                </tr>
                                <tr>
                                    <td><code>storage.objects.list</code></td>
                                    <td>オブジェクト一覧の取得</td>
                                </tr>
                                <tr>
                                    <td><code>storage.objects.update</code></td>
                                    <td>オブジェクトのメタデータ更新</td>
                                </tr>
                                <tr>
                                    <td><code>storage.objects.create</code></td>
                                    <td>オブジェクトの新規作成（アップロード）</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>手順（gcloud CLI）</h3>
                        <pre>
                            <code>
                                <div className="code-line">
                                    <span className="code-cmd">gcloud</span> <span className="code-param">iam roles create</span> <span className="code-val">orca_custom_security_role</span> \
                                </div>
                                <div className="code-line">
                                    <span className="code-param">  --project</span>=<span className="code-str">&lt;PROJECT_ID&gt;</span> \
                                </div>
                                <div className="code-line">
                                    <span className="code-param">  --title</span>=<span className="code-str">&quot;Custom Security Role&quot;</span> \
                                </div>
                                <div className="code-line">
                                    <span className="code-param">  --description</span>=<span className="code-str">&quot;Orca dev team storage object read/write permissions&quot;</span> \
                                </div>
                                <div className="code-line">
                                    <span className="code-param">  --permissions</span>=<span className="code-val">storage.buckets.get,storage.objects.get,storage.objects.list,storage.objects.update,storage.objects.create</span> \
                                </div>
                                <div className="code-line">
                                    <span className="code-param">  --stage</span>=<span className="code-val">GA</span>
                                </div>
                            </code>
                        </pre>

                        <div className="callout tip">
                            <i className="ti ti-bulb" />
                            <div className="body">
                                <strong>初学者向け補足</strong>
                                <br />
                                ・<code>--stage=GA</code>
                                は「本番運用可能な状態」を意味するフラグです。指定しないと
                                <code>ALPHA</code>
                                扱いになり、一部のツールで警告が出ることがあります。
                                <br />
                                ・ロールID（<code>orca_custom_security_role</code>）にはハイフンではなくアンダースコアまたは英数字を使う必要があります（gcloudの制約）。
                                <br />
                                ・タイトルは課題要件どおり
                                <code>Custom Security Role</code>
                                に設定します（採点システムがタイトルを確認するため）。
                            </div>
                        </div>
                        <p className="source-note">
                            根拠:{' '}
                            <a
                                href="https://cloud.google.com/sdk/gcloud/reference/iam/roles/create"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                gcloud iam roles create リファレンス
                            </a>
                        </p>
                    </section>

                    <section id="task2">
                        <h2>
                            <i className="ti ti-user-square-rounded" />
                            3. Task 2: サービスアカウントの作成
                        </h2>
                        <h3>ベストプラクティスの根拠</h3>
                        <p>
                            GKEのデフォルト設定では、ノードは Compute Engine
                            のデフォルトサービスアカウントを使用しますが、これはプロジェクト全体に対して広範な権限を持つため、ノードが侵害された場合のリスクが大きくなります。Google公式のクラスタ強化ガイドでは「ワークロードが必要とする最小限の権限セットを持つ、新しいカスタムサービスアカウントを作成する」ことを明確に推奨しています（
                            <a
                                href="https://cloud.google.com/kubernetes-engine/security/configure-node-service-accounts"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Configure GKE node service accounts
                            </a>
                            ）。
                        </p>

                        <h3>手順（gcloud CLI）</h3>
                        <pre>
                            <code>
                                <div className="code-line">
                                    <span className="code-cmd">gcloud</span> <span className="code-param">iam service-accounts create</span> <span className="code-val">orca-service-account</span> \
                                </div>
                                <div className="code-line">
                                    <span className="code-param">  --project</span>=<span className="code-str">&lt;PROJECT_ID&gt;</span> \
                                </div>
                                <div className="code-line">
                                    <span className="code-param">  --display-name</span>=<span className="code-str">&quot;Service Account&quot;</span>
                                </div>
                            </code>
                        </pre>

                        <div className="callout tip">
                            <i className="ti ti-bulb" />
                            <div className="body">
                                <strong>初学者向け補足</strong>
                                <br />
                                ・<code>--display-name</code> は課題要件どおり
                                <code>Service Account</code>
                                にします（採点で表示名を確認するため）。
                                <br />
                                ・作成後のメールアドレスは
                                <code>orca-service-account@&lt;PROJECT_ID&gt;.iam.gserviceaccount.com</code>
                                の形式になります。以降の手順で頻繁に使うので控えておきましょう。
                                <br />
                                ・「orca-」プレフィックスは課題の指示（すべての新規オブジェクトに付与）に従ったものです。
                            </div>
                        </div>
                        <p className="source-note">
                            根拠:{' '}
                            <a
                                href="https://cloud.google.com/iam/docs/service-accounts-create"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Create service accounts（IAM）
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://cloud.google.com/sdk/gcloud/reference/iam/service-accounts/create"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                gcloud iam service-accounts create リファレンス
                            </a>
                        </p>
                    </section>

                    <section id="task3">
                        <h2>
                            <i className="ti ti-link" />
                            4. Task 3: ロールのバインド
                        </h2>
                        <h3>なぜこの3つの組み込みロールなのか</h3>
                        <p>
                            GKEクラスタのサービスアカウントが最低限必要とする権限は、Googleの「Harden
                            your cluster&apos;s security」ガイドの{' '}
                            <strong>Use least privilege Google service accounts</strong>{' '}
                            セクションで明示されています。
                        </p>

                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">組み込みロール</th>
                                    <th scope="col">役割</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><code>roles/monitoring.viewer</code></td>
                                    <td>Cloud Monitoring のメトリクス閲覧</td>
                                </tr>
                                <tr>
                                    <td><code>roles/monitoring.metricWriter</code></td>
                                    <td>ノード / ワークロードのメトリクス書き込み</td>
                                </tr>
                                <tr>
                                    <td><code>roles/logging.logWriter</code></td>
                                    <td>Cloud Logging へのログ書き込み</td>
                                </tr>
                            </tbody>
                        </table>
                        <p className="source-note">
                            根拠:{' '}
                            <a
                                href="https://cloud.google.com/kubernetes-engine/docs/how-to/hardening-your-cluster#use_least_privilege_sa"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Hardening your cluster&apos;s security
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://cloud.google.com/logging/docs/access-control"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Cloud Logging アクセス制御
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://cloud.google.com/monitoring/access-control"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Cloud Monitoring アクセス制御
                            </a>
                        </p>

                        <p>
                            これに加えて、Task 1で作成したカスタムロール（Cloud Storage
                            権限）も同じサービスアカウントにバインドします。
                        </p>

                        <h3>バインド後の権限構成</h3>
                        <Diagram id="mermaid-3" label="サービスアカウントへのロールバインド構造図" />

                        <h3>手順（gcloud CLI）</h3>
                        <pre>
                            <code>
                                <div className="code-line">
                                    <span className="code-var">SA_EMAIL</span>=<span className="code-str">&quot;orca-service-account@&lt;PROJECT_ID&gt;.iam.gserviceaccount.com&quot;</span>
                                </div>
                                <div className="code-line"></div>
                                <div className="code-line">
                                    <span className="code-cmd">gcloud</span> <span className="code-param">projects add-iam-policy-binding</span> <span className="code-str">&lt;PROJECT_ID&gt;</span> \
                                </div>
                                <div className="code-line">
                                    <span className="code-param">  --member</span>=<span className="code-str">&quot;serviceAccount:${'{SA_EMAIL}'}&quot;</span> \
                                </div>
                                <div className="code-line">
                                    <span className="code-param">  --role</span>=<span className="code-str">&quot;roles/monitoring.viewer&quot;</span>
                                </div>
                                <div className="code-line"></div>
                                <div className="code-line">
                                    <span className="code-cmd">gcloud</span> <span className="code-param">projects add-iam-policy-binding</span> <span className="code-str">&lt;PROJECT_ID&gt;</span> \
                                </div>
                                <div className="code-line">
                                    <span className="code-param">  --member</span>=<span className="code-str">&quot;serviceAccount:${'{SA_EMAIL}'}&quot;</span> \
                                </div>
                                <div className="code-line">
                                    <span className="code-param">  --role</span>=<span className="code-str">&quot;roles/monitoring.metricWriter&quot;</span>
                                </div>
                                <div className="code-line"></div>
                                <div className="code-line">
                                    <span className="code-cmd">gcloud</span> <span className="code-param">projects add-iam-policy-binding</span> <span className="code-str">&lt;PROJECT_ID&gt;</span> \
                                </div>
                                <div className="code-line">
                                    <span className="code-param">  --member</span>=<span className="code-str">&quot;serviceAccount:${'{SA_EMAIL}'}&quot;</span> \
                                </div>
                                <div className="code-line">
                                    <span className="code-param">  --role</span>=<span className="code-str">&quot;roles/logging.logWriter&quot;</span>
                                </div>
                                <div className="code-line"></div>
                                <div className="code-line">
                                    <span className="code-cmd">gcloud</span> <span className="code-param">projects add-iam-policy-binding</span> <span className="code-str">&lt;PROJECT_ID&gt;</span> \
                                </div>
                                <div className="code-line">
                                    <span className="code-param">  --member</span>=<span className="code-str">&quot;serviceAccount:${'{SA_EMAIL}'}&quot;</span> \
                                </div>
                                <div className="code-line">
                                    <span className="code-param">  --role</span>=<span className="code-str">&quot;projects/&lt;PROJECT_ID&gt;/roles/orca_custom_security_role&quot;</span>
                                </div>
                            </code>
                        </pre>

                        <div className="callout tip">
                            <i className="ti ti-bulb" />
                            <div className="body">
                                <strong>初学者向け補足</strong>
                                <br />
                                ・カスタムロールをバインドする際、<code>--role</code> に指定するのは
                                <code>roles/xxx</code> ではなく
                                <code>projects/&lt;PROJECT_ID&gt;/roles/&lt;ROLE_ID&gt;</code>
                                という完全パスになる点に注意してください（組織レベルで作成した場合は
                                <code>organizations/&lt;ORG_ID&gt;/roles/&lt;ROLE_ID&gt;</code>
                                ）。
                                <br />
                                ・IAMの反映には数十秒〜数分のタイムラグがあることがあります。次のタスクに進む前に
                                <code>
                                    gcloud projects get-iam-policy &lt;PROJECT_ID&gt;
                                    --flatten=&quot;bindings[].members&quot;
                                    --filter=&quot;bindings.members:${'{SA_EMAIL}'}&quot;
                                </code>{' '}
                                で確認すると安心です。
                            </div>
                        </div>
                        <p className="source-note">
                            根拠:{' '}
                            <a
                                href="https://cloud.google.com/kubernetes-engine/docs/how-to/iam"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                GKE の IAM 許可ポリシーと事前定義ロール
                            </a>
                        </p>
                    </section>

                    <section id="task4">
                        <h2>
                            <i className="ti ti-lock" />
                            5. Task 4: プライベートクラスタの作成と設定
                        </h2>
                        <h3>プライベートクラスタの各オプションの意味</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">フラグ</th>
                                    <th scope="col">意味</th>
                                    <th scope="col">このラボでの要件</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><code>--enable-private-nodes</code></td>
                                    <td>ノードに外部IPを付与しない</td>
                                    <td>必須</td>
                                </tr>
                                <tr>
                                    <td><code>--enable-ip-alias</code></td>
                                    <td>VPCネイティブ（エイリアスIP）クラスタにする</td>
                                    <td>必須</td>
                                </tr>
                                <tr>
                                    <td><code>--enable-master-authorized-networks</code></td>
                                    <td>コントロールプレーンへのアクセス元を許可リストで制御</td>
                                    <td>必須</td>
                                </tr>
                                <tr>
                                    <td><code>--enable-private-endpoint</code></td>
                                    <td>
                                        管理エンドポイントを内部IPのみにする（パブリックエンドポイント無効）
                                    </td>
                                    <td>必須（最も厳格な設定）</td>
                                </tr>
                            </tbody>
                        </table>
                        <p>
                            <code>--enable-private-endpoint</code>
                            を指定すると、同一VPC内（またはピアリング/VPN経由）からしか管理エンドポイントに到達できなくなります。これが今回
                            <code>orca-jumphost</code> という踏み台が必要な理由です。
                        </p>
                        <p className="source-note">
                            根拠:{' '}
                            <a
                                href="https://cloud.google.com/kubernetes-engine/docs/how-to/legacy/network-isolation"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Creating a private cluster
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://cloud.google.com/kubernetes-engine/docs/how-to/advanced-private-cluster-config"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Customize your network isolation in GKE
                            </a>
                        </p>

                        <h3>手順①：クラスタの作成</h3>
                        <pre>
                            <code>
                                <div className="code-line">
                                    <span className="code-cmd">gcloud</span> <span className="code-param">container clusters create</span> <span className="code-val">orca-cluster-name</span> \
                                </div>
                                <div className="code-line">
                                    <span className="code-param">  --project</span>=<span className="code-str">&lt;PROJECT_ID&gt;</span> \
                                </div>
                                <div className="code-line">
                                    <span className="code-param">  --region</span>=<span className="code-str">&lt;REGION&gt;</span> \
                                </div>
                                <div className="code-line">
                                    <span className="code-param">  --network</span>=<span className="code-val">orca-build-vpc</span> \
                                </div>
                                <div className="code-line">
                                    <span className="code-param">  --subnetwork</span>=<span className="code-val">orca-build-subnet</span> \
                                </div>
                                <div className="code-line">
                                    <span className="code-param">  --service-account</span>=<span className="code-str">&quot;orca-service-account@&lt;PROJECT_ID&gt;.iam.gserviceaccount.com&quot;</span> \
                                </div>
                                <div className="code-line">
                                    <span className="code-param">  --enable-private-nodes</span> \
                                </div>
                                <div className="code-line">
                                    <span className="code-param">  --enable-private-endpoint</span> \
                                </div>
                                <div className="code-line">
                                    <span className="code-param">  --enable-ip-alias</span> \
                                </div>
                                <div className="code-line">
                                    <span className="code-param">  --enable-master-authorized-networks</span> \
                                </div>
                                <div className="code-line">
                                    <span className="code-param">  --master-authorized-networks</span>=<span className="code-val">&lt;TEMPORARY_CIDR_OR_OWN_IP&gt;/32</span>
                                </div>
                            </code>
                        </pre>

                        <div className="callout tip">
                            <i className="ti ti-bulb" />
                            <div className="body">
                                <strong>初学者向け補足</strong>
                                <br />
                                ・<code>--master-authorized-networks</code>
                                は作成時に最低1つのCIDRを要求されることが多いため、暫定的に自分の作業端末のIPなどを入れておき、手順②で
                                <code>orca-jumphost</code> の内部IPに更新します。
                                <br />
                                ・クラスタ名は課題要件どおり
                                <code>orca-</code> プレフィックスを付けて命名します（例:
                                <code>orca-cluster-name</code>
                                は実際のラボでは指定されたクラスタ名に置き換えてください）。
                                <br />
                                ・<code>--region</code> と <code>--zone</code> は
                                <strong>相互排他</strong>
                                です（両方指定すると gcloud がエラーになります）。リージョナルクラスタなら
                                <code>--region</code>、ゾーナルクラスタなら <code>--zone</code>{' '}
                                のどちらか一方だけを、課題ページで指定された値で使用します。本ガイドはリージョナルクラスタ前提で
                                <code>--region</code> に統一しているため、ゾーナルで作成した場合は
                                <code>update</code> / <code>get-credentials</code> も
                                <code>--zone</code> に読み替えてください。
                            </div>
                        </div>

                        <h3>手順②：jumphostの内部IPを承認済みネットワークに追加</h3>
                        <pre>
                            <code>
                                <div className="code-line">
                                    <span className="code-var">JUMP_IP</span>=$(<span className="code-cmd">gcloud</span> <span className="code-param">compute instances describe</span> <span className="code-val">orca-jumphost</span> \
                                </div>
                                <div className="code-line">
                                    <span className="code-param">  --zone</span>=<span className="code-str">&lt;ZONE&gt;</span> \
                                </div>
                                <div className="code-line">
                                    <span className="code-param">  --format</span>=<span className="code-str">&apos;get(networkInterfaces[0].networkIP)&apos;</span>)
                                </div>
                                <div className="code-line"></div>
                                <div className="code-line">
                                    <span className="code-cmd">gcloud</span> <span className="code-param">container clusters update</span> <span className="code-val">orca-cluster-name</span> \
                                </div>
                                <div className="code-line">
                                    <span className="code-param">  --region</span>=<span className="code-str">&lt;REGION&gt;</span> \
                                </div>
                                <div className="code-line">
                                    <span className="code-param">  --enable-master-authorized-networks</span> \
                                </div>
                                <div className="code-line">
                                    <span className="code-param">  --master-authorized-networks</span>=<span className="code-str">&quot;${'{JUMP_IP}'}/32&quot;</span>
                                </div>
                            </code>
                        </pre>

                        <div className="callout warn">
                            <i className="ti ti-alert-triangle" />
                            <div className="body">
                                <strong>なぜ /32 なのか</strong>：<code>/32</code>
                                は「このIPアドレス1つのみ」を意味するサブネットマスクです。ここを広い範囲（例:
                                <code>/24</code>
                                ）にしてしまうと、同じサブネット内の他のインスタンスからも管理エンドポイントにアクセスできてしまい、最小権限・最小露出の原則に反します。踏み台1台だけに絞り込むのがベストプラクティスです。
                            </div>
                        </div>
                    </section>

                    <section id="task5">
                        <h2>
                            <i className="ti ti-rocket" />
                            6. Task 5: アプリケーションのデプロイと動作検証
                        </h2>
                        <h3>踏み台からの接続の考え方</h3>
                        <p>
                            <code>--enable-private-endpoint</code>
                            を有効化したクラスタには、VPC外部は一切到達できません。そのため、同じ Orca
                            Build VPC 内（またはVPCピアリング経由でその内部IPに到達できる）の
                            <code>orca-jumphost</code> から接続する必要があります。
                        </p>
                        <p className="source-note">
                            根拠:{' '}
                            <a
                                href="https://cloud.google.com/kubernetes-engine/docs/how-to/cluster-access-for-kubectl"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Install kubectl and configure cluster access
                            </a>
                        </p>

                        <Diagram id="mermaid-4" label="踏み台経由の接続セットアップ手順" />

                        <h3>手順（orca-jumphost 上で実行）</h3>
                        <pre>
                            <code>
                                <div className="code-line"><span className="code-comment"># 1. 認証プラグインをインストール</span></div>
                                <div className="code-line"><span className="code-cmd">sudo apt-get install</span> <span className="code-val">google-cloud-sdk-gke-gcloud-auth-plugin</span></div>
                                <div className="code-line"></div>
                                <div className="code-line"><span className="code-comment"># 2. 環境変数を永続化</span></div>
                                <div className="code-line"><span className="code-cmd">echo</span> <span className="code-str">&quot;export USE_GKE_GCLOUD_AUTH_PLUGIN=True&quot;</span> &gt;&gt; ~/.bashrc</div>
                                <div className="code-line"><span className="code-cmd">source</span> ~/.bashrc</div>
                                <div className="code-line"></div>
                                <div className="code-line"><span className="code-comment"># 3. 内部IP経由でクレデンシャルを取得（--internal-ipが必須）</span></div>
                                <div className="code-line"><span className="code-cmd">gcloud</span> <span className="code-param">container clusters get-credentials</span> <span className="code-val">orca-cluster-name</span> \</div>
                                <div className="code-line">  <span className="code-param">--internal-ip</span> \</div>
                                <div className="code-line">  <span className="code-param">--project</span>=<span className="code-str">&lt;PROJECT_ID&gt;</span> \</div>
                                <div className="code-line">  <span className="code-param">--region</span>=<span className="code-str">&lt;REGION&gt;</span></div>
                                <div className="code-line"></div>
                                <div className="code-line"><span className="code-comment"># 4. 動作確認用の簡易アプリをデプロイ</span></div>
                                <div className="code-line"><span className="code-cmd">kubectl</span> <span className="code-param">create deployment</span> <span className="code-val">hello-server</span> <span className="code-param">--image</span>=<span className="code-str">gcr.io/google-samples/hello-app:1.0</span></div>
                                <div className="code-line"></div>
                                <div className="code-line"><span className="code-comment"># 5. デプロイの状態を確認</span></div>
                                <div className="code-line"><span className="code-cmd">kubectl</span> <span className="code-param">get deployments</span></div>
                                <div className="code-line"><span className="code-cmd">kubectl</span> <span className="code-param">get pods</span></div>
                            </code>
                        </pre>

                        <div className="callout tip">
                            <i className="ti ti-bulb" />
                            <div className="body">
                                <strong>初学者向け補足</strong>
                                <br />
                                ・2019年以降、GKEはkubectlの認証にOSS標準の機構ではなく
                                <code>gke-gcloud-auth-plugin</code>
                                を要求するようになりました。未インストールだと
                                <code>get-credentials</code>
                                は成功してもkubectlコマンド実行時に認証エラーになります。
                                <br />
                                ・<code>--internal-ip</code>
                                フラグを付け忘れると、コマンドはパブリックエンドポイントのIPでkubeconfigを生成しようとしますが、今回のクラスタにはパブリックエンドポイントが存在しないため接続に失敗します。
                                <br />
                                ・動作確認だけであれば
                                <code>kubectl get deployments</code> / <code>kubectl get pods</code>
                                でPodがRunning状態になっていることを確認すれば十分です（課題は「management
                                access が機能していること」の検証が目的のため、LoadBalancer
                                Serviceの公開は必須ではありません）。
                            </div>
                        </div>
                        <p className="source-note">
                            根拠:{' '}
                            <a
                                href="https://cloud.google.com/kubernetes-engine/docs/how-to/cluster-access-for-kubectl"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Install kubectl and configure cluster access
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://cloud.google.com/blog/products/containers-kubernetes/kubectl-auth-changes-in-gke"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Kubectl auth changes in GKE
                            </a>
                        </p>
                    </section>

                    <section id="troubleshooting">
                        <h2>
                            <i className="ti ti-alert-triangle" />
                            7. よくあるつまずきポイント
                        </h2>
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
                                    <td>
                                        get-credentials は成功するが kubectl get pods が
                                        <code>exec: gke-gcloud-auth-plugin not found</code> で失敗する
                                    </td>
                                    <td>認証プラグイン未インストール、または環境変数未反映</td>
                                    <td>
                                        <code>gcloud components install gke-gcloud-auth-plugin</code>
                                        実行後、ターミナルを開き直すか <code>source ~/.bashrc</code>
                                    </td>
                                </tr>
                                <tr>
                                    <td>kubectl がタイムアウトする</td>
                                    <td>
                                        <code>--internal-ip</code> を付けずに get-credentials
                                        を実行し、パブリックエンドポイント宛にkubeconfigが作られた
                                    </td>
                                    <td>
                                        kubeconfigを再取得（<code>--internal-ip</code>
                                        付き）、または既存contextを削除して再実行
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        クラスタ作成時に「service account does not have
                                        permission」等のエラー
                                    </td>
                                    <td>
                                        Task
                                        3のIAMバインドがまだ反映されていない、またはロールのバインド先を間違えた（プロジェクトではなくSA自体に対してroleを付与してしまった等）
                                    </td>
                                    <td>
                                        <code>add-iam-policy-binding</code>
                                        は<strong>プロジェクト</strong>に対して実行し、
                                        <code>--member</code>
                                        にSAを指定するのが正しい形。数分待って再試行
                                    </td>
                                </tr>
                                <tr>
                                    <td>カスタムロールのバインドで <code>role not found</code></td>
                                    <td>
                                        <code>--role</code>
                                        にカスタムロールの完全パスではなく短縮名を指定した
                                    </td>
                                    <td>
                                        <code>projects/&lt;PROJECT_ID&gt;/roles/&lt;ROLE_ID&gt;</code>
                                        の形式で指定し直す
                                    </td>
                                </tr>
                                <tr>
                                    <td>orca-jumphost からクラスタに到達できない</td>
                                    <td>
                                        jumphostのIPが承認済みネットワークに未登録、またはCIDRの誤り（
                                        <code>/32</code>以外を指定）
                                    </td>
                                    <td>
                                        <code>gcloud container clusters describe</code> の
                                        <code>masterAuthorizedNetworksConfig</code>
                                        を確認し、正しい内部IP＋<code>/32</code>で再設定
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    <section id="summary">
                        <h2>
                            <i className="ti ti-checklist" />
                            8. まとめ
                        </h2>
                        <p>このチャレンジラボは、GKEにおける「多層防御」の実践演習です。</p>

                        <div className="summary-grid">
                            <div className="summary-card">
                                <i className="ti ti-key" />
                                <h4>IAM層</h4>
                                <p>
                                    カスタムロール＋最小権限の組み込みロールで構成した専用サービスアカウント
                                </p>
                            </div>
                            <div className="summary-card">
                                <i className="ti ti-topology-star-3" />
                                <h4>ネットワーク層</h4>
                                <p>
                                    プライベートノード＋限定公開エンドポイント＋承認済みネットワーク(/32)
                                </p>
                            </div>
                            <div className="summary-card">
                                <i className="ti ti-door" />
                                <h4>アクセス経路の一元化</h4>
                                <p>踏み台（orca-jumphost）を唯一の管理経路とする</p>
                            </div>
                        </div>

                        <p style={{ marginTop: '20px' }}>
                            この3層構成は、Google自身がGKEクラスタ強化のベストプラクティスとして案内している内容と一致しており、実務のプロダクション環境構築でもそのまま応用できる考え方です。
                        </p>
                    </section>

                    <section id="references">
                        <h2>
                            <i className="ti ti-books" />
                            参考文献（根拠ソース）
                        </h2>
                        <ul className="source-list">
                            <li className="source-item">
                                <span className="source-num">1</span>
                                <div className="source-body">
                                    <div className="source-title">
                                        Hardening your cluster&apos;s security（最小権限サービスアカウントの節）
                                    </div>
                                    <a
                                        href="https://cloud.google.com/kubernetes-engine/docs/how-to/hardening-your-cluster#use_least_privilege_sa"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        cloud.google.com/kubernetes-engine/docs/how-to/hardening-your-cluster
                                    </a>
                                </div>
                            </li>
                            <li className="source-item">
                                <span className="source-num">2</span>
                                <div className="source-body">
                                    <div className="source-title">Configure GKE node service accounts</div>
                                    <a
                                        href="https://cloud.google.com/kubernetes-engine/security/configure-node-service-accounts"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        cloud.google.com/kubernetes-engine/security/configure-node-service-accounts
                                    </a>
                                </div>
                            </li>
                            <li className="source-item">
                                <span className="source-num">3</span>
                                <div className="source-body">
                                    <div className="source-title">Create service accounts（IAM）</div>
                                    <a
                                        href="https://cloud.google.com/iam/docs/service-accounts-create"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        cloud.google.com/iam/docs/service-accounts-create
                                    </a>
                                </div>
                            </li>
                            <li className="source-item">
                                <span className="source-num">4</span>
                                <div className="source-body">
                                    <div className="source-title">
                                        gcloud iam service-accounts create リファレンス
                                    </div>
                                    <a
                                        href="https://cloud.google.com/sdk/gcloud/reference/iam/service-accounts/create"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        cloud.google.com/sdk/gcloud/reference/iam/service-accounts/create
                                    </a>
                                </div>
                            </li>
                            <li className="source-item">
                                <span className="source-num">5</span>
                                <div className="source-body">
                                    <div className="source-title">
                                        Create and manage custom roles（IAM）
                                    </div>
                                    <a
                                        href="https://cloud.google.com/iam/docs/creating-custom-roles"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        cloud.google.com/iam/docs/creating-custom-roles
                                    </a>
                                </div>
                            </li>
                            <li className="source-item">
                                <span className="source-num">6</span>
                                <div className="source-body">
                                    <div className="source-title">gcloud iam roles create リファレンス</div>
                                    <a
                                        href="https://cloud.google.com/sdk/gcloud/reference/iam/roles/create"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        cloud.google.com/sdk/gcloud/reference/iam/roles/create
                                    </a>
                                </div>
                            </li>
                            <li className="source-item">
                                <span className="source-num">7</span>
                                <div className="source-body">
                                    <div className="source-title">
                                        Create IAM allow policies（GKEの事前定義ロール）
                                    </div>
                                    <a
                                        href="https://cloud.google.com/kubernetes-engine/docs/how-to/iam"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        cloud.google.com/kubernetes-engine/docs/how-to/iam
                                    </a>
                                </div>
                            </li>
                            <li className="source-item">
                                <span className="source-num">8</span>
                                <div className="source-body">
                                    <div className="source-title">
                                        Access control with IAM（Cloud Logging）
                                    </div>
                                    <a
                                        href="https://cloud.google.com/logging/docs/access-control"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        cloud.google.com/logging/docs/access-control
                                    </a>
                                </div>
                            </li>
                            <li className="source-item">
                                <span className="source-num">9</span>
                                <div className="source-body">
                                    <div className="source-title">
                                        Control access with IAM（Cloud Monitoring）
                                    </div>
                                    <a
                                        href="https://cloud.google.com/monitoring/access-control"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        cloud.google.com/monitoring/access-control
                                    </a>
                                </div>
                            </li>
                            <li className="source-item">
                                <span className="source-num">10</span>
                                <div className="source-body">
                                    <div className="source-title">Creating a private cluster</div>
                                    <a
                                        href="https://cloud.google.com/kubernetes-engine/docs/how-to/legacy/network-isolation"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        cloud.google.com/kubernetes-engine/docs/how-to/legacy/network-isolation
                                    </a>
                                </div>
                            </li>
                            <li className="source-item">
                                <span className="source-num">11</span>
                                <div className="source-body">
                                    <div className="source-title">
                                        Customize your network isolation in GKE（承認済みネットワーク / 限定公開エンドポイント）
                                    </div>
                                    <a
                                        href="https://cloud.google.com/kubernetes-engine/docs/how-to/advanced-private-cluster-config"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        cloud.google.com/kubernetes-engine/docs/how-to/advanced-private-cluster-config
                                    </a>
                                </div>
                            </li>
                            <li className="source-item">
                                <span className="source-num">12</span>
                                <div className="source-body">
                                    <div className="source-title">
                                        Install kubectl and configure cluster access（gke-gcloud-auth-plugin）
                                    </div>
                                    <a
                                        href="https://cloud.google.com/kubernetes-engine/docs/how-to/cluster-access-for-kubectl"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        cloud.google.com/kubernetes-engine/docs/how-to/cluster-access-for-kubectl
                                    </a>
                                </div>
                            </li>
                            <li className="source-item">
                                <span className="source-num">13</span>
                                <div className="source-body">
                                    <div className="source-title">
                                        Kubectl auth changes in GKE（gke-gcloud-auth-pluginの背景）
                                    </div>
                                    <a
                                        href="https://cloud.google.com/blog/products/containers-kubernetes/kubectl-auth-changes-in-gke"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        cloud.google.com/blog/products/containers-kubernetes/kubectl-auth-changes-in-gke
                                    </a>
                                </div>
                            </li>
                            <li className="source-item">
                                <span className="source-num">14</span>
                                <div className="source-body">
                                    <div className="source-title">
                                        Implement Cloud Security Fundamentals on Google Cloud: Challenge Lab（ラボ本体）
                                    </div>
                                    <a
                                        href="https://www.skills.google/focuses/14572"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        www.skills.google/focuses/14572
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </section>

                    <footer>
                        GKE Private Cluster Security Guide — Orca team challenge lab walkthrough
                    </footer>
                </main>
            </div>
        </div>
    );
}
