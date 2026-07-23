// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CcnaIpServicesGuidePage from '@/app/cisco/ccna/ip-services-guide/page';

// Mock MermaidDiagram to avoid dynamic import / browser execution issues in Vitest
vi.mock('@/components/MermaidDiagram', () => ({
    MermaidDiagram: ({ chart, ariaLabel }: { chart: string; ariaLabel?: string }) => (
        <div data-testid="mermaid-diagram" data-chart={chart} aria-label={ariaLabel}>
            Mermaid Diagram Mock
        </div>
    ),
}));

describe('CcnaIpServicesGuidePage', () => {
    it('renders main heading correctly', () => {
        render(<CcnaIpServicesGuidePage />);

        const mainHeading = screen.getByRole('heading', {
            level: 1,
            name: /IP サービス/i,
        });
        expect(mainHeading).toBeInTheDocument();
    });

    it('renders key sections and headings', () => {
        render(<CcnaIpServicesGuidePage />);

        const sectionTitles = [
            'このガイドの全体像',
            '4.1 NAT',
            '4.2 NTP',
            '4.3 DHCP',
            '4.4 SNMP',
            '4.5 Syslog',
            '4.6 DHCP',
            '4.7 QoS',
            '4.8 SSH',
            '4.9 TFTP',
            '学習のポイントまとめ',
            '出典・参考資料',
        ];

        sectionTitles.forEach((title) => {
            expect(screen.getByText(new RegExp(title, 'i'))).toBeInTheDocument();
        });
    });

    it('renders table of contents navigation in sidebar', () => {
        render(<CcnaIpServicesGuidePage />);

        const tocNav = screen.getByRole('navigation', { name: /Table of Contents/i });
        expect(tocNav).toBeInTheDocument();
    });

    it('renders 12 mermaid diagrams', () => {
        render(<CcnaIpServicesGuidePage />);

        const diagrams = screen.getAllByTestId('mermaid-diagram');
        expect(diagrams).toHaveLength(12);
    });

    it('renders code lines with syntax highlighting classes', () => {
        const { container } = render(<CcnaIpServicesGuidePage />);

        const codeLines = container.querySelectorAll('.code-line');
        expect(codeLines.length).toBeGreaterThan(0);
    });
});
