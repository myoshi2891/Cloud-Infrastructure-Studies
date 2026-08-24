'use client';

import { useState, memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { NavBar } from './NavBar';
import { DIAGRAMS, REFERENCES, CHECKLIST_ITEMS, type DiagramId } from './constants';

const Diagram = memo(function Diagram({ id, label }: { id: DiagramId; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap">
            <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale={true} />
        </div>
    );
});

/**
 * PCA Section 5: 実装の管理 ガイド本文コンポーネント
 */
export function PcaSection5Guide() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    const handleCheckboxChange = (id: string) => {
        setCheckedItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const completedCount = Object.values(checkedItems).filter(Boolean).length;

    return (
        <div className="pca-s5-page">
            <div className="layout">
                <button
                    type="button"
                    className="sidebar-toggle"
                    id="sidebarToggle"
                    aria-label="メニュー"
                    aria-expanded={sidebarOpen}
                    aria-controls="sidebar"
                    onClick={toggleSidebar}
                >
                    ☰
                </button>

                <NavBar isOpen={sidebarOpen} onToggle={toggleSidebar} />

                <main className="main">
                    <div className="hero">
                        <div className="kicker">Professional Cloud Architect &middot; Section 5</div>
                        <h1>Google Cloud Professional Cloud Architect試験 Section 5: 実装の管理（Managing Implementation）学習ガイド</h1>
                        <div className="meta-row">
                            <span className="pill">配点 <strong>約12.5%</strong></span>
                            <span className="pill">対象 <strong>初学者〜中級者</strong></span>
                            <span className="pill">図解 <strong>Mermaid 13点</strong></span>
                            <span className="pill">参考文献 <strong>18件</strong></span>
                        </div>
                    </div>

                    <p>
                        本ガイドはGoogle Cloud Professional Cloud Architect（PCA）認定試験の<strong>Section 5: Managing implementation</strong>（実装の管理、配点約12.5%）を対象とした、初学者向けの技術文書です。公式認定ページ<a
                            className="footnote-ref"
                            href="#ref1"
                            id="fnref1"
                            role="doc-noteref"
                        ><sup>1</sup></a>と公式Exam Guide PDF<a
                            className="footnote-ref"
                            href="#ref2"
                            id="fnref2"
                            role="doc-noteref"
                        ><sup>2</sup></a>の出題範囲に沿って、各タスクの詳細な解説とベストプラクティス、根拠となる公式ソースを提示します。
                    </p>

                    <h2 id="このガイドについて" tabIndex={-1}>このガイドについて</h2>
                    <p>
                        Section 5は、設計されたクラウドソリューションを実際に<strong>開発・運用チームが実装していく段階</strong>を対象とする領域です。PCA試験全体の中では配点比率こそ12.5%とSection 1（約25%）ほど大きくありませんが、「設計を現実のデプロイに落とし込む」実務スキルを問う実践的なセクションであり、以下の2つのタスクで構成されています。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">タスク</th>
                                    <th scope="col">名称</th>
                                    <th scope="col">主な内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>5.1</td>
                                    <td>
                                        開発・運用チームへのアドバイスとソリューションの成功裏のデプロイ支援
                                    </td>
                                    <td>
                                        アプリケーション/インフラのデプロイ、API管理（Apigee）、テストフレームワーク、データ・システム移行ツール、Gemini Cloud Assist
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>5.2</td>
                                    <td>Google Cloudとのプログラムによる対話</td>
                                    <td>
                                        Cloud Shell Editor/Code/Terminal、Google Cloud SDK（gcloud/gsutil/bq）、Cloudエミュレータ、Infrastructure as Code（Terraform）、Google APIアクセスのベストプラクティス、APIクライアントライブラリ
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        この2つのタスクに共通するテーマは、「アーキテクトが設計したものを、開発・運用チームがどのようなツールとプロセスで安全かつ再現可能に実装するか」です。PCAは自らコードを書く役割ではありませんが、開発チームに適切なツール・パターンを助言できるだけの実務知識が求められます。
                    </p>

                    <h2 id="well-architected-frameworkとの関連" tabIndex={-1}>Well-Architected Frameworkとの関連</h2>
                    <p>
                        Google Cloud Well-Architected Framework（WAF）の6本柱のうち、Section 5は特に<strong>運用の卓越性</strong>（Operational Excellence）と密接に関連します。また、IaCによる一貫したプロビジョニングは信頼性・セキュリティの両面にも寄与します。
                    </p>

                    <Diagram id="diag-1" label="Section 5とWell-Architected Frameworkの関連図" />

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">WAFの柱</th>
                                    <th scope="col">Section 5との関連度</th>
                                    <th scope="col">関連する主な要素</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>運用の卓越性</td>
                                    <td>非常に高い</td>
                                    <td>CI/CDパイプライン、IaC、監視可能なデプロイプロセス</td>
                                </tr>
                                <tr className="even">
                                    <td>セキュリティ</td>
                                    <td>高い</td>
                                    <td>サービスアカウント認証、APIキー管理、Secret Manager連携</td>
                                </tr>
                                <tr className="odd">
                                    <td>信頼性</td>
                                    <td>中程度</td>
                                    <td>テストフレームワーク、段階的デプロイ、ロールバック</td>
                                </tr>
                                <tr className="even">
                                    <td>パフォーマンス最適化</td>
                                    <td>中程度</td>
                                    <td>負荷テスト、APIゲートウェイのキャッシュ・スロットリング</td>
                                </tr>
                                <tr className="odd">
                                    <td>コスト最適化</td>
                                    <td>低〜中程度</td>
                                    <td>エミュレータによる開発コスト削減、Terraformでの環境使い捨て</td>
                                </tr>
                                <tr className="even">
                                    <td>サステナビリティ</td>
                                    <td>低い</td>
                                    <td>直接的な関連は薄い</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <hr />

                    <h2 id="51-開発運用チームへのアドバイスとソリューションの成功裏のデプロイ支援" tabIndex={-1}>
                        5.1 開発・運用チームへのアドバイスとソリューションの成功裏のデプロイ支援
                    </h2>
                    <p>
                        タスク5.1は、アーキテクトが設計したソリューションを実際に本番環境へ届けるまでの「実装フェーズ」を扱います。PCAはコードを書く担当者ではありませんが、開発・運用チームに対して適切なツール選定とベストプラクティスを助言できる必要があります。
                    </p>

                    <h3 id="511-アプリケーションとインフラストラクチャのデプロイ" tabIndex={-1}>
                        5.1.1 アプリケーションとインフラストラクチャのデプロイ
                    </h3>
                    <p>
                        Google Cloudにおけるデプロイは、大きく「<strong>アプリケーションのデプロイ</strong>」と「<strong>インフラストラクチャのデプロイ</strong>」に分けて考えると理解しやすくなります。前者はコンテナイメージやソースコードを実行環境に配置すること、後者はVPC・GKEクラスタ・Cloud SQLインスタンスなどの土台となるリソースを構築することを指します。
                    </p>

                    <Diagram id="diag-2" label="アプリケーションとインフラストラクチャのデプロイパイプライン" />

                    <p>代表的なデプロイ関連サービスの役割分担は次のとおりです。</p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">サービス</th>
                                    <th scope="col">主な役割</th>
                                    <th scope="col">対象レイヤー</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Cloud Build</td>
                                    <td>ソースからコンテナイメージやビルド成果物を生成するCI基盤</td>
                                    <td>アプリケーション（ビルド）</td>
                                </tr>
                                <tr className="even">
                                    <td>Artifact Registry</td>
                                    <td>コンテナイメージ・言語パッケージの一元管理</td>
                                    <td>アプリケーション（成果物保管）</td>
                                </tr>
                                <tr className="odd">
                                    <td>Cloud Deploy</td>
                                    <td>GKE/Cloud Run向けのマネージドCDパイプライン</td>
                                    <td>アプリケーション（デリバリー）</td>
                                </tr>
                                <tr className="even">
                                    <td>Infrastructure Manager</td>
                                    <td>Terraform構成をGoogle Cloudがマネージドで実行するサービス</td>
                                    <td>インフラストラクチャ</td>
                                </tr>
                                <tr className="odd">
                                    <td>Config Connector</td>
                                    <td>KubernetesのCRDとしてGoogle Cloudリソースを宣言的に管理</td>
                                    <td>インフラストラクチャ（GKE運用者向け）</td>
                                </tr>
                                <tr className="even">
                                    <td>Deployment Manager</td>
                                    <td>
                                        レガシーなGoogle Cloudネイティブのテンプレートベースプロビジョニング（新規は非推奨、Infrastructure Manager/Terraformが推奨）
                                    </td>
                                    <td>インフラストラクチャ（旧世代）</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="callout-practice">
                        <div className="icon">✓</div>{" "}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{" "}
                            <ul>
                                <li>
                                    アプリケーションのデプロイとインフラのデプロイは、それぞれ独立したパイプラインとリポジトリで管理し、変更の影響範囲を明確に分離する。
                                </li>{" "}
                                <li>
                                    Cloud Deployでは<strong>デプロイポリシー</strong>を用いて、特定の時間帯やチャンネルへのデプロイを制限し、変更管理プロセスと整合させる<a
                                        className="footnote-ref"
                                        href="#ref3"
                                        id="fnref3"
                                        role="doc-noteref"
                                    ><sup>3</sup></a>。
                                </li>{" "}
                                <li>
                                    本番環境へのロールアウトは、Cloud Deployの組み込みデプロイ戦略である<strong>Standard</strong>と<strong>Canary</strong>で自動化し、手動オペレーションのミスを排除する<a
                                        className="footnote-ref"
                                        href="#ref4"
                                        id="fnref4"
                                        role="doc-noteref"
                                    ><sup>4</sup></a>。Blue-Greenは組み込み戦略ではないため、Cloud Runのトラフィック分割などの仕組みを使って別途構成する。
                                </li>{" "}
                                <li>
                                    Infrastructure Managerを使う場合でも、Terraform構成そのものはソースリポジトリでバージョン管理し、レビューを経てから適用する運用を徹底する<a
                                        className="footnote-ref"
                                        href="#ref5"
                                        id="fnref5"
                                        role="doc-noteref"
                                    ><sup>5</sup></a>。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <h3 id="512-api管理のベストプラクティスapigee" tabIndex={-1}>
                        5.1.2 API管理のベストプラクティス（Apigee）
                    </h3>
                    <p>
                        企業がAPIを外部パートナーや複数の内部チームに公開する場合、単にCloud RunやGKEでバックエンドを稼働させるだけでは「認証」「レート制限」「バージョニング」「アナリティクス」といった横断的関心事に対応できません。<strong>Apigee</strong>はこれらを一元的に扱うフルライフサイクルAPI管理プラットフォームです<a
                            className="footnote-ref"
                            href="#ref6"
                            id="fnref6"
                            role="doc-noteref"
                        ><sup>6</sup></a>。
                    </p>

                    <Diagram id="diag-3" label="Apigee APIマネジメント層の構成図" />

                    <p>Apigeeが提供する主な機能は次のとおりです。</p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">機能カテゴリ</th>
                                    <th scope="col">内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>APIプロキシ</td>
                                    <td>
                                        バックエンドサービスの前面に立ち、URL・プロトコルを抽象化する
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>ポリシー</td>
                                    <td>
                                        OAuth 2.0/APIキー検証、クォータ、スパイクアレスト（急激なトラフィック抑制）、メッセージ変換などをコード不要で設定
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>デベロッパーポータル</td>
                                    <td>
                                        外部開発者がAPIドキュメントを閲覧し、APIキーを自己発行できるセルフサービスポータル
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>モニタイゼーション</td>
                                    <td>API利用量に応じた課金プランの設計</td>
                                </tr>
                                <tr className="odd">
                                    <td>アナリティクス</td>
                                    <td>APIトラフィック、レイテンシ、エラー率の可視化</td>
                                </tr>
                                <tr className="even">
                                    <td>Apigee hybrid</td>
                                    <td>
                                        管理プレーンはGoogle Cloud、ランタイムはオンプレミス/他クラウドに配置するハイブリッド構成
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="callout-practice">
                        <div className="icon">✓</div>{" "}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{" "}
                            <ul>
                                <li>
                                    新規APIには必ず<strong>バージョニング戦略</strong>（URLパスバージョニングが一般的）を定め、破壊的変更が既存クライアントに影響しないようにする<a
                                        className="footnote-ref"
                                        href="#ref6"
                                        id="fnref7"
                                        role="doc-noteref"
                                    ><sup>6</sup></a>。
                                </li>{" "}
                                <li>
                                    レート制限（クォータ）とスパイクアレストポリシーを組み合わせ、バックエンドサービスを過負荷から保護する<a
                                        className="footnote-ref"
                                        href="#ref7"
                                        id="fnref8"
                                        role="doc-noteref"
                                    ><sup>7</sup></a>。
                                </li>{" "}
                                <li>
                                    APIキーやOAuthトークンの検証は必ずApigeeのポリシー層で行い、バックエンドサービスに認証ロジックを重複実装させない。
                                </li>{" "}
                                <li>
                                    大規模組織では、複数チームがAPIプロキシを独立して開発・デプロイできるよう、Apigeeの<strong>環境</strong>（Environment）と<strong>環境グループ</strong>（Environment Group）を用いてテナント分離を設計する<a
                                        className="footnote-ref"
                                        href="#ref6"
                                        id="fnref9"
                                        role="doc-noteref"
                                    ><sup>6</sup></a>。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <h3 id="513-テストフレームワーク負荷単体統合テスト" tabIndex={-1}>
                        5.1.3 テストフレームワーク（負荷/単体/統合テスト）
                    </h3>
                    <p>
                        ソリューションを安全にデプロイするためには、実装の各レイヤーで適切なテストを組み込む必要があります。PCA試験では「テストの種類とその使い分け」を理解しているかが問われます。
                    </p>

                    <Diagram id="diag-4" label="テストピラミッドとテストフレームワーク" />

                    <p>
                        上図はいわゆる「テストピラミッド」の考え方をGoogle Cloud文脈に当てはめたものです。下層ほど数を多く、高頻度に実行し、上層に行くほど数を絞り込んで実行するのが一般的な指針です。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">テスト種別</th>
                                    <th scope="col">目的</th>
                                    <th scope="col">Google Cloudでの代表的な実施方法</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>単体テスト</td>
                                    <td>個々の関数・メソッドのロジック検証</td>
                                    <td>
                                        Cloud Build上でのCI実行（言語標準のテストフレームワークを利用）
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>統合テスト</td>
                                    <td>サービス間のAPI呼び出し・データフローの検証</td>
                                    <td>
                                        Cloud Buildのステップ内でエミュレータやステージング環境を利用
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>負荷テスト</td>
                                    <td>想定ピーク時のスループット・レイテンシ・エラー率の検証</td>
                                    <td>
                                        Cloud Load Testing（旧称含む）や、OSSツール（Locust、k6、JMeter）をGKE/Compute Engine上で実行
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>カナリア分析</td>
                                    <td>新バージョンのメトリクスを旧バージョンと自動比較</td>
                                    <td>
                                        Cloud Deployのカナリアデプロイ＋Cloud Monitoringによる自動判定
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="callout-practice">
                        <div className="icon">✓</div>{" "}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{" "}
                            <ul>
                                <li>
                                    CI/CDパイプラインの各ステージ（ビルド後、ステージング環境デプロイ後、本番デプロイ前）に応じて実行するテストレベルを変え、フィードバックループを最短化する。
                                </li>{" "}
                                <li>
                                    負荷テストは本番と同等のインフラ構成（マシンタイプ、ネットワークトポロジ）を使った専用のステージング環境で実施し、結果の信頼性を担保する。
                                </li>{" "}
                                <li>
                                    統合テストでは可能な限り実際のマネージドサービスではなく、後述する<strong>Cloudエミュレータ</strong>を利用してテストコストと実行時間を削減する。
                                </li>{" "}
                                <li>
                                    テスト結果はCloud Buildのビルドログおよび品質ゲートと連携させ、閾値未達の場合は自動的にデプロイをブロックする。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <h3 id="514-データとシステムの移行管理ツール" tabIndex={-1}>
                        5.1.4 データとシステムの移行・管理ツール
                    </h3>
                    <p>
                        Section 1のタスク1.4（移行計画の作成）が「計画」にフォーカスするのに対し、Section 5のこの項目は「<strong>実際に移行を実行するためのツール</strong>」にフォーカスします。
                    </p>

                    <Diagram id="diag-5" label="データとシステムの移行ツールの使い分けフロー" />

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">ツール</th>
                                    <th scope="col">用途</th>
                                    <th scope="col">特徴</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Storage Transfer Service</td>
                                    <td>オンライン上のオブジェクトストレージ間のデータ転送</td>
                                    <td>
                                        S3・Azure Blob・オンプレHTTP/HDFSソースに対応、スケジュール転送が可能
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>Transfer Appliance</td>
                                    <td>ネットワーク帯域が限られる環境での大容量データ移行</td>
                                    <td>
                                        物理デバイスにデータを書き込みGoogleへ配送するオフライン転送
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>Database Migration Service (DMS)</td>
                                    <td>MySQL/PostgreSQL/SQL ServerからCloud SQL・AlloyDBへの移行</td>
                                    <td>継続的レプリケーションによる最小ダウンタイム移行に対応</td>
                                </tr>
                                <tr className="even">
                                    <td>Datastream</td>
                                    <td>
                                        データベースの変更データキャプチャ（CDC）をBigQuery等へストリーミング
                                    </td>
                                    <td>分析基盤へのリアルタイムデータ連携に利用</td>
                                </tr>
                                <tr className="odd">
                                    <td>Migrate to Virtual Machines</td>
                                    <td>
                                        オンプレミス/他クラウドVMのCompute Engineへのリフト＆シフト移行
                                    </td>
                                    <td>ライブ移行に対応し、ダウンタイムを最小化</td>
                                </tr>
                                <tr className="even">
                                    <td>Migration Center</td>
                                    <td>移行対象資産の可視化・アセスメント・コスト見積もり</td>
                                    <td>
                                        移行計画立案の起点となる統合ハブ<a
                                            className="footnote-ref"
                                            href="#ref8"
                                            id="fnref10"
                                            role="doc-noteref"
                                        ><sup>8</sup></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="callout-practice">
                        <div className="icon">✓</div>{" "}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{" "}
                            <ul>
                                <li>
                                    移行ツールの選定前に必ずMigration Centerでアセスメントを実施し、依存関係とサイジングを把握してから個別ツールに落とし込む<a
                                        className="footnote-ref"
                                        href="#ref8"
                                        id="fnref11"
                                        role="doc-noteref"
                                    ><sup>8</sup></a>。
                                </li>{" "}
                                <li>
                                    データベース移行では、業務影響を最小化するためDMSの継続的レプリケーション機能を用い、カットオーバーのタイミングを business側と合意の上で決定する。
                                </li>{" "}
                                <li>
                                    大量データ（目安として帯域で数週間以上かかる規模）はTransfer Applianceのようなオフライン手段を検討し、オンライン転送とのコスト・時間トレードオフを比較する。
                                </li>{" "}
                                <li>
                                    移行後もDatastreamのようなCDCパイプラインを残し、分析基盤への継続的なデータ同期を維持する設計を検討する。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <h3 id="515-gemini-cloud-assist" tabIndex={-1}>5.1.5 Gemini Cloud Assist</h3>
                    <p>
                        <strong>Gemini Cloud Assist</strong>は、Google CloudコンソールやAPI経由で利用できる生成AIベースの支援機能で、設計・トラブルシューティング・コスト分析など、クラウド運用の様々な場面でアーキテクトと運用チームを支援します<a
                            className="footnote-ref"
                            href="#ref9"
                            id="fnref12"
                            role="doc-noteref"
                        ><sup>9</sup></a>。
                    </p>

                    <Diagram id="diag-6" label="Gemini Cloud Assistによる支援フロー" />

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">活用シーン</th>
                                    <th scope="col">できること</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>アーキテクチャ設計支援</td>
                                    <td>要件を伝えると構成案やアーキテクチャ図のドラフトを生成</td>
                                </tr>
                                <tr className="even">
                                    <td>トラブルシューティング</td>
                                    <td>エラーログやアラートの原因分析、修正案の提示</td>
                                </tr>
                                <tr className="odd">
                                    <td>コスト最適化</td>
                                    <td>使用状況に基づくリソースサイジングの見直し提案</td>
                                </tr>
                                <tr className="even">
                                    <td>コード/IaC生成補助</td>
                                    <td>Terraform構成やgcloudコマンドのドラフト生成</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="callout-practice">
                        <div className="icon">✓</div>{" "}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{" "}
                            <ul>
                                <li>
                                    Gemini Cloud Assistの提案は<strong>必ず人間がレビューしてから本番環境に適用</strong>する。特にIAMやネットワーク設定の変更提案は影響範囲が大きいため慎重に検証する。
                                </li>{" "}
                                <li>
                                    組織のセキュリティ・コンプライアンス要件を事前にコンテキストとして共有し、提案の精度を高める。
                                </li>{" "}
                                <li>
                                    Gemini Cloud Assistを日常的なトラブルシューティングの一次窓口として位置づけ、エスカレーション前の初期切り分けに活用し、運用チームの負荷を軽減する。
                                </li>
                            </ul>
                        </div>
                    </div>
                    <hr />

                    <h2 id="52-google-cloudとのプログラムによる対話" tabIndex={-1}>
                        5.2 Google Cloudとのプログラムによる対話
                    </h2>
                    <p>
                        タスク5.2は、開発者やアーキテクトが<strong>ブラウザのコンソール画面を使わずに</strong>Google Cloudを操作・開発するための各種インターフェースを扱います。CLI、SDK、エミュレータ、IaC、APIクライアントライブラリまで、プログラマティックなアクセス手段を体系的に理解することが求められます。
                    </p>

                    <h3 id="521-cloud-shell-editorcloud-codecloud-shell-terminal" tabIndex={-1}>
                        5.2.1 Cloud Shell Editor、Cloud Code、Cloud Shell Terminal
                    </h3>
                    <p>
                        Google Cloudには、ブラウザだけで完結する開発環境として<strong>Cloud Shell</strong>が提供されています。Cloud ShellにはターミナルとVS Codeベースのエディタ（Cloud Shell Editor）が統合されており、追加のローカル環境構築なしにGoogle Cloudの操作・開発ができます<a
                            className="footnote-ref"
                            href="#ref10"
                            id="fnref13"
                            role="doc-noteref"
                        ><sup>10</sup></a>。
                    </p>

                    <Diagram id="diag-7" label="Cloud Shell EditorとCloud Codeの構造図" />

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">ツール</th>
                                    <th scope="col">特徴</th>
                                    <th scope="col">主なユースケース</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Cloud Shell Terminal</td>
                                    <td>
                                        ブラウザ上のマネージドLinux環境、gcloud/kubectl/Terraform等がプリインストール
                                    </td>
                                    <td>一時的な検証、緊急時のCLI操作、学習用途</td>
                                </tr>
                                <tr className="even">
                                    <td>Cloud Shell Editor</td>
                                    <td>Cloud Shell上で動くコードエディタ、Cloud Codeが標準搭載</td>
                                    <td>軽量なマニフェスト編集、簡易デバッグ</td>
                                </tr>
                                <tr className="odd">
                                    <td>Cloud Code</td>
                                    <td>
                                        VS Code/IntelliJ向け拡張機能。ローカルIDEからKubernetes/Cloud Runの開発・デプロイ・デバッグが可能<a
                                            className="footnote-ref"
                                            href="#ref11"
                                            id="fnref14"
                                            role="doc-noteref"
                                        ><sup>11</sup></a>
                                    </td>
                                    <td>
                                        本格的なアプリケーション開発、ローカルでのKubernetesデバッグ
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="callout-practice">
                        <div className="icon">✓</div>{" "}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{" "}
                            <ul>
                                <li>
                                    Cloud Shellのホームディレクトリは永続化されるが<strong>5GBの容量制限</strong>があるため、大きな成果物はCloud Storageなど別の永続ストレージに保存する。
                                </li>{" "}
                                <li>
                                    本格的な開発はCloud Code拡張機能を使い、使い慣れたローカルIDE（VS Code/IntelliJ）でKubernetesリソースの作成・デプロイ・ライブデバッグを行う。
                                </li>{" "}
                                <li>
                                    Cloud Shellはアイドル状態が続くとVMが回収される点を理解し、恒久的な作業環境としてではなく一時的な操作環境として位置づける。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <h3 id="522-google-cloud-sdkgcloudgsutilbq" tabIndex={-1}>
                        5.2.2 Google Cloud SDK（gcloud、gsutil、bq）
                    </h3>
                    <p>
                        Google Cloud SDK（現在はGoogle Cloud CLIとも呼ばれる）は、コマンドラインからGoogle Cloudリソースを操作するための中核ツール群です。
                    </p>

                    <Diagram id="diag-8" label="Google Cloud CLIの構成図" />

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">コマンド</th>
                                    <th scope="col">主な対象</th>
                                    <th scope="col">代表的なサブコマンド例</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>gcloud</td>
                                    <td>
                                        Compute Engine、GKE、IAM、ネットワーキング等、ほぼ全サービス
                                    </td>
                                    <td>
                                        <code>gcloud compute instances create</code>、<code>gcloud container clusters get-credentials</code>
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>gsutil</td>
                                    <td>Cloud Storageのバケット・オブジェクト操作</td>
                                    <td>
                                        <code>gsutil cp</code>、<code>gsutil rsync</code>、<code>gsutil iam</code>
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>bq</td>
                                    <td>BigQueryのデータセット・テーブル・クエリジョブ操作</td>
                                    <td>
                                        <code>bq query</code>、<code>bq load</code>、<code>bq mk</code>
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>gcloud storage</td>
                                    <td>gsutilの後継として開発が進むCloud Storage操作コマンド</td>
                                    <td>
                                        <code>gcloud storage cp</code>、<code>gcloud storage buckets create</code>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="callout-practice">
                        <div className="icon">✓</div>{" "}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{" "}
                            <ul>
                                <li>
                                    新規のCloud Storage操作スクリプトでは、Googleが今後の主軸として開発を進める<code>gcloud storage</code>コマンドの利用を優先的に検討する<a
                                        className="footnote-ref"
                                        href="#ref12"
                                        id="fnref15"
                                        role="doc-noteref"
                                    ><sup>12</sup></a>。
                                </li>{" "}
                                <li>
                                    CI/CDパイプラインでは、サービスアカウントキーの直接配布を避け、Workload Identity連携やApplication Default Credentials（ADC）を使ってgcloudを認証する。
                                </li>{" "}
                                <li>
                                    <code>gcloud config configurations</code>を使い、プロジェクトごとに設定プロファイルを分離することで、誤った環境への操作を防止する。
                                </li>{" "}
                                <li>
                                    スクリプトから呼び出す際は<code>--format=json</code>や<code>--format=value(...)</code>を使い、出力を構造化してパースしやすくする。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <h3 id="523-cloudエミュレータbigtablespannerpubsubfirestore" tabIndex={-1}>
                        5.2.3 Cloudエミュレータ（Bigtable、Spanner、Pub/Sub、Firestore）
                    </h3>
                    <p>
                        一部のマネージドサービスには、<strong>ローカル環境で本番同等のAPIを模倣するエミュレータ</strong>が提供されています。これにより、開発中に実際の課金対象リソースを作成せずに統合テストを実施できます<a
                            className="footnote-ref"
                            href="#ref13"
                            id="fnref16"
                            role="doc-noteref"
                        ><sup>13</sup></a>。
                    </p>

                    <Diagram id="diag-9" label="Cloudエミュレータを用いた開発・テストフロー" />

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">サービス</th>
                                    <th scope="col">エミュレータの特徴</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Bigtable</td>
                                    <td>
                                        <code>cbt</code>ツールやAPI互換のローカルサーバーを提供し、スキーマ設計の検証に利用
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>Spanner</td>
                                    <td>
                                        ローカルでSpanner互換APIを提供し、トランザクション・スキーマのテストに利用（一部の高度な機能は非対応）
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>Pub/Sub</td>
                                    <td>
                                        トピック・サブスクリプションのpublish/subscribeフローをローカルで再現
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>Firestore</td>
                                    <td>
                                        ローカルでFirestoreのドキュメント/コレクション操作をエミュレート、セキュリティルールのテストも可能
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="callout-practice">
                        <div className="icon">✓</div>{" "}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{" "}
                            <ul>
                                <li>
                                    CI環境の統合テストステージでは、実際のマネージドインスタンスの代わりにエミュレータをコンテナとして起動し、テストごとの課金コストとプロビジョニング時間を削減する。
                                </li>{" "}
                                <li>
                                    エミュレータは本番の全機能を完全に再現するわけではない（特にSpannerの一部整合性動作やレイテンシ特性）ため、最終的な性能検証は必ずステージング環境の実サービスで行う。
                                </li>{" "}
                                <li>
                                    アプリケーションコードでは、エンドポイントを環境変数で切り替えられるように設計し、エミュレータ/本番を同一コードパスでテストできるようにする。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <h3 id="524-infrastructure-as-codeiacterraform" tabIndex={-1}>
                        5.2.4 Infrastructure as Code（IaC、Terraform）
                    </h3>
                    <p>
                        Infrastructure as Code（IaC）は、インフラ構成をコードとして宣言的に記述し、バージョン管理・レビュー・自動適用の対象とするプラクティスです。Google Cloudでは<strong>Terraform</strong>が事実上の標準ツールとして広く採用されています<a
                            className="footnote-ref"
                            href="#ref14"
                            id="fnref17"
                            role="doc-noteref"
                        ><sup>14</sup></a>。
                    </p>

                    <Diagram id="diag-10" label="Terraformによるプロビジョニングワークフロー" />

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">ツール/概念</th>
                                    <th scope="col">説明</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Terraform構成ファイル（.tf）</td>
                                    <td>リソースを宣言的に記述するHCL形式のファイル</td>
                                </tr>
                                <tr className="even">
                                    <td>Terraform State</td>
                                    <td>
                                        現在管理しているリソースの状態を記録するファイル。Cloud Storageなどにリモート保存し、チームで共有・ロックする
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>モジュール</td>
                                    <td>
                                        再利用可能なTerraform構成の単位。VPCやGKEクラスタなど典型的な構成をモジュール化して組織内で標準化する
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>Infrastructure Manager</td>
                                    <td>
                                        GoogleがマネージドでTerraform実行を代行するサービス。State管理やCI/CD連携をGoogle Cloud側に任せられる<a
                                            className="footnote-ref"
                                            href="#ref5"
                                            id="fnref18"
                                            role="doc-noteref"
                                        ><sup>5</sup></a>
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>Config Connector</td>
                                    <td>
                                        Kubernetesのカスタムリソース（CRD）としてGoogle Cloudリソースを宣言的に管理する仕組み。GitOpsとの親和性が高い<a
                                            className="footnote-ref"
                                            href="#ref15"
                                            id="fnref19"
                                            role="doc-noteref"
                                        ><sup>15</sup></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="callout-practice">
                        <div className="icon">✓</div>{" "}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{" "}
                            <ul>
                                <li>
                                    Terraform Stateは必ずリモートバックエンド（Cloud Storage＋状態ロック）で管理し、ローカルファイルとしての運用を避ける<a
                                        className="footnote-ref"
                                        href="#ref14"
                                        id="fnref20"
                                        role="doc-noteref"
                                    ><sup>14</sup></a>。
                                </li>{" "}
                                <li>
                                    環境（開発/ステージング/本番）ごとにStateとワークスペースを分離し、誤って本番環境に開発用の変更を適用するリスクを減らす。
                                </li>{" "}
                                <li>
                                    頻出パターン（VPC、GKE、IAMバインディング等）はモジュール化し、組織全体で一貫した構成を再利用できるようにする。
                                </li>{" "}
                                <li>
                                    Terraform実行はCI/CDパイプライン（Cloud Buildなど）に組み込み、<code>plan</code>の結果を人間がレビューしてから<code>apply</code>する2段階の承認フローを設ける。
                                </li>{" "}
                                <li>
                                    素のTerraform運用が難しいチームには、State管理やスケジュール実行をGoogle側に委譲できるInfrastructure Managerの採用を検討する<a
                                        className="footnote-ref"
                                        href="#ref5"
                                        id="fnref21"
                                        role="doc-noteref"
                                    ><sup>5</sup></a>。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <h3 id="525-google-apiへのアクセスのベストプラクティス" tabIndex={-1}>
                        5.2.5 Google APIへのアクセスのベストプラクティス
                    </h3>
                    <p>
                        Google CloudのほぼすべてのサービスはREST/gRPC APIとして公開されており、コンソールやCLIもすべて内部的にはこれらのAPIを呼び出しています。プログラムからAPIへ安全にアクセスするための認証パターンを理解することが重要です<a
                            className="footnote-ref"
                            href="#ref16"
                            id="fnref22"
                            role="doc-noteref"
                        ><sup>16</sup></a>。
                    </p>

                    <Diagram id="diag-11" label="Google API認証方式の選定フロー" />

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">認証方式</th>
                                    <th scope="col">適するケース</th>
                                    <th scope="col">注意点</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Application Default Credentials（ADC）</td>
                                    <td>
                                        Compute Engine/GKE/Cloud Run等、Google Cloud上で動作するワークロード
                                    </td>
                                    <td>
                                        メタデータサーバーやWorkload Identityから自動取得され、キー管理が不要
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>Workload Identity Federation</td>
                                    <td>他クラウドやオンプレミス、CI/CDからの認証</td>
                                    <td>
                                        サービスアカウントキーの発行を回避できる推奨パターン<a
                                            className="footnote-ref"
                                            href="#ref17"
                                            id="fnref23"
                                            role="doc-noteref"
                                        ><sup>17</sup></a>
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>OAuth 2.0</td>
                                    <td>
                                        ユーザーに代わってGoogle Cloud/Workspaceリソースへアクセスするアプリ
                                    </td>
                                    <td>同意画面とスコープ管理が必要</td>
                                </tr>
                                <tr className="even">
                                    <td>APIキー</td>
                                    <td>認可を伴わない公開APIへの単純なアクセス制御・識別</td>
                                    <td>
                                        機密性の高い操作には使用しない、HTTPリファラ/IP制限を併用する
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>サービスアカウントキー（JSON）</td>
                                    <td>上記が使えないレガシー環境向けの最終手段</td>
                                    <td>
                                        漏洩リスクが高く、可能な限り避けて定期ローテーションと保管管理を徹底する
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="callout-practice">
                        <div className="icon">✓</div>{" "}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{" "}
                            <ul>
                                <li>
                                    可能な限り<strong>サービスアカウントキーの発行を避け</strong>、ADCまたはWorkload Identity Federationを優先する<a
                                        className="footnote-ref"
                                        href="#ref17"
                                        id="fnref24"
                                        role="doc-noteref"
                                    ><sup>17</sup></a>。
                                </li>{" "}
                                <li>
                                    APIキーは認証ではなく識別のための仕組みであることを理解し、機微なデータや変更操作には使用しない。
                                </li>{" "}
                                <li>
                                    クライアントには最小権限のIAMロールを付与し、APIごとに個別のサービスアカウントを分離して影響範囲を限定する。
                                </li>{" "}
                                <li>
                                    APIクォータとレート制限を事前に確認し、指数バックオフを伴うリトライロジックをクライアント側に実装する。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <h3 id="526-google-apiクライアントライブラリ" tabIndex={-1}>
                        5.2.6 Google APIクライアントライブラリ
                    </h3>
                    <p>
                        Google Cloud APIクライアントライブラリは、各言語向けにイディオマティックなインターフェースを提供し、認証・リトライ・ページネーションといった定型処理を隠蔽してくれます<a
                            className="footnote-ref"
                            href="#ref18"
                            id="fnref25"
                            role="doc-noteref"
                        ><sup>18</sup></a>。
                    </p>

                    <Diagram id="diag-12" label="Google APIクライアントライブラリの階層構造" />

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">ライブラリ種別</th>
                                    <th scope="col">特徴</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Cloud Client Libraries</td>
                                    <td>
                                        Google Cloudの各サービス向けに提供される、言語イディオマティックな公式ライブラリ（Python/Java/Go/Node.js/C#等）
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>Google API Client Libraries</td>
                                    <td>
                                        Cloud Client Librariesがまだ存在しないAPIも含め、より広範なGoogle APIをカバーする汎用クライアント
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>gRPCベースAPI</td>
                                    <td>
                                        高スループット・低レイテンシが求められるサービス（Bigtable/Spanner等）で採用される通信方式
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="callout-practice">
                        <div className="icon">✓</div>{" "}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{" "}
                            <ul>
                                <li>
                                    対象サービスにCloud Client Libraryが存在する場合は、汎用のGoogle API Client Libraryよりも優先して使用し、よりイディオマティックでメンテナンス性の高いコードを書く。
                                </li>{" "}
                                <li>
                                    クライアントライブラリが提供する自動リトライ・指数バックオフの設定値を、アプリケーションのSLA要件に合わせて調整する。
                                </li>{" "}
                                <li>
                                    認証情報はコードにハードコーディングせず、ADCやシークレットマネージャー経由でクライアントライブラリに渡す。
                                </li>{" "}
                                <li>
                                    gRPCベースのAPIを使う際は、コネクションプーリングやチャネルの再利用を意識し、接続確立のオーバーヘッドを最小化する。
                                </li>
                            </ul>
                        </div>
                    </div>
                    <hr />

                    <h2 id="実装ツールチェーンの全体像" tabIndex={-1}>実装ツールチェーンの全体像</h2>
                    <p>
                        5.1と5.2で見てきた要素を1枚に統合すると、以下のような全体像になります。PCA試験では個別ツールの機能だけでなく、「どのツールがどの段階で組み合わさるか」という全体観が問われることが多いため、ここで一度整理しておきましょう。
                    </p>

                    <Diagram id="diag-13" label="Google Cloud実装ツールチェーンの全体像" />

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">フェーズ</th>
                                    <th scope="col">主な関心事</th>
                                    <th scope="col">代表サービス</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>開発</td>
                                    <td>ローカルでの高速な反復開発</td>
                                    <td>Cloud Shell Editor、Cloud Code、Cloudエミュレータ</td>
                                </tr>
                                <tr className="even">
                                    <td>CI（継続的インテグレーション）</td>
                                    <td>コード変更のビルドと自動テスト</td>
                                    <td>Cloud Build、単体/統合テスト</td>
                                </tr>
                                <tr className="odd">
                                    <td>CD（継続的デリバリー）</td>
                                    <td>安全な段階的リリース</td>
                                    <td>Artifact Registry、Cloud Deploy、負荷テスト</td>
                                </tr>
                                <tr className="even">
                                    <td>インフラプロビジョニング</td>
                                    <td>環境の再現可能な構築</td>
                                    <td>Terraform、Infrastructure Manager、Config Connector</td>
                                </tr>
                                <tr className="odd">
                                    <td>本番実行</td>
                                    <td>アプリケーションとAPIの提供</td>
                                    <td>GKE/Cloud Run/Compute Engine、Apigee</td>
                                </tr>
                                <tr className="even">
                                    <td>運用支援</td>
                                    <td>日々の操作とトラブルシューティング</td>
                                    <td>gcloud/gsutil/bq、Gemini Cloud Assist</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <hr />

                    <h2 id="ケーススタディ適用の視点" tabIndex={-1}>ケーススタディ適用の視点</h2>
                    <p>
                        PCA試験の各セクションは、公式ケーススタディ（Altostrat Media、Cymbal Retail、EHR Healthcare、KnightMotives Automotive）と組み合わせて出題されることがあります。Section 5の技術要素がそれぞれのケーススタディでどう問われうるか、学習の視点として整理します（以下は各ケーススタディの一般的な業種特性から想定される学習ポイントであり、試験本番の設問内容を示すものではありません）。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">ケーススタディ</th>
                                    <th scope="col">業種の特性</th>
                                    <th scope="col">Section 5の技術要素との接点（学習の視点）</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Altostrat Media</td>
                                    <td>
                                        メディア/コンテンツ配信、AIによるメタデータ抽出・モデレーション
                                    </td>
                                    <td>
                                        パートナー向けAPI公開でのApigee活用、コンテンツ処理パイプラインのCI/CD設計
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>Cymbal Retail</td>
                                    <td>小売、パーソナライゼーションと在庫最適化</td>
                                    <td>
                                        繁忙期に向けた負荷テスト設計、需要変動に対応するデプロイ戦略
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>EHR Healthcare</td>
                                    <td>医療記録管理、厳格なコンプライアンス要件</td>
                                    <td>
                                        レガシーオンプレミスDBからのデータ移行ツール選定、変更管理を伴う慎重なデプロイポリシー
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>KnightMotives Automotive</td>
                                    <td>コネクテッドカー、グローバルなテレメトリデータ収集</td>
                                    <td>
                                        Pub/Subエミュレータを用いたテレメトリ取り込みのテスト、Terraformによるマルチリージョンインフラの一貫した展開
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        <strong>学習のポイント</strong>: ケーススタディの詳細を丸暗記する必要はありませんが、「この業種ならどんな制約（コンプライアンス、データローカリティ、トラフィックの急増など）が生じ、Section 5のどのツールで対応するか」を自分の言葉で説明できるようにしておくと、シナリオ問題への対応力が高まります。
                    </p>
                    <hr />

                    <h2 id="学習チェックリスト" tabIndex={-1}>学習チェックリスト</h2>
                    <p>以下のチェックリストで、Section 5の理解度を自己確認してください。</p>
                    <div className="checklist-card">
                        <div className="checklist-header">
                            <span className="title">Section 5 理解度チェック</span>
                            <span className="count">{completedCount} / {CHECKLIST_ITEMS.length} 完了</span>
                        </div>
                        <ul>
                            {CHECKLIST_ITEMS.map((item) => (
                                <li key={item.id}>
                                    <label htmlFor={item.id}>
                                        <input
                                            id={item.id}
                                            type="checkbox"
                                            checked={!!checkedItems[item.id]}
                                            onChange={() => handleCheckboxChange(item.id)}
                                        />
                                        {item.text}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <hr />

                    <h2 id="参考文献" tabIndex={-1}>参考文献</h2>
                    <p>
                        本ガイドの記述は、以下の公式ドキュメントおよび公式試験ガイドを根拠としています。
                    </p>
                    <div className="ref-grid">
                        {REFERENCES.map((ref) => (
                            <div className="ref-card" id={ref.id} key={ref.id}>
                                <div className="num">{ref.num}</div>
                                <div className="txt">
                                    {ref.title}{' '}
                                    <a href={ref.url} target="_blank" rel="noopener noreferrer">
                                        {ref.url}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}

