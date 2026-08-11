export interface NavItem {
    id: string;
    title: string;
    step?: string;
}

export const NAV_ITEMS: NavItem[] = [
    { id: 'overview', title: 'はじめに：このガイドの位置づけ' },
    { id: 'step0', title: 'Network Fundamentalsドメインの全体像', step: 'Step 0' },
    { id: 'step1', title: 'MACアドレスとVLAN（6.1）', step: 'Step 1' },
    { id: 'step2', title: 'IPアドレス・ルート・サブネット・GW（6.2）', step: 'Step 2' },
    { id: 'step3', title: 'ネットワーク機器の役割（6.3）', step: 'Step 3' },
    { id: 'step4', title: 'ネットワークトポロジ図の読み方（6.4）', step: 'Step 4' },
    { id: 'step5', title: 'Management / Data / Control Plane（6.5）', step: 'Step 5' },
    { id: 'step6', title: 'IPサービス（DHCP・DNS・NAT等）（6.6）', step: 'Step 6' },
    { id: 'step7', title: 'プロトコルとポート番号（6.7）', step: 'Step 7' },
    { id: 'step8', title: 'アプリケーション接続トラブル診断（6.8）', step: 'Step 8' },
    { id: 'step9', title: 'ネットワーク制約がアプリに与える影響（6.9）', step: 'Step 9' },
    { id: 'summary', title: 'まとめ：学習のポイント' },
    { id: 'references', title: '参考情報源' },
];

export const DIAGRAMS: Record<string, string> = {
    'diagram-0': `flowchart TB
    A["6.0 Network Fundamentals<br/>（出題比率 15%）"] --> B["基礎知識<br/>6.1 MAC/VLAN　6.2 IPアドレス系"]
    B --> C["機器とトポロジ<br/>6.3 ネットワーク機器　6.4 トポロジ図の解読"]
    C --> D["機器内部の仕組み<br/>6.5 Management/Data/Control Plane"]
    D --> E["ネットワークサービス<br/>6.6 IPサービス　6.7 ポート番号"]
    E --> F["トラブルシューティング<br/>6.8 接続診断　6.9 制約の影響"]`,

    'diagram-1': `flowchart TB
    subgraph SW["L2スイッチ"]
        direction TB
        P1["ポート1-4<br/>VLAN 10（営業部）"]
        P2["ポート5-8<br/>VLAN 20（開発部）"]
    end
    PC1["PC（営業部）"] --> P1
    PC2["PC（営業部）"] --> P1
    PC3["PC（開発部）"] --> P2
    PC4["PC（開発部）"] --> P2
    P1 -.->|"同じスイッチでも直接通信不可"| P2`,

    'diagram-2': `flowchart TB
    subgraph NetA["ネットワークA：192.168.1.0/24"]
        PCA["PC-A<br/>192.168.1.10"]
        GWA["デフォルトゲートウェイ<br/>192.168.1.1"]
    end
    subgraph NetB["ネットワークB：192.168.2.0/24"]
        GWB["デフォルトゲートウェイ<br/>192.168.2.1"]
        PCB["PC-B<br/>192.168.2.10"]
    end
    PCA -->|"①別ネットワーク宛てなのでGWへ送る"| GWA
    GWA -->|"②ルーティングテーブルを参照して転送"| GWB
    GWB -->|"③宛先ネットワークへ届ける"| PCB`,

    'diagram-3': `flowchart TB
    Client["クライアントPC"] --> SW1["L2スイッチ"]
    SW1 --> RTR["ルーター"]
    RTR --> FW["ファイアウォール"]
    FW --> LB["ロードバランサー<br/>仮想IP 203.0.113.10:443"]
    LB --> SRV1["Webサーバー1<br/>10.0.1.11:8080"]
    LB --> SRV2["Webサーバー2<br/>10.0.1.12:8080"]`,

    'diagram-4': `flowchart TB
    subgraph Device["ネットワーク機器（ルーター/スイッチ）"]
        direction TB
        MP["Management Plane<br/>SSH・SNMP・NETCONFによる設定/監視"]
        CP["Control Plane<br/>ルーティングプロトコル・MACアドレス学習"]
        DP["Data Plane<br/>実際のパケット/フレーム転送"]
        MP ~~~ CP
        CP ~~~ DP
    end`,

    'diagram-5': `sequenceDiagram
    participant Client as クライアントPC
    participant Server as DHCPサーバー
    Client->>Server: ① Discover（ブロードキャストで探索）
    Server->>Client: ② Offer（IPアドレス候補を提示）
    Client->>Server: ③ Request（提示されたIPアドレスを要求）
    Server->>Client: ④ ACK（割り当てを確定）`,

    'diagram-6': `sequenceDiagram
    participant PC as クライアントPC
    participant Resolver as DNSキャッシュサーバー
    participant Root as ルートDNSサーバー
    participant TLD as .comサーバー
    participant Auth as 権威DNSサーバー
    PC->>Resolver: www.example.com のIPアドレスは？
    Resolver->>Root: 問い合わせ
    Root-->>Resolver: .comサーバーの場所を回答
    Resolver->>TLD: 問い合わせ
    TLD-->>Resolver: 権威DNSサーバーの場所を回答
    Resolver->>Auth: 問い合わせ
    Auth-->>Resolver: IPアドレスを回答
    Resolver-->>PC: IPアドレスを返す`,

    'diagram-7': `flowchart LR
    PC["社内PC<br/>10.0.0.5:50000"] --> RTR["ルーター（NAT）<br/>変換テーブルを保持"]
    RTR --> INET["インターネット側<br/>送信元：203.0.113.1:60001"]`,

    'diagram-8': `flowchart LR
    NMS["監視サーバー（NMS）"] -->|"①ポーリング（Get/GetNext）"| Device["ネットワーク機器<br/>（SNMPエージェント）"]
    Device -->|"②応答"| NMS
    Device -.->|"③Trap（異常時に自発通知）"| NMS`,

    'diagram-9': `flowchart TB
    S0["Stratum 0<br/>原子時計・GPS等の高精度時刻源"] --> S1["Stratum 1<br/>NTPサーバー"]
    S1 --> S2["Stratum 2<br/>社内NTPサーバー"]
    S2 --> S3["Stratum 3<br/>各クライアント機器"]`,

    'diagram-10': `flowchart TB
    Start["アプリケーションに接続できない"] --> Q1{"宛先IPへのping/tracerouteは通るか？"}
    Q1 -->|"通らない"| A1["経路上のルーティング・ACLによる<br/>遮断を疑う"]
    Q1 -->|"通る"| Q2{"対象ポートへの接続テストは成功するか？"}
    Q2 -->|"失敗"| A2["Transport Port Blocked<br/>（FW/ACLによるポート遮断）"]
    Q2 -->|"成功"| Q3{"社内⇔社外をまたぐ通信か？"}
    Q3 -->|"はい"| Q4{"NAT変換後のアドレスで正しく到達できるか？"}
    Q4 -->|"いいえ"| A3["NAT Problem<br/>（変換設定の誤り・アドレス枯渇）"]
    Q4 -->|"はい"| Q5{"プロキシ経由の通信か？"}
    Q3 -->|"いいえ"| Q5
    Q5 -->|"はい"| A4["Proxy設定の問題<br/>（認証・除外設定の誤り）"]
    Q5 -->|"いいえ"| Q6{"VPN経由の通信か？"}
    Q6 -->|"はい"| A5["VPN Problem<br/>（トンネル未確立・ルート未配布）"]
    Q6 -->|"いいえ"| A6["アプリケーション層の問題<br/>（DNS誤設定・証明書エラー等）を確認"]`,
};
