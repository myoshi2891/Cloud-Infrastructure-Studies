/**
 * 移行元 HTML から「移行忠実性の期待値スナップショット」を作る純粋関数群。
 *
 * 生成側（scripts/gen-fidelity-fixture.mjs）と検証側（__tests__/cisco/ccna/archive-fidelity.ts）が
 * この 1 本を共有する。生成側と検証側で抽出規則が分岐すると、fixture と実際の検証結果が
 * 静かに乖離して移行漏れを検出できなくなるため、抽出ロジックをテスト側へ複製しない。
 *
 * すべての関数は Document でも testing-library の container でも動く
 * （querySelectorAll / closest しか使わない）。
 */

/**
 * 連続する空白を 1 つに畳み、前後の空白を落とす。
 * @param {string|null|undefined} value - 正規化する文字列。
 * @returns {string} 正規化済みの文字列。
 */
export const normalizeText = (value) => (value ?? '').replace(/\s+/g, ' ').trim();

/**
 * 空白をすべて除去する（JSX の改行差を無視した包含判定用）。
 * @param {string|null|undefined} value - 正規化する文字列。
 * @returns {string} 空白を除去した文字列。
 */
export const squashText = (value) => (value ?? '').replace(/\s+/g, '');

/**
 * 子要素の境界で単語が結合しないよう、ノード単位で正規化しながらテキストを組み立てる。
 * @param {Element} element - 対象要素。
 * @returns {string} 正規化済みのテキスト。
 */
export const elementText = (element) =>
    normalizeText(
        Array.from(element.childNodes, (node) =>
            node.nodeType === 1 ? elementText(node) : normalizeText(node.textContent),
        )
            .filter(Boolean)
            .join(' '),
    );

/**
 * 要素が属するセクションの id を返す。セクション外は 'hero' として扱う。
 * @param {Element} element - 対象要素。
 * @returns {string} セクション id。
 */
export const sectionIdOf = (element) => element.closest('section')?.id ?? 'hero';

/**
 * 指定セレクタに一致する要素のテキストを出現順に集める。
 * @param {ParentNode} root - 走査対象。
 * @param {string} selector - CSS セレクタ。
 * @returns {string[]} 正規化済みテキスト（空文字は除く）。
 */
export const snapshotTexts = (root, selector) =>
    Array.from(root.querySelectorAll(selector), (element) => normalizeText(element.textContent))
        .filter((text) => squashText(text).length > 0);

/**
 * 表をセル単位でスナップショットする。
 * @param {ParentNode} root - 走査対象。
 * @returns {Array<Array<Array<{tag: string, text: string, colspan: string|null, rowspan: string|null}>>>} 表 → 行 → セル。
 */
export const snapshotTables = (root) =>
    Array.from(root.querySelectorAll('main table, table'), (table) =>
        // 入れ子の表の行は内側の表として別途スナップショットされるため、外側の表からは除外する
        Array.from(table.querySelectorAll('tr'))
            .filter((row) => row.closest('table') === table)
            .map((row) =>
                Array.from(row.querySelectorAll(':scope > th, :scope > td'), (cell) => ({
                    tag: cell.tagName.toLowerCase(),
                    text: normalizeText(cell.textContent),
                    colspan: cell.getAttribute('colspan'),
                    rowspan: cell.getAttribute('rowspan'),
                })),
            ),
    );

/**
 * <thead> と <tbody> を分けて表をスナップショットする。
 * @param {ParentNode} root - 走査対象。
 * @param {string} selector - 表のセレクタ。
 * @returns {Array<{headers: string[], rows: string[][]}>} 表ごとのヘッダーとデータ行。
 */
export const snapshotHeaderBodyTables = (root, selector) =>
    Array.from(root.querySelectorAll(selector), (table) => ({
        headers: Array.from(table.querySelectorAll('thead th'), (cell) => normalizeText(cell.textContent)),
        rows: Array.from(table.querySelectorAll('tbody tr'), (row) =>
            Array.from(row.querySelectorAll('td'), (cell) => normalizeText(cell.textContent)),
        ),
    }));

/**
 * コールアウト等の補足要素を、所属セクションつきでスナップショットする。
 * @param {ParentNode} root - 走査対象。
 * @param {string} selector - CSS セレクタ。
 * @returns {Array<{section: string, tag: string, text: string}>} 補足要素の並び。
 */
export const snapshotSupplemental = (root, selector) =>
    Array.from(root.querySelectorAll(selector), (element) => ({
        section: sectionIdOf(element),
        tag: element.tagName.toLowerCase(),
        text: elementText(element),
    }));

/**
 * コード行の末尾空白を落とし、前後の空行を取り除く。
 * @param {string[]} lines - コード行。
 * @returns {string[]} 正規化済みのコード行。
 */
export const normalizeCodeLines = (lines) => {
    const normalized = lines.map((line) => line.replace(/\s+$/g, ''));
    while (normalized[0] === '') normalized.shift();
    while (normalized.at(-1) === '') normalized.pop();
    return normalized;
};

