export interface NavItem {
    id: string;
    label: string;
    lvl3?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
    {
        id: 'セクション2の全体像',
        label: 'セクション2の全体像',
    },
    {
        id: '21-開発環境のセットアップ',
        label: '2.1 開発環境のセットアップ',
    },
    {
        id: '211-gcloud-cliによるgoogle-cloudサービスのローカルエミュレーション',
        label: '2.1.1 gcloud CLIによるGoogle Cloudサービスのローカルエミュレーション',
        lvl3: true,
    },
    {
        id: '212-google-cloud-consolecloud-sdkcloud-codegemini-cloud-assistcloud-shellcloud-workstations',
        label: '2.1.2 Google Cloud Console・Cloud SDK・Cloud Code・Gemini Cloud Assist・Cloud Shell・Cloud Workstations',
        lvl3: true,
    },
    {
        id: '213-ideの構成cloud-sdkaiツールmcpサーバー',
        label: '2.1.3 IDEの構成（Cloud SDK・AIツール・MCPサーバー）',
        lvl3: true,
    },
    {
        id: '22-ビルド',
        label: '2.2 ビルド',
    },
    {
        id: '221-cloud-buildとartifact-registryによるコンテナのビルドと保存',
        label: '2.2.1 Cloud BuildとArtifact Registryによるコンテナのビルドと保存',
        lvl3: true,
    },
    {
        id: '222-cloud-buildにおけるprovenanceの構成binary-authorization',
        label: '2.2.2 Cloud Buildにおけるprovenanceの構成（Binary Authorization）',
        lvl3: true,
    },
    {
        id: '23-テスト',
        label: '2.3 テスト',
    },
    {
        id: '231-aiコーディングアシスタントを活用した単体テストの作成',
        label: '2.3.1 AIコーディングアシスタントを活用した単体テストの作成',
        lvl3: true,
    },
    {
        id: '232-cloud-buildでの自動統合テストの実行',
        label: '2.3.2 Cloud Buildでの自動統合テストの実行',
        lvl3: true,
    },
    {
        id: 'まとめセクション2の全体マップ',
        label: 'まとめ：セクション2の全体マップ',
    },
    {
        id: '参考文献',
        label: '参考文献',
    },
];

export type DiagramId =
    | 'diag-1'
    | 'diag-2'
    | 'diag-3'
    | 'diag-4'
    | 'diag-5'
    | 'diag-6'
    | 'diag-7'
    | 'diag-8';

