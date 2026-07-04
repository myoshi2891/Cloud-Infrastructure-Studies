'use client';

/**
 * Build a Secure Google Cloud Network ガイドのクライアントコンポーネント。
 * 本文マークアップ、Mermaid図のレンダリング、パケットフローアニメーションを含む。
 */

import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS } from './constants';
import NavBar from './NavBar';

export default function BuildASecureGoogleCloudNetworkGuide() {
    return (
        <div className="secure-network-page">
            <div className="shell">
                <NavBar />
                <main>
                    <div className="wrap">
                        {/* ---------- HERO ---------- */}
                        <section className="hero">
                            <span className="hero__eyebrow">Defense in Depth · 多層防御</span>
                            <h1>
                                Google Cloud
                                <br />
                                <span className="accent">ネットワークセキュリティ</span>
                                <br />
                                実践ガイド
                            </h1>
                            <p className="hero__lead">
                                VPC・ファイアウォール・IAM・IAP・ロードバランシング・Cloud Armor。
                                「なぜそうするのか」を理解したうえで、安全なネットワークを自分で設計・構築できるようになるための、初学者向けステップバイステップ解説です。
                            </p>
                            <div className="hero__meta">
                                <span>
                                    対象: <b>ネットワーク／セキュリティ初学者</b>
                                </span>
                                <span>
                                    形式: <b>10 セクション</b>
                                </span>
                                <span>
                                    図解: <b>Mermaid</b>
                                </span>
                            </div>

                            {/* Signature element: パケットが層を通過する */}
                            <div
                                className="flowstrip"
                                role="img"
                                aria-label="外部ユーザーのリクエストが Cloud Armor、ロードバランサ、ファイアウォールを通過してバックエンドに到達するまでの多層防御フロー"
                            >
                                <span className="flowstrip__label">request path</span>
                                <div className="flowstrip__track">
                                    <div className="node">
                                        <div className="node__icn" aria-hidden="true">
                                            ◎
                                        </div>
                                        <div className="node__t">User</div>
                                        <span className="node__s">外部ユーザー</span>
                                    </div>
                                    <div className="node">
                                        <div className="node__icn" aria-hidden="true">
                                            ▽
                                        </div>
                                        <div className="node__t">Cloud Armor</div>
                                        <span className="node__s">L7 フィルタ</span>
                                    </div>
                                    <div className="node">
                                        <div className="node__icn" aria-hidden="true">
                                            ⇄
                                        </div>
                                        <div className="node__t">Load Balancer</div>
                                        <span className="node__s">単一 IP</span>
                                    </div>
                                    <div className="node node--deny">
                                        <div className="node__icn" aria-hidden="true">
                                            ▦
                                        </div>
                                        <div className="node__t">Firewall</div>
                                        <span className="node__s">最小許可</span>
                                    </div>
                                    <div className="node node--end">
                                        <div className="node__icn" aria-hidden="true">
                                            ▣
                                        </div>
                                        <div className="node__t">Backend</div>
                                        <span className="node__s">MIG / VM</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* ====================================================== */}
                        {/* 1. 全体像 */}
                        {/* ====================================================== */}
                        <section className="section" id="s1">
                            <div className="section__head">
                                <span className="section__num">01</span>
                                <h2>全体像 — このガイドで学ぶこと</h2>
                            </div>

                            <p>
                                クラウド上で動くアプリを安全に運用するには、
                                <strong>「誰が・どこから・どのリソースに・どのポートで」</strong>
                                アクセスできるかを厳密にコントロールする必要があります。Google Cloud
                                では、この制御を複数のレイヤーで実現します。
                            </p>

                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">レイヤー</th>
                                            <th scope="col">役割</th>
                                            <th scope="col">主なサービス</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>ネットワーク分離</td>
                                            <td>環境を隔離し、通信境界を作る</td>
                                            <td>VPC / サブネット</td>
                                        </tr>
                                        <tr>
                                            <td>パケットフィルタ</td>
                                            <td>IP・ポート単位で許可/拒否</td>
                                            <td>ファイアウォールルール</td>
                                        </tr>
                                        <tr>
                                            <td>ID ベースアクセス</td>
                                            <td>「誰が」操作できるかを制御</td>
                                            <td>IAM / サービスアカウント</td>
                                        </tr>
                                        <tr>
                                            <td>ゼロトラスト接続</td>
                                            <td>外部 IP なしで安全に管理アクセス</td>
                                            <td>Identity-Aware Proxy (IAP)</td>
                                        </tr>
                                        <tr>
                                            <td>トラフィック分散</td>
                                            <td>可用性とスケーラビリティ</td>
                                            <td>ロードバランサ</td>
                                        </tr>
                                        <tr>
                                            <td>エッジ防御</td>
                                            <td>L7 攻撃をバックエンド到達前に遮断</td>
                                            <td>Cloud Armor</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="diagram">
                                <div className="mermaid">
                                    <MermaidDiagram
                                        chart={DIAGRAMS['diag-flowchart-overview']}
                                        ariaLabel="全体像のデータフロー図。外部ユーザーがエッジを通りバックエンドへ、管理者がIAP経由で踏み台へ接続する構成を示している。"
                                    />
                                </div>
                                <p className="diagram__cap">
                                    図 1-1 — 各サービスの連携。外部通信は必ず「エッジ →
                                    ファイアウォール → バックエンド」の順に通過する。
                                </p>
                            </div>

                            <div className="callout callout--note">
                                <span className="callout__k">読み方のヒント</span>
                                <p>
                                    各レイヤーで<strong>「不要な通信を落とす」</strong>
                                    ことが、多層防御 (defense in depth) の基本です。1
                                    か所が突破されても、次の層で止められる構成を目指します。
                                </p>
                            </div>

                            {/* ---- Glossary S1 ---- */}
                            <aside className="glossary" aria-label="このセクションの用語解説">
                                <p className="glossary__title">用語解説</p>
                                <dl className="glossary__grid">
                                    <div className="glossary__item">
                                        <dt className="glossary__term">
                                            Defense in Depth（多層防御）
                                        </dt>
                                        <dd className="glossary__def">
                                            複数のセキュリティ層を重ねることで、1
                                            つの層が突破されても次の層で被害を食い止める設計思想。
                                        </dd>
                                    </div>
                                    <div className="glossary__item">
                                        <dt className="glossary__term">
                                            VPC（Virtual Private Cloud）
                                        </dt>
                                        <dd className="glossary__def">
                                            Google Cloud
                                            上に作る論理的に隔離された仮想ネットワーク。IP
                                            範囲・ルーティング・ファイアウォールを自分で設計できる。
                                        </dd>
                                    </div>
                                    <div className="glossary__item">
                                        <dt className="glossary__term">ファイアウォールルール</dt>
                                        <dd className="glossary__def">
                                            VPC 内の通信を
                                            IP・ポート・プロトコル単位で許可または拒否するルール。優先度の小さいルールが先に評価される。
                                        </dd>
                                    </div>
                                    <div className="glossary__item">
                                        <dt className="glossary__term">
                                            IAM（Identity and Access Management）
                                        </dt>
                                        <dd className="glossary__def">
                                            「誰が」「どのリソースに」「何をできるか」を制御する
                                            Google Cloud の認証・認可システム。
                                        </dd>
                                    </div>
                                    <div className="glossary__item">
                                        <dt className="glossary__term">
                                            IAP（Identity-Aware Proxy）
                                        </dt>
                                        <dd className="glossary__def">
                                            外部 IP なしで VM に安全にアクセスできる Google Cloud
                                            のゼロトラストアクセスサービス。
                                        </dd>
                                    </div>
                                    <div className="glossary__item">
                                        <dt className="glossary__term">Cloud Armor</dt>
                                        <dd className="glossary__def">
                                            Google エッジで L7 フィルタリングと DDoS
                                            防御を行うサービス。悪意あるトラフィックをバックエンド到達前に遮断する。
                                        </dd>
                                    </div>
                                </dl>
                            </aside>
                        </section>

                        {/* ====================================================== */}
                        {/* 2. VPC */}
                        {/* ====================================================== */}
                        <section className="section" id="s2">
                            <div className="section__head">
                                <span className="section__num">02</span>
                                <h2>VPC ネットワークの基礎</h2>
                            </div>

                            <h3>2-1. VPC とは何か</h3>
                            <p className="lead-def">
                                <strong>VPC (Virtual Private Cloud)</strong> は、Google Cloud
                                上に作る論理的に隔離された仮想ネットワークです。物理データセンターを意識せず、IP
                                範囲・サブネット・ルーティング・ファイアウォールを自分で設計できます。
                            </p>
                            <p>
                                VPC は既定で「隔離されたプライベートネットワーク」です。異なる VPC
                                同士は、たとえ同じリージョンでも内部 IP では通信できません。
                                <strong>この隔離こそがセキュリティの第一歩</strong>です。
                            </p>

                            <h3>2-2. 自動モード vs カスタムモード</h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">項目</th>
                                            <th scope="col">自動モード (Auto)</th>
                                            <th scope="col">カスタムモード (Custom)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>サブネット作成</td>
                                            <td>全リージョンに自動生成</td>
                                            <td>自分で必要な分だけ作成</td>
                                        </tr>
                                        <tr>
                                            <td>IP 範囲</td>
                                            <td>Google が自動割り当て</td>
                                            <td>自分で CIDR を指定</td>
                                        </tr>
                                        <tr>
                                            <td>向いている用途</td>
                                            <td>検証・学習</td>
                                            <td>本番環境</td>
                                        </tr>
                                        <tr>
                                            <td>制御のの自由度</td>
                                            <td>
                                                <span className="ng">低い</span>
                                            </td>
                                            <td>
                                                <span className="ok">高い（推奨）</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="callout callout--best">
                                <span className="callout__k">ベストプラクティス</span>
                                <p>
                                    本番環境では<strong>カスタムモード</strong>
                                    を使います。サブネットを意図的に設計することで、IP
                                    の重複を防ぎ、リージョン配置を明示的に管理できます。
                                </p>
                            </div>

                            <h3>2-3. カスタム VPC を作る（コンソール / gcloud）</h3>
                            <p>コンソールでの基本手順は次のとおりです。</p>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">操作</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>
                                                ナビゲーションメニュー →{' '}
                                                <strong>VPC ネットワーク</strong>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>
                                                <strong>VPC ネットワークを作成</strong> をクリック
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>
                                                名前を入力（例: <code>privatenet</code>）
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>
                                                サブネット作成モードで <strong>カスタム</strong>{' '}
                                                を選択
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>5</td>
                                            <td>
                                                サブネット名・リージョン・IPv4 範囲（例:{' '}
                                                <code>172.16.0.0/24</code>）を指定
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>6</td>
                                            <td>
                                                <strong>作成</strong> をクリック
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="code">
                                <div className="code__bar">gcloud — 同等のコマンド</div>
                                <pre>
                                    <div className="code-line">
                                        <span className="cm"># カスタムモードの VPC を作成</span>
                                    </div>
                                    <div className="code-line">
                                        gcloud compute networks create privatenet{' '}
                                        <span className="fl">--subnet-mode</span>=custom
                                    </div>
                                    <div className="code-line"></div>
                                    <div className="code-line">
                                        <span className="cm">
                                            # サブネットを作成（リージョンと CIDR を明示）
                                        </span>
                                    </div>
                                    <div className="code-line">
                                        gcloud compute networks subnets create privatesubnet-1 \
                                    </div>
                                    <div className="code-line">
                                        {' '}
                                        <span className="fl">--network</span>=privatenet \
                                    </div>
                                    <div className="code-line">
                                        {' '}
                                        <span className="fl">--region</span>=us-central1 \
                                    </div>
                                    <div className="code-line">
                                        {' '}
                                        <span className="fl">--range</span>=172.16.0.0/24
                                    </div>
                                </pre>
                            </div>
                            <div className="callout callout--note">
                                <span className="callout__k">Tip · IaC への第一歩</span>
                                <p>
                                    コンソールの<strong>「同等のコマンドライン」ボタン</strong>
                                    で、設定内容を作成前に gcloud コマンドとして確認できます。これを
                                    Infrastructure as Code (IaC)
                                    化の出発点にすると再現性が高まります。
                                </p>
                            </div>

                            <h3>2-4. ネットワーク間の通信ルール — 3 原則</h3>
                            <div className="diagram">
                                <div className="mermaid">
                                    <MermaidDiagram
                                        chart={DIAGRAMS['diag-reachability-internal']}
                                        ariaLabel="内部IPでの疎通可否。同じVPC内のVMは疎通可能で、別VPCのVMは疎通不可であることを示す。"
                                    />
                                </div>
                                <p className="diagram__cap">図 2-1 — 内部 IP での疎通可否。</p>
                            </div>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">ケース</th>
                                            <th scope="col">内部 IP での疎通</th>
                                            <th scope="col">理由</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>同じ VPC 内（別ゾーン・別リージョンでも可）</td>
                                            <td>
                                                <span className="ok">✅ 可能</span>
                                            </td>
                                            <td>
                                                VPC はグローバルリソース。内部通信が許可されている
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>異なる VPC 間</td>
                                            <td>
                                                <span className="ng">❌ 不可</span>
                                            </td>
                                            <td>VPC は既定で隔離される</td>
                                        </tr>
                                        <tr>
                                            <td>外部 IP 経由</td>
                                            <td>ファイアウォール次第</td>
                                            <td>ICMP/SSH を許可していれば疎通する</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="callout callout--warn">
                                <span className="callout__k">重要 · 思い込みの事故</span>
                                <p>
                                    異なる VPC 間で内部通信したい場合は{' '}
                                    <strong>VPC ピアリング</strong> または{' '}
                                    <strong>Cloud VPN</strong>{' '}
                                    を別途設定します。「同じリージョンだから通信できるはず」という思い込みは事故のもとです。
                                </p>
                            </div>

                            <h3>2-5. 複数ネットワークインターフェース（マルチ NIC）</h3>
                            <p>
                                1 台の VM に複数の NIC を持たせ、複数の VPC
                                に同時接続できます（インスタンスタイプにより最大 8 個）。ただし
                                <strong>
                                    デフォルトルートは primary インターフェース (eth0) のみ
                                </strong>
                                に紐づきます。直接接続されたサブネット以外への通信は、すべて eth0
                                から出ていきます。
                            </p>
                            <div className="code">
                                <div className="code__bar">マルチ NIC VM のルーティング確認</div>
                                <pre>
                                    <div className="code-line">ip route</div>
                                    <div className="code-line">
                                        <span className="cm">
                                            # 出力例: default via 172.16.0.1 dev eth0 ← デフォルトは
                                            eth0 のみ
                                        </span>
                                    </div>
                                </pre>
                            </div>
                            <div className="callout callout--warn">
                                <span className="callout__k">落とし穴</span>
                                <p>
                                    マルチ NIC
                                    は便利ですが、ルーティングを理解しないと「なぜか通信できない」事態に陥ります。使う前に
                                    <strong>「VPC ピアリングで十分ではないか」</strong>
                                    を必ず検討しましょう。
                                </p>
                            </div>

                            {/* ---- Glossary S2 ---- */}
                            <aside className="glossary" aria-label="このセクションの用語解説">
                                <p className="glossary__title">用語解説</p>
                                <dl className="glossary__grid">
                                    <div className="glossary__item">
                                        <dt className="glossary__term">サブネット（Subnet）</dt>
                                        <dd className="glossary__def">
                                            VPC をさらに小さく分割した IP
                                            アドレスの範囲。リージョンごとに作成し、用途別に環境を分けるために使う。
                                        </dd>
                                    </div>
                                    <div className="glossary__item">
                                        <dt className="glossary__term">
                                            CIDR（Classless Inter-Domain Routing）
                                        </dt>
                                        <dd className="glossary__def">
                                            IP
                                            アドレスの範囲を「アドレス/プレフィックス長」で表す記法（例:
                                            10.0.0.0/24）。プレフィックスが大きいほど範囲が狭い。
                                        </dd>
                                    </div>
                                    <div className="glossary__item">
                                        <dt className="glossary__term">VPC ピアリング</dt>
                                        <dd className="glossary__def">
                                            異なる VPC 同士を接続し、内部 IP
                                            で相互通信できるようにする機能。ピアリングされた VPC の
                                            IP 範囲は重複してはいけない。
                                        </dd>
                                    </div>
                                    <div className="glossary__item">
                                        <dt className="glossary__term">
                                            NIC（Network Interface Card）
                                        </dt>
                                        <dd className="glossary__def">
                                            VM に割り当てるネットワークインターフェース。マルチ NIC
                                            では複数の VPC に同時接続できるが、デフォルトルートは
                                            eth0 のみ。
                                        </dd>
                                    </div>
                                    <div className="glossary__item">
                                        <dt className="glossary__term">ルーティング（Routing）</dt>
                                        <dd className="glossary__def">
                                            パケットをどの経路で宛先へ届けるかを決める仕組み。VPC
                                            にはデフォルトルートと各サブネットへのルートが自動作成される。
                                        </dd>
                                    </div>
                                    <div className="glossary__item">
                                        <dt className="glossary__term">
                                            IaC（Infrastructure as Code）
                                        </dt>
                                        <dd className="glossary__def">
                                            インフラの構成をコードとして記述・管理する手法。gcloud
                                            コマンドや Terraform などで再現性の高い環境構築が可能。
                                        </dd>
                                    </div>
                                </dl>
                            </aside>
                        </section>

                        {/* ====================================================== */}
                        {/* 3. Firewall */}
                        {/* ====================================================== */}
                        <section className="section" id="s3">
                            <div className="section__head">
                                <span className="section__num">03</span>
                                <h2>ファイアウォールルールの設計</h2>
                            </div>

                            <h3>3-1. ルールの構成要素</h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">要素</th>
                                            <th scope="col">説明</th>
                                            <th scope="col">例</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>方向 (Direction)</td>
                                            <td>Ingress（受信）/ Egress（送信）</td>
                                            <td>Ingress</td>
                                        </tr>
                                        <tr>
                                            <td>アクション</td>
                                            <td>allow / deny</td>
                                            <td>allow</td>
                                        </tr>
                                        <tr>
                                            <td>ターゲット</td>
                                            <td>ルールを適用する VM</td>
                                            <td>
                                                ネットワークタグ <code>web-server</code>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>ソースフィルタ</td>
                                            <td>通信元の指定</td>
                                            <td>
                                                <code>0.0.0.0/0</code>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>プロトコル/ポート</td>
                                            <td>許可する通信種別</td>
                                            <td>
                                                <code>tcp:80</code>, <code>icmp</code>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>優先度 (Priority)</td>
                                            <td>数値が小さいほど優先</td>
                                            <td>1000</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h3>3-2. ネットワークタグ — 粒度の高い制御の鍵</h3>
                            <p>
                                <strong>ネットワークタグ</strong>は VM
                                に付ける「ラベル」です。ファイアウォールのターゲットをタグで指定すると、そのタグを持つ
                                VM <em>だけ</em>
                                にルールが適用されます。「全インスタンスに適用」を避けてタグで絞ることで、
                                <strong>最小権限の原則</strong>を実現できます。
                            </p>
                            <div className="diagram">
                                <div className="mermaid">
                                    <MermaidDiagram
                                        chart={DIAGRAMS['diag-fw-network-tag']}
                                        ariaLabel="ファイアウォールルールのタグによる適用制御。web-serverタグを持つVMのみHTTPポートが許可され、それ以外のVMは拒否される仕組みを示す。"
                                    />
                                </div>
                                <p className="diagram__cap">
                                    図 3-1 — <code>web-server</code> タグを持つ blue だけが HTTP
                                    公開され、タグのない green には届かない。
                                </p>
                            </div>

                            <h3>3-3. 良い例 / 悪い例</h3>
                            <div className="code is-bad">
                                <div className="code__bar">
                                    悪い例 — 全 VM に全 IP から SSH を許可
                                </div>
                                <pre>
                                    <div className="code-line">
                                        gcloud compute firewall-rules create bad-ssh \
                                    </div>
                                    <div className="code-line">
                                        {' '}
                                        <span className="fl">--direction</span>=INGRESS{' '}
                                        <span className="fl">--action</span>=allow \
                                    </div>
                                    <div className="code-line">
                                        {' '}
                                        <span className="fl">--rules</span>=tcp:22{' '}
                                        <span className="fl">--source-ranges</span>=0.0.0.0/0
                                    </div>
                                </pre>
                            </div>
                            <div className="code is-good">
                                <div className="code__bar">
                                    良い例 — 特定タグの VM に IAP 範囲からだけ許可
                                </div>
                                <pre>
                                    <div className="code-line">
                                        gcloud compute firewall-rules create allow-ssh-from-iap \
                                    </div>
                                    <div className="code-line">
                                        {' '}
                                        <span className="fl">--direction</span>=INGRESS{' '}
                                        <span className="fl">--action</span>=allow \
                                    </div>
                                    <div className="code-line">
                                        {' '}
                                        <span className="fl">--rules</span>=tcp:22 \
                                    </div>
                                    <div className="code-line">
                                        {' '}
                                        <span className="fl">--source-ranges</span>=35.235.240.0/20
                                        \
                                    </div>
                                    <div className="code-line">
                                        {' '}
                                        <span className="fl">--target-tags</span>=allow-iap-ssh
                                    </div>
                                </pre>
                            </div>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">観点</th>
                                            <th scope="col">悪い例</th>
                                            <th scope="col">良い例</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>ソース範囲</td>
                                            <td>
                                                <span className="ng">
                                                    <code>0.0.0.0/0</code>（全世界）
                                                </span>
                                            </td>
                                            <td>
                                                <span className="ok">
                                                    <code>35.235.240.0/20</code>（IAP のみ）
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>ターゲット</td>
                                            <td>
                                                <span className="ng">全 VM</span>
                                            </td>
                                            <td>
                                                <span className="ok">特定タグの VM のみ</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>攻撃面</td>
                                            <td>
                                                <span className="ng">非常に広い</span>
                                            </td>
                                            <td>
                                                <span className="ok">最小限</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="callout callout--best">
                                <span className="callout__k">ベストプラクティス</span>
                                <p>
                                    ソース範囲は<strong>できる限り狭く</strong>します。Google
                                    も公式に <code>default-allow-ssh</code> /{' '}
                                    <code>default-allow-rdp</code>（全 IP から SSH/RDP
                                    を許可するデフォルトルール）の削除・無効化を推奨しています。
                                </p>
                            </div>

                            <h3>3-4. 暗黙のルール</h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">ルール</th>
                                            <th scope="col">内容</th>
                                            <th scope="col">優先度</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>implied allow egress</td>
                                            <td>全送信トラフィックを許可</td>
                                            <td>65535</td>
                                        </tr>
                                        <tr>
                                            <td>implied deny ingress</td>
                                            <td>全受信トラフィックを拒否</td>
                                            <td>65535</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="callout callout--note">
                                <span className="callout__k">考え方</span>
                                <p>
                                    何も設定しなければ
                                    <strong>外部からの受信はすべてブロック</strong>
                                    されます。あなたが作る <code>allow</code>{' '}
                                    ルールは「この拒否の上に穴を開ける」行為です。だからこそ、開ける穴は最小限にすべきなのです。
                                </p>
                            </div>

                            {/* ---- Glossary S3 ---- */}
                            <aside className="glossary" aria-label="このセクションの用語解説">
                                <p className="glossary__title">用語解説</p>
                                <dl className="glossary__grid">
                                    <div className="glossary__item">
                                        <dt className="glossary__term">Ingress / Egress</dt>
                                        <dd className="glossary__def">
                                            Ingress は VM への受信トラフィック、Egress は VM
                                            からの送信トラフィック。ファイアウォールルールはこの方向別に定義する。
                                        </dd>
                                    </div>
                                    <div className="glossary__item">
                                        <dt className="glossary__term">ネットワークタグ</dt>
                                        <dd className="glossary__def">
                                            VM
                                            に付与する文字列ラベル。ファイアウォールのターゲットをタグで指定することで、特定の
                                            VM だけにルールを適用できる。
                                        </dd>
                                    </div>
                                    <div className="glossary__item">
                                        <dt className="glossary__term">
                                            最小権限の原則（Principle of Least Privilege）
                                        </dt>
                                        <dd className="glossary__def">
                                            ユーザーやサービスに必要最小限のアクセス権だけを付与するセキュリティ設計原則。攻撃時の被害範囲を最小化する。
                                        </dd>
                                    </div>
                                    <div className="glossary__item">
                                        <dt className="glossary__term">優先度（Priority）</dt>
                                        <dd className="glossary__def">
                                            ファイアウォールルールの評価順序を決める数値（0〜65535）。数値が小さいほど優先度が高く先に評価される。
                                        </dd>
                                    </div>
                                    <div className="glossary__item">
                                        <dt className="glossary__term">
                                            暗黙のルール（Implied Rules）
                                        </dt>
                                        <dd className="glossary__def">
                                            VPC に自動で存在するルール。受信は全拒否（優先度
                                            65535）、送信は全許可（65535）がデフォルト。削除不可。
                                        </dd>
                                    </div>
                                </dl>
                            </aside>
                        </section>

                        {/* ====================================================== */}
                        {/* 4. IAM */}
                        {/* ====================================================== */}
                        <section className="section" id="s4">
                            <div className="section__head">
                                <span className="section__num">04</span>
                                <h2>IAM とサービスアカウント — 最小権限の原則</h2>
                            </div>

                            <h3>4-1. なぜサービスアカウントを使うのか</h3>
                            <p className="lead-def">
                                <strong>サービスアカウント</strong>は、人間ではなく
                                <strong>アプリケーションや VM</strong> が使う特別な Google
                                アカウントです。
                            </p>
                            <p>
                                VM が Google Cloud API
                                を操作する際、個人ユーザーの権限を使うのは危険です。サービスアカウントに「必要なロールだけ」を割り当てることで、
                                <strong>最小権限の原則 (principle of least privilege)</strong>{' '}
                                を守れます。
                            </p>

                            <h3>4-2. ネットワーク管理向けの 2 つのロール</h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">ロール</th>
                                            <th scope="col">できること</th>
                                            <th scope="col">できないこと</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <strong>Compute Network Admin</strong>
                                            </td>
                                            <td>
                                                ネットワーク・サブネット・ルートの作成/変更/削除、ファイアウォールの
                                                <strong>閲覧</strong>
                                            </td>
                                            <td>ファイアウォールの変更/削除、SSL 証明書の管理</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>Compute Security Admin</strong>
                                            </td>
                                            <td>ファイアウォール・SSL 証明書の作成/変更/削除</td>
                                            <td>ネットワークリソース全般の管理は対象外</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="diagram">
                                <div className="mermaid">
                                    <MermaidDiagram
                                        chart={DIAGRAMS['diag-iam-network-roles']}
                                        ariaLabel="Network Admin と Security Admin の権限比較図。前者はファイアウォール削除が不可で、後者は可であることを示している。"
                                    />
                                </div>
                                <p className="diagram__cap">
                                    図 4-1 — ロールごとの権限差。ファイアウォールの削除は Security
                                    Admin のみ。
                                </p>
                            </div>
                            <div className="callout callout--best">
                                <span className="callout__k">設計思想 · 職務分掌</span>
                                <p>
                                    ネットワーク構成を作る人と、セキュリティルール（ファイアウォール）を管理する人を分けることで、「1
                                    人の権限が大きすぎる」リスクを減らせます。これが{' '}
                                    <strong>separation of duties</strong> です。
                                </p>
                            </div>

                            <h3>4-3. サービスアカウント運用の注意点</h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">方法</th>
                                            <th scope="col">セキュリティ</th>
                                            <th scope="col">推奨度</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>JSON キーをダウンロードして配布</td>
                                            <td>キー漏洩リスクが高い</td>
                                            <td>
                                                <span className="ng">⚠️ 非推奨</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>VM にサービスアカウントを直接アタッチ</td>
                                            <td>キーレス・自動ローテーション</td>
                                            <td>
                                                <span className="ok">✅ 推奨</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Workload Identity (GKE)</td>
                                            <td>キーレス</td>
                                            <td>
                                                <span className="ok">✅ 推奨</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="callout callout--best">
                                <span className="callout__k">ベストプラクティス</span>
                                <p>
                                    サービスアカウントキー (JSON) は
                                    <strong>可能な限り発行しない</strong>でください。VM
                                    には作成時にサービスアカウントを直接アタッチし、必要なロールを付与する方式が安全です。
                                </p>
                            </div>

                            {/* ---- Glossary S4 ---- */}
                            <aside className="glossary" aria-label="このセクションの用語解説">
                                <p className="glossary__title">用語解説</p>
                                <dl className="glossary__grid">
                                    <div className="glossary__item">
                                        <dt className="glossary__term">
                                            最小権限（Least Privilege）
                                        </dt>
                                        <dd className="glossary__def">
                                            必要な操作だけを許可し、それ以外は拒否する IAM
                                            設計の基本原則。過剰な権限付与は侵害時のリスクを拡大させる。
                                        </dd>
                                    </div>
                                    <div className="glossary__item">
                                        <dt className="glossary__term">
                                            サービスアカウント（Service Account）
                                        </dt>
                                        <dd className="glossary__def">
                                            人間ではなくアプリケーションや VM が使う特別な Google
                                            アカウント。必要なロールのみを付与して API 操作を行う。
                                        </dd>
                                    </div>
                                    <div className="glossary__item">
                                        <dt className="glossary__term">
                                            職務分掌（Separation of Duties）
                                        </dt>
                                        <dd className="glossary__def">
                                            ネットワーク管理とセキュリティ管理など、責任範囲を人や役割で分けること。1
                                            人が過大な権限を持つリスクを軽減する。
                                        </dd>
                                    </div>
                                    <div className="glossary__item">
                                        <dt className="glossary__term">IAM ロール（IAM Role）</dt>
                                        <dd className="glossary__def">
                                            特定の操作を許可する権限のセット。基本ロール（Owner/Editor/Viewer）より事前定義ロールや
                                            カスタムロールの利用を推奨。
                                        </dd>
                                    </div>
                                    <div className="glossary__item">
                                        <dt className="glossary__term">Workload Identity</dt>
                                        <dd className="glossary__def">
                                            GKE Pod にサービスアカウントを紐付け、JSON キーなしで
                                            Google Cloud API を呼び出せるキーレス認証の仕組み。
                                        </dd>
                                    </div>
                                </dl>
                            </aside>
                        </section>

                        {/* ====================================================== */}
                        {/* 5. IAP */}
                        {/* ====================================================== */}
                        <section className="section" id="s5">
                            <div className="section__head">
                                <span className="section__num">05</span>
                                <h2>IAP — 踏み台サーバーを排除する安全なアクセス</h2>
                            </div>

                            <h3>5-1. IAP TCP フォワーディングとは</h3>
                            <p className="lead-def">
                                <strong>Identity-Aware Proxy (IAP) TCP フォワーディング</strong>
                                は、暗号化トンネルを通じて SSH・RDP などの TCP トラフィックを VM
                                に転送する仕組みです。
                            </p>
                            <p>
                                VM に<strong>外部 IP を付けずに</strong>
                                安全な管理アクセスを実現します。従来必要だった踏み台サーバー
                                (bastion) や VPN を<strong>不要にできる</strong>のが最大の利点です。
                            </p>
                            <div className="diagram">
                                <div className="mermaid">
                                    <MermaidDiagram
                                        chart={DIAGRAMS['diag-iap-seq-diagram']}
                                        ariaLabel="IAP を経由した SSH 接続確立の流れ。認証、認可、暗号化トンネルの設定プロセスを示すシーケンス図。"
                                    />
                                </div>
                                <p className="diagram__cap">
                                    図 5-1 — IAP は接続時に「認証 → 認可 → コンテキスト認識 →
                                    監査」の 4 機能を実行する。
                                </p>
                            </div>

                            <h3>5-2. IAP を有効にする 3 ステップ</h3>
                            <div className="diagram">
                                <div className="mermaid">
                                    <MermaidDiagram
                                        chart={DIAGRAMS['diag-iap-flowchart']}
                                        ariaLabel="IAPを有効化する3ステップを示すフロー図。API有効化、FW許可、IAMロール付与の順に進む。"
                                    />
                                </div>
                                <p className="diagram__cap">図 5-2 — IAP 有効化の流れ。</p>
                            </div>

                            <h4>Step 1 · API の有効化</h4>
                            <p>
                                ナビゲーションメニュー → API とサービス → ライブラリ →{' '}
                                <strong>「Cloud Identity-Aware Proxy API」</strong>を有効化。
                            </p>

                            <h4>Step 2 · ファイアウォールルールの作成</h4>
                            <p>
                                IAP は固定の IP 範囲 <code>35.235.240.0/20</code>{' '}
                                からアクセスします。この範囲からの SSH (22) / RDP (3389)
                                を許可します。
                            </p>
                            <div className="code is-good">
                                <div className="code__bar">IAP 範囲のみ許可</div>
                                <pre>
                                    <div className="code-line">
                                        gcloud compute firewall-rules create allow-ingress-from-iap
                                        \
                                    </div>
                                    <div className="code-line">
                                        {' '}
                                        <span className="fl">--direction</span>=INGRESS \
                                    </div>
                                    <div className="code-line">
                                        {' '}
                                        <span className="fl">--action</span>=allow \
                                    </div>
                                    <div className="code-line">
                                        {' '}
                                        <span className="fl">--rules</span>=tcp:22,tcp:3389 \
                                    </div>
                                    <div className="code-line">
                                        {' '}
                                        <span className="fl">--source-ranges</span>=35.235.240.0/20
                                    </div>
                                </pre>
                            </div>
                            <div className="callout callout--note">
                                <span className="callout__k">なぜこの IP 範囲なのか</span>
                                <p>
                                    <code>35.235.240.0/20</code> は IAP が TCP
                                    フォワーディングに使う全 IP
                                    を含む範囲です。これだけを許可すれば「IAP
                                    経由のアクセスだけ」を受け入れられます（IPv6 VM の場合は{' '}
                                    <code>2600:2d00:1:7::/64</code>）。
                                </p>
                            </div>

                            <h4>Step 3 · IAM ロールの付与</h4>
                            <p>
                                セキュリティ → Identity-Aware Proxy → 「SSH and TCP
                                Resources」タブで対象 VM
                                を選択し、接続を許可したいユーザー/サービスアカウントに
                                <strong>Cloud IAP &gt; IAP-Secured Tunnel User</strong>{' '}
                                ロールを付与します。
                            </p>

                            <h3>5-3. トンネルを使った接続</h3>
                            <div className="code">
                                <div className="code__bar">SSH / RDP over IAP</div>
                                <pre>
                                    <div className="code-line">
                                        <span className="cm">
                                            # SSH（外部 IP がなければ自動的に IAP トンネルを使用）
                                        </span>
                                    </div>
                                    <div className="code-line">
                                        gcloud compute ssh linux-iap{' '}
                                        <span className="fl">--tunnel-through-iap</span>
                                    </div>
                                    <div className="code-line"></div>
                                    <div className="code-line">
                                        <span className="cm">
                                            # RDP 用にローカルポートへトンネルを張る
                                        </span>
                                    </div>
                                    <div className="code-line">
                                        gcloud compute start-iap-tunnel windows-iap 3389 \
                                    </div>
                                    <div className="code-line">
                                        {' '}
                                        <span className="fl">--local-host-port</span>=localhost:0 \
                                    </div>
                                    <div className="code-line">
                                        {' '}
                                        <span className="fl">--zone</span>=us-central1-a
                                    </div>
                                    <div className="code-line">
                                        <span className="cm">
                                            # → &quot;Listening on port [XXXX]&quot; 表示後、RDP で
                                            localhost:XXXX に接続
                                        </span>
                                    </div>
                                </pre>
                            </div>
                            <div className="callout callout--best">
                                <span className="callout__k">ベストプラクティス</span>
                                <p>
                                    外部 IP を持たない VM へは IAP を
                                    <strong>標準のアクセス手段</strong>にします。
                                    <code>--tunnel-through-iap</code> を明示すれば常に IAP
                                    経由を保証できます。Chrome Enterprise Premium
                                    のアクセスレベルと組み合わせると、端末状態に基づく
                                    <strong>コンテキスト認識アクセス</strong>
                                    でゼロトラストを強化できます。
                                </p>
                            </div>

                            {/* ---- Glossary S5 ---- */}
                            <aside className="glossary" aria-label="このセクションの用語解説">
                                <p className="glossary__title">用語解説</p>
                                <dl className="glossary__grid">
                                    <div className="glossary__item">
                                        <dt className="glossary__term">
                                            ゼロトラスト（Zero Trust）
                                        </dt>
                                        <dd className="glossary__def">
                                            「内部ネットワークだから安全」という前提を捨て、すべてのアクセスを都度認証・認可するセキュリティモデル。IAP
                                            はこの実装の一例。
                                        </dd>
                                    </div>
                                    <div className="glossary__item">
                                        <dt className="glossary__term">
                                            TCP フォワーディング（TCP Forwarding）
                                        </dt>
                                        <dd className="glossary__def">
                                            IAP が提供する機能。暗号化トンネル経由で SSH や RDP
                                            などの TCP トラフィックを VM に転送し、外部 IP
                                            なしで安全にアクセスできる。
                                        </dd>
                                    </div>
                                    <div className="glossary__item">
                                        <dt className="glossary__term">
                                            踏み台サーバー（Bastion Host）
                                        </dt>
                                        <dd className="glossary__def">
                                            プライベートネットワーク内の VM に SSH
                                            するための中継サーバー。IAP TCP
                                            フォワーディングを使えば不要にできる。
                                        </dd>
                                    </div>
                                    <div className="glossary__item">
                                        <dt className="glossary__term">
                                            コンテキスト認識アクセス（Context-Aware Access）
                                        </dt>
                                        <dd className="glossary__def">
                                            デバイスの状態（OS
                                            バージョン・証明書など）をアクセス条件に加える仕組み。Chrome
                                            Enterprise Premium と IAP で実現する。
                                        </dd>
                                    </div>
                                    <div className="glossary__item">
                                        <dt className="glossary__term">IAP-Secured Tunnel User</dt>
                                        <dd className="glossary__def">
                                            IAP 経由の SSH/RDP 接続を許可するための IAM ロール。VM
                                            またはプロジェクト単位で必要なユーザーにのみ付与する。
                                        </dd>
                                    </div>
                                </dl>
                            </aside>
                        </section>

                        {/* ====================================================== */}
                        {/* 6. 外部 LB + Cloud Armor */}
                        {/* ====================================================== */}
                        <section className="section" id="s6">
                            <div className="section__head">
                                <span className="section__num">06</span>
                                <h2>外部 Application Load Balancer と Cloud Armor</h2>
                            </div>

                            <h3>6-1. グローバル外部 Application Load Balancer の仕組み</h3>
                            <p className="lead-def">
                                <strong>グローバル外部 Application Load Balancer (L7)</strong>{' '}
                                は、ユーザートラフィックを Google エッジ (PoP)
                                で受け取り、プライベート光ファイバーバックボーン経由で最も近い健全なバックエンドへルーティングします。
                            </p>
                            <p>
                                世界中のユーザーに対し、<strong>1 つのグローバル IP</strong>{' '}
                                で低遅延・高可用性のアクセスを提供できます。
                            </p>
                            <div className="diagram">
                                <div className="mermaid">
                                    <MermaidDiagram
                                        chart={DIAGRAMS['diag-glb-flowchart']}
                                        ariaLabel="外部Application Load Balancerの負荷分散図。複数リージョンにトラフィックを分散・オーバーフローする様子を示す。"
                                    />
                                </div>
                                <p className="diagram__cap">
                                    図 6-1 — 単一 IP
                                    で受け、最寄りの健全なバックエンドへ。高負荷時は別リージョンへオーバーフロー。
                                </p>
                            </div>

                            <h3>6-2. 構成要素</h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">コンポーネント</th>
                                            <th scope="col">役割</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>転送ルール / フロントエンド</td>
                                            <td>グローバル IP・ポート・プロトコルを定義</td>
                                        </tr>
                                        <tr>
                                            <td>バックエンドサービス</td>
                                            <td>トラフィック分散方法とヘルスチェックを管理</td>
                                        </tr>
                                        <tr>
                                            <td>インスタンステンプレート</td>
                                            <td>
                                                VM
                                                の設計図（マシンタイプ・イメージ・起動スクリプト）
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>マネージドインスタンスグループ (MIG)</td>
                                            <td>同一構成 VM の集合。自動スケール・自己修復</td>
                                        </tr>
                                        <tr>
                                            <td>ヘルスチェック</td>
                                            <td>健全なインスタンスだけにトラフィックを送る</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h3>6-3. 必須のファイアウォールルール 2 つ</h3>
                            <div className="code is-good">
                                <div className="code__bar">
                                    1 — ロードバランサからの HTTP を許可
                                </div>
                                <pre>
                                    <div className="code-line">
                                        gcloud compute firewall-rules create default-allow-http \
                                    </div>
                                    <div className="code-line">
                                        {' '}
                                        <span className="fl">--network</span>=default{' '}
                                        <span className="fl">--action</span>=allow{' '}
                                        <span className="fl">--direction</span>=ingress \
                                    </div>
                                    <div className="code-line">
                                        {' '}
                                        <span className="fl">--rules</span>=tcp:80 \
                                    </div>
                                    <div className="code-line">
                                        {' '}
                                        <span className="fl">--source-ranges</span>
                                        =35.191.0.0/16,130.211.0.0/22 \
                                    </div>
                                    <div className="code-line">
                                        {' '}
                                        <span className="fl">--target-tags</span>=http-server
                                    </div>
                                </pre>
                            </div>
                            <div className="code is-good">
                                <div className="code__bar">2 — Google のヘルスチェックを許可</div>
                                <pre>
                                    <div className="code-line">
                                        gcloud compute firewall-rules create
                                        default-allow-health-check \
                                    </div>
                                    <div className="code-line">
                                        {' '}
                                        <span className="fl">--network</span>=default{' '}
                                        <span className="fl">--action</span>=allow{' '}
                                        <span className="fl">--direction</span>=ingress \
                                    </div>
                                    <div className="code-line">
                                        {' '}
                                        <span className="fl">--rules</span>=tcp \
                                    </div>
                                    <div className="code-line">
                                        {' '}
                                        <span className="fl">--source-ranges</span>
                                        =130.211.0.0/22,35.191.0.0/16 \
                                    </div>
                                    <div className="code-line">
                                        {' '}
                                        <span className="fl">--target-tags</span>=http-server
                                    </div>
                                </pre>
                            </div>
                            <div className="callout callout--warn">
                                <span className="callout__k">
                                    超重要 · ヘルスチェックの IP 範囲
                                </span>
                                <p>
                                    ヘルスチェックのプローブは <code>130.211.0.0/22</code> と{' '}
                                    <code>35.191.0.0/16</code> から来ます。この 2
                                    範囲を許可しないとバックエンドが <strong>unhealthy</strong>{' '}
                                    と判定され、<strong>トラフィックが一切流れません</strong>。LB
                                    トラブルの大半はこの設定漏れが原因です。プロキシ型の Application
                                    Load Balancer ではバックエンドが受け取るのはユーザー IP ではなく
                                    Google の上記フロントエンド範囲からのトラフィックなので、
                                    <code>0.0.0.0/0</code> の全開放は不要です。
                                    <strong>リージョン外部 ALB</strong> の場合はこれに加えて
                                    <strong>プロキシ専用サブネット</strong>
                                    の範囲も許可してください。
                                </p>
                            </div>

                            <h3>6-4. 負荷分散モード</h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">分散モード</th>
                                            <th scope="col">判定基準</th>
                                            <th scope="col">設定例</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Rate（レート）</td>
                                            <td>1 秒あたりのリクエスト数 (RPS)</td>
                                            <td>最大 50 RPS/インスタンス</td>
                                        </tr>
                                        <tr>
                                            <td>Utilization（使用率）</td>
                                            <td>CPU 使用率</td>
                                            <td>最大 80%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="callout callout--note">
                                <span className="callout__k">挙動のポイント</span>
                                <p>
                                    通常は「最寄りのバックエンド」へ送られますが、負荷が非常に高くなると別リージョンへ
                                    <strong>オーバーフロー</strong>
                                    します。これがクロスリージョンのフェイルオーバーと耐障害性を実現します。
                                </p>
                            </div>

                            <h3>6-5. Cloud Armor — エッジでの防御</h3>
                            <p className="lead-def">
                                <strong>Cloud Armor</strong> は、Google エッジで L7 フィルタリングと
                                IP 制御を行うサービスです。
                            </p>
                            <p>
                                悪意あるトラフィック（L7 フラッドなど）を、
                                <strong>VPC やバックエンドに到達する前に</strong>
                                エッジで遮断します。バックエンドのリソースを消費させません。
                            </p>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">設定項目</th>
                                            <th scope="col">値（拒否リスト例）</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>ポリシー名</td>
                                            <td>
                                                <code>denylist-siege</code>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>デフォルトルール</td>
                                            <td>Allow（許可）</td>
                                        </tr>
                                        <tr>
                                            <td>追加ルール条件</td>
                                            <td>
                                                攻撃元 IP（例: <code>203.0.113.10/32</code>）
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>アクション</td>
                                            <td>Deny（拒否）</td>
                                        </tr>
                                        <tr>
                                            <td>レスポンスコード</td>
                                            <td>403 (Forbidden)</td>
                                        </tr>
                                        <tr>
                                            <td>優先度</td>
                                            <td>1000</td>
                                        </tr>
                                        <tr>
                                            <td>ターゲット</td>
                                            <td>
                                                バックエンドサービス（<code>http-backend</code>）
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="diagram">
                                <div className="mermaid">
                                    <MermaidDiagram
                                        chart={DIAGRAMS['diag-armor-blocking']}
                                        ariaLabel="Cloud Armorによるアクセス制御。特定の攻撃元IPからの通信は403でブロックされ、正常ユーザーはロードバランサへ届く様子を示す。"
                                    />
                                </div>
                                <p className="diagram__cap">
                                    図 6-2 — 攻撃元はエッジで 403 遮断、正常ユーザーは通過。
                                </p>
                            </div>
                            <div className="callout callout--best">
                                <span className="callout__k">ベストプラクティス</span>
                                <p>
                                    防御は 2 通り。(1) デフォルト Allow + 攻撃元を拒否リスト化、(2)
                                    デフォルト Deny + 許可 IP だけを許可リスト化。よりセキュアなのは{' '}
                                    <strong>(2) の許可リスト方式</strong>です。Cloud Armor
                                    のログを有効にすれば、いつ・どの IP
                                    がブロックされたかを追跡できます。
                                </p>
                            </div>

                            {/* ---- Glossary S6 ---- */}
                            <aside className="glossary" aria-label="このセクションの用語解説">
                                <p className="glossary__title">用語解説</p>
                                <dl className="glossary__grid">
                                    <div className="glossary__item">
                                        <dt className="glossary__term">PoP（Point of Presence）</dt>
                                        <dd className="glossary__def">
                                            Google のエッジロケーション。ユーザーから最も近い PoP
                                            でトラフィックを受け取り、プライベートバックボーン経由でバックエンドへ届ける。
                                        </dd>
                                    </div>
                                    <div className="glossary__item">
                                        <dt className="glossary__term">
                                            MIG（Managed Instance Group）
                                        </dt>
                                        <dd className="glossary__def">
                                            同一設定の VM
                                            を束ねて管理するグループ。自動スケーリング・自己修復・ローリングアップデートをサポートし、LB
                                            のバックエンドとして機能する。
                                        </dd>
                                    </div>
                                    <div className="glossary__item">
                                        <dt className="glossary__term">
                                            DDoS（Distributed Denial of Service）
                                        </dt>
                                        <dd className="glossary__def">
                                            大量のリクエストでサービスを停止させる攻撃。Cloud Armor
                                            は Google 規模のインフラを活用して大規模 DDoS
                                            を吸収・緩和する。
                                        </dd>
                                    </div>
                                    <div className="glossary__item">
                                        <dt className="glossary__term">
                                            L7（Layer 7 / アプリケーション層）
                                        </dt>
                                        <dd className="glossary__def">
                                            OSI モデルの第 7 層。HTTP ヘッダーや URL
                                            などアプリケーションレベルの情報を解析してルーティングやフィルタリングを行う。
                                        </dd>
                                    </div>
                                    <div className="glossary__item">
                                        <dt className="glossary__term">
                                            ヘルスチェック（Health Check）
                                        </dt>
                                        <dd className="glossary__def">
                                            LB
                                            が定期的にバックエンドへプローブを送り、正常なインスタンスだけにトラフィックを転送する仕組み。IP
                                            範囲の許可が必須。
                                        </dd>
                                    </div>
                                    <div className="glossary__item">
                                        <dt className="glossary__term">インスタンステンプレート</dt>
                                        <dd className="glossary__def">
                                            MIG を構成する VM
                                            の設計図。マシンタイプ・ブートディスク・起動スクリプト・ネットワークタグなどを定義する。
                                        </dd>
                                    </div>
                                </dl>
                            </aside>
                        </section>

                        {/* ====================================================== */}
                        {/* 7. ILB */}
                        {/* ====================================================== */}
                        <section className="section" id="s7">
                            <div className="section__head">
                                <span className="section__num">07</span>
                                <h2>内部ロードバランサ (ILB)</h2>
                            </div>

                            <h3>7-1. ILB とは</h3>
                            <p className="lead-def">
                                <strong>内部ロードバランサ (ILB)</strong> は、TCP/UDP トラフィックを
                                <strong>プライベートネットワーク内</strong>の VM へ分散する
                                <strong>リージョナル</strong>サービスです。
                            </p>
                            <p>
                                「インターネットには公開したくないが、内部サービスからは高可用に使いたい」リソース（マイクロサービス・API・DB
                                など）に、<strong>単一の安定したプライベート IP</strong>{' '}
                                を提供します。
                            </p>
                            <div className="diagram">
                                <div className="mermaid">
                                    <MermaidDiagram
                                        chart={DIAGRAMS['diag-ilb-flowchart']}
                                        ariaLabel="内部ロードバランサの機能図。プライベートネットワーク内で複数ゾーンのバックエンド群にトラフィックを分散する構成を示す。"
                                    />
                                </div>
                                <p className="diagram__cap">
                                    図 7-1 — 単一プライベート IP
                                    で、複数ゾーンのバックエンドへ分散。
                                </p>
                            </div>

                            <h3>7-2. 外部 LB との違い</h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">項目</th>
                                            <th scope="col">外部 Application LB</th>
                                            <th scope="col">内部 LB (passthrough)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>スコープ</td>
                                            <td>グローバル</td>
                                            <td>リージョナル</td>
                                        </tr>
                                        <tr>
                                            <td>公開範囲</td>
                                            <td>インターネット</td>
                                            <td>VPC 内部のみ</td>
                                        </tr>
                                        <tr>
                                            <td>IP</td>
                                            <td>外部グローバル IP</td>
                                            <td>内部プライベート IP</td>
                                        </tr>
                                        <tr>
                                            <td>レイヤー</td>
                                            <td>L7 (HTTP/HTTPS)</td>
                                            <td>L4 (TCP/UDP)</td>
                                        </tr>
                                        <tr>
                                            <td>主な用途</td>
                                            <td>公開 Web アプリ</td>
                                            <td>内部マイクロサービス</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h3>7-3. 高可用性のための配置設計</h3>
                            <p>
                                ILB はリージョナルサービスなので、<strong>複数ゾーン</strong>
                                にバックエンドを配置することがゾーン障害への耐性を生みます。ヘルスチェックのファイアウォール範囲は外部
                                LB と同じく <code>130.211.0.0/22</code> と{' '}
                                <code>35.191.0.0/16</code> を許可し、バックエンドへの HTTP は VPC の
                                CIDR（例: <code>10.10.0.0/16</code>）からのみ許可します。
                            </p>
                            <div className="callout callout--best">
                                <span className="callout__k">ベストプラクティス</span>
                                <p>
                                    ILB のバックエンド VM には<strong>外部 IP を付けない</strong>
                                    （External IPv4 Address:
                                    None）ようにします。内部サービスはインターネットに露出させないのが原則です。
                                </p>
                            </div>

                            {/* ---- Glossary S7 ---- */}
                            <aside className="glossary" aria-label="このセクションの用語解説">
                                <p className="glossary__title">用語解説</p>
                                <dl className="glossary__grid">
                                    <div className="glossary__item">
                                        <dt className="glossary__term">
                                            パススルー（Passthrough）
                                        </dt>
                                        <dd className="glossary__def">
                                            LB がパケットを変換せず元の送信元 IP
                                            を保持したままバックエンドへ転送する方式。ILB（内部
                                            passthrough Network LB）がこの動作をする。
                                        </dd>
                                    </div>
                                    <div className="glossary__item">
                                        <dt className="glossary__term">リージョナル（Regional）</dt>
                                        <dd className="glossary__def">
                                            特定の Google Cloud
                                            リージョン内でのみ動作するリソース。ILB
                                            はリージョナルなため、同一リージョン内の VM
                                            に対してのみ機能する。
                                        </dd>
                                    </div>
                                    <div className="glossary__item">
                                        <dt className="glossary__term">
                                            マイクロサービス（Microservices）
                                        </dt>
                                        <dd className="glossary__def">
                                            アプリを小さな独立したサービスに分割して開発・デプロイする設計パターン。ILB
                                            はサービス間通信を安定させる安定したプライベート IP
                                            を提供する。
                                        </dd>
                                    </div>
                                    <div className="glossary__item">
                                        <dt className="glossary__term">
                                            フェイルオーバー（Failover）
                                        </dt>
                                        <dd className="glossary__def">
                                            一部のバックエンドが障害になった場合に、正常なバックエンドへ自動で切り替わる仕組み。複数ゾーン配置で実現する。
                                        </dd>
                                    </div>
                                </dl>
                            </aside>
                        </section>

                        {/* ====================================================== */}
                        {/* 8. 総合演習 */}
                        {/* ====================================================== */}
                        <section className="section" id="s8">
                            <div className="section__head">
                                <span className="section__num">08</span>
                                <h2>総合演習 — セキュアなネットワークを設計する</h2>
                            </div>
                            <p>
                                ここまでの知識を統合した「あるべき構成」を考えます。題材は
                                <strong>
                                    「公開 Web アプリ (juice-shop)
                                    を持つ小規模サイトのセキュリティ強化」
                                </strong>
                                です。
                            </p>

                            <h3>8-1. 要件</h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">要件</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>
                                                踏み台 (bastion) は
                                                <strong>公開 IP を持たない</strong>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>
                                                bastion への SSH は <strong>IAP 経由のみ</strong>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>
                                                アプリサーバーへの SSH は{' '}
                                                <strong>bastion 経由のみ</strong>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>
                                                アプリサーバーへは <strong>HTTP だけ</strong>
                                                を世界に公開
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h3>8-2. アクセス経路の設計</h3>
                            <div className="diagram">
                                <div className="mermaid">
                                    <MermaidDiagram
                                        chart={DIAGRAMS['diag-composite-exercise']}
                                        ariaLabel="総合演習のネットワーク設計図。管理通信はIAPからbastionを経由し、一般トラフィックはHTTPのみ公開される経路を示す。"
                                    />
                                </div>
                                <p className="diagram__cap">
                                    図 8-1 — 管理アクセスは IAP → bastion → app の一方向。公開は
                                    HTTP だけ。
                                </p>
                            </div>

                            <h3>8-3. 必要なファイアウォールルール（タグ設計）</h3>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">ルール</th>
                                            <th scope="col">方向</th>
                                            <th scope="col">許可</th>
                                            <th scope="col">ソース</th>
                                            <th scope="col">ターゲットタグ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>IAP からの SSH</td>
                                            <td>Ingress</td>
                                            <td>tcp:22</td>
                                            <td>
                                                <code>35.235.240.0/20</code>
                                            </td>
                                            <td>
                                                <code>ssh-iap</code> (bastion)
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>世界への HTTP</td>
                                            <td>Ingress</td>
                                            <td>tcp:80</td>
                                            <td>
                                                <code>0.0.0.0/0</code>
                                            </td>
                                            <td>
                                                <code>http</code> (juice-shop)
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>bastion からの内部 SSH</td>
                                            <td>Ingress</td>
                                            <td>tcp:22</td>
                                            <td>管理サブネットの CIDR</td>
                                            <td>
                                                <code>ssh-internal</code> (juice-shop)
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <h3>8-4. 設計の要点</h3>
                            <div className="diagram">
                                <div className="mermaid">
                                    <MermaidDiagram
                                        chart={DIAGRAMS['diag-securing-steps']}
                                        ariaLabel="セキュア化設計手順。不要ルールの削除、タグ設計、最小権限ルールの作成、テスト接続の4ステップを示す。"
                                    />
                                </div>
                                <p className="diagram__cap">図 8-2 — セキュア化の手順。</p>
                            </div>
                            <div className="callout callout--best">
                                <span className="callout__k">最重要原則 · 最小権限</span>
                                <p>
                                    ソース範囲は必ず<strong>最小限</strong>に。「とりあえず{' '}
                                    <code>0.0.0.0/0</code>」は SSH では絶対に避け、SSH は IAP
                                    範囲か管理サブネットの CIDR に限定します。HTTP
                                    だけは公開サービスの性質上 <code>0.0.0.0/0</code>{' '}
                                    が妥当ですが、それ以外のポートは公開しません。
                                </p>
                            </div>
                            <div className="callout callout--note">
                                <span className="callout__k">トラブル時のヒント</span>
                                <p>
                                    <code>gcloud compute ssh</code> や IAP
                                    トンネルで接続できないときは <code>--troubleshoot</code>{' '}
                                    フラグを付けると、ファイアウォール・IAM・ネットワーク到達性を自動診断してくれます。
                                </p>
                            </div>

                            {/* ---- Glossary S8 ---- */}
                            <aside className="glossary" aria-label="このセクションの用語解説">
                                <p className="glossary__title">用語解説</p>
                                <dl className="glossary__grid">
                                    <div className="glossary__item">
                                        <dt className="glossary__term">bastion（踏み台ホスト）</dt>
                                        <dd className="glossary__def">
                                            プライベートネットワーク内への SSH
                                            の中継点となるサーバー。IAP を使えば bastion 自体に外部
                                            IP を付けずに運用できる。
                                        </dd>
                                    </div>
                                    <div className="glossary__item">
                                        <dt className="glossary__term">攻撃面（Attack Surface）</dt>
                                        <dd className="glossary__def">
                                            攻撃者がシステムに侵入できる可能性のある経路の総体。開放ポート・パブリック
                                            IP・許可した IP 範囲を最小化することで攻撃面を縮小する。
                                        </dd>
                                    </div>
                                    <div className="glossary__item">
                                        <dt className="glossary__term">タグ設計（Tag Strategy）</dt>
                                        <dd className="glossary__def">
                                            VM の役割（bastion / web / db
                                            など）に対応したネットワークタグを体系的に設計し、ファイアウォールルールを整理する手法。
                                        </dd>
                                    </div>
                                    <div className="glossary__item">
                                        <dt className="glossary__term">
                                            セキュリティ強化（Hardening）
                                        </dt>
                                        <dd className="glossary__def">
                                            不要なポートの閉鎖、デフォルトルールの削除、最小権限の適用など、システムの攻撃耐性を高めるための一連の設定作業。
                                        </dd>
                                    </div>
                                </dl>
                            </aside>
                        </section>

                        {/* ====================================================== */}
                        {/* 9. チェックリスト */}
                        {/* ====================================================== */}
                        <section className="section" id="s9">
                            <div className="section__head">
                                <span className="section__num">09</span>
                                <h2>ベストプラクティス チェックリスト</h2>
                            </div>

                            <div className="check-group">
                                <h4>ネットワーク設計</h4>
                                <ul className="check">
                                    <li className="check-item">
                                        本番ではカスタムモード VPC
                                        を使い、サブネットを意図的に設計する
                                    </li>
                                    <li className="check-item">
                                        サブネットの CIDR は重複させない（特にマルチ NIC や VPC
                                        ピアリングで必須）
                                    </li>
                                    <li className="check-item">
                                        異なる VPC 間通信は VPC ピアリング / VPN で明示的に設定する
                                    </li>
                                </ul>
                            </div>
                            <div className="check-group">
                                <h4>ファイアウォール</h4>
                                <ul className="check">
                                    <li className="check-item">
                                        ソース範囲は最小限にする（<code>0.0.0.0/0</code> を SSH/RDP
                                        に使わない）
                                    </li>
                                    <li className="check-item">
                                        ターゲットはネットワークタグで絞り、「全インスタンス」適用を避ける
                                    </li>
                                    <li className="check-item">
                                        <code>default-allow-ssh</code> /{' '}
                                        <code>default-allow-rdp</code>{' '}
                                        のデフォルトルールは削除/無効化する
                                    </li>
                                    <li className="check-item">
                                        LB 利用時は <code>130.211.0.0/22</code> と{' '}
                                        <code>35.191.0.0/16</code> からのヘルスチェックを許可する
                                    </li>
                                </ul>
                            </div>
                            <div className="check-group">
                                <h4>アクセス制御</h4>
                                <ul className="check">
                                    <li className="check-item">
                                        外部 IP なしの VM へは IAP TCP
                                        フォワーディングでアクセスする
                                    </li>
                                    <li className="check-item">
                                        IAP は <code>35.235.240.0/20</code>{' '}
                                        のみを許可するファイアウォールと組み合わせる
                                    </li>
                                    <li className="check-item">
                                        IAP-Secured Tunnel User ロールは
                                        VM/プロジェクト単位で最小限に付与する
                                    </li>
                                    <li className="check-item">
                                        可能なら Chrome Enterprise Premium
                                        のアクセスレベルでコンテキスト認識アクセスを追加する
                                    </li>
                                </ul>
                            </div>
                            <div className="check-group">
                                <h4>IAM / サービスアカウント</h4>
                                <ul className="check">
                                    <li className="check-item">
                                        最小権限の原則に従い、必要なロールだけを付与する
                                    </li>
                                    <li className="check-item">
                                        ネットワーク管理とセキュリティ管理のロールを分離する（職務分掌）
                                    </li>
                                    <li className="check-item">
                                        サービスアカウントキー (JSON) の発行を避け、VM
                                        への直接アタッチを使う
                                    </li>
                                </ul>
                            </div>
                            <div className="check-group">
                                <h4>ロードバランシング / エッジ防御</h4>
                                <ul className="check">
                                    <li className="check-item">
                                        バックエンドは複数ゾーン/リージョンに配置して可用性を確保する
                                    </li>
                                    <li className="check-item">
                                        内部サービスのバックエンド VM には外部 IP を付けない
                                    </li>
                                    <li className="check-item">
                                        Cloud Armor は可能なら「デフォルト Deny +
                                        許可リスト」方式にする
                                    </li>
                                    <li className="check-item">
                                        Cloud Armor
                                        とヘルスチェックのログを有効にして可観測性を確保する
                                    </li>
                                </ul>
                            </div>
                        </section>

                        {/* ====================================================== */}
                        {/* 10. Sources */}
                        {/* ====================================================== */}
                        <section className="section" id="s10">
                            <div className="section__head">
                                <span className="section__num">10</span>
                                <h2>参考ソース（公式ドキュメント URL）</h2>
                            </div>

                            <div className="src-grid">
                                <div className="src-card">
                                    <h4>Identity-Aware Proxy (IAP)</h4>
                                    <ul>
                                        <li>
                                            <a
                                                href="https://cloud.google.com/iap/docs/using-tcp-forwarding"
                                                target="_blank"
                                                rel="noopener"
                                            >
                                                IAP TCP フォワーディングの使用 ↗
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://cloud.google.com/iap/docs/tcp-by-host"
                                                target="_blank"
                                                rel="noopener"
                                            >
                                                IAP TCP フォワーディングのセットアップ ↗
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://cloud.google.com/iap/docs/faq"
                                                target="_blank"
                                                rel="noopener"
                                            >
                                                IAP のトラブルシューティング / FAQ ↗
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://cloud.google.com/iap/docs/load-balancer-howto"
                                                target="_blank"
                                                rel="noopener"
                                            >
                                                外部 LB のセットアップ (IAP) ↗
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="src-card">
                                    <h4>VPC ネットワーク / ファイアウォール</h4>
                                    <ul>
                                        <li>
                                            <a
                                                href="https://cloud.google.com/vpc/docs/vpc"
                                                target="_blank"
                                                rel="noopener"
                                            >
                                                VPC ネットワークの概要 ↗
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://cloud.google.com/firewall/docs/firewalls"
                                                target="_blank"
                                                rel="noopener"
                                            >
                                                VPC ファイアウォールルールの概要 ↗
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://cloud.google.com/compute/docs/connect/ssh-best-practices/network-access"
                                                target="_blank"
                                                rel="noopener"
                                            >
                                                SSH ネットワークアクセス制御のベストプラクティス ↗
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://cloud.google.com/vpc/docs/create-use-multiple-interfaces"
                                                target="_blank"
                                                rel="noopener"
                                            >
                                                複数ネットワークインターフェース ↗
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="src-card">
                                    <h4>IAM / サービスアカウント</h4>
                                    <ul>
                                        <li>
                                            <a
                                                href="https://cloud.google.com/iam/docs/overview"
                                                target="_blank"
                                                rel="noopener"
                                            >
                                                IAM の概要 ↗
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://cloud.google.com/compute/docs/access/iam"
                                                target="_blank"
                                                rel="noopener"
                                            >
                                                Compute Engine の IAM ロール ↗
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://cloud.google.com/iam/docs/best-practices-service-accounts"
                                                target="_blank"
                                                rel="noopener"
                                            >
                                                サービスアカウントのベストプラクティス ↗
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="src-card">
                                    <h4>ロードバランシング</h4>
                                    <ul>
                                        <li>
                                            <a
                                                href="https://cloud.google.com/load-balancing/docs/load-balancing-overview"
                                                target="_blank"
                                                rel="noopener"
                                            >
                                                Cloud Load Balancing の概要 ↗
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://cloud.google.com/load-balancing/docs/health-check-concepts"
                                                target="_blank"
                                                rel="noopener"
                                            >
                                                ヘルスチェックの概要（IP 範囲） ↗
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://cloud.google.com/load-balancing/docs/health-checks"
                                                target="_blank"
                                                rel="noopener"
                                            >
                                                ヘルスチェックの使用 ↗
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://cloud.google.com/load-balancing/docs/https/setting-up-https"
                                                target="_blank"
                                                rel="noopener"
                                            >
                                                外部 Application LB のセットアップ ↗
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://cloud.google.com/load-balancing/docs/internal"
                                                target="_blank"
                                                rel="noopener"
                                            >
                                                内部 passthrough Network LB ↗
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="src-card">
                                    <h4>Cloud Armor</h4>
                                    <ul>
                                        <li>
                                            <a
                                                href="https://cloud.google.com/armor/docs/cloud-armor-overview"
                                                target="_blank"
                                                rel="noopener"
                                            >
                                                Google Cloud Armor の概要 ↗
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="https://cloud.google.com/armor/docs/configure-security-policies"
                                                target="_blank"
                                                rel="noopener"
                                            >
                                                セキュリティポリシーの設定 ↗
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="src-card">
                                    <h4>スキルバッジ（元ラボ）</h4>
                                    <ul>
                                        <li>
                                            <a
                                                href="https://www.cloudskillsboost.google/course_templates/635"
                                                target="_blank"
                                                rel="noopener"
                                            >
                                                Build a Secure Google Cloud Network ↗
                                            </a>
                                            <span className="doc">cloudskillsboost.google</span>
                                        </li>
                                        <li>
                                            <a
                                                href="https://www.skills.google/course_templates/654"
                                                target="_blank"
                                                rel="noopener"
                                            >
                                                関連コース (skills.google/654) ↗
                                            </a>
                                            <span className="doc">skills.google</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* ---------- Footer ---------- */}
                        <footer>
                            <p className="closing">
                                学習を次に進めるために —
                                各ラボの手順を一度なぞったら、必ず「なぜこの設定なのか」を自問してください。特に
                                <strong style={{ color: 'var(--amber)' }}>
                                    「ソース範囲は最小か」「タグで絞れているか」「外部 IP
                                    は本当に必要か」
                                </strong>
                                の 3
                                点は、本番設計でもセキュリティレビューでも問われ続ける核心です。
                            </p>
                            <div>
                                Google Cloud ネットワークセキュリティ実践ガイド · defense in depth ·
                                図版は Mermaid で描画
                            </div>
                        </footer>
                    </div>
                </main>
            </div>
        </div>
    );
}
