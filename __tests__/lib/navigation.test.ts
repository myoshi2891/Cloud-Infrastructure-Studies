import { describe, it, expect } from 'vitest';
import { toNavTree, type NavGroup } from '@/app/navigation';
import { EXAMS, type Exam } from '@/app/constants';

const gcpAce: Exam = {
    id: 'ace',
    label: 'Associate Cloud Engineer',
    abbr: 'ACE',
    level: 'Associate',
    score: '~100問 / 120分',
    color: 'card-ace',
    href: '/gcl/associate-cloud-engineer',
    description: 'desc',
    domains: [
        { label: 'Domain 1', href: '/gcl/associate-cloud-engineer/domain1', pct: '17.5%' },
    ],
    badge: '実践向け',
    icon: '⚙️',
    provider: 'GCP',
};

const gcpGenAi: Exam = {
    id: 'genai',
    label: 'Generative AI Leader',
    abbr: 'GenAI',
    level: 'Foundational',
    score: '~60問 / 90分',
    color: 'card-genai',
    href: '/gcl/genai-leader',
    description: 'desc',
    domains: [
        { label: 'Section 1', href: '/gcl/genai-leader/section1', pct: '25%' },
    ],
    badge: 'AI特化',
    icon: '✨',
    provider: 'GCP',
};

// AWS スタブ（Step 2 で constants に追加するまでは test 内 fixture として使用）
const awsSaa = {
    id: 'aws-saa',
    label: 'Solutions Architect Associate',
    abbr: 'SAA',
    level: 'Associate',
    score: '~65問 / 130分',
    color: 'card-aws-saa',
    href: '/aws/solutions-architect-associate',
    description: 'desc',
    domains: [],
    badge: '準備中',
    icon: '🏗',
    provider: 'AWS' as const,
    status: 'coming-soon' as const,
};

