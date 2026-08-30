// __tests__/recommended-books/infrastructure-as-code/NavBar.test.tsx
// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NavBar } from '@/app/recommended-books/infrastructure-as-code/NavBar';
import { NAV_ITEMS } from '@/app/recommended-books/infrastructure-as-code/constants';

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
    document.body.innerHTML = '';
});

describe('Infrastructure as Code NavBar コンポーネント', () => {
    it('目次ナビゲーションが nav[aria-label="目次"] を持ち、全リンクを描画すること', () => {
        const { container } = render(<NavBar />);
        const nav = container.querySelector('nav[aria-label="目次"]');
        expect(nav).not.toBeNull();

        const links = nav?.querySelectorAll('a');
        expect(links?.length).toBe(NAV_ITEMS.length);
    });

    it('NAV_ITEMS の全 32 項目が描画されること', () => {
        render(<NavBar />);
        const links = document.querySelectorAll('nav a');
        expect(links).toHaveLength(NAV_ITEMS.length);

        NAV_ITEMS.forEach((item) => {
            const a = linkFor(item.id);
            expect(a).not.toBeNull();
            expect(a.textContent?.trim()).toBe(item.label);
            if (item.isLvl3) {
                expect(a.className).toContain('lvl3');
            }
        });
    });

    it('初期状態で最初の項目（この記事の対象読者）が active であること', () => {
        render(<NavBar />);
        const firstItem = NAV_ITEMS[0];
        if (firstItem) {
            const firstLink = linkFor(firstItem.id);
            expect(firstLink.className).toContain('active');
        }
    });

    it('リンククリック時に scrollIntoView、pushState、focus、onClose が正しく実行されること', () => {
        mountSections();
        const onClose = vi.fn();
        render(<NavBar onClose={onClose} />);

        const targetItem = NAV_ITEMS[2];
        if (!targetItem) return;

        const targetEl = document.getElementById(targetItem.id);
        if (!targetEl) return;

        targetEl.scrollIntoView = vi.fn();
        const focusSpy = vi.spyOn(targetEl, 'focus');
        const pushStateSpy = vi.spyOn(window.history, 'pushState');

        const link = linkFor(targetItem.id);
        fireEvent.click(link);

        expect(targetEl.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
        expect(pushStateSpy).toHaveBeenCalledWith(null, '', `#${targetItem.id}`);
        expect(focusSpy).toHaveBeenCalled();
        expect(onClose).toHaveBeenCalled();
    });

    it('IntersectionObserver による交差検知で activeId が更新されること', () => {
        mountSections();
        render(<NavBar />);

        expect(observerCallback).not.toBeNull();

        const secondItem = NAV_ITEMS[1];
        if (!secondItem) return;

        act(() => {
            observerCallback?.([entry(secondItem.id, 100, true)]);
        });

        const secondLink = linkFor(secondItem.id);
        expect(secondLink.className).toContain('active');
    });

    it('isOpen=true のとき aside.sidebar に open クラスが付与されること', () => {
        const { container, rerender } = render(<NavBar isOpen={false} />);
        const aside = container.querySelector('aside.sidebar');
        expect(aside?.className).not.toContain('open');

        rerender(<NavBar isOpen={true} />);
        expect(aside?.className).toContain('open');
    });
});
