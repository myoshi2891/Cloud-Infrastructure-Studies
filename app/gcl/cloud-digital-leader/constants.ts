export type ExamSpecItem = {
    item: string;
    content: string;
};

export const EXAM_SPEC: ExamSpecItem[] = [
    { item: '試験時間', content: '90分' },
    { item: '問題数', content: '50–60問' },
    { item: '合格点', content: '約 70%' },
    { item: '受験料', content: '$99' },
    { item: '有効期間', content: '3年間' },
    { item: '前提知識', content: '不要（推奨: 6ヶ月以上のクラウド経験）' },
];

export type ExamDomain = {
    section: string;
    theme: string;
    weight: string;
};

export const EXAM_DOMAINS: ExamDomain[] = [
    { section: 'Domain 1', theme: 'Google Cloud でビジネスを変革する', weight: '~17%' },
    { section: 'Domain 2', theme: 'Google Cloud によるデータ活用の探求', weight: '~16%' },
    { section: 'Domain 3', theme: 'Google Cloud AI によるイノベーション', weight: '~16%' },
    { section: 'Domain 4', theme: 'インフラとアプリのモダナイゼーション', weight: '~17%' },
    { section: 'Domain 5', theme: 'Trust and Security with Google Cloud', weight: '~17%' },
    { section: 'Domain 6', theme: 'Scaling with Google Cloud Operations', weight: '~17%' },
];

export type NistCharacteristic = {
    trait: string;
    desc: string;
    meaning: string;
};

export const NIST_CHARACTERISTICS: NistCharacteristic[] = [
    { trait: 'オンデマンド・セルフサービス', desc: '人手を介さずにリソースを即時調達', meaning: 'IT部門の承認待ち時間ゼロ' },
    { trait: '幅広いネットワークアクセス', desc: '任意のデバイスからアクセス可能', meaning: '場所・端末を選ばない働き方' },
    { trait: 'リソースの共有（マルチテナント）', desc: '複数ユーザーで物理リソースを共有', meaning: 'コスト効率の向上' },
    { trait: '迅速な弾力性（エラスティシティ）', desc: '需要に応じて自動でスケール', meaning: '急なトラフィック増にも対応' },
    { trait: '計測されたサービス', desc: '使用量に応じた従量課金', meaning: '使った分だけ払う経済合理性' },
];

export type AiPrinciple = {
    principle: string;
    description: string;
};

export const AI_PRINCIPLES: AiPrinciple[] = [
    { principle: '社会に有益である', description: '社会や経済へのプラスの影響を考慮する' },
    { principle: '不当なバイアスの発生を避ける', description: '人種、性別、信条などに関する不当な偏りを排除する' },
    { principle: '安全性に関する十分なテストを行う', description: '予期せぬ危害を防ぐためのセーフガードを設ける' },
    { principle: '人々に対する説明責任を果たす', description: 'フィードバックや苦情のための適切な機会を提供する' },
    { principle: 'プライバシー設計の原則を取り入れる', description: 'データの収集、使用、通知に関する透明性を確保する' },
    { principle: '科学的卓越性の高い水準を維持する', description: '厳格な科学的手法とオープンな探究を奨励する' },
    { principle: 'これらの原則に沿った利用に限定する', description: '有害な用途や権利を侵害する目的での利用を避ける' },
];

export type AiNotPursueItem = {
    target: string;
    description: string;
};

export const AI_NOT_PURSUE: AiNotPursueItem[] = [
    { target: '重大な損害をもたらす可能性のある技術', description: '身体的、精神的、社会的な深刻な被害' },
    { target: '兵器としての AI', description: '直接的に殺傷を目的とする兵器への組み込み' },
    { target: '監視目的の AI', description: '国際的な規範に反する個人の監視や人権侵害' },
    { target: '国際法に違反する技術', description: '人権、プライバシー、表現の自由を侵害する利用' },
];

export type ComputeService = {
    service: string;
    keyword: string;
    usage: string;
};

export const COMPUTE_SERVICES: ComputeService[] = [
    { service: 'Compute Engine', keyword: 'VM・IaaS・OS 制御・GPU が必要', usage: 'レガシー移行・特定 OS 要件' },
    { service: 'GKE', keyword: 'コンテナ・Kubernetes・ステートフル', usage: 'マイクロサービス・長時間処理' },
    { service: 'Cloud Run', keyword: 'コンテナ・サーバーレス・HTTP・0 スケール', usage: 'ステートレス API・スパイクトラフィック' },
    { service: 'Cloud Run Functions', keyword: 'FaaS・イベント駆動・軽量処理', usage: 'Webhook・トリガー・小さな関数' },
    { service: 'App Engine', keyword: 'PaaS・Web アプリ・コードだけ', usage: 'レガシー Web アプリの移行' },
];

