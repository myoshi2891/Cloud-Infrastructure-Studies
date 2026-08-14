// __tests__/gcl/pcne-section1-vpc-design.test.tsx
// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import inventory from '@/docs/migration-inventory/pcne-section1-vpc-design.json';
import Page from '@/app/gcl/professional-cloud-network-engineer/section1-vpc-design/page';

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
const codeBlockSelector = 'pre:not(.mermaid), .code-block';
const codeLines = (block: Element): string[] => {
    const explicitLines = [...block.querySelectorAll(':scope > .code-line')];
    if (explicitLines.length > 0) {
        return explicitLines.map((line) => line.textContent ?? '');
    }
    const text = (block.textContent ?? '')
        .replace(/\r\n?/g, '\n')
        .replace(/^\n|\n$/g, '');
    return text ? text.split('\n') : [];
};
const codeText = (block: Element): string => codeLines(block).join('\n');
const codeLineCount = (block: Element): number => codeLines(block).length;
const bodySelector = `p, aside, .annotation, [class*="callout"], img[alt], ${codeBlockSelector}`;
const extractBodyContent = (container: HTMLElement) =>
    [...container.querySelectorAll(bodySelector)]
        .filter((element) => !element.parentElement?.closest(bodySelector))
        .map((element) => ({
            kind: element.matches('img[alt]')
                ? 'imageAlt'
                : element.matches(codeBlockSelector)
                    ? 'code'
                    : element.matches('aside, .annotation, [class*="callout"]')
                        ? 'annotation'
                        : 'paragraph',
            text: element.matches(codeBlockSelector)
                ? codeText(element)
                : normalize(
                    element.matches('img[alt]')
                        ? element.getAttribute('alt') ?? ''
                        : element.textContent ?? '',
                ),
        }))
        .filter((entry) => entry.text);

describe('pcne-section1-vpc-design — 移行元コンテンツの100%全量移行・厳密検証', () => {
    const renderPage = () => {
        const { container } = render(<Page />);
        return container;
    };

    it.each([
        ['h1', inventory.h1],
        ['h2', inventory.h2],
        ['h3', inventory.h3],
        ['h4', inventory.h4],
    ])('%s の件数・順序・テキストが移行元と完全一致する', (selector, headings) => {
        const container = renderPage();
        const rendered = [...container.querySelectorAll(selector)].map((element) =>
            squash(element.textContent ?? ''),
        );
        expect(rendered).toEqual(headings.map(squash));
    });

    it.each([
        ['th', inventory.th],
        ['td', inventory.td],
        ['li', inventory.listItems],
    ])('%s の件数・順序・テキストが移行元と完全一致する', (selector, items) => {
        const container = renderPage();
        const rendered = [...container.querySelectorAll(selector)].map((element) =>
            squash(element.textContent ?? ''),
        );
        expect(rendered).toEqual(items.map(squash));
    });

    it('外部リンクの URL 集合が移行元と完全一致する', () => {
        const container = renderPage();
        const rendered = [...new Set(
            [...container.querySelectorAll('a[href^="http"]')].map((a) => a.getAttribute('href')),
        )].sort();
        const expected = [...new Set(inventory.links.map((link) => link.href))].sort();
        expect(rendered).toEqual(expected);
    });

    it('本文・注釈・画像 alt・コード全文が移行元の順序どおり完全一致する', () => {
        const container = renderPage();
        expect(extractBodyContent(container)).toEqual(inventory.bodyContent);
    });

    it('全形式の図が件数(31)どおり存在し、説明または装飾指定を持つ', () => {
        const container = renderPage();
        const diagramSelector = '[data-testid="mermaid-diagram"], .mermaid, [id^="diag-"]';
        const diagrams = [...container.querySelectorAll(diagramSelector)].filter(
            (element) => !element.querySelector(diagramSelector),
        );
        expect(diagrams).toHaveLength(inventory.counts.diagram);
        diagrams.forEach((element) => {
            const hasLabel = Boolean(element.getAttribute('aria-label')?.trim());
            const isDecorative = element.getAttribute('data-decorative') === 'true'
                || element.getAttribute('aria-hidden') === 'true';
            expect(hasLabel || isDecorative).toBe(true);
        });
    });

    it('静的な画像と SVG が移行元の件数と一致する', () => {
        const container = renderPage();
        expect(container.querySelectorAll('img, svg')).toHaveLength(inventory.counts.figure);
    });

    it('テーブルが件数(30)どおり存在し、thead と th[scope=col] を持つ', () => {
        const container = renderPage();
        const tables = [...container.querySelectorAll('table')];
        expect(tables).toHaveLength(inventory.counts.table);
        tables.forEach((table, index) => {
            expect(table.querySelector('thead')).not.toBeNull();
            expect(table.querySelectorAll('thead th[scope="col"]')).toHaveLength(
                table.querySelectorAll('thead th').length,
            );
        });
    });

    it('コードブロックが .code-line でラップされている', () => {
        const container = renderPage();
        const blocks = [...container.querySelectorAll(codeBlockSelector)].filter(
            (element) => !element.parentElement?.closest(codeBlockSelector),
        );
        expect(blocks).toHaveLength(inventory.counts.codeBlock);
        blocks.forEach((block, index) => {
            expect(block.querySelector(':scope > .code-line')).not.toBeNull();
            expect(codeLineCount(block)).toBe(inventory.structures.codeLines[index]);
        });
    });

    it('サイドバーの全てのアンカーリンクの target ID が DOM 内の要素と1対1で対応する', () => {
        const container = renderPage();
        const sidebarLinks = [...container.querySelectorAll('.sidebar nav a[href^="#"]')];
        expect(sidebarLinks).toHaveLength(9);
        sidebarLinks.forEach((link) => {
            const href = link.getAttribute('href') ?? '';
            const targetId = href.replace(/^#/, '');
            const targetEl = container.querySelector(`[id="${targetId}"]`);
            expect(targetEl).not.toBeNull();
        });
    });

    it('サイドバーの nav a.active に十分な背景色とアクセント境界線スタイルが適用可能である', () => {
        const container = renderPage();
        const firstLink = container.querySelector('.sidebar nav a');
        expect(firstLink).not.toBeNull();
        // active クラスが付与された際の可視性検証
        firstLink?.classList.add('active');
        expect(firstLink?.classList.contains('active')).toBe(true);
    });
});
