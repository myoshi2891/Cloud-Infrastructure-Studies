export const DOMAINS = [
    { id: 'ace', label: 'Associate Cloud Engineer', provider: 'GCP' },
    { id: 'genai-leader', label: 'Generative AI Leader', provider: 'GCP' },
    { id: 'cloud-digital-leader', label: 'Cloud Digital Leader', provider: 'GCP' },
    { id: 'agwa', label: 'Google Workspace Admin', provider: 'GCP' },
    { id: 'pcne', label: 'Professional Cloud Network Engineer', provider: 'GCP' },
    { id: 'pcne-step', label: 'PCNE Step-by-Step', provider: 'GCP' },
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

const OK_THRESHOLD = 0.8;

export function classifyCell({ tests, coveredSources, sources }) {
    const safeSources = sources || 0;
    const safeCovered = coveredSources || 0;
    const coverageRate = safeSources > 0 ? safeCovered / safeSources : 0;

    let status;
    if (!tests || tests.length === 0 || safeSources === 0) {
        status = 'missing';
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

export function domainOf(filePath) {
    const p = filePath.replace(/\\/g, '/');

    if (p.startsWith('app/gcl/associate-cloud-engineer/')) return 'ace';
    if (p.startsWith('app/gcl/genai-leader/')) return 'genai-leader';
    if (p.startsWith('app/gcl/cloud-digital-leader/')) return 'cloud-digital-leader';
    if (p.startsWith('app/gcl/professional-cloud-network-engineer-step-by-step/')) return 'pcne-step';
    if (p.startsWith('app/gcl/professional-cloud-network-engineer/')) return 'pcne';
    if (p.startsWith('app/agwa/')) return 'agwa';

    if (p.startsWith('components/')) return 'common';
    if (p.startsWith('lib/')) return 'common';
    if (p === 'app/navigation.ts' || p === 'app/constants.ts') return 'common';
    if (p === 'app/layout.tsx' || p === 'app/page.tsx') return 'common';

    return null;
}

export function buildActions(cells, options = {}) {
    const { libSourceCount = 0 } = options;
    const actions = [];

    for (const cell of cells) {
        if (cell.domain === 'common' && cell.category === 'Integration' && cell.status !== 'ok' && libSourceCount > 0) {
            actions.push({
                priority: 'P0',
                area: '共通 / lib カバレッジ補強',
                detail: `lib/ の ${libSourceCount} ファイルに対する Integration テストが不足しています`,
                tool: 'Vitest',
                cost: '中',
                effect: '主要ユーティリティ（recentPages, navigation, utils）の回帰防止',
                impact: cell.sources - cell.coveredSources,
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
