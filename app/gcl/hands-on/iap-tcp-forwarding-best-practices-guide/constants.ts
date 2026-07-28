export interface NavItem {
    id: string;
    label: string;
    subItems?: { id: string; label: string }[];
}

export const NAV_ITEMS: NavItem[] = [
    { id: '1-このガイドについて', label: '1. このガイドについて' },
    {
        id: '2-iapとは何かなぜ使うのか',
        label: '2. IAPとは何か、なぜ使うのか',
        subItems: [
            { id: '21-課題-踏み台サーバーと外部ipのリスク', label: '2.1 課題: 「踏み台サーバー」と外部IPのリスク' },
            { id: '22-iapというアプローチ', label: '2.2 IAPというアプローチ' },
        ],
    },
    { id: '3-全体アーキテクチャ', label: '3. 全体アーキテクチャ' },
    { id: '4-作業の全体像', label: '4. 作業の全体像' },
    {
        id: '5-ステップ別解説',
        label: '5. ステップ別解説',
        subItems: [
            { id: '51-task-1-iap-tcp-forwarding-apiの有効化', label: '5.1 Task 1: APIの有効化' },
            { id: '52-task-2-vmインスタンスの作成ベストプラクティス注記', label: '5.2 Task 2: VMインスタンスの作成' },
            { id: '53-task-3-接続不可であることの確認', label: '5.3 Task 3: 接続不可であることの確認' },
            { id: '54-task-4-ファイアウォールルールの作成重要な差分あり', label: '5.4 Task 4: ファイアウォールルールの作成' },
            { id: '55-task-5-iam権限の付与最小権限の原則', label: '5.5 Task 5: IAM権限の付与' },
            { id: '56-task-6-iap-desktopでの接続', label: '5.6 Task 6: IAP Desktopでの接続' },
            { id: '57-task-7-gcloud-cliによるsshrdpトンネリング', label: '5.7 Task 7: gcloud CLIによるトンネリング' },
        ],
    },
    { id: '6-本番環境への適用時のベストプラクティスまとめ', label: '6. 本番環境ベストプラクティスまとめ' },
    { id: '7-トラブルシューティング', label: '7. トラブルシューティング' },
    { id: '8-まとめ', label: '8. まとめ' },
    { id: '9-参考文献', label: '9. 参考文献' },
];

export const DIAGRAMS = {
    architecture: `flowchart LR
    subgraph Client["管理者のクライアント"]
        A["gcloud CLI / ブラウザSSH / RDPクライアント"]
    end

    subgraph GCP["Google Cloud プロジェクト"]
        IAP["Identity-Aware Proxy<br/>TCPフォワーディング"]
        subgraph VPC["VPCネットワーク"]
            FW["ファイアウォールルール<br/>送信元: 35.235.240.0/20<br/>ポート: TCP 22 / 3389 を許可"]
            L["linux-iap<br/>（外部IPなし）"]
            W["windows-iap<br/>（外部IPなし）"]
            C["windows-connectivity<br/>（外部IPあり・検証用の踏み台）"]
        end
    end

    A -->|"HTTPSトンネルを確立"| IAP
    IAP -->|"IAMポリシーで可否判定"| FW
    FW --> L
    FW --> W
    C -.->|"IAP Desktop / gcloud を実行"| IAP`,

    firewall: `flowchart TD
    Start["VMへのアクセス要件を確認"] --> Source["送信元: 35.235.240.0/20 を許可"]
    Source --> Target{"ターゲットの絞り込み方法"}
    Target -->|"避けるべき"| All["すべてのインスタンス"]
    Target -->|"推奨"| Tag["特定のターゲットタグ"]
    Target -->|"より厳密に管理したい場合"| SA["特定のサービスアカウント"]`,

    iamSequence: `sequenceDiagram
    participant U as 管理者
    participant G as gcloud CLI
    participant IAP as IAP TCPフォワーディング
    participant IAM as IAMポリシー
    participant VM as linux-iap（内部IPのみ）

    U->>G: gcloud compute ssh linux-iap
    G->>IAP: HTTPSトンネル確立を要求
    IAP->>IAM: roles/iap.tunnelResourceAccessor を持つか確認
    IAM-->>IAP: 許可 または 拒否 を返す
    alt 許可された場合
        IAP->>VM: 内部IP宛にSSHトラフィックを転送
        VM-->>IAP: SSHセッション応答
        IAP-->>G: トンネル経由で応答を転送
        G-->>U: ターミナルセッションが開始
    else 拒否された場合
        IAP-->>G: 403 Permission Denied
        G-->>U: エラーを表示
    end`,

    iamDesign: `flowchart TD
    A["プリンシパルを決定"] --> B{"付与範囲"}
    B -->|"避けるべき"| C["プロジェクト全体<br/>（全VMにアクセス可）"]
    B -->|"推奨（ハンズオンの方式）"| D["VM単位で<br/>iap.tunnelResourceAccessor を付与"]
    D --> E{"さらに絞り込むか"}
    E -->|"推奨: IAM Conditionsを利用"| F["ポート番号・有効期限などで<br/>アクセス範囲を制限"]
    E -->|"利用しない"| G["VM単位の権限のみ"]`,

    rdpTunnel: `flowchart LR
    A["gcloud compute start-iap-tunnel<br/>windows-iap 3389"] --> B["ローカルに<br/>listeningポートが開く"]
    B --> C["RDPクライアントで<br/>localhost:ポート番号 に接続"]
    C --> D["IAPがHTTPS経由で<br/>windows-iapの3389番へ中継"]`,

    troubleshooting: `flowchart TD
    Fail["SSH/RDP接続に失敗する"] --> C1{"ファイアウォールルールは<br/>存在するか"}
    C1 -->|"いいえ"| Fix1["35.235.240.0/20 からの<br/>TCP 22/3389 を許可するルールを作成"]
    C1 -->|"はい"| C2{"送信元範囲・ポート番号は<br/>正しいか"}
    C2 -->|"いいえ"| Fix2["ポート番号とIP範囲の<br/>設定を見直す"]
    C2 -->|"はい"| C3{"IAMロールは<br/>付与されているか"}
    C3 -->|"いいえ"| Fix3["対象VMまたはプロジェクトに<br/>roles/iap.tunnelResourceAccessor を付与"]
    C3 -->|"はい"| C4{"社内プロキシ経由の<br/>アクセスか"}
    C4 -->|"はい"| Fix4["IAP for TCPのドメインを<br/>社内ネットワークで許可リストに追加"]
    C4 -->|"いいえ"| C5["Cloud Loggingで<br/>AuthorizeUserの監査ログを確認"]`,
};
