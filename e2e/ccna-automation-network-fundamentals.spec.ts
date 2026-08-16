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

/**
 * ページ高が安定するまで待機します。
 *
 * @remarks
 * Mermaid 図は非同期に描画されるため、読み込み直後に測った座標はレンダリング完了後には
 * 無効になります（実測でページ高が 17000px → 22500px まで伸びる）。スクロール位置を
 * 計算する前に必ず本関数で安定を待ちます。
 */
async function waitForLayoutSettled(page: import('@playwright/test').Page) {
    let previousHeight = -1;
    let stableCount = 0;
    const deadline = Date.now() + 30_000;

    while (Date.now() < deadline) {
        const height = await page.evaluate(() => document.body.scrollHeight);
        stableCount = height === previousHeight ? stableCount + 1 : 0;
        previousHeight = height;
        if (stableCount >= 4) return;
        await page.waitForTimeout(150);
    }
    throw new Error('ページ高が安定しませんでした');
}

/**
 * 指定したセクションを、ビューポート高の20〜30%にある検出帯の中央へ移動します。
 *
 * @param sectionId 移動対象のセクションID
 * @remarks
 * `window.scrollTo` によりページのスクロール位置を変更します。CSS の
 * `scroll-behavior: smooth` を打ち消すため `behavior: 'instant'` を指定し、
 * 到達を実測で確認してから戻ります。ページ末尾のセクションは検出帯まで
 * スクロールできないため、スクロール下限に達した時点で完了とみなします。
 */
async function positionSectionInDetectionBand(
    page: import('@playwright/test').Page,
    sectionId: (typeof sectionIds)[number],
) {
    await waitForLayoutSettled(page);

    const deadline = Date.now() + 15_000;
    while (Date.now() < deadline) {
        const positioned = await page.evaluate((id) => {
            const section = document.getElementById(id);
            if (!section) throw new Error(`Expected section #${id}`);

            const bandTop = window.innerHeight * 0.2;
            const bandBottom = window.innerHeight * 0.3;
            const bandCenter = (bandTop + bandBottom) / 2;
            const delta = section.getBoundingClientRect().top - bandCenter;

            // ページ末尾のセクションは検出帯の中央まで持ち上げられないため、
            // スクロール下限に到達していれば到達済みとみなす
            const atBottom =
                window.scrollY + window.innerHeight >= document.body.scrollHeight - 1;
            if (Math.abs(delta) <= 2 || atBottom) return true;

            window.scrollTo({ top: window.scrollY + delta, behavior: 'instant' });
            return false;
        }, sectionId);

        if (positioned) return;
        await page.waitForTimeout(100);
    }
    throw new Error(`#${sectionId} を検出帯へ配置できませんでした`);
}

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
        await positionSectionInDetectionBand(page, 'step3');

        const activeLink = page.locator('.sidebar a.active');
        await expect(activeLink).toHaveAttribute('href', '#step3');

        await positionSectionInDetectionBand(page, 'step8');

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
            await positionSectionInDetectionBand(page, sectionId);
            await expect(page.locator('.sidebar a.active')).toHaveAttribute(
                'href',
                `#${sectionId}`,
            );
        }
        await expect(page.locator('.sidebar a.active')).toHaveAttribute('href', '#references');

        expect(errors).toEqual([]);
    });

    test('レスポンシブ表示（640px）でヘッダーおよびコンテンツのレイアウト崩れがないこと', async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 800 });
        await page.goto(pageUrl);

        const desktopLayout = await page.evaluate(() => {
            const content = document.querySelector<HTMLElement>('.main');
            const navigation = document.querySelector<HTMLElement>('.sidebar');
            if (!content || !navigation) throw new Error('Expected content and navigation');

            const contentRect = content.getBoundingClientRect();
            const navigationRect = navigation.getBoundingClientRect();
            const contentStyle = window.getComputedStyle(content);

            return {
                viewportWidth: window.innerWidth,
                contentLeft: contentRect.left,
                contentRight: contentRect.right,
                contentWidth: contentRect.width,
                navigationWidth: navigationRect.width,
                marginLeft: contentStyle.marginLeft,
                computedWidth: contentStyle.width,
                maxWidth: contentStyle.maxWidth,
            };
        });

        expect(desktopLayout.navigationWidth).toBe(280);
        expect(desktopLayout.marginLeft).toBe('280px');
        expect(desktopLayout.contentLeft).toBe(280);
        expect(desktopLayout.contentRight).toBe(desktopLayout.viewportWidth);
        expect(desktopLayout.contentWidth).toBe(desktopLayout.viewportWidth - 280);
        expect(desktopLayout.computedWidth).toBe(`${desktopLayout.contentWidth}px`);
        expect(desktopLayout.maxWidth).toBe('none');

        await page.setViewportSize({ width: 640, height: 800 });
        await page.goto(pageUrl);
        await expect(page.locator('h1')).toBeVisible();

        const layout = await page.evaluate(() => {
            const content = document.querySelector<HTMLElement>('.main');
            const navigation = document.querySelector<HTMLElement>('.sidebar');
            if (!content || !navigation) throw new Error('Expected content and navigation');

            const contentRect = content.getBoundingClientRect();
            const navigationRect = navigation.getBoundingClientRect();
            const contentStyle = window.getComputedStyle(content);
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
                marginLeft: contentStyle.marginLeft,
                computedWidth: contentStyle.width,
                overlaps,
            };
        });

        expect(layout.scrollWidth).toBeLessThanOrEqual(layout.viewportWidth);
        expect(layout.navigationWidth).toBe(0);
        expect(layout.overlaps).toBe(false);
        expect(layout.marginLeft).toBe('0px');
        expect(layout.computedWidth).toBe(`${layout.viewportWidth}px`);
        expect(layout.contentLeft).toBeGreaterThanOrEqual(0);
        expect(layout.contentRight).toBeLessThanOrEqual(layout.viewportWidth);
        expect(layout.contentWidth).toBeGreaterThan(0);
        expect(layout.contentWidth).toBeLessThanOrEqual(layout.viewportWidth);
    });
});
