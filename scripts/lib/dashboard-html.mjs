import { CATEGORIES } from './classifier.mjs';

const STATUS_LABEL = { ok: '✅ 実装済み', warn: '⚠️ 部分的', missing: '❌ 未実装' };
const STATUS_RATIO_TEXT = {
    ok: (c) => `${Math.round(c.coverageRate * 100)}%`,
    warn: (c) => `${Math.round(c.coverageRate * 100)}%`,
    missing: () => '0%',
};

const LINE_SEP = String.fromCharCode(0x2028);
const PARA_SEP = String.fromCharCode(0x2029);
const LINE_SEP_RE = new RegExp(LINE_SEP, 'g');
const PARA_SEP_RE = new RegExp(PARA_SEP, 'g');

/**
 * Escape HTML-sensitive characters in a value for safe insertion into HTML.
 * @param {*} value - The value to convert to a string and escape.
 * @returns {string} The input converted to a string with `&`, `<`, `>`, `"` and `'` replaced by their HTML entities.
 */
export function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/**
 * Serialize a value to JSON and escape characters that can break embedding in HTML or script contexts.
 * @param {*} value - The value to serialize.
 * @returns {string} The JSON string with `<`, `>`, `&`, U+2028, and U+2029 replaced by their Unicode escape sequences.
 */
function safeJson(value) {
    return JSON.stringify(value)
        .replace(/</g, '\\u003c')
        .replace(/>/g, '\\u003e')
        .replace(/&/g, '\\u0026')
        .replace(LINE_SEP_RE, '\\u2028')
        .replace(PARA_SEP_RE, '\\u2029');
}

/**
 * Build a table row representing a domain and its category coverage cells.
 *
 * Produces a `<tr>` whose header cell shows the domain label and covered/sources with percentage,
 * and whose `<td>` cells (one per category from `CATEGORIES`) contain status, ratio text, and test count.
 *
 * @param {Object} domain - Domain summary used for the row.
 * @param {string} domain.id - Identifier used in `data-domain` attributes and to lookup cells.
 * @param {string} domain.label - Human-readable domain label shown in the row header.
 * @param {number} domain.covered - Number of covered sources for the domain.
 * @param {number} domain.sources - Total number of sources for the domain.
 * @param {Map<string,Object>} cellsByDomainCat - Map keyed by `${domain.id}::${category}` to cell objects.
 *   Cell objects may include `status` (string), `testCount` (number), and `tests` (array of strings).
 * @returns {string} HTML string for the completed table row (`<tr>...</tr>`).
 */
function renderMatrixRow(domain, cellsByDomainCat) {
    const tds = CATEGORIES.map((category) => {
        const cell = cellsByDomainCat.get(`${domain.id}::${category}`);
        const status = cell?.status ?? 'missing';
        const ratio = cell ? STATUS_RATIO_TEXT[status](cell) : '0%';
        const testCount = cell?.testCount ?? 0;
        const tip = cell && cell.tests.length > 0
            ? cell.tests.join('\n')
            : 'テスト未実装';
        return `<td class="cell cell--${status}" data-status="${status}" data-domain="${escapeHtml(domain.id)}" data-category="${escapeHtml(category)}" title="${escapeHtml(tip)}"><span class="cell-icon" aria-hidden="true">${STATUS_LABEL[status].split(' ')[0]}</span><span class="cell-ratio">${escapeHtml(ratio)}</span><span class="cell-count">${testCount} tests</span></td>`;
    }).join('');
    const coverage = domain.sources > 0 ? Math.round((domain.covered / domain.sources) * 100) : 0;
    return `<tr data-domain="${escapeHtml(domain.id)}"><th scope="row"><span class="row-label">${escapeHtml(domain.label)}</span><span class="row-meta">${domain.covered}/${domain.sources} (${coverage}%)</span></th>${tds}</tr>`;
}

