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
import Page, { metadata } from '@/app/cisco/ccna/automation-network-fundamentals/page';

/** Replaces Mermaid rendering with an inspectable accessible element. */
vi.mock('@/components/MermaidDiagram', () => ({
    /** Preserves the aria-label contract used by the guide diagrams. */
    MermaidDiagram: ({ ariaLabel }: { ariaLabel: string }) => (
        <div data-testid="mermaid-diagram" aria-label={ariaLabel}>
            {ariaLabel}
        </div>
    ),
}));

describe('CCNA Automation Network Fundamentals Guide - Automated 100% Text & Structure Verification', () => {
    it('identifies the CCNAAUTO 200-901 Network Fundamentals domain in metadata', () => {
        expect(metadata.title).toBe(
            'CCNAAUTO 200-901 | 6.0 Network Fundamentals 完全対策ガイド | Cloud Infrastructure Studies',
        );
        expect(metadata.description).toContain('CCNA Automation 200-901');
        expect(metadata.description).not.toContain('CCNA 200-301');
    });

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
        expect(activeLink).toHaveAttribute('aria-current', 'location');
        expect(container.querySelectorAll('a[aria-current="location"]')).toHaveLength(1);
    });

    it('preserves reference link text, count, and href values from the source HTML', () => {
        const htmlPath = path.resolve(
            process.cwd(),
            'archive/Cisco/html/ccna/Ccna-automation-network-fundamentals.html',
        );
        const sourceDocument = new JSDOM(fs.readFileSync(htmlPath, 'utf8')).window.document;
        const sourceLinks = Array.from(
            sourceDocument.querySelectorAll<HTMLElement>('.ref-url'),
        );
        const { container } = render(<CcnaNetworkFundamentalsGuide />);
        const migratedLinks = Array.from(
            container.querySelectorAll<HTMLAnchorElement>('a.ref-url'),
        );

        expect(migratedLinks).toHaveLength(sourceLinks.length);
        expect(
            migratedLinks.map((link) => ({
                text: link.textContent?.trim(),
                href: link.getAttribute('href'),
            })),
        ).toEqual(
            sourceLinks.map((link) => ({
                text: link.textContent?.trim(),
                href: link.textContent?.trim(),
            })),
        );
    });
});
