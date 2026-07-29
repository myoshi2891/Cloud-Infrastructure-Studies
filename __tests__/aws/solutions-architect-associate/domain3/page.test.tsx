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

        expect(screen.getByRole('heading', { name: /Task 3.1: 高性能・スケーラブルなストレージ/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Task 3.2: 高性能で弾力性のあるコンピューティング/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Task 3.3: 高性能なデータベースソリューション/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Task 3.4: 高性能・スケーラブルなネットワーク/i })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: /Task 3.5: 高性能なデータ取り込み・変換/i })).toBeInTheDocument();
    });

    it('contains 27 valid mermaid diagrams in constants', () => {
        expect(Object.keys(DIAGRAMS).length).toBe(27);
    });

    it('renders tables correctly in the guide', () => {
        const { container } = render(<Domain3Guide />);
        const tables = container.querySelectorAll('table');
        expect(tables.length).toBeGreaterThan(0);
    });
});
