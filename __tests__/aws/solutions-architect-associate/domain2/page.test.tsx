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
        expect(h1Elements[0]).toHaveTextContent(/ドメイン2: 回復力のあるアーキテクチャの設計/i);

        expect(screen.getByRole('heading', {
            level: 2,
            name: /タスク2.1: スケーラブルで疎結合なアーキテクチャの設計/i,
        })).toBeInTheDocument();
        expect(screen.getByRole('heading', {
            level: 2,
            name: /タスク2.2: 高可用性・フォールトトレラントなアーキテクチャの設計/i,
        })).toBeInTheDocument();
    });

    it('has custom theme initialization directive for pie chart m1', () => {
        expect(DIAGRAMS.m1).toContain('%%{init:');
        expect(DIAGRAMS.m1).toContain('pie1');
    });

    it('does not contain problematic fullwidth wave dash in m16', () => {
        expect(DIAGRAMS.m16).not.toContain('〜');
    });

    it('renders all Mermaid diagrams', () => {
        render(<Domain2Guide />);
        expect(screen.getAllByTestId('mermaid')).toHaveLength(25);
    });
});
