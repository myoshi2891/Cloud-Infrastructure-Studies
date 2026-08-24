/**
 * Google Cloud Professional Cloud Architect (PCA) Section 5 定数定義
 */

export interface NavItem {
    id: string;
    label: string;
    level: 2 | 3;
}

export const NAV_ITEMS: NavItem[] = [
    { id: 'このガイドについて', label: 'このガイドについて', level: 2 },
    { id: 'well-architected-frameworkとの関連', label: 'Well-Architected Frameworkとの関連', level: 2 },
    {
        id: '51-開発運用チームへのアドバイスとソリューションの成功裏のデプロイ支援',
        label: '5.1 開発・運用チームへのアドバイスとソリューションの成功裏のデプロイ支援',
        level: 2,
    },
    {
        id: '511-アプリケーションとインフラストラクチャのデプロイ',
        label: '5.1.1 アプリケーションとインフラストラクチャのデプロイ',
        level: 3,
    },
    {
        id: '512-api管理のベストプラクティスapigee',
        label: '5.1.2 API管理のベストプラクティス（Apigee）',
        level: 3,
    },
    {
        id: '513-テストフレームワーク負荷単体統合テスト',
        label: '5.1.3 テストフレームワーク（負荷/単体/統合テスト）',
        level: 3,
    },
    {
        id: '514-データとシステムの移行管理ツール',
        label: '5.1.4 データとシステムの移行・管理ツール',
        level: 3,
    },
    {
        id: '515-gemini-cloud-assist',
        label: '5.1.5 Gemini Cloud Assist',
        level: 3,
    },
    {
        id: '52-google-cloudとのプログラムによる対話',
        label: '5.2 Google Cloudとのプログラムによる対話',
        level: 2,
    },
    {
        id: '521-cloud-shell-editorcloud-codecloud-shell-terminal',
        label: '5.2.1 Cloud Shell Editor、Cloud Code、Cloud Shell Terminal',
        level: 3,
    },
    {
        id: '522-google-cloud-sdkgcloudgsutilbq',
        label: '5.2.2 Google Cloud SDK（gcloud、gsutil、bq）',
        level: 3,
    },
    {
        id: '523-cloudエミュレータbigtablespannerpubsubfirestore',
        label: '5.2.3 Cloudエミュレータ（Bigtable、Spanner、Pub/Sub、Firestore）',
        level: 3,
    },
    {
        id: '524-infrastructure-as-codeiacterraform',
        label: '5.2.4 Infrastructure as Code（IaC、Terraform）',
        level: 3,
    },
    {
        id: '525-google-apiへのアクセスのベストプラクティス',
        label: '5.2.5 Google APIへのアクセスのベストプラクティス',
        level: 3,
    },
    {
        id: '526-google-apiクライアントライブラリ',
        label: '5.2.6 Google APIクライアントライブラリ',
        level: 3,
    },
    { id: '実装ツールチェーンの全体像', label: '実装ツールチェーンの全体像', level: 2 },
    { id: 'ケーススタディ適用の視点', label: 'ケーススタディ適用の視点', level: 2 },
    { id: '学習チェックリスト', label: '学習チェックリスト', level: 2 },
    { id: '参考文献', label: '参考文献', level: 2 },
];

export type DiagramId =
    | 'diag-1'
    | 'diag-2'
    | 'diag-3'
    | 'diag-4'
    | 'diag-5'
    | 'diag-6'
    | 'diag-7'
    | 'diag-8'
    | 'diag-9'
    | 'diag-10'
    | 'diag-11'
    | 'diag-12'
    | 'diag-13';

