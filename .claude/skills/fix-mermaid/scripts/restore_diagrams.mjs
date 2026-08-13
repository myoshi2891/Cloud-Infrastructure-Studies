/**
 * restore_diagrams.mjs — 壊れた HTML 内の `DIAGRAMS` を、正本となる Markdown の
 * ```mermaid ブロックからキーワード一致で復元する。
 *
 * フォーマッタ等で HTML 側の図ソースが破壊された場合に、対応する .md(正本)から
 * 各図の正しいソースを引き当てて差し替える。
 *
 * 使い方:
 *   bun run .agents/skills/fix-mermaid/scripts/restore_diagrams.mjs <file.html> <source.md>
 */
import fs from 'fs';
import {
    findDiagramsDeclaration,
    maskCommentsAndStrings,
} from './javascript_source.mjs';

/**
 * Extract Mermaid code blocks from Markdown content.
 * @param {string} md - The Markdown content to scan.
 * @return {string[]} The trimmed contents of each Mermaid code block.
 */
export function extractMdMermaidBlocks(md) {
    const blocks = [];
    // CRLF / マーカー直後の余分な空白を許容する寛容な正規表現
    const regex = /```mermaid[ \t]*\r?\n([\s\S]*?)\r?\n```/g;
    for (const match of md.matchAll(regex)) {
        blocks.push(match[1].trim());
    }
    return blocks;
}

/**
 * Extracts search keywords from a damaged diagram source.
 * @param {string} brokenCode - The damaged diagram source.
 * @return {string[]} Quoted strings longer than three characters, or alphabetic words containing at least five characters when no such strings are found.
 */
function extractKeywords(brokenCode) {
    const keywords = [];
    for (const match of brokenCode.matchAll(/"(.*?)"/g)) {
        if (match[1].length > 3) keywords.push(match[1]);
    }
    if (keywords.length === 0) {
        for (const match of brokenCode.matchAll(/[a-zA-Z]{5,}/g)) {
            keywords.push(match[0]);
        }
    }
    return keywords;
}

/**
 * Restores each diagram using the most closely matching Mermaid block.
 * @param {Record<string, string>} diagrams - The diagram identifiers and their current code.
 * @param {string[]} mdBlocks - Mermaid blocks extracted from the Markdown source.
 * @returns {{ diagrams: Record<string, string>, warnings: string[] }} The restored diagrams and warnings for entries without a match.
 */
export function restoreDiagrams(diagrams, mdBlocks) {
    const restored = {};
    const warnings = [];
    for (const [id, brokenCode] of Object.entries(diagrams)) {
        const keywords = extractKeywords(brokenCode);
        let bestMatch = null;
        let maxScore = -1;
        for (const block of mdBlocks) {
            let score = 0;
            const normalizedBlock = block.replace(/\s+/g, '');
            for (const kw of keywords) {
                if (normalizedBlock.includes(kw.replace(/\s+/g, ''))) score++;
            }
            if (score > maxScore) {
                maxScore = score;
                bestMatch = block;
            }
        }
        if (bestMatch && maxScore > 0) {
            restored[id] = bestMatch;
        } else {
            warnings.push(`一致なし: ${id} (keywords: ${keywords.slice(0, 3).join(', ')})`);
            restored[id] = brokenCode; // フォールバック: 元のまま残す
        }
    }
    return { diagrams: restored, warnings };
}

/**
 * Finds the closing brace matching an object opening brace, including objects within script elements.
 * @param {string} source - The source text containing the object.
 * @param {number} openingIndex - The index of the object's opening brace in the source.
 * @return {number} The index of the matching closing brace, or `-1` if none is found.
 */
function findObjectEnd(source, openingIndex) {
    const scriptPattern = /<script\b[^>]*>([\s\S]*?)<\/script\s*>/gi;
    let sourceOffset = 0;
    let sourceToMask = source;
    for (const script of source.matchAll(scriptPattern)) {
        const bodyStart = script.index + script[0].indexOf('>') + 1;
        const bodyEnd = bodyStart + script[1].length;
        if (openingIndex >= bodyStart && openingIndex < bodyEnd) {
            sourceOffset = bodyStart;
            sourceToMask = script[1];
            break;
        }
    }
    const maskedSource = maskCommentsAndStrings(sourceToMask);
    const localOpeningIndex = openingIndex - sourceOffset;
    let depth = 0;
    for (let index = localOpeningIndex; index < maskedSource.length; index += 1) {
        const char = maskedSource[index];
        if (char === '{') depth += 1;
        else if (char === '}') {
            depth -= 1;
            if (depth === 0) return sourceOffset + index;
        }
    }
    return -1;
}

