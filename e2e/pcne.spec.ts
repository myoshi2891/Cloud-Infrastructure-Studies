import { test, expect } from '@playwright/test';

test.describe('Professional Cloud Network Engineer ページ', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/gcl/professional-cloud-network-engineer');
    });

    test('ページが正常に表示されること', async ({ page }) => {
        await expect(page.locator('h1')).toContainText('Network Engineer');
    });

    test('ページタイトルが正しいこと', async ({ page }) => {
        await expect(page).toHaveTitle(/Professional Cloud Network Engineer \| Google Cloud Certification/);
    });

    test('主要セクションが表示されること', async ({ page }) => {
        // 各セクションの見出しなどを検証
        await expect(page.locator('h2', { hasText: '試験仕様と出題ドメイン' })).toBeVisible();
        await expect(page.locator('h2', { hasText: 'VPC の設計と実装' })).toBeVisible();
        await expect(page.locator('h2', { hasText: 'ネットワークサービスの設計と実装' })).toBeVisible();
        await expect(page.locator('h2', { hasText: 'ハイブリッド接続の設計と実装' })).toBeVisible();
    });

    test('コンソールエラーがないこと', async ({ page }) => {
        const errors: string[] = [];
        page.on('console', (msg) => {
            if (msg.type() === 'error') {
                errors.push(msg.text());
            }
        });
        await page.reload();
        await page.waitForLoadState('networkidle');
        expect(errors).toEqual([]);
    });

    test('レスポンシブ（640px）でレイアウト崩れなし', async ({ page }) => {
        await page.setViewportSize({ width: 640, height: 800 });
        await page.goto('/gcl/professional-cloud-network-engineer');
        await expect(page.locator('h1')).toBeVisible();
    });
});
