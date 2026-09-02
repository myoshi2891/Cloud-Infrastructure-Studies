// __tests__/gcl/professional-cloud-developer/section4/NavBar.test.tsx
// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NavBar } from '@/app/gcl/professional-cloud-developer/section4/NavBar';
import { NAV_ITEMS } from '@/app/gcl/professional-cloud-developer/section4/constants';

type ObserverCallback = (entries: IntersectionObserverEntry[]) => void;

let observerCallback: ObserverCallback | null = null;

const entry = (id: string, top: number, isIntersecting = true): IntersectionObserverEntry => {
    const target = document.getElementById(id) as HTMLElement;
    return {
        target,
        isIntersecting,
        boundingClientRect: { top } as DOMRectReadOnly,
    } as unknown as IntersectionObserverEntry;
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

describe('professional-cloud-developer section4 NavBar', () => {
    it('全目次項目が DOM に描画され、初期状態で最初の項目が active になる', () => {
        render(<NavBar />);
        const first = linkFor(NAV_ITEMS[0]!.id);
        expect(first).not.toBeNull();
        expect(first.classList.contains('active')).toBe(true);
        expect(first.getAttribute('aria-current')).toBe('location');

        for (const item of NAV_ITEMS) {
            const link = linkFor(item.id);
            expect(link).not.toBeNull();
            expect(link.textContent?.trim()).toBe(item.label);
            if (item.lvl3) {
                expect(link.classList.contains('lvl3')).toBe(true);
            }
        }
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

    it('修飾キー付きクリックでは smooth scroll と pushState を抑止する', () => {
        render(<NavBar />);
        const targetItem = NAV_ITEMS[2]!;
        const targetElement = document.getElementById(targetItem.id) as HTMLElement;
        const scrollIntoViewMock = vi.fn();
        targetElement.scrollIntoView = scrollIntoViewMock;

        const link = linkFor(targetItem.id);
        fireEvent.click(link, { metaKey: true });
        fireEvent.click(link, { ctrlKey: true });
        fireEvent.click(link, { shiftKey: true });
        fireEvent.click(link, { altKey: true });
        fireEvent.click(link, { button: 1 });

        expect(scrollIntoViewMock).not.toHaveBeenCalled();
    });

    it('IntersectionObserver の交差通知で最も上にある要素が active になる', () => {
        render(<NavBar />);
        expect(observerCallback).not.toBeNull();

        const item1 = NAV_ITEMS[1]!;
        const item2 = NAV_ITEMS[2]!;

        act(() => {
            observerCallback?.([entry(item1.id, 120), entry(item2.id, 40)]);
        });

        expect(linkFor(item2.id).classList.contains('active')).toBe(true);
    });

    it('交差要素が非交差になった場合は active を維持または更新する', () => {
        render(<NavBar />);
        const item1 = NAV_ITEMS[1]!;
        const item2 = NAV_ITEMS[2]!;

        act(() => {
            observerCallback?.([entry(item1.id, 50, true), entry(item2.id, 150, true)]);
        });
        expect(linkFor(item1.id).classList.contains('active')).toBe(true);

        act(() => {
            observerCallback?.([entry(item1.id, -200, false)]);
        });
        expect(linkFor(item2.id).classList.contains('active')).toBe(true);
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
