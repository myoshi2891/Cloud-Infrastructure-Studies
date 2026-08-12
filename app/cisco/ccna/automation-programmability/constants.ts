export const DIAGRAMS: Record<string, string> = {
    fig1: `flowchart TB
    subgraph M["従来の手動運用"]
        direction LR
        Eng1["エンジニア"] -->|個別にログインして設定| R1["機器1"]
        Eng1 -->|個別にログインして設定| R2["機器2"]
        Eng1 -->|個別にログインして設定| R3["機器3"]
    end
    subgraph A["自動化された運用"]
        direction LR
        Script["自動化ツール<br/>(1つの定義ファイルを実行)"] --> D1["機器1"]
        Script --> D2["機器2"]
        Script --> D3["機器3"]
    end`,
    fig2: `flowchart TB
    subgraph Traditional["従来型ネットワーク（分散型・自律制御）"]
        direction LR
        T1["ルータA<br/>(制御+転送を自分で実行)"] --- T2["ルータB<br/>(制御+転送を自分で実行)"]
        T2 --- T3["ルータC<br/>(制御+転送を自分で実行)"]
    end
    subgraph SDN["コントローラベースネットワーク（集中型）"]
        direction TB
        C["コントローラ<br/>(集中制御プレーン)"]
        C -->|指示・設定配信| S1["スイッチ/ルータ<br/>(転送に専念)"]
        C -->|指示・設定配信| S2["スイッチ/ルータ<br/>(転送に専念)"]
        C -->|指示・設定配信| S3["スイッチ/ルータ<br/>(転送に専念)"]
    end`,
    fig3: `flowchart TB
    subgraph Fabric["ファブリック全体（コントローラが一元管理）"]
        direction TB
        Overlay["オーバーレイ<br/>(VXLANなどの論理トンネル・仮想ネットワーク)"]
        Underlay["アンダーレイ<br/>(物理スイッチ・物理リンクによるIP到達性)"]
        Overlay -->|物理経路の上に論理網を構築| Underlay
    end`,
    fig4: `flowchart TB
    App["業務アプリケーション<br/>(自動化ツール・オーケストレーター)"]
    App -->|ノースバウンドAPI<br/>例：REST API| Ctrl["コントローラ<br/>(制御プレーン)"]
    Ctrl -->|サウスバウンドAPI<br/>例：NETCONF, OpenFlow| Dev1["ネットワーク機器1<br/>(データプレーン)"]
    Ctrl -->|サウスバウンドAPI| Dev2["ネットワーク機器2<br/>(データプレーン)"]
    Ctrl -->|サウスバウンドAPI| Dev3["ネットワーク機器3<br/>(データプレーン)"]`,
    fig5: `flowchart LR
    T["テレメトリデータ収集<br/>(ログ・メトリクス・フロー情報)"] --> ML["機械学習モデル"]
    ML --> Predictive["予測的AI<br/>(障害予兆検知・容量予測)"]
    ML --> Anomaly["異常検知<br/>(通常時との差分検出)"]
    GenAI["生成AI<br/>(自然言語での設定案・トラブルシュート支援)"]
    Predictive --> Action["アラート通知 / 自動的な是正措置"]
    Anomaly --> Action
    GenAI --> Action`,
    fig6: `sequenceDiagram
    participant C as クライアント（自動化ツール）
    participant S as APIサーバ（コントローラ/機器）
    C->>S: HTTPリクエスト送信（GET/POST/PUT/PATCH/DELETE）
    Note right of C: リクエストヘッダーに認証情報、<br/>ボディにJSON形式のデータを含める
    S->>S: 認証・認可を確認する
    S->>S: 要求されたCRUD操作を実行する
    S-->>C: HTTPレスポンスを返却（ステータスコード + JSONデータ）`,
    fig7: `flowchart TB
    PB["Playbook<br/>(YAML形式で望ましい設定手順を記述)"] --> Control["制御ノード<br/>(Ansibleがインストールされた管理端末)"]
    Control -->|SSH（エージェント不要）| N1["管理対象機器1"]
    Control -->|SSH（エージェント不要）| N2["管理対象機器2"]
    Control -->|SSH（エージェント不要）| N3["管理対象機器3"]`,
};
