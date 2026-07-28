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
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/AWS Certified Solutions Architect – Associate/i);
    });
});
