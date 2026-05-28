import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
    parseAuditOutput,
    hasBlockingVulnerabilities,
} from '../../scripts/security-audit.mjs';

const FIXTURES_DIR = resolve(process.cwd(), '__tests__/scripts/__fixtures__');

function loadFixture(name: string): unknown {
    const raw = readFileSync(resolve(FIXTURES_DIR, name), 'utf-8');
    return JSON.parse(raw);
}

describe('security-audit / parseAuditOutput', () => {
    it('should return zero counts for an empty audit (no vulnerabilities)', () => {
        const json = loadFixture('bun-audit-clean.json');
        const summary = parseAuditOutput(json);
        expect(summary).toEqual({ low: 0, moderate: 0, high: 0, critical: 0, total: 0 });
    });

    it('should aggregate counts by severity across packages', () => {
        const json = loadFixture('bun-audit-vulnerable.json');
        const summary = parseAuditOutput(json);
        expect(summary.low).toBe(1);
        expect(summary.moderate).toBe(1);
        expect(summary.high).toBe(2);
        expect(summary.critical).toBe(1);
        expect(summary.total).toBe(5);
    });

    it('should ignore unrecognized severity strings gracefully', () => {
        const summary = parseAuditOutput({
            'weird-pkg': [{ severity: 'info', title: 't' }],
        });
        expect(summary.total).toBe(0);
    });
});

describe('security-audit / hasBlockingVulnerabilities', () => {
    it('should be false when no high or critical findings exist', () => {
        const json = loadFixture('bun-audit-clean.json');
        const summary = parseAuditOutput(json);
        expect(hasBlockingVulnerabilities(summary)).toBe(false);
    });

    it('should be false when only low/moderate findings exist', () => {
        const summary = parseAuditOutput({
            'low-pkg': [{ severity: 'low', title: 't' }],
            'mod-pkg': [{ severity: 'moderate', title: 't' }],
        });
        expect(hasBlockingVulnerabilities(summary)).toBe(false);
    });

    it('should be true when at least one high finding exists', () => {
        const summary = parseAuditOutput({
            'high-pkg': [{ severity: 'high', title: 't' }],
        });
        expect(hasBlockingVulnerabilities(summary)).toBe(true);
    });

    it('should be true when at least one critical finding exists', () => {
        const summary = parseAuditOutput({
            'crit-pkg': [{ severity: 'critical', title: 't' }],
        });
        expect(hasBlockingVulnerabilities(summary)).toBe(true);
    });

    it('should be true for the bundled vulnerable fixture', () => {
        const json = loadFixture('bun-audit-vulnerable.json');
        const summary = parseAuditOutput(json);
        expect(hasBlockingVulnerabilities(summary)).toBe(true);
    });
});