/**
 * Render an HTML fragment representing prioritized next actions for the dashboard.
 *
 * Produces an ordered list of action cards when `actions` contains items; otherwise returns
 * a muted paragraph indicating there are no unsupported actions.
 *
 * @param {Array<Object>} actions - Array of action objects. Each object may include:
 *   - {string} priority - Priority label (e.g., "High", "Medium", "Low").
 *   - {string} area - Short title or area affected by the action.
 *   - {string} detail - Description of the action.
 *   - {string} tool - Recommended tool for the action.
 *   - {string} cost - Estimated implementation cost.
 *   - {string} effect - Expected benefit or effect.
 * @returns {string} HTML string containing either an `<ol class="actions">` with action `<li>` items or a `<p class="muted">` message when no actions are provided.
 */
function renderActions(actions) {
    if (!actions || actions.length === 0) {
        return '<p class="muted">未対応アクションはありません。</p>';
    }
    const items = actions.map((a) => `
        <li class="action action--${a.priority.toLowerCase()}">
            <header>
                <span class="badge badge--${a.priority.toLowerCase()}">${escapeHtml(a.priority)}</span>
                <h3>${escapeHtml(a.area)}</h3>
            </header>
            <p>${escapeHtml(a.detail)}</p>
            <dl>
                <div><dt>推奨ツール</dt><dd>${escapeHtml(a.tool)}</dd></div>
                <div><dt>導入コスト</dt><dd>${escapeHtml(a.cost)}</dd></div>
                <div><dt>期待効果</dt><dd>${escapeHtml(a.effect)}</dd></div>
            </dl>
        </li>
    `).join('');
    return `<ol class="actions">${items}</ol>`;
}

/**
 * Render an HTML details block listing uncovered source paths.
 *
 * @param {string[]} uncovered - Array of source strings; each entry is HTML-escaped before insertion.
 * @returns {string} An HTML string containing a `<details>` element with a summary and an unordered list of the uncovered sources, or an empty string when `uncovered` is falsy or empty.
 */
function renderUncovered(uncovered) {
    if (!uncovered || uncovered.length === 0) return '';
    const items = uncovered.map((p) => `<li><code>${escapeHtml(p)}</code></li>`).join('');
    return `<details class="uncovered"><summary>未カバー ソース一覧 (${uncovered.length})</summary><ul>${items}</ul></details>`;
}

/**
 * Render HTML for the filters UI allowing selection of domains and status values.
 *
 * @param {Array<{id: string, label: string}>} domains - Array of domain descriptors; each object must have `id` (used for the checkbox `data-filter-domain` value) and `label` (display text).
 * @returns {string} An HTML string containing a <details> block with checkboxes for each domain and for the three statuses (`ok`, `warn`, `missing`).
 */
function renderFilters(domains) {
    const domainBoxes = domains.map((d) => `
        <label><input type="checkbox" data-filter-domain="${escapeHtml(d.id)}" checked> ${escapeHtml(d.label)}</label>
    `).join('');
    const statusBoxes = ['ok', 'warn', 'missing'].map((s) => `
        <label><input type="checkbox" data-filter-status="${s}" checked> ${STATUS_LABEL[s]}</label>
    `).join('');
    return `
        <details class="filters" open>
            <summary>フィルタ</summary>
            <fieldset>
                <legend>試験ドメイン</legend>
                ${domainBoxes}
            </fieldset>
            <fieldset>
                <legend>ステータス</legend>
                ${statusBoxes}
            </fieldset>
        </details>
    `;
}

/**
 * Render a complete static HTML coverage dashboard from the supplied data.
 *
 * @param {Object} data - Dashboard payload.
 * @param {string} data.generatedAt - ISO timestamp when the report was generated.
 * @param {Object} data.runner - Runner metadata.
 * @param {string} data.runner.unit - Unit runner identifier.
 * @param {string} data.runner.e2e - E2E runner identifier.
 * @param {Object} data.totals - Aggregated totals.
 * @param {number} data.totals.sources - Total number of source files.
 * @param {number} data.totals.covered - Number of covered source files.
 * @param {number} data.totals.testFiles - Number of test files.
 * @param {Array<Object>} data.domains - Array of domain descriptors used to render matrix rows.
 * @param {Array<Object>} data.cells - Array of cell objects describing domain×category coverage.
 * @param {Array<Object>} [data.actions] - Optional list of recommended next actions.
 * @param {Array<string>} [data.uncoveredSources] - Optional list of uncovered source file paths.
 * @returns {string} The rendered full HTML document as a string.
 */
