// __tests__/recommended-books/operating-systems-three-easy-pieces/page.test.tsx
// @vitest-environment jsdom
import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import inventory from '@/docs/migration-inventory/operating-systems-three-easy-pieces.json';
import Page from '@/app/recommended-books/operating-systems-three-easy-pieces/page';
import { defineMigrationSuite } from '@/__tests__/gcl/agwa/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/gcl/agwa/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

defineMigrationSuite(
    'Operating Systems: Three Easy Pieces 初学者向け学習ガイド — 全量移行検証',
    Page,
    inventory,
);

describe('Operating Systems: Three Easy Pieces 初学者向け学習ガイド — 詳細仕様検証', () => {
    const renderPage = () => {
        const { container } = render(<Page />);
        return container;
    };

    it('リスト(ul)が19箇所存在し、全50件のli項目がul内に正しく包含されている', () => {
        const container = renderPage();
        const uls = container.querySelectorAll('ul');
        expect(uls).toHaveLength(19);
        const lis = container.querySelectorAll('ul > li');
        expect(lis).toHaveLength(50);
    });

    it('チェックリストカード内に17件のチェックボックス項目が存在する', () => {
        const container = renderPage();
        const checklist = container.querySelector('.checklist-card');
        expect(checklist).not.toBeNull();
        const checkboxes = checklist?.querySelectorAll('input[type="checkbox"]');
        expect(checkboxes).toHaveLength(17);
        const labels = checklist?.querySelectorAll('label');
        expect(labels).toHaveLength(17);
    });

    it('参考文献グリッド(ref-grid)内に12件の参考文献カード(ref-card)が存在し、番号とリンクが一致する', () => {
        const container = renderPage();
        const refGrids = container.querySelectorAll('.ref-grid');
        expect(refGrids.length).toBeGreaterThanOrEqual(1);
        const cards = container.querySelectorAll('.ref-card');
        expect(cards).toHaveLength(12);
        cards.forEach((card, index) => {
            const num = card.querySelector('.num');
            expect(num?.textContent?.trim()).toBe(String(index + 1));
            const link = card.querySelector('a');
            expect(link?.getAttribute('href')).toBe(inventory.links[index]?.href);
        });
    });

    it('全56点のMermaid図解がpreserveNaturalScale属性を保持し、aria-labelが設定されている', () => {
        const container = renderPage();
        const diagrams = container.querySelectorAll('[data-testid="mermaid-diagram"]');
        expect(diagrams).toHaveLength(56);
        diagrams.forEach((diag) => {
            expect(diag.getAttribute('data-preserve-natural-scale')).toBe('true');
            expect(diag.getAttribute('aria-label')).toBeTruthy();
        });
    });

    it('全39件のテーブルが存在し、すべてtheadとth[scope="col"]を持つ', () => {
        const container = renderPage();
        const tables = container.querySelectorAll('table');
        expect(tables).toHaveLength(39);
        tables.forEach((table) => {
            expect(table.querySelector('thead')).not.toBeNull();
            const colThs = table.querySelectorAll('thead th[scope="col"]');
            expect(colThs.length).toBeGreaterThan(0);
        });
    });

    it('page.css 内でリストマーカーおよび Mermaid ノード文字色の明示指定が保持されている', async () => {
        const { readFileSync } = await import('node:fs');
        const { join } = await import('node:path');
        const pageCss = readFileSync(
            join(
                process.cwd(),
                'app/recommended-books/operating-systems-three-easy-pieces/page.css',
            ),
            'utf8',
        );

        // リストの点（黒丸）と番号の Preflight リセット防止
        expect(pageCss).toMatch(/list-style-type:\s*disc\s*!important/);
        expect(pageCss).toMatch(/list-style-type:\s*decimal\s*!important/);
        expect(pageCss).toMatch(/list-style-position:\s*outside\s*!important/);

        // Mermaid ノード文字色の高コントラスト保証（暗色背景での黒文字化防止）
        // page.css は CSS Modules ではないため :global() は使わず素のセレクタで記述する
        expect(pageCss).toMatch(/\.ostep-page\s+\.mermaid-wrap\s+\.node\s+\.nodeLabel\b/);
        expect(pageCss).not.toContain(':global(');
        expect(pageCss).toMatch(
            /color:\s*var\(--color-pca-s4-mermaid-label\)\s*!important/,
        );
    });

    it('components/MermaidDiagram.module.css 内で Accelerate の classDef box ルールが他ページへ波及しないようスコープされている', async () => {
        const { readFileSync } = await import('node:fs');
        const { join } = await import('node:path');
        const mermaidCss = readFileSync(
            join(process.cwd(), 'components/MermaidDiagram.module.css'),
            'utf8',
        );

        // .box がグローバルに黒文字化されておらず、.accelerate-page にスコープされていること
        expect(mermaidCss).not.toMatch(
            /^\.mermaidTarget\s+:global\(\.box\s+\.nodeLabel\)/m,
        );
        expect(mermaidCss).toMatch(
            /:global\(\.accelerate-page\)\s+\.mermaidTarget\s+:global\(\.box\s+\.nodeLabel\)/,
        );
    });
});

