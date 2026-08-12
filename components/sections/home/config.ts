import type { ColorKey, Provider } from '@/app/constants';

export const cardColorMap: Record<ColorKey, string> = {
    'card-ace': 'card-ace',
    'card-genai': 'card-genai',
    'card-cdl': 'card-cdl',
    'card-agwa': 'card-agwa',
    'card-pcne': 'card-pcne',
    'card-ccna': 'card-ccna',
    'card-aws-saa': 'card-aws-saa',
};

export const providerMeta: Record<
    Provider,
    { label: string; kicker: string; description: string }
> = {
    GCP: {
        label: 'Google Cloud',
        kicker: 'Cloud & AI',
        description: 'クラウド基盤、生成AI、Workspaceまでを体系的に学ぶ',
    },
    AWS: {
        label: 'Amazon Web Services',
        kicker: 'Cloud Architecture',
        description: '可用性・セキュリティ・コストを意識した設計力を磨く',
    },
    Cisco: {
        label: 'Cisco',
        kicker: 'Network & Automation',
        description: 'ネットワーク基礎から設計、自動化、DevNetまでを深掘りする',
    },
};

export const providerOrder: Provider[] = ['GCP', 'AWS', 'Cisco'];
