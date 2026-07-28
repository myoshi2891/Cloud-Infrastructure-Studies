// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Domain1Guide } from '@/app/aws/solutions-architect-associate/domain1/Domain1Guide';
import { DIAGRAMS } from '@/app/aws/solutions-architect-associate/domain1/constants';

vi.mock('@/components/MermaidDiagram', () => ({
    MermaidDiagram: function DummyMermaidDiagram({ chart, ariaLabel }: { chart: string; ariaLabel?: string }) {
        return <div data-testid="mermaid" aria-label={ariaLabel}>{chart}</div>;
    },
}));

describe('AWS SAA Domain 1 Guide Page', () => {
    it('renders header, title and main components correctly', () => {
        render(<Domain1Guide />);

        const h1Elements = screen.getAllByRole('heading', { level: 1 });
        expect(h1Elements.length).toBeGreaterThan(0);
        expect(h1Elements[0]).toHaveTextContent(/ドメイン1: セキュアなアーキテクチャの設計/i);

        expect(screen.getByText(/タスク1.1: AWSリソースへの安全なアクセス設計/i)).toBeInTheDocument();
        expect(screen.getByText(/タスク1.2: 安全なワークロードとアプリケーションの設計/i)).toBeInTheDocument();
        expect(screen.getByText(/タスク1.3: 適切なデータセキュリティコントロールの決定/i)).toBeInTheDocument();
    });

    it('has custom theme initialization directive for pie chart d01', () => {
        expect(DIAGRAMS.d01).toContain('%%{init:');
        expect(DIAGRAMS.d01).toContain('pie1');
    });
});
