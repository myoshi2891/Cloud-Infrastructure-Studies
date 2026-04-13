export type SubTopic = {
    id: number;
    topic: string;
    importance: string;
};

export const SUB_TOPICS: SubTopic[] = [
    { id: 1, topic: 'デジタルトランスフォーメーション（DX）の定義と必要性', importance: '★★★' },
    { id: 2, topic: 'クラウドコンピューティングの 5 つの本質的特性', importance: '★★★' },
    { id: 3, topic: 'IaaS / PaaS / SaaS の違いと選択基準', importance: '★★★' },
    { id: 4, topic: 'パブリック / プライベート / ハイブリッド / マルチクラウド', importance: '★★★' },
    { id: 5, topic: 'CapEx と OpEx の違い', importance: '★★★' },
    { id: 6, topic: 'クラウド移行戦略（6R）', importance: '★★★' },
    { id: 7, topic: 'Google Cloud の独自の強み', importance: '★★★' },
    { id: 8, topic: 'Google Cloud のグローバルインフラ（リージョン・ゾーン）', importance: '★★★' },
    { id: 9, topic: 'Google Cloud のリソース階層', importance: '★★☆' },
    { id: 10, topic: 'DX 実現のための主要サービス概要', importance: '★★☆' },
];

export type OnPremiseIssue = {
    issue: string;
    description: string;
    impact: string;
};

export const ON_PREMISE_ISSUES: OnPremiseIssue[] = [
    { issue: 'スピードの遅さ', description: '新サーバー調達に数週間〜数ヶ月かかる', impact: '市場機会を逃す' },
    { issue: '過剰投資リスク', description: '最大負荷を想定した設備投資が必要', impact: '普段は遊休リソースが発生' },
    { issue: 'スケールの限界', description: '急激な需要増に対応できない', impact: 'サービス停止・機会損失' },
    { issue: '高い維持費用', description: 'ハードウェアの保守・更新が必要', impact: '変動しない固定費' },
    { issue: 'イノベーションの遅れ', description: '新技術の導入に時間とコストがかかる', impact: '競合に後れを取る' },
];

export type IaaSPaasSaasFeature = {
    item: string;
    content: string;
};

export const IAAS_FEATURES: IaaSPaasSaasFeature[] = [
    { item: '柔軟性', content: 'OS・ミドルウェア・アプリを自由に選択・設定できる' },
    { item: '制御性', content: 'インフラを細かく制御できる' },
    { item: '移植性', content: 'オンプレの環境をほぼそのままクラウドへ移行できる' },
    { item: 'デメリット', content: 'OS パッチ・セキュリティ設定・スケーリング設定を自分で行う必要がある' },
];

export type CloudService = {
    service: string;
    description: string;
};

export const IAAS_SERVICES: CloudService[] = [
    { service: 'Compute Engine', description: '仮想マシン（VM）。OS を選んでサーバーを起動' },
    { service: 'Cloud Storage', description: 'オブジェクトストレージ。ファイルを保存・配信' },
    { service: 'Virtual Private Cloud（VPC）', description: '仮想ネットワーク環境' },
    { service: 'Persistent Disk', description: 'VM にアタッチできるブロックストレージ' },
];

export const PAAS_FEATURES: IaaSPaasSaasFeature[] = [
    { item: '開発生産性', content: 'インフラを意識せずにコードを書くだけでいい' },
    { item: '自動スケール', content: 'トラフィックに応じて自動でスケール' },
    { item: '運用負荷', content: 'OS パッチ・インフラ設定は Google が担当' },
    { item: 'デメリット', content: '特定の言語・フレームワーク・設定に制約がある場合がある' },
];

export const PAAS_SERVICES: CloudService[] = [
    { service: 'App Engine', description: 'Web アプリを「コードをアップロードするだけ」で実行' },
    { service: 'Cloud Run', description: 'コンテナ化されたアプリをサーバーレスで実行' },
    { service: 'Cloud Functions', description: 'イベントで実行される小さな関数' },
    { service: 'BigQuery', description: 'サーバーレスのデータウェアハウス' },
    { service: 'Cloud SQL', description: 'フルマネージドのリレーショナルデータベース' },
];

