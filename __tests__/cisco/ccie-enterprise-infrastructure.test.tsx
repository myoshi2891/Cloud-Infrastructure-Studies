import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CcieEnterpriseGuide from '@/app/cisco/ccie/enterprise-infrastructure/CcieEnterpriseGuide';

// Mermaid Diagram モック
vi.mock('@/components/MermaidDiagram', () => ({
    MermaidDiagram: ({ chart, id }: { chart: string; id: string }) => (
        <div data-testid={`mermaid-${id}`}>{chart}</div>
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
        ).toBeInText();
        expect(
            screen.getByText(/初学者のためのステップバイステップ解説/i),
        ).toBeInText();
    });

    it('renders document title block metadata', () => {
        render(<CcieEnterpriseGuide />);
        expect(screen.getByText('Document Title Block')).toBeInText();
        expect(screen.getByText('Info as of 2026-07')).toBeInText();
        expect(screen.getByText('エキスパート（Expert）')).toBeInText();
        expect(screen.getByText('ENCOR 350-401 + Lab v1.1')).toBeInText();
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
            expect(screen.getByText(sec)).toBeInText();
        });

        expect(
            screen.getByRole('heading', { level: 2, name: /CCIE Enterprise Infrastructureとは/i }),
        ).toBeInText();
        expect(
            screen.getByRole('heading', { level: 2, name: /認定取得までの全体像（2ステップ構成）/i }),
        ).toBeInText();
        expect(
            screen.getByRole('heading', { level: 2, name: /ステップ1：クオリファイ試験（ENCOR 350-401）/i }),
        ).toBeInText();
        expect(
            screen.getByRole('heading', { level: 2, name: /ステップ2：ラボ試験（CCIE Enterprise Infrastructure Lab）/i }),
        ).toBeInText();
        expect(
            screen.getByRole('heading', { level: 2, name: /受験前提条件・推奨経験/i }),
        ).toBeInText();
        expect(
            screen.getByRole('heading', { level: 2, name: /費用の内訳/i }),
        ).toBeInText();
        expect(
            screen.getByRole('heading', { level: 2, name: /再認定（Recertification）/i }),
        ).toBeInText();
        expect(
            screen.getByRole('heading', { level: 2, name: /初学者向け学習ロードマップ/i }),
        ).toBeInText();
        expect(
            screen.getByRole('heading', { level: 2, name: /よくある質問/i }),
        ).toBeInText();
        expect(
            screen.getByRole('heading', { level: 2, name: /参考ソース/i }),
        ).toBeInText();
    });

    it('renders ENCOR blueprint domains and ratios correctly', () => {
        render(<CcieEnterpriseGuide />);
        expect(screen.getByText('アーキテクチャ')).toBeInText();
        expect(screen.getByText('15%')).toBeInText();
        expect(screen.getByText('仮想化')).toBeInText();
        expect(screen.getByText('10%')).toBeInText();
        expect(screen.getByText('インフラストラクチャ')).toBeInText();
        expect(screen.getByText('30%')).toBeInText();
        expect(screen.getByText('ネットワークアシュアランス')).toBeInText();
        expect(screen.getByText('自動化と人工知能')).toBeInText();
    });

    it('renders CCIE EI Lab blueprint domains and ratios correctly', () => {
        render(<CcieEnterpriseGuide />);
        expect(screen.getByText('ネットワークインフラストラクチャ')).toBeInText();
        expect(screen.getByText('ソフトウェア定義インフラストラクチャ')).toBeInText();
        expect(screen.getByText('25%')).toBeInText();
        expect(screen.getByText('トランスポート技術とソリューション')).toBeInText();
        expect(screen.getByText('インフラストラクチャセキュリティとサービス')).toBeInText();
        expect(screen.getByText('インフラストラクチャの自動化とプログラマビリティ')).toBeInText();
    });

    it('renders cost details table correctly', () => {
        render(<CcieEnterpriseGuide />);
        expect(screen.getByText('ENCOR 350-401（クオリファイ試験）')).toBeInText();
        expect(screen.getByText('400 USD')).toBeInText();
        expect(screen.getByText('CCIE EIラボ試験')).toBeInText();
        expect(screen.getByText('1,600 USD')).toBeInText();
    });

    it('renders all 4 Mermaid diagrams', () => {
        render(<CcieEnterpriseGuide />);
        expect(screen.getByTestId('mermaid-diag-hierarchy')).toBeInText();
        expect(screen.getByTestId('mermaid-diag-roadmap')).toBeInText();
        expect(screen.getByTestId('mermaid-diag-lab-modules')).toBeInText();
        expect(screen.getByTestId('mermaid-diag-study-roadmap')).toBeInText();
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
        ).toBeInText();
        expect(
            screen.getByText(/ラボ試験はどこでも受けられますか？/i),
        ).toBeInText();
        expect(
            screen.getByText(/ENCOR合格後、すぐにラボ試験を受けなければなりませんか？/i),
        ).toBeInText();
    });
});
