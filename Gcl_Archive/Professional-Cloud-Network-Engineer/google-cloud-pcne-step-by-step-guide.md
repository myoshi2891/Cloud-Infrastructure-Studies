# **Google Cloud Professional Cloud Network Engineer 認定試験：初学者のためのステップバイステップ完全攻略とベストプラクティス**

Google Cloud Certified Professional Cloud Network Engineer 認定試験は、Google Cloud環境におけるネットワークインフラストラクチャの設計、実装、管理、監視、およびセキュリティ確保に関する高度な専門知識を総合的に評価するプロフェッショナル向けの試験である。この認定試験は、2時間の制限時間内に50〜60問の多肢選択式および複数選択式の問題が出題され、英語および日本語で受験できる。受験料は200米ドルであり、オンラインでの遠隔監視試験、または世界中のテストセンターでのオンサイト受験を選択できる（試験の基本情報や登録要件については公式ガイド：<https://cloud.google.com/learn/certification/cloud-network-engineer> を参照）。

ネットワークインフラストラクチャは、クラウド上で稼働するすべてのアプリケーションとデータの基盤となる。初学者にとって、Google Cloudのネットワークが従来のオンプレミスネットワークとどのように異なり、ソフトウェア定義ネットワーク（SDN）がどのような恩恵をもたらすかを根本から理解することが、試験合格への最初の、そして最も重要なステップとなる。本レポートでは、公式試験ガイドの出題範囲に沿って、VPCの設計からハイブリッド接続、マネージドサービス、セキュリティ、運用監視に至るまで、すべての項目について背景となる技術的メカニズムと現場でのベストプラクティスをステップバイステップで網羅的に解説する。

## **ステップ1：Virtual Private Cloud（VPC）ネットワークの設計と実装（出題範囲：セクション1・2）**

Google CloudのVirtual Private Cloud（VPC）は、「Andromeda」と呼ばれる独自のソフトウェア定義ネットワーク（SDN）ファブリック上に構築されている。これは従来のVLANベースのネットワークとは異なり, 単一のVPCがグローバルなスコープを持ち、異なるリージョン間でもパブリックインターネットを経由せずに内部IPアドレスでの直接通信を可能にするという極めて強力な特性を持っている。

### **カスタムモードVPCの採用とサブネット設計**

VPCを作成する際、初学者が直面する最初の選択が「自動（Auto）モード」と「カスタム（Custom）モード」のどちらを使用するかである。本番環境およびエンタープライズの設計において、設計の初期段階からカスタムモードを採用することが絶対的なベストプラクティスとして推奨されている。

自動モードでは、Google Cloudがリソースを提供するすべてのリージョンに対して、「10.128.0.0/9」という広大な同一の内部IPアドレス空間から自動的にサブネットが割り当てられる。一見すると便利に思えるが、ハイブリッドクラウド環境においてオンプレミスの企業ネットワークとIPsec VPNやCloud Interconnectで接続する際、この固定されたIP範囲がオンプレミスのIPアドレスと重複（オーバーラップ）を引き起こす決定的な要因となるからである。さらに、自動モードのVPCネットワーク同士は、プライマリIP範囲が完全に同一であるという理由から、VPCネットワークピアリングを使用して相互接続することがシステム上不可能である。

また、Google CloudのVPCはグローバルな到達性を持ち、SDNがすべての仮想マシン（VM）インスタンス間でフルメッシュのルーティングを提供する。したがって、従来のオンプレミスネットワークのように、ブロードキャストドメインを分割・制限する目的で小さなサブネットを多数作成する必要はない。同じ種類のアプリケーションは、少数の大きなアドレス空間を持つサブネットに論理的にグループ化することがベストプラクティスとなる。ただし、Cloud NAT、VPCフローログ、限定公開Googleアクセス（Private Google Access）といった一部の高度なネットワーク機能はサブネット単位で有効化されるため、これらの機能をきめ細かく制御する必要がある境界においては、意図的にサブネットを分割するアプローチが極めて有効である。

### **マルチプロジェクトアーキテクチャの選択とクォータ管理**

組織が成長するにつれて、単一のプロジェクトにすべてのリソースを配置する運用は限界を迎える。リソースクォータの管理や独立したIAM（Identity and Access Management）制御を実現するためには、プロジェクトごとにVPCを作成し、それらをいかに効率的に接続するかを設計しなければならない（VPC設計のベストプラクティス：<https://docs.cloud.google.com/architecture/best-practices-vpc-design>）。

マルチプロジェクト環境のネットワーク接続には、主に「共有VPC（Shared VPC）」「VPCネットワークピアリング」「Network Connectivity Center（NCC）」の3つのアーキテクチャが存在し、それぞれの特性を深く理解することが試験で頻出する。

