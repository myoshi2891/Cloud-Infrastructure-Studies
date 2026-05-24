import { test, expect } from '@playwright/test';

test.describe('Accessibility (A11y) tests', () => {
    test('should fail intentionally for TDD Step 1', async ({ page }) => {
        await page.goto('/');
        // Intentionally failing for TDD Step 1 (Fail)
        expect(true).toBe(false);
    });
});
