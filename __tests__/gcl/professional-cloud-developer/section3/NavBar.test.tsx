// __tests__/gcl/professional-cloud-developer/section3/NavBar.test.tsx
// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NavBar } from '@/app/gcl/professional-cloud-developer/section3/NavBar';
import { NAV_ITEMS } from '@/app/gcl/professional-cloud-developer/section3/constants';

type ObserverCallback = (entries: IntersectionObserverEntry[]) => void;

let observerCallback: ObserverCallback | null = null;

const entry = (id: string, top: number, isIntersecting = true): IntersectionObserverEntry => {
    const target = document.getElementById(id) as HTMLElement;
    return {
        target,
        isIntersecting,
        boundingClientRect: { top } as DOMRectReadOnly,
    } as IntersectionObserverEntry;
};

const mountSections = () => {
    for (const item of NAV_ITEMS) {
        const section = document.createElement('section');
        section.id = item.id;
        section.tabIndex = -1;
        document.body.appendChild(section);
    }
};

const linkFor = (id: string): HTMLAnchorElement =>
    document.querySelector(`nav a[href="#${id}"]`) as HTMLAnchorElement;

beforeEach(() => {
    observerCallback = null;
    vi.stubGlobal(
        'IntersectionObserver',
        class {
            constructor(callback: ObserverCallback) {
                observerCallback = callback;
            }
            observe() {}
            disconnect() {}
            unobserve() {}
            takeRecords() {
                return [];
            }
        },
    );
    window.history.replaceState(null, '', '/');
    mountSections();
});

afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    document.body.innerHTML = '';
});