export const SAAS_FEATURES: IaaSPaasSaasFeature[] = [
    { item: '導入の速さ', content: 'サインアップすれば即日使い始められる' },
    { item: '管理不要', content: '更新・バックアップ・セキュリティパッチはベンダーが担当' },
    { item: 'アクセス性', content: 'デバイス・場所を問わずアクセス可能' },
    { item: 'デメリット', content: 'カスタマイズの自由度が低い・データがベンダー側にある' },
];

export const SAAS_SERVICES: CloudService[] = [
    { service: 'Google Workspace', description: 'Gmail・Docs・Sheets・Slides・Meet・Drive のスイート' },
    { service: 'Google Maps Platform', description: '地図・ルート検索・場所情報 API' },
    { service: 'Looker', description: 'BI（ビジネスインテリジェンス）プラットフォーム' },
    { service: 'Chronicle', description: 'セキュリティ情報・イベント管理（SIEM）' },
];

export const PUBLIC_CLOUD_FEATURES: IaaSPaasSaasFeature[] = [
    { item: 'コスト', content: '従量課金・初期投資不要' },
    { item: 'スケール', content: '無制限（Google のリソースを活用）' },
    { item: '管理', content: 'インフラ管理は Google が担当' },
    { item: 'セキュリティ', content: 'Google のセキュリティ技術を活用' },
    { item: '懸念点', content: 'データが自社外に存在する（データ主権）' },
];

export const PRIVATE_CLOUD_FEATURES: IaaSPaasSaasFeature[] = [
    { item: 'セキュリティ', content: '完全に自社で制御' },
    { item: 'カスタマイズ', content: '自由度が最高' },
    { item: 'コスト', content: '初期投資が大きい・維持費用も固定' },
    { item: 'スケール', content: '物理サーバーの限界がある' },
    { item: 'スキル', content: 'インフラエンジニアが必要' },
];

export const HYBRID_CLOUD_MERITS: IaaSPaasSaasFeature[] = [
    { item: '段階的な移行', content: 'いきなり全てクラウド移行せず、徐々に移行できる' },
    { item: 'データ主権', content: '規制対象のデータはオンプレに残せる' },
    { item: '柔軟性', content: 'ワークロードごとに最適な環境を選択' },
    { item: '既存投資の活用', content: '既存のオンプレ設備を活かしながらクラウドを追加' },
];

export const HYBRID_CLOUD_SERVICES: CloudService[] = [
    { service: 'Anthos', description: 'オンプレとクラウドを統一管理するプラットフォーム' },
    { service: 'Cloud VPN', description: 'インターネット経由の暗号化接続' },
    { service: 'Cloud Interconnect', description: '専用回線での高速・安定接続' },
    { service: 'Google Distributed Cloud', description: 'Google インフラを自社データセンターに設置' },
];

export type DeploymentComparison = {
    item: string;
    public: string;
    private: string;
    hybrid: string;
    multi: string;
};

export const DEPLOYMENT_COMPARISON: DeploymentComparison[] = [
    { item: '初期コスト', public: '低', private: '高', hybrid: '中〜高', multi: '中' },
    { item: '運用コスト', public: '変動（従量）', private: '固定（高）', hybrid: '中', multi: '変動' },
    { item: 'スケーラビリティ', public: '非常に高', private: '物理的限界あり', hybrid: '中〜高', multi: '高' },
    { item: 'セキュリティ制御', public: 'Google 依存', private: '完全自社', hybrid: '分散', multi: '分散' },
    { item: 'データ主権', public: '低〜中', private: '高', hybrid: '高', multi: '中' },
    { item: '管理の複雑さ', public: '低', private: '高', hybrid: '高', multi: '非常に高' },
];

