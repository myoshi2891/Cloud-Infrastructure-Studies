import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Google Fonts（next/font/google）はビルド時に fonts.googleapis.com / fonts.gstatic.com へ
 * アクセスするため、CDN が旧リビジョンの CSS（実体削除済みの woff2 URL）を返すと
 * `Failed to fetch <family> from Google Fonts.` でビルドが失敗する。
 * 恒久対策として全ファミリを @fontsource（自己ホスト）へ移行し、その状態をここで機械的に固定する。
 */

const ROOT = process.cwd();

/** ワークスペース内の指定ファイルを読み込み、UTF-8 文字列として返す */
const readWorkspaceFile = (path: string): string => readFileSync(join(ROOT, path), 'utf8');

/** 指定拡張子のファイルをディレクトリ配下から再帰列挙し、リポジトリ相対パスで返す */
const listFiles = (dir: string, extensions: readonly string[]): string[] =>
    readdirSync(join(ROOT, dir), { recursive: true, withFileTypes: true })
        .filter((entry) => entry.isFile() && extensions.some((ext) => entry.name.endsWith(ext)))
        .map((entry) => relative(ROOT, join(entry.parentPath, entry.name)));

/** 各ルートが読み込むべき @fontsource CSS。next/font/google の宣言と 1:1 で対応する */
const EXPECTED_FONT_IMPORTS: ReadonlyArray<readonly [string, readonly string[]]> = [
    [
        'app/layout.tsx',
        [
            '@fontsource-variable/noto-sans-jp/index.css',
            '@fontsource-variable/jetbrains-mono/index.css',
            '@fontsource-variable/dm-sans/index.css',
        ],
    ],
    [
        'app/gcl/genai-leader/section1/page.tsx',
        [
            '@fontsource-variable/fraunces/index.css',
            '@fontsource-variable/azeret-mono/index.css',
        ],
    ],
    [
        'app/gcl/genai-leader/section2/page.tsx',
        [
            '@fontsource-variable/sora/index.css',
            '@fontsource/ibm-plex-mono/400.css',
            '@fontsource/ibm-plex-mono/600.css',
        ],
    ],
    [
        'app/gcl/genai-leader/section3/page.tsx',
        ['@fontsource-variable/outfit/index.css', '@fontsource-variable/fira-code/index.css'],
    ],
    [
        'app/gcl/genai-leader/section4/page.tsx',
        [
            '@fontsource-variable/playfair-display/index.css',
            '@fontsource/dm-mono/300.css',
            '@fontsource/dm-mono/400.css',
            '@fontsource/dm-mono/500.css',
        ],
    ],
];

/** package.json の dependencies に必要な自己ホストフォントパッケージ */
const EXPECTED_PACKAGES = [
    '@fontsource-variable/noto-sans-jp',
    '@fontsource-variable/jetbrains-mono',
    '@fontsource-variable/dm-sans',
    '@fontsource-variable/fraunces',
    '@fontsource-variable/azeret-mono',
    '@fontsource-variable/sora',
    '@fontsource-variable/outfit',
    '@fontsource-variable/fira-code',
    '@fontsource-variable/playfair-display',
    '@fontsource/ibm-plex-mono',
    '@fontsource/dm-mono',
] as const;

/**
 * globals.css の @theme が定義すべきフォントトークンと、その値に必須の family。
 * @fontsource-variable のフォントファミリ名は `<Name> Variable` であり、
 * `'Noto Sans JP'` のような素の名前だけではフォントが適用されない。
 */
const EXPECTED_FONT_TOKENS: ReadonlyArray<readonly [string, readonly string[]]> = [
    ['--font-body', ["'Noto Sans JP Variable'", 'sans-serif']],
    ['--font-display', ["'DM Sans Variable'", 'sans-serif']],
    ['--font-mono', ["'JetBrains Mono Variable'", 'monospace']],
    ['--font-fraunces', ["'Fraunces Variable'", "'Noto Sans JP Variable'", 'serif']],
    ['--font-azeret-mono', ["'Azeret Mono Variable'", 'monospace']],
    ['--font-sora', ["'Sora Variable'", "'Noto Sans JP Variable'", 'sans-serif']],
    ['--font-outfit', ["'Outfit Variable'", "'Noto Sans JP Variable'", 'sans-serif']],
    ['--font-fira-code', ["'Fira Code Variable'", 'monospace']],
    [
        '--font-playfair-display',
        ["'Playfair Display Variable'", "'Noto Sans JP Variable'", 'serif'],
    ],
    ['--font-ibm-plex-mono', ["'IBM Plex Mono'", 'monospace']],
    ['--font-dm-mono', ["'DM Mono'", 'monospace']],
];

