export const DOMAINS = [
    { id: 'ace', label: 'Associate Cloud Engineer', provider: 'GCP' },
    { id: 'genai-leader', label: 'Generative AI Leader', provider: 'GCP' },
    { id: 'cloud-digital-leader', label: 'Cloud Digital Leader', provider: 'GCP' },
    { id: 'agwa', label: 'Google Workspace Admin', provider: 'GCP' },
    { id: 'pcne', label: 'Professional Cloud Network Engineer', provider: 'GCP' },
    { id: 'pcne-step', label: 'PCNE Step-by-Step', provider: 'GCP' },
    { id: 'ccna', label: 'Cisco CCNA', provider: 'Cisco' },
    { id: 'devnet', label: 'Cisco DevNet / Automation', provider: 'Cisco' },
    { id: 'common', label: '共通 (components / lib / navigation)', provider: '共通' },
];

export const CATEGORIES = [
    'Unit',
    'Integration',
    'E2E',
    'Smoke',
    'Visual',
    'A11y',
    'Performance',
    'Security',
];

export const CANONICAL_COMMON_TARGETS = [
    'lib/recentPages.ts',
    'lib/utils.ts',
    'app/navigation.ts',
];

const OK_THRESHOLD = 0.8;

/**
 * Classifies a coverage cell and computes its coverage rate, test count, and status.
 * @param {Object} params - Input parameters.
 * @param {Array|undefined|null} params.tests - Test entries; treated as missing when falsy or empty.
 * @param {number|undefined|null} params.coveredSources - Number of covered source files; falsy values are treated as 0.
 * @param {number|undefined|null} params.sources - Total number of source files; falsy values are treated as 0.
 * @param {string} [params.category] - Category name; certain "horizontal" categories force an `ok` status when tests exist and sources > 0.
 * @returns {{status: 'missing'|'ok'|'warn', coverageRate: number, testCount: number, coveredSources: number, sources: number}}
 * An object with:
 * - `status`: `'missing'` when there are no tests or `sources` is 0; otherwise `'ok'` for horizontal quality categories (`Visual`, `A11y`, `Performance`, `Security`) when tests exist; for other categories `'ok'` when `coverageRate >= OK_THRESHOLD`, otherwise `'warn'`.
 * - `coverageRate`: `coveredSources / sources` (0 when `sources` is 0), in the range [0,1].
 * - `testCount`: number of tests (0 when `tests` is falsy).
 * - `coveredSources`: coerced coveredSources count (falsy treated as 0).
 * - `sources`: coerced sources count (falsy treated as 0).
 */
export function classifyCell({ tests, coveredSources, sources, category = undefined }) {
    const safeSources = sources || 0;
    const safeCovered = coveredSources || 0;
    const coverageRate = safeSources > 0 ? safeCovered / safeSources : 0;

    let status;
    const horizontal = ['Visual', 'A11y', 'Performance', 'Security'];
    if (!tests || tests.length === 0 || safeSources === 0) {
        status = 'missing';
    } else if (horizontal.includes(category)) {
        status = 'ok';
    } else if (coverageRate >= OK_THRESHOLD) {
        status = 'ok';
    } else {
        status = 'warn';
    }

    return {
        status,
        coverageRate,
        testCount: tests ? tests.length : 0,
        coveredSources: safeCovered,
        sources: safeSources,
    };
}

/**
 * Determine the domain id associated with a repository-relative file path.
 *
 * The function normalizes path separators and matches known path prefixes and exact paths
 * to map files into a domain identifier.
 *
 * @param {string} filePath - Repository-relative file path (backslashes will be treated as forward slashes).
 * @returns {'ace'|'genai-leader'|'cloud-digital-leader'|'pcne-step'|'pcne'|'agwa'|'common'|null}
 *          The matching domain id, `'common'` for shared code paths, or `null` if no domain matches.
 */
export function domainOf(filePath) {
    const p = filePath.replace(/\\/g, '/');

    if (p.startsWith('app/gcl/associate-cloud-engineer/')) return 'ace';
    if (p.startsWith('app/gcl/genai-leader/')) return 'genai-leader';
    if (p.startsWith('app/gcl/cloud-digital-leader/')) return 'cloud-digital-leader';
    if (p.startsWith('app/gcl/professional-cloud-network-engineer-step-by-step/')) return 'pcne-step';
    if (p.startsWith('app/gcl/professional-cloud-network-engineer/')) return 'pcne';
    if (p.startsWith('app/gcl/agwa/')) return 'agwa';
    if (p.startsWith('app/cisco/ccna/')) return 'ccna';
    if (p.startsWith('app/cisco/devnet-')) return 'devnet';

    if (p.startsWith('components/')) return 'common';
    if (p.startsWith('lib/')) return 'common';
    if (p === 'app/navigation.ts' || p === 'app/constants.ts') return 'common';
    if (p === 'app/layout.tsx' || p === 'app/page.tsx') return 'common';

    return null;
}

