import { test, expect } from '@playwright/test';

const sectionIds = [
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
] as const;

test.describe('CCNA Automation Network Fundamentals 完全自動視覚 & 動的スクロール検証', () => {
    const pageUrl = '/cisco/ccna/automation-network-fundamentals';

    test.beforeEach(async ({ page }) => {
        await page.goto(pageUrl);
    });

    test('ページタイトルおよびH1見出しが正しいこと', async ({ page }) => {
        await expect(page).toHaveTitle(
            'CCNAAUTO 200-901 | 6.0 Network Fundamentals 完全対策ガイド | Cloud Infrastructure Studies',
        );
        await expect(page.locator('h1')).toHaveText('Network Fundamentals ドメイン徹底解説');
    });

    test('全13セクションの見出しが正常に描画されること', async ({ page }) => {
        for (const sectionId of sectionIds) {
            const sectionLocator = page.locator(`#${sectionId}`);
            await expect(sectionLocator).toBeVisible();
        }
    });

    test('サイドバーのアクティブハイライト (ScrollSpy) がスクロールに応じて正しく連動すること', async ({ page }) => {
        // Scroll to Step 3
        await page.locator('#step3').scrollIntoViewIfNeeded();

        const activeLink = page.locator('.sidebar a.active');
        await expect(activeLink).toHaveAttribute('href', '#step3');

        // Scroll to Step 8
        await page.locator('#step8').scrollIntoViewIfNeeded();

        await expect(page.locator('.sidebar a.active')).toHaveAttribute('href', '#step8');
    });

    test('全セクションスクロール時、コンソールエラーや警告が発生しないこと', async ({ page }) => {
        const errors: string[] = [];
        page.on('console', (msg) => {
            if (msg.type() === 'error' || msg.type() === 'warning') {
                errors.push(msg.text());
            }
        });

        await page.goto(pageUrl);
        for (const sectionId of sectionIds) {
            await page.locator(`#${sectionId}`).scrollIntoViewIfNeeded();
            await expect(page.locator('.sidebar a.active')).toHaveAttribute(
                'href',
                `#${sectionId}`,
            );
        }
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await expect(page.locator('.sidebar a.active')).toHaveAttribute('href', '#references');

        expect(errors).toEqual([]);
    });

    test('レスポンシブ表示（640px）でヘッダーおよびコンテンツのレイアウト崩れがないこと', async ({ page }) => {
        await page.setViewportSize({ width: 640, height: 800 });
        await page.goto(pageUrl);
        await expect(page.locator('h1')).toBeVisible();

        const layout = await page.evaluate(() => {
            const content = document.querySelector<HTMLElement>('.main');
            const navigation = document.querySelector<HTMLElement>('.sidebar');
            if (!content || !navigation) throw new Error('Expected content and navigation');

            const contentRect = content.getBoundingClientRect();
            const navigationRect = navigation.getBoundingClientRect();
            const overlaps =
                navigationRect.width > 0 &&
                navigationRect.right > contentRect.left &&
                navigationRect.left < contentRect.right;

            return {
                viewportWidth: window.innerWidth,
                scrollWidth: document.documentElement.scrollWidth,
                contentLeft: contentRect.left,
                contentRight: contentRect.right,
                contentWidth: contentRect.width,
                navigationWidth: navigationRect.width,
                overlaps,
            };
        });

        expect(layout.scrollWidth).toBeLessThanOrEqual(layout.viewportWidth);
        expect(layout.navigationWidth).toBe(0);
        expect(layout.overlaps).toBe(false);
        expect(layout.contentLeft).toBeGreaterThanOrEqual(0);
        expect(layout.contentRight).toBeLessThanOrEqual(layout.viewportWidth);
        expect(layout.contentWidth).toBeGreaterThan(0);
        expect(layout.contentWidth).toBeLessThanOrEqual(layout.viewportWidth);
    });
});