describe('toNavTree', () => {
    it('空配列を渡すと空配列を返す', () => {
        // Arrange & Act
        const result = toNavTree([]);

        // Assert
        expect(result).toEqual([]);
    });

    it('provider 未指定の試験は GCP グループに入る', () => {
        // Arrange
        const { provider: _ignored, ...examWithoutProvider } = gcpAce;
        void _ignored;
        const exams = [examWithoutProvider as unknown as Exam];

        // Act
        const result = toNavTree(exams);

        // Assert
        expect(result).toHaveLength(1);
        const group = result[0];
        expect(group).toBeDefined();
        if (!group) return;
        expect(group.provider).toBe('GCP');
        expect(group.exams).toHaveLength(1);

        const exam = group.exams[0];
        expect(exam).toBeDefined();
        if (!exam) return;
        expect(exam.id).toBe('ace');
    });

    it('GCP のみのとき AWS グループは生成されない', () => {
        // Arrange & Act
        const result = toNavTree([gcpAce, gcpGenAi]);

        // Assert
        expect(result.map((g: NavGroup) => g.provider)).toEqual(['GCP']);
        const group = result[0];
        expect(group).toBeDefined();
        if (!group) return;
        expect(group.exams).toHaveLength(2);
    });

    it('AWS 試験を含むと GCP・AWS の 2 グループに分かれる（GCP が先）', () => {
        // Arrange & Act
        const result = toNavTree([gcpAce, awsSaa, gcpGenAi]);

        // Assert
        expect(result).toHaveLength(2);
        const group0 = result[0];
        const group1 = result[1];
        expect(group0).toBeDefined();
        expect(group1).toBeDefined();
        if (!group0 || !group1) return;

        expect(group0.provider).toBe('GCP');
        expect(group1.provider).toBe('AWS');
        expect(group0.exams.map((e) => e.id)).toEqual(['ace', 'genai']);
        expect(group1.exams.map((e) => e.id)).toEqual(['aws-saa']);
    });

    it('NavExam.items は試験トップ（概要）+ domains を含む', () => {
        // Arrange & Act
        const result = toNavTree([gcpAce]);
        const group = result[0];
        expect(group).toBeDefined();
        if (!group) return;

        const aceExam = group.exams[0];
        expect(aceExam).toBeDefined();
        if (!aceExam) return;

        // Assert
        const item0 = aceExam.items[0];
        expect(item0).toBeDefined();
        if (!item0) return;
        expect(item0.href).toBe('/gcl/associate-cloud-engineer');
        expect(item0.label).toBe('概要');

        expect(aceExam.items).toHaveLength(2);

        const item1 = aceExam.items[1];
        expect(item1).toBeDefined();
        if (!item1) return;
        expect(item1.href).toBe('/gcl/associate-cloud-engineer/domain1');
    });

    it('NavExam に id/label/icon/colorClass がコピーされる', () => {
        // Arrange & Act
        const result = toNavTree([gcpAce]);
        const group = result[0];
        expect(group).toBeDefined();
        if (!group) return;

        const aceExam = group.exams[0];
        expect(aceExam).toBeDefined();
        if (!aceExam) return;

        // Assert
        expect(aceExam.id).toBe('ace');
        expect(aceExam.label).toBe('Associate Cloud Engineer');
        expect(aceExam.icon).toBe('⚙️');
        expect(aceExam.colorClass).toBe('card-ace');
    });

    it('AWS の status: coming-soon が NavExam に伝播する', () => {
        // Arrange & Act
        const result = toNavTree([awsSaa]);

        // Assert
        const group = result[0];
        expect(group).toBeDefined();
        if (!group) return;
        expect(group.provider).toBe('AWS');

        const exam = group.exams[0];
        expect(exam).toBeDefined();
        if (!exam) return;
        expect(exam.status).toBe('coming-soon');
    });

    it('domain.href が exam.href と一致する場合、items から重複を除去する', () => {
        // Arrange: 概要相当の domain を持つ試験（PCNE 実構造の再現）
        const examWithDupTop: Exam = {
            ...gcpAce,
            href: '/exam/x',
            domains: [
                { label: '概要相当', href: '/exam/x', pct: '—' },
                { label: 'サブ', href: '/exam/x/sub', pct: '—' },
            ],
        };

        // Act
        const result = toNavTree([examWithDupTop]);
        const group = result[0];
        expect(group).toBeDefined();
        if (!group) return;

        const exam = group.exams[0];
        expect(exam).toBeDefined();
        if (!exam) return;
        const items = exam.items;

        // Assert
        expect(items.map((i) => i.href)).toEqual(['/exam/x', '/exam/x/sub']);
    });

    it('生成された全 href に重複がない', () => {
        // Arrange & Act
        const result = toNavTree([gcpAce, gcpGenAi, awsSaa]);
        const allHrefs = result.flatMap((g) => g.exams.flatMap((e) => e.items.map((i) => i.href)));

        // Assert
        expect(new Set(allHrefs).size).toBe(allHrefs.length);
    });

    describe('実 EXAMS との結合', () => {
        it('現行 EXAMS から全 4 プロバイダーのグループが生成される', () => {
            // Arrange & Act
            const result = toNavTree(EXAMS);

            // Assert
            const providers = result.map((g: NavGroup) => g.provider);
            expect(result).toHaveLength(4);
            expect(providers).toEqual(['GCP', 'AWS', 'Cisco', 'CompTIA']);
        });

        it('Cisco グループに ccna 試験が含まれる', () => {
            // Arrange & Act
            const result = toNavTree(EXAMS);
            const cisco = result.find((g) => g.provider === 'Cisco');

            // Assert
            expect(cisco).toBeDefined();
            if (!cisco) return;
            const ids = cisco.exams.map((e) => e.id);
            expect(ids).toContain('ccna');
        });

        it('CCNA と CCNAAUTO を独立した6ドメインの試験として保持する', () => {
            const ccna = EXAMS.find((exam) => exam.id === 'ccna');
            const ccnaauto = EXAMS.find((exam) => exam.id === 'ccnaauto');

            expect(ccna?.domains.map(({ label, pct }) => ({ label, pct }))).toEqual([
                { label: '1.0 Network Fundamentals（ネットワークの基礎）', pct: '20%' },
                { label: '2.0 Network Access（ネットワークアクセス）', pct: '20%' },
                { label: '3.0 IP Connectivity（IP接続性）', pct: '25%' },
                { label: '4.0 IP Services（IP サービス）', pct: '10%' },
                { label: '5.0 Security Fundamentals（セキュリティ基礎）', pct: '15%' },
                {
                    label: '6.0 Automation and Programmability（自動化とプログラマビリティ）',
                    pct: '10%',
                },
            ]);
            const ccnaautoOnlyHrefs = new Set([
                '/cisco/ccna/automation-api-guide',
                '/cisco/ccna/automation-software-development-design',
                '/cisco/ccna/automation-cisco-platforms-and-development',
                '/cisco/ccna/automation-application-deployment-security',
                '/cisco/ccna/automation-infrastructure-and-automation',
                '/cisco/ccna/automation-network-fundamentals',
            ]);
            expect(
                ccna?.domains.every(({ href }) => !ccnaautoOnlyHrefs.has(href)),
            ).toBe(true);
            expect(ccnaauto?.domains).toHaveLength(7);
            expect(
                ccnaauto?.domains.every(
                    ({ href }) => href.includes('/automation-') || href.includes('/devnet-associate')
                )
            ).toBe(true);
        });

        it('GCP グループに ace, agwa, cdl, genai, pca, pcne, hands-on 試験が含まれる', () => {
            // Arrange & Act
            const result = toNavTree(EXAMS);
            const gcp = result.find((g) => g.provider === 'GCP');

            // Assert
            expect(gcp).toBeDefined();
            if (!gcp) return;
            const ids = gcp.exams.map((e) => e.id).sort();
            expect(ids).toEqual(['ace', 'agwa', 'cdl', 'genai', 'hands-on', 'pca', 'pcne']);
        });

        it('AWS グループに公開済み試験が含まれる', () => {
            // Arrange & Act
            const result = toNavTree(EXAMS);
            const aws = result.find((g) => g.provider === 'AWS');

            // Assert
            expect(aws).toBeDefined();
            if (!aws) return;
            expect(aws.exams.length).toBeGreaterThan(0);
            expect(aws.exams.some((e) => e.id === 'aws-saa' && e.status !== 'coming-soon')).toBe(true);
        });

        it('overviewLabel が指定された場合、items の先頭ラベルにその文字列が使用されること', () => {
            // Arrange & Act
            const result = toNavTree(EXAMS);
            const gcp = result.find((g) => g.provider === 'GCP');
            const handsOn = gcp?.exams.find((e) => e.id === 'hands-on');
            const cisco = result.find((g) => g.provider === 'Cisco');
            const ccie = cisco?.exams.find((e) => e.id === 'ccie-enterprise-infrastructure');

            // Assert
            expect(handsOn).toBeDefined();
            expect(handsOn?.items[0]?.label).toBe('IAP（Identity-Aware Proxy）TCP フォワーディング');
            expect(ccie).toBeDefined();
            expect(ccie?.items[0]?.label).toBe('完全解説ガイド');
        });
    });

    describe('エッジケースと無効なデータ', () => {
        it('未知のプロバイダが指定された場合、出力のグループ一覧から無視されること', () => {
            // Arrange
            const unknownExam = {
                id: 'unknown-exam',
                label: 'Unknown Exam',
                abbr: 'UNK',
                level: 'Foundational',
                score: '---',
                color: 'card-unknown',
                href: '/unknown',
                domains: [],
                badge: 'テスト',
                icon: '❓',
                provider: 'AZURE' as unknown as Exam['provider'], // 未知のプロバイダ
            };

            // Act
            const result = toNavTree([unknownExam]);

            // Assert
            expect(result).toEqual([]);
        });
    });
});
