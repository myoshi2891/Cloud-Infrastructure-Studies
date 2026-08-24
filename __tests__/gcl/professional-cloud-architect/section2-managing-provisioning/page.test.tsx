import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import inventory from '@/docs/migration-inventory/pca-section2-managing-provisioning.json';
import Page from '@/app/gcl/professional-cloud-architect/section2-managing-provisioning/page';
import { defineMigrationSuite } from '@/__tests__/gcl/agwa/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/gcl/agwa/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

defineMigrationSuite(
    'PCA Section 2: クラウドソリューションインフラの管理とプロビジョニング — 全量移行検証',
    Page,
    inventory,
);

describe('PCA Section 2: 視覚デザイン・UIコンポーネント構造の検証', () => {
    const renderPage = () => {
        const { container } = render(<Page />);
        return container;
    };

    it('サイドバーナビが aside.sidebar nav a 構造を持ち、目次項目を描画する', () => {
        const container = renderPage();
        const sidebar = container.querySelector('aside.sidebar');
        expect(sidebar).not.toBeNull();
        expect(sidebar?.querySelector('.sidebar-brand')).not.toBeNull();
        expect(sidebar?.querySelector('.sidebar-brand .dot')).not.toBeNull();

        const navLinks = container.querySelectorAll('.sidebar nav ul li a');
        expect(navLinks.length).toBeGreaterThan(0);
    });

    it('全てのテーブルが .table-scroll ラッパー内に配置されている', () => {
        const container = renderPage();
        const tables = container.querySelectorAll('table');
        expect(tables).toHaveLength(25);
        tables.forEach((table) => {
            expect(table.closest('.table-scroll')).not.toBeNull();
        });
    });

    it('Heroセクションが h1, hero-sub, および hero-kicker または hero-badges を持つ', () => {
        const container = renderPage();
        const hero = container.querySelector('.hero');
        expect(hero).not.toBeNull();
        expect(hero?.querySelector('h1')).not.toBeNull();
    });

    it('フットノートが aside#footnotes 構造を持つ', () => {
        const container = renderPage();
        const footnotes = container.querySelector('aside#footnotes');
        expect(footnotes).not.toBeNull();
    });
});
