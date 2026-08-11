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

describe('CCNA Automation Network Fundamentals Guide - Full Text & Visual Faithful Assertions', () => {
    it('renders the Page component with title and Server Component wrapper', () => {
        const pageElement = Page();
        expect(pageElement).toBeTruthy();
    });

    it('renders exact paragraph text from original HTML in Overview section', () => {
        const { container } = render(<CcnaNetworkFundamentalsGuide />);
        const text = container.textContent || '';
        expect(text).toContain('自動化やプログラミングの資格なのに、なぜネットワークの基礎知識が問われるのか？');
        expect(text).toContain('ネットワークの仕組みを理解していないと、API呼び出しの失敗やアプリケーションの接続不良が');
    });

    it('renders exact paragraph text and list items for Step 1 (MAC & VLAN)', () => {
        const { container } = render(<CcnaNetworkFundamentalsGuide />);
        const text = container.textContent || '';
        expect(text).toContain('IPアドレスのように後から人間が変更する前提のものではなく、機器の出荷時に焼き込まれる一意な識別子です。');
        expect(text).toContain('AA:BB:CC:11:22:33');
        expect(text).toContain('スイッチはこのMACアドレスをもとに');
        expect(text).toContain('VLANを使う主な理由：');
        expect(text).toContain('部署やシステムの単位でネットワークを論理分離し、セキュリティを高める');
        expect(text).toContain('同じスイッチに接続していても、異なるVLAN同士は直接通信できない');
    });

    it('renders exact paragraph text and callouts for Step 2 to Step 4', () => {
        const { container } = render(<CcnaNetworkFundamentalsGuide />);
        const text = container.textContent || '';
        expect(text).toContain('どこまでがネットワーク部で、どこからがホスト部か');
        expect(text).toContain('社内ネットワークなど、インターネットに直接公開しないネットワークでは、以下のプライベートIPアドレス範囲');
        expect(text).toContain('このようなトポロジ図を読み解くときのチェックポイント：');
        expect(text).toContain('クライアントからWebサーバーへの通信パス：クライアント → L2スイッチ → ルーター → ファイアウォール → ロードバランサー（VIP） → Webサーバー');
    });

    it('renders exact paragraph text for Step 5 to Step 9, Summary & Disclaimer Note', () => {
        const { container } = render(<CcnaNetworkFundamentalsGuide />);
        const text = container.textContent || '';
        expect(text).toContain('自動化スクリプトの多くは Management Plane を経由して機器を操作します');
        expect(text).toContain('「まずネットワーク経路を疑い、その後にアプリケーション層を疑う」という順序で進めるのが基本です。');
        expect(text).toContain('これらは一見「ネットワーク側の話」に見えますが、自動化やアプリケーション開発を行う上でも');
        expect(text).toContain('補足：CCNA Automationは、Ciscoが2026年に「DevNet Associate」から名称変更した資格です。');
    });

    it('renders Hero section with original HTML visual structure and meta-cards', () => {
        const { container, getByRole } = render(<CcnaNetworkFundamentalsGuide />);
        const eyebrow = container.querySelector('.eyebrow');
        expect(eyebrow?.textContent).toContain('CCNA Automation 試験対策ガイド');

        const h1 = getByRole('heading', { level: 1 });
        expect(h1.textContent).toContain('Network Fundamentals ドメイン徹底解説');

        const metaCards = container.querySelectorAll('.meta-card');
        expect(metaCards.length).toBeGreaterThanOrEqual(4);
    });

    it('renders Sidebar with brand title and grouped navigation', () => {
        const { container } = render(<NavBar />);
        const brand = container.querySelector('.brand');
        expect(brand?.textContent).toContain('CCNA Automation ／ 200-901 CCNAAUTO');

        const groupLabels = container.querySelectorAll('.nav-group-label');
        expect(groupLabels.length).toBeGreaterThanOrEqual(3);
    });

    it('renders step-num tags, table-wrappers and diagram-blocks', () => {
        const { container } = render(<CcnaNetworkFundamentalsGuide />);
        expect(container.querySelectorAll('.step-num').length).toBeGreaterThanOrEqual(9);
        expect(container.querySelectorAll('.table-wrapper').length).toBe(12);
        expect(container.querySelectorAll('.diagram-block').length).toBe(11);
    });
});
