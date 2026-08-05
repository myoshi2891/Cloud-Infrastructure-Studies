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

        const h1Elements = screen.getAllByRole('heading', { level: 1 });
        expect(h1Elements.length).toBeGreaterThan(0);
        expect(h1Elements[0]).toHaveTextContent(/ドメイン4: コスト最適化アーキテクチャの設計 完全ガイド/i);

        expect(screen.getAllByText(/AWS CERTIFIED SOLUTIONS ARCHITECT - ASSOCIATE/i).length).toBeGreaterThan(0);
        expect(screen.getByText(/出題比率 20%/i)).toBeInTheDocument();
        expect(screen.getAllByText(/AWS Certified Solutions Architect - Associate \(SAA-C03\) 試験対応/i).length).toBeGreaterThan(0);
        expect(screen.getByText(/SAA-C03 試験ガイド準拠/i)).toBeInTheDocument();

        expect(screen.getByRole('heading', { name: /Task 4.1: コスト最適化ストレージソリューションの設計/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Task 4.2: コスト最適化コンピューティングソリューションの設計/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Task 4.3: コスト最適化データベースソリューションの設計/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Task 4.4: コスト最適化ネットワークアーキテクチャの設計/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /参考文献/i })).toBeInTheDocument();
    });

    it('contains valid mermaid diagrams in constants', () => {
        expect(Object.keys(DIAGRAMS).length).toBeGreaterThan(0);
    });

    it('renders tables correctly in the guide', () => {
        const { container } = render(<Domain4Guide />);
        const tables = container.querySelectorAll('table');
        expect(tables.length).toBeGreaterThan(0);
    });
});