describe('professional-cloud-developer section3 NavBar', () => {
    it('交差中のうち最上部のセクションだけを active にする', () => {
        render(<NavBar />);

        act(() => {
            observerCallback?.([
                entry(NAV_ITEMS[1]!.id, 420),
                entry(NAV_ITEMS[0]!.id, 120),
                entry(NAV_ITEMS[2]!.id, 900),
            ]);
        });

        expect(linkFor(NAV_ITEMS[0]!.id)).toHaveAttribute('aria-current', 'location');
        expect(linkFor(NAV_ITEMS[2]!.id)).not.toHaveAttribute('aria-current');
    });

    it('上方のセクションが交差したままなら、下方のセクションだけの通知で active を奪われない', () => {
        render(<NavBar />);

        act(() => {
            observerCallback?.([entry(NAV_ITEMS[0]!.id, 10), entry(NAV_ITEMS[1]!.id, 400)]);
        });
        expect(linkFor(NAV_ITEMS[0]!.id)).toHaveAttribute('aria-current', 'location');

        act(() => {
            observerCallback?.([entry(NAV_ITEMS[1]!.id, 350)]);
        });
        expect(linkFor(NAV_ITEMS[0]!.id)).toHaveAttribute('aria-current', 'location');
    });

    it('上方のセクションが画面外へ出たら、残る最上部へ active が遷移する', () => {
        render(<NavBar />);

        act(() => {
            observerCallback?.([entry(NAV_ITEMS[0]!.id, 10), entry(NAV_ITEMS[1]!.id, 400)]);
        });

        act(() => {
            observerCallback?.([entry(NAV_ITEMS[0]!.id, -500, false)]);
        });

        expect(linkFor(NAV_ITEMS[1]!.id)).toHaveAttribute('aria-current', 'location');
        expect(linkFor(NAV_ITEMS[0]!.id)).not.toHaveAttribute('aria-current');
    });

    it('修飾キー付きクリック・副ボタンのクリックでは既定動作を妨げない', () => {
        render(<NavBar />);

        for (const modifier of [
            { metaKey: true },
            { ctrlKey: true },
            { shiftKey: true },
            { altKey: true },
            { button: 1 },
        ]) {
            const event = new MouseEvent('click', { bubbles: true, cancelable: true, ...modifier });
            linkFor(NAV_ITEMS[1]!.id).dispatchEvent(event);
            expect(event.defaultPrevented).toBe(false);
        }
        expect(linkFor(NAV_ITEMS[0]!.id)).toHaveAttribute('aria-current', 'location');
    });

    it('修飾なしの主ボタンのクリックは既定動作を止めてページ内遷移する', () => {
        render(<NavBar />);

        const target = document.getElementById(NAV_ITEMS[1]!.id) as HTMLElement;
        target.scrollIntoView = vi.fn();
        const event = new MouseEvent('click', { bubbles: true, cancelable: true, button: 0 });
        fireEvent(linkFor(NAV_ITEMS[1]!.id), event);

        expect(event.defaultPrevented).toBe(true);
        expect(target.scrollIntoView).toHaveBeenCalled();
        expect(decodeURIComponent(window.location.hash)).toBe(`#${NAV_ITEMS[1]!.id}`);
        expect(document.activeElement).toBe(target);
        expect(linkFor(NAV_ITEMS[1]!.id)).toHaveAttribute('aria-current', 'location');
    });

    it('モバイルトグルボタンのクリックで open クラスと aria-expanded が切り替わる', () => {
        render(<NavBar />);

        const toggleButton = screen.getByRole('button', { name: /メニュー/ });
        const sidebar = screen.getByLabelText('サイドバー目次');

        expect(sidebar).not.toHaveClass('open');
        expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

        fireEvent.click(toggleButton);

        expect(sidebar).toHaveClass('open');
        expect(toggleButton).toHaveAttribute('aria-expanded', 'true');

        fireEvent.click(toggleButton);

        expect(sidebar).not.toHaveClass('open');
        expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('モバイルでリンクをクリックするとサイドバーが閉じる', () => {
        render(<NavBar />);

        const toggleButton = screen.getByRole('button', { name: /メニュー/ });
        const sidebar = screen.getByLabelText('サイドバー目次');

        fireEvent.click(toggleButton);
        expect(sidebar).toHaveClass('open');

        const target = document.getElementById(NAV_ITEMS[1]!.id) as HTMLElement;
        target.scrollIntoView = vi.fn();
        fireEvent.click(linkFor(NAV_ITEMS[1]!.id), { button: 0 });
        expect(sidebar).not.toHaveClass('open');
        expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('初期表示時に URL のハッシュから active を決める', () => {
        window.history.replaceState(null, '', `#${NAV_ITEMS[2]!.id}`);
        render(<NavBar />);

        expect(linkFor(NAV_ITEMS[2]!.id)).toHaveAttribute('aria-current', 'location');
    });

    it('ブラウザの戻る操作（popstate / hashchange）で active を再同期する', () => {
        render(<NavBar />);

        act(() => {
            window.history.replaceState(null, '', `#${NAV_ITEMS[1]!.id}`);
            window.dispatchEvent(new Event('hashchange'));
        });
        expect(linkFor(NAV_ITEMS[1]!.id)).toHaveAttribute('aria-current', 'location');

        act(() => {
            window.history.replaceState(null, '', `#${NAV_ITEMS[2]!.id}`);
            window.dispatchEvent(new PopStateEvent('popstate'));
        });
        expect(linkFor(NAV_ITEMS[2]!.id)).toHaveAttribute('aria-current', 'location');
    });

    it('壊れたパーセントエスケープのハッシュでも例外を投げず active を保つ', () => {
        window.history.replaceState(null, '', '#%');

        expect(() => render(<NavBar />)).not.toThrow();
        expect(linkFor(NAV_ITEMS[0]!.id)).toHaveAttribute('aria-current', 'location');
    });

    it('存在しないハッシュでは active を書き換えない', () => {
        window.history.replaceState(null, '', '#not-a-section');

        render(<NavBar />);

        expect(linkFor(NAV_ITEMS[0]!.id)).toHaveAttribute('aria-current', 'location');
    });
});
