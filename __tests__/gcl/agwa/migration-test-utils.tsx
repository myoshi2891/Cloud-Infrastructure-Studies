import type { ComponentType } from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
    codeBlockSelector,
    codeLineCount,
    extractBodyContent,
} from '@/scripts/inventory-extraction.mjs';

type MermaidDiagramMockProps = {
    chart: string;
    ariaLabel?: string;
    decorative?: boolean;
    preserveNaturalScale?: boolean;
};

/**
 * Mermaid 図をテスト用の div として描画し、チャート文字列を data-chart に保持する。
 * 実コンポーネントと同様に、説明付きの図は aria-label、装飾図は
 * aria-hidden="true" となるアクセシビリティ契約を再現する。
 */
export const MermaidDiagramMock = ({
    chart,
    ariaLabel,
    decorative,
    preserveNaturalScale = false,
}: MermaidDiagramMockProps) => (
    <div
        role="img"
        aria-roledescription="diagram"
        data-testid="mermaid-diagram"
        data-chart={chart}
        data-decorative={String(decorative === true)}
        data-preserve-natural-scale={String(preserveNaturalScale)}
        aria-label={ariaLabel}
        aria-hidden={decorative || undefined}
    />
);

/** 文字列から連続する空白文字をすべて除去する。 */
export const squash = (value: string): string => value.replace(/\s+/g, '');

export { codeBlockSelector, codeLineCount, extractBodyContent };

/** `scripts/gen-inventory.mjs` が出力する移行インベントリの構造。 */
export interface MigrationInventory {
    h1: string[];
    h2: string[];
    h3: string[];
    h4: string[];
    th: string[];
    td: string[];
    listItems: string[];
    links: { text: string; href: string | null }[];
    bodyContent: { kind: string; text: string }[];
    counts: { table: number; diagram: number; codeBlock: number; figure: number };
    structures: { tableColumnHeaders: number[]; codeLines: number[] };
}

/**
 * 移行ページの「全量移行検証」スイートを定義する。
 *
 * `.agents/rules/tdd-commit-workflow.md` §2-1 の必須アサーションをすべて含むため、
 * 移行ページのテストはタイトル・ページコンポーネント・インベントリを渡すだけでよい。
 * `MermaidDiagram` のモックは `vi.mock` の巻き上げが必要なため、呼び出し側の
 * テストファイルで宣言すること。
 */
export function defineMigrationSuite(
    title: string,
    Page: ComponentType,
    inventory: MigrationInventory,
): void {
    describe(title, () => {
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

        it('外部リンクが件数・順序・URL まで移行元と一致する', () => {
            const container = renderPage();
            const rendered = [...container.querySelectorAll('a[href^="http"]')].map((anchor) =>
                anchor.getAttribute('href'),
            );
            expect(rendered).toEqual(inventory.links.map((link) => link.href));
        });

        it('本文・注釈・画像 alt・コード全文が移行元の順序どおり一致する', () => {
            const container = renderPage();
            expect(extractBodyContent(container)).toEqual(inventory.bodyContent);
        });

        it('全形式の図が件数どおり存在し、説明または装飾指定と自然スケールを持つ', () => {
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

        it('静的な画像と SVG が移行元の件数と一致する', () => {
            const container = renderPage();
            expect(container.querySelectorAll('img, svg')).toHaveLength(inventory.counts.figure);
        });

        it('テーブルが件数どおり存在し、thead と th[scope=col] を持つ', () => {
            const container = renderPage();
            const tables = [...container.querySelectorAll('table')];
            expect(tables).toHaveLength(inventory.counts.table);
            // 列見出し数の期待値が表の件数だけ揃っていないと、以降の
            // tableColumnHeaders[index] が undefined になり「0 件」と誤検出される。
            // 件数不一致はここで明示的に落とす。
            expect(inventory.structures.tableColumnHeaders).toHaveLength(inventory.counts.table);
            tables.forEach((table, index) => {
                expect(table.querySelector('thead')).not.toBeNull();
                expect(table.querySelectorAll('thead th[scope="col"]').length).toBe(
                    inventory.structures.tableColumnHeaders[index],
                );
            });
        });

        it('コードブロックが .code-line でラップされている', () => {
            const container = renderPage();
            const blocks = [...container.querySelectorAll(codeBlockSelector)].filter(
                (element) => !element.parentElement?.closest(codeBlockSelector),
            );
            expect(blocks).toHaveLength(inventory.counts.codeBlock);
            // 行数の期待値がコードブロック数だけ揃っていないと、以降の
            // codeLines[index] が undefined になり検証が骨抜きになる。件数不一致はここで落とす。
            expect(inventory.structures.codeLines).toHaveLength(inventory.counts.codeBlock);
            blocks.forEach((block, index) => {
                expect(block.querySelector(':scope > .code-line')).not.toBeNull();
                expect(codeLineCount(block)).toBe(inventory.structures.codeLines[index]);
            });
        });
    });
}
