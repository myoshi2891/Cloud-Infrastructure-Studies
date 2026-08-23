import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import inventory from '@/docs/migration-inventory/pca-section1-design-planning.json';
import Page from '@/app/gcl/professional-cloud-architect/section1-design-planning/page';
import { defineMigrationSuite } from '@/__tests__/gcl/agwa/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/gcl/agwa/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

defineMigrationSuite(
    'PCA Section 1: クラウドソリューションアーキテクチャの設計と計画 — 全量移行検証',
    Page,
    inventory,
);

describe('PCA Section 1: 視覚デザイン・UIコンポーネント構造の検証', () => {
    const renderPage = () => {
        const { container } = render(<Page />);
        return container;
    };

    it('サイドバーナビが .sidebar nav a 構造を持ち、10個の目次項目を描画する', () => {
        const container = renderPage();
        const sidebar = container.querySelector('aside.sidebar');
        expect(sidebar).not.toBeNull();
        expect(sidebar?.querySelector('.sidebar-brand')).not.toBeNull();
        expect(sidebar?.querySelector('.sidebar-brand .dot')).not.toBeNull();

        const navLinks = container.querySelectorAll('.sidebar nav ul li a');
        expect(navLinks).toHaveLength(10);
    });

    it('Callout が全32件存在し、各種類に対応する .pill と .callout-icon を持つ', () => {
        const container = renderPage();
        const callouts = container.querySelectorAll('.callout');
        expect(callouts).toHaveLength(32);

        const sourceCallouts = container.querySelectorAll('.callout.callout-source');
        expect(sourceCallouts).toHaveLength(16);
        sourceCallouts.forEach((el) => {
            expect(el.querySelector('.pill')?.textContent?.trim()).toBe('SOURCE');
            expect(el.querySelector('.callout-icon')?.textContent?.trim()).toBe('📚');
        });

        const practiceCallouts = container.querySelectorAll('.callout.callout-practice');
        expect(practiceCallouts).toHaveLength(16);
        practiceCallouts.forEach((el) => {
            expect(el.querySelector('.pill')?.textContent?.trim()).toBe('BEST PRACTICE');
            expect(el.querySelector('.callout-icon')?.textContent?.trim()).toBe('✅');
        });
    });

    it('チェックリストカードが .checklist-card 構造と 12個のカスタムチェックボックスを持つ', () => {
        const container = renderPage();
        const card = container.querySelector('.checklist-card');
        expect(card).not.toBeNull();
        expect(card?.querySelector('.checklist-header .checklist-progress')).not.toBeNull();

        const checkboxes = card?.querySelectorAll('ul.checklist-list li label input[type="checkbox"]');
        expect(checkboxes).toHaveLength(12);
    });

    it('参考文献グリッドが .ref-grid に 9個の .ref-card と .ref-item を持つ', () => {
        const container = renderPage();
        const grid = container.querySelector('.ref-grid');
        expect(grid).not.toBeNull();

        const cards = grid?.querySelectorAll('.ref-card');
        expect(cards).toHaveLength(9);

        const items = grid?.querySelectorAll('a.ref-item');
        expect(items).toHaveLength(32);
        items?.forEach((item) => {
            expect(item.querySelector('.ref-icon')?.textContent?.trim()).toBe('↗');
        });
    });

    it('全てのテーブルが .table-scroll ラッパー内に配置されている', () => {
        const container = renderPage();
        const tables = container.querySelectorAll('table');
        expect(tables).toHaveLength(14);
        tables.forEach((table) => {
            expect(table.closest('.table-scroll')).not.toBeNull();
        });
    });

    it('Heroセクションが h1, hero-sub, および 3個の hero-badge を持つ', () => {
        const container = renderPage();
        const hero = container.querySelector('.hero');
        expect(hero).not.toBeNull();
        expect(hero?.querySelector('h1')).not.toBeNull();
        expect(hero?.querySelector('.hero-sub')).not.toBeNull();
        expect(hero?.querySelectorAll('.hero-badges .hero-badge')).toHaveLength(3);
    });

    it('フットノートが aside#footnotes 構造を持つ', () => {
        const container = renderPage();
        const footnotes = container.querySelector('aside#footnotes');
        expect(footnotes).not.toBeNull();
        expect(footnotes?.querySelectorAll('ol li')).toHaveLength(40);
    });
});

