export type HeroBadge = {
    label: string;
    color: 'blue' | 'red' | 'green';
};

export const HERO_BADGES: readonly HeroBadge[] = [
    { label: '出題比率 約16%', color: 'blue' },
    { label: '重要セクション', color: 'red' },
    { label: 'データトランスフォーメーション', color: 'green' },
];

export type NavLink = {
    id: string;
    num: string;
    label: string;
};

export const NAV_LINKS: readonly NavLink[] = [
    { id: 's1', num: '01', label: '出題範囲' },
    { id: 's2', num: '02', label: 'データの価値' },
    { id: 's3', num: '03', label: 'データの種類' },
    { id: 's4', num: '04', label: 'ライフサイクル' },
    { id: 's5', num: '05', label: 'ストレージ' },
    { id: 's6', num: '06', label: 'データベース' },
    { id: 's7', num: '07', label: '分析・BI' },
    { id: 's8', num: '08', label: 'データ統合' },
    { id: 's9', num: '09', label: 'アーキテクチャ' },
    { id: 's10', num: '10', label: 'ガバナンス' },
    { id: 's11', num: '11', label: '活用パターン' },
    { id: 's12', num: '12', label: '総まとめ' },
    { id: 's13', num: '13', label: 'リソース' },
];

export type ReferenceLink = {
    category?: string;
    title: string;
    url: string;
    description?: string;
};

export const SECTION2_REFERENCES: ReferenceLink[] = [
    { category: '試験情報', title: 'CDL 試験概要ページ', url: 'https://cloud.google.com/learn/certification/cloud-digital-leader' },
    { category: '試験情報', title: '試験ガイド', url: 'https://cloud.google.com/learn/certification/guides/cloud-digital-leader' },
    { category: '学習パス', title: 'Cloud Digital Leader Certification', url: 'https://www.skills.google/paths/9' },
    { category: 'データクラウド', title: 'What is a data cloud', url: 'https://cloud.google.com/learn/what-is-a-data-cloud' },
    { category: 'データガバナンス', title: 'Dataplex Universal Catalog', url: 'https://cloud.google.com/dataplex' },
    { category: 'セキュリティ', title: 'VPC Service Controls', url: 'https://cloud.google.com/security/vpc-service-controls' },
    { category: 'ストレージ', title: 'Cloud Storage', url: 'https://cloud.google.com/storage' },
    { category: 'ストレージ', title: 'Storage classes', url: 'https://docs.cloud.google.com/storage/docs/storage-classes' },
    { category: 'データベース', title: 'Your Google Cloud database options, explained', url: 'https://cloud.google.com/blog/topics/developers-practitioners/your-google-cloud-database-options-explained' },
    { category: 'データ移行', title: 'Database Migration Service', url: 'https://cloud.google.com/database-migration' },
    { category: 'マルチクラウド分析', title: 'Analyze data across clouds with BigQuery Omni', url: 'https://cloud.google.com/blog/products/data-analytics/analyze-data-across-clouds-with-bigquery-omni' },
    { category: 'ストリーミング', title: 'Pub/Sub for Application & Data Integration', url: 'https://cloud.google.com/pubsub' },
    { category: 'データ処理', title: 'Dataflow overview', url: 'https://docs.cloud.google.com/dataflow/docs/overview' },
    { category: 'BI', title: 'Looker and BigQuery solutions', url: 'https://cloud.google.com/solutions/looker-bigquery' },
    { category: 'AI', title: '5 steps to build strong data foundations for gen AI', url: 'https://cloud.google.com/transform/how-to-build-strong-data-foundations-gen-ai' }
];

export type SubTopic = {
    id: number;
    topic: string;
    importance: string;
};

export const SUB_TOPICS: SubTopic[] = [
    { id: 1, topic: 'データのビジネス価値（4種類の分析）', importance: '★★★' },
    { id: 2, topic: '構造化・非構造化・半構造化データ', importance: '★★★' },
    { id: 3, topic: 'Cloud Storage のストレージクラス', importance: '★★★' },
    { id: 4, topic: 'データベース選択（RDB vs NoSQL）', importance: '★★★' },
    { id: 5, topic: 'BigQuery の特徴とユースケース', importance: '★★★' },
    { id: 6, topic: 'Looker と Looker Studio の違い', importance: '★★★' },
    { id: 7, topic: 'Pub/Sub・Dataflow・Dataproc の役割', importance: '★★★' },
    { id: 8, topic: 'Dataplex / BigQuery Universal Catalog', importance: '★★☆' },
    { id: 9, topic: 'データのプライバシー・ガバナンス', importance: '★★★' },
    { id: 10, topic: 'ビジネスユースケース別のデータ活用', importance: '★★☆' },
];

