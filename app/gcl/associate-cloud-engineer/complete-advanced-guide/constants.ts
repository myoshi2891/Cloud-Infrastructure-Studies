/** GCP ACE Complete Advanced Guide Mermaid Diagrams Constants */

export const DIAGRAMS: Record<string, string> = {
    'diag-roadmap': `flowchart LR
A["Week 1-2<br/>基礎固め"] --> B["Week 3-4<br/>コンピューティング<br/>ストレージ"]
B --> C["Week 5-6<br/>ネットワーク<br/>IaC"]
C --> D["Week 7-8<br/>運用・セキュリティ<br/>模擬試験"]
A -.-> A1["IAM・リソース階層<br/>VPC基本<br/>Billing管理"]
B -.-> B1["GCE・GKE・Cloud Run<br/>Cloud Storage<br/>DB選定"]
C -.-> C1["VPC設計<br/>LB選定<br/>Terraform"]
D -.-> D1["Monitoring・Logging<br/>Security強化<br/>過去問演習"]
style A fill:#1a73e8,color:#fff,stroke:#1a73e8
style B fill:#0f9d58,color:#fff,stroke:#0f9d58
style C fill:#fbbc04,color:#000,stroke:#fbbc04
style D fill:#ea4335,color:#fff,stroke:#ea4335`,
    'diag-hierarchy': `flowchart TD
ORG["🏢 Organization<br/>example.com"] --> F1["📁 Folder<br/>開発部門"]
ORG --> F2["📁 Folder<br/>本番部門"]
ORG --> F3["📁 Folder<br/>財務部門"]
F1 --> P1["🗂️ Project<br/>dev-frontend"]
F1 --> P2["🗂️ Project<br/>dev-backend"]
F2 --> P3["🗂️ Project<br/>prod-webapp"]
F2 --> P4["🗂️ Project<br/>prod-api"]
P1 --> R1["⚙️ Resources<br/>VM / DB / GCS"]
P3 --> R2["⚙️ Resources<br/>VM / DB / GCS"]
style ORG fill:#1a73e8,color:#fff,stroke:#1a73e8
style F1 fill:#0f9d58,color:#fff,stroke:#0f9d58
style F2 fill:#0f9d58,color:#fff,stroke:#0f9d58
style F3 fill:#0f9d58,color:#fff,stroke:#0f9d58
style P1 fill:#fbbc04,color:#000,stroke:#fbbc04
style P2 fill:#fbbc04,color:#000,stroke:#fbbc04
style P3 fill:#fbbc04,color:#000,stroke:#fbbc04
style P4 fill:#fbbc04,color:#000,stroke:#fbbc04`,
    'diag-inheritance': `flowchart TD
O["Organization<br/>roles/logging.admin 付与"] -->|継承| F["Folder<br/>追加ロールを付与可能"]
F -->|継承| P["Project<br/>すべての上位ロールが有効"]
P -->|継承| R["Resource<br/>最終的な権限 = 上位ロールの和集合"]
style O fill:#1a73e8,color:#fff,stroke:#1a73e8
style F fill:#0f9d58,color:#fff,stroke:#0f9d58
style P fill:#fbbc04,color:#000,stroke:#fbbc04
style R fill:#ea4335,color:#fff,stroke:#ea4335`,
    'diag-lifecycle': `stateDiagram-v2
[*] --> ACTIVE : プロジェクト作成
ACTIVE --> DELETE_REQUESTED : gcloud projects delete
DELETE_REQUESTED --> ACTIVE : gcloud projects undelete<br>(30日以内)
DELETE_REQUESTED --> DELETED : 30日経過後<br>(完全削除・復元不可)`,
    'diag-billing': `flowchart LR
B["予算設定<br/>金額・スコープ・期間"] --> T["閾値設定<br/>50% / 90% / 100%"]
T --> N{通知方法}
N -->|メール| E["📧 最大5アドレスに送信"]
N -->|Pub/Sub| PS["📨 Pub/Sub トピック"]
PS --> CF["⚡ Cloud Functions"]
CF --> A["🔴 リソース自動停止<br/>VM停止 / API無効化"]
style PS fill:#1a73e8,color:#fff,stroke:#1a73e8
style CF fill:#0f9d58,color:#fff,stroke:#0f9d58
style A fill:#ea4335,color:#fff,stroke:#ea4335`,
    'diag-adc': `flowchart TD
A[アプリがGCP APIを呼び出し] --> B{"GOOGLE_APPLICATION_CREDENTIALS<br/>環境変数が設定されているか?"}
B -->|Yes| C[指定されたキーファイルを使用]
B -->|No| D{"gcloud auth application-default login<br/>認証情報が存在するか?"}
D -->|Yes| E[ユーザー認証情報を使用]
D -->|No| F{"GCE / GKE / Cloud Run等の<br/>実行環境か?"}
F -->|Yes| G["メタデータサーバーから<br/>トークンを自動取得"]
F -->|No| H[認証エラー]
style G fill:#0f9d58,color:#fff,stroke:#0f9d58
style H fill:#ea4335,color:#fff,stroke:#ea4335`,
    'diag-compute-select': `flowchart TD
START[アプリケーション要件を確認] --> VM{VMが必要?}
VM -->|Yes| SPOT{"停止されても<br/>問題ない?"}
SPOT -->|Yes| SVM["Spot VM + MIG<br/>最大91%コスト削減"]
SPOT -->|No| GCE["Compute Engine<br/>OS レベルの完全制御"]
VM -->|No| CONT{コンテナを使う?}
CONT -->|Yes| K8S{Kubernetes が必要?}
K8S -->|Yes| PRIV{"特権コンテナ or<br/>DaemonSet が必要?"}
PRIV -->|Yes| STD["GKE Standard<br/>ノードを自己管理"]
PRIV -->|No| AUTO["GKE Autopilot<br/>Googleが全管理・推奨"]
K8S -->|No| RUN["Cloud Run<br/>HTTPステートレス・ゼロスケール"]
CONT -->|No| FUNC["Cloud Functions<br/>軽量イベント駆動"]
style AUTO fill:#0f9d58,color:#fff,stroke:#0f9d58
style RUN fill:#1a73e8,color:#fff,stroke:#1a73e8
style SVM fill:#fbbc04,color:#000,stroke:#fbbc04`,
    'diag-oslogin': `flowchart LR
E["エンジニア<br/>SSH接続試行"] --> OL["OS Login<br/>IAM リアルタイム照会"]
OL -->|ロール有効| VM["VM 接続 OK ✅"]
OL -->|ロール削除済み<br/>退職処理後| NG["接続 NG ❌"]
IAM["IAM ポリシー<br/>ユーザー削除"] -.->|即時反映| OL
style VM fill:#34A853,color:#fff
style NG fill:#EA4335,color:#fff`,
    'diag-preemption': `sequenceDiagram
participant G as Google Cloud
participant VM as Spot VM
participant CS as Cloud Storage
participant MIG as Managed Instance Group
G->>VM: プリエンプション通知(30秒前)
VM->>CS: チェックポイントを GCS に保存
VM->>VM: シャットダウンスクリプト実行
G->>VM: 強制停止
MIG->>VM: 新しい Spot VM を自動作成
VM->>CS: チェックポイントを読み込み
VM->>VM: 処理を途中から再開`,
    'diag-gke-select': `flowchart TD
START[GKE クラスタを作成したい] --> PRIV{特権コンテナが必要?}
PRIV -->|Yes| STD
PRIV -->|No| KERN{"カーネルパラメータ<br/>の変更が必要?"}
KERN -->|Yes| STD
KERN -->|No| DS{"DaemonSet が必要<br/>カスタムエージェント配置?"}
DS -->|Yes| STD
DS -->|No| GPU2{"特定 GPU/TPU<br/>ノードプール設定?"}
GPU2 -->|Yes| STD["GKE Standard<br/>ノードを自己管理"]
GPU2 -->|No| AUTO["GKE Autopilot ✅<br/>推奨: Google が全管理"]
style AUTO fill:#0f9d58,color:#fff,stroke:#0f9d58
style STD fill:#fbbc04,color:#000,stroke:#fbbc04`,
    'diag-workload-identity': `flowchart LR
KSA["Kubernetes<br/>Service Account<br/>KSA"] -->|紐付け| GSA["Google Cloud<br/>IAM Service Account<br/>GSA"]
POD[Pod] -->|KSA を使用| KSA
GSA -->|IAM ロール付与| GCP["GCP API<br/>Secret Manager<br/>Cloud Storage 等"]
style POD fill:#1a73e8,color:#fff,stroke:#1a73e8
style GCP fill:#0f9d58,color:#fff,stroke:#0f9d58`,
    'diag-run-traffic': `flowchart TD
REQ[ユーザーリクエスト] --> LB["Cloud Run<br/>トラフィック分割"]
LB -->|90%| V1["リビジョン v1<br/>安定版"]
LB -->|10%| V2["リビジョン v2<br/>新バージョン"]
V2 -->|問題なし| PROMO[100% に切り替え]
V2 -->|問題あり| ROLL[v1 に 100% ロールバック]
style PROMO fill:#0f9d58,color:#fff,stroke:#0f9d58
style ROLL fill:#ea4335,color:#fff,stroke:#ea4335`,
    'diag-gcs-lifecycle': `flowchart LR
UPLOAD["オブジェクト作成<br/>Standard"] -->|30日後| N["Nearline<br/>自動移行"]
N -->|90日後| C["Coldline<br/>自動移行"]
C -->|365日後| A["Archive<br/>自動移行"]
A -->|730日後| DEL[自動削除]
style UPLOAD fill:#1a73e8,color:#fff,stroke:#1a73e8
style DEL fill:#ea4335,color:#fff,stroke:#ea4335`,
    'diag-db-select': `flowchart TD
START[データの種類は?] --> SQL{"構造化データ<br/>SQLが必要?"}
SQL -->|Yes| SCALE{"グローバル分散<br/>99.999%可用性?"}
SCALE -->|Yes| SPANNER["Cloud Spanner<br/>グローバル分散・水平スケール"]
SCALE -->|No| PERF{"PostgreSQL互換で<br/>4倍の性能が必要?"}
PERF -->|Yes| ALLOY["AlloyDB<br/>PG互換・AI最適化"]
PERF -->|No| CSQL["Cloud SQL<br/>MySQL/PG/SQL Server"]
SQL -->|No| NOSQL{どんな特性?}
NOSQL -->|大規模時系列・IoT| BT["Cloud Bigtable<br/>PB規模・ミリ秒レイテンシ"]
NOSQL -->|リアルタイム同期<br/>モバイル| FS["Firestore<br/>サーバーレス・強整合性"]
NOSQL -->|マイクロ秒キャッシュ| MEM["Memorystore<br/>Redis/Memcached"]
START --> DWH{分析・DWH?}
DWH -->|Yes| BQ["BigQuery<br/>サーバーレス分析エンジン"]
START --> ORACLE{"Oracle を<br/>リフトシフト?"}
ORACLE -->|Yes| BMS[Bare Metal Solution]
style SPANNER fill:#1a73e8,color:#fff,stroke:#1a73e8
style ALLOY fill:#0f9d58,color:#fff,stroke:#0f9d58
style BQ fill:#fbbc04,color:#000,stroke:#fbbc04`,
    'diag-shared-vpc': `flowchart TD
HOST["ホストプロジェクト<br/>ネットワーク管理チーム"] --> VPC["VPC ネットワーク<br/>サブネット・ファイアウォール集中管理"]
VPC --> SP1["サービスプロジェクト 1<br/>フロントエンドチーム"]
VPC --> SP2["サービスプロジェクト 2<br/>バックエンドチーム"]
VPC --> SP3["サービスプロジェクト 3<br/>DB チーム"]
SP1 -.->|Network User ロール付与| VPC
SP2 -.->|Network User ロール付与| VPC
SP3 -.->|Network User ロール付与| VPC
style HOST fill:#1a73e8,color:#fff,stroke:#1a73e8`,
    'diag-vpc-peering': `flowchart LR
A[VPC A] <-->|ピアリング| B[VPC B]
B <-->|ピアリング| C[VPC C]
A -. "直接通信 ❌<br/>(推移的でない)" .-> C
style A fill:#1a73e8,color:#fff,stroke:#1a73e8
style B fill:#0f9d58,color:#fff,stroke:#0f9d58
style C fill:#fbbc04,color:#000,stroke:#fbbc04`,
    'diag-lb-select': `flowchart TD
START[どんなトラフィック?] --> HTTP{HTTP/HTTPS?}
HTTP -->|Yes| ALB[Application Load Balancer L7]
ALB --> GLOB{グローバル配信?}
GLOB -->|Yes| GALB[Global External ALB Premium Tier 使用]
GLOB -->|No| COMP{"コンプライアンス要件<br/>データ主権?"}
COMP -->|Yes| RALB["Regional ALB<br/>⚠️ 必ずリージョナルを選択"]
COMP -->|No| RALB2[Regional ALB]
HTTP -->|No TCP/UDP 等| NLB[Network Load Balancer L4]
NLB --> SSL{SSL オフロードが必要?}
SSL -->|Yes| PNLB["Proxy Network LB<br/>SSL 終端・送信元 IP 失われる"]
SSL -->|No| PASS["Passthrough Network LB<br/>送信元 IP 保持・DSR"]
style GALB fill:#1a73e8,color:#fff,stroke:#1a73e8
style RALB fill:#ea4335,color:#fff,stroke:#ea4335
style PASS fill:#0f9d58,color:#fff,stroke:#0f9d58`,
    'diag-tf-state': `flowchart TD
CODE["Terraform コード<br/>.tf ファイル"] <-->|マッピングを管理| STATE["terraform.tfstate<br/>State ファイル"]
STATE <-->|実際のリソース情報| GCP[GCP リソース]
subgraph 推奨バックエンド
GCS["Cloud Storage バケット<br/>リモートバックエンド"]
GCS -->|バージョニング有効| VER[変更履歴を保存]
GCS -->|State ロック有効| LOCK[並行 apply を防止]
end
STATE -.->|保存| GCS`,
    'diag-tf-flow': `flowchart LR
COMMIT["コードを<br/>git commit"] --> PLAN["terraform plan<br/>-out=tfplan"]
PLAN --> REVIEW["変更内容を<br/>レビュー"]
REVIEW --> APPLY["terraform apply<br/>tfplan"]
APPLY --> VERIFY["デプロイ結果<br/>を確認"]
style PLAN fill:#1a73e8,color:#fff,stroke:#1a73e8
style APPLY fill:#0f9d58,color:#fff,stroke:#0f9d58`,
    'diag-ops-agent': `flowchart LR
VM[Compute Engine VM] --> OPS[Ops Agent]
OPS --> FB["Fluent Bit<br/>ログ収集エンジン"]
OPS --> OT["OpenTelemetry Collector<br/>メトリクス収集エンジン"]
FB --> LOG[Cloud Logging]
OT --> MON[Cloud Monitoring]
style OPS fill:#1a73e8,color:#fff,stroke:#1a73e8
style LOG fill:#0f9d58,color:#fff,stroke:#0f9d58
style MON fill:#0f9d58,color:#fff,stroke:#0f9d58`,
    'diag-app-consistent': `sequenceDiagram
participant A as アプリ(MySQL)
participant OS as Linux OS
participant GCP as Google Cloud
Note over A: fsfreeze または FLUSH TABLES WITH READ LOCK
OS->>OS: sudo fsfreeze --freeze /data
Note over OS: ファイルシステムを凍結(書き込み停止)
OS->>GCP: gcloud compute disks snapshot
GCP-->>OS: スナップショット取得完了
OS->>OS: sudo fsfreeze --unfreeze /data
Note over OS: ⚠️ 必ずフリーズ解除！忘れると書き込み不可`,
    'diag-logging-flow': `flowchart TD
subgraph ログ発生源
GCP_SVC["GCP サービス<br/>GKE / Cloud SQL / Cloud Run / LB"]
VM_OPS["Compute Engine VM<br/>Ops Agent 経由"]
APP["アプリケーション<br/>Cloud Logging API"]
end
subgraph Cloud Logging
INGEST["ログ受信・保存<br/>インデックス作成"]
ROUTER["Log Router<br/>シンク振り分け"]
end
subgraph エクスポート先
BKT["Cloud Logging バケット<br/>デフォルト 30日保持"]
BQ["BigQuery<br/>長期保存・SQL 分析"]
GCS["Cloud Storage<br/>アーカイブ・低コスト"]
PS["Pub/Sub<br/>リアルタイム処理・SIEM 連携"]
end
GCP_SVC --> INGEST
VM_OPS --> INGEST
APP --> INGEST
INGEST --> ROUTER
ROUTER --> BKT
ROUTER --> BQ
ROUTER --> GCS
ROUTER --> PS
style BQ fill:#1a73e8,color:#fff,stroke:#1a73e8
style PS fill:#ea4335,color:#fff,stroke:#ea4335`,
    'diag-role-select': `flowchart TD
NEED[権限を付与したい] --> PRED{"事前定義ロールで<br/>要件を満たせるか?"}
PRED -->|Yes| USE["事前定義ロールを使用 ✅"]
PRED -->|No - 過剰権限 or 組み合わせが必要| CUSTOM["カスタムロールを作成<br/>最小限の権限で定義"]
BASIC["基本ロール<br/>Viewer / Editor / Owner"] --> DANGER["⚠️ 本番環境での使用は原則禁止<br/>粒度が粗すぎる"]
style USE fill:#0f9d58,color:#fff,stroke:#0f9d58
style DANGER fill:#ea4335,color:#fff,stroke:#ea4335`,
    'diag-keyless-auth': `flowchart TD
NEED[GCP API にアクセスしたい] --> WHERE{どこから?}
WHERE -->|GCE / GKE / Cloud Run| META["インスタンスに SA をアタッチ<br/>メタデータサーバーから自動取得 ✅"]
WHERE -->|開発者のローカル PC| ADC["gcloud auth application-default login<br/>ADC を使用 ✅"]
WHERE -->|GitHub Actions / GitLab CI| WIF["Workload Identity Federation<br/>キーレス認証 ✅"]
WHERE -->|AWS / Azure / オンプレ| WIF2["Workload Identity Federation<br/>外部 IdP トークンを交換 ✅"]
WHERE -->|一時的な特権操作| IMP["SA Impersonation<br/>短期トークン・監査ログ付き ✅"]
AVOID["❌ SA JSON キー<br/>ほぼ使うべきシナリオなし"]
style META fill:#0f9d58,color:#fff,stroke:#0f9d58
style ADC fill:#0f9d58,color:#fff,stroke:#0f9d58
style WIF fill:#0f9d58,color:#fff,stroke:#0f9d58
style WIF2 fill:#0f9d58,color:#fff,stroke:#0f9d58
style IMP fill:#0f9d58,color:#fff,stroke:#0f9d58
style AVOID fill:#ea4335,color:#fff,stroke:#ea4335`,
    'diag-wif-flow': `sequenceDiagram
participant GH as GitHub Actions
participant STS as Google STS<br>Security Token Service
participant SA as IAM Service Account
participant GCP as GCP API
GH->>GH: GitHub OIDC トークンを生成
GH->>STS: OIDC トークンを提示
STS->>STS: トークンを検証
STS-->>GH: 短期 Google アクセストークンを発行
GH->>GCP: アクセストークンで API 呼び出し
Note over GH,GCP: SA の JSON キーをどこにも保存しない！`,
    'diag-vm-security': `flowchart TD
INTERNET[インターネット] --> CA["Layer 1: Cloud Armor<br/>DDoS / WAF 防御"]
CA --> FW["Layer 2: ファイアウォールルール<br/>IAP IP レンジのみ SSH 許可<br/>35.235.240.0/20"]
FW --> IAP["Layer 3: Identity-Aware Proxy<br/>Google アカウント認証・IAM 認可"]
IAP --> OSLOGIN["Layer 4: OS Login + 2FA<br/>IAM ベースの SSH 管理"]
OSLOGIN --> VM["VM<br/>外部 IP なし構成"]
style CA fill:#1a73e8,color:#fff,stroke:#1a73e8
style FW fill:#0f9d58,color:#fff,stroke:#0f9d58
style IAP fill:#fbbc04,color:#000,stroke:#fbbc04
style OSLOGIN fill:#ea4335,color:#fff,stroke:#ea4335
style VM fill:#333,color:#fff,stroke:#555`,
};
