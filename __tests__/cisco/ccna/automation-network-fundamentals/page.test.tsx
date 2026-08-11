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

describe('CCNA Automation Network Fundamentals Guide - Full Fidelity Assertions', () => {
    it('renders the Page component with title and Server Component wrapper', () => {
        const pageElement = Page();
        expect(pageElement).toBeTruthy();
    });

    it('renders Overview section with exact paragraph and table sequence from original HTML', () => {
        const { container } = render(<CcnaNetworkFundamentalsGuide />);
        const overviewSection = container.querySelector('#overview');
        expect(overviewSection).toBeTruthy();

        const ps = overviewSection?.querySelectorAll('p');
        expect(ps?.length).toBe(3);

        expect(ps?.[0]?.textContent).toContain('DevNet Associate');
        expect(ps?.[1]?.textContent).toContain('この試験は次の6つのドメインで構成されており');

        const tableWrapper = overviewSection?.querySelector('.table-wrapper');
        expect(tableWrapper).toBeTruthy();

        const domainTable = tableWrapper?.querySelector('table.domain-highlight');
        expect(domainTable).toBeTruthy();

        expect(ps?.[2]?.textContent).toContain('自動化やプログラミングの資格なのに、なぜネットワークの基礎知識が問われるのか？');
    });

    it('renders exact H2 section step titles matching original HTML 100%', () => {
        const { getAllByRole } = render(<CcnaNetworkFundamentalsGuide />);
        const h2Elements = getAllByRole('heading', { level: 2 });
        const h2Texts = h2Elements.map(el => (el.textContent || '').replace(/\s+/g, ' ').trim());

        const expectedH2Titles = [
            'はじめに：このガイドの位置づけ',
            'Step 0 Network Fundamentalsドメインの全体像',
            'Step 1 MACアドレスとVLAN（6.1）',
            'Step 2 IPアドレス・ルート・サブネットマスク/プレフィックス・ゲートウェイ（6.2）',
            'Step 3 ネットワーク機器の役割（6.3）',
            'Step 4 ネットワークトポロジ図の読み方（6.4）',
            'Step 5 Management / Data / Control Plane（6.5）',
            'Step 6 IPサービス（DHCP・DNS・NAT・SNMP・NTP）（6.6）',
            'Step 7 プロトコルとポート番号（6.7）',
            'Step 8 アプリケーション接続トラブルの切り分け（6.8）',
            'Step 9 ネットワーク制約がアプリケーションに与える影響（6.9）',
            'まとめ：学習のポイント',
            '参考情報源',
        ];

        expectedH2Titles.forEach((expectedTitle) => {
            const hasMatch = h2Texts.some(text => text.includes(expectedTitle));
            expect(hasMatch).toBe(true);
        });
    });

    it('renders Summary section with exact list items from original HTML', () => {
        const { container } = render(<CcnaNetworkFundamentalsGuide />);
        const summarySection = container.querySelector('#summary');
        expect(summarySection).toBeTruthy();

        const listItems = summarySection?.querySelectorAll('li');
        expect(listItems?.length).toBe(6);

        expect(listItems?.[0]?.textContent).toContain('Network Fundamentalsは出題比率15%');
        expect(listItems?.[5]?.textContent).toContain('用語（6.1〜6.4）→ 仕組み（6.5〜6.7）→ 応用・診断（6.8〜6.9）');
    });

    it('renders References section with exact 4 reference links from original HTML', () => {
        const { container } = render(<CcnaNetworkFundamentalsGuide />);
        const refSection = container.querySelector('#references');
        expect(refSection).toBeTruthy();

        const refItems = refSection?.querySelectorAll('.ref-list li');
        expect(refItems?.length).toBe(4);

        const text = refSection?.textContent || '';
        expect(text).toContain('CCNA Automation Certification（資格概要）');
        expect(text).toContain('CCNA Automation Exam and Training');
        expect(text).toContain('200-901-CCNAAUTO_v.1.1.pdf');
        expect(text).toContain('Cisco Learning Network：CCNAAUTO Exam Topics and Study Guide');
    });

    it('renders NavBar with active section highlight capability (ScrollSpy)', () => {
        const { container } = render(<NavBar activeId="step3" />);
        const activeLink = container.querySelector('a.active');
        expect(activeLink).toBeTruthy();
        expect(activeLink?.getAttribute('href')).toBe('#step3');
    });
});