export const DIAGRAMS: Record<DiagramId, string> = {
    'diag-1': `flowchart TB
    A["セクション2<br/>アプリケーションのビルドとテスト<br/>(配点 約23%)"] --> B["2.1 開発環境のセットアップ"]
    A --> C["2.2 ビルド"]
    A --> D["2.3 テスト"]
    B --> B1["ローカルエミュレーション"]
    B --> B2["Console / SDK / Code /<br/>Gemini Cloud Assist / Shell / Workstations"]
    B --> B3["IDE統合設定<br/>(Cloud SDK・AIツール・MCP)"]
    C --> C1["Cloud Build + Artifact Registry<br/>によるコンテナビルド"]
    C --> C2["ビルドprovenance構成<br/>(Binary Authorization)"]
    D --> D1["AI支援による単体テスト作成"]
    D --> D2["Cloud Buildでの自動統合テスト"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class A highlightFill`,

    'diag-2': `sequenceDiagram
    participant Dev as 開発者
    participant CLI as gcloud CLI
    participant Emu as ローカルエミュレータ<br/>(Pub/Sub 等)
    participant App as アプリケーションコード
    participant Test as 単体テスト

    Dev->>CLI: gcloud beta emulators pubsub start
    CLI->>Emu: エミュレータプロセスを起動
    Emu-->>Dev: ホスト:ポートを出力
    Dev->>CLI: gcloud beta emulators pubsub env-init で接続情報を取得
    CLI-->>Dev: PUBSUB_EMULATOR_HOST を返す
    Dev->>App: 環境変数をエクスポートして起動
    App->>Emu: クライアントライブラリ経由でAPI呼び出し
    Emu-->>App: ローカルでレスポンスを返す
    Test->>App: 単体テストを実行
    App->>Emu: テストデータの読み書き
    Emu-->>Test: 実行結果を返す
    Test-->>Dev: テスト結果を報告`,

    'diag-3': `flowchart TD
    Start{"開発タスクの性質は？"} -->|"数分で終わる一時的な<br/>操作・検証"| Shell["Cloud Shell<br/>(ブラウザベース、5GB永続ホーム)"]
    Start -->|"チーム標準化された<br/>セキュアな継続的開発"| WS["Cloud Workstations<br/>(管理者定義のテンプレートに基づく<br/>永続的な開発環境)"]
    Start -->|"使い慣れたローカルIDEを<br/>維持したい"| Local["ローカルIDE +<br/>Cloud SDK + Cloud Code拡張機能"]
    Start -->|"リソース調査・<br/>自然言語での操作支援"| Console["Google Cloud Console +<br/>Gemini Cloud Assistパネル"]

    Shell --> Note1["組み込みCloud Shell Editorで<br/>Cloud Codeも利用可能"]
    WS --> Note2["VS Code / JetBrainsから<br/>ブラウザまたはSSHで接続"]
    Local --> Note3["Cloud Code拡張機能で<br/>GKE / Cloud Runを統合"]
    Console --> Note4["ページ文脈を理解した<br/>ガイド付きワークフローを提示"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class Start highlightFill`,

    'diag-4': `sequenceDiagram
    participant Dev as 開発者
    participant IDE as IDE (VS Code / JetBrains)
    participant CC as Cloud Code拡張機能
    participant AI as AIコーディング<br/>アシスタント
    participant MCP as MCPサーバー<br/>(例: Cloud Run MCPサーバー)
    participant GC as Google Cloud API

    Dev->>IDE: gcloud auth application-default login<br/>でADCを設定
    IDE->>CC: Cloud Code拡張機能をインストール・設定
    CC->>GC: プロジェクト/リソース一覧を取得
    Dev->>AI: 自然言語でタスクを依頼
    AI->>MCP: 必要なツール呼び出しを実行
    MCP->>GC: 認可済みAPI操作を実行
    GC-->>MCP: 実行結果を返す
    MCP-->>AI: ツール結果を返す
    AI-->>Dev: コード変更・提案を提示
    Dev->>IDE: 提案をレビューし適用`,

    'diag-5': `flowchart LR
    Src["ソースコード<br/>(GitHub / GitLab /<br/>Secure Source Manager)<br/>※Cloud Source Repositoriesは非推奨<br/>(既存顧客のみ利用可、後継がSecure Source Manager)"] -->|"push / PR"| Trig["Cloud Build<br/>トリガー"]
    Trig --> Step1["ステップ1<br/>依存関係取得 / Lint"]
    Step1 --> Step2["ステップ2<br/>単体テスト実行"]
    Step2 --> Step3["ステップ3<br/>コンテナイメージビルド<br/>(Docker / Kaniko / Buildpacks)"]
    Step3 --> Step4["ステップ4<br/>Artifact Registryへpush"]
    Step4 --> AR[("Artifact Registry<br/>コンテナ/パッケージ<br/>リポジトリ")]
    AR --> Scan["Artifact Analysisによる<br/>脆弱性スキャン<br/>(Container Scanning API有効時)"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    classDef warnFill fill:#5c3a1a,stroke:#d9904a,color:#ffffff;
    class AR highlightFill
    class Scan warnFill`,

    'diag-6': `flowchart TB
    Build["Cloud Buildが<br/>コンテナイメージをビルド"] --> Opt{"options.requestedVerifyOption<br/>の設定は？"}
    Opt -->|"VERIFIED"| Prov["SLSA準拠のビルドprovenanceを<br/>自動生成・署名"]
    Opt -->|"NOT_VERIFIED（既定）"| NoProv["provenanceの生成は<br/>保証されない"]
    Prov --> Push["Artifact Registryへpush<br/>(provenanceも保存)"]
    NoProv --> Push
    Push --> Deploy{"Cloud Run / GKEへ<br/>デプロイ要求"}
    Deploy --> BinAuthz["Binary Authorizationが<br/>ポリシーを評価"]
    BinAuthz -->|"Cloud Build生成のprovenance/<br/>Attestationが要件を満たす"| Allow["デプロイ許可"]
    BinAuthz -->|"provenance欠如 または<br/>Attestor未承認"| Deny["デプロイ拒否"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    classDef successFill fill:#1a4a2a,stroke:#4ad97a,color:#ffffff;
    classDef dangerFill fill:#5c1a1a,stroke:#d94a4a,color:#ffffff;
    class Deploy,BinAuthz,Opt highlightFill
    class Allow successFill
    class Deny,NoProv dangerFill`,

    'diag-7': `flowchart LR
    Code["対象コードを選択"] --> Prompt["AIコーディングアシスタントに依頼<br/>(例:「Generate unit tests」)"]
    Prompt --> Gen["テストコードを生成<br/>(境界値・異常系を含む)"]
    Gen --> Review["開発者がレビュー<br/>(正当性・網羅性を確認)"]
    Review -->|"要修正"| Prompt
    Review -->|"承認"| Commit["リポジトリへコミット"]
    Commit --> CB["Cloud Buildパイプラインで<br/>自動実行"]

    classDef warnFill fill:#5c3a1a,stroke:#d9904a,color:#ffffff;
    class Prompt,Gen warnFill`,

    'diag-8': `flowchart TB
    Commit["コミット / プルリクエスト"] --> Trigger["Cloud Build トリガー起動"]
    Trigger --> Lint["Lint / 静的解析"]
    Lint --> Unit["単体テスト実行<br/>(AI支援で作成したテスト)"]
    Unit --> BuildImg["コンテナイメージビルド"]
    BuildImg --> Env["テスト環境を起動<br/>(エミュレータ / docker-compose /<br/>一時GKEクラスタ)"]
    Env --> Integ["自動統合テストを実行"]
    Integ -->|"成功"| Verify{"options.requestedVerifyOption<br/>の設定は？"}
    Integ -->|"失敗"| Fail["ビルド失敗を通知"]
    Verify -->|"VERIFIED"| Prov["Provenance生成 +<br/>Artifact Registryへpush"]
    Verify -->|"NOT_VERIFIED（既定）"| NoProv["Artifact Registryへpush<br/>(provenanceの生成は保証されない)"]
    Prov --> Gate{"Binary Authorization<br/>ポリシー評価<br/>(必要なアテステーションはあるか？)"}
    NoProv --> Gate
    Gate -->|"アテステーションあり<br/>（承認済み）"| Deploy["Cloud Run / GKEへデプロイ"]
    Gate -->|"アテステーションなし / 未承認"| Blocked["デプロイを拒否<br/>(admissionでブロック)"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    classDef dangerFill fill:#5c1a1a,stroke:#d94a4a,color:#ffffff;
    classDef successFill fill:#1a4a2a,stroke:#4ad97a,color:#ffffff;
    class Prov,Gate,Verify highlightFill
    class Fail,NoProv,Blocked dangerFill
    class Deploy successFill`,
};
