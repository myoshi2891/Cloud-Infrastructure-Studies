/**
 * PCNE Section 5: ネットワークセキュリティの設計と実装
 * 定数定義（Mermaid図、ナビゲーション、メタデータ）
 */

export type DiagramId = 'diag-1' | 'diag-2' | 'diag-3' | 'diag-4' | 'diag-5' | 'diag-6' | 'diag-7' | 'diag-8' | 'diag-9' | 'diag-10' | 'diag-11' | 'diag-12' | 'diag-13' | 'diag-14' | 'diag-15' | 'diag-16' | 'diag-17';

export const DIAGRAMS: Record<DiagramId, string> = {
    'diag-1': `flowchart LR
    subgraph Internet["インターネット"]
        Client["クライアント"]
    end

    subgraph Edge["Googleエッジ(PoP) — Cloud Armor評価ポイント"]
        CA["Cloud Armor<br/>セキュリティポリシー評価<br/>許可 / 拒否 / レート制限 / リダイレクト"]
    end

    subgraph GCP["Google Cloudネットワーク内部"]
        LB["外部ロードバランサー<br/>(Application / Proxy Network)"]
        BE1["バックエンドサービス<br/>(MIG / NEG / サーバーレスNEG)"]
        BE2["バックエンドバケット<br/>(Cloud Storage)"]
    end

    Client -->|"HTTPS リクエスト"| CA
    CA -->|"ALLOW"| LB
    CA -->|"DENY"| Dropped["リクエスト破棄<br/>(バックエンドへ到達しない)"]
    LB --> BE1
    LB --> BE2

    style CA fill:#1a73e8,color:#fff
    style Dropped fill:#d93025,color:#fff`,

    'diag-2': `flowchart TD
    Start(["受信リクエスト"]) --> P1{"優先度が最も低い<br/>数値のルールから評価"}
    P1 -->|"条件マッチ"| Act{"ルールのアクション"}
    P1 -->|"マッチなし"| Next["次に優先度が低い<br/>(数値が大きい)ルールを評価"]
    Next --> P1
    P1 -->|"全ルール未マッチ"| Default["デフォルトルール<br/>(通常は allow)"]

    Act -->|"allow"| Allowed["バックエンドへ転送"]
    Act -->|"deny"| Denied["拒否レスポンス<br/>(403等)を返却"]
    Act -->|"throttle / rate_based_ban"| RateCheck["レート制限判定へ"]
    Act -->|"redirect"| Redirect["reCAPTCHA評価 or<br/>指定URLへリダイレクト"]

    style Denied fill:#d93025,color:#fff
    style Allowed fill:#188038,color:#fff`,

    'diag-3': `flowchart TD
    Start(["外部パススルーNLB / プロトコルフォワーディング / パブリックIP VM"]) --> Std["標準ネットワークDDoS防御<br/>(常時有効・操作不要)"]
    Std --> Enroll{"Cloud Armor Enterpriseに<br/>加入しているか?"}
    Enroll -->|"いいえ"| StdOnly["標準保護のみ<br/>(クォータ超過トラフィックの抑制)"]
    Enroll -->|"はい"| CreatePolicy["type=CLOUD_ARMOR_NETWORK の<br/>セキュリティポリシーを作成"]
    CreatePolicy --> EnableAdv["セキュリティポリシーで<br/>高度なDDoS防御を有効化"]
    EnableAdv --> CreateService["リージョンにネットワークエッジ<br/>セキュリティサービスを作成し関連付け"]
    CreateService --> Profiling["トラフィックプロファイリング<br/>(基準値の学習、目安24時間)"]
    Profiling --> Advanced["常時オンの標的型<br/>攻撃検知・緩和が有効化"]

    style Advanced fill:#188038,color:#fff
    style StdOnly fill:#f9ab00,color:#000`,

    'diag-4': `flowchart LR
    A["通常トラフィックの<br/>継続的な学習"] --> B["基準値(baseline)の確立"]
    B --> C{"トラフィックパターンが<br/>基準値から逸脱?"}
    C -->|"いいえ"| A
    C -->|"はい"| D["Cloud Loggingへ<br/>アラートを生成"]
    D --> E["攻撃シグネチャ・<br/>確信度スコア(confidence score)・<br/>推奨WAFルールを算出"]
    E --> F{"自動デプロイ<br/>(auto-deploy)が有効?"}
    F -->|"いいえ"| G["インシデント対応者が<br/>手動でルールをレビュー・適用"]
    F -->|"はい"| H{"確信度・負荷しきい値を<br/>超過?"}
    H -->|"はい"| I["推奨ルールを自動デプロイ<br/>(有効期限付き)"]
    H -->|"いいえ"| J["監視を継続"]

    style D fill:#f9ab00,color:#000
    style I fill:#d93025,color:#fff`,

    'diag-5': `flowchart TD
    Start(["新規接続パケット到着<br/>(Ingress / Egress)"]) --> Hier["① 階層ファイアウォールポリシー<br/>(組織 → フォルダ、常に最優先)"]
    Hier -->|"allow / deny"| Stop1["評価終了・アクション適用"]
    Hier -->|"goto_next<br/>または未マッチ"| Sys["② リージョンシステム<br/>ファイアウォールポリシー(Google管理)"]
    Sys -->|"allow / deny"| Stop1
    Sys -->|"goto_next<br/>または未マッチ"| Order{"ネットワークファイアウォール<br/>ポリシー適用順序は?"}

    Order -->|"AFTER_CLASSIC_FIREWALL<br/>(デフォルト)"| VPC1["③ VPCファイアウォールルール"]
    VPC1 -->|"allow / deny"| Stop1
    VPC1 -->|"未マッチ"| Global1["④ グローバルネットワーク<br/>ファイアウォールポリシー"]
    Global1 -->|"allow / deny / apply_security_profile_group"| Stop1
    Global1 -->|"goto_next<br/>または未マッチ"| Regional1["⑤ リージョンネットワーク<br/>ファイアウォールポリシー"]
    Regional1 -->|"allow / deny"| Stop1
    Regional1 -->|"goto_next<br/>または未マッチ"| Implied1["⑥ 暗黙のアクション<br/>(Ingress:deny / Egress:allow)"]

    Order -->|"BEFORE_CLASSIC_FIREWALL"| Global2["③ グローバルネットワーク<br/>ファイアウォールポリシー"]
    Global2 -->|"allow / deny / apply_security_profile_group"| Stop1
    Global2 -->|"goto_next<br/>または未マッチ"| Regional2["④ リージョンネットワーク<br/>ファイアウォールポリシー"]
    Regional2 -->|"allow / deny"| Stop1
    Regional2 -->|"goto_next<br/>または未マッチ"| VPC2["⑤ VPCファイアウォールルール"]
    VPC2 -->|"allow / deny"| Stop1
    VPC2 -->|"未マッチ"| Implied2["⑥ 暗黙のアクション<br/>(Ingress:deny / Egress:allow)"]

    style Stop1 fill:#188038,color:#fff
    style Implied1 fill:#f9ab00,color:#000
    style Implied2 fill:#f9ab00,color:#000`,

    'diag-6': `flowchart TD
    Pkt(["ターゲットVMへの新規接続パケット"]) --> Org["組織レベルの<br/>階層ファイアウォールポリシー"]
    Org -->|"allow"| AllowOrg["許可・評価終了"]
    Org -->|"deny"| DenyOrg["拒否・評価終了"]
    Org -->|"apply_security_profile_group"| SPG["ファイアウォールエンドポイントへ転送<br/>(L7検査)・評価終了"]
    Org -->|"goto_next"| F1["トップレベルフォルダの<br/>階層ファイアウォールポリシー"]
    F1 -->|"allow / deny / apply_security_profile_group"| Term1["評価終了"]
    F1 -->|"goto_next"| F2["...ターゲットを含む<br/>下位フォルダのポリシー"]
    F2 -->|"allow / deny / apply_security_profile_group"| Term2["評価終了"]
    F2 -->|"goto_next<br/>または全ポリシー評価完了"| Next["次の評価ステップ<br/>(リージョンシステムポリシーへ)"]

    style AllowOrg fill:#188038,color:#fff
    style DenyOrg fill:#d93025,color:#fff
    style Term1 fill:#188038,color:#fff
    style Term2 fill:#188038,color:#fff`,

    'diag-7': `flowchart LR
    subgraph Essentials["Essentials(無料)"]
        E1["Secure Tags"]
        E2["アドレスグループ"]
        E3["階層/グローバル/<br/>リージョンポリシー基盤"]
    end
    subgraph Standard["Standard(南北トラフィック課金)"]
        S1["FQDNオブジェクト"]
        S2["ジオロケーション<br/>オブジェクト"]
        S3["Threat Intelligence"]
    end
    subgraph Enterprise["Enterprise(南北+東西課金)"]
        En1["URLフィルタリング<br/>サービス"]
        En2["IDPS<br/>(侵入検知防止)"]
        En3["TLS Inspection"]
    end

    Essentials --> Standard --> Enterprise

    style Essentials fill:#188038,color:#fff
    style Standard fill:#f9ab00,color:#000
    style Enterprise fill:#1a73e8,color:#fff`,

    'diag-8': `flowchart TD
    Traffic(["受信トラフィック"]) --> R1["優先度1000(高優先度):<br/>Essentials機能のみのルール<br/>(IPアドレス・タグベース)<br/>→ 課金なし"]
    R1 -->|"マッチ"| Done1["処理完了(無料)"]
    R1 -->|"未マッチ"| R2["優先度2000:<br/>Standard/Enterprise機能を含むルール<br/>(特定タグの組み合わせのみ対象)<br/>→ 該当トラフィックのみ課金"]
    R2 -->|"マッチ"| Done2["IDPS検査等を実施<br/>(該当フローのみ課金)"]

    style Done1 fill:#188038,color:#fff
    style Done2 fill:#f9ab00,color:#000`,

    'diag-9': `sequenceDiagram
    participant VM as 送信元VM
    participant FW as ファイアウォール<br/>ポリシールール
    participant EP as ファイアウォール<br/>エンドポイント
    participant CAS as Certificate Authority<br/>Service(CAS)
    participant SPG as セキュリティプロファイル<br/>グループ(URL Filter/IDPS)
    participant Dest as 宛先

    VM->>FW: TLS/HTTP(S) トラフィック
    FW->>FW: apply_security_profile_group<br/>ルールにマッチ
    FW->>EP: トラフィックを転送
    EP->>CAS: 中間証明書を要求(TLS Inspection時)
    CAS-->>EP: 短命の中間証明書を発行
    EP->>EP: TLSを復号し、<br/>URLフィルタリング/IDPSを実行
    alt 検査結果: 許可
        EP->>Dest: 再暗号化して転送
    else 検査結果: 拒否
        EP->>VM: 接続を切断
    end`,

    'diag-10': `flowchart TD
    A["既存VPCファイアウォールルールの棚卸し<br/>(優先度・依存関係を記録)"] --> B{"Network Tags や<br/>サービスアカウントに依存するルールか?"}
    B -->|"依存なし"| C["gcloud beta compute firewall-rules migrate<br/>--source-network --target-firewall-policy"]
    B -->|"依存あり"| D["Network TagsをSecure Tagsへ<br/>マッピングしてから移行"]
    D --> C
    C --> E["移行ツールが新規グローバル<br/>ネットワークファイアウォールポリシーを生成<br/>(既存ルールをポリシールールへ変換)"]
    E --> F["ポリシーを検証<br/>(get-effective-firewalls等で比較)"]
    F --> G["gcloud compute network-firewall-policies<br/>associations create でVPCに関連付け"]
    G --> H{"GKE自動生成ルールが<br/>含まれるか?"}
    H -->|"はい"| I["GKE自動生成ルール(gke-*, k8s-*)は<br/>除外パターンで移行対象から外し、<br/>個別に移行手順を実施"]
    H -->|"いいえ"| J["旧VPCファイアウォールルールを削除"]
    I --> J

    style J fill:#188038,color:#fff`,

    'diag-11': `flowchart TD
    Start(["Cloud NATゲートウェイの設計"]) --> Q1{"VMごとの接続数に<br/>ばらつきが大きいか?"}
    Q1 -->|"いいえ(均一なワークロード)"| Static["静的ポート割り当てを選択<br/>(最小ポート数を用途に応じて調整)"]
    Q1 -->|"はい(バーストする<br/>ワークロードが存在)"| Dynamic["動的ポート割り当てを選択<br/>(最小/最大ポート数を設定)"]

    Static --> IPCalc["IPアドレス数 = <br/>必要VM数 × 最小ポート数 ÷ 64,512<br/>を事前に計算"]
    Dynamic --> Monitor["ポート使用率メトリクスを監視し、<br/>枯渇の兆候があれば最大値を引き上げ"]

    IPCalc --> Manual{"IPの予測可能性が必要か?<br/>(サードパーティ許可リスト等)"}
    Manual -->|"はい"| ManualIP["手動IPアドレス割り当てを併用"]
    Manual -->|"いいえ"| AutoIP["自動IPアドレス割り当てを使用"]

    style Static fill:#1a73e8,color:#fff
    style Dynamic fill:#188038,color:#fff`,

    'diag-12': `sequenceDiagram
    participant VM as VM / コンテナ / サーバーレス
    participant SWP as Secure Web Proxy<br/>(Envoyプロキシプール)
    participant CAS as Certificate Authority<br/>Service
    participant Ext as 外部Webサイト

    VM->>SWP: 明示的プロキシ経由でHTTPS接続要求
    SWP->>SWP: ポリシー評価:<br/>送信元(Tag/SA)・宛先(URL)・<br/>リクエスト属性をマッチング
    alt TLS Inspection有効
        SWP->>CAS: 証明書を要求
        CAS-->>SWP: 証明書を発行
        SWP->>SWP: TLSを復号し、<br/>URLパス/ヘッダーを検査
    end
    alt ポリシーで許可
        SWP->>Ext: 新規TCP接続を作成し転送
        Ext-->>SWP: レスポンス
        SWP-->>VM: レスポンスを返却
    else ポリシーで拒否
        SWP-->>VM: 接続拒否 + Cloud Loggingへ記録
    end`,

    'diag-13': `flowchart TB
    subgraph Hub["ハブVPC"]
        NVA1["NVA VM #1<br/>(nic0: spoke-A側 / nic1: spoke-B側)"]
        NVA2["NVA VM #2<br/>(nic0: spoke-A側 / nic1: spoke-B側)"]
        ILB_A["内部パススルーNLB #A<br/>(nic0向け)"]
        ILB_B["内部パススルーNLB #B<br/>(nic1向け)"]
    end

    subgraph SpokeA["スポークVPC A"]
        VMA["ワークロードVM"]
        RouteA["静的ルート:<br/>next-hop = ILB_A"]
    end

    subgraph SpokeB["スポークVPC B"]
        VMB["ワークロードVM"]
        RouteB["静的ルート:<br/>next-hop = ILB_B"]
    end

    VMA -->|"VPC Peering / NCC経由"| RouteA
    RouteA --> ILB_A
    ILB_A --> NVA1
    ILB_A --> NVA2
    NVA1 -->|"検査・SNAT/ルーティング"| ILB_B
    NVA2 -->|"検査・SNAT/ルーティング"| ILB_B
    ILB_B --> RouteB
    RouteB --> VMB

    style NVA1 fill:#1a73e8,color:#fff
    style NVA2 fill:#1a73e8,color:#fff`,

    'diag-14': `flowchart LR
    Client["クライアントVM群"] --> Route["スタティックルート<br/>(0.0.0.0/0)<br/>next-hop = ILB"]
    Route --> ILB["内部パススルーNLB<br/>(5-tupleハッシュで負荷分散)"]
    ILB --> HC{"ヘルスチェック"}
    HC -->|"healthy"| ActiveVM["アクティブNVA VM"]
    HC -->|"unhealthy"| Failover["トラフィックを<br/>他の健全なVMへ自動転送"]

    ActiveVM --> Backend["バックエンドVMインスタンス<br/>(インスタンスグループ)"]
    Failover --> Backend

    style ActiveVM fill:#188038,color:#fff
    style Failover fill:#f9ab00,color:#000`,

    'diag-15': `flowchart TD
    Pkt(["パケット到着"]) --> Special["① 特殊経路<br/>(default internet gateway等)"]
    Special --> PBR["② ポリシーベースルート<br/>(宛先IP + プロトコル + 送信元IPでマッチ)"]
    PBR -->|"マッチ"| ILBNext["内部パススルーNLBへ<br/>(NVA/ファイアウォールへ挿入)"]
    PBR -->|"未マッチ"| Subnet["③ サブネットルート"]
    Subnet --> Static["④ スタティックルート"]
    Static --> Dynamic["⑤ ダイナミックルート<br/>(Cloud Router BGP)"]

    style ILBNext fill:#1a73e8,color:#fff`,

    'diag-16': `flowchart LR
    subgraph Consumer["コンシューマーVPC(検査対象)"]
        CVM["ワークロードVM"]
        FWPolicy["ネットワークファイアウォールポリシー<br/>(ミラーリングルール: action=MIRROR)"]
        MEG["ミラーリングエンドポイント<br/>グループ"]
        Assoc["エンドポイントグループ<br/>アソシエーション"]
    end

    subgraph Producer["プロデューサーVPC(検査サービス提供側)"]
        MDG["ミラーリングデプロイグループ"]
        MD["ミラーリングデプロイ<br/>(ゾーンごと)"]
        ILB2["内部パススルーNLB"]
        Collector["検査アプライアンス<br/>(サードパーティ製 等)"]
    end

    CVM -->|"トラフィック"| FWPolicy
    FWPolicy -->|"MIRROR一致"| Assoc
    Assoc --> MEG
    MEG -->|"Geneveカプセル化<br/>(VPC識別子付与)"| MDG
    MDG --> MD
    MD --> ILB2
    ILB2 --> Collector

    style MEG fill:#1a73e8,color:#fff
    style MDG fill:#188038,color:#fff`,

    'diag-17': `flowchart TD
    subgraph Sources["ミラーリング対象"]
        S1["VM(サブネット指定)"]
        S2["VM(Network Tags指定)"]
    end

    Policy["Packet Mirroringポリシー<br/>(同一リージョン内で定義)"] --> Sources
    Sources -->|"ingress / egress / 両方向を複製"| ILB3["内部パススルーNLB<br/>(collector destination)"]
    ILB3 --> Collector1["コレクターVM #1"]
    ILB3 --> Collector2["コレクターVM #2"]
    Collector1 --> Analysis["セキュリティ分析ソフトウェア<br/>(脅威検知・異常検知)"]
    Collector2 --> Analysis

    style ILB3 fill:#1a73e8,color:#fff`,
};

