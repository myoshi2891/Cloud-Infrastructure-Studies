import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
    extractImports,
    extractGotoPaths,
    resolveAliasPath,
    classifyTestCategory,
    listSourceFiles,
    listTestFiles,
    resolveGotoPathToSource,
} from './lib/coverage-scanner.mjs';
import {
    classifyCell,
    domainOf,
    buildActions,
    DOMAINS,
    CATEGORIES,
} from './lib/classifier.mjs';
import { renderDashboardHtml } from './lib/dashboard-html.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

function readSafe(file) {
    try { return fs.readFileSync(file, 'utf8'); } catch { return ''; }
}

function isSourceCandidate(filePath) {
    if (filePath.endsWith('.test.ts') || filePath.endsWith('.test.tsx')) return false;
    if (filePath.endsWith('.spec.ts') || filePath.endsWith('.spec.tsx')) return false;
    if (filePath.endsWith('.d.ts')) return false;
    if (filePath.includes('/__tests__/')) return false;
    if (filePath.includes('/e2e/')) return false;
    return true;
}

function build() {
    const sourceFiles = listSourceFiles(ROOT).filter(isSourceCandidate);
    const sourceSet = new Set(sourceFiles);
    const testFiles = listTestFiles(ROOT);

    const testToSources = new Map();
    for (const t of testFiles) {
        const abs = path.join(ROOT, t);
        const content = readSafe(abs);
        const resolved = new Set();

        for (const alias of extractImports(content)) {
            const src = resolveAliasPath(alias, sourceSet);
            if (src) resolved.add(src);
        }
        for (const goto of extractGotoPaths(content)) {
            const src = resolveGotoPathToSource(goto, sourceSet);
            if (src) resolved.add(src);
        }
        testToSources.set(t, [...resolved]);
    }

    const sourceCovered = new Map();
    for (const s of sourceFiles) sourceCovered.set(s, new Set());
    for (const [t, srcs] of testToSources.entries()) {
        for (const s of srcs) {
            if (sourceCovered.has(s)) sourceCovered.get(s).add(t);
        }
    }

    const cells = [];
    for (const domain of DOMAINS) {
        for (const category of CATEGORIES) {
            const cellSources = sourceFiles.filter((s) => domainOf(s) === domain.id);
            const cellTests = testFiles.filter((t) => {
                if (classifyTestCategory(t) !== category) return false;
                const srcs = testToSources.get(t) || [];
                return srcs.some((s) => domainOf(s) === domain.id);
            });
            const coveredSources = cellSources.filter((s) => {
                const covers = sourceCovered.get(s) || new Set();
                return [...covers].some((t) => classifyTestCategory(t) === category);
            });
            const cls = classifyCell({
                tests: cellTests,
                coveredSources: coveredSources.length,
                sources: cellSources.length,
            });
            cells.push({
                domain: domain.id,
                category,
                ...cls,
                tests: cellTests,
            });
        }
    }

    const domainsOut = DOMAINS.map((d) => {
        const ds = sourceFiles.filter((s) => domainOf(s) === d.id);
        const covered = ds.filter((s) => (sourceCovered.get(s)?.size || 0) > 0);
        return { id: d.id, label: d.label, sources: ds.length, covered: covered.length };
    });

    const totalSources = sourceFiles.length;
    const totalCovered = sourceFiles.filter((s) => (sourceCovered.get(s)?.size || 0) > 0).length;

    const uncoveredSources = sourceFiles
        .filter((s) => (sourceCovered.get(s)?.size || 0) === 0)
        .sort();

    const libSourceCount = sourceFiles.filter((s) => s.startsWith('lib/')).length;
    const actions = buildActions(cells, { libSourceCount });

    return {
        generatedAt: new Date().toISOString(),
        runner: {
            unit: 'Vitest 4.x (jsdom)',
            e2e: 'Playwright 1.x (Chromium)',
        },
        totals: {
            sources: totalSources,
            covered: totalCovered,
            testFiles: testFiles.length,
        },
        domains: domainsOut,
        cells,
        actions,
        uncoveredSources,
    };
}

function main() {
    const data = build();
    const html = renderDashboardHtml(data);
    const outDir = path.join(ROOT, 'docs');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    const outFile = path.join(outDir, 'coverage-dashboard.html');
    fs.writeFileSync(outFile, html, 'utf8');
    const sizeKb = (Buffer.byteLength(html, 'utf8') / 1024).toFixed(1);
    console.log(`✅ Generated ${path.relative(ROOT, outFile)} (${sizeKb} KB)`);
    console.log(`   Sources: ${data.totals.sources}, Covered: ${data.totals.covered} (${Math.round((data.totals.covered / data.totals.sources) * 100)}%)`);
    console.log(`   Test files: ${data.totals.testFiles}, Actions: ${data.actions.length}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}

export { build, main };
