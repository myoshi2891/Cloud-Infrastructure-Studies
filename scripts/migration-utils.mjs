import fs from 'fs';
import path from 'path';

const filePath = process.argv[2];
const mode = process.argv[3] || 'check'; // 'check' or 'fix'

if (mode !== 'check' && mode !== 'fix') {
    console.error('Usage: node scripts/migration-utils.mjs <file_path> [check|fix]');
    process.exit(1);
}

if (!filePath) {
    console.error('Usage: node scripts/migration-utils.mjs <file_path> [check|fix]');
    process.exit(1);
}

const absolutePath = path.resolve(filePath);
if (!fs.existsSync(absolutePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
}

/**
 * Validate template literal boundaries and simple <div> nesting for the provided file lines.
 *
 * Performs a line-by-line heuristic check for:
 * - Unclosed template literals by tracking unescaped backticks.
 * - Unbalanced `<div>` / `</div>` counts and unusually deep nesting when a section `<div id="sN">` is encountered.
 *
 * This function logs a warning when a section start is detected while nesting is high, logs errors when validation fails,
 * and sets `process.exitCode = 1` on failure.
 *
 * @param {string[]} currentLines - The file content split into lines.
 * @returns {boolean} `true` if validation passed (no errors), `false` otherwise.
 */
function validate(currentLines) {
    let openDivs = 0;
    let inTemplateLiteral = false;
    let errors = [];

    for (let i = 0; i < currentLines.length; i++) {
        const line = currentLines[i];
        const lineNum = i + 1;

        // Check Template Literals
        // Find all backticks not preceded by a backslash
        const backticks = line.match(/(?<!\\)`/g) || [];
        for (let j = 0; j < backticks.length; j++) {
            if (!inTemplateLiteral) {
                inTemplateLiteral = true;
            } else {
                inTemplateLiteral = false;
            }
        }

        // Check Div Nesting using strict regex bounds
        const opens = (line.match(/<div\b[^>]*>/g) || []).length;
        const closes = (line.match(/<\/div\s*>/g) || []).length;
        openDivs += opens;
        openDivs -= closes;

        if (line.match(/<div id="s[0-9]+"/)) {
            if (openDivs > 3) {
                console.log(`[Warn] Line ${lineNum}: Section start detected with high nesting (${openDivs}). Possible missing </div> before.`);
            }
        }
    }

    if (inTemplateLiteral) errors.push('Error: Unclosed template literal at end of file.');
    if (openDivs !== 0) errors.push(`Error: Unbalanced divs. Final count: ${openDivs} (should be 0)`);

    if (errors.length > 0) {
        console.error('--- Validation Errors ---');
        errors.forEach(e => console.error(e));
        process.exitCode = 1;
        return false;
    }
    console.log('✅ Validation passed.');
    return true;
}

/**
 * Reduce excessive <div> nesting in the target file by inserting indented closing `</div>` tags and writing the modified content back to disk.
 *
 * When a section start (`<div id="s<digits>"`) is encountered, inserts indented `</div>` lines until the running open-`<div>` count is below a target depth (3). Before the first `</main>` occurrence, inserts indented `</div>` lines until the open-`<div>` count is 2. Writes the resulting lines to `absolutePath` and logs the modified file path.
 */
function fix() {
    let content = fs.readFileSync(absolutePath, 'utf-8');
    let lines = content.split('\n');
    let openDivs = 0;
    let newLines = [];
    
    const TARGET_DEPTH = 3; 

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        if (line.match(/<div id="s[0-9]+"/)) {
            while (openDivs >= TARGET_DEPTH) {
                newLines.push('                </div>');
                openDivs--;
            }
        }
        
        newLines.push(line);
        const opens = (line.match(/<div\b[^>]*>/g) || []).length;
        const closes = (line.match(/<\/div\s*>/g) || []).length;
        openDivs += opens;
        openDivs -= closes;
    }

    let finalLines = [];
    let adjusted = false;
    // reset openDivs and recalculate during final push
    openDivs = 0;
    for (let i = 0; i < newLines.length; i++) {
        const line = newLines[i];
        const opens = (line.match(/<div\b[^>]*>/g) || []).length;
        const closes = (line.match(/<\/div\s*>/g) || []).length;
        openDivs += opens;
        openDivs -= closes;

        if (line.includes('</main>') && !adjusted) {
            // Need to close up to 2 open divs before main closing
            while (openDivs > 2) {
                finalLines.push('                </div>');
                openDivs--;
            }
            adjusted = true;
        }
        finalLines.push(line);
    }

    fs.writeFileSync(absolutePath, finalLines.join('\n'), 'utf-8');
    console.log(`Successfully attempted fix on ${filePath}`);
}

if (mode === 'fix') {
    fix();
    // Reload content and lines after fix
    const updatedContent = fs.readFileSync(absolutePath, 'utf-8');
    const updatedLines = updatedContent.split('\n');
    if (!validate(updatedLines)) {
        process.exit(1);
    }
} else {
    const content = fs.readFileSync(absolutePath, 'utf-8');
    const lines = content.split('\n');
    if (!validate(lines)) {
        process.exit(1);
    }
}
