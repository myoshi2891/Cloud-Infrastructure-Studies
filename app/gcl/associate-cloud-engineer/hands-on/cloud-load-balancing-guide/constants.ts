export const REVISION_DATE = '2026年6月版';

export const DIAGRAMS: Record<string, string> = {
    'diag-setup': `flowchart TD
    A[Start Lab をクリック] --> B[一時credentialsで<br/>Google Cloud コンソールにサインイン]
    B --> C[Cloud Shell をアクティブ化]
    C --> D[gcloud auth list で<br/>アクティブアカウント確認]
    D --> E[デフォルトの<br/>リージョン・ゾーンを設定]
    E --> F[各シナリオの構築へ]`,
    'diag-l4': `flowchart TD
    Client[インターネットのクライアント] --> FR["転送ルール<br/>(www-rule / 静的IP:80)"]
    FR --> TP["ターゲットプール<br/>(www-pool)"]
    HC[HTTPヘルスチェック<br/>basic-check] -.監視.-> TP
    TP --> W1[www1]
    TP --> W2[www2]
    TP --> W3[www3]`,
    'diag-l7': `flowchart TD
    Client[世界中のクライアント] --> GFE["Google Front End (GFE)<br/>グローバルに分散"]
    GFE --> FR["グローバル転送ルール<br/>(http-content-rule)"]
    FR --> Proxy["ターゲットHTTPプロキシ<br/>(http-lb-proxy)"]
    Proxy --> URLMap["URLマップ<br/>(web-map-http)"]
    URLMap --> BS["バックエンドサービス<br/>(web-backend-service)"]
    HC[HTTPヘルスチェック] -.監視.-> BS
    BS --> MIG["マネージドインスタンスグループ<br/>(lb-backend-group)"]
    MIG --> V1[VM 1]
    MIG --> V2[VM 2]`,
    'diag-internal': `flowchart TD
    User[インターネットのユーザー] --> FE["frontend VM<br/>(公開Webサーバー)"]
    FE --> ILB["内部転送ルール<br/>(prime-lb / 内部IP:80)"]
    ILB --> BS["バックエンドサービス<br/>(prime-service)"]
    HC[HTTPヘルスチェック<br/>/2 で死活監視] -.監視.-> BS
    BS --> MIG["MIG (backend)<br/>素数計算サービス"]
    MIG --> B1[backend-1]
    MIG --> B2[backend-2]
    MIG --> B3[backend-3]`,
    'diag-challenge': `flowchart LR
    T1[タスク1<br/>3台のWebサーバー作成] --> T2[タスク2<br/>L4ロードバランシング構成]
    T2 --> T3[タスク3<br/>L7 HTTPロードバランサ作成]
    T3 --> Test[ブラウザでテスト]`,
    'diag-choose': `flowchart TD
    Start[ロードバランサが必要] --> Q1{トラフィックは<br/>HTTP/HTTPS？}
    Q1 -->|はい| ALB[アプリケーションLB<br/>L7]
    Q1 -->|いいえ<br/>TCP/UDP/その他| Q2{送信元IPの保持や<br/>DSRが必要？}
    Q2 -->|はい| PNLB[パススルー ネットワークLB<br/>L4]
    Q2 -->|いいえ<br/>TLS終端したい| ProxyNLB[プロキシ ネットワークLB<br/>L4]
    ALB --> Q3{公開範囲は？}
    PNLB --> Q3
    Q3 -->|インターネット向け| Ext[外部LB]
    Q3 -->|VPC内のみ| Int[内部LB]`,
};
export type DiagramId = keyof typeof DIAGRAMS;
