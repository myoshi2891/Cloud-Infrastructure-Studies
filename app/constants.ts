/** ホームページで使用する試験データと統計の定数 */

import type { Provider } from './navigation';

export interface ExamDomain {
    label: string;
    href: string;
    pct: string;
}

export type ColorKey =
    | 'card-ace'
    | 'card-genai'
    | 'card-cdl'
    | 'card-agwa'
    | 'card-pcne'
    | 'card-aws-saa';

export interface Exam {
    id: string;
    label: string;
    abbr: string;
    level: string;
    score: string;
    color: ColorKey;
    href: string;
    description: string;
    domains: ExamDomain[];
    badge: string;
    icon: string;
    provider: Provider;
    /** 'coming-soon' のときホームページでは非表示、ナビには「準備中」として表示 */
    status?: 'available' | 'coming-soon';
}

export const EXAMS: Exam[] = [
    {
        id: 'ace',
        label: 'Associate Cloud Engineer',
        abbr: 'ACE',
        level: 'Associate',
        score: '~100問 / 120分',
        color: 'card-ace',
        href: '/gcl/associate-cloud-engineer',
        description:
            'Google Cloud 上でのアプリのデプロイ・管理・監視能力を認定。コンピュート・ストレージ・ネットワーク・IAM など幅広い領域を網羅。',
        domains: [
            {
                label: 'アーキテクチャガイド',
                href: '/gcl/associate-cloud-engineer/architecture-guide',
                pct: '総合',
            },
            {
                label: 'Domain 1: 環境設定',
                href: '/gcl/associate-cloud-engineer/domain1',
                pct: '17.5%',
            },
            {
                label: 'Domain 2: 計画と実装',
                href: '/gcl/associate-cloud-engineer/domain2',
                pct: '21%',
            },
            {
                label: 'Domain 3: 運用管理',
                href: '/gcl/associate-cloud-engineer/domain3',
                pct: '22%',
            },
            {
                label: 'Domain 4: アクセスとセキュリティ',
                href: '/gcl/associate-cloud-engineer/domain4',
                pct: '20%',
            },
        ],
        badge: '実践向け',
        icon: '⚙️',
        provider: 'GCP',
    },
    {
        id: 'genai',
        label: 'Generative AI Leader',
        abbr: 'GenAI',
        level: 'Foundational',
        score: '~60問 / 90分',
        color: 'card-genai',
        href: '/gcl/genai-leader',
        description:
            'Google Cloud の生成 AI サービスとビジネス戦略を認定。Vertex AI・LLM・RAG・プロンプトエンジニアリングの基礎知識が問われる。',
        domains: [
            { label: 'Section 1: Gen AI 基礎', href: '/gcl/genai-leader/section1', pct: '25%' },
            {
                label: 'Section 2: Google Cloud Gen AI',
                href: '/gcl/genai-leader/section2',
                pct: '30%',
            },
            { label: 'Section 3: モデル出力改善', href: '/gcl/genai-leader/section3', pct: '25%' },
            { label: 'Section 4: ビジネス戦略', href: '/gcl/genai-leader/section4', pct: '20%' },
        ],
        badge: 'AI特化',
        icon: '✨',
        provider: 'GCP',
    },
    {
        id: 'cdl',
        label: 'Cloud Digital Leader',
        abbr: 'CDL',
        level: 'Foundational',
        score: '~60問 / 90分',
        color: 'card-cdl',
        href: '/gcl/cloud-digital-leader',
        description:
            'クラウドテクノロジーとビジネス変革の知識を認定。IT 非専門職向けの入門資格で、Google Cloud の主要サービスを幅広くカバー。',
        domains: [
            { label: 'Section 1: DX と Google Cloud', href: '/gcl/cloud-digital-leader/section1', pct: '—' },
            { label: 'Section 2: データトランスフォーメーション', href: '/gcl/cloud-digital-leader/section2', pct: '—' },
            { label: 'Section 3: AI によるイノベーション', href: '/gcl/cloud-digital-leader/section3', pct: '—' },
            { label: 'Section 4: インフラのモダナイゼーション', href: '/gcl/cloud-digital-leader/section4', pct: '—' },
            { label: 'Section 5: セキュリティ＆コンプライアンス', href: '/gcl/cloud-digital-leader/section5', pct: '—' },
            { label: 'Section 6: Scaling with Operations', href: '/gcl/cloud-digital-leader/section6', pct: '—' },
        ],
        badge: '入門向け',
        icon: '🌐',
        provider: 'GCP',
    },
    {
        id: 'agwa',
        label: 'Associate Google Workspace Administrator',
        abbr: 'AGWA',
        level: 'Associate',
        score: '~50-60問 / 120分',
        color: 'card-agwa',
        href: '/gcl/agwa',
        description:
            'Google Workspace のコアサービスの管理・設定、ユーザー・ドメインのプロビジョニング、セキュリティとアクセス制御などを認定。',
        domains: [
            { label: 'Section 1: ユーザー・ドメイン・ディレクトリ管理', href: '/gcl/agwa/section1', pct: '—' },
        ],
        badge: 'Workspace 管理向け',
        icon: '💼',
        provider: 'GCP',
    },
    {
        id: 'pcne',
        label: 'Professional Cloud Network Engineer',
        abbr: 'PCNE',
        level: 'Professional',
        score: '~60問 / 120分',
        color: 'card-pcne',
        href: '/gcl/professional-cloud-network-engineer',
        description:
            'Google Cloud のネットワークインフラの設計・実装・管理能力を認定。VPC・ハイブリッド接続・ロードバランシング・セキュリティなどを網羅。',
        domains: [
            { label: '試験対策ガイド', href: '/gcl/professional-cloud-network-engineer', pct: '概要' },
            { label: 'ステップバイステップガイド', href: '/gcl/professional-cloud-network-engineer-step-by-step', pct: '詳細' },
        ],
        badge: 'ネットワーク特化',
        icon: '🖧',
        provider: 'GCP',
    },
    {
        id: 'aws-saa',
        label: 'AWS Certified Solutions Architect – Associate',
        abbr: 'SAA',
        level: 'Associate',
        score: '~65問 / 130分',
        color: 'card-aws-saa',
        href: '/aws/solutions-architect-associate',
        description:
            'AWS 上で可用性・コスト効率・耐障害性に優れたシステムを設計する能力を認定。VPC・EC2・S3・IAM・RDS など中核サービスを横断的に問う。',
        domains: [],
        badge: '準備中',
        icon: '🏗',
        provider: 'AWS',
        status: 'coming-soon',
    },
];

export interface Stat {
    value: string;
    label: string;
}

export const STATS: Stat[] = [
    { value: '5', label: '対応試験数' },
    { value: '50+', label: '学習チャプター' },
    { value: '600+', label: 'コードブロック' },
    { value: '100%', label: '日本語解説' },
];
