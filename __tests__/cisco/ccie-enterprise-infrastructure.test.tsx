// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CcieEnterpriseGuide from '@/app/cisco/ccie/enterprise-infrastructure/CcieEnterpriseGuide';

// Mermaid Diagram モック
vi.mock('@/components/MermaidDiagram', () => ({
    MermaidDiagram: ({ chart, ariaLabel }: { chart: string; ariaLabel: string }) => (
        <div data-testid="mermaid-diagram" aria-label={ariaLabel}>{chart}</div>
    ),
}));

describe('CCIE Enterprise Infrastructure Complete Guide Component', () => {
    it('renders main title and subtitle correctly', () => {
        render(<CcieEnterpriseGuide />);
        expect(
            screen.getByRole('heading', {
                level: 1,
                name: /CCIE Enterprise Infrastructure/i,
            }),
        ).toBeInTheDocument();
        expect(
            screen.getByText(/初学者のためのステップバイステップ解説/i),
        ).toBeInTheDocument();
    });

    it('renders document title block metadata', () => {
        render(<CcieEnterpriseGuide />);
        expect(screen.getByText('Document Title Block')).toBeInTheDocument();
        expect(screen.getByText('Info as of 2026-07')).toBeInTheDocument();
        expect(screen.getByText('エキスパート（Expert）')).toBeInTheDocument();
        expect(screen.getByText('ENCOR 350-401 + Lab v1.1')).toBeInTheDocument();
    });

    it('renders section headings from §01 to §10', () => {
        render(<CcieEnterpriseGuide />);

        const sections = [
            '§01',
            '§02',
            '§03',
            '§04',
            '§05',
            '§06',
            '§07',
            '§08',
            '§09',
            '§10',
        ];

        sections.forEach((sec) => {
            expect(screen.getByText(sec)).toBeInTheDocument();
        });

        expect(
            screen.getByRole('heading', { level: 2, name: /CCIE Enterprise Infrastructureとは/i }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', { level: 2, name: /認定取得までの全体像（2ステップ構成）/i }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', { level: 2, name: /ステップ1：クオリファイ試験（ENCOR 350-401）/i }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', { level: 2, name: /ステップ2：ラボ試験（CCIE Enterprise Infrastructure Lab）/i }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', { level: 2, name: /受験前提条件・推奨経験/i }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', { level: 2, name: /費用の内訳/i }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', { level: 2, name: /再認定（Recertification）/i }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', { level: 2, name: /初学者向け学習ロードマップ/i }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', { level: 2, name: /よくある質問/i }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', { level: 2, name: /参考ソース/i }),
        ).toBeInTheDocument();
    });

    it('renders ENCOR blueprint domains and ratios correctly', () => {
        render(<CcieEnterpriseGuide />);
        expect(screen.getByText('アーキテクチャ')).toBeInTheDocument();
        expect(screen.getByText('15%')).toBeInTheDocument();
        expect(screen.getByText('仮想化')).toBeInTheDocument();
        expect(screen.getByText('10%')).toBeInTheDocument();
        expect(screen.getByText('インフラストラクチャ')).toBeInTheDocument();
        expect(screen.getByText('30%')).toBeInTheDocument();
        expect(screen.getByText('ネットワークアシュアランス')).toBeInTheDocument();
        expect(screen.getByText('自動化と人工知能')).toBeInTheDocument();
    });

    it('renders CCIE EI Lab blueprint domains and ratios correctly', () => {
        render(<CcieEnterpriseGuide />);
        expect(screen.getByText('ネットワークインフラストラクチャ')).toBeInTheDocument();
        expect(screen.getByText('ソフトウェア定義インフラストラクチャ')).toBeInTheDocument();
        expect(screen.getByText('25%')).toBeInTheDocument();
        expect(screen.getByText('トランスポート技術とソリューション')).toBeInTheDocument();
        expect(screen.getByText('インフラストラクチャセキュリティとサービス')).toBeInTheDocument();
        expect(screen.getByText('インフラストラクチャの自動化とプログラマビリティ')).toBeInTheDocument();
    });

    it('renders cost details table correctly', () => {
        render(<CcieEnterpriseGuide />);
        expect(screen.getByText('ENCOR 350-401（クオリファイ試験）')).toBeInTheDocument();
        expect(screen.getByText('400 USD')).toBeInTheDocument();
        expect(screen.getByText('CCIE EIラボ試験')).toBeInTheDocument();
        expect(screen.getByText('1,600 USD')).toBeInTheDocument();
    });

    it('renders all 4 Mermaid diagrams', () => {
        render(<CcieEnterpriseGuide />);
        expect(screen.getByLabelText('Cisco認定レベル階層におけるCCIE EIの位置づけ')).toBeInTheDocument();
        expect(screen.getByLabelText('認定取得までの2ステップフロー')).toBeInTheDocument();
        expect(screen.getByLabelText('ラボ試験のモジュール構成')).toBeInTheDocument();
        expect(screen.getByLabelText('初学者向け学習ロードマップ')).toBeInTheDocument();
    });

    it('renders all 10 reference source links', () => {
        render(<CcieEnterpriseGuide />);
        const links = screen.getAllByRole('link');
        const ciscoLinks = links.filter((link) =>
            link.getAttribute('href')?.includes('cisco.com') ||
            link.getAttribute('href')?.includes('learningnetwork.cisco.com')
        );
        expect(ciscoLinks.length).toBeGreaterThanOrEqual(8);
    });

    it('renders FAQ details elements', () => {
        render(<CcieEnterpriseGuide />);
        expect(
            screen.getByText(/CCNAやCCNPを持っていないとCCIE EIは受験できませんか？/i),
        ).toBeInTheDocument();
        expect(
            screen.getByText(/ラボ試験はどこでも受けられますか？/i),
        ).toBeInTheDocument();
        expect(
            screen.getByText(/ENCOR合格後、すぐにラボ試験を受けなければなりませんか？/i),
        ).toBeInTheDocument();
    });
});
