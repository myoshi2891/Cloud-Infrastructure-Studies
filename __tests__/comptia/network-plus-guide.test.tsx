// __tests__/comptia/network-plus-guide.test.tsx
// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it, vi } from 'vitest';
import inventory from '@/docs/migration-inventory/comptia-network-plus-guide.json';
import Page from '@/app/comptia/network-plus/page';

const sourceHtml = readFileSync(
    join(process.cwd(), 'archive/CompTIA/html/Comptia-network-plus-guide.html'),
    'utf8',
);

// MermaidDiagram は名前付きエクスポート。default でモックすると落ちる
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
/**
 * 入力全体と各行の前後空白を正規化し、移行テストで空白差を無視できる形にする。
 */
const normalizeMermaid = (value: string): string => value
    .trim()
    .split(/\r?\n/)
    .map((line) => line.trim())
    .join('\n');
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

describe('CompTIA Network+ Guide — 移行元コンテンツの全量移行', () => {
    const renderPage = () => {
        const { container } = render(<Page />);
        return container;
    };

    it.each([
        ['h1', inventory.h1],
        ['h2', inventory.h2],
        ['h3', inventory.h3],
        ['h4', inventory.h4],
    ])('%s の件数・順序・テキストが移行元と一致する', (selector, headings) => {
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
    ])('%s の件数・順序・テキストが移行元と一致する', (selector, items) => {
        const container = renderPage();
        const rendered = [...container.querySelectorAll(selector)].map((element) =>
            squash(element.textContent ?? ''),
        );
        expect(rendered).toEqual(items.map(squash));
    });

    it('外部リンクの URL 集合が移行元と一致する', () => {
        const container = renderPage();
        const rendered = [...new Set(
            [...container.querySelectorAll('a[href^="http"]')].map((a) => a.getAttribute('href')),
        )].sort();
        const expected = [...new Set(inventory.links.map((link) => link.href))].sort();
        expect(rendered).toEqual(expected);
    });

    it('本文・注釈・画像 alt・コード全文が移行元の順序どおり一致する', () => {
        const container = renderPage();
        expect(extractBodyContent(container)).toEqual(inventory.bodyContent);
    });

    it('導入文と Mermaid 定義の全文が移行元 HTML と一致する', () => {
        const sourceDocument = new DOMParser().parseFromString(sourceHtml, 'text/html');
        const sourceIntroduction = sourceDocument.querySelector('.doc-header .subtitle')?.textContent ?? '';
        const sourceMermaid = [...sourceDocument.querySelectorAll('script[type="text/mermaid"]')]
            .map((script) => normalizeMermaid(script.textContent ?? ''));
        const container = renderPage();
        const renderedIntroduction = container.querySelector('.doc-header .subtitle')?.textContent ?? '';
        const renderedMermaid = [...container.querySelectorAll('[data-testid="mermaid-diagram"]')]
            .map((diagram) => normalizeMermaid(diagram.getAttribute('data-chart') ?? ''));

        expect(normalize(renderedIntroduction)).toBe(normalize(sourceIntroduction));
        expect(renderedMermaid).toEqual(sourceMermaid);
    });

    it('全形式の図が件数どおり存在し、説明または装飾指定を持つ', () => {
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
            expect(element.getAttribute('data-preserve-natural-scale')).toBe('true');
        });
    });

    it('テーブルが件数どおり存在する', () => {
        const container = renderPage();
        const tables = [...container.querySelectorAll('table')];
        expect(tables).toHaveLength(inventory.counts.table);
    });

    it('ビジュアルデザイン要素（stat-grid, domain-card, ref-box）とTabler Iconsが存在する', () => {
        const container = renderPage();
        expect(container.querySelector('.stat-grid')).not.toBeNull();
        expect(container.querySelectorAll('.stat-card')).toHaveLength(4);
        expect(container.querySelectorAll('.domain-card')).toHaveLength(5);
        expect(container.querySelector('.ref-box')).not.toBeNull();
        expect(container.querySelectorAll('.ti')).toHaveLength(46);
    });
});
