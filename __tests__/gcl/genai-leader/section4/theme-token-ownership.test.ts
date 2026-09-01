import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(path, 'utf8');

const CSS_PATH = 'app/gcl/genai-leader/section4/section4.css';
const PAGE_PATH = 'app/gcl/genai-leader/section4/page.tsx';

describe('Generative AI Leader Section 4 theme token ownership', () => {
    it('defines every Executive/Gold theme color in the global theme layer', () => {
        const globals = read('app/globals.css');

        expect(globals).toContain('--color-genai-s4-ink: #0a0804');
        expect(globals).toContain('--color-genai-s4-bg-1: #100d08');
        expect(globals).toContain('--color-genai-s4-bg-2: #171209');
        expect(globals).toContain('--color-genai-s4-bg-4: #27200f');
        expect(globals).toContain('--color-genai-s4-border: #2e2213');
        expect(globals).toContain('--color-genai-s4-border-strong: #3d2e18');
        expect(globals).toContain('--color-genai-s4-gold: #c8960a');
        expect(globals).toContain('--color-genai-s4-amber: #f5b731');
        expect(globals).toContain('--color-genai-s4-cream: #f0e6c8');
        expect(globals).toContain('--color-genai-s4-sage: #7aad8a');
        expect(globals).toContain('--color-genai-s4-rose: #d4706a');
        expect(globals).toContain('--color-genai-s4-sand: #c4a882');
        expect(globals).toContain('--color-genai-s4-text: #c9b99a');
        expect(globals).toContain('--color-genai-s4-muted: #cabeaa');
        expect(globals).toContain('--color-genai-s4-bright: #f5ead8');
    });

    it('declares no page-local custom properties in the page stylesheet', () => {
        // セレクタ・インデント・インライン記述（`.s4-page { --x: 1 }`）のいずれでも
        // カスタムプロパティ宣言を検出する。宣言は行頭・`{`・`;` のいずれかに続く。
        expect(read(CSS_PATH)).not.toMatch(/(?:^|[{;\n])\s*--[\w-]+\s*:/);
    });

    it('never shadows the globally shared un-prefixed tokens', () => {
        // globals.css の @theme は --amber / --ink / --navy 等を :root へ出力し、
        // components/sections/ccde/*.module.css などの共有 UI が実消費している。
        // .s4-page 側で同名を再定義すると、その部分木で共有トークンが化ける。
        const shared = ['ink', 'amber', 'border', 'text', 'muted', 'bright'];
        for (const source of [read(CSS_PATH), read(PAGE_PATH)]) {
            for (const token of shared) {
                // 参照（var(--amber)）だけでなく宣言も検出する。シャドウイングは
                // 宣言側で起きるため、CSS 記法（`--amber:`）と page.tsx の
                // インラインスタイルキー（`'--amber':`）の両方を禁止する。
                expect(source).not.toMatch(
                    new RegExp(`var\\(\\s*--${token}\\s*[,)]`)
                );
                expect(source).not.toMatch(
                    new RegExp(
                        `(?:^|[{;\\n])\\s*--${token}\\s*:|['"\`]--${token}['"\`]\\s*:`
                    )
                );
            }
        }
    });

    it('references the shared font tokens instead of page-local aliases', () => {
        const css = read(CSS_PATH);

        expect(css).toContain('var(--font-playfair-display)');
        expect(css).toContain('var(--font-dm-mono)');
        expect(css).not.toMatch(/var\(\s*--(?:serif|mono|body)\s*[,)]/);
    });

    it('keeps page.tsx inline styles on tokens declared in globals.css', () => {
        // 接頭辞（--color- / --font- 等）の許可では `--color-genai-s4-ambr` のような
        // 綴り間違いを検出できないため、globals.css の実宣言集合と突き合わせる。
        const declared = new Set(
            Array.from(
                read('app/globals.css').matchAll(/(?:^|[{;\n])\s*(--[\w-]+)\s*:/g),
                (match) => match[1]
            )
        );
        expect(declared.size).toBeGreaterThan(0);

        const referenced = Array.from(
            read(PAGE_PATH).matchAll(/var\(\s*(--[\w-]+)\s*[,)]/g),
            (match) => match[1]
        );
        const undeclared = [
            ...new Set(referenced.filter((token) => !declared.has(token))),
        ];

        expect(undeclared).toEqual([]);
    });
});
