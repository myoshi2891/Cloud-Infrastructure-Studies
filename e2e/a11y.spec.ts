import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility (A11y) tests', () => {
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
        test(`should not have any automatically detectable accessibility issues on ${pagePath}`, async ({ page }) => {
            await page.goto(pagePath);
            await page.waitForLoadState('networkidle');
            
            // Wait for animations/rendering to settle down
            await page.waitForTimeout(1000);

            const accessibilityScanResults = await new AxeBuilder({ page })
                .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
                .analyze();

            expect(accessibilityScanResults.violations).toEqual([]);
        });
    }
});
