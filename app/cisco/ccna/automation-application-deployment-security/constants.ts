export interface NavItem {
    id: string;
    title: string;
}

export const NAVBAR_ITEMS: NavItem[] = [
    { id: 'chapter1', title: '第1章 出題範囲の全体像' },
    { id: 'chapter2', title: '第2章 エッジ・展開モデル（4.1・4.2）' },
    { id: 'chapter3', title: '第3章 実行環境の比較（4.3）' },
    { id: 'chapter4', title: '第4章 CI/CDパイプライン（4.4）' },
    { id: 'chapter5', title: '第5章 Pythonユニットテスト（4.5）' },
    { id: 'chapter6', title: '第6章 Dockerfile・イメージ（4.6・4.7）' },
    { id: 'chapter7', title: '第7章 セキュリティ基礎（4.8）' },
    { id: 'chapter8', title: '第8章 ネットワーク境界セキュリティ（4.9）' },
    { id: 'chapter9', title: '第9章 OWASPトップの脅威（4.10）' },
    { id: 'chapter10', title: '第10章 Bashコマンドの活用（4.11）' },
    { id: 'chapter11', title: '第11章 DevOpsの原則（4.12）' },
    { id: 'chapter12', title: '第12章 まとめ：早見表' },
    { id: 'references', title: '参考文献・出典' },
];

