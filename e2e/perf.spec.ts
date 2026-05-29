import { test, expect } from '@playwright/test';
import { CRITICAL_PAGES } from './helpers/critical-pages';
import { collectWebVitals, loadBudgetFor } from './helpers/perf';

/**
 * Core Web Vitals 相当のパフォーマンスバジェットテスト。
 *
 * 注: このテストは主に dev サーバー計測を対象としており、その主目的は本番の厳密なパフォーマンスプロファイリング
 * ではなく、CI/CD パイプラインにおける「テスト疎通の確認（疎通確認）」です。そのため、`e2e/perf-budgets.json` の
 * バジェット値（lcp: 3000, tbt: 200, cls: 0.1）は本番ビルドの実測値に基づいて段階的に引き締め調整されています。
 */
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
