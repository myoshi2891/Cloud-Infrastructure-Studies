import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { NavBar as AccelerateNavBar } from '@/app/recommended-books/accelerate/NavBar';
import { NavBar as InfrastructureAsCodeNavBar } from '@/app/recommended-books/infrastructure-as-code/NavBar';
import { NavBar as ReleaseItNavBar } from '@/app/recommended-books/release-it/NavBar';
import { NavBar as SreNavBar } from '@/app/recommended-books/site-reliability-engineering/NavBar';
import { NavBar as DevOpsHandbookNavBar } from '@/app/recommended-books/the-devops-handbook/NavBar';

const NAVBARS = [
    ['accelerate', AccelerateNavBar],
    ['infrastructure-as-code', InfrastructureAsCodeNavBar],
    ['release-it', ReleaseItNavBar],
    ['site-reliability-engineering', SreNavBar],
    ['the-devops-handbook', DevOpsHandbookNavBar],
] as const;

/** prefers-reduced-motion の一致・不一致を切り替える matchMedia スタブを差し込む。 */
const stubMatchMedia = (prefersReduced: boolean) => {
    const matchMedia = vi.fn((query: string) => ({
        matches: prefersReduced && query.includes('prefers-reduced-motion'),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    }));
    vi.stubGlobal('matchMedia', matchMedia);
};

/** 最初の目次リンクをクリックし、scrollIntoView に渡された引数を返す。 */
const clickFirstNavLink = (container: HTMLElement) => {
    const scrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoView;

    const link = container.querySelector<HTMLAnchorElement>('a[href^="#"]');
    expect(link).not.toBeNull();

    // スクロール先の見出しを DOM に用意する（実ページ側の本文相当）。
    const targetId = link!.getAttribute('href')!.slice(1);
    const target = document.createElement('h2');
    target.id = targetId;
    document.body.appendChild(target);

    link!.click();
    return scrollIntoView;
};

describe('推薦書籍ガイドのサイドバーナビゲーション（モーション設定）', () => {
    const originalScrollIntoView = Element.prototype.scrollIntoView;

    beforeEach(() => {
        vi.unstubAllGlobals();
    });

    afterEach(() => {
        cleanup();
        vi.unstubAllGlobals();
        Element.prototype.scrollIntoView = originalScrollIntoView;
        document.body.innerHTML = '';
    });

    it.each(NAVBARS)(
        '%s: prefers-reduced-motion: reduce ではスムーススクロールを行わない',
        (_slug, NavBarComponent) => {
            stubMatchMedia(true);
            const { container } = render(<NavBarComponent />);

            const scrollIntoView = clickFirstNavLink(container);

            expect(scrollIntoView).toHaveBeenCalledTimes(1);
            const options = scrollIntoView.mock.calls[0]?.[0];
            expect(options).not.toMatchObject({ behavior: 'smooth' });
        },
    );

    it.each(NAVBARS)(
        '%s: モーション制限がない場合はスムーススクロールする',
        (_slug, NavBarComponent) => {
            stubMatchMedia(false);
            const { container } = render(<NavBarComponent />);

            const scrollIntoView = clickFirstNavLink(container);

            expect(scrollIntoView).toHaveBeenCalledWith(
                expect.objectContaining({ behavior: 'smooth' }),
            );
        },
    );
});
