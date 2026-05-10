export type HeroBadge = {
    label: string;
    color: 'blue' | 'red' | 'yellow' | 'green' | 'purple' | 'orange' | 'cyan';
};

export const HERO_BADGES: readonly HeroBadge[] = [
    { label: '🌐 VPC 設計', color: 'blue' },
    { label: '🔗 ハイブリッド接続', color: 'green' },
    { label: '⚖️ ロードバランシング', color: 'orange' },
    { label: '🖧 ネットワークサービス', color: 'purple' },
    { label: '🛡️ セキュリティ', color: 'red' },
    { label: '🔍 監視・トラブルシュート', color: 'yellow' },
];

export type NavLink = {
    id: string;
    num: string;
    label: string;
};

export const NAV_LINKS: readonly NavLink[] = [
    { id: 'overview', num: 'INTRO', label: '全体像' },
    { id: 's1', num: '01', label: 'VPCネットワーク' },
    { id: 's2', num: '02', label: 'ハイブリッド接続' },
    { id: 's3', num: '03', label: 'ロードバランシング' },
    { id: 's4', num: '04', label: 'ネットワークサービス' },
    { id: 's5', num: '05', label: 'セキュリティ' },
    { id: 's6', num: '06', label: '監視・トラブル' },
    { id: 'cheatsheet', num: 'まとめ', label: 'チートシート' },
    { id: 'confusion', num: 'まとめ', label: '混同しやすい' },
];
