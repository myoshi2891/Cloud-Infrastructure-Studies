'use client';

import { memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { NavBar } from './NavBar';
import { DIAGRAMS, type DiagramId } from './constants';

const Diagram = memo(function Diagram({
    id,
    label,
}: {
    id: DiagramId;
    label: string;
}) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap">
            <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale />
        </div>
    );
});

/**
 * Professional Cloud Developer Section 4 ガイドコンポーネント
 */
export function Section4Guide() {
    return (
        <div className="pcd-section4-page">
            <div className="layout">
                <NavBar />
                <main className="main" id="main-content">
                    <header className="hero">
                        <div className="kicker">Professional Cloud Developer · Section 4</div>
                        <h1>
                            Google Cloud Professional Cloud Developer 認定試験ガイド Section 4: Google
                            Cloudサービスとのアプリケーション統合
                        </h1>
                        <div className="meta-row">
                            <span className="pill">配点 <strong>約21%</strong></span>
                            <span className="pill">対象 <strong>初学者〜中級者</strong></span>
                            <span className="pill">図解 <strong>Mermaid 15点</strong></span>
                            <span className="pill">参考文献 <strong>7件</strong></span>
                        </div>
                    </header>

                    <h2 id="この章について" tabIndex={-1}>この章について</h2>
                    <p>
                        本ガイドは、Google Cloud Professional Cloud Developer（PCD）認定試験の公式Exam Guideに定義される「Section 4: Integrating applications with Google Cloud services（Google Cloudサービスとのアプリケーション統合）」を、初学者にもわかりやすいようステップバイステップで解説するものです。Section 4は試験全体のおよそ21%を占め、以下の3つのサブセクション・合計11の出題項目で構成されています。
                    </p>
                    <ul>
                        <li>
                            <strong>4.1 データ/ストレージサービスとのアプリケーション統合</strong>（3項目）: Cloud SQL・Firestore・Cloud Storageなどのデータストアへの接続管理、データの読み書き、メッセージングサービスを使ったアプリケーション連携
                        </li>
                        <li>
                            <strong>4.2 Google Cloud APIの利用</strong>（3項目、うち1項目に5つの考慮事項）: サービスの有効化、Cloud Client Libraries・REST・gRPC・API Explorerといった呼び出し方式の選択と設計上の考慮事項、サービスアカウントによる認証
                        </li>
                        <li>
                            <strong>4.3 トラブルシューティングとオブザーバビリティ</strong>（5項目）: メトリクス・ログ・トレースによるインスツルメンテーション、Google Cloud Observabilityを使った問題解決、Error Reportingによる障害管理、トレースIDによるサービス間の相関、AI支援オブザーバビリティ
                        </li>
                    </ul>
                    <p>
                        Section 1〜3が「設計」「ビルド/テスト」「デプロイ」という開発ライフサイクルの前半を扱うのに対し、Section 4は「アプリケーションが実際にGoogle Cloudの各種サービスとどう対話し、本番運用でどう可観測性を確保するか」という、開発者が日常的に向き合う実装レベルのテーマを扱います。前提として[[gcp-pca-guide]]で扱ったIAM・ネットワーキングの基礎や、Section 1（設計）・Section 3（デプロイ）の内容と密接に関連するため、あわせて参照することをおすすめします。
                    </p>
                    <p>
                        本文中の図解はすべてMermaid記法で記述し、ASCIIアートによる図解は一切使用していません。すべての技術的主張には、Google Cloud公式ドキュメントを中心とした出典を明記しています。
                    </p>

                    <h2 id="section-4-全体像" tabIndex={-1}>Section 4 全体像</h2>
                    <p>
                        Section 4の3つのサブセクションは独立したテーマに見えますが、実際には「データを読み書きし（4.1）」「APIを正しく呼び出し（4.2）」「その挙動を観測・診断する（4.3）」という、1つのリクエストがアプリケーションを流れる際に必ず通過する3つのレイヤーに対応しています。
                    </p>

                    <Diagram
                        id="diag-1"
                        label="Section 4 全体像とリクエストフローの関係図"
                    />

                    <p>
                        この関係性を意識しながら読み進めると、単なる暗記ではなく「なぜこの機能が必要なのか」という実装者としての理解が深まります。それでは各項目を順に見ていきましょう。
                    </p>

                    <hr />

                    <h2 id="41-データストレージサービスとのアプリケーション統合" tabIndex={-1}>
                        4.1 データ/ストレージサービスとのアプリケーション統合
                    </h2>

                    <h3 id="411-さまざまなgoogle-cloudデータストアへの接続管理" tabIndex={-1}>
                        4.1.1 さまざまなGoogle Cloudデータストアへの接続管理
                    </h3>
                    <h4>概要</h4>
                    <p>
                        現代のクラウドネイティブアプリケーションは、単一のデータベースだけで完結することはほとんどありません。トランザクション処理にはリレーショナルデータベース、モバイル/Webアプリの同期にはドキュメントデータベース、ファイルやバイナリデータにはオブジェクトストレージ、というようにデータの性質に応じて複数のデータストアを使い分けるのが一般的です。Exam Guideが明示的に例示しているのは <strong>Cloud SQL</strong>（リレーショナル）・<strong>Firestore</strong>（NoSQLドキュメント）・<strong>Cloud Storage</strong>（オブジェクト）の3つですが、これらへの「接続管理」は単に接続文字列を書けばよいという話ではなく、認証方式・コネクションプーリング・再接続戦略まで含めた設計判断です。
                    </p>

                    <h4>ステップバイステップの流れ</h4>
                    <p>まず、扱うデータの性質から適切なデータストアを選ぶところから始めます。</p>

                    <Diagram
                        id="diag-2"
                        label="データストア選定フローチャート"
                    />

                    <p>
                        データストアを選定したら、次は「どうやって安全かつ効率的に接続するか」を決めます。3つのデータストアはそれぞれ接続モデルが異なります。
                    </p>
                    <p><strong>Cloud SQLへの接続</strong></p>
                    <p>
                        Cloud SQLはネットワーク経由でTCP接続するリレーショナルデータベースであるため、接続を確立するたびに新規TCP接続を張るとレイテンシとリソース消費が大きくなります。Google Cloudは接続方式として大きく2つの選択肢を提供しています。
                    </p>

                    <Diagram
                        id="diag-3"
                        label="Cloud SQL コネクションプールとコネクタによる接続シーケンス"
                    />

                    <p>
                        Cloud SQL Language Connectors（Java・Python・Go・Node.js向け）は、アプリケーションプロセス内でIAM認可と自動TLS暗号化を行うライブラリで、証明書管理が不要になります。Java・Python・Go・Node.js以外の言語を使う場合や、既存のインフラでサイドカーとして分離したい場合は Cloud SQL Auth Proxy を使うのが基本パターンです。いずれの方式でも、<strong>コネクションプールを使い回すこと</strong>が最も重要な原則です。
                    </p>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">接続方式</th>
                                    <th scope="col">主な特徴</th>
                                    <th scope="col">向いているシーン</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Cloud SQL Language Connectors</td>
                                    <td>アプリ内蔵ライブラリ。IAM認可＋自動TLS。ADCで認証</td>
                                    <td>Java/Python/Go/Node.jsで新規開発する場合の第一選択</td>
                                </tr>
                                <tr className="even">
                                    <td>Cloud SQL Auth Proxy</td>
                                    <td>別プロセス/サイドカーとして起動。同様にIAM認可＋TLS</td>
                                    <td>上記4言語以外、または既存インフラでプロセス分離したい場合</td>
                                </tr>
                                <tr className="odd">
                                    <td>Private IP + 直接TLS接続</td>
                                    <td>
                                        VPC内から直接データベースドライバで接続。コネクタの処理を経由しない分、レイテンシに有利。アプリケーション側でTLSと証明書の構成・管理が必要
                                    </td>
                                    <td>VPC内のクライアント全般、特にレイテンシに敏感なワークロード</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p>
                        コネクションプール自体の設定では、最大接続数（max）・最小アイドル接続数（min）・アイドルタイムアウト・接続の最大生存時間（max lifetime）を、Cloud SQLインスタンスの <code>max_connections</code> 上限やアプリケーションのスケール数と整合するように調整します。たとえばCloud Run上で多数のインスタンスが同時にスケールアウトする場合、各インスタンスのプールサイズを小さく保たないと、インスタンス数 × プールサイズがデータベース側の上限を容易に超えてしまいます。
                    </p>
                    <p><strong>Firestoreへの接続</strong></p>
                    <p>
                        Firestoreはサーバー間通信にgRPCを使用し、C#・Go・Java・Node.js・PHP・Python・Rubyのサーバークライアントライブラリが提供されています。ここで重要な設計判断は「サーバークライアントライブラリ」と「モバイル/Web向けのFirebaseクライアントSDK」のどちらを使うかです。サーバークライアントライブラリはIAMで保護された特権環境（Firestoreセキュリティルールを経由しない、フルアクセス環境）を前提としており、バックエンドサーバーからの管理的なデータアクセスに用います。一方、エンドユーザーの端末上で直接Firestoreにアクセスするアプリケーションでは、セキュリティルールが適用されるFirebaseクライアントSDKを使う必要があります。
                    </p>
                    <p><strong>Cloud Storageへの接続</strong></p>
                    <p>
                        Cloud StorageはgRPC・JSON API・XML APIのいずれでもアクセス可能で、C++・C#・Go・Java・Node.js・PHP・Python・Rubyのクライアントライブラリが用意されています。アプリケーションからの接続管理という観点では、Cloud SQLやFirestoreのような「コネクションの確立と維持」という概念よりも、クライアントオブジェクト（例: Pythonの<code>storage.Client()</code>）を使い回し、リクエストごとに新規クライアントを生成しないことが重要です。内部で使われるトランスポート（HTTP/1.1・HTTP/2・gRPC）やコネクション再利用の挙動は言語・クライアントライブラリごとに異なるため、明示的なプール管理が必要かどうかは利用するライブラリのドキュメントで確認します。いずれの環境でも、クライアントインスタンスを再利用しリクエストごとに新規生成しないことは、パフォーマンス上の基本です。
                    </p>

                    <div className="practice-label">ベストプラクティス</div>
                    <ul>
                        <li>
                            <strong>コネクションプールは必ず使う</strong>: Cloud SQLへの接続はリクエストごとに新規作成せず、アプリケーションプロセスの起動時に1つのプールを作成して使い回します。
                        </li>
                        <li>
                            <strong>Cloud SQL Language Connectorsを優先する</strong>: 対応言語（Java/Python/Go/Node.js）では、証明書のライフサイクル管理が不要になるLanguage Connectorsを、Auth Proxyよりも先に検討します。一方、VPC内のクライアント、特にレイテンシに敏感なワークロードでは、コネクタの処理を経由しないPrivate IPによる直接接続も標準的な選択肢です。Private IPを選ぶ場合はTLSと証明書の構成・管理をアプリケーション側で担う必要があるため、証明書管理の手間を避けたいか、レイテンシを優先するかで接続方式を選定します。
                        </li>
                        <li>
                            <strong>プールサイズはスケール数を考慮して設計する</strong>: Cloud RunやGKEでインスタンス数が動的に増減する環境では、インスタンス数 × 最大接続数がデータベースの接続上限を超えないよう、上限を保守的に設定します。
                        </li>
                        <li>
                            <strong>再接続とバックオフを実装する</strong>: プールが正しく設定されていても、フェイルオーバーやメンテナンスによって接続が切れることがあるため、アプリケーション層でも再試行ロジックを持たせます。
                        </li>
                        <li>
                            <strong>用途に応じてFirestoreのライブラリを正しく使い分ける</strong>: バックエンドの管理処理にはサーバークライアントライブラリ、エンドユーザー端末からの直接アクセスにはセキュリティルールが効くFirebase クライアントSDKを使います。
                        </li>
                        <li>
                            <strong>クライアントオブジェクトを再利用する</strong>: Cloud Storageクライアントやその他のCloud Client Libraryのクライアントは、リクエストのたびに生成せずグローバル/シングルトンスコープで保持します。
                        </li>
                    </ul>

                    <h4>出典</h4>
                    <div className="ref-grid">
                        <div className="ref-card">
                            <div className="num">1</div>
                            <div className="txt">
                                <a href="https://cloud.google.com/sql/docs/mysql/manage-connections">
                                    Manage database connections | Cloud SQL for MySQL
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">2</div>
                            <div className="txt">
                                <a href="https://cloud.google.com/sql/docs/mysql/language-connectors">
                                    Cloud SQL Language Connectors overview | Cloud SQL for MySQL
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">3</div>
                            <div className="txt">
                                <a href="https://cloud.google.com/sql/docs/mysql/connect-connectors">
                                    Connect using Cloud SQL Language Connectors | Cloud SQL for MySQL
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">4</div>
                            <div className="txt">
                                <a href="https://cloud.google.com/sql/docs/mysql/sql-proxy">
                                    About the Cloud SQL Auth Proxy | Cloud SQL for MySQL
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">5</div>
                            <div className="txt">
                                <a href="https://cloud.google.com/firestore/docs/reference/libraries">
                                    Firestore client libraries | Firestore in Native mode
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">6</div>
                            <div className="txt">
                                <a href="https://cloud.google.com/storage/docs/reference/libraries">
                                    Cloud Storage client libraries
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">7</div>
                            <div className="txt">
                                <a href="https://cloud.google.com/storage/docs/introduction">
                                    Cloud Storage overview
                                </a>
                            </div>
                        </div>
                    </div>

                    <hr />

                    <h3 id="412-さまざまなgoogle-cloudデータソースへのデータの読み書き" tabIndex={-1}>
                        4.1.2 さまざまなGoogle Cloudデータソースへのデータの読み書き
                    </h3>
                    <h4>概要</h4>
                    <p>
                        データストアへの「接続」ができたら、次は実際の読み書き（CRUD操作）を、それぞれのデータストアの特性に合った方法で実装します。ここで問われるのは単一のAPI呼び出し方法ではなく、リレーショナルデータベース・ドキュメントデータベース・オブジェクトストレージという性質の異なるデータソースそれぞれで、何が「正しい読み書きのやり方」なのかを理解しているかどうかです。
                    </p>

                    <h4>ステップバイステップの流れ</h4>
                    <p><strong>リレーショナルデータ（Cloud SQL）の読み書き</strong></p>
                    <p>
                        Cloud SQLはMySQL・PostgreSQL・SQL Server互換のため、標準的なSQLドライバ（JDBC、psycopg、pgのようなドライバ）を通じて読み書きを行います。ここでの実装上の要点は、<strong>パラメータ化クエリ（プレースホルダ）を使い、文字列結合でSQLを組み立てないこと</strong>（SQLインジェクション対策）、そして複数の更新をまとめる場合は明示的なトランザクションでラップすることです。
                    </p>
                    <p><strong>ドキュメントデータ（Firestore）の読み書き</strong></p>
                    <p>
                        Firestoreはコレクション/ドキュメントのモデルで、単一ドキュメントの読み書きは低レイテンシになりやすい一方（実際の値はロケーション構成やネットワーク経路、ドキュメントサイズなどで変動します）、複数ドキュメントにまたがる整合性が必要な操作にはトランザクションやバッチ書き込みを使います。レイテンシ目標は固定値を前提にせず、実測したp95/p99に基づいて設計します。
                    </p>

                    <Diagram
                        id="diag-4"
                        label="Firestore 書き込み操作の分岐フロー"
                    />

                    <p>
                        読み取り側では、クエリ結果をリアルタイムに反映したい場合は<code>onSnapshot</code>のようなリスナー（スナップショットリスナー）を使い、1度きりの取得であれば単発の<code>get()</code>を使う、という使い分けが重要です。リスナーを使いっぱなしにして解除し忘れると、不要な読み取り課金とメモリリークの原因になります。
                    </p>
                    <p><strong>オブジェクトデータ（Cloud Storage）の読み書き</strong></p>
                    <p>
                        Cloud Storageの読み書きは「オブジェクト全体をアップロード/ダウンロードする」操作が基本ですが、大きなファイルではストリーミングアップロード/ダウンロードやレジューマブルアップロード（分割・再開可能なアップロード）を使うことで、ネットワーク断からの回復力を高められます。エンドユーザーに直接アップロード/ダウンロードさせたい場合は、アプリケーションサーバーを経由させず、署名付きURL（Section 1.3で解説）を発行してクライアントから直接Cloud Storageにアクセスさせるのが定石です。
                    </p>

                    <div className="practice-label">ベストプラクティス</div>
                    <ul>
                        <li>
                            <strong>パラメータ化クエリを徹底する</strong>: Cloud SQLに対するSQL文は、常にプレースホルダを使い、ユーザー入力を直接文字列結合しません。
                        </li>
                        <li>
                            <strong>複数ドキュメントの整合性が必要な場合はFirestoreトランザクションを使う</strong>: 読み取った値を基準に更新する処理（カウンタの増減など）は、<code>runTransaction()</code>で自動リトライ付きのアトミック処理として実装します。
                        </li>
                        <li>
                            <strong>大量書き込みにはバッチ書き込みを使う</strong>: Firestoreで多数のドキュメントを一括作成/更新する場合は、個別の<code>set()</code>呼び出しの連続ではなく<code>WriteBatch</code>にまとめてネットワークラウンドトリップを削減します。
                        </li>
                        <li>
                            <strong>スナップショットリスナーは確実に解除する</strong>: リアルタイム同期が不要になった時点（コンポーネントのアンマウント時など）でリスナーを解除し、読み取り課金とメモリリークを防ぎます。
                        </li>
                        <li>
                            <strong>大きなオブジェクトはストリーミング/レジューマブルアップロードを使う</strong>: メモリに全体を読み込まず、チャンク単位で処理し、ネットワーク断からの再開に対応します。
                        </li>
                        <li>
                            <strong>クライアント直接アップロード/ダウンロードには署名付きURLを使う</strong>: アプリケーションサーバーを経由させることで発生する二重の帯域消費とレイテンシを避けます。
                        </li>
                    </ul>

                    <h4>出典</h4>
                    <div className="ref-grid">
                        <div className="ref-card">
                            <div className="num">1</div>
                            <div className="txt">
                                <a href="https://docs.cloud.google.com/firestore/native/docs/create-database-server-client-library">
                                    Quickstart: Create a Firestore database by using a server client library
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">2</div>
                            <div className="txt">
                                <a href="https://github.com/googleapis/nodejs-firestore">
                                    GitHub - googleapis/nodejs-firestore
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">3</div>
                            <div className="txt">
                                <a href="https://cloud.google.com/storage/docs/reference/libraries">
                                    Cloud Storage client libraries
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">4</div>
                            <div className="txt">
                                <a href="https://docs.cloud.google.com/python/docs/reference/storage/latest">
                                    Python Client for Cloud Storage
                                </a>
                            </div>
                        </div>
                    </div>

                    <hr />

                    <h3 id="413-メッセージングサービスを使ったデータの発行消費アプリケーションの作成" tabIndex={-1}>
                        4.1.3 メッセージングサービスを使ったデータの発行・消費アプリケーションの作成
                    </h3>
                    <h4>概要</h4>
                    <p>
                        同期的なリクエスト/レスポンス型の統合だけでなく、Section 1.1で扱った「非同期・イベント駆動型の統合」を実際にコードとして実装する項目です。Google Cloudにおけるメッセージングサービスの中心は<strong>Pub/Sub</strong>であり、発行（Publish）と消費（Subscribe）それぞれで異なるチューニングポイントがあります。
                    </p>

                    <h4>ステップバイステップの流れ</h4>
                    <p>Pub/Subを使ったアプリケーション構築の標準的な流れは次のとおりです。</p>

                    <Diagram
                        id="diag-5"
                        label="Pub/Sub アプリケーション構築の流れ"
                    />

                    <p><strong>発行（Publish）側のチューニング</strong></p>
                    <p>
                        パブリッシャークライアントは使い回すことが基本原則です。メッセージを送るたびに新しいクライアントを生成すると、接続確立のオーバーヘッドが積み重なります。また、大量のメッセージを短時間に発行する場合は、パブリッシャー側の<strong>フロー制御</strong>（未確認応答のまま送信できるメッセージ数・バイト数の上限）を設定し、クライアント側のメモリ・CPU・スレッドが枯渇して<code>DEADLINE_EXCEEDED</code>エラーが多発する事態を防ぎます。
                    </p>

                    <Diagram
                        id="diag-6"
                        label="Pub/Sub フロー制御と配信シーケンス"
                    />

                    <p><strong>消費（Subscribe）側のチューニング</strong></p>
                    <p>
                        サブスクライバー側では、<strong>ackDeadline</strong>（メッセージの確認応答に許される時間）を処理内容に見合った長さに設定し、処理が終わる前にメッセージが再配信されてしまう事態を防ぎます。また、Pub/Subはデフォルトで<strong>少なくとも1回（at-least-once）配信</strong>を保証する設計であるため、同じメッセージが2回以上届く可能性を前提に、消費側の処理を<strong>冪等</strong>（べき等）に設計することが極めて重要です。高いスループットが必要な場合はサブスクライバー側でもフロー制御を設定し、突発的なトラフィックスパイクでサブスクライバーが過負荷になるのを防ぎます。
                    </p>
                    <p>
                        サブスクリプションの種類（Push/Pull）の選定は、Section 3.1（Cloud Runへのデプロイ）で扱った「Eventarc/Pub/Subによるトリガー」とも密接に関係します。
                    </p>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">サブスクリプション種別</th>
                                    <th scope="col">特徴</th>
                                    <th scope="col">向いているシーン</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Pull（プル型）</td>
                                    <td>
                                        サブスクライバーが能動的にメッセージを取得しにいく。Pull APIまたはStreamingPull APIの呼び出しが必要（クライアントライブラリの利用が推奨）
                                    </td>
                                    <td>常時稼働するワーカー、GKE上のサービスなど</td>
                                </tr>
                                <tr className="even">
                                    <td>Push（プッシュ型）</td>
                                    <td>Pub/SubがHTTPSエンドポイントへメッセージをPOSTする</td>
                                    <td>
                                        クライアントライブラリを依存関係に含められない環境、Cloud Runなどサーバーレス環境からの受信
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>BigQueryサブスクリプション（エクスポート型）</td>
                                    <td>Dataflowを介さず直接BigQueryテーブルへ書き込む</td>
                                    <td>ログ/イベントの分析用ストレージへの直接投入</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p>
                        <strong>Exactly-once配信の適用範囲</strong>：Exactly-once配信を有効にできるのは<strong>Pullサブスクリプション（Pull API、StreamingPullを含む）のみ</strong>です。PushサブスクリプションおよびBigQueryサブスクリプションのようなエクスポート型では利用できないため、重複排除を配信側の保証に依存する設計はPull型に限られます。さらに、この保証が成立するのは<strong>サブスクライバークライアントが同一リージョンのPub/Subサービスに接続している場合のみ</strong>です。別リージョンのエンドポイントへ接続した場合はexactly-onceの保証が適用されないため、サブスクライバーの配置先リージョンも設計時に確認します。
                    </p>

                    <div className="practice-label">ベストプラクティス</div>
                    <ul>
                        <li>
                            <strong>パブリッシャー/サブスクライバークライアントを使い回す</strong>: リクエストごとに生成せず、アプリケーションのライフサイクル全体で単一のクライアントインスタンスを共有します。
                        </li>
                        <li>
                            <strong>消費処理は冪等に設計する</strong>: Pub/Subのat-least-once配信により同一メッセージが重複配信され得るため、何度処理されても結果が変わらない実装にします。同一メッセージの再配信は<code>messageId</code>で弾けますが、パブリッシャー側が再試行した場合は内容が同じでも<code>messageId</code>が変わるため、注文IDのような<strong>業務上の冪等性キー</strong>を使った永続的な重複排除を併用します。重複排除の記録先ごとに実装方法が異なる点に注意が必要です。Firestore（Native mode）のStandard editionには一意制約（UNIQUE制約）に相当する機能がないため、<strong>業務キーそのものをドキュメントIDにした処理済み記録</strong>を作り、<code>create</code>（既存なら失敗）やトランザクション内の存在チェックで重複を弾きます。Cloud SQLを使う場合は、処理済みテーブルの業務キー列に<strong>UNIQUE制約</strong>を張り、重複挿入がエラーになるようにします。
                        </li>
                        <li>
                            <strong>重複排除の記録と副作用は同じ整合性境界に収める</strong>: 重複排除の記録と実際の副作用（DB更新など）は<strong>同一データストアの単一トランザクションでコミット</strong>し、「副作用だけ適用されて記録が残らない」中途半端な状態が生じないようにします。副作用がCloud SQL側にあるのに重複排除の記録をFirestoreに置くような<strong>データストアをまたぐ構成では、Firestoreのトランザクションは両者の原子性を保証できません</strong>。この場合は、重複排除の記録も副作用と同じCloud SQLのトランザクション内で書き込むか、outboxパターンのような結果整合性を担保する仕組みを挟んで、2つのデータストア間の整合性をアプリケーション側で明示的に管理します。
                        </li>
                        <li>
                            <strong>フロー制御を適切に設定する</strong>: パブリッシャー・サブスクライバーの両方で、未確認メッセージ数/バイト数の上限を設定し、突発的な負荷でリソースが枯渇するのを防ぎます。
                        </li>
                        <li>
                            <strong>ackDeadlineを処理時間に合わせて設定する</strong>: 処理が長時間かかる場合はackDeadlineを延長するか、処理開始時に自動延長（lease management）を有効にします。
                        </li>
                        <li>
                            <strong>クライアントライブラリの言語選定にも注意する</strong>: Java・C++・Goはスループット効率が高く、大量メッセージ処理が必要な基盤にはこれらの言語のクライアントライブラリが有利です。
                        </li>
                        <li>
                            <strong>本番では検証済みバージョンを固定し、更新を定期的に取り込む</strong>: Pub/Subのクライアントライブラリは継続的に機能追加・不具合修正が行われるため更新の追随には価値がありますが、本番環境で常に最新版を自動採用すると、未検証の変更がそのまま入り込みます。本番では動作検証を済ませたバージョンを固定（ピン留め）し、定期的に新しいバージョンを検証したうえで計画的に更新を取り込みます。
                        </li>
                    </ul>

                    <h4>出典</h4>
                    <div className="ref-grid">
                        <div className="ref-card">
                            <div className="num">1</div>
                            <div className="txt">
                                <a href="https://cloud.google.com/pubsub/docs/pubsub-basics">
                                    Overview of the Pub/Sub service
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">2</div>
                            <div className="txt">
                                <a href="https://cloud.google.com/pubsub/docs/publish-best-practices">
                                    Best practices to publish to a Pub/Sub topic
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">3</div>
                            <div className="txt">
                                <a href="https://cloud.google.com/pubsub/docs/subscribe-best-practices">
                                    Best practices to subscribe to a Pub/Sub topic
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">4</div>
                            <div className="txt">
                                <a href="https://cloud.google.com/pubsub/docs/reliability-intro">
                                    Pub/Sub: Introduction to reliability
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">5</div>
                            <div className="txt">
                                <a href="https://cloud.google.com/pubsub/docs/flow-control-messages">
                                    Flow control | Pub/Sub
                                </a>
                            </div>
                        </div>
                    </div>

                    <hr />

                    <h2 id="42-google-cloud-apiの利用" tabIndex={-1}>4.2 Google Cloud APIの利用</h2>

                    <h3 id="421-google-cloudサービスの有効化" tabIndex={-1}>4.2.1 Google Cloudサービスの有効化</h3>
                    <h4>概要</h4>
                    <p>
                        Google Cloudのほとんどのサービス（BigQuery、Pub/Sub、Cloud SQL Admin APIなど）は、プロジェクトごとに明示的に「有効化（Enable）」しないと呼び出せません。これはコスト管理・セキュリティ・監査のための設計であり、開発者がAPIを利用する最初のステップとして必ず理解しておく必要があります。
                    </p>

                    <h4>ステップバイステップの流れ</h4>

                    <Diagram
                        id="diag-7"
                        label="Google Cloud サービス有効化の流れ"
                    />

                    <p>
                        コンソールから有効化する場合は、「APIとサービス」＞「ライブラリ」から対象のAPIを検索し、「有効にする」をクリックします。gcloud CLIでは<code>gcloud services enable</code>コマンドを使い、複数のサービスをスペース区切りで一度に有効化することもできます。
                    </p>
                    <p>
                        <code>
                            # 単一サービスの有効化<br />
                            {' '}gcloud services enable pubsub.googleapis.com<br />
                            <br />
                            {' '}# 複数サービスをまとめて有効化<br />
                            {' '}gcloud services enable bigquery.googleapis.com pubsub.googleapis.com
                        </code>
                    </p>
                    <p>
                        非同期で有効化を実行したい場合は<code>--async</code>フラグを付与します。CI/CDパイプラインやIaCで環境を再現可能にしたい場合は、Terraformの<code>google_project_service</code>リソースを使い、プロジェクト作成の一部としてAPI有効化をコード化するのが望ましいアプローチです。
                    </p>
                    <p>
                        なお、一部のIAMロールは、対応するサービスが有効化されるまでコンソール上に表示されない場合があります（例: <code>roles/compute.admin</code>はCompute Engine APIが有効化されて初めて選択可能になります）。API有効化とIAM権限付与は別の設定であり、両方が揃って初めてAPI呼び出しが成功する点に注意してください。
                    </p>

                    <div className="practice-label">ベストプラクティス</div>
                    <ul>
                        <li>
                            <strong>必要最小限のAPIのみを有効化する</strong>: 使わないサービスを有効化したままにすると、誤用やセキュリティリスクの増加につながります。使わなくなったサービスは無効化を検討します。
                        </li>
                        <li>
                            <strong>IaCでAPI有効化を管理する</strong>: Terraformなどのコードでプロジェクトの初期設定として管理することで、環境間の再現性と監査可能性を確保します。
                        </li>
                        <li>
                            <strong>依存関係を意識して無効化する</strong>: あるサービスが他の有効なサービスに依存されている場合、無効化はエラーになります。依存サービスも含めて無効化したい場合、<code>gcloud</code> CLIでは<code>gcloud services disable SERVICE --force</code>のように<code>--force</code>フラグを使います（依存関係チェックに加え、直近の利用状況チェックも合わせてバイパスします）。Service Usage REST APIを直接呼び出す場合は、<code>services.disable</code>リクエストのボディに<code>disableDependentServices: true</code>パラメータを指定します。CLIの<code>--force</code>とREST APIの<code>disableDependentServices</code>は同じ「依存サービスも含めて無効化する」という目的のためのそれぞれ別のインターフェースであり、混同しないよう注意してください。
                        </li>
                        <li>
                            <strong>サービス無効化はデータを削除しない点を理解する</strong>: Cloud StorageやBigQueryのようにデータ保存に課金が発生するサービスでは、APIを無効化してもデータそのものや課金は止まりません。将来の課金を止めたい場合はデータそのものを削除する必要があります。
                        </li>
                        <li>
                            <strong>API有効化とIAM権限を混同しない</strong>: 「APIが有効化されている」ことと「呼び出すユーザー/サービスアカウントに権限がある」ことは別の設定であるため、両方を確認します。
                        </li>
                    </ul>

                    <h4>出典</h4>
                    <div className="ref-grid">
                        <div className="ref-card">
                            <div className="num">1</div>
                            <div className="txt">
                                <a href="https://cloud.google.com/sdk/gcloud/reference/services/enable">
                                    gcloud services enable | Google Cloud SDK
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">2</div>
                            <div className="txt">
                                <a href="https://cloud.google.com/service-usage/docs/enable-disable">
                                    Enable and disable services | Service Usage
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">3</div>
                            <div className="txt">
                                <a href="https://docs.cloud.google.com/service-usage/docs/enabled-service">
                                    Enabled services | Service Usage
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">4</div>
                            <div className="txt">
                                <a href="https://cloud.google.com/apis/docs/getting-started">
                                    Getting started | Cloud APIs
                                </a>
                            </div>
                        </div>
                    </div>

                    <hr />

                    <h3 id="422-サポートされているオプションを使ったapi呼び出し" tabIndex={-1}>
                        4.2.2 サポートされているオプションを使ったAPI呼び出し
                    </h3>
                    <h4>概要</h4>
                    <p>
                        Google CloudのAPIには複数の呼び出し方式があり、それぞれ得意分野が異なります。Exam Guideが例示するのは <strong>Cloud Client Libraries</strong>・<strong>REST API</strong>・<strong>gRPC</strong>・<strong>API Explorer</strong> の4つです。さらに、実際の呼び出しを設計する際には「バッチ処理」「返却データの制限（部分レスポンス）」「結果のページネーション」「結果のキャッシュ」「エラー処理（指数バックオフ）」という5つの考慮事項が試験範囲として明示されています。この項目は4.2の中でも最もボリュームが大きく、実装者としての実務力が直接問われる部分です。
                    </p>

                    <h4>ステップバイステップの流れ: 呼び出し方式の選択</h4>

                    <Diagram
                        id="diag-8"
                        label="Google Cloud API 呼び出し方式の選択フロー"
                    />

                    <p>
                        すべてのGoogle Cloud APIはJSON/RESTインターフェースを公開しており、その一部（gRPC対応のAPI）はさらにProtocol BuffersベースのRPCインターフェースも提供します。Cloud Client Librariesは、この2つのプロトコルの違いを開発者から隠蔽し、言語ネイティブな型安全なコードとして提供するラッパーです。
                    </p>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">呼び出し方式</th>
                                    <th scope="col">特徴</th>
                                    <th scope="col">向いているシーン</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Cloud Client Libraries</td>
                                    <td>
                                        言語ネイティブな型安全なAPI。認証・リトライ・ページネーションを内蔵
                                    </td>
                                    <td>本番アプリケーションの実装（第一選択）</td>
                                </tr>
                                <tr className="even">
                                    <td>REST API</td>
                                    <td>JSON over HTTP。あらゆる言語のHTTPクライアントから呼べる</td>
                                    <td>
                                        Client Libraryが存在しない言語、または直接HTTP制御が必要な場合
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>gRPC</td>
                                    <td>
                                        Protocol Buffers + HTTP/2。ストリーミングと低レイテンシに強い
                                    </td>
                                    <td>
                                        独自クライアントを生成したい場合、双方向ストリーミングが必要な場合
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>API Explorer</td>
                                    <td>ブラウザ上でAPIリクエストを対話的に試行できるツール</td>
                                    <td>ドキュメントを読みながらAPIの挙動を探索的に確認する場合</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h4>ステップバイステップの流れ: 5つの考慮事項</h4>
                    <p>
                        Cloud Client Libraries・REST・gRPCのいずれを使う場合でも、本番品質のAPI呼び出しを実装するには次の5つの観点を必ず設計に組み込みます。
                    </p>
                    <p><strong>① バッチ処理（Batching requests）</strong></p>
                    <p>
                        多数の小さなリクエストを個別に送信すると、リクエストごとのオーバーヘッド（TCP接続・TLSハンドシェイク・認証検証）が積み重なりスループットが低下します。バッチ処理では複数のAPI呼び出しを1つのHTTPリクエストにまとめて送信し、往復回数を削減します。ただし、<code>batchCreate</code>・<code>batchGet</code>のような一括操作やHTTPレベルのバッチエンドポイントは、すべてのGoogle Cloud APIが標準で備えている機能ではありません。対象のAPIが<code>batchPath</code>を公開しているなど、API固有の仕様としてバッチをサポートしている場合にのみ利用できるため、利用前に対象APIのリファレンスで対応状況を確認します。1回のバッチリクエストに含められる件数などの利用上限も、対象APIの仕様に従います。
                    </p>
                    <p>
                        <strong>② 返却データの制限（Restricting return data / 部分レスポンス）</strong>
                    </p>
                    <p>
                        デフォルトでは、APIはリソースの完全な表現を返します。実際に必要なフィールドがごく一部であれば、<code>fields</code>パラメータを使って部分レスポンスをリクエストすることで、レスポンスサイズとシリアライズ/デシリアライズのコストを削減できます。
                    </p>
                    <p>
                        <code>GET https://www.googleapis.com/example/v1/items?fields=items(id,name)</code>
                    </p>
                    <p><strong>③ 結果のページネーション（Paginating results）</strong></p>
                    <p>
                        一覧取得系のAPI（List系メソッド）は、大量の結果を一度に返すとネットワーク負荷とサーバー/クライアント双方の処理負荷が大きくなるため、ページトークン方式のページネーションを提供しています。クライアントは<code>pageSize</code>で1回あたりの件数を指定し、レスポンスに含まれる<code>nextPageToken</code>を次のリクエストに渡すことで、続きのページを取得します。Cloud Client Librariesの多くは、この処理をイテレータとして自動化しており、開発者はページングロジックを手書きする必要がありません。
                    </p>
                    <p><strong>④ 結果のキャッシュ（Caching results）</strong></p>
                    <p>
                        同じリソースへの問い合わせを繰り返す場合、<strong>対象のAPIがETagと条件付き取得をサポートしているときに限り</strong>、HTTPの条件付きリクエストの仕組みである<strong>ETag</strong>を活用できます。この場合、クライアントは前回取得時のETagを保存しておき、次回のリクエストで<code>If-None-Match</code>ヘッダーに指定します。リソースが変更されていなければサーバーは<code>304 Not Modified</code>を返し、レスポンスボディの転送を省略できます。
                    </p>
                    <p>
                        ETagのサポート有無と、<code>If-None-Match</code>をどう指定するかはAPIごと・クライアントごとに異なります。Google API Client Librariesが一般にETagキャッシュを自動処理してくれると考えるのではなく、<strong>呼び出し対象APIのリファレンスでETagの対応状況を確認し、利用するクライアントライブラリのドキュメントで条件付きリクエストの具体的な指定方法を確認</strong>したうえで実装します。
                    </p>
                    <p><strong>⑤ エラー処理（Handling errors: 指数バックオフ）</strong></p>
                    <p>
                        一時的なエラー（レート制限による<code>429</code>、サーバー側の一時的な過負荷による<code>503</code>など）に対しては、即座に失敗とせず、待機時間を指数関数的に増やしながら再試行する<strong>指数バックオフ</strong>を実装します。
                    </p>

                    <Diagram
                        id="diag-9"
                        label="指数バックオフとジッターによるリトライ判定フロー"
                    />

                    <p>
                        指数バックオフに<strong>ランダムなジッター</strong>（揺らぎ）を加えることも重要です。ジッターがないと、同時に失敗した多数のクライアントが同じタイミングで一斉に再試行し、サーバーへの負荷が再び集中する「サンダリングハード（thundering herd）」問題を引き起こす可能性があります。Cloud Client Librariesの多くは、この指数バックオフとジッターの実装をあらかじめ内蔵しており、初期間隔・最大間隔・倍率・最大試行回数といったパラメータのみを調整すればよいようになっています。
                    </p>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">考慮事項</th>
                                    <th scope="col">目的</th>
                                    <th scope="col">代表的な実装手段</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>バッチ処理</td>
                                    <td>リクエスト往復回数の削減</td>
                                    <td>
                                        バッチAPI、<code>batchCreate</code>系メソッド（<strong>対象APIが<code>batchPath</code>等でバッチをサポートしている場合のみ</strong>。利用上限も対象APIの仕様に従う）
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>返却データの制限</td>
                                    <td>レスポンスサイズの削減</td>
                                    <td><code>fields</code>パラメータによる部分レスポンス</td>
                                </tr>
                                <tr className="odd">
                                    <td>ページネーション</td>
                                    <td>大量結果の分割取得</td>
                                    <td>
                                        <code>pageSize</code> / <code>pageToken</code> / <code>nextPageToken</code>
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>キャッシュ</td>
                                    <td>不要な再取得の回避</td>
                                    <td>
                                        ETagと<code>If-None-Match</code>による条件付きリクエスト（<strong>対象APIがETag/条件付き取得に対応している場合のみ</strong>。指定方法はクライアントごとに要確認）
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>エラー処理</td>
                                    <td>一時的障害からの回復</td>
                                    <td>ジッター付き指数バックオフ</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="practice-label">ベストプラクティス</div>
                    <ul>
                        <li>
                            <strong>可能な限りCloud Client Librariesを使う</strong>: 認証・リトライ・ページネーション・エラーハンドリングの多くがライブラリ側に実装済みであり、車輪の再発明を避けられます。
                        </li>
                        <li>
                            <strong>部分レスポンスを積極的に使う</strong>: 一覧画面のサマリ表示など、フィールドの一部しか使わない場面では<code>fields</code>パラメータで転送量を削減します。
                        </li>
                        <li>
                            <strong>ページングはイテレータに任せる</strong>: 手動で<code>nextPageToken</code>を管理するのではなく、Client Libraryが提供するページャー/イテレータを使い、実装ミスによる無限ループや取りこぼしを防ぎます。
                        </li>
                        <li>
                            <strong>リトライは冪等な操作にのみ適用する</strong>: GETやリストのような読み取り操作は安全にリトライできますが、POSTのような非冪等な操作をリトライする場合はリクエストIDなどで重複実行を防ぎます。リクエストIDやプレコンディションによる重複実行防止のサポート有無・指定方法はAPIごとに異なるため、リトライ対象APIのリファレンスで対応状況を必ず確認してください。いずれの手段も提供していない非冪等な操作は、安全にリトライできない操作として扱います。
                        </li>
                        <li>
                            <strong>指数バックオフには必ずジッターを加える</strong>: 固定間隔や単純な指数バックオフだけでは、サンダリングハード問題を防ぎきれません。
                        </li>
                        <li>
                            <strong>再試行可能なエラーコードを正しく見極める</strong>: 4xx系の多くはクライアント側の問題（認証エラーや不正なリクエスト）であり再試行しても解決しないため、429や5xx系のような一時的なエラーとは区別して扱います。
                        </li>
                    </ul>

                    <h4>出典</h4>
                    <div className="ref-grid">
                        <div className="ref-card">
                            <div className="num">1</div>
                            <div className="txt">
                                <a href="https://cloud.google.com/apis/docs/client-libraries-explained">
                                    Client libraries and Cloud APIs explained
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">2</div>
                            <div className="txt">
                                <a href="https://cloud.google.com/blog/products/api-management/understanding-grpc-openapi-and-rest-and-when-to-use-them">
                                    gRPC vs REST: Understanding gRPC, OpenAPI and REST | Google Cloud Blog
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">3</div>
                            <div className="txt">
                                <a href="https://google.aip.dev/158">AIP-158: Pagination</a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">4</div>
                            <div className="txt">
                                <a href="https://googleapis.github.io/google-api-python-client/docs/performance.html">
                                    Performance Tips | google-api-python-client
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">5</div>
                            <div className="txt">
                                <a href="https://cloud.google.com/storage/docs/retry-strategy">
                                    Retry strategy | Cloud Storage
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">6</div>
                            <div className="txt">
                                <a href="https://en.wikipedia.org/wiki/Exponential_backoff">
                                    Exponential backoff | Wikipedia
                                </a>
                            </div>
                        </div>
                    </div>

                    <hr />

                    <h3 id="423-サービスアカウントを使ったcloud-api呼び出し" tabIndex={-1}>
                        4.2.3 サービスアカウントを使ったCloud API呼び出し
                    </h3>
                    <h4>概要</h4>
                    <p>
                        Section 1.2で扱った認証の基礎（Application Default Credentials、WIFなど）を、実際の「API呼び出し」というコンテキストで再確認する項目です。ここで鍵となる概念が<strong>Application Default Credentials</strong>（ADC）です。サービスアカウントの利用が適しているのは、人間の対話を介さないサーバー間通信やバックグラウンド処理（バッチジョブ、CI/CDパイプラインなど）です。一方、ユーザー自身が所有するリソースを操作するアプリケーションでは、そのユーザーの認可を経ないサービスアカウントではなく、ユーザー認証やユーザー委任（OAuthの同意フローなど）を使うべきです。
                    </p>

                    <h4>ステップバイステップの流れ</h4>
                    <p>
                        ADCは、アプリケーションの実行環境に応じて自動的に適切な認証情報を見つけ出す仕組みです。Cloud Client Librariesは明示的な設定なしにADCを利用するため、開発環境と本番環境でコードを変更する必要がありません。
                    </p>

                    <Diagram
                        id="diag-10"
                        label="Application Default Credentials (ADC) の探索フロー"
                    />

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">探索順序</th>
                                    <th scope="col">認証情報のソース</th>
                                    <th scope="col">主な用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>1</td>
                                    <td>
                                        <code>GOOGLE_APPLICATION_CREDENTIALS</code>環境変数が指す<strong>認証情報構成ファイル</strong>（サービスアカウントキーのほか、Workload Identity Federation用の<strong>外部アカウント構成ファイル</strong>も指定可能）
                                    </td>
                                    <td>
                                        CI/CDや他クラウド上での実行など、実行環境にサービスアカウントを直接アタッチできない場合。長期有効なキーの配布は避け、外部アカウント構成（WIF）を優先する
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>2</td>
                                    <td>
                                        <code>gcloud auth application-default login</code>で生成されたローカル認証情報
                                    </td>
                                    <td>開発者個人のローカル開発環境</td>
                                </tr>
                                <tr className="odd">
                                    <td>3</td>
                                    <td>
                                        実行環境にアタッチされたサービスアカウント（メタデータサーバー経由）
                                    </td>
                                    <td>
                                        Compute Engine / Cloud Run / GKE / Cloud Functionsなどの本番環境
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p>
                        本番環境における最も推奨される方法は、<strong>ユーザー管理のサービスアカウントを作成し、最小権限のIAMロールのみを付与したうえで、実行先のリソース（Cloud Run サービス、GKEのワークロードなど）にアタッチする</strong>方式です。この場合、アプリケーションコードはキーファイルを一切扱わず、ADCがメタデータサーバーから自動的に短期間（デフォルトで1時間）有効なアクセストークンを取得します。他クラウドやオンプレミス環境からGoogle CloudのAPIを呼び出す必要がある場合は、長期間有効なサービスアカウントキーをダウンロードして配布するのではなく、[[gcp-pca-guide]]でも扱ったWorkload Identity Federation（WIF）を使い、外部IDプロバイダーの認証情報を一時的なサービスアカウント認証情報に交換する方式が推奨されます。
                    </p>

                    <div className="practice-label">ベストプラクティス</div>
                    <ul>
                        <li>
                            <strong>サービスアカウントキーのダウンロード/配布を避ける</strong>: JSONキーファイルは長期間有効な機密情報であり、漏洩のリスクが高いため、可能な限りアタッチ型のサービスアカウントやWIFを使います。
                        </li>
                        <li>
                            <strong>最小権限の原則を徹底する</strong>: サービスアカウントには、そのワークロードが実際に必要とするAPI呼び出しに対応する最小限のIAMロールのみを付与します。
                        </li>
                        <li>
                            <strong>ADCの探索順序を理解してデバッグに活用する</strong>: 「意図しない認証情報が使われている」不具合の多くは、環境変数やローカルADCファイルが本番環境の設定を上書きしてしまうケースであるため、探索順序を把握しておくとトラブルシューティングが早くなります。
                        </li>
                        <li>
                            <strong>ワークロードごとに専用のサービスアカウントを分離する</strong>: 複数のサービスで1つの強い権限を持つサービスアカウントを共有せず、サービス単位でアカウントを分離し、影響範囲を限定します。
                        </li>
                        <li>
                            <strong>他クラウド/オンプレミスからの呼び出しにはWIFを使う</strong>: 長期キーの代わりに、外部IDプロバイダーとの信頼関係に基づく短期トークン交換を使います。
                        </li>
                    </ul>

                    <h4>出典</h4>
                    <div className="ref-grid">
                        <div className="ref-card">
                            <div className="num">1</div>
                            <div className="txt">
                                <a href="https://docs.cloud.google.com/docs/authentication/application-default-credentials">
                                    How Application Default Credentials works | Authentication
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">2</div>
                            <div className="txt">
                                <a href="https://docs.cloud.google.com/iam/docs/service-account-creds">
                                    Service account credentials | Identity and Access Management (IAM)
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">3</div>
                            <div className="txt">
                                <a href="https://docs.cloud.google.com/compute/docs/access/authenticate-workloads">
                                    Authenticate workloads to Google Cloud APIs using service accounts | Compute Engine
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">4</div>
                            <div className="txt">
                                <a href="https://cloud.google.com/sdk/gcloud/reference/auth/application-default">
                                    gcloud auth application-default | Google Cloud SDK
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">5</div>
                            <div className="txt">
                                <a href="https://docs.cloud.google.com/docs/authentication#service-accounts">
                                    Authentication for Google Cloud APIs and services
                                </a>
                            </div>
                        </div>
                    </div>

                    <hr />

                    <h2 id="43-トラブルシューティングとオブザーバビリティ" tabIndex={-1}>
                        4.3 トラブルシューティングとオブザーバビリティ
                    </h2>

                    <h3 id="431-メトリクスログトレースによるコードのインスツルメンテーション" tabIndex={-1}>
                        4.3.1 メトリクス・ログ・トレースによるコードのインスツルメンテーション
                    </h3>
                    <h4>概要</h4>
                    <p>
                        「オブザーバビリティ（可観測性）」とは、システムの外部から得られるテレメトリデータ（メトリクス・ログ・トレース）をもとに、システム内部で何が起きているかを理解できる状態を指します。この状態を実現する最初のステップが<strong>インスツルメンテーション</strong>、すなわちアプリケーションコードにテレメトリを発生させるコードを組み込むことです。Google Cloudはこれらのテレメトリを収集・分析する統合サービス群を<strong>Google Cloud Observability</strong>として提供しています。
                    </p>

                    <h4>ステップバイステップの流れ</h4>

                    <Diagram
                        id="diag-11"
                        label="テレメトリ収集と Google Cloud Observability への送信フロー"
                    />

                    <p>
                        3種類のテレメトリはそれぞれ異なる問いに答えます。<strong>メトリクス</strong>は「アプリケーションは正常に動いているか（応答時間、エラー率、リソース使用率など）」という問いに、<strong>ログ</strong>は「具体的に何が起きたか（エラーメッセージ、スタックトレース、特定リクエストの詳細）」という問いに、<strong>トレース</strong>は「複数サービスをまたぐリクエストのどこで時間がかかっているか」という問いにそれぞれ答えます。
                    </p>
                    <p>
                        Googleはこれらのテレメトリ収集にあたり、ベンダー固有のAPI/クライアントライブラリではなく、<strong>OpenTelemetry</strong>のようなオープンソースでベンダー中立な計装フレームワークの利用を推奨しています。OpenTelemetryで収集したテレメトリはGoogle Cloud Observabilityへエクスポートでき、将来的に別の観測基盤へ移行する場合もロックインを避けられます。
                    </p>
                    <p>
                        言語ごとの実装パターンとしては、ログについてはJSON構造化ログを出力できるロギングフレームワークの利用が推奨されており、たとえばPythonでは標準の<code>logging</code>モジュール、JavaScriptでは<code>Pino</code>、Javaでは<code>SLF4J</code>と<code>Log4j2</code>の組み合わせが例示されています。メトリクスについては、オープンソースの監視システムであるPrometheusのクライアントライブラリを使い、HTTPエンドポイントとして公開する方式もサポートされています。
                    </p>

                    <div className="practice-label">ベストプラクティス</div>
                    <ul>
                        <li>
                            <strong>OpenTelemetryを軸に計装を設計する</strong>: 個別のベンダーAPIに直接依存するのではなく、OpenTelemetryで計装し、Google Cloudへエクスポートする構成にすることで移植性を保ちます。
                        </li>
                        <li>
                            <strong>構造化ログを出力する</strong>: 自由形式のテキストログではなく、JSON形式の構造化ログを出力することで、Cloud Logging側でのフィルタリング・分析が容易になります。
                        </li>
                        <li>
                            <strong>3種類のテレメトリを組み合わせて設計する</strong>: メトリクスだけ、ログだけといった単一の情報源に頼らず、「メトリクスで異常を検知し、トレースで箇所を特定し、ログで原因を確認する」という一連の流れを前提にインスツルメンテーションを設計します。
                        </li>
                        <li>
                            <strong>重要なビジネスロジックにはカスタムスパン/カスタムメトリクスを追加する</strong>: フレームワークが自動計装する範囲だけでなく、業務上重要な処理には独自のスパンやメトリクスを追加し、可視性を高めます。
                        </li>
                        <li>
                            <strong>ログのボリュームとコストを意識する</strong>: すべてのログを無制限に記録するとコストが増大するため、ログの重要度（severity）やサンプリングを適切に設計します。
                        </li>
                    </ul>

                    <h4>出典</h4>
                    <div className="ref-grid">
                        <div className="ref-card">
                            <div className="num">1</div>
                            <div className="txt">
                                <a href="https://docs.cloud.google.com/stackdriver/docs">
                                    Observability in Google Cloud | Google Cloud Observability
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">2</div>
                            <div className="txt">
                                <a href="https://docs.cloud.google.com/stackdriver/docs/instrumentation/overview">
                                    Instrumentation and observability | Google Cloud Observability
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">3</div>
                            <div className="txt">
                                <a href="https://cloud.google.com/discover/what-is-observability">
                                    What Is Observability? | Google Cloud
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">4</div>
                            <div className="txt">
                                <a href="https://docs.cloud.google.com/docs/observability">
                                    Observability and monitoring
                                </a>
                            </div>
                        </div>
                    </div>

                    <hr />

                    <h3 id="432-google-cloud-observabilityを使った問題の特定と解決" tabIndex={-1}>
                        4.3.2 Google Cloud Observabilityを使った問題の特定と解決
                    </h3>
                    <h4>概要</h4>
                    <p>
                        インスツルメンテーションによってテレメトリが収集できるようになったら、次はそのデータを使って実際に問題を「特定」し「解決」するプロセスです。Google Cloud Observabilityは、Cloud Logging・Cloud Monitoring・Cloud Trace・Cloud Profilerという複数のサービス群から構成される統合スイートであり、それぞれが異なる役割を担います。
                    </p>

                    <h4>ステップバイステップの流れ</h4>

                    <Diagram
                        id="diag-12"
                        label="Google Cloud Observability スイートの構成図"
                    />

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">サービス</th>
                                    <th scope="col">主なデータ</th>
                                    <th scope="col">主な用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Cloud Logging</td>
                                    <td>構造化/非構造化ログ</td>
                                    <td>イベントの詳細確認、SQLベースのLog Analytics分析、アラート条件のトリガー</td>
                                </tr>
                                <tr className="even">
                                    <td>Cloud Monitoring</td>
                                    <td>時系列メトリクス、アップタイムチェック結果</td>
                                    <td>ダッシュボードによる可視化、しきい値超過時のアラート通知、SLO管理</td>
                                </tr>
                                <tr className="odd">
                                    <td>Cloud Trace</td>
                                    <td>分散トレースのスパン</td>
                                    <td>サービス間のレイテンシ分析、ボトルネックの特定</td>
                                </tr>
                                <tr className="even">
                                    <td>Cloud Profiler</td>
                                    <td>CPU/メモリ/ヒープ使用量の継続的サンプリング</td>
                                    <td>コスト最適化、特定関数のリソース消費の特定</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p>
                        典型的な問題解決フローは次のように進みます。まずCloud Monitoringのダッシュボードやアラートポリシーによって「エラー率が上昇している」「レイテンシが悪化している」といった<strong>異常の検知</strong>が行われます。次に、該当する時間帯のCloud Traceでリクエストのスパンを確認し、<strong>どのサービス・どの処理でボトルネックが発生しているか</strong>を特定します。さらに、該当するスパンやリクエストに紐づくCloud Loggingのログエントリを確認し、<strong>具体的なエラーメッセージやスタックトレース</strong>から根本原因を突き止めます。CPUやメモリのボトルネックが疑われる場合は、Cloud Profilerで継続的に収集されたプロファイルデータから、どの関数がリソースを消費しているかを特定します。
                    </p>
                    <p>
                        Cloud Monitoringでは、しきい値ベースのアラートに加えて、実際のユーザートラフィックがない時間帯でも定期的にエンドポイントへリクエストを送る<strong>合成監視</strong>（synthetic monitoring）を使い、サービスが実際に外部から到達可能かを継続的に検証することもできます。
                    </p>

                    <div className="practice-label">ベストプラクティス</div>
                    <ul>
                        <li>
                            <strong>異常検知→トレースでの絞り込み→ログでの原因特定という順序を意識する</strong>: メトリクス・トレース・ログはそれぞれ粒度が異なるため、粗い情報から細かい情報へと段階的に絞り込むのが効率的です。
                        </li>
                        <li>
                            <strong>SLI/SLOに基づいたアラートを設計する</strong>: すべてのメトリクス変動に反応するのではなく、ユーザー体験に直結する指標（可用性、レイテンシなど）に基づいてアラートしきい値を設計します。
                        </li>
                        <li>
                            <strong>ダッシュボードをサービス単位で整理する</strong>: サービスごと、あるいはクリティカルユーザージャーニーごとにダッシュボードを分けることで、障害対応時に必要な情報へすぐアクセスできるようにします。
                        </li>
                        <li>
                            <strong>Cloud ProfilerはCPU/メモリのコスト最適化にも活用する</strong>: 障害対応時だけでなく、平常時からプロファイルデータを確認し、無駄なリソース消費を継続的に削減します。
                        </li>
                        <li>
                            <strong>BigQueryと連携したLog Analyticsを活用する</strong>: 単純なフィルタリングでは見えにくい傾向分析やパターン検出には、Cloud LoggingのLog Analytics機能でSQLベースの分析を行います。
                        </li>
                    </ul>

                    <h4>出典</h4>
                    <div className="ref-grid">
                        <div className="ref-card">
                            <div className="num">1</div>
                            <div className="txt">
                                <a href="https://cloud.google.com/products/observability">
                                    Observability: cloud monitoring and logging | Google Cloud
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">2</div>
                            <div className="txt">
                                <a href="https://docs.cloud.google.com/stackdriver/docs">
                                    Observability in Google Cloud | Google Cloud Observability
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">3</div>
                            <div className="txt">
                                <a href="https://cloud.google.com/discover/what-is-observability">
                                    What Is Observability? | Google Cloud
                                </a>
                            </div>
                        </div>
                    </div>

                    <hr />

                    <h3 id="433-error-reportingによるアプリケーション問題の管理" tabIndex={-1}>
                        4.3.3 Error Reportingによるアプリケーション問題の管理
                    </h3>
                    <h4>概要</h4>
                    <p>
                        <strong>Error Reporting</strong>は、Cloud Loggingに書き込まれたログエントリを解析し、アプリケーションのクラッシュ/例外を自動的に検出・グルーピングして表示するサービスです。大量のログの中から「新しく発生したエラー」や「発生頻度の高いエラー」を効率よく見つけ出すために使います。
                    </p>

                    <h4>ステップバイステップの流れ</h4>

                    <Diagram
                        id="diag-13"
                        label="Error Reporting のエラー集約と通知フロー"
                    />

                    <p>
                        Error Reportingへエラーを送る方法は大きく2つあります。1つは、言語ごとのクライアントライブラリまたは自動収集機能を使い、正しいフォーマットの例外情報をCloud Loggingへ直接書き込む方法です。たとえばCloud Run上で標準エラー出力（stderr）に書き出された例外は自動的にCloud Loggingへ送られ、Error Reportingがそれを解析します。もう1つは、Error Reporting APIの<code>events.report</code>メソッドを直接呼び出し、<code>ReportedErrorEvent</code>オブジェクトとしてエラーを明示的に送信する方法です。
                    </p>
                    <p>
                        Error Reportingは類似したスタックトレースを持つエラーを自動的に<strong>エラーグループ</strong>としてまとめ、同じ原因によるエラーが1件ずつ個別に表示されて埋もれてしまう事態を防ぎます。新しいエラーグループが検出されると通知を送ることもでき、これまで発生していなかった種類の障害にいち早く気づく仕組みとして機能します。また、Cloud Run・GKE・App Engineなど、多くのGoogle Cloudサービス自体が生成するエラー（たとえばコンテナインスタンス数の上限到達など）についても、<strong>Service Errors</strong>機能により自動的に検出・分類されます。
                    </p>

                    <div className="practice-label">ベストプラクティス</div>
                    <ul>
                        <li>
                            <strong>標準的な例外フォーマットで出力する</strong>: 各言語向けにドキュメント化された例外情報のフォーマット（スタックトレースを含む）に従ってログへ書き込むことで、Error Reportingによる自動検出の精度が上がります。
                        </li>
                        <li>
                            <strong>新規エラーグループの通知を運用フローに組み込む</strong>: 新しい種類のエラーが発生した際に、担当チームへ確実に通知が届くよう設定し、検知から対応までのリードタイムを短縮します。
                        </li>
                        <li>
                            <strong>サービスエラー（Service Errors）も併せて確認する</strong>: アプリケーションコード起因のエラーだけでなく、利用しているGoogle Cloudサービス自体が記録するエラーもError Reportingで一元的に確認します。
                        </li>
                        <li>
                            <strong>Error Reporting APIの認証方式を正しく選ぶ</strong>: projects.events.reportはOAuthトークンとAPIキーのどちらでも呼び出せますが、APIキーは呼び出し元を識別するだけで権限を制御できないため、IAMでスコープを絞れるサービスアカウントのOAuth認証を推奨します。
                        </li>
                        <li>
                            <strong>CMEK（顧客管理暗号鍵）とError Reportingの制約を理解する</strong>: CMEKを有効化したログバケットに保存されたログエントリはError Reportingで解析できないため、要件に応じて設計時に考慮します。
                        </li>
                    </ul>

                    <h4>出典</h4>
                    <div className="ref-grid">
                        <div className="ref-card">
                            <div className="num">1</div>
                            <div className="txt">
                                <a href="https://cloud.google.com/error-reporting/docs/">
                                    Error Reporting documentation | Google Cloud
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">2</div>
                            <div className="txt">
                                <a href="https://docs.cloud.google.com/error-reporting/docs/service-errors">
                                    Manage service error events | Error Reporting
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">3</div>
                            <div className="txt">
                                <a href="https://docs.cloud.google.com/error-reporting/docs/setup">
                                    Collect error data by using Error Reporting
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">4</div>
                            <div className="txt">
                                <a href="https://docs.cloud.google.com/error-reporting/reference">
                                    Overview | Error Reporting
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">5</div>
                            <div className="txt">
                                <a href="https://docs.cloud.google.com/error-reporting/docs/grouping-errors">
                                    Error Reporting overview
                                </a>
                            </div>
                        </div>
                    </div>

                    <hr />

                    <h3 id="434-トレースidを使ったサービス間のトレーススパンの相関" tabIndex={-1}>
                        4.3.4 トレースIDを使ったサービス間のトレーススパンの相関
                    </h3>
                    <h4>概要</h4>
                    <p>
                        マイクロサービスアーキテクチャでは、1つのユーザーリクエストが複数のサービスをまたいで処理されます。このとき、各サービスが個別に出力するログを後から手作業で結び付けるのは非常に困難です。<strong>トレースID</strong>を各サービス間で一貫して伝播させ、Cloud TraceのスパンとCloud Loggingのログエントリを結び付けることで、分散システム全体を横断した「1つのリクエストの物語」として問題を追跡できるようになります。
                    </p>

                    <h4>ステップバイステップの流れ</h4>

                    <Diagram
                        id="diag-14"
                        label="分散トレーシングにおけるトレースIDの伝播とログ相関シーケンス"
                    />

                    <p>
                        技術的には、Cloud LoggingのLogEntryオブジェクトが持つ<code>trace</code>フィールドと<code>spanId</code>フィールドがこの相関の鍵となります。<code>trace</code>フィールドにはCloud Traceのリソース名形式である<code>projects/PROJECT_ID/traces/TRACE_ID</code>を設定し、<code>spanId</code>フィールドには16文字の16進数エンコードされたスパンIDを設定します。OpenTelemetryでアプリケーションを計装し、アクティブなスパンのコンテキスト内でログを出力している場合、多くのGoogle Cloudのロギングクライアントライブラリはこれらのフィールドを<strong>自動的に</strong>設定します。HTTPリクエストが介在する場合は、W3Cの<code>traceparent</code>ヘッダーや<code>X-Cloud-Trace-Context</code>ヘッダーの値からトレースフィールドを設定することも可能です。ただし、この自動設定はすべての言語・クライアントライブラリで一律に保証されているわけではありません。アクティブなスパン・<code>traceparent</code>・<code>X-Cloud-Trace-Context</code>のいずれから設定されるか、また自動設定に対応しているかどうかは実装によって異なるため、利用する言語別のクライアントライブラリのドキュメントで対応状況を確認してください。
                    </p>
                    <p>
                        なお、Cloud Trace連携(トレースとログの相互リンク)では、クライアントライブラリが<code>X-Cloud-Trace-Context</code>や<code>traceparent</code>から取り出した<code>TRACE_ID</code>単体を書き込むケースもありますが、後述するLogs Explorerの「Correlate by」による親子ログ相関は<code>projects/PROJECT_ID/traces/TRACE_ID</code>形式を要求します。そのため、相関を前提にする場合はリソース名形式で統一してください。
                    </p>
                    <p>
                        正しく相関が設定されていれば、Cloud Trace側でスパンの詳細を表示すると関連するログエントリへのリンクが表示されます。逆にLogs Explorer側では、「クエリ結果（Query results）」ペインの「Correlate by」メニューで<strong>親ログの<code>logName</code>（ログ名）を選ぶ</strong>ことで、その親ログエントリに関連する子ログエントリをまとめて表示できます。「Correlate by」はトレースを選ぶメニューではなく、相関の基準として親となるログ名を指定するものである点に注意してください。
                    </p>
                    <p>
                        この相関が成立するには、次の3つの条件をすべて満たす必要があります。第一に、親ログと子ログの<code>trace</code>フィールドが、いずれも<code>projects/PROJECT_ID/traces/TRACE_ID</code>形式で同一の値に設定されていること（<code>TRACE_ID</code>単体の値ではこの相関は成立しません）。第二に、親ログと子ログの<code>logName</code>が<strong>異なる</strong>こと（同一ログ名のエントリ同士は親子として相関されません）。第三に、親ログのタイムスタンプが子ログのタイムスタンプ<strong>以前</strong>であること（親のほうが後の時刻になっていると相関されません）。
                    </p>

                    <div className="practice-label">ベストプラクティス</div>
                    <ul>
                        <li>
                            <strong>サービス境界をまたいでトレースコンテキストを伝播させる</strong>: HTTPヘッダー（<code>traceparent</code>など）やメッセージングのメタデータを使い、トレースIDが呼び出し先のサービスへ確実に引き継がれるようにします。
                        </li>
                        <li>
                            <strong>手動設定よりも自動計装を優先する</strong>: OpenTelemetryやGoogle Cloudのクライアントライブラリが提供する自動的なトレース/ログの関連付け機能を使い、フィールドの手動設定によるフォーマットミスを避けます。
                        </li>
                        <li>
                            <strong>trace/spanIdのフォーマット要件を守る</strong>: トレースIDは32文字の小文字16進数、スパンIDは16文字の小文字16進数という形式要件があり、これに従わないと相関が機能しません。
                        </li>
                        <li>
                            <strong>ログとスパンのタイムスタンプの整合性を保つ</strong>: ログのタイムスタンプが対応するスパンの時間範囲外にあると、相関が正しく機能しない場合があるため、時刻同期（NTPなど）を適切に構成します。
                        </li>
                        <li>
                            <strong>サンプリングされなかったトレースも考慮する</strong>: トレースサンプリングを使っている場合、ログエントリは作成されてもトレース自体は記録されないケースがあるため、<code>traceSampled</code>フィールドで状態を明示します。
                        </li>
                    </ul>

                    <h4>出典</h4>
                    <div className="ref-grid">
                        <div className="ref-card">
                            <div className="num">1</div>
                            <div className="txt">
                                <a href="https://docs.cloud.google.com/trace/docs/trace-log-integration">
                                    Link log entries with traces | Cloud Trace
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">2</div>
                            <div className="txt">
                                <a href="https://docs.cloud.google.com/logging/docs/view/correlate-logs">
                                    Correlate log entries | Cloud Logging
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">3</div>
                            <div className="txt">
                                <a href="https://docs.cloud.google.com/trace/docs/traces-and-spans">
                                    Traces and spans
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">4</div>
                            <div className="txt">
                                <a href="https://docs.cloud.google.com/trace/docs/finding-traces">
                                    Find and explore traces | Cloud Trace
                                </a>
                            </div>
                        </div>
                    </div>

                    <hr />

                    <h3 id="435-ai支援オブザーバビリティの活用" tabIndex={-1}>
                        4.3.5 AI支援オブザーバビリティの活用
                    </h3>
                    <h4>概要</h4>
                    <p>
                        従来のトラブルシューティングは、担当エンジニアが自らダッシュボード・ログ・トレースを横断的に確認し、仮説を立てて検証するという手作業が中心でした。試験範囲としての「AI支援オブザーバビリティ」は、こうしたプロセスをAIが支援するという<strong>考え方</strong>（テレメトリの相関分析、根本原因候補の提示、人間による承認）を理解しているかを問うものであり、特定の製品機能の操作手順を問うものではありません。
                    </p>
                    <p>
                        その具体例が<strong>Gemini Cloud Assist</strong>の<strong>Investigations</strong>（調査）機能です。ただしInvestigationsは<strong>2026年4月10日をもって一般利用向けには非推奨（deprecated）</strong>となっており、誰でも使える安定機能ではありません。現在、調査の<strong>作成・実行・編集</strong>を行うには<strong>Premium Support契約</strong>、またはGoogle Cloudのアカウントチーム経由でのアクセスが必要です。なお、閲覧できるのは<strong>2026年4月10日より前に実行された調査の結果のみ</strong>で、それらについては引き続き参照可能です。提供状況・UI・利用条件は変わりうるため、以下は「AI支援オブザーバビリティの考え方を示す実装例」として読み、実際の利用可否は必ず公式ドキュメントとリリースノートで確認してください。
                    </p>

                    <h4>ステップバイステップの流れ</h4>

                    <Diagram
                        id="diag-15"
                        label="AI支援オブザーバビリティの調査フロー"
                    />

                    <p>
                        Investigationsが利用可能な環境では、GKEのアラート付きワークロード、失敗したバッチジョブ、失敗したAirflowタスクなど、対応するプロダクトページから直接起動できるほか、コンソール右上のInvestigationsアイコンやモバイルアプリからも起動できるとされています。前述のとおり調査の作成・実行・編集にはPremium Supportまたはアカウントチーム経由のアクセスが必要なため、いずれも誰でも使える安定提供機能として設計に織り込むべきものではありません。
                    </p>
                    <p>
                        設計・運用上重要なのは、<strong>起動経路によってデータへアクセスするプリンシパルが異なる</strong>点です。ユーザーがコンソール等から手動で起動した調査は、<strong>その調査を実行したエンドユーザー自身のID</strong>でデータにアクセスします。したがって必要な閲覧ロールは各ユーザー（またはグループ）へ付与し、監査ログにもそのユーザーがプリンシパルとして記録されます。一方、アラートを起点にバックグラウンド監視エージェントが自動的に開始する調査は、ユーザーが介在しないため、<strong>プロジェクトごとに割り当てられたエージェント用のID</strong>でデータにアクセスします。この経路を使う場合は、そのエージェントIDに対して別途、必要な閲覧ロールを付与する必要があり、監査ログのプリンシパルもエージェントIDになります。両者は付与先も監査上の主体も別物であるため、「実行ユーザーの権限範囲」だけを前提に権限設計を行うと、自動調査が動かない、あるいは監査証跡を追えないといった問題が生じます。
                    </p>
                    <p>
                        いずれの経路でも、調査は<strong>読み取りと分析に専念する</strong>設計です。アクセス範囲は付与されたIAM権限の範囲に限定され、<strong>データを変更する目的では使用されません</strong>。実際の是正措置（ロールバックや設定変更など）は人間の明示的な承認を経て実行されます。
                    </p>
                    <p>
                        より発展的な機能として、Database Observability and Onboarding AgentのようなGemini Cloud Assist上のエージェントは、Database Center・Cloud Monitoring・Cloud Logging・Cloud Traceなど複数のデータソースを横断的に相関させ、「過去7日間で最もCPUを消費したデータベースはどれか」といった自然言語での質問にも回答できます。また、Developer Connect Insights（DCI）という仕組みを通じて、パフォーマンスの変化を特定のコードコミットやデプロイと結び付け、単なるログのパターンマッチングを超えた根本原因分析を行うことも可能です。
                    </p>

                    <div className="practice-label">ベストプラクティス</div>
                    <ul>
                        <li>
                            <strong>AIの提示内容は必ず裏付けデータで検証する</strong>: Observationsには元データへのリンクが付与されているため、提示された洞察を鵜呑みにせず、リンク先のログ・メトリクス・トレースで裏付けを確認する習慣をつけます。
                        </li>
                        <li>
                            <strong>起動経路ごとにプリンシパルを分けて権限をスコープする</strong>: 手動調査はエンドユーザーのID、自動調査はプロジェクト固有のエージェントIDでデータにアクセスします。両方の経路を使う場合は、それぞれのプリンシパルに対して個別に必要最小限の閲覧ロールを付与し、過度に広い権限を持つアカウントで調査を行わないようにします。
                        </li>
                        <li>
                            <strong>データレジデンシー要件を確認する</strong>: 調査によって生成される情報はどのGoogle Cloudデータセンターにも保存され得るため、データの所在地やジュリスディクション（法域）に関する規制対象データについては、調査機能の利用可否を事前に確認します。
                        </li>
                        <li>
                            <strong>人間によるレビューを省略しない</strong>: Geminiが提示する根本原因や対処案は候補であり、実際の是正アクション（デプロイのロールバックなど）は必ず人間が内容を理解したうえで実行します。
                        </li>
                        <li>
                            <strong>既存の手動トラブルシューティングスキルを維持する</strong>: AI支援はMTTR（平均修復時間）短縮に有効ですが、根本的なログ・メトリクス・トレースの読み方という基礎スキルは引き続き重要です。
                        </li>
                    </ul>

                    <h4>出典</h4>
                    <div className="ref-grid">
                        <div className="ref-card">
                            <div className="num">1</div>
                            <div className="txt">
                                <a href="https://docs.cloud.google.com/cloud-assist/investigations">
                                    Troubleshoot issues with Gemini Cloud Assist investigations
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">2</div>
                            <div className="txt">
                                <a href="https://cloud.google.com/blog/products/application-development/an-application-centric-ai-powered-cloud">
                                    An application-centric, AI-powered cloud | Google Cloud Blog
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">3</div>
                            <div className="txt">
                                <a href="https://cloud.google.com/products/gemini/cloud-assist">
                                    Gemini Cloud Assist: AI-assisted cloud operations and management
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">4</div>
                            <div className="txt">
                                <a href="https://cloud.google.com/blog/products/databases/deep-dive-on-new-ai-powered-database-agents">
                                    Deep dive on new AI-powered database agents | Google Cloud Blog
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">5</div>
                            <div className="txt">
                                <a href="https://docs.cloud.google.com/cloud-assist/overview">
                                    Gemini for Google Cloud overview | Gemini Cloud Assist
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">6</div>
                            <div className="txt">
                                <a href="https://docs.cloud.google.com/cloud-assist/deprecations/features">
                                    Feature deprecations | Gemini Cloud Assist
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">7</div>
                            <div className="txt">
                                <a href="https://docs.cloud.google.com/cloud-assist/release-notes">
                                    Gemini Cloud Assist release notes
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">8</div>
                            <div className="txt">
                                <a href="https://docs.cloud.google.com/iam/docs/agent-identity-overview">
                                    Agent Identity overview | IAM
                                </a>
                            </div>
                        </div>
                    </div>

                    <hr />

                    <h2 id="section-4-まとめ-試験対策チェックリスト" tabIndex={-1}>
                        Section 4 まとめ: 試験対策チェックリスト
                    </h2>
                    <p>
                        Section 4全体を振り返るためのチェックリストです。試験直前の最終確認や、学習の進捗管理にご活用ください。
                    </p>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">#</th>
                                    <th scope="col">出題項目</th>
                                    <th scope="col">中心となるサービス/概念</th>
                                    <th scope="col">一言で覚えるポイント</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>4.1.1</td>
                                    <td>データストアへの接続管理</td>
                                    <td>
                                        Cloud SQL Language Connectors / Auth Proxy、Firestoreサーバークライアントライブラリ、Cloud Storageクライアント
                                    </td>
                                    <td>コネクション/クライアントは「使い回す」のが大原則</td>
                                </tr>
                                <tr className="even">
                                    <td>4.1.2</td>
                                    <td>データの読み書き</td>
                                    <td>
                                        パラメータ化クエリ、Firestoreトランザクション/バッチ書き込み、レジューマブルアップロード
                                    </td>
                                    <td>複数リソースにまたがる更新はトランザクション/バッチで</td>
                                </tr>
                                <tr className="odd">
                                    <td>4.1.3</td>
                                    <td>メッセージングでの発行/消費</td>
                                    <td>Pub/Subのフロー制御、ackDeadline、at-least-once配信</td>
                                    <td>消費側は「重複配信が発生し得る」前提で冪等に設計する</td>
                                </tr>
                                <tr className="even">
                                    <td>4.2.1</td>
                                    <td>サービスの有効化</td>
                                    <td>
                                        <code>gcloud services enable</code>、API有効化とIAM権限は別物
                                    </td>
                                    <td>有効化だけでは呼べない、権限も別途必要</td>
                                </tr>
                                <tr className="odd">
                                    <td>4.2.2</td>
                                    <td>API呼び出しオプションと5つの考慮事項</td>
                                    <td>
                                        Client Libraries/REST/gRPC/API Explorer、バッチ/部分レスポンス/ページネーション/ETagキャッシュ/指数バックオフ
                                    </td>
                                    <td>指数バックオフには必ずジッターを加える</td>
                                </tr>
                                <tr className="even">
                                    <td>4.2.3</td>
                                    <td>サービスアカウントでの認証</td>
                                    <td>ADCの探索順序、WIF</td>
                                    <td>本番はアタッチ型サービスアカウント、キー配布は避ける</td>
                                </tr>
                                <tr className="odd">
                                    <td>4.3.1</td>
                                    <td>インスツルメンテーション</td>
                                    <td>OpenTelemetry、構造化ログ</td>
                                    <td>ベンダー中立なフレームワークで計装するのが推奨</td>
                                </tr>
                                <tr className="even">
                                    <td>4.3.2</td>
                                    <td>Observabilityでの問題特定/解決</td>
                                    <td>Cloud Logging/Monitoring/Trace/Profiler</td>
                                    <td>異常検知→トレースで絞込み→ログで原因特定の順序</td>
                                </tr>
                                <tr className="odd">
                                    <td>4.3.3</td>
                                    <td>Error Reportingでの障害管理</td>
                                    <td>エラーグループ、Service Errors</td>
                                    <td>類似スタックトレースを自動集約し新規発生を通知</td>
                                </tr>
                                <tr className="even">
                                    <td>4.3.4</td>
                                    <td>トレースIDによるスパン相関</td>
                                    <td>LogEntryの<code>trace</code>/<code>spanId</code>フィールド</td>
                                    <td>サービス間でトレースコンテキストを伝播させる</td>
                                </tr>
                                <tr className="odd">
                                    <td>4.3.5</td>
                                    <td>AI支援オブザーバビリティ</td>
                                    <td>Gemini Cloud Assist Investigations</td>
                                    <td>読み取り専用の分析、是正実行には人間の承認が必要</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <hr />

                    <h2 id="参考文献" tabIndex={-1}>参考文献</h2>
                    <p>
                        本ガイドの記述は、以下の公式ドキュメントおよび一次情報源に基づいています（2026年8月時点の内容を反映）。
                    </p>
                    <div className="ref-grid" id="referenceGrid">
                        <div className="ref-card" id="ref1">
                            <div className="num">1</div>
                            <div className="txt">
                                <strong>データストア接続・読み書き（4.1関連）</strong><br />
                                Manage database connections | Cloud SQL for MySQL<br />
                                <a href="https://cloud.google.com/sql/docs/mysql/manage-connections">
                                    https://cloud.google.com/sql/docs/mysql/manage-connections
                                </a><br />
                                Manage database connections | Cloud SQL for PostgreSQL<br />
                                <a href="https://docs.cloud.google.com/sql/docs/postgres/manage-connections">
                                    https://docs.cloud.google.com/sql/docs/postgres/manage-connections
                                </a><br />
                                Cloud SQL Language Connectors overview | Cloud SQL for MySQL<br />
                                <a href="https://cloud.google.com/sql/docs/mysql/language-connectors">
                                    https://cloud.google.com/sql/docs/mysql/language-connectors
                                </a><br />
                                Connect using Cloud SQL Language Connectors | Cloud SQL for MySQL<br />
                                <a href="https://cloud.google.com/sql/docs/mysql/connect-connectors">
                                    https://cloud.google.com/sql/docs/mysql/connect-connectors
                                </a><br />
                                About the Cloud SQL Auth Proxy | Cloud SQL for MySQL<br />
                                <a href="https://cloud.google.com/sql/docs/mysql/sql-proxy">
                                    https://cloud.google.com/sql/docs/mysql/sql-proxy
                                </a><br />
                                GitHub - GoogleCloudPlatform/cloud-sql-proxy<br />
                                <a href="https://github.com/GoogleCloudPlatform/cloud-sql-proxy">
                                    https://github.com/GoogleCloudPlatform/cloud-sql-proxy
                                </a><br />
                                Firestore client libraries | Firestore in Native mode<br />
                                <a href="https://cloud.google.com/firestore/docs/reference/libraries">
                                    https://cloud.google.com/firestore/docs/reference/libraries
                                </a><br />
                                Quickstart: Create a Firestore database by using a server client library<br />
                                <a href="https://docs.cloud.google.com/firestore/native/docs/create-database-server-client-library">
                                    https://docs.cloud.google.com/firestore/native/docs/create-database-server-client-library
                                </a><br />
                                GitHub - googleapis/nodejs-firestore<br />
                                <a href="https://github.com/googleapis/nodejs-firestore">
                                    https://github.com/googleapis/nodejs-firestore
                                </a><br />
                                Cloud Storage overview<br />
                                <a href="https://cloud.google.com/storage/docs/introduction">
                                    https://cloud.google.com/storage/docs/introduction
                                </a><br />
                                Cloud Storage client libraries<br />
                                <a href="https://cloud.google.com/storage/docs/reference/libraries">
                                    https://cloud.google.com/storage/docs/reference/libraries
                                </a><br />
                                Python Client for Cloud Storage<br />
                                <a href="https://docs.cloud.google.com/python/docs/reference/storage/latest">
                                    https://docs.cloud.google.com/python/docs/reference/storage/latest
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref2">
                            <div className="num">2</div>
                            <div className="txt">
                                <strong>メッセージング統合（4.1.3関連）</strong><br />
                                Overview of the Pub/Sub service<br />
                                <a href="https://cloud.google.com/pubsub/docs/pubsub-basics">
                                    https://cloud.google.com/pubsub/docs/pubsub-basics
                                </a><br />
                                Best practices to publish to a Pub/Sub topic<br />
                                <a href="https://cloud.google.com/pubsub/docs/publish-best-practices">
                                    https://cloud.google.com/pubsub/docs/publish-best-practices
                                </a><br />
                                Best practices to subscribe to a Pub/Sub topic<br />
                                <a href="https://cloud.google.com/pubsub/docs/subscribe-best-practices">
                                    https://cloud.google.com/pubsub/docs/subscribe-best-practices
                                </a><br />
                                Pub/Sub: Introduction to reliability<br />
                                <a href="https://cloud.google.com/pubsub/docs/reliability-intro">
                                    https://cloud.google.com/pubsub/docs/reliability-intro
                                </a><br />
                                Flow control | Pub/Sub<br />
                                <a href="https://cloud.google.com/pubsub/docs/flow-control-messages">
                                    https://cloud.google.com/pubsub/docs/flow-control-messages
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref3">
                            <div className="num">3</div>
                            <div className="txt">
                                <strong>API利用・呼び出し方式（4.2関連）</strong><br />
                                gcloud services enable | Google Cloud SDK<br />
                                <a href="https://cloud.google.com/sdk/gcloud/reference/services/enable">
                                    https://cloud.google.com/sdk/gcloud/reference/services/enable
                                </a><br />
                                Enable and disable services | Service Usage<br />
                                <a href="https://cloud.google.com/service-usage/docs/enable-disable">
                                    https://cloud.google.com/service-usage/docs/enable-disable
                                </a><br />
                                Enabled services | Service Usage<br />
                                <a href="https://docs.cloud.google.com/service-usage/docs/enabled-service">
                                    https://docs.cloud.google.com/service-usage/docs/enabled-service
                                </a><br />
                                Getting started | Cloud APIs<br />
                                <a href="https://cloud.google.com/apis/docs/getting-started">
                                    https://cloud.google.com/apis/docs/getting-started
                                </a><br />
                                Client libraries and Cloud APIs explained<br />
                                <a href="https://cloud.google.com/apis/docs/client-libraries-explained">
                                    https://cloud.google.com/apis/docs/client-libraries-explained
                                </a><br />
                                gRPC vs REST: Understanding gRPC, OpenAPI and REST | Google Cloud Blog<br />
                                <a href="https://cloud.google.com/blog/products/api-management/understanding-grpc-openapi-and-rest-and-when-to-use-them">
                                    https://cloud.google.com/blog/products/api-management/understanding-grpc-openapi-and-rest-and-when-to-use-them
                                </a><br />
                                AIP-158: Pagination<br />
                                <a href="https://google.aip.dev/158">https://google.aip.dev/158</a><br />
                                Performance Tips | google-api-python-client<br />
                                <a href="https://googleapis.github.io/google-api-python-client/docs/performance.html">
                                    https://googleapis.github.io/google-api-python-client/docs/performance.html
                                </a><br />
                                Retry strategy | Cloud Storage<br />
                                <a href="https://cloud.google.com/storage/docs/retry-strategy">
                                    https://cloud.google.com/storage/docs/retry-strategy
                                </a><br />
                                Exponential backoff | Wikipedia<br />
                                <a href="https://en.wikipedia.org/wiki/Exponential_backoff">
                                    https://en.wikipedia.org/wiki/Exponential_backoff
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref4">
                            <div className="num">4</div>
                            <div className="txt">
                                <strong>認証・サービスアカウント（4.2.3関連）</strong><br />
                                How Application Default Credentials works | Authentication<br />
                                <a href="https://docs.cloud.google.com/docs/authentication/application-default-credentials">
                                    https://docs.cloud.google.com/docs/authentication/application-default-credentials
                                </a><br />
                                Service account credentials | Identity and Access Management (IAM)<br />
                                <a href="https://docs.cloud.google.com/iam/docs/service-account-creds">
                                    https://docs.cloud.google.com/iam/docs/service-account-creds
                                </a><br />
                                Authenticate workloads to Google Cloud APIs using service accounts | Compute Engine<br />
                                <a href="https://docs.cloud.google.com/compute/docs/access/authenticate-workloads">
                                    https://docs.cloud.google.com/compute/docs/access/authenticate-workloads
                                </a><br />
                                gcloud auth application-default | Google Cloud SDK<br />
                                <a href="https://cloud.google.com/sdk/gcloud/reference/auth/application-default">
                                    https://cloud.google.com/sdk/gcloud/reference/auth/application-default
                                </a><br />
                                Authentication for Google Cloud APIs and services<br />
                                <a href="https://docs.cloud.google.com/docs/authentication#service-accounts">
                                    https://docs.cloud.google.com/docs/authentication#service-accounts
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref5">
                            <div className="num">5</div>
                            <div className="txt">
                                <strong>オブザーバビリティ・トラブルシューティング（4.3関連）</strong><br />
                                Observability in Google Cloud | Google Cloud Observability<br />
                                <a href="https://docs.cloud.google.com/stackdriver/docs">
                                    https://docs.cloud.google.com/stackdriver/docs
                                </a><br />
                                Observability: cloud monitoring and logging | Google Cloud<br />
                                <a href="https://cloud.google.com/products/observability">
                                    https://cloud.google.com/products/observability
                                </a><br />
                                Instrumentation and observability | Google Cloud Observability<br />
                                <a href="https://docs.cloud.google.com/stackdriver/docs/instrumentation/overview">
                                    https://docs.cloud.google.com/stackdriver/docs/instrumentation/overview
                                </a><br />
                                What Is Observability? | Google Cloud<br />
                                <a href="https://cloud.google.com/discover/what-is-observability">
                                    https://cloud.google.com/discover/what-is-observability
                                </a><br />
                                Observability and monitoring<br />
                                <a href="https://docs.cloud.google.com/docs/observability">
                                    https://docs.cloud.google.com/docs/observability
                                </a><br />
                                Error Reporting documentation | Google Cloud<br />
                                <a href="https://cloud.google.com/error-reporting/docs/">
                                    https://cloud.google.com/error-reporting/docs/
                                </a><br />
                                Manage service error events | Error Reporting<br />
                                <a href="https://docs.cloud.google.com/error-reporting/docs/service-errors">
                                    https://docs.cloud.google.com/error-reporting/docs/service-errors
                                </a><br />
                                Collect error data by using Error Reporting<br />
                                <a href="https://docs.cloud.google.com/error-reporting/docs/setup">
                                    https://docs.cloud.google.com/error-reporting/docs/setup
                                </a><br />
                                Overview | Error Reporting<br />
                                <a href="https://docs.cloud.google.com/error-reporting/reference">
                                    https://docs.cloud.google.com/error-reporting/reference
                                </a><br />
                                Error Reporting overview<br />
                                <a href="https://docs.cloud.google.com/error-reporting/docs/grouping-errors">
                                    https://docs.cloud.google.com/error-reporting/docs/grouping-errors
                                </a><br />
                                Link log entries with traces | Cloud Trace<br />
                                <a href="https://docs.cloud.google.com/trace/docs/trace-log-integration">
                                    https://docs.cloud.google.com/trace/docs/trace-log-integration
                                </a><br />
                                Correlate log entries | Cloud Logging<br />
                                <a href="https://docs.cloud.google.com/logging/docs/view/correlate-logs">
                                    https://docs.cloud.google.com/logging/docs/view/correlate-logs
                                </a><br />
                                Traces and spans<br />
                                <a href="https://docs.cloud.google.com/trace/docs/traces-and-spans">
                                    https://docs.cloud.google.com/trace/docs/traces-and-spans
                                </a><br />
                                Find and explore traces | Cloud Trace<br />
                                <a href="https://docs.cloud.google.com/trace/docs/finding-traces">
                                    https://docs.cloud.google.com/trace/docs/finding-traces
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref6">
                            <div className="num">6</div>
                            <div className="txt">
                                <strong>AI支援オブザーバビリティ（4.3.5関連）</strong><br />
                                Troubleshoot issues with Gemini Cloud Assist investigations<br />
                                <a href="https://docs.cloud.google.com/cloud-assist/investigations">
                                    https://docs.cloud.google.com/cloud-assist/investigations
                                </a><br />
                                An application-centric, AI-powered cloud | Google Cloud Blog<br />
                                <a href="https://cloud.google.com/blog/products/application-development/an-application-centric-ai-powered-cloud">
                                    https://cloud.google.com/blog/products/application-development/an-application-centric-ai-powered-cloud
                                </a><br />
                                Gemini Cloud Assist: AI-assisted cloud operations and management<br />
                                <a href="https://cloud.google.com/products/gemini/cloud-assist">
                                    https://cloud.google.com/products/gemini/cloud-assist
                                </a><br />
                                Deep dive on new AI-powered database agents | Google Cloud Blog<br />
                                <a href="https://cloud.google.com/blog/products/databases/deep-dive-on-new-ai-powered-database-agents">
                                    https://cloud.google.com/blog/products/databases/deep-dive-on-new-ai-powered-database-agents
                                </a><br />
                                Gemini for Google Cloud overview | Gemini Cloud Assist<br />
                                <a href="https://docs.cloud.google.com/cloud-assist/overview">
                                    https://docs.cloud.google.com/cloud-assist/overview
                                </a><br />
                                Feature deprecations | Gemini Cloud Assist<br />
                                <a href="https://docs.cloud.google.com/cloud-assist/deprecations/features">
                                    https://docs.cloud.google.com/cloud-assist/deprecations/features
                                </a><br />
                                Gemini Cloud Assist release notes<br />
                                <a href="https://docs.cloud.google.com/cloud-assist/release-notes">
                                    https://docs.cloud.google.com/cloud-assist/release-notes
                                </a><br />
                                Agent Identity overview | IAM<br />
                                <a href="https://docs.cloud.google.com/iam/docs/agent-identity-overview">
                                    https://docs.cloud.google.com/iam/docs/agent-identity-overview
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref7">
                            <div className="num">7</div>
                            <div className="txt">
                                <strong>試験範囲の一次情報源</strong><br />
                                Professional Cloud Developer Certification | Learn | Google Cloud<br />
                                <a href="https://cloud.google.com/learn/certification/cloud-developer">
                                    https://cloud.google.com/learn/certification/cloud-developer
                                </a><br />
                                Professional Cloud Developer Exam Guide (PDF)<br />
                                <a href="https://services.google.com/fh/files/misc/professional_cloud_developer_exam_guide_english.pdf">
                                    https://services.google.com/fh/files/misc/professional_cloud_developer_exam_guide_english.pdf
                                </a>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
