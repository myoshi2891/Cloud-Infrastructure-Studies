export type HeroBadge = {
    label: string;
    color: 'blue' | 'red' | 'yellow' | 'green' | 'purple' | 'orange' | 'cyan';
};

export const HERO_BADGES: readonly HeroBadge[] = [
    { label: '🌐 VPC 設計・計画', color: 'blue' },
    { label: '⚙️ VPC 実装', color: 'green' },
    { label: '🖧 マネージドサービス', color: 'purple' },
    { label: '🔗 ハイブリッド接続', color: 'cyan' },
    { label: '🔍 運用・監視', color: 'yellow' },
    { label: '🛡️ セキュリティ', color: 'red' },
];

export type NavLink = {
    id: string;
    num: string;
    label: string;
};

export const NAV_LINKS: readonly NavLink[] = [
    { id: 'overview', num: 'INTRO', label: '全体像' },
    { id: 's1', num: '01', label: '設計・計画' },
    { id: 's2', num: '02', label: '実装' },
    { id: 's3', num: '03', label: 'マネージドサービス' },
    { id: 's4', num: '04', label: 'ハイブリッド' },
    { id: 's5', num: '05', label: '運用・監視' },
    { id: 's6', num: '06', label: 'セキュリティ' },
];
