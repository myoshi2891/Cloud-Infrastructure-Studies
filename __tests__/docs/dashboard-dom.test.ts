import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import { renderDashboardHtml } from '../../scripts/lib/dashboard-html.mjs';

const fixture = {
    generatedAt: '2026-05-21T00:00:00.000Z',
    runner: { unit: 'Vitest', e2e: 'Playwright' },
    totals: { sources: 10, covered: 5, testFiles: 4 },
    domains: [
        { id: 'ace', label: 'ACE', sources: 5, covered: 3 },
        { id: 'agwa', label: 'AGWA', sources: 5, covered: 2 },
    ],
    cells: [
        { domain: 'ace', category: 'Unit', status: 'ok', coverageRate: 0.9, testCount: 2, coveredSources: 4, sources: 5, tests: ['__tests__/a.test.tsx', '__tests__/b.test.tsx'] },
        { domain: 'ace', category: 'E2E', status: 'warn', coverageRate: 0.5, testCount: 1, coveredSources: 2, sources: 5, tests: ['e2e/x.spec.ts'] },
        { domain: 'agwa', category: 'Unit', status: 'missing', coverageRate: 0, testCount: 0, coveredSources: 0, sources: 5, tests: [] },
        { domain: 'agwa', category: 'E2E', status: 'missing', coverageRate: 0, testCount: 0, coveredSources: 0, sources: 5, tests: [] },
    ],
    actions: [],
    uncoveredSources: [],
};

function makeDom(): JSDOM {
    const html = renderDashboardHtml(fixture);
    return new JSDOM(html, {
        runScripts: 'dangerously',
        pretendToBeVisual: true,
        url: 'http://localhost/',
    });
}

describe('dashboard DOM / theme toggle', () => {
    let dom: JSDOM;
    beforeEach(() => {
        dom = makeDom();
    });

    it('should default to data-theme="auto" before user interaction', () => {
        const root = dom.window.document.documentElement;
        expect(root.getAttribute('data-theme')).toBe('auto');
    });

    it('should switch data-theme to dark after toggle click', () => {
        const doc = dom.window.document;
        const btn = doc.getElementById('theme-toggle') as HTMLButtonElement;
        expect(btn).not.toBeNull();
        btn.click();
        expect(doc.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    it('should persist theme=dark in localStorage after click', () => {
        const doc = dom.window.document;
        const btn = doc.getElementById('theme-toggle') as HTMLButtonElement;
        btn.click();
        expect(dom.window.localStorage.getItem('coverage-dashboard:theme')).toBe('dark');
    });

    it('should update aria-pressed when toggled', () => {
        const doc = dom.window.document;
        const btn = doc.getElementById('theme-toggle') as HTMLButtonElement;
        btn.click();
        expect(btn.getAttribute('aria-pressed')).toBe('true');
    });
});

describe('dashboard DOM / domain filter', () => {
    it('should hide the agwa row when agwa filter is unchecked', () => {
        const dom = makeDom();
        const doc = dom.window.document;
        const agwaRow = doc.querySelector('tr[data-domain="agwa"]') as HTMLTableRowElement;
        expect(agwaRow).not.toBeNull();
        expect(agwaRow.style.display).toBe('');

        const checkbox = doc.querySelector('[data-filter-domain="agwa"]') as HTMLInputElement;
        checkbox.checked = false;
        checkbox.dispatchEvent(new dom.window.Event('change', { bubbles: true }));

        expect(agwaRow.style.display).toBe('none');
    });

    it('should restore the agwa row when re-checked', () => {
        const dom = makeDom();
        const doc = dom.window.document;
        const agwaRow = doc.querySelector('tr[data-domain="agwa"]') as HTMLTableRowElement;
        const checkbox = doc.querySelector('[data-filter-domain="agwa"]') as HTMLInputElement;

        checkbox.checked = false;
        checkbox.dispatchEvent(new dom.window.Event('change', { bubbles: true }));
        expect(agwaRow.style.display).toBe('none');

        checkbox.checked = true;
        checkbox.dispatchEvent(new dom.window.Event('change', { bubbles: true }));
        expect(agwaRow.style.display).toBe('');
    });
});

describe('dashboard DOM / status filter', () => {
    it('should dim missing cells when missing status is unchecked', () => {
        const dom = makeDom();
        const doc = dom.window.document;
        const missingCell = doc.querySelector('td[data-status="missing"]') as HTMLTableCellElement;
        expect(missingCell).not.toBeNull();

        const checkbox = doc.querySelector('[data-filter-status="missing"]') as HTMLInputElement;
        checkbox.checked = false;
        checkbox.dispatchEvent(new dom.window.Event('change', { bubbles: true }));

        expect(missingCell.classList.contains('cell--dim')).toBe(true);
    });
});
