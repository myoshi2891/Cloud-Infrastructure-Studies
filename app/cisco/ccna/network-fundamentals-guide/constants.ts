export const TOC_ITEMS = [
  { id: 'sec-1', label: '第1章　CCNA認定試験とは' },
  { id: 'sec-2', label: '第2章　ネットワークとは何か' },
  { id: 'sec-3', label: '第3章　OSI参照モデルとTCP/IP' },
  { id: 'sec-4', label: '第4章　ネットワーク機器の基礎' },
  { id: 'sec-5', label: '第5章　イーサネットと物理層' },
  { id: 'sec-6', label: '第6章　IPv4アドレッシング' },
  { id: 'sec-7', label: '第7章　IPv6の基礎' },
  { id: 'sec-8', label: '第8章　TCP/UDPとポート番号' },
  { id: 'sec-9', label: '第9章　学習ロードマップ' },
  { id: 'sec-10', label: '第10章　2026年の最新動向' },
  { id: 'sec-refs', label: '参考文献・出典' },
] as const;

export const DIAGRAMS: Record<string, string> = {
  'diagram-pie': `pie title CCNA 200-301 出題ドメインと配点（v1.1）
    "1.0 ネットワークの基礎 (20%)" : 20
    "2.0 ネットワークアクセス (20%)" : 20
    "3.0 IP接続性 (25%)" : 25
    "4.0 IPサービス (10%)" : 10
    "5.0 セキュリティの基礎 (15%)" : 15
    "6.0 自動化とプログラマビリティ (10%)" : 10`,

  'diagram-8steps': `flowchart LR
    A["① 自己評価<br/>試験内容の確認"] --> B["② 学習・<br/>トレーニング"]
    B --> C["③ コミュニティ<br/>への参加"]
    C --> D["④ 演習<br/>（ラボ・実機）"]
    D --> E["⑤ 模擬試験で<br/>評価"]
    E --> F["⑥ 試験予約<br/>（Pearson VUE）"]
    F --> G["⑦ 認定取得"]
    G --> H["⑧ 再認定<br/>（3年ごと）"]`,

  'diagram-topology': `flowchart TB
    subgraph Star["スター型トポロジー（一般的なLANの形）"]
        S0(("スイッチ")) --- S1(("PC 1"))
        S0 --- S2(("PC 2"))
        S0 --- S3(("PC 3"))
        S0 --- S4(("PC 4"))
    end
    subgraph Mesh["メッシュ型トポロジー（冗長性重視）"]
        M1(("拠点 A")) --- M2(("拠点 B"))
        M1 --- M3(("拠点 C"))
        M1 --- M4(("拠点 D"))
        M2 --- M3
        M2 --- M4
        M3 --- M4
    end`,

  'diagram-osi': `flowchart TB
    L7["第7層　アプリケーション層（Application）<br/>例：HTTP, FTP, DNS"]
    L6["第6層　プレゼンテーション層（Presentation）<br/>例：暗号化, 文字コード変換"]
    L5["第5層　セッション層（Session）<br/>例：通信の開始・維持・終了の管理"]
    L4["第4層　トランスポート層（Transport）<br/>例：TCP, UDP"]
    L3["第3層　ネットワーク層（Network）<br/>例：IPアドレス, ルーティング"]
    L2["第2層　データリンク層（Data Link）<br/>例：MACアドレス, スイッチング"]
    L1["第1層　物理層（Physical）<br/>例：ケーブル, 電気信号, 光信号"]
    L7 --> L6 --> L5 --> L4 --> L3 --> L2 --> L1`,

  'diagram-encap': `flowchart LR
    A["アプリケーション層<br/>データ（Data）"] --> B["トランスポート層<br/>セグメント（Segment）<br/>TCP/UDPヘッダーを付加"]
    B --> C["ネットワーク層<br/>パケット（Packet）<br/>IPヘッダーを付加"]
    C --> D["データリンク層<br/>フレーム（Frame）<br/>MACヘッダー・トレーラーを付加"]
    D --> E["物理層<br/>ビット（Bits）<br/>電気/光信号として送出"]`,

  'diagram-switchrouter': `flowchart TB
    subgraph L2["スイッチ（レイヤー2）の転送動作"]
        F1["フレームを受信"] --> F2{"宛先MACアドレスは<br/>MACアドレステーブルに<br/>登録されているか？"}
        F2 -->|"登録あり"| F3["該当ポートのみへ転送"]
        F2 -->|"登録なし"| F4["受信ポート以外の<br/>全ポートへフラッディング"]
    end
    subgraph L3["ルーター（レイヤー3）の転送動作"]
        P1["パケットを受信"] --> P2{"ルーティングテーブルで<br/>宛先ネットワークを検索"}
        P2 --> P3["最適な次ホップの<br/>インターフェースへ転送"]
    end`,

  'diagram-subnet': `flowchart TB
    Base["192.168.1.0/24<br/>256個のIPアドレス空間"] --> S1["192.168.1.0/26<br/>使用可能: .1〜.62"]
    Base --> S2["192.168.1.64/26<br/>使用可能: .65〜.126"]
    Base --> S3["192.168.1.128/26<br/>使用可能: .129〜.190"]
    Base --> S4["192.168.1.192/26<br/>使用可能: .193〜.254"]`,

  'diagram-handshake': `sequenceDiagram
    participant Client as クライアント
    participant Server as サーバー
    Client->>Server: SYN（接続要求）
    Server->>Client: SYN-ACK（応答＋同期要求）
    Client->>Server: ACK（確認応答）
    Note over Client,Server: コネクション確立完了、データ転送開始`,

  'diagram-roadmap': `flowchart TB
    A["① OSI参照モデル／<br/>TCP/IPモデルを理解する"] --> B["② IPv4アドレッシングと<br/>サブネッティングを習得する"]
    B --> C["③ スイッチング基礎<br/>（VLAN・STP）を学ぶ"]
    C --> D["④ ルーティング基礎<br/>（静的ルート・OSPF）を学ぶ"]
    E --> F["⑥ 自動化基礎<br/>（API・JSON・Ansible）を学ぶ"]
    D --> E["⑤ セキュリティ基礎<br/>（ACL・ポートセキュリティ）を学ぶ"]
    F --> G["⑦ 模擬試験・<br/>ラボ演習で仕上げる"]
    G --> H["⑧ 200-301試験を受験"]`,

  'diagram-v2': `flowchart LR
    A["現行：200-301 V1.1<br/>（2024年8月改定）"] -->|"2026年5月20日<br/>ブループリント発表"| B["移行期間<br/>（学習・教材整備）"]
    B -->|"2027年2月<br/>新試験開始予定"| C["200-301 V2.0<br/>（実践的スキル重視）"]`,
};
