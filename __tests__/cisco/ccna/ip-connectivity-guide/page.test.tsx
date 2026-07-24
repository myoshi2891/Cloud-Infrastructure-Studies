import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CcnaIpConnectivityGuidePage from '@/app/cisco/ccna/ip-connectivity-guide/page';

// Mock MermaidDiagram to avoid dynamic import / browser execution issues in Vitest
vi.mock('@/components/MermaidDiagram', () => ({
    MermaidDiagram: ({ chart, ariaLabel }: { chart: string; ariaLabel?: string }) => (
        <div data-testid="mermaid-diagram" data-chart={chart} aria-label={ariaLabel}>
            Mermaid Diagram Mock
        </div>
    ),
}));

describe('CcnaIpConnectivityGuidePage', () => {
    it('renders main heading correctly', () => {
        render(<CcnaIpConnectivityGuidePage />);

        const mainHeading = screen.getByRole('heading', {
            level: 1,
            name: /IP Connectivity/i,
        });
        expect(mainHeading).toBeInTheDocument();
    });

    it('renders all chapters and main headings', () => {
        render(<CcnaIpConnectivityGuidePage />);

        const sectionTitles = [
            'このガイドの全体像',
            '第1章｜3.1 ルーティングテーブルの構成要素を解釈する',
            '第2章｜3.2 ルータのフォワーディング決定ロジック',
            '第3章｜3.3 IPv4/IPv6スタティックルーティングの設定・検証',
            '第4章｜3.4 シングルエリアOSPFv2の設定・検証',
            '第5章｜3.5 ファーストホップ冗長プロトコル（FHRP）',
            'まとめ：学習の進め方',
            '参考ソース（出典）',
        ];

        // 各 title はサイドバー目次リンクと本文見出しの両方に出現するため、
        // getByText の単一マッチ要求ではなく getAllByText で「1 箇所以上に存在」を検証する
        sectionTitles.forEach((title) => {
            expect(screen.getAllByText(new RegExp(title, 'i')).length).toBeGreaterThan(0);
        });
    });

    it('renders table of contents navigation in sidebar', () => {
        render(<CcnaIpConnectivityGuidePage />);

        const tocNav = screen.getByRole('navigation', { name: /Table of Contents/i });
        expect(tocNav).toBeInTheDocument();
    });

    it('renders 7 mermaid diagrams', () => {
        render(<CcnaIpConnectivityGuidePage />);

        const diagrams = screen.getAllByTestId('mermaid-diagram');
        expect(diagrams).toHaveLength(7);
    });

    it('renders code lines with syntax highlighting classes', () => {
        const { container } = render(<CcnaIpConnectivityGuidePage />);

        const codeLines = container.querySelectorAll('.code-line');
        expect(codeLines.length).toBeGreaterThan(0);

        const comments = container.querySelectorAll('.code-comment');
        expect(comments.length).toBeGreaterThan(0);
    });
});
