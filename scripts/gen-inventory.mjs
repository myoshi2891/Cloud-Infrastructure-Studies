import fs from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';

const [, , htmlPath] = process.argv;
if (!htmlPath) {
    throw new Error('usage: bun <script> <source.html>');
}
const repositoryRoot = process.cwd();
const absoluteHtmlPath = path.resolve(repositoryRoot, htmlPath);
const source = path.relative(repositoryRoot, absoluteHtmlPath).split(path.sep).join('/');
if (!source || source.startsWith('../') || path.isAbsolute(source)) {
    throw new Error('source.html must be inside the repository');
}
const repositoryRealPath = fs.realpathSync(repositoryRoot);
const htmlRealPath = fs.realpathSync(absoluteHtmlPath);
const realSource = path.relative(repositoryRealPath, htmlRealPath);
if (
    !realSource
    || realSource === '..'
    || realSource.startsWith(`..${path.sep}`)
    || path.isAbsolute(realSource)
) {
    throw new Error('source.html must resolve inside the repository');
}
const doc = new JSDOM(fs.readFileSync(htmlRealPath, 'utf8')).window.document;
const normalize = (value) => value.replace(/\s+/g, ' ').trim();
const texts = (sel) =>
    [...doc.querySelectorAll(sel)]
        .map((el) => normalize(el.textContent ?? ''))
        .filter(Boolean);
const diagramSelector = '[data-testid="mermaid-diagram"], .mermaid, [id^="diag-"]';
const diagrams = [...doc.querySelectorAll(diagramSelector)].filter(
    (element) => !element.querySelector(diagramSelector),
);
const codeBlockSelector = 'pre:not(.mermaid), .code-block';
const codeBlocks = [...doc.querySelectorAll(codeBlockSelector)].filter(
    (element) => !element.parentElement?.closest(codeBlockSelector),
);
const codeLines = (block) => {
    const explicitLines = [...block.querySelectorAll(':scope > .code-line')];
    if (explicitLines.length > 0) {
        return explicitLines.map((line) => line.textContent ?? '');
    }
    const text = (block.textContent ?? '')
        .replace(/\r\n?/g, '\n')
        .replace(/^\n|\n$/g, '');
    return text ? text.split('\n') : [];
};
const codeText = (block) => codeLines(block).join('\n');
const codeLineCount = (block) => codeLines(block).length;
const bodySelector = `p, aside, .annotation, [class*="callout"], img[alt], ${codeBlockSelector}`;
const bodyElements = [...doc.body.querySelectorAll(bodySelector)].filter(
    (element) => !element.parentElement?.closest(bodySelector),
);
const bodyContent = bodyElements
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

console.log(
    JSON.stringify(
        {
            source,
            h1: texts('h1'),
            h2: texts('h2'),
            h3: texts('h3'),
            h4: texts('h4'),
            th: texts('th'),
            td: texts('td'),
            listItems: texts('li'),
            links: [...doc.querySelectorAll('a[href^="http"]')].map((a) => ({
                text: normalize(a.textContent ?? ''),
                href: a.getAttribute('href'),
            })),
            bodyContent,
            counts: {
                table: doc.querySelectorAll('table').length,
                diagram: diagrams.length,
                codeBlock: codeBlocks.length,
                figure: doc.querySelectorAll('img, svg').length,
            },
            structures: {
                tableColumnHeaders: [...doc.querySelectorAll('table')].map(
                    (table) => table.querySelectorAll('thead th, th[scope="col"]').length,
                ),
                codeLines: codeBlocks.map(codeLineCount),
            },
        },
        null,
        2,
    ),
);
