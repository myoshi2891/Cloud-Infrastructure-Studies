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

                    <h2 id="intro">はじめに</h2>
                    <p>
                        このガイドは、AWS Certified Solutions Architect - Associate (SAA-C03) 試験のドメイン4「<strong>コスト最適化アーキテクチャの設計 (Design Cost-Optimized Architectures)</strong>」を、初学者の方でも一つずつ理解できるようにステップバイステップで解説するものです。
                    </p>
                    <p>ドメイン4は試験全体の<strong>20%</strong>を占め、4つのタスクで構成されています。</p>
                    <p><strong>SAA-C03 試験ドメイン別出題比率(ドメイン4を中心に)</strong></p>
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
                                <th>ツール / 機能</th>
                                <th>主な用途と特徴</th>
                                <th>試験での問われ方(キーフレーズ)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>Consolidated Billing (連結請求)</td>
                                <td>AWS Organizations で複数アカウントの請求を1つに統合。一括割引(ボリュームディスカウント)が全アカウントに適用される。</td>
                                <td>「複数アカウントの請求を一本化」「ボリュームディスカウントを組織全体で活用」</td>
                            </tr>
                            <tr className="even">
                                <td>コスト配分タグ (Cost Allocation Tags)</td>
                                <td>リソースに「Environment: Prod」「Department: Sales」等のタグを付与し、コストを部署・環境ごとに分類・分析する。</td>
                                <td>「部署ごと・プロジェクトごとにコストを詳細追跡」「タグベースのコスト可視化」</td>
                            </tr>
                            <tr className="odd">
                                <td>AWS Cost Explorer</td>
                                <td>過去の使用量とコストを可視化・分析・予測。将来のコスト傾向をグラフで確認できる。</td>
                                <td>「過去の利用実績グラフ化」「今後のコスト予測」「リザーブド/Savings Plans の推奨事項」</td>
                            </tr>
                            <tr className="even">
                                <td>AWS Budgets</td>
                                <td>予算上限を設定し、予測または実際のコスト/使用量が閾値を超えた際に Eメール や SNS・Chatbot・CLI アクションで通知する。</td>
                                <td>「予算超過のアラート通知」「特定の閾値到達時の自動アクション設定」</td>
                            </tr>
                            <tr className="odd">
                                <td>Cost and Usage Report (CUR)</td>
                                <td>最も詳細なコストと使用量のデータを S3 に CSV/Parquet 形式で出力。Athena と連携して SQL 分析が可能。</td>
                                <td>「最も詳細な時間単位・リソース単位の明細」「S3 への自動出力」「Athena での分析」</td>
                            </tr>
                            <tr className="even">
                                <td>AWS Compute Optimizer</td>
                                <td>機械学習を用いて EC2、EBS、Lambda、Auto Scaling などの過剰プロビジョニング(oversized)を検知し、適切なサイズを推奨。</td>
                                <td>「過剰スペックなインスタンスの特定」「機械学習による最適なサイズ推奨」</td>
                            </tr>
                            <tr className="odd">
                                <td>AWS Trusted Advisor</td>
                                <td>コスト最適化・パフォーマンス・セキュリティ・耐障害性・サービス制限の5分野でアカウントをスキャン。未使用のリソース(未アタッチのEBS、空きEIP等)を検出。</td>
                                <td>「アイドル状態のリソース検出」「未アタッチの EBS ボリューム発見」</td>
                            </tr>
                        </tbody>
                    </table>

                    <h3 id="03-ベストプラクティス共通">0.3 ベストプラクティス(共通)</h3>
                    <ul>
                        <li>マルチアカウント環境では Organizations Consolidated Billing を使用して一括割引を効かせる。</li>
                        <li>タグ付けの命名規則を自動化・制約化(AWS Config や SCP)し、コスト追跡漏れを防ぐ。</li>
                        <li>定期的に Compute Optimizer と Trusted Advisor を実行して無駄なリソースを排除する。</li>
                    </ul>

                    <hr />

                    <h2 id="task-4-1">Task 4.1: コスト最適化ストレージソリューションの設計</h2>

                    <h3 id="411-ストレージタイプの理解object--file--block">4.1.1 ストレージタイプの理解(object / file / block)</h3>
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

                    <h3 id="412-s3ストレージクラスとライフサイクル管理ストレージ階層化">4.1.2 S3ストレージクラスとライフサイクル管理(ストレージ階層化)</h3>
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

                    <p><strong>スキル: S3オブジェクトライフサイクルの管理</strong></p>
                    <ul>
                        <li>ライフサイクルルールで「◯日後に別クラスへ移行」「◯日後に削除」を自動化する。</li>
                        <li>マルチパートアップロードの未完了パーツは、放置すると課金され続けるため、ライフサイクルルールで自動削除する設定を忘れずに行う。</li>
                        <li>バージョニングを有効にしている場合、旧バージョンにも別途ライフサイクルルールを設定しないとコストが積み上がる。</li>
                    </ul>

                    <h3 id="413-アクセスオプション-requester-pays">4.1.3 アクセスオプション: Requester Pays</h3>
                    <p>
                        通常、S3のデータ転送・リクエスト料金は「バケット所有者」が支払います。しかし <strong>Requester Pays</strong> を有効にすると、リクエストしたユーザー(ダウンロードする側)がデータ転送とリクエストの費用を負担します。
                    </p>
                    <Diagram id="mermaid-src-05" label="Requester Paysシーケンス" />

                    <h3 id="414-ブロックストレージオプションebsボリュームタイプ">4.1.4 ブロックストレージオプション(EBSボリュームタイプ)</h3>
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

                    <h3 id="415-ハイブリッドストレージオプションオンプレミスとの連携">4.1.5 ハイブリッドストレージオプション(オンプレミスとの連携)</h3>
                    <p>
                        オンプレミス環境からAWSへデータを移行・連携する際、<strong>データ量・接続環境・頻度</strong>によって最適なサービスが異なります。
                    </p>
                    <Diagram id="mermaid-src-07" label="ハイブリッドストレージと移行オプション" />

                    <h3 id="416-バックアップ戦略とデータライフサイクル">4.1.6 バックアップ戦略とデータライフサイクル</h3>
                    <Diagram id="mermaid-src-08" label="バックアップ戦略とデータライフサイクル" />

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

                    <h3 id="422-コンピューティングサービスの選択ec2--lambda--fargate">4.2.2 コンピューティングサービスの選択(EC2 / Lambda / Fargate)</h3>
                    <Diagram id="mermaid-src-11" label="コンピューティングサービスの選択" />

                    <h3 id="423-スケーリング戦略とec2-hibernate">4.2.3 スケーリング戦略とEC2 Hibernate</h3>
                    <Diagram id="mermaid-src-12" label="EC2 Hibernate / Stop / Terminate の選択" />

                    <h3 id="424-ロードバランシング戦略">4.2.4 ロードバランシング戦略</h3>
                    <Diagram id="mermaid-src-13" label="ロードバランサーのタイプ選択" />

                    <h3 id="425-ハイブリッド分散コンピューティング">4.2.5 ハイブリッド・分散コンピューティング</h3>
                    <Diagram id="mermaid-src-14" label="エッジ・ハイブリッドコンピューティング選択" />

                    <h3 id="426-task-42-ベストプラクティスまとめ">4.2.6 Task 4.2 ベストプラクティスまとめ</h3>
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
                    <h3 id="431-データベースタイプとサービスの選択">4.3.1 データベースタイプとサービスの選択</h3>
                    <Diagram id="mermaid-src-15" label="データベース選択フロー" />

                    <h3 id="432-データベースキャパシティプランニング">4.3.2 データベースキャパシティプランニング</h3>
                    <Diagram id="mermaid-src-16" label="DynamoDBキャパシティモード" />

                    <h3 id="433-データベース接続とプロキシ">4.3.3 データベース接続とプロキシ</h3>
                    <Diagram id="mermaid-src-17" label="RDS Proxy構成" />

                    <h3 id="434-データベースレプリケーション読み取りレプリカ">4.3.4 データベースレプリケーション(読み取りレプリカ)</h3>
                    <Diagram id="mermaid-src-18" label="読み取りレプリカ構成" />

                    <h3 id="435-キャッシング戦略">4.3.5 キャッシング戦略</h3>
                    <Diagram id="mermaid-src-19" label="キャッシング戦略" />

                    <h3 id="436-バックアップと保持ポリシー">4.3.6 バックアップと保持ポリシー</h3>
                    <Diagram id="mermaid-src-20" label="バックアップと保持ポリシー" />

                    <h3 id="437-データベース移行homogeneous--heterogeneous">4.3.7 データベース移行(homogeneous / heterogeneous)</h3>
                    <Diagram id="mermaid-src-21" label="データベース移行パターン" />

                    <h3 id="438-task-43-ベストプラクティスまとめ">4.3.8 Task 4.3 ベストプラクティスまとめ</h3>
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
                    <Diagram id="mermaid-src-22" label="NAT Gateway配置設計" />

                    <h3 id="442-ネットワーク接続オプションdirect-connect--vpn--インターネット">4.4.2 ネットワーク接続オプション(Direct Connect / VPN / インターネット)</h3>
                    <Diagram id="mermaid-src-23" label="ネットワーク接続オプションの選択" />

                    <h3 id="443-ネットワークルーティングトポロジーピアリング">4.4.3 ネットワークルーティング・トポロジー・ピアリング</h3>
                    <Diagram id="mermaid-src-24" label="VPCルーティングトポロジー" />
                    <Diagram id="mermaid-src-25" label="VPCエンドポイントとNATの比較" />

                    <h3 id="444-データ転送コストの最小化">4.4.4 データ転送コストの最小化</h3>
                    <Diagram id="mermaid-src-26" label="データ転送コスト構造" />

                    <h3 id="445-cdnエッジキャッシングの活用">4.4.5 CDN・エッジキャッシングの活用</h3>
                    <Diagram id="mermaid-src-27" label="CloudFront / Global Accelerator" />

                    <h3 id="446-スロットリング戦略">4.4.6 スロットリング戦略</h3>
                    <Diagram id="mermaid-src-28" label="API Gatewayスロットリング" />

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
                                <li><a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html" target="_blank" rel="noreferrer">Amazon S3 とは</a></li>
                                <li><a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html" target="_blank" rel="noreferrer">Amazon S3 ストレージクラス</a></li>
                                <li><a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html" target="_blank" rel="noreferrer">S3 オブジェクトライフサイクル管理</a></li>
                                <li><a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/RequesterPaysBuckets.html" target="_blank" rel="noreferrer">Requester Pays バケットの使用</a></li>
                                <li><a href="https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volume-types.html" target="_blank" rel="noreferrer">Amazon EBS ボリュームタイプ</a></li>
                                <li><a href="https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html" target="_blank" rel="noreferrer">Amazon EFS とは</a></li>
                                <li><a href="https://aws.amazon.com/fsx/" target="_blank" rel="noreferrer">Amazon FSx</a></li>
                                <li><a href="https://docs.aws.amazon.com/datasync/latest/userguide/what-is-datasync.html" target="_blank" rel="noreferrer">AWS DataSync とは</a></li>
                                <li><a href="https://docs.aws.amazon.com/transfer/latest/userguide/what-is-aws-transfer-family.html" target="_blank" rel="noreferrer">AWS Transfer Family とは</a></li>
                                <li><a href="https://docs.aws.amazon.com/storagegateway/latest/userguide/WhatIsStorageGateway.html" target="_blank" rel="noreferrer">AWS Storage Gateway とは</a></li>
                                <li><a href="https://aws.amazon.com/snow/" target="_blank" rel="noreferrer">AWS Snow Family</a></li>
                                <li><a href="https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html" target="_blank" rel="noreferrer">AWS Backup とは</a></li>
                                <li><a href="https://docs.aws.amazon.com/amazonglacier/latest/dev/vault-lock.html" target="_blank" rel="noreferrer">S3 Glacier Vault Lock</a></li>
                            </ul>
                        </div>
                        <div className="ref-card">
                            <h3 id="コンピューティングtask-42">コンピューティング(Task 4.2)</h3>
                            <ul>
                                <li><a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-purchasing-options.html" target="_blank" rel="noreferrer">Amazon EC2 インスタンス購入オプション</a></li>
                                <li><a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html" target="_blank" rel="noreferrer">Spotインスタンスの使用</a></li>
                                <li><a href="https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html" target="_blank" rel="noreferrer">Savings Plans とは</a></li>
                                <li><a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-reserved-instances.html" target="_blank" rel="noreferrer">リザーブドインスタンス</a></li>
                                <li><a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html" target="_blank" rel="noreferrer">Amazon EC2 インスタンスタイプ</a></li>
                                <li><a href="https://docs.aws.amazon.com/autoscaling/ec2/userguide/what-is-amazon-ec2-auto-scaling.html" target="_blank" rel="noreferrer">Amazon EC2 Auto Scaling とは</a></li>
                                <li><a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Hibernate.html" target="_blank" rel="noreferrer">EC2 インスタンスの休止(Hibernate)</a></li>
                                <li><a href="https://docs.aws.amazon.com/lambda/latest/dg/welcome.html" target="_blank" rel="noreferrer">AWS Lambda とは</a></li>
                                <li><a href="https://docs.aws.amazon.com/AmazonECS/latest/userguide/what-is-fargate.html" target="_blank" rel="noreferrer">AWS Fargate とは</a></li>
                                <li><a href="https://docs.aws.amazon.com/batch/latest/userguide/what-is-batch.html" target="_blank" rel="noreferrer">AWS Batch とは</a></li>
                                <li><a href="https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/elastic-load-balancing.html" target="_blank" rel="noreferrer">Elastic Load Balancing とは</a></li>
                                <li><a href="https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html" target="_blank" rel="noreferrer">Application Load Balancer</a></li>
                                <li><a href="https://docs.aws.amazon.com/elasticloadbalancing/latest/network/introduction.html" target="_blank" rel="noreferrer">Network Load Balancer</a></li>
                                <li><a href="https://docs.aws.amazon.com/elasticloadbalancing/latest/gateway/introduction.html" target="_blank" rel="noreferrer">Gateway Load Balancer</a></li>
                                <li><a href="https://docs.aws.amazon.com/outposts/latest/userguide/what-is-outposts.html" target="_blank" rel="noreferrer">AWS Outposts とは</a></li>
                                <li><a href="https://docs.aws.amazon.com/local-zones/latest/ug/what-is-aws-local-zones.html" target="_blank" rel="noreferrer">AWS Local Zones とは</a></li>
                                <li><a href="https://docs.aws.amazon.com/wavelength/latest/developerguide/what-is-wavelength.html" target="_blank" rel="noreferrer">AWS Wavelength とは</a></li>
                            </ul>
                        </div>
                        <div className="ref-card">
                            <h3 id="データベースtask-43">データベース(Task 4.3)</h3>
                            <ul>
                                <li><a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html" target="_blank" rel="noreferrer">Amazon RDS とは</a></li>
                                <li><a href="https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html" target="_blank" rel="noreferrer">Amazon Aurora の概要</a></li>
                                <li><a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html" target="_blank" rel="noreferrer">Amazon DynamoDB とは</a></li>
                                <li><a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadWriteCapacityMode.html" target="_blank" rel="noreferrer">DynamoDB の読み込み/書き込みキャパシティモード</a></li>
                                <li><a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html" target="_blank" rel="noreferrer">Amazon RDS Proxy</a></li>
                                <li><a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html" target="_blank" rel="noreferrer">Amazon RDS の読み取りレプリカの使用</a></li>
                                <li><a href="https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/WhatIs.html" target="_blank" rel="noreferrer">Amazon ElastiCache とは</a></li>
                                <li><a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.html" target="_blank" rel="noreferrer">DynamoDB Accelerator (DAX)</a></li>
                                <li><a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.html" target="_blank" rel="noreferrer">Amazon RDS の自動バックアップの使用</a></li>
                                <li><a href="https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html" target="_blank" rel="noreferrer">AWS Database Migration Service とは</a></li>
                                <li><a href="https://docs.aws.amazon.com/SchemaConversionTool/latest/userguide/CHAP_Welcome.html" target="_blank" rel="noreferrer">AWS Schema Conversion Tool</a></li>
                            </ul>
                        </div>
                        <div className="ref-card">
                            <h3 id="ネットワークtask-44">ネットワーク(Task 4.4)</h3>
                            <ul>
                                <li><a href="https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html" target="_blank" rel="noreferrer">NATゲートウェイ</a></li>
                                <li><a href="https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html" target="_blank" rel="noreferrer">AWS Direct Connect とは</a></li>
                                <li><a href="https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html" target="_blank" rel="noreferrer">AWS Site-to-Site VPN</a></li>
                                <li><a href="https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html" target="_blank" rel="noreferrer">AWS Transit Gateway とは</a></li>
                                <li><a href="https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html" target="_blank" rel="noreferrer">VPCピアリングとは</a></li>
                                <li><a href="https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints.html" target="_blank" rel="noreferrer">VPCエンドポイント</a></li>
                                <li><a href="https://aws.amazon.com/ec2/pricing/on-demand/" target="_blank" rel="noreferrer">Amazon EC2 オンデマンド料金(データ転送)</a></li>
                                <li><a href="https://docs.aws.amazon.com/whitepapers/latest/how-aws-pricing-works/data-transfer.html" target="_blank" rel="noreferrer">AWSの料金の仕組み: データ転送</a></li>
                                <li><a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html" target="_blank" rel="noreferrer">Amazon CloudFront とは</a></li>
                                <li><a href="https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html" target="_blank" rel="noreferrer">AWS Global Accelerator とは</a></li>
                                <li><a href="https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-request-throttling.html" target="_blank" rel="noreferrer">Amazon API Gateway でのリクエストスロットリング</a></li>
                            </ul>
                        </div>
                        <div className="ref-card">
                            <h3 id="試験ガイド本体">試験ガイド本体</h3>
                            <ul>
                                <li><a href="https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html" target="_blank" rel="noreferrer">AWS Certified Solutions Architect - Associate (SAA-C03) Exam Guide</a></li>
                                <li><a href="https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain4.html" target="_blank" rel="noreferrer">Content Domain 4: Design Cost-Optimized Architectures</a></li>
                            </ul>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
