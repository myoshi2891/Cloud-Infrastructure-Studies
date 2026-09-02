'use client';

import { memo, useState } from 'react';
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
            <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale={true} />
        </div>
    );
});

interface CheckItem {
    id: string;
    text: string;
}

const CHECKLIST_ITEMS: CheckItem[] = [
    {
        id: 'chk1',
        text: 'Compute Engine・GKE・Cloud Runの選定基準を、コンテナ/VM要件・運用負荷の観点で説明できる',
    },
    {
        id: 'chk2',
        text: 'Cloud Runのトラフィック分割でカナリアデプロイ・Blue-Greenデプロイ・ロールバックを実装できる',
    },
    {
        id: 'chk3',
        text: 'REST APIとgRPC APIの使い分け、API GatewayとApigeeの使い分けを説明できる',
    },
    {
        id: 'chk4',
        text: 'Eventarc・Pub/Sub・Workflows・Cloud Tasks・Cloud Schedulerの役割の違いを理解している',
    },
    {
        id: 'chk5',
        text: 'Object Lifecycle Managementと保持ポリシーの違い・組み合わせ方を説明できる',
    },
    {
        id: 'chk6',
        text: 'IAP・Web Security Scanner・Artifact Analysis・Security Command Centerそれぞれの役割を説明できる',
    },
    {
        id: 'chk7',
        text: 'Secret Manager・Cloud KMS・Workload Identity Federationを使ったシークレット管理のベストプラクティスを説明できる',
    },
    {
        id: 'chk8',
        text: 'ADC・JWT・OAuth2.0・Cloud SQL/AlloyDB Auth Proxy・Identity Platform・WIFの使い分けができる',
    },
    {
        id: 'chk9',
        text: 'サービスアカウントの最小権限運用（専用アカウント、キー管理のベストプラクティス）を説明できる',
    },
    {
        id: 'chk10',
        text: 'Direct VPC egress・Kubernetes Network Policies・Cloud Service Mesh・Private Service Connectの違いを理解している',
    },
    {
        id: 'chk11',
        text: 'Binary Authorizationのアテステーション・SLSA・provenanceの流れを説明できる',
    },
    {
        id: 'chk12',
        text: 'AlloyDB・Spanner・Cloud SQL・Firestore・Bigtable・BigQuery・Memorystoreの使い分けができる',
    },
    {
        id: 'chk13',
        text: 'Spanner/Bigtable/Firestoreそれぞれのスキーマ設計上の注意点（ホットスポット回避等）を理解している',
    },
    {
        id: 'chk14',
        text: '結果整合性と強整合性の違いを主要データストアごとに説明できる',
    },
    {
        id: 'chk15',
        text: '署名付きURLの作成方法と有効期限設計を理解している',
    },
    {
        id: 'chk16',
        text: 'BigQueryへのストリーミング書き込み（Storage Write API）の使い方を理解している',
    },
    {
        id: 'chk17',
        text: 'gcloudエミュレータ・Cloud Code・Cloud Workstations・Gemini Code Assistの役割を説明できる',
    },
    {
        id: 'chk18',
        text: 'Cloud BuildとArtifact Registryを使ったビルドパイプラインを構成できる',
    },
    {
        id: 'chk19',
        text: 'Cloud Buildでprovenance（SLSA）を生成し、Binary Authorizationと連携できる',
    },
    {
        id: 'chk20',
        text: 'Cloud Buildで自動化された統合テストを実行するパイプラインを構成できる',
    },
    {
        id: 'chk21',
        text: 'Cloud Runへのソースからのデプロイ、Eventarc/Pub/Subトリガーの設定ができる',
    },
    {
        id: 'chk22',
        text: 'Kubernetesのliveness/readiness/startupプローブを適切に設定できる',
    },
    {
        id: 'chk23',
        text: 'HPAのベストプラクティス（リソースリクエストの正しい設定、バッファの確保等）を理解している',
    },
    {
        id: 'chk24',
        text: 'Cloud SQL Auth Proxy等を使ったデータストアへの安全な接続を実装できる',
    },
    {
        id: 'chk25',
        text: 'APIコール時のバッチ処理・フィールド制限・ページネーション・キャッシュ・指数バックオフを実装できる',
    },
    {
        id: 'chk26',
        text: 'メトリクス・ログ・トレースの違いとOpenTelemetryによるインストルメンテーションを理解している',
    },
    {
        id: 'chk27',
        text: 'Error Reportingとトレースの相関を使ったトラブルシューティングの流れを説明できる',
    },
];

