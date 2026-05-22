import { describe, it, expect } from 'vitest';
import { renderDashboardHtml } from '../../scripts/lib/dashboard-html.mjs';

const fixtureData = {
    generatedAt: '2026-05-21T00:00:00.000Z',
    runner: { unit: 'Vitest (jsdom)', e2e: 'Playwright (Chromium)' },
    totals: { sources: 100, covered: 60, testFiles: 61 },
    domains: [
        { id: 'ace', label: 'Associate Cloud Engineer', sources: 14, covered: 8 },
        { id: 'genai-leader', label: 'Generative AI Leader', sources: 19, covered: 10 },
        { id: 'cloud-digital-leader', label: 'Cloud Digital Leader', sources: 50, covered: 30 },
        { id: 'agwa', label: 'Google Workspace Admin', sources: 4, covered: 2 },
        { id: 'pcne', label: 'Professional Cloud Network Engineer', sources: 6, covered: 4 },
        { id: 'pcne-step', label: 'PCNE Step-by-Step', sources: 4, covered: 2 },
        { id: 'common', label: '共通', sources: 9, covered: 4 },
    ],
    cells: [
        { domain: 'ace', category: 'Unit', status: 'ok', coverageRate: 0.85, testCount: 5, coveredSources: 12, sources: 14, tests: ['__tests__/ace.test.tsx'] },
        { domain: 'common', category: 'Integration', status: 'missing', coverageRate: 0, testCount: 0, coveredSources: 0, sources: 2, tests: [] },
        { domain: 'agwa', category: 'E2E', status: 'missing', coverageRate: 0, testCount: 0, coveredSources: 0, sources: 4, tests: [] },
    ],
    actions: [
        { priority: 'P0', area: '共通 / lib カバレッジ補強', detail: 'detail', tool: 'Vitest', cost: '中', effect: '効果' },
        { priority: 'P1', area: 'agwa / クリティカルパス E2E', detail: 'detail', tool: 'Playwright', cost: '中', effect: '効果' },
    ],
    uncoveredSources: ['lib/recentPages.ts', 'app/agwa/section2/page.tsx'],
};

describe('dashboard-html / renderDashboardHtml', () => {
    const html = renderDashboardHtml(fixtureData);

    it('should declare lang="ja" on html element', () => {
        expect(html).toMatch(/<html\s+lang="ja"/);
    });

    it('should contain a meta charset utf-8 declaration', () => {
        expect(html.toLowerCase()).toMatch(/<meta\s+charset="utf-8"/);
    });

    it('should embed dashboard data as JSON in a script tag with id', () => {
        expect(html).toMatch(/<script[^>]*type="application\/json"[^>]*id="dashboard-data"/);
        const match = html.match(/<script[^>]*id="dashboard-data"[^>]*>([\s\S]*?)<\/script>/);
        expect(match).not.toBeNull();
        expect(match?.[1]).toBeTruthy();
        const parsed = JSON.parse(match![1]);
        expect(parsed.totals.sources).toBe(100);
        expect(parsed.domains).toHaveLength(7);
    });

    it('should include a caption element on the matrix table', () => {
        expect(html).toMatch(/<caption[^>]*>/);
    });

    it('should use scope="col" on column headers', () => {
        expect(html).toMatch(/scope="col"/);
    });

    it('should use scope="row" on row headers', () => {
        expect(html).toMatch(/scope="row"/);
    });

    it('should include all 7 domain labels', () => {
        for (const d of fixtureData.domains) {
            expect(html).toContain(d.label);
        }
    });

    it('should include all 8 category labels in column headers', () => {
        const categories = ['Unit', 'Integration', 'E2E', 'Smoke', 'Visual', 'A11y', 'Performance', 'Security'];
        for (const cat of categories) {
            expect(html).toContain(cat);
        }
    });

    it('should include a @media print rule for printing', () => {
        expect(html).toMatch(/@media\s+print/);
    });

    it('should include a prefers-color-scheme rule for dark mode', () => {
        expect(html).toMatch(/prefers-color-scheme/);
    });

    it('should display overall coverage percentage', () => {
        expect(html).toContain('60'); // 60/100 = 60%
        expect(html).toMatch(/60\s*%/);
    });

    it('should include a progress bar element for total coverage', () => {
        expect(html).toMatch(/<progress[^>]*max=/);
    });

    it('should list all P0/P1 actions in next-actions section', () => {
        expect(html).toContain('P0');
        expect(html).toContain('共通 / lib カバレッジ補強');
        expect(html).toContain('P1');
        expect(html).toContain('agwa / クリティカルパス E2E');
    });

    it('should include generation timestamp', () => {
        expect(html).toContain('2026-05-21');
    });

    it('should escape HTML in test file names to prevent XSS', () => {
        const malicious = {
            ...fixtureData,
            cells: [
                { domain: 'ace', category: 'Unit', status: 'ok', coverageRate: 1, testCount: 1, coveredSources: 1, sources: 1, tests: ['<script>alert(1)</script>'] },
            ],
        };
        const out = renderDashboardHtml(malicious);
        expect(out).not.toContain('<script>alert(1)</script>');
        expect(out).toContain('&lt;script&gt;');
    });
});
