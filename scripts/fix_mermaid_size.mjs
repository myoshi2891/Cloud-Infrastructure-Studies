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

html = html.replace(cssToReplace, newCss);
fs.writeFileSync('Ace-section1-complete-guide.html', html, 'utf8');
console.log('Fixed mermaid-wrap CSS for size constraints!');
