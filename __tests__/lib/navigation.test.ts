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
        const exams = [examWithoutProvider as any];

        // Act
        const result = toNavTree(exams);

        // Assert
        expect(result).toHaveLength(1);
        expect(result[0].provider).toBe('GCP');
        expect(result[0].exams).toHaveLength(1);
        expect(result[0].exams[0].id).toBe('ace');
    });

    it('GCP のみのとき AWS グループは生成されない', () => {
        // Arrange & Act
        const result = toNavTree([gcpAce, gcpGenAi]);

        // Assert
        expect(result.map((g: NavGroup) => g.provider)).toEqual(['GCP']);
        expect(result[0].exams).toHaveLength(2);
    });

    it('AWS 試験を含むと GCP・AWS の 2 グループに分かれる（GCP が先）', () => {
        // Arrange & Act
        const result = toNavTree([gcpAce, awsSaa, gcpGenAi]);

        // Assert
        expect(result).toHaveLength(2);
        expect(result[0].provider).toBe('GCP');
        expect(result[1].provider).toBe('AWS');
        expect(result[0].exams.map((e) => e.id)).toEqual(['ace', 'genai']);
        expect(result[1].exams.map((e) => e.id)).toEqual(['aws-saa']);
    });

    it('NavExam.items は試験トップ（概要）+ domains を含む', () => {
        // Arrange & Act
        const result = toNavTree([gcpAce]);
        const aceExam = result[0].exams[0];

        // Assert
        expect(aceExam.items[0].href).toBe('/gcl/associate-cloud-engineer');
        expect(aceExam.items[0].label).toBe('概要');
        expect(aceExam.items).toHaveLength(2);
        expect(aceExam.items[1].href).toBe('/gcl/associate-cloud-engineer/domain1');
    });

    it('NavExam に id/label/icon/colorClass がコピーされる', () => {
        // Arrange & Act
        const result = toNavTree([gcpAce]);
        const aceExam = result[0].exams[0];

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
        expect(result[0].provider).toBe('AWS');
        expect(result[0].exams[0].status).toBe('coming-soon');
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
        const items = result[0].exams[0].items;

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
        it('現行 EXAMS から GCP・AWS の 2 グループが生成される', () => {
            // Arrange & Act
            const result = toNavTree(EXAMS);

            // Assert
            const providers = result.map((g: NavGroup) => g.provider);
            expect(providers).toContain('GCP');
            expect(providers).toContain('AWS');
        });

        it('GCP グループに既存 5 試験すべてが含まれる', () => {
            // Arrange & Act
            const result = toNavTree(EXAMS);
            const gcp = result.find((g) => g.provider === 'GCP');

            // Assert
            expect(gcp).toBeDefined();
            const ids = gcp!.exams.map((e) => e.id).sort();
            expect(ids).toEqual(['ace', 'agwa', 'cdl', 'genai', 'pcne']);
        });

        it('AWS グループに準備中試験 (status: coming-soon) が含まれる', () => {
            // Arrange & Act
            const result = toNavTree(EXAMS);
            const aws = result.find((g) => g.provider === 'AWS');

            // Assert
            expect(aws).toBeDefined();
            expect(aws!.exams.length).toBeGreaterThan(0);
            expect(aws!.exams.some((e) => e.status === 'coming-soon')).toBe(true);
        });
    });

    describe('エッジケースと無効なデータ', () => {
        it('未知のプロバイダが指定された場合、出力のグループ一覧から無視されること（意図的な失敗）', () => {
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
                provider: 'AZURE' as any, // 未知のプロバイダ
            };

            // Act
            const result = toNavTree([unknownExam]);

            // Assert
            expect(result).toBe('intentionally-failing-wrong-value');
        });
    });
});
