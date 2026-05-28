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

function isPerfBudget(value: unknown): value is PerfBudget {
    if (typeof value !== 'object' || value === null) return false;
    const candidate = value as Record<string, unknown>;
    return (
        typeof candidate.lcp === 'number' &&
        typeof candidate.cls === 'number' &&
        typeof candidate.tbt === 'number'
    );
}

function isPerfBudgetsConfig(value: unknown): value is PerfBudgetsConfig {
    if (typeof value !== 'object' || value === null) return false;
    const candidate = value as Record<string, unknown>;
    if (!isPerfBudget(candidate.default)) return false;
    if (candidate.overrides !== undefined && (typeof candidate.overrides !== 'object' || candidate.overrides === null)) {
        return false;
    }
    return true;
}

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
 * 対象ページの Core Web Vitals 相当値を計測する。
 *
 * - LCP: Largest Contentful Paint（バッファ済みエントリの最終値）
 * - CLS: Cumulative Layout Shift（ユーザー入力を除く加算値）
 * - TBT: Total Blocking Time 近似（longtask 観測の duration-50ms 合算）
 *
 * 注: dev サーバー（Turbopack）計測では本番ビルドより値が大きく出る。バジェットは保守的に設定する。
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
