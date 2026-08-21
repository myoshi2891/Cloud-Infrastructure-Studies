/**
 * 移行元 HTML から移行忠実性 fixture を生成する。
 *
 * 使い方:
 *   bun scripts/gen-fidelity-fixture.mjs <slug>   # 1 ページ
 *   bun scripts/gen-fidelity-fixture.mjs --all    # 設定済みの全ページ
 *
 * 移行元 HTML は `/archive/` 配下（.gitignore 済み）にあるが、作業ツリーではなく設定の
 * `sourceCommit` が指す git リビジョンから直接読み出す。そのため事前の一時復元は不要で、
 * fixture の中身と `sourceCommit` は常に同じリビジョンに対応する。
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
 * 設定された Git リビジョンを 40 桁の絶対 commit SHA に解決する。
 *
 * @param {string} revision - 設定に指定された Git リビジョン。
 * @returns {string} 解決された 40 桁の commit SHA。
 * @throws {Error} リビジョンを commit SHA に解決できない場合。
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
 * 固定した commit から移行元 HTML を読み出す。
 *
 * 作業ツリーの復元物を読むと、fixture の中身と `sourceCommit` が別のリビジョンを指しうる
 * （復元し忘れによる残留物・別リビジョンからの復元・手元での編集）。git のオブジェクトから
 * 直接読むことで、fixture の中身と `sourceCommit` が常に同じ固定リビジョンに対応する。
 *
 * @param {string} commit - 解決済みの 40 桁 commit SHA。
 * @param {string} source - 移行元 HTML のリポジトリ相対パス。
 * @returns {string} その commit 時点の HTML 全文。
 */
function readSourceAtCommit(commit, source) {
    try {
        return execFileSync('git', ['show', `${commit}:${source}`], {
            cwd: repositoryRoot,
            encoding: 'utf8',
            maxBuffer: 64 * 1024 * 1024,
        });
    } catch (error) {
        const detail = error instanceof Error ? error.message : String(error);
        throw new Error(`移行元を ${commit} から読み出せません: ${source}\n  ${detail}`);
    }
}

/**
 * 1 ページ分の移行忠実性確認用 fixture を組み立てる。
 * 指定された Git リビジョンから HTML を読み込み、設定された項目を抽出して fixture に格納する。
 * @param {string} slug - ページの slug。
 * @param {import('./archive-fidelity-config.mjs').FidelityPageConfig} config - HTML の取得元と抽出項目の設定。
 * @returns {Record<string, unknown>} ページの slug、取得元、解決済みコミット SHA、および抽出結果を含む fixture。
 */
function buildFixture(slug, config) {
    // 先に SHA を解決し、その 1 つの値で「中身の読み出し」と「fixture への記録」の両方を行う。
    const sourceCommit = resolveCommit(config.sourceCommit);
    const doc = new JSDOM(readSourceAtCommit(sourceCommit, config.source)).window.document;

    /** @type {Record<string, unknown>} */
    const fixture = { slug, source: config.source, sourceCommit };

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
