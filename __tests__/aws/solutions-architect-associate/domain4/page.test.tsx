// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Domain4Guide } from '@/app/aws/solutions-architect-associate/domain4/Domain4Guide';
import { DIAGRAMS } from '@/app/aws/solutions-architect-associate/domain4/constants';

vi.mock('@/components/MermaidDiagram', () => ({
    MermaidDiagram: function DummyMermaidDiagram({ chart, ariaLabel }: { chart: string; ariaLabel?: string }) {
        return <div data-testid="mermaid" aria-label={ariaLabel}>{chart}</div>;
    },
}));

describe('AWS SAA Domain 4 Guide Page', () => {
    it('renders header, title and main task statements correctly', () => {
        render(<Domain4Guide />);

        expect(screen.getAllByText(/マルチアカウント請求/i).length).toBeGreaterThan(0);
        expect(screen.getByText(/Athena や QuickSight \(Amazon Quick Suite\) と連携し/i)).toBeInTheDocument();
        expect(screen.getByText(/スキル: 適切なスケーリング方式の判断\(水平 vs 垂直\)/i)).toBeInTheDocument();
        expect(screen.getByText(/スキル: コスト効率の良いデータベースタイプの判断\(時系列・列指向\)/i)).toBeInTheDocument();
        expect(screen.getByText(/VPCエンドポイントによるコスト削減/i)).toBeInTheDocument();

        expect(screen.getByRole('heading', { name: /Task 4.1: コスト最適化ストレージソリューションの設計/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Task 4.2: コスト最適化コンピューティングソリューションの設計/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Task 4.3: コスト最適化データベースソリューションの設計/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Task 4.4: コスト最適化ネットワークアーキテクチャの設計/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /参考文献/i })).toBeInTheDocument();
    });

    it('contains exactly 29 valid mermaid diagrams in constants', () => {
        expect(Object.keys(DIAGRAMS).length).toBe(29);
    });

    it('renders the expected top-level heading structure', () => {
        const { container } = render(<Domain4Guide />);
        const main = container.querySelector('main.content');
        expect(main).not.toBeNull();

        const h2Ids = Array.from(main!.querySelectorAll('h2')).map((heading) => heading.id);
        expect(h2Ids).toEqual([
            'intro',
            'common-tools',
            'task-4-1',
            'task-4-2',
            'task-4-3',
            'task-4-4',
            'references',
        ]);

        expect(main!.querySelectorAll('h3').length).toBeGreaterThanOrEqual(15);
    });

    it('renders tables correctly with expected headers and row cells', () => {
        const { container } = render(<Domain4Guide />);
        const tables = container.querySelectorAll('table');
        expect(tables.length).toBeGreaterThanOrEqual(10);

        tables.forEach((table) => {
            const ths = table.querySelectorAll('thead th');
            expect(ths.length).toBeGreaterThan(0);
            const trs = table.querySelectorAll('tbody tr');
            expect(trs.length).toBeGreaterThan(0);
        });

        const tableContents = Array.from(tables).map((table) => table.textContent ?? '');
        expect(
            tableContents.some((content) =>
                content.includes('AWS Organizations 連結請求(マルチアカウント請求)')
            )
        ).toBe(true);
        expect(tableContents.some((content) => content.includes('S3 Standard'))).toBe(true);
        expect(tableContents.some((content) => content.includes('Intelligent-Tiering'))).toBe(true);
        expect(tableContents.some((content) => content.includes('Savings Plans'))).toBe(true);
    });

    it('renders all 29 figure IDs and supplementary-skill text correctly', () => {
        render(<Domain4Guide />);
        const diagramElements = screen.getAllByTestId('mermaid');
        expect(diagramElements.length).toBe(29);

        const renderedCharts = diagramElements.map((el) => el.textContent);
        const diagramIds = Object.keys(DIAGRAMS);
        expect(diagramIds.length).toBe(29);

        diagramIds.forEach((id) => {
            expect(DIAGRAMS[id]).toBeDefined();
            expect(typeof DIAGRAMS[id]).toBe('string');
            expect(renderedCharts).toContain(DIAGRAMS[id]);
        });

        expect(screen.getByText(/スキル: 適切なスケーリング方式の判断\(水平 vs 垂直\)/i)).toBeInTheDocument();
        expect(screen.getByText(/スキル: コスト効率の良いデータベースタイプの判断\(時系列・列指向\)/i)).toBeInTheDocument();
    });

    it('renders source and reference links with correct href attributes', () => {
        const { container } = render(<Domain4Guide />);
        const references = container.querySelector('#references')?.parentElement;
        expect(references).not.toBeNull();

        const links = references!.querySelectorAll('a[target="_blank"]');
        expect(links.length).toBeGreaterThanOrEqual(10);

        const hrefs = Array.from(links).map((a) => a.getAttribute('href'));
        expect(hrefs.some((h) => h?.includes('wellarchitected/latest/cost-optimization-pillar'))).toBe(true);
    });
});
