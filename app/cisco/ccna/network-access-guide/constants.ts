export const DIAGRAMS: Record<string, string> = {
    'diag-1': `flowchart LR
    A["1.0 Network Fundamentals<br/>20%"] --> B["2.0 Network Access<br/>20%（本ガイドの範囲）"]
    B --> C["3.0 IP Connectivity<br/>25%"]
    C --> D["4.0 IP Services<br/>10%"]
    D --> E["5.0 Security Fundamentals<br/>15%"]
    E --> F["6.0 Automation and Programmability<br/>10%"]

    style B fill:#7c9eff,color:#07111e,stroke:#3d5aa8,stroke-width:2px`,

    'diag-2': `flowchart TD
    S["スイッチがフレームを受信"] --> Q{"宛先MACアドレスは<br/>MACアドレステーブルにある？"}
    Q -- ある --> U["該当ポートのみへ転送<br/>（ユニキャスト転送）"]
    Q -- ない --> F["受信ポート以外の<br/>全ポートへコピー送信<br/>（フラッディング）"]`,

    'diag-3': `flowchart TB
    subgraph SW["1台の物理スイッチ"]
        direction LR
        subgraph V10["VLAN 10（総務部）"]
            P1["ポート1"]
            P2["ポート2"]
        end
        subgraph V20["VLAN 20（開発部）"]
            P3["ポート3"]
            P4["ポート4"]
        end
        subgraph V99["VLAN 99（管理用）"]
            P5["ポート5"]
        end
    end`,

    'diag-4': `flowchart LR
    PC["PC"] --> Phone["Cisco IP電話"]
    Phone -- "1本のケーブル" --> SWPort["スイッチのアクセスポート"]
    SWPort -.->|"データVLAN 10（PC宛のトラフィック）"| DataVLAN["VLAN 10"]
    SWPort -.->|"ボイスVLAN 20（音声トラフィック）"| VoiceVLAN["VLAN 20"]`,

    'diag-5': `flowchart LR
    subgraph SW1["スイッチA"]
        A10["VLAN 10"]
        A20["VLAN 20"]
    end
    subgraph SW2["スイッチB"]
        B10["VLAN 10"]
        B20["VLAN 20"]
    end
    SW1 <-->|"トランクリンク<br/>（VLAN 10・20 を1本で伝送）"| SW2`,

    'diag-6': `flowchart LR
    F1["元のイーサネットフレーム"] --> Tag["802.1Qタグを挿入<br/>(VLAN IDを含む4バイト)"]
    Tag --> F2["タグ付きフレームとしてトランクを通過"]
    F2 --> Untag["受信側スイッチがタグを除去し<br/>該当VLANのアクセスポートへ転送"]`,

    'diag-7': `flowchart TB
    SW1["スイッチA<br/>ネイティブVLAN = 1"] ---|"トランクリンク"| SW2["スイッチB<br/>ネイティブVLAN = 99"]
    SW1 -.->|"CDPが不一致を検出"| Warn["⚠ Native VLAN mismatch ログ"]
    SW2 -.-> Warn`,

    'diag-8': `flowchart LR
    R1["Cisco ルータ"] <-->|"CDP / LLDP<br/>アドバタイズメント"| SW1["Cisco スイッチ"]
    SW1 <-->|"LLDP<br/>（他ベンダー機器との相互運用）"| Other["他社製スイッチ"]`,

    'diag-9': `flowchart LR
    subgraph SW1["スイッチA"]
        P1["Gi0/1"]
        P2["Gi0/2"]
    end
    subgraph SW2["スイッチB"]
        P3["Gi0/1"]
        P4["Gi0/2"]
    end
    P1 === P3
    P2 === P4
    P1 -.-> PC["Port-channel 1<br/>（論理インターフェイス）"]
    P2 -.-> PC`,

    'diag-10': `flowchart TB
    SW1["スイッチA<br/>（ルートブリッジ）"]
    SW2["スイッチB"]
    SW3["スイッチC"]
    SW1 ---|"転送（Forwarding）"| SW2
    SW1 ---|"転送（Forwarding）"| SW3
    SW2 -.-|"ブロック（Discarding）"| SW3`,

    'diag-11': `flowchart LR
    D["Discarding<br/>（学習も転送もしない）"] --> L["Learning<br/>（MACアドレスは学習するが転送はしない）"]
    L --> F["Forwarding<br/>（学習も転送も行う）"]`,

    'diag-12': `flowchart TD
    Port["アクセスポート（PortFast有効）"] --> Check{"BPDUを受信した？"}
    Check -- "受信した（想定外）" --> Action["BPDU Guardにより<br/>ポートをerr-disableへ"]
    Check -- "受信しない（想定通り）" --> Normal["通常どおりForwarding継続"]`,

    'diag-13': `flowchart TB
    subgraph Autonomous["自律型アーキテクチャ"]
        AP1["自律AP<br/>（制御ロジックを内蔵）"]
    end
    subgraph SplitMac["分離MAC（コントローラベース）アーキテクチャ"]
        AP2["Lightweight AP<br/>（データ転送のみ）"] <-->|"CAPWAP<br/>トンネル"| WLC["WLC<br/>（無線制御を集中管理）"]
    end
    subgraph Cloud["クラウド管理型アーキテクチャ"]
        AP3["クラウド管理AP"] <-->|"インターネット経由"| CloudCtrl["クラウドダッシュボード"]
    end`,

    'diag-14': `flowchart LR
    AP["Lightweight AP"] -->|"アクセスポート<br/>（管理VLAN）"| SW["アクセススイッチ"]
    SW -->|"トランクポート<br/>（複数のクライアントVLANを伝送）"| Dist["ディストリビューションスイッチ"]
    Dist -->|"LAG（複数リンクの束ね）"| WLC["WLC"]`,

    'diag-15': `flowchart TD
    Admin["管理者"] --> Choice{"どの方式で接続する？"}
    Choice -->|"物理的に近い／初期設定"| Console["コンソール接続"]
    Choice -->|"リモートでCLI操作"| SSH["SSH（推奨）"]
    Choice -->|"リモートでGUI操作"| HTTPS["HTTPS（推奨）"]
    Choice -->|"複数台の認証を集中管理したい"| AAA["TACACS+ / RADIUS"]`,

    'diag-16': `flowchart TD
    Step1["① WLAN作成<br/>（SSID名・WLAN IDを指定）"] --> Step2["② セキュリティ設定<br/>（WPA2/WPA3、認証方式を選択）"]
    Step2 --> Step3["③ QoSプロファイルの適用<br/>（音声・映像・データなどの優先度設定）"]
    Step3 --> Step4["④ 詳細設定<br/>（VLANマッピング、帯域制御など）"]
    Step4 --> Step5["⑤ WLANを有効化してAPへ配信"]`,

    'diag-17': `flowchart LR
    SW1["スイッチ1"] ---|"トランク"| SW2["スイッチ2"]
    SW2 ---|"トランク"| SW3["スイッチ3"]
    SW1 ---|"トランク（冗長リンク）"| SW3
    SW1 --- PC1["PC（VLAN10）"]
    SW2 --- PC2["PC（VLAN20）"]`,
};
