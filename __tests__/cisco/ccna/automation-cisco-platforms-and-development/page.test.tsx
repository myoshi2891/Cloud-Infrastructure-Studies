import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CcnaCiscoPlatformsDevelopmentPage from '@/app/cisco/ccna/automation-cisco-platforms-and-development/page';

// Mock MermaidDiagram to avoid dynamic import / browser execution issues in Vitest
vi.mock('@/components/MermaidDiagram', () => ({
    MermaidDiagram: ({ chart, ariaLabel, preserveNaturalScale }: { chart: string; ariaLabel?: string; preserveNaturalScale?: boolean }) => (
        <div
            data-testid="mermaid-diagram"
            data-chart={chart}
            data-natural-scale={preserveNaturalScale}
            aria-label={ariaLabel}
        >
            Mermaid Diagram Mock
        </div>
    ),
}));

describe('CcnaCiscoPlatformsDevelopmentPage', () => {
    it('renders main heading and hero kicker correctly', () => {
        render(<CcnaCiscoPlatformsDevelopmentPage />);

        const mainHeading = screen.getByRole('heading', {
            level: 1,
            name: /Cisco Platforms and Development/i,
        });
        expect(mainHeading).toBeInTheDocument();

        expect(screen.getByText(/CCNA Automation 200-901 CCNAAUTO v1.1/i)).toBeInTheDocument();
    });

    it('renders all 13 section headings correctly', () => {
        render(<CcnaCiscoPlatformsDevelopmentPage />);

        const sectionTitles = [
            'はじめに',
            'CCNA Automation試験の全体像とこのドメインの位置づけ',
            'Cisco Platforms and Developmentドメインの全体マップ',
            '3.1 Cisco SDKを使ったPythonスクリプトの構築',
            '3.2〜3.5 Cisco製品プラットフォームとAPIの全体像',
            '3.6 IOS XE / NX-OSのデバイスレベルAPIと動的インターフェース',
            '3.7 シナリオに応じたDevNetリソースの選択',
            '3.8 モデル駆動型プログラマビリティ（YANG / NETCONF / RESTCONF）',
            '3.9 実践：APIドキュメントを基にしたコード構築',
            '学習ロードマップ：ハンズオンの進め方',
            '試験対策のポイントとよくある誤解',
            'まとめ',
            '参考文献・出典一覧',
        ];

        sectionTitles.forEach((title) => {
            expect(
                screen.getByRole('heading', { level: 2, name: new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') }),
            ).toBeInTheDocument();
        });
    });

    it('renders subheadings correctly', () => {
        render(<CcnaCiscoPlatformsDevelopmentPage />);

        const subHeadings = [
            'SDKとは何か、なぜ使うのか',
            '基本的なワークフロー',
            'コード例：Meraki SDKで組織一覧を取得する',
            '3.2 ネットワーク管理プラットフォームとAPI',
            '3.3 コンピュート管理プラットフォームとAPI',
            '3.4 コラボレーションプラットフォームとAPI',
            '3.5 セキュリティプラットフォームとAPI',
            'なぜ「モデル駆動」なのか',
            'NETCONFとRESTCONFの比較',
            '3.9.a：Meraki APIでネットワークデバイス一覧を取得する',
            '3.9.b：Webex APIでスペース・参加者・メッセージを管理する',
        ];

        subHeadings.forEach((subTitle) => {
            expect(
                screen.getByRole('heading', { level: 3, name: new RegExp(subTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') }),
            ).toBeInTheDocument();
        });
    });

    it('renders structured tables content correctly', () => {
        render(<CcnaCiscoPlatformsDevelopmentPage />);

        // Domain table
        expect(screen.getByText('Software Development and Design')).toBeInTheDocument();
        expect(screen.getByText('Understanding and Using APIs')).toBeInTheDocument();

        // Platform overview table
        expect(screen.getByText(/3.2 ネットワーク管理/i)).toBeInTheDocument();
        expect(screen.getByText(/Meraki, Cisco DNA Center, ACI, Cisco SD-WAN, NSO/i)).toBeInTheDocument();

        // Security table
        expect(screen.getByText('Secure Endpoint')).toBeInTheDocument();
        expect(screen.getByText('Secure Malware Analytics')).toBeInTheDocument();

        // NETCONF vs RESTCONF table
        expect(screen.getByText('SSH（既定ポート830）')).toBeInTheDocument();
        expect(screen.getByText('HTTPS（既定ポート443）')).toBeInTheDocument();
    });

    it('renders sidebar navigation links correctly', () => {
        const { container } = render(<CcnaCiscoPlatformsDevelopmentPage />);

        const tocNav = screen.getByRole('navigation', { name: /目次ナビゲーション/i });
        expect(tocNav).toBeInTheDocument();

        const aside = container.querySelector('aside');
        expect(aside).toHaveClass('sidebar');
    });

    it('renders all 10 Mermaid diagrams with ariaLabels and preserveNaturalScale', () => {
        render(<CcnaCiscoPlatformsDevelopmentPage />);

        const diagrams = screen.getAllByTestId('mermaid-diagram');
        expect(diagrams).toHaveLength(10);

        diagrams.forEach((diagram) => {
            expect(diagram.getAttribute('aria-label')).toBeTruthy();
            expect(diagram.getAttribute('data-natural-scale')).toBe('true');
        });
    });

    it('renders reference links correctly', () => {
        render(<CcnaCiscoPlatformsDevelopmentPage />);

        const refLinks = screen.getAllByRole('link', { name: /^https:\/\//i });
        expect(refLinks.length).toBeGreaterThanOrEqual(16);
    });
});