export type AnalysisLevel = {
    level: string;
    question: string;
    example: string;
    tool: string;
};

export const ANALYSIS_LEVELS: AnalysisLevel[] = [
    { level: '① 記述的', question: '先月何個売れたか？', example: '月次売上レポート', tool: 'Looker Studio' },
    { level: '② 診断的', question: 'なぜ売上が下がったか？', example: '顧客行動の深掘り分析', tool: 'BigQuery + Looker' },
    { level: '③ 予測的', question: '来月何個売れるか？', example: '需要予測モデル', tool: 'Vertex AI + BigQuery' },
    { level: '④ 処方的', question: '何個仕入れるべきか？', example: '自動発注 AI', tool: 'Vertex AI Agent' },
];

export type DataFormatExample = {
    type: string;
    example: string;
    storage: string;
};

export const STRUCTURED_DATA_EXAMPLES: DataFormatExample[] = [
    { type: '売上データ', example: '日付・商品ID・金額・数量', storage: 'Cloud SQL / BigQuery' },
    { type: '顧客マスタ', example: '顧客ID・氏名・住所・年齢', storage: 'Cloud SQL / Spanner' },
    { type: '在庫データ', example: 'SKU・倉庫・在庫数・入出庫日', storage: 'Cloud SQL / Spanner' },
    { type: '気象データ', example: '日時・気温・湿度・降水量', storage: 'BigQuery / Bigtable' },
    { type: '株価データ', example: '銘柄・日時・始値・終値・出来高', storage: 'BigQuery / Bigtable' },
];

export type UnstructuredDataExample = {
    type: string;
    example: string;
    storage: string;
    analysis: string;
};

export const UNSTRUCTURED_DATA_EXAMPLES: UnstructuredDataExample[] = [
    { type: 'テキスト', example: 'メール・SNS 投稿・レビュー', storage: 'Cloud Storage', analysis: 'Natural Language API' },
    { type: '画像', example: '商品写真・医療画像・衛星写真', storage: 'Cloud Storage', analysis: 'Vision API' },
    { type: '動画', example: '監視カメラ・広告・教育動画', storage: 'Cloud Storage', analysis: 'Video Intelligence API' },
    { type: '音声', example: 'コールセンター録音・ポッドキャスト', storage: 'Cloud Storage', analysis: 'Speech-to-Text API' },
    { type: 'PDF', example: '契約書・請求書・レポート', storage: 'Cloud Storage', analysis: 'Document AI' },
    { type: 'ログ', example: 'Webサーバーログ・アプリログ', storage: 'Cloud Logging / GCS', analysis: 'BigQuery' },
];

export type DataFormatComparison = {
    item: string;
    structured: string;
    semiStructured: string;
    unstructured: string;
};

export const DATA_FORMAT_COMPARISON: DataFormatComparison[] = [
    { item: '例', structured: 'CSV・RDB テーブル', semiStructured: 'JSON・XML・CSV', unstructured: '画像・動画・音声・PDF' },
    { item: 'スキーマ', structured: '固定・厳格', semiStructured: '柔軟', unstructured: 'なし' },
    { item: '検索方法', structured: 'SQL', semiStructured: 'JSONPath・SQL', unstructured: 'AI/ML・全文検索' },
    { item: 'GCP ストレージ', structured: 'Cloud SQL・BigQuery', semiStructured: 'Firestore・BigQuery', unstructured: 'Cloud Storage' },
    { item: '全データ中の割合', structured: '~10-20%', semiStructured: '~10-15%', unstructured: '~70-80%' },
    { item: '分析の難易度', structured: '低（容易）', semiStructured: '中', unstructured: '高（AI/ML 必要）' },
];

export type StorageClass = {
    className: string;
    storageCost: string;
    retrievalCost: string;
    minDuration: string;
    useCase: string;
};

export const STORAGE_CLASSES: StorageClass[] = [
    { className: 'Standard', storageCost: '高（目安: $0.020/GB）', retrievalCost: '無料', minDuration: 'なし', useCase: '頻繁にアクセスするデータ・Web コンテンツ・ML 学習データ' },
    { className: 'Nearline', storageCost: '中（目安: $0.010/GB）', retrievalCost: 'あり（小）', minDuration: '30日', useCase: '月1回程度のアクセス・バックアップ・月次レポート' },
    { className: 'Coldline', storageCost: '低（目安: $0.004/GB）', retrievalCost: 'あり（中）', minDuration: '90日', useCase: '四半期に1回程度のアクセス・DR バックアップ' },
    { className: 'Archive', storageCost: '最安（目安: $0.0012/GB）', retrievalCost: 'あり（大）', minDuration: '365日', useCase: '年1回未満のアクセス・法令遵守のための長期保管' },
];