export type ConfusingPair = {
    pair: string;
    truth: string;
};

export const CONFUSING_PAIRS: ConfusingPair[] = [
    { pair: 'Cloud Run = コンテナ専用 vs Cloud Run Functions = コード専用', truth: 'Cloud Run はコンテナ。Functions は関数（コード）。どちらもサーバーレス' },
    { pair: 'Cloud SQL vs BigQuery', truth: 'Cloud SQL: OLTP（トランザクション処理）。BigQuery: OLAP（分析）' },
    { pair: 'Dataflow vs Dataproc', truth: 'Dataflow: Apache Beam（ストリーミング + バッチ）。Dataproc: Hadoop/Spark（バッチ）' },
    { pair: 'Committed Use vs Sustained Use', truth: 'Committed Use は事前申込が必要。Sustained Use は自動適用' },
    { pair: '匿名化 vs 仮名化', truth: '匿名化は再識別不可（GDPR 対象外）。仮名化は再識別可能（GDPR 対象）' },
    { pair: 'Looker vs Looker Studio', truth: 'Looker: エンタープライズ BI（有料）。Looker Studio: セルフサービス BI（無料）' },
];

export type Resource = {
    name: string;
    url: string;
};

export const RESOURCES: Resource[] = [
    { name: '試験概要ページ', url: 'cloud.google.com/learn/certification/cloud-digital-leader' },
    { name: '公式試験ガイド', url: 'cloud.google.com/learn/certification/guides/cloud-digital-leader' },
    { name: 'Cloud Skills Boost 学習パス', url: 'cloudskillsboost.google/paths/9' },
    { name: '公式サンプル問題', url: 'cloud.google.com/learn/certification/cloud-digital-leader' },
    { name: '試験登録', url: 'cp.certmetrics.com/google/en/login' },
    { name: 'Google Cloud ドキュメント', url: 'cloud.google.com/docs' },
    { name: 'IAM ドキュメント', url: 'cloud.google.com/iam/docs' },
    { name: 'BigQuery ドキュメント', url: 'cloud.google.com/bigquery/docs' },
    { name: 'Vertex AI ドキュメント', url: 'cloud.google.com/vertex-ai/docs' },
    { name: 'セキュリティ概要', url: 'cloud.google.com/security/overview' },
    { name: 'Google AI 原則', url: 'ai.google/responsibility/principles/' },
    { name: 'クラウドコンピューティングとは', url: 'cloud.google.com/learn/what-is-cloud-computing' },
    { name: 'Gemini for Workspace', url: 'workspace.google.com/intl/en/products/gemini/' },
    { name: 'Cloud Storage クラス', url: 'cloud.google.com/storage/docs/storage-classes' },
    { name: 'コスト最適化', url: 'cloud.google.com/architecture/framework/cost-optimization' },
];

// ── S2: データ ──────────────────────────────────────────────────────

export type StorageClass = {
    name: string;
    frequency: string;
    minRetention: string;
    useCase: string;
};

export const STORAGE_CLASSES: StorageClass[] = [
    { name: 'Standard', frequency: '頻繁', minRetention: 'なし', useCase: 'Webコンテンツ・アクティブデータ' },
    { name: 'Nearline', frequency: '月1回程度', minRetention: '30日', useCase: 'バックアップ・月次レポート' },
    { name: 'Coldline', frequency: '四半期1回程度', minRetention: '90日', useCase: 'アーカイブ・DR用バックアップ' },
    { name: 'Archive', frequency: '年1回未満', minRetention: '365日', useCase: '長期保管・規制対応アーカイブ' },
];

export type DbService = {
    service: string;
    type: string;
    feature: string;
    useCase: string;
};

export const DB_SERVICES: DbService[] = [
    { service: 'Cloud SQL', type: 'マネージドRDBMS', feature: 'MySQL・PostgreSQL・SQL Server対応。垂直スケール', useCase: '既存RDBのクラウド移行、Webアプリ' },
    { service: 'Cloud Spanner', type: 'グローバル分散RDBMS', feature: '99.999% SLA。世界規模の強一貫性', useCase: '金融・在庫管理・グローバルEC' },
    { service: 'Firestore', type: 'NoSQLドキュメント', feature: 'サーバーレス・リアルタイム同期', useCase: 'モバイル/Webアプリのバックエンド' },
    { service: 'Bigtable', type: 'NoSQLワイドカラム', feature: '超高スループット・超低遅延', useCase: '時系列・IoT・広告データ' },
    { service: 'BigQuery', type: 'データウェアハウス', feature: 'サーバーレスSQL分析。数TBを数秒で処理', useCase: 'BI・データ分析・機械学習' },
    { service: 'Memorystore', type: 'インメモリDB', feature: 'マネージドRedis/Memcached', useCase: 'セッション管理・キャッシュ' },
    { service: 'AlloyDB', type: 'PostgreSQL互換', feature: 'Cloud SQLより高速な分析性能（HTAP）', useCase: '高性能トランザクション+分析' },
];

