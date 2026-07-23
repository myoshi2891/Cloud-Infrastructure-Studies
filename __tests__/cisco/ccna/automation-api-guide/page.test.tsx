import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CcnaAutomationApiPage from '@/app/cisco/ccna/automation-api-guide/page';

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

describe('CcnaAutomationApiPage', () => {
    it('renders main heading and hero eyebrow correctly', () => {
        render(<CcnaAutomationApiPage />);

        const mainHeading = screen.getByRole('heading', {
            level: 1,
            name: /APIの理解と活用 完全ガイド/i,
        });
        expect(mainHeading).toBeInTheDocument();

        expect(screen.getByText(/CCNA AUTOMATION · 200-901 CCNAAUTO/i)).toBeInTheDocument();
    });

    it('renders key section headings', () => {
        render(<CcnaAutomationApiPage />);

        const sectionTitles = [
            'この記事について',
            'CCNA Automation 試験の全体像',
            '学習ロードマップ',
            'Step 0: そもそも「API」とは何か',
            'Step 1（試験項目2.8）: APIの方式を比較する',
            'Step 2（試験項目2.1）: ドキュメントからREST APIリクエストを組み立てる',
            'Step 3（試験項目2.6）: HTTPレスポンスの構造を読み解く',
            'Step 4（試験項目2.4）: 主要なHTTPステータスコードを理解する',
            'Step 5（試験項目2.7）: API認証方式を使い分ける',
            'Step 6（試験項目2.3）: APIを使ううえでの制約を理解する',
            'Step 7（試験項目2.2）: Webhookの活用パターンを理解する',
            'Step 8（試験項目2.5）: ステータスコードから障害を切り分ける',
            'Step 9（試験項目2.9）: Pythonのrequestsライブラリで実装する',
            'まとめ: 試験項目とこのガイドの対応表',
            'さらに学ぶために（関連する試験項目とのつながり）',
            '出典・参考資料',
        ];

        sectionTitles.forEach((title) => {
            expect(screen.getByText(new RegExp(title, 'i'))).toBeInTheDocument();
        });
    });

    it('renders sidebar navigation links correctly', () => {
        const { container } = render(<CcnaAutomationApiPage />);

        const tocNav = screen.getByRole('navigation', { name: /目次ナビゲーション/i });
        expect(tocNav).toBeInTheDocument();

        const links = screen.getAllByRole('link', { name: /APIの方式を比較する|HTTPステータスコード|Pythonのrequestsライブラリ/i });
        expect(links.length).toBeGreaterThan(0);

        const aside = container.querySelector('aside');
        expect(aside).toHaveClass('sidebar');
    });

    it('renders 9 mermaid diagrams', () => {
        const { container } = render(<CcnaAutomationApiPage />);

        const diagrams = screen.getAllByTestId('mermaid-diagram');
        expect(diagrams).toHaveLength(9);
        diagrams.forEach((diagram) => expect(diagram).toHaveAttribute('data-natural-scale', 'true'));

        const widths: Record<string, string> = {
            'diag-0': '760px',
            'diag-1': '860px',
            'diag-2': '760px',
            'diag-3': '760px',
            'diag-4': '760px',
            'diag-5': '760px',
            'diag-6': '760px',
            'diag-7': '860px',
            'diag-8': '860px',
        };
        Object.entries(widths).forEach(([id, width]) => {
            expect(container.querySelector(`[data-diagram-id="${id}"]`)).toHaveStyle({ maxWidth: width });
        });
    });

    it('renders code blocks with syntax highlighting classes', () => {
        const { container } = render(<CcnaAutomationApiPage />);

        const keywords = container.querySelectorAll('span.keyword');
        const comments = container.querySelectorAll('span.comment');
        const strings = container.querySelectorAll('span.string');

        expect(keywords.length).toBeGreaterThan(0);
        expect(comments.length).toBeGreaterThan(0);
        expect(strings.length).toBeGreaterThan(0);
    });
});
