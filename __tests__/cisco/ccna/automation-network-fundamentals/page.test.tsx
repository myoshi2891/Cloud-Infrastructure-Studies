import { JSDOM } from 'jsdom';

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

describe('CCNA Automation Network Fundamentals Guide - Visual & Structural Completeness', () => {
    it('renders the Page component with title and Server Component wrapper', () => {
        const pageElement = Page();
        expect(pageElement).toBeTruthy();
    });

    it('renders Hero section with original HTML visual structure, eyebrow, gradient h1, lede and meta-cards', () => {
        const { container, getByRole, getByText } = render(<CcnaNetworkFundamentalsGuide />);
        
        // Eyebrow badge
        const eyebrow = container.querySelector('.eyebrow');
        expect(eyebrow).toBeTruthy();
        expect(eyebrow?.textContent).toContain('CCNA Automation 試験対策ガイド');

        // H1 Title with gradient styling class
        const h1 = getByRole('heading', { level: 1 });
        expect(h1.textContent).toContain('Network Fundamentals ドメイン徹底解説');

        // Lede description
        const lede = container.querySelector('.lede');
        expect(lede).toBeTruthy();
        expect(lede?.textContent).toContain('200-901 CCNAAUTO');

        // Meta Cards grid
        const metaCards = container.querySelectorAll('.meta-card');
        expect(metaCards.length).toBeGreaterThanOrEqual(4);
        
        expect(getByText('試験時間')).toBeTruthy();
        expect(getByText('120分')).toBeTruthy();
        expect(getByText('受験言語')).toBeTruthy();
        expect(getByText('英語・日本語')).toBeTruthy();
        expect(getByText('受験料')).toBeTruthy();
        expect(getByText('US $300')).toBeTruthy();
        expect(getByText('本ドメインの出題比率')).toBeTruthy();
    });

    it('renders Sidebar with brand title and grouped navigation matching original HTML', () => {
        const { container, getByText } = render(<NavBar />);
        
        // Brand header
        const brand = container.querySelector('.brand');
        expect(brand).toBeTruthy();
        expect(brand?.textContent).toContain('CCNA Automation ／ 200-901 CCNAAUTO');

        const brandTitle = container.querySelector('.brand-title');
        expect(brandTitle).toBeTruthy();
        expect(brandTitle?.textContent).toContain('Network Fundamentals');

        // Group labels
        const groupLabels = container.querySelectorAll('.nav-group-label');
        expect(groupLabels.length).toBeGreaterThanOrEqual(3);

        expect(getByText('6.1〜6.4：基礎知識と機器')).toBeTruthy();
        expect(getByText('6.5〜6.7：仕組みとサービス')).toBeTruthy();
        expect(getByText('6.8〜6.9：診断と応用')).toBeTruthy();
    });

    it('renders section step titles with step-num tags', () => {
        const { container } = render(<CcnaNetworkFundamentalsGuide />);
        const stepNums = container.querySelectorAll('.step-num');
        expect(stepNums.length).toBeGreaterThanOrEqual(9);
        expect(stepNums[0]?.textContent).toBe('Step 0');
        expect(stepNums[1]?.textContent).toBe('Step 1');
    });

    it('renders tables wrapped in table-wrapper with data-table class', () => {
        const { container } = render(<CcnaNetworkFundamentalsGuide />);
        const tableWrappers = container.querySelectorAll('.table-wrapper');
        expect(tableWrappers.length).toBe(12);

        const dataTables = container.querySelectorAll('table.data-table');
        expect(dataTables.length).toBe(12);

        // Active domain highlight row
        const activeDomainRow = container.querySelector('tr.this-domain');
        expect(activeDomainRow).toBeTruthy();
    });

    it('renders diagrams inside diagram-block and diagram-wrapper with caption', () => {
        const { container } = render(<CcnaNetworkFundamentalsGuide />);
        const diagramBlocks = container.querySelectorAll('.diagram-block');
        expect(diagramBlocks.length).toBe(11);

        const diagramWrappers = container.querySelectorAll('.diagram-wrapper');
        expect(diagramWrappers.length).toBe(11);

        const diagramCaptions = container.querySelectorAll('.diagram-caption');
        expect(diagramCaptions.length).toBe(11);
    });

    it('renders callout boxes with proper styling class', () => {
        const { container } = render(<CcnaNetworkFundamentalsGuide />);
        const callouts = container.querySelectorAll('.callout');
        expect(callouts.length).toBeGreaterThanOrEqual(1);
    });

    it('renders reference list with ref-list class', () => {
        const { container } = render(<CcnaNetworkFundamentalsGuide />);
        const refList = container.querySelector('.ref-list');
        expect(refList).toBeTruthy();
    });
});
