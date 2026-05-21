import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import ScrollSpy from '@/app/gcl/agwa/ScrollSpy';

describe('ScrollSpy', () => {
    beforeEach(() => {
        // テスト用のDOMツリーを作成
        document.body.innerHTML = `
            <div>
                <a class="sidebar-link" href="#s1">Domain 1</a>
                <a class="sidebar-link" href="#s2">Domain 2</a>
                <div id="s1" class="section" style="height: 500px;">Section 1</div>
                <div id="s2" class="section" style="height: 500px;">Section 2</div>
            </div>
        `;
    });

    afterEach(() => {
        document.body.innerHTML = '';
        vi.restoreAllMocks();
    });

    it('意図的な失敗テスト', () => {
        // TDDワークフローのための失敗テスト
        expect(true).toBe(false);
    });

    it('初期レンダリング時に最初のセクションのリンクが active になること', () => {
        render(<ScrollSpy />);
        const link1 = document.querySelector('a[href="#s1"]');
        expect(link1?.classList.contains('active')).toBe(true);
    });
});
