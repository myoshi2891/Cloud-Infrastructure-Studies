// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Domain2Guide } from '@/app/aws/solutions-architect-associate/domain2/Domain2Guide';
import { DIAGRAMS } from '@/app/aws/solutions-architect-associate/domain2/constants';

vi.mock('@/components/MermaidDiagram', () => ({
    MermaidDiagram: function DummyMermaidDiagram({ chart, ariaLabel }: { chart: string; ariaLabel?: string }) {
        return <div data-testid="mermaid" aria-label={ariaLabel}>{chart}</div>;
    },
}));

describe('AWS SAA Domain 2 Guide Page', () => {
    it('renders header, title and main task statements correctly', () => {
        render(<Domain2Guide />);

        const h1Elements = screen.getAllByRole('heading', { level: 1 });
        expect(h1Elements.length).toBeGreaterThan(0);
        expect(h1Elements[0]).toHaveTextContent(/ドメイン2: 高性能なアーキテクチャの設計/i);

        expect(screen.getByText(/タスク2.1: 高パフォーマンスかつスケーラブルなストレージ/i)).toBeInTheDocument();
        expect(screen.getByText(/タスク2.2: 高パフォーマンスかつ弾力性のあるコンピューティング/i)).toBeInTheDocument();
        expect(screen.getByText(/タスク2.3: 高パフォーマンスなデータベースソリューション/i)).toBeInTheDocument();
        expect(screen.getByText(/タスク2.4: 高パフォーマンスなネットワークアーキテクチャ/i)).toBeInTheDocument();
    });

    it('has custom theme initialization directive for pie chart m1', () => {
        expect(DIAGRAMS.m1).toContain('%%{init:');
        expect(DIAGRAMS.m1).toContain('pie1');
    });

    it('does not contain problematic fullwidth wave dash in m16', () => {
        expect(DIAGRAMS.m16).not.toContain('〜');
    });

    it('renders syntax highlighted elements in code blocks', () => {
        const { container } = render(<Domain2Guide />);
        const codeLines = container.querySelectorAll('.code-line');
        expect(codeLines.length).toBeGreaterThan(0);
    });
});
