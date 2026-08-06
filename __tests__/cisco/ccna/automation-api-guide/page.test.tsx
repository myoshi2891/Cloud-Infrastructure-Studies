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
            name: /CCNA Automation「APIの理解と活用」完全ガイド/i,
        });
        expect(mainHeading).toBeInTheDocument();

        expect(screen.getByText(/CCNA AUTOMATION · 200-901 CCNAAUTO/i)).toBeInTheDocument();
    });

    it('renders key section headings', () => {
        render(<CcnaAutomationApiPage />);

        const sectionTitles = [
            '1. この記事について',
            '2. CCNA Automation 試験の全体像',
            '3. 学習ロードマップ',
            '4. Step 0: そもそも「API」とは何か',
            '5. Step 1（試験項目2.8）: APIの方式を比較する',
            '6. Step 2（試験項目2.1）: ドキュメントからREST APIリクエストを組み立てる',
            '7. Step 3（試験項目2.6）: HTTPレスポンスの構造を読み解く',
            '8. Step 4（試験項目2.4）: 主要なHTTPステータスコードを理解する',
            '9. Step 5（試験項目2.7）: API認証方式を使い分ける',
            '10. Step 6（試験項目2.3）: APIを使ううえでの制約を理解する',
            '11. Step 7（試験項目2.2）: Webhookの活用パターンを理解する',
            '12. Step 8（試験項目2.5）: ステータスコードから障害を切り分ける',
            '13. Step 9（試験項目2.9）: Pythonのrequestsライブラリで実装する',
            '14. まとめ: 試験項目とこのガイドの対応表',
            '15. さらに学ぶために（関連する試験項目とのつながり）',
            '16. 出典・参考資料',
        ];

        sectionTitles.forEach((title) => {
            const headings = screen.getAllByRole('heading', { level: 2, name: new RegExp(title, 'i') });
            expect(headings.length).toBeGreaterThan(0);
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
            'diag-1': '1280px',
            'diag-2': '900px',
            'diag-3': '900px',
            'diag-4': '1100px',
            'diag-5': '900px',
            'diag-6': '800px',
            'diag-7': '1280px',
            'diag-8': '1280px',
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

    it('verifies Retry-After handling logic and 3600s cap in Python snippet', () => {
        const { container } = render(<CcnaAutomationApiPage />);

        const codeText = container.textContent || '';

        // Check for numeric Retry-After capped at 3600s
        expect(codeText).toContain('min(parsed_val, 3600)');

        // Check for HTTP-date parsing logic
        expect(codeText).toContain('parsedate_to_datetime(retry_after)');

        // Check for math.ceil calculation of datetime difference
        expect(codeText).toContain('math.ceil((dt - now).total_seconds())');

        // Check for fallback exponential backoff
        expect(codeText).toContain('2 ** attempt');
    });
});
