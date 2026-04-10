# **Google Cloud Professional Cloud Network Engineer 認定試験に向けた高度ネットワークインフラ設計と運用の技術白書**

Google Cloud のグローバルネットワークは、世界最大級のソフトウェア定義ネットワーク（SDN）であり、その技術的複雑性と革新性は他のクラウドプロバイダーを圧倒している。Professional Cloud Network Engineer 資格は、単に管理コンソールを操作できる能力ではなく、この巨大なインフラをビジネス要件に合わせて最適化、保護、および管理できる専門知識を証明するものである  (https://cloud.google.com/learn/certification/cloud-network-engineer)。本報告書では、初学者が直面する基礎的な概念から、シニアエンジニアが現場で直面する高度なトラブルシューティングまでを網羅し、試験範囲の各項目について詳細な技術解説とベストプラクティスを提示する。

## **第一章：Virtual Private Cloud (VPC) のアーキテクチャ設計と管理**

Google Cloud のネットワーキングの基礎となる Virtual Private Cloud (VPC) は、物理的なネットワークを仮想化したものであり、Google のデータセンター内で実行されるリソース間の通信を制御する 。他のクラウド環境とは異なり、Google Cloud の VPC は「グローバル」なリソースである。これは、単一の VPC が複数のリージョンにまたがって存在できることを意味し、アーキテクチャの簡素化に大きく寄与している  (https://quabyt.com/blog/gcp-networking-best-practices)。

### **1.1 VPC ネットワークの種類とサブネットの概念**

VPC ネットワークを作成する際、システム管理者は「自動モード」または「カスタムモード」のいずれかを選択する必要がある  (https://docs.cloud.google.com/architecture/best-practices-vpc-design)。自動モードでは、Google Cloud が各リージョンに自動的にサブネットを作成し、IP アドレス範囲を割り当てるが、これは本番環境では推奨されない。その理由は、将来的に VPC ピアリングやハイブリッド接続を行う際に、IP アドレスの重複が発生するリスクが極めて高いためである。

ベストプラクティスとして、エンタープライズ環境では常にカスタムモードの VPC を使用すべきである 。カスタムモードでは、サブネットの IP 範囲を完全に制御でき、必要なリージョンにのみサブネットを配置することが可能となる。また、サブネットはリージョン内のすべてのゾーンにまたがるため、可用性の高い構成を容易に実現できる。

| **VPC モード** | **特徴** | **推奨用途** |
| --- | --- | --- |
| 自動モード | 全リージョンに /20 のサブネットを自動作成 | プロトタイプ、教育、迅速な開発 |
| カスタムモード | ユーザーが任意の IP 範囲とリージョンを指定 | 本番環境、ハイブリッド構成、複雑なインフラ |

### **1.2 IP アドレス管理 (IPAM) とアドレス空間の戦略**

ネットワークエンジニアにとって、IP アドレスの枯渇と重複の防止は最優先課題である。Google Cloud では、プライベート IP アドレスとして RFC 1918 (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) のほか、RFC 6598 や Class E などの非 RFC 1918 範囲もサポートされている  (https://docs.cloud.google.com/run/docs/configuring/networking-best-practices)。

特に、Google Kubernetes Engine (GKE) を展開する場合、ノード、ポッド、およびサービスに対して膨大な数の IP アドレスが必要となる。このため、エイリアス IP 範囲（Alias IP ranges）を活用し、セカンダリ IP 範囲をポッドに割り当てる設計が重要となる 。これにより、ポッドが VPC 内でルーティング可能な独自の IP を持ち、ネットワーク全体の可視性が向上する。

### **1.3 共有 VPC (Shared VPC) による中央集権管理**

大規模組織では、複数のプロジェクトを管理する必要がある。共有 VPC を使用すると、特定のプロジェクト（ホストプロジェクト）のネットワークリソースを、他のプロジェクト（サービスプロジェクト）と共有できる  (https://docs.cloud.google.com/vpc/docs/shared-vpc)。この構造により、ネットワーク管理者はファイアウォールルールやサブネット、ハイブリッド接続を中央で一括管理しつつ、開発チームは独自のサービスプロジェクト内で VM やコンテナをデプロイできる。

共有 VPC の実装におけるベストプラクティスは、IAM の最小権限の原則に従い、ホストプロジェクトのネットワーク管理者（Shared VPC Admin）と、サービスプロジェクトのリソース管理者を明確に分離することである 。

## **第二章：ハイブリッド接続の設計と実装**

オンプレミスのデータセンターや他のパブリッククラウドと Google Cloud を接続することは、多くの企業にとって不可欠な要件である。接続方法の選択は、帯域幅、レイテンシ、SLA、およびコストのバランスによって決まる  (https://cloud.google.com/blog/topics/developers-practitioners/choosing-network-connectivity-option-google-cloud/)。

### **2.1 Cloud VPN の詳細と高可用性 (HA) 構成**

Cloud VPN は、公共のインターネットを介して IPsec トンネルを構築し、暗号化された通信を実現する。試験において最も重要なのは「HA VPN」の理解である 。HA VPN は 99.99% の SLA を提供し、Google 側の 2 つの独立したゲートウェイインターフェースを使用して冗長性を確保する。

HA VPN の構成時には、オンプレミス側のルーターでも BGP (Border Gateway Protocol) を適切に設定し、Google 側からのルートを学習し、自組織のルートを広報する必要がある。Classic VPN は一部の動的ルーティング機能が非推奨となっており、新規導入時には常に HA VPN を優先すべきである 。

### **2.2 Cloud Interconnect：専用線による接続**

インターネットを介さない高品質な接続が必要な場合、Cloud Interconnect が選択肢となる。これには 2 つの主要なタイプがある。

- **Dedicated Interconnect:** Google のコロケーション施設で物理的に直接接続する。10 Gbps、100 Gbps、またはそれ以上の広帯域が必要な場合に適している 。
- **Partner Interconnect:** 認定されたサービスプロバイダーを介して接続する。Google の施設に直接物理接続できない場合や、50 Mbps などの小規模な帯域から開始したい場合に適している 。

Interconnect の設計におけるベストプラクティスは、冗長性の確保である。99.99% の可用性を達成するためには、2 つの異なるリージョンに合計 4 つの VLAN アタッチメントを配置し、さらに異なる「エッジ可用性ドメイン」を選択する必要がある 。

| **接続方法** | **帯域幅** | **セキュリティ** | **可用性 (SLA)** |
| --- | --- | --- | --- |
| HA VPN | 最大 3 Gbps / トンネル | IPsec 暗号化 | 99.99% |
| Dedicated Interconnect | 10G/100G/400G | 物理的分離 (暗号化なし*) | 99.9% - 99.99% |
| Partner Interconnect | 50M - 50G | プロバイダー経由 | 99.9% - 99.99% |
| *HA VPN over Interconnect を使用することで暗号化を追加可能 。 |  |  |  |

### **2.3 Cloud Router と動的ルーティングの制御**

ハイブリッド接続の心臓部は Cloud Router である。Cloud Router は BGP セッションを管理し、ルートの交換を行うが、データプレーンのトラフィック自体は通過させない 。

試験で頻出する項目に「動的ルーティングモード」の設定がある。

- **Regional:** 学習したルートを、そのリージョン内のサブネットにのみ適用する。
- **Global:** 全リージョンの全サブネットに学習したルートを反映させる 。

グローバルルーティングを使用する場合、リージョンをまたぐ通信にはコストが加算される。BGP の MED (Multi-Exit Discriminator) 値を調整することで、オンプレミスから Google Cloud への、あるいはその逆のトラフィックフローを制御できる 。

## **第三章：Cloud Load Balancing とコンテンツ配信の最適化**

Google Cloud Load Balancing (GCLB) は、世界中に分散する何千台ものサーバー上で動作するソフトウェア定義のシステムであり、単一のグローバル Anycast IP アドレスでトラフィックを受け取ることができる  (https://cloud.google.com/load-balancing/docs/choosing-load-balancer)。

### **3.1 ロードバランサーの選択アルゴリズム**

適切なロードバランサーを選択するには、トラフィックの性質（HTTP か、それ以外の TCP/UDP か）、グローバルかリージョナルか、外部か内部かを判断する必要がある。

1. **外部 Application Load Balancer (HTTP/HTTPS):** インターネットからの HTTP トラフィックを世界中のリージョンに分散する。SSL オフロード、パスベースルーティング、Google Cloud Armor との統合が可能である 。
2. **外部 Network Load Balancer (TCP/UDP):** パススルー型のロードバランサーであり、高いスループットと低レイテンシを実現する。クライアントのソース IP アドレスを保持したい場合に適している 。
3. **内部 Application/Network Load Balancer:** VPC 内部の多層アーキテクチャ（例：Web 層から App 層への通信）でプライベートに使用される 。

| **特徴** | **Application LB** | **Proxy Network LB** | **Passthrough Network LB** |
| --- | --- | --- | --- |
| OSI レイヤー | レイヤー 7 | レイヤー 4 | レイヤー 4 |
| IP 保存 | X-Forwarded-For ヘッダー | Proxy Protocol | ネイティブ (保持) |
| プロトコル | HTTP, HTTPS, HTTP/2 | TCP, SSL (TLS) | TCP, UDP, GRE |

### **3.2 Cloud CDN と Media CDN による低レイテンシ化**

グローバルなユーザー体験を向上させるため、Cloud CDN は Application Load Balancer と連携して、Google のエッジロケーションにコンテンツをキャッシュする 。これにより、オリジンサーバーの負荷を軽減し、ユーザーに近い場所からデータを配信できる。

特に大規模な動画ストリーミングなど、高いスループットが求められる場合は Media CDN を検討すべきである。Media CDN は YouTube などの大規模サービスで使用されているインフラを直接利用できる 。

## **第四章：ネットワークセキュリティと防御戦略**

クラウドにおけるセキュリティは「多層防御（Defense in Depth）」の原則に基づく。ネットワーク境界での防御だけでなく、リソースレベルでの制御も重要である  (https://cloud.google.com/learn/what-is-cloud-network-security)。

### **4.1 Cloud Armor によるエッジ防御**

Google Cloud Armor は、外部 Application Load Balancer に関連付けられる WAF および DDoS 防御サービスである 。主要な機能には、SQL インジェクションや XSS などの OWASP トップ 10 リスクの緩和、特定の IP やリージョンのブロック、レート制限などがある。

ベストプラクティスは、Adaptive Protection を有効にすることである。これにより、機械学習モデルがトラフィックパターンを分析し、潜在的な L7 DDoS 攻撃に対して最適な防御ルールを自動的に推奨する 。

### **4.2 VPC Service Controls (VPC SC) とデータ漏洩対策**

VPC Service Controls は、Google Cloud のマネージドサービス（Cloud Storage、BigQuery など）の周囲に仮想的な境界を作成する 。これにより、IAM ポリシーだけでは防げない「データの持ち出し（エグルトレーション）」を防止できる。

設計における重要なステップは、まず「ドライランモード」で境界を設定し、正規のトラフィックがブロックされないかを確認することである 。境界を越えた通信が必要な場合は、インプレスポリシーとエグレスポリシーを使用して、特定の条件（特定のユーザー、特定の VPC、信頼されたデバイスなど）に基づいて例外を許可する。

### **4.3 Identity-Aware Proxy (IAP) とゼロトラストアクセス**

管理者が VM に SSH または RDP 接続する際、従来は踏み台サーバー（Bastion Host）が必要だった。しかし、IAP の TCP フォワーディング機能を使用すれば、パブリック IP アドレスを持たない VM に対しても、Google のネットワークを介して安全にアクセスできる  (https://docs.cloud.google.com/iap/docs/tcp-forwarding-overview)。

アクセス権限は IAM によって厳格に管理され、ユーザーの ID やコンテキスト（多要素認証の有無など）に基づいて接続が許可される。これにより、踏み台サーバーの管理コストとセキュリティリスクを大幅に削減できる。

## **第五章：DNS と NAT の高度な構成**

インフラの利便性と可用性を支えるのが DNS であり、外部接続の安定性を確保するのが NAT である。

### **5.1 Cloud DNS のハイブリッド名前解決アーキテクチャ**

ハイブリッド環境では、Google Cloud のリソースがオンプレミスのサーバーを名前解決し、またその逆も可能にする必要がある 。

- **DNS フォワーディング:** Google Cloud からオンプレミスの DNS サーバーへクエリを転送する。この際、35.199.192.0/19 という Google 側の IP 範囲からの通信を許可するようにオンプレミスのファイアウォールを設定する必要がある 。
- **DNS ピアリング:** 複数の VPC ネットワーク間で DNS ゾーンを共有する。ハブ・アンド・スポーク構成において、スポーク VPC がハブの DNS 解決設定を利用できるようにする場合に非常に有効である 。

### **5.2 Cloud NAT のスケーラビリティとベストプラクティス**

Cloud NAT は、パブリック IP を持たないリソースにアウトバウンドのインターネット接続を提供する。一般的な問題は、多数の接続が発生した際の「ポート枯渇」である 。

ベストプラクティスは、Dynamic Port Allocation (DPA) を有効にすることである 。DPA は、VM のトラフィック量に応じて、割り当てる NAT ポート数を自動的に増減させる。また、特定の外部サービス（決済ゲートウェイなど）が送信元 IP アドレスのホワイトリスト登録を要求する場合、Cloud NAT ルールを使用して、特定の宛先に対してのみ固定のパブリック IP を使用するように設定できる 。

## **第六章：監視、運用、およびトラブルシューティング**

ネットワークエンジニアの価値は、問題が発生した際の解決スピードで決まる。Google Cloud は、ネットワークの可視性を高めるための「Network Intelligence Center」を提供している  (https://cloud.google.com/network-intelligence-center)。

### **6.1 診断ツールの活用**

- **Connectivity Tests:** 2 つのエンドポイント間の接続性を静的に分析し、ファイアウォールルールやルーティングの問題を即座に特定する 。
- **Network Topology:** VPC ネットワーク内のトラフィックフローを視覚化し、異常な通信パターンやボトルネックを発見する 。
- **Performance Dashboard:** リージョン間およびゾーン間のパケット損失やレイテンシをリアルタイムで監視する 。

### **6.2 MTU の不一致とパフォーマンス問題の解決**

ネットワークパフォーマンスの低下の原因として頻出するのが MTU (Maximum Transmission Unit) の設定ミスである。VPC のデフォルト MTU は 1,460 バイトだが、標準のイーサネット（1,500 バイト）やジャンボフレーム（8,896 バイト）との混在には注意が必要である 。

特に VPN や Interconnect 経由の通信では、カプセル化によるオーバーヘッド（HA VPN では通常 1,440 バイト）を考慮し、パケットが断片化（フラグメンテーション）されないように MSS クランピングや PMTUD (Path MTU Discovery) を適切に機能させる必要がある 。

### **6.3 非対称ルーティングと BGP のデバッグ**

ハイブリッド接続において、行きと帰りのパケットが異なる経路を通る「非対称ルーティング」が発生すると、ステートフルなファイアウォールによって通信が遮断されることがある 。

トラブルシューティングの第一歩は、Cloud Router のステータスを確認することである。`gcloud compute routers get-status` コマンドを使用すれば、BGP セッションがアップしているか、どのようなルートを学習し、広報しているかを確認できる 。非対称性を解消するには、BGP の優先度設定（AS Path Prepending など）を調整して、往復の経路を一致させることが推奨される 。

## **結論と試験合格に向けた学習のアドバイス**

Google Cloud Professional Cloud Network Engineer 試験の合格には、各サービスの単なる機能理解を超えて、それらが相互にどのように作用するかという「アーキテクチャの視点」が不可欠である。

1. **実機によるハンズオン:** VPC、VPN、共有 VPC、ロードバランサーを実際に作成し、VPC Flow Logs や Connectivity Tests でその挙動を観察することが、知識の定着に最も効果的である 。
2. **公式ドキュメントとベストプラクティスの熟読:** 本報告書で引用した公式ドキュメント（URL 補足分を含む）には、エンジニアが考慮すべき境界条件や制限事項が詳細に記されている 。
3. **シナリオベースの思考:** 「コストを最小限に抑えつつ可用性を最大化するには？」「機密データを扱う環境で外部 API に安全にアクセスするには？」といった具体的なシナリオに対して、最適なサービスの組み合わせを即座に提案できるように訓練することが重要である。

ネットワークはクラウドインフラの毛細血管であり、その設計の質がシステムの堅牢性と拡張性を決定づける。本報告書で詳述した技術体系を武器に、Google Cloud のネットワークスペシャリストとしての道を切り拓かれることを期待する。

| Learn |
[**docs.cloud.google.com**Networking technologies - Google Cloud Documentation新しいウィンドウで開く](https://docs.cloud.google.com/docs/networking)
[**quabyt.com**GCP Networking Best Practices: Global VPC, Shared VPC, and Cloud Interconnect - Quabyt新しいウィンドウで開く](https://quabyt.com/blog/gcp-networking-best-practices)
[**docs.cloud.google.com**Best practices and reference architectures for VPC design - Google Cloud Documentation新しいウィンドウで開く](https://docs.cloud.google.com/architecture/best-practices-vpc-design)
[**docs.cloud.google.com**Best practices for Cloud Run networking - Google Cloud Documentation新しいウィンドウで開く](https://docs.cloud.google.com/run/docs/configuring/networking-best-practices)
[**docs.cloud.google.com**Best practices for GKE networking - Google Cloud Documentation新しいウィンドウで開く](https://docs.cloud.google.com/kubernetes-engine/docs/best-practices/networking)
[**docs.cloud.google.com**Shared VPC | Virtual Private Cloud - Google Cloud Documentation新しいウィンドウで開く](https://docs.cloud.google.com/vpc/docs/shared-vpc)
[**cloud.google.com**Hybrid Connectivity - Google Cloud新しいウィンドウで開く](https://cloud.google.com/hybrid-connectivity)
[**cloud.google.com**Choosing a network connectivity option in Google Cloud新しいウィンドウで開く](https://cloud.google.com/blog/topics/developers-practitioners/choosing-network-connectivity-option-google-cloud/)
[**docs.cloud.google.com**Choosing a Network Connectivity product - Google Cloud Documentation新しいウィンドウで開く](https://docs.cloud.google.com/network-connectivity/docs/how-to/choose-product)
[**docs.cloud.google.com**Best practices for Cloud Interconnect - Google Cloud Documentation新しいウィンドウで開く](https://docs.cloud.google.com/network-connectivity/docs/interconnect/concepts/best-practices)
[**docs.cloud.google.com**Dedicated Interconnect overview - Google Cloud Documentation新しいウィンドウで開く](https://docs.cloud.google.com/network-connectivity/docs/interconnect/concepts/dedicated-overview)
[**docs.cloud.google.com**HA VPN over Cloud Interconnect overview - Google Cloud Documentation新しいウィンドウで開く](https://docs.cloud.google.com/network-connectivity/docs/interconnect/concepts/ha-vpn-interconnect)
[**docs.cloud.google.com**Cloud Router documentation新しいウィンドウで開く](https://docs.cloud.google.com/network-connectivity/docs/router)
[**docs.cloud.google.com**Set routing and best path selection modes | Cloud Router - Google Cloud Documentation新しいウィンドウで開く](https://docs.cloud.google.com/network-connectivity/docs/router/how-to/create-network-set-modes)
[**docs.cloud.google.com**Learned routes | Cloud Router - Google Cloud Documentation新しいウィンドウで開く](https://docs.cloud.google.com/network-connectivity/docs/router/concepts/learned-routes)
[**cisco.com**Select BGP Best Path Algorithm - Cisco新しいウィンドウで開く](https://www.cisco.com/c/en/us/support/docs/ip/border-gateway-protocol-bgp/13753-25.html)
| Cloud Load Balancing |
[**docs.cloud.google.com**Security policy overview | Google Cloud Armor新しいウィンドウで開く](https://docs.cloud.google.com/armor/docs/security-policy-overview)
[**docs.cloud.google.com**About Private Service Connect | GKE networking - Google Cloud Documentation新しいウィンドウで開く](https://docs.cloud.google.com/kubernetes-engine/docs/concepts/private-service-connect)
[**cloud.google.com**AI-powered multicloud networking | Google Cloud新しいウィンドウで開く](https://cloud.google.com/resources/networking)
[**cloud.google.com**Cloud network security: definition and best practices | Google Cloud新しいウィンドウで開く](https://cloud.google.com/learn/what-is-cloud-network-security)
[**fidelissecurity.com**Best Security Practices for Google Cloud Platform in 2026新しいウィンドウで開く](https://fidelissecurity.com/cybersecurity-101/best-practices/google-cloud-platform-gcp-security/)
[**docs.cloud.google.com**Cloud Armor best practices - Google Cloud Documentation新しいウィンドウで開く](https://docs.cloud.google.com/armor/docs/best-practices)
| by Rahul Kumar Singh |
[**cloud.google.com**VPC Service Controls | Google Cloud新しいウィンドウで開く](https://cloud.google.com/security/vpc-service-controls)
[**oneuptime.com**How to Implement VPC Service Controls to Protect Sensitive Data in a GCP Project新しいウィンドウで開く](https://oneuptime.com/blog/post/2026-02-17-how-to-implement-vpc-service-controls-to-protect-sensitive-data-in-a-gcp-project/view)
[**docs.cloud.google.com**TCP forwarding overview | Identity-Aware Proxy - Google Cloud Documentation新しいウィンドウで開く](https://docs.cloud.google.com/iap/docs/tcp-forwarding-overview)
[**oneuptime.com**Set Up SSH Tunneling Through IAP to Reach Compute Engine VMs Without Public IPs新しいウィンドウで開く](https://oneuptime.com/blog/post/2026-02-17-how-to-set-up-ssh-tunneling-through-iap-to-reach-compute-engine-vms-without-public-ips/view)
[**docs.cloud.google.com**Best practices for Cloud DNS | Google Cloud Documentation新しいウィンドウで開く](https://docs.cloud.google.com/dns/docs/best-practices)
[**cloud.google.com**Cloud DNS新しいウィンドウで開く](https://cloud.google.com/dns)
[**docs.cloud.google.com**Create a forwarding zone | Cloud DNS - Google Cloud Documentation新しいウィンドウで開く](https://docs.cloud.google.com/dns/docs/zones/forwarding-zones)
[**cloud.google.com**Create a highly available hybrid Cloud DNS configuration | Google Cloud Blog新しいウィンドウで開く](https://cloud.google.com/blog/products/networking/create-a-highly-available-hybrid-cloud-dns-configuration)
[**youtube.com**Cross-Cloud Networking: DNS Design - YouTube新しいウィンドウで開く](https://www.youtube.com/watch?v=mD4_JGSh09s)
[**binadox.com**GCP Cloud NAT Security: Best Practices for Private Subnets - Binadox新しいウィンドウで開く](https://www.binadox.com/blog/binadox-article-enable-cloud-nat-for-private-subnets/)
[**cloud.google.com**Google Cloud NAT New Scaling Features新しいウィンドウで開く](https://cloud.google.com/blog/products/networking/google-cloud-nat-new-scaling-features)
| by Chimbu Chinnadurai |
[**cloud.google.com**Network Intelligence Center | Google Cloud新しいウィンドウで開く](https://cloud.google.com/network-intelligence-center)
[**docs.cloud.google.com**Network Intelligence Center - Google Cloud Documentation新しいウィンドウで開く](https://docs.cloud.google.com/network-intelligence-center/docs)
[**cloud.google.com**Your top network performance problems and how to fix them | Google Cloud Blog新しいウィンドウで開く](https://cloud.google.com/blog/products/networking/your-top-network-performance-problems-and-how-to-fix-them)
| Virtual Private Cloud |
[**docs.cloud.google.com**Cloud Interconnect overview - Google Cloud Documentation新しいウィンドウで開く](https://docs.cloud.google.com/network-connectivity/docs/interconnect/concepts/overview)
[**oneuptime.com**How to Configure MTU Settings to Prevent Packet Fragmentation - OneUptime新しいウィンドウで開く](https://oneuptime.com/blog/post/2026-02-17-how-to-configure-mtu-settings-to-prevent-packet-fragmentation-on-gcp-cloud-vpn-tunnels/view)
[**noction.com**BGP and asymmetric routing - Noction新しいウィンドウで開く](https://www.noction.com/blog/bgp-and-asymmetric-routing)
[**freecram.com**Exam Professional-Cloud-Network-Engineer Topic 1 Question 135 Discussion - FreeCram新しいウィンドウで開く](https://www.freecram.com/discussions/Google/exam-professional-cloud-network-engineer-topic-1-question-135-discussion-p1114364.html)
[**examtopics.com**Exam Professional Cloud Network Engineer topic 1 question 163 discussion - ExamTopics新しいウィンドウで開く](https://www.examtopics.com/discussions/google/view/133323-exam-professional-cloud-network-engineer-topic-1-question/)
[**scribd.com**Cloud Network Engineer Cram Sheet v2 | PDF - Scribd新しいウィンドウで開く](https://www.scribd.com/document/985757132/Cloud-Network-Engineer-Cram-Sheet-v2)
[**partner.skills.google**Professional Cloud Network Engineer Certification | Google Skills for Partners新しいウィンドウで開く](https://partner.skills.google/paths/78)
[**test-king.com**Google Professional Cloud Network Engineer Exam Difficulty Explained - Test-king.com新しいウィンドウで開く](https://www.test-king.com/blog/google-professional-cloud-network-engineer-exam-difficulty-explained/)

[](https://t0.gstatic.com/faviconV2?url=https://cloud.google.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t0.gstatic.com/faviconV2?url=https://docs.cloud.google.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t3.gstatic.com/faviconV2?url=https://quabyt.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t0.gstatic.com/faviconV2?url=https://docs.cloud.google.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t0.gstatic.com/faviconV2?url=https://docs.cloud.google.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t0.gstatic.com/faviconV2?url=https://docs.cloud.google.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t0.gstatic.com/faviconV2?url=https://docs.cloud.google.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t0.gstatic.com/faviconV2?url=https://cloud.google.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t0.gstatic.com/faviconV2?url=https://cloud.google.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t0.gstatic.com/faviconV2?url=https://docs.cloud.google.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t0.gstatic.com/faviconV2?url=https://docs.cloud.google.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t0.gstatic.com/faviconV2?url=https://docs.cloud.google.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t0.gstatic.com/faviconV2?url=https://docs.cloud.google.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t0.gstatic.com/faviconV2?url=https://docs.cloud.google.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t0.gstatic.com/faviconV2?url=https://docs.cloud.google.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t0.gstatic.com/faviconV2?url=https://docs.cloud.google.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t0.gstatic.com/faviconV2?url=https://www.cisco.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t0.gstatic.com/faviconV2?url=https://cloud.google.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t0.gstatic.com/faviconV2?url=https://docs.cloud.google.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t0.gstatic.com/faviconV2?url=https://docs.cloud.google.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t0.gstatic.com/faviconV2?url=https://cloud.google.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t0.gstatic.com/faviconV2?url=https://cloud.google.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t1.gstatic.com/faviconV2?url=https://fidelissecurity.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t0.gstatic.com/faviconV2?url=https://docs.cloud.google.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t0.gstatic.com/faviconV2?url=https://medium.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t0.gstatic.com/faviconV2?url=https://cloud.google.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t1.gstatic.com/faviconV2?url=https://oneuptime.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t0.gstatic.com/faviconV2?url=https://docs.cloud.google.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t1.gstatic.com/faviconV2?url=https://oneuptime.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t0.gstatic.com/faviconV2?url=https://docs.cloud.google.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t0.gstatic.com/faviconV2?url=https://cloud.google.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t0.gstatic.com/faviconV2?url=https://docs.cloud.google.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t0.gstatic.com/faviconV2?url=https://cloud.google.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t0.gstatic.com/faviconV2?url=https://www.youtube.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t2.gstatic.com/faviconV2?url=https://www.binadox.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t0.gstatic.com/faviconV2?url=https://cloud.google.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t2.gstatic.com/faviconV2?url=https://engineering.doit.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t0.gstatic.com/faviconV2?url=https://cloud.google.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t0.gstatic.com/faviconV2?url=https://docs.cloud.google.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t0.gstatic.com/faviconV2?url=https://cloud.google.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t0.gstatic.com/faviconV2?url=https://docs.cloud.google.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t0.gstatic.com/faviconV2?url=https://docs.cloud.google.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t1.gstatic.com/faviconV2?url=https://oneuptime.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t3.gstatic.com/faviconV2?url=https://www.noction.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t1.gstatic.com/faviconV2?url=https://www.freecram.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t2.gstatic.com/faviconV2?url=https://www.examtopics.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t2.gstatic.com/faviconV2?url=https://www.scribd.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t0.gstatic.com/faviconV2?url=https://partner.skills.google/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)

[](https://t1.gstatic.com/faviconV2?url=https://www.test-king.com/&client=BARD&type=FAVICON&size=256&fallback_opts=TYPE,SIZE,URL)
