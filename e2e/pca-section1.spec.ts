import { test, expect } from '@playwright/test';

test.describe('PCA Section 1: クラウドソリューションアーキテクチャの設計と計画 ガイド', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/gcl/professional-cloud-architect/section1-design-planning');
    });

    test('ページが正常に表示され、タイトルと主要見出しが表示されること', async ({ page }) => {
        await expect(page.locator('h1')).toContainText('Google Cloud Professional Cloud Architect');
        await expect(page).toHaveTitle(/PCA Section 1: クラウドソリューションアーキテクチャの設計と計画/);
        await expect(page.locator('.hero-sub')).toContainText('セクション1：クラウドソリューションアーキテクチャの設計と計画（配点 約25%）');
    });

    test('サイドバーナビが10個のリンクを持ち、正しく表示されること', async ({ page }) => {
        const sidebar = page.locator('aside.sidebar');
        await expect(sidebar).toBeVisible();
        const navLinks = sidebar.locator('nav ul li a');
        await expect(navLinks).toHaveCount(10);
    });

    test('チェックリストのトグル操作で進行度が更新されること', async ({ page }) => {
        const progress = page.locator('#checklist-progress');
        await expect(progress).toContainText('0 / 12 完了');

        const firstCheckbox = page.locator('ul.checklist-list li label input[type="checkbox"]').first();
        await firstCheckbox.check();
        await expect(progress).toContainText('1 / 12 完了');

        await firstCheckbox.uncheck();
        await expect(progress).toContainText('0 / 12 完了');
    });

    test('Callout が正しくレンダリングされていること', async ({ page }) => {
        const callouts = page.locator('.callout');
        await expect(callouts.first()).toBeVisible();
        const sourceCallouts = page.locator('.callout.callout-source');
        await expect(sourceCallouts.first()).toBeVisible();
        const practiceCallouts = page.locator('.callout.callout-practice');
        await expect(practiceCallouts.first()).toBeVisible();
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

    test('レスポンシブ（640px）でサイドバー開閉トグルが動作すること', async ({ page }) => {
        await page.setViewportSize({ width: 640, height: 800 });
        await page.goto('/gcl/professional-cloud-architect/section1-design-planning');

        const toggleBtn = page.locator('#sidebarToggle');
        await expect(toggleBtn).toBeVisible();

        const sidebar = page.locator('aside.sidebar');
        await expect(sidebar).not.toHaveClass(/open/);

        await toggleBtn.click();
        await expect(sidebar).toHaveClass(/open/);

        // 再クリックで閉じることまで確認する（開くだけの検証では閉じる回帰を見逃す）
        await toggleBtn.click();
        await expect(sidebar).not.toHaveClass(/open/);
    });
});
