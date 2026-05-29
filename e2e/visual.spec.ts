import { test, expect } from '@playwright/test';
import { CRITICAL_PAGES } from './helpers/critical-pages';

test.describe('Visual Regression tests', () => {
    for (const pagePath of CRITICAL_PAGES) {
        test(`visual snapshot for ${pagePath}`, async ({ page }) => {
            // Extend timeout to 120s as rendering/saving full-page screenshots of long pages can take time
            test.setTimeout(120000);

            await page.goto(pagePath);
            await page.waitForLoadState('networkidle');
            // Wait for animations/rendering to settle down
            await page.waitForTimeout(1000);
            
            // This will fail on first run due to missing baseline snapshot (TDD Step 1 - Fail)
            const snapshotName = `${pagePath.replace(/\//g, '-') || 'root'}.png`;
            expect(await page.screenshot({ fullPage: true })).toMatchSnapshot(snapshotName);
        });
    }
});
