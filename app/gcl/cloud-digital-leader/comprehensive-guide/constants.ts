export const PAGE_TITLE = 'CDL エンタープライズ・ベストプラクティス解説';

export type ServiceModel = {
    model: string;
    definition: string;
    link: string;
    ref: string;
    useCase: string;
    management: string;
};

export const SERVICE_MODELS: ServiceModel[] = [
    {
        model: 'IaaS (Infrastructure as a Service)',
        definition: '仮想マシン、ストレージ、仮想ネットワークなどの基盤リソースをオンデマンドで提供するモデル ',
        link: 'https://cloud.google.com/learn/certification/cloud-digital-leader?hl=en',
        ref: '[2]',
        useCase: '既存レガシーシステムのリホストや、OSレベルの高度なカスタマイズが必要なシステムに最適',
        management: 'OS、ミドルウェア、アプリケーション、データ'
    },
    {
        model: 'PaaS (Platform as a Service)',
        definition: 'アプリケーションの実行環境（ランタイム、OS、データベース管理など）をマネージドサービスとして提供するモデル ',
        link: 'https://cloud.google.com/learn/certification/cloud-digital-leader?hl=en',
        ref: '[2]',
        useCase: 'インフラ保守管理を排除し、開発チームがアプリ開発とイノベーションに専念できる環境を創出',
        management: 'アプリケーション、データ'
    },
    {
        model: 'SaaS (Software as a Service)',
        definition: 'インターネット経由で完全に機能するソフトウェアをエンドユーザーに提供するモデル ',
        link: 'https://cloud.google.com/learn/certification/cloud-digital-leader?hl=en',
        ref: '[2]',
        useCase: 'Google Workspace のように、インフラ構築・保守なしに業務生産性やコラボレーションツールを即座に活用できる',
        management: 'データのガバナンス、アクセス権限（IAM）の設定'
    }
];

export type DbService = {
    product: string;
    architecture: string;
    useCase: string;
};

export const DB_SERVICES: DbService[] = [
    { product: 'Cloud Storage', architecture: 'オブジェクトストレージ', useCase: '大容量オブジェクト保存とライフサイクル管理に適する' },
    { product: 'Cloud SQL', architecture: 'リレーショナル (MySQL, PostgreSQL, SQL Server)', useCase: 'トランザクション性の高いリレーショナルDBに利用' },
    { product: 'Cloud Spanner', architecture: '分散型リレーショナル', useCase: 'グローバル規模での強い整合性が求められるケースに最適' },
    { product: 'Cloud Bigtable', architecture: '非リレーショナル (NoSQL ワイドカラム)', useCase: 'ミリ秒未満のレイテンシが要求されるIoTや時系列データ分析向け' },
    { product: 'Firestore', architecture: '非リレーショナル (NoSQL ドキュメント)', useCase: 'モバイル/Webアプリのバックエンドとして、リアルタイムデータ同期やオフライン機能のサポートが必要なケース' },
    { product: 'BigQuery', architecture: 'データウェアハウス (分析向け)', useCase: 'ペタバイト規模のエンタープライズデータウェアハウスと機械学習' }
];

export type ComputeOption = {
    option: string;
    environment: string;
    useCase: string;
};

export const COMPUTE_OPTIONS: ComputeOption[] = [
    { option: 'Compute Engine', environment: '仮想マシン (VM)', useCase: '特定のOS構成やカーネルレベルの制御を必要とするレガシーアプリの「リホスト」に最適。中断が許容されるバッチ処理には Spot VM を活用' },
    { option: 'Google Kubernetes Engine (GKE)', environment: 'コンテナオーケストレーション', useCase: 'マイクロサービスアーキテクチャの運用とスケーリングに最適' },
    { option: 'Cloud Run', environment: 'サーバーレスコンテナ', useCase: 'インフラ管理なしでステートレスなコンテナを高速に実行' },
    { option: 'App Engine', environment: 'Platform as a Service (PaaS)', useCase: 'ソースコードのデプロイのみでWebアプリを運用可能' },
    { option: 'Cloud Functions', environment: 'Function as a Service (FaaS)', useCase: 'ストレージの変更など特定のイベントをトリガーとする軽量な単一処理に最適' }
];

export type SupportTier = {
    tier: string;
    sla: string;
    useCase: string;
    note: string;
};

export const SUPPORT_TIERS: SupportTier[] = [
    { tier: 'Standard Support', sla: 'P2 (High Impact) 4 時間以内', useCase: '試験的なプロジェクトや開発・テスト環境など', note: 'ミッションクリティカルでないワークロードに最適' },
    { tier: 'Enhanced Support', sla: 'P1 (Critical Impact) 1 時間以内', useCase: '高速な対応が求められる本番環境向け', note: 'サードパーティテクノロジーのサポートや Active Assist API の利用が含まれる' },
    { tier: 'Premium Support', sla: 'P1 (Critical Impact) 15 分以内', useCase: '停止が許されないエンタープライズ規模のミッションクリティカルなワークロード向け', note: '専任TAMが配置され、アーキテクチャガイダンスや運用健全性レビューを提供' }
];
