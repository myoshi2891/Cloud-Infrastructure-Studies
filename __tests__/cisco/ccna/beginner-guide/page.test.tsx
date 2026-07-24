import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CcnaBeginnerGuidePage from '@/app/cisco/ccna/beginner-guide/page';

// Mock MermaidDiagram to avoid dynamic import / browser execution issues in Vitest
vi.mock('@/components/MermaidDiagram', () => ({
    MermaidDiagram: ({ chart, ariaLabel, preserveNaturalScale }: { chart: string; ariaLabel?: string; preserveNaturalScale?: boolean }) => (
        <div
            data-testid="mermaid-diagram"
            data-chart={chart}
            data-natural-scale={preserveNaturalScale}
            aria-label={ariaLabel}
        >
            Mermaid Diagram Mock
        </div>
    ),
}));

describe('CcnaBeginnerGuidePage', () => {
    it('renders main heading and hero eyebrow correctly', () => {
        render(<CcnaBeginnerGuidePage />);

        const mainHeading = screen.getByRole('heading', {
            level: 1,
            name: /Cisco CCNA試験 完全ガイド/i,
        });
        expect(mainHeading).toBeInTheDocument();

        expect(screen.getByText('Beginner-Friendly Certification Guide')).toBeInTheDocument();
    });

    it('renders all 12 sections with section headings', () => {
        render(<CcnaBeginnerGuidePage />);

        const sectionTitles = [
            'CCNAとは何か',
            'CCNA認定の全体像',
            '200-301 CCNA試験の基本情報',
            '試験の出題範囲（6つのドメイン）',
            '各ドメインの詳細な学習内容',
            '出題形式（どんな問題が出るのか）',
            '合格までの学習ロードマップ（8ステップ）',
            '試験当日の流れ',
            '2027年のCCNA試験改定（v2.0）',
            '初学者がつまずきやすいポイントと対策',
            'よくある質問（FAQ）',
            '参考情報源（出典一覧）',
        ];

        // 各 title はサイドバー目次リンクと本文見出しの両方に出現するため、
        // getByText の単一マッチ要求ではなく getAllByText で「1 箇所以上に存在」を検証する
        sectionTitles.forEach((title) => {
            expect(screen.getAllByText(new RegExp(title, 'i')).length).toBeGreaterThan(0);
        });
    });

    it('renders table of contents navigation in sidebar', () => {
        render(<CcnaBeginnerGuidePage />);

        const tocNav = screen.getByRole('navigation', { name: /Table of Contents/i });
        expect(tocNav).toBeInTheDocument();

        const links = screen.getAllByRole('link', { name: /CCNAとは何か|出題範囲|合格までの学習ロードマップ/i });
        expect(links.length).toBeGreaterThan(0);
    });

    it('renders 5 mermaid diagrams', () => {
        const { container } = render(<CcnaBeginnerGuidePage />);

        const diagrams = screen.getAllByTestId('mermaid-diagram');
        expect(diagrams).toHaveLength(5);
        diagrams.forEach((diagram) => expect(diagram).toHaveAttribute('data-natural-scale', 'true'));

        const widths: Record<string, string> = {
            m1: '1100px',
            m2: '760px',
            m3: '760px',
            m4: '760px',
            m5: '1240px',
        };
        Object.entries(widths).forEach(([id, width]) => {
            expect(container.querySelector(`[data-diagram-id="${id}"]`)).toHaveStyle({ maxWidth: width });
        });
    });
});
