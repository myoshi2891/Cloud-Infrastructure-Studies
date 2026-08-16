/**
 * PCNE Section 3: ロードバランシングとトラフィック管理 定数定義
 */

export interface NavItem {
    id: string;
    label: string;
    level: 2 | 3;
}

export const NAV_ITEMS: NavItem[] = [
    {
        id: 'はじめにこのタスクの位置づけと出題範囲',
        label: 'はじめに：このタスクの位置づけと出題範囲',
        level: 2,
    },
    {
        id: 'ロードバランサーの全体アーキテクチャと選択基準',
        label: 'ロードバランサーの全体アーキテクチャと選択基準',
        level: 2,
    },
    {
        id: 'google-cloudロードバランサーの分類軸',
        label: 'Google Cloudロードバランサーの分類軸',
        level: 3,
    },
    {
        id: '選択フローチャート',
        label: '選択フローチャート',
        level: 3,
    },
    {
        id: '主要ロードバランサー比較表',
        label: '主要ロードバランサー比較表',
        level: 3,
    },
    {
        id: 'ネットワークサービスティアとの関係',
        label: 'ネットワークサービスティアとの関係',
        level: 3,
    },
    {
        id: 'バックエンドサービスとオートスケーリングの設定',
        label: 'バックエンドサービスとオートスケーリングの設定',
        level: 2,
    },
    {
        id: 'バックエンドの種類mig-vs-neg',
        label: 'バックエンドの種類：MIG vs NEG',
        level: 3,
    },
    {
        id: 'negの6分類',
        label: 'NEGの6分類',
        level: 3,
    },
    {
        id: 'オートスケーリングとの連携',
        label: 'オートスケーリングとの連携',
        level: 3,
    },
    {
        id: 'ロードバランサーとバックエンドの詳細設定',
        label: 'ロードバランサーとバックエンドの詳細設定',
        level: 2,
    },
    {
        id: 'バランシングモードとキャパシティスケーラー',
        label: 'バランシングモードとキャパシティスケーラー',
        level: 3,
    },
    {
        id: 'セッションアフィニティ',
        label: 'セッションアフィニティ',
        level: 3,
    },
    {
        id: 'urlマップの構造',
        label: 'URLマップの構造',
        level: 3,
    },
    {
        id: 'ヘルスチェック',
        label: 'ヘルスチェック',
        level: 3,
    },
    {
        id: 'グローバルアクセス内部ロードバランサー',
        label: 'グローバルアクセス（内部ロードバランサー）',
        level: 3,
    },
    {
        id: 'gkeにおけるロードバランシング',
        label: 'GKEにおけるロードバランシング',
        level: 2,
    },
    {
        id: 'gke-ingress-controllerレガシー',
        label: 'GKE Ingress controller（レガシー）',
        level: 3,
    },
    {
        id: 'gke-gateway-controllergateway-api',
        label: 'GKE Gateway controller（Gateway API）',
        level: 3,
    },
    {
        id: 'negとcontainer-native-load-balancing',
        label: 'NEGとContainer-Native Load Balancing',
        level: 3,
    },
    {
        id: 'application-load-balancerでのトラフィック管理',
        label: 'Application Load Balancerでのトラフィック管理',
        level: 2,
    },
    {
        id: 'トラフィックスプリッティングカナリアリリース',
        label: 'トラフィックスプリッティング（カナリアリリース）',
        level: 3,
    },
    {
        id: 'トラフィックミラーリング',
        label: 'トラフィックミラーリング',
        level: 3,
    },
    {
        id: 'url書き換えrewriteとリダイレクト',
        label: 'URL書き換え（Rewrite）とリダイレクト',
        level: 3,
    },
    {
        id: '設計実装ベストプラクティスまとめ',
        label: '設計・実装ベストプラクティスまとめ',
        level: 2,
    },
    {
        id: '参考文献',
        label: '参考文献',
        level: 2,
    },
];

export type DiagramId =
    | 'diag-selection-flowchart'
    | 'diag-neg-types'
    | 'diag-url-map-structure'
    | 'diag-health-check'
    | 'diag-global-access'
    | 'diag-gke-ingress'
    | 'diag-gke-gateway'
    | 'diag-traffic-splitting'
    | 'diag-traffic-mirroring'
    | 'diag-url-rewrite';

