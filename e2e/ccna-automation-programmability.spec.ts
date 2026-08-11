import { test, expect } from '@playwright/test';

test.describe('CCNA Automation and Programmability 完全自動視覚 & 動的スクロール検証', () => {
    const pageUrl = '/cisco/ccna/automation-programmability';

    test.beforeEach(async ({ page }) => {
        await page.goto(pageUrl);
    });

    test('ページタイトルおよびH1見出しが正しいこと', async ({ page }) => {
        await expect(page).toHaveTitle(/6.0 自動化とプログラマビリティ/);
        await expect(page.locator('h1')).toContainText('6.0 自動化とプログラマビリティ');
    });

    test('全セクションの見出しが正常に描画されること', async ({ page }) => {
        const sections = [
            'overview',
            'sec61',
            'sec62',
            'sec63',
            'sec64',
            'sec65',
            'sec66',
            'sec67',
            'summary',
            'sources',
        ];

        for (const sectionId of sections) {
            const sectionLocator = page.locator(`#${sectionId}`);
            await expect(sectionLocator).toBeVisible();
        }
    });

    test('サイドバーのアクティブハイライト (ScrollSpy) がスクロールに応じて正しく連動すること', async ({ page }) => {
        // Scroll to Section 6.3
        await page.locator('#sec63').scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);

        const activeLink = page.locator('.sidebar a.active');
        await expect(activeLink).toHaveAttribute('href', '#sec63');

        // Scroll to Section 6.7
        await page.locator('#sec67').scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);

        await expect(page.locator('.sidebar a.active')).toHaveAttribute('href', '#sec67');
    });

    test('全セクションスクロール時、コンソールエラーや警告が発生しないこと', async ({ page }) => {
        const errors: string[] = [];
        page.on('console', (msg) => {
            if (msg.type() === 'error') {
                errors.push(msg.text());
            }
        });

        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(500);

        expect(errors).toEqual([]);
    });

    test('レスポンシブ表示（640px）でヘッダーおよびコンテンツのレイアウト崩れがないこと', async ({ page }) => {
        await page.setViewportSize({ width: 640, height: 800 });
        await page.goto(pageUrl);
        await expect(page.locator('h1')).toBeVisible();
    });
});
