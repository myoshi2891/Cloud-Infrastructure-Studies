import fs from 'fs';

let html = fs.readFileSync('Ace-section1-complete-guide.html', 'utf8');

const renderScript = `mermaid.initialize({
                startOnLoad: false,
                theme: 'dark',
                securityLevel: 'loose',
                themeVariables: {
                    primaryColor: '#1a2035',
                    primaryTextColor: '#e8eaf6',
                    primaryBorderColor: '#4285F4',
                    lineColor: '#4285F4',
                    secondaryColor: '#141929',
                    tertiaryColor: '#0f1525',
                    background: '#0a0e1a',
                    mainBkg: '#141929',
                    nodeBorder: '#4285F4',
                    clusterBkg: '#0f1525',
                    titleColor: '#e8eaf6',
                    edgeLabelBackground: '#141929',
                    attributeBackgroundColorEven: '#141929',
                    attributeBackgroundColorOdd: '#0f1525',
                },
                flowchart: { htmlLabels: true, curve: 'basis' },
                mindmap: { padding: 20 },
            });
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
                                svgEl.style.overflow = 'visible';

                                const viewBoxStr = svgEl.getAttribute('viewBox');
                                if (viewBoxStr) {
                                    const parts = viewBoxStr.split(' ').map(Number);
                                    if (parts.length === 4 && parts.every((n) => Number.isFinite(n))) {
                                        const trimmed = src.trim();
                                        const isSequenceOrState = trimmed.startsWith('sequenceDiagram') || trimmed.startsWith('stateDiagram');
                                        const extraHeight = isSequenceOrState ? 110 : 15;
                                        svgEl.setAttribute('viewBox', \`\${parts[0]} \${parts[1]} \${parts[2]} \${parts[3] + extraHeight}\`);
                                    }
                                }
                            }
                        }
                    } catch (e) {
                        console.error('Mermaid render error for ' + id, e);
                    }
                }
            })();`;

const parts = html.split('mermaid.initialize({ startOnLoad: false });');
if (parts.length === 2) {
    const endScriptIndex = parts[1].lastIndexOf('</script>');
    if (endScriptIndex === -1) {
        console.error('Could not find closing </script> after mermaid init block');
        process.exit(1);
    }
    html = parts[0] + renderScript + '\n        ' + parts[1].substring(endScriptIndex);
    fs.writeFileSync('Ace-section1-complete-guide.html', html, 'utf8');
    console.log('Fixed mermaid config and rendering logic!');
} else {
    console.error('Could not find mermaid.initialize({ startOnLoad: false }); in HTML');
    process.exit(1);
}