export function renderDashboardHtml(data) {
    const cellsByDomainCat = new Map();
    for (const c of data.cells) cellsByDomainCat.set(`${c.domain}::${c.category}`, c);

    const totalCoverage = data.totals.sources > 0
        ? Math.round((data.totals.covered / data.totals.sources) * 100)
        : 0;

    const generatedDate = data.generatedAt.slice(0, 10);

    const colHeaders = CATEGORIES.map((c) => `<th scope="col">${escapeHtml(c)}</th>`).join('');
    const rows = data.domains.map((d) => renderMatrixRow(d, cellsByDomainCat)).join('');

    return `<!DOCTYPE html>
<html lang="ja" data-theme="auto">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>テストカバレッジ ダッシュボード</title>
    <style>${CSS}</style>
</head>
<body>
    <a href="#matrix" class="skip-link">マトリクスへスキップ</a>
    <header class="page-header">
        <div>
            <h1>テストカバレッジ ダッシュボード</h1>
            <p class="muted">生成: <time datetime="${escapeHtml(data.generatedAt)}">${escapeHtml(generatedDate)}</time> / Runner: ${escapeHtml(data.runner.unit)} + ${escapeHtml(data.runner.e2e)}</p>
        </div>
        <div class="controls">
            <button type="button" id="theme-toggle" aria-pressed="false" aria-label="ダークモード切替">🌓 テーマ</button>
        </div>
    </header>

    <main>
        <section class="summary" aria-labelledby="summary-title">
            <h2 id="summary-title">全体カバレッジ</h2>
            <div class="summary-grid">
                <div class="metric">
                    <span class="metric-label">ソース総数</span>
                    <span class="metric-value">${data.totals.sources}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">カバー済み</span>
                    <span class="metric-value">${data.totals.covered}</span>
                </div>
                <div class="metric">
                    <span class="metric-label">テストファイル</span>
                    <span class="metric-value">${data.totals.testFiles}</span>
                </div>
                <div class="metric metric--rate">
                    <span class="metric-label">達成率</span>
                    <span class="metric-value">${totalCoverage}%</span>
                    <progress max="100" value="${totalCoverage}" aria-label="全体カバレッジ ${totalCoverage}%">${totalCoverage}%</progress>
                </div>
            </div>
        </section>

        ${renderFilters(data.domains)}

        <section aria-labelledby="matrix-title">
            <h2 id="matrix-title">カバレッジ マトリクス</h2>
            <div class="table-wrap">
                <table id="matrix">
                    <caption>試験ドメイン × テストカテゴリのカバレッジ状況</caption>
                    <thead>
                        <tr>
                            <th scope="col">ドメイン</th>
                            ${colHeaders}
                        </tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>
            ${renderUncovered(data.uncoveredSources)}
        </section>

        <section aria-labelledby="actions-title">
            <h2 id="actions-title">ネクストアクション (優先度順)</h2>
            ${renderActions(data.actions)}
        </section>

        <section class="legend" aria-label="凡例">
            <h2>凡例</h2>
            <ul>
                <li><span class="cell cell--ok cell--legend">✅</span> Visual・A11y・Performance・Security: 対応テストが1件以上</li>
                <li><span class="cell cell--ok cell--legend">✅</span> その他のカテゴリ: 80%以上カバー</li>
                <li><span class="cell cell--warn cell--legend">⚠️</span> 部分的 (0〜80% 未満)</li>
                <li><span class="cell cell--missing cell--legend">❌</span> 未実装 (対応テスト 0 件)</li>
            </ul>
            <p class="muted">外部連携: なし (Datadog / SonarCloud 等は未導入)</p>
        </section>
    </main>

    <footer class="page-footer">
        <p>このダッシュボードは <code>bun run dashboard</code> で再生成できます (静的ファイルスキャンに基づく)。</p>
    </footer>

    <script type="application/json" id="dashboard-data">${safeJson(data)}</script>
    <script>${JS}</script>
</body>
</html>`.replace(/[ \t]+$/gm, '');
}

