export const codeBlockSelector = 'pre:not(.mermaid), .code-block';

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
