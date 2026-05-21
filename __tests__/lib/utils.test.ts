import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('lib/utils', () => {
    describe('cn', () => {
        it('should compose class names (intentionally failing for TDD Step 1)', () => {
            const result = cn('class1', 'class2');
            expect(result).toBe('intentionally-failing-wrong-class');
        });
    });
});
