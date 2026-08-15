// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import inventory from '@/docs/migration-inventory/agwa-section6.json';
import Page from '@/app/gcl/agwa/section6/page';

// MermaidDiagram は名前付きエクスポート。
vi.mock('@/components/MermaidDiagram', () => ({
    MermaidDiagram: ({
        chart,
        ariaLabel,
        decorative,
        preserveNaturalScale,
    }: {
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

const decodeEntities = (str: string) =>
    str
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");

describe('agwa-section6 — 監視とトラブルシューティング 移行元コンテンツの全量検証', () => {
    const renderPage = () => {
        const { container } = render(<Page />);
        return container;
    };

    it('見出しの件数と要素テキストが移行元インベントリと100%一致する', () => {
        const container = renderPage();
        const headings = [...container.querySelectorAll('h1, h2, h3, h4, h5')].map((el) =>
            squash(el.textContent ?? '')
        );
        const expectedHeadings = inventory.headings.map((h: { text: string }) => squash(decodeEntities(h.text)));
        
        expect(headings.length).toBe(expectedHeadings.length);
        expect(headings).toEqual(expectedHeadings);
    });

    it('表のセルテキスト（th, td）の件数と文言が移行元インベントリと100%一致する', () => {
        const container = renderPage();
        const cells = [...container.querySelectorAll('th, td')].map((el) =>
            squash(el.textContent ?? '')
        );
        const expectedCells = inventory.tableCells.map((c: string) => squash(decodeEntities(c)));

        expect(cells.length).toBe(expectedCells.length);
        expect(cells).toEqual(expectedCells);
    });

    it('Mermaid ダイアグラムの個数が移行元（10個）と100%一致し、アクセシビリティラベルを持つ', () => {
        const container = renderPage();
        const diagrams = [...container.querySelectorAll('[data-testid="mermaid-diagram"]')];
        expect(diagrams.length).toBe(inventory.mermaidsCount);
        diagrams.forEach((diagram) => {
            const hasLabel = Boolean(diagram.getAttribute('aria-label')?.trim());
            const isDecorative = diagram.getAttribute('data-decorative') === 'true' || diagram.getAttribute('aria-hidden') === 'true';
            expect(hasLabel || isDecorative).toBe(true);
        });
    });

    it('習熟度チェックリスト項目（14項目）の文言が移行元と完全一致する', () => {
        const container = renderPage();
        const checklistLabels = [...container.querySelectorAll('.task-list li label')].map((el) =>
            squash(el.textContent ?? '')
        );
        const expectedItems = inventory.checklistItems.map((item: string) => squash(item));

        expect(checklistLabels.length).toBe(expectedItems.length);
        expect(checklistLabels).toEqual(expectedItems);
    });
});
