import * as fs from 'fs';
import * as path from 'path';

const newStmtRe = /^(?:\w+\s*-[->.>]|Note\b|participant\b|actor\b|alt\b|else\b|opt\b|loop\b|rect\b|par\b|end\b|%%|activate\b|deactivate\b|subgraph\b|style\b|classDef\b|linkStyle\b)/i;
const seqFragRe = /^(?:Note\s+(?:over|left\s+of|right\s+of)\b|participant\b|actor\b|alt\b|loop\b|rect\b)/i;

/**
 * Determine the diagram type from a block of Mermaid content.
 *
 * Scans the content for the first non-empty line that does not start with `%%` and returns its first whitespace-delimited token.
 *
 * @param inner - Mermaid diagram content
 * @returns The diagram type token (e.g., `graph`, `sequenceDiagram`, `mindmap`), or `"unknown"` if no suitable line is found
 */
function getDiagramType(inner: string): string {
  const rawLines = inner.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
  const diagramTypeLine = rawLines.find(line => line.trim() && !line.trim().startsWith('%%')) || '';
  return diagramTypeLine.trim().split(/\s+/)[0] || 'unknown';
}

/**
 * Fixes indentation and broken statement lines inside a Mermaid diagram block.
 *
 * Normalizes newlines, repairs mindmap indentation or merges incorrectly broken lines
 * for other diagram types, and returns the corrected content along with a count
 * of modified lines.
 *
 * @param inner - The raw content of a Mermaid diagram block
 * @param report - Optional array that will be appended with a summary line when changes are made.
 *                 Each appended entry has the form `[<diagramType>]: <N> line(s) modified`.
 * @returns An object containing `fixedContent` (the corrected diagram text) and `fixedCount` (the number of lines modified)
 */
export function fixMermaidContent(inner: string, report?: string[]): { fixedContent: string; fixedCount: number } {
  const rawLines = inner.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');

  // 最初の非空・非ディレクティブ行でダイアグラム種別を判定
  const diagramTypeLine = rawLines.find(line => line.trim() && !line.trim().startsWith('%%')) || '';
  const diagramType = diagramTypeLine.trim();
  const isMindmap = diagramType.toLowerCase().startsWith('mindmap');

  const fixed: string[] = [];
  let fixedCount = 0;

  let i = 0;
  while (i < rawLines.length) {
    const ln = rawLines[i];
    const stripped = ln.trimStart();
    const leading = ln.length - stripped.length;

    if (isMindmap) {
      let commonIndent = Infinity;
      for (let j = i; j < rawLines.length; j++) {
        const line = rawLines[j];
        if (line.trim()) {
          const indent = line.length - line.trimStart().length;
          if (indent < commonIndent) {
            commonIndent = indent;
          }
        }
      }
      if (commonIndent === Infinity) {
        commonIndent = 0;
      }

      let localFixedCount = 0;
      for (let j = i; j < rawLines.length; j++) {
        const line = rawLines[j];
        const sliced = line.slice(commonIndent);
        if (sliced !== line) {
          localFixedCount++;
        }
        fixed.push(sliced);
      }
      if (localFixedCount > 0) {
        fixedCount += localFixedCount;
        if (report) {
          const diagramType = getDiagramType(inner);
          report.push(`[${diagramType}]: ${localFixedCount} line(s) modified`);
        }
      }
      i = rawLines.length;
      break;
    }

    if (leading > 0 && stripped) {
      const prev = fixed.length > 0 ? fixed[fixed.length - 1].trimEnd() : '';
      const fragMatch = seqFragRe.test(prev);
      const isIncompleteFrag = fragMatch && !/:\s*\S/.test(prev);
      const isCont = (prev.endsWith(':') || isIncompleteFrag) && !newStmtRe.test(stripped);

      let changed = false;
      if (isCont && fixed.length > 0) {
        fixed[fixed.length - 1] = prev + ' ' + stripped;
        changed = true;
      } else {
        fixed.push(stripped);
        changed = true;
      }
      if (changed) {
        fixedCount++;
      }
    } else {
      fixed.push(ln);
    }
    i++;
  }

  if (fixedCount > 0 && report && !isMindmap) {
    const diagramType = getDiagramType(inner);
    report.push(`[${diagramType}]: ${fixedCount} line(s) modified`);
  }

  return {
    fixedContent: fixed.join('\n'),
    fixedCount,
  };
}