// ── S4: セキュリティ ──────────────────────────────────────────────────────

export type IamRole = {
    roleType: string;
    desc: string;
    recommendation: string;
};

export const IAM_ROLES: IamRole[] = [
    { roleType: '基本ロール', desc: 'Owner / Editor / Viewer。プロジェクト全体に適用', recommendation: '❌ 本番環境では非推奨' },
    { roleType: '事前定義ロール', desc: '特定サービスに最適化されたロール', recommendation: '✅ 推奨' },
    { roleType: 'カスタムロール', desc: '必要な権限のみを組み合わせた自作ロール', recommendation: '✅ 最小権限の原則を徹底' },
];

export type ComplianceCert = {
    cert: string;
    industry: string;
    desc: string;
};

export const COMPLIANCE_CERTS: ComplianceCert[] = [
    { cert: 'ISO 27001', industry: '全業種', desc: '情報セキュリティ管理の国際規格' },
    { cert: 'SOC 2 / SOC 3', industry: '全業種', desc: 'システムの信頼性・セキュリティの監査報告' },
    { cert: 'PCI DSS', industry: '金融・EC', desc: 'クレジットカード情報の取り扱い基準' },
    { cert: 'HIPAA', industry: '医療（米国）', desc: '医療情報の保護に関する規制' },
    { cert: 'GDPR', industry: 'EU圏', desc: '欧州個人データ保護規則' },
    { cert: 'FedRAMP', industry: '米国政府', desc: '連邦政府クラウドサービスの安全基準' },
];

export type CostModelItem = {
    concept: string;
    desc: string;
};

export const COST_MODEL: CostModelItem[] = [
    { concept: '従量課金', desc: '使用した分だけ支払う（秒単位課金が多い）' },
    { concept: 'Sustained Use Discount', desc: '月間で一定時間以上使うと自動で最大 30% 割引' },
    { concept: 'Committed Use Discount', desc: '1年/3年コミットで最大 57% 割引（Compute Engine）' },
    { concept: 'Spot/Preemptible VM', desc: '通常比最大 91% 安価（中断の可能性あり）' },
    { concept: 'ネットワーク下り転送', desc: '同じリージョン内は無料、リージョン間・外部は有料' },
];

export type SupportTier = {
    tier: string;
    cost: string;
    sla: string;
    features: string;
};

export const SUPPORT_TIERS: SupportTier[] = [
    {
        tier: 'Standard Support',
        cost: '$29 またはクラウド支出の 3% のいずれか高い方',
        sla: 'P2 (High Impact) の課題に対し 4 時間以内',
        features: '試験的なプロジェクトや開発・テスト環境向け',
    },
    {
        tier: 'Enhanced Support',
        cost: '$100 またはクラウド支出の階層的割合 (10% / 7% / 5% / 3%)',
        sla: 'P1 (Critical Impact) の課題に対し 1 時間以内',
        features: '高速な対応が求められる本番環境向け。Active Assist API 利用含む',
    },
    {
        tier: 'Premium Support',
        cost: '$15,000 またはクラウド支出の階層的割合 (10% / 7% / 5% / 3%)',
        sla: 'P1 (Critical Impact) の課題に対し 15 分以内',
        features: 'ミッションクリティカルなエンタープライズ向け。専任 TAM が配置',
    },
];

// ── S3: インフラ ──────────────────────────────────────────────────────

export type MigrationStrategy = {
    strategy: string;
    alias: string;
    desc: string;
    cost: string;
    duration: string;
};

export const MIGRATION_6R: MigrationStrategy[] = [
    { strategy: 'Rehost', alias: 'リフト&シフト', desc: 'そのままクラウドへ移動', cost: '低', duration: '短' },
    { strategy: 'Replatform', alias: 'リフト&調整&シフト', desc: '最小限の変更でクラウド最適化', cost: '中', duration: '中' },
    { strategy: 'Repurchase', alias: 'ドロップ&ショッピング', desc: 'SaaS製品への乗り換え', cost: '中', duration: '中' },
    { strategy: 'Refactor', alias: 'リアーキテクチャ', desc: 'クラウドネイティブへ再設計', cost: '高', duration: '長' },
    { strategy: 'Retire', alias: '廃止', desc: '不要なシステムを廃止', cost: 'なし', duration: '短' },
    { strategy: 'Retain', alias: '保持', desc: '当面オンプレに残す', cost: 'なし', duration: '—' },
];

