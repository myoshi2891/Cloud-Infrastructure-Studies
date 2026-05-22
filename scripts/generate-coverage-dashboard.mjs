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

/**
 * Read a file as UTF-8 and return its contents, or an empty string if reading fails.
 * @param {string} file - Path to the file to read.
 * @returns {string} File contents, or an empty string if the file cannot be read.
 */
function readSafe(file) {
    try { return fs.readFileSync(file, 'utf8'); } catch { return ''; }
}

/**
 * Determines whether a given file path should be considered a source candidate for coverage scanning.
 * @param {string} filePath - File path to evaluate.
 * @returns {boolean} `true` if the path does not match test/spec/type-definition/e2e exclusion patterns, `false` otherwise.
 */
function isSourceCandidate(filePath) {
    if (filePath.endsWith('.test.ts') || filePath.endsWith('.test.tsx')) return false;
    if (filePath.endsWith('.spec.ts') || filePath.endsWith('.spec.tsx')) return false;
    if (filePath.endsWith('.d.ts')) return false;
    if (filePath.includes('/__tests__/')) return false;
    if (filePath.includes('/e2e/')) return false;
    return true;
}

/**
 * Build the coverage dashboard data structure by scanning sources and tests, resolving test-to-source mappings, and aggregating domain/category coverage.
 *
 * @returns {Object} An object containing the dashboard data:
 *  - `generatedAt` (string): ISO timestamp of generation.
 *  - `runner` (Object): labels for unit and e2e test runners.
 *  - `totals` (Object): counts `{ sources, covered, testFiles }`.
 *  - `domains` (Array): domain summaries `{ id, label, sources, covered }`.
 *  - `cells` (Array): per-domain/category cells including classification fields and `tests` list.
 *  - `actions` (Array): generated action metadata for the dashboard.
 *  - `uncoveredSources` (Array): sorted list of source paths with no mapped tests.
 */
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

/**
 * Generate the coverage dashboard HTML and write it to docs/coverage-dashboard.html.
 *
 * Builds dashboard data, renders it to HTML, writes the output file under the project's
 * docs directory, and logs a concise summary including output size, source totals,
 * covered count/percentage, test file count, and action count.
 */
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
