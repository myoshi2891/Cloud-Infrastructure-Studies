import { test, expect } from '@playwright/test';

test.describe('Professional Cloud Network Engineer ページ', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/gcl/professional-cloud-network-engineer');
    });

    test('ページタイトルが正しいこと（意図的失敗）', async ({ page }) => {
        await expect(page).toHaveTitle(/This Title Should Fail/);
    });

    test('主要見出しが表示されること', async ({ page }) => {
        await expect(page.locator('h1')).toContainText('Professional Cloud Network Engineer');
    });
});
