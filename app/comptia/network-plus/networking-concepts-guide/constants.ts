export interface NavItem {
    id: string;
    label: string;
    icon?: string;
    group?: string;
}

export const NAV_ITEMS: NavItem[] = [
    { id: 'intro', label: 'はじめに', icon: 'ti ti-info-circle' },
    { id: 'step1', label: '1. OSI参照モデル', icon: 'ti ti-layers-intersect', group: 'Step by step' },
    { id: 'step2', label: '2. ネットワーク機器', icon: 'ti ti-router', group: 'Step by step' },
    { id: 'step3', label: '3. クラウドの概念', icon: 'ti ti-cloud', group: 'Step by step' },
    { id: 'step4', label: '4. ポート/プロトコル', icon: 'ti ti-plug-connected', group: 'Step by step' },
    { id: 'step5', label: '5. 伝送メディア', icon: 'ti ti-cable', group: 'Step by step' },
    { id: 'step6', label: '6. トポロジー', icon: 'ti ti-topology-star-3', group: 'Step by step' },
    { id: 'step7', label: '7. IPv4アドレッシング', icon: 'ti ti-binary', group: 'Step by step' },
    { id: 'step8', label: '8. 進化する環境', icon: 'ti ti-rocket', group: 'Step by step' },
    { id: 'summary', label: 'まとめ', icon: 'ti ti-checklist', group: 'Wrap up' },
    { id: 'references', label: '参考文献・出典', icon: 'ti ti-books', group: 'Wrap up' },
];

export type DiagramId =
    | 'diag-step1-osi'
    | 'diag-step1-encap'
    | 'diag-step2-placement'
    | 'diag-step3-cloud-gw'
    | 'diag-step4-unicast'
    | 'diag-step4-multicast'
    | 'diag-step4-anycast'
    | 'diag-step4-broadcast'
    | 'diag-step6-mesh'
    | 'diag-step6-star'
    | 'diag-step6-hybrid'
    | 'diag-step6-spine-leaf'
    | 'diag-step6-p2p'
    | 'diag-step6-three-tier'
    | 'diag-step6-collapsed-core'
    | 'diag-step6-traffic-flow'
    | 'diag-step7-subnet-check'
    | 'diag-step8-sdn'
    | 'diag-step8-iac';

