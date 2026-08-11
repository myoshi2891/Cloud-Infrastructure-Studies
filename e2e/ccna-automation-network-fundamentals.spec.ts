import { test, expect } from '@playwright/test';

test.describe('CCNA Automation Network Fundamentals 完全自動視覚 & 動的スクロール検証', () => {
    const pageUrl = '/cisco/ccna/automation-network-fundamentals';

    test.beforeEach(async ({ page }) => {
        await page.goto(pageUrl);
    });

    test('ページタイトルおよびH1見出しが正しいこと', async ({ page }) => {
        await expect(page).toHaveTitle(
            'CCNAAUTO 200-901 | 6.0 Network Fundamentals 完全対策ガイド | Cloud Infrastructure Studies',
        );
        await expect(page.locator('h1')).toContainText('Network Fundamentals ドメイン徹底解説');
    });

    test('全13セクションの見出しが正常に描画されること', async ({ page }) => {
        const sections = [
            'overview',
            'step0',
            'step1',
            'step2',
            'step3',
            'step4',
            'step5',
            'step6',
            'step7',
            'step8',
            'step9',
            'summary',
            'references',
        ];

        for (const sectionId of sections) {
            const sectionLocator = page.locator(`#${sectionId}`);
            await expect(sectionLocator).toBeVisible();
        }
    });

    test('サイドバーのアクティブハイライト (ScrollSpy) がスクロールに応じて正しく連動すること', async ({ page }) => {
        // Scroll to Step 3
        await page.locator('#step3').scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);

        const activeLink = page.locator('.sidebar a.active');
        await expect(activeLink).toHaveAttribute('href', '#step3');

        // Scroll to Step 8
        await page.locator('#step8').scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);

        await expect(page.locator('.sidebar a.active')).toHaveAttribute('href', '#step8');
    });

    test('全セクションスクロール時、コンソールエラーや警告が発生しないこと', async ({ page }) => {
        const errors: string[] = [];
        page.on('console', (msg) => {
            if (msg.type() === 'error' || msg.type() === 'warning') {
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