| **接続アーキテクチャ** | **制御の主体とスコープ** | **推移的ルーティング（Transitivity）** | **最適なユースケースと技術的特徴** |
| --- | --- | --- | --- |
| **共有VPC (Shared VPC)** | ホストプロジェクトによる中央集権的制御（同一組織内に限定） | 対応（すべてのサービスプロジェクト間で通信可能） | 中央のネットワークチームがIPアドレス、ファイアウォール、ルートを一元管理し、開発チーム（サービスプロジェクト）に`networkUser`ロールを付与してリソースを展開させるエンタープライズの標準構成。 |
| **VPCネットワークピアリング** | プロジェクトごとの分散管理（異なる組織間でも接続可能） | 非対応（A-B間、B-C間でピアリングしても、A-C間は通信不可） | チームごとに完全なネットワークの自律性が必要な場合や、サードパーティSaaSとの連携に最適。推移性がないため、大規模になると管理オーバーヘッドが指数関数的に増大する。 |
| **Network Connectivity Center (NCC)** | ハブ＆スポークモデルによるグローバルな接続管理 | 対応（最大250のVPCネットワークを単一のハブに接続可能） | 複雑なVPCピアリングのメッシュを排除し、マルチクラウドや大規模なオンプレミス接続を集約する。次世代ファイアウォールの挿入など、トラフィック制御の中枢として機能する。 |

初学者は、共有VPCを利用することで、各サービスプロジェクトが個別にハイブリッド接続を構築する手間を省き、ホストプロジェクトに集約された単一のCloud Interconnect接続をすべてのVMが透過的に利用できるというメカニズムを理解する必要がある。また、Google Cloudの設計では「プロジェクトごとに1つのVPCネットワークを作成する」ことが推奨されている。これは、Cloud Routerやファイアウォールルールなどのリソースクォータがプロジェクト単位で適用されるため、クォータの引き上げ要求と容量計画を正確にマッピングしやすくするためである。

## **ステップ2：ハイブリッドおよびマルチクラウドネットワークの構成（出題範囲：セクション4）**

オンプレミスインフラストラクチャや他のパブリッククラウド（AWS、Azureなど）との間で、セキュアかつ低遅延なハイブリッド接続を構成することは、エンタープライズ移行において必須の課題である。

### **Cloud InterconnectとCloud VPNの使い分け**

大容量のデータ転送や極めて低い遅延が求められるミッションクリティカルな要件には、「Cloud Interconnect」が利用される。これには、Googleのエッジネットワークと顧客のルーターを直接物理的に接続し、最大10Gbpsまたは100Gbpsの専用帯域を提供する「Dedicated Interconnect」と、対応するサービスプロバイダ経由で接続する「Partner Interconnect」が存在する。さらに、近年では「Cross-Cloud Interconnect」と呼ばれるマネージドサービスにより、AWSやAzureなどのサードパーティクラウドプロバイダとGoogle Cloudを直接、高帯域幅で安全に接続できる。

一方、パブリックインターネットを経由する暗号化されたIPsec VPN接続を提供するのが「Cloud VPN」である。最大1.5〜3.0 Gbpsのスループットを提供し、導入コストが低いため、低ボリュームのデータ転送やバックアップ回線として適している。高いセキュリティ水準が求められる場合、Cloud Interconnectの物理回線上を流れるデータを暗号化するために「HA VPN over Interconnect」を構成することがベストプラクティスとなる。

### **Cloud Router、BGP、およびBFDの高度な設計**

これらのハイブリッド接続における動的ルーティングのオーケストレーションを担うのが「Cloud Router」である。Cloud Router自体はデータプレーンのパケット転送を行わず、SDNのコントロールプレーンにおけるBGP（Border Gateway Protocol）スピーカーとして機能し、ルートの学習と広報を行う。

VPCの動的ルーティングモードには「リージョン」と「グローバル」の2種類がある。グローバルモードに設定すると、Cloud RouterはVPC内のすべてのリージョンに存在するサブネットを学習し、遠隔地のオンプレミスネットワークに対しても広報する。この際、トラフィックがネットワークのバックボーンを最適に流れるよう、Multi-Exit Discriminator（MED）というペナルティメトリクスが自動的に付与され、常により近いリージョンのインターコネクトが優先されるメカニズムとなっている。

