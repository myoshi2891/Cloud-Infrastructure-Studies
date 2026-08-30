import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { existsSync, readFileSync } from 'node:fs';
import Home from '@/app/page';
import { EXAMS, STATS, type Exam } from '@/app/constants';
import { countUniqueGuideUrls } from '@/app/home-utils';

const VISIBLE_EXAMS = EXAMS.filter((e) => e.status !== 'coming-soon');

describe('Home ページ', () => {
    it('ヒーローのガイド数は試験ページとドメインページの重複 URL を除外すること', () => {
        const examA: Exam = {
            id: 'fixture-a',
            label: 'Fixture A',
            abbr: 'A',
            level: 'Associate',
            score: '100',
            color: 'card-ace',
            href: '/fixture-a',
            description: 'Fixture A description',
            domains: [
                { label: 'Shared guide', href: '/shared-guide', pct: '50%' },
                { label: 'Guide A', href: '/guide-a', pct: '50%' },
            ],
            badge: 'Fixture',
            icon: 'A',
            provider: 'GCP',
        };
        const examB: Exam = {
            id: 'fixture-b',
            label: 'Fixture B',
            abbr: 'B',
            level: 'Professional',
            score: '100',
            color: 'card-aws-saa',
            href: examA.domains[0]!.href,
            description: 'Fixture B description',
            domains: [{ label: 'Guide B', href: '/guide-b', pct: '100%' }],
            badge: 'Fixture',
            icon: 'B',
            provider: 'AWS',
        };

        expect(countUniqueGuideUrls([examA, examB])).toBe(4);
    });

    it('ホームはセクションコンポーネントの構成に専念すること', () => {
        const sectionFiles = ['Hero', 'ExamCard', 'ExamCatalog', 'Stats'].map(
            (name) => `components/sections/home/${name}.tsx`
        );

        sectionFiles.forEach((file) => expect(existsSync(file), file).toBe(true));

        const pageSource = readFileSync('app/page.tsx', 'utf8');
        expect(pageSource).not.toMatch(/function (Hero|ExamCard|ExamCatalog|Stats)\b/);
        expect(pageSource).toContain("from '@/components/sections/home/Hero'");
        expect(pageSource).toContain("from '@/components/sections/home/ExamCatalog'");
        expect(pageSource).toContain("from '@/components/sections/home/Stats'");
    });

    it('試験カードは公開済み (available) の試験数だけ表示されること', () => {
        const { container } = render(<Home />);
        const cards = container.querySelectorAll('.home-card');
        expect(cards).toHaveLength(VISIBLE_EXAMS.length);
    });

    it('各試験カードがアーティクル要素として存在すること', () => {
        render(<Home />);
        const articles = screen.getAllByRole('article');
        expect(articles).toHaveLength(VISIBLE_EXAMS.length);
    });

    it('coming-soon の試験はホームページに表示されないこと', () => {
        render(<Home />);
        const comingSoon = EXAMS.find((e) => e.status === 'coming-soon');
        if (!comingSoon) return; // 準備中試験がなければ常に pass
        expect(screen.queryByText(comingSoon.label)).not.toBeInTheDocument();
    });

    it('最初の試験（ACE）のドメインリンクがすべて存在すること', () => {
        const { container } = render(<Home />);
        const firstCard = container.querySelector('.card-ace');
        expect(firstCard).toBeInTheDocument();
        const domainLinks = (firstCard as HTMLElement).querySelectorAll('.home-domain-link');
        const firstExam = EXAMS[0];
        expect(firstExam).toBeDefined();
        if (!firstExam) return;
        expect(domainLinks).toHaveLength(firstExam.domains.length);
    });

    it('ドメインリンクに home-domain-link クラスが付与されること', () => {
        const { container } = render(<Home />);
        const domainLinks = container.querySelectorAll('.home-domain-link');
        const expectedCount = VISIBLE_EXAMS.reduce((acc, exam) => acc + exam.domains.length, 0);
        expect(domainLinks).toHaveLength(expectedCount);
    });

    it('stats セクションに統計値が含まれること', () => {
        const { container } = render(<Home />);
        const statsSection = container.querySelector('.home-stats-section');
        expect(statsSection).toBeInTheDocument();
        STATS.forEach((s) => {
            expect(within(statsSection as HTMLElement).getByText(s.value)).toBeInTheDocument();
        });
    });

    it('stats セクションに "50+" が含まれること', () => {
        const { container } = render(<Home />);
        const statsSection = container.querySelector('.home-stats-section');
        expect(statsSection).toBeInTheDocument();
        expect(within(statsSection as HTMLElement).getByText('50+')).toBeInTheDocument();
    });

    it('stats セクションに "600+" が含まれること', () => {
        const { container } = render(<Home />);
        const statsSection = container.querySelector('.home-stats-section');
        expect(statsSection).toBeInTheDocument();
        expect(within(statsSection as HTMLElement).getByText('600+')).toBeInTheDocument();
    });

    it('stats セクションに "100%" が含まれること', () => {
        const { container } = render(<Home />);
        const statsSection = container.querySelector('.home-stats-section');
        expect(statsSection).toBeInTheDocument();
        expect(within(statsSection as HTMLElement).getByText('100%')).toBeInTheDocument();
    });

    it('ヒーローセクションがマルチベンダー対応を示すこと', () => {
        render(<Home />);
        expect(screen.getByText(/Multi-vendor learning hub/i)).toBeInTheDocument();
        expect(screen.getByText(/Google Cloud・AWS・Cisco/)).toBeInTheDocument();
    });

    it('Google Cloud・AWS・Cisco のカタログ見出しが表示されること', () => {
        render(<Home />);
        for (const provider of ['Google Cloud', 'Amazon Web Services', 'Cisco']) {
            expect(screen.getByRole('heading', { name: provider })).toBeInTheDocument();
        }
    });

    it('CDL カードのドメインリンク数が EXAMS.domains.length と一致し、CTA 1 本が加算される', () => {
        const { container } = render(<Home />);
        const cdlCard = container.querySelector('.card-cdl');
        expect(cdlCard).toBeInTheDocument();
        const cdlExam = EXAMS.find((e) => e.id === 'cdl');
        expect(cdlExam).toBeDefined();
        if (!cdlExam) return;
        expect(cdlExam.domains.length).toBeGreaterThanOrEqual(1);
        const domainLinks = (cdlCard as HTMLElement).querySelectorAll('.home-domain-link');
        expect(domainLinks).toHaveLength(cdlExam.domains.length);
        const allLinks = (cdlCard as HTMLElement).querySelectorAll('a');
        expect(allLinks).toHaveLength(cdlExam.domains.length + 1);
    });
    it('Recommended Books セクションのカウントは exams ではなく books で数えること', () => {
        const { container } = render(<Home />);
        const booksSection = container.querySelector('#provider-books') as HTMLElement | null;
        expect(booksSection).not.toBeNull();
        const booksCount = VISIBLE_EXAMS.filter((e) => e.provider === 'Books').length;
        expect(
            within(booksSection as HTMLElement).getByText(`${booksCount} books`),
        ).toBeInTheDocument();
    });

    it('資格プロバイダのセクションカウントは引き続き exams で数えること', () => {
        const { container } = render(<Home />);
        const ciscoSection = container.querySelector('#provider-cisco') as HTMLElement | null;
        expect(ciscoSection).not.toBeNull();
        const ciscoCount = VISIBLE_EXAMS.filter((e) => e.provider === 'Cisco').length;
        expect(
            within(ciscoSection as HTMLElement).getByText(`${ciscoCount} exams`),
        ).toBeInTheDocument();
    });

    it('書籍カードの CTA は「この試験を学ぶ」ではなく「この書籍を読む」であること', () => {
        const { container } = render(<Home />);
        const booksSection = container.querySelector('#provider-books') as HTMLElement | null;
        expect(booksSection).not.toBeNull();
        const ctas = within(booksSection as HTMLElement).getAllByText('この書籍を読む');
        expect(ctas).toHaveLength(VISIBLE_EXAMS.filter((e) => e.provider === 'Books').length);
        expect(
            within(booksSection as HTMLElement).queryByText('この試験を学ぶ'),
        ).not.toBeInTheDocument();
    });
});