export const CAPEX_EXAMPLES: CloudService[] = [
    { service: 'サーバー・ストレージの購入', description: '数百万〜数億円の先行投資' },
    { service: 'ネットワーク機器の購入', description: 'ルーター・スイッチ等' },
    { service: 'データセンター設備', description: 'ラック・空調・電源設備' },
    { service: 'ソフトウェアライセンスの永久購入', description: '一括払いのライセンス' },
];

export type CapexOpexComparison = {
    item: string;
    capex: string;
    opex: string;
};

export const CAPEX_OPEX_COMPARISON: CapexOpexComparison[] = [
    { item: '支払い方法', capex: '先払い（一括または分割）', opex: '後払い（月次・従量課金）' },
    { item: '財務上の分類', capex: '資産（バランスシート）', opex: '費用（損益計算書）' },
    { item: '費用計上方法', capex: '減価償却（数年かけて）', opex: '発生した月に全額計上' },
    { item: '初期コスト', capex: '非常に高い', opex: 'ほぼゼロ' },
    { item: 'スケール対応', capex: '困難（事前に大量購入必要）', opex: '容易（必要な分だけ増減）' },
    { item: '技術の陳腐化', capex: '数年で陳腐化・買い替え必要', opex: '常に最新技術を利用可能' },
    { item: 'リスク', capex: '需要予測が外れると過剰・不足', opex: '実需に合わせて調整可能' },
    { item: '財務計画', capex: '立てやすい（固定費）', opex: '変動するが予測ツールあり' },
];

export type MigrationStrategyComparison = {
    strategy: string;
    scale: string;
    speed: string;
    cost: string;
    risk: string;
    cloudUsage: string;
};

export const MIGRATION_STRATEGY_COMPARISON: MigrationStrategyComparison[] = [
    { strategy: 'Rehost', scale: '最小', speed: '最速', cost: '低', risk: '低', cloudUsage: '低' },
    { strategy: 'Replatform', scale: '小〜中', speed: '速い', cost: '低〜中', risk: '低〜中', cloudUsage: '中' },
    { strategy: 'Repurchase', scale: '中', speed: '中', cost: '中', risk: '中', cloudUsage: '高（SaaS）' },
    { strategy: 'Refactor', scale: '最大', speed: '最も遅い', cost: '高', risk: '高', cloudUsage: '最高' },
    { strategy: 'Retire', scale: '—', speed: '即座', cost: 'なし', risk: 'なし', cloudUsage: '—' },
    { strategy: 'Retain', scale: 'なし', speed: '—', cost: 'なし', risk: 'なし', cloudUsage: 'なし' },
];

export const GOOGLE_CLOUD_STRENGTHS: CloudService[] = [
    { service: 'グローバルネットワーク', description: '専用ネットワーク・海底ケーブル・低レイテンシ' },
    { service: 'AI/ML の優位性', description: 'TPU・Vertex AI・Gemini・10年以上の実績' },
    { service: 'セキュリティ', description: 'ゼロトラスト・BeyondCorp・Titan チップ' },
    { service: 'データ分析', description: 'BigQuery・サーバーレス・ペタバイト規模' },
    { service: 'オープン性', description: 'Kubernetes・TensorFlow・ベンダーロックイン回避' },
    { service: 'サステナビリティ', description: 'カーボンニュートラル・再生可能エネルギー' },
    { service: '信頼性', description: '99.999% SLA・大規模サービスの運用実績' },
];

export type DXSolution = {
    issue: string;
    solution: string;
    effect: string;
};