const CSS = `
:root {
    --bg: #ffffff;
    --fg: #111827;
    --muted: #4b5563;
    --border: #e5e7eb;
    --surface: #f9fafb;
    --accent: #2563eb;
    --ok-bg: #dcfce7;
    --ok-fg: #15803d;
    --warn-bg: #fef3c7;
    --warn-fg: #a16207;
    --miss-bg: #fee2e2;
    --miss-fg: #b91c1c;
    --p0: #b91c1c;
    --p1: #a16207;
    --p2: #1d4ed8;
    color-scheme: light;
}
:root[data-theme="dark"] {
    --bg: #0b1220;
    --fg: #f3f4f6;
    --muted: #9ca3af;
    --border: #1f2937;
    --surface: #111827;
    --accent: #60a5fa;
    --ok-bg: #064e3b;
    --ok-fg: #6ee7b7;
    --warn-bg: #78350f;
    --warn-fg: #fde68a;
    --miss-bg: #7f1d1d;
    --miss-fg: #fecaca;
    color-scheme: dark;
}
@media (prefers-color-scheme: dark) {
    :root[data-theme="auto"] {
        --bg: #0b1220;
        --fg: #f3f4f6;
        --muted: #9ca3af;
        --border: #1f2937;
        --surface: #111827;
        --accent: #60a5fa;
        --ok-bg: #064e3b;
        --ok-fg: #6ee7b7;
        --warn-bg: #78350f;
        --warn-fg: #fde68a;
        --miss-bg: #7f1d1d;
        --miss-fg: #fecaca;
        color-scheme: dark;
    }
}
* { box-sizing: border-box; }
html, body { background: var(--bg); color: var(--fg); }
body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif;
    margin: 0;
    line-height: 1.6;
}
main { max-width: 1280px; margin: 0 auto; padding: 1.5rem; }
.skip-link { position: absolute; left: -9999px; top: 0; background: var(--accent); color: #fff; padding: .5rem 1rem; z-index: 100; }
.skip-link:focus { left: 0; }
.page-header {
    display: flex; justify-content: space-between; align-items: center;
    padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border);
    max-width: 1280px; margin: 0 auto;
}
.page-header h1 { font-size: 1.5rem; margin: 0 0 .25rem; }
.muted { color: var(--muted); font-size: .9rem; }
.controls button {
    background: var(--surface); color: var(--fg); border: 1px solid var(--border);
    padding: .5rem .9rem; border-radius: .5rem; cursor: pointer; font-size: .9rem;
}
.controls button:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.summary { margin-bottom: 1.5rem; }
.summary h2 { margin: 0 0 .75rem; font-size: 1.15rem; }
.summary-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: .75rem;
}
.metric {
    background: var(--surface); border: 1px solid var(--border); border-radius: .5rem;
    padding: .9rem;
}
.metric-label { display: block; color: var(--muted); font-size: .8rem; }
.metric-value { display: block; font-size: 1.6rem; font-weight: 600; }
.metric--rate progress { width: 100%; height: .6rem; margin-top: .35rem; }
.filters { background: var(--surface); border: 1px solid var(--border); border-radius: .5rem; padding: .75rem 1rem; margin-bottom: 1rem; }
.filters summary { cursor: pointer; font-weight: 600; }
.filters fieldset { border: none; padding: .5rem 0; margin: 0; }
.filters legend { font-weight: 600; padding: 0; }
.filters label { display: inline-flex; align-items: center; gap: .35rem; margin-right: 1rem; margin-top: .35rem; }
.filters input[type="checkbox"]:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; min-width: 1024px; }
caption { caption-side: top; text-align: left; padding: .5rem 0; font-weight: 600; }
th, td { border: 1px solid var(--border); padding: .5rem .6rem; text-align: left; vertical-align: top; }
thead th { background: var(--surface); position: sticky; top: 0; z-index: 2; }
tbody th .row-label { display: block; font-weight: 600; }
tbody th .row-meta { display: block; color: var(--muted); font-size: .8rem; font-weight: 400; }
.cell { font-size: .85rem; }
.cell-icon { font-size: 1rem; margin-right: .25rem; }
.cell-ratio { font-weight: 600; }
.cell-count { display: block; color: var(--muted); font-size: .75rem; }
.cell--ok { background: var(--ok-bg); color: var(--ok-fg); }
.cell--warn { background: var(--warn-bg); color: var(--warn-fg); }
.cell--missing { background: var(--miss-bg); color: var(--miss-fg); }
.cell--legend { display: inline-block; padding: .1rem .4rem; border-radius: .25rem; margin-right: .35rem; }
.uncovered { margin-top: .75rem; }
.uncovered summary { cursor: pointer; font-weight: 600; }
.uncovered ul { margin: .5rem 0; padding-left: 1.25rem; }
.uncovered code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: .85rem; }
.actions { list-style: none; padding: 0; margin: 0; display: grid; gap: .75rem; }
.action { border: 1px solid var(--border); border-radius: .5rem; padding: .9rem 1rem; background: var(--surface); }
.action header { display: flex; align-items: center; gap: .5rem; margin-bottom: .35rem; }
.action h3 { margin: 0; font-size: 1.05rem; }
.action--p0 { border-left: 4px solid var(--p0); }
.action--p1 { border-left: 4px solid var(--p1); }
.action--p2 { border-left: 4px solid var(--p2); }
.badge { display: inline-block; padding: .15rem .45rem; border-radius: .25rem; font-weight: 700; font-size: .8rem; color: #fff; }
.badge--p0 { background: var(--p0); }
.badge--p1 { background: var(--p1); }
.badge--p2 { background: var(--p2); }
.action dl { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: .35rem .75rem; margin: .5rem 0 0; }
.action dt { font-size: .75rem; color: var(--muted); }
.action dd { margin: 0; font-size: .9rem; }
.legend ul { list-style: none; padding: 0; display: flex; gap: 1.25rem; flex-wrap: wrap; }
.page-footer { padding: 1rem 1.5rem; border-top: 1px solid var(--border); max-width: 1280px; margin: 1.5rem auto 0; color: var(--muted); font-size: .85rem; }
.page-footer code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
@media (max-width: 768px) {
    .page-header { flex-direction: column; align-items: flex-start; gap: .5rem; }
}
@media print {
    .controls, .filters, .skip-link, #theme-toggle { display: none !important; }
    body { background: #fff !important; color: #000 !important; }
    .cell--ok { background: #e7f5ec !important; color: #15803d !important; }
    .cell--warn { background: #fef7e0 !important; color: #a16207 !important; }
    .cell--missing { background: #fde8e8 !important; color: #b91c1c !important; }
    thead th { position: static !important; }
    table { break-inside: avoid; }
    .action { break-inside: avoid; page-break-inside: avoid; }
    a[href]::after { content: " (" attr(href) ")"; font-size: .75em; color: #555; }
}
`;

