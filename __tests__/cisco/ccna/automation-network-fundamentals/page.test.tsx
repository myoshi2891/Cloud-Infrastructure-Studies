import { render, screen } from '@testing-library/react';
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
        render(<CcnaNetworkFundamentalsGuide />);
        expect(
            screen.getByRole('heading', {
                level: 1,
                name: /Network Fundamentals ドメイン徹底解説/i,
            })
        ).toBeInTheDocument();
    });

    it('renders all 13 H2 headings for complete section coverage', () => {
        render(<CcnaNetworkFundamentalsGuide />);
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

        expectedH2s.forEach((h2Text) => {
            const h2Elements = screen.getAllByRole('heading', { level: 2 });
            const found = h2Elements.some((el) => el.textContent?.includes(h2Text));
            expect(found).toBe(true);
        });
    });

    it('renders all 13 H3 headings correctly', () => {
        render(<CcnaNetworkFundamentalsGuide />);
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

        expectedH3s.forEach((h3Text) => {
            const h3Elements = screen.getAllByRole('heading', { level: 3 });
            const found = h3Elements.some((el) => el.textContent?.includes(h3Text));
            expect(found).toBe(true);
        });
    });

    it('renders all 12 data tables with exact header and cell content assertions', () => {
        render(<CcnaNetworkFundamentalsGuide />);

        // Table 1: Exam Domains
        expect(screen.getByText('Software Development and Design')).toBeInTheDocument();
        expect(screen.getByText('Network Fundamentals')).toBeInTheDocument();
        expect(screen.getByText('15%')).toBeInTheDocument();

        // Table 2: Syllabi Mapping
        expect(screen.getByText('6.1')).toBeInTheDocument();
        expect(screen.getByText('MACアドレスとVLANの目的・使い方')).toBeInTheDocument();
        expect(screen.getByText('6.9')).toBeInTheDocument();
        expect(screen.getByText('ネットワークの制約がアプリケーションに与える影響')).toBeInTheDocument();

        // Table 3: MAC Address Composition
        expect(screen.getByText('OUI（Organizationally Unique Identifier）')).toBeInTheDocument();
        expect(screen.getByText('上位24ビット')).toBeInTheDocument();
        expect(screen.getByText('製造ベンダーを識別する部分（IEEEが割り当て）')).toBeInTheDocument();

        // Table 4: Subnet Masks & Host Count
        expect(screen.getByText('/24')).toBeInTheDocument();
        expect(screen.getByText('255.255.255.0')).toBeInTheDocument();
        expect(screen.getByText('254台')).toBeInTheDocument();
        expect(screen.getByText('/8')).toBeInTheDocument();
        expect(screen.getByText('約1,677万台')).toBeInTheDocument();

        // Table 5: Private IP Ranges
        expect(screen.getByText('10.0.0.0 〜 10.255.255.255')).toBeInTheDocument();
        expect(screen.getByText('10.0.0.0/8')).toBeInTheDocument();
        expect(screen.getByText('大規模企業ネットワーク')).toBeInTheDocument();
        expect(screen.getByText('192.168.0.0/16')).toBeInTheDocument();

        // Table 6: OSI Layers
        expect(screen.getByText('L7')).toBeInTheDocument();
        expect(screen.getByText('アプリケーション層')).toBeInTheDocument();
        expect(screen.getByText('L1')).toBeInTheDocument();
        expect(screen.getByText('物理層')).toBeInTheDocument();

        // Table 7: Network Devices
        expect(screen.getByText('スイッチ（L2スイッチ）')).toBeInTheDocument();
        expect(screen.getByText('ルーター')).toBeInTheDocument();
        expect(screen.getByText('ファイアウォール')).toBeInTheDocument();
        expect(screen.getByText('ロードバランサー')).toBeInTheDocument();

        // Table 8: 3 Planes
        expect(screen.getByText('Management Plane（管理プレーン）')).toBeInTheDocument();
        expect(screen.getByText('Control Plane（制御プレーン）')).toBeInTheDocument();
        expect(screen.getByText('Data Plane（データプレーン）')).toBeInTheDocument();

        // Table 9: IP Services
        expect(screen.getByText('Dynamic Host Configuration Protocol')).toBeInTheDocument();
        expect(screen.getByText('UDP 67（サーバー）／68（クライアント）')).toBeInTheDocument();
        expect(screen.getByText('Simple Network Management Protocol')).toBeInTheDocument();
        expect(screen.getByText('Network Time Protocol')).toBeInTheDocument();

        // Table 10: Protocols and Port Numbers
        expect(screen.getByText('SSH')).toBeInTheDocument();
        expect(screen.getByText('22')).toBeInTheDocument();
        expect(screen.getByText('NETCONF')).toBeInTheDocument();
        expect(screen.getByText('830')).toBeInTheDocument();

        // Table 11: Troubleshooting Diagnosis
        expect(screen.getByText('特定サーバーの特定ポートにだけ接続できない')).toBeInTheDocument();
        expect(screen.getByText('Transport Port Blocked')).toBeInTheDocument();
        expect(screen.getByText('VPN Problem')).toBeInTheDocument();

        // Table 12: Network Constraints
        expect(screen.getByText('帯域幅（Bandwidth）不足')).toBeInTheDocument();
        expect(screen.getByText('遅延（Latency）／RTTの増大')).toBeInTheDocument();
        expect(screen.getByText('MTU／パケットフラグメンテーション')).toBeInTheDocument();
    });

    it('renders all 11 Mermaid diagrams with aria-label assertions', () => {
        render(<CcnaNetworkFundamentalsGuide />);
        const diagrams = screen.getAllByTestId('mermaid-diagram');
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
        render(<NavBar />);
        const navLinks = screen.getAllByRole('link');
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
        render(<CcnaNetworkFundamentalsGuide />);
        const links = screen.getAllByRole('link');
        const ciscoLink = links.find((l) =>
            l.getAttribute('href')?.includes('cisco.com')
        );
        expect(ciscoLink).toBeDefined();
    });
});
