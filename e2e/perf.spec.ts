import { test, expect } from '@playwright/test';
import { CRITICAL_PAGES } from './helpers/critical-pages';
import { collectWebVitals, loadBudgetFor } from './helpers/perf';

test.describe('Performance budget tests (Core Web Vitals)', () => {
    for (const pagePath of CRITICAL_PAGES) {
        test(`should meet perf budgets on ${pagePath}`, async ({ page }) => {
            test.setTimeout(60_000);

            await page.goto(pagePath);
            await page.waitForLoadState('networkidle');

            const metrics = await collectWebVitals(page);
            const budget = await loadBudgetFor(pagePath);

            expect.soft(metrics.lcp, `LCP for ${pagePath}`).toBeLessThanOrEqual(budget.lcp);
            expect.soft(metrics.cls, `CLS for ${pagePath}`).toBeLessThanOrEqual(budget.cls);
            expect.soft(metrics.tbt, `TBT for ${pagePath}`).toBeLessThanOrEqual(budget.tbt);
        });
    }
});
