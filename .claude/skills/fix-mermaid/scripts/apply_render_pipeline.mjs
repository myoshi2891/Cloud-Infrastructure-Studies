/**
 * apply_render_pipeline.mjs — 静的 HTML の Mermaid 描画パイプラインを冪等に適用する。
 *
 * 旧来の死蔵ワンオフ (fix_mermaid_config / fix_mermaid_css / fix_mermaid_size) を統合・汎用化。
 * 「DIAGRAMS の図ソースを定義する」LLM 判断が必要な部分以外の機械的処理を 1 本に集約し、
 * 同種作業でボイラープレートを手書き再生成しなくて済むようにする。
 *
 * 使い方:
 *   bun run .agents/skills/fix-mermaid/scripts/apply_render_pipeline.mjs <file.html>
 *
 * 前提: HTML の <script> 内に `const DIAGRAMS = {...}` が定義済みであること。
 *       未定義の場合は入力を書き換えず失敗する。各図の <div class="mermaid">...</div> は
 *       本スクリプトが連番 id 付きの空 div に変換する。
 */
import fs from 'fs';
import {
    findDiagramsDeclaration,
    maskCommentsAndStrings,
} from './javascript_source.mjs';

// --- 注入する正準ボイラープレート -------------------------------------------

// SVG 後処理 + render ループ。
// ⚠️ width は viewBox 由来の「自然 px 幅」+ maxWidth:100% を使う。
//    width:'100%' / 'auto' は viewBox のみで intrinsic サイズを持たない SVG をコンテナ全幅へ
//    拡大し、小さい flowchart LR 図の異常拡大を招くため使用禁止。
const RENDER_LOOP = `            // --- mermaid render pipeline (apply_render_pipeline.mjs) ---
            function applySvgFixups(svgEl, src) {
                svgEl.removeAttribute('width');
                svgEl.removeAttribute('height');
                svgEl.style.height = 'auto';
                svgEl.style.maxWidth = '100%';
                svgEl.style.overflow = 'visible';
                svgEl.style.marginBottom = '10px';
                const viewBox = svgEl.getAttribute('viewBox');
                if (!viewBox) return;
                const parts = viewBox.split(/\\s+/).map(Number);
                if (parts.length !== 4 || !parts.every((n) => Number.isFinite(n))) return;
                const trimmed = src.trim();
                const isSequenceOrState =
                    trimmed.startsWith('sequenceDiagram') || trimmed.startsWith('stateDiagram');
                const extraHeight = isSequenceOrState ? 110 : 15;
                const [x, y, w, h] = parts;
                // 自然幅で表示し拡大は抑制。親より広い図のみ maxWidth で縮小される。
                svgEl.style.width = w + 'px';
                svgEl.setAttribute('viewBox', x + ' ' + y + ' ' + w + ' ' + (h + extraHeight));
            }

            (async () => {
                if (document.fonts && document.fonts.ready) {
                    try {
                        await document.fonts.ready;
                    } catch (_e) {
                        /* フォント待機に失敗しても描画は継続する */
                    }
                }
                for (const [id, src] of Object.entries(DIAGRAMS)) {
                    const el = document.getElementById(id);
                    if (!el) continue;
                    try {
                        const { svg } = await mermaid.render('svg-' + id, src);
                        el.innerHTML = svg;
                        const svgEl = el.querySelector('svg');
                        if (svgEl) applySvgFixups(svgEl, src);
                    } catch (err) {
                        el.innerHTML =
                            '<pre style="color:#ff8888;white-space:pre-wrap">' +
                            (err && err.message ? err.message : String(err)) +
                            '</pre>';
                    }
                }
            })();
`;