export type CloudSqlVsSpanner = {
    item: string;
    cloudSql: string;
    cloudSpanner: string;
};

export const SQL_VS_SPANNER: CloudSqlVsSpanner[] = [
    { item: 'スケール', cloudSql: '垂直（単一サーバー強化）', cloudSpanner: '水平（ノード追加で無限拡張）' },
    { item: 'リージョン', cloudSql: '単一リージョン', cloudSpanner: 'マルチリージョン対応' },
    { item: 'SLA', cloudSql: '99.99%（HA 構成時）', cloudSpanner: '99.999%' },
    { item: '最大規模', cloudSql: '64 TB', cloudSpanner: 'ペタバイト規模' },
    { item: 'コスト', cloudSql: '比較的安価', cloudSpanner: '非常に高価' },
    { item: '互換性', cloudSql: 'MySQL/PG/SQL Server', cloudSpanner: 'Cloud Spanner 独自 SQL' },
    { item: '選ぶ場面', cloudSql: 'リージョン内の中規模 OLTP', cloudSpanner: 'グローバル展開・超大規模 OLTP' },
];

export type BigQueryFeature = {
    feature: string;
    description: string;
    useCase: string;
};

export const BIGQUERY_FEATURES: BigQueryFeature[] = [
    { feature: 'BigQuery ML', description: 'SQL でML モデルを構築・実行', useCase: 'データアナリストが Python なしで予測モデル作成' },
    { feature: 'BigQuery BI Engine', description: 'インメモリ分析で高速レスポンス', useCase: 'Looker Studio との連携で秒単位の応答' },
    { feature: 'BigQuery Omni', description: 'AWS・Azure のデータも BigQuery で分析', useCase: 'マルチクラウド環境のデータ分析' },
    { feature: 'Gemini in BigQuery', description: '自然言語でクエリ・コード生成', useCase: 'SQL の知識がなくても分析可能' },
    { feature: 'BigQuery DataFrames', description: 'Python Pandas ライクに BigQuery を操作', useCase: 'データサイエンティスト向け' },
];

export type DatabaseComparison = {
    service: string;
    type: string;
    scale: string;
    useCase: string;
    keyword: string;
};

export const DATABASE_COMPARISON: DatabaseComparison[] = [
    { service: 'Cloud SQL', type: 'RDB（マネージド）', scale: '中規模', useCase: 'Web アプリ・既存 DB 移行', keyword: 'MySQL・PG・SQL Server' },
    { service: 'Cloud Spanner', type: 'グローバル RDB', scale: '超大規模', useCase: '金融・グローバル EC', keyword: 'グローバル・強一貫性・99.999%' },
    { service: 'AlloyDB', type: 'PG 互換高性能 DB', scale: '大規模', useCase: '高性能 PG・HTAP', keyword: 'PostgreSQL 互換・4倍高速' },
    { service: 'Firestore', type: 'NoSQL ドキュメント', scale: '中〜大規模', useCase: 'モバイル・Web アプリ', keyword: 'リアルタイム同期・サーバーレス' },
    { service: 'Bigtable', type: 'NoSQL ワイドカラム', scale: 'ペタバイト', useCase: 'IoT・時系列・広告', keyword: '超高スループット・低レイテンシ' },
    { service: 'BigQuery', type: 'データウェアハウス', scale: 'ペタバイト', useCase: 'BI・分析・ML', keyword: 'サーバーレス・SQL 分析' },
    { service: 'Memorystore', type: 'インメモリ', scale: '小〜中規模', useCase: 'キャッシュ・セッション', keyword: 'Redis・低レイテンシ' },
];

export type LookerFeature = {
    feature: string;
    description: string;
    value: string;
};

export const LOOKER_FEATURES: LookerFeature[] = [
    { feature: 'ダッシュボード', description: '複数の可視化をまとめた画面', value: '経営状況の一覧把握' },
    { feature: 'Explore', description: 'ノーコードでデータを探索', value: 'エンジニアなしで深掘り分析' },
    { feature: 'Looks', description: '保存した可視化レポート', value: '定期レポートの自動化' },
    { feature: 'Alerts', description: 'データ変化時の通知', value: '異常値・目標達成を即座に把握' },
    { feature: 'Looker API', description: '外部システムとの統合', value: 'アプリへのデータ埋め込み' },
    { feature: 'Looker Blocks', description: '業界別の分析テンプレート', value: '分析環境の素早い構築' },
];

