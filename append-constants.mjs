import fs from 'fs';
const file = 'app/gcl/cloud-digital-leader/section2/constants.ts';
let data = `

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
`;

if (!fs.existsSync(file) || !fs.readFileSync(file, 'utf8').includes('export type ManagementComparison')) {
    fs.appendFileSync(file, data);
}

