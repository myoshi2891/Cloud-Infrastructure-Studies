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
 * Markdown 内の ```mermaid ブロックを抽出する。
 * @returns {string[]} 各ブロックの中身(trim 済み)
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
 * 壊れた図ソースから検索キーワードを抽出する。
 * クォート内の文字列を優先し、無ければ英字 5 文字以上の語を使う。
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
 * 壊れた DIAGRAMS と MD ブロック群から、各図に最も一致するブロックを選び復元する。
 * @returns {{ diagrams: Record<string,string>, warnings: string[] }}
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

function findObjectEnd(source, openingIndex) {
    const maskedSource = maskCommentsAndStrings(source);
    let depth = 0;
    for (let index = openingIndex; index < maskedSource.length; index += 1) {
        const char = maskedSource[index];
        if (char === '{') depth += 1;
        else if (char === '}') {
            depth -= 1;
            if (depth === 0) return index;
        }
    }
    return -1;
}

function decodeEscape(char) {
    return { n: '\n', r: '\r', t: '\t', b: '\b', f: '\f', v: '\v' }[char] ?? char;
}

function readString(source, start, allowedQuotes) {
    const quote = source[start];
    if (!allowedQuotes.includes(quote)) throw new Error(`文字列リテラルが必要です (位置 ${start})`);
    let value = '';
    for (let index = start + 1; index < source.length; index += 1) {
        const char = source[index];
        if (char === quote) return { value, end: index + 1 };
        if (char === '\\') {
            index += 1;
            if (index >= source.length) throw new Error('文字列末尾の不正なエスケープです。');
            value += decodeEscape(source[index]);
        } else {
            value += char;
        }
    }
    throw new Error('閉じられていない文字列リテラルです。');
}

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
        if (objectSource[index] === ',') {
            index += 1;
            continue;
        }
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
        if (objectSource[index] === ',') index += 1;
    }
    return diagrams;
}

/**
 * JSON 互換の正準形式と、既存のテンプレートリテラル形式を eval せず抽出する。
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
    } catch {
        diagrams = parseTemplateLiteralObject(objectSource);
    }
    return { diagrams, start, end: end + 1 };
}

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
