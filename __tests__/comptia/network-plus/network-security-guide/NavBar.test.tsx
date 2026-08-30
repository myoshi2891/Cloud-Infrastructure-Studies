// __tests__/comptia/network-plus/network-security-guide/NavBar.test.tsx
// @vitest-environment jsdom
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NavBar } from '@/app/comptia/network-plus/network-security-guide/NavBar';
import { NAV_ITEMS } from '@/app/comptia/network-plus/network-security-guide/constants';

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

describe('network-security-guide NavBar', () => {
    it('交差中のうち最上部のセクションだけを active にする', () => {
        render(<NavBar />);

        act(() => {
            observerCallback?.([
                entry('attacks', 420),
                entry('concepts', 120),
                entry('defenses', 900),
            ]);
        });

        expect(linkFor('concepts')).toHaveAttribute('aria-current', 'location');
        expect(linkFor('defenses')).not.toHaveAttribute('aria-current');
    });

    it('上方のセクションが交差したままなら、下方のセクションだけの通知で active を奪われない', () => {
        render(<NavBar />);

        act(() => {
            observerCallback?.([entry('overview', 10), entry('concepts', 400)]);
        });
        expect(linkFor('overview')).toHaveAttribute('aria-current', 'location');

        act(() => {
            observerCallback?.([entry('concepts', 350)]);
        });
        expect(linkFor('overview')).toHaveAttribute('aria-current', 'location');
    });

    it('上方のセクションが画面外へ出たら、残る最上部へ active が遷移する', () => {
        render(<NavBar />);

        act(() => {
            observerCallback?.([entry('overview', 10), entry('concepts', 400)]);
        });

        act(() => {
            observerCallback?.([entry('overview', -500, false)]);
        });

        expect(linkFor('concepts')).toHaveAttribute('aria-current', 'location');
        expect(linkFor('overview')).not.toHaveAttribute('aria-current');
    });

    it('クリック時に pushState で URL ハッシュを更新し、対象要素へ focus() する', () => {
        render(<NavBar />);

        const targetSection = document.getElementById('attacks') as HTMLElement;
        const focusSpy = vi.spyOn(targetSection, 'focus');
        const pushStateSpy = vi.spyOn(window.history, 'pushState');

        fireEvent.click(linkFor('attacks'), { button: 0 });

        expect(pushStateSpy).toHaveBeenCalledWith(null, '', '#attacks');
        expect(focusSpy).toHaveBeenCalledTimes(1);
    });

    it('修飾キー付きクリック（新規タブ等）では pushState や preventDefault を呼ばない', () => {
        render(<NavBar />);

        const pushStateSpy = vi.spyOn(window.history, 'pushState');
        fireEvent.click(linkFor('attacks'), { button: 0, metaKey: true });

        expect(pushStateSpy).not.toHaveBeenCalled();
    });

    it('モバイルトグルボタンのクリックで open クラスと aria-expanded が切り替わる', () => {
        render(<NavBar />);

        const toggleButton = screen.getByRole('button', { name: /目次ナビゲーション/ });
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

        const toggleButton = screen.getByRole('button', { name: /目次ナビゲーション/ });
        const sidebar = screen.getByLabelText('サイドバー目次');

        fireEvent.click(toggleButton);
        expect(sidebar).toHaveClass('open');

        fireEvent.click(linkFor('defenses'), { button: 0 });
        expect(sidebar).not.toHaveClass('open');
        expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('URLハッシュがある状態でマウントされた場合、そのセクションを active にする', () => {
        window.history.replaceState(null, '', '/#checklist');
        render(<NavBar />);

        expect(linkFor('checklist')).toHaveAttribute('aria-current', 'location');
    });
});