/**
 * Generate a prioritized list of actionable testing improvements from per-domain/category coverage cells.
 *
 * @typedef {{priority: 'P0'|'P1'|'P2', area: string, detail: string, tool: string, cost: string, effect: string, impact: number}} Action
 *
 * @param {Array<Object>} cells - Array of coverage "cell" objects. Each cell is expected to include at least:
 *   `domain` (string), `category` (string), `status` (string, e.g. "missing" | "ok" | "warn"),
 *   `sources` (number) and `coveredSources` (number).
 * @param {Object} [options] - Optional behaviour modifiers.
 * @param {number} [options.commonTargetCount=0] - Number of canonical shared targets in the completed P0 scope.
 * @param {number} [options.commonIntegrationCoveredCount=0] - Number of those targets covered by Integration tests.
 * @returns {Array<Action>} Sorted action objects. Each action contains:
 *   `priority` (P0|P1|P2), `area` (string), `detail` (string), `tool` (string), `cost` (string),
 *   `effect` (string) and `impact` (number).
 */
export function buildActions(cells, options = {}) {
    const { commonTargetCount = 0, commonIntegrationCoveredCount = 0 } = options;
    /** @type {Action[]} */
    const actions = [];

    for (const cell of cells) {
        if (
            cell.domain === 'common'
            && cell.category === 'Integration'
            && commonTargetCount > commonIntegrationCoveredCount
        ) {
            actions.push({
                priority: 'P0',
                area: '共通 正準対象カバレッジ補強',
                detail: `共通の正準対象 ${commonTargetCount} ファイル中 ${commonIntegrationCoveredCount} ファイルが Integration テストでカバーされています`,
                tool: 'Vitest',
                cost: '中',
                effect: '共通基盤（recentPages, utils, navigation）の回帰防止',
                impact: commonTargetCount - commonIntegrationCoveredCount,
            });
        }
        if (cell.domain === 'common' && cell.category === 'Unit' && cell.status === 'missing') {
            actions.push({
                priority: 'P0',
                area: '共通コンポーネント単体テスト',
                detail: 'components/ 配下の Unit テストが不足しています',
                tool: 'Vitest + React Testing Library',
                cost: '小',
                effect: 'グローバル UI（Header/Footer/Banner）の安定化',
                impact: cell.sources - cell.coveredSources,
            });
        }
    }

    for (const cell of cells) {
        if (cell.category === 'Unit' && cell.domain !== 'common' && cell.status === 'missing') {
            actions.push({
                priority: 'P1',
                area: `${cell.domain} / ページ単体テスト追加`,
                detail: `${cell.sources} ファイル中 ${cell.coveredSources} ファイルのみカバー`,
                tool: 'Vitest + React Testing Library',
                cost: '小〜中',
                effect: 'ページ描画リグレッション防止',
                impact: cell.sources - cell.coveredSources,
            });
        }
        if (cell.category === 'E2E' && cell.domain !== 'common' && cell.status === 'missing') {
            actions.push({
                priority: 'P1',
                area: `${cell.domain} / クリティカルパス E2E`,
                detail: '対応する e2e/*.spec.ts が存在しません',
                tool: 'Playwright',
                cost: '中',
                effect: 'ユーザー導線の自動回帰検出',
                impact: cell.sources,
            });
        }
    }

    const horizontal = ['Visual', 'A11y', 'Performance', 'Security'];
    for (const category of horizontal) {
        const allMissing = cells
            .filter((c) => c.category === category)
            .every((c) => c.status === 'missing');
        const anyCells = cells.some((c) => c.category === category);
        if (anyCells && allMissing) {
            const labels = {
                Visual: { tool: 'Playwright (toHaveScreenshot)', cost: '中', effect: 'UI 退行検知' },
                A11y: { tool: '@axe-core/playwright', cost: '小', effect: 'WCAG 違反の継続監視' },
                Performance: { tool: 'Lighthouse CI', cost: '中', effect: 'バンドル肥大化検知' },
                Security: { tool: 'npm audit + Snyk', cost: '小', effect: '依存脆弱性可視化' },
            };
            const meta = labels[category];
            actions.push({
                priority: 'P2',
                area: `横断品質: ${category} 導入検討`,
                detail: `全 ${DOMAINS.length} ドメインで ${category} テストが未実装`,
                tool: meta.tool,
                cost: meta.cost,
                effect: meta.effect,
                impact: 0,
            });
        }
    }

    const order = { P0: 0, P1: 1, P2: 2 };
    return actions
        .sort((a, b) => {
            const p = order[a.priority] - order[b.priority];
            if (p !== 0) return p;
            return (b.impact || 0) - (a.impact || 0);
        });
}