export type MachineType = {
    series: string;
    use: string;
    feature: string;
};

export const MACHINE_TYPES: MachineType[] = [
    { series: 'E2', use: '汎用・コスト重視', feature: '最も安価。開発・テスト環境に最適' },
    { series: 'N2/N4', use: '汎用・バランス', feature: '幅広いワークロードに対応' },
    { series: 'C3', use: 'コンピューティング最適化', feature: '高CPU性能。科学計算・ゲームサーバー' },
    { series: 'M3', use: 'メモリ最適化', feature: '大容量メモリ。SAP HANA・インメモリDB' },
    { series: 'A2/A3', use: 'GPU最適化', feature: 'AI/ML学習・HPC・グラフィックス処理' },
];

export type GkeMode = {
    mode: string;
    nodeManagement: string;
    billing: string;
    recommended: string;
};

export const GKE_MODES: GkeMode[] = [
    { mode: 'Autopilot', nodeManagement: 'Google が完全管理', billing: 'Pod単位課金', recommended: '運用負荷を最小化したい場合' },
    { mode: 'Standard', nodeManagement: 'ユーザーが管理', billing: 'ノードVM課金', recommended: '細かいノード制御が必要な場合' },
];

export type NetworkService = {
    service: string;
    desc: string;
    bandwidth: string;
    use: string;
};

export const NETWORK_SERVICES: NetworkService[] = [
    { service: 'Dedicated Interconnect', desc: '専用回線でGCPと直接接続', bandwidth: '10/100Gbps', use: '大量データ転送・ミッションクリティカル' },
    { service: 'Partner Interconnect', desc: 'パートナー経由の専用接続', bandwidth: '50Mbps〜50Gbps', use: 'Dedicated Interconnectに満たない要件' },
    { service: 'Cloud VPN', desc: 'インターネット経由IPsecトンネル', bandwidth: '最大3Gbps/トンネル', use: '低コストのオンプレ接続' },
];

// ── S1: DX基礎 ──────────────────────────────────────────────────────

export type DeploymentModel = {
    model: string;
    desc: string;
    useCase: string;
};

export const DEPLOYMENT_MODELS: DeploymentModel[] = [
    { model: 'パブリッククラウド', desc: 'GCP・AWS・Azure が提供する共有インフラ', useCase: 'コスト最適化・スケーラビリティ重視' },
    { model: 'プライベートクラウド', desc: '企業専用のクラウド環境（オンプレ）', useCase: '高いセキュリティ・コンプライアンス要件' },
    { model: 'ハイブリッドクラウド', desc: 'パブリック + プライベートを組み合わせ', useCase: '段階的移行・データ主権の確保' },
    { model: 'マルチクラウド', desc: '複数のクラウドプロバイダーを利用', useCase: 'ベンダーロックイン回避・最適サービス選択' },
];

export type CapexOpexItem = {
    concept: string;
    desc: string;
    relation: string;
};

export const CAPEX_OPEX: CapexOpexItem[] = [
    { concept: 'CapEx（資本支出）', desc: '設備・サーバー等への先行投資。資産として計上', relation: 'オンプレミス運用の特徴' },
    { concept: 'OpEx（運用費用）', desc: '月次・年次の運用コスト。費用として計上', relation: 'クラウドの特徴（使った分だけ払う）' },
];

export type GcpStrength = {
    strength: string;
    desc: string;
};

export const GCP_STRENGTHS: GcpStrength[] = [
    { strength: 'ネットワーク', desc: '世界最大級のプライベートグローバルネットワーク（海底ケーブル含む）' },
    { strength: 'セキュリティ', desc: 'Google 自社の知見をフル活用。ゼロトラストアーキテクチャ' },
    { strength: 'AI/ML', desc: '10年以上の AI 実用化実績。TPU という独自の AI チップ' },
    { strength: 'データ分析', desc: 'BigQuery を中心とした世界最高水準のデータ基盤' },
    { strength: 'オープン性', desc: 'Kubernetes・TensorFlow などの OSS を主導。ベンダーロックイン回避' },
    { strength: 'サステナビリティ', desc: '2007年からカーボンニュートラル達成。再生可能エネルギー100%目標' },
];

export type ServiceModelResponsibility = {
    model: string;
    definition: string;
    useCase: string;
    userResponsibility: string;
};

