// app/gcl/professional-cloud-network-engineer/section2-vpc-implementation/constants.ts

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
  | 'diag-17';

export const DIAGRAMS: Record<DiagramId, string> = {
  'diag-1': `flowchart TB
    Network["VPCネットワーク<br/>(グローバルリソース)"] --> ModeChoice{サブネット作成モード}
    ModeChoice -->|Auto mode| AutoSubnets["各リージョンに自動でサブネット作成<br/>(/20を既定)"]
    ModeChoice -->|Custom mode| CustomSubnets["手動でリージョン・CIDRを指定"]
    Network --> Firewall["ファイアウォール<br/>ルール / ポリシー"]
    Network --> PSA["Private Services Access<br/>予約範囲(Cloud SQL等)"]
    Network --> PrivatePool["Cloud Build 私有プール<br/>(private pools)用の予約範囲"]`,

  'diag-2': `flowchart LR
    VPCA["VPC A<br/>10.0.0.0/16"] <-->|VPC Network Peering| VPCB["VPC B<br/>10.1.0.0/16"]
    VPCA -.サブネットルートのみ既定で交換.-> VPCB`,

  'diag-3': `flowchart TB
    subgraph Host["ホストプロジェクト"]
        VPC["Shared VPC<br/>ネットワーク"]
    end
    subgraph SvcA["サービスプロジェクト A"]
        VMA["VM インスタンス"]
    end
    subgraph SvcB["サービスプロジェクト B"]
        VMB["VM インスタンス"]
    end
    VPC -->|サブネット共有| VMA
    VPC -->|サブネット共有| VMB
    OrgAdmin["組織管理者"] -->|Shared VPC Admin付与| NetAdmin["ネットワーク管理者"]
    NetAdmin -->|compute.networkUser付与| SvcAdminA["サービスプロジェクト管理者 A"]
    NetAdmin -->|compute.networkUser付与| SvcAdminB["サービスプロジェクト管理者 B"]`,

  'diag-4': `flowchart TB
    VM["外部IPを持たないVM"] -->|限定公開Googleアクセス<br/>Private Google Access| GoogleAPIs["Google APIs<br/>(Cloud Storage等)"]
    VM -->|Private Service Connect<br/>エンドポイント| PSCEndpoint["PSCエンドポイント<br/>(内部IP)"]
    PSCEndpoint --> ManagedSvc["マネージドサービス<br/>(Cloud SQL等)"]`,

  'diag-5': `flowchart LR
    Before["既存サブネット<br/>10.10.0.0/20"] -->|拡張のみ可能<br/>スーパーセットへ| After["拡張後サブネット<br/>10.10.0.0/18"]
    After -.縮小は不可.-> Before`,

  'diag-6': `flowchart LR
    IngressRule["Ingressルール<br/>(明示許可のみ通過)"] ==> Perimeter
    subgraph Perimeter["サービスパリメータ"]
        direction TB
        ProjA["プロジェクト A"] -->|アクセス許可| RestrictedSvc["制限対象サービス<br/>(Cloud Storage, BigQuery等)"]
        ProjB["プロジェクト B"] -->|アクセス許可| RestrictedSvc
    end
    Perimeter ==> EgressRule["Egressルール<br/>(明示許可のみ通過)"]
    Outside["パリメータ外の<br/>ネットワーク/プロジェクト"] -.アクセス拒否.-x RestrictedSvc
    EgressRule -.許可された宛先のみ.-> Outside`,

  'diag-7': `flowchart TB
    Route["Google Cloudのルート"] --> Static["静的ルート<br/>(手動作成)"]
    Route --> Dynamic["動的ルート<br/>(Cloud Router / BGP)"]
    Static --> NextHopTypes["ネクストホップ:<br/>VM/インスタンス・内部LB・<br/>インターネットゲートウェイ・VPNトンネル等"]
    Dynamic --> Sources["学習元:<br/>Interconnect VLAN Attachment・<br/>HA VPN・Router Appliance"]`,

  'diag-8': `flowchart TB
    A["トラフィック制御の目的"] --> B{制御したい条件は?}
    B -->|"宛先IPだけでなく<br/>送信元IP・プロトコルも見たい"| PBR["ポリシーベースルート(PBR)<br/>next-hop-ilbで矯正転送"]
    B -->|"BGPで学習/広告する<br/>経路自体をCELで書き換え・フィルタしたい"| BGPPolicy["BGP route policies<br/>(CEL式、学習/広告ルートに適用)"]
    PBR --> PBRNote["VPC・Peering・NCC越しの<br/>サブネットルートより優先評価される"]
    BGPPolicy --> BGPNote["Policy named setsで<br/>プレフィックス/コミュニティを再利用可能な<br/>グループとして定義できる"]`,

  'diag-9': `flowchart TB
    VM1["VM(クライアント)"] -->|"デフォルトルート<br/>next-hop-ilb"| ILB["内部パススルー<br/>Network Load Balancer"]
    ILB --> Appliance1["サードパーティ<br/>アプライアンス VM 1"]
    ILB --> Appliance2["サードパーティ<br/>アプライアンス VM 2"]
    Appliance1 -.ヘルスチェック.-> ILB
    Appliance2 -.ヘルスチェック.-> ILB`,

  'diag-10': `flowchart LR
    OnPrem["オンプレミス"] -->|HA VPN/Interconnect| TransitVPC["トランジットVPC<br/>(Cloud Router)"]
    TransitVPC -->|"Export custom routes<br/>有効"| WorkloadVPC["ワークロードVPC<br/>(Import custom routes 有効)"]
    WorkloadVPC -.オンプレ宛てトラフィック.-> TransitVPC`,

  'diag-11': `flowchart LR
    Hub["NCC ハブ"] --> VPCSpoke["VPCスポーク"]
    Hub --> HybridSpoke["ハイブリッドスポーク<br/>(VLAN Attachment/HA VPN/Router Appliance)"]
    Hub --> ProducerSpoke["プロデューサVPCスポーク"]
    VPCSpoke -.star/hub-spoke/mesh.-> Topology["トポロジ管理"]`,

  'diag-12': `flowchart TB
    Symptom["症状発生<br/>(スポーク間到達不可等)"] --> Check1{ハブのステータスを確認}
    Check1 -->|スポークがACTIVEでない| Check2["スポークの受け入れ状態<br/>(pending/rejected)を確認"]
    Check1 -->|ACTIVE| Check3{ルートテーブルを確認}
    Check3 -->|期待する経路がない| Check4["インポート/エクスポート<br/>フィルタ範囲を確認"]
    Check3 -->|経路はあるが疎通しない| Check5["ファイアウォールルール・<br/>Connectivity Testsで診断"]
    Check2 --> Fix1["ハブ管理者による<br/>スポーク受け入れ設定を修正"]
    Check4 --> Fix2["include/exclude-import-ranges<br/>を修正"]
    Check5 --> Fix3["Network Intelligence Centerの<br/>Connectivity Testsを実行"]`,

  'diag-13': `flowchart TB
    Subnet["サブネット"] --> PrimaryRange["プライマリレンジ<br/>(ノードIP)"]
    Subnet --> PodRange["セカンダリレンジ<br/>(Pod IP)"]
    Subnet --> SvcRange["セカンダリレンジ<br/>(Service/ClusterIP)"]
    PrimaryRange --> Node["GKEノード"]
    Node -->|Alias IP Range| PodRange`,

  'diag-14': `flowchart TB
    subgraph Cluster["プライベートクラスタ"]
        Nodes["プライベートノード<br/>(外部IPなし)"]
        CP["コントロールプレーン<br/>(内部エンドポイント)"]
    end
    Admin["クラスタ管理者"] -->|"IP方式:<br/>authorized networks"| CP
    Admin -->|"DNS方式:<br/>クラスタ固有FQDN + IAM"| CP
    CP -.スケジュールメンテナンス等では<br/>公開エンドポイントも内部的に使用.-> GoogleManaged["Google管理領域"]`,

  'diag-15': `flowchart LR
    Pod1["Pod A"] <-->|eBPF| anetd1["anetd<br/>(Dataplane V2 agent)"]
    Pod2["Pod B"] <-->|eBPF| anetd2["anetd<br/>(Dataplane V2 agent)"]
    anetd1 <--> anetd2
    NetworkPolicy["Kubernetes<br/>NetworkPolicy"] -.常時有効.-> anetd1
    NetworkPolicy -.常時有効.-> anetd2`,

  'diag-16': `flowchart TB
    Cluster["既存クラスタ"] --> Exhausted{Pod IPを<br/>使い切ったか}
    Exhausted -->|Yes| Option1["新規クラスタを<br/>より大きなPodレンジで再作成"]
    Exhausted -->|Yes| Option2["discontiguous multi-Pod CIDR<br/>で追加セカンダリレンジを付与"]
    Exhausted -->|Yes| Option3["ノードプールのmax-pods-per-nodeを<br/>下げて再作成"]
    Option2 --> NewRange["新しい非連続な<br/>セカンダリレンジをサブネットに追加"]
    NewRange --> UpdateCluster["--additional-pod-ipv4-ranges<br/>でクラスタ/ノードプールに割当"]`,

  'diag-17': `flowchart TB
    Pod["Pod"] -->|"名前解決要求"| NodeLocalDNS["NodeLocal DNSCache<br/>(ノード上のキャッシュ)"]
    NodeLocalDNS -->|"キャッシュミス"| KubeDNS["kube-dns<br/>(クラスタ内部DNS)"]
    KubeDNS -->|"クラスタ外の名前解決"| CloudDNS["Cloud DNS<br/>(VPCスコープ)"]`,

};

