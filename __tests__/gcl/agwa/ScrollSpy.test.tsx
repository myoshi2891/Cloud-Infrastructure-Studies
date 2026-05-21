import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import ScrollSpy from '@/app/gcl/agwa/ScrollSpy';

describe('ScrollSpy', () => {
    let s1: HTMLElement;
    let s2: HTMLElement;

    beforeEach(() => {
        // テスト用のDOMツリーを作成
        document.body.innerHTML = `
            <div>
                <a class="sidebar-link" href="#s1">Domain 1</a>
                <a class="sidebar-link" href="#s2">Domain 2</a>
                <div id="s1" class="section">Section 1</div>
                <div id="s2" class="section">Section 2</div>
            </div>
        `;

        s1 = document.getElementById('s1')!;
        s2 = document.getElementById('s2')!;

        // offsetTopのモック
        Object.defineProperty(s1, 'offsetTop', { get: () => 0, configurable: true });
        Object.defineProperty(s2, 'offsetTop', { get: () => 500, configurable: true });

        // window.scrollYのモック
        Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true });
    });

    afterEach(() => {
        document.body.innerHTML = '';
        vi.restoreAllMocks();
    });

    it('初期レンダリング時に最初のセクションのリンクが active になること', () => {
        render(<ScrollSpy />);
        const link1 = document.querySelector('a[href="#s1"]');
        const link2 = document.querySelector('a[href="#s2"]');
        expect(link1?.classList.contains('active')).toBe(true);
        expect(link2?.classList.contains('active')).toBe(false);
    });

    it('スクロール時に window.scrollY の値に応じて active になるリンクが切り替わること', () => {
        render(<ScrollSpy />);

        // window.scrollYをモックしてスクロールイベントを発火
        // offsetTop 500 に対し、scrollY 450 + 80 = 530 >= 500 となるため s2 が active になるべき
        Object.defineProperty(window, 'scrollY', { value: 450, writable: true, configurable: true });
        fireEvent.scroll(window);

        const link1 = document.querySelector('a[href="#s1"]');
        const link2 = document.querySelector('a[href="#s2"]');
        expect(link1?.classList.contains('active')).toBe(false);
        expect(link2?.classList.contains('active')).toBe(true);
    });
});
