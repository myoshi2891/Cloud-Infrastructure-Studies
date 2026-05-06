export type HeroBadge = {
    label: string;
    color: 'blue' | 'red' | 'yellow' | 'green';
};

export const HERO_BADGES: readonly HeroBadge[] = [
    { label: '配点比率 約16%', color: 'blue' },
    { label: '3 サブセクション', color: 'red' },
    { label: '5+ 主要 AI API', color: 'green' },
    { label: '6 責任ある AI 原則', color: 'yellow' },
];

export type NavLink = {
    id: string;
    num: string;
    label: string;
};

export const NAV_LINKS: readonly NavLink[] = [
    { id: 'overview', num: '00', label: '概要' },
    { id: 'fundamentals', num: '01', label: '基礎' },
    { id: 'solutions', num: '02', label: 'ソリューション' },
    { id: 'building', num: '03', label: '実装' },
    { id: 'apis', num: '04', label: 'API' },
    { id: 'automl', num: '05', label: 'AutoML' },
    { id: 'vertexai', num: '06', label: 'Vertex AI' },
    { id: 'bqml', num: '07', label: 'BigQuery ML' },
    { id: 'tensorflow', num: '08', label: 'TF/TPU' },
    { id: 'responsible', num: '09', label: '責任あるAI' },
    { id: 'checklist', num: '10', label: '試験対策' },
];