export type LookerVsStudio = {
    item: string;
    looker: string;
    studio: string;
};

export const LOOKER_VS_STUDIO: LookerVsStudio[] = [
    { item: '費用', looker: '有料（エンタープライズライセンス）', studio: '無料' },
    { item: '対象ユーザー', looker: 'データチーム・大企業', studio: '個人・中小企業・マーケター' },
    { item: 'データモデル', looker: 'LookML で厳密に定義', studio: '柔軟だが各人が独自定義' },
    { item: '真実の唯一性', looker: '◎ 保証できる', studio: '△ 担保が難しい' },
    { item: 'スケール', looker: '大規模な組織向け', studio: '小〜中規模' },
    { item: '主な用途', looker: '全社的な BI 基盤', studio: 'アドホックな可視化・個人レポート' },
    { item: 'API', looker: 'あり（外部連携可能）', studio: '限定的' },
    { item: 'Git 統合', looker: 'あり（バージョン管理）', studio: 'なし' },
];

export type PubSubUseCase = {
    useCase: string;
    description: string;
};

export const PUBSUB_USECASES: PubSubUseCase[] = [
    { useCase: 'IoT データ収集', description: 'センサーデータをリアルタイムで収集・配信' },
    { useCase: 'イベント駆動アーキテクチャ', description: 'マイクロサービス間の非同期メッセージング' },
    { useCase: 'ストリーミングデータ分析', description: 'Dataflow へデータを流して分析' },
    { useCase: 'ログ集約', description: '複数サービスのログを一箇所に集める' },
    { useCase: 'リアルタイム通知', description: '特定イベント発生時の即座の通知' },
];

export type DataflowUseCase = {
    useCase: string;
    type: string;
    description: string;
};

export const DATAFLOW_USECASES: DataflowUseCase[] = [
    { useCase: 'ETL パイプライン', type: 'バッチ', description: '複数ソースのデータを BigQuery へ投入' },
    { useCase: 'ログ分析', type: 'ストリーミング', description: 'Webログをリアルタイムで集計・分析' },
    { useCase: '不正検知', type: 'ストリーミング', description: '取引データをリアルタイムで分析' },
    { useCase: 'データ品質チェック', type: 'バッチ', description: 'データのクレンジング・バリデーション' },
    { useCase: 'ファイル変換', type: 'バッチ', description: 'CSV → JSON、Avro への変換' },
];


export type ManagementComparison = {
    item: string;
    traditional: string;
    dataDriven: string;
};

export const TRADITIONAL_VS_DATADRIVEN: ManagementComparison[] = [
    { item: '意思決定の根拠', traditional: 'ベテランの経験則', dataDriven: 'データと統計的分析' },
    { item: 'スピード', traditional: '会議・議論に時間がかかる', dataDriven: 'リアルタイムで判断可能' },
    { item: '精度', traditional: '個人の能力に依存', dataDriven: '再現性・客観性が高い' },
    { item: 'スケール', traditional: '個人の限界がある', dataDriven: 'AIで大量データを処理' },
    { item: 'リスク', traditional: 'バイアスが入りやすい', dataDriven: 'データに基づくため客観的' },
];

export type DataManagementSolution = {
    architecture: string;
    definition: string;
    dataSchema: string;
    gcpServices: string;
};

export const DATA_MANAGEMENT_SOLUTIONS: DataManagementSolution[] = [
    { architecture: 'データベース (Database)', definition: 'アプリケーションを稼働させるために必要な現在のデータを保存し、リアルタイムのトランザクション処理（OLTP）を提供する。', dataSchema: '厳密に構造化されたデータ。更新頻度が高く、特定のアプリケーションに最適化されている。', gcpServices: 'Cloud SQL, Cloud Spanner, Firestore, Cloud Bigtable' },
    { architecture: 'データウェアハウス (Data Warehouse)', definition: '複数のシステムから抽出・変換・ロード（ETL）された現在および過去のデータを統合し、高度なビジネス分析（OLAP）やレポート作成を支援する。', dataSchema: '書き込み時スキーマ（Schema-on-write）。分析用にクレンジングおよび構造化されたデータ。', gcpServices: 'BigQuery' },
    { architecture: 'データレイク (Data Lake)', definition: '構造化、半構造化、非構造化（画像、動画、音声など）を問わず、あらゆるデータを未加工の状態で安価に大量保存する。機械学習の基盤となる。', dataSchema: '読み取り時スキーマ（Schema-on-read）。柔軟性が高く、事前のデータモデリングが不要。', gcpServices: 'Cloud Storage' },
];

