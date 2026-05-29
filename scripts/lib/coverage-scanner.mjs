import fs from 'node:fs';
import path from 'node:path';

const IMPORT_RE = /from\s+['"](@\/[^'"]+)['"]/g;
const GOTO_RE = /page\.goto\(\s*(['"])([^'"]+)\1\s*\)/g;

/**
 * Extract unique alias import paths from a source file.
 * @param {string} source - The file contents to scan for aliased imports.
 * @returns {string[]} Unique alias import paths found in the source, deduplicated.
 */
export function extractImports(source) {
    const seen = new Set();
    for (const match of source.matchAll(IMPORT_RE)) {
        seen.add(match[1]);
    }
    return [...seen];
}

/**
 * Extracts unique route strings used in `page.goto(...)` calls from the given source text.
 * @param {string} source - Source code to scan for `page.goto` call arguments.
 * @returns {string[]} Unique route strings captured from `page.goto(...)` occurrences.
 */
export function extractGotoPaths(source) {
    const seen = new Set();
    for (const match of source.matchAll(GOTO_RE)) {
        seen.add(match[2]);
    }
    if (source.includes('CRITICAL_PAGES')) {
        try {
            const criticalPagesPath = path.resolve(process.cwd(), 'e2e/helpers/critical-pages.ts');
            if (fs.existsSync(criticalPagesPath)) {
                const content = fs.readFileSync(criticalPagesPath, 'utf8');
                const paths = content.match(/['"](\/[^'"]*)['"]/g) || [];
                for (const p of paths) {
                    seen.add(p.replace(/['"]/g, ''));
                }
            }
        } catch {
            // Ignore error
        }
    }
    return [...seen];
}

const RESOLVE_EXTENSIONS = ['.ts', '.tsx', '.mjs', '.js', '.jsx'];

/**
 * Resolve a '@/...' module alias to a concrete project file path if present in the provided fileset.
 * @param {string} alias - Module alias beginning with `'@/'` (e.g., `'@/components/Button'`).
 * @param {Set<string>} fileset - Set of project-relative file paths (forward-slash separated) to check against.
 * @returns {string|null} The matching file path from `fileset` including extension (or `/index` or `/page` variant), or `null` if none found.
 */
export function resolveAliasPath(alias, fileset) {
    if (!alias.startsWith('@/')) return null;
    const rel = alias.slice(2);

    for (const ext of RESOLVE_EXTENSIONS) {
        if (fileset.has(`${rel}${ext}`)) return `${rel}${ext}`;
    }
    for (const ext of RESOLVE_EXTENSIONS) {
        const indexPath = `${rel}/index${ext}`;
        if (fileset.has(indexPath)) return indexPath;
    }
    for (const ext of RESOLVE_EXTENSIONS) {
        const pagePath = `${rel}/page${ext}`;
        if (fileset.has(pagePath)) return pagePath;
    }
    return null;
}

/**
 * Classify a test file path into one of the project's test categories.
 *
 * @param {string} testPath - File path relative to the repository root (may use either '/' or '\' separators).
 * @returns {'E2E'|'Smoke'|'Integration'|'Unit'} The test category: `'E2E'` for files under `e2e/`, `'Smoke'` for files named `smoke.test.*` or `smoke.spec.*`, `'Integration'` for files under `__tests__/lib/`, and `'Unit'` for all others.
 */
export function classifyTestCategory(testPath) {
    const normalized = testPath.replace(/\\/g, '/');
    if (normalized.endsWith('visual.spec.ts') || normalized.endsWith('visual.spec.tsx')) return 'Visual';
    if (normalized.endsWith('a11y.spec.ts') || normalized.endsWith('a11y.spec.tsx')) return 'A11y';
    if (normalized.endsWith('perf.spec.ts') || normalized.endsWith('perf.spec.tsx')) return 'Performance';
    if (normalized.includes('security-audit')) return 'Security';
    if (normalized.startsWith('e2e/')) return 'E2E';
    if (/\bsmoke\.(test|spec)\.[tj]sx?$/.test(normalized)) return 'Smoke';
    if (normalized.startsWith('__tests__/lib/')) return 'Integration';
    return 'Unit';
}

/**
 * Recursively collects file paths under a directory that satisfy a predicate.
 * Hidden entries (names starting with `.`) and `node_modules` directories are skipped.
 * @param {string} dir - The directory path to traverse.
 * @param {(filePath: string) => boolean} predicate - Test function invoked with each file's absolute path; files for which this returns `true` are included.
 * @param {string[]} [out=[]] - Optional accumulator array to append matching file paths to.
 * @returns {string[]} The accumulator array containing matching absolute file paths.
 */
function walk(dir, predicate, out = []) {
    if (!fs.existsSync(dir)) return out;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            walk(full, predicate, out);
        } else if (predicate(full)) {
            out.push(full);
        }
    }
    return out;
}

/**
 * Collects source file paths from the app, components, and lib directories and returns them relative to the provided root.
 *
 * Scans those folders recursively for files with extensions .ts, .tsx, .mjs, .js, .jsx, normalizes paths to use forward slashes, deduplicates, and sorts the result.
 * @param {string} rootDir - The project root directory to scan.
 * @returns {string[]} Sorted array of unique source file paths relative to `rootDir`, using forward slashes.
 */
export function listSourceFiles(rootDir) {
    const result = new Set();
    const roots = ['app', 'components', 'lib'];
    for (const r of roots) {
        const abs = path.join(rootDir, r);
        for (const f of walk(abs, (p) => /\.(tsx?|mjs|jsx?)$/.test(p))) {
            result.add(path.relative(rootDir, f).replace(/\\/g, '/'));
        }
    }
    return [...result].sort();
}

/**
 * Collects test files under __tests__ and e2e, returning their paths relative to rootDir.
 *
 * Finds files matching `.test.(ts|tsx|js|jsx)` under `__tests__` (excluding `__tests__/scripts/` and `__tests__/docs/`) and `.spec.(ts|tsx|js|jsx)` under `e2e`, and returns a sorted array of their relative paths.
 * @param {string} rootDir - Project root directory to scan.
 * @return {string[]} Sorted array of test file paths relative to `rootDir`.
 */
export function listTestFiles(rootDir) {
    const result = [];
    const unitRoot = path.join(rootDir, '__tests__');
    for (const f of walk(unitRoot, (p) => /\.test\.(tsx?|jsx?)$/.test(p))) {
        const rel = path.relative(rootDir, f).replace(/\\/g, '/');
        if (rel.startsWith('__tests__/scripts/') && !rel.includes('security-audit')) continue;
        if (rel.startsWith('__tests__/docs/')) continue;
        result.push(rel);
    }
    const e2eRoot = path.join(rootDir, 'e2e');
    for (const f of walk(e2eRoot, (p) => /\.spec\.(tsx?|jsx?)$/.test(p))) {
        result.push(path.relative(rootDir, f).replace(/\\/g, '/'));
    }
    return result.sort();
}

/**
 * Map a route path to its corresponding app page source file if present.
 * @param {string} routePath - Route path; leading and trailing slashes are ignored.
 * @param {Set<string>} fileset - Set of project file paths to resolve against.
 * @returns {string|null} The matching source file path (e.g. `app/.../page.tsx` or `app/.../page.ts`) if found, `null` otherwise.
 */
export function resolveGotoPathToSource(routePath, fileset) {
    const trimmed = routePath.replace(/^\/+/, '').replace(/\/+$/, '');
    const candidates = trimmed
        ? [`app/${trimmed}/page.tsx`, `app/${trimmed}/page.ts`]
        : ['app/page.tsx', 'app/page.ts'];
    for (const c of candidates) {
        if (fileset.has(c)) return c;
    }
    return null;
}
