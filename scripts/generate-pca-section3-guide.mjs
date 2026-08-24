import fs from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';

const repositoryRoot = process.cwd();
const htmlRealPath = path.resolve(repositoryRoot, 'Gcp-pca-section3-security-compliance.html');
const rawHtml = fs.readFileSync(htmlRealPath, 'utf8');

const dom = new JSDOM(rawHtml);
const doc = dom.window.document;

const mainEl = doc.querySelector('main.main');
if (!mainEl) {
    throw new Error('main.main not found in HTML');
}

// Extract checklist items
const checklistLabels = [];
doc.querySelectorAll('.checklist-list li label').forEach((lbl) => {
    checklistLabels.push(lbl.textContent.trim());
});

console.log(`Found ${checklistLabels.length} checklist items.`);

// Replace mermaid with <Diagram id="diag-N" label="..." /> placeholder
let diagIndex = 0;
doc.querySelectorAll('pre.mermaid, .mermaid').forEach((el) => {
    diagIndex++;
    const id = `diag-${diagIndex}`;
    // Find preceding heading text as label
    let prev = el.previousElementSibling;
    let label = 'Mermaid Diagram';
    while (prev) {
        if (/^H[1-6]$/i.test(prev.tagName)) {
            label = prev.textContent.trim();
            break;
        }
        prev = prev.previousElementSibling;
    }
    const placeholder = doc.createElement('div');
    placeholder.setAttribute('data-diagram-id', id);
    placeholder.setAttribute('data-diagram-label', label);
    el.replaceWith(placeholder);
});

// Ensure all tables are inside .table-scroll and have thead th[scope=col]
doc.querySelectorAll('table').forEach((table) => {
    // Check if table has thead
    let thead = table.querySelector('thead');
    if (!thead) {
        const firstTr = table.querySelector('tr');
        if (firstTr && firstTr.querySelectorAll('th').length > 0) {
            thead = doc.createElement('thead');
            thead.appendChild(firstTr);
            table.insertBefore(thead, table.firstChild);
        }
    }
    if (thead) {
        thead.querySelectorAll('th').forEach((th) => {
            if (!th.getAttribute('scope')) {
                th.setAttribute('scope', 'col');
            }
        });
    }

    if (!table.parentElement.classList.contains('table-scroll')) {
        const wrapper = doc.createElement('div');
        wrapper.className = 'table-scroll';
        table.parentElement.insertBefore(wrapper, table);
        wrapper.appendChild(table);
    }
});

// Convert checklist to React state binding
let checkIdx = 0;
doc.querySelectorAll('ul.checklist-list li').forEach((li) => {
    const input = li.querySelector('input.checklist-checkbox');
    if (input) {
        input.setAttribute('data-check-index', String(checkIdx));
        checkIdx++;
    }
});

// Add tabIndex="-1" to h2, h3, h4
doc.querySelectorAll('main.main h2, main.main h3, main.main h4').forEach((h) => {
    h.setAttribute('tabIndex', '-1');
});

// Helper to convert HTML DOM element to JSX string
function domToJsx(node) {
    if (node.nodeType === 3) { // TEXT_NODE
        return node.nodeValue
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
    if (node.nodeType === 8) { // COMMENT_NODE
        return `{/* ${node.nodeValue} */}`;
    }
    if (node.nodeType !== 1) { // Not ELEMENT_NODE
        return '';
    }

    const tagName = node.tagName.toLowerCase();

    // Check for diagram placeholder
    if (node.hasAttribute('data-diagram-id')) {
        const id = node.getAttribute('data-diagram-id');
        const label = node.getAttribute('data-diagram-label').replace(/"/g, '&quot;');
        return `<Diagram id="${id}" label="${label}" />`;
    }

    // Process attributes
    const attrs = [];
    for (let i = 0; i < node.attributes.length; i++) {
        const attr = node.attributes[i];
        let name = attr.name;
        let val = attr.value;

        if (name === 'class') {
            name = 'className';
        } else if (name === 'for') {
            name = 'htmlFor';
        } else if (name === 'tabindex') {
            name = 'tabIndex';
            attrs.push(`tabIndex={-1}`);
            continue;
        } else if (name === 'data-check-index') {
            continue;
        } else if (name === 'style') {
            // Convert inline style string to style object
            const styleObj = {};
            val.split(';').forEach((pair) => {
                const [k, v] = pair.split(':').map((s) => s.trim());
                if (k && v) {
                    const camelKey = k.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
                    styleObj[camelKey] = v;
                }
            });
            attrs.push(`style={${JSON.stringify(styleObj)}}`);
            continue;
        }

        if (tagName === 'input' && node.hasAttribute('data-check-index')) {
            const idx = node.getAttribute('data-check-index');
            attrs.push(`type="checkbox"`);
            attrs.push(`className="checklist-checkbox"`);
            attrs.push(`checked={Boolean(checkedItems[${idx}])}`);
            attrs.push(`onChange={() => toggleCheck(${idx})}`);
            attrs.push(`aria-label="チェック項目 ${Number(idx) + 1}"`);
            break;
        }

        attrs.push(`${name}="${val.replace(/"/g, '&quot;')}"`);
    }

    const attrStr = attrs.length > 0 ? ' ' + attrs.join(' ') : '';

    // Self closing tags
    if (['img', 'br', 'hr', 'input'].includes(tagName)) {
        return `<${tagName}${attrStr} />`;
    }

    // Process children
    let childrenJsx = '';
    for (let child = node.firstChild; child; child = child.nextSibling) {
        childrenJsx += domToJsx(child);
    }

    // Special handling for checklist counter
    if (node.classList && node.classList.contains('checklist-counter')) {
        childrenJsx = `{checkedCount} / {CHECKLIST_ITEMS.length} 完了`;
    }

    return `<${tagName}${attrStr}>${childrenJsx}</${tagName}>`;
}

// Generate inner JSX for main
let mainInnerJsx = '';
for (let child = mainEl.firstChild; child; child = child.nextSibling) {
    mainInnerJsx += domToJsx(child);
}

const checklistItemsCode = JSON.stringify(checklistLabels, null, 4);

const guideComponentCode = `'use client';

import { useState, useCallback, memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { NavBar } from './NavBar';
import { DIAGRAMS, type DiagramId } from './constants';

const Diagram = memo(function Diagram({ id, label }: { id: DiagramId; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap">
            <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale={true} />
        </div>
    );
});

const CHECKLIST_ITEMS = ${checklistItemsCode};

/**
 * Google Cloud Professional Cloud Architect (PCA) Section 3 完全対策ガイドコンポーネント (Client Component)
 */
export function PcaSection3Guide() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

    const handleToggleNav = useCallback(() => {
        setIsNavOpen((prev) => !prev);
    }, []);

    const handleCloseNav = useCallback(() => {
        setIsNavOpen(false);
    }, []);

    const toggleCheck = (index: number) => {
        setCheckedItems((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const checkedCount = Object.values(checkedItems).filter(Boolean).length;

    return (
        <div className="pca-s3-page">
            <div className="layout">
                <NavBar isOpen={isNavOpen} onToggle={handleToggleNav} onClose={handleCloseNav} />

                <main className="main">
                    ${mainInnerJsx}
                </main>
            </div>
        </div>
    );
}
`;

const outPath = path.resolve(repositoryRoot, 'app/gcl/professional-cloud-architect/section3-security-compliance/PcaSection3Guide.tsx');
fs.writeFileSync(outPath, guideComponentCode);
console.log('Successfully generated PcaSection3Guide.tsx');
