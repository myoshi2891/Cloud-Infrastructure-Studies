import { describe, it, expect } from 'vitest';
import {
    extractImports,
    extractGotoPaths,
    resolveAliasPath,
    classifyTestCategory,
    extractReadFilePaths,
    listSourceFiles,
} from '../../scripts/lib/coverage-scanner.mjs';

describe('coverage-scanner / file-backed source references', () => {
    it('includes CSS files in dashboard source candidates', () => {
        expect(listSourceFiles(process.cwd())).toContain(
            'app/cisco/devnet-professional/page.module.css'
        );
    });

    it('extracts CSS paths read directly or through join(process.cwd())', () => {
        const src = [
            "readFileSync('app/cisco/devnet-associate/page.module.css', 'utf8');",
            "readFileSync(join(process.cwd(), 'app/cisco/ccna/network-fundamentals-guide/page.css'), 'utf8');",
        ].join('\n');

        expect(extractReadFilePaths(src)).toEqual([
            'app/cisco/devnet-associate/page.module.css',
            'app/cisco/ccna/network-fundamentals-guide/page.css',
        ]);
    });
});

describe('coverage-scanner / extractImports', () => {
    it('should extract single @/ alias import statement', () => {
        const src = `import { toNavTree } from '@/app/navigation';\n`;
        expect(extractImports(src)).toEqual(['@/app/navigation']);
    });

    it('should extract multiple @/ imports and ignore non-alias imports', () => {
        const src = [
            "import { describe } from 'vitest';",
            "import { Foo } from '@/components/Foo';",
            "import Bar from '@/lib/utils';",
            "import path from 'node:path';",
        ].join('\n');
        expect(extractImports(src)).toEqual(['@/components/Foo', '@/lib/utils']);
    });

    it('should deduplicate identical imports', () => {
        const src = [
            "import { a } from '@/lib/x';",
            "import { b } from '@/lib/x';",
        ].join('\n');
        expect(extractImports(src)).toEqual(['@/lib/x']);
    });

    it('should return empty array when no @/ import exists', () => {
        expect(extractImports("import path from 'node:path';\n")).toEqual([]);
    });
});

describe('coverage-scanner / resolveAliasPath', () => {
    it('should resolve @/lib/foo to lib/foo.ts when ts file exists in the provided fileset', () => {
        const fileset = new Set(['lib/foo.ts', 'lib/bar.tsx']);
        expect(resolveAliasPath('@/lib/foo', fileset)).toBe('lib/foo.ts');
    });

    it('should resolve @/components/Foo to components/Foo.tsx', () => {
        const fileset = new Set(['components/Foo.tsx']);
        expect(resolveAliasPath('@/components/Foo', fileset)).toBe('components/Foo.tsx');
    });

    it('should resolve @/app/x to app/x/page.tsx when directory index exists', () => {
        const fileset = new Set(['app/x/page.tsx']);
        expect(resolveAliasPath('@/app/x', fileset)).toBe('app/x/page.tsx');
    });

    it('should return null when no matching file exists in fileset', () => {
        const fileset = new Set(['lib/other.ts']);
        expect(resolveAliasPath('@/lib/missing', fileset)).toBeNull();
    });
});

describe('coverage-scanner / extractGotoPaths', () => {
    it('should extract page.goto path argument', () => {
        const src = `await page.goto('/gcl/associate-cloud-engineer');\n`;
        expect(extractGotoPaths(src)).toEqual(['/gcl/associate-cloud-engineer']);
    });

    it('should extract multiple goto calls with deduplication', () => {
        const src = [
            "await page.goto('/');",
            "await page.goto('/gcl/genai-leader');",
            "await page.goto('/gcl/genai-leader');",
        ].join('\n');
        expect(extractGotoPaths(src)).toEqual(['/', '/gcl/genai-leader']);
    });

    it('should ignore goto with template literal containing variables', () => {
        const src = 'await page.goto(`${baseURL}/x`);\n';
        expect(extractGotoPaths(src)).toEqual([]);
    });

    it('should support double-quoted string argument', () => {
        const src = `await page.goto("/agwa");\n`;
        expect(extractGotoPaths(src)).toEqual(['/agwa']);
    });
});

describe('coverage-scanner / classifyTestCategory', () => {
    it('should classify e2e/*.spec.ts as E2E', () => {
        expect(classifyTestCategory('e2e/nav.spec.ts')).toBe('E2E');
    });

    it('should classify __tests__/smoke.test.tsx as Smoke', () => {
        expect(classifyTestCategory('__tests__/smoke.test.tsx')).toBe('Smoke');
    });

    it('should classify __tests__/lib/*.test.ts as Integration', () => {
        expect(classifyTestCategory('__tests__/lib/navigation.test.ts')).toBe('Integration');
    });

    it('should classify __tests__/**/*.test.tsx (default) as Unit', () => {
        expect(classifyTestCategory('__tests__/gcl/ace-domain1.test.tsx')).toBe('Unit');
    });
});