export const DX_SOLUTIONS: DXSolution[] = [
    { issue: '業務効率化', solution: 'Google Workspace + Gemini', effect: 'メール・文書作成を AI が支援' },
    { issue: '顧客サービス向上', solution: 'Dialogflow・Contact Center AI', effect: '24h AI チャットボット対応' },
    { issue: 'データ活用', solution: 'BigQuery + Looker', effect: 'データドリブン意思決定の実現' },
    { issue: 'EC 売上向上', solution: 'Recommendations AI', effect: '個別化されたレコメンデーション' },
    { issue: '製造業の品質改善', solution: 'Vision AI + AutoML', effect: '製品不良の自動検出' },
    { issue: '人材・採用', solution: 'Cloud Talent Solution', effect: '求人検索・採用マッチングの AI 最適化' },
    { issue: 'コスト削減', solution: 'Cloud Run + BigQuery', effect: 'サーバーレスで ITコスト最小化' },
];

export type ConfusionPoint = {
    pattern: string;
    understanding: string;
};

export const CONFUSION_POINTS: ConfusionPoint[] = [
    { pattern: 'DX = デジタル化', understanding: 'DX はビジネス変革が本質。単なるデジタル化（紙→PDF）は DX ではない' },
    { pattern: 'クラウド = 安い', understanding: 'クラウドは必ずしも安くない。設計次第でオンプレより高くなることも' },
    { pattern: 'SaaS = カスタマイズ自由', understanding: 'SaaS はカスタマイズ自由度が低い。柔軟性が必要なら PaaS や IaaS' },
    { pattern: 'ハイブリッド = マルチクラウド', understanding: 'ハイブリッド=オンプレ+クラウド / マルチ=複数クラウドベンダー' },
    { pattern: 'リージョン = ゾーン', understanding: 'リージョン（地域）の中に複数のゾーン（DC）がある' },
    { pattern: '弾力性 = スケールアップのみ', understanding: '弾力性はスケールアップ（増加）もスケールダウン（縮小）も含む' },
    { pattern: 'Rehost = 最良の移行', understanding: 'Rehost は最速だが、クラウドの恩恵は最小。Refactor がベスト' },
    { pattern: 'CapEx = 悪い', understanding: 'CapEx/OpEx はどちらが良い/悪いではない。財務戦略次第' },
];

export type ReferenceLink = {
    category?: string;
    title: string;
    url: string;
    description?: string;
};

export const SECTION1_REFERENCES: ReferenceLink[] = [
    { category: '試験情報', title: 'CDL 試験概要ページ', url: 'https://cloud.google.com/learn/certification/cloud-digital-leader' },
    { category: '試験情報', title: '試験ガイド PDF', url: 'https://services.google.com/fh/files/misc/cdl_exam_guide_english.pdf' },
    { category: '試験情報', title: '公式サンプル問題', url: 'https://docs.google.com/forms/d/e/1FAIpQLSedAmuf4cDCe8b4lHEV2XkgFkGHF2bKXFBFw1i_fzJBrMxHA/viewform' },
    { category: '学習パス', title: 'Cloud Skills Boost CDL パス', url: 'https://www.cloudskillsboost.google/paths/9' },
    { category: '基礎概念', title: 'クラウドコンピューティングとは', url: 'https://cloud.google.com/learn/what-is-cloud-computing' },
    { category: '基礎概念', title: 'IaaS とは', url: 'https://cloud.google.com/learn/what-is-iaas' },
    { category: '基礎概念', title: 'PaaS とは', url: 'https://cloud.google.com/learn/what-is-paas' },
    { category: '基礎概念', title: 'SaaS とは', url: 'https://cloud.google.com/learn/what-is-saas' },
    { category: '基礎概念', title: 'ハイブリッドクラウドとは', url: 'https://cloud.google.com/learn/what-is-hybrid-cloud' },
    { category: '基礎概念', title: 'マルチクラウドとは', url: 'https://cloud.google.com/learn/what-is-multicloud' },
    { category: '移行戦略', title: 'クラウド移行のベストプラクティス', url: 'https://cloud.google.com/solutions/cloud-migration-best-practices' },
    { category: '移行戦略', title: 'Migrate to Virtual Machines', url: 'https://cloud.google.com/migrate' },
    { category: 'インフラ', title: 'Google Cloud のロケーション', url: 'https://cloud.google.com/about/locations' },
    { category: 'インフラ', title: 'リージョンとゾーンの説明', url: 'https://cloud.google.com/compute/docs/regions-zones' },
    { category: '強み', title: 'なぜ Google Cloud か', url: 'https://cloud.google.com/why-google-cloud' },
    { category: '強み', title: 'Google のグローバルネットワーク', url: 'https://cloud.google.com/network-tiers' },
    { category: '強み', title: 'Google のサステナビリティ', url: 'https://cloud.google.com/sustainability' },
    { category: '強み', title: 'Google のセキュリティ概要', url: 'https://cloud.google.com/security/overview' },
    { category: 'リソース管理', title: 'リソース階層の説明', url: 'https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy' },
    { category: 'IAM', title: 'IAM の概要', url: 'https://cloud.google.com/iam/docs/overview' },
    { category: 'コスト管理', title: 'Cloud Billing', url: 'https://cloud.google.com/billing/docs' },
    { category: 'コスト最適化', title: 'コスト最適化のベストプラクティス', url: 'https://cloud.google.com/cost-management/docs/best-practices' },
    { category: 'DX 事例', title: 'Google Cloud の DX 事例', url: 'https://cloud.google.com/transform' },
    { category: 'NIST 定義', title: 'クラウドの標準定義（英語）', url: 'https://csrc.nist.gov/publications/detail/sp/800-145/final' },
    { category: 'Anthos', title: 'ハイブリッドクラウド管理', url: 'https://cloud.google.com/anthos/docs' },
    { category: 'Workspace', title: 'Google Workspace 製品情報', url: 'https://workspace.google.com' },
];