export const DIAGRAMS: Record<DiagramId, string> = {
    'diag-1': `flowchart TB
    Root(("Section 5<br/>実装の管理"))
    subgraph S51["5.1 デプロイ支援"]
        direction TB
        A1["アプリ/インフラデプロイ"]
        A2["Apigee API管理"]
        A3["テストフレームワーク"]
        A4["データ/システム移行"]
        A5["Gemini Cloud Assist"]
    end
    subgraph S52["5.2 プログラムによる対話"]
        direction TB
        B1["Cloud Shell/Code"]
        B2["gcloud/gsutil/bq"]
        B3["Cloudエミュレータ"]
        B4["Terraform IaC"]
        B5["API認証ベストプラクティス"]
        B6["クライアントライブラリ"]
    end
    Root --> S51
    Root --> S52`,

    'diag-2': `flowchart LR
    subgraph Source["ソースコード管理"]
        A["Cloud Source Repositories<br/>/ GitHub / GitLab"]
    end
    subgraph Build["ビルド"]
        B["Cloud Build"]
    end
    subgraph Registry["アーティファクト保管"]
        C["Artifact Registry"]
    end
    subgraph Deploy["デプロイ"]
        D["Cloud Deploy"]
    end
    subgraph Runtime["実行環境"]
        E1["GKE"]
        E2["Cloud Run"]
        E3["Compute Engine"]
    end
    subgraph Infra["インフラのデプロイ"]
        F["Infrastructure Manager<br/>/ Terraform"]
    end

    A --> B --> C --> D
    D --> E1
    D --> E2
    D --> E3
    F -.プロビジョニング.-> E1
    F -.プロビジョニング.-> E2
    F -.プロビジョニング.-> E3`,

    'diag-3': `flowchart TB
    Client["クライアント<br/>アプリ/パートナー"]
    subgraph Apigee["Apigee APIマネジメント層"]
        direction TB
        Proxy["APIプロキシ"]
        Policy["ポリシー実行<br/>認証/割り当て/変換"]
        Analytics["アナリティクス/監視"]
    end
    Backend1["マイクロサービスA<br/>Cloud Run"]
    Backend2["マイクロサービスB<br/>GKE"]
    Backend3["レガシーAPI<br/>オンプレミス"]

    Client -->|HTTPSリクエスト| Proxy
    Proxy --> Policy
    Policy --> Backend1
    Policy --> Backend2
    Policy --> Backend3
    Policy -.ログ送信.-> Analytics`,

    'diag-4': `flowchart TB
    A["単体テスト<br/>(Unit Test)<br/>個々の関数/クラスを検証<br/>実行速度: 高速 / 頻度: 高"]
    B["統合テスト<br/>(Integration Test)<br/>複数コンポーネント間の連携を検証<br/>実行速度: 中速 / 頻度: 中"]
    C["負荷テスト<br/>(Load Test)<br/>本番想定のトラフィックでの<br/>性能・スケーラビリティを検証<br/>実行速度: 低速 / 頻度: 低"]
    A --> B --> C`,

    'diag-5': `flowchart TD
    Start{"移行対象は?"}
    Start -->|"オブジェクトストレージ<br/>間のデータ"| STS["Storage Transfer Service"]
    Start -->|"大容量データを<br/>物理輸送"| TA["Transfer Appliance"]
    Start -->|"オンプレ/他クラウドの<br/>リレーショナルDB"| DMS["Database Migration Service"]
    Start -->|"継続的なDB変更の<br/>ストリーミング複製"| DS["Datastream"]
    Start -->|"仮想マシン<br/>全体の移行"| MTOGC["Migrate to Virtual Machines"]
    Start -->|"移行対象の<br/>棚卸し/評価"| MC["Migration Center"]

    STS --> GCS[("Cloud Storage")]
    TA --> GCS
    DMS --> CloudSQL[("Cloud SQL / AlloyDB")]
    DS --> BQ[("BigQuery等へ<br/>変更データキャプチャ")]
    MTOGC --> CE[("Compute Engine")]`,

    'diag-6': `sequenceDiagram
    participant Eng as 開発/運用エンジニア
    participant GCA as Gemini Cloud Assist
    participant Console as Cloud Console/API
    participant Docs as ドキュメント/ベストプラクティス

    Eng->>GCA: 自然言語で質問<br/>(例: "このVPC設計のセキュリティリスクは?")
    GCA->>Console: 現在のリソース構成を参照
    GCA->>Docs: 関連するベストプラクティスを参照
    GCA-->>Eng: 推奨事項・設定案を提示
    Eng->>GCA: 提案の適用を依頼
    GCA->>Console: 設定変更案（要承認）を生成
    Eng->>Console: レビュー後に承認・適用`,

    'diag-7': `flowchart TB
    subgraph Browser["ブラウザ"]
        direction TB
        CST["Cloud Shell Terminal<br/>永続5GBホームディレクトリ<br/>gcloud等プリインストール"]
        CSE["Cloud Shell Editor<br/>VS Codeベース<br/>Cloud Code拡張が標準搭載"]
    end
    subgraph Local["ローカルIDE"]
        VSC["VS Code / IntelliJ"]
        CC["Cloud Code拡張機能"]
        VSC --> CC
    end
    CSE -.同一VM上で動作.-> CST
    CC -->|gcloud認証を共有| GCPAPI["Google Cloud API"]
    CST -->|直接操作| GCPAPI
    CSE -->|"Kubernetes/Cloud Run<br/>マニフェスト編集支援"| GCPAPI`,

    'diag-8': `flowchart LR
    SDK["Google Cloud CLI<br/>(gcloud CLI)"]
    SDK --> gcloud["gcloud<br/>汎用コマンド<br/>(Compute/GKE/IAM等ほぼ全サービス)"]
    SDK --> gsutil["gsutil<br/>Cloud Storage専用<br/>(バケット/オブジェクト操作)"]
    SDK --> bq["bq<br/>BigQuery専用<br/>(データセット/クエリ/ジョブ操作)"]
    gcloud -."新機能は<br/>gcloud storageへ統合中.".-> gcloudstorage["gcloud storage<br/>(gsutilの後継)"]`,

    'diag-9': `sequenceDiagram
    participant Dev as 開発者のローカル環境
    participant App as テスト対象アプリケーション
    participant Emu as ローカルエミュレータ<br/>(Bigtable/Spanner/Pub/Sub/Firestore)
    participant Prod as 本番マネージドサービス

    Dev->>Emu: エミュレータを起動<br/>(gcloud emulators ... start)
    Dev->>App: 環境変数でエミュレータの<br/>エンドポイントを指定
    App->>Emu: 通常のクライアントライブラリで<br/>読み書きリクエスト
    Emu-->>App: レスポンス（インメモリ/ローカル実装）
    Note over App,Prod: 本番同等の環境変数を外せば<br/>コード変更なしで本番へ接続可能`,

    'diag-10': `flowchart LR
    A["terraform init<br/>プロバイダ初期化"] --> B["terraform plan<br/>差分プレビュー"]
    B --> C{"レビュー<br/>承認?"}
    C -->|承認| D["terraform apply<br/>実際にリソースを作成/変更"]
    C -->|却下| E["構成コードを修正"]
    E --> B
    D --> F[("Terraform State<br/>Cloud Storageバケット等で<br/>リモート管理")]
    F -.次回のplan時に参照.-> B`,

    'diag-11': `flowchart TD
    Start{"呼び出し元は?"}
    Start -->|"Google Cloud上で<br/>動作するサービス"| ADC["Application Default<br/>Credentials (ADC)<br/>メタデータサーバーから<br/>自動的に認証情報取得"]
    Start -->|"CI/CDや外部システムから<br/>の呼び出し"| WIF["Workload Identity<br/>Federation<br/>外部IDプロバイダの<br/>トークンと連携"]
    Start -->|"ユーザーに代わって<br/>操作するアプリ"| OAuth["OAuth 2.0<br/>ユーザー同意フロー"]
    Start -->|"公開データへの<br/>単純アクセス"| APIKey["APIキー<br/>(認可なし識別のみ)"]

    ADC --> Best["推奨: サービスアカウントキーの<br/>直接発行・配布は最終手段とする"]
    WIF --> Best
    OAuth --> Best`,

    'diag-12': `flowchart TB
    App["アプリケーションコード"]
    subgraph Client["クライアントライブラリ層"]
        Auth["認証処理<br/>ADC/OAuthの自動処理"]
        Retry["リトライ/バックオフ"]
        Page["ページネーション処理"]
        Serialize["protobuf/JSON<br/>シリアライズ"]
    end
    API["Google Cloud API<br/>REST / gRPC"]

    App --> Client
    Client --> API`,

    'diag-13': `flowchart TB
    subgraph Dev["開発フェーズ"]
        CSE["Cloud Shell Editor<br/>Cloud Code"]
        Emu["Cloudエミュレータ<br/>Bigtable/Spanner/Pub/Sub/Firestore"]
        CSE --> Emu
    end

    subgraph CI["CI: ビルド/テスト"]
        CB["Cloud Build"]
        UT["単体テスト"]
        IT["統合テスト"]
        CB --> UT --> IT
    end

    subgraph CD["CD: デリバリー"]
        AR["Artifact Registry"]
        CDp["Cloud Deploy"]
        LT["負荷テスト<br/>ステージング環境"]
        AR --> CDp --> LT
    end

    subgraph IaC["インフラのプロビジョニング"]
        TF["Terraform"]
        IM["Infrastructure Manager"]
        CC["Config Connector"]
    end

    subgraph Runtime["本番実行環境"]
        Svc["GKE / Cloud Run / Compute Engine"]
        Api["Apigee<br/>APIゲートウェイ"]
    end

    subgraph Ops["運用支援"]
        GCA["Gemini Cloud Assist"]
        SDK["gcloud/gsutil/bq"]
    end

    Dev --> CI --> CD
    IaC -.プロビジョニング.-> Runtime
    CD --> Runtime
    Runtime --> Api
    GCA -.助言.-> Dev
    GCA -.助言.-> Ops
    SDK -.操作.-> Runtime
    SDK -.操作.-> IaC`,
};