/** globals.css の @theme ブロック（Layer 1/2 トークン定義）だけを切り出す */
const extractThemeBlock = (css: string): string => {
    const start = css.indexOf('@theme {');
    expect(start).toBeGreaterThanOrEqual(0);
    const end = css.indexOf('\n}', start);
    expect(end).toBeGreaterThan(start);
    return css.slice(start, end);
};

describe('自己ホストフォント — next/font/google 依存の撤廃', () => {
    it('app / components 配下に next/font への依存が残っていない', () => {
        const sources = [...listFiles('app', ['.ts', '.tsx']), ...listFiles('components', ['.ts', '.tsx'])];
        const offenders = sources.filter((path) => readWorkspaceFile(path).includes('next/font'));
        expect(offenders).toEqual([]);
    });

    it.each(EXPECTED_FONT_IMPORTS)('%s が必要な @fontsource CSS をすべて import している', (path, imports) => {
        const source = readWorkspaceFile(path);
        const missing = imports.filter((specifier) => !source.includes(`'${specifier}'`));
        expect(missing).toEqual([]);
    });

    it('next/font 由来の CSS 変数クラス（font.variable）の適用が残っていない', () => {
        const sources = listFiles('app', ['.tsx']);
        const offenders = sources.filter((path) => /\b\w+\.variable\b/.test(readWorkspaceFile(path)));
        expect(offenders).toEqual([]);
    });

    it('package.json の dependencies に @fontsource パッケージが揃っている', () => {
        const parsed: unknown = JSON.parse(readWorkspaceFile('package.json'));
        const dependencies =
            typeof parsed === 'object' && parsed !== null && 'dependencies' in parsed
                ? (parsed as { dependencies: Record<string, unknown> }).dependencies
                : undefined;
        expect(dependencies).toBeTypeOf('object');
        const missing = EXPECTED_PACKAGES.filter(
            (name) => typeof dependencies?.[name] !== 'string',
        );
        expect(missing).toEqual([]);
    });

    it.each(EXPECTED_FONT_TOKENS)(
        'globals.css の @theme が %s を @fontsource のファミリ名で定義している',
        (token, families) => {
            const theme = extractThemeBlock(readWorkspaceFile('app/globals.css'));
            const declaration = theme
                .split('\n')
                .find((line) => line.trim().startsWith(`${token}:`));
            expect(declaration, `${token} が @theme に未定義`).toBeTypeOf('string');
            const missing = families.filter((family) => !(declaration ?? '').includes(family));
            expect(missing).toEqual([]);
        },
    );

    it('Noto Sans JP / JetBrains Mono を参照する既存トークンも Variable 名を含む', () => {
        const theme = extractThemeBlock(readWorkspaceFile('app/globals.css'));
        const offenders = theme
            .split('\n')
            .map((line) => line.trim())
            .filter((line) => /^--font-[a-z0-9-]+:/.test(line))
            .filter(
                (line) =>
                    (line.includes("'Noto Sans JP'") &&
                        !line.includes("'Noto Sans JP Variable'")) ||
                    (line.includes("'JetBrains Mono'") &&
                        !line.includes("'JetBrains Mono Variable'")),
            );
        expect(offenders).toEqual([]);
    });

    it('未参照だった Space Mono が完全に撤去されている', () => {
        const sources = [...listFiles('app', ['.ts', '.tsx', '.css']), ...listFiles('components', ['.ts', '.tsx'])];
        const offenders = sources.filter((path) => {
            const source = readWorkspaceFile(path);
            return (
                source.includes('Space_Mono') ||
                source.includes('space-mono') ||
                source.includes('--font-display-mono')
            );
        });
        expect(offenders).toEqual([]);
    });

    it('genai-leader 各セクション CSS が参照するフォントトークンが globals.css で定義済み', () => {
        const theme = extractThemeBlock(readWorkspaceFile('app/globals.css'));
        const sectionStyles = [
            'app/gcl/genai-leader/section1/section1.css',
            'app/gcl/genai-leader/section2/section2.css',
            'app/gcl/genai-leader/section3/section3.css',
            'app/gcl/genai-leader/section4/section4.css',
        ];
        const referenced = new Set<string>();
        sectionStyles.forEach((path) => {
            const matches = readWorkspaceFile(path).matchAll(/var\((--font-[a-z0-9-]+)/g);
            for (const match of matches) {
                if (match[1]) referenced.add(match[1]);
            }
        });
        expect(referenced.size).toBe(9);
        const undefinedTokens = [...referenced].filter(
            (token) => !new RegExp(`^\\s*${token}:`, 'm').test(theme),
        );
        expect(undefinedTokens).toEqual([]);
    });
});
