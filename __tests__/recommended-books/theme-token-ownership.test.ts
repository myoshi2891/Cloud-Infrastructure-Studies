import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(path, 'utf8');

/** 3層トークンアーキテクチャへ移行済みの推薦書籍ガイド */
const GUIDES = [
    'operating-systems-three-easy-pieces',
    'systems-performance',
    'understanding-the-linux-kernel',
    'unix-linux-sysadmin-handbook',
] as const;

const stylesheet = (slug: string) => read(`app/recommended-books/${slug}/page.css`);

describe('recommended-books guide theme token ownership', () => {
    it('defines every guide token in the global theme layer', () => {
        const globals = read('app/globals.css');

        expect(globals).toContain('--color-pca-s4-background: #07111e');
        expect(globals).toContain('--color-pca-s4-mermaid-label: #eaf2ff');
        expect(globals).toContain('--color-pca-s4-heading-strong: #e0e8f6');
    });

    it.each(GUIDES)('%s declares no component-local custom properties', (slug) => {
        expect(stylesheet(slug)).not.toMatch(/^\s*--[\w-]+\s*:/m);
    });

    it.each(GUIDES)('%s references theme tokens instead of raw colors', (slug) => {
        expect(stylesheet(slug)).not.toMatch(/#[0-9a-f]{3,8}\b/i);
        expect(stylesheet(slug)).not.toMatch(/rgba?\(/i);
    });

    it.each(GUIDES)('%s removes the closed mobile sidebar from focus order', (slug) => {
        const css = stylesheet(slug);
        const closed = css.match(/\.sidebar \{([^}]*)\}/g)?.find((r) => r.includes('translateX(-100%)')) ?? '';
        const open = css.match(/\.sidebar\.open \{([^}]*)\}/)?.[1] ?? '';

        expect(closed).toContain('visibility: hidden');
        expect(closed).toMatch(/transition:[^;]*visibility/);
        expect(open).toContain('visibility: visible');
    });

    it('uses plain selectors rather than CSS Modules :global() in global stylesheets', () => {
        for (const slug of GUIDES) {
            expect(stylesheet(slug)).not.toContain(':global(');
        }
    });
});
