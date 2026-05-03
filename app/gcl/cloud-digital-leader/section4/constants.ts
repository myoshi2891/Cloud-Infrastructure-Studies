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
    { id: 'hybrid', num: '05', label: 'ハイブリッド' },
    { id: 'devops', num: '06', label: 'DevOps/SRE' },
    { id: 'api', num: '07', label: 'API管理' },
    { id: 'cost', num: '08', label: 'コスト最適化' },
    { id: 'checklist', num: '09', label: '試験対策' },
];