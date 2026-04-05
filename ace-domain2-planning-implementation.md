# **Google Cloud Associate Cloud Engineer: Domain 2 クラウドソリューションの計画と実装 完全網羅レポート**

## **クラウドアーキテクチャ設計の基盤と試験ドメインの重要性**

Google Cloud Associate Cloud Engineer (ACE) 認定試験は、クラウドエンジニアが実稼働環境を構築、展開、運用するための実践的なスキルを評価するものである。公式の認定試験ガイド (https://cloud.google.com/learn/certification/cloud-engineer?hl=en) によると、試験は5つの主要なドメインに分かれており、その中でも「Domain 2: クラウドソリューションの計画と実装 (Planning and implementing a cloud solution)」は、インフラストラクチャの骨格を決定する極めて重要な領域である 。このドメインは試験全体の約17.5%から30%の比重を占めると推測されており、単なるリソースの作成手順だけでなく、コスト、パフォーマンス、セキュリティ、そしてスケーラビリティのバランスを高度に考慮したアーキテクチャの選定能力が厳しく問われる 。

Google Cloudの設計哲学の根底には「複雑性の排除とマネージドサービスの最大活用」がある。これは、レガシーなオンプレミス環境の思考から脱却し、インフラストラクチャをコードとして管理（IaC）し、最小特権の原則を適用しながら、クラウドネイティブなサービスを組み合わせるアプローチである 。本レポートでは、この設計哲学に基づき、コンピュート、ストレージ、ネットワーク、そしてコスト管理というDomain 2の各サブトピックについて、初学者が実務レベルの深い洞察を得られるよう、根本的なメカニズムとベストプラクティスをステップバイステップで詳細に解説する。

## **2.1 Google Cloud プロダクトの利用計画とコスト最適化**

クラウドインフラストラクチャの計画において、技術的な要件定義と全く同等の重要性を持つのがコストの予測と継続的な最適化である。パブリッククラウドの従量課金モデルは柔軟性を提供する一方で、不適切な設計は意図しない高額請求（いわゆる「クラウド破産」）を招く危険性を孕んでいる。したがって、正確なコスト見積もりツールの活用と、各アーキテクチャにおけるコスト制御のメカニズムを深く理解することが求められる。

### **Pricing Calculator を活用した見積もり戦略の確立**

Google Cloud Pricing Calculator (https://cloud.google.com/products/calculator) は、構成するリソースの予想利用量に基づいて月額料金をシミュレーションするための公式ツールである 。アーキテクチャの計画段階において、この計算機を効果的に活用するためのベストプラクティスにはいくつかの重要なステップが存在する。

第一に、対象となるリージョンの早期選定である。Google Cloudのクラウドリソースの価格は、電力コストやインフラ維持費の違いによりリージョンごとに大きく異なる。計算機のインターフェース上でリージョンを切り替えることで、正確なコストの差分（デルタ）を把握し、レイテンシ要件とコストのバランスが最適となるロケーションを決定することが不可欠である 。

第二に、確約利用割引 (Committed Use Discounts: CUD) の適用検証である。Compute Engineの仮想マシンやCloud SQLのインスタンスなど、長期間にわたって安定したリソース稼働が見込まれる場合、1年または3年の契約ベースの確約を行うことで、オンデマンド価格と比較して最大20%から70%の大幅なコスト削減が可能となる 。この割引モデルのシミュレーションは、経営層やステークホルダーへの予算提案において極めて説得力のある材料となる。

第三に、サーバーレスアーキテクチャにおける財務バッファの意図的な確保である。Cloud RunやCloud Run functionsのようなサーバーレスツール、あるいはトラフィックに応じて変動するマネージドインスタンスグループ (MIG) のオートスケーリングは、その性質上、事前に正確な呼び出し回数や平均実行時間を予測することが非常に困難である。業界のベストプラクティスとして、計算機で算出された最終的な見積もりに対して、予期せぬトラフィックスパイクに備えた「10%から20%の財務バッファ」を追加し、継続的に四半期ごとの再評価を実施することが強く推奨される 。

### **BigQuery における高度なコスト制御メカニズム**

エンタープライズデータウェアハウスであるBigQueryは、処理したデータ量に応じて課金される「オンデマンド料金」と、スロットと呼ばれるコンピュートリソースのキャパシティに基づく「容量課金（Capacity-based pricing）」の2つの全く異なる価格モデルを提供する 。公式ドキュメント (https://docs.cloud.google.com/bigquery/docs/best-practices-costs) に示されるように、オンデマンドモデルを利用する場合、不適切なクエリは瞬時に膨大なコストを発生させる可能性があるため、厳密なガードレールを設ける必要がある 。

運用上のベストプラクティスとして、開発者がクエリを実行する前には必ずプレビュー機能を利用し、スキャンされる推定データ量とコストを事前に確認するプロセスを標準化すべきである 。また、データの探索やスキーマの確認目的で実際にクエリを実行する（例えば `SELECT *` を実行する）ことは厳禁であり、テーブルプレビュー機能などを代替として使用する。技術的な制御手段としては、プロジェクトレベルまたはユーザーレベルで1日あたりの処理データ量に上限を設ける「カスタム割り当て (Quotas)」の構成が必須である 。さらに、クエリ単位で設定可能な「最大請求バイト数 (Maximum bytes billed)」オプションを活用することで、設定した上限を超えるデータスキャンを伴うクエリを未然に失敗させ、高額請求を確実に防止することが可能となる 。なお、初学者が陥りやすい罠として、非クラスタ化テーブルにおいて `LIMIT` 句を使用しても、BigQueryの列指向ストレージの特性上、スキャンされるデータ量（課金対象となるバイト数）は一切減少しないという点には深く留意する必要がある 。

## **2.2 コンピュートリソースの計画と構成**

Google Cloudのコンピュートサービスポートフォリオは多岐にわたり、ワークロードの特性、管理のオーバーヘッド、ステート（状態）の有無、そしてスケーラビリティの要件に応じて適切なサービスを選択する意思決定能力が問われる 。

| サービス名 | アーキテクチャ特性 | 最適なユースケース | 管理オーバーヘッド | 課金モデル | スケーリング |
| :--- | :--- | :--- | :--- | :--- |
| **Compute Engine (GCE)** | 仮想マシン (VM)、IaaS | レガシーシステムの移行、特定OSやライセンス要件のあるソフトウェア、GPUを要する高度な演算処理 | 高 (OSのパッチ適用、ネットワークの自己管理が必要) | 秒単位 (継続利用割引、確約利用割引の適用可) | 手動、またはMIGによる自動スケーリング |
| **Google Kubernetes Engine (GKE)** | マネージドKubernetes、コンテナオーケストレーション | マイクロサービスアーキテクチャ、マルチクラウド/ハイブリッド環境、複雑なコンテナ間通信 | 中 (Autopilotモードの場合は低) | ノード単位、またはPodのリソース要件単位 (Autopilot) | 極めて柔軟 (HPA, VPA, Cluster Autoscaler) |
| **Cloud Run** | サーバーレスコンテナ、Knativeベース | ステートレスなWebアプリケーション、APIバックエンド、非同期タスク処理 | 低 (インフラストラクチャの管理不要) | リクエスト数、CPU、メモリのミリ秒単位 | 高速なオートスケール、ゼロへのスケールイン対応 |
| **Cloud Run functions** | サーバーレス関数、FaaS (Function as a Service) | イベント駆動型の単一タスク (Cloud Storageへのファイル配置トリガー、Pub/Subメッセージの処理) | 最小 (コードをデプロイするのみ) | 実行回数、計算時間 | 高速なオートスケール、ゼロへのスケールイン対応 |
| **App Engine** | フルマネージドPaaS (Platform as a Service) | 標準的な言語フレームワークで構築された従来のWebアプリケーション、トラフィック分割を多用する環境 | 低 (ランタイムやミドルウェアをGoogleが管理) | 時間単位、またはリソース単位 | 自動スケーリング |

### **Compute Engine の展開戦略とロケーション選定**

Compute Engineは、基礎となるインフラストラクチャリソースである。展開にあたっては、リージョンの選択がシステム全体のレイテンシ、コスト、およびサステナビリティに直接的な影響を与える。公式のベストプラクティスガイド (https://docs.cloud.google.com/solutions/best-practices-compute-engine-region-selection) に従い、以下の要素を総合的に評価してリージョンを決定する 。

第一に、ユーザーベースとレイテンシの要件である。リアルタイム性が求められるアプリケーションではユーザーの物理的近傍のリージョンを選択するが、非同期処理やバッチ処理であれば、コスト効率の高いリージョンを選択することが推奨される。また、レイテンシはネットワークティアによっても左右される。「プレミアムティア」はGoogleの高品質なグローバルプライベートバックボーンを利用し、ユーザーの最も近くにあるPoint of Presence (PoP) でトラフィックを受け入れるため、パフォーマンスが飛躍的に向上する 。

第二に、カーボンフリーエネルギー (CFE%) の指標である。Google Cloudは各リージョンのエネルギー消費におけるカーボンフリーの割合を公開している。環境負荷の低減を重視する近代的なエンタープライズアーキテクチャにおいては、`europe-north1` (フィンランド、98%) や `us-central1` (アイオワ、87%) などの「低炭素 (Low CO2)」指定を受けたリージョンを意図的に選択し、バッチジョブなどをそこに集約させることがベストプラクティスとされている 。

第三に、可用性とスケーラビリティを担保するためのマネージドインスタンスグループ (MIG) の活用である。MIGは、事前に定義したインスタンステンプレートに基づき、必要に応じて仮想マシンを自動的に増減（オートスケーリング）し、ヘルスチェックに失敗した異常なインスタンスを自動的に破棄・再作成（自動修復）する高度な機能を提供する 。可用性を最大化するためには、単一のゾーンではなく複数のゾーンにまたがってインスタンスを配置する「リージョン MIG」の採用が推奨される 。

### **Google Kubernetes Engine (GKE) の高度なネットワークとセキュリティ設計**

コンテナ化されたワークロードを本番環境で稼働させるためのデファクトスタンダードであるGKEは、ACE試験においても極めて出題頻度の高い領域である 。特に、クラスターのネットワークアーキテクチャの選択は、その後のスケーラビリティに不可逆的な影響を与えるため、深い理解が必要である。

GKEのネットワークモデルには、歴史的経緯から「ルートベース (Routes-based)」と「VPCネイティブ (VPC-native)」の2種類が存在するが、現在のベストプラクティスであり、新規構築時のデフォルト設定となっているのは圧倒的に「VPCネイティブクラスター」である  (https://docs.cloud.google.com/kubernetes-engine/docs/how-to/routes-based-cluster)。ルートベースクラスターは、PodのIPルーティングをGoogle Cloud VPCの静的ルート機能に依存しているため、クラスター内のノード数が増加するとVPC全体のルート割り当て上限（クォータ）に達してしまい、スケーラビリティの深刻なボトルネックとなる 。

一方、VPCネイティブクラスターは「エイリアスIP (Alias IPs)」というメカニズムを使用し、VPCサブネットのセカンダリIPアドレス範囲からPodに対して直接IPアドレスを割り当てる。これにより、VPCのルーティングテーブルを一切消費せずに無限に近いスケーラビリティを実現できる 。さらに、VPCネイティブの採用は、コンテナネイティブ負荷分散を実現するネットワークエンドポイントグループ (NEG) や、PodからGoogle APIへのプライベートアクセス機能とシームレスに統合するための必須条件となる 。一度作成したルートベースクラスターをVPCネイティブに移行することはアーキテクチャ上不可能であるため、計画段階での正しい選択が極めて重要である 。

セキュリティの観点において、GKE上で稼働するアプリケーションからCloud StorageやBigQueryなどのGoogle Cloud APIに安全にアクセスするメカニズムとして「Workload Identity」の構成がベストプラクティスとなる 。過去のアンチパターンでは、IAMサービスアカウントのJSONキーを生成し、それをKubernetesのSecretとしてマウントしてアプリケーションに渡す手法が存在したが、これはキーの漏洩やローテーション管理の煩雑さという重大なセキュリティリスクを伴う 。Workload Identity (https://docs.cloud.google.com/kubernetes-engine/docs/how-to/workload-identity) を有効化すると、Kubernetes側のServiceAccountとGoogle Cloud側のIAMサービスアカウントをアノテーションによって論理的に紐付けることができる。これにより、GKE上のコンテナは物理的なキーを一切持つことなく、安全にIAM権限を借用 (Impersonate) してAPIを呼び出すことが可能となる 。

### **サーバーレスアーキテクチャ: Cloud Run、Cloud Run functions、App Engine の境界**

サーバーレスコンピューティングの採用は、インフラストラクチャの運用オーバーヘッドを極限まで削減し、開発者がコードの記述に専念できる環境を提供する 。しかし、それぞれのサービスの特性を理解し、適切な用途に割り当てることが求められる。

Cloud Runは、任意の言語やシステムバイナリを含むDockerコンテナをサーバーレス環境で実行できる強力なプラットフォームである 。HTTPリクエストを受け付けるステートレスなWebアプリケーションやAPIバックエンドの構築に最適であり、トラフィックがゼロになればインスタンス数もゼロになり、課金も完全に停止する「スケールトゥゼロ」の特性を持つ 。パフォーマンス最適化のベストプラクティスとしては、コールドスタート（インスタンスがゼロから起動する際の遅延）を最小限に抑えるため、「最小インスタンス数 (min instances)」をあらかじめ設定しておくことや、起動時のCPU割り当てを一時的に増加させる「Startup CPU boost」機能を利用することが推奨される 。また、データベースの接続プールなどのグローバル変数は、リクエスト処理のスコープ外で遅延初期化（Lazy initialization）を行うことで、後続の呼び出しで状態を再利用し、パフォーマンスを飛躍的に向上させることができる 。ネットワーク設計においては、VPC内のプライベートリソース（Cloud SQLなど）へ高速にアクセスするため、「Direct VPC egress」機能を使用することがスループット向上の観点から推奨される 。

Cloud Run functions (旧 Cloud Functions) は、より粒度の細かいイベント駆動型の処理に特化している。Cloud Storageバケットへの新しいファイルのアップロード、Pub/Subトピックへのメッセージの到着、あるいはHTTPトリガーなどを契機として、単一のタスクを自動的に実行する軽量な自動化や糊（グルー）コードの実装に最適である  (https://www.netcomlearning.com/blog/google-cloud-functions)。一方で、App Engineは、アプリケーションのバージョン管理やトラフィック分割（カナリアリリース）などの高度なプラットフォーム機能が組み込まれたPaaSであり、コンテナのビルドプロセス自体を意識したくない、より伝統的なWebアプリケーションの開発に適している 。

## **2.3 データストレージオプションの計画と意思決定ツリー**

データストレージの選定においては、データの構造（構造化、半構造化、非構造化）、アクセス頻度、一貫性の要件（強い一貫性か結果整合性か）、必要なスループットとレイテンシ、そしてコスト要件に基づく正確な「意思決定ツリー」の理解が求められる 。

### **非構造化データを支えるオブジェクトストレージ (Cloud Storage)**

画像、動画、バックアップファイル、データレイクの基礎データなど、あらゆる非構造化データを保存するための標準的な選択肢がCloud Storageである 。アーキテクチャ計画上の最大の焦点は、データのアクセス頻度に応じた最適な「ストレージクラス」の選択と、それを自動化する「オブジェクトライフサイクル管理」の構成である 。

| **ストレージクラス** | **目的と最適なユースケース** | **最小保存期間要件** |
| --- | --- | --- |
| **Standard** | 頻繁にアクセスされるホットデータ、ストリーミングメディア、Webコンテンツの配信 | 0日 (即時削除可能) |
| **Nearline** | 月に1回程度のアクセス頻度。最近のデータバックアップ、ロングテールのマルチメディアコンテンツ | 30日 |
| **Coldline** | 四半期に1回程度のアクセス頻度。ディザスタリカバリ (DR) 用の保管データ | 90日 |
| **Archive** | 1年に1回未満のアクセス頻度。法規制コンプライアンス要件による長期のデータアーカイブ | 365日 |

試験対策上の実践的なインサイトとして、例えば「システムログを監査目的で数年間保存する必要があるが、アクセスはインシデント発生時のみであり、コストを極限まで最小化したい」というシナリオが与えられた場合、正答は常に「Archiveクラスへの移行をライフサイクルポリシーで自動化する構成」となる  (https://docs.cloud.google.com/architecture/storage-advisor)。また、最小保存期間要件を満たさずに早期削除やクラス変更を行った場合、ペナルティとして早期削除料金が課金されるメカニズムも理解しておく必要がある 。

### **コンピュートを支えるブロックストレージとファイルストレージ**

仮想マシンに直接アタッチされるストレージには、いくつかの特性の異なるオプションが存在する。
一般的なワークロードには「Persistent Disk (PD)」が用いられ、ゾーンレベルの障害からデータを保護するために同期レプリケーションを行う「リージョナル PD」という可用性の高い選択肢もある 。より高度な要件に対しては、「Hyperdisk」が推奨される。これは次世代のブロックストレージであり、ストレージ容量とは完全に独立してスループットやIOPSを動的にプロビジョニングできるため、コストに敏感なデータ分析ワークロードや高I/Oを要求されるデータベースに最適である 。一方で「Local SSD」は、インスタンスの物理サーバーに直接接続された一時的なストレージであり、極めて低いレイテンシと高いIOPSを提供するが、仮想マシンの停止とともにデータが完全に消去される（エフェメラルである）ため、キャッシュや一時的なスクラッチデータの保存領域としてのみ使用すべきである 。共有ファイルアクセス（NFS等）が必要な場合は、フルマネージドのファイルストレージである「Filestore」を採用する 。

### **リレーショナルデータベースとNoSQLデータベースの最適解**

構造化されたトランザクションデータや大規模な分析データを格納するためのデータベース選定は、アーキテクチャの成否を分ける。幅広いオプション (https://cloud.google.com/blog/topics/developers-practitioners/your-google-cloud-database-options-explained) から最適なものを選択する 。

1. **Cloud SQL**: MySQL、PostgreSQL、SQL Serverを提供する汎用的なフルマネージドリレーショナルデータベースである。一般的なWebアプリケーションやCMSのバックエンドとして、最大数十TBまでの容量に対応し、自動バックアップやフェイルオーバーを提供する 。
2. **Cloud Spanner**: ペタバイト級にスケールアウトし、グローバル規模で強い整合性（Strong Consistency）を提供する、Google独自のリレーショナルデータベースである 。金融取引システム、グローバルサプライチェーン、オンライン対戦ゲームのインベントリ管理など、極めて高い可用性（最大99.999%）と無制限に近いスケーラビリティが同時に求められるユースケースにおいて不可欠な選択肢となる。
3. **AlloyDB for PostgreSQL**: 近年注目を集める、Googleのインフラストラクチャ上に完全に最適化されたエンタープライズ向けのPostgreSQL互換データベースである。アーキテクチャ設計における最大の特長は「コンピュート層とストレージ層の完全な分離 (Disaggregation)」である  (https://cloud.google.com/blog/products/databases/alloydb-for-postgresql-intelligent-scalable-storage)。従来のデータベースが自ら行っていたログ処理などの重いI/Oタスクを、インテリジェントな分散ストレージ層 (Log Processing Service: LPS) に完全にオフロードする。これにより、WAL（Write-Ahead Logging）レコードのみをストレージに送信するだけでデータが保証され、いわゆる「Torn Pages（不完全なページ書き込み）」問題を根本から解決しつつ、ネットワーク効率を最大化する 。インフラ計画においては、プライマリインスタンスのパフォーマンス低下を気にすることなく、リアルタイムな分析クエリ用のリードレプリカを極めて低遅延かつ高速にスケールアウトさせたい場合に最適なソリューションとなる。
4. **Firestore**: ドキュメント指向のNoSQLデータベースであり、柔軟なJSONライクなスキーマを持つ 。モバイルアプリケーションやサーバーレスなWebバックエンドにおいて、リアルタイムなデータ同期機能やオフライン機能が必要なユースケースで圧倒的な強みを発揮する 。
5. **Cloud Bigtable**: ワイドカラム型のNoSQLデータベースであり、ミリ秒未満の一貫した低レイテンシで、ペタバイト規模のデータの読み書きを処理できる 。IoTセンサーデータの時系列ストリーミング、アドテク、金融市場のリアルタイムデータ分析など、極めて高いスループットが要求されるシナリオに特化している。

## **2.4 ネットワークリソースの強固な計画と構成**

Google Cloudのネットワークアーキテクチャの根幹を成すのが、グローバルリソースである Virtual Private Cloud (VPC) である 。ACE試験では、複雑化するエンタープライズの要件に対し、安全性と管理の簡素化を両立するセキュアなトポロジー設計が問われる。

### **VPC 設計のベストプラクティスと分離戦略**

VPCネットワークを作成する際、システムはデフォルトで「自動モード (Auto mode)」のVPCを提供する。これは世界中のすべてのリージョンにサブネットを自動生成するため、初期のテストには便利であるが、本番環境のアーキテクチャとしては重大なアンチパターンである。将来的なVPN接続や他のVPCとのピアリング時にIPアドレス範囲の重複（オーバーラップ）を引き起こすリスクが高いため、ベストプラクティスは常に、サブネットのIP範囲と展開リージョンをアーキテクトが完全に制御できる「カスタムモード (Custom mode)」のVPCを使用することである  (https://docs.cloud.google.com/vpc/docs/vpc)。

エンタープライズ環境において複数の開発チームやプロジェクトが存在する場合、ネットワークの管理手法として「Shared VPC (共有 VPC)」の採用が推奨される 。このモデルでは、ネットワーク専任のセキュリティチームが単一の「ホストプロジェクト」内でVPCとサブネット、ファイアウォールルールを一元的に作成・管理する。そして、各開発チームの「サービスプロジェクト」をこのホストプロジェクトにアタッチし、必要なネットワークリソースを共有する。これにより、職務の分離（Separation of Duties）が実現し、開発者はインフラのルーティングを気にすることなくアプリケーションの展開に専念できる 。アクセス権限の付与にあたっては、組織全体への広範なアクセスを避けるため、最小特権の原則に従って「サブネット単位」で `networkUser` ロールをサービスプロジェクトのメンバーに付与することがセキュリティ上のベストプラクティスである 。

### **サービス間通信の革新: VPC Peering と Private Service Connect**

異なるVPC間、あるいは異なる組織間で通信を行う手段の選択は、アーキテクチャの将来的な拡張性に直結する。従来のアプローチである「VPC Network Peering」は、2つの独立したVPCネットワークをGoogleの内部ソフトウェア定義ネットワーク (SDN) を通じて直接結びつけるものである 。これにより、内部IPアドレスを使用した安全な通信が可能となるが、アーキテクチャ上の致命的な制約として「推移的ルーティング (Transitive Routing) をサポートしない」という特性がある 。つまり、VPC AとVPC Bがピアリングし、VPC BとVPC Cがピアリングしていても、VPC AとCは直接通信することができない。また、ピアリングするすべてのネットワーク間でIPアドレス範囲が絶対に重複してはならないという厳格なIP設計が要求される。

これに対する現代のベストプラクティスが「Private Service Connect (PSC)」である  (https://cloud.google.com/private-service-connect)。PSCはネットワーク全体を相互接続するのではなく、サービス指向の接続モデルを提供する。特定のサービスプロデューサー（別のVPCで稼働する自社サービスや、AlloyDB、あるいはサードパーティのSaaS）に対して、コンシューマー側のVPC内にローカルの内部IPアドレス（PSCエンドポイント）を作成し、トラフィックをそこにルーティングする 。このアプローチの最大の利点は、コンシューマーとプロデューサーのネットワーク間でIPアドレスが重複していても一切問題にならず、複雑なBGPルートの共有やピアリング管理のオーバーヘッドから完全に解放される点である 。ACE試験において、組織境界を越えたサービスのプライベートな公開・消費や、ネットワーク設計をシンプルに保つ方法について問われた場合、PSCが最も優れたソリューションとなる。

### **ファイアウォール、ロードバランシング、ハイブリッド接続**

ネットワークセキュリティの要となるVPCファイアウォールルールの運用においては、IPアドレス範囲に基づく静的な制御よりも、リソースの動的な変化に追従できる「サービスアカウント」や「ネットワークタグ」をターゲットとしたルールベースの制御がベストプラクティスである 。これにより、新しいインスタンスが追加されても、適切なサービスアカウントが割り当てられていれば自動的にセキュリティポリシーが適用される。また、外部IPアドレスを持たないプライベートなVMインスタンスが、OSのパッチダウンロード等のために安全にインターネットへ送信 (Egress) トラフィックを送る手段として、「Cloud NAT」を構成することが不可欠である 。

トラフィックの分散とレイテンシの最適化には、Cloud Load Balancingの適切な選択が求められる。グローバルなユーザーベースを持つHTTP(S)ウェブサイトには「グローバル外部アプリケーションロードバランサ」を配置する。これにより、GoogleのエッジネットワークでSSLセッションが終端され、Cloud CDNによる強力なキャッシュ配信と組み合わせることで、バックエンドリソースへの負荷を劇的に低減できる 。

オンプレミス環境とGoogle Cloudを接続するハイブリッドアーキテクチャにおいては、要件に応じた選択が必要である。インターネットを経由してIPsec暗号化通信を行う「Cloud VPN」を本番環境で導入する場合は、99.99%のSLAを保証する「HA VPN」の構成が必須となる 。HA VPNはBGPによる動的ルーティングのみをサポートし、Cloud Routerと連携してシームレスな経路交換を実現する 。一方、インターネットを経由せず、専用の物理回線で数Gbps以上の広帯域かつ低遅延な接続が要求されるミッションクリティカルな環境では、「Cloud Interconnect」を選択する。

## **アクセス制御、セキュリティ、そしてインフラストラクチャの自動化 (IaC)**

クラウドインフラの計画と実装を支える横断的な基盤が、Identity and Access Management (IAM) とインフラストラクチャ・アズ・コード (IaC) である。

IAMにおいては、常に「最小特権の原則 (Principle of Least Privilege)」を遵守する。ユーザーやサービスに対しては、広範な権限を持つ基本ロール（Owner, Editor, Viewer）の使用を厳格に避け、必要な権限のみが束ねられた「事前定義ロール (Predefined roles)」、または必要に応じて「カスタムロール」を付与することが絶対的なルールである 。また、個別のユーザーアカウントに直接権限を付与するのではなく、Googleグループを作成してそこにロールを割り当て、メンバーシップを通じてアクセスを管理するアプローチが推奨される 。アプリケーションの実行においては、個人認証情報ではなく必ず「サービスアカウント」を使用し、可能な限りキーをダウンロードせずに環境にアタッチして利用する 。

これらの複雑な設定を手動のコンソール操作で行うことは、ヒューマンエラーや設定のドリフト（乖離）を引き起こすため、エンタープライズ環境では推奨されない。代わりに、TerraformやGoogle Cloud Deployment Managerなどのツールを用いた「インフラストラクチャ・アズ・コード (IaC)」の実践が求められる  (https://docs.cloud.google.com/docs/terraform/iac-overview)。ネットワーク構成、VMの展開、ファイアウォールルールの設定など、あらゆるインフラストラクチャを宣言的なコードとしてバージョン管理し、CI/CDパイプラインを通じてデプロイすることで、テスト可能で再現性があり、かつ監査が容易な「Single source of truth（単一の信頼できる情報源）」を確立することが、現代のトップクラスのクラウドエンジニアが到達すべき最終的なベストプラクティスである 。

例えば、これらすべての知識を総合し、典型的な3層アーキテクチャ（Webフロントエンド、アプリケーション層、データベースバックエンド）をTerraformで計画・実装するシナリオを想定する 。フロントエンドにはグローバルロードバランサとCloud Armor（WAF）を配置してDDoS攻撃から防御する。アプリケーション層にはカスタムVPC上で稼働するサーバーレスのCloud Run、あるいはVPCネイティブのGKEクラスターを採用し、トラフィックに応じたオートスケーリングを実現する。そしてバックエンドのデータベース層には、プライベートIPのみを付与して外部アクセスを遮断したAlloyDBを配置し、アプリケーション層からはWorkload IdentityやPrivate Service Connectを介してのみ、最小特権で安全に接続を確立する。

このような、スケーラビリティ、強固なセキュリティ、そして最適化されたコスト構造を兼ね備えた全体最適のアーキテクチャを立案し、それをコードとして実装する能力こそが、Google Cloud Associate Cloud Engineer試験が真に評価しようとしている中核的なエンジニアリングスキルなのである。各プロダクトの深層メカニズムとそれらを繋ぐ設計原則を正確に理解し、プロジェクトの初期計画段階において最適なトレードオフと技術選定を行うことが、成功への唯一の道筋である。

[**cloud.google.com**Associate Cloud Engineer Certification | Learn - Google Cloud](https://cloud.google.com/learn/certification/cloud-engineer)
[**cloud.google.com**Associate Cloud Engineer Certification | Learn | Google Cloud](https://cloud.google.com/learn/certification/cloud-engineer?hl=en#exam-guide)
[**oneuptime.com**How to Prepare for the Google Cloud Associate Cloud Engineer Exam Core Services](https://oneuptime.com/blog/post/2026-02-17-how-to-prepare-for-the-google-cloud-associate-cloud-engineer-exam-core-services-study-guide/view)
[**cloudfluently.com**Google Associate Cloud Engineer Exam Guide ... - CloudFluently](https://cloudfluently.com/blog/google-associate-cloud-engineer-exam-guide-2026)
[**reddit.com**Help me pls.. GCP Associate Cloud Engineer : r/googlecloud - Reddit](https://www.reddit.com/r/googlecloud/comments/1qzj5kc/help_me_pls_gcp_associate_cloud_engineer/)
[**cloud.google.com**Google Cloud Pricing Calculator](https://cloud.google.com/products/calculator)
[**datacamp.com**GCP Pricing Calculator: A Complete Guide - DataCamp](https://www.datacamp.com/tutorial/gcp-pricing-calculator)
[**docs.cloud.google.com**Estimate and control costs | BigQuery - Google Cloud Documentation](https://docs.cloud.google.com/bigquery/docs/best-practices-costs)
[**certsafari.com**Free Practice Questions for Google Associate Cloud Engineer Certification - CertSafari](https://www.certsafari.com/google/cloud-engineer-associate)
[**docs.cloud.google.com**Best practices for Compute Engine regions selection | Solutions ...](https://docs.cloud.google.com/solutions/best-practices-compute-engine-region-selection)
[**docs.cloud.google.com**Choose a Compute Engine deployment strategy for your workload](https://docs.cloud.google.com/compute/docs/choose-compute-deployment-option)
[**reddit.com**Just passed Associate Cloud Engineer: Resources, Study Tips, and Exam Topics inside : r/googlecloud - Reddit](https://www.reddit.com/r/googlecloud/comments/1qmn1km/just_passed_associate_cloud_engineer_resources/)
[**reddit.com**I just passed the GCP Associate Cloud Engineer exam! : r/googlecloud - Reddit](https://www.reddit.com/r/googlecloud/comments/1j4hvxg/i_just_passed_the_gcp_associate_cloud_engineer/)
[**docs.cloud.google.com**Creating a routes-based cluster | GKE networking - Google Cloud Documentation](https://docs.cloud.google.com/kubernetes-engine/docs/how-to/routes-based-cluster)
[**oneuptime.com**How to Choose Between VPC-Native and Routes-Based GKE Clusters - OneUptime](https://oneuptime.com/blog/post/2026-02-17-how-to-choose-between-vpc-native-and-routes-based-gke-clusters/view)
[**notes.kodekloud.com**VPC native and Route based cluster - KodeKloud](https://notes.kodekloud.com/docs/GKE-Google-Kubernetes-Engine/Networking-for-GKE-clusters/VPC-native-and-Route-based-cluster/page)
[**medium.com**Production grade GKE network deployment, in 3 easy steps. | by Pavan kumar Bijjala](https://medium.com/@pbijjala/3-key-best-practices-for-gke-deployment-4fa132e157e2)
[**docs.cloud.google.com**Best practices for GKE networking - Google Cloud Documentation](https://docs.cloud.google.com/kubernetes-engine/docs/best-practices/networking)
[**oneuptime.com**Master IAM Concepts for the Google Cloud Associate Cloud Engineer Certification](https://oneuptime.com/blog/post/2026-02-17-how-to-master-iam-concepts-for-the-google-cloud-associate-cloud-engineer-certification/view)
[**docs.cloud.google.com**Authenticate to Google Cloud APIs from GKE workloads](https://docs.cloud.google.com/kubernetes-engine/docs/how-to/workload-identity)
[**examtopics.com**Exam Associate Cloud Engineer topic 1 question 301 discussion - ExamTopics](https://www.examtopics.com/discussions/google/view/303709-exam-associate-cloud-engineer-topic-1-question-301/)
[**cloud.google.com**Cloud run vs cloud functions for serverless | Google Cloud Blog](https://cloud.google.com/blog/products/serverless/cloud-run-vs-cloud-functions-for-serverless)
[**northflank.com**App Engine vs. Cloud Run: A real-world engineering comparison | Blog - Northflank](https://northflank.com/blog/app-engine-vs-cloud-run)
[**medium.com**Google App Engine in 2025: Serverless Simplicity vs Cloud Run and GKE - Medium](https://medium.com/google-cloud/google-app-engine-in-2025-serverless-simplicity-vs-cloud-run-and-gke-d46f485cf908)
[**docs.cloud.google.com**General development tips | Cloud Run - Google Cloud Documentation](https://docs.cloud.google.com/run/docs/tips/general)
[**docs.cloud.google.com**Functions best practices | Cloud Run - Google Cloud Documentation](https://docs.cloud.google.com/run/docs/tips/functions-best-practices)
[**docs.cloud.google.com**Best practices for Cloud Run networking - Google Cloud Documentation](https://docs.cloud.google.com/run/docs/configuring/networking-best-practices)
[**netcomlearning.com**Google Cloud Functions in 2026: What It Is, Cloud Run vs Functions, Use Cases & Pricing](https://www.netcomlearning.com/blog/google-cloud-functions)
[**oneuptime.com**How to Choose Between Cloud Run Cloud Functions App Engine and GKE - OneUptime](https://oneuptime.com/blog/post/2026-02-17-how-to-choose-between-cloud-run-cloud-functions-app-engine-and-gke-for-your-workload/view)
[**cloud.google.com**Decision tree for data analytics workloads on Google Cloud](https://cloud.google.com/blog/products/data-analytics/decision-tree-for-data-analytics-workloads-on-google-cloud)
[**youtube.com**The Ultimate Guide to Google Cloud Storage Services and Databases in 2025 - YouTube](https://www.youtube.com/watch?v=WdF5fnLR_VY)
[**docs.cloud.google.com**Design an optimal storage strategy for your cloud workload | Cloud Architecture Center](https://docs.cloud.google.com/architecture/storage-advisor)
[**veeam.com**Google Cloud Pricing: Models, Calculations, & Tips - Veeam](https://www.veeam.com/blog/google-cloud-pricing-guide.html)
[**netapp.com**Google Cloud Pricing: The Complete Guide | NetApp](https://www.netapp.com/blog/gcp-cvo-blg-google-cloud-pricing-the-complete-guide/)
[**cloud.google.com**Pick the right storage option on Google Cloud](https://cloud.google.com/blog/products/storage-data-transfer/pick-the-right-storage-option-on-google-cloud)
[**cloud.google.com**Your Google Cloud database options, explained](https://cloud.google.com/blog/topics/developers-practitioners/your-google-cloud-database-options-explained)
[**cloud.google.com**AlloyDB for PostgreSQL intelligent scalable storage | Google Cloud ...](https://cloud.google.com/blog/products/databases/alloydb-for-postgresql-intelligent-scalable-storage)
[**cloud.google.com**Virtual Private Cloud (VPC) - Google Cloud](https://cloud.google.com/vpc)
[**docs.cloud.google.com**Best practices and reference architectures for VPC design | Cloud ...](https://docs.cloud.google.com/architecture/best-practices-vpc-design)
[**youtube.com**VPC Networks: GCP Virtual Networking Tutorial for Beginners - YouTube](https://www.youtube.com/watch?v=ekpznz8hIzU)
[**docs.cloud.google.com**VPC networks | Virtual Private Cloud - Google Cloud Documentation](https://docs.cloud.google.com/vpc/docs/vpc)
[**cloud.google.com**Private Service Connect Features and Benefits | Google Cloud](https://cloud.google.com/private-service-connect)
[**medium.com**Private connectivity for AlloyDB: VPC Peering vs Private Service Connect | by Natalie Godec | Google Cloud - Medium](https://medium.com/google-cloud/private-connectivity-for-alloydb-vpc-peering-vs-private-service-connect-3ddf24c64ab6)
[**dev.to**GCP Cloud Engineer Guide: Google Cloud Associate Cloud Engineer Exam Guide](https://dev.to/thesius_code_7a136ae718b7/gcp-cloud-engineer-guide-google-cloud-associate-cloud-engineer-exam-guide-38d3)
[**cloud.google.com**What is Infrastructure as Code (IaC)? - Google Cloud](https://cloud.google.com/discover/what-is-infrastructure-as-code)
[**docs.cloud.google.com**Infrastructure as Code on Google Cloud](https://docs.cloud.google.com/docs/terraform/iac-overview)
[**youtube.com**Infrastructure as code - YouTube](https://www.youtube.com/watch?v=84Ql00Bjh1Y)
[**developers.google.com**Build a modern three-tier architecture web application with Cloud Run](https://developers.google.com/learn/pathways/solution-three-tier-cloud-run)
[**docs.cloud.google.com**Jump Start Solution: Three-tier web app | Cloud Architecture Center](https://docs.cloud.google.com/architecture/application-development/three-tier-web-app)
[**youtube.com**How to build a three-tier serverless Cloud Run app - YouTube](https://www.youtube.com/watch?v=4URpj0h3mv8)
