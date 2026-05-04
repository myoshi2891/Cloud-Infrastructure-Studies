export type MigrationStrategy = {
    name: string;
    alias: string;
    desc: string;
    codeChange: string;
    codeChangeClass: 'badgeG' | 'badgeA' | 'badgeR';
    useCase: string;
};

export const MIGRATION_STRATEGIES: readonly MigrationStrategy[] = [
    { name: 'Rehost（リホスト）', alias: 'Lift & Shift', desc: 'コードを変えずそのままクラウドへ移行。VMをGCE上にそのまま展開する。', codeChange: 'なし', codeChangeClass: 'badgeG', useCase: 'レガシー移行・DC契約満了の迅速な移行' },
    { name: 'Replatform（リプラットフォーム）', alias: 'Lift & Optimize', desc: 'アーキテクチャを維持しつつ一部をマネージドサービスへ置き換え。例：自社PostgreSQL → Cloud SQL。', codeChange: '一部', codeChangeClass: 'badgeA', useCase: '運用負荷削減・コード変更最小化' },
    { name: 'Refactor（リファクタリング）', alias: 'Move & Improve', desc: 'クラウドネイティブ機能を活用するためアーキテクチャを再設計。モノリス→マイクロサービス化。', codeChange: '大規模', codeChangeClass: 'badgeR', useCase: 'スケーラビリティ・俊敏性の最大化' },
    { name: 'Rebuild / Re-architect', alias: 'Reimagine', desc: '既存コードを破棄して最新技術でゼロから再構築。長期的に最大の価値を生み出す。', codeChange: '完全', codeChangeClass: 'badgeR', useCase: 'コードベースが陳腐化・完全刷新が必要' },
    { name: 'Repurchase（再購入）', alias: 'Drop & Shop', desc: '自社システムを廃止してSaaS（Google Workspace・Salesforce等）に移行する。', codeChange: '不要', codeChangeClass: 'badgeG', useCase: '既製SaaSで要件を満たせる場合' },
    { name: 'Retire（廃止）', alias: '—', desc: '価値を生み出していない・重複しているシステムを安全にシャットダウン。コスト削減に直結。', codeChange: '不要', codeChangeClass: 'badgeG', useCase: '利用率が極めて低いシステム' },
    { name: 'Retain（保持）', alias: 'Revisit', desc: '現時点でのクラウド移行が見合わないワークロードをオンプレに残す。将来の再評価を前提とする。', codeChange: '不要', codeChangeClass: 'badgeG', useCase: 'データ主権規制・レガシーHW依存' },
];

export type HeroBadge = {
    label: string;
    color: 'blue' | 'red' | 'yellow' | 'green';
};

export const HERO_BADGES: readonly HeroBadge[] = [
    { label: '配点比率 約17%', color: 'blue' },
    { label: '7つのR移行戦略', color: 'red' },
    { label: '5+ コンピューティング選択肢', color: 'green' },
    { label: 'SRE & DevOps', color: 'yellow' },
];

export type NavLink = {
    id: string;
    num: string;
    label: string;
};

export const NAV_LINKS: readonly NavLink[] = [
    { id: 'overview', num: '00', label: '概要' },
    { id: 'migration', num: '01', label: '移行戦略' },
    { id: 'compute', num: '02', label: '仮想マシン' },
    { id: 'containers', num: '03', label: 'コンテナ/GKE' },
    { id: 'serverless', num: '04', label: 'サーバーレス' },
    { id: 'network', num: '05', label: 'ネットワーク' },
    { id: 'hybrid', num: '06', label: 'ハイブリッド' },
    { id: 'devops', num: '07', label: 'DevOps/SRE' },
    { id: 'api', num: '08', label: 'API管理' },
    { id: 'cost', num: '09', label: 'コスト最適化' },
    { id: 'checklist', num: '10', label: '試験対策' },
];