export const DIAGRAMS: Record<string, string> = {
    'diag-0': `flowchart TB
    A["設計: モデル駆動の意図 YANGデータモデル"] --> B["コード化: Infrastructure as Code Ansible / Terraform / NSO"]
    B --> C["バージョン管理 Git commit diff"]
    C --> D["コードレビュー Pull Request"]
    D --> E["CIパイプライン Lint 構文チェック ビルド"]
    E --> F["シミュレーション テスト Cisco Modeling Labs pyATS"]
    F --> G{テスト結果は合格か}
    G -- いいえ --> A
    G -- はい --> H["本番適用 NETCONF RESTCONF コントローラーAPI"]
    H --> I["デバイス コントローラー"]`,

    'diag-5-1': `flowchart TB
    subgraph legacy["CLIスクリーンスクレイピング"]
        L1["Pythonスクリプト Expect"] --> L2["SSHでCLIにログイン"]
        L2 --> L3["showコマンドの出力テキストを実行"]
        L3 --> L4["正規表現でテキスト解析"]
        L4 --> L5["ベンダーOSごとに解析ロジックが異なる"]
    end
    subgraph modeldriven["モデル駆動プログラマビリティ"]
        M1["Pythonスクリプト"] --> M2["NETCONF RESTCONFで接続"]
        M2 --> M3["YANGモデルに基づく構造化データを送受信"]
        M3 --> M4["JSON XMLとしてそのままパース可能"]
        M4 --> M5["ベンダーOSが違っても共通のモデルを利用"]
    end
    legacy ~~~ modeldriven`,

    'diag-5-2': `flowchart TB
    subgraph ctrl["コントローラーレベル管理"]
        A1["管理者 自動化スクリプト"] --> C1["コントローラー Catalyst Center ACI APIC Meraki Dashboard"]
        C1 --> N1["デバイス1"]
        C1 --> N2["デバイス2"]
        C1 --> N3["デバイス3"]
    end
    subgraph dev["デバイスレベル管理"]
        A2["管理者 自動化スクリプト"] --> N4["デバイス1"]
        A2 --> N5["デバイス2"]
        A2 --> N6["デバイス3"]
    end
    ctrl ~~~ dev`,

    'diag-5-3': `flowchart TB
    A["自動化コード 設定変更を作成"] --> B["Cisco Modeling Labsで仮想トポロジーを構築"]
    B --> C["仮想ラボ上で変更を適用"]
    C --> D["pyATSでテストスイートを実行"]
    D --> E{テスト結果}
    E -- 合格 --> F["本番ネットワークへ展開"]
    E -- 不合格 --> A`,

    'diag-5-4': `flowchart TB
    A["コードをGitへコミット プッシュ"] --> B["CIトリガー"]
    B --> C["Lint 構文チェック"]
    C --> D["ビルド"]
    D --> E["自動テスト シミュレーション環境で検証"]
    E --> F{テスト合格}
    F -- いいえ --> A
    F -- はい --> G["ステージング環境へデプロイ"]
    G --> H["承認"]
    H --> I["本番環境へデプロイ"]
    I --> J["モニタリング ロールバック待機"]`,

    'diag-5-5': `flowchart TB
    A["望ましい状態をコードで宣言 Desired State"] --> B["バージョン管理システムで管理"]
    B --> C["自動化ツールが適用 Ansible Terraform NSO"]
    C --> D["実際の状態 Actual State"]
    D --> E{Desired Stateと一致しているか}
    E -- 一致 --> F["変更なし 冪等性"]
    E -- 不一致ドリフト --> C`,

    'diag-5-6': `flowchart TB
    subgraph provision["インフラのプロビジョニング"]
        T1["Terraform"] --> R1["クラウド 仮想リソース VMやネットワーク"]
    end
    subgraph configure["OSサービスの構成管理"]
        A1["Ansible"] --> R2["サーバーOS設定 パッケージ サービス起動"]
    end
    subgraph orchestrate["ネットワークサービスのオーケストレーション"]
        N1["Cisco NSO"] --> R3["マルチベンダーのネットワークサービス管理"]
    end
    provision ~~~ configure ~~~ orchestrate`,

    'diag-5-7': `flowchart TB
    A["Pythonスクリプト起動"] --> B["requestsライブラリでAPIキー トークンを付与"]
    B --> C["Cisco APIへHTTPリクエスト Meraki Catalyst Center ACI RESTCONF"]
    C --> D["JSON XMLレスポンスを受信"]
    D --> E["レスポンスをパースして必要な情報を抽出"]
    E --> F["結果を表示 後続処理へ渡す"]`,

    'diag-5-8': `flowchart TB
    A["ansible-playbook実行"] --> B["Inventoryから対象ホストを特定"]
    B --> C["Play開始 hosts becomeを適用"]
    C --> D["Task1 パッケージ管理 yum apt module"]
    D --> E["Task2 ユーザー管理 user module"]
    E --> F["Task3 サービス設定 template copy module"]
    F --> G["Task4 サービス起動停止 service systemd module"]
    G --> H{Taskで変更が発生したか}
    H -- はい --> I["Handlerを実行 例 サービス再起動"]
    H -- いいえ --> J["Play完了"]
    I --> J`,

    'diag-5-9': `flowchart TB
    A["スクリプト実行開始"] --> B["ディレクトリ移動 cd"]
    B --> C["条件分岐でファイル存在確認 if -f"]
    C --> D["パッケージインストール apt-get yum install"]
    D --> E["ユーザー作成 useradd"]
    E --> F["ファイルコピー権限設定 cp chmod chown"]
    F --> G["処理結果をログへ出力"]`,

    'diag-5-10': `sequenceDiagram
    participant C as クライアント Python Postman
    participant D as ネットワークデバイス
    C->>D: GETリクエスト RESTCONF HTTPS JSON
    D-->>C: 200 OK 設定 状態データ JSON
    C->>D: get-config NETCONF SSH XML RPC
    D-->>C: rpc-reply 設定データ XML`,

    'diag-5-11': `flowchart TB
    M["module interfaces"] --> C1["container interfaces"]
    C1 --> L1["list interface key name"]
    L1 --> F1["leaf name type string"]
    L1 --> F2["leaf enabled type boolean"]
    L1 --> F3["leaf mtu type uint16"]
    L1 --> LL["leaf-list address"]`,

    'diag-5-12': `flowchart TB
    A["変更前ファイル a"] --> C["diffコマンドで比較"]
    B["変更後ファイル b"] --> C
    C --> D["Unified Diff形式で出力"]
    D --> E["レビュアーが変更内容を確認"]
    E --> F["問題なければパッチを適用"]`,

    'diag-5-13': `flowchart TB
    A["開発者がPull Requestを作成"] --> B["CIが自動チェックを実行 Lint Unit Test"]
    B --> C{自動チェック合格}
    C -- いいえ --> A
    C -- はい --> D["レビュアーがコードを確認"]
    D --> E{修正依頼あり}
    E -- はい --> A
    E -- いいえ --> F["承認 Approve"]
    F --> G["masterブランチへマージ"]`,

    'diag-5-14': `sequenceDiagram
    participant U as 利用者アプリ
    participant Auth as 認証サーバー
    participant API as Cisco APIサーバー
    participant Dev as ネットワークデバイス
    U->>Auth: 認証情報を送信 client_id secret
    Auth-->>U: アクセストークンを返却
    U->>API: APIリクエスト トークン Authorization Header
    API->>Dev: 内部的に設定 状態を取得
    Dev-->>API: 応答データ
    API-->>U: JSON形式でレスポンス`,
};
