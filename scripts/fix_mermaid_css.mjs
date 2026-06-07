import fs from 'fs';

let html = fs.readFileSync('Ace-section1-complete-guide.html', 'utf8');

const targetStr = `svgEl.style.height = 'auto';
                                svgEl.style.overflow = 'visible';`;

const replacementStr = `svgEl.style.height = 'auto';
                                svgEl.style.maxHeight = '600px';
                                svgEl.style.overflow = 'visible';`;
                                
html = html.replace(targetStr, replacementStr);

fs.writeFileSync('Ace-section1-complete-guide.html', html, 'utf8');
console.log('Fixed Mermaid inline svg styles');
