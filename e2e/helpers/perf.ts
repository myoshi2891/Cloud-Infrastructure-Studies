import type { Page } from '@playwright/test';

export type WebVitalsMetrics = {
    lcp: number;
    cls: number;
    tbt: number;
};

/**
 * 対象ページの Core Web Vitals（LCP / CLS / TBT 相当値）を計測して返す。
 *
 * Step 1 (Fail) では未実装。Step 2 で PerformanceObserver ベースの実装を行う。
 */
export async function collectWebVitals(_page: Page): Promise<WebVitalsMetrics> {
    throw new Error('collectWebVitals is not implemented yet (TDD Step 1 - Fail)');
}

export type PerfBudget = {
    lcp: number;
    cls: number;
    tbt: number;
};

export type PerfBudgetsConfig = {
    default: PerfBudget;
    overrides?: Record<string, Partial<PerfBudget>>;
};

/**
 * バジェット定義を読み込み、指定ページに適用される閾値を返す。
 * Step 2 で `e2e/perf-budgets.json` を作成したのちに動作する。
 */
export async function loadBudgetFor(_pagePath: string): Promise<PerfBudget> {
    throw new Error('loadBudgetFor is not implemented yet (TDD Step 1 - Fail)');
}