export const DIAGRAMS: Record<DiagramId, string> = {
    'diag-selection-flowchart': `flowchart TD
    A{"トラフィックの種類は?"} -->|HTTP/HTTPS/HTTP2/gRPC| B["Application Load Balancer"]
    A -->|複数リージョンへのTCP/SSLプロキシ| C["Proxy Network Load Balancer"]
    A -->|送信元IP保持・UDP/ESP/ICMP等| D["Passthrough Network Load Balancer"]
    B --> E{"公開範囲は?"}
    E -->|外部公開 external| F{"バックエンドの分散は?"}
    E -->|VPC内部のみ internal| G{"バックエンドの分散は?"}
    F -->|グローバル・マルチリージョン| H["グローバル外部<br/>Application Load Balancer"]
    F -->|単一リージョンで十分| I["リージョン外部<br/>Application Load Balancer"]
    G -->|複数リージョンのバックエンド| J["クロスリージョン内部<br/>Application Load Balancer"]
    G -->|単一リージョンのバックエンド| K["リージョン内部<br/>Application Load Balancer"]`,

    'diag-neg-types': `flowchart TD
    NEG["Network Endpoint Group"] --> Z["ゾーンNEG<br/>GCE_VM_IP / GCE_VM_IP_PORT"]
    NEG --> S["サーバーレスNEG<br/>Cloud Run / App Engine / Cloud Run functions"]
    NEG --> I["インターネットNEG<br/>グローバル / リージョナル"]
    NEG --> H["ハイブリッド接続NEG<br/>オンプレミス・他クラウド"]
    NEG --> P["PSC NEG<br/>Private Service Connect"]
    NEG --> PM["ポートマッピングNEG<br/>同一IPで複数コンテナポート"]`,

    'diag-url-map-structure': `flowchart TD
    UM["URLマップ"] --> HR["ホストルール<br/>例: example.com"]
    HR --> PM2["パスマッチャー"]
    PM2 --> PR1["パスルール /video/*"]
    PM2 --> PR2["パスルール /images/*"]
    PM2 --> DEF["デフォルトサービス"]
    PR1 --> BS1["バックエンドサービス: video"]
    PR2 --> BS2["バックエンドサービス: images"]
    DEF --> BS3["バックエンドサービス: web-default"]`,

    'diag-health-check': `flowchart TD
    P["ヘルスチェックプローブ<br/>送信元: 130.211.0.0/22, 35.191.0.0/16"] --> FW{"ファイアウォールルール<br/>ingress allow"}
    FW -->|許可| VM["バックエンドVM / Pod"]
    FW -->|未許可| Fail["全バックエンドがUNHEALTHYに"]
    VM --> Resp{"応答"}
    Resp -->|200 OK| Healthy["HEALTHY"]
    Resp -->|それ以外・タイムアウト・リダイレクト| Unhealthy["UNHEALTHY"]`,

    'diag-global-access': `flowchart TD
    C1["クライアント (asia-east1)"] -->|グローバルアクセス有効| ILB["内部LB VIP<br/>us-central1"]
    C2["クライアント (europe-west1)"] -->|グローバルアクセス有効| ILB
    C3["クライアント (us-central1・同一リージョン)"] -->|常にアクセス可能| ILB
    ILB --> BE["バックエンド (us-central1)"]`,

    'diag-gke-ingress': `flowchart TD
    Ing["Ingressリソース"] --> IC["GKE Ingress controller"]
    IC --> CLB["Classic Application Load Balancer<br/>固定"]
    CLB --> NEG1["GCE_VM_IP_PORT ゾーンNEG<br/>(インスタンスグループも可)"]`,

    'diag-gke-gateway': `flowchart TD
    GC["GatewayClass"] --> GW["Gatewayリソース"]
    GW --> HR2["HTTPRouteリソース"]
    HR2 --> BS4["バックエンドサービス1"]
    HR2 --> BS5["バックエンドサービス2"]`,

    'diag-traffic-splitting': `flowchart LR
    C["クライアント"] --> LB["ロードバランサー"]
    LB -->|重み 950/1000 = 95%| SvcA["バックエンドサービスA<br/>安定版"]
    LB -->|重み 50/1000 = 5%| SvcB["バックエンドサービスB<br/>カナリア版"]`,

    'diag-traffic-mirroring': `sequenceDiagram
    participant Client as クライアント
    participant LB as ロードバランサー
    participant Primary as プライマリbackend
    participant Mirror as ミラーbackend
    Client->>LB: リクエスト送信
    LB->>Primary: リクエスト転送
    LB--)Mirror: リクエストを複製送信 (fire-and-forget)
    Primary-->>LB: レスポンス
    LB-->>Client: レスポンス返却
    Note over Mirror: レスポンスは待たず破棄。<br/>ログ・メトリクスも記録されない`,

    'diag-url-rewrite': `flowchart TD
    Req["受信リクエスト /love-to-fetch/dog.jpg"] --> Match{"パスルールにマッチ?"}
    Match -->|Yes| RW["URL書き換え<br/>パスプレフィックスを /love-to-fetch/ → / に変換"]
    RW --> FwdReq["バックエンドへの実送信 /dog.jpg"]
    Match -->|No| Default["デフォルトサービスへ"]`,
};

export const CHECKLIST_ITEMS: string[] = [
    'トラフィックの種類（HTTP系かTCP/UDP系か、送信元IP保持が必要か）を最初に確定し、Application/Proxy/Passthroughの3系統から絞り込む',
    'GKEワークロードのバックエンドはNEG（GCE_VM_IP_PORT）を優先し、UTILIZATIONバランシングモードが使えない前提でRATE/CONNECTIONベースの容量設計を行う',
    'UTILIZATIONバランシングモードとセッションアフィニティは併用しない',
    'ウェイト付きトラフィックスプリッティングを使う場合はセッションアフィニティを設定しない（設定しても分割設定が優先される）',
    'ヘルスチェックプローブ範囲（130.211.0.0/22、35.191.0.0/16、外部パススルーLBでは追加で209.85.152.0/22・209.85.204.0/22）を許可するファイアウォールルールを必ず作成する',
    'ヘルスチェック専用の軽量エンドポイントを用意し、リダイレクトを発生させない',
    '内部LBで複数リージョンにまたがるアクセスが必要な場合、リージョン内部LB＋グローバルアクセスではなく、クロスリージョン内部LBによるマルチリージョンバックエンド構成を優先的に検討する',
    '新規GKE Ingress実装はレガシーのIngress controllerではなく、Gateway API（GKE Gateway controller）を第一候補とする',
    'トラフィックミラーリング先のバックエンドはログ・メトリクスが記録されないため、検証用の独立した監視手段を別途用意する',
    'カナリアリリースではトラフィックスプリッティングの重みを段階的に引き上げつつ、Cloud Monitoringでエラー率・レイテンシを比較しながらロールアウトする',
];