export type OnPremiseVsCloudComparison = {
    item: string;
    onPremise: string;
    cloud: string;
};

export const ON_PREMISE_VS_CLOUD_COMPARISON: OnPremiseVsCloudComparison[] = [
    { item: 'インフラの所在と運用', onPremise: '自社の施設（データセンター）内に物理ハードウェアとソフトウェアを配置し、自社の人員で運用・保守を行う。', cloud: 'プロバイダのデータセンターに配置された仮想化リソースをインターネット経由で利用する。' },
    { item: '拡張のスピードと柔軟性', onPremise: '新しいサーバーの調達、ネットワークの設定、ソフトウェアのインストールに数週間から数ヶ月を要する。', cloud: '数クリックまたはAPI経由で、数秒から数分で世界中にリソースを展開・縮小できる。' },
    { item: 'メンテナンスとパッチ管理', onPremise: '自社のIT部門がハードウェアの故障対応からOSのセキュリティパッチ適用まで全責任を負う。', cloud: '物理ハードウェアの保守はプロバイダが行い、サービスモデルによってはOS以上のパッチ管理も自動化される。' },
    { item: '初期投資と財務モデル', onPremise: '膨大な事前の設備投資（CapEx）が必要であり、ハードウェアの減価償却に数年縛られる。', cloud: '初期投資は不要であり、使用したリソース分のみを支払う運用経費（OpEx）モデルとなる。' },
];

export type CloudModelComparison = {
    model: string;
    definition: string;
    useCase: string;
};

