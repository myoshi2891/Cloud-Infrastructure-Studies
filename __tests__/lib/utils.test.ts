import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('lib/utils', () => {
    describe('cn', () => {
        it('composes simple class names', () => {
            expect(cn('class1', 'class2')).toBe('class1 class2');
        });

        it('ignores falsy values', () => {
            expect(cn('class1', null, undefined, false, 'class2')).toBe('class1 class2');
        });

        it('handles conditional object formats', () => {
            expect(cn({ class1: true, class2: false, class3: true })).toBe('class1 class3');
        });

        it('handles arrays of class names', () => {
            expect(cn(['class1', 'class2'], ['class3'])).toBe('class1 class2 class3');
        });

        it('merges tailwind classes conflict correctly', () => {
            // px-2 and px-4 conflict, tailwind-merge should resolve to px-4
            expect(cn('px-2', 'px-4')).toBe('px-4');
            // bg-red-500 and bg-blue-500 conflict, should resolve to bg-blue-500
            expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
            // p-4 subsumes py-1 and px-2, so tailwind-merge resolves to p-4 only
            expect(cn('px-2 py-1', 'p-4')).toBe('p-4');
        });
    });
});
