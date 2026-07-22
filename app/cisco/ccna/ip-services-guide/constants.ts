export const DIAGRAMS = {
    overview: `flowchart TB
    A["4.0 IP Services<br/>（試験の10%）"] --> B["4.1 NAT<br/>静的/プール"]
    A --> C["4.2 NTP<br/>時刻同期"]
    A --> D["4.3 DHCP と DNS<br/>の役割"]
    A --> E["4.4 SNMP<br/>監視"]
    A --> F["4.5 Syslog<br/>ログ管理"]
    A --> G["4.6 DHCP<br/>クライアント/リレー"]
    A --> H["4.7 QoS PHB<br/>分類・マーキング等"]
    A --> I["4.8 SSH<br/>リモートアクセス"]
    A --> J["4.9 TFTP/FTP<br/>ファイル転送"]
    style A fill:#1f4e79,color:#fff
    style B fill:#2c5f8a,color:#fff
    style C fill:#2c5f8a,color:#fff
    style D fill:#2c5f8a,color:#fff
    style E fill:#2c5f8a,color:#fff
    style F fill:#2c5f8a,color:#fff
    style G fill:#2c5f8a,color:#fff
    style H fill:#2c5f8a,color:#fff
    style I fill:#2c5f8a,color:#fff
    style J fill:#2c5f8a,color:#fff`,

    staticNat: `flowchart LR
    subgraph Inside["社内ネットワーク（Inside）"]
        PC["Webサーバー<br/>192.168.1.10"]
    end
    subgraph RouterBox["ルーター（NATデバイス）"]
        NAT["静的マッピングテーブル<br/>192.168.1.10 ⇔ 203.0.113.10"]
    end
    subgraph Outside["インターネット（Outside）"]
        Client["外部クライアント"]
    end
    PC -->|"送信元: 192.168.1.10"| NAT
    NAT -->|"送信元を変換: 203.0.113.10"| Client
    Client -->|"宛先: 203.0.113.10"| NAT
    NAT -->|"宛先を変換: 192.168.1.10"| PC`,

    dynamicNat: `flowchart LR
    subgraph Inside2["社内ネットワーク"]
        PC1["PC-A<br/>192.168.1.11"]
        PC2["PC-B<br/>192.168.1.12"]
        PC3["PC-C<br/>192.168.1.13"]
    end
    subgraph Pool["グローバルアドレスプール"]
        P["203.0.113.20 〜 203.0.113.29"]
    end
    subgraph Outside2["インターネット"]
        Server["外部サーバー"]
    end
    PC1 -.->|"空きアドレスを動的割当"| Pool
    PC2 -.->|"空きアドレスを動的割当"| Pool
    PC3 -.->|"プール枯渇時は待機/破棄"| Pool
    Pool --> Server`,

    ntpStratum: `flowchart TB
    S0["Stratum 0<br/>原子時計・GPS受信機"]
    S1["Stratum 1<br/>Stratum 0に直結したNTPサーバー"]
    S2["Stratum 2<br/>社内NTPサーバー"]
    S3["Stratum 3<br/>ルーター・スイッチ（NTPクライアント）"]
    S0 --> S1
    S1 --> S2
    S2 --> S3
    style S0 fill:#1f4e79,color:#fff
    style S1 fill:#2c5f8a,color:#fff
    style S2 fill:#3d7ab5,color:#fff
    style S3 fill:#5a94cc,color:#fff`,

    dhcpDora: `sequenceDiagram
    participant Client as クライアント
    participant Server as DHCPサーバー
    Client->>Server: ① DHCP Discover（ブロードキャスト：誰かサーバーいますか？）
    Server->>Client: ② DHCP Offer（このアドレスはどうですか？）
    Client->>Server: ③ DHCP Request（そのアドレスをください、とブロードキャストで要求）
    Server->>Client: ④ DHCP Ack（承認。リース期間開始）`,

    dnsFlow: `sequenceDiagram
    participant PC as クライアントPC
    participant Resolver as DNSリゾルバ（社内/ISP）
    participant Root as ルートDNSサーバー
    participant TLD as .comのTLDサーバー
    participant Auth as example.comの権威DNSサーバー
    PC->>Resolver: www.example.com のIPは？
    Resolver->>Root: .com はどこ？
    Root-->>Resolver: .comのTLDサーバーはこちら
    Resolver->>TLD: example.com はどこ？
    TLD-->>Resolver: example.comの権威サーバーはこちら
    Resolver->>Auth: www.example.com のIPは？
    Auth-->>Resolver: 203.0.113.50 です
    Resolver-->>PC: 203.0.113.50 です（結果をキャッシュ）`,

    snmpFlow: `flowchart LR
    subgraph NMSBox["NMS（管理ステーション）"]
        M["監視ソフトウェア"]
    end
    subgraph Device["ネットワーク機器（エージェント）"]
        A["SNMPエージェント"]
    end
    M -->|"① GET：情報を取得したい"| A
    A -->|"② GET Response：値を返す"| M
    M -->|"③ SET：設定値を変更したい"| A
    A -->|"④ TRAP：異常発生時、自発的に通知"| M`,

    syslogFlow: `flowchart LR
    R1["ルーター"] -->|"UDP/514で送信"| S["Syslogサーバー<br/>（集中ログ管理）"]
    SW["スイッチ"] -->|"UDP/514で送信"| S
    FW["ファイアウォール"] -->|"UDP/514で送信"| S
    S --> Analyst["運用担当者が<br/>一元的に分析"]`,

    dhcpRelay: `flowchart LR
    subgraph SubnetA["サブネットA（クライアント側）"]
        Client["DHCPクライアント<br/>（IP未取得）"]
    end
    subgraph RouterBox2["ルーター（リレーエージェント）"]
        Relay["ip helper-address<br/>で指定されたDHCPサーバーへ<br/>ユニキャスト転送"]
    end
    subgraph SubnetB["サブネットB（サーバー側）"]
        DServer["DHCPサーバー<br/>192.168.99.10"]
    end
    Client -->|"① ブロードキャストでDiscover"| Relay
    Relay -->|"② ユニキャストに変換して転送"| DServer
    DServer -->|"③ ユニキャストで応答"| Relay
    Relay -->|"④ ブロードキャスト/ユニキャストで<br/>クライアントへ中継"| Client`,

    qosSteps: `flowchart LR
    A["① 分類<br/>Classification"] --> B["② マーキング<br/>Marking"]
    B --> C["③ キューイング<br/>Queuing"]
    C --> D["④ 輻輳管理<br/>Congestion Management"]
    D --> E["⑤ ポリシング<br/>Policing"]
    D --> F["⑥ シェーピング<br/>Shaping"]
    style A fill:#1f4e79,color:#fff
    style B fill:#2c5f8a,color:#fff
    style C fill:#3d7ab5,color:#fff
    style D fill:#5a94cc,color:#fff
    style E fill:#7ba9d6,color:#fff
    style F fill:#7ba9d6,color:#fff`,

    sshComparison: `flowchart TB
    subgraph TelnetBox["Telnet（非推奨）"]
        T1["管理者"] -->|"平文：ユーザー名・パスワード・コマンドが丸見え"| T2["ルーター"]
    end
    subgraph SSHBox["SSH（推奨）"]
        S1["管理者"] -->|"暗号化された通信"| S2["ルーター"]
    end
    style TelnetBox fill:#3a1414,color:#fff
    style SSHBox fill:#12233a,color:#fff`,

    tftpFtp: `flowchart LR
    Router["ルーター"] -->|"copy running-config tftp:<br/>（設定のバックアップ）"| TFTPServer["TFTP/FTPサーバー"]
    TFTPServer -->|"copy tftp: flash:<br/>（IOSイメージの復元/アップグレード）"| Router`,
};
