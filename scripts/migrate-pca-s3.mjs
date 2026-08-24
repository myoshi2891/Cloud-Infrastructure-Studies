import fs from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';

const repositoryRoot = process.cwd();
const htmlRealPath = path.resolve(repositoryRoot, 'Gcp-pca-section3-security-compliance.html');
const rawHtml = fs.readFileSync(htmlRealPath, 'utf8');

const dom = new JSDOM(rawHtml);
const doc = dom.window.document;

const outDir = path.resolve(repositoryRoot, 'app/gcl/professional-cloud-architect/section3-security-compliance');
fs.mkdirSync(outDir, { recursive: true });

// 1. Mermaid extraction
const diagrams = {};
let diagCount = 0;
const mermaidElements = doc.querySelectorAll('pre.mermaid, .mermaid');
mermaidElements.forEach((el) => {
    diagCount++;
    const id = `diag-${diagCount}`;
    let raw = el.textContent.trim();
    // Clean up mermaid syntax per fix-mermaid skill
    raw = raw
        .replace(/（/g, '(')
        .replace(/）/g, ')')
        .replace(/〜/g, 'から')
        .replace(/―/g, '-')
        .replace(/：/g, ':');
    diagrams[id] = raw;
});

console.log(`Extracted ${diagCount} diagrams.`);

// 2. Nav items extraction
const navItems = [];
const navLinks = doc.querySelectorAll('nav.sidebar-nav a.nav-link');
navLinks.forEach((a) => {
    const href = a.getAttribute('href') || '';
    const id = href.replace(/^#/, '');
    const label = (a.textContent || '').trim().replace(/\s+/g, ' ');
    const isH2 = a.classList.contains('nav-link-h2');
    const isH3 = a.classList.contains('nav-link-h3');
    const level = isH2 ? 2 : isH3 ? 3 : 4;
    navItems.push({ id, label, level });
});

console.log(`Extracted ${navItems.length} nav items.`);

// 3. Generate constants.ts
const diagramEntries = Object.entries(diagrams).map(([k, v]) => {
    return `    '${k}': \`${v}\`,`;
}).join('\n\n');

const diagramIds = Object.keys(diagrams).map(k => `    | '${k}'`).join('\n');
const navItemsCode = JSON.stringify(navItems, null, 4);

const constantsContent = `/**
 * Google Cloud Professional Cloud Architect (PCA) Section 3 定数定義
 */

export interface NavItem {
    id: string;
    label: string;
    level: 2 | 3 | 4;
}

export const NAV_ITEMS: NavItem[] = ${navItemsCode};

export type DiagramId =
${diagramIds};

export const DIAGRAMS: Record<DiagramId, string> = {
${diagramEntries}
};
`;

fs.writeFileSync(path.join(outDir, 'constants.ts'), constantsContent);
console.log('Written constants.ts');

// 4. Generate NavBar.tsx
const navBarContent = `'use client';

import { useEffect, useState } from 'react';
import { NAV_ITEMS } from './constants';

interface NavBarProps {
    isOpen: boolean;
    onToggle: () => void;
    onClose: () => void;
}

/**
 * PCA Section 3 サイドバーナビゲーションコンポーネント
 */
export function NavBar({ isOpen, onToggle, onClose }: NavBarProps) {
    const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0]?.id || '');

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-15% 0px -75% 0px',
                threshold: 0,
            }
        );

        NAV_ITEMS.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const handleLinkClick = (id: string) => {
        onClose();
        const el = document.getElementById(id);
        if (el) {
            el.focus();
        }
    };

    return (
        <>
            <button
                type="button"
                className="sidebar-toggle"
                onClick={onToggle}
                aria-label="メニューを開閉"
                aria-expanded={isOpen}
                aria-controls="sidebarNav"
            >
                ☰
            </button>
            <div
                className={\`sidebar-backdrop \${isOpen ? 'show' : ''}\`}
                onClick={onClose}
                aria-hidden="true"
            />
            <aside className={\`sidebar \${isOpen ? 'open' : ''}\`} id="sidebar">
                <div className="sidebar-brand">
                    <div className="brand-kicker">GCP PCA EXAM GUIDE</div>
                    <div className="brand-title">
                        Section 3<br />セキュリティとコンプライアンスの設計
                    </div>
                </div>
                <nav className="sidebar-nav" id="sidebarNav" aria-label="セクション目次">
                    <ul className="nav-list">
                        {NAV_ITEMS.map((item) => {
                            const isH2 = item.level === 2;
                            const isH3 = item.level === 3;
                            const isH4 = item.level === 4;
                            const className = isH2
                                ? 'nav-link nav-link-h2'
                                : isH3
                                ? 'nav-link nav-link-h3'
                                : 'nav-link nav-link-h4';

                            return (
                                <li
                                    key={item.id}
                                    className={\`nav-item \${isH2 ? 'nav-item-h2' : isH3 ? 'nav-item-h3' : 'nav-item-h4'}\`}
                                >
                                    <a
                                        href={\`#\${item.id}\`}
                                        className={\`\${className} \${activeId === item.id ? 'active' : ''}\`}
                                        onClick={() => handleLinkClick(item.id)}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </aside>
        </>
    );
}
`;

fs.writeFileSync(path.join(outDir, 'NavBar.tsx'), navBarContent);
console.log('Written NavBar.tsx');

// 5. Generate page.tsx
const pageContent = `import type { Metadata } from 'next';
import './page.css';
import { PcaSection3Guide } from './PcaSection3Guide';

export const metadata: Metadata = {
    title: 'Google Cloud PCA試験対策ガイド | Section 3: セキュリティとコンプライアンスの設計',
    description:
        'Google Cloud Professional Cloud Architect（PCA）認定試験 Section 3「セキュリティとコンプライアンスの設計（配点 約17.5%）」完全対策ガイド。IAM、リソース階層、データ暗号化（Cloud KMS/CMEK）、職務分掌、セキュリティ制御（VPC SC/IAP/Org Policy）、ソフトウェアサプライチェーン、AIセキュリティ、法令規制・コンプライアンスまで網羅。',
};

/**
 * PCA Section 3「セキュリティとコンプライアンスの設計」ガイドページのエントリポイント (Server Component)
 */
export default function Page() {
    return <PcaSection3Guide />;
}
`;

fs.writeFileSync(path.join(outDir, 'page.tsx'), pageContent);
console.log('Written page.tsx');
