export const DIAGRAMS: Record<string, string> = {
    'diag-0': `flowchart TB
subgraph L1["レイヤー1: 誰がアクセスできるか(IAM)"]
direction LR
A1["基本ロール<br />Owner/Editor/Viewer"] --> A2["カスタムロール<br />必要な権限だけを束ねる"] --> A3["サービスアカウント<br />人間以外のID"]
end
subgraph L2["レイヤー2: どの経路でアクセスできるか(ネットワーク)"]
direction LR
B1["VPC Peering<br />プロジェクト間の内部通信"] --> B2["IAP<br />アプリ層の認証プロキシ"] --> B3["Private GKE<br />クラスタの外部露出を遮断"]
end
subgraph L3["レイヤー3: データそのものを守る(暗号化)"]
direction LR
C1["Cloud KMS<br />鍵の生成と権限分離"] --> C2["暗号化データの保存<br />Cloud Storage"]
end
L1 --> L2 --> L3`,

    'diag-1': `flowchart TD
Org["組織"] -->|継承| Folder["フォルダ"]
Folder -->|継承| Proj["プロジェクト"]
Proj -->|継承| Res1["Cloud Storage バケット"]
Proj -->|継承| Res2["Compute Engine インスタンス"]
Proj -->|継承| Res3["BigQuery データセット"]
Owner["Owner ロールを<br />プロジェクトに付与"] -.->|自動的に配下すべてに適用| Res1
Owner -.->|自動的に配下すべてに適用| Res2
Owner -.->|自動的に配下すべてに適用| Res3`,

    'diag-2': `sequenceDiagram
actor U2 as User2 (Viewer剥奪後)
participant Console as Cloud Console
participant Bucket as Cloud Storage バケット
U2->>Console: プロジェクトのリソース一覧を見ようとする
Console-->>U2: Permission Denied(プロジェクトViewerがない)
U2->>Bucket: バケットに直接アクセス(gcloud storage ls)
Note over Bucket: roles/storage.objectViewer が個別に付与されている
Bucket-->>U2: ファイル一覧を取得できる`,

    'diag-3': `sequenceDiagram
participant Admin as 管理者
participant IAM as Cloud IAM
Admin->>IAM: describe でロール定義を取得(etag AAA)
Admin->>Admin: ローカルで権限を追加編集
Admin->>IAM: update でetag AAA を添えて送信
alt etagが一致
    IAM-->>Admin: 更新成功、新しいetag BBB が発行される
else 他の変更が先に入りetagが不一致
    IAM-->>Admin: 更新拒否(競合を検出)
end`,

    'diag-4': `flowchart LR
A["作成<br />iam roles create"] --> B["更新<br />iam roles update"]
B --> C["無効化<br />stage DISABLED"]
C --> D["削除<br />iam roles delete"]
D -->|7日以内なら| E["復元<br />iam roles undelete"]
D -->|7日経過| F["完全削除プロセス<br />最大30日、計37日で完全消滅"]
F --> G["37日後、同じRole IDが<br />再利用可能になる"]`,

    'diag-5': `flowchart TB
subgraph Case1["ケース1: サービスアカウントを「ID」として扱う"]
VM["Compute Engine VM"] -->|"このVMとして動作する"| SA1["サービスアカウント"]
SA1 -->|"IAMロールを付与"| R1["Cloud Storage / BigQuery"]
end
subgraph Case2["ケース2: サービスアカウントを「リソース」として扱う"]
U["人間のユーザー"] -->|"serviceAccountUser を付与"| SA2["サービスアカウント"]
SA2 -->|"このSAとしてVMを起動できる"| VM2["VMインスタンス"]
end`,

    'diag-6': `sequenceDiagram
participant App as Pythonアプリ(VM上)
participant Meta as VMメタデータサーバー
participant BQ as BigQuery API
App->>Meta: サービスアカウントの認証情報を要求
Meta-->>App: 一時的なアクセストークンを返却
App->>BQ: トークンを添えてクエリを実行
Note over BQ: bigquery-qwiklab SA が必要なロールを持つことを確認
BQ-->>App: クエリ結果を返却`,

    'diag-7': `sequenceDiagram
participant A as project-A (network-a)
participant B as project-B (network-b)
A->>A: ピア接続 "peer-ab" を作成(相手先 project-B / network-b)
Note over A: 状態 = INACTIVE(Waiting for peer network to connect)
B->>B: ピア接続 "peer-ba" を作成(相手先 project-A / network-a)
Note over A,B: 双方の設定が揃った瞬間に状態 = ACTIVE
A-->>B: ルートが自動的に交換される
B-->>A: 内部IPでの相互通信が可能になる`,

    'diag-8': `sequenceDiagram
actor User as ユーザー
participant IAP as Identity-Aware Proxy
participant GIS as Google Identity Service
participant App as Cloud Run アプリ
User->>IAP: アプリのURLへHTTPSリクエスト
IAP->>GIS: サインインを要求
GIS-->>User: Googleログイン画面を表示
User->>GIS: 認証情報を入力
GIS-->>IAP: 認証済みIDを返却
IAP->>IAP: IAM許可ポリシーを確認(IAP-secured Web App User)
alt 権限あり
    IAP->>App: リクエスト転送 + 認証ユーザー情報のヘッダーを付与
    App-->>User: ユーザー情報を含むレスポンス
else 権限なし
    IAP-->>User: アクセス拒否画面
end`,

    'diag-9': `flowchart LR
subgraph Danger["⚠ 危険な状態: IAPがオフ、ヘッダーだけを信頼している"]
Attacker["攻撃者"] -->|"認証ヘッダーを偽装"| App1["アプリ"]
App1 -->|"ヘッダーをそのまま信用"| Result1["なりすまし成功"]
end
subgraph Safe["✅ 安全な状態: 署名付きJWTを検証している"]
Attacker2["攻撃者"] -->|"JWTアサーションを偽装しようとする"| App2["アプリ"]
App2 -->|"Googleの公開鍵で署名を検証"| Result2["署名が一致しない"]
Result2 --> Result3["拒否される(なりすまし不可)"]
end`,

    'diag-10': `flowchart TB
PRJ["プロジェクト"] --> KR["KeyRing: labkey (location global)"]
KR --> CK["CryptoKey: qwiklab (purpose encryption)"]
CK --> V1["Key Version 1"]
CK --> V2["Key Version 2 (ローテーション後)"]`,

    'diag-11': `flowchart LR
P["平文データ (1.txt)"] -->|"base64エンコード"| B64["Base64文字列"]
B64 -->|"encrypt API を呼び出し"| KMS["Cloud KMS CryptoKey qwiklab"]
KMS -->|"ciphertext を返却"| ENC["暗号化データ (1.encrypted)"]
ENC -->|"アップロード"| GCS["Cloud Storage バケット"]
ENC -.->|"decrypt API を呼び出し(検証用)"| KMS
KMS -.->|"plaintext を返却"| P`,

    'diag-12': `flowchart TB
Admin["鍵管理者 roles/cloudkms.admin"] -->|"KeyRing/CryptoKeyの作成・破棄"| KR["KeyRing / CryptoKey"]
App["アプリ用SA roles/cloudkms.cryptoKeyEncrypterDecrypter"] -->|"encrypt / decrypt APIのみ呼び出し可"| KR
App -.->|"鍵の削除・無効化はできない"| KR`,

    'diag-13': `flowchart TB
subgraph VPC["自分のVPCネットワーク"]
subgraph Subnet["ノード用サブネット"]
Nodes["GKEノード群(内部IPのみ)"]
end
PodRange["Podセカンダリレンジ 例:10.40.0.0/14"]
SvcRange["Serviceセカンダリレンジ 例:10.0.16.0/20"]
end
subgraph GoogleVPC["Google管理VPC(ピア接続)"]
CP["コントロールプレーン 例:172.16.0.16/28"]
end
Nodes <-->|"VPC Peering(自動構成)"| CP
Allowed["許可された外部IP(master-authorized-networks)"] -.->|"認可された通信のみ通す"| CP
Internet(("インターネット")) -.->|"直接アクセス不可"| Nodes
Internet -.->|"直接アクセス不可(デフォルト)"| CP`,

    'diag-14': `flowchart LR
subgraph WithPublic["--enable-private-endpoint なし"]
Admin1["管理者(社外)"] -->|"承認済みIPなら到達可"| CP1["コントロールプレーン(パブリックIPあり)"]
end
subgraph WithoutPublic["--enable-private-endpoint あり(より安全)"]
Admin2["管理者(社外)"] -.->|"到達不可"| CP2["コントロールプレーン(パブリックIPなし)"]
Jump["踏み台ホスト(同一VPC内)"] -->|"内部IP経由でのみ到達可"| CP2
Admin2 -->|"まずVPN/IAPで踏み台に接続"| Jump
end`,

    'diag-15': `flowchart TB
subgraph IAMLayer["① IAMレイヤー: 最小権限の設計"]
SA["専用サービスアカウント"]
CR["カスタムロール: storage操作4権限"]
BR1["roles/monitoring.viewer"]
BR2["roles/monitoring.metricWriter"]
BR3["roles/logging.logWriter"]
SA --> CR
SA --> BR1
SA --> BR2
SA --> BR3
end
subgraph NetworkLayer["② ネットワークレイヤー: 隔離設計"]
VPC2["Orca Build VPC"]
Subnet2["orca-build-subnet"]
MgmtSubnet["orca-mgmt-subnet"]
Jump["orca-jumphost"]
VPC2 --> Subnet2
MgmtSubnet --> Jump
end
subgraph ClusterLayer["③ クラスタレイヤー: Private GKE"]
PrivCluster["Cluster<br />private-nodes / private-endpoint / authorized-networks"]
end
SA -->|"サービスアカウントとして指定"| PrivCluster
Subnet2 -->|"デプロイ先ネットワーク"| PrivCluster
Jump -->|"internal-ip 経由 kubectl 接続"| PrivCluster
PrivCluster -->|"jumphostの内部IPを/32で登録"| Jump`
};
