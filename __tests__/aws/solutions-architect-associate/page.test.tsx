// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SaaGuide from '@/app/aws/solutions-architect-associate/SaaGuide';

// MermaidDiagram のモック化 (Vitest)
vi.mock('@/components/MermaidDiagram', () => ({
    MermaidDiagram: function DummyMermaidDiagram({ chart, ariaLabel }: { chart: string; ariaLabel?: string }) {
        return <div data-testid="mermaid" aria-label={ariaLabel}>{chart}</div>;
    },
}));

describe('AWS Solutions Architect Associate Guide Page', () => {
    it('renders main title and structure correctly', () => {
        render(<SaaGuide />);
        const h1Elements = screen.getAllByRole('heading', { level: 1 });
        expect(h1Elements.length).toBeGreaterThan(0);
        expect(h1Elements[0]).toHaveTextContent(/Solutions Architect – Associate \(SAA-C03\)/i);
    });
});
