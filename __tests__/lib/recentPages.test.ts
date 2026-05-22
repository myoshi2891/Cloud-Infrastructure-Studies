import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getRecent, pushRecent, type RecentEntry, MAX_RECENT } from '@/lib/recentPages';

// jsdom 環境では window.localStorage が利用可能。テストごとにクリアする。
beforeEach(() => {
    window.localStorage.clear();
});

describe('lib/recentPages', () => {
    describe('getRecent', () => {
        it('localStorage が空のとき空配列を返すこと', () => {
            // Arrange & Act
            const result = getRecent();

            // Assert
            expect(result).toEqual([]);
        });

        it('保存されたエントリを新しい順で返すこと', () => {
            // Arrange
            pushRecent({ href: '/a', label: 'A' });
            pushRecent({ href: '/b', label: 'B' });
            pushRecent({ href: '/c', label: 'C' });

            // Act
            const result = getRecent();

            // Assert
            expect(result.map((e) => e.href)).toEqual(['/c', '/b', '/a']);
        });

        it('localStorage に壊れた JSON が入っているとき空配列を返すこと', () => {
            // Arrange
            window.localStorage.setItem('cis:recent-pages', '{ broken json');

            // Act
            const result = getRecent();

            // Assert
            expect(result).toEqual([]);
        });

        it('localStorage に配列でない値が入っているとき空配列を返すこと', () => {
            // Arrange
            window.localStorage.setItem('cis:recent-pages', '{"not":"array"}');

            // Act
            const result = getRecent();

            // Assert
            expect(result).toEqual([]);
        });

        it('localStorage に href/label を欠く要素が混在するとき、それらを除外して返すこと', () => {
            // Arrange
            window.localStorage.setItem(
                'cis:recent-pages',
                JSON.stringify([
                    { href: '/ok', label: 'OK', ts: 123 },
                    { href: '/no-label' },
                    null,
                    { label: 'no-href' },
                    'string-element',
                ]),
            );

            // Act
            const result = getRecent();

            // Assert
            expect(result).toEqual<RecentEntry[]>([{ href: '/ok', label: 'OK', ts: 123 }]);
        });
    });

    describe('pushRecent', () => {
        it('単一エントリを追加できること', () => {
            // Arrange & Act
            pushRecent({ href: '/x', label: 'X' });

            // Assert
            const result = getRecent();
            expect(result).toHaveLength(1);
            expect(result[0]?.href).toBe('/x');
            expect(result[0]?.label).toBe('X');
            expect(typeof result[0]?.ts).toBe('number');
        });

        it('同一 href を再 push すると重複せず先頭に来ること', () => {
            // Arrange
            pushRecent({ href: '/a', label: 'A' });
            pushRecent({ href: '/b', label: 'B' });

            // Act
            pushRecent({ href: '/a', label: 'A (再訪)' });

            // Assert
            const result = getRecent();
            expect(result.map((e) => e.href)).toEqual(['/a', '/b']);
            expect(result[0]?.label).toBe('A (再訪)');
        });

        it(`MAX_RECENT (=${MAX_RECENT}) を超えると古いものから捨てること`, () => {
            // Arrange & Act: MAX_RECENT + 2 件を push
            for (let i = 0; i < MAX_RECENT + 2; i += 1) {
                pushRecent({ href: `/p${i}`, label: `P${i}` });
            }

            // Assert
            const result = getRecent();
            expect(result).toHaveLength(MAX_RECENT);
            // 末尾 2 件 (/p0, /p1) は捨てられているはず
            expect(result.map((e) => e.href)).not.toContain('/p0');
            expect(result.map((e) => e.href)).not.toContain('/p1');
            // 直近の push が先頭にあること
            expect(result[0]?.href).toBe(`/p${MAX_RECENT + 1}`);
        });

        it('href が空文字のときは push を無視すること', () => {
            // Arrange & Act
            pushRecent({ href: '', label: '空' });

            // Assert
            expect(getRecent()).toEqual([]);
        });

        it('label が空文字のときは push を無視すること (履歴に意味がないため)', () => {
            // Arrange & Act
            pushRecent({ href: '/no-label', label: '' });

            // Assert
            expect(getRecent()).toEqual([]);
        });

        it('localStorage.setItem が失敗（quota 等）してもスローしないこと', () => {
            // Arrange: setItem を例外でモック
            const original = Storage.prototype.setItem;
            Storage.prototype.setItem = vi.fn(() => {
                throw new Error('QuotaExceeded');
            });

            try {
                // Act & Assert: 例外が外に漏れない
                expect(() => pushRecent({ href: '/x', label: 'X' })).not.toThrow();
            } finally {
                Storage.prototype.setItem = original;
            }
        });
    });

    describe('SSR safety', () => {
        it('window 不在を模した実行で getRecent が空配列を返すこと', () => {
            // Arrange: window.localStorage の getItem を一時的に未定義化
            const originalGet = Storage.prototype.getItem;
            Storage.prototype.getItem = vi.fn(() => {
                throw new Error('not available');
            });

            try {
                // Act & Assert: 例外が外に漏れず空配列が返る
                expect(getRecent()).toEqual([]);
            } finally {
                Storage.prototype.getItem = originalGet;
            }
        });
    });

    describe('isRecentEntry validation logic', () => {
        it('ts が数値でないエントリを除外すること', () => {
            // Arrange
            window.localStorage.setItem(
                'cis:recent-pages',
                JSON.stringify([
                    { href: '/ok', label: 'OK', ts: 123 },
                    { href: '/invalid-ts', label: 'Invalid TS', ts: '12345' }, // ts is a string
                ]),
            );

            // Act
            const result = getRecent();

            // Assert
            expect(result).toEqual<RecentEntry[]>([{ href: '/ok', label: 'OK', ts: 123 }]);
        });
    });
});
