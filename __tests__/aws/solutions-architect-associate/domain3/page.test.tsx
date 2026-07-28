// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Domain3Guide } from '@/app/aws/solutions-architect-associate/domain3/Domain3Guide';
import { DIAGRAMS } from '@/app/aws/solutions-architect-associate/domain3/constants';

vi.mock('@/components/MermaidDiagram', () => ({
    MermaidDiagram: function DummyMermaidDiagram({ chart, ariaLabel }: { chart: string; ariaLabel?: string }) {
        return <div data-testid="mermaid" aria-label={ariaLabel}>{chart}</div>;
    },
}));

describe('AWS SAA Domain 3 Guide Page', () => {
    it('renders header, title and main task statements correctly', () => {
        render(<Domain3Guide />);

        const h1Elements = screen.getAllByRole('heading', { level: 1 });
        expect(h1Elements.length).toBeGreaterThan(0);
        expect(h1Elements[0]).toHaveTextContent(/ドメイン3: 高性能なアーキテクチャの設計/i);

        expect(screen.getByText(/Task 3.1: 高性能かつ費用対効果の高いストレージソリューションの決定/i)).toBeInTheDocument();
        expect(screen.getByText(/Task 3.2: 高性能で弾力性のあるコンピューティングソリューションの決定/i)).toBeInTheDocument();
        expect(screen.getByText(/Task 3.3: 高性能なデータベースソリューションの設計/i)).toBeInTheDocument();
        expect(screen.getByText(/Task 3.4: 高性能なネットワークアーキテクチャの設計/i)).toBeInTheDocument();
        expect(screen.getByText(/Task 3.5: 高性能なデータアクセスのためのデータ転送・インジェスチョンソリューション/i)).toBeInTheDocument();
    });

    it('contains valid mermaid diagrams', () => {
        expect(Object.keys(DIAGRAMS).length).toBeGreaterThan(0);
    });

    it('renders syntax highlighted elements in code blocks', () => {
        const { container } = render(<Domain3Guide />);
        const codeLines = container.querySelectorAll('.code-line');
        expect(codeLines.length).toBeGreaterThan(0);
    });
});
