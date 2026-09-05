// __tests__/recommended-books/systems-performance/page.test.tsx
// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import inventory from '@/docs/migration-inventory/systems-performance.json';
import Page from '@/app/recommended-books/systems-performance/page';
import { defineMigrationSuite } from '@/__tests__/gcl/agwa/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/gcl/agwa/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

defineMigrationSuite(
    'Systems Performance 実践ガイド — 全量移行検証',
    Page,
    inventory,
);

describe('Systems Performance 実践ガイド — 追加の詳細仕様検証', () => {
    const renderPage = () => {
        const { container } = render(<Page />);
        return container;
    };

    it('リスト(ul)が13箇所存在し、全49件のli項目がul内に正しく包含されている', () => {
        const container = renderPage();
        const uls = container.querySelectorAll('ul');
        expect(uls).toHaveLength(13);
        const lis = container.querySelectorAll('ul > li');
        expect(lis).toHaveLength(49);
    });

    it('参考文献グリッド(ref-grid)内に22件の参考文献カード(ref-card)が存在し、番号とリンクが一致する', () => {
        const container = renderPage();
        const refGrid = container.querySelector('.ref-grid');
        expect(refGrid).not.toBeNull();
        const cards = container.querySelectorAll('.ref-card');
        expect(cards).toHaveLength(22);
        cards.forEach((card, index) => {
            const num = card.querySelector('.num');
            expect(num?.textContent?.trim()).toBe(String(index + 1));
            const link = card.querySelector('a');
            expect(link?.getAttribute('href')).toBe(inventory.links[index]?.href);
        });
    });

    it('全18点のMermaid図解がpreserveNaturalScale属性を保持している', () => {
        const container = renderPage();
        const diagrams = container.querySelectorAll('[data-testid="mermaid-diagram"]');
        expect(diagrams).toHaveLength(18);
        diagrams.forEach((diag) => {
            expect(diag.getAttribute('data-preserve-natural-scale')).toBe('true');
            expect(diag.getAttribute('aria-label')).toBeTruthy();
        });
    });
});
