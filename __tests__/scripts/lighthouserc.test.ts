import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { createRequire } from 'node:module';

const CONFIG_PATH = resolve(process.cwd(), 'lighthouserc.cjs');

type LhciConfig = {
    ci?: {
        collect?: {
            url?: string[];
            startServerCommand?: string;
            numberOfRuns?: number;
        };
        assert?: {
            preset?: string;
            assertions?: Record<string, unknown>;
        };
    };
};

function loadConfig(): LhciConfig {
    const require = createRequire(process.cwd() + '/');
    const mod = require(CONFIG_PATH) as unknown;
    if (typeof mod !== 'object' || mod === null) {
        throw new Error('lighthouserc.cjs did not export an object');
    }
    return mod as LhciConfig;
}

describe('lighthouserc.cjs (manual perf report config)', () => {
    it('should exist at repository root', () => {
        expect(existsSync(CONFIG_PATH)).toBe(true);
    });

    it('should declare ci.collect.url covering the 7 critical pages', () => {
        const cfg = loadConfig();
        const urls = cfg.ci?.collect?.url ?? [];
        const expectedPaths = [
            '/',
            '/gcl/associate-cloud-engineer',
            '/gcl/genai-leader',
            '/gcl/cloud-digital-leader',
            '/gcl/agwa',
            '/gcl/professional-cloud-network-engineer',
            '/gcl/professional-cloud-network-engineer-step-by-step',
        ];

        for (const p of expectedPaths) {
            expect(urls.some((u) => u.endsWith(p) || u.endsWith(p === '/' ? '/' : p))).toBe(true);
        }
        expect(urls).toHaveLength(expectedPaths.length);
    });

    it('should configure ci.collect.startServerCommand to launch the production server', () => {
        const cfg = loadConfig();
        const cmd = cfg.ci?.collect?.startServerCommand;
        expect(cmd).toBeDefined();
        expect(typeof cmd).toBe('string');
        expect(cmd).toMatch(/start/);
    });

    it('should set ci.assert with at least one performance assertion', () => {
        const cfg = loadConfig();
        const assert = cfg.ci?.assert;
        expect(assert).toBeDefined();
        const hasAssertions =
            (assert?.preset !== undefined && assert.preset.length > 0) ||
            (assert?.assertions !== undefined && Object.keys(assert.assertions).length > 0);
        expect(hasAssertions).toBe(true);
    });
});
