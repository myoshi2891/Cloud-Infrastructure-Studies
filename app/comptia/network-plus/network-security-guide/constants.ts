/**
 * CompTIA Network+ (N10-009) Domain 4.0 Network Security 定数定義
 */

export interface NavItem {
    id: string;
    title: string;
    icon: string;
    sectionLabel?: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
    {
        id: 'overview',
        title: '全体像',
        icon: 'ti ti-map',
        sectionLabel: 'OVERVIEW',
    },
    {
        id: 'concepts',
        title: '4.1 基本概念',
        icon: 'ti ti-lock',
        sectionLabel: 'CONCEPTS',
    },
    {
        id: 'attacks',
        title: '4.2 攻撃の種類',
        icon: 'ti ti-alert-triangle',
        sectionLabel: 'ATTACKS',
    },
    {
        id: 'defenses',
        title: '4.3 防御技術',
        icon: 'ti ti-shield-check',
        sectionLabel: 'DEFENSES',
    },
    {
        id: 'checklist',
        title: 'チェックリスト',
        icon: 'ti ti-list-check',
        sectionLabel: 'CHECKLIST',
    },
    {
        id: 'references',
        title: '参考文献',
        icon: 'ti ti-external-link',
        sectionLabel: 'REFERENCES',
    },
] as const;

export type DiagramId =
    | 'diag-domain4-structure'
    | 'diag-iam-flow'
    | 'diag-cia-triad'
    | 'diag-attack-types'
    | 'diag-arp-poisoning'
    | 'diag-dot1x-flow'
    | 'diag-zone-design';

