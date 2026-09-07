// __tests__/recommended-books/understanding-the-linux-kernel/NavBar.test.tsx
// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NavBar } from '@/app/recommended-books/understanding-the-linux-kernel/NavBar';
import { NAV_ITEMS } from '@/app/recommended-books/understanding-the-linux-kernel/constants';

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

/** noUncheckedIndexedAccess 下で NAV_ITEMS の添字アクセスを安全に絞り込む */
const navItemAt = (index: number) => {
    const item = NAV_ITEMS[index];
    if (!item) throw new Error(`NAV_ITEMS[${index}] が存在しません`);
    return item;
};

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

describe('understanding-the-linux-kernel NavBar', () => {
    it('初期状態で NAV_ITEMS[0] が active になる', () => {
        render(<NavBar />);
        const first = linkFor(navItemAt(0).id);
        expect(first).not.toBeNull();
        expect(first.classList.contains('active')).toBe(true);
    });

    it('nav要素にaria-labelが付与されている', () => {
        render(<NavBar />);
        const nav = screen.getByRole('navigation', { name: '目次' });
        expect(nav).toBeInTheDocument();
    });

    it('リンククリックで active が切り替わり、対象要素にフォーカスが移動する', () => {
        render(<NavBar />);
        const targetItem = navItemAt(2);
        const link = linkFor(targetItem.id);
        const section = document.getElementById(targetItem.id) as HTMLElement;
        const focusSpy = vi.spyOn(section, 'focus');

        fireEvent.click(link);

        expect(link.classList.contains('active')).toBe(true);
        expect(focusSpy).toHaveBeenCalled();
        expect(decodeURIComponent(window.location.hash)).toBe(`#${targetItem.id}`);
    });

    it('IntersectionObserver のコールバックで最も画面上部に近い交差要素が active になる', () => {
        render(<NavBar />);
        expect(observerCallback).not.toBeNull();

        act(() => {
            observerCallback!([
                entry(navItemAt(1).id, 120),
                entry(navItemAt(3).id, 40),
            ]);
        });

        const activeLink = linkFor(navItemAt(3).id);
        expect(activeLink.classList.contains('active')).toBe(true);
    });

    it('モバイルトグルボタンの開閉で aria-expanded が更新される', () => {
        render(<NavBar />);
        const toggleBtn = screen.getByRole('button', { name: 'メニュー' });
        expect(toggleBtn.getAttribute('aria-expanded')).toBe('false');

        fireEvent.click(toggleBtn);
        expect(toggleBtn.getAttribute('aria-expanded')).toBe('true');

        fireEvent.click(toggleBtn);
        expect(toggleBtn.getAttribute('aria-expanded')).toBe('false');
    });
});
