/** ホームページで使用する試験データと統計の定数 */

export interface ExamDomain {
    label: string;
    href: string;
    pct: string;
}

export interface Exam {
    id: string;
    label: string;
    abbr: string;
    level: string;
    score: string;
    color: string;
    href: string;
    description: string;
    domains: ExamDomain[];
    badge: string;
    icon: string;
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
            { label: 'Domain 1: 環境設定', href: '/gcl/associate-cloud-engineer/domain1', pct: '17.5%' },
            { label: 'Domain 2: 計画と実装', href: '/gcl/associate-cloud-engineer/domain2', pct: '21%' },
            { label: 'Domain 3: 運用管理', href: '/gcl/associate-cloud-engineer/domain3', pct: '22%' },
            { label: 'Domain 4: アクセスとセキュリティ', href: '/gcl/associate-cloud-engineer/domain4', pct: '20%' },
        ],
        badge: '実践向け',
        icon: '⚙️',
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
            { label: 'Section 2: Google Cloud Gen AI', href: '/gcl/genai-leader/section2', pct: '30%' },
            { label: 'Section 3: モデル出力改善', href: '/gcl/genai-leader/section3', pct: '25%' },
            { label: 'Section 4: ビジネス戦略', href: '/gcl/genai-leader/section4', pct: '20%' },
        ],
        badge: 'AI特化',
        icon: '✨',
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
        // セクション別ページ未実装のため、メインページへの単一リンクとして集約
        domains: [
            { label: 'すべてのコンテンツを見る', href: '/gcl/cloud-digital-leader', pct: '—' },
        ],
        badge: '入門向け',
        icon: '🌐',
    },
];

export interface Stat {
    value: string;
    label: string;
}

export const STATS: Stat[] = [
    { value: '3', label: '対応試験数' },
    { value: '50+', label: '学習チャプター' },
    { value: '600+', label: 'コードブロック' },
    { value: '100%', label: '日本語解説' },
];