export function ProfessionalCloudDeveloperGuide() {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

    const toggleCheck = (id: string) => {
        setCheckedItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const checkedCount = Object.values(checkedItems).filter(Boolean).length;

    return (
        <div className="pcd-guide-page">
            <div className="layout">
                <NavBar />
                <main className="main">
                    <div className="hero">
                        <div className="kicker">Professional Cloud Developer &middot; 学習ガイド</div>
                        <h1>Google Cloud Professional Cloud Developer（PCD）認定試験 学習ガイド</h1>
                        <div className="meta-row">
                            <span className="pill">
                                配点 <strong>4セクション（33% / 26% / 19% / 22%）</strong>
                            </span>
                            <span className="pill">
                                対象 <strong>初学者〜中級者</strong>
                            </span>
                            <span className="pill">
                                図解 <strong>Mermaid 13点</strong>
                            </span>
                            <span className="pill">
                                参考文献 <strong>53件</strong>
                            </span>
                        </div>
                    </div>

                    <p>
                        初学者〜中級者向けに、Professional Cloud Developer
                        認定試験の出題範囲を項目ごとに解説し、各サービス・機能のベストプラクティスと公式ソースをまとめたガイドです。
                    </p>

                    <p>
                        <strong>対象読者</strong>: Google Cloud
                        上でクラウドネイティブなアプリケーションを設計・構築・デプロイ・運用するソフトウェアエンジニア。
                    </p>

                    <p>
                        <strong>本ガイドの前提資料</strong>:
                    </p>

                    <ul>
                        <li>
                            公式認定ページ:{' '}
                            <a href="https://cloud.google.com/learn/certification/cloud-developer">
                                cloud.google.com/learn/certification/cloud-developer
                            </a>
                        </li>
                        <li>
                            公式 Exam Guide PDF:{' '}
                            <a href="https://services.google.com/fh/files/misc/professional_cloud_developer_exam_guide_english.pdf">
                                services.google.com/fh/files/misc/professional_cloud_developer_exam_guide_english.pdf
                            </a>
                        </li>
                    </ul>

                    <hr />

                    <h2 id="0-試験の概要" tabIndex={-1}>
                        0. 試験の概要
                    </h2>

                    <p>
                        Professional Cloud Developer は、Google
                        推奨のツールとベストプラクティスを使ってスケーラブルかつセキュアなアプリケーションを構築・構成できる開発者を認定する試験です。設計からビルド・テスト、デプロイ、Google
                        Cloud サービスとの統合まで、開発ライフサイクル全体をカバーします。
                    </p>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">項目</th>
                                    <th scope="col">内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>試験時間</td>
                                    <td>2時間</td>
                                </tr>
                                <tr className="even">
                                    <td>受験料</td>
                                    <td>$200（税別途）</td>
                                </tr>
                                <tr className="odd">
                                    <td>出題言語</td>
                                    <td>英語・日本語</td>
                                </tr>
                                <tr className="even">
                                    <td>出題形式</td>
                                    <td>選択式・複数選択式 50〜60問</td>
                                </tr>
                                <tr className="odd">
                                    <td>前提条件</td>
                                    <td>なし</td>
                                </tr>
                                <tr className="even">
                                    <td>推奨経験</td>
                                    <td>業界経験3年以上（うちGoogle Cloudでの設計・運用経験1年以上）</td>
                                </tr>
                                <tr className="odd">
                                    <td>受験方法</td>
                                    <td>オンライン監督付き、またはテストセンターでの受験</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 id="出題範囲4セクション" tabIndex={-1}>
                        出題範囲（4セクション）
                    </h3>

                    <Diagram
                        id="diag-exam-scope"
                        label="Professional Cloud Developer 試験の出題範囲（4セクション）の構成図"
                    />

                    <p>
                        <strong>出典</strong>:{' '}
                        <a href="https://services.google.com/fh/files/misc/professional_cloud_developer_exam_guide_english.pdf">
                            Professional Cloud Developer Certification exam guide
                        </a>
                        、
                        <a href="https://cloud.google.com/learn/certification/cloud-developer">
                            Professional Cloud Developer Certification | Google Cloud
                        </a>
                    </p>

                    <h2 id="section1" tabIndex={-1}>
                        1. セクション1:
                        高可用性、セキュア、信頼性の高いクラウドネイティブアプリケーションの設計（約33%）
                    </h2>

                    <h3 id="11-高性能アプリケーションとapiの設計" tabIndex={-1}>
                        1.1 高性能アプリケーションとAPIの設計
                    </h3>

                    <h4 id="コンピューティングプラットフォームの選択" tabIndex={-1}>
                        コンピューティングプラットフォームの選択
                    </h4>

                    <p>
                        Compute Engine・GKE・Cloud Run
                        のどれを選ぶかは、必要な制御レベルとワークロードの性質で決まります。
                    </p>

                    <Diagram
                        id="diag-compute-choice"
                        label="Compute Engine・GKE・Cloud Run の選定フローチャート"
                    />

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">プラットフォーム</th>
                                    <th scope="col">運用負荷</th>
                                    <th scope="col">適したユースケース</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Compute Engine</td>
                                    <td>高（OS・パッチ・スケーリングを自前管理）</td>
                                    <td>
                                        レガシーアプリの移行、特定OS/カーネル/ライセンス要件、SAP HANAなど
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>GKE</td>
                                    <td>中〜高（クラスタ管理は必要だがKubernetesが自動化）</td>
                                    <td>
                                        マイクロサービス、複雑な組み合わせのステートフル/ステートレス混在ワークロード、マルチクラウド/ハイブリッド展開
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>Cloud Run</td>
                                    <td>低（フルマネージド、スケールtoゼロ）</td>
                                    <td>
                                        ステートレスなHTTP/gRPCサービス、イベント駆動処理、可変トラフィックのAPI
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        {' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            {' '}
                            <p>
                                新規のステートレスHTTPサービスは、まず Cloud Run
                                をデフォルトの選択肢として検討する。Kubernetes固有の機能（カスタムコントローラ、サービスメッシュ、DaemonSetなど）が明確に必要になった時点で
                                GKE への移行を検討する。
                            </p>
                        </div>
                    </div>

                    <p>
                        <strong>出典</strong>:{' '}
                        <a href="https://cloud.google.com/blog/topics/developers-practitioners/where-should-i-run-my-stuff-choosing-google-cloud-compute-option">
                            Where should I run my stuff? | Google Cloud Blog
                        </a>
                    </p>

                    <p>
                        コンテナのビルド・リファクタリングは Cloud Build（後述 2.2）で行い、
                        <code>gcloud run deploy --source</code>
                        {' '}によるソースからの直接デプロイ、または事前ビルド済みイメージのデプロイのいずれも可能です（詳細は
                        3.1 で扱います）。
                    </p>

                    <h4 id="地理的分散とロードバランサ" tabIndex={-1}>
                        地理的分散とロードバランサ
                    </h4>

                    <p>
                        Google Cloud のサービスにはグローバル（例: Cloud Load Balancing
                        の一部）、リージョナル、ゾーナルの3種類のスコープがあります。リージョン間・ゾーン間のレイテンシとサービスの可用性要件を踏まえてアーキテクチャを設計する必要があります。
                    </p>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">ロードバランサの種類</th>
                                    <th scope="col">ユースケース</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>グローバル外部アプリケーション ロードバランサ</td>
                                    <td>複数リージョンにまたがるHTTP(S)トラフィックの分散、CDN連携</td>
                                </tr>
                                <tr className="even">
                                    <td>リージョン外部/内部アプリケーション ロードバランサ</td>
                                    <td>リージョン内で完結するHTTP(S)サービス</td>
                                </tr>
                                <tr className="odd">
                                    <td>内部パススルー ネットワークロードバランサ</td>
                                    <td>内部TCP/UDPトラフィックの低レイテンシ分散</td>
                                </tr>
                                <tr className="even">
                                    <td>Cloud Run/GKEの組み込みロードバランシング</td>
                                    <td>
                                        Cloud
                                        Runはリージョナルサービス。マルチリージョン配信には複数リージョンへデプロイし、その前段にグローバル外部アプリケーション
                                        ロードバランサを構成する。GKEはService/Ingressで制御
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p>
                        <strong>セッションアフィニティ</strong>:
                        同一クライアントのリクエストを同じバックエンドインスタンスにルーティングし続けたい場合（例:
                        ステートフルなWebSocket接続）に有効化します。ただしCloud
                        Runのセッションアフィニティは<strong>ベストエフォート</strong>であり、インスタンスが終了したときや処理能力を超えたときには別のインスタンスへリクエストが振り向けられます。セッション状態はMemorystoreなどの外部ストアで共有し、WebSocketなどのステートフルな接続は再接続を前提に実装してください。Cloud
                        Runでトラフィック分割と併用する場合は、セッションアフィニティがトラフィック比率の実際の分配に影響する点にも注意が必要です。
                    </p>

                    <p>
                        <strong>出典</strong>:{' '}
                        <a href="https://docs.cloud.google.com/run/docs/rollouts-rollbacks-traffic-migration">
                            Rollbacks, gradual rollouts, and traffic migration | Cloud Run
                        </a>
                    </p>

                    <h4 id="キャッシングmemorystore" tabIndex={-1}>
                        キャッシング（Memorystore）
                    </h4>

                    <p>
                        Memorystore（Redis/Valkey/Memcached互換）を使い、頻繁に読み取られるデータをサブミリ秒でアクセスできるようキャッシュします。データベースへの負荷軽減とレイテンシ短縮が主目的です。なお<strong>Memorystore for Memcachedは非推奨（deprecated）</strong>であり、新規設計ではMemorystore for Valkeyを優先します。Memorystore
                        への呼び出しでも、5xx・429エラーに対しては指数バックオフでのリトライが推奨されます。
                    </p>

                    <p>
                        <strong>出典</strong>:{' '}
                        <a href="https://docs.cloud.google.com/memorystore/docs/redis/exponential-backoff">
                            Exponential backoff | Memorystore for Redis
                        </a>
                    </p>

                    <h4 id="apiの作成-rest-と-grpc" tabIndex={-1}>
                        APIの作成: REST と gRPC
                    </h4>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">観点</th>
                                    <th scope="col">REST（HTTP/JSON）</th>
                                    <th scope="col">gRPC</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>プロトコル</td>
                                    <td>HTTP/1.1が主流</td>
                                    <td>HTTP/2ベース</td>
                                </tr>
                                <tr className="even">
                                    <td>データ形式</td>
                                    <td>人間可読なJSON</td>
                                    <td>バイナリのProtocol Buffers</td>
                                </tr>
                                <tr className="odd">
                                    <td>契約定義</td>
                                    <td>OpenAPI等（任意）</td>
                                    <td>
                                        <code>.proto</code>ファイルで厳密に定義
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>ストリーミング</td>
                                    <td>限定的（SSE等）</td>
                                    <td>双方向ストリーミングをネイティブサポート</td>
                                </tr>
                                <tr className="odd">
                                    <td>向いている用途</td>
                                    <td>公開API、ブラウザ直叩き、シンプルなCRUD</td>
                                    <td>
                                        マイクロサービス間の高頻度通信、低レイテンシ要件、多言語間の型安全な契約
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p>
                        Google自身もCloud
                        APIの設計にはREST的な考え方を取り入れたRPC（gRPC）スタイルを推奨しており、Cloud
                        Endpointsの多くもこの設計指針に従っています。
                    </p>

                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        {' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            {' '}
                            <p>
                                サービス間（内部）通信で低レイテンシ・強い型付けが必要ならgRPC、外部公開APIや幅広いクライアント互換性が必要ならRESTを選ぶ。両方が必要な場合はgRPCで定義しHTTP/JSONトランスコーディングを併用する設計も可能。
                            </p>
                        </div>
                    </div>

                    <p>
                        <strong>出典</strong>:{' '}
                        <a href="https://docs.cloud.google.com/apis/design">
                            API Design Guide | Google Cloud
                        </a>
                        、
                        <a href="https://cloud.google.com/blog/products/api-management/understanding-grpc-openapi-and-rest-and-when-to-use-them">
                            gRPC vs REST | Google Cloud Blog
                        </a>
                    </p>

                    <h4 id="レート制限認証オブザーバビリティ-api-gateway-と-apigee" tabIndex={-1}>
                        レート制限・認証・オブザーバビリティ: API Gateway と Apigee
                    </h4>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">観点</th>
                                    <th scope="col">API Gateway</th>
                                    <th scope="col">Apigee</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>位置づけ</td>
                                    <td>軽量なゲートウェイ（ルーティング・認証・基本レート制限）</td>
                                    <td>フル機能のAPI管理プラットフォーム</td>
                                </tr>
                                <tr className="even">
                                    <td>認証</td>
                                    <td>APIキー、IAM、JWT</td>
                                    <td>OAuth2、SAML、APIキー等の高度な認証</td>
                                </tr>
                                <tr className="odd">
                                    <td>開発者ポータル</td>
                                    <td>なし</td>
                                    <td>あり（外部開発者向け公開に有効）</td>
                                </tr>
                                <tr className="even">
                                    <td>マネタイズ・分析</td>
                                    <td>基本的なCloud Monitoring/Logging連携のみ</td>
                                    <td>詳細な分析、マネタイズ、トラフィック変換</td>
                                </tr>
                                <tr className="odd">
                                    <td>適したケース</td>
                                    <td>
                                        Google Cloudのサーバーレスサービス向けのシンプルなフロントドア
                                    </td>
                                    <td>
                                        APIをビジネス資産として外部提供する場合、高度なトラフィック制御が必要な場合
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        {' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            {' '}
                            <p>
                                内部マイクロサービスの認証・クォータ・監視だけで十分なら API
                                Gateway（またはCloud
                                Endpoints）を使う。外部開発者へのAPI公開、収益化、高度なセキュリティポリシーが必要になった時点でApigeeを検討する。過剰な機能を持つApigeeを最初から選ぶと運用コストが増える。
                            </p>
                        </div>
                    </div>

                    <p>
                        <strong>出典</strong>:{' '}
                        <a href="https://docs.cloud.google.com/api-gateway/docs/concepts">
                            About API Gateway | Google Cloud
                        </a>
                    </p>

                    <h4 id="非同期イベント駆動統合とオーケストレーション" tabIndex={-1}>
                        非同期・イベント駆動統合とオーケストレーション
                    </h4>

                    <Diagram
                        id="diag-async-event"
                        label="非同期・イベント駆動統合とオーケストレーションの構成図"
                    />

                    <ul>
                        <li>
                            <strong>Eventarc</strong>: Pub/Sub、Cloud Storage、Cloud Audit Logs
                            など130以上のイベントソースを CloudEvents 形式に正規化し、Cloud
                            Run・GKE・Workflows
                            にルーティングする。Pub/Subトランスポート経由のため少なくとも1回配信が保証され、イベントハンドラは冪等に実装する必要がある。
                        </li>
                        <li>
                            <strong>Pub/Sub</strong>:
                            メッセージング基盤そのもの。Eventarcより細かい制御（サブスクリプションのフィルタ、デッドレタートピック等）が必要な場合は直接利用する。
                        </li>
                        <li>
                            <strong>Workflows</strong>:
                            複数サービス・APIの呼び出し順序を宣言的に定義するフルマネージドオーケストレーションサービス。HTTP呼び出し、Pub/Sub、Cloud
                            Schedulerからトリガー可能。
                        </li>
                        <li>
                            <strong>Cloud Tasks</strong>:
                            配信タイミングの制御・レート制御・リトライ設定ができる非同期タスクキュー。配信は<strong>少なくとも1回</strong>であり、タスク名の指定は同名タスクの重複追加を抑止するものであって、実行時の重複配信を防ぐものではない。
                        </li>
                        <li>
                            <strong>Cloud Scheduler</strong>:
                            cron形式でWorkflows・Pub/Sub・HTTPエンドポイントを定期実行する。
                        </li>
                    </ul>

                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        {' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            {' '}
                            <p>
                                Eventarcは「イベントが発生したら実行する」宣言的なルーティングに、Cloud
                                Tasksは「特定のタイミング・レートで確実に実行したい」制御されたディスパッチに使い分ける。ただしCloud
                                Tasksも少なくとも1回配信であり、1回だけ実行されることは保証されない。イベントハンドラとタスクハンドラは常に冪等に実装し、CloudEventのIDやタスク名で重複を検出する。
                            </p>
                        </div>
                    </div>

                    <p>
                        <strong>出典</strong>:{' '}
                        <a href="https://docs.cloud.google.com/run/docs/triggering/trigger-with-events">
                            Create triggers with Eventarc | Cloud Run
                        </a>
                        、
                        <a href="https://docs.cloud.google.com/workflows/docs/overview">
                            Workflows overview
                        </a>
                        、
                        <a href="https://docs.cloud.google.com/tasks/docs/dual-overview">
                            Understand Cloud Tasks
                        </a>
                        、
                        <a href="https://docs.cloud.google.com/scheduler/docs">
                            Cloud Scheduler documentation
                        </a>
                    </p>

                    <h4
                        id="トラフィック分割戦略段階的ロールアウトロールバックabテスト"
                        tabIndex={-1}
                    >
                        トラフィック分割戦略（段階的ロールアウト・ロールバック・A/Bテスト）
                    </h4>

                    <Diagram
                        id="diag-traffic-split"
                        label="Cloud Run のトラフィック分割戦略（カナリア・段階的ロールアウト）"
                    />

                    <p>
                        Cloud Runはリビジョン単位でトラフィックを分割でき、
                        <code>gcloud run services update-traffic</code>
                        {' '}でパーセンテージを指定するだけでカナリアデプロイ・Blue-Greenデプロイ・A/Bテストが実現できます。問題があれば旧リビジョンへ100%戻すことでロールバックできます。ただし切り替えは瞬時ではなく反映には時間がかかり、移行中の新規リクエストは新旧いずれかのリビジョンへ送られ、処理中のリクエストは割り当てられたリビジョンで完了します。
                    </p>

                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        {' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            {' '}
                            <p>
                                新リビジョンには最初トラフィック0%〜少量を割り当て、Cloud
                                Monitoringでエラー率・レイテンシを確認しながら段階的に拡大する。両リビジョンが並行稼働する間はリソース課金も両方に発生するため、カナリア期間は必要以上に長引かせない。
                            </p>
                        </div>
                    </div>

                    <p>
                        <strong>出典</strong>:{' '}
                        <a href="https://docs.cloud.google.com/run/docs/rollouts-rollbacks-traffic-migration">
                            Rollbacks, gradual rollouts, and traffic migration | Cloud Run
                        </a>
                        、
                        <a href="https://docs.cloud.google.com/run/docs/managing/revisions">
                            Manage revisions | Cloud Run
                        </a>
                    </p>

                    <h4 id="リソース要件の定義とコスト最適化" tabIndex={-1}>
                        リソース要件の定義とコスト最適化
                    </h4>

                    <p>
                        CPU・メモリのリクエストとリミットを実測に基づいて適切に設定し、過剰プロビジョニングを避けます。Cloud
                        Runでは最小インスタンス数（コールドスタート回避）と最大インスタンス数（コスト上限）のバランスを取ります。GKEでは
                        Vertical Pod Autoscaler（VPA）と Horizontal Pod
                        Autoscaler（HPA）を組み合わせ、余剰リソースを削減します。
                    </p>

                    <h4
                        id="ゾーンリージョンフェイルオーバーのためのデータレプリケーション"
                        tabIndex={-1}
                    >
                        ゾーン・リージョンフェイルオーバーのためのデータレプリケーション
                    </h4>

                    <p>
                        AlloyDB・Cloud SQL・Spanner・Bigtable・Cloud Storage
                        はそれぞれ異なるレプリケーション/可用性モデルを持ちます（詳細は
                        1.3）。アプリケーション層では、リージョン障害時にどのデータストアがフェイルオーバーし、RPO/RTOがどうなるかを設計段階で明確にしておく必要があります。
                    </p>

                    <hr />

                    <h3 id="12-セキュアなアプリケーションの設計" tabIndex={-1}>
                        1.2 セキュアなアプリケーションの設計
                    </h3>

                    <h4 id="データ保持組織化ポリシー" tabIndex={-1}>
                        データ保持・組織化ポリシー
                    </h4>

                    <p>
                        Cloud Storage の{' '}
                        <strong>Object Lifecycle Management</strong>
                        {' '}は、オブジェクトの経過日数などの条件に応じてストレージクラスの変更や削除を自動化します。<strong>保持ポリシー（Retention Policy）</strong>
                        {' '}はバケット内のオブジェクトが一定期間削除・上書きできないことを保証し、ロック（Retention
                        Policy Lock）をかけると保持ポリシー自体も変更不可になります。
                    </p>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">機能</th>
                                    <th scope="col">目的</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Object Lifecycle Management</td>
                                    <td>
                                        経過日数・ストレージクラス等の条件でオブジェクトを自動的に削除／クラス変更
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>保持ポリシー（Retention Policy）</td>
                                    <td>指定期間内のオブジェクトの削除・上書きを禁止</td>
                                </tr>
                                <tr className="odd">
                                    <td>保持ポリシーのロック</td>
                                    <td>
                                        保持ポリシー自体を恒久的に変更不可にする（コンプライアンス要件向け）
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>オブジェクトホールド</td>
                                    <td>個別オブジェクトの削除を一時的に禁止</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        {' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            {' '}
                            <p>
                                署名付きURLで一時アップロードを許可するバケットでは、Object Lifecycle
                                Managementの削除期限と保持ポリシーの期間を一致させ、意図しない削除・保持の矛盾を避ける。
                            </p>
                        </div>
                    </div>

                    <p>
                        <strong>出典</strong>:{' '}
                        <a href="https://docs.cloud.google.com/storage/docs/lifecycle">
                            Object Lifecycle Management | Cloud Storage
                        </a>
                    </p>

                    <h4 id="脆弱性の特定と保護" tabIndex={-1}>
                        脆弱性の特定と保護
                    </h4>

                    <ul>
                        <li>
                            <strong>Identity-Aware Proxy（IAP）</strong>:
                            HTTPSでアクセスするアプリケーションに対し、ネットワークファイアウォールではなくアプリケーションレベルのアクセス制御（IAMベース）を提供する。VPNや公開IPを不要にし、コンテキストアウェアなアクセス（デバイスの状態、位置情報等）も可能。
                        </li>
                        <li>
                            <strong>Web Security Scanner</strong>: App Engine・GKE・Compute
                            Engine上のWebアプリに対してXSS、Flash
                            Injection、混合コンテンツなどの一般的な脆弱性をスキャンする。
                        </li>
                    </ul>

                    <p>
                        <strong>出典</strong>:{' '}
                        <a href="https://docs.cloud.google.com/iap/docs/concepts-overview">
                            Identity-Aware Proxy overview
                        </a>
                    </p>

                    <h4 id="脆弱性への対応" tabIndex={-1}>
                        脆弱性への対応
                    </h4>

                    <ul>
                        <li>
                            <strong>Artifact Analysis</strong>: Artifact Registry / Container
                            Registry内のコンテナイメージをスキャンし、既知の脆弱性（CVE）を検出する。Cloud
                            Buildのビルド来歴（provenance）情報もここに保存される。
                        </li>
                        <li>
                            <strong>Security Command Center（SCC）</strong>: Security Health
                            AnalyticsやWeb Security
                            Scannerが検出した脆弱性ファインディングを一元的に可視化するダッシュボード。組織全体のセキュリティ体制を横断的に把握できる。
                        </li>
                    </ul>

                    <p>
                        <strong>出典</strong>:{' '}
                        <a href="https://docs.cloud.google.com/security-command-center/docs/concepts-vulnerabilities-findings">
                            Vulnerability findings | Security Command Center
                        </a>
                    </p>

                    <h4 id="シークレット認証情報暗号鍵の保管とローテーション" tabIndex={-1}>
                        シークレット・認証情報・暗号鍵の保管とローテーション
                    </h4>

                    <Diagram
                        id="diag-secret-wif"
                        label="Workload Identity Federation による外部IDからGoogle Cloudトークンへの交換"
                    />

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">サービス</th>
                                    <th scope="col">用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Secret Manager</td>
                                    <td>
                                        APIキー、パスワード、証明書などのシークレットを一元管理・バージョニング・IAMで保護
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>Cloud Key Management Service（KMS）</td>
                                    <td>暗号鍵の作成・ローテーション・利用（CMEK等）</td>
                                </tr>
                                <tr className="odd">
                                    <td>Workload Identity Federation（WIF）</td>
                                    <td>
                                        外部IDプロバイダのトークンをGoogle
                                        Cloudの認証情報に交換し、サービスアカウントキーを不要にする
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        {' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            {' '}
                            <ul>
                                <li>
                                    サービスアカウントキーのエクスポートは避け、GKEやCompute
                                    Engineでは組み込みのWorkload
                                    Identity、他クラウド/オンプレミスではWorkload Identity
                                    Federationを使う（管理すべきシークレットの数を減らせる）。
                                </li>
                                {' '}
                                <li>
                                    Secret Managerではシークレットを{' '}
                                    <code>latest</code>
                                    {' '}エイリアスではなく特定のバージョン番号で参照し、既存のリリースプロセスでバージョンを更新する。
                                </li>
                                {' '}
                                <li>
                                    シークレットをファイルシステムや環境変数経由でアプリに渡すのは避け、Secret
                                    Managerのクライアントライブラリで直接取得する。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <p>
                        <strong>出典</strong>:{' '}
                        <a href="https://docs.cloud.google.com/secret-manager/docs/best-practices">
                            Secret Manager best practices
                        </a>
                        、
                        <a href="https://docs.cloud.google.com/iam/docs/best-practices-for-using-workload-identity-federation">
                            Best practices for using Workload Identity Federation
                        </a>
                    </p>

                    <h4 id="google-cloudサービスへの認証方法" tabIndex={-1}>
                        Google Cloudサービスへの認証方法
                    </h4>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">方式</th>
                                    <th scope="col">説明</th>
                                    <th scope="col">主な用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Application Default Credentials（ADC）</td>
                                    <td>
                                        環境（GKE/Cloud
                                        Run/ローカル等）に応じて自動的に適切な認証情報を検出
                                    </td>
                                    <td>Google Cloud上で動くアプリのデフォルト認証</td>
                                </tr>
                                <tr className="even">
                                    <td>JSON Web Token（JWT）</td>
                                    <td>署名済みトークンでIDを主張</td>
                                    <td>サービス間認証、IAP経由のユーザー認証</td>
                                </tr>
                                <tr className="odd">
                                    <td>OAuth 2.0</td>
                                    <td>認可フレームワーク</td>
                                    <td>ユーザーの代理でAPIを呼び出す場合</td>
                                </tr>
                                <tr className="even">
                                    <td>Cloud SQL Auth Proxy / AlloyDB Auth Proxy</td>
                                    <td>
                                        IAM認証情報を使ってmTLSでデータベースに安全に接続するローカルプロキシ
                                    </td>
                                    <td>Cloud SQL / AlloyDB へのアプリ接続</td>
                                </tr>
                                <tr className="odd">
                                    <td>Identity Platform</td>
                                    <td>顧客向けアプリの認証・ユーザー管理（CIAM）</td>
                                    <td>エンドユーザー向けログイン機能の実装</td>
                                </tr>
                                <tr className="even">
                                    <td>Workload Identity Federation</td>
                                    <td>外部IDをGoogle Cloudの短命トークンに交換</td>
                                    <td>他クラウド・オンプレミス・CI/CDからの認証</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p>
                        <strong>出典</strong>:{' '}
                        <a href="https://docs.cloud.google.com/sql/docs/mysql/sql-proxy">
                            About the Cloud SQL Auth Proxy | Cloud SQL for MySQL
                        </a>
                        、
                        <a href="https://docs.cloud.google.com/alloydb/docs/auth-proxy/overview">
                            About the AlloyDB Auth Proxy
                        </a>
                    </p>

                    <h4
                        id="サービスアカウントのiamロールによるリソース保護と最小権限"
                        tabIndex={-1}
                    >
                        サービスアカウントのIAMロールによるリソース保護と最小権限
                    </h4>

                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        {' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            {' '}
                            <ul>
                                <li>
                                    サービスやユースケースごとに専用のサービスアカウントを作成し、必要なリソースへのアクセスのみを付与する（最小権限の原則）。
                                </li>
                                {' '}
                                <li>
                                    Editor/Ownerなどの基本ロールは避け、事前定義ロールまたはカスタムロールを使う。
                                </li>
                                {' '}
                                <li>
                                    サービスアカウントキーの管理より、IAM Credentials
                                    APIによる一時的な権限昇格やCredential Access
                                    Boundariesによるトークンのダウンスコープを優先する。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <p>
                        <strong>出典</strong>:{' '}
                        <a href="https://docs.cloud.google.com/iam/docs/best-practices-service-accounts">
                            Best practices for using service accounts securely
                        </a>
                        、
                        <a href="https://docs.cloud.google.com/iam/docs/best-practices-for-managing-service-account-keys">
                            Best practices for managing service account keys
                        </a>
                    </p>

                    <h4 id="セキュアなサービス間通信" tabIndex={-1}>
                        セキュアなサービス間通信
                    </h4>

                    <Diagram
                        id="diag-secure-comm"
                        label="Direct VPC egress / Private Service Connect / Cloud Service Mesh によるセキュア通信"
                    />

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">手段</th>
                                    <th scope="col">概要</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Direct VPC egress</td>
                                    <td>
                                        Serverless VPC Accessコネクタ不要でCloud
                                        RunからVPCへ直接接続。インスタンスあたり最大1Gbpsのスループット
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>Kubernetes Network Policies</td>
                                    <td>GKE内のPod間通信をラベルベースで許可・拒否</td>
                                </tr>
                                <tr className="odd">
                                    <td>Cloud Service Mesh</td>
                                    <td>
                                        Envoy/Istioベースのフルマネージドサービスメッシュ。mTLS、トラフィック管理、可観測性を提供
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>Private Service Connect（PSC）</td>
                                    <td>
                                        消費者VPCとプロデューサーVPC間を内部IPで接続し、IPアドレスの重複を気にせず疎結合に連携
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p>
                        <strong>出典</strong>:{' '}
                        <a href="https://docs.cloud.google.com/run/docs/configuring/vpc-direct-vpc">
                            Direct VPC egress with a VPC network | Cloud Run
                        </a>
                        、
                        <a href="https://docs.cloud.google.com/run/docs/securing/private-networking">
                            Private networking and Cloud Run
                        </a>
                        、
                        <a href="https://cloud.google.com/vpc/docs/private-service-connect">
                            Private Service Connect | VPC
                        </a>
                        、
                        <a href="https://docs.cloud.google.com/service-mesh/docs/configure-cloud-service-mesh-for-cloud-run">
                            Configure Cloud Service Mesh for Cloud Run
                        </a>
                    </p>

                    <h4
                        id="binary-authorizationによるアプリケーションアーティファクトの保護"
                        tabIndex={-1}
                    >
                        Binary Authorizationによるアプリケーションアーティファクトの保護
                    </h4>

                    <Diagram
                        id="diag-binary-auth"
                        label="Binary Authorization によるデプロイ制御とアテステーション検証フロー"
                    />

                    <p>
                        Binary
                        Authorizationはデプロイ時のセキュリティ制御で、信頼できるオーソリティ（アテスター）が事前に定義されたプロセス（脆弱性スキャン通過、承認レビュー等）を経たイメージにのみ署名（アテステーション）を許可し、その署名がない、あるいはポリシーを満たさないイメージのデプロイをGKE・Cloud
                        Runで拒否します。
                    </p>

                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        {' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            {' '}
                            <p>
                                アテステーションは全てのチェック（脆弱性スキャン、テスト、必要なレビュー）が完了した後にCIパイプラインの最後で作成する。Cloud
                                Buildで生成したイメージのみを許可する{' '}
                                <code>built-by-cloud-build</code>
                                {' '}アテスターを使うと、ビルドパイプラインを経由しないイメージのデプロイを一括で防げる。
                            </p>
                        </div>
                    </div>

                    <p>
                        <strong>出典</strong>:{' '}
                        <a href="https://docs.cloud.google.com/binary-authorization/docs/overview">
                            Binary Authorization overview
                        </a>
                        、
                        <a href="https://docs.cloud.google.com/binary-authorization/docs/key-concepts">
                            Binary Authorization concepts
                        </a>
                        、
                        <a href="https://docs.cloud.google.com/binary-authorization/docs/attestations">
                            Attestations overview
                        </a>
                    </p>

                    <hr />

                    <h3 id="13-データの保存とアクセス" tabIndex={-1}>
                        1.3 データの保存とアクセス
                    </h3>

                    <h4 id="ストレージシステムの選定" tabIndex={-1}>
                        ストレージシステムの選定
                    </h4>

                    <Diagram
                        id="diag-storage-choice"
                        label="データ要件に応じた Google Cloud ストレージ・データベース選定ツリー"
                    />

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">データストア</th>
                                    <th scope="col">データモデル</th>
                                    <th scope="col">主な用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>AlloyDB for PostgreSQL</td>
                                    <td>リレーショナル（PostgreSQL互換）</td>
                                    <td>高性能なOLTP、HTAP（トランザクション+分析）</td>
                                </tr>
                                <tr className="even">
                                    <td>Spanner</td>
                                    <td>リレーショナル（グローバル分散）</td>
                                    <td>
                                        金融台帳、グローバル在庫、99.999%可用性が必要なミッションクリティカルOLTP
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>Cloud SQL</td>
                                    <td>リレーショナル（MySQL/PostgreSQL/SQL Server）</td>
                                    <td>一般的な単一リージョンのOLTP、リフト&amp;シフト移行</td>
                                </tr>
                                <tr className="even">
                                    <td>Firestore</td>
                                    <td>ドキュメント（NoSQL）</td>
                                    <td>モバイル/Webアプリのバックエンド、リアルタイム同期</td>
                                </tr>
                                <tr className="odd">
                                    <td>Bigtable</td>
                                    <td>ワイドカラム（NoSQL）</td>
                                    <td>IoTテレメトリ、時系列データ、大規模低レイテンシ処理</td>
                                </tr>
                                <tr className="even">
                                    <td>BigQuery</td>
                                    <td>列指向（analytics）</td>
                                    <td>データウェアハウス、SQLベースの大規模分析・機械学習</td>
                                </tr>
                                <tr className="odd">
                                    <td>Memorystore</td>
                                    <td>インメモリ（Valkey/Redis。Memcachedは非推奨）</td>
                                    <td>キャッシュ、セッションストア</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p>
                        <strong>出典</strong>:{' '}
                        <a href="https://cloud.google.com/products/databases">
                            Google Cloud databases
                        </a>
                        、
                        <a href="https://cloud.google.com/blog/topics/developers-practitioners/databases-google-cloud-part-2-options-glance/">
                            Databases on Google Cloud part 2 | Google Cloud Blog
                        </a>
                    </p>

                    <h4 id="構造化非構造化データベースのスキーマ設計" tabIndex={-1}>
                        構造化・非構造化データベースのスキーマ設計
                    </h4>

                    <ul>
                        <li>
                            <strong>Spanner</strong>:
                            単調増加するキー（タイムスタンプ等）を主キーの先頭に使うと、書き込みが単一サーバーに集中する「ホットスポット」が発生する。UUID（特にランダム性の高いv4）を主キーに使う、または関連行を同じ分割（split）に配置するインターリーブ設計を検討する。
                        </li>
                        <li>
                            <strong>Bigtable</strong>:
                            行キー設計がクエリパフォーマンスを決定づける。関連データをまとめて読み書きできるようキー設計を工夫し、ホットスポットを避けるためタイムスタンプを先頭に使わない。
                        </li>
                        <li>
                            <strong>Firestore</strong>:
                            スキーマレスだが、クエリしやすくするため同種のドキュメントでは同じフィールド構成に揃える。深いネストクエリは避け、必要に応じてデータを非正規化する。複合クエリには複合インデックスが必要。
                        </li>
                    </ul>

                    <p>
                        <strong>出典</strong>:{' '}
                        <a href="https://docs.cloud.google.com/spanner/docs/schema-design">
                            Schema design best practices | Spanner
                        </a>
                        、
                        <a href="https://firebase.google.com/docs/firestore/best-practices">
                            Best practices for Cloud Firestore
                        </a>
                    </p>

                    <h4 id="結果整合性と強整合性" tabIndex={-1}>
                        結果整合性と強整合性
                    </h4>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">データストア</th>
                                    <th scope="col">整合性モデル</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Spanner</td>
                                    <td>
                                        外部整合性（External Consistency）—
                                        TrueTimeによるグローバルな強整合性、業界最高水準
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>AlloyDB / Cloud SQL</td>
                                    <td>強整合性（単一プライマリ内）。リードレプリカは結果整合性</td>
                                </tr>
                                <tr className="odd">
                                    <td>Bigtable</td>
                                    <td>
                                        シングルクラスタは強整合性、マルチクラスタ（レプリケーション時）は結果整合性がデフォルト
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>Cloud Storage</td>
                                    <td>
                                        オブジェクトの作成・上書き・削除に対して強い一貫性（strong
                                        consistency）を提供
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        {' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            {' '}
                            <p>
                                グローバルにレプリケーションされたシステムでリードレプリカを使う場合、読み取り直後の書き込み反映（read-your-writes）が必要な操作にはプライマリへの読み取りを強制する、あるいは強整合性を持つサービス（Spannerなど）へ設計を寄せる。
                            </p>
                        </div>
                    </div>

                    <h4 id="署名付きurlの作成" tabIndex={-1}>
                        署名付きURLの作成
                    </h4>

                    <p>
                        Cloud Storageの署名付きURL（Signed
                        URL）は、Googleアカウントを持たない第三者に対しても、有効期限付きで特定オブジェクトへのアクセス（GET/PUT等）を許可します。署名にはサービスアカウントの鍵を使いますが、<strong>秘密鍵をエクスポートする必要はありません</strong>。ADCで認証したうえでサービスアカウントの権限を借用（impersonate）し、IAMの{' '}
                        <code>signBlob</code>
                        {' '}で署名するキーレスな方法を優先します（前述のサービスアカウントキーを持たない方針と揃えます）。期限を過ぎるとURLは自動的に失効します。
                    </p>

                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        {' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            {' '}
                            <p>
                                有効期限はユースケースに対して可能な限り短く設定する。アップロード先バケットにはObject
                                Lifecycle
                                Managementを設定し、未完了・不要なアップロードを自動削除する。より細かいアップロード条件（サイズ、Content-Type等）を強制したい場合はSigned
                                Policy Documentを使う。
                            </p>
                        </div>
                    </div>

                    <p>
                        <strong>出典</strong>:{' '}
                        <a href="https://docs.cloud.google.com/storage/docs/lifecycle">
                            Object Lifecycle Management | Cloud Storage
                        </a>
                    </p>

                    <h4 id="bigqueryへのデータ書き込み分析aimlワークロード向け" tabIndex={-1}>
                        BigQueryへのデータ書き込み（分析・AI/MLワークロード向け）
                    </h4>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">方式</th>
                                    <th scope="col">特徴</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>バッチロード</td>
                                    <td>低コスト、レイテンシは分〜時間単位</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        レガシーストリーミング（<code>tabledata.insertAll</code>）
                                    </td>
                                    <td>後方互換のため残存、新規プロジェクトには非推奨</td>
                                </tr>
                                <tr className="odd">
                                    <td>Storage Write API（推奨）</td>
                                    <td>
                                        gRPCベース、低レイテンシ、exactly-once配信をサポート、レガシーより低コスト
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        {' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            {' '}
                            <p>
                                新規のストリーミング取り込みにはStorage Write
                                APIを使う。exactly-onceが必要な場合はコミット型ストリームとオフセットを使う。単なる運用分析でデータの一部欠損が許容できるなら、リトライ数回で諦めて後続処理（Pub/Subへの退避等）に回す設計にする。
                            </p>
                        </div>
                    </div>

                    <p>
                        <strong>出典</strong>:{' '}
                        <a href="https://docs.cloud.google.com/bigquery/docs/write-api-streaming">
                            Stream data using the Storage Write API | BigQuery
                        </a>
                        、
                        <a href="https://docs.cloud.google.com/bigquery/docs/write-api-grpc">
                            Introduction to the Storage Write API (gRPC)
                        </a>
                    </p>

                    <hr />

                    <h2 id="section2" tabIndex={-1}>
                        2. セクション2: アプリケーションのビルドとテスト（約26%）
                    </h2>

                    <h3 id="21-開発環境のセットアップ" tabIndex={-1}>
                        2.1 開発環境のセットアップ
                    </h3>

                    <h4 id="ローカル開発とエミュレーション" tabIndex={-1}>
                        ローカル開発とエミュレーション
                    </h4>

                    <p>
                        <code>gcloud</code> CLIには多くのGoogle
                        Cloudサービス（Pub/Sub、Firestore、Spanner、Bigtable等）のローカルエミュレータが同梱されており、実際のクラウドリソースを作成せずにローカルで単体テスト・統合テストが行えます。
                    </p>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">ツール</th>
                                    <th scope="col">役割</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Google Cloud コンソール</td>
                                    <td>Webベースの管理・監視UI</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        Cloud SDK（<code>gcloud</code>/<code>gsutil</code>/<code>bq</code>）
                                    </td>
                                    <td>コマンドラインからのリソース管理、エミュレータ起動</td>
                                </tr>
                                <tr className="odd">
                                    <td>Cloud Code</td>
                                    <td>
                                        VS Code/JetBrains/Cloud Shell
                                        Editor向けのIDE拡張機能。Kubernetes/Cloud
                                        Runアプリのローカルデバッグ（Skaffold統合）
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>Gemini Cloud Assist / Gemini Code Assist</td>
                                    <td>
                                        コード補完、チャットアシスタント、デプロイコマンドの提案などのAI支援
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>Cloud Shell</td>
                                    <td>ブラウザから使えるプリインストール済みのシェル環境</td>
                                </tr>
                                <tr className="even">
                                    <td>Cloud Workstations</td>
                                    <td>
                                        VPC内で動くフルマネージドの開発環境。ソースコードをローカル端末に置かないポリシーの実現や、本番同等のセキュリティ制御（VPC
                                        Service Controls等）を開発環境にも適用できる
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        {' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            {' '}
                            <p>
                                IDEにはCloud
                                SDK連携とAIコーディングアシスタント（MCPサーバー経由の拡張含む）を設定し、コンテキストスイッチを減らす。エミュレータでの単体テストを開発フローに組み込み、実クラウドリソースへの依存を最小化してからCloud
                                Buildでの統合テストに進む。
                            </p>
                        </div>
                    </div>

                    <p>
                        <strong>出典</strong>:{' '}
                        <a href="https://docs.cloud.google.com/sdk/gcloud/reference">
                            gcloud | Google Cloud SDK
                        </a>
                        、
                        <a href="https://cloud.google.com/workstations">Cloud Workstations</a>
                        、
                        <a href="https://cloud.google.com/code">Cloud Code</a>
                        、
                        <a href="https://docs.cloud.google.com/gemini/docs/codeassist/overview">
                            Gemini Code Assist Standard and Enterprise overview
                        </a>
                    </p>

                    <hr />

                    <h3 id="22-ビルド" tabIndex={-1}>
                        2.2 ビルド
                    </h3>

                    <Diagram
                        id="diag-build-pipeline"
                        label="Cloud Build によるコンテナビルド・SLSA Provenance 生成と Artifact Registry 保存フロー"
                    />

                    <p>
                        <strong>Cloud Build と Artifact Registry</strong>:
                        ソースコードからコンテナイメージをビルドし、Artifact
                        Registryに格納する一連の流れをCI基盤として構成します。ビルドステップは{' '}
                        <code>cloudbuild.yaml</code> で定義します。
                    </p>

                    <p>
                        <strong>Cloud Buildでのprovenance（来歴）設定</strong>:{' '}
                        <code>options.requestedVerifyOption: VERIFIED</code> を指定することで、Cloud
                        BuildがSLSA準拠のビルド来歴メタデータを生成し、Artifact
                        Registryのイメージに関連付けます。この来歴情報は「どのソースリポジトリの、どのコミットから、どのビルダーでビルドされたか」を検証可能にし、Binary
                        AuthorizationのSLSAチェックで「Cloud
                        Buildでビルドされたイメージのみデプロイを許可する」といったポリシーを強制する材料になります。
                    </p>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">SLSAレベル</th>
                                    <th scope="col">要件</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>レベル1</td>
                                    <td>ビルド来歴が利用可能であること</td>
                                </tr>
                                <tr className="even">
                                    <td>レベル2</td>
                                    <td>
                                        来歴データがビルドサービスにより生成され、改ざん検知（署名）が可能であること
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>レベル3</td>
                                    <td>
                                        ビルド定義のエントリポイントとユーザー制御下のパラメータも来歴に含まれること
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        {' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            {' '}
                            <p>
                                <code>requestedVerifyOption: VERIFIED</code>
                                {' '}を全てのビルドで有効化し、Binary
                                AuthorizationのSLSAチェックと組み合わせて「Cloud
                                Build以外からのイメージ」を機械的に排除する。
                            </p>
                        </div>
                    </div>

                    <p>
                        <strong>出典</strong>:{' '}
                        <a href="https://docs.cloud.google.com/build/docs/securing-builds/generate-validate-build-provenance">
                            Generate and validate build provenance | Cloud Build
                        </a>
                        、
                        <a href="https://docs.cloud.google.com/software-supply-chain-security/docs/safeguard-builds">
                            Safeguard builds | Software supply chain security
                        </a>
                        、
                        <a href="https://docs.cloud.google.com/binary-authorization/docs/cv-slsa-check">
                            Use the SLSA check | Binary Authorization
                        </a>
                        、
                        <a href="https://docs.cloud.google.com/build/docs/overview">
                            Overview of Cloud Build
                        </a>
                    </p>

                    <hr />

                    <h3 id="23-テスト" tabIndex={-1}>
                        2.3 テスト
                    </h3>

                    <h4 id="aiコーディングアシスタントによる単体テストの作成" tabIndex={-1}>
                        AIコーディングアシスタントによる単体テストの作成
                    </h4>

                    <p>
                        Gemini Code
                        Assist等のAIコーディングアシスタントは、既存コードからテストケースを自動生成し、エッジケースの網羅性を高める補助として使えます。ただし生成されたテストの妥当性（アサーションが実際に意図した振る舞いを検証しているか）は人間のレビューが必要です。
                    </p>

                    <h4 id="cloud-buildでの自動化された統合テストの実行" tabIndex={-1}>
                        Cloud Buildでの自動化された統合テストの実行
                    </h4>

                    <p>
                        <code>cloudbuild.yaml</code>
                        {' '}にテストステップを追加し、単体テスト・統合テストをビルドパイプラインの一部として自動実行します。ローカルエミュレータ（Pub/Sub、Firestore等）をCloud
                        Buildのステップ内で起動し、実クラウド環境を作らずに統合テストを完結させる構成が一般的です。
                    </p>

                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        {' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            {' '}
                            <p>
                                ビルドが失敗条件（テスト失敗）を正しく伝播するよう、各テストステップの終了コードを確認する。統合テストで実クラウドリソースを使う場合は、テスト専用プロジェクト・専用サービスアカウントを用意し本番環境から隔離する。
                            </p>
                        </div>
                    </div>

                    <hr />

                    <h2 id="section3" tabIndex={-1}>
                        3. セクション3: デプロイのためのクラウドネイティブアプリケーション構成（約19%）
                    </h2>

                    <h3 id="31-cloud-runへのアプリケーションデプロイ" tabIndex={-1}>
                        3.1 Cloud Runへのアプリケーションデプロイ
                    </h3>

                    <h4 id="ソースコードからのデプロイ" tabIndex={-1}>
                        ソースコードからのデプロイ
                    </h4>

                    <p>
                        <code>gcloud run deploy --source .</code>
                        {' '}を使うと、Dockerfileの有無に関わらずCloud Native
                        Buildpacksでソースコードから直接コンテナイメージがビルド・デプロイされます。裏側ではCloud
                        Buildが呼び出されます。
                    </p>

                    <h4 id="トリガーによるcloud-runサービスの起動" tabIndex={-1}>
                        トリガーによるCloud Runサービスの起動
                    </h4>

                    <Diagram
                        id="diag-cloud-run-trigger"
                        label="Cloud Storage / Pub/Sub / Eventarc による Cloud Run サービスのイベント起動シーケンス"
                    />

                    <p>
                        Eventarc・Pub/Subトリガーにより、ストレージイベント、Pub/Subメッセージ、Cloud
                        Audit Logsなど多様なイベントソースからCloud
                        Runサービスを起動できます。トリガーには呼び出し権限を持つサービスアカウントを関連付ける必要があります（
                        <code>roles/run.invoker</code>）。
                    </p>

                    <h4 id="イベントレシーバの構成" tabIndex={-1}>
                        イベントレシーバの構成
                    </h4>

                    <p>
                        Cloud
                        RunサービスはEventarcからのリクエストを通常のHTTPリクエストとして受け取ります。CloudEvents形式のヘッダー・ボディをパースし、イベントタイプに応じた処理を行うハンドラを実装します。
                    </p>

                    <h4 id="apiのバージョニング公開保護apigee" tabIndex={-1}>
                        APIのバージョニング・公開・保護（Apigee）
                    </h4>

                    <p>
                        Cloud
                        Run上でホストするAPIを外部公開する場合、Apigeeをフロントに配置してバージョニング（URLパスやヘッダーによる）、OAuth2/APIキーによる保護、レート制限、トラフィック変換を一元管理できます。
                    </p>

                    <p>
                        <strong>出典</strong>:{' '}
                        <a href="https://docs.cloud.google.com/eventarc/standard/docs/run/route-trigger-cloud-pubsub">
                            Route Cloud Pub/Sub events to Cloud Run | Eventarc Standard
                        </a>
                        、
                        <a href="https://docs.cloud.google.com/run/docs/triggering/trigger-with-events">
                            Create triggers with Eventarc | Cloud Run
                        </a>
                    </p>

                    <hr />

                    <h3 id="32-gkeへのコンテナデプロイ" tabIndex={-1}>
                        3.2 GKEへのコンテナデプロイ
                    </h3>

                    <h4 id="コンテナ化アプリケーションのデプロイ" tabIndex={-1}>
                        コンテナ化アプリケーションのデプロイ
                    </h4>

                    <p>
                        Deployment・Service・Ingress（またはGateway API）のマニフェストを作成し、
                        <code>kubectl apply</code>
                        {' '}またはCloud
                        Deployのようなマネージド継続的デリバリーサービスでGKEクラスタにデプロイします。
                    </p>

                    <h4 id="kubernetesヘルスチェックの実装" tabIndex={-1}>
                        Kubernetesヘルスチェックの実装
                    </h4>

                    <Diagram
                        id="diag-k8s-probes"
                        label="Startup / Liveness / Readiness プローブの判定フローとコンテナライフサイクル"
                    />

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">プローブ</th>
                                    <th scope="col">目的</th>
                                    <th scope="col">失敗時の挙動</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Startup Probe</td>
                                    <td>起動が遅いアプリの初期化完了を待つ</td>
                                    <td>
                                        成功するまでliveness/readinessを開始しない。失敗が続くとコンテナ再起動
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>Liveness Probe</td>
                                    <td>プロセスが生きている（デッドロックしていない）ことを確認</td>
                                    <td>コンテナを再起動</td>
                                </tr>
                                <tr className="odd">
                                    <td>Readiness Probe</td>
                                    <td>トラフィックを受け付けられる状態か確認</td>
                                    <td>
                                        Serviceのロードバランシング対象から一時的に除外（再起動はしない）
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        {' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            {' '}
                            <p>
                                Livenessプローブは「本当に回復不能な障害」だけを検知するよう慎重に設定する。誤検知（過度に厳しいタイムアウト等）はカスケード障害を招く。起動に時間がかかるアプリにはStartup
                                Probeを設定し、Liveness/Readinessの初期猶予時間を長く取りすぎないようにする。
                            </p>
                        </div>
                    </div>

                    <p>
                        <strong>出典</strong>:{' '}
                        <a href="https://kubernetes.io/docs/concepts/workloads/pods/probes/">
                            Liveness, Readiness, and Startup Probes | Kubernetes
                        </a>
                        、
                        <a href="https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/">
                            Configure Liveness, Readiness and Startup Probes | Kubernetes
                        </a>
                    </p>

                    <h4 id="horizontal-pod-autoscalerhpa属性の組み込み" tabIndex={-1}>
                        Horizontal Pod Autoscaler（HPA）属性の組み込み
                    </h4>

                    <p>
                        HPAはCPU使用率・メモリ使用率・カスタムメトリクス（Cloud
                        MonitoringやPub/Subのキュー長など）に基づいてPodのレプリカ数を自動的に増減します。
                    </p>

                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        {' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            {' '}
                            <ul>
                                <li>
                                    リソースリクエスト・リミットを正しく設定してからHPAのターゲット使用率を決める。
                                </li>
                                {' '}
                                <li>
                                    スパイク時に対応できるようターゲット使用率にバッファを持たせる（ただしバッファを大きくしすぎるとコスト増）。
                                </li>
                                {' '}
                                <li>
                                    アプリの起動を高速化し、Readiness/Livenessプローブを適切に設定してスケールアップ・ダウンが正しく完了するようにする。
                                </li>
                                {' '}
                                <li>
                                    クライアント側にも一時的な過負荷に備えた指数リトライを実装するよう伝える。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <p>
                        <strong>出典</strong>:{' '}
                        <a href="https://docs.cloud.google.com/architecture/best-practices-for-running-cost-effective-kubernetes-applications-on-gke">
                            Best practices for running cost-optimized Kubernetes applications on GKE
                        </a>
                    </p>

                    <hr />

                    <h2 id="section4" tabIndex={-1}>
                        4. セクション4: Google Cloudサービスとのアプリケーション統合（約22%）
                    </h2>

                    <h3 id="41-データストレージサービスとの統合" tabIndex={-1}>
                        4.1 データ・ストレージサービスとの統合
                    </h3>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">データストア</th>
                                    <th scope="col">主な接続方法</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Cloud SQL</td>
                                    <td>
                                        Cloud SQL Auth Proxy（IAM認証・mTLS）、またはCloud SQL
                                        Connectorライブラリ
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>Firestore</td>
                                    <td>
                                        クライアントライブラリ（gRPCベース）、Application Default
                                        Credentialsで認証
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>Cloud Storage</td>
                                    <td>
                                        クライアントライブラリまたはREST/XML
                                        API、署名付きURLで一時アクセスも可能
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        {' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            {' '}
                            <p>
                                本番環境ではCloud SQL Auth Proxy（またはそのGoライブラリ版であるCloud
                                SQL
                                Connector）を使い、パブリックIPの許可リスト管理やTLS証明書の手動更新を避ける。接続プーリングを適切に設定し、コネクション数の枯渇を防ぐ。
                            </p>
                        </div>
                    </div>

                    <p>
                        <strong>出典</strong>:{' '}
                        <a href="https://docs.cloud.google.com/sql/docs/mysql/sql-proxy">
                            About the Cloud SQL Auth Proxy | Cloud SQL for MySQL
                        </a>
                    </p>

                    <p>
                        <strong>メッセージングサービスを使ったpublish/consume</strong>:
                        Pub/Subのクライアントライブラリでトピックへのpublishとサブスクリプションからのconsumeを実装します。少なくとも1回配信が基本のため、コンシューマ側は冪等な処理を前提に設計します。
                    </p>

                    <hr />

                    <h3 id="42-google-cloud-apiの利用" tabIndex={-1}>
                        4.2 Google Cloud APIの利用
                    </h3>

                    <h4 id="google-cloudサービスの有効化" tabIndex={-1}>
                        Google Cloudサービスの有効化
                    </h4>

                    <p>
                        利用するAPIはプロジェクトで明示的に有効化する必要があります（
                        <code>gcloud services enable</code>
                        {' '}またはコンソール）。
                    </p>

                    <h4 id="サポートされるオプションでのapi呼び出し" tabIndex={-1}>
                        サポートされるオプションでのAPI呼び出し
                    </h4>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">手段</th>
                                    <th scope="col">特徴</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Cloud Client Libraries</td>
                                    <td>
                                        各言語向けの高レベルライブラリ。リトライ・ページネーション等が組み込み済み（推奨）
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>REST API</td>
                                    <td>
                                        HTTP/JSONで直接呼び出し。言語非依存だが自前でリトライ等を実装する必要がある場合がある
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>gRPC</td>
                                    <td>
                                        低レイテンシ・ストリーミング対応。多くのクライアントライブラリの内部実装としても使われる
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>APIエクスプローラ</td>
                                    <td>ブラウザ上でAPIを試験的に呼び出せるツール</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p>以下は呼び出し時に考慮すべき点です。</p>

                    <Diagram
                        id="diag-api-retry"
                        label="Google Cloud API 呼び出しにおける指数バックオフ・ジッター・リトライ制御フロー"
                    />

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">考慮事項</th>
                                    <th scope="col">内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>バッチ処理</td>
                                    <td>
                                        複数の操作を1回のリクエストにまとめ、APIコール数とレイテンシを削減する
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>返却データの制限</td>
                                    <td>
                                        フィールドマスク等で必要なフィールドのみ返却させ、帯域とパース時間を節約する
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>ページネーション</td>
                                    <td>
                                        <code>list</code>
                                        系メソッドの結果は必ずページングし、一度に大量データを取得しない（ショートポーリングも避ける）
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>キャッシュ</td>
                                    <td>
                                        変化が少ないデータはクライアント側でキャッシュし、APIコール自体を減らす
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>エラー処理（指数バックオフ）</td>
                                    <td>
                                        429・5xx系のエラーには、待機時間を指数的に増やしジッターを加えたリトライを実装する
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        {' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            {' '}
                            <p>
                                常にリトライループの中で指数バックオフを使い、短いポーリングではなく長時間操作（Operation）の完了待機（wait）メソッドを使う。クライアントライブラリの組み込みリトライ設定（初期遅延・最大遅延・最大試行回数）をワークロードに合わせて調整する。
                            </p>
                        </div>
                    </div>

                    <p>
                        <strong>出典</strong>:{' '}
                        <a href="https://docs.cloud.google.com/compute/docs/api/best-practices">
                            Best practices for the Compute Engine API
                        </a>
                        、
                        <a href="https://docs.cloud.google.com/storage/docs/retry-strategy">
                            Retry strategy | Cloud Storage
                        </a>
                        、
                        <a href="https://docs.cloud.google.com/memorystore/docs/redis/exponential-backoff">
                            Exponential backoff | Memorystore for Redis
                        </a>
                    </p>

                    <h4 id="サービスアカウントを使ったcloud-api呼び出し" tabIndex={-1}>
                        サービスアカウントを使ったCloud API呼び出し
                    </h4>

                    <p>
                        アプリケーションからGoogle Cloud
                        APIを呼び出す際は、専用のサービスアカウントに必要最小限のIAMロールを付与し、Application
                        Default Credentialsで自動的に認証情報を解決させます（GKEならWorkload
                        Identity、Cloud Runなら実行サービスアカウント）。
                    </p>

                    <hr />

                    <h3 id="43-トラブルシューティングとオブザーバビリティ" tabIndex={-1}>
                        4.3 トラブルシューティングとオブザーバビリティ
                    </h3>

                    <Diagram
                        id="diag-observability"
                        label="Cloud Logging / Monitoring / Trace / Error Reporting によるオブザーバビリティ統合アーキテクチャ"
                    />

                    <h4
                        id="メトリクスログトレースによるコードのインストルメンテーション"
                        tabIndex={-1}
                    >
                        メトリクス・ログ・トレースによるコードのインストルメンテーション
                    </h4>

                    <p>
                        Googleは、ベンダー固有のクライアントライブラリではなく、オープンソースでベンダーニュートラルな{' '}
                        <strong>OpenTelemetry</strong>
                        {' '}を使ったインストルメンテーションを推奨しています。ログはJSON形式で標準出力に書き出すと、Cloud
                        Loggingが構造化ログとして自動的に取り込みます。
                    </p>

                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">シグナル</th>
                                    <th scope="col">役割</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>メトリクス</td>
                                    <td>リクエストレート・エラーレートなどSLIに使える数値測定値</td>
                                </tr>
                                <tr className="even">
                                    <td>ログ</td>
                                    <td>障害・エラー・状態変化のタイムスタンプ付き記録</td>
                                </tr>
                                <tr className="odd">
                                    <td>トレース</td>
                                    <td>単一リクエストが複数サービスを通過する経路の可視化</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h4 id="問題の特定と解決google-cloud-observability" tabIndex={-1}>
                        問題の特定と解決（Google Cloud Observability）
                    </h4>

                    <p>
                        Cloud
                        Monitoringのダッシュボード・SLO監視・アラートポリシーを使い、事後対応だけでなく問題発生前の予兆検知を目指します。
                    </p>

                    <h4 id="error-reportingによるアプリケーション問題の管理" tabIndex={-1}>
                        Error Reportingによるアプリケーション問題の管理
                    </h4>

                    <p>
                        Error Reportingは Cloud Logging
                        のログエントリを解析し、似たスタックトレースを持つエラーを自動的にグルーピングします。新規エラーの発生や既知エラーの再発をリアルタイムに検知できます。
                    </p>

                    <h4 id="トレースidを使ったスパンの相関" tabIndex={-1}>
                        トレースIDを使ったスパンの相関
                    </h4>

                    <p>
                        マイクロサービス間をまたぐリクエストでは、共通のトレースIDをヘッダー（例:{' '}
                        <code>traceparent</code>）で伝播させることで、Cloud
                        Trace上で複数サービスにまたがる1つのリクエストの経路とレイテンシ内訳を可視化できます。
                    </p>

                    <h4 id="ai支援型オブザーバビリティ" tabIndex={-1}>
                        AI支援型オブザーバビリティ
                    </h4>

                    <p>
                        Gemini Cloud
                        Assistなどのアシスタント機能は、ログ・メトリクス・トレースの異常検知やインシデントの根本原因分析（RCA）候補の提示を支援します。人間のレビューを前提に、初動調査の時間短縮に活用します。
                    </p>

                    <p>
                        <strong>出典</strong>:{' '}
                        <a href="https://docs.cloud.google.com/stackdriver/docs">
                            Observability in Google Cloud
                        </a>
                        、
                        <a href="https://docs.cloud.google.com/stackdriver/docs/instrumentation/overview">
                            Instrumentation and observability
                        </a>
                        、
                        <a href="https://docs.cloud.google.com/architecture/framework/reliability/observability">
                            Detect potential failures by using observability | Cloud Architecture
                            Center
                        </a>
                    </p>

                    <h2 id="checklist" tabIndex={-1}>
                        5. 学習チェックリスト
                    </h2>

                    <div className="checklist-card">
                        <div className="checklist-header">
                            <span className="title">学習チェックリスト</span>
                            <span className="count">
                                {checkedCount} / {CHECKLIST_ITEMS.length} 完了
                            </span>
                        </div>
                        <ul>
                            {CHECKLIST_ITEMS.map((item) => {
                                const isChecked = !!checkedItems[item.id];
                                return (
                                    <li key={item.id} className={isChecked ? 'checked' : ''}>
                                        <input
                                            id={item.id}
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => toggleCheck(item.id)}
                                        />
                                        <label htmlFor={item.id}>{item.text}</label>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <h2 id="references" tabIndex={-1}>
                        6. 参考文献
                    </h2>

                    <h3 id="公式試験情報" tabIndex={-1}>
                        公式試験情報
                    </h3>

                    <div className="ref-grid">
                        <div className="ref-card">
                            <div className="num">1</div>
                            <div className="txt">
                                Professional Cloud Developer Certification exam guide (PDF).{' '}
                                <a href="https://services.google.com/fh/files/misc/professional_cloud_developer_exam_guide_english.pdf">
                                    https://services.google.com/fh/files/misc/professional_cloud_developer_exam_guide_english.pdf
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">2</div>
                            <div className="txt">
                                Professional Cloud Developer Certification | Google Cloud.{' '}
                                <a href="https://cloud.google.com/learn/certification/cloud-developer">
                                    https://cloud.google.com/learn/certification/cloud-developer
                                </a>
                            </div>
                        </div>
                    </div>

                    <h3 id="コンピューティングプラットフォーム" tabIndex={-1}>
                        コンピューティングプラットフォーム
                    </h3>

                    <div className="ref-grid">
                        <div className="ref-card">
                            <div className="num">3</div>
                            <div className="txt">
                                Where should I run my stuff? | Google Cloud Blog.{' '}
                                <a href="https://cloud.google.com/blog/topics/developers-practitioners/where-should-i-run-my-stuff-choosing-google-cloud-compute-option">
                                    https://cloud.google.com/blog/topics/developers-practitioners/where-should-i-run-my-stuff-choosing-google-cloud-compute-option
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">4</div>
                            <div className="txt">
                                Rollbacks, gradual rollouts, and traffic migration | Cloud Run.{' '}
                                <a href="https://docs.cloud.google.com/run/docs/rollouts-rollbacks-traffic-migration">
                                    https://docs.cloud.google.com/run/docs/rollouts-rollbacks-traffic-migration
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">5</div>
                            <div className="txt">
                                Manage revisions | Cloud Run.{' '}
                                <a href="https://docs.cloud.google.com/run/docs/managing/revisions">
                                    https://docs.cloud.google.com/run/docs/managing/revisions
                                </a>
                            </div>
                        </div>
                    </div>

                    <h3 id="api設計api管理" tabIndex={-1}>
                        API設計・API管理
                    </h3>

                    <div className="ref-grid">
                        <div className="ref-card">
                            <div className="num">6</div>
                            <div className="txt">
                                API Design Guide | Google Cloud.{' '}
                                <a href="https://docs.cloud.google.com/apis/design">
                                    https://docs.cloud.google.com/apis/design
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">7</div>
                            <div className="txt">
                                gRPC vs REST | Google Cloud Blog.{' '}
                                <a href="https://cloud.google.com/blog/products/api-management/understanding-grpc-openapi-and-rest-and-when-to-use-them">
                                    https://cloud.google.com/blog/products/api-management/understanding-grpc-openapi-and-rest-and-when-to-use-them
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">8</div>
                            <div className="txt">
                                About API Gateway | Google Cloud.{' '}
                                <a href="https://docs.cloud.google.com/api-gateway/docs/concepts">
                                    https://docs.cloud.google.com/api-gateway/docs/concepts
                                </a>
                            </div>
                        </div>
                    </div>

                    <h3 id="イベント駆動オーケストレーション" tabIndex={-1}>
                        イベント駆動・オーケストレーション
                    </h3>

                    <div className="ref-grid">
                        <div className="ref-card">
                            <div className="num">9</div>
                            <div className="txt">
                                Create triggers with Eventarc | Cloud Run.{' '}
                                <a href="https://docs.cloud.google.com/run/docs/triggering/trigger-with-events">
                                    https://docs.cloud.google.com/run/docs/triggering/trigger-with-events
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">10</div>
                            <div className="txt">
                                Create triggers from Pub/Sub events | Cloud Run.{' '}
                                <a href="https://docs.cloud.google.com/run/docs/triggering/pubsub-triggers">
                                    https://docs.cloud.google.com/run/docs/triggering/pubsub-triggers
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">11</div>
                            <div className="txt">
                                Route Cloud Pub/Sub events to Cloud Run | Eventarc Standard.{' '}
                                <a href="https://docs.cloud.google.com/eventarc/standard/docs/run/route-trigger-cloud-pubsub">
                                    https://docs.cloud.google.com/eventarc/standard/docs/run/route-trigger-cloud-pubsub
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">12</div>
                            <div className="txt">
                                Workflows overview.{' '}
                                <a href="https://docs.cloud.google.com/workflows/docs/overview">
                                    https://docs.cloud.google.com/workflows/docs/overview
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">13</div>
                            <div className="txt">
                                Understand Cloud Tasks.{' '}
                                <a href="https://docs.cloud.google.com/tasks/docs/dual-overview">
                                    https://docs.cloud.google.com/tasks/docs/dual-overview
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">14</div>
                            <div className="txt">
                                Cloud Scheduler documentation.{' '}
                                <a href="https://docs.cloud.google.com/scheduler/docs">
                                    https://docs.cloud.google.com/scheduler/docs
                                </a>
                            </div>
                        </div>
                    </div>

                    <h3 id="セキュリティ" tabIndex={-1}>
                        セキュリティ
                    </h3>

                    <div className="ref-grid">
                        <div className="ref-card">
                            <div className="num">15</div>
                            <div className="txt">
                                Object Lifecycle Management | Cloud Storage.{' '}
                                <a href="https://docs.cloud.google.com/storage/docs/lifecycle">
                                    https://docs.cloud.google.com/storage/docs/lifecycle
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">16</div>
                            <div className="txt">
                                Identity-Aware Proxy overview.{' '}
                                <a href="https://docs.cloud.google.com/iap/docs/concepts-overview">
                                    https://docs.cloud.google.com/iap/docs/concepts-overview
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">17</div>
                            <div className="txt">
                                Vulnerability findings | Security Command Center.{' '}
                                <a href="https://docs.cloud.google.com/security-command-center/docs/concepts-vulnerabilities-findings">
                                    https://docs.cloud.google.com/security-command-center/docs/concepts-vulnerabilities-findings
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">18</div>
                            <div className="txt">
                                Secret Manager best practices.{' '}
                                <a href="https://docs.cloud.google.com/secret-manager/docs/best-practices">
                                    https://docs.cloud.google.com/secret-manager/docs/best-practices
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">19</div>
                            <div className="txt">
                                Best practices for using Workload Identity Federation.{' '}
                                <a href="https://docs.cloud.google.com/iam/docs/best-practices-for-using-workload-identity-federation">
                                    https://docs.cloud.google.com/iam/docs/best-practices-for-using-workload-identity-federation
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">20</div>
                            <div className="txt">
                                Best practices for using service accounts securely.{' '}
                                <a href="https://docs.cloud.google.com/iam/docs/best-practices-service-accounts">
                                    https://docs.cloud.google.com/iam/docs/best-practices-service-accounts
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">21</div>
                            <div className="txt">
                                Best practices for managing service account keys.{' '}
                                <a href="https://docs.cloud.google.com/iam/docs/best-practices-for-managing-service-account-keys">
                                    https://docs.cloud.google.com/iam/docs/best-practices-for-managing-service-account-keys
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">22</div>
                            <div className="txt">
                                Binary Authorization overview.{' '}
                                <a href="https://docs.cloud.google.com/binary-authorization/docs/overview">
                                    https://docs.cloud.google.com/binary-authorization/docs/overview
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">23</div>
                            <div className="txt">
                                Binary Authorization concepts.{' '}
                                <a href="https://docs.cloud.google.com/binary-authorization/docs/key-concepts">
                                    https://docs.cloud.google.com/binary-authorization/docs/key-concepts
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">24</div>
                            <div className="txt">
                                Attestations overview | Binary Authorization.{' '}
                                <a href="https://docs.cloud.google.com/binary-authorization/docs/attestations">
                                    https://docs.cloud.google.com/binary-authorization/docs/attestations
                                </a>
                            </div>
                        </div>
                    </div>

                    <h3 id="ネットワーキング" tabIndex={-1}>
                        ネットワーキング
                    </h3>

                    <div className="ref-grid">
                        <div className="ref-card">
                            <div className="num">25</div>
                            <div className="txt">
                                Direct VPC egress with a VPC network | Cloud Run.{' '}
                                <a href="https://docs.cloud.google.com/run/docs/configuring/vpc-direct-vpc">
                                    https://docs.cloud.google.com/run/docs/configuring/vpc-direct-vpc
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">26</div>
                            <div className="txt">
                                Private networking and Cloud Run.{' '}
                                <a href="https://docs.cloud.google.com/run/docs/securing/private-networking">
                                    https://docs.cloud.google.com/run/docs/securing/private-networking
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">27</div>
                            <div className="txt">
                                Private Service Connect | VPC.{' '}
                                <a href="https://cloud.google.com/vpc/docs/private-service-connect">
                                    https://cloud.google.com/vpc/docs/private-service-connect
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">28</div>
                            <div className="txt">
                                Configure Cloud Service Mesh for Cloud Run.{' '}
                                <a href="https://docs.cloud.google.com/service-mesh/docs/configure-cloud-service-mesh-for-cloud-run">
                                    https://docs.cloud.google.com/service-mesh/docs/configure-cloud-service-mesh-for-cloud-run
                                </a>
                            </div>
                        </div>
                    </div>

                    <h3 id="データベースストレージ" tabIndex={-1}>
                        データベース・ストレージ
                    </h3>

                    <div className="ref-grid">
                        <div className="ref-card">
                            <div className="num">29</div>
                            <div className="txt">
                                Google Cloud databases.{' '}
                                <a href="https://cloud.google.com/products/databases">
                                    https://cloud.google.com/products/databases
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">30</div>
                            <div className="txt">
                                Databases on Google Cloud part 2 | Google Cloud Blog.{' '}
                                <a href="https://cloud.google.com/blog/topics/developers-practitioners/databases-google-cloud-part-2-options-glance/">
                                    https://cloud.google.com/blog/topics/developers-practitioners/databases-google-cloud-part-2-options-glance/
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">31</div>
                            <div className="txt">
                                Schema design best practices | Spanner.{' '}
                                <a href="https://docs.cloud.google.com/spanner/docs/schema-design">
                                    https://docs.cloud.google.com/spanner/docs/schema-design
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">32</div>
                            <div className="txt">
                                Best practices for Cloud Firestore.{' '}
                                <a href="https://firebase.google.com/docs/firestore/best-practices">
                                    https://firebase.google.com/docs/firestore/best-practices
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">33</div>
                            <div className="txt">
                                About the Cloud SQL Auth Proxy | Cloud SQL for MySQL.{' '}
                                <a href="https://docs.cloud.google.com/sql/docs/mysql/sql-proxy">
                                    https://docs.cloud.google.com/sql/docs/mysql/sql-proxy
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">34</div>
                            <div className="txt">
                                About the AlloyDB Auth Proxy.{' '}
                                <a href="https://docs.cloud.google.com/alloydb/docs/auth-proxy/overview">
                                    https://docs.cloud.google.com/alloydb/docs/auth-proxy/overview
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">35</div>
                            <div className="txt">
                                Stream data using the Storage Write API | BigQuery.{' '}
                                <a href="https://docs.cloud.google.com/bigquery/docs/write-api-streaming">
                                    https://docs.cloud.google.com/bigquery/docs/write-api-streaming
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">36</div>
                            <div className="txt">
                                Introduction to the Storage Write API (gRPC) | BigQuery.{' '}
                                <a href="https://docs.cloud.google.com/bigquery/docs/write-api-grpc">
                                    https://docs.cloud.google.com/bigquery/docs/write-api-grpc
                                </a>
                            </div>
                        </div>
                    </div>

                    <h3 id="開発環境ビルドテスト" tabIndex={-1}>
                        開発環境・ビルド・テスト
                    </h3>

                    <div className="ref-grid">
                        <div className="ref-card">
                            <div className="num">37</div>
                            <div className="txt">
                                gcloud | Google Cloud SDK.{' '}
                                <a href="https://docs.cloud.google.com/sdk/gcloud/reference">
                                    https://docs.cloud.google.com/sdk/gcloud/reference
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">38</div>
                            <div className="txt">
                                Cloud Workstations.{' '}
                                <a href="https://cloud.google.com/workstations">
                                    https://cloud.google.com/workstations
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">39</div>
                            <div className="txt">
                                Cloud Code.{' '}
                                <a href="https://cloud.google.com/code">
                                    https://cloud.google.com/code
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">40</div>
                            <div className="txt">
                                Gemini Code Assist Standard and Enterprise overview.{' '}
                                <a href="https://docs.cloud.google.com/gemini/docs/codeassist/overview">
                                    https://docs.cloud.google.com/gemini/docs/codeassist/overview
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">41</div>
                            <div className="txt">
                                Overview of Cloud Build.{' '}
                                <a href="https://docs.cloud.google.com/build/docs/overview">
                                    https://docs.cloud.google.com/build/docs/overview
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">42</div>
                            <div className="txt">
                                Generate and validate build provenance | Cloud Build.{' '}
                                <a href="https://docs.cloud.google.com/build/docs/securing-builds/generate-validate-build-provenance">
                                    https://docs.cloud.google.com/build/docs/securing-builds/generate-validate-build-provenance
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">43</div>
                            <div className="txt">
                                Safeguard builds | Software supply chain security.{' '}
                                <a href="https://docs.cloud.google.com/software-supply-chain-security/docs/safeguard-builds">
                                    https://docs.cloud.google.com/software-supply-chain-security/docs/safeguard-builds
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">44</div>
                            <div className="txt">
                                Use the SLSA check | Binary Authorization.{' '}
                                <a href="https://docs.cloud.google.com/binary-authorization/docs/cv-slsa-check">
                                    https://docs.cloud.google.com/binary-authorization/docs/cv-slsa-check
                                </a>
                            </div>
                        </div>
                    </div>

                    <h3 id="デプロイgke" tabIndex={-1}>
                        デプロイ・GKE
                    </h3>

                    <div className="ref-grid">
                        <div className="ref-card">
                            <div className="num">45</div>
                            <div className="txt">
                                Liveness, Readiness, and Startup Probes | Kubernetes.{' '}
                                <a href="https://kubernetes.io/docs/concepts/workloads/pods/probes/">
                                    https://kubernetes.io/docs/concepts/workloads/pods/probes/
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">46</div>
                            <div className="txt">
                                Configure Liveness, Readiness and Startup Probes | Kubernetes.{' '}
                                <a href="https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/">
                                    https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">47</div>
                            <div className="txt">
                                Best practices for running cost-optimized Kubernetes applications on
                                GKE.{' '}
                                <a href="https://docs.cloud.google.com/architecture/best-practices-for-running-cost-effective-kubernetes-applications-on-gke">
                                    https://docs.cloud.google.com/architecture/best-practices-for-running-cost-effective-kubernetes-applications-on-gke
                                </a>
                            </div>
                        </div>
                    </div>

                    <h3 id="api呼び出しオブザーバビリティ" tabIndex={-1}>
                        API呼び出し・オブザーバビリティ
                    </h3>

                    <div className="ref-grid">
                        <div className="ref-card">
                            <div className="num">48</div>
                            <div className="txt">
                                Best practices for the Compute Engine API.{' '}
                                <a href="https://docs.cloud.google.com/compute/docs/api/best-practices">
                                    https://docs.cloud.google.com/compute/docs/api/best-practices
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">49</div>
                            <div className="txt">
                                Retry strategy | Cloud Storage.{' '}
                                <a href="https://docs.cloud.google.com/storage/docs/retry-strategy">
                                    https://docs.cloud.google.com/storage/docs/retry-strategy
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">50</div>
                            <div className="txt">
                                Exponential backoff | Memorystore for Redis.{' '}
                                <a href="https://docs.cloud.google.com/memorystore/docs/redis/exponential-backoff">
                                    https://docs.cloud.google.com/memorystore/docs/redis/exponential-backoff
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">51</div>
                            <div className="txt">
                                Observability in Google Cloud.{' '}
                                <a href="https://docs.cloud.google.com/stackdriver/docs">
                                    https://docs.cloud.google.com/stackdriver/docs
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">52</div>
                            <div className="txt">
                                Instrumentation and observability.{' '}
                                <a href="https://docs.cloud.google.com/stackdriver/docs/instrumentation/overview">
                                    https://docs.cloud.google.com/stackdriver/docs/instrumentation/overview
                                </a>
                            </div>
                        </div>
                        <div className="ref-card">
                            <div className="num">53</div>
                            <div className="txt">
                                Detect potential failures by using observability | Cloud
                                Architecture Center.{' '}
                                <a href="https://docs.cloud.google.com/architecture/framework/reliability/observability">
                                    https://docs.cloud.google.com/architecture/framework/reliability/observability
                                </a>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
