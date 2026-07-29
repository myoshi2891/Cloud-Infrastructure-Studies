'use client';

import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS } from './constants';
import { NavBar } from './NavBar';
import './page.css';

/**
 * Renders the Mermaid diagram associated with a diagram identifier.
 *
 * @param id - The identifier of the diagram to render
 * @param label - The accessible label for the rendered diagram
 */
function Diagram({ id, label }: { id: keyof typeof DIAGRAMS; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-figure">
            <div className="mermaid-wrap">
                <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale />
            </div>
        </div>
    );
}

/**
 * Renders the Japanese study guide for AWS Certified Solutions Architect – Associate Domain 2.
 */
export function Domain2Guide() {
    return (
        <div className="domain2-page">
            <div className="layout">
                <NavBar />

                <main className="content">
                    <div className="hero">
                        <div className="eyebrow">
                            AWS Certified Solutions Architect – Associate (SAA-C03)
                        </div>
                        <h1>
                            ドメイン2: 回復力のあるアーキテクチャの設計
                            <br />
                            完全ガイド（初級者向け）
                        </h1>
                        <div className="subtitle">
                            出題比率26%、SAA-C03最大のドメインを、公式試験ガイドのタスクステートメントに沿ってステップバイステップで解説します。
                        </div>
                    </div>

                    <div className="lede">
                        本ガイドは AWS 公式試験ガイド{' '}
                        <a
                            href="https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            SAA-C03 Exam Guide
                        </a>{' '}
                        および{' '}
                        <a
                            href="https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain2.html"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Domain 2 詳細ページ
                        </a>{' '}
                        に基づき、出題範囲の各知識・スキル項目をステップバイステップで解説します。フローチャートは
                        Mermaid、図解・比較表は Markdown 記法で統一し、ASCII 図は使用していません。
                    </div>

                    <h2 id="sec-0">0. このガイドについて</h2>

                    <h3 id="sec-0-1">0.1 SAA-C03 試験全体における位置づけ</h3>
                    <p>
                        SAA-C03 試験は 4
                        つのドメインで構成されており、ドメイン2「回復力のあるアーキテクチャの設計」は出題比率{' '}
                        <strong>26%</strong> と、4 ドメインの中で大きな比重を占めます。
                    </p>
                    <Diagram id="m1" label="SAA-C03 出題ドメイン別の比率" />

                    <h3 id="sec-0-2">0.2 ドメイン2の2つのタスク</h3>
                    <p>
                        AWS公式試験ガイドでは、ドメイン2は以下の2つのタスクステートメントに分かれています。
                    </p>
                    <Diagram id="m2" label="ドメイン2の2つのタスクステートメント" />
                    <p>
                        本ガイドはこの2タスクの構成に沿って、初級者でも理解できるようステップバイステップで解説していきます。
                    </p>

                    <h2 id="sec-1">
                        1. タスク2.1: スケーラブルで疎結合なアーキテクチャの設計
                    </h2>

                    <h3 id="sec-1-1">1.1 マルチティア（多層）アーキテクチャの基本</h3>
                    <p>
                        <strong>なぜ必要か</strong>:
                        1台のサーバーにすべての処理（画面表示・業務ロジック・データ保存）を詰め込むと、負荷が増えたときにサーバー全体を止めてスケールアップするしかなく、可用性もスケーラビリティも低くなります。マルチティアアーキテクチャは、役割ごとにサーバー群（ティア）を分離することで、各層を独立してスケール・保守できるようにする設計です。
                    </p>
                    <Diagram id="m3" label="マルチティアアーキテクチャの基本構造" />

                    <div className="mini-heading">各層の役割</div>
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">ティア</th>
                                    <th scope="col">役割</th>
                                    <th scope="col">代表サービス</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>プレゼンテーション層</td>
                                    <td>ユーザーからのリクエストを受け取り画面を返す</td>
                                    <td>CloudFront, ALB, EC2, S3(静的ホスティング)</td>
                                </tr>
                                <tr>
                                    <td>アプリケーション層</td>
                                    <td>ビジネスロジックの実行</td>
                                    <td>EC2, ECS/EKS, Lambda, API Gateway</td>
                                </tr>
                                <tr>
                                    <td>データ層</td>
                                    <td>データの永続化・キャッシュ</td>
                                    <td>RDS, DynamoDB, ElastiCache, EFS</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="practice-box">
                        <div className="practice-title">ベストプラクティス</div>
                        <ul>
                            <li>
                                各ティアはセキュリティグループ／サブネットで分離し、最小権限で通信させる（Webティアのみインターネット向け、データ層はプライベートサブネットに配置）。
                            </li>
                            <li>
                                層と層の間は疎結合にし、片方の層の障害・スケーリングがもう片方に直接影響しないようにする。
                            </li>
                            <li>
                                各ティアを独立した Auto Scaling
                                グループ／サービスとして構成し、負荷特性に応じて個別にスケールできるようにする。
                            </li>
                        </ul>
                    </div>

                    <div className="source-box">
                        <span className="source-label">出典</span>
                        <span className="source-links">
                            <a
                                href="https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                AWS Well-Architected Framework - Reliability Pillar
                            </a>
                        </span>
                    </div>

                    <h3 id="sec-1-2">
                        1.2 疎結合アーキテクチャとメッセージング（SQS / SNS / EventBridge）
                    </h3>
                    <p>
                        <strong>密結合の問題点</strong>:
                        あるコンポーネントが別のコンポーネントを直接同期呼び出しする設計（密結合）では、呼び出し先が遅い・落ちているとリクエスト全体が失敗し、障害が連鎖的に広がります（カスケード障害）。<strong>疎結合</strong>では、コンポーネント間にキューやイベントバスのような緩衝材を挟み、互いの可用性やスケーリング状況に依存しない設計にします。
                    </p>
                    <Diagram id="m4" label="メッセージングによる疎結合アーキテクチャ" />

                    <div className="mini-heading">主要サービスの役割</div>
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">サービス</th>
                                    <th scope="col">モデル</th>
                                    <th scope="col">特徴</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Amazon SQS</td>
                                    <td>キュー（Point-to-Point）</td>
                                    <td>
                                        メッセージを一時的に保持。Producer と Consumer
                                        の処理速度差を吸収するバッファ。可視性タイムアウト・DLQ・遅延キューをサポート
                                    </td>
                                </tr>
                                <tr>
                                    <td>Amazon SNS</td>
                                    <td>Pub/Sub（Publish/Subscribe）</td>
                                    <td>
                                        1つのメッセージを複数のサブスクライバーに同時配信（ファンアウト）
                                    </td>
                                </tr>
                                <tr>
                                    <td>Amazon EventBridge</td>
                                    <td>イベントバス</td>
                                    <td>
                                        複数の AWS サービスや SaaS
                                        からのイベントをルールに基づき多数のターゲットにルーティング。スキーマレジストリも提供
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="practice-box">
                        <div className="practice-title">ベストプラクティス</div>
                        <ul>
                            <li>
                                SQS の可視性タイムアウトは、Consumer
                                の平均処理時間より長く設定する（処理中に他のワーカーが同じメッセージを取得しないようにする）。
                            </li>
                            <li>
                                一定回数処理に失敗したメッセージは
                                <strong>デッドレターキュー(DLQ)</strong>
                                に退避させ、失敗したメッセージでキューが詰まる（ポイズンメッセージ問題）のを防ぐ。
                            </li>
                            <li>
                                1つの発行元から複数の購読者に同時配信したい場合は SNS + SQS
                                のファンアウトパターンを使う。
                            </li>
                            <li>
                                複数のイベントソース・多様なターゲットへの複雑なルーティングが必要な場合は
                                EventBridge を検討する。
                            </li>
                            <li>
                                疎結合にすることで、各コンポーネントを個別に Auto Scaling
                                でき、あるコンポーネントの障害が他に伝播しにくくなる。
                            </li>
                        </ul>
                    </div>

                    <div className="source-box">
                        <span className="source-label">出典</span>
                        <span className="source-links">
                            <a
                                href="https://docs.aws.amazon.com/decision-guides/latest/sns-or-sqs-or-eventbridge/sns-or-sqs-or-eventbridge.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                SNS or SQS or EventBridge 選択ガイド
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/publish-subscribe.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Publish-subscribe パターン (Prescriptive Guidance)
                            </a>
                        </span>
                    </div>

                    <h3 id="sec-1-3">
                        1.3 API の作成・公開・管理（Amazon API Gateway）
                    </h3>
                    <p>
                        API Gateway は、バックエンド（Lambda、EC2、他の AWS
                        サービス、オンプレミス等）への「フロントドア」として、REST/HTTP/WebSocket API
                        を作成・公開・保護・監視するためのフルマネージドサービスです。
                    </p>
                    <Diagram id="m5" label="API Gateway とバックエンドの連携フロー" />

                    <div className="mini-heading">REST API と HTTP API の比較</div>
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">項目</th>
                                    <th scope="col">REST API</th>
                                    <th scope="col">HTTP API</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>機能セット</td>
                                    <td>
                                        フル機能（APIキー、リクエストバリデーション、WAF統合、キャッシュ等）
                                    </td>
                                    <td>軽量・低コスト（プロキシ機能中心）</td>
                                </tr>
                                <tr>
                                    <td>コスト</td>
                                    <td>相対的に高い</td>
                                    <td>REST APIより低コスト</td>
                                </tr>
                                <tr>
                                    <td>用途</td>
                                    <td>高度なAPI管理機能が必要な場合</td>
                                    <td>シンプルなプロキシ／低レイテンシが目的の場合</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="practice-box">
                        <div className="practice-title">ベストプラクティス</div>
                        <ul>
                            <li>
                                スロットリング（レート制限・バーストリミット）を設定し、バックエンドをトラフィック急増から保護する。
                            </li>
                            <li>
                                レスポンスキャッシュを有効化し、頻繁に呼ばれる同一リクエストへのバックエンド負荷を減らす。
                            </li>
                            <li>
                                IAM、Lambda オーソライザー、Amazon Cognito
                                ユーザープールなどで認証・認可を必ず実装する。
                            </li>
                            <li>
                                Amazon CloudWatch
                                と統合してAPI呼び出し数・レイテンシ・エラー率を監視する。
                            </li>
                        </ul>
                    </div>

                    <div className="source-box">
                        <span className="source-label">出典</span>
                        <span className="source-links">
                            <a
                                href="https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Amazon API Gateway とは
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-vs-rest.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                REST APIとHTTP APIの選択
                            </a>
                        </span>
                    </div>

                    <h3 id="sec-1-4">
                        1.4 水平スケーリングと垂直スケーリング（Amazon EC2 Auto Scaling）
                    </h3>
                    <p>
                        <strong>垂直スケーリング（スケールアップ／ダウン）</strong>:
                        インスタンスタイプを大きく（または小さく）することでリソースを増減させる方式。単純だが上限があり、変更時にダウンタイムが生じやすい。
                    </p>
                    <p>
                        <strong>水平スケーリング（スケールアウト／イン）</strong>:
                        インスタンスの「台数」を増減させる方式。台数を分散させることで単一障害点を減らしつつ需要に追従できる、クラウドネイティブなスケーリング手法です。
                    </p>
                    <Diagram id="m6" label="EC2 Auto Scaling の仕組み" />

                    <div className="mini-heading">Auto Scaling の主要スケーリングポリシー</div>
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">ポリシー種別</th>
                                    <th scope="col">説明</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ターゲット追跡スケーリング</td>
                                    <td>
                                        CPU使用率など特定メトリクスを目標値に維持するよう自動調整（推奨・最も簡単）
                                    </td>
                                </tr>
                                <tr>
                                    <td>ステップスケーリング</td>
                                    <td>アラームの逸脱幅に応じて段階的にスケール量を変える</td>
                                </tr>
                                <tr>
                                    <td>シンプルスケーリング</td>
                                    <td>単一の増減幅でスケール（旧世代の方式）</td>
                                </tr>
                                <tr>
                                    <td>スケジュールスケーリング</td>
                                    <td>
                                        予測できる負荷パターン（毎朝9時など）に合わせて事前にスケール
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="practice-box">
                        <div className="practice-title">ベストプラクティス</div>
                        <ul>
                            <li>
                                複数の Availability Zone にまたがって Auto Scaling
                                グループを構成し、AZ障害時にも自動復旧できるようにする。
                            </li>
                            <li>
                                ヘルスチェック（EC2 +
                                ELB）を有効にし、不健全なインスタンスを自動的に入れ替える。
                            </li>
                            <li>
                                ウォームプールやライフサイクルフックを使い、起動時間の長いアプリケーションでも迅速にスケールできるようにする。
                            </li>
                            <li>
                                垂直スケーリングは根本的な上限があるため、可用性・回復性の観点では水平スケーリングを優先する設計が推奨される。
                            </li>
                        </ul>
                    </div>

                    <div className="source-box">
                        <span className="source-label">出典</span>
                        <span className="source-links">
                            <a
                                href="https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Amazon EC2 Auto Scaling とは
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://docs.aws.amazon.com/autoscaling/plans/userguide/best-practices-for-scaling-plans.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                スケーリングプランのベストプラクティス
                            </a>
                        </span>
                    </div>

                    <h3 id="sec-1-5">
                        1.5 ロードバランシングの概念（ALB / NLB / GWLB）
                    </h3>
                    <p>
                        Elastic Load Balancing (ELB)
                        は複数のターゲットにトラフィックを分散し、単一障害点を排除しながら可用性を高めるサービスです。用途に応じて3種類のロードバランサーを使い分けます。
                    </p>
                    <Diagram id="m7" label="ロードバランサー選択フロー" />

                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">種別</th>
                                    <th scope="col">レイヤー</th>
                                    <th scope="col">主なユースケース</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Application Load Balancer (ALB)</td>
                                    <td>L7</td>
                                    <td>
                                        Webアプリ、マイクロサービス、コンテナ、パス/ホストベースルーティング
                                    </td>
                                </tr>
                                <tr>
                                    <td>Network Load Balancer (NLB)</td>
                                    <td>L4</td>
                                    <td>
                                        超高スループット、低レイテンシ、TCP/UDPベースのアプリ、固定IP要件
                                    </td>
                                </tr>
                                <tr>
                                    <td>Gateway Load Balancer (GWLB)</td>
                                    <td>L3/GENEVE</td>
                                    <td>
                                        ファイアウォールやIDS/IPSなどセキュリティアプライアンスへの透過的なトラフィック転送
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="practice-box">
                        <div className="practice-title">ベストプラクティス</div>
                        <ul>
                            <li>
                                ロードバランサー自体は複数AZにまたがる形でデプロイし、クロスゾーン負荷分散を有効化する。
                            </li>
                            <li>
                                ALB / NLB
                                のヘルスチェックを適切な間隔・しきい値で設定し、不健全なターゲットに即座にトラフィックを送らないようにする。
                            </li>
                            <li>
                                ロードバランサーを Auto Scaling
                                グループと組み合わせることで、需要に応じたスケーラブルかつ高可用なフロントエンドを構築する。
                            </li>
                        </ul>
                    </div>

                    <div className="source-box">
                        <span className="source-label">出典</span>
                        <span className="source-links">
                            <a
                                href="https://docs.aws.amazon.com/eks/latest/best-practices/load-balancing.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                EKS ベストプラクティス - ロードバランシング
                            </a>
                        </span>
                    </div>

                    <h3 id="sec-1-6">
                        1.6 キャッシング戦略（Amazon CloudFront / ElastiCache / DAX）
                    </h3>
                    <p>
                        キャッシュは「よく使われるデータ」をオリジンより近い場所・高速な媒体に一時保存することで、レイテンシ削減とバックエンド負荷の軽減を同時に実現する、パフォーマンスと回復性の両面で重要な技術です。
                    </p>
                    <Diagram id="m8" label="AWSのキャッシュレイヤー配置図" />

                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">サービス</th>
                                    <th scope="col">キャッシュ対象</th>
                                    <th scope="col">特徴</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Amazon CloudFront</td>
                                    <td>静的/動的コンテンツ、API応答</td>
                                    <td>
                                        世界中のエッジロケーションでユーザーに最も近い場所から配信、オリジン負荷を大幅軽減
                                    </td>
                                </tr>
                                <tr>
                                    <td>Amazon ElastiCache (Redis/Memcached)</td>
                                    <td>DBクエリ結果、セッション情報等</td>
                                    <td>インメモリで数ミリ秒未満の応答、アプリ層とDB層の間に設置</td>
                                </tr>
                                <tr>
                                    <td>DynamoDB Accelerator (DAX)</td>
                                    <td>DynamoDBの読み取り結果</td>
                                    <td>マイクロ秒単位の応答、DynamoDB API互換でコード変更が少ない</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="practice-box">
                        <div className="practice-title">ベストプラクティス</div>
                        <ul>
                            <li>
                                静的アセット（画像・CSS・JS）は CloudFront
                                で積極的にキャッシュし、TTL（有効期限）を適切に設定する。
                            </li>
                            <li>
                                セッション情報など「ステートフルなデータ」はアプリケーションサーバーではなく
                                ElastiCache
                                のような外部ストアに保持し、アプリ層をステートレスにする。
                            </li>
                            <li>
                                キャッシュ更新（無効化）戦略を設計段階で決めておく（Cache-Aside、Write-Through等）。
                            </li>
                            <li>
                                キャッシュはパフォーマンス向上だけでなく、バックエンドDBへの負荷集中を防ぎ、結果的にDB層の可用性・回復性向上にも寄与する。
                            </li>
                        </ul>
                    </div>

                    <div className="source-box">
                        <span className="source-label">出典</span>
                        <span className="source-links">
                            <a
                                href="https://aws.amazon.com/caching/aws-caching/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                AWS Caching Solutions
                            </a>
                        </span>
                    </div>

                    <h3 id="sec-1-7">
                        1.7 サーバーレス技術とコンピューティングオプションの選択
                    </h3>
                    <p>
                        サーバーレスとは、サーバーのプロビジョニングやパッチ適用、スケーリング管理を AWS
                        側に任せ、開発者がコードとビジネスロジックに集中できるモデルです。回復性の観点では、サーバー管理を排除することで人為的ミスによる障害要因を減らせる利点があります。
                    </p>
                    <Diagram id="m9" label="コンピューティングサービスと管理責任の範囲" />

                    <div className="mini-heading">Lambda と Fargate の使い分け</div>
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">観点</th>
                                    <th scope="col">AWS Lambda</th>
                                    <th scope="col">AWS Fargate</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>適した処理</td>
                                    <td>イベント駆動・短時間実行のタスク</td>
                                    <td>長時間実行、複雑な複数サービス構成</td>
                                </tr>
                                <tr>
                                    <td>起動単位</td>
                                    <td>関数（リクエストごとに環境をプロビジョニング）</td>
                                    <td>タスク/Pod単位でコンテナを起動</td>
                                </tr>
                                <tr>
                                    <td>実行時間の制約</td>
                                    <td>最大15分</td>
                                    <td>制約なし（長時間稼働可能）</td>
                                </tr>
                                <tr>
                                    <td>スケーリング</td>
                                    <td>リクエスト数に応じ自動・瞬時</td>
                                    <td>ECS/EKSのオートスケーリング設定に依存</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="practice-box">
                        <div className="practice-title">ベストプラクティス</div>
                        <ul>
                            <li>
                                単純なイベント処理（画像リサイズ、APIバックエンドの一部処理等）は Lambda
                                を検討する。
                            </li>
                            <li>
                                常駐が必要な複雑なアプリケーションやマイクロサービスは
                                Fargate（サーバーレスコンテナ）を検討し、EC2インスタンスの管理負担を減らす。
                            </li>
                            <li>
                                サーバーレス化によって「単一のEC2インスタンス障害」という単一障害点を根本的に排除できる点が、回復性向上の観点で重要。
                            </li>
                        </ul>
                    </div>

                    <div className="source-box">
                        <span className="source-label">出典</span>
                        <span className="source-links">
                            <a
                                href="https://docs.aws.amazon.com/decision-guides/latest/fargate-or-lambda/fargate-or-lambda.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Fargate or Lambda 選択ガイド
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://aws.amazon.com/fargate/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                AWS Fargate
                            </a>
                        </span>
                    </div>

                    <h3 id="sec-1-8">
                        1.8 コンテナの移行とオーケストレーション（Amazon ECS / Amazon EKS）
                    </h3>
                    <p>
                        コンテナは、アプリケーションとその依存関係をパッケージ化し、環境に依存せず一貫して動作させる技術です。AWS
                        ではコンテナの実行・管理（オーケストレーション）のために ECS と EKS
                        の2つのマネージドサービスを提供しています。
                    </p>
                    <Diagram id="m10" label="コンテナオーケストレーションの選択フロー" />

                    <div className="practice-box">
                        <div className="practice-title">ベストプラクティス</div>
                        <ul>
                            <li>
                                タスク／Podは複数のAZに分散配置し、単一AZ障害時にもサービスを継続できるようにする。
                            </li>
                            <li>
                                コンテナは「イミュータブル（不変）」に扱い、変更が必要な場合は新しいイメージをビルドしてデプロイする。
                            </li>
                            <li>
                                ローリングアップデートやBlue/Greenデプロイと組み合わせ、更新時のダウンタイムを回避する。
                            </li>
                            <li>
                                既存のオンプレミスアプリケーションをコンテナ化して移行する場合は AWS
                                App2Container のようなツールでの移行も選択肢となる。
                            </li>
                        </ul>
                    </div>

                    <div className="source-box">
                        <span className="source-label">出典</span>
                        <span className="source-links">
                            <a
                                href="https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Amazon ECS とは
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://docs.aws.amazon.com/decision-guides/latest/containers-on-aws-how-to-choose/choosing-aws-container-service.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                AWSコンテナサービスの選択ガイド
                            </a>
                        </span>
                    </div>

                    <h3 id="sec-1-9">
                        1.9 マイクロサービス設計原則：ステートレス vs ステートフル
                    </h3>
                    <p>
                        <strong>ステートフルなアプリケーション</strong>
                        は、セッション情報やユーザーの状態をサーバー自身のメモリ／ディスクに保持します。この場合、そのユーザーは常に「同じサーバー」に接続し続ける必要があり（スティッキーセッション）、そのサーバーが落ちると状態を失い、スケールアウトも困難になります。
                    </p>
                    <p>
                        <strong>ステートレスなアプリケーション</strong>
                        は、状態を一切保持せず、外部の共有ストア（ElastiCache、DynamoDB等）に状態を移すことで、<strong>どのサーバーに接続してもリクエストを処理できる</strong>ようにする設計です。これは水平スケーリング・自己修復（Auto
                        Scaling による自動置き換え）を実現するための基盤となる考え方です。
                    </p>
                    <Diagram id="m11" label="ステートフル設計 vs ステートレス設計" />

                    <div className="practice-box">
                        <div className="practice-title">ベストプラクティス</div>
                        <ul>
                            <li>
                                セッション状態は ElastiCache（Redis）や DynamoDB
                                のような外部の耐久性あるストアに保存する。
                            </li>
                            <li>
                                アプリケーションサーバーのローカルディスクに重要なデータを保存しない（インスタンス終了とともに失われるため）。
                            </li>
                            <li>
                                ステートレス設計により、任意のサーバーが障害を起こしても Auto Scaling
                                が別のサーバーに置き換えるだけで、ユーザー体験への影響を最小化できる。
                            </li>
                        </ul>
                    </div>

                    <div className="source-box">
                        <span className="source-label">出典</span>
                        <span className="source-links">
                            <a
                                href="https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                AWS Well-Architected Framework - Reliability Pillar
                            </a>
                        </span>
                    </div>

                    <h3 id="sec-1-10">
                        1.10 イベント駆動アーキテクチャとワークフローオーケストレーション（AWS Step
                        Functions）
                    </h3>
                    <p>
                        複数のサービスが連携する処理では、<strong>イベント駆動（Choreography）</strong>
                        と
                        <strong>オーケストレーション（Orchestration）</strong>
                        という2つの制御スタイルがあります。
                    </p>
                    <ul className="plain-list">
                        <li>
                            <strong>Choreography（振り付け型）</strong>:
                            各サービスがイベントを発行し合い、中央の管理者なしに連鎖的に処理が進む（EventBridge等を利用）。疎結合だが、全体のフローの見通しは悪くなりがち。
                        </li>
                        <li>
                            <strong>Orchestration（オーケストレーション型）</strong>:
                            中央のワークフローエンジン（AWS Step
                            Functions）が各ステップの実行順序・リトライ・エラー処理を明示的に管理する。
                        </li>
                    </ul>
                    <Diagram id="m12" label="Step Functions ワークフロー例" />

                    <div className="practice-box">
                        <div className="practice-title">ベストプラクティス</div>
                        <ul>
                            <li>
                                複数ステップにまたがる長時間処理・複雑な条件分岐・エラーハンドリングが必要な場合は
                                Step Functions によるオーケストレーションを検討する。
                            </li>
                            <li>
                                Step Functions の
                                <strong>Standard ワークフロー</strong>
                                （長時間実行・厳密な実行回数保証が必要な場合）と
                                <strong>Express ワークフロー</strong>
                                （高頻度・短時間のイベント処理に最適化）を用途に応じて使い分ける。
                            </li>
                            <li>
                                Step Functions は AWS X-Ray
                                と統合してワークフロー全体のトレースを可視化できる。
                            </li>
                        </ul>
                    </div>

                    <div className="source-box">
                        <span className="source-label">出典</span>
                        <span className="source-links">
                            <a
                                href="https://docs.aws.amazon.com/step-functions/latest/dg/concepts-xray-tracing.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                AWS Step Functions と X-Ray の統合
                            </a>
                        </span>
                    </div>

                    <h3 id="sec-1-11">
                        1.11 ストレージタイプの選択（オブジェクト／ブロック／ファイルストレージ）
                    </h3>
                    <Diagram id="m13" label="AWSストレージタイプの選択フロー" />

                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">種別</th>
                                    <th scope="col">サービス例</th>
                                    <th scope="col">スコープ</th>
                                    <th scope="col">主な用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>オブジェクトストレージ</td>
                                    <td>Amazon S3</td>
                                    <td>リージョン内で自動的に複数AZへ複製</td>
                                    <td>静的コンテンツ、バックアップ、データレイク、ログ保管</td>
                                </tr>
                                <tr>
                                    <td>ブロックストレージ</td>
                                    <td>Amazon EBS</td>
                                    <td>単一AZ、単一インスタンスに接続（Multi-Attach可）</td>
                                    <td>データベースのデータボリューム、OSブートボリューム</td>
                                </tr>
                                <tr>
                                    <td>ファイルストレージ</td>
                                    <td>Amazon EFS</td>
                                    <td>リージョン内で複数AZ、複数インスタンス共有</td>
                                    <td>複数サーバーで共有するファイル領域、コンテンツ管理システム</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="practice-box">
                        <div className="practice-title">ベストプラクティス</div>
                        <ul>
                            <li>
                                大量の非構造化データ（画像・動画・ログ・バックアップ）は S3
                                に保存し、ストレージクラス（Standard, IA,
                                Glacier等）でコストと耐久性のバランスを取る。
                            </li>
                            <li>
                                データベースなど高いIOPSと低レイテンシが必要なワークロードは
                                EBS（Provisioned IOPS等）を使用する。
                            </li>
                            <li>
                                複数のコンテナ／インスタンスから同じファイルに同時アクセスする必要がある場合は
                                EFS を選択する。
                            </li>
                        </ul>
                    </div>

                    <div className="source-box">
                        <span className="source-label">出典</span>
                        <span className="source-links">
                            <a
                                href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Amazon S3 ストレージクラス概要
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://aws.amazon.com/efs/when-to-choose-efs/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Amazon EFS を選ぶべき時
                            </a>
                        </span>
                    </div>

                    <h3 id="sec-1-12">1.12 リードレプリカによる読み取りスケーリング</h3>
                    <p>
                        Amazon RDS の
                        <strong>リードレプリカ</strong>
                        は、プライマリDBインスタンスの変更を非同期でコピーした「読み取り専用」のインスタンスです。読み取りが多いワークロードで、読み取りトラフィックをレプリカに逃がすことでプライマリの負荷を軽減し、スケーラビリティを高めます（同一リージョン内・クロスリージョンの両方が可能）。
                    </p>
                    <Diagram id="m14" label="RDS リードレプリカのアーキテクチャ" />

                    <div className="practice-box">
                        <div className="practice-title">ベストプラクティス</div>
                        <ul>
                            <li>
                                リードレプリカはあくまで「読み取りスケーリング」が主目的であり、レプリケーションが非同期のため、障害復旧の主手段としては
                                Multi-AZ 配置と役割を分けて考える。
                            </li>
                            <li>
                                クロスリージョンのリードレプリカは、読み取り性能向上に加えてディザスタリカバリの補助（プライマリへ昇格させる）としても活用できる。
                            </li>
                            <li>
                                レプリカ数が増えるとレプリケーションラグが発生しうるため、アプリケーション側で結果整合性を許容できるかを設計時に検討する。
                            </li>
                        </ul>
                    </div>

                    <div className="source-box">
                        <span className="source-label">出典</span>
                        <span className="source-links">
                            <a
                                href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Amazon RDS リードレプリカの利用
                            </a>
                        </span>
                    </div>

                    <h2 id="sec-2">
                        2. タスク2.2: 高可用性・フォールトトレラントなアーキテクチャの設計
                    </h2>

                    <h3 id="sec-2-1">
                        2.1 AWSグローバルインフラストラクチャ（リージョン・アベイラビリティゾーン）
                    </h3>
                    <p>高可用性設計の出発点は、AWSの物理的なインフラ構造を理解することです。</p>
                    <Diagram id="m15" label="AWSグローバルインフラの概念図" />

                    <div className="mini-heading">重要な設計原則</div>
                    <ul className="plain-list">
                        <li>
                            各リージョンは最低3つの、物理的に離れた（が低レイテンシで接続された）AZで構成されており、1つのAZで火災・洪水・電源障害が起きても他のAZは影響を受けない設計。
                        </li>
                        <li>
                            リージョンは互いに完全に独立しているため、単一リージョンの大規模障害から保護するにはマルチリージョン設計が必要になる。
                        </li>
                        <li>
                            ワークロードを単一AZに閉じずに複数AZへ分散配置することが、高可用性設計の最も基本的かつ重要な手段。
                        </li>
                    </ul>

                    <div className="practice-box">
                        <div className="practice-title">ベストプラクティス</div>
                        <ul>
                            <li>
                                本番ワークロードは最低2つ、理想的には3つ以上のAZにまたがって配置する。
                            </li>
                            <li>
                                Auto Scaling グループ、RDS
                                Multi-AZ、複数AZにまたがるELBなど、マルチAZをネイティブサポートするサービスを積極的に利用する。
                            </li>
                        </ul>
                    </div>

                    <div className="source-box">
                        <span className="source-label">出典</span>
                        <span className="source-links">
                            <a
                                href="https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-regions-availability-zones.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                AWS リージョンとアベイラビリティゾーン
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://aws.amazon.com/about-aws/global-infrastructure/regions_az/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                AWS グローバルインフラストラクチャ
                            </a>
                        </span>
                    </div>

                    <h3 id="sec-2-2">
                        2.2 障害復旧（ディザスタリカバリ）戦略と RPO / RTO
                    </h3>
                    <p>
                        <strong>RPO（目標復旧時点: Recovery Point Objective）</strong>:
                        障害発生時に許容できる「データ損失の最大時間」。例えば
                        RPO=1時間なら、直近1時間分のデータ損失までは許容される。
                    </p>
                    <p>
                        <strong>RTO（目標復旧時間: Recovery Time Objective）</strong>:
                        障害発生からサービスを復旧させるまでに許容できる「最大時間」。
                    </p>
                    <p>
                        AWSでは、コストとRTO/RPOのトレードオフに応じて主に4つのDR戦略が定義されています。
                    </p>
                    <Diagram id="m16" label="4つのDR戦略のコストとRTO/RPOスペクトラム" />

                    <div className="mini-heading">各戦略の解説</div>
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">戦略</th>
                                    <th scope="col">概要</th>
                                    <th scope="col">平常時のセカンダリリージョンの状態</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Backup & Restore</td>
                                    <td>
                                        データを定期的にバックアップし、障害時に別リージョンでリソースを新規作成して復元
                                    </td>
                                    <td>リソース稼働なし（最も低コスト）</td>
                                </tr>
                                <tr>
                                    <td>Pilot Light</td>
                                    <td>
                                        中核となるデータベース等は常時レプリケーションしておくが、アプリケーション層は最小限（起動していない、または最小サイズ）
                                    </td>
                                    <td>DBのみ起動、その他は停止</td>
                                </tr>
                                <tr>
                                    <td>Warm Standby</td>
                                    <td>
                                        縮小版ながら本番と同じ構成のスタックを常時稼働させておき、障害時にスケールアップして切り替え
                                    </td>
                                    <td>フルスタックが縮小規模で常時稼働</td>
                                </tr>
                                <tr>
                                    <td>Multi-Site Active-Active</td>
                                    <td>
                                        複数リージョンで同時にフル本番トラフィックを処理し、片方が落ちてももう片方が即座に引き継ぐ
                                    </td>
                                    <td>フル規模で常時稼働・トラフィック処理中</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <Diagram id="m17" label="Pilot Light 構成例" />
                    <Diagram id="m18" label="Warm Standby 構成例" />
                    <Diagram id="m19" label="Multi-Site Active-Active 構成例" />

                    <div className="practice-box">
                        <div className="practice-title">ベストプラクティス</div>
                        <ul>
                            <li>
                                ビジネス上の要件（許容できる損失・停止時間）から明確に RPO と
                                RTO を算出し、それに見合う最適なDR戦略を選択する。
                            </li>
                            <li>
                                AWS Backup や Amazon S3
                                クロスリージョンレプリケーション（CRR）、DynamoDB
                                グローバルテーブルなどを利用して、データのバックアップ／自動複製を確実に自動化する。
                            </li>
                            <li>
                                定期的にDR切替訓練（ゲームデー）を実施し、実際に手動・自動でフェイルオーバーが期待通り動くかを検証する。
                            </li>
                        </ul>
                    </div>

                    <div className="source-box">
                        <span className="source-label">出典</span>
                        <span className="source-links">
                            <a
                                href="https://docs.aws.amazon.com/whitepapers/latest/aws-disaster-recovery-plan/disaster-recovery-options-in-aws.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                AWS Disaster Recovery Whitepaper
                            </a>
                        </span>
                    </div>

                    <h3 id="sec-2-3">
                        2.3 フェイルオーバー戦略（Amazon Route 53 ルーティングポリシー）
                    </h3>
                    <p>
                        高可用なアーキテクチャでは、障害時にトラフィックを健全な環境へ即座に迂回させるルーティング機能が必須です。Amazon
                        Route 53 は、DNS
                        ヘルスチェックと各種ルーティングポリシーを組み合わせることで自動フェイルオーバーを実現します。
                    </p>
                    <Diagram id="m20" label="Route 53 DNSフェイルオーバーの仕組み" />

                    <div className="mini-heading">Route 53 の主要ルーティングポリシー</div>
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">ポリシー</th>
                                    <th scope="col">用途・特徴</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>シンプル</td>
                                    <td>単一リソースへの基本的なルーティング</td>
                                </tr>
                                <tr>
                                    <td>加重（Weighted）</td>
                                    <td>
                                        指定した比率でトラフィックを複数リソースに振り分け（Blue/Greenやカナリアに活用）
                                    </td>
                                </tr>
                                <tr>
                                    <td>レイテンシベース</td>
                                    <td>
                                        ユーザーから見て最もレイテンシが低いリージョンにルーティング
                                    </td>
                                </tr>
                                <tr>
                                    <td>フェイルオーバー</td>
                                    <td>ヘルスチェック結果に基づきプライマリ/セカンダリを自動切替</td>
                                </tr>
                                <tr>
                                    <td>地理位置情報</td>
                                    <td>
                                        ユーザーの地理的位置に基づきルーティング（コンプライアンス要件等）
                                    </td>
                                </tr>
                                <tr>
                                    <td>複数値回答</td>
                                    <td>複数の正常なIPをランダムに返す（簡易的な負荷分散）</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="practice-box">
                        <div className="practice-title">ベストプラクティス</div>
                        <ul>
                            <li>
                                ヘルスチェックはアプリケーションの実際の状態（単なるTCP疎通ではなく、DB接続を含むエンドポイント応答等）を反映するよう設計する。
                            </li>
                            <li>
                                フェイルオーバールーティングと、DR戦略（Pilot Light / Warm Standby / Active-Active）を組み合わせて、実際に切替が発動する仕組みを構築する。
                            </li>
                            <li>
                                TTL（Time To Live）を適切に短く設定し、フェイルオーバー発生時にDNS変更が速やかにクライアントへ反映されるようにする。
                            </li>
                        </ul>
                    </div>

                    <div className="source-box">
                        <span className="source-label">出典</span>
                        <span className="source-links">
                            <a
                                href="https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Route 53 DNSフェイルオーバーの仕組み
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover-types.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                DNSフェイルオーバーの構成パターン
                            </a>
                        </span>
                    </div>

                    <h3 id="sec-2-4">
                        2.4 分散設計パターンとイミュータブルインフラストラクチャ
                    </h3>
                    <p>
                        <strong>イミュータブル（不変）インフラストラクチャ</strong>
                        とは、本番稼働中のサーバーに対して直接パッチ適用や設定変更を行わず、変更が必要な場合は新しいインフラを構築してデプロイし、検証後にトラフィックを切り替えるという設計モデルです。これにより「設定ドリフト（環境ごとの差異の蓄積）」を防ぎ、デプロイの信頼性を高めます。
                    </p>
                    <Diagram id="m21" label="Blue/Green デプロイメントのフロー" />

                    <div className="practice-box">
                        <div className="practice-title">ベストプラクティス</div>
                        <ul>
                            <li>
                                AWS CodeDeploy や AWS Elastic Beanstalk の Blue/Green
                                デプロイ機能を活用し、切替とロールバックを自動化する。
                            </li>
                            <li>
                                カナリアデプロイ（一部トラフィックのみ新バージョンに向ける）と組み合わせ、影響範囲を限定しながら段階的に展開する。
                            </li>
                            <li>
                                イミュータブルなデプロイは「デプロイは成功するか、何も変わらないか（部分的な中途半端な状態にならない）」という信頼性を提供する。
                            </li>
                        </ul>
                    </div>

                    <div className="source-box">
                        <span className="source-label">出典</span>
                        <span className="source-links">
                            <a
                                href="https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_tracking_change_management_immutable_infrastructure.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                REL08-BP04 イミュータブルインフラストラクチャによるデプロイ
                            </a>
                        </span>
                    </div>

                    <h3 id="sec-2-5">
                        2.5 プロキシ概念によるデータベース回復性の向上（Amazon RDS Proxy）
                    </h3>
                    <p>
                        アプリケーションが大量の同時接続をデータベースに直接張ると、DB側の接続数上限を圧迫し、特にLambdaのようにスケール時に接続数が急増するアーキテクチャでは問題が顕在化しやすくなります。
                        <strong>Amazon RDS Proxy</strong>
                        はアプリケーションとRDS/Auroraの間に立つ完全マネージドのコネクションプーラーで、接続を効率的にプール・再利用し、DBフェイルオーバー時の切替も高速化します。
                    </p>
                    <Diagram id="m22" label="RDS Proxy による接続プーリングと高速フェイルオーバー" />

                    <div className="practice-box">
                        <div className="practice-title">ベストプラクティス</div>
                        <ul>
                            <li>
                                Lambda など接続数が急増しやすいサーバーレスアーキテクチャでは RDS Proxy
                                の利用を検討し、DBの「too many connections」エラーを防ぐ。
                            </li>
                            <li>
                                RDS Proxy
                                はフェイルオーバー時の接続切替を高速化するため、アプリケーション側での複雑な再接続ロジックの実装が不要になり、可用性向上に寄与する。
                            </li>
                            <li>IAM認証と組み合わせることでDB認証情報の管理も簡素化できる。</li>
                        </ul>
                    </div>

                    <div className="source-box">
                        <span className="source-label">出典</span>
                        <span className="source-links">
                            <a
                                href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Amazon RDS Proxy とは
                            </a>
                        </span>
                    </div>

                    <h3 id="sec-2-6">2.6 ストレージの耐久性とレプリケーション設計</h3>
                    <p>
                        「耐久性（Durability）」と「可用性（Availability）」は似て非なる概念です。<strong>耐久性</strong>は「データが失われない確率」、<strong>可用性</strong>は「必要なときにアクセスできる確率」を指します。
                    </p>
                    <Diagram id="m23" label="S3のイレブンナイン耐久性の概念図" />

                    <div className="practice-box">
                        <div className="practice-title">ベストプラクティス</div>
                        <ul>
                            <li>
                                Amazon S3
                                は標準（Standard）ストレージクラスで、最低3つのAZにまたがってオブジェクトを冗長化し、単一AZの喪失を想定した耐久性設計になっている。
                            </li>
                            <li>
                                リージョン全体の障害に備える場合は、S3のクロスリージョンレプリケーション（CRR）でデータを別リージョンにも複製する。
                            </li>
                            <li>
                                誤削除・ランサムウェア対策として、S3のバージョニングとMFA Delete、Object
                                Lock（WORM）を組み合わせる。
                            </li>
                            <li>
                                EBSボリュームは単一AZに紐づくため、EBSスナップショットをS3（リージョンサービス）に定期取得することで、AZ障害からのデータ保護を行う。
                            </li>
                        </ul>
                    </div>

                    <div className="source-box">
                        <span className="source-label">出典</span>
                        <span className="source-links">
                            <a
                                href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/DataDurability.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Amazon S3 のデータ保護（耐久性）
                            </a>
                        </span>
                    </div>

                    <h3 id="sec-2-7">
                        2.7 サービスクォータとスロットリングを考慮した設計
                    </h3>
                    <p>
                        <strong>サービスクォータ（旧称: 制限/limits）</strong>
                        は、AWSアカウントで作成・利用できるリソースの上限値です。<strong>スロットリング</strong>は、APIリクエストの「頻度」が一定を超えた場合にリクエストを拒否・遅延させる仕組みです。この2つを理解せずに設計すると、スケールした瞬間に予期しないエラーで障害が発生することがあります。
                    </p>
                    <Diagram id="m24" label="サービスクォータの事前設計フロー" />

                    <div className="practice-box">
                        <div className="practice-title">ベストプラクティス</div>
                        <ul>
                            <li>
                                固定的なクォータ（例: Lambdaのペイロードサイズ上限、API
                                Gatewayのスロットルバーストレート）は変更できないため、アーキテクチャ側で制約を吸収する設計にする。
                            </li>
                            <li>
                                DR用のセカンダリリージョンでも本番と同等のクォータが確保されているかを事前に確認する（フェイルオーバー時にクォータ不足で復旧できないという事態を防ぐ）。
                            </li>
                            <li>
                                スロットリングエラーに対してはアプリケーション側で指数バックオフ・ジッターを用いたリトライを実装する。
                            </li>
                        </ul>
                    </div>

                    <div className="source-box">
                        <span className="source-label">出典</span>
                        <span className="source-links">
                            <a
                                href="https://docs.aws.amazon.com/servicequotas/latest/userguide/intro.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Service Quotas とは
                            </a>{' '}
                            /{' '}
                            <a
                                href="https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/rel_manage_service_limits_limits_considered.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Reliability Pillar - サービスクォータの管理
                            </a>
                        </span>
                    </div>

                    <h3 id="sec-2-8">
                        2.8 ワークロードの可視性（AWS X-Ray による分散トレーシング）
                    </h3>
                    <p>
                        マイクロサービス化・疎結合化が進むほど、「どのリクエストが、どのサービスで、なぜ遅い/失敗したのか」を追跡することが難しくなります。
                        <strong>AWS X-Ray</strong>
                        は分散システム全体をエンドツーエンドでトレースし、サービスマップとして可視化することで、ボトルネックや障害箇所の特定を容易にします。
                    </p>
                    <Diagram id="m25" label="X-Ray による分散トレーシングの仕組み" />

                    <div className="practice-box">
                        <div className="practice-title">ベストプラクティス</div>
                        <ul>
                            <li>
                                Lambda、ECS、EC2、API Gateway など主要コンポーネントに X-Ray
                                SDK/エージェントを組み込み、アプリケーション全体を通したトレーシングを有効化する。
                            </li>
                            <li>
                                個々のサービスのログ・メトリクスだけでなく、リクエスト単位の「横断的な」可視性を持つことで、疎結合アーキテクチャにおける障害切り分け時間を短縮できる。
                            </li>
                            <li>
                                Step Functions
                                のワークフローとも統合し、ステートマシン全体の実行状況を追跡できる。
                            </li>
                        </ul>
                    </div>

                    <div className="source-box">
                        <span className="source-label">出典</span>
                        <span className="source-links">
                            <a
                                href="https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                AWS X-Ray とは
                            </a>
                        </span>
                    </div>

                    <h3 id="sec-2-9">
                        2.9 レガシー・クラウド非対応アプリケーションの信頼性向上
                    </h3>
                    <p>
                        すべてのアプリケーションが最初からクラウドネイティブに設計されているわけではありません。既存のモノリシックなアプリケーションや、リファクタリングが困難なレガシーシステムでも、以下のようなAWSサービスを組み合わせることで、大きくコードを変えずに回復性を向上できます。
                    </p>
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">課題</th>
                                    <th scope="col">対応するAWSの仕組み</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>アプリケーションがスケールしない</td>
                                    <td>Application Load Balancer + Auto Scaling グループ配下に配置</td>
                                </tr>
                                <tr>
                                    <td>DBの直接接続数が多くフェイルオーバーに弱い</td>
                                    <td>Amazon RDS Proxy を挟んでコネクションプーリング</td>
                                </tr>
                                <tr>
                                    <td>インフラ管理の負担が大きい</td>
                                    <td>AWS Elastic Beanstalk でプラットフォーム管理を任せる</td>
                                </tr>
                                <tr>
                                    <td>コンテナ化を進めたいが移行作業が大変</td>
                                    <td>AWS App2Container 等の移行支援ツールを活用</td>
                                </tr>
                                <tr>
                                    <td>単一AZでしか稼働していない</td>
                                    <td>Multi-AZ配置・EFSでの共有ストレージ化</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="practice-box">
                        <div className="practice-title">ベストプラクティス</div>
                        <ul>
                            <li>
                                一足飛びに全面的な作り直し（リアーキテクト）を狙うのではなく、まずロードバランサー配下への移動・Multi-AZ化・RDS
                                Proxyの導入など「変更コストが低く効果が高い」対策から段階的に適用する。
                            </li>
                            <li>
                                Elastic Beanstalk
                                のようなマネージドプラットフォームを使うことで、パッチ適用やスケーリングの設定をAWSに任せつつ、既存コードをほぼそのまま活用できる。
                            </li>
                        </ul>
                    </div>

                    <div className="source-box">
                        <span className="source-label">出典</span>
                        <span className="source-links">
                            <a
                                href="https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                AWS Well-Architected Framework - Reliability Pillar
                            </a>
                        </span>
                    </div>

                    <h2 id="sec-3">3. まとめ：出題頻出ポイント チェックリスト</h2>
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">チェック項目</th>
                                    <th scope="col">関連キーワード</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>
                                        疎結合の実現手段（SQS/SNS/EventBridge）の使い分けを説明できる
                                    </td>
                                    <td>Point-to-Point, Pub/Sub, ファンアウト, DLQ</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>ステートレス設計の意味とセッションの外部化を説明できる</td>
                                    <td>ElastiCache, DynamoDB, スティッキーセッション</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>ALB/NLB/GWLBの違いとユースケースを判別できる</td>
                                    <td>L7/L4/L3, パスベースルーティング, 固定IP</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>
                                        水平/垂直スケーリングの違いとAuto Scalingのポリシーを説明できる
                                    </td>
                                    <td>ターゲット追跡, ステップスケーリング</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>
                                        S3/EBS/EFSの違い（オブジェクト/ブロック/ファイル）を判別できる
                                    </td>
                                    <td>11 9&apos;s耐久性, 単一AZ, マルチAZ共有</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>RTO/RPOの定義と4つのDR戦略の違いを説明できる</td>
                                    <td>Backup&Restore, Pilot Light, Warm Standby, Active-Active</td>
                                </tr>
                                <tr>
                                    <td>7</td>
                                    <td>
                                        Route
                                        53のルーティングポリシー、特にフェイルオーバーの仕組みを説明できる
                                    </td>
                                    <td>ヘルスチェック, 加重ルーティング</td>
                                </tr>
                                <tr>
                                    <td>8</td>
                                    <td>
                                        イミュータブルインフラ・Blue/Greenデプロイの利点を説明できる
                                    </td>
                                    <td>設定ドリフト, カナリアリリース</td>
                                </tr>
                                <tr>
                                    <td>9</td>
                                    <td>
                                        RDS
                                        Proxyの目的（コネクションプーリング、フェイルオーバー高速化）を説明できる
                                    </td>
                                    <td>Lambda + RDS接続数問題</td>
                                </tr>
                                <tr>
                                    <td>10</td>
                                    <td>
                                        サービスクォータとスロットリングの違い、DRリージョンでの考慮点を説明できる
                                    </td>
                                    <td>Service Quotas, Trusted Advisor, 指数バックオフ</td>
                                </tr>
                                <tr>
                                    <td>11</td>
                                    <td>X-Rayによる分散トレーシングの目的を説明できる</td>
                                    <td>サービスマップ, ボトルネック特定</td>
                                </tr>
                                <tr>
                                    <td>12</td>
                                    <td>
                                        リードレプリカとMulti-AZの目的の違い（読み取りスケーリング vs
                                        高可用性）を説明できる
                                    </td>
                                    <td>非同期レプリケーション, 同期レプリケーション</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h2 id="sec-4">4. 参考文献・出典一覧</h2>
                    <div className="ref-grid">
                        <div className="ref-category">
                            <div className="ref-category-title">公式試験ガイド</div>
                            <ul className="ref-list">
                                <li className="ref-item">
                                    <a
                                        href="https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span className="ref-item-title">
                                            SAA-C03 Exam Guide（試験ガイド全体）
                                        </span>
                                        <span className="ref-item-domain">docs.aws.amazon.com</span>
                                    </a>
                                </li>
                                <li className="ref-item">
                                    <a
                                        href="https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain2.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span className="ref-item-title">
                                            SAA-C03 Domain 2 詳細（タスクステートメント）
                                        </span>
                                        <span className="ref-item-domain">docs.aws.amazon.com</span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="ref-category">
                            <div className="ref-category-title">
                                AWS Well-Architected Framework（信頼性の柱）
                            </div>
                            <ul className="ref-list">
                                <li className="ref-item">
                                    <a
                                        href="https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span className="ref-item-title">
                                            AWS Well-Architected Framework - Reliability Pillar
                                        </span>
                                        <span className="ref-item-domain">docs.aws.amazon.com</span>
                                    </a>
                                </li>
                                <li className="ref-item">
                                    <a
                                        href="https://docs.aws.amazon.com/wellarchitected/latest/framework/reliability.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span className="ref-item-title">
                                            AWS Well-Architected Framework - Reliability
                                        </span>
                                        <span className="ref-item-domain">docs.aws.amazon.com</span>
                                    </a>
                                </li>
                                <li className="ref-item">
                                    <a
                                        href="https://docs.aws.amazon.com/wellarchitected/latest/framework/rel_tracking_change_management_immutable_infrastructure.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span className="ref-item-title">
                                            REL08-BP04
                                            イミュータブルインフラストラクチャによるデプロイ
                                        </span>
                                        <span className="ref-item-domain">docs.aws.amazon.com</span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="ref-category">
                            <div className="ref-category-title">疎結合・メッセージング</div>
                            <ul className="ref-list">
                                <li className="ref-item">
                                    <a
                                        href="https://docs.aws.amazon.com/decision-guides/latest/sns-or-sqs-or-eventbridge/sns-or-sqs-or-eventbridge.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span className="ref-item-title">
                                            SNS or SQS or EventBridge 選択ガイド
                                        </span>
                                        <span className="ref-item-domain">docs.aws.amazon.com</span>
                                    </a>
                                </li>
                                <li className="ref-item">
                                    <a
                                        href="https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/publish-subscribe.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span className="ref-item-title">
                                            Publish-Subscribe パターン
                                        </span>
                                        <span className="ref-item-domain">docs.aws.amazon.com</span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="ref-category">
                            <div className="ref-category-title">コンピューティング・コンテナ・API</div>
                            <ul className="ref-list">
                                <li className="ref-item">
                                    <a
                                        href="https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span className="ref-item-title">Amazon API Gateway とは</span>
                                        <span className="ref-item-domain">docs.aws.amazon.com</span>
                                    </a>
                                </li>
                                <li className="ref-item">
                                    <a
                                        href="https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-vs-rest.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span className="ref-item-title">REST APIとHTTP APIの選択</span>
                                        <span className="ref-item-domain">docs.aws.amazon.com</span>
                                    </a>
                                </li>
                                <li className="ref-item">
                                    <a
                                        href="https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span className="ref-item-title">Amazon EC2 Auto Scaling とは</span>
                                        <span className="ref-item-domain">docs.aws.amazon.com</span>
                                    </a>
                                </li>
                                <li className="ref-item">
                                    <a
                                        href="https://docs.aws.amazon.com/autoscaling/plans/userguide/best-practices-for-scaling-plans.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span className="ref-item-title">
                                            スケーリングプランのベストプラクティス
                                        </span>
                                        <span className="ref-item-domain">docs.aws.amazon.com</span>
                                    </a>
                                </li>
                                <li className="ref-item">
                                    <a
                                        href="https://docs.aws.amazon.com/eks/latest/best-practices/load-balancing.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span className="ref-item-title">
                                            Amazon EKS ベストプラクティス - ロードバランシング
                                        </span>
                                        <span className="ref-item-domain">docs.aws.amazon.com</span>
                                    </a>
                                </li>
                                <li className="ref-item">
                                    <a
                                        href="https://docs.aws.amazon.com/decision-guides/latest/fargate-or-lambda/fargate-or-lambda.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span className="ref-item-title">Fargate or Lambda 選択ガイド</span>
                                        <span className="ref-item-domain">docs.aws.amazon.com</span>
                                    </a>
                                </li>
                                <li className="ref-item">
                                    <a
                                        href="https://aws.amazon.com/fargate/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span className="ref-item-title">AWS Fargate 製品ページ</span>
                                        <span className="ref-item-domain">aws.amazon.com</span>
                                    </a>
                                </li>
                                <li className="ref-item">
                                    <a
                                        href="https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span className="ref-item-title">Amazon ECS とは</span>
                                        <span className="ref-item-domain">docs.aws.amazon.com</span>
                                    </a>
                                </li>
                                <li className="ref-item">
                                    <a
                                        href="https://docs.aws.amazon.com/decision-guides/latest/containers-on-aws-how-to-choose/choosing-aws-container-service.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span className="ref-item-title">
                                            AWSコンテナサービスの選択ガイド
                                        </span>
                                        <span className="ref-item-domain">docs.aws.amazon.com</span>
                                    </a>
                                </li>
                                <li className="ref-item">
                                    <a
                                        href="https://docs.aws.amazon.com/step-functions/latest/dg/concepts-xray-tracing.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span className="ref-item-title">
                                            AWS Step Functions と X-Ray の統合
                                        </span>
                                        <span className="ref-item-domain">docs.aws.amazon.com</span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="ref-category">
                            <div className="ref-category-title">キャッシュ・ストレージ</div>
                            <ul className="ref-list">
                                <li className="ref-item">
                                    <a
                                        href="https://aws.amazon.com/caching/aws-caching/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span className="ref-item-title">
                                            AWS Caching Solutions（CloudFront/ElastiCache）
                                        </span>
                                        <span className="ref-item-domain">aws.amazon.com</span>
                                    </a>
                                </li>
                                <li className="ref-item">
                                    <a
                                        href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span className="ref-item-title">
                                            Amazon S3 ストレージクラス概要
                                        </span>
                                        <span className="ref-item-domain">docs.aws.amazon.com</span>
                                    </a>
                                </li>
                                <li className="ref-item">
                                    <a
                                        href="https://aws.amazon.com/efs/when-to-choose-efs/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span className="ref-item-title">Amazon EFS を選ぶべき時</span>
                                        <span className="ref-item-domain">aws.amazon.com</span>
                                    </a>
                                </li>
                                <li className="ref-item">
                                    <a
                                        href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/DataDurability.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <span className="ref-item-title">
                                            Amazon S3 のデータ保護（耐久性）
                                        </span>
                                        <span className="ref-item-domain">docs.aws.amazon.com</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