/**
 * 移行元のコードブロックを行配列としてスナップショットする。
 * @param {ParentNode} root - 走査対象。
 * @param {string} [selector] - コード要素のセレクタ。
 * @returns {string[][]} コードブロックごとの行配列。
 */
export const snapshotSourceCodeBlocks = (root, selector = 'main pre code') =>
    Array.from(root.querySelectorAll(selector), (code) =>
        normalizeCodeLines((code.textContent ?? '').split('\n')),
    );

/**
 * 移行先のコードブロックを `.code-line` 単位でスナップショットする。
 * @param {ParentNode} root - 走査対象。
 * @param {string} [selector] - コードブロックのセレクタ。
 * @returns {string[][]} コードブロックごとの行配列。
 */
export const snapshotMigratedCodeBlocks = (root, selector = '.code-block') =>
    Array.from(root.querySelectorAll(selector), (block) =>
        normalizeCodeLines(
            Array.from(block.querySelectorAll(':scope > .code-line'), (line) => line.textContent ?? ''),
        ),
    );

/**
 * 移行先コードブロックが直下に持つ `.code-line` の数を返す。
 * @param {ParentNode} root - 走査対象。
 * @param {string} [selector] - コードブロックのセレクタ。
 * @returns {number[]} コードブロックごとの行数。
 */
export const migratedCodeLineCounts = (root, selector = '.code-block') =>
    Array.from(
        root.querySelectorAll(selector),
        (block) => block.querySelectorAll(':scope > .code-line').length,
    );

/**
 * ハイライトトークンをキーごとに集める。
 * @param {ParentNode} root - 走査対象。
 * @param {Readonly<Record<string, string>>} selectorByKey - キーと CSS セレクタの対応。
 * @returns {Record<string, string[]>} キーごとのトークン文字列。
 */
export const snapshotTokens = (root, selectorByKey) => {
    const tokens = {};
    for (const [key, selector] of Object.entries(selectorByKey)) {
        tokens[key] = Array.from(root.querySelectorAll(selector), (element) =>
            normalizeText(element.textContent),
        );
    }
    return tokens;
};

/**
 * 表・コード・図・補足の配置順をスナップショットする。
 * @param {ParentNode} root - 走査対象。
 * @param {string} selector - CSS セレクタ。
 * @returns {Array<{section: string, kind: string}>} 要素種別の並び。
 */
export const snapshotPlacement = (root, selector) =>
    Array.from(root.querySelectorAll(selector), (element) => ({
        section: sectionIdOf(element),
        kind:
            element.matches('table') ? 'table'
            : element.matches('pre, .code-block') ? 'code'
            : element.matches('figure, .diagram-block, .diagram-wrapper') ? 'diagram'
            : 'supplemental',
    }));

/**
 * 移行元の <style> に定義があるクラス名だけを、本文の出現順に集める。
 * @param {Document} doc - 移行元ドキュメント。
 * @returns {string[]} スタイル定義を持つクラス名（重複排除済み）。
 */
export const snapshotStyledClasses = (doc) => {
    const style = Array.from(doc.querySelectorAll('style'), (element) => element.textContent ?? '').join('\n');
    const classNames = new Set(
        Array.from(doc.querySelectorAll('main [class]'))
            .flatMap((element) => Array.from(element.classList))
            .filter((className) => style.includes(`.${className}`)),
    );
    return [...classNames];
};

/**
 * 移行先に存在するクラス名を集める。
 * @param {ParentNode} root - 走査対象。
 * @returns {Set<string>} クラス名の集合。
 */
export const collectClassNames = (root) =>
    new Set(
        Array.from(root.querySelectorAll('[class]')).flatMap((element) => Array.from(element.classList)),
    );

/**
 * インラインコード（pre の外の code）をスナップショットする。
 * @param {ParentNode} root - 走査対象。
 * @returns {string[]} 正規化済みのトークン。
 */
export const snapshotInlineCode = (root) =>
    Array.from(root.querySelectorAll('main code:not(pre code), code:not(pre code)'), (code) =>
        normalizeText(code.textContent),
    );

/**
 * 参考文献リンクの表示文字列を集める。移行元では URL がそのまま本文になっている。
 * @param {ParentNode} root - 走査対象。
 * @param {string} [selector] - リンクのセレクタ。
 * @returns {string[]} トリム済みのリンク文字列。
 */
export const snapshotRefUrls = (root, selector = '.ref-url') =>
    Array.from(root.querySelectorAll(selector), (element) => (element.textContent ?? '').trim());

/**
 * Mermaid 定義の行頭・行末空白を落として比較可能にする。
 * @param {string} value - Mermaid ソース。
 * @returns {string} 正規化済みの Mermaid ソース。
 */
export const normalizeMermaid = (value) =>
    value
        .trim()
        .split(/\r?\n/)
        .map((line) => line.trim())
        .join('\n');
