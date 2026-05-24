import { test, expect } from '@playwright/test';

test.describe('Visual Regression tests', () => {
    const pages = [
        '/',
        '/gcl/associate-cloud-engineer',
        '/gcl/genai-leader',
        '/gcl/cloud-digital-leader',
        '/gcl/agwa',
        '/gcl/professional-cloud-network-engineer',
        '/gcl/professional-cloud-network-engineer-step-by-step',
    ];

    for (const pagePath of pages) {
        test(`visual snapshot for ${pagePath}`, async ({ page }) => {
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
