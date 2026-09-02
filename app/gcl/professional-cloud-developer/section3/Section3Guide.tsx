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
            <MermaidDiagram
                chart={chart}
                ariaLabel={label}
                preserveNaturalScale
            />
        </div>
    );
});

const CHECKLIST_ITEMS = [
    {
        id: 'chk1',
        label: 'Cloud Runへのソースデプロイでは、専用のビルドサービスアカウントを--build-service-accountで指定している',
        codeText: '--build-service-account',
        beforeCode: 'Cloud Runへのソースデプロイでは、専用のビルドサービスアカウントを',
        afterCode: 'で指定している',
    },
    {
        id: 'chk2',
        label: '本番運用のCloud Runサービスは、Cloud BuildトリガーによるCI/CD経由で継続的デプロイされている',
    },
    {
        id: 'chk3',
        label: 'Cloud Runの新リビジョンは、トラフィック分割（カナリアデプロイ）で段階的に切り替えている',
    },
    {
        id: 'chk4',
        label: 'Eventarcトリガーのサービスアカウントにはroles/run.invokerが明示的に付与されている',
        codeText: 'roles/run.invoker',
        beforeCode: 'Eventarcトリガーのサービスアカウントには',
        afterCode: 'が明示的に付与されている',
    },
    {
        id: 'chk5',
        label: '対応可能な場合は、監査ログイベントより直接イベント（Direct Events）を優先している',
    },
    {
        id: 'chk6',
        label: 'イベント受信ハンドラーは、Pub/Subのat-least-once配信を前提に冪等に実装されている',
    },
    {
        id: 'chk7',
        label: 'Pub/Subにはデッドレタートピックが設定され、配信不能メッセージが退避される',
    },
    {
        id: 'chk8',
        label: 'Cloud Run上のAPIをパートナー等へ公開する際は、Apigeeをプロキシ層として配置し、バックエンドを非公開にしている',
    },
    {
        id: 'chk9',
        label: 'APIバージョニング戦略（URIパス／ヘッダー）が明確に定義され、一貫して運用されている',
    },
    {
        id: 'chk10',
        label: 'GKEのDeploymentマニフェストでは、コンテナイメージをタグではなくダイジェストで参照している',
    },
    {
        id: 'chk11',
        label: 'すべてのコンテナにCPU/メモリのリクエストとリミットが設定されている',
    },
    {
        id: 'chk12',
        label: 'Startup・Liveness・Readinessの3種類のプローブを、それぞれの役割に応じて適切に使い分けている',
    },
    {
        id: 'chk13',
        label: 'Livenessプローブは軽量に保たれ、外部依存のチェックを含んでいない',
    },
    {
        id: 'chk14',
        label: '起動に時間がかかるコンテナには、Startupプローブが設定されている',
    },
    {
        id: 'chk15',
        label: 'HorizontalPodAutoscalerにminReplicasとmaxReplicasが明示的に設定されている',
        codeText1: 'minReplicas',
        codeText2: 'maxReplicas',
        beforeCode1: 'HorizontalPodAutoscalerに',
        middleCode: 'と',
        afterCode2: 'が明示的に設定されている',
    },
    {
        id: 'chk16',
        label: 'HPAとVPAをCPU/メモリで同時に使用していない',
    },
    {
        id: 'chk17',
        label: 'behaviorフィールドで、scaleUpは迅速に、scaleDownは慎重にチューニングされている',
        codeText: 'behavior',
        beforeCode: '',
        afterCode: 'フィールドで、scaleUpは迅速に、scaleDownは慎重にチューニングされている',
    },
];

