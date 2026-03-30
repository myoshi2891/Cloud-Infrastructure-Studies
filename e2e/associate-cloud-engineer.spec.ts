import { test, expect } from '@playwright/test';

test.describe('Associate Cloud Engineer ページ', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/gcl/associate-cloud-engineer');
    });

    test('ページが正常に表示されること', async ({ page }) => {
        await expect(page.locator('h1')).toContainText('Associate Cloud Engineer');
    });

    test('ページタイトルが正しいこと', async ({ page }) => {
        await expect(page).toHaveTitle(/Associate Cloud Engineer/);
    });

    test('sticky nav が全セクションリンクを含むこと', async ({ page }) => {
        const nav = page.locator('nav.snav');
        await expect(nav).toBeVisible();
        await expect(nav.locator('a')).toHaveCount(5);
    });

    test('hero セクションに試験メタデータが表示されること', async ({ page }) => {
        await expect(page.locator('.hero')).toBeVisible();
        await expect(page.locator('text=2 時間')).toBeVisible();
        await expect(page.locator('text=$125')).toBeVisible();
    });

    test('4つのセクション見出しが表示されること', async ({ page }) => {
        await expect(page.locator('h2', { hasText: 'クラウドソリューション環境のセットアップ' })).toBeVisible();
        await expect(page.locator('h2', { hasText: 'クラウドソリューションの計画と実装' })).toBeVisible();
        await expect(page.locator('h2', { hasText: 'クラウドソリューションの運用管理' })).toBeVisible();
        await expect(page.locator('h2', { hasText: 'アクセスとセキュリティの構成' })).toBeVisible();
    });

    test('コンソールエラーがないこと', async ({ page }) => {
        const errors: string[] = [];
        page.on('console', (msg) => {
            if (msg.type() === 'error') {
                errors.push(msg.text());
            }
        });
        await page.goto('/gcl/associate-cloud-engineer');
        await page.waitForLoadState('networkidle');
        expect(errors).toEqual([]);
    });

    test('レスポンシブ（640px）でレイアウト崩れなし', async ({ page }) => {
        await page.setViewportSize({ width: 640, height: 800 });
        await page.goto('/gcl/associate-cloud-engineer');
        await expect(page.locator('h1')).toBeVisible();
        await expect(page.locator('.hero')).toBeVisible();
    });
});