export interface NavItem {
  id: string;
  label: string;
  subItems?: { id: string; label: string }[];
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'この章の位置づけ', label: 'この章の位置づけ' },
  {
    id: '21-vpcの構成',
    label: '2.1 VPCの構成',
    subItems: [
      { id: '211-vpcリソースの作成', label: '2.1.1 VPCリソースの作成' },
      { id: '212-vpc-network-peering', label: '2.1.2 VPC Network Peering' },
      { id: '213-shared-vpc-の構成とiam', label: '2.1.3 Shared VPC の構成とIAM' },
      { id: '214-google-apisマネージドサービスへのプライベートアクセス構成', label: '2.1.4 プライベートアクセス構成' },
      { id: '215-vpcサブネット範囲の拡張', label: '2.1.5 サブネット範囲の拡張' },
      { id: '216-vpc-service-controls-パリメータの構成', label: '2.1.6 VPC Service Controls' },
    ],
  },
  {
    id: '22-vpcルーティングの構成',
    label: '2.2 VPCルーティングの構成',
    subItems: [
      { id: '221-静的ルーティングと動的ルーティング', label: '2.2.1 静的/動的ルーティング' },
      { id: '222-グローバル--リージョナル動的ルーティングモード', label: '2.2.2 ルーティングモード' },
      { id: '223-ネットワークタグ優先度によるルーティング', label: '2.2.3 タグ・優先度' },
      { id: '224-グローバル動的ルーティングでのルート優先度', label: '2.2.4 ルート優先度・PBR vs BGP' },
      { id: '225-内部パススルーnetwork-load-balancerをネクストホップとして利用', label: '2.2.5 ILBネクストホップ' },
      { id: '226-vpc-peering--ncc越しのカスタムルートインポートエクスポート', label: '2.2.6 カスタムルートインポート/エクスポート' },
      { id: '227-ポリシーベースルーティングの構成', label: '2.2.7 ポリシーベースルーティング' },
    ],
  },
  {
    id: '23-network-connectivity-centerの構成',
    label: '2.3 NCCの構成',
    subItems: [
      { id: '231-スポークタイプとトポロジ管理要点', label: '2.3.1 スポークタイプ・トポロジ' },
      { id: '232-nccの監視トラブルシューティング深掘り', label: '2.3.2 監視・トラブルシューティング' },
    ],
  },
  {
    id: '24-gkeクラスタの構成と維持',
    label: '2.4 GKEクラスタの構成と維持',
    subItems: [
      { id: '241-vpc-nativeクラスタalias-ip', label: '2.4.1 VPC-nativeクラスタ' },
      { id: '242-shared-vpcでのクラスタ構成', label: '2.4.2 Shared VPCクラスタ' },
      { id: '243-プライベートクラスタとプライベートコントロールプレーンエンドポイント', label: '2.4.3 プライベートクラスタ' },
      { id: '244-gke-dataplane-v2', label: '2.4.4 GKE Dataplane V2' },
      { id: '245-snat送信元natとip-masqueradeポリシー', label: '2.4.5 SNAT / IP Masquerade' },
      { id: '246-podレンジserviceレンジの構成と追加podレンジ', label: '2.4.6 Pod/Serviceレンジ' },
      { id: '247-gkeのdns構成', label: '2.4.7 GKE DNS構成' },
    ],
  },
  { id: '設計実装チェックリスト', label: '設計・実装チェックリスト' },
  { id: 'まとめ', label: 'まとめ' },
  { id: '参考文献', label: '参考文献' },
];
