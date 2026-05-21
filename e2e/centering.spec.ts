import { test, expect } from '@playwright/test';

test.describe('ナビゲーションバーとヒーローの中央寄せテスト', () => {
    const pages = [
        { url: '/gcl/genai-leader', navSelector: 'nav.sticky-nav' },
        { url: '/gcl/genai-leader/section1', navSelector: 'nav.snav' },
        { url: '/gcl/genai-leader/section2', navSelector: 'nav.topnav' },
        { url: '/gcl/genai-leader/section3', navSelector: 'nav.snav' },
        { url: '/gcl/genai-leader/section4', navSelector: 'nav.snav' },
    ];

    for (const p of pages) {
        test(`${p.url} のナビゲーションバーとヒーロータイトルが中央寄せされていること`, async ({ page }) => {
            await page.goto(p.url);
            
            // ナビゲーションバーの justify-content が center であること (デスクトップサイズ時)
            await page.setViewportSize({ width: 1024, height: 768 });
            const nav = page.locator(p.navSelector);
            await expect(nav).toBeVisible();
            const justifyContent = await nav.evaluate((el) => window.getComputedStyle(el).justifyContent);
            expect(justifyContent).toBe('center');

            // ヒーローが text-align center であること
            const hero = page.locator('.hero');
            await expect(hero).toBeVisible();
            const textAlign = await hero.evaluate((el) => window.getComputedStyle(el).textAlign);
            expect(textAlign).toBe('center');
        });
    }
});