export const SERVICE_MODEL_RESPONSIBILITY: ServiceModelResponsibility[] = [
    {
        model: 'IaaS',
        definition: '仮想マシン、ストレージ、仮想ネットワークをオンデマンドで提供',
        useCase: '既存レガシーシステムのリホストや高度なカスタマイズが必要なシステム',
        userResponsibility: 'OS、ミドルウェア、アプリケーション、データ',
    },
    {
        model: 'PaaS',
        definition: 'アプリ実行環境（ランタイム・OS・DB管理）をマネージドサービスとして提供',
        useCase: 'インフラ保守を排除し開発チームがアプリ開発に専念できる環境',
        userResponsibility: 'アプリケーション、データ',
    },
    {
        model: 'SaaS',
        definition: 'インターネット経由で完全に機能するソフトウェアを提供',
        useCase: 'インフラ構築なしに業務生産性ツールを即活用（Google Workspace など）',
        userResponsibility: 'データのガバナンス、アクセス権限（IAM）の設定',
    },
];

export type AdoptionFrameworkPillar = {
    pillar: string;
    desc: string;
};

export const ADOPTION_FRAMEWORK: AdoptionFrameworkPillar[] = [
    { pillar: 'Lead（主導）', desc: '経営層からのトップダウンのマンデートとクロスファンクショナルなボトムアップの勢い' },
    { pillar: 'Learn（学習）', desc: 'ITスタッフのスキルアップや外部パートナーからの知識移転による継続学習' },
    { pillar: 'Scale（スケーリング）', desc: 'マネージドサービスとサーバーレスで運用オーバーヘッドを削減しインフラを抽象化' },
    { pillar: 'Secure（保護）', desc: 'アイデンティティを中心とした多層的なセキュリティモデルでリソースアクセスを制御' },
];

// ── S5: AI/ML ────────────────────────────────────────────────────────────

export type PrebuiltApi = {
    api: string;
    category: string;
    desc: string;
};

export const PREBUILT_APIS: PrebuiltApi[] = [
    { api: 'Vision API', category: '画像', desc: 'ラベル検出・OCR・顔検出・物体検出' },
    { api: 'Video Intelligence API', category: '動画', desc: 'シーン変換・オブジェクト追跡・明示的コンテンツ検出' },
    { api: 'Natural Language API', category: 'テキスト', desc: 'エンティティ分析・センチメント分析・構文解析・コンテンツ分類' },
    { api: 'Translation API', category: 'テキスト', desc: '100+ 言語間のテキスト翻訳（Neural Machine Translation）' },
    { api: 'Speech-to-Text', category: '音声', desc: '音声をテキストに変換（125+ 言語対応、句読点自動挿入）' },
    { api: 'Text-to-Speech', category: '音声', desc: 'テキストを自然音声に変換（WaveNet 音声）' },
    { api: 'Document AI', category: '文書', desc: 'PDF/画像から構造化データを抽出（請求書・契約書・身分証明書）' },
];

export type AutomlService = {
    service: string;
    target: string;
    desc: string;
};

export const AUTOML_SERVICES: AutomlService[] = [
    { service: 'AutoML Vision', target: '画像', desc: '画像分類・物体検出モデルをノーコードで学習' },
    { service: 'AutoML Natural Language', target: 'テキスト', desc: 'カスタムテキスト分類・エンティティ抽出モデルを作成' },
    { service: 'AutoML Tables', target: '表形式', desc: '構造化データ（CSV/BigQuery）から分類・回帰モデルを自動構築' },
    { service: 'AutoML Video Intelligence', target: '動画', desc: 'カスタム動画分類・物体追跡モデルをトレーニング' },
];

export type VertexComponent = {
    component: string;
    desc: string;
};

export const VERTEX_COMPONENTS: VertexComponent[] = [
    { component: 'Vertex AI Workbench', desc: 'JupyterLab ベースの統合開発環境（ノートブック）' },
    { component: 'Vertex AI Pipelines', desc: 'ML ワークフローを定義・スケジュール・実行する MLOps パイプライン' },
    { component: 'Training', desc: 'カスタムトレーニングジョブ（分散学習・GPU/TPU 対応）' },
    { component: 'Model Registry', desc: 'モデルのバージョン管理・メタデータ追跡・ガバナンス' },
    { component: 'Model Monitoring', desc: '本番モデルのデータドリフト・予測品質を継続監視' },
    { component: 'Vertex AI Prediction', desc: 'オンライン予測・バッチ予測のエンドポイントを提供' },
    { component: 'Feature Store', desc: '特徴量の保存・再利用・共有を管理するセントラルリポジトリ' },
    { component: 'Vertex AI Search', desc: 'エンタープライズ検索と Grounding を提供するマネージドサービス' },
    { component: 'Vertex AI Agent Builder', desc: 'RAG・Grounding を用いた AI エージェント/チャットボットを構築' },
];

export type GeminiModel = {
    model: string;
    context: string;
    useCase: string;
};

