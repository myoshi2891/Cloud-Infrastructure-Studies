export const codeBlockSelector = 'pre:not(.mermaid), .code-block';

export const diagramSelector =
    '[data-testid="mermaid-diagram"], .mermaid, [id^="diag-"], .diagram-container';

export const normalize = (value) => value.replace(/\s+/g, ' ').trim();

export const codeLines = (block) => {
    const explicitLines = [...block.querySelectorAll(':scope > .code-line')];
    if (explicitLines.length > 0) {
        return explicitLines.map((line) => line.textContent ?? '');
    }
    const text = (block.textContent ?? '')
        .replace(/\r\n?/g, '\n')
        .replace(/^\n|\n$/g, '');
    return text ? text.split('\n') : [];
};

export const codeText = (block) => codeLines(block).join('\n');

export const codeLineCount = (block) => codeLines(block).length;

/**
 * 表の列見出し（th）の数を数える。
 *
 * 移行元 HTML は `<thead>` を持たず `<tr><th>…` だけで見出し行を表すことがある。
 * `thead th` だけで数えると、そうした表は常に 0 件となり列見出しの検証が空振りする。
 * thead があればその th を、無ければ最初の行の th を列見出しとして数える。
 *
 * @param {Element} table - The table element.
 * @returns {number} The number of column header cells.
 */
export const columnHeaderCount = (table) => {
    const head = table.querySelector('thead');
    if (head !== null) return head.querySelectorAll('th').length;
    const firstRow = table.querySelector('tr');
    return firstRow === null ? 0 : firstRow.querySelectorAll('th').length;
};

export const bodySelector =
    `p, aside, .annotation, [class*="callout"], img[alt], ${codeBlockSelector}`;

export const extractBodyContent = (container) =>
    [...container.querySelectorAll(bodySelector)]
        .filter((element) => !element.parentElement?.closest(bodySelector))
        .map((element) => ({
            kind: element.matches('img[alt]')
                ? 'imageAlt'
                : element.matches(codeBlockSelector)
                    ? 'code'
                    : element.matches('aside, .annotation, [class*="callout"]')
                        ? 'annotation'
                        : 'paragraph',
            text: element.matches(codeBlockSelector)
                ? codeText(element)
                : normalize(
                    element.matches('img[alt]')
                        ? element.getAttribute('alt') ?? ''
                        : element.textContent ?? '',
                ),
        }))
        .filter((entry) => entry.text);
