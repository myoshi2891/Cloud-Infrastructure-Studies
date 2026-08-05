'use client';

import { MermaidDiagram } from '@/components/MermaidDiagram';
import { NavBar } from './NavBar';
import { DIAGRAMS } from './constants';
import './page.css';

function Diagram({ id, label }: { id: string; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap">
            <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale />
        </div>
    );
}

export function Domain4Guide() {
    return (
        <div className="domain4-page">
            <div className="layout">
                <NavBar />
                <main className="content">
                    <h1 id="ドメイン4-コスト最適化アーキテクチャの設計-完全ガイド">
                        ドメイン4: コスト最適化アーキテクチャの設計 完全ガイド
                    </h1>
                    <p>
                        <strong>AWS Certified Solutions Architect - Associate (SAA-C03) 試験対応</strong>
                    </p>
                    <hr />
                    <h2 id="intro">はじめに</h2>
                    <p>
                        このガイドは、AWS Certified Solutions Architect - Associate (SAA-C03)
                        試験のドメイン4「<strong>コスト最適化アーキテクチャの設計 (Design Cost-Optimized Architectures)</strong>」を、初級者の方でも一つずつ理解できるようにステップバイステップで解説するものです。
                    </p>
                    <p>
                        ドメイン4は試験全体の<strong>20</strong>%を占め、4つのタスクで構成されています。
                    </p>
                    <p>
                        <strong>SAA-C03 試験ドメイン別出題比率(ドメイン4を中心に)</strong>
                    </p>
                    <Diagram id="mermaid-src-00" label="試験ドメイン出題比率" />
                    <p>
                        コスト最適化は「安ければ良い」という単純な話ではありません。AWS Well-Architected Framework のコスト最適化の柱では、<strong>ビジネス要件を満たしながら最も低いコストで結果を出す</strong>ことが目的とされています。つまり、可用性やパフォーマンスとのバランスを取りながら「無駄なお金を使わない設計」を選ぶスキルが問われます。
                    </p>
                    <blockquote>
                        <p>
                            出典:{' '}
                            <a
                                href="https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/welcome.html"
                                target="_blank"
                                rel="noreferrer"
                            >
                                AWS Well-Architected Framework - コスト最適化の柱
                            </a>
                        </p>
                    </blockquote>
                    <h3 id="このドメインの4つのタスク">このドメインの4つのタスク</h3>
                    <Diagram id="mermaid-src-01" label="ドメイン4の4つのタスク" />
                    <p>
                        4つのタスクすべてに共通して登場する知識項目があります。それが「AWSコスト管理サービスの機能」と「AWSコスト管理ツール」です。先にこの共通項目を解説してから、各タスクの詳細に入ります。
                    </p>
                    <hr />
                    <h2 id="common-tools">0. 全タスク共通:AWSコスト管理ツールとサービス機能</h2>
                    <p>
                        Task 4.1〜4.4 のすべてに「AWSコスト管理サービスの機能(例: コスト配分タグ、マルチアカウント請求)」「AWSコスト管理ツール(例: Cost Explorer、Budgets、Cost and Usage Report)」という知識項目が繰り返し登場します。まずこれらの土台を理解しておくと、各タスクの学習がスムーズになります。
                    </p>
                    <h3 id="01-コスト管理ツールの全体像">0.1 コスト管理ツールの全体像</h3>
                    <Diagram id="mermaid-src-02" label="コスト管理ツールの全体像" />
                    <h3 id="02-各ツール機能の役割">0.2 各ツール・機能の役割</h3>
                    <table>
                        <thead>
                            <tr className="header">
                                <th>ツール/機能</th>
                                <th>主な役割</th>
                                <th>初級者向けポイント</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>
                                    <strong>AWS Organizations 連結請求(マルチアカウント請求)</strong>
                                </td>
                                <td>複数のAWSアカウントを1つの管理アカウントに集約し、請求を一本化する</td>
                                <td>
                                    各アカウントの利用量をまとめることで、ボリュームディスカウントやリザーブド購入の共有(共有RI/Savings Plans)が受けやすくなる
                                </td>
                            </tr>
                            <tr className="even">
                                <td>
                                    <strong>コスト配分タグ</strong>
                                </td>
                                <td>
                                    リソースにタグ(例: <code>Project=Sales</code>, <code>Environment=Prod</code>)を付けてコストを分類する
                                </td>
                                <td>
                                    タグを付けないと「誰が」「何のために」使った費用か分からなくなる。プロジェクト別・部門別のコスト可視化に必須
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>
                                    <strong>AWS Cost and Usage Report (CUR)</strong>
                                </td>
                                <td>最も詳細な使用量・コストのデータをS3に出力する</td>
                                <td>
                                    Athena や QuickSight (Amazon Quick Suite) と連携し、時間単位・リソース単位で深掘り分析ができる
                                </td>
                            </tr>
                            <tr className="even">
                                <td>
                                    <strong>AWS Cost Explorer</strong>
                                </td>
                                <td>コストと使用量をグラフで可視化し、傾向分析や将来予測を行う</td>
                                <td>「先月よりなぜ高くなったか」を調べる、Savings Plans/RI購入前のシミュレーションに使う</td>
                            </tr>
                            <tr className="odd">
                                <td>
                                    <strong>AWS Budgets</strong>
                                </td>
                                <td>予算のしきい値を設定し、超過(または超過予測)時にアラートを出す</td>
                                <td>「使いすぎ防止」の仕組み。しきい値到達時にSNS通知やアクション(IAMポリシーの自動適用など)を実行可能</td>
                            </tr>
                            <tr className="even">
                                <td>
                                    <strong>AWS Trusted Advisor</strong>(補助的)
                                </td>
                                <td>コスト最適化・パフォーマンス・セキュリティなどの観点からベストプラクティスをチェック</td>
                                <td>未使用のEIPや低使用率インスタンスなど「使っていないのに課金されているもの」を検出</td>
                            </tr>
                            <tr className="odd">
                                <td>
                                    <strong>AWS Compute Optimizer</strong>(補助的)
                                </td>
                                <td>過去のリソース使用率を機械学習で分析し、最適なインスタンスタイプ・サイズを推奨</td>
                                <td>「オーバープロビジョニング(過剰なスペック)」の是正に活用</td>
                            </tr>
                        </tbody>
                    </table>
                    <blockquote>
                        <p>
                            出典:{' '}
                            <a href="https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html" target="_blank" rel="noreferrer">
                                AWS Cost Explorer とは
                            </a>{' '}
                            /{' '}
                            <a href="https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html" target="_blank" rel="noreferrer">
                                AWS Budgets を使用したコスト管理
                            </a>{' '}
                            /{' '}
                            <a href="https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html" target="_blank" rel="noreferrer">
                                AWS Cost and Usage Report とは
                            </a>{' '}
                            /{' '}
                            <a href="https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html" target="_blank" rel="noreferrer">
                                コスト配分タグの使用
                            </a>{' '}
                            /{' '}
                            <a href="https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_consolidated-billing.html" target="_blank" rel="noreferrer">
                                AWS Organizations の連結請求
                            </a>{' '}
                            /{' '}
                            <a href="https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor.html" target="_blank" rel="noreferrer">
                                AWS Trusted Advisor
                            </a>{' '}
                            /{' '}
                            <a href="https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is.html" target="_blank" rel="noreferrer">
                                AWS Compute Optimizer とは
                            </a>
                        </p>
                    </blockquote>
                    <h3 id="03-ベストプラクティス共通">0.3 ベストプラクティス(共通)</h3>
                    <ul>
                        <li>
                            タグ付けポリシーを組織レベルで統一し、<code>CostCenter</code>・<code>Environment</code>・<code>Project</code> のような必須タグを Tag Policies で強制する。
                        </li>
                        <li>
                            連結請求はメンバーアカウントの支払いをまとめるだけでなく、<strong>Savings Plans や Reserved Instances の割引をアカウント間で共有</strong>できる点が最大のコストメリット。
                        </li>
                        <li>
                            Cost Explorer で異常検知(Cost Anomaly Detection)を有効にし、想定外のスパイクを早期発見する。
                        </li>
                        <li>
                            Budgets はコスト予算だけでなく、使用量予算(Usage Budgets)やRI/Savings Plansの利用率予算も設定できる。
                        </li>
                    </ul>
                    <hr />
                    <h2 id="task-4-1">Task 4.1: コスト最適化ストレージソリューションの設計</h2>
                    <h3 id="411-ストレージタイプの理解object--file--block">
                        4.1.1 ストレージタイプの理解(object / file / block)
                    </h3>
                    <p>まず、AWSのストレージは大きく3種類に分類されることを理解しましょう。</p>
                    <Diagram id="mermaid-src-03" label="ストレージタイプの選択フロー" />
                    <table>
                        <thead>
                            <tr className="header">
                                <th>ストレージタイプ</th>
                                <th>代表サービス</th>
                                <th>特徴</th>
                                <th>主なコスト最適化ポイント</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>オブジェクト</td>
                                <td>Amazon S3</td>
                                <td>事実上無制限の容量、HTTP経由でアクセス、静的Webサイトやデータレイクに最適</td>
                                <td>ストレージクラスの階層化、ライフサイクルルール</td>
                            </tr>
                            <tr className="even">
                                <td>ファイル</td>
                                <td>Amazon EFS, Amazon FSx</td>
                                <td>複数のEC2から同時マウント可能な共有ファイルシステム</td>
                                <td>EFSの「インフリークエントアクセス」階層、FSxのバックアップ保持設定</td>
                            </tr>
                            <tr className="odd">
                                <td>ブロック</td>
                                <td>Amazon EBS, インスタンスストア</td>
                                <td>単一EC2インスタンスにアタッチする低レイテンシーディスク</td>
                                <td>ボリュームタイプの適正選択、不要なスナップショット削除</td>
                            </tr>
                        </tbody>
                    </table>
                    <blockquote>
                        <p>
                            出典:{' '}
                            <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html" target="_blank" rel="noreferrer">
                                Amazon S3 とは
                            </a>{' '}
                            /{' '}
                            <a href="https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html" target="_blank" rel="noreferrer">
                                Amazon EFS とは
                            </a>{' '}
                            /{' '}
                            <a href="https://aws.amazon.com/fsx/" target="_blank" rel="noreferrer">
                                Amazon FSx
                            </a>{' '}
                            /{' '}
                            <a href="https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volume-types.html" target="_blank" rel="noreferrer">
                                Amazon EBS ボリュームタイプ
                            </a>
                        </p>
                    </blockquote>
                    <h3 id="412-s3ストレージクラスとライフサイクル管理ストレージ階層化">
                        4.1.2 S3ストレージクラスとライフサイクル管理(ストレージ階層化)
                    </h3>
                    <p>
                        S3のコスト最適化で最も出題頻度が高いのが「<strong>ストレージクラス</strong>」と「<strong>ライフサイクルルール</strong>」です。アクセス頻度が下がるデータを自動的に安価な階層に移動させることで、コストを大幅に削減できます。
                    </p>
                    <Diagram id="mermaid-src-04" label="S3ストレージクラスとライフサイクル移行" />
                    <table>
                        <thead>
                            <tr className="header">
                                <th>ストレージクラス</th>
                                <th>想定用途</th>
                                <th>取り出し時間</th>
                                <th>コスト特性</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>S3 Standard</td>
                                <td>頻繁にアクセスするデータ</td>
                                <td>即時</td>
                                <td>保存コスト高め、取り出し無料</td>
                            </tr>
                            <tr className="even">
                                <td>S3 Intelligent-Tiering</td>
                                <td>アクセスパターンが読めないデータ</td>
                                <td>即時(一部階層を除く)</td>
                                <td>監視・自動階層化の小額手数料はかかるが取り出し料金なし</td>
                            </tr>
                            <tr className="odd">
                                <td>S3 Standard-IA / One Zone-IA</td>
                                <td>月1回程度アクセスするバックアップなど</td>
                                <td>即時</td>
                                <td>保存コストは低いが取り出し料金が発生</td>
                            </tr>
                            <tr className="even">
                                <td>S3 Glacier Instant Retrieval</td>
                                <td>四半期に1回程度アクセスするアーカイブ</td>
                                <td>ミリ秒</td>
                                <td>低コストかつ即時アクセスが必要な場合に最適</td>
                            </tr>
                            <tr className="odd">
                                <td>S3 Glacier Flexible Retrieval</td>
                                <td>年1〜2回程度のアクセス</td>
                                <td>数分〜数時間</td>
                                <td>さらに低コスト</td>
                            </tr>
                            <tr className="even">
                                <td>S3 Glacier Deep Archive</td>
                                <td>法規制で長期保管が必要なデータ</td>
                                <td>最大12時間</td>
                                <td>最安のストレージクラス</td>
                            </tr>
                        </tbody>
                    </table>
                    <p>
                        <strong>スキル: S3オブジェクトライフサイクルの管理</strong>
                    </p>
                    <ul>
                        <li>ライフサイクルルールで「◯日後に別クラスへ移行」「◯日後に削除」を自動化する。</li>
                        <li>
                            マルチパートアップロードの未完了パーツは、放置すると課金され続けるため、ライフサイクルルールで自動削除する設定を忘れずに行う。
                        </li>
                        <li>バージョニングを有効にしている場合、旧バージョンにも別途ライフサイクルルールを設定しないとコストが積み上がる。</li>
                    </ul>
                    <blockquote>
                        <p>
                            出典:{' '}
                            <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html" target="_blank" rel="noreferrer">
                                Amazon S3 ストレージクラス
                            </a>{' '}
                            /{' '}
                            <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html" target="_blank" rel="noreferrer">
                                S3 オブジェクトライフサイクル管理
                            </a>
                        </p>
                    </blockquote>
                    <h3 id="413-アクセスオプション-requester-pays">4.1.3 アクセスオプション: Requester Pays</h3>
                    <p>
                        通常、S3のデータ転送・リクエスト料金は「バケット所有者」が支払います。しかし <strong>Requester Pays</strong> を有効にすると、リクエストしたユーザー(ダウンロードする側)がデータ転送とリクエストの費用を負担します。
                    </p>
                    <Diagram id="mermaid-src-05" label="Requester Paysシーケンス" />
                    <ul>
                        <li>
                            想定用途: 研究データセットや公開データを大勢に配布したいが、<strong>転送コストを配布先に負担してもらいたい</strong>場合。
                        </li>
                        <li>リクエスト側は認証されたAWSアカウントである必要があり、匿名アクセスはできない。</li>
                    </ul>
                    <blockquote>
                        <p>
                            出典:{' '}
                            <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/RequesterPaysBuckets.html" target="_blank" rel="noreferrer">
                                Requester Pays バケットの使用
                            </a>
                        </p>
                    </blockquote>
                    <h3 id="414-ブロックストレージオプションebsボリュームタイプ">
                        4.1.4 ブロックストレージオプション(EBSボリュームタイプ)
                    </h3>
                    <p>
                        EBSは用途に応じて多くのボリュームタイプがあり、<strong>過剰なスペックを選ばないこと</strong>がコスト最適化の鍵です。
                    </p>
                    <Diagram id="mermaid-src-06" label="EBSボリュームタイプの選択フロー" />
                    <table>
                        <thead>
                            <tr className="header">
                                <th>ボリュームタイプ</th>
                                <th>種別</th>
                                <th>主な用途</th>
                                <th>コスト最適化のポイント</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>gp3</td>
                                <td>SSD(汎用)</td>
                                <td>Webサーバー、開発・テスト環境、ほとんどの汎用ワークロード</td>
                                <td>gp2より約20%安価。IOPSとスループットを個別にプロビジョニングできるため、必要な分だけ課金される</td>
                            </tr>
                            <tr className="even">
                                <td>io2 / io2 Block Express</td>
                                <td>SSD(プロビジョンドIOPS)</td>
                                <td>大規模データベース(SAP HANA、Oracleなど)</td>
                                <td>過剰スペックにならないよう、実測IOPSに基づいてサイジングする</td>
                            </tr>
                            <tr className="odd">
                                <td>st1</td>
                                <td>HDD(スループット最適化)</td>
                                <td>ビッグデータ、ログ処理、データウェアハウス</td>
                                <td>gp3よりも大幅に安いが、ブート用途には使えない点に注意</td>
                            </tr>
                            <tr className="even">
                                <td>sc1</td>
                                <td>HDD(コールドHDD)</td>
                                <td>アクセス頻度が非常に低いデータ</td>
                                <td>最安価格帯だが低頻度アクセス向け</td>
                            </tr>
                        </tbody>
                    </table>
                    <blockquote>
                        <p>
                            出典:{' '}
                            <a href="https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volume-types.html" target="_blank" rel="noreferrer">
                                Amazon EBS ボリュームタイプ
                            </a>
                        </p>
                    </blockquote>
                    <h3 id="415-ハイブリッドストレージオプションオンプレミスとの連携">
                        4.1.5 ハイブリッドストレージオプション(オンプレミスとの連携)
                    </h3>
                    <p>
                        オンプレミス環境からAWSへデータを移行・連携する際、<strong>データ量・接続環境・頻度</strong>によって最適なサービスが異なります。
                    </p>
                    <Diagram id="mermaid-src-07" label="ハイブリッドストレージと移行オプション" />
                    <p>
                        <strong>スキル: 最も低コストな転送方式の判断</strong>
                    </p>
                    <table>
                        <thead>
                            <tr className="header">
                                <th>状況</th>
                                <th>推奨サービス</th>
                                <th>理由</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>帯域幅が十分にあり、継続的にファイルを同期したい</td>
                                <td>AWS DataSync</td>
                                <td>転送の自動化・スケジューリング・帯域制御が可能</td>
                            </tr>
                            <tr className="even">
                                <td>既存のSFTPクライアント資産を変えたくない</td>
                                <td>AWS Transfer Family</td>
                                <td>プロトコル互換性を保ったままS3/EFSに移行できる</td>
                            </tr>
                            <tr className="odd">
                                <td>オンプレミスアプリがローカルディスクのように扱いたい</td>
                                <td>Storage Gateway</td>
                                <td>キャッシュ層を持ちながら裏側はS3に保存されコスト効率が良い</td>
                            </tr>
                            <tr className="even">
                                <td>ネットワーク経由では数週間〜数ヶ月かかる大容量データ</td>
                                <td>Snow Family</td>
                                <td>物理輸送によりネットワークコストと時間を削減</td>
                            </tr>
                            <tr className="odd">
                                <td>
                                    <strong>バッチアップロードか個別アップロードか</strong>
                                </td>
                                <td>
                                    S3への大量オブジェクトは<strong>バッチ(マルチパートアップロード/S3 Batch Operations)</strong>
                                </td>
                                <td>リクエスト数を減らしAPIコール課金とオーバーヘッドを削減</td>
                            </tr>
                        </tbody>
                    </table>
                    <blockquote>
                        <p>
                            出典:{' '}
                            <a href="https://docs.aws.amazon.com/datasync/latest/userguide/what-is-datasync.html" target="_blank" rel="noreferrer">
                                AWS DataSync とは
                            </a>{' '}
                            /{' '}
                            <a href="https://docs.aws.amazon.com/transfer/latest/userguide/what-is-aws-transfer-family.html" target="_blank" rel="noreferrer">
                                AWS Transfer Family とは
                            </a>{' '}
                            /{' '}
                            <a href="https://docs.aws.amazon.com/storagegateway/latest/userguide/WhatIsStorageGateway.html" target="_blank" rel="noreferrer">
                                AWS Storage Gateway とは
                            </a>{' '}
                            /{' '}
                            <a href="https://aws.amazon.com/snow/" target="_blank" rel="noreferrer">
                                AWS Snow Family
                            </a>
                        </p>
                    </blockquote>
                    <h3 id="416-バックアップ戦略とデータライフサイクル">4.1.6 バックアップ戦略とデータライフサイクル</h3>
                    <Diagram id="mermaid-src-08" label="バックアップ戦略とデータライフサイクル" />
                    <ul>
                        <li>
                            <strong>バックアップ頻度とスナップショット保持数</strong>はコストに直結する。「毎時バックアップを90日保持」は「毎日バックアップを30日保持」より大幅に高コストになるため、実際のRPO要件に合わせる。
                        </li>
                        <li>
                            増分スナップショット(EBSスナップショットなど)は差分のみ課金されるため、頻度を上げても劇的にはコストが増えにくいが、<strong>保持世代数</strong>の管理が重要。
                        </li>
                        <li>
                            コンプライアンス上の長期保持データは、S3 Glacier Deep Archiveのようなアーカイブ層へライフサイクル移行することでコストを最小化する。
                        </li>
                    </ul>
                    <blockquote>
                        <p>
                            出典:{' '}
                            <a href="https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html" target="_blank" rel="noreferrer">
                                AWS Backup とは
                            </a>{' '}
                            /{' '}
                            <a href="https://docs.aws.amazon.com/amazonglacier/latest/dev/vault-lock.html" target="_blank" rel="noreferrer">
                                S3 Glacier Vault Lock
                            </a>
                        </p>
                    </blockquote>
                    <h3 id="417-task-41-ベストプラクティスまとめ">4.1.7 Task 4.1 ベストプラクティスまとめ</h3>
                    <table>
                        <thead>
                            <tr className="header">
                                <th>項目</th>
                                <th>ベストプラクティス</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>ストレージ選択</td>
                                <td>ワークロードのアクセスパターン(頻度・並行性・レイテンシー要件)に応じてオブジェクト/ファイル/ブロックを選ぶ</td>
                            </tr>
                            <tr className="even">
                                <td>S3階層化</td>
                                <td>アクセスパターンが不明ならIntelligent-Tiering、既知ならライフサイクルルールで明示的に階層移行</td>
                            </tr>
                            <tr className="odd">
                                <td>EBS</td>
                                <td>gp2は原則gp3へ移行。IOPS要件を正確に見積り過剰プロビジョニングを避ける</td>
                            </tr>
                            <tr className="even">
                                <td>データ移行</td>
                                <td>帯域幅・データ量・継続性の3軸で DataSync / Transfer Family / Storage Gateway / Snow Family を選定</td>
                            </tr>
                            <tr className="odd">
                                <td>バックアップ</td>
                                <td>RPO/RTOに基づく頻度・保持期間設計、長期保管はアーカイブ層へライフサイクル移行</td>
                            </tr>
                        </tbody>
                    </table>
                    <hr />
                    <h2 id="task-4-2">Task 4.2: コスト最適化コンピューティングソリューションの設計</h2>
                    <h3 id="421-ec2購入オプション">4.2.1 EC2購入オプション</h3>
                    <p>
                        コンピューティングのコスト最適化で最重要なのが「<strong>どの購入オプションを使うか</strong>」です。
                    </p>
                    <Diagram id="mermaid-src-09" label="EC2購入オプションの選択フロー" />
                    <table>
                        <thead>
                            <tr className="header">
                                <th>購入オプション</th>
                                <th>割引率の目安</th>
                                <th>コミットメント</th>
                                <th>適した用途</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>On-Demand</td>
                                <td>割引なし(基準)</td>
                                <td>なし</td>
                                <td>短期テスト、予測不能なワークロード</td>
                            </tr>
                            <tr className="even">
                                <td>Reserved Instances</td>
                                <td>最大72%</td>
                                <td>1年 or 3年</td>
                                <td>定常稼働する既知のワークロード(DBサーバー等)</td>
                            </tr>
                            <tr className="odd">
                                <td>Savings Plans(Compute/EC2 Instance)</td>
                                <td>最大72%</td>
                                <td>1年 or 3年の<strong>支払い額</strong>をコミット</td>
                                <td>インスタンスファミリーやリージョンが変わる可能性がある場合</td>
                            </tr>
                            <tr className="even">
                                <td>Spot Instances</td>
                                <td>最大90%</td>
                                <td>なし(いつでも中断される可能性)</td>
                                <td>バッチ処理、CI/CD、ステートレスなWebサーバー、ビッグデータ処理</td>
                            </tr>
                        </tbody>
                    </table>
                    <p>
                        <strong>スキル: 適切なスケーリング方式の判断(水平 vs 垂直)</strong>
                    </p>
                    <Diagram id="mermaid-src-10" label="スケーリング方式（水平 vs 垂直）" />
                    <blockquote>
                        <p>
                            出典:{' '}
                            <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-purchasing-options.html" target="_blank" rel="noreferrer">
                                Amazon EC2 インスタンス購入オプション
                            </a>{' '}
                            /{' '}
                            <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html" target="_blank" rel="noreferrer">
                                Spotインスタンスの使用
                            </a>{' '}
                            /{' '}
                            <a href="https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html" target="_blank" rel="noreferrer">
                                Savings Plans とは
                            </a>{' '}
                            /{' '}
                            <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-reserved-instances.html" target="_blank" rel="noreferrer">
                                リザーブドインスタンス
                            </a>
                        </p>
                    </blockquote>
                    <h3 id="422-コンピューティングサービスの選択ec2--lambda--fargate">
                        4.2.2 コンピューティングサービスの選択(EC2 / Lambda / Fargate)
                    </h3>
                    <p>
                        利用率最適化の観点では、「常時起動のサーバー(EC2)」よりも「使った分だけ課金されるサーバーレス/コンテナ」の方が合理的な場合が多くあります。
                    </p>
                    <Diagram id="mermaid-src-11" label="コンピューティングサービスの選択" />
                    <table>
                        <thead>
                            <tr className="header">
                                <th>サービス</th>
                                <th>課金単位</th>
                                <th>コスト最適化ポイント</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>Amazon EC2</td>
                                <td>起動時間(秒単位)</td>
                                <td>使用率が低い時間帯があるならAuto Scalingで台数を調整、または予約系割引を活用</td>
                            </tr>
                            <tr className="even">
                                <td>AWS Lambda</td>
                                <td>リクエスト数 + 実行時間(ミリ秒) × メモリ</td>
                                <td>アイドルタイムの課金が発生しないため、断続的な処理に最適</td>
                            </tr>
                            <tr className="odd">
                                <td>AWS Fargate</td>
                                <td>使用したvCPU・メモリ×時間</td>
                                <td>ホストEC2の管理コストが不要になる分、単価はEC2より高めだが運用コスト込みで有利な場合が多い</td>
                            </tr>
                            <tr className="even">
                                <td>AWS Batch</td>
                                <td>内部で使うコンピューティングリソース(EC2/Fargate/Spot)に依存</td>
                                <td>Spotインスタンスと組み合わせることで大幅なコスト削減が可能</td>
                            </tr>
                        </tbody>
                    </table>
                    <p>
                        <strong>スキル: ワークロードクラス別の可用性要件の判断</strong>
                    </p>
                    <ul>
                        <li>
                            本番稼働(Production)ワークロード: マルチAZ・Auto Scaling・On-Demand or RI中心で高可用性を優先。
                        </li>
                        <li>
                            非本番(開発・テスト)ワークロード: シングルAZでも許容されることが多く、Spotインスタンスや自動停止スケジュールでコスト削減。
                        </li>
                    </ul>
                    <blockquote>
                        <p>
                            出典:{' '}
                            <a href="https://docs.aws.amazon.com/lambda/latest/dg/welcome.html" target="_blank" rel="noreferrer">
                                AWS Lambda とは
                            </a>{' '}
                            /{' '}
                            <a href="https://docs.aws.amazon.com/AmazonECS/latest/userguide/what-is-fargate.html" target="_blank" rel="noreferrer">
                                AWS Fargate とは
                            </a>{' '}
                            /{' '}
                            <a href="https://docs.aws.amazon.com/batch/latest/userguide/what-is-batch.html" target="_blank" rel="noreferrer">
                                AWS Batch とは
                            </a>
                        </p>
                    </blockquote>
                    <h3 id="423-スケーリング戦略とec2-hibernate">
                        4.2.3 スケーリング戦略とEC2 Hibernate
                    </h3>
                    <Diagram id="mermaid-src-12" label="EC2 Hibernate / Stop / Terminate の選択" />
                    <ul>
                        <li>
                            Auto Scaling は需要予測(Predictive Scaling)やスケジュールベース(business hoursのみ稼働)と組み合わせることで、夜間・週末のリソースを削減できる。
                        </li>
                        <li>
                            Hibernateは頻繁な再起動が必要なワークロード(開発環境など)で、起動時間短縮とコスト削減を両立できる。
                        </li>
                    </ul>
                    <blockquote>
                        <p>
                            出典:{' '}
                            <a href="https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html" target="_blank" rel="noreferrer">
                                Amazon EC2 Auto Scaling とは
                            </a>{' '}
                            /{' '}
                            <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Hibernate.html" target="_blank" rel="noreferrer">
                                EC2 インスタンスの休止(Hibernate)
                            </a>
                        </p>
                    </blockquote>
                    <h3 id="424-ロードバランシング戦略">4.2.4 ロードバランシング戦略</h3>
                    <Diagram id="mermaid-src-13" label="ロードバランサーのタイプ選択" />
                    <table>
                        <thead>
                            <tr className="header">
                                <th>ロードバランサー</th>
                                <th>レイヤー</th>
                                <th>主な用途</th>
                                <th>コスト最適化の観点</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>ALB</td>
                                <td>L7(HTTP/HTTPS)</td>
                                <td>Webアプリ、マイクロサービス、コンテナ</td>
                                <td>1台のALBで複数のターゲットグループにルーティングでき、サービスごとのALB乱立を防げる</td>
                            </tr>
                            <tr className="even">
                                <td>NLB</td>
                                <td>L4(TCP/UDP/TLS)</td>
                                <td>超高スループット・静的IPが必要なワークロード</td>
                                <td>必要な場合のみ使用(ALBで十分な要件にNLBは過剰)</td>
                            </tr>
                            <tr className="odd">
                                <td>GWLB</td>
                                <td>L3(ネットワーク層)</td>
                                <td>ファイアウォールなど仮想アプライアンスの透過的挿入</td>
                                <td>集中管理により個別アプライアンスの重複導入コストを削減</td>
                            </tr>
                        </tbody>
                    </table>
                    <blockquote>
                        <p>
                            出典:{' '}
                            <a href="https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/elastic-load-balancing.html" target="_blank" rel="noreferrer">
                                Elastic Load Balancing とは
                            </a>{' '}
                            /{' '}
                            <a href="https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html" target="_blank" rel="noreferrer">
                                Application Load Balancer
                            </a>{' '}
                            /{' '}
                            <a href="https://docs.aws.amazon.com/elasticloadbalancing/latest/network/introduction.html" target="_blank" rel="noreferrer">
                                Network Load Balancer
                            </a>{' '}
                            /{' '}
                            <a href="https://docs.aws.amazon.com/elasticloadbalancing/latest/gateway/introduction.html" target="_blank" rel="noreferrer">
                                Gateway Load Balancer
                            </a>
                        </p>
                    </blockquote>
                    <h3 id="425-ハイブリッド分散コンピューティング">
                        4.2.5 ハイブリッド・分散コンピューティング
                    </h3>
                    <Diagram id="mermaid-src-14" label="エッジ・ハイブリッドコンピューティング選択" />
                    <ul>
                        <li>
                            これらはいずれも「データをリージョンまで転送するコスト・遅延」を削減する目的で使われる。全ワークロードに必要なわけではなく、<strong>低レイテンシー要件やデータ主権規制がある場合にのみ選択</strong>するのがコスト最適化の考え方。
                        </li>
                    </ul>
                    <blockquote>
                        <p>
                            出典:{' '}
                            <a href="https://docs.aws.amazon.com/outposts/latest/userguide/what-is-outposts.html" target="_blank" rel="noreferrer">
                                AWS Outposts とは
                            </a>{' '}
                            /{' '}
                            <a href="https://docs.aws.amazon.com/local-zones/latest/ug/what-is-aws-local-zones.html" target="_blank" rel="noreferrer">
                                AWS Local Zones とは
                            </a>{' '}
                            /{' '}
                            <a href="https://docs.aws.amazon.com/wavelength/latest/developerguide/what-is-wavelength.html" target="_blank" rel="noreferrer">
                                AWS Wavelength とは
                            </a>
                        </p>
                    </blockquote>
                    <h3 id="426-task-42-ベストプラクティスまとめ">
                        4.2.6 Task 4.2 ベストプラクティスまとめ
                    </h3>
                    <table>
                        <thead>
                            <tr className="header">
                                <th>項目</th>
                                <th>ベストプラクティス</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>購入オプション</td>
                                <td>定常負荷はReserved/Savings Plans、変動・中断可能な負荷はSpot、短期はOn-Demand</td>
                            </tr>
                            <tr className="even">
                                <td>コンピューティング選択</td>
                                <td>常時稼働ならEC2、イベント駆動ならLambda、コンテナ運用の手間を減らすならFargate</td>
                            </tr>
                            <tr className="odd">
                                <td>スケーリング</td>
                                <td>水平スケーリングを基本とし、需要予測・スケジュールベースのAuto Scalingを併用</td>
                            </tr>
                            <tr className="even">
                                <td>ロードバランサー</td>
                                <td>用途に応じALB/NLB/GWLBを使い分け、不要な重複導入を避ける</td>
                            </tr>
                            <tr className="odd">
                                <td>インスタンスサイズ</td>
                                <td>Compute Optimizerを使い実測値に基づいてファミリー・サイズを適正化</td>
                            </tr>
                        </tbody>
                    </table>
                    <hr />
                    <h2 id="task-4-3">Task 4.3: コスト最適化データベースソリューションの設計</h2>
                    <h3 id="431-データベースタイプとサービスの選択">
                        4.3.1 データベースタイプとサービスの選択
                    </h3>
                    <Diagram id="mermaid-src-15" label="データベース選択フロー" />
                    <table>
                        <thead>
                            <tr className="header">
                                <th>観点</th>
                                <th>リレーショナル(RDS/Aurora)</th>
                                <th>非リレーショナル(DynamoDB)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>コスト構造</td>
                                <td>インスタンスサイズ×稼働時間+ストレージ</td>
                                <td>読み書きキャパシティユニット(RCU/WCU)またはオンデマンドのリクエスト数</td>
                            </tr>
                            <tr className="even">
                                <td>スケーリング</td>
                                <td>垂直スケーリングが中心(Auroraは読み取りは水平も可)</td>
                                <td>自動で水平スケール、サーバー管理不要</td>
                            </tr>
                            <tr className="odd">
                                <td>向いているワークロード</td>
                                <td>複雑なクエリ、既存アプリの移行</td>
                                <td>超大規模・低レイテンシーが必要なキーバリュー型アクセス</td>
                            </tr>
                            <tr className="even">
                                <td>コスト最適化の鍵</td>
                                <td>適切なインスタンスサイズ選定、Aurora Serverless v2による自動スケール</td>
                                <td>オンデマンド vs プロビジョンドの選択、DynamoDB Auto Scaling</td>
                            </tr>
                        </tbody>
                    </table>
                    <p>
                        <strong>スキル: コスト効率の良いデータベースタイプの判断(時系列・列指向)</strong>
                    </p>
                    <ul>
                        <li>
                            時系列データ(IoTセンサーなど大量の時刻付きデータ)は Amazon Timestream のような時系列特化型サービスがコスト効率に優れる。
                        </li>
                        <li>
                            分析用途で列指向(カラムナー)フォーマットが必要な場合は Amazon Redshift やS3 + Athena(Parquet形式)がコスト効率的。
                        </li>
                    </ul>
                    <blockquote>
                        <p>
                            出典:{' '}
                            <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html" target="_blank" rel="noreferrer">
                                Amazon RDS とは
                            </a>{' '}
                            /{' '}
                            <a href="https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html" target="_blank" rel="noreferrer">
                                Amazon Aurora の概要
                            </a>{' '}
                            /{' '}
                            <a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html" target="_blank" rel="noreferrer">
                                Amazon DynamoDB とは
                            </a>
                        </p>
                    </blockquote>
                    <h3 id="432-データベースキャパシティプランニング">
                        4.3.2 データベースキャパシティプランニング
                    </h3>
                    <Diagram id="mermaid-src-16" label="DynamoDBキャパシティモード" />
                    <ul>
                        <li>
                            安定していて予測可能なワークロードは<strong>プロビジョンドキャパシティ + Auto Scaling</strong>の方が、オンデマンドより低コストになりやすい。
                        </li>
                        <li>
                            新規サービスや負荷が読めない場合はオンデマンドから始め、パターンが分かった時点でプロビジョンドへ切り替えるのが定石。
                        </li>
                    </ul>
                    <blockquote>
                        <p>
                            出典:{' '}
                            <a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadWriteCapacityMode.html" target="_blank" rel="noreferrer">
                                DynamoDB の読み込み/書き込みキャパシティモード
                            </a>
                        </p>
                    </blockquote>
                    <h3 id="433-データベース接続とプロキシ">4.3.3 データベース接続とプロキシ</h3>
                    <p>
                        サーバーレス(Lambda)からリレーショナルDBに直接接続すると、同時実行数増加時に<strong>接続数の枯渇</strong>が発生しコスト・パフォーマンス両面で問題になります。
                    </p>
                    <Diagram id="mermaid-src-17" label="RDS Proxy構成" />
                    <ul>
                        <li>
                            RDS Proxyはコネクションプールを管理し、DBインスタンスへの接続数を抑えることで、より小さい(安価な)インスタンスクラスでも同じ同時実行数を処理できる場合がある。
                        </li>
                        <li>フェイルオーバー時の接続切り替えも高速化されるため、可用性の観点でも有効。</li>
                    </ul>
                    <blockquote>
                        <p>
                            出典:{' '}
                            <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html" target="_blank" rel="noreferrer">
                                Amazon RDS Proxy
                            </a>
                        </p>
                    </blockquote>
                    <h3 id="434-データベースレプリケーション読み取りレプリカ">
                        4.3.4 データベースレプリケーション(読み取りレプリカ)
                    </h3>
                    <Diagram id="mermaid-src-18" label="読み取りレプリカ構成" />
                    <ul>
                        <li>
                            読み取りレプリカでリード処理を分散すれば、<strong>プライマリインスタンスのサイズを不要に大きくせずに済む</strong>(スケールアップではなくスケールアウト)。
                        </li>
                        <li>
                            Auroraは最大15個のレプリカを低レイテンシーで追加でき、Auto Scalingでレプリカ数を需要に応じ増減できるため、常時最大構成を維持するより安価。
                        </li>
                    </ul>
                    <blockquote>
                        <p>
                            出典:{' '}
                            <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html" target="_blank" rel="noreferrer">
                                Amazon RDS の読み取りレプリカの使用
                            </a>
                        </p>
                    </blockquote>
                    <h3 id="435-キャッシング戦略">4.3.5 キャッシング戦略</h3>
                    <Diagram id="mermaid-src-19" label="キャッシング戦略" />
                    <ul>
                        <li>
                            キャッシュ導入により、DB側の読み取りリクエスト数(=課金対象)そのものを削減できる。特にRDBの読み取りレプリカを増やすより、キャッシュ層追加の方が低コストな場合が多い。
                        </li>
                        <li>
                            DynamoDBワークロードで読み取りが集中する場合はDAXがマイクロ秒レベルの応答を実現しつつ、DynamoDBの読み取りキャパシティ消費を抑える。
                        </li>
                    </ul>
                    <blockquote>
                        <p>
                            出典:{' '}
                            <a href="https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/WhatIs.html" target="_blank" rel="noreferrer">
                                Amazon ElastiCache とは
                            </a>{' '}
                            /{' '}
                            <a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.html" target="_blank" rel="noreferrer">
                                DynamoDB Accelerator (DAX)
                            </a>
                        </p>
                    </blockquote>
                    <h3 id="436-バックアップと保持ポリシー">4.3.6 バックアップと保持ポリシー</h3>
                    <Diagram id="mermaid-src-20" label="バックアップと保持ポリシー" />
                    <ul>
                        <li>
                            手動スナップショットは<strong>明示的に削除するまで課金され続ける</strong>ため、放置すると気づかぬうちにコストが積み上がる典型例。定期棚卸しが重要。
                        </li>
                        <li>
                            スナップショット頻度は、実際のRPO要件(「何分前までのデータ復旧が必要か」)に基づいて設計し、過剰な頻度を避ける。
                        </li>
                    </ul>
                    <blockquote>
                        <p>
                            出典:{' '}
                            <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.html" target="_blank" rel="noreferrer">
                                Amazon RDS の自動バックアップの使用
                            </a>
                        </p>
                    </blockquote>
                    <h3 id="437-データベース移行homogeneous--heterogeneous">
                        4.3.7 データベース移行(homogeneous / heterogeneous)
                    </h3>
                    <Diagram id="mermaid-src-21" label="データベース移行パターン" />
                    <ul>
                        <li>
                            異種移行はライセンスコストの高い商用DB(Oracle/SQL Server)からオープンソース互換のAurora/RDSへ移行し、<strong>ライセンス費用そのものを削減する</strong>代表的なコスト最適化手法。
                        </li>
                        <li>
                            エンジン選定時は「MySQL互換 vs PostgreSQL互換」など機能要件と移行のしやすさを比較する。
                        </li>
                    </ul>
                    <blockquote>
                        <p>
                            出典:{' '}
                            <a href="https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html" target="_blank" rel="noreferrer">
                                AWS Database Migration Service とは
                            </a>{' '}
                            /{' '}
                            <a href="https://docs.aws.amazon.com/SchemaConversionTool/latest/userguide/CHAP_Welcome.html" target="_blank" rel="noreferrer">
                                AWS Schema Conversion Tool
                            </a>
                        </p>
                    </blockquote>
                    <h3 id="438-task-43-ベストプラクティスまとめ">
                        4.3.8 Task 4.3 ベストプラクティスまとめ
                    </h3>
                    <table>
                        <thead>
                            <tr className="header">
                                <th>項目</th>
                                <th>ベストプラクティス</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>DB種別選択</td>
                                <td>トランザクション整合性が必要ならRDS/Aurora、超大規模・低レイテンシーならDynamoDB</td>
                            </tr>
                            <tr className="even">
                                <td>キャパシティ</td>
                                <td>安定負荷はプロビジョンド+Auto Scaling、不明な負荷はオンデマンドから開始</td>
                            </tr>
                            <tr className="odd">
                                <td>接続管理</td>
                                <td>サーバーレスからの接続はRDS Proxyでプーリングしインスタンスサイズを抑制</td>
                            </tr>
                            <tr className="even">
                                <td>スケーリング</td>
                                <td>読み取りはレプリカ・キャッシュで水平分散し、プライマリの垂直スケールを避ける</td>
                            </tr>
                            <tr className="odd">
                                <td>ライセンス</td>
                                <td>商用DBからオープンソース互換DBへの移行でライセンスコストを削減</td>
                            </tr>
                            <tr className="even">
                                <td>バックアップ</td>
                                <td>手動スナップショットの棚卸しを定期実施</td>
                            </tr>
                        </tbody>
                    </table>
                    <hr />
                    <h2 id="task-4-4">Task 4.4: コスト最適化ネットワークアーキテクチャの設計</h2>
                    <h3 id="441-natゲートウェイの配置戦略">4.4.1 NATゲートウェイの配置戦略</h3>
                    <p>
                        NAT Gatewayは<strong>アベイラビリティゾーン(AZ)ごとの配置</strong>が可用性のベストプラクティスですが、コストとのトレードオフがあります。
                    </p>
                    <Diagram id="mermaid-src-22" label="NAT Gateway配置設計" />
                    <table>
                        <thead>
                            <tr className="header">
                                <th>方式</th>
                                <th>コスト</th>
                                <th>可用性</th>
                                <th>運用負荷</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>NAT Gateway(AZごと)</td>
                                <td>高(AZ数分のNAT Gateway時間料金)</td>
                                <td>高(1AZ障害が他AZに波及しない)</td>
                                <td>低(フルマネージド)</td>
                            </tr>
                            <tr className="even">
                                <td>NAT Gateway(共有・単一AZ)</td>
                                <td>中(NAT Gateway 1台分+AZ間データ転送料)</td>
                                <td>低(単一障害点)</td>
                                <td>低</td>
                            </tr>
                            <tr className="odd">
                                <td>NATインスタンス</td>
                                <td>インスタンス時間料金のみ(小さいインスタンスで代替可)</td>
                                <td>自分でAuto Scaling/冗長化を設計する必要あり</td>
                                <td>高(パッチ適用・スケーリングを自前管理)</td>
                            </tr>
                        </tbody>
                    </table>
                    <blockquote>
                        <p>
                            出典:{' '}
                            <a href="https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html" target="_blank" rel="noreferrer">
                                NATゲートウェイ
                            </a>
                        </p>
                    </blockquote>
                    <h3 id="442-ネットワーク接続オプションdirect-connect--vpn--インターネット">
                        4.4.2 ネットワーク接続オプション(Direct Connect / VPN / インターネット)
                    </h3>
                    <Diagram id="mermaid-src-23" label="ネットワーク接続オプションの選択" />
                    <table>
                        <thead>
                            <tr className="header">
                                <th>接続方式</th>
                                <th>初期コスト</th>
                                <th>帯域の安定性</th>
                                <th>データ転送コスト</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>インターネット経由</td>
                                <td>なし</td>
                                <td>不安定</td>
                                <td>リージョンのアウトバウンド料金</td>
                            </tr>
                            <tr className="even">
                                <td>Site-to-Site VPN</td>
                                <td>低(時間課金のみ)</td>
                                <td>インターネット品質に依存</td>
                                <td>VPN経由でもインターネットのデータ転送料が適用</td>
                            </tr>
                            <tr className="odd">
                                <td>Direct Connect</td>
                                <td>高(専用線敷設・ポート契約)</td>
                                <td>安定・低レイテンシー</td>
                                <td>Direct Connect経由の方がインターネット経由より一般的に割安</td>
                            </tr>
                        </tbody>
                    </table>
                    <p>
                        <strong>スキル: 適切な帯域幅の選定</strong>
                    </p>
                    <ul>
                        <li>
                            Direct Connectはポートスピードごとに課金されるため、実測トラフィックに対して過剰なポートスピードを契約しない。
                        </li>
                        <li>
                            複数のVPN接続が必要か、1本のDirect Connectで足りるかをトラフィック量から判断する(単一VPNの帯域上限と可用性のトレードオフ)。
                        </li>
                    </ul>
                    <blockquote>
                        <p>
                            出典:{' '}
                            <a href="https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html" target="_blank" rel="noreferrer">
                                AWS Direct Connect とは
                            </a>{' '}
                            /{' '}
                            <a href="https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html" target="_blank" rel="noreferrer">
                                AWS Site-to-Site VPN
                            </a>
                        </p>
                    </blockquote>
                    <h3 id="443-ネットワークルーティングトポロジーピアリング">
                        4.4.3 ネットワークルーティング・トポロジー・ピアリング
                    </h3>
                    <Diagram id="mermaid-src-24" label="VPCルーティングトポロジー" />
                    <ul>
                        <li>VPCピアリングは無料(データ転送料は別途発生)だが、VPC数が増えるとメッシュ状の接続管理が複雑化する。</li>
                        <li>
                            Transit Gatewayは時間課金+データ処理料金が発生するが、多数のVPCを接続する場合は<strong>運用コストと将来の拡張性</strong>の観点で有利になりやすい。少数VPC(2〜3個)ならピアリングの方がシンプルでコスト効率が良い場合もある。
                        </li>
                    </ul>
                    <p>
                        <strong>VPCエンドポイントによるコスト削減</strong>
                    </p>
                    <Diagram id="mermaid-src-25" label="VPCエンドポイントとNATの比較" />
                    <ul>
                        <li>
                            S3やDynamoDBへのアクセスは<strong>Gateway型VPCエンドポイント</strong>を使うことで、NAT Gateway経由のデータ処理料金を回避できる(Gateway型エンドポイント自体は無料)。
                        </li>
                        <li>
                            その他のAWSサービスへは<strong>Interface型VPCエンドポイント</strong>(PrivateLink)を使うことでインターネットゲートウェイ・NAT経由を避けられるが、こちらは時間課金+データ処理料金が発生するため、通信量とのバランスで判断する。
                        </li>
                    </ul>
                    <blockquote>
                        <p>
                            出典:{' '}
                            <a href="https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html" target="_blank" rel="noreferrer">
                                AWS Transit Gateway とは
                            </a>{' '}
                            /{' '}
                            <a href="https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html" target="_blank" rel="noreferrer">
                                VPCピアリングとは
                            </a>{' '}
                            /{' '}
                            <a href="https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints.html" target="_blank" rel="noreferrer">
                                VPCエンドポイント
                            </a>
                        </p>
                    </blockquote>
                    <h3 id="444-データ転送コストの最小化">4.4.4 データ転送コストの最小化</h3>
                    <Diagram id="mermaid-src-26" label="データ転送コスト構造" />
                    <table>
                        <thead>
                            <tr className="header">
                                <th>通信経路</th>
                                <th>コスト傾向</th>
                                <th>最適化手法</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>同一AZ内</td>
                                <td>無料</td>
                                <td>可能な限り同一AZ内で完結する設計(ただし可用性とのトレードオフに注意)</td>
                            </tr>
                            <tr className="even">
                                <td>AZ間(同一リージョン)</td>
                                <td>低コストだが有料</td>
                                <td>Auto Scalingグループやマイクロサービス間通信の配置を意識</td>
                            </tr>
                            <tr className="odd">
                                <td>リージョン間</td>
                                <td>高コスト</td>
                                <td>本当にマルチリージョンが必要かを精査し、不要な複製を避ける</td>
                            </tr>
                            <tr className="even">
                                <td>インターネットへのアウトバウンド</td>
                                <td>最も高コスト</td>
                                <td>CloudFrontでキャッシュしオリジンへのアクセス自体を削減</td>
                            </tr>
                        </tbody>
                    </table>
                    <blockquote>
                        <p>
                            出典:{' '}
                            <a href="https://aws.amazon.com/ec2/pricing/on-demand/" target="_blank" rel="noreferrer">
                                Amazon EC2 オンデマンド料金(データ転送)
                            </a>{' '}
                            /{' '}
                            <a href="https://docs.aws.amazon.com/whitepapers/latest/how-aws-pricing-works/data-transfer.html" target="_blank" rel="noreferrer">
                                AWSの料金の仕組み: データ転送
                            </a>
                        </p>
                    </blockquote>
                    <h3 id="445-cdnエッジキャッシングの活用">4.4.5 CDN・エッジキャッシングの活用</h3>
                    <Diagram id="mermaid-src-27" label="CloudFront / Global Accelerator" />
                    <ul>
                        <li>
                            CloudFrontでコンテンツをキャッシュすることで、オリジン(S3やEC2)へのリクエスト数・データ転送量を削減し、直接的にコストダウンにつながる。
                        </li>
                        <li>
                            Global Acceleratorは静的コンテンツのキャッシュではなく、TCP/UDPトラフィックをAWSのバックボーンネットワーク経由でルーティングし、レイテンシー改善とDDoS耐性を提供する(コスト最適化というよりパフォーマンス/可用性寄りだが、ネットワーク経路のコスト構造として出題される)。
                        </li>
                    </ul>
                    <blockquote>
                        <p>
                            出典:{' '}
                            <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html" target="_blank" rel="noreferrer">
                                Amazon CloudFront とは
                            </a>{' '}
                            /{' '}
                            <a href="https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html" target="_blank" rel="noreferrer">
                                AWS Global Accelerator とは
                            </a>
                        </p>
                    </blockquote>
                    <h3 id="446-スロットリング戦略">4.4.6 スロットリング戦略</h3>
                    <Diagram id="mermaid-src-28" label="API Gatewayスロットリング" />
                    <ul>
                        <li>
                            スロットリング(使用量プランやレート制限)は、意図しない大量リクエストによるバックエンドの過剰スケーリング・想定外の高額請求を防ぐガードレールとして機能する。
                        </li>
                        <li>
                            API Gatewayの使用量プラン(Usage Plans)でAPIキーごとにレート制限・クォータを設定し、特定クライアントによるコスト暴走を防ぐ。
                        </li>
                    </ul>
                    <blockquote>
                        <p>
                            出典:{' '}
                            <a href="https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html" target="_blank" rel="noreferrer">
                                Amazon API Gateway でのリクエストスロットリング
                            </a>
                        </p>
                    </blockquote>
                    <h3 id="447-task-44-ベストプラクティスまとめ">4.4.7 Task 4.4 ベストプラクティスまとめ</h3>
                    <table>
                        <thead>
                            <tr className="header">
                                <th>項目</th>
                                <th>ベストプラクティス</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>NAT配置</td>
                                <td>本番はAZごとに配置して可用性確保、開発環境などコスト優先時は共有NATやNATインスタンスも検討</td>
                            </tr>
                            <tr className="even">
                                <td>接続方式</td>
                                <td>継続的・大容量通信はDirect Connect、一時的・小規模はVPNから開始</td>
                            </tr>
                            <tr className="odd">
                                <td>ルーティング</td>
                                <td>VPC数が多い場合はTransit Gatewayで集約、少数ならピアリングで十分な場合も</td>
                            </tr>
                            <tr className="even">
                                <td>VPCエンドポイント</td>
                                <td>S3/DynamoDBはGatewayエンドポイントで無料化、他サービスはInterfaceエンドポイントとNAT経由コストを比較</td>
                            </tr>
                            <tr className="odd">
                                <td>データ転送</td>
                                <td>AZ間・リージョン間・インターネットの順にコストが上がることを意識した設計</td>
                            </tr>
                            <tr className="even">
                                <td>CDN活用</td>
                                <td>CloudFrontでオリジンアクセスを削減し、転送量そのものを圧縮</td>
                            </tr>
                            <tr className="odd">
                                <td>スロットリング</td>
                                <td>使用量プランで想定外の高額請求を未然に防止</td>
                            </tr>
                        </tbody>
                    </table>
                    <hr />
                    <h2 id="references">参考文献</h2>
                    <div className="ref-grid">
                        <div className="ref-card">
                            <h3 id="コスト管理ツール機能">コスト管理ツール・機能</h3>
                            <ul>
                                <li>
                                    <a href="https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html" target="_blank" rel="noreferrer">
                                        AWS Cost Explorer とは
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html" target="_blank" rel="noreferrer">
                                        AWS Budgets を使用したコスト管理
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html" target="_blank" rel="noreferrer">
                                        AWS Cost and Usage Report とは
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html" target="_blank" rel="noreferrer">
                                        コスト配分タグの使用
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_consolidated-billing.html" target="_blank" rel="noreferrer">
                                        AWS Organizations の連結請求
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor.html" target="_blank" rel="noreferrer">
                                        AWS Trusted Advisor
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is.html" target="_blank" rel="noreferrer">
                                        AWS Compute Optimizer とは
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/wellarchitected/latest/cost-optimization-pillar/welcome.html" target="_blank" rel="noreferrer">
                                        AWS Well-Architected Framework - コスト最適化の柱
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="ref-card">
                            <h3 id="ストレージtask-41">ストレージ(Task 4.1)</h3>
                            <ul>
                                <li>
                                    <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html" target="_blank" rel="noreferrer">
                                        Amazon S3 とは
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html" target="_blank" rel="noreferrer">
                                        Amazon S3 ストレージクラス
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html" target="_blank" rel="noreferrer">
                                        S3 オブジェクトライフサイクル管理
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/RequesterPaysBuckets.html" target="_blank" rel="noreferrer">
                                        Requester Pays バケットの使用
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volume-types.html" target="_blank" rel="noreferrer">
                                        Amazon EBS ボリュームタイプ
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html" target="_blank" rel="noreferrer">
                                        Amazon EFS とは
                                    </a>
                                </li>
                                <li>
                                    <a href="https://aws.amazon.com/fsx/" target="_blank" rel="noreferrer">
                                        Amazon FSx
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/datasync/latest/userguide/what-is-datasync.html" target="_blank" rel="noreferrer">
                                        AWS DataSync とは
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/transfer/latest/userguide/what-is-aws-transfer-family.html" target="_blank" rel="noreferrer">
                                        AWS Transfer Family とは
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/storagegateway/latest/userguide/WhatIsStorageGateway.html" target="_blank" rel="noreferrer">
                                        AWS Storage Gateway とは
                                    </a>
                                </li>
                                <li>
                                    <a href="https://aws.amazon.com/snow/" target="_blank" rel="noreferrer">
                                        AWS Snow Family
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html" target="_blank" rel="noreferrer">
                                        AWS Backup とは
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.html" target="_blank" rel="noreferrer">
                                        S3 Glacier Vault Lock
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="ref-card">
                            <h3 id="コンピューティングtask-42">コンピューティング(Task 4.2)</h3>
                            <ul>
                                <li>
                                    <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-purchasing-options.html" target="_blank" rel="noreferrer">
                                        Amazon EC2 インスタンス購入オプション
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html" target="_blank" rel="noreferrer">
                                        Spotインスタンスの使用
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html" target="_blank" rel="noreferrer">
                                        Savings Plans とは
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-reserved-instances.html" target="_blank" rel="noreferrer">
                                        リザーブドインスタンス
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html" target="_blank" rel="noreferrer">
                                        Amazon EC2 インスタンスタイプ
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html" target="_blank" rel="noreferrer">
                                        Amazon EC2 Auto Scaling とは
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Hibernate.html" target="_blank" rel="noreferrer">
                                        EC2 インスタンスの休止(Hibernate)
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/lambda/latest/dg/welcome.html" target="_blank" rel="noreferrer">
                                        AWS Lambda とは
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/AmazonECS/latest/userguide/what-is-fargate.html" target="_blank" rel="noreferrer">
                                        AWS Fargate とは
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/batch/latest/userguide/what-is-batch.html" target="_blank" rel="noreferrer">
                                        AWS Batch とは
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/elastic-load-balancing.html" target="_blank" rel="noreferrer">
                                        Elastic Load Balancing とは
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html" target="_blank" rel="noreferrer">
                                        Application Load Balancer
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/elasticloadbalancing/latest/network/introduction.html" target="_blank" rel="noreferrer">
                                        Network Load Balancer
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/elasticloadbalancing/latest/gateway/introduction.html" target="_blank" rel="noreferrer">
                                        Gateway Load Balancer
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/outposts/latest/userguide/what-is-outposts.html" target="_blank" rel="noreferrer">
                                        AWS Outposts とは
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/local-zones/latest/ug/what-is-aws-local-zones.html" target="_blank" rel="noreferrer">
                                        AWS Local Zones とは
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/wavelength/latest/developerguide/what-is-wavelength.html" target="_blank" rel="noreferrer">
                                        AWS Wavelength とは
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="ref-card">
                            <h3 id="データベースtask-43">データベース(Task 4.3)</h3>
                            <ul>
                                <li>
                                    <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html" target="_blank" rel="noreferrer">
                                        Amazon RDS とは
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html" target="_blank" rel="noreferrer">
                                        Amazon Aurora の概要
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html" target="_blank" rel="noreferrer">
                                        Amazon DynamoDB とは
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadWriteCapacityMode.html" target="_blank" rel="noreferrer">
                                        DynamoDB の読み込み/書き込みキャパシティモード
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html" target="_blank" rel="noreferrer">
                                        Amazon RDS Proxy
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html" target="_blank" rel="noreferrer">
                                        Amazon RDS の読み取りレプリカの使用
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/WhatIs.html" target="_blank" rel="noreferrer">
                                        Amazon ElastiCache とは
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.html" target="_blank" rel="noreferrer">
                                        DynamoDB Accelerator (DAX)
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.html" target="_blank" rel="noreferrer">
                                        Amazon RDS の自動バックアップの使用
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html" target="_blank" rel="noreferrer">
                                        AWS Database Migration Service とは
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/SchemaConversionTool/latest/userguide/CHAP_Welcome.html" target="_blank" rel="noreferrer">
                                        AWS Schema Conversion Tool
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="ref-card">
                            <h3 id="ネットワークtask-44">ネットワーク(Task 4.4)</h3>
                            <ul>
                                <li>
                                    <a href="https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html" target="_blank" rel="noreferrer">
                                        NATゲートウェイ
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html" target="_blank" rel="noreferrer">
                                        AWS Direct Connect とは
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html" target="_blank" rel="noreferrer">
                                        AWS Site-to-Site VPN
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html" target="_blank" rel="noreferrer">
                                        AWS Transit Gateway とは
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html" target="_blank" rel="noreferrer">
                                        VPCピアリングとは
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints.html" target="_blank" rel="noreferrer">
                                        VPCエンドポイント
                                    </a>
                                </li>
                                <li>
                                    <a href="https://aws.amazon.com/ec2/pricing/on-demand/" target="_blank" rel="noreferrer">
                                        Amazon EC2 オンデマンド料金(データ転送)
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/whitepapers/latest/how-aws-pricing-works/data-transfer.html" target="_blank" rel="noreferrer">
                                        AWSの料金の仕組み: データ転送
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html" target="_blank" rel="noreferrer">
                                        Amazon CloudFront とは
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html" target="_blank" rel="noreferrer">
                                        AWS Global Accelerator とは
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html" target="_blank" rel="noreferrer">
                                        Amazon API Gateway でのリクエストスロットリング
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="ref-card">
                            <h3 id="試験ガイド本体">試験ガイド本体</h3>
                            <ul>
                                <li>
                                    <a href="https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html" target="_blank" rel="noreferrer">
                                        AWS Certified Solutions Architect - Associate (SAA-C03) Exam Guide
                                    </a>
                                </li>
                                <li>
                                    <a href="https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain4.html" target="_blank" rel="noreferrer">
                                        Content Domain 4: Design Cost-Optimized Architectures
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