export const GEMINI_MODELS: GeminiModel[] = [
    { model: 'Gemini 2.5 Pro', context: '長コンテキスト（100万トークン超）', useCase: '最高性能・高度な推論・マルチモーダル解析・コーディング支援' },
    { model: 'Gemini 2.5 Flash', context: '長コンテキスト（100万トークン超）', useCase: '性能とコストのバランス・幅広いビジネスタスク・RAG・要約' },
    { model: 'Gemini 2.5 Flash-Lite', context: '長コンテキスト', useCase: '高速・低コスト・大量処理・リアルタイムアプリ向け' },
    { model: 'Gemini 2.0 Flash', context: '長コンテキスト（100万トークン）', useCase: '高速レスポンスが必要なエージェント・チャット・分類タスク' },
];

export type ResponsibleAiPrinciple = {
    principle: string;
    desc: string;
};

export const RESPONSIBLE_AI_PRINCIPLES: ResponsibleAiPrinciple[] = [
    { principle: '公平性', desc: 'バイアスを最小化し、すべてのユーザーに対して公平な結果を提供する' },
    { principle: '説明責任', desc: 'AI の意思決定に対する責任を明確にし、適切な監視体制を整備する' },
    { principle: '透明性', desc: 'AI の動作原理・データ使用方法をステークホルダーに分かりやすく説明する' },
    { principle: 'プライバシー保護', desc: '個人データを適切に保護し、データ最小化の原則を遵守する' },
    { principle: '安全性', desc: '意図しない危害を防ぎ、セーフガードを通じて安全な運用を保証する' },
    { principle: '社会的有益性', desc: '社会全体に利益をもたらし、環境・人権への悪影響を最小化する' },
];

export type PrivacyTechnique = {
    technique: string;
    desc: string;
    example: string;
};

export const PRIVACY_TECHNIQUES: PrivacyTechnique[] = [
    { technique: '匿名化', desc: '個人を特定できないようにデータから識別情報を完全に削除', example: '医療統計でのデモグラフィックデータ集計' },
    { technique: '仮名化', desc: '直接識別子を別の識別子（仮名）に置き換え、元データと分離管理', example: 'GDPR 準拠のデータ処理における患者 ID の仮名化' },
    { technique: '差分プライバシー', desc: '統計的ノイズを付加して個別レコードの特定を防ぎながら集計精度を保持', example: 'Google の Chrome ブラウザの使用状況統計収集' },
];

export type MlApproach = {
    approach: string;
    dataFormat: string;
    tasks: string;
    gcpExample: string;
    businessExample: string;
};

export const ML_APPROACHES: MlApproach[] = [
    {
        approach: '教師あり学習（Supervised Learning）',
        dataFormat: '入力 + 正解ラベル付きデータ',
        tasks: '分類（Classification）・回帰（Regression）',
        gcpExample: 'AutoML・Vision API・AutoML Tables',
        businessExample: 'スパム分類・需要予測・画像認識・疾患診断支援',
    },
    {
        approach: '教師なし学習（Unsupervised Learning）',
        dataFormat: '入力のみ（正解ラベルなし）',
        tasks: 'クラスタリング・次元削減・異常検知',
        gcpExample: 'BigQuery ML のクラスタリング・Vertex AI',
        businessExample: '顧客セグメント・不正検知・レコメンドエンジン',
    },
    {
        approach: '強化学習（Reinforcement Learning）',
        dataFormat: '環境との対話（報酬シグナル）',
        tasks: '最適制御・ゲーム AI・自動化',
        gcpExample: 'Vertex AI・RLHF（Gemini 品質向上に活用）',
        businessExample: '自動運転・広告入札最適化・データセンター電力管理',
    },
];

export type MlFeature = {
    feature: string;
    desc: string;
};

export const BQML_FEATURES: MlFeature[] = [
    {
        feature: 'SQL で ML モデル作成',
        desc: 'CREATE MODEL 文でモデルを定義・学習。ML 専門知識なしで SQL のみで完結',
    },
    {
        feature: '対応モデルタイプ',
        desc: '線形回帰・ロジスティック回帰・k-means クラスタリング・行列因子分解・時系列予測（ARIMA+）・DNN・XGBoost・インポート済み TensorFlow モデル',
    },
    {
        feature: 'MLモデルをSQLで評価',
        desc: 'ML.EVALUATE 関数でモデルの精度・RMSE・AUC 等を評価。ML.PREDICT で新しいデータへの予測を実施',
    },
    {
        feature: 'ビジネス活用例',
        desc: '顧客チャーン予測・需要予測・商品レコメンド・異常検知・サプライチェーン最適化（BigQuery ML の クラスタリング）',
    },
    {
        feature: 'メリット',
        desc: 'データ移動不要（BigQuery 上で完結）・インフラ管理不要・BigQuery の高速・大規模処理を活用・Vertex AI との連携でデプロイも可能',
    },
];

