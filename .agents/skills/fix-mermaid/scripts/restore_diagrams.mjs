/**
 * restore_diagrams.mjs — 壊れた HTML 内の `DIAGRAMS` を、正本となる Markdown の
 * ```mermaid ブロックからキーワード一致で復元する。
 *
 * フォーマッタ等で HTML 側の図ソースが破壊された場合に、対応する .md(正本)から
 * 各図の正しいソースを引き当てて差し替える。
 *
 * 使い方:
 *   bun run .claude/skills/fix-mermaid/scripts/restore_diagrams.mjs <file.html> <source.md>
 */
import fs from 'fs';

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

    const diagramsMatch = html.match(/const DIAGRAMS = (\{[\s\S]*?\});/);
    if (!diagramsMatch) {
        console.error(`❌ Could not find "const DIAGRAMS = {...};" in ${htmlPath}`);
        process.exit(1);
    }

    let diagrams;
    try {
        diagrams = JSON.parse(diagramsMatch[1]);
    } catch {
        console.error('❌ DIAGRAMS が JSON.parse できません。JSON 形式の DIAGRAMS のみ対応します。');
        process.exit(1);
    }

    const { diagrams: restored, warnings } = restoreDiagrams(diagrams, mdBlocks);
    warnings.forEach((w) => console.warn('  ⚠️ ' + w));

    html = html.replace(diagramsMatch[1], JSON.stringify(restored, null, 2));
    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log(`\n✅ Restored ${Object.keys(restored).length} diagrams into ${htmlPath}`);
}
