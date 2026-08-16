export type NavItem = {
    id: string;
    label: string;
    level: 'h2' | 'h3';
};

export const NAV_ITEMS: readonly NavItem[] = [
    { id: '本ガイドについて', label: '本ガイドについて', level: 'h2' },
    { id: 'part-1-cloud-cdn', label: 'Part 1: Cloud CDN', level: 'h2' },
    {
        id: '11-cloud-cdnのアーキテクチャと動作原理',
        label: '1.1 Cloud CDNのアーキテクチャと動作原理',
        level: 'h3',
    },
    {
        id: '12-対応オリジンバックエンドタイプ',
        label: '1.2 対応オリジン（バックエンドタイプ）',
        level: 'h3',
    },
    {
        id: '13-外部バックエンドinternet-negとハイブリッドマルチクラウド構成',
        label: '1.3 外部バックエンド（Internet NEG）とハイブリッド/マルチクラウド構成',
        level: 'h3',
    },
    {
        id: '14-キャッシュモードとキャッシュ可否の判定',
        label: '1.4 キャッシュモードとキャッシュ可否の判定',
        level: 'h3',
    },
    {
        id: '15-キャッシュキーのカスタマイズ',
        label: '1.5 キャッシュキーのカスタマイズ',
        level: 'h3',
    },
    {
        id: '16-キャッシュの無効化invalidation',
        label: '1.6 キャッシュの無効化（Invalidation）',
        level: 'h3',
    },
    {
        id: '17-コンテンツのアクセス制御署名付きurl署名付きcookie',
        label: '1.7 コンテンツのアクセス制御（署名付きURL・署名付きCookie）',
        level: 'h3',
    },
    {
        id: '18-cloud-cdnのベストプラクティス',
        label: '1.8 Cloud CDNのベストプラクティス',
        level: 'h3',
    },
    { id: 'part-2-cloud-dns', label: 'Part 2: Cloud DNS', level: 'h2' },
    {
        id: '21-cloud-dnsの基本アーキテクチャとゾーンタイプ',
        label: '2.1 Cloud DNSの基本アーキテクチャとゾーンタイプ',
        level: 'h3',
    },
    {
        id: '22-パブリックゾーンとプライベートゾーンsplit-horizon-dns',
        label: '2.2 パブリックゾーンとプライベートゾーン、Split-Horizon DNS',
        level: 'h3',
    },
    {
        id: '23-フォワーディングゾーンとピアリングゾーン',
        label: '2.3 フォワーディングゾーンとピアリングゾーン',
        level: 'h3',
    },
    {
        id: '24-dnsルーティングポリシーとヘルスチェック',
        label: '2.4 DNSルーティングポリシーとヘルスチェック',
        level: 'h3',
    },
    {
        id: '25-dnssecdns-security-extensions',
        label: '2.5 DNSSEC（DNS Security Extensions）',
        level: 'h3',
    },
    {
        id: '26-dnsサーバーポリシーinbound--outbound',
        label: '2.6 DNSサーバーポリシー（Inbound / Outbound）',
        level: 'h3',
    },
    {
        id: '27-クロスプロジェクトバインディング-vs-dnsピアリング',
        label: '2.7 クロスプロジェクトバインディング vs DNSピアリング',
        level: 'h3',
    },
    {
        id: '28-gkeにおけるcloud-dns',
        label: '2.8 GKEにおけるCloud DNS',
        level: 'h3',
    },
    {
        id: '29-他プロバイダからcloud-dnsへの移行',
        label: '2.9 他プロバイダからCloud DNSへの移行',
        level: 'h3',
    },
    {
        id: '210-ハイブリッドdnsのリファレンスアーキテクチャとベストプラクティス',
        label: '2.10 ハイブリッドDNSのリファレンスアーキテクチャとベストプラクティス',
        level: 'h3',
    },
    { id: 'part-3-ipアドレス管理ipam', label: 'Part 3: IPアドレス管理（IPAM）', level: 'h2' },
    {
        id: '31-ipアドレスの分類体系',
        label: '3.1 IPアドレスの分類体系',
        level: 'h3',
    },
    {
        id: '32-サブネットのipv4アドレス範囲設計',
        label: '3.2 サブネットのIPv4アドレス範囲設計',
        level: 'h3',
    },
    {
        id: '33-ipv6サポート',
        label: '3.3 IPv6サポート',
        level: 'h3',
    },
    {
        id: '34-内部レンジinternal-rangesによるipam自動化',
        label: '3.4 内部レンジ（Internal Ranges）によるIPAM自動化',
        level: 'h3',
    },
    {
        id: '35-byoipbring-your-own-ip',
        label: '3.5 BYOIP（Bring Your Own IP）',
        level: 'h3',
    },
    {
        id: '36-マネージドサービスへの接続とipアドレス割当psapscserverless-vpc-access',
        label: '3.6 マネージドサービスへの接続とIPアドレス割当（PSA・PSC・Serverless VPC Access）',
        level: 'h3',
    },
    {
        id: '37-cloud-natにおけるipアドレスとポートの管理',
        label: '3.7 Cloud NATにおけるIPアドレスとポートの管理',
        level: 'h3',
    },
    {
        id: '38-ipam設計チェックリスト',
        label: '3.8 IPAM設計チェックリスト',
        level: 'h3',
    },
    {
        id: '試験対策チェックリスト横断',
        label: '試験対策チェックリスト（横断）',
        level: 'h2',
    },
    { id: '参考文献', label: '参考文献', level: 'h2' },
];

