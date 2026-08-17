import fs from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';
import {
    codeBlockSelector,
    codeLineCount,
    extractBodyContent,
    normalize,
} from './inventory-extraction.mjs';

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
const texts = (sel) =>
    [...doc.querySelectorAll(sel)]
        .map((el) => normalize(el.textContent ?? ''))
        .filter(Boolean);
const diagramSelector = '[data-testid="mermaid-diagram"], .mermaid, [id^="diag-"]';
const diagrams = [...doc.querySelectorAll(diagramSelector)].filter(
    (element) => !element.querySelector(diagramSelector),
);
const codeBlocks = [...doc.querySelectorAll(codeBlockSelector)].filter(
    (element) => !element.parentElement?.closest(codeBlockSelector),
);
const bodyContent = extractBodyContent(doc.body);

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
                // 移行元が列数の正本。scope="col" は移行先で必須化する属性であり
                // 移行元（Markdown 由来 HTML など）には無いことが多いため、
                // ここでの絞り込みに使うと常に 0 になり検証が空振りする。
                tableColumnHeaders: [...doc.querySelectorAll('table')].map(
                    (table) => table.querySelectorAll('thead th').length,
                ),
                codeLines: codeBlocks.map(codeLineCount),
            },
        },
        null,
        2,
    ),
);
