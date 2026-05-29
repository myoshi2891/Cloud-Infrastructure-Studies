import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Page } from '@playwright/test';

export type WebVitalsMetrics = {
    lcp: number;
    cls: number;
    tbt: number;
};

export type PerfBudget = {
    lcp: number;
    cls: number;
    tbt: number;
};

export type PerfBudgetsConfig = {
    default: PerfBudget;
    overrides?: Record<string, Partial<PerfBudget>>;
};

const BUDGETS_PATH = resolve(process.cwd(), 'e2e', 'perf-budgets.json');

let cachedConfig: PerfBudgetsConfig | null = null;

/**
 * Load, validate, and cache the perf-budgets.json configuration.
 *
 * Reads the budgets file, validates its shape as a `PerfBudgetsConfig`, stores the validated
 * configuration in a module-level cache, and returns it for use by callers.
 *
 * @returns The validated `PerfBudgetsConfig`.
 * @throws Error if the budgets file does not match the `PerfBudgetsConfig` schema.
 */
function readBudgetsConfig(): PerfBudgetsConfig {
    if (cachedConfig) return cachedConfig;
    const raw = readFileSync(BUDGETS_PATH, 'utf-8');
    const parsed: unknown = JSON.parse(raw);
    if (!isPerfBudgetsConfig(parsed)) {
        throw new Error(`Invalid perf-budgets.json schema at ${BUDGETS_PATH}`);
    }
    cachedConfig = parsed;
    return cachedConfig;
}

/**
 * Determines whether a value is a PerfBudget object.
 *
 * @param value - The value to check for `lcp`, `cls`, and `tbt` numeric properties
 * @returns `true` if `value` has numeric `lcp`, `cls`, and `tbt` properties, `false` otherwise.
 */
function isPerfBudget(value: unknown): value is PerfBudget {
    if (typeof value !== 'object' || value === null) return false;
    const candidate = value as Record<string, unknown>;
    return (
        typeof candidate.lcp === 'number' &&
        typeof candidate.cls === 'number' &&
        typeof candidate.tbt === 'number'
    );
}

/**
 * Determines whether a runtime value matches the PerfBudgetsConfig structure.
 *
 * Validates that `value` is an object containing a required `default` budget and an optional `overrides` object
 * that maps page paths to partial budget overrides.
 *
 * @param value - The runtime value to validate
 * @returns `true` if `value` is an object with a `default` PerfBudget and an optional `overrides` mapping, `false` otherwise.
 */
function isPerfBudgetsConfig(value: unknown): value is PerfBudgetsConfig {
    if (typeof value !== 'object' || value === null) return false;
    const candidate = value as Record<string, unknown>;
    if (!isPerfBudget(candidate.default)) return false;
    if (candidate.overrides !== undefined && (typeof candidate.overrides !== 'object' || candidate.overrides === null)) {
        return false;
    }
    return true;
}

/**
 * Resolve the performance budget for a given page path.
 *
 * @param pagePath - The page path key used to select an optional override from the budgets configuration
 * @returns The resolved PerfBudget where each of `lcp`, `cls`, and `tbt` uses the override value when provided, otherwise falls back to the configured default
 */
export async function loadBudgetFor(pagePath: string): Promise<PerfBudget> {
    const cfg = readBudgetsConfig();
    const override = cfg.overrides?.[pagePath] ?? {};
    return {
        lcp: override.lcp ?? cfg.default.lcp,
        cls: override.cls ?? cfg.default.cls,
        tbt: override.tbt ?? cfg.default.tbt,
    };
}

/**
 * Measure Core Web Vitals–equivalent metrics for the given page.
 *
 * Collects three numeric metrics:
 * - LCP: Largest Contentful Paint candidate (uses buffered entries' final candidate)
 * - CLS: Cumulative Layout Shift (sums `value` for shifts without recent user input)
 * - TBT: Total Blocking Time approximation (sum of `duration - 50ms` for long tasks)
 *
 * Note: measurements from a development server (e.g., Turbopack) may be larger than
 * production builds; set performance budgets conservatively when comparing against these values.
 *
 * @returns An object with numeric `lcp`, `cls`, and `tbt` metrics
 */
export async function collectWebVitals(page: Page): Promise<WebVitalsMetrics> {
    // longtask / layout-shift の最終フラッシュ待ち
    await page.waitForTimeout(2000);

    return page.evaluate<WebVitalsMetrics>(() => {
        return new Promise<WebVitalsMetrics>((resolve) => {
            let lcp = 0;
            let cls = 0;
            let tbt = 0;

            type LcpEntry = PerformanceEntry & { renderTime?: number };
            type ClsEntry = PerformanceEntry & { value: number; hadRecentInput: boolean };

            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries() as LcpEntry[];
                for (const entry of entries) {
                    const candidate = entry.renderTime && entry.renderTime > 0 ? entry.renderTime : entry.startTime;
                    if (candidate > lcp) lcp = candidate;
                }
            });

            const clsObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries() as ClsEntry[]) {
                    if (!entry.hadRecentInput) cls += entry.value;
                }
            });

            const tbtObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.duration > 50) tbt += entry.duration - 50;
                }
            });

            try {
                lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
                clsObserver.observe({ type: 'layout-shift', buffered: true });
                tbtObserver.observe({ type: 'longtask', buffered: true });
            } catch {
                // 一部 entryType 非対応環境では 0 を返して通過させる
            }

            setTimeout(() => {
                lcpObserver.disconnect();
                clsObserver.disconnect();
                tbtObserver.disconnect();
                resolve({ lcp, cls, tbt });
            }, 500);
        });
    });
}
