import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { CRITICAL_PAGES } from './helpers/critical-pages';

test.describe('Accessibility (A11y) tests', () => {
    for (const pagePath of CRITICAL_PAGES) {
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
