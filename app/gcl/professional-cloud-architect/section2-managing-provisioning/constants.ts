/**
 * Google Cloud Professional Cloud Architect (PCA) Section 2 定数定義
 */

export interface NavItem {
    id: string;
    label: string;
    level: 2 | 3 | 4;
}

export const NAV_ITEMS: NavItem[] = [
    { id: 'この章について', label: 'この章について', level: 2 },
    { id: '21-ネットワークトポロジの構成', label: '2.1 ネットワークトポロジの構成', level: 2 },
    { id: '211-ハイブリッドネットワーキングオンプレミスとの接続', label: '2.1.1 ハイブリッドネットワーキング：オンプレミスとの接続', level: 3 },
    { id: '212-マルチクラウド環境への拡張', label: '2.1.2 マルチクラウド環境への拡張', level: 3 },
    { id: '213-セキュリティ保護侵入防止アクセス制御ファイアウォール', label: '2.1.3 セキュリティ保護（侵入防止・アクセス制御・ファイアウォール）', level: 3 },
    { id: '214-vpc設計とロードバランシング', label: '2.1.4 VPC設計とロードバランシング', level: 3 },
    { id: 'vpcの基本設計方針', label: 'VPCの基本設計方針', level: 4 },
    { id: 'private-service-connectpsc', label: 'Private Service Connect（PSC）', level: 4 },
    { id: 'ロードバランサーの選択', label: 'ロードバランサーの選択', level: 4 },
    { id: '22-個別のストレージシステムの構成', label: '2.2 個別のストレージシステムの構成', level: 2 },
    { id: '221-オブジェクトストレージcloud-storageクラスとライフサイクル管理', label: '2.2.1 オブジェクトストレージ（Cloud Storage）：クラスとライフサイクル管理', level: 3 },
    { id: '222-データ処理とコンピュートのプロビジョニングデータベースの選択', label: '2.2.2 データ処理とコンピュートのプロビジョニング／データベースの選択', level: 3 },
    { id: '223-ブロックストレージとファイルストレージ', label: '2.2.3 ブロックストレージとファイルストレージ', level: 3 },
    { id: '224-データ保護バックアップと復旧', label: '2.2.4 データ保護（バックアップと復旧）', level: 3 },
    { id: '23-コンピュートシステムの構成', label: '2.3 コンピュートシステムの構成', level: 2 },
    { id: '231-コンピュートリソースのプロビジョニングマシンファミリーとカスタムマシンタイプ', label: '2.3.1 コンピュートリソースのプロビジョニング：マシンファミリーとカスタムマシンタイプ', level: 3 },
    { id: '232-コンピュートのボラティリティ構成spot-vm-vs-standard-vm', label: '2.3.2 コンピュートのボラティリティ構成：Spot VM vs Standard VM', level: 3 },
    { id: '233-クラウドネイティブなネットワーク構成compute-enginegkevmware-engine', label: '2.3.3 クラウドネイティブなネットワーク構成（Compute Engine／GKE／VMware Engine）', level: 3 },
    { id: '234-インフラのオーケストレーションリソース構成パッチ管理', label: '2.3.4 インフラのオーケストレーション、リソース構成、パッチ管理', level: 3 },
    { id: 'infrastructure-as-codeiac', label: 'Infrastructure as Code（IaC）', level: 4 },
    { id: 'パッチ管理vm-manager', label: 'パッチ管理（VM Manager）', level: 4 },
    { id: '235-コンテナオーケストレーションgke-autopilot-vs-standard', label: '2.3.5 コンテナオーケストレーション：GKE Autopilot vs Standard', level: 3 },
    { id: '236-サーバーレスコンピューティングcloud-run', label: '2.3.6 サーバーレスコンピューティング：Cloud Run', level: 3 },
    { id: '24-gemini-enterprise-agent-platformを活用したエンドツーエンドmlワークフロー', label: '2.4 Gemini Enterprise Agent Platformを活用したエンドツーエンドMLワークフロー', level: 2 },
    { id: '241-gemini-enterprise-agent-platformの全体像', label: '2.4.1 Gemini Enterprise Agent Platformの全体像', level: 3 },
    { id: '242-agent-platform-pipelinesによる自動化とオーケストレーション', label: '2.4.2 Agent Platform Pipelinesによる自動化とオーケストレーション', level: 3 },
    { id: '243-agent-platformデータ統合の準備', label: '2.4.3 Agent Platformデータ統合の準備', level: 3 },
    { id: '244-ai-hypercomputerの活用', label: '2.4.4 AI Hypercomputerの活用', level: 3 },
    { id: '25-agent-platformでの事前構築ソリューションまたはapiの構成', label: '2.5 Agent Platformでの事前構築ソリューションまたはAPIの構成', level: 2 },
    { id: '251-google-ai-apiの使い分け', label: '2.5.1 Google AI APIの使い分け', level: 3 },
    { id: '252-gemini-enterprise機能の統合ai-agentsおよび-notebooklm', label: '2.5.2 Gemini Enterprise機能の統合（AI Agentsおよび NotebookLM）', level: 3 },
    { id: '253-model-gardenからのaiモデル統合', label: '2.5.3 Model GardenからのAIモデル統合', level: 3 },
    { id: 'well-architected-frameworkとの関連', label: 'Well-Architected Frameworkとの関連', level: 2 },
    { id: '学習チェックリスト', label: '学習チェックリスト', level: 2 },
    { id: '参考文献', label: '参考文献', level: 2 },
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
    | 'diag-17';

/** 全 Mermaid 図で共有する classDef 定義 */
const CLASS_DEFS = `classDef gcls1 fill:#1a73e8,color:#ffffff,stroke:#174ea6,stroke-width:1.5px
classDef gcls2 fill:#e8f0fe,color:#0b1220,stroke:#1a73e8,stroke-width:1.5px
classDef gcls3 fill:#fef7e0,color:#0b1220,stroke:#f9ab00,stroke-width:1.5px
classDef gcls4 fill:#fce8e6,color:#0b1220,stroke:#d93025,stroke-width:1.5px
classDef gcls5 fill:#e6f4ea,color:#0b1220,stroke:#188038,stroke-width:1.5px
classDef gcls6 fill:#f3e8fd,color:#0b1220,stroke:#a142f4,stroke-width:1.5px
classDef gcls7 fill:#e0f7fa,color:#0b1220,stroke:#00838f,stroke-width:1.5px
classDef gcls8 fill:#f1f3f4,color:#0b1220,stroke:#5f6368,stroke-width:1.5px
classDef gclust1 fill:#0d1a2b,color:#dbe4f3,stroke:#f9ab00,stroke-width:2px
classDef gclust2 fill:#0d1a2b,color:#dbe4f3,stroke:#1a73e8,stroke-width:2px`;

export const DIAGRAMS: Record<DiagramId, string> = {
    'diag-1': `flowchart TD
${CLASS_DEFS}
    A["Section 2<br/>クラウドソリューションインフラの<br/>管理とプロビジョニング(約17.5%)"] --> B["2.1 ネットワークトポロジの構成"]
    A --> C["2.2 個別のストレージシステムの構成"]
    A --> D["2.3 コンピュートシステムの構成"]
    A --> E["2.4 Gemini Enterprise Agent Platform<br/>によるMLワークフロー"]
    A --> F["2.5 事前構築ソリューション／APIの構成"]
    class A gcls1
    class B,C,D,E,F gcls2`,

    'diag-2': `flowchart TD
${CLASS_DEFS}
    Start["オンプレミス／他クラウドとの<br/>接続要件"] --> Q3{"接続先はAWS/Azure/OCIか？"}
    Q3 -->|"はい"| CCI["Cross-Cloud Interconnect<br/>マルチクラウド専用線"]
    Q3 -->|"いいえ(オンプレミス等)"| Q1{"帯域幅は<br/>10Gbps以上か？"}
    Q1 -->|"いいえ(数百Mbps〜数Gbps)"| VPN["Cloud VPN(HA VPN)<br/>インターネット経由のIPsec"]
    Q1 -->|"はい"| Q2{"コロケーション施設に<br/>物理的に接続可能か？"}
    Q2 -->|"はい"| Dedicated["Dedicated Interconnect<br/>10/100/400Gbps専用線"]
    Q2 -->|"いいえ"| Partner["Partner Interconnect<br/>プロバイダ経由で接続"]
    Dedicated --> NCC["Network Connectivity Center<br/>ハブ＆スポークで集約"]
    Partner --> NCC
    CCI --> NCC
    VPN --> NCC
    class Start gcls1
    class Q1,Q2,Q3 gcls3
    class Dedicated,Partner,CCI,VPN,NCC gcls2`,

    'diag-3': `graph LR
${CLASS_DEFS}
    Onprem["オンプレミスDC"] --- Hub["Network Connectivity Center<br/>ハブ"]
    AWS["AWS VPC"] --- Hub
    Azure["Azure VNet"] --- Hub
    VPCA["共有サービスVPC"] --- Hub
    VPCB["プロジェクトVPC B"] --- Hub
    VPCC["プロジェクトVPC C"] --- Hub
    class Hub gcls1
    class Onprem,AWS,Azure,VPCA,VPCB,VPCC gcls2`,

    'diag-4': `graph TD
${CLASS_DEFS}
    Internet["インターネット／外部トラフィック"] --> Armor["Cloud Armor<br/>DDoS対策・WAFルール"]
    Armor --> LB["Cloud Load Balancing"]
    LB --> NGFW["Cloud NGFW<br/>L3/L4/L7ファイアウォール・IDS/IPS"]
    NGFW --> VPCFW["VPCファイアウォールルール<br/>(IAM-governed Tags)"]
    VPCFW --> Workload["ワークロード<br/>(VM／GKE／サーバーレス)"]
    class Internet gcls1
    class Armor,LB,NGFW,VPCFW,Workload gcls2`,

    'diag-5': `graph TB
${CLASS_DEFS}
    subgraph Host["ホストプロジェクト(ネットワークチーム管理)"]
        VPC["共有VPCネットワーク"]
        Sub1["サブネット: prod-app"]
        Sub2["サブネット: prod-db"]
        FW["組織のファイアウォールポリシー"]
        VPC --> Sub1
        VPC --> Sub2
        VPC --> FW
    end
    subgraph SvcA["サービスプロジェクトA(アプリチーム)"]
        VM1["Compute Engine VM"]
    end
    subgraph SvcB["サービスプロジェクトB(データチーム)"]
        GKE1["GKEクラスタ"]
    end
    Sub1 -.->|"ネットワークユーザーロール"| VM1
    Sub2 -.->|"ネットワークユーザーロール"| GKE1
    class VPC gcls1
    class Sub1,Sub2,FW,VM1,GKE1 gcls2
    class Host,SvcA,SvcB gclust2`,

    'diag-6': `graph LR
${CLASS_DEFS}
    subgraph ConsumerVPC["コンシューマーVPC"]
        Client["クライアントVM"] --> Endpoint["PSCエンドポイント<br/>(内部IPアドレス)"]
    end
    Endpoint -.->|"Googleのバックボーンのみ経由<br/>(インターネット非経由)"| Attachment["サービスアタッチメント"]
    subgraph ProducerVPC["プロデューサーVPC(Google管理サービスまたは第三者)"]
        Attachment --> Service["Cloud SQL／BigQuery／SaaSパートナー"]
    end
    class Endpoint,Attachment gcls1
    class Client,Service gcls2
    class ConsumerVPC,ProducerVPC gclust2`,

    'diag-7': `flowchart TD
${CLASS_DEFS}
    Start["トラフィックの種類は？"] --> HTTP{"HTTP/HTTPSか？"}
    HTTP -->|"はい"| Scope1{"グローバル分散が必要か？"}
    Scope1 -->|"はい"| GALB["Global external<br/>Application Load Balancer"]
    Scope1 -->|"いいえ(単一リージョン)"| RALB["Regional external/internal<br/>Application Load Balancer"]
    HTTP -->|"いいえ"| SrcIP{"クライアント送信元IPの<br/>保持が必要か？"}
    SrcIP -->|"はい(UDP/ESPも含む)"| PTLB["Passthrough<br/>Network Load Balancer"]
    SrcIP -->|"いいえ(TCP/SSLのみ)"| PXLB["Proxy Network Load Balancer<br/>(TCP Proxy／SSL Proxy)"]
    class Start gcls1
    class HTTP,Scope1,SrcIP gcls3
    class GALB,RALB,PTLB,PXLB gcls2`,

    'diag-8': `flowchart LR
${CLASS_DEFS}
    Std["Standard<br/>頻繁アクセス"] -->|"経過日数の条件"| Near["Nearline<br/>月1回程度"]
    Near -->|"経過日数の条件"| Cold["Coldline<br/>四半期に1回程度"]
    Cold -->|"経過日数の条件"| Arch["Archive<br/>年1回未満"]
    Std -.->|"Autoclass<br/>(アクセスパターンに応じ自動移行)"| Near
    class Std gcls1
    class Near,Cold,Arch gcls2`,

    'diag-9': `flowchart TD
${CLASS_DEFS}
    Start["ワークロードの種類は？"] --> OLAP{"大規模分析・<br/>OLAPレポーティングか？"}
    OLAP -->|"はい"| BQ["BigQuery"]
    OLAP -->|"いいえ(OLTP)"| Rel{"リレーショナル<br/>(スキーマ・JOIN・ACID)が必要か？"}
    Rel -->|"はい"| Scale{"グローバル分散・<br/>無制限スケールが必要か？"}
    Scale -->|"はい"| Spanner["Cloud Spanner"]
    Scale -->|"いいえ(地域単位で十分)"| CloudSQL["Cloud SQL<br/>(MySQL／PostgreSQL／SQL Server)"]
    Rel -->|"いいえ(NoSQL)"| Pattern{"アクセスパターンは？"}
    Pattern -->|"モバイル／Web、リアルタイム同期"| Firestore["Firestore"]
    Pattern -->|"大量の時系列・IoT・低遅延書き込み"| Bigtable["Bigtable"]
    class Start gcls1
    class OLAP,Rel,Scale,Pattern gcls3
    class BQ,Spanner,CloudSQL,Firestore,Bigtable gcls2`,

    'diag-10': `graph TD
${CLASS_DEFS}
    A["データ保護要件"] --> B["ディスク単位のバックアップ"]
    A --> C["インスタンス全体のバックアップ"]
    A --> D["フリート横断の一元管理"]
    B --> B1["Persistent Disk / Hyperdiskスナップショット<br/>(1時間に1回が目安)"]
    C --> C1["マシンイメージ<br/>(複数ディスクの整合性を確保)"]
    D --> D1["Backup and DR Service<br/>ポリシーベース・バックアップボールト・<br/>Compute Engine/VMware Engine対応"]
    class A gcls1
    class B,C,D gcls3
    class B1,C1,D1 gcls2`,

    'diag-11': `sequenceDiagram
    participant App as アプリケーション
    participant Spot as Spot VM
    participant CE as Compute Engine
    App->>Spot: ワークロード実行
    CE-->>Spot: プリエンプション通知(最大30秒前)
    Spot->>App: シャットダウンスクリプトの実行
    Spot->>CE: 状態の保存／チェックポイント
    CE-->>Spot: 停止 または 削除(指定した終了アクションによる)
    Note over Spot,CE: 需要低下時に容量があれば再作成可能`,

    'diag-12': `flowchart LR
${CLASS_DEFS}
    Dev["開発者がコードを記述"] --> Repo["Gitリポジトリ<br/>(バージョン管理)"]
    Repo --> Review["プルリクエスト<br/>コードレビュー"]
    Review --> Plan["terraform plan／<br/>Infrastructure Manager プレビュー"]
    Plan --> Apply["terraform apply／<br/>Infrastructure Manager デプロイ"]
    Apply --> Cloud["Google Cloudリソース"]
    Cloud -.->|"ドリフト検出"| Plan
    class Dev gcls1
    class Repo,Review,Plan,Apply,Cloud gcls2`,

    'diag-13': `flowchart TD
${CLASS_DEFS}
    Start["ワークロードの実行形態は？"] --> Legacy{"既存のVMware<br/>ワークロードか？"}
    Legacy -->|"はい(リフト＆シフト)"| GCVE["Google Cloud VMware Engine"]
    Legacy -->|"いいえ"| Ctrl{"OS／インフラの<br/>完全な制御が必要か？"}
    Ctrl -->|"はい"| GCE["Compute Engine"]
    Ctrl -->|"いいえ(コンテナ化可能)"| K8s{"Kubernetes APIや<br/>高度なオーケストレーションが必要か？"}
    K8s -->|"はい、運用負荷は最小化したい"| Autopilot["GKE Autopilot"]
    K8s -->|"はい、ノードを細かく制御したい"| Standard["GKE Standard"]
    K8s -->|"いいえ(ステートレスHTTP／イベント駆動)"| Run["Cloud Run"]
    class Start gcls1
    class Legacy,Ctrl,K8s gcls3
    class GCVE,GCE,Autopilot,Standard,Run gcls2`,

    'diag-14': `graph TD
${CLASS_DEFS}
    Platform["Gemini Enterprise Agent Platform"] --> Build["構築(Build)<br/>ADK／Agent Studio／Agent Garden／Model Garden"]
    Platform --> Scale["拡張(Scale)<br/>Agent Runtime／Agent Engine"]
    Platform --> Govern["ガバナンス(Govern)<br/>Agent Identity／Agent Registry／Agent Gateway"]
    Platform --> Optimize["最適化(Optimize)<br/>評価・モニタリング・Memory Bank"]
    class Platform gcls1
    class Build,Scale,Govern,Optimize gcls2`,

    'diag-15': `flowchart LR
${CLASS_DEFS}
    Data["データ準備<br/>(BigQuery／Cloud Storage)"] --> Train["モデルトレーニング<br/>(カスタムトレーニング／AutoML)"]
    Train --> Eval["モデル評価"]
    Eval --> Registry["Model Registry<br/>バージョン管理"]
    Registry --> Deploy["デプロイ<br/>(オンライン予測／バッチ予測)"]
    Deploy --> Monitor["モデルモニタリング<br/>(ドリフト検知)"]
    Monitor -.->|"再トレーニングをトリガー"| Train
    class Data,Train,Eval,Registry,Deploy,Monitor gcls2`,

    'diag-16': `graph TD
${CLASS_DEFS}
    subgraph Consumption["柔軟な消費モデル"]
        DWS["Dynamic Workload Scheduler<br/>(Flex Startモード／カレンダーモード)"]
    end
    subgraph Software["オープンソフトウェア層"]
        JAX["JAX／PyTorch／XLA"]
        Jet["JetStream／vLLM"]
    end
    subgraph Orchestration["オーケストレーション層"]
        GKEo["GKE(TPU／GPUマルチホスト対応)"]
    end
    subgraph Hardware["最適化されたハードウェア層"]
        TPU["Cloud TPU(v5e／v5p／Trillium／Ironwood 等)"]
        GPU["NVIDIA GPU(A3／A4等)"]
        Net["高帯域インターコネクト・Hyperdisk ML"]
    end
    Hardware --> Orchestration --> Software --> Consumption
    class DWS,JAX,Jet,GKEo,TPU,GPU,Net gcls2
    class Consumption,Software,Orchestration,Hardware gclust2`,

    'diag-17': `flowchart TD
${CLASS_DEFS}
    Start["処理したいデータの種類は？"] --> Img{"画像"}
    Img -->|"はい"| Vision["Vision API<br/>OCR・ラベル検出・SafeSearch"]
    Start --> Vid{"動画"}
    Vid -->|"はい"| VideoI["Video Intelligence API<br/>物体追跡・シーン検出・文字起こし"]
    Start --> Aud{"音声"}
    Aud -->|"音声→テキスト"| STT["Speech-to-Text API"]
    Aud -->|"テキスト→音声"| TTS["Text-to-Speech API"]
    Start --> Txt{"テキスト"}
    Txt -->|"感情分析・エンティティ抽出"| NL["Natural Language API"]
    Txt -->|"多言語翻訳"| Trans["Translation API"]
    Start --> Complex{"複雑な推論・マルチモーダル・<br/>会話型が必要"}
    Complex -->|"はい"| Gemini["Geminiモデル<br/>(Model Garden経由)"]
    class Start gcls1
    class Img,Vid,Aud,Txt,Complex gcls3
    class Vision,VideoI,STT,TTS,NL,Trans,Gemini gcls2`,
};