// ── S6: サービス早見表 ───────────────────────────────────────────────────

export type QuickReferenceService = {
    service: string;
    keywords: string;
    usecase: string;
};

export const QR_COMPUTE: QuickReferenceService[] = COMPUTE_SERVICES.map(c => ({
    service: c.service,
    keywords: c.keyword,
    usecase: c.usage,
}));

export const QR_STORAGE_DB: QuickReferenceService[] = [
    { service: 'Cloud Storage', keywords: 'オブジェクト・バイナリ・画像・動画', usecase: '非構造化データの格納・配信' },
    { service: 'Cloud SQL', keywords: 'MySQL・PostgreSQL・RDB', usecase: '既存RDBの移行・Webアプリ' },
    { service: 'Cloud Spanner', keywords: 'グローバル・強一貫性・RDBMS', usecase: '金融・グローバルEC・在庫管理' },
    { service: 'Firestore', keywords: 'NoSQL・ドキュメント・リアルタイム', usecase: 'モバイル/Webアプリ' },
    { service: 'Bigtable', keywords: '時系列・IoT・超大量・低遅延', usecase: 'IoT・広告・監視データ' },
    { service: 'BigQuery', keywords: 'DWH・SQL分析・サーバーレス', usecase: 'BI・データ分析・ML' },
    { service: 'Memorystore', keywords: 'Redis・キャッシュ・セッション', usecase: '低遅延キャッシュ' },
];

export const QR_AIML: QuickReferenceService[] = [
    { service: 'Vision / NL / Translation API', keywords: 'プリビルト・コード少・汎用タスク', usecase: '非ML専門家' },
    { service: 'AutoML', keywords: 'ノーコード・独自データ・カスタムモデル', usecase: 'ビジネスアナリスト' },
    { service: 'Vertex AI', keywords: 'フル機能ML・カスタム・本番向け', usecase: 'MLエンジニア' },
    { service: 'Gemini for Workspace', keywords: 'オフィスAI・Gmail/Docs/Sheets', usecase: '一般オフィスワーカー' },
    { service: 'Vertex AI Agent Builder', keywords: 'エージェント・自律型AI', usecase: 'AI開発者' },
    { service: 'NotebookLM', keywords: '文書Q&A・ハルシネーション低減', usecase: 'ナレッジワーカー' },
];

export const QR_SECURITY: QuickReferenceService[] = [
    { service: 'IAM', keywords: '誰が・何を・できるか', usecase: '認証・認可の基盤' },
    { service: 'Cloud Armor', keywords: 'DDoS・WAF・IPブロック', usecase: 'Webアプリ防御' },
    { service: 'Secret Manager', keywords: 'APIキー・パスワード管理', usecase: 'シークレット保護' },
    { service: 'Cloud KMS', keywords: '暗号化キー管理・CMEK', usecase: 'データ暗号化' },
    { service: 'Security Command Center', keywords: '脅威・脆弱性の一元可視化', usecase: 'セキュリティ監視' },
    { service: 'Sensitive Data Protection', keywords: 'PII検出・マスキング', usecase: 'データプライバシー' },
    { service: 'Cloud IAP', keywords: 'VPNなし・ゼロトラスト', usecase: '社内アプリアクセス制御' },
];

export const QR_OPS: QuickReferenceService[] = [
    { service: 'Cloud Monitoring', keywords: 'メトリクス・アラート・ダッシュボード', usecase: 'システム監視' },
    { service: 'Cloud Logging', keywords: 'ログ収集・監査・分析', usecase: 'ログ管理' },
    { service: 'Cloud Trace', keywords: '分散トレーシング・レイテンシ', usecase: 'パフォーマンス分析' },
    { service: 'Cloud Profiler', keywords: 'CPU/メモリプロファイリング', usecase: 'ボトルネック特定' },
];

// ── S7: 試験攻略チェックリスト ──────────────────────────────────────────────

export type ConceptChecklist = {
    section: string;
    items: string[];
};

