// __tests__/gcl/pcne-section2-vpc-implementation.test.tsx
// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import inventory from '@/docs/migration-inventory/pcne-s2-vpc-implementation.json';
import Page from '@/app/gcl/professional-cloud-network-engineer/section2-vpc-implementation/page';

// MermaidDiagram は名前付きエクスポート。
vi.mock('@/components/MermaidDiagram', () => ({
    MermaidDiagram: ({ chart, ariaLabel, decorative, preserveNaturalScale }: {
        chart: string;
        ariaLabel?: string;
        decorative?: boolean;
        preserveNaturalScale?: boolean;
    }) => (
        <div
            data-testid="mermaid-diagram"
            data-chart={chart}
            data-decorative={String(decorative === true)}
            data-preserve-natural-scale={String(preserveNaturalScale)}
            aria-label={ariaLabel}
            aria-hidden={decorative || undefined}
        />
    ),
}));

/** 空白差・改行差を無視して比較するための正規化 */
const squash = (value: string): string => value.replace(/\s+/g, '');
const normalize = (value: string): string => value.replace(/\s+/g, ' ').trim();

describe('PCNE Section 2 VPC Implementation Migration Verification', () => {
    it('renders page metadata and components completely matching inventory', () => {
        const { container } = render(<Page />);
        const fullText = container.textContent ?? '';
        const squashedFullText = squash(fullText);

        // 1. h1〜h3 見出しの全量一致
        const allHeadings = [...inventory.h1, ...inventory.h2, ...inventory.h3];
        for (const heading of allHeadings) {
            expect(squashedFullText).toContain(squash(heading));
        }

        // 2. 表の数・th・td 全セルの全量一致
        const tables = container.querySelectorAll('table');
        expect(tables.length).toBe(inventory.counts.table);

        for (const thText of inventory.th) {
            expect(squashedFullText).toContain(squash(thText));
        }
        for (const tdText of inventory.td) {
            expect(squashedFullText).toContain(squash(tdText));
        }

        // 3. 図解 (Mermaid) の件数検証
        const diagrams = container.querySelectorAll('[data-testid="mermaid-diagram"]');
        expect(diagrams.length).toBe(inventory.counts.diagram);

        // 4. 外部リンクの検証
        for (const link of inventory.links) {
            const anchor = container.querySelector(`a[href="${link.href}"]`);
            expect(anchor).not.toBeNull();
        }
    });
});