export const DIAGRAMS: Record<DiagramId, string> = {
    'diag-domain4-structure': `flowchart TB
    A["Domain 4.0 Network Security 14 percent"]
    A --> B["4.1 基本概念 Basic Concepts"]
    A --> C["4.2 攻撃の種類 Attack Types"]
    A --> D["4.3 防御技術 Security Features"]
    B --> B1["論理セキュリティ 物理セキュリティ"]
    B --> B2["欺瞞技術 ハニーポット ハニーネット"]
    B --> B3["CIA Triad と監査コンプライアンス"]
    B --> B4["ネットワークセグメンテーション"]
    C --> C1["DoS DDoS VLANホッピング MACフラッディング"]
    C --> C2["ARP DNS のなりすまし攻撃"]
    C --> C3["evil twin on-path ソーシャルエンジニアリング"]
    D --> D1["デバイスハードニング NAC"]
    D --> D2["鍵管理 ACL コンテンツフィルタリング"]
    D --> D3["ゾーン設計 スクリーンドサブネット"]
    classDef purple fill:#241f3d,stroke:#8b6cf5,color:#e4defc;
    classDef coral fill:#3a2420,stroke:#fb7862,color:#ffd9cf;
    classDef teal fill:#0f2e2b,stroke:#2dd4bf,color:#ccfbf1;
    class B,B1,B2,B3,B4 purple;
    class C,C1,C2,C3 coral;
    class D,D1,D2,D3 teal;`,

    'diag-iam-flow': `flowchart LR
    U["ユーザー"] --> A1["認証 Authentication"]
    A1 --> M["多要素認証 MFA"]
    M --> S["AAAサーバーへ問い合わせ"]
    S --> R["RADIUS"]
    S --> T["TACACS plus"]
    S --> L["LDAP ディレクトリ照会"]
    R --> Z["認可 Authorization"]
    T --> Z
    L --> Z
    A1 --> SP["SP サービスプロバイダー SSO利用"]
    SP --> IDP["IdP アイデンティティプロバイダー"]
    IDP --> SA["SAML アサーションを SP へ返す"]
    SA --> Z
    Z --> P["最小権限 RBAC を適用"]
    P --> G["リソースへのアクセス許可"]
    classDef teal fill:#0f2e2b,stroke:#2dd4bf,color:#ccfbf1;
    classDef purple fill:#241f3d,stroke:#8b6cf5,color:#e4defc;
    classDef coral fill:#3a2420,stroke:#fb7862,color:#ffd9cf;
    class R,T,L teal;
    class SP,IDP,SA coral;
    class Z,P purple;`,

    'diag-cia-triad': `flowchart TB
    CIA["情報セキュリティの目的"]
    CIA --> C1["機密性 Confidentiality"]
    CIA --> I1["完全性 Integrity"]
    CIA --> A1["可用性 Availability"]
    C1 --> C2["暗号化とアクセス制御で保護"]
    I1 --> I2["改ざん検知 ハッシュ デジタル署名で保護"]
    A1 --> A2["冗長化と災害復旧対策で保護"]
    classDef purple fill:#241f3d,stroke:#8b6cf5,color:#e4defc;
    classDef teal fill:#0f2e2b,stroke:#2dd4bf,color:#ccfbf1;
    classDef coral fill:#3a2420,stroke:#fb7862,color:#ffd9cf;
    class C1,C2 purple;
    class I1,I2 teal;
    class A1,A2 coral;`,

    'diag-attack-types': `flowchart TB
    ATK["4.2 攻撃の分類"]
    ATK --> D1["可用性への攻撃"]
    ATK --> D2["なりすまし 改ざん系攻撃"]
    ATK --> D3["不正デバイス系"]
    ATK --> D4["人的要因への攻撃"]
    D1 --> D1a["DoS DDoS"]
    D2 --> D2a["VLANホッピング MACフラッディング"]
    D2 --> D2b["ARP poisoning spoofing"]
    D2 --> D2c["DNS poisoning spoofing"]
    D2 --> D2d["on-path attack"]
    D3 --> D3a["rogue DHCP rogue AP"]
    D3 --> D3b["evil twin"]
    D4 --> D4a["phishing dumpster diving"]
    D4 --> D4b["shoulder surfing tailgating"]
    classDef coral fill:#3a2420,stroke:#fb7862,color:#ffd9cf;
    classDef pink fill:#3a1f30,stroke:#f472b6,color:#fbcfe8;
    class D1,D2,D3,D4 coral;
    class D1a,D2a,D2b,D2c,D2d,D3a,D3b,D4a,D4b pink;`,

    'diag-arp-poisoning': `sequenceDiagram
    participant Client as クライアント端末
    participant Attacker as 攻撃者
    participant Gateway as デフォルトゲートウェイ
    Attacker->>Client: 偽のARP応答 攻撃者のMACをゲートウェイのIPに紐付け
    Attacker->>Gateway: 偽のARP応答 攻撃者のMACをクライアントのIPに紐付け
    Client->>Attacker: 本来ゲートウェイ宛の通信が攻撃者に届く
    Attacker->>Gateway: 通信内容を中継しつつ盗聴 改ざん
    Gateway->>Attacker: 応答を返す
    Attacker->>Client: 応答を中継し気づかれないようにする`,

    'diag-dot1x-flow': `sequenceDiagram
    participant PC as 端末 サプリカント
    participant SW as スイッチ オーセンティケーター
    participant AAA as RADIUSサーバー
    PC->>SW: 接続要求 ポートはまだ未認証状態
    SW->>PC: 802.1X/EAPOL でEAP-Identityを要求
    PC->>SW: 802.1X/EAPOL で証明書やIDなど認証情報を送信
    SW->>AAA: RADIUS Access-Request でEAPメッセージを転送
    AAA->>SW: RADIUS Access-Accept と割り当てVLAN属性を返す
    SW->>PC: ポートを許可状態にしアクセスを開放`,

    'diag-zone-design': `flowchart LR
    subgraph Untrusted["信頼できないゾーン"]
        Internet["インターネット"]
    end
    subgraph DMZ["スクリーンドサブネット 旧DMZ"]
        Web["公開Webサーバー"]
        DNSsv["公開DNSサーバー"]
        Mail["メールサーバー"]
    end
    subgraph Trusted["信頼できるゾーン"]
        LAN["社内LAN 業務端末"]
        DB["内部データベース"]
    end
    Internet -- "外部FW ACL URLフィルタ" --> DMZ
    DMZ -- "内部FW ACL" --> LAN
    LAN --> DB
    classDef danger fill:#3a1414,stroke:#f87171,color:#ffd6d6;
    classDef warning fill:#3a2f14,stroke:#fbbf24,color:#ffe9b8;
    classDef success fill:#0f2e1a,stroke:#4ade80,color:#c9f7d9;
    class Internet danger;
    class Web,DNSsv,Mail warning;
    class LAN,DB success;`,
};