export const DIAGRAMS: Record<DiagramId, string> = {
    'diag-step1-osi': `flowchart TD
    A["Layer 7: Application"] --> B["Layer 6: Presentation"]
    B --> C["Layer 5: Session"]
    C --> D["Layer 4: Transport"]
    D --> E["Layer 3: Network"]
    E --> F["Layer 2: Data Link"]
    F --> G["Layer 1: Physical"]`,

    'diag-step1-encap': `%%{init: {"themeVariables": {"fontSize": "15px"}, "flowchart": {"rankSpacing": 34}}}%%
flowchart TB
    subgraph Sender["送信側: カプセル化"]
        direction LR
        SA["Application data"] --> SP["+ Presentation"] --> SS["+ Session"] --> ST["+ Transport header"] --> SN["+ Network header"] --> SD["+ Data Link header/trailer"] --> SPh["Physical: bit列"]
    end
    subgraph Receiver["受信側: 非カプセル化"]
        direction LR
        RPh["Physical: bit列を受信"] --> RD["Data Link を処理"] --> RN["Network を処理"] --> RT["Transport を処理"] --> RS["Session を処理"] --> RP["Presentation を処理"] --> RA["Application data を受け取る"]
    end
    Sender -->|"ネットワーク経由で伝送"| Receiver`,

    'diag-step2-placement': `flowchart LR
    Internet(["Internet"]) --> FW["Firewall"]
    FW --> RTR["Router"]
    RTR --> IDS["IDS/IPS"]
    IDS --> CSW["Core switch"]
    CSW --> LB["Load balancer"]
    LB --> SRV1["Web server 1"]
    LB --> SRV2["Web server 2"]
    CSW --> PROXY["Proxy server"]
    CSW --> WC["Wireless controller"]
    WC --> AP1["Access point 1"]
    WC --> AP2["Access point 2"]
    CSW --> NAS["NAS"]
    CSW --> SAN["SAN"]`,

    'diag-step3-cloud-gw': `flowchart LR
    subgraph VPC["Virtual Private Cloud"]
        PUB["パブリックサブネット"]
        PRIV["プライベートサブネット"]
    end
    PUB --> IGW["Internet gateway"]
    IGW --> INET(["Internet"])
    PRIV --> NATGW["NAT gateway"]
    NATGW --> IGW`,

    'diag-step4-unicast': `flowchart LR
    S1["送信元"] --> R1["受信先（1台のみ）"]`,

    'diag-step4-multicast': `flowchart LR
    S2["送信元"] --> G1["グループ参加者A"]
    S2 --> G2["グループ参加者B"]`,

    'diag-step4-anycast': `flowchart LR
    S3["送信元"] --> N1["最も近い宛先（応答する）"]
    S3 -.-> N2["他のエニーキャスト宛先（応答しない）"]`,

    'diag-step4-broadcast': `flowchart LR
    S4["送信元"] --> B1["ホストA"]
    S4 --> B2["ホストB"]
    S4 --> B3["ホストC"]`,

    'diag-step6-mesh': `flowchart LR
    A["ノードA"] --- B["ノードB"]
    A --- C["ノードC"]
    A --- D["ノードD"]
    B --- C
    B --- D
    C --- D`,

    'diag-step6-star': `flowchart TD
    S["中心のスイッチ"]
    S --- H1["ホストA"]
    S --- H2["ホストB"]
    S --- H3["ホストC"]
    S --- H4["ホストD"]`,

    'diag-step6-hybrid': `flowchart TD
    subgraph Core["メッシュ構成のコア"]
        C1["コアスイッチ1"] --- C2["コアスイッチ2"]
        C1 --- C3["コアスイッチ3"]
        C2 --- C3
    end
    C1 --- S1["アクセススイッチA"]
    S1 --- H1["ホスト"]
    S1 --- H2["ホスト"]
    C2 --- S2["アクセススイッチB"]
    S2 --- H3["ホスト"]`,

    'diag-step6-spine-leaf': `flowchart TD
    SP1["Spine 1"]
    SP2["Spine 2"]
    L1["Leaf 1"]
    L2["Leaf 2"]
    L3["Leaf 3"]
    SP1 --- L1
    SP1 --- L2
    SP1 --- L3
    SP2 --- L1
    SP2 --- L2
    SP2 --- L3`,

    'diag-step6-p2p': `flowchart LR
    A["拠点Aのルーター"] --- B["拠点Bのルーター"]`,

    'diag-step6-three-tier': `flowchart TD
    Core["Core layer"]
    D1["Distribution 1"]
    D2["Distribution 2"]
    A1["Access 1"]
    A2["Access 2"]
    A3["Access 3"]
    A4["Access 4"]
    Core --- D1
    Core --- D2
    D1 --- A1
    D1 --- A2
    D2 --- A3
    D2 --- A4`,

    'diag-step6-collapsed-core': `flowchart TD
    CD["Collapsed core / distribution layer"]
    A1["Access 1"]
    A2["Access 2"]
    A3["Access 3"]
    CD --- A1
    CD --- A2
    CD --- A3`,

    'diag-step6-traffic-flow': `flowchart TB
    Client(["外部クライアント"]) -->|"North-South"| DC["データセンターの入口"]
    DC --> Srv1["サーバー1"]
    Srv1 <-->|"East-West"| Srv2["サーバー2"]
    Srv2 <-->|"East-West"| Srv3["サーバー3"]`,

    'diag-step7-subnet-check': `%%{init: {"themeVariables": {"fontSize": "13px"}, "flowchart": {"nodeSpacing": 18, "rankSpacing": 24}}}%%
flowchart TD
    Start["ホストAとホストBのIPアドレスを比較する"] --> Mask["両方のIPアドレスにサブネットマスクをAND演算で適用する"]
    Mask --> Compare{"結果のネットワークアドレスは一致するか"}
    Compare -->|"一致する"| Same["同一サブネット: Layer 2で直接通信できる"]
    Compare -->|"一致しない"| Diff["異なるサブネット: ルーターを経由する必要がある"]`,

    'diag-step8-sdn': `flowchart TB
    subgraph ControlPlane["Control plane"]
        Controller["SDNコントローラー"]
    end
    subgraph DataPlane["Data plane"]
        SW1["スイッチ1"]
        SW2["スイッチ2"]
        SW3["スイッチ3"]
    end
    Controller -->|"ポリシー配布"| SW1
    Controller -->|"ポリシー配布"| SW2
    Controller -->|"ポリシー配布"| SW3`,

    'diag-step8-iac': `flowchart LR
    Code["構成コード"] --> VCS["バージョン管理"]
    VCS --> Review["レビュー・競合検出"]
    Review --> Apply["自動適用"]
    Apply --> Devices["ネットワーク機器"]
    Devices -->|"構成ドリフトを検知"| Drift["コンプライアンスチェック"]
    Drift -.->|"差分があれば再適用"| Code`,
};
