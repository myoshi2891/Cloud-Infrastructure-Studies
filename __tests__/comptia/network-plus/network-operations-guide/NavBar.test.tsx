// __tests__/comptia/network-plus/network-operations-guide/NavBar.test.tsx
// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NavBar } from '@/app/comptia/network-plus/network-operations-guide/NavBar';
import { NAV_ITEMS } from '@/app/comptia/network-plus/network-operations-guide/constants';

type ObserverCallback = (entries: IntersectionObserverEntry[]) => void;

/** 直近に生成された IntersectionObserver のコールバック。 */
let observerCallback: ObserverCallback | null = null;

/**
 * 交差エントリのスタブを作る。
 * @param id - 対象セクションの id。
 * @param top - ビューポート上端からの距離。
 * @param isIntersecting - 交差しているかどうか。
 * @returns テスト用の IntersectionObserverEntry。
 */
const entry = (id: string, top: number, isIntersecting = true): IntersectionObserverEntry => {
    const target = document.getElementById(id) as HTMLElement;
    return {
        target,
        isIntersecting,
        boundingClientRect: { top } as DOMRectReadOnly,
    } as IntersectionObserverEntry;
};

/**
 * NAV_ITEMS の各 id を持つセクションを DOM へ用意する。
 */
const mountSections = () => {
    for (const item of NAV_ITEMS) {
        const section = document.createElement('section');
        section.id = item.id;
        section.tabIndex = -1;
        document.body.appendChild(section);
    }
};

/**
 * 指定 id のナビリンクを返す。
 * @param id - セクション id。
 * @returns アンカー要素。
 */
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

describe('network-operations-guide NavBar', () => {
    it('交差中のうち最上部のセクションだけを active にする', () => {
        render(<NavBar />);

        act(() => {
            observerCallback?.([
                entry('documentation', 420),
                entry('domain-structure', 120),
                entry('lifecycle', 900),
            ]);
        });

        expect(linkFor('domain-structure')).toHaveAttribute('aria-current', 'location');
        expect(linkFor('lifecycle')).not.toHaveAttribute('aria-current');
    });

    it('上方のセクションが交差したままなら、下方のセクションだけの通知で active を奪われない', () => {
        render(<NavBar />);

        // IntersectionObserver は状態が変化した要素だけを通知する。
        // domain-structure は交差したままなので、2 回目の通知には現れない。
        act(() => {
            observerCallback?.([entry('domain-structure', 120)]);
        });
        act(() => {
            observerCallback?.([entry('lifecycle', 900)]);
        });

        expect(linkFor('domain-structure')).toHaveAttribute('aria-current', 'location');
        expect(linkFor('lifecycle')).not.toHaveAttribute('aria-current');
    });

    it('上方のセクションが交差から外れたら下方のセクションへ active を移す', () => {
        render(<NavBar />);

        act(() => {
            observerCallback?.([entry('domain-structure', 120), entry('lifecycle', 900)]);
        });
        act(() => {
            observerCallback?.([entry('domain-structure', -400, false)]);
        });

        expect(linkFor('lifecycle')).toHaveAttribute('aria-current', 'location');
    });

    it('交差していないエントリは active を書き換えない', () => {
        render(<NavBar />);

        act(() => {
            observerCallback?.([entry('lifecycle', -10, false)]);
        });

        expect(linkFor(NAV_ITEMS[0]!.id)).toHaveAttribute('aria-current', 'location');
    });

    it('初期表示時に URL のハッシュから active を決める', () => {
        window.history.replaceState(null, '', '#lifecycle');

        render(<NavBar />);

        expect(linkFor('lifecycle')).toHaveAttribute('aria-current', 'location');
    });

    it('ブラウザの戻る操作（popstate / hashchange）で active を再同期する', () => {
        render(<NavBar />);

        act(() => {
            window.history.replaceState(null, '', '#documentation');
            window.dispatchEvent(new Event('hashchange'));
        });
        expect(linkFor('documentation')).toHaveAttribute('aria-current', 'location');

        act(() => {
            window.history.replaceState(null, '', '#domain-structure');
            window.dispatchEvent(new PopStateEvent('popstate'));
        });
        expect(linkFor('domain-structure')).toHaveAttribute('aria-current', 'location');
    });

    it('修飾キー付きクリック・副ボタンのクリックでは既定動作を妨げない', () => {
        render(<NavBar />);

        for (const modifier of [{ metaKey: true }, { ctrlKey: true }, { shiftKey: true }, { altKey: true }, { button: 1 }]) {
            const event = new MouseEvent('click', { bubbles: true, cancelable: true, ...modifier });
            linkFor('lifecycle').dispatchEvent(event);
            expect(event.defaultPrevented).toBe(false);
        }
        expect(linkFor(NAV_ITEMS[0]!.id)).toHaveAttribute('aria-current', 'location');
    });

    it('修飾なしの主ボタンのクリックは既定動作を止めてページ内遷移する', () => {
        render(<NavBar />);

        const target = document.getElementById('lifecycle') as HTMLElement;
        target.scrollIntoView = vi.fn();
        const event = new MouseEvent('click', { bubbles: true, cancelable: true, button: 0 });
        fireEvent(linkFor('lifecycle'), event);

        expect(event.defaultPrevented).toBe(true);
        expect(target.scrollIntoView).toHaveBeenCalled();
        expect(window.location.hash).toBe('#lifecycle');
        expect(document.activeElement).toBe(target);
        expect(linkFor('lifecycle')).toHaveAttribute('aria-current', 'location');
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