// 中央寄せ CSS。.mermaid-wrap / .diagram-wrap の両レイアウトに対応。
const CENTERING_CSS = `        /* mermaid-center (apply_render_pipeline.mjs): 図を中央寄せ */
        .mermaid-wrap,
        .diagram-wrap .mermaid {
            display: flex;
            justify-content: center;
        }
        .mermaid-wrap svg,
        .diagram-wrap .mermaid svg {
            display: block;
            margin: 0 auto;
            max-width: 100%;
            height: auto;
        }
`;

const RENDER_LOOP_MARKER = 'function applySvgFixups';
const CENTERING_MARKER = 'mermaid-center (apply_render_pipeline.mjs)';

// --- 各ステップ (純粋関数・冪等) --------------------------------------------

/**
 * Replaces un-IDed Mermaid containers with sequential placeholder elements.
 * Existing ID-bearing Mermaid containers remain unchanged.
 * @param {string} html - The HTML to transform.
 * @returns {{html: string, count: number}} The transformed HTML and number of replacements.
 */
export function injectIds(html) {
    let count = 0;
    const out = html.replace(
        /([ \t]*)<div class="mermaid">[\s\S]*?<\/div>/g,
        (_m, indent) => {
            count += 1;
            return `${indent}<div class="mermaid" id="diag-${count}"></div>`;
        },
    );
    return { html: out, count };
}

/**
 * Updates Mermaid initialization options for manual rendering.
 * @param {string} html - The HTML containing the Mermaid initialization.
 * @return {string} The HTML with `startOnLoad` set to `false` and `securityLevel` set to `'loose'` when required.
 */
export function ensureInitFlags(html) {
    const initializeCall = findMermaidInitialize(html);
    if (!initializeCall) return html;
    const { maskedSource: maskedHtml, optionsStart } = initializeCall;
    if (html[optionsStart] !== '{') return html;
    const optionsEnd = findMatchingBrace(maskedHtml, optionsStart);
    if (optionsEnd === -1) return html;

    const startOnLoad = findTopLevelProperty(
        html,
        maskedHtml,
        optionsStart,
        optionsEnd,
        'startOnLoad',
    );
    const securityLevel = findTopLevelProperty(
        html,
        maskedHtml,
        optionsStart,
        optionsEnd,
        'securityLevel',
    );
    const startOnLoadValue = startOnLoad
        ? /^(true|false)\b/.exec(maskedHtml.slice(startOnLoad.valueStart))
        : null;
    let insertionIndex = -1;

    if (!securityLevel) {
        let commaIndex = startOnLoadValue
            ? startOnLoad.valueStart + startOnLoadValue[0].length
            : -1;
        while (commaIndex !== -1 && /\s/.test(maskedHtml[commaIndex] ?? '')) commaIndex += 1;
        insertionIndex = commaIndex !== -1 && html[commaIndex] === ','
            ? commaIndex + 1
            : optionsStart + 1;
    }

    let out = html;
    if (startOnLoadValue?.[1] === 'true') {
        out = out.slice(0, startOnLoad.valueStart) + 'false' + out.slice(startOnLoad.valueStart + 4);
        if (insertionIndex > startOnLoad.valueStart) insertionIndex += 1;
    }
    if (insertionIndex !== -1) {
        const insertion = insertionIndex === optionsStart + 1
            ? " securityLevel: 'loose',"
            : "\n                securityLevel: 'loose',";
        out = out.slice(0, insertionIndex) + insertion + out.slice(insertionIndex);
    }
    return out;
}

/**
 * Locates the first `mermaid.initialize` call in the source.
 * @param {string} source - The HTML or script source to search.
 * @return {{index: number, optionsStart: number, maskedSource: string}|null} The call position, options object start position, and comment- and string-masked source, or `null` if no call is found.
 */
