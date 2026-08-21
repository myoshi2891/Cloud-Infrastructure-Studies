/** ホームページで使用する試験データと統計の定数 */

import { HANDS_ON_ENABLED } from '@/lib/featureFlags';

export type Provider = 'GCP' | 'AWS' | 'Cisco' | 'CompTIA';

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
    | 'card-pca'
    | 'card-aws-saa'
    | 'card-ccna'
    | 'card-comptia';

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
    /** ナビゲーションの先頭概要リンクの表示名（未指定時は '概要'） */
    overviewLabel?: string;
}

export const cardColorMap: Record<ColorKey, string> = {
    'card-ace': 'card-ace',
    'card-genai': 'card-genai',
    'card-cdl': 'card-cdl',
    'card-agwa': 'card-agwa',
    'card-pcne': 'card-pcne',
    'card-pca': 'card-pca',
    'card-ccna': 'card-ccna',
    'card-aws-saa': 'card-aws-saa',
    'card-comptia': 'card-comptia',
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
    CompTIA: {
        label: 'CompTIA',
        kicker: 'Infrastructure & Security',
        description: 'ベンダーニュートラルなITインフラ・ネットワーク・セキュリティ標準を学ぶ',
    },
};

export const providerOrder: Provider[] = ['GCP', 'AWS', 'Cisco', 'CompTIA'];

