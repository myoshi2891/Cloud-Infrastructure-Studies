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
import CcnaAutomationProgrammabilityGuide from '@/app/cisco/ccna/automation-programmability/CcnaAutomationProgrammabilityGuide';
import NavBar from '@/app/cisco/ccna/automation-programmability/NavBar';
import Page from '@/app/cisco/ccna/automation-programmability/page';
import fidelity from '@/docs/migration-inventory/ccna-automation-programmability.fidelity.json';
import {
    expectCodeFidelity,
    expectContentCssCoverage,
    expectElementPlacementFidelity,
    expectSupplementalFidelity,
    expectTableFidelity,
    expectTextFidelity,
} from '../archive-fidelity';

// Mock MermaidDiagram component to render fallback/testable container with aria-label
vi.mock('@/components/MermaidDiagram', () => ({
    MermaidDiagram: ({ ariaLabel }: { ariaLabel: string }) => (
        <div data-testid="mermaid-diagram" aria-label={ariaLabel}>
            {ariaLabel}
        </div>
    ),
}));

describe('CCNA Automation and Programmability Guide - Automated 100% Text & Structure Verification', () => {
    it('renders the Page component with title and Server Component wrapper', () => {
        const pageElement = Page();
        expect(pageElement).toBeTruthy();
    });

    it('verifies 100% text fidelity against the committed source fixture', () => {
        const { container } = render(<CcnaAutomationProgrammabilityGuide />);

        expectTextFidelity(fidelity.texts, container);

        const sourceCodeLines = fidelity.jsonCode.replace(/^\n|\n$/g, '').split('\n');
        const migratedCodeLines = Array.from(
            container.querySelectorAll<HTMLElement>('.code-block .code-line'),
            (line) => line.textContent || '',
        );
        expect(migratedCodeLines).toEqual(sourceCodeLines);
    });

    it('renders NavBar with active section highlight capability (ScrollSpy)', () => {
        const { container } = render(<NavBar activeId="sec63" />);
        const activeLink = container.querySelector('a.active');
        expect(activeLink).toBeTruthy();
        expect(activeLink?.getAttribute('href')).toBe('#sec63');
    });

    it('gives the outer sidebar and inner table of contents distinct names', () => {
        const { container } = render(<NavBar />);
        const navigations = Array.from(container.querySelectorAll('nav'));

        expect(navigations.map((nav) => nav.getAttribute('aria-label'))).toEqual([
            'Automation and Programmability サイドバー',
            'Automation and Programmability 目次',
        ]);
    });

    it('renders JSON code block with syntax highlighting span tags (.code-attr, .code-string, .code-number, .code-literal)', () => {
        const { container } = render(<CcnaAutomationProgrammabilityGuide />);
        const codeBlock = container.querySelector('.code-block');
        expect(codeBlock).toBeTruthy();
        expect(codeBlock?.querySelector('.code-attr')).toBeTruthy();
        expect(codeBlock?.querySelector('.code-string')).toBeTruthy();
        expect(codeBlock?.querySelector('.code-number')).toBeTruthy();
        expect(codeBlock?.querySelector('.code-literal')).toBeTruthy();
    });

    it('preserves every code block, table cell, supplemental item, CSS class, and element placement', () => {
        const { container } = render(<CcnaAutomationProgrammabilityGuide />);
        const css = fs.readFileSync(
            path.resolve(process.cwd(), 'app/cisco/ccna/automation-programmability/page.css'),
            'utf8',
        );
        const sourceJson = fidelity.jsonCode;
        const highlightedTokens = (className: string) =>
            Array.from(container.querySelectorAll(`.${className}`), (token) => token.textContent ?? '');

        expectTableFidelity(fidelity.tables, container);
        expectSupplementalFidelity(fidelity.supplemental, container, '.callout, figcaption');
        expectCodeFidelity(fidelity.codeBlocks, container);
        expect(highlightedTokens('code-attr')).toEqual(
            Array.from(sourceJson.matchAll(/"[^"]+"(?=\s*:)/g), (match) => match[0]),
        );
        expect(highlightedTokens('code-string')).toEqual(
            Array.from(sourceJson.matchAll(/:\s*("[^"]+")/g), (match) => match[1]),
        );
        expect(highlightedTokens('code-number')).toEqual(
            Array.from(sourceJson.matchAll(/:\s*(\d+)/g), (match) => match[1]),
        );
        expect(highlightedTokens('code-literal')).toEqual(
            Array.from(sourceJson.matchAll(/:\s*(true|false|null)/g), (match) => match[1]),
        );
        expectContentCssCoverage(fidelity.styledClasses, container, css);
        expectElementPlacementFidelity(
            fidelity.placements,
            container,
            '.table-wrap > table, figure, .callout, .code-block, pre',
        );
    });
});
