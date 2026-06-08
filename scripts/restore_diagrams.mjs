import fs from 'fs';

let html = fs.readFileSync('Ace-section1-complete-guide.html', 'utf8');
let md = fs.readFileSync('Ace-section1-complete-guide.md', 'utf8');

// 1. Extract all mermaid blocks from MD
let mdBlocks = [];
// CRLF / マーカー直後の余分な空白を許容する寛容な正規表現
md.replace(/```mermaid[ \t]*\r?\n([\s\S]*?)\r?\n```/g, (match, inner) => {
    mdBlocks.push(inner.trim());
    return match;
});

if (mdBlocks.length === 0) {
    console.error('No mermaid blocks found in MD');
    process.exit(1);
}

// 2. Extract the DIAGRAMS JSON from HTML
let diagramsMatch = html.match(/const DIAGRAMS = (\{[\s\S]*?\});/);
if (!diagramsMatch) {
    console.error("Could not find DIAGRAMS in HTML");
    process.exit(1);
}

let diagrams = JSON.parse(diagramsMatch[1]);

// 3. For each diagram in HTML, find the best matching block in MD
let newDiagrams = {};
for (let [id, brokenCode] of Object.entries(diagrams)) {
    // extract some keywords (e.g. text inside quotes) to find the matching MD block
    let keywords = [];
    brokenCode.replace(/"(.*?)"/g, (m, p1) => {
        if (p1.length > 3) keywords.push(p1);
    });
    if (keywords.length === 0) {
        // fallback to just alpha words
        brokenCode.replace(/[a-zA-Z]{5,}/g, (m) => keywords.push(m));
    }
    
    let bestMatch = null;
    let maxScore = -1;
    
    for (let block of mdBlocks) {
        let score = 0;
        for (let kw of keywords) {
            // simplify whitespace for matching
            let normalizedKw = kw.replace(/\s+/g, '');
            let normalizedBlock = block.replace(/\s+/g, '');
            if (normalizedBlock.includes(normalizedKw)) {
                score++;
            }
        }
        if (score > maxScore) {
            maxScore = score;
            bestMatch = block;
        }
    }
    
    if (bestMatch && maxScore > 0) {
        newDiagrams[id] = bestMatch;
    } else {
        console.warn("Could not find match for", id, keywords);
        newDiagrams[id] = brokenCode; // fallback
    }
}

// 4. Replace in HTML
html = html.replace(diagramsMatch[1], JSON.stringify(newDiagrams, null, 2));
fs.writeFileSync('Ace-section1-complete-guide.html', html, 'utf8');

console.log("Successfully restored diagrams from MD!");