export const CLOUD_MODEL_COMPARISON: CloudModelComparison[] = [
    { model: 'パブリッククラウド', definition: 'サードパーティのクラウドプロバイダ（Google Cloudなど）が、インターネット経由で不特定多数のユーザーに対してコンピューティングリソースを提供するモデル。インフラは共有されるが、データとアクセスは論理的に完全に隔離される。', useCase: '最もコスト効率が高く、導入が迅速であるため、一般的なウェブアプリケーション、ビッグデータ分析、高いスケーラビリティが求められる新規事業に最適である。' },
    { model: 'プライベートクラウド', definition: '単一の組織（企業）専用に構築・運用されるクラウド環境。オンプレミスのデータセンター内に構築される場合と、プロバイダが専用の環境を提供する場合がある。', useCase: '厳格な業界コンプライアンス要件や国家のデータ主権規制に対応する必要がある金融機関、医療機関、政府機関の機密データの保存・処理に適用される。' },
    { model: 'ハイブリッドクラウド', definition: 'オンプレミスのインフラストラクチャ（またはプライベートクラウド）と、パブリッククラウドをネットワークで接続し、シームレスに組み合わせたアーキテクチャモデル。', useCase: 'レガシーシステムからの段階的なクラウド移行や、機密性の高い顧客データベースは自社内に留めつつ、フロントエンドのWebサーバーはパブリッククラウドのスケーラビリティを利用するといった要件に最適である。' },
    { model: 'マルチクラウド', definition: 'Google Cloud、AWS、Microsoft Azure など、複数の異なるパブリッククラウドプロバイダのサービスを組み合わせて使用するモデル。', useCase: '単一のプロバイダに依存すること（ベンダーロックイン）を回避し、特定のサービス（例：AIやデータ分析はGoogle Cloud、基幹システムは他社クラウド）における各社のベスト・オブ・ブリード（最良の製品）を活用する戦略においてベストプラクティスとなる。' },
];

export type ServiceModelComparison = {
    model: string;
    definition: string;
    management: string;
    useCase: string;
};

export const SERVICE_MODEL_COMPARISON: ServiceModelComparison[] = [
    { model: 'IaaS (Infrastructure as a Service)', definition: 'サーバー（Compute Engineなど）、ネットワーク、ストレージといった基盤となるインフラストラクチャリソースを、インターネット経由でオンデマンドで提供するモデル。', management: 'インフラの物理的な管理からは解放されるが、オペレーティングシステム（OS）のインストール、パッチ適用、ミドルウェアの設定など、運用管理の負担は最も大きい。高い技術的専門知識を持ったITスタッフが必要となる反面、既存システムをそのまま移行しやすい柔軟性を持つ。', useCase: 'カスタムOSや特殊なソフトウェア要件がある既存のレガシーシステムを、アーキテクチャを変更せずにクラウドへ移行（リフト＆シフト）するシナリオ。' },
    { model: 'PaaS (Platform as a Service)', definition: 'アプリケーションの開発、実行、管理に必要なプラットフォーム（OS、ミドルウェア、ランタイム環境）一式をプロバイダが提供・管理するモデル。Google App Engine や Cloud Run などが該当する。', management: '開発チームはインフラの構築やOSのパッチ管理といった煩雑な保守作業から完全に解放される。コードの記述とアプリケーションの機能開発にのみ集中できるため、開発のアジリティと生産性が飛躍的に向上する。ただし、利用できる言語やフレームワークに一定の制約がある場合がある。', useCase: '新規のウェブアプリケーションの開発、マイクロサービスアーキテクチャの導入、開発スピードを最優先し、市場への投入（Time-to-Market）を早めたいシナリオ。' },
    { model: 'SaaS (Software as a Service)', definition: 'プロバイダがホスト、管理、および保守する完全なソフトウェアアプリケーションを、インターネット経由でエンドユーザーに直接提供するモデル。Google Workspace（Gmail、Google ドライブ、Google Docsなど）が代表例。', management: '組織側でのインフラ管理、ソフトウェアのインストール、アップデート作業は一切不要である。管理負荷とTCOが最も低いモデルであるが、ソフトウェア自体の機能カスタマイズの自由度は最も低い。', useCase: '電子メール、ドキュメント作成、社内コラボレーションツール、CRM（顧客関係管理）など、業界標準の業務プロセスをそのまま利用でき、すぐに利用を開始したいシナリオ。' },
];

