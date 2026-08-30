'use client';

import { memo, useState, type FC } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { NavBar } from './NavBar';
import { DIAGRAMS, type DiagramId } from './constants';

interface DiagramProps {
    id: DiagramId;
    label: string;
}

const Diagram: FC<DiagramProps> = memo(function Diagram({ id, label }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap">
            <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale={true} />
        </div>
    );
});

export const InfrastructureAsCodeGuide: FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

    const toggleCheck = (id: string) => {
        setCheckedItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const completedCount = Object.values(checkedItems).filter(Boolean).length;

    return (
        <div className="infrastructure-as-code-page">
            <div className="layout">
                <button
                    className="sidebar-toggle"
                    id="sidebarToggle"
                    type="button"
                    aria-label="メニュー"
                    aria-controls="sidebar"
                    aria-expanded={isSidebarOpen}
                    onClick={() => setIsSidebarOpen((prev) => !prev)}
                >
                    ☰
                </button>
                <NavBar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                <main className="main">
<div className="hero">
                    <div className="kicker">Infrastructure as Code &middot; 実践ガイド</div>
                    <h1>Infrastructure as Code 実践ガイド ― 初学者のためのステップバイステップ・ベストプラクティス</h1>
                    <div className="meta-row">
                        <span className="pill">対象 <strong>初学者</strong></span>
                        <span className="pill">形式 <strong>ステップバイステップ</strong></span>
                        <span className="pill">図解 <strong>Mermaid 26点</strong></span>
                        <span className="pill">参考文献 <strong>27件</strong></span>
                    </div>
                </div>

                <p>本ガイドは、Kief Morris 著『Infrastructure as Code』(O&apos;Reilly Media)の考え方を土台に、2026年8月時点の最新エコシステム(Terraform / OpenTofu / Pulumi / GitOps / Policy as Code など)を踏まえて再構成した、初学者向けの実践ガイドです。書籍そのものの文章を引用するのではなく、書籍が提示する原則・パターン・プラクティスの「考え方」を自分の言葉で解説し、現在の業界標準ツールに当てはめて説明します。書籍原本: <a href="https://www.oreilly.com/library/view/infrastructure-as-code/9781098150341/">Infrastructure as Code, 3rd Edition — O&apos;Reilly</a>(初版: <a href="https://www.oreilly.com/library/view/infrastructure-as-code/9781491924334/">1st Edition</a>)</p>

<h2 id="この記事の対象読者" tabIndex={-1}>この記事の対象読者</h2>

<ul><li>サーバーやクラウドリソースを「手作業(クリック運用)」で構築・変更してきたが、そろそろコード化したいと考えているエンジニア</li><li>Terraform や CloudFormation を触り始めたばかりで、「動くコード」は書けるが「壊れにくいコード」の書き方が分からない人</li><li>チームでインフラコードを共同管理する上でのベストプラクティスを体系的に学びたい人</li></ul>

<h2 id="第0部-Infrastructure-as-Code-とは何かなぜ必要か" tabIndex={-1}>第0部: Infrastructure as Code とは何か、なぜ必要か</h2>

<p>Infrastructure as Code(IaC)とは、サーバー・ネットワーク・データベースといったインフラリソースを、<strong>コンソール画面のクリック操作ではなく、コードとして定義し、バージョン管理し、自動化された仕組みで適用する</strong>アプローチです。</p>

<p>Kief Morris は著書の中で、仮想化・クラウド・コンテナ・SDN(Software-Defined Networking)といった技術は本来 IT 運用をシンプルにするはずだったのに、多くの組織ではむしろ「管理しきれないシステムの乱立(スプロール)」を招いてしまったと指摘しています。IaC は、この問題を解決するために DevOps ムーブメントが生み出した原則・プラクティス・パターンを、クラウド時代のインフラ管理に適用する考え方です。</p>

<h3 id="なぜ今さら-IaC-なのか2026年の視点" tabIndex={-1}>なぜ今さら IaC なのか(2026年の視点)</h3>

<p>「クラウドを使っている」ことと「IaC を実践している」ことはイコールではありません。マネジメントコンソールで数百個のリソースをポチポチ作った環境は、たとえクラウド上にあっても、書籍が警告する「スノーフレークシステム(世界に一つしかない、再現不能な環境)」そのものです。</p>

<Diagram id="diag-1" label="Infrastructure as Code 図解 1" />

<h3 id="コアプラクティス書籍が定義する3本柱" tabIndex={-1}>コアプラクティス(書籍が定義する3本柱)</h3>

<p>Kief Morris は IaC の核心を、次の3つのコアプラクティスに整理しています。初学者はまずこの3つを覚えるだけで、IaC の目的の8割を理解できます。</p>

<Diagram id="diag-2" label="Infrastructure as Code 図解 2" />

<div className="callout-practice"><div className="icon">✓</div><div className="body"><div className="label">ベストプラクティス</div><ul><li>IaC 導入の最初のステップは「ツール選び」ではなく「何をコード化するかの範囲を決めること」から始める</li><li>いきなり本番の巨大インフラを一括コード化しようとせず、新規リソースや影響範囲の小さい部分から始める</li><li>手作業での変更(いわゆる &quot;ClickOps&quot;)を許すと、コードと実態が乖離する「ドリフト(Drift)」が発生するため、早い段階でチームのルールとして禁止する</li></ul></div></div>

<h3 id="よくある3つの誤解" tabIndex={-1}>よくある3つの誤解</h3>

<p>書籍では、IaC 導入を妨げる典型的な思い込みを「神話(Myth)」として3つ挙げています。</p>

<div className="table-scroll"><table><thead><tr className="header"><th scope="col">神話</th><th scope="col">実際のところ</th></tr></thead><tbody><tr className="odd"><td>インフラはそう頻繁に変わらない</td><td>クラウド時代はスケーリング・パッチ適用・構成変更が日常的に発生し、変更こそが常態である</td></tr><tr className="even"><td>インフラは先に構築してから、あとで自動化すればいい</td><td>後付けの自動化は「今動いている状態」を正として逆算する必要があり、最初からコード化するより遥かにコストが高い</td></tr><tr className="odd"><td>スピードと品質はトレードオフである</td><td>自動化されたテストとデリバリーパイプラインがあれば、変更を高速化しながら品質(信頼性)も同時に高められる</td></tr></tbody></table></div>

<h3 id="DORA-Four-Keys-―-速いか安全かではなく両方測る" tabIndex={-1}>DORA Four Keys ― 「速いか安全か」ではなく両方測る</h3>

<p>3つ目の神話(速度と品質のトレードオフ)を定量的に裏付けるのが、Google Cloud の DevOps Research and Assessment(DORA)チームによる調査です。DORA は、書籍 <em>Accelerate</em>(Nicole Forsgren, Jez Humble, Gene Kim 著)を通じて、ソフトウェアデリバリーのパフォーマンスを4つの指標で測定できることを示しました。</p>

<Diagram id="diag-3" label="Infrastructure as Code 図解 3" />

<p>なお、2024年版で追加された5つ目のデリバリー指標は「デプロイの再作業率(rework rate)」であり、信頼性(Reliability)はデリバリー指標ではなく運用パフォーマンスの指標として別枠で扱われます。</p>

<p>DORA の 2024 State of DevOps Report では、エリートパフォーマーはオンデマンドで複数回デプロイし、リードタイムは1日未満、変更失敗率は5%前後、障害復旧は1時間以内という水準にあると報告されています。ただし、DORA の 2025 年のレポート(State of AI-assisted Software Development)では、AI 活用の広がりに伴ってスループット(デプロイ頻度・リードタイム)と不安定性(変更失敗率など)をどう両立させるかが主要な論点として取り上げられています。デプロイ頻度・リードタイムだけを見て開発生産性を判断せず、DORAはあくまで「土台」として捉え、他の指標と組み合わせて評価するのが実務上の潮流です。</p>

<hr />

<h2 id="第1部-基礎編-IaC-の土台となる考え方" tabIndex={-1}>第1部 基礎編: IaC の土台となる考え方</h2>

<h3 id="第1章-Infrastructure-as-Code-とは何か" tabIndex={-1}>第1章: Infrastructure as Code とは何か</h3>

<p><strong>鉄器時代からクラウド時代へ</strong></p>

<p>書籍は、インフラの歴史を「鉄器時代(Iron Age)」から「クラウド時代(Cloud Age)」への移行として描いています。物理サーバーを1台ずつ手作業でセットアップしていた時代から、API 経由でオンデマンドにリソースを生成・破棄できる時代への変化です。この変化が持つ本質的な意味は、「インフラの変更コストが劇的に下がった」ことにあります。</p>

<Diagram id="diag-4" label="Infrastructure as Code 図解 4" />

<p><strong>戦略目標とアーキテクチャ目標</strong></p>

<p>IaC は目的ではなく手段です。書籍は IaC がもたらす価値を、組織の戦略目標(コスト最適化、成長への対応、コンプライアンス遵守)とシステムアーキテクチャ目標(回復性、スケーラビリティ、セキュリティ)の両方に結びつけて説明しています。初学者がここで押さえるべきなのは、「変更を最適化する(Optimize for Change)」という一貫した思想です。変更を安全・迅速・確実に行えるようにすることが、あらゆる IaC プラクティスの根底にあります。</p>

<div className="callout-practice"><div className="icon">✓</div><div className="body"><div className="label">ベストプラクティス</div><ul><li>IaC 導入を提案するときは、「クールだから」ではなく「変更のリードタイムをどれだけ短縮できるか」「障害復旧時間をどれだけ短縮できるか」という具体的な指標で語る</li><li>チームや経営層に対しては、DORA Four Keys のような定量指標で Before/After を示すと説得力が増す</li></ul></div></div>

<h3 id="第2章-クラウド時代のインフラ原則" tabIndex={-1}>第2章: クラウド時代のインフラ原則</h3>

<p>書籍第2章では、クラウドインフラを扱う上で前提とすべき6つの原則が示されています。初学者はこれを「クラウドあるある」の裏返しとして理解すると覚えやすいです。</p>

<div className="table-scroll"><table><thead><tr className="header"><th scope="col">原則</th><th scope="col">意味</th><th scope="col">具体例</th></tr></thead><tbody><tr className="odd"><td>システムは信頼できないと想定する</td><td>ハードウェア障害・ネットワーク分断は日常的に起こる前提で設計する</td><td>Auto Scaling グループ、マルチAZ配置</td></tr><tr className="even"><td>すべてを再現可能にする</td><td>同じコードから何度でも同じ環境を作れるようにする</td><td>設定・プロバイダー・外部の状態が安定していれば、Terraform の <code>apply</code> の再実行で望ましい状態へ収束する(コード外で変更が加わった場合は再適用時に差分が生じ得る)</td></tr><tr className="odd"><td>スノーフレークシステムを避ける</td><td>手作業のパッチが積み重なった「世界に一つだけの」環境を作らない</td><td>手動SSHでの設定変更を禁止し、必ずコード変更経由にする</td></tr><tr className="even"><td>使い捨て可能なものを作る</td><td>サーバーやコンテナは壊れたら再作成すればよい対象として扱う</td><td>Immutable Server(イミュータブルサーバー)パターン</td></tr><tr className="odd"><td>バリエーションを最小化する</td><td>環境ごとの差異(dev/staging/prodの違い)を極力減らす</td><td>同じモジュールをパラメータだけ変えて複数環境に適用</td></tr><tr className="even"><td>あらゆる手順を繰り返し可能にする</td><td>一度きりの手作業手順ではなく、何度でも実行できる手順にする</td><td>手順書(Runbook)をスクリプト化する</td></tr></tbody></table></div>

<Diagram id="diag-5" label="Infrastructure as Code 図解 5" />

<p>さらに書籍は、これらの原則を実現する手段として「ソフトウェア設計の原則」をインフラコードにも適用すべきだと述べています。これは第5章の CUPID プロパティに直結する重要な布石です。</p>

<h3 id="第3章-インフラプラットフォームを理解する" tabIndex={-1}>第3章: インフラプラットフォームを理解する</h3>

<p>「プラットフォーム」という言葉は曖昧に使われがちですが、書籍では <strong>インフラプラットフォーム = アプリケーションやサービスを実行するために必要なリソース群一式</strong> と定義しています。IaC を学ぶ上では、自分が扱っている対象がどのレイヤーのプラットフォームなのかを意識することが重要です。</p>

<Diagram id="diag-6" label="Infrastructure as Code 図解 6" />

<p>書籍はまた、プラットフォームが提供すべき4種類のサービス(プラットフォームデリバリーサービス、アプリケーションデリバリーサービス、インフラデリバリーサービス、プラットフォーム管理サービス)を整理しています。初学者向けに単純化すると、「プラットフォームチームは “道具を配る人” であり、アプリケーションチームは “道具を使う人”」という役割分担のイメージを持つと理解しやすいです。近年の<strong>プラットフォームエンジニアリング(Platform Engineering)</strong>という潮流は、まさにこの考え方を体系化したものです。</p>

<div className="callout-practice"><div className="icon">✓</div><div className="body"><div className="label">ベストプラクティス</div><ul><li>マルチクラウド戦略を検討する際は「本当に複数クラウドを同時運用する必要があるか」を精査する。書籍も、マルチクラウドは複雑性のコストに見合うメリットがある場合のみ採用すべきだと警告している</li><li>プラットフォームチームを作る場合は、アプリケーションチームがセルフサービスで使える「ゴールデンパス」を用意し、個別対応の依頼を減らす</li></ul></div></div>

<h3 id="第4章-IaC-のツールと言語" tabIndex={-1}>第4章: IaC のツールと言語</h3>

<p><strong>コードで書けるもの・書けないもの</strong></p>

<p>初学者がまず混乱しやすいのが「コードなのか設定なのか」という線引きです。書籍は、タスクベースのスクリプト(「これをやれ、次にこれをやれ」という手続き)から脱却し、インフラのあるべき状態を宣言的に記述する方向へ進化してきた歴史を説明しています。</p>

<Diagram id="diag-7" label="Infrastructure as Code 図解 7" />

<div className="table-scroll"><table><thead><tr className="header"><th scope="col">観点</th><th scope="col">手続き型(Imperative)</th><th scope="col">宣言型(Declarative)</th></tr></thead><tbody><tr className="odd"><td>記述内容</td><td>実行する「手順」</td><td>あるべき「状態」</td></tr><tr className="even"><td>差分計算</td><td>開発者が自分で考える必要がある</td><td>ツールが自動計算する(例: <code>terraform plan</code>)</td></tr><tr className="odd"><td>代表的なツール</td><td>Bash スクリプト、Ansible の一部機能</td><td>Terraform、OpenTofu、CloudFormation、Pulumi(宣言的に使う場合)</td></tr><tr className="even"><td>向いている用途</td><td>一度きりの複雑な移行処理</td><td>継続的に管理するインフラ全般</td></tr></tbody></table></div>

<p><strong>コード実行のタイミングと状態管理</strong></p>

<p>IaC ツールを使う上で必ず理解すべき概念が「いつコードが実行されるか」と「インフラの状態(State)をどう管理するか」です。多くの初学者がつまずくのはここです。</p>

<Diagram id="diag-8" label="Infrastructure as Code 図解 8" />

<div className="callout-practice"><div className="icon">✓</div><div className="body"><div className="label">ベストプラクティス</div><ul><li>状態ファイル(Terraform の <code>terraform.tfstate</code> など)は「インフラの中で最も危険なファイル」と心得る。リソースID・出力値・場合によっては平文シークレットが含まれるため、ローカルや Git に直接コミットしない</li><li><strong>リモートバックエンド</strong>で共有する(S3、Azure Blob Storage、GCS、HCP Terraform など)。チーム全員が同じ State を参照でき、バージョニングやアクセス制御をバックエンド側の機能に任せられる</li><li><strong>保存時暗号化</strong>を有効にする。バックエンド側の暗号化(S3 のサーバーサイド暗号化など)に加え、OpenTofu では State と plan ファイル自体をクライアント側で暗号化する <strong>State Encryption</strong> 機能が使える(これはバックエンドの一種ではなく、任意のバックエンドの上に重ねる暗号化機能で、Terraform には同等の機能がない)。ただし State Encryption は鍵を失うと State も plan も復号できなくなるため、有効化する <strong>前に</strong> 鍵管理と復旧の手順を必ず整備する: ① 鍵の保管場所(KMS / Vault など)を文書化する、② 鍵を冗長にバックアップし、State バックエンドとは別の障害ドメインに保管する、③ 鍵ローテーションの手順と頻度を定める、④ バックアップ鍵からの復号・復旧を定期的にリハーサルして手順が機能することを確認する</li><li><strong>State locking</strong> で同時実行による破損を防ぐ。Terraform の S3 backend では現行のロック方法は <code>use_lockfile = true</code>(S3 のコンディショナルライトを使うネイティブロック)であり、従来の <code>dynamodb_table</code> によるロックは非推奨で将来のマイナーバージョンで削除予定</li><li><code>plan</code> の結果を必ず人間または自動ポリシーチェックがレビューしてから <code>apply</code> する運用を徹底する。CI パイプラインで <code>apply</code> を自動実行する場合も、承認ステップを挟む</li><li><strong>レビューした plan ファイルそのものを <code>apply</code> に渡す</strong>。<code>apply</code> 時に plan を作り直すと、レビューから承認までの間に実インフラ・変数・プロバイダーのバージョンが変化していた場合に、レビューされていない変更がそのまま適用されてしまう。自動実行では次の順序を必須とする: ① <code>terraform plan -out=tfplan</code>(<code>tofu plan -out=tfplan</code>)で plan をファイルに保存する、② 保存した plan を <code>terraform show -json tfplan</code> などでレビュー・ポリシー検査する、③ <code>terraform apply tfplan</code>(<code>tofu apply tfplan</code>)のように保存済み plan を明示的に渡して適用する。なお plan ファイルは機微値を平文で含みうるため、保管場所のアクセス制御と保持期間も併せて定める</li><li>ツール選定よりも先に「状態管理の方針」を決める。ツールを乗り換えても状態管理の失敗は同じ形で繰り返される</li></ul></div></div>

<hr />

<h2 id="第2部-設計編-壊れにくいインフラコードを設計する" tabIndex={-1}>第2部 設計編: 壊れにくいインフラコードを設計する</h2>

<p>インフラコードも所詮は「コード」です。書籍の最大の主張の一つは、<strong>ソフトウェア工学で培われた設計原則をインフラコードにも適用すべき</strong>というものです。第2部では、この設計思想を具体的なパターンに落とし込んでいきます。</p>

<h3 id="第5章-設計原則と-CUPID-プロパティ" tabIndex={-1}>第5章: 設計原則と CUPID プロパティ</h3>

<p><strong>なぜ SOLID ではなく CUPID なのか</strong></p>

<p>書籍は、インフラコードの設計指針として、著名なソフトウェアデザインコンサルタント <strong>Dan North</strong> が提唱した <strong>CUPID プロパティ</strong>を採用しています。CUPID は、オブジェクト指向設計で有名な SOLID 原則の「次の一手」として提案されたもので、「厳格なルール」ではなく「コードが持つべき性質(プロパティ)」として設計を評価する考え方です。</p>

<Diagram id="diag-9" label="Infrastructure as Code 図解 9" />

<p>初学者向けに超訳すると、「一つのモジュールに何でも詰め込まず、名前から中身が予測でき、他のモジュールと自由に組み合わせられる部品を作る」ということです。この考え方は Azure や AWS が公式に提供する検証済みモジュール群(Verified/Reference Modules)の設計原則としても参照されています。</p>

<p><strong>凝集度と結合度</strong></p>

<p>CUPID と並んで重要なのが、<strong>凝集度(Cohesion)</strong> と <strong>結合度(Coupling)</strong> です。</p>

<div className="table-scroll"><table><thead><tr className="header"><th scope="col">概念</th><th scope="col">望ましい状態</th><th scope="col">望ましくない状態</th></tr></thead><tbody><tr className="odd"><td>凝集度(Cohesion)</td><td>高い: 一つのモジュール内の要素が強く関連し、一つの目的に集中している</td><td>低い: 無関係な機能が一つのモジュールに雑多に詰め込まれている</td></tr><tr className="even"><td>結合度(Coupling)</td><td>低い: モジュール間の依存が最小限で、一方の変更が他方に波及しにくい</td><td>高い: モジュール同士が密結合し、一箇所の変更が連鎖的に他へ影響する</td></tr></tbody></table></div>

<div className="callout-practice"><div className="icon">✓</div><div className="body"><div className="label">ベストプラクティス</div><ul><li>モジュールを設計するときは「このモジュールが変更される理由は一つに絞れているか?」を自問する</li><li>モジュール間のインターフェース(入力変数・出力値)は最小限かつ明示的にし、内部実装の詳細を外部に漏らさない(Facade パターン、第10章で詳述)</li></ul></div></div>

<h3 id="第6章-インフラコンポーネントとスタック" tabIndex={-1}>第6章: インフラコンポーネントとスタック</h3>

<p><strong>ワークロード駆動の設計</strong></p>

<p>書籍は、インフラ設計の出発点は「インフラそのもの」ではなく「そのインフラが支えるワークロード(アプリケーションやサービス)」であるべきだと述べています。この考え方を「アプリケーション駆動インフラ設計」と呼びます。</p>

<Diagram id="diag-10" label="Infrastructure as Code 図解 10" />

<p><strong>インフラデプロイメントスタックとは</strong></p>

<p>「スタック」とは、一度のデプロイ操作(<code>terraform apply</code> など)で一括して作成・更新・削除される、ひとまとまりのインフラリソース群を指します。書籍はスタックを IaC 設計の基本単位として位置づけています。</p>

<div className="callout-practice"><div className="icon">✓</div><div className="body"><div className="label">ベストプラクティス</div><ul><li>スタックの境界は「一緒に変更される頻度が高いリソース」でまとめる。変更頻度が異なるリソース(例: 滅多に変わらないネットワーク基盤と、頻繁に変わるアプリケーション設定)は別スタックに分離する</li><li>コードライブラリ(モジュール)とスタックを混同しない。モジュールは「再利用可能な設計図」、スタックは「実際にデプロイされる実体」である</li></ul></div></div>

<h3 id="第7章-デプロイ可能なスタックの設計パターン" tabIndex={-1}>第7章: デプロイ可能なスタックの設計パターン</h3>

<p>書籍第7章では、スタックのサイズと構造に関する複数のパターンが紹介されています。初学者にとって最も実務的な意思決定ポイントがここです。</p>

<Diagram id="diag-11" label="Infrastructure as Code 図解 11" />

<div className="table-scroll"><table><thead><tr className="header"><th scope="col">パターン</th><th scope="col">メリット</th><th scope="col">デメリット</th><th scope="col">向いている場面</th></tr></thead><tbody><tr className="odd"><td>モノリシックスタック</td><td>シンプルで依存関係の管理が容易</td><td>変更のたびに巨大な <code>plan</code> が走り、影響範囲の把握が困難、チーム間の競合が起きやすい</td><td>小規模プロジェクト、PoC</td></tr><tr className="even"><td>アプリケーショングループスタック</td><td>関連サービスをまとめて一貫性を保てる</td><td>グループの粒度設計を誤ると結局モノリシックに近づく</td><td>密結合なマイクロサービス群</td></tr><tr className="odd"><td>シングルサービススタック</td><td>サービス単位でチームの所有権を明確化できる</td><td>サービス間の依存関係(第9章)を別途管理する必要がある</td><td>サービス単位でチームが分かれた組織</td></tr><tr className="even"><td>マイクロスタック</td><td>変更の影響範囲を最小化できる</td><td>スタック数が増えすぎると管理オーバーヘッドが増大する</td><td>非常に大規模かつ変更頻度の高いシステム</td></tr></tbody></table></div>

<p>書籍はさらに、複数インスタンス化のためのパターンとして「マルチ環境スタック(同じコードを dev/staging/prod に適用)」「再利用可能スタック(汎用モジュールとして複数チームに配布)」も紹介しています。</p>

<div className="callout-practice"><div className="icon">✓</div><div className="body"><div className="label">ベストプラクティス</div><ul><li>最初から細かく分割しすぎない。モノリシックから始め、実際にチーム間の競合やデプロイ時間の問題が顕在化してから段階的に分割する「進化的な分割」が現実的</li><li>スタックの粒度を決める基準は「技術的な美しさ」ではなく「誰が、どの頻度で、何を変更するか」というチームトポロジーの観点で判断する</li></ul></div></div>

<h3 id="第8章-設定管理とシークレットの取り扱い" tabIndex={-1}>第8章: 設定管理とシークレットの取り扱い</h3>

<p><strong>スタックパラメータの原則</strong></p>

<p>スタックを複数の環境(dev/staging/prod)にインスタンス化する際、環境ごとの差異は「パラメータ」として外部化します。書籍はここで重要な原則を示しています。<strong>パラメータはシンプルに保つ</strong>ことです。複雑な条件分岐をパラメータ経由で埋め込むと、コード自体よりもパラメータの組み合わせを追跡する方が難しくなります。</p>

<div className="table-scroll"><table><thead><tr className="header"><th scope="col">設定方法</th><th scope="col">特徴</th></tr></thead><tbody><tr className="odd"><td>手動パラメータ入力</td><td>最もシンプルだが、ヒューマンエラーのリスクが高く自動化に向かない</td></tr><tr className="even"><td>環境変数</td><td>CI/CD パイプラインとの親和性が高い</td></tr><tr className="odd"><td>スクリプトによる動的パラメータ生成</td><td>柔軟だが、ロジックが複雑化しやすい</td></tr><tr className="even"><td>設定ファイル(YAML/JSON/tfvars)</td><td>可読性が高くレビューしやすい。最も一般的。ただし Terraform/OpenTofu が変数定義ファイルとして自動認識するのは <code>.tfvars</code> と <code>.tfvars.json</code> のみで、YAML を使う場合は事前に <code>.tfvars</code>/<code>.tfvars.json</code> へ変換するか、<code>yamldecode()</code> などで読み取る処理が別途必要になる</td></tr><tr className="odd"><td>パイプラインのステージパラメータ</td><td>パイプラインのステージごとに値を切り替える</td></tr><tr className="even"><td>設定レジストリ(Parameter Store 等)</td><td>一元管理でき、複数スタックから参照可能</td></tr></tbody></table></div>

<p><strong>シークレット管理</strong></p>

<p>パスワードや API キーなどのシークレットは、通常のパラメータと同列に扱ってはいけません。書籍は複数のアプローチを比較しています。</p>

<Diagram id="diag-12" label="Infrastructure as Code 図解 12" />

<div className="callout-practice"><div className="icon">✓</div><div className="body"><div className="label">ベストプラクティス</div><ul><li>平文シークレットを絶対に Git リポジトリにコミットしない。誤ってコミットした場合は「削除」ではなく「値そのものをローテーション(無効化して再発行)」する</li><li>専用のシークレット管理サービス(Vault、Secrets Manager など)を使い、インフラコードには参照(ARN や Secret ID)のみを記述する</li><li>CI/CD パイプラインの実行ログにシークレットの値が出力されないよう、マスキング設定を必ず有効にする</li></ul></div></div>

<h3 id="第9章-スタック間の連携" tabIndex={-1}>第9章: スタック間の連携</h3>

<p>複数のスタックに分割すると、必然的に「スタックAが作ったリソースの情報を、スタックBがどう参照するか」という統合の問題が発生します。書籍はこれを <strong>リソースディスカバリー(Resource Discovery)</strong> の問題として整理しています。</p>

<div className="table-scroll"><table><thead><tr className="header"><th scope="col">パターン</th><th scope="col">仕組み</th><th scope="col">トレードオフ</th></tr></thead><tbody><tr className="odd"><td>リソースマッチング</td><td>タグや命名規則からクラウド API 経由で動的に検索する</td><td>柔軟だが、命名規則が崩れると誤検出のリスクがある</td></tr><tr className="even"><td>スタック状態の参照</td><td>他スタックの State ファイルから出力値を直接読み込む(<code>terraform_remote_state</code> など)</td><td>シンプルだが、スタック間に強い結合が生まれ、State 全体への読み取り権限が必要になる</td></tr><tr className="odd"><td>統合レジストリの参照</td><td>Parameter Store 等の中央レジストリに値を書き込み・読み込みする</td><td>疎結合を保てるが、レジストリ自体が単一障害点になりうる</td></tr><tr className="even"><td>コンポジションによる結線</td><td>上位のオーケストレーションコードで複数スタックの出力・入力を明示的に配線する</td><td>依存関係が明示的になるが、コンポジション層の管理コストが発生する</td></tr></tbody></table></div>

<div className="callout-practice"><div className="icon">✓</div><div className="body"><div className="label">ベストプラクティス</div><ul><li>スタック間の依存は「暗黙の名前規則」に頼らず、可能な限り明示的な出力(Output)と入力(Input)として定義する</li><li><code>terraform_remote_state</code> は参照側に <strong>State スナップショット全体への読み取り権限</strong> を要求する。State や Output にパスワード・API キーなどの秘密が含まれていると、それらが参照側スタックへそのまま公開されるため、そもそも秘密を State や Output に置かない方針を徹底する(秘密は Secrets Manager 等の専用ストアに置き、参照側がそこから直接取得する)</li><li>HCP Terraform を使う場合は、State 全体ではなく特定の Output だけを参照できる <code>tfe_outputs</code> データソースを用いて、露出範囲を限定する</li><li>依存関係が複雑になりすぎたら、それはスタック分割の粒度が細かすぎるサインとして再検討する</li></ul></div></div>

<h3 id="第10章-コードライブラリモジュールの設計パターン" tabIndex={-1}>第10章: コードライブラリ(モジュール)の設計パターン</h3>

<p>第10章は、いわゆる「Terraform モジュール」や「Pulumi コンポーネント」をどう設計するかについて、ソフトウェアのデザインパターンを応用した具体的な型を提示しています。</p>

<Diagram id="diag-13" label="Infrastructure as Code 図解 13" />

<div className="table-scroll"><table><thead><tr className="header"><th scope="col">パターン名</th><th scope="col">目的</th><th scope="col">使い所</th></tr></thead><tbody><tr className="odd"><td>Facade Module</td><td>複雑な複数リソースの組み合わせを、シンプルな入出力インターフェースの背後に隠す</td><td>チーム外への配布用モジュール</td></tr><tr className="even"><td>Unshared Module</td><td>あえて共有せず、単一の用途に特化させる</td><td>汎用化のコストが再利用のメリットを上回る場合</td></tr><tr className="odd"><td>Bundle Module</td><td>常に一緒に使われるリソース群をパッケージ化する</td><td>「Webサーバー+ロードバランサー+ヘルスチェック」のような定番構成</td></tr><tr className="even"><td>Infrastructure Domain Entity</td><td>ビジネスドメインの概念をそのままインフラの単位として表現する</td><td>「顧客ごとのテナント環境」のようなドメイン特化型の抽象化</td></tr><tr className="odd"><td>Modular Monolith</td><td>内部はモジュール分割しつつ、デプロイ単位は1つにまとめる</td><td>過度な分割によるオーバーヘッドを避けたい中規模チーム</td></tr><tr className="even"><td>Obfuscation Module(アンチパターン)</td><td>見た目だけシンプルにして複雑さを覆い隠す</td><td>避けるべき: 中身を理解せず使うと事故のもとになる</td></tr><tr className="odd"><td>Spaghetti Module(アンチパターン)</td><td>責務が絡み合い、変更の影響範囲が予測できない</td><td>避けるべき: リファクタリング対象</td></tr></tbody></table></div>

<div className="callout-practice"><div className="icon">✓</div><div className="body"><div className="label">ベストプラクティス</div><ul><li>モジュールの入力変数(Variables)は最小限に絞り、デフォルト値を適切に設定して「呼び出し側が意識すべきこと」を減らす</li><li>モジュールを公開・共有する前に、README とサンプルコードを必ず整備する。Terraform Registry や社内モジュールカタログのように、検索・発見しやすい場所に置く</li><li>「とりあえず薄くラップしただけ」の Obfuscation Module にならないよう、モジュール化によって本当に複雑さが減っているかを定期的に見直す</li></ul></div></div>

<h3 id="第11章-サーバーをコードとして構築する" tabIndex={-1}>第11章: サーバーをコードとして構築する</h3>

<p>コンテナやサーバーレスが主流になった今でも、多くのシステムは何らかの形で仮想マシン(サーバー)を必要とします。書籍は、サーバーの構成方法を大きく2つの軸で整理しています。</p>

<Diagram id="diag-14" label="Infrastructure as Code 図解 14" />

<p>さらにサーバーの更新方法についても、書籍は明確な優先順位を示しています。</p>

<div className="table-scroll"><table><thead><tr className="header"><th scope="col">更新方式</th><th scope="col">説明</th><th scope="col">評価</th></tr></thead><tbody><tr className="odd"><td>Push on Change(変更時にプッシュ)</td><td>変更があるたびに構成管理ツールを実行して反映</td><td>シンプルだが構成ドリフトが起きやすい</td></tr><tr className="even"><td>継続的構成同期(Continuous Configuration Synchronization)</td><td>エージェントが定期的にあるべき状態と現状を同期し続ける</td><td>ドリフトを自動的に是正できる</td></tr><tr className="odd"><td><strong>Immutable Server(イミュータブルサーバー)</strong></td><td>サーバーを直接変更せず、新しいイメージから作り直して置き換える</td><td>最も推奨。再現性が高く、インスタンス内部の設定ドリフトを抑え込める</td></tr></tbody></table></div>

<div className="callout-practice"><div className="icon">✓</div><div className="body"><div className="label">ベストプラクティス</div><ul><li>可能な限り Immutable Server パターンを採用し、「サーバーにログインして直接修正する」運用を根絶する</li><li>サーバーへの SSH アクセスは緊急時のデバッグ用に限定し、通常運用では利用しないルールを設ける(そもそもアクセスできない設計が理想)</li><li>コンテナベースのワークロードでは、この考え方はそのままイミュータブルなコンテナイメージの原則として引き継がれる</li></ul></div></div>

<h3 id="第12章-環境Environmentの設計" tabIndex={-1}>第12章: 環境(Environment)の設計</h3>

<p><strong>マルチ環境アーキテクチャ</strong></p>

<p>「環境」という言葉も曖昧に使われがちですが、書籍は環境を <strong>デリバリー環境(開発・ステージング・本番)</strong> と <strong>環境レプリカ(地理的分散、ユーザー層別)</strong> に分けて整理しています。</p>

<Diagram id="diag-15" label="Infrastructure as Code 図解 15" />

<p>環境を分割する軸としては、システムアーキテクチャに沿った分割、組織構造に沿った分割、ガバナンス要件(規制・コンプライアンス)に沿った分割の3種類が紹介されています。</p>

<div className="callout-practice"><div className="icon">✓</div><div className="body"><div className="label">ベストプラクティス</div><ul><li>dev/staging/prod の環境間で「バリエーションを最小化する」原則(第2章)を徹底し、本番だけ特別な構成になっていないか定期的に検証する</li><li>環境を増やす際は、増やすことによる恩恵(安全性の向上)と管理コスト(環境数 × 変更適用の手間)を天秤にかける</li></ul></div></div>

<hr />

<h2 id="第3部-デリバリー編-安全に届け変更し続ける" tabIndex={-1}>第3部 デリバリー編: 安全に届け、変更し続ける</h2>

<h3 id="第13章-コアインフラデリバリーワークフロー" tabIndex={-1}>第13章: コアインフラデリバリーワークフロー</h3>

<p>書籍は継続的デリバリーの原則をインフラコードに適用し、9つの原則を挙げていますが、初学者にとって特に重要なのは次の4つです。</p>

<div className="table-scroll"><table><thead><tr className="header"><th scope="col">原則</th><th scope="col">内容</th></tr></thead><tbody><tr className="odd"><td>プロセス全体を自動化する</td><td>手動ステップが1つでも残っていると、そこがボトルネックと事故の温床になる</td></tr><tr className="even"><td>自動化されたプロセス以外での変更を禁止する</td><td>「緊急だから直接コンソールで直した」を許容しない文化を作る</td></tr><tr className="odd"><td>変更を包括的に届ける</td><td>コードの一部だけでなく、関連する設定・ドキュメント・テストも一緒に届ける</td></tr><tr className="even"><td>デリバリーサイクルを短く保つ</td><td>変更をまとめて大きくするほど、リスクと切り分けの難しさが増す</td></tr></tbody></table></div>

<p>これらの原則の上に、書籍は開発 → ビルド → テスト → リリース → 実行という基本的なワークフローサイクルを定義しています。</p>

<Diagram id="diag-16" label="Infrastructure as Code 図解 16" />

<h3 id="第14章-パイプラインの構築と組織化" tabIndex={-1}>第14章: パイプラインの構築と組織化</h3>

<p><strong>ビルドとデプロイの2つの戦略</strong></p>

<p>書籍は、コードのビルドとデプロイをいつ結びつけるかについて、2つの代表的なワークフローを比較しています。</p>

<div className="table-scroll"><table><thead><tr className="header"><th scope="col">戦略</th><th scope="col">説明</th><th scope="col">メリット</th><th scope="col">デメリット</th></tr></thead><tbody><tr className="odd"><td>Build on Deploy</td><td>デプロイのたびにビルド(パッケージ化)も行う</td><td>シンプルで学習コストが低い</td><td>デプロイのたびに依存関係が変わるリスクがある(再現性が低い)</td></tr><tr className="even"><td>Build Once, Deploy Many</td><td>一度ビルドした成果物を、複数の環境に順番にデプロイする</td><td>全環境で全く同じ成果物が使われるため再現性が高い</td><td>ビルド成果物の保管・バージョン管理の仕組みが別途必要</td></tr></tbody></table></div>

<p>書籍は、テスト済みの成果物をそのまま昇格させる <strong>Build Once, Deploy Many</strong> を強く推奨しています。これは、アプリケーションのコンテナイメージを一度ビルドして dev → staging → prod と昇格させる、一般的な CI/CD のベストプラクティスと同じ発想です。</p>

<p><strong>ローカル開発とパイプラインの設計</strong></p>

<Diagram id="diag-17" label="Infrastructure as Code 図解 17" />

<div className="callout-practice"><div className="icon">✓</div><div className="body"><div className="label">ベストプラクティス</div><ul><li>パイプラインのステージは、失敗コストが低い(実行時間が短く、影響範囲が狭い)チェックほど早い段階に置く「シフトレフト」の考え方に従う</li><li>「Just Enough Environment(必要十分な環境)」の原則で、ローカル開発環境は完全な本番レプリカである必要はなく、開発に必要な最小限の構成にとどめる</li></ul></div></div>

<h3 id="第15章-インフラコードのテスト戦略" tabIndex={-1}>第15章: インフラコードのテスト戦略</h3>

<p><strong>なぜインフラコードのテストは難しいのか</strong></p>

<p>書籍は、インフラコードのテストが通常のアプリケーションコードのテストより難しい理由を複数挙げています。宣言的なコードに対する単体テストは価値が低いことが多い、テスト自体が実際にクラウドリソースを作るため遅い、外部依存(他のスタックや外部サービス)がテストを複雑にする、といった点です。</p>

<Diagram id="diag-18" label="Infrastructure as Code 図解 18" />

<p>書籍は、単純なピラミッド型だけでなく「Swiss Cheese Testing Model(スイスチーズテストモデル)」も紹介しています。これは、単一のテスト層に完全性を求めるのではなく、複数の不完全なテスト層を重ねることで、穴(見逃し)を塞いでいくという考え方です。ジェームズ・リーズン教授が提唱した「スイスチーズモデル」の安全工学の考え方を、テスト戦略に応用したものです。</p>

<div className="callout-practice"><div className="icon">✓</div><div className="body"><div className="label">ベストプラクティス</div><ul><li>「本番でテストする(Testing in Production)」ことを恐れず、正しく管理する。カナリアリリースや機能フラグを使えば、本番環境でしか検証できない事象(実際のトラフィックパターンなど)を安全に確認できる</li><li>すべてを1つのテスト層に頼らない。静的解析・Plan検証・統合テストの各層でそれぞれ異なる種類の問題を検出する設計にする</li></ul></div></div>

<h3 id="第16章-テストの実装" tabIndex={-1}>第16章: テストの実装</h3>

<p><strong>オフラインテストとオンラインテスト</strong></p>

<p>書籍はテストのステージを、クラウド API を呼び出さない「オフラインテスト」と、実際にリソースを作成・変更する「オンラインテスト」に分類しています。</p>

<div className="table-scroll"><table><thead><tr className="header"><th scope="col">分類</th><th scope="col">テストの種類</th><th scope="col">目的</th><th scope="col">代表的なツール</th></tr></thead><tbody><tr className="odd"><td>オフライン</td><td>構文チェック</td><td>HCL および <code>.tf.json</code> 形式の構成ファイルの文法・整合性エラー検出</td><td><code>terraform validate</code>, <code>tofu validate</code></td></tr><tr className="even"><td>オフライン</td><td>静的コード解析(オフライン)</td><td>ベストプラクティス違反・セキュリティ設定ミスの検出</td><td>tflint, Checkov, tfsec(Trivy に統合)</td></tr><tr className="odd"><td>オフライン</td><td>サプライチェーンチェック</td><td>依存モジュール・プロバイダーの脆弱性・改ざんの検出</td><td>チェックサム検証、SBOM生成</td></tr><tr className="even"><td>オンライン</td><td>静的コード解析(クラウド接続あり)</td><td>実際のクラウドAPIのスキーマと突き合わせた検証</td><td>クラウドプロバイダーのAPIバリデーション</td></tr><tr className="odd"><td>オンライン</td><td>Plan/Preview</td><td>実際に適用される変更内容の事前確認</td><td><code>terraform plan</code>, <code>tofu plan</code></td></tr><tr className="even"><td>オンライン</td><td>検証(Verification)</td><td>作成されたリソースの状態に対するアサーション</td><td>Terratest, InSpec</td></tr><tr className="odd"><td>オンライン</td><td>成果検証(Outcomes)</td><td>インフラが実際に機能要件を満たしているかの検証</td><td>エンドツーエンドテスト、スモークテスト</td></tr></tbody></table></div>

<p>Checkov のような静的解析ツールは、重大度の高いセキュリティ設定ミス(パブリックS3バケット、暗号化の欠落、過剰な権限のIAMポリシーなど)を早期に検出できます。Zop.dev の報告では、事前スキャンを行っていないチームのコードに対して1,000行あたり平均14件という目安が示されていますが、これはあくまでその条件下での数値であり、既にスキャンを運用しているチームやルールセットの異なる環境にそのまま当てはまるものではありません。実行時間もコード量・ルールセット・実行環境に左右されますが、一般に pre-commit フックで回せる程度に軽量なため、tflint と組み合わせて pre-commit フックと CI パイプラインの両方に組み込むのが実務上のデファクトスタンダードです。</p>

<p><strong>テストインスタンスのライフサイクル</strong></p>

<Diagram id="diag-19" label="Infrastructure as Code 図解 19" />

<div className="callout-practice"><div className="icon">✓</div><div className="body"><div className="label">ベストプラクティス</div><ul><li>テストフィクスチャを使って外部依存(他チームのスタック、外部API)を切り離し、テスト対象を独立して検証できるようにする</li><li>CI パイプラインに依存しすぎたテストコードを書かない。ローカルでも同じテストを実行できるようにし、開発者がパイプラインを待たずに検証できるようにする</li></ul></div></div>

<h3 id="第17章-インフラのデプロイ" tabIndex={-1}>第17章: インフラのデプロイ</h3>

<p><strong>デプロイ戦略の理解</strong></p>

<p>書籍は、ソフトウェアのデプロイ戦略(Push型、Pull型、GitOps型)をインフラのデプロイにも適用できることを示しています。</p>

<Diagram id="diag-20" label="Infrastructure as Code 図解 20" />

<p><strong>デプロイの実行元</strong></p>

<div className="table-scroll"><table><thead><tr className="header"><th scope="col">実行元</th><th scope="col">特徴</th><th scope="col">リスク</th></tr></thead><tbody><tr className="odd"><td>開発者のローカルPCから直接デプロイ</td><td>最も手軽</td><td>個人の環境差異による事故、認証情報の管理が煩雑になる</td></tr><tr className="even"><td>中央サービスから実行</td><td>チームで一元管理できる</td><td>サービス自体の可用性がボトルネックになりうる</td></tr><tr className="odd"><td>デリバリーパイプラインから実行</td><td>監査ログ・承認フローと統合しやすい</td><td>パイプライン自体のセキュリティ強化が必須</td></tr><tr className="even"><td>専用のインフラデプロイサービスを利用</td><td>HCP Terraform、Spacelift、env0 など</td><td>ベンダーロックインの検討が必要</td></tr></tbody></table></div>

<div className="callout-practice"><div className="icon">✓</div><div className="body"><div className="label">ベストプラクティス</div><ul><li>手元のPCから本番環境へ直接 <code>apply</code> する運用は極力避け、必ずパイプラインまたは専用サービス経由にする(認証情報の集中管理・監査ログのため)</li><li>デプロイのトリガーは「手動トリガー」と「自動トリガー」を明確に使い分ける。本番への自動適用は、十分なテストとポリシーチェックを通過した場合に限定する</li></ul></div></div>

<h3 id="第18章-既存インフラを安全に変更する" tabIndex={-1}>第18章: 既存インフラを安全に変更する</h3>

<p><strong>変更を小さく分割する</strong></p>

<p>書籍は、大きな変更を一度に適用するのではなく、インクリメンタル(段階的)に分割することの重要性を強調しています。この章の核心は <strong>Expand and Contract(拡張と収縮)パターン</strong> です。</p>

<Diagram id="diag-21" label="Infrastructure as Code 図解 21" />

<p>このパターンは、データベースのスキーマ変更(カラムのリネームなど)や、ネットワーク構成の変更など、「一瞬で切り替えると壊れるが、段階的になら安全に移行できる」変更に広く応用できます。</p>

<p><strong>デプロイ時の停止時間を最小化する</strong></p>

<div className="table-scroll"><table><thead><tr className="header"><th scope="col">戦略</th><th scope="col">仕組み</th></tr></thead><tbody><tr className="odd"><td>Blue-Green デプロイ</td><td>新旧2つの環境を用意し、トラフィックを一括で切り替える。切り戻しが容易</td></tr><tr className="even"><td>ローリングアップグレード</td><td>インスタンスを少数ずつ順番に入れ替えていく</td></tr><tr className="odd"><td>カナリアリリース</td><td>ごく一部のトラフィックだけを新バージョンに流し、問題がなければ徐々に拡大する</td></tr></tbody></table></div>

<p><strong>データを扱うインフラの変更</strong></p>

<p>ステートレスなインフラと違い、データベースなどステートフルなリソースの変更は特に慎重さが求められます。書籍は「Store and Load」「継続的データ転送」「データインフラの分離」「継続的災害復旧」といった手法を紹介しています。</p>

<div className="callout-practice"><div className="icon">✓</div><div className="body"><div className="label">ベストプラクティス</div><ul><li>破壊的な変更(削除を伴う変更)は、必ず一度「非推奨化(Deprecation)」の期間を設け、実際に参照がなくなったことを確認してから削除する</li><li>ステートフルなリソースの変更前には、変更内容に関わらず必ずバックアップ/スナップショットを取得する運用をパイプラインに組み込む</li></ul></div></div>

<h3 id="第19章-ガバナンスとコンプライアンスShift-Left" tabIndex={-1}>第19章: ガバナンスとコンプライアンス(Shift Left)</h3>

<p><strong>シフトレフトの考え方</strong></p>

<p>「シフトレフト」とは、本来リリース後やレビュー段階で行っていたチェック(セキュリティ・コンプライアンス・コスト管理)を、開発サイクルのより早い段階に前倒しすることを指します。</p>

<Diagram id="diag-22" label="Infrastructure as Code 図解 22" />

<p><strong>コンポーネント設計レイヤー別の統制</strong></p>

<p>書籍は、ガバナンスの統制(コントロール)を、コード自体・ワークフロー(パイプライン)・実行時の3つのレイヤーに分けて設計すべきだとしています。</p>

<div className="table-scroll"><table><thead><tr className="header"><th scope="col">レイヤー</th><th scope="col">統制の例</th></tr></thead><tbody><tr className="odd"><td>コンポーネント設計レイヤー</td><td>承認済みモジュールのみ使用を許可するモジュールカタログ</td></tr><tr className="even"><td>ワークフローレイヤー</td><td>パイプライン内での Policy as Code チェック、承認フロー</td></tr><tr className="odd"><td>実行時レイヤー</td><td>クラウドプロバイダー自体のガードレール(AWS Organizations SCP、Azure Policy など)</td></tr></tbody></table></div>

<div className="callout-practice"><div className="icon">✓</div><div className="body"><div className="label">ベストプラクティス</div><ul><li>コンプライアンス要件を文書(Word や PDF)にとどめず、可能な限り自動テスト可能なポリシーコードに変換する(第22章の Policy as Code で詳述)</li><li>統制を1つのレイヤーに集中させず、コード・パイプライン・実行時の複数レイヤーで多重に(スイスチーズモデル的に)防御する</li></ul></div></div>

<hr />

<h2 id="第4部-実践編-2026年の-IaC-エコシステム" tabIndex={-1}>第4部 実践編: 2026年の IaC エコシステム</h2>

<p>ここまでの原則・パターンは、特定のツールに依存しない普遍的な考え方でした。第4部では、2026年8月時点で実際に採用を検討すべき具体的なツールとエコシステムの状況を、Web検索で確認した最新情報に基づいて解説します。</p>

<h3 id="第20章-ツール選定Terraform--OpenTofu--Pulumi--AWS-CDK" tabIndex={-1}>第20章: ツール選定(Terraform / OpenTofu / Pulumi / AWS CDK)</h3>

<p><strong>ライセンス変更と OpenTofu の誕生という転換点</strong></p>

<p>2026年時点の IaC ツール選定を理解する上で欠かせない前提が、2023年8月に起きたライセンス変更です。HashiCorp が Terraform のライセンスを、オープンソースライセンスである MPL 2.0 から、商用利用に制限を課す Business Source License(BSL)1.1 へ変更しました。これに対し、Linux Foundation の傘下で <strong>OpenTofu</strong> が Terraform 1.6 からフォークされ、2024年1月に安定版(GA)がリリースされました。</p>

<Diagram id="diag-23" label="Infrastructure as Code 図解 23" />

<p>2026年時点では、OpenTofu は単なる「無料の代替品」ではなく、Terraform が未実装の機能(ネイティブな State 暗号化など)を先行して提供するなど、機能面でも独自の進化を遂げています。移行自体はバイナリの置き換えと State バックエンド設定の変更で完了する「ほぼドロップイン」なケースが多いとされていますが、機能差が広がるにつれてこの移行の容易さの「賞味期限」は徐々に短くなっているとの指摘もあります。</p>

<p><strong>主要ツールの比較</strong></p>

<div className="table-scroll"><table><thead><tr className="header"><th scope="col">ツール</th><th scope="col">言語/形式</th><th scope="col">ライセンス/ガバナンス</th><th scope="col">特徴</th></tr></thead><tbody><tr className="odd"><td>Terraform</td><td>HCL(宣言型DSL)</td><td>BSL 1.1(HashiCorp、IBM傘下)</td><td>業界標準としての導入実績が最大。HCP Terraform でのマネージドサービスが充実</td></tr><tr className="even"><td>OpenTofu</td><td>HCL(Terraformと高い互換性)</td><td>MPL 2.0(Linux Foundation)</td><td>オープンソースであることの確実性を重視するチームの新規プロジェクトでの第一候補になりつつある</td></tr><tr className="odd"><td>Pulumi</td><td>TypeScript/Python/Go/Javaなど汎用言語</td><td>オープンソース中核部分+商用SaaS</td><td>HCLを使わず汎用言語で記述するため、既存のテストフレームワークでユニットテストが書ける</td></tr><tr className="even"><td>AWS CDK</td><td>TypeScript/Python/Javaなど(CloudFormationにコンパイル)</td><td>Apache 2.0(AWS)</td><td>AWS環境に閉じるならアプリ開発者に馴染みやすい構文で書ける</td></tr><tr className="odd"><td>Ansible</td><td>YAML(手続き寄りだが冪等性を意識した設計)</td><td>GPL系(Red Hat)</td><td>サーバー構成管理・アプリケーションデプロイとの親和性が高い</td></tr></tbody></table></div>

<p>テスト容易性はツール選定でよく比較される観点です。HCL 側にも Terraform 1.6 以降の <code>terraform test</code>(OpenTofu では <code>tofu test</code>)があり、<code>run</code> ブロックと <code>assert</code> による検証が書けます。さらに Terraform 1.7 以降のモックプロバイダー(<code>mock_provider</code>)を使えば、実際にクラウドリソースをプロビジョニングせずにテストを実行できます。Pulumi の優位点は「HCL にはテスト手段がないこと」ではなく、各言語で使い慣れた既存のテストフレームワーク(Jest、pytest、Go の testing など)とその周辺エコシステム(モック、カバレッジ計測、IDE 連携)をそのまま持ち込める点にあります。一方で、宣言型で確立されたワークフロー(HCLベース)に慣れているチームにとっては、Terraform・OpenTofu も依然として効果的に機能し続けています。</p>

<div className="callout-practice"><div className="icon">✓</div><div className="body"><div className="label">ベストプラクティス</div><ul><li>ツール選定に時間をかけすぎない。書籍が繰り返し強調するように「原則・パターン・プラクティス」はツールを問わず適用できるため、既存のチームスキルセットや周辺エコシステム(モジュールの入手性、社内の知見)を優先して選ぶ</li><li>新規プロジェクトで、まだ大きな社内資産(既存の Terraform コード)がない場合は、ライセンスの確実性という観点から OpenTofu を検討する価値がある</li><li>既存の大規模な Terraform 資産を持つチームは、無理に移行を急がず、State 暗号化などの新機能が本当に必要になったタイミングで移行を評価する</li></ul></div></div>

<h3 id="第21章-GitOps-による継続的デリバリー" tabIndex={-1}>第21章: GitOps による継続的デリバリー</h3>

<p><strong>GitOps の基本ループ</strong></p>

<p>GitOps は、第17章で紹介した「Pull型デプロイ」の考え方を、Kubernetes を中心としたクラウドネイティブ環境に特化して発展させたものです。Git リポジトリを唯一の信頼できる情報源(Single Source of Truth)とし、オペレーター(コントローラー)が継続的にクラスタの実際の状態と Git 上のあるべき状態を比較・同期します。</p>

<Diagram id="diag-24" label="Infrastructure as Code 図解 24" />

<p>GitOps の2大 CNCF(Cloud Native Computing Foundation)卒業プロジェクトが <strong>Argo CD</strong> と <strong>Flux</strong> です。2026年時点でのエンタープライズ Kubernetes 運用では、GitOps が主要なデリバリー手段として60%を超える普及率に達しているという調査もあります。</p>

<div className="table-scroll"><table><thead><tr className="header"><th scope="col">観点</th><th scope="col">Argo CD</th><th scope="col">Flux</th></tr></thead><tbody><tr className="odd"><td>アーキテクチャ</td><td>単一のアプリケーションとして動作し、UIとAPIサーバーを持つ</td><td>Source/Kustomize/Helm/Notificationなど複数の軽量コントローラーの集合体</td></tr><tr className="even"><td>UI</td><td>リッチなWeb UIを標準搭載</td><td>CLI中心(サードパーティのダッシュボードと組み合わせ可能)</td></tr><tr className="odd"><td>向いている組織</td><td>複数クラスタを一元管理したい、非エンジニアにも可視性を提供したいプラットフォームチーム</td><td>攻撃対象領域を最小化したい、Kubernetesネイティブなツールを好むチーム</td></tr><tr className="even"><td>進行的デリバリー連携</td><td>Argo Rollouts(カナリア・Blue-Green)</td><td>Flagger</td></tr></tbody></table></div>

<p>実務では、両者を「アプリケーションデリバリーは Argo CD、プラットフォーム/インフラレベルの GitOps(証明書管理・監視基盤など)は Flux」という形で使い分ける組織もあります。ただし、2つの GitOps エンジンを並行運用することは運用の複雑性を増すため、明確なチーム境界と十分な運用成熟度がある組織にのみ推奨されるアプローチです。</p>

<div className="callout-practice"><div className="icon">✓</div><div className="body"><div className="label">ベストプラクティス</div><ul><li>GitOps 導入の第一歩は、まず「Git上のマニフェストが常に最新の実態を反映している」状態を1つのクラスタ・1つのアプリケーションから始めて確立すること</li><li>GitOps オペレーター自体のセキュリティ(RBAC設定、Secret管理)を、通常のアプリケーションと同等以上の水準で監査する</li></ul></div></div>

<h3 id="第22章-Policy-as-Code-によるガバナンス自動化" tabIndex={-1}>第22章: Policy as Code によるガバナンス自動化</h3>

<p><strong>3種類のポリシーツールの使い分け</strong></p>

<p>第19章で触れた「シフトレフトなガバナンス」を実現する具体的な技術が Policy as Code です。2026年時点では、目的の異なる3種類のツールを組み合わせて使うのが実務上の定石になっています。</p>

<Diagram id="diag-25" label="Infrastructure as Code 図解 25" />

<div className="table-scroll"><table><thead><tr className="header"><th scope="col">ツール分類</th><th scope="col">代表例</th><th scope="col">得意なこと</th><th scope="col">弱点</th></tr></thead><tbody><tr className="odd"><td>セキュリティスキャナー</td><td>Checkov, tfsec(現Trivyに統合)</td><td>既製の大量ルールセットで即座にセキュリティ・コンプライアンス欠陥を検出</td><td>組織固有のビジネスルールは表現しにくい</td></tr><tr className="even"><td>汎用ポリシーエンジン</td><td>Open Policy Agent(OPA)+ Rego + Conftest</td><td>Terraform/OpenTofu だけでなく Kubernetes Admission Control など複数プラットフォームで同じエンジンを使い回せる</td><td>ルールを自前で書く必要があり学習コストが発生する</td></tr><tr className="odd"><td>ベンダー統合エンジン</td><td>HashiCorp Sentinel</td><td>HCP Terraform/Enterpriseのワークスペースにネイティブ統合され、Plan/State/実行環境の情報を直接参照できる</td><td>HCP Terraform/Enterprise 利用が前提</td></tr></tbody></table></div>

<p>Sentinel は Terraform の実行環境に深く統合されているだけでなく、単体テストの記述もサポートしており、ポリシー自体をコードとして検証できる点が実務上重要なベストプラクティスとして位置づけられています。一方 OPA は Terraform に限らず Kubernetes を含む複数プラットフォームに対応する「一つのエンジンで統一する」universal な性質を持つ点が評価されています。</p>

<p><strong>ポリシーの強制レベル</strong></p>

<p>Policy as Code 導入で最も失敗しやすいポイントは、ツール選びではなく「強制レベル」の設計だと指摘されています。</p>

<div className="table-scroll"><table><thead><tr className="header"><th scope="col">強制レベル</th><th scope="col">挙動</th><th scope="col">向いている段階</th></tr></thead><tbody><tr className="odd"><td>Advisory(助言のみ)</td><td>違反があっても警告のみで <code>apply</code> は継続できる</td><td>導入初期、ルールの精度を検証している段階</td></tr><tr className="even"><td>Soft-mandatory(条件付き強制)</td><td>違反時は承認者の明示的な承認があれば適用できる</td><td>ルールが安定してきた中間段階</td></tr><tr className="odd"><td>Hard-mandatory(強制)</td><td>違反時は <code>apply</code> 自体をブロックする</td><td>ルールが十分に検証された成熟段階</td></tr></tbody></table></div>

<div className="callout-practice"><div className="icon">✓</div><div className="body"><div className="label">ベストプラクティス</div><ul><li>最初から Hard-mandatory で導入せず、Advisory → Soft-mandatory → Hard-mandatory と段階的に強制レベルを引き上げ、誤検知(False Positive)によるチームの反発を避ける</li><li>正当な例外(レガシーシステムの一時的な許容など)は、理由・承認者・見直し期限を明記したコード内コメントやチケットとして記録し、「なぜ例外を許したか」を追跡可能にする</li><li>ネイティブの Terraform 機能(変数の<code>validation</code>ブロック、<code>precondition</code>/<code>postcondition</code>、<code>check</code>ブロック)だけでもポリシー課題の一定割合(3割程度という報告もある)は解決できるため、外部ツール導入前にまずネイティブ機能を使い切る</li></ul></div></div>

<hr />

<h2 id="第5部-はじめての-IaC-―-ステップバイステップ実践ロードマップ" tabIndex={-1}>第5部: はじめての IaC ― ステップバイステップ実践ロードマップ</h2>

<p>ここまでの原則を踏まえ、初学者が実際にゼロから IaC を導入する際の現実的な進め方を、ステップバイステップで示します。いきなり全社のインフラをコード化しようとせず、小さく始めて信頼を積み重ねることが最大のコツです。</p>

<Diagram id="diag-26" label="Infrastructure as Code 図解 26" />

<h3 id="各ステップの補足" tabIndex={-1}>各ステップの補足</h3>

<ol><li><strong>影響範囲の小さい対象を選ぶ</strong>: 本番の基幹システムではなく、新しい検証環境や、まだ手作業構築されていないプロジェクトから始めます。成功体験を積むことがチームの信頼獲得に直結します。</li><li><strong>ツールを1つ選定する</strong>: 第20章の比較表を参考に、チームの既存スキルセットに最も合うものを選びます。迷ったら Terraform か OpenTofu から始めるのが学習リソースの豊富さの観点で無難です。</li><li><strong>最小構成をコード化</strong>: 最初から完璧なモジュール分割を目指さず、まず動く1つのスタックとしてコード化します。</li><li><strong>バージョン管理とレビュー</strong>: Git 上でのプルリクエストレビューを必須化することで、暗黙知が個人に閉じることを防ぎます。</li><li><strong>CIでの基礎チェック</strong>: <code>terraform fmt</code>(整形)、<code>terraform validate</code>(構文検証)、tflint(Lint)は最も低コストで最初に導入すべきチェックです。</li><li><strong>セキュリティスキャン</strong>: Checkov などを追加し、既知のセキュリティ設定ミスを自動検出します。</li><li><strong>Plan レビューの運用確立</strong>: <code>plan</code> の出力を必ず人間(またはポリシーエンジン)がレビューしてから <code>apply</code> する文化を作ります。</li><li><strong>テスト環境への自動適用</strong>: テスト環境に対してはパイプラインからの自動 <code>apply</code> を許可し、フィードバックサイクルを高速化します。</li><li><strong>本番適用の自動化(承認付き)</strong>: 本番への適用は、テストと承認を経た変更のみ自動的に適用されるようにします。</li><li><strong>手作業変更の禁止</strong>: これが徹底できて初めて、コードが「真実の情報源(Source of Truth)」として機能します。</li><li><strong>段階的なスタック分割</strong>: チームが複数に分かれ、1つのスタックへの変更が競合し始めたら、第7章のパターンに沿って段階的に分割します。</li><li><strong>Policy as Code の段階導入</strong>: 第22章の強制レベルの考え方に沿って、Advisory から始めます。</li></ol>

<hr />

<h2 id="ベストプラクティス総まとめチェックリスト" tabIndex={-1}>ベストプラクティス総まとめチェックリスト</h2>

<div className="checklist-card"><div className="checklist-header"><span className="title">ベストプラクティス チェックリスト</span><span className="count">{completedCount} / 14 完了</span></div><ul><li><input id="chk1" type="checkbox" checked={checkedItems["chk1"] || false} onChange={() => toggleCheck("chk1")} /><label htmlFor="chk1">すべてのインフラ変更はコードとして記述し、Gitでバージョン管理している</label></li><li><input id="chk2" type="checkbox" checked={checkedItems["chk2"] || false} onChange={() => toggleCheck("chk2")} /><label htmlFor="chk2">手作業でのコンソール変更(ClickOps)を組織のルールとして禁止している</label></li><li><input id="chk3" type="checkbox" checked={checkedItems["chk3"] || false} onChange={() => toggleCheck("chk3")} /><label htmlFor="chk3">State ファイルはリモートバックエンドで管理し、暗号化・ロック機構を有効にしている</label></li><li><input id="chk4" type="checkbox" checked={checkedItems["chk4"] || false} onChange={() => toggleCheck("chk4")} /><label htmlFor="chk4">シークレットは専用のシークレットストアで管理し、コードには参照のみを記述している</label></li><li><input id="chk5" type="checkbox" checked={checkedItems["chk5"] || false} onChange={() => toggleCheck("chk5")} /><label htmlFor="chk5">モジュールは高凝集・低結合を意識し、入力インターフェースを最小限にしている</label></li><li><input id="chk6" type="checkbox" checked={checkedItems["chk6"] || false} onChange={() => toggleCheck("chk6")} /><label htmlFor="chk6">スタックの粒度は「誰が・どの頻度で変更するか」というチームトポロジーの観点で設計している</label></li><li><input id="chk7" type="checkbox" checked={checkedItems["chk7"] || false} onChange={() => toggleCheck("chk7")} /><label htmlFor="chk7"><code>plan</code>(差分プレビュー)の結果を、<code>apply</code> の前に必ず人間またはポリシーエンジンがレビューしている</label></li><li><input id="chk8" type="checkbox" checked={checkedItems["chk8"] || false} onChange={() => toggleCheck("chk8")} /><label htmlFor="chk8">CI パイプラインに構文チェック・Lint・セキュリティスキャンを組み込んでいる</label></li><li><input id="chk9" type="checkbox" checked={checkedItems["chk9"] || false} onChange={() => toggleCheck("chk9")} /><label htmlFor="chk9">静的解析・Plan検証・統合テストなど、複数のテスト層を重ねている(スイスチーズモデル)</label></li><li><input id="chk10" type="checkbox" checked={checkedItems["chk10"] || false} onChange={() => toggleCheck("chk10")} /><label htmlFor="chk10">破壊的な変更には Expand and Contract パターンや非推奨化期間を設けている</label></li><li><input id="chk11" type="checkbox" checked={checkedItems["chk11"] || false} onChange={() => toggleCheck("chk11")} /><label htmlFor="chk11">Policy as Code を段階的な強制レベル(Advisory → Soft-mandatory → Hard-mandatory)で導入している</label></li><li><input id="chk12" type="checkbox" checked={checkedItems["chk12"] || false} onChange={() => toggleCheck("chk12")} /><label htmlFor="chk12">サーバーは可能な限り Immutable Server パターンで運用し、直接ログインしての変更を避けている</label></li><li><input id="chk13" type="checkbox" checked={checkedItems["chk13"] || false} onChange={() => toggleCheck("chk13")} /><label htmlFor="chk13">dev/staging/prod 環境間の構成差異(バリエーション)を最小化している</label></li><li><input id="chk14" type="checkbox" checked={checkedItems["chk14"] || false} onChange={() => toggleCheck("chk14")} /><label htmlFor="chk14">DORA Four Keys など定量指標でデリバリーパフォーマンスを定期的に計測している</label></li></ul></div>

<hr />

<h2 id="参考文献" tabIndex={-1}>参考文献</h2>

<p>本ガイドは以下の情報源を参照して作成しました(2026年8月27日時点でWeb検索により内容を確認)。書籍の原著者・著名な国際的開発者・各クラウドベンダーの公式情報を優先して参照しています。</p>

<div className="ref-grid" id="referenceGrid"><div className="ref-card" id="ref1"><div className="num">1</div><div className="txt">Kief Morris, <em>Infrastructure as Code, 3rd Edition</em> — O&apos;Reilly Media. <a href="https://www.oreilly.com/library/view/infrastructure-as-code/9781098150341/">https://www.oreilly.com/library/view/infrastructure-as-code/9781098150341/</a></div></div><div className="ref-card" id="ref2"><div className="num">2</div><div className="txt">Kief Morris, <em>Infrastructure as Code, 1st Edition</em> — O&apos;Reilly Media(本ガイドの起点として指定された原本URL). <a href="https://www.oreilly.com/library/view/infrastructure-as-code/9781491924334/">https://www.oreilly.com/library/view/infrastructure-as-code/9781491924334/</a></div></div><div className="ref-card" id="ref3"><div className="num">3</div><div className="txt">Kief Morris(ThoughtWorks Distinguished Engineer), 公式サイト・ブログ <em>Infrastructure as Code</em>. <a href="https://infrastructure-as-code.com/">https://infrastructure-as-code.com/</a></div></div><div className="ref-card" id="ref4"><div className="num">4</div><div className="txt">Kief Morris, &quot;Unpacking Dan North&apos;s CUPID properties for joyful coding&quot; — CUPID プロパティのインフラコードへの応用. <a href="https://infrastructure-as-code.com/posts/cupid-for-infrastructure.html">https://infrastructure-as-code.com/posts/cupid-for-infrastructure.html</a></div></div><div className="ref-card" id="ref5"><div className="num">5</div><div className="txt">Kief Morris 個人プロフィール — ThoughtWorks Distinguished Engineer. <a href="https://kief.com/">https://kief.com/</a></div></div><div className="ref-card" id="ref6"><div className="num">6</div><div className="txt">Yevgeniy Brikman(Gruntwork共同創業者), <em>Terraform: Up &amp; Running</em> 公式サイト. <a href="https://www.terraformupandrunning.com/">https://www.terraformupandrunning.com/</a></div></div><div className="ref-card" id="ref7"><div className="num">7</div><div className="txt">Yevgeniy Brikman, &quot;A Comprehensive Guide to Terraform&quot; — Gruntwork Blog. <a href="https://blog.gruntwork.io/a-comprehensive-guide-to-terraform-b3d32832baca">https://blog.gruntwork.io/a-comprehensive-guide-to-terraform-b3d32832baca</a></div></div><div className="ref-card" id="ref8"><div className="num">8</div><div className="txt">Yevgeniy Brikman, &quot;How to create reusable infrastructure with Terraform modules&quot; — Gruntwork Blog. <a href="https://blog.gruntwork.io/how-to-create-reusable-infrastructure-with-terraform-modules-25526d65f73d">https://blog.gruntwork.io/how-to-create-reusable-infrastructure-with-terraform-modules-25526d65f73d</a></div></div><div className="ref-card" id="ref9"><div className="num">9</div><div className="txt">AWS Well-Architected Framework(公式ドキュメント). <a href="https://docs.aws.amazon.com/wellarchitected/2022-03-31/framework/conclusion.html">https://docs.aws.amazon.com/wellarchitected/2022-03-31/framework/conclusion.html</a></div></div><div className="ref-card" id="ref10"><div className="num">10</div><div className="txt">Google Cloud Architecture Center, <em>Well-Architected Framework</em>(2026年1月更新). <a href="https://docs.cloud.google.com/architecture/framework">https://docs.cloud.google.com/architecture/framework</a></div></div><div className="ref-card" id="ref11"><div className="num">11</div><div className="txt">Google Cloud Blog, DORA チーム &quot;Use Four Keys metrics like change failure rate to measure your DevOps performance&quot;. <a href="https://cloud.google.com/blog/products/devops-sre/using-the-four-keys-to-measure-your-devops-performance">https://cloud.google.com/blog/products/devops-sre/using-the-four-keys-to-measure-your-devops-performance</a></div></div><div className="ref-card" id="ref12"><div className="num">12</div><div className="txt">Nicole Forsgren, Jez Humble, Gene Kim, <em>Accelerate</em>(DORA調査の書籍化) — IT Revolution. <a href="https://itrevolution.com/product/accelerate/">https://itrevolution.com/product/accelerate/</a></div></div><div className="ref-card" id="ref13"><div className="num">13</div><div className="txt">DX(getdx.com), &quot;DORA metrics: the complete guide to measuring DevOps performance in the AI era&quot;(2026年7月). <a href="https://getdx.com/blog/dora-metrics/">https://getdx.com/blog/dora-metrics/</a></div></div><div className="ref-card" id="ref14"><div className="num">14</div><div className="txt">Pulumi Blog, &quot;Best Infrastructure as Code Tools in 2026&quot;. <a href="https://www.pulumi.com/blog/infrastructure-as-code-tools/">https://www.pulumi.com/blog/infrastructure-as-code-tools/</a></div></div><div className="ref-card" id="ref15"><div className="num">15</div><div className="txt">Zop.dev, &quot;Infrastructure as Code Best Practices: Terraform, Pulumi, and OpenTofu in 2026&quot;(2026年4月). <a href="https://zop.dev/resources/blogs/infrastructure-as-code-best-practices-terraform-pulumi-and-opentofu-in-2026/">https://zop.dev/resources/blogs/infrastructure-as-code-best-practices-terraform-pulumi-and-opentofu-in-2026/</a></div></div><div className="ref-card" id="ref16"><div className="num">16</div><div className="txt">DEV Community, &quot;Infrastructure as Code Best Practices: Terraform, Pulumi, and OpenTofu in 2026&quot;. <a href="https://dev.to/muskan_8abedcc7e12/infrastructure-as-code-best-practices-terraform-pulumi-and-opentofu-in-2026-4nc1">https://dev.to/muskan_8abedcc7e12/infrastructure-as-code-best-practices-terraform-pulumi-and-opentofu-in-2026-4nc1</a></div></div><div className="ref-card" id="ref17"><div className="num">17</div><div className="txt">Expeditious Software, &quot;Infrastructure as Code in 2026: Drift, Policy, and the Terraform vs OpenTofu Decision&quot;(2026年6月). <a href="https://es.nl/2026/infrastructure-as-code-drift-policy-terraform-vs-opentofu/">https://es.nl/2026/infrastructure-as-code-drift-policy-terraform-vs-opentofu/</a></div></div><div className="ref-card" id="ref18"><div className="num">18</div><div className="txt">Clanker Cloud Blog, &quot;Terraform Latest Trends 2026: Infrastructure as Code in a Fractured Ecosystem&quot;(2026年4月). <a href="https://clankercloud.ai/blog/terraform-latest-trends-2026-infrastructure-as-code">https://clankercloud.ai/blog/terraform-latest-trends-2026-infrastructure-as-code</a></div></div><div className="ref-card" id="ref19"><div className="num">19</div><div className="txt">computingforgeeks.com, &quot;Best Infrastructure as Code (IaC) and Cloud Automation Tools in 2026&quot;(2026年4月). <a href="https://computingforgeeks.com/best-infrastructure-as-code-iac-cloud-automation-tools/">https://computingforgeeks.com/best-infrastructure-as-code-iac-cloud-automation-tools/</a></div></div><div className="ref-card" id="ref20"><div className="num">20</div><div className="txt">DEV Community, &quot;ArgoCD vs FluxCD: Which GitOps Tool Should You Use in 2026?&quot;(2026年3月). <a href="https://dev.to/mechcloud_academy/the-gitops-standard-in-2026-a-comparative-research-analysis-of-argocd-and-fluxcd-46d8">https://dev.to/mechcloud_academy/the-gitops-standard-in-2026-a-comparative-research-analysis-of-argocd-and-fluxcd-46d8</a></div></div><div className="ref-card" id="ref21"><div className="num">21</div><div className="txt">Railway Blog, &quot;The Best GitOps Deployment Platforms in 2026&quot;(2026年5月). <a href="https://blog.railway.com/p/best-gitops-deployment-platforms-2026">https://blog.railway.com/p/best-gitops-deployment-platforms-2026</a></div></div><div className="ref-card" id="ref22"><div className="num">22</div><div className="txt">Tasrie IT Services, &quot;ArgoCD vs Flux: We Run Both in Production - Here&apos;s What Won (2026)&quot;(2026年2月). <a href="https://tasrieit.com/blog/argocd-vs-flux-gitops-comparison-2026">https://tasrieit.com/blog/argocd-vs-flux-gitops-comparison-2026</a></div></div><div className="ref-card" id="ref23"><div className="num">23</div><div className="txt">Scalr, &quot;OPA vs Sentinel vs Scalr: Policy as Code for Terraform&quot;(2026年3月/6月更新). <a href="https://scalr.com/learning-center/enforcing-policy-as-code-in-terraform-a-comprehensive-guide">https://scalr.com/learning-center/enforcing-policy-as-code-in-terraform-a-comprehensive-guide</a></div></div><div className="ref-card" id="ref24"><div className="num">24</div><div className="txt">Spacelift, &quot;Enforcing Policy as Code in Terraform with Sentinel &amp; OPA&quot;. <a href="https://spacelift.io/blog/terraform-policy-as-code">https://spacelift.io/blog/terraform-policy-as-code</a></div></div><div className="ref-card" id="ref25"><div className="num">25</div><div className="txt">Coding Protocols, &quot;Terraform Policy as Code (2026): OPA/Conftest vs Sentinel vs Checkov&quot;. <a href="https://codingprotocols.com/blog/terraform-policy-as-code-opa-sentinel-checkov">https://codingprotocols.com/blog/terraform-policy-as-code-opa-sentinel-checkov</a></div></div><div className="ref-card" id="ref26"><div className="num">26</div><div className="txt">Yuri Kan, &quot;Policy as Code Testing: OPA vs Sentinel in 2026&quot;. <a href="https://yrkan.com/blog/policy-as-code-testing-opa-sentinel/">https://yrkan.com/blog/policy-as-code-testing-opa-sentinel/</a></div></div><div className="ref-card" id="ref27"><div className="num">27</div><div className="txt">Medium(Jukka Koskelin), &quot;Azure Verified Module Design Principles&quot;(CUPIDプロパティのAzureモジュールへの応用). <a href="https://medium.com/@merten_66723/azure-verified-module-design-principles-ba4fb18aecf2">https://medium.com/@merten_66723/azure-verified-module-design-principles-ba4fb18aecf2</a></div></div></div>

<p>補足: 本ガイドは書籍の文章を逐語的に引用せず、Kief Morris が提示する原則・パターン・プラクティスの考え方を独自の言葉で再構成し、2026年時点の実際のツールエコシステムに接続する形で解説しています。書籍の正式な章立てと詳細な解説については、上記1・2の O&apos;Reilly 公式ページ、またはオンライン学習プラットフォーム(O&apos;Reilly Online Learning)でのご購読・購入をおすすめします。</p>
                </main>
            </div>
        </div>
    );
};
