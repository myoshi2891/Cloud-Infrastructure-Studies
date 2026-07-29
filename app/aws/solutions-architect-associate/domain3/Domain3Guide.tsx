import React from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS } from './constants';
import { NavBar } from './NavBar';

export function Domain3Guide() {
    return (
        <div className="domain3-page">
            <header className="hero" id="top">
                <div className="content">
                    <div className="eyebrow">AWS Certified Solutions Architect – Associate (SAA-C03)</div>
                    <h1>ドメイン3: 高性能なアーキテクチャの設計 (Design High-Performing Architectures)</h1>
                    <div className="subtitle">試験全体の 24% を占める主要ドメイン。ストレージ、コンピューティング、データベース、ネットワーク、データ転送の5つの技術領域における最適設計手法を徹底解説。</div>
                </div>
            </header>
            <div className="layout">
                <NavBar />
                <main className="content">

                    <section className="content-section">
                        <h2 id="_1">この章で学ぶこと</h2>
                        <p>
                            ドメイン3は「パフォーマンス」と「スケーラビリティ」を軸に、AWSの主要な5つの技術領域を横断します。試験では以下の5つのタスク（Task）に分かれて出題されます。
                        </p>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th>タスク番号</th>
                                        <th>タスク名（公式）</th>
                                        <th>日本語訳</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Task 3.1</td>
                                        <td>
                                            Determine high-performing and/or scalable storage
                                            solutions
                                        </td>
                                        <td>
                                            高性能かつ／またはスケーラブルなストレージソリューションの決定
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Task 3.2</td>
                                        <td>
                                            Design high-performing and elastic compute solutions
                                        </td>
                                        <td>
                                            高性能で弾力性のあるコンピューティングソリューションの設計
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Task 3.3</td>
                                        <td>Determine high-performing database solutions</td>
                                        <td>高性能なデータベースソリューションの決定</td>
                                    </tr>
                                    <tr>
                                        <td>Task 3.4</td>
                                        <td>
                                            Determine high-performing and/or scalable network
                                            architectures
                                        </td>
                                        <td>
                                            高性能かつ／またはスケーラブルなネットワークアーキテクチャの決定
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Task 3.5</td>
                                        <td>
                                            Determine high-performing data ingestion and
                                            transformation solutions
                                        </td>
                                        <td>高性能なデータ取り込み・変換ソリューションの決定</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="source-cite">
                            出典:
                            <a
                                href="https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain3.html"
                                >Content Domain 3: Design High-Performing
                                Architectures（AWS公式）</a
                            >
                        </p>
                        <h3 id="3">ドメイン3の全体像</h3>
                        <div className="mermaid-wrapper">
                            <div className="mermaid-figure">
        <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS['mermaid-0'] || ''} ariaLabel="Mermaid Diagram" preserveNaturalScale />
        </div>
    </div>
                        </div>
                        <hr />
                    </section>
                    <section className="content-section">
                        <h2 id="task-31">
                            Task 3.1: 高性能・スケーラブルなストレージソリューション
                        </h2>
                        <h3 id="_3">出題される知識・スキル項目（公式）</h3>
                        <p>
                            <strong>知識:</strong> -
                            ビジネス要件を満たすハイブリッドストレージソリューション -
                            適切なユースケースを伴うストレージサービス（例: Amazon S3、Amazon
                            EFS、Amazon EBS） - 関連する特性を持つストレージタイプ（例:
                            オブジェクト、ファイル、ブロック）
                        </p>
                        <p>
                            <strong>スキル:</strong> -
                            パフォーマンス要件を満たすストレージサービスと構成の決定 -
                            将来のニーズに対応してスケールできるストレージサービスの決定
                        </p>
                        <p className="source-cite">
                            出典:
                            <a
                                href="https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain3.html#solutions-architect-associate-03-domain3-task1"
                                >Task 3.1（AWS公式Exam Guide）</a
                            >
                        </p>
                        <h3 id="311-3">3.1.1 ストレージ3種類の基本特性</h3>
                        <p>
                            AWSのストレージは大きく
                            <strong>オブジェクト・ファイル・ブロック</strong>
                            の3タイプに分類されます。この分類を理解することが、どのサービスを選ぶべきかの土台になります。
                        </p>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th>特性</th>
                                        <th>オブジェクトストレージ<br />(Amazon S3)</th>
                                        <th>ファイルストレージ<br />(Amazon EFS / FSx)</th>
                                        <th>
                                            ブロックストレージ<br />(Amazon EBS /
                                            インスタンスストア)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>データの単位</td>
                                        <td>オブジェクト（フラットな名前空間、メタデータ付き）</td>
                                        <td>ファイル階層（ディレクトリ構造）</td>
                                        <td>固定サイズのブロック</td>
                                    </tr>
                                    <tr>
                                        <td>アクセス方法</td>
                                        <td>HTTP(S) API（REST）</td>
                                        <td>NFS / SMBプロトコル</td>
                                        <td>OSのファイルシステム経由</td>
                                    </tr>
                                    <tr>
                                        <td>同時アクセス</td>
                                        <td>多数のクライアントから並行アクセス可能</td>
                                        <td>多数のEC2/オンプレミスから同時マウント可能</td>
                                        <td>
                                            基本的に1つのEC2インスタンスに1対1でアタッチ（io2 Block
                                            Expressのマルチアタッチは例外）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>典型的ユースケース</td>
                                        <td>
                                            静的ウェブサイト、バックアップ、データレイク、ログ、メディア配信
                                        </td>
                                        <td>
                                            共有ホームディレクトリ、CMS、コンテンツ管理、ビッグデータ解析の共有領域
                                        </td>
                                        <td>
                                            データベースのボリューム、OSブートボリューム、低レイテンシが必要なトランザクション処理
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>スケーラビリティ</td>
                                        <td>事実上無制限（自動）</td>
                                        <td>自動でペタバイト規模までスケール（EFS）</td>
                                        <td>
                                            ボリュームごとに事前にサイズ・IOPSを指定（gp3/io2は変更可能）
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="source-cite">
                            出典:
                            <a
                                href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html"
                                >Amazon S3の概要</a
                            >
                            /
                            <a href="https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html"
                                >Amazon EFSとは</a
                            >
                            /
                            <a
                                href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AmazonEBS.html"
                                >Amazon EBSの概要</a
                            >
                        </p>
                        <h3 id="_4">ストレージ選定の判断フロー</h3>
                        <div className="mermaid-wrapper">
                            <div className="mermaid-figure">
        <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS['mermaid-1'] || ''} ariaLabel="Mermaid Diagram" preserveNaturalScale />
        </div>
    </div>
                        </div>
                        <h3 id="312-amazon-s3">
                            3.1.2 Amazon S3: ストレージクラスとライフサイクル管理
                        </h3>
                        <p>
                            Amazon
                            S3は<strong>単一のバケット内でオブジェクトごとに異なるストレージクラスを混在</strong>させることができます。パフォーマンス試験対策では「アクセス頻度」と「取得速度要件」の2軸でクラスを選ぶ考え方が重要です。
                        </p>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ストレージクラス</th>
                                        <th>想定アクセス頻度</th>
                                        <th>取得時間</th>
                                        <th>可用性/耐久性の特徴</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>S3 Standard</td>
                                        <td>頻繁</td>
                                        <td>ミリ秒</td>
                                        <td>複数AZに複製、汎用の高性能</td>
                                    </tr>
                                    <tr>
                                        <td>S3 Intelligent-Tiering</td>
                                        <td>不明・変動する</td>
                                        <td>ミリ秒（頻繁/低頻度層）〜時間（アーカイブ層）</td>
                                        <td>アクセスパターンを自動監視し階層間を自動移動</td>
                                    </tr>
                                    <tr>
                                        <td>S3 Standard-IA</td>
                                        <td>低頻度だが即時アクセス必要</td>
                                        <td>ミリ秒</td>
                                        <td>Standardと同等の低レイテンシ、保存コストは低い</td>
                                    </tr>
                                    <tr>
                                        <td>S3 One Zone-IA</td>
                                        <td>低頻度・再作成可能なデータ</td>
                                        <td>ミリ秒</td>
                                        <td>単一AZのみに保存（AZ障害でロスト可能）、最安のIA</td>
                                    </tr>
                                    <tr>
                                        <td>S3 Express One Zone</td>
                                        <td>超高頻度・低レイテンシ最優先</td>
                                        <td>1桁ミリ秒</td>
                                        <td>単一AZ、S3で最速のアクセス速度</td>
                                    </tr>
                                    <tr>
                                        <td>S3 Glacier Instant Retrieval</td>
                                        <td>四半期に1回程度だが即時性が必要</td>
                                        <td>ミリ秒</td>
                                        <td>アーカイブ用途で最安クラスの即時取得層</td>
                                    </tr>
                                    <tr>
                                        <td>S3 Glacier Flexible Retrieval</td>
                                        <td>年1〜2回程度のアクセス</td>
                                        <td>数分〜数時間</td>
                                        <td>低コストアーカイブ、非同期取得</td>
                                    </tr>
                                    <tr>
                                        <td>S3 Glacier Deep Archive</td>
                                        <td>ほぼアクセスしない長期保管</td>
                                        <td>標準12時間以内</td>
                                        <td>S3で最安、コンプライアンス/長期保存向け</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="source-cite">
                            出典:
                            <a href="https://aws.amazon.com/s3/storage-classes/"
                                >Amazon S3 ストレージクラス（公式）</a
                            >
                            /
                            <a href="https://aws.amazon.com/s3/storage-classes/intelligent-tiering/"
                                >S3 Intelligent-Tiering</a
                            >
                            /
                            <a href="https://aws.amazon.com/s3/storage-classes/glacier/"
                                >S3 Glacierストレージクラス</a
                            >
                        </p>
                        <h3 id="s3">S3ライフサイクルポリシーによる自動階層化</h3>
                        <div className="mermaid-wrapper">
                            <div className="mermaid-figure">
        <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS['mermaid-2'] || ''} ariaLabel="Mermaid Diagram" preserveNaturalScale />
        </div>
    </div>
                        </div>
                        <blockquote className="callout callout-practice">
                            <p>
                                <strong>ベストプラクティス:</strong>
                                アクセスパターンが読めない、または変動するワークロード（例:
                                新規サービスのログデータ）には、手動でライフサイクルルールを設計するより先に
                                <strong>S3 Intelligent-Tiering</strong>
                                を検討する。監視・自動化の追加料金のみで、取得料金や早期削除料金が発生しない。
                            </p>
                        </blockquote>
                        <h3 id="313-amazon-ebs">3.1.3 Amazon EBS: ボリュームタイプの選択</h3>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ボリュームタイプ</th>
                                        <th>種別</th>
                                        <th>最大IOPS目安</th>
                                        <th>主な用途</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>gp3（汎用SSD）</td>
                                        <td>SSD</td>
                                        <td>
                                            最大16,000
                                            IOPS（IOPSとスループットを個別に課金・調整可能）
                                        </td>
                                        <td>
                                            ほとんどの汎用ワークロード、仮想デスクトップ、開発/テスト環境
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>gp2（汎用SSD・旧世代）</td>
                                        <td>SSD</td>
                                        <td>ボリュームサイズに比例（バーストクレジット方式）</td>
                                        <td>レガシー互換、小規模ワークロード</td>
                                    </tr>
                                    <tr>
                                        <td>io2 Block Express（プロビジョンドIOPS SSD）</td>
                                        <td>SSD</td>
                                        <td>最大256,000 IOPS</td>
                                        <td>
                                            ミッションクリティカルな大規模DB（Oracle、SAP
                                            HANA等）、サブミリ秒レイテンシが必要な用途
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>io1/io2（プロビジョンドIOPS SSD）</td>
                                        <td>SSD</td>
                                        <td>最大64,000 IOPS</td>
                                        <td>高いIOPSが必要なI/O集約型DB</td>
                                    </tr>
                                    <tr>
                                        <td>st1（スループット最適化HDD）</td>
                                        <td>HDD</td>
                                        <td>— （スループット課金）</td>
                                        <td>
                                            ビッグデータ、データウェアハウス、ログ処理などシーケンシャルI/O
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>sc1（コールドHDD）</td>
                                        <td>HDD</td>
                                        <td>—</td>
                                        <td>アクセス頻度が低い大容量データ、最安コスト</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="source-cite">
                            出典:
                            <a
                                href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volume-types.html"
                                >Amazon EBSボリュームタイプ（公式）</a
                            >
                        </p>
                        <div className="mermaid-wrapper">
                            <div className="mermaid-figure">
        <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS['mermaid-3'] || ''} ariaLabel="Mermaid Diagram" preserveNaturalScale />
        </div>
    </div>
                        </div>
                        <blockquote className="callout callout-practice">
                            <p>
                                <strong>ベストプラクティス:</strong>
                                EC2インスタンスとEBSボリュームの間の帯域（EBS最適化）がボトルネックにならないよう、<strong>EBS最適化対応インスタンスタイプ</strong>を選ぶ。また、単一EC2インスタンス停止時にもデータを永続化したい場合はEBS（インスタンスストアは一時的でインスタンス停止/終了時にデータが消える点に注意）。
                            </p>
                        </blockquote>
                        <h3 id="314-amazon-efs">
                            3.1.4 Amazon EFS: 弾力性のある共有ファイルストレージ
                        </h3>
                        <p>
                            Amazon
                            EFSはLinuxベースのワークロード向けにNFSプロトコルで複数のAZ・複数のインスタンスから同時マウントできるマネージド型ファイルストレージです。
                        </p>
                        <p>
                            <strong>パフォーマンスモード:</strong> -
                            <strong>General Purpose</strong>:
                            低レイテンシ優先。大半のユースケースのデフォルト。 -
                            <strong>Max I/O</strong>:
                            数百〜数千のクライアントからの高い並列アクセスが必要な場合（レイテンシは若干犠牲）。
                        </p>
                        <p>
                            <strong>スループットモード:</strong> -
                            <strong>Bursting Throughput</strong>:
                            ストレージ容量に比例してスループットがスケール（バーストクレジット方式）。
                            - <strong>Elastic Throughput</strong>:
                            ワークロードのI/Oパターンに応じて自動的にスループットをスケール（予測不能なワークロードに最適）。
                            - <strong>Provisioned Throughput</strong>:
                            容量に依存せず必要なスループットを明示的に指定。
                        </p>
                        <p>
                            <strong>ストレージクラス（S3同様のライフサイクル管理）:</strong> - EFS
                            Standard / EFS Standard-IA - EFS One Zone / EFS One
                            Zone-IA（単一AZでコスト削減）
                        </p>
                        <p className="source-cite">
                            出典:
                            <a href="https://docs.aws.amazon.com/efs/latest/ug/performance.html"
                                >Amazon EFSのパフォーマンス</a
                            >
                            /
                            <a href="https://docs.aws.amazon.com/efs/latest/ug/storage-classes.html"
                                >Amazon EFSストレージクラス</a
                            >
                        </p>
                        <div className="mermaid-wrapper">
                            <div className="mermaid-figure">
        <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS['mermaid-4'] || ''} ariaLabel="Mermaid Diagram" preserveNaturalScale />
        </div>
    </div>
                        </div>
                        <blockquote className="callout callout-practice">
                            <p>
                                <strong>ベストプラクティス:</strong>
                                EFSは「複数のAZ・複数のEC2から同時に同じファイルへアクセスする」要件（例:
                                CMS、コンテンツリポジトリ、共有ホームディレクトリ）で採用する。単一インスタンス専有の高性能ブロックストレージが必要ならEBS、Windows(SMB)やHPC(Lustre)、NetApp
                                ONTAP互換が必要ならFSxファミリーを検討する。
                            </p>
                        </blockquote>
                        <h3 id="315-aws-storage-gateway">
                            3.1.5 ハイブリッドストレージ: AWS Storage Gateway
                        </h3>
                        <p>
                            オンプレミス環境とAWSのストレージをシームレスに統合するためのサービスです。試験では「オンプレミスのレガシーアプリをそのまま使いながらクラウドのストレージを活用したい」という要件で問われます。
                        </p>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Storage Gatewayタイプ</th>
                                        <th>提供プロトコル</th>
                                        <th>主なユースケース</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Amazon S3 File Gateway</td>
                                        <td>NFS / SMB</td>
                                        <td>
                                            オンプレミスアプリからファイルとしてS3にアクセス（S3上はネイティブオブジェクトとして保存）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon FSx File Gateway</td>
                                        <td>SMB</td>
                                        <td>
                                            オンプレミスからFSx for Windows File
                                            Serverへ低レイテンシアクセス
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Volume Gateway（キャッシュ型）</td>
                                        <td>iSCSI</td>
                                        <td>
                                            オンプレミスのプライマリデータをS3に保存しつつ、よく使うデータのみローカルにキャッシュ
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Volume Gateway（保管型）</td>
                                        <td>iSCSI</td>
                                        <td>
                                            オンプレミスにプライマリデータを保持しつつ、非同期でS3にバックアップ（災害復旧用）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Tape Gateway</td>
                                        <td>iSCSI仮想テープライブラリ(VTL)</td>
                                        <td>
                                            既存のテープバックアップソフトウェアをそのまま使い、実体はS3/Glacierに保存
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="source-cite">
                            出典:
                            <a
                                href="https://docs.aws.amazon.com/storagegateway/latest/userguide/WhatIsStorageGateway.html"
                                >AWS Storage Gatewayとは（公式）</a
                            >
                        </p>
                        <div className="mermaid-wrapper">
                            <div className="mermaid-figure">
        <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS['mermaid-5'] || ''} ariaLabel="Mermaid Diagram" preserveNaturalScale />
        </div>
    </div>
                        </div>
                        <blockquote className="callout callout-practice">
                            <p>
                                <strong>ベストプラクティス:</strong>
                                「オンプレミスのファイルサーバーを段階的にクラウド移行したい」→
                                <strong>File Gateway</strong
                                >。「オンプレミスのブロックストレージ(iSCSI)をバックアップ/DR目的でクラウド化したい」→
                                <strong>Volume Gateway</strong
                                >。「既存のテープバックアップ運用を変えずにコストだけ削減したい」→
                                <strong>Tape Gateway</strong>。大量データの一括移行なら
                                <strong>AWS Snow Family</strong>、継続的な同期・転送が必要なら
                                <strong>AWS DataSync</strong>（Task 3.5で詳述）を使い分ける。
                            </p>
                        </blockquote>
                        <hr />
                    </section>
                    <section className="content-section">
                        <h2 id="task-32">
                            Task 3.2: 高性能で弾力性のあるコンピューティングソリューション
                        </h2>
                        <h3 id="_5">出題される知識・スキル項目（公式）</h3>
                        <p>
                            <strong>知識:</strong> -
                            適切なユースケースを伴うAWSコンピューティングサービス（例: AWS
                            Batch、Amazon EMR、AWS Fargate） -
                            AWSのグローバルインフラストラクチャとエッジサービスがサポートする分散コンピューティングの概念
                            - キューイングとメッセージングの概念（例: パブリッシュ/サブスクライブ）
                            - 適切なユースケースを伴うスケーラビリティ機能（例: Amazon EC2 Auto
                            Scaling、AWS Auto Scaling） - サーバーレステクノロジーとパターン（例:
                            AWS Lambda、Fargate） - コンテナのオーケストレーション（例: Amazon
                            ECS、Amazon EKS）
                        </p>
                        <p>
                            <strong>スキル:</strong> -
                            コンポーネントが独立してスケールできるようにワークロードを疎結合化する -
                            スケーリングアクションを実行するための指標と条件の特定 -
                            ビジネス要件を満たす適切なコンピューティングオプションと機能の選択（例:
                            EC2インスタンスタイプ） -
                            ビジネス要件を満たす適切なリソースタイプとサイズの選択（例:
                            Lambdaメモリの量）
                        </p>
                        <p className="source-cite">
                            出典:
                            <a
                                href="https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain3.html#solutions-architect-associate-03-domain3-task2"
                                >Task 3.2（AWS公式Exam Guide）</a
                            >
                        </p>
                        <h3 id="321">3.2.1 コンピューティングサービスの全体マップ</h3>
                        <div className="mermaid-wrapper">
                            <div className="mermaid-figure">
        <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS['mermaid-6'] || ''} ariaLabel="Mermaid Diagram" preserveNaturalScale />
        </div>
    </div>
                        </div>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th>サービス</th>
                                        <th>管理レベル</th>
                                        <th>典型的ユースケース</th>
                                        <th>ソース</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Amazon EC2</td>
                                        <td>ユーザーがOS/ミドルウェアまで管理</td>
                                        <td>
                                            汎用ワークロード、レガシーアプリ移行、細かなインスタンスタイプ選択が必要な場合
                                        </td>
                                        <td>
                                            <a
                                                href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html"
                                                >EC2ユーザーガイド</a
                                            >
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS Lambda</td>
                                        <td>サーバーレス（コードのみ管理）</td>
                                        <td>
                                            イベント駆動処理、APIバックエンド、ETLの軽量変換、非同期処理
                                        </td>
                                        <td>
                                            <a
                                                href="https://docs.aws.amazon.com/lambda/latest/dg/welcome.html"
                                                >Lambda開発者ガイド</a
                                            >
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS Fargate</td>
                                        <td>サーバーレス（コンテナのみ管理）</td>
                                        <td>
                                            サーバー管理をしたくないコンテナワークロード（ECS/EKS上で稼働）
                                        </td>
                                        <td>
                                            <a
                                                href="https://docs.aws.amazon.com/AmazonECS/latest/userguide/what-is-fargate.html"
                                                >AWS Fargateとは</a
                                            >
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon ECS</td>
                                        <td>AWSネイティブなコンテナオーケストレーション</td>
                                        <td>AWS標準機能で完結させたいコンテナ運用</td>
                                        <td>
                                            <a
                                                href="https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html"
                                                >Amazon ECSとは</a
                                            >
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon EKS</td>
                                        <td>マネージドKubernetes</td>
                                        <td>既にKubernetesを運用中/マルチクラウド前提の組織</td>
                                        <td>
                                            <a
                                                href="https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html"
                                                >Amazon EKSとは</a
                                            >
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS Batch</td>
                                        <td>フルマネージドバッチスケジューラ</td>
                                        <td>
                                            大量の計算集約型バッチジョブ(ゲノム解析、金融シミュレーション等)
                                        </td>
                                        <td>
                                            <a
                                                href="https://docs.aws.amazon.com/batch/latest/userguide/what-is-batch.html"
                                                >AWS Batchとは</a
                                            >
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon EMR</td>
                                        <td>マネージドHadoop/Sparkクラスタ</td>
                                        <td>ビッグデータ処理、ETL、機械学習の前処理</td>
                                        <td>
                                            <a
                                                href="https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-what-is-emr.html"
                                                >Amazon EMRとは</a
                                            >
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <h3 id="322-ec2-auto-scaling">3.2.2 EC2 Auto Scalingによる弾力性の実現</h3>
                        <p>
                            高性能アーキテクチャの中核は「需要に応じて自動的にリソースを増減する」弾力性（Elasticity）です。EC2
                            Auto Scalingは <strong>起動テンプレート</strong> と
                            <strong>Auto Scalingグループ(ASG)</strong> を使ってこれを実現します。
                        </p>
                        <div className="mermaid-wrapper">
                            <div className="mermaid-figure">
        <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS['mermaid-7'] || ''} ariaLabel="Mermaid Diagram" preserveNaturalScale />
        </div>
    </div>
                        </div>
                        <p><strong>スケーリングポリシーの種類:</strong></p>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ポリシー種別</th>
                                        <th>動作</th>
                                        <th>適したシナリオ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ターゲット追跡スケーリング</td>
                                        <td>
                                            指定した指標（例:
                                            平均CPU使用率50%）を維持するよう自動調整
                                        </td>
                                        <td>最も一般的でシンプル。多くのケースで第一選択</td>
                                    </tr>
                                    <tr>
                                        <td>ステップスケーリング</td>
                                        <td>
                                            しきい値超過の度合いに応じて段階的にスケール量を変える
                                        </td>
                                        <td>負荷の急増に細かく対応したい場合</td>
                                    </tr>
                                    <tr>
                                        <td>シンプルスケーリング</td>
                                        <td>1つのアラームに基づき固定量でスケール</td>
                                        <td>レガシー的な手法、現在はターゲット追跡が推奨</td>
                                    </tr>
                                    <tr>
                                        <td>スケジュールに基づくスケーリング</td>
                                        <td>既知の時間帯（例: 毎朝9時）に合わせて事前にスケール</td>
                                        <td>予測可能なトラフィックパターン（月末バッチ等）</td>
                                    </tr>
                                    <tr>
                                        <td>予測スケーリング</td>
                                        <td>機械学習で将来の負荷を予測し事前にスケール</td>
                                        <td>周期的なトラフィックパターンがある場合</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="source-cite">
                            出典:
                            <a
                                href="https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-simple-step.html"
                                >Amazon EC2 Auto Scalingのスケーリングポリシー</a
                            >
                            /
                            <a
                                href="https://docs.aws.amazon.com/autoscaling/plans/userguide/what-is-aws-auto-scaling.html"
                                >AWS Auto Scalingとは</a
                            >
                        </p>
                        <blockquote className="callout callout-practice">
                            <p>
                                <strong>ベストプラクティス:</strong>
                                <strong>AWS Auto Scaling</strong>（複数サービス横断）と<strong
                                    >Amazon EC2 Auto Scaling</strong
                                >（EC2専用）の違いに注意。前者はEC2・ECS・DynamoDB・Auroraなど複数リソースのスケーリングを一元管理するための上位サービスであり、後者はEC2のASGそのものを指す。試験では文脈でどちらを指しているか読み分ける。
                            </p>
                        </blockquote>
                        <h3 id="323-aws-lambda">
                            3.2.3 サーバーレスコンピューティング: AWS Lambda
                        </h3>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th>項目</th>
                                        <th>仕様の目安</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>メモリ設定範囲</td>
                                        <td>128 MB 〜 10,240 MB（64 MB単位で調整可能）</td>
                                    </tr>
                                    <tr>
                                        <td>CPU</td>
                                        <td>
                                            メモリ量に比例して自動割り当て（メモリを増やすとCPUも増える）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>最大実行時間</td>
                                        <td>900秒（15分）</td>
                                    </tr>
                                    <tr>
                                        <td>/tmp一時ストレージ</td>
                                        <td>デフォルト512 MB、最大10,240 MBまで拡張可能</td>
                                    </tr>
                                    <tr>
                                        <td>デプロイパッケージサイズ</td>
                                        <td>展開後250 MBまで（レイヤー含む）</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="source-cite">
                            出典:
                            <a
                                href="https://docs.aws.amazon.com/lambda/latest/dg/configuration-memory.html"
                                >Lambda関数のメモリ設定</a
                            >
                            /
                            <a
                                href="https://docs.aws.amazon.com/lambda/latest/dg/troubleshooting-configuration.html"
                                >Lambdaの設定に関するトラブルシューティング</a
                            >
                        </p>
                        <blockquote className="callout callout-practice">
                            <p>
                                <strong>ベストプラクティス:</strong>
                                CPU集約的な処理で実行時間が長い場合、まず<strong>メモリを増やす</strong>ことを検討する（メモリ増加=CPU増加のため、処理が速くなり結果的にコストが変わらない、あるいは下がることがある）。15分の実行時間上限を超えるバッチ処理は、<strong
                                    >AWS Step Functions</strong
                                >で複数のLambda関数をオーケストレーションするか、<strong
                                    >AWS Batch</strong
                                >/<strong>Amazon EMR</strong
                                >などLambda以外のコンピューティングオプションを検討する。
                            </p>
                        </blockquote>
                        <h3 id="324-ecs-vs-eks-vs-fargate">
                            3.2.4 コンテナオーケストレーション: ECS vs EKS vs Fargate
                        </h3>
                        <p>
                            「オーケストレーター（何が管理するか）」と「起動タイプ（どこで実行されるか）」は独立した軸として理解する。
                        </p>
                        <div className="mermaid-wrapper">
                            <div className="mermaid-figure">
        <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS['mermaid-8'] || ''} ariaLabel="Mermaid Diagram" preserveNaturalScale />
        </div>
    </div>
                        </div>
                        <p className="source-cite">
                            出典:
                            <a
                                href="https://docs.aws.amazon.com/AmazonECS/latest/userguide/what-is-fargate.html"
                                >AWS Fargateとは</a
                            >
                            /
                            <a
                                href="https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html"
                                >Amazon ECSとEKSの選択に関する考え方</a
                            >
                        </p>
                        <blockquote className="callout callout-practice">
                            <p>
                                <strong>ベストプラクティス:</strong>
                                「サーバーのパッチ適用やキャパシティ管理から解放されたい」→
                                <strong>Fargate起動タイプ</strong
                                >。「既にKubernetesの知識・マニフェストが社内に蓄積されている、またはオンプレミス/他クラウドとの一貫性が必要」→
                                <strong>EKS</strong>。「AWSに閉じたシンプルな構成にしたい」→
                                <strong>ECS</strong>。
                            </p>
                        </blockquote>
                        <h3 id="325">
                            3.2.5 ワークロードの疎結合化: キューイングとパブリッシュ/サブスクライブ
                        </h3>
                        <p>
                            高性能アーキテクチャでは、コンポーネント同士を疎結合にすることで、それぞれが独立してスケールできるようにします。代表的な2つのパターンです。
                        </p>
                        <div className="mermaid-wrapper">
                            <div className="mermaid-figure">
        <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS['mermaid-9'] || ''} ariaLabel="Mermaid Diagram" preserveNaturalScale />
        </div>
    </div>
                        </div>
                        <div className="mermaid-wrapper">
                            <div className="mermaid-figure">
        <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS['mermaid-10'] || ''} ariaLabel="Mermaid Diagram" preserveNaturalScale />
        </div>
    </div>
                        </div>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th>概念</th>
                                        <th>サービス</th>
                                        <th>特徴</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>キュー(1対1)</td>
                                        <td>Amazon SQS</td>
                                        <td>
                                            メッセージはキューに保持され、1つのコンシューマーが処理。処理側の急増するバックログを吸収するバッファとして機能し、送信側と受信側の速度差を吸収する
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>パブリッシュ/サブスクライブ(1対多)</td>
                                        <td>Amazon SNS</td>
                                        <td>
                                            1つのメッセージを複数のサブスクライバー（SQSキュー、Lambda、HTTPSエンドポイント等）に同時配信（ファンアウト）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>イベントルーティング</td>
                                        <td>Amazon EventBridge</td>
                                        <td>
                                            イベントの内容に基づき複数のターゲットへルールベースでルーティング。SaaS連携も可能
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="source-cite">
                            出典:
                            <a
                                href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html"
                                >Amazon SQSとは</a
                            >
                            /
                            <a href="https://docs.aws.amazon.com/sns/latest/dg/welcome.html"
                                >Amazon SNSとは</a
                            >
                            /
                            <a
                                href="https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html"
                                >Amazon EventBridgeとは</a
                            >
                        </p>
                        <blockquote className="callout callout-practice">
                            <p>
                                <strong>ベストプラクティス:</strong>
                                フロントエンドが受け付けた大量のリクエストをバックエンドの処理速度に関わらず受け止めたい場合、間に<strong>SQSキュー</strong>を挟んで疎結合化する。これにより、バックエンドの処理が一時的に遅れてもリクエストが失われず、バックエンド側は自分のペースでAuto
                                Scalingしながら処理できる（バッファリングによる負荷平準化）。
                            </p>
                        </blockquote>
                        <hr />
                    </section>
                    <section className="content-section">
                        <h2 id="task-33">Task 3.3: 高性能なデータベースソリューション</h2>
                        <h3 id="_6">出題される知識・スキル項目（公式）</h3>
                        <p>
                            <strong>知識:</strong> - AWSグローバルインフラストラクチャ（例:
                            アベイラビリティーゾーン、AWSリージョン） -
                            キャッシング戦略とサービス（例: Amazon ElastiCache） -
                            データアクセスパターン（例: 読み取り集約型と書き込み集約型の比較） -
                            データベースのキャパシティプランニング（例:
                            キャパシティユニット、インスタンスタイプ、プロビジョンドIOPS） -
                            データベース接続とプロキシ -
                            適切なユースケースを伴うデータベースエンジン（例:
                            異種間移行、同種間移行） - データベースレプリケーション（例:
                            読み取りレプリカ） - データベースのタイプとサービス（例:
                            サーバーレス、リレーショナルと非リレーショナルの比較、インメモリ）
                        </p>
                        <p>
                            <strong>スキル:</strong> - ビジネス要件を満たす読み取りレプリカの構成 -
                            データベースアーキテクチャの設計 - 適切なデータベースエンジンの決定（例:
                            MySQLとPostgreSQLの比較） - 適切なデータベースタイプの決定（例: Amazon
                            Aurora、Amazon DynamoDB） - ビジネス要件を満たすキャッシングの統合
                        </p>
                        <p className="source-cite">
                            出典:
                            <a
                                href="https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain3.html#solutions-architect-associate-03-domain3-task3"
                                >Task 3.3（AWS公式Exam Guide）</a
                            >
                        </p>
                        <h3 id="331">3.3.1 データベースタイプの選択フロー</h3>
                        <div className="mermaid-wrapper">
                            <div className="mermaid-figure">
        <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS['mermaid-11'] || ''} ariaLabel="Mermaid Diagram" preserveNaturalScale />
        </div>
    </div>
                        </div>
                        <p className="source-cite">
                            出典:
                            <a
                                href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html"
                                >Amazon RDSとは</a
                            >
                            /
                            <a
                                href="https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html"
                                >Amazon Auroraとは</a
                            >
                            /
                            <a
                                href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html"
                                >Amazon DynamoDBとは</a
                            >
                        </p>
                        <h3 id="332-amazon-rds-az">
                            3.3.2 Amazon RDS: マルチAZ配置と読み取りレプリカ
                        </h3>
                        <p>
                            <strong>マルチAZ（高可用性）</strong> と
                            <strong>読み取りレプリカ（性能スケーリング）</strong>
                            は目的が異なる点に注意が必要です。
                        </p>
                        <div className="mermaid-wrapper">
                            <div className="mermaid-figure">
        <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS['mermaid-12'] || ''} ariaLabel="Mermaid Diagram" preserveNaturalScale />
        </div>
    </div>
                        </div>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th>目的</th>
                                        <th>機能</th>
                                        <th>ポイント</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>可用性(HA)</strong></td>
                                        <td>マルチAZ配置</td>
                                        <td>
                                            同期レプリケーション。障害時に自動フェイルオーバー。スタンバイは通常のクエリには使えない
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><strong>読み取り性能のスケーリング</strong></td>
                                        <td>読み取りレプリカ</td>
                                        <td>
                                            非同期レプリケーション。読み取り集約型ワークロードの負荷を複数レプリカに分散。同一リージョン内だけでなくクロスリージョンにも作成可能（DR用途にも活用）
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="source-cite">
                            出典:
                            <a
                                href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html"
                                >Amazon RDSのマルチAZ配置</a
                            >
                            /
                            <a
                                href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html"
                                >Amazon RDS読み取りレプリカの操作</a
                            >
                        </p>
                        <blockquote className="callout callout-practice">
                            <p>
                                <strong>ベストプラクティス:</strong>
                                「読み取りが集中してDBがボトルネックになっている」→
                                <strong>読み取りレプリカ</strong
                                >を追加してSELECTクエリを分散する。「DB障害時にダウンタイムを最小化したい」→
                                <strong>マルチAZ配置</strong
                                >で自動フェイルオーバーを構成する。両方を組み合わせる（マルチAZ+複数の読み取りレプリカ）のが一般的な高性能・高可用性構成。
                            </p>
                        </blockquote>
                        <h3 id="333-amazon-aurora">
                            3.3.3 Amazon Aurora: クラウドネイティブなストレージアーキテクチャ
                        </h3>
                        <p>
                            Auroraは、コンピュート層とストレージ層を分離し、ストレージを自動的に複数AZ・6つのコピーへ複製する独自アーキテクチャにより、RDS標準のMySQL/PostgreSQLより高いスループットと耐障害性を実現します。
                        </p>
                        <div className="mermaid-wrapper">
                            <div className="mermaid-figure">
        <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS['mermaid-13'] || ''} ariaLabel="Mermaid Diagram" preserveNaturalScale />
        </div>
    </div>
                        </div>
                        <p>
                            <strong>Aurora特有の高性能機能:</strong> -
                            <strong>Aurora Serverless</strong>:
                            トラフィックに応じてコンピュート容量を自動でスケールアップ/ダウン（断続的・予測不能なワークロードに最適）
                            - <strong>Aurora Global Database</strong>:
                            複数リージョンにまたがるレプリケーション（1秒未満のレプリケーションラグ）でグローバルな読み取り性能とDRを両立
                            - <strong>Auroraレプリカ</strong>:
                            最大15台まで作成可能（標準MySQLは最大5台）で読み取りスケーリングの上限が高い
                        </p>
                        <p className="source-cite">
                            出典:
                            <a
                                href="https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Overview.StorageReliability.html"
                                >Amazon Auroraのストレージと信頼性</a
                            >
                            /
                            <a
                                href="https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.html"
                                >Aurora Serverless v2</a
                            >
                            /
                            <a
                                href="https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html"
                                >Aurora Global Database</a
                            >
                        </p>
                        <h3 id="334-vs">3.3.4 データベースエンジンの移行: 同種間 vs 異種間</h3>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th>移行タイプ</th>
                                        <th>定義</th>
                                        <th>使用するツール</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>同種間移行(Homogeneous)</strong></td>
                                        <td>
                                            同じデータベースエンジン間の移行（例: オンプレミスMySQL
                                            → Amazon RDS for MySQL）
                                        </td>
                                        <td>
                                            AWS
                                            DMS（ネイティブレプリケーション/バックアップリストアも可）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><strong>異種間移行(Heterogeneous)</strong></td>
                                        <td>
                                            異なるデータベースエンジン間の移行（例: Oracle → Amazon
                                            Aurora PostgreSQL）
                                        </td>
                                        <td>AWS SCT（スキーマ変換）+ AWS DMS（データ移行）</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="source-cite">
                            出典:
                            <a href="https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html"
                                >AWS Database Migration Serviceとは</a
                            >
                            /
                            <a
                                href="https://docs.aws.amazon.com/SchemaConversionTool/latest/userguide/CHAP_Welcome.html"
                                >AWS Schema Conversion Toolとは</a
                            >
                        </p>
                        <blockquote className="callout callout-practice">
                            <p>
                                <strong>ベストプラクティス:</strong>
                                試験で「MySQL同士」のようにエンジンが同じ移行が問われたら<strong>DMSのみ</strong>で完結できると考える。「Oracle→Aurora
                                PostgreSQL」のようにエンジンが異なる移行では、まず<strong>SCT</strong>でスキーマ・ストアドプロシージャ等を変換し、その後<strong>DMS</strong>でデータそのものを移行する2段階アプローチになる。
                            </p>
                        </blockquote>
                        <h3 id="335-amazon-dynamodb">
                            3.3.5 Amazon DynamoDB: キャパシティモードとアクセスパターン
                        </h3>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th>キャパシティモード</th>
                                        <th>特徴</th>
                                        <th>適したシナリオ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>オンデマンドモード</td>
                                        <td>
                                            リクエスト数に応じて自動的にスケール、使った分だけ課金
                                        </td>
                                        <td>トラフィックが予測不能・変動が激しいワークロード</td>
                                    </tr>
                                    <tr>
                                        <td>プロビジョンドモード</td>
                                        <td>
                                            読み取り/書き込みキャパシティユニット(RCU/WCU)を事前に指定
                                        </td>
                                        <td>
                                            トラフィックが予測可能で、コストを最適化したい場合（Auto
                                            Scalingと組み合わせも可）
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p>
                            <strong>データアクセスパターンの設計:</strong> -
                            <strong>読み取り集約型(Read-heavy)</strong>: DynamoDB Accelerator (DAX)
                            によるマイクロ秒レベルのインメモリキャッシュ、または読み取りレプリカ/ElastiCacheの活用を検討
                            - <strong>書き込み集約型(Write-heavy)</strong>:
                            パーティションキーの設計を分散させ「ホットパーティション」を避ける。オンデマンドモードやWCUの適切な設計が重要
                        </p>
                        <p className="source-cite">
                            出典:
                            <a
                                href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadWriteCapacityMode.html"
                                >DynamoDBの読み取り/書き込みキャパシティモード</a
                            >
                            /
                            <a
                                href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.html"
                                >DynamoDB Accelerator (DAX)</a
                            >
                        </p>
                        <h3 id="336-amazon-elasticache">
                            3.3.6 キャッシング戦略: Amazon ElastiCache
                        </h3>
                        <p>
                            ElastiCacheは3つのエンジン（<strong>Valkey</strong>・<strong
                                >Redis OSS</strong
                            >・<strong>Memcached</strong>）から選択できるフルマネージド型インメモリデータストアです。AWSは新規構築のワークロードに対して、オープンソースでコスト効率の高い
                            <strong>Valkey</strong> を推奨しています（Redis
                            OSSからのコマンド・クライアント互換のドロップイン代替）。
                        </p>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th>エンジン</th>
                                        <th>特徴</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Valkey</td>
                                        <td>
                                            Linux Foundation管理のオープンソース、Redis
                                            OSS完全互換、AWSが新規ワークロードに推奨、料金面で優位
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Redis OSS</td>
                                        <td>
                                            複雑なデータ構造、レプリケーション、Pub/Sub、トランザクションをサポート
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Memcached</td>
                                        <td>
                                            シンプルなマルチスレッド型キャッシュ、水平分割（パーティショニング）に強いが永続化・複製機能はない
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="source-cite">
                            出典:
                            <a
                                href="https://aws.amazon.com/about-aws/whats-new/2024/10/amazon-elasticache-valkey"
                                >Amazon ElastiCache for Valkeyの発表</a
                            >
                            /
                            <a
                                href="https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/SelectEngine.html"
                                >ElastiCacheのエンジン選択</a
                            >
                        </p>
                        <p><strong>代表的なキャッシング戦略（Redis OSS/Valkey互換）:</strong></p>
                        <div className="mermaid-wrapper">
                            <div className="mermaid-figure">
        <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS['mermaid-14'] || ''} ariaLabel="Mermaid Diagram" preserveNaturalScale />
        </div>
    </div>
                        </div>
                        <div className="mermaid-wrapper">
                            <div className="mermaid-figure">
        <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS['mermaid-15'] || ''} ariaLabel="Mermaid Diagram" preserveNaturalScale />
        </div>
    </div>
                        </div>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th>戦略</th>
                                        <th>メリット</th>
                                        <th>デメリット</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>遅延読み込み(Lazy Loading)</td>
                                        <td>
                                            実際にリクエストされたデータのみキャッシュ（無駄が少ない）
                                        </td>
                                        <td>
                                            初回アクセス時はキャッシュミスによる遅延(cache
                                            penalty)が発生
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>ライトスルー(Write-Through)</td>
                                        <td>キャッシュのデータが常に最新</td>
                                        <td>
                                            書き込みのたびにキャッシュ更新が発生し書き込みレイテンシが増える。使われないデータもキャッシュされがち
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="source-cite">
                            出典:
                            <a
                                href="https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Strategies.html"
                                >キャッシング戦略のベストプラクティス</a
                            >
                        </p>
                        <blockquote className="callout callout-practice">
                            <p>
                                <strong>ベストプラクティス:</strong>
                                読み取り集約型で、同じデータに何度もアクセスされるパターン（商品カタログ、セッション情報等）には<strong>遅延読み込み</strong>が適している。データの鮮度が極めて重要な場合（在庫数など）は<strong>ライトスルー</strong>を検討するが、TTL（有効期限）を併用して古いデータの残留リスクを軽減する。
                            </p>
                        </blockquote>
                        <h3 id="337-amazon-rds-proxy">
                            3.3.7 データベース接続とプロキシ: Amazon RDS Proxy
                        </h3>
                        <p>
                            サーバーレス（Lambda）やマイクロサービスのように大量の短命なコネクションを発生させるアーキテクチャでは、RDS/Auroraのコネクション数上限に達しやすいという課題があります。
                        </p>
                        <div className="mermaid-wrapper">
                            <div className="mermaid-figure">
        <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS['mermaid-16'] || ''} ariaLabel="Mermaid Diagram" preserveNaturalScale />
        </div>
    </div>
                        </div>
                        <p className="source-cite">
                            出典:
                            <a
                                href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html"
                                >Amazon RDS Proxyとは</a
                            >
                        </p>
                        <blockquote className="callout callout-practice">
                            <p>
                                <strong>ベストプラクティス:</strong>
                                「Lambda関数からRDSへの接続で&quot;too many
                                connections&quot;エラーが発生する」という試験の典型的シナリオには<strong
                                    >RDS Proxy</strong
                                >が正解になりやすい。RDS
                                Proxyはコネクションプーリングに加え、フェイルオーバー時の切り替え時間も短縮する。
                            </p>
                        </blockquote>
                        <hr />
                    </section>
                    <section className="content-section">
                        <h2 id="task-34">
                            Task 3.4: 高性能・スケーラブルなネットワークアーキテクチャ
                        </h2>
                        <h3 id="_7">出題される知識・スキル項目（公式）</h3>
                        <p>
                            <strong>知識:</strong> -
                            適切なユースケースを伴うエッジネットワーキングサービス（例: Amazon
                            CloudFront、AWS Global Accelerator） -
                            ネットワークアーキテクチャの設計方法（例:
                            サブネット階層、ルーティング、IPアドレッシング） -
                            ロードバランシングの概念（例: Application Load Balancer） -
                            ネットワーク接続オプション（例: AWS VPN、AWS Direct Connect、AWS
                            PrivateLink）
                        </p>
                        <p>
                            <strong>スキル:</strong> -
                            さまざまなアーキテクチャ（グローバル、ハイブリッド、マルチティア等）向けのネットワークトポロジの作成
                            - 将来のニーズに対応してスケールできるネットワーク構成の決定 -
                            ビジネス要件を満たす適切なリソース配置の決定 -
                            適切なロードバランシング戦略の選択
                        </p>
                        <p className="source-cite">
                            出典:
                            <a
                                href="https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain3.html#solutions-architect-associate-03-domain3-task4"
                                >Task 3.4（AWS公式Exam Guide）</a
                            >
                        </p>
                        <h3 id="341-vpc">3.4.1 VPCのマルチティア・サブネット設計</h3>
                        <p>
                            高性能・高可用性の基本形は「<strong>複数AZにまたがる、階層化されたサブネット設計</strong>」です。
                        </p>
                        <div className="mermaid-wrapper">
                            <div className="mermaid-figure">
        <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS['mermaid-17'] || ''} ariaLabel="Mermaid Diagram" preserveNaturalScale />
        </div>
    </div>
                        </div>
                        <p className="source-cite">
                            出典:
                            <a
                                href="https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html"
                                >VPCとサブネット</a
                            >
                            /
                            <a
                                href="https://docs.aws.amazon.com/vpc/latest/userguide/vpc-example-private-subnets-nat.html"
                                >VPCのシナリオとサンプル構成</a
                            >
                        </p>
                        <p>
                            <strong>サブネット設計のポイント:</strong> -
                            <strong>パブリックサブネット</strong>:
                            インターネットゲートウェイへの経路を持つルートテーブルに関連付けられたサブネット（ALB、NATゲートウェイ、踏み台サーバー等）
                            - <strong>プライベートサブネット</strong>:
                            インターネットゲートウェイへの直接経路を持たないサブネット（アプリケーション層・データ層）。アウトバウンド通信が必要な場合はNATゲートウェイを経由
                            - <strong>CIDR設計</strong>:
                            将来の拡張を見越して、各サブネットに十分なIPアドレス余裕を持たせる（/24なら251個の使用可能IPアドレス、AWSは各サブネットの先頭4個+末尾1個を予約）
                        </p>
                        <blockquote className="callout callout-practice">
                            <p>
                                <strong>ベストプラクティス:</strong>
                                最低でも<strong>2つのAZ</strong>にまたがるサブネット設計を行い、単一AZ障害でもサービスを継続できるようにする。データ層のサブネットには<strong>インターネットゲートウェイへの経路を一切持たせない</strong>ことで、データベースへの直接的なインターネットアクセスを構造的に排除する（多層防御）。
                            </p>
                        </blockquote>
                        <h3 id="342">3.4.2 ロードバランシング戦略の選択</h3>
                        <div className="mermaid-wrapper">
                            <div className="mermaid-figure">
        <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS['mermaid-18'] || ''} ariaLabel="Mermaid Diagram" preserveNaturalScale />
        </div>
    </div>
                        </div>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ロードバランサー</th>
                                        <th>レイヤー</th>
                                        <th>主な特徴</th>
                                        <th>典型的ユースケース</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Application Load Balancer (ALB)</td>
                                        <td>L7</td>
                                        <td>
                                            パスベース/ホストベースルーティング、WebSocket、gRPC対応、コンテナ向けのターゲットグループ
                                        </td>
                                        <td>
                                            マイクロサービス、コンテナ化されたWebアプリケーション
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Network Load Balancer (NLB)</td>
                                        <td>L4</td>
                                        <td>
                                            超高スループット、静的/Elastic IP対応、TLSパススルー
                                        </td>
                                        <td>
                                            極端に高いパフォーマンスが必要なTCP/UDPワークロード、レガシーアプリ
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Gateway Load Balancer (GWLB)</td>
                                        <td>L3/L4</td>
                                        <td>
                                            GENEVEプロトコルでトラフィックを透過的に仮想アプライアンスへ転送
                                        </td>
                                        <td>
                                            ファイアウォール等のセキュリティアプライアンスの水平スケーリング
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="source-cite">
                            出典:
                            <a
                                href="https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/introduction.html"
                                >Elastic Load Balancingの機能比較</a
                            >
                            /
                            <a
                                href="https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html"
                                >Application Load Balancerとは</a
                            >
                            /
                            <a
                                href="https://docs.aws.amazon.com/elasticloadbalancing/latest/network/introduction.html"
                                >Network Load Balancerとは</a
                            >
                        </p>
                        <h3 id="alb">ALBによるパスベース/ホストベースルーティング</h3>
                        <div className="mermaid-wrapper">
                            <div className="mermaid-figure">
        <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS['mermaid-19'] || ''} ariaLabel="Mermaid Diagram" preserveNaturalScale />
        </div>
    </div>
                        </div>
                        <h3 id="343-cloudfront-global-accelerator">
                            3.4.3 エッジネットワーキング: CloudFront と Global Accelerator
                        </h3>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th>サービス</th>
                                        <th>動作原理</th>
                                        <th>適したシナリオ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Amazon CloudFront</td>
                                        <td>
                                            エッジロケーションで<strong>コンテンツをキャッシュ</strong>するCDN
                                        </td>
                                        <td>
                                            静的コンテンツ(画像・動画・JS/CSS)、動的コンテンツのTLS終端、DDoS吸収
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS Global Accelerator</td>
                                        <td>
                                            AWSのグローバルネットワークを経由し<strong>最適な経路にルーティング</strong>（キャッシュはしない）
                                        </td>
                                        <td>
                                            非HTTP(S)プロトコル（TCP/UDP）、複数リージョンでのフェイルオーバー、静的Anycast
                                            IPが必要な場合
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="source-cite">
                            出典:
                            <a
                                href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html"
                                >Amazon CloudFrontとは</a
                            >
                            /
                            <a
                                href="https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html"
                                >AWS Global Acceleratorとは</a
                            >
                        </p>
                        <div className="mermaid-wrapper">
                            <div className="mermaid-figure">
        <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS['mermaid-20'] || ''} ariaLabel="Mermaid Diagram" preserveNaturalScale />
        </div>
    </div>
                        </div>
                        <blockquote className="callout callout-practice">
                            <p>
                                <strong>ベストプラクティス:</strong>
                                「静的コンテンツの配信を高速化したい」「動画配信のキャッシュ効率を上げたい」→
                                <strong>CloudFront</strong
                                >。「TCP/UDPベースのゲームサーバー・IoTなどHTTP以外のプロトコルを高速化したい」「複数リージョン間で瞬時にフェイルオーバーしたい」→
                                <strong>Global Accelerator</strong>。両者は併用可能（例:
                                CloudFrontで静的コンテンツ、Global
                                AcceleratorでAPIのTCP接続を最適化）。
                            </p>
                        </blockquote>
                        <h3 id="344-vpndirect-connectprivatelink">
                            3.4.4 ハイブリッド接続: VPN・Direct Connect・PrivateLink
                        </h3>
                        <div className="mermaid-wrapper">
                            <div className="mermaid-figure">
        <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS['mermaid-21'] || ''} ariaLabel="Mermaid Diagram" preserveNaturalScale />
        </div>
    </div>
                        </div>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th>接続方式</th>
                                        <th>経路</th>
                                        <th>特徴</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>AWS Site-to-Site VPN</td>
                                        <td>パブリックインターネット(IPsecで暗号化)</td>
                                        <td>短期間で構築可能、帯域はインターネット状況に依存</td>
                                    </tr>
                                    <tr>
                                        <td>AWS Direct Connect</td>
                                        <td>専用の物理線</td>
                                        <td>
                                            一貫した低レイテンシ・高帯域、データ転送コスト削減、DXとVPNを組み合わせた暗号化専用線構成も可能
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS PrivateLink</td>
                                        <td>AWSのプライベートネットワーク内</td>
                                        <td>
                                            VPC間・オンプレミス間でIPアドレス重複やルーティング設定を意識せず、特定サービスにインターフェースエンドポイント経由で接続
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="source-cite">
                            出典:
                            <a href="https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html"
                                >AWS Site-to-Site VPNとは</a
                            >
                            /
                            <a
                                href="https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html"
                                >AWS Direct Connectとは</a
                            >
                            /
                            <a
                                href="https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html"
                                >AWS PrivateLinkとは</a
                            >
                        </p>
                        <blockquote className="callout callout-practice">
                            <p>
                                <strong>ベストプラクティス:</strong>
                                VPCピアリングやルートテーブルの複雑な管理を避けつつ、特定のサービス（自社のマイクロサービスや、SaaSベンダーが提供するサービス）にだけ安全にアクセスしたい場合は<strong>PrivateLink（インターフェースVPCエンドポイント）</strong>を使う。IPアドレス空間が重複していても問題なく接続できる点が、VPCピアリングに対する大きな利点。
                            </p>
                        </blockquote>
                        <hr />
                    </section>
                    <section className="content-section">
                        <h2 id="task-35">Task 3.5: 高性能なデータ取り込み・変換ソリューション</h2>
                        <h3 id="_8">出題される知識・スキル項目（公式）</h3>
                        <p>
                            <strong>知識:</strong> -
                            適切なユースケースを伴うデータ分析・可視化サービス（例: Amazon
                            Athena、AWS Lake Formation、Amazon QuickSuite） -
                            データ取り込みパターン（例: 頻度） -
                            適切なユースケースを伴うデータ転送サービス（例: AWS DataSync、AWS
                            Storage Gateway） - 適切なユースケースを伴うデータ変換サービス（例: AWS
                            Glue） - 取り込みアクセスポイントへのセキュアなアクセス -
                            ビジネス要件を満たすために必要なサイズと速度 -
                            適切なユースケースを伴うストリーミングデータサービス（例: Amazon
                            Kinesis）
                        </p>
                        <p>
                            <strong>スキル:</strong> - データレイクの構築とセキュリティ確保 -
                            データストリーミングアーキテクチャの設計 -
                            データ転送ソリューションの設計 - 可視化戦略の実装 -
                            データ処理に適したコンピューティングオプションの選択（例: Amazon EMR） -
                            取り込みに適した構成の選択 - フォーマット間のデータ変換（例:
                            .csvから.parquetへ）
                        </p>
                        <p className="source-cite">
                            出典:
                            <a
                                href="https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain3.html#solutions-architect-associate-03-domain3-task5"
                                >Task 3.5（AWS公式Exam Guide）</a
                            >
                        </p>
                        <blockquote className="callout callout-note">
                            <p>
                                <strong>補足（サービス名の変遷）:</strong> Amazon
                                QuickSightは2025年10月に
                                <strong>Amazon Quick Suite</strong>
                                へと進化し、AIエージェント機能（Quick Research、Quick
                                Flows等）が追加されました。既存のQuickSightのダッシュボード・データセット・権限設定はそのまま引き継がれます。出典:
                                <a
                                    href="https://aws.amazon.com/blogs/business-intelligence/reimagine-business-intelligence-amazon-quicksight-evolves-to-amazon-quick-suite/"
                                    >Amazon QuickSightからAmazon Quick
                                    Suiteへの進化（AWS公式ブログ）</a
                                >。同様に、Amazon Kinesis Data Firehoseは<strong
                                    >Amazon Data Firehose</strong
                                >という名称に変更されています。
                            </p>
                        </blockquote>
                        <h3 id="351">3.5.1 データレイクアーキテクチャの全体像</h3>
                        <div className="mermaid-wrapper">
                            <div className="mermaid-figure">
        <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS['mermaid-22'] || ''} ariaLabel="Mermaid Diagram" preserveNaturalScale />
        </div>
    </div>
                        </div>
                        <p className="source-cite">
                            出典:
                            <a
                                href="https://docs.aws.amazon.com/lake-formation/latest/dg/what-is-lake-formation.html"
                                >AWS Lake Formationとは</a
                            >
                            /
                            <a href="https://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html"
                                >AWS Glueとは</a
                            >
                            /
                            <a href="https://docs.aws.amazon.com/athena/latest/ug/what-is.html"
                                >Amazon Athenaとは</a
                            >
                        </p>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th>コンポーネント</th>
                                        <th>役割</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Amazon S3</td>
                                        <td>
                                            データレイクの実体（オブジェクトストレージ）。ほぼ無制限にスケール
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS Lake Formation</td>
                                        <td>
                                            データレイクの構築を自動化し、テーブル・列・行レベルのきめ細かなアクセス制御を一元管理
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS Glue データカタログ</td>
                                        <td>
                                            S3上のデータのメタデータ（スキーマ、パーティション等）を一元管理し、Athena/EMR/Redshiftから参照可能にする
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS Glue ETL</td>
                                        <td>
                                            サーバーレスのSparkベースETL。クローラでスキーマを自動検出し、ジョブでデータを変換
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon Athena</td>
                                        <td>
                                            S3上のデータに対してサーバーレスでSQLクエリを直接実行（事前のロード不要）
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <blockquote className="callout callout-practice">
                            <p>
                                <strong>ベストプラクティス:</strong>
                                複数の部門・チームがデータレイクにアクセスする場合、IAMポリシーだけで細かい権限（特定の列だけ、特定の行だけ）を管理するのは煩雑になりがちなので、<strong
                                    >Lake Formation</strong
                                >の一元的な権限管理を使う。「S3に溜まったデータをすぐにSQLで分析したいが、DWHを構築するほどではない」という要件には<strong>Athena</strong>が適している。
                            </p>
                        </blockquote>
                        <h3 id="352-amazon-kinesis">
                            3.5.2 ストリーミングデータの取り込み: Amazon Kinesis
                        </h3>
                        <div className="mermaid-wrapper">
                            <div className="mermaid-figure">
        <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS['mermaid-23'] || ''} ariaLabel="Mermaid Diagram" preserveNaturalScale />
        </div>
    </div>
                        </div>
                        <p className="source-cite">
                            出典:
                            <a
                                href="https://docs.aws.amazon.com/streams/latest/dev/introduction.html"
                                >Amazon Kinesis Data Streamsとは</a
                            >
                            /
                            <a
                                href="https://docs.aws.amazon.com/firehose/latest/dev/what-is-this-service.html"
                                >Amazon Data Firehoseとは</a
                            >
                        </p>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th>サービス</th>
                                        <th>役割</th>
                                        <th>ポイント</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Kinesis Data Streams</td>
                                        <td>
                                            リアルタイムのストリームデータをシャード単位で取り込み、複数のコンシューマーが同時に読み取り可能
                                        </td>
                                        <td>
                                            取り込み後のカスタム処理ロジックを自分で書きたい場合に選択
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon Data Firehose</td>
                                        <td>
                                            ストリームデータをS3/Redshift/OpenSearch等へ自動的に配信するフルマネージドサービス
                                        </td>
                                        <td>
                                            サーバーレスで運用不要、ETLの軽微な変換（Lambda連携）も可能
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Managed Service for Apache Flink</td>
                                        <td>
                                            ストリーム上でリアルタイムに集計・異常検知等の分析を実行
                                        </td>
                                        <td>ウィンドウ集計やパターンマッチングが必要な場合</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <blockquote className="callout callout-practice">
                            <p>
                                <strong>ベストプラクティス:</strong>
                                「取り込んだストリームデータを複数の異なるアプリケーションが同時に処理する必要がある」→
                                <strong>Kinesis Data Streams</strong
                                >（コンシューマーを複数アタッチ可能）。「単純にストリームデータをS3やRedshiftに流し込みたいだけで、運用の手間を減らしたい」→
                                <strong>Amazon Data Firehose</strong>。
                            </p>
                        </blockquote>
                        <h3 id="353-vs">3.5.3 バッチ vs ストリーミング: 取り込み頻度の設計</h3>
                        <div className="mermaid-wrapper">
                            <div className="mermaid-figure">
        <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS['mermaid-24'] || ''} ariaLabel="Mermaid Diagram" preserveNaturalScale />
        </div>
    </div>
                        </div>
                        <blockquote className="callout callout-practice">
                            <p>
                                <strong>ベストプラクティス:</strong>
                                不正取引検知やリアルタイムダッシュボードなど「今すぐの反応」が価値を持つユースケースはストリーミングを選ぶ。日次バッチのレポーティングなど、多少の遅延が許容できコスト効率を優先する場合はバッチ処理（Glue/EMRのスケジュール実行）を選ぶ。
                            </p>
                        </blockquote>
                        <h3 id="354-aws-glue-etl">
                            3.5.4 データ変換: AWS Glue ETLとフォーマット変換
                        </h3>
                        <div className="mermaid-wrapper">
                            <div className="mermaid-figure">
        <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS['mermaid-25'] || ''} ariaLabel="Mermaid Diagram" preserveNaturalScale />
        </div>
    </div>
                        </div>
                        <p className="source-cite">
                            出典:
                            <a href="https://docs.aws.amazon.com/glue/latest/dg/add-crawler.html"
                                >AWS Glueクローラとは</a
                            >
                            /
                            <a
                                href="https://docs.aws.amazon.com/glue/latest/dg/aws-glue-programming-etl.html"
                                >AWS GlueのETLプログラミング</a
                            >
                        </p>
                        <blockquote className="callout callout-practice">
                            <p>
                                <strong>ベストプラクティス:</strong>
                                Athenaでの分析コストとクエリ性能を最適化するために、CSV/JSONのような行指向フォーマットから
                                <strong>Parquet</strong>
                                のような列指向・圧縮フォーマットへ変換する（スキャンするデータ量が減り、クエリ料金・実行時間の両方を削減できる）。この変換は<strong
                                    >AWS Glue ETLジョブ</strong
                                >で自動化するのが一般的なパターン。
                            </p>
                        </blockquote>
                        <h3 id="355-datasync-storage-gateway">
                            3.5.5 データ転送: DataSync と Storage Gateway の使い分け
                        </h3>
                        <div className="mermaid-wrapper">
                            <div className="mermaid-figure">
        <div className="mermaid-wrap">
            <MermaidDiagram chart={DIAGRAMS['mermaid-26'] || ''} ariaLabel="Mermaid Diagram" preserveNaturalScale />
        </div>
    </div>
                        </div>
                        <p className="source-cite">
                            出典:
                            <a
                                href="https://docs.aws.amazon.com/datasync/latest/userguide/what-is-datasync.html"
                                >AWS DataSyncとは</a
                            >
                            /
                            <a
                                href="https://docs.aws.amazon.com/storagegateway/latest/userguide/WhatIsStorageGateway.html"
                                >AWS Storage Gatewayとは</a
                            >
                            /
                            <a
                                href="https://docs.aws.amazon.com/snowball/latest/developer-guide/whatisSnowball.html"
                                >AWS Snow Familyとは</a
                            >
                        </p>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th>サービス</th>
                                        <th>転送方式</th>
                                        <th>適したシナリオ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>AWS DataSync</td>
                                        <td>ネットワーク経由（専用エージェント使用）</td>
                                        <td>
                                            定期的な同期、移行のワンタイム転送、NFS/SMB/S3/EFS/FSx間のデータ移動
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS Storage Gateway</td>
                                        <td>ネットワーク経由（常時稼働のゲートウェイ）</td>
                                        <td>
                                            オンプレミスアプリからの継続的なファイル/ブロックアクセス（Task
                                            3.1参照）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS Snow Family</td>
                                        <td>物理デバイスの配送</td>
                                        <td>
                                            数十TB〜PB級のデータで、ネットワーク帯域では現実的な時間で転送できない場合
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p>
                            <strong>セキュアな取り込みアクセスポイントの設計:</strong> -
                            取り込み用のS3バケットへは
                            <strong>VPCエンドポイント（Gateway型/Interface型）</strong>
                            経由でアクセスし、インターネットを経由させない -
                            IAMポリシーとS3バケットポリシーで、取り込み専用のロール/ユーザーに最小権限（PutObjectのみ等）を付与
                            -
                            Kinesisへのデータ投入元は、<strong>IAM認証</strong>や<strong>VPCエンドポイント</strong>を使って未認可のクライアントからの投入を防ぐ
                        </p>
                        <p className="source-cite">
                            出典:
                            <a
                                href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/privatelink-interface-endpoints.html"
                                >Amazon S3向けVPCエンドポイント</a
                            >
                        </p>
                        <hr />
                    </section>
                    <section className="content-section">
                        <h2 id="_9">参考文献</h2>
                        <h3 id="_10">試験ガイド（公式）</h3>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ソース</th>
                                        <th>URL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            AWS Certified Solutions Architect - Associate (SAA-C03)
                                            Exam Guide
                                        </td>
                                        <td>
                                            https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Content Domain 3: Design High-Performing Architectures
                                        </td>
                                        <td>
                                            https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain3.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>In-Scope AWS Services</td>
                                        <td>
                                            https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/saa-03-in-scope-services.html
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <h3 id="task-31_1">Task 3.1: ストレージ関連</h3>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ソース</th>
                                        <th>URL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Amazon S3 ユーザーガイド</td>
                                        <td>
                                            https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon S3 ストレージクラス（公式）</td>
                                        <td>https://aws.amazon.com/s3/storage-classes/</td>
                                    </tr>
                                    <tr>
                                        <td>S3 Intelligent-Tiering</td>
                                        <td>
                                            https://aws.amazon.com/s3/storage-classes/intelligent-tiering/
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>S3 Glacier ストレージクラス</td>
                                        <td>https://aws.amazon.com/s3/storage-classes/glacier/</td>
                                    </tr>
                                    <tr>
                                        <td>Amazon EBS の概要</td>
                                        <td>
                                            https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AmazonEBS.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon EBS ボリュームタイプ</td>
                                        <td>
                                            https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volume-types.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon EFS とは</td>
                                        <td>
                                            https://docs.aws.amazon.com/efs/latest/ug/whatisefs.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon EFS のパフォーマンス</td>
                                        <td>
                                            https://docs.aws.amazon.com/efs/latest/ug/performance.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon EFS ストレージクラス</td>
                                        <td>
                                            https://docs.aws.amazon.com/efs/latest/ug/storage-classes.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS Storage Gateway とは</td>
                                        <td>
                                            https://docs.aws.amazon.com/storagegateway/latest/userguide/WhatIsStorageGateway.html
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <h3 id="task-32_1">Task 3.2: コンピューティング関連</h3>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ソース</th>
                                        <th>URL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Amazon EC2 の概念</td>
                                        <td>
                                            https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS Lambda 開発者ガイド</td>
                                        <td>
                                            https://docs.aws.amazon.com/lambda/latest/dg/welcome.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Lambda 関数のメモリ設定</td>
                                        <td>
                                            https://docs.aws.amazon.com/lambda/latest/dg/configuration-memory.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Lambda の設定に関するトラブルシューティング</td>
                                        <td>
                                            https://docs.aws.amazon.com/lambda/latest/dg/troubleshooting-configuration.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS Fargate とは</td>
                                        <td>
                                            https://docs.aws.amazon.com/AmazonECS/latest/userguide/what-is-fargate.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon ECS とは</td>
                                        <td>
                                            https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon EKS とは</td>
                                        <td>
                                            https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS Batch とは</td>
                                        <td>
                                            https://docs.aws.amazon.com/batch/latest/userguide/what-is-batch.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon EMR とは</td>
                                        <td>
                                            https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-what-is-emr.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>EC2 Auto Scaling のスケーリングポリシー</td>
                                        <td>
                                            https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-simple-step.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS Auto Scaling とは</td>
                                        <td>
                                            https://docs.aws.amazon.com/autoscaling/plans/userguide/what-is-aws-auto-scaling.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon SQS とは</td>
                                        <td>
                                            https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon SNS とは</td>
                                        <td>
                                            https://docs.aws.amazon.com/sns/latest/dg/welcome.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon EventBridge とは</td>
                                        <td>
                                            https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <h3 id="task-33_1">Task 3.3: データベース関連</h3>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ソース</th>
                                        <th>URL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Amazon RDS とは</td>
                                        <td>
                                            https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon RDS マルチAZ配置</td>
                                        <td>
                                            https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon RDS 読み取りレプリカ</td>
                                        <td>
                                            https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon Aurora の概要</td>
                                        <td>
                                            https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_AuroraOverview.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon Aurora のストレージと信頼性</td>
                                        <td>
                                            https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Overview.StorageReliability.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Aurora Serverless v2</td>
                                        <td>
                                            https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Aurora Global Database</td>
                                        <td>
                                            https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon DynamoDB 開発者ガイド</td>
                                        <td>
                                            https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>DynamoDB 読み取り/書き込みキャパシティモード</td>
                                        <td>
                                            https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.ReadWriteCapacityMode.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>DynamoDB Accelerator (DAX)</td>
                                        <td>
                                            https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS Database Migration Service とは</td>
                                        <td>
                                            https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS Schema Conversion Tool とは</td>
                                        <td>
                                            https://docs.aws.amazon.com/SchemaConversionTool/latest/userguide/CHAP_Welcome.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon ElastiCache for Valkey の発表</td>
                                        <td>
                                            https://aws.amazon.com/about-aws/whats-new/2024/10/amazon-elasticache-valkey
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>ElastiCache のエンジン選択</td>
                                        <td>
                                            https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/SelectEngine.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>ElastiCache キャッシング戦略</td>
                                        <td>
                                            https://docs.aws.amazon.com/AmazonElastiCache/latest/dg/Strategies.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon RDS Proxy とは</td>
                                        <td>
                                            https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <h3 id="task-34_1">Task 3.4: ネットワーク関連</h3>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ソース</th>
                                        <th>URL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>VPC とサブネットの設定</td>
                                        <td>
                                            https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>VPC プライベートサブネット+NATのシナリオ</td>
                                        <td>
                                            https://docs.aws.amazon.com/vpc/latest/userguide/vpc-example-private-subnets-nat.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Elastic Load Balancing の概要</td>
                                        <td>
                                            https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/introduction.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Application Load Balancer とは</td>
                                        <td>
                                            https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Network Load Balancer とは</td>
                                        <td>
                                            https://docs.aws.amazon.com/elasticloadbalancing/latest/network/introduction.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon CloudFront とは</td>
                                        <td>
                                            https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS Global Accelerator とは</td>
                                        <td>
                                            https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS Site-to-Site VPN とは</td>
                                        <td>
                                            https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS Direct Connect とは</td>
                                        <td>
                                            https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS PrivateLink とは</td>
                                        <td>
                                            https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <h3 id="task-35_1">Task 3.5: データ分析・取り込み関連</h3>
                        <div className="table-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ソース</th>
                                        <th>URL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>AWS Lake Formation とは</td>
                                        <td>
                                            https://docs.aws.amazon.com/lake-formation/latest/dg/what-is-lake-formation.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS Glue とは</td>
                                        <td>
                                            https://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS Glue クローラ</td>
                                        <td>
                                            https://docs.aws.amazon.com/glue/latest/dg/add-crawler.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS Glue の ETL プログラミング</td>
                                        <td>
                                            https://docs.aws.amazon.com/glue/latest/dg/aws-glue-programming-etl.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon Athena とは</td>
                                        <td>
                                            https://docs.aws.amazon.com/athena/latest/ug/what-is.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Amazon QuickSightからAmazon Quick
                                            Suiteへの進化（AWS公式ブログ）
                                        </td>
                                        <td>
                                            https://aws.amazon.com/blogs/business-intelligence/reimagine-business-intelligence-amazon-quicksight-evolves-to-amazon-quick-suite/
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon Kinesis Data Streams とは</td>
                                        <td>
                                            https://docs.aws.amazon.com/streams/latest/dev/introduction.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon Data Firehose とは</td>
                                        <td>
                                            https://docs.aws.amazon.com/firehose/latest/dev/what-is-this-service.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS DataSync とは</td>
                                        <td>
                                            https://docs.aws.amazon.com/datasync/latest/userguide/what-is-datasync.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS Snow Family とは</td>
                                        <td>
                                            https://docs.aws.amazon.com/snowball/latest/developer-guide/whatisSnowball.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon S3 向け VPC エンドポイント（PrivateLink）</td>
                                        <td>
                                            https://docs.aws.amazon.com/AmazonS3/latest/userguide/privatelink-interface-endpoints.html
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <hr />
                        <p>
                            <em
                                >本ガイドは2026年7月時点のAWS公式ドキュメントおよびAWS公式ブログの情報に基づいて作成しています。AWSのサービス仕様・料金・名称は変更される可能性があるため、実際の試験対策・設計判断の際は必ず最新の公式ドキュメントを参照してください。</em
                            >
                        </p>
                    </section>
                
                </main>
            </div>
        </div>
    );
}
