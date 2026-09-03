'use client';

import { memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { NavBar } from './NavBar';
import { DIAGRAMS, type DiagramId } from './constants';

const Diagram = memo(function Diagram({ id, label }: { id: DiagramId; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap">
            <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale />
        </div>
    );
});

/**
 * Professional Cloud Developer (PCD) Section 2 完全対策ガイドコンポーネント
 */
export function Section2Guide() {
    return (
        <div className="pcd-section2-page">
            <div className="layout">
                <NavBar />
                <main className="main">
                    <div className="hero">
                        <div className="kicker">Professional Cloud Developer &middot; Section 2</div>
                        <h1>
                            Google Cloud Professional Cloud Developer 認定試験ガイド
                            セクション2「アプリケーションのビルドとテスト」
                        </h1>
                        <div className="meta-row">
                            <span className="pill">
                                配点 <strong>約26%</strong>
                            </span>
                            <span className="pill">
                                対象 <strong>初学者向け</strong>
                            </span>
                            <span className="pill">
                                図解 <strong>Mermaid 8点</strong>
                            </span>
                            <span className="pill">
                                参考文献 <strong>4件</strong>
                            </span>
                        </div>
                    </div>

                    <h2 id="セクション2の全体像">セクション2の全体像</h2>

                    <p>
                        本ガイドは、Google Cloud公式の
                        <a href="https://cloud.google.com/learn/certification/cloud-developer">
                            Professional Cloud Developer認定ページ
                        </a>
                        および公式
                        <a href="https://services.google.com/fh/files/misc/professional_cloud_developer_exam_guide_english.pdf">
                            Exam Guide PDF
                        </a>
                        に基づき、試験の
                        <strong>
                            セクション2「Building and testing applications（アプリケーションのビルドとテスト）」
                        </strong>
                        （配点 約26%）を初学者向けにステップバイステップで解説するものです。
                    </p>

                    <p>
                        Exam Guideでは、セクション2は次の3つの小項目（considerations）で構成されています。
                    </p>

                    <ul>
                        <li>
                            <strong>
                                2.1 開発環境のセットアップ（Setting up your development environment）
                            </strong>
                        </li>
                        <li>
                            <strong>2.2 ビルド（Building）</strong>
                        </li>
                        <li>
                            <strong>2.3 テスト（Testing）</strong>
                        </li>
                    </ul>

                    <p>
                        各項目について、「何を扱うサービス・機能か」「なぜ必要か」「どう使うか」「ベストプラクティスは何か」の順に解説し、根拠となる一次情報（Google Cloud公式ドキュメント）のURLを付記します。
                    </p>

                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        {' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            {' '}
                            <p>
                                本ガイド全体を通して、太字見出しの「ベストプラクティス」ブロックは公式ドキュメントおよび実践的なCI/CDパターンに基づく推奨事項をまとめたものです。実際の設計・実装の際は、必ず参照元の公式ドキュメントで最新の仕様を確認してください。
                            </p>
                        </div>
                    </div>

                    <p>
                        セクション2は、「ローカル開発環境を整える」→「コードをビルドしてコンテナ化する」→「テストで品質と信頼性を担保する」という、ソフトウェア開発のインナーループ（内側の開発サイクル）を扱います。以下の図は、3つの小項目とその代表的なトピックの関係を示しています。
                    </p>

                    <Diagram id="diag-1" label="セクション2の構成と各小項目の関係を示す図" />

                    <p>
                        この3つの小項目は、実際のCI/CDパイプラインの中では独立した工程ではなく、「コミット → ビルド → テスト → デプロイ」という一連の流れの中でシームレスに連携します。本ガイドの最後（
                        <a href="#まとめセクション2の全体マップ">まとめ</a>
                        ）で、この一連の流れを1枚の図にまとめます。
                    </p>

                    <hr />

                    <h2 id="21-開発環境のセットアップ">2.1 開発環境のセットアップ</h2>

                    <p>Exam Guideは2.1として次の3点を挙げています。</p>

                    <ul>
                        <li>
                            Google Cloud CLI（gcloud CLI）を使ったGoogle Cloudサービスのエミュレーションによる、ローカルでのアプリケーション開発・単体テスト
                        </li>
                        <li>
                            Google Cloud Console、Cloud SDK、Cloud Code、Gemini Cloud Assist、Cloud Shell、Cloud Workstationsの利用
                        </li>
                        <li>
                            適切な統合機能（Cloud SDK、AIツール［コーディングアシスタント、MCPサーバー］など）によるIDEの構成
                        </li>
                    </ul>

                    <h3 id="211-gcloud-cliによるgoogle-cloudサービスのローカルエミュレーション">
                        2.1.1 gcloud CLIによるGoogle Cloudサービスのローカルエミュレーション
                    </h3>

                    <h4>これは何か</h4>

                    <p>
                        gcloud CLIには、いくつかのGoogle Cloudサービスのローカルエミュレータが同梱されています。エミュレータは実際のバックエンドサービスの動作をローカルマシン上で模倣するもので、クライアントライブラリから見ると本番サービスとほぼ同じAPIを呼び出せます。gcloud CLIは、ローカルでの開発・テスト・検証のために、Bigtable、Cloud Datastore、Firestore、Spanner、Pub/Subのデータエミュレータを提供しています。
                    </p>

                    <h4>なぜ必要か</h4>

                    <ul>
                        <li>本番のGoogle Cloudリソースを作成せずに、コストゼロでクライアントコードを書ける</li>
                        <li>ネットワークが不安定・オフラインの環境でも開発を継続できる</li>
                        <li>単体テストを高速かつ決定論的（何度実行しても同じ結果になる）に保てる</li>
                        <li>CI/CDパイプライン内でも同じ仕組みをそのまま使い、テストの再現性を担保できる</li>
                    </ul>

                    <h4>提供されているエミュレータの一覧</h4>

                    <p>
                        gcloudのemulatorsコマンドグループでは、Bigtable、Datastore、Firestore、Pub/Sub、Spannerのローカルエミュレータを管理できます。 日本語の技術記事による整理では、GAとして提供されているのはFirestoreとSpannerの2つのみで、Bigtable・Datastore・Pub/Subの3つはgcloud betaコマンドとして提供されている状態です（提供状況は変更される可能性があるため、利用時は必ず最新のドキュメントを確認してください）。
                    </p>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">エミュレータ</th>
                                    <th scope="col">提供コマンド</th>
                                    <th scope="col">主な用途</th>
                                    <th scope="col">補足</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Firestore</td>
                                    <td>
                                        <code>gcloud emulators firestore start</code>
                                    </td>
                                    <td>ドキュメント指向DBのローカル開発・単体テスト</td>
                                    <td>Native modeとDatastore modeの両方に対応</td>
                                </tr>
                                <tr className="even">
                                    <td>Spanner</td>
                                    <td>
                                        <code>gcloud emulators spanner start</code>
                                    </td>
                                    <td>分散リレーショナルDBのローカル開発</td>
                                    <td>本番同様のAPI形状をローカルで再現</td>
                                </tr>
                                <tr className="odd">
                                    <td>Pub/Sub</td>
                                    <td>
                                        <code>gcloud beta emulators pubsub start</code>
                                    </td>
                                    <td>非同期メッセージングの単体テスト</td>
                                    <td>Push/Pullサブスクリプションの検証に利用</td>
                                </tr>
                                <tr className="even">
                                    <td>Bigtable</td>
                                    <td>
                                        <code>gcloud beta emulators bigtable start</code>
                                    </td>
                                    <td>大規模NoSQLワークロードのローカル検証</td>
                                    <td>インメモリで動作</td>
                                </tr>
                                <tr className="odd">
                                    <td>Datastore</td>
                                    <td>
                                        <code>gcloud beta emulators datastore start</code>
                                    </td>
                                    <td>旧来のDatastore APIのローカルテスト</td>
                                    <td>Firestore in Datastore modeへの移行を検討</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h4>基本的な使い方（Pub/Subエミュレータの例）</h4>

                    <p>エミュレータを使ったローカル開発の典型的な流れを、シーケンス図で示します。</p>

                    <Diagram id="diag-2" label="エミュレータを使ったローカル開発のシーケンス図" />

                    <p>
                        Pub/Subエミュレータのコマンドライン引数の詳細はgcloud beta emulators pubsubのリファレンスを参照します。 エミュレータをコンテナとして動かす場合は、gCloud Dockerイメージをダウンロード・インストールし、コマンドプロンプトからpubsub startを呼び出すことでエミュレータをコンテナとして起動できます。
                    </p>

                    <p>
                        なお、Pub/Subエミュレータには本番との差異もあります。UpdateTopicやUpdateSnapshotのRPCは未サポートであり、IAM操作も未サポートです。またメッセージ保持期間の設定はサポートされておらず、すべてのメッセージは無期限に保持されます。
                    </p>

                    <h4>実行環境の分離パターン（Testcontainersとの併用）</h4>

                    <p>
                        CI環境でエミュレータの起動・停止をテストコードに組み込みたい場合、OSS の Testcontainers ライブラリを使う方法も広く使われています。TestcontainersのGCloudモジュールは、Bigtable、Datastore、Firestore、Spanner、Pub/Subのエミュレータをサポートしており、Java、Go、.NET、Node.js、Pythonに対応しています。
                    </p>

                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        {' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            {' '}
                            <ul>
                                <li>
                                    ホスト名・ポートはハードコードせず、<code>FIRESTORE_EMULATOR_HOST</code> や <code>PUBSUB_EMULATOR_HOST</code> のような環境変数経由でクライアントライブラリに渡す（本番切り替え時にコード変更が不要になる）。
                                </li>
                                {' '}
                                <li>
                                    エミュレータはあくまで開発・単体テスト用であり、本番同等の性能・整合性・IAM挙動を完全に再現するものではない。結合テストや性能検証の最終段階では、実際のGoogle Cloudサービス（可能であれば専用のステージング環境）で検証する。
                                </li>
                                {' '}
                                <li>
                                    CI/CDパイプライン（Cloud Buildなど）でもローカルと同じエミュレータ起動コマンドを再利用し、「ローカルで通ったテストがCIでも同じ結果になる」状態を保つ。
                                </li>
                                {' '}
                                <li>
                                    Testcontainersのような仕組みを使うと、テストの前後でエミュレータコンテナを自動起動・終了でき、テスト間のデータ汚染を防ぎやすい。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <p>
                        出典：
                        <a href="https://cloud.google.com/cli">gcloud CLI（cloud.google.com/cli）</a>
                        、
                        <a href="https://docs.cloud.google.com/sdk/gcloud/reference/beta/emulators">
                            gcloud beta emulators リファレンス
                        </a>
                        、
                        <a href="https://docs.cloud.google.com/pubsub/docs/emulator">
                            Pub/Subエミュレータでのローカルテスト
                        </a>
                        、
                        <a href="https://testcontainers.com/modules/google-cloud/">
                            Testcontainers Google Cloud Module
                        </a>
                    </p>

                    <h3 id="212-google-cloud-consolecloud-sdkcloud-codegemini-cloud-assistcloud-shellcloud-workstations">
                        2.1.2 Google Cloud Console・Cloud SDK・Cloud Code・Gemini Cloud Assist・Cloud Shell・Cloud Workstations
                    </h3>

                    <p>
                        Exam Guideのこの項目は、「開発者が日常的に触れる各種のGoogle Cloud開発ツール」を横断的に理解しているかを問うものです。それぞれの役割と使い分けを整理します。
                    </p>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">ツール</th>
                                    <th scope="col">形態</th>
                                    <th scope="col">主な役割</th>
                                    <th scope="col">典型的な利用シーン</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Google Cloud Console</td>
                                    <td>ブラウザGUI</td>
                                    <td>リソースの作成・確認・設定変更</td>
                                    <td>初期セットアップ、ダッシュボード確認、権限設定</td>
                                </tr>
                                <tr className="even">
                                    <td>Cloud SDK（gcloud CLI）</td>
                                    <td>ローカル/Cloud Shellにインストールするコマンドラインツール群</td>
                                    <td>スクリプト化・自動化可能なリソース操作</td>
                                    <td>CI/CDスクリプト、繰り返し作業の自動化</td>
                                </tr>
                                <tr className="odd">
                                    <td>Cloud Code</td>
                                    <td>IDE拡張機能（VS Code／JetBrains／Cloud Shell Editor）</td>
                                    <td>GKE・Cloud Runアプリのローカル開発・デバッグ・デプロイ</td>
                                    <td>コンテナアプリのインナーループ開発</td>
                                </tr>
                                <tr className="even">
                                    <td>Gemini Cloud Assist</td>
                                    <td>Cloud Consoleに統合されたAIアシスタントパネル</td>
                                    <td>自然言語での説明・提案・ガイド付きワークフロー</td>
                                    <td>トラブルシューティング、コスト最適化、アーキテクチャ設計支援</td>
                                </tr>
                                <tr className="odd">
                                    <td>Cloud Shell</td>
                                    <td>ブラウザベースの一時的なLinux VM＋ターミナル</td>
                                    <td>インストール不要な即時アクセス</td>
                                    <td>一時的な検証、クイックスタート、ローカル環境がない状況</td>
                                </tr>
                                <tr className="even">
                                    <td>Cloud Workstations</td>
                                    <td>管理者が定義したテンプレートに基づく永続的なマネージド開発環境</td>
                                    <td>チーム標準化されたセキュアな開発環境の提供</td>
                                    <td>エンタープライズでの開発環境統制、ソフトウェアサプライチェーンのセキュリティ強化</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h4>Google Cloud Console と Cloud SDK</h4>

                    <p>
                        Cloud ConsoleはWeb GUIで、視覚的にリソースを確認・操作できます。一方、Cloud SDK（gcloud CLI）は、同じGoogle Cloudサービスをターミナルからスクリプト・自動化しながら操作できるコマンドラインの手段を提供し、8,000を超えるコマンドで、ほぼすべてのGoogle Cloudサービス・製品を細かく管理・制御できます。
                    </p>

                    <h4>Cloud Code</h4>

                    <p>
                        Cloud Codeは、Google Kubernetes EngineやCloud RunなどのGoogle Cloudサービスを直接IDEに統合する拡張機能で、コンテキストスイッチをせずにアプリケーションを開発できるようにします。 VS Code、IntelliJをはじめとするJetBrains系IDEにインストールでき、Cloud Shell Editorにはデフォルトで組み込まれています。
                    </p>

                    <p>
                        Cloud Codeは、Google CloudのIDE拡張機能として、クラウドネイティブアプリケーションの開発ライフサイクルを高速化するために設計されたAI支援型のIDEプラグイン群です。 対応IDEにはVS Code、JetBrains系IDE（IntelliJ、PyCharm、GoLand、WebStormなど）、Cloud Workstations、ブラウザベースのCloud Shell Editorが含まれます。
                    </p>

                    <h4>Gemini Cloud Assist</h4>

                    <p>
                        Gemini Cloud Assistは、Cloud Console上で自然言語による支援を受けられる機能です。Gemini Cloud Assistパネルでは、自然言語のプロンプトを入力することで、詳細な説明や推奨アクション、ガイド付きワークフローを得られ、クラウドの専門家でなくてもタスクを効率的に完了できるようになります。
                    </p>

                    <p>
                        Gemini Cloud Assistは応答の精度を高めるため、いくつかのコンテキスト情報を利用します。具体的には、Google CloudプロジェクトID・組織ID、現在閲覧しているコンソールページのURLや表示内容（ページ文脈認識）、そしてセッション履歴を保持する記憶（メモリ）機能を活用し、複数ターンにわたる複雑なタスクでも文脈を維持します。
                    </p>

                    <p>
                        ここで注意したいのは、Gemini Cloud Assist（Cloud Console内のAIアシスタントパネル）と、後述するGemini Code Assist（IDE向けのコーディング支援）は別の製品であるという点です。試験対策上もこの2つを混同しないことが重要です。
                    </p>

                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        {' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            {' '}
                            <ul>
                                <li>
                                    Gemini Cloud Assistはプレビュー期間中は無料で利用できますが、チャットパネルでの会話はどこのGoogle Cloudデータセンターにも保存され得るため、データレジデンシーや管轄区域のコンプライアンス要件の対象となる情報は入力しないようにする。
                                </li>
                                {' '}
                                <li>
                                    Gemini Cloud Assistの応答は早期段階の技術であり、もっともらしく見えても事実と異なる出力を生成することがあるため、利用前に必ず検証する。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <h4>Cloud Shell</h4>

                    <p>
                        Cloud Shellは、ブラウザからGoogle Cloudを学習・実験し、プロジェクトやリソースを管理できるインタラクティブなシェル環境です。 Google Cloud CLIやその他必要なユーティリティがあらかじめインストール・認証済みで、常に最新の状態で利用できます。 統合されたCloud Codeを備えたコードエディタも組み込まれており、クラウドから一切離れずにアプリのビルド・デバッグ・デプロイができます。
                    </p>

                    <p>
                        ストレージ面では、デフォルトで5GBの無料永続ディスクストレージが一時的に割り当てられた仮想マシンにプロビジョニングされ、これがホームディレクトリとなります。
                    </p>

                    <h4>Cloud Workstations</h4>

                    <p>
                        Cloud Workstationsは、組み込みのセキュリティと、事前設定済みながらカスタマイズ可能な開発環境を備えた、Google Cloud上のマネージド開発環境を提供します。 開発者にソフトウェアのインストールやセットアップスクリプトの実行を求める代わりに、環境を再現可能な形で定義するワークステーション構成を作成できます。
                    </p>

                    <p>
                        ワークステーション構成は、ワークステーションの仮想マシンインスタンスタイプ、永続ストレージ、環境を定義するコンテナイメージ、使用するIDE／コードエディタなどの詳細を定義するテンプレートとして機能します。 管理者やプラットフォームチームは、IAMルールを使ってチームや個々の開発者にアクセス権を付与することもできます。
                    </p>

                    <p>
                        セキュリティの観点でも、Cloud Workstationsはソフトウェアサプライチェーンの保護に重要な役割を果たします。Cloud Workstationsは、開発ワークフローやツール、ソフトウェア依存関係、ソフトウェアをビルド・デプロイするCI/CDシステム、GKEやCloud Runのようなランタイム環境のセキュリティ体制を改善するために、他のGoogle Cloud製品・機能と組み合わせて利用できるソフトウェアサプライチェーンセキュリティのコンポーネントの1つです。
                    </p>

                    <h4>どのツールを選ぶか（意思決定の目安）</h4>

                    <Diagram id="diag-3" label="開発ツールの選択フローを示す図" />

                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        {' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            {' '}
                            <ul>
                                <li>
                                    個人の一時的な検証にはCloud Shellを、組織全体でセキュリティ・コンプライアンスを統制したい継続的な開発にはCloud Workstationsを使い分ける。
                                </li>
                                {' '}
                                <li>
                                    ローカルでのセットアップは、環境構築だけで数日から数週間かかることがあり、その多くの時間が環境構築に費やされ、いわゆる「私の環境では動く」という設定ドリフト問題を招きやすい。Cloud Workstationsのようなマネージド環境は、この問題を構成テンプレートの一元管理によって解消する。
                                </li>
                                {' '}
                                <li>
                                    Cloud CodeはIDEを問わず（VS Code／JetBrains／Cloud Shell Editor）同じ体験を提供するため、チームメンバーが異なるIDEを使っていても、GKE/Cloud Run向けのワークフローを統一できる。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <p>
                        <strong>出典</strong>：
                        <a href="https://cloud.google.com/cli">gcloud CLI概要</a>
                        、
                        <a href="https://docs.cloud.google.com/code/docs/vscode/overview">
                            Cloud Code for VS Code 概要
                        </a>
                        、
                        <a href="https://docs.cloud.google.com/cloud-assist/overview">
                            Gemini Cloud Assist 概要
                        </a>
                        、
                        <a href="https://docs.cloud.google.com/cloud-assist/chat-panel">
                            Gemini Cloud Assistの利用（チャットパネル）
                        </a>
                        、
                        <a href="https://docs.cloud.google.com/shell/docs">Cloud Shellドキュメント</a>
                        、
                        <a href="https://docs.cloud.google.com/shell/docs/using-cloud-shell">
                            Cloud Shellの使い方
                        </a>
                        、
                        <a href="https://docs.cloud.google.com/workstations/docs/overview">
                            Cloud Workstations概要
                        </a>
                        、
                        <a href="https://cloud.google.com/blog/products/application-development/cloud-workstations-managed-development-environment-is-now-ga">
                            Cloud Workstations GA発表ブログ
                        </a>
                    </p>

                    <h3 id="213-ideの構成cloud-sdkaiツールmcpサーバー">
                        2.1.3 IDEの構成（Cloud SDK・AIツール・MCPサーバー）
                    </h3>

                    <p>
                        Exam Guideのこの項目では、「Cloud SDKやAIツール（コーディングアシスタント、MCPサーバー）などの適切な統合機能でIDEを構成すること」が問われます。
                    </p>

                    <h4>Cloud SDKとADC（Application Default Credentials）の設定</h4>

                    <p>
                        IDEからGoogle Cloud APIを呼び出すアプリケーションコードを実行するには、まずローカル環境の認証を設定する必要があります。ここで中心となるのがADC（Application Default Credentials）です。ADCは、アプリケーションの実行環境に基づいて認証ライブラリが自動的に資格情報を見つけるための戦略であり、Cloud Client LibrariesやGoogle API Client Librariesがこの資格情報を利用できるようにします。
                    </p>

                    <p>
                        <code>gcloud auth application-default</code>コマンドグループは、ローカルのアプリケーション開発で使用される、マシン上のアクティブな資格情報を管理するためのものであり、この資格情報はあくまで自分のアプリケーション内のGoogleクライアントライブラリからのみ使用されます。
                    </p>

                    <p>
                        重要な注意点として、gcloud CLI自体はGoogle Cloudリソースへのアクセスに際してADCを使用しないため、<code>gcloud auth login</code>（gcloud CLI自体の認証）と<code>gcloud auth application-default login</code>（ADCの設定）は目的の異なる別々のコマンドです。
                    </p>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">コマンド</th>
                                    <th scope="col">目的</th>
                                    <th scope="col">影響範囲</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>
                                        <code>gcloud auth login</code>
                                    </td>
                                    <td>gcloud CLIコマンド自体を認証する</td>
                                    <td>
                                        ターミナルからの<code>gcloud</code>コマンド実行
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>gcloud auth application-default login</code>
                                    </td>
                                    <td>ADCを設定し、クライアントライブラリに資格情報を提供する</td>
                                    <td>
                                        アプリケーションコード内のGoogle Cloudクライアントライブラリ呼び出し
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p>
                        サービスアカウントの権限をローカルで再現したい場合は、なりすまし（impersonation）を使う方法もあります。サービスアカウントのなりすましを使ってローカルのADCファイルを設定するには、<code>gcloud auth application-default login --impersonate-service-account SERVICE_ACCT_EMAIL</code>を実行し、対象のサービスアカウントに対してService Account Token Creator（roles/iam.serviceAccountTokenCreator）のIAMロールを持っている必要があります。
                    </p>

                    <h4>Cloud Code拡張機能のインストールとAI支援</h4>

                    <p>
                        IDEにCloud Code拡張機能をインストールすると、Kubernetes向けのコマンドラインツール群とも連携します。Cloud CodeはSkaffold、minikube、kubectlといったGoogleのコンテナ関連コマンドラインツールと連携し、アプリのビルド・編集・実行・デプロイに応じてローカルで継続的なフィードバックを提供します。
                    </p>

                    <p>
                        AI支援については、Gemini Code Assistと連携し、コード補完・生成・チャットによるアシスタンスを提供することで、開発者がより速く効率的にコードを書けるようにします。
                    </p>

                    <p>
                        ⚠️ <strong>重要な最新情報（2026年6月時点）</strong>：2026年6月18日より、Gemini Code Assist IDE拡張機能とGemini CLIは、個人向け（Gemini Code Assist for individuals）・Google AI Pro・Google AI Ultra各ティアのリクエスト処理を終了しました。該当ユーザーはAntigravityおよびAntigravity CLIへの移行が必要です。 なお、Gemini Code Assist Standard／Enterpriseの契約は今回の変更の影響を受けません。 試験対策としては、IDE統合の<strong>考え方</strong>（コード補完、コード生成、単体テスト生成、チャットによる支援）自体は変わらないため、この点を理解しておけば十分ですが、実際に製品を選定する際は必ず
                        <a href="https://docs.cloud.google.com/gemini/docs/codeassist/release-notes">
                            Gemini Code Assistのリリースノート
                        </a>
                        で最新の提供状況を確認してください。
                    </p>

                    <p>
                        Gemini Code Assist（Standard／Enterprise）を使ったIDE内での操作は、次のような形で行います。コードエディタ内でコード補完を受け取ったり、コードを直接生成したりできるほか、IDE内でGeminiのアイコンをクリックすると対話型アシスタントが表示され、コードを選択した状態で「Write unit tests for my code.」「Help me debug my code.」のようなプロンプトを入力できます。
                    </p>

                    <h4>MCP（Model Context Protocol）サーバーによる拡張</h4>

                    <p>
                        Exam Guideが挙げるもう一つの統合対象が<strong>MCPサーバー</strong>です。MCPは、AIアシスタントを外部システムに接続するための標準プロトコルです。Model Context Protocol（MCP）は、大規模言語モデル（LLM）やAIアプリケーション・エージェントが外部のデータソースに接続する方法を標準化するものです。
                    </p>

                    <p>
                        IDE内のエージェントモードからMCPサーバーを設定することで、AIアシスタントの能力を拡張できます。エージェントモードでは、コードに関する質問をしたり、コンテキストや組み込みツールを使って生成内容を改善したり、MCPサーバーを設定してエージェントの能力を拡張したり、複数ステップにわたる複雑なタスクの解決策を得たりできます。 利用可能なツールの例には、grepやファイルの読み書きといった組み込みツール、ローカルまたはリモートのMCPサーバーとその実行可能な関数、独自のサービス実装などがあります。
                    </p>

                    <p>
                        Google Cloud自体も、公式のMCPサーバーを提供し始めています。例えばCloud Run向けには、Cloud RunのMCPサーバーを使って、Webアプリケーションのビルド・コンテナ化・push・設定・公開URLの返却までを行うカスタムコマンドが用意されています。 また、Gemini Cloud Assist自体もリモートMCPサーバーとして公開されており、Gemini CLIやChatGPT、Claude、独自に開発したアプリケーションなど各種AIアプリケーションと接続できます。
                    </p>

                    <p>
                        MCPサーバーとの認証には、通常のAPIキーではなくIAMベースの仕組みが使われる点も押さえておきましょう。Gemini Cloud AssistのリモートMCPサーバーはOAuth 2.0とIAMを組み合わせて認証・認可を行い、APIキーによる認証はサポートしていません。エージェントがMCPツールを使う際には、アクセス制御と監視ができるよう専用のIDを作成することが推奨されています。
                    </p>

                    <h4>IDE統合の全体フロー</h4>

                    <Diagram id="diag-4" label="IDE統合の全体フローを示すシーケンス図" />

                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        {' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            {' '}
                            <ul>
                                <li>
                                    ローカル開発では<code>gcloud auth login</code>と<code>gcloud auth application-default login</code>の両方を意識して使い分ける。前者はgcloudコマンド自体の認証、後者はアプリケーションコードが使うクライアントライブラリの認証であり、片方だけでは不十分な場面がある。
                                </li>
                                {' '}
                                <li>
                                    ユーザー認証情報のADCでクライアントライブラリを使う場合、どのプロジェクトのAPI割り当て（quota）を消費するかは<strong>割り当てプロジェクト</strong>で決まる。<code>gcloud auth application-default set-quota-project</code>などで割り当てプロジェクトを明示的に設定した場合、ADCのプリンシパルにはそのプロジェクトに対する<code>serviceusage.services.use</code>権限が必要になる。付与時はEditorやOwnerのような広範なロールではなく、最小権限の<code>roles/serviceusage.serviceUsageConsumer</code>を選ぶ。
                                </li>
                                {' '}
                                <li>
                                    APIの種類によって割り当てプロジェクトの決まり方が異なる点に注意する。Compute EngineのようなリソースベースのAPIは、操作対象リソースが属するプロジェクトがそのまま割り当てプロジェクトとして使われるため、明示設定がなくても動作する。一方、Cloud Translationのようなクライアントベースの（操作対象リソースを持たない）APIは、割り当てプロジェクトが明示的に構成されていないと呼び出しが失敗する。
                                </li>
                                {' '}
                                <li>
                                    割り当てプロジェクトと課金先は別概念であり、「常にリソースを所有するプロジェクトへ課金される」とは限らない。課金先はAPIごとのルールに従う。例えばPub/Subでは、publish（発行）はトピックが属するプロジェクトへ、subscribe（受信）はサブスクリプションが属するプロジェクトへ課金されるため、トピックとサブスクリプションが別プロジェクトにある構成では課金先も分かれる。
                                </li>
                                {' '}
                                <li>
                                    AIコーディングアシスタントにMCPサーバーを接続する際は、通常のユーザーIDではなく専用のエージェント用IDを用意し、アクセス範囲を監視・制御できるようにする。
                                </li>
                                {' '}
                                <li>
                                    エージェントモードでMCPサーバーやツール呼び出しを許可する際は、エージェントがファイルシステムやターミナル操作にアクセスできる点を踏まえ、すべてのアクションを自動承認する設定は慎重に扱う。
                                </li>
                                {' '}
                                <li>
                                    IDE・AIツール・MCPサーバーの提供形態は変化が速い領域のため、製品選定時は必ず公式リリースノートで現在の提供状況を確認する。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <p>
                        <strong>出典</strong>：
                        <a href="https://docs.cloud.google.com/docs/authentication/application-default-credentials">
                            ADCの仕組み
                        </a>
                        、
                        <a href="https://docs.cloud.google.com/docs/authentication/provide-credentials-adc">
                            ADCの資格情報の提供方法
                        </a>
                        、
                        <a href="https://docs.cloud.google.com/docs/authentication/set-up-adc-local-dev-environment">
                            ローカル開発環境向けADCの設定
                        </a>
                        、
                        <a href="https://docs.cloud.google.com/sdk/gcloud/reference/auth/application-default">
                            gcloud auth application-default リファレンス
                        </a>
                        、
                        <a href="https://docs.cloud.google.com/code/docs/vscode/overview">
                            Cloud Code for VS Code 概要
                        </a>
                        、
                        <a href="https://docs.cloud.google.com/gemini/docs/codeassist/write-code-gemini">
                            Gemini Code AssistでのコーディングSmart Actions
                        </a>
                        、
                        <a href="https://developers.google.com/gemini-code-assist/docs/use-agentic-chat-pair-programmer">
                            Gemini Code Assist エージェントモードの利用
                        </a>
                        、
                        <a href="https://docs.cloud.google.com/gemini/docs/codeassist/release-notes">
                            Gemini Code Assist リリースノート
                        </a>
                        、
                        <a href="https://docs.cloud.google.com/cloud-assist/use-gemini-cloud-assist-mcp">
                            Gemini Cloud AssistのリモートMCPサーバー
                        </a>
                    </p>

                    <hr />

                    <h2 id="22-ビルド">2.2 ビルド</h2>

                    <p>Exam Guideは2.2として次の2点を挙げています。</p>

                    <ul>
                        <li>
                            Cloud BuildとArtifact Registryを使って、ソースコードからコンテナをビルド・保存する
                        </li>
                        <li>Cloud Buildでprovenance（Binary Authorizationなど）を構成する</li>
                    </ul>

                    <h3 id="221-cloud-buildとartifact-registryによるコンテナのビルドと保存">
                        2.2.1 Cloud BuildとArtifact Registryによるコンテナのビルドと保存
                    </h3>

                    <h4>Cloud Buildとは何か</h4>

                    <p>
                        Cloud Buildを使うと、依存関係の取得、単体テストの実行、静的解析、統合テストの実行、そしてdocker・gradle・maven・bazel・gulpといったビルドツールでのアーティファクト作成までを含むビルドを構成できます。 Cloud Buildはビルドを一連のビルドステップとして実行し、各ステップはDockerコンテナ内で実行されます。これはスクリプト内でコマンドを実行するのと似ています。
                    </p>

                    <p>
                        ビルドステップの提供元には複数の選択肢があります。Cloud Buildおよびそのコミュニティが公開しているオープンソースのビルドステップ、コミュニティが提供するビルドステップ、そして自分で作成するカスタムビルドステップです。 各ビルドステップは、cloudbuildという名前のローカルDockerネットワークに接続された状態で、それぞれのコンテナ上で実行されます。
                    </p>

                    <p>
                        セキュリティ面でも標準で配慮されています。Cloud BuildはデフォルトでCMEK（顧客管理の暗号鍵）準拠を提供しており、ユーザー側で特に何かを設定する必要はありません。ビルド実行時の永続ディスクは、ビルドごとに生成される一時的な鍵で暗号化され、ビルド完了と同時にその鍵はメモリから消去・破棄されます。
                    </p>

                    <h4>Artifact Registryとは何か</h4>

                    <p>
                        Artifact Registryは、統合されたGoogle Cloud体験の一部として、アーティファクトとビルドの依存関係を一元的に保存できるようにするもので、パッケージとDockerコンテナイメージを保存・管理するための単一の場所を提供します。
                    </p>

                    <p>
                        Artifact Registryでできる主なことは次の通りです。Google CloudのCI/CDサービスや既存のCI/CDツールとの統合、Cloud Buildからのアーティファクト保存、GKE・Cloud Run・Compute Engine・App Engineフレキシブル環境を含むGoogle Cloudランタイムへのアーティファクトのデプロイ、IAMによる一貫した資格情報とアクセス制御の提供、ソフトウェアサプライチェーンの保護などです。
                    </p>

                    <p>
                        Cloud BuildとArtifact Registryの連携は密接です。Artifact Registryは、Cloud Buildをはじめとする継続的デリバリー・継続的インテグレーションシステムと統合し、ビルド成果物のパッケージを保存できます。ビルドやデプロイに使う信頼済みの依存関係も保存できます。
                    </p>

                    <h4>典型的なビルド〜保存パイプライン</h4>

                    <Diagram id="diag-5" label="ビルドから保存までのパイプラインを示す図" />

                    <p>
                        イメージのpush先を指定してビルドを実行する場合、<code>cloudbuild.yaml</code>は次のような形になります（構文の概念を示す簡略例です）。
                    </p>

                    <p>
                        <code>
                            steps:
                            <br />
                            &nbsp;&nbsp;- name: &apos;gcr.io/cloud-builders/docker&apos;
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;args:
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- &apos;build&apos;
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- &apos;-t&apos;
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- &apos;us-central1-docker.pkg.dev/$PROJECT_ID/my-repo/my-app:$SHORT_SHA&apos;
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- &apos;.&apos;
                            <br />
                            {' '}
                            images:
                            <br />
                            &nbsp;&nbsp;- &apos;us-central1-docker.pkg.dev/$PROJECT_ID/my-repo/my-app:$SHORT_SHA&apos;
                        </code>
                    </p>

                    <p>
                        <code>cloudbuild.yaml</code>の主要フィールドは次の通りです。
                    </p>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">フィールド</th>
                                    <th scope="col">説明</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>
                                        <code>steps</code>
                                    </td>
                                    <td>
                                        順番に（または<code>waitFor</code>指定で並列に）実行されるビルドステップの配列
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>steps[].name</code>
                                    </td>
                                    <td>ステップを実行するビルダーコンテナイメージ</td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>steps[].args</code>
                                    </td>
                                    <td>ビルダーコンテナに渡す引数</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>steps[].waitFor</code>
                                    </td>
                                    <td>
                                        このステップが待機する先行ステップのID（並列実行の制御に使用）
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>images</code>
                                    </td>
                                    <td>
                                        ビルド成功時にArtifact Registry／Container Registryへpushするイメージの一覧
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>substitutions</code>
                                    </td>
                                    <td>
                                        <code>$PROJECT_ID</code>や<code>$SHORT_SHA</code>など、ビルド時に置換される変数
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p>
                        <code>$SHORT_SHA</code>の扱いには注意が必要です。<code>$SHORT_SHA</code>はビルドトリガー経由の実行では自動的に設定されますが、手元から<code>gcloud builds submit</code>を直接実行した場合は自動設定されず、未指定のままだと空文字列になります。手動実行時は<code>$BUILD_ID</code>やユーザー定義の<code>$_IMAGE_TAG</code>を使うか、<code>--substitutions=SHORT_SHA=...</code>で明示的に値を渡します。
                    </p>

                    <p>
                        Artifact Registryへイメージを保存するもう一つの代表的な方法として、<code>cloudbuild.yaml</code>のようなビルド構成ファイルを用意せずに<code>gcloud builds submit</code>を直接呼び出すシンプルな方法もあります。この場合もビルドはローカルで実行されるのではなくCloud Buildへ送信されます。<code>-t</code>（<code>--tag</code>）を指定すると、カレントディレクトリのソースに含まれる<code>Dockerfile</code>からイメージをビルドするビルド構成がCloud Build側で暗黙に生成され、ビルドされたイメージが自動的にArtifact Registryへpushされます。実際のコマンドは<code>gcloud builds submit . -t LOCATION-docker.pkg.dev/PROJECT_ID/REPO/IMAGE:TAG</code>のようになります。 自動スキャンには前提条件があります。Container Scanning APIを有効化している場合、標準（standard）またはリモート（remote）のDockerリポジトリにpushされたイメージが自動スキャンの対象になります。それ以外の対応リポジトリ形式では、リポジトリ単位でスキャンを有効化する必要があります。Container Analysisをその他の情報と統合することで、そのメタデータに基づいた意思決定が可能になります。例えば、信頼できるレジストリからの準拠したイメージのみをデプロイ対象として許可するデプロイポリシーを、Binary Authorizationで作成できます。
                    </p>

                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        {' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            {' '}
                            <ul>
                                <li>
                                    イメージのタグに<code>latest</code>を使わず、Gitのコミットハッシュ（<code>$SHORT_SHA</code>）やセマンティックバージョンなど、一意で追跡可能な値を使う。ロールバックや監査の際に、どのソースからビルドされたイメージかを一意に特定できるようにするため。
                                </li>
                                {' '}
                                <li>
                                    Cloud BuildのサービスアカウントにはArtifact Registryへの書き込みなど、そのパイプラインに必要最小限のIAMロールのみを付与する（最小権限の原則）。
                                </li>
                                {' '}
                                <li>
                                    Artifact Registryのスキャン機能（コンテナ脆弱性スキャンやオンデマンドスキャン）を有効化し、脆弱性が検出された場合にパイプラインを止めるスキャンゲートを設けることで、本番デプロイ前の段階で問題を検知する。
                                </li>
                                {' '}
                                <li>
                                    依存関係のダウンロードやDockerレイヤーのキャッシュを活用し、ビルド時間を短縮する。
                                </li>
                                {' '}
                                <li>
                                    ステージング用と本番用でArtifact Registryのリポジトリを分離し、IAMでアクセスを制御する。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <p>
                        <strong>出典</strong>：
                        <a href="https://docs.cloud.google.com/build/docs/overview">
                            Cloud Buildの概要
                        </a>
                        、
                        <a href="https://docs.cloud.google.com/artifact-registry/docs/overview">
                            Artifact Registryの概要
                        </a>
                        、
                        <a href="https://docs.cloud.google.com/artifact-registry/docs/build">
                            Artifact Registryへのビルド成果物の格納
                        </a>
                        、
                        <a href="https://codelabs.developers.google.com/secure-build-deploy-cloud-build-ar-gke">
                            Cloud BuildとArtifact RegistryによるセキュアなビルドとGKEへのデプロイ（Codelab）
                        </a>
                    </p>

                    <hr />

                    <h3 id="222-cloud-buildにおけるprovenanceの構成binary-authorization">
                        2.2.2 Cloud Buildにおけるprovenanceの構成（Binary Authorization）
                    </h3>

                    <h4>provenance（来歴情報）とは何か</h4>

                    <p>
                        「provenance」とは、ソフトウェア成果物（コンテナイメージなど）が<strong>いつ・何から・どのようなプロセスでビルドされたか</strong>を証明する、検証可能なメタデータのことです。Cloud Buildは、SLSA（Supply-chain Levels for Software Artifacts）バージョン0.1および1.0の仕様に基づいたレベル3相当のビルドprovenance生成をサポートしています。SLSA v1.0仕様のサポートの一部として、Cloud BuildはビルドprovenanceにbuildType詳細を含めており、ビルドプロセスに使われたパラメータ化テンプレートや、Cloud Buildが記録する値・その値の出所を理解するために利用できます。
                    </p>

                    <p>
                        適用範囲には注意が必要です。Cloud Buildは、Artifact Registryに保存されたアーティファクトについてのみビルドprovenanceを生成します。前掲の<code>cloudbuild.yaml</code>のように<code>images</code>フィールドでpush先を指定するのは正しい書き方ですが、ビルドステップ内で明示的に<code>docker push</code>を実行した場合はprovenanceが生成されないことがあります。
                    </p>

                    <p>
                        さらに、provenanceを生成できなかったビルドを「成功」として扱わないために、<code>options.requestedVerifyOption</code>に<code>VERIFIED</code>を指定します。
                    </p>

                    <p>
                        <code>
                            options:
                            <br />
                            &nbsp;&nbsp;requestedVerifyOption: VERIFIED
                        </code>
                    </p>

                    <p>
                        この設定により、provenanceの生成に失敗したビルドはビルド自体が失敗として扱われ、検証されていないイメージが後続のデプロイへ流れることを防げます。
                    </p>

                    <p>
                        Cloud BuildをBinary Authorizationと統合すると、ビルドのアテステーション（証明）を確認し、Cloud Buildによって生成されていないイメージのデプロイをブロックできます。このプロセスにより、認可されていないソフトウェアがデプロイされるリスクを低減できます。
                    </p>

                    <h4>SLSAレベルとGoogle Cloudでの実現手段</h4>

                    <p>
                        Cloud Buildは、検証可能なソースコード管理、自動検証済みのprovenance、Binary Authorizationのようなツールといった技術を使って、より高いSLSAレベルに到達するためのホスト型ソフトウェアビルドシステムの基盤を提供します。ビルドプロセスを完全に自動化し、本番ワークフローではビルドシステムの利用を必須とし、Cloud Buildでソフトウェアパイプラインを構築することで、最初からSLSA 1相当のサプライチェーンを実現できます。
                    </p>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">観点</th>
                                    <th scope="col">説明</th>
                                    <th scope="col">Cloud Build / Google Cloudでの対応</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>ビルドの自動化</td>
                                    <td>手作業を排除し、再現可能なビルドプロセスを持つ</td>
                                    <td>
                                        Cloud Buildの<code>cloudbuild.yaml</code>による宣言的パイプライン
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>provenance生成</td>
                                    <td>ビルド成果物の出所を検証可能な形で記録する</td>
                                    <td>Cloud BuildがSLSA準拠のprovenanceを自動生成・署名</td>
                                </tr>
                                <tr className="odd">
                                    <td>デプロイ時の検証</td>
                                    <td>検証済みのアーティファクトのみをデプロイ許可する</td>
                                    <td>Binary Authorizationによるポリシーベースの許可制御</td>
                                </tr>
                                <tr className="even">
                                    <td>署名鍵の管理</td>
                                    <td>ビルド・アテステーションの署名鍵を安全に管理する</td>
                                    <td>Cloud KMSによる鍵管理</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p>
                        provenanceの生成（SLSA 1）とセキュアなビルド（SLSA 2）を実現していても、それだけでは未検証のイメージが本番にデプロイされることを防げません。Binary Authorizationは、署名（アテステーション）された信頼できるイメージのみをデプロイ可能にすることで、そのギャップを埋めます。
                    </p>

                    <p>
                        Binary Authorizationには役割分担の考え方があります。ポリシー作成者（Policy Creator）は、イメージがデプロイ可能と見なされるために満たすべきルールや、どのアテスターが承認する必要があるか、そして強制モード（厳格ブロック、監査のみ、無効化など）を定義するBinary Authorizationのポリシーを作成・維持します。アテスター（Attestor）は、統合テストや回帰テストの合格、既知の脆弱性のスキャン、ビジネス上の承認や変更管理要件の充足といった、特定のコンプライアンス要件についてイメージをレビューします。
                    </p>

                    <h4>provenance生成からデプロイ許可までの流れ</h4>

                    <Diagram id="diag-6" label="provenance生成からデプロイ許可までの流れを示す図" />

                    <p>
                        生成されたprovenanceは、コマンドラインから直接確認・検証することもできます。イメージのprovenanceを取得してJSONとして保存するには、<code>gcloud artifacts docker images describe $IMAGE --format json --show-provenance &gt; provenance.json</code>のようなコマンドを実行します。
                    </p>

                    <p>
                        Binary Authorization側でSLSAの継続的な検証を行う仕組みもあります。Binary Authorizationの継続的検証（CV）のSLSAチェックを利用するには、Cloud BuildでSLSA準拠のprovenanceを生成しつつイメージをビルドする必要があります。このチェックがサポートする唯一の信頼済みビルダーはCloud Buildです。
                    </p>

                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        {' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            {' '}
                            <ul>
                                <li>
                                    Binary Authorizationのポリシーは「デフォルト拒否（default-deny）」を基本とし、Cloud Buildで生成されたprovenance／アテステーションを持つイメージのみを明示的に許可する構成にする。
                                </li>
                                {' '}
                                <li>
                                    provenanceを持たないイメージを許可リストで一時的に例外扱いする場合でも、その例外を最小限にとどめ、違反をログに記録する運用と組み合わせる。
                                </li>
                                {' '}
                                <li>
                                    本番環境へのデプロイパイプラインでは、Cloud Build以外の経路でビルドされたイメージ（開発者のローカル環境で手動push されたイメージなど）を拒否するポリシーを設定し、CI/CDパイプラインを唯一の信頼できるビルド経路にする。
                                </li>
                                {' '}
                                <li>
                                    SLSA検証ツール（<code>slsa-verifier</code>など）を使い、provenanceがビルド元のソースリポジトリ・ビルダーIDと一致していることを定期的に確認する。
                                </li>
                                {' '}
                                <li>
                                    署名鍵はCloud KMSで一元管理し、鍵のローテーション・アクセス権限をIAMで統制する。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <p>
                        <strong>出典</strong>：
                        <a href="https://docs.cloud.google.com/build/docs/securing-builds/generate-validate-build-provenance">
                            ビルドprovenanceの生成と検証
                        </a>
                        、
                        <a href="https://docs.cloud.google.com/binary-authorization/docs/cv-slsa-check">
                            Binary AuthorizationのSLSAチェック
                        </a>
                        、
                        <a href="https://cloud.google.com/blog/products/application-development/google-introduces-slsa-framework">
                            GoogleによるSLSAフレームワークの紹介
                        </a>
                        、
                        <a href="https://docs.cloud.google.com/build/docs/overview">
                            Cloud Buildの概要
                        </a>
                    </p>

                    <hr />

                    <h2 id="23-テスト">2.3 テスト</h2>

                    <p>Exam Guideは2.3として次の2点を挙げています。</p>

                    <ul>
                        <li>AIコーディングアシスタントの支援を受けて単体テストを書く</li>
                        <li>Cloud Buildで自動統合テストを実行する</li>
                    </ul>

                    <h3 id="231-aiコーディングアシスタントを活用した単体テストの作成">
                        2.3.1 AIコーディングアシスタントを活用した単体テストの作成
                    </h3>

                    <h4>AIによる単体テスト生成の仕組み</h4>

                    <p>
                        Gemini Code Assist（Standard／Enterprise）は、IDE上でコードを選択し、スマートアクションから単体テストを生成できます。選択したコードを右クリックし、「Generate unit tests」のようなスマートアクションを選ぶと、Gemini Code Assistツールウィンドウにそのプロンプトに対する応答が自動的に生成されます。
                    </p>

                    <p>
                        チャットベースでも同様の依頼が可能です。コードエディタ内でコード補完を受けたり、コメントから関数やコードブロック全体を生成したり、単体テストを生成したり、デバッグ・コード理解・ドキュメント作成の支援を受けたりできます。
                    </p>

                    <p>
                        より具体的なプロンプトの書き方としては、対象コードを明示し、期待するテストフレームワークやモックのパターンを指定することが推奨されています。チャットでは「Write unit tests for UserService.create using Jest. Match existing mock patterns.」のように具体的に指示し、コードを選択してから質問するとより良い結果が得られます。
                    </p>

                    <h4>AI生成コードのレビューという原則</h4>

                    <p>
                        AIが生成したコード（テストコードを含む）は、そのまま無条件に信頼してよいものではありません。Finish Changesや概要（Outlines）といった新しいエージェント型の機能を使う場合も、他のAIエージェントの成果物と同じ厳格さで差分をレビューする必要があります。
                    </p>

                    <h4>AI支援による単体テスト作成のワークフロー</h4>

                    <Diagram id="diag-7" label="AI支援による単体テスト作成のワークフローを示す図" />

                    <h4>現在の提供状況について</h4>

                    <p>
                        前述の通り、2026年6月18日より、Gemini Code AssistのIDE拡張機能とGemini CLIは個人向け・Google AI Pro・Google AI Ultra各ティアでのリクエスト処理を終了し、該当ユーザーはAntigravityおよびAntigravity CLIへの移行が案内されています。 Antigravityは、より自律的なエージェント型のIDEとして位置づけられています。Antigravityでは、AIが自律的なジュニア開発者のように振る舞い、計画を立て、テストを実行し、Web上を自律的に操作できます。開発者は「Manager」ビューを開いて高レベルの指示を与え、AIがバックグラウンドでコードを書き、内蔵ブラウザでUIを確認し、問題を自律的に修正し、最終的に動作確認済みの「Artifact」として成果物を提示します。
                    </p>

                    <p>
                        Google Cloud認定試験の観点では、製品名やティアの変遷そのものよりも、「<strong>AIコーディングアシスタントを使って単体テストを生成し、必ず人間がレビューしてからCI/CDパイプラインに組み込む</strong>」という一連の考え方を理解しておくことが重要です。
                    </p>

                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        {' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            {' '}
                            <ul>
                                <li>
                                    AIに単体テストの生成を依頼する際は、対象のコードを明示的に選択し、使用するテストフレームワーク・既存のモックパターン・カバレッジ観点（正常系・境界値・異常系）を具体的に指示する。
                                </li>
                                {' '}
                                <li>
                                    生成されたテストは、期待値のロジックが本当に正しいか（テストがバグを覆い隠していないか）を人間がレビューしてからコミットする。テストが「常に成功する」だけの無意味なテストになっていないかを確認する。
                                </li>
                                {' '}
                                <li>
                                    AI支援で作成した単体テストであっても、最終的にはCloud Buildパイプラインの一部として自動実行し、レビュー時点だけでなく継続的に品質を担保する。
                                </li>
                                {' '}
                                <li>
                                    コード生成・テスト生成AIツールのティア・提供形態は変化が速いため、組織として採用する製品は定期的にリリースノートを確認し、移行が必要な変更がないかを把握する。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <p>
                        <strong>出典</strong>：
                        <a href="https://docs.cloud.google.com/gemini/docs/codeassist/overview">
                            Gemini Code Assist Standard／Enterprise 概要
                        </a>
                        、
                        <a href="https://docs.cloud.google.com/gemini/docs/codeassist/write-code-gemini">
                            Gemini Code AssistでのコーディングSmart Actions
                        </a>
                        、
                        <a href="https://docs.cloud.google.com/gemini/docs/codeassist/release-notes">
                            Gemini Code Assist リリースノート
                        </a>
                    </p>

                    <hr />

                    <h3 id="232-cloud-buildでの自動統合テストの実行">
                        2.3.2 Cloud Buildでの自動統合テストの実行
                    </h3>

                    <h4>単体テストと統合テストの違い</h4>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">観点</th>
                                    <th scope="col">単体テスト</th>
                                    <th scope="col">統合テスト</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>目的</td>
                                    <td>個々の関数・クラスのロジックを検証する</td>
                                    <td>複数のコンポーネント・サービス間の連携を検証する</td>
                                </tr>
                                <tr className="even">
                                    <td>実行速度</td>
                                    <td>高速</td>
                                    <td>相対的に低速（依存サービスの起動が必要）</td>
                                </tr>
                                <tr className="odd">
                                    <td>依存関係</td>
                                    <td>モック・スタブで外部依存を排除することが多い</td>
                                    <td>
                                        データベース、メッセージング、他サービスなど実際に近い依存関係を使う
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>典型的な実行場所</td>
                                    <td>ローカル環境・Cloud Buildの早い段階</td>
                                    <td>
                                        ローカルエミュレータ・docker-compose・一時的なGKEクラスタ・Cloud Build後半
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>AIコーディングアシスタントの活用点</td>
                                    <td>テストコード自体の生成</td>
                                    <td>テストシナリオの洗い出し、モックデータ生成の補助</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h4>Cloud Buildで統合テストを実行する代表的なパターン</h4>

                    <p>
                        Cloud Build上で複数コンテナにまたがる統合テストを実行する手法として、大きく次の2つのパターンがよく使われます。
                    </p>

                    <ol>
                        <li>
                            <strong>docker-composeパターン</strong>
                            ：複数サービスをdocker-composeで起動し、Cloud Buildの共有ネットワーク上でテストを実行する
                        </li>
                        <li>
                            <strong>一時的なGKEクラスタパターン</strong>
                            ：テストのたびに使い捨てのGKEクラスタ（または既存クラスタ）にサービス群をデプロイし、実クラスタに近い環境で統合テストを行う
                        </li>
                    </ol>

                    <p>
                        Google Cloud公式のサンプルリポジトリ（cloudbuild-integration-testing）では、マイクロサービスアプリケーションの統合テストにCloud Buildを使うテクニックが示されています。
                    </p>

                    <p>
                        docker-composeパターンでは、Cloud Build特有のネットワーク構成を理解しておく必要があります。Cloud Build上のすべてのコンテナはcloudbuildという名前のネットワーク内で動作するため、docker-compose用の設定ファイルにもこのネットワークをデフォルトとして追加することで、CIステップからdocker-composeサービスへ接続できるようになります。
                    </p>

                    <p>
                        ステップ間の依存関係を制御する<code>waitFor</code>も重要な要素です。<code>waitFor</code>キーを使うと、あるステップが特定の先行ステップの完了だけを待つよう指定でき、これにより一部のジョブを並列実行できます。 典型的なパターンとしては、静的解析（lint）、Dockerイメージのビルド、Cloud Runサービスとしてのデプロイという一連の流れを各サービスごとに用意し、そこにテストスイートを組み込む形が挙げられます。
                    </p>

                    <p>
                        GKEを使う統合テストパターンでは、事前にクラスタとIAM権限を準備します。既存のKubernetesクラスタにデプロイする場合はCloud Buildのサービスアカウントに<code>roles/container.developer</code>ロールを、テストごとに新しいクラスタを作成・削除・更新する場合は<code>roles/container.admin</code>ではなく、その用途に絞られた<code>roles/container.clusterAdmin</code>を付与します。カスタムのノードサービスアカウントを使う構成では、Cloud Buildのサービスアカウントにそのノードサービスアカウントへの<code>iam.serviceAccounts.actAs</code>権限（<code>roles/iam.serviceAccountUser</code>）も必要です。クラスタ内のKubernetesオブジェクト操作についてはIAMロールを広げるのではなく、必要な操作だけを許可するKubernetes RBAC（Role / RoleBinding）で設定します。
                    </p>

                    <h4>統合テストの失敗時の挙動</h4>

                    <p>
                        Cloud Buildのステップは基本的に直列実行され、失敗すると後続を止めます。あるステップが失敗すると、ビルドは停止し、残りのステップは実行されません。 これはCI全体の設計として重要な性質で、統合テストが失敗した場合に不完全な状態のままイメージをArtifact Registryへpushしたり、Binary Authorizationのprovenance生成に進んだりしないようにできます。
                    </p>

                    <h4>Cloud Buildパイプライン全体像（ビルド〜テスト〜デプロイ）</h4>

                    <p>
                        セクション2で扱った内容を、実際のCI/CDパイプラインの1本の流れとしてまとめると、次のようになります。
                    </p>

                    <Diagram id="diag-8" label="Cloud Buildパイプラインの全体像を示す図" />

                    <p>
                        この図は、本ガイドで解説してきた2.1（開発環境）、2.2（ビルド）、2.3（テスト）の各要素が、実際のパイプラインの中でどのように直列に組み合わさるかを示しています。ローカルのエミュレータ（2.1.1）で検証した内容と同じ構成をCloud Build内のテスト環境（2.3.2）でも再利用することで、「ローカルで通ったものはCIでも通る」という一貫性を保てます。
                    </p>

                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        {' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            {' '}
                            <ul>
                                <li>
                                    統合テストで使う依存サービス（データベース、メッセージングなど）は、可能な限り2.1.1で紹介したエミュレータやコンテナ化されたテスト用インスタンスを使い、テストごとに独立したクリーンな状態から開始する。
                                </li>
                                {' '}
                                <li>
                                    Cloud Buildの<code>cloudbuild</code>共有ネットワークを前提としたdocker-compose構成にしておくことで、追加の設定なしにCIステップ間で通信できるようにする。
                                </li>
                                {' '}
                                <li>
                                    並列実行できるステップ（lintと単体テストなど、互いに依存しない処理）は<code>waitFor</code>を活用して並列化し、パイプライン全体の実行時間を短縮する。
                                </li>
                                {' '}
                                <li>
                                    統合テストが失敗した場合はパイプラインをそこで止め、provenance生成やデプロイに進まないようにする（あるステップの失敗で後続ステップの実行を止めるというCloud Buildの既定動作を積極的に活用する）。
                                </li>
                                {' '}
                                <li>
                                    GKEを使った統合テストでは、テストごとに使い捨てクラスタを作る方式（分離性が高いがコスト・起動時間がかかる）と、既存の共有クラスタを使う方式（速いが名前空間分離などの設計が必要）を、テストの目的とコストのバランスで選択する。
                                </li>
                                {' '}
                                <li>
                                    統合テストの成功をBinary Authorizationのアテステーション要件の1つとして組み込み、「統合テストを通過したイメージだけがデプロイ可能」という状態を、人手のチェックではなくポリシーとして強制する。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <p>
                        <strong>出典</strong>：
                        <a href="https://docs.cloud.google.com/build/docs/overview">
                            Cloud Buildの概要
                        </a>
                        、
                        <a href="https://github.com/GoogleCloudPlatform/cloudbuild-integration-testing">
                            cloudbuild-integration-testing（GoogleCloudPlatform公式サンプル）
                        </a>
                    </p>

                    <hr />

                    <h2 id="まとめセクション2の全体マップ">まとめ：セクション2の全体マップ</h2>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">小項目</th>
                                    <th scope="col">中心となるサービス・機能</th>
                                    <th scope="col">押さえるべきキーワード</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>2.1 開発環境のセットアップ</td>
                                    <td>
                                        gcloud CLIエミュレータ、Cloud Code、Gemini Cloud Assist、Cloud Shell、Cloud Workstations、ADC、MCPサーバー
                                    </td>
                                    <td>
                                        ローカルエミュレーション、マネージド開発環境、IDE統合、AIコーディングアシスタント
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>2.2 ビルド</td>
                                    <td>Cloud Build、Artifact Registry、Binary Authorization</td>
                                    <td>
                                        <code>cloudbuild.yaml</code>、コンテナビルド、SLSA、provenance、アテステーション
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>2.3 テスト</td>
                                    <td>
                                        Gemini Code Assist（単体テスト生成）、Cloud Build（統合テスト）
                                    </td>
                                    <td>
                                        AI支援テスト生成、docker-compose、一時GKEクラスタ、<code>waitFor</code>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p>
                        セクション2全体を通じて一貫しているのは、「<strong>ローカルでの高速なフィードバックループ</strong>（エミュレータ・IDE統合）」と「<strong>CI/CDパイプラインでの再現可能かつ検証可能なビルド・テスト</strong>（Cloud Build・Artifact Registry・Binary Authorization）」という2つの軸です。試験対策としては、それぞれのサービスが「どの工程で」「何を目的に」使われるのかを、単なる用語の暗記ではなく一連のパイプラインの流れとして理解しておくことが重要です。
                    </p>

                    <hr />

                    <h2 id="参考文献">参考文献</h2>

                    <div className="ref-grid" id="referenceGrid">
                        <div className="ref-card" id="ref1">
                            <div className="num">1</div>
                            <div className="txt">
                                <strong>開発環境（2.1関連）</strong>
                                <br />
                                <a href="https://cloud.google.com/cli">
                                    gcloud CLI（コマンドラインインターフェース）概要
                                </a>
                                <br />
                                <a href="https://docs.cloud.google.com/sdk/gcloud/reference/beta/emulators">
                                    gcloud beta emulators コマンドリファレンス
                                </a>
                                <br />
                                <a href="https://docs.cloud.google.com/pubsub/docs/emulator">
                                    Pub/Subエミュレータを使ったローカルテスト
                                </a>
                                <br />
                                <a href="https://testcontainers.com/modules/google-cloud/">
                                    Testcontainers Google Cloud Module
                                </a>
                                <br />
                                <a href="https://docs.cloud.google.com/code/docs/vscode/overview">
                                    Cloud Code for VS Code 概要
                                </a>
                                <br />
                                <a href="https://docs.cloud.google.com/code/docs/intellij/overview">
                                    Cloud Code for IntelliJ 概要
                                </a>
                                <br />
                                <a href="https://docs.cloud.google.com/cloud-assist/overview">
                                    Gemini Cloud Assist 概要
                                </a>
                                <br />
                                <a href="https://docs.cloud.google.com/cloud-assist/chat-panel">
                                    Gemini Cloud Assistの利用（Cloud Consoleのチャットパネル）
                                </a>
                                <br />
                                <a href="https://cloud.google.com/products/gemini/cloud-assist">
                                    Gemini Cloud Assist（製品ページ）
                                </a>
                                <br />
                                <a href="https://docs.cloud.google.com/gemini/docs/cloud-assist/set-up-gemini">
                                    Gemini Cloud Assistのセットアップ
                                </a>
                                <br />
                                <a href="https://docs.cloud.google.com/shell/docs">
                                    Cloud Shellドキュメント
                                </a>
                                <br />
                                <a href="https://docs.cloud.google.com/shell/docs/using-cloud-shell">
                                    Cloud Shellの使い方
                                </a>
                                <br />
                                <a href="https://docs.cloud.google.com/workstations/docs/overview">
                                    Cloud Workstations概要
                                </a>
                                <br />
                                <a href="https://cloud.google.com/blog/products/application-development/cloud-workstations-managed-development-environment-is-now-ga">
                                    Cloud Workstationsマネージド開発環境のGA発表（Google Cloudブログ）
                                </a>
                                <br />
                                <a href="https://docs.cloud.google.com/docs/authentication/application-default-credentials">
                                    ADC（Application Default Credentials）の仕組み
                                </a>
                                <br />
                                <a href="https://docs.cloud.google.com/docs/authentication/provide-credentials-adc">
                                    ADCの資格情報を提供する方法
                                </a>
                                <br />
                                <a href="https://docs.cloud.google.com/docs/authentication/set-up-adc-local-dev-environment">
                                    ローカル開発環境向けADCの設定
                                </a>
                                <br />
                                <a href="https://docs.cloud.google.com/sdk/gcloud/reference/auth/application-default">
                                    gcloud auth application-default コマンドリファレンス
                                </a>
                                <br />
                                <a href="https://docs.cloud.google.com/gemini/docs/codeassist/overview">
                                    Gemini Code Assist Standard／Enterprise 概要
                                </a>
                                <br />
                                <a href="https://docs.cloud.google.com/gemini/docs/codeassist/write-code-gemini">
                                    Gemini Code AssistでのコーディングSmart Actions
                                </a>
                                <br />
                                <a href="https://developers.google.com/gemini-code-assist/docs/use-agentic-chat-pair-programmer">
                                    Gemini Code Assist エージェントモードの利用（MCPサーバー設定を含む）
                                </a>
                                <br />
                                <a href="https://docs.cloud.google.com/gemini/docs/codeassist/release-notes">
                                    Gemini Code Assist リリースノート
                                </a>
                                <br />
                                <a href="https://docs.cloud.google.com/cloud-assist/use-gemini-cloud-assist-mcp">
                                    Gemini Cloud AssistのリモートMCPサーバーの利用
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref2">
                            <div className="num">2</div>
                            <div className="txt">
                                <strong>ビルド（2.2関連）</strong>
                                <br />
                                <a href="https://docs.cloud.google.com/build/docs/overview">
                                    Cloud Buildの概要
                                </a>
                                <br />
                                <a href="https://docs.cloud.google.com/artifact-registry/docs/overview">
                                    Artifact Registryの概要
                                </a>
                                <br />
                                <a href="https://docs.cloud.google.com/artifact-registry/docs/build">
                                    Artifact Registryへのビルド成果物の格納
                                </a>
                                <br />
                                <a href="https://codelabs.developers.google.com/secure-build-deploy-cloud-build-ar-gke">
                                    Cloud BuildとArtifact RegistryによるセキュアなビルドとGKEへのデプロイ（Codelab）
                                </a>
                                <br />
                                <a href="https://docs.cloud.google.com/build/docs/securing-builds/generate-validate-build-provenance">
                                    ビルドprovenanceの生成と検証
                                </a>
                                <br />
                                <a href="https://docs.cloud.google.com/binary-authorization/docs/cv-slsa-check">
                                    Binary AuthorizationのSLSAチェック（継続的検証）
                                </a>
                                <br />
                                <a href="https://cloud.google.com/blog/products/application-development/google-introduces-slsa-framework">
                                    GoogleによるSLSAフレームワークの紹介（Google Cloudブログ）
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref3">
                            <div className="num">3</div>
                            <div className="txt">
                                <strong>テスト（2.3関連）</strong>
                                <br />
                                <a href="https://docs.cloud.google.com/gemini/docs/codeassist/overview">
                                    Gemini Code Assist Standard／Enterprise 概要
                                </a>
                                <br />
                                <a href="https://docs.cloud.google.com/gemini/docs/codeassist/write-code-gemini">
                                    Gemini Code AssistでのコーディングSmart Actions（単体テスト生成を含む）
                                </a>
                                <br />
                                <a href="https://docs.cloud.google.com/gemini/docs/codeassist/release-notes">
                                    Gemini Code Assist リリースノート
                                </a>
                                <br />
                                <a href="https://docs.cloud.google.com/build/docs/overview">
                                    Cloud Buildの概要（ビルドステップとしてのテスト実行）
                                </a>
                                <br />
                                <a href="https://github.com/GoogleCloudPlatform/cloudbuild-integration-testing">
                                    cloudbuild-integration-testing（GoogleCloudPlatform公式サンプルリポジトリ）
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref4">
                            <div className="num">4</div>
                            <div className="txt">
                                <strong>試験ガイド本体</strong>
                                <br />
                                <a href="https://cloud.google.com/learn/certification/cloud-developer">
                                    Professional Cloud Developer 認定ページ（Google Cloud）
                                </a>
                                <br />
                                <a href="https://services.google.com/fh/files/misc/professional_cloud_developer_exam_guide_english.pdf">
                                    Professional Cloud Developer Exam Guide（公式PDF）
                                </a>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
