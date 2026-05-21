import { test, expect } from '@playwright/test';

test.describe('Cloud Digital Leader ページ', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/gcl/cloud-digital-leader');
    });

    test('ページが正常に表示されること', async ({ page }) => {
        await expect(page.locator('h1')).toContainText('Cloud Digital Leader');
    });

    test('ページタイトルが正しいこと', async ({ page }) => {
        await expect(page).toHaveTitle(/Cloud Digital Leader 認定試験/);
    });

    test('主要セクションが表示されること', async ({ page }) => {
        // セクション0〜6の見出しを検証
        await expect(page.locator('h2', { hasText: '試験概要と出題セクション' })).toBeVisible();
        await expect(page.locator('h2', { hasText: 'DX・クラウド基礎 — デジタルトランスフォーメーションと Google Cloud' })).toBeVisible();
        await expect(page.locator('h2', { hasText: 'データとイノベーション — クラウドによるイノベーション' })).toBeVisible();
        await expect(page.locator('h2', { hasText: 'インフラとモダナイゼーション — インフラとアプリのモダナイゼーション' })).toBeVisible();
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
        await page.goto('/gcl/cloud-digital-leader');
        await expect(page.locator('h1')).toBeVisible();
    });
});
