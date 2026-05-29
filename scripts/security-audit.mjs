#!/usr/bin/env node
/**
 * `bun audit --json` のラッパー。
 *
 * Usage: bun run test:security  (CLI 実行時は high/critical 検出で exit 1)
 *
 * モジュールとしては parseAuditOutput / hasBlockingVulnerabilities を export し、
 * Vitest からはフィクスチャ駆動で純粋関数を検証する設計。
 */

import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import process from 'node:process';

/**
 * @typedef {{ low: number; moderate: number; high: number; critical: number; total: number }} AuditSummary
 */

const KNOWN_SEVERITIES = new Set(['low', 'moderate', 'high', 'critical']);

/**
 * `bun audit --json` の出力（パース済みオブジェクト）を集計する。
 *
 * @param {unknown} json
 * @returns {AuditSummary}
 */
export function parseAuditOutput(json) {
    const summary = { low: 0, moderate: 0, high: 0, critical: 0, total: 0 };

    if (typeof json !== 'object' || json === null) return summary;

    for (const advisories of Object.values(/** @type {Record<string, unknown>} */ (json))) {
        if (!Array.isArray(advisories)) continue;
        for (const advisory of advisories) {
            if (typeof advisory !== 'object' || advisory === null) continue;
            const severity = /** @type {{ severity?: unknown }} */ (advisory).severity;
            if (typeof severity !== 'string' || !KNOWN_SEVERITIES.has(severity)) continue;
            // @ts-expect-error narrowed by KNOWN_SEVERITIES.has check
            summary[severity] += 1;
            summary.total += 1;
        }
    }
    return summary;
}

/**
 * High / Critical のいずれかが 1 件以上あればブロック対象として true を返す。
 *
 * @param {AuditSummary} summary
 * @returns {boolean}
 */
export function hasBlockingVulnerabilities(summary) {
    return summary.high > 0 || summary.critical > 0;
}

/**
 * `bun audit --json` を起動して標準出力 JSON を返す。失敗時は throw。
 *
 * @returns {unknown}
 */
function runBunAudit() {
    const result = spawnSync('bun', ['audit', '--json'], {
        encoding: 'utf-8',
        stdio: ['ignore', 'pipe', 'pipe'],
    });
    if (result.error) {
        throw new Error(`Failed to invoke bun audit: ${result.error.message}`);
    }
    const stdout = result.stdout ?? '';
    // bun audit はバージョン情報を含むヘッダ行を ANSI 付きで先頭に出力するため、最初の `{` 以降を抽出
    const jsonStart = stdout.indexOf('{');
    if (jsonStart < 0) {
        // 脆弱性 0 件のとき空出力になるケースを考慮
        return {};
    }
    const jsonText = stdout.slice(jsonStart);
    return JSON.parse(jsonText);
}

function formatSummary(summary) {
    return [
        `critical: ${summary.critical}`,
        `high:     ${summary.high}`,
        `moderate: ${summary.moderate}`,
        `low:      ${summary.low}`,
        `total:    ${summary.total}`,
    ].join('\n');
}

function main() {
    let summary;
    try {
        const json = runBunAudit();
        summary = parseAuditOutput(json);
    } catch (err) {
        console.error(err instanceof Error ? err.message : String(err));
        process.exit(2);
    }

    console.log('Security audit summary (bun audit):');
    console.log(formatSummary(summary));

    if (hasBlockingVulnerabilities(summary)) {
        console.error('\nBlocking vulnerabilities detected (high/critical). Run `bun audit` for details.');
        process.exit(1);
    }
    console.log('\nNo high/critical vulnerabilities detected.');
    process.exit(0);
}

// CLI 直接実行時のみ main を起動（import 時は副作用なし）
const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isDirectRun) {
    main();
}