function ChecklistCard() {
    const [checkedState, setCheckedState] = useState<Record<string, boolean>>(
        {},
    );

    const toggleCheck = (id: string) => {
        setCheckedState((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const completedCount = Object.values(checkedState).filter(Boolean).length;

    return (
        <div className="checklist-card">
            <div className="checklist-header">
                <span className="title">学習チェックリスト</span>
                <span className="count">
                    {completedCount} / {CHECKLIST_ITEMS.length} 完了
                </span>
            </div>
            <ul>
                {CHECKLIST_ITEMS.map((item) => (
                    <li key={item.id}>
                        <input
                            id={item.id}
                            type="checkbox"
                            checked={Boolean(checkedState[item.id])}
                            onChange={() => toggleCheck(item.id)}
                        />
                        <label htmlFor={item.id}>
                            {item.id === 'chk1' && (
                                <>
                                    {item.beforeCode}
                                    <code>{item.codeText}</code>
                                    {item.afterCode}
                                </>
                            )}
                            {item.id === 'chk4' && (
                                <>
                                    {item.beforeCode}
                                    <code>{item.codeText}</code>
                                    {item.afterCode}
                                </>
                            )}
                            {item.id === 'chk15' && (
                                <>
                                    {item.beforeCode1}
                                    <code>{item.codeText1}</code>
                                    {item.middleCode}
                                    <code>{item.codeText2}</code>
                                    {item.afterCode2}
                                </>
                            )}
                            {item.id === 'chk17' && (
                                <>
                                    <code>{item.codeText}</code>
                                    {item.afterCode}
                                </>
                            )}
                            {item.id !== 'chk1' &&
                                item.id !== 'chk4' &&
                                item.id !== 'chk15' &&
                                item.id !== 'chk17' &&
                                item.label}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
}

/**
 * Professional Cloud Developer Section 3 ガイド本文コンポーネント
 */
export function Section3Guide() {
    return (
        <div className="pcd-section3-page">
            <div className="layout">
                <NavBar />
                <main className="main">
                    <div className="hero">
                        <div className="kicker">
                            Professional Cloud Developer · Section 3
                        </div>
                        <h1>
                            Google Cloud Professional Cloud Developer 試験ガイド
                            Section 3:
                            デプロイのためのクラウドネイティブアプリケーション構成
                        </h1>
                        <div className="meta-row">
                            <span className="pill">
                                配点 <strong>約24%</strong>
                            </span>
                            <span className="pill">
                                対象 <strong>初学者〜中級者</strong>
                            </span>
                            <span className="pill">
                                図解 <strong>Mermaid 8点</strong>
                            </span>
                            <span className="pill">
                                参考文献 <strong>7件</strong>
                            </span>
                        </div>
                    </div>

                    <p>
                        本ガイドは、Google Cloud公式の
                        <a href="https://cloud.google.com/learn/certification/cloud-developer">
                            Professional Cloud Developer認定ページ
                        </a>
                        および
                        <a href="https://services.google.com/fh/files/misc/professional_cloud_developer_exam_guide_english.pdf">
                            公式Exam Guide PDF
                        </a>
                        の
                        <strong>
                            Section 3: Configuring cloud-native applications for
                            deployment
                        </strong>
                        （試験全体の約24%を占める）に完全準拠し、初学者にもわかりやすいよう、各出題項目を1つずつステップバイステップで解説します。図解はすべてMermaidフローチャート、比較情報はすべてMarkdown表を使用し、ASCIIアートによる図解は一切使用していません。各節の末尾には根拠となる公式ドキュメントのURLを明記しています。
                    </p>

                    <h2 id="section-3-の全体像" tabIndex={-1}>
                        Section 3 の全体像
                    </h2>
                    <p>
                        Professional Cloud
                        Developer試験のSection
                        3は、「設計されたクラウドネイティブアプリケーションを、実際にどうデプロイし、稼働させるか」を問う分野です。大きく{' '}
                        <strong>3.1 Cloud Run</strong> と{' '}
                        <strong>3.2 GKE（Google Kubernetes Engine）</strong>{' '}
                        の2つのコンピューティングプラットフォームへのデプロイ手法に分かれており、それぞれ4項目・3項目、合計7つの出題トピックで構成されています。
                    </p>
                    <Diagram
                        id="diag-1"
                        label="Section 3: デプロイのためのクラウドネイティブアプリケーション構成 全体像"
                    />
                    <p>
                        このセクションを学ぶ上で重要な視点は、「
                        <strong>
                            Cloud
                            RunとGKEはどちらも“コンテナ化されたアプリケーションを動かす”という点では同じだが、デプロイの単位・トリガーの仕組み・スケーリングの制御方法がまったく異なる
                        </strong>
                        」という点です。Cloud
                        Runはフルマネージドなサーバーレスプラットフォームであり、リビジョン単位でのデプロイとトラフィック制御が中心になります。一方GKEは、Kubernetesの標準的なリソース（Deployment、Pod、Service）を自分で組み立ててデプロイし、ヘルスチェックやHPA（Horizontal
                        Pod
                        Autoscaler）も自分で明示的に設定する必要があります。この違いを意識しながら読み進めてください。
                    </p>
                    <hr />

                    <h2 id="31-cloud-runへのアプリケーションのデプロイ" tabIndex={-1}>
                        3.1 Cloud Runへのアプリケーションのデプロイ
                    </h2>

                    <h3 id="311-ソースコードからのアプリケーションのデプロイ" tabIndex={-1}>
                        3.1.1 ソースコードからのアプリケーションのデプロイ
                    </h3>
                    <h4>概要</h4>
                    <p>
                        Cloud
                        Runへアプリケーションをデプロイする方法は複数ありますが、初学者がまず押さえるべきなのは「ソースコードから直接デプロイする」方法です。これは
                        <code>gcloud run deploy --source</code>
                        という1つのコマンドで、コンテナイメージのビルドからデプロイまでを一気に行う機能です。裏側では
                        <strong>Cloud Build</strong>と
                        <strong>Buildpacks</strong>（またはソースディレクトリ内の
                        <code>Dockerfile</code>
                        ）が使われ、あなたはDockerのインストールや設定を一切行う必要がありません。
                    </p>
                    <Diagram
                        id="diag-2"
                        label="ソースコードからのアプリケーションデプロイの流れ"
                    />
                    <h4>ステップバイステップの流れ</h4>
                    <ol>
                        <li>
                            <strong>ソースディレクトリを準備する</strong>
                            ：アプリケーションのコードが置かれたディレクトリに移動します。
                            <code>Dockerfile</code>
                            があればそれが優先的に使われ、なければBuildpacksが自動的に言語を検出してビルドします。
                        </li>
                        <li>
                            <strong>デプロイコマンドを実行する</strong>：
                            <code>gcloud run deploy SERVICE --source .</code>
                            を実行すると、Cloud
                            Buildがバックグラウンドでコンテナイメージをビルドします。このとき
                            <code>gcloud builds submit</code>
                            を別途実行する必要はありません。
                        </li>
                        <li>
                            <strong>Artifact Registryへの自動保存</strong>
                            ：プロジェクトのデプロイ先リージョンに
                            <code>cloud-run-source-deploy</code>
                            という名前のArtifact
                            Registryリポジトリがまだ存在しない場合、この機能が自動的に作成します。
                        </li>
                        <li>
                            <strong>新しいリビジョンが作成される</strong>
                            ：ビルドされたイメージを使って、Cloud
                            Runサービスの新しいリビジョンが作成され、デフォルトでは100%のトラフィックがそのリビジョンにルーティングされます。
                        </li>
                    </ol>

                    <h4>知っておくべき制約</h4>
                    <p>
                        ソースからのデプロイは「利便性重視の機能」であり、ビルドを完全にカスタマイズすることはできません。より細かい制御が必要な場合（マルチステージビルドの最適化、独自のビルドパイプラインへの組み込みなど）は、
                        <code>gcloud builds submit</code>でCloud
                        Buildを直接呼び出し、
                        <code>gcloud run deploy --image</code>
                        でイメージを指定してデプロイする方式に切り替える必要があります。
                    </p>
                    <p>
                        またBuildpacksを使ったビルドでは、再現可能なビルドを実現するためにソースファイルの最終更新日時が一律で1980年1月1日に設定されます。これによりアプリケーションのフレームワークによってはブラウザ側の静的ファイルキャッシュに影響が出ることがあるため、影響を受ける場合は
                        <code>etag</code>や<code>Last-Modified</code>
                        ヘッダーを無効化することが推奨されています。
                    </p>

                    <h4>デプロイ方式の比較</h4>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">デプロイ方式</th>
                                    <th scope="col">コマンド／方法</th>
                                    <th scope="col">主な用途</th>
                                    <th scope="col">ビルドのカスタマイズ性</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>ソースからデプロイ</td>
                                    <td>
                                        <code>gcloud run deploy --source .</code>
                                    </td>
                                    <td>
                                        素早いプロトタイピング、シンプルなCI不要のデプロイ
                                    </td>
                                    <td>低い（Buildpacks/Dockerfileに依存）</td>
                                </tr>
                                <tr className="even">
                                    <td>イメージ指定デプロイ</td>
                                    <td>
                                        <code>
                                            gcloud run deploy --image IMAGE_URL
                                        </code>
                                    </td>
                                    <td>
                                        既存のCI/CDパイプラインでビルド済みイメージをデプロイ
                                    </td>
                                    <td>高い（ビルド工程を完全に制御）</td>
                                </tr>
                                <tr className="odd">
                                    <td>YAML宣言的デプロイ</td>
                                    <td>
                                        <code>
                                            gcloud run services replace
                                            service.yaml
                                        </code>
                                    </td>
                                    <td>
                                        GitOps、Infrastructure as
                                        Code、構成のバージョン管理
                                    </td>
                                    <td>高い（設定をコードとして管理）</td>
                                </tr>
                                <tr className="even">
                                    <td>コンソールからのデプロイ</td>
                                    <td>Cloud Runコンソール画面での操作</td>
                                    <td>学習目的、GUIでの一時的な設定変更</td>
                                    <td>低〜中</td>
                                </tr>
                                <tr className="odd">
                                    <td>CI/CD連携（継続的デプロイ）</td>
                                    <td>
                                        GitHub/GitLab/BitbucketとCloud
                                        Buildトリガーを連携
                                    </td>
                                    <td>
                                        mainブランチへのpushで自動ビルド・自動デプロイ
                                    </td>
                                    <td>
                                        高い（ビルド設定をトリガー側で管理）
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="practice-label">ベストプラクティス</div>
                    <ul>
                        <li>
                            <strong>
                                最小権限の原則に従い、ビルド専用のサービスアカウントを指定する
                            </strong>
                            ：デフォルトではCompute
                            Engineのデフォルトサービスアカウントが使われますが、セキュリティ姿勢を高めるために
                            <code>--build-service-account</code>
                            フラグで専用のサービスアカウントを明示的に指定することが推奨されています。このとき、指定するビルド専用サービスアカウントにはプロジェクトレベルで
                            <code>roles/run.builder</code>
                            ロールが必要で、さらにデプロイを実行するプリンシパル（ユーザーまたはCI/CDのサービスアカウント）には、そのビルド専用サービスアカウントに対する
                            <code>roles/iam.serviceAccountUser</code>
                            が必要です。いずれかの権限が欠けているとソースデプロイは失敗します。
                        </li>
                        <li>
                            <strong>
                                本番運用ではソースデプロイをCI/CDの入口として使う
                            </strong>
                            ：Cloud
                            RunコンソールUIの「継続的デプロイの設定」機能や、手動で作成するCloud
                            Buildトリガーを使えば、mainブランチへのpushをトリガーに自動でビルド・デプロイされる仕組みを構築できます。裏側の仕組みは
                            <code>--source</code>デプロイと同じBuildpacksパイプラインです。
                        </li>
                        <li>
                            <strong>
                                細かい制御が必要ならCloud Buildを直接使う
                            </strong>
                            ：ソースデプロイは便利機能であり、ビルドの完全なカスタマイズはできません。マルチステージビルドや独自のビルドステップが必要な場合は
                            <code>gcloud builds submit</code>→
                            <code>gcloud run deploy --image</code>
                            の2段階に切り替えます。
                        </li>
                        <li>
                            <strong>静的ファイルのキャッシュ挙動に注意する</strong>
                            ：Buildpacksが常に
                            <code>gcr.io/buildpacks/builder:latest</code>
                            を使う点、およびソースファイルの更新日時が固定される点を理解し、必要に応じてキャッシュ関連ヘッダーを調整します。
                        </li>
                    </ul>

                    <p>
                        <strong>出典</strong>：
                    </p>
                    <ul>
                        <li>
                            <a href="https://docs.cloud.google.com/run/docs/deploying-source-code">
                                Deploy services from source code | Cloud Run
                            </a>
                        </li>
                        <li>
                            <a href="https://docs.cloud.google.com/run/docs/configuring/services/build-service-account">
                                Set build service account (source deploy) |
                                Cloud Run
                            </a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/run">
                                Cloud Run 製品ページ
                            </a>
                        </li>
                    </ul>
                    <hr />

                    <h3
                        id="312-トリガーを使ったcloud-runサービスの呼び出しeventarcpubsub"
                        tabIndex={-1}
                    >
                        3.1.2
                        トリガーを使ったCloud Runサービスの呼び出し（Eventarc、Pub/Sub）
                    </h3>
                    <h4>概要</h4>
                    <p>
                        Cloud
                        Runサービスは、HTTPリクエストで直接呼び出すだけでなく、
                        <strong>Eventarc</strong>を経由してGoogle
                        Cloud上のさまざまなイベント（Pub/Subメッセージの発行、Cloud
                        Storageへのファイルアップロードなど）をトリガーとして自動的に呼び出すことができます。これはイベント駆動型アーキテクチャの中核をなす仕組みで、Pub/Subはその中でも最も代表的なイベントソースです。
                    </p>
                    <p>
                        Eventarcは受け取ったイベントを
                        <strong>CloudEvents形式</strong>
                        に標準化し、HTTPリクエストとしてCloud
                        Runサービスに配信します。これにより、イベントソースの種類が変わってもCloud
                        Run側の受信処理をほぼ共通化できるという利点があります。
                    </p>
                    <Diagram
                        id="diag-3"
                        label="EventarcトリガーによるCloud Run呼び出しシーケンス"
                    />
                    <h4>ステップバイステップの流れ</h4>
                    <ol>
                        <li>
                            <strong>
                                トリガーに使うサービスアカウントを用意する
                            </strong>
                            ：Eventarcトリガーは、Cloud
                            Runサービスを呼び出すためのアイデンティティとしてサービスアカウントに紐づけられます。デフォルトではCompute
                            Engineのデフォルトサービスアカウントが使われますが、独自のサービスアカウントを作成し、
                            <code>roles/run.invoker</code>
                            ロールを付与するのがベストプラクティスです。
                        </li>
                        <li>
                            <strong>Pub/Subトリガーを作成する</strong>：Cloud
                            Runサービスをデプロイした後、独立して
                            <code>gcloud eventarc triggers create</code>
                            コマンドを実行し、対象のPub/Subトピックと呼び出し先のCloud
                            Runサービスを結びつけます。既存のPub/Subトピックを使う場合は
                            <code>--transport-topic</code>
                            でそのトピックを指定します（省略した場合はEventarcが新しいトピックを作成します）。
                        </li>
                        <li>
                            <strong>イベントフィルタを指定する</strong>：
                            <code>
                                --event-filters=&quot;type=google.cloud.pubsub.topic.v1.messagePublished&quot;
                            </code>
                            のように、どの種類のイベントに反応するかを指定します。
                        </li>
                        <li>
                            <strong>
                                配信先のパスを必要に応じて指定する
                            </strong>
                            ：Cloud Runサービス内の特定のルート（例:
                            <code>/route</code>
                            ）にイベントを送りたい場合、「Service
                            URLパス」を指定できます。
                        </li>
                        <li>
                            <strong>リトライの既定値を確認する</strong>
                            ：リトライの既定動作は作成方法によって異なります。
                            <code>gcloud eventarc triggers create</code>には
                            <code>--max-retry-attempts</code>
                            のようなリトライ用フラグはなく、gcloud
                            CLIおよびコンソールのEventarcページで作成したトリガーは
                            <strong>リトライが有効</strong>
                            な状態になります。一方、Cloud
                            Runページから作成したトリガーは
                            <strong>1回だけ配信する</strong>
                            （リトライしない）のが既定です。リトライ挙動を変更したい場合は、トリガーに紐づくPub/Subサブスクリプションの再試行ポリシーを更新します。
                        </li>
                        <li>
                            <strong>トリガーの健全性を確認する</strong>
                            ：作成直後は数分程度のプロビジョニング遅延が発生することがあるため、
                            <code>gcloud eventarc triggers list</code>
                            でステータスが<code>ACTIVE</code>
                            になっているか確認します。
                        </li>
                    </ol>

                    <div className="practice-label">ベストプラクティス</div>
                    <ul>
                        <li>
                            <strong>可能な限り「直接イベント」を使う</strong>
                            ：Pub/Subのような直接イベントに対応しているGoogleプロバイダの場合、監査ログ経由のイベント（Audit
                            Log Events）よりも直接イベント（Direct
                            Events）を優先して使うことが推奨されています。直接イベントの方がレイテンシが低く、設定もシンプルです。
                        </li>
                        <li>
                            <strong>
                                認証されたトリガーには必ず
                                <code>run.invoker</code>ロールを付与する
                            </strong>
                            ：認証済みCloud
                            Runサービスに対してこのロールを付与せずにトリガーを作成すると、トリガー自体は正常に作成されて「アクティブ」になりますが、実際の呼び出しはIAM権限不足で失敗し続けます。トリガー作成時のエラーが出ないからといって安心せず、必ず権限設定を確認してください。
                        </li>
                        <li>
                            <strong>初回作成時の遅延を考慮する</strong>
                            ：プロジェクトで初めてEventarcトリガーを作成する際、Eventarcサービスエージェントのプロビジョニングに時間がかかり、権限エラーが発生することがあります。多くの場合、再度作成を試みることで解決します。
                        </li>
                    </ul>

                    <p>
                        <strong>出典</strong>：
                    </p>
                    <ul>
                        <li>
                            <a href="https://docs.cloud.google.com/run/docs/triggering/pubsub-triggers">
                                Create triggers from Pub/Sub events | Cloud Run
                            </a>
                        </li>
                        <li>
                            <a href="https://docs.cloud.google.com/run/docs/triggering/trigger-with-events">
                                Create triggers with Eventarc | Cloud Run
                            </a>
                        </li>
                        <li>
                            <a href="https://docs.cloud.google.com/eventarc/standard/docs/run/route-trigger-cloud-pubsub">
                                Route Cloud Pub/Sub events to Cloud Run |
                                Eventarc Standard
                            </a>
                        </li>
                        <li>
                            <a href="https://docs.cloud.google.com/eventarc/standard/docs/run/pubsub-authenticated">
                                Receive Pub/Sub events using an authenticated
                                Cloud Run service | Eventarc Standard
                            </a>
                        </li>
                    </ul>
                    <hr />

                    <h3 id="313-イベントレシーバーの構成eventarcpubsub" tabIndex={-1}>
                        3.1.3 イベントレシーバーの構成（Eventarc、Pub/Sub）
                    </h3>
                    <h4>概要</h4>
                    <p>
                        前項の「トリガーによる呼び出し」がイベント
                        <strong>送信側</strong>
                        （トリガー）の設定だったのに対し、この項目は、イベントを
                        <strong>受信するCloud Runサービス側</strong>
                        をどう構成するかに焦点を当てます。具体的には、Eventarcトリガー経由で受け取るのか、Pub/Subのプッシュサブスクリプションで直接受け取るのかという選択、および認証方式・リトライ・デッドレター（配信不能メッセージの退避先）の設計が中心になります。
                    </p>
                    <Diagram
                        id="diag-4"
                        label="イベントレシーバー構成の選択フロー"
                    />
                    <h4>ステップバイステップの流れ</h4>
                    <ol>
                        <li>
                            <strong>受信方式を選ぶ</strong>：Cloud
                            Storageの変更通知やFirestoreの更新など、複数の種類のイベントソースを一元的に扱いたい場合はEventarcトリガーを使うのが定石です。Pub/Subだけで完結し、なおかつ1つのHTTPエンドポイントで複数のトピックを柔軟に購読したい場合は、HTTPトリガー型の関数（またはCloud
                            Runサービス）に対してPub/Subのプッシュサブスクリプションを直接構成する方法も選択肢になります。
                        </li>
                        <li>
                            <strong>エンドポイントのパスを設計する</strong>
                            ：Eventarcトリガーでは「Service URLパス」（例:
                            <code>/</code>、<code>/route</code>、
                            <code>route/subroute</code>
                            ）を指定して、イベントの種類ごとに異なるハンドラーへ振り分けることができます。
                        </li>
                        <li>
                            <strong>認証方式を決める</strong>
                            ：認証済み呼び出しを受け付ける場合、Eventarcトリガー側のサービスアカウントに
                            <code>roles/run.invoker</code>
                            を付与する必要があります。これを怠ると、トリガーは正常に見えても呼び出しがすべて失敗します。
                            <p>
                                Pub/Subのプッシュサブスクリプションを直接構成する場合は、サブスクリプションの認証設定でOIDCトークンを使うよう指定したうえで、次のIAM権限を前提として揃えます。
                            </p>
                            <ul>
                                <li>
                                    プッシュ認証に使うサービスアカウントに、呼び出し先Cloud
                                    Runサービスに対する
                                    <code>roles/run.invoker</code>を付与する。
                                </li>
                                <li>
                                    <strong>
                                        2021年4月8日以前に作成したプロジェクト
                                    </strong>
                                    では、Pub/Subサービスエージェント（
                                    <code>
                                        service-PROJECT_NUMBER@gcp-sa-pubsub.iam.gserviceaccount.com
                                    </code>
                                    ）に対して
                                    <code>
                                        roles/iam.serviceAccountTokenCreator
                                    </code>
                                    を付与する。この日付以降に作成したプロジェクトでは自動的に付与されます。
                                </li>
                            </ul>
                        </li>
                        <li>
                            <strong>リトライとデッドレターを設計する</strong>
                            ：一時的な障害でイベント処理が失敗した場合に備え、Eventarcの「失敗時に再試行」オプションを有効にします。Pub/Sub側では、一定回数の配信失敗後にメッセージを退避させる「デッドレタートピック」を設定しておくと、メッセージの喪失を防ぎながら障害調査を効率化できます。
                        </li>
                        <li>
                            <strong>
                                受信処理を冪等（べきとう）に実装する
                            </strong>
                            ：Pub/Subは「少なくとも1回配信（at-least-once
                            delivery）」を保証する設計であるため、同じイベントが重複して届く可能性があります。受信側のハンドラーは、同じイベントを複数回処理しても結果が変わらないように（冪等に）実装することが重要です。
                        </li>
                    </ol>

                    <h4>
                        Eventarcトリガー vs
                        Pub/Subプッシュサブスクリプション直接構成の比較
                    </h4>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">観点</th>
                                    <th scope="col">Eventarcトリガー</th>
                                    <th scope="col">
                                        Pub/Subプッシュサブスクリプション直接構成
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>対応イベントソース</td>
                                    <td>
                                        Pub/Sub、Cloud
                                        Storage、Firestoreなど多数のGoogle
                                        Cloudプロバイダ
                                    </td>
                                    <td>Pub/Subのみ</td>
                                </tr>
                                <tr className="even">
                                    <td>配信フォーマット</td>
                                    <td>CloudEvents形式に標準化される</td>
                                    <td>
                                        既定のラップ形式ではJSONボディの
                                        <code>message.data</code>
                                        がBase64エンコードされる。ペイロードのラップ解除（unwrapped）を有効にすると、メッセージデータがBase64エンコードなしでそのまま送信される
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>複数トピックの一元管理</td>
                                    <td>
                                        トピックごとに個別のトリガーを作成するのが基本
                                    </td>
                                    <td>
                                        1つのHTTPエンドポイントで複数トピックを柔軟に購読可能
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>典型的な用途</td>
                                    <td>
                                        マルチソースのイベント駆動アーキテクチャ
                                    </td>
                                    <td>
                                        Pub/Sub中心でシンプルに完結させたい構成
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="practice-label">ベストプラクティス</div>
                    <ul>
                        <li>
                            <strong>受信処理は必ず冪等に実装する</strong>
                            ：at-least-once配信の特性上、重複イベントの受信は「起こりうる正常な動作」として設計に織り込みます。
                        </li>
                        <li>
                            <strong>
                                デッドレタートピックで障害調査を容易にする
                            </strong>
                            ：一定回数再試行しても処理できないメッセージを別トピックに退避させることで、本流の処理を止めずに後から原因調査ができます。
                        </li>
                        <li>
                            <strong>
                                エンドポイントのパスでイベント種別を分離する
                            </strong>
                            ：Eventarcの「Service
                            URLパス」機能を活用し、イベントソースやイベント種別ごとに異なるルートへ振り分けることで、Cloud
                            Runサービス内のルーティングロジックをシンプルに保てます。
                        </li>
                        <li>
                            <strong>
                                権限エラーを「トリガーの見た目上のアクティブ状態」で判断しない
                            </strong>
                            ：<code>run.invoker</code>
                            ロールが不足していても、トリガー自体はアクティブとして作成されるため、実際にテストイベントを発行して疎通確認を行うことが重要です。
                        </li>
                    </ul>

                    <p>
                        <strong>出典</strong>：
                    </p>
                    <ul>
                        <li>
                            <a href="https://docs.cloud.google.com/run/docs/triggering/trigger-with-events">
                                Create triggers with Eventarc | Cloud Run
                            </a>
                        </li>
                        <li>
                            <a href="https://docs.cloud.google.com/run/docs/triggering/pubsub-triggers">
                                Create triggers from Pub/Sub events | Cloud Run
                            </a>
                        </li>
                        <li>
                            <a href="https://docs.cloud.google.com/run/docs/tutorials/pubsub-eventdriven">
                                Trigger functions from Pub/Sub using Eventarc |
                                Cloud Run
                            </a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/eventarc/docs/run/create-trigger-pub-sub-gcloud">
                                Quickstart: Receive events using Pub/Sub
                                messages (Google Cloud CLI) | Eventarc Standard
                            </a>
                        </li>
                    </ul>
                    <hr />

                    <h3
                        id="314-アプリケーションにおけるapiのバージョニング公開セキュリティ確保apigee"
                        tabIndex={-1}
                    >
                        3.1.4
                        アプリケーションにおけるAPIのバージョニング・公開・セキュリティ確保（Apigee）
                    </h3>
                    <h4>概要</h4>
                    <p>
                        Cloud
                        Run上で稼働するアプリケーションのAPIを社外のパートナーや他部門に公開する場合、Cloud
                        Runを直接インターネットに公開するのではなく、
                        <strong>Apigee</strong>
                        をプロキシ（ファサード）層として前段に配置するのが一般的なベストプラクティスです。Apigeeは、認証・認可・レート制限・バージョニング・分析といったAPI管理機能を一元的に提供し、バックエンドのCloud
                        Runサービスを直接の攻撃対象から隠すことができます。
                    </p>
                    <Diagram
                        id="diag-5"
                        label="ApigeeによるCloud Run API保護アーキテクチャ"
                    />
                    <h4>ステップバイステップの流れ</h4>
                    <ol>
                        <li>
                            <strong>
                                Cloud Runサービスを非公開（認証必須）でデプロイする
                            </strong>
                            ：Cloud
                            Runサービス自体は未認証呼び出しを許可せず、Apigeeが使うサービスアカウントにのみ
                            <code>roles/run.invoker</code>を付与します。これは
                            <strong>認証（誰が呼び出せるか）</strong>
                            のレイヤーの設定です。
                            <p>
                                さらに<code>run.app</code>のURLへのアクセスを
                                <strong>ネットワークレベルで</strong>
                                制限したい場合は、これとは別に受信制御（ingress）を設定します。具体的には
                                <code>--ingress=internal</code>
                                を指定して受信元をVPC内部などに限定し、そのうえで手順6のとおり内部Application
                                Load
                                Balancer＋サーバーレスNEG＋PSCの経路を構成して、そこからのみ到達できるようにします。認証設定だけでは
                                <code>run.app</code>
                                のURLそのものはインターネット上に存在し続けるため、両方のレイヤーを揃えて初めて「外部から直接叩けない」状態になります。
                            </p>
                        </li>
                        <li>
                            <strong>
                                Apigeeプロキシを作成し、ターゲット接続先とトークンのAudienceをそれぞれ設定する
                            </strong>
                            ：ここでは
                            <strong>「どこへ接続するか（ターゲット）」</strong>と
                            <strong>
                                「どのトークンを添えるか（Audience）」
                            </strong>
                            が別々の設定である点が重要です。両者を混同すると、接続はできるのに401が返る（あるいはその逆）といった切り分けの難しい問題になります。
                            <ul>
                                <li>
                                    <strong>ターゲット接続先</strong>：Cloud Run
                                    URLへ直接接続する構成では、ターゲットにCloud
                                    RunサービスのURLをそのまま指定します。一方、PSCまたは内部Application
                                    Load
                                    Balancerを経由する構成では、ターゲットにはPSCエンドポイントのIPアドレスまたはプライベートホスト名を指定し、内部ALBが
                                    <code>Host</code>
                                    ヘッダーでルーティングする構成であれば、必要に応じて
                                    <code>Host</code>
                                    ヘッダーを明示的に設定します。
                                </li>
                                <li>
                                    <strong>トークンのAudience</strong>
                                    ：ターゲットの認証にはGoogle署名付きIDトークン（ターゲットエンドポイントの
                                    <code>&lt;Authentication&gt;</code>配下の
                                    <code>&lt;GoogleIDToken&gt;</code>
                                    ）を構成します。
                                    <code>&lt;Audience&gt;</code>
                                    には接続先のIPやホスト名ではなく、
                                    <strong>
                                        Cloud Runの<code>run.app</code>
                                        URL、または当該サービスに設定済みのカスタムaudience
                                    </strong>
                                    を指定します。Cloud Run
                                    URLへ直接接続する構成では、Audienceはそのサービスの
                                    <code>run.app</code>
                                    URLのままで問題ありません。
                                </li>
                            </ul>
                            <p>
                                あわせて、Apigeeが使うサービスアカウントには
                                <code>roles/run.invoker</code>
                                を付与します。なお、外部クライアントをOAuth
                                2.0やAPIキーで保護する話（手順4）は、このCloud
                                Runターゲット認証とは別レイヤーの設定です。
                            </p>
                        </li>
                        <li>
                            <strong>APIバージョニング戦略を決める</strong>
                            ：URIパスにバージョンを埋め込む方式（例:
                            <code>/v1/orders</code>、<code>/v2/orders</code>
                            ）と、リクエストヘッダーでバージョンを指定する方式があります。どちらを採用するかは、クライアントの実装のしやすさとキャッシュ戦略を踏まえて決定します。
                        </li>
                        <li>
                            <strong>認証・認可ポリシーを適用する</strong>
                            ：APIキー、OAuth
                            2.0、あるいはmTLS（相互TLS）など、公開範囲に応じた認証方式をApigeeのポリシーとして設定します。
                        </li>
                        <li>
                            <strong>レート制限を設定する</strong>
                            ：Quotaポリシーで長期的な利用上限を、Spike
                            Arrestポリシーで短期的な急激なトラフィックスパイクを制御し、バックエンドのCloud
                            Runサービスを保護します。
                        </li>
                        <li>
                            <strong>プライベート接続の経路を構成する</strong>
                            ：インターネットを経由させたくない場合、VPCネットワークピアリングやCloud
                            Interconnectだけではマネージドサービスである Cloud
                            Run へ直接到達できません。Apigeeランタイムから Cloud
                            Run へのプライベート経路は、次の要素を
                            <strong>
                                すべて順番につないだ1本の経路（PSCパス）
                            </strong>
                            として構成します。いずれか1つを選ぶ択一の選択肢ではありません。
                            <ol>
                                <li>
                                    <strong>
                                        Apigeeのエンドポイントアタッチメント
                                    </strong>
                                    ：Apigeeランタイムから、対向のPSCサービスアタッチメントへ接続するための出口。
                                </li>
                                <li>
                                    <strong>PSCサービスアタッチメント</strong>
                                    ：内部Application Load
                                    Balancerを、Apigee側へPSCサービスとして公開する。
                                </li>
                                <li>
                                    <strong>
                                        内部Application Load Balancer
                                    </strong>
                                    ：PSC経由で受けたリクエストをバックエンドへ振り分ける。
                                </li>
                                <li>
                                    <strong>サーバーレスNEG</strong>
                                    ：内部ALBのバックエンドとして、Cloud
                                    Runサービスを指す。
                                </li>
                                <li>
                                    <strong>Cloud Runサービス</strong>
                                    ：最終的なバックエンドAPI。
                                </li>
                            </ol>
                            <p>
                                VPCピアリングやCloud
                                Interconnectは、これとは別の
                                <strong>接続方式</strong>
                                であり、オンプレミスや他のVPCとの接続を成立させるための土台です。それ単体が
                                Cloud Run への直接経路になるわけではありません。
                            </p>
                        </li>
                    </ol>

                    <h4>セキュリティポイントの整理</h4>
                    <p>
                        Apigeeを使ったAPI保護は、「誰が」「どこで」「何を」保護するかという観点で整理すると理解しやすくなります。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">セキュリティ層</th>
                                    <th scope="col">主な保護対象</th>
                                    <th scope="col">代表的な仕組み</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>ユーザー</td>
                                    <td>エンドユーザーの認証</td>
                                    <td>OAuth 2.0、IPアドレス許可リスト</td>
                                </tr>
                                <tr className="even">
                                    <td>アプリケーション</td>
                                    <td>クライアントアプリの識別</td>
                                    <td>APIキー、OAuth 2.0、TLS</td>
                                </tr>
                                <tr className="odd">
                                    <td>開発者・パートナー</td>
                                    <td>開発者ポータルへのアクセス</td>
                                    <td>SSO（シングルサインオン）、RBAC</td>
                                </tr>
                                <tr className="even">
                                    <td>API</td>
                                    <td>APIリクエスト自体の保護</td>
                                    <td>
                                        OAuth 2.0、OpenID
                                        Connect、Quota、Spike Arrest、脅威保護
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>APIチーム（運用者）</td>
                                    <td>運用時のガバナンス</td>
                                    <td>IAM RBAC、データマスキング、監査ログ</td>
                                </tr>
                                <tr className="even">
                                    <td>バックエンド</td>
                                    <td>Cloud Runなど実処理層の保護</td>
                                    <td>
                                        プライベートネットワーキング、相互TLS、IPアドレス制御
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="practice-label">ベストプラクティス</div>
                    <ul>
                        <li>
                            <strong>
                                バックエンドのCloud
                                Runサービスは常に認証必須にする
                            </strong>
                            ：Apigeeを前段に置く意味は「バックエンドへの直接アクセスを防ぐ」ことにあるため、Cloud
                            Run側でも未認証アクセスを許可しないことが前提になります。
                        </li>
                        <li>
                            <strong>
                                サービスアカウントは最小権限で運用する
                            </strong>
                            ：Apigeeが使うサービスアカウントには、呼び出し先のCloud
                            Run<strong>サービス単位</strong>で
                            <code>roles/run.invoker</code>
                            のような最小限のロールのみを付与します。Cloud
                            RunのIAMはサービス単位で評価されるため、HTTPパス（ルート）単位の認可をIAMで表現することはできません。パスごとのアクセス制御は、Apigeeのフローやポリシー側で実装・管理します。
                        </li>
                        <li>
                            <strong>
                                シークレットは定期的にローテーションする
                            </strong>
                            ：Secret Managerや
                            CI/CDパイプラインを通じて、認証情報を四半期ごとなど定期的にローテーションする運用を組み込みます。
                        </li>
                        <li>
                            <strong>
                                機微なデータはインターネットを経由させない
                            </strong>
                            ：可能であればCloud
                            InterconnectなどによるVPCピアリングを利用し、Apigeeとバックエンドの通信をプライベートネットワーク内に閉じます。
                        </li>
                        <li>
                            <strong>APIプロキシの変更もバージョン管理する</strong>
                            ：1つのプロキシリビジョンの誤りが多数のサービスに影響しうるため、プロキシ設定自体をソースコードと同様にバージョン管理下に置きます。
                        </li>
                    </ul>

                    <p>
                        <strong>出典</strong>：
                    </p>
                    <ul>
                        <li>
                            <a href="https://cloud.google.com/architecture/best-practices-securing-applications-and-apis-using-apigee">
                                Best practices for securing your applications
                                and APIs using Apigee | Cloud Architecture
                                Center
                            </a>
                        </li>
                        <li>
                            <a href="https://docs.cloud.google.com/apigee/docs/api-security/best-practices">
                                Advanced API Security best practices | Apigee
                            </a>
                        </li>
                    </ul>
                    <hr />

                    <h2 id="32-gkeへのコンテナのデプロイ" tabIndex={-1}>
                        3.2 GKEへのコンテナのデプロイ
                    </h2>

                    <h3 id="321-コンテナ化されたアプリケーションのデプロイ" tabIndex={-1}>
                        3.2.1 コンテナ化されたアプリケーションのデプロイ
                    </h3>
                    <h4>概要</h4>
                    <p>
                        GKEでは、Cloud
                        Runのように「デプロイコマンド1つですべて完結」というわけにはいきません。コンテナイメージをビルドしてArtifact
                        Registryに保存したあと、Kubernetesの
                        <strong>Deployment</strong>
                        というリソースを自分でマニフェスト（YAMLファイル）として定義し、
                        <code>kubectl apply</code>
                        でクラスタに適用するという流れになります。DeploymentはPodの望ましい状態（レプリカ数、コンテナイメージ、更新戦略など）を宣言的に記述するリソースで、実際のPodの生成と維持はDeploymentが内部で作成する
                        <strong>ReplicaSet</strong>が担います。
                    </p>
                    <Diagram
                        id="diag-6"
                        label="GKEへのコンテナデプロイメントの流れ"
                    />
                    <h4>ステップバイステップの流れ</h4>
                    <ol>
                        <li>
                            <strong>クラスタの認証情報を取得する</strong>：
                            <code>
                                gcloud container clusters get-credentials
                                CLUSTER_NAME --location LOCATION
                            </code>
                            を実行し、<code>kubectl</code>
                            が対象のGKEクラスタを操作できるように設定します。
                        </li>
                        <li>
                            <strong>
                                コンテナイメージをビルドし、Artifact
                                Registryへpushする
                            </strong>
                            ：Dockerfileからイメージをビルドし、レジストリへ保存します。
                        </li>
                        <li>
                            <strong>Deploymentマニフェストを作成する</strong>
                            ：レプリカ数、使用するコンテナイメージ、リソースリクエスト／制限、更新戦略などをYAMLで宣言します。
                        </li>
                        <li>
                            <strong>
                                <code>kubectl apply</code>でマニフェストを適用する
                            </strong>
                            ：<code>kubectl apply -f deployment.yaml</code>
                            を実行すると、GKEがPodのスケジューリング、指定レプリカ数の維持、ローリングアップデートを自動的に行います。
                        </li>
                        <li>
                            <strong>
                                Serviceを作成してアプリケーションを公開する
                            </strong>
                            ：ClusterIP（クラスタ内部限定）、NodePort、LoadBalancer（外部公開、Google
                            Cloudのロードバランサを自動プロビジョニング）のいずれかのタイプでServiceを作成し、Podへのアクセス経路を確立します。
                        </li>
                        <li>
                            <strong>デプロイ状況を確認する</strong>：
                            <code>kubectl get pods</code>、
                            <code>kubectl get service</code>、
                            <code>kubectl rollout status deployment/NAME</code>
                            などでロールアウトの進行状況とPodの稼働状態を確認します。
                        </li>
                    </ol>

                    <h4>Cloud Buildを使った自動化（gke-deployビルダー）</h4>
                    <p>
                        Cloud BuildにはGKEへのデプロイを自動化する
                        <code>gke-deploy</code>
                        というビルダーが用意されています。これは内部的に
                        <code>kubectl</code>
                        をラップしたツールで、以下のようなGoogle推奨のベストプラクティスを自動的に適用してくれます。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">
                                        gke-deployが自動的に行うこと
                                    </th>
                                    <th scope="col">効果</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>
                                        Kubernetesリソースファイルのイメージ参照をタグからダイジェストに書き換え
                                    </td>
                                    <td>
                                        デプロイ時点のイメージが確実に固定され、タグの上書きによる予期しない変更を防ぐ
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>推奨ラベルをリソースファイルに追加</td>
                                    <td>
                                        リソースの管理・検索・監査がしやすくなる
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        デプロイ先GKEクラスタの認証情報を自動取得
                                    </td>
                                    <td>手動でのクラスタ認証設定が不要になる</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        適用したリソースがReady状態になるまで待機
                                    </td>
                                    <td>
                                        デプロイの成否をCI/CDパイプライン内で確実に検知できる
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        より細かい制御をしたい、あるいは追加機能が不要な場合は、素の
                        <code>kubectl</code>をラップしただけの
                        <code>kubectl</code>ビルダーを使うこともできます。
                    </p>

                    <div className="practice-label">ベストプラクティス</div>
                    <ul>
                        <li>
                            <strong>
                                コンテナイメージはタグではなくダイジェストで参照する
                            </strong>
                            ：<code>:latest</code>
                            のようなタグは指し示す中身が変わりうるため、本番デプロイでは
                            <code>sha256:...</code>
                            形式のダイジェストで固定し、意図しないイメージの入れ替わりを防ぎます。
                        </li>
                        <li>
                            <strong>
                                リソースリクエストとリミットを必ず設定する
                            </strong>
                            ：CPU・メモリのリクエスト（最低保証）とリミット（上限）を設定することで、ノードのリソースを公平に配分し、他のワークロードへの影響を抑えます。
                        </li>
                        <li>
                            <strong>
                                名前空間（Namespace）でリソースを分離する
                            </strong>
                            ：環境（開発・ステージング・本番）やチームごとにNamespaceを分けることで、リソースクォータの適用やアクセス制御がしやすくなります。
                        </li>
                        <li>
                            <strong>
                                ローリングアップデート戦略を明示的に調整する
                            </strong>
                            ：<code>maxSurge</code>（同時に追加できるPod数）と
                            <code>maxUnavailable</code>
                            （同時に停止してよいPod数）を、アプリケーションの特性（起動時間、瞬断への耐性）に応じてチューニングします。
                        </li>
                        <li>
                            <strong>
                                Workload
                                Identityを使ってGoogle Cloud APIへ安全にアクセスする
                            </strong>
                            ：Podに直接サービスアカウントキーを配置するのではなく、Workload
                            Identityを使ってKubernetesのサービスアカウントとGoogle
                            CloudのIAMサービスアカウントを紐付け、鍵の管理負担とリークリスクを減らします。
                        </li>
                        <li>
                            <strong>
                                ConfigMapとSecretで設定と機密情報をイメージから分離する
                            </strong>
                            ：設定値や認証情報をコンテナイメージに埋め込まず、ConfigMap／Secretとして外部から注入することで、環境ごとの差し替えが容易になり、イメージの再利用性も高まります。
                        </li>
                    </ul>

                    <p>
                        <strong>出典</strong>：
                    </p>
                    <ul>
                        <li>
                            <a href="https://cloud.google.com/kubernetes-engine/docs/deploy-app-cluster">
                                Quickstart: Deploy an app to a GKE cluster |
                                Google Kubernetes Engine (GKE)
                            </a>
                        </li>
                        <li>
                            <a href="https://docs.cloud.google.com/build/docs/deploying-builds/deploy-gke">
                                Deploying to GKE | Cloud Build
                            </a>
                        </li>
                    </ul>
                    <hr />

                    <h3
                        id="322-アプリケーションの可用性を高めるkubernetesヘルスチェックの実装"
                        tabIndex={-1}
                    >
                        3.2.2
                        アプリケーションの可用性を高めるKubernetesヘルスチェックの実装
                    </h3>
                    <h4>概要</h4>
                    <p>
                        GKE（Kubernetes）には、コンテナの健全性を継続的にチェックする「プローブ」という仕組みがあり、
                        <strong>Startup（起動）プローブ</strong>・
                        <strong>Liveness（生存）プローブ</strong>・
                        <strong>Readiness（準備完了）プローブ</strong>
                        の3種類があります。この3つは似ているようで役割がまったく異なり、正しく使い分けることがアプリケーションの可用性を大きく左右します。
                    </p>
                    <Diagram
                        id="diag-7"
                        label="Kubernetesプローブ（Startup / Liveness / Readiness）のライフサイクル"
                    />
                    <h4>3つのプローブの役割</h4>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">プローブ種別</th>
                                    <th scope="col">答える質問</th>
                                    <th scope="col">失敗したときの挙動</th>
                                    <th scope="col">典型的な用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Startupプローブ</td>
                                    <td>
                                        「アプリケーションの起動処理は完了したか？」
                                    </td>
                                    <td>
                                        コンテナがkillされ、再起動ポリシーに従って再起動される
                                    </td>
                                    <td>
                                        起動に時間がかかるアプリ（大きな設定ファイルの読み込み、キャッシュのウォームアップなど）
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>Livenessプローブ</td>
                                    <td>
                                        「このプロセスはまだ正常に動作しているか（デッドロックしていないか）？」
                                    </td>
                                    <td>コンテナがkillされ、再起動される</td>
                                    <td>
                                        デッドロックや無限ループなど、プロセス自身では検知・復旧できない障害からの自己修復
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>Readinessプローブ</td>
                                    <td>
                                        「このインスタンスは今トラフィックを処理できる状態か？」
                                    </td>
                                    <td>
                                        Podがサービスのエンドポイントから一時的に除外され、トラフィックが送られなくなる（再起動はしない）
                                    </td>
                                    <td>
                                        起動時の初期化処理、依存する外部サービス（データベースなど）が一時的に利用できない場合の保護
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h4>ステップバイステップの流れ</h4>
                    <ol>
                        <li>
                            <strong>各プローブ専用のエンドポイントを用意する</strong>
                            ：<code>/healthz</code>
                            （Liveness用、プロセスが生きているかだけを軽量にチェック）と
                            <code>/ready</code>
                            （Readiness用、データベースやキャッシュなど依存サービスへの接続も含めてチェック）のように、目的別に異なるエンドポイントを実装することが推奨されます。同じエンドポイントを使い回す場合でも、Livenessの方は
                            <code>failureThreshold</code>
                            を高めに設定し、「先にトラフィックから外し、それでもダメなら再起動する」という段階的な挙動にするのが一般的です。
                        </li>
                        <li>
                            <strong>チェック方式（メカニズム）を選ぶ</strong>：
                            <code>httpGet</code>（HTTP
                            GETリクエストを送り、ステータスコード200〜399なら成功）、
                            <code>tcpSocket</code>
                            （指定ポートへのTCP接続が確立できれば成功）、
                            <code>exec</code>
                            （コンテナ内でコマンドを実行し、終了コード0なら成功）、
                            <code>grpc</code>
                            （gRPCヘルスチェックプロトコルに準拠したサーバーへの呼び出し）の4種類から、アプリケーションの実装に合ったものを選びます。
                        </li>
                        <li>
                            <strong>
                                起動に時間がかかる場合はStartupプローブを追加する
                            </strong>
                            ：もしコンテナの起動が「
                            <code>
                                initialDelaySeconds + failureThreshold ×
                                periodSeconds
                            </code>
                            」よりも長くかかる可能性がある場合は、Livenessプローブと同じエンドポイントをチェックするStartupプローブを追加し、
                            <code>failureThreshold</code>
                            を大きめに設定します。Startupプローブが成功するまでは、LivenessとReadinessのプローブは実行されません。
                        </li>
                        <li>
                            <strong>タイミングパラメータをチューニングする</strong>
                            ：<code>initialDelaySeconds</code>
                            （プローブ開始までの待機秒数）、
                            <code>periodSeconds</code>（チェック間隔）、
                            <code>timeoutSeconds</code>（タイムアウト秒数）、
                            <code>successThreshold</code>
                            （連続何回成功したら健全とみなすか）、
                            <code>failureThreshold</code>
                            （連続何回失敗したら異常とみなすか）を、アプリケーションの特性に合わせて設定します。
                        </li>
                        <li>
                            <strong>
                                依存関係のチェックにはタイムアウトを必ず設定する
                            </strong>
                            ：Readinessプローブ内でデータベース接続などをチェックする場合、そのチェック自体がハングするとプローブ全体がタイムアウトするまで応答が返らず、意図しない挙動につながります。依存先の呼び出しには必ず個別のタイムアウトを設定します。
                        </li>
                    </ol>

                    <h4>プローブの主要な設定フィールド</h4>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">フィールド</th>
                                    <th scope="col">意味</th>
                                    <th scope="col">デフォルト値</th>
                                    <th scope="col">最小値</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>
                                        <code>initialDelaySeconds</code>
                                    </td>
                                    <td>
                                        コンテナ起動後、プローブを開始するまでの待機秒数
                                    </td>
                                    <td>0秒</td>
                                    <td>0</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>periodSeconds</code>
                                    </td>
                                    <td>プローブを実行する間隔</td>
                                    <td>10秒</td>
                                    <td>1</td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>timeoutSeconds</code>
                                    </td>
                                    <td>プローブがタイムアウトするまでの秒数</td>
                                    <td>1秒</td>
                                    <td>1</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>successThreshold</code>
                                    </td>
                                    <td>
                                        失敗状態から健全と判定するまでに必要な連続成功回数
                                    </td>
                                    <td>1（Liveness/Startupは1固定）</td>
                                    <td>1</td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>failureThreshold</code>
                                    </td>
                                    <td>
                                        異常と判定するまでに必要な連続失敗回数
                                    </td>
                                    <td>3</td>
                                    <td>1</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h4>GKEにおける重要な変更点（バージョン1.35以降）</h4>
                    <p>
                        GKEバージョン1.35以降では、<code>exec</code>
                        プローブのコマンドに対しても<code>timeoutSeconds</code>
                        が強制的に適用されるようになりました。1.35より前のバージョンでは
                        <code>exec</code>プローブの<code>timeoutSeconds</code>
                        は事実上無視されていましたが、1.35以降ではタイムアウトした場合、Livenessプローブは失敗としてコンテナが再起動され、Readinessプローブは失敗としてPodがサービスのエンドポイントから除外されるようになります。既存の
                        <code>exec</code>
                        プローブを使っている場合は、アップグレード前にタイムアウト値が実際のコマンド実行時間に対して十分かを確認する必要があります。
                    </p>

                    <div className="practice-label">ベストプラクティス</div>
                    <ul>
                        <li>
                            <strong>
                                LivenessプローブとReadinessプローブの役割を混同しない
                            </strong>
                            ：同じエンドポイントを使い回すこと自体は問題ありませんが、「プロセスが生きているか」と「トラフィックを処理できる状態か」は別の問いであることを常に意識します。Readinessプローブの中でLivenessと同じ重いチェック（外部依存の確認など）を行うのは適切ですが、Livenessプローブの中で外部依存をチェックすると、依存サービスの一時的な障害がコンテナの無限再起動（CrashLoopBackOff）を引き起こす危険があります。
                        </li>
                        <li>
                            <strong>Livenessプローブは軽量に保つ</strong>
                            ：デッドロックのような「本当に回復不能な状態」だけを検知する目的に絞り、CPUやメモリを多く消費する重い処理はLivenessプローブに含めません。
                        </li>
                        <li>
                            <strong>
                                <code>exec</code>プローブの多用に注意する
                            </strong>
                            ：<code>exec</code>
                            プローブはチェックのたびにプロセスをfork/execするため、Pod密度の高いクラスタや短い実行間隔で使うとノードのCPUに負荷をかけることがあります。可能であれば
                            <code>httpGet</code>や<code>tcpSocket</code>
                            を優先します。
                        </li>
                        <li>
                            <strong>
                                起動が遅いアプリケーションには必ずStartupプローブを追加する
                            </strong>
                            ：Startupプローブがないと、起動に時間がかかるアプリケーションがLivenessプローブによって起動途中で誤って再起動され続ける「起動ループ」に陥る危険があります。
                        </li>
                        <li>
                            <strong>プローブ専用のポートを検討する</strong>
                            ：アプリケーション本体が高負荷になっている場合、通常のリクエストと同じポートでヘルスチェックを受けると、ヘルスチェック自体が実リクエストの陰に隠れてタイムアウトすることがあります。軽量なヘルスチェック用のサーバーを別ポートで立てることも選択肢です。
                        </li>
                    </ul>

                    <p>
                        <strong>出典</strong>：
                    </p>
                    <ul>
                        <li>
                            <a href="https://kubernetes.io/docs/concepts/workloads/pods/probes/">
                                Liveness, Readiness, and Startup Probes |
                                Kubernetes 公式ドキュメント
                            </a>
                        </li>
                        <li>
                            <a href="https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/">
                                Configure Liveness, Readiness and Startup
                                Probes | Kubernetes 公式ドキュメント
                            </a>
                        </li>
                        <li>
                            <a href="https://docs.cloud.google.com/kubernetes-engine/docs/deprecations/exec-probe-timeouts">
                                Configure exec probe timeouts before upgrading
                                to GKE version 1.35 | Google Kubernetes Engine
                                (GKE)
                            </a>
                        </li>
                    </ul>
                    <hr />

                    <h3
                        id="323-horizontal-pod-autoscaler属性スケーリングメトリクスの組み込み"
                        tabIndex={-1}
                    >
                        3.2.3 Horizontal Pod
                        Autoscaler属性（スケーリング、メトリクス）の組み込み
                    </h3>
                    <h4>概要</h4>
                    <p>
                        <strong>Horizontal Pod Autoscaler</strong>
                        （HPA）は、CPU使用率やメモリ使用率、あるいはカスタムメトリクス（1秒あたりのリクエスト数など）に応じて、Deploymentが管理するPodのレプリカ数を自動的に増減させる仕組みです。GKEでは、ノード自体を増減させる「Cluster
                        Autoscaler」と組み合わせて使うことで、Pod数とノード数の両方を負荷に応じて自動調整できます。
                    </p>
                    <Diagram
                        id="diag-8"
                        label="Horizontal Pod Autoscaler（HPA）のスケーリング制御ループ"
                    />
                    <h4>ステップバイステップの流れ</h4>
                    <ol>
                        <li>
                            <strong>スケーリング対象を指定する</strong>
                            ：HPAはDeployment（あるいはReplicaSet、StatefulSetなど）を
                            <code>scaleTargetRef</code>
                            で参照し、そのレプリカ数を制御します。
                        </li>
                        <li>
                            <strong>最小・最大レプリカ数を設定する</strong>：
                            <code>minReplicas</code>はスケーリングの下限、
                            <code>maxReplicas</code>
                            はスケーリングの上限（レプリカ数がこれを超えないという上限値）です。
                            <code>autoscaling/v2</code>では
                            <code>spec.maxReplicas</code>は
                            <strong>必須フィールド</strong>
                            であり、省略するとAPIのバリデーションで拒否されるため、「上限を設定しなければ無制限にスケールする」という状態は存在しません。
                            <code>maxReplicas</code>には<code>minReplicas</code>
                            以上の値を指定する必要があり、実運用では想定ピークを賄える値でありながら、予期しない急激なトラフィック増加時にコストが際限なく膨らまない値を選ぶことが重要です。
                        </li>
                        <li>
                            <strong>
                                スケーリングの基準となるメトリクスを選ぶ
                            </strong>
                            ：CPU・メモリ使用率だけでなく、Kubernetesオブジェクトから得られるカスタムメトリクス（Podsメトリクス、Objectメトリクス）や、Cloud
                            Monitoringなどクラスタ外部のメトリクス（Externalメトリクス）も利用できます。
                        </li>
                        <li>
                            <strong>目標値（ターゲット）を設定する</strong>
                            ：CPU使用率であれば「70%」のように、パーセンテージまたは絶対値で目標を指定します。
                        </li>
                        <li>
                            <strong>
                                スケーリングの挙動（behavior）を必要に応じて調整する
                            </strong>
                            ：<code>autoscaling/v2</code>
                            APIでは、<code>behavior</code>
                            フィールドを使ってscaleUp（増加）とscaleDown（減少）それぞれの速度や安定化ウィンドウを細かく制御できます。
                        </li>
                        <li>
                            <strong>
                                Vertical Pod Autoscalerとの併用ルールを確認する
                            </strong>
                            ：CPUまたはメモリに関しては、HPAとVertical Pod
                            Autoscaler（VPA）を同時に使わないことが推奨されています。両者が同じメトリクスに基づいて競合する調整を行おうとするためです。CPU・メモリ以外のメトリクスであれば、HPAとVPAを併用することも可能です。
                        </li>
                    </ol>

                    <h4>メトリクスタイプの比較</h4>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">メトリクスタイプ</th>
                                    <th scope="col">説明</th>
                                    <th scope="col">使用例</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Resource</td>
                                    <td>
                                        Podが要求するリソース（CPU/メモリ）の実際の使用量。パーセンテージまたは絶対値で指定可能
                                    </td>
                                    <td>
                                        CPU使用率が70%を超えたらスケールアウト
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>Pods</td>
                                    <td>
                                        Kubernetesオブジェクトから報告される、Pod単位のカスタムメトリクスの平均値
                                    </td>
                                    <td>Pod1台あたりのリクエストキューの深さ</td>
                                </tr>
                                <tr className="odd">
                                    <td>Object</td>
                                    <td>
                                        特定の単一Kubernetesオブジェクトに紐づくメトリクス
                                    </td>
                                    <td>
                                        Ingressオブジェクトのリクエストレート
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>External</td>
                                    <td>
                                        クラスタ外部のアプリケーションやサービス由来のメトリクス
                                    </td>
                                    <td>
                                        Cloud
                                        Monitoring上のPub/Subキューのバックログ長
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h4>スケーリング挙動（behavior）のチューニング例</h4>
                    <p>
                        <code>stabilizationWindowSeconds</code>
                        は、直近のウィンドウ期間内で計算された「望ましいレプリカ数」の履歴を参照することで、メトリクスの一時的な揺らぎによるレプリカ数の頻繁な増減（フラッピング）を防ぐ仕組みです。どの値を採用するかはスケール方向で異なり、
                        <strong>
                            スケールダウン（<code>scaleDown</code>
                            ）ではウィンドウ内の最大値
                        </strong>
                        を、
                        <strong>
                            スケールアップ（<code>scaleUp</code>
                            ）でウィンドウを設定した場合はウィンドウ内の最小値
                        </strong>
                        を採用します。デフォルトでは、スケールダウンに300秒（5分）のウィンドウが適用され、スケールアップはウィンドウなし（0秒＝即座に反映）が既定値です。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">設定項目</th>
                                    <th scope="col">役割</th>
                                    <th scope="col">デフォルト値の挙動</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>
                                        <code>
                                            scaleUp.stabilizationWindowSeconds
                                        </code>
                                    </td>
                                    <td>
                                        スケールアップ判断を安定させるための遡及期間
                                    </td>
                                    <td>
                                        0秒（安定化なし、即座にスケールアップ）。設定した場合はウィンドウ内の
                                        <strong>最小</strong>推奨値を採用
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>
                                            scaleDown.stabilizationWindowSeconds
                                        </code>
                                    </td>
                                    <td>
                                        スケールダウン判断を安定させるための遡及期間
                                    </td>
                                    <td>
                                        300秒（過去5分間の
                                        <strong>最大</strong>推奨値を採用）
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>policies[].type: Pods</code>
                                    </td>
                                    <td>
                                        一定期間あたりに増減できるPod数の絶対値を制限
                                    </td>
                                    <td>—</td>
                                </tr>
                                <tr className="even">
                                    <td>
                                        <code>policies[].type: Percent</code>
                                    </td>
                                    <td>
                                        一定期間あたりに増減できる割合（%）を制限
                                    </td>
                                    <td>—</td>
                                </tr>
                                <tr className="odd">
                                    <td>
                                        <code>selectPolicy</code>
                                    </td>
                                    <td>
                                        複数のポリシーが該当する場合にどちらを採用するか（
                                        <code>Max</code>/<code>Min</code>/
                                        <code>Disabled</code>）
                                    </td>
                                    <td>
                                        <code>Max</code>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="practice-label">ベストプラクティス</div>
                    <ul>
                        <li>
                            <strong>
                                CPU使用率の目標値は70%前後を基準に検討する
                            </strong>
                            ：50%のような低い目標値を設定すると、常に大きな余剰キャパシティを確保することになりコストが増大する一方、パフォーマンスへの影響は限定的であるという知見があります。ワークロードの特性に応じて、コストとレイテンシのバランスが取れる目標値を検証しながら決定します。
                        </li>
                        <li>
                            <strong>
                                HPAとVPAをCPU/メモリで同時に使わない
                            </strong>
                            ：両者が競合するため、CPU/メモリのスケーリングはHPAに任せ、VPAはCPU/メモリ以外のリソース調整、またはHPAと組み合わせない単独運用にとどめます。
                        </li>
                        <li>
                            <strong>
                                スケールアップは素早く、スケールダウンは慎重に設定する
                            </strong>
                            ：トラフィックの急増には迅速に追従しつつ、一時的な低下ですぐにスケールダウンしてしまうと、直後の再スパイクで再度スケールアップが必要になり非効率です。
                            <code>scaleUp</code>
                            は短い安定化ウィンドウ（またはウィンドウなし）、
                            <code>scaleDown</code>
                            は数分単位の安定化ウィンドウを設定するのが典型的なパターンです。
                        </li>
                        <li>
                            <strong>
                                最大レプリカ数を必ず設定し、コストの上限を意識する
                            </strong>
                            ：<code>maxReplicas</code>
                            を適切に設定しないと、異常なトラフィック増加やバグによって際限なくPodが増加し、クラスタ全体のコストとノードリソースを圧迫するリスクがあります。
                        </li>
                        <li>
                            <strong>
                                CPU以外の指標が適切なワークロードにはカスタムメトリクスを検討する
                            </strong>
                            ：ネットワークI/Oやキューの深さがボトルネックになるワークロードでは、CPU使用率よりもPodsメトリクスやExternalメトリクスの方がスケーリングの精度が高くなる場合があります。
                        </li>
                    </ul>

                    <p>
                        <strong>出典</strong>：
                    </p>
                    <ul>
                        <li>
                            <a href="https://docs.cloud.google.com/kubernetes-engine/docs/concepts/horizontalpodautoscaler">
                                Horizontal Pod autoscaling | Google Kubernetes
                                Engine (GKE)
                            </a>
                        </li>
                        <li>
                            <a href="https://docs.cloud.google.com/architecture/best-practices-for-running-cost-effective-kubernetes-applications-on-gke">
                                Best practices for running cost-optimized
                                Kubernetes applications on GKE | Cloud
                                Architecture Center
                            </a>
                        </li>
                        <li>
                            <a href="https://cloud.google.com/blog/products/containers-kubernetes/tuning-the-kubernetes-hpa-in-gke">
                                Tuning the Kubernetes HPA in GKE | Google Cloud
                                Blog
                            </a>
                        </li>
                        <li>
                            <a href="https://v1-32.docs.kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/">
                                Horizontal Pod Autoscaling | Kubernetes
                                公式ドキュメント
                            </a>
                        </li>
                        <li>
                            <a href="https://docs.cloud.google.com/kubernetes-engine/docs/concepts/verticalpodautoscaler">
                                Vertical Pod autoscaling | Google Kubernetes
                                Engine (GKE)
                            </a>
                        </li>
                    </ul>
                    <hr />

                    <h2 id="section-3-ベストプラクティス-チェックリスト" tabIndex={-1}>
                        Section 3 ベストプラクティス チェックリスト
                    </h2>
                    <ChecklistCard />
                    <hr />

                    <h2 id="参考文献" tabIndex={-1}>
                        参考文献
                    </h2>
                    <div className="ref-grid">
                        <div className="ref-card" id="ref1">
                            <div className="num">1</div>
                            <div className="txt">
                                <strong>
                                    Cloud Run — デプロイとイベント統合
                                </strong>
                                <br />
                                <a href="https://docs.cloud.google.com/run/docs/deploying-source-code">
                                    Deploy services from source code | Cloud Run
                                </a>
                                — Google Cloud
                                <br />
                                <a href="https://docs.cloud.google.com/run/docs/configuring/services/build-service-account">
                                    Set build service account (source deploy) |
                                    Cloud Run
                                </a>
                                — Google Cloud
                                <br />
                                <a href="https://cloud.google.com/run">
                                    Cloud Run 製品ページ
                                </a>{' '}
                                — Google Cloud
                                <br />
                                <a href="https://docs.cloud.google.com/run/docs/rollouts-rollbacks-traffic-migration">
                                    Rollbacks, gradual rollouts, and traffic
                                    migration | Cloud Run
                                </a>
                                — Google Cloud
                                <br />
                                <a href="https://docs.cloud.google.com/run/docs/triggering/pubsub-triggers">
                                    Create triggers from Pub/Sub events | Cloud
                                    Run
                                </a>
                                — Google Cloud
                                <br />
                                <a href="https://docs.cloud.google.com/run/docs/triggering/trigger-with-events">
                                    Create triggers with Eventarc | Cloud Run
                                </a>
                                — Google Cloud
                                <br />
                                <a href="https://docs.cloud.google.com/run/docs/tutorials/pubsub-eventdriven">
                                    Trigger functions from Pub/Sub using
                                    Eventarc | Cloud Run
                                </a>
                                — Google Cloud
                            </div>
                        </div>
                        <div className="ref-card" id="ref2">
                            <div className="num">2</div>
                            <div className="txt">
                                <strong>
                                    Eventarc — イベント駆動アーキテクチャ
                                </strong>
                                <br />
                                <a href="https://docs.cloud.google.com/eventarc/standard/docs/run/route-trigger-cloud-pubsub">
                                    Route Cloud Pub/Sub events to Cloud Run |
                                    Eventarc Standard
                                </a>
                                — Google Cloud
                                <br />
                                <a href="https://docs.cloud.google.com/eventarc/standard/docs/run/pubsub-authenticated">
                                    Receive Pub/Sub events using an
                                    authenticated Cloud Run service | Eventarc
                                    Standard
                                </a>
                                — Google Cloud
                                <br />
                                <a href="https://cloud.google.com/eventarc/docs/run/create-trigger-pub-sub-gcloud">
                                    Quickstart: Receive events using Pub/Sub
                                    messages (Google Cloud CLI) | Eventarc
                                    Standard
                                </a>
                                — Google Cloud
                            </div>
                        </div>
                        <div className="ref-card" id="ref3">
                            <div className="num">3</div>
                            <div className="txt">
                                <strong>
                                    Apigee — API管理とセキュリティ
                                </strong>
                                <br />
                                <a href="https://cloud.google.com/architecture/best-practices-securing-applications-and-apis-using-apigee">
                                    Best practices for securing your
                                    applications and APIs using Apigee | Cloud
                                    Architecture Center
                                </a>
                                — Google Cloud
                                <br />
                                <a href="https://docs.cloud.google.com/apigee/docs/api-security/best-practices">
                                    Advanced API Security best practices |
                                    Apigee
                                </a>
                                — Google Cloud
                            </div>
                        </div>
                        <div className="ref-card" id="ref4">
                            <div className="num">4</div>
                            <div className="txt">
                                <strong>
                                    GKE — デプロイとワークロード管理
                                </strong>
                                <br />
                                <a href="https://cloud.google.com/kubernetes-engine/docs/deploy-app-cluster">
                                    Quickstart: Deploy an app to a GKE cluster |
                                    Google Kubernetes Engine (GKE)
                                </a>
                                — Google Cloud
                                <br />
                                <a href="https://docs.cloud.google.com/build/docs/deploying-builds/deploy-gke">
                                    Deploying to GKE | Cloud Build
                                </a>
                                — Google Cloud
                            </div>
                        </div>
                        <div className="ref-card" id="ref5">
                            <div className="num">5</div>
                            <div className="txt">
                                <strong>
                                    Kubernetesヘルスチェック（プローブ）
                                </strong>
                                <br />
                                <a href="https://kubernetes.io/docs/concepts/workloads/pods/probes/">
                                    Liveness, Readiness, and Startup Probes |
                                    Kubernetes 公式ドキュメント
                                </a>
                                — The Kubernetes Authors
                                <br />
                                <a href="https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/">
                                    Configure Liveness, Readiness and Startup
                                    Probes | Kubernetes 公式ドキュメント
                                </a>
                                — The Kubernetes Authors
                                <br />
                                <a href="https://docs.cloud.google.com/kubernetes-engine/docs/deprecations/exec-probe-timeouts">
                                    Configure exec probe timeouts before
                                    upgrading to GKE version 1.35 | Google
                                    Kubernetes Engine (GKE)
                                </a>
                                — Google Cloud
                            </div>
                        </div>
                        <div className="ref-card" id="ref6">
                            <div className="num">6</div>
                            <div className="txt">
                                <strong>
                                    Horizontal Pod Autoscaler（HPA）
                                </strong>
                                <br />
                                <a href="https://docs.cloud.google.com/kubernetes-engine/docs/concepts/horizontalpodautoscaler">
                                    Horizontal Pod autoscaling | Google
                                    Kubernetes Engine (GKE)
                                </a>
                                — Google Cloud
                                <br />
                                <a href="https://docs.cloud.google.com/kubernetes-engine/docs/concepts/verticalpodautoscaler">
                                    Vertical Pod autoscaling | Google Kubernetes
                                    Engine (GKE)
                                </a>
                                — Google Cloud
                                <br />
                                <a href="https://docs.cloud.google.com/architecture/best-practices-for-running-cost-effective-kubernetes-applications-on-gke">
                                    Best practices for running cost-optimized
                                    Kubernetes applications on GKE | Cloud
                                    Architecture Center
                                </a>
                                — Google Cloud
                                <br />
                                <a href="https://cloud.google.com/blog/products/containers-kubernetes/tuning-the-kubernetes-hpa-in-gke">
                                    Tuning the Kubernetes HPA in GKE | Google
                                    Cloud Blog
                                </a>
                                — Google Cloud
                                <br />
                                <a href="https://v1-32.docs.kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/">
                                    Horizontal Pod Autoscaling | Kubernetes
                                    公式ドキュメント
                                </a>
                                — The Kubernetes Authors
                            </div>
                        </div>
                        <div className="ref-card" id="ref7">
                            <div className="num">7</div>
                            <div className="txt">
                                <strong>認定試験情報</strong>
                                <br />
                                <a href="https://cloud.google.com/learn/certification/cloud-developer">
                                    Professional Cloud Developer Certification
                                    | Google Cloud
                                </a>
                                — Google Cloud
                                <br />
                                <a href="https://services.google.com/fh/files/misc/professional_cloud_developer_exam_guide_english.pdf">
                                    Professional Cloud Developer Exam
                                    Guide（公式PDF）
                                </a>
                                — Google Cloud
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