/**
 * Decodes an escape sequence from the specified position.
 * @param {string} source - The source text containing the escape sequence.
 * @param {number} start - The index of the character following the escape marker.
 * @returns {{value: string, next: number}} The decoded value and the index following the escape sequence.
 * @throws {Error} If a Unicode or hexadecimal escape has invalid digits or an out-of-range code point.
 */
function decodeEscape(source, start) {
    const char = source[start];
    const simpleEscapes = {
        n: '\n',
        r: '\r',
        t: '\t',
        b: '\b',
        f: '\f',
        v: '\v',
        0: '\0',
        '\\': '\\',
        "'": "'",
        '"': '"',
        '`': '`',
        '/': '/',
    };
    if (Object.hasOwn(simpleEscapes, char)) {
        return { value: simpleEscapes[char], next: start + 1 };
    }
    if (char === '\n') return { value: '', next: start + 1 };
    if (char === '\r') {
        return { value: '', next: source[start + 1] === '\n' ? start + 2 : start + 1 };
    }
    if (char === 'u' && source[start + 1] === '{') {
        const closingBrace = source.indexOf('}', start + 2);
        const digits = closingBrace === -1 ? '' : source.slice(start + 2, closingBrace);
        if (!/^[0-9a-fA-F]+$/.test(digits)) {
            throw new Error('不正な \\u{...} エスケープです。');
        }
        const codePoint = Number.parseInt(digits, 16);
        if (codePoint > 0x10ffff) {
            throw new Error('Unicode コードポイントが範囲外です。');
        }
        return { value: String.fromCodePoint(codePoint), next: closingBrace + 1 };
    }
    const escapeLength = char === 'u' ? 4 : char === 'x' ? 2 : 0;
    if (escapeLength > 0) {
        const digits = source.slice(start + 1, start + 1 + escapeLength);
        if (!new RegExp(`^[0-9a-fA-F]{${escapeLength}}$`).test(digits)) {
            throw new Error(`不正な \\${char} エスケープです。`);
        }
        return {
            value: String.fromCharCode(Number.parseInt(digits, 16)),
            next: start + 1 + escapeLength,
        };
    }
    return { value: char, next: start + 1 };
}

/**
 * Parses a quoted string literal and decodes its escape sequences.
 * @param {string} source - The source text containing the string literal.
 * @param {number} start - The index of the opening quote.
 * @param {string} allowedQuotes - The quote characters permitted to start and end the literal.
 * @returns {{value: string, end: number}} The decoded string and the index immediately after its closing quote.
 * @throws {Error} If the literal has an invalid quote, escape sequence, or no closing quote.
 */
function readString(source, start, allowedQuotes) {
    const quote = source[start];
    if (!allowedQuotes.includes(quote)) throw new Error(`文字列リテラルが必要です (位置 ${start})`);
    let value = '';
    for (let index = start + 1; index < source.length; index += 1) {
        const char = source[index];
        if (char === quote) return { value, end: index + 1 };
        if (char === '\\') {
            const escapeStart = index + 1;
            if (escapeStart >= source.length) throw new Error('文字列末尾の不正なエスケープです。');
            const decoded = decodeEscape(source, escapeStart);
            value += decoded.value;
            index = decoded.next - 1;
        } else {
            value += char;
        }
    }
    throw new Error('閉じられていない文字列リテラルです。');
}

/**
 * Parses a diagram definition object with quoted keys and string values.
 * @param {string} objectSource - The object source, including its surrounding braces.
 * @return {Record<string, string>} The parsed diagram definitions.
 * @throws {Error} If the object contains invalid syntax or an unterminated comment or string.
 */
