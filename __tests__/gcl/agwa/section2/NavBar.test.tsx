import { act, render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { NavBar } from '@/app/gcl/agwa/section2/NavBar';

describe('AGWA Section 2 NavBar', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('スクロールでもページ末尾の見出しを有効化し、リスナーを解除する', () => {
        vi.spyOn(window, 'innerHeight', 'get').mockReturnValue(800);
        vi.spyOn(window, 'scrollY', 'get').mockReturnValue(1_200);
        vi.spyOn(document.documentElement, 'scrollHeight', 'get').mockReturnValue(2_000);
        const addEventListener = vi.spyOn(window, 'addEventListener');
        const removeEventListener = vi.spyOn(window, 'removeEventListener');

        const { container, unmount } = render(
            <>
                <main className="main">
                    <h2 id="section-2の全体像">Section 2の全体像</h2>
                    <h2 id="参考文献">参考文献</h2>
                </main>
                <NavBar />
            </>,
        );

        const scrollCall = addEventListener.mock.calls.find(([type]) => type === 'scroll');
        expect(scrollCall).toEqual(['scroll', expect.any(Function), { passive: true }]);

        act(() => window.dispatchEvent(new Event('scroll')));
        expect(container.querySelector('a[href="#参考文献"]')).toHaveClass('active');

        const scrollHandler = scrollCall?.[1];
        unmount();
        expect(removeEventListener).toHaveBeenCalledWith('scroll', scrollHandler);
    });
});
