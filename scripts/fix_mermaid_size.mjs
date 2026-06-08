import fs from 'fs';

let html = fs.readFileSync('Ace-section1-complete-guide.html', 'utf8');

// Replace the mermaid-wrap CSS class definition to include max-width
const cssToReplace = `.mermaid-wrap {
                background: var(--bg-card);
                border: 1px solid var(--border);
                border-radius: 12px;
                padding: 24px;
                margin: 16px 0 24px;`;

const newCss = `.mermaid-wrap {
                background: var(--bg-card);
                border: 1px solid var(--border);
                border-radius: 12px;
                padding: 24px;
                margin: 16px 0 24px;
                display: flex;
                justify-content: center;
                overflow-x: auto;
            }
            .mermaid-wrap > div {
                width: 100%;
                max-width: 800px;
                display: flex;
                justify-content: center;`;

// 再実行時の宣言重複を防ぐ（.mermaid-wrap > div が既にあれば適用済み）
if (html.includes('.mermaid-wrap > div')) {
    console.log('mermaid-wrap CSS already applied; skipping');
    process.exit(0);
}

const next = html.replace(cssToReplace, newCss);
if (next === html) {
    console.error('Could not find .mermaid-wrap block in HTML');
    process.exit(1);
}

fs.writeFileSync('Ace-section1-complete-guide.html', next, 'utf8');
console.log('Fixed mermaid-wrap CSS for size constraints!');
