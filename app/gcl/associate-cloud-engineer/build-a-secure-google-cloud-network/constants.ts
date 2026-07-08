/**
 * Build a Secure Google Cloud Network ページで使用する Mermaid ダイアグラム定数。
 * MermaidDiagram コンポーネントへ渡す chart prop として利用する。
 */

export const DIAGRAMS = {
    'diag-flowchart-overview': `flowchart TB
    User([外部ユーザー])
    Admin([管理者])
    subgraph Edge[Google エッジ / グローバル]
        Armor[Cloud Armor L7 フィルタ]
        GLB[外部 Application Load Balancer]
        IAP[Identity-Aware Proxy]
    end
    subgraph VPC[VPC ネットワーク]
        FW{ファイアウォール ルール}
        subgraph SubnetA[サブネット A]
            Web[Web サーバー群 MIG]
        end
        subgraph SubnetB[サブネット B]
            Internal[内部サービス ILB バックエンド]
        end
        Bastion[踏み台 / 管理 VM]
    end
    User -->|HTTP/HTTPS| Armor --> GLB --> FW --> Web
    Admin -->|SSH 認証付き| IAP --> FW --> Bastion
    Web -->|内部通信| FW --> Internal`,

    'diag-reachability-internal': `flowchart LR
    A[VM-A] -->|"同じ VPC・同じ範囲"| B[VM-B 到達可能]
    A -.->|別の VPC| C[VM-C 到達不可]
    A -->|"外部 IP + ICMP 許可"| D[VM-D 到達可能]`,

    'diag-fw-network-tag': `flowchart TB
    Rule[ファイアウォールルール allow-http-web-server tcp:80 許可]
    Rule -->|target tag: web-server| Blue[blue サーバー tag: web-server]
    Rule -.->|タグなし→適用外| Green[green サーバー タグなし]
    Internet([インターネット]) -->|HTTP 80| Blue
    Internet -.->|拒否| Green`,

    'diag-iam-network-roles': `flowchart TB
    subgraph NetAdmin[Network Admin ロール]
        N1[ファイアウォール一覧表示: 可]
        N2[ファイアウォール削除: 不可]
    end
    subgraph SecAdmin[Security Admin ロール]
        S1[ファイアウォール一覧表示: 可]
        S2[ファイアウォール削除: 可]
    end`,

    'diag-iap-seq-diagram': `sequenceDiagram
    participant Dev as 管理者の端末
    participant IAP as Identity-Aware Proxy
    participant IAM as IAM ポリシー
    participant VM as プライベート VM（外部 IP なし）
    Dev->>IAP: SSH 接続要求 + Google 認証情報
    IAP->>IAP: 1. 認証（有効な Google ID か）
    IAP->>IAM: 2. 認可（権限があるか確認）
    IAM-->>IAP: Tunnel User ロール確認
    IAP->>IAP: 3. コンテキスト認証（任意）
    IAP->>VM: 暗号化トンネル経由で接続
    Note over IAP,VM: 4. アクセスログを記録（監査）
    VM-->>Dev: SSH セッション確立`,

    'diag-iap-flowchart': `flowchart LR
    A[Step 1 IAP API を有効化] --> B[Step 2 ファイアウォールで IAP 範囲を許可]
    B --> C[Step 3 IAM で Tunnel User ロール付与]
    C --> D[SSH/RDP 接続可能]`,

    'diag-glb-flowchart': `flowchart TB
    U1([アジアのユーザー])
    U2([欧州のユーザー])
    subgraph Edge[Google エッジ PoP]
        Armor[Cloud Armor L7 フィルタ / 拒否リスト]
        LB[グローバル外部 Application LB 単一の IP]
    end
    subgraph R1[リージョン 1]
        MIG1[MIG: Web サーバー オートスケール]
    end
    subgraph R2[リージョン 2]
        MIG2[MIG: Web サーバー オートスケール]
    end
    U1 --> Armor
    U2 --> Armor
    Armor --> LB
    LB -->|最寄りの健全な バックエンドへ| MIG1
    LB -->|高負荷時は オーバーフロー| MIG2`,

    'diag-armor-blocking': `flowchart LR
    Attacker([攻撃元 IP]) -->|siege 負荷攻撃| Armor{Cloud Armor denylist-siege}
    Armor -->|一致 → Deny| Block[403 Forbidden]
    Normal([正常ユーザー]) -->|デフォルト Allow| LB[Load Balancer] --> Backend[バックエンド]`,

    'diag-ilb-flowchart': `flowchart TB
    Client[内部クライアント utility-vm]
    subgraph Region[リージョン内]
        ILB[内部 LB my-ilb 10.10.30.5]
        subgraph ZoneA[ゾーン A]
            IG1[instance-group-1 subnet-a]
        end
        subgraph ZoneB[ゾーン B]
            IG2[instance-group-2 subnet-b]
        end
    end
    Client -->|curl 10.10.30.5| ILB
    ILB --> IG1
    ILB --> IG2`,

    'diag-composite-exercise': `flowchart TB
    Admin([管理者])
    World([インターネット])
    subgraph VPC[VPC ネットワーク]
        subgraph MgmtSubnet[管理サブネット]
            Bastion[bastion 外部 IP なし tag: ssh-iap]
        end
        subgraph AppSubnet[アプリサブネット]
            App[juice-shop tag: http, ssh-internal]
        end
    end
    Admin -->|SSH 22 IAP のみ| IAP[IAP 35.235.240.0/20]
    IAP --> Bastion
    Bastion -->|SSH 22 管理サブネットから| App
    World -->|HTTP 80 のみ| App`,

    'diag-securing-steps': `flowchart LR
    A[Step 1 過剰に緩い 既存ルールを削除] --> B[Step 2 タグを設計し VM に付与]
    B --> C[Step 3 最小範囲の 許可ルールを作成]
    C --> D[Step 4 IAP 経由で 接続テスト]`,
};
