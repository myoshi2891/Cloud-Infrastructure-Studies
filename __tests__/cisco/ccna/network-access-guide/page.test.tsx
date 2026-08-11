import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Page, { generateMetadata } from '@/app/cisco/ccna/network-access-guide/page';
import CcnaNetworkAccessGuide from '@/app/cisco/ccna/network-access-guide/CcnaNetworkAccessGuide';
import { DIAGRAMS } from '@/app/cisco/ccna/network-access-guide/constants';

// MermaidDiagram mock
vi.mock('@/components/MermaidDiagram', () => ({
    MermaidDiagram: ({ chart, ariaLabel }: { chart: string; ariaLabel: string }) => (
        <div data-testid="mermaid-diagram" aria-label={ariaLabel}>
            {chart}
        </div>
    ),
}));

describe('CCNA Network Access Guide Page', () => {
    it('generateMetadata returns correct metadata', () => {
        const metadata = generateMetadata();
        expect(metadata.title).toContain('Network Access');
        expect(metadata.description).toContain('VLAN');
    });

    it('renders main heading and hero section', () => {
        render(<CcnaNetworkAccessGuide />);
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
            'CCNA 200-301「Network Access」セクション徹底解説'
        );
    });

    it('renders all 15 sections with correct H2 titles', () => {
        render(<CcnaNetworkAccessGuide />);
        const h2Titles = [
            '1. このセクションの全体像',
            '2. 前提知識の確認：スイッチングの基礎',
            '3. 2.1 VLANの設定と検証',
            '4. 2.2 スイッチ間接続（トランク）の設定と検証',
            '5. 2.3 レイヤー2ディスカバリプロトコル（CDP・LLDP）',
            '6. 2.4 EtherChannel（LACP）',
            '7. 2.5 Rapid PVST+ スパニングツリープロトコル',
            '8. 2.6 Ciscoワイヤレスアーキテクチャ と APモード',
            '9. 2.7 WLANコンポーネントの物理接続',
            '10. 2.8 ネットワークデバイスの管理アクセス',
            '11. 2.9 ワイヤレスLAN GUI設定の解釈',
            '12. 試験対策：頻出の引っかけポイント',
            '13. ハンズオン学習の進め方',
            '14. セクション全体のまとめ表',
            '15. 参考資料・出典',
        ];

        h2Titles.forEach((title) => {
            expect(screen.getByRole('heading', { level: 2, name: new RegExp(title.replace(/[\(\)\+\?]/g, '\\$&')) })).toBeInTheDocument();
        });
    });

    it('defines all 17 Mermaid diagrams in constants.ts', () => {
        expect(Object.keys(DIAGRAMS)).toHaveLength(17);
        for (let i = 1; i <= 17; i++) {
            expect(DIAGRAMS[`diag-${i}`]).toBeDefined();
            expect(DIAGRAMS[`diag-${i}`].length).toBeGreaterThan(0);
        }
    });

    it('renders all 17 Mermaid diagrams in guide component', () => {
        render(<CcnaNetworkAccessGuide />);
        const diagrams = screen.getAllByTestId('mermaid-diagram');
        expect(diagrams).toHaveLength(17);
    });

    it('renders page component without crashing', () => {
        render(<Page />);
        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });
});