export type DiagramId =
    | 'diag-1'
    | 'diag-2'
    | 'diag-3'
    | 'diag-4'
    | 'diag-5'
    | 'diag-6'
    | 'diag-7'
    | 'diag-8'
    | 'diag-9'
    | 'diag-10'
    | 'diag-11'
    | 'diag-12'
    | 'diag-13'
    | 'diag-14'
    | 'diag-15'
    | 'diag-16'
    | 'diag-17'
    | 'diag-18'
    | 'diag-19'
    | 'diag-20';

export const DIAGRAMS: Record<DiagramId, string> = {
    'diag-1': `flowchart TD
    A[クライアントからのリクエスト] --> B{最寄りのGFEが<br/>Cloud CDNキャッシュを検索}
    B -->|キャッシュヒット| C[キャッシュから直接応答<br/>cache egress]
    B -->|キャッシュミス| D[External Application<br/>Load Balancerへ転送]
    D --> E[オリジンサーバーへ転送<br/>MIG・バケット・サーバーレスNEG等]
    E --> F{レスポンスは<br/>キャッシュ可能か}
    F -->|Yes| G[Cloud CDNキャッシュに格納<br/>cache fill]
    F -->|No| H[クライアントへ直接返却]
    G --> I[クライアントへ応答]`,

    'diag-2': `flowchart LR
    LB[External Application<br/>Load Balancer + Cloud CDN]
    LB --> A[マネージドインスタンスグループ<br/>ゾーンNEG]
    LB --> B[サーバーレスNEG<br/>Cloud Run / functions / App Engine]
    LB --> C[Cloud Storage<br/>バックエンドバケット]
    LB --> D[Internet NEG<br/>外部バックエンド]
    D --> E[オンプレミス<br/>データセンター]
    D --> F[他クラウド環境]`,

    'diag-3': `flowchart LR
    U[インターネット利用者] --> GFE[Cloud CDN<br/>Google Front End]
    GFE --> LB[External Application<br/>Load Balancer]
    LB -->|/images/*| GCS[Cloud Storage<br/>バケット]
    LB -->|/video/*| NEG[Internet NEG]
    NEG --> DC[オンプレミス<br/>データセンター / 他クラウド]`,

    'diag-4': `flowchart TD
    A[Cloud CDNキャッシュモードを選択] --> B["CACHE_ALL_STATIC<br/>(デフォルト)"]
    A --> C[USE_ORIGIN_HEADERS]
    A --> D[FORCE_CACHE_ALL]
    B --> B1[静的コンテンツタイプを自動キャッシュ<br/>Cache-Controlがなくても可]
    C --> C1[オリジンのCache-Control /<br/>Expiresヘッダーが必須]
    D --> D1[オリジンの指示を無視し<br/>常に強制キャッシュ]
    D --> D2[個人情報を含む動的<br/>コンテンツには非推奨]`,

    'diag-5': `flowchart LR
    A[無効化リクエスト] --> B{一致条件}
    B -->|パスパターン| C["/picture* のようなプレフィックス一致"]
    B -->|ホスト指定| D[特定ホストのみ対象]
    B -->|Cache-Tag| E["release-v1,frontend 等の<br/>論理OR条件"]
    C --> F[該当キャッシュエントリを<br/>破棄し次回リクエストで<br/>オリジンから再取得]
    D --> F
    E --> F`,

    'diag-6': `flowchart TD
    Q1["クエリ: myrecord1.gcp.example.com"] --> S{発信元は?}
    S -->|VPCネットワーク内のVM| P[Private Zone<br/>gcp.example.com]
    S -->|インターネット| PUB[Public Zone<br/>gcp.example.com]
    P --> R1["10.128.1.35 を応答"]
    PUB --> R2["104.198.6.142 を応答"]`,

    'diag-7': `flowchart LR
    subgraph VPCB["消費側 VPC: vpc-net-b"]
        VMB[VM]
    end
    subgraph VPCA["転送側 VPC: vpc-net-a"]
        PZ["Peering Zone<br/>ターゲット: vpc-net-a"]
        FZ["Forwarding Zone<br/>ターゲット: オンプレミスDNS"]
    end
    ONPREM[オンプレミス<br/>DNSサーバー]
    VMB -->|1: DNSクエリ| PZ
    PZ -->|2: vpc-net-aの解決順序で転送| FZ
    FZ -->|3: 転送| ONPREM`,

    'diag-8': `flowchart TD
    A[DNSルーティングポリシーを選択] --> B["WRR<br/>(Weighted Round Robin)"]
    A --> C[Geolocation]
    A --> D[Failover]
    B --> B1[重み比率でトラフィック分散<br/>ヘルスチェック対応]
    C --> C1[送信元リージョンに<br/>最も近いターゲットへ]
    C --> C2{Geofence有効か}
    C2 -->|Yes| C3["不健全でもそのリージョンに固定<br/>(全IPを応答)"]
    C2 -->|No| C4[次に近いリージョンへ<br/>自動フェイルオーバー]
    D --> D1[Active集合を常に応答]
    D --> D2{Active集合が<br/>全て不健全か}
    D2 -->|Yes| D3["Backup集合へ切替<br/>(trickle比率設定可)"]`,

    'diag-9': `flowchart LR
    subgraph ONPREM[オンプレミス]
        OS[オンプレミスDNSサーバー]
    end
    subgraph VPC[VPCネットワーク]
        IN["Inbound Server Policy<br/>Entry Point<br/>(サブネットごとの内部IP)"]
        RES["VPCネットワーク内の<br/>プライベートゾーン等を解決"]
        OUT["Outbound Server Policy<br/>(代替ネームサーバー指定)"]
        MD["VMメタデータサーバー<br/>169.254.169.254"]
    end
    OS -->|1: 問い合わせ| IN
    IN -->|2: 解決| RES
    MD -->|3: 通常クエリ| OUT
    OUT -->|4: 代替ネームサーバーへ転送| OS`,

    'diag-10': `flowchart TD
    subgraph A[DNSピアリングのみの構成]
        H1[ホストプロジェクト<br/>VPCネットワーク]
        S1[サービスプロジェクト1<br/>個別VPC + Peering Zone]
        S2[サービスプロジェクト2<br/>個別VPC + Peering Zone]
    end
    subgraph B[クロスプロジェクトバインディング構成]
        H2[ホストプロジェクト<br/>Shared VPCネットワーク]
        Z1[サービスプロジェクト1が<br/>作成・保有するゾーン]
        Z2[サービスプロジェクト2が<br/>作成・保有するゾーン]
        H2 -.バインド.-> Z1
        H2 -.バインド.-> Z2
    end`,

    'diag-11': `flowchart TD
    Pod[Pod] --> MD["ノードのメタデータサーバー<br/>169.254.169.254"]
    MD --> NLD{NodeLocal DNSCache<br/>有効か}
    NLD -->|Yes: ローカルキャッシュ| Cache[ノードローカル<br/>DNSキャッシュ]
    NLD -->|No| Provider
    Cache -->|キャッシュミス時| Provider{DNSプロバイダ}
    Provider -->|kube-dns| KD["kube-dnsポッド<br/>(cluster.local)"]
    Provider -->|Cloud DNS for GKE| CD[Cloud DNS<br/>コントローラ管理ゾーン]
    Ext[external-dns<br/>コントローラ] -.Ingress/Service監視.-> CD`,

    'diag-12': `flowchart TD
    A[マネージドゾーンの作成<br/>gcloud dns managed-zones create] --> B[既存プロバイダから<br/>ゾーンファイルをエクスポート<br/>BIND形式 or YAML形式]
    B --> C["gcloud dns record-sets import<br/>でレコードをインポート"]
    C --> D[digコマンドで<br/>Cloud DNSネームサーバーへの<br/>反映を確認]
    D --> E[レジストラの<br/>ネームサーバー設定を変更]
    E --> F["dig +short NS<br/>で伝播を最終確認"]`,

    'diag-13': `flowchart TD
    ONPREM["オンプレミス<br/>corp.example.com"] <-->|Interconnect/VPN| HUB
    subgraph HUB[ハブVPCネットワーク]
        HFWD["Forwarding Zone<br/>corp.example.com"]
        HPOLICY[Inbound Server Policy]
    end
    HUB -->|DNS Peering| SPOKE1["スポークVPC1<br/>projectX.gcp.example.com"]
    HUB -->|DNS Peering| SPOKE2["スポークVPC2<br/>projectY.gcp.example.com"]
    SPOKE1 -->|DNS Peering| HUB
    SPOKE2 -->|DNS Peering| HUB`,

    'diag-14': `flowchart TD
    IP[Google CloudのIPアドレス] --> INT["内部IPアドレス<br/>(Internal)"]
    IP --> EXT["外部IPアドレス<br/>(External)"]
    INT --> PRIV["プライベートIP<br/>(RFC1918等)"]
    INT --> PUPI["プライベート利用の<br/>パブリックIP (PUPI)"]
    EXT --> PUB[パブリックルーティング可能]
    INT --> EPH1[エフェメラル]
    INT --> STAT1["静的 (予約済み)"]
    EXT --> EPH2[エフェメラル]
    EXT --> STAT2["静的 (予約済み)"]`,

    'diag-15': `flowchart LR
    A["サブネット (例: 10.10.0.0/20)"] --> B["プライマリ範囲<br/>VM/内部LB/PGA/Cloud DNS<br/>インバウンドエントリポイント等"]
    A --> C["セカンダリ範囲1<br/>(GKE Podレンジ等)"]
    A --> D["セカンダリ範囲2<br/>(GKE Serviceレンジ等)"]
    B --> E[エイリアスIP範囲としても<br/>利用可能]
    C --> E`,

    'diag-16': `flowchart TD
    VPC["VPCネットワーク<br/>/48 ULA範囲 (内部の場合)"] --> SUB["サブネット<br/>/64 範囲"]
    SUB --> VM1["VMインターフェース<br/>/96 (前半/65)"]
    SUB --> LB1["Cloud Load Balancing用<br/>/96 (外部の場合、後半/65)"]
    EXT["Googleのリージョナル<br/>外部IPv6アドレス"] --> SUBE["サブネット<br/>/64 外部GUA範囲"]
    BYOIP["BYOIP<br/>IPv6 sub-prefix"] -.代替ソース.-> SUB
    BYOIP -.代替ソース.-> SUBE`,

    'diag-17': `flowchart TD
    A[内部レンジをIPAM<br/>自動化ツールとして活用] --> B[ピアリングタイプを選択<br/>FOR_SELF / FOR_PEER / NOT_SHARED]
    A --> C[使用タイプを選択<br/>FOR_VPC / EXTERNAL_TO_VPC / FOR_MIGRATION]
    A --> D[IPv4の場合 割当戦略を選択<br/>RANDOM等]
    B --> E[サブネット作成時に<br/>内部レンジを参照して<br/>重複を機械的に防止]
    C --> E
    D --> E
    E --> F["FOR_MIGRATIONの場合:<br/>サブネット削除後もCIDRを予約し<br/>移行先サブネットにのみ再割当可能"]`,

    'diag-18': `flowchart LR
    A["Public Advertised Prefix<br/>(PAP) 作成 + 所有権検証<br/>(ROA / 逆引きDNS)"] --> B["Public Delegated Prefix<br/>(PDP) へ分割"]
    B --> C["サブプレフィックス /<br/>個別IPアドレスの作成"]
    C --> D["Compute Engine /<br/>Load Balancer等のリソースへ割当"]
    B -.複数プロジェクトへ委譲.-> B`,

    'diag-19': `flowchart TD
    C1[消費者VPCネットワーク] --> A1["Allocated Range<br/>(推奨 /16、PSA用)"]
    A1 -->|VPC Peering| P1["サービスプロデューサー<br/>ネットワークにサブネット作成<br/>(通常/29〜/24)"]
    C1 --> A2["PSCエンドポイント用<br/>内部IPアドレス<br/>(通常サブネット内)"]
    A2 -->|Private Service Connect| P2["公開サービス<br/>/ Google API"]
    C1 --> A3["Serverless VPC Access<br/>コネクタ専用 /28 サブネット"]
    A3 --> P3[Cloud Run / Functions等から<br/>VPCへの送信トラフィック]`,

    'diag-20': `flowchart TD
    A[Cloud NATゲートウェイのタイプ] --> B[Public NAT]
    A --> C[Private NAT]
    B --> B1{IPアドレス割当方法}
    B1 -->|自動| B2[Network Tierと使用量に応じ<br/>外部IPを自動増減]
    B1 -->|手動| B3[静的外部IPを手動割当<br/>allowlist等に有効]
    B --> B4{ポート割当方法}
    B4 -->|静的 デフォルト| B5[VMごとに固定ポート数]
    B4 -->|動的| B6[使用量に応じ<br/>min〜max間で自動増減]
    C --> C1["専用サブネット<br/>(purpose=PRIVATE_NAT)から<br/>内部IPを使用"]
    C --> C4{ポート割当方法}
    C4 -->|動的 デフォルト| C6[使用量に応じ自動増減]
    C4 -->|静的| C5[VMごとに固定ポート数]`,
};