function findMermaidInitialize(source) {
    const scriptPattern = /<script\b[^>]*>([\s\S]*?)<\/script\s*>/gi;
    const scripts = [...source.matchAll(scriptPattern)];
    const segments = scripts.length > 0
        ? scripts.map((script) => ({
            offset: script.index + script[0].indexOf('>') + 1,
            source: script[1],
        }))
        : [{ offset: 0, source }];

    for (const segment of segments) {
        const maskedSegment = maskCommentsAndStrings(segment.source);
        const match = /(^|[^.$\w])mermaid\.initialize\(\s*/.exec(maskedSegment);
        if (!match) continue;
        const prefixLength = match[1].length;
        const maskedSource = source.slice(0, segment.offset)
            + maskedSegment
            + source.slice(segment.offset + segment.source.length);
        return {
            index: segment.offset + match.index + prefixLength,
            optionsStart: segment.offset + match.index + match[0].length,
            maskedSource,
        };
    }
    return null;
}

/**
 * Finds the closing brace that matches an opening brace.
 * @param {string} maskedSource - Source text with comments and strings masked.
 * @param {number} openingIndex - Index of the opening brace.
 * @return {number} The index of the matching closing brace, or -1 if none is found.
 */
function findMatchingBrace(maskedSource, openingIndex) {
    let depth = 0;
    for (let index = openingIndex; index < maskedSource.length; index += 1) {
        const char = maskedSource[index];
        if (char === '{') {
            depth += 1;
        } else if (char === '}') {
            depth -= 1;
            if (depth === 0) return index;
        }
    }
    return -1;
}

/**
 * Locates a direct property in an object literal.
 * @param {string} source - The original source containing the property name.
 * @param {string} maskedSource - The source with comments and strings masked for structural scanning.
 * @param {number} openingIndex - The index of the object's opening brace.
 * @param {number} closingIndex - The index of the object's closing brace.
 * @param {string} propertyName - The property name to locate.
 * @return {{valueStart: number}|null} The index of the property's value after leading whitespace, or `null` if the property is not found.
 */
function findTopLevelProperty(source, maskedSource, openingIndex, closingIndex, propertyName) {
    let depth = 0;
    for (let index = openingIndex; index <= closingIndex; index += 1) {
        const char = maskedSource[index];
        if (char === '{') {
            depth += 1;
        } else if (char === '}') {
            depth -= 1;
        } else if (depth === 1 && char === ':') {
            if (readPropertyNameBeforeColon(source, index) === propertyName) {
                return { valueStart: skipWhitespace(maskedSource, index + 1) };
            }
        }
    }
    return null;
}

/**
 * Finds the first non-whitespace position at or after the specified index.
 * @param {string} source - The string to scan.
 * @param {number} start - The index at which to begin scanning.
 * @return {number} The index of the first non-whitespace character.
 */
function skipWhitespace(source, start) {
    let index = start;
    while (/\s/.test(source[index] ?? '')) index += 1;
    return index;
}

/**
 * Reads a property name immediately before a colon.
 * @param {string} source - The source text containing the property.
 * @param {number} colonIndex - The index of the property's colon.
 * @return {string|null} The property name, or `null` when a quoted name is unterminated.
 */
function readPropertyNameBeforeColon(source, colonIndex) {
    let end = colonIndex;
    while (/\s/.test(source[end - 1] ?? '')) end -= 1;
    const last = source[end - 1];
    if (last === "'" || last === '"') {
        for (let start = end - 2; start >= 0; start -= 1) {
            if (source[start] === last) {
                let backslashes = 0;
                for (let cursor = start - 1; source[cursor] === '\\'; cursor -= 1) backslashes += 1;
                if (backslashes % 2 === 0) return source.slice(start + 1, end - 1);
            }
        }
        return null;
    }
    let start = end;
    while (/[\w$]/.test(source[start - 1] ?? '')) start -= 1;
    return source.slice(start, end);
}

/**
 * Adds the Mermaid rendering loop to the script containing Mermaid initialization.
 * @param {string} html - The HTML document to update.
 * @returns {string} The HTML document with the rendering loop inserted.
 * @throws {Error} If Mermaid initialization or a subsequent closing script tag is missing.
 */
export function injectRenderLoop(html) {
    if (html.includes(RENDER_LOOP_MARKER)) return html;
    const initializeCall = findMermaidInitialize(html);
    if (!initializeCall) {
        throw new Error('mermaid.initialize( が見つかりません。初期化ブロックを先に用意してください。');
    }
    const initIdx = initializeCall.index;
    const closingScriptPattern = /<\/script\s*>/gi;
    closingScriptPattern.lastIndex = initIdx;
    const closingScript = closingScriptPattern.exec(html);
    if (!closingScript) {
        throw new Error('mermaid.initialize 以降に </script> が見つかりません。');
    }
    const closeIdx = closingScript.index;
    return html.slice(0, closeIdx) + '\n' + RENDER_LOOP + '        ' + html.slice(closeIdx);
}

/**
 * Adds Mermaid centering styles to the HTML document.
 * @param {string} html - The HTML source to update.
 * @returns {string} The HTML source with centering styles injected.
 * @throws {Error} If the document contains neither a closing `</style>` nor `</head>` tag.
 */
export function injectCenteringCss(html) {
    if (html.includes(CENTERING_MARKER)) return html;
    const styleCloseIdx = html.indexOf('</style>');
    if (styleCloseIdx !== -1) {
        return html.slice(0, styleCloseIdx) + CENTERING_CSS + html.slice(styleCloseIdx);
    }
    const headCloseIdx = html.indexOf('</head>');
    if (headCloseIdx !== -1) {
        const block = `    <style>\n${CENTERING_CSS}    </style>\n`;
        return html.slice(0, headCloseIdx) + block + html.slice(headCloseIdx);
    }
    throw new Error('</style> も </head> も見つからず中央寄せ CSS を注入できません。');
}

/**
 * Applies the Mermaid rendering pipeline to an HTML document.
 * @param {string} html - The HTML document to process.
 * @returns {{html: string, report: string[]}} The transformed HTML and a report describing applied changes.
 * @throws {Error} If the document does not define `DIAGRAMS`.
 */
export function applyPipeline(html) {
    const report = [];

    if (!findDiagramsDeclaration(html)) {
        throw new Error('DIAGRAMS が定義されていません。図ソースを定義してから再実行してください。');
    }

    const ids = injectIds(html);
    let out = ids.html;
    report.push(
        ids.count > 0
            ? `div→id 置換: ${ids.count} 件`
            : 'div→id 置換: 対象なし (適用済みか div.mermaid 不在)',
    );

    const beforeFlags = out;
    out = ensureInitFlags(out);
    report.push(out !== beforeFlags ? 'init フラグ: 更新' : 'init フラグ: 変更なし');

    const beforeLoop = out;
    out = injectRenderLoop(out);
    report.push(out !== beforeLoop ? 'render ループ: 注入' : 'render ループ: 適用済み');

    const beforeCss = out;
    out = injectCenteringCss(out);
    report.push(out !== beforeCss ? '中央寄せ CSS: 注入' : '中央寄せ CSS: 適用済み');

    return { html: out, report };
}

// --- CLI エントリポイント ----------------------------------------------------

if (import.meta.main) {
    const file = process.argv[2];
    if (!file) {
        console.error('Usage: bun run apply_render_pipeline.mjs <file.html>');
        process.exit(1);
    }
    if (!fs.existsSync(file)) {
        console.error(`❌ File not found: ${file}`);
        process.exit(1);
    }
    const input = fs.readFileSync(file, 'utf8');
    let result;
    try {
        result = applyPipeline(input);
    } catch (err) {
        console.error(`❌ ${err instanceof Error ? err.message : String(err)}`);
        process.exit(1);
    }
    result.report.forEach((line) => console.log('  - ' + line));
    if (result.html !== input) {
        fs.writeFileSync(file, result.html, 'utf8');
        console.log(`\n✅ Applied: ${file}`);
    } else {
        console.log(`\n✅ No changes (already applied): ${file}`);
    }
}
