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
 * Produce an AuditSummary counting advisories by severity from a parsed `bun audit --json` result.
 *
 * Tallies advisories whose `severity` is one of `low`, `moderate`, `high`, or `critical` and computes a `total`.
 * Invalid or unexpected shapes in the input are ignored.
 * @param {unknown} json - Parsed JSON output from `bun audit --json`.
 * @returns {AuditSummary} Counts for `low`, `moderate`, `high`, `critical`, and `total`.
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
 * Check whether the audit summary contains blocking vulnerabilities (any high or critical findings).
 *
 * @param {AuditSummary} summary - Object with numeric fields `low`, `moderate`, `high`, `critical`, and `total`.
 * @returns {boolean} `true` if `high > 0` or `critical > 0`, `false` otherwise.
 */
export function hasBlockingVulnerabilities(summary) {
    return summary.high > 0 || summary.critical > 0;
}

/**
 * Run `bun audit --json` and parse its JSON output.
 *
 * @returns {unknown} The parsed JSON object produced by `bun audit --json`, or an empty object when no JSON output is present.
 * @throws {Error} If the audit process fails (spawn error, non-zero exit status, or received signal) or if the captured output cannot be parsed as JSON.
 */
function runBunAudit() {
    const result = spawnSync('bun', ['audit', '--json'], {
        encoding: 'utf-8',
        stdio: ['ignore', 'pipe', 'pipe'],
        timeout: 15000,
    });
    if (result.error || result.status !== 0 || result.signal) {
        const errorMsg = result.error ? result.error.message : 'None';
        const stderrStr = result.stderr ? result.stderr.toString() : 'None';
        throw new Error(
            `bun audit execution failed.\n` +
            `Status: ${result.status}\n` +
            `Signal: ${result.signal}\n` +
            `Error message: ${errorMsg}\n` +
            `Stderr: ${stderrStr}`
        );
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

/**
 * Render a multi-line textual summary of vulnerability counts by severity.
 * @param {Object} summary - Counts for each severity.
 * @param {number} summary.critical - Number of critical vulnerabilities.
 * @param {number} summary.high - Number of high vulnerabilities.
 * @param {number} summary.moderate - Number of moderate vulnerabilities.
 * @param {number} summary.low - Number of low vulnerabilities.
 * @param {number} summary.total - Total number of vulnerabilities.
 * @returns {string} A formatted multi-line string listing counts for `critical`, `high`, `moderate`, `low`, and `total`.
 */
function formatSummary(summary) {
    return [
        `critical: ${summary.critical}`,
        `high:     ${summary.high}`,
        `moderate: ${summary.moderate}`,
        `low:      ${summary.low}`,
        `total:    ${summary.total}`,
    ].join('\n');
}

/**
 * Run the bundled audit, print a formatted severity summary, and terminate the process with an appropriate exit code.
 *
 * Executes the audit, prints a human-readable summary to stdout and any error details to stderr, and then exits:
 * - Exit code 0: audit completed and no high/critical vulnerabilities were found.
 * - Exit code 1: one or more high or critical vulnerabilities were detected.
 * - Exit code 2: the audit failed to run or the output could not be processed.
 */
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