function parseTemplateLiteralObject(objectSource) {
    const diagrams = {};
    let index = 1;
    const skipTrivia = () => {
        while (index < objectSource.length) {
            if (/\s/.test(objectSource[index] ?? '')) {
                index += 1;
            } else if (objectSource[index] === '/' && objectSource[index + 1] === '/') {
                index += 2;
                while (index < objectSource.length && objectSource[index] !== '\n') index += 1;
            } else if (objectSource[index] === '/' && objectSource[index + 1] === '*') {
                const commentEnd = objectSource.indexOf('*/', index + 2);
                if (commentEnd === -1) throw new Error('閉じられていないブロックコメントです。');
                index = commentEnd + 2;
            } else {
                break;
            }
        }
    };
    while (index < objectSource.length - 1) {
        skipTrivia();
        if (objectSource[index] === '}') break;
        if (objectSource[index] !== "'" && objectSource[index] !== '"') {
            throw new Error('DIAGRAMS のキーはクォートされた文字列リテラルで指定してください。');
        }
        const key = readString(objectSource, index, ["'", '"']);
        index = key.end;
        skipTrivia();
        if (objectSource[index] !== ':') throw new Error(`DIAGRAMS のキー ${key.value} に ':' がありません。`);
        index += 1;
        skipTrivia();
        const value = readString(objectSource, index, ["'", '"', '`']);
        diagrams[key.value] = value.value;
        index = value.end;
        skipTrivia();
        if (objectSource[index] === ',') {
            index += 1;
        } else if (objectSource[index] !== '}') {
            throw new Error("DIAGRAMS の値の後には ',' または '}' が必要です。");
        }
    }
    return diagrams;
}

/**
 * Validates a DIAGRAMS value and returns it when all entries are strings.
 * @param {*} diagrams - The value to validate.
 * @return {Record<string, string>} The validated DIAGRAMS object.
 * @throws {TypeError} If the value is not an object, is null, is an array, or contains a non-string value.
 */
function validateDiagrams(diagrams) {
    if (
        diagrams === null ||
        typeof diagrams !== 'object' ||
        Array.isArray(diagrams) ||
        Object.values(diagrams).some((diagram) => typeof diagram !== 'string')
    ) {
        throw new TypeError('DIAGRAMS の値はすべて文字列で指定してください。');
    }
    return diagrams;
}

/**
 * Extracts and validates the `DIAGRAMS` object definition from HTML.
 * @param {string} html - The HTML source containing the `DIAGRAMS` declaration.
 * @returns {{diagrams: Record<string, string>, start: number, end: number}} The validated diagram definitions and the definition's source range, with `end` exclusive.
 * @throws {Error} If the declaration is missing, is not a closed object literal, or contains invalid data.
 */
export function extractDiagramsDefinition(html) {
    const declaration = findDiagramsDeclaration(html);
    if (!declaration) throw new Error('const DIAGRAMS の定義が見つかりません。');
    const start = declaration.valueStart;
    if (html[start] !== '{') throw new Error('DIAGRAMS はオブジェクトリテラルで定義してください。');
    const end = findObjectEnd(html, start);
    if (end === -1) throw new Error('DIAGRAMS オブジェクトが閉じられていません。');
    const objectSource = html.slice(start, end + 1);
    let diagrams;
    try {
        diagrams = JSON.parse(objectSource);
    } catch (error) {
        if (!(error instanceof SyntaxError)) throw error;
        diagrams = parseTemplateLiteralObject(objectSource);
    }
    return { diagrams: validateDiagrams(diagrams), start, end: end + 1 };
}

/**
 * Serializes diagram definitions as indented JSON.
 * @param {Object} diagrams - The diagram definitions to serialize.
 * @return {string} The JSON representation of the diagram definitions.
 */
export function serializeDiagramsDefinition(diagrams) {
    return JSON.stringify(diagrams, null, 2);
}

// --- CLI エントリポイント ----------------------------------------------------

if (import.meta.main) {
    const [htmlPath, mdPath] = process.argv.slice(2);
    if (!htmlPath || !mdPath) {
        console.error('Usage: bun run restore_diagrams.mjs <file.html> <source.md>');
        process.exit(1);
    }
    for (const p of [htmlPath, mdPath]) {
        if (!fs.existsSync(p)) {
            console.error(`❌ File not found: ${p}`);
            process.exit(1);
        }
    }

    let html = fs.readFileSync(htmlPath, 'utf8');
    const md = fs.readFileSync(mdPath, 'utf8');

    const mdBlocks = extractMdMermaidBlocks(md);
    if (mdBlocks.length === 0) {
        console.error(`❌ No mermaid blocks found in ${mdPath}`);
        process.exit(1);
    }

    let definition;
    try {
        definition = extractDiagramsDefinition(html);
    } catch (error) {
        console.error(`❌ ${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
    }

    const { diagrams: restored, warnings } = restoreDiagrams(definition.diagrams, mdBlocks);
    warnings.forEach((w) => console.warn('  ⚠️ ' + w));

    html =
        html.slice(0, definition.start) +
        serializeDiagramsDefinition(restored) +
        html.slice(definition.end);
    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log(`\n✅ Restored ${Object.keys(restored).length} diagrams into ${htmlPath}`);
}
