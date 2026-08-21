/**
 * 移行元 HTML から移行忠実性 fixture を生成する。
 *
 * 使い方:
 *   bun scripts/gen-fidelity-fixture.mjs <slug>   # 1 ページ
 *   bun scripts/gen-fidelity-fixture.mjs --all    # 設定済みの全ページ
 *
 * 移行元 HTML は `/archive/` 配下（.gitignore 済み）にあり、既に削除済みのものは
 * 設定の `sourceCommit` から一時復元してから実行する。
 *   git show <sourceCommit>:<source> > <source>
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';
import { FIDELITY_PAGES } from './archive-fidelity-config.mjs';
import {
    normalizeMermaid,
    normalizeText,
    snapshotHeaderBodyTables,
    snapshotInlineCode,
    snapshotPlacement,
    snapshotRefUrls,
    snapshotSourceCodeBlocks,
    snapshotStyledClasses,
    snapshotSupplemental,
    snapshotTables,
    snapshotTexts,
    snapshotTokens,
} from './archive-fidelity-extraction.mjs';

const repositoryRoot = process.cwd();
const outputDirectory = path.join(repositoryRoot, 'docs', 'migration-inventory');

/**
 * 設定の `sourceCommit`（`<sha>^` のような相対リビジョンを含む）を 40 桁の絶対 SHA へ解決する。
 *
 * 相対リビジョンのまま fixture へ書くと、履歴の見え方が変わったときに指し先がずれる。
 * fixture には解決済みの SHA を残し、`git show <sha>:<source>` がいつでも同じ内容を返すようにする。
 *
 * @param {string} revision - 設定に書かれた git リビジョン。
 * @returns {string} 解決した 40 桁の commit SHA。
 */
function resolveCommit(revision) {
    const resolved = execFileSync('git', ['rev-parse', `${revision}^{commit}`], {
        cwd: repositoryRoot,
        encoding: 'utf8',
    }).trim();
    if (!/^[0-9a-f]{40}$/.test(resolved)) {
        throw new Error(`sourceCommit を解決できません: ${revision} -> ${resolved}`);
    }
    return resolved;
}

/**
 * 1 ページ分の fixture を組み立てる。
 * @param {string} slug - ページの slug。
 * @param {import('./archive-fidelity-config.mjs').FidelityPageConfig} config - 抽出設定。
 * @returns {Record<string, unknown>} fixture の中身。
 */
function buildFixture(slug, config) {
    const absoluteSource = path.resolve(repositoryRoot, config.source);
    if (!fs.existsSync(absoluteSource)) {
        throw new Error(
            `移行元が見つかりません: ${config.source}\n`
                + `  git show ${config.sourceCommit}:${config.source} > ${config.source}\n`
                + '  で一時復元してから再実行してください。',
        );
    }
    const doc = new JSDOM(fs.readFileSync(absoluteSource, 'utf8')).window.document;

    /** @type {Record<string, unknown>} */
    const fixture = { slug, source: config.source, sourceCommit: resolveCommit(config.sourceCommit) };

    if (config.textSelector) fixture.texts = snapshotTexts(doc, config.textSelector);
    if (config.tables) fixture.tables = snapshotTables(doc);
    if (config.headerBodyTableSelector) {
        fixture.headerBodyTables = snapshotHeaderBodyTables(doc, config.headerBodyTableSelector);
    }
    if (config.supplementalSelector) {
        fixture.supplemental = snapshotSupplemental(doc, config.supplementalSelector);
    }
    if (config.codeBlocks) fixture.codeBlocks = snapshotSourceCodeBlocks(doc);
    if (config.syntaxSelectors) {
        const scoped = Object.fromEntries(
            Object.entries(config.syntaxSelectors).map(([key, selector]) => [key, `main ${selector}`]),
        );
        fixture.syntaxTokens = snapshotTokens(doc, scoped);
    }
    if (config.styledClasses) fixture.styledClasses = snapshotStyledClasses(doc);
    if (config.placementSelector) {
        fixture.placements = snapshotPlacement(doc, config.placementSelector);
    }
    if (config.inlineCode) fixture.inlineCode = snapshotInlineCode(doc);
    if (config.refUrls) fixture.refUrls = snapshotRefUrls(doc);
    if (config.jsonCodeSelector) {
        fixture.jsonCode = doc.querySelector(config.jsonCodeSelector)?.textContent ?? '';
    }
    if (config.introductionSelector) {
        fixture.introduction = normalizeText(
            doc.querySelector(config.introductionSelector)?.textContent ?? '',
        );
    }
    if (config.mermaidCharts) {
        fixture.mermaidCharts = Array.from(
            doc.querySelectorAll('script[type="text/mermaid"]'),
            (script) => normalizeMermaid(script.textContent ?? ''),
        );
    }
    return fixture;
}

const [, , target] = process.argv;
if (!target) {
    throw new Error('usage: bun scripts/gen-fidelity-fixture.mjs <slug>|--all');
}
const slugs = target === '--all' ? Object.keys(FIDELITY_PAGES) : [target];

for (const slug of slugs) {
    const config = FIDELITY_PAGES[slug];
    if (!config) throw new Error(`未知の slug です: ${slug}`);
    const fixture = buildFixture(slug, config);
    const outputPath = path.join(outputDirectory, `${slug}.fidelity.json`);
    fs.writeFileSync(outputPath, `${JSON.stringify(fixture, null, 2)}\n`, 'utf8');
    console.log(`wrote ${path.relative(repositoryRoot, outputPath)}`);
}
