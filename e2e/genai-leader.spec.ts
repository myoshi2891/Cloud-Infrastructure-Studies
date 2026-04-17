import { test, expect } from '@playwright/test';

test.describe('Generative AI Leader ページ', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/gcl/genai-leader');
    });

    test('ページが正常に表示されること', async ({ page }) => {
        await expect(page.locator('h1')).toContainText('Generative AI Leader');
    });

    test('ページタイトルが正しいこと', async ({ page }) => {
        await expect(page).toHaveTitle(/Generative AI Leader/);
    });

    test('sticky nav が全セクションリンクを含むこと', async ({ page }) => {
        const nav = page.locator('nav.sticky-nav');
        await expect(nav).toBeVisible();
        await expect(nav.locator('a')).toHaveCount(5);
    });

    test('hero セクションに試験メタデータが表示されること', async ({ page }) => {
        await expect(page.locator('.hero')).toBeVisible();
        await expect(page.locator('text=90 分')).toBeVisible();
        await expect(page.locator('text=$99').first()).toBeVisible();
    });

    test('4つのセクション見出しが表示されること', async ({ page }) => {
        await expect(page.locator('h2', { hasText: '生成 AI の基礎知識' })).toBeVisible();
        await expect(page.locator('h2', { hasText: 'Google Cloud の Gen AI サービス' })).toBeVisible();
        await expect(page.locator('h2', { hasText: 'Gen AI モデル出力改善技術' })).toBeVisible();
        await expect(page.locator('h2', { hasText: 'Gen AI ビジネス戦略' })).toBeVisible();
    });

    test('コンソールエラーがないこと', async ({ page }) => {
        const errors: string[] = [];
        page.on('console', (msg) => {
            if (msg.type() === 'error') {
                errors.push(msg.text());
            }
        });
        await page.goto('/gcl/genai-leader');
        await page.waitForLoadState('networkidle');
        expect(errors).toEqual([]);
    });

    test('レスポンシブ（640px）でレイアウト崩れなし', async ({ page }) => {
        await page.setViewportSize({ width: 640, height: 800 });
        await page.goto('/gcl/genai-leader');
        await expect(page.locator('h1')).toBeVisible();
        await expect(page.locator('.hero')).toBeVisible();
    });
});
