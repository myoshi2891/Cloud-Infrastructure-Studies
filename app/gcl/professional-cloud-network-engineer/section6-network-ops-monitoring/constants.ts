export type DiagramId = 'diag-1' | 'diag-2' | 'diag-3' | 'diag-4' | 'diag-5' | 'diag-6' | 'diag-7' | 'diag-8' | 'diag-9' | 'diag-10' | 'diag-11' | 'diag-12' | 'diag-13' | 'diag-14' | 'diag-15' | 'diag-16' | 'diag-17' | 'diag-18' | 'diag-19' | 'diag-20';

export const DIAGRAMS: Record<DiagramId, string> = {
    'diag-1': `flowchart TB
    A["ネットワークコンポーネント<br/>VPC/Router/VPN/Interconnect/NAT/DNS/LB/Armor/NCC"] --> B["Task 5.1<br/>Cloud Observabilityで収集する"]
    B --> C{"異常や問い合わせが<br/>発生した"}
    C -->|"Yes"| D["Task 5.2<br/>コンポーネント別に<br/>トラブルシューティングする"]
    C -->|"No(平常時)"| E["Task 5.3<br/>Network Intelligence Centerで<br/>可視化・予防診断する"]
    D --> F["Flow Logs / Firewall Logs /<br/>Packet Mirroringで<br/>根本原因を特定する"]
    E --> G["Connectivity Tests / Network Analyzer /<br/>Firewall Insightsで<br/>構成起因の問題を先回りで検知する"]
    F --> H["是正・再発防止"]
    G --> H
    H --> B`,
    'diag-2': `flowchart LR
    subgraph Sources["ネットワークコンポーネント"]
        direction TB
        S1["Cloud VPN"]
        S2["Cloud Router"]
        S3["VPC Service Controls"]
        S4["Cloud NGFW / VPC Firewall"]
        S5["VPC Flow Logs"]
        S6["Cloud DNS"]
        S7["Cloud NAT"]
        S8["Network Connectivity Center"]
    end

    Sources --> L["Cloud Logging<br/>(Logs Explorer)"]
    Sources --> M["Cloud Monitoring<br/>(Metrics Explorer)"]

    L --> LS1["ログシンク経由でエクスポート<br/>BigQuery / Cloud Storage / Pub/Sub"]
    L --> LS2["ログベースメトリクス /<br/>ログベースアラート"]
    M --> MS1["事前定義ダッシュボード"]
    M --> MS2["カスタムダッシュボード /<br/>アラートポリシー"]
    LS1 --> SIEM["Flow Analyzer / BigQuery分析 /<br/>外部SIEM"]`,
    'diag-3': `flowchart LR
    A["VPCネットワーク内の<br/>パケット"] --> B["サンプリング<br/>(primary sampling rate)"]
    B --> C["5-tuple単位で集約<br/>(aggregation interval)"]
    C --> D["メタデータ注釈付与<br/>(送信元/宛先の名前解決、地理情報など)"]
    D --> E["フィルタリング<br/>(任意)"]
    E --> F["Cloud Logging<br/>(vpc_flows)"]
    F --> G["Logs Explorer /<br/>ログシンクでエクスポート"]
    F --> H["Flow Analyzer<br/>(Log Analytics有効化時)"]`,
    'diag-4': `sequenceDiagram
    participant CR as Cloud Router
    participant Log as Cloud Logging
    participant Peer as オンプレミス/ピアルータ

    CR->>Log: Router event<br/>(Router task activated/de-activated)
    CR->>Peer: BGPセッション確立を試行
    Peer-->>CR: OPEN / KEEPALIVE
    CR->>Log: BGP event<br/>(peering came up X seconds ago)
    CR->>Log: Route event<br/>(Advertising prefix / prefix received)
    Note over CR,Peer: 障害発生
    Peer--xCR: セッション断
    CR->>Log: BGP event<br/>(peering went down, reason: HOLD_TIMER_EXPIRED等)
    CR->>Log: Route event<br/>(Withdrawing prefix)`,
    'diag-5': `flowchart TB
    A["サービスへのAPIリクエスト"] --> B{"サービス境界を<br/>越えるか"}
    B -->|"No"| C["通常どおり処理"]
    B -->|"Yes"| D{"アクセスレベル/<br/>Ingress-Egressルールで<br/>許可されているか"}
    D -->|"Yes"| C
    D -->|"No"| E["アクセス拒否<br/>(トラブルシューティングトークンを生成)"]
    E --> F["Cloud Audit Logsに記録<br/>(VpcServiceControlAuditMetadata)"]
    F --> G["Violation Dashboardで集約<br/>(組織レベルのログシンクが必要)"]
    F --> H["Violation Analyzerで<br/>トラブルシューティングトークンから原因を診断"]`,
    'diag-6': `flowchart TB
    subgraph Metrics["自動収集されるメトリクス"]
        M1["Cloud VPN<br/>トンネル単位のbytes/packets"]
        M2["Cloud Interconnect<br/>物理接続 + VLANアタッチメント"]
        M3["Cloud Router<br/>ルータ単位 + BGPセッション単位"]
        M4["ロードバランサ<br/>request_count / latencies / response_code"]
        M5["Cloud Armor<br/>ポリシー単位のリクエスト・ブロック数"]
        M6["Cloud NAT<br/>ゲートウェイ単位の使用率・ドロップ数"]
    end
    Metrics --> CM["Cloud Monitoring"]
    CM --> D1["事前定義ダッシュボード<br/>(各コンソール画面のMonitoringタブ)"]
    CM --> D2["Metrics Explorer /<br/>カスタムダッシュボード"]
    CM --> D3["アラートポリシー<br/>(通知チャネル経由)"]`,
    'diag-7': `flowchart LR
    A["物理層<br/>(Interconnect接続の稼働状態・光レベル)"] --> D["障害/劣化の切り分け"]
    B["論理層<br/>(VLANアタッチメントの帯域・パケット数)"] --> D
    C["ルーティング層<br/>(BGPセッションの状態・経路数)"] --> D
    D --> E["対応: キャリア/コロケーション連携、<br/>帯域増強、BGP設定修正など"]`,
    'diag-8': `stateDiagram-v2
    [*] --> ACTIVE
    ACTIVE --> DRAINING: バックエンドグループから<br/>VM/エンドポイントを削除
    DRAINING --> DRAINING: 既存リクエストは<br/>タイムアウトまで継続処理<br/>(新規接続は送られない)
    DRAINING --> REMOVED: drainingTimeoutSecの経過、<br/>または全接続の完了
    REMOVED --> [*]`,
    'diag-9': `flowchart TB
    A["VPNトンネルが<br/>ESTABLISHEDにならない/<br/>不安定"] --> B{"トンネルステータスの<br/>アイコンにエラーメッセージは<br/>表示されているか"}
    B -->|"Yes"| C["エラーメッセージから<br/>原因を特定<br/>(IKE/PSK/ピアIP不正など)"]
    B -->|"No/不明"| D["Cloud VPNログを確認<br/>(自動収集済み)"]
    D --> E{"SA_DELETE直後に<br/>再接続している形跡は<br/>あるか"}
    E -->|"Yes"| F["オンプレミス側がrekeyingではなく<br/>SA削除後の再ネゴシエートに<br/>なっていないか確認"]
    E -->|"No"| G["IKE暗号スイート/PSK/<br/>ピアIPアドレスの整合性を確認<br/>(RFC5735/5737の予約IPでないかも確認)"]
    C --> H{"BGPセッションは<br/>ESTABLISHEDか"}
    F --> H
    G --> H
    H -->|"No"| I["Cloud Router側の<br/>BGPトラブルシューティングへ<br/>(2.4節)"]
    H -->|"Yes"| J["トンネル層は正常<br/>アプリケーション層/<br/>ルーティング層を調査"]`,
    'diag-10': `stateDiagram-v2
    [*] --> Idle
    Idle --> Connect: セッション開始
    Connect --> Active: TCP接続失敗
    Connect --> OpenSent: TCP接続成功、OPEN送信
    Active --> Connect: 再試行
    OpenSent --> OpenConfirm: 相手からOPEN受信
    OpenSent --> Idle: エラー/NOTIFICATION受信
    OpenConfirm --> Established: KEEPALIVE受信
    OpenConfirm --> Idle: エラー/NOTIFICATION受信
    Established --> Idle: HOLD_TIMER_EXPIRED/<br/>LINK_DOWN/手動無効化など
    Established --> [*]: 正常運用継続`,
    'diag-11': `stateDiagram-v2
    [*] --> AdminDown: BFD無効
    [*] --> Down: BFD有効化直後
    Down --> Init: ローカルが相手を検知
    Init --> Up: 相手からの確認を受信
    Up --> Down: 検知タイマーの<br/>タイムアウト
    AdminDown --> Down: BFD再有効化`,
    'diag-12': `flowchart TB
    A["通信の疎通/性能に<br/>関する問い合わせ"] --> B{"通信自体が<br/>届いているか<br/>(Flow Logs)"}
    B -->|"届いていない"| C{"ファイアウォールで<br/>拒否されているか<br/>(Firewall Logs)"}
    C -->|"Deny hit あり"| D["該当ルールを特定し<br/>意図した挙動か確認<br/>(Firewall Insightsも活用)"]
    C -->|"Deny hit なし"| E["ルーティング/<br/>Connectivity Testsで<br/>経路を確認"]
    B -->|"届いているが<br/>アプリ層で問題"| F["Packet Mirroringで<br/>パケット内容を収集し<br/>アプリ/プロトコルを詳細分析"]
    D --> G["是正"]
    E --> G
    F --> G`,
    'diag-13': `flowchart LR
    A["ミラーリング対象<br/>(VMインスタンスのNIC)"] -->|"ポリシーで指定<br/>(タグ/サブネット単位)"| B["Packet Mirroringポリシー"]
    B --> C["コレクタ宛先<br/>(内部パススルーNLBの<br/>フォワーディングルール)"]
    C --> D["コレクタインスタンス群<br/>(推奨: マネージドインスタンスグループ)"]
    D --> E["収集・解析<br/>(IDS/IPS、パケットキャプチャ分析ツールなど)"]`,
    'diag-14': `flowchart TB
    NIC["Network Intelligence Center"] --> M1["Network Topology<br/>トポロジ可視化"]
    NIC --> M2["Connectivity Tests<br/>疎通診断"]
    NIC --> M3["Performance Dashboard<br/>パケットロス・レイテンシ"]
    NIC --> M4["Firewall Insights<br/>ファイアウォールルール最適化"]
    NIC --> M5["Network Analyzer<br/>構成の自動監視・誤設定検知"]
    NIC --> M6["Flow Analyzer<br/>Flow Logsの高速分析"]

    M1 -.->|"問題箇所の当たりをつける"| M2
    M2 -.->|"設定起因の不通を特定"| M5
    M5 -.->|"検知したインサイトを深掘り"| M6
    M3 -.->|"性能劣化の切り分け"| M2
    M4 -.->|"ルール最適化"| M5`,
    'diag-15': `flowchart TB
    A["Connectivity Testの作成<br/>(送信元・宛先・プロトコル・ポート)"] --> B["構成分析<br/>(configuration analysis)"]
    B --> C{"複数の経路<br/>(トレース)が<br/>存在するか"}
    C -->|"1本のみ"| D["トレースの最終状態が<br/>そのまま総合結果になる"]
    C -->|"複数本<br/>(例: LBの背後に<br/>複数バックエンド)"| E["各トレースの最終状態の<br/>分布から総合結果を算出"]
    D --> F["総合到達性(overall reachability result)"]
    E --> F
    F --> G{"対応シナリオでは<br/>データプレーン検証も<br/>実行可能"}
    G -->|"Yes"| H["実際にプローブパケットを送信し、<br/>レイテンシ・パケットロスの<br/>ベースラインを取得"]
    G -->|"No"| I["構成分析結果のみで判断"]`,
    'diag-16': `flowchart LR
    A["Performance Dashboard"] --> B["プロジェクトパフォーマンスビュー"]
    A --> C["Google Cloud全体パフォーマンスビュー"]
    B --> B1["自分のVM間の<br/>パケットロス(能動プロービング)"]
    B --> B2["実トラフィックに基づく<br/>レイテンシ(TCP SEQ/ACK計測)"]
    C --> C1["全ゾーンペア間の<br/>パケットロス"]
    C --> C2["リージョン⇔インターネット拠点間の<br/>レイテンシ中央値"]
    B1 --> D["ヒートマップ/<br/>サマリチャートで表示<br/>(最大6週間の履歴)"]
    B2 --> D
    C1 --> D
    C2 --> D`,
    'diag-17': `flowchart TB
    FI["Firewall Insights"] --> T1["シャドウルール<br/>(shadowed rule)"]
    FI --> T2["過度に寛容なルール<br/>(overly permissive rule)"]
    FI --> T3["拒否ルールのヒット<br/>(deny rule insight)"]

    T1 --> T1a["構成情報のみから判定可能<br/>(ロギング不要)"]
    T2 --> T2a["ヒットなしのAllowルール"]
    T2 --> T2b["未使用の属性を持つルール"]
    T2 --> T2c["過度に広いIP/ポートレンジ"]
    T2 --> T2d["適応的分析による<br/>陳腐化予測(機械学習)"]
    T3 --> T3a["観測期間中にヒットした<br/>Denyルールの詳細"]

    T2a -.->|"Firewall Rules Logging<br/>のデータが必要"| Log["ロギング有効化"]
    T2b -.-> Log
    T2c -.-> Log
    T3a -.-> Log`,
    'diag-18': `flowchart TB
    NA["Network Analyzer<br/>インサイトグループ"] --> G1["VPCネットワーク<br/>IPアドレス/ルート/ファイアウォール/<br/>VPC Peering/Shared VPC"]
    NA --> G2["ネットワークサービス<br/>ロードバランサ/Cloud NAT"]
    NA --> G3["ハイブリッド接続<br/>Cloud VPN/Interconnect/<br/>Cloud Router/BGP/NCC"]
    NA --> G4["GKE<br/>ノード⇔コントロールプレーン疎通/<br/>Pod IP使用率/ベストプラクティス"]
    NA --> G5["マネージドサービス<br/>Cloud SQLなどへの接続性"]`,
    'diag-19': `flowchart TB
    A["VPC Flow Logsを<br/>ログバケットに格納"] --> B["ログバケットを<br/>Observability Analytics用に<br/>アップグレード"]
    B --> C["Flow Analyzerで<br/>集計方法・時間範囲を選択"]
    C --> D["Organize Flows by<br/>(例: VPCサブネットワーク/IP/ポート)で<br/>グルーピング"]
    D --> E["Highest data flowsチャート /<br/>All data flowsテーブルで<br/>結果を確認"]
    E --> F["特定のフローを<br/>ドリルダウン<br/>(送信元/宛先/トラフィック量の詳細)"]
    F --> G["さらに他のフィールドで<br/>分割してドリルダウン"]`,
    'diag-20': `flowchart TB
    Start(["ネットワーク障害・性能劣化の<br/>アラートまたは問い合わせ"]) --> Q1{"影響範囲は<br/>特定エンドポイント間か、<br/>広範囲か"}

    Q1 -->|"特定のA-B間"| CT["Connectivity Testsで<br/>構成分析を実行(3.3)"]
    Q1 -->|"広範囲/不明"| NT["Network Topologyで<br/>トラフィック全体を俯瞰(3.2)"]

    NT --> Q2{"特定のコンポーネントに<br/>異常が見えるか"}
    Q2 -->|"Yes"| Route["該当コンポーネントの<br/>ログ・メトリクスへ(Part 1)"]
    Q2 -->|"No"| PD["Performance Dashboardで<br/>パケットロス/レイテンシを確認(3.4)"]

    CT --> Q3{"結果は<br/>Unreachable/Ambiguousか"}
    Q3 -->|"Yes"| FL["VPC Flow Logs /<br/>Firewall Logsで実トラフィックを確認(2.5)"]
    Q3 -->|"No(Reachable)"| PD

    PD --> Q4{"パケットロス/レイテンシが<br/>Google Cloud平均から<br/>逸脱しているか"}
    Q4 -->|"Yes"| Route
    Q4 -->|"No"| App["アプリケーション側の<br/>問題を疑う"]

    FL --> Q5{"ファイアウォールの<br/>Denyヒットが原因か"}
    Q5 -->|"Yes"| FI["Firewall Insightsで<br/>ルールの妥当性を検証(3.5)"]
    Q5 -->|"No"| PM["Packet Mirroringで<br/>ペイロードレベルの分析(2.5)"]

    Route --> Q6{"VPN/Interconnect/<br/>Cloud RouterのBGPが<br/>関係するか"}
    Q6 -->|"Yes"| BGP["2.2〜2.4節の手順で<br/>トンネル/物理層/BGPを切り分け"]
    Q6 -->|"No"| Other["該当コンポーネントの<br/>ログ・メトリクスで直接調査"]

    FI --> Fix["是正・ルール修正"]
    PM --> Fix
    BGP --> Fix
    Other --> Fix
    App --> Fix

    Fix --> NA["Network Analyzerで<br/>再発防止の構成チェックを<br/>定期実行(3.6)"]
    NA --> End(["恒久対応・<br/>ランブック更新"])`,
};