export const GCDL_REFERENCES: ReferenceLink[] = [
    { title: 'Cloud Digital Leader - Certification exam guide', url: 'https://cloud.google.com/learn/certification/guides/cloud-digital-leader' },
    { title: '15分で合格する Cloud Digital Leader', url: 'https://qiita.com/kyo2bay/items/33a74d36b7abf841a2e2' },
    { title: 'クラウド費用の最適化: 成功し続けるための諸原則', url: 'https://cloud.google.com/blog/ja/products/gcp/cost-managementprinciples-of-cloud-cost-optimization' },
    { title: 'Google Cloud Digital Leader Training Professional Certificate', url: 'https://www.coursera.org/professional-certificates/google-cloud-digital-leader-training' },
    { title: 'クラウド コンピューティングに関する運命共有モデル', url: 'https://cloud.google.com/security/shared-fate?hl=ja' },
    { title: 'Startup Whitepaper', url: 'https://cloud.google.com/resources/startup-guide?hl=ja' },
    { title: 'Google CloudのCAFをまとめてみた', url: 'https://zenn.dev/yellowman/articles/fe79e2e58449eb' },
    { title: 'Google Cloud Digital Leader Learning Path', url: 'https://medium.com/@aserdargun/google-cloud-digital-leader-learning-path-0b45fb756a04' },
    { title: 'グローバル ロケーション - リージョンとゾーン', url: 'https://cloud.google.com/about/locations?hl=ja' },
    { title: '「リージョン」「ゾーン」とは何？', url: 'https://cloud-ace.jp/column/detail208/' },
    { title: '地域とリージョン', url: 'https://docs.cloud.google.com/docs/geography-and-regions?hl=ja' },
    { title: 'Shared responsibility in Assured Workloads', url: 'https://docs.cloud.google.com/assured-workloads/docs/shared-responsibility' },
    { title: 'Simplifying the shared responsibility model', url: 'https://www.datadoghq.com/blog/shared-responsibility-model/' },
    { title: 'Shared responsibilities and shared fate on Google Cloud', url: 'https://docs.cloud.google.com/architecture/framework/security/shared-responsibility-shared-fate' },
    { title: '9つのGoogle Cloudセキュリティベストプラクティス', url: 'https://www.sentinelone.com/ja/cybersecurity-101/cloud-security/google-cloud-security-best-practices/' },
    { title: '24の Google Cloud Platform（GCP）セキュリティベストプラクティス', url: 'https://www.sysdig.com/jp/learn-cloud-native/24-google-cloud-platform-gcp-security-best-practices' },
    { title: 'Google Cloud ランディング ゾーンのリソース階層を決定する', url: 'https://docs.cloud.google.com/architecture/landing-zones/decide-resource-hierarchy?hl=ja' },
    { title: 'リソース階層を使用したアクセス制御', url: 'https://docs.cloud.google.com/iam/docs/resource-hierarchy-access-control?hl=ja' },
    { title: 'Google Cloud Digital Leader Exam Guide (2026)', url: 'https://cloudfluently.com/blog/google-cloud-digital-leader-exam-guide-2026' },
];

export const HERO_BADGES = [
    { label: '出題比率 約17%', color: 'blue' as const },
    { label: '最重要セクション', color: 'red' as const },
    { label: 'ビジネス視点の理解', color: 'green' as const },
];

export const NAV_LINKS = [
    { id: 's0', num: '00', label: 'ガイド' },
    { id: 's1', num: '01', label: '出題範囲' },
    { id: 's2', num: '02', label: 'DX本質' },
    { id: 's3', num: '03', label: '基礎概念' },
    { id: 's4', num: '04', label: 'モデル' },
    { id: 's5', num: '05', label: 'デプロイ' },
    { id: 's6', num: '06', label: '財務' },
    { id: 's7', num: '07', label: '移行戦略' },
    { id: 's8', num: '08', label: '強み' },
    { id: 's9', num: '09', label: 'インフラ' },
    { id: 's10', num: '10', label: '階層' },
    { id: 's11', num: '11', label: 'DXソリュ' },
    { id: 's12', num: '12', label: 'まとめ' },
    { id: 's13', num: '13', label: 'レポート' },
    { id: 's14', num: '14', label: 'リソース' },
];