export interface NavSubItem {
    id: string;
    title: string;
}

export interface NavItem {
    id: string;
    title: string;
    subItems: NavSubItem[];
}

export const NAV_ITEMS: NavItem[] = [
    {
        "id": "この章の対象範囲スコープ対応表",
        "title": "この章の対象範囲(スコープ対応表)",
        "subItems": []
    },
    {
        "id": "part-1-google-cloud-armorポリシーの構成",
        "title": "Part 1: Google Cloud Armorポリシーの構成",
        "subItems": [
            {
                "id": "11-cloud-armorのアーキテクチャと適用ポイント",
                "title": "1.1 Cloud Armorのアーキテクチャと適用ポイント"
            },
            {
                "id": "12-セキュリティポリシーの評価順序とルール構造",
                "title": "1.2 セキュリティポリシーの評価順序とルール構造"
            },
            {
                "id": "13-プリコンフィグドwafルールowasp-crs",
                "title": "1.3 プリコンフィグドWAFルール(OWASP CRS)"
            },
            {
                "id": "14-高度なネットワークddos防御とadaptive-protection",
                "title": "1.4 高度なネットワークDDoS防御とAdaptive Protection"
            },
            {
                "id": "15-レート制限",
                "title": "1.5 レート制限"
            },
            {
                "id": "16-bot管理recaptcha連携",
                "title": "1.6 Bot管理(reCAPTCHA連携)"
            },
            {
                "id": "17-google-threat-intelligence",
                "title": "1.7 Google Threat Intelligence"
            },
            {
                "id": "18-part-1-ベストプラクティス一覧",
                "title": "1.8 Part 1 ベストプラクティス一覧"
            }
        ]
    },
    {
        "id": "part-2-cloud-ngfw--vpcファイアウォールルールの構成と管理",
        "title": "Part 2: Cloud NGFW / VPCファイアウォールルールの構成と管理",
        "subItems": [
            {
                "id": "21-ファイアウォール戦略とポリシー種別",
                "title": "2.1 ファイアウォール戦略とポリシー種別"
            },
            {
                "id": "22-ファイアウォールルールの評価順序",
                "title": "2.2 ファイアウォールルールの評価順序"
            },
            {
                "id": "23-階層ファイアウォールポリシーとeffective-rules",
                "title": "2.3 階層ファイアウォールポリシーとEffective Rules"
            },
            {
                "id": "24-cloud-ngfwの3つの階層essentialsstandardenterprise",
                "title": "2.4 Cloud NGFWの3つの階層(Essentials/Standard/Enterprise)"
            },
            {
                "id": "25-レイヤー7検査-tls-inspectionurlフィルタリングidps",
                "title": "2.5 レイヤー7検査: TLS Inspection・URLフィルタリング・IDPS"
            },
            {
                "id": "26-ファイアウォールルールの基準criteria",
                "title": "2.6 ファイアウォールルールの基準(criteria)"
            },
            {
                "id": "27-secure-tags-と-network-tags-によるマイクロセグメンテーション",
                "title": "2.7 Secure Tags と Network Tags によるマイクロセグメンテーション"
            },
            {
                "id": "28-ファイアウォールルールロギング",
                "title": "2.8 ファイアウォールルールロギング"
            },
            {
                "id": "29-vpcファイアウォールルールからcloud-ngfwポリシーへの移行",
                "title": "2.9 VPCファイアウォールルールからCloud NGFWポリシーへの移行"
            },
            {
                "id": "210-gkeおよびcloud-load-balancingでのcloud-ngfwサポート",
                "title": "2.10 GKEおよびCloud Load BalancingでのCloud NGFWサポート"
            },
            {
                "id": "211-part-2-ベストプラクティス一覧",
                "title": "2.11 Part 2 ベストプラクティス一覧"
            }
        ]
    },
    {
        "id": "part-3-インターネットegressの構成と保護--public-cloud-natとsecure-web-proxy",
        "title": "Part 3: インターネットEgressの構成と保護 — Public Cloud NATとSecure Web Proxy",
        "subItems": [
            {
                "id": "31-cloud-natのipアドレッシング",
                "title": "3.1 Cloud NATのIPアドレッシング"
            },
            {
                "id": "32-ポート割り当て静的動的",
                "title": "3.2 ポート割り当て(静的/動的)"
            },
            {
                "id": "33-secure-web-proxyの概要とデプロイモード",
                "title": "3.3 Secure Web Proxyの概要とデプロイモード"
            },
            {
                "id": "34-secure-web-proxyポリシーの構成",
                "title": "3.4 Secure Web Proxyポリシーの構成"
            },
            {
                "id": "35-part-3-ベストプラクティス一覧",
                "title": "3.5 Part 3 ベストプラクティス一覧"
            }
        ]
    },
    {
        "id": "part-4-セルフマネージドnvaとpacket-mirroringの構成",
        "title": "Part 4: セルフマネージドNVAとPacket Mirroringの構成",
        "subItems": [
            {
                "id": "41-マルチnic-vmによるvpc間トラフィックのルーティングと検査",
                "title": "4.1 マルチNIC VMによるVPC間トラフィックのルーティングと検査"
            },
            {
                "id": "42-ha構成-内部パススルーnlbをネクストホップにする",
                "title": "4.2 HA構成: 内部パススルーNLBをネクストホップにする"
            },
            {
                "id": "43-ha-マルチnic-vmルーティングのためのポリシーベースルート",
                "title": "4.3 HA マルチNIC VMルーティングのためのポリシーベースルート"
            },
            {
                "id": "44-アウトオブバンドのnetwork-security-integration戦略",
                "title": "4.4 アウトオブバンドのNetwork Security Integration戦略"
            },
            {
                "id": "45-packet-mirroringセルフマネージドコレクター",
                "title": "4.5 Packet Mirroring(セルフマネージドコレクター)"
            },
            {
                "id": "46-part-4-ベストプラクティス一覧",
                "title": "4.6 Part 4 ベストプラクティス一覧"
            }
        ]
    },
    {
        "id": "設計実装チェックリスト",
        "title": "設計・実装チェックリスト",
        "subItems": []
    },
    {
        "id": "参考文献",
        "title": "参考文献",
        "subItems": []
    }
];