export interface ReferenceItem {
    id: string;
    num: number;
    title: string;
    url: string;
}

export const REFERENCES: ReferenceItem[] = [
    {
        id: 'ref1',
        num: 1,
        title: 'Google Cloud. "Professional Cloud Architect Certification | Learn."',
        url: 'https://cloud.google.com/learn/certification/cloud-architect',
    },
    {
        id: 'ref2',
        num: 2,
        title: 'Google Cloud. "Professional Cloud Architect Certification exam guide."',
        url: 'https://services.google.com/fh/files/misc/professional_cloud_architect_exam_guide_english.pdf',
    },
    {
        id: 'ref3',
        num: 3,
        title: 'Google Cloud Documentation. "Restrict deploy behavior using policies."',
        url: 'https://cloud.google.com/deploy/docs/deploy-policy',
    },
    {
        id: 'ref4',
        num: 4,
        title: 'Google Cloud Documentation. "Use a deployment strategy."',
        url: 'https://cloud.google.com/deploy/docs/deployment-strategies',
    },
    {
        id: 'ref5',
        num: 5,
        title: 'Google Cloud Documentation. "Infrastructure Manager overview."',
        url: 'https://cloud.google.com/infrastructure-manager/docs/overview',
    },
    {
        id: 'ref6',
        num: 6,
        title: 'Google Cloud Documentation. "What is Apigee?"',
        url: 'https://cloud.google.com/apigee/docs/api-platform/get-started/what-apigee',
    },
    {
        id: 'ref7',
        num: 7,
        title: 'Google Cloud Documentation. "Add the SpikeArrest policy to your API."',
        url: 'https://cloud.google.com/apigee/docs/api-platform/tutorials/add-spike-arrest',
    },
    {
        id: 'ref8',
        num: 8,
        title: 'Google Cloud Documentation. "Migration Center overview."',
        url: 'https://cloud.google.com/migration-center/docs/migration-center-overview',
    },
    {
        id: 'ref9',
        num: 9,
        title: 'Google Cloud. "Gemini Cloud Assist: AI-assisted cloud operations and management."',
        url: 'https://cloud.google.com/products/gemini/cloud-assist',
    },
    {
        id: 'ref10',
        num: 10,
        title: 'Google Cloud Documentation. "Cloud Shell Editor interface overview."',
        url: 'https://cloud.google.com/shell/docs/editor-overview',
    },
    {
        id: 'ref11',
        num: 11,
        title: 'Google Cloud Documentation. "Cloud Code overview."',
        url: 'https://cloud.google.com/code/docs/vscode/overview',
    },
    {
        id: 'ref12',
        num: 12,
        title: 'Google Cloud Documentation. "gsutil tool."',
        url: 'https://cloud.google.com/storage/docs/gsutil',
    },
    {
        id: 'ref13',
        num: 13,
        title: 'Google Cloud Documentation. "gcloud emulators."',
        url: 'https://cloud.google.com/sdk/gcloud/reference/emulators',
    },
    {
        id: 'ref14',
        num: 14,
        title: 'Google Cloud Documentation. "Best practices for Terraform operations."',
        url: 'https://cloud.google.com/docs/terraform/best-practices/operations',
    },
    {
        id: 'ref15',
        num: 15,
        title: 'Google Cloud Documentation. "Config Connector overview."',
        url: 'https://cloud.google.com/config-connector/docs/overview',
    },
    {
        id: 'ref16',
        num: 16,
        title: 'Google Cloud Documentation. "Authentication for Google Cloud APIs and services."',
        url: 'https://cloud.google.com/docs/authentication',
    },
    {
        id: 'ref17',
        num: 17,
        title: 'Google Cloud Documentation. "Workload Identity Federation."',
        url: 'https://cloud.google.com/iam/docs/workload-identity-federation',
    },
    {
        id: 'ref18',
        num: 18,
        title: 'Google Cloud Documentation. "Client libraries and Cloud APIs explained."',
        url: 'https://cloud.google.com/apis/docs/client-libraries-explained',
    },
];

