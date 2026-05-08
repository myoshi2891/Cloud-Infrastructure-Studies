export type HeroBadge = {
    label: string;
    color: 'blue' | 'red' | 'yellow' | 'green' | 'purple' | 'orange';
};

export const HERO_BADGES: readonly HeroBadge[] = [
    { label: '📊 Financial Governance', color: 'blue' },
    { label: '🔧 SRE 原則', color: 'red' },
    { label: '📈 Cloud Monitoring', color: 'green' },
    { label: '📋 Cloud Logging', color: 'yellow' },
    { label: '🛡️ 信頼性設計', color: 'purple' },
    { label: '🌱 サステナビリティ', color: 'green' },
];

export type NavLink = {
    id: string;
    num: string;
    label: string;
};

export const NAV_LINKS: readonly NavLink[] = [
    { id: 's1', num: '01', label: '財務ガバナンス' },
    { id: 's2', num: '02', label: 'SRE 原則' },
    { id: 's3', num: '03', label: 'モニタリング' },
    { id: 's4', num: '04', label: 'ロギング' },
    { id: 's5', num: '05', label: '信頼性設計' },
    { id: 's6', num: '06', label: 'サステナビリティ' },
    { id: 's7', num: '07', label: '試験対策' },
];
