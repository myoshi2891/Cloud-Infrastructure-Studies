import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CcnaSoftwareDevDesignPage from '@/app/cisco/ccna/automation-software-development-design/page';

// Mock MermaidDiagram to avoid dynamic import / browser execution issues in Vitest
vi.mock('@/components/MermaidDiagram', () => ({
    MermaidDiagram: ({ chart, ariaLabel }: { chart: string; ariaLabel?: string }) => (
        <div data-testid="mermaid-diagram" data-chart={chart} aria-label={ariaLabel}>
            Mermaid Diagram Mock
        </div>
    ),
}));

describe('CcnaSoftwareDevDesignPage', () => {
    it('renders main heading and hero eyebrow correctly', () => {
        render(<CcnaSoftwareDevDesignPage />);

        const mainHeading = screen.getByRole('heading', {
            level: 1,
            name: /ソフトウェア開発と設計 完全ガイド/i,
        });
        expect(mainHeading).toBeInTheDocument();

        expect(screen.getByText(/CCNA AUTOMATION · 200-901 CCNAAUTO/i)).toBeInTheDocument();
    });

    it('renders all 13 sections with section headings', () => {
        render(<CcnaSoftwareDevDesignPage />);

        const sectionTitles = [
            'この認定と試験について',
            '試験全体のドメイン構成',
            'データフォーマットの比較',
            'データフォーマットをPythonのデータ構造にパースする',
            'テスト駆動開発（TDD）の概念',
            'ソフトウェア開発手法の比較',
            'コードを関数・クラス・モジュールに整理する利点',
            '代表的なデザインパターン',
            'バージョン管理の利点',
            'Gitの基本操作',
            '実践シナリオでつなげて理解する',
            '学習チェックリスト・理解度クイズ',
            '参考ソース',
        ];

        sectionTitles.forEach((title) => {
            expect(screen.getByText(new RegExp(title, 'i'))).toBeInTheDocument();
        });
    });

    it('renders sidebar navigation links correctly', () => {
        const { container } = render(<CcnaSoftwareDevDesignPage />);

        const tocNav = screen.getByRole('navigation', { name: /目次ナビゲーション/i });
        expect(tocNav).toBeInTheDocument();

        const links = screen.getAllByRole('link', { name: /データフォーマットの比較|テスト駆動開発|Gitの基本操作/i });
        expect(links.length).toBeGreaterThan(0);

        const aside = container.querySelector('aside');
        expect(aside).toHaveClass('sidebar');
    });

    it('renders 12 mermaid diagrams', () => {
        render(<CcnaSoftwareDevDesignPage />);

        const diagrams = screen.getAllByTestId('mermaid-diagram');
        expect(diagrams).toHaveLength(12);
    });

    it('renders code blocks with syntax highlighting classes', () => {
        const { container } = render(<CcnaSoftwareDevDesignPage />);

        const keywords = container.querySelectorAll('span.keyword');
        const comments = container.querySelectorAll('span.comment');
        const strings = container.querySelectorAll('span.string');

        expect(keywords.length).toBeGreaterThan(0);
        expect(comments.length).toBeGreaterThan(0);
        expect(strings.length).toBeGreaterThan(0);
    });
});
