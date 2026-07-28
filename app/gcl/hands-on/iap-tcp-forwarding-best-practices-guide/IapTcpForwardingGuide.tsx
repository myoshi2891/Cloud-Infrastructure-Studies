'use client';

import { MermaidDiagram } from '@/components/MermaidDiagram';
import NavBar from './NavBar';
import { DIAGRAMS } from './constants';
import './page.css';

export default function IapTcpForwardingGuide() {
    return (
        <div className="iap-guide-page">
            <div className="layout">
                <NavBar />

                <main>
                    <header className="page-header">
                        <span className="eyebrow">GOOGLE CLOUD · SECURITY</span>
                        <h1>
                            IAP（Identity-Aware Proxy）TCP フォワーディング ベストプラクティスガイド
                        </h1>
                        <p className="subtitle">
                            外部IPなしのVMへ安全に接続する ― 初学者向けステップバイステップ解説
                        </p>
                        <div className="meta-line">
                            <span>
                                <b>対象読者:</b> Google Cloud
                                を学び始めた初学者〜VMの踏み台構成を見直したいエンジニア
                            </span>
                            <span>
                                <b>前提知識:</b>
                                コンソールの基本操作、VPC・ファイアウォールの初歩
                            </span>
                        </div>
                    </header>

                    {/* 1. このガイドについて */}
                    <section className="content-section" id="1-このガイドについて">
                        <h2 id="1-このガイドについて">1. このガイドについて</h2>
                        <p>
                            このガイドは、「外部IPアドレスを持たないVM（Linux/Windows）に、Identity-Aware
                            Proxy（IAP）のTCPフォワーディング機能を使って安全にSSH/RDP接続する」というハンズオン内容を題材に、
                            <strong>実務で使うベストプラクティス</strong>の観点から解説し直したものです。
                        </p>
                        <p>
                            ハンズオンそのものは学習用に単純化されているため、本ガイドでは各ステップについて
                        </p>
                        <ol type="1">
                            <li>ハンズオンで行っている操作の意味</li>
                            <li>
                                本番環境で採用すべきベストプラクティス（ハンズオンとの差分がある場合は明記）
                            </li>
                            <li>公式ドキュメントなど根拠となる出典URL</li>
                        </ol>
                        <p>の3点をセットで示します。</p>
                        <hr />
                    </section>

                    {/* 2. IAPとは何か、なぜ使うのか */}
                    <section className="content-section" id="2-iapとは何かなぜ使うのか">
                        <h2 id="2-iapとは何かなぜ使うのか">2. IAPとは何か、なぜ使うのか</h2>
                        <h3 id="21-課題-踏み台サーバーと外部ipのリスク">
                            2.1 課題: 「踏み台サーバー」と外部IPのリスク
                        </h3>
                        <p>
                            従来型のインフラでは、社内ネットワークの外からVMに接続するために、以下のいずれかが必要でした。
                        </p>
                        <ul>
                            <li>VMに外部IPアドレスを割り当てて直接SSH/RDPを開放する</li>
                            <li>
                                踏み台（Bastion）サーバーを外部公開し、そこを経由して内部VMへ接続する
                            </li>
                        </ul>
                        <p>
                            どちらの方式も、<strong>インターネットに露出するポートが常に存在する</strong>という点で攻撃対象領域（アタックサーフェス）を広げてしまいます。
                        </p>

                        <h3 id="22-iapというアプローチ">2.2 IAPというアプローチ</h3>
                        <p>
                            IAP TCP フォワーディングは、Google が提唱する
                            <strong>BeyondCorp（ゼロトラストネットワーク）</strong>
                            の考え方に基づく機能です。VM側にはポートを外部公開せず、代わりに次の流れでアクセスを仲介します。
                        </p>
                        <ul>
                            <li>
                                クライアント（gcloud CLI・ブラウザ・IAP
                                Desktopなど）がIAPに対してHTTPSでトンネル確立を要求する
                            </li>
                            <li>
                                IAPは要求元のIDに対して
                                <strong>IAMポリシー</strong>（「誰が」「どのVMに」アクセスできるか）を判定する
                            </li>
                            <li>
                                許可された場合のみ、HTTPSでラップされたTCPトラフィック（SSHやRDP）をVMの内部IPへ中継する
                            </li>
                        </ul>
                        <p>
                            つまり「ネットワークの位置（社内かどうか）」ではなく「<strong>IDと権限</strong>」でアクセス可否を決めるのがIAPの本質です。この仕組みにより、VMは外部IPアドレスを一切持たずに運用できます。
                        </p>
                        <blockquote>
                            <p>
                                参考:{' '}
                                <a
                                    href="https://docs.cloud.google.com/iap/docs/tcp-forwarding-overview"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    TCP forwarding overview（Google Cloud公式）
                                </a>
                            </p>
                        </blockquote>
                        <hr />
                    </section>

                    {/* 3. 全体アーキテクチャ */}
                    <section className="content-section" id="3-全体アーキテクチャ">
                        <h2 id="3-全体アーキテクチャ">3. 全体アーキテクチャ</h2>
                        <p>ハンズオンで構築する構成は次の通りです。</p>

                        <MermaidDiagram
                            chart={DIAGRAMS.architecture}
                            ariaLabel="IAP TCPフォワーディング全体アーキテクチャ図"
                        />

                        <ul>
                            <li>
                                <code>linux-iap</code> と <code>windows-iap</code> は
                                <strong>外部IPアドレスを持たない</strong>デモ用インスタンスです。
                            </li>
                            <li>
                                <code>windows-connectivity</code> は、学習のために外部IPを持たせた検証専用VMで、ここから <code>gcloud</code> やIAP Desktopを操作してIAP経由の接続を確認します。
                            </li>
                            <li>
                                実際の本番運用では、この「踏み台的に使うクライアント」自体も管理者の手元PC（会社支給端末など）に置き換えることができます。
                            </li>
                        </ul>
                        <hr />
                    </section>

                    {/* 4. 作業の全体像 */}
                    <section className="content-section" id="4-作業の全体像">
                        <h2 id="4-作業の全体像">4. 作業の全体像</h2>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">タスク</th>
                                        <th scope="col">目的</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>IAP TCP forwarding APIの有効化</td>
                                        <td>プロジェクトでIAPのTCP機能を使えるようにする</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>VMインスタンスの作成</td>
                                        <td>外部IPなしのVM2台＋検証用VM1台を用意する</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>接続不可であることの確認</td>
                                        <td>「外部IPがないと直接は繋がらない」ことを体感する</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>ファイアウォールルールの作成</td>
                                        <td>IAPの送信元IP範囲からの通信のみを許可する</td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>IAM権限の付与</td>
                                        <td>「誰が」IAPトンネルを使えるかを最小権限で設定する</td>
                                    </tr>
                                    <tr>
                                        <td>6</td>
                                        <td>IAP Desktopでの接続</td>
                                        <td>GUIツールでSSH/RDP接続を体験する</td>
                                    </tr>
                                    <tr>
                                        <td>7</td>
                                        <td>gcloud CLIでのトンネリング</td>
                                        <td>CLIでSSHトンネル・RDPトンネルを手動で張る</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <hr />
                    </section>

                    {/* 5. ステップ別解説 */}
                    <section className="content-section" id="5-ステップ別解説">
                        <h2 id="5-ステップ別解説">5. ステップ別解説</h2>

                        <h3 id="51-task-1-iap-tcp-forwarding-apiの有効化">
                            5.1 Task 1: IAP TCP forwarding APIの有効化
                        </h3>
                        <p>
                            <strong>操作</strong>: ナビゲーションメニュー → 「APIとサービス」→「ライブラリ」→「Cloud Identity-Aware Proxy API」を検索して有効化する。
                        </p>
                        <p>
                            <strong>ポイント</strong>: IAPは「HTTPS経由でIAP対応アプリを保護する機能」と「TCPフォワーディングでVMに接続する機能」の2つの側面がありますが、どちらも同じ <code>Cloud Identity-Aware Proxy API</code> の有効化が前提になります。API自体の有効化は課金を発生させるものではなく、以降の設定（ファイアウォール・IAM）が本体です。
                        </p>
                        <blockquote>
                            <p>
                                参考:{' '}
                                <a
                                    href="https://docs.cloud.google.com/iap/docs"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Identity-Aware Proxy ドキュメント（Google Cloud公式）
                                </a>
                            </p>
                        </blockquote>
                        <hr />

                        <h3 id="52-task-2-vmインスタンスの作成ベストプラクティス注記">
                            5.2 Task 2: VMインスタンスの作成（ベストプラクティス注記）
                        </h3>
                        <p>ハンズオンでは3台のVMを作成します。</p>
                        <ul>
                            <li><code>linux-iap</code>: Linux、外部IPなし</li>
                            <li><code>windows-iap</code>: Windows Server、外部IPなし</li>
                            <li>
                                <code>windows-connectivity</code>: 検証用、外部IPあり、フルアクセスのアクセススコープ
                            </li>
                        </ul>
                        <p><strong>本番運用でのベストプラクティス</strong>:</p>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">項目</th>
                                        <th scope="col">ハンズオンの設定</th>
                                        <th scope="col">本番でのベストプラクティス</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>外部IP</td>
                                        <td>業務VMは「なし」に設定</td>
                                        <td>
                                            同様に「なし」を徹底し、必要な外向き通信はCloud NATで代替する
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>サービスアカウントのアクセススコープ</td>
                                        <td>検証VMのみ「Cloud APIへのフルアクセス」を許可</td>
                                        <td>
                                            本番VMでは用途に応じた<strong>最小限のスコープ</strong>、または専用サービスアカウント＋IAMロールの組み合わせを使う
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>ネットワークタグ</td>
                                        <td>特に設定なし</td>
                                        <td>
                                            ファイアウォールルールの対象を絞るため、役割ごとにネットワークタグを付与しておく
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p>
                            「フルアクセス」のアクセススコープはハンズオンを単純化するためのものであり、本番環境では権限の過剰付与（Over-Privilege）につながるため推奨されません。
                        </p>
                        <hr />

                        <h3 id="53-task-3-接続不可であることの確認">
                            5.3 Task 3: 接続不可であることの確認
                        </h3>
                        <p>
                            外部IPを持たない <code>linux-iap</code> にSSHボタンで接続しようとするとエラーになり、<code>windows-iap</code> へのRDPも同様に失敗します。これは<strong>設計通りの動作</strong>です。
                        </p>
                        <p>
                            <strong>学びのポイント</strong>: SSH/RDPボタン自体はクリックできる状態でも、実際には「外部IPアドレスがないため接続できません」というメッセージが表示されます。これは、外部IPの有無とコンソールUIの見た目が必ずしも一致しないため、VM詳細ページでボタンにカーソルを合わせて明示的に確認する習慣が重要であることを示しています。
                        </p>
                        <hr />

                        <h3 id="54-task-4-ファイアウォールルールの作成重要な差分あり">
                            5.4 Task 4: ファイアウォールルールの作成（重要な差分あり）
                        </h3>
                        <p>ハンズオンの設定はこちらです。</p>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">項目</th>
                                        <th scope="col">設定値</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>名前</td>
                                        <td>allow-ingress-from-iap</td>
                                    </tr>
                                    <tr>
                                        <td>トラフィックの方向</td>
                                        <td>Ingress</td>
                                    </tr>
                                    <tr>
                                        <td>ターゲット</td>
                                        <td>ネットワーク内のすべてのインスタンス</td>
                                    </tr>
                                    <tr>
                                        <td>ソースフィルタ</td>
                                        <td>IPv4範囲</td>
                                    </tr>
                                    <tr>
                                        <td>ソースIPv4範囲</td>
                                        <td><code>35.235.240.0/20</code></td>
                                    </tr>
                                    <tr>
                                        <td>プロトコルとポート</td>
                                        <td>TCP 22（SSH）、3389（RDP）</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p>
                            <code>35.235.240.0/20</code> は <strong>IAPがTCPフォワーディングに使用する固定のIPアドレス範囲</strong>であり、この範囲以外からの通信を許可しても、IAP経由の接続は成立しません。IPv6環境の場合は <code>2600:2d00:1:7::/64</code> を使用します。
                        </p>
                        <blockquote>
                            <p>
                                参考:{' '}
                                <a
                                    href="https://docs.cloud.google.com/iap/docs/using-tcp-forwarding"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Use IAP for TCP forwarding（Google Cloud公式）
                                </a>
                            </p>
                        </blockquote>
                        <p>
                            <strong>ベストプラクティスとの差分</strong>: ハンズオンでは学習を簡単にするため「ネットワーク内のすべてのインスタンス」をターゲットにしていますが、これはGoogle自身が「多くの場合、避けるべき選択肢」と明言している設定です。理由は、対象を絞らないと、本来意図していない他のVMまでこのルールの影響範囲に入ってしまうためです。
                        </p>

                        <MermaidDiagram
                            chart={DIAGRAMS.firewall}
                            ariaLabel="ファイアウォールターゲット設計フロー図"
                        />

                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">方式</th>
                                        <th scope="col">特徴</th>
                                        <th scope="col">向いているケース</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>すべてのインスタンス</td>
                                        <td>設定は簡単だが、意図しないVMにも適用されるリスクがある</td>
                                        <td>検証・学習環境のみ</td>
                                    </tr>
                                    <tr>
                                        <td>ターゲットタグ</td>
                                        <td>ワークロードの役割ごとにグルーピングしやすい</td>
                                        <td>多くの本番環境での標準的な選択</td>
                                    </tr>
                                    <tr>
                                        <td>ターゲットサービスアカウント</td>
                                        <td>
                                            タグより厳格。編集権限だけでなく該当サービスアカウントの使用権限も必要になるため改ざんされにくい
                                        </td>
                                        <td>ワークロードIDベースでアクセス制御したい環境</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <blockquote>
                            <p>参考:</p>
                            <ul>
                                <li>
                                    <a
                                        href="https://docs.cloud.google.com/firewall/docs/firewalls"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        VPC firewall rules（Google Cloud公式・ターゲットの絞り込み方針）
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://handbook.gitlab.com/handbook/security/best-practices/google-cloud-security-best-practices/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Google Cloud Security Best Practices（GitLab Handbook）
                                    </a>
                                </li>
                            </ul>
                        </blockquote>
                        <hr />

                        <h3 id="55-task-5-iam権限の付与最小権限の原則">
                            5.5 Task 5: IAM権限の付与（最小権限の原則）
                        </h3>
                        <p>
                            ハンズオンでは、「セキュリティ」→「Identity-Aware Proxy」の「SSH and TCP Resources」タブから、<strong>VM単位で</strong> <code>windows-connectivity</code> のサービスアカウントと学習用アカウントに <code>roles/iap.tunnelResourceAccessor</code>（IAP-Secured Tunnel User）ロールを付与します。
                        </p>

                        <MermaidDiagram
                            chart={DIAGRAMS.iamSequence}
                            ariaLabel="IAMアクセス検証シーケンス図"
                        />

                        <p>
                            <strong>このハンズオンが既に良い点</strong>: <code>roles/iap.tunnelResourceAccessor</code> を<strong>プロジェクト全体ではなくVM単位</strong>で付与している点は、最小権限の原則（Principle of Least Privilege）に沿ったベストプラクティスです。
                        </p>
                        <p>
                            <strong>さらに踏み込んだベストプラクティス</strong>: 本番環境では、VM単位の付与に加えて <strong>IAM条件（IAM Conditions）</strong> を使い、特定のポート番号のみに限定したり、コントラクター向けに有効期限付きでアクセスを許可したりすることが推奨されます。
                        </p>

                        <MermaidDiagram
                            chart={DIAGRAMS.iamDesign}
                            ariaLabel="IAM権限設計フロー図"
                        />

                        <p>
                            CLIで同等の設定を行う場合の代表的なコマンドは次の通りです（値は環境に合わせて置き換えてください）。
                        </p>
                        <pre className="codeblock">
                            <div className="code-line">gcloud compute instances add-iam-policy-binding INSTANCE_NAME \</div>
                            <div className="code-line">  --zone=ZONE \</div>
                            <div className="code-line">  --member="user:EMAIL" \</div>
                            <div className="code-line">  --role="roles/iap.tunnelResourceAccessor"</div>
                        </pre>
                        <p>さらにポートを絞り込む場合は <code>--condition</code> を付与します。</p>
                        <pre className="codeblock">
                            <div className="code-line">gcloud compute instances add-iam-policy-binding INSTANCE_NAME \</div>
                            <div className="code-line">  --zone=ZONE \</div>
                            <div className="code-line">  --member="group:EMAIL" \</div>
                            <div className="code-line">  --role="roles/iap.tunnelResourceAccessor" \</div>
                            <div className="code-line">  --condition="expression=destination.port==22,title=ssh-only"</div>
                        </pre>
                        <blockquote>
                            <p>参考:</p>
                            <ul>
                                <li>
                                    <a
                                        href="https://docs.cloud.google.com/iap/docs/using-tcp-forwarding"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Use IAP for TCP forwarding（ロール付与のガイド・Google Cloud公式）
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://docs.cloud.google.com/iam/docs/roles-permissions/iap"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Identity-Aware Proxy roles and permissions（Google Cloud公式）
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://oneuptime.com/blog/post/2026-02-17-how-to-restrict-iap-tcp-tunneling-to-specific-vm-instances-and-ports-using-iam-conditions-in-gcp/view"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        How to Restrict IAP TCP Tunneling to Specific VM Instances and Ports（IAM Conditionsの実践例）
                                    </a>
                                </li>
                            </ul>
                        </blockquote>
                        <hr />

                        <h3 id="56-task-6-iap-desktopでの接続">5.6 Task 6: IAP Desktopでの接続</h3>
                        <p>
                            IAP Desktopは、GoogleのSolutions Architectsチームが開発するオープンソースのWindowsアプリケーションで、IAP TCPフォワーディングを使ってSSH/RDP接続をGUIで管理できます（Googleの公式サポート対象製品ではない点に注意してください）。
                        </p>
                        <p><strong>接続までの流れ</strong>:</p>
                        <ol type="1">
                            <li><code>windows-connectivity</code> インスタンスへRDP接続する</li>
                            <li>
                                デスクトップ上のIAP Desktopを起動し、Googleアカウントでサインインする
                            </li>
                            <li>接続先プロジェクトを追加する</li>
                            <li>
                                対象VM（<code>windows-iap</code>）をダブルクリックし、初回接続時は「Generate new credentials」で認証情報を生成する
                            </li>
                        </ol>
                        <p>
                            IAP Desktop自体も内部的にはIAP TCPフォワーディングを利用しているため、<strong>Task 4のファイアウォールルールとTask 5のIAMロールが正しく設定されていることが前提</strong>になります。
                        </p>
                        <blockquote>
                            <p>参考:</p>
                            <ul>
                                <li>
                                    <a
                                        href="https://github.com/GoogleCloudPlatform/iap-desktop"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        IAP Desktop 公式GitHubリポジトリ
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://googlecloudplatform.github.io/iap-desktop/control-access-to-vms/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Control access to VMs（IAP Desktop公式ドキュメント）
                                    </a>
                                </li>
                            </ul>
                        </blockquote>
                        <hr />

                        <h3 id="57-task-7-gcloud-cliによるsshrdpトンネリング">
                            5.7 Task 7: gcloud CLIによるSSH/RDPトンネリング
                        </h3>
                        <p>
                            <strong>SSH接続の場合</strong>は、<code>gcloud compute ssh</code> コマンドが自動的にIAP経由のトンネルを検知して利用します。
                        </p>
                        <pre className="codeblock">
                            <div className="code-line">gcloud compute ssh linux-iap --zone=ZONE</div>
                        </pre>
                        <p>
                            <strong>RDP接続の場合</strong>は、RDPプロトコル自体がgcloudに組み込まれていないため、<strong>手動でローカルにトンネルを張り</strong>、Windowsのリモートデスクトップ接続アプリからそのトンネル（<code>localhost:ポート番号</code>）へ接続します。
                        </p>
                        <pre className="codeblock">
                            <div className="code-line">gcloud compute start-iap-tunnel windows-iap 3389 \</div>
                            <div className="code-line">  --local-host-port=localhost:0 \</div>
                            <div className="code-line">  --zone=ZONE</div>
                        </pre>
                        <p>
                            <code>--local-host-port=localhost:0</code> はローカルの空きポートを自動的に割り当てる指定です。表示された <code>Listening on port [XXXX]</code> のポート番号を、リモートデスクトップ接続アプリの接続先に <code>localhost:XXXX</code> として入力します。
                        </p>

                        <MermaidDiagram
                            chart={DIAGRAMS.rdpTunnel}
                            ariaLabel="gcloud RDPトンネル構築フロー図"
                        />

                        <blockquote>
                            <p>
                                参考:{' '}
                                <a
                                    href="https://docs.cloud.google.com/sdk/gcloud/reference/compute/start-iap-tunnel"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    gcloud compute start-iap-tunnel リファレンス（Google Cloud公式）
                                </a>
                            </p>
                        </blockquote>
                        <hr />
                    </section>

                    {/* 6. 本番環境への適用時のベストプラクティスまとめ */}
                    <section
                        className="content-section"
                        id="6-本番環境への適用時のベストプラクティスまとめ"
                    >
                        <h2 id="6-本番環境への適用時のベストプラクティスまとめ">
                            6. 本番環境への適用時のベストプラクティスまとめ
                        </h2>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">領域</th>
                                        <th scope="col">ハンズオンの内容</th>
                                        <th scope="col">本番運用でのベストプラクティス</th>
                                        <th scope="col">根拠</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>外部IP</td>
                                        <td>デモVMは外部IPなし</td>
                                        <td>全ての内部向けVMで外部IPを持たない方針を徹底</td>
                                        <td>
                                            <a
                                                href="https://docs.cloud.google.com/iap/docs/tcp-forwarding-overview"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                TCP forwarding overview
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>ファイアウォールのターゲット</td>
                                        <td>すべてのインスタンス</td>
                                        <td>
                                            ターゲットタグ、またはより厳密にはターゲットサービスアカウントで絞り込む
                                        </td>
                                        <td>
                                            <a
                                                href="https://docs.cloud.google.com/firewall/docs/firewalls"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                VPC firewall rules
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>ファイアウォールの送信元</td>
                                        <td><code>35.235.240.0/20</code>（IPv4）</td>
                                        <td>
                                            同左。IPv6環境では <code>2600:2d00:1:7::/64</code> も追加
                                        </td>
                                        <td>
                                            <a
                                                href="https://docs.cloud.google.com/iap/docs/using-tcp-forwarding"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Use IAP for TCP forwarding
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>IAMロールの付与範囲</td>
                                        <td>VM単位で付与（既にベストプラクティス）</td>
                                        <td>VM単位の付与に加えIAM Conditionsでポート・期限を制限</td>
                                        <td>
                                            <a
                                                href="https://docs.cloud.google.com/iam/docs/roles-permissions/iap"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Identity-Aware Proxy roles and permissions
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>サービスアカウントのスコープ</td>
                                        <td>検証VMにフルアクセスを許可</td>
                                        <td>
                                            用途ごとの最小権限スコープ、または専用サービスアカウント運用
                                        </td>
                                        <td>
                                            <a
                                                href="https://handbook.gitlab.com/handbook/security/best-practices/google-cloud-security-best-practices/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Google Cloud Security Best Practices
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>監査</td>
                                        <td>特に扱っていない</td>
                                        <td>
                                            Cloud LoggingでIAPトンネルの接続ログ（誰が・いつ・どのVMへ）を記録・監視する
                                        </td>
                                        <td>
                                            <a
                                                href="https://oneuptime.com/blog/post/2026-02-17-how-to-restrict-iap-tcp-tunneling-to-specific-vm-instances-and-ports-using-iam-conditions-in-gcp/view"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                How to Restrict IAP TCP Tunneling...（監査ログの例）
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <hr />
                    </section>

                    {/* 7. トラブルシューティング */}
                    <section className="content-section" id="7-トラブルシューティング">
                        <h2 id="7-トラブルシューティング">7. トラブルシューティング</h2>

                        <MermaidDiagram
                            chart={DIAGRAMS.troubleshooting}
                            ariaLabel="トラブルシューティング決定ツリー図"
                        />

                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">症状</th>
                                        <th scope="col">主な原因</th>
                                        <th scope="col">対処</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>SSH/RDPボタンを押しても接続できない</td>
                                        <td>外部IPがない状態でIAP未設定</td>
                                        <td>Task 4・Task 5の設定を確認</td>
                                    </tr>
                                    <tr>
                                        <td>ファイアウォールルールはあるのに繋がらない</td>
                                        <td>送信元範囲やポート番号の記載ミス</td>
                                        <td><code>35.235.240.0/20</code> とポート22/3389を再確認</td>
                                    </tr>
                                    <tr>
                                        <td>「Permission denied」エラー</td>
                                        <td>IAMロールが未付与、または付与先の粒度が誤っている</td>
                                        <td>
                                            該当プリンシパルに対象VM単位で <code>roles/iap.tunnelResourceAccessor</code> を付与
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>社内ネットワークからだけ繋がらない</td>
                                        <td>社内プロキシがIAP用ドメインをブロックしている</td>
                                        <td>IAP for TCP用ドメインを社内プロキシの許可リストに追加</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <blockquote>
                            <p>
                                参考:{' '}
                                <a
                                    href="https://docs.cloud.google.com/iap/docs/using-tcp-forwarding"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Use IAP for TCP forwarding（社内プロキシに関する注意事項）
                                </a>
                            </p>
                        </blockquote>
                        <hr />
                    </section>

                    {/* 8. まとめ */}
                    <section className="content-section" id="8-まとめ">
                        <h2 id="8-まとめ">8. まとめ</h2>
                        <ul>
                            <li>
                                IAP TCPフォワーディングは、VMに外部IPを持たせずに「IDと権限」でSSH/RDPアクセスを制御する、ゼロトラストに基づいた仕組みである
                            </li>
                            <li>
                                最低限必要なのは「①API有効化」「②IAPのIP範囲からのファイアウォール許可」「③IAM <code>roles/iap.tunnelResourceAccessor</code> の付与」の3点
                            </li>
                            <li>
                                ハンズオンの設定をそのまま本番へ持ち込むと、<strong>ファイアウォールのターゲットが広すぎる</strong>（すべてのインスタンス）という点が主な改善ポイントになる
                            </li>
                            <li>
                                IAM側は既にVM単位で権限を絞る良い設計になっており、さらにIAM Conditionsでポートや期限を絞ることで、より安全な運用に近づけられる
                            </li>
                        </ul>
                        <hr />
                    </section>

                    {/* 9. 参考文献 */}
                    <section className="content-section" id="9-参考文献">
                        <h2 id="9-参考文献">9. 参考文献</h2>
                        <ul className="ref-grid">
                            <li className="ref-card">
                                <a
                                    href="https://docs.cloud.google.com/iap/docs/tcp-forwarding-overview"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    TCP forwarding overview（Identity-Aware Proxy）
                                </a>
                            </li>
                            <li className="ref-card">
                                <a
                                    href="https://docs.cloud.google.com/iap/docs"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Identity-Aware Proxy documentation（目次ページ）
                                </a>
                            </li>
                            <li className="ref-card">
                                <a
                                    href="https://docs.cloud.google.com/iap/docs/using-tcp-forwarding"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Use IAP for TCP forwarding
                                </a>
                            </li>
                            <li className="ref-card">
                                <a
                                    href="https://docs.cloud.google.com/chrome-enterprise-premium/docs/securing-virtual-machines"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Securing virtual machines with IAP（Chrome Enterprise Premium）
                                </a>
                            </li>
                            <li className="ref-card">
                                <a
                                    href="https://docs.cloud.google.com/iap/docs/tcp-by-host"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Set up IAP TCP forwarding（IP/FQDN・Destination Group）
                                </a>
                            </li>
                            <li className="ref-card">
                                <a
                                    href="https://docs.cloud.google.com/sdk/gcloud/reference/compute/start-iap-tunnel"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    gcloud compute start-iap-tunnel リファレンス
                                </a>
                            </li>
                            <li className="ref-card">
                                <a
                                    href="https://docs.cloud.google.com/iam/docs/roles-permissions/iap"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Identity-Aware Proxy roles and permissions
                                </a>
                            </li>
                            <li className="ref-card">
                                <a
                                    href="https://docs.cloud.google.com/firewall/docs/firewalls"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    VPC firewall rules（ターゲットの絞り込み方針）
                                </a>
                            </li>
                            <li className="ref-card">
                                <a
                                    href="https://cloud.google.com/vpc/docs/add-remove-network-tags"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Add network tags（Virtual Private Cloud）
                                </a>
                            </li>
                            <li className="ref-card">
                                <a
                                    href="https://handbook.gitlab.com/handbook/security/best-practices/google-cloud-security-best-practices/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Google Cloud Security Best Practices（GitLab Handbook）
                                </a>
                            </li>
                            <li className="ref-card">
                                <a
                                    href="https://oneuptime.com/blog/post/2026-02-17-how-to-restrict-iap-tcp-tunneling-to-specific-vm-instances-and-ports-using-iam-conditions-in-gcp/view"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    How to Restrict IAP TCP Tunneling to Specific VM Instances and Ports（IAM Conditions実践例）
                                </a>
                            </li>
                            <li className="ref-card">
                                <a
                                    href="https://github.com/GoogleCloudPlatform/iap-desktop"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    IAP Desktop 公式GitHubリポジトリ
                                </a>
                            </li>
                            <li className="ref-card">
                                <a
                                    href="https://googlecloudplatform.github.io/iap-desktop/control-access-to-vms/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Control access to VMs（IAP Desktop公式ドキュメント）
                                </a>
                            </li>
                            <li className="ref-card">
                                <a
                                    href="https://github.com/GoogleCloudPlatform/iap-desktop/wiki/Installation"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Installation（IAP Desktop公式ドキュメント・ファイアウォールルール作成コマンド例）
                                </a>
                            </li>
                        </ul>
                    </section>

                    <footer className="page-footer">
                        本ガイドは公開されているハンズオン教材の内容を基に、Google Cloud公式ドキュメント等を出典として再構成したものです。各セクション内のリンク先で最新情報をご確認ください。
                    </footer>
                </main>
            </div>
        </div>
    );
}
