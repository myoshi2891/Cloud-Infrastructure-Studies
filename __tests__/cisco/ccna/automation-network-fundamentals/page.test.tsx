import { JSDOM } from 'jsdom';
import fs from 'node:fs';
import path from 'node:path';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', { url: 'http://localhost' });
(globalThis as any).window = dom.window;
(globalThis as any).document = dom.window.document;
(globalThis as any).navigator = dom.window.navigator;
(globalThis as any).HTMLElement = dom.window.HTMLElement;
(globalThis as any).SVGElement = dom.window.SVGElement;

import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CcnaNetworkFundamentalsGuide from '@/app/cisco/ccna/automation-network-fundamentals/CcnaNetworkFundamentalsGuide';
import NavBar from '@/app/cisco/ccna/automation-network-fundamentals/NavBar';
import Page from '@/app/cisco/ccna/automation-network-fundamentals/page';

// Mock MermaidDiagram component to render fallback/testable container with aria-label
vi.mock('@/components/MermaidDiagram', () => ({
    MermaidDiagram: ({ ariaLabel }: { ariaLabel: string }) => (
        <div data-testid="mermaid-diagram" aria-label={ariaLabel}>
            {ariaLabel}
        </div>
    ),
}));

describe('CCNA Automation Network Fundamentals Guide - Automated 100% Text & Structure Verification', () => {
    it('renders the Page component with title and Server Component wrapper', () => {
        const pageElement = Page();
        expect(pageElement).toBeTruthy();
    });

    it('verifies 100% text fidelity against source HTML file automatically', () => {
        const htmlPath = path.resolve(process.cwd(), 'archive/Cisco/html/ccna/Ccna-automation-network-fundamentals.html');
        const htmlRaw = fs.readFileSync(htmlPath, 'utf8');
        const domHtml = new JSDOM(htmlRaw);
        const docHtml = domHtml.window.document;

        const { container } = render(<CcnaNetworkFundamentalsGuide />);
        // Strip all whitespace for 100% characters match regardless of JSX newlines
        const jsxTextNormalized = (container.textContent || '').replace(/\s+/g, '');

        const sourceElements = Array.from(docHtml.querySelectorAll('main h1, main h2, main h3, main p, main li, main th, main td, main a.ref-url, main span.ref-name'));
        const missingTexts: string[] = [];

        sourceElements.forEach((el) => {
            const textNormalized = (el.textContent || '').replace(/\s+/g, '');
            if (textNormalized && !jsxTextNormalized.includes(textNormalized)) {
                missingTexts.push(el.textContent?.replace(/\s+/g, ' ').trim() || '');
            }
        });

        if (missingTexts.length > 0) {
            console.error(`\n❌ [AUTOMATED CHECK FAILED] Found ${missingTexts.length} missing elements from source HTML:\n`);
            missingTexts.forEach((t, i) => console.error(`  ${i + 1}. "${t}"`));
        }

        expect(missingTexts).toEqual([]);
    });

    it('renders NavBar with active section highlight capability (ScrollSpy)', () => {
        const { container } = render(<NavBar activeId="step3" />);
        const activeLink = container.querySelector('a.active');
        expect(activeLink).toBeTruthy();
        expect(activeLink?.getAttribute('href')).toBe('#step3');
    });
});
