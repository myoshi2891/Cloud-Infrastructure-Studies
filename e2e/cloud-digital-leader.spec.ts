import { test, expect } from '@playwright/test';

test.describe('Cloud Digital Leader ページ', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/gcl/cloud-digital-leader');
    });

    test('ページタイトルが正しいこと（意図的失敗）', async ({ page }) => {
        // タイトルは実際には "Cloud Digital Leader 認定試験" ですが、
        // 意図的に失敗させるために間違ったタイトルを指定します。
        await expect(page).toHaveTitle(/This Title Should Fail/);
    });

    test('主要見出しが表示されること', async ({ page }) => {
        await expect(page.locator('h1')).toContainText('Cloud Digital Leader');
    });
});