ネットワークの回復力（レジリエンス）を高めるための極めて重要な設定が「双方向フォワーディング検出（BFD: Bidirectional Forwarding Detection）」である（設定詳細：<https://cloud.google.com/network-connectivity/docs/router/concepts/bfd>）。標準的なBGPのキープアライブタイマーでは、リンクの障害を検知するのに約60秒からそれ以上かかる場合がある。しかし、UDPベースの低オーバーヘッドプロトコルであるBFDをCloud Routerとオンプレミスルーターの双方で有効化することで、最短5秒での高速な障害検知とフェイルオーバーが可能になる。ベストプラクティスとして、BGPセッションのフラッピング（頻繁な切断と再接続）を防ぐため、最小送信間隔（Min Transmit Interval）やマルチプライヤ（Multiplier）を調整し、障害検知時間が少なくとも5000ミリ秒以上になるよう設定することが推奨される。

### **ルーティングの制限とクォータ管理**

Cloud Routerの運用において、システム制限とクォータに関する深い理解は試験対策として不可欠である。Cloud Routerは特定のプロジェクトおよびVPCネットワーク内の各リージョンにつき、最大5つまでしか作成できないという固定のシステム制限がある（2026-04-10時点で確認済み：<https://cloud.google.com/network-connectivity/docs/router/quotas> ）。

また、動的ルートのプレフィックス学習には「独自のリージョンからのルート（from-own-region）」と「他のリージョンからのルート（from-other-regions）」という2つのクォータが存在する。これらのクォータを超過すると、VPCネットワークはルートを破棄し始め、断続的な通信障害が発生する。ルートが破棄される際のメカニズムは決定論的であり、サブネットマスク長が短くより広い範囲を示すもの（例：/24）が優先的に保持され、マスク長の長いものから順番に破棄される。IPv6のプレフィックス（通常/48）はIPv4（最大/32）よりもマスク長が長いため、上限に達した際はIPv6ルートから優先的に破棄されるという特性がある。このような事態を防ぐため、Cloud Monitoringを使用してアラートポリシーを設定し、必要に応じてオンプレミスルーター側でルートを集約（サマライズ）して送信することが重要なベストプラクティスである。

