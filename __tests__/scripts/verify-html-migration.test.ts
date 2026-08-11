import path from 'node:path';
import { describe, expect, it } from 'vitest';
import {
    findOrderedTextMismatches,
    verifyDOMFidelity,
} from '@/scripts/verify-html-migration.mjs';

describe('verifyDOMFidelity', () => {
    it('compares every normalized source and migrated entry in order', () => {
        const sourcePath = path.resolve(
            process.cwd(),
            'archive/Cisco/html/ccna/Ccna-automation-network-fundamentals.html',
        );

        expect(() => verifyDOMFidelity(sourcePath)).not.toThrow();
    });

    it('detects reordered duplicates instead of accepting a global text match', () => {
        expect(findOrderedTextMismatches(['A', 'B', 'A'], ['A', 'A', 'B'])).toEqual([
            'B [移行先: A]',
            'A [移行先: B]',
        ]);
    });
});