export interface NavItem {
    id: string;
    label: string;
    isH3?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
    {
        "id": "この記事についてスコープ対応表",
        "label": "この記事について(スコープ対応表)",
        "isH3": false
    },
    {
        "id": "全体像",
        "label": "全体像",
        "isH3": false
    },
    {
        "id": "part-1-google-cloud-observabilityによるロギングとモニタリングtask-51",
        "label": "Part 1: Google Cloud Observabilityによるロギングとモニタリング(Task 5.1)",
        "isH3": false
    },
    {
        "id": "11-google-cloud-observabilityの基本構造",
        "label": "1.1 Google Cloud Observabilityの基本構造",
        "isH3": true
    },
    {
        "id": "12-ネットワークコンポーネント別ロギング",
        "label": "1.2 ネットワークコンポーネント別ロギング",
        "isH3": true
    },
    {
        "id": "13-ネットワークメトリクスのモニタリング",
        "label": "1.3 ネットワークメトリクスのモニタリング",
        "isH3": true
    },
    {
        "id": "14-task-51-設計運用チェックリスト",
        "label": "1.4 Task 5.1 設計・運用チェックリスト",
        "isH3": true
    },
    {
        "id": "part-2-接続性の維持とトラブルシューティングtask-52",
        "label": "Part 2: 接続性の維持とトラブルシューティング(Task 5.2)",
        "isH3": false
    },
    {
        "id": "21-application-load-balancerでのトラフィックドレインリダイレクト",
        "label": "2.1 Application Load Balancerでのトラフィックドレイン・リダイレクト",
        "isH3": true
    },
    {
        "id": "22-cloud-vpnの管理とトラブルシューティング",
        "label": "2.2 Cloud VPNの管理とトラブルシューティング",
        "isH3": true
    },
    {
        "id": "23-cloud-interconnectの管理とトラブルシューティング",
        "label": "2.3 Cloud Interconnectの管理とトラブルシューティング",
        "isH3": true
    },
    {
        "id": "24-cloud-routerのbgpピアリングのトラブルシューティング",
        "label": "2.4 Cloud RouterのBGPピアリングのトラブルシューティング",
        "isH3": true
    },
    {
        "id": "25-vpc-flow-logsファイアウォールログpacket-mirroringを使ったトラブルシューティング",
        "label": "2.5 VPC Flow Logs・ファイアウォールログ・Packet Mirroringを使ったトラブルシューティング",
        "isH3": true
    },
    {
        "id": "26-task-52-トラブルシューティングチェックリスト",
        "label": "2.6 Task 5.2 トラブルシューティングチェックリスト",
        "isH3": true
    },
    {
        "id": "part-3-network-intelligence-centerによる監視とトラブルシューティングtask-53",
        "label": "Part 3: Network Intelligence Centerによる監視とトラブルシューティング(Task 5.3)",
        "isH3": false
    },
    {
        "id": "31-network-intelligence-centerの全体像",
        "label": "3.1 Network Intelligence Centerの全体像",
        "isH3": true
    },
    {
        "id": "32-network-topology",
        "label": "3.2 Network Topology",
        "isH3": true
    },
    {
        "id": "33-connectivity-tests",
        "label": "3.3 Connectivity Tests",
        "isH3": true
    },
    {
        "id": "34-performance-dashboard",
        "label": "3.4 Performance Dashboard",
        "isH3": true
    },
    {
        "id": "35-firewall-insights",
        "label": "3.5 Firewall Insights",
        "isH3": true
    },
    {
        "id": "36-network-analyzer",
        "label": "3.6 Network Analyzer",
        "isH3": true
    },
    {
        "id": "37-flow-analyzer",
        "label": "3.7 Flow Analyzer",
        "isH3": true
    },
    {
        "id": "38-task-53-活用チェックリスト",
        "label": "3.8 Task 5.3 活用チェックリスト",
        "isH3": true
    },
    {
        "id": "総合トラブルシューティングワークフロー",
        "label": "総合トラブルシューティングワークフロー",
        "isH3": false
    },
    {
        "id": "参考文献",
        "label": "参考文献",
        "isH3": false
    },
    {
        "id": "公式認定試験ガイド",
        "label": "公式認定・試験ガイド",
        "isH3": true
    },
    {
        "id": "cloud-logging--cloud-monitoring基盤コンポーネント別ロギング",
        "label": "Cloud Logging / Cloud Monitoring基盤・コンポーネント別ロギング",
        "isH3": true
    },
    {
        "id": "ハイブリッド接続cloud-vpn--cloud-interconnect--cloud-routerのモニタリングとトラブルシューティング",
        "label": "ハイブリッド接続(Cloud VPN / Cloud Interconnect / Cloud Router)のモニタリングとトラブルシューティング",
        "isH3": true
    },
    {
        "id": "ロードバランシングトラフィック管理",
        "label": "ロードバランシング・トラフィック管理",
        "isH3": true
    },
    {
        "id": "vpc-flow-logspacket-mirroringによるトラブルシューティング",
        "label": "VPC Flow Logs・Packet Mirroringによるトラブルシューティング",
        "isH3": true
    },
    {
        "id": "network-intelligence-center",
        "label": "Network Intelligence Center",
        "isH3": true
    }
];
