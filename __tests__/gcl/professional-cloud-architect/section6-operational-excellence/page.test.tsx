import { render, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import inventory from '@/docs/migration-inventory/pca-section6-operational-excellence.json';
import Page from '@/app/gcl/professional-cloud-architect/section6-operational-excellence/page';
import {
    CHECKLIST_ITEMS,
    NAV_ITEMS,
    REF_CARDS,
} from '@/app/gcl/professional-cloud-architect/section6-operational-excellence/constants';
import { defineMigrationSuite } from '@/__tests__/gcl/agwa/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/gcl/agwa/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

defineMigrationSuite(
    'PCA Section 6: ソリューションと運用の卓越性の確保 — 全量移行検証',
    Page,
    inventory,
);

describe('PCA Section 6: 視覚デザイン・UIコンポーネント構造の検証', () => {
    const renderPage = () => {
        const { container } = render(<Page />);
        return container;
    };

    it('サイドバーナビが .sidebar .sidebar-nav a 構造を持ち、目次項目を描画する', () => {
        const container = renderPage();
        const sidebar = container.querySelector('.sidebar');
        expect(sidebar).not.toBeNull();
        expect(sidebar?.querySelector('.sidebar-header')).not.toBeNull();

        // NAV_ITEMS を正本として、リンク数・順序・ラベル・href が完全一致することを検証する
        const navLinks = container.querySelectorAll('.sidebar nav a');
        expect(navLinks).toHaveLength(NAV_ITEMS.length);
        expect(Array.from(navLinks, (anchor) => anchor.textContent?.trim())).toEqual(
            NAV_ITEMS.map((item) => item.label),
        );
        expect(Array.from(navLinks, (anchor) => anchor.getAttribute('href'))).toEqual(
            NAV_ITEMS.map((item) => `#${item.id}`),
        );
    });

    it('全てのテーブルが .table-scroll ラッパー内に配置されている', () => {
        const container = renderPage();
        const tables = container.querySelectorAll('table');
        expect(tables).toHaveLength(inventory.counts.table);
        tables.forEach((table) => {
            expect(table.closest('.table-scroll')).not.toBeNull();
        });
    });

    it('Heroセクションが h1, kicker, および meta-row を持つ', () => {
        const container = renderPage();
        const hero = container.querySelector('.hero');
        expect(hero).not.toBeNull();
        expect(hero?.querySelector('h1')).not.toBeNull();
        expect(hero?.querySelector('.kicker')).not.toBeNull();
        expect(hero?.querySelector('.meta-row')).not.toBeNull();
    });

    it('参考文献が .ref-grid 構造と REF_CARDS と同数の .ref-card を持つ', () => {
        const container = renderPage();
        const refGrid = container.querySelector('.ref-grid');
        expect(refGrid).not.toBeNull();
        const refCards = container.querySelectorAll('.ref-card');
        expect(refCards).toHaveLength(REF_CARDS.length);
    });

    it('チェックリストが .checklist-card 構造と CHECKLIST_ITEMS と同数のチェックボックスを持つ', () => {
        const container = renderPage();
        const checklist = container.querySelector('.checklist-card');
        expect(checklist).not.toBeNull();
        const checkboxes = container.querySelectorAll('.checklist-card input[type="checkbox"]');
        expect(checkboxes).toHaveLength(CHECKLIST_ITEMS.length);
    });

    it('チェックボックスをクリックすると完了状態とカウンターが連動して更新される', () => {
        const { container } = render(<Page />);
        const firstCheckbox = container.querySelector(
            '.checklist-card input[type="checkbox"]',
        ) as HTMLInputElement;
        const countSpan = container.querySelector('.checklist-header .count');

        expect(countSpan?.textContent).toBe('0 / 18 完了');
        expect(firstCheckbox.checked).toBe(false);

        // チェックを入れる
        fireEvent.click(firstCheckbox);
        expect(firstCheckbox.checked).toBe(true);
        expect(countSpan?.textContent).toBe('1 / 18 完了');

        // チェックを外す
        fireEvent.click(firstCheckbox);
        expect(firstCheckbox.checked).toBe(false);
        expect(countSpan?.textContent).toBe('0 / 18 完了');
    });
});
