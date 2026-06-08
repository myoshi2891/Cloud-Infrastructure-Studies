import fs from 'fs';

let html = fs.readFileSync('Ace-section1-complete-guide.html', 'utf8');

const targetStr = `svgEl.style.height = 'auto';
                                svgEl.style.overflow = 'visible';`;

const replacementStr = `svgEl.style.height = 'auto';
                                svgEl.style.maxHeight = '600px';
                                svgEl.style.overflow = 'visible';`;
                                
// 再実行時の二重適用を防ぐ（maxHeight 行が既にあれば適用済み）
if (html.includes("svgEl.style.maxHeight = '600px'")) {
    console.log('Mermaid inline svg styles already applied; skipping');
    process.exit(0);
}

const next = html.replace(targetStr, replacementStr);
if (next === html) {
    console.error('Could not find target svg style block in HTML');
    process.exit(1);
}

fs.writeFileSync('Ace-section1-complete-guide.html', next, 'utf8');
console.log('Fixed Mermaid inline svg styles');