export const CHECKLIST_ITEMS = [
    { id: 'chk1', text: 'Cloud Build、Artifact Registry、Cloud Deployの役割分担をアプリデプロイの文脈で説明できる' },
    { id: 'chk2', text: 'Infrastructure Manager／Config Connector／Deployment Managerの違いと使い分けを説明できる' },
    { id: 'chk3', text: 'Cloud Deployの組み込み戦略（Standard / Canary）の違いと、Blue-Greenを別途構成する方法を説明できる' },
    { id: 'chk4', text: 'Apigeeが提供する主要機能（プロキシ、ポリシー、デベロッパーポータル、アナリティクス）を列挙できる' },
    { id: 'chk5', text: 'Spike ArrestポリシーとQuotaポリシーの違いを説明できる' },
    { id: 'chk6', text: '単体テスト・統合テスト・負荷テストの目的と実施タイミングの違いを説明できる' },
    { id: 'chk7', text: 'Storage Transfer Service、Transfer Appliance、DMS、Datastream、Migrate to Virtual Machines、Migration Centerの使い分けを説明できる' },
    { id: 'chk8', text: 'Gemini Cloud Assistが支援できる代表的なユースケースを3つ以上挙げられる' },
    { id: 'chk9', text: 'Cloud Shell Terminal、Cloud Shell Editor、Cloud Codeの違いを説明できる' },
    { id: 'chk10', text: 'gcloud、gsutil（およびgcloud storage）、bqのそれぞれの主対象サービスを説明できる' },
    { id: 'chk11', text: 'Bigtable/Spanner/Pub/Sub/Firestoreエミュレータを使う目的とメリットを説明できる' },
    { id: 'chk12', text: 'Terraformのinit/plan/applyのワークフローとStateのリモート管理の重要性を説明できる' },
    { id: 'chk13', text: 'ADC、Workload Identity Federation、OAuth 2.0、APIキーの適切な使い分けを説明できる' },
    { id: 'chk14', text: 'サービスアカウントキーを避けるべき理由と代替手段を説明できる' },
    { id: 'chk15', text: 'Cloud Client LibrariesとGoogle API Client Librariesの違いを説明できる' },
    { id: 'chk16', text: '4つの公式ケーススタディそれぞれの業種特性とSection 5の技術要素の接点を大まかに説明できる' },
];
