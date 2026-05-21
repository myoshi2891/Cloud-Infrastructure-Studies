import fs from 'node:fs';
import path from 'node:path';

const IMPORT_RE = /from\s+['"](@\/[^'"]+)['"]/g;
const GOTO_RE = /page\.goto\(\s*(['"])([^'"]+)\1\s*\)/g;

export function extractImports(source) {
    const seen = new Set();
    for (const match of source.matchAll(IMPORT_RE)) {
        seen.add(match[1]);
    }
    return [...seen];
}

export function extractGotoPaths(source) {
    const seen = new Set();
    for (const match of source.matchAll(GOTO_RE)) {
        seen.add(match[2]);
    }
    return [...seen];
}

const RESOLVE_EXTENSIONS = ['.ts', '.tsx', '.mjs', '.js', '.jsx'];

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

export function classifyTestCategory(testPath) {
    const normalized = testPath.replace(/\\/g, '/');
    if (normalized.startsWith('e2e/')) return 'E2E';
    if (/\bsmoke\.(test|spec)\.[tj]sx?$/.test(normalized)) return 'Smoke';
    if (normalized.startsWith('__tests__/lib/')) return 'Integration';
    return 'Unit';
}

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

export function listTestFiles(rootDir) {
    const result = [];
    const unitRoot = path.join(rootDir, '__tests__');
    for (const f of walk(unitRoot, (p) => /\.test\.(tsx?|jsx?)$/.test(p))) {
        const rel = path.relative(rootDir, f).replace(/\\/g, '/');
        if (rel.startsWith('__tests__/scripts/') || rel.startsWith('__tests__/docs/')) continue;
        result.push(rel);
    }
    const e2eRoot = path.join(rootDir, 'e2e');
    for (const f of walk(e2eRoot, (p) => /\.spec\.(tsx?|jsx?)$/.test(p))) {
        result.push(path.relative(rootDir, f).replace(/\\/g, '/'));
    }
    return result.sort();
}

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
