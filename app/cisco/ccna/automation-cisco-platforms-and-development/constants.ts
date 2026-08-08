export const DIAGRAMS: Record<string, string> = {
    'diag-overview': `flowchart TB
A["CCNA Automation<br/>200-901 CCNAAUTO v1.1"] --> D1["1.0 Software Development<br/>and Design (15%)"]
A --> D2["2.0 Understanding and<br/>Using APIs (20%)"]
A --> D3["<span style='color:#241a00;font-weight:bold'>3.0 Cisco Platforms<br/>and Development (15%)</span>"]
A --> D4["4.0 Application Deployment<br/>and Security (15%)"]
A --> D5["5.0 Infrastructure and<br/>Automation (20%)"]
A --> D6["6.0 Network<br/>Fundamentals (15%)"]
D1 ~~~ D2 ~~~ D3 ~~~ D4 ~~~ D5 ~~~ D6
style D3 fill:#ffe08a,stroke:#d99a00,stroke-width:2px,color:#241a00`,

    'diag-map': `flowchart TB
Start(["3.0 Cisco Platforms<br/>and Development"]) --> T1["3.1 SDKで<br/>Pythonスクリプトを構築"]
T1 --> T2["3.2 ネットワーク管理<br/>プラットフォームAPI"]
T2 --> T3["3.3 コンピュート管理<br/>プラットフォームAPI"]
T3 --> T4["3.4 コラボレーション<br/>プラットフォームAPI"]
T4 --> T5["3.5 セキュリティ<br/>プラットフォームAPI"]
T5 --> T6["3.6 IOS XE/NX-OS<br/>デバイスレベルAPI"]
T6 --> T7["3.7 DevNetリソースの<br/>活用"]
T7 --> T8["3.8 モデル駆動型<br/>プログラマビリティ"]
T8 --> T9["3.9 実践：APIドキュメント<br/>からコードを構築"]`,

    'diag-workflow': `flowchart TB
S1["SDKをインストールする<br/>例: pip install meraki"] --> S2["認証情報を準備する<br/>APIキー / アクセストークン"]
S2 --> S3["SDKクライアントを初期化する"]
S3 --> S4["SDKのメソッドを呼び出す<br/>例: dashboard.organizations.getOrganizations()"]
S4 --> S5{"エラーは<br/>発生したか"}
S5 -->|"Yes"| S6["例外をキャッチして<br/>ログに出力する"]
S5 -->|"No"| S7["取得したデータを<br/>業務ロジックで利用する"]`,

    'diag-platforms': `flowchart TB
subgraph NW["ネットワーク管理プラットフォーム 3.2"]
direction TB
N1["Meraki"]
N2["Cisco DNA Center<br/>(現Catalyst Center)"]
N3["ACI"]
N4["Cisco SD-WAN"]
N5["NSO"]
N1 ~~~ N2 ~~~ N3 ~~~ N4 ~~~ N5
end

subgraph CP["コンピュート管理プラットフォーム 3.3"]
direction TB
C1["UCS Manager"]
C2["UCS Director"]
C3["Intersight"]
C1 ~~~ C2 ~~~ C3
end

subgraph CL["コラボレーションプラットフォーム 3.4"]
direction TB
L1["Webex"]
L2["Webex Devices"]
L3["CUCM (AXL / UDS)"]
L4["Finesse"]
L1 ~~~ L2 ~~~ L3 ~~~ L4
end

subgraph SEC["セキュリティプラットフォーム 3.5"]
direction TB
S1["XDR"]
S2["Firepower"]
S3["Umbrella"]
S4["Secure Endpoint"]
S5["ISE"]
S6["Secure Malware Analytics"]
S1 ~~~ S2 ~~~ S3 ~~~ S4 ~~~ S5 ~~~ S6
end

NW ~~~ CP ~~~ CL ~~~ SEC`,

    'diag-north-south': `flowchart TB
App["外部アプリケーション<br/>自動化スクリプト"] -->|"Northbound API: REST"| Ctrl["コントローラー層<br/>DNA Center / Meraki Dashboard<br/>APIC / vManage / NSO"]
Ctrl -->|"Southbound: NETCONF・RESTCONF・CLIなど"| Dev["ネットワークデバイス群<br/>スイッチ・ルーター・WLC"]`,

    'diag-devnet': `flowchart TB
Q["利用シーン別<br/>DevNetリソースの選び方"] --> R1["実機相当の環境で<br/>動作を試したい<br/>→ DevNet Sandbox"]
R1 --> R2["すぐに使える<br/>サンプルコードが欲しい<br/>→ Code Exchange"]
R2 --> R3["APIのエンドポイントや<br/>認証方式を確認したい<br/>→ API Documentation"]
R3 --> R4["技術的な疑問や<br/>不具合を相談したい<br/>→ Support / Community Forums"]
R4 --> R5["体系立てて<br/>基礎から学びたい<br/>→ Learning Labs"]`,

    'diag-yang': `flowchart TB
Y["YANGモデル<br/>設定項目の構造とデータ型を定義"] --> P{"どちらのプロトコルで<br/>アクセスするか"}
P -->|"NETCONF"| N["XMLベース<br/>SSH (既定ポート830) を利用<br/>candidate/running設定を明確に区別"]
P -->|"RESTCONF"| R["HTTP(S) ベース<br/>JSONまたはXML<br/>GET/POST/PUT/PATCH/DELETEで操作"]
N --> D["ネットワークデバイスの<br/>設定へ反映"]
R --> D`,

    'diag-seq-meraki': `sequenceDiagram
participant Dev as 自動化スクリプト
participant API as Meraki Dashboard API

Dev->>API: GET /organizations
API-->>Dev: 200 OK (organizations一覧)
Dev->>API: GET /organizations/{orgId}/networks
API-->>Dev: 200 OK (networks一覧)
Dev->>API: GET /networks/{networkId}/devices
API-->>Dev: 200 OK (devices一覧)`,

    'diag-seq-webex': `sequenceDiagram
participant Bot as Webexボット/スクリプト
participant WebexAPI as Webex API

Bot->>WebexAPI: POST /v1/rooms (スペースを作成)
WebexAPI-->>Bot: 200 OK (roomId)
Bot->>WebexAPI: POST /v1/memberships (参加者を追加)
WebexAPI-->>Bot: 200 OK
Bot->>WebexAPI: POST /v1/messages (メッセージを送信)
WebexAPI-->>Bot: 200 OK (messageId)`,

    'diag-roadmap': `flowchart TB
L1["Step 1<br/>DevNet Sandboxアカウントを準備する"] --> L2["Step 2<br/>Meraki SandboxでREST APIの基本を体験する"]
L2 --> L3["Step 3<br/>Cisco DNA Center (Catalyst Center)<br/>SandboxでIntent APIを試す"]
L3 --> L4["Step 4<br/>Webex APIでメッセージ送信を自動化する"]
L4 --> L5["Step 5<br/>IOS XE SandboxでNETCONF/RESTCONFを試す"]
L5 --> L6["Step 6<br/>3.9形式の複合シナリオに挑戦する"]`,
};