export type DatabaseDecisionMatrix = {
    requirement: string;
    dataModel: string;
    gcpService: string;
    useCase: string;
};

export const DATABASE_DECISION_MATRIX: DatabaseDecisionMatrix[] = [
    { requirement: '一般的なRDBMS環境のクラウド化', dataModel: 'リレーショナル (SQL)。厳密なACIDトランザクション。', gcpService: 'Cloud SQL', useCase: 'ERP、CMS、一般的なWebアプリケーション（容量数十TB未満）' },
    { requirement: 'グローバル規模のトランザクション', dataModel: 'リレーショナル (SQL)。無限の水平拡張とグローバルな強整合性。', gcpService: 'Cloud Spanner', useCase: 'グローバル金融決済、大規模サプライチェーン、SaaS基盤' },
    { requirement: '超大規模な時系列・ログデータ', dataModel: 'ワイドカラム型NoSQL。結果整合性。高スループットの読み書き。', gcpService: 'Cloud Bigtable', useCase: 'IoTセンサーデータ、アドテク、金融市場データ' },
    { requirement: 'モバイル/Webの迅速なアプリ開発', dataModel: 'ドキュメント型NoSQL。ドキュメント単位のACID。リアルタイム同期。', gcpService: 'Firestore', useCase: 'チャットアプリ、モバイルゲーム、オフライン対応アプリ' },
    { requirement: '超低遅延のデータアクセス', dataModel: 'キーバリュー型 (KVS)。インメモリデータストア。', gcpService: 'Memorystore', useCase: 'セッション管理、クエリキャッシュ、リアルタイムリーダーボード' },
];

export type PrivacyTechnique = {
    technique: string;
    reidentification: string;
    gdpr: string;
    useCase: string;
};

export const PRIVACY_TECHNIQUES: PrivacyTechnique[] = [
    { technique: '匿名化', reidentification: '不可能（理論上）', gdpr: '対象外', useCase: 'データの公開・共有' },
    { technique: '仮名化', reidentification: '可能（変換テーブル必要）', gdpr: '対象', useCase: '開発・テスト環境' },
    { technique: '差分プライバシー', reidentification: '困難', gdpr: '状況による', useCase: '統計分析・ML 学習' },
];

export type UseCaseExample = {
    problem: string;
    data: string;
    gcpService: string;
    effect: string;
};

export const USE_CASES_EXAMPLES: UseCaseExample[] = [
    { problem: '顧客離脱を予測したい', data: '購買履歴・行動ログ', gcpService: 'BigQuery ML + Vertex AI', effect: '離脱 3 週間前に介入できる' },
    { problem: '在庫を最適化したい', data: 'POS・天気・カレンダー', gcpService: 'BigQuery + Vertex AI', effect: '欠品率 30% 削減' },
    { problem: 'レコメンドを改善したい', data: '閲覧・購買履歴', gcpService: 'Recommendations AI', effect: 'CV率 15% 向上' },
    { problem: 'レビューを分析したい', data: '顧客レビューテキスト', gcpService: 'Natural Language API', effect: '製品改善サイクル短縮' },
];

export type ConfusionPoint = {
    pattern: string;
    truth: string;
};

export const CONFUSION_POINTS: ConfusionPoint[] = [
    { pattern: 'BigQuery = データベース', truth: 'BigQuery はデータウェアハウス（DWH）。OLTP には向かない' },
    { pattern: 'Dataflow = Dataproc', truth: 'Dataflow は Beam ベース（サーバーレス）、Dataproc は Hadoop/Spark' },
    { pattern: 'Looker = Looker Studio', truth: 'Looker は有料エンタープライズ BI、Looker Studio は無料セルフサービス' },
    { pattern: '匿名化 = 仮名化', truth: '匿名化は再識別不可、仮名化は再識別可能（変換テーブル必要）' },
    { pattern: 'Cloud SQL = BigQuery', truth: 'Cloud SQL は OLTP（RDB）、BigQuery は OLAP（DWH・分析）' },
    { pattern: 'Bigtable = BigQuery', truth: 'Bigtable は NoSQL 時系列 DB、BigQuery は SQL 分析 DWH' },
    { pattern: 'Pub/Sub = Dataflow', truth: 'Pub/Sub はメッセージング（配信）、Dataflow はデータ処理（変換）' },
];
