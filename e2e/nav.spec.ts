import { test, expect } from '@playwright/test';

test.describe('グローバルナビ ハンバーガー導線', () => {
    test('ハンバーガーで Drawer を開き、ACE Domain 1 へ遷移できる', async ({ page }) => {
        // Arrange
        await page.goto('/');
        const trigger = page.getByRole('button', { name: 'メニューを開く' });
        await expect(trigger).toHaveAttribute('aria-expanded', 'false');

        // Act: Drawer を開く
        await trigger.click();
        const drawer = page.getByRole('dialog', { name: 'サイトナビゲーション' });
        await expect(drawer).toBeVisible();
        await expect(trigger).toHaveAttribute('aria-expanded', 'true');

        // Act: ACE アコーディオンを展開（summary をクリック）
        await drawer.locator('summary', { hasText: 'Associate Cloud Engineer' }).click();

        // Act: Domain 1 へ遷移
        await drawer.getByRole('link', { name: /Domain 1: 環境設定/ }).click();

        // Assert
        await expect(page).toHaveURL(/\/gcl\/associate-cloud-engineer\/domain1$/);
    });

    test('Drawer に AWS 見出しが描画され、Escape で閉じる', async ({ page }) => {
        // Arrange
        await page.goto('/');
        await page.getByRole('button', { name: 'メニューを開く' }).click();
        const drawer = page.getByRole('dialog', { name: 'サイトナビゲーション' });

        // Assert: AWS 見出しが visible
        await expect(drawer.getByRole('heading', { name: 'Amazon Web Services' })).toBeVisible();

        // Act: Escape で閉じる
        await page.keyboard.press('Escape');

        // Assert
        await expect(drawer).toBeHidden();
        await expect(page.getByRole('button', { name: 'メニューを開く' })).toHaveAttribute(
            'aria-expanded',
            'false',
        );
    });
});
