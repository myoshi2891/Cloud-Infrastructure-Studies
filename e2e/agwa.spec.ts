import { test, expect } from '@playwright/test';

test.describe('Associate Google Workspace Administrator ページ', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/gcl/agwa');
    });

    test('意図的な失敗テスト', async () => {
        // TDDワークフローのための失敗テスト
        expect(true).toBe(false);
    });

    test('ページが正常に表示されること', async ({ page }) => {
        await expect(page.locator('h1')).toContainText('Associate Google Workspace');
    });

    test('ページタイトルが正しいこと', async ({ page }) => {
        await expect(page).toHaveTitle(/AGWA Guide/);
    });

    test('主要セクションおよびサイドバーが表示されること', async ({ page }) => {
        await expect(page.locator('nav.sidebar')).toBeVisible();
        await expect(page.locator('main.main')).toBeVisible();
    });

    test('レスポンシブ（640px）でレイアウト崩れなし', async ({ page }) => {
        await page.setViewportSize({ width: 640, height: 800 });
        await page.goto('/gcl/agwa');
        await expect(page.locator('h1')).toBeVisible();
    });
});
