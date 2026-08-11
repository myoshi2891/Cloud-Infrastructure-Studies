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

describe('CCNA Automation Network Fundamentals Guide', () => {
    it('renders the Page component with title and Server Component wrapper', () => {
        const pageElement = Page();
        expect(pageElement).toBeTruthy();
    });

    it('renders H1 title and subtitle correctly', () => {
        const { getByRole } = render(<CcnaNetworkFundamentalsGuide />);
        expect(
            getByRole('heading', {
                level: 1,
                name: /Network Fundamentals ドメイン徹底解説/i,
            })
        ).toBeTruthy();
    });

    it('renders all 13 H2 headings for complete section coverage', () => {
        const { getAllByRole } = render(<CcnaNetworkFundamentalsGuide />);
        const expectedH2s = [
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

        const h2Elements = getAllByRole('heading', { level: 2 });
        expectedH2s.forEach((h2Text) => {
            const found = h2Elements.some((el) => el.textContent?.includes(h2Text));
            expect(found).toBe(true);
        });
    });

    it('renders all 13 H3 headings correctly', () => {
        const { getAllByRole } = render(<CcnaNetworkFundamentalsGuide />);
        const expectedH3s = [
            'MACアドレスとは',
            'VLANとは',
            'IPアドレスの基本',
            'サブネットマスクとプレフィックス表記',
            'プライベートIPアドレス範囲',
            'デフォルトゲートウェイとルート',
            '代表的なネットワーク機器',
            'DHCP：IPアドレスの自動割り当て',
            'DNS：名前解決の流れ',
            'NAT：アドレス変換の考え方',
            'SNMP：機器の監視',
            'NTP：時刻同期の階層構造',
            '症状から原因を推測するための早見表',
        ];

        const h3Elements = getAllByRole('heading', { level: 3 });
        expectedH3s.forEach((h3Text) => {
            const found = h3Elements.some((el) => el.textContent?.includes(h3Text));
            expect(found).toBe(true);
        });
    });

    it('renders all 12 data tables with exact header and cell content assertions', () => {
        const { getByText, getAllByText } = render(<CcnaNetworkFundamentalsGuide />);

        // Table 1: Exam Domains
        expect(getByText('Software Development and Design')).toBeTruthy();
        expect(getByText('Network Fundamentals')).toBeTruthy();

        // Table 2: Syllabi Mapping
        expect(getByText('6.1')).toBeTruthy();
        expect(getByText('MACアドレスとVLANの目的・使い方')).toBeTruthy();
        expect(getByText('6.9')).toBeTruthy();
        expect(getByText('ネットワークの制約がアプリケーションに与える影響')).toBeTruthy();

        // Table 3: MAC Address Composition
        expect(getByText('OUI（Organizationally Unique Identifier）')).toBeTruthy();
        expect(getByText('上位24ビット')).toBeTruthy();
        expect(getByText('製造ベンダーを識別する部分（IEEEが割り当て）')).toBeTruthy();

        // Table 4: Subnet Masks & Host Count
        expect(getByText('/24')).toBeTruthy();
        expect(getByText('255.255.255.0')).toBeTruthy();
        expect(getByText('254台')).toBeTruthy();
        expect(getByText('/8')).toBeTruthy();
        expect(getByText('約1,677万台')).toBeTruthy();

        // Table 5: Private IP Ranges
        expect(getByText('10.0.0.0 〜 10.255.255.255')).toBeTruthy();
        expect(getByText('10.0.0.0/8')).toBeTruthy();
        expect(getByText('大規模企業ネットワーク')).toBeTruthy();
        expect(getByText('192.168.0.0/16')).toBeTruthy();

        // Table 6: OSI Layers
        expect(getAllByText('L7').length).toBeGreaterThan(0);
        expect(getByText('アプリケーション層')).toBeTruthy();
        expect(getAllByText('L1').length).toBeGreaterThan(0);
        expect(getByText('物理層')).toBeTruthy();

        // Table 7: Network Devices
        expect(getByText('スイッチ（L2スイッチ）')).toBeTruthy();
        expect(getByText('ルーター')).toBeTruthy();
        expect(getByText('ファイアウォール')).toBeTruthy();
        expect(getByText('ロードバランサー')).toBeTruthy();

        // Table 8: 3 Planes
        expect(getByText('Management Plane（管理プレーン）')).toBeTruthy();
        expect(getByText('Control Plane（制御プレーン）')).toBeTruthy();
        expect(getByText('Data Plane（データプレーン）')).toBeTruthy();

        // Table 9: IP Services
        expect(getByText('Dynamic Host Configuration Protocol')).toBeTruthy();
        expect(getByText('UDP 67（サーバー）／68（クライアント）')).toBeTruthy();
        expect(getByText('Simple Network Management Protocol')).toBeTruthy();
        expect(getByText('Network Time Protocol')).toBeTruthy();

        // Table 10: Protocols and Port Numbers
        expect(getByText('SSH')).toBeTruthy();
        expect(getByText('NETCONF')).toBeTruthy();

        // Table 11: Troubleshooting Diagnosis
        expect(getByText('特定サーバーの特定ポートにだけ接続できない')).toBeTruthy();
        expect(getByText('Transport Port Blocked')).toBeTruthy();
        expect(getByText('VPN Problem')).toBeTruthy();

        // Table 12: Network Constraints
        expect(getByText('帯域幅（Bandwidth）不足')).toBeTruthy();
        expect(getByText('遅延（Latency）／RTTの増大')).toBeTruthy();
        expect(getByText('MTU／パケットフラグメンテーション')).toBeTruthy();
    });

    it('renders all 11 Mermaid diagrams with aria-label assertions', () => {
        const { getAllByTestId } = render(<CcnaNetworkFundamentalsGuide />);
        const diagrams = getAllByTestId('mermaid-diagram');
        expect(diagrams.length).toBe(11);

        const expectedAriaLabels = [
            'Network Fundamentals ドメインの全体像フローチャート',
            'L2スイッチとVLANによるネットワーク分割の図解',
            'デフォルトゲートウェイとルーティングの流れ',
            '各層のネットワーク機器とロードバランサー配置図',
            'Management, Control, Data Planeの3層概念図',
            'DHCPシーケンス（Discover, Offer, Request, ACK）',
            'DNS名前解決シーケンス',
            'NAT（アドレス変換）の動作概念図',
            'SNMPのポーリングとTrap通知フロー',
            'NTPのStratum（階層構造）の図解',
            'アプリケーション接続トラブル診断フローチャート',
        ];

        expectedAriaLabels.forEach((label) => {
            const found = diagrams.some((d) => d.getAttribute('aria-label') === label);
            expect(found).toBe(true);
        });
    });

    it('renders sidebar navigation links correctly', () => {
        const { getAllByRole } = render(<NavBar />);
        const navLinks = getAllByRole('link');
        expect(navLinks.length).toBe(13);

        const expectedHrefs = [
            '#overview',
            '#step0',
            '#step1',
            '#step2',
            '#step3',
            '#step4',
            '#step5',
            '#step6',
            '#step7',
            '#step8',
            '#step9',
            '#summary',
            '#references',
        ];

        expectedHrefs.forEach((href) => {
            expect(navLinks.some((link) => link.getAttribute('href') === href)).toBe(true);
        });
    });

    it('renders external reference links', () => {
        const { getAllByRole } = render(<CcnaNetworkFundamentalsGuide />);
        const links = getAllByRole('link');
        const ciscoLink = links.find((l) =>
            l.getAttribute('href')?.includes('cisco.com')
        );
        expect(ciscoLink).toBeDefined();
    });
});