const ALL_EXAMS: Exam[] = [
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
                label: '完全試験対策ガイド',
                href: '/gcl/associate-cloud-engineer/complete-advanced-guide',
                pct: '完全解説',
            },
            {
                label: 'アーキテクチャガイド',
                href: '/gcl/associate-cloud-engineer/architecture-guide',
                pct: '総合',
            },
            {
                label: 'Section 1: 環境設定 完全ガイド',
                href: '/gcl/associate-cloud-engineer/section1',
                pct: '~23%',
            },
            {
                label: 'Domain 1: 環境設定',
                href: '/gcl/associate-cloud-engineer/domain1',
                pct: '17.5%',
            },
            {
                label: 'Section 2: 計画と実装 完全ガイド',
                href: '/gcl/associate-cloud-engineer/section2',
                pct: '~30%',
            },
            {
                label: 'Domain 2: 計画と実装',
                href: '/gcl/associate-cloud-engineer/domain2',
                pct: '21%',
            },
            {
                label: 'Section 3: 運用管理 完全ガイド',
                href: '/gcl/associate-cloud-engineer/section3',
                pct: '~30%',
            },
            {
                label: 'Domain 3: 運用管理',
                href: '/gcl/associate-cloud-engineer/domain3',
                pct: '22%',
            },
            {
                label: 'Section 4: アクセスとセキュリティ 完全ガイド',
                href: '/gcl/associate-cloud-engineer/section4',
                pct: '~20%',
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
            { label: 'Section 1: ユーザー・ドメイン・ディレクトリ管理', href: '/gcl/agwa/section1', pct: '20%' },
            { label: 'Section 2: コアサービス管理', href: '/gcl/agwa/section2', pct: '—' },
            { label: 'Section 3: データガバナンスとコンプライアンスの管理', href: '/gcl/agwa/section3', pct: '15%' },
            { label: 'Section 4: セキュリティポリシーとアクセス制御の管理', href: '/gcl/agwa/section4', pct: '20%' },
            { label: 'Section 5: ブラウザとエンドポイントの管理', href: '/gcl/agwa/section5', pct: '10%' },
            { label: 'Section 6: 監視とトラブルシューティング', href: '/gcl/agwa/section6', pct: '13%' },
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
        // pct は公式 Exam Guide の配点が正本（公式 Section 1〜6 = 21/20/16/16/14/13、合計100%）。
        // ページ側のセクション番号は公式番号と一対一ではない:
        //   ページ S1 → 公式 S1 / ページ S2 → 公式 S2
        //   ページ S3・S4 → 公式 S3（~16%）を Task 3.1 と Task 3.2〜3.3 で分担（タスク単位の配点は非公開）
        //   ページ S5 → 公式 S6 / ページ S6 → 公式 S5
        // 公式 S4（ハイブリッド／マルチクラウド接続 ~16%）に対応する専用ページは未作成。
        domains: [
            { label: '試験対策ガイド', href: '/gcl/professional-cloud-network-engineer', pct: '概要' },
            { label: 'Section 1: VPCネットワーク設計', href: '/gcl/professional-cloud-network-engineer/section1-vpc-design', pct: '~21%' },
            { label: 'Section 2: VPCネットワークの実装', href: '/gcl/professional-cloud-network-engineer/section2-vpc-implementation', pct: '~20%' },
            { label: 'Section 3: ロードバランシングとトラフィック管理', href: '/gcl/professional-cloud-network-engineer/section3-load-balancing', pct: '公式S3 ~16%' },
            { label: 'Section 4: CDN・DNS・IPアドレス管理', href: '/gcl/professional-cloud-network-engineer/section4-cdn-dns-ipam', pct: '公式S3 ~16%' },
            { label: 'Section 5: ネットワークセキュリティの設計と実装', href: '/gcl/professional-cloud-network-engineer/section5-network-security', pct: '~13%' },
            { label: 'Section 6: ネットワーク操作と監視', href: '/gcl/professional-cloud-network-engineer/section6-network-ops-monitoring', pct: '~14%' },
            { label: 'ステップバイステップガイド', href: '/gcl/professional-cloud-network-engineer-step-by-step', pct: '詳細' },
        ],
        badge: 'ネットワーク特化',
        icon: '🖧',
        provider: 'GCP',
    },
    {
        id: 'pca',
        label: 'Professional Cloud Architect',
        abbr: 'PCA',
        level: 'Professional',
        score: '~50-60問 / 120分',
        color: 'card-pca',
        href: '/gcl/professional-cloud-architect',
        description:
            'Google Cloud の最上位アーキテクト資格。ビジネス要件・技術要件を満たすスケーラブルでセキュア、可用性の高いソリューションの設計・実装・管理能力を認定。',
        domains: [
            {
                label: '完全対策ガイド',
                href: '/gcl/professional-cloud-architect',
                pct: '完全解説',
            },
            {
                label: 'Section 1: 設計と計画',
                href: '/gcl/professional-cloud-architect/section1-design-planning',
                pct: '~25%',
            },
            {
                label: 'Section 2: 管理とプロビジョニング',
                href: '/gcl/professional-cloud-architect#section-2-クラウドソリューションインフラの管理とプロビジョニング約175',
                pct: '~17.5%',
            },
            {
                label: 'Section 3: セキュリティとコンプライアンス',
                href: '/gcl/professional-cloud-architect#section-3-セキュリティとコンプライアンスの設計約175',
                pct: '~17.5%',
            },
            {
                label: 'Section 4: プロセス分析と最適化',
                href: '/gcl/professional-cloud-architect#section-4-技術ビジネスプロセスの分析と最適化約15',
                pct: '~15%',
            },
            {
                label: 'Section 5: 実装の管理',
                href: '/gcl/professional-cloud-architect#section-5-実装の管理約125',
                pct: '~12.5%',
            },
            {
                label: 'Section 6: 運用の卓越性',
                href: '/gcl/professional-cloud-architect#section-6-ソリューションと運用の卓越性の確保約125',
                pct: '~12.5%',
            },
        ],
        badge: '最上位アーキテクト',
        icon: '🏛️',
        provider: 'GCP',
    },
    {
        id: 'hands-on',
        label: 'Hands-on',
        overviewLabel: 'IAP（Identity-Aware Proxy）TCP フォワーディング',
        abbr: 'Hands-on',
        level: 'Practical',
        score: 'ハンズオン解説',
        color: 'card-ace',
        href: '/gcl/hands-on/iap-tcp-forwarding-best-practices-guide',
        description:
            'Google Cloud のハンズオン実践ガイド。IAP TCPフォワーディングやアプリ開発環境構築、ネットワーク構築など。',
        domains: [
            {
                label: 'IAP TCPフォワーディング ベストプラクティス',
                href: '/gcl/hands-on/iap-tcp-forwarding-best-practices-guide',
                pct: 'ハンズオン',
            },
            {
                label: 'Cloud Load Balancing 完全入門',
                href: '/gcl/hands-on/cloud-load-balancing-guide',
                pct: 'ハンズオン',
            },
            {
                label: 'GCPネットワーク完全入門',
                href: '/gcl/hands-on/develop-your-gcp-network',
                pct: 'ハンズオン',
            },
            {
                label: '安全なGoogle Cloudネットワーク構築',
                href: '/gcl/hands-on/build-a-secure-google-cloud-network',
                pct: 'ハンズオン',
            },
            {
                label: 'アプリ開発環境構築 完全ガイド',
                href: '/gcl/hands-on/set-up-an-app-dev-environment-on-google-cloud',
                pct: 'ハンズオン',
            },
            {
                label: 'セキュリティ基礎 完全ガイド',
                href: '/gcl/hands-on/gcp-security-fundamentals-guide',
                pct: 'ハンズオン',
            },
            {
                label: 'GKE プライベートクラスタ セキュリティ実装ガイド',
                href: '/gcl/hands-on/gke-private-cluster-security-guide',
                pct: 'ハンズオン',
            },
            {
                label: 'Terraform GCP Challenge Lab 完全攻略ガイド',
                href: '/gcl/hands-on/terraform-gcp-challenge-lab-guide',
                pct: 'ハンズオン',
            },
            {
                label: 'Team Griffin インフラ構築チャレンジラボ 完全解説ガイド',
                href: '/gcl/hands-on/griffin-wordpress-gke-guide',
                pct: 'ハンズオン',
            },
        ],
        badge: 'ハンズオン',
        icon: '🛠️',
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
        domains: [
            {
                label: '完全対策ガイド (SAA-C03)',
                href: '/aws/solutions-architect-associate',
                pct: '完全解説',
            },
            {
                label: 'ドメイン1: セキュアなアーキテクチャの設計',
                href: '/aws/solutions-architect-associate/domain1',
                pct: '30%',
            },
            {
                label: 'ドメイン2: 回復力のあるアーキテクチャの設計',
                href: '/aws/solutions-architect-associate/domain2',
                pct: '26%',
            },
            {
                label: 'ドメイン3: 高性能なアーキテクチャの設計',
                href: '/aws/solutions-architect-associate/domain3',
                pct: '24%',
            },
            {
                label: 'ドメイン4: コスト最適化アーキテクチャの設計',
                href: '/aws/solutions-architect-associate/domain4',
                pct: '20%',
            },
        ],
        badge: 'ソリューションアーキテクト',
        icon: '🏗',
        provider: 'AWS',
    },
    {
        id: 'ccna',
        label: 'Cisco Certified Network Associate',
        abbr: 'CCNA',
        level: 'Associate',
        score: '~90-120問 / 120分',
        color: 'card-ccna',
        href: '/cisco/ccna/beginner-guide',
        description:
            'シスコ認定のネットワーク基礎・アクセス・IP接続/サービス・セキュリティ・自動化の知識と実務スキルを認定。',
        domains: [
            {
                label: '1.0 Network Fundamentals（ネットワークの基礎）',
                href: '/cisco/ccna/network-fundamentals-guide',
                pct: '20%',
            },
            {
                label: '2.0 Network Access（ネットワークアクセス）',
                href: '/cisco/ccna/network-access-guide',
                pct: '20%',
            },
            {
                label: '3.0 IP Connectivity（IP接続性）',
                href: '/cisco/ccna/ip-connectivity-guide',
                pct: '25%',
            },
            {
                label: '4.0 IP Services（IP サービス）',
                href: '/cisco/ccna/ip-services-guide',
                pct: '10%',
            },
            {
                label: '5.0 Security Fundamentals（セキュリティ基礎）',
                href: '/cisco/ccna/security-fundamentals',
                pct: '15%',
            },
            {
                label: '6.0 Automation and Programmability（自動化とプログラマビリティ）',
                href: '/cisco/ccna/automation-programmability',
                pct: '10%',
            },
        ],
        badge: 'ネットワーク基礎',
        icon: '🌐',
        provider: 'Cisco',
    },
    {
        id: 'ccnaauto',
        label: 'Cisco Certified Network Associate Automation',
        abbr: 'CCNAAUTO',
        level: 'Associate',
        score: '~90-120問 / 120分',
        color: 'card-ccna',
        href: '/cisco/devnet-associate',
        description:
            'Ciscoネットワークのソフトウェア開発、API、プラットフォーム、自動化、セキュリティ、ネットワーク基礎の知識を認定（旧CCNA Automation）。',
        domains: [
            {
                label: '完全試験対策ガイド',
                href: '/cisco/devnet-associate',
                pct: '総合',
            },
            {
                label: '1.0 Software Development and Design',
                href: '/cisco/ccna/automation-software-development-design',
                pct: '15%',
            },
            {
                label: '2.0 APIの理解と活用',
                href: '/cisco/ccna/automation-api-guide',
                pct: '20%',
            },
            {
                label: '3.0 Cisco Platforms and Development',
                href: '/cisco/ccna/automation-cisco-platforms-and-development',
                pct: '15%',
            },
            {
                label: '4.0 Application Deployment and Security',
                href: '/cisco/ccna/automation-application-deployment-security',
                pct: '15%',
            },
            {
                label: '5.0 Infrastructure and Automation',
                href: '/cisco/ccna/automation-infrastructure-and-automation',
                pct: '20%',
            },
            {
                label: '6.0 Network Fundamentals',
                href: '/cisco/ccna/automation-network-fundamentals',
                pct: '15%',
            },
        ],
        badge: 'ネットワーク自動化',
        icon: '⚙️',
        provider: 'Cisco',
    },
    {
        id: 'ccde',
        label: 'Cisco Certified Design Expert',
        abbr: 'CCDE',
        level: 'Expert',
        score: '筆記 120分 / 実技 8時間',
        color: 'card-ccna',
        href: '/cisco/ccde/complete-guide',
        description:
            'Cisco最高峰の設計資格。ネットワークアーキテクチャ、ハイレベルデザイン（HLD）、トレードオフ判断、各種専門エレクティブを網羅。',
        domains: [
            {
                label: '完全解説ガイド',
                href: '/cisco/ccde/complete-guide',
                pct: '完全解説',
            },
        ],
        badge: '最上位設計資格',
        icon: '📐',
        provider: 'Cisco',
    },
    {
        id: 'ccie-enterprise-infrastructure',
        label: 'Cisco Certified Internetwork Expert Enterprise Infrastructure',
        abbr: 'CCIE EI',
        level: 'Expert',
        score: '筆記 120分 / 実技 8時間',
        color: 'card-ccna',
        href: '/cisco/ccie/enterprise-infrastructure',
        overviewLabel: '完全解説ガイド',
        description:
            'Cisco最高峰のエキスパート資格。エンタープライズインフラの設計・導入・運用・最適化・自動化を網羅した8時間実技ラボ対策ガイド。',
        domains: [
            {
                label: '完全解説ガイド',
                href: '/cisco/ccie/enterprise-infrastructure',
                pct: '完全解説',
            },
        ],
        badge: '最上位ネットワーク資格',
        icon: '🏗️',
        provider: 'Cisco',
    },
    {
        id: 'cisco-devnet-professional',
        label: 'CCNP Automation',
        abbr: 'CCNP Automation',
        level: 'Professional',
        score: 'コア 120分 + コンセントレーション 90分',
        color: 'card-ccna',
        href: '/cisco/devnet-professional',
        description:
            'Ciscoプラットフォーム上のアプリケーション開発・運用・自動化プロフェッショナル認定。コア試験(350-901 AUTOCOR)と2つのコンセントレーション試験を徹底解説。',
        domains: [
            {
                label: '徹底解説ガイド',
                href: '/cisco/devnet-professional',
                pct: '完全解説',
            },
        ],
        badge: 'Automation プロフェッショナル',
        icon: '🚀',
        provider: 'Cisco',
    },
    {
        id: 'comptia-network-plus',
        label: 'CompTIA Network+',
        abbr: 'Network+',
        level: 'Associate',
        score: '最大90問 / 90分',
        color: 'card-comptia',
        href: '/comptia/network-plus',
        description:
            'ベンダーニュートラルなネットワーク基礎資格。TCP/IP・ルーティング・スイッチング・無線LAN・セキュリティ・障害切り分け方法論を完全網羅。',
        domains: [
            {
                label: '完全対策ガイド (N10-009 / V9)',
                href: '/comptia/network-plus',
                pct: '完全解説',
            },
            {
                label: 'Domain 1.0 Networking Concepts ステップバイステップガイド',
                href: '/comptia/network-plus/networking-concepts-guide',
                pct: '23%',
            },
            {
                label: 'Domain 3.0 Network Operations 徹底解説ガイド',
                href: '/comptia/network-plus/network-operations-guide',
                pct: '19%',
            },
        ],
        badge: 'ネットワーク基礎',
        icon: '⚡',
        provider: 'CompTIA',
    },
];

export const EXAMS: Exam[] = HANDS_ON_ENABLED
    ? ALL_EXAMS
    : ALL_EXAMS.filter((exam) => exam.id !== 'hands-on');

export interface Stat {
    value: string;
    label: string;
}

export const STATS: Stat[] = [
    {
        value: String(EXAMS.filter((exam) => exam.status !== 'coming-soon').length),
        label: '対応試験数',
    },
    { value: '50+', label: '学習チャプター' },
    { value: '600+', label: 'コードブロック' },
    { value: '100%', label: '日本語解説' },
];
