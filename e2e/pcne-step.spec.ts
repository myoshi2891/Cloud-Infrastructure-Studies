import { test, expect } from '@playwright/test';

test.describe('PCNE Step-by-Step ページ', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/gcl/professional-cloud-network-engineer-step-by-step');
    });

    test('ページが正常に表示されること', async ({ page }) => {
        await expect(page.locator('h1')).toContainText('PCNE');
    });

    test('ページタイトルが正しいこと', async ({ page }) => {
        await expect(page).toHaveTitle(/PCNE 完全攻略ガイド \(Step-by-Step\) \| Infra Study/);
    });

    test('主要セクションが表示されること', async ({ page }) => {
        // 各セクションの見出しなどを検証
        await expect(page.locator('h2', { hasText: '1. VPCの設計・実装・管理' })).toBeVisible();
        await expect(page.locator('h2', { hasText: '2. ハイブリッド接続の設計・実装' })).toBeVisible();
        await expect(page.locator('h2', { hasText: '3. ネットワークサービスの設計・実装' })).toBeVisible();
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
        await page.goto('/gcl/professional-cloud-network-engineer-step-by-step');
        await expect(page.locator('h1')).toBeVisible();
    });
});
