import { readFile, writeFile } from 'fs/promises';

async function fixMarkdown(filePath) {
    const content = await readFile(filePath, 'utf8');
    const lines = content.split('\n');
    const fixedLines = [];
    let inCodeBlock = false;
    let lastLineWasBlockquote = false;

    // First pass: line-by-line fixes
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        const trimmed = line.trim();

        // 1. Fix code blocks (MD040)
        if (line.startsWith('```')) {
            if (!inCodeBlock) {
                if (line.trim() === '```') {
                    line = '```text';
                }
                inCodeBlock = true;
            } else {
                inCodeBlock = false;
            }
            fixedLines.push(line);
            lastLineWasBlockquote = false;
            continue;
        }

        if (inCodeBlock) {
            fixedLines.push(line);
            lastLineWasBlockquote = false;
            continue;
        }

        // MD009: Remove trailing spaces strictly (except 2 spaces for hard break, but safer to trim all outside codeblocks for now as Prettier handles standard formatting)
        line = line.replace(/[ \t]+$/, '');

        // 2. Fix blank lines around headings (MD022)
        if (trimmed.startsWith('#')) {
            if (fixedLines.length > 0 && fixedLines[fixedLines.length - 1].trim() !== '') {
                fixedLines.push('');
            }
        }

        // 3. Fix blockquote blank lines (MD028)
        if (trimmed === '' && lastLineWasBlockquote) {
            let nextBlockquote = false;
            for (let j = i + 1; j < lines.length; j++) {
                if (lines[j].trim() === '') continue;
                if (lines[j].trim().startsWith('>')) nextBlockquote = true;
                break;
            }
            if (nextBlockquote) {
                line = '>';
            }
        }

        // 4. Fix table pipe spacing (MD060)
        if (line.includes('|')) {
            const parts = line.split('|');
            if (parts.length > 2) {
                const isSeparator = parts.slice(1, -1).every(p => p.trim().match(/^-+$/));
                if (isSeparator) {
                    line = '| ' + parts.slice(1, -1).map(() => '---').join(' | ') + ' |';
                } else {
                    line = '| ' + parts.slice(1, -1).map(p => {
                        let t = p.trim();
                        return t === '' ? '' : t;
                    }).join(' | ') + ' |';
                }
            }
        }

        // MD007: Fix unordered list indentation to be exactly multiples of 2 spaces
        const ulMatch = line.match(/^(\s*)([-*+])\s+(.*)$/);
        if (ulMatch && !line.includes('|')) {
            const indentStr = ulMatch[1];
            if (indentStr.length > 0 && indentStr.length % 2 !== 0) {
                const newIndent = Math.round(indentStr.length / 2) * 2;
                line = ' '.repeat(newIndent) + ulMatch[2] + ' ' + ulMatch[3];
            }
        }

        fixedLines.push(line);
        lastLineWasBlockquote = trimmed.startsWith('>');
    }

    // Second pass: block level fixes (lists, multiple blank lines)
    const collapsedLines = [];
    let inList = false;

    for (let i = 0; i < fixedLines.length; i++) {
        const line = fixedLines[i];
        const trimmed = line.trim();
        
        // MD032: Ensure blank lines around lists
        const isListItem = /^\s*([-*+]|\d+\.)\s+/.test(line);
        
        if (isListItem && !inList) {
            inList = true;
            // Ensure blank line before list starts
            if (collapsedLines.length > 0 && collapsedLines[collapsedLines.length - 1].trim() !== '') {
                collapsedLines.push('');
            }
        } else if (!isListItem && trimmed !== '' && inList) {
            inList = false;
            // Ensure blank line after list ends
            if (collapsedLines.length > 0 && collapsedLines[collapsedLines.length - 1].trim() !== '') {
                collapsedLines.push('');
            }
        } else if (trimmed === '') {
            inList = false;
        }

        // MD012: Collapse multiple blank lines
        if (i > 0 && trimmed === '' && collapsedLines.length > 0 && collapsedLines[collapsedLines.length - 1].trim() === '') {
            continue;
        }

        collapsedLines.push(line);
    }

    await writeFile(filePath, collapsedLines.join('\n'), 'utf8');
}

fixMarkdown(process.argv[2]);
