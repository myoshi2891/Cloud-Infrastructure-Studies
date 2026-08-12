import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Home from '@/app/page';
import { EXAMS, STATS } from '@/app/constants';

const VISIBLE_EXAMS = EXAMS.filter((e) => e.status !== 'coming-soon');

describe('Home ページ', () => {
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
});
