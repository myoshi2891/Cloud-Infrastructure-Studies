import fs from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';
import React from 'react';
import { renderToString } from 'react-dom/server';

// Mock MermaidDiagram component to avoid SVG rendering issues during SSR string compilation
vi_mock_mermaid();

/**
 * Exposes React globally for standalone execution.
 */
function vi_mock_mermaid() {
    // If running in standalone node process
    globalThis.React = React;
}

import CcnaNetworkFundamentalsGuide from '../app/cisco/ccna/automation-network-fundamentals/CcnaNetworkFundamentalsGuide.tsx';

/**
 * Identifies text differences between source and rendered text sequences.
 * @param {string[]} sourceTexts - Text values from the source document.
 * @param {string[]} jsxTexts - Text values from the rendered document.
 * @return {string[]} Mismatch descriptions, or an empty array when the sequences match after whitespace removal.
 */
export function findOrderedTextMismatches(sourceTexts, jsxTexts) {
    const comparisonText = (text) => text.replace(/\s+/g, '');
    const missingTexts = [];
    const comparisonLength = Math.max(sourceTexts.length, jsxTexts.length);
    for (let index = 0; index < comparisonLength; index += 1) {
        if (comparisonText(sourceTexts[index] ?? '') !== comparisonText(jsxTexts[index] ?? '')) {
            missingTexts.push(
                sourceTexts[index]
                    ? `${sourceTexts[index]} [移行先: ${jsxTexts[index] ?? 'なし'}]`
                    : `[移行先のみ: ${jsxTexts[index]}]`,
            );
        }
    }
    return missingTexts;
}

/**
 * Verifies that the server-rendered guide matches the source HTML content and reference links.
 *
 * @param {string} htmlPath - Path to the source HTML file.
 * @returns {boolean} `true` when all compared content and reference links match.
 * @throws {Error} If the source file is missing or the rendered output differs from the source.
 */
export function verifyDOMFidelity(htmlPath) {
    if (!fs.existsSync(htmlPath)) {
        throw new Error(`Source HTML file not found: ${htmlPath}`);
    }

    const htmlRaw = fs.readFileSync(htmlPath, 'utf8');
    const domHtml = new JSDOM(htmlRaw);
    const docHtml = domHtml.window.document;

    const jsxHtml = renderToString(React.createElement(CcnaNetworkFundamentalsGuide));
    const domJsx = new JSDOM(`<!DOCTYPE html><html><body>${jsxHtml}</body></html>`);
    const docJsx = domJsx.window.document;

    const contentSelector = 'main h1, main h2, main h3, main p, main li, main th, main td, main .ref-url, main span.ref-name';
    const normalizeText = (element) => element.textContent.replace(/\s+/g, ' ').trim();
    const sourceTexts = Array.from(docHtml.querySelectorAll(contentSelector), normalizeText).filter(Boolean);
    const jsxTexts = Array.from(docJsx.querySelectorAll(contentSelector), normalizeText).filter(Boolean);
    const missingTexts = findOrderedTextMismatches(sourceTexts, jsxTexts);

    if (missingTexts.length > 0) {
        console.error(`\n❌ [VERIFICATION FAILED] Found ${missingTexts.length} missing texts in rendered Next.js component:\n`);
        missingTexts.slice(0, 15).forEach((t, i) => console.error(`  ${i + 1}. "${t}"`));
        if (missingTexts.length > 15) {
            console.error(`  ... and ${missingTexts.length - 15} more missing items.`);
        }
        throw new Error(`Migration verification failed: ${missingTexts.length} text nodes missing in rendered component.`);
    }

    const normalizeRefLink = (link, source = false) => {
        const text = link.textContent.replace(/\s+/g, ' ').trim();
        return {
            text,
            href: source ? link.getAttribute('href') ?? text : link.getAttribute('href'),
        };
    };
    const sourceRefLinks = Array.from(
        docHtml.querySelectorAll('main a.ref-url, main span.ref-url'),
        (link) => normalizeRefLink(link, true),
    );
    const migratedRefLinks = Array.from(
        docJsx.querySelectorAll('main a.ref-url'),
        (link) => normalizeRefLink(link),
    );
    if (JSON.stringify(migratedRefLinks) !== JSON.stringify(sourceRefLinks)) {
        throw new Error('Migration verification failed: reference link text, count, or href differs.');
    }

    console.log(`\n✅ [VERIFICATION SUCCESSFUL] All ${sourceTexts.length} DOM text elements from source HTML match Next.js rendered component 100%!\n`);
    return true;
}

if (process.argv[1] && process.argv[1].endsWith('verify-html-migration.mjs')) {
    const htmlPath = path.resolve(process.cwd(), 'archive/Cisco/html/ccna/Ccna-automation-network-fundamentals.html');
    try {
        verifyDOMFidelity(htmlPath);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}
