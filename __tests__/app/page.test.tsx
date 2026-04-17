import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Home from '@/app/page';
import { EXAMS, STATS } from '@/app/constants';

describe('Home ページ', () => {
    it('試験カードが EXAMS の数だけ表示されること', () => {
        const { container } = render(<Home />);
        const cards = container.querySelectorAll('.home-card');
        expect(cards).toHaveLength(EXAMS.length);
    });

    it('各試験カードの ID がアーティクル要素として存在すること', () => {
        render(<Home />);
        const articles = screen.getAllByRole('article');
        expect(articles).toHaveLength(EXAMS.length);
    });

    it('最初の試験（ACE）のドメインリンクがすべて存在すること', () => {
        const { container } = render(<Home />);
        const firstCard = container.querySelector('.card-ace');
        expect(firstCard).toBeInTheDocument();
        const domainLinks = (firstCard as HTMLElement).querySelectorAll('.home-domain-link');
        expect(domainLinks).toHaveLength(EXAMS[0]!.domains.length);
    });

    it('ドメインリンクに home-domain-link クラスが付与されること', () => {
        const { container } = render(<Home />);
        const domainLinks = container.querySelectorAll('.home-domain-link');
        const expectedCount = EXAMS.reduce((acc, exam) => acc + exam.domains.length, 0);
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

    it('ヒーローセクションに "3試験対応" バッジが含まれること', () => {
        render(<Home />);
        expect(screen.getByText(/3試験対応/)).toBeInTheDocument();
    });

    it('CDL カードのドメインリンクが 1 件のみ（セクションページ未実装のため集約）', () => {
        const { container } = render(<Home />);
        const cdlCard = container.querySelector('.card-cdl');
        expect(cdlCard).toBeInTheDocument();
        const domainLinks = within(cdlCard as HTMLElement).getAllByRole('link');
        // CTA を除くドメインリンクが 1 件 = CDL.domains.length
        const cdlExam = EXAMS.find((e) => e.id === 'cdl');
        expect(cdlExam).toBeDefined();
        expect(cdlExam!.domains).toHaveLength(1);
        // ドメインリンク 1 本 + CTA 1 本 = 計 2 本
        expect(domainLinks).toHaveLength(2);
    });
});
