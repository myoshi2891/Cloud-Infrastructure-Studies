import type { DOMWindow } from 'jsdom';
import { expect } from 'vitest';

type DocumentLike = Document | DOMWindow['document'];

const normalizeText = (value: string | null | undefined): string =>
    (value ?? '').replace(/\s+/g, ' ').trim();

const elementText = (element: Element): string =>
    normalizeText(
        Array.from(element.childNodes, (node) =>
            node.nodeType === 1 ? elementText(node as Element) : normalizeText(node.textContent),
        )
            .filter(Boolean)
            .join(' '),
    );

const sectionId = (element: Element): string => element.closest('section')?.id ?? 'hero';

export const expectTableFidelity = (source: DocumentLike, migrated: ParentNode): void => {
    const snapshot = (root: ParentNode) =>
        Array.from(root.querySelectorAll('main table, table'), (table) =>
            Array.from(table.querySelectorAll('tr'), (row) =>
                Array.from(row.querySelectorAll(':scope > th, :scope > td'), (cell) => ({
                    tag: cell.tagName.toLowerCase(),
                    text: normalizeText(cell.textContent),
                    colspan: cell.getAttribute('colspan'),
                    rowspan: cell.getAttribute('rowspan'),
                })),
            ),
        );

    expect(snapshot(migrated)).toEqual(snapshot(source));
};

export const expectSupplementalFidelity = (
    source: DocumentLike,
    migrated: ParentNode,
    selector: string,
): void => {
    const snapshot = (root: ParentNode) =>
        Array.from(root.querySelectorAll(selector), (element) => ({
            section: sectionId(element),
            tag: element.tagName.toLowerCase(),
            text: elementText(element),
        }));

    expect(snapshot(migrated)).toEqual(snapshot(source));
};

export const expectCodeFidelity = (source: DocumentLike, migrated: ParentNode): void => {
    const normalizeLines = (lines: string[]): string[] => {
        const normalized = lines.map((line) => line.replace(/\s+$/g, ''));
        while (normalized[0] === '') normalized.shift();
        while (normalized.at(-1) === '') normalized.pop();
        return normalized;
    };
    const sourceBlocks = Array.from(source.querySelectorAll('main pre code'), (code) =>
        normalizeLines((code.textContent ?? '').split('\n')),
    );
    const migratedBlocks = Array.from(migrated.querySelectorAll('.code-block'), (pre) => {
        const lineElements = Array.from(pre.querySelectorAll<HTMLElement>(':scope > .code-line'));
        expect(lineElements.length, '.code-block must contain at least one direct .code-line').toBeGreaterThan(0);
        return normalizeLines(lineElements.map((line) => line.textContent ?? ''));
    });

    expect(migratedBlocks).toEqual(sourceBlocks);
};

export const expectSyntaxHighlightFidelity = (
    source: DocumentLike,
    migrated: ParentNode,
    classMap: Readonly<Record<string, string>>,
): void => {
    for (const [migratedClass, sourceSelector] of Object.entries(classMap)) {
        const sourceTokens = Array.from(
            source.querySelectorAll(`main ${sourceSelector}`),
            (element) => normalizeText(element.textContent),
        );
        const migratedTokens = Array.from(
            migrated.querySelectorAll(`.${migratedClass}`),
            (element) => normalizeText(element.textContent),
        );
        expect(migratedTokens, `${sourceSelector} -> .${migratedClass}`).toEqual(sourceTokens);
    }
};

export const expectElementPlacementFidelity = (
    source: DocumentLike,
    migrated: ParentNode,
    selector: string,
): void => {
    const snapshot = (root: ParentNode) =>
        Array.from(root.querySelectorAll(selector), (element) => ({
            section: sectionId(element),
            kind:
                element.matches('table') ? 'table'
                : element.matches('pre, .code-block') ? 'code'
                : element.matches('figure, .diagram-block, .diagram-wrapper') ? 'diagram'
                : 'supplemental',
        }));

    expect(snapshot(migrated)).toEqual(snapshot(source));
};

export const expectContentCssCoverage = (
    source: DocumentLike,
    migrated: ParentNode,
    migratedCss: string,
    classMap: Readonly<Record<string, string>> = {},
): void => {
    const sourceStyle = Array.from(source.querySelectorAll('style'), (style) => style.textContent ?? '').join('\n');
    const sourceClasses = new Set(
        Array.from(source.querySelectorAll<HTMLElement>('main [class]'))
            .flatMap((element) => Array.from(element.classList))
            .filter((className) => sourceStyle.includes(`.${className}`)),
    );
    const migratedClasses = new Set(
        Array.from(migrated.querySelectorAll<HTMLElement>('[class]')).flatMap((element) =>
            Array.from(element.classList),
        ),
    );

    for (const className of sourceClasses) {
        const migratedClass = classMap[className] ?? className;
        expect(migratedClasses, `migrated markup is missing .${migratedClass}`).toContain(migratedClass);
        expect(migratedCss, `page.css is missing a definition for .${migratedClass}`).toContain(`.${migratedClass}`);
    }
};