Sources / Verified (2026-04-10): [Cloud Router Quotas](https://cloud.google.com/network-connectivity/docs/router/quotas)

## **ステップ3：マネージドネットワークサービスの構成（出題範囲：セクション3）**

クラウドネイティブな環境において、スケーラビリティと可用性を提供するマネージドネットワークサービスの適切な選定と構成は、Cloud Network Engineerの腕の見せ所である。

### **Cloud Load Balancing の決定木とベストプラクティス**

Google Cloud Load Balancingは、Googleの基幹技術であるMaglev、Andromeda、Google Front End（GFE）、およびオープンソースのEnvoyプロキシを基盤として構築された, ソフトウェア定義の分散型マネージドサービスである。グローバルなエニーキャストIPアドレスを使用し、事前ウォーミング（Pre-warming）を一切必要とせずに、ゼロから瞬時に数百万リクエスト毎秒までシームレスにスケールアップする能力を持つ。

要件に応じたロードバランサの選択は、試験における最重要トピックの一つである。

| **ロードバランサの種類** | **レイヤー** | **グローバル / リージョン** | **主要な技術とユースケースの特性** |
| --- | --- | --- | --- |
| **外部アプリケーションロードバランサ** | L7 (HTTP/HTTPS) | グローバルおよびリージョン | GFEやEnvoyベース。URLパスベースのルーティング、SSL終端、Cloud CDNやCloud Armorとの統合機能を持つ。最新版ではトラフィックミラーリングやヘッダー変換などの高度なトラフィック管理をサポートする。 |
| **内部アプリケーションロードバランサ** | L7 (HTTP/HTTPS) | リージョンおよびクロスリージョン | VPC内部のマイクロサービス間通信に最適。外部インターネットに公開せず、内部IPでL7のトラフィック制御を行う。 |
| **プロキシネットワークロードバランサ** | L4 (TCP/UDP) | グローバルおよびリージョン | TCP/UDPトラフィックのSSLオフロードとプロキシ機能を提供し、バックエンドインスタンスの処理負荷を軽減する。 |
| **パススルーネットワークロードバランサ** | L4 (TCP/UDP) | リージョン | Direct Server Return (DSR) メカニズムを使用し、パケットを書き換えずにバックエンドへ直接転送する。究極の低遅延が求められるケースに最適である。 |

最適化のベストプラクティスとして、クライアントのレイテンシを最小限に抑えるため、グローバル外部アプリケーションロードバランサでは「HTTP/3（QUICプロトコル）」を有効化することが推奨される。HTTP/3はUDPベースで動作し、特にパケットロスが発生しやすいモバイル環境において接続の確立を高速化する。また、静的コンテンツをエッジでキャッシュし、バックエンドの負荷を劇的に軽減する「Cloud CDN」の統合も標準的なアプローチである。さらに最新のトレンドとして、カスタムメトリクスを用いたキュー深度（Queue depth）ベースの負荷分散により、TPUやGPUを利用する AIワークロードのレスポンスタイムを最適化する構成も注目されている。

### **Cloud DNS のプライベートゾーンとハイブリッド名前解決**

Cloud DNSは、スケーラブルで低遅延のマネージドDNSサービスである。VPC内部でのみ解決可能な「プライベートゾーン」を使用することで、内部サービスのIPアドレスを外部に露出させずにセキュアな名前解決を実現できる。

ハイブリッド環境において、オンプレミス環境とGoogle Cloud間で名前解決を統合することは頻出の設計パターンである（ベストプラクティス：<https://docs.cloud.google.com/dns/docs/best-practices>）。

- **Google Cloudからオンプレミスへの解決：** 共有VPCのホストプロジェクトにCloud DNSの「転送ゾーン（Forwarding Zone）」を設定し、オンプレミスのドメイン（例：`corp.example.com`）へのクエリをオンプレミスのDNSサーバーIPへ転送する。
- **オンプレミスからGoogle Cloudへの解決：** ホストプロジェクトに「インバウンドサーバーポリシー」を設定し、オンプレミス側のDNSサーバーからCloud DNSのインバウンドフォワーダーIPアドレスに対して、Google Cloudの内部ドメイン（例：`gcp.example.com`）の解決を委譲する。

複数あるVPCネットワークが存在する場合、すべてのVPCから個別にオンプレミスへ転送するのではなく、「DNSピアリング（DNS Peering）」を利用して開発用VPCから本番用（ハブ）VPCへクエリを転送し、ハブVPCから一括してオンプレミスへ送る構成にすることで、ファイアウォールルールの管理と監査のオーバーヘッドを大幅に削減できる。クォータの観点から、Cloud DNSのUDP応答サイズの最大制限は1,440バイト、TCP応答は65,533バイトであり、1つのVPCにバインドできるマネージドゾーンの数は10,000である点を記憶しておく必要がある（2026-04-10時点で確認済み：https://cloud.google.com/dns/quotas）。

### **Cloud NAT のプロキシレス設計とキャパシティプランニング**

パブリックIPアドレスを持たないVPC内のVMインスタンスやGKEクラスタが、OSのアップデートや外部APIを呼び出すためにインターネットへのアウトバウンド（下り）接続を必要とする場合、「Cloud NAT」を使用する。

Cloud NATの最大の特徴は、従来のプロキシVMや物理アプライアンスに依存しない「プロキシレス・ソフトウェア定義アーキテクチャ」である。NATの変換処理（SNATおよびDNAT）はAndromeda SDNレイヤーで直接実行されるため、単一のチョークポイントが形成されず、ネットワーク帯域幅に一切のペナルティを与えずにスケールする。

キャパシティプランニングの観点において、1つのパブリックIPアドレスは、プロトコル（TCPおよびUDP）ごとに最大64,512個の送信元ポート、つまり両方のプロトコルが使用される場合は合計最大約129,024ポートを提供する（2026-04-10時点で確認済み：<https://cloud.google.com/nat/docs/quotas> ）。多数のVMが同時に大量のコネクションを確立しようとすると、ポートが枯渇し通信エラーが発生する。この問題に対するベストプラクティスは、トラフィックの需要に応じてNAT IPアドレスを自動的に追加する「自動割り当てモード」を使用し、かつ「動的ポート割り当て（Dynamic Port Allocation: DPA）」機能を有効にすることである。これにより、少数のコネクションしか持たないVMには最小限のポートのみを割り当て、大量の通信を行うVMには動的に数千のポートをスケールアップして割り当てることができる。

Sources / Verified (2026-04-10): [Cloud DNS Quotas](https://cloud.google.com/dns/quotas), [Cloud NAT Quotas](https://cloud.google.com/nat/docs/quotas)

### **Private Service Connect (PSC) のセキュアアーキテクチャ**

Private Service Connect（PSC）は、異なるVPCネットワーク間や、Google API（Cloud Storageなど）、さらにはサードパーティのSaaSに対して、完全にプライベートな内部IPアドレスのみを使用して接続を確立する高度なサービスである。VPCピアリングのようなIPアドレス空間の重複による制約を受けず、コンシューマとプロデューサー間でNATを使用して接続を抽象化するため, 設計の柔軟性が極めて高い。

PSCのユースケースには以下の主要なコンポーネントが存在する。

1. **エンドポイント（Endpoints）：** コンシューマVPC内に内部IPをプロビジョニングし、レイヤー4の接続を提供する。Google APIや公開サービスに直接アクセスする最もシンプルな方法である。
2. **バックエンド（Backends）：** トラフィックを内部アプリケーションロードバランサとネットワークエンドポイントグループ（NEG）を経由させる構成である。カスタムURLのルーティングや、高度なトラフィック管理機能が必要な場合に選択される。
3. **公開サービス（Published Services） / インターフェース（Interfaces）：** サービスを提供するプロデューサー側が、ロードバランサの背後にアタッチメントを作成してコンシューマに公開する。インターフェースを使用すると、プロデューサー側からコンシューマVPCへ双方向の接続を開始することも可能となる。

PSCをエンタープライズで運用する際は、プロデューサー側で「コンシューマ承認リスト」を厳密に設定し、承認されたプロジェクトやVPCからのみ接続を受け入れるゼロトラストのアプローチを徹底することがベストプラクティスである。

## **ステップ4：GKE（Google Kubernetes Engine）のネットワークと最適化**

コンテナ化されたワークロードのネットワーク構成は、Google Cloudネットワーキングにおいて最も複雑かつ動的な分野である。

### **VPCネイティブクラスタとIPアドレス戦略**

GKEクラスタを構築する際、現在は「VPCネイティブ」クラスタが標準かつ推奨される構成である（Autopilotモードではデフォルトで強制される）。VPCネイティブクラスタは、ノードのプライマリIPアドレスに加えて、VPCのエイリアスIP機能を利用してPodとServiceに専用のセカンダリIPアドレス範囲を割り当てる。これにより、PodのIPアドレスがVPC全体でネイティブにルーティング可能となり、複雑な静的ルートに依存することなく通信が確立される。

GKE環境において最も頻発する問題の一つが、Pod用IPアドレス空間の枯渇である。Standardクラスタのデフォルト設定では、ノードごとに最大110個のPodをスケジュール可能とするため、ノード1台につき「/24」の巨大なサブネット空間が消費される。ノードあたりに配置する実際のPod数が少ないと予測される場合は、クラスタ作成時に「ノードごとの最大Pod数」を例えば64や32に減らすことで、IP空間の消費を半分以下に抑えることが強く推奨される。さらに、RFC 1918のプライベートIP空間が枯渇しているエンタープライズ環境では、RFC 6598（100.64.0.0/10）やClass E（240.0.0.0/4）の空間を利用する非連続マルチPod CIDR構成や、BYOIP（Bring Your Own IP）戦略を導入することが解決策となる。

### **コンテナネイティブ負荷分散とGateway API**

GKE内のサービスを外部またはVPC内部に公開する場合、従来はKubernetes Ingressオブジェクトが利用されていたが、現在はより表現力豊かでロールベースの管理が可能な「Gateway API」の利用がベストプラクティスとなっている。

外部Application Load Balancerをプロビジョニングする際, GKEは「コンテナネイティブ負荷分散」を構成する。これは、ネットワークエンドポイントグループ（NEG）を利用して、ロードバランサから直接各PodのIPアドレスへトラフィックを転送するメカニズムである。これにより、従来のノードポートを経由する際に行われていたkube-proxyによるiptablesのSNAT/DNAT処理や追加のネットワークホップが完全に排除され、レイテンシが最適化されるとともに、送信元のクライアントIPアドレスを正確に保持できる。さらに、特定のノード上のPod数に基づいてトラフィックを動的に振り分ける「Utilization-based Load Balancing（使用率ベースの負荷分散）」をGateway API経由で実装することで、より高効率なリソース管理が実現する。

セキュリティの観点からは、GKEのデータプレーンにeBPF（Extended Berkeley Packet Filter）ベースの「Dataplane V2」を導入することが不可欠である。これにより、ネットワークポリシー（Pod間通信のホワイトリスト化）がkube-proxyのiptablesオーバーヘッドなしに高速に実行され、マイクロサービス間のラテラルムーブメント（脅威の横展開）を防御する強力な多層防御が確立される。

## **ステップ5：クラウドネットワークセキュリティの実装（出題範囲：セクション6）**

Google Cloudでは、エッジネットワーク、VPCの境界、そしてインスタンスレベルに至るまで、多重のセキュリティコントロールを提供する。

### **Google Cloud Armor によるDDoS保護とWAF**

外部に公開されるWebアプリケーションを保護する第一線となるのが「Google Cloud Armor」である。これは外部アプリケーションロードバランサに直接統合されるエッジセキュリティサービスであり、レイヤー3およびレイヤー4のボリューム型DDoS攻撃をGoogleのグローバルインフラストラクチャの規模で吸収する。

さらに重要なのは、OWASP Top 10の脅威（SQLインジェクション、クロスサイトスクリプティングなど）を防御するためのWeb Application Firewall（WAF）機能である。セキュリティポリシーを定義する際、ルールの評価順序（優先度）は誤検知（False Positive）を防ぐために決定的な意味を持つ。ベストプラクティスとして、以下の順序でルールを階層化することが推奨されている（公式ドキュメント：<https://docs.cloud.google.com/armor/docs/best-practices>）：

1. **明示的な拒否ルール（最高優先度）：** Threat Intelligenceによる既知の悪意あるIP、特定のGeoロケーション（国別ブロック）、特定のASNからの通信を即座にドロップする。
2. **明示的な許可ルール：** 組織内の脆弱性スキャナや信頼されたIPからのアクセスを許可する（リスクを伴うため慎重に設定する）。
3. **WAFセキュリティルール：** SQLiやXSSなどの悪意のあるペイロードをシグネチャベースで検出する。ここでJSONパーシングを有効化することで、APIトラフィックのディープインスペクションが可能になる。
4. **デフォルトの拒否ルール（最低優先度）：** 上記のいずれにも該当しない想定外のトラフィックをすべてブロックする。

新しいWAFルールを導入する際は、正規のユーザー通信を誤って遮断しないよう、必ず「プレビューモード（Preview Mode）」でデプロイし、ログ上でブロックされるトラフィックの傾向を分析してから強制（Enforce）モードに移行することが運用の鉄則である。また、機械学習モデルを用いて平時のトラフィックベースラインを学習し、レイヤー7のDDoS攻撃の兆候を検知して自動的に緩和ルールを生成する「Adaptive Protection」を有効化することで、ゼロデイ攻撃への耐性を飛躍的に高められる。

### **VPC Service Controls (VPC-SC) によるデータ持ち出し防止**

VPC Service Controls (VPC-SC) は, IAMによる「誰がアクセスできるか」という制御に加え、「どこからアクセスできるか」というネットワークの境界（ペリメーター）を設定する機能である。これにより、たとえ正規の認証情報を持った内部ユーザーであっても、許可されていない外部のIPアドレスや未承認のVPCネットワークからCloud StorageやBigQueryの機密データを持ち出すこと（データエクスフィルトレーション）をインフラレベルで完全に遮断する。

VPC-SCの導入は強力である反面、設定を誤ると既存の正常なアプリケーション連携まで遮断し、深刻なシステム障害を引き起こすリスクがある。そのため、以下のステップに基づく段階的な導入プロセスがベストプラクティスとして定義されている。

1. **ドライラン（Dry Run）モードの活用：** 最初から強制するのではなく、実際のトラフィックをブロックせずに違反が発生した事実のみをログに記録する「ドライラン境界」を作成する。
2. **BigQueryでのログ分析：** ログシンクを使用して監査ログをBigQueryにエクスポートし、`cloudaudit_googleapis_com_policy`テーブルに対してSQLクエリを実行する。これにより、どのAPIが、どのプロジェクトから、どのIPアドレスによって呼び出され、なぜブロック対象となったか（例：`SERVICE_NOT_ALLOWED_FROM_VPC`）を可視化する。
3. **アクセスレベルとイングレス/エグレスルールの構成：** ドライランの分析結果に基づき、正当な通信（特定のオンプレミスIPやCI/CDパイプラインのサービスアカウントなど）をホワイトリストとして許可する「アクセスレベル」や「イングレスルール」を精密に定義する。
4. **強制モードへの移行：** 違反ログがゼロになったことを確認した後に初めて、ペリメーターを強制モードに切り替える。

### **Packet Mirroring と侵入検知システム（IDS）**

コンプライアンス要件や高度な脅威ハンティングのために、パケットのペイロードそのものを深く検査する必要がある場合、「VPC パケットミラーリング（Packet Mirroring）」が利用される。

この機能は、Andromeda SDNファブリックにネイティブに組み込まれており、対象となるVMインスタンスのパフォーマンスや帯域幅に一切のペナルティを与えることなく、トラフィックの完全なコピー（クローン）を生成する。コピーされたパケットは、内部パススルーネットワークロードバランサを介して、同一リージョン内に配置されたPalo Alto NetworksやCheck Pointなどのサードパーティ製セキュリティアプライアンス、あるいはGoogle CloudのマネージドサービスであるCloud IDSのコレクターバックエンドへと透過的に転送される。これにより、アウトオブバンドでのシグネチャベースの侵入検知や、アプリケーションログだけでは到底把握しきれない「Over the wire（ネットワーク上の生の通信内容）」の詳細な可視化が実現し、ゼロトラストネットワークの監視能力が極限まで高められる。

## **ステップ6：ネットワーク運用、監視、およびトラブルシューティング（出題範囲：セクション5）**

クラウドネットワークを構築した後の運用フェーズにおいて、問題の根本原因を迅速に特定し、パフォーマンスを維持することは、ネットワークエンジニアの最重要任務である。

### **Network Intelligence Center による可視化と診断**

「Network Intelligence Center」は、Google Cloud上のネットワークトポロジの可視化と、障害のトラブルシューティングを単一のコンソールで提供する統合モジュール群である（詳細：<https://cloud.google.com/network-intelligence-center>）。

- **Network Topology（ネットワークトポロジ）：** VPC間、リージョン間、オンプレミス環境とのハイブリッド接続、さらにはVMとインターネット間の実際のトラフィックフローを視覚的なグラフとしてマッピングする。これにより、ルーティングの非効率性や、意図しない経路を通るトラフィックを直感的に把握できる。
- **Connectivity Tests（接続テスト）：** これはおそらくトラブルシューティングにおいて最も強力なツールである。実際にICMPやTCPパケットを送信するのではなく、SDNのコントロールプレーン構成情報（ファイアウォールルール、ルーティングテーブル、ネットワークタグなど）を静的に解析し、送信元IPから宛先IPへのパケット到達性をシミュレーションする。結果として、「どのファイアウォールルールでパケットがドロップされたか」や「ルーティングテーブルにネクストホップが存在しない」といった根本原因を瞬時に特定できる。
- **Firewall Insights（ファイアウォールインサイト）：** 長期間運用された環境には、全く使用されていない不要なルールや、不必要に広すぎるIP範囲（0.0.0.0/0など）を許可する過剰なルールが蓄積しがちである。インサイトは機械学習を用いてこれらのシャドーイングされたルールや未使用ルールを自動検知し、セキュリティ境界の引き締め（ハードニング）を提案する。

### **VPC Flow Logs の活用と最適化**

VPC Flow Logs（VPCフローログ）は、VMインスタンスのネットワークインターフェースで送受信されるIPトラフィックのメタデータを記録する、業界標準の可視化ツールである。パケットのペイロードそのものは保存せず、送信元IP、宛先IP、ポート番号、プロトコル、パケット数、バイト数、そしてファイアウォールによるアクション（ACCEPTまたはREJECT）といった5タプル情報を中心にキャプチャする。

試験対策として、フローログの3つの主要なユースケースを理解しておく必要がある。

1. **セキュリティとフォレンジック：** フローログをサードパーティのSIEMソリューションと統合し、REJECTされたパケットの急増（DDoS攻撃やポートスキャンの兆候）や、外部の不審なIPアドレス（クリプトマイニングやマルウェアのC2サーバーなど）への通信をリアルタイムに検知する。
2. **トラブルシューティング：** 過度に制限の厳しいファイアウォールルールによって正当なアプリケーション通信がREJECTされていないかを特定する。
3. **コストとパフォーマンスの最適化：** ログには「地理的詳細（Geographic details）」が含まれるため、VPC内のどのリソースがリージョン間転送（課金対象）を大量に発生させているか、あるいは遠隔地のユーザーへのレイテンシがどれくらいかを分析し、アーキテクチャの変更によってクラウドのランニングコストを削減するためのデータ駆動型のインサイトを提供する。

ベストプラクティスとして、すべてのVPCサブネットで一律にフローログを有効化すると、ログの保存コスト（Cloud Loggingのストレージ費用）が膨大になる可能性がある。そのため、トラブルシューティングが必要な特定のインターフェースや、コンプライアンス要件が厳しいサブネットに限定して有効化し、かつ要件に応じてサンプリングレート（100%ではなく部分的にキャプチャする比率）を適切に調整することが、コストと可視性のバランスを取るための鍵となる。

## **結論**

Google Cloud Certified Professional Cloud Network Engineer 認定試験は、単にプロダクトの仕様を暗記しているかどうかを問うものではない。ビジネス要件、スケーラビリティ、セキュリティ, そしてコストという相反する要素のトレードオフを正確に評価し、最適なアーキテクチャを設計できるかどうかという「現場のエンジニアリング能力」を問う非常に実践的な試験である。

初学者は、カスタムVPCやShared VPCによる強固なネットワーク境界の構築から始め、BGPやBFDを活用した障害に強いハイブリッド接続、PSCによるセキュアな内部通信、Gateway APIによるコンテナ負荷分散、そして階層型ファイアウォールやVPC Service Controlsを組み合わせたゼロトラストの多層防御に至るまで、各コンポーネントがどのように連動して機能するかをステップバイステップで理解することが重要である。本レポートに記載されたすべてのベストプラクティスとアーキテクチャの論理的背景（Why）を深く咀嚼し、実環境のユースケースに当てはめる思考プロセスを習得することが、認定試験の突破、そして世界トップクラスのクラウドインフラストラクチャを構築するための確固たる礎となる。

## **リファレンス**

### **公式ドキュメント（Official documentation）**

## Learn

- [Cloud NAT explained! | Google Cloud Blog](https://cloud.google.com/blog/topics/developers-practitioners/cloud-nat-explained)
- [Best practices and reference architectures for VPC design | Google Cloud Documentation](https://docs.cloud.google.com/architecture/best-practices-vpc-design)
- [Resiliency with Network Connectivity Center | Google Cloud Blog](https://cloud.google.com/blog/products/networking/resiliency-with-network-connectivity-center)
- [Best practices for Cloud Router | Google Cloud Documentation](https://cloud.google.com/network-connectivity/docs/router/concepts/best-practices)
- [Cloud Load Balancing overview | Google Cloud Documentation](https://docs.cloud.google.com/load-balancing/docs/load-balancing-overview)
- [Cloud Load Balancing | Google Cloud](https://cloud.google.com/load-balancing)
- [Google Cloud Global External HTTP(S) Load Balancer - Deep Dive | Google Cloud Blog](https://cloud.google.com/blog/topics/developers-practitioners/google-cloud-global-external-https-load-balancer-deep-dive)
- [External Application Load Balancer performance best practices | Google Cloud Documentation](https://docs.cloud.google.com/load-balancing/docs/https/http-load-balancing-best-practices)
- [Cloud Load Balancing documentation | Google Cloud Documentation](https://docs.cloud.google.com/load-balancing/docs)
- [DNS zones overview | Google Cloud Documentation](https://docs.cloud.google.com/dns/docs/zones/zones-overview)
- [Best practices for Cloud DNS | Google Cloud Documentation](https://docs.cloud.google.com/dns/docs/best-practices)

## Cloud DNS

- [Cloud Network Address Translation | Google Cloud](https://cloud.google.com/nat)
- [Best practices for running Cloud NAT | Google Cloud Blog](https://cloud.google.com/blog/products/networking/6-best-practices-for-running-cloud-nat)
- [Cloud NAT rules | Google Cloud Documentation](https://docs.cloud.google.com/nat/docs/nat-rules-overview)

## Virtual Private Cloud

### Cloud Architecture Center

- [Best practices for GKE networking | Google Cloud Documentation](https://cloud.google.com/kubernetes-engine/docs/best-practices/networking)
- [Cloud Armor Network Security | Google Cloud](https://cloud.google.com/security/products/armor)
- [Cloud Armor best practices | Google Cloud Documentation](https://docs.cloud.google.com/armor/docs/best-practices)
- [VPC Service Controls | Google Cloud](https://cloud.google.com/security/vpc-service-controls)
- [Best practices for enabling VPC Service Controls | Google Cloud Documentation](https://docs.cloud.google.com/vpc-service-controls/docs/enable)
- [Packet Mirroring: Visualize and protect your cloud network | Google Cloud Blog](https://cloud.google.com/blog/products/networking/packet-mirroring-visualize-and-protect-your-cloud-network)
- [Network Intelligence Center | Google Cloud](https://cloud.google.com/network-intelligence-center)
- [Network Intelligence Center | Google Cloud Documentation](https://docs.cloud.google.com/network-intelligence-center/docs)
- [Network Observability | Google Cloud](https://cloud.google.com/solutions/observability)

### **補助資料（Supplementary references）**

- [How to Choose Between Shared VPC and VPC Peering for Multi-Project Networking | OneUptime](https://oneuptime.com/blog/post/2026-02-17-how-to-choose-between-shared-vpc-and-vpc-peering-for-multi-project-networking-on-gcp/view)
- [Deep Dive into Network Connectivity Center in GCP (NCC) | Medium](https://medium.com/google-cloud/deep-dive-into-network-connectivity-center-in-gcp-ncc-f7048df0892b)
- [Google Cloud Armor | Datadog Docs](https://docs.datadoghq.com/integrations/google-cloud-armor/)
- [How to Configure Cloud Armor Security | OneUptime](https://oneuptime.com/blog/post/2026-01-24-configure-cloud-armor-security/view)
- [How to Implement VPC Service Controls to Protect Sensitive Data | OneUptime](https://oneuptime.com/blog/post/2026-02-17-how-to-implement-vpc-service-controls-to-protect-sensitive-data-in-a-gcp-project/view)
- [How to Use GCP Network Intelligence Center to Troubleshoot IPv4 Issues | OneUptime](https://oneuptime.com/blog/post/2026-03-20-gcp-network-intelligence-ipv4-troubleshoot/view)
- [What are VPC Flow Logs? | Kentik](https://www.kentik.com/kentipedia/what-are-vpc-flow-logs/)
- [When and How to Use VPC Flow Logs | YouTube](https://www.youtube.com/watch?v=P8CoXTvnXTc)
- [Optimizing VPC Flow Logs | Observo AI](https://www.observo.ai/post/optimizing-vpc-logs)
- [Monitor flow logs to ensure VPC security with Datadog | Datadog Blog](https://www.datadoghq.com/blog/vpc-security-flowlogs/)
