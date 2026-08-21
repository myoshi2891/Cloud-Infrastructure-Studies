import { describe, expect, it } from 'vitest';
import { findOrderedTextMismatches } from '@/scripts/verify-html-migration.mjs';

describe('findOrderedTextMismatches', () => {
    // verifyDOMFidelity は移行元 HTML を引数に取る運用者向け CLI（scripts/verify-html-migration.mjs）。
    // 移行元は /archive/ 配下のローカル専用資産（.gitignore 済み）で CI には存在しないため、
    // ここではファイル入力を伴わない純粋関数だけを検証する。移行後ページの全量一致検証は
    // docs/migration-inventory/<slug>.fidelity.json を使う各ページのテストが担う。
    it('detects reordered duplicates instead of accepting a global text match', () => {
        expect(findOrderedTextMismatches(['A', 'B', 'A'], ['A', 'A', 'B'])).toEqual([
            'B [移行先: A]',
            'A [移行先: B]',
        ]);
    });
});