/**
 * Fixes Mermaid diagram blocks found inside an HTML string.
 *
 * Searches for <div> elements whose class attribute contains "mermaid", repairs
 * the inner Mermaid content, and returns the updated HTML along with a report
 * of modifications performed.
 *
 * @param html - The HTML document text to scan and fix
 * @returns An object with `fixed` containing the HTML with corrected Mermaid blocks, and `report` containing per-diagram modification messages
 */
export function fixHtmlMermaid(html: string): { fixed: string; report: string[] } {
  const report: string[] = [];
  const pattern = /(<div\b[^>]*\bclass\s*=\s*(?:"[^"]*\bmermaid\b[^"]*"|'[^']*\bmermaid\b[^']*'|[^\s>]*\bmermaid\b[^\s>]*)[^>]*>)([\s\S]*?)(<\/div>)/gi;

  const fixed = html.replace(pattern, (match, openTag, inner, closeTag) => {
    const { fixedContent } = fixMermaidContent(inner, report);
    return openTag + fixedContent + closeTag;
  });

  return { fixed, report };
}

/**
 * Fixes Mermaid code blocks inside a Markdown string.
 *
 * @param markdown - The Markdown source to scan for fenced ```mermaid blocks.
 * @returns An object with `fixed` containing the Markdown where each Mermaid block has been corrected, and `report` listing short messages for each diagram that was modified.
 */
export function fixMarkdownMermaid(markdown: string): { fixed: string; report: string[] } {
  const report: string[] = [];
  const pattern = /(```mermaid\r?\n)([\s\S]*?)(\r?\n```)/gi;

  const fixed = markdown.replace(pattern, (match, openTag, inner, closeTag) => {
    const { fixedContent } = fixMermaidContent(inner, report);
    return openTag + fixedContent + closeTag;
  });

  return { fixed, report };
}

/**
 * Fixes Mermaid diagram code contained in template literals within TS/TSX source text.
 *
 * Scans the provided file content for backtick-delimited template literals whose inner text begins with
 * `graph <word>`, `flowchart <word>`, `sequenceDiagram`, or `mindmap`, repairs malformed Mermaid blocks,
 * and returns the updated source and a list of modification summaries.
 *
 * @param content - The TS/TSX source text to scan and fix
 * @returns An object with `fixed` containing the updated source text and `report` containing per-diagram
 * modification messages (e.g. "[sequenceDiagram]: 3 line(s) modified")
 */
export function fixTsxMermaid(content: string): { fixed: string; report: string[] } {
  const report: string[] = [];
  // バッククォート ` で囲まれたテンプレートリテラルで、
  // 内部が graph/flowchart/sequenceDiagram/mindmap で始まるものを検出
  const pattern = /`(\s*(?:graph\s+\w+|flowchart\s+\w+|sequenceDiagram|mindmap\b)[\s\S]*?)`/gi;

  const fixed = content.replace(pattern, (match, inner) => {
    const { fixedContent } = fixMermaidContent(inner, report);
    return '`' + fixedContent + '`';
  });

  return { fixed, report };
}

// Bun/Node 環境での直接実行エントリポイント
if (typeof require !== 'undefined' && require.main === module) {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.log("Usage: bun run fix_mermaid.ts <file-path>");
    process.exit(1);
  }

  const filePath = args[0];
  try {
    const absolutePath = path.resolve(filePath);
    if (!fs.existsSync(absolutePath)) {
      console.error(`❌ File not found: ${filePath}`);
      process.exit(1);
    }

    const content = fs.readFileSync(absolutePath, 'utf8');
    const ext = path.extname(absolutePath).toLowerCase();

    let result: { fixed: string; report: string[] };

    if (ext === '.html' || ext === '.htm') {
      result = fixHtmlMermaid(content);
    } else if (ext === '.md' || ext === '.markdown') {
      result = fixMarkdownMermaid(content);
    } else if (['.tsx', '.ts', '.jsx', '.js', '.mjs', '.cjs'].includes(ext)) {
      result = fixTsxMermaid(content);
    } else {
      console.error(`❌ Unsupported file type: ${ext}`);
      process.exit(1);
    }

    if (result.report.length > 0) {
      result.report.forEach(line => console.log(line));
      fs.writeFileSync(absolutePath, result.fixed, 'utf8');
      console.log(`\n✅ Fixed and saved: ${filePath}`);
    } else {
      console.log("✅ No Mermaid formatting issues found.");
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error);
    process.exit(1);
  }
}
