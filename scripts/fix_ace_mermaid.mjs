import fs from 'fs';

let content = fs.readFileSync('Ace-section1-complete-guide.html', 'utf8');

let diagramIndex = 0;
let diagramsMap = {}; 

content = content.replace(/<div class="mermaid">([\s\S]*?)<\/div>/g, (match, inner) => {
    let s = inner.replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim();
    
    let strings = [];
    s = s.replace(/"(.*?)"/g, (m, p1) => {
        strings.push(m);
        return `__STR${strings.length - 1}__`;
    });
    
    // Pad arrows so they split nicely
    s = s.replace(/((?:-->|-.->|==>)(?:\|__STR\d+__\|)?)/g, ' $1 ');
    s = s.replace(/\s+/g, ' ').trim();
    
    let parts = s.split(' ');
    let statements = [];
    let currentStatement = [];
    
    let isArrow = (p) => p.startsWith("-->") || p.startsWith("-.->") || p.startsWith("==>");
    
    for (let i = 0; i < parts.length; i++) {
        let p = parts[i];
        if (p === "graph" || p === "flowchart") {
            if (currentStatement.length > 0) statements.push(currentStatement.join(' '));
            currentStatement = [p, parts[++i]];
            statements.push(currentStatement.join(' '));
            currentStatement = [];
        } else if (p === "style" || p === "classDef") {
            if (currentStatement.length > 0) statements.push(currentStatement.join(' '));
            // take the next two tokens
            currentStatement = [p];
            if (i+1 < parts.length) currentStatement.push(parts[++i]);
            if (i+1 < parts.length) currentStatement.push(parts[++i]);
            statements.push(currentStatement.join(' '));
            currentStatement = [];
        } else if (p.match(/^[\w-]+(\[__STR\d+__\]|\{__STR\d+__\}|\(__STR\d+__\))$/)) {
            if (currentStatement.length > 0) statements.push(currentStatement.join(' '));
            if (i + 1 < parts.length && isArrow(parts[i+1])) {
                currentStatement.push(p);
            } else {
                statements.push(p);
            }
        } else if (isArrow(p)) {
            currentStatement.push(p);
        } else {
            currentStatement.push(p);
            if (i + 1 >= parts.length || !isArrow(parts[i+1])) {
                statements.push(currentStatement.join(' '));
                currentStatement = [];
            }
        }
    }
    if (currentStatement.length > 0) {
        statements.push(currentStatement.join(' '));
    }
    
    let res = statements.join('\n');
    for (let i = 0; i < strings.length; i++) {
        res = res.replace(`__STR${i}__`, strings[i]);
    }
    
    let id = `diag-${diagramIndex++}`;
    diagramsMap[id] = res;
    
    return `<div id="${id}"></div>`;
});

// Now inject the script at the end before </body>
let scriptContent = `
        <script>
            const DIAGRAMS = ${JSON.stringify(diagramsMap, null, 2)};
            mermaid.initialize({ startOnLoad: false });
            (async () => {
                for (const [id, src] of Object.entries(DIAGRAMS)) {
                    try {
                        const { svg } = await mermaid.render('svg-' + id, src);
                        const el = document.getElementById(id);
                        if (el) {
                            el.innerHTML = svg;
                            const svgEl = el.querySelector('svg');
                            if (svgEl) {
                                svgEl.removeAttribute('width');
                                svgEl.removeAttribute('height');
                                svgEl.style.width = 'auto';
                                svgEl.style.maxWidth = '100%';
                                svgEl.style.height = 'auto';
                            }
                        }
                    } catch (e) {
                        console.error('Mermaid render error for ' + id, e);
                    }
                }
            })();
        </script>
`;

content = content.replace('</body>', scriptContent + '    </body>');

fs.writeFileSync('Ace-section1-complete-guide.html', content, 'utf8');
console.log('Fixed ' + diagramIndex + ' diagrams!');