export const CHECKLIST_CONCEPTS: ConceptChecklist[] = [
    {
        section: 'Section 1: デジタルトランスフォーメーション',
        items: [
            'IaaS / PaaS / SaaS の違いと具体例',
            'パブリック・プライベート・ハイブリッド・マルチクラウドの違い',
            'CapEx vs OpEx の違いとクラウドとの関係',
            'クラウド移行の6つのR（Rehost・Replatform・Refactor・Repurchase・Retire・Retain）',
        ],
    },
    {
        section: 'Section 2: データとイノベーション',
        items: [
            'BigQuery とはどんなサービスか（DWH・サーバーレス・SQL分析）',
            'Cloud Storage のストレージクラス4種（Standard・Nearline・Coldline・Archive）',
            'DB選択基準（RDB vs NoSQL、グローバル一貫性 vs リージョン）',
            'Looker / Looker Studio の違い（エンタープライズBI vs セルフサービス）',
            'Pub/Sub・Dataflow・Dataproc の役割の違い',
        ],
    },
    {
        section: 'Section 3: インフラとモダナイゼーション',
        items: [
            'コンテナとVMの違い',
            'Compute Engine / GKE / Cloud Run / Cloud Run Functions の使い分け',
            'GKE AutopilotとStandardの違い',
            'Cloud Interconnect vs Cloud VPN の使い分け',
            'Spot/Preemptible VMはいつ使うか',
        ],
    },
    {
        section: 'Section 4: セキュリティとオペレーション',
        items: [
            'IAM の最小権限の原則・グループ管理',
            'リソース階層（組織→フォルダ→プロジェクト→リソース）',
            'Cloud Armor・Cloud KMS・Secret Manager・IAP・SCC の役割',
            '監査ログの種類（Admin Activity・Data Access・System Eventの違い）',
            '費用最適化の手段（Committed Use・Spot VM・右サイズ化）',
        ],
    },
    {
        section: 'Section 5: AI/ML',
        items: [
            'プリビルトAPI vs AutoML vs Vertex AI カスタムモデルの使い分け',
            'Gemini の4バリアント（2.5 Pro / 2.5 Flash / 2.5 Flash-Lite / 2.0 Flash）の特徴',
            'RAG とは何か・なぜハルシネーションを減らせるか',
            '責任あるAIの6原則',
            '匿名化 vs 仮名化の違い（再識別可能かどうか）',
        ],
    },
];

export type ConfusionPoint = {
    mistake: string;
    correct: string;
};

export const CONFUSION_POINTS: ConfusionPoint[] = [
    { mistake: 'Cloud Run = コンテナ専用 vs Cloud Run Functions = コード専用', correct: 'Cloud Run はコンテナ、Functions は関数（コード）。どちらもサーバーレス' },
    { mistake: 'Cloud SQL = BigQuery', correct: 'SQL: OLTP（トランザクション処理）、BigQuery: OLAP（分析）' },
    { mistake: 'Dataflow = Dataproc', correct: 'Dataflow: Apache Beam（ストリーミング+バッチ）、Dataproc: Hadoop/Spark（バッチ）' },
    { mistake: 'IAM ロール = 全員同じでOK', correct: '最小権限の原則！必要最小限のロールのみ付与' },
    { mistake: '匿名化 = 仮名化', correct: '匿名化は再識別不可（GDPR対象外）。仮名化は再識別可能（GDPR対象）' },
    { mistake: 'ハルシネーション = バグ', correct: '構造的な問題。RAG・グラウンディングで軽減' },
    { mistake: 'Committed Use = 自動適用', correct: '事前に申し込みが必要（Sustained Useは自動）' },
];

export const ROADMAP_WEEKS = [
    {
        week: 'Week 1-2: 基礎概念の固め',
        items: [
            'Cloud の基本概念（IaaS/PaaS/SaaS、デプロイモデル）',
            'Google Cloud のコアサービス概要',
            'Cloud Skills Boost の入門コースを修了',
        ],
    },
    {
        week: 'Week 3-4: 主要サービスの理解',
        items: [
            'コンピューティング・ストレージ・ネットワーク',
            'データ分析・データベースサービス',
            'セキュリティの基本（IAM・暗号化）',
        ],
    },
    {
        week: 'Week 5: AI/ML と総まとめ',
        items: [
            'AI APIの種類と使い分け',
            '生成AI（Gemini・RAG・ファインチューニング）',
            '責任あるAI',
        ],
    },
    {
        week: 'Week 6: 試験直前対策',
        items: [
            '公式サンプル問題を繰り返し解く',
            '間違えた問題の公式ドキュメントを読む',
            '頻出サービス早見表を暗記',
        ],
    },
];

export const EXAM_TIPS = [
    '「ビジネスリーダー」の視点で解答する: 技術詳細よりビジネス価値・コスト効率・生産性向上を重視',
    'Google Cloud 固有のサービス名を覚える: 一般用語ではなく Google Cloud 固有の名前で選択肢を判断',
    '「最も適切な」に注意: 複数が正しい場合でも「最もシンプル」「最もコスト効率が良い」を選ぶ',
    'セキュリティ問題は最小権限の原則: 権限を広く与えるより絞る方が正解',
    'マネージドサービス優先: 「自分で管理する」より「マネージドサービスを使う」が Google の推奨',
];

export type ReferenceLink = {
    title: string;
    url: string;
};

export const REFERENCE_LINKS: ReferenceLink[] = RESOURCES.map(r => ({
    title: r.name,
    url: `https://${r.url}`
}));
