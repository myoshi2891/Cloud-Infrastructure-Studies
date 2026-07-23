export interface NavItem {
    id: string;
    label: string;
    number: string;
}

export const NAV_ITEMS: NavItem[] = [
    { id: 'overview', label: 'この記事の位置づけ', number: '0.0' },
    { id: 's5-1', label: '基本概念', number: '5.1' },
    { id: 's5-2', label: 'プログラム要素', number: '5.2' },
    { id: 's5-3', label: 'ローカルパスワード', number: '5.3' },
    { id: 's5-4', label: 'パスワードポリシー', number: '5.4' },
    { id: 's5-5', label: 'IPsec VPN', number: '5.5' },
    { id: 's5-6', label: 'ACL', number: '5.6' },
    { id: 's5-7', label: 'レイヤー2セキュリティ', number: '5.7' },
    { id: 's5-8', label: 'AAA', number: '5.8' },
    { id: 's5-9', label: '無線セキュリティ', number: '5.9' },
    { id: 's5-10', label: 'WLAN GUI設定', number: '5.10' },
    { id: 'summary', label: '学習優先順位', number: 'まとめ' },
    { id: 'references', label: '参考ソース', number: '参考' },
];

export const DIAGRAMS = {
    // 0.0 全体像
    overview: `flowchart TD
    D5["5.0 Security Fundamentals<br/>（出題比率 15%）"]
    D5 --> S1["5.1 セキュリティの基本概念<br/>（脅威・脆弱性・エクスプロイト・緩和策）"]
    D5 --> S2["5.2 セキュリティプログラムの要素<br/>（教育・トレーニング・物理アクセス制御）"]
    D5 --> S3["5.3 ローカルパスワードによる<br/>デバイスアクセス制御"]
    D5 --> S4["5.4 パスワードポリシーの要素<br/>（複雑性・MFA・証明書・生体認証）"]
    D5 --> S5["5.5 IPsecリモートアクセス／<br/>サイト間VPN"]
    D5 --> S6["5.6 アクセスコントロールリスト<br/>（ACL）"]
    D5 --> S7["5.7 レイヤー2セキュリティ機能<br/>（DHCPスヌーピング・DAI・ポートセキュリティ）"]
    D5 --> S8["5.8 AAA<br/>（認証・認可・アカウンティング）"]
    D5 --> S9["5.9 無線セキュリティプロトコル<br/>（WPA/WPA2/WPA3）"]
    D5 --> S10["5.10 GUIによるWPA2 PSKの<br/>WLAN設定"]
    style D5 fill:#1b3a6b,stroke:#7c9eff,color:#ffffff`,

    // 5.1 基本概念
    s51_concepts: `flowchart LR
    V["脆弱性 (Vulnerability)<br/>例: 未パッチのソフトウェア"] -->|悪用される| E["エクスプロイト (Exploit)<br/>例: 攻撃コード・手法"]
    T["脅威 (Threat)<br/>例: 攻撃者・マルウェア"] -->|実行する| E
    E -->|引き起こす| I["インパクト (Impact)<br/>例: 情報漏えい・サービス停止"]
    M["緩和策 (Mitigation)<br/>例: パッチ適用・ファイアウォール・教育"] -.->|低減| V
    M -.->|低減| T
    M -.->|低減| I
    style M fill:#1b3a6b,stroke:#7c9eff,color:#ffffff
    style I fill:#5a1f1f,stroke:#ff8080,color:#ffffff`,

    // 5.2 プログラム要素
    s52_program: `flowchart TB
    SP["セキュリティプログラムの3要素"]
    SP --> A["ユーザー意識向上<br/>(User Awareness)"]
    SP --> B["トレーニング<br/>(Training)"]
    SP --> C["物理アクセス制御<br/>(Physical Access Control)"]
    A --> A1["フィッシングメールの見分け方の周知<br/>セキュリティポリシーの周知徹底"]
    B --> B1["役割に応じた実践的な教育<br/>（例: 管理者向けのインシデント対応訓練）"]
    C --> C1["サーバールームの入退室管理<br/>バッジ認証・監視カメラ・施錠キャビネット"]
    style SP fill:#1b3a6b,stroke:#7c9eff,color:#ffffff`,

    // 5.3 デバイスアクセス制御
    s53_access: `flowchart LR
    U["管理者"] --> C1["コンソールポート<br/>(Console)"]
    U --> C2["仮想端末<br/>(VTY: Telnet/SSH)"]
    U --> C3["特権モード<br/>(Enable)"]
    C1 --> DEV["Ciscoデバイス"]
    C2 --> DEV
    C3 --> DEV
    style DEV fill:#1b3a6b,stroke:#7c9eff,color:#ffffff`,

    // 5.4 パスワードポリシー
    s54_policy: `flowchart TB
    PP["パスワードポリシーの要素"]
    PP --> M["管理 (Management)"]
    PP --> C["複雑性 (Complexity)"]
    PP --> ALT["パスワードの代替手段 (Alternatives)"]
    M --> M1["定期的な変更・使い回し禁止<br/>権限最小化・失効管理"]
    C --> C1["最低文字数・英数字記号混在<br/>辞書に載る単語の禁止"]
    ALT --> ALT1["多要素認証 (MFA)"]
    ALT --> ALT2["証明書 (Certificates)"]
    ALT --> ALT3["生体認証 (Biometrics)"]
    style PP fill:#1b3a6b,stroke:#7c9eff,color:#ffffff`,

    // 5.5 IPsec VPN
    s55_vpn: `flowchart TB
    subgraph SiteToSite["サイト間VPN Site-to-Site VPN"]
        direction LR
        R1["拠点A ルーター"] <-->|"IPsecトンネル<br/>(暗号化)"| R2["拠点B ルーター"]
        LAN1["拠点A 社内LAN"] --- R1
        LAN2["拠点B 社内LAN"] --- R2
    end
    subgraph RemoteAccess["リモートアクセスVPN Remote Access VPN"]
        direction LR
        PC["在宅勤務者のPC<br/>(VPNクライアント)"] <-->|"IPsecトンネル<br/>(暗号化)"| GW["VPNゲートウェイ<br/>(本社ルーター/FW)"]
        GW --- LAN3["本社 社内LAN"]
    end
    style SiteToSite fill:#0f1f3d,stroke:#7c9eff,color:#ffffff
    style RemoteAccess fill:#0f1f3d,stroke:#7c9eff,color:#ffffff`,

    // 5.6 ACL
    s56_acl: `flowchart TD
    Start(["パケット到着"]) --> ACE1{"ACE 1 と一致？"}
    ACE1 -->|Yes| Action1["ACE 1のアクション実行<br/>(permit または deny)"]
    ACE1 -->|No| ACE2{"ACE 2 と一致？"}
    ACE2 -->|Yes| Action2["ACE 2のアクション実行"]
    ACE2 -->|No| ACE3{"ACE 3 と一致？"}
    ACE3 -->|Yes| Action3["ACE 3のアクション実行"]
    ACE3 -->|No| More["... 以降のACEも同様に照合"]
    More --> Implicit["どのACEにも一致しない場合<br/>暗黙のdeny all が適用される"]
    Action1 --> End(["処理完了"])
    Action2 --> End
    Action3 --> End
    Implicit --> End
    style Implicit fill:#5a1f1f,stroke:#ff8080,color:#ffffff
    style Start fill:#1b3a6b,stroke:#7c9eff,color:#ffffff`,

    // 5.7 レイヤー2セキュリティ
    s57_l2sec: `flowchart TD
    Client["クライアントPC"] -->|"接続"| SwPort["スイッチポート"]
    SwPort --> PS["ポートセキュリティ<br/>(Port Security)"]
    PS --> PSDesc["ポートに接続できる<br/>MACアドレスの数・種類を制限"]
    SwPort --> DS["DHCPスヌーピング<br/>(DHCP Snooping)"]
    DS --> DSDesc["信頼できないポートからの<br/>不正なDHCPサーバー応答を遮断"]
    DS --> Binding["DHCPバインディングテーブルを生成<br/>(IP - MAC - ポート の対応表)"]
    Binding --> DAI["動的ARPインスペクション<br/>(Dynamic ARP Inspection)"]
    DAI --> DAIDesc["バインディングテーブルと照合し、<br/>ARPスプーフィング（なりすまし）を検知・遮断"]
    style PS fill:#1b3a6b,stroke:#7c9eff,color:#ffffff
    style DS fill:#1b3a6b,stroke:#7c9eff,color:#ffffff
    style DAI fill:#1b3a6b,stroke:#7c9eff,color:#ffffff
    style Binding fill:#0f1f3d,stroke:#7c9eff,color:#ffffff`,

    // 5.8 AAA
    s58_aaa: `sequenceDiagram
    participant U as ユーザー
    participant NAS as ネットワークデバイス(NAS)
    participant AAA as AAAサーバー(RADIUS/TACACS+)
    U->>NAS: ログイン試行（ID・パスワード送信）
    NAS->>AAA: 認証(Authentication)要求
    AAA-->>NAS: 認証結果（OK/NG）を返却
    NAS->>AAA: 認可(Authorization)要求 「このユーザーは何ができるか」
    AAA-->>NAS: 許可されたコマンド・権限レベルを返却
    NAS-->>U: アクセス許可・権限に応じた操作が可能に
    NAS->>AAA: アカウンティング(Accounting)情報送信 「いつ・誰が・何をしたか」のログ`,

    // 5.9 無線セキュリティ
    s59_wireless: `flowchart LR
    WEP["WEP<br/>(非推奨・脆弱)"] --> WPA["WPA<br/>(TKIP暗号化)"]
    WPA --> WPA2["WPA2<br/>(AES-CCMP暗号化)"]
    WPA2 --> WPA3["WPA3<br/>(AES-GCMP / SAE)"]
    style WEP fill:#5a1f1f,stroke:#ff8080,color:#ffffff
    style WPA3 fill:#1b3a6b,stroke:#7c9eff,color:#ffffff`,

    // 5.10 WLC GUI設定
    s510_gui: `flowchart TD
    A["WLANの新規作成<br/>(WLAN ID・SSID名を指定)"] --> B["一般設定<br/>(WLANの有効化、インターフェース割当)"]
    B --> C["セキュリティ設定<br/>(Layer2タブでWPA2/PSKを選択)"]
    C --> D["事前共有鍵(PSK)の入力<br/>(パスフレーズを設定)"]
    D --> E["QoSプロファイルの設定<br/>(Bronze/Silver/Gold/Platinumなど)"]
    E --> F["詳細設定<br/>(セッションタイムアウト、帯域制限など)"]
    F --> G["設定を適用してWLANを有効化"]
    style A fill:#1b3a6b,stroke:#7c9eff,color:#ffffff
    style G fill:#1b3a6b,stroke:#7c9eff,color:#ffffff`,
};