const JS = `
(function() {
    'use strict';
    const STORAGE_KEY = 'coverage-dashboard:theme';
    const root = document.documentElement;
    const stored = (function() { try { return localStorage.getItem(STORAGE_KEY); } catch (_) { return null; } })();
    if (stored === 'dark' || stored === 'light') root.setAttribute('data-theme', stored);

    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
        const sync = () => {
            const current = root.getAttribute('data-theme');
            const isDark = current === 'dark';
            toggle.setAttribute('aria-pressed', String(isDark));
        };
        sync();
        toggle.addEventListener('click', () => {
            const current = root.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            try { localStorage.setItem(STORAGE_KEY, next); } catch (_) {}
            sync();
        });
    }

    const apply = () => {
        const okDomains = new Set();
        document.querySelectorAll('[data-filter-domain]').forEach((el) => {
            if (el.checked) okDomains.add(el.getAttribute('data-filter-domain'));
        });
        const okStatuses = new Set();
        document.querySelectorAll('[data-filter-status]').forEach((el) => {
            if (el.checked) okStatuses.add(el.getAttribute('data-filter-status'));
        });
        document.querySelectorAll('tbody tr').forEach((tr) => {
            const d = tr.getAttribute('data-domain');
            const visibleRow = okDomains.has(d);
            tr.style.display = visibleRow ? '' : 'none';
        });
        document.querySelectorAll('td.cell').forEach((td) => {
            const s = td.getAttribute('data-status');
            const dim = !okStatuses.has(s);
            td.classList.toggle('cell--dim', dim);
            td.style.opacity = dim ? '0.25' : '';
        });
    };

    document.querySelectorAll('[data-filter-domain], [data-filter-status]').forEach((el) => {
        el.addEventListener('change', apply);
    });
    apply();
})();
`;
