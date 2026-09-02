export interface NavItem {
    id: string;
    label: string;
    lvl3?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
    {
        id: 'この章について',
        label: 'この章について',
    },
    {
        id: 'section-4-全体像',
        label: 'Section 4 全体像',
    },
    {
        id: '41-データストレージサービスとのアプリケーション統合',
        label: '4.1 データ/ストレージサービスとのアプリケーション統合',
    },
    {
        id: '411-さまざまなgoogle-cloudデータストアへの接続管理',
        label: '4.1.1 さまざまなGoogle Cloudデータストアへの接続管理',
        lvl3: true,
    },
    {
        id: '412-さまざまなgoogle-cloudデータソースへのデータの読み書き',
        label: '4.1.2 さまざまなGoogle Cloudデータソースへのデータの読み書き',
        lvl3: true,
    },
    {
        id: '413-メッセージングサービスを使ったデータの発行消費アプリケーションの作成',
        label: '4.1.3 メッセージングサービスを使ったデータの発行・消費アプリケーションの作成',
        lvl3: true,
    },
    {
        id: '42-google-cloud-apiの利用',
        label: '4.2 Google Cloud APIの利用',
    },
    {
        id: '421-google-cloudサービスの有効化',
        label: '4.2.1 Google Cloudサービスの有効化',
        lvl3: true,
    },
    {
        id: '422-サポートされているオプションを使ったapi呼び出し',
        label: '4.2.2 サポートされているオプションを使ったAPI呼び出し',
        lvl3: true,
    },
    {
        id: '423-サービスアカウントを使ったcloud-api呼び出し',
        label: '4.2.3 サービスアカウントを使ったCloud API呼び出し',
        lvl3: true,
    },
    {
        id: '43-トラブルシューティングとオブザーバビリティ',
        label: '4.3 トラブルシューティングとオブザーバビリティ',
    },
    {
        id: '431-メトリクスログトレースによるコードのインスツルメンテーション',
        label: '4.3.1 メトリクス・ログ・トレースによるコードのインスツルメンテーション',
        lvl3: true,
    },
    {
        id: '432-google-cloud-observabilityを使った問題の特定と解決',
        label: '4.3.2 Google Cloud Observabilityを使った問題の特定と解決',
        lvl3: true,
    },
    {
        id: '433-error-reportingによるアプリケーション問題の管理',
        label: '4.3.3 Error Reportingによるアプリケーション問題の管理',
        lvl3: true,
    },
    {
        id: '434-トレースidを使ったサービス間のトレーススパンの相関',
        label: '4.3.4 トレースIDを使ったサービス間のトレーススパンの相関',
        lvl3: true,
    },
    {
        id: '435-ai支援オブザーバビリティの活用',
        label: '4.3.5 AI支援オブザーバビリティの活用',
        lvl3: true,
    },
    {
        id: 'section-4-まとめ-試験対策チェックリスト',
        label: 'Section 4 まとめ: 試験対策チェックリスト',
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
    | 'diag-8'
    | 'diag-9'
    | 'diag-10'
    | 'diag-11'
    | 'diag-12'
    | 'diag-13'
    | 'diag-14'
    | 'diag-15';

export const DIAGRAMS: Record<DiagramId, string> = {
    'diag-1': `flowchart TD
    Title["Section 4: Google Cloudサービスとのアプリケーション統合<br/>（試験全体の約21%）"]

    Title --> S41["4.1 データ/ストレージサービスとの統合"]
    Title --> S42["4.2 Google Cloud APIの利用"]
    Title --> S43["4.3 トラブルシューティングとオブザーバビリティ"]

    S41 --> S411["4.1.1 データストアへの接続管理<br/>（Cloud SQL / Firestore / Cloud Storage）"]
    S41 --> S412["4.1.2 データソースへの読み書き"]
    S41 --> S413["4.1.3 メッセージングサービスでの発行/消費"]

    S42 --> S421["4.2.1 サービスの有効化"]
    S42 --> S422["4.2.2 API呼び出しオプションと5つの考慮事項"]
    S42 --> S423["4.2.3 サービスアカウントでの認証"]

    S43 --> S431["4.3.1 メトリクス/ログ/トレースの<br/>インスツルメンテーション"]
    S43 --> S432["4.3.2 Observabilityでの問題特定と解決"]
    S43 --> S433["4.3.3 Error Reportingでの障害管理"]
    S43 --> S434["4.3.4 トレースIDによるスパン相関"]
    S43 --> S435["4.3.5 AI支援オブザーバビリティ"]

    S411 -.->|"接続確立後にリクエストが流れる"| S422
    S413 -.->|"非同期メッセージも呼び出しの一種"| S422
    S422 -.->|"呼び出しの結果を計測・記録"| S431
    S431 -.->|"収集したデータから原因を特定"| S432

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class Title,S41,S42,S43 highlightFill;`,

    'diag-2': `flowchart TD
    Start(["どのようなデータを扱うか？"]) --> Q1{"強い整合性を持つ<br/>トランザクション処理か？"}
    Q1 -->|"Yes（在庫・決済・会員情報など）"| SQL["Cloud SQL<br/>（MySQL/PostgreSQL/SQL Server）"]
    Q1 -->|"No"| Q2{"柔軟なスキーマの<br/>ドキュメント/コレクション構造で、<br/>モバイル/Webとのリアルタイム同期が必要か？"}
    Q2 -->|"Yes"| FS["Firestore<br/>（Native mode）"]
    Q2 -->|"No"| Q3{"バイナリファイル・画像・動画・<br/>バックアップなどの非構造化データか？"}
    Q3 -->|"Yes"| GCS["Cloud Storage<br/>（オブジェクトストレージ）"]
    Q3 -->|"No（超大規模の時系列/ワイドカラム、<br/>グローバル分散トランザクションなど）"| Other["Bigtable / Spanner / AlloyDB<br/>（詳細はSection 1.3を参照）"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class Start,SQL,FS,GCS highlightFill;`,

    'diag-3': `sequenceDiagram
    participant App as アプリケーション
    participant Pool as コネクションプール<br/>（例: HikariCP / pg pool）
    participant Conn as Cloud SQL Language Connector<br/>（またはAuth Proxy）
    participant DB as Cloud SQLインスタンス

    App->>Pool: DB接続をリクエスト
    alt プール内に空きコネクションあり
        Pool-->>App: 既存コネクションを再利用
    else プールが空でmax未満
        Pool->>Conn: 新規接続を要求
        Conn->>Conn: IAM権限を確認し<br/>一時的なクライアント証明書を生成
        Conn->>DB: TLSで暗号化された<br/>認可済み接続を確立
        DB-->>Conn: 接続確立
        Conn-->>Pool: コネクションをプールに追加
        Pool-->>App: コネクションを返却
    end
    App->>DB: クエリ実行（プール経由）
    DB-->>App: 結果を返却
    App->>Pool: コネクションをプールに返却`,

    'diag-4': `flowchart LR
    Op(["Firestoreへの書き込み操作"]) --> Q1{"複数ドキュメントに<br/>またがるか？"}
    Q1 -->|"No（単一ドキュメント）"| Single["set() / update()<br/>を直接呼び出す"]
    Q1 -->|"Yes"| Q2{"読み取った値を基準に<br/>条件付きで更新するか？"}
    Q2 -->|"Yes（例: 在庫の増減）"| Txn["runTransaction()で<br/>読み取り→検証→書き込みを<br/>アトミックに実行"]
    Q2 -->|"No（単純な一括書き込み）"| Batch["WriteBatch（バッチ書き込み）<br/>で最大500件をまとめて送信"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class Op,Txn,Batch,Single highlightFill;`,

    'diag-5': `flowchart TD
    A["1. トピックを作成する"] --> B["2. （必要なら）メッセージ構造の<br/>スキーマを定義しトピックに紐付ける"]
    B --> C["3. パブリッシャークライアントを設定し、<br/>トピックへメッセージを発行する"]
    C --> D["4. 必要に応じて発行の詳細設定を行う<br/>（フロー制御・バッチ送信・並行度制御）"]
    D --> E["5. サブスクリプションの種類を選ぶ<br/>（Pull / Push / BigQueryサブスクリプションなど）"]
    E --> F["6. サブスクリプションを作成する"]
    F --> G["7. サブスクライバークライアントを設定し、<br/>メッセージを受信する"]
    G --> H["8. 必要に応じて配信の詳細設定を行う<br/>（Exactly-once配信 ※Pull API・StreamingPullのみ、<br/>かつ同一リージョン接続時に限り保証・<br/>順序保証・フロー制御）"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class A,H highlightFill;`,

    'diag-6': `sequenceDiagram
    participant Pub as パブリッシャー<br/>アプリケーション
    participant Client as Pub/Subクライアント<br/>（フロー制御あり）
    participant Topic as Pub/Subトピック
    participant Subsc as Pub/Subサブスクリプション
    participant Sub as サブスクライバー<br/>アプリケーション

    Pub->>Client: publish(message) を連続実行
    alt 未確認メッセージ数が上限未満
        Client->>Topic: メッセージをバッチ送信
        Topic-->>Client: messageId を返却（発行成功）
        Client-->>Pub: 発行成功を通知
    else 未確認メッセージ数が上限に到達
        Client--xPub: 発行をブロック/エラーで待機
        Note over Client: 未完了のpublishリクエストが<br/>完了して空きができるのを待つ
    end
    Topic->>Subsc: アタッチされた各サブスクリプションへ<br/>メッセージを複製
    Subsc->>Sub: ストリーミングpullでメッセージ配信
    Sub->>Sub: ビジネスロジックを実行
    alt 処理成功
        Sub->>Subsc: ack（確認応答）
    else 処理失敗
        Sub->>Subsc: nack（否定応答）または無応答
        Subsc->>Sub: ackDeadline経過後に再配信
    end`,

    'diag-7': `flowchart TD
    A["1. Google Cloudプロジェクトを用意する"] --> B["2. 利用したいAPI/サービスを特定する<br/>（例: pubsub.googleapis.com）"]
    B --> C{"有効化する方法を選ぶ"}
    C -->|"コンソール"| D["APIライブラリで検索し<br/>「有効にする」をクリック"]
    C -->|"gcloud CLI"| E["gcloud services enable<br/>SERVICE_NAME"]
    C -->|"Terraform / IaC"| F["google_project_service<br/>リソースを定義しapply"]
    D --> G["3. 有効化が反映されるまで待つ<br/>（数秒〜数分、非同期の場合あり）"]
    E --> G
    F --> G
    G --> H["4. 必要なIAMロール/権限を付与する<br/>（サービス有効化とは別に必要）"]
    H --> I["5. 認証情報を用意してAPIを呼び出す"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class A,I highlightFill;`,

    'diag-8': `flowchart TD
    Start(["Google Cloud APIを呼び出したい"]) --> Q1{"対応言語のCloud Client<br/>Libraryが存在するか？"}
    Q1 -->|"Yes（多くの場合これに該当）"| CL["Cloud Client Libraryを使う<br/>（第一選択）"]
    Q1 -->|"No"| Q1b{"対象APIはgRPC<br/>インターフェースに対応しているか？"}
    Q1b -->|"No"| Q3{"手元でAPIの挙動を<br/>試したいだけか？"}
    Q1b -->|"Yes"| Q2{"低レイテンシ・双方向<br/>ストリーミングが必要か？"}
    Q2 -->|"Yes"| GRPC["gRPCで直接呼び出す<br/>（protoベースのRPC）"]
    Q2 -->|"No"| Q3
    Q3 -->|"Yes（探索的・一時的な利用）"| Explorer["API Explorer で<br/>ブラウザから試行"]
    Q3 -->|"No（本番コードとして<br/>直接HTTPを叩く必要がある）"| REST["REST API<br/>（JSON over HTTP）を<br/>自前のHTTPクライアントで呼ぶ"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class Start,CL,GRPC,REST highlightFill;`,

    'diag-9': `flowchart TD
    Req["APIリクエストを送信"] --> Check{"エラーが発生したか？"}
    Check -->|"成功"| Done(["結果を返す"])
    Check -->|"エラー"| Retryable{"再試行可能なエラーか？<br/>（429, 500, 502, 503, 504など）"}
    Retryable -->|"No（400, 401, 403など）"| Fail(["即座に失敗として扱う"])
    Retryable -->|"Yes"| Idem{"操作は冪等か、または<br/>request_id/preconditionで<br/>対象APIが重複実行を防止できるか？"}
    Idem -->|"No"| Fail
    Idem -->|"Yes"| MaxCheck{"最大試行回数/<br/>最大経過時間に達したか？"}
    MaxCheck -->|"Yes"| GiveUp(["リトライを諦めて<br/>エラーを呼び出し元へ伝播"])
    MaxCheck -->|"No"| Wait["待機時間 = 基本間隔 × 倍率^試行回数<br/>＋ ランダムなジッター"]
    Wait --> Req

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class Req,Done highlightFill;
    classDef dangerFill fill:#5c1a1a,stroke:#d94a4a,color:#ffffff;
    class Fail,GiveUp dangerFill;`,

    'diag-10': `flowchart TD
    Start(["Client Libraryが認証情報を必要とする"]) --> C1{"環境変数<br/>GOOGLE_APPLICATION_CREDENTIALS<br/>が設定されているか？"}
    C1 -->|"Yes"| Use1["指定された認証情報構成ファイルを使用<br/>（サービスアカウントキー、または<br/>WIF用の外部アカウント構成ファイル）"]
    C1 -->|"No"| C2{"gcloud auth application-default login<br/>で作成されたローカル認証情報ファイルが<br/>存在するか？"}
    C2 -->|"Yes（ローカル開発環境で一般的）"| Use2["ローカルADCファイルの<br/>認証情報を使用"]
    C2 -->|"No"| C3{"Compute Engine / Cloud Run / GKEなど<br/>メタデータサーバーを持つ環境で<br/>実行されているか？"}
    C3 -->|"Yes（本番環境で推奨）"| Use3["アタッチされたサービスアカウントの<br/>短期的な認証情報を<br/>メタデータサーバーから取得"]
    C3 -->|"No"| Error(["認証エラー:<br/>資格情報が見つからない"])

    Use1 --> Call["Cloud APIへリクエストを送信"]
    Use2 --> Call
    Use3 --> Call

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class Start,Use3,Call highlightFill;
    classDef dangerFill fill:#5c1a1a,stroke:#d94a4a,color:#ffffff;
    class Error dangerFill;`,

    'diag-11': `flowchart TD
    App["アプリケーションコード"] --> Instr["インスツルメンテーション<br/>（テレメトリを発生させるコードを追加）"]
    Instr --> Metrics["メトリクス<br/>（数値化された健全性指標）"]
    Instr --> Logs["ログ<br/>（イベントの詳細な記録）"]
    Instr --> Traces["トレース<br/>（リクエストの分散した処理経路）"]

    Metrics --> CM["Cloud Monitoring"]
    Logs --> CL["Cloud Logging"]
    Traces --> CT["Cloud Trace"]

    CM --> Obs["Google Cloud Observability<br/>（統合分析基盤）"]
    CL --> Obs
    CT --> Obs

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class App,Instr,Obs highlightFill;`,

    'diag-12': `flowchart TB
    subgraph Suite["Google Cloud Observability スイート"]
        direction LR
        Logging["Cloud Logging<br/>（ログの収集・検索・分析）"]
        Monitoring["Cloud Monitoring<br/>（メトリクスの可視化・アラート）"]
        Trace["Cloud Trace<br/>（分散トレースの可視化）"]
        Profiler["Cloud Profiler<br/>（CPU/メモリ使用量の継続的プロファイリング）"]
    end

    App["インスツルメント済み<br/>アプリケーション<br/>（OpenTelemetry経由）"] --> Suite
    App -->|"言語別のprofiling agent"| Profiler

    Suite --> ErrorRep["Error Reporting<br/>（エラーの自動集約）"]
    Suite --> Gemini["Gemini Cloud Assist<br/>Investigations"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class App,ErrorRep,Gemini highlightFill;`,

    'diag-13': `flowchart TD
    A["1. アプリケーションで例外が発生"] --> B{"エラーの報告方法を選ぶ"}
    B -->|"方法A（推奨）"| C["構造化ログとして<br/>スタックトレース付きで<br/>Cloud Loggingへ書き込む"]
    B -->|"方法B"| D["Error Reporting APIの<br/>events.reportメソッドを<br/>直接呼び出す"]
    C --> E["Error Reportingが<br/>ログエントリを解析"]
    D --> F["Error Reportingが<br/>ReportedErrorEventを受信"]
    E --> G["2. スタックトレースの類似度に基づき<br/>エラーグループへ自動集約"]
    F --> G
    G --> H["3. 新規エラーグループの発生時に<br/>通知（メール等）を送信"]
    H --> I["4. Error Reportingコンソールで<br/>頻度・影響範囲・傾向を確認"]
    I --> J["5. Logs Explorerで該当グループの<br/>個々のログエントリを掘り下げる"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class A,J highlightFill;`,

    'diag-14': `sequenceDiagram
    participant Client as クライアント
    participant SvcA as サービスA<br/>（APIゲートウェイ）
    participant SvcB as サービスB<br/>（注文処理）
    participant SvcC as サービスC<br/>（在庫確認）
    participant CT as Cloud Trace
    participant CL as Cloud Logging

    Client->>SvcA: リクエスト送信
    SvcA->>SvcA: トレースID/スパンIDを生成<br/>（新規トレースの開始）
    SvcA->>CL: ログ書き込み（trace: TRACE_ID）
    SvcA->>SvcB: リクエスト転送<br/>（traceparentヘッダーで伝播）
    SvcB->>SvcB: 子スパンを生成<br/>（同じtrace IDを継承）
    SvcB->>CL: ログ書き込み（trace: TRACE_ID, spanId: SPAN_B）
    SvcB->>SvcC: リクエスト転送<br/>（traceparentヘッダーで伝播）
    SvcC->>SvcC: 孫スパンを生成<br/>（同じtrace IDを継承）
    SvcC->>CL: ログ書き込み（trace: TRACE_ID, spanId: SPAN_C）
    SvcC-->>SvcB: レスポンス
    SvcB-->>SvcA: レスポンス
    SvcA-->>Client: レスポンス

    SvcA->>CT: スパンデータを送信
    SvcB->>CT: スパンデータを送信
    SvcC->>CT: スパンデータを送信

    Note over CT,CL: 同一のTRACE_IDにより、<br/>Trace ExplorerとLogs Explorerが<br/>相互にリンクして表示可能になる`,

    'diag-15': `flowchart TD
    A["1. 問題の兆候が発生<br/>（アラート発火、エラー急増、<br/>パフォーマンス低下）"] --> B{"調査（Investigation）の<br/>起動方法"}
    B -->|"手動"| C["エラー画面/ログエントリ/<br/>コンソール右上のInvestigationsアイコン<br/>から起動"]
    B -->|"自動<br/>（バックグラウンド）"| D["バックグラウンド監視エージェントが<br/>対応アラート（メトリクスベースの<br/>アラートポリシー等）を検知して<br/>自動的に調査を開始<br/>※ログベースのアラートは対象外"]
    C --> E1["2a. 手動調査：<br/>調査を実行した<br/>エンドユーザーのIDで<br/>関連データへアクセス<br/>（IAM付与先・監査ログの<br/>プリンシパル＝そのユーザー）"]
    D --> E2["2b. 自動調査：<br/>プロジェクト固有の<br/>エージェントIDで<br/>関連データへアクセス<br/>（IAM付与先・監査ログの<br/>プリンシパル＝エージェントID）"]
    E1 --> F["3. ログ・メトリクス・トレース・<br/>設定変更履歴・トラブルシューティング<br/>runbookを横断的に相関分析"]
    E2 --> F
    F --> G["4. 「Observations（観察結果）」として<br/>関連性の高い洞察を生成・ランク付け"]
    G --> H["5. 各Observationに<br/>元データへのリンクを添付し、<br/>裏付け確認を可能にする"]
    H --> I["6. 推定される根本原因と<br/>対処方法の候補を提示"]
    I --> J["7. 人間が内容を確認し、<br/>必要な是正アクションを実施<br/>（Geminiは明示的な承認なしに<br/>変更を実行しない）"]

    classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff;
    class A,J highlightFill;`,
};

export const CHECKLIST_ITEMS = [
    {
        id: 'chk-411',
        label: '4.1.1 データストアへの接続管理: コネクション/クライアントは「使い回す」のが大原則',
    },
    {
        id: 'chk-412',
        label: '4.1.2 データの読み書き: 複数リソースにまたがる更新はトランザクション/バッチで',
    },
    {
        id: 'chk-413',
        label: '4.1.3 メッセージングでの発行/消費: 消費側は「重複配信が発生し得る」前提で冪等に設計する',
    },
    {
        id: 'chk-421',
        label: '4.2.1 サービスの有効化: 有効化だけでは呼べない、権限も別途必要',
    },
    {
        id: 'chk-422',
        label: '4.2.2 API呼び出しオプションと5つの考慮事項: 指数バックオフには必ずジッターを加える',
    },
    {
        id: 'chk-423',
        label: '4.2.3 サービスアカウントでの認証: 本番はアタッチ型サービスアカウント、キー配布は避ける',
    },
    {
        id: 'chk-431',
        label: '4.3.1 インスツルメンテーション: ベンダー中立なフレームワークで計装するのが推奨',
    },
    {
        id: 'chk-432',
        label: '4.3.2 Observabilityでの問題特定/解決: 異常検知→トレースで絞込み→ログで原因特定の順序',
    },
    {
        id: 'chk-433',
        label: '4.3.3 Error Reportingでの障害管理: 類似スタックトレースを自動集約し新規発生を通知',
    },
    {
        id: 'chk-434',
        label: '4.3.4 トレースIDによるスパン相関: サービス間でトレースコンテキストを伝播させる',
    },
    {
        id: 'chk-435',
        label: '4.3.5 AI支援オブザーバビリティ: 読み取り専用の分析、是正実行には人間の承認が必要',
    },
];