export const DIAGRAMS: Record<string, string> = {
    'diag-0': `flowchart TB
    EXAM["200-901 CCNAAUTO 試験 (120分)"]
    D1["1.0 Software Development and Design (15%)"]
    D2["2.0 Understanding and Using APIs (20%)"]
    D3["3.0 Cisco Platforms and Development (15%)"]
    D4["4.0 Application Deployment and Security (15%)"]
    D5["5.0 Infrastructure and Automation (20%)"]
    D6["6.0 Network Fundamentals (15%)"]
    EXAM --> D1
    EXAM --> D2
    EXAM --> D3
    EXAM --> D4
    EXAM --> D5
    EXAM --> D6
    D1 ~~~ D2 ~~~ D3 ~~~ D4 ~~~ D5 ~~~ D6
    style D4 fill:#ffe08a,stroke:#d99a00,stroke-width:2px,color:#241a00`,

    'diag-1': `flowchart TB
    IoT["IoTデバイス / 店舗POS / センサー"]
    EdgeNode["エッジサーバー (現地で低遅延処理)"]
    Pub["パブリッククラウド"]
    Priv["プライベートクラウド"]
    Hyb["ハイブリッドクラウド構成"]

    IoT --> EdgeNode
    EdgeNode -->|"集約データのみ送信"| Pub
    EdgeNode -.->|"機密データは社内で保持"| Priv
    Priv <--> Pub
    Priv --- Hyb
    Pub --- Hyb`,

    'diag-2': `flowchart TB
    subgraph BareMetal["ベアメタル"]
        direction TB
        BM_App["アプリケーション"]
        BM_OS["OS (ホストに直接インストール)"]
        BM_HW["物理ハードウェア"]
        BM_App --> BM_OS --> BM_HW
    end

    subgraph VM["仮想マシン"]
        direction TB
        VM_App["アプリケーション"]
        VM_GuestOS["ゲストOS (複数台分)"]
        VM_Hyper["ハイパーバイザー"]
        VM_HW["物理ハードウェア"]
        VM_App --> VM_GuestOS --> VM_Hyper --> VM_HW
    end

    subgraph Container["コンテナ"]
        direction TB
        C_App["アプリケーション"]
        C_Engine["コンテナエンジン (Dockerなど)"]
        C_OS["ホストOS (共有)"]
        C_HW["物理ハードウェア"]
        C_App --> C_Engine --> C_OS --> C_HW
    end

    BareMetal ~~~ VM ~~~ Container`,

    'diag-3': `flowchart TB
    Dev["開発者がコードをコミット"] --> VCS["バージョン管理システム (Git)"]
    VCS --> Build["ビルドステージ (依存関係解決・コンパイル)"]
    Build --> Test["自動テストステージ (ユニット・統合テスト)"]
    Test -->|"成功"| Package["アーティファクト作成 (コンテナイメージ等)"]
    Test -->|"失敗"| Dev
    Package --> Registry["イメージ / パッケージレジストリ"]
    Registry --> DeployStg["ステージング環境へ自動展開"]
    DeployStg --> Approve["承認 / 追加テスト"]
    Approve -->|"承認"| DeployProd["本番環境へ展開"]
    Approve -->|"却下"| Dev
    DeployProd --> Monitor["監視・フィードバック収集"]
    Monitor -.->|"改善点を反映"| Dev`,

    'diag-4': `flowchart TB
    Start["テスト対象の関数を用意"] --> Arrange["Arrange: テストデータ・前提条件を準備"]
    Arrange --> Act["Act: テスト対象の関数を実行"]
    Act --> Assert["Assert: 期待した結果と実際の結果を比較"]
    Assert -->|"一致"| Pass["テスト成功 (PASS)"]
    Assert -->|"不一致"| Fail["テスト失敗 (FAIL) 原因を調査"]`,

    'diag-5': `flowchart TB
    Dockerfile["Dockerfileを作成"] --> Build["docker buildでイメージを生成"]
    Build --> LocalImage["ローカルイメージ (docker imagesで確認)"]
    LocalImage --> Run["docker runでコンテナ起動"]
    Run --> Container["稼働中のコンテナ (docker psで確認)"]
    Container -->|"docker stop"| Stopped["停止したコンテナ"]
    LocalImage -->|"docker push"| Registry["イメージレジストリ (Docker Hub等)"]
    Registry -->|"docker pull"| LocalImage`,

    'diag-6': `flowchart TB
    Client["クライアント (ブラウザ / アプリ)"] -->|"HTTPS (TLSで暗号化)"| LB["ロードバランサー"]
    LB -->|"内部ネットワーク"| App["アプリケーションサーバー"]
    App -->|"シークレットを取得 (コードに直書きしない)"| Vault["シークレット管理 (Vault等)"]
    App -->|"暗号化して書き込み"| DB["データベース (保存時暗号化)"]
    DB -->|"復号して返却"| App`,

    'diag-7': `flowchart TB
    User["ユーザー"] --> DNS["DNSで名前解決 (ドメイン IPアドレス)"]
    DNS --> FW["ファイアウォール (不要な通信を遮断)"]
    FW --> LB["ロードバランサー (複数サーバーへ振り分け)"]
    LB --> RP["リバースプロキシ (TLS終端・キャッシュ・経路制御)"]
    RP --> Srv1["アプリケーションサーバー1"]
    RP --> Srv2["アプリケーションサーバー2"]`,

    'diag-8': `flowchart TB
    Top["OWASP Top 10:2025<br/>A05:2025 Injection"] --> Input
    Input["ユーザー入力 (フォーム・URLパラメータ等)"] --> Validate{"入力を検証・サニタイズしているか？"}
    Validate -->|"していない"| Risk1["SQLインジェクションのリスク (意図しないSQL文が実行される)"]
    Validate -->|"していない"| Risk2["XSSのリスク (悪意あるスクリプトが実行される)"]
    Validate -->|"している"| Safe["安全な処理へ"]
    Session["認証済みユーザーのセッション"] --> CSRFCheck{"CSRFトークンを検証しているか？"}
    CSRFCheck -->|"していない"| Risk3["CSRFのリスク (意図しないリクエストが実行される)"]
    CSRFCheck -->|"している"| Safe`,

    'diag-9': `flowchart TB
    Plan["Plan: 計画"] --> Code["Code: コーディング"]
    Code --> Build["Build: ビルド"]
    Build --> Test["Test: テスト"]
    Test --> Release["Release: リリース準備"]
    Release --> Deploy["Deploy: 展開"]
    Deploy --> Operate["Operate: 運用"]
    Operate --> Monitor["Monitor: 監視"]
    Monitor -.->|"フィードバック"| Plan`,
};
