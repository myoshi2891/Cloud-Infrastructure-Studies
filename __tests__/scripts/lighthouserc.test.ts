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

/**
 * Loads and validates the Lighthouse CI configuration from `lighthouserc.cjs`.
 * Uses `createRequire` with `CONFIG_PATH` to resolve the CommonJS module.
 *
 * @returns {LhciConfig} The parsed Lighthouse CI configuration object.
 * @throws {Error} Throws when the exported module is not an object or is null.
 */
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

        const preset = assert?.preset;
        const hasPerfPreset = preset !== undefined && preset.includes('performance');

        const assertions = assert?.assertions as Record<string, any> | undefined;
        let hasPerfAssertion = false;
        if (assertions) {
            // Check flat categories:performance format
            const flatPerf = assertions['categories:performance'];
            if (flatPerf !== undefined) {
                if (typeof flatPerf === 'number' && flatPerf > 0) {
                    hasPerfAssertion = true;
                } else if (Array.isArray(flatPerf)) {
                    const options = flatPerf[1];
                    if (options && typeof options === 'object' && typeof options.minScore === 'number' && options.minScore > 0) {
                        hasPerfAssertion = true;
                    }
                }
            }
            // Check nested categories object format
            const categories = assertions.categories;
            if (categories && typeof categories === 'object') {
                const perf = categories.performance;
                if (typeof perf === 'number' && perf > 0) {
                    hasPerfAssertion = true;
                } else if (perf && typeof perf === 'object' && typeof perf.minScore === 'number' && perf.minScore > 0) {
                    hasPerfAssertion = true;
                }
            }
        }

        expect(hasPerfPreset || hasPerfAssertion).toBe(true);
    });
});

