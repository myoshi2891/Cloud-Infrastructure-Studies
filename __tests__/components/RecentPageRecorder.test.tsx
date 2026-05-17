import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render } from '@testing-library/react';

// next/navigation の usePathname をテスト用に差し替える。
const pathnameMock = vi.fn<() => string | null>(() => '/');
vi.mock('next/navigation', () => ({
    usePathname: () => pathnameMock(),
}));

import { RecentPageRecorder } from '@/components/RecentPageRecorder';
import { getRecent } from '@/lib/recentPages';

beforeEach(() => {
    window.localStorage.clear();
    pathnameMock.mockReset();
    pathnameMock.mockReturnValue('/');
    document.title = 'Cloud Infrastructure Studies';
});

describe('RecentPageRecorder', () => {
    it('マウント時に現在の pathname と document.title を recentPages に記録すること', () => {
        // Arrange
        pathnameMock.mockReturnValue('/gcl/associate-cloud-engineer');
        document.title = 'Associate Cloud Engineer | Cloud Infrastructure Studies';

        // Act
        render(<RecentPageRecorder />);

        // Assert
        const recent = getRecent();
        expect(recent).toHaveLength(1);
        expect(recent[0]?.href).toBe('/gcl/associate-cloud-engineer');
        // " | サイト名" suffix を除去したクリーンなラベル
        expect(recent[0]?.label).toBe('Associate Cloud Engineer');
    });

    it('document.title がサイト名のみのとき履歴に記録しないこと（無意味な空ラベル防止）', () => {
        // Arrange
        pathnameMock.mockReturnValue('/');
        document.title = 'Cloud Infrastructure Studies';

        // Act
        render(<RecentPageRecorder />);

        // Assert: ラベルがサイト名そのものなので空とみなされ記録されない
        expect(getRecent()).toEqual([]);
    });

    it('pathname が null/undefined のときは何も記録しないこと', () => {
        // Arrange
        pathnameMock.mockReturnValue(null);
        document.title = 'foo | Cloud Infrastructure Studies';

        // Act
        render(<RecentPageRecorder />);

        // Assert
        expect(getRecent()).toEqual([]);
    });

    it('レンダリング結果が null（DOM を生成しない）こと', () => {
        // Arrange & Act
        pathnameMock.mockReturnValue('/x');
        document.title = 'X | Cloud Infrastructure Studies';
        const { container } = render(<RecentPageRecorder />);

        // Assert
        expect(container).toBeEmptyDOMElement();
    });
});
